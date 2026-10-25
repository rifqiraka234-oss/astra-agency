const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-astra-agency/3eb57ba4-cf6b-5d03-9c5f-6f974020ac75/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const pages = ['/', '/entreprises/', '/privatisation/', '/devis/', '/devis/merci/', '/menu/', '/equipe/', '/commander/', '/mentions-legales/', '/confidentialite/'].map(x => ['http://127.0.0.1:8791', x]).concat(process.env.PLAN ? [['http://127.0.0.1:8792', '/']] : []);
  let total = 0;
  for (const lang of ['fr', 'en']) for (const w of [1440, 390]) for (const [host, path] of pages) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    await p.goto(host + path + (lang === 'en' ? '?lang=en' : ''), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let t = 0; t < document.body.scrollHeight; t += 400) { scrollTo(0, t); await new Promise(r => setTimeout(r, 20)); } scrollTo(0, 0); });
    await p.waitForTimeout(2500);
    await p.addScriptTag({ content: AXE });
    const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, t: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join(' ')) })));
    total += r.length;
    if (r.length) console.log(lang, w, host.slice(-4), path, JSON.stringify(r, null, 1));
    await p.close();
  }
  console.log('violation types total', total);
  await b.close();
})();
