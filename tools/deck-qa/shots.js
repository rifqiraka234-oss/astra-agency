// Screenshot every <section> plus the full page, for a visual read-through.
// Usage:  BASE=http://127.0.0.1:8788 node tools/deck-qa/shots.js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = process.env.BASE || 'http://127.0.0.1:8788';
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
  await p.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
  });
  await p.waitForTimeout(1800);
  const secs = await p.$$('section, figure.band');
  for (let i = 0; i < secs.length; i++) {
    await secs[i].scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    await secs[i].screenshot({ path: 'sec_' + i + '.png' });
  }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(800);
  await p.screenshot({ path: 'FULL.png', fullPage: true });
  console.log('wrote sec_0..' + (secs.length - 1) + '.png and FULL.png');
  await b.close();
})();
