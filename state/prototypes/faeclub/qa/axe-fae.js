const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync('/tmp/claude-0/agents/axe/axe.min.js', 'utf8');
(async () => {
  const b = await chromium.launch();
  const urls = ['http://127.0.0.1:8704/', 'http://127.0.0.1:8704/valkyrie-retreat/'];
  for (const [w, h] of [[1280, 860], [390, 844]]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const p = await c.newPage();
    for (const u of urls) {
      await p.goto(u, { waitUntil: 'networkidle' });
      await p.addScriptTag({ content: AXE });
      const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })));
      console.log(w, u, r.length ? '' : 'clean');
      r.forEach(v => console.log('   ', v.impact, v.id, v.n, JSON.stringify(v.ex).slice(0, 400)));
    }
    await c.close();
  }
  await b.close();
})();
