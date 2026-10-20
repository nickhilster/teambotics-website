import { github, picks, readJson, repoSlug, writeJson } from './data.mjs';

const observed = readJson('data/observed.json');
let changed = 0;
for (const pick of picks) {
  const slug = repoSlug(pick.repo);
  try {
    const repo = await github(`/repos/${slug}`);
    const next = {
      name: repo.full_name,
      source: `https://api.github.com/repos/${repo.full_name}`,
      html_url: repo.html_url,
      archived: repo.archived,
      disabled: repo.disabled,
      stars: repo.stargazers_count,
      open_issues: repo.open_issues_count,
      pushed_at: repo.pushed_at,
      license: repo.license?.spdx_id ?? null,
      default_branch: repo.default_branch,
      last_verified: new Date().toISOString(),
    };
    const previous = observed.repositories[slug.toLowerCase()];
    const comparable = ({ last_verified, ...value }) => value;
    if (!previous || JSON.stringify(comparable(previous)) !== JSON.stringify(comparable(next))) {
      observed.repositories[slug.toLowerCase()] = next;
      changed++;
    }
  } catch (error) {
    // Keep the prior record so transient API failures never remove provenance or editorial entries.
    console.warn(`Could not verify ${slug}; keeping the prior observation: ${error.message}`);
  }
}
if (changed) {
  observed.schema_version = 1;
  writeJson('data/observed.json', observed);
}
console.log(`${changed ? 'Updated' : 'No material changes to'} ${changed} repository observation(s).`);
