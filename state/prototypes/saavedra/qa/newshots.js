// The plan's screenshots of the new site, v3. node newshots.js, then sizes and JPEG in the python step after.
const { chromium } = require('playwright');
const OUT = '/tmp/claude-0/saav/newshots/';
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  async function shot(name, path, w, h, fn) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 });
    await p.goto('http://localhost:8791' + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2600);
    if (fn) await fn(p);
    await p.screenshot({ path: OUT + name + '.png' });
    await p.close();
  }
  const to = (sel, off = 0, wait = 2200) => async p => { await p.evaluate(([s, o]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY + o); }, [sel, off]); await p.waitForTimeout(wait); };
  await shot('home', '/', 1440, 900);
  await shot('boxes', '/entreprises/?personnes=30', 1440, 900, to('.ob', -120, 2600));
  await shot('day', '/', 1440, 900, async p => { await p.evaluate(() => { const d = document.querySelector('.day'); const r = d.getBoundingClientRect(); scrollTo(0, r.top + scrollY + (r.height - innerHeight) * 0.62); }); await p.waitForTimeout(2600); });
  await shot('night', '/privatisation/', 1440, 900);
  await shot('walk', '/entreprises/', 1440, 900, to('.walk', 40, 4500));
  await shot('m-ent', '/entreprises/', 390, 844);
  await shot('m-box', '/entreprises/?personnes=30', 390, 844, to('.tb', -90, 2200));
  await shot('m-devis', '/entreprises/?personnes=30', 390, 844, to('#devis .quote-card', -90, 1500));
  await b.close();
})();
