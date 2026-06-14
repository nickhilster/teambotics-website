import { randomUUID } from 'crypto';
import { type NextRequest, NextResponse } from 'next/server';
import { getNeonClient, toRows } from '@/lib/neon';

const DEFAULT_SITE = 'teambotics.app';
const SESSION_COOKIE = 'tb_site_session';

type VisitorEventInput = {
  site?: string | null;
  eventType?: string | null;
  path?: string | null;
  pageTitle?: string | null;
  referrer?: string | null;
  sessionId?: string | null;
};

type AnalyticsFilters = {
  site?: string;
  days?: number;
  limit?: number;
};

let schemaReady: Promise<void> | null = null;

function safeText(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function titleCase(value: string | null) {
  if (!value) return null;
  return value
    .split(/[\s_-]+/g)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(' ');
}

function parseCoordinate(value: string | null) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getHeader(request: NextRequest, name: string) {
  return request.headers.get(name);
}

function normalizeCountry(value: string | null) {
  return safeText(value, 8)?.toUpperCase() ?? null;
}

function inferTorontoArea(city: string | null, latitude: number | null, longitude: number | null) {
  if (!city || city.toLowerCase() !== 'toronto' || latitude == null || longitude == null) return null;
  if (longitude < -79.5) return 'Etobicoke / west Toronto area';
  if (longitude > -79.28) return 'Scarborough / east Toronto area';
  if (latitude > 43.72) return 'North York / north Toronto area';
  if (latitude >= 43.68 && latitude <= 43.72) return 'Midtown Toronto area';
  if (latitude >= 43.63 && latitude < 43.68 && longitude >= -79.43 && longitude <= -79.34) return 'Downtown Toronto area';
  if (longitude < -79.43) return 'West-end Toronto area';
  if (longitude > -79.34) return 'East-end Toronto area';
  return 'Toronto area';
}

function getGeoContext(request: NextRequest) {
  const country = normalizeCountry(getHeader(request, 'x-vercel-ip-country'));
  const region = safeText(getHeader(request, 'x-vercel-ip-country-region'), 80);
  const city = titleCase(safeText(getHeader(request, 'x-vercel-ip-city'), 120));
  const latitude = parseCoordinate(getHeader(request, 'x-vercel-ip-latitude'));
  const longitude = parseCoordinate(getHeader(request, 'x-vercel-ip-longitude'));
  const timezone = safeText(getHeader(request, 'x-vercel-ip-timezone'), 120);
  const postalCode = safeText(getHeader(request, 'x-vercel-ip-postal-code'), 40);
  const area = inferTorontoArea(city, latitude, longitude);
  const locationParts = [area ?? city, region, country].filter(Boolean);

  return {
    country,
    region,
    city,
    latitude,
    longitude,
    timezone,
    postalCode,
    locationLabel: locationParts.length > 0 ? locationParts.join(', ') : 'Unknown location',
    locationPrecision: area ? 'area_estimate' : latitude != null && longitude != null ? 'coordinates' : city ? 'city' : 'unknown',
  };
}

function normalizePath(value: string | null | undefined) {
  const raw = safeText(value, 800) ?? '/';
  try {
    const parsed = new URL(raw, 'https://www.teambotics.app');
    return parsed.pathname || '/';
  } catch {
    return raw.startsWith('/') ? raw.split('?')[0] || '/' : '/';
  }
}

function getReferrerHost(referrer: string | null) {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function isBotUserAgent(userAgent: string | null) {
  if (!userAgent) return false;
  return /(bot|crawler|spider|preview|slurp|facebookexternalhit|linkedinbot|whatsapp|telegrambot|discordbot|google-inspectiontool)/i.test(userAgent);
}

function parseSearchParams(path: string | null | undefined) {
  try {
    return new URL(path ?? '/', 'https://www.teambotics.app').searchParams;
  } catch {
    return new URLSearchParams();
  }
}

async function ensureVisitorSchema() {
  const sql = await getNeonClient();
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql.query(`
        create table if not exists visitor_events (
          id text primary key,
          site text not null default 'teambotics.app',
          event_type text not null default 'page_view',
          path text not null,
          page_title text,
          referrer text,
          referrer_host text,
          session_id text not null,
          utm_source text,
          utm_medium text,
          utm_campaign text,
          utm_content text,
          utm_term text,
          country text,
          region text,
          city text,
          latitude numeric,
          longitude numeric,
          timezone text,
          postal_code text,
          location_label text not null default 'Unknown location',
          location_precision text not null default 'unknown',
          created_at timestamptz not null default now()
        )
      `);
      await sql.query('create index if not exists idx_visitor_events_site_created_at on visitor_events (site, created_at desc)');
      await sql.query('create index if not exists idx_visitor_events_path on visitor_events (path)');
      await sql.query('create index if not exists idx_visitor_events_session on visitor_events (session_id, created_at asc)');
    })();
  }
  await schemaReady;
  return sql;
}

export function getOrCreateSessionId(request: NextRequest, response?: NextResponse) {
  const existing = request.cookies.get(SESSION_COOKIE)?.value;
  if (existing) return existing;
  const created = `session_${randomUUID()}`;
  response?.cookies.set(SESSION_COOKIE, created, {
    path: '/',
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 2,
  });
  return created;
}

export async function recordVisitorEvent(request: NextRequest, input: VisitorEventInput, response?: NextResponse) {
  const path = normalizePath(input.path);
  if (path.startsWith('/admin') || path.startsWith('/api')) return { ok: true, skipped: 'internal-path' };
  if (isBotUserAgent(getHeader(request, 'user-agent'))) return { ok: true, skipped: 'bot' };

  const sql = await ensureVisitorSchema();
  const referrer = safeText(input.referrer, 1000) ?? safeText(getHeader(request, 'referer'), 1000);
  const geo = getGeoContext(request);
  const search = parseSearchParams(input.path);
  const sessionId = safeText(input.sessionId, 120) ?? getOrCreateSessionId(request, response);

  await sql`
    insert into visitor_events (
      id, site, event_type, path, page_title, referrer, referrer_host, session_id,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      country, region, city, latitude, longitude, timezone, postal_code, location_label, location_precision
    ) values (
      ${randomUUID()}, ${safeText(input.site, 120) ?? DEFAULT_SITE}, ${safeText(input.eventType, 40) ?? 'page_view'},
      ${path}, ${safeText(input.pageTitle, 240)}, ${referrer}, ${getReferrerHost(referrer)}, ${sessionId},
      ${safeText(search.get('utm_source'), 120)}, ${safeText(search.get('utm_medium'), 120)}, ${safeText(search.get('utm_campaign'), 160)},
      ${safeText(search.get('utm_content'), 160)}, ${safeText(search.get('utm_term'), 160)},
      ${geo.country}, ${geo.region}, ${geo.city}, ${geo.latitude}, ${geo.longitude}, ${geo.timezone}, ${geo.postalCode}, ${geo.locationLabel}, ${geo.locationPrecision}
    )
  `;

  return { ok: true };
}

function buildWhere(filters: AnalyticsFilters) {
  const days = Math.max(1, Math.min(90, filters.days ?? 14));
  const params: Array<string | number> = [days];
  const conditions = [`created_at >= now() - ($1::int * interval '1 day')`];
  if (filters.site && filters.site !== 'all') {
    params.push(filters.site);
    conditions.push(`site = $${params.length}`);
  }
  return { clause: `where ${conditions.join(' and ')}`, params };
}

export async function getVisitorAnalytics(filters: AnalyticsFilters = {}) {
  const sql = await ensureVisitorSchema();
  const where = buildWhere(filters);
  const limit = Math.max(20, Math.min(1000, filters.limit ?? 500));

  const totals = toRows<{ total_events: number; page_views: number; sessions: number }>(await sql.query(
    `select count(*)::int as total_events,
            count(*) filter (where event_type = 'page_view')::int as page_views,
            count(distinct session_id)::int as sessions
     from visitor_events ${where.clause}`,
    where.params,
  ));
  const topPages = toRows(await sql.query(
    `select path, coalesce(max(page_title), '') as page_title, count(*)::int as views
     from visitor_events ${where.clause} group by path order by views desc, path asc limit 20`,
    where.params,
  ));
  const referrers = toRows(await sql.query(
    `select coalesce(nullif(referrer_host, ''), 'direct') as referrer_host, count(*)::int as visits
     from visitor_events ${where.clause} group by coalesce(nullif(referrer_host, ''), 'direct') order by visits desc limit 20`,
    where.params,
  ));
  const locations = toRows(await sql.query(
    `select location_label, country, region, city, location_precision, count(*)::int as events, count(distinct session_id)::int as sessions
     from visitor_events ${where.clause} group by location_label, country, region, city, location_precision order by sessions desc, events desc limit 30`,
    where.params,
  ));
  const recentEvents = toRows<Record<string, unknown>>(await sql.query(
    `select id, site, event_type, path, page_title, referrer_host, country, region, city, location_label, location_precision, session_id, created_at
     from visitor_events ${where.clause} order by created_at desc limit $${where.params.length + 1}`,
    [...where.params, limit],
  ));

  const journeysBySession = new Map<string, Record<string, unknown>[]>();
  for (const event of [...recentEvents].reverse()) {
    const sessionId = String(event.session_id ?? 'unknown');
    const list = journeysBySession.get(sessionId) ?? [];
    list.push(event);
    journeysBySession.set(sessionId, list);
  }
  const journeys = Array.from(journeysBySession.entries()).map(([sessionId, events]) => {
    const first = events[0] ?? {};
    const last = events[events.length - 1] ?? {};
    return {
      sessionId,
      eventCount: events.length,
      startedAt: first.created_at,
      lastAt: last.created_at,
      locationLabel: last.location_label ?? first.location_label ?? 'Unknown location',
      referrerHost: first.referrer_host ?? 'direct',
      events: events.map((event) => ({ createdAt: event.created_at, eventType: event.event_type, path: event.path, pageTitle: event.page_title })),
    };
  }).sort((a, b) => String(b.lastAt).localeCompare(String(a.lastAt))).slice(0, 80);

  return {
    summary: {
      totalEvents: Number(totals[0]?.total_events ?? 0),
      pageViews: Number(totals[0]?.page_views ?? 0),
      sessions: Number(totals[0]?.sessions ?? 0),
    },
    topPages,
    referrers,
    locations,
    recentEvents,
    journeys,
  };
}
