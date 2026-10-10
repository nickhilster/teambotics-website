import type { Metadata } from "next";
import { ConsultancyHome } from "@/components/home/ConsultancyHome";
import { LandAcknowledgmentStrip } from "@/components/home/LandAcknowledgmentStrip";
import { OrganizationStructuredData } from "@/components/seo/OrganizationStructuredData";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationStructuredData />
      <ConsultancyHome />
      <LandAcknowledgmentStrip />
    </>
  );
}
