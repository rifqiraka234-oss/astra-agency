// axe on the states the route adds, the phone menu open and the hall's call on screen, full motion.
const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync('/tmp/claude-0/agents/axe/axe.min.js', 'utf8');
const base = (process.argv[2] || 'http://127.0.0.1:8704').replace(/\/$/, '');
(async () => {
  const b = await chromium.launch();
  const run = async (p, tag) => { await p.addScriptTag({ content: AXE }); const r = await p.evaluate(async () => (await axe.run(document, { resultTypes: ['violations'] })).violations.map(v => v.id + ' ' + v.nodes.length)); console.log(tag, r.length ? r : 'clean'); };
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    await p.evaluate(() => { const t = document.querySelector('[data-tale]'); scrollTo(0, t.offsetTop + (t.offsetHeight - innerHeight) * 0.999); }); await p.waitForTimeout(700);
    await run(p, w + ' hall call on screen');
    await p.evaluate(() => scrollTo(0, innerHeight * 3)); await p.waitForTimeout(500);
    await run(p, w + ' mid book, bar on');
    if (w === 390) { await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await p.click('.mbtn'); await p.waitForTimeout(300); await run(p, w + ' menu open'); }
  }
  await b.close();
})();
