import { getDefaultChatbotSettings, getNeonClient, toRows } from "@/lib/neon";
import {
  buildRetrievalQuery,
  filterRetrievedSources,
  normalizeHistory,
  retrieveLocalContext,
  type ChatSource,
  type ConversationTurn,
} from "@/lib/chat/retrieval";
import { filterGroundedSources, getGroundingThreshold } from "@/lib/chat/grounding";
import {
  createChatCompletion,
  createEmbedding,
  getOpenAiRuntimeConfig,
  moderateInput,
  type OpenAiRuntimeConfig,
} from "@/lib/chat/openai";
import { takeRateLimitToken } from "@/lib/chat/rateLimit";
import { getKnownSourceKeyForType } from "@/lib/chat/sources";
import type { ChatbotDashboardSettings } from "@/types/chatbotAdmin";

export type ChatPageContext = {
  pagePath?: string;
  pageTitle?: string;
  route?: string;
  activeSectionId?: string;
  activeProjectId?: string;
  contextTitle?: string;
  contextSnippet?: string;
};

export type ChatRuntimeRequest = {
  message: string;
  sessionId?: string;
  conversationId?: string;
  history?: unknown;
  pageContext?: ChatPageContext;
};

export type ChatRuntimeResponse = {
  message: string;
  response: string;
  conversationId: string;
  sessionId: string;
  sources: ChatSource[];
  suggestions: string[];
  mode: "live" | "fallback" | "grounded-refusal";
  fallbackReason?: "not-configured" | "generation-failed" | "insufficient-context";
};

type ChatLogPayload = {
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  mode: string;
  model: string | null;
  retrievalEnabled: boolean;
  matchedSources: ChatSource[];
  latencyMs: number | null;
  errorCode?: string | null;
  errorMessage?: string | null;
};

function toVectorLiteral(vector: number[]) {
  return `[${vector.map((value) => Number(value).toFixed(8)).join(",")}]`;
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function parseSettings(value: unknown): ChatbotDashboardSettings | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as ChatbotDashboardSettings;
    } catch {
      return null;
    }
  }

  if (typeof value === "object") {
    return value as ChatbotDashboardSettings;
  }

  return null;
}

export async function fetchChatConfig() {
  try {
    const client = await getNeonClient();
    const rows = toRows<{ settings?: unknown }>(await client.query(
      "SELECT settings FROM chatbot_config_versions WHERE status = 'live' ORDER BY version_number DESC LIMIT 1",
    ));
    const settings = parseSettings(rows[0]?.settings);
    return settings ?? getDefaultChatbotSettings();
  } catch {
    return getDefaultChatbotSettings();
  }
}

async function fetchDisabledSourceKeys() {
  try {
    const client = await getNeonClient();
    const rows = toRows<{ source_key?: unknown }>(await client.query(
      "SELECT DISTINCT source_key FROM chatbot_sources WHERE enabled = false",
    ));
    return rows.length > 0
      ? rows.map((row) => String(row.source_key ?? "").trim()).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

export function mapDatabaseSource(row: Record<string, unknown>): ChatSource {
  const metadata =
    row.metadata && typeof row.metadata === "object"
      ? row.metadata as Record<string, unknown>
      : {};
  const content = String(row.content ?? "");
  const sourceType = typeof metadata.sourceType === "string" ? metadata.sourceType : String(row.source ?? "database");
  const sourceKey = typeof metadata.sourceKey === "string" && metadata.sourceKey.trim().length > 0
    ? metadata.sourceKey.trim()
    : getKnownSourceKeyForType(sourceType);

  return {
    id: String(row.document_key ?? row.id ?? crypto.randomUUID()),
    title: String(metadata.title ?? row.source ?? "Teambotics source"),
    excerpt: content.length > 460 ? `${content.slice(0, 460).trim()} ...` : content,
    route: typeof metadata.route === "string" ? metadata.route : undefined,
    similarity: Number(row.similarity ?? 0),
    sourceType,
    sourceKey,
  };
}

function filterSources(sources: ChatSource[], settings: ChatbotDashboardSettings, disabledSourceKeys: string[]) {
  return filterRetrievedSources(sources, {
    allowedRoutes: settings.retrieval.allowedRoutes,
    allowedSourceTypes: settings.retrieval.allowedSourceTypes,
    disabledSourceKeys,
  });
}

async function retrieveDatabaseContext(
  query: string,
  settings: ChatbotDashboardSettings,
  openAiConfig: OpenAiRuntimeConfig,
  disabledSourceKeys: string[],
) {
  if (!settings.retrieval.enabled || !openAiConfig.apiKey) {
    return [];
  }

  try {
    const embedding = await createEmbedding(query, openAiConfig);
    if (!embedding) {
      return [];
    }

    const client = await getNeonClient();
    const threshold = Math.max(0, Math.min(1, getGroundingThreshold(settings)));
    const rows = toRows(await client.query(
      `SELECT id, document_key, content, metadata, source, similarity
       FROM match_documents($1::vector(1536), $2, $3)`,
      [
        toVectorLiteral(embedding),
        threshold,
        Math.max(settings.retrieval.topK * 3, settings.retrieval.topK),
      ],
    ));

    return filterSources(
      rows.map((row) => mapDatabaseSource(row as Record<string, unknown>)),
      settings,
      disabledSourceKeys,
    ).slice(0, settings.retrieval.topK);
  } catch {
    return [];
  }
}

function buildPageContextSnippet(pageContext?: ChatPageContext) {
  if (!pageContext) {
    return [];
  }

  return [
    pageContext.pagePath,
    pageContext.pageTitle,
    pageContext.route,
    pageContext.activeSectionId,
    pageContext.activeProjectId,
    pageContext.contextTitle,
    pageContext.contextSnippet,
  ]
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function buildSystemPrompt(
  sources: ChatSource[],
  settings: ChatbotDashboardSettings,
  pageContext?: ChatPageContext,
) {
  const sourceBlock = sources.length
    ? sources
        .map((source, index) => {
          return `Source ${index + 1}: ${source.title}\nRoute: ${source.route ?? "n/a"}\n${source.excerpt}`;
        })
        .join("\n\n")
    : "No retrieved sources matched strongly.";

  const pageContextBlock = buildPageContextSnippet(pageContext).join("\n") || "No page context provided.";

  return [
    settings.prompt.systemPromptTemplate,
    settings.prompt.brandFraming,
    "You are the Teambotics site assistant. Answer only from the provided Teambotics context, product pages, and approved public materials. Do not infer beyond the retrieved sources.",
    "If the retrieved context does not support a claim, say that you do not have enough public Teambotics context to answer confidently.",
    "If the user asks for legal, medical, financial, or private operational advice, explain that you cannot provide professional advice. For legal topics, be explicit that Teambotics products do not replace a qualified legal professional.",
    "Never invent private clients, confidential deployments, unpublished repositories, or internal metrics.",
    `Disallowed claims: ${settings.prompt.disallowedClaims.join("; ")}`,
    `Current page context:\n${pageContextBlock}`,
    `Retrieved context:\n${sourceBlock}`,
    "End with one line formatted exactly as: SUGGESTIONS: question one | question two | question three",
  ].join("\n\n");
}

function parseSuggestions(message: string) {
  const match = message.match(/\nSUGGESTIONS:\s*(.+)$/i);
  if (!match) {
    return {
      cleanMessage: message.trim(),
      suggestions: [
        "Which Teambotics product should I start with?",
        "How does Teambotics approach workflow automation?",
      ],
    };
  }

  return {
    cleanMessage: message.slice(0, match.index).trim(),
    suggestions: match[1]
      .split("|")
      .map((suggestion) => suggestion.trim())
      .filter(Boolean)
      .slice(0, 3),
  };
}

function buildFallbackReply(sources: ChatSource[], pageContext?: ChatPageContext) {
  const topSources = sources.slice(0, 2);
  const sourceSummary = topSources.map((source) => source.excerpt).join(" ");
  const pageHint = pageContext?.pagePath ? ` I can see you are on ${pageContext.pagePath}.` : "";

  if (!sourceSummary) {
    return {
      message:
        `I do not have enough Teambotics context to answer that confidently.${pageHint} Try asking about LTB Buddy, EasyBuddy, Code2Motion, Storytellr, or Teambotics' engagement model.`,
      suggestions: [
        "Tell me about LTB Buddy",
        "What does Teambotics build?",
        "How does the engagement model work?",
      ],
    };
  }

  return {
    message:
      `I am answering from Teambotics' published site context rather than a live model.${pageHint} ${sourceSummary}`,
    suggestions: [
      "Which product is most relevant for operations?",
      "What makes this workflow adoption-ready?",
      "How can I talk to Teambotics?",
    ],
  };
}

async function logChatMessage(payload: ChatLogPayload) {
  try {
    const client = await getNeonClient();
    await client.query(
      `INSERT INTO chatbot_logs (
        id,
        conversation_id,
        role,
        content,
        mode,
        model,
        retrieval_enabled,
        matched_sources,
        latency_ms,
        error_code,
        error_message
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        crypto.randomUUID(),
        payload.conversationId,
        payload.role,
        payload.content,
        payload.mode,
        payload.model,
        payload.retrievalEnabled,
        JSON.stringify(payload.matchedSources),
        payload.latencyMs,
        payload.errorCode ?? null,
        payload.errorMessage ?? null,
      ],
    );
  } catch {
    // Logging is operational telemetry and should never break the public chat.
  }
}

export async function runChatRuntime(request: Request, body: ChatRuntimeRequest): Promise<ChatRuntimeResponse> {
  const settings = await fetchChatConfig();
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const conversationId = body.conversationId?.trim() || body.sessionId?.trim() || crypto.randomUUID();
  const history = normalizeHistory(body.history);
  const pageContext = body.pageContext && typeof body.pageContext === "object" ? body.pageContext : undefined;
  const openAiConfig = getOpenAiRuntimeConfig({
    chatModel: settings.model.chatModel,
    embeddingModel: settings.model.embeddingModel,
    maxTokens: settings.model.maxTokens,
    temperature: settings.model.temperature,
  });

  if (!settings.operations.chatEnabled) {
    return {
      message: "The Teambotics assistant is currently offline.",
      response: "The Teambotics assistant is currently offline.",
      conversationId,
      sessionId: conversationId,
      sources: [],
      suggestions: ["How can I contact Teambotics?"],
      mode: "grounded-refusal",
      fallbackReason: "insufficient-context",
    };
  }

  const rateLimit = takeRateLimitToken(
    getClientIp(request),
    settings.operations.rateLimitRequests,
    settings.operations.rateLimitWindowMs,
  );

  if (!rateLimit.allowed) {
    throw new Response(
      JSON.stringify({
        error: "Too many requests",
        message: "Please wait a moment before sending another message.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      },
    );
  }

  const moderation = await moderateInput(message, openAiConfig.apiKey);
  if (moderation.flagged) {
    throw new Response(
      JSON.stringify({
        error: "Message not allowed",
        message: "I cannot respond to that. Please ask about Teambotics products, workflows, or engagement options.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const start = Date.now();
  const disabledSourceKeys = await fetchDisabledSourceKeys();
  const pageContextTerms = buildPageContextSnippet(pageContext);
  const retrievalQuery = [
    pageContextTerms.join("\n"),
    buildRetrievalQuery(message, history as ConversationTurn[], settings.retrieval.useConversationHistory),
  ]
    .filter(Boolean)
    .join("\n\n");

  const databaseSources = await retrieveDatabaseContext(retrievalQuery, settings, openAiConfig, disabledSourceKeys);
  const localSimilarityThreshold = settings.safety.strictGrounding
    ? getGroundingThreshold(settings)
    : Math.min(settings.retrieval.similarityThreshold, 0.1);
  const localSources = databaseSources.length > 0
    ? []
    : retrieveLocalContext(retrievalQuery, {
        topK: settings.retrieval.topK,
        similarityThreshold: localSimilarityThreshold,
        allowedSourceTypes: settings.retrieval.allowedSourceTypes,
        allowedRoutes: settings.retrieval.allowedRoutes,
        disabledSourceKeys,
        preferredRoute: pageContext?.pagePath ?? pageContext?.route,
        contextTerms: pageContextTerms,
      });
  const sources = filterGroundedSources(databaseSources.length > 0 ? databaseSources : localSources, settings);

  await logChatMessage({
    conversationId,
    role: "user",
    content: message,
    mode: "input",
    model: null,
    retrievalEnabled: settings.retrieval.enabled,
    matchedSources: sources,
    latencyMs: null,
  });

  if (settings.safety.strictGrounding && sources.length === 0) {
    const fallback = buildFallbackReply([], pageContext);
    await logChatMessage({
      conversationId,
      role: "assistant",
      content: fallback.message,
      mode: "grounded-refusal",
      model: settings.model.chatModel,
      retrievalEnabled: settings.retrieval.enabled,
      matchedSources: [],
      latencyMs: Date.now() - start,
    });

    return {
      message: fallback.message,
      response: fallback.message,
      conversationId,
      sessionId: conversationId,
      sources: [],
      suggestions: fallback.suggestions,
      mode: "grounded-refusal",
      fallbackReason: "insufficient-context",
    };
  }

  const systemPrompt = buildSystemPrompt(sources, settings, pageContext);
  let mode: ChatRuntimeResponse["mode"] = "fallback";
  let fallbackReason: ChatRuntimeResponse["fallbackReason"] = openAiConfig.apiKey ? "generation-failed" : "not-configured";
  let reply = "";
  let suggestions: string[] = [];

  try {
    const generated = await createChatCompletion(
      [
        { role: "system", content: systemPrompt },
        ...history.map((turn) => ({ role: turn.role, content: turn.content })),
        { role: "user", content: message },
      ],
      openAiConfig,
    );

    if (generated) {
      const parsed = parseSuggestions(generated);
      reply = parsed.cleanMessage;
      suggestions = parsed.suggestions;
      mode = "live";
      fallbackReason = undefined;
    }
  } catch {
    mode = "fallback";
    fallbackReason = "generation-failed";
  }

  if (!reply) {
    const fallback = buildFallbackReply(sources, pageContext);
    reply = fallback.message;
    suggestions = fallback.suggestions;
  }

  await logChatMessage({
    conversationId,
    role: "assistant",
    content: reply,
    mode,
    model: settings.model.chatModel,
    retrievalEnabled: settings.retrieval.enabled,
    matchedSources: sources,
    latencyMs: Date.now() - start,
  });

  return {
    message: reply,
    response: reply,
    conversationId,
    sessionId: conversationId,
    sources,
    suggestions,
    mode,
    fallbackReason,
  };
}
