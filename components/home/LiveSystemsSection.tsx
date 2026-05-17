"use client";

import Link from "next/link";
import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { getLocalizedProducts } from "@/lib/localizedProducts";

export function LiveSystemsSection() {
  const { locale, messages } = useSiteLocale();
  const products = getLocalizedProducts(locale);

  return (
    <section className="section section--border" id="systems">
      <Container>
        <SectionHeader
          description={messages.liveSystems.description}
          eyebrow={messages.liveSystems.eyebrow}
          title={messages.liveSystems.title}
        />
        <div className="systems-grid">
          {products.map((product, index) => {
            return (
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
                    <Link className="system-card__case-link" href={product.href}>
                      {product.ctaLabel} →
                    </Link>
                    <a
                      className="button button--ghost system-card__product-btn"
                      href={product.externalUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>{product.externalLabel}</span>
                    </a>
                  </div>
                </CursorReactiveCard>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
