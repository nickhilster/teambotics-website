const ACRONYMS = new Set(['ai', 'sop', 'sops', 'rag', 'llm', 'llms', 'ux', 'roi', 'ceo', 'cfo']);

export function prettifySlug(slug: string) {
  return slug
    .split('-')
    .map((word) => (ACRONYMS.has(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}
