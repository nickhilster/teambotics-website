import { Blocks, ShieldCheck, Workflow } from "lucide-react";
import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const capabilities = [
  {
    title: "Strategic MVP Architecture",
    body: "We define precise product boundaries, focusing on high-value workflows and a clear path from early prototype to production rollout.",
    icon: Blocks,
  },
  {
    title: "Workflow Automation & Enablement",
    body: "We design secure, compliant AI systems around real handoffs, decision points, and training needs so new workflows can stick in practice.",
    icon: ShieldCheck,
  },
  {
    title: "High-Adoption Interface Design",
    body: "We craft intuitive, accessible interfaces that reduce cognitive load, support enablement, and help teams build confidence quickly.",
    icon: Workflow,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="section section--border" id="capabilities">
      <Container>
        <SectionHeader
          align="center"
          description="Strategic architecture, secure workflow automation, and interface discipline across every engagement."
          eyebrow="CORE COMPETENCIES"
          title="Engineered for impact and adoption."
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
