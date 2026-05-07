import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getNeonClient, toRows } from '@/lib/neon';
import { getAdminSessionCookieName, isAdminAuthenticated } from '@/lib/adminAuth';

async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(getAdminSessionCookieName())?.value ?? null;
}

async function getLatestDraft(client: Awaited<ReturnType<typeof getNeonClient>>) {
  const rows = toRows<{ id: string }>(await client.query(
    "SELECT id FROM chatbot_config_versions WHERE status = 'draft' ORDER BY version_number DESC LIMIT 1",
  ));
  return rows[0] ?? null;
}

export async function POST() {
  const cookieValue = await getSessionCookie();
  if (!isAdminAuthenticated(cookieValue)) {
    return NextResponse.json({ ok: false, error: 'Authentication required.' }, { status: 401 });
  }

  const client = await getNeonClient();
  const draft = await getLatestDraft(client);
  if (!draft) {
    return NextResponse.json({ ok: false, error: 'No draft available to publish.' }, { status: 404 });
  }

  await client.query("UPDATE chatbot_config_versions SET status = 'archived' WHERE status = 'live'");
  await client.query(
    "UPDATE chatbot_config_versions SET status = 'live', published_at = now() WHERE id = $1",
    [draft.id]
  );

  return NextResponse.json({ ok: true, liveVersionId: draft.id });
}
