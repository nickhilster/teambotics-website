# First-party subpage design drift audit

**Scope and evidence:** Live browser inspection of `https://www.teambotics.app` and sampled routes on November 21, 2026; current production deployment is from `main` at `c4aad9877893e546920300e3f10078cc8a3f193a`. Local production-build/browser checks also covered the two case-study routes in this release branch. This is a sampled visual audit, not certification of every route, viewport, or locale.

## Reference

The mounted homepage uses a cream/sage editorial system: cream `#fbfaf5`, paper `#f2f3ec`, ink `#193127`, muted green `#4d6256`, Geist Sans, tightly tracked large headings, monospaced uppercase eyebrows, fine rules, and flat, mostly square surfaces. On the live homepage, the H1 computed to deep green and Geist Sans; homepage cards were square with no shadow.

## Findings

| Route | Result | Observed evidence |
| --- | --- | --- |
| `/about` | Aligned in sampled view | Live H1 is Geist Sans and deep green (`rgb(25, 49, 39)`); sampled body copy uses muted green (`rgb(77, 98, 86)`). |
| `/privacy`, `/terms` | Aligned in sampled view | Live H1/H2 use the homepage's Geist/deep-green treatment; sampled body text and eyebrow styles use the sage/monospaced palette. Preserve legal copy in any future visual change. |
| `/products/ltb-buddy` | Aligned in sampled view | Live page uses the editorial heading/body colors and square, shadowless focus cards. Other product slugs share the detail implementation, but were not all visually opened. |
| `/land-acknowledgment` | Aligned in sampled view | Live H1 and body copy use the editorial green palette; eyebrow is monospaced. |
| `/everythings-computer` | Aligned in sampled view | Live page uses Geist Sans, deep-green headings, muted green supporting copy, and a flat square paper surface. |
| `/manifesto` | **Drifts** | Live page uses system-ui, cyan accents, white text on dark styling, and rounded cards with heavy shadows, unlike the homepage's cream/sage editorial design. Source: `app/(site)/manifesto/page.tsx`. |
| `/case-studies/marketing-prototype`, `/case-studies/ikoki` | Added in this release branch; not on current production `main` | Local production-build/browser checks verify cream/deep-green styling, square image frames and `noindex, nofollow`. The marketing-prototype page is deliberately limited to that description. |

Independent product microsites and separate route families/tools (including Take It and Go, Muse, Poko, BOSS, Symphony, and admin surfaces) are outside the first-party subpage comparison. Their different design systems and deployment boundaries were not evaluated for landing-page parity. This audit also does not certify every localized route or mobile viewport.

## Follow-up

The manifesto page is the confirmed first-party visual drift. The other sampled first-party pages appear aligned with the current landing-page system. If full-site parity is required, inspect every product slug, localized route, and mobile viewport; do not treat this sample as complete certification. No production deployment has been made by this audit artifact itself.
