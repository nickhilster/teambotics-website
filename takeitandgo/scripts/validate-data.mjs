import assert from 'node:assert/strict';
import { discovery, picks, readJson, repoSlug } from './data.mjs';

const schema = readJson('data/picks.schema.json');
const names = new Set();
const repos = new Set();

function assertMatchesSchema(value, rule, path = '$') {
  assert.equal(typeof value, rule.type === 'array' ? 'object' : rule.type, `${path} must be ${rule.type}`);
  if (rule.type === 'array') {
    assert.ok(Array.isArray(value), `${path} must be an array`);
    value.forEach((item, index) => assertMatchesSchema(item, rule.items, `${path}[${index}]`));
    return;
  }
  if (rule.type === 'object') {
    for (const key of rule.required ?? []) assert.ok(Object.hasOwn(value, key), `${path}.${key} is required`);
    if (rule.additionalProperties === false) {
      for (const key of Object.keys(value)) assert.ok(Object.hasOwn(rule.properties, key), `${path}.${key} is not allowed by the schema`);
    }
    for (const [key, childRule] of Object.entries(rule.properties ?? {})) {
      if (Object.hasOwn(value, key)) assertMatchesSchema(value[key], childRule, `${path}.${key}`);
    }
    return;
  }
  if (rule.type === 'string') {
    assert.ok(value.trim().length >= (rule.minLength ?? 0), `${path} is too short`);
    if (rule.pattern) assert.ok(new RegExp(rule.pattern).test(value), `${path} does not match its schema pattern`);
    if (rule.format === 'uri') assert.doesNotThrow(() => new URL(value), `${path} must be a URI`);
  }
}

assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
assertMatchesSchema(picks, schema);
for (const pick of picks) {
  assert.ok(pick.name.trim() && pick.category.trim(), 'name and category are required');
  assert.ok(!names.has(pick.name.toLowerCase()), `duplicate name: ${pick.name}`);
  names.add(pick.name.toLowerCase());
  const slug = repoSlug(pick.repo).toLowerCase();
  assert.ok(!repos.has(slug), `duplicate repository: ${slug}`);
  repos.add(slug);
}
assert.ok(discovery.categories.length > 0, 'at least one discovery category is required');
console.log(`Validated ${picks.length} unique editorial picks against data/picks.schema.json.`);
