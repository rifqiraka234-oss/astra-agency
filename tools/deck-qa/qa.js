// Cold-load QA for a built deck or prototype. Nothing is forced.
// Usage:  BASE=http://127.0.0.1:8788 [PAGE=other.html] node tools/deck-qa/qa.js
// Serve the folder first:  (cd <folder> && python3 -m http.server 8788 &)
// Against a deployed site, curl the live HTML plus its assets into a local
// folder and serve that, because the agent proxy resets live Chromium tunnels.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = process.env.BASE || 'http://127.0.0.1:8788';
const URL = BASE + '/' + (process.env.PAGE || 'index.html');  // PAGE=make.html for multi page sites

(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
  const errs = [], cons = [], bad = [];
  p.on('pageerror', e => errs.push(String(e)));
  p.on('console', m => { if (m.type() === 'error') cons.push(m.text()); });
  p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });

  await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(3000);
  // scroll the whole page so reveals fire naturally. never force .in
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 450) {
      window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(1600);

  const rv = await p.evaluate(() => {
    const a = document.querySelectorAll('.rv,h1,h2');
    let n = 0; a.forEach(e => { if (e.classList.contains('in')) n++; });
    return { total: a.length, revealed: n };
  });
  const imgs = await p.evaluate(() => [...document.images].map(i => ({
    src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, w: i.naturalWidth
  })));

  console.log('PAGEERRORS   ', JSON.stringify(errs));
  console.log('CONSOLE_ERR  ', JSON.stringify(cons));
  console.log('BAD_RESPONSES', JSON.stringify(bad));
  console.log('REVEAL       ', JSON.stringify(rv));
  console.log('IMAGES_BROKEN', JSON.stringify(imgs.filter(i => !i.ok)));
  console.log('IMAGES_OK    ', imgs.filter(i => i.ok).length + '/' + imgs.length);

  // exercise an embedded quiz if the page has one
  if (await p.$('#opts')) {
    await p.evaluate(() => document.getElementById('tool') && document.getElementById('tool').scrollIntoView());
    await p.waitForTimeout(400);
    for (let i = 0; i < 12; i++) {
      const btns = await p.$$('#opts button');
      if (!btns.length) break;
      await btns[btns.length - 1].click();
      await p.waitForTimeout(200);
    }
    const out = await p.evaluate(() => ({
      score: document.getElementById('score') && document.getElementById('score').textContent,
      band: document.getElementById('band') && document.getElementById('band').textContent,
      resultVisible: document.getElementById('result') && document.getElementById('result').style.display
    }));
    console.log('QUIZ_MAXED   ', JSON.stringify(out));
  }

  // 420px overflow, and which element causes it
  const m = await b.newPage({ viewport: { width: 420, height: 900 } });
  await m.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await m.waitForTimeout(2500);
  const ov = await m.evaluate(() => {
    const vw = document.documentElement.clientWidth, out = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > vw + 1) {
        let inScroller = false, n = el.parentElement;
        while (n) { if (getComputedStyle(n).overflowX === 'auto') { inScroller = true; break; } n = n.parentElement; }
        if (!inScroller) out.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 40), right: Math.round(r.right) });
      }
    });
    return { scrollW: document.documentElement.scrollWidth, vw, offenders: out.slice(0, 10) };
  });
  console.log('MOBILE_420   ', JSON.stringify(ov));
  await m.screenshot({ path: 'qa-mobile.png' });
  await b.close();
})();
