const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const B = 'http://127.0.0.1:8765/site-app/';
  const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(B + '#/bureau'); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(500);
  await p.click('[data-act=coach-x]'); await p.waitForTimeout(300);
  const tall = '.desk{height:auto!important}.card,.list{overflow:visible!important}.actions{position:static!important}.letter{max-height:none!important}';
  // step 1, the list
  await p.goto(B + '#/bureau/s2'); await p.waitForTimeout(500);
  await p.screenshot({ path: '../lisanne/site-plan/img/s1-list.jpg', type: 'jpeg', quality: 84, clip: { x: 0, y: 34, width: 436, height: 700 } });
  await p.addStyleTag({ content: tall }); await p.waitForTimeout(200);
  // step 2, facts and terms for Dennis
  await p.goto(B + '#/bureau/s3'); await p.waitForTimeout(500); await p.addStyleTag({ content: tall }); await p.waitForTimeout(300);
  const blocks = async (from, to, out) => {
    const r = await p.evaluate(([f, t]) => { const hs = [...document.querySelectorAll('.card .block h3')]; const a = hs.find(h => h.textContent.trim().startsWith(f)).closest('.block').getBoundingClientRect(); const z = hs.find(h => h.textContent.trim().startsWith(t)).closest('.block').getBoundingClientRect(); return { x: a.left - 16, y: a.top + window.scrollY - 6, w: a.width + 32, h: z.bottom - a.top + 12 }; }, [from, to]);
    await p.screenshot({ path: out, type: 'jpeg', quality: 84, fullPage: true, clip: { x: r.x, y: r.y, width: r.w, height: r.h } });
  };
  await blocks('Uit het bericht', 'Termijnen', 'site-plan/img/s2-facts.jpg');
  await p.goto(B + '#/bureau/s4'); await p.waitForTimeout(500); await p.addStyleTag({ content: tall }); await p.waitForTimeout(300);
  await blocks('Conflictcheck', 'Concept antwoord', 'site-plan/img/s3-conflict.jpg');
  await p.goto(B + '#/bureau/s2'); await p.waitForTimeout(500); await p.addStyleTag({ content: tall }); await p.waitForTimeout(300);
  await blocks('Concept opdrachtbevestiging', 'Concept opdrachtbevestiging', 'site-plan/img/s4-letter.jpg');
  await b.close();
})();
