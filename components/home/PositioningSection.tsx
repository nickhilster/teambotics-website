import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";

export function PositioningSection() {
  return (
    <section className="section section--border" id="positioning">
      <Container className="positioning">
        <SectionReveal>
          <p className="section-eyebrow">POSITIONING</p>
          <h2 className="positioning__title">
            One studio. Unified operating standards.
          </h2>
        </SectionReveal>
        <SectionReveal className="positioning__copy" delay={0.08}>
          <p>
            Teambotics builds a focused portfolio of AI solutions spanning legal compliance, workforce
            enablement, and interactive experiences. While our markets vary, our commitment to
            intuitive design and robust architecture remains constant.
          </p>
          <p>
            We architect systems to reduce operational friction and drive confident decision-making.
            By prioritizing strict scoping and interface discipline, we ensure our AI deployments
            accelerate adoption without compromising security.
          </p>
          <blockquote className="positioning__quote">
            Engineered for enterprise scale. Designed for frontline adoption.
          </blockquote>
        </SectionReveal>
      </Container>
    </section>
  );
}
