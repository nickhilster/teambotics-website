# First-party subpage design drift audit

Source: local production build of this checkout, inspected November 21, 2026. Reference: mounted homepage at `/`, implemented by `components/home/ConsultancyHome.tsx` and `ConsultancyHome.module.css`. This is **not** a production-wide visual certification; the live domain was sampled separately for `/` and `/manifesto`, and the local review-only case studies are not deployed.

## Reference

The homepage uses cream `#fbfaf5`, paper `#f2f3ec`, deep green `#193127`, sage-muted text `#4d6256`, thin green-gray rules, Geist Sans with tightly tracked display type, uppercase Geist Mono eyebrows, square bordered cards and broad editorial spacing. Its scoped CSS overrides the older global neon-dusk system.

## Observed

| Route / group | Finding | Evidence |
| --- | --- | --- |
| `/case-studies/marketing-prototype`, `/case-studies/ikoki` | Aligned locally in this change: cream/sage editorial styling, flat image framing and square surfaces. Still review-only/noindex. | `components/case-studies/CaseStudyContent.tsx` and `.module.css`; local browser showed deep-green headings. |
| `/about` | Drifts: old global palette and layout; heading computed as `rgb(21, 25, 53)` rather than homepage `rgb(25, 49, 39)`. | `app/(site)/about/page.tsx`, `styles/globals.css`; local browser. |
| `/manifesto` | Strong drift: self-contained dark blue/teal gradient page, system-ui font and pill/rounded cards. Same treatment observed in live HTML at `www.teambotics.app/manifesto`. | `app/(site)/manifesto/page.tsx`; local browser; live HTTP. |
| `/products/[slug]`, including `/products/ltb-buddy` | Drifts: legacy product hero, neon-dusk globals and rounded/glowing cards. Local heading computed `rgb(21, 25, 53)`. Localized variants share the content component. | `components/products/ProductCaseStudyContent.tsx`, `styles/globals.css`; local browser. |
| `/privacy`, `/terms` | Typography and page color still rely on older global tokens; `/privacy` local heading computed `rgb(21, 25, 53)`. Legal content should remain intact while restyling. | `app/(site)/privacy/page.tsx`, `app/(site)/terms/page.tsx`, `styles/globals.css`; local browser sample. |
| `/land-acknowledgment`, `/financebuddy` | Local heading still uses old global ink (`rgb(21, 25, 53)`); needs dedicated visual review before restyling. | Local browser sample; route source. |
| `/non-profit` | Existing uncommitted draft, not modified in this work. Its design and publication status require owner review separately. | `app/(site)/non-profit/` present in working tree; `robots` noindex in source. |

Other route families exist in the repository (`/BOSS`, `/poko`, `/symphony`, `/admin`, legacy product aliases and product microsites). They are distinct applications, gated tools or historical routes; they were not visually certified against the consultancy landing page in this pass. Do not interpret presence in the build as proof they are linked from the current public homepage.

## Follow-up

Restyle the first-party `/about`, `/manifesto`, product detail routes and legal pages against the homepage, preserving claims, localization, legal copy, and route semantics. Scope each group as a separate reviewable change. Audit remaining reachable first-party pages and mobile viewports before declaring full-site visual parity. No publication or deployment was performed here.
