// Screens of every plan chapter at desktop and phone, with script errors and overflow. usage: node plan-look.js <base> <outdir>
const { chromium } = require('playwright');
const base = (process.argv[2] || 'http://localhost:8711').replace(/\/$/, ''), out = process.argv[3];
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[1440, 900, 'desk'], [390, 844, 'phone']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    await p.screenshot({ path: `${out}/${tag}-0-cover.png` });
    for (const id of ['top', 'today', 'route', 'dark', 'worth', 'built', 'under', 'cost', 'weeks', 'team']) {
      await p.evaluate(id => { const s = document.getElementById(id); scrollTo(0, s.offsetTop + (id === 'top' ? innerHeight * 0.8 : 0)); }, id); await p.waitForTimeout(500);
      await p.screenshot({ path: `${out}/${tag}-${id}.png` });
    }
    await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(400); await p.screenshot({ path: `${out}/${tag}-end.png` });
    const imgs = await p.evaluate(() => [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src));
    console.log(tag, 'errors', errs, 'scrollW', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth), 'undecoded', imgs.length, imgs.slice(0, 3));
  }
  await b.close();
})();
