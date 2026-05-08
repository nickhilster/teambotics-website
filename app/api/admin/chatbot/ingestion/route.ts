import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { mapIngestionRun } from "@/lib/chatbotAdminMapping";
import { runGitHubIngestion } from "@/lib/chat/githubIngestion";
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

  try {
    const result = await runGitHubIngestion({ triggerType: "manual" });

    return NextResponse.json({
      ok: result.status !== "failed",
      message: result.status === "failed"
        ? "GitHub ingestion failed."
        : "GitHub ingestion completed.",
      result,
    }, { status: result.status === "failed" ? 500 : 200 });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown ingestion error.",
    }, { status: 500 });
  }
}

