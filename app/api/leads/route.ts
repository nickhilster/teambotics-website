import { NextResponse } from "next/server";
import { getNeonClient } from "@/lib/neon";
import { validateLeadSubmission } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateLeadSubmission(body);

  if (!validation.success) {
    if (validation.spam) {
      return NextResponse.json({ ok: true, message: "Thanks, your note has been received." });
    }

    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  try {
    const client = await getNeonClient();
    await client.query(
      `INSERT INTO leads (
        id,
        name,
        email,
        organization,
        interest_area,
        message,
        page_path,
        user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        crypto.randomUUID(),
        validation.data.name,
        validation.data.email,
        validation.data.organization,
        validation.data.interestArea,
        validation.data.message,
        validation.data.pagePath,
        request.headers.get("user-agent"),
      ],
    );

    return NextResponse.json(
      { ok: true, message: "Thanks. Teambotics will follow up shortly." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "Lead capture is temporarily unavailable. Please email hello@teambotics.app.",
        },
      },
      { status: 503 },
    );
  }
}