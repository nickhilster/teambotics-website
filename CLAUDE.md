# CLAUDE.md

## Issue Tracking — teambotics-issues-tracker-buddy

This repo's work items live in `.tracker/issues/*.md` — one markdown file per issue, migrated in full fidelity from Linear (description, comments, status, priority, labels, sub-issues). This tracker is replacing Linear for this project.

- Source of truth: `.tracker/issues/<ID>.md`
- Human-readable board (Linear-style, opens directly in a browser): `.tracker/board.html` — regenerate after editing issue files with `node .tracker/generate.js`
- Schema reference: `.tracker/ISSUE_SCHEMA.md`
- Agents: when asked to look up, create, or update issues/tasks for this repo, use teambotics-issues-tracker-buddy (this tracker), not Linear.
