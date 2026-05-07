import { NextResponse } from "next/server";
import { runChatRuntime, type ChatRuntimeRequest } from "@/lib/chat/runtime";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as ChatRuntimeRequest | null;
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (message.length > 1500) {
    return NextResponse.json(
      { error: "Message too long", message: "Please keep your message under 1500 characters." },
      { status: 400 },
    );
  }

  try {
    const result = await runChatRuntime(request, { ...body, message });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    return NextResponse.json(
      {
        error: "Unable to process chat request.",
        message: error instanceof Error ? error.message : "Unknown chat runtime error.",
      },
      { status: 500 },
    );
  }
}

