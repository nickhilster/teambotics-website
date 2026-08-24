import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "@/components/poko/poko-site.module.css";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Poko is a desktop companion for coding-agent work: real-time agent presence, clearer handoffs, and local-first Steward-style trust loops.",
  alternates: {
    canonical: "https://poko.teambotics.app/",
  },
};

export default function PokoProductPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <p className={styles.kicker}>Poko is the active product line</p>
          <h1 className={styles.pageTitle}>A desktop companion for coding-agent work.</h1>
          <p className={styles.lead}>
            Poko reacts in real time to what your agents are doing, keeps important handoffs visible, and helps turn multi-agent activity into something you can actually follow.
          </p>
          <div className={styles.actions}>
            <a className="button button--primary" href="https://github.com/Teambotics-BackBurner/poko/releases" target="_blank" rel="noopener noreferrer">Download Poko</a>
            <Button href="/how-to-use" variant="ghost">How to Use</Button>
            <Button href="/features" variant="ghost">Explore Features</Button>
          </div>
        </div>
        <aside className={styles.heroCard}>
          <div className={styles.signalList}>
            <div className={styles.signalItem}>
              <strong>Real-time agent state</strong>
              <span>See thinking, working, waiting, and completion states without checking every terminal.</span>
            </div>
            <div className={styles.signalItem}>
              <strong>Desktop-native Steward direction</strong>
              <span>Mission briefs, waiting reasons, replay summaries, and handoff flows are now part of Poko’s local product surface.</span>
            </div>
            <div className={styles.signalItem}>
              <strong>Local-first coordination</strong>
              <span>Poko is designed to sit between you and your tools without pretending to be the user or silently taking over.</span>
            </div>
          </div>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>Multi-agent visibility</span>
            <span className={styles.badge}>Themes + voice</span>
            <span className={styles.badge}>Dashboard + HUD</span>
            <span className={styles.badge}>Hermes support</span>
          </div>
        </aside>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Poko does</h2>
        <p className={styles.sectionIntro}>Poko brings live agent activity, desktop presence, and Steward-style trust loops into one local product.</p>
        <div className={styles.grid3}>
          <article className={styles.card}>
            <h3>Stay aware of your agents</h3>
            <p>Poko watches supported local coding agents and reflects their live state on your desktop — thinking, working, waiting, done, and more.</p>
          </article>
          <article className={styles.card}>
            <h3>Make agent work visible</h3>
            <p>Instead of letting activity disappear into terminals and background processes, Poko gives you a persistent desktop surface for what’s happening now.</p>
          </article>
          <article className={styles.card}>
            <h3>Help with trust and handoffs</h3>
            <p>Poko’s Steward direction is about making requests, approvals, waiting reasons, and handoffs easier to understand — without hiding who asked, what happened, or what was shared.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.card}>
            <h3>Why people use it</h3>
            <ul>
              <li>You run more than one coding agent and want to know what each one is doing.</li>
              <li>You want a desktop-native presence instead of checking every terminal constantly.</li>
              <li>You want clearer approval and handoff flows for agent-driven work.</li>
              <li>You like your tooling to feel alive, visible, and easier to trust.</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h3>Product pillars</h3>
            <ul>
              <li><strong>Visibility:</strong> know what your agents are doing at a glance.</li>
              <li><strong>Trust:</strong> make approvals, handoffs, and context-sharing boundaries easier to understand.</li>
              <li><strong>Presence:</strong> keep a desktop-native companion that feels alive and useful.</li>
              <li><strong>Coordination:</strong> support parallel sessions and stronger multi-agent workflows over time.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.callout}>
          <h3>Trust statement</h3>
          <p>Poko is not trying to impersonate you. Its job is to make agent work more legible, help protect your attention, and keep the decision boundary visible.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Bring your coding agents onto the desktop.</h2>
          <p className={styles.sectionIntro}>Use Poko to make sessions more visible, more understandable, and easier to manage.</p>
          <div className={styles.actions}>
            <a className="button button--primary" href="https://github.com/Teambotics-BackBurner/poko/releases" target="_blank" rel="noopener noreferrer">Download</a>
            <Button href="/how-to-use" variant="ghost">Read the setup guide</Button>
            <Button href="/features" variant="ghost">See implemented features</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
