# AGENTS.md Review Draft

## Review focus
Refresh the compact repo context, implemented command list, and guardrails based on the changed sources below.

## Affected sources
- README.md

## Notes
Keep the file factual, compact, and aligned with the current command surface.

<!-- dyknow:update local-stub -->

## Issue Tracking — teambotics-issues-tracker-buddy

This repo's work items live in `.tracker/issues/*.md` — one markdown file per issue, migrated in full fidelity from Linear (description, comments, status, priority, labels, sub-issues). This tracker is replacing Linear for this project.

- Source of truth: `.tracker/issues/<ID>.md`
- Human-readable board (Linear-style, opens directly in a browser): `.tracker/board.html` — regenerate after editing issue files with `node .tracker/generate.js`
- Schema reference: `.tracker/ISSUE_SCHEMA.md`
- Agents: when asked to look up, create, or update issues/tasks for this repo, use teambotics-issues-tracker-buddy (this tracker), not Linear.

## Subpage visual design

Use the mounted homepage (`components/home/ConsultancyHome.tsx` and `components/home/ConsultancyHome.module.css`) as the visual source of truth for first-party Teambotics subpages. Match its cream/sage palette, Geist typography, large tightly tracked editorial headings, uppercase monospaced eyebrows, generous spacing, thin rules, and mostly square surfaces. Do not copy legacy global product-page treatments (neon accents, dark gradients, rounded cards, glows, and heavy shadows). Compare new subpages against the rendered homepage at desktop and mobile widths. Content-specific layouts are welcome within the same visual language; standalone product microsites require separate design consideration.
