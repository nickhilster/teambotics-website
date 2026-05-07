import { describe, expect, it } from "vitest";
import { getProductBySlug, productCaseStudies, products } from "@/lib/products";

describe("product case-study content", () => {
  it("exposes the expected Teambotics product routes", () => {
    expect(products.map((product) => product.href)).toEqual([
      "/products/ltb-buddy",
      "/products/easybuddy",
      "/products/code2motion",
      "/products/storytellr",
    ]);
  });

  it("keeps every case study rich enough for a detail page", () => {
    for (const product of productCaseStudies) {
      expect(product.summary.length).toBeGreaterThan(80);
      expect(product.heroSummary.length).toBeGreaterThan(20);
      expect(product.focusPoints).toHaveLength(3);
      expect(product.proofPoints.length).toBeGreaterThanOrEqual(3);
      expect(product.detailSections.length).toBeGreaterThanOrEqual(3);
      expect(product.techStack.length).toBeGreaterThanOrEqual(3);
      expect(product.externalUrl).toMatch(/^https?:\/\//);
      expect(product.supportUrl).toMatch(/^mailto:/);
    }
  });

  it("finds products by slug and returns null for unknown slugs", () => {
    expect(getProductBySlug("ltb-buddy")?.name).toBe("LTB Buddy");
    expect(getProductBySlug("missing-product")).toBeNull();
  });
});
