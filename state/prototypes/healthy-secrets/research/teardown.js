const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const path = require('path');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const spki = fs.readFileSync(__dirname + '/spki.txt', 'utf8').trim();
const sites = fs.readFileSync(__dirname + '/sites.txt', 'utf8').trim().split('\n').map(l => l.split('|'));
const OUT = __dirname + '/shots'; fs.mkdirSync(OUT, { recursive: true });
const slug = u => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\W+/g, '_').replace(/_+$/, '');
async function one(b, cat, url) {
  const s = slug(url); const res = { cat, url, slug: s };
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-GB', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  try {
    await p.addInitScript(() => { window.__mut = 0; new MutationObserver(m => { window.__mut += m.length; }).observe(document, { attributes: true, subtree: true, attributeFilter: ['style', 'class', 'transform'] }); });
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    res.status = r && r.status(); await p.waitForTimeout(3500);
    // try cookie/region overlays
    for (const t of [/accept all/i, /alle akzeptieren/i, /^accept/i, /agree/i, /akzeptieren/i, /got it/i, /^ok$/i, /allow all/i]) {
      try { const btn = p.getByRole('button', { name: t }).first(); if (await btn.isVisible({ timeout: 500 })) { await btn.click({ timeout: 1500 }); await p.waitForTimeout(800); break; } } catch (e) {}
    }
    res.title = await p.title();
    await p.screenshot({ path: `${OUT}/${s}__0.jpg`, type: 'jpeg', quality: 60 });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    res.height = H; const mut0 = await p.evaluate(() => window.__mut);
    for (let i = 1; i <= 4; i++) { await p.evaluate(y => window.scrollTo(0, y), Math.round(H * i / 5)); await p.waitForTimeout(1100); await p.screenshot({ path: `${OUT}/${s}__${i}.jpg`, type: 'jpeg', quality: 55 }); }
    res.scrollMutations = (await p.evaluate(() => window.__mut)) - mut0;
    Object.assign(res, await p.evaluate(() => {
      const all = [...document.querySelectorAll('*')]; let sticky = 0, clip = 0, blend = 0, blur = 0;
      for (const e of all) { const cs = getComputedStyle(e); if (cs.position === 'sticky' || cs.position === 'fixed') sticky++; if (cs.clipPath && cs.clipPath !== 'none') clip++; if (cs.mixBlendMode && cs.mixBlendMode !== 'normal') blend++; if (cs.backdropFilter && cs.backdropFilter !== 'none') blur++; }
      const canv = [...document.querySelectorAll('canvas')]; let webgl = 0; for (const c of canv) { try { if (c.getContext('webgl2') || c.getContext('webgl')) webgl++; } catch (e) {} }
      const src = [...document.scripts].map(s => s.src).join(' ') + ' ' + Object.keys(window).join(' ');
      const libs = ['gsap', 'ScrollTrigger', 'THREE', 'lottie', 'Lenis', 'Swiper', 'framer', 'rive', 'splide', 'barba'].filter(l => src.toLowerCase().includes(l.toLowerCase()));
      const fonts = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')))].slice(0, 8);
      const words = (document.body.innerText || '').split(/\s+/).filter(Boolean).length;
      return { sticky, clip, blend, blur, canvases: canv.length, webgl, videos: document.querySelectorAll('video').length, svgs: document.querySelectorAll('svg').length, imgs: document.images.length, h1: document.querySelectorAll('h1').length, h2: document.querySelectorAll('h2').length, h3: document.querySelectorAll('h3').length, sections: document.querySelectorAll('section').length, forms: document.querySelectorAll('form').length, words, anims: (document.getAnimations ? document.getAnimations().length : 0), libs, fonts };
    }));
    await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1200);
    await p.screenshot({ path: `${OUT}/${s}__m.jpg`, type: 'jpeg', quality: 55 });
    res.ok = true;
  } catch (e) { res.ok = false; res.err = String(e).slice(0, 200); }
  await ctx.close(); return res;
}
(async () => {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--ignore-certificate-errors-spki-list=' + spki], proxy: proxy ? { server: proxy } : undefined });
  const out = fs.createWriteStream(__dirname + '/fingerprints.jsonl');
  const q = sites.slice(); const workers = [];
  for (let w = 0; w < 3; w++) workers.push((async () => { while (q.length) { const [cat, url] = q.shift(); const r = await one(b, cat, url); out.write(JSON.stringify(r) + '\n'); console.log(r.ok ? 'OK ' : 'ERR', r.status || '', url, r.err ? r.err.slice(0, 80) : ''); } })());
  await Promise.all(workers); out.end(); await b.close();
})();
