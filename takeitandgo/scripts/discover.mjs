import fs from 'node:fs';
import { discovery, github, picks, readJson, repoSlug, root, writeJson } from './data.mjs';

const known = new Set(picks.map((pick) => repoSlug(pick.repo).toLowerCase()));
const existingPath = `${root}/data/discovery-candidates.json`;
const prior = fs.existsSync(existingPath) ? readJson('data/discovery-candidates.json') : { schema_version: 1, candidates: [] };
const priorByRepo = new Map(prior.candidates.map((candidate) => [candidate.repo.toLowerCase(), candidate]));
const cutoff = Date.now() - discovery.filters.maximumAgeDays * 86_400_000;
const allowedLicenses = new Set(discovery.filters.allowedLicenses);
const selected = new Map();

for (const category of discovery.categories) {
  for (let page = 1; page <= discovery.limits.pagesPerCategory; page++) {
    const query = new URLSearchParams({ q: `${category.query} stars:>=${discovery.filters.minimumStars}`, sort: 'stars', order: 'desc', per_page: String(discovery.limits.resultsPerCategory), page: String(page) });
    const result = await github(`/search/repositories?${query}`);
    const items = result.items ?? [];
    for (const repo of items) {
      const slug = repo.full_name.toLowerCase();
      if (known.has(slug) || repo.fork || repo.archived || repo.disabled || !repo.description) continue;
      if (!allowedLicenses.has(repo.license?.spdx_id)) continue;
      if (!repo.pushed_at || Date.parse(repo.pushed_at) < cutoff) continue;
      if (selected.has(slug)) continue;
      selected.set(slug, { repo, category: category.name });
    }
    if (items.length < discovery.limits.resultsPerCategory) break;
  }
}

const byCategory = new Map();
for (const candidate of selected.values()) {
  const group = byCategory.get(candidate.category) ?? [];
  group.push(candidate);
  byCategory.set(candidate.category, group);
}
for (const group of byCategory.values()) group.sort((a, b) => b.repo.stargazers_count - a.repo.stargazers_count || a.repo.full_name.localeCompare(b.repo.full_name));
const viable = [];
for (let rank = 0; rank < discovery.limits.candidatesPerCategory && viable.length < discovery.limits.candidateReportLimit; rank++) {
  for (const group of byCategory.values()) {
    if (group[rank]) viable.push(group[rank]);
    if (viable.length === discovery.limits.candidateReportLimit) break;
  }
}
const candidates = [];
for (let start = 0; start < viable.length; start += 4) {
  const batch = viable.slice(start, start + 4);
  const checks = await Promise.all(batch.map(async ({ repo, category }) => {
    try {
      await github(`/repos/${repo.full_name}/readme`);
      const previous = priorByRepo.get(repo.full_name.toLowerCase());
      if (previous) return previous;
      return {
        name: repo.name,
        category,
        repo: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language ?? 'Unknown',
        license: repo.license.spdx_id,
        pushed_at: repo.pushed_at,
        source: `https://api.github.com/repos/${repo.full_name}`,
        discovered_at: previous?.discovered_at ?? new Date().toISOString().slice(0, 10),
      };
    } catch (error) {
      if (String(error).includes('GitHub API 404')) return null;
      throw error;
    }
  }));
  candidates.push(...checks.filter(Boolean));
}

candidates.sort((a, b) => a.category.localeCompare(b.category) || b.stars - a.stars || a.repo.localeCompare(b.repo));
if (candidates.length === 0) {
  console.log('No new useful candidates; leaving the report unchanged.');
  process.exit(0);
}
writeJson('data/discovery-candidates.json', {
  schema_version: 1,
  methodology: 'GitHub Search API topic queries; exclude curated entries, forks, archived or disabled repositories, projects below the star/activity thresholds, repositories without an allowlisted SPDX license, and repositories without a README. Candidate records are research leads and are never auto-added to editorial picks.',
  candidates,
});
console.log(`Wrote ${candidates.length} sourced candidates for human review.`);
