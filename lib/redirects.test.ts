import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

describe("FeedbackFish redirects", () => {
  it("permanently redirects /feedbackfish and subpaths to NikDesign", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const destination = "https://www.nikdesign.ca/feedbackfish";

    for (const source of ["/feedbackfish", "/feedbackfish/:path*"]) {
      const rule = redirects.find((entry) => entry.source === source);
      expect(rule?.destination).toBe(destination);
      expect(rule?.permanent).toBe(true);
    }
  });
});
