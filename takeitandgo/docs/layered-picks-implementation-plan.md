# Take It and Go — Layered Picks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn each flat pick card on takeitandgo.teambotics.app into an expandable "doll" that reveals audience/quickstart/live-GitHub-stats/related-picks layers, with related picks chaining into other cards.

**Architecture:** Everything lives in the single existing Astro page (`takeitandgo/src/pages/index.astro`) plus its stylesheet (`takeitandgo/src/styles/site.css`). Build-time frontmatter computes per-pick GitHub stats and related picks before render (no client API calls); the existing inline `<script>` gains accordion expand/collapse and related-pick-chaining behavior.

**Tech Stack:** Astro 5 (static output, no adapter), plain CSS custom properties, vanilla inline JS (no framework, no test runner in this project).

## Global Constraints

- No new pages/routes — stays a single static page (spec: "Scope").
- No client-side GitHub API calls — stats are fetched once at build time in frontmatter; a failed fetch must never fail the build, it just omits that pick's stats layer (spec: "Live GitHub stats").
- Related picks are computed automatically by shared `category`, capped at 3, no new stored field (spec: "Data model changes").
- Only one card expanded at a time (accordion); expanding a new card or changing search/filter collapses others (spec: "Card interaction — the doll").
- This project has no automated test framework. Verification for each task is `npm run build` (must succeed) plus `grep` against the built `dist/index.html` for expected markup, run from `takeitandgo/`.

---

## File Structure

- Modify `takeitandgo/src/pages/index.astro`:
  - `Project` type gains `audience` and `quickstart` fields; all 12 entries get real values.
  - New pure helpers: `slugify`, `relatedPicks`, `formatStars`.
  - New build-time async helpers: `formatUpdatedLabel`, `fetchGithubStats`, and the `githubStats` / `pickCards` computed arrays.
  - The `#project-grid` markup switches from mapping `projects` directly to mapping `pickCards`, with each card split into an always-visible `.project-card__toggle` button and a collapsible `.project-card__panel`.
  - The inline `<script>` gains `collapseAllCards` / `expandCard`, toggle-button listeners, related-chip listeners, and a one-line hook into the existing `applyFilters`.
- Modify `takeitandgo/src/styles/site.css`: new rules for `.project-card__toggle`, `.project-card__teaser`, `.project-card__panel`, `.project-card__audience`, `.project-card__quickstart` (+ `pre`/`code`), `.project-card__stats`, `.project-card__related`, `.related-chips`.

No other files are touched.

---

### Task 1: Data model — audience/quickstart fields + pure helpers

**Files:**
- Modify: `takeitandgo/src/pages/index.astro:10-129` (the `Project` type and `projects` array)

**Interfaces:**
- Produces: `Project` type now includes `audience: string` and `quickstart: string`. Produces `slugify(name: string): string`, `relatedPicks(project: Project, all: Project[]): Project[]`, `formatStars(count: number): string` — all defined at module (frontmatter) scope in `index.astro`, usable later in this same file's frontmatter and template.

- [ ] **Step 1: Write the failing check**

From `takeitandgo/`, run:

```bash
npm run build && grep -c "audience" dist/index.html; grep -c "class=\"project-card__quickstart\"" dist/index.html
```

Expected: build succeeds, but both `grep -c` calls print `0` (the fields/markup don't exist yet) — this confirms the check is currently failing to find the new content.

- [ ] **Step 2: Extend the `Project` type**

Replace:

```ts
type Project = {
  name: string;
  category: string;
  language: string;
  description: string;
  why: string;
  repo: string;
};
```

with:

```ts
type Project = {
  name: string;
  category: string;
  language: string;
  description: string;
  why: string;
  repo: string;
  audience: string;
  quickstart: string;
};
```

- [ ] **Step 3: Add `audience` and `quickstart` to every project entry**

Add an `audience` and `quickstart` field to each of the 12 objects in the `projects` array, in this exact order (matching the existing array order), inserting each pair right after that project's existing `repo` line:

```ts
  {
    name: "ripgrep",
    // ...unchanged fields above...
    repo: "https://github.com/BurntSushi/ripgrep",
    audience: "Anyone who still greps large trees by hand and wants an instant search that respects .gitignore.",
    quickstart: "rg 'TODO' --type js",
  },
  {
    name: "fzf",
    // ...
    repo: "https://github.com/junegunn/fzf",
    audience: "Terminal users who want fuzzy history search, file-jumping, and git checkout without memorizing exact paths.",
    quickstart: "brew install fzf && vim $(fzf)",
  },
  {
    name: "htmx",
    // ...
    repo: "https://github.com/bigskysoftware/htmx",
    audience: "Teams building small, sturdy UIs who don't want a full SPA framework's build step and bundle size.",
    quickstart: '<script src="https://unpkg.com/htmx.org"></script>',
  },
  {
    name: "Zod",
    // ...
    repo: "https://github.com/colinhacks/zod",
    audience: "TypeScript teams tired of writing runtime validation and static types twice for the same shape.",
    quickstart: "npm install zod",
  },
  {
    name: "Astro",
    // ...
    repo: "https://github.com/withastro/astro",
    audience: "Teams building mostly-static, content-heavy sites who want islands of interactivity, not a full SPA runtime.",
    quickstart: "npm create astro@latest",
  },
  {
    name: "Playwright",
    // ...
    repo: "https://github.com/microsoft/playwright",
    audience: "QA and dev teams who want one API for end-to-end tests across Chromium, Firefox, and WebKit.",
    quickstart: "npm init playwright@latest",
  },
  {
    name: "DuckDB",
    // ...
    repo: "https://github.com/duckdb/duckdb",
    audience: "Anyone with a pile of CSV or Parquet files who wants real SQL without spinning up a database server.",
    quickstart: "duckdb -c \"SELECT * FROM 'data.csv' LIMIT 5\"",
  },
  {
    name: "Meilisearch",
    // ...
    repo: "https://github.com/meilisearch/meilisearch",
    audience: "Teams adding search to an app who want typo-tolerant, relevant results without tuning a heavyweight cluster.",
    quickstart: "curl -X POST 'http://localhost:7700/indexes/movies/documents' --data-binary @movies.json",
  },
  {
    name: "Caddy",
    // ...
    repo: "https://github.com/caddyserver/caddy",
    audience: "Anyone self-hosting a site who wants HTTPS to just work without touching Certbot or nginx configs.",
    quickstart: "caddy reverse-proxy --from example.com --to localhost:3000",
  },
  {
    name: "Uptime Kuma",
    // ...
    repo: "https://github.com/louislam/uptime-kuma",
    audience: "Self-hosters who want to know a service is down before a user tells them, without paying for a SaaS monitor.",
    quickstart: "docker run -d --name uptime-kuma -p 3001:3001 louislam/uptime-kuma",
  },
  {
    name: "Excalidraw",
    // ...
    repo: "https://github.com/excalidraw/excalidraw",
    audience: "Teams who want to sketch a system or flow live on a call without their diagram looking like a deliverable.",
    quickstart: "npm install @excalidraw/excalidraw",
  },
  {
    name: "Biome",
    // ...
    repo: "https://github.com/biomejs/biome",
    audience: "JS/TS teams tired of juggling ESLint, Prettier, and their conflicting configs across a monorepo.",
    quickstart: "npx @biomejs/biome check --write .",
  },
```

(Keep every field that already exists on each object — `name`, `category`, `language`, `description`, `why` — unchanged; only add `audience` and `quickstart` after `repo`.)

- [ ] **Step 4: Add the pure helper functions**

Immediately after the `projects` array (and before the existing `const categories = ...` line), add:

```ts
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function relatedPicks(project: Project, all: Project[]): Project[] {
  return all.filter((p) => p.category === project.category && p.name !== project.name).slice(0, 3);
}

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
}
```

- [ ] **Step 5: Run the check to verify it now passes for `audience`**

```bash
npm run build && grep -c "audience" dist/index.html
```

Expected: build succeeds, and the `grep -c` prints a number greater than `0` (the `audience` values now render somewhere reachable in the template — even before Task 3 wires up the panel markup, Astro will error at build time if `audience`/`quickstart` were referenced anywhere already; since they aren't referenced in the template yet, this grep will still print `0`, which is fine — the real gate for this task is that the build succeeds with no TypeScript/Astro errors).

Run instead, as the actual gate for this task:

```bash
npm run build
```

Expected: exits `0` with no type errors about missing `audience`/`quickstart` fields.

- [ ] **Step 6: Commit**

```bash
git add takeitandgo/src/pages/index.astro
git commit -m "Add audience/quickstart fields and pick-helper functions"
```

---

### Task 2: Build-time GitHub stats fetching

**Files:**
- Modify: `takeitandgo/src/pages/index.astro` (add helpers + `githubStats` right after the helpers added in Task 1, before `const categories = ...`)

**Interfaces:**
- Consumes: `Project` type and `projects` array from Task 1.
- Produces: `type GithubStats = { stars: number; updatedLabel: string; openIssues: number }`, `formatUpdatedLabel(pushedAt: string): string`, `fetchGithubStats(repoUrl: string): Promise<GithubStats | null>`, and `const githubStats: (GithubStats | null)[]` — one entry per project, same order as `projects`, used by Task 3.

- [ ] **Step 1: Write the failing check**

```bash
npm run build 2>&1 | tail -20
```

Run this first to confirm the current build succeeds without any stats fetching (baseline, since there's nothing to fail yet — this step just records the "before" state so Step 4's comparison is meaningful).

- [ ] **Step 2: Add the stats types and helpers**

Add, directly after the `formatStars` function from Task 1:

```ts
type GithubStats = {
  stars: number;
  updatedLabel: string;
  openIssues: number;
};

function formatUpdatedLabel(pushedAt: string): string {
  const days = Math.floor((Date.now() - new Date(pushedAt).getTime()) / 86_400_000);
  if (days < 1) return "updated today";
  if (days < 30) return `updated ${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `updated ${months}mo ago`;
  return `updated ${Math.floor(months / 12)}y ago`;
}

async function fetchGithubStats(repoUrl: string): Promise<GithubStats | null> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const path = `${match[1]}/${match[2]}`;
  try {
    const response = await fetch(`https://api.github.com/repos/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "takeitandgo-build",
      },
    });
    if (!response.ok) {
      console.warn(`GitHub stats fetch failed for ${path}: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return {
      stars: data.stargazers_count,
      updatedLabel: formatUpdatedLabel(data.pushed_at),
      openIssues: data.open_issues_count,
    };
  } catch (error) {
    console.warn(`GitHub stats fetch errored for ${path}:`, error);
    return null;
  }
}
```

- [ ] **Step 3: Fetch stats for every project**

Add, right after the `fetchGithubStats` function:

```ts
const githubStats = await Promise.all(projects.map((project) => fetchGithubStats(project.repo)));
```

- [ ] **Step 4: Run the check to verify the build still succeeds with live fetches**

```bash
npm run build 2>&1 | tail -20
```

Expected: exits `0`. You should NOT see any `GitHub stats fetch failed`/`errored` warnings for the 12 real repo URLs (they're all valid, public repos) — if you do see warnings, check for network access/rate limiting in this environment, but the build must still succeed either way.

- [ ] **Step 5: Verify graceful degradation on a broken URL**

Temporarily edit the `ripgrep` entry's `repo` field to `"https://github.com/BurntSushi/this-repo-does-not-exist-xyz"`, then run:

```bash
npm run build 2>&1 | tail -20
```

Expected: exits `0` (build still succeeds), and you see a line containing `GitHub stats fetch failed for BurntSushi/this-repo-does-not-exist-xyz: 404`. Then revert the `repo` field back to `"https://github.com/BurntSushi/ripgrep"`.

- [ ] **Step 6: Commit**

```bash
git add takeitandgo/src/pages/index.astro
git commit -m "Fetch GitHub stats at build time with graceful fallback"
```

---

### Task 3: Compute `pickCards` and restructure the card markup

**Files:**
- Modify: `takeitandgo/src/pages/index.astro` (frontmatter: add `pickCards`; template: rewrite the `#project-grid` loop)

**Interfaces:**
- Consumes: `pickCards` needs `projects`, `githubStats`, `relatedPicks`, `formatStars`, `slugify` from Tasks 1–2.
- Produces: `const pickCards: { project: Project; stats: GithubStats | null; related: Project[]; slug: string; teaser: string }[]`, consumed by the template and by Task 5's JS only indirectly (JS reads the rendered DOM, not this array directly).

- [ ] **Step 1: Write the failing check**

```bash
npm run build && grep -c "project-card__toggle" dist/index.html
```

Expected: build succeeds, `grep -c` prints `0` (the toggle markup doesn't exist yet).

- [ ] **Step 2: Add `pickCards` to the frontmatter**

Add, right after the `githubStats` line from Task 2:

```ts
const pickCards = projects.map((project, index) => {
  const stats = githubStats[index];
  const related = relatedPicks(project, projects);
  const teaserParts = [
    "Quickstart",
    related.length > 0 ? `${related.length} related` : null,
    stats ? `★ ${formatStars(stats.stars)}` : null,
  ].filter((part): part is string => Boolean(part));

  return {
    project,
    stats,
    related,
    slug: slugify(project.name),
    teaser: teaserParts.join(" · "),
  };
});
```

- [ ] **Step 3: Replace the `#project-grid` template loop**

Replace the existing block (currently mapping `projects.map((project) => (...))`, roughly lines 293–319):

```astro
            <div class="project-grid" id="project-grid">
              {projects.map((project) => (
                <article
                  class="project-card"
                  data-category={project.category}
                  data-name={project.name.toLowerCase()}
                  data-description={project.description.toLowerCase()}
                >
                  <div class="project-card__meta">
                    <span>{project.category}</span>
                    <span class="chip chip--tag" aria-label={`Written in ${project.language}`}>
                      {project.language}
                    </span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p class="project-card__why">
                    <span class="project-card__why-label">Why we picked it</span>
                    {project.why}
                  </p>
                  <a class="project-link" href={project.repo} target="_blank" rel="noreferrer noopener">
                    View on GitHub
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
```

with:

```astro
            <div class="project-grid" id="project-grid">
              {pickCards.map(({ project, stats, related, slug, teaser }) => (
                <article
                  class="project-card"
                  id={`pick-${slug}`}
                  data-category={project.category}
                  data-name={project.name.toLowerCase()}
                  data-description={project.description.toLowerCase()}
                >
                  <button
                    class="project-card__toggle"
                    type="button"
                    aria-expanded="false"
                    aria-controls={`pick-${slug}-panel`}
                  >
                    <div class="project-card__meta">
                      <span>{project.category}</span>
                      <span class="chip chip--tag" aria-label={`Written in ${project.language}`}>
                        {project.language}
                      </span>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p class="project-card__teaser">{teaser}</p>
                  </button>

                  <div class="project-card__panel" id={`pick-${slug}-panel`} hidden>
                    <p class="project-card__why">
                      <span class="project-card__why-label">Why we picked it</span>
                      {project.why}
                    </p>
                    <p class="project-card__audience">
                      <span class="project-card__audience-label">Who it's for</span>
                      {project.audience}
                    </p>
                    <div class="project-card__quickstart">
                      <span class="project-card__quickstart-label">Try it</span>
                      <pre><code>{project.quickstart}</code></pre>
                    </div>
                    {stats && (
                      <div class="project-card__stats">
                        <span>★ {formatStars(stats.stars)}</span>
                        <span>{stats.updatedLabel}</span>
                        <span>{stats.openIssues} open issues</span>
                      </div>
                    )}
                    {related.length > 0 && (
                      <div class="project-card__related">
                        <span class="project-card__related-label">Related picks</span>
                        <div class="related-chips">
                          {related.map((relatedProject) => (
                            <button
                              class="chip"
                              type="button"
                              data-related-target={`pick-${slugify(relatedProject.name)}`}
                            >
                              {relatedProject.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <a class="project-link" href={project.repo} target="_blank" rel="noreferrer noopener">
                      View on GitHub
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
npm run build && grep -c "project-card__toggle" dist/index.html && grep -c "project-card__panel" dist/index.html
```

Expected: build succeeds, both counts print `12` (one toggle button and one panel per pick).

- [ ] **Step 5: Commit**

```bash
git add takeitandgo/src/pages/index.astro
git commit -m "Restructure pick cards into toggle + expandable panel"
```

---

### Task 4: Styling for the expanded layers

**Files:**
- Modify: `takeitandgo/src/styles/site.css` (append new rules after the existing `.project-card__why-label` rule block, i.e. after line 635 in the current file)

**Interfaces:**
- Consumes: class names introduced in Task 3 (`.project-card__toggle`, `.project-card__teaser`, `.project-card__panel`, `.project-card__audience`, `.project-card__audience-label`, `.project-card__quickstart`, `.project-card__quickstart-label`, `.project-card__stats`, `.project-card__related`, `.project-card__related-label`, `.related-chips`).
- Produces: nothing consumed by later tasks — this is leaf styling.

- [ ] **Step 1: Write the failing check**

```bash
npm run build && grep -c "project-card__panel\[hidden\]" dist/*.css dist/_astro/*.css 2>/dev/null
```

Expected: build succeeds; the grep across built CSS finds nothing yet (`0` or "no such file" depending on hashed filename — either way confirms the rule doesn't exist yet). This is just a sanity check that we're adding new CSS, not verifying visual correctness (that's Task 6).

- [ ] **Step 2: Add the CSS rules**

Append to `takeitandgo/src/styles/site.css`, after the existing `.project-card__why-label { ... }` rule:

```css
.project-card__toggle {
  display: grid;
  gap: var(--space-3);
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.project-card__teaser {
  font-size: var(--type-caption);
  color: var(--color-muted);
}

.project-card__panel {
  display: grid;
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.project-card__panel[hidden] {
  display: none;
}

.project-card__audience,
.project-card__stats {
  font-size: var(--type-caption);
  color: var(--color-muted);
}

.project-card__audience-label,
.project-card__quickstart-label,
.project-card__related-label {
  display: block;
  margin-bottom: var(--space-1);
  font-size: var(--type-label);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted-strong);
}

.project-card__quickstart pre {
  margin: 0;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-strong);
  overflow-x: auto;
}

.project-card__quickstart code {
  font-family: "Space Grotesk", "Segoe UI", Arial, sans-serif;
  font-size: var(--type-caption);
  white-space: pre;
}

.project-card__stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.related-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
```

- [ ] **Step 3: Run the check to verify it passes**

```bash
npm run build
```

Expected: exits `0` with no CSS syntax errors (Astro/Vite will fail the build on invalid CSS).

- [ ] **Step 4: Commit**

```bash
git add takeitandgo/src/styles/site.css
git commit -m "Style the expandable pick layers"
```

---

### Task 5: Expand/collapse, accordion, and related-pick chaining behavior

**Files:**
- Modify: `takeitandgo/src/pages/index.astro` (inline `<script is:inline>` block — the "Browse + filter the picks" section and the code right after it)

**Interfaces:**
- Consumes: DOM structure from Task 3 (`.project-card` with an `id="pick-<slug>"`, a `.project-card__toggle` button with `aria-controls`, a `.project-card__panel` with a matching `id`, and related-pick buttons carrying `data-related-target="pick-<slug>"`). Also consumes the existing `cards` and `chips` arrays and `applyFilters` function already defined in this script.
- Produces: nothing consumed by other files — this is the last piece of client behavior.

- [ ] **Step 1: Write the failing check**

There's no test runner, so this task is verified by browser interaction (Task 6 covers the full pass). As a quick pre-check, confirm the current behavior is broken: start the dev server and note that clicking a card does nothing (no panel opens) — this is expected before this task's changes.

```bash
npm run dev
```

Open the printed local URL, click any pick card, and confirm nothing happens (no panel appears). Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 2: Add `collapseAllCards` and `expandCard`, and wire up toggle buttons**

In the inline `<script is:inline>` block, immediately after the existing block that ends with:

```js
        if (search instanceof HTMLInputElement) {
          search.addEventListener("input", applyFilters);
        }
```

add:

```js
        // ---- Expand a pick into its deeper layers ----
        const collapseAllCards = () => {
          cards.forEach((card) => {
            const toggle = card.querySelector(".project-card__toggle");
            const panel = card.querySelector(".project-card__panel");
            if (toggle instanceof HTMLButtonElement) {
              toggle.setAttribute("aria-expanded", "false");
            }
            if (panel instanceof HTMLElement) {
              panel.hidden = true;
            }
          });
        };

        const expandCard = (card) => {
          const toggle = card.querySelector(".project-card__toggle");
          const panel = card.querySelector(".project-card__panel");
          const alreadyOpen = panel instanceof HTMLElement && !panel.hidden;
          collapseAllCards();
          if (alreadyOpen) return;
          if (toggle instanceof HTMLButtonElement) {
            toggle.setAttribute("aria-expanded", "true");
          }
          if (panel instanceof HTMLElement) {
            panel.hidden = false;
          }
        };

        cards.forEach((card) => {
          const toggle = card.querySelector(".project-card__toggle");
          if (toggle instanceof HTMLButtonElement) {
            toggle.addEventListener("click", () => expandCard(card));
          }
        });

        document.querySelectorAll("[data-related-target]").forEach((chip) => {
          chip.addEventListener("click", (event) => {
            event.stopPropagation();
            const targetId = chip.getAttribute("data-related-target") || "";
            const targetCard = document.getElementById(targetId);
            if (!(targetCard instanceof HTMLElement)) return;

            if (targetCard.hidden) {
              activeCategory = "All";
              chips.forEach((other) => {
                other.setAttribute("aria-pressed", String(other.getAttribute("data-filter") === "All"));
              });
              if (search instanceof HTMLInputElement) search.value = "";
              applyFilters();
            }

            expandCard(targetCard);
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        });
```

- [ ] **Step 3: Collapse any expanded card whenever search or filters change**

Replace:

```js
        const applyFilters = () => {
          const query = search instanceof HTMLInputElement ? search.value.trim().toLowerCase() : "";
          let shown = 0;
```

with:

```js
        const applyFilters = () => {
          collapseAllCards();
          const query = search instanceof HTMLInputElement ? search.value.trim().toLowerCase() : "";
          let shown = 0;
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
npm run dev
```

Open the printed local URL and:
1. Click the "ripgrep" card — its panel should open, showing "Why we picked it," "Who it's for," "Try it" with `rg 'TODO' --type js`, a stats strip (stars/updated/open issues), and a "Related picks" chip for "fzf."
2. Click the "fzf" chip inside ripgrep's open panel — the ripgrep panel should close, the page should scroll to the "fzf" card, and its panel should open.
3. Click the "Excalidraw" card (its category "Design" has only one member) — its panel should open with no "Related picks" section rendered at all.
4. Type into the search box while a card is expanded — the expanded card should collapse.

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add takeitandgo/src/pages/index.astro
git commit -m "Add accordion expand/collapse and related-pick chaining"
```

---

### Task 6: Full manual verification pass

**Files:** none (verification only, per the spec's "Testing / verification" section)

**Interfaces:** none — this task consumes the finished feature from Tasks 1–5 and produces no code.

- [ ] **Step 1: Build cleanly**

```bash
cd takeitandgo && npm run build
```

Expected: exits `0`, no warnings other than possibly transient GitHub fetch warnings (which must not fail the build).

- [ ] **Step 2: Confirm graceful degradation still works end-to-end**

Temporarily set the `Astro` entry's `repo` field to an invalid path (e.g. append `-does-not-exist` to the URL), run `npm run build`, and confirm in the terminal output you see a `GitHub stats fetch failed` warning for it and the build still exits `0`. Then run `npm run preview` and open the "Astro" card — confirm its panel opens correctly with no stats strip shown (audience, quickstart, and related picks still render). Revert the `repo` field back to `"https://github.com/withastro/astro"` afterward and rebuild.

- [ ] **Step 3: Full interaction pass in the browser**

```bash
npm run dev
```

Walk through:
- Expand each of the three single-member categories ("Testing" → Playwright, "Design" → Excalidraw, "Dev tools" → Biome) and confirm none of them render a "Related picks" section.
- Expand a multi-member category pick (e.g. "Web" → htmx) and confirm its related chips list up to 3 other "Web" picks (Zod, Astro) and clicking one chains correctly.
- Confirm only one card is ever expanded at a time — expanding a second card always closes the first.
- Apply a category filter chip while a card is expanded — confirm the expanded card collapses.
- Confirm the teaser row on unexpanded cards shows the expected pieces (e.g. `Quickstart · 2 related · ★ 34.2k` style text, omitting any piece with no data).

- [ ] **Step 4: Final commit (docs only, if anything was reverted incorrectly)**

If Step 2's temporary edit was fully reverted before this point, there is nothing to commit here — confirm with:

```bash
git status
```

Expected: `nothing to commit, working tree clean` (relative to the commits already made in Tasks 1–5).
