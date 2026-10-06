import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

const pageUrl = "https://codexsidecar.teambotics.app/";

export const metadata: Metadata = {
  title: "CodexSidecar — Find your way back to the work",
  description:
    "CodexSidecar helps you find past Codex sessions, understand local context, and keep your Codex data organized with you in control.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CodexSidecar — Find your way back to the work",
    description:
      "A local-first companion for finding past Codex work, understanding context, and reviewing cleanup.",
    url: pageUrl,
    siteName: "CodexSidecar",
    type: "website",
    images: [{ url: "/codexsidecar/sidecar-home.png", alt: "CodexSidecar quick tasks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodexSidecar — Find your way back to the work",
    description:
      "A local-first companion for finding past Codex work, understanding context, and reviewing cleanup.",
    images: ["/codexsidecar/sidecar-home.png"],
  },
};

export default function CodexSidecarPage() {
  return (
    <main className={styles.site} id="top">
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="CodexSidecar home">
          <span className={styles.brandMark}>C</span>
          <span>
            codex<span className={styles.brandLight}>sidecar</span>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#in-control">Your data, your call</a>
          <a className={styles.navCta} href="#demo">
            See the app <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}><span />A local companion for Codex</div>
          <h1>Find your way back to the work.</h1>
          <p className={styles.heroIntro}>
            CodexSidecar helps you find past sessions, understand the context around your work, and keep your local Codex data organized.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.buttonPrimary} href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
            <a className={styles.textLink} href="#in-control">Built around your control <span aria-hidden="true">→</span></a>
          </div>
          <div className={styles.heroNote}><span className={styles.localMark}>⌂</span>Your Codex data stays on your computer.</div>
          <div className={styles.prototypeNote}>Currently an internal prototype.</div>
        </div>
        <figure className={`${styles.appShot} ${styles.heroShot}`} id="demo">
          <Image
            src="/codexsidecar/sidecar-home.png"
            alt="CodexSidecar Simple home with quick tasks for finding sessions, organizing work, reviewing memory, and checking cleanup suggestions"
            width={680}
            height={384}
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <figcaption><span className={styles.captionDot} />Start with a clear view of what you need.</figcaption>
        </figure>
      </section>

      <section className={styles.howSection} id="how-it-works">
        <div className={styles.sectionHeading}>
          <div className={styles.eyebrow}>A LITTLE MORE ORDER, EVERY DAY</div>
          <h2>One place for the things Codex leaves behind.</h2>
          <p>Pick a task and see the useful information without digging through folders by hand.</p>
        </div>
        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <span className={`${styles.featureIcon} ${styles.iconBlue}`}>⌕</span>
            <h3>Find past work</h3>
            <p>Search old Codex sessions and group related work, so it’s easier to continue where you left off.</p>
            <span className={styles.featureNumber}>01</span>
          </article>
          <article className={styles.featureCard}>
            <span className={`${styles.featureIcon} ${styles.iconGreen}`}>✳</span>
            <h3>See your context</h3>
            <p>Review local memories and settings, and see where each piece of information comes from.</p>
            <span className={styles.featureNumber}>02</span>
          </article>
          <article className={styles.featureCard}>
            <span className={`${styles.featureIcon} ${styles.iconAmber}`}>↶</span>
            <h3>Review before cleanup</h3>
            <p>See what may be old or temporary. You choose what to keep, move, or restore.</p>
            <span className={styles.featureNumber}>03</span>
          </article>
        </div>
      </section>

      <section className={styles.chatSection}>
        <div className={styles.chatCopy}>
          <div className={styles.eyebrow}>A CONVERSATION WITH ROOM TO WORK</div>
          <h2>Chat with Codex from your Sidecar workspace.</h2>
          <p>Start or resume a separate Codex conversation in one dedicated workspace. Keep the chat close to the tools that help you organize.</p>
          <div className={styles.chatDetail}>
            <span aria-hidden="true">↗</span>
            <div><strong>You decide what changes.</strong><small>Review file-change requests before allowing them.</small></div>
          </div>
          <p className={styles.capabilityNote}>This is its own Sidecar conversation. It doesn’t take over a chat already open in Codex.</p>
        </div>
        <figure className={`${styles.appShot} ${styles.chatShot}`}>
          <Image
            src="/codexsidecar/sidecar-chat.png"
            alt="CodexSidecar chat screen with a dedicated conversation area and message composer"
            width={900}
            height={768}
            sizes="(max-width: 900px) 100vw, 60vw"
          />
          <figcaption><span className={styles.captionDot} />A separate chat in a focused workspace.</figcaption>
        </figure>
      </section>

      <section className={styles.controlSection} id="in-control">
        <div className={styles.controlInner}>
          <div className={styles.controlCopy}>
            <div className={styles.eyebrow}>YOU STAY IN CONTROL</div>
            <h2>Helpful overview.<br />Human decisions.</h2>
            <p>Sidecar works alongside Codex’s existing data. It makes information easier to find and offers cleanup suggestions; it won’t quietly change or delete your files.</p>
          </div>
          <div className={styles.controlPoints}>
            <div><span className={styles.controlCheck}>✓</span><span><strong>Local by design</strong><small>Your Codex folder is read on your device.</small></span></div>
            <div><span className={styles.controlCheck}>✓</span><span><strong>Sources stay visible</strong><small>See where context comes from and what is still unknown.</small></span></div>
            <div><span className={styles.controlCheck}>✓</span><span><strong>Changes are yours</strong><small>Review actions first. Quarantined items can be restored.</small></span></div>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.closingMark}>C</div>
        <h2>More signal. Less searching.</h2>
        <p>CodexSidecar is being built and tested for everyday Codex work.</p>
        <a className={styles.buttonPrimary} href="#top">Back to the top <span aria-hidden="true">↑</span></a>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="https://www.teambotics.app" aria-label="Teambotics home">
          <span className={styles.brandMark}>C</span>
          <span>codex<span className={styles.brandLight}>sidecar</span></span>
        </a>
        <span>A local-first companion for Codex workflows.</span>
        <span className={styles.prototypeLabel}>INTERNAL PROTOTYPE</span>
      </footer>
    </main>
  );
}
