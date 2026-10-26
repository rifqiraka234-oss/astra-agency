// No horizontal overflow at nine widths from 1920 to 320, after scrolling the whole page, after a resize, and with
// every control in its widest state. The body clips sideways overflow, so the walk for a clipping parent stops below
// the body and anything poking past the screen edge counts, clipped or not. usage: node plan-honey-overflow.js <base> [plant]
// With "plant", a too wide block is added at 390 and exactly those two loads (both motion settings) must fail. Lists every offender.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const base = (process.argv[2] || 'http://127.0.0.1:8731').replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const W = [1920, 1440, 1280, 1024, 900, 768, 600, 390, 320];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  let fails = 0;
  for (const rm of ['no-preference', 'reduce']) for (const w of W) {
    const ctx = await b.newContext({ viewport: { width: w, height: 860 }, reducedMotion: rm, ...(w < 600 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
    const p = await ctx.newPage();
    await p.goto(base + '/', { waitUntil: 'networkidle' });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.mouse.wheel(0, 700); await p.waitForTimeout(25); }
    // widest states, Flanders with 20 couples, 2028 at 24 months, Instagram view, the biggest budget, every table open
    await p.click('[data-scope="fl"]').catch(() => {}); await p.evaluate(() => { const r = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }; r('fld-k', 20); r('cal-l', 24); r('mo-b', 100000); document.querySelectorAll('details').forEach(d => d.open = true); });
    await p.click('[data-year="2028"]').catch(() => {}); await p.click('[data-view="ig"]').catch(() => {});
    await p.setViewportSize({ width: w + 37, height: 860 }); await p.waitForTimeout(80); await p.setViewportSize({ width: w, height: 860 }); await p.waitForTimeout(300);
    if (plant && w === 390) await p.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'width:430px;height:2px'; document.querySelector('#money .wrap').appendChild(d); });
    const r = await p.evaluate(() => {
      const vw = document.documentElement.clientWidth, sw = document.documentElement.scrollWidth, off = [];
      document.querySelectorAll('body *').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && (b.right > vw + 1 || b.left < -1)) { let a = e, clip = false; while ((a = a.parentElement) && a !== document.body) { const o = getComputedStyle(a); if (/(hidden|clip)/.test(o.overflowX) || /(hidden|clip)/.test(o.overflow)) { clip = true; break; } } if (!clip) off.push((e.id ? '#' + e.id : e.tagName.toLowerCase() + '.' + [...e.classList].join('.')) + ' ' + Math.round(b.left) + '..' + Math.round(b.right)); } });
      return { vw, sw, off: off.slice(0, 6) };
    });
    const ok = r.sw <= r.vw && r.off.length === 0;
    if (!ok) fails++;
    console.log((ok ? 'ok   ' : 'FAIL ') + rm.padEnd(13) + String(w).padStart(5), 'scrollWidth', r.sw, 'offenders', JSON.stringify(r.off));
    await ctx.close();
  }
  await b.close();
  console.log(fails ? fails + ' failing loads' : 'no overflow at any width');
  process.exit(plant ? (fails === 2 ? 0 : 1) : (fails ? 1 : 0));
})();
