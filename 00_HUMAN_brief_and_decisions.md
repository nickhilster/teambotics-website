# Teambotics Website — Human Brief & Decision Log

**Audience:** You (and any human stakeholders reviewing, approving, or supplying content).
**Purpose:** Surface every decision, input, and approval gate the build depends on — so the AI agents don't block, guess, or ship something you'd have to unwind.
**Companion doc:** `01_AGENT_implementation_brief.md` (the instruction set the AI workers read).

---

## 1. Current scope (Phase 0 — Landing only)

**We are building the landing page first, not the full site.**

Individual product pages (LTB Buddy, EasyBuddy, etc.) will live in their own GitHub repos and be created later. The owner will share those repos when that work begins. Until then, any "View Product" CTA points to an external URL or a temporary placeholder.

The landing page is: a marketing page for Teambotics positioned as an applied AI systems lab for regulated, operational, and frontline environments. **Light theme is primary; dark theme is secondary** (both themes ship at launch — decision updated 2026-04-23). Motion-rich but restrained — cursor-aware cards, text reveals, smooth transitions. Built on Next.js 14 (App Router) + Tailwind + Framer Motion, deployed on Vercel.

**In scope now:** the six sections of `/` defined in the UX spec §Page: Home, plus a minimal header, footer, 404, and the global motion/design system that supports them.

**Deferred (separate repos / later phases):**
- `/work` projects index
- `/work/[slug]` project detail template
- `/capabilities`, `/about`, `/contact` full pages
- Individual product pages (LTB Buddy, EasyBuddy — separate repos)
- MDX content pipeline (not needed until project pages land)
- Contact form handler
- Legal / Privacy pages

---

## 2. Open decisions (TODO — decide when needed, not blocking)

These are the ambiguity points in the four source docs. The landing page can be built without any of them resolved. Revisit each at the phase that needs it.

| # | Decision | Options | Needed for | Status |
|---|---|---|---|---|
| D1 | MDX content layer | Velite vs. Content Collections | Project pages (deferred repos) | TODO |
| D2 | Contact form handler | Resend / Formspree / Next.js API route | `/contact` page (deferred) | TODO |
| D3 | Analytics | Vercel Analytics only / + PostHog | Landing launch | TODO — default to Vercel Analytics unless changed |
| D4 | Filter bar on `/work` | Ship / defer | `/work` (deferred) | TODO |
| D5 | Scroll progress bar on project pages | Ship / defer | Project pages (deferred) | TODO |
| D6 | Smooth scroll (Lenis) | Include / skip | Landing polish | TODO — default skip, revisit after Phase 7 |
| D7 | Icon library | Lucide / alternative | Phase 2 (UI kit) | TODO — default Lucide unless changed |
| D8 | Font loading | `next/font` / Vercel Geist package | Phase 1 | TODO — default Vercel Geist unless changed |
| D9 | Domain | `teambotics.app` confirmed? | Launch-time DNS + OG URLs | TODO |
| D10 | Legal/Privacy pages | Port / rewrite / placeholder | Deferred | TODO |

**Rule for the agent:** if a phase needs a decision that's still TODO, apply the default listed above, add a `TODO(human): confirm Dx` comment, and keep moving.

---

## 3. Content & assets the landing page needs from you

The agent cannot invent these. Anything missing on kickoff gets a `TODO(human):` placeholder and does not block other work.

**Copy needed for landing (UX spec §Page: Home):**
- Hero — eyebrow, headline, descriptor, two CTAs (the spec gives strong defaults; confirm or replace)
- Section 2 — Positioning Statement copy
- Section 3 — Live Systems descriptor + LTB Buddy and EasyBuddy card copy + external URLs for "View Product"
- Section 4 — Capabilities tiles (3 × title + 2–3 sentence copy)
- Section 5 — Engagement Model (4 phase descriptions)
- Section 6 — Home CTA block
- Header nav labels (Work / Capabilities / About / Contact) — confirm or trim
- Footer contents (links, legal lines, social)
- 404 page copy

**Brand assets:**
- Logo — full lockup, wordmark, mark-only (SVG, light versions for dark bg)
- Favicon source (32px mark minimum)
- OG default image — source OR approval to auto-generate

**Metadata:**
- Confirmed domain (see D9)
- Twitter/X handle (spec assumes `@teambotics`)

**Deferred inputs (not needed for landing):**
- Individual product MDX content (those live in each product's own repo — to be shared later)
- Contact form destination email / Resend key
- Legal / Privacy page copy

---

## 4. Approval gates (landing-only)

The agent should pause and get your sign-off at these checkpoints:

1. **After Phase 1 (Foundation)** — design tokens are wired, typography loads, empty shell deploys to Vercel preview. You confirm the visual feel matches before components get built on top.
2. **After Phase 3 (Motion System)** — a demo page with TextReveal, SectionReveal, and page transitions. You confirm motion timing and restraint before it's applied to the landing sections.
3. **Pre-launch** — landing page launch checklist (derived from UX spec §Launch Checklist, landing-scoped) walked through with you.

---

## 5. Landing-only phase plan

Compressed from the 7-phase tech-stack plan to match current scope. MDX, projects index, project detail template, and the full embed facade are deferred to when the product-repo integration work begins.

| Phase | Scope | Gate |
|---|---|---|
| 1 | Next.js shell, Tailwind, tokens, fonts, CI | Visual sign-off |
| 2 | UI kit (Button, Tag, StatusBadge, SectionHeader, Divider, base Card) | — |
| 3 | Motion system (TextReveal, SectionReveal, PageTransition) | Motion sign-off |
| 4 | CursorReactiveCard + touch fallbacks | — |
| 5 | Landing assembly — all six home sections, header, footer, 404, analytics, a11y audit | Launch sign-off |

**Deferred to later work (separate repos or later phases):**
- MDX pipeline (Velite/Content Collections)
- Embed system + Facade pattern (not needed on landing)
- `/work` index, `/work/[slug]` detail, `/capabilities`, `/about`, `/contact`
- Contact form backend
- Legal / Privacy pages
- Individual product site repos (shared later by owner)

---

## 6. What you are NOT deciding

These are already locked by the source docs — don't relitigate unless you have a strong reason:

- **Light theme primary, dark theme secondary — both ship at launch** (updated 2026-04-23; overrides prior "dark only" lock)
- Brand accent updated to `#4A90D9` (steel/cornflower blue) to align with logo mark; `#5B5BDB` indigo retired — TODO(human): confirm exact hex from logo source file
- No video backgrounds or autoplay hero reels
- No scroll hijacking
- Geist + Geist Mono as the type system
- Framer Motion as the single animation library (GSAP only if a specific pattern demands it)
- MDX as the content format (no CMS at launch)
- Every project reuses the same project-detail template

---

## 7. Risks & things to watch

- **Motion creep.** The source docs are disciplined but animators drift. If anything feels theatrical, call it out — the brand is "disciplined intelligence expressed through restraint."
- **Copy gaps stall Phase 5.** Landing copy needs to be ready before the sections get assembled. Draft in parallel with Phase 1.
- **Product CTAs on landing.** Until product repos are live, "View Product" links either point to external URLs you provide, a temporary `#` anchor, or a `TODO(human): product URL` placeholder.
- **Mobile motion.** Hover-driven effects must degrade — test on a real low-power Android, not just DevTools.
- **Accessibility.** `prefers-reduced-motion` support is a launch gate, not a polish item.
- **Repo handoff later.** When product repos (LTB Buddy, EasyBuddy, etc.) are shared, we'll decide per-repo whether the landing links out to them or they're pulled in as sub-routes via a monorepo / multi-zone approach. Not a Phase-1 concern.

---

## 8. Questions this document can't answer

Add answers inline and send back to the agent, or the agent will surface them again at the relevant phase:

1. Is there a brand guidelines PDF or existing style lockup you want honored beyond what's in the design-system doc?
2. Are LTB Buddy and EasyBuddy hosted as separate apps with their own domains, or will project pages embed their interfaces?
3. Does the contact form need CRM integration (HubSpot, Attio, etc.) or is email sufficient at launch?
4. Is there a launch date target driving phase compression?
5. Who owns final copy approval — you alone, or is there a second reviewer?

---

## 9. How to give direction to the AI agents mid-build

- **Feedback on a deployed preview:** comment with the exact section/component name from the UX spec (e.g., "Home §3 Live Systems — card hover feels too aggressive").
- **New content:** drop MDX-ready files in `/content/projects/` and the agent will wire them.
- **Scope change:** update this doc. The agent re-reads it each session.
- **Halt/redirect:** say so plainly. The agent will stop the current phase and re-plan.
