// Does a slow image show Raka's broken icon with alt text? Delay f3 and m3 by 15s, f4 fails outright.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1837, height: 1000 } });
  await p.route('**/img/f3-conflict.jpg', async r => { await new Promise(x => setTimeout(x, 15000)); r.continue(); });
  await p.route('**/img/f4-reply.jpg', r => r.abort());
  await p.goto('http://127.0.0.1:8765/site-plan/'); await p.waitForTimeout(800);
  await p.evaluate(() => document.querySelector('#c2 .step:nth-child(3)').scrollIntoView({ block: 'center' })); await p.waitForTimeout(2500);
  await p.screenshot({ path: 'qa/plan/slow-1837.png' });
  const st = await p.evaluate(() => [...document.querySelectorAll('#c2 img')].map(i => [i.currentSrc.split('/').pop(), i.complete, i.naturalWidth]));
  console.log(JSON.stringify(st));
  await b.close();
})();
