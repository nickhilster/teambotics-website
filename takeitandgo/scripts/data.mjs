import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
export const writeJson = (relativePath, value) => fs.writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);
export const picks = readJson('data/picks.json');
export const discovery = readJson('data/discovery.json');
const cachePath = path.join(root, '.cache/github-api-cache.json');
const apiCache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf8')) : {};

export function repoSlug(url) {
  const parsed = new URL(url);
  if (parsed.hostname !== 'github.com') throw new Error(`Not a GitHub repository URL: ${url}`);
  const parts = parsed.pathname.split('/').filter(Boolean);
  if (parts.length !== 2) throw new Error(`Expected owner/repo URL: ${url}`);
  return parts.join('/');
}

export async function github(pathname, token = process.env.GITHUB_TOKEN) {
  const cached = apiCache[pathname];
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(`https://api.github.com${pathname}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'takeitandgo-maintenance',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(cached?.etag ? { 'If-None-Match': cached.etag } : {}),
      },
      signal: AbortSignal.timeout(15000),
    });
    if (response.status === 304 && cached) return cached.body;
    if (response.ok) {
      const body = await response.json();
      if (response.headers.get('etag')) apiCache[pathname] = { etag: response.headers.get('etag'), body };
      fs.mkdirSync(path.dirname(cachePath), { recursive: true });
      fs.writeFileSync(cachePath, `${JSON.stringify(apiCache)}\n`);
      return body;
    }
    const retryAfter = Number(response.headers.get('retry-after'));
    const rateLimited = response.status === 429 || (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0');
    if (rateLimited && attempt < 2) {
      const resetSeconds = Number(response.headers.get('x-ratelimit-reset')) - Math.floor(Date.now() / 1000);
      const delayMs = Math.min(30_000, Math.max(1000, retryAfter ? retryAfter * 1000 : resetSeconds * 1000));
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      continue;
    }
    throw new Error(`GitHub API ${response.status} ${pathname}`);
  }
  throw new Error(`GitHub API rate limit retries exhausted for ${pathname}`);
}
