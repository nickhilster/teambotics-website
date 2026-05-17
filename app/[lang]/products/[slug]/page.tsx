import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCaseStudyContent } from "@/components/products/ProductCaseStudyContent";
import { siteConfig } from "@/lib/config";
import { getLocalizedProductBySlug } from "@/lib/localizedProducts";
import { getProductBySlug, productCaseStudies } from "@/lib/products";
import { isSiteLocale, localizedRouteLocales, siteLocaleHtmlLang, type LocalizedRouteLocale } from "@/lib/siteLocale";

type LocalizedProductPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return localizedRouteLocales.flatMap((lang) => (
    productCaseStudies.map((product) => ({
      lang,
      slug: product.slug,
    }))
  ));
}

export async function generateMetadata({ params }: LocalizedProductPageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isSiteLocale(lang) || lang === "en") {
    return {};
  }

  const product = getLocalizedProductBySlug(slug, lang as LocalizedRouteLocale);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.heroSummary,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.heroSummary,
      url: `${siteConfig.url}/${lang}/products/${product.slug}`,
      locale: siteLocaleHtmlLang[lang as LocalizedRouteLocale],
    },
  };
}

export default async function LocalizedProductCaseStudyPage({ params }: LocalizedProductPageProps) {
  const { lang, slug } = await params;

  if (!isSiteLocale(lang) || lang === "en") {
    notFound();
  }

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductCaseStudyContent slug={product.slug} />;
}