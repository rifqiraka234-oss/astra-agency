const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [tag, vp] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const p = await (await b.newContext(vp)).newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('http://127.0.0.1:8704/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
    await p.screenshot({ path: `s2-${tag}-0top.jpg`, type: 'jpeg', quality: 70 });
    for (const [f, n] of [[0.04, '1turn'], [0.1, '2lift'], [0.93, '3hall'], [0.99, '4hallend']]) {
      await p.evaluate(f => { const t = document.querySelector('[data-tale]'); scrollTo(0, t.offsetTop + (t.offsetHeight - innerHeight) * f); }, f);
      await p.waitForTimeout(1300); await p.screenshot({ path: `s2-${tag}-${n}.jpg`, type: 'jpeg', quality: 70 });
    }
    await p.evaluate(() => document.querySelector('#solo').scrollIntoView()); await p.click('#solo [data-q="1"]').catch(() => {});
    await p.evaluate(() => document.querySelector('#tickets').scrollIntoView()); await p.waitForTimeout(700);
    await p.screenshot({ path: `s2-${tag}-5tickets.jpg`, type: 'jpeg', quality: 70 });
    await p.evaluate(() => document.querySelector('#spread').scrollIntoView()); await p.waitForTimeout(900);
    await p.screenshot({ path: `s2-${tag}-6spread.jpg`, type: 'jpeg', quality: 70 });
    await p.goto('http://127.0.0.1:8704/valkyrie-retreat/', { waitUntil: 'networkidle' }).catch(async () => {});
    if (!(await p.$('[data-rp]'))) { const href = await p.evaluate(() => [...document.querySelectorAll('a')].map(a => a.href).find(h => /retreat/.test(h))); console.log('retreat href', href); }
    await p.waitForTimeout(600); await p.screenshot({ path: `s2-${tag}-7rt.jpg`, type: 'jpeg', quality: 70 });
    await p.evaluate(() => document.querySelector('[data-rp]').scrollIntoView()); await p.waitForTimeout(700);
    await p.screenshot({ path: `s2-${tag}-8rtplan.jpg`, type: 'jpeg', quality: 70 });
    console.log(tag, 'errors', errs.length, errs.join(' | '));
  }
  await b.close();
})();
