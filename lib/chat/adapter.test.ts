import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fetchChatConfig = vi.fn(async () => ({}));
const logChatMessage = vi.fn(async (_payload: unknown) => undefined);
const buildFallbackReply = vi.fn((_sources: unknown, _pageContext: unknown) => ({
  message: "fallback copy",
  suggestions: ["Tell me about LTB Buddy"],
}));
const takeRateLimitToken = vi.fn((_key: string, _limit: number, _windowMs: number) => ({
  allowed: true,
  remaining: 19,
  resetAt: 0,
}));

vi.mock("@/lib/chat/runtime", () => ({
  fetchChatConfig: () => fetchChatConfig(),
  logChatMessage: (payload: unknown) => logChatMessage(payload),
  buildFallbackReply: (sources: unknown, pageContext: unknown) =>
    buildFallbackReply(sources, pageContext),
}));

vi.mock("@/lib/chat/rateLimit", () => ({
  takeRateLimitToken: (key: string, limit: number, windowMs: number) =>
    takeRateLimitToken(key, limit, windowMs),
}));

import { runChatViaBackend } from "@/lib/chat/adapter";

const settings = {
  operations: { chatEnabled: true, rateLimitRequests: 20, rateLimitWindowMs: 60_000 },
  retrieval: { enabled: true },
  model: { chatModel: "gpt-4o-mini" },
};

function request(ip = "203.0.113.7") {
  return new Request("https://teambotics.app/api/chat", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
  });
}

function backendOk(payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  fetchChatConfig.mockResolvedValue(settings);
  takeRateLimitToken.mockReturnValue({ allowed: true, remaining: 19, resetAt: 0 });
  process.env.NIKBOT_BACKEND_URL = "https://backend.example/api/chat";
  process.env.NIKBOT_SITE_KEY = "test-site-key";
  delete process.env.NIKBOT_PROTECTION_BYPASS;
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.NIKBOT_BACKEND_URL;
  delete process.env.NIKBOT_SITE_KEY;
});

describe("runChatViaBackend", () => {
  it("returns the offline response without calling the backend when chat is disabled", async () => {
    fetchChatConfig.mockResolvedValue({
      ...settings,
      operations: { ...settings.operations, chatEnabled: false },
    });
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await runChatViaBackend(request(), { message: "Hello" });

    expect(result.message).toContain("currently offline");
    expect(result.mode).toBe("grounded-refusal");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("throws the 429 response when the local rate limit is exhausted", async () => {
    takeRateLimitToken.mockReturnValue({ allowed: false, remaining: 0, resetAt: 123 });

    await expect(runChatViaBackend(request(), { message: "Hello" })).rejects.toMatchObject({
      status: 429,
    });
  });

  it("proxies to the backend with site auth headers and maps the response to the widget shape", async () => {
    const fetchSpy = vi.fn(async () =>
      backendOk({
        message: "Teambotics builds workflow systems.",
        conversationId: "conv-1",
        sources: [{ id: "company-what-teambotics-does", sourceType: "company" }],
        suggestions: ["Tell me about LTB Buddy"],
        mode: "live",
      }),
    );
    vi.stubGlobal("fetch", fetchSpy);

    const result = await runChatViaBackend(request(), {
      message: "What does Teambotics do?",
      sessionId: "sess-9",
      pageContext: { pagePath: "/about" },
    });

    const [, init] = fetchSpy.mock.calls[0] as unknown as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(headers["x-nikbot-site"]).toBe("teambotics");
    expect(headers["x-nikbot-site-key"]).toBe("test-site-key");
    expect(headers["x-nikbot-client-ip"]).toBe("203.0.113.7");
    expect(JSON.parse(init.body as string)).toMatchObject({
      message: "What does Teambotics do?",
      sessionId: "sess-9",
    });

    expect(result.message).toBe("Teambotics builds workflow systems.");
    expect(result.response).toBe(result.message);
    expect(result.conversationId).toBe("conv-1");
    expect(result.sessionId).toBe("conv-1");
    expect(result.mode).toBe("live");
    expect(logChatMessage).toHaveBeenCalledTimes(2);
    expect(logChatMessage.mock.calls[0][0]).toMatchObject({ role: "user", mode: "input" });
    expect(logChatMessage.mock.calls[1][0]).toMatchObject({ role: "assistant", mode: "live" });
  });

  it("passes backend moderation rejections through untouched", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ error: "Message not allowed", message: "I cannot respond to that." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(runChatViaBackend(request(), { message: "bad" })).rejects.toMatchObject({
      status: 400,
    });
    expect(logChatMessage).not.toHaveBeenCalled();
  });

  it("degrades to the local fallback reply when the backend fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("boom", { status: 500 })),
    );

    const result = await runChatViaBackend(request(), { message: "What does Teambotics do?" });

    expect(result.mode).toBe("fallback");
    expect(result.fallbackReason).toBe("generation-failed");
    expect(result.message).toBe("fallback copy");
    expect(result.sources).toEqual([]);
  });

  it("reports not-configured when the backend env is missing", async () => {
    delete process.env.NIKBOT_SITE_KEY;
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await runChatViaBackend(request(), { message: "Hello" });

    expect(result.fallbackReason).toBe("not-configured");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
