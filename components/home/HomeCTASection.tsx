import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export function HomeCTASection() {
  return (
    <section className="section section--border cta-section" id="contact">
      <div className="cta-section__glow" aria-hidden="true" />
      <Container className="cta-section__inner">
        <SectionReveal>
          <p className="section-eyebrow">GET IN TOUCH</p>
          <h2 className="cta-section__title">
            If your environment is where others stop, we start.
          </h2>
          <p className="cta-section__copy">
            We take on a focused number of engagements at a time. Reach out to
            explore whether your operational context is a fit.
          </p>
        </SectionReveal>
        <SectionReveal className="cta-section__actions" delay={0.12}>
          <Button href={`mailto:${siteConfig.contactEmail}`}>Start a Conversation</Button>
          <Button href="#live-systems" variant="ghost">
            See the work
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
