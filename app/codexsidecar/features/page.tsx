import type { Metadata } from "next";
import base from "../page.module.css";
import styles from "./features.module.css";

export const metadata: Metadata = {
  title: "Features | CodexSidecar",
  description: "A look at the session organization, local context, and review tools in the CodexSidecar internal prototype.",
  alternates: { canonical: "https://codexsidecar.teambotics.app/features" },
};

export default function CodexSidecarFeaturesPage() {
  return (
    <div className={`${base.site} ${styles.featuresPage}`}>

  <a className={styles.skip} href="#main">Skip to content</a>
  <header className={base.header}>
    <a className={base.brand} href="https://codexsidecar.teambotics.app/" aria-label="CodexSidecar home"><span className={base.brandMark} aria-hidden="true">C</span><span>codex<span className={base.brandLight}>sidecar</span></span></a>
    <nav className={styles.pageNav} aria-label="Main navigation"><a className={base.navCta} href="https://codexsidecar.teambotics.app/">Home</a><a className={styles.current} href="https://codexsidecar.teambotics.app/features" aria-current="page">Features</a></nav>
  </header>
  <main id="main">
    <section className={`${styles.featuresIntro} ${styles.wrap}`} aria-labelledby="page-heading">
      <p className={styles.status}>Internal prototype</p>
      <h1 id="page-heading">Find the work. Keep the context.</h1>
      <p>Browse and organize your Codex data locally, or start a real Codex desktop chat from Sidecar. These features are being tested internally and aren’t generally available.</p>
      <div className={base.heroActions}><a className={base.buttonPrimary} href="#preview">Explore the features</a><a className={base.textLink} href="#roadmap">See what’s still being tested</a></div>
    </section>
    <section className={`${base.howSection} ${styles.wrap}`} id="preview" aria-labelledby="preview-heading">
      <div className={`${base.sectionHeading} ${styles.sectionHeading}`}><p className={`${base.eyebrow} ${styles.eyebrow}`}>Implemented in the internal prototype</p><h2 id="preview-heading">What Sidecar can do today</h2></div>
      <ul className={`${base.featureGrid} ${styles.reviewGrid}`}>
        <li className={`${base.featureCard} ${styles.featureCard}`}>
          <span className={`${base.featureIcon} ${base.iconBlue}`} aria-hidden="true">⌕</span>
          <h3>Find and reopen past sessions</h3>
          <p>Search by session title, project, branch, model, or ID, then reopen a session in Codex. This searches session details, not conversation text.</p>
        </li>
        <li className={`${base.featureCard} ${styles.featureCard}`}>
          <span className={`${base.featureIcon} ${base.iconGreen}`} aria-hidden="true">▤</span>
          <h3>Organize with pins and collections</h3>
          <p>Pin sessions you use often and group related work into collections. These labels belong to Sidecar; they don’t change Codex’s session records.</p>
        </li>
        <li className={`${base.featureCard} ${styles.featureCard}`}>
          <span className={`${base.featureIcon} ${base.iconAmber}`} aria-hidden="true">✎</span>
          <h3>Make notes you can review and edit</h3>
          <p>Opt in to a review of selected sessions through your configured Codex account. Edit the proposed notes before saving them, with links back to their sources.</p>
        </li>
        <li className={`${base.featureCard} ${styles.featureCard}`}>
          <span className={`${base.featureIcon} ${base.iconGreen}`} aria-hidden="true">✳</span>
          <h3>Find local memory with its source</h3>
          <p>Search local Markdown notes and see which file an excerpt came from. Sidecar doesn’t assume a note was used in a conversation just because it exists.</p>
        </li>
        <li className={`${base.featureCard} ${styles.featureCard}`}>
          <span className={`${base.featureIcon} ${base.iconBlue}`} aria-hidden="true">▣</span>
          <h3>Browse session artifacts</h3>
          <p>Find and preview supported images, visualizations, and attachments. Sidecar shows when a file’s link to a session is uncertain.</p>
        </li>
        <li className={`${base.featureCard} ${styles.featureCard}`}>
          <span className={`${base.featureIcon} ${base.iconAmber}`} aria-hidden="true">↶</span>
          <h3>Review cleanup before it happens</h3>
          <p>Inspect a proposal and approve the exact action. Supported moves use quarantine so you can restore what you kept there.</p>
        </li>
        <li className={`${base.featureCard} ${styles.featureCard}`}>
          <span className={`${base.featureIcon} ${base.iconGreen}`} aria-hidden="true">↗</span>
          <h3>Start a real Codex desktop chat</h3>
          <p>Your installed Codex app-server creates a real Codex thread scoped to the Sidecar workspace. Codex keeps the history under your configured account and model. When Sidecar offers a desktop recovery link, it opens that same thread in Codex.</p>
        </li>
      </ul>
    </section>
    <section className={base.controlSection} id="roadmap" aria-labelledby="roadmap-heading">
      <div className={`${styles.roadmapContent} ${styles.wrap}`}>
        <div className={`${base.sectionHeading} ${styles.sectionHeading}`}><p className={`${base.eyebrow} ${styles.eyebrow}`}>Not generally available</p><h2 id="roadmap-heading">Cross-device sync is still in testing</h2></div>
        <ul className={`${base.controlPoints} ${styles.controlPoints}`}>
          <li><strong>Selected cross-device sync.</strong> An opt-in encrypted sync prototype for selected material, not your full Codex history. Live multi-device sync is still unverified.</li>
        </ul>
      </div>
    </section>
    <section className={`${base.closing} ${styles.boundary} ${styles.wrap}`} aria-labelledby="boundary-heading">
      <h2 id="boundary-heading">Sidecar doesn’t own your Codex data.</h2>
      <p>Browsing sessions, pins, and collections are local. New chat messages go through your configured Codex model; if you explicitly choose to extract notes, selected session content can go to that model too. Cross-device sync is separate and opt-in.</p>
      <a className={base.buttonPrimary} href="https://codexsidecar.teambotics.app/">Back to CodexSidecar</a>
    </section>
  </main>
  <footer className={`${base.footer} ${styles.siteFooter}`}><a className={base.brand} href="https://codexsidecar.teambotics.app/"><span className={base.brandMark} aria-hidden="true">C</span>codexsidecar</a><span>A local-first companion for Codex workflows.</span><span className={`${base.prototypeLabel} ${styles.prototypeLabel}`}>INTERNAL PROTOTYPE</span></footer>
    </div>
  );
}
