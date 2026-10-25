// node nojs.js   every page with JavaScript off. Text must be visible, the garment must show, English must show.
const { chromium } = require('playwright');
const { pages } = require('./pages');
(async () => { const b = await chromium.launch();
  const c = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  for (const [h, path] of pages) {
    const p = await c.newPage(); await p.goto(h + path);
    const r = await p.evaluate(() => ({ h: document.documentElement.scrollHeight, hiddenText: [...document.querySelectorAll('h1,h2,h3,p,li')].filter(e => { const s = getComputedStyle(e); return e.textContent.trim() && (s.opacity === '0' || s.visibility === 'hidden'); }).length, garments: [...document.querySelectorAll('svg.garment')].filter(s => s.getBoundingClientRect().width > 40).length, nlShown: [...document.querySelectorAll('.l-nl')].filter(e => getComputedStyle(e).display !== 'none').length, enShown: [...document.querySelectorAll('.l-en')].filter(e => getComputedStyle(e).display !== 'none').length, form: !!document.querySelector('form[data-netlify]') }));
    console.log(h.slice(-4), path, JSON.stringify(r));
    await p.screenshot({ path: '/tmp/claude-0/bb/nojs' + h.slice(-2) + path.replace(/\//g, '_') + '.jpg', fullPage: true, type: 'jpeg', quality: 40 });
    await p.close(); }
  await b.close(); })();
