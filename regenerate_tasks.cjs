/**
 * Полная пересборка tasks.txt из problems.js.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
let code = fs.readFileSync(path.join(root, 'problems.js'), 'utf8');
code = code.replace(/^const P\s*=\s*/, 'var P = ');
const ctx = vm.createContext({});
vm.runInContext(code, ctx);
const P = ctx.P;
if (!Array.isArray(P) || !P.length) {
  console.error('P не загрузился');
  process.exit(1);
}

function stripMarkers(s) {
  return String(s || '').replace(/==([^=]+)==/g, '$1');
}

function cleanDesc(desc) {
  let s = stripMarkers(String(desc || '').replace(/\r\n/g, '\n'));
  const re = /\n\s*(?=\s*Пример(?:ы)?\s*\d*\s*:)/i;
  const hit = re.exec(s);
  let head = hit ? s.slice(0, hit.index) : s;
  head = head.replace(/\n\s*Ограничени(?:я|е)?\s*:[\s\S]*$/i, '').trim();
  const lines = head.split('\n');
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^-\s*\d+\s*[≤<]/.test(t)) continue;
    out.push(stripMarkers(line.trimEnd()));
  }
  return out.join('\n');
}

function compactCode(src) {
  return String(src || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((l) => l.trim() !== '')
    .join('\n');
}

function taskBlock(p) {
  const parts = [String(p.t || '')];
  const d = cleanDesc(p.desc || '');
  if (d) parts.push(d);
  const e = stripMarkers(String(p.expl || '').trim());
  if (e) parts.push(e);
  const c = compactCode(p.code || '');
  if (c) parts.push(c);
  const cbd = stripMarkers(String(p.complexityBreakdown || '').trim());
  if (cbd) parts.push(cbd);
  const cx = stripMarkers(String(p.complexity || '').trim());
  if (cx) parts.push(cx);
  const cxe = stripMarkers(String(p.complexityExpl || '').trim());
  if (cxe) parts.push(cxe);
  return parts.join('\n') + '\n';
}

const blocks = P.map((p) => taskBlock(p));
const full = blocks.join('');
fs.writeFileSync(path.join(root, 'tasks.txt'), full, 'utf8');
console.log('tasks.txt:', P.length, 'задач');
