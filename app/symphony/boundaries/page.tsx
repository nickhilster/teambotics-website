import Link from "next/link";
import styles from "./boundaries.module.css";

export const metadata = {
  title: "The Boundary Map | Symphony Field Guide",
  description:
    "A practical checklist for separating resource use, external effects, and approval when working with an AI agent.",
};

const lenses = [
  {
    number: "01",
    title: "Resource",
    question: "Could this use credits or another limited resource?",
    check: "Look for current, task-specific cost information. If it is unavailable, mark the cost unknown and ask before proceeding.",
    accent: "resource",
  },
  {
    number: "02",
    title: "Outside effect",
    question: "Could this reach another person or change something outside the conversation?",
    check: "Name the destination and the exact change. Treat a draft, a proposed action, and a completed action as different states.",
    accent: "effect",
  },
  {
    number: "03",
    title: "Permission + owner",
    question: "Who owns the decision, and what approval is needed?",
    check: "Keep the human decision visible. If scope, destination, cost, or evidence changes, review the decision again.",
    accent: "permission",
  },
];

const stops = [
  ["You cannot tell what it will cost", "Pause. Ask for an estimate or state plainly that the cost is unknown."],
  ["You cannot tell what will change", "Ask for the exact proposed action, destination, and expected effect."],
  ["The source or owner is unclear", "Clarify which information governs and who has authority to decide."],
  ["The action is hard to reverse", "Keep it at the discussion or draft stage until a person reviews the consequences."],
];

export default function BoundaryMapPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/symphony" className={styles.brand}>SYMPHONY FIELD GUIDE</Link>
        <nav aria-label="Boundary guide navigation">
          <Link href="/symphony/first-15">First conversation</Link>
          <Link href="/symphony/recovery">Recovery guide</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.kicker}>PUBLIC / DECISION AID</p>
        <h1>Three questions before you hand work off.</h1>
        <p className={styles.lede}>Resource use, outside effects, and permission are related, but they are not the same thing. Check each one separately before a task moves beyond conversation.</p>
        <p className={styles.sourceNote}>Independent Teambotics guidance. This is a user checklist, not a description or guarantee of Symphony’s current controls or billing behavior.</p>
      </section>

      <section className={styles.mapSection} aria-labelledby="map-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>THE MAP / THREE INDEPENDENT LENSES</p>
          <h2 id="map-heading">One request can raise one, two, or all three questions.</h2>
          <p>Do not infer cost from an external effect, or infer permission from a cost label. Find the current answer for the specific action.</p>
        </div>
        <div className={styles.lenses}>
          {lenses.map((lens) => (
            <article className={`${styles.lens} ${styles[lens.accent]}`} key={lens.number}>
              <span>{lens.number} / {lens.title}</span>
              <h3>{lens.question}</h3>
              <p>{lens.check}</p>
            </article>
          ))}
        </div>
        <div className={styles.path} aria-label="A human-controlled handoff sequence">
          <div><span>01</span><strong>Think or draft</strong><small>Clarify the goal and source.</small></div>
          <b aria-hidden="true">→</b>
          <div><span>02</span><strong>Describe a proposal</strong><small>Name cost, effect, scope, and owner.</small></div>
          <b aria-hidden="true">→</b>
          <div><span>03</span><strong>Decide, then act</strong><small>Proceed only when the needed permission is clear.</small></div>
        </div>
        <p className={styles.pathNote}>This sequence is a recommended working practice. It does not assert that Symphony enforces these stages in every workflow.</p>
      </section>

      <section className={styles.stopSection} aria-labelledby="stop-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>STOP CONDITIONS</p>
          <h2 id="stop-heading">Unknown means pause.</h2>
        </div>
        <div className={styles.stops}>
          {stops.map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.practitioner}>
        <p className={styles.kicker}>TEAM SYMPHONY / PRACTITIONER LAYER</p>
        <h2>Same map, deeper evidence.</h2>
        <p>The practitioner version should record what was actually observed: the request, source, proposed action, decision owner, approval, result, and correction. Do not present a template as an audit log unless the product records those events.</p>
        <Link href="/symphony/operating">Read the practitioner operating model →</Link>
      </section>

      <footer className={styles.footer}>
        <Link href="/symphony">← Symphony field guide</Link>
        <Link href="/symphony/recovery">Open the recovery guide →</Link>
        <span>Independent Teambotics publication.</span>
      </footer>
    </main>
  );
}
