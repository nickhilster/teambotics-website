import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { getProductBySlug, productCaseStudies } from "@/lib/products";
import { siteConfig } from "@/lib/config";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productCaseStudies.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.heroSummary,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.heroSummary,
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };
}

export default async function ProductCaseStudyPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
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
            <Link className="button button--ghost product-hero__back-link" href="/#systems">
              <span>{"\u2190 All products"}</span>
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
            <p className="section-eyebrow">System Detail</p>
            <h2 className="section-title">How the product earns trust.</h2>
            <p className="section-copy">
              Each Teambotics product is framed as a practical system: clear
              user value, controlled AI behavior, and a path from prototype to
              operational adoption.
            </p>
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
              <p className="section-eyebrow">Evidence</p>
              <h2 className="section-title">What this work demonstrates.</h2>
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
              <p className="section-eyebrow">Build Profile</p>
              <h2 className="product-stack__title">{product.stage}</h2>
              <p className="section-copy">{product.market}</p>
            </div>
            <div className="product-stack__groups">
              <div>
                <p className="product-stack__label">Technology</p>
                <div className="product-chip-list">
                  {product.techStack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="product-stack__label">AI capabilities</p>
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

