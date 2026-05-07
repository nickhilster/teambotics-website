import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { mapAnalytics } from "@/lib/chatbotAdminMapping";
import { getNeonClient } from "@/lib/neon";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const client = await getNeonClient();
  const rows = await client.query(`
    SELECT
      COUNT(*)::integer AS total_messages,
      COUNT(*) FILTER (WHERE role = 'user')::integer AS user_messages,
      COUNT(*) FILTER (WHERE role = 'assistant')::integer AS assistant_messages,
      COUNT(DISTINCT conversation_id)::integer AS conversations,
      COUNT(*) FILTER (WHERE error_code IS NOT NULL)::integer AS error_count,
      AVG(latency_ms) FILTER (WHERE latency_ms IS NOT NULL) AS average_latency_ms,
      COUNT(*) FILTER (WHERE mode = 'fallback')::integer AS fallback_count,
      COUNT(*) FILTER (WHERE mode = 'live')::integer AS live_count
    FROM chatbot_logs
  `);

  return NextResponse.json({
    summary: mapAnalytics((Array.isArray(rows) ? rows[0] : {}) as Record<string, unknown>),
  });
}

