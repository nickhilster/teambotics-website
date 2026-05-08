import { afterEach, describe, expect, it, vi } from "vitest";

const runGitHubIngestion = vi.fn();

vi.mock("@/lib/chat/githubIngestion", () => ({
  runGitHubIngestion,
}));

describe("GET /api/cron/ingest-github", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    delete process.env.CRON_SECRET;
  });

  it("rejects unauthorized requests", async () => {
    process.env.CRON_SECRET = "secret";
    const { GET } = await import("@/app/api/cron/ingest-github/route");

    const response = await GET(new Request("http://localhost/api/cron/ingest-github"));
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload.ok).toBe(false);
    expect(runGitHubIngestion).not.toHaveBeenCalled();
  });

  it("runs ingestion for authorized cron requests", async () => {
    process.env.CRON_SECRET = "secret";
    runGitHubIngestion.mockResolvedValueOnce({
      runId: "run-1",
      status: "succeeded",
      triggerType: "cron",
      sourceCount: 4,
      documentCount: 12,
      embeddedCount: 6,
      unchangedCount: 6,
      removedCount: 0,
      errorSummary: null,
    });
    const { GET } = await import("@/app/api/cron/ingest-github/route");

    const response = await GET(new Request("http://localhost/api/cron/ingest-github", {
      headers: {
        authorization: "Bearer secret",
      },
    }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(runGitHubIngestion).toHaveBeenCalledWith({ triggerType: "cron" });
  });
});