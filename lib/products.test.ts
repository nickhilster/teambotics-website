import { describe, expect, it } from "vitest";
import { getLocalizedProductBySlug, getLocalizedProducts } from "@/lib/localizedProducts";
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

  it("localizes product summaries for supported locales", () => {
    const frenchProducts = getLocalizedProducts("fr-CA");
    const spanishProducts = getLocalizedProducts("es-419");
    const frenchLtbBuddy = frenchProducts.find((product) => product.href === "/fr-CA/products/ltb-buddy");
    const spanishLtbBuddy = spanishProducts.find((product) => product.href === "/es-419/products/ltb-buddy");

    expect(frenchProducts[0]?.ctaLabel).toBe("Lire l'etude de cas");
    expect(spanishProducts[0]?.ctaLabel).toBe("Leer caso");
    expect(frenchLtbBuddy?.title).toBe("Assistant guide d intake juridique");
    expect(spanishLtbBuddy?.title).toBe("Asistente guiado para intake legal");
  });

  it("localizes full product detail content by slug", () => {
    const frenchProduct = getLocalizedProductBySlug("easybuddy", "fr-CA");
    const spanishProduct = getLocalizedProductBySlug("storytellr", "es-419");

    expect(frenchProduct?.stage).toBe("MVP sur mesure, en production");
    expect(frenchProduct?.focusPoints[0]?.label).toBe("Simulation");
    expect(spanishProduct?.detailSections[0]?.title).toBe("Enfoque de producto");
    expect(spanishProduct?.supportLabel).toBe("Hablar de Storytellr");
  });
});
