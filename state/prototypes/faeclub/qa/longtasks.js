const { chromium } = require('playwright');
const url = process.argv[2];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.addInitScript(() => { window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]))).observe({ type: 'longtask', buffered: true }); });
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(9000);
  const lt = await p.evaluate(() => window.__lt);
  const fcp = await p.evaluate(() => (performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime);
  console.log('fcp', Math.round(fcp), 'long tasks', lt.length, 'blocking', lt.reduce((s, x) => s + Math.max(0, x[1] - 50), 0), JSON.stringify(lt.slice(0, 30)));
  await b.close();
})();
