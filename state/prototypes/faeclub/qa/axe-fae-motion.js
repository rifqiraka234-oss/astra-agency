const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync('/tmp/claude-0/agents/axe/axe.min.js', 'utf8');
(async () => {
  const b = await chromium.launch();
  for (const U of ['http://127.0.0.1:8704/', 'http://127.0.0.1:8704/valkyrie-retreat/']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await p.goto(U, { waitUntil: 'networkidle' });
    // scroll through so every section has had its moment, then check from the end
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.waitForTimeout(1500);
    await p.addScriptTag({ content: AXE });
    const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 40).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })));
    console.log('motion', U, w, r.length ? '' : 'clean'); r.forEach(v => console.log('   ', v.impact, v.id, v.n, JSON.stringify(v.ex).slice(0, 6000)));
  }
  await b.close();
})();
