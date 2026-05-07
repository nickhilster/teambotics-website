import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { mapLog } from "@/lib/chatbotAdminMapping";
import { getNeonClient } from "@/lib/neon";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const url = new URL(request.url);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? 50)));
  const mode = url.searchParams.get("mode");
  const hasError = url.searchParams.get("error") === "true";
  const where: string[] = [];
  const params: unknown[] = [];

  if (mode) {
    params.push(mode);
    where.push(`mode = $${params.length}`);
  }

  if (hasError) {
    where.push("error_code IS NOT NULL");
  }

  params.push(limit);
  const rows = await getNeonClient().then((client) => client.query(
    `SELECT *
     FROM chatbot_logs
     ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
     ORDER BY created_at DESC
     LIMIT $${params.length}`,
    params,
  ));

  return NextResponse.json({
    logs: Array.isArray(rows)
      ? rows.map((row) => mapLog(row as Record<string, unknown>))
      : [],
  });
}

