import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminRoute';
import { getVisitorAnalytics } from '@/lib/visitorAnalytics';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const days = Number.parseInt(searchParams.get('days') ?? '14', 10);
  const limit = Number.parseInt(searchParams.get('limit') ?? '500', 10);

  try {
    const analytics = await getVisitorAnalytics({ site: 'teambotics.app', days, limit });
    return NextResponse.json({ ok: true, ...analytics });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: 'Failed to load visitor analytics.',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
