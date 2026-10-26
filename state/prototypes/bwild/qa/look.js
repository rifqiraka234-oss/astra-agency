// Screenshots of every chapter at phone and desktop, with script errors listed. usage: node look.js <base> <outdir> [w,h ...]
const { chromium } = require('playwright');
const base = (process.argv[2] || 'http://localhost:8710').replace(/\/$/, ''), out = process.argv[3] || '/tmp/claude-0/-home-user-astra-agency/535b0528-0e36-5b6e-a11b-9344c62d2e80/scratchpad/bwild/look';
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[1440, 900, 'desk'], [390, 844, 'phone']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(900);
    await p.screenshot({ path: `${out}/${tag}-0-hero.png` });
    await p.click('[data-pick="night"]'); await p.waitForTimeout(700);
    await p.screenshot({ path: `${out}/${tag}-1-hero-night.png` });
    for (const f of [0.1, 0.5, 0.62, 0.98]) {
      await p.evaluate(f => { const s = document.querySelector('#seen'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(500);
      await p.screenshot({ path: `${out}/${tag}-2-hl-${Math.round(f * 100)}.png` });
    }
    for (const id of ['dark', 'vest', 'reserve', 'story', 'adventure', 'faq']) {
      await p.evaluate(id => { const s = document.getElementById(id); scrollTo(0, s.offsetTop - 60); }, id); await p.waitForTimeout(600);
      await p.screenshot({ path: `${out}/${tag}-3-${id}.png` });
    }
    console.log(tag, 'errors', errs.length, errs.slice(0, 4), 'scrollW', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
    await p.close();
  }
  await b.close();
})();
