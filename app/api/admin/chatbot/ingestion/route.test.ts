import { afterEach, describe, expect, it, vi } from "vitest";

const requireAdmin = vi.fn();
const runGitHubIngestion = vi.fn();
const query = vi.fn();

vi.mock("@/lib/adminRoute", () => ({
  requireAdmin,
}));

vi.mock("@/lib/chat/githubIngestion", () => ({
  runGitHubIngestion,
}));

vi.mock("@/lib/neon", () => ({
  getNeonClient: vi.fn(async () => ({ query })),
}));

describe("admin ingestion route", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns existing runs on GET for authenticated admins", async () => {
    requireAdmin.mockResolvedValueOnce(null);
    query.mockResolvedValueOnce([
      {
        id: "run-1",
        started_at: new Date().toISOString(),
        status: "succeeded",
        trigger_type: "manual",
      },
    ]);
    const { GET } = await import("@/app/api/admin/chatbot/ingestion/route");

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.runs).toHaveLength(1);
  });

  it("runs manual ingestion on POST for authenticated admins", async () => {
    requireAdmin.mockResolvedValueOnce(null);
    runGitHubIngestion.mockResolvedValueOnce({
      runId: "run-2",
      status: "succeeded",
      triggerType: "manual",
      sourceCount: 4,
      documentCount: 10,
      embeddedCount: 4,
      unchangedCount: 6,
      removedCount: 0,
      errorSummary: null,
    });
    const { POST } = await import("@/app/api/admin/chatbot/ingestion/route");

    const response = await POST();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(runGitHubIngestion).toHaveBeenCalledWith({ triggerType: "manual" });
  });
});