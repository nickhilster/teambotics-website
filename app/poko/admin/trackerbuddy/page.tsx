import type { Metadata } from "next";
import styles from "@/components/poko/poko-site.module.css";
import { PokoAdminChrome } from "@/components/poko/PokoAdminChrome";

export const metadata: Metadata = {
  title: "TrackerBuddy",
  description: "Internal TrackerBuddy-style operator page for Poko.",
  robots: { index: false, follow: false },
};

const threads = [
  "Website IA and public product copy",
  "Steward public positioning and boundary language",
  "Screenshots, GIFs, and launch visuals",
  "Subdomain routing and deploy verification",
];
const blockers = [
  "Need final decision on how much paused Boardy language remains public-facing.",
  "Need a stronger distribution story if the product should advertise direct per-platform downloads instead of a generic releases path.",
];
const decisions = [
  "Keep the Poko website separate in identity from the broader Teambotics portfolio look.",
  "Use the Teambotics website app and subdomain routing rather than a separate marketing deployment.",
  "Treat admin as internal preview tooling, not as hardened auth or customer-facing product.",
];
const followups = [
  "Turn these admin placeholders into markdown-backed views.",
  "Link roadmap items and tracker threads to source docs and issue trackers.",
  "Decide whether admin stays inside this app or later moves to a dedicated internal tool.",
];

export default function PokoAdminTrackerBuddyPage() {
  return (
    <PokoAdminChrome
      title="TrackerBuddy"
      description="A markdown-first, operator-friendly tracker surface for active Poko website and product threads."
    >
      <div className={styles.grid2}>
        <section className={styles.card}>
          <h3>Active threads</h3>
          <ul>{threads.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className={styles.card}>
          <h3>Blockers</h3>
          <ul>{blockers.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>

      <section className={styles.section}>
        <div className={styles.grid2}>
          <section className={styles.card}>
            <h3>Decisions</h3>
            <ul>{decisions.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className={styles.card}>
            <h3>Follow-ups</h3>
            <ul>{followups.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </section>
    </PokoAdminChrome>
  );
}
