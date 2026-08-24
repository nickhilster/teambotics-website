import type { Metadata } from "next";
import Link from "next/link";
import { PokoAdminChrome } from "@/components/poko/PokoAdminChrome";
import styles from "@/components/poko/poko-site.module.css";

export const metadata: Metadata = {
  title: "Controls",
  description: "Internal control placeholders for Poko website operations.",
  robots: { index: false, follow: false },
};

const internalLinks = [
  {
    href: "https://www.teambotics.app/admin/blog",
    title: "Blog Admin",
    body: "Manage site and content publishing flows already present in the Teambotics website app.",
  },
  {
    href: "https://www.teambotics.app/admin/chatbot",
    title: "Chatbot Admin",
    body: "Inspect the broader Teambotics chatbot configuration and operational publishing surfaces.",
  },
  {
    href: "https://www.teambotics.app/admin/theme",
    title: "Theme Admin",
    body: "Use the existing site theme dashboard when visual experimentation needs to happen at the host-site level.",
  },
  {
    href: "https://www.teambotics.app/admin/visitors",
    title: "Visitor Intelligence",
    body: "Review anonymous visitor journeys and traffic patterns for the broader site property.",
  },
] as const;

const plannedControls = [
  "Downloads and release links",
  "Implemented vs planned feature registry",
  "Steward rollout notes",
  "Launch checklist and CTA experiments",
];

export default function PokoAdminControlsPage() {
  return (
    <PokoAdminChrome
      title="Controls"
      description="Operator links and next-step control surfaces for the Poko website rollout."
    >
      <div className={styles.grid2}>
        <section className={styles.card}>
          <h3>Planned internal controls</h3>
          <ul>
            {plannedControls.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className={styles.card}>
          <h3>Current posture</h3>
          <p>Keep this surface lightweight until the public site stabilizes. Once the structure settles, these controls can move to markdown-backed or API-backed operator views instead of static placeholders.</p>
        </section>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Existing Teambotics admin tools</h2>
        <p className={styles.sectionIntro}>These live elsewhere in the host site already and are useful operator surfaces while Poko-specific controls are still growing in place.</p>
        <div className={styles.linkList}>
          {internalLinks.map((item) => (
            <Link key={item.href} href={item.href} className={styles.linkCard}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </Link>
          ))}
        </div>
      </section>
    </PokoAdminChrome>
  );
}
