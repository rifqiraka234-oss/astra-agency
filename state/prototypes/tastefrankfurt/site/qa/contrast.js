// Hero text contrast measured from pixels: the scene is shot with the words hidden, and every text box is compared
// against the brightest tenth of the pixels behind it (text shadow ignored, so this is the harsh case). node qa/contrast.js
const { chromium } = require('playwright-core'); const sharp = require('sharp');
const BASE = process.argv[2] || 'http://127.0.0.1:5310/';
const L = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--use-angle=d3d11'] }); const rows = []; let worst = 99;
  for (const lang of ['de', 'en']) for (const [w, h] of [[1440, 900], [390, 844]]) for (const occ of ['weihnachtsfeier', 'firmenfeier', 'sommerfest', 'empfang', 'hochzeit', 'geburtstag']) {
    // PLANT=1 darkens the page behind the dark words in one scene, the check has to fail
    if (process.env.PLANT && (lang !== 'de' || w !== 1440 || occ !== 'weihnachtsfeier')) continue;
    const cx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 500 }); await cx.addInitScript(l => { try { sessionStorage.setItem('tf.lang', l); } catch (e) {} }, lang); const p = await cx.newPage();
    await p.goto(BASE, { waitUntil: 'load' }); await p.waitForTimeout(5000);
    if (occ !== 'weihnachtsfeier') { await p.evaluate(o => document.querySelector(`[data-occ="${o}"]`).click(), occ); await p.waitForTimeout(3200); }
    const boxes = await p.evaluate(() => [...document.querySelectorAll('.bh-a, .bh-b, .bh-proof, .bh-q, .occ .pick')].filter(e => e.offsetParent && getComputedStyle(e).display !== 'none').map(e => { const r = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 18), x: r.x, y: r.y, w: r.width, h: r.height, c: getComputedStyle(e).color }; }));
    await p.addStyleTag({ content: '.bh-h, .bh-ask, .bh-note{visibility:hidden!important} .hd{visibility:hidden!important}' + (process.env.PLANT ? ' .bh-pin{background:#3a3a3c!important}' : '') }); await p.waitForTimeout(150);
    const png = await p.screenshot(); const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
    for (const bx of boxes) {
      const px = []; for (let y = Math.max(0, bx.y | 0); y < Math.min(info.height, bx.y + bx.h); y += 2) for (let x = Math.max(0, bx.x | 0); x < Math.min(info.width, bx.x + bx.w); x += 2) { const i = (y * info.width + x) * info.channels; px.push([data[i], data[i + 1], data[i + 2]]); }
      px.sort((a, c) => L(c) - L(a)); const bg = px[Math.floor(px.length * 0.1)] || [0, 0, 0];
      const tc = bx.c.match(/\d+/g).slice(0, 3).map(Number); const r = ratio(tc, bg); worst = Math.min(worst, r);
      if (r < 4.5) rows.push(`${lang} ${w} ${occ} "${bx.t}" ${r.toFixed(2)}`);
    }
    await p.context().close();
  }
  console.log(rows.length ? 'BELOW 4.5 (before the text shadow)\n  ' + rows.join('\n  ') : 'every hero text box at least 4.5 to 1 against the brightest tenth of the pixels behind it, 6 occasions, 2 sizes, DE and EN', '\nworst', worst.toFixed(2));
  await b.close(); process.exitCode = rows.length ? 1 : 0;
})();
