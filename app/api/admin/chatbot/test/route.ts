import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { runChatRuntime } from "@/lib/chat/runtime";

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

  if (!prompt) {
    return NextResponse.json({ ok: false, error: "Prompt is required." }, { status: 400 });
  }

  const start = Date.now();

  try {
    const result = await runChatRuntime(request, {
      message: prompt,
      sessionId: `admin-test-${crypto.randomUUID()}`,
      pageContext: { pagePath: "/admin/chatbot", pageTitle: "Chatbot Admin" },
    });

    return NextResponse.json({
      ok: true,
      prompt,
      response: result.message,
      mode: "live",
      sources: result.sources,
      latencyMs: Date.now() - start,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Prompt test failed." },
      { status: 500 },
    );
  }
}
