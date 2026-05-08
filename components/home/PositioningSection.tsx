import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";

export function PositioningSection() {
  return (
    <section className="section section--border" id="positioning">
      <Container className="positioning">
        <SectionReveal>
          <p className="section-eyebrow">WHAT WE DO</p>
          <h2 className="positioning__title">
            We start from the constraints. Not the capability.
          </h2>
        </SectionReveal>
        <SectionReveal className="positioning__copy" delay={0.08}>
          <p>
            We don&apos;t arrive with a pre-built solution. We spend time inside the operational
            context first — understanding workflows, edge cases, and why things break — then build
            something that fits. Across compliance, workforce operations, and digital experiences,
            the approach stays the same.
          </p>
          <p>
            We help teams decide what should be automated, what should stay guided, and how new
            capability fits the work people already do. Architecture grounded in real operating
            conditions means adoption and long-term usability are part of the product — not an
            afterthought.
          </p>
          <blockquote className="positioning__quote">
            Disciplined process. Systems that last.
          </blockquote>
        </SectionReveal>
      </Container>
    </section>
  );
}
