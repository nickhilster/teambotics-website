import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Teambotics is an independent AI lab led by Nikhil Khedkar. We build conversational and interactive products for complex domains — legal, operational, narrative, and creative.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="section" id="about">
        <Container className="about">

          <SectionReveal delay={0.0}>
            <p className="section-eyebrow">THE LAB</p>
            <h1 className="about__title">
              An independent AI lab.<br />
              Small by design.
            </h1>
          </SectionReveal>

          <SectionReveal className="about__lead" delay={0.08}>
            <p>
              Teambotics builds conversational and interactive AI products for environments
              where the work is complex, the stakes are real, and generic tooling doesn&apos;t hold up.
              We ship proprietary products and build bespoke systems for a small number of partners —
              and we keep it that way deliberately.
            </p>
            <p>
              Every engagement is led by{" "}
              <a
                className="about__link"
                href="https://www.nikdesign.ca"
                rel="noopener noreferrer"
                target="_blank"
              >
                Nikhil Khedkar
              </a>
              , a designer and systems thinker who has spent his career at the intersection of
              workflow strategy, AI enablement, and interface design. Depending on what a project
              requires, we bring in a focused group of researchers, engineers, and designers —
              assembled around the specific problem, not staffed from a standing bench.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.04}>
            <hr className="about__divider" />
          </SectionReveal>

          <SectionReveal className="about__section" delay={0.06}>
            <h2 className="about__section-title">How we work</h2>
            <p>
              We don&apos;t arrive with a pre-built solution. We spend time inside the operational
              context first — understanding the constraints, the failure modes, and what has already
              been tried. Then we build something that fits.
            </p>
            <p>
              The team that works on a project is shaped by what the project needs. A compliance
              workflow system and a generative creative platform require fundamentally different
              expertise. We staff accordingly rather than stretching a fixed team across
              every type of work.
            </p>
            <p>
              We work with a small number of partners at any given time. That&apos;s not a marketing
              line — it&apos;s a constraint we hold ourselves to because the standard we maintain
              requires it.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.04}>
            <hr className="about__divider" />
          </SectionReveal>

          <SectionReveal className="about__section" delay={0.06}>
            <h2 className="about__section-title">What we build</h2>
            <p>
              Our current portfolio spans four products across legal workflow, enterprise enablement,
              narrative intelligence, and interactive creative technology. Some are proprietary
              platforms; some are bespoke systems built for and with a specific partner.
            </p>
            <ul className="about__product-list">
              <li>
                <Link className="about__product-link" href="/products/ltb-buddy">
                  LTB Buddy
                </Link>{" "}
                — Guided legal intake and LTB form support for Ontario tenants. In beta.
              </li>
              <li>
                <Link className="about__product-link" href="/products/easybuddy">
                  EasyBuddy
                </Link>{" "}
                — Bespoke AI training and onboarding assistant for frontline enterprise teams.
              </li>
              <li>
                <Link className="about__product-link" href="/products/code2motion">
                  Code2Motion
                </Link>{" "}
                — Interactive generative art platform. In early access at code2motion.app.
              </li>
              <li>
                <Link className="about__product-link" href="/products/storytellr">
                  Storytellr
                </Link>{" "}
                — Client-facing narrative graph experience. In build.
              </li>
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.04}>
            <hr className="about__divider" />
          </SectionReveal>

          <SectionReveal className="about__cta" delay={0.06}>
            <p>
              If you want to talk about a workflow problem, a product idea, or a potential
              engagement, the best starting point is a direct message.
            </p>
            <a className="about__cta-link" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </SectionReveal>

        </Container>
      </section>
    </main>
  );
}
