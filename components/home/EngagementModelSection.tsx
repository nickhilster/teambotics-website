import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discovery & Scoping",
    body: "Align on business goals, workflow realities, user requirements, and security constraints to define the right first release.",
  },
  {
    number: "02",
    title: "System Architecture",
    body: "Translate the opportunity into data models, enablement flows, compliant automation, and user-facing interfaces that can hold up in practice.",
  },
  {
    number: "03",
    title: "Controlled Pilot",
    body: "Deploy a contained build to gather team feedback and operational signals, then refine the workflow before broader rollout.",
  },
  {
    number: "04",
    title: "Operational Rollout",
    body: "Move from pilot to production with stable routines, team enablement, and a roadmap for the next layer of workflow capability.",
  },
];

export function EngagementModelSection() {
  return (
    <section className="section section--border" id="engagement">
      <Container>
        <SectionHeader
          align="center"
          description="A structured methodology from early opportunity framing to a production-ready workflow system."
          eyebrow="ENGAGEMENT METHODOLOGY"
          title="A deliberate path to production."
        />
        <div className="engagement-grid">
          {steps.map((step, index) => (
            <SectionReveal delay={index * 0.06} key={step.number}>
              <CursorReactiveCard className="engagement-step">
                <div className="engagement-step__number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </CursorReactiveCard>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
