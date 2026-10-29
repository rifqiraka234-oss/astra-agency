// Full page phone capture with real iPhone 13 emulation, same launch as tools/site-audit.js.
// usage: node phone_full.js <url> <out_png>
const { chromium, devices } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
const { execFileSync } = require('child_process');
const [url, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`],
  });
  const ctx = await b.newContext({ ...devices['iPhone 13'], locale: 'de-AT' });
  const p = await ctx.newPage();
  const failed = [];
  p.on('requestfailed', r => failed.push(r.url().slice(0, 100)));
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(2500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h + 1000; y += 500) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(400); }
  await p.waitForTimeout(2500);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(800);
  const imgs = await p.$$eval('img', a => a.map(i => i.naturalWidth));
  const widths = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  await p.screenshot({ path: out, fullPage: true });
  await b.close();
  console.log(`${url} imgs ${imgs.length} undecoded ${imgs.filter(w => w === 0).length} width ${widths} failed ${failed.length}`);
  console.log(execFileSync('python3', ['-I', '-c', `
from PIL import Image
im=Image.open('${out}'); w,h=im.size; print('size',w,h)
for i,y in enumerate(range(0,h,2400)):
    q='${out}'.replace('.png',f'-part{i}.png'); im.crop((0,y,w,min(h,y+2400))).resize((w//2,(min(h,y+2400)-y)//2)).save(q); print(q)`]).toString());
})();
