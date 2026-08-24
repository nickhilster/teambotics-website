import type { Metadata } from "next";
import { PokoAdminChrome } from "@/components/poko/PokoAdminChrome";
import styles from "@/components/poko/poko-site.module.css";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Internal Poko roadmap surface.",
  robots: { index: false, follow: false },
};

const now = [
  "Ship the Poko product site and working subdomain.",
  "Tighten public messaging around Steward foundations already implemented in the desktop app.",
  "Decide which download/install CTA becomes the primary path for new visitors.",
];
const next = [
  "Add richer screenshots, short demos, and clearer product proof to the site.",
  "Wire Steward preference toggles to more explicit public-facing behavior descriptions.",
  "Expand admin content into markdown-backed operational views.",
];
const later = [
  "Deeper cross-agent bridge stories and explain-the-run publishing surfaces.",
  "Stronger website analytics and product intelligence loops.",
  "Dedicated internal launch/ops workflows beyond simple website admin controls.",
];

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

export default function PokoAdminRoadmapPage() {
  return (
    <PokoAdminChrome
      title="Poko Roadmap"
      description="Working product and launch sequencing for the Poko website and related product surfaces."
    >
      <div className={styles.grid3}>
        <Column title="Now" items={now} />
        <Column title="Next" items={next} />
        <Column title="Later" items={later} />
      </div>
    </PokoAdminChrome>
  );
}
