// Fae Club plan, functional checks. usage: node plan-fae-func.js <base url> <plan.json> [plant]
// Every expected value is worked out here from data/plan.json, never read back from the page. With "plant", each check
// gets a fault planted first and must FAIL, so a pass means something. The script error check is the one that plants
// an error of its own as well.
const { chromium } = require('playwright');
const fs = require('fs');
const base = process.argv[2].replace(/\/$/, ''), D = JSON.parse(fs.readFileSync(process.argv[3], 'utf8')), plant = process.argv[4] === 'plant';
const gbp = p => '£' + (p / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const split3 = t => { const b = Math.floor(t / 3); return [t - 2 * b, b, b]; };
const fmtH = x => (Math.round(x * 10) / 10).toFixed(1).replace(/\.0$/, '');
const res = [];
const rec = (name, ok, info) => { res.push(ok); console.log((ok ? 'PASS ' : 'FAIL ') + name, JSON.stringify(info).slice(0, 300)); };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(base + '/', { waitUntil: 'networkidle' });

  // 1 to 4, the route in each of its four states
  const combos = [['3', 't', 't3'], ['f', 't', 'tf'], ['f', 'n', 'nf'], ['3', 'n', 'n3']];
  for (const [pay, when, key] of combos) {
    await p.click(`[data-pay="${pay}"]`); await p.click(`[data-when="${when}"]`);
    if (plant) await p.evaluate(k => { const r = document.querySelector('[data-rail]'); if (k === 't3') r.lastElementChild.remove(); else if (k === 'tf') r.querySelector('.rs-x b').textContent = 'Wrong stop'; else if (k === 'nf') document.querySelector('[data-sum]').textContent = 'x'; else r.lastElementChild.className = 'rs'; }, key);
    const got = await p.evaluate(() => ({
      t: [...document.querySelectorAll('[data-rail] .rs')].map(li => li.querySelector('b').textContent),
      p: [...document.querySelectorAll('[data-rail] .rs')].map(li => li.querySelector('.rs-x > span').textContent),
      k: [...document.querySelectorAll('[data-rail] .rs')].map(li => li.className.replace('rs', '').trim()),
      sum: document.querySelector('[data-sum]').textContent,
      pay: document.querySelector('[data-pay][aria-pressed="true"]').getAttribute('data-pay'),
      when: document.querySelector('[data-when][aria-pressed="true"]').getAttribute('data-when')
    }));
    const want = D.route.routes[key];
    const ok = got.t.join('|') === want.stops.map(s => s.t).join('|') && got.p.join('|') === want.stops.map(s => s.p).join('|')
      && got.k.join('|') === want.stops.map(s => s.k || '').join('|') && got.sum === want.sum && got.pay === pay && got.when === when;
    rec('route ' + key, ok, { n: got.t.length, want: want.stops.length, sum: got.sum.slice(0, 40) });
  }

  // 5, the route's own claims add up, stops and stops that are hers
  {
    const t3 = D.route.routes.t3.stops, yours = t3.filter(s => s.k === 'you').length;
    const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    let sum = D.route.routes.t3.sum;
    if (plant) sum = sum.replace('Seven', 'Six');
    const ok = sum.toLowerCase().startsWith(words[t3.length] + ' stops, ' + words[yours] + ' of them yours') && D.route.routes.tf.sum.toLowerCase().startsWith(words[D.route.routes.tf.stops.length])
      && ['nf', 'n3'].every(k => D.route.routes[k].sum.toLowerCase().startsWith(words[D.route.routes[k].stops.length] + ' stops, none'));
    rec('route summaries match their stops', ok, { stops: t3.length, yours });
  }

  // 6, the price strip, every row's value and position
  await p.evaluate(() => document.querySelector('[data-price]').scrollIntoView());
  if (plant) await p.evaluate(() => { const r = document.querySelectorAll('.pr-r')[2]; r.querySelector('.pr-d').style.setProperty('--x', '0.9'); });
  await p.waitForTimeout(900);
  {
    const got = await p.evaluate(() => [...document.querySelectorAll('.pr-r')].map(r => {
      const t = r.querySelector('.pr-t').getBoundingClientRect(), d = r.querySelector('.pr-d').getBoundingClientRect();
      return { v: r.querySelector('[data-v]').childNodes[0].textContent.trim(), f: (d.left + d.width / 2 - t.left) / t.width };
    }));
    const ok = got.length === D.price.rows.length && got.every((g, i) => g.v === gbp(D.price.rows[i].full) && Math.abs(g.f - D.price.rows[i].full / 30000) < 0.01);
    rec('price rows, values and dot positions', ok, got.map(g => g.v + '@' + g.f.toFixed(3)));
  }

  // 7, the switch to pay in 3, worked out from the Fairytale Ball row
  {
    await p.click('[data-show="today"]'); await p.waitForTimeout(900);
    if (plant) await p.evaluate(() => { document.querySelector('[data-out]').textContent = document.querySelector('[data-out]').textContent.replace('59.79', '59.80'); });
    const us = D.price.rows.find(r => r.us), s = split3(us.full);
    const got = await p.evaluate(() => {
      const r = document.querySelector('.pr-r.us'), t = r.querySelector('.pr-t').getBoundingClientRect(), d = r.querySelector('.pr-d').getBoundingClientRect();
      return { v: r.querySelector('[data-v]').childNodes[0].textContent.trim(), out: document.querySelector('[data-out]').textContent, f: (d.left + d.width / 2 - t.left) / t.width };
    });
    const ok = s[0] + s[1] + s[2] === us.full && got.v === gbp(s[0]) && got.out.includes(gbp(s[0]) + ' today, then ' + gbp(s[1]) + ' and ' + gbp(s[2])) && Math.abs(got.f - s[0] / 30000) < 0.01;
    await p.click('[data-show="full"]'); await p.waitForTimeout(900);
    const back = await p.evaluate(() => document.querySelector('.pr-r.us [data-v]').textContent.trim());
    rec('pay in 3 switch, ' + s.map(gbp).join(' + '), ok && back === gbp(us.full), { got, back });
  }

  // 8, the hours, three settings
  {
    const cases = [[120, 7], [10, 1], [60, 1], [400, 20]];
    const out = []; let ok = true;
    for (const [o, m] of cases) {
      await p.evaluate(([o, m]) => { const a = document.getElementById('hr-o'), c = document.getElementById('hr-m'); a.value = o; c.value = m; a.dispatchEvent(new Event('input')); c.dispatchEvent(new Event('input')); }, [o, m]);
      if (plant && o === 60) await p.evaluate(() => { document.querySelector('[data-o="hu"]').textContent = 'hours'; });
      const g = await p.evaluate(() => ({ h: document.querySelector('[data-o="h"]').textContent, hu: document.querySelector('[data-o="hu"]').textContent, g: document.querySelector('[data-o="g"]').textContent, lit: document.querySelectorAll('.hr-wall i.on').length }));
      const h = fmtH(o * m / 60);
      const good = g.h === h && g.hu === (h === '1' ? 'hour' : 'hours') && g.g === String(o) && g.lit === Math.round(o / 10);
      ok = ok && good; out.push([o, m, g.h, g.hu, g.lit, good]);
    }
    rec('hours from orders and minutes', ok, out);
  }

  // 9, the built frames follow the captions
  {
    const n = D.built.shots.length, got = [];
    for (let i = 0; i < n; i++) {
      await p.evaluate(i => { const c = document.querySelectorAll('.bc li')[i]; scrollTo(0, c.getBoundingClientRect().top + scrollY - innerHeight * 0.45); }, i);
      await p.waitForTimeout(500);
      if (plant && i === 3) await p.evaluate(() => document.querySelectorAll('.bf-i').forEach(f => f.classList.remove('on')));
      got.push(await p.evaluate(() => [...document.querySelectorAll('.bf-i')].findIndex(f => f.classList.contains('on'))));
    }
    rec('built frames follow the captions', got.every((g, i) => g === i), got);
  }

  // 10, every image decoded after a full scroll
  {
    for (let y = 0; y < 40; y++) { await p.evaluate(() => scrollBy(0, innerHeight * 0.8)); await p.waitForTimeout(120); }
    if (plant) await p.evaluate(() => { const i = document.createElement('img'); i.src = '/media/nope.jpg'; i.alt = ''; document.querySelector('main').appendChild(i); });
    await p.waitForTimeout(800);
    const bad = await p.evaluate(() => [...document.images].filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.currentSrc || i.src));
    const n = await p.evaluate(() => document.images.length);
    rec('every image decoded', bad.length === 0 && n >= 20, { n, bad });
  }

  // 11, links to the prototype and the mail
  {
    if (plant) await p.evaluate(() => { document.querySelector('a[href*="astra-faeclub-prototype"]').href = 'https://example.com/'; });
    const g = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')));
    const proto = g.filter(h => /^https?:\/\//.test(h) && !/linkedin\.com/.test(h));
    const ok = proto.length >= 6 && proto.every(h => h.startsWith('https://astra-faeclub-prototype.netlify.app/')) && g.filter(h => h.startsWith('mailto:rifqiraka234@gmail.com')).length === 2;
    const anchors = await p.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.getAttribute('href').slice(1))));
    rec('links to the prototype, the mail and every chapter', ok && anchors, { proto: proto.length, anchors });
  }

  // 12, no overflow at nine widths
  {
    const widths = [1920, 1440, 1280, 1024, 860, 768, 560, 390, 320], bad = [];
    for (const w of widths) {
      const q = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
      await q.goto(base + '/', { waitUntil: 'networkidle' });
      if (plant && w === 390) await q.evaluate(() => { const d = document.createElement('div'); d.style.width = '600px'; d.style.height = '2px'; document.querySelector('#hours .wrap').appendChild(d); });
      await q.evaluate(() => { document.querySelectorAll('details').forEach(d => d.open = true); });
      const ov = await q.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (ov > 0) bad.push([w, ov]);
      await q.close();
    }
    rec('no overflow at nine widths', bad.length === 0, bad);
  }

  // 13, no script errors
  if (plant) await p.evaluate(() => setTimeout(() => { throw new Error('planted'); }, 0));
  await p.waitForTimeout(300);
  rec('no script errors', errs.length === 0, errs);

  await b.close();
  const pass = res.filter(Boolean).length;
  console.log(plant ? `${pass} of ${res.length} pass (plant mode, every check should FAIL)` : `${pass} of ${res.length} pass`);
})();
