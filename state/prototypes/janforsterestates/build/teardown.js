// Render each reference tool page, screenshot at 1440 and 390, record title, status and a few metrics.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const spki = require('/home/user/astra-agency/tools/proxy-ca-spki.js')();
const fs = require('fs');
const OUT = process.argv[2];
const list = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--ignore-certificate-errors-spki-list=' + spki] });
  const res = [];
  for (const [tag, url] of list) {
    const r = { tag, url };
    for (const [vw, vh, suf] of [[1440, 900, 'd'], [390, 844, 'm']]) {
      const ctx = await b.newContext({ viewport: { width: vw, height: vh }, locale: 'en-GB',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
      const p = await ctx.newPage();
      try {
        const resp = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await p.waitForTimeout(6000);
        if (suf === 'd') {
          r.status = resp ? resp.status() : null; r.final = p.url(); r.title = await p.title();
          r.m = await p.evaluate(() => ({
            inputs: document.querySelectorAll('input,select').length,
            buttons: document.querySelectorAll('button').length,
            svg: document.querySelectorAll('svg').length, canvas: document.querySelectorAll('canvas').length,
            video: document.querySelectorAll('video').length, iframes: [...document.querySelectorAll('iframe')].map(f => (f.src||'').slice(0,80)).slice(0,4),
            h1: (document.querySelector('h1')||{}).innerText || '',
            text: document.body ? document.body.innerText.replace(/\s+/g,' ').slice(0, 600) : ''
          }));
        }
        await p.screenshot({ path: `${OUT}/${tag}-${suf}.png` });
      } catch (e) { r['err_' + suf] = String(e).slice(0, 160); }
      await ctx.close();
    }
    res.push(r); console.log(JSON.stringify({ tag, status: r.status, title: r.title, err: r.err_d }));
  }
  fs.writeFileSync(`${OUT}/teardown.json`, JSON.stringify(res, null, 1));
  await b.close();
})();
