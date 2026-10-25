const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const pages = ['/', '/entreprises/', '/privatisation/', '/devis/', '/devis/merci/', '/menu/', '/equipe/', '/commander/', '/mentions-legales/', '/confidentialite/'].map(x => ['http://127.0.0.1:8791', x]).concat(process.env.PLAN ? [['http://127.0.0.1:8792', '/']] : []);
  let bad = 0;
  for (const w of [1920, 1280, 1180, 1024, 900, 768, 390, 360, 320]) for (const lang of ['fr', 'en']) for (const [host, path] of pages) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('requestfailed', r => errs.push('FAIL ' + r.url()));
    await p.goto(host + path + (lang === 'en' ? '?lang=en' : ''), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let t = 0; t < document.body.scrollHeight; t += 500) { scrollTo(0, t); await new Promise(r => setTimeout(r, 15)); } });
    const r = await p.evaluate(w => {
      const out = [];
      document.querySelectorAll('body *').forEach(e => {
        const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden' || s.position === 'fixed') return;
        let a = e.parentElement, scroller = false;
        while (a) { const o = getComputedStyle(a).overflowX; if (o === 'auto' || o === 'hidden' || o === 'scroll' || o === 'clip') { if (a !== document.body && a !== document.documentElement) { scroller = true; break; } } a = a.parentElement; }
        if (scroller || e.closest('.sr, .fm-hp, .skip')) return;
        const rc = e.getBoundingClientRect(); if (rc.width && (rc.right > w + 1 || rc.left < -1)) out.push(e.tagName + '.' + (e.className && e.className.baseVal === undefined ? e.className : '') + ' ' + Math.round(rc.left) + '..' + Math.round(rc.right));
      });
      return { sw: document.documentElement.scrollWidth, out: out.slice(0, 4) };
    }, w);
    if (r.sw > w || r.out.length || errs.length) { bad++; console.log(w, lang, host.slice(-4), path, JSON.stringify(r), errs); }
    await p.close();
  }
  console.log('pages with problems', bad, 'of', 9 * 2 * pages.length);
  await b.close();
})();
