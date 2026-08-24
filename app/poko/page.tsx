import type { Metadata } from "next";
import Link from "next/link";
import { Download, Monitor, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "@/components/poko/poko-site.module.css";

const highlights = [
  {
    icon: Monitor,
    title: "Real-time desktop presence",
    body: "See thinking, working, waiting, and completion states without checking every terminal.",
  },
  {
    icon: ShieldCheck,
    title: "Steward-style trust loop",
    body: "Mission briefs, waiting reasons, replay summaries, and handoff flows are now part of Poko’s local product surface.",
  },
  {
    icon: Sparkles,
    title: "Local-first coordination",
    body: "Poko sits between you and your tools without pretending to be the user or silently taking over.",
  },
] as const;

const downloadCards = [
  {
    label: "Windows",
    body: "Primary production target with architecture-specific installers and the most complete runtime validation path today.",
  },
  {
    label: "macOS",
    body: "Supported build target for the desktop companion workflow, theme system, and packaged app surface.",
  },
  {
    label: "Linux",
    body: "Supported packaging target for the local desktop runtime and companion experience.",
  },
] as const;

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
        <div className={`${styles.heroCard} ${styles.heroPrimary}`}>
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
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><span>Surface</span><strong>Desktop-native</strong></div>
            <div className={styles.heroStat}><span>Mode</span><strong>Local-first</strong></div>
            <div className={styles.heroStat}><span>Focus</span><strong>Multi-agent clarity</strong></div>
          </div>
        </div>
        <aside className={`${styles.heroCard} ${styles.heroSecondary}`}>
          <div className={styles.previewPanel}>
            <div className={styles.previewTopline}>
              <span className={styles.previewDot}></span>
              <span>Poko desktop runtime</span>
            </div>
            <div className={styles.previewStage}>
              <div className={styles.previewPet}>
                <div className={styles.previewPetOrb}></div>
                <div className={styles.previewPetGlow}></div>
              </div>
              <div className={styles.previewStack}>
                <div className={styles.previewChip}>Thinking</div>
                <div className={styles.previewChip}>Mission Brief</div>
                <div className={styles.previewChip}>Explain run</div>
              </div>
            </div>
            <div className={styles.previewTimeline}>
              <div className={styles.previewLine}><span>Hermes</span><strong>Working</strong></div>
              <div className={styles.previewLine}><span>Steward</span><strong>Waiting reason: Permission review</strong></div>
              <div className={styles.previewLine}><span>Session</span><strong>Replay summary ready</strong></div>
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
        <h2 className={styles.sectionTitle}>Why Poko feels different</h2>
        <p className={styles.sectionIntro}>Poko is not just a mascot or status light. It is becoming the local desktop layer that makes agent work more visible, more reviewable, and easier to trust.</p>
        <div className={styles.grid3}>
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={styles.card}>
                <div className={styles.featureIconWrap}><Icon size={20} /></div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.showcaseGrid}>
          <div className={styles.card}>
            <p className={styles.kicker}>Live visibility</p>
            <h3>Make agent work visible on the desktop</h3>
            <p>Poko watches supported local coding agents and reflects their live state on your desktop — thinking, working, waiting, done, and more.</p>
          </div>
          <div className={styles.card}>
            <p className={styles.kicker}>Trust and handoffs</p>
            <h3>Turn hidden work into reviewable flows</h3>
            <p>Poko’s Steward direction is about making requests, approvals, waiting reasons, and handoffs easier to understand — without hiding who asked, what happened, or what was shared.</p>
          </div>
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
          <h3>What a polished product page will eventually show here</h3>
          <p>A richer launch pass can swap this section for live screenshots, motion captures, or short GIFs from the desktop runtime. For now, this space is intentionally holding the shape and rhythm of that media-driven story block.</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Downloads</h2>
        <p className={styles.sectionIntro}>Poko ships as a desktop app. The public download path currently runs through GitHub Releases while the product site continues to mature.</p>
        <div className={styles.grid3}>
          {downloadCards.map((card) => (
            <article key={card.label} className={styles.card}>
              <div className={styles.downloadHead}>
                <h3>{card.label}</h3>
                <Download size={18} />
              </div>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.actions}>
          <a className="button button--primary" href="https://github.com/Teambotics-BackBurner/poko/releases" target="_blank" rel="noopener noreferrer">Open Releases</a>
          <Link className="button button--ghost" href="/how-to-use">Read setup guide</Link>
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
