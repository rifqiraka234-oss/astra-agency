// usage: node qa.js <url> <outdir> <tag>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
const fs = require('fs');
(async () => {
  const [url, out, tag] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  const report = { url, tag, widths: {} };
  for (const width of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errs = [], cons = [], failed = [], bad = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') cons.push(m.type() + ' ' + m.text()); });
    page.on('requestfailed', r => failed.push(r.url() + ' ' + (r.failure() || {}).errorText));
    page.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    for (let y = 0; y < 12000; y += 500) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(80); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
    const info = await page.evaluate(() => {
      const imgs = [...document.images].map(i => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0, w: i.naturalWidth }));
      const svgImgs = [...document.querySelectorAll('svg image')].map(i => i.getAttribute('href'));
      const sw = document.documentElement.scrollWidth, cw = document.documentElement.clientWidth;
      const over = [...document.querySelectorAll('body *')].filter(e => !e.ownerSVGElement).filter(e => { const r = e.getBoundingClientRect(); return r.right > cw + 1 && r.width > 0 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 8).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right));
      const fonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight);
      return { imgs, svgImgs, sw, cw, over, fonts, h: document.documentElement.scrollHeight, total: document.getElementById('total-big').textContent };
    });
    // section screenshots
    await page.addStyleTag({ content: '.pbar{visibility:hidden!important}' });
    const secs = ['.hero', '.route', '#bereken', '#prijs', '#afspraak', '#english', '.foot'];
    for (const s of secs) {
      const el = await page.$(s); if (!el) continue;
      await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
      const name = `${out}/${tag}-${width}-${s.replace(/[#.]/g, '')}.png`;
      await el.screenshot({ path: name });
    }
    report.widths[width] = { errs, cons, failed, bad, ...info };
    await ctx.close();
  }
  fs.writeFileSync(`${out}/${tag}-qa.json`, JSON.stringify(report, null, 1));
  for (const [w, r] of Object.entries(report.widths)) {
    console.log(`== ${w}px pageerrors=${r.errs.length} console=${r.cons.length} failed=${r.failed.length} http>=400=${r.bad.length} imgs=${r.imgs.length} undecoded=${r.imgs.filter(i => !i.ok).length} scrollW=${r.sw} clientW=${r.cw} overflow=${r.over.length} h=${r.h} total=${r.total}`);
    r.errs.concat(r.cons, r.failed, r.bad, r.over).forEach(x => console.log('   ', x));
    console.log('    fonts', [...new Set(r.fonts)].join(' | '));
  }
  await browser.close();
})().catch(e => { console.error('ERR', e); process.exit(1); });
