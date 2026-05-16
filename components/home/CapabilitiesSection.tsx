import { Blocks, Compass, Users } from "lucide-react";
import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const capabilities = [
  {
    title: "Clarity under complexity",
    body: "We take domains that intimidate the user — legal forms, customer escalations, scattered project history — and shape them into guided conversations and structured flows. The complexity does not disappear. It stops being the user's problem.",
    icon: Compass,
  },
  {
    title: "Adoption by design",
    body: "Every interface is built around the person executing the work, not the team specifying it. Plain language, gradual onboarding, and confidence-building feedback are part of the product — not features bolted on after launch.",
    icon: Users,
  },
  {
    title: "Production-grade delivery",
    body: "Each product ships with stable routines, defined operational handoffs, and a roadmap. Teambotics builds systems that hold up after the first week — and after the first team rotation.",
    icon: Blocks,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="section section--border" id="capabilities">
      <Container>
        <SectionHeader
          align="center"
          description="Three things every Teambotics product earns before it ships."
          eyebrow="WHAT WE BUILD FOR"
          title="The product standard."
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
