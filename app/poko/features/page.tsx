import type { Metadata } from "next";
import styles from "@/components/poko/poko-site.module.css";

const features = [
  ["Real-time agent state tracking", "Available now", "Poko reflects live agent state changes: thinking, working, waiting/notification, done, stale, and crashed — across every supported agent."],
  ["18 supported coding agents", "Available now", "Claude Code, Codex CLI, Copilot CLI, Gemini CLI, Antigravity CLI, Cursor Agent, CodeBuddy, Kiro CLI, Kimi Code CLI, Qwen Code, CodeWhale, opencode, Pi, OpenClaw, Hermes Agent, Qoder, QoderWork, and Reasonix, each with its own state-only or approval-aware integration."],
  ["Multi-agent session visibility", "Available now", "Poko tracks more than one session at once and surfaces them through the desktop UI, Session HUD, and Dashboard."],
  ["Session Context Brief", "Available now", "Every session card can expand into a resumable brief — last prompt, latest output, changed files, warnings, permission context, and a suggested next action — one click away, no scrollback required."],
  ["Session health: stale & crashed", "Available now", "Sessions now distinguish Stale (idle, but its process is still alive) from Crashed (agent or terminal process confirmed dead, auto-removed after a short grace window) — a forgotten session no longer looks identical to a dead one."],
  ["Cross-device session bridge", "Available now", "A remote-SSH reverse tunnel merges a paired machine's sessions into your Dashboard with live per-host connection status; a mobile companion (PWA) and Telegram-based remote approval extend visibility and decisions off the desktop."],
  ["AI-powered session summaries", "Available now", "Point Poko at OpenAI, Ollama, LM Studio, or any OpenAI-compatible endpoint for an AI-written resume brief layered on top of the built-in rule-based \"Explain run\" report. Off by default, opt-in only."],
  ["Session Dashboard + HUD", "Available now", "The Dashboard gives fuller visibility while the HUD keeps compact live awareness close to the desktop character."],
  ["Steward request and decision flow", "Available now", "The local Steward loop: structured request handling, user decisions, and reviewable records for agent-originated asks."],
  ["Mission briefs, waiting reasons, replay, handoff", "Available now", "Incoming Steward requests and session activity produce briefings, plain-language waiting reasons, and handoff-style summaries."],
  ["Merge readiness + worktree helpers", "Available now", "Early readiness checks and worktree or branch planning helpers designed around explicit review boundaries."],
  ["Local bridge APIs", "Available now", "Steward data is exposed through local-only routes for related tools and integrations."],
  ["Voice and audio", "Available now", "Configurable voice provider — a custom endpoint, an OpenAI-compatible service, or a fully local model — plus packaged voice presets and local text-to-speech."],
  ["Themes and visual variants", "Available now", "Bundled themes and visual variants, plus user themes, so the product can feel distinct without changing the runtime core."],
  ["Localized UI", "Available now", "English, Chinese, Korean, and Japanese across the Dashboard, Settings, and Session HUD."],
  ["Deeper Steward policy wiring", "Coming next", "Stronger policy control over what Steward can decide on its own versus what always comes back to you."],
  ["Cross-agent bridge behavior", "Coming next", "Clearer context routing and safer multi-agent mediation across tools, building on today's per-agent integrations."],
  ["Configurable session health windows", "Coming next", "Today's stale/crash timing uses fixed defaults; exposing them in Settings is a natural next step."],
  ["Internal/admin product surfaces", "Coming next", "Roadmaps, trackers, and internal control surfaces are a natural next layer for website and product operations."],
] as const;

export const metadata: Metadata = {
  title: "Features",
  description:
    "What Poko does today: real-time state across 18 coding agents, session context briefs, stale/crashed session health, cross-device session bridging, and opt-in AI summaries — plus what's coming next.",
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
          Poko is a desktop-native product for coding-agent visibility, coordination, and trust-aware handoffs, watching 18 supported agents across a live Dashboard, a compact Session HUD, and a cross-device bridge. This page separates what is already available now from what is clearly taking shape next in the repo.
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
