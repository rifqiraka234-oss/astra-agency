// the element whose content reaches furthest right at a given width. usage: node overflow2.js <base> <width>
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const w = +process.argv[3] || 320;
  const p = await b.newPage({ viewport: { width: w, height: 740 } });
  await p.goto(process.argv[2] + '/', { waitUntil: 'load' }); await p.waitForTimeout(1200);
  console.log(JSON.stringify(await p.evaluate(() => {
    const W = innerWidth, out = [];
    document.querySelectorAll('body *').forEach(e => {
      const r = e.getBoundingClientRect(); const reach = Math.max(r.right, r.left + e.scrollWidth);
      if (reach > W + 1 && getComputedStyle(e).position !== 'fixed') out.push([Math.round(reach), e.tagName, String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).slice(0, 40), (e.textContent || '').trim().slice(0, 30)]);
    });
    return { sw: document.documentElement.scrollWidth, body: document.body.scrollWidth, out: out.sort((a, b) => b[0] - a[0]).filter(x => x[0] < 400), canScroll: (scrollTo(200, scrollY), scrollX) };
  }), null, 1)); await b.close();
})();
