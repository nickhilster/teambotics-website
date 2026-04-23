import { SectionReveal } from "@/components/animation/SectionReveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { HeroNeuralNetwork } from "@/components/animation/HeroNeuralNetwork";
import { HeroSpotlight } from "@/components/animation/HeroSpotlight";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <HeroNeuralNetwork />
      <HeroSpotlight />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__glow hero__glow--secondary" aria-hidden="true" />
      <Container className="hero__inner">
        <div className="hero-pill">
          <span className="hero-pill__dot">
            <span />
          </span>
          APPLIED AI SYSTEMS LAB
        </div>
        <TextReveal
          as="h1"
          className="hero__title"
          lines={[
            "Built for the",
            "environments that",
            <span className="hero__title-accent" key="accent">
              can&apos;t afford to fail.
            </span>,
          ]}
        />
        <SectionReveal delay={0.32}>
          <p className="hero__copy">
            Teambotics designs and deploys AI systems for regulated, operational,
            and frontline environments. Not demos, deployed software that holds
            under real operational pressure.
          </p>
        </SectionReveal>
        <SectionReveal className="hero__actions" delay={0.42}>
          <Button href="#live-systems">View Live Systems</Button>
          <Button href="#capabilities" variant="ghost">
            Capabilities
          </Button>
        </SectionReveal>
        <SectionReveal className="hero__status-row" delay={0.5}>
          <span className="hero__status-item hero__status-item--live">
            <span className="hero__status-dot" />
            LTB Buddy — Live
          </span>
          <span className="hero__status-separator">·</span>
          <span className="hero__status-item">
            <span className="hero__status-dot hero__status-dot--pilot" />
            EasyBuddy — Enterprise Pilot
          </span>
        </SectionReveal>
      </Container>
    </section>
  );
}
