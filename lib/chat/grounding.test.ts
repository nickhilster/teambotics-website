import { describe, expect, it } from "vitest";
import { filterGroundedSources, getGroundingThreshold } from "@/lib/chat/grounding";
import { getDefaultChatbotSettings } from "@/lib/neon";

describe("chat grounding helpers", () => {
  it("uses the stronger grounding threshold when strict grounding is enabled", () => {
    const settings = getDefaultChatbotSettings();

    expect(getGroundingThreshold(settings)).toBe(0.28);
  });

  it("filters out sources below the strict grounding threshold", () => {
    const settings = getDefaultChatbotSettings();
    const sources = [
      { id: "a", title: "Weak", excerpt: "", similarity: 0.24, sourceType: "company" },
      { id: "b", title: "Strong", excerpt: "", similarity: 0.34, sourceType: "company" },
    ];

    expect(filterGroundedSources(sources, settings).map((source) => source.id)).toEqual(["b"]);
  });
});