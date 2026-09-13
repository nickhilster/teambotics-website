import Link from "next/link";
import styles from "./recovery.module.css";

export const metadata = {
  title: "Recovery Guide | Symphony Field Guide",
  description:
    "Short correction prompts for when an AI conversation is generic, missing context, or moving toward an unclear action.",
};

const scenarios = [
  { number: "01", title: "The answer is too generic", signal: "It could apply to almost anyone, or it optimizes for the wrong outcome.", prompt: "You assumed ____. For this task, success means ____. Reframe your recommendation around that. Label any assumptions you still need to make.", stop: "If the recommendation still misses, add one concrete example of the situation before asking again." },
  { number: "02", title: "A guess is presented like a fact", signal: "The response sounds certain, but you cannot see what source supports it.", prompt: "Separate what you know from what you infer. For each important claim, show the source or mark it unknown. Do not fill gaps with a confident guess.", stop: "Do not use an unverified claim to make an external or consequential decision." },
  { number: "03", title: "Important context is missing", signal: "The suggestion ignores a constraint, audience, deadline, or fact you meant to include.", prompt: "Add this missing context: ____. Keep these constraints: ____. Please update the recommendation and point out any conflict with what you said earlier.", stop: "If the missing fact changes the decision, restate the goal and constraints before continuing." },
  { number: "04", title: "The source of truth may have changed", signal: "Two notes, records, or instructions disagree.", prompt: "These sources conflict: ____ and ____. Do not choose silently. Tell me what each source says, which one you propose to use, and what you need me to confirm.", stop: "Pause any action that depends on the conflict until the owner confirms which source governs." },
  { number: "05", title: "The next action is unclear", signal: "A response says it is ready to act, but the exact step, destination, resource cost, or approval is vague.", prompt: "Do not proceed yet. Describe the exact proposed action, destination, expected external effect, and any resource cost. Mark anything you cannot verify as unknown, then wait for my decision.", stop: "An explanation or draft is not permission to act. Decide only after the specific proposal is clear." },
  { number: "06", title: "A handoff lost a constraint", signal: "A prepared task or response omitted a requirement from the original request.", prompt: "The handoff missed this constraint: ____. Compare the current brief with the original request, list what changed or disappeared, and revise the brief. Do not execute it.", stop: "Review the corrected handoff yourself before it is used by another person or process." },
];

export default function RecoveryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/symphony" className={styles.brand}>SYMPHONY FIELD GUIDE</Link>
        <nav aria-label="Recovery guide navigation">
          <Link href="/symphony/first-15">First conversation</Link>
          <Link href="/symphony/boundaries">Boundary map</Link>
        </nav>
      </header>
      <section className={styles.hero}>
        <p className={styles.kicker}>PUBLIC / CORRECTION PROMPTS</p>
        <h1>When the conversation misses, make the next move smaller.</h1>
        <p className={styles.lede}>These short prompts help you correct direction, restore missing context, or pause before an unclear action.</p>
        <p className={styles.notice}><strong>Scope:</strong> These are illustrative situations and user practices, not a report of observed Symphony failures, their frequency, or a diagnosis of internal causes. Adapt each prompt to the conversation in front of you.</p>
      </section>
      <section className={styles.cards} aria-label="Six correction scenarios">
        {scenarios.map((scenario) => (
          <article className={styles.card} key={scenario.number}>
            <span className={styles.number}>{scenario.number} / RECOVERY</span>
            <h2>{scenario.title}</h2>
            <p className={styles.signal}><strong>When:</strong> {scenario.signal}</p>
            <div className={styles.prompt}><span>TRY THIS</span><p>“{scenario.prompt}”</p></div>
            <p className={styles.stop}><strong>Stop check:</strong> {scenario.stop}</p>
          </article>
        ))}
      </section>
      <section className={styles.brief} aria-labelledby="brief-heading">
        <p className={styles.kicker}>REUSABLE TASK BRIEF</p>
        <h2 id="brief-heading">Add enough context before you hand work off.</h2>
        <p>Use this when a task may run without a live back-and-forth. It is a general writing aid, not a claim that every Symphony workflow is headless or needs a long brief.</p>
        <pre><code>{"Goal: What outcome do I need?\nContext: What facts and sources should guide the work?\nConstraints: What must be included, avoided, or kept unchanged?\nOutput: What should the result look like?\nUnknowns: What must be asked or labeled instead of guessed?\nBoundary: What should be prepared only, and what must not be done?\nStop condition: When should the work pause for my decision?"}</code></pre>
        <p className={styles.briefNote}>For an interactive task, invite a clarifying question instead of overfilling the brief. For work that proceeds without follow-up, verify what context the workflow can actually access.</p>
      </section>
      <section className={styles.close}>
        <p className={styles.kicker}>BEFORE YOU CONTINUE</p>
        <h2>Correct the context. Verify the claim. Keep the decision with its owner.</h2>
        <div><Link href="/symphony/boundaries">Use the boundary map →</Link><Link href="/symphony">Return to the public field guide →</Link></div>
      </section>
      <footer className={styles.footer}><Link href="/symphony">← Symphony field guide</Link><span>Independent Teambotics publication.</span></footer>
    </main>
  );
}
