"use client";

import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const ryfineSignals = [
  "Prompt refinement",
  "Repo context",
  "A/B model comparison",
  "Local-first privacy",
] as const;

export function RyfineFlagshipSection() {
  return (
    <section className="section section--border ryfine-flagship" id="ryfine">
      <Container>
        <div className="ryfine-flagship__grid">
          <SectionReveal className="ryfine-flagship__copy" delay={0.04}>
            <p className="section-eyebrow">FLAGSHIP PRODUCT</p>
            <h2 className="ryfine-flagship__title">RyFine sharpens the input before AI does the work.</h2>
            <p className="ryfine-flagship__lead">
              RyFine is the flagship Teambotics product: a browser-based prompt refinement system that turns rough instructions into structured, professional-grade prompts for ChatGPT, Claude, Cursor, Gemini, local models, and other AI tools.
            </p>
            <p className="ryfine-flagship__body">
              The product expresses the core Teambotics thesis in one deployable workflow: better AI outcomes start with clearer human intent, grounded context, transparent refinement, and control over where data goes.
            </p>
            <div className="ryfine-flagship__actions" aria-label="RyFine actions">
              <Button className="ryfine-flagship__primary" href="https://ryfine.app/" target="_blank" rel="noopener noreferrer">
                Open RyFine ✦
              </Button>
              <Button className="ryfine-flagship__secondary" href="https://ryfine.app/about" target="_blank" rel="noopener noreferrer" variant="ghost">
                View product page
              </Button>
            </div>
          </SectionReveal>

          <SectionReveal className="ryfine-flagship__panel" delay={0.12}>
            <img
              alt="RyFine feature map showing input, refinement, skills, context, library, and output trace"
              className="ryfine-flagship__image"
              loading="lazy"
              src="/media/ryfine-feature-map-banner.svg"
            />
            <div className="ryfine-flagship__signals" aria-label="RyFine product signals">
              {ryfineSignals.map((signal) => (
                <span className="ryfine-flagship__signal" key={signal}>
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
