// Screens of the final Fae Club prototype for the plan. usage: node capture.js <base url> <out dir>
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), out = process.argv[3];
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const at = async (p, f) => { await p.evaluate(f => { const t = document.querySelector('[data-tale]'); scrollTo(0, t.offsetTop + (t.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(1400); };
  for (const [tag, vp] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const p = await (await b.newContext(vp)).newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(900);
    await p.click('.ch[data-ch="fae"]'); await p.waitForTimeout(1600);
    await p.screenshot({ path: `${out}/s-hero-${tag}.png` });
    await at(p, 0.3); await p.screenshot({ path: `${out}/s-book-${tag}.png` });
    await at(p, 0.99); await p.screenshot({ path: `${out}/s-hall-${tag}.png` });
    await p.evaluate(() => { const e = document.querySelector('#solo .step'); scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight * .45); }); await p.click('#solo [data-q="1"]').catch(() => {});
    await p.evaluate(() => { const e = document.querySelector('#tickets'); scrollTo(0, e.getBoundingClientRect().top + scrollY); }); await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/s-tiers-${tag}.png` });
    await p.evaluate(() => { const e = document.querySelector('#spread'); scrollTo(0, e.getBoundingClientRect().top + scrollY); }); await p.waitForTimeout(1100);
    await p.screenshot({ path: `${out}/s-pay3-${tag}.png` });
    await p.fill('input[name="name"]', 'Morgana Vale'); await p.fill('input[name="email"]', 'morgana@example.com');
    await p.evaluate(() => { const e = document.querySelector('.pay'); scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight * .45); }); await p.click('.pay'); await p.waitForTimeout(2400);
    await p.evaluate(() => { const t = document.querySelector('.tk'); scrollTo(0, t.getBoundingClientRect().top + scrollY - (innerWidth > 760 ? 160 : 70)); }); await p.waitForTimeout(700);
    await p.screenshot({ path: `${out}/s-paid-${tag}.png` });
    await p.goto(base + '/valkyrie-retreat/', { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    await p.evaluate(() => { const e = document.querySelector('[data-rp]').closest('section'); scrollTo(0, e.getBoundingClientRect().top + scrollY); }); await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/s-rt-${tag}.png` });
    console.log(tag, 'page errors', errs.length);
  }
  await b.close();
})();
