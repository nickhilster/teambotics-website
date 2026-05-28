import path from "node:path";
import { fileURLToPath } from "node:url";
import { createChatCompletion, getOpenAiRuntimeConfig } from "@/lib/chat/openai";
import { productCaseStudies, products } from "@/lib/products";
import { siteMessagesEn } from "@/lib/i18n/siteMessages.source";
import { siteMessagesEs419 } from "@/lib/i18n/generated/siteMessages.es-419";
import { siteMessagesFrCA } from "@/lib/i18n/generated/siteMessages.fr-CA";
import { siteMessagesMeta } from "@/lib/i18n/generated/siteMessages.meta";
import { productTranslationsEs419 } from "@/lib/i18n/generated/productTranslations.es-419";
import { productTranslationsFrCA } from "@/lib/i18n/generated/productTranslations.fr-CA";
import { productTranslationsMeta } from "@/lib/i18n/generated/productTranslations.meta";
import {
  localizedRouteLocales,
  type GeneratedProductTranslation,
  type LocalizedRouteLocale,
  type SiteMessages,
  type TranslationMeta,
} from "@/lib/i18n/types";
import { hashValue, toIdentifier, toModuleLiteral, writeTypeScriptModule } from "./translationUtils";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const isCheckMode = args.has("--check");
const isForceMode = args.has("--force");

type TranslationLeafMap = Record<string, string>;

const localeLabels: Record<LocalizedRouteLocale, string> = {
  "fr-CA": "Canadian French",
  "es-419": "Latin American Spanish",
};

const currentSiteMessagesByLocale: Record<LocalizedRouteLocale, SiteMessages> = {
  "fr-CA": siteMessagesFrCA,
  "es-419": siteMessagesEs419,
};

const currentProductTranslationsByLocale: Record<LocalizedRouteLocale, Record<string, GeneratedProductTranslation>> = {
  "fr-CA": productTranslationsFrCA,
  "es-419": productTranslationsEs419,
};

function getEnglishProductTranslations(): Record<string, GeneratedProductTranslation> {
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

function collectStringLeaves(value: unknown, pathSegments: string[] = [], result: TranslationLeafMap = {}) {
  if (typeof value === "string") {
    result[pathSegments.join(".")] = value;
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectStringLeaves(item, [...pathSegments, String(index)], result);
    });
    return result;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, childValue]) => {
      collectStringLeaves(childValue, [...pathSegments, key], result);
    });
  }

  return result;
}

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function applyStringLeaves<T>(source: T, leaves: TranslationLeafMap): T {
  const draft = cloneDeep(source) as Record<string, unknown>;

  for (const [pathKey, translatedValue] of Object.entries(leaves)) {
    const segments = pathKey.split(".");
    let cursor: unknown = draft;

    for (let index = 0; index < segments.length - 1; index += 1) {
      const segment = segments[index];
      cursor = Array.isArray(cursor)
        ? cursor[Number(segment)]
        : (cursor as Record<string, unknown>)[segment];
    }

    const lastSegment = segments.at(-1);
    if (!lastSegment) {
      continue;
    }

    if (Array.isArray(cursor)) {
      cursor[Number(lastSegment)] = translatedValue;
    } else {
      (cursor as Record<string, unknown>)[lastSegment] = translatedValue;
    }
  }

  return draft as T;
}

function parseJsonObject(text: string) {
  const trimmedText = text.trim();
  const normalizedText = trimmedText.startsWith("```")
    ? trimmedText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "")
    : trimmedText;

  return JSON.parse(normalizedText) as TranslationLeafMap;
}

async function translateLeaves(
  locale: LocalizedRouteLocale,
  scope: string,
  englishLeaves: TranslationLeafMap,
  existingLeaves: TranslationLeafMap,
  openAiConfig: ReturnType<typeof getOpenAiRuntimeConfig>,
) {
  if (!openAiConfig.apiKey) {
    throw new Error(`OPENAI_API_KEY is required to sync stale ${scope} translations.`);
  }

  const completion = await createChatCompletion([
    {
      role: "system",
      content:
        "You translate website copy while preserving JSON keys exactly. Return JSON only. Preserve brand names, product names, acronyms, code terms, and URLs exactly as written. Keep tone direct, restrained, product-led, credible, and not hypey.",
    },
    {
      role: "user",
      content: [
        `Target locale: ${locale} (${localeLabels[locale]}).`,
        `Scope: ${scope}.`,
        "Translate each value in the english JSON map into the target locale.",
        "Keep the exact same JSON keys.",
        "If an existing translation is already strong, you may preserve its tone while updating meaning to match the English source.",
        "Preserve these terms exactly when they appear: Teambotics, OpenAI, React, Vercel, PWA, RAG, LinkedIn, LTB Buddy, EasyBuddy, Code2Motion, Storytellr, PlayRoom, ToyMaker.",
        "English leaf map:",
        JSON.stringify(englishLeaves, null, 2),
        "Existing translation leaf map:",
        JSON.stringify(existingLeaves, null, 2),
      ].join("\n\n"),
    },
  ], openAiConfig);

  if (!completion) {
    throw new Error(`The translation model returned no content for ${scope} (${locale}).`);
  }

  return parseJsonObject(completion);
}

function getSiteMessagesLocalePath(locale: LocalizedRouteLocale) {
  return path.join(repoRoot, "lib", "i18n", "generated", `siteMessages.${locale}.ts`);
}

function getProductTranslationsLocalePath(locale: LocalizedRouteLocale) {
  return path.join(repoRoot, "lib", "i18n", "generated", `productTranslations.${locale}.ts`);
}

function getMetaPath(name: "siteMessages" | "productTranslations") {
  return path.join(repoRoot, "lib", "i18n", "generated", `${name}.meta.ts`);
}

async function writeSiteMessages(locale: LocalizedRouteLocale, siteMessages: SiteMessages) {
  const identifierSuffix = toIdentifier(locale).replace(/^./, (character) => character.toUpperCase());

  await writeTypeScriptModule(
    getSiteMessagesLocalePath(locale),
    [
      'import type { SiteMessages } from "@/lib/i18n/types";',
      "",
      `export const siteMessages${identifierSuffix}: SiteMessages = ${toModuleLiteral(siteMessages)};`,
    ].join("\n"),
  );
}

async function writeProductTranslations(locale: LocalizedRouteLocale, productTranslations: Record<string, GeneratedProductTranslation>) {
  const identifierSuffix = toIdentifier(locale).replace(/^./, (character) => character.toUpperCase());

  await writeTypeScriptModule(
    getProductTranslationsLocalePath(locale),
    [
      'import type { GeneratedProductTranslation } from "@/lib/i18n/types";',
      "",
      `export const productTranslations${identifierSuffix}: Record<string, GeneratedProductTranslation> = ${toModuleLiteral(productTranslations)};`,
    ].join("\n"),
  );
}

async function writeMeta(name: "siteMessages" | "productTranslations", value: TranslationMeta) {
  const exportName = name === "siteMessages" ? "siteMessagesMeta" : "productTranslationsMeta";

  await writeTypeScriptModule(
    getMetaPath(name),
    [
      'import type { TranslationMeta } from "@/lib/i18n/types";',
      "",
      `export const ${exportName}: TranslationMeta = ${toModuleLiteral(value)};`,
    ].join("\n"),
  );
}

async function main() {
  const englishProductTranslations = getEnglishProductTranslations();
  const nextSiteHash = hashValue(siteMessagesEn);
  const nextProductHash = hashValue(englishProductTranslations);
  const siteMessagesStale = siteMessagesMeta.sourceHash !== nextSiteHash;
  const productTranslationsStale = productTranslationsMeta.sourceHash !== nextProductHash;

  if (isCheckMode) {
    if (!siteMessagesStale && !productTranslationsStale) {
      console.log("Translation artifacts are up to date.");
      return;
    }

    const staleScopes = [
      siteMessagesStale ? "siteMessages" : null,
      productTranslationsStale ? "productTranslations" : null,
    ].filter(Boolean);

    throw new Error(`Translation artifacts are stale: ${staleScopes.join(", ")}. Run pnpm translations:sync.`);
  }

  if (!siteMessagesStale && !productTranslationsStale && !isForceMode) {
    console.log("Translation artifacts already match the English source.");
    return;
  }

  const openAiConfig = getOpenAiRuntimeConfig({
    chatModel: process.env.OPENAI_TRANSLATION_MODEL ?? process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini",
    maxTokens: 6000,
    temperature: 0.2,
  });

  if ((siteMessagesStale || productTranslationsStale || isForceMode) && !openAiConfig.apiKey) {
    console.warn(
      "OPENAI_API_KEY is not configured. Skipping translation sync and using existing generated translation artifacts.",
    );
    return;
  }

  for (const locale of localizedRouteLocales) {
    if (siteMessagesStale || isForceMode) {
      const translatedSiteLeaves = await translateLeaves(
        locale,
        "site messages",
        collectStringLeaves(siteMessagesEn),
        collectStringLeaves(currentSiteMessagesByLocale[locale]),
        openAiConfig,
      );

      await writeSiteMessages(locale, applyStringLeaves(siteMessagesEn, translatedSiteLeaves));
    }

    if (productTranslationsStale || isForceMode) {
      const nextProductTranslations: Record<string, GeneratedProductTranslation> = {};

      for (const product of productCaseStudies) {
        const englishProductTranslation = englishProductTranslations[product.slug] ?? {};
        const existingProductTranslation = currentProductTranslationsByLocale[locale][product.slug] ?? {};
        const translatedProductLeaves = await translateLeaves(
          locale,
          `product translation for ${product.slug}`,
          collectStringLeaves(englishProductTranslation),
          collectStringLeaves(existingProductTranslation),
          openAiConfig,
        );

        nextProductTranslations[product.slug] = applyStringLeaves(englishProductTranslation, translatedProductLeaves);
      }

      await writeProductTranslations(locale, nextProductTranslations);
    }
  }

  const generatedAt = new Date().toISOString();

  if (siteMessagesStale || isForceMode) {
    await writeMeta("siteMessages", {
      sourceHash: nextSiteHash,
      generatedAt,
      generator: "sync-translations",
    });
  }

  if (productTranslationsStale || isForceMode) {
    await writeMeta("productTranslations", {
      sourceHash: nextProductHash,
      generatedAt,
      generator: "sync-translations",
    });
  }

  console.log("Synchronized translation artifacts.");
}

void main();