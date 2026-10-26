// Copy audit of the Honey It's Handled plan in every state the controls can reach.
// usage: node plan-honey-copy.js <base> [plant]   With "plant", a dash, a colon, a banned word and an uncontracted verb are
// planted into the page first and the audit must find all four.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const base = (process.argv[2] || 'http://127.0.0.1:8731').replace(/\/$/, ''), plant = process.argv[3] === 'plant';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  let all = '';
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const grab = () => p.evaluate(() => {
      const t = [document.title, document.querySelector('meta[name=description]').content, document.body.innerText];
      document.querySelectorAll('[alt]').forEach(e => e.alt && t.push(e.alt));
      document.querySelectorAll('[aria-label],[aria-valuetext],title').forEach(e => t.push(e.getAttribute('aria-label') || '', e.getAttribute('aria-valuetext') || '', e.tagName === 'title' ? e.textContent : ''));
      document.querySelectorAll('details, .bc-m, .rlist, .rtab, .mo-leg, figcaption, svg text').forEach(e => t.push(e.textContent));
      return t.join('\n');
    });
    const range = (id, v) => p.evaluate(([id, v]) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]);
    await p.goto(base + '/', { waitUntil: 'networkidle' });
    if (plant) await p.evaluate(() => { const e = document.querySelector('.cv .lead'); e.textContent += ' A well-planned day: it is seamless.'; });
    await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true));
    all += await grab();
    for (const s of ['city', 'prov', 'fl']) for (const k of [1, 2, 10, 20]) { await p.click(`[data-scope="${s}"]`); await range('fld-k', k); all += '\n' + await grab(); }
    for (const y of ['2027', '2028']) for (const l of [6, 9, 12, 13, 15, 18, 21, 24]) { await p.click(`[data-year="${y}"]`); await range('cal-l', l); all += '\n' + await grab(); }
    for (const v of ['ig', 'told']) { await p.click(`[data-view="${v}"]`); all += '\n' + await grab(); }
    for (const bud of [10000, 31750, 55250, 100000]) { await range('mo-b', bud); all += '\n' + await grab(); }
    await p.close();
  }
  await b.close();
  require('fs').writeFileSync(require('path').join(__dirname, 'plan-honey-copy.txt'), all);
  // Words quoted from their own pages are theirs (in straight or curly quotes), URLs, slugs and emails are exempt
  const ours = all.replace(/"[^"\n]*"/g, ' ').replace(/“[^”]*”/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/\b[\w.-]+\.(?:com|co\.uk|net|app|be|nl)(?:\/[\w./-]*)?/g, ' ').replace(/[\w.]+@[\w.]+/g, ' ');
  const lines = [...new Set(ours.split('\n'))];
  const hit = (re, n) => { const h = lines.filter(l => re.test(l)); console.log(n, h.length ? h.length + ' ' + JSON.stringify(h.slice(0, 8)) : 'none'); return h.length; };
  let bad = 0, found = 0;
  const f = (re, n) => { const k = hit(re, n); bad += k; if (k) found++; };
  f(/[‐-―−]|(^|\s)-|-(\s|$)|\w-\w/, 'dashes');
  f(/:/, 'colons');
  f(/\b(delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz|transform|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting.edge|state.of.the.art|best.in.class|world.class|bespoke|holistic|innovative|groundbreaking|game.chang|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future.proof|end.to.end|turnkey|customer.centric|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|rest assured|look no further|solutions|journey|navigate|elevated|showcase|stunning|vibrant|tailored|potential|opportunity|expertise|excellence)\b/i, 'banned words');
  f(/(it's worth noting|worth noting|in many cases|in most cases|tends to|generally|typically|arguably|to some extent|that said|at its core|when it comes to|not just|isn't just|not only|let's be honest|honestly)/i, 'hedges');
  f(/\b(it is|do not|does not|you will|we are|cannot|will not|that is|we would|you would|they are|there is|we have|you are|is not|are not)\b/i, 'uncontracted');
  f(/!/, 'exclamations');
  console.log('contractions', (ours.match(/\b\w+['’](s|t|re|ll|d|ve)\b/gi) || []).length, '| problems', bad);
  if (plant) { console.log('plant mode, kinds found', found, 'of 4 planted (dash, colon, banned word, uncontracted)'); process.exit(found >= 4 ? 0 : 1); }
  process.exit(bad ? 1 : 0);
})();
