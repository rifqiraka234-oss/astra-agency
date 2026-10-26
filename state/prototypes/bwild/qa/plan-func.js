// BWILD plan functional checks. usage: node plan-func.js <base url> [plant]
// With "plant", each check gets a fault first and must FAIL, so a pass in normal mode means the check can see.
const { chromium } = require('playwright');
const fs = require('fs');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const E = JSON.parse(fs.readFileSync(__dirname + '/expect.json'));
const P = JSON.parse(fs.readFileSync(__dirname + '/../build-plan/data/plan.json'));
const res = []; const ok = (n, p, info) => res.push({ n, p: !!p, info });
(async () => {
  const b = await chromium.launch(); const errs = [];
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(base + '/', { waitUntil: 'networkidle' });

  // 1 the route switches, every stop from the data, in order
  if (plant) await p.evaluate(() => document.querySelector('[data-rt="new"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  const got = {};
  for (const k of ['tab', 'new', 'bar']) {
    await p.click(`[data-rt="${k}"]`); await p.waitForTimeout(150);
    got[k] = await p.evaluate(() => ({ stops: [...document.querySelectorAll('[data-rail] .rs b')].map(x => x.textContent), sum: document.querySelector('[data-sum]').textContent, pressed: document.querySelector('[data-rt][aria-pressed=true]').getAttribute('data-rt') }));
  }
  const want = k => P.route.routes[k].stops.map(s => s.t);
  ok('the route shows each start, stops and summary from the data', ['tab', 'new', 'bar'].every(k => JSON.stringify(got[k].stops) === JSON.stringify(want(k)) && got[k].sum === P.route.routes[k].sum && got[k].pressed === k), got);

  // 2 the dark count matches astral, two cities and two times
  await p.evaluate(() => document.querySelector('#dark').scrollIntoView());
  if (plant) await p.evaluate(() => { const o = document.querySelector('[data-dark] [data-o="n"]'); new MutationObserver(() => { if (o.textContent !== '1') o.textContent = '1'; }).observe(o, { childList: true, characterData: true, subtree: true }); o.textContent = '1'; });
  const count = (city, t) => E[city].slice(0, 365).filter(r => t < r[0] || t > r[1]).length;
  const setRun = async (city, t) => { await p.selectOption('[data-c]', city); await p.evaluate(t => { const r = document.querySelector('[data-t]'); r.value = t; r.dispatchEvent(new Event('input', { bubbles: true })); }, t); await p.waitForTimeout(100);
    return p.evaluate(() => ({ n: +document.querySelector('[data-dark] [data-o="n"]').textContent, lit: document.querySelectorAll('[data-strip] i.on').length, t: document.querySelector('[data-dark] [data-o="t"]').textContent })); };
  const g1 = await setRun('geneva', 390), g2 = await setRun('london', 1170), g3 = await setRun('stockholm', 600);
  const w = [count('geneva', 390), count('london', 1170), count('stockholm', 600)];
  ok('dark runs counted like astral, strip agrees', Math.abs(g1.n - w[0]) <= 2 && Math.abs(g2.n - w[1]) <= 2 && Math.abs(g3.n - w[2]) <= 2 && g1.n === g1.lit && g2.n === g2.lit && g2.t === '19.30', { got: [g1, g2, g3], want: w });

  // 3 the built frame follows the caption on screen
  if (plant) await p.addStyleTag({ content: '.bf-i{opacity:0!important}.bf-i:first-child{opacity:1!important}' });
  const frames = [];
  for (const i of [0, 2, 4]) {
    await p.evaluate(i => { const l = document.querySelectorAll('.bc li')[i]; scrollTo(0, l.getBoundingClientRect().top + scrollY - innerHeight / 2 + 40); }, i); await p.waitForTimeout(700);
    frames.push(await p.evaluate(() => { const v = [...document.querySelectorAll('.bf-i')].map(f => +getComputedStyle(f).opacity); return v.indexOf(Math.max(...v)); }));
  }
  ok('the built frame follows the caption', JSON.stringify(frames) === '[0,2,4]', frames);

  // 4 the cost adds up and every link to the prototype is the live one
  if (plant) await p.evaluate(() => { document.querySelector('.co-split b').textContent = '€1,200'; });
  const c4 = await p.evaluate(() => ({ split: [...document.querySelectorAll('.co-split b')].map(x => +x.textContent.replace(/\D/g, '')), h: document.querySelector('#c-h').textContent, links: [...document.querySelectorAll('a[href*="prototype"]')].map(a => a.getAttribute('href')) }));
  ok('the cost halves add up to the price in the heading', c4.split[0] + c4.split[1] === P.cost.price && c4.h.includes('€' + P.cost.price.toLocaleString('en-GB')) && c4.links.length >= 3 && c4.links.every(h => h.startsWith('https://astra-bwild-prototype.netlify.app')), c4);

  // 5 the cover line is the same streak the data gives
  const g = E.geneva.slice(0, 365).map(r => 390 < r[0] || 390 > r[1]); let best = 0, cur = 0; g.forEach(x => { cur = x ? cur + 1 : 0; best = Math.max(best, cur); });
  if (plant) await p.evaluate(() => { const li = document.querySelectorAll('.found li p')[2]; li.textContent = li.textContent.replace(/\d+ runs/, '99 runs'); });
  const cover = await p.evaluate(() => document.querySelectorAll('.found li p')[2].textContent);
  ok('the cover streak matches astral', cover.includes(best + ' runs in a row'), { cover, best });

  // 6 no script errors, nothing undecoded once scrolled, no overflow at nine widths
  ok('no script errors', errs.length === 0, errs.slice(0, 3));
  const q = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const ow = [];
  for (const wd of [320, 360, 390, 414, 600, 768, 1024, 1280, 1920]) {
    await q.setViewportSize({ width: wd, height: 900 }); await q.goto(base + '/', { waitUntil: 'networkidle' });
    if (plant && wd === 1280) await q.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'width:3000px;height:2px'; document.body.appendChild(d); });
    const H = await q.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 800) { await q.evaluate(y => scrollTo(0, y), y); await q.waitForTimeout(30); }
    const o = await q.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) ow.push([wd, o]);
  }
  await q.waitForTimeout(500);
  const und = await q.evaluate(() => [...document.images].filter(i => i.naturalWidth === 0).length);
  ok('no overflow at nine widths, every image decoded', ow.length === 0 && (und === 0 || plant), { ow, und });
  await b.close();
  for (const x of res) console.log((x.p ? 'PASS ' : 'FAIL ') + x.n + (x.p && !plant ? '' : '  ' + JSON.stringify(x.info).slice(0, 300)));
  console.log(res.filter(x => x.p).length + ' of ' + res.length + ' pass' + (plant ? ' (plant mode, every check but the script error check should FAIL)' : ''));
})();
