import Image from "next/image";

const AMBER = "#FF950D";

const focusCards = [
  {
    label: "The missing signal",
    value:
      "Traditional receipt-driven feedback often captures the emotional extremes: customers who are very angry or unusually delighted. The moderate, thoughtful majority usually disappears before anyone learns from them.",
  },
  {
    label: "The service moment",
    value:
      "FeedbackFish moves capture into the store, while the interaction is still fresh and the customer still remembers who helped, what changed, and why the experience mattered.",
  },
  {
    label: "The TeamBotics lens",
    value:
      "This is not just a better survey. It is a service-intelligence loop for frontline recognition, training inputs, and operational feedback across retail and service environments.",
  },
];

const frictionRows = [
  ["Current pattern", "Receipt code, external survey site, delayed completion", "High friction after the customer leaves"],
  ["Human signal", "Feedback tied to a specific associate or service interaction", "Recognition becomes easier to route"],
  ["Participation path", "Purchasers and non-purchasers can both respond", "Service quality is measured beyond transactions"],
  ["Accessibility", "Short form with optional voice/audio feedback", "More customers can participate comfortably"],
];

const prototypePillars = [
  {
    title: "Associate-linked QR",
    body:
      "Each interaction can generate a lightweight feedback entry point connected to the associate or service desk that helped the customer.",
  },
  {
    title: "Under-60-second capture",
    body:
      "The flow prioritizes quick sentiment, reason, and optional context instead of asking customers to complete a long post-visit questionnaire.",
  },
  {
    title: "Non-purchase pathway",
    body:
      "Customers who received useful help but did not buy still count. This is critical for complex retail, advisory sales, and high-consideration service journeys.",
  },
  {
    title: "Voice-ready accessibility",
    body:
      "Audio feedback can support users who prefer speaking, have difficulty typing, or want to leave more nuanced praise or concern in the moment.",
  },
];

const prototypeFlow = [
  "Associate offers a simple QR prompt after a meaningful interaction.",
  "Customer scans, chooses purchase or no-purchase path, and rates the interaction.",
  "Customer can leave a short note or voice comment tied to the service moment.",
  "Managers review patterns for coaching, recognition, and operational improvement.",
];

const guardrails = [
  "Do not pressure customers to leave positive feedback.",
  "Separate coaching insight from punitive surveillance.",
  "Keep personally sensitive data out of the lightweight capture flow.",
  "Make associate attribution transparent and fair.",
];

export default function FeedbackFishPage() {
  return (
    <div className="ff-page">
      <style>{`
        .ff-page {
          min-height: 100vh;
          background: #000;
          color: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .ff-skip-link {
          position: absolute;
          top: -100%;
          left: 1rem;
          z-index: 100;
          padding: 0.6rem 1rem;
          background: ${AMBER};
          color: #000;
          border-radius: 999px;
          font-weight: 800;
          text-decoration: none;
        }

        .ff-skip-link:focus {
          top: 0.75rem;
        }

        .ff-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.9rem clamp(1rem, 4vw, 2rem);
          border-bottom: 1px solid rgba(255, 149, 13, 0.22);
          background: rgba(0, 0, 0, 0.86);
          backdrop-filter: blur(16px);
        }

        .ff-brand {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          min-width: 0;
        }

        .ff-brand-copy {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .ff-brand-title {
          color: ${AMBER};
          font-weight: 850;
          letter-spacing: -0.035em;
        }

        .ff-brand-subtitle {
          color: rgba(255, 255, 255, 0.52);
          font-size: 0.75rem;
        }

        .ff-button-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .ff-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.7rem;
          padding: 0.72rem 1.15rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          text-decoration: none;
        }

        .ff-button-primary {
          background: ${AMBER};
          color: #000;
        }

        .ff-button-ghost {
          border: 1px solid rgba(255, 149, 13, 0.45);
          color: ${AMBER};
        }

        .ff-hero {
          position: relative;
          overflow: hidden;
          min-height: 88vh;
          display: grid;
          place-items: center;
          padding: 5rem clamp(1rem, 4vw, 2rem) 4rem;
          background:
            radial-gradient(circle at 18% 12%, rgba(255, 149, 13, 0.18), transparent 34%),
            radial-gradient(circle at 82% 30%, rgba(37, 99, 235, 0.16), transparent 36%),
            #000;
        }

        .ff-hero-inner {
          width: min(1120px, 100%);
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(310px, 0.95fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }

        .ff-eyebrow {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          margin-bottom: 1rem;
          padding: 0.35rem 0.8rem;
          border: 1px solid rgba(255, 149, 13, 0.36);
          border-radius: 999px;
          background: rgba(255, 149, 13, 0.11);
          color: ${AMBER};
          font-size: 0.76rem;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .ff-title {
          max-width: 760px;
          margin: 0;
          color: ${AMBER};
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.07em;
        }

        .ff-hero h2 {
          max-width: 780px;
          margin: 1rem 0 0;
          font-size: clamp(1.65rem, 4vw, 3.3rem);
          line-height: 1.05;
          letter-spacing: -0.05em;
        }

        .ff-hero-copy {
          max-width: 650px;
          margin: 1.35rem 0 2rem;
          color: rgba(255, 255, 255, 0.66);
          font-size: clamp(1rem, 2vw, 1.18rem);
          line-height: 1.7;
        }

        .ff-panel {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.028));
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.36);
        }

        .ff-prototype-card {
          padding: clamp(1.1rem, 4vw, 1.5rem);
        }

        .ff-tablet-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .ff-status-pill {
          border-radius: 999px;
          background: rgba(255,149,13,0.14);
          color: ${AMBER};
          padding: 0.25rem 0.65rem;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .ff-rating-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.55rem;
          margin: 1rem 0 1.15rem;
        }

        .ff-rating {
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          border-radius: 14px;
          border: 1px solid rgba(255,149,13,0.28);
          background: rgba(255,149,13,0.08);
          color: ${AMBER};
          font-weight: 900;
        }

        .ff-input-preview {
          margin-top: 0.8rem;
          padding: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          background: rgba(0,0,0,0.26);
          color: rgba(255,255,255,0.56);
          line-height: 1.55;
        }

        .ff-section {
          padding: clamp(4rem, 9vw, 6.5rem) clamp(1rem, 4vw, 2rem);
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .ff-section-muted {
          background: #050b14;
        }

        .ff-section-deep {
          background: #061722;
        }

        .ff-container {
          width: min(1080px, 100%);
          margin: 0 auto;
        }

        .ff-section-header {
          max-width: 760px;
          margin-bottom: 2rem;
        }

        .ff-section-header.center {
          margin-inline: auto;
          text-align: center;
        }

        .ff-section-title {
          margin: 0;
          font-size: clamp(1.9rem, 4.4vw, 3rem);
          line-height: 1.07;
          letter-spacing: -0.045em;
        }

        .ff-section-copy {
          margin: 1rem 0 0;
          color: rgba(255,255,255,0.58);
          line-height: 1.75;
          font-size: 1rem;
        }

        .ff-grid-3,
        .ff-grid-4,
        .ff-grid-2 {
          display: grid;
          gap: 1rem;
        }

        .ff-grid-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .ff-grid-4 {
          grid-template-columns: repeat(4, 1fr);
        }

        .ff-grid-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .ff-card {
          padding: 1.35rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          background: rgba(255,255,255,0.04);
        }

        .ff-card-label {
          margin: 0 0 0.7rem;
          color: ${AMBER};
          font-size: 0.78rem;
          font-weight: 850;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .ff-card h3 {
          margin: 0 0 0.65rem;
          font-size: 1rem;
          letter-spacing: -0.02em;
        }

        .ff-card p,
        .ff-card li {
          color: rgba(255,255,255,0.58);
          line-height: 1.65;
          font-size: 0.92rem;
        }

        .ff-card p {
          margin: 0;
        }

        .ff-table-wrap {
          overflow-x: auto;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          background: rgba(255,255,255,0.03);
        }

        .ff-table {
          width: 100%;
          min-width: 720px;
          border-collapse: collapse;
          font-size: 0.92rem;
        }

        .ff-table th,
        .ff-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          text-align: left;
          vertical-align: top;
        }

        .ff-table th {
          color: ${AMBER};
          background: rgba(255,149,13,0.1);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .ff-table td {
          color: rgba(255,255,255,0.62);
        }

        .ff-flow {
          counter-reset: ffstep;
          display: grid;
          gap: 0.85rem;
        }

        .ff-flow-step {
          counter-increment: ffstep;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.85rem;
          align-items: start;
          padding: 1rem;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px;
          background: rgba(255,255,255,0.035);
        }

        .ff-flow-step::before {
          content: counter(ffstep);
          width: 2rem;
          height: 2rem;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: ${AMBER};
          color: #000;
          font-weight: 900;
        }

        .ff-dashboard {
          padding: 1.25rem;
        }

        .ff-dashboard-bar {
          height: 0.75rem;
          margin-top: 0.55rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }

        .ff-dashboard-fill {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: ${AMBER};
        }

        .ff-footer-cta {
          text-align: center;
        }

        .ff-disclaimer {
          margin-top: 1rem;
          color: rgba(255,255,255,0.42);
          font-size: 0.78rem;
          line-height: 1.55;
        }

        @media (max-width: 880px) {
          .ff-hero-inner,
          .ff-grid-2,
          .ff-grid-3,
          .ff-grid-4 {
            grid-template-columns: 1fr;
          }

          .ff-nav {
            align-items: flex-start;
          }

          .ff-nav .ff-button {
            display: none;
          }
        }
      `}</style>

      <a href="#ff-main" className="ff-skip-link">
        Skip to main content
      </a>

      <nav className="ff-nav" aria-label="FeedbackFish site navigation">
        <div className="ff-brand">
          <Image
            src="/brand/teambotics-logo-amber.png"
            alt="TeamBotics"
            width={34}
            height={34}
            style={{ borderRadius: "8px" }}
          />
          <div className="ff-brand-copy">
            <span className="ff-brand-title">FeedbackFish</span>
            <span className="ff-brand-subtitle">by TeamBotics</span>
          </div>
        </div>
        <a className="ff-button ff-button-primary" href="mailto:hello@teambotics.app?subject=FeedbackFish%20prototype">
          Discuss Pilot
        </a>
      </nav>

      <main id="ff-main">
        <section className="ff-hero">
          <div className="ff-hero-inner">
            <div>
              <span className="ff-eyebrow">Case study + prototype</span>
              <h1 className="ff-title">FeedbackFish</h1>
              <h2>Capture the service signal before the moment disappears.</h2>
              <p className="ff-hero-copy">
                A TeamBotics adaptation of a frontline retail UX insight: customers often want to recognize good service, but the feedback system asks too much, too late. FeedbackFish reframes that gap as a lightweight in-store capture loop for service quality, associate recognition, and training intelligence.
              </p>
              <div className="ff-button-row" style={{ justifyContent: "flex-start" }}>
                <a className="ff-button ff-button-primary" href="#prototype">
                  View Prototype Pattern
                </a>
                <a className="ff-button ff-button-ghost" href="#case-study">
                  Read Case Study
                </a>
              </div>
            </div>

            <aside className="ff-panel ff-prototype-card" aria-label="FeedbackFish prototype preview">
              <div className="ff-tablet-top">
                <div>
                  <p className="ff-card-label">Tablet prompt</p>
                  <strong>How was your service today?</strong>
                </div>
                <span className="ff-status-pill">Under 60 sec</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
                Jay helped me today with:
              </p>
              <div className="ff-input-preview">Choosing the right laptop, understanding protection options, and comparing accessories.</div>
              <div className="ff-rating-row" aria-label="Rating scale from one to five">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div className="ff-rating" key={rating}>
                    {rating}
                  </div>
                ))}
              </div>
              <div className="ff-grid-2">
                <div className="ff-card">
                  <p className="ff-card-label">Path</p>
                  <p>No purchase, still helped</p>
                </div>
                <div className="ff-card">
                  <p className="ff-card-label">Option</p>
                  <p>Leave voice note</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="ff-section ff-section-muted" id="case-study">
          <div className="ff-container">
            <div className="ff-section-header center">
              <p className="ff-card-label">Case study</p>
              <h2 className="ff-section-title">The data looked complete. The human story was missing.</h2>
              <p className="ff-section-copy">
                The original observation came from the sales floor: customers with useful, moderate feedback were not being captured because the feedback pathway lived after the visit, behind receipt friction, and outside the emotional moment that made them want to respond.
              </p>
            </div>
            <div className="ff-grid-3">
              {focusCards.map((card) => (
                <article className="ff-card" key={card.label}>
                  <p className="ff-card-label">{card.label}</p>
                  <p>{card.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ff-section">
          <div className="ff-container">
            <div className="ff-section-header">
              <p className="ff-card-label">Service redesign</p>
              <h2 className="ff-section-title">From receipt survey to frontline feedback system.</h2>
              <p className="ff-section-copy">
                FeedbackFish changes the feedback unit from a transaction receipt to a service interaction. That distinction matters: the person who did not buy today may still become tomorrow's customer because someone helped them well.
              </p>
            </div>
            <div className="ff-table-wrap" role="region" aria-label="FeedbackFish service redesign table" tabIndex={0}>
              <table className="ff-table">
                <thead>
                  <tr>
                    <th scope="col">Layer</th>
                    <th scope="col">FeedbackFish pattern</th>
                    <th scope="col">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {frictionRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="ff-section ff-section-deep" id="prototype">
          <div className="ff-container">
            <div className="ff-section-header center">
              <p className="ff-card-label">Prototype pattern</p>
              <h2 className="ff-section-title">A practical capture loop for service-led businesses.</h2>
              <p className="ff-section-copy">
                The prototype is designed for retail, repair, clinics, branches, dealerships, hospitality, and any environment where a real person improves the customer's experience before the system ever sees it.
              </p>
            </div>
            <div className="ff-grid-4">
              {prototypePillars.map((pillar) => (
                <article className="ff-card" key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ff-section">
          <div className="ff-container ff-grid-2">
            <div>
              <p className="ff-card-label">Experience flow</p>
              <h2 className="ff-section-title">Simple enough for the floor. Structured enough for management.</h2>
              <p className="ff-section-copy">
                The product value is not another dashboard. The value is closing the loop between customer memory, associate recognition, and operational learning without adding heavy process overhead.
              </p>
              <div className="ff-flow">
                {prototypeFlow.map((step) => (
                  <div className="ff-flow-step" key={step}>
                    <span style={{ color: "rgba(255,255,255,0.68)", lineHeight: 1.55 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="ff-panel ff-dashboard" aria-label="Manager insight preview">
              <p className="ff-card-label">Manager insight preview</p>
              <h3 style={{ fontSize: "1.35rem", letterSpacing: "-0.03em", margin: "0 0 1.25rem" }}>
                Mid-spectrum feedback is where coaching lives.
              </h3>
              {[
                ["Helpful but rushed", "62%"],
                ["Clear explanation", "84%"],
                ["Customer still deciding", "47%"],
                ["Associate recognition", "76%"],
              ].map(([label, value]) => (
                <div key={label} style={{ marginBottom: "1.1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", color: "rgba(255,255,255,0.68)", fontSize: "0.88rem" }}>
                    <span>{label}</span>
                    <strong style={{ color: AMBER }}>{value}</strong>
                  </div>
                  <div className="ff-dashboard-bar">
                    <span className="ff-dashboard-fill" style={{ width: value }} />
                  </div>
                </div>
              ))}
              <p className="ff-disclaimer">
                Example dashboard only. The prototype direction is about signal design, not claiming production analytics.
              </p>
            </aside>
          </div>
        </section>

        <section className="ff-section ff-section-muted">
          <div className="ff-container ff-grid-2">
            <div>
              <p className="ff-card-label">Guardrails</p>
              <h2 className="ff-section-title">Recognition without manipulation.</h2>
              <p className="ff-section-copy">
                Feedback systems can easily become pressure systems. A TeamBotics version needs clear operating rules so the product supports service quality without turning frontline staff or customers into metrics targets.
              </p>
            </div>
            <div className="ff-grid-2">
              {guardrails.map((guardrail) => (
                <article className="ff-card" key={guardrail}>
                  <p>{guardrail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ff-section">
          <div className="ff-container ff-footer-cta">
            <p className="ff-card-label">TeamBotics build direction</p>
            <h2 className="ff-section-title">FeedbackFish turns frontline moments into usable service intelligence.</h2>
            <p className="ff-section-copy" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "720px" }}>
              The next evolution would pair the lightweight capture flow with role-based dashboards, recognition workflows, accessibility-first input, and AI-assisted theme clustering for managers who need clearer service signals without creating more administrative drag.
            </p>
            <div className="ff-button-row" style={{ marginTop: "2rem" }}>
              <a className="ff-button ff-button-primary" href="mailto:hello@teambotics.app?subject=FeedbackFish%20prototype">
                Discuss FeedbackFish
              </a>
              <a className="ff-button ff-button-ghost" href="https://www.nikdesign.ca/feedbackfish" rel="noopener noreferrer" target="_blank">
                View Original Portfolio Case
              </a>
            </div>
            <p className="ff-disclaimer">
              FeedbackFish is an independent TeamBotics case-study adaptation and prototype concept. It is not affiliated with, sponsored by, or endorsed by Best Buy Canada.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
