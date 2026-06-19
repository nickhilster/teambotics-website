"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";

type Status = "idle" | "submitting" | "success" | "error";

const ORG_TYPES = [
  "501(c)(3) / US non-profit",
  "Registered charity (UK / EU / AUS / CA)",
  "NGO / international non-profit",
  "Educational institution",
  "Open-source project (no legal entity)",
  "Other non-commercial entity",
] as const;

const INCLUDED = [
  "Unlimited vaults",
  "Up to 10 seats",
  "Full Commercial feature set",
  "Priority support",
  "All future updates",
] as const;

const inputCls =
  "w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none transition-colors focus:border-[var(--color-accent)]";

export default function NonprofitApplicationPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [confirmedEmail, setConfirmedEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setConfirmedEmail(String(data.contact_email ?? ""));

    try {
      const res = await fetch("https://formspree.io/f/FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen pt-[calc(var(--site-header-height)+3rem)] pb-20">
      <Container>
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              MDownManager · Non-profit program
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text-primary)]">
              Apply for free access
            </h1>
            <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
              We offer full Commercial access at no cost to verified non-profit organizations.
              Applications are reviewed manually within 3–5 business days.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_220px]">

            {/* Form */}
            <div>
              {status === "success" ? (
                <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15">
                    <Check size={20} className="text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Application received
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                    Thanks! We&apos;ll review your application and email your license token to{" "}
                    <strong className="text-[var(--color-text-primary)]">{confirmedEmail}</strong> within 3–5 business days.
                  </p>
                  <p className="mt-4 text-sm text-[var(--color-text-tertiary)]">
                    Questions?{" "}
                    <a href="mailto:hello@teambotics.app" className="text-[var(--color-accent)] hover:underline">
                      hello@teambotics.app
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field label="Organization name" required>
                    <input
                      name="org_name" type="text" required
                      placeholder="e.g. Open Source Collective"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Organization type" required>
                    <select name="org_type" required defaultValue="" className={inputCls}>
                      <option value="" disabled>Select…</option>
                      {ORG_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Organization website" required>
                    <input
                      name="org_url" type="url" required
                      placeholder="https://example.org"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Contact email" required hint="License token will be sent here.">
                    <input
                      name="contact_email" type="email" required
                      placeholder="you@example.org"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Number of seats needed">
                    <select name="seats" defaultValue="10" className={inputCls}>
                      <option value="3">1–3</option>
                      <option value="7">4–7</option>
                      <option value="10">8–10</option>
                    </select>
                  </Field>

                  <Field
                    label="How will your organization use MDownManager?"
                    required
                  >
                    <textarea
                      name="use_case" required rows={4}
                      placeholder="Brief description of your use case…"
                      className={`${inputCls} resize-y`}
                    />
                  </Field>

                  <Field
                    label="Proof of non-profit status"
                    hint="Optional — public URL to registration, charity listing, or IRS page. Speeds up review."
                  >
                    <input
                      name="proof" type="url"
                      placeholder="https://…"
                      className={inputCls}
                    />
                  </Field>

                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      Something went wrong. Please email{" "}
                      <a href="mailto:hello@teambotics.app" className="underline">hello@teambotics.app</a> directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="button button--primary w-full justify-center disabled:opacity-50"
                  >
                    <span>{status === "submitting" ? "Submitting…" : "Submit application"}</span>
                    {status !== "submitting" && <ArrowRight size={16} strokeWidth={1.6} aria-hidden />}
                  </button>

                  <p className="text-center text-xs text-[var(--color-text-tertiary)]">
                    By submitting you confirm your organization is a registered non-profit or equivalent.
                  </p>
                </form>
              )}
            </div>

            {/* What's included sidebar */}
            <aside className="shrink-0">
              <div className="sticky top-24 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                  What&apos;s included
                </p>
                <ul className="space-y-2">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <Check size={13} className="mt-0.5 shrink-0 text-[var(--color-accent)]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    Tokens are valid for 12 months. We&apos;ll send a renewal reminder before expiry.
                  </p>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </Container>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[var(--color-text-primary)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-accent)]">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[var(--color-text-tertiary)]">{hint}</p>}
    </div>
  );
}
