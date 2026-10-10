# Teambotics Website

Public Next.js website for Teambotics, deployed through Vercel. The homepage presents one AI consultancy entry point, then shows the workflow method, proposals, published products, and paid prototype work as separately labeled evidence. Product detail routes remain available.

The homepage lives in `app/(site)/page.tsx` and `components/home/ConsultancyHome.tsx`, with scoped styles in `ConsultancyHome.module.css`. Its English, French Canadian, and Latin American Spanish copy is maintained together in that component. The shared lead form posts to `/api/leads`; a booking URL has not yet been added.

The earlier product sections remain in `components/home/` but are no longer mounted on the homepage. The consultancy draft is intended for `testing.teambotics.app` before any production cutover.

## Teambotics Values (blog.teambotics.app/values)

The blog publishes a self-updating "Teambotics Values" page, written for both human readers and AI agents:

- Human page: `https://blog.teambotics.app/values`
- Agent-readable markdown mirror: `https://blog.teambotics.app/values.md`
- Underlying structured data: `https://www.teambotics.app/api/values`

The values are hand-maintained in `lib/values/values.json`, model-agnostic by design: no LLM API call, no cron, no DB. Whichever agent publishes a post (via `scripts/create-blog-post.ts` or a seed script) re-scans the archive against the file and updates it in the same change if the new post evidences a value not yet captured. `app/api/values/route.ts` just serves that file as-is.

The blog page (`blog/src/pages/values.astro`) and its markdown mirror (`blog/src/pages/values.md.ts`) both fetch `/api/values` at request time.

This deliberately does not cover posts published directly through the `/admin/blog` self-serve UI without an agent in the loop — the page can go stale after one of those until an agent next touches the blog. If self-serve publishing becomes the normal path rather than the exception, this should move to event-driven synthesis (trigger an LLM call from the admin publish action itself) instead.

## Stack

- Framework: Next.js 16
- UI: React 19, TypeScript, Tailwind CSS 4, custom CSS variables
- Motion: Framer Motion
- Icons: Lucide React
- Analytics: Vercel Analytics and Speed Insights
- AI/data integrations: OpenAI, Neon serverless, Octokit
- Deployment: Vercel

## Local Development

```bash
pnpm install
pnpm dev
```

Open the local Next.js dev server shown by the terminal, usually `http://localhost:3000`.

## Quality Gates

Run these before deployment or merge:

```bash
pnpm translations:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Notes:

- `prebuild` runs `pnpm translations:sync`.
- `pretypecheck` runs `pnpm translations:check`.
- The homepage copy is manually localized in `ConsultancyHome.tsx`. Changes to `lib/i18n/siteMessages.source.ts` or product translation sources require `pnpm translations:sync` and a review of generated translations.
- `pnpm lint` currently reports errors in unrelated existing files; assess changed files separately until the repo-wide lint baseline is fixed.

## Deployment

The proposed release path is a dedicated Preview branch on `testing.teambotics.app`, followed by a reviewed merge to production for `www.teambotics.app`. Verify rendered content and the contact form on each hostname; a successful Vercel build alone is insufficient. The RBH and IKOKI cards contain text only while sanitized visuals are prepared.

## Commit Convention

Use direct, scoped commit messages such as:

```txt
feat: add consultancy homepage
docs: describe staging release path
```

<!-- dyknow-dogfood-marker: 2026-05-24 -->
