import Link from "next/link";
import styles from "./operating.module.css";

export const metadata = {
  title: "The Operating Model | Symphony Field Guide",
  description: "A practitioner-facing working model for building trust, continuity, and deliberate execution around Symphony.",
};

const principles = [
  ["WHY", "The operating layer earns trust by making the next decision easier, not by acting more often."],
  ["HOW", "Start with context and judgment in chat. Turn the decision into a bounded handoff. Gate the execution."],
  ["BOUNDARY", "This is an outside practitioner model. It contains patterns and hypotheses, not private account policy or an official product position."],
];

const evidence = [
  ["PATTERN", "A repeatable operating approach we have found useful."],
  ["EXAMPLE", "An illustrative scenario, anonymized and non-predictive."],
  ["HYPOTHESIS", "A question worth testing, not a product or outcome claim."],
  ["PLATFORM LIMIT", "A constraint that should shape the workflow honestly."],
];

export default function OperatingModelPage() {
  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/symphony" aria-label="Symphony field guide home">SYMPHONY / TEAMBOTICS</Link>
        <span className={styles.headerTag}>TEAM SYMPHONY / PRACTITIONER NOTES</span>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>An outside working model</p>
          <h1>Make the operating layer trustworthy.</h1>
          <p className={styles.lede}>This is the why and how behind a disciplined way of working with a multi-agent operating layer. It is shared to be useful, not to sell anything.</p>
          <p className={styles.boundary}><strong>Soft gate:</strong> read openly. Some detail is held back because this site is separate from Teambotics&apos; private operating version.</p>
        </div>
        <div className={styles.spine} role="img" aria-label="A model with context and judgment feeding a gated execution layer and a continuity loop">
          <div className={styles.spineLine} />
          <div className={`${styles.spineNode} ${styles.spineNodeTop}`}><span>01</span><b>CONTEXT</b><small>what is true?</small></div>
          <div className={`${styles.spineNode} ${styles.spineNodeMiddle}`}><span>02</span><b>JUDGMENT</b><small>what matters now?</small></div>
          <div className={`${styles.spineNode} ${styles.spineNodeBottom}`}><span>03</span><b>GATED EXECUTION</b><small>what is approved?</small></div>
          <div className={styles.spineLoop}>↻ continuity</div>
        </div>
      </section>

      <section className={styles.notice}>
        <span className={styles.label}>READING NOTE</span>
        <p>This version is for people building or studying an operating model around Symphony. See the public <Link href="/symphony/boundaries">Boundary Map</Link> for the concise user checklist. New to Symphony and looking for your first 15 minutes? <Link href="/symphony">Start with the newcomer guide →</Link></p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><span className={styles.label}>WHY / HOW / BOUNDARY</span><h2>The method is the product surface.</h2></div>
        <div className={styles.principles}>
          {principles.map(([title, copy]) => <article key={title}><span>{title}</span><p>{copy}</p></article>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.sectionHead}><span className={styles.label}>THE OPERATING LOOP</span><h2>Context → judgment → execution → continuity.</h2></div>
        <div className={styles.loopGrid}>
          <article><span>01</span><h3>Context before confidence</h3><p>Make the source of truth, owner, uncertainty, and desired outcome visible before asking for action.</p></article>
          <article><span>02</span><h3>Judgment before delegation</h3><p>Use chat to choose the one next move. A larger menu is often a sign that the brief is not finished.</p></article>
          <article><span>03</span><h3>Execution behind a gate</h3><p>Name the exact action, effect, and approval moment. If cost or effect is unclear, stop and ask.</p></article>
          <article><span>04</span><h3>Continuity after the turn</h3><p>Return a useful artifact, record what changed, and let evidence—not enthusiasm—widen the remit.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><span className={styles.label}>EVIDENCE LANGUAGE</span><h2>Make uncertainty legible.</h2></div>
        <div className={styles.evidenceGrid}>{evidence.map(([title, copy]) => <div className={styles.evidence} key={title}><span>{title}</span><p>{copy}</p></div>)}</div>
      </section>

      <section className={`${styles.section} ${styles.mediaSection}`}>
        <div className={styles.sectionHead}><span className={styles.label}>TUTORIAL ROADMAP</span><h2>Format follows the failure it fixes.</h2></div>
        <div className={styles.mediaRows}>
          <div><span>WAVE 01</span><h3>Text + static diagrams</h3><p>Starter walkthroughs, approval-gate explainers, and the operating-model spine. Cheapest to correct, easiest to cite.</p></div>
          <div><span>WAVE 02</span><h3>Short screen captures</h3><p>Use motion when sequence matters: ask → approval → handoff → done.</p></div>
          <div><span>WAVE 03</span><h3>Two-AI conversations</h3><p>Maestro + ChatGPT, Maestro + Boardy, or Boardy + ChatGPT. Each episode steel-mans the other system and names its own limits. No sales CTA.</p></div>
        </div>
      </section>

      <section className={styles.notice} aria-label="Podcast series roadmap">
        <span className={styles.label}>SERIES ROADMAP</span>
        <p>The six-episode foundation, persona lanes, and recording discipline for the independent Teambotics audio series. <Link href="/symphony/podcast-series-roadmap.html">Read the podcast roadmap →</Link></p>
      </section>

      <footer className={styles.footer}><Link href="/symphony">← New-user guide</Link><span>Independent Teambotics publication / not an official Symphony or Wix document</span></footer>
    </main>
  );
}
