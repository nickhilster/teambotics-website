# Product pages design-alignment flash — spec

**Date:** 2026-11-09
**Ticket:** TBW-007 (`.tracker/issues/TBW-007.md`)
**Requested by:** Nikhil — "the product pages don't match the landing page in visual design. The product pages were not yet completed in the overhaul."
**Status:** Spec only. No code changed by this document.

## The problem, verified in code (2026-11-09)

The 2026-10-10 overhaul shipped the landing page and deliberately stopped there. The split is not an impression — it is written into the stylesheet. `styles/globals.css` carries the comment:

> "The consultancy homepage has its own editorial surface. Keep shared product pages unchanged."

So today the site runs **two design systems at once**:

| Layer | Landing page (post-overhaul) | Product pages (pre-overhaul) |
|---|---|---|
| Implementation | `components/home/ConsultancyHome.tsx` + scoped `ConsultancyHome.module.css` (55 lines, self-contained tokens) | Shared template `components/products/ProductCaseStudyContent.tsx`, styled by the global system in `styles/globals.css` (`.product-*`, ~lines 3247–3430) |
| Palette | `--ink #193127`, `--muted #4d6256`, `--line #c9d3c7`, `--paper #f2f3ec`, `--cream #fbfaf5` — deep green on warm cream | Global tokens: `--color-bg-page #f7f8ff`, `--color-accent #b52d96` (magenta), `--color-live #118c7a`, glows `rgba(207,58,169,.14)` / `rgba(95,86,232,.12)` — lavender-pink-blue |
| Hero surface | Flat cream, one faint radial tint at the edge | Layered radial gradients in accent + live colours over a gradient wash |
| Headings | Weight ~550, letter-spacing −.075em, line-height .98 | Weight 700, letter-spacing −.055em, line-height .9 |
| Eyebrows / labels | Geist Mono, .72rem, uppercase, sage `#617669` | Sans, .68rem, uppercase, accent magenta |
| Buttons | Primary = solid ink rectangle, min-height 52px, square corners; secondary = text with a bottom rule | Global `.button--primary` / `--ghost` = pill shape (999px), pink-gradient family |
| Cards | Flat cream on paper, 1px ruled borders, **no radius, no shadow** | `border-radius: 1.5rem` (`--radius-2xl`), gradient tint, coloured glow shadow |
| Badges / tags | Flat mono tag, 1px sage border, square | Glass pills: 999px radius, translucent white, coloured shadows; status badge in blue `rgba(69,107,255,.12)` |
| Header / footer | Scoped overrides under `.site-shell:has(.consultancy-home)`: cream header `#fbfaf5`, footer and land strip solid `#193127` with pale green text | Shared chrome in the global system (light lavender surface, dark-mode navy) |
| Chat widget | Green `#315642` toggle via scoped override; on mobile the widget is in-flow (dark green strip) | Magenta gradient toggle, floating |
| Dark theme | The consultancy surface overrides hold in dark mode too (the header rule explicitly includes `html.dark`) | Full dark variant: `--color-bg-page #070b1a`, accent `#ff4db8` |

Rendered check (390px, from the TBW-006 review renders, 2026-11-09): the home page reads as a green editorial document; `/products/ryfine` reads as a pink-lavender product site. A visitor crossing from "Selected work" into a product page changes websites mid-click.

## Scope

**In scope — one template, eight pages.** All product case-study pages render from the single `ProductCaseStudyContent` template, so the flash is a presentation-layer job on one component and its CSS, not eight redesigns:

- Slugs (from `lib/products.ts`): `ryfine`, `code2motion`, `ltb-buddy`, `redactorbuddy`, `mdownmanager`, `easybuddy`, `storytellr`, `recruiterbuddy`
- Routes: `app/(site)/products/[slug]` and `app/[lang]/products/[slug]` — en, fr-CA, es-419
- The shared header, footer and Chat widget **as they appear on product pages**
- Both themes, subject to decision D2 below

**Content is frozen.** No copy, translation, product-data, status-label or link changes. This is a visual alignment pass only; anything that looks like a copy problem gets filed, not fixed.

**Out of scope (inventory only, Phase 0 confirms the list):** the legacy standalone product-era routes that do not use the case-study template (e.g. `/easybuddy`, `/MdownManager`, `/RedactorBuddy`, `/feedbackfish`, `/financebuddy`, `/poko`, `/symphony`, `/BOSS`), and the other pre-overhaul editorial pages (`/about`, `/everythings-computer`, legal pages). They run the same old system, so the mismatch is wider than the product pages — but this flash does not absorb them. Phase 0 inventories them so Nik can scope a follow-on with full information.

## Decisions (Phase 0 gate)

Answered by Nik, 2026-11-10 — **Phase 0 fully decided:**

- **D1 — Direction. DECIDED: YES.** Landing is the source of truth; product pages move to it.
- **D2 — Dark theme. DECIDED: keep a dark theme**, recorded as a dark variant re-derived from the landing/green palette. The current navy/magenta dark theme does not survive — keeping it would contradict D5. (Nik's answer was "dark theme"; if he meant keep the existing dark theme unchanged, this is the line to correct.)
- **D3 — Chrome scope. DECIDED: FULL.** Product pages get the full consultancy chrome: cream header, solid-green footer, green Chat toggle — not body only.
- **D4 — Buttons. DECIDED: SCOPED to product pages.** The landing button treatment applies under a product-page scope only; the global `.button--primary` is untouched in this flash. Brief below (the evidence the decision was made on).
- **D5 — Product identity accents. DECIDED: alignment is ABSOLUTE.** No per-product brand colours inside the aligned template, no exceptions slot. (RyFine's pink lives in RyFine's own product, not on its Teambotics page.)

## D4 brief — what the global button actually is, and who renders it (added 2026-11-10)

What exists today (`styles/globals.css`, ~line 566): the global `.button` is a 0.625rem-radius, translucent surface with a 1.5px border and an **animated neon border cycle**; `.button--primary` tints it with `--color-accent` (magenta family), `.button--ghost` is its quieter sibling with a slower animation. The landing page uses none of it — its buttons are module-scoped (solid ink `#193127`, square, min-height 52px, no animation).

Who renders the global button classes (grep-verified 2026-11-10, rendering consumers only):

| Surface | File(s) | In this flash's scope? |
|---|---|---|
| Product template (the target) | `components/products/ProductCaseStudyContent.tsx` (3 uses) | Yes |
| BOSS pages | `app/BOSS/page.tsx` (4) | No — inventory only |
| Poko site + admin chrome | `app/poko/page.tsx` (3), `components/poko/PokoAdminChrome.tsx` (1) — Poko also has its own `:global(.button--primary)` override in `poko-site.module.css` that assumes the current button | No |
| Legacy standalone product page | `app/MdownManager/page.tsx` (4) | No — inventory only |
| FinanceBuddy | `app/(site)/financebuddy/page.tsx` (3) | No |
| Nonprofit application | `app/nonprofit-application/page.tsx` (1) | No |
| 404 page | `components/content/NotFoundTetris.tsx` (2) | No |
| Lead form (landing contact) | `components/home/LeadCaptureForm.tsx` (2) — already overridden to solid ink inside the consultancy contact section | Already scoped-overridden |

(Three more components reference the classes — `HeroSection`, `ProductFlagshipSections`, `LiveSystemsSection` — but nothing imports them; they don't render.)

**If D4 = global:** editing `.button`/`.button--primary` restyles BOSS, Poko (including its admin chrome, whose override expects the current shape), the standalone MdownManager page, FinanceBuddy, the nonprofit form and the 404 in the same commit — pages that keep their lavender/magenta systems, so their buttons would then mismatch their own pages, and each needs its own QA. That converts this flash into an estate-wide button migration.

**If D4 = scoped:** product pages get the landing button treatment under a product-page scope — exactly the pattern the codebase already uses three times (consultancy chrome overrides, the lead-form override in the contact section, Poko's own override). Zero collateral; the other surfaces keep today's button until the legacy-inventory decision gives them their own pass.

**Recommendation: scoped for this flash**, with a follow-on ticket for the global button once Nik decides the legacy routes' fate from the Phase 0 inventory. **Nik decided scoped (2026-11-10)** — the brief above is the record the decision rests on.

## The flash — phases

### Phase 0 — Decisions + token mapping (no build)
- Nik answers D1–D5.
- Produce a mapping table: every product-page token/pattern (hero gradient, tag, badge, card, chip, button, section eyebrow, proof list) → its landing equivalent (token, value, or "no equivalent — pattern dropped/added").
- Inventory the out-of-scope legacy routes (above) with one screenshot each at 1280px, for the follow-on decision.
- Exit gate: mapping table approved. No CSS written before this gate.

### Phase 1 — Token + chrome layer
- Introduce product-page-scoped tokens mirroring the landing palette (following the consultancy scoping precedent, e.g. a `:has()`/page-class scope — not a global token swap, unless D4 says otherwise).
- Apply the D3 chrome treatment to product pages: header, footer, land strip, Chat toggle.
- Exit gate: one slug (RyFine) renders in the new chrome with the old body — seam check at 1280 + 390px.

### Phase 2 — Hero
- Rebuild `.product-hero` on the landing grammar: flat surface, mono eyebrow row (label + status as flat tags), heading weight/spacing, lede, action row in the landing button treatment, back link.
- Fold in the TBW-006 hero clearance requirement (below) so the button stack provably clears the Chat pill at 390/360/414 × 844 in all three locales.
- Exit gate: RyFine hero screenshot-compared against the landing hero — same family, no leftover gradient/glass elements.

### Phase 3 — Body sections
- Focus cards, detail cards, evidence/proof list, stack chips: flat ruled cards, square corners, mono labels, ink rules; remove glow shadows and gradient tints.
- Section headings to the landing section-head pattern (oversized heading + side copy where the template allows without copy changes).
- Exit gate: full-page RyFine in both themes (per D2) and fr-CA.

### Phase 4 — Roll out + verify all eight
- Apply to all 8 slugs × 3 locales (template-level, so this is verification, not 24 builds).
- Screenshot sweep: every slug at 1280px and 390px, light (+ dark per D2), spot-check fr-CA/es-419 on two slugs.
- Run the TBW-006 mobile checklist on the new hero (below).
- Gates vs `main`: `pnpm typecheck` pass; `pnpm lint` / `pnpm build` no worse than the known baseline (18 lint errors; build baseline to be re-established at sprint start, as the 2026-11-09 PR #41 review could not reproduce the reported `/BOSS/guide/audit` failure).
- Live verification after deploy: grep the served pages for the new scoped class/tokens and eyeball two slugs live.

## Relationship to TBW-006 / PR #41 (open)

PR #41 (Chat pill + tap targets) is held open because the pill still overlaps the `All products` hero button at 390/360 × 844. Phase 2 of this flash redesigns that hero, so:

- Either TBW-006's remaining hero-clearance fix lands first and Phase 2 must not regress it, **or** the clearance fix folds into Phase 2. Do not merge a hero redesign that re-opens it.
- TBW-006's tap-target work (header/footer) is independent and unaffected; the enlarged targets must survive the chrome work in Phase 1.

## Acceptance criteria

- [ ] A visitor moving landing → any product page stays in one visual system: palette, heading grammar, buttons, cards, chrome all match the landing treatment per the approved mapping table.
- [ ] All 8 slugs verified at 1280px and 390px; fr-CA and es-419 verified on at least RyFine + one other slug; themes per D2.
- [ ] No copy, translation, data or link changes (diff is presentation layer only — components' markup classes + CSS, unless Phase 0 approves a markup change).
- [ ] TBW-006 mobile checklist passes on the new hero, or TBW-006's blocker is explicitly carried into this ticket and closed here.
- [ ] Gates no worse than the re-established `main` baseline; live deploy verified on two slugs.
- [ ] Legacy-route inventory delivered so the follow-on scope is a decision Nik can make from screenshots, not from memory.

## Risks / notes

- `styles/globals.css` is 4,300+ lines and the product block is interleaved with dark-theme variants — budget the CSS archaeology honestly; the flash is fast because the *template* is singular, not because the stylesheet is small.
- The consultancy module CSS is scoped and self-contained; resist "just import it" — the product template's class names and structure differ. Map tokens, don't transplant classes.
- Per-product brand colours were the most likely place for quiet scope creep; D5 closed it — alignment is absolute, one system, no per-product accents.
