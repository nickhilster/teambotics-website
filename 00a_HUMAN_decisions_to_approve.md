# Teambotics Website — Decisions (Deferred / TODO)

**Status:** All ten decisions below are parked as TODO per owner direction. The landing-page build is proceeding WITHOUT them by applying the defaults noted in `01_AGENT_implementation_brief.md §2a`.

**Revisit each decision at the phase that actually needs it** — not now. This file exists as the single record of what's still open.

**How to use later:** when ready, tick the recommendation or write an alternative, then send back. The agent will fold the answer into `00_HUMAN_brief_and_decisions.md §2` and remove the `TODO(human)` marker from wherever it was applied in code.

---

## D1 — MDX content layer

**Recommendation: Velite.**
**Why:** Actively maintained, zero-config with App Router, typed frontmatter out of the box, fast builds. Content Collections is viable but younger and has fewer production references. Contentlayer is deprecated — ruled out.
**Cost of changing later:** Low. Both compile MDX to the same runtime shape; migration is mostly config.

☐ Approved   ☐ Change to: ______________

---

## D2 — Contact form handler

**Recommendation: Resend + a Next.js API route.**
**Why:** Resend is the lightest path on Vercel (native integration, generous free tier, programmable templates), and owning the API route means no third-party form branding or iframe. Formspree works but adds a vendor. Raw SMTP is more fragile than it's worth.
**What you'll need to supply:** a Resend API key and a destination email address.

☐ Approved   ☐ Change to: ______________

---

## D3 — Analytics

**Recommendation: Vercel Analytics + Speed Insights only at launch.**
**Why:** Zero-config, privacy-friendly, captures Core Web Vitals. PostHog is powerful but overkill until there's meaningful traffic to analyze. Adding it later is a one-line install — defer.
**Revisit:** Once traffic is consistent or you need funnel analysis.

☐ Approved   ☐ Change to: ______________

---

## D4 — Filter bar on `/work` at launch

**Recommendation: Defer.**
**Why:** Two products at launch (LTB Buddy, EasyBuddy). A filter UI implies a larger collection than exists — it reads as a placeholder, not a feature. Ship once there are 5+ projects.
**Cost of changing later:** Trivial. The card grid component already supports it; we just don't render the bar.

☐ Approved   ☐ Change to: ______________

---

## D5 — Scroll progress bar on project pages

**Recommendation: Ship.**
**Why:** Cheap to implement, reinforces the precision/instrumentation aesthetic, subtly signals page depth on long project narratives. The spec (2px, accent color, fades in at 100px scroll) is already fully defined.

☐ Approved   ☐ Change to: ______________

---

## D6 — Smooth scroll (Lenis)

**Recommendation: Skip at launch.**
**Why:** Lenis can feel premium but also introduces latency on mobile and fights native scroll on iOS. The motion strategy explicitly warns against scroll hijacking. Ship with native scroll, add Lenis only if the site feels flat after everything else is in.

☐ Approved   ☐ Change to: ______________

---

## D7 — Icon library

**Recommendation: Lucide, `strokeWidth={1.5}`.**
**Why:** Geometric, tree-shakeable, stroke-based, already matches Geist. The design-system doc has locked this — leaving it here only for explicit approval.

☐ Approved   ☐ Change to: ______________

---

## D8 — Font loading

**Recommendation: Vercel Geist package (`geist/font`).**
**Why:** Purpose-built for Geist, handles both Sans and Mono in one import, avoids a Google Fonts round-trip. `next/font/google` works but gives a slower first load.

☐ Approved   ☐ Change to: ______________

---

## D9 — Domain

**Recommendation: Confirm `teambotics.app`.**
**Why:** The UX spec assumes this for sitemap, OG URLs, and robots.txt. If it's different, the agent updates those configs and OG asset generation.

☐ `teambotics.app` confirmed
☐ Actual domain: ______________

---

## D10 — Legal / Privacy pages

**Recommendation: Port from current site.**
**Why:** Assumes you have existing legal copy that counsel has cleared. Rewriting introduces risk and delay. Placeholder is unacceptable on a site marketing regulated-environment work.
**What you'll need to supply:** the current copy (paste, Google Doc link, or URL).

☐ Approved — copy source: ______________
☐ Rewrite (flag to agent; needs your final text)
☐ Placeholder (not recommended)

---

## Additional inputs needed regardless of the above

These aren't decisions — they're blockers the agent can't invent:

☐ Resend API key (if D2 approved)
☐ Contact form destination email
☐ Logo files (SVG: full lockup, wordmark, mark-only, dark-bg variants)
☐ Favicon source (32px mark)
☐ OG default image OR approval to auto-generate
☐ LTB Buddy content (title, subtitle, summary, tags, status, env, year, stack, body, metrics, links, embed URLs)
☐ EasyBuddy content (same schema)
☐ Twitter/X handle (spec assumes `@teambotics`) — confirm or correct
☐ Final homepage copy for all 6 sections
☐ About page prose
☐ Capabilities page — 4 capability descriptions
☐ Contact page framing copy

---

## Sign-off

Approved by: ______________
Date: ______________

Once returned, the agent will:
1. Fold these into `00_HUMAN_brief_and_decisions.md`.
2. Update `01_AGENT_implementation_brief.md` §2 (Stack) to reflect any D1/D8 choices.
3. Begin Phase 1 (Foundation & DevOps).
