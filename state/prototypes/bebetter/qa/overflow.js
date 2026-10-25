// node overflow.js   no horizontal page scroll and nothing poking out of the viewport, 9 widths, both languages, every page,
// plus page errors and failed requests. CONTROL=1 plants a 2000px wide block and the run only counts if it is caught.
const { chromium } = require('playwright');
const { pages } = require('./pages');
(async () => {
  const b = await chromium.launch();
  let bad = 0, n = 0;
  const widths = process.env.CONTROL ? [390] : [1920, 1280, 1180, 1024, 900, 768, 390, 360, 320];
  for (const w of widths) for (const lang of ['en', 'nl']) for (const [host, path] of (process.env.CONTROL ? [pages[1]] : pages)) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('requestfailed', r => { if (r.resourceType() === 'media' && /ERR_ABORTED/.test(r.failure() && r.failure().errorText || '')) return; errs.push('FAIL ' + r.url() + ' ' + (r.failure() && r.failure().errorText)); });
    await p.goto(host + path + (lang === 'nl' ? '?lang=nl' : ''), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let t = 0; t < document.body.scrollHeight; t += 500) { scrollTo(0, t); await new Promise(r => setTimeout(r, 15)); } });
    if (process.env.CONTROL) await p.evaluate(() => { const d = document.createElement('div'); d.style.width = '2000px'; d.style.height = '4px'; document.querySelector('main').appendChild(d); });
    await p.setViewportSize({ width: w, height: 700 }); await p.waitForTimeout(120); await p.setViewportSize({ width: w, height: 900 }); await p.waitForTimeout(200);
    const r = await p.evaluate(w => {
      const out = [];
      const memo = new Map();
      const inScroller = a => { const seen = []; let r = false; while (a && a !== document.body && a !== document.documentElement) { if (memo.has(a)) { r = memo.get(a); break; } seen.push(a); const o = getComputedStyle(a).overflowX; if (o === 'auto' || o === 'hidden' || o === 'scroll' || o === 'clip') { r = true; break; } a = a.parentElement; } seen.forEach(x => memo.set(x, r)); return r; };
      document.querySelectorAll('body *').forEach(e => {
        if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') return;
        const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden' || s.position === 'fixed') return;
        if (inScroller(e.parentElement) || e.closest('.sr, .fm-hp, .skip, .bb-defs')) return;
        const rc = e.getBoundingClientRect(); if (rc.width && (rc.right > w + 1 || rc.left < -1)) out.push(e.tagName + '.' + (typeof e.className === 'string' ? e.className : '') + ' ' + Math.round(rc.left) + '..' + Math.round(rc.right));
      });
      return { sw: document.documentElement.scrollWidth, out: out.slice(0, 4) };
    }, w);
    n++;
    if (r.sw > w || r.out.length || errs.length) { bad++; console.log(w, lang, host.slice(-4), path, JSON.stringify(r), errs); }
    await p.close();
  }
  console.log('loads with problems', bad, 'of', n);
  await b.close();
})();
