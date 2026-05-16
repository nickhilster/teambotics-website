# Teambotics Website — UI/Copy Sprint Plan

Generated: 2026-05-08
Status: Ready for worker agent execution
Approach: Execute tasks in the order listed. Each task is self-contained unless a dependency is noted.

---

## Overview of tasks

| # | Task | Primary files |
|---|------|---------------|
| 1 | SVG logo in header | `components/layout/Header.tsx`, new `components/layout/TeamboticsSVGLogo.tsx` |
| 2 | LTB Buddy live URL | `lib/products.ts` |
| 3 | Product button on landing cards | `lib/products.ts`, `components/home/LiveSystemsSection.tsx` |
| 4 | Live product CTA prominence on case study pages | `app/(site)/products/[slug]/page.tsx` |
| 5 | Engagement path visual diagram | `components/home/EngagementModelSection.tsx`, `styles/globals.css` |
| 6 | Hero blue flame particle refinement | `components/animation/HeroFlameParticles.tsx`, `styles/globals.css` |
| 7 | Glass + neon border button redesign | `styles/globals.css` |
| 8 | Remove "flagship" from all copy | 8 files (see task) |

---

## Task 1 — Teambotics SVG logo in header (top-left)

### Goal
Replace the current `[ teambotics ]` monospace text in the header `<Link className="site-logo">` with an inline SVG icon + "Teambotics" wordmark.

### Reference image
`c:/DEV/portfolio-website/public/brands/teambotics-logo.png`
The logo is a blue line-art handshake icon. Both wrists terminate in small circular circuit nodes. The style is clean, rounded strokes, fill-none, stroke only.

### Step 1 — Create `components/layout/TeamboticsSVGLogo.tsx`

Create this component as an inline SVG. The icon should render at 28×28px (use `width="28" height="28"` on `<svg>`). Use the CSS token `var(--color-flame-a)` as the stroke color so it adapts to theme.

SVG structure guidance — replicate from the PNG:
- `viewBox="0 0 100 80"` (adjust to match aspect ratio of PNG)
- `stroke="currentColor"` (color is set via CSS on the wrapper)
- `fill="none"` `stroke-width="4.5"` `stroke-linecap="round"` `stroke-linejoin="round"`
- **Left circuit node**: small circle (~r=6) at approximately (12, 14)
- **Left arm**: a path from the left node curving down-right into the handshake center (~50, 46)
- **Right circuit node**: small circle (~r=6) at approximately (88, 14)
- **Right arm**: a path from the right node curving down-left into the handshake center
- **Handshake fingers**: the interlocked finger forms — approximate with 3–4 short curved strokes radiating from the center-left and center-right of the clasp
- **Palm/base of clasp**: a slightly wider path segment where the palms meet (~50, 42–58)

If the traced SVG does not visually match the PNG at small size (28px), fall back to rendering the PNG via `<img>` inside the component with `alt=""` and `width={28} height={28}`. Add a comment `// SVG fallback — swap img tag for inline SVG once paths are confirmed`.

Component export:
```tsx
export function TeamboticsSVGLogo() {
  return (
    <svg
      aria-hidden="true"
      className="teambotics-logo-icon"
      fill="none"
      height="28"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4.5"
      viewBox="0 0 100 80"
      width="28"
    >
      {/* paths described above */}
    </svg>
  );
}
```

### Step 2 — Add CSS for `.site-logo` and `.teambotics-logo-icon` in `styles/globals.css`

Update the existing `.site-logo` block (near line 268):
```css
.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;           /* slightly larger than current 0.75rem */
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: none;          /* override current uppercase */
  color: var(--color-text-primary);
}

.teambotics-logo-icon {
  color: var(--color-flame-a);
  flex-shrink: 0;
}
```

### Step 3 — Update `components/layout/Header.tsx`

Import `TeamboticsSVGLogo` and update the logo link:

```tsx
import { TeamboticsSVGLogo } from "@/components/layout/TeamboticsSVGLogo";

// Replace:
<Link className="site-logo" href="/">
  [ teambotics ]
</Link>

// With:
<Link className="site-logo" href="/">
  <TeamboticsSVGLogo />
  Teambotics
</Link>
```

---

## Task 2 — LTB Buddy live product URL

### Goal
Update the external URL for LTB Buddy from the internal staging URL to the live domain.

### File: `lib/products.ts` — line 107

```ts
// Change:
externalUrl: "https://ltbbuddy.teambotics.app/",

// To:
externalUrl: "https://ltbbuddy.ca/",
```

No other changes needed in this file for this task.

---

## Task 3 — Product button on landing page cards

### Goal
Each product card on the homepage `#systems` section currently has only a "Read case study →" link. Add a second button that opens the live product (external URL) in a new tab.

### Step 1 — Extend the `products` mapping in `lib/products.ts`

The `products` export (line 329) maps from `productCaseStudies` but omits `externalUrl` and `externalLabel`. Add both fields:

```ts
export const products = productCaseStudies.map((product) => ({
  name: product.name,
  title: product.title,
  description: product.description,
  market: product.market,
  status: product.status,
  statusLabel: product.statusLabel,
  href: `/products/${product.slug}`,
  ctaLabel: "Read case study",
  externalUrl: product.externalUrl,       // add this
  externalLabel: product.externalLabel,   // add this
  tags: product.tags,
}));
```

### Step 2 — Update `components/home/LiveSystemsSection.tsx`

In `system-card__footer`, the current markup is:
```tsx
<div className="system-card__footer">
  <span>{product.market}</span>
  <Link href={product.href}>{product.ctaLabel} →</Link>
</div>
```

Replace with a two-action footer. The case study link stays as a text link. Add a small "Open product" button (external, new tab):

```tsx
<div className="system-card__footer">
  <Link href={product.href} className="system-card__case-link">
    {product.ctaLabel} →
  </Link>
  <a
    className="button button--ghost system-card__product-btn"
    href={product.externalUrl}
    rel="noopener noreferrer"
    target="_blank"
  >
    <span>{product.externalLabel}</span>
  </a>
</div>
```

### Step 3 — Add CSS in `styles/globals.css`

Find the `.system-card__footer` block and update it to accommodate two actions. Add a size modifier for the small button:

```css
.system-card__footer {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: auto;
  padding-top: var(--space-5);
}

.system-card__product-btn {
  min-height: 2.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
}
```

---

## Task 4 — Live product CTA prominence on case study pages

### Goal
The product case study page (`app/(site)/products/[slug]/page.tsx`) already has a primary CTA for the external product (lines 68–76). Confirm it is the first action (it is — no reordering needed) and add a "← All products" back-navigation link so users can return to the landing page portfolio section.

### Step 1 — Add `Link` import to `app/(site)/products/[slug]/page.tsx`

Add to the import block at the top:
```tsx
import Link from "next/link";
```

### Step 2 — Add back-navigation to the `product-hero__actions` block

The existing `<SectionReveal className="product-hero__actions" delay={0.32}>` block currently contains two action elements. Add a third:

```tsx
<SectionReveal className="product-hero__actions" delay={0.32}>
  <a
    className="button button--primary"
    href={product.externalUrl}
    rel="noopener noreferrer"
    target="_blank"
  >
    <span>{product.externalLabel}</span>
    <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
  </a>
  <a className="button button--ghost" href={product.supportUrl}>
    <span>{product.supportLabel}</span>
  </a>
  <Link className="button button--ghost product-hero__back-link" href="/#systems">
    <span>← All products</span>
  </Link>
</SectionReveal>
```

### Step 3 — Add CSS for the back link

```css
.product-hero__back-link {
  font-size: 0.8125rem;
  opacity: 0.72;
}

.product-hero__back-link:hover {
  opacity: 1;
}
```

---

## Task 5 — Engagement path visual diagram (connected card rail)

### Goal
Replace the current 4-card grid (`engagement-grid`) with a connected card rail: cards remain but a visible animated path/connector line threads through the numbered circles (01 → 02 → 03 → 04), making the progression visually explicit.

### Step 1 — Update `components/home/EngagementModelSection.tsx`

Remove the `CursorReactiveCard` wrapper. Add a `engagement-rail` wrapper and a `engagement-rail__track` track element. Separate the step number into a node element:

```tsx
export function EngagementModelSection() {
  return (
    <section className="section section--border" id="engagement">
      <Container>
        <SectionHeader
          align="center"
          description="A structured methodology from early opportunity framing to a production-ready workflow system."
          eyebrow="ENGAGEMENT METHODOLOGY"
          title="A deliberate path to production."
        />
        <div className="engagement-rail">
          <div className="engagement-rail__track" aria-hidden="true" />
          {steps.map((step, index) => (
            <SectionReveal delay={index * 0.06} key={step.number}>
              <div className="engagement-step">
                <div className="engagement-step__node">
                  <span className="engagement-step__number">{step.number}</span>
                </div>
                <div className="engagement-step__content">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Remove the unused `CursorReactiveCard` import from this file.

### Step 2 — CSS for the rail layout in `styles/globals.css`

Remove the existing `engagement-grid` and `engagement-step` blocks entirely. Replace with:

```css
/* ── Engagement rail ── */
.engagement-rail {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding-top: 3rem;
}

/* Horizontal connecting line threading through the nodes */
.engagement-rail__track {
  position: absolute;
  top: 4.25rem; /* vertically centered with the nodes */
  left: calc(12.5% + 1.25rem); /* starts at center of first node */
  right: calc(12.5% + 1.25rem); /* ends at center of last node */
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-flame-a) 0%,
    var(--color-accent) 50%,
    var(--color-flame-b) 100%
  );
  opacity: 0.42;
  border-radius: 1px;
  overflow: hidden;
}

/* Animated flow shimmer on the track */
.engagement-rail__track::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.72) 50%,
    transparent 100%
  );
  width: 40%;
  animation: engagement-flow 3.2s ease-in-out infinite;
}

@keyframes engagement-flow {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

.engagement-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-5);
  padding: 0 var(--space-4) var(--space-8);
  position: relative;
}

/* Numbered circle node — sits on the track line */
.engagement-step__node {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1.5px solid var(--color-border-strong);
  background: var(--color-bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
  transition:
    border-color var(--transition-fast) ease,
    box-shadow var(--transition-fast) ease;
}

.engagement-step:hover .engagement-step__node {
  border-color: var(--color-accent);
  box-shadow: 0 0 1.25rem var(--color-glow);
}

/* Vertical connector between node and content card */
.engagement-step__node::after {
  content: "";
  position: absolute;
  bottom: -1.25rem;
  left: 50%;
  translate: -50% 0;
  width: 1px;
  height: 1.25rem;
  background: var(--color-border);
}

.engagement-step__number {
  font-size: 0.6875rem;
  font-weight: 600;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

/* Highlight the active/current step (step 02) */
/* Note: .engagement-rail__track is child 1, so steps are children 2-5 */
.engagement-rail > *:nth-child(3) .engagement-step__node {
  border-color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg-surface));
  box-shadow: 0 0 1rem var(--color-glow);
}

.engagement-rail > *:nth-child(3) .engagement-step__number {
  color: var(--color-accent);
}

.engagement-step__content h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.engagement-step__content p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

/* Mobile: vertical stack */
@media (max-width: 48rem) {
  .engagement-rail {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding-top: 0;
  }

  .engagement-rail__track {
    display: none;
  }

  .engagement-step {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
    padding: 0;
    gap: var(--space-5);
  }

  .engagement-step__node::after {
    display: none;
  }
}
```

---

## Task 6 — Hero blue flame particle refinement

### Context
`HeroFlameParticles` already exists and is already imported in `HeroSection.tsx`. The current colors blend blue, pink, and teal. The goal is to make this read clearly as a cool blue flame burning slowly.

### Step 1 — Adjust flame color variables in `styles/globals.css`

In the `:root` block (around lines 26–28), update:
```css
--color-flame-a: #456bff;   /* primary blue — unchanged */
--color-flame-b: #3d9fd0;   /* was #cf3aa9 pink — change to cool blue/cyan */
--color-flame-c: #66e6ff;   /* bright ice-blue tip */
```

In the `html.dark` block (around lines 77–79):
```css
--color-flame-a: #6d5cff;   /* indigo-blue — unchanged */
--color-flame-b: #3dc8d0;   /* was #ff4db8 pink — change to teal-blue */
--color-flame-c: #66e6ff;   /* ice — unchanged */
```

### Step 2 — Slow the flame animations in `styles/globals.css`

Update `.hero-flame__core` animation duration:
```css
.hero-flame__core {
  animation: hero-flame-flicker 7.2s ease-in-out infinite;  /* was 4.8s */
}
```

Update all 9 particle `--particle-duration` values (~1.4× slower):

| Class | Old duration | New duration |
|-------|-------------|-------------|
| `--1` | `5.6s` | `7.8s` |
| `--2` | `6.4s` | `9.0s` |
| `--3` | `5.1s` | `7.2s` |
| `--4` | `6.8s` | `9.5s` |
| `--5` | `5.9s` | `8.2s` |
| `--6` | `6.1s` | `8.6s` |
| `--7` | `5.3s` | `7.4s` |
| `--8` | `6.6s` | `9.2s` |
| `--9` | `5.8s` | `8.0s` |

### Step 3 — Add 3 more particles for a fuller flame

In `components/animation/HeroFlameParticles.tsx`, add `"hero-flame__particle--10"`, `"hero-flame__particle--11"`, `"hero-flame__particle--12"` to the `particleModifiers` array.

Add their CSS definitions in `styles/globals.css`:
```css
.hero-flame__particle--10 {
  --particle-left: 35%;
  --particle-size: 0.28rem;
  --particle-duration: 10.4s;
  --particle-delay: -5.6s;
  --particle-drift: 0.4rem;
}

.hero-flame__particle--11 {
  --particle-left: 48%;
  --particle-size: 0.52rem;
  --particle-duration: 8.8s;
  --particle-delay: -2.1s;
  --particle-drift: -1.3rem;
}

.hero-flame__particle--12 {
  --particle-left: 63%;
  --particle-size: 0.3rem;
  --particle-duration: 9.6s;
  --particle-delay: -6.3s;
  --particle-drift: 0.9rem;
}
```

### Step 4 — Light mode visibility

Add opacity to the `.hero-flame` block so the flame is visible against the light hero background:
```css
.hero-flame {
  filter: saturate(112%) brightness(0.96);
  opacity: 0.88;
}
```

---

## Task 7 — Glass buttons with neon border animation

### Goal
Redesign all `.button--primary` and `.button--ghost` to:
- Semi-transparent glass background with `backdrop-filter: blur`
- Flat — no gradient fill
- High-contrast border in accent color
- Continuous CSS `@keyframes` neon glow cycling through the brand palette

### Step 1 — Add keyframe animations to `styles/globals.css`

Add these before the `.button` block:

```css
@keyframes neon-border-cycle {
  0%   { box-shadow: 0 0 0.5rem 0 var(--color-flame-a), inset 0 0 0.5rem 0 transparent; }
  33%  { box-shadow: 0 0 1rem 0.5px var(--color-accent), inset 0 0 0.75rem 0 color-mix(in srgb, var(--color-accent) 6%, transparent); }
  66%  { box-shadow: 0 0 1rem 0.5px var(--color-flame-b), inset 0 0 0.75rem 0 color-mix(in srgb, var(--color-flame-b) 6%, transparent); }
  100% { box-shadow: 0 0 0.5rem 0 var(--color-flame-a), inset 0 0 0.5rem 0 transparent; }
}

@keyframes neon-border-cycle--subtle {
  0%   { box-shadow: 0 0 0.25rem 0 color-mix(in srgb, var(--color-flame-a) 60%, transparent); }
  50%  { box-shadow: 0 0 0.5rem 0 color-mix(in srgb, var(--color-accent) 50%, transparent); }
  100% { box-shadow: 0 0 0.25rem 0 color-mix(in srgb, var(--color-flame-a) 60%, transparent); }
}
```

### Step 2 — Replace `.button`, `.button--primary`, `.button--ghost` blocks

Replace the existing blocks (approximately lines 394–435):

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.625rem;
  border: 1.5px solid transparent;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    transform var(--transition-fast) ease,
    background-color var(--transition-fast) ease,
    border-color var(--transition-fast) ease,
    box-shadow var(--transition-fast) ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button--primary {
  background: color-mix(in srgb, var(--color-accent) 14%, transparent);
  border-color: var(--color-accent);
  color: var(--color-accent-bright);
  animation: neon-border-cycle 4s ease-in-out infinite;
}

.button--primary:hover {
  background: color-mix(in srgb, var(--color-accent) 22%, transparent);
  border-color: var(--color-accent-bright);
  animation-duration: 2s;
}

.button--ghost {
  background: color-mix(in srgb, var(--color-bg-surface) 38%, transparent);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
  animation: neon-border-cycle--subtle 5s ease-in-out infinite;
}

.button--ghost:hover {
  background: color-mix(in srgb, var(--color-bg-surface) 52%, transparent);
  border-color: color-mix(in srgb, var(--color-accent) 60%, var(--color-border-strong));
  color: var(--color-accent-bright);
  animation-duration: 2.5s;
}
```

### Step 3 — Light mode contrast overrides

Add after the button blocks:
```css
html:not(.dark) .button--primary {
  background: color-mix(in srgb, var(--color-accent) 10%, rgba(255, 255, 255, 0.6));
  color: var(--color-accent);
}

html:not(.dark) .button--ghost {
  background: rgba(255, 255, 255, 0.62);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}
```

### Note on inline `<a>` buttons
The product page at `app/(site)/products/[slug]/page.tsx` uses `<a className="button button--primary">` and `<a className="button button--ghost">` directly. These inherit all CSS changes automatically — no JSX edits needed for this task.

---

## Task 8 — Remove "flagship" from all copy

Replace all user-facing and internal occurrences of "flagship"/"Flagship"/"FLAGSHIP". The section anchor `#flagships` → `#systems`.

### 1. `components/layout/Header.tsx` (line 11)
```ts
// Change:
{ href: "#flagships", label: "Flagships" },
// To:
{ href: "#systems", label: "Systems" },
```

### 2. `components/layout/Footer.tsx` (line 9)
```tsx
// Change:
<p>© 2026 Teambotics. Flagship AI products for operations, creativity, and narrative systems.</p>
// To:
<p>© 2026 Teambotics. Applied AI products for operations, creativity, and narrative systems.</p>
```

### 3. `components/home/HeroSection.tsx` (lines 42–43)
```tsx
// Change:
<Button className="hero__action-button hero__action-button--primary" href="#flagships">
  Review Flagships
</Button>
// To:
<Button className="hero__action-button hero__action-button--primary" href="#systems">
  Review Systems
</Button>
```

### 4. `components/home/LiveSystemsSection.tsx` (lines 12 and 16)
```tsx
// Change section id:
<section className="section section--border" id="flagships">
// To:
<section className="section section--border" id="systems">

// Change eyebrow prop:
eyebrow="FLAGSHIP PORTFOLIO"
// To:
eyebrow="AI SYSTEMS PORTFOLIO"
```

### 5. `components/home/HomeCTASection.tsx` (lines 27–28)
```tsx
// Change:
<Button href="#flagships" variant="ghost">
  Review flagships
</Button>
// To:
<Button href="#systems" variant="ghost">
  Review our systems
</Button>
```

### 6. `lib/og.tsx` (lines 48 and 60)
```tsx
// Line 48 — Change:
FLAGSHIP AI PRODUCT STUDIO
// To:
APPLIED AI PRODUCT STUDIO

// Line 60 — Change:
<span>Building flagship</span>
// To:
<span>Building applied</span>
```

### 7. `lib/products.ts` (line 44)
```ts
// LTB Buddy label — Change:
label: "Flagship Product",
// To:
label: "Live Product",
```

### 8. `e2e/smoke.spec.ts` (line 3)
```ts
// Change:
test("homepage exposes flagship product case studies", ...
// To:
test("homepage exposes product case studies", ...
```

---

## Execution order recommendation

1. **Task 8** first — pure find-and-replace copy work, zero visual side-effects. Establishes correct copy baseline.
2. **Task 2** — single-line URL change, zero risk.
3. **Task 3** — extend products mapping and update LiveSystemsSection. Self-contained data + JSX change.
4. **Task 4** — small addition to product page template. Self-contained.
5. **Task 7** — button redesign in CSS. Apply globally before tasks 1/5/6 so everything visually aligns in a single review pass.
6. **Task 5** — engagement diagram layout, builds on updated CSS.
7. **Task 6** — flame particle refinement, CSS already open.
8. **Task 1** — SVG logo last because it may require visual iteration to confirm paths match the PNG at 28px.

---

## Definition of done (per task)

- **Task 1**: Header displays icon + "Teambotics" text. Icon visible in both light and dark mode. PNG `<img>` fallback used with a comment if SVG paths are imprecise at 28px.
- **Task 2**: Clicking "Open Live Product" on the LTB Buddy case study page navigates to `https://ltbbuddy.ca/` in a new tab.
- **Task 3**: Each product card on the landing page shows both a "Read case study" link and a live product CTA button.
- **Task 4**: Product case study pages show the external product button as the first (primary) action and a "← All products" back-navigation link.
- **Task 5**: Engagement section shows 4 cards connected by a horizontal path line with a flowing shimmer animation. Stacks cleanly on mobile (track hidden, cards vertical).
- **Task 6**: Hero flame reads as blue/cool — no pink or magenta visible in flame colors. Burns slowly. Lightweight (CSS variables only, no canvas/JS animation libraries).
- **Task 7**: All `.button--primary` and `.button--ghost` are glassy, flat (no solid gradient fill), with animated neon border glow. Readable in both light and dark mode.
- **Task 8**: `grep -r "flagship\|Flagship\|FLAGSHIP"` across `components/`, `lib/`, `app/`, `e2e/` returns zero results.
