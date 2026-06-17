// Custom thumbnail paths for each blog post.
// Astro serves files from /public at the root, so these resolve to /thumbnails/*.svg
const CUSTOM_THUMBNAILS: Record<string, string> = {
  'agentic-ai-beyond-chatbots':          '/thumbnails/agentic-ai-beyond-chatbots.svg',
  'operational-data-ai-value':           '/thumbnails/operational-data-ai-value.svg',
  'multi-agent-systems-workflow':        '/thumbnails/multi-agent-systems-workflow.svg',
  'ai-augmentation-frontline-operations':'/thumbnails/ai-augmentation-frontline-operations.svg',
  'applied-ai-regulated-environments':   '/thumbnails/applied-ai-regulated-environments.svg',
  'ai-value-existing-data':             '/thumbnails/ai-value-existing-data.svg',
  'sops-to-ai-agents':                  '/thumbnails/sops-to-ai-agents.svg',
  'prompt-engineering-operational-skill':'/thumbnails/prompt-engineering-operational-skill.svg',
  'llms-structured-automation-workflows':'/thumbnails/llms-structured-automation-workflows.svg',
  'designing-human-ai-teams':           '/thumbnails/designing-human-ai-teams.svg',
  'workflows-are-becoming-products':     '/thumbnails/workflows-are-becoming-products.svg',
  'static-documentation-living-knowledge-systems': '/thumbnails/static-documentation-living-knowledge-systems.svg',
  'trust-architecture-enterprise-ai-adoption': '/thumbnails/trust-architecture-enterprise-ai-adoption.svg',
  'context-recovery-agentic-work':       '/thumbnails/context-recovery-agentic-work.svg',
  'chatbots-should-ask-better-questions': '/thumbnails/chatbots-should-ask-better-questions.svg',
  'ai-should-not-replace-care':          '/thumbnails/ai-should-not-replace-care.svg',
  'corporate-ai-adoption-operating-model': '/thumbnails/corporate-ai-adoption-operating-model.svg',
};

// Fallback: procedurally generated geometric SVG for unknown slugs
function hashSlug(slug: string) {
  let hash = 0;
  for (const char of slug) {
    hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
  }
  return hash;
}

const palettes = [
  { background: '#0d1330', primary: '#ff4db8', secondary: '#6d5cff', accent: '#7fc4ff' },
  { background: '#070b1a', primary: '#ff4db8', secondary: '#6f5aff', accent: '#3da0ff' },
  { background: '#12182f', primary: '#d95cff', secondary: '#4c7bf5', accent: '#71e2ff' },
  { background: '#141429', primary: '#ff89d0', secondary: '#8a8dff', accent: '#65d6ff' },
  { background: '#191c38', primary: '#f56af6', secondary: '#7bb4ff', accent: '#88ffd0' },
];

function encodeSvg(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getPalette(slug: string) {
  return palettes[hashSlug(slug) % palettes.length];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function generateFallbackSvg(slug: string): string {
  const palette = getPalette(slug);
  const hash = hashSlug(slug);
  const variant = hash % 5;
  const seed = hash / 5;

  const x = clamp(80 + ((seed * 37) % 200), 80, 280);
  const y = clamp(90 + ((seed * 53) % 140), 90, 220);
  const size = clamp(80 + ((seed * 61) % 120), 80, 140);

  switch (variant) {
    case 1:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Teambotics blog thumbnail"><rect width="640" height="360" fill="${palette.background}"/><circle cx="${x + 120}" cy="${y - 40}" r="${size}" fill="${palette.secondary}" opacity="0.78"/><rect x="${x - 50}" y="${y + 20}" width="${size * 1.8}" height="${size * 0.7}" rx="22" fill="${palette.accent}" opacity="0.7" transform="rotate(-14 ${x + 40} ${y + 55})"/><path d="M${x} ${y} h${size} v${size * 0.65} h-${size} Z" fill="${palette.primary}" opacity="0.92"/></svg>`;
    case 2:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Teambotics blog thumbnail"><rect width="640" height="360" fill="${palette.background}"/><path d="M0 80 h640 v120 h-640 Z" fill="${palette.secondary}" opacity="0.72"/><circle cx="${x + 40}" cy="${y + 20}" r="${size * 0.6}" fill="${palette.accent}" opacity="0.9"/><rect x="${x + 190}" y="${y - 60}" width="${size * 0.85}" height="${size * 0.85}" rx="32" fill="${palette.primary}" opacity="0.85"/></svg>`;
    case 3:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Teambotics blog thumbnail"><rect width="640" height="360" fill="${palette.background}"/><rect x="60" y="60" width="180" height="180" rx="30" fill="${palette.secondary}" opacity="0.78"/><rect x="230" y="150" width="240" height="140" rx="40" fill="${palette.accent}" opacity="0.72" transform="rotate(12 350 220)"/><circle cx="${x + 220}" cy="${y - 70}" r="${size * 0.45}" fill="${palette.primary}" opacity="0.92"/></svg>`;
    case 4:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Teambotics blog thumbnail"><rect width="640" height="360" fill="${palette.background}"/><polygon points="${x},${y} ${x + 120},${y - 90} ${x + 260},${y + 40} ${x + 150},${y + 160}" fill="${palette.secondary}" opacity="0.78"/><circle cx="${x + 80}" cy="${y + 140}" r="${size * 0.35}" fill="${palette.accent}" opacity="0.85"/><rect x="${x + 340}" y="${y - 60}" width="${size * 1.1}" height="${size * 0.5}" rx="28" fill="${palette.primary}" opacity="0.7" transform="rotate(18 ${x + 395} ${y - 35})"/></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Teambotics blog thumbnail"><rect width="640" height="360" fill="${palette.background}"/><circle cx="${x}" cy="${y}" r="${size}" fill="${palette.secondary}" opacity="0.72"/><path d="M${x + 160} ${y - 20} l120 80 l-80 80 l-120 -80 Z" fill="${palette.accent}" opacity="0.9"/><rect x="${x + 240}" y="${y + 20}" width="${size * 0.5}" height="${size * 0.5}" rx="20" fill="${palette.primary}" opacity="0.85"/></svg>`;
  }
}

export function getGeometricThumbnailUrl(slug: string): string {
  // Return the custom designed thumbnail for known posts
  if (CUSTOM_THUMBNAILS[slug]) {
    return CUSTOM_THUMBNAILS[slug];
  }
  // Fall back to procedurally generated SVG for unknown slugs
  return encodeSvg(generateFallbackSvg(slug));
}
