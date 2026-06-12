import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { EngagementModelSection } from "@/components/home/EngagementModelSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";
import { LiveSystemsSection } from "@/components/home/LiveSystemsSection";
import { PositioningSection } from "@/components/home/PositioningSection";
import { RyfineFlagshipSection } from "@/components/home/RyfineFlagshipSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RyfineFlagshipSection />
      <PositioningSection />
      <LiveSystemsSection />
      <CapabilitiesSection />
      <EngagementModelSection />
      <HomeCTASection />
    </>
  );
}
