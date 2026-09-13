import Link from "next/link";
import styles from "./first15.module.css";

const starterUrl = "https://gist.github.com/nickhilster/44bc66fc618fb683ab6cdfb6d4cc3cf8";

export const metadata = {
  title: "Your First 15 Minutes with Symphony",
  description:
    "A practical first-conversation walkthrough for Symphony: one paste, one useful chat-native next move, and clear approval boundaries.",
};

const steps = [
  {
    time: "00–02",
    title: "Share enough context",
    body: "Use the starter as your first message. Include what you do, what you are working on, what is stuck, and what a useful first win would look like. Share only information you are comfortable placing in the conversation.",
  },
  {
    time: "02–05",
    title: "Check what Maestro understood",
    body: "A first reply might reflect your situation, offer an observation, or suggest a next move. It may take a different shape. If something is off, correct it plainly; that correction gives the conversation better context.",
  },
  {
    time: "05–10",
    title: "Work through one real question",
    body: "Choose one decision, draft, plan, or counterargument and think it through in chat. Keep this first win inside the conversation; the goal is to leave with something you can use.",
  },
  {
    time: "10–15",
    title: "Notice where action needs approval",
    body: "If a proposed next step would use a connected tool, fetch a URL, contact someone, or change something outside the conversation, the session should explain the exact action and wait for your approval. An explanation is not approval.",
  },
];

export default function FirstFifteenPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/symphony" className={styles.brand}>SYMPHONY FIELD GUIDE</Link>
        <Link href="/symphony">← New-user guide</Link>
      </header>

      <section className={styles.hero}>
        <p className={styles.kicker}>PUBLIC / FIRST CONVERSATION</p>
        <h1>Your first 15 minutes with Symphony.</h1>
        <p className={styles.intro}>Symphony is a chat-based workspace for thinking through a problem before taking action. This guide shows how to start one conversation with Maestro, the assistant featured here.</p>
        <p className={styles.timeNote}>About 15 minutes, unhurried. Treat the times as a rhythm, not a stopwatch; your conversation may take more or less time.</p>
        <a className={styles.cta} href={starterUrl}>Get the one-paste starter <span aria-hidden="true">↗</span></a>
      </section>

      <section className={styles.firstAction} aria-labelledby="first-action-heading">
        <div><p className={styles.kicker}>START HERE</p><h2 id="first-action-heading">Open. Copy. Paste. Send.</h2></div>
        <ol>
          <li><span>01</span><p>Open a new Symphony conversation.</p></li>
          <li><span>02</span><p>Open the starter and copy the single block. Fill in the bracketed context in that same block.</p></li>
          <li><span>03</span><p>Paste it as your first message and send. Your first exchange is designed to stay inside the chat.</p></li>
        </ol>
      </section>

      <section className={styles.expectations} aria-labelledby="first-turn-heading">
        <h2 id="first-turn-heading">How the first turn works</h2>
        <div className={styles.expectationGrid}>
          <article><span>01 / YOU BEGIN</span><h3>You speak first.</h3><p>A new conversation needs your first message to establish context.</p></article>
          <article><span>02 / ONE MESSAGE</span><h3>One paste is the starting point.</h3><p>A first reply might reflect your situation, offer an observation, or suggest a next move. Correct anything it misunderstands.</p></article>
          <article><span>03 / CLEAR BOUNDARY</span><h3>Thinking happens here. Doing asks first.</h3><p>Before a step that would leave the chat, the session should describe the exact action and wait for explicit approval. An explanation is not approval.</p></article>
        </div>
      </section>

      <section className={styles.timeline} aria-labelledby="timeline-heading">
        <div className={styles.sectionHeading}><p className={styles.kicker}>A SIMPLE RHYTHM</p><h2 id="timeline-heading">One conversation, four moments.</h2></div>
        <ol>
          {steps.map((step, index) => (
            <li key={step.time}>
              <span className={styles.stepTime}>{step.time}<small>MIN</small></span>
              <span className={styles.stepIndex}>0{index + 1}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.example} aria-labelledby="example-heading">
        <div className={styles.exampleIntro}>
          <p className={styles.kicker}>ILLUSTRATIVE EXAMPLE</p>
          <h2 id="example-heading">Specific context gives the conversation something to work with.</h2>
          <p>This scenario and response are illustrative. They are not a captured user result, product guarantee, or promise about what any particular conversation will produce.</p>
        </div>
        <div className={styles.exchange}>
          <div><span>ILLUSTRATIVE CONTEXT</span><p>“I’m a solo founder building a developer tool. New users often stop before finishing the sample project. I think the first completed project is the moment they understand the value. I want one practical thing I can do today.”</p></div>
          <div className={styles.reply}><span>ILLUSTRATIVE FIRST REPLY</span><p>“My read: you have a working tool, and the first completed sample project is your current definition of a user reaching value.</p><p>One hypothesis from what you shared: the friction may be somewhere between signup and the first completed project. I haven’t seen your product flow or user data, so that is a starting hypothesis, not a finding.</p><p>One practical next move for today: walk through the sample project as a new user and make a short friction checklist:</p><ol><li>Where do I first need information that isn’t on screen?</li><li>Which step is easiest to abandon?</li><li>What is the smallest change that would make the next step obvious?</li></ol><p>Use the checklist to choose one change to test. If you share the steps in your sample project, we can refine it here.”</p><p className={styles.exampleLimit}>This is a starting point, not a product result. The user would need to inspect their own flow and refine the hypothesis.</p></div>
        </div>
      </section>

      <section className={styles.recovery} aria-labelledby="recovery-heading">
        <div className={styles.sectionHeading}><p className={styles.kicker}>IF THE FIRST TURN MISSES</p><h2 id="recovery-heading">A correction is useful context.</h2></div>
        <div className={styles.recoveryRows}>
          <article><h3>It asks a clarifying question</h3><p>Answer with the missing fact in a line. If you prefer, ask it to make a reasonable assumption and label it.</p></article>
          <article><h3>The reply feels generic</h3><p>Correct the assumption and name what matters. For example: “You assumed activation means feature use. For this product, it means completing a first project. Reframe the next step around that.”</p></article>
          <article><h3>It seems ready to act outside chat</h3><p>Ask it to talk the step through first. Before a metered or external action, it should state the exact proposal and wait for your explicit approval. An explanation is not approval.</p></article>
        </div>
      </section>

      <section className={styles.close}>
        <p className={styles.kicker}>THE FIRST CONVERSATION</p>
        <h2>Share context. Think through one next move. Keep control of what leaves the chat.</h2>
        <a className={styles.cta} href={starterUrl}>Open the one-paste starter <span aria-hidden="true">↗</span></a>
      </section>

      <footer className={styles.footer}>
        <span>Independent Teambotics publication.</span>
        <Link href="/symphony/operating">Building with Symphony? Read the practitioner notes →</Link>
      </footer>
    </main>
  );
}
