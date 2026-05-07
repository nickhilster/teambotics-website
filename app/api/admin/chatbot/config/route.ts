import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getNeonClient, getDefaultChatbotSettings, toRows } from '@/lib/neon';
import { getAdminSessionCookieName, isAdminAuthenticated } from '@/lib/adminAuth';
import { mapConfigVersion } from '@/lib/chatbotAdminMapping';
import type { ChatbotAdminConfigResponse, ChatbotDashboardSettings } from '@/types/chatbotAdmin';

async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(getAdminSessionCookieName())?.value ?? null;
}

async function getMostRecentVersion(status: 'live' | 'draft') {
  const client = await getNeonClient();
  const rows = toRows(await client.query(
    'SELECT * FROM chatbot_config_versions WHERE status = $1 ORDER BY version_number DESC LIMIT 1',
    [status],
  ));
  return mapConfigVersion(rows[0] ?? null);
}

async function ensureDefaultConfig() {
  const client = await getNeonClient();
  const countRows = toRows<{ count: number }>(await client.query('SELECT COUNT(*)::integer AS count FROM chatbot_config_versions'));
  if (countRows.length === 0 || Number(countRows[0].count) > 0) {
    return;
  }

  const settings = getDefaultChatbotSettings();
  await client.query(
    `INSERT INTO chatbot_config_versions (
      id,
      version_number,
      status,
      label,
      notes,
      publish_note,
      created_by,
      created_at,
      published_at,
      settings
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now(), $8)`,
    [crypto.randomUUID(), 1, 'live', 'Initial live config', null, null, 'system', JSON.stringify(settings)]
  );
}

export async function GET() {
  await ensureDefaultConfig();
  const liveConfig = await getMostRecentVersion('live');
  const draftConfig = await getMostRecentVersion('draft');

  const response: ChatbotAdminConfigResponse = {
    live: liveConfig,
    draft: draftConfig,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const cookieValue = await getSessionCookie();
  if (!isAdminAuthenticated(cookieValue)) {
    return NextResponse.json({ ok: false, error: 'Authentication required.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const settings = body?.settings as ChatbotDashboardSettings | undefined;
  if (!settings) {
    return NextResponse.json({ ok: false, error: 'Invalid draft payload.' }, { status: 400 });
  }

  const client = await getNeonClient();
  const draft = await getMostRecentVersion('draft');

  if (draft) {
    await client.query(
      'UPDATE chatbot_config_versions SET settings = $1, label = $2, notes = $3 WHERE id = $4',
      [JSON.stringify(settings), 'Draft', null, draft.id]
    );
    return NextResponse.json({ ok: true, draftId: draft.id });
  }

  const countResult = toRows<{ max_version: number | null }>(
    await client.query('SELECT MAX(version_number)::integer AS max_version FROM chatbot_config_versions'),
  );
  const maxVersion = countResult.length > 0 ? Number(countResult[0].max_version ?? 0) : 0;
  const newDraftId = crypto.randomUUID();

  await client.query(
    `INSERT INTO chatbot_config_versions (
      id,
      version_number,
      status,
      label,
      notes,
      publish_note,
      created_by,
      created_at,
      published_at,
      settings
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, now(), NULL, $8)`,
    [newDraftId, maxVersion + 1, 'draft', 'Draft', null, null, 'admin', JSON.stringify(settings)]
  );

  return NextResponse.json({ ok: true, draftId: newDraftId });
}
