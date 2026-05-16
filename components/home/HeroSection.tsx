import { SectionReveal } from "@/components/animation/SectionReveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { HeroFlameParticles } from "@/components/animation/HeroFlameParticles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { products } from "@/lib/config";

export function HeroSection() {
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
            Independent AI lab &middot; Proprietary products and bespoke systems
          </div>
        </SectionReveal>
        <TextReveal
          as="h1"
          className="hero__title"
          lines={[
            "AI products that",
            "make complex work",
            <span className="hero__title-accent" key="accent">
              feel approachable.
            </span>,
          ]}
        />
        <SectionReveal delay={0.32}>
          <p className="hero__copy">
            Teambotics is an independent AI lab. We build conversational and interactive products
            that turn complex domains &mdash; legal, operational, narrative, creative &mdash; into
            experiences people can actually use.
          </p>
        </SectionReveal>
        <SectionReveal className="hero__actions" delay={0.42}>
          <Button className="hero__action-button hero__action-button--primary" href="#systems">
            See the products
          </Button>
          <Button
            className="hero__action-button hero__action-button--ghost"
            href="#engagement"
            variant="ghost"
          >
            How we work
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
