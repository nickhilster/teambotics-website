"use client";

import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
export function EngagementModelSection() {
  const { messages } = useSiteLocale();

  return (
    <section className="section section--border" id="engagement">
      <Container>
        <SectionHeader
          align="center"
          description={messages.engagement.description}
          eyebrow={messages.engagement.eyebrow}
          title={messages.engagement.title}
        />
        <div className="engagement-rail">
          <div aria-hidden="true" className="engagement-rail__track" />
          {messages.engagement.steps.map((step, index) => (
            <SectionReveal delay={index * 0.06} key={step.number}>
              <div className="engagement-step" tabIndex={0}>
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
