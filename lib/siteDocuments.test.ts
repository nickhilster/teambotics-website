import { describe, expect, it } from "vitest";
import { getSiteDocument } from "@/lib/siteDocuments";

describe("site documents", () => {
  it("sanitizes draft-only review content for the privacy page", () => {
    const privacy = getSiteDocument("privacy");

    expect(privacy.markdown).not.toContain("Draft for review");
    expect(privacy.markdown).not.toContain("TODO(");
    expect(privacy.markdown).toContain("Information We Collect");
  });

  it("normalizes the public terms markdown and plain text", () => {
    const terms = getSiteDocument("terms");

    expect(terms.markdown).not.toContain("[DATE");
    expect(terms.markdown).not.toContain("./chatbot-disclaimer.md");
    expect(terms.plainText).toContain("Chatbot Limitations");
  });
});