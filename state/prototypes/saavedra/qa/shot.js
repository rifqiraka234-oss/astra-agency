// node shot.js <path> <width> <height> <prefix> [lang] [mode: full|steps]
const { chromium } = require('playwright');
(async () => {
  const [path, W, H, prefix, lang = 'fr', mode = 'steps'] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +W, height: +H } });
  const errs = [];
  p.on('pageerror', e => errs.push('pageerror ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
  p.on('requestfailed', r => errs.push('failed ' + r.url()));
  await p.goto((process.env.HOST || 'http://localhost:8791') + path + (lang === 'en' ? (path.includes('?') ? '&' : '?') + 'lang=en' : ''), { waitUntil: 'networkidle' });
  await p.waitForTimeout(1800);
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  if (mode === 'full') {
    for (let y = 0; y < total; y += 400) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
    await p.screenshot({ path: `/tmp/claude-0/saav/shots/${prefix}-full.jpg`, fullPage: true, quality: 60, type: 'jpeg' });
  } else {
    let i = 0;
    for (let y = 0; y < total; y += +H) {
      await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(1300);
      await p.screenshot({ path: `/tmp/claude-0/saav/shots/${prefix}-${String(i++).padStart(2, '0')}.jpg`, quality: 62, type: 'jpeg' });
    }
  }
  console.log('height', total, 'errors', errs.length ? errs.join('\n') : 0);
  await b.close();
})();
