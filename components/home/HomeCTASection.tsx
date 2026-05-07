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
          <p className="section-eyebrow">START THE CONVERSATION</p>
          <h2 className="cta-section__title">
            Build reliable, intelligent systems from day one.
          </h2>
          <p className="cta-section__copy">
            Teambotics partners with organizations to modernize workflows and deploy intelligent
            systems. Start a conversation to explore how we can accelerate your automation initiatives.
          </p>
        </SectionReveal>
        <SectionReveal className="cta-section__actions" delay={0.12}>
          <Button href={`mailto:${siteConfig.contactEmail}`}>Start a conversation</Button>
          <Button href="#flagships" variant="ghost">
            Review flagships
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
