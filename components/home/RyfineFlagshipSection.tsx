"use client";

import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";

const ryfineSignals = [
  "Prompt refinement",
  "Repo context",
  "A/B model comparison",
  "Local-first privacy",
] as const;

export function RyfineFlagshipSection() {
  return (
    <section className="section section--border" id="ryfine">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-16">
          <SectionReveal className="grid gap-5" delay={0.04}>
            <p className="section-eyebrow">FLAGSHIP PRODUCT</p>
            <h2 className="m-0 max-w-[13ch] text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-[-0.06em] text-[var(--color-text-primary)]">
              RyFine sharpens the input before AI does the work.
            </h2>
            <p className="m-0 max-w-2xl text-[clamp(1rem,1.7vw,1.2rem)] leading-7 text-[var(--color-text-secondary)]">
              RyFine is the flagship Teambotics product: a browser-based prompt refinement system that turns rough instructions into structured, professional-grade prompts for ChatGPT, Claude, Cursor, Gemini, local models, and other AI tools.
            </p>
            <p className="m-0 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              The product expresses the core Teambotics thesis in one deployable workflow: better AI outcomes start with clearer human intent, grounded context, transparent refinement, and control over where data goes.
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row" aria-label="RyFine actions">
              <a className="button button--primary min-w-40" href="https://ryfine.app/" target="_blank" rel="noopener noreferrer">
                Open RyFine ✦
              </a>
              <a className="button button--ghost min-w-40" href="https://ryfine.app/about" target="_blank" rel="noopener noreferrer">
                View product page
              </a>
            </div>
          </SectionReveal>

          <SectionReveal
            className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] shadow-[0_2rem_5rem_rgba(0,0,0,0.16)]"
            delay={0.12}
          >
            <img
              alt="RyFine feature map showing input, refinement, skills, context, library, and output trace"
              className="block h-auto w-full border-b border-[var(--color-border)]"
              loading="lazy"
              src="/media/ryfine-feature-map-banner.svg"
            />
            <div className="flex flex-wrap gap-2 p-4" aria-label="RyFine product signals">
              {ryfineSignals.map((signal) => (
                <span
                  className="inline-flex min-h-8 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-page)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-text-secondary)]"
                  key={signal}
                >
                  {signal}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
