import { Blocks, ShieldCheck, Workflow } from "lucide-react";
import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const capabilities = [
  {
    title: "Scoped MVPs that ship",
    body: "We define precise product boundaries early — identifying the highest-value workflows and the clearest path from first build to production without scope drift.",
    icon: Blocks,
  },
  {
    title: "Compliant Workflow Automation",
    body: "We build AI systems around real handoffs, regulatory constraints, and training needs — so new workflows hold up in practice, not just in demos.",
    icon: ShieldCheck,
  },
  {
    title: "Interfaces people want to use",
    body: "We design interfaces around the people doing the work: reducing cognitive load, supporting gradual onboarding, and building confidence over time.",
    icon: Workflow,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="section section--border" id="capabilities">
      <Container>
        <SectionHeader
          align="center"
          description="How we approach architecture, automation, and interface design across every engagement — consistently and without shortcuts."
          eyebrow="CORE COMPETENCIES"
          title="Built to hold up in practice."
        />
        <div className="capabilities-grid">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <SectionReveal delay={index * 0.08} key={capability.title}>
                <CursorReactiveCard className="card capability-card">
                  <div className="capability-card__icon">
                    <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
                  </div>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                </CursorReactiveCard>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
