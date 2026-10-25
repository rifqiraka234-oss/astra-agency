// node axe.js   axe-core on every page, English and Dutch, 1440 and 390, after a full scroll so every reveal has run.
// CONTROL=1 plants an image with no alt and a low contrast line, and the run only counts if both are reported.
const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-astra-agency/3eb57ba4-cf6b-5d03-9c5f-6f974020ac75/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const { pages } = require('./pages');
(async () => {
  const b = await chromium.launch();
  let total = 0;
  const list = process.env.CONTROL ? [pages[0]] : pages;
  for (const lang of ['en', 'nl']) for (const w of [1440, 390]) for (const [host, path] of list) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: process.env.MOTION ? 'no-preference' : 'reduce' });
    await p.goto(host + path + (lang === 'nl' ? '?lang=nl' : ''), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let t = 0; t < document.body.scrollHeight; t += 400) { scrollTo(0, t); await new Promise(r => setTimeout(r, 20)); } scrollTo(0, 0); });
    await p.waitForTimeout(1500);
    if (process.env.CONTROL) await p.evaluate(() => { const m = document.querySelector('main'); m.insertAdjacentHTML('afterbegin', '<img src="/assets/favicon.svg" width="10" height="10"><p style="color:#222;background:#111">low contrast control</p>'); });
    await p.addScriptTag({ content: AXE });
    const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, t: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join(' ')) })));
    total += r.length;
    if (r.length) console.log(lang, w, host.slice(-4), path, JSON.stringify(r, null, 1));
    await p.close();
  }
  console.log('violation types total', total);
  await b.close();
})();
