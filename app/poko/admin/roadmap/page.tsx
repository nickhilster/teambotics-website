import type { Metadata } from "next";
import { PokoAdminChrome } from "@/components/poko/PokoAdminChrome";
import styles from "@/components/poko/poko-site.module.css";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Internal Poko roadmap surface.",
  robots: { index: false, follow: false },
};

const now = [
  "Ship the Poko product site and keep the subdomain stable.",
  "Tighten public messaging around Steward foundations already implemented in the desktop app.",
  "Improve the product page with real media, stronger proof, and clearer downloads messaging.",
];
const next = [
  "Wire Steward preference toggles to more explicit public-facing behavior descriptions.",
  "Turn admin content into markdown-backed or data-backed operational views.",
  "Decide the first proper public download distribution story beyond a generic releases CTA.",
];
const later = [
  "Deeper cross-agent bridge stories and explain-the-run publishing surfaces.",
  "Stronger website analytics and product intelligence loops.",
  "Dedicated internal launch/ops workflows beyond lightweight website admin controls.",
];
const shipped = [
  "Poko product page, how-to page, and features page",
  "Soft-gated admin shell with roadmap, TrackerBuddy, and controls pages",
  "Distinct Poko-specific visual identity inside the Teambotics web property",
  "Subdomain routing from poko.teambotics.app to /poko",
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

      <section className={styles.section}>
        <div className={styles.grid2}>
          <article className={styles.card}>
            <h3>Shipped foundations</h3>
            <ul>
              {shipped.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className={styles.card}>
            <h3>Roadmap principle</h3>
            <p>Keep the public site honest and product-first: lead with what is already real, then show what is clearly next from the existing codebase and docs. Avoid drifting into speculative brand copy that the runtime cannot support yet.</p>
          </article>
        </div>
      </section>
    </PokoAdminChrome>
  );
}
