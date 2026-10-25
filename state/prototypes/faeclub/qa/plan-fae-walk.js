// Walk the Fae Club plan, desktop and phone, one screenshot per chapter plus the controls in their second states.
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8705', out = process.argv[3] || 'pfw';
(async () => {
  require('fs').mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const [tag, vp] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const p = await (await b.newContext(vp)).newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    await p.screenshot({ path: `${out}/${tag}-00cover.jpg`, type: 'jpeg', quality: 70 });
    const ids = ['today', 'route', 'price', 'hours', 'built', 'under', 'retreat', 'days', 'team'];
    let k = 1;
    const nm = s => `${out}/${tag}-${String(k++).padStart(2, '0')}${s}.jpg`;
    for (const id of ids) {
      await p.evaluate(id => { const e = document.getElementById(id); scrollTo(0, e.getBoundingClientRect().top + scrollY - 60); }, id); await p.waitForTimeout(700);
      await p.screenshot({ path: nm(id), type: 'jpeg', quality: 70 });
      if (id === 'today') {
        await p.evaluate(() => { const e = document.querySelector('.tshots'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 80); }); await p.waitForTimeout(700);
        await p.screenshot({ path: nm('today-shots'), type: 'jpeg', quality: 70 });
      }
      if (id === 'route') {
        await p.evaluate(() => { const e = document.querySelector('[data-rail]'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 200); }); await p.waitForTimeout(500);
        await p.screenshot({ path: nm('route-today3'), type: 'jpeg', quality: 70 });
        await p.click('[data-when="n"]'); await p.waitForTimeout(900);
        await p.screenshot({ path: nm('route-new3'), type: 'jpeg', quality: 70 });
      }
      if (id === 'price') {
        await p.evaluate(() => { const e = document.querySelector('.pr-rows'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 200); }); await p.waitForTimeout(500);
        await p.click('[data-show="today"]'); await p.waitForTimeout(1000);
        await p.screenshot({ path: nm('price-today'), type: 'jpeg', quality: 70 });
      }
      if (id === 'built') {
        for (const f of [0.35, 0.75]) {
          await p.evaluate(f => { const e = document.querySelector('.bf'); scrollTo(0, e.getBoundingClientRect().top + scrollY + e.offsetHeight * f - innerHeight / 2); }, f); await p.waitForTimeout(900);
          await p.screenshot({ path: nm('built-' + f), type: 'jpeg', quality: 70 });
        }
      }
    }
    await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(600);
    await p.screenshot({ path: nm('end'), type: 'jpeg', quality: 70 });
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(tag, 'errors', errs.length, errs.slice(0, 3).join(' | '), 'overflow', ov);
  }
  await b.close();
})();
