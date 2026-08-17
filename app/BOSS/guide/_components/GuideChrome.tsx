"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { bossTheme, guideNav, guideNavFlat } from "../../_lib/theme";

export function SealMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="1.6 2.2" />
      <path d="M8.2 12.4l2.6 2.6 5-5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GuideSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Guide sections"
      className="border-r px-0 py-6 lg:sticky lg:top-[var(--site-header-height)] lg:h-[calc(100vh-var(--site-header-height))] lg:overflow-y-auto"
      style={{ borderColor: bossTheme.border, background: bossTheme.surface }}
    >
      <div className="mb-4 border-b px-6 pb-5" style={{ borderColor: bossTheme.borderSubtle }}>
        <Link href="/BOSS" className="flex items-center gap-2 no-underline" style={{ color: bossTheme.textPrimary }}>
          <SealMark size={18} />
          <span className="text-base font-semibold" style={{ fontFamily: "var(--font-boss-serif)" }}>
            BOSS Guide
          </span>
        </Link>
        <div className="mt-1 text-xs" style={{ color: bossTheme.textMuted }}>
          v0.2.1
        </div>
      </div>

      {guideNav.map((group) => (
        <div key={group.title} className="mb-5">
          <div
            className="px-6 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: bossTheme.textMuted }}
          >
            {group.title}
          </div>
          {group.items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="flex items-baseline gap-2.5 border-l-2 px-6 py-1.5 text-sm no-underline"
                style={{
                  borderColor: active ? bossTheme.accent : "transparent",
                  color: active ? bossTheme.textPrimary : bossTheme.textSecondary,
                  background: active ? `${bossTheme.accent}14` : "transparent",
                  fontWeight: active ? 600 : 400,
                }}
              >
                <span className="w-4 shrink-0 font-mono text-[11px]" style={{ color: bossTheme.textMuted }}>
                  {item.index}
                </span>
                {item.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function CodeBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      className="relative mb-5 mt-3 rounded-md border"
      style={{ borderColor: bossTheme.border, background: bossTheme.surface2 }}
    >
      <span
        className="absolute -top-[10px] left-3 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={{ fontFamily: "var(--font-boss-sans)", background: bossTheme.accent, color: "#1a1206" }}
      >
        {label}
      </span>
      <pre className="m-0 overflow-x-auto px-4 py-3.5 font-mono text-[13.5px]" style={{ color: bossTheme.textPrimary }}>
        {children}
      </pre>
    </div>
  );
}

export function Callout({ tone = "accent", children }: { tone?: "accent" | "good" | "risk"; children: ReactNode }) {
  const color = tone === "good" ? bossTheme.good : tone === "risk" ? bossTheme.risk : bossTheme.accent;
  return (
    <div
      className="mb-5 rounded-r-md border-l-[3px] px-4 py-3.5 text-[14.5px] leading-6"
      style={{ borderColor: color, background: `${color}14`, color: bossTheme.textSecondary }}
    >
      {children}
    </div>
  );
}

export function Pager({ prevSlug, nextSlug }: { prevSlug?: string; nextSlug?: string }) {
  const prev = prevSlug ? guideNavFlat.find((i) => i.slug === prevSlug) : undefined;
  const next = nextSlug ? guideNavFlat.find((i) => i.slug === nextSlug) : undefined;

  return (
    <div className="mt-12 flex justify-between gap-4 border-t pt-6" style={{ borderColor: bossTheme.borderSubtle }}>
      {prev ? (
        <Link href={prev.href} className="flex flex-col gap-1 text-sm no-underline" style={{ color: bossTheme.textSecondary }}>
          <span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: bossTheme.textMuted }}>
            Back
          </span>
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="ml-auto flex flex-col gap-1 text-right text-sm no-underline" style={{ color: bossTheme.textSecondary }}>
          <span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: bossTheme.textMuted }}>
            Next
          </span>
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code
      className="rounded px-1.5 py-0.5 font-mono text-[0.86em]"
      style={{ background: bossTheme.surface2, color: bossTheme.textPrimary }}
    >
      {children}
    </code>
  );
}

export function H2({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <h2
      className={`mb-3 text-xl font-semibold ${first ? "mt-8" : "mt-10 border-t pt-6"}`}
      style={{
        color: bossTheme.textPrimary,
        borderColor: first ? "transparent" : bossTheme.borderSubtle,
        fontFamily: "var(--font-boss-serif)",
      }}
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 leading-7" style={{ color: bossTheme.textSecondary }}>
      {children}
    </p>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-5 leading-7" style={{ color: bossTheme.textSecondary }}>
      {children}
    </ul>
  );
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="mb-4 list-decimal space-y-2 pl-5 leading-7" style={{ color: bossTheme.textSecondary }}>
      {children}
    </ol>
  );
}

export function Table({ head, rows }: { head: [string, string]; rows: [ReactNode, ReactNode][] }) {
  return (
    <div className="mb-5 overflow-x-auto rounded-md border" style={{ borderColor: bossTheme.border }}>
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b px-3.5 py-2.5 text-left text-[10.5px] font-semibold uppercase tracking-[0.07em]"
                style={{ borderColor: bossTheme.border, color: bossTheme.textMuted, background: bossTheme.surface }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-b px-3.5 py-2.5 align-top last:border-b-0"
                  style={{
                    borderColor: bossTheme.borderSubtle,
                    color: j === 0 ? bossTheme.textPrimary : bossTheme.textSecondary,
                    whiteSpace: j === 0 ? "nowrap" : "normal",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuideArticle({
  eyebrow,
  title,
  dek,
  children,
}: {
  eyebrow: string;
  title: string;
  dek: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[720px] px-6 py-14 sm:px-10 sm:py-16">
      <p
        className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em]"
        style={{ color: bossTheme.accentInk }}
      >
        {eyebrow}
      </p>
      <h1
        className="mb-4 text-3xl font-semibold sm:text-4xl"
        style={{ color: bossTheme.textPrimary, fontFamily: "var(--font-boss-serif)" }}
      >
        {title}
      </h1>
      <p className="mb-10 max-w-[56ch] text-lg leading-7" style={{ color: bossTheme.textSecondary }}>
        {dek}
      </p>
      {children}
    </article>
  );
}
