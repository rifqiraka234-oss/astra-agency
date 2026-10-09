// cold load, reduced motion for stable screenshots; header made static only for section captures
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:8791/index.html';
const OUT = process.argv[2] || 'shots';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `${OUT}/${tag}_00_top.png` });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
    await p.addStyleTag({ content: 'header.top{position:static!important}' });
    const secs = await p.$$('section, footer');
    for (let i = 0; i < secs.length; i++) { await secs[i].scrollIntoViewIfNeeded(); await p.waitForTimeout(250); await secs[i].screenshot({ path: `${OUT}/${tag}_sec${i}.png` }); }
    console.log(tag, 'errors', JSON.stringify(errs));
    await ctx.close();
  }
  await b.close();
})();
