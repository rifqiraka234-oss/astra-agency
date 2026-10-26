// Copy audit over every state a visitor can reach on v2. usage: NODE_PATH=... node qa/copy-v2.js <base url> [plant]
// Collects the visible text, alts, labels, placeholders, the title and description, every option, the hidden lines a
// choice reveals, every path's words, the letter in each state and the fallback mail, then runs the house bans. With
// "plant", a line carrying a dash, a colon, a banned word, a hedge, an uncontracted verb and an exclamation is added
// first, and each check must report it.
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.setDefaultTimeout(8000); let all = '';
  const grab = () => p.evaluate(() => {
    const t = [document.title, document.querySelector('meta[name=description]').content, document.body.innerText];
    document.querySelectorAll('[alt]').forEach(e => e.alt && t.push(e.alt));
    document.querySelectorAll('[aria-label],[aria-valuetext],[placeholder],[title]').forEach(e => t.push(e.getAttribute('aria-label') || '', e.getAttribute('aria-valuetext') || '', e.getAttribute('placeholder') || '', e.getAttribute('title') || ''));
    document.querySelectorAll('option, [hidden], .sr, .pp, .p-only, .hl, .pin b, textarea, figcaption, .sbar, .plan, .mt, .behind-l').forEach(e => t.push(e.textContent));
    document.querySelectorAll('textarea').forEach(e => t.push(e.value));
    const m = document.querySelector('[data-mail]'); if (m && /body=/.test(m.href)) t.push(decodeURIComponent(m.href.split('body=')[1]), decodeURIComponent(m.href.split('subject=')[1].split('&')[0]));
    return t.join('\n');
  });
  const set = o => p.evaluate(o => { if (o.date) o.date = new Date(o.date[0], o.date[1] - 1, o.date[2]); window.HIH.set(o); }, o);
  await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(800);
  if (plant) await p.evaluate(() => { const d = document.createElement('p'); d.textContent = 'Planted — a seamless note: it is worth noting we will not. Wow!'; document.querySelector('main').appendChild(d); });
  all += await grab();
  const states = [
    { help: 'partial', tabs: [0, 3, 10, 16] }, { help: 'partial', tabs: [] }, { help: 'day' }, { place: 'abroad' }, { first: false },
    { noDate: true, year: 2027 }, { noDate: true, year: 2029 }, { noDate: false, date: [2029, 5, 19] }, { date: [2026, 12, 5] },
    { guests: 10 }, { guests: 125 }, { guests: 300 }, { guests: 600 },
    { path: 'private' }, { path: 'private', help: 'coord', tabs: [5, 6] }, { path: 'private', help: 'coord', tabs: [] }, { path: 'private', kind: 4 }, { path: 'private', noDate: true, year: 2028 },
    { path: 'company' }, { path: 'company', help: 'coord', tabs: [11, 12] }, { path: 'company', help: 'coord', tabs: [] }, { path: 'company', help: 'freelance', tabs: [] }, { path: 'company', help: 'freelance', tabs: [5, 11, 6] }, { path: 'company', kind: 0 }, { path: 'company', kind: 4 },
    { path: 'wedding', help: 'full', place: 'local', first: true, guests: 100, date: [2027, 6, 12] }];
  for (const s of states) { await set(s); await p.waitForTimeout(60); all += '\n' + await grab(); }
  await p.click('[data-peek]'); all += '\n' + await grab(); await p.click('[data-peek]');
  await p.evaluate(() => document.getElementById('letter').scrollIntoView()); await p.waitForTimeout(300);
  await p.click('.send'); await p.waitForTimeout(150); all += '\n' + await grab();
  await p.fill('[data-letter] input[name="first"]', 'Lotte'); await p.click('.send'); await p.waitForTimeout(150); all += '\n' + await grab();
  await p.fill('[data-letter] input[name="last"]', 'Peeters'); await p.fill('[data-letter] input[name="email"]', 'x'); await p.click('.send'); await p.waitForTimeout(150); all += '\n' + await grab();
  await p.fill('[data-f="message"]', ''); await p.fill('[data-letter] input[name="email"]', 'lotte@example.com'); await p.click('.send'); await p.waitForTimeout(150); all += '\n' + await grab();
  await p.click('[data-rewrite]'); await p.selectOption('select[name="found"]', 'Instagram'); await p.click('.send'); await p.waitForTimeout(1800); all += '\n' + await grab();
  for (const [w, h] of [[390, 844]]) {
    const m = await (await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true })).newPage();
    await m.goto(U, { waitUntil: 'load' }); await m.click('.mbtn'); await m.waitForTimeout(200); all += '\n' + await m.evaluate(() => document.body.innerText);
  }
  const nf = await b.newPage(); await nf.goto(base + '/404.html'); all += '\n' + await nf.evaluate(() => document.title + '\n' + document.body.innerText);
  await b.close();
  require('fs').writeFileSync(__dirname + '/copy-dump-v2.txt', all);
  // Jan Geysen's words are quoted with his own exclamation mark, so that one sentence is taken out before the checks.
  // URLs, the email address and the proper nouns as written (Pro League Awards ’26) are not our prose.
  let ours = all.split('My 50th birthday party has become an incredible memory, thanks to the collaboration with Honey it’s Handled!').join(' ')
    .replace(/https?:\/\/\S+/g, ' ').replace(/[\w.]+@[\w.]+/g, ' ').replace(/mailto\S*/g, ' ');
  const lines = [...new Set(ours.split('\n').map(s => s.trim()).filter(Boolean))];
  const hit = (re, n) => { const h = lines.filter(l => re.test(l)); console.log(n.padEnd(14), h.length ? h.length + ' ' + JSON.stringify(h.slice(0, 6)) : 'none'); return h.length; };
  let bad = 0;
  bad += hit(/[‐-―−]|(^|\s)-|-(\s|$)|\w-\w/, 'dashes');
  bad += hit(/:/, 'colons');
  bad += hit(/\b(delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|optimi[sz]e|revolutioni[sz]|transform|supercharge|amplify|foster|cultivate|facilitate|embark|underscore|spearhead|reimagine|redefine|bolster|resonate|showcase|curat\w*|crafted|seamless|robust|cutting.edge|state.of.the.art|best.in.class|world.class|bespoke|tailored|holistic|innovative|groundbreaking|game.chang|unparalleled|unprecedented|comprehensive|meticulous|immersive|pivotal|crucial|vital|paramount|impactful|scalable|future.proof|end.to.end|turnkey|customer.centric|vibrant|stunning|breathtaking|sleek|landscape|ecosystem|realm|tapestry|journey|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|expertise|excellence|possibilities|offering|solutions?|furthermore|moreover|additionally|consequently|ultimately|essentially|fundamentally|rest assured|look no further)\b/i, 'banned words');
  bad += hit(/(it's worth noting|it’s worth noting|worth noting|in many cases|in most cases|tends to|generally|typically|arguably|to some extent|that said|at its core|when it comes to|not just|honestly|let's talk|let’s talk|whether you're|whether you’re)/i, 'hedges');
  bad += hit(/\b(it is|do not|does not|you will|we are|cannot|will not|that is|i am|we will|i will|you are|they are|is not|are not|i would|we would)\b/i, 'uncontracted');
  bad += hit(/!/, 'exclamations');
  console.log('contractions'.padEnd(14), (ours.match(/\b\w+['’](s|t|re|ll|d|ve|m)\b/gi) || []).length, '| unique lines', lines.length, '| characters', all.length);
  console.log(bad ? 'COPY FAIL ' + bad : 'COPY CLEAN');
})();
