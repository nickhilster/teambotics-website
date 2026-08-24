import type { Metadata } from "next";
import { PokoAdminChrome } from "@/components/poko/PokoAdminChrome";
import styles from "@/components/poko/poko-site.module.css";

export const metadata: Metadata = {
  title: "Controls",
  description: "Internal control placeholders for Poko website operations.",
  robots: { index: false, follow: false },
};

export default function PokoAdminControlsPage() {
  return (
    <PokoAdminChrome
      title="Controls"
      description="Placeholder controls for downloads, feature registry, rollout notes, and internal content operations."
    >
      <div className={styles.grid2}>
        <section className={styles.card}>
          <h3>Suggested internal controls</h3>
          <ul>
            <li>Downloads and release links</li>
            <li>Implemented vs planned feature registry</li>
            <li>Steward rollout notes</li>
            <li>Launch checklist and CTA experiments</li>
          </ul>
        </section>
        <section className={styles.card}>
          <h3>Current posture</h3>
          <p>Keep this surface lightweight until the public site stabilizes. Once the structure settles, these controls can move to markdown-backed or API-backed operator views.</p>
        </section>
      </div>
    </PokoAdminChrome>
  );
}
