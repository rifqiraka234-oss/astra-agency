// BWILD v2 functional checks. usage: node bwild-func.js <base url> [plant]. v1's are kept in bwild-func-v1.js.
// Every daylight number is worked out independently by qa/expect.py with astral, never by the page's own code.
// With "plant", each check gets a fault first and must FAIL, so a pass in normal mode means the check can see.
const { chromium } = require('playwright');
const fs = require('fs');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const X = JSON.parse(fs.readFileSync(__dirname + '/expect.json', 'utf8'));
const D = JSON.parse(fs.readFileSync(__dirname + '/../build/data/site.json', 'utf8'));
const res = []; const ok = (n, p, info) => res.push({ n, p: !!p, info });
const hm = m => { m = Math.round(m); return String(Math.floor(m / 60)).padStart(2, '0') + '.' + String(m % 60).padStart(2, '0'); };
const dark = (city, t) => X[city].filter(r => t < r[0] || t > r[1]).length;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
  const txt = s => p.evaluate(s => document.querySelector(s).textContent.trim(), s);

  // 1 the hero is the first input, and today's sunrise in the line is astral's to the minute
  const g0 = X.geneva[0];
  const l1 = await txt('[data-o="skyline"]');
  if (plant) await p.evaluate(() => document.querySelector('[data-pick="night"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('[data-pick="night"]'); await p.waitForTimeout(300);
  const h1 = await p.evaluate(() => ({ t: document.querySelector('[data-o="time"]').textContent, pressed: document.querySelector('[data-pick="night"]').getAttribute('aria-pressed'), line: document.querySelector('[data-o="skyline"]').textContent }));
  const riseOk = [hm(g0[0] - 1), hm(g0[0]), hm(g0[0] + 1)].some(s => l1.includes('rises at ' + s));
  const setOk = [hm(g0[1] - 1), hm(g0[1]), hm(g0[1] + 1)].some(s => h1.line.includes('sets at ' + s));
  ok('hero pick writes the run, sun times match astral', h1.t === hm(D.picks.night) && h1.pressed === 'true' && riseOk && setOk, { l1, h1, want: [hm(g0[0]), hm(g0[1])] });

  // 2 the clock steps and takes the keyboard, where it is on screen, after the stars come out
  await p.evaluate(() => scrollTo(0, document.querySelector('#dark').offsetTop + (document.querySelector('#dark').offsetHeight - innerHeight) * .9)); await p.waitForTimeout(500);
  if (plant) await p.evaluate(() => document.querySelector('[data-dt="5"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('[data-dt="5"]'); await p.focus('[data-time]'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Shift+ArrowLeft'); await p.waitForTimeout(150);
  const c2 = await p.evaluate(() => ({ t: document.querySelector('[data-o="time"]').textContent, now: document.querySelector('[data-time]').getAttribute('aria-valuenow') }));
  ok('clock steps by 5 and by 30', c2.t === hm(D.picks.night + 5 + 5 - 30) && +c2.now === D.picks.night - 20, c2);

  // 3 the year chart's count is astral's, for Geneva and after switching city
  await p.evaluate(() => document.querySelector('#dark').scrollIntoView()); await p.waitForTimeout(300);
  const t3 = D.picks.night - 20;
  const n3 = +(await txt('[data-o="darkn"]'));
  if (plant) await p.evaluate(() => { const o = document.querySelector('[data-o="darkn"]'); new MutationObserver(() => { if (o.textContent !== '1') o.textContent = '1'; }).observe(o, { childList: true, characterData: true, subtree: true }); o.textContent = '1'; });
  await p.selectOption('[data-city]', 'london'); await p.waitForTimeout(300);
  const n3b = +(await txt('[data-o="darkn"]')), w3 = [dark('geneva', t3), dark('london', t3)];
  ok('dark runs counted like astral, two cities', Math.abs(n3 - w3[0]) <= 2 && Math.abs(n3b - w3[1]) <= 2 && n3 !== n3b, { got: [n3, n3b], want: w3 });

  // 4 the clock is a control, dragging it moves the run everywhere, and the stars lit match the count
  await p.evaluate(() => scrollTo(0, document.querySelector('#dark').offsetTop + (document.querySelector('#dark').offsetHeight - innerHeight) * .9)); await p.waitForTimeout(600);
  const box = await p.evaluate(() => { const r = document.querySelector('[data-time]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  const t4a = await p.evaluate(() => document.querySelector('[data-time]').getAttribute('aria-valuenow'));
  if (plant) await p.evaluate(() => document.querySelector('[data-time]').addEventListener('pointerdown', e => e.stopImmediatePropagation(), true));
  await p.mouse.move(box.x, box.y); await p.mouse.down(); await p.mouse.move(box.x - 40, box.y, { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(250);
  const s4 = await p.evaluate(() => ({ now: +document.querySelector('[data-time]').getAttribute('aria-valuenow'), t: document.querySelector('[data-o="time"]').textContent, n: +document.querySelector('[data-o="darkn"]').textContent, lit: document.querySelectorAll('[data-stars] circle.on').length, bar: document.querySelector('[data-o="sbar"]').textContent, run: document.querySelector('[data-o="runline"]').textContent }));
  ok('clock drag moves the run, stars, bar and form agree', s4.now === +t4a - 60 && Math.abs(s4.n - dark('london', s4.now)) <= 2 && s4.lit === s4.n && s4.bar.includes(s4.t) && s4.run.includes(s4.t) && s4.run.includes('London'), { t4a, s4, want: dark('london', s4.now) });

  // 4b a star tapped gives its own day, and that day's sunrise is astral's
  await p.evaluate(() => scrollTo(0, document.querySelector('#dark').offsetTop + (document.querySelector('#dark').offsetHeight - innerHeight) * .9)); await p.waitForTimeout(700);
  if (plant) await p.evaluate(() => ['click', 'pointerover'].forEach(t => document.querySelector('[data-stars]').addEventListener(t, e => e.stopImmediatePropagation(), true)));
  const pick = await p.evaluate(() => { const c = [...document.querySelectorAll('[data-stars] circle.on')]; const s = c[Math.floor(c.length / 3)]; const r = s.getBoundingClientRect(); return { i: [...document.querySelectorAll('[data-stars] circle')].indexOf(s), x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.click(pick.x, pick.y); await p.waitForTimeout(250);
  const tip = await p.evaluate(() => ({ on: document.querySelector('[data-tip]').classList.contains('on'), t: document.querySelector('[data-tip]').textContent, hit: [...document.querySelectorAll('[data-stars] circle')].findIndex(c => c.classList.contains('hit')) }));
  const row = X.london[tip.hit < 0 ? pick.i : tip.hit], dd = new Date(row[2] + 'T12:00:00Z'), MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayOk = tip.t.includes(dd.getUTCDate() + ' ' + MON[dd.getUTCMonth()]), sunOk = [-1, 0, 1].some(k => tip.t.includes(hm(row[0] + k)) || tip.t.includes(hm(row[1] + k)));
  ok('a star tapped shows its day and astral\'s sun time', tip.on && dayOk && sunOk, { pick, tip, want: row });
  await p.selectOption('[data-city]', 'geneva'); await p.waitForTimeout(200);

  // 5 the headlights, the flare at the BFU's 140 m, the TCS's 112 m, the call at the end
  const at = async d => { await p.evaluate(d => { const s = document.querySelector('#seen'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * (300 - d) / 280); }, d); await p.waitForTimeout(400);
    return p.evaluate(() => { const s = document.querySelector('#seen'); return { d: +document.querySelector('[data-o="dist"]').textContent, flare: +getComputedStyle(s.querySelector('.fl-stick')).getPropertyValue('--flare'), on: [...s.querySelectorAll('.caps li.on')].map(l => l.getAttribute('data-at')) }; }); };
  if (plant) await p.evaluate(() => { const s = document.querySelector('#seen .fl-stick'); const st = s.style; const set = st.setProperty.bind(st); st.setProperty = (k, v) => set(k, k === '--flare' ? '0' : v); });
  const a = await at(200), bq = await at(130), cq = await at(100), dq = await at(20);
  ok('headlights flare at 140 m, captions in order', a.flare < .3 && bq.flare >= .7 && Math.abs(a.d - 200) <= 3 && JSON.stringify([a.on, bq.on, cq.on, dq.on]) === JSON.stringify([['300'], ['140'], ['112'], ['40']]), { a, bq, cq, dq });

  // 6 the bar carries the run, leads with the price, and steps aside where another reserve call is on screen
  const bar = async () => p.evaluate(() => document.querySelector('[data-sbar]').classList.contains('on'));
  const atEnd = await bar();
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); const atTop = await bar();
  if (plant) await p.evaluate(() => { const s = document.querySelector('[data-sbar]'); new MutationObserver(() => { if (s.classList.contains('on')) s.classList.remove('on'); }).observe(s, { attributes: true }); });
  await p.evaluate(() => document.querySelector('#vest').scrollIntoView()); await p.waitForTimeout(300); const mid = await bar();
  await p.evaluate(() => document.querySelector('[data-rs] button[type=submit]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300); const atRs = await bar();
  const lead = (await txt('[data-o="sbar"]')).startsWith('€1 today');
  ok('the bar shows mid page and steps aside', !atTop && mid && !atRs && !atEnd && lead, { atTop, mid, atRs, atEnd, lead });
  await p.evaluate(() => { const e = document.querySelectorAll('[data-seg]')[2]; scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight / 2); }); await p.waitForTimeout(400);
  if (plant) await p.evaluate(() => document.querySelector('#adventure').setAttribute('data-goal', 'reserve')), await p.evaluate(() => scrollBy(0, 2)), await p.waitForTimeout(300);
  const g6 = await p.evaluate(() => ({ on: document.querySelector('[data-sbar]').classList.contains('on'), buy: !document.querySelector('[data-sbg="buy"]').hidden, res: !document.querySelector('[data-sbg="reserve"]').hidden }));
  ok('in the orange chapter the bar offers the Adventure Vest', g6.on && g6.buy && !g6.res, g6);

  // 7 reserving, a bad email is caught, then the bib prints the run
  if (plant) await p.evaluate(() => document.querySelector('[data-rs]').addEventListener('submit', e => { e.preventDefault(); e.stopImmediatePropagation(); document.querySelector('[data-bib]').classList.add('paid'); }, true));
  await p.fill('[data-rs] input[name=email]', 'not an email'); await p.click('[data-rs] button[type=submit]'); await p.waitForTimeout(150);
  const bad = await p.evaluate(() => ({ err: !document.querySelector('[data-rs] [data-err]').hidden, paid: document.querySelector('[data-bib]').classList.contains('paid') }));
  if (plant) await p.evaluate(() => document.querySelector('[data-rs]').addEventListener('submit', e => { e.preventDefault(); e.stopImmediatePropagation(); }, true));
  await p.fill('[data-rs] input[name=email]', 'morgan@example.com'); await p.click('[data-rs] button[type=submit]'); await p.waitForTimeout(400);
  const s7 = await p.evaluate(() => ({ paid: document.querySelector('[data-bib]').classList.contains('paid'), n: document.querySelector('[data-o="bibn"]').textContent, run: document.querySelector('[data-o="bibrun"]').textContent, form: document.querySelector('[data-o="runline"]').textContent, done: document.querySelector('.bib-w [data-done]').textContent }));
  ok('bad email caught before paying', bad.err && !bad.paid, bad);
  ok('the bib prints the run on paying', s7.paid && /^\d{4}$/.test(s7.n) && s7.n !== '0000' && s7.run === s7.form && s7.done.includes('morgan@example.com') && s7.done.includes('nothing is charged'), s7);

  // 8 the countdown counts to the example date
  const cd = await p.evaluate(() => ['cdd', 'cdh', 'cdm', 'cds'].map(k => +document.querySelector('[data-o="' + k + '"]').textContent));
  const left = Math.floor((new Date(D.luminous.exampleLaunch).getTime() - Date.now()) / 1000), got8 = cd[0] * 86400 + cd[1] * 3600 + cd[2] * 60 + cd[3];
  if (plant) await p.evaluate(() => { document.querySelector('[data-cd]').setAttribute('data-at', '2030-01-01T00:00:00Z'); }), await p.waitForTimeout(1200);
  const cd2 = plant ? await p.evaluate(() => ['cdd', 'cdh', 'cdm', 'cds'].map(k => +document.querySelector('[data-o="' + k + '"]').textContent)) : cd;
  const got8b = cd2[0] * 86400 + cd2[1] * 3600 + cd2[2] * 60 + cd2[3];
  ok('countdown to the example date', Math.abs(got8b - left) <= 3, { got: got8b, want: left });

  // 9 the Adventure Vest cart
  await p.evaluate(() => document.querySelector('#adventure').scrollIntoView()); await p.waitForTimeout(200);
  if (plant) await p.evaluate(() => document.querySelector('[data-add]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('[data-add]'); await p.waitForTimeout(250);
  const c9 = await p.evaluate(() => ({ open: !document.querySelector('[data-cart]').hidden, n: document.querySelector('[data-o="cartn"]').textContent, body: document.querySelector('[data-cartbody]').textContent }));
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  const c9b = await p.evaluate(() => ({ closed: document.querySelector('[data-cart]').hidden, focus: document.activeElement.hasAttribute('data-add') }));
  ok('cart adds the vest at its price, Esc closes', c9.open && c9.n === '1' && c9.body.includes('€' + D.adventure.price / 100) && c9b.closed && c9b.focus, { c9, c9b });

  // 9b their claw opens onto the film, and their bear onto the Swiss Peaks
  if (plant) await p.evaluate(() => { for (const s of ['[data-claw]', '[data-bearwin]']) { const st = document.querySelector(s).style, set = st.setProperty.bind(st); st.setProperty = (k, v) => set(k, /--(mh|bw)/.test(k) ? '100px' : v); } });
  const grow = async (sel, el, k, f) => { await p.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY + (e.offsetHeight - innerHeight) * f); }, [sel, f]); await p.waitForTimeout(300); return p.evaluate(([el, k]) => parseFloat(document.querySelector(el).style.getPropertyValue(k)), [el, k]); };
  const c0 = await grow('#run', '[data-claw]', '--mh', 0), c1 = await grow('#run', '[data-claw]', '--mh', .7);
  const w0 = await grow('.st-pin', '[data-bearwin]', '--bw', 0), w1 = await grow('.st-pin', '[data-bearwin]', '--bw', .85);
  ok('the claw and the bear open as you scroll', c1 > c0 * 20 && w1 > w0 * 6, { c0, c1, w0, w1 });

  // 10 their films wait until they're on screen, on a fresh page
  const f = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await f.goto(base + '/', { waitUntil: 'networkidle' }); await f.waitForTimeout(400);
  if (plant) await f.evaluate(() => document.querySelectorAll('video[data-film] source[data-src]').forEach(s => { s.src = s.getAttribute('data-src'); }));
  const top10 = await f.evaluate(() => [...document.querySelectorAll('video[data-film]')].filter(v => v.querySelector('source[src]')).length);
  await f.evaluate(() => document.querySelector('#vest').scrollIntoView()); await f.waitForTimeout(900);
  const vest10 = await f.evaluate(() => [...document.querySelectorAll('#vest video')].filter(v => v.querySelector('source[src]')).length);
  ok('films load only once seen', top10 === 0 && vest10 >= 3, { top10, vest10 });
  ok('no script errors', errs.length === 0, errs.slice(0, 3));

  // 10b the claw's film plays once the page has loaded, the sky starts and then rests under the chapters that paint their own ground
  const hf = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  if (plant) await hf.addInitScript(() => { const pl = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function () { return this.hasAttribute('data-hero-film') ? Promise.resolve() : pl.call(this); }; window.requestIdleCallback = () => 0; window.addEventListener('load', () => { document.documentElement.classList.remove('webgl'); }); });
  await hf.goto(base + '/', { waitUntil: 'load' }); await hf.waitForTimeout(2500);
  const h10 = await hf.evaluate(() => { const v = document.querySelector('[data-hero-film]'); return { paused: v.paused, t: +v.currentTime.toFixed(2), src: (v.currentSrc || '').split('/').pop(), webgl: document.documentElement.classList.contains('webgl'), sky: window.__sky && window.__sky.state() }; });
  await hf.evaluate(() => document.querySelectorAll('[data-seg]')[3].scrollIntoView({ block: 'center' })); await hf.waitForTimeout(500);
  const r10 = await hf.evaluate(() => window.__sky && window.__sky.state());
  await hf.evaluate(() => document.querySelector('#dark').scrollIntoView()); await hf.waitForTimeout(500);
  const w10 = await hf.evaluate(() => window.__sky && window.__sky.state());
  ok('the hero film plays after load, the sky rests under painted chapters', !h10.paused && h10.t > 0 && h10.webgl && h10.sky && h10.sky.running && r10 && r10.resting && w10 && !w10.resting && w10.running, { h10, r10, w10 });

  // 11 the phone menu reaches every chapter
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await m.goto(base + '/', { waitUntil: 'networkidle' });
  if (plant) await m.evaluate(() => document.querySelector('.mbtn').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await m.click('.mbtn'); await m.waitForTimeout(200);
  const mo = await m.evaluate(() => [...document.querySelectorAll('#mnav a')].filter(a => a.getBoundingClientRect().height > 0).map(a => a.getAttribute('href')));
  await m.keyboard.press('Escape'); await m.waitForTimeout(150);
  const mc = await m.evaluate(() => document.querySelector('.mbtn').getAttribute('aria-expanded'));
  ok('phone menu opens and closes', mo.length === 4 && mo.includes('#adventure') && mc === 'false', { mo, mc });
  if (plant) await m.addStyleTag({ content: '[data-hero-cta]{position:relative;top:1400px}' });
  const heroCta = await m.evaluate(() => { const a = document.querySelector('[data-hero-cta]').getBoundingClientRect(); return a.bottom <= innerHeight && a.top > 0; });
  ok('the phone first screen carries the reserve call', heroCta, heroCta);

  // 12 reduced motion keeps every caption and plays no film
  const r = await (await b.newContext({ viewport: { width: 1280, height: 860 }, reducedMotion: 'reduce' })).newPage();
  await r.goto(base + '/', { waitUntil: 'networkidle' }); await r.evaluate(() => scrollTo(0, document.body.scrollHeight)); await r.waitForTimeout(500);
  if (plant) await r.addStyleTag({ content: '.caps li:nth-child(2){display:none!important}' });
  const rr = await r.evaluate(() => ({ caps: [...document.querySelectorAll('.caps li')].filter(l => l.getBoundingClientRect().height > 0).length, playing: [...document.querySelectorAll('video')].filter(v => !v.paused).length }));
  ok('reduced motion, every caption shown, no film plays', rr.caps === 4 && rr.playing === 0, rr);

  // 13 nothing sticks out at nine widths
  const ow = [];
  const q = await b.newPage(); await q.goto(base + '/', { waitUntil: 'load' });
  for (const w of [320, 360, 390, 414, 600, 768, 1024, 1280, 1920]) { await q.setViewportSize({ width: w, height: 900 }); await q.waitForTimeout(200); ow.push([w, await q.evaluate(() => document.documentElement.scrollWidth - innerWidth)]); }
  if (plant) { await q.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'width:3000px;height:2px'; document.body.appendChild(d); }); ow.push(['plant', await q.evaluate(() => document.documentElement.scrollWidth - innerWidth)]); }
  ok('no overflow at nine widths', ow.every(x => x[1] <= 0), ow.filter(x => x[1] > 0));
  await b.close();
  for (const x of res) console.log((x.p ? 'PASS ' : 'FAIL ') + x.n + (x.p && !plant ? '' : '  ' + JSON.stringify(x.info).slice(0, 400)));
  console.log(res.filter(x => x.p).length + ' of ' + res.length + ' pass' + (plant ? ' (plant mode, every check but the script error check should FAIL)' : ''));
})();
