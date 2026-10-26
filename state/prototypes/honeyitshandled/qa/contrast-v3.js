// Words on film and photographs, measured. axe can't judge text over a picture, so this hides each line's text, takes a
// screenshot of the box it sits in, and works out the contrast of the text colour against the 90th percentile of the
// pixels behind it (the brightest tenth for light words, the darkest tenth for dark words). Runs on the stills (reduced
// motion) and on the playing films after a few seconds, at 1440 and 390. usage: NODE_PATH=... node qa/contrast-v3.js <base url> [plant]
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const lum = (r, g, b) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const TARGETS = [
  ['home', '#top', '.hero h1'], ['home', '#top', '.hero .tl-ivory'], ['home', '#top', '.hero-note'],
  ['home', '[data-pin="off"]', '#h-off'], ['home', '[data-pin="off"]', '.ch-off .stage-l'],
  ['home', '#blue', '#h-blue'], ['home', '#blue', '.blue-t .stage-l'], ['home', '#blue', '.blue-t .count'],
  ['home', '.red-stage', '#h-red'], ['home', '.red-stage', '.red-t .stage-l'], ['home', '.dance-stage', '.dance-l'],
  ['events', '.ev-hero', '#h-ev'], ['events', '.ev-hero', '.ev-hero-t p'], ['events', '.ev-hero', '.ev-ways a'],
];
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
  let worst = 99, fails = 0, n = 0;
  const dec = await b.newPage();
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const rm of [true, false]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm ? 'reduce' : 'no-preference', isMobile: w < 600, hasTouch: w < 600 });
    const p = await c.newPage(); p.setDefaultTimeout(9000);
    for (const [view, scene, sel] of TARGETS) {
      await p.goto(base + '/?today=2026-10-26' + (view === 'events' ? '#events' : ''), { waitUntil: 'load' }); await p.waitForTimeout(500);
      if (plant) await p.addStyleTag({ content: '.hero h1{color:#cfc8bd!important}.hero-shade{display:none!important}' });
      await p.evaluate(s => { const e = document.querySelector(s), pin = e.matches('[data-pin]'); if (pin) { const hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hh')); scrollTo(0, e.getBoundingClientRect().top + scrollY - hh + (e.offsetHeight - (innerHeight - hh)) * 0.97); } else e.scrollIntoView({ block: s.includes('top') || s.includes('ev-hero') ? 'start' : 'start' }); }, scene);
      await p.mouse.wheel(0, 1); await p.waitForTimeout(rm ? 400 : 3200);
      // never measure under the header or the bar, bring the line between them first
      await p.evaluate(s => { const e = document.querySelector(s), r = e.getBoundingClientRect(), hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hh')); const low = innerHeight - 90; if (r.bottom > low) scrollBy(0, r.bottom - low); else if (r.top < hh + 10) scrollBy(0, r.top - hh - 10); }, sel);
      await p.waitForTimeout(rm ? 200 : 600);
      const box = await p.evaluate(s => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); const col = getComputedStyle(e).color; e.dataset.col = col; e.style.setProperty('color', 'transparent', 'important'); e.style.setProperty('text-decoration-color', 'transparent', 'important'); return { x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(innerWidth, r.right) - Math.max(0, r.left), h: Math.min(innerHeight, r.bottom) - Math.max(0, r.top), col }; }, sel);
      if (box.w < 4 || box.h < 4) { console.log(`${w} ${rm ? 'still' : 'film '} ${sel.padEnd(22)} not on screen`); fails++; continue; }
      await p.waitForTimeout(80);
      const buf = await p.screenshot({ clip: { x: box.x, y: box.y, width: box.w, height: box.h } });
      // decode the screenshot in a blank page's canvas and read every fourth pixel
      const px = await dec.evaluate(async u => { const im = new Image(); im.src = u; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return Array.from(x.getImageData(0, 0, c.width, c.height).data.filter((v, i) => (i >> 2) % 4 === 0)); }, 'data:image/png;base64,' + buf.toString('base64'));
      const L = []; for (let i = 0; i + 2 < px.length; i += 4) L.push(lum(px[i], px[i + 1], px[i + 2]));
      L.sort((a, b) => a - b);
      const m = box.col.match(/[\d.]+/g).map(Number), tl = lum(m[0], m[1], m[2]);
      const bg = tl > 0.5 ? L[Math.floor(L.length * 0.9)] : L[Math.floor(L.length * 0.1)];
      const cr = ratio(tl, bg), size = await p.evaluate(s => parseFloat(getComputedStyle(document.querySelector(s)).fontSize), sel);
      const need = size >= 24 ? 3 : 4.5; n++;
      if (cr < need) fails++; worst = Math.min(worst, cr / need);
      console.log(`${w} ${rm ? 'still' : 'film '} ${sel.padEnd(22)} ${cr.toFixed(2)} : 1 (needs ${need}, ${Math.round(size)} px) ${cr < need ? 'LOW' : 'ok'}`);
    }
    await c.close();
  }
  await b.close();
  console.log(`${n} measured, ${fails} below the line${plant ? ' (plant mode, the hero line should be low)' : ''}`);
})();
