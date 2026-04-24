import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAdminSessionCookieName, isAdminAuthenticated } from '@/lib/adminAuth';

export async function GET() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(getAdminSessionCookieName())?.value ?? null;
  return NextResponse.json({
    authenticated: isAdminAuthenticated(cookieValue),
    configured: Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET),
  });
}
