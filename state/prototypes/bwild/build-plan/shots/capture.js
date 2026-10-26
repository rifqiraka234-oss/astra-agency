// Screens of the v2 prototype for the plan. usage: node capture.js <prototype base url>. v1's is kept in capture-v1.js.
const { chromium } = require('playwright');
const base = (process.argv[2] || 'http://localhost:8710').replace(/\/$/, ''), out = __dirname;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const go = async (w, h) => { const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage(); await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(3000); return p; };
  const at = (p, sel, f) => p.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY + Math.max(0, e.offsetHeight - innerHeight) * f); }, [sel, f]);
  const seenAt = async (p, want) => { // scroll the headlight scene until the car is about `want` metres back
    const r = await p.evaluate(() => { const s = document.querySelector('#seen'); return { top: s.offsetTop, len: s.offsetHeight - innerHeight }; });
    let lo = 0, hi = 1;
    for (let i = 0; i < 18; i++) { const m = (lo + hi) / 2; await p.evaluate(y => scrollTo(0, y), r.top + r.len * m); await p.waitForTimeout(60); const d = +(await p.evaluate(() => document.querySelector('#seen').getAttribute('data-d'))); if (d > want) lo = m; else hi = m; }
    await p.waitForTimeout(900); return p.evaluate(() => document.querySelector('#seen').getAttribute('data-d'));
  };
  let p = await go(1440, 900);
  await p.screenshot({ path: `${out}/s-hero-d.png` });
  await at(p, '#dark', .86); await p.waitForTimeout(1600); await p.screenshot({ path: `${out}/s-dark-d.png` });
  console.log('seen', await seenAt(p, 36)); await p.screenshot({ path: `${out}/s-seen-d.png` });
  await p.fill('[data-rs] input[name=email]', 'you@example.com'); await p.click('[data-rs] button[type=submit]'); await p.waitForTimeout(1800);
  await p.evaluate(() => document.querySelector('[data-bib]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/s-paid-d.png` });
  await p.evaluate(() => { const e = document.querySelectorAll('[data-seg]')[1]; scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight / 2 + 40); }); await p.waitForTimeout(3000); await p.screenshot({ path: `${out}/s-adv-d.png` });
  await at(p, '.st-pin', .1); await p.waitForTimeout(3000); await p.screenshot({ path: `${out}/s-bear-d.png` });
  p = await go(390, 844);
  await p.screenshot({ path: `${out}/s-hero-m.png` });
  await at(p, '#dark', .86); await p.waitForTimeout(1600); await p.screenshot({ path: `${out}/s-dark-m.png` });
  await b.close();
})();
