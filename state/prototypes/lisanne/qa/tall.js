const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = process.argv[2]; const ids = process.argv.slice(3);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('http://127.0.0.1:8765/site-app/#/bureau', { waitUntil: 'load' }); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(500);
  for (const id of ids) {
    await p.goto('http://127.0.0.1:8765/site-app/#/bureau/' + id); await p.waitForTimeout(500);
    await p.addStyleTag({ content: '.desk{height:auto!important}.card,.list{overflow:visible!important}.actions{position:static!important}' });
    await p.waitForTimeout(300);
    const el = await p.$('.card'); await el.screenshot({ path: `${OUT}/card-${id}.png` });
  }
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
