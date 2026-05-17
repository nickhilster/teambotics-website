import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { EngagementModelSection } from "@/components/home/EngagementModelSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";
import { LiveSystemsSection } from "@/components/home/LiveSystemsSection";
import { PositioningSection } from "@/components/home/PositioningSection";
import { siteConfig } from "@/lib/config";
import { getSiteMessages, isSiteLocale, siteLocaleHtmlLang, type LocalizedRouteLocale } from "@/lib/siteLocale";

type LocalizedHomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: LocalizedHomePageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isSiteLocale(lang) || lang === "en") {
    return {};
  }

  const messages = getSiteMessages(lang as LocalizedRouteLocale);

  return {
    title: {
      absolute: siteConfig.name,
    },
    description: messages.hero.copy,
    openGraph: {
      title: siteConfig.name,
      description: messages.hero.copy,
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
      <HeroSection />
      <PositioningSection />
      <LiveSystemsSection />
      <CapabilitiesSection />
      <EngagementModelSection />
      <HomeCTASection />
    </>
  );
}