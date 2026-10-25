const { chromium } = require('playwright');
const url = process.argv[2], mode = process.argv[3];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.addInitScript(mode => {
    window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]))).observe({ type: 'longtask', buffered: true });
    document.addEventListener('DOMContentLoaded', () => {
      const st = document.createElement('style');
      if (mode === 'nocss') st.textContent = '*,*::before,*::after{animation:none!important}';
      if (mode === 'nofilter') st.textContent = '.moon-svg,.ftr-moon svg{filter:none!important}';
      document.head.appendChild(st);
      if (mode === 'nosmil') document.querySelectorAll('svg').forEach(s => s.pauseAnimations && s.pauseAnimations());
      if (mode === 'noart') { const s = document.querySelector('script[src*="art.js"]'); }
    });
    if (mode === 'noart') { Object.defineProperty(window, 'requestIdleCallback', { value: () => 0 }); }
  }, mode);
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(8000);
  const lt = await p.evaluate(() => window.__lt.filter(x => x[0] > 2500));
  console.log(mode, 'late long tasks', lt.length, 'blocking', lt.reduce((s, x) => s + Math.max(0, x[1] - 50), 0));
  await b.close();
})();
