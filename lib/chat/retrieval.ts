import { buildTeamboticsKnowledgeDocuments, type TeamboticsKnowledgeDocument } from "@/lib/chat/knowledge";

export type ConversationTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ChatSource = {
  id: string;
  title: string;
  excerpt: string;
  route?: string;
  similarity: number;
  sourceType: string;
  sourceKey?: string;
};

export type RetrievalOptions = {
  topK?: number;
  similarityThreshold?: number;
  allowedSourceTypes?: string[];
  allowedRoutes?: string[];
  disabledSourceKeys?: string[];
  disabledSourceTypes?: string[];
  preferredRoute?: string;
  contextTerms?: string[];
};

type SourceFilterInput = {
  sourceType: string;
  sourceKey?: string;
  route?: string;
};

const RECENT_HISTORY_LIMIT = 8;
const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "can",
  "for",
  "from",
  "has",
  "how",
  "into",
  "our",
  "the",
  "this",
  "that",
  "what",
  "when",
  "where",
  "with",
  "you",
  "your",
]);

const HISTORY_FOLLOW_UP_PATTERNS = [
  /^and\b/i,
  /^what about\b/i,
  /^which (one|ones)\b/i,
  /^tell me more\b/i,
  /^more\b/i,
  /^can you expand\b/i,
  /^how so\b/i,
  /^why\b/i,
  /^(that|this|those|them|it)\b/i,
  /^what else\b/i,
  /^anything else\b/i,
];

const OVERVIEW_QUERY_PATTERNS = [
  /^what is\b/i,
  /^what does\b/i,
  /^tell me about\b/i,
  /^who is\b/i,
];

const BOUNDARY_QUERY_PATTERNS = [
  /\blegal advice\b/i,
  /\blawyer\b/i,
  /\bprofessional advice\b/i,
  /\bprivate clients?\b/i,
  /\bconfidential\b/i,
];

const CONTACT_QUERY_PATTERNS = [
  /\bcontact\b/i,
  /\bemail\b/i,
  /\breach\b/i,
  /\breach out\b/i,
  /\bhello@/i,
];

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function getDocumentText(document: TeamboticsKnowledgeDocument) {
  return [
    document.id,
    document.title,
    document.route ?? "",
    document.sourceType,
    document.content,
  ].join(" ");
}

function normalizeFilterValues(values?: string[]) {
  if (!values || values.length === 0) {
    return null;
  }

  return new Set(values.map((value) => value.trim()).filter(Boolean));
}

function matchesAllowedRoute(route: string | undefined, allowedRoutes?: string[]) {
  if (!allowedRoutes || allowedRoutes.length === 0) {
    return true;
  }

  return Boolean(route && allowedRoutes.includes(route));
}

function matchesSourceFilters(source: SourceFilterInput, options: RetrievalOptions) {
  const disabledSourceKeys = normalizeFilterValues(options.disabledSourceKeys);
  const disabledSourceTypes = normalizeFilterValues(options.disabledSourceTypes);
  const allowedSourceTypes = normalizeFilterValues(options.allowedSourceTypes);

  if (source.sourceKey && disabledSourceKeys?.has(source.sourceKey)) {
    return false;
  }

  if (disabledSourceTypes?.has(source.sourceType)) {
    return false;
  }

  if (allowedSourceTypes && !allowedSourceTypes.has(source.sourceType)) {
    return false;
  }

  return matchesAllowedRoute(source.route, options.allowedRoutes);
}

export function filterRetrievedSources<T extends SourceFilterInput>(sources: T[], options: RetrievalOptions) {
  return sources.filter((source) => matchesSourceFilters(source, options));
}

function filterDocuments<T extends SourceFilterInput>(documents: T[], options: RetrievalOptions) {
  return filterRetrievedSources(documents, options);
}

export function extractRelevantExcerpt(query: string, content: string, maxLength = 420) {
  const normalizedContent = content.replace(/\s+/g, " ").trim();
  if (normalizedContent.length <= maxLength) {
    return normalizedContent;
  }

  const queryTokens = tokenize(query);
  const lowerContent = normalizedContent.toLowerCase();
  const firstHit = queryTokens
    .map((token) => lowerContent.indexOf(token))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  const start = Math.max(0, (firstHit ?? 0) - 120);
  const excerpt = normalizedContent.slice(start, start + maxLength).trim();

  return `${start > 0 ? "... " : ""}${excerpt}${start + maxLength < normalizedContent.length ? " ..." : ""}`;
}

export function rankKnowledgeDocuments(
  query: string,
  documents: TeamboticsKnowledgeDocument[],
  options: RetrievalOptions = {},
): ChatSource[] {
  const topK = Math.max(1, Math.trunc(options.topK ?? 4));
  const queryTokens = tokenize([query, ...(options.contextTerms ?? [])].join(" "));
  const queryTokenSet = new Set(queryTokens);
  const preferredRoute = options.preferredRoute;
  const isOverviewQuery = OVERVIEW_QUERY_PATTERNS.some((pattern) => pattern.test(query));
  const isBoundaryQuery = BOUNDARY_QUERY_PATTERNS.some((pattern) => pattern.test(query));
  const isContactQuery = CONTACT_QUERY_PATTERNS.some((pattern) => pattern.test(query));

  return filterDocuments(documents, options)
    .map((document) => {
      const documentText = getDocumentText(document).toLowerCase();
      const documentTokens = tokenize(documentText);
      const documentTokenSet = new Set(documentTokens);
      const normalizedTitle = document.title.toLowerCase();
      const overlap = queryTokens.filter((token) => documentTokenSet.has(token)).length;
      const routeBoost = preferredRoute && document.route === preferredRoute ? 0.18 : 0;
      const titleBoost = tokenize(document.title).some((token) => queryTokenSet.has(token)) ? 0.12 : 0;
      const sourceBoost = document.sourceType === "product" ? 0.06 : 0;
      const overviewBoost = isOverviewQuery && (normalizedTitle.includes("summary") || normalizedTitle.startsWith("what ")) ? 0.1 : 0;
      const boundaryBoost = isBoundaryQuery && (normalizedTitle.includes("boundar") || normalizedTitle.includes("disclosure")) ? 0.12 : 0;
      const contactBoost = isContactQuery && normalizedTitle.includes("contact") ? 0.12 : 0;
      const density = overlap / Math.max(6, queryTokens.length);
      const breadth = overlap / Math.max(12, documentTokenSet.size);
      const similarity = Math.min(
        0.99,
        density * 0.72 + breadth * 0.28 + routeBoost + titleBoost + sourceBoost + overviewBoost + boundaryBoost + contactBoost,
      );

      return {
        id: document.id,
        title: document.title,
        excerpt: extractRelevantExcerpt(query, document.content),
        route: document.route,
        similarity: Number(similarity.toFixed(4)),
        sourceType: document.sourceType,
        sourceKey: document.sourceKey,
      };
    })
    .filter((source) => source.similarity >= (options.similarityThreshold ?? 0.05))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

export function retrieveLocalContext(query: string, options: RetrievalOptions = {}) {
  return rankKnowledgeDocuments(query, buildTeamboticsKnowledgeDocuments(), options);
}

export function shouldUseConversationHistoryForRetrieval(message: string) {
  const normalized = message.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  return HISTORY_FOLLOW_UP_PATTERNS.some((pattern) => pattern.test(normalized)) || normalized.split(/\s+/).length <= 3;
}

export function buildRetrievalQuery(
  message: string,
  history: ConversationTurn[],
  useConversationHistory: boolean,
) {
  const trimmedMessage = message.trim();
  if (!useConversationHistory || !shouldUseConversationHistoryForRetrieval(trimmedMessage)) {
    return trimmedMessage;
  }

  const recentUserTurns = history
    .filter((turn) => turn.role === "user")
    .map((turn) => turn.content.trim())
    .filter(Boolean)
    .slice(-3);

  return recentUserTurns.length > 0
    ? [...recentUserTurns, trimmedMessage].join("\n")
    : trimmedMessage;
}

export function normalizeHistory(value: unknown): ConversationTurn[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((turn): turn is ConversationTurn => {
      if (!turn || typeof turn !== "object") {
        return false;
      }

      const candidate = turn as Record<string, unknown>;
      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-RECENT_HISTORY_LIMIT);
}

