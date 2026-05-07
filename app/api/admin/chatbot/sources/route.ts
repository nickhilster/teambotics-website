import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { mapSource } from "@/lib/chatbotAdminMapping";
import { KNOWN_SOURCE_GROUPS } from "@/lib/chat/sources";
import { getNeonClient } from "@/lib/neon";

async function ensureSources() {
  const client = await getNeonClient();
  const now = new Date().toISOString();

  for (const source of KNOWN_SOURCE_GROUPS) {
    await client.query(
      `INSERT INTO chatbot_sources (
        id,
        source_key,
        name,
        label,
        source_type,
        enabled,
        route_scope,
        stale_after_days,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, true, $6, $7, $8)
      ON CONFLICT (source_key) DO NOTHING`,
      [
        source.sourceKey,
        source.sourceKey,
        source.label,
        source.label,
        source.sourceType,
        source.routeScope,
        source.staleAfterDays,
        now,
      ],
    );
  }
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await ensureSources();
  const client = await getNeonClient();
  const rows = await client.query("SELECT * FROM chatbot_sources ORDER BY source_key ASC");

  return NextResponse.json({
    sources: Array.isArray(rows)
      ? rows.map((row) => mapSource(row as Record<string, unknown>))
      : [],
  });
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const sourceKey = typeof body?.sourceKey === "string" ? body.sourceKey.trim() : "";
  const enabled = typeof body?.enabled === "boolean" ? body.enabled : null;

  if (!sourceKey || enabled === null) {
    return NextResponse.json({ ok: false, error: "sourceKey and enabled are required." }, { status: 400 });
  }

  await ensureSources();
  const client = await getNeonClient();
  const rows = await client.query(
    `UPDATE chatbot_sources
     SET enabled = $1, updated_at = now()
     WHERE source_key = $2
     RETURNING *`,
    [enabled, sourceKey],
  );

  const source = Array.isArray(rows) && rows.length > 0
    ? mapSource(rows[0] as Record<string, unknown>)
    : null;

  if (!source) {
    return NextResponse.json({ ok: false, error: "Source not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, source });
}

