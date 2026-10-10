import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConsultancyHome } from "@/components/home/ConsultancyHome";
import { LandAcknowledgmentStrip } from "@/components/home/LandAcknowledgmentStrip";
import { OrganizationStructuredData } from "@/components/seo/OrganizationStructuredData";
import { siteConfig } from "@/lib/config";
import { isSiteLocale, siteLocaleHtmlLang, type LocalizedRouteLocale } from "@/lib/siteLocale";

const descriptions = {
  "fr-CA": "Teambotics travaille avec les équipes pour rendre l’IA utile dans leurs processus, de la compréhension du travail à la création du lien manquant.",
  "es-419": "Teambotics trabaja con los equipos para hacer útil la IA en sus flujos, desde comprender el trabajo hasta construir el enlace que falta.",
};

type LocalizedHomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: LocalizedHomePageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isSiteLocale(lang) || lang === "en") {
    return {};
  }

  const description = descriptions[lang as LocalizedRouteLocale];

  return {
    title: {
      absolute: siteConfig.name,
    },
    description,
    alternates: { canonical: `${siteConfig.url}/${lang}` },
    openGraph: {
      title: siteConfig.name,
      description,
      url: `${siteConfig.url}/${lang}`,
      locale: siteLocaleHtmlLang[lang as LocalizedRouteLocale],
    },
  };
}

export default async function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const { lang } = await params;

  if (!isSiteLocale(lang) || lang === "en") {
    notFound();
  }

  return (
    <>
      <OrganizationStructuredData />
      <ConsultancyHome />
      <LandAcknowledgmentStrip />
    </>
  );
}
