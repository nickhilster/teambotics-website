import type { Metadata } from "next";
import { PokoAdminChrome } from "@/components/poko/PokoAdminChrome";
import styles from "@/components/poko/poko-site.module.css";

export const metadata: Metadata = {
  title: "TrackerBuddy",
  description: "Internal TrackerBuddy-style operator page for Poko.",
  robots: { index: false, follow: false },
};

const threads = [
  "Website IA and product copy",
  "Steward public positioning",
  "Screenshots, GIFs, and launch visuals",
  "Subdomain routing and deploy verification",
];
const blockers = [
  "Need final decision on how much of the paused Boardy language remains public-facing.",
  "Need polished media assets if the public site should feel launch-ready rather than doc-ready.",
];
const followups = [
  "Turn admin placeholders into markdown-backed views.",
  "Link roadmap items to source docs and issue trackers.",
  "Decide whether admin stays inside this app or moves to a separate internal tool later.",
];

export default function PokoAdminTrackerBuddyPage() {
  return (
    <PokoAdminChrome
      title="TrackerBuddy"
      description="A markdown-first, operator-friendly tracker surface for active Poko website and product threads."
    >
      <div className={styles.grid3}>
        <section className={styles.card}>
          <h3>Active threads</h3>
          <ul>{threads.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className={styles.card}>
          <h3>Blockers</h3>
          <ul>{blockers.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className={styles.card}>
          <h3>Follow-ups</h3>
          <ul>{followups.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
    </PokoAdminChrome>
  );
}
