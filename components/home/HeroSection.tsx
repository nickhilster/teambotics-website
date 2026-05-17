"use client";

import { SectionReveal } from "@/components/animation/SectionReveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { HeroFlameParticles } from "@/components/animation/HeroFlameParticles";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { getLocalizedProducts } from "@/lib/localizedProducts";

export function HeroSection() {
  const { locale, messages } = useSiteLocale();
  const products = getLocalizedProducts(locale);

  return (
    <section className="hero" id="top">
      <HeroFlameParticles />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__glow hero__glow--secondary" aria-hidden="true" />
      <Container className="hero__inner">
        <SectionReveal delay={0.05}>
          <div className="hero-pill">
            <span className="hero-pill__dot">
              <span className="hero-pill__dot-core" />
            </span>
            {messages.hero.pill}
          </div>
        </SectionReveal>
        <TextReveal
          as="h1"
          className="hero__title"
          lines={[
            messages.hero.titleLines[0],
            messages.hero.titleLines[1],
            <span className="hero__title-accent" key="accent">
              {messages.hero.titleLines[2]}
            </span>,
          ]}
        />
        <SectionReveal delay={0.32}>
          <p className="hero__copy">
            {messages.hero.copy}
          </p>
        </SectionReveal>
        <SectionReveal className="hero__actions" delay={0.42}>
          <Button className="hero__action-button hero__action-button--primary" href="#systems">
            {messages.hero.primaryCta}
          </Button>
          <Button
            className="hero__action-button hero__action-button--ghost"
            href="#engagement"
            variant="ghost"
          >
            {messages.hero.secondaryCta}
          </Button>
        </SectionReveal>
        <SectionReveal className="hero__status-row" delay={0.5}>
          {products.map((product) => (
            <span
              className={`hero__status-item hero__status-item--${product.status}`}
              key={product.name}
            >
              <span className={`hero__status-dot hero__status-dot--${product.status}`} />
              {product.name} &mdash; {product.statusLabel}
            </span>
          ))}
        </SectionReveal>
      </Container>
    </section>
  );
}
