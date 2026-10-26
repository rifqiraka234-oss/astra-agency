// Live: scroll the whole page, then count images and films that didn't decode. usage: node livemedia.js <url>
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const bad = [];
    p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await p.goto(process.argv[2], { waitUntil: 'networkidle' });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 400) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(2500);
    const r = await p.evaluate(() => ({ imgs: document.images.length, undecoded: [...document.images].filter(i => i.naturalWidth === 0).map(i => i.currentSrc || i.src),
      films: [...document.querySelectorAll('video')].map(v => ({ s: (v.currentSrc || '').split('/').pop(), rs: v.readyState, w: v.videoWidth })) }));
    console.log(w, 'imgs', r.imgs, 'undecoded', r.undecoded.length, r.undecoded.slice(0, 3), 'http errors', bad.length, bad.slice(0, 3));
    console.log('   films', JSON.stringify(r.films));
  }
  await b.close();
})();
