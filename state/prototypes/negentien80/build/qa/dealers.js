const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
(async () => {
  const [url, out] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  const errs = [];
  async function run(q, blockPdok, shot) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', e => errs.push(q + ' ' + e.message));
    const pd = []; page.on('request', r => { if (r.url().includes('pdok')) pd.push(r.url().split('?')[1].slice(0, 80)); });
    if (blockPdok) await page.route('**/api.pdok.nl/**', r => r.abort());
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.fill('#q', q); await page.click('#searchform button');
    await page.waitForFunction(() => !/Even zoeken/.test(document.getElementById('search-msg').textContent), null, { timeout: 15000 });
    const r = await page.evaluate(() => ({ msg: document.getElementById('search-msg').textContent, card: document.getElementById('dealer-card').innerText.replace(/\s+/g, ' '), key: [...document.querySelectorAll('#key li')].slice(0, 4).map(l => l.innerText.replace(/\s+/g, ' ')).join(' | '), formOn: !document.getElementById('naam').disabled, note: document.getElementById('req-note').textContent }));
    console.log(`\n### "${q}"${blockPdok ? ' (PDOK blocked)' : ''}  pdok calls=${pd.length} ${pd.join(' ; ')}`); console.log(JSON.stringify(r, null, 1));
    if (shot) { await (await page.$('#afspraak')).screenshot({ path: `${out}/${shot}.png` }); }
    return page;
  }
  for (const [q, b, s] of [['5481 EH', false, 'dl-5481'], ['1017', false, null], ['Utrecht', false, null], ['9711 AB', false, null], ['Eindhoven', false, 'dl-eindhoven'], ['xyzqq', false, null], ['5481 EH', true, null], ['Uden', true, null], ["'s-Hertogenbosch", false, null]]) { const p = await run(q, b, s); await p.close(); }
  // form flow
  const page = await run('5402', false, null);
  await page.click('#send'); await page.waitForTimeout(150);
  console.log('\nempty submit error:', await page.$eval('#form-err', e => e.classList.contains('on') + ' ' + e.textContent));
  await page.fill('#naam', 'Test Persoon'); await page.fill('#mail', 'test@voorbeeld.nl'); await page.fill('#opm', 'Erker met drie ramen'); await page.check('#ok');
  await page.click('#send'); await page.waitForTimeout(200);
  console.log('done:', await page.$eval('#done', e => e.classList.contains('on') + ' ' + e.innerText.replace(/\s+/g, ' ')));
  await (await page.$('#afspraak')).screenshot({ path: `${out}/dl-done.png` });
  console.log('\npageerrors', errs.length, errs.join(' ; '));
  await browser.close();
})();
