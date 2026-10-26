// which elements push the page wider than the phone. usage: node overflow.js <base>
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto((process.argv[2] || 'http://localhost:8710') + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const out = [], W = innerWidth;
    document.querySelectorAll('body *').forEach(e => {
      const r = e.getBoundingClientRect(); if (r.width === 0) return;
      if (r.right > W + .5 || r.left < -.5) {
        let a = e.parentElement, clipped = false;
        while (a && a !== document.body) { const o = getComputedStyle(a); if (/(hidden|clip)/.test(o.overflowX) && a.getBoundingClientRect().right <= W + .5) { clipped = true; break; } if (o.position === 'fixed') break; a = a.parentElement; }
        if (!clipped) out.push((e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) + ' <' + e.tagName + '> ' + Math.round(r.left) + '..' + Math.round(r.right));
      }
    });
    return { sw: document.documentElement.scrollWidth, W, out: out.slice(0, 30) };
  });
  console.log(JSON.stringify(r, null, 1)); await b.close();
})();
