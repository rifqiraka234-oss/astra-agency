const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const W = [320, 360, 390, 414, 768, 1024, 1280, 1440, 1920];
  const U = ['site-plan/', 'site-app/#/', 'site-app/#/bureau', 'site-app/#/bureau/s1', 'site-app/#/bureau/s2', 'site-app/#/bureau/s3', 'site-app/#/bureau/s4', 'site-app/#/termijnen', 'site-app/#/resultaten', 'site-app/#/instellingen', 'site-app/#/wegwijzer'];
  let loads = 0; const bad = [];
  for (const w of W) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
    for (const u of U) {
      await p.goto('http://127.0.0.1:8765/' + u); await p.waitForTimeout(350); loads++;
      const r = await p.evaluate(() => { const o = document.documentElement.scrollWidth - innerWidth; const spill = []; document.querySelectorAll('h1,h2,h3,.btn,.chip,.kpi b,.nm,.term .d,.terms b,.plan b').forEach(e => { if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow !== 'visible') spill.push(e.className + ':' + e.textContent.slice(0, 30)); const r = e.getBoundingClientRect(); if (r.right > innerWidth + 1) spill.push('offscreen ' + e.textContent.slice(0, 30)); }); return { o, spill: spill.slice(0, 4) }; });
      if (r.o > 0 || r.spill.length || errs.length) bad.push(w + ' ' + u + ' ' + JSON.stringify(r) + ' ' + errs.join(' '));
    }
    await p.close();
  }
  console.log('loads', loads, 'problems', bad.length); bad.forEach(x => console.log(x));
  await b.close();
})();
