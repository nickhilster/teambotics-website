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
            enablement, and interactive experiences. Across each engagement, we use strategy,
            workflow mapping, and interface discipline to turn complex operations into systems
            people can actually use.
          </p>
          <p>
            We help teams decide what should be automated, what should stay guided, and how new
            capability fits existing work. By grounding architecture in real operating conditions,
            we make adoption, enablement, and long-term usability part of the product strategy.
          </p>
          <blockquote className="positioning__quote">
            Strategy first. Workflow-ready by design.
          </blockquote>
        </SectionReveal>
      </Container>
    </section>
  );
}
