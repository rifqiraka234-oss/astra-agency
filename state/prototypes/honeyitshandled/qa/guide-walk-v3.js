// The route to the reply on both pages at 390 and 1440 (Fae Club v3 walk). usage:
//   NODE_PATH=... node qa/guide-walk-v3.js <base url> <out dir> [plant]
// At every half screen from the top to the footer, records whether the bar is drawn, how many calls to the reply are on
// screen (any [data-cta] in the view, the reply's fields and send) and whether the header button shows. A half screen with
// none of the three is a gap. Screenshots the first screen and the peak of each page. With "plant", the bar is switched off.
const { chromium } = require('playwright');
const fs = require('fs');
const base = (process.argv[2] || 'http://127.0.0.1:8761').replace(/\/$/, ''), OUT = process.argv[3] || 'guide-v3', plant = process.argv[4] === 'plant';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
  let gaps = 0;
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desk']]) for (const page of ['wedding', 'events']) {
    const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 600, hasTouch: w < 600 });
    const p = await c.newPage(); await p.goto(base + '/?today=2026-10-26' + (page === 'events' ? '#events' : ''), { waitUntil: 'load' }); await p.waitForTimeout(900);
    if (plant) await p.addStyleTag({ content: '.bar{display:none!important}' });
    const first = await p.evaluate(page => { const inV = e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && r.width > 0; }; const c = document.querySelector((page === 'events' ? '#events' : '#home') + ' [data-hero-cta]'); return inV(c) ? c.textContent.trim().replace(/\s+/g, ' ') : 'NOT ON THE FIRST SCREEN'; }, page);
    await p.screenshot({ path: `${OUT}/${tag}-${page}-0-first.png` });
    const foot = await p.evaluate(() => (document.querySelector('.foot').getBoundingClientRect().top + scrollY) / innerHeight);
    const rows = []; let g = 0;
    for (let v = 0; v <= foot + 0.5; v += 0.5) {
      await p.evaluate(v => scrollTo(0, v * innerHeight), v); await p.mouse.wheel(0, 1); await p.waitForTimeout(160);
      const r = await p.evaluate(page => {
        const vh = innerHeight, hb = document.querySelector('[data-hdr]').getBoundingClientRect().bottom, sb = document.querySelector('[data-bar]');
        const bs = getComputedStyle(sb), bar = sb.classList.contains('on') && bs.display !== 'none';
        const bt = bar ? vh - sb.offsetHeight : vh;
        const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return e.offsetParent !== null && r.width > 0 && r.height > 0 && r.top < bt - 6 && r.bottom > hb + 6 && s.visibility !== 'hidden' && +s.opacity > 0.05; };
        const scope = page === 'events' ? '#events' : '#home', form = page === 'events' ? 'form[data-reply="event"]' : 'form[data-reply="wedding"]';
        const acts = [...document.querySelectorAll(`${scope} [data-cta], ${form} input:not([type=hidden]), ${form} textarea, ${form} select, ${form} .send`)].filter(e => !e.closest('.nl') && !e.classList.contains('hbtn')).filter(vis).length;
        const hbtn = [...document.querySelectorAll('.hdr .hbtn')].find(x => getComputedStyle(x).display !== 'none'), hdr = !!hbtn;
        return { bar, acts, hdr };
      }, page);
      if (!r.bar && !r.acts && !r.hdr) g++;
      rows.push(v + ':' + (r.bar ? 'B' : '-') + r.acts + (r.hdr ? 'h' : ''));
    }
    gaps += g;
    await p.evaluate(page => document.querySelector(page === 'events' ? '#ev-team' : '.dance-stage').scrollIntoView(), page); await p.waitForTimeout(800); await p.screenshot({ path: `${OUT}/${tag}-${page}-1-peak.png` });
    console.log(tag, page.padEnd(8), 'first screen', JSON.stringify(first), '| gaps', g, '| page', foot.toFixed(1), 'screens');
    console.log('   ', rows.join(' '));
    await c.close();
  }
  await b.close();
  console.log('half screens with no way to the reply', gaps + (plant ? ' (plant mode, should be more than 0)' : ''));
})();
