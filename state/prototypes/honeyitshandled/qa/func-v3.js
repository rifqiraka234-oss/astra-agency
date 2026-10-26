// The functional test of v3. usage: NODE_PATH=/opt/node22/lib/node_modules node qa/func-v3.js <base url> [plant]
// Every expected value is worked out here from build-v3/data/site.json and date sums, never read off the page. Each check
// runs on a fresh page. With "plant", each check first breaks the page the way that check is there to catch, and must FAIL;
// a plant that still passes is a blind check and the run says so.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const base = (process.argv[2] || 'http://127.0.0.1:8761').replace(/\/$/, ''), PLANT = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const D = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'build-v3', 'data', 'site.json'), 'utf8'));
const LIGHTS = D.lights.map(l => l[0]), DAY = D.dayLights, YEARS = D.offerYears;
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = d => `${WD[d.getDay()]} ${d.getDate()} ${MO[d.getMonth()]} ${d.getFullYear()}`;
const shortDate = d => `${WD[d.getDay()].slice(0, 3)} ${d.getDate()} ${MO[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
const join = xs => xs.length < 2 ? (xs[0] || '') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
const low = s => s[0].toLowerCase() + s.slice(1);
const helpName = { full: 'Full planning', partial: 'Partial planning', day: 'Wedding day coordination' };
D.help.forEach(h => { if (helpName[h.id] !== h.name) throw new Error('help names moved in site.json'); });
function expect(o) {
  const s = Object.assign({ date: new Date(2027, 5, 12), noDate: false, year: 2027, place: 'local', guests: 100, help: 'full', lights: [], first: true }, o);
  const year = s.noDate ? s.year : s.date.getFullYear(), offer = YEARS.includes(year);
  const held = s.help === 'full' ? LIGHTS : s.help === 'day' ? LIGHTS.filter((n, i) => DAY.includes(i)) : LIGHTS.filter((n, i) => s.lights.includes(i));
  const when = s.noDate ? 'sometime in ' + s.year : 'on ' + longDate(s.date);
  const where = s.place === 'local' ? 'here in Belgium' : 'somewhere abroad';
  let msg = `Hi Elise, we’re getting married ${when}, ${where}, with about ${s.guests} guests. `;
  msg += s.help === 'full' ? 'We’d love full planning' : s.help === 'day' ? 'We’d love you to coordinate the day itself' : 'We’d love your help with ' + (held.length ? join(held.map(low)) : 'part of the planning');
  msg += (s.first && offer) ? ', and we’d like to be one of your first couples.' : '.';
  return {
    msg, held: held.length, offer,
    sentence: (s.noDate ? 'We’re saying I do sometime in ' + s.year : 'We’re saying I do on ' + longDate(s.date)) + `, ${where}, with about ${s.guests} guests.`,
    cardDate: when, cardPlace: `${where}, with about ${s.guests} guests`,
    cardHelp: s.help === 'full' ? 'and would love Elise’s full planning' : s.help === 'day' ? 'and would love Elise to coordinate the day itself' : 'and would love Elise’s help with ' + (held.length ? join(held.map(low)) : 'part of the planning'),
    bar: `${s.noDate ? 'Sometime in ' + s.year : shortDate(s.date)} · ${s.place === 'local' ? 'Belgium' : 'Abroad'} · ${s.guests} guests · ${helpName[s.help]}`,
    celebrating: s.place === 'local' ? 'Wedding' : 'Destination Wedding',
    offerNote: offer ? `A ${year} date. You could be one of her first couples.` : 'Her launch offer is for weddings in 2027 or 2028. Tell her about yours anyway.',
    count: s.help === 'day' ? `Elise holds the day itself, ${held.length} of 17.` : `Elise holds ${held.length} of 17.`,
  };
}
function evExpect(o) {
  const s = Object.assign({ type: 'private', team: false, date: new Date(2027, 2, 20), guests: 60 }, o);
  const what = s.type === 'private' ? 'a private event' : 'a company event';
  return { msg: `Hi Elise, we’re planning ${what} on ${longDate(s.date)} for about ${s.guests} guests` + (s.team ? ', and we’d like you in our team as a freelance event manager.' : ', and we’d love you to handle it.'),
    celebrating: s.type === 'private' ? 'Private Event' : 'Corporate Event', kinds: s.type === 'private' ? D.events.private : D.events.company };
}
const read = p => p.evaluate(() => {
  const t = s => (document.querySelector(s) || {}).textContent;
  const f = document.querySelector('form[data-reply="wedding"]');
  return { sentence: t('[data-o="sentence"]'), cardDate: t('[data-o="cardDate"]'), cardPlace: t('[data-o="cardPlace"]'), cardHelp: t('[data-o="cardHelp"]'),
    cardFirst: !document.querySelector('[data-o="cardFirst"]').hidden, bar: t('[data-o="bar"]'), msg: f.querySelector('[data-f="message"]').value,
    celebrating: f.querySelector('[name="celebrating"]').value, offerNote: t('[data-o="offerNote"]'), count: t('[data-o="count"]'),
    lit: [...document.querySelectorAll('[data-light]')].filter(b => b.getAttribute('aria-pressed') === 'true').map(b => +b.dataset.light),
    firstWrap: !f.querySelector('[data-first-wrap]').hidden, dates: [...document.querySelectorAll('input[data-k="date"]')].map(i => i.value),
    help: [...document.querySelectorAll('input[data-k="help"]:checked')].map(i => i.value) };
});
const same = (a, b, what) => { if (a !== b) throw new Error(`${what}\n      page ${JSON.stringify(a)}\n      want ${JSON.stringify(b)}`); };
function all(r, e, tag) {
  same(r.sentence, e.sentence, tag + ' sentence'); same(r.cardDate, e.cardDate, tag + ' card date'); same(r.cardPlace, e.cardPlace, tag + ' card place');
  same(r.cardHelp, e.cardHelp, tag + ' card help'); same(r.bar, e.bar, tag + ' bar'); same(r.msg, e.msg, tag + ' message'); same(r.celebrating, e.celebrating, tag + ' celebrating');
  same(r.offerNote, e.offerNote, tag + ' offer note'); same(r.cardFirst, e.offer, tag + ' card first couples line'); same(r.firstWrap, e.offer, tag + ' first couples box');
  same(r.count, e.count, tag + ' count'); same(r.lit.length, e.held, tag + ' lights lit');
}
const LAUNCH = ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'];
const T = (ms, what) => new Promise((_, rej) => setTimeout(() => rej(new Error('timeout ' + what)), ms));

const checks = [];
const C = (name, fn, plant, opts) => checks.push({ name, fn, plant, opts: opts || {} });

C('loads with no script errors and the test handle ready', async (p, ctx) => {
  await p.waitForTimeout(600); if (ctx.errs.length) throw new Error(ctx.errs.join(' | ')); same(await p.evaluate(() => !!(window.HIH && HIH.ready)), true, 'HIH ready');
}, async p => { await p.addInitScript(() => { window.addEventListener('load', () => { setTimeout(() => { null.x; }, 50); }); }); }, { plantBeforeLoad: true });

C('a fresh page fetches only the hero film, none of the chapter films', async (p, ctx) => {
  await p.waitForTimeout(1800);
  const v = ctx.reqs.filter(u => /\.(webm|mp4)/.test(u)).map(u => u.split('/').pop());
  if (!v.some(x => /^hero/.test(x))) throw new Error('hero film not fetched ' + JSON.stringify(v));
  const other = v.filter(x => !/^hero/.test(x)); if (other.length) throw new Error('chapter films fetched before they were near ' + JSON.stringify(other));
}, async p => { await p.evaluate(() => document.querySelectorAll('[data-film] source').forEach(s => { s.src = s.dataset.src; })); await p.evaluate(() => document.querySelectorAll('[data-film] video').forEach(v => v.load())); });

C('a chapter film loads near the screen, plays on it and pauses off it', async p => {
  await p.evaluate(() => document.getElementById('blue').scrollIntoView()); await p.mouse.wheel(0, 1);
  await p.waitForFunction(() => { const v = document.querySelector('[data-film="blue"] video'); return v.currentTime > 0.2 && !v.paused; }, null, { timeout: 9000 });
  await p.evaluate(() => scrollTo(0, 0)); await p.mouse.wheel(0, 1); await p.waitForTimeout(700);
  same(await p.evaluate(() => document.querySelector('[data-film="blue"] video').paused), true, 'blue film paused off screen');
}, async p => { await p.evaluate(() => { const v = document.querySelector('[data-film="blue"] video'); v.play = () => Promise.resolve(); }); });

C('reduced motion, no film is ever fetched and every film shows its still', async (p, ctx) => {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.mouse.wheel(0, 1); await p.waitForTimeout(60); }
  await p.waitForTimeout(800);
  const v = ctx.reqs.filter(u => /\.(webm|mp4)/.test(u)); if (v.length) throw new Error('films fetched under reduced motion ' + v.length);
  same(await p.evaluate(() => [...document.querySelectorAll('#home [data-film] picture img')].every(i => i.complete && i.naturalWidth > 0)), true, 'every still decoded');
}, async p => { await p.addInitScript(() => { document.addEventListener('readystatechange', () => document.documentElement.classList.remove('rm')); }); }, { reduced: true, plantBeforeLoad: true });

C('data saver, no film is ever fetched', async (p, ctx) => {
  await p.evaluate(() => document.getElementById('blue').scrollIntoView()); await p.mouse.wheel(0, 1); await p.waitForTimeout(1500);
  const v = ctx.reqs.filter(u => /\.(webm|mp4)/.test(u)); if (v.length) throw new Error('films fetched under data saver ' + v.length);
}, async p => { await p.addInitScript(() => { document.addEventListener('readystatechange', () => document.documentElement.classList.remove('save')); }); }, { saveData: true, plantBeforeLoad: true });

C('the defaults on every display agree with the sums', async p => { all(await read(p), expect({}), 'defaults'); },
  async p => { await p.evaluate(() => { document.querySelector('[data-o="cardDate"]').textContent = 'on Saturday 13 June 2027'; }); });

C('a week later reaches the sentence, card, bar, message and both date fields', async p => {
  await p.evaluate(() => document.querySelector('.when').scrollIntoView({ block: 'center' })); await p.click('.when [data-step="7"]'); await p.waitForTimeout(150);
  const r = await read(p); all(r, expect({ date: new Date(2027, 5, 19) }), 'a week later'); same(r.dates.join(), '2027-06-19,2027-06-19', 'date fields');
}, async p => { await p.evaluate(() => document.addEventListener('click', e => { if (e.target.closest('[data-step]')) e.stopPropagation(); }, true)); });

C('a picked date in 2028 says the launch offer is open', async p => {
  await p.evaluate(() => { const i = document.querySelector('.when input[data-k="date"]'); i.value = '2028-09-30'; i.dispatchEvent(new Event('change', { bubbles: true })); }); await p.waitForTimeout(120);
  all(await read(p), expect({ date: new Date(2028, 8, 30) }), '2028');
}, async p => { await p.evaluate(() => { const o = document.querySelector('[data-o="offerNote"]'); document.addEventListener('change', () => setTimeout(() => { o.textContent = 'A 2027 date. You could be one of her first couples.'; }, 0)); }); });

C('a 2029 date and a December 2026 date fall outside the launch offer', async p => {
  for (const d of [[2029, 4, 19], [2026, 11, 5]]) {
    await p.evaluate(d => { const i = document.querySelector('.when input[data-k="date"]'); i.value = d; i.dispatchEvent(new Event('change', { bubbles: true })); }, `${d[0]}-${String(d[1] + 1).padStart(2, '0')}-${String(d[2]).padStart(2, '0')}`);
    await p.waitForTimeout(120); all(await read(p), expect({ date: new Date(d[0], d[1], d[2]) }), 'outside ' + d[0]);
  }
}, async p => { await p.evaluate(() => { document.addEventListener('change', () => setTimeout(() => { document.querySelectorAll('[data-first-wrap]').forEach(w => { w.hidden = false; }); }, 0)); }); });

C('no date yet writes sometime in the year, and a year can be chosen', async p => {
  await p.evaluate(() => document.querySelector('.when').scrollIntoView({ block: 'center' }));
  await p.click('.when [data-nodate]'); await p.waitForTimeout(100); all(await read(p), expect({ noDate: true, year: 2027 }), 'no date 2027');
  await p.click('.when .yr[data-year="2028"]'); await p.waitForTimeout(100); all(await read(p), expect({ noDate: true, year: 2028 }), 'no date 2028');
  await p.click('.when .yr[data-year="2029"]'); await p.waitForTimeout(100); all(await read(p), expect({ noDate: true, year: 2029 }), 'no date 2029');
  same(await p.evaluate(() => !document.querySelector('.when [data-years]').hidden), true, 'years shown');
}, async p => { await p.evaluate(() => document.addEventListener('click', e => { if (e.target.closest('.yr')) e.stopPropagation(); }, true)); });

C('abroad writes Destination Wedding into the form, the card and the bar', async p => {
  await p.evaluate(() => document.querySelector('.when').scrollIntoView({ block: 'center' })); await p.click('.when .opt:has(input[value="abroad"])'); await p.waitForTimeout(100);
  all(await read(p), expect({ place: 'abroad' }), 'abroad');
}, async p => { await p.evaluate(() => document.querySelectorAll('input[data-o="celebrating"]').forEach(i => Object.defineProperty(i, 'value', { get: () => 'Wedding', set: () => {} }))); });

C('guests step by ten and stop at 10 and 600', async p => {
  await p.evaluate(() => document.querySelector('.when').scrollIntoView({ block: 'center' }));
  for (let i = 0; i < 3; i++) await p.click('.when [data-g="10"]');
  all(await read(p), expect({ guests: 130 }), '130');
  await p.evaluate(() => window.HIH.set({ guests: 9000 })); all(await read(p), expect({ guests: 600 }), 'clamp 600');
  await p.evaluate(() => window.HIH.set({ guests: 0 })); all(await read(p), expect({ guests: 10 }), 'clamp 10');
}, async p => { await p.evaluate(() => { const f = window.HIH.set; window.HIH.set = o => { if ('guests' in o) o.guests = o.guests * 1; f(o); }; document.querySelectorAll('.guests output').forEach(o => o.remove()); document.querySelectorAll('[data-o="guestsN"]').forEach(o => { Object.defineProperty(o, 'textContent', { get: () => '100', set: () => {} }); }); }); });

C('full planning lights all 17, day coordination exactly her six', async p => {
  let r = await read(p); same(r.lit.join(), LIGHTS.map((n, i) => i).join(), 'full lit');
  await p.evaluate(() => document.querySelector('.menu').scrollIntoView({ block: 'center' })); await p.click('.course:has(input[value="day"])'); await p.waitForTimeout(120);
  r = await read(p); same(r.lit.slice().sort((a, b) => a - b).join(), DAY.slice().sort((a, b) => a - b).join(), 'day lit'); all(r, expect({ help: 'day' }), 'day');
}, async p => { await p.evaluate(() => { document.addEventListener('change', () => setTimeout(() => document.querySelectorAll('[data-light]').forEach(b => b.setAttribute('aria-pressed', 'true')), 0)); }); });

C('tapping a light in full planning hands it back, partial planning, 16 held', async p => {
  await p.evaluate(() => document.getElementById('blue').scrollIntoView()); await p.mouse.wheel(0, 1); await p.waitForTimeout(200);
  await p.click('[data-light="4"]', { force: true }); await p.waitForTimeout(120);
  const r = await read(p); same(r.help.join(), 'partial,partial,partial'.split(',').slice(0, r.help.length).join(), 'menu and card switch to partial');
  same(r.lit.includes(4), false, 'light 4 out'); same(r.lit.length, 16, '16 lit');
  all(r, expect({ help: 'partial', lights: LIGHTS.map((n, i) => i).filter(i => i !== 4) }), 'partial 16');
}, async p => { await p.evaluate(() => document.addEventListener('click', e => { const b = e.target.closest('[data-light]'); if (b) { e.stopPropagation(); } }, true)); });

C('chosen lights write their names into the message and the card, in order', async p => {
  await p.evaluate(() => window.HIH.set({ help: 'partial' }));
  await p.evaluate(() => document.getElementById('blue').scrollIntoView()); await p.mouse.wheel(0, 1);
  for (const i of [15, 13, 14]) { await p.click(`[data-light="${i}"]`, { force: true }); await p.waitForTimeout(80); }
  all(await read(p), expect({ help: 'partial', lights: [13, 14, 15] }), 'partial three');
  for (const i of [15, 13, 14]) await p.click(`[data-light="${i}"]`, { force: true });
  all(await read(p), expect({ help: 'partial', lights: [] }), 'partial none');
}, async p => { await p.evaluate(() => { const ta = document.querySelector('form[data-reply="wedding"] [data-f="message"]'); document.addEventListener('click', () => setTimeout(() => { ta.value = ta.value.replace('place cards and plan B', 'plan B and place cards'); }, 0)); }); });

C('an edited message is kept through changes and written again on request', async p => {
  const ta = 'form[data-reply="wedding"] [data-f="message"]';
  await p.evaluate(() => document.querySelector('form[data-reply="wedding"]').scrollIntoView()); await p.fill(ta, 'Our own words.'); await p.waitForTimeout(80);
  await p.evaluate(() => window.HIH.set({ guests: 140 })); same(await p.$eval(ta, t => t.value), 'Our own words.', 'edit kept');
  same(await p.evaluate(() => !document.querySelector('form[data-reply="wedding"] [data-rewrite-wrap]').hidden), true, 'rewrite offered');
  await p.click('form[data-reply="wedding"] [data-rewrite]'); same(await p.$eval(ta, t => t.value), expect({ guests: 140 }).msg, 'written again');
}, async p => { await p.evaluate(() => { const f = window.HIH.set; window.HIH.set = o => { f(Object.assign({ edited: false }, o)); }; }); });

C('typed names appear on the card in foil script', async p => {
  await p.evaluate(() => document.querySelector('.card-wrap').scrollIntoView({ block: 'center' }));
  await p.fill('input[data-k="n1"]', 'Lotte'); await p.fill('input[data-k="n2"]', 'Thomas'); await p.waitForTimeout(100);
  same(await p.evaluate(() => [...document.querySelectorAll('[data-foil="n1"],[data-foil="n2"]')].map(f => f.textContent).join(' & ')), 'Lotte & Thomas', 'foil names');
  same(await p.evaluate(() => getComputedStyle(document.querySelector('[data-foil="n1"]')).fontFamily.includes('Pinyon')), true, 'script face');
}, async p => { await p.evaluate(() => document.querySelectorAll('.foil').forEach(f => f.remove())); });

C('an empty reply is caught, with the reason and focus on the first field', async p => {
  await p.evaluate(() => document.querySelector('form[data-reply="wedding"] .send').scrollIntoView({ block: 'center' }));
  await p.fill('form[data-reply="wedding"] [data-f="message"]', ''); await p.click('form[data-reply="wedding"] .send'); await p.waitForTimeout(150);
  const r = await p.evaluate(() => { const f = document.querySelector('form[data-reply="wedding"]'); return { name: !f.querySelector('[data-err="first"]').hidden, email: !f.querySelector('[data-err="email"]').hidden, msg: !f.querySelector('[data-err="message"]').hidden, focus: document.activeElement.dataset.k, sealed: f.classList.contains('sealing') || f.classList.contains('sealed-on') }; });
  same(JSON.stringify(r), JSON.stringify({ name: true, email: true, msg: true, focus: 'n1', sealed: false }), 'errors');
}, async p => { await p.evaluate(() => document.querySelectorAll('form[data-reply="wedding"] [data-err]').forEach(e => e.remove())); });

C('a complete reply is sealed in wax and the mail carries the whole request', async p => {
  await p.evaluate(() => { window.HIH.set({ help: 'day', place: 'abroad', guests: 80 }); document.querySelector('.card-wrap').scrollIntoView({ block: 'center' }); });
  await p.fill('input[data-k="n1"]', 'Lotte'); await p.fill('input[data-k="n2"]', 'Thomas'); await p.fill('form[data-reply="wedding"] input[type="email"]', 'lotte@example.com');
  await p.selectOption('form[data-reply="wedding"] select[name="found"]', 'Instagram');
  await p.click('form[data-reply="wedding"] .send'); await p.waitForTimeout(1700);
  const r = await p.evaluate(() => { const f = document.querySelector('form[data-reply="wedding"]'), s = f.querySelector('.seal'), b = s.getBoundingClientRect(); return { on: f.classList.contains('sealed-on'), op: +getComputedStyle(s).opacity, w: b.width, msg: !f.querySelector('[data-sealed]').hidden, mail: decodeURIComponent(f.querySelector('[data-mail]').href) }; });
  same(r.on && r.op > 0.95 && r.w > 60 && r.msg, true, 'sealed with the seal showing ' + JSON.stringify(r).slice(0, 120));
  const e = expect({ help: 'day', place: 'abroad', guests: 80 });
  for (const part of ['From Lotte and Thomas', 'Email lotte@example.com', 'What are we celebrating? Destination Wedding', 'We’d like to be one of the first couples', 'How did you find Honey, it’s Handled? Instagram', e.msg])
    if (!r.mail.includes(part)) throw new Error('mail is missing ' + part);
  await p.click('form[data-reply="wedding"] [data-unseal]'); same(await p.evaluate(() => document.querySelector('form[data-reply="wedding"]').classList.contains('sealed-on')), false, 'unsealed');
}, async p => { await p.evaluate(() => { const st = document.createElement('style'); st.textContent = '.seal{display:none!important}'; document.head.appendChild(st); }); });

C('the veil is drawn over the dress and the scroll lifts it clear', async p => {
  if (!(await p.evaluate(() => document.documentElement.classList.contains('gl-veil')))) throw new Error('no WebGL veil');
  const at = async pr => { await p.evaluate(pr => { const pin = document.querySelector('[data-pin="off"]'), hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hh')); scrollTo(0, pin.getBoundingClientRect().top + scrollY - hh + (pin.offsetHeight - (innerHeight - hh)) * pr); }, pr); await p.mouse.wheel(0, 1); await p.waitForTimeout(250); return p.evaluate(() => HIH_VEIL.sample()); };
  const a = await at(0.02);
  if (!(a.lift < 0.05 && a.alpha.every(x => x > 40))) throw new Error('veil not down at the start ' + JSON.stringify(a));
  same(await p.evaluate(() => +getComputedStyle(document.querySelector('[data-veil-t]')).opacity < 0.05), true, 'words wait under the veil');
  const m = await at(0.35); if (!(m.lift > 0.2 && m.lift < 0.9)) throw new Error('veil not mid lift ' + JSON.stringify(m));
  const z = await at(0.98);
  if (!(z.lift > 0.99 && z.alpha.every(x => x === 0))) throw new Error('veil not lifted at the end ' + JSON.stringify(z));
  same(await p.evaluate(() => +getComputedStyle(document.querySelector('[data-veil-t]')).opacity > 0.95), true, 'words shown once lifted');
}, async p => { await p.evaluate(() => { HIH_VEIL.sample = () => ({ lift: 0, alpha: [0, 0, 0, 0, 0] }); }); });

C('petals fall over the Red chapter and part round the pointer', async p => {
  await p.evaluate(() => document.querySelector('.red-stage').scrollIntoView()); await p.mouse.wheel(0, 1); await p.waitForTimeout(1500);
  const f0 = await p.evaluate(() => HIH_PETALS.frames); await p.waitForTimeout(500);
  if (!((await p.evaluate(() => HIH_PETALS.frames)) > f0)) throw new Error('petals not moving');
  const vw = await p.evaluate(() => [innerWidth, innerHeight]), cx = vw[0] / 2, cy = vw[1] / 2;
  const mean = () => p.evaluate(([x, y]) => { const ps = HIH_PETALS.pos(); return ps.reduce((a, q) => a + Math.hypot(q[0] - x, q[1] - y), 0) / ps.length; }, [cx, cy]);
  // held still in a cluster with no hand, they stay close
  await p.mouse.move(5, 5); await p.waitForTimeout(1700); await p.evaluate(([x, y]) => HIH_PETALS.place(x, y), [cx, cy]); await p.waitForTimeout(1000);
  const still = await mean();
  // the same cluster with a hand in the middle of it, they part
  await p.evaluate(([x, y]) => HIH_PETALS.place(x, y), [cx, cy]);
  for (let i = 0; i < 14; i++) { await p.mouse.move(cx + (i % 2), cy); await p.waitForTimeout(80); }
  const parted = await mean();
  if (!(still < 40 && parted > 70)) throw new Error(`mean distance from the hand, ${still.toFixed(0)} px without it, ${parted.toFixed(0)} px with it`);
  same(await p.evaluate(() => HIH_PETALS.count > 20), true, 'petals present');
}, async p => { await p.evaluate(() => { document.getElementById('red').addEventListener('pointermove', e => e.stopImmediatePropagation(), true); }); });

C('the bar is off on the first screen, on mid page and steps aside for the reply', async p => {
  // what the visitor sees, the bar drawn on the screen, not only its class
  const shown = () => p.evaluate(() => { const b = document.querySelector('[data-bar]'), r = b.getBoundingClientRect(), s = getComputedStyle(b); return s.display !== 'none' && s.visibility !== 'hidden' && r.height > 20 && r.top < innerHeight - 10; });
  await p.waitForTimeout(700); same(await shown(), false, 'bar on the first screen');
  await p.evaluate(() => document.getElementById('invited').scrollIntoView()); await p.mouse.wheel(0, 1); await p.waitForTimeout(900);
  same(await shown(), true, 'bar on mid page');
  await p.evaluate(() => document.querySelector('form[data-reply="wedding"] .fields').scrollIntoView({ block: 'center' })); await p.mouse.wheel(0, 1); await p.waitForTimeout(900);
  same(await shown(), false, 'bar over the reply');
}, async p => { await p.addStyleTag({ content: '.bar{display:none!important}' }); });

C('the header is clear over the film and paper after it', async p => {
  same(await p.evaluate(() => document.querySelector('[data-hdr]').classList.contains('on-film')), true, 'on film at the top');
  await p.evaluate(() => document.getElementById('invited').scrollIntoView()); await p.mouse.wheel(0, 1); await p.waitForTimeout(300);
  same(await p.evaluate(() => document.querySelector('[data-hdr]').classList.contains('on-film')), false, 'paper after the film');
}, async p => { await p.evaluate(() => { const h = document.querySelector('[data-hdr]'); h.classList.toggle = () => {}; h.classList.remove('on-film'); }); });

C('Events opens the second page, pauses the wedding films and each part sets its own enquiry', async p => {
  await p.waitForTimeout(1200);
  await p.click('.hero .tl-ivory'); await p.waitForTimeout(500);
  same(await p.evaluate(() => [document.documentElement.dataset.view, getComputedStyle(document.getElementById('home')).display, getComputedStyle(document.getElementById('events')).display].join()), 'events,none,block', 'the view');
  same(await p.evaluate(() => [...document.querySelectorAll('#home [data-film] video')].every(v => v.paused)), true, 'wedding films paused');
  const rd = () => p.evaluate(() => { const f = document.querySelector('form[data-reply="event"]'); return { type: f.querySelector('input[data-e="type"]:checked').value, team: f.querySelector('input[data-e="team"]').checked, msg: f.querySelector('[data-f="message"]').value, cel: f.querySelector('input[data-o="evCelebrating"]').value, kinds: [...f.querySelectorAll('select[data-e="kind"] option')].map(o => o.textContent) }; });
  let r = await rd(), e = evExpect({}); same(r.msg, e.msg, 'private default message'); same(r.cel, e.celebrating, 'private celebrating'); same(r.kinds.join('|'), e.kinds.join('|'), 'private list');
  await p.evaluate(() => document.getElementById('ev-company').scrollIntoView()); await p.click('[data-ev-set="company"]'); await p.waitForTimeout(500);
  r = await rd(); e = evExpect({ type: 'company' }); same(r.type, 'company', 'company type'); same(r.msg, e.msg, 'company message'); same(r.cel, 'Corporate Event', 'company celebrating'); same(r.kinds.join('|'), e.kinds.join('|'), 'company list');
  same(await p.evaluate(() => location.hash), '#ev-reply', 'landed on the enquiry');
  await p.evaluate(() => document.getElementById('ev-team').scrollIntoView()); await p.click('[data-ev-set="team"]'); await p.waitForTimeout(400);
  r = await rd(); same(r.team, true, 'team ticked'); same(r.msg, evExpect({ type: 'company', team: true }).msg, 'team message');
  await p.evaluate(() => scrollTo(0, 0)); await p.click('.nl a[href="#off-white"], .hdr a[href="#off-white"]').catch(async () => { await p.evaluate(() => { location.hash = '#off-white'; }); });
  await p.waitForTimeout(500); same(await p.evaluate(() => document.documentElement.dataset.view), 'home', 'back to the wedding page');
}, async p => { await p.evaluate(() => document.addEventListener('click', e => { if (e.target.closest('[data-ev-set]')) e.stopPropagation(); }, true)); });

C('the events enquiry is checked, sealed and mailed with the occasion', async p => {
  await p.evaluate(() => { location.hash = '#ev-reply'; }); await p.waitForTimeout(500);
  await p.check('form[data-reply="event"] input[value="company"]', { force: true }); await p.selectOption('select[data-e="kind"]', '3');
  await p.click('form[data-reply="event"] .send'); await p.waitForTimeout(150);
  same(await p.evaluate(() => !document.querySelector('form[data-reply="event"] [data-err="first"]').hidden), true, 'name error');
  await p.fill('input[data-e="name"]', 'An Peeters'); await p.fill('input[data-e="company"]', 'Studio Noord'); await p.fill('form[data-reply="event"] input[type="email"]', 'an@example.com');
  await p.click('form[data-reply="event"] .send'); await p.waitForTimeout(1700);
  const r = await p.evaluate(() => { const f = document.querySelector('form[data-reply="event"]'); return { on: f.classList.contains('sealed-on'), mail: decodeURIComponent(f.querySelector('[data-mail]').href) }; });
  same(r.on, true, 'sealed');
  for (const part of ['From An Peeters, Studio Noord', 'What are we celebrating? Corporate Event', 'The occasion ' + D.events.company[3], evExpect({ type: 'company' }).msg]) if (!r.mail.includes(part)) throw new Error('mail is missing ' + part);
}, async p => { await p.evaluate(() => { document.querySelector('select[data-e="kind"]').addEventListener('change', e => e.stopImmediatePropagation(), true); }); });

C('the first screen holds her line and the call at 1440, 390 and 320', async (p, ctx) => {
  for (const [w, h] of [[1440, 900], [390, 844], [320, 640]]) {
    await p.setViewportSize({ width: w, height: h }); await p.waitForTimeout(250);
    const r = await p.evaluate(() => { const inV = e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth && r.width > 0; }; return { h1: inV(document.querySelector('#h-top')), cta: inV(document.querySelector('[data-hero-cta]')), ev: inV(document.querySelector('.hero .tl-ivory')) }; });
    same(JSON.stringify(r), '{"h1":true,"cta":true,"ev":true}', 'first screen at ' + w);
  }
}, async p => { await p.addStyleTag({ content: '.hero-t{bottom:-200px!important}' }); });

C('without script the page shows the same defaults the script writes', async p => {
  const r = await read(p), e = expect({});
  same(r.sentence, e.sentence, 'sentence'); same(r.cardDate, e.cardDate, 'card date'); same(r.cardPlace, e.cardPlace, 'card place'); same(r.cardHelp, e.cardHelp, 'card help'); same(r.msg, e.msg, 'message'); same(r.bar, e.bar, 'bar');
  same(r.lit.length, 17, 'lights'); same(await p.evaluate(() => [...document.images].filter(i => i.loading !== 'lazy').every(i => i.complete && i.naturalWidth > 0)), true, 'eager images');
}, async p => { await p.evaluate(() => { document.querySelector('[data-o="cardHelp"]').textContent = 'and would love Elise’s help'; }); }, { noJs: true });

C('reduced motion, every scene still and whole, and the seal lands without moving', async p => {
  same(await p.evaluate(() => document.documentElement.classList.contains('gl-veil')), false, 'no veil');
  same(await p.evaluate(() => getComputedStyle(document.querySelector('[data-veil-t]')).opacity), '1', 'off white words shown');
  same(await p.evaluate(() => !!window.HIH_PETALS), false, 'no petals');
  same(await p.evaluate(() => getComputedStyle(document.querySelector('.lt[aria-pressed="true"] .lt-h')).animationName), 'none', 'lights still');
  await p.evaluate(() => document.querySelector('.card-wrap').scrollIntoView()); await p.fill('input[data-k="n1"]', 'Lotte'); await p.fill('form[data-reply="wedding"] input[type="email"]', 'l@example.com');
  await p.click('form[data-reply="wedding"] .send'); await p.waitForTimeout(80);
  same(await p.evaluate(() => getComputedStyle(document.querySelector('form[data-reply="wedding"] .seal')).opacity), '1', 'seal at once');
}, async p => { await p.addStyleTag({ content: 'html.rm .lt[aria-pressed="true"] .lt-h{animation:breathe 6s infinite!important}' }); }, { reduced: true });

C('every light is a button with its name, and the phone menu opens, takes focus and closes', async p => {
  same(await p.evaluate(() => [...document.querySelectorAll('[data-light]')].map(b => b.textContent.trim()).join('|')), LIGHTS.join('|'), 'light names');
  await p.click('.mbtn'); await p.waitForTimeout(200);
  same(await p.evaluate(() => [document.querySelector('#mnav').classList.contains('open'), document.querySelector('.mbtn').getAttribute('aria-expanded'), !!document.activeElement.closest('#mnav')].join()), 'true,true,true', 'menu open');
  await p.keyboard.press('Escape'); await p.waitForTimeout(100);
  same(await p.evaluate(() => document.querySelector('#mnav').classList.contains('open')), false, 'menu closed');
}, async p => { await p.evaluate(() => { document.querySelector('[data-light="3"] .lt-n').textContent = ''; }); }, { phone: true });

(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: LAUNCH });
  let pass = 0, caught = 0, blind = [];
  for (const c of checks) {
    const o = c.opts;
    const ctxo = { viewport: o.phone ? { width: 390, height: 844 } : { width: 1440, height: 900 }, isMobile: !!o.phone, hasTouch: !!o.phone, reducedMotion: o.reduced ? 'reduce' : 'no-preference', javaScriptEnabled: !o.noJs };
    const cx = await b.newContext(ctxo); cx.setDefaultTimeout(9000);
    if (o.saveData) await cx.addInitScript(() => { Object.defineProperty(navigator, 'connection', { value: { saveData: true }, configurable: true }); });
    const p = await cx.newPage(); const ctx = { errs: [], reqs: [] };
    p.on('pageerror', e => ctx.errs.push(e.message)); p.on('request', r => ctx.reqs.push(r.url()));
    let ok = true, why = '';
    try {
      if (PLANT && o.plantBeforeLoad) await c.plant(p);
      await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(o.noJs ? 300 : 700);
      if (PLANT && !o.plantBeforeLoad) await c.plant(p);
      await Promise.race([c.fn(p, ctx), T(60000, c.name)]);
      if (!PLANT && ctx.errs.length && c !== checks[0]) throw new Error('script error ' + ctx.errs[0]);
    } catch (e) { ok = false; why = e.message.split('\n').slice(0, 3).join(' '); }
    if (PLANT) { if (ok) blind.push(c.name); else caught++; console.log((ok ? 'BLIND ' : 'CAUGHT') + '  ' + c.name + (ok ? '' : '  <- ' + why.slice(0, 160))); }
    else { if (ok) pass++; console.log((ok ? 'PASS' : 'FAIL') + '  ' + c.name + (ok ? '' : '\n      ' + why)); }
    await cx.close();
  }
  await b.close();
  console.log(PLANT ? `plant mode, ${caught} of ${checks.length} planted faults caught${blind.length ? ', blind ' + JSON.stringify(blind) : ''}` : `${pass} of ${checks.length} checks pass`);
})();
