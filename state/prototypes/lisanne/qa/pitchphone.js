// The pitch on a real phone emulation, swept top to bottom, plus the tracker and the two show more panels opened by touch.
const { chromium, devices } = require('/opt/node22/lib/node_modules/playwright');
const W = +(process.argv[2] || 390), H = +(process.argv[3] || 844), TAG = process.argv[4] || 'ip';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: devices['iPhone 13'].userAgent });
  const p = await ctx.newPage(); const errs = [], bad = []; p.on('pageerror', e => errs.push(String(e)));
  p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  await p.goto('http://127.0.0.1:8765/site-plan/'); await p.waitForTimeout(1500);
  for (const s of await p.$$('.more summary')) await s.tap();
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
  const shots = []; let i = 0;
  for (;;) {
    await p.waitForTimeout(900);
    const f = `qa/phone/p${TAG}-${String(i).padStart(2, '0')}.png`; await p.screenshot({ path: f }); shots.push(f); i++;
    const more = await p.evaluate(H => { const b4 = window.scrollY; window.scrollBy(0, H * 0.82); return window.scrollY > b4 + 2; }, H);
    if (!more || i > 40) break;
  }
  const st = await p.evaluate(() => ({ over: document.documentElement.scrollWidth - innerWidth, broken: [...document.images].filter(x => !x.naturalWidth).map(x => x.currentSrc), small: [...document.querySelectorAll('a,button,summary,input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && r.height < 24 && getComputedStyle(e).visibility !== 'hidden'; }).map(e => (e.className || e.tagName) + ':' + (e.textContent || '').trim().slice(0, 20)).slice(0, 8) }));
  console.log(TAG, 'shots', shots.length, JSON.stringify(st), 'errors', JSON.stringify(errs), 'bad', JSON.stringify(bad));
  require('fs').writeFileSync(`qa/phone/p${TAG}-list.json`, JSON.stringify(shots));
  await b.close();
})();
