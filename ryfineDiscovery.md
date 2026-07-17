# RyFine Discovery — generate or update RyFineCI.md

This file tells any coding agent (Claude Code, Cursor, Copilot, Windsurf, or similar)
how to produce or refresh `RyFineCI.md` at the root of this repository. `RyFineCI.md`
is a compact, high-signal context file that RyFine (ryfine.app) reads instead of
scanning raw repo files — it exists to save tokens and give RyFine (and any other
agent) accurate, current context about this codebase without re-deriving it every
time.

## Before you start

1. Check whether `RyFineCI.md` already exists at the repo root.
   - **If it does not exist:** follow "Creating RyFineCI.md" below.
   - **If it exists:** read its header for the last recorded commit SHA, then follow
     "Updating RyFineCI.md" below — do not regenerate the whole document from scratch.

## Creating RyFineCI.md

Investigate the repository (its structure, manifests, README, config files, tests, and
recent commit history) and write `RyFineCI.md` with exactly these sections, in this
order:

```markdown
# RyFine CI Context

> Last updated: <ISO 8601 timestamp, UTC> · commit `<short SHA>` · RyFineCI process v1

## Overview
<One paragraph: what this repo/product is and does.>

## Architecture
<What lives where and why — a map, not a file listing.>

## Stack
<Languages, frameworks, key dependencies and their versions.>

## Conventions
<Things a new agent would get wrong without being told: naming patterns, testing
approach, where config/rules live, anything explicitly off-limits.>

## Entry points
<How to run, build, and test this repo.>

## Gotchas
<Non-obvious constraints, past incidents, things that look like bugs but aren't.>
```

Rules:
- Prose density over completeness. Do not paste code, do not list every file, do not
  write a changelog.
- Target **under 8,000 characters** total. If you're over, cut detail from
  Architecture/Conventions before cutting the header or Overview.
- Write for an agent that has never seen this repo before, seeing this doc for the
  first time.

## Updating RyFineCI.md

1. Read the existing `RyFineCI.md` and note its recorded commit SHA.
2. Run `git log --oneline <recorded-sha>..HEAD` (or equivalent) to see what's changed
   since.
3. Only re-investigate and rewrite the sections affected by those commits — leave
   everything else as-is. Do not re-derive the whole repo from scratch.
4. Update the header line with the current timestamp and current HEAD commit SHA.
5. If nothing meaningful changed, just update the header timestamp/SHA and leave the
   body untouched.

## When you're done

1. Make sure this file (`ryfineDiscovery.md`) itself is present at the repo root — if
   it's missing, write it back verbatim so the next run doesn't need RyFine's UI
   again.
2. Commit both `ryfineDiscovery.md` and `RyFineCI.md` with a clear commit message
   (e.g. `chore: update RyFineCI.md context`).
3. Push to the current branch. If this repository requires pull-request review before
   merging to its default branch, open a PR instead of pushing directly.
4. Tell the human you're done, and mention whether the file was created or updated.
