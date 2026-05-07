import type {
  ChatbotAnalyticsSummary,
  ChatbotConfigSummary,
  ChatbotConfigVersion,
  ChatbotIngestionRun,
  ChatbotLogEntry,
  ChatbotSource,
} from "@/types/chatbotAdmin";

function parseJsonArray(value: unknown) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

export function mapConfigVersion(row: Record<string, unknown> | null | undefined): ChatbotConfigVersion | null {
  if (!row) {
    return null;
  }

  return {
    id: String(row.id),
    versionNumber: Number(row.version_number ?? row.versionNumber ?? 0),
    status: String(row.status) as ChatbotConfigVersion["status"],
    label: String(row.label ?? "Teambotics chatbot"),
    notes: typeof row.notes === "string" ? row.notes : null,
    publishNote: typeof row.publish_note === "string" ? row.publish_note : null,
    createdBy: String(row.created_by ?? "system"),
    createdAt: String(row.created_at ?? new Date().toISOString()),
    publishedAt: row.published_at ? String(row.published_at) : null,
    settings: typeof row.settings === "string" ? JSON.parse(row.settings) : row.settings as ChatbotConfigVersion["settings"],
  };
}

export function mapConfigSummary(row: Record<string, unknown>): ChatbotConfigSummary {
  const version = mapConfigVersion(row);
  if (!version) {
    throw new Error("Invalid config version row.");
  }

  return {
    id: version.id,
    versionNumber: version.versionNumber,
    status: version.status,
    label: version.label,
    notes: version.notes,
    publishNote: version.publishNote,
    createdAt: version.createdAt,
    publishedAt: version.publishedAt,
  };
}

export function mapSource(row: Record<string, unknown>): ChatbotSource {
  return {
    id: String(row.id),
    sourceKey: String(row.source_key ?? row.id),
    label: String(row.label ?? row.name ?? row.source_key ?? "Source"),
    sourceType: String(row.source_type ?? "product"),
    enabled: Boolean(row.enabled),
    routeScope: row.route_scope ? String(row.route_scope) : null,
    documentCount: row.document_count === null || row.document_count === undefined ? null : Number(row.document_count),
    lastIngestedAt: row.last_ingested_at ? String(row.last_ingested_at) : null,
    lastError: row.last_error ? String(row.last_error) : null,
  };
}

export function mapLog(row: Record<string, unknown>): ChatbotLogEntry {
  return {
    id: String(row.id),
    conversationId: String(row.conversation_id),
    role: String(row.role) as ChatbotLogEntry["role"],
    content: String(row.content ?? ""),
    mode: String(row.mode ?? "unknown"),
    model: row.model ? String(row.model) : null,
    retrievalEnabled: Boolean(row.retrieval_enabled),
    matchedSources: parseJsonArray(row.matched_sources),
    latencyMs: row.latency_ms === null || row.latency_ms === undefined ? null : Number(row.latency_ms),
    errorCode: row.error_code ? String(row.error_code) : null,
    errorMessage: row.error_message ? String(row.error_message) : null,
    createdAt: String(row.created_at ?? new Date().toISOString()),
  };
}

export function mapIngestionRun(row: Record<string, unknown>): ChatbotIngestionRun {
  return {
    id: String(row.id),
    startedAt: String(row.started_at ?? new Date().toISOString()),
    completedAt: row.completed_at ? String(row.completed_at) : null,
    status: String(row.status ?? "unknown"),
    triggerType: String(row.trigger_type ?? "manual"),
    sourceCount: row.source_count === null || row.source_count === undefined ? null : Number(row.source_count),
    documentCount: row.document_count === null || row.document_count === undefined ? null : Number(row.document_count),
    embeddedCount: row.embedded_count === null || row.embedded_count === undefined ? null : Number(row.embedded_count),
    unchangedCount: row.unchanged_count === null || row.unchanged_count === undefined ? null : Number(row.unchanged_count),
    removedCount: row.removed_count === null || row.removed_count === undefined ? null : Number(row.removed_count),
    errorSummary: row.error_summary ? String(row.error_summary) : null,
  };
}

export function mapAnalytics(row: Record<string, unknown>): ChatbotAnalyticsSummary {
  return {
    totalMessages: Number(row.total_messages ?? 0),
    userMessages: Number(row.user_messages ?? 0),
    assistantMessages: Number(row.assistant_messages ?? 0),
    conversations: Number(row.conversations ?? 0),
    errorCount: Number(row.error_count ?? 0),
    averageLatencyMs: row.average_latency_ms === null || row.average_latency_ms === undefined
      ? null
      : Math.round(Number(row.average_latency_ms)),
    fallbackCount: Number(row.fallback_count ?? 0),
    liveCount: Number(row.live_count ?? 0),
  };
}

