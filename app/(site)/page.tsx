import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { EngagementModelSection } from "@/components/home/EngagementModelSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";
import { LandAcknowledgmentStrip } from "@/components/home/LandAcknowledgmentStrip";
import { ProductFlagshipSections } from "@/components/home/ProductFlagshipSections";
import { ProductsSection } from "@/components/home/ProductsSection";
import { PositioningSection } from "@/components/home/PositioningSection";
import { OrganizationStructuredData } from "@/components/seo/OrganizationStructuredData";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.name,
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
      <HeroSection />
      <ProductFlagshipSections />
      <PositioningSection />
      <ProductsSection />
      <CapabilitiesSection />
      <EngagementModelSection />
      <HomeCTASection />
      <LandAcknowledgmentStrip />
    </>
  );
}
