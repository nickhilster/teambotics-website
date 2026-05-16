import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";

export function PositioningSection() {
  return (
    <section className="section section--border" id="positioning">
      <Container className="positioning">
        <SectionReveal>
          <p className="section-eyebrow">WHAT WE DO</p>
          <h2 className="positioning__title">
            We design for the person at the other end.
          </h2>
        </SectionReveal>
        <SectionReveal className="positioning__copy" delay={0.08}>
          <p>
            Every Teambotics product starts with the person doing the hard thing — the tenant
            filing a complaint, the service rep starting a shift, the founder explaining months
            of work, the visitor exploring something new. Architecture, automation, and interface
            are designed backward from that moment.
          </p>
          <p>
            That focus shapes what we build and what we leave out. Capability is only useful if
            the person on the other end can actually use it. Adoption is not a final-mile concern.
            It is the design brief.
          </p>
          <blockquote className="positioning__quote">
            Built for the people doing the work.
          </blockquote>
        </SectionReveal>
      </Container>
    </section>
  );
}
