#!/usr/bin/env node
/**
 * teambotics-issues-tracker-buddy — board generator
 *
 * Reads all markdown issue files in .tracker/issues/*.md (frontmatter + body)
 * and produces a single self-contained .tracker/board.html file: a
 * Linear-style board/list view with filters, search, and an issue detail
 * modal (description + comments + sub-issues). No external dependencies —
 * pure Node.js, works with any package manager or none at all.
 *
 * Usage:  node .tracker/generate.js
 * Output: .tracker/board.html  (open directly in a browser, no server needed)
 */
const fs = require('fs');
const path = require('path');

const TRACKER_DIR = __dirname;
const ISSUES_DIR = path.join(TRACKER_DIR, 'issues');
const OUT_FILE = path.join(TRACKER_DIR, 'board.html');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const [, fmText, body] = match;
  const meta = {};
  const lines = fmText.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) { i++; continue; }
    const key = m[1];
    let val = m[2].trim();
    if (val === '') {
      const list = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        list.push(lines[j].replace(/^\s*-\s+/, '').trim().replace(/^"(.*)"$/, '$1'));
        j++;
      }
      meta[key] = list;
      i = j;
      continue;
    }
    if (val === 'null' || val === '~') { meta[key] = null; i++; continue; }
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      meta[key] = inner ? inner.split(',').map(s => s.trim().replace(/^"(.*)"$/, '')) : [];
      i++; continue;
    }
    if (/^".*"$/.test(val)) val = val.slice(1, -1);
    meta[key] = val;
    i++;
  }
  return { meta, body };
}

function parseBody(body) {
  const commentsIdx = body.indexOf('## Comments');
  let description = commentsIdx === -1 ? body : body.slice(0, commentsIdx);
  description = description.replace(/^##\s*Description\s*\r?\n/, '').trim();
  let comments = [];
  if (commentsIdx !== -1) {
    let commentsBlock = body.slice(commentsIdx).replace(/^##\s*Comments\s*\r?\n/, '');
    const parts = commentsBlock.split(/\r?\n(?=###\s)/).map(s => s.trim()).filter(Boolean);
    for (const part of parts) {
      const headerMatch = part.match(/^###\s*(.+?)\s+—\s+(.+?)\r?\n([\s\S]*)$/);
      if (headerMatch) {
        comments.push({ author: headerMatch[1].trim(), date: headerMatch[2].trim(), text: headerMatch[3].trim() });
      }
    }
  }
  return { description, comments };
}

function loadIssues() {
  if (!fs.existsSync(ISSUES_DIR)) return [];
  const files = fs.readdirSync(ISSUES_DIR).filter(f => f.endsWith('.md'));
  const issues = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(ISSUES_DIR, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const { description, comments } = parseBody(body);
    issues.push({ ...meta, description, comments, _file: file });
  }
  issues.sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }));
  return issues;
}

// Minimal markdown -> HTML (subset: headers, bold, italic, inline code, code
// blocks, links, unordered/ordered lists, checkboxes, paragraphs).
function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInline(text) {
  let t = escapeHtml(text);
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return t;
}

function renderMarkdown(md) {
  if (!md) return '';
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let inCode = false, codeBuf = [];
  let listBuf = [], listType = null;

  function flushList() {
    if (listBuf.length) {
      const tag = listType === 'ol' ? 'ol' : 'ul';
      html += `<${tag}>` + listBuf.map(li => `<li>${renderInline(li)}</li>`).join('') + `</${tag}>`;
      listBuf = []; listType = null;
    }
  }

  for (const line of lines) {
    if (/^```/.test(line)) {
      if (inCode) {
        html += `<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`;
        codeBuf = []; inCode = false;
      } else { flushList(); inCode = true; }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { flushList(); html += `<h${h[1].length + 2}>${renderInline(h[2])}</h${h[1].length + 2}>`; continue; }

    const cb = line.match(/^\s*-\s+\[( |x|X)\]\s+(.*)$/);
    if (cb) {
      flushList();
      html += `<div class="checkbox-line"><input type="checkbox" disabled ${cb[1] !== ' ' ? 'checked' : ''}/> ${renderInline(cb[2])}</div>`;
      continue;
    }
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ol) { if (listType !== 'ol') flushList(); listType = 'ol'; listBuf.push(ol[1]); continue; }
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    if (ul) { if (listType !== 'ul') flushList(); listType = 'ul'; listBuf.push(ul[1]); continue; }

    if (line.trim() === '') { flushList(); continue; }
    flushList();
    html += `<p>${renderInline(line)}</p>`;
  }
  flushList();
  if (inCode && codeBuf.length) html += `<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`;
  return html;
}

const issues = loadIssues();
const projectName = path.basename(path.resolve(TRACKER_DIR, '..'));
const dataJson = JSON.stringify(issues.map(i => ({
  ...i,
  descriptionHtml: renderMarkdown(i.description),
  comments: (i.comments || []).map(c => ({ ...c, html: renderMarkdown(c.text) })),
})));

const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(projectName)} — Issue Tracker</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  :root{
    --bg:#0e0f11; --panel:#17181b; --panel-2:#1d1f23; --border:#2a2c31;
    --text:#e7e8ea; --muted:#9a9ca3; --accent:#5e6ad2;
    --backlog:#8a8f98; --unstarted:#e2b203; --started:#5e6ad2; --completed:#3fb950; --canceled:#8a8f98;
    --urgent:#eb5757; --high:#f2994a; --medium:#e2b203; --low:#4d90fe; --none:#5c5e63;
  }
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,sans-serif;background:var(--bg);color:var(--text)}
  header{display:flex;align-items:center;gap:16px;padding:14px 20px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--bg);z-index:5;flex-wrap:wrap}
  header h1{font-size:16px;margin:0;font-weight:600}
  header .count{color:var(--muted);font-size:13px}
  input[type="search"], select{background:var(--panel);border:1px solid var(--border);color:var(--text);padding:6px 10px;border-radius:6px;font-size:13px}
  input[type="search"]{min-width:220px}
  .view-toggle{display:flex;gap:6px;margin-left:auto}
  .view-toggle button{background:var(--panel);border:1px solid var(--border);color:var(--muted);padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px}
  .view-toggle button.active{color:var(--text);border-color:var(--accent)}
  main{padding:16px 20px}
  .board{display:flex;gap:12px;overflow-x:auto;align-items:flex-start}
  .column{background:var(--panel);border-radius:10px;min-width:280px;max-width:300px;flex:1 0 280px;border:1px solid var(--border)}
  .column-header{display:flex;align-items:center;gap:8px;padding:10px 12px;font-size:13px;font-weight:600;border-bottom:1px solid var(--border)}
  .dot{width:8px;height:8px;border-radius:50%}
  .column-body{padding:8px;display:flex;flex-direction:column;gap:8px;max-height:calc(100vh - 160px);overflow-y:auto}
  .card{background:var(--panel-2);border:1px solid var(--border);border-radius:8px;padding:10px;cursor:pointer;font-size:13px}
  .card:hover{border-color:var(--accent)}
  .card .id{color:var(--muted);font-size:11px;margin-bottom:4px}
  .card .title{margin-bottom:8px;line-height:1.35}
  .card .meta{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .badge{font-size:11px;padding:2px 6px;border-radius:4px;background:var(--panel);border:1px solid var(--border);color:var(--muted)}
  .priority{font-weight:600}
  .priority.Urgent{color:var(--urgent)} .priority.High{color:var(--high)} .priority.Medium{color:var(--medium)} .priority.Low{color:var(--low)}
  table{width:100%;border-collapse:collapse;font-size:13px}
  table th, table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--border)}
  table tbody tr{cursor:pointer}
  table tbody tr:hover{background:var(--panel-2)}
  .hidden{display:none !important}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:flex-start;justify-content:center;padding:40px 20px;z-index:20}
  .modal{background:var(--panel);border:1px solid var(--border);border-radius:12px;max-width:720px;width:100%;max-height:85vh;overflow-y:auto;padding:24px}
  .modal h2{margin-top:0}
  .modal .close{float:right;background:none;border:none;color:var(--muted);font-size:20px;cursor:pointer}
  .modal .meta-row{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0;font-size:12px;color:var(--muted)}
  .modal .section-title{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin:20px 0 8px}
  .modal p{line-height:1.5}
  .modal pre{background:var(--panel-2);padding:10px;border-radius:6px;overflow-x:auto}
  .modal code{background:var(--panel-2);padding:1px 4px;border-radius:4px}
  .comment{border-left:2px solid var(--border);padding-left:10px;margin-bottom:14px}
  .comment .who{font-size:12px;color:var(--muted);margin-bottom:4px}
  a{color:var(--accent)}
</style>
</head>
<body>
<header>
  <h1>${escapeHtml(projectName)}</h1>
  <span class="count" id="count"></span>
  <input type="search" id="search" placeholder="Search issues..." />
  <select id="priorityFilter"><option value="">All priorities</option></select>
  <select id="labelFilter"><option value="">All labels</option></select>
  <div class="view-toggle">
    <button data-view="board" class="active">Board</button>
    <button data-view="list">List</button>
  </div>
</header>
<main>
  <div id="board" class="board"></div>
  <table id="list" class="hidden">
    <thead><tr><th>ID</th><th>Title</th><th>Status</th><th>Priority</th><th>Labels</th><th>Updated</th></tr></thead>
    <tbody></tbody>
  </table>
</main>
<div id="modalRoot"></div>
<script>
const ISSUES = ${dataJson};
const COLUMNS = [
  {key:'backlog', label:'Backlog', color:'var(--backlog)'},
  {key:'unstarted', label:'Todo', color:'var(--unstarted)'},
  {key:'started', label:'In Progress', color:'var(--started)'},
  {key:'completed', label:'Done', color:'var(--completed)'},
  {key:'canceled', label:'Canceled', color:'var(--canceled)'},
];

let state = { search:'', priority:'', label:'', view:'board' };

function allLabels(){
  const s = new Set();
  ISSUES.forEach(i => (i.labels||[]).forEach(l => l && s.add(l)));
  return [...s].sort();
}
function allPriorities(){
  const s = new Set();
  ISSUES.forEach(i => i.priority && s.add(i.priority));
  return [...s];
}

function populateFilters(){
  const pf = document.getElementById('priorityFilter');
  allPriorities().forEach(p => { const o=document.createElement('option'); o.value=p; o.textContent=p; pf.appendChild(o); });
  const lf = document.getElementById('labelFilter');
  allLabels().forEach(l => { const o=document.createElement('option'); o.value=l; o.textContent=l; lf.appendChild(o); });
}

function filtered(){
  return ISSUES.filter(i => {
    if (state.search) {
      const q = state.search.toLowerCase();
      if (!((i.title||'').toLowerCase().includes(q) || (i.id||'').toLowerCase().includes(q))) return false;
    }
    if (state.priority && i.priority !== state.priority) return false;
    if (state.label && !(i.labels||[]).includes(state.label)) return false;
    return true;
  });
}

function renderBoard(){
  const root = document.getElementById('board');
  root.innerHTML = '';
  const items = filtered();
  COLUMNS.forEach(col => {
    const colIssues = items.filter(i => (i.statusType||'').toLowerCase() === col.key);
    const colEl = document.createElement('div');
    colEl.className = 'column';
    colEl.innerHTML = '<div class="column-header"><span class="dot" style="background:' + col.color + '"></span>' + col.label + ' <span style="color:var(--muted);font-weight:400">(' + colIssues.length + ')</span></div><div class="column-body"></div>';
    const body = colEl.querySelector('.column-body');
    colIssues.forEach(i => body.appendChild(card(i)));
    root.appendChild(colEl);
  });
}

function card(i){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = '<div class="id">' + i.id + '</div>' +
    '<div class="title">' + escapeHtml(i.title||'') + '</div>' +
    '<div class="meta">' +
      (i.priority ? '<span class="badge priority ' + i.priority + '">' + i.priority + '</span>' : '') +
      (i.labels||[]).map(l => '<span class="badge">' + escapeHtml(l) + '</span>').join('') +
      (i.comments && i.comments.length ? '<span class="badge">💬 ' + i.comments.length + '</span>' : '') +
    '</div>';
  el.addEventListener('click', () => openModal(i));
  return el;
}

function renderList(){
  const tbody = document.querySelector('#list tbody');
  tbody.innerHTML = '';
  filtered().forEach(i => {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + i.id + '</td><td>' + escapeHtml(i.title||'') + '</td><td>' + escapeHtml(i.status||'') + '</td><td>' + escapeHtml(i.priority||'') + '</td><td>' + (i.labels||[]).join(', ') + '</td><td>' + (i.updatedAt ? i.updatedAt.slice(0,10) : '') + '</td>';
    tr.addEventListener('click', () => openModal(i));
    tbody.appendChild(tr);
  });
}

function escapeHtml(s){ return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function openModal(i){
  const root = document.getElementById('modalRoot');
  const sub = (i.subIssues||[]).map(id => '<li>' + id + '</li>').join('');
  root.innerHTML = '<div class="overlay" id="overlay"><div class="modal">' +
    '<button class="close" id="closeModal">×</button>' +
    '<div class="id">' + i.id + (i.linearUrl ? ' — <a href="' + i.linearUrl + '" target="_blank" rel="noopener">Linear</a>' : '') + '</div>' +
    '<h2>' + escapeHtml(i.title||'') + '</h2>' +
    '<div class="meta-row">' +
      '<span>Status: <strong>' + escapeHtml(i.status||'') + '</strong></span>' +
      (i.priority ? '<span>Priority: <strong>' + i.priority + '</strong></span>' : '') +
      (i.assignee ? '<span>Assignee: ' + escapeHtml(i.assignee) + '</span>' : '') +
      (i.project ? '<span>Project: ' + escapeHtml(i.project) + '</span>' : '') +
      (i.milestone ? '<span>Milestone: ' + escapeHtml(i.milestone) + '</span>' : '') +
      (i.parent ? '<span>Parent: ' + i.parent + '</span>' : '') +
    '</div>' +
    (i.description ? i.descriptionHtml : '<p style="color:var(--muted)">No description.</p>') +
    (sub ? '<div class="section-title">Sub-issues</div><ul>' + sub + '</ul>' : '') +
    (i.comments && i.comments.length ? '<div class="section-title">Comments (' + i.comments.length + ')</div>' + i.comments.map(c => '<div class="comment"><div class="who">' + escapeHtml(c.author) + ' — ' + escapeHtml(c.date) + '</div>' + c.html + '</div>').join('') : '') +
    '</div></div>';
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('overlay').addEventListener('click', e => { if (e.target.id === 'overlay') closeModal(); });
}
function closeModal(){ document.getElementById('modalRoot').innerHTML = ''; }

function renderAll(){
  document.getElementById('count').textContent = filtered().length + ' / ' + ISSUES.length + ' issues';
  if (state.view === 'board') { document.getElementById('board').classList.remove('hidden'); document.getElementById('list').classList.add('hidden'); renderBoard(); }
  else { document.getElementById('board').classList.add('hidden'); document.getElementById('list').classList.remove('hidden'); renderList(); }
}

document.getElementById('search').addEventListener('input', e => { state.search = e.target.value; renderAll(); });
document.getElementById('priorityFilter').addEventListener('change', e => { state.priority = e.target.value; renderAll(); });
document.getElementById('labelFilter').addEventListener('change', e => { state.label = e.target.value; renderAll(); });
document.querySelectorAll('.view-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.view = btn.dataset.view;
    renderAll();
  });
});

populateFilters();
renderAll();
</script>
</body>
</html>
`;

fs.mkdirSync(TRACKER_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, template, 'utf8');
console.log('Wrote', OUT_FILE, 'with', issues.length, 'issues');
