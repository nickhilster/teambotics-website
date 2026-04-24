import { NextResponse } from 'next/server';
import { getNeonClient, getDefaultChatbotSettings } from '@/lib/neon';
import type { ChatbotDashboardSettings } from '@/types/chatbotAdmin';

async function fetchChatConfig(): Promise<ChatbotDashboardSettings> {
  const client = await getNeonClient();
  const result = await client.query(
    "SELECT settings FROM chatbot_config_versions WHERE status = 'live' ORDER BY version_number DESC LIMIT 1"
  );

  if (Array.isArray(result) && result.length > 0 && result[0].settings) {
    return result[0].settings as ChatbotDashboardSettings;
  }

  return getDefaultChatbotSettings();
}

async function logChatMessage(payload: {
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  mode: string;
  model: string | null;
  retrievalEnabled: boolean;
  matchedSources: unknown[];
  latencyMs: number | null;
  errorCode?: string | null;
  errorMessage?: string | null;
}) {
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
    ]
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId.trim() : crypto.randomUUID();
  const pageContext = typeof body?.pageContext === 'object' ? body.pageContext : {};

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const start = Date.now();
  const chatConfig = await fetchChatConfig();

  try {
    const responseText = `Hi — I’m the Teambotics assistant. I saw you are on ${pageContext.pagePath || 'the site'}, and I’m ready to answer questions about Teambotics’ products, design, or operations workflow.`;

    await logChatMessage({
      conversationId: sessionId,
      role: 'user',
      content: message,
      mode: 'live',
      model: chatConfig.model?.chatModel ?? 'unknown',
      retrievalEnabled: Boolean(chatConfig.retrieval?.enabled),
      matchedSources: [],
      latencyMs: null,
    });

    const latency = Date.now() - start;

    await logChatMessage({
      conversationId: sessionId,
      role: 'assistant',
      content: responseText,
      mode: 'live',
      model: chatConfig.model?.chatModel ?? 'unknown',
      retrievalEnabled: Boolean(chatConfig.retrieval?.enabled),
      matchedSources: [],
      latencyMs: latency,
    });

    return NextResponse.json({ response: responseText, sessionId });
  } catch (error) {
    await logChatMessage({
      conversationId: sessionId,
      role: 'assistant',
      content: '',
      mode: 'live',
      model: chatConfig.model?.chatModel ?? 'unknown',
      retrievalEnabled: Boolean(chatConfig.retrieval?.enabled),
      matchedSources: [],
      latencyMs: Date.now() - start,
      errorCode: 'CHAT_ERROR',
      errorMessage: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: 'Unable to process chat request.' },
      { status: 500 }
    );
  }
}
