import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discovery & Scoping",
    body: "We start by listening. Every engagement begins with time in the operational context — understanding constraints, failure modes, and what has already been tried.",
  },
  {
    number: "02",
    title: "System Architecture",
    body: "We translate what we learned into data models, enablement flows, compliant automation, and interfaces designed around how people actually work — not how they're supposed to.",
  },
  {
    number: "03",
    title: "Controlled Pilot",
    body: "We deploy a contained build, gather real feedback from the team using it, and refine the workflow before any broader rollout. No soft launches that quietly go unmaintained.",
  },
  {
    number: "04",
    title: "Operational Rollout",
    body: "We move from pilot to production with stable routines, structured enablement, and a clear roadmap — so the system grows with the team instead of aging out of it.",
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
