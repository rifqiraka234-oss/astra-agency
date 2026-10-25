// node film.js   the fire loops. Each has a poster that loads, plays only while on screen, pauses off screen, never plays
// under reduced motion or data saver, and the sun's fire layer is hidden when motion is off.
const { chromium } = require('playwright');
const H = 'http://localhost:8791';
(async () => {
  const b = await chromium.launch(); const out = [];
  const T = (name, ok, info) => out.push([ok ? 'PASS' : 'FAIL', name, info === undefined ? '' : JSON.stringify(info)]);
  const vids = async p => p.evaluate(() => [...document.querySelectorAll('video[data-film]')].map(v => ({ poster: v.getAttribute('poster'), paused: v.paused, t: +v.currentTime.toFixed(2), hidden: v.getAttribute('aria-hidden'), shown: !!v.offsetParent || getComputedStyle(v.parentElement).display !== 'none' })));
  for (const [path, sel] of [['/', '.sun-fire video'], ['/entreprises/', '.arch-fire video'], ['/privatisation/', '.arch-fire video']]) {
    // motion on
    { const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const fails = [];
      p.on('response', r => { if (r.url().includes('/media/film/') && r.status() >= 400) fails.push(r.status() + ' ' + r.url()); });
      await p.goto(H + path, { waitUntil: 'networkidle' });
      const posters = await p.evaluate(() => [...document.querySelectorAll('video[data-film]')].map(v => v.getAttribute('poster')));
      for (const u of posters) { const r = await p.request.get(H + u); T(`${path} poster ${u} loads`, r.status() === 200 && (r.headers()['content-type'] || '').includes('image'), r.status()); }
      await p.locator(sel).first().scrollIntoViewIfNeeded(); await p.waitForTimeout(2500);
      const on = await p.$eval(sel, v => ({ paused: v.paused, t: v.currentTime, src: v.currentSrc.split('/').pop(), hidden: v.getAttribute('aria-hidden'), muted: v.muted }));
      T(`${path} plays on screen, muted, hidden from screen readers`, !on.paused && on.t > 0.3 && on.muted && on.hidden === 'true', on);
      await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(1200);
      const t1 = await p.$eval(sel, v => v.currentTime); await p.waitForTimeout(800);
      const off = await p.$eval(sel, v => ({ paused: v.paused, t: v.currentTime }));
      T(`${path} pauses off screen`, off.paused && Math.abs(off.t - t1) < 0.05, off);
      T(`${path} no failed film requests`, !fails.length, fails);
      await p.close(); }
    // reduced motion
    { const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      await p.goto(H + path, { waitUntil: 'networkidle' });
      await p.locator(sel).first().evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(2000);
      const r = await p.$eval(sel, v => ({ paused: v.paused, t: v.currentTime, net: v.networkState, display: getComputedStyle(v.closest('.sun-fire') || v).display }));
      T(`${path} never plays under reduced motion`, r.paused && r.t === 0, r);
      if (path === '/') T('/ the sun fire layer is hidden under reduced motion', r.display === 'none', r.display);
      await p.close(); }
    // data saver
    { const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
      await c.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true } }));
      const p = await c.newPage(); await p.goto(H + path, { waitUntil: 'networkidle' });
      await p.locator(sel).first().evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(2000);
      const r = await p.$eval(sel, v => ({ paused: v.paused, t: v.currentTime }));
      T(`${path} never plays with data saver on`, r.paused && r.t === 0, r);
      await c.close(); }
  }
  out.forEach(r => console.log(r.join('  ')));
  console.log('failed', out.filter(r => r[0] === 'FAIL').length, 'of', out.length); await b.close();
})();
