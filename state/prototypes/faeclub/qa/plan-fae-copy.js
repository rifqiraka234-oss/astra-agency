// Copy audit of the Fae Club plan in every state the controls can reach. usage: node plan-fae-copy.js <base>
const { chromium } = require('playwright');
const base = (process.argv[2] || 'http://127.0.0.1:8705').replace(/\/$/, '');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); let all = '';
  const grab = () => p.evaluate(() => {
    const t = [document.title, document.querySelector('meta[name=description]').content, document.body.innerText];
    document.querySelectorAll('[alt]').forEach(e => e.alt && t.push(e.alt));
    document.querySelectorAll('[aria-label],[aria-valuetext]').forEach(e => t.push(e.getAttribute('aria-label') || '', e.getAttribute('aria-valuetext') || ''));
    document.querySelectorAll('details, .bc-m, .sr').forEach(e => t.push(e.textContent));
    return t.join('\n');
  });
  await p.goto(base + '/', { waitUntil: 'networkidle' }); all += await grab();
  for (const [pay, when] of [['f', 't'], ['f', 'n'], ['3', 'n'], ['3', 't']]) { await p.click(`[data-pay="${pay}"]`); await p.click(`[data-when="${when}"]`); all += '\n' + await grab(); }
  await p.click('[data-show="today"]'); all += '\n' + await grab();
  for (const [o, m] of [[10, 1], [60, 1], [400, 20]]) {
    await p.evaluate(([o, m]) => { const a = document.getElementById('hr-o'), c = document.getElementById('hr-m'); a.value = o; c.value = m; a.dispatchEvent(new Event('input')); c.dispatchEvent(new Event('input')); }, [o, m]);
    all += '\n' + await grab();
  }
  await b.close();
  require('fs').writeFileSync('plan-fae-copy.txt', all);
  // Her own words in quotes are hers, URLs, slugs and emails are exempt
  let ours = all.replace(/“[^”]*”/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/\b[\w.-]+\.(?:com|co\.uk|net|app)(?:\/[\w./-]*)?/g, ' ').replace(/[\w.]+@[\w.]+/g, ' ');
  const lines = [...new Set(ours.split('\n'))];
  const hit = (re, n) => { const h = lines.filter(l => re.test(l)); console.log(n, h.length ? h.length + ' ' + JSON.stringify(h.slice(0, 8)) : 'none'); return h.length; };
  let bad = 0;
  bad += hit(/[‐-―−]|(^|\s)-|-(\s|$)|\w-\w/, 'dashes');
  bad += hit(/:/, 'colons');
  bad += hit(/\b(delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz|transform|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting.edge|state.of.the.art|best.in.class|world.class|bespoke|holistic|innovative|groundbreaking|game.chang|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future.proof|end.to.end|turnkey|customer.centric|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|rest assured|look no further|solutions|journey|navigate|elevated)/i, 'banned words');
  bad += hit(/(it's worth noting|worth noting|in many cases|in most cases|tends to|generally speaking|arguably|to some extent|that said|at its core|when it comes to|not just|isn't just|not only)/i, 'hedges');
  bad += hit(/\b(it is|do not|does not|you will|we are|cannot|will not|that is|we would|you would|they are|there is)\b/i, 'uncontracted');
  bad += hit(/!/, 'exclamations');
  console.log('contractions', (ours.match(/\b\w+['’](s|t|re|ll|d|ve)\b/gi) || []).length, '| problems', bad);
})();
