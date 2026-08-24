import type { Metadata } from "next";
import Link from "next/link";
import { PokoAdminChrome } from "@/components/poko/PokoAdminChrome";
import styles from "@/components/poko/poko-site.module.css";

export const metadata: Metadata = {
  title: "Admin",
  description: "Internal Poko admin overview for roadmap, TrackerBuddy, and related control surfaces.",
  robots: { index: false, follow: false },
};

const cards = [
  {
    href: "/admin/roadmap",
    title: "Roadmap",
    body: "Track now, next, and later work across product, runtime, Steward, integrations, and launch surfaces.",
  },
  {
    href: "/admin/trackerbuddy",
    title: "TrackerBuddy",
    body: "Keep internal threads, blockers, decisions, follow-ups, and linked artifacts visible in one operator-friendly view.",
  },
  {
    href: "/admin/controls",
    title: "Controls",
    body: "Hold downloads, feature registry, rollout notes, and lightweight internal links in one place.",
  },
] as const;

const sourceLinks = [
  {
    href: "https://github.com/Teambotics-BackBurner/poko/blob/main/docs/project/poko-chief-of-staff-character.md",
    title: "Chief of staff character spec",
    body: "Current product framing for Poko as the active line and local coordination layer.",
  },
  {
    href: "https://github.com/Teambotics-BackBurner/poko/blob/main/docs/project/boardy-steward-first-spec.md",
    title: "Steward first spec",
    body: "The best source for trust-loop messaging, boundaries, and why the Steward surface exists.",
  },
  {
    href: "https://github.com/Teambotics-BackBurner/poko/blob/main/docs/project/release-process.md",
    title: "Release process",
    body: "Reference for packaging posture, platform notes, and how download messaging should stay grounded.",
  },
] as const;

export default function PokoAdminPage() {
  return (
    <PokoAdminChrome
      title="Poko Admin"
      description="Internal operator surface for the Poko website and product rollout."
    >
      <section className={styles.metricGrid}>
        <article className={styles.metricCard}><span>Public pages</span><strong>3</strong></article>
        <article className={styles.metricCard}><span>Admin routes</span><strong>3</strong></article>
        <article className={styles.metricCard}><span>Visibility model</span><strong>Soft-gated</strong></article>
      </section>

      <section className={styles.linkList}>
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className={styles.linkCard}>
            <strong>{card.title}</strong>
            <span>{card.body}</span>
          </Link>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.grid2}>
          <article className={styles.card}>
            <h3>Current rollout posture</h3>
            <ul>
              <li>Poko subdomain is live and routed through the Teambotics website deployment.</li>
              <li>Public product, how-to, and features pages are published.</li>
              <li>Admin surfaces are gated and intentionally marked as internal preview tools.</li>
            </ul>
          </article>
          <article className={styles.card}>
            <h3>Operator checks</h3>
            <ul>
              <li>Keep public copy aligned to implemented repo reality.</li>
              <li>Do not overstate Steward capabilities beyond what is already shipped.</li>
              <li>Prefer source-backed roadmap and tracker content over ad hoc internal prose.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Source docs</h2>
        <p className={styles.sectionIntro}>These are the product and implementation documents that should continue shaping the Poko website as more proof, visuals, and admin functionality are added.</p>
        <div className={styles.linkList}>
          {sourceLinks.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </a>
          ))}
        </div>
      </section>
    </PokoAdminChrome>
  );
}
