const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const AXE = require('fs').readFileSync('/tmp/claude-0/agents/axe/axe.min.js', 'utf8');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const pages = [['plan', 'http://127.0.0.1:8765/site-plan/'], ['start', 'http://127.0.0.1:8765/site-app/#/'], ['desk-s4', 'http://127.0.0.1:8765/site-app/#/bureau/s4'], ['desk-s2', 'http://127.0.0.1:8765/site-app/#/bureau/s2'], ['termijnen', 'http://127.0.0.1:8765/site-app/#/termijnen'], ['resultaten', 'http://127.0.0.1:8765/site-app/#/resultaten'], ['instellingen', 'http://127.0.0.1:8765/site-app/#/instellingen'], ['ww1', 'http://127.0.0.1:8765/site-app/#/wegwijzer']];
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    for (const [n, u] of pages) {
      await p.goto(u); await p.waitForTimeout(900);
      await p.addScriptTag({ content: AXE });
      const r = await p.evaluate(async () => { const res = await axe.run(document, { resultTypes: ['violations'] }); return res.violations.map(v => v.impact + ' ' + v.id + ' x' + v.nodes.length + ' ' + v.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' | ')); });
      console.log(w, n, r.length ? '\n  ' + r.join('\n  ') : 'clean');
    }
    await ctx.close();
  }
  await b.close();
})();
