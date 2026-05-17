"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { getLocalizedProductBySlug } from "@/lib/localizedProducts";
import { withLocalePath } from "@/lib/siteLocale";

type ProductCaseStudyContentProps = {
  slug: string;
};

export function ProductCaseStudyContent({ slug }: ProductCaseStudyContentProps) {
  const { locale, messages } = useSiteLocale();
  const product = getLocalizedProductBySlug(slug, locale);
  const allProductsHref = withLocalePath(locale, "/#systems");

  if (!product) {
    return null;
  }

  return (
    <>
      <section className="product-hero">
        <Container className="product-hero__inner">
          <SectionReveal>
            <div className="product-hero__eyebrow-row">
              <Tag>{product.label}</Tag>
              <StatusBadge label={product.statusLabel} variant={product.status} />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <h1 className="product-hero__title">{product.name}</h1>
          </SectionReveal>
          <SectionReveal delay={0.16}>
            <p className="product-hero__tagline">{product.tagline}</p>
          </SectionReveal>
          <SectionReveal delay={0.24}>
            <p className="product-hero__summary">{product.summary}</p>
          </SectionReveal>
          <SectionReveal className="product-hero__actions" delay={0.32}>
            <a
              className="button button--primary"
              href={product.externalUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{product.externalLabel}</span>
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </a>
            <a className="button button--ghost" href={product.supportUrl}>
              <span>{product.supportLabel}</span>
            </a>
            <Link className="button button--ghost product-hero__back-link" href={allProductsHref}>
              <span>{`← ${messages.productPage.allProductsLabel}`}</span>
            </Link>
          </SectionReveal>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="product-proof-grid">
            {product.focusPoints.map((point, index) => (
              <SectionReveal delay={index * 0.07} key={point.label}>
                <article className="product-focus-card">
                  <p className="product-focus-card__label">{point.label}</p>
                  <p>{point.value}</p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--border product-depth">
        <Container>
          <div className="product-section-heading">
            <p className="section-eyebrow">{messages.productPage.detailEyebrow}</p>
            <h2 className="section-title">{messages.productPage.detailTitle}</h2>
            <p className="section-copy">{messages.productPage.detailDescription}</p>
          </div>
          <div className="product-detail-grid">
            {product.detailSections.map((section, index) => (
              <SectionReveal delay={index * 0.07} key={section.title}>
                <article className="product-detail-card">
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="product-evidence">
            <div>
              <p className="section-eyebrow">{messages.productPage.evidenceEyebrow}</p>
              <h2 className="section-title">{messages.productPage.evidenceTitle}</h2>
              <p className="product-impact">{product.impact}</p>
            </div>
            <ul className="product-proof-list">
              {product.proofPoints.map((point) => (
                <li key={point}>
                  <CheckCircle2 aria-hidden="true" size={18} strokeWidth={1.6} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="product-stack">
            <div>
              <p className="section-eyebrow">{messages.productPage.buildProfileEyebrow}</p>
              <h2 className="product-stack__title">{product.stage}</h2>
              <p className="section-copy">{product.market}</p>
            </div>
            <div className="product-stack__groups">
              <div>
                <p className="product-stack__label">{messages.productPage.technologyLabel}</p>
                <div className="product-chip-list">
                  {product.techStack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="product-stack__label">{messages.productPage.systemCapabilitiesLabel}</p>
                <div className="product-chip-list">
                  {product.aiCapabilities.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}