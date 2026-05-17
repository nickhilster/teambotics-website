# Translation Automation

English copy is the source of truth.

Edit these files:

- `lib/i18n/siteMessages.source.ts` for shared site copy
- `lib/products.ts` for product copy

Generated translation artifacts live in `lib/i18n/generated/`.

## Local workflow

- `pnpm content:watch`
  Watches the English copy sources and runs translation sync automatically after every save.

- `pnpm content:sync`
  Runs translation sync and then typecheck.

- `pnpm translations:check`
  Fails if generated French or Spanish artifacts no longer match the English source.

## Environment requirements

Automatic translation sync requires `OPENAI_API_KEY`.

Optional override:

- `OPENAI_TRANSLATION_MODEL`

If `OPENAI_API_KEY` is missing:

- `pnpm translations:check` still works
- stale translations will fail validation
- automatic regeneration will not run

## CI

GitHub Actions runs `translations:check`, typecheck, targeted localization tests, and a production build on pull requests and pushes to `main`.

Workflow file:

- `.github/workflows/translation-integrity.yml`

## Vercel

Vercel builds run `prebuild`, which already calls `pnpm translations:sync`.

Set this environment variable in Vercel:

- `OPENAI_API_KEY`

Recommended optional variable:

- `OPENAI_TRANSLATION_MODEL`

Without `OPENAI_API_KEY`, a stale translation state will fail the build instead of silently drifting.