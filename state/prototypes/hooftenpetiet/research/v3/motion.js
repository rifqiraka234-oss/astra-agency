// usage: node motion.js list out. Per site: 2 idle frames at the top (ambient motion), then 7 scroll frames.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [list, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const sites = fs.readFileSync(list, 'utf8').trim().split('\n').map(l => l.split('|'));
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const rows = [];
  const run = async ([cat, url]) => {
    const slug = url.replace(/^https?:\/\/(www\.)?/, '').replace(/[^a-z0-9]+/gi, '_').replace(/_+$/, '');
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' });
    const p = await ctx.newPage();
    let status = 0;
    try {
      const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 50000 }); status = r ? r.status() : 0;
      await p.waitForTimeout(6000);
      for (const t of ['Accept all', 'Accept All', 'Accept', 'Allow all', 'I agree', 'Agree', 'OK', 'Got it', 'Accepteren', 'Alles accepteren', 'Enter', 'ENTER', 'Start']) {
        const btn = p.getByRole('button', { name: t, exact: true });
        if (await btn.count().catch(() => 0)) { await btn.first().click({ timeout: 1500 }).catch(() => {}); }
      }
      await p.mouse.move(720, 450); await p.waitForTimeout(800);
      await p.screenshot({ path: path.join(out, slug + '-00.jpg'), type: 'jpeg', quality: 55 });
      await p.mouse.move(1000, 300, { steps: 10 }); await p.waitForTimeout(1200);
      await p.screenshot({ path: path.join(out, slug + '-01.jpg'), type: 'jpeg', quality: 55 });
      for (let i = 2; i < 9; i++) {
        await p.mouse.wheel(0, 650); await p.waitForTimeout(1300);
        await p.screenshot({ path: path.join(out, slug + '-' + String(i).padStart(2, '0') + '.jpg'), type: 'jpeg', quality: 55 });
      }
      const info = await p.evaluate(() => ({ title: document.title.slice(0, 60), canvas: document.querySelectorAll('canvas').length, video: document.querySelectorAll('video').length, H: document.documentElement.scrollHeight, fonts: [...new Set([...document.querySelectorAll('h1,h2,p,a')].slice(0, 80).map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '')))].slice(0, 4) }));
      rows.push({ cat, url, status, ...info });
    } catch (e) { rows.push({ cat, url, status, err: e.message.slice(0, 100) }); }
    await ctx.close();
  };
  const q = sites.slice(); await Promise.all(Array.from({ length: 4 }, async () => { while (q.length) await run(q.shift()); }));
  await b.close();
  fs.writeFileSync(path.join(out, 'rows.jsonl'), rows.map(r => JSON.stringify(r)).join('\n'));
  for (const r of rows) console.log(r.status, r.url, r.err || (r.title + ' | canvas ' + r.canvas + ' video ' + r.video + ' | ' + (r.fonts || []).join(', ')));
})();
