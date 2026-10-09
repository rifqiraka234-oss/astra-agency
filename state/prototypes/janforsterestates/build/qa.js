const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:8791/index.html';
const OUT = process.argv[2] || 'shots';
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = [], cons = [], bad = [];
    p.on('pageerror', e => errs.push(String(e)));
    p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') cons.push(m.type() + ' ' + m.text()); });
    p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    p.on('requestfailed', r => bad.push('FAIL ' + r.url()));
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${OUT}/${tag}_00_top.png` });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } });
    await p.waitForTimeout(2200);
    const rv = await p.evaluate(() => { const a = document.querySelectorAll('.rv,h1,h2'); let n = 0; a.forEach(e => { if (e.classList.contains('in')) n++; }); return { total: a.length, revealed: n }; });
    const imgs = await p.evaluate(() => [...document.images].map(i => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, w: i.naturalWidth })));
    const ov = await p.evaluate(() => { const vw = document.documentElement.clientWidth, out = []; document.querySelectorAll('body *').forEach(el => { const r = el.getBoundingClientRect(); if (r.width > 0 && r.right > vw + 1) out.push(el.tagName + '.' + (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) + ' ' + Math.round(r.right)); }); return { scrollW: document.documentElement.scrollWidth, vw, off: out.slice(0, 8) }; });
    const fonts = await p.evaluate(() => [...document.fonts].map(f => f.family + ' ' + f.weight + ' ' + f.status));
    console.log(tag, 'PAGEERRORS', JSON.stringify(errs));
    console.log(tag, 'CONSOLE', JSON.stringify(cons));
    console.log(tag, 'BAD', JSON.stringify(bad));
    console.log(tag, 'REVEAL', JSON.stringify(rv));
    console.log(tag, 'IMAGES', JSON.stringify(imgs));
    console.log(tag, 'OVERFLOW', JSON.stringify(ov));
    console.log(tag, 'FONTS', JSON.stringify(fonts));
    const secs = await p.$$('section, footer, header.top');
    for (let i = 0; i < secs.length; i++) { await secs[i].scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await secs[i].screenshot({ path: `${OUT}/${tag}_sec${i}.png` }); }
    await p.close();
  }
  await b.close();
})();
