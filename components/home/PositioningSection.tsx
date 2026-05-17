"use client";

import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { useSiteLocale } from "@/components/theme/LocaleProvider";

export function PositioningSection() {
  const { messages } = useSiteLocale();

  return (
    <section className="section section--border" id="positioning">
      <Container className="positioning">
        <SectionReveal>
          <p className="section-eyebrow">{messages.positioning.eyebrow}</p>
          <h2 className="positioning__title">
            {messages.positioning.title}
          </h2>
        </SectionReveal>
        <SectionReveal className="positioning__copy" delay={0.08}>
          <p>{messages.positioning.paragraphs[0]}</p>
          <p>{messages.positioning.paragraphs[1]}</p>
          <blockquote className="positioning__quote">
            {messages.positioning.quote}
          </blockquote>
        </SectionReveal>
      </Container>
    </section>
  );
}
