// The pitch's hero and phone shots, taken from the app as it is now (v2 wording).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const B = 'http://127.0.0.1:8765/site-app/';
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await d.goto(B + '#/bureau'); await d.evaluate(() => { localStorage.clear(); }); await d.reload(); await d.waitForTimeout(400);
  await d.goto(B + '#/bureau/s2'); await d.waitForTimeout(500); await d.click('[data-act=coach-x]'); await d.waitForTimeout(700);
  await d.screenshot({ path: 'site-plan/img/desk.jpg', type: 'jpeg', quality: 82 });
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await m.goto(B + '#/wegwijzer'); await m.waitForTimeout(400);
  const dd = new Date(); dd.setDate(dd.getDate() - 62); await m.fill('#d0', dd.toISOString().slice(0, 10)); await m.click('[data-act=ww-1]');
  await m.waitForTimeout(300); await m.screenshot({ path: 'site-plan/img/ww-q.jpg', type: 'jpeg', quality: 82 });
  for (const f of ['conflict', 'pva', 'loon']) await m.check(`[data-flag=${f}]`);
  await m.click('[data-act=ww-2]'); await m.waitForTimeout(500);
  await m.screenshot({ path: 'site-plan/img/ww-result.jpg', type: 'jpeg', quality: 82 });
  await m.evaluate(() => window.scrollTo(0, document.querySelector('.flags').getBoundingClientRect().top + window.scrollY - 80)); await m.waitForTimeout(300);
  await m.screenshot({ path: 'site-plan/img/ww-flags.jpg', type: 'jpeg', quality: 82 });
  await b.close();
})();
