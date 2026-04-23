# Teambotics Website — AI Agent Implementation Brief

**Audience:** AI engineering agents implementing this build. Read this file first every session.
**Companion doc:** `00_HUMAN_brief_and_decisions.md` — read for decision state and content inputs before starting a phase.

## Current scope: LANDING PAGE ONLY

We are building only the landing page (`/`) right now. Individual product pages (LTB Buddy, EasyBuddy, etc.) will live in their own repos and be shared by the owner later. Any project-index, project-detail-template, MDX content pipeline, or embed-facade work is DEFERRED and should not be started.

If a task in this brief references a deferred surface, skip it. Surfaces in scope right now:
- `/` (Home) — all six sections from UX spec §Page: Home
- Global `<Header>`, `<Footer>`, 404 page
- Design tokens, typography, motion system, UI kit, CursorReactiveCard
- Analytics + a11y + performance infrastructure for the landing

If anything in the source docs implies building project pages, `/work`, `/about`, `/capabilities`, `/contact`, MDX loading, or the embed system — **skip it unless the human explicitly re-opens that scope.**

---

## 0. Source of truth hierarchy

When these conflict, higher in the list wins:

1. `00_HUMAN_brief_and_decisions.md` — live decisions, content, approvals from the human owner.
2. `teambotics_design_system_and_visual_identity.md` — tokens, typography, components.
3. `teambotics_ux_architecture_and_page_spec.md` — page/section specs, copy direction, interaction rules.
4. `teambotics_website_motion_strategy_gemini.md` — motion principles and what to avoid.
5. `teambotics_website_tech_stack_and_implementation_plan_gemini.md` — stack, folder structure, phases.
6. Your own judgment — only when the above are silent. Flag, don't invent.

If you find a contradiction between docs 2–5, do NOT resolve it silently. Add a `TODO(human): conflict — [docs] say X vs Y` and proceed with the option that preserves the brand principle "disciplined intelligence expressed through restraint."

---

## 1. North-star constraints (do not violate)

- **Light theme is primary. Dark theme is secondary. Both ship at launch.** Use `prefers-color-scheme` media query + a manual toggle. Default to light. (Updated 2026-04-23 — overrides prior dark-only constraint.)
- **Brand accent is `#4A90D9`** (steel blue, matched to logo mark). The indigo `#5B5BDB` from original source docs is retired. TODO(human): confirm exact hex from logo SVG source.
- **No video backgrounds, autoplay reels, scroll hijacking, or particle systems.**
- **One animation library: Framer Motion.** Add GSAP only if a specific pattern requires it AND you've flagged the addition for human approval.
- **Every motion component respects `prefers-reduced-motion`.** This is a launch gate, not polish.
- **Every interactive element has a visible `:focus-visible` outline.** Never suppress without replacement.
- **WCAG AA minimum on all text pairs; AAA for body copy.** Verify the four pairs listed in the design-system doc §Accessibility.
- **Facade pattern on every third-party iframe embed.** No lazy-loaded-on-mount embeds.
- **Tokens, not magic values.** Every color, spacing, radius, and motion duration reads from the token system. If you need a new token, add it to the token file, don't inline.
- **rem, not px, in production CSS.** The design-system doc gives px for clarity — convert.
- **Mobile first on touch behavior.** Cursor-reactive components degrade via `@media (hover: hover) and (pointer: fine)`.

---

## 2. Stack (locked for landing)

- Next.js 14+ (App Router), React 18/19, TypeScript strict
- Tailwind CSS (via CSS custom properties — tokens are the source of truth)
- Framer Motion
- Vercel Geist font package (default per D8 — unless the human has specified `next/font`)
- Lucide icons, `strokeWidth={1.5}` (default per D7)
- Vercel deploy, Node 20.x

**Not installing at this phase:** Velite / Content Collections (D1 — deferred, not needed until project pages land).

**Do not add:** Redux, styled-components, Emotion, chakra/mui, any CMS, GSAP (unless flagged), Lottie, Rive — unless a phase task explicitly calls for it.

## 2a. Decision defaults (apply when needed, flag in code)

All `D#` decisions are TODO in `00_HUMAN`. When a phase needs one and it's still TODO, apply the default below AND add a `TODO(human): confirm D#` comment at the point of use.

| Decision | Default to apply | Landing-blocking? |
|---|---|---|
| D1 MDX layer | — | No (deferred) |
| D2 Form handler | — | No (deferred) |
| D3 Analytics | Vercel Analytics + Speed Insights | No |
| D4 Filter bar | — | No (deferred) |
| D5 Progress bar | — | No (deferred) |
| D6 Lenis | Skip | No |
| D7 Icons | Lucide | No |
| D8 Font loader | Vercel Geist package | No |
| D9 Domain | Assume `teambotics.app` for OG/metadata; centralize in one config file | No |
| D10 Legal/Privacy | — | No (deferred) |

None of the open decisions block the landing build.

---

## 3. Folder structure (landing scope)

```
/app
  /(site)
    layout.tsx
    page.tsx                    # Home (the landing page — the whole job)
    not-found.tsx               # 404
/components
  /animation
    TextReveal.tsx
    SectionReveal.tsx
    PageTransition.tsx
    CursorReactiveCard.tsx
    MotionProvider.tsx
  /ui
    Button.tsx                  # primary + ghost + icon variants
    Tag.tsx
    StatusBadge.tsx             # LIVE / ENTERPRISE PILOT / INACTIVE / CRITICAL
    SectionHeader.tsx           # eyebrow + heading + descriptor
    Divider.tsx
    Card.tsx                    # base card (CursorReactiveCard composes it)
  /home
    HeroSection.tsx
    PositioningSection.tsx
    LiveSystemsSection.tsx      # uses Card + StatusBadge; external product links
    CapabilitiesSection.tsx
    EngagementModelSection.tsx
    HomeCTASection.tsx
  /layout
    Header.tsx
    Footer.tsx
    Container.tsx
/lib
  motion.ts                     # motion tokens (duration, ease, stagger)
  config.ts                     # domain, product URLs (placeholders OK), social handles
  utils.ts
  og.tsx                        # @vercel/og template for default OG
/styles
  globals.css                   # CSS custom properties — all tokens
  typography.css
/public
  /images
  /og
```

Deferred folders (create only when scope reopens): `/content`, `/components/embed`, `app/(site)/work/*`, `app/(site)/about/*`, `app/(site)/capabilities/*`, `app/(site)/contact/*`, `app/api/*`.

---

## 4. Phased execution plan (landing-only)

Each phase ends in a reviewable preview deploy. Do not start a phase with an open gate from a prior phase.

### Phase 1 — Foundation & DevOps
- `next create` with App Router, TypeScript strict, Tailwind
- Install Vercel Geist (`geist/font`) per D8 default
- Install Lucide per D7 default
- Write `styles/globals.css` with every token from design-system §Color System, §Typography, §Spacing, §Border Radius
- Write `lib/motion.ts` with the exact `motionTokens` export from design-system §Motion Design Token Reference
- Extend `tailwind.config.ts` to reference CSS custom properties (do NOT duplicate the palette in Tailwind's theme)
- Set `<html class="dark">` statically in root layout; `suppressHydrationWarning`
- Configure metadata defaults per UX spec §SEO & Metadata (domain from `lib/config.ts`, TODO for D9)
- ESLint, Prettier, `tsc --noEmit` on GitHub Actions
- Add Vercel Analytics + Speed Insights (D3 default)
- Deploy empty shell to Vercel; confirm fonts load without FOUT
- **Gate:** visual sign-off from human.

### Phase 2 — UI Kit
Build every component from design-system §Component Tokens:
- `Button` (primary, ghost, icon) with hover/active translate
- `Tag` (Geist Mono, uppercase, wide tracking)
- `StatusBadge` with pulsing dot for LIVE (CSS `@keyframes`, not Framer)
- `SectionHeader` (eyebrow + heading + descriptor pattern)
- `Divider`
- `Card` base (no cursor reactivity yet — that's Phase 4)

Every component: typed props, named exports, no required props without defaults, `:focus-visible` handled, TSDoc.

Build a `/dev/ui` preview route that renders every variant so the human can eyeball them.

### Phase 3 — Motion System
- `TextReveal.tsx` — line reveal (mask-based), word stagger, character mode, configurable delay/duration, viewport-triggered
- `SectionReveal.tsx` — opacity 0→1 + translateY 16–32px→0, optional child stagger, viewport-once
- `PageTransition.tsx` — wraps route content with `AnimatePresence mode="wait"`; outgoing `opacity 0, y: -8`; incoming `opacity 0, y: 8→0` over 0.35s
- `MotionProvider.tsx` — wraps app; exposes `prefersReducedMotion` context
- Build a `/dev/motion` preview route exercising all three
- **Gate:** motion sign-off from human.

### Phase 4 — Cursor-Reactive Layer
- `CursorReactiveCard.tsx`:
  - Pointer tracking via motion values (NOT React state per frame)
  - CSS custom properties `--mouse-x` / `--mouse-y` updated via rAF
  - Radial glow using `--color-card-glow` from design-system doc
  - Mild tilt (max 6deg), mild scale (max 1.02)
  - Wrapped in `@media (hover: hover) and (pointer: fine)` — flat on touch
  - `useFinePointer()` hook for runtime detection
- Verify zero re-renders on pointer move via React DevTools profiler.

### Phase 5 — Landing Assembly + Launch
Build the six Home sections (UX spec §Page: Home), plus global chrome and launch infra:
- `HeroSection` — TextReveal on headline (line), staggered descriptor + CTAs
- `PositioningSection` — two-column desktop, stack on mobile
- `LiveSystemsSection` — card grid with `CursorReactiveCard` + `StatusBadge`. Product CTAs use URLs from `lib/config.ts` (placeholders until product repos are shared — add `TODO(human): confirm product URL` on each)
- `CapabilitiesSection` — 3-tile grid with Lucide icons, mild hover lift
- `EngagementModelSection` — 4-phase horizontal stepper on desktop, stacked on mobile, large-faint mono phase numbers
- `HomeCTASection` — centered CTA, directional hover on arrow
- `Header` — persistent, scroll-state CSS transition (not Framer), mobile hamburger → right drawer
- `Footer` — minimal per brand direction (agent drafts, human approves)
- 404 page per UX spec §404 Page
- `@vercel/og` default OG image at `/og/default.png` (dynamic edge route)
- Full accessibility pass: `prefers-reduced-motion`, focus rings, WCAG AA on all text pairs
- Lighthouse ≥ 90 mobile+desktop on Performance, Accessibility, SEO
- Run the landing-scoped launch checklist (below)
- **Gate:** launch sign-off from human.

### Landing-scoped launch checklist

Pre-launch technical:
- [ ] Lighthouse ≥ 90 mobile AND desktop (Performance, Accessibility, SEO)
- [ ] `prefers-reduced-motion` respected on every animated surface
- [ ] Every interactive element has a visible focus state
- [ ] WCAG AA contrast verified on all foreground/background pairs on the landing
- [ ] OG default image rendered
- [ ] `robots.txt` and landing entry in `sitemap.xml`
- [ ] 404 page implemented
- [ ] Vercel env vars set (domain, analytics)
- [ ] Dark mode only — no light flash on load
- [ ] No FOUT on Geist
- [ ] Mobile header drawer tested on iOS Safari and Android Chrome
- [ ] CursorReactiveCard confirmed flat on touch devices

Pre-launch content:
- [ ] Final copy approved for all 6 home sections
- [ ] Product CTAs point to real URLs or carry explicit `TODO(human)` markers the human has acknowledged
- [ ] Logo assets installed in all required variants
- [ ] Favicon + OG default confirmed

---

## 5. Component-level specifics you WILL get wrong if you skip

- **Header scroll state** is a CSS transition on `background` and `border` — NOT a Framer animation. Keep it on the main thread only as much as `backdrop-filter` requires.
- **Status badge LIVE pulse** is a CSS `@keyframes`, not a Framer loop. Framer loops in a marketing site tax the main thread.
- **Phase number count-up** on the engagement model uses a lightweight counter hook, not a heavy number library.
- **Hero ambient grid/dots** stay at 3–5% opacity. No motion on them. The brief is explicit.
- **CursorReactiveCard pointer tracking** uses motion values + CSS vars, not React state. Test: open React DevTools profiler — there must be zero re-renders of the card on pointer move.
- **Route transitions** wrap in `AnimatePresence mode="wait"` — not `popLayout`, not `sync`.
- **MDX embed blocks** resolve at build time via Velite/CC, not via client-side fetch.

---

## 6. Verification checklist (run at end of every phase)

Before declaring a phase complete, verify:

- `pnpm build` passes with zero TypeScript errors
- `pnpm lint` passes
- Lighthouse on the latest preview URL: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (mobile AND desktop)
- No console errors in production build
- `prefers-reduced-motion: reduce` in browser DevTools — every animation on the phase's surfaces falls back to static or simple fade
- Keyboard-only nav — every interactive element reachable, visible focus ring
- Mobile viewport (375px) — no horizontal scroll, nav drawer functional, touch targets ≥ 44px
- No hardcoded hex values in new code (grep for `#[0-9a-f]{3,6}` under `/components` and `/app`)
- No hardcoded animation durations/eases outside `lib/motion.ts`

If any check fails, fix before requesting the gate review.

---

## 7. How to handle ambiguity

The four source docs are dense but not exhaustive. When you hit a gap:

1. **Check `00_HUMAN_brief_and_decisions.md`** — the decision may already be recorded.
2. **Apply the brand principle** — "disciplined intelligence expressed through restraint." When in doubt, the less ornate option wins.
3. **Flag it.** Add a `TODO(human): [question]` comment at the point of the decision. Don't block the rest of the phase.
4. **Don't invent content.** If copy is missing, insert `TODO(human): copy for [section]` — never write marketing copy yourself. The brand voice is specific; your output will drift from it.

---

## 8. Anti-patterns — do not do these

- ❌ Pulling in a new UI library (shadcn, radix beyond what's already needed, etc.) without flagging.
- ❌ Writing page-specific one-off components when a reusable one from `/components` fits.
- ❌ Inlining animation variants — extract to `lib/motion.ts` or a co-located `variants.ts`.
- ❌ Using Tailwind's default palette (`bg-slate-900`, `text-gray-400`) — everything is on the token system.
- ❌ `motion.div` wrapping every element "just to animate" — reach for it deliberately.
- ❌ Marketing copy in commits or placeholder text that looks real ("Lorem ipsum" is fine; fake product claims are not).
- ❌ Shipping a phase with an open TODO that the gate reviewer needs to resolve — surface those in the PR description, not buried in code.
- ❌ Adding a cookie banner, GDPR modal, or consent layer unless D3/D10 require it.

---

## 9. Commit & PR discipline

- Branch per phase: `phase-1-foundation`, `phase-2-ui-kit`, etc.
- Conventional commits (`feat:`, `fix:`, `chore:`).
- Each PR:
  - Links to the phase section of this doc
  - Lists which source-doc sections it implements
  - Includes Lighthouse screenshots (mobile + desktop)
  - Lists any `TODO(human)` markers introduced
  - Notes any deviations from source docs and why
- Do NOT squash-merge across phases — each phase is its own deployable preview.

---

## 10. What "done" looks like

- All pages from the UX spec page map are live on production domain
- LTB Buddy and EasyBuddy project pages render from MDX
- Full UX-spec §Launch Checklist passes
- Human owner has signed off on the launch gate
- This doc and `00_HUMAN` are updated to reflect final state (nothing outdated)
