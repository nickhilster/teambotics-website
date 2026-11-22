import { describe, expect, it } from "vitest";
import { getLocalizedProductBySlug } from "@/lib/localizedProducts";
import { productCaseStudies } from "@/lib/products";
import { getProductFlowAnchors } from "@/lib/productFlowAnchors";
import type { SiteLocale } from "@/lib/i18n/types";

const locales: SiteLocale[] = ["en", "fr-CA", "es-419"];

describe("product FlowWrite anchors", () => {
  it("matches the current localized copy for every configured anchor", () => {
    for (const product of productCaseStudies) {
      for (const locale of locales) {
        const localized = getLocalizedProductBySlug(product.slug, locale);
        const anchors = getProductFlowAnchors(product.slug, locale);
        expect(anchors, `${product.slug}/${locale}`).toBeDefined();
        if (!localized || !anchors) continue;

        for (const [field, phrase] of Object.entries(anchors)) {
          if (!phrase) continue;
          const source = field === "focusPoint"
            ? localized.focusPoints.map((point) => point.value).join(" ")
            : field === "tagline"
              ? localized.tagline
              : localized.summary;
          expect(source, `${product.slug}/${locale}/${field}`).toContain(phrase);
        }
      }
    }
  });
});
