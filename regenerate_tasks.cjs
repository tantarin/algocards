/**
 * Полная пересборка tasks*.txt из problems.js (формат как в репозитории).
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

function compactCode(code) {
  return String(code || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((l) => l.trim() !== '')
    .join('\n');
}

function taskBlock(p, i) {
  const parts = [`#${i + 1} ${p.t || ''}`];
  const d = cleanDesc(p.desc || '');
  if (d) parts.push(d);
  const e = stripMarkers(String(p.expl || '').trim());
  if (e) parts.push(e);
  const c = compactCode(p.code || '');
  if (c) parts.push(c);
  return parts.join('\n') + '\n';
}

const blocks = P.map((p, i) => taskBlock(p, i));
const full = blocks.join('');
fs.writeFileSync(path.join(root, 'tasks.txt'), full, 'utf8');
console.log('tasks.txt:', P.length, 'задач');

const lastNum = P.length;
const splits = [
  { name: 'tasks_1-40.txt', from: 0, to: 39 },
  { name: 'tasks_41-80.txt', from: 40, to: 79 },
  { name: 'tasks_81-120.txt', from: 80, to: 119 },
  { name: `tasks_121-${lastNum}.txt`, from: 120, to: P.length - 1 },
];

for (const sp of splits) {
  const slice = blocks.slice(sp.from, sp.to + 1).join('');
  fs.writeFileSync(path.join(root, sp.name), slice, 'utf8');
  console.log(sp.name, ':', sp.to - sp.from + 1, 'задач');
}

const oldSplit = path.join(root, 'tasks_121-161.txt');
if (fs.existsSync(oldSplit)) {
  fs.unlinkSync(oldSplit);
  console.log('удалён устаревший tasks_121-161.txt');
}
