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
    body: "Hold downloads, feature registry, rollout notes, and other lightweight internal product controls in one place.",
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
    </PokoAdminChrome>
  );
}
