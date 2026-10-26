// Cold load, nothing forced, then a screenshot every 0.8 screens from the top to the bottom at 1440 and 390.
// node qa/shots.js <url> <out dir> [widths, comma separated] [rm]
const { chromium } = require('playwright');
const fs = require('fs');
const URL = process.argv[2] || 'http://127.0.0.1:8711/';
const OUT = process.argv[3] || 'shots';
const W = (process.argv[4] || '1440,390').split(',').map(Number);
const RM = process.argv[5] === 'rm';
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  for (const w of W) {
    const h = w > 600 ? 900 : 844;
    const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: RM ? 'reduce' : 'no-preference' });
    const p = await c.newPage(); const errs = [];
    p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
    p.on('requestfailed', r => errs.push('failed ' + r.url()));
    await p.goto(URL, { waitUntil: 'networkidle' }); await p.waitForTimeout(2600);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    let i = 0;
    for (let y = 0; y < H; y += Math.round(h * 0.8)) {
      await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(650);
      await p.screenshot({ path: `${OUT}/${w}${RM ? 'rm' : ''}-${String(i++).padStart(2, '0')}.png` });
    }
    const info = await p.evaluate(() => ({ H: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, gl: document.documentElement.classList.contains('gl') }));
    console.log(w, RM ? 'rm' : '', JSON.stringify(info), 'shots', i, 'errors', errs.length, errs.slice(0, 6).join(' | '));
    await c.close();
  }
  await b.close();
})();
