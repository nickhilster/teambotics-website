import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { mapIngestionRun } from "@/lib/chatbotAdminMapping";
import { getNeonClient } from "@/lib/neon";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const client = await getNeonClient();
  const rows = await client.query(
    "SELECT * FROM chatbot_ingestion_runs ORDER BY started_at DESC LIMIT 25",
  );

  return NextResponse.json({
    runs: Array.isArray(rows)
      ? rows.map((row) => mapIngestionRun(row as Record<string, unknown>))
      : [],
  });
}

export async function POST() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const client = await getNeonClient();
  await client.query(
    `INSERT INTO chatbot_ingestion_runs (
      id,
      status,
      trigger_type,
      started_at
    ) VALUES ($1, 'requested', 'manual', now())`,
    [crypto.randomUUID()],
  );

  return NextResponse.json({
    ok: true,
    message: "Reseed requested. Run pnpm chat:seed to refresh embeddings from the current product content.",
  });
}

