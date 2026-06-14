import { NextRequest, NextResponse } from 'next/server';
import { recordVisitorEvent } from '@/lib/visitorAnalytics';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });

  try {
    const body = await request.json().catch(() => ({}));
    const result = await recordVisitorEvent(request, {
      site: 'teambotics.app',
      eventType: typeof body.eventType === 'string' ? body.eventType : 'page_view',
      path: typeof body.path === 'string' ? body.path : '/',
      pageTitle: typeof body.pageTitle === 'string' ? body.pageTitle : null,
      referrer: typeof body.referrer === 'string' ? body.referrer : null,
      sessionId: typeof body.sessionId === 'string' ? body.sessionId : null,
    }, response);

    return NextResponse.json(result, { headers: response.headers });
  } catch {
    return NextResponse.json({ ok: false, error: 'visitor-log-failed' }, { status: 200 });
  }
}
