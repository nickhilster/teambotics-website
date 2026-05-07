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
            Enterprise AI & Workflow Systems
          </div>
        </SectionReveal>
        <TextReveal
          as="h1"
          className="hero__title"
          lines={[
            "Building intelligent",
            "workflow systems and",
            <span className="hero__title-accent" key="accent">
              interactive platforms.
            </span>,
          ]}
        />
        <SectionReveal delay={0.32}>
          <p className="hero__copy">
            Teambotics develops intelligent, adoption-ready platforms across operational workflows
            and interactive digital experiences. We design systems engineered for clarity,
            compliance, and immediate impact.
          </p>
        </SectionReveal>
        <SectionReveal className="hero__actions" delay={0.42}>
          <Button className="hero__action-button hero__action-button--primary" href="#flagships">
            Review Flagships
          </Button>
          <Button
            className="hero__action-button hero__action-button--ghost"
            href="#engagement"
            variant="ghost"
          >
            Engagement Model
          </Button>
        </SectionReveal>
        <SectionReveal className="hero__status-row" delay={0.5}>
          {products.map((product) => (
            <span
              className={`hero__status-item${product.status === "live" ? " hero__status-item--live" : " hero__status-item--build"}`}
              key={product.name}
            >
              <span className={`hero__status-dot${product.status === "live" ? "" : " hero__status-dot--build"}`} />
              {product.name} — {product.statusLabel}
            </span>
          ))}
        </SectionReveal>
      </Container>
    </section>
  );
}
