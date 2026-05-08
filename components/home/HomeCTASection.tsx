import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LeadCaptureForm } from "@/components/home/LeadCaptureForm";

export function HomeCTASection() {
  return (
    <section className="section section--border cta-section" id="contact">
      <div className="cta-section__glow" aria-hidden="true" />
      <Container className="cta-section__inner">
        <SectionReveal>
          <p className="section-eyebrow">GET IN TOUCH</p>
          <h2 className="cta-section__title">
            Most of our best work started with a direct conversation.
          </h2>
          <p className="cta-section__copy">
            Tell us what you&apos;re working on. We&apos;ll be direct about what&apos;s possible
            and whether we&apos;re the right team for it.
          </p>
        </SectionReveal>
        <SectionReveal className="cta-section__form-shell" delay={0.12}>
          <LeadCaptureForm />
        </SectionReveal>
        <SectionReveal className="cta-section__actions" delay={0.2}>
          <Button href="#flagships" variant="ghost">
            See our work
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
