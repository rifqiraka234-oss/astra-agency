// imagery: Raka's brief, point 3. At least 40 percent of every screen is photo, film, 3D or their mark, the hero at least
// 60 percent. Measured the way check-build measures the first screen, a 24 by 16 grid and the topmost thing at each point,
// one screen at a time down every page, at 1440 and 390, then again half a screen further down so no seam goes unmeasured.
// The plant hides every picture on one page, and the check has to fail it.
// node qa/imagery.js [base] [page ...]
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const [BASE = 'http://127.0.0.1:5310', ...ARGS] = process.argv.slice(2);
const PAGES = ARGS.length ? ARGS : ['/', '/weihnachtsfeier/', '/menues/', '/referenzen/', '/ueber-uns/', '/kontakt/'];
const PLANT = 'img,picture,video,canvas,svg{visibility:hidden!important}';
async function measure(b, pg, w, h, plant) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 500, hasTouch: w < 500 });
  const p = await ctx.newPage(); await p.goto(BASE + pg, { waitUntil: 'load' }); await p.waitForTimeout(3000);
  if (plant) await p.addStyleTag({ content: PLANT });
  const total = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const out = [];
  for (const off of [0, .5]) for (let y = off * h, i = 0; y <= total + 1; y += h, i++) {
    if (off && y > total) break;
    await p.evaluate(v => scrollTo(0, v), Math.min(y, total)); await p.waitForTimeout(1200);
    const r = await p.evaluate(() => {
      const st = document.createElement('style'); st.textContent = '*{pointer-events:auto!important}'; document.head.appendChild(st);
      const opac = e => { let o = 1; for (let x = e; x && x.nodeType === 1; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; };
      const alpha = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return 0; const v = m[1].split(/[ ,/]+/).filter(Boolean); return v.length > 3 ? +v[3] : 1; };
      const at = (x, y) => { for (const e of document.elementsFromPoint(x, y)) {
        if (e === document.body || e === document.documentElement) continue; const t = e.tagName; if (opac(e) < 0.2) continue;
        if (getComputedStyle(e).visibility === 'hidden') continue;
        if (t === 'IMG' || t === 'VIDEO' || t === 'CANVAS' || t === 'PICTURE') return true;
        if (t === 'svg' || t === 'SVG') { const r = e.getBoundingClientRect(); if (r.width * r.height >= 0.08 * innerWidth * innerHeight) return true; }
        const s = getComputedStyle(e);
        if (/url\(/.test(s.backgroundImage) && !/repeat(?!-)/.test(s.backgroundRepeat.replace('no-repeat', ''))) { const r = e.getBoundingClientRect(); if (r.width * r.height >= 0.08 * innerWidth * innerHeight) return true; }
        if (alpha(s.backgroundColor) >= 0.95 && opac(e) >= 0.95) return false; } return false; };
      let n = 0, hit = 0; for (let i = 0; i < 24; i++) for (let j = 0; j < 16; j++) { n++; if (at((i + .5) * innerWidth / 24, (j + .5) * innerHeight / 16)) hit++; }
      st.remove(); return Math.round(hit / n * 100);
    });
    out.push({ y: Math.round(Math.min(y, total)), share: r, need: y === 0 ? 60 : 40 });
  }
  await ctx.close();
  return out;
}
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const lines = []; let fails = 0;
  const log = (ok, name, detail) => { const l = `${ok ? 'PASS ' : 'FAIL '} ${name.padEnd(28)} ${detail}`; lines.push(l); console.log(l); if (!ok) fails++; };
  for (const pg of PAGES) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const r = await measure(b, pg, w, h);
    const low = r.filter(x => x.share < x.need), hero = r[0].share, least = Math.min(...r.slice(1).map(x => x.share));
    log(!low.length, `imagery ${pg} ${w}`, low.length ? low.map(x => `${x.share}% at ${x.y}`).join(', ') : `hero ${hero}%, the least of ${r.length - 1} other screens ${least}%`);
  }
  // the plant, every picture hidden on Home at 1440, the check has to fail it
  const pr = await measure(b, '/', 1440, 900, true);
  const caught = pr.some(x => x.share < x.need);
  lines.push(`${caught ? 'plant caught ' : 'DETECTOR BROKEN'} imagery  every picture hidden on Home, ${pr.filter(x => x.share < x.need).length} of ${pr.length} screens under`); console.log(lines[lines.length - 1]);
  await b.close();
  const res = fails || !caught ? `FAIL ${fails}${caught ? ', every plant caught' : ', the plant was missed'}` : 'PASS, every plant caught';
  console.log(res); fs.writeFileSync(path.join(__dirname, 'last-imagery.txt'), `qa/imagery.js ${new Date().toISOString()}\n` + lines.join('\n') + '\n' + res + '\n');
  process.exit(fails || !caught ? 1 : 0);
})();
