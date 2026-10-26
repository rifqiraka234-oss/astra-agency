// Copy audit over every state the BWILD page can show. usage: node bwild-copy.js <base url> [plan]
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, '');
(async () => {
  const b = await chromium.launch(); let all = '';
  const grab = p => p.evaluate(() => {
    const t = [document.title, document.querySelector('meta[name=description]').content, document.body.innerText];
    document.querySelectorAll('[alt]').forEach(e => e.alt && t.push(e.alt));
    document.querySelectorAll('[aria-label],[aria-valuetext],[placeholder],[title]').forEach(e => t.push(e.getAttribute('aria-label') || '', e.getAttribute('aria-valuetext') || '', e.getAttribute('placeholder') || '', e.getAttribute('title') || ''));
    document.querySelectorAll('details p, .caps li, option, [hidden], noscript').forEach(e => t.push(e.textContent));
    return t.join('\n');
  });
  const plan = process.argv[3] === 'plan';
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await p.goto(base + '/', { waitUntil: 'networkidle' }); all += await grab(p);
    if (plan) {
      for (const k of ['tab', 'new', 'bar']) { await p.click(`[data-rt="${k}"]`); all += '\n' + await grab(p); }
      for (const c of ['london', 'stockholm']) { await p.selectOption('[data-c]', c); all += '\n' + await grab(p); }
      continue;
    }
    await p.click('[data-pick="night"]'); all += '\n' + await grab(p);
    for (const c of ['london', 'stockholm', 'barcelona']) { await p.selectOption('#run select', c); all += '\n' + await grab(p); }
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40); }
    all += '\n' + await grab(p);
    await p.evaluate(() => document.querySelector('#reserve').scrollIntoView());
    await p.fill('[data-rs] input[name=email]', 'x'); await p.click('[data-rs] button[type=submit]'); all += '\n' + await grab(p);
    await p.fill('[data-rs] input[name=email]', 'a@b.co'); await p.click('[data-rs] button[type=submit]'); await p.waitForTimeout(300); all += '\n' + await grab(p);
    await p.evaluate(() => document.querySelector('#adventure').scrollIntoView()); await p.click('[data-add]'); await p.waitForTimeout(200); all += '\n' + await grab(p);
    await p.keyboard.press('Escape');
    if (w < 500) { await p.evaluate(() => scrollTo(0, 0)); await p.click('.mbtn'); await p.waitForTimeout(150); all += '\n' + await grab(p); }
  }
  await b.close();
  require('fs').writeFileSync(process.argv[3] === 'plan' ? 'plan-copy.txt' : 'bwild-copy.txt', all);
  const ours = all.replace(/https?:\/\/\S+/g, ' ').replace(/\b[\w.]+@[\w.]+\b/g, ' ').replace(/\b[\w-]+\.(com|ch|org)\b/g, ' ');
  const lines = [...new Set(ours.split('\n').map(l => l.trim()).filter(Boolean))];
  let flags = 0;
  const hit = (re, n) => { const h = lines.filter(l => re.test(l)); flags += h.length; console.log(n.padEnd(14), h.length ? h.length + ' ' + JSON.stringify(h.slice(0, 10)) : 'none'); };
  hit(/[‐-―−]|(^|\s)-|-(\s|$)|\w-\w/, 'dashes');
  hit(/:/, 'colons');
  hit(/\b(delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz|transform|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting.edge|state.of.the.art|best.in.class|world.class|bespoke|holistic|innovative|groundbreaking|game.chang|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future.proof|end.to.end|turnkey|customer.centric|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|rest assured|look no further|solutions|journey|game changer|next level)\b/i, 'banned words');
  hit(/(it's worth noting|worth noting|in many cases|in most cases|tends to|generally speaking|arguably|to some extent|that said|at its core|when it comes to|not just .* but|whether you're)/i, 'hedges');
  hit(/(simple|clean|fast|powerful|modern|elegant|light|small) (yet|but) (powerful|complex|flexible|capable|bold|strong|mighty)/i, 'paired adj');
  hit(/\b(it is|do not|does not|you will|we are|cannot|will not|that is|is not|are not|I am|you are|there is|what is|we will|it will)\b/i, 'uncontracted');
  hit(/!/, 'exclamation');
  hit(/[\u{1F300}-\u{1FAFF}☀-➿]/u, 'emoji');
  console.log('contractions ', (ours.match(/\b\w+['’](s|t|re|ll|d|ve|m)\b/gi) || []).length, ' lines', lines.length, ' flags', flags);
})();
