import type { Metadata } from "next";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Design Principles",
  description:
    "The seven design principles behind Teambotics: function before form, observe behavior, design for change, design for real behavior, experience matters, intellectual honesty, and authority is contestable.",
  alternates: {
    canonical: "https://www.teambotics.app/principles",
  },
  openGraph: {
    title: "Design Principles | Teambotics",
    description:
      "These principles shape how we design systems people can trust, adopt, and use in practice.",
    url: "https://www.teambotics.app/principles",
    siteName: "Teambotics",
    locale: "en_CA",
    type: "website",
  },
};

const principles = [
  {
    title: "Function Before Form",
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    interpretation:
      "Good design gets out of the way, helping people do what they came to do.",
  },
  {
    title: "Observe Behavior",
    quote: "To design an easy-to-use interface, pay attention to what users do, not what they say.",
    author: "Jakob Nielsen",
    interpretation:
      "Real insights come from watching how people actually use systems, not from assumptions or self-reported preferences.",
  },
  {
    title: "Design for Change",
    quote: "The only constant is change.",
    author: "Heraclitus",
    interpretation:
      "Design for evolution, not perfection. Build structures that can grow with needs you can't yet see.",
  },
  {
    title: "Design for Real Behavior",
    quote: "We must design for the way people behave, not for how we wish they would behave.",
    author: "Don Norman",
    interpretation:
      "Effective design meets people where they are, accommodating human nature rather than fighting against it.",
  },
  {
    title: "Experience Matters",
    quote: "People will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou",
    interpretation:
      "Beyond functionality, great design creates positive emotional experiences that build trust and lasting relationships.",
  },
  {
    title: "Intellectual Honesty",
    quote: "The first principle is that you must not fool yourself and you are the easiest person to fool.",
    author: "Richard Feynman",
    interpretation:
      "Question assumptions, validate decisions with evidence, and remain humble about what you do not know. Good design requires truth.",
  },
  {
    title: "Authority Is Contestable",
    quote: "But who will guard the guards themselves?",
    author: "Juvenal, Satires VI",
    interpretation:
      "Good design does not depend on authority being benevolent or humble. Make decisions accountable through named ownership, independent review, audit trails, and a real way to stop or challenge the system.",
  },
];

export default function PrinciplesPage() {
  return (
    <div className="principles-page editorial-page">
      <section className="section">
        <Container className="principles">
          <SectionReveal delay={0.0}>
            <p className="section-eyebrow">DESIGN PRINCIPLES</p>
            <h1 className="principles__title">How we design systems</h1>
          </SectionReveal>

          <SectionReveal className="principles__lead" delay={0.08}>
            <p>
              These principles shape how we design systems people can trust,
              adopt, and use in practice.
            </p>
            <p>
              They are the design principles of our founder,{" "}
              <a
                className="principles__link"
                href="https://www.nikdesign.ca"
                rel="noopener noreferrer"
                target="_blank"
              >
                Nikhil Khedkar
              </a>
              {" "}— the standard every Teambotics product and engagement is
              built to.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.04}>
            <hr className="principles__divider" />
          </SectionReveal>

          <div className="principles__list">
            {principles.map((principle, index) => (
              <SectionReveal key={principle.title} delay={0.04}>
                <article className="principles__item">
                  <span className="principles__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="principles__body">
                    <h2>{principle.title}</h2>
                    <blockquote className="principles__quote">
                      <p>&ldquo;{principle.quote}&rdquo;</p>
                      <cite>&mdash; {principle.author}</cite>
                    </blockquote>
                    <p className="principles__interpretation">
                      {principle.interpretation}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.04}>
            <hr className="principles__divider" />
            <p className="principles__closing">
              The same seven principles anchor Nikhil&rsquo;s personal
              practice at{" "}
              <a
                className="principles__link"
                href="https://www.nikdesign.ca/principles"
                rel="noopener noreferrer"
                target="_blank"
              >
                nikdesign.ca/principles
              </a>
              .
            </p>
          </SectionReveal>
        </Container>
      </section>
    </div>
  );
}
