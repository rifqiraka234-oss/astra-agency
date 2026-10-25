// usage: node shoot-ref.js list.txt outdir
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [list, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const sites = fs.readFileSync(list, 'utf8').trim().split('\n').map(l => l.split('|'));
(async () => {
  const b = await chromium.launch();
  const rows = [];
  const run = async ([cat, url]) => {
    const slug = url.replace(/^https?:\/\/(www\.)?/, '').replace(/[^a-z0-9]+/gi, '_').replace(/_$/, '');
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', locale: 'en-GB' });
    const p = await ctx.newPage();
    let status = 0, err = '';
    try {
      const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      status = r ? r.status() : 0;
      await p.waitForTimeout(3500);
      // try to dismiss cookie banners
      for (const t of ['Accept all', 'Accept All', 'Accept', 'Allow all', 'I agree', 'Agree', 'OK', 'Alle cookies accepteren', 'Accepteren', 'Akkoord']) {
        const btn = p.getByRole('button', { name: t, exact: true });
        if (await btn.count().catch(() => 0)) { await btn.first().click({ timeout: 1500 }).catch(() => {}); break; }
      }
      await p.waitForTimeout(800);
      await p.screenshot({ path: path.join(out, slug + '-0.jpg'), type: 'jpeg', quality: 60 });
      for (const [i, y] of [[1, 900], [2, 2200], [3, 4000]]) {
        await p.mouse.wheel(0, y - (i === 1 ? 0 : (i === 2 ? 900 : 2200)));
        await p.waitForTimeout(1400);
        await p.screenshot({ path: path.join(out, slug + '-' + i + '.jpg'), type: 'jpeg', quality: 60 });
      }
      const info = await p.evaluate(() => {
        const fams = new Map();
        document.querySelectorAll('h1,h2,h3,p,a,button,nav,span').forEach(el => { const f = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, ''); fams.set(f, (fams.get(f) || 0) + 1); });
        const btns = [...document.querySelectorAll('a,button')].filter(e => { const s = getComputedStyle(e); return (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.borderStyle !== 'none') && e.getBoundingClientRect().width > 40 && e.getBoundingClientRect().height > 24; }).slice(0, 6).map(e => { const s = getComputedStyle(e); return { t: e.innerText.trim().slice(0, 24), r: s.borderRadius, bg: s.backgroundColor, fs: s.fontSize, tt: s.textTransform, ls: s.letterSpacing, h: Math.round(e.getBoundingClientRect().height) }; });
        const h1 = document.querySelector('h1'); const hs = h1 ? getComputedStyle(h1) : null;
        return { title: document.title.slice(0, 70), fonts: [...fams].sort((a, b) => b[1] - a[1]).slice(0, 4).map(x => x[0]), bodyBg: getComputedStyle(document.body).backgroundColor, h1: h1 ? { t: h1.innerText.slice(0, 60), fs: hs.fontSize, fw: hs.fontWeight, ff: hs.fontFamily.split(',')[0], ls: hs.letterSpacing, tt: hs.textTransform } : null, btns, H: document.documentElement.scrollHeight };
      });
      rows.push({ cat, url, status, ...info });
    } catch (e) { err = e.message.slice(0, 120); rows.push({ cat, url, status, err }); }
    await ctx.close();
  };
  const q = sites.slice(); const workers = Array.from({ length: 4 }, async () => { while (q.length) await run(q.shift()); });
  await Promise.all(workers);
  await b.close();
  fs.writeFileSync(path.join(out, 'ref.jsonl'), rows.map(r => JSON.stringify(r)).join('\n'));
  for (const r of rows) console.log(r.status, r.url, r.err || (r.title + ' | ' + (r.fonts || []).join(', ') + ' | h1 ' + (r.h1 ? r.h1.fs + ' ' + r.h1.fw + ' ' + r.h1.ff : '-')));
})();
