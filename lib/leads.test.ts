import { describe, expect, it } from "vitest";
import { validateLeadSubmission } from "@/lib/leads";

describe("lead validation", () => {
  it("accepts a valid lead payload and normalizes optional values", () => {
    const result = validateLeadSubmission({
      name: "Nikhil Khedkar",
      email: "NIKHIL@EXAMPLE.COM",
      organization: "Teambotics",
      interestArea: "Workflow strategy",
      message: "We need a better intake and workflow orchestration layer for a live team.",
      pagePath: "/",
      website: "",
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error("Expected a valid lead payload.");
    }

    expect(result.data.email).toBe("nikhil@example.com");
    expect(result.data.pagePath).toBe("/");
    expect(result.data.interestArea).toBe("Workflow strategy");
  });

  it("rejects invalid required fields", () => {
    const result = validateLeadSubmission({
      name: "",
      email: "not-an-email",
      message: "",
      website: "",
    });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error("Expected invalid lead payload.");
    }

    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
    expect(result.spam).toBe(false);
  });

  it("flags honeypot submissions as spam", () => {
    const result = validateLeadSubmission({
      name: "Spam Bot",
      email: "spam@example.com",
      message: "hello",
      website: "https://spam.example.com",
    });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error("Expected honeypot submission to be rejected.");
    }

    expect(result.spam).toBe(true);
    expect(result.errors).toEqual({});
  });
});