"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { getProductBySlug, products } from "@/lib/products";

const BANNER_IMAGES: Partial<Record<string, { src: string; alt: string }>> = {
  ryfine: {
    src: "/media/ryfine-feature-map-banner.svg",
    alt: "RyFine feature map showing input, refinement, skills, context, library, and output trace",
  },
  "ltb-buddy": {
    src: "/media/ltb-buddy-intake-banner.svg",
    alt: "LTB Buddy three-stage intake flow: describe issue, structured conversation, application-ready output",
  },
  redactorbuddy: {
    src: "/media/redactorbuddy-offline-redaction-banner.svg",
    alt: "RedactorBuddy offline-first workflow showing document intake, local PII detection, risk scoring, and safe export",
  },
  mdownmanager: {
    src: "/media/mdownmanager-knowledge-ops-banner.svg",
    alt: "MDownManager workflow showing markdown vault ingestion, scanner checks, and local search for AI-ready knowledge retrieval",
  },
  easybuddy: {
    src: "/media/easybuddy-simulation-banner.svg",
    alt: "EasyBuddy simulation loop: customer scenario, staff practice response, AI coaching feedback",
  },
  code2motion: {
    src: "/media/code2motion-platform-banner.svg",
    alt: "Code2Motion dual platform: PlayRoom for discovering generative experiences, ToyMaker for building browser apps",
  },
  storytellr: {
    src: "/media/storytellr-graph-banner.svg",
    alt: "Storytellr narrative graph showing career projects, decisions, collaborators, milestones, themes, and outcomes as connected nodes",
  },
};

export function ProductFlagshipSections() {
  const orderedCaseStudies = products
    .map((p) => {
      const slug = p.href.split("/").at(-1);
      return slug ? getProductBySlug(slug) : null;
    })
    .filter((p) => p !== null);

  return (
    <div id="systems">
      {orderedCaseStudies.map((product) => {
        const banner = BANNER_IMAGES[product.slug];

        return (
          <section className="section section--border" id={product.slug} key={product.slug}>
            <Container>
              <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-16">
                <SectionReveal className="grid gap-5" delay={0.04}>
                  <p className="section-eyebrow">{product.statusLabel}</p>
                  <h2 className="m-0 max-w-[13ch] text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-[-0.06em] text-[var(--color-text-primary)]">
                    {product.heroSummary}
                  </h2>
                  <p className="m-0 max-w-2xl text-[clamp(1rem,1.7vw,1.2rem)] leading-7 text-[var(--color-text-secondary)]">
                    {product.summary}
                  </p>
                  <p className="m-0 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
                    {product.impact}
                  </p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row" aria-label={`${product.name} actions`}>
                    <a
                      className="button button--primary min-w-40"
                      href={product.externalUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {product.externalLabel} ✦
                    </a>
                    <Link className="button button--ghost min-w-40" href={`/products/${product.slug}`}>
                      Read case study
                    </Link>
                  </div>
                </SectionReveal>

                <SectionReveal
                  className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] shadow-[0_2rem_5rem_rgba(0,0,0,0.16)]"
                  delay={0.12}
                >
                  {banner && (
                    <img
                      alt={banner.alt}
                      className="block h-auto w-full border-b border-[var(--color-border)]"
                      loading="lazy"
                      src={banner.src}
                    />
                  )}
                  <div className="flex flex-wrap gap-2 p-4" aria-label={`${product.name} capabilities`}>
                    {product.aiCapabilities.map((capability) => (
                      <span
                        className="inline-flex min-h-8 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-page)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-text-secondary)]"
                        key={capability}
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </SectionReveal>
              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
