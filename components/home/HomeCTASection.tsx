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
            Teambotics partners with organizations to clarify workflow strategy, strengthen
            enablement, and ship intelligent systems people can actually use. Start a conversation
            to explore where automation, guidance, and operational design can create the most
            leverage.
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
