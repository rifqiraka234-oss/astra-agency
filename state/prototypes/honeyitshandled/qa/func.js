// Honey It's Handled functional checks. usage: NODE_PATH=... node qa/func.js <base url> [plant]
// One wedding carried down the page. Every expected value is worked out here from build/data/site.json and plain date
// sums, never read back from the page. With "plant", each check gets a fault first and must FAIL, so a pass in normal
// mode means the check can see. Today is fixed with ?today=2026-10-26 so the day counts are known.
const { chromium } = require('playwright');
const fs = require('fs');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const D = JSON.parse(fs.readFileSync(__dirname + '/../build/data/site.json', 'utf8'));
const U = base + '/?today=2026-10-26';
const res = []; const ok = (n, p, info) => res.push({ n, p: !!p, info });
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
const between = (a, b) => Math.round((day(b) - day(a)) / 864e5);
const dt = s => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const longD = s => { const d = dt(s); return WD[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + MO[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); };
const shortD = s => { const d = dt(s); return WD[d.getUTCDay()].slice(0, 3) + ' ' + d.getUTCDate() + ' ' + MO[d.getUTCMonth()].slice(0, 3) + ' ' + d.getUTCFullYear(); };
const addD = (s, n) => { const d = new Date(day(s) + n * 864e5); return d.toISOString().slice(0, 10); };
const TODAY = '2026-10-26';
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(U, { waitUntil: 'networkidle' }); await p.waitForTimeout(900);
  const T = s => p.evaluate(s => { const e = document.querySelector(s); return e ? e.textContent.trim() : null; }, s);

  // 1 the hero is the first input, the date writes the card, the count, the bar and the letter
  const d1 = '2027-09-18';
  if (plant) await p.evaluate(() => document.querySelector('[data-f="date"]').addEventListener('change', e => e.stopImmediatePropagation(), true));
  await p.fill('[data-f="date"]', d1); await p.dispatchEvent('[data-f="date"]', 'change'); await p.waitForTimeout(300);
  const s1 = await p.evaluate(() => ({ big: document.querySelector('[data-o="dateBig"]').textContent, wd: document.querySelector('[data-o="weekday"]').textContent, sub: document.querySelector('[data-o="dateSub"]').textContent, card: document.querySelector('[data-o="cardDate"]').textContent, days: document.querySelector('[data-o="days"]').textContent, bar: document.querySelector('[data-o="barDate"]').textContent, msg: document.querySelector('[data-f="message"]').value, long: document.querySelector('[data-o="dateLong"]').textContent }));
  const n1 = between(TODAY, d1), dd = dt(d1), cd = dd.getUTCDate() + ' ' + MO[dd.getUTCMonth()] + ' ' + dd.getUTCFullYear();
  ok('the date writes the card, the count, the bar and the letter', s1.big === cd && s1.card === cd && s1.wd === 'Saturday' && s1.sub === n1 + ' days from today' && s1.days === String(n1) && s1.bar === shortD(d1) && s1.long === longD(d1) && s1.msg.includes('on ' + longD(d1)), { s1, want: { cd, n1 } });

  // 2 a week either side, by button
  if (plant) await p.evaluate(() => document.querySelector('[data-step="1"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('[data-step="1"]'); await p.click('[data-step="1"]'); await p.waitForTimeout(250);
  const d2 = addD(d1, 14);
  ok('two weeks later by the arrows', (await T('[data-o="dateBig"]')) === (dt(d2).getUTCDate() + ' ' + MO[dt(d2).getUTCMonth()] + ' ' + dt(d2).getUTCFullYear()) && (await p.inputValue('[data-f="date"]')) === d2, { got: await T('[data-o="dateBig"]'), d2 });

  // 3 drag the big date sideways
  if (plant) await p.evaluate(() => document.querySelector('[data-drag]').addEventListener('pointerdown', e => e.stopImmediatePropagation(), true));
  const start3 = await p.inputValue('[data-f="date"]');
  const bx = await p.evaluate(() => { const r = document.querySelector('[data-drag]').getBoundingClientRect(); return [r.left + 60, r.top + r.height / 2]; });
  await p.mouse.move(bx[0], bx[1]); await p.mouse.down(); for (let i = 1; i <= 10; i++) await p.mouse.move(bx[0] - i * 10, bx[1]); await p.mouse.up(); await p.waitForTimeout(250);
  const d3 = addD(start3, -14), big3 = await T('[data-o="dateBig"]');
  ok('drag back two weeks', (await p.inputValue('[data-f="date"]')) === d3 && big3 === (dt(d3).getUTCDate() + ' ' + MO[dt(d3).getUTCMonth()] + ' ' + dt(d3).getUTCFullYear()), { got: await p.inputValue('[data-f="date"]'), big3, d3 });

  // 4 the days are drawn, one stroke a day, all inked at the end of the scene
  await p.fill('[data-f="date"]', D.defaultDate); await p.dispatchEvent('[data-f="date"]', 'change'); await p.waitForTimeout(400);
  const N = between(TODAY, D.defaultDate);
  if (plant) await p.evaluate(() => { const o = document.querySelector('[data-o="days"]'); new MutationObserver(() => { if (o.textContent !== '7') o.textContent = '7'; }).observe(o, { childList: true, characterData: true, subtree: true }); o.textContent = '7'; });
  await p.evaluate(() => { const r = document.querySelector('.year-run'); scrollTo(0, r.getBoundingClientRect().top + scrollY + r.offsetHeight - innerHeight - 4); }); await p.waitForTimeout(900);
  const s4 = await p.evaluate(() => { const c = document.querySelector('[data-days]'), x = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let red = 0; for (let i = 0; i < x.length; i += 4) if (x[i] > 120 && x[i + 1] < 60 && x[i + 2] < 60 && x[i + 3] > 200) red++; return { drawn: window.HIH.drawn, days: document.querySelector('[data-o="days"]').textContent, red, frac: red / (c.width * c.height), ink: document.querySelector('[data-o="inkDay"]').textContent, steps: [...document.querySelectorAll('[data-stepi]')].map(l => l.className), notes: document.querySelectorAll('[data-note].is-on').length }; });
  ok('one stroke a day, all inked at the end', s4.drawn && s4.drawn.N === N && s4.drawn.strokes === N && s4.drawn.k === N && s4.days === String(N) && s4.frac > 0.02 && /^Your wedding day/.test(s4.ink) && /is-on/.test(s4.steps[3]) && s4.notes === D.details.length, { s4, N });

  // 5 halfway through the scene, half the days, a date on the ink
  await p.evaluate(() => { const r = document.querySelector('.year-run'); const top = r.getBoundingClientRect().top + scrollY, tot = r.offsetHeight - innerHeight; scrollTo(0, top + tot * (0.04 + 0.86 * 0.5)); }); await p.waitForTimeout(700);
  if (plant) await p.evaluate(() => { window.HIH.drawn.k = 0; const s = document.querySelector('.year.is-live'); s.classList.remove('is-live'); });
  const s5 = await p.evaluate(() => ({ k: window.HIH.drawn.k, ink: document.querySelector('[data-o="inkDay"]').textContent }));
  const k5 = Math.round(0.5 * N), d5 = addD(TODAY, k5);
  ok('half the days at half the scene, with the day named', Math.abs(s5.k - k5) <= 2 && s5.ink.startsWith('Day ') && s5.ink.includes(String(dt(d5).getUTCFullYear())), { s5, k5 });

  // 6 the help splits the ink, and writes the bar and the letter
  if (plant) await p.evaluate(() => document.querySelector('[data-help="partial"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('[data-help="partial"]'); await p.waitForTimeout(300);
  const s6 = await p.evaluate(() => ({ cut: window.HIH.drawn.cut, line: document.querySelector('[data-o="helpLine"]').textContent, bar: document.querySelector('[data-o="barRest"]').textContent, msg: document.querySelector('[data-f="message"]').value, pressed: document.querySelector('[data-help="partial"]').getAttribute('aria-pressed') }));
  const sv = D.services.find(s => s.id === 'partial');
  ok('partial planning splits the ink at the example point', s6.cut === Math.round(N * sv.stepIn) && s6.line === sv.line && s6.bar.endsWith('Partial planning') && s6.msg.includes('help with part of the planning') && s6.pressed === 'true', s6);
  if (plant) await p.evaluate(() => document.querySelector('[data-help="day"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('[data-help="day"]'); await p.waitForTimeout(250);
  const s6b = await p.evaluate(() => window.HIH.drawn.cut);
  ok('day coordination carries the last 56 days', s6b === Math.max(0, N - D.services.find(s => s.id === 'day').stepInDays), { s6b });
  await p.click('[data-help="full"]'); await p.waitForTimeout(200);

  // 7 guests fill the hall, and the two nights light up at their numbers
  await p.evaluate(() => document.getElementById('nights').scrollIntoView()); await p.waitForTimeout(300);
  const setG = async g => { await p.evaluate(g => { const r = document.querySelector('[data-f="guests"]'); r.value = g; r.dispatchEvent(new Event('input', { bubbles: true })); }, g); await p.waitForTimeout(200); };
  if (plant) await p.evaluate(() => document.querySelector('[data-f="guests"]').addEventListener('input', e => e.stopImmediatePropagation(), true));
  await setG(125);
  const s7 = await p.evaluate(() => ({ lit: document.querySelectorAll('[data-seats] .st.is-on').length, cc: document.querySelector('.mk-cc').classList.contains('is-on'), pl: document.querySelector('.mk-pl').classList.contains('is-on'), read: document.querySelector('[data-o="hallRead"]').textContent, big: document.querySelector('[data-o="guests"]').textContent, bar: document.querySelector('[data-o="barRest"]').textContent, msg: document.querySelector('[data-f="message"]').value }));
  await setG(600);
  const s7b = await p.evaluate(() => ({ lit: document.querySelectorAll('[data-seats] .st.is-on').length, pl: document.querySelector('.mk-pl').classList.contains('is-on'), read: document.querySelector('[data-o="hallRead"]').textContent }));
  ok('125 guests fill 125 seats and meet Cinco Cero', s7.lit === 125 && s7.cc && !s7.pl && s7.read === '125 guests. About the size of Cinco Cero, ' + D.nights.cinco.guests + '.' && s7.big === '125' && s7.bar.startsWith('125 guests') && s7.msg.includes('about 125 guests'), s7);
  ok('600 guests reach the Pro League Awards', s7b.lit === 600 && s7b.pl && s7b.read.includes(D.nights.pro.guestsText), s7b);
  await setG(100);

  // 8 abroad is a destination wedding in her own form
  if (plant) await p.evaluate(() => document.querySelector('[data-place="destination"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('[data-place="destination"]'); await p.waitForTimeout(250);
  const s8 = await p.evaluate(() => ({ cel: document.querySelector('[data-f="celebrating"]').value, msg: document.querySelector('[data-f="message"]').value }));
  ok('abroad writes Destination Wedding', s8.cel === 'Destination Wedding' && s8.msg.includes('somewhere abroad'), s8);
  await p.click('[data-place="local"]'); await p.waitForTimeout(150);

  // 9 the launch offer only for 2027 and 2028
  await p.fill('[data-f="date"]', '2029-05-19'); await p.dispatchEvent('[data-f="date"]', 'change'); await p.waitForTimeout(250);
  if (plant) await p.evaluate(() => { document.querySelector('[data-f="first"]').disabled = false; });
  const s9 = await p.evaluate(() => ({ dis: document.querySelector('[data-f="first"]').disabled, note: document.querySelector('[data-o="offerNote"]').hidden, msg: document.querySelector('[data-f="message"]').value, line: document.querySelector('[data-o="offerLine"]').textContent }));
  await p.fill('[data-f="date"]', D.defaultDate); await p.dispatchEvent('[data-f="date"]', 'change'); await p.waitForTimeout(250);
  const s9b = await p.evaluate(() => ({ dis: document.querySelector('[data-f="first"]').disabled, chk: document.querySelector('[data-f="first"]').checked, msg: document.querySelector('[data-f="message"]').value }));
  ok('the offer is for 2027 and 2028 only', s9.dis && !s9.note && !s9.msg.includes('first couples') && s9.line.startsWith('The launch offer is for weddings in 2027 or 2028') && !s9b.dis && s9b.chk && s9b.msg.includes('one of your first couples'), { s9, s9b });

  // 10 no date yet, counted to 1 July of the year, the arrows step years
  if (plant) await p.evaluate(() => document.querySelector('[data-nodate]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
  await p.click('[data-nodate]'); await p.waitForTimeout(250);
  const s10 = await p.evaluate(() => ({ big: document.querySelector('[data-o="dateBig"]').textContent, days: document.querySelector('[data-o="days"]').textContent, msg: document.querySelector('[data-f="message"]').value, bar: document.querySelector('[data-o="barDate"]').textContent, lab: document.querySelector('[data-step="1"]').getAttribute('aria-label') }));
  await p.click('[data-step="1"]'); await p.waitForTimeout(200);
  const s10b = await T('[data-o="dateBig"]');
  ok('no date yet', s10.big === 'Sometime in 2027' && s10.days === String(between(TODAY, '2027-07-01')) && s10.msg.includes('in 2027') && s10.msg.includes('haven’t picked the date') && s10.bar === 'No date yet, 2027' && s10.lab === 'A year later' && s10b === 'Sometime in 2028', { s10, s10b });
  if (plant) await p.evaluate(() => { window.HIH.set({ noDate: true }); document.querySelector('[data-f="date"]').addEventListener('change', e => e.stopImmediatePropagation(), true); });
  await p.fill('[data-f="date"]', D.defaultDate); await p.dispatchEvent('[data-f="date"]', 'change'); await p.waitForTimeout(200);
  const back = await T('[data-o="dateBig"]');
  ok('picking a date leaves no date yet', back === '12 June 2027' && (await p.getAttribute('[data-nodate]', 'aria-pressed')) === 'false', { back });

  // 11 her own words, once edited, aren't overwritten, and can be written again
  await p.evaluate(() => document.getElementById('letter').scrollIntoView()); await p.waitForTimeout(300);
  await p.fill('[data-f="message"]', 'We met at a wedding in Ghent.');
  await setG(140);
  if (plant) await p.evaluate(() => { document.querySelector('[data-f="message"]').value = 'changed'; });
  const s11 = await p.evaluate(() => ({ msg: document.querySelector('[data-f="message"]').value, rw: !document.querySelector('[data-rewrite]').hidden }));
  await p.click('[data-rewrite]'); await p.waitForTimeout(150);
  const s11b = await p.inputValue('[data-f="message"]');
  ok('an edited letter is kept, and can be written again', s11.msg === 'We met at a wedding in Ghent.' && s11.rw && s11b.includes('about 140 guests'), { s11, s11b });
  await setG(100);

  // 12 the letter, caught when empty, then sealed with everything in it
  if (plant) await p.evaluate(() => { window.__stop = e => { e.preventDefault(); e.stopImmediatePropagation(); }; document.querySelector('[data-letter]').addEventListener('submit', window.__stop, true); });
  await p.click('.send'); await p.waitForTimeout(200);
  if (plant) await p.evaluate(() => document.querySelector('[data-letter]').removeEventListener('submit', window.__stop, true));
  const s12a = await p.evaluate(() => ({ err: !document.querySelector('[data-err]').hidden, txt: document.querySelector('[data-err]').textContent, post: !document.querySelector('[data-post]').hidden, focus: document.activeElement && document.activeElement.name }));
  ok('an empty letter is caught, with the first field focused', s12a.err && !s12a.post && s12a.focus === 'first' && /first name/.test(s12a.txt), s12a);
  await p.fill('input[name="first"]', 'Lotte'); await p.fill('input[name="last"]', 'Peeters'); await p.fill('input[name="email"]', 'lotte@example.com');
  if (plant) await p.evaluate(() => { window.HIH.seal = null; document.querySelector('[data-letter]').addEventListener('submit', () => setTimeout(() => { document.querySelector('[data-post]').hidden = true; }, 50)); });
  await p.click('.send'); await p.waitForTimeout(2600);
  const s12 = await p.evaluate(() => ({ post: !document.querySelector('[data-post]').hidden, form: document.querySelector('[data-letter]').hidden, line: document.querySelector('[data-o="postLine"]').textContent, mail: document.querySelector('[data-mail]').getAttribute('href'), env: document.querySelector('[data-env2]').className, t: document.querySelector('[data-post-t]').className, card: document.querySelector('[data-o="cardDate2"]').textContent }));
  const mailBody = decodeURIComponent((s12.mail.split('body=')[1] || ''));
  ok('sending seals the letter with the whole request in the mail', s12.post && s12.form && s12.line.includes('Lotte') && s12.line.includes(longD(D.defaultDate)) && s12.mail.startsWith('mailto:' + D.contact.email) && mailBody.includes('on ' + longD(D.defaultDate)) && mailBody.includes('about 100 guests') && mailBody.includes('Lotte Peeters') && mailBody.includes('lotte@example.com') && /is-closing/.test(s12.env) && /is-in/.test(s12.t) && s12.card === '12 June 2027', { s12, mailBody });

  // 13 the secondary visitor, a private event, lands on the same letter
  const q = await ctx.newPage(); await q.goto(U, { waitUntil: 'networkidle' }); await q.waitForTimeout(500);
  await q.evaluate(() => document.querySelector('[data-celebrate]').scrollIntoView({ block: 'center' })); await q.waitForTimeout(300);
  if (plant) await q.evaluate(() => document.querySelector('[data-celebrate]').addEventListener('click', e => { e.stopImmediatePropagation(); }, true));
  await q.click('[data-celebrate]'); await q.waitForTimeout(1600);
  const s13 = await q.evaluate(() => ({ cel: document.querySelector('[data-f="celebrating"]').value, hash: location.hash, top: Math.round(document.getElementById('letter').getBoundingClientRect().top), focus: document.activeElement && document.activeElement.name }));
  ok('a private event reaches the letter, set', s13.cel === 'Private Event' && s13.hash === '#letter' && Math.abs(s13.top - 68) < 80 && s13.focus === 'first', s13);

  // 14 the bar, off at the top, on through the story, off at the letter and wherever a call is on screen
  const g = await ctx.newPage(); await g.goto(U, { waitUntil: 'networkidle' }); await g.waitForTimeout(500);
  if (plant) await g.evaluate(() => { const s = document.querySelector('[data-sbar]'); new MutationObserver(() => { if (!s.classList.contains('is-on')) s.classList.add('is-on'); }).observe(s, { attributes: true }); s.classList.add('is-on'); });
  const barAt = async sel => { await g.evaluate(sel => { if (sel === 'top') scrollTo(0, 0); else { const e = document.querySelector(sel); scrollTo(0, e.getBoundingClientRect().top + scrollY + (sel === '.year-run' ? innerHeight : 0)); } }, sel); await g.waitForTimeout(500); return g.evaluate(() => document.querySelector('[data-sbar]').classList.contains('is-on')); };
  const b0 = await barAt('top'), b1 = await barAt('.year-run'), b2 = await barAt('#letter');
  await g.evaluate(() => document.querySelector('.help [data-cta]').scrollIntoView({ block: 'center' })); await g.waitForTimeout(500);
  const b3 = await g.evaluate(() => document.querySelector('[data-sbar]').classList.contains('is-on'));
  ok('the bar steps aside where a call is on screen', !b0 && b1 && !b2 && !b3, { b0, b1, b2, b3 });

  // 15 the hero call lands on the letter with the first field ready
  await g.evaluate(() => scrollTo(0, 0)); await g.waitForTimeout(300);
  if (plant) await g.evaluate(() => document.querySelector('[data-hero-cta]').setAttribute('href', '#nights'));
  await g.click('[data-hero-cta]'); await g.waitForTimeout(1600);
  const s15 = await g.evaluate(() => ({ hash: location.hash, top: Math.round(document.getElementById('letter').getBoundingClientRect().top), focus: document.activeElement && document.activeElement.name }));
  ok('hero call lands on the letter', s15.hash === '#letter' && Math.abs(s15.top - 68) < 80 && s15.focus === 'first', s15);

  // 16 her film, nothing loaded before it's near, playing only on screen
  const fctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const f = await fctx.newPage(); const req = [];
  f.on('request', r => { if (/night\.(webm|mp4)/.test(r.url())) req.push(r.url()); });
  await f.goto(U, { waitUntil: 'networkidle' }); await f.waitForTimeout(800);
  const before = req.length;
  if (plant) await f.evaluate(() => { const v = document.querySelector('[data-film] video'); v.preload = 'auto'; v.load(); });
  await f.waitForTimeout(plant ? 900 : 10);
  const before2 = req.length;
  await f.evaluate(() => document.querySelector('[data-film]').scrollIntoView({ block: 'center' })); await f.waitForTimeout(2500);
  const fv = await f.evaluate(() => { const v = document.querySelector('[data-film] video'); return { playing: !v.paused, cls: document.querySelector('[data-film]').className, t: v.currentTime }; });
  await f.evaluate(() => scrollTo(0, 0)); await f.waitForTimeout(800);
  const fp = await f.evaluate(() => document.querySelector('[data-film] video').paused);
  ok('film waits, plays in view, pauses out of view', before === 0 && before2 === 0 && req.length > 0 && fv.playing && /is-playing/.test(fv.cls) && fp, { before, before2, req: req.length, fv, fp });

  // 17 reduced motion, no film, the day already red, the drawing complete
  const rctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const r = await rctx.newPage(); const rreq = []; const rerr = [];
  r.on('request', x => { if (/night\.(webm|mp4)/.test(x.url())) rreq.push(x.url()); }); r.on('pageerror', e => rerr.push(e.message));
  await r.goto(U, { waitUntil: 'networkidle' }); await r.waitForTimeout(600);
  if (plant) await r.evaluate(() => { document.documentElement.classList.remove('rm'); document.getElementById('day').classList.remove('is-bloomed'); });
  for (let y = 0; y < 14000; y += 900) { await r.evaluate(y => scrollTo(0, y), y); await r.waitForTimeout(60); }
  await r.waitForTimeout(500);
  const rm = await r.evaluate(() => ({ rm: document.documentElement.classList.contains('rm'), live: document.getElementById('year').classList.contains('is-live'), bloomed: document.getElementById('day').classList.contains('is-bloomed'), canvas: !!document.querySelector('canvas.bloom'), drawn: window.HIH.drawn, env: document.querySelector('[data-env]').className, playing: !document.querySelector('[data-film] video').paused }));
  ok('reduced motion is complete and still', rm.rm && !rm.live && rm.bloomed && !rm.canvas && rm.drawn && rm.drawn.k === rm.drawn.N && /is-open/.test(rm.env) && !rm.playing && rreq.length === 0 && rerr.length === 0, { rm, rreq: rreq.length, rerr });

  // 18 nothing sticks out at nine widths, and the peeled sticker never sits on the card's words
  const o = await b.newPage(); await o.goto(U, { waitUntil: 'networkidle' }); await o.waitForTimeout(3000);
  const ow = [], seal = [];
  for (const w of [320, 360, 390, 414, 600, 768, 1024, 1280, 1920]) {
    await o.setViewportSize({ width: w, height: 900 }); await o.waitForTimeout(350);
    ow.push([w, await o.evaluate(() => document.documentElement.scrollWidth - innerWidth)]);
    seal.push([w, await o.evaluate(() => { const s = document.querySelector('[data-env] .seal').getBoundingClientRect(); return [...document.querySelectorAll('[data-env] .card-in > *')].some(e => { const r = e.getBoundingClientRect(); return !(r.right < s.left || r.left > s.right || r.bottom < s.top || r.top > s.bottom); }); })]);
  }
  if (plant) { await o.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'width:3000px;height:2px'; document.body.appendChild(d); }); ow.push(['plant', await o.evaluate(() => document.documentElement.scrollWidth - innerWidth)]); }
  ok('no overflow at nine widths', ow.every(x => x[1] <= 0), ow.filter(x => x[1] > 0));
  if (plant) await o.evaluate(() => { const c = document.querySelector('[data-env] .card-d').getBoundingClientRect(), s = document.querySelector('[data-env] .seal'), r = s.getBoundingClientRect(); const dx = (c.left + c.width / 2) - (r.left + r.width / 2), dy = (c.top + c.height / 2) - (r.top + r.height / 2); s.style.transition = 'none'; s.style.transform = 'translate(' + dx + 'px,' + dy + 'px) ' + getComputedStyle(s).transform; });
  const sealPlant = plant ? await o.evaluate(() => { const s = document.querySelector('[data-env] .seal').getBoundingClientRect(); return [...document.querySelectorAll('[data-env] .card-in > *')].some(e => { const r = e.getBoundingClientRect(); return !(r.right < s.left || r.left > s.right || r.bottom < s.top || r.top > s.bottom); }); }) : false;
  ok('the sticker never sits on the card', seal.every(x => !x[1]) && !sealPlant, { seal, sealPlant });

  // 19 the notes on the drawing never sit on each other, at 1440 and 390
  const nt = [];
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const n = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await n.goto(U, { waitUntil: 'networkidle' });
    await n.evaluate(() => { const r = document.querySelector('.year-run'); scrollTo(0, r.getBoundingClientRect().top + scrollY + r.offsetHeight - innerHeight - 4); }); await n.waitForTimeout(1000);
    if (plant) await n.evaluate(() => { const l = document.querySelectorAll('[data-note]'); l[1].style.cssText += ';--x:' + l[0].style.getPropertyValue('--x') + ';--y:' + l[0].style.getPropertyValue('--y') + ';--tx:' + l[0].style.getPropertyValue('--tx'); l[1].className = l[0].className; });
    nt.push([w, await n.evaluate(() => { const r = [...document.querySelectorAll('[data-note].is-on span')].map(s => s.getBoundingClientRect()); let hit = 0; for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) { const a = r[i], c = r[j]; if (!(a.right <= c.left || a.left >= c.right || a.bottom <= c.top || a.top >= c.bottom)) hit++; } return { n: r.length, hit, out: r.filter(x => x.left < 0 || x.right > innerWidth).length }; })]);
  }
  ok('notes never overlap or leave the screen', nt.every(x => x[1].n === D.details.length && x[1].hit === 0 && x[1].out === 0), nt);

  // 20 the phone menu opens and Escape closes it
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await m.goto(U, { waitUntil: 'networkidle' }); await m.waitForTimeout(300);
  if (plant) await m.evaluate(() => document.querySelector('.mbtn').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await m.click('.mbtn'); await m.waitForTimeout(250);
  const mo = await m.evaluate(() => ({ exp: document.querySelector('.mbtn').getAttribute('aria-expanded'), links: [...document.querySelectorAll('#mnav a')].filter(a => a.getBoundingClientRect().height > 0).map(a => a.getAttribute('href')), focus: document.activeElement.getAttribute('href') }));
  await m.keyboard.press('Escape'); await m.waitForTimeout(200);
  const mc = await m.evaluate(() => ({ exp: document.querySelector('.mbtn').getAttribute('aria-expanded'), shown: [...document.querySelectorAll('#mnav a')].filter(a => a.getBoundingClientRect().height > 0).length, focus: document.activeElement.className }));
  ok('phone menu opens and closes', mo.exp === 'true' && JSON.stringify(mo.links) === JSON.stringify(['#year', '#nights', '#elise', '#letter']) && mo.focus === '#year' && mc.exp === 'false' && mc.shown === 0 && mc.focus === 'mbtn', { mo, mc });

  // 21 the first screen carries the question, the date and the call, on a phone and a laptop
  const fs1 = [];
  for (const [w, h] of [[390, 844], [1440, 900], [360, 640]]) {
    const n = await (await b.newContext({ viewport: { width: w, height: h } })).newPage(); await n.goto(U, { waitUntil: 'networkidle' }); await n.waitForTimeout(400);
    if (plant && w === 390) await n.addStyleTag({ content: '.hero-act{margin-top:900px}' });
    fs1.push([w, h, await n.evaluate(() => { const v = s => { const r = document.querySelector(s).getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }; return { h1: v('#h-when'), date: v('[data-o="dateBig"]'), cta: v('[data-hero-cta]') }; })]);
  }
  ok('the first screen holds the question, the date and the call', fs1.filter(x => x[0] !== 360).every(x => x[2].h1 && x[2].date && x[2].cta), fs1);

  // 22 her red spreads through the paper as the day arrives, a fresh page, decoration started by a real wheel
  const rb = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  if (plant) await rb.addInitScript(() => ['scroll', 'wheel', 'pointermove', 'touchstart', 'keydown'].forEach(t => window.addEventListener(t, e => e.stopImmediatePropagation(), true)));   // the art loop never starts, as when a name collision ate its start
  await rb.goto(U, { waitUntil: 'networkidle' }); await rb.waitForTimeout(500);
  await rb.mouse.move(700, 400); await rb.mouse.wheel(0, 40); await rb.waitForTimeout(300);
  const inkAt = async f => { await rb.evaluate(f => { const d = document.getElementById('day'); scrollTo(0, d.getBoundingClientRect().top + scrollY - innerHeight * f); }, f); await rb.waitForTimeout(900); return rb.evaluate(() => { const c = document.querySelector('canvas.bloom'), x = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let t = 0; for (let i = 3; i < x.length; i += 4) if (x[i] === 0) t++; return +(t / (c.width * c.height)).toFixed(3); }); };
  const i1 = await inkAt(0.9), i2 = await inkAt(0.55), i3 = await inkAt(0.1);
  const bl = await rb.evaluate(() => document.getElementById('day').classList.contains('is-bloomed') && window.HIH.artStarted());
  ok('the red spreads as the day arrives', i1 < 0.15 && i2 > 0.2 && i2 < 0.85 && i3 > 0.95 && bl, { i1, i2, i3, bl });

  ok('no script errors', errs.length === 0, errs.slice(0, 3));
  await b.close();
  for (const x of res) console.log((x.p ? 'PASS ' : 'FAIL ') + x.n + (x.p && !plant ? '' : '  ' + JSON.stringify(x.info).slice(0, 600)));
  console.log(res.filter(x => x.p).length + ' of ' + res.length + ' pass' + (plant ? ' (plant mode, every check but the script error check should FAIL)' : ''));
})();
