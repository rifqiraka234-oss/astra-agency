// Walks the page as a couple and measures the route to the letter. usage: node qa/guide-walk.js <url> <out dir>
// At every half screen from the top to the footer it records whether the bar is on, how many letter calls are on screen
// (any link to #letter, the form's fields and its send button), and whether the header button shows. A step with none of
// the three is a gap. It also screenshots the first screen, the drawing, the hall, the red and the letter.
const { chromium } = require('playwright');
const fs = require('fs');
const URL = (process.argv[2] || 'http://127.0.0.1:8711/').replace(/\/?$/, '/') + '?today=2026-10-26';
const OUT = process.argv[3] || 'guide';
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  let gaps = 0;
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desk']]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto(URL, { waitUntil: 'networkidle' }); await p.waitForTimeout(3200);
    const m = await p.evaluate(() => {
      const vh = innerHeight, y = s => { const e = document.querySelector(s); return e ? +((e.getBoundingClientRect().top + scrollY) / vh).toFixed(1) : null; };
      const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && r.top < vh && r.bottom > 0 && s.visibility !== 'hidden' && +s.opacity > 0.05; };
      return { pageVh: +(document.documentElement.scrollHeight / vh).toFixed(1), year: y('#year'), nights: y('#nights'), elise: y('#elise'), day: y('#day'), letter: y('#letter'), foot: y('.ftr'),
        firstScreen: [...document.querySelectorAll('main h1, main a, main button, main .when-big, main .offer-line')].filter(vis).map(e => e.tagName + ':' + e.textContent.trim().slice(0, 50)) };
    });
    console.log(tag, JSON.stringify(m));
    await p.screenshot({ path: `${OUT}/${tag}-0-first.png` });
    const rows = [];
    for (let v = 0; v <= m.foot + 0.5; v += 0.5) {
      await p.evaluate(v => scrollTo(0, v * innerHeight), v); await p.waitForTimeout(160);
      const r = await p.evaluate(() => {
        const vh = innerHeight;
        const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && r.top < vh - 10 && r.bottom > 10 && s.visibility !== 'hidden' && +s.opacity > 0.05; };
        const acts = [...document.querySelectorAll('main a[href="#letter"], [data-letter] input, [data-letter] .send')].filter(vis).length;
        const hb = document.querySelector('.hdr .hbtn'), hdr = hb && vis(hb);
        return { bar: document.querySelector('[data-sbar]').classList.contains('is-on'), acts, hdr };
      });
      if (!r.bar && !r.acts && !r.hdr) gaps++;
      rows.push(v + ':' + (r.bar ? 'B' : '-') + r.acts + (r.hdr ? 'h' : ''));
    }
    console.log(tag, 'route', rows.join(' '));
    const shot = async (sel, frac, name) => { await p.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY + (e.offsetHeight - innerHeight) * f); }, [sel, frac]); await p.waitForTimeout(700); await p.screenshot({ path: `${OUT}/${tag}-${name}.png` }); };
    await shot('.year-run', 0.5, '1-drawing'); await shot('#nights', 0, '2-hall'); await shot('#day', 0, '3-red'); await shot('#letter', 0, '4-letter');
    await p.close();
  }
  await b.close();
  console.log('gaps, half screens with no way to the letter', gaps);
})();
