import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { isSiteLocale, localizedRouteLocales, type LocalizedRouteLocale } from "@/lib/siteLocale";

type LocalizedLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return localizedRouteLocales.map((lang) => ({ lang }));
}

export default async function LocalizedLayout({ children, params }: LocalizedLayoutProps) {
  const { lang } = await params;

  if (!isSiteLocale(lang) || lang === "en") {
    notFound();
  }

  return <SiteShell locale={lang as LocalizedRouteLocale}>{children}</SiteShell>;
}