import Link from "next/link";
import styles from "./symphony.module.css";

const fieldNotes = [
  {
    number: "01",
    label: "Adoption",
    title: "The first 30 days with a business agent",
    copy: "A small, observable progression from orientation to useful delegation. Start with the work, then earn the permissions.",
  },
  {
    number: "02",
    label: "Operating discipline",
    title: "Why approval gates beat accidental autonomy",
    copy: "A practical way to keep a human in the loop when an action can change a system, reach a person, or consume a scarce resource.",
  },
  {
    number: "03",
    label: "Economics",
    title: "What a run costs—and what it is worth",
    copy: "Credit literacy without false precision: make the tradeoff visible, batch the work, and spend when the outcome justifies it.",
  },
];

const operatingRules = [
  ["Chat first", "Use conversation to think, scope, and brief before asking an agent to act."],
  ["One task, one executor", "Give one bounded objective to one executor with a clear source of truth and stop condition."],
  ["Permission is specific", "Approval belongs to the exact action, scope, and moment—not to a vague standing intention."],
  ["Memory needs hygiene", "Keep durable decisions, temporary context, and unverified claims visibly separate."],
];

const fieldNoteDetails = [
  {
    number: "01",
    label: "ADOPTION / 30 DAYS",
    title: "Earn the permissions",
    paragraphs: [
      "The first month should be a calibration loop, not a race to automate everything. Start with observation and briefing. Let the agent show how it handles context, uncertainty, and handoffs before expanding its remit.",
      "A useful checkpoint is simple: can a new request arrive, become a bounded brief, and return with its evidence and next decision still visible? If not, widen the context before widening the authority.",
    ],
  },
  {
    number: "02",
    label: "OPERATING DISCIPLINE / APPROVALS",
    title: "A gate is part of the work",
    paragraphs: [
      "Approval is not friction added after the useful thinking. It is the boundary that makes the useful thinking safe to act on. The gate should name the exact action, the destination, the expected spend or external effect, and the stop condition.",
      "A previous yes is not a blank cheque. If the scope, cost, balance, or evidence changes materially, bring the decision back with the new facts in view.",
    ],
  },
  {
    number: "03",
    label: "ECONOMICS / CREDIT LITERACY",
    title: "Spend for the decision it unlocks",
    paragraphs: [
      "The right question is rarely “can the agent do this?” It is “what decision will this run unlock, and is that decision worth the metered action?” Planning and briefing should happen before the paid step wherever the product permits it.",
      "When the cost is not visible in advance, say so plainly. Batch related work, avoid retries without a fresh approval, and treat a surprising delta as a signal to pause and review rather than as a new baseline.",
    ],
  },
];

const starterUrl = "https://gist.github.com/nickhilster/44bc66fc618fb683ab6cdfb6d4cc3cf8";

const onboardingWeeks = [
  ["01", "Prove value", "Days 1–7", "One useful first win, a clear approval rhythm, and zero metered surprises."],
  ["02", "Establish the handoff loop", "Days 8–14", "Turn conversation into briefs and artifacts that can move work forward."],
  ["03", "Spend once, on purpose", "Days 15–21", "Try one tightly scoped metered action with an explicit yes and verified outcome."],
  ["04", "Widen by evidence", "Days 22–30", "Expand only the named permissions that the first three weeks earned."],
];

export default function SymphonyPage() {
  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Teambotics home">
          <span className={styles.wordmarkMark} aria-hidden="true">T</span>
          <span>TEAMBOTICS</span>
        </Link>
        <nav className={styles.nav} aria-label="Symphony guide navigation">
          <a href="#playbook">Playbook</a>
          <a href="#notes">Field notes</a>
          <a href="#exploration">Exploration</a>
        </nav>
        <span className={styles.headerTag}>PUBLIC FIELD GUIDE / 01</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>A Teambotics working library</p>
          <h1>Make the operating layer earn its place.</h1>
          <p className={styles.lede}>
            A practical field guide for getting lasting value from Symphony after signup: clearer briefs, cleaner handoffs, better memory, and deliberate execution.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={starterUrl}>Get the 15-minute starter <span aria-hidden="true">↗</span></a>
            <a className={styles.textAction} href="#notes">Browse field notes</a>
          </div>
        </div>
        <div className={styles.heroDiagram} aria-label="A diagram showing context, judgment, and execution connected in sequence" role="img">
          <div className={styles.diagramGrid} />
          <div className={`${styles.node} ${styles.nodeTop}`}><span>01</span><strong>CONTEXT</strong><small>what is true?</small></div>
          <div className={`${styles.node} ${styles.nodeRight}`}><span>02</span><strong>JUDGMENT</strong><small>what is worth doing?</small></div>
          <div className={`${styles.node} ${styles.nodeBottom}`}><span>03</span><strong>EXECUTION</strong><small>what is approved?</small></div>
          <svg className={styles.diagramLines} viewBox="0 0 500 500" aria-hidden="true">
            <path d="M250 110 C375 120 400 215 355 295" />
            <path d="M355 325 C310 410 180 415 140 330" />
            <path d="M125 290 C75 205 120 125 220 108" />
          </svg>
          <p className={styles.diagramCaption}>A useful agentic system is a loop, not a button.</p>
        </div>
      </section>

      <section className={styles.statement}>
        <p className={styles.sectionLabel}>THE THESIS</p>
        <p className={styles.statementText}>The signup is the beginning. The compounding value comes from a way of working.</p>
      </section>

      <section className={styles.firstWin} id="first-win">
        <div>
          <p className={styles.sectionLabel}>THE FIRST 15 MINUTES</p>
          <h2>Proactive thinking. Gated doing.</h2>
        </div>
        <div className={styles.firstWinCopy}>
          <p>Maestro should open on a specific observation from the user&apos;s context, produce one prioritized next move, and leave the user holding a useful draft or brief.</p>
          <p>That first win stays in chat. Anything that spends credits, reaches another person, calls a connector, or creates an external side effect waits behind an explicit approval gate.</p>
          <a className={styles.inlineCta} href={starterUrl}>Open the GitHub starter Gist <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className={styles.section} id="playbook">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionLabel}>ADOPTION PLAYBOOK</p>
          <h2>Four weeks. One trust curve.</h2>
          <p>Week 1 is the first-class funnel. The rest of the month earns the right to widen the leash by evidence.</p>
        </div>
        <div className={styles.weeks}>
          {onboardingWeeks.map(([number, title, days, copy]) => (
            <article className={`${styles.week} ${number === "01" ? styles.weekFeatured : ""}`} key={number}>
              <span>{number}</span><small>{days}</small><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
        <div className={styles.weekOneDetail}>
          <span className={styles.sectionLabel}>WEEK 01 / DAY 01 → DAYS 2–7</span>
          <p><strong>Day 1:</strong> one specific observation, one prioritized next move, one useful artifact. <strong>Days 2–7:</strong> a single recommended next move, the first handoff artifact, continuity on a stalled thread, and a short free review.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.notesSection}`} id="notes">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionLabel}>FIELD NOTES</p>
          <h2>Lessons for the working day.</h2>
          <p>Short, source-aware essays and templates for operators who want useful autonomy without losing the plot.</p>
        </div>
        <div className={styles.noteGrid}>
          {fieldNotes.map((note) => (
            <article className={styles.noteCard} key={note.number}>
              <div className={styles.noteMeta}><span>{note.number}</span><span>{note.label}</span></div>
              <h3>{note.title}</h3>
              <p>{note.copy}</p>
              <a className={styles.readMore} href={`#note-${note.number}`}>Read the note <span aria-hidden="true">↘</span></a>
            </article>
          ))}
        </div>
        <div className={styles.noteDetails}>
          {fieldNoteDetails.map((note) => (
            <article className={styles.noteDetail} id={`note-${note.number}`} key={note.number}>
              <div className={styles.noteDetailMeta}><span>{note.number}</span><span>{note.label}</span></div>
              <div>
                <h3>{note.title}</h3>
                {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.rules}>
        <div className={styles.ruleIntro}>
          <p className={styles.sectionLabel}>THE OPERATING LAYER</p>
          <h2>Good systems make the next decision easier.</h2>
        </div>
        <div className={styles.ruleList}>
          {operatingRules.map(([title, copy], index) => (
            <div className={styles.rule} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.exploration}`} id="exploration">
        <div className={styles.explorationMark}>?</div>
        <div>
          <p className={styles.sectionLabel}>OPEN EXPLORATION</p>
          <h2>Could a relationship layer and an operating layer make each other better?</h2>
          <p>This is a question, not an integration claim. Boardy × Symphony is an early hypothesis worth testing at the boundary between “who” and “what happens next.”</p>
          <span className={styles.status}>HYPOTHESIS / NOT A PARTNERSHIP</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><span className={styles.footerTitle}>SYMPHONY FIELD GUIDE</span><span className={styles.footerNote}>An independent Teambotics publication.</span></div>
        <div className={styles.footerLinks}><Link href="/">Teambotics</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
