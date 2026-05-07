import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getNeonClient } from '@/lib/neon';
import { getAdminSessionCookieName, isAdminAuthenticated } from '@/lib/adminAuth';

const THEME_KEY = 'theme-default';

async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(getAdminSessionCookieName())?.value ?? null;
}

export async function POST() {
  const cookieValue = await getSessionCookie();
  if (!isAdminAuthenticated(cookieValue)) {
    return NextResponse.json({ ok: false, error: 'Authentication required.' }, { status: 401 });
  }

  const client = await getNeonClient();
  await client.query(
    'UPDATE theme_settings SET live_settings = draft_settings, updated_at = now() WHERE id = $1',
    [THEME_KEY]
  );

  return NextResponse.json({ ok: true });
}
