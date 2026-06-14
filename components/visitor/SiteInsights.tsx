'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const SESSION_KEY = 'teambotics.session.v1';

function makeSessionId() {
  const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `session_${id}`;
}

function getSessionId() {
  try {
    let value = window.sessionStorage.getItem(SESSION_KEY);
    if (!value) {
      value = makeSessionId();
      window.sessionStorage.setItem(SESSION_KEY, value);
    }
    return value;
  } catch {
    return makeSessionId();
  }
}

function isLocalHost() {
  const host = window.location.hostname;
  return host === 'localhost' || host === '0.0.0.0' || host === '::1' || host === '[::1]' || host.startsWith('127.');
}

export function SiteInsights() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || isLocalHost()) return;
    const query = searchParams.toString();
    const path = `${pathname}${query ? `?${query}` : ''}`;
    if (path.startsWith('/admin') || path.startsWith('/api')) return;

    fetch('/api/visitor/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      keepalive: true,
      body: JSON.stringify({
        eventType: 'page_view',
        path,
        pageTitle: document.title || null,
        referrer: document.referrer || null,
        sessionId: getSessionId(),
      }),
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
}
