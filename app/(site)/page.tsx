import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { EngagementModelSection } from "@/components/home/EngagementModelSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";
import { LandAcknowledgmentStrip } from "@/components/home/LandAcknowledgmentStrip";
import { LiveSystemsSection } from "@/components/home/LiveSystemsSection";
import { PositioningSection } from "@/components/home/PositioningSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <LiveSystemsSection />
      <CapabilitiesSection />
      <EngagementModelSection />
      <HomeCTASection />
      <LandAcknowledgmentStrip />
    </>
  );
}
