import type { Metadata } from "next";
import Link from "next/link";
import { Check, Download, FolderOpen, Search, Shield, Wifi } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "MDownManager",
  description:
    "MDownManager helps teams turn markdown-heavy documentation into a searchable, structured knowledge layer that supports faster work, cleaner handoffs, and better AI-assisted workflows.",
  openGraph: {
    title: `MDownManager | ${siteConfig.name}`,
    description:
      "A Teambotics product for teams that need markdown documentation to be easier to search, organize, reuse, and operationalize.",
    url: `${siteConfig.url}/MdownManager`,
  },
};

const DOWNLOAD_VERSION = "0.3.3";
const DOWNLOAD_BASE = `https://github.com/nickhilster/MDownManager-releases/releases/download/v${DOWNLOAD_VERSION}`;

const pageTheme = {
  background: "#0f1117",
  surface: "#1a1d27",
  surface2: "#22263a",
  border: "#2e3347",
  borderSubtle: "#1e2235",
  textPrimary: "#e8eaf0",
  textSecondary: "#8b91a8",
  textMuted: "#555d78",
  accent: "#0b3a82",
  accentHover: "#1a52b5",
  accentBg: "rgba(11, 58, 130, 0.12)",
  riskLow: "#22c55e",
  riskMedium: "#f59e0b",
} as const;

const pricingTiers = [
  {
    name: "Free",
    price: null,
    priceNote: "No credit card required",
    highlight: false,
    features: [
      "1 vault",
      "Full-text search",
      "Security scanner",
      "Explorer & categories",
      "Local AI (Ollama)",
    ],
    cta: {
      label: "Download for Windows",
      href: `${DOWNLOAD_BASE}/MDownManager_${DOWNLOAD_VERSION}_x64_en-US.msi`,
      icon: true,
    },
  },
  {
    name: "Individual",
    price: "$20",
    priceNote: "per year",
    highlight: true,
    features: [
      "Unlimited vaults",
      "Everything in Free",
      "Priority support",
      "All future updates",
    ],
    cta: {
      label: "Buy Individual",
      href: "https://teambotics.lemonsqueezy.com/buy/individual",
      icon: false,
    },
  },
  {
    name: "Commercial",
    price: "$149",
    priceNote: "per year · up to 10 seats",
    highlight: false,
    features: [
      "Unlimited vaults",
      "Everything in Free",
      "10 seat license",
      "Commercial use rights",
      "Priority support",
    ],
    cta: {
      label: "Buy Commercial",
      href: "https://teambotics.lemonsqueezy.com/buy/commercial",
      icon: false,
    },
  },
  {
    name: "Non-profit",
    price: "Free",
    priceNote: "on application",
    highlight: false,
    features: [
      "Unlimited vaults",
      "Everything in Free",
      "Up to 10 seats",
      "Commercial license terms",
    ],
    cta: {
      label: "Apply for access",
      href: "/nonprofit-application",
      icon: false,
    },
  },
] as const;

const productSurfaces = [
  {
    title: "Vault",
    body: "Index markdown folders recursively, keep the working set local, and make scattered docs easier to search and reuse.",
    stat: "Markdown collections",
    icon: FolderOpen,
  },
  {
    title: "Scanner",
    body: "Catch secrets, credentials, and PII with a security layer built for documentation-heavy workflows.",
    stat: "14+ rules",
    icon: Shield,
  },
  {
    title: "Search + local AI",
    body: "Use keyword search, semantic retrieval, summaries, and local HTTP endpoints to support AI-assisted work without losing context control.",
    stat: "Ollama-ready",
    icon: Search,
  },
] as const;

const workflow = [
  {
    step: "01",
    title: "Add a vault",
    body: "Point MDownManager at an existing markdown folder or import a public GitHub repo directly into a local vault.",
  },
  {
    step: "02",
    title: "Structure the knowledge",
    body: "Browse with explorer, categories, file detail panels, and a tighter operating layer instead of raw folder sprawl.",
  },
  {
    step: "03",
    title: "Search and inspect",
    body: "Use keyword or semantic search, review file risk, and retrieve the right context faster when you need it.",
  },
  {
    step: "04",
    title: "Support AI workflows",
    body: "Feed a cleaner documentation layer into local AI, summaries, and downstream automation with better continuity.",
  },
] as const;

function AppChromeMock() {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        background: pageTheme.surface,
        borderColor: pageTheme.border,
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: pageTheme.borderSubtle, background: pageTheme.surface }}
      >
        <div className="text-sm font-semibold tracking-wide" style={{ color: pageTheme.textPrimary }}>
          MDownManager
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: pageTheme.textSecondary }}>
          <div
            className="inline-flex items-center gap-1 rounded px-2 py-1"
            style={{ background: pageTheme.surface2 }}
          >
            <span>S</span>
            <span>M</span>
            <span>L</span>
          </div>
          <div className="inline-flex items-center gap-1">
            <Wifi size={12} style={{ color: pageTheme.accentHover }} />
            <span>Ollama</span>
          </div>
        </div>
      </div>

      <div className="grid min-h-[360px] grid-cols-[72px_1fr]">
        <div
          className="border-r px-4 py-5"
          style={{ borderColor: pageTheme.borderSubtle, background: "#161924" }}
        >
          <div className="mb-5 h-8 w-8 rounded" style={{ background: pageTheme.accentBg, border: `1px solid ${pageTheme.border}` }} />
          <div className="space-y-3">
            {[
              { label: "V", active: true },
              { label: "S", active: false },
              { label: "C", active: false },
              { label: "E", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex h-9 w-9 items-center justify-center rounded text-xs font-semibold"
                style={{
                  background: item.active ? pageTheme.accentBg : "transparent",
                  border: `1px solid ${item.active ? pageTheme.accent : pageTheme.borderSubtle}`,
                  color: item.active ? pageTheme.accentHover : pageTheme.textMuted,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5" style={{ background: pageTheme.background }}>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: pageTheme.textSecondary }}>
            <span className="rounded px-2 py-1" style={{ background: pageTheme.surface2 }}>Vault</span>
            <span className="rounded px-2 py-1" style={{ background: pageTheme.surface2 }}>Scanner</span>
            <span className="rounded px-2 py-1" style={{ background: pageTheme.surface2 }}>Categories</span>
            <span className="rounded px-2 py-1" style={{ background: pageTheme.surface2 }}>Explorer</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: pageTheme.border, background: pageTheme.surface }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: pageTheme.accentHover }}>
                    Active vault
                  </div>
                  <div className="mt-1 text-base font-semibold" style={{ color: pageTheme.textPrimary }}>
                    ops-handbook
                  </div>
                </div>
                <div className="rounded px-2 py-1 text-xs" style={{ background: pageTheme.accentBg, color: pageTheme.accentHover }}>
                  semantic
                </div>
              </div>
              <div className="space-y-2">
                {[
                  ["incident-playbook.md", "LOW"],
                  ["vendor-rotation.md", "LOW"],
                  ["handoff-checklist.md", "MED"],
                  ["credentials-audit.md", "HIGH"],
                ].map(([name, risk]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                    style={{ borderColor: pageTheme.borderSubtle, background: "#151923" }}
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ color: pageTheme.textPrimary }}>
                        {name}
                      </div>
                      <div className="text-xs" style={{ color: pageTheme.textSecondary }}>
                        markdown · indexed · searchable
                      </div>
                    </div>
                    <div
                      className="rounded px-2 py-1 text-[11px] font-semibold"
                      style={{
                        background: risk === "LOW" ? "rgba(34,197,94,0.12)" : risk === "MED" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
                        color: risk === "LOW" ? pageTheme.riskLow : risk === "MED" ? pageTheme.riskMedium : "#ef4444",
                      }}
                    >
                      {risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: pageTheme.border, background: pageTheme.surface }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: pageTheme.accentHover }}>
                  Scanner
                </div>
                <div className="mt-2 text-lg font-semibold" style={{ color: pageTheme.textPrimary }}>
                  Security signals inline
                </div>
                <div className="mt-3 space-y-2 text-sm" style={{ color: pageTheme.textSecondary }}>
                  <div className="flex items-center justify-between rounded px-3 py-2" style={{ background: pageTheme.surface2 }}>
                    <span>Secrets</span>
                    <span style={{ color: pageTheme.riskMedium }}>3 flagged</span>
                  </div>
                  <div className="flex items-center justify-between rounded px-3 py-2" style={{ background: pageTheme.surface2 }}>
                    <span>PII</span>
                    <span style={{ color: pageTheme.riskLow }}>clear</span>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl border p-4"
                style={{ borderColor: pageTheme.border, background: pageTheme.surface }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: pageTheme.accentHover }}>
                  Retrieval
                </div>
                <div className="mt-2 text-lg font-semibold" style={{ color: pageTheme.textPrimary }}>
                  Local AI-friendly context
                </div>
                <p className="mt-2 text-sm leading-6" style={{ color: pageTheme.textSecondary }}>
                  Semantic search, summaries, and a local HTTP API make the documentation layer more usable for IDE agents and internal workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MdownManagerPage() {
  return (
    <div style={{ background: pageTheme.background, color: pageTheme.textPrimary }}>
      <section className="pt-[calc(var(--site-header-height)+4rem)] pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center xl:gap-14">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{
                  background: pageTheme.surface,
                  borderColor: pageTheme.border,
                  color: pageTheme.accentHover,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                }}
              >
                <span>📚</span>
                Document operations · Markdown knowledge · AI-ready workflows
              </div>

              <h1 className="mt-6 text-5xl font-semibold tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                MDownManager
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 sm:text-xl" style={{ color: pageTheme.textSecondary }}>
                MDownManager helps teams turn markdown-heavy documentation into a
                structured knowledge layer that is easier to search, easier to reuse,
                and better suited for local AI-assisted workflows.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a className="button button--primary" href={`${DOWNLOAD_BASE}/MDownManager_${DOWNLOAD_VERSION}_x64_en-US.msi`}>
                  <Download size={16} />
                  <span>Download for Windows</span>
                </a>
                <a className="button button--ghost" href="https://github.com/nickhilster/MDownManager" rel="noopener noreferrer" target="_blank">
                  <span>View repository</span>
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Local-first knowledge base",
                  "Security scanning built in",
                  "Ollama + local API ready",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border px-4 py-3 text-sm leading-6"
                    style={{
                      background: pageTheme.surface,
                      borderColor: pageTheme.border,
                      color: pageTheme.textSecondary,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <AppChromeMock />
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: pageTheme.borderSubtle }}>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: pageTheme.textMuted }}>
              Core workflow
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              From scattered markdown to operationally useful knowledge
            </h2>
            <p className="mt-5 text-base leading-8 sm:text-lg" style={{ color: pageTheme.textSecondary }}>
              MDownManager gives you a compact desktop workspace built around vaults,
              scanner feedback, categories, explorer panels, and local AI support —
              so your documentation stays structured, searchable, and ready to use.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border p-5"
                style={{ background: pageTheme.surface, borderColor: pageTheme.border }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: pageTheme.accentHover }}>
                  {item.step}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: pageTheme.textSecondary }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: pageTheme.borderSubtle }}>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: pageTheme.textMuted }}>
              Product surfaces
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Search, secure, and operationalize your docs
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {productSurfaces.map((surface) => {
              const Icon = surface.icon;
              return (
                <article
                  key={surface.title}
                  className="rounded-2xl border p-6"
                  style={{ background: pageTheme.surface, borderColor: pageTheme.border }}
                >
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: pageTheme.accentBg, color: pageTheme.accentHover }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: pageTheme.textMuted }}>
                    {surface.stat}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{surface.title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: pageTheme.textSecondary }}>
                    {surface.body}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: pageTheme.borderSubtle }}>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: pageTheme.textMuted }}>
              Pricing
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Start free. Upgrade when you're ready.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-2xl border p-5"
                style={{
                  background: tier.highlight ? pageTheme.surface2 : pageTheme.surface,
                  borderColor: tier.highlight ? pageTheme.accent : pageTheme.border,
                  boxShadow: tier.highlight ? "0 20px 50px rgba(11,58,130,0.18)" : "none",
                }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: tier.highlight ? "#9ec1ff" : pageTheme.textMuted }}>
                  {tier.name}
                </div>
                <div className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
                  {tier.price ?? "Free"}
                </div>
                <div className="mt-1 text-sm" style={{ color: pageTheme.textSecondary }}>
                  {tier.priceNote}
                </div>
                <ul className="mt-5 space-y-3 text-sm" style={{ color: pageTheme.textSecondary }}>
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={15} className="mt-0.5 shrink-0" style={{ color: pageTheme.accentHover }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {tier.cta.href.startsWith("/") ? (
                    <Link className={tier.highlight ? "button button--primary w-full" : "button button--ghost w-full"} href={tier.cta.href}>
                      {tier.cta.icon ? <Download size={16} /> : null}
                      <span>{tier.cta.label}</span>
                    </Link>
                  ) : (
                    <a className={tier.highlight ? "button button--primary w-full" : "button button--ghost w-full"} href={tier.cta.href} rel="noopener noreferrer" target="_blank">
                      {tier.cta.icon ? <Download size={16} /> : null}
                      <span>{tier.cta.label}</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
