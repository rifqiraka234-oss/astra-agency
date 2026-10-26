// Screens of every chapter of the plan, cold load, nothing forced. usage: node plan-shots.js <url> <outdir> [w] [h]
// Scrolls the way a reader does (which starts the art layer), then shoots each section's top and, for tall ones, more.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const [url, out, W = '1440', Hh = '900'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const mob = +W < 600;
  const ctx = await b.newContext(mob ? { viewport: { width: +W, height: +Hh }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: +W, height: +Hh } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
  await p.screenshot({ path: `${out}/p-${W}-00-cover.png` });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 400) { await p.mouse.wheel(0, 400); await p.waitForTimeout(60); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
  await p.screenshot({ path: `${out}/p-${W}-01-cover-art.png` });
  const ids = await p.evaluate(() => [...document.querySelectorAll('main > section')].map(s => [s.id || s.className.split(' ')[0], s.getBoundingClientRect().top + scrollY, s.offsetHeight]));
  let k = 2;
  for (const [id, top, h] of ids) {
    for (let y = top, i = 0; y < top + h - 80 && i < 6; y += +Hh - 120, i++) {
      await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(500);
      await p.screenshot({ path: `${out}/p-${W}-${String(k++).padStart(2, '0')}-${id}-${i}.png` });
    }
  }
  console.log(W, 'height', H, 'shots', k, 'errors', errs.length, errs.slice(0, 4));
  await b.close();
})();
