import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { runChatRuntime } from "@/lib/chat/runtime";

type CompareMode = "live" | "draft";

async function runAdminPrompt(request: Request, prompt: string, label: CompareMode) {
  const start = Date.now();
  const result = await runChatRuntime(request, {
    message: prompt,
    sessionId: `admin-${label}-${crypto.randomUUID()}`,
    pageContext: { pagePath: "/admin/chatbot", pageTitle: "Chatbot Admin" },
  });

  return {
    ok: true,
    prompt,
    response: result.message,
    mode: label,
    sources: result.sources,
    latencyMs: Date.now() - start,
  };
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

  if (!prompt) {
    return NextResponse.json({ ok: false, error: "Prompt is required." }, { status: 400 });
  }

  try {
    const [live, draft] = await Promise.all([
      runAdminPrompt(request, prompt, "live"),
      runAdminPrompt(request, prompt, "draft"),
    ]);

    return NextResponse.json({ prompt, live, draft });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Prompt comparison failed." },
      { status: 500 },
    );
  }
}
