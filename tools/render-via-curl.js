#!/usr/bin/env node
/*
 * The second render path, for when site-audit.js prints RENDER NOT TRUSTED.
 *
 *     node tools/render-via-curl.js https://www.example.de/ out-tag
 *
 * Chromium through the agent proxy fails on some hosts with ERR_TOO_MANY_RETRIES
 * or 415s that the site never sent. This renders the same page with every request
 * to the site's own host served by curl instead, so the page gets its real assets.
 * Third party requests go through Chromium as normal.
 *
 * First used on wlfm.de, 2026-09-23. site-audit voided the run, Chromium alone
 * failed 16 requests, this served 63 with 0 errors and the page could be looked at.
 *
 * It writes a full page screenshot plus parts of 1800px, halved, so each part can
 * actually be read. LOOK AT EVERY PART. If `curl errors` is not 0, or undecoded
 * images remain, the render is still not trustworthy for anything visual, and the
 * row stays BLOCKED_NEEDS_INFO for Raka to open.
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const [url, tag = 'render'] = process.argv.slice(2);
if (!url) { console.error('usage, node tools/render-via-curl.js <url> <tag>'); process.exit(2); }
const host = new URL(url).hostname.replace(/^www\./, '');
const sameSite = new RegExp('^https?://(www\\.)?' + host.replace(/\./g, '\\.') + '(/|$|:|\\?)');
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rvc-'));
const outDir = '/tmp/claude-0';
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  // The proxy terminates TLS with its own CA. That is never evidence about their certificate.
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, viewport: process.env.PHONE ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
  let served = 0, errs = 0, n = 0;
  const bad = [];
  await ctx.route(u => sameSite.test(u.toString()), async route => {
    const f = path.join(tmpDir, String(n++));
    try {
      const meta = execFileSync('curl', ['-sL', '--max-time', '30', '-o', f, '-w', '%{http_code}|%{content_type}',
        route.request().url()]).toString();
      const [st, ct] = meta.split('|');
      served++;
      if (parseInt(st) >= 400) bad.push(st + ' ' + route.request().url().slice(0, 110));
      await route.fulfill({ status: parseInt(st) || 200, body: fs.readFileSync(f),
        headers: { 'content-type': ct || 'application/octet-stream' } });
    } catch (e) { errs++; bad.push('curl failed ' + route.request().url().slice(0, 110)); await route.abort(); }
  });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load', timeout: 120000 });
  for (let y = 0; y < 20000; y += 700) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(350); }
  await p.waitForTimeout(3000);
  const imgs = await p.$$eval('img', a => a.map(i => i.naturalWidth));
  const widths = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  await p.evaluate(() => window.scrollTo(0, 0));
  const full = path.join(outDir, `${tag}-curlrender.png`);
  await p.screenshot({ path: full, fullPage: true });
  await b.close();
  fs.rmSync(tmpDir, { recursive: true, force: true });

  console.log(`== ${url}`);
  console.log(`served by curl ${served}   curl errors ${errs}   images ${imgs.length}   undecoded ${imgs.filter(w => w === 0).length}`);
  console.log(`page width ${widths[0]} against viewport ${widths[1]}${widths[0] > widths[1] + 2 ? ', HORIZONTAL OVERFLOW' : ''}`);
  if (bad.length) console.log('non 200 from their own server, these ARE theirs\n  ' + bad.join('\n  '));
  try {
    const parts = execFileSync('python3', ['-c', `
from PIL import Image
im=Image.open('${full}'); w,h=im.size; out=[]
for i,y in enumerate(range(0,h,1800)):
    q='${full}'.replace('.png',f'-part{i}.png'); im.crop((0,y,w,min(h,y+1800))).resize((w//2,max(1,(min(h,y+1800)-y)//2))).save(q); out.append(q)
print('\\n'.join(out))`]).toString();
    console.log('wrote, LOOK AT EVERY PART\n  ' + parts.trim().split('\n').join('\n  '));
  } catch (e) { console.log('wrote ' + full + ', split failed, open it directly'); }
  if (errs || imgs.some(w => w === 0)) console.log('!!  Still gaps. Undecoded images can be lazy or hidden slides, never call them broken from this alone.');
})();
