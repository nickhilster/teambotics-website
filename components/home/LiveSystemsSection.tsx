import Link from "next/link";
import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { products } from "@/lib/config";

export function LiveSystemsSection() {
  return (
    <section className="section section--border" id="flagships">
      <Container>
        <SectionHeader
          description="Four products, distinct audiences, one disciplined standard for clarity, usability, and release readiness."
          eyebrow="FLAGSHIP PORTFOLIO"
          title="A focused AI product portfolio."
        />
        <div className="systems-grid">
          {products.map((product, index) => (
            <SectionReveal delay={index * 0.08} key={product.name}>
              <CursorReactiveCard className="card system-card">
                <div className="system-card__header">
                  <div>
                    <Tag>{product.name}</Tag>
                    <h3>{product.title}</h3>
                  </div>
                  <StatusBadge label={product.statusLabel} variant={product.status} />
                </div>
                <p className="system-card__copy">{product.description}</p>
                <div className="system-card__meta">
                  {product.tags.map((tag) => (
                    <span className="system-card__meta-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="system-card__footer">
                  <span>{product.market}</span>
                  <Link href={product.href}>{product.ctaLabel} →</Link>
                </div>
              </CursorReactiveCard>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
