"use client";

import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { LeadCaptureForm } from "@/components/home/LeadCaptureForm";

export function HomeCTASection() {
  const { locale, messages } = useSiteLocale();

  return (
    <section className="section section--border cta-section" id="contact">
      <div className="cta-section__glow" aria-hidden="true" />
      <Container className="cta-section__inner">
        <SectionReveal className="cta-section__intro">
          {locale === "en" ? (
            <div className="cta-thesis">
              <nav className="cta-thesis__meta" aria-label="Landing page shortcuts">
                <a
                  className="cta-thesis__chip cta-thesis__chip--output"
                  href="#systems"
                  aria-label="Jump to Teambotics product systems"
                >
                  Product
                </a>
                <a
                  className="cta-thesis__chip cta-thesis__chip--input"
                  href="#engagement"
                  aria-label="Jump to Teambotics discovery approach"
                >
                  Discovery
                </a>
              </nav>
              <h2 className="cta-section__title">
                Quality output begins with a quality input process.
              </h2>
            </div>
          ) : (
            <h2 className="cta-section__title">{messages.cta.title}</h2>
          )}
          <p className="cta-section__copy">
            {messages.cta.copy}
          </p>
        </SectionReveal>
        <SectionReveal className="cta-section__form-shell" delay={0.12}>
          <LeadCaptureForm />
        </SectionReveal>
        <SectionReveal className="cta-section__actions" delay={0.2}>
          <Button href="#systems" variant="ghost">
            {messages.cta.reviewSystemsLabel}
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
