# teambotics-issues-tracker-buddy — issue file schema

Each issue is one markdown file at `.tracker/issues/<ID>.md` (e.g. `TEA-393.md`).

## Format

```
---
id: TEA-393
title: "Refresh desktop integration statuses after manual validation"
status: Todo
statusType: unstarted
priority: Medium
labels: [Release, PM]
assignee: Nikhil K
createdBy: Nikhil K
project: RyFine
milestone: Pro launch readiness sprint
parent: null
subIssues: [TEA-10, TEA-11]
createdAt: 2026-06-27T19:34:30.820Z
updatedAt: 2026-06-27T19:34:31.116Z
startedAt: null
completedAt: null
canceledAt: null
linearUrl: https://linear.app/teambotics/issue/TEA-393/...
gitBranchName: nickhilster/tea-393-...
---

## Description

<full issue description, markdown, verbatim from Linear (use get_issue for the
untruncated body — list_issues truncates long descriptions)>

## Comments

### <author name> — <ISO date>
<comment body, markdown>

### <author name> — <ISO date>
<comment body, markdown>
```

Rules:

- `statusType` must be one of: `backlog`, `unstarted`, `started`, `completed`, `canceled` (matches Linear's `statusType` exactly — the board generator groups columns by this field).
- `priority` is the human name (`Urgent`, `High`, `Medium`, `Low`, or omit/`None`).
- `labels`, `subIssues` are inline arrays `[a, b]` or omitted if empty — do not emit an empty `[]` with a trailing comment marker issue.
- Any field with no value should be `null`, not omitted, except `labels`/`subIssues` which can just be `[]` or omitted.
- If there are no comments, omit the `## Comments` section entirely.
- Skip fields Linear doesn't have for an issue (e.g. no milestone) — set to `null`.
- Keep the description as close to verbatim as possible — this is meant to fully replace Linear, so no summarizing or truncating.

## Generating the board

After all issue files are written, copy `generate.js` from `C:\DEV\_tracker-template\generate.js` into the repo's `.tracker/` directory and run:

```
node .tracker/generate.js
```

This produces `.tracker/board.html` — a self-contained, Linear-style board (open directly in a browser, no server/build step needed). Re-run it any time issue files change.
