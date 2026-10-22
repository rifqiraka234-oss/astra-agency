const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  for (const [w, h, t] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const errs = [], bad = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); }); p.on('requestfailed', r => bad.push('FAIL ' + r.url() + ' ' + (r.failure() || {}).errorText));
    const r = await p.goto('https://astra-dejongvanhommerig-plan.netlify.app/', { waitUntil: 'load', timeout: 60000 }).catch(e => null);
    await p.waitForTimeout(2500); const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(1000);
    const st = await p.evaluate(() => ({ title: document.title, rv: [...document.querySelectorAll('.rv')].length, on: [...document.querySelectorAll('.rv.on')].length, broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src), fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family).filter((v, i, a) => a.indexOf(v) === i) }));
    console.log(t, 'PLAN', r && r.status(), JSON.stringify(st), 'errs', JSON.stringify(errs), 'bad', JSON.stringify(bad.slice(0, 5)));
    await p.evaluate(() => window.scrollTo(0, 0)); await p.screenshot({ path: `qa/live-plan-${t}.png` });
    const errs2 = []; const q = await b.newPage({ viewport: { width: w, height: h } }); q.on('pageerror', e => errs2.push(String(e)));
    const r2 = await q.goto('https://astra-dejongvanhommerig-prototype.netlify.app/#/bureau/s4', { waitUntil: 'load', timeout: 60000 }).catch(e => null); await q.waitForTimeout(1500);
    const c = await q.evaluate(() => ({ title: document.title, card: !!document.querySelector('.card h2'), name: (document.querySelector('.card h2') || {}).textContent, conflict: !!document.querySelector('.conflict.hit') }));
    await q.click('[data-act=approve]'); await q.waitForTimeout(400); const ok = await q.evaluate(() => !!document.querySelector('.status'));
    await q.goto('https://astra-dejongvanhommerig-prototype.netlify.app/#/wegwijzer'); await q.waitForTimeout(500);
    const d0 = new Date(); d0.setDate(d0.getDate() - 40); await q.fill('#d0', d0.toISOString().slice(0, 10)); await q.click('[data-act=ww-1]'); await q.click('[data-act=ww-2]'); await q.waitForTimeout(300);
    const wk = await q.evaluate(() => (document.querySelector('.week .n') || {}).textContent);
    await q.screenshot({ path: `qa/live-app-${t}.png` });
    console.log(t, 'APP', r2 && r2.status(), JSON.stringify(c), 'approved', ok, 'week', wk, 'errs', JSON.stringify(errs2));
    await p.close(); await q.close();
  }
  await b.close();
})();
