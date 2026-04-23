import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discover",
    body: "Embed in the operational context first. Understand constraints before writing a line of code.",
  },
  {
    number: "02",
    title: "Design",
    body: "Architecture that respects regulatory constraints and how people actually work.",
  },
  {
    number: "03",
    title: "Deploy",
    body: "Phased rollout with real monitoring. Production systems, not soft launches.",
  },
  {
    number: "04",
    title: "Evolve",
    body: "Operational AI isn't one-time. We maintain and evolve systems as environments change.",
  },
];

export function EngagementModelSection() {
  return (
    <section className="section section--border" id="engagement">
      <Container>
        <SectionHeader
          align="center"
          description="Four phases. One continuous partnership."
          eyebrow="HOW WE WORK"
          title="The engagement model."
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
