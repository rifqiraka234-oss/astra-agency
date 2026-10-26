// No sideways scroll at nine widths from 1920 to 320, motion on and reduced. usage: NODE_PATH=... node qa/overflow-v2.js <base url> [plant]
// Each load scrolls the whole page with the wheel (so every scene has moved), switches through all three paths and the
// widest states (the longest date, every tab out, the day tab, 600 guests, the lens flipped), then resizes and checks
// again, listing every element that pokes past the right edge. With "plant", a too wide block is added at 390.
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
  let loads = 0, bad = 0;
  for (const w of [1920, 1440, 1280, 1024, 768, 600, 414, 390, 320]) for (const rm of [false, true]) {
    const c = await b.newContext({ viewport: { width: w, height: w < 600 ? 780 : 900 }, reducedMotion: rm ? 'reduce' : 'no-preference', isMobile: w < 600, hasTouch: w < 600 });
    const p = await c.newPage(); await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(400);
    if (plant && w === 390) await p.evaluate(() => { const d = document.createElement('div'); d.style.width = '520px'; d.style.height = '10px'; document.querySelector('.when .wrap').appendChild(d); });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.mouse.wheel(0, 1); await p.waitForTimeout(rm ? 10 : 40); }
    const probe = () => p.evaluate(() => {
      const W = document.documentElement.clientWidth, out = [];
      const over = document.documentElement.scrollWidth > W;
      document.querySelectorAll('body *').forEach(e => {
        const r = e.getBoundingClientRect(); if (r.width === 0 || r.right <= W + 1) return;
        // anything inside a box that clips sideways is fine, walk up to the body
        let a = e.parentElement, clipped = false;
        while (a && a !== document.body) { const s = getComputedStyle(a); if (/(hidden|clip)/.test(s.overflowX) && a.getBoundingClientRect().right <= W + 1) { clipped = true; break; } a = a.parentElement; }
        if (!clipped && getComputedStyle(e).position !== 'fixed') out.push((e.className && e.className.baseVal === undefined ? e.className : e.tagName) + ' ' + Math.round(r.right));
      });
      return { over, out: out.slice(0, 6) };
    });
    const states = [{ path: 'wedding', date: [2028, 9, 30], help: 'full', guests: 600 }, { help: 'day' }, { path: 'private', kind: 4 }, { path: 'company', help: 'freelance', tabs: [0, 3, 10, 12], kind: 1, date: [2027, 9, 29] }, { path: 'wedding', noDate: true, year: 2028 }];
    let worst = await probe();
    for (const s of states) { await p.evaluate(o => { if (o.date) o.date = new Date(o.date[0], o.date[1] - 1, o.date[2]); window.HIH.set(o); }, s); await p.waitForTimeout(80); const r = await probe(); if (r.over || r.out.length) worst = r; }
    await p.evaluate(() => document.querySelector('.lens').scrollIntoView()); await p.click('[data-peek]'); await p.waitForTimeout(300); { const r = await probe(); if (r.over || r.out.length) worst = r; }
    await p.setViewportSize({ width: w, height: 700 }); await p.waitForTimeout(250); { const r = await probe(); if (r.over || r.out.length) worst = r; }
    loads++;
    const fail = worst.over || worst.out.length; if (fail) bad++;
    console.log(String(w).padEnd(5), rm ? 'reduced' : 'motion ', fail ? 'OVERFLOW ' + JSON.stringify(worst) : 'none');
    await c.close();
  }
  await b.close();
  console.log(`${loads} loads, ${bad} with overflow${plant ? ' (plant mode, both 390 loads should overflow)' : ''}`);
})();
