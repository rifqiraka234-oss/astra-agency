// Copy audit over every state a visitor can reach. usage: node qa/copy.js <base url> [plant]
// Collects the visible text, alts, labels, placeholders, the title and description, every option, every note, the hidden
// lines a choice reveals, the fallback mail, and runs the house bans over all of it. With "plant", a line with a dash, a
// colon, a banned word, a hedge and an uncontracted verb is added first, and each check must report it.
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); let all = '';
  const grab = () => p.evaluate(() => {
    const t = [document.title, document.querySelector('meta[name=description]').content, document.body.innerText];
    document.querySelectorAll('[alt]').forEach(e => e.alt && t.push(e.alt));
    document.querySelectorAll('[aria-label],[aria-valuetext],[placeholder],[title]').forEach(e => t.push(e.getAttribute('aria-label') || '', e.getAttribute('aria-valuetext') || '', e.getAttribute('placeholder') || '', e.getAttribute('title') || ''));
    document.querySelectorAll('option, .notes li, .steps li, [hidden], .sr, noscript, textarea, figcaption, .sbar').forEach(e => t.push(e.textContent));
    document.querySelectorAll('textarea').forEach(e => t.push(e.value));
    const m = document.querySelector('[data-mail]'); if (m && /body=/.test(m.href)) t.push(decodeURIComponent(m.href.split('body=')[1]), decodeURIComponent(m.href.split('subject=')[1].split('&')[0]));
    return t.join('\n');
  });
  const set = s => p.evaluate(s => window.HIH.set(s), s);
  await p.goto(U, { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  if (plant) await p.evaluate(() => { const d = document.createElement('p'); d.textContent = 'Planted — a seamless note: it is worth noting we will not. Wow!'; document.querySelector('main').appendChild(d); });
  all += await grab();
  // walk the year scene so every note, step and day label has shown
  const run = await p.evaluate(() => { const r = document.querySelector('.year-run'); return [r.getBoundingClientRect().top + scrollY, r.offsetHeight]; });
  for (let f = 0; f <= 1; f += 0.1) { await p.evaluate(([t, h, f]) => scrollTo(0, t + (h - innerHeight) * f), [run[0], run[1], f]); await p.waitForTimeout(220); all += '\n' + await p.evaluate(() => document.querySelector('[data-o="inkDay"]').textContent + '\n' + document.querySelector('.steps').innerText); }
  for (const s of [{ help: 'partial' }, { help: 'day' }, { place: 'destination' }, { guests: 10 }, { guests: 125 }, { guests: 300 }, { guests: 600 }, { first: false }, { noDate: true, year: 2027 }, { noDate: true, year: 2029 }, { noDate: false, date: new Date(2029, 4, 19) }, { date: new Date(2027, 5, 12), help: 'full', place: 'local', guests: 100, first: true }]) { await set(s); await p.waitForTimeout(120); all += '\n' + await grab(); }
  await p.evaluate(() => document.getElementById('letter').scrollIntoView()); await p.waitForTimeout(300);
  await p.click('.send'); await p.waitForTimeout(200); all += '\n' + await grab();
  await p.fill('input[name="first"]', 'Lotte'); await p.click('.send'); await p.waitForTimeout(200); all += '\n' + await grab();
  await p.fill('input[name="last"]', 'Peeters'); await p.fill('input[name="email"]', 'x'); await p.click('.send'); await p.waitForTimeout(200); all += '\n' + await grab();
  await p.fill('[data-f="message"]', 'Our own words'); await p.waitForTimeout(100); all += '\n' + await grab();
  await p.click('[data-rewrite]'); await p.fill('input[name="email"]', 'lotte@example.com'); await p.selectOption('select[name="found"]', 'Instagram'); await p.click('.send'); await p.waitForTimeout(2600); all += '\n' + await grab();
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await m.goto(U, { waitUntil: 'networkidle' }); await m.click('.mbtn'); await m.waitForTimeout(200); all += '\n' + await m.evaluate(() => document.body.innerText);
  await b.close();
  require('fs').writeFileSync(__dirname + '/copy-dump.txt', all);
  // strip what isn't our prose, URLs, the email address, and the proper nouns written as they are
  let ours = all.replace(/https?:\/\/\S+/g, ' ').replace(/[\w.]+@[\w.]+/g, ' ').replace(/mailto\S*/g, ' ');
  const lines = [...new Set(ours.split('\n').map(s => s.trim()).filter(Boolean))];
  const hit = (re, n) => { const h = lines.filter(l => re.test(l)); console.log(n.padEnd(14), h.length ? h.length + ' ' + JSON.stringify(h.slice(0, 6)) : 'none'); return h.length; };
  let bad = 0;
  bad += hit(/[‐-―−]|(^|\s)-|-(\s|$)|\w-\w/, 'dashes');
  bad += hit(/:/, 'colons');
  bad += hit(/\b(delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz|transform|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting.edge|state.of.the.art|best.in.class|world.class|bespoke|holistic|innovative|groundbreaking|game.chang|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future.proof|end.to.end|turnkey|customer.centric|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|rest assured|look no further|solutions|tailored|journey|vibrant|stunning|breathtaking|elevated)\b/i, 'banned words');
  bad += hit(/(it's worth noting|it’s worth noting|worth noting|in many cases|in most cases|tends to|generally speaking|arguably|to some extent|that said|at its core|when it comes to|not just|honestly)/i, 'hedges');
  bad += hit(/\b(it is|do not|does not|you will|we are|cannot|will not|that is|i am|we will|i will|you are|they are|is not|are not)\b/i, 'uncontracted');
  bad += hit(/!/, 'exclamations');
  console.log('contractions'.padEnd(14), (ours.match(/\b\w+['’](s|t|re|ll|d|ve|m)\b/gi) || []).length, '| unique lines', lines.length, '| characters', all.length);
  console.log(bad ? 'COPY FAIL ' + bad : 'COPY CLEAN');
})();
