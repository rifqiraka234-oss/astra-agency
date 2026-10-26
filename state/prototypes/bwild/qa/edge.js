// screenshots across the chapter edges, where one ground meets the next. usage: node edge.js <base> <outdir>
const { chromium } = require('playwright');
const base = process.argv[2], out = process.argv[3]; require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  for (const [sel, name] of [['#reserve', 'ft-rs'], ['#adventure', 'rs-ad'], ['#story', 'ad-st'], ['#faq', 'st-fq'], ['.ftr', 'fq-ftr']]) {
    await p.evaluate(s => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight / 2); }, sel);
    await p.waitForTimeout(1300); await p.screenshot({ path: `${out}/edge-${name}.png` });
  }
  await b.close();
})();
