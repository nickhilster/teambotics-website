import { marked } from 'marked';

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c)
  );
}

marked.use({
  renderer: {
    code(code: string, infostring: string | undefined, escaped: boolean) {
      const lang = infostring?.trim();

      if (lang === 'mermaid') {
        return `<div class="mermaid-wrap"><pre class="mermaid">${escapeHtml(code)}</pre></div>`;
      }

      return false;
    },
  },
});

export { marked };
