// Screens of the final Honey It's Handled prototype for the plan. usage: node capture.js <base url> <out dir>
// A cold load, the way a couple reads it, scrolled with the wheel so every scene runs on its own, nothing forced.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const base = process.argv[2].replace(/\/$/, ''), out = process.argv[3];
const CH = { executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--ignore-certificate-errors-spki-list=PS48cX347wDVcRynzq+DFqswl2PLNE1sG6uQvxMCOS0='] };
(async () => {
  const b = await chromium.launch(CH);
  for (const [tag, vp] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const p = await (await b.newContext(vp)).newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(base + '/', { waitUntil: 'networkidle', timeout: 90000 }); await p.waitForTimeout(1800);
    await p.screenshot({ path: `${out}/s-hero-${tag}.png` });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    // read the page once with the wheel so every scene and lazy image has run
    for (let y = 0; y < H; y += 300) { await p.mouse.wheel(0, 300); await p.waitForTimeout(60); }
    const at = async (sel, f) => {
      await p.evaluate(([sel, f]) => { const e = document.querySelector(sel); if (!e) return; const top = e.getBoundingClientRect().top + scrollY; scrollTo(0, top + Math.max(0, e.offsetHeight - innerHeight) * f); }, [sel, f]);
      await p.waitForTimeout(1300);
    };
    for (const [name, sel, f] of [['s-year1', '#year', 0.15], ['s-year2', '#year', 0.6], ['s-nights', '#nights', 0.3], ['s-elise', '#elise', 0.1], ['s-day', '#day', 0.6], ['s-letter', '#letter', 0]]) {
      await at(sel, f); await p.screenshot({ path: `${out}/${name}-${tag}.png` });
    }
    console.log(tag, 'height', H, 'page errors', errs.length, errs.slice(0, 3));
  }
  await b.close();
})();
