import { ShieldCheck, Activity, Workflow } from "lucide-react";
import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const capabilities = [
  {
    title: "Regulated Environment AI",
    body: "Compliance-first systems for HIPAA, FMLA, ADA, and sector-specific frameworks. Auditability and traceability are architecture, not afterthoughts.",
    icon: ShieldCheck,
  },
  {
    title: "Operational Intelligence",
    body: "AI that surfaces the right information at the right moment for frontline teams under pressure.",
    icon: Activity,
  },
  {
    title: "Workflow Automation",
    body: "Eliminating the manual loops that slow operations, with human judgment preserved.",
    icon: Workflow,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="section section--border" id="capabilities">
      <Container>
        <SectionHeader
          align="center"
          description="Three core disciplines across every system we ship."
          eyebrow="CAPABILITIES"
          title="What we're built to do."
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
