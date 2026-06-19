import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { EngagementModelSection } from "@/components/home/EngagementModelSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";
import { ProductFlagshipSections } from "@/components/home/ProductFlagshipSections";
import { ProductsSection } from "@/components/home/ProductsSection";
import { PositioningSection } from "@/components/home/PositioningSection";
import { OrganizationStructuredData } from "@/components/seo/OrganizationStructuredData";

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
    </>
  );
}
