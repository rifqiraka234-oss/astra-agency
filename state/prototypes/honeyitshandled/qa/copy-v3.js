// Copy audit over every state a visitor can reach on v3, both pages. usage: NODE_PATH=... node qa/copy-v3.js <base url> [plant]
// Collects the visible text, alts, labels, placeholders, the title and description, every option, hidden lines a choice
// reveals, the reply card and message in each state, the errors, the sealed state, the fallback mails, the phone menu and
// the 404 page, then runs the house bans. Her own words are quoted as written (Jan Geysen's two sentences with his
// exclamation marks, her palette line with its hyphen in Off-White), so those exact strings are taken out first and
// nothing else is. With "plant", a line with a dash, a colon, a banned word, a hedge, an uncontracted verb and an
// exclamation is added, and every check must report it.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const D = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'build-v3', 'data', 'site.json'), 'utf8'));
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.setDefaultTimeout(8000); let all = '';
  const grab = () => p.evaluate(() => {
    const t = [document.title, document.querySelector('meta[name=description]').content, document.body.innerText];
    document.querySelectorAll('[alt]').forEach(e => e.alt && t.push(e.alt));
    document.querySelectorAll('[aria-label],[aria-valuetext],[placeholder],[title]').forEach(e => t.push(e.getAttribute('aria-label') || '', e.getAttribute('aria-valuetext') || '', e.getAttribute('placeholder') || '', e.getAttribute('title') || ''));
    document.querySelectorAll('option, [hidden], .sr, legend, .lt-n, textarea, figcaption, .bar-s, [data-o], #events, .hero-note, .foot-n').forEach(e => t.push(e.textContent));
    document.querySelectorAll('textarea').forEach(e => t.push(e.value));
    document.querySelectorAll('[data-mail]').forEach(m => { if (/body=/.test(m.href)) t.push(decodeURIComponent(m.href.split('body=')[1]), decodeURIComponent(m.href.split('subject=')[1].split('&')[0])); });
    return t.join('\n');
  });
  const set = o => p.evaluate(o => { if (o.date) o.date = new Date(o.date[0], o.date[1] - 1, o.date[2]); window.HIH.set(o); }, o);
  const ev = o => p.evaluate(o => window.HIH.ev.set(o), o);
  await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(800);
  if (plant) await p.evaluate(() => { const d = document.createElement('p'); d.textContent = 'Planted — a seamless note: it is worth noting we will not. Wow!'; document.querySelector('main').appendChild(d); });
  all += await grab();
  const states = [{ help: 'partial', lights: [0, 3, 10, 16] }, { help: 'partial', lights: [] }, { help: 'day' }, { place: 'abroad' }, { first: false },
    { noDate: true, year: 2027 }, { noDate: true, year: 2029 }, { noDate: false, date: [2029, 5, 19] }, { date: [2026, 12, 5] }, { guests: 10 }, { guests: 600 },
    { help: 'full', place: 'local', first: true, guests: 100, date: [2027, 6, 12] }];
  for (const s of states) { await set(s); await p.waitForTimeout(60); all += '\n' + await grab(); }
  await p.evaluate(() => document.querySelector('form[data-reply="wedding"] .send').scrollIntoView({ block: 'center' }));
  await p.fill('form[data-reply="wedding"] [data-f="message"]', ''); await p.click('form[data-reply="wedding"] .send'); await p.waitForTimeout(150); all += '\n' + await grab();
  await p.click('form[data-reply="wedding"] [data-rewrite]');
  await p.fill('input[data-k="n1"]', 'Lotte'); await p.fill('input[data-k="n2"]', 'Thomas'); await p.fill('form[data-reply="wedding"] input[type="email"]', 'lotte@example.com');
  await p.selectOption('form[data-reply="wedding"] select[name="found"]', 'Instagram'); await p.click('form[data-reply="wedding"] .send'); await p.waitForTimeout(1600); all += '\n' + await grab();
  // the events page
  await p.evaluate(() => { location.hash = '#events'; }); await p.waitForTimeout(500); all += '\n' + await grab();
  for (const o of [{ type: 'company' }, { team: true }, { type: 'private' }, { kind: 4 }, { type: 'company', kind: 4 }]) { await ev(o); await p.waitForTimeout(60); all += '\n' + await grab(); }
  await p.evaluate(() => document.querySelector('form[data-reply="event"] .send').scrollIntoView({ block: 'center' }));
  await p.click('form[data-reply="event"] .send'); await p.waitForTimeout(150); all += '\n' + await grab();
  await p.fill('input[data-e="name"]', 'An Peeters'); await p.fill('input[data-e="company"]', 'Studio Noord'); await p.fill('form[data-reply="event"] input[type="email"]', 'an@example.com');
  await p.click('form[data-reply="event"] .send'); await p.waitForTimeout(1600); all += '\n' + await grab();
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
  await m.goto(U, { waitUntil: 'load' }); await m.click('.mbtn'); await m.waitForTimeout(200); all += '\n' + await m.evaluate(() => document.body.innerText);
  await m.evaluate(() => { location.hash = '#events'; }); await m.waitForTimeout(300); await m.click('.mbtn'); await m.waitForTimeout(200); all += '\n' + await m.evaluate(() => document.body.innerText);
  const nf = await b.newPage(); await nf.goto(base + '/404.html'); all += '\n' + await nf.evaluate(() => document.title + '\n' + document.body.innerText);
  await b.close();
  fs.writeFileSync(path.join(__dirname, 'copy-dump-v3.txt'), all);
  // her words, quoted as written, come out first, and nothing else does
  const q = D.quote, allow = [q.one + ' ' + q.two, q.one, q.two, D.lines.palette.t[0]];
  let ours = all; allow.forEach(a => { ours = ours.split(a).join(' '); });
  ours = ours.replace(/https?:\/\/\S+/g, ' ').replace(/[\w.]+@[\w.]+/g, ' ').replace(/mailto\S*/g, ' ');
  const lines = [...new Set(ours.split('\n').map(s => s.trim()).filter(Boolean))];
  const hit = (re, n) => { const h = lines.filter(l => re.test(l)); console.log(n.padEnd(14), h.length ? h.length + ' ' + JSON.stringify(h.slice(0, 6)) : 'none'); return h.length; };
  let bad = 0;
  bad += hit(/[‐-―−]|(^|\s)-|-(\s|$)|\w-\w/, 'dashes');
  bad += hit(/:/, 'colons');
  bad += hit(/\b(delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|optimi[sz]e|revolutioni[sz]|transform|supercharge|amplify|foster|cultivate|facilitate|embark|underscore|spearhead|reimagine|redefine|bolster|resonate|showcase|curat\w*|crafted|seamless|robust|cutting.edge|state.of.the.art|best.in.class|world.class|bespoke|tailored|holistic|innovative|groundbreaking|game.chang|unparalleled|unprecedented|comprehensive|meticulous|immersive|pivotal|crucial|vital|paramount|impactful|scalable|future.proof|end.to.end|turnkey|customer.centric|vibrant|stunning|breathtaking|sleek|landscape|ecosystem|realm|tapestry|journey|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|expertise|excellence|possibilities|offering|solutions?|furthermore|moreover|additionally|consequently|ultimately|essentially|fundamentally|rest assured|look no further|nestled|elevated|unforgettable)\b/i, 'banned words');
  bad += hit(/(it's worth noting|it’s worth noting|worth noting|in many cases|in most cases|tends to|generally|typically|arguably|to some extent|that said|at its core|when it comes to|not just|honestly|let's talk|let’s talk|whether you're|whether you’re)/i, 'hedges');
  bad += hit(/\b(it is|do not|does not|you will|we are|cannot|will not|that is|i am|we will|i will|you are|they are|is not|are not|i would|we would)\b/i, 'uncontracted');
  bad += hit(/!/, 'exclamations');
  console.log('contractions'.padEnd(14), (ours.match(/\b\w+['’](s|t|re|ll|d|ve|m)\b/gi) || []).length, '| unique lines', lines.length, '| characters', all.length);
  console.log(bad ? 'COPY FAIL ' + bad : 'COPY CLEAN');
})();
