import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { mapConfigSummary } from "@/lib/chatbotAdminMapping";
import { getNeonClient } from "@/lib/neon";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const client = await getNeonClient();
  const rows = await client.query(
    "SELECT * FROM chatbot_config_versions ORDER BY version_number DESC LIMIT 50",
  );

  return NextResponse.json({
    versions: Array.isArray(rows)
      ? rows.map((row) => mapConfigSummary(row as Record<string, unknown>))
      : [],
  });
}

