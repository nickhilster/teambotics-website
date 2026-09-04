import type { Metadata } from "next";
import styles from "@/components/poko/poko-site.module.css";

const steps = [
  {
    title: "Install Poko",
    body: "Download and install it like a normal desktop app. Windows x64 is the current direct-download release; Windows ARM64, macOS, and Linux builds are on the way.",
  },
  {
    title: "Launch Poko",
    body: "When Poko starts, it runs as a desktop-native companion instead of a traditional main-window app. Its job is to stay close to your work, not replace it.",
  },
  {
    title: "Connect an agent",
    body: "Open Settings, go to Agents, install or enable the integration you want, then resume work in that agent and watch Poko reflect the session state live.",
  },
  {
    title: "Understand what Poko is showing",
    body: "Poko’s desktop presence changes based on what your agent is doing. Thinking means planning, working means active tool use, notification or attention means human awareness is needed, idle or done means the current task has settled, stale flags a session gone quiet whose process is still alive, and crashed flags one whose process died — it clears itself automatically a couple of minutes later.",
  },
  {
    title: "Use the Dashboard and HUD",
    body: "Use the Dashboard for fuller session visibility: an expandable Context Brief per session (last prompt, latest output, changed files, next action), recent activity, focus actions, and explain-the-run flows. Use the HUD for compact live awareness beside the desktop character.",
  },
  {
    title: "Use Steward features when they appear",
    body: "Depending on the workflow, you may see mission briefs, pending Steward decisions, waiting reasons, handoff summaries, replay surfaces, and readiness-style reports. Turn on AI-powered summaries in Settings to layer an AI-written brief on top of the built-in explain-the-run report.",
  },
  {
    title: "Customize the experience",
    body: "You can adjust theme and variants, voice behavior, animation behavior, agent-specific settings, and session visibility preferences to make Poko feel like part of your own setup.",
  },
  {
    title: "Use advanced surfaces only when needed",
    body: "Poko also includes broader coordination surfaces like a remote-SSH session bridge, a mobile companion, Telegram-based remote approval, diagnostics, and Steward or replay tooling. Start with the live desktop experience first and add more only when the workflow calls for it.",
  },
  {
    title: "If something looks wrong",
    body: "Check whether the integration is installed and enabled, open the Dashboard to inspect session state, and use Doctor-style diagnostics if available. Poko is designed to make these flows easier to debug without forcing you to guess where the signal broke.",
  },
] as const;

export const metadata: Metadata = {
  title: "How to Use",
  description:
    "How to install Poko, connect your first coding agent, understand live desktop states, and use the Dashboard, HUD, and Steward surfaces.",
  alternates: {
    canonical: "https://poko.teambotics.app/how-to-use",
  },
};

export default function PokoHowToUsePage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <p className={styles.kicker}>Getting started</p>
        <h1 className={styles.pageTitle}>How to Use Poko</h1>
        <p className={styles.sectionIntro}>
          Poko is easiest to understand as a local desktop companion for coding-agent workflows. Install it, connect the agent tools you already use, and let it surface what’s happening live.
        </p>
        <div className={styles.stepList}>
          {steps.map((step, index) => (
            <article key={step.title} className={styles.card}>
              <div className={styles.stepNum}>{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.callout} style={{ marginTop: "1.25rem" }}>
          <h3>Best way to start</h3>
          <p>Start small: install Poko, connect one agent, and use the desktop presence plus Dashboard first. Everything else builds from that foundation.</p>
        </div>
      </section>
    </div>
  );
}
