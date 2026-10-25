const { chromium } = require('playwright');
const OUT = '/tmp/claude-0/saav/newshots/';
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  async function shot(name, path, w, h, fn) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 });
    await p.goto('http://localhost:8791' + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1800);
    if (fn) await fn(p);
    await p.screenshot({ path: OUT + name + '.png' });
    await p.close();
  }
  const to = sel => async p => { await p.evaluate(s => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - 0); }, sel); await p.waitForTimeout(2200); };
  await shot('home', '/', 1440, 900);
  await shot('boxes', '/entreprises/', 1440, 900, async p => { await p.evaluate(() => { const e = document.querySelector('#boxes'); scrollTo(0, e.getBoundingClientRect().top + scrollY + 60); }); await p.waitForTimeout(800); await p.fill('#bb-n', '40'); await p.dispatchEvent('#bb-n', 'input'); await p.waitForTimeout(1600); });
  await shot('day', '/', 1440, 900, async p => { await p.evaluate(() => { const d = document.querySelector('.day'); const r = d.getBoundingClientRect(); scrollTo(0, r.top + scrollY + (r.height - innerHeight) * 0.62); }); await p.waitForTimeout(2200); });
  await shot('night', '/privatisation/', 1440, 900);
  await shot('walk', '/entreprises/', 1440, 900, async p => { await p.evaluate(() => { const e = document.querySelector('.walk'); scrollTo(0, e.getBoundingClientRect().top + scrollY + 40); }); await p.waitForTimeout(4500); });
  await shot('m-ent', '/entreprises/', 390, 844);
  await shot('m-box', '/entreprises/', 390, 844, async p => { await p.evaluate(() => { const e = document.querySelector('.bb-ctl'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 90); }); await p.waitForTimeout(1500); });
  await shot('m-devis', '/devis/', 390, 844, async p => { await p.evaluate(() => { const e = document.querySelector('.quote-card'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 90); }); await p.waitForTimeout(1500); });
  await b.close();
})();
