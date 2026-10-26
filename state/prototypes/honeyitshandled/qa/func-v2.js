// Functional test of the v2 page, the one state carried down the page. usage:
//   NODE_PATH=/opt/node22/lib/node_modules node qa/func-v2.js <base url> [plant]
// Every expected value is worked out here from build-v2/data/site.json and plain date sums, never read off the page.
// With "plant", each check first breaks the page (or the state) in the one way that check exists to catch, and every
// check must then fail. A pass in plant mode means the check is blind.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const base = (process.argv[2] || 'http://127.0.0.1:8741').replace(/\/$/, ''), PLANT = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const D = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'build-v2', 'data', 'site.json'), 'utf8'));
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ARGS = ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'];
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
const TODAY = day(2026, 10, 26);
const days = d => Math.round((d - TODAY) / 864e5);
const big = d => `${d.getUTCDate()} ${MO[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
const long = d => `${WD[d.getUTCDay()]} ${big(d)}`;
const short = d => `${WD[d.getUTCDay()].slice(0, 3)} ${d.getUTCDate()} ${MO[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`;
const P = D.paths, TABS = D.tabs.map(t => t[0]);
const word = t => t === 'Plan B for plan B' ? 'plan B for plan B' : t === 'Plan B' ? 'plan B' : t === 'The Pinterest board' ? 'the Pinterest board' : t[0].toLowerCase() + t.slice(1);
const join = xs => xs.length < 2 ? xs[0] : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];

let pass = 0, fail = 0; const rows = [];
async function check(name, fn, plant) {
  let ok = false, why = '';
  try { if (PLANT && plant) await plant(); const r = await fn(); ok = r === true; why = r === true ? '' : String(r); }
  catch (e) { ok = false; why = 'threw ' + e.message.split('\n')[0]; }
  if (ok) pass++; else fail++;
  rows.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${why ? '   ' + why.slice(0, 220) : ''}`);
}
const eq = (a, b, what) => a === b ? true : `${what || ''} page ${JSON.stringify(a)} expected ${JSON.stringify(b)}`;

(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ARGS });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  ctx.setDefaultTimeout(6000);
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const vids = []; p.on('request', r => { if (/night\.(webm|mp4)/.test(r.url())) vids.push(r.url()); });
  await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(1200);
  const T = (sel) => p.$eval(sel, e => e.textContent.trim());
  const set = o => p.evaluate(o => { if (o.date) o.date = new Date(o.date[0], o.date[1] - 1, o.date[2]); window.HIH.set(o); }, o);
  const reset = () => set({ path: 'wedding', date: [2027, 6, 12], place: 'local', first: true, guests: 100, help: 'full' });

  // 1. the film is not fetched on a fresh page before any scroll
  await check('film not fetched before it is near the screen', async () => vids.length === 0 ? true : 'fetched ' + vids.length,
    async () => { await p.evaluate(() => { const v = document.querySelector('[data-film] video'); v.preload = 'auto'; v.load(); }); await p.waitForTimeout(400); });

  // 2. the defaults, worked out from the data
  const d0 = day(2027, 6, 12);
  await check('default date, weekday and days from today', async () => {
    const r = [await T('[data-o="dateBig"]'), await T('[data-o="weekday"]'), await T('[data-o="dateCount"]')];
    return eq(r.join(' | '), `${big(d0)} | ${WD[d0.getUTCDay()]} | ${days(d0)} days from today`);
  }, async () => p.evaluate(() => { document.querySelector('[data-o="dateCount"]').textContent = '228 days from today'; }));
  await reset();
  const msg0 = `Hi Elise, we’re getting married on ${long(d0)}, here in Belgium, with about 100 guests. We’d love full planning, and we’d like to be one of your first couples.`;
  await check('default letter, written from the defaults', async () => eq(await p.$eval('[data-f="message"]', e => e.value), msg0),
    async () => p.evaluate(() => { window.HIH.S.first = false; window.HIH.set({}); }));
  await reset();
  await check('default bar', async () => eq(await T('[data-o="bar"]'), `Wedding · ${short(d0)} · 100 guests · Full planning`),
    async () => p.evaluate(() => window.HIH.set({ guests: 105 })));
  await reset();
  await check('the page without script says what the script says, letter and bar', async () => {
    // the build writes the no script page from the same defaults, compare it with what the live page shows now
    const html = await (await p.request.get(base + '/')).text();
    const ta = html.match(/<textarea[^>]*>([^<]*)<\/textarea>/)[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
    const bar = html.match(/data-o="bar">([^<]*)</)[1];
    const live = await p.evaluate(() => document.querySelector('[data-f="message"]').value + ' || ' + document.querySelector('[data-o="bar"]').textContent);
    return eq(ta + ' || ' + bar, live);
  }, async () => p.evaluate(() => window.HIH.set({ guests: 110 })));
  await reset();

  // 3. the date controls
  await check('a week later, every display follows', async () => {
    await p.click('[data-step="7"]'); await p.waitForTimeout(80);
    const d = day(2027, 6, 19);
    const r = [await T('[data-o="dateBig"]'), await T('[data-o="planDate"]'), (await T('[data-o="bar"]')).split(' · ')[1], (await p.$eval('[data-f="message"]', e => e.value)).includes(long(d))];
    return eq(r.join(' | '), `${big(d)} | ${short(d)} | ${short(d)} | true`);
  }, async () => p.evaluate(() => { const b = document.querySelector('[data-step="7"]'); b.dataset.step = '6'; }));
  await p.evaluate(() => { document.querySelector('[data-step="6"]') && (document.querySelector('[data-step="6"]').dataset.step = '7'); });
  await reset();
  await check('a picked date writes the state', async () => {
    await p.$eval('input[name="date"]', e => { e.value = '2028-09-02'; e.dispatchEvent(new Event('change', { bubbles: true })); }); await p.waitForTimeout(80);
    const d = day(2028, 9, 2); return eq(await T('[data-o="dateBig"]') + ' ' + await T('[data-o="dateCount"]'), `${big(d)} ${days(d)} days from today`);
  }, async () => p.evaluate(() => { document.querySelector('input[name="date"]').name = 'datex'; }));
  await p.evaluate(() => { const i = document.querySelector('input[name="datex"]'); if (i) i.name = 'date'; });
  await reset();
  await check('no date yet, 2029, no launch offer, and the letter says so', async () => {
    await p.click('[data-nodate]'); await p.click('.yr[data-year="2029"]'); await p.waitForTimeout(80);
    const m = await p.$eval('[data-f="message"]', e => e.value);
    const offer = await p.$eval('[data-offer]', e => e.hidden);
    return eq([await T('[data-o="dateBig"]'), offer, m.includes('in 2029, no date yet'), m.includes('first couples')].join(' '), '2029 true true false');
  }, async () => p.evaluate(() => { document.querySelector('.yr[data-year="2029"]').dataset.year = '2028'; }));
  await p.evaluate(() => { document.querySelectorAll('.yr').forEach((b, i) => b.dataset.year = String(2027 + i)); });
  await reset();
  await check('the launch offer shows for 2027 and 2028 only', async () => {
    const r = [];
    for (const y of [2026, 2027, 2028, 2029]) { await set({ date: [y === 2026 ? 2026 : y, y === 2026 ? 12 : 6, 12] }); r.push(await p.$eval('[data-offer]', e => !e.hidden)); }
    return eq(r.join(','), 'false,true,true,false');
  }, async () => p.evaluate(() => { const o = document.querySelector('[data-offer]'); new MutationObserver(() => { o.hidden = false; }).observe(o, { attributes: true }); o.hidden = false; }));
  await reset();

  // 4. here or abroad
  await check('somewhere abroad writes Destination Wedding and the letter', async () => {
    await p.click('label:has(input[name="place"][value="abroad"])'); await p.waitForTimeout(80);
    const r = [await p.$eval('select[name="celebrating"]', e => e.value), (await p.$eval('[data-f="message"]', e => e.value)).includes('somewhere abroad'), await T('[data-o="planPlace"]')];
    return eq(r.join(' | '), 'Destination Wedding | true | somewhere abroad');
  }, async () => p.evaluate(() => { document.querySelector('input[name="place"][value="abroad"]').value = 'local'; }));
  await p.evaluate(() => { document.querySelectorAll('input[name="place"]').forEach((i, k) => i.value = k ? 'abroad' : 'local'); });
  await reset();

  // 5. the tabs are the control for the help
  await check('full planning holds 17 of 17, every tab pressed, the 17 full', async () => {
    const r = await p.evaluate(() => [document.querySelectorAll('.tab[aria-pressed="true"]').length, document.querySelector('[data-o="tabCount"]').textContent, getComputedStyle(document.getElementById('tabs')).getPropertyValue('--held').trim()]);
    return eq(r.join(' | '), '17 | Elise holds 17 of 17. | 1.0000');
  }, async () => p.evaluate(() => document.querySelector('.tab').setAttribute('aria-pressed', 'false')));
  await reset();
  await check('a tab tapped in full planning turns it into partial planning with 16', async () => {
    await p.evaluate(() => document.getElementById('tabs').scrollIntoView()); await p.waitForTimeout(600);
    await p.click('.tab[data-tab="3"]'); await p.waitForTimeout(120);
    const r = await p.evaluate(() => [document.querySelector('input[name="help-wedding"]:checked').value, document.querySelectorAll('.tab[aria-pressed="true"]').length, document.querySelector('.tab[data-tab="3"]').getAttribute('aria-pressed')]);
    return eq(r.join(' '), 'partial 16 false');
  }, async () => p.evaluate(() => { document.querySelector('.tab[data-tab="3"]').classList.remove('tab'); }));
  await p.evaluate(() => { const b = document.querySelector('[data-tab="3"]'); b.classList.add('tab'); });
  await reset();
  await check('partial planning, the tabs chosen are written into the letter in order', async () => {
    await p.click('label:has(input[name="help-wedding"][value="partial"])');
    for (const i of [7, 5, 16]) await p.click(`.tab[data-tab="${i}"]`);
    await p.waitForTimeout(100);
    const want = `We’d love help with ${join([5, 7, 16].map(i => word(TABS[i])))}, and we’d like to be one of your first couples.`;
    const m = await p.$eval('[data-f="message"]', e => e.value);
    const held = await p.evaluate(() => getComputedStyle(document.getElementById('tabs')).getPropertyValue('--held').trim());
    return eq((m.endsWith(want)) + ' ' + held + ' ' + await T('[data-o="tabCount"]'), `true ${(3 / 17).toFixed(4)} Elise holds 3 of 17.`);
  }, async () => p.evaluate(() => { document.querySelector('.tab[data-tab="16"]').dataset.tab = '15'; }));
  await p.evaluate(() => { document.querySelectorAll('.tab').forEach((b, i) => b.dataset.tab = String(i)); });
  await reset();
  await check('wedding day coordination, no tab pressed, the day tab out, the letter asks for the day', async () => {
    await p.click('label:has(input[name="help-wedding"][value="day"])'); await p.waitForTimeout(800);
    const r = await p.evaluate(() => [document.querySelectorAll('.tab[aria-pressed="true"]').length, getComputedStyle(document.querySelector('.pl-day')).visibility, document.querySelector('[data-f="message"]').value.includes('We’d love you to coordinate the day itself')]);
    return eq(r.join(' '), '0 visible true');
  }, async () => p.addStyleTag({ content: '[data-help="day"] .pl-day{visibility:hidden!important}' }));
  await reset();

  // 6. the three paths
  for (const [path, cel, kindIdx, helpId, lead] of [['private', 'Private Event', 0, 'whole', 'I’d love you to handle the whole event.'], ['company', 'Corporate Event', 2, 'freelance', 'We’d like to hire you as a freelance event manager in our team.']]) {
    await check(`${path} path, its button everywhere, its form type, its letter`, async () => {
      await p.click(`label.path:has(input[value="${path}"])`); await p.waitForTimeout(100);
      if (helpId === 'freelance') await p.click('label:has(input[name="help-company"][value="freelance"])');
      await p.waitForTimeout(80);
      const ctas = await p.$$eval('[data-o="cta"]', es => [...new Set(es.map(e => e.textContent))]);
      const d = new Date(P[path].defaultDate + 'T00:00:00Z');
      const k = { private: ['a milestone birthday or anniversary'], company: [null, null, 'an award ceremony or gala'] }[path][kindIdx];
      const who = path === 'private' ? 'I’m' : 'we’re';
      const want = `Hi Elise, ${who} planning ${k} on ${long(d)}, for about ${P[path].guests} guests. ${lead}`;
      const r = [ctas.join('/'), await p.$eval('select[name="celebrating"]', e => e.value), await p.$eval('[data-f="message"]', e => e.value)];
      return eq(r.join(' | '), `${P[path].cta} | ${cel} | ${want}`);
    }, async () => p.evaluate(() => { const s = document.querySelectorAll('[data-o="cta"]'); s[s.length - 1].removeAttribute('data-o'); s[s.length - 1].textContent = 'Tell me everything'; }));
  }
  await check('company path meets the Pro League Awards first, the others Cinco Cero first', async () => {
    const order = async () => p.evaluate(() => { const a = document.querySelector('.n-pro').getBoundingClientRect().top, c = document.querySelector('.n-cinco').getBoundingClientRect().top; return a < c ? 'pro' : 'cinco'; });
    await set({ path: 'company' }); const a = await order(); await set({ path: 'private' }); const b2 = await order(); await set({ path: 'wedding' }); const c = await order();
    return eq([a, b2, c].join(','), 'pro,cinco,cinco');
  }, async () => p.addStyleTag({ content: '[data-path="company"] .n-pro{order:3!important}' }));
  await check('company path shows the Handelsbeurs under the lens and behind the doors, the others the tent and Cinco Cero', async () => {
    const vis = s => p.$eval(s, e => e.offsetParent !== null);
    await set({ path: 'company' }); const a = [await vis('.img-hall'), await vis('.img-tent'), await vis('.bh-pro')];
    await set({ path: 'wedding' }); const c = [await vis('.img-hall'), await vis('.img-tent'), await vis('.bh-cinco')];
    return eq(a.concat(c).join(','), 'true,false,true,false,true,true');
  }, async () => p.addStyleTag({ content: '.img-hall{display:none!important}' }));
  await reset();

  // 7. the guests
  await check('guests, the number, the line and the words against her two nights', async () => {
    const r = [];
    for (const g of [60, 125, 300, 600]) { await p.$eval('input[name="guests"]', (e, g) => { e.value = g; e.dispatchEvent(new Event('input', { bubbles: true })); }, g); r.push(await T('[data-o="guests"]') + ':' + (await T('[data-o="guestsLine"]')).split(' ')[0]); }
    return eq(r.join(' '), '60:Fewer 125:Exactly 300:Between 600:As');
  }, async () => p.evaluate(() => { document.querySelector('input[name="guests"]').name = 'guestsx'; }));
  await p.evaluate(() => { const i = document.querySelector('input[name="guestsx"]'); if (i) i.name = 'guests'; });
  await check('guest steps clamp at 600 and 10', async () => {
    await set({ guests: 595 }); await p.click('[data-g="10"]'); const hi = await T('[data-o="guests"]');
    await set({ guests: 15 }); await p.click('[data-g="-10"]'); const lo = await T('[data-o="guests"]');
    return eq(hi + ' ' + lo, '600 10');
  }, async () => p.evaluate(() => { document.querySelector('[data-g="10"]').dataset.g = '20'; }));
  await p.evaluate(() => { const b = document.querySelector('[data-g="20"]'); if (b) b.dataset.g = '10'; });
  await reset();

  // 8. the letter
  await check('a letter the visitor edited is kept when a choice changes, and comes back on request', async () => {
    await p.fill('[data-f="message"]', 'Our own words'); await set({ guests: 140 });
    const kept = await p.$eval('[data-f="message"]', e => e.value);
    await p.evaluate(() => document.querySelector('[data-rewrite]').click()); const back = await p.$eval('[data-f="message"]', e => e.value);
    return eq(kept + ' | ' + back.includes('about 140 guests'), 'Our own words | true');
  }, async () => p.evaluate(() => { window.HIH.S.dirty = false; document.querySelector('[data-f="message"]').addEventListener('input', () => { window.HIH.S.dirty = false; }); }));
  await reset();
  await check('an empty letter is caught, with the reason', async () => {
    await p.evaluate(() => document.getElementById('letter').scrollIntoView()); await p.waitForTimeout(300);
    await p.click('.send'); await p.waitForTimeout(100);
    const r = await p.evaluate(() => [document.querySelector('[data-err]').textContent, document.querySelector('[data-sealed]').hidden, document.querySelectorAll('[aria-invalid="true"]').length]);
    return eq(r.join(' | '), 'Elise needs your first name, your last name and an email address Elise can answer. | true | 3');
  }, async () => p.evaluate(() => { const f = document.querySelector('[data-letter]'); ['first', 'last', 'email'].forEach(n => f.elements[n].value = n === 'email' ? 'a@b.co' : 'x'); }));
  await check('a sealed letter, the form gone, the envelope up, the whole request in the mail', async () => {
    await p.fill('[data-letter] input[name="first"]', 'Lotte'); await p.fill('[data-letter] input[name="last"]', 'Peeters'); await p.fill('[data-letter] input[name="email"]', 'lotte@example.com');
    await p.selectOption('select[name="found"]', 'Instagram');
    await p.click('.send'); await p.waitForTimeout(1600);
    const r = await p.evaluate(() => { const m = decodeURIComponent(document.querySelector('[data-mail]').href); return [document.querySelector('[data-letter]').hidden, document.querySelector('[data-sealed]').hidden, m.includes('Wedding enquiry from Lotte Peeters'), m.includes('lotte@example.com'), m.includes('about 100 guests'), m.includes('How did you find Honey, it’s Handled? Instagram')]; });
    return eq(r.join(','), 'true,false,true,true,true,true');
  }, async () => p.evaluate(() => { document.querySelector('[data-letter]').addEventListener('submit', e => e.stopImmediatePropagation(), true); }));

  // 9. reveal, lens, lacquer, ball on a fresh page started by a real wheel (the first page is closed to keep memory low)
  await p.close();
  const q = await ctx.newPage(); q.on('pageerror', e => errs.push(e.message));
  await q.goto(U, { waitUntil: 'load' }); await q.waitForTimeout(1500);
  await check('the lacquer HH is drawn in her red on the hero canvas', async () => {
    // the lacquer rests once it has poured, so a hand over it wakes it, the way a visitor's would, then the pixels are
    // read inside the next animation frame, after the page has drawn (the buffer isn't preserved past compositing)
    const cr = await q.evaluate(() => { const r = document.getElementById('lacquer').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    for (let i = 0; i < 6; i++) { await q.mouse.move(cr[0] + cr[2] * (0.4 + i * 0.02), cr[1] + cr[3] * 0.5); await q.waitForTimeout(40); }
    const px = await q.evaluate(() => new Promise(res => {
      // a slow device skips frames, so look over up to 30 frames for one the page drew
      let n = 0; const done = setTimeout(() => res([false, 'no frame read']), 4000);
      const look = () => { const c = document.getElementById('lacquer'); const g = c.getContext('webgl'); const w = c.width, h = c.height; const out = new Uint8Array(4 * w * h); g.readPixels(0, 0, w, h, g.RGBA, g.UNSIGNED_BYTE, out); let red = 0; for (let i = 0; i < out.length; i += 16) if (out[i] > 100 && out[i + 1] < 70 && out[i + 2] < 80) red++;
        if (red > 2000 || ++n > 30) { clearTimeout(done); res([document.documentElement.classList.contains('gl-on'), red]); } else requestAnimationFrame(look); };
      requestAnimationFrame(look); }));
    return px[0] && px[1] > 2000 ? true : 'gl-on ' + px[0] + ', red pixels (every fourth) ' + px[1];
  }, async () => q.evaluate(() => { document.documentElement.classList.remove('gl-on'); window.HIH_LACQUER && (window.HIH_LACQUER.wake = () => {}); const c = document.getElementById('lacquer'); c.replaceWith(c.cloneNode()); }));
  await check('the bar is off on the first screen and on mid page where no call is in view', async () => {
    const top = await q.evaluate(() => document.querySelector('[data-sbar]').classList.contains('is-on'));
    await q.evaluate(() => { const e = document.querySelector('.det-head'); window.scrollTo(0, e.getBoundingClientRect().top + scrollY + 40); }); await q.mouse.wheel(0, 2); await q.waitForTimeout(400);
    const mid = await q.evaluate(() => document.querySelector('[data-sbar]').classList.contains('is-on'));
    return eq(top + ' ' + mid, 'false true');
  }, async () => q.evaluate(() => { document.querySelector('[data-sbar]').classList.add('is-on'); }));
  await check('the lens follows the pointer and the peek button flips the photo', async () => {
    await q.evaluate(() => document.querySelector('.lens').scrollIntoView()); await q.waitForTimeout(300);
    const r = await q.evaluate(() => { const e = document.querySelector('.lens').getBoundingClientRect(); return [e.left, e.top, e.width, e.height]; });
    const before = await q.$eval('.img-tent', e => e.style.getPropertyValue('--mx'));
    await q.mouse.move(r[0] + r[2] * 0.2, r[1] + r[3] * 0.3); await q.waitForTimeout(700);
    const after = await q.$eval('.img-tent', e => e.style.getPropertyValue('--mx'));
    await q.click('[data-peek]'); await q.waitForTimeout(700);
    const pk = await q.evaluate(() => [document.querySelector('.lens').classList.contains('peek'), document.querySelector('[data-peek]').getAttribute('aria-pressed'), getComputedStyle(document.querySelector('.img-tent .top')).opacity]);
    await q.click('[data-peek]');
    return eq([before !== after, ...pk].join(','), 'true,true,true,0');
  }, async () => q.evaluate(() => { const L = document.querySelector('.lens'); L.replaceWith(L.cloneNode(true)); }));
  await check('the doors open with the scroll, closed at their start, open by their end', async () => {
    const at = async f => { await q.evaluate(f => { const d = document.querySelector('.doors'); window.scrollTo(0, d.getBoundingClientRect().top + scrollY + (d.offsetHeight - innerHeight) * f); }, f); await q.mouse.wheel(0, 1); await q.waitForTimeout(250); return +(await q.$eval('.doors', e => getComputedStyle(e).getPropertyValue('--p'))); };
    const a = await at(0), c = await at(0.95);
    return a < 0.02 && c > 0.98 ? true : `p at start ${a}, at end ${c}`;
  }, async () => q.evaluate(() => { const d = document.querySelector('.doors'); d.classList.remove('doors'); d.classList.add('doorsx'); }));
  await check('the 570+ figures open into the full Handelsbeurs photo', async () => {
    const at = async f => { await q.evaluate(f => { const d = document.querySelector('[data-zoom]'); window.scrollTo(0, d.getBoundingClientRect().top + scrollY + (d.offsetHeight - innerHeight) * f); }, f); await q.mouse.wheel(0, 1); await q.waitForTimeout(250); return +(await q.$eval('[data-zoom]', e => e.style.getPropertyValue('--f') || '0')); };
    const a = await at(0.02), c = await at(0.97);
    return a < 0.02 && c > 0.98 ? true : `fade at start ${a}, at end ${c}`;
  }, async () => q.evaluate(() => { document.querySelector('[data-zoom]').removeAttribute('data-zoom'); }));
  await check('her film plays only while the figures are on screen, and stops when they leave', async () => {
    await q.evaluate(() => document.querySelector('.fig125').scrollIntoView({ block: 'center' })); await q.mouse.wheel(0, 1); await q.waitForTimeout(2500);
    const on = await q.$eval('[data-film] video', v => !v.paused);
    await q.evaluate(() => window.scrollTo(0, 0)); await q.waitForTimeout(600);
    const off = await q.$eval('[data-film] video', v => v.paused);
    return eq(on + ' ' + off, 'true true');
  }, async () => q.evaluate(() => { const v = document.querySelector('[data-film] video'); v.play = () => Promise.reject(new Error('blocked')); }));
  await check('the mirror ball turns once the letter is near, drawn from her facets', async () => {
    await q.evaluate(() => document.getElementById('letter').scrollIntoView()); await q.mouse.wheel(0, 1); await q.waitForTimeout(2500);
    const r = await q.evaluate(() => new Promise(res => { setTimeout(() => res([false, 'no frame read']), 3000); requestAnimationFrame(() => { const c = document.getElementById('ball'), g = c.getContext('webgl'); const out = new Uint8Array(4); g.readPixels(c.width >> 1, c.height >> 1, 1, 1, g.RGBA, g.UNSIGNED_BYTE, out); res([document.documentElement.classList.contains('ball-on'), out[3]]); }); }));
    return r[0] && r[1] > 200 ? true : `ball-on ${r[0]}, centre alpha ${r[1]}`;
  }, async () => q.evaluate(() => { document.documentElement.classList.remove('ball-on'); const c = document.getElementById('ball'); c.id = 'ballx'; }));
  await check('the header turns dark over her nights and red over the letter', async () => {
    const tone = async s => { await q.evaluate(s => { const e = document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top + scrollY + 10); }, s); await q.mouse.wheel(0, 1); await q.waitForTimeout(300); return q.$eval('[data-hdr]', e => e.dataset.tone); };
    return eq([await tone('.n-cinco'), await tone('#letter'), await tone('#tabs'), await tone('#top')].join(','), 'dark,red,blue,light');
  }, async () => q.evaluate(() => document.querySelectorAll('[data-tone="dark"]').forEach(e => { if (!e.matches('[data-hdr]')) e.dataset.tone = 'light'; })));

  // 10. reduced motion, every scene still and complete, no film
  await ctx.close();
  const rc = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); rc.setDefaultTimeout(6000);
  const r = await rc.newPage(); r.on('pageerror', e => errs.push(e.message));
  await r.goto(U, { waitUntil: 'load' }); await r.waitForTimeout(1200);
  await check('reduced motion, doors open, tabs out, stickers on, the film never plays', async () => {
    for (let y = 0; y < 16000; y += 700) { await r.evaluate(y => scrollTo(0, y), y); await r.waitForTimeout(40); }
    await r.evaluate(() => document.querySelector('.fig125').scrollIntoView({ block: 'center' })); await r.waitForTimeout(1500);
    const s = await r.evaluate(() => [getComputedStyle(document.querySelector('.doors')).getPropertyValue('--p').trim(), document.querySelector('.planner').classList.contains('is-in'), getComputedStyle(document.querySelector('.s-book')).opacity, document.querySelector('[data-film] video').paused, document.querySelector('[data-film] video').readyState]);
    return eq(s.join(','), '1,true,1,true,0');
  }, async () => r.evaluate(() => { const v = document.querySelector('[data-film] video'); v.preload = 'auto'; v.muted = true; v.play(); }));

  // 11. the first screen holds the question, the three answers and the call, at 1440 and 390
  await rc.close();
  for (const [w, h] of [[1440, 900], [390, 844], [320, 640]]) {
    const fc = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 600, hasTouch: w < 600 });
    const f = await fc.newPage(); await f.goto(U, { waitUntil: 'load' }); await f.waitForTimeout(800);
    await check(`first screen at ${w} holds the question, three answers and the call`, async () => {
      const r2 = await f.evaluate(() => { const vh = innerHeight, inV = e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= vh && r.width > 0; }; return [inV(document.querySelector('#h-top')), [...document.querySelectorAll('.path')].filter(inV).length, inV(document.querySelector('[data-hero-cta]'))]; });
      return eq(r2.join(','), 'true,3,true');
    }, async () => f.addStyleTag({ content: '.hero-t{padding-top:900px!important}' }));
    await fc.close();
  }

  // 12. no script errors anywhere above
  await check('no script errors', async () => errs.length ? errs.slice(0, 3).join(' | ') : true, async () => { errs.push('planted'); });
  await b.close();
  console.log(rows.join('\n'));
  console.log(`\n${pass} pass, ${fail} fail${PLANT ? ' (plant mode, every check should FAIL)' : ''}`);
})();
