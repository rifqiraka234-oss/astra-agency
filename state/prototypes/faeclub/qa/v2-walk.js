// v2 walk: the tale at many points, then every section, desktop and phone
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:8704', out = process.argv[3] || 'v2w';
(async () => {
  require('fs').mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  for (const [tag, vp] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const p = await (await b.newContext(vp)).newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
    let k = 0; const nm = s => `${out}/${tag}-${String(k++).padStart(2, '0')}-${s}.jpg`;
    for (const f of [0.04, 0.09, 0.14, 0.3, 0.55, 0.85, 0.97, 1]) {
      await p.evaluate(f => { const t = document.querySelector('[data-tale]'); scrollTo(0, t.offsetTop + (t.offsetHeight - innerHeight) * f); }, f);
      await p.waitForTimeout(1300); await p.screenshot({ path: nm('tale' + f), type: 'jpeg', quality: 70 });
    }
    for (const id of ['solo', 'tickets', 'spread', 'checkout', 'venue', 'dress', 'faqs', 'night-club']) {
      await p.evaluate(id => { const e = document.getElementById(id); scrollTo(0, e.getBoundingClientRect().top + scrollY - (id === 'night-club' ? 200 : 40)); }, id);
      await p.waitForTimeout(1300); await p.screenshot({ path: nm(id), type: 'jpeg', quality: 70 });
    }
    await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(1200);
    await p.screenshot({ path: nm('end'), type: 'jpeg', quality: 70 });
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(tag, 'errors', errs.length, errs.slice(0, 3).join(' | '), 'overflow', ov);
  }
  await b.close();
})();
