# Teambotics Website

Public product and company website for Teambotics, built as a Next.js application and deployed through Vercel.

The site positions Teambotics around applied AI systems, workflow automation, product strategy, and deployable operating infrastructure. As of this update, **RyFine** is treated as the flagship product surface: the clearest live example of the Teambotics thesis that better AI outcomes begin with clearer human intent, grounded context, and controlled execution.

## RyFine Flagship Integration

RyFine is now featured directly after the homepage hero as the primary product pathway. The integration highlights:

- Prompt refinement from rough instruction to professional-grade prompt
- Repo and project context as grounding inputs
- A/B model comparison for stronger output selection
- Local-first privacy options through BYOK and local providers
- Direct user journey links to `https://ryfine.app/` and `https://ryfine.app/about`

The homepage section uses a self-contained React component at:

```txt
components/home/RyfineFlagshipSection.tsx
```

The supporting visual asset is copied from the RyFine repository source of truth:

```txt
public/media/ryfine-feature-map-banner.svg
```

The section is mounted in:

```txt
app/(site)/page.tsx
```

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

Run these before deployment or before merging a product-positioning branch:

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
- Avoid editing localized product/message source files unless generated translation artifacts are also updated.

## Deployment Readiness

The RyFine flagship update is designed to require minimal manual configuration:

- No new environment variables are required.
- The section links externally to the live RyFine product and product page.
- The visual asset is stored locally under `public/media` to avoid runtime dependency on the RyFine repo.
- Styling is kept inside existing Tailwind and site utility conventions rather than requiring global stylesheet expansion.

## Commit Convention

Use direct, scoped commit messages such as:

```txt
feat: add RyFine flagship homepage section
feat: feature RyFine after homepage hero
refactor: keep RyFine flagship section self contained
docs: document RyFine flagship integration
```

<!-- dyknow-dogfood-marker: 2026-05-24 -->
