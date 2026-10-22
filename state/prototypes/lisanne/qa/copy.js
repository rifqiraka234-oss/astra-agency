// Visible text audit across both sites, every app route and state, with a planted control.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const WORDS = /\b(delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz\w*|transform\w*|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting-edge|state-of-the-art|best-in-class|world-class|bespoke|holistic|innovative|groundbreaking|game-chang\w*|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future-proof|end-to-end|turnkey|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|solutions)\b/gi;
const PHR = /(I came across|take your .* to the next level|in today's|let's create something|stand out from the crowd|we pride ourselves|it's important to note|at the end of the day|here's the thing|when it comes to|not just .*(but|it's)|whether you're a|worth noting|that said|at its core)/gi;
const ALLOW = [/https?:\/\/\S+/g, /\b[\w.-]+\.(netlify\.app|com|nl)\b\S*/g, /\b\d+:\d+[a-z]?\b/g, /De Jong - Vanhommerig/g, /De Jong – Vanhommerig/g, /\b[Rr]e-integratie\w*/g, /\bAI-\w+/g, /\b(42e|WIA)-\w+/g, /proces-verbaal/g, /\b[Ee]-mail\w*/g, /\d{2}-\d{2}-\d{4}/g, /\d{4}-\d{3}/g, /\b\w+-?\s?\w*BV\b/g];
function audit(label, text, out) {
  let t = text; for (const a of ALLOW) t = t.replace(a, ' ');
  const lines = t.split(/\n/);
  lines.forEach(l => {
    const c = l.match(/[:]|[–—]|\s-\s|\w-\w/g); const w = l.match(WORDS); const p = l.match(PHR);
    if (c || w || p) out.push(`${label} | ${c ? 'PUNCT ' + c.join(' ') : ''} ${w ? 'WORD ' + w.join(',') : ''} ${p ? 'PHRASE ' + p.join(',') : ''} | ${l.trim().slice(0, 140)}`);
  });
}
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const out = [];
  audit('CONTROL', 'This planted line: has a colon — and a dash and we leverage seamless synergy.', out);
  await p.goto('http://127.0.0.1:8765/site-plan/'); await p.waitForTimeout(3500);
  audit('plan', await p.evaluate(() => document.body.innerText), out);
  audit('plan-alt', await p.evaluate(() => [...document.querySelectorAll('[alt],[aria-label],title')].map(e => e.getAttribute('alt') || e.getAttribute('aria-label') || e.textContent).join('\n')), out);
  const A = 'http://127.0.0.1:8765/site-app/';
  await p.goto(A); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(500);
  for (const r of ['#/', '#/bureau/s1', '#/bureau/s2', '#/bureau/s3', '#/bureau/s4', '#/termijnen', '#/resultaten', '#/instellingen', '#/wegwijzer']) {
    await p.goto(A + r); await p.waitForTimeout(400);
    audit('app' + r, await p.evaluate(() => document.body.innerText + '\n' + [...document.querySelectorAll('textarea')].map(t => t.value).join('\n')), out);
  }
  const d0 = new Date(); d0.setDate(d0.getDate() - 62); await p.fill('#d0', d0.toISOString().slice(0, 10)); await p.click('[data-act=ww-1]');
  audit('ww2', await p.evaluate(() => document.body.innerText), out);
  for (const f of ['conflict', 'arts', 'loon', 'pva', 'werk', 'vso']) await p.check(`[data-flag=${f}]`);
  await p.click('[data-act=ww-2]'); audit('ww3', await p.evaluate(() => document.body.innerText), out);
  await p.goto(A + '#/bureau'); await p.click('[data-act=paste]'); await p.click('[data-m=ex]'); await p.click('[data-m=go]'); await p.waitForTimeout(400);
  audit('pasted', await p.evaluate(() => document.body.innerText + '\n' + [...document.querySelectorAll('textarea')].map(t => t.value).join('\n')), out);
  console.log(out.join('\n'));
  await b.close();
})();
