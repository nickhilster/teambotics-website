import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";

export function PositioningSection() {
  return (
    <section className="section section--border" id="positioning">
      <Container className="positioning">
        <SectionReveal>
          <p className="section-eyebrow">WHAT WE DO</p>
          <h2 className="positioning__title">
            Operational AI for environments most vendors avoid.
          </h2>
        </SectionReveal>
        <SectionReveal className="positioning__copy" delay={0.08}>
          <p>
            Most AI tools assume a controlled environment. Teambotics builds for
            the opposite, the regulated, the operational, the frontline.
            Environments where failure has a real cost.
          </p>
          <p>
            We don&apos;t hand off prototypes. We maintain operational software that
            teams rely on daily, in compliance-bound environments where the cost of
            failure is real.
          </p>
          <blockquote className="positioning__quote">
            &quot;Disciplined intelligence expressed through restraint&quot; — the principle
            behind everything we build.
          </blockquote>
        </SectionReveal>
      </Container>
    </section>
  );
}
