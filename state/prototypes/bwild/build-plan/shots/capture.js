// Screens of the final prototype for the plan. usage: node capture.js <prototype base url>
const { chromium } = require('playwright');
const base = (process.argv[2] || 'http://localhost:8710').replace(/\/$/, ''), out = __dirname;
(async () => {
  const b = await chromium.launch();
  const go = async (w, h) => { const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage(); await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(900); return p; };
  const to = (p, sel, dy = 0) => p.evaluate(([s, dy]) => scrollTo(0, document.querySelector(s).offsetTop + dy), [sel, dy]);
  const seenAt = async (p, want) => { // scroll the headlight scene until the runner is about `want` metres away
    const r = await p.evaluate(() => { const s = document.querySelector('#seen'); return { top: s.offsetTop, len: s.offsetHeight - innerHeight }; });
    let lo = 0, hi = 1;
    for (let i = 0; i < 18; i++) { const m = (lo + hi) / 2; await p.evaluate(y => scrollTo(0, y), r.top + r.len * m); await p.waitForTimeout(60); const d = +(await p.evaluate(() => document.querySelector('#seen').getAttribute('data-d'))); if (d > want) lo = m; else hi = m; }
    await p.waitForTimeout(600); return p.evaluate(() => document.querySelector('#seen').getAttribute('data-d'));
  };
  const hide = p => p.evaluate(() => document.querySelectorAll('.proto-note,[data-proto]').forEach(e => e.style.visibility = 'hidden'));
  let p = await go(1440, 900);
  await p.screenshot({ path: `${out}/s-hero-d.png` });
  await p.click('[data-pick="night"]'); await p.waitForTimeout(800); await p.screenshot({ path: `${out}/s-night-d.png` });
  console.log('seen', await seenAt(p, 120)); await p.screenshot({ path: `${out}/s-seen-d.png` });
  await to(p, '#dark', -70); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/s-dark-d.png` });
  await to(p, '#vest', -70); await p.waitForTimeout(2500); await p.screenshot({ path: `${out}/s-vest-d.png` });
  await p.fill('[data-rs] input[name=email]', 'you@example.com'); await p.click('[data-rs] button[type=submit]'); await p.waitForTimeout(1800);
  await p.evaluate(() => document.querySelector('[data-bib]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/s-paid-d.png` });
  await to(p, '#adventure', -70); await p.waitForTimeout(2500); await p.screenshot({ path: `${out}/s-adv-d.png` });
  p = await go(390, 844);
  await p.screenshot({ path: `${out}/s-hero-m.png` });
  console.log('seen m', await seenAt(p, 60)); await p.screenshot({ path: `${out}/s-seen-m.png` });
  await p.fill('[data-rs] input[name=email]', 'you@example.com'); await p.click('[data-rs] button[type=submit]'); await p.waitForTimeout(1800);
  await p.evaluate(() => document.querySelector('[data-bib]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/s-paid-m.png` });
  await b.close();
})();
