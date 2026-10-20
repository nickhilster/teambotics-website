import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const text of ['ripgrep', 'Who it\'s for', 'Quickstart', 'Related picks', 'GitHub topic searches']) {
  assert.ok(html.includes(text), `built page is missing expected content: ${text}`);
}
assert.match(html, /<main\b/);
assert.match(html, /<header\b/);
assert.match(html, /<footer\b/);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'built page contains duplicate IDs');
const idSet = new Set(ids);
const controlledPanels = [...html.matchAll(/<button class="project-card__toggle"[^>]*aria-controls="([^"]+)"/g)].map((match) => match[1]);
assert.equal(controlledPanels.length, 12, 'expected one accessible card control per pick');
for (const panelId of controlledPanels) {
  assert.ok(idSet.has(panelId), `aria-controls points to missing panel: ${panelId}`);
  assert.match(html, new RegExp(`<div class="project-card__panel" id="${panelId}" hidden`));
}
console.log('Built page accessibility and smoke checks passed.');
