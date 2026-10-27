// Screens of the v3 Honey It's Handled prototype for the plan. usage: node capture-v3.js <base url> <out dir>
// A cold load the way a couple reads it, scrolled with the wheel so every scene runs on its own, nothing forced.
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), out = process.argv[3];
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  for (const [tag, vp] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const p = await (await b.newContext(vp)).newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(base + '/', { waitUntil: 'networkidle', timeout: 120000 }); await p.waitForTimeout(3000);
    await p.screenshot({ path: `${out}/v3-hero-${tag}.png` });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 300) { await p.mouse.wheel(0, 300); await p.waitForTimeout(60); }
    const at = async (sel, f) => {
      await p.evaluate(([sel, f]) => { const e = document.querySelector(sel); if (!e) return; const top = e.getBoundingClientRect().top + scrollY; scrollTo(0, top + Math.max(0, e.offsetHeight - innerHeight) * f); }, [sel, f]);
      await p.waitForTimeout(1600);
    };
    for (const [name, sel, f] of [['v3-invited', '#invited', 0], ['v3-offwhite', '#off-white', 0.35], ['v3-blue', '#blue', 0.3], ['v3-red', '#red', 0.6], ['v3-elise', '#elise', 0], ['v3-reply', '#reply', 0.05]]) {
      await at(sel, f); await p.screenshot({ path: `${out}/${name}-${tag}.png` });
    }
    console.log(tag, 'height', H, 'page errors', errs.length, errs.slice(0, 3));
  }
  await b.close();
})();
