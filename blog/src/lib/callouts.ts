type CalloutType = 'NOTE' | 'WARNING' | 'KEY' | 'TIP' | 'STAT';

const LABELS: Record<CalloutType, string> = {
  NOTE: 'Note',
  WARNING: 'Warning',
  KEY: 'Key Insight',
  TIP: 'Tip',
  STAT: 'Stat',
};

const TYPE_PATTERN = Object.keys(LABELS).join('|');
const CALLOUT_RE = new RegExp(
  `<blockquote>\\s*<p>\\[!(${TYPE_PATTERN})\\][ \\t]?\\n?([\\s\\S]*?)</blockquote>`,
  'gi'
);

export function processCallouts(html: string): string {
  return html.replace(CALLOUT_RE, (_, rawType: string, inner: string) => {
    const type = rawType.toUpperCase() as CalloutType;

    // inner contains the remainder of the first <p> and any following <p>s up to </blockquote>
    // e.g. "Some text.</p>\n\n<p>More text.</p>\n"
    // or for single-para: "Some text.</p>\n"
    const firstClose = inner.indexOf('</p>');
    let body: string;
    if (firstClose === -1) {
      body = inner.trim() ? `<p>${inner.trim()}</p>` : '';
    } else {
      const firstPara = inner.substring(0, firstClose).trim();
      const rest = inner.substring(firstClose + 4).trim();
      body = (firstPara ? `<p>${firstPara}</p>` : '') + rest;
    }

    if (type === 'STAT') {
      // Strip tags, split into lines — first line is the number, rest is the label
      const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const spaceAt = text.indexOf(' ');
      const number = spaceAt === -1 ? text : text.substring(0, spaceAt);
      const label = spaceAt === -1 ? '' : text.substring(spaceAt + 1).trim();
      return [
        `<div class="callout callout--stat" role="note">`,
        `<span class="callout__stat-number">${number}</span>`,
        label ? `<span class="callout__stat-label">${label}</span>` : '',
        `</div>`,
      ].join('');
    }

    const label = LABELS[type] ?? type;
    return [
      `<div class="callout callout--${type.toLowerCase()}" role="note">`,
      `<span class="callout__label">${label}</span>`,
      `<div class="callout__body">${body}</div>`,
      `</div>`,
    ].join('');
  });
}

export function hasMermaid(html: string): boolean {
  return html.includes('class="mermaid"');
}
