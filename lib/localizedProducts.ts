import {
  getProductBySlug,
  products as baseProducts,
} from "@/lib/products";
import { productTranslationsEs419 } from "@/lib/i18n/generated/productTranslations.es-419";
import { productTranslationsFrCA } from "@/lib/i18n/generated/productTranslations.fr-CA";
import { supplementalProductTranslations } from "@/lib/i18n/productTranslations.supplemental";
import { type GeneratedProductTranslation, type SiteLocale } from "@/lib/i18n/types";
import { withLocalePath } from "@/lib/siteLocale";

const localizedProductTranslations: Partial<Record<Exclude<SiteLocale, "en">, Record<string, GeneratedProductTranslation>>> = {
  "fr-CA": {
    ...productTranslationsFrCA,
    ...(supplementalProductTranslations["fr-CA"] ?? {}),
  },
  "es-419": {
    ...productTranslationsEs419,
    ...(supplementalProductTranslations["es-419"] ?? {}),
  },
};

export function getLocalizedProductBySlug(slug: string, locale: SiteLocale) {
  const product = getProductBySlug(slug);

  if (!product || locale === "en") {
    return product;
  }

  const translation = localizedProductTranslations[locale]?.[slug];
  if (!translation) {
    return product;
  }

  return {
    ...product,
    ...translation,
    tags: translation.tags ?? product.tags,
    techStack: translation.techStack ?? product.techStack,
    aiCapabilities: translation.aiCapabilities ?? product.aiCapabilities,
    focusPoints: translation.focusPoints ?? product.focusPoints,
    proofPoints: translation.proofPoints ?? product.proofPoints,
    detailSections: translation.detailSections ?? product.detailSections,
  };
}

export function getLocalizedProducts(locale: SiteLocale) {
  return baseProducts.map((product) => {
    const slug = product.href.split("/").at(-1);
    const localizedProduct = slug ? getLocalizedProductBySlug(slug, locale) : null;
    const translation = slug && locale !== "en" ? localizedProductTranslations[locale]?.[slug] : undefined;

    return {
      ...product,
      href: slug ? withLocalePath(locale, `/products/${slug}`) : product.href,
      title: localizedProduct?.title ?? product.title,
      description: localizedProduct?.description ?? product.description,
      statusLabel: localizedProduct?.statusLabel ?? product.statusLabel,
      externalLabel: localizedProduct?.externalLabel ?? product.externalLabel,
      tags: localizedProduct?.tags ?? product.tags,
      ctaLabel: translation?.ctaLabel ?? product.ctaLabel,
    };
  });
}
