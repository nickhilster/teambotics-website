import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";
import { bossTheme as t } from "./_lib/theme";

export const metadata: Metadata = {
  title: "BOSS",
  description:
    "BOSS is a globally-installed MCP server that gives any IDE's AI model a structured approval gate before touching your repo — nothing is written until you say so.",
  openGraph: {
    title: `BOSS | ${siteConfig.name}`,
    description:
      "A human approval gate between your AI coding assistant and your repository. No API keys, no extra model cost.",
    url: `${siteConfig.url}/BOSS`,
  },
};

const steps = [
  { n: "01", title: "Install BOSS globally", body: "npm install -g boss-md — pulls the CLI and the pre-built Console UI, no other setup." },
  { n: "02", title: "Point your IDE at it", body: "Add BOSS as an MCP server in Claude Code, Codex, or Cursor. It runs on stdio — no ports, no keys." },
  { n: "03", title: "Scaffold your repo", body: "boss init asks what tools you use, then writes /boss/ governance docs and an agent file tailored to your setup." },
  { n: "04", title: "Ask for an audit", body: "Tell your assistant to “run a BOSS audit.” It scans, proposes changes, and queues every one — it cannot write yet." },
  { n: "05", title: "Review, then decide", body: "boss console opens the queue in your browser. Approve, reject, or defer — line by line." },
] as const;

const tools = [
  { name: "boss_scan_repo", body: "Reads every trusted file in the repo and returns structured context." },
  { name: "boss_add_approval_item", body: "Queues one proposed change — content, risk level, rollback plan — for human review." },
  { name: "boss_get_approval_queue", body: "Returns the full queue with current status for each item." },
  { name: "boss_open_console", body: "Starts the local Console and opens it in your browser." },
  { name: "boss_apply_approved", body: "Writes every approved item to disk. Skips everything else." },
  { name: "boss_log_decision", body: "Appends a permanent record to boss/decision-log.md." },
] as const;

const ecosystem = [
  { role: "Drift detection", name: "RepoSteward", body: "Watches UPDATE.md for stale docs and scripts, feeds findings into the queue." },
  { role: "Security scan", name: "ryft", body: "Checks agent instruction files for prompt injection before BOSS proposes anything." },
  { role: "Model scoring", name: "llm-loadout", body: "Scores models by task type to populate model-selection.md with a real recommendation." },
  { role: "Portfolio view", name: "Project-OPS", body: "Reads the PROJECT_STATUS.md BOSS writes and rolls it into a dashboard across repos." },
] as const;

function FlowDiagram() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 920 260"
        role="img"
        aria-label="Flow diagram: the AI scans the repo, proposes changes into a queue, a human reviews each item and either approves it, writing the file and logging the decision, or rejects it, which discards the change with nothing written."
        className="block h-auto w-full"
        style={{ color: t.textPrimary }}
      >
        <defs>
          <marker id="boss-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>

        <rect x="30" y="40" width="130" height="60" rx="2" fill="none" stroke="currentColor" />
        <text x="95" y="65" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">boss_scan_repo</text>
        <text x="95" y="82" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.65">reads trusted files</text>

        <line x1="160" y1="70" x2="280" y2="70" stroke="currentColor" markerEnd="url(#boss-arrow)" />
        <text x="220" y="60" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">proposes changes</text>

        <rect x="280" y="40" width="150" height="60" rx="2" fill="none" stroke="currentColor" />
        <text x="355" y="65" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">approval queue</text>
        <text x="355" y="82" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.65">status: pending</text>

        <line x1="430" y1="70" x2="560" y2="70" stroke="currentColor" markerEnd="url(#boss-arrow)" />
        <text x="495" y="60" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">held for review</text>

        <rect x="560" y="40" width="150" height="60" rx="2" fill="none" stroke={t.accent} strokeWidth="1.5" />
        <text x="635" y="65" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">you, in the Console</text>
        <text x="635" y="82" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.65">approve / reject / defer</text>

        <line x1="635" y1="100" x2="635" y2="150" stroke="currentColor" />
        <line x1="635" y1="150" x2="770" y2="150" stroke="currentColor" markerEnd="url(#boss-arrow)" />
        <text x="700" y="140" textAnchor="middle" fontSize="11" fill={t.good} fillOpacity="0.9">approves</text>

        <rect x="770" y="120" width="120" height="60" rx="2" fill="none" stroke="currentColor" />
        <text x="830" y="145" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">writer</text>
        <text x="830" y="162" textAnchor="middle" fontSize="11" fill={t.good} fillOpacity="0.9">writes to disk</text>

        <line x1="560" y1="100" x2="560" y2="210" stroke="currentColor" />
        <line x1="560" y1="210" x2="300" y2="210" stroke="currentColor" markerEnd="url(#boss-arrow)" />
        <text x="430" y="200" textAnchor="middle" fontSize="11" fill={t.risk} fillOpacity="0.9">rejects</text>

        <rect x="180" y="180" width="120" height="60" rx="2" fill="none" stroke="currentColor" strokeDasharray="3 3" />
        <text x="240" y="205" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">discarded</text>
        <text x="240" y="222" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.65">nothing written</text>

        <line x1="830" y1="180" x2="830" y2="210" stroke="currentColor" />
        <line x1="830" y1="210" x2="700" y2="210" stroke="currentColor" markerEnd="url(#boss-arrow)" />
        <text x="765" y="200" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">logs</text>
        <rect x="560" y="180" width="140" height="60" rx="2" fill="none" stroke="currentColor" />
        <text x="630" y="205" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">decision-log.md</text>
        <text x="630" y="222" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.65">permanent record</text>
      </svg>
      <figcaption className="mt-3.5 max-w-[60ch] text-[13px]" style={{ color: t.textMuted }}>
        Every proposal is either applied and logged, or discarded with nothing written — there is no third path.
      </figcaption>
    </figure>
  );
}

export default function BossPage() {
  return (
    <div style={{ background: t.background, color: t.textPrimary }}>
      <section className="pt-[calc(var(--site-header-height)+4rem)] pb-16 sm:pb-20">
        <Container>
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ background: t.surface, borderColor: t.border, color: t.accentInk }}
          >
            A human approval gate for AI coding agents
          </div>

          <h1 className="max-w-[13ch] text-5xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            Nothing touches your repo until you say so.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 sm:text-xl" style={{ color: t.textSecondary }}>
            BOSS sits between your IDE&apos;s AI assistant and your files. The AI proposes every
            change — BOSS holds it in a queue until you approve it. No API keys, no extra model
            cost: your assistant does the reasoning, BOSS enforces the rule.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button button--primary" href="https://www.npmjs.com/package/boss-md" rel="noopener noreferrer" target="_blank">
              <span>npm install -g boss-md</span>
            </a>
            <Link className="button button--ghost" href="/BOSS/guide">
              <span>Read the guide</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: t.borderSubtle }}>
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: t.textMuted }}>
            How it works
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            One gate, every write.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: t.textSecondary }}>
            Every action your AI assistant wants to take passes through the same four-stage gate
            before a single byte reaches disk.
          </p>

          <div className="mt-10 rounded-2xl border p-6 sm:p-8" style={{ borderColor: t.border, background: t.surface }}>
            <FlowDiagram />
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: t.borderSubtle }}>
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: t.textMuted }}>
            Setup
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Five steps, once.</h2>

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {steps.map((step) => (
              <article key={step.n} className="rounded-2xl border p-5" style={{ background: t.surface, borderColor: t.border }}>
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: t.accentInk }}>{step.n}</div>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: t.textSecondary }}>{step.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: t.borderSubtle }}>
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: t.textMuted }}>
            MCP tools
          </p>
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            What the AI can actually call.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8" style={{ color: t.textSecondary }}>
            Six tools, all it needs — and all it gets. There is no seventh tool that writes a
            file directly.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border" style={{ borderColor: t.border }}>
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ borderColor: t.border, color: t.textMuted, background: t.surface }}>Tool</th>
                  <th className="border-b px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ borderColor: t.border, color: t.textMuted, background: t.surface }}>What it does</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.name}>
                    <td className="border-b px-5 py-3.5 align-top font-mono text-[13px]" style={{ borderColor: t.borderSubtle, color: t.textPrimary }}>{tool.name}</td>
                    <td className="border-b px-5 py-3.5 align-top" style={{ borderColor: t.borderSubtle, color: t.textSecondary }}>{tool.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: t.borderSubtle }}>
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: t.textMuted }}>
            Ecosystem
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            BOSS is the hub. These are optional.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8" style={{ color: t.textSecondary }}>
            None of these are required — <code className="rounded px-1.5 py-0.5 font-mono text-[0.86em]" style={{ background: t.surface2 }}>boss init</code> asks, and works fine if you say no to all four.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.map((item) => (
              <article key={item.name} className="rounded-2xl border p-5" style={{ background: t.surface, borderColor: t.border }}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: t.accentInk }}>{item.role}</div>
                <h3 className="mt-2 text-base font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: t.borderSubtle }}>
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border p-8" style={{ background: t.surface, borderColor: t.border }}>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">Ready to try it?</h2>
              <p className="mt-2 text-sm" style={{ color: t.textSecondary }}>v0.2.1 · MIT license</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="button button--primary" href="https://www.npmjs.com/package/boss-md" rel="noopener noreferrer" target="_blank">
                <span>npm install -g boss-md</span>
              </a>
              <Link className="button button--ghost" href="/BOSS/guide">
                <span>Read the guide</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
