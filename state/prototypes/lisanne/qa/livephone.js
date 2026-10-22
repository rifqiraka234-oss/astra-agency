// Live, on a phone emulation, both sites, cold, through the real network path.
const { chromium, devices } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  for (const [w, h] of [[390, 844], [360, 780]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: devices['iPhone 13'].userAgent });
    const p = await ctx.newPage(); const errs = [], bad = []; p.on('pageerror', e => errs.push(String(e))); p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); }); p.on('requestfailed', r => bad.push('FAIL ' + r.url()));
    await p.goto('https://astra-dejongvanhommerig-plan.netlify.app/', { waitUntil: 'load', timeout: 60000 }); await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(150); }
    await p.waitForTimeout(1500);
    const st = await p.evaluate(() => ({ imgs: document.images.length, broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.currentSrc), phoneCrops: [...document.images].filter(i => /\/m\d-/.test(i.currentSrc)).length, over: document.documentElement.scrollWidth - innerWidth, rv: document.querySelectorAll('.rv.on').length + '/' + document.querySelectorAll('.rv').length }));
    console.log(w, 'PITCH', JSON.stringify(st), 'errors', JSON.stringify(errs), 'bad', JSON.stringify(bad));
    const q = await ctx.newPage(); const e2 = []; q.on('pageerror', e => e2.push(String(e)));
    await q.goto('https://astra-dejongvanhommerig-prototype.netlify.app/#/bureau', { waitUntil: 'load', timeout: 60000 }); await q.waitForTimeout(1200);
    await q.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await q.waitForTimeout(300); await q.tap('[data-open="s4"]'); await q.waitForTimeout(600);
    const c = await q.evaluate(() => ({ y: window.scrollY, name: document.querySelector('.card h2').textContent, lane: document.querySelector('.card-head .chip.lane').textContent, hold: !!document.querySelector('.hold'), btn: document.querySelector('[data-act=approve]').textContent.trim(), draftHasDeadline: /Let op, er loopt een termijn/.test(document.querySelector('#draft').value) }));
    await q.tap('[data-act=approve]'); await q.waitForTimeout(500); const toast = await q.evaluate(() => document.querySelector('#toast').textContent);
    console.log(w, 'APP', JSON.stringify(c), 'toast', toast.slice(0, 90), 'errors', JSON.stringify(e2));
    await ctx.close();
  }
  await b.close();
})();
