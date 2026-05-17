"use client";

import { Blocks, ShieldCheck, Workflow } from "lucide-react";
import { CursorReactiveCard } from "@/components/animation/CursorReactiveCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";

const capabilityIcons = [
  {
    icon: Blocks,
  },
  {
    icon: ShieldCheck,
  },
  {
    icon: Workflow,
  },
];

export function CapabilitiesSection() {
  const { messages } = useSiteLocale();

  return (
    <section className="section section--border" id="capabilities">
      <Container>
        <SectionHeader
          align="center"
          description={messages.capabilities.description}
          eyebrow={messages.capabilities.eyebrow}
          title={messages.capabilities.title}
        />
        <div className="capabilities-grid">
          {messages.capabilities.items.map((capability, index) => {
            const Icon = capabilityIcons[index]?.icon ?? Blocks;

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
