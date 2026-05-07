import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discovery & Scoping",
    body: "Align on business objectives, user requirements, and security constraints to define a high-impact MVP.",
  },
  {
    number: "02",
    title: "System Architecture",
    body: "Design scalable data models, compliant workflows, and user-centric interfaces for a robust initial release.",
  },
  {
    number: "03",
    title: "Controlled Pilot",
    body: "Deploy a contained build to gather actionable telemetry, refining the solution based on empirical user data.",
  },
  {
    number: "04",
    title: "Enterprise Scaling",
    body: "Transition from pilot to production, implementing stable operational rhythms and compounding platform capabilities.",
  },
];

export function EngagementModelSection() {
  return (
    <section className="section section--border" id="engagement">
      <Container>
        <SectionHeader
          align="center"
          description="A structured methodology from initial opportunity framing to a scalable, market-ready release."
          eyebrow="ENGAGEMENT METHODOLOGY"
          title="A precise path to production."
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
