import { NextResponse } from 'next/server';
import { createAdminSessionToken, getAdminPassword, getAdminSessionCookieName } from '@/lib/adminAuth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    return NextResponse.json({ ok: false, error: 'Admin password is not configured.' }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ ok: false, error: 'Invalid password.' }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
