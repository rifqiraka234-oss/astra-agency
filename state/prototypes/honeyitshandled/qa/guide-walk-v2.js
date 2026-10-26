// The route to the letter on all three paths at 390 and 1440 (Fae Club v3 walk). usage:
//   NODE_PATH=... node qa/guide-walk-v2.js <base url> <out dir> [plant]
// Chooses the path on the first screen the way a visitor does, then at every half screen from the top to the footer
// records whether the bar is on, how many in page calls to the letter are on screen (any [data-cta] in main, the form's
// fields and send) and whether the header button shows. A half screen with none of the three is a gap. Screenshots the
// first screen after the choice and the screen of each path's own proof. With "plant", the bar is switched off for good.
const { chromium } = require('playwright');
const fs = require('fs');
const base = (process.argv[2] || 'http://127.0.0.1:8741').replace(/\/$/, ''), OUT = process.argv[3] || 'guide-v2', plant = process.argv[4] === 'plant';
const U = base + '/?today=2026-10-26';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
  let gaps = 0;
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desk']]) for (const path of ['wedding', 'private', 'company']) {
    const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 600, hasTouch: w < 600 });
    const p = await c.newPage(); await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(900);
    if (plant) await p.addStyleTag({ content: '.sbar{display:none!important}' });
    await p.click(`label.path:has(input[value="${path}"])`); await p.waitForTimeout(300);
    const first = await p.evaluate(() => { const vh = innerHeight, inV = e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= vh && r.width > 0; }; const c = document.querySelector('[data-hero-cta]'); return inV(c) ? c.textContent.trim() : 'NOT ON THE FIRST SCREEN'; });
    await p.screenshot({ path: `${OUT}/${tag}-${path}-0-first.png` });
    const foot = await p.evaluate(() => (document.querySelector('.ftr').getBoundingClientRect().top + scrollY) / innerHeight);
    const rows = []; let g = 0;
    for (let v = 0; v <= foot + 0.5; v += 0.5) {
      await p.evaluate(v => scrollTo(0, v * innerHeight), v); await p.mouse.wheel(0, 1); await p.waitForTimeout(140);
      const r = await p.evaluate(() => {
        const vh = innerHeight, hb = document.querySelector('[data-hdr]').getBoundingClientRect().bottom, sb = document.querySelector('[data-sbar]');
        const bt = sb.classList.contains('is-on') && getComputedStyle(sb).display !== 'none' ? vh - sb.offsetHeight : vh;
        const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return e.offsetParent !== null && r.width > 0 && r.height > 0 && r.top < bt - 6 && r.bottom > hb + 6 && s.visibility !== 'hidden' && +s.opacity > 0.05; };
        const acts = [...document.querySelectorAll('main [data-cta], [data-letter] input, [data-letter] textarea, [data-letter] .send')].filter(vis).length;
        const hbtn = document.querySelector('.hdr .hbtn'), hdr = !!hbtn && hbtn.offsetParent !== null && getComputedStyle(hbtn).display !== 'none';
        const bar = sb.classList.contains('is-on') && getComputedStyle(sb).display !== 'none';
        return { bar, acts, hdr };
      });
      if (!r.bar && !r.acts && !r.hdr) g++;
      rows.push(v + ':' + (r.bar ? 'B' : '-') + r.acts + (r.hdr ? 'h' : ''));
    }
    gaps += g;
    const proof = path === 'company' ? '.n-pro .night-t' : '.n-cinco .night-t';
    await p.evaluate(s => document.querySelector(s).scrollIntoView(), proof); await p.waitForTimeout(500); await p.screenshot({ path: `${OUT}/${tag}-${path}-1-proof.png` });
    console.log(tag, path.padEnd(8), 'first screen call', JSON.stringify(first), '| gaps', g, '| page', foot.toFixed(1), 'screens');
    console.log('   ', rows.join(' '));
    await c.close();
  }
  await b.close();
  console.log('half screens with no way to the letter', gaps + (plant ? ' (plant mode, should be more than 0)' : ''));
})();
