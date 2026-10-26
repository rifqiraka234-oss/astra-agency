// Walks the BWILD home as a runner and measures the route to the reserve. usage: node walk.js <base url> [outdir]
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), OUT = process.argv[3] || 'walk';
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desk']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(base + '/', { waitUntil: 'load' }); await p.waitForTimeout(800);
    const m = await p.evaluate(() => {
      const vh = innerHeight, y = s => { const e = document.querySelector(s); return e ? +((e.getBoundingClientRect().top + scrollY) / vh).toFixed(1) : null; };
      const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && r.top < vh && r.bottom > 0 && s.visibility !== 'hidden' && +s.opacity > 0.05; };
      const first = [...document.querySelectorAll('main a, main button, main h1, main h2, main p, main select')].filter(vis).map(e => e.tagName + ' ' + e.textContent.trim().replace(/\s+/g, ' ').slice(0, 70));
      return { pageVh: +(document.documentElement.scrollHeight / vh).toFixed(1), seen: y('#seen'), dark: y('#dark'), vest: y('#vest'), reserve: y('#reserve'), story: y('#story'), adventure: y('#adventure'), faq: y('#faq'), foot: y('.ftr'), first };
    });
    console.log(tag, JSON.stringify(m, null, 1));
    const rows = [], gaps = [];
    for (let v = 0; v <= m.foot + 0.5; v += 0.5) {
      await p.evaluate(v => scrollTo(0, v * innerHeight), v); await p.waitForTimeout(160);
      const r = await p.evaluate(() => {
        const vh = innerHeight;
        const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && r.top < vh - 10 && r.bottom > 10 && s.visibility !== 'hidden' && +s.opacity > 0.05 && !e.closest('[inert]') && !e.closest('[aria-hidden="true"]'); };
        const acts = [...document.querySelectorAll('main a[href="#reserve"], main [data-rs]')].filter(vis).length;
        const buy = [...document.querySelectorAll('main [data-add]')].filter(vis).length;
        const sb = document.querySelector('[data-sbar]').classList.contains('on');
        return { sb, acts, buy, hdr: [...document.querySelectorAll('.hdr a[href="#reserve"]')].some(vis) };
      });
      rows.push(v + ':' + (r.sb ? 'S' : '-') + r.acts + (r.buy ? 'b' : '') + (r.hdr ? 'h' : ''));
      if (!r.sb && !r.acts && !r.hdr) gaps.push(v);
    }
    console.log(tag, 'route', rows.join(' '));
    console.log(tag, 'no way to reserve on screen at', gaps.length ? gaps.join(', ') : 'nowhere');
    for (const [s, f] of [['#seen', 0.3], ['#seen', 0.75], ['#seen', 0.97], ['#dark', 0], ['#reserve', 0]]) {
      await p.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.offsetTop + Math.max(0, e.offsetHeight - innerHeight) * f); }, [s, f]); await p.waitForTimeout(500);
      await p.screenshot({ path: `${OUT}/${tag}-${s.slice(1)}-${Math.round(f * 100)}.png` });
    }
    await p.close();
  }
  await b.close();
})();
