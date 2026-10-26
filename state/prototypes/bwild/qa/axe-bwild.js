// axe over the BWILD prototype, desktop and phone, with motion and with reduced motion, after a full scroll.
// usage: node axe-bwild.js <base url>
const { chromium } = require('playwright');
const AXE = require('fs').readFileSync('/tmp/claude-0/agents/axe/axe.min.js', 'utf8');
const base = process.argv[2].replace(/\/$/, '');
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm })).newPage();
    await p.goto(base + '/', { waitUntil: 'networkidle' });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.waitForTimeout(1200);
    for (const at of ['end', 'top', 'seen']) {
      if (at === 'top') await p.evaluate(() => scrollTo(0, 0));
      if (at === 'seen') await p.evaluate(() => { const s = document.querySelector('#seen') || document.querySelector('#dark'); scrollTo(0, s.offsetTop + s.offsetHeight * 0.5); });
      await p.waitForTimeout(500);
      await p.addScriptTag({ content: AXE });
      const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 12).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })));
      console.log(rm, w, at, r.length ? '' : 'clean'); r.forEach(v => console.log('   ', v.impact, v.id, v.n, JSON.stringify(v.ex).slice(0, 2500)));
    }
  }
  await b.close();
})();
