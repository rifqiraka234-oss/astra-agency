// axe on the Fae Club plan, desktop and phone, reduced motion and full motion, controls in both states
const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync('/tmp/claude-0/agents/axe/axe.min.js', 'utf8');
const base = (process.argv[2] || 'http://127.0.0.1:8705').replace(/\/$/, '');
(async () => {
  const b = await chromium.launch(); let total = 0;
  for (const rm of ['reduce', 'no-preference']) for (const [w, h] of [[1280, 860], [390, 844]]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm });
    const p = await c.newPage();
    await p.goto(base + '/', { waitUntil: 'networkidle' });
    for (const state of ['default', 'switched']) {
      if (state === 'switched') { await p.click('[data-when="n"]'); await p.click('[data-show="today"]'); await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true)); }
      // scroll through so every section has been on screen, then sit at the top
      for (let y = 0; y < 40; y++) { await p.evaluate(() => scrollBy(0, innerHeight * 0.8)); await p.waitForTimeout(60); }
      await p.waitForTimeout(900);
      await p.addScriptTag({ content: AXE });
      const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })));
      total += r.length;
      console.log(rm, w, state, r.length ? '' : 'clean');
      r.forEach(v => console.log('   ', v.impact, v.id, v.n, JSON.stringify(v.ex).slice(0, 500)));
      await p.evaluate(() => scrollTo(0, 0));
    }
    await c.close();
  }
  await b.close(); console.log('violations', total);
})();
