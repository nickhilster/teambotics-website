import path from "node:path";
import { fileURLToPath } from "node:url";
import { getLocalizedProductBySlug, getLocalizedProducts } from "@/lib/localizedProducts";
import { productCaseStudies, products } from "@/lib/products";
import { getSiteMessages } from "@/lib/siteLocale";
import { localizedRouteLocales, type GeneratedProductTranslation, type SiteMessages, type TranslationMeta } from "@/lib/i18n/types";
import { hashValue, toIdentifier, toModuleLiteral, writeTypeScriptModule } from "./translationUtils";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function getSiteMessagesSourcePath() {
  return path.join(repoRoot, "lib", "i18n", "siteMessages.source.ts");
}

function getSiteMessagesLocalePath(locale: string) {
  return path.join(repoRoot, "lib", "i18n", "generated", `siteMessages.${locale}.ts`);
}

function getProductTranslationsLocalePath(locale: string) {
  return path.join(repoRoot, "lib", "i18n", "generated", `productTranslations.${locale}.ts`);
}

function getTranslationMetaPath(name: "siteMessages" | "productTranslations") {
  return path.join(repoRoot, "lib", "i18n", "generated", `${name}.meta.ts`);
}

function collectProductTranslations(locale: (typeof localizedRouteLocales)[number]) {
  const localizedProducts = getLocalizedProducts(locale);
  const ctaLabelBySlug = new Map(
    localizedProducts
      .map((product) => {
        const slug = product.href.split("/").at(-1);
        return slug ? [slug, product.ctaLabel] as const : null;
      })
      .filter((entry): entry is readonly [string, string] => Boolean(entry)),
  );

  return Object.fromEntries(productCaseStudies.map((product) => {
    const localizedProduct = getLocalizedProductBySlug(product.slug, locale);

    const translation: GeneratedProductTranslation = localizedProduct
      ? {
        title: localizedProduct.title,
        label: localizedProduct.label,
        stage: localizedProduct.stage,
        statusLabel: localizedProduct.statusLabel,
        market: localizedProduct.market,
        tagline: localizedProduct.tagline,
        description: localizedProduct.description,
        summary: localizedProduct.summary,
        heroSummary: localizedProduct.heroSummary,
        impact: localizedProduct.impact,
        tags: localizedProduct.tags,
        techStack: localizedProduct.techStack,
        aiCapabilities: localizedProduct.aiCapabilities,
        focusPoints: localizedProduct.focusPoints,
        proofPoints: localizedProduct.proofPoints,
        detailSections: localizedProduct.detailSections,
        externalLabel: localizedProduct.externalLabel,
        supportLabel: localizedProduct.supportLabel,
        ctaLabel: ctaLabelBySlug.get(product.slug),
      }
      : {};

    return [product.slug, translation];
  }));
}

function collectEnglishProductTranslations() {
  const ctaLabelBySlug = new Map(
    products
      .map((product) => {
        const slug = product.href.split("/").at(-1);
        return slug ? [slug, product.ctaLabel] as const : null;
      })
      .filter((entry): entry is readonly [string, string] => Boolean(entry)),
  );

  return Object.fromEntries(productCaseStudies.map((product) => [
    product.slug,
    {
      title: product.title,
      label: product.label,
      stage: product.stage,
      statusLabel: product.statusLabel,
      market: product.market,
      tagline: product.tagline,
      description: product.description,
      summary: product.summary,
      heroSummary: product.heroSummary,
      impact: product.impact,
      tags: product.tags,
      techStack: product.techStack,
      aiCapabilities: product.aiCapabilities,
      focusPoints: product.focusPoints,
      proofPoints: product.proofPoints,
      detailSections: product.detailSections,
      externalLabel: product.externalLabel,
      supportLabel: product.supportLabel,
      ctaLabel: ctaLabelBySlug.get(product.slug),
    } satisfies GeneratedProductTranslation,
  ]));
}

async function main() {
  const englishSiteMessages = getSiteMessages("en");
  const englishProductTranslations = collectEnglishProductTranslations();
  const siteMessagesMeta: TranslationMeta = {
    sourceHash: hashValue(englishSiteMessages),
    generatedAt: new Date().toISOString(),
    generator: "bootstrap-translations",
  };

  await writeTypeScriptModule(
    getSiteMessagesSourcePath(),
    [
      'import type { SiteMessages } from "@/lib/i18n/types";',
      "",
      `export const siteMessagesEn: SiteMessages = ${toModuleLiteral(englishSiteMessages)};`,
    ].join("\n"),
  );

  for (const locale of localizedRouteLocales) {
    const identifierSuffix = toIdentifier(locale).replace(/^./, (character) => character.toUpperCase());
    const siteMessages = getSiteMessages(locale) as SiteMessages;
    const productTranslations = collectProductTranslations(locale);

    await writeTypeScriptModule(
      getSiteMessagesLocalePath(locale),
      [
        'import type { SiteMessages } from "@/lib/i18n/types";',
        "",
        `export const siteMessages${identifierSuffix}: SiteMessages = ${toModuleLiteral(siteMessages)};`,
      ].join("\n"),
    );

    await writeTypeScriptModule(
      getProductTranslationsLocalePath(locale),
      [
        'import type { GeneratedProductTranslation } from "@/lib/i18n/types";',
        "",
        `export const productTranslations${identifierSuffix}: Record<string, GeneratedProductTranslation> = ${toModuleLiteral(productTranslations)};`,
      ].join("\n"),
    );
  }

  const productTranslationsMeta: TranslationMeta = {
    sourceHash: hashValue(englishProductTranslations),
    generatedAt: new Date().toISOString(),
    generator: "bootstrap-translations",
  };

  await writeTypeScriptModule(
    getTranslationMetaPath("siteMessages"),
    [
      'import type { TranslationMeta } from "@/lib/i18n/types";',
      "",
      `export const siteMessagesMeta: TranslationMeta = ${toModuleLiteral(siteMessagesMeta)};`,
    ].join("\n"),
  );

  await writeTypeScriptModule(
    getTranslationMetaPath("productTranslations"),
    [
      'import type { TranslationMeta } from "@/lib/i18n/types";',
      "",
      `export const productTranslationsMeta: TranslationMeta = ${toModuleLiteral(productTranslationsMeta)};`,
    ].join("\n"),
  );

  console.log("Bootstrapped translation source and generated locale artifacts.");
}

void main();