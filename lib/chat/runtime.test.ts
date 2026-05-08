import { describe, expect, it } from "vitest";
import { mapDatabaseSource } from "@/lib/chat/runtime";

describe("chat runtime source mapping", () => {
  it("preserves explicit source keys from stored metadata", () => {
    const source = mapDatabaseSource({
      document_key: "github:owner/easybuddy:README.md#1",
      content: "Repository content",
      similarity: 0.63,
      metadata: {
        title: "EasyBuddy GitHub: README.md",
        route: "/products/easybuddy",
        sourceType: "product",
        sourceKey: "github:owner/easybuddy",
      },
    });

    expect(source.sourceKey).toBe("github:owner/easybuddy");
  });

  it("falls back to the known group key for seeded documents without sourceKey metadata", () => {
    const source = mapDatabaseSource({
      document_key: "product-ltb-buddy-summary",
      content: "LTB Buddy summary",
      similarity: 0.41,
      metadata: {
        title: "LTB Buddy summary",
        route: "/products/ltb-buddy",
        sourceType: "product",
      },
    });

    expect(source.sourceKey).toBe("products");
  });
});