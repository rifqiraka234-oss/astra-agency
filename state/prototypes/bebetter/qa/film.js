// node film.js   the 1% film. It must not play before it's on screen (the control), it must play once it is, it must pause
// when it leaves, and with reduced motion it must never play and show its poster. Every file must arrive.
const { chromium } = require('playwright');
const { SITE } = require('./pages');
(async () => {
  const b = await chromium.launch();
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  for (const motion of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: motion });
    const bad = []; p.on('response', r => { if (r.url().includes('/media/film/') && r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await p.goto(SITE + '/', { waitUntil: 'networkidle' });
    const st = () => p.evaluate(() => { const v = document.querySelector('.one-v'); return { paused: v.paused, t: v.currentTime, src: v.currentSrc, poster: v.getAttribute('poster') }; });
    const before = await st();
    ok(before.paused && before.t === 0, motion + ' plays before it is on screen');
    await p.evaluate(() => document.querySelector('.one').scrollIntoView({ block: 'center' }));
    await p.waitForTimeout(2500);
    const on = await st();
    if (motion === 'reduce') ok(on.paused && on.t === 0, 'played under reduced motion');
    else { ok(!on.paused && on.t > 0.5, 'does not play on screen ' + JSON.stringify(on)); ok(/hand-wrap\.(webm|mp4)$/.test(on.src), 'source ' + on.src); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
    const off = await st();
    ok(off.paused, motion + ' keeps playing off screen');
    const poster = await p.evaluate(async u => (await fetch(u)).status, before.poster);
    ok(poster === 200, 'poster ' + poster);
    for (const f of ['hand-wrap.webm', 'hand-wrap.mp4']) { const s = await p.evaluate(async u => { const r = await fetch(u); return r.status + ' ' + r.headers.get('content-type'); }, '/media/film/' + f); ok(s.startsWith('200 video/'), f + ' ' + s); }
    ok(!bad.length, 'film requests failed ' + bad.join(', '));
    await p.close();
  }
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS');
  await b.close(); process.exit(fails.length ? 1 : 0);
})();
