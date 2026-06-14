'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, ChevronLeft, Loader2, RefreshCw } from 'lucide-react';
import LoginGate from '@/components/admin/common/LoginGate';
import { TeamboticsSVGLogo } from '@/components/layout/TeamboticsSVGLogo';
import { Button } from '@/components/ui/Button';

type VisitorAnalytics = {
  summary?: {
    totalEvents: number;
    pageViews: number;
    sessions: number;
  };
  topPages?: Array<{ path: string; page_title?: string; views: number }>;
  locations?: Array<{ location_label: string; location_precision: string; sessions: number; events: number }>;
  referrers?: Array<{ referrer_host: string; visits: number }>;
  recentEvents?: Array<{ path: string; event_type: string; location_label: string; referrer_host: string | null; created_at: string }>;
  journeys?: Array<{
    sessionId: string;
    eventCount: number;
    locationLabel: string;
    referrerHost: string | null;
    lastAt: string;
    events: Array<{ path: string; eventType: string; createdAt: string }>;
  }>;
};

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleString('en-CA') : '—';
}

function shortSession(value: string) {
  return value ? value.slice(0, 12) : 'unknown';
}

export default function VisitorAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthConfigured, setIsAuthConfigured] = useState<boolean | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [days, setDays] = useState('14');
  const [data, setData] = useState<VisitorAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    void checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) void loadAnalytics();
  }, [isAuthenticated, days]);

  async function checkSession() {
    try {
      const res = await fetch('/api/admin/session');
      const session = (await res.json()) as { authenticated: boolean; configured: boolean };
      setIsAuthConfigured(session.configured ?? null);
      setIsAuthenticated(session.authenticated ?? false);
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function login(password: string): Promise<boolean> {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = (await res.json()) as { ok: boolean; error?: string };
      if (result.ok) {
        setIsAuthenticated(true);
        return true;
      }
      setLoginError(result.error ?? 'Invalid password.');
      return false;
    } catch {
      setLoginError('Network error. Please try again.');
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function loadAnalytics() {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`/api/admin/visitors?days=${encodeURIComponent(days)}&limit=500`);
      const result = (await res.json()) as { ok?: boolean; error?: string; message?: string } & VisitorAnalytics;
      if (!res.ok || result.ok === false) throw new Error(result.message ?? result.error ?? 'Failed to load visitor analytics.');
      setData(result);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Failed to load visitor analytics.');
    } finally {
      setIsLoading(false);
    }
  }

  if (isAuthenticated === false) {
    return (
      <LoginGate
        title="Visitor Intelligence"
        description="Enter the admin password to view anonymous visitor journeys."
        onLogin={login}
        isLoggingIn={isLoggingIn}
        error={loginError}
        isConfigured={isAuthConfigured}
      />
    );
  }

  const summary = data?.summary ?? { totalEvents: 0, pageViews: 0, sessions: 0 };

  return (
    <main className="admin-shell">
      <div className="admin-page-container">
        <Link href="/admin" className="admin-back-link">
          <ChevronLeft size={16} /> Admin home
        </Link>

        <header className="admin-header">
          <div>
            <div className="admin-brand admin-brand--header">
              <TeamboticsSVGLogo />
              <div>
                <p className="admin-brand__label">Teambotics</p>
                <p className="admin-brand__context">Visitor Intelligence</p>
              </div>
            </div>
            <h1 className="admin-title">Anonymous visitor journeys</h1>
            <p className="admin-subtitle">
              Approximate location, referrer, page path, and session flow. Raw IP addresses are not stored.
            </p>
          </div>
          <div className="admin-actions-row">
            <select value={days} onChange={(event) => setDays(event.target.value)} className="admin-select">
              <option value="1">24 hours</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>
            <Button onClick={loadAnalytics} variant="ghost">
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />} Refresh
            </Button>
          </div>
        </header>

        {loadError ? <div className="admin-alert admin-alert--error">{loadError}</div> : null}

        <section className="admin-metrics-grid">
          <article className="admin-metric-card"><span>Page views</span><strong>{summary.pageViews}</strong></article>
          <article className="admin-metric-card"><span>Sessions</span><strong>{summary.sessions}</strong></article>
          <article className="admin-metric-card"><span>Events</span><strong>{summary.totalEvents}</strong></article>
          <article className="admin-metric-card"><span>Precision</span><strong>Approx.</strong></article>
        </section>

        <section className="admin-two-column-grid">
          <DashboardPanel title="Top pages" empty="No page views yet.">
            {(data?.topPages ?? []).map((item) => (
              <Row key={item.path} title={item.path} detail={item.page_title} value={`${item.views}`} />
            ))}
          </DashboardPanel>
          <DashboardPanel title="Locations" empty="No locations yet.">
            {(data?.locations ?? []).map((item) => (
              <Row key={item.location_label} title={item.location_label} detail={item.location_precision} value={`${item.sessions} sessions`} />
            ))}
          </DashboardPanel>
        </section>

        <section className="admin-two-column-grid">
          <DashboardPanel title="Referrers" empty="No referrers yet.">
            {(data?.referrers ?? []).map((item) => (
              <Row key={item.referrer_host} title={item.referrer_host} value={`${item.visits}`} />
            ))}
          </DashboardPanel>
          <DashboardPanel title="Recent events" empty="No recent events yet.">
            {(data?.recentEvents ?? []).slice(0, 20).map((item) => (
              <Row key={`${item.created_at}-${item.path}`} title={item.path} detail={`${formatDate(item.created_at)} · ${item.location_label ?? 'Unknown'} · ${item.referrer_host ?? 'direct'}`} value={item.event_type} />
            ))}
          </DashboardPanel>
        </section>

        <section className="admin-card">
          <div className="admin-card__header"><BarChart3 size={18} /><h2>Recent journeys</h2></div>
          <div className="admin-list">
            {(data?.journeys ?? []).length === 0 ? <p className="admin-empty">No journeys yet.</p> : null}
            {(data?.journeys ?? []).slice(0, 30).map((journey) => (
              <article key={journey.sessionId} className="admin-journey-card">
                <strong>{journey.locationLabel}</strong>
                <p>Session {shortSession(journey.sessionId)} · {journey.eventCount} events · {formatDate(journey.lastAt)}</p>
                <div className="admin-journey-steps">
                  {journey.events.map((event) => (
                    <div key={`${event.createdAt}-${event.path}`}><span>{event.path}</span><small>{formatDate(event.createdAt)}</small></div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardPanel({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  const list = Array.isArray(children) ? children.filter(Boolean) : children;
  const hasChildren = Array.isArray(list) ? list.length > 0 : Boolean(list);
  return (
    <section className="admin-card">
      <div className="admin-card__header"><h2>{title}</h2></div>
      <div className="admin-list">{hasChildren ? children : <p className="admin-empty">{empty}</p>}</div>
    </section>
  );
}

function Row({ title, detail, value }: { title: string; detail?: string | null; value?: string }) {
  return (
    <div className="admin-row">
      <div><strong>{title}</strong>{detail ? <small>{detail}</small> : null}</div>
      {value ? <span>{value}</span> : null}
    </div>
  );
}
