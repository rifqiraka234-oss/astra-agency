const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const B = 'http://127.0.0.1:8765/site-app/';
  const p = await b.newPage({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(B + '#/bureau'); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(400);
  await p.click('[data-act=coach-x]'); await p.waitForTimeout(200);
  const tall = '.desk{height:auto!important}.card,.list{overflow:visible!important}.actions{position:static!important}.letter{max-height:none!important}.draft{min-height:0!important;height:300px!important}';
  const shot = async (id, title, out, maxH) => {
    await p.goto(B + '#/bureau/' + id); await p.waitForTimeout(400); await p.addStyleTag({ content: tall }); await p.waitForTimeout(250);
    const r = await p.evaluate(t => { const h = [...document.querySelectorAll('.card .block h3')].find(x => x.textContent.trim().startsWith(t)); const a = h.closest('.block').getBoundingClientRect(); return { x: a.left - 14, y: a.top + window.scrollY - 4, w: a.width + 28, h: a.height + 6 }; }, title);
    await p.screenshot({ path: out, type: 'jpeg', quality: 86, fullPage: true, clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, maxH || r.h) } });
  };
  await shot('s3', 'Uit het bericht', 'site-plan/img/c1-facts.jpg');
  await shot('s3', 'Termijnen', 'site-plan/img/c2-terms.jpg');
  await shot('s4', 'Conflictcheck', 'site-plan/img/c3-conflict.jpg');
  await shot('s3', 'Concept antwoord', 'site-plan/img/c4-reply.jpg', 330);
  await b.close();
})();
