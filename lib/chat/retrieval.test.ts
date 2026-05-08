import { describe, expect, it } from "vitest";
import {
  buildRetrievalQuery,
  filterRetrievedSources,
  normalizeHistory,
  retrieveLocalContext,
  shouldUseConversationHistoryForRetrieval,
} from "@/lib/chat/retrieval";

describe("chat retrieval helpers", () => {
  it("uses recent user history only for follow-up prompts", () => {
    const history = normalizeHistory([
      { role: "user", content: "Tell me about LTB Buddy." },
      { role: "assistant", content: "LTB Buddy is a guided intake product." },
      { role: "user", content: "How does EasyBuddy help service teams?" },
    ]);

    expect(shouldUseConversationHistoryForRetrieval("What about compliance?")).toBe(true);
    expect(buildRetrievalQuery("What about compliance?", history, true)).toContain("LTB Buddy");
    expect(buildRetrievalQuery("Explain Code2Motion's creative platform", history, true)).toBe(
      "Explain Code2Motion's creative platform",
    );
  });

  it("filters local retrieval by source type and preferred route", () => {
    const sources = retrieveLocalContext("LTB Buddy guided legal intake", {
      topK: 3,
      similarityThreshold: 0.05,
      allowedSourceTypes: ["product", "case-study"],
      preferredRoute: "/products/ltb-buddy",
    });

    expect(sources.length).toBeGreaterThan(0);
    expect(sources[0].route).toBe("/products/ltb-buddy");
    expect(sources.every((source) => ["product", "case-study"].includes(source.sourceType))).toBe(true);
  });

  it("respects disabled source types", () => {
    const sources = retrieveLocalContext("Teambotics engagement model", {
      topK: 5,
      similarityThreshold: 0.01,
      disabledSourceTypes: ["company", "capability"],
    });

    expect(sources.every((source) => source.sourceType !== "company")).toBe(true);
    expect(sources.every((source) => source.sourceType !== "capability")).toBe(true);
  });

  it("respects disabled source keys without disabling sibling sources of the same type", () => {
    const sources = filterRetrievedSources(
      [
        {
          id: "products",
          title: "Product summaries",
          excerpt: "",
          similarity: 0.52,
          sourceType: "product",
          sourceKey: "products",
          route: "/products/ltb-buddy",
        },
        {
          id: "github-easybuddy",
          title: "EasyBuddy GitHub knowledge",
          excerpt: "",
          similarity: 0.49,
          sourceType: "product",
          sourceKey: "github:owner/easybuddy",
          route: "/products/easybuddy",
        },
      ],
      {
        disabledSourceKeys: ["github:owner/easybuddy"],
      },
    );

    expect(sources.map((source) => source.id)).toEqual(["products"]);
  });
});
