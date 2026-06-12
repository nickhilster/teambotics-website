import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { EngagementModelSection } from "@/components/home/EngagementModelSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";
import { ProductFlagshipSections } from "@/components/home/ProductFlagshipSections";
import { PositioningSection } from "@/components/home/PositioningSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductFlagshipSections />
      <PositioningSection />
      <CapabilitiesSection />
      <EngagementModelSection />
      <HomeCTASection />
    </>
  );
}
