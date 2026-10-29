// List rendered anchors on a page. usage: node links.js <url>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  const p = await (await b.newContext()).newPage();
  const r = await p.goto(process.argv[2], { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(4000);
  console.log('status', r && r.status(), 'title', await p.title());
  const a = await p.$$eval('a', as => as.map(x => [x.href, x.innerText.trim().slice(0, 60)]));
  a.forEach(x => console.log(x[0], '|', x[1]));
  await b.close();
})();
