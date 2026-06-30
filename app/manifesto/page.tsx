const waterBodies = [
  {
    name: "Pond",
    label: "Contained",
    body: "Small, local workflows close to the people using them.",
  },
  {
    name: "Stream",
    label: "Focused",
    body: "Lightweight agents narrow enough to move quickly.",
  },
  {
    name: "River",
    label: "Connected",
    body: "Workflows moving across teams, tools, documents, and decisions.",
  },
  {
    name: "Lake",
    label: "Private",
    body: "A reservoir of organizational knowledge drawn from with care.",
  },
  {
    name: "Ocean",
    label: "Frontier",
    body: "Large-model intelligence when the work truly requires it.",
  },
];

const principles = [
  {
    title: "Local-first, not local-only",
    body: [
      "Organizations need more than one path into AI. Some systems should run close to the user. Some should live inside private infrastructure. Some should connect to frontier models when the task demands stronger reasoning, broader context, or higher performance.",
      "Local-first does not mean local-only. It means organizations should not be forced into dependency before they understand what the work actually requires.",
    ],
    signal: "Local where possible. Private where needed. Frontier where justified.",
  },
  {
    title: "Data sovereignty",
    body: [
      "An organization’s data is more than raw information. It is institutional memory: how people work, what they know, where they struggle, how they serve customers, how they train teams, and how decisions get made.",
      "Data sovereignty means organizations should understand where their knowledge lives, how it is used, who can access it, how it can be exported, and what happens when a system changes.",
      "The people responsible for the work should remain responsible for the knowledge that powers it.",
    ],
  },
  {
    title: "Agent-native by design",
    body: [
      "Agents are most useful when their roles are clear. An agent should have a defined job, appropriate memory, clear permissions, understood boundaries, and a path for escalation when human judgment is required.",
      "Agents can carry operational friction: repetitive questions, document cleanup, onboarding support, formatting work, procedural recall, intake, routing, summaries, practice, and first-pass support.",
      "Humans remain essential for judgment, accountability, trust, care, creativity, and exceptions.",
    ],
    signal: "The best agents make people more capable.",
  },
  {
    title: "Capability over dependency",
    body: [
      "Teambotics builds products and services that strengthen the teams using them. A good AI system should leave an organization more capable than it was before.",
      "Our value is not only in the software. It is in the way we design, implement, teach, document, support, and improve the system with the people who use it.",
      "We build the product. We support the implementation. We teach the workflow. We document the logic. We remain available as stewards.",
    ],
  },
  {
    title: "Stewardship",
    body: [
      "Teambotics is a product company and a stewardship partner for organizations adopting private, practical AI.",
      "AI systems live inside changing teams, changing processes, changing risks, and changing expectations. They need support after deployment.",
      "Stewardship means maintaining the waterways between people, agents, data, and judgment. It means improving what works, correcting what breaks, explaining what changes, and helping organizations mature in their use of AI.",
    ],
    signal: "Recurring value should come from recurring usefulness.",
  },
  {
    title: "Human-first, agent-friendly",
    body: [
      "We build for cooperation between humans and agents. Humans need tools that respect context, judgment, responsibility, and trust. Agents need defined roles, useful work, appropriate memory, and clear boundaries.",
      "Teambotics exists to build private, practical, agent-native AI systems that help organizations operate with more confidence, more control, and more care.",
    ],
  },
];

export default function ManifestoPage() {
  return (
    <main className="tbm-page">
      <style>{`
        .tbm-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% 8%, rgba(45, 212, 191, 0.18), transparent 32rem),
            radial-gradient(circle at 82% 16%, rgba(59, 130, 246, 0.16), transparent 30rem),
            linear-gradient(180deg, #06131f 0%, #07111d 48%, #030712 100%);
          color: #f8fbff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .tbm-skip-link {
          position: absolute;
          top: -100%;
          left: 1rem;
          z-index: 100;
          padding: 0.65rem 1rem;
          border-radius: 999px;
          background: #67e8f9;
          color: #031018;
          font-weight: 850;
          text-decoration: none;
        }

        .tbm-skip-link:focus {
          top: 1rem;
        }

        .tbm-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          border-bottom: 1px solid rgba(148, 190, 220, 0.18);
          background: rgba(6, 19, 31, 0.82);
          backdrop-filter: blur(18px);
        }

        .tbm-nav-inner {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
        }

        .tbm-brand,
        .tbm-nav a {
          color: inherit;
          text-decoration: none;
        }

        .tbm-brand {
          display: grid;
          gap: 0.1rem;
        }

        .tbm-brand strong {
          font-size: 0.95rem;
          letter-spacing: -0.03em;
        }

        .tbm-brand span {
          color: rgba(218, 232, 242, 0.62);
          font-size: 0.78rem;
        }

        .tbm-nav-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.9rem;
          color: rgba(218, 232, 242, 0.72);
          font-size: 0.88rem;
        }

        .tbm-nav-links a:hover,
        .tbm-nav-links a:focus-visible {
          color: #67e8f9;
        }

        .tbm-hero {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          padding: clamp(5.5rem, 11vw, 9rem) 0 clamp(3rem, 7vw, 6rem);
        }

        .tbm-eyebrow {
          display: inline-flex;
          width: fit-content;
          margin-bottom: 1.35rem;
          padding: 0.42rem 0.8rem;
          border: 1px solid rgba(103, 232, 249, 0.32);
          border-radius: 999px;
          background: rgba(103, 232, 249, 0.08);
          color: #67e8f9;
          font-size: 0.76rem;
          font-weight: 850;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .tbm-hero h1,
        .tbm-section h2,
        .tbm-card h2,
        .tbm-card p,
        .tbm-hero p,
        .tbm-section p {
          margin: 0;
        }

        .tbm-hero h1 {
          max-width: 1040px;
          font-size: clamp(3.1rem, 10vw, 8rem);
          line-height: 0.9;
          letter-spacing: -0.08em;
        }

        .tbm-dek {
          max-width: 820px;
          margin-top: 2rem !important;
          color: rgba(218, 232, 242, 0.78);
          font-size: clamp(1.15rem, 2.1vw, 1.42rem);
          line-height: 1.55;
        }

        .tbm-thesis {
          margin-top: 2rem !important;
          max-width: 800px;
          border-left: 3px solid #79f2b8;
          padding-left: 1.2rem;
          font-size: clamp(1.25rem, 2.4vw, 1.75rem);
          line-height: 1.34;
          letter-spacing: -0.035em;
        }

        .tbm-water-grid {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto clamp(4rem, 8vw, 7rem);
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0.8rem;
        }

        .tbm-card {
          min-height: 12rem;
          border: 1px solid rgba(148, 190, 220, 0.18);
          border-radius: 1.45rem;
          background: rgba(255, 255, 255, 0.055);
          padding: 1.15rem;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.16);
        }

        .tbm-card span {
          color: #67e8f9;
          font-size: 0.74rem;
          font-weight: 850;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .tbm-card h2 {
          margin-top: 0.65rem;
          font-size: 1.2rem;
          letter-spacing: -0.035em;
        }

        .tbm-card p {
          margin-top: 0.55rem;
          color: rgba(218, 232, 242, 0.72);
          font-size: 0.94rem;
          line-height: 1.5;
        }

        .tbm-content {
          width: min(900px, calc(100% - 2rem));
          margin: 0 auto;
          padding-bottom: 6rem;
        }

        .tbm-section {
          border-top: 1px solid rgba(148, 190, 220, 0.18);
          padding: clamp(2.8rem, 6vw, 4.7rem) 0;
        }

        .tbm-section h2 {
          max-width: 780px;
          font-size: clamp(2.1rem, 5vw, 4.4rem);
          line-height: 0.96;
          letter-spacing: -0.07em;
        }

        .tbm-section p {
          margin-top: 1.1rem;
          color: rgba(218, 232, 242, 0.76);
          font-size: 1.06rem;
          line-height: 1.68;
        }

        .tbm-signal {
          margin-top: 1.45rem;
          border: 1px solid rgba(121, 242, 184, 0.24);
          border-radius: 1.35rem;
          background: rgba(121, 242, 184, 0.07);
          padding: 1.15rem 1.2rem;
          color: #f8fbff;
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1.5;
        }

        .tbm-close {
          margin-top: 2rem;
          border: 1px solid rgba(103, 232, 249, 0.22);
          border-radius: 2rem;
          background: linear-gradient(135deg, rgba(103, 232, 249, 0.12), rgba(121, 242, 184, 0.08));
          padding: clamp(1.5rem, 4vw, 2.4rem);
        }

        .tbm-close p {
          color: #f8fbff;
          font-size: clamp(1.25rem, 3vw, 1.9rem);
          line-height: 1.34;
          letter-spacing: -0.04em;
        }

        .tbm-footer {
          border-top: 1px solid rgba(148, 190, 220, 0.18);
          color: rgba(218, 232, 242, 0.62);
          padding: 2rem 1rem 3rem;
          text-align: center;
          font-size: 0.9rem;
        }

        .tbm-footer a {
          color: #67e8f9;
          text-decoration: none;
        }

        @media (max-width: 980px) {
          .tbm-water-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .tbm-nav-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .tbm-nav-links {
            justify-content: flex-start;
          }

          .tbm-water-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <a className="tbm-skip-link" href="#manifesto-content">
        Skip to manifesto
      </a>

      <header className="tbm-nav" aria-label="Page navigation">
        <div className="tbm-nav-inner">
          <a className="tbm-brand" href="/">
            <strong>Teambotics Inc.</strong>
            <span>Human-first AI, built for teams</span>
          </a>
          <nav className="tbm-nav-links" aria-label="Related pages">
            <a href="/products/ryfine">RyFine</a>
            <a href="/products/ltb-buddy">LTB Buddy</a>
            <a href="https://www.nikdesign.ca/founders-manifesto/">Founder manifesto</a>
          </nav>
        </div>
      </header>

      <section className="tbm-hero" aria-labelledby="manifesto-title">
        <p className="tbm-eyebrow">Company manifesto</p>
        <h1 id="manifesto-title">Some work needs the ocean. Most work needs the right flow.</h1>
        <p className="tbm-dek">
          Teambotics builds practical AI products for organizations that want capability,
          privacy, and control.
        </p>
        <p className="tbm-thesis">
          We help teams choose the right level of intelligence for the work in front of
          them: local where possible, private where needed, frontier where justified.
        </p>
      </section>

      <section className="tbm-water-grid" aria-label="The right body of intelligence">
        {waterBodies.map((body) => (
          <article className="tbm-card" key={body.name}>
            <span>{body.name}</span>
            <h2>{body.label}</h2>
            <p>{body.body}</p>
          </article>
        ))}
      </section>

      <article id="manifesto-content" className="tbm-content">
        <section className="tbm-section">
          <h2>The right body of intelligence</h2>
          <p>
            Not every workflow belongs in the ocean. The largest system should not become
            the automatic answer to every problem. Good AI should fit the workflow, the
            risk, the people, the budget, and the environment where it will be used.
          </p>
          <p>
            We believe the next durable layer of AI will not be defined by model
            intelligence alone. It will be defined by whether teams can trust,
            understand, afford, govern, and operate the systems acting on their behalf.
          </p>
        </section>

        {principles.map((principle) => (
          <section className="tbm-section" key={principle.title}>
            <h2>{principle.title}</h2>
            {principle.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {principle.signal ? <div className="tbm-signal">{principle.signal}</div> : null}
          </section>
        ))}

        <section className="tbm-section">
          <h2>The work</h2>
          <p>
            Our work begins with a practical question: what helps this team operate
            better?
          </p>
          <div className="tbm-close">
            <p>
              Teambotics exists to build private, practical, agent-native AI systems that
              help organizations operate with more confidence, more control, and more
              care.
            </p>
          </div>
        </section>
      </article>

      <footer className="tbm-footer">
        <p>
          Teambotics Inc. · Private, practical AI systems · Founder manifesto at{" "}
          <a href="https://www.nikdesign.ca/founders-manifesto/">nikdesign.ca</a>
        </p>
      </footer>
    </main>
  );
}
