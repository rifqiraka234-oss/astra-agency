// Pitch v2, phone sized crops of the same Laura card, so the text stays readable at 390
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const B = 'http://127.0.0.1:8765/site-app/';
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await p.goto(B + '#/bureau'); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(400);
  const x = await p.$('[data-act=coach-x]'); if (x) { await x.click(); await p.waitForTimeout(200); }
  const tall = '.desk{height:auto!important}.card,.list{overflow:visible!important}.actions{position:static!important}.letter{max-height:none!important}';
  await p.goto(B + '#/bureau/s4'); await p.waitForTimeout(400); await p.addStyleTag({ content: tall }); await p.evaluate(() => document.querySelectorAll('body *').forEach(e => { const ps = getComputedStyle(e).position; if (ps === 'fixed' || ps === 'sticky') e.style.display = 'none'; })); await p.waitForTimeout(250);
  const shot = async (title, out, maxH) => {
    const r = await p.evaluate(t => { const h = [...document.querySelectorAll('.card .block h3')].find(x => x.textContent.trim().startsWith(t)); if (!h) return null; const a = h.closest('.block').getBoundingClientRect(); return { x: Math.max(a.left - 10, 0), y: a.top + window.scrollY - 4, w: Math.min(a.width + 20, 390), h: a.height + 6 }; }, title);
    if (!r) { console.log('missing', title); return; }
    await p.screenshot({ path: out, type: 'jpeg', quality: 86, fullPage: true, clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, maxH || r.h) } });
    console.log(out, JSON.stringify(r));
  };
  await shot('Uit het bericht', 'site-plan/img/m2-facts.jpg');
  await shot('Termijnen', 'site-plan/img/m2-terms.jpg');
  await shot('Conflictcheck', 'site-plan/img/m3-conflict.jpg');
  await shot('Conceptantwoord', 'site-plan/img/m4-reply.jpg');
  await b.close();
})();
