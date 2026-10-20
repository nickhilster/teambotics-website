# Take It and Go — Layered Picks ("Russian Doll" Depth)

## Problem

Every pick on `takeitandgo.teambotics.app` is currently a single flat card:
category, language, name, description, "why we picked it," and a GitHub link.
There is no way to go deeper on a pick, and nothing on the card signals that
there might be more worth digging into. The goal of this change is to make
picks reward curiosity — each card should visibly hint at more underneath it,
and digging into one pick should naturally lead into others.

## Scope

This applies to `takeitandgo/src/pages/index.astro` (the only page in the
site) and its styles in `takeitandgo/src/styles/site.css`. No new pages,
no backend, no database — the site stays a single static Astro page.

## Data model changes

Extend the existing `Project` type with two new hand-written fields, filled
in for all 12 existing picks:

```ts
type Project = {
  name: string;
  category: string;
  language: string;
  description: string;
  why: string;
  repo: string;
  audience: string;   // new — one line on who should grab it
  quickstart: string;  // new — a single copy-pasteable command/snippet
};
```

`related` picks are **not** a stored field. They are computed at render time:
other projects sharing the same `category`, excluding the current project,
capped at 3. If a category has no other members, the related-picks section
is simply omitted for that pick.

## Live GitHub stats (build-time only)

In the Astro frontmatter (runs at build time, not in the browser), fetch
each pick's repo stats from `https://api.github.com/repos/{owner}/{repo}`
in parallel via `Promise.all`, parsing `owner/repo` out of the existing
`repo` URL. Pull:

- `stargazers_count` → star count
- `pushed_at` → rendered as "updated Xd/Xmo ago"
- `open_issues_count`

Failure handling: if a fetch fails, times out, or the build hits GitHub's
unauthenticated rate limit, that pick's stats are `null` and the stats layer
is omitted for that card — this must never fail the build. Log a
`console.warn` per failed fetch so it's visible in Vercel build logs.
Numbers are only as fresh as the last deploy; this is an accepted trade-off
for keeping the site fully static with zero client-side API calls.

## Card interaction — the "doll"

**Closed state** (default, current visual design retained): category,
language, name, description — plus a new **teaser row** of small muted text
built from whatever loaded successfully, e.g. `Quickstart · 3 related ·
★ 34.2k`. The teaser is what tells the user there's more before they click.

**Expanding**: clicking anywhere on a card expands it in place within the
grid (siblings reflow around it), revealing, in this order:

1. "Why we picked it" (existing `why` field, promoted to the top of the
   expanded content)
2. "Who it's for" (new `audience` field)
3. "Try it" — the `quickstart` snippet in a `<pre>` block
4. Live stats strip (stars / last updated / open issues) — entirely hidden
   if that data didn't load
5. "Related picks" — up to 3 chips (name + category) for other same-category
   picks
6. Existing "View on GitHub" link

**Chaining**: clicking a related-pick chip scrolls to that card, closes the
currently expanded card, and expands the target card. This is the actual
"digging" mechanic — a user can hop from pick to pick via related chips.

**Accordion behavior**: only one card is expanded at a time. Opening a card
closes any other open card.

**Interaction with search/filter**: changing the search query or the active
category chip collapses any expanded card (so a hidden expanded card can't
linger open off-screen after a filter removes it from view).

## Out of scope

- Hand-curated related-pick pairings (using auto category-based relation
  instead)
- Client-side/live-refreshing GitHub stats
- Any new page/route — everything stays within `index.astro`
- Analytics or tracking of how deep users dig

## Testing / verification

No automated test suite exists in this project. Verification is manual via
the Astro dev server:

- Confirm the build-time GitHub fetch succeeds for all 12 picks, and confirm
  the site still builds cleanly if a fetch is forced to fail (e.g. temporarily
  pointing one `repo` at a bad path) — the affected card should just omit its
  stats layer, not break the page.
- Click through: expand a card, confirm all five deeper-layer pieces render
  correctly, collapse it, expand another.
- Click a related-pick chip and confirm it scrolls to and expands the target
  card while collapsing the origin card.
- Check a category with only one member (if any exist after edits) to confirm
  the related-picks section is omitted gracefully rather than rendering empty.
- Change the search query / category filter while a card is expanded and
  confirm it collapses.
