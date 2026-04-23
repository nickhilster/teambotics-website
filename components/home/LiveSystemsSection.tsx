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
    <section className="section section--border" id="live-systems">
      <Container>
        <SectionHeader
          description="These aren't demos. Each product runs in live operational environments, serving real teams under real conditions."
          eyebrow="LIVE SYSTEMS"
          title="Software in active deployment."
        />
        <div className="systems-grid">
          {products.map((product, index) => (
            <SectionReveal delay={index * 0.08} key={product.name}>
              <CursorReactiveCard className="card system-card">
                <StatusBadge label={product.statusLabel} variant={product.status} />
                <Tag>{product.name}</Tag>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="system-card__footer">
                  <Link href={product.href}>View System →</Link>
                  <span>{product.domain}</span>
                </div>
              </CursorReactiveCard>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
