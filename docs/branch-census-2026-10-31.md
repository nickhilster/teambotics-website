# Teambotics website remote branch census

Snapshot: 2026-10-31, after `git fetch --no-tags origin refs/heads/*:refs/remotes/origin/*`. Actual remote heads counted with `git ls-remote --heads origin`: **31** including `main`. Every branch has a merge base with fetched `origin/main` (8fbb3d7d20); zero branches lack one. Unique commits are branch-tip commits not reachable from `origin/main`; unique paths are `git diff origin/main...branch`. Last commit dates are committer dates.

| Branch | Tip | Last commit date / subject | Merge base | Unique commits | Unique paths |
|---|---|---|---|---:|---|
| `adapt-feedbackfish-case-study` | `24e46ff236` | 2026-06-11: Map FeedbackFish subdomain in middleware | `ada766dfa9` | 5 | `app/feedbackfish/layout.tsx`<br>`app/feedbackfish/page.tsx`<br>`middleware.ts` |
| `blog/refine-human-work-post` | `a3eb789c5d` | 2026-07-15: Rewrite human work post in executive founder voice | `d34b9bbef4` | 3 | `blog/public/thumbnails/software-should-give-your-team-more-time-with-people.svg`<br>`blog/src/lib/thumbnail.ts`<br>`scripts/seed-blog-post-more-human-work.ts` |
| `blog/software-that-gives-time-back` | `7c634f2f41` | 2026-07-15: Add client-facing post on software that gives teams time back | `7c634f2f41` | 0 | — |
| `blog/workflow-intelligence-series` | `e160367632` | 2026-05-26: Add workflow intelligence blog post seed script | `e160367632` | 0 | — |
| `brand/learn-commit-push-2026-10-26` | `931969c089` | 2026-10-26: editorial: distinguish misinformation/disinformation and qualify source verification | `931969c089` | 0 | — |
| `brand/teambotics-canonical-rule` | `1bda193cb6` | 2026-10-01: feat(redirects): send FeedbackFish to NikDesign | `ac55b39fd4` | 3 | `.agentsurface/config.yaml`<br>`.agentsurface/generated/pages/feedbackfish.md`<br>`.agentsurface/model/routes.json`<br>`.agentsurface/model/site.json`<br>`TEAMBOTICS_CONTEXT.md`<br>`app/(site)/about/page.tsx`<br>`app/(site)/manifesto/page.tsx`<br>`app/(site)/page.tsx`<br>`app/easybuddy/layout.tsx`<br>`app/easybuddy/page.tsx`<br>`components/home/ProductFlagshipSections.tsx`<br>`components/home/ProductsSection.tsx`<br>`components/seo/OrganizationStructuredData.tsx`<br>`docs/CLAUDE_COMPANY_DOCUMENTATION_PLAN.md`<br>`docs/COPILOT_NEXT_SPRINT_PLAN.md`<br>`docs/chatbot-grounding-faq.md`<br>`docs/product-summaries.md`<br>`docs/terms-of-use-draft.md`<br>`e2e/smoke.spec.ts`<br>`lib/chat/evaluators.ts`<br>`lib/chat/knowledge.ts`<br>`lib/chat/runtime.ts`<br>`lib/config.ts`<br>`lib/i18n/generated/productTranslations.es-419.ts`<br>`lib/i18n/generated/productTranslations.fr-CA.ts`<br>`lib/i18n/generated/productTranslations.meta.ts`<br>`lib/products.test.ts`<br>`lib/products.ts`<br>`lib/redirects.test.ts`<br>`middleware.ts`<br>`next.config.ts`<br>`public/llms.txt`<br>`scripts/sync-translations.ts` |
| `claude/blog-thumbnail-hero-redesign-23c30d` | `c4740c2fd5` | 2026-07-10: Simplify hero and unify remaining thumbnail designs | `c4740c2fd5` | 0 | — |
| `claude/fix-mdownmanager-copy` | `f7eefbb068` | 2026-06-20: Fix stale products routes test snapshot | `949dc93e4e` | 3 | `app/MdownManager/page.tsx`<br>`lib/i18n/generated/productTranslations.es-419.ts`<br>`lib/i18n/generated/productTranslations.fr-CA.ts`<br>`lib/i18n/generated/productTranslations.meta.ts`<br>`lib/products.test.ts` |
| `claude/git-branches-blog-post-4d5ca1` | `86f96f5472` | 2026-07-10: Fix blog vercel.json output directory for Astro | `43e4ee267c` | 2 | `blog/public/thumbnails/git-branches-and-the-things-we-leave-behind.svg`<br>`blog/src/data/static-posts.ts`<br>`blog/vercel.json` |
| `claude/land-acknowledgement-page-csscup` | `d66e7cf82c` | 2026-06-20: Add land acknowledgment link to hero section | `860937b5de` | 2 | `app/(site)/land-acknowledgment/page.tsx`<br>`app/(site)/page.tsx`<br>`components/home/HeroSection.tsx`<br>`components/home/LandAcknowledgmentStrip.tsx`<br>`components/layout/Footer.tsx`<br>`styles/globals.css` |
| `claude/logo-link-products-section-42addc` | `0df5ac4283` | 2026-06-19: fix: add logo aria-label + hover state; add Products section to homepage | `a8d4f2c507` | 1 | `app/(site)/page.tsx`<br>`components/home/ProductsSection.tsx`<br>`components/layout/Header.tsx`<br>`styles/globals.css` |
| `claude/ryfine-discovery-ci-context-d3d79e` | `680132279d` | 2026-07-17: Add RyFineCI.md context file for RyFine agent discovery | `c27038958d` | 1 | `RyFineCI.md`<br>`ryfineDiscovery.md` |
| `claude/social-sharing-hero-text-8ljapq` | `853bf700c3` | 2026-07-09: Add workflow to delete Neon preview branch on PR close | `9d8b4617bf` | 1 | `.github/workflows/neon-preview-cleanup.yml` |
| `claude/take-it-and-go-page-vcegew` | `0d507a4971` | 2026-07-10: Turn Take It and Go into a working curation product | `919ff00bb3` | 1 | `takeitandgo/postcss.config.mjs`<br>`takeitandgo/src/pages/index.astro`<br>`takeitandgo/src/styles/site.css` |
| `claude/teambotics-land-acknowledgment-S34os` | `24606ffa48` | 2026-06-05: Add land acknowledgment strip to home page landing section | `a545e8be9e` | 3 | `app/(site)/land-acknowledgment/page.tsx`<br>`app/(site)/page.tsx`<br>`app/api/blog/posts/route.ts`<br>`components/home/LandAcknowledgmentStrip.tsx`<br>`components/layout/Footer.tsx`<br>`lib/i18n/generated/siteMessages.es-419.ts`<br>`lib/i18n/generated/siteMessages.fr-CA.ts`<br>`lib/i18n/generated/siteMessages.meta.ts`<br>`styles/globals.css` |
| `claude/website-copy-refinement-h8rpe8` | `2eb608c3d3` | 2026-07-10: Fix RecruiterBuddy externalUrl to satisfy https:// test constraint | `6854910378` | 2 | `app/(site)/recruiterbuddy/page.tsx`<br>`lib/i18n/generated/productTranslations.meta.ts`<br>`lib/products.ts`<br>`next.config.ts` |
| `codex/website-overhaul-spec` | `b3fa46e632` | 2026-10-10: release: align proof labels and manual lead checks | `b3fa46e632` | 0 | — |
| `company-manifesto-page` | `58991f68f0` | 2026-06-29: Retrigger manifesto preview deployment | `b92feba481` | 3 | `app/manifesto/layout.tsx`<br>`app/manifesto/page.tsx` |
| `copilot/create-blog-posts-on-automation` | `1abf1d2deb` | 2026-05-19: feat(blog): add 10 AI/agentic-AI workflow blog posts seed script | `1abf1d2deb` | 0 | — |
| `copy/corporate-landing-page` | `18a0310d6e` | 2026-05-27: Update landing page copy tone | `18a0310d6e` | 0 | — |
| `feat/agentsurface-main-site` | `4149252549` | 2026-09-18: feat: generate llms.txt and Markdown alternates for the main site | `4149252549` | 0 | — |
| `feat/language-switcher` | `7de00f7665` | 2026-05-17: Merge remote-tracking branch 'origin/main' into feat/language-switcher | `7de00f7665` | 0 | — |
| `feat/poko-x64-download-link` | `08b6268f9f` | 2026-09-02: feat(poko): wire the download buttons to the real x64 installer | `08b6268f9f` | 0 | — |
| `feat/visual-storytelling` | `7908a1dba2` | 2026-05-23: chore(scripts): swap Anthropic SDK for OpenAI SDK | `7908a1dba2` | 0 | — |
| `feature/ryfine-flagship-positioning` | `ca3324ee01` | 2026-06-11: test: include RyFine in product routes | `84aa90b412` | 10 | `README.md`<br>`app/(site)/page.tsx`<br>`components/home/RyfineFlagshipSection.tsx`<br>`lib/i18n/generated/productTranslations.meta.ts`<br>`lib/i18n/productTranslations.supplemental.ts`<br>`lib/localizedProducts.ts`<br>`lib/products.test.ts`<br>`lib/products.ts`<br>`public/media/ryfine-feature-map-banner.svg` |
| `fix-feedbackfish-link-integrity` | `22b88dfa01` | 2026-06-11: Fix FeedbackFish canonical URL | `860237d4f7` | 1 | `app/feedbackfish/layout.tsx` |
| `fix/poko-download-public-releases-repo` | `aecf62658e` | 2026-09-02: fix(poko): point downloads at a public releases repo, not the private one | `aecf62658e` | 0 | — |
| `instinct/tagline-ambedkar-dots` | `6c96de2650` | 2026-10-27: Tagline: Learn, Commit, Push... with the three dots linking to Ambedkar's Educate, Agitate, Organize | `6c96de2650` | 0 | — |
| `main` | `8fbb3d7d20` | 2026-10-30: tracker: regenerate board for TBW-005 | `8fbb3d7d20` | 0 | — |
| `publish/agent-operating-modes` | `e3bf1a144f` | 2026-09-24: publish: add agent operating modes article | `47f8391c04` | 1 | `blog/src/data/static-posts.ts` |
| `site-group-manifesto-page` | `c3544b1c95` | 2026-06-29: Add company manifesto page in site route group | `b92feba481` | 1 | `app/(site)/manifesto/page.tsx` |

## Disposition recommendation

- Keep `main`.
- Keep `claude/ryfine-discovery-ci-context-d3d79e` while open PR #26 is reviewed.
- Branches with unique commits and no open PR should be ported or explicitly abandoned before deletion; their unique commits and paths are itemized above.
- Branches with zero unique commits and no open PR are deletion candidates because their complete commit histories are already reachable from `main`.
- **No branch was deleted.** This census is evidence for Nik to review, not authorization to delete.

## Local-only refs

The checked-out local branch `feature/takeitandgo-extraction` is clean and points to `859ffa031d4bf7b8511bffe245b49cd818dad702` (“Prepare Take It and Go public extraction”, 2026-10-20). It has one commit not reachable from any current remote head and must be preserved. Local `main` and `codex/symphony-full-credit-fit-report` have no unpublished commits relative to fetched `origin/main`.
