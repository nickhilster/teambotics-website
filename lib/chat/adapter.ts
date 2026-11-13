import {
  buildFallbackReply,
  fetchChatConfig,
  logChatMessage,
  type ChatRuntimeRequest,
  type ChatRuntimeResponse,
} from "@/lib/chat/runtime";
import { takeRateLimitToken } from "@/lib/chat/rateLimit";
import type { ChatSource } from "@/lib/chat/retrieval";

/**
 * TBW-002: Teambotics adapter for the unified NikBot backend (contract v1,
 * see docs in the portfolio-website repo: docs/chat-contract.md).
 *
 * The public chat surface stays exactly as it was — same route, same
 * response shape, same kill switch, rate limit and per-turn logging into
 * chatbot_logs — but retrieval, grounding and generation now run in the
 * shared backend. This site authenticates server-to-server with
 * NIKBOT_SITE_KEY; the backend only ever retrieves this site's public
 * corpus (company / product / case-study / capability).
 *
 * Rollback: restore app/api/chat/route.ts to call runChatRuntime.
 */

const BACKEND_TIMEOUT_MS = 25_000;

type BackendChatResponse = {
  message?: string;
  conversationId?: string;
  sources?: ChatSource[];
  suggestions?: string[];
  mode?: ChatRuntimeResponse["mode"];
  fallbackReason?: ChatRuntimeResponse["fallbackReason"];
};

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function backendConfig() {
  const url = process.env.NIKBOT_BACKEND_URL?.trim();
  const siteKey = process.env.NIKBOT_SITE_KEY?.trim();
  if (!url || !siteKey) {
    return null;
  }

  return {
    url,
    siteKey,
    // Preview deployments of the backend sit behind Vercel deployment
    // protection; the bypass secret is only ever set in preview env.
    protectionBypass: process.env.NIKBOT_PROTECTION_BYPASS?.trim() || null,
  };
}

export async function runChatViaBackend(
  request: Request,
  body: ChatRuntimeRequest,
): Promise<ChatRuntimeResponse> {
  const settings = await fetchChatConfig();
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const conversationId = body.conversationId?.trim() || body.sessionId?.trim() || crypto.randomUUID();
  const pageContext = body.pageContext && typeof body.pageContext === "object" ? body.pageContext : undefined;

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

  const clientIp = getClientIp(request);
  const rateLimit = takeRateLimitToken(
    clientIp,
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

  const start = Date.now();
  const config = backendConfig();

  const fallbackResponse = async (
    fallbackReason: NonNullable<ChatRuntimeResponse["fallbackReason"]>,
    errorCode?: string,
  ): Promise<ChatRuntimeResponse> => {
    const fallback = buildFallbackReply([], pageContext);
    await logChatMessage({
      conversationId,
      role: "user",
      content: message,
      mode: "input",
      model: null,
      retrievalEnabled: settings.retrieval.enabled,
      matchedSources: [],
      latencyMs: null,
    });
    await logChatMessage({
      conversationId,
      role: "assistant",
      content: fallback.message,
      mode: "fallback",
      model: settings.model.chatModel,
      retrievalEnabled: settings.retrieval.enabled,
      matchedSources: [],
      latencyMs: Date.now() - start,
      errorCode: errorCode ?? null,
    });
    return {
      message: fallback.message,
      response: fallback.message,
      conversationId,
      sessionId: conversationId,
      sources: [],
      suggestions: fallback.suggestions,
      mode: "fallback",
      fallbackReason,
    };
  };

  if (!config) {
    return fallbackResponse("not-configured", "backend-not-configured");
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-nikbot-site": "teambotics",
        "x-nikbot-site-key": config.siteKey,
        "x-nikbot-client-ip": clientIp,
        ...(config.protectionBypass
          ? { "x-vercel-protection-bypass": config.protectionBypass }
          : {}),
      },
      body: JSON.stringify({
        message,
        conversationId,
        sessionId: body.sessionId,
        history: body.history ?? [],
        pageContext,
      }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch {
    return fallbackResponse("generation-failed", "backend-unreachable");
  }

  // Client-visible rejections from the backend (moderation 400, rate
  // limit 429) pass through untouched, mirroring the standalone runtime,
  // which threw the same Responses before any logging happened.
  if (backendResponse.status === 400 || backendResponse.status === 429) {
    const payload = await backendResponse.text();
    throw new Response(payload, {
      status: backendResponse.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!backendResponse.ok) {
    return fallbackResponse("generation-failed", `backend-${backendResponse.status}`);
  }

  const payload = (await backendResponse.json().catch(() => null)) as BackendChatResponse | null;
  if (!payload || typeof payload.message !== "string") {
    return fallbackResponse("generation-failed", "backend-invalid-response");
  }

  const sources = Array.isArray(payload.sources) ? payload.sources : [];
  const mode = payload.mode ?? "live";

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
  await logChatMessage({
    conversationId,
    role: "assistant",
    content: payload.message,
    mode,
    model: settings.model.chatModel,
    retrievalEnabled: settings.retrieval.enabled,
    matchedSources: sources,
    latencyMs: Date.now() - start,
  });

  return {
    message: payload.message,
    response: payload.message,
    conversationId: payload.conversationId?.trim() || conversationId,
    sessionId: payload.conversationId?.trim() || conversationId,
    sources,
    suggestions: Array.isArray(payload.suggestions) ? payload.suggestions : [],
    mode,
    fallbackReason: payload.fallbackReason,
  };
}
