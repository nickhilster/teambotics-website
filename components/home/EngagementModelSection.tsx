import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discovery & Scoping",
    body: "We start inside the work. Time with the people who will use the product — mapping the workflow, the constraints, the failure modes, and what has already been tried — before any architecture is on the table.",
  },
  {
    number: "02",
    title: "System Architecture",
    body: "What we learned becomes data models, enablement flows, automation, and interfaces. The design follows how the work actually happens, not how it is supposed to.",
  },
  {
    number: "03",
    title: "Controlled Pilot",
    body: "A contained build goes to the team that will use it. Real usage informs refinements before any broader rollout — and every deployment includes a defined operational handoff.",
  },
  {
    number: "04",
    title: "Operational Rollout",
    body: "The system moves from pilot to production with stable routines, structured enablement, and a roadmap that grows with the team operating it.",
  },
];

export function EngagementModelSection() {
  return (
    <section className="section section--border" id="engagement">
      <Container>
        <SectionHeader
          align="center"
          description="How a Teambotics engagement moves from a first conversation to a system in active use."
          eyebrow="ENGAGEMENT METHODOLOGY"
          title="A deliberate path to production."
        />
        <div className="engagement-rail">
          <div aria-hidden="true" className="engagement-rail__track" />
          {steps.map((step, index) => (
            <SectionReveal delay={index * 0.06} key={step.number}>
              <div className="engagement-step">
                <div className="engagement-step__node">
                  <span className="engagement-step__number">{step.number}</span>
                </div>
                <div className="engagement-step__content">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
