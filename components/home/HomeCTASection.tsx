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
        <SectionReveal>
          <p className="section-eyebrow">{messages.cta.eyebrow}</p>
          <h2
            className="cta-section__title"
            aria-label={locale === "en" ? "Quality output begins with a quality input process." : undefined}
          >
            {locale === "en" ? (
              <span className="cta-thesis" aria-hidden="true">
                <span className="cta-thesis__meta">
                  <span className="cta-thesis__chip cta-thesis__chip--output">
                    Product
                  </span>
                  <span className="cta-thesis__chip cta-thesis__chip--input">
                    Discovery
                  </span>
                </span>
                <span className="cta-thesis__headline">
                  Quality output begins with a quality input process.
                </span>
              </span>
            ) : (
              messages.cta.title
            )}
          </h2>
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
