import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getNeonClient, getDefaultThemeSettings, toRows } from '@/lib/neon';
import { getAdminSessionCookieName, isAdminAuthenticated } from '@/lib/adminAuth';
import type { ThemeAdminConfigResponse, ThemeDashboardSettings } from '@/types/chatbotAdmin';

const THEME_KEY = 'theme-default';

type ThemeSettingsRecord = {
  id: string;
  draft_settings: ThemeDashboardSettings;
  live_settings: ThemeDashboardSettings;
};

async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(getAdminSessionCookieName())?.value ?? null;
}

async function ensureThemeRecord(client: Awaited<ReturnType<typeof getNeonClient>>) {
  const rows = toRows<ThemeSettingsRecord>(await client.query('SELECT * FROM theme_settings WHERE id = $1', [THEME_KEY]));
  if (rows.length > 0) {
    return rows[0];
  }

  const defaultSettings = getDefaultThemeSettings();
  await client.query(
    'INSERT INTO theme_settings (id, draft_settings, live_settings, updated_at) VALUES ($1, $2, $3, now())',
    [THEME_KEY, JSON.stringify(defaultSettings), JSON.stringify(defaultSettings)]
  );

  return {
    id: THEME_KEY,
    draft_settings: defaultSettings,
    live_settings: defaultSettings,
  };
}

export async function GET() {
  const client = await getNeonClient();
  const record = await ensureThemeRecord(client);

  const response: ThemeAdminConfigResponse = {
    live: record.live_settings as ThemeDashboardSettings,
    draft: record.draft_settings as ThemeDashboardSettings,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const cookieValue = await getSessionCookie();
  if (!isAdminAuthenticated(cookieValue)) {
    return NextResponse.json({ ok: false, error: 'Authentication required.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const settings = body?.settings as ThemeDashboardSettings | undefined;
  if (!settings) {
    return NextResponse.json({ ok: false, error: 'Invalid draft payload.' }, { status: 400 });
  }

  const client = await getNeonClient();
  await ensureThemeRecord(client);
  await client.query('UPDATE theme_settings SET draft_settings = $1, updated_at = now() WHERE id = $2', [JSON.stringify(settings), THEME_KEY]);

  return NextResponse.json({ ok: true, draftId: THEME_KEY });
}
