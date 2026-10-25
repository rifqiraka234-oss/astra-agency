// node kitfit.js   the kit, driven through the real controls, its sums worked out here and compared with every display.
// FAULT=1 changes one expected number after the page is read, and the run must then fail, so a pass means something.
const { chromium } = require('playwright');
const { SITE } = require('./pages');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto(SITE + '/gyms/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  const D = await p.evaluate(() => JSON.parse(document.querySelector('#bb-kit-data').textContent));
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  let seed = 11; const rnd = n => { seed = (seed * 9301 + 49297) % 233280; return Math.floor(seed / 233280 * n); };

  // the name, typed in the hero
  await p.fill('#k-name', 'Iron Teddy Club');
  // the hoodie on as well
  await p.click('label.pc:has(input[value="hood"])');
  // random size runs, set with the keyboard and the buttons, the way a visitor would
  const want = { tee: D.run.tee.slice(), hood: D.run.hood.slice() };
  for (const k of ['tee', 'hood']) for (let i = 0; i < D.sizes.length; i++) {
    const target = rnd(47);
    const t = p.locator(`[data-sr="${k}"] .sb`).nth(i).locator('[data-sb]');
    await t.focus(); await p.keyboard.press('Home');
    for (let j = 0; j < Math.floor(target / 10); j++) await p.keyboard.press('PageUp');
    for (let j = 0; j < target % 10; j++) await p.locator(`[data-sr="${k}"] .sb`).nth(i).locator('[data-sb-step="1"]').click();
    want[k][i] = target;
  }
  // and one bar dragged, to its top, which is 40 by design
  const box = await p.locator('[data-sr="tee"] .sb').nth(2).locator('[data-sb]').boundingBox();
  await p.mouse.move(box.x + box.width / 2, box.y + box.height - 2); await p.mouse.down(); await p.mouse.move(box.x + box.width / 2, box.y - 30, { steps: 6 }); await p.mouse.up();
  want.tee[2] = 40;
  await p.waitForTimeout(300);

  const tot = k => want[k].reduce((a, v) => a + v, 0), grand = tot('tee') + tot('hood');
  const nonzero = ['tee', 'hood'].reduce((a, k) => a + want[k].filter(v => v > 0).length, 0);
  const got = await p.evaluate(() => {
    const q = s => document.querySelector(s), qa = s => [...document.querySelectorAll(s)];
    const bars = {}; qa('[data-sr]').forEach(g => { bars[g.getAttribute('data-sr')] = qa(`[data-sr="${g.getAttribute('data-sr')}"] [data-sb-n]`).map(e => +e.textContent); });
    const tots = {}; qa('[data-sr]').forEach(g => { tots[g.getAttribute('data-sr')] = +g.querySelector('[data-sr-tot]').textContent; });
    const wo = {}; qa('[data-wo-n]').forEach(e => { wo[e.getAttribute('data-wo-n')] = +e.textContent; });
    return { bars, tots, wo, woT: { tee: +q('[data-wo-t="tee"]').textContent, hood: +q('[data-wo-t="hood"]').textContent }, woTotal: +q('[data-wo-total]').textContent,
      kTotal: +q('[data-k-total]').textContent, stub: q('[data-stub-t]').textContent, kbar: q('[data-kbar-n]').textContent + ' ' + q('[data-kbar-gym]').textContent,
      kit: q('[data-form-kit]').value, gymField: q('[data-form-gym]').value, rk: qa('.rk').length, rkDiv: qa('.rk-div').length,
      printed: qa('.bb-defs [data-p="name"]').map(e => e.textContent), woGym: q('[data-wo="gym"]').textContent, ini: q('.bb-defs [data-p="ini"]').textContent };
  });
  if (process.env.FAULT) want.tee[0] += 1;
  const T = k => want[k].reduce((a, v) => a + v, 0), G = T('tee') + T('hood');
  ok(Object.keys(got.bars).length === 2 && got.bars.tee.length === 6, 'the bars exist');
  for (const k of ['tee', 'hood']) {
    ok(JSON.stringify(got.bars[k]) === JSON.stringify(want[k]), `${k} bars ${got.bars[k]} want ${want[k]}`);
    ok(got.tots[k] === T(k), `${k} total ${got.tots[k]} want ${T(k)}`);
    ok(got.woT[k] === T(k), `${k} work order total ${got.woT[k]} want ${T(k)}`);
    D.sizes.forEach((s, i) => ok(got.wo[`${k}-${s}`] === want[k][i], `${k} ${s} work order ${got.wo[`${k}-${s}`]} want ${want[k][i]}`));
    ok(got.kit.includes(D.sizes.map((s, i) => s + ' ' + want[k][i]).join(', ') + ' (' + T(k) + ')'), `${k} sizes in the form field`);
  }
  ok(got.woTotal === G, `work order grand ${got.woTotal} want ${G}`);
  ok(got.kTotal === G, `rail total ${got.kTotal} want ${G}`);
  ok(got.stub.endsWith('· ' + G), `stub "${got.stub}" want ${G}`);
  ok(got.kbar.includes('· ' + G), `bar "${got.kbar}" want ${G}`);
  ok(got.kit.includes('Total: ' + G), 'grand total in the form field');
  ok(got.rk === G, `hangers on the rail ${got.rk} want ${G}`);
  ok(got.rkDiv === nonzero, `size dividers ${got.rkDiv} want ${nonzero}`);
  ok(got.printed.length >= 6 && got.printed.every(t => t === 'IRON TEDDY CLUB'), 'the name printed on every symbol ' + JSON.stringify(got.printed));
  ok(got.woGym === 'IRON TEDDY CLUB' && got.gymField === 'Iron Teddy Club', 'the name on the work order and in the form');
  ok(got.ini === 'IT', 'initials ' + got.ini);
  ok(got.kit.includes('Pieces: Oversized tee + Hoodie'), 'both pieces in the form field');
  ok(!errs.length, 'page errors ' + errs.join(' | '));
  console.log(JSON.stringify({ want, grand: G, rail: got.rk }));
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS, ' + (6 * 2 * 2 + 14) + ' checks');
  await b.close();
  process.exit(fails.length ? 1 : 0);
})();
