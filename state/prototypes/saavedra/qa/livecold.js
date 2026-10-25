const { chromium } = require('playwright');
const S = 'https://astra-saavedra-prototype.netlify.app', P = 'https://astra-saavedra-plan.netlify.app';
const pages = ['/', '/entreprises/', '/privatisation/', '/devis/', '/devis/merci/', '/menu/', '/equipe/', '/commander/', '/mentions-legales/', '/confidentialite/'].map(x => S + x).concat([P + '/']);
(async () => {
  const b = await chromium.launch(); let bad = 0;
  for (const w of [1440, 390]) for (const u of pages) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } }); const errs = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('requestfailed', r => errs.push('FAIL ' + r.url()));
    p.on('response', r => { if (r.status() >= 400) errs.push(r.status() + ' ' + r.url()); });
    const r = await p.goto(u, { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let t = 0; t < document.body.scrollHeight; t += 600) { scrollTo(0, t); await new Promise(r => setTimeout(r, 60)); } });
    await p.waitForTimeout(800);
    const st = await p.evaluate(() => ({ title: document.title, broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src), imgs: document.images.length, robots: document.querySelector('meta[name="robots"]').content }));
    const hdr = r.headers()['x-robots-tag'];
    const ok = r.status() === 200 && !st.broken.length && !errs.length && hdr === 'noindex, nofollow';
    if (!ok) bad++;
    console.log(ok ? 'OK ' : 'BAD', w, u.replace('https://', ''), '|', st.title, '| imgs', st.imgs, 'broken', st.broken.length, '| x-robots', hdr, errs.length ? JSON.stringify(errs.slice(0, 3)) : '');
    await p.close();
  }
  console.log('loads with problems', bad, 'of', pages.length * 2); await b.close();
})();
