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
};

export type RetrievalOptions = {
  topK?: number;
  similarityThreshold?: number;
  allowedSourceTypes?: string[];
  allowedRoutes?: string[];
  disabledSourceTypes?: string[];
  preferredRoute?: string;
  contextTerms?: string[];
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

function normalizeAllowedSourceTypes(allowedSourceTypes?: string[]) {
  if (!allowedSourceTypes || allowedSourceTypes.length === 0) {
    return null;
  }

  return new Set(allowedSourceTypes.map((sourceType) => sourceType.trim()).filter(Boolean));
}

function matchesAllowedRoute(route: string | undefined, allowedRoutes?: string[]) {
  if (!allowedRoutes || allowedRoutes.length === 0) {
    return true;
  }

  return Boolean(route && allowedRoutes.includes(route));
}

function filterDocuments<T extends { sourceType: string; route?: string }>(
  documents: T[],
  options: RetrievalOptions,
) {
  const disabledSourceTypes = new Set(options.disabledSourceTypes ?? []);
  const allowedSourceTypes = normalizeAllowedSourceTypes(options.allowedSourceTypes);

  return documents.filter((document) => {
    if (disabledSourceTypes.has(document.sourceType)) {
      return false;
    }

    if (allowedSourceTypes && !allowedSourceTypes.has(document.sourceType)) {
      return false;
    }

    return matchesAllowedRoute(document.route, options.allowedRoutes);
  });
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

  return filterDocuments(documents, options)
    .map((document) => {
      const documentText = getDocumentText(document).toLowerCase();
      const documentTokens = tokenize(documentText);
      const documentTokenSet = new Set(documentTokens);
      const overlap = queryTokens.filter((token) => documentTokenSet.has(token)).length;
      const routeBoost = preferredRoute && document.route === preferredRoute ? 0.18 : 0;
      const titleBoost = tokenize(document.title).some((token) => queryTokenSet.has(token)) ? 0.12 : 0;
      const sourceBoost = document.sourceType === "product" ? 0.06 : 0;
      const density = overlap / Math.max(6, queryTokens.length);
      const breadth = overlap / Math.max(12, documentTokenSet.size);
      const similarity = Math.min(0.99, density * 0.72 + breadth * 0.28 + routeBoost + titleBoost + sourceBoost);

      return {
        id: document.id,
        title: document.title,
        excerpt: extractRelevantExcerpt(query, document.content),
        route: document.route,
        similarity: Number(similarity.toFixed(4)),
        sourceType: document.sourceType,
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

