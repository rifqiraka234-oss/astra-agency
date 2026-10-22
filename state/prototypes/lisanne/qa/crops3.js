// Pitch v2 crops, one case (Laura Smeets, sample s4) followed through the four steps
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const B = 'http://127.0.0.1:8765/site-app/';
  const p = await b.newPage({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(B + '#/bureau'); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(400);
  await p.click('[data-act=coach-x]'); await p.waitForTimeout(200);
  const tall = '.desk{height:auto!important}.card,.list{overflow:visible!important}.actions{position:static!important}.letter{max-height:none!important}';
  await p.goto(B + '#/bureau/s4'); await p.waitForTimeout(400); await p.addStyleTag({ content: tall }); await p.waitForTimeout(250);
  const lr = await p.evaluate(() => { const l = document.querySelector('.list'); const a = l.getBoundingClientRect(); return { x: a.left, y: a.top + window.scrollY, w: a.width, h: a.height }; });
  console.log('list rect', JSON.stringify(lr));
  await p.screenshot({ path: 'site-plan/img/f1-list.jpg', type: 'jpeg', quality: 86, fullPage: true, clip: { x: lr.x, y: lr.y, width: lr.w, height: Math.min(lr.h, 720) } });
  const shot = async (title, out, maxH) => {
    const r = await p.evaluate(t => { const h = [...document.querySelectorAll('.card .block h3')].find(x => x.textContent.trim().startsWith(t)); const a = h.closest('.block').getBoundingClientRect(); return { x: a.left - 14, y: a.top + window.scrollY - 4, w: a.width + 28, h: a.height + 6 }; }, title);
    await p.screenshot({ path: out, type: 'jpeg', quality: 86, fullPage: true, clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, maxH || r.h) } });
  };
  await shot('Uit het bericht', 'site-plan/img/f2-facts.jpg');
  await shot('Termijnen', 'site-plan/img/f2-terms.jpg');
  await shot('Conflictcheck', 'site-plan/img/f3-conflict.jpg');
  await shot('Conceptantwoord', 'site-plan/img/f4-reply.jpg');
  await b.close();
})();
