// No sideways scroll at nine widths from 1920 to 320, motion on and reduced, both pages. usage: NODE_PATH=... node qa/overflow-v3.js <base url> [plant]
// Each load scrolls the whole page with the wheel (so the veil, the lights and the petals have run), sets the widest states
// (the longest date, every light handed over one by one so the card's help line is longest, abroad, 600 guests, the reply
// sealed), checks pan with scrollTo(200, y), opens the events page in its widest state, resizes and checks again, listing
// every element that pokes past the right edge. With "plant", a too wide block is added at 390.
const { chromium } = require('playwright');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
  let loads = 0, bad = 0;
  for (const w of [1920, 1440, 1280, 1024, 768, 600, 414, 390, 320]) for (const rm of [false, true]) {
    const c = await b.newContext({ viewport: { width: w, height: w < 600 ? 780 : 900 }, reducedMotion: rm ? 'reduce' : 'no-preference', isMobile: w < 600, hasTouch: w < 600 });
    const p = await c.newPage(); p.setDefaultTimeout(8000); await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(400);
    if (plant && w === 390) await p.evaluate(() => { const d = document.createElement('div'); d.style.width = '520px'; d.style.height = '10px'; document.querySelector('.when').appendChild(d); });
    const sweep = async () => { const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 650) { await p.evaluate(y => scrollTo(0, y), y); await p.mouse.wheel(0, 1); await p.waitForTimeout(rm ? 10 : 40); } };
    await sweep();
    const probe = () => p.evaluate(() => {
      const W = document.documentElement.clientWidth, out = [];
      const y = scrollY; scrollTo(200, y); const pan = scrollX; scrollTo(0, y);
      const over = document.documentElement.scrollWidth > W || pan > 0;
      document.querySelectorAll('body *').forEach(e => {
        const r = e.getBoundingClientRect(); if (r.width === 0 || r.right <= W + 1) return;
        let a = e.parentElement, clipped = false;
        while (a && a !== document.body) { const s = getComputedStyle(a); if (/(hidden|clip)/.test(s.overflowX) && a.getBoundingClientRect().right <= W + 1) { clipped = true; break; } a = a.parentElement; }
        if (!clipped && getComputedStyle(e).position !== 'fixed' && e.offsetParent !== null) out.push((typeof e.className === 'string' && e.className ? e.className : e.tagName) + ' ' + Math.round(r.right));
      });
      return { over, pan, out: out.slice(0, 6) };
    });
    let worst = await probe();
    const keep = r => { if (r.over || r.out.length) worst = r; };
    const states = [{ date: [2027, 9, 29], place: 'abroad', guests: 600 }, { help: 'partial', lights: [...Array(17).keys()] }, { help: 'day' }, { noDate: true, year: 2028 }];
    for (const s of states) { await p.evaluate(o => { if (o.date) o.date = new Date(o.date[0], o.date[1] - 1, o.date[2]); window.HIH.set(o); }, s); await p.waitForTimeout(80); await sweep(); keep(await probe()); }
    await p.evaluate(() => { document.querySelector('input[data-k="n1"]').value = 'Maximiliaan'; document.querySelector('input[data-k="n1"]').dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('input[data-k="n2"]').value = 'Anne-Sophie'; document.querySelector('input[data-k="n2"]').dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('form[data-reply="wedding"] details').setAttribute('open', ''); });
    await p.waitForTimeout(100); keep(await probe());
    await p.evaluate(() => { location.hash = '#events'; }); await p.waitForTimeout(400);
    await p.evaluate(() => window.HIH.ev.set({ type: 'company', team: true, kind: 4, guests: 1000, date: new Date(2027, 8, 29) })); await sweep(); keep(await probe());
    await p.setViewportSize({ width: w, height: 700 }); await p.waitForTimeout(250); keep(await probe());
    await p.evaluate(() => { location.hash = '#top'; }); await p.waitForTimeout(400); await sweep(); keep(await probe());
    loads++;
    const fail = worst.over || worst.out.length; if (fail) bad++;
    console.log(String(w).padEnd(5), rm ? 'reduced' : 'motion ', fail ? 'OVERFLOW ' + JSON.stringify(worst) : 'none');
    await c.close();
  }
  await b.close();
  console.log(`${loads} loads, ${bad} with overflow${plant ? ' (plant mode, both 390 loads should overflow)' : ''}`);
})();
