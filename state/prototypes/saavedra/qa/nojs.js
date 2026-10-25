const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const c = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  for (const [h, path] of [['http://localhost:8791', '/'], ['http://localhost:8791', '/entreprises/'], ['http://localhost:8792', '/']]) {
    const p = await c.newPage(); await p.goto(h + path);
    const r = await p.evaluate(() => ({ h: document.documentElement.scrollHeight, hidden: [...document.querySelectorAll('h1,h2,h3,p')].filter(e => { const s = getComputedStyle(e); return e.textContent.trim() && (s.opacity === '0' || s.visibility === 'hidden'); }).length, boxes: document.querySelectorAll('.bx').length, steps: document.querySelectorAll('.day-step').length, lang: document.documentElement.lang, en: [...document.querySelectorAll('.l-en')].filter(e => getComputedStyle(e).display !== 'none').length }));
    console.log(h.slice(-4), path, JSON.stringify(r));
    await p.screenshot({ path: '/tmp/claude-0/saav/shots/nojs' + h.slice(-4) + path.replace(/\//g, '_') + '.jpg', fullPage: true, type: 'jpeg', quality: 40 });
    await p.close(); }
  await b.close(); })();
