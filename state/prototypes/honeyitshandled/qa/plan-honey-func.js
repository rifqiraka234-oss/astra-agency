// Honey It's Handled plan, functional checks. usage: node plan-honey-func.js <base url> <plan.json> [plant]
// Every expected value is worked out here from data/plan.json, never read back from the page. With "plant", each check
// gets a fault planted first and must FAIL, so a pass means something.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const base = process.argv[2].replace(/\/$/, ''), D = JSON.parse(fs.readFileSync(process.argv[3], 'utf8')), plant = process.argv[4] === 'plant';
const CH = { executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--ignore-certificate-errors-spki-list=PS48cX347wDVcRynzq+DFqswl2PLNE1sG6uQvxMCOS0='] };
const num = n => Math.round(n).toLocaleString('en-GB');
const eur = v => '€' + num(v);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const res = [];
const rec = (name, ok, info) => { res.push(ok); console.log((ok ? 'PASS ' : 'FAIL ') + name, JSON.stringify(info).slice(0, 320)); };

// the wedding year, worked out again here, independently of plan.py and plan.js
const C = D.calendar, nowIx = C.now.y * 12 + C.now.m - 1, TOT = C.months.reduce((a, b) => a + b, 0);
const yearSum = (y, l) => { let got = 0, on = []; C.months.forEach((v, i) => { const ix = y * 12 + i - l; on.push(ix <= nowIx); if (ix <= nowIx) got += v; }); return { got, on, labels: C.months.map((v, i) => { const ix = y * 12 + i - l; return MON[ix % 12] + ' ' + String(Math.floor(ix / 12)).slice(2); }) }; };
const yearSentence = (y, l) => {
  const { got } = yearSum(y, l);
  if (got === 0) { const ix = y * 12 - l; return `Booked ${l} months ahead, no ${y} wedding has reached that point yet. The first does in ${MON[ix % 12]} ${Math.floor(ix / 12)}.`; }
  if (got === TOT) return `Booked ${l} months ahead, every ${y} wedding has reached that point, all ${num(TOT)} in a year like 2024.`;
  return `Booked ${l} months ahead, ${num(got)} of ${num(TOT)} weddings in a year like 2024, ${Math.round(got / TOT * 100)}%, have reached that point for ${y}.`;
};

(async () => {
  const b = await chromium.launch(CH);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  const setRange = (id, v) => p.evaluate(([id, v]) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]);

  // 1, the field, three places and four couple counts, readout and data attributes
  {
    let ok = true, bad = [];
    for (const s of D.market.scopes) for (const k of [1, 7, 10, 20]) {
      await p.click(`[data-scope="${s.key}"]`); await setRange('fld-k', k);
      if (plant && s.key === 'fl' && k === 20) await p.evaluate(() => { document.querySelector('[data-o="one"]').textContent = '1,000'; });
      const got = await p.evaluate(() => ({ t: document.querySelector('[data-o="out"]').textContent.replace(/\s+/g, ' ').trim(), k: document.querySelector('[data-o="k"]').textContent }));
      const want = `${k} couples is 1 in ${num(s.n / k)} weddings registered ${s.in} in 2024, ${num(s.n)} in all.`;
      if (got.t !== want || got.k !== String(k)) { ok = false; bad.push([got.t, want]); }
    }
    rec('field readouts, 12 states', ok, bad.slice(0, 2));
  }

  // 2, the field draws her couples in red, more of them for a bigger number (a positive count, not only a difference)
  {
    await p.click('[data-scope="prov"]');
    const red = async () => { await p.waitForTimeout(700); return p.evaluate(() => { const c = document.getElementById('field'), x = c.getContext('2d'), d = x.getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] > 120 && d[i + 1] < 70 && d[i + 2] < 70 && d[i + 3] > 200) n++; return n; }); };
    await setRange('fld-k', 1); const r1 = await red();
    await setRange('fld-k', 20); let r20 = await red();
    if (plant) r20 = r1;
    rec('field draws red dots, 1 couple vs 20', r1 > 20 && r20 > r1 * 8, { r1, r20 });
    await setRange('fld-k', D.market.couples.def);
  }

  // 3 to 12, the wedding year, two years and five lead times, readout, red bars and booking labels
  for (const y of C.years) for (const l of [6, 12, 15, 18, 24]) {
    await p.click(`[data-year="${y}"]`); await setRange('cal-l', l);
    if (plant) await p.evaluate(() => { const g = document.querySelectorAll('.cb')[3]; g.classList.toggle('on'); });
    const got = await p.evaluate(() => ({ out: document.querySelector('.cal-out').textContent, on: [...document.querySelectorAll('.cb')].map(g => g.classList.contains('on')), lab: [...document.querySelectorAll('.cb .ck')].map(t => t.textContent), rows: [...document.querySelectorAll('[data-r]')].map(t => t.textContent === 'Reached') }));
    const w = yearSum(y, l);
    const ok = got.out === yearSentence(y, l) && got.on.join() === w.on.join() && got.lab.join() === w.labels.join() && got.rows.join() === w.on.join();
    rec(`year ${y}, booked ${l} months ahead`, ok, { got: got.out.slice(0, 90), on: got.on.filter(Boolean).length, want: w.on.filter(Boolean).length });
  }

  // 13, the claims in the copy agree with the data they come from
  {
    const ps = D.market.prov_series, fl = D.market.scopes.find(s => s.key === 'fl').n, prov = D.market.scopes.find(s => s.key === 'prov').n;
    const share27 = yearSum(2027, 12).got / TOT;
    let h = D.calendar.h;
    if (plant) h = h.replace('Nine in ten', 'Eight in ten');
    const checks = {
      prov_last: ps[ps.length - 1] === prov,
      prov_most_in_ten: Math.max(...ps) === prov && ps.length === 10 && D.market.h.includes('the most in ten years') && D.market.h.includes(num(prov)),
      flanders_up: D.market.lede.includes(`up ${(Math.round((fl / D.market.flanders_prev - 1) * 1000) / 10).toFixed(1)}% on 2023`),
      belgium_up: D.why.behind[1].p.includes(`${(Math.round((D.market.belgium / D.market.belgium_prev - 1) * 1000) / 10).toFixed(1)}% in Belgium`),
      one_in_792: D.market.lede.includes(`one wedding in ${Math.round(prov / 10)}`),
      cover: D.cover.lede.includes(num(prov)),
      nine_in_ten: Math.round(share27 * 10) === 9 && h.startsWith('Nine in ten'),
      abroad_share: Math.round(D.market.abroad / D.market.belgium * 100) === 9 && D.market.abroad_line.includes('9%'),
      months_sum_to_flanders: D.calendar.months.length === 12 && TOT === fl
    };
    rec('copy claims match the data', Object.values(checks).every(Boolean), checks);
  }

  // 14, the rivals, both views, values and bar lengths
  {
    const R = D.rivals, mx = { told: 20, ig: 10000 };
    let ok = true, info = [];
    for (const v of R.views) {
      await p.click(`[data-view="${v.key}"]`); await p.waitForTimeout(700);
      if (plant && v.key === 'ig') await p.evaluate(() => { document.querySelectorAll('.rb .rb-v')[2].textContent = '1,234'; });
      const got = await p.evaluate(() => ({ cap: document.querySelector('[data-o="cap"]').textContent, rows: [...document.querySelectorAll('.rb')].map(li => { const t = li.querySelector('.rb-t').getBoundingClientRect(), i = li.querySelector('.rb-t i').getBoundingClientRect(); return { v: li.querySelector('.rb-v').textContent, f: i.width / t.width, nr: li.classList.contains('nr') }; }) }));
      const good = got.cap === v.label && got.rows.length === R.rows.length && got.rows.every((g, n) => { const want = R.rows[n][v.key]; return want === null ? (g.v === 'Not read' && g.nr) : (g.v === num(want) && Math.abs(g.f - Math.max(want / mx[v.key], 0)) < 0.01 + 2 / 600); });
      if (!good) { ok = false; info.push(got); }
    }
    const told = R.rows.filter(r => !r.us && r.told > 0).length, rivals = R.rows.filter(r => !r.us).length;
    ok = ok && told === 3 && rivals === 4 && R.h.startsWith('Three of the four');
    rec('rivals chart, both views, and the heading count', ok, info.slice(0, 1));
  }

  // 15, the money, four budgets, the fee, the marker's place and its flip
  {
    const M = D.money; let ok = true, bad = [];
    for (const bud of [10000, M.budget.def, 80000, 100000]) {
      await setRange('mo-b', bud); await p.waitForTimeout(450);
      if (plant && bud === 80000) await p.evaluate(() => { document.querySelector('[data-o="fee"]').textContent = '€1'; });
      const got = await p.evaluate(() => { const sc = document.querySelector('.mo-sc').getBoundingClientRect(), me = document.querySelector('[data-o="me"]').getBoundingClientRect(); return { fee: document.querySelector('[data-o="fee"]').textContent, out: document.querySelector('.mo-out').textContent, x: (me.left - sc.left) / sc.width, flip: document.querySelector('[data-o="me"]').classList.contains('flip') }; });
      const fee = bud * M.share, x = Math.min(fee, M.axis_max) / M.axis_max;
      const good = got.fee === eur(fee) && got.out === `Wedding Dreamworx's 15% of ${eur(bud)} is ${eur(fee)}.` && Math.abs(got.x - x) < 0.006 && got.flip === (x > 0.72);
      if (!good) { ok = false; bad.push({ bud, got, fee: eur(fee), x }); }
    }
    const marks = await p.evaluate(() => { const sc = document.querySelector('.mo-sc').getBoundingClientRect(); return [...document.querySelectorAll('.mm')].map(m => ({ x: (m.getBoundingClientRect().left - sc.left) / sc.width, v: m.textContent })); });
    if (plant) marks[1].x = 0.5;
    const mk = marks.length === M.marks.length && marks.every((m, i) => Math.abs(m.x - M.marks[i].v / M.axis_max) < 0.006 && m.v === eur(M.marks[i].v));
    rec('money, four budgets and the four marks', ok && mk, bad.slice(0, 1).concat(mk ? [] : [marks]));
    await setRange('mo-b', M.budget.def);
  }

  // 16, the page without script says the same defaults as the page with it
  {
    const nc = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const q = await nc.newPage(); await q.goto(base + '/', { waitUntil: 'load' });
    const grab = pg => pg.evaluate(() => ['[data-field] [data-o="out"]', '.cal-out', '.mo-out', '[data-o="fee"]', '.cal-svg'].map(s => s === '.cal-svg' ? [...document.querySelectorAll('.cb')].map(g => g.classList.contains('on') ? 1 : 0).join('') + [...document.querySelectorAll('.cb .ck')].map(t => t.textContent).join() : document.querySelector(s).textContent.replace(/\s+/g, ' ').trim()));
    const fresh = await (await ctx.newPage()); await fresh.goto(base + '/', { waitUntil: 'networkidle' });
    const a = await grab(q), c = await grab(fresh);
    if (plant) a[2] = a[2].replace('4,763', '4,762');
    rec('no script defaults match the script defaults', a.join('|') === c.join('|'), a.map((x, i) => x === c[i] ? 'same' : [x, c[i]]));
    await nc.close(); await fresh.close();
  }

  // 17, every image decodes once scrolled to, and every reveal fires on its own
  {
    for (let y = 0; y < 60; y++) { await p.mouse.wheel(0, 500); await p.waitForTimeout(50); }
    await p.waitForTimeout(1200);
    const got = await p.evaluate(() => ({ imgs: [...document.images].length, bad: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.currentSrc || i.src), rv: document.querySelectorAll('.rv').length, rvin: document.querySelectorAll('.rv.in').length }));
    if (plant) got.bad.push('planted.jpg');
    rec('images decoded and reveals fired', got.imgs > 8 && got.bad.length === 0 && got.rv > 5 && got.rvin === got.rv, got);
  }

  // 18, the header monogram is full at the foot of the page, and the art layer started on the scroll
  {
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(400);
    const got = await p.evaluate(() => ({ read: +getComputedStyle(document.querySelector('.hb-hh')).getPropertyValue('--read'), art: document.documentElement.classList.contains('art-on'), rib: +getComputedStyle(document.querySelector('[data-tline]')).getPropertyValue('--rib') }));
    if (plant) got.read = 0.5;
    rec('header monogram fills, art on after scrolling, ribbon drawn', got.read > 0.99 && got.art && got.rib > 0.99, got);
  }

  // 19, the art waits for the reader. A fresh load that isn't scrolled has no art yet, and reduced motion never gets it
  {
    const w = await ctx.newPage(); await w.goto(base + '/', { waitUntil: 'networkidle' }); await w.waitForTimeout(1500);
    let idle = await w.evaluate(() => document.documentElement.classList.contains('art-on'));
    const rc = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const r = await rc.newPage(); await r.goto(base + '/', { waitUntil: 'networkidle' });
    for (let y = 0; y < 10; y++) { await r.mouse.wheel(0, 600); await r.waitForTimeout(40); }
    await r.waitForTimeout(600);
    const rm = await r.evaluate(() => ({ art: document.documentElement.classList.contains('art-on'), rm: document.documentElement.classList.contains('rm'), rib: getComputedStyle(document.querySelector('.rib')).strokeDashoffset }));
    if (plant) idle = true;
    rec('art starts only on a gesture and never under reduced motion', !idle && !rm.art && rm.rm && parseFloat(rm.rib) === 0, { idle, rm });
    await w.close(); await rc.close();
  }

  // 20, the built frames, once the prototype's screens are in
  {
    const has = await p.evaluate(() => !!document.querySelector('[data-bf]'));
    if (!has) {
      const ph = await p.evaluate(() => { const e = document.querySelector('#site .ph'); return e ? e.textContent : ''; });
      let ok = /Placeholder/.test(ph) && /placeholder with no screenshots in it/.test(ph);
      if (plant) ok = false;
      rec('new site chapter is a labelled placeholder', ok, { ph: ph.slice(0, 80) });
    } else {
      const n = D.built.shots.length; let ok = true;
      for (let i = 0; i < n; i++) {
        await p.evaluate(i => { const li = document.querySelectorAll('.bc li')[i]; scrollTo(0, li.getBoundingClientRect().top + scrollY - innerHeight * 0.45); }, i);
        await p.waitForTimeout(500);
        const on = await p.evaluate(() => [...document.querySelectorAll('.bf-i')].findIndex(f => f.classList.contains('on')));
        if (on !== (plant && i === 1 ? -1 : i)) ok = false;
      }
      rec('built frames follow the captions', ok, { n });
    }
  }

  // 21, no script errors, and the error trap itself works
  {
    if (plant) await p.evaluate(() => setTimeout(() => { throw new Error('planted'); }, 0));
    await p.waitForTimeout(300);
    rec('no script errors', errs.length === 0, errs);
  }

  await b.close();
  const pass = res.filter(Boolean).length;
  console.log(`${pass} of ${res.length} passed${plant ? ' (plant mode, every check should fail)' : ''}`);
  process.exit(plant ? (pass === 0 ? 0 : 1) : (pass === res.length ? 0 : 1));
})();
