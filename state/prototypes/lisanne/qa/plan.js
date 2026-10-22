const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = 'qa/plan'; require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  for (const [w, h, t] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const errs = [], bad = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('response', r => { if (r.url().startsWith('http://127.0.0.1') && r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await p.goto('http://127.0.0.1:8765/site-plan/', { waitUntil: 'load' }); await p.waitForTimeout(2500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 500) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(1200); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
    const st = await p.evaluate(() => { const r = [...document.querySelectorAll('.rv')]; return { total: r.length, on: r.filter(e => e.classList.contains('on')).length, imgs: [...document.images].map(i => [i.getAttribute('src'), i.naturalWidth]).filter(x => !x[1]), over: document.documentElement.scrollWidth - innerWidth }; });
    console.log(t, JSON.stringify(st), 'errors', JSON.stringify(errs), 'bad', JSON.stringify(bad));
    await p.screenshot({ path: `${OUT}/${t}-full.png`, fullPage: true });
    await p.close();
  }
  await b.close();
})();
