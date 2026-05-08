import { afterEach, describe, expect, it, vi } from "vitest";

const query = vi.fn();

vi.mock("@/lib/neon", () => ({
  getNeonClient: vi.fn(async () => ({ query })),
}));

describe("POST /api/leads", () => {
  afterEach(() => {
    query.mockReset();
  });

  it("returns validation errors for invalid input", async () => {
    const { POST } = await import("@/app/api/leads/route");
    const response = await POST(new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "bad", message: "" }),
    }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.ok).toBe(false);
    expect(payload.errors.name).toBeDefined();
    expect(query).not.toHaveBeenCalled();
  });

  it("persists a valid lead submission", async () => {
    query.mockResolvedValueOnce([]);

    const { POST } = await import("@/app/api/leads/route");
    const response = await POST(new Request("http://localhost/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "vitest",
      },
      body: JSON.stringify({
        name: "Nikhil Khedkar",
        email: "nikhil@example.com",
        organization: "Teambotics",
        interestArea: "AI chatbot or assistant",
        message: "We want to discuss a grounded assistant for regulated operations.",
        pagePath: "/",
        website: "",
      }),
    }));
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.ok).toBe(true);
    expect(query).toHaveBeenCalledTimes(1);
    expect(query.mock.calls[0]?.[0]).toContain("INSERT INTO leads");
    expect(query.mock.calls[0]?.[1]).toEqual(expect.arrayContaining([
      "Nikhil Khedkar",
      "nikhil@example.com",
      "Teambotics",
      "AI chatbot or assistant",
      "We want to discuss a grounded assistant for regulated operations.",
      "/",
      "vitest",
    ]));
  });
});