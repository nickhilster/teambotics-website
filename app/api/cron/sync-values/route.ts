import { NextResponse } from "next/server";
import { runValuesSync } from "@/lib/values/synthesize";

export const runtime = "nodejs";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    throw new Error("CRON_SECRET must be configured for cron ingestion.");
  }

  const authorization = request.headers.get("authorization");
  const explicitHeader = request.headers.get("x-cron-secret");

  return authorization === `Bearer ${secret}` || explicitHeader === secret;
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    const result = await runValuesSync();
    return NextResponse.json({ ok: result.status === "succeeded", result }, { status: result.status === "failed" ? 500 : 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown values sync error." },
      { status: 500 },
    );
  }
}
