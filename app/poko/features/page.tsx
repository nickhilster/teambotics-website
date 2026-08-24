import type { Metadata } from "next";
import styles from "@/components/poko/poko-site.module.css";

const features = [
  ["Real-time agent state tracking", "Available now", "Poko reflects live agent state changes like thinking, working, waiting, notification, and completion."],
  ["Multi-agent session visibility", "Available now", "Poko can track more than one session at once and surface them through the desktop UI, HUD, and Dashboard."],
  ["Session Dashboard + HUD", "Available now", "The Dashboard gives fuller visibility while the HUD keeps compact live awareness close to the desktop character."],
  ["Themes and visual variants", "Available now", "Poko supports bundled themes and visual variants so the product can feel distinct without changing the runtime core."],
  ["Voice and audio surfaces", "Available now", "Poko includes configurable voice or audio behavior and packaged voice preset support."],
  ["Steward request and decision flow", "Available now", "Poko now includes the first local Steward loop: structured request handling, user decisions, and reviewable records."],
  ["Mission briefs, waiting reasons, replay, handoff", "Available now", "Incoming Steward requests and session activity can now produce briefings, explanations, and handoff-style summaries."],
  ["Merge readiness + worktree helpers", "Available now", "Poko includes early readiness checks and worktree or branch planning helpers designed around explicit review boundaries."],
  ["Local bridge APIs", "Available now", "Steward data can now be exposed through local-only routes for related tools and integrations."],
  ["Richer Steward presentation", "Coming next", "The current foundations are in place; richer desktop-native presentation and stronger policy wiring are the next layer."],
  ["Cross-agent bridge behavior", "Coming next", "The product direction is moving toward clearer context routing and safer multi-agent mediation across tools."],
  ["Internal/admin product surfaces", "Coming next", "Roadmaps, trackers, and internal control surfaces are a natural next layer for website and product operations."],
] as const;

export const metadata: Metadata = {
  title: "Features",
  description:
    "Implemented Poko features today, plus the next layer of Steward and multi-agent capabilities already taking shape in the repo.",
  alternates: {
    canonical: "https://poko.teambotics.app/features",
  },
};

export default function PokoFeaturesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <p className={styles.kicker}>Current product surface</p>
        <h1 className={styles.pageTitle}>Features</h1>
        <p className={styles.sectionIntro}>
          Poko is a desktop-native product for coding-agent visibility, coordination, and trust-aware handoffs. This page separates what is already available now from what is clearly taking shape next in the repo.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Area</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {features.map(([area, status, description]) => (
                <tr key={area}>
                  <td>{area}</td>
                  <td>
                    <span className={status === "Available now" ? styles.statusLive : styles.statusNext}>{status}</span>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.grid3} style={{ marginTop: "1.5rem" }}>
          <article className={styles.card}>
            <h3>Visibility</h3>
            <p>Know what your agents are doing without opening every tool.</p>
          </article>
          <article className={styles.card}>
            <h3>Trust</h3>
            <p>Make approvals, handoffs, and context-sharing boundaries easier to understand.</p>
          </article>
          <article className={styles.card}>
            <h3>Presence</h3>
            <p>Keep a desktop-native companion that feels alive, informative, and useful.</p>
          </article>
        </div>

        <div className={styles.callout} style={{ marginTop: "1.5rem" }}>
          <h3>What Poko is not</h3>
          <ul>
            <li>not a fake user</li>
            <li>not a silent auto-approval layer</li>
            <li>not a replacement for your existing coding agents</li>
            <li>not a generic chatbot shell</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
