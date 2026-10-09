// usage: node exercise.js <url> <outdir> <tag>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
const sets = [
  { name: 'A default', expect: { total: '€ 479,04', btw: '€ 83,14' }, steps: [] },
  { name: 'B JAB wave blackout roede pooled one panel', expect: { total: '€ 1.459,33', btw: '€ 253,27' },
    steps: [['radio', 'stof', 'jab'], ['num', 'breedte', '420'], ['num', 'hoogte', '275'], ['radio', 'delen', 'd1'], ['radio', 'plooi', 'wave'], ['radio', 'voering', 'black'], ['range', 'factor', 25], ['radio', 'rail', 'roede'], ['radio', 'zoom', 'zoom'], ['radio', 'lengte', 'plooiend'], ['range', 'open', 35]] },
  { name: 'C Red Label banen double pleat dim wall rail', expect: { total: '€ 1.253,04', btw: '€ 217,47' },
    steps: [['radio', 'stof', 'redlabel'], ['num', 'breedte', '250'], ['num', 'hoogte', '310'], ['radio', 'delen', 'd2'], ['radio', 'plooi', 'dubbel'], ['radio', 'voering', 'dim'], ['range', 'factor', 20], ['radio', 'rail', 'wand'], ['radio', 'zoom', 'lood'], ['radio', 'lengte', 'vloer'], ['range', 'open', 0]] },
  { name: 'D Basics ringen roede wide stepper buttons', expect: {},
    steps: [['radio', 'stof', 'basics'], ['num', 'breedte', '180'], ['click', '[data-step=breedte][data-d="10"]'], ['click', '[data-step=breedte][data-d="10"]'], ['num', 'hoogte', '240'], ['radio', 'plooi', 'ringen'], ['radio', 'rail', 'roede'], ['range', 'factor', 18], ['range', 'open', 60]] },
  { name: 'E invalid width then blur', expect: {}, steps: [['num', 'breedte', '20'], ['blur', 'breedte']] },
];
(async () => {
  const [url, out, tag] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  const errs = [];
  for (const set of sets) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', e => errs.push(set.name + ' ' + e.message));
    await page.goto(url, { waitUntil: 'networkidle' });
    for (const st of set.steps) {
      const [kind, a, b] = st;
      if (kind === 'radio') await page.locator(`input[name=${a}][value=${b}]`).check({ force: true });
      if (kind === 'num') { await page.fill('#' + a, ''); await page.type('#' + a, String(b)); }
      if (kind === 'blur') await page.locator('#' + a).blur();
      if (kind === 'click') await page.click(a);
      if (kind === 'range') await page.$eval('#' + a, (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, b);
    }
    await page.waitForTimeout(200);
    const r = await page.evaluate(() => ({
      total: document.getElementById('total-big').textContent, side: document.getElementById('total-side').textContent,
      btw: document.getElementById('btw-line').textContent, meters: document.getElementById('meters-line').textContent,
      need: document.getElementById('need').textContent, hint: document.getElementById('hint-plooi').classList.contains('on') ? document.getElementById('hint-plooi').textContent : '',
      ticket: [...document.querySelectorAll('#ticket dt')].map((d, i) => d.textContent + '=' + document.querySelectorAll('#ticket dd')[i].textContent).join(' | '),
      lines: [...document.querySelectorAll('#lines tr')].map(tr => tr.innerText.replace(/\s+/g, ' ')).join(' || '),
      errW: document.getElementById('err-breedte').classList.contains('on'), wVal: document.getElementById('breedte').value
    }));
    const nb = x => x.replace(/\u00a0/g, ' '); const ok = (!set.expect.total || nb(r.total) === set.expect.total) && (!set.expect.btw || nb(r.btw).includes(set.expect.btw));
    console.log(`\n### ${set.name}  ${set.expect.total ? (ok ? 'MATCH' : 'MISMATCH expected ' + set.expect.total + ' / ' + set.expect.btw) : ''}`);
    console.log(JSON.stringify(r, null, 1));
    await (await page.$('.stage svg')).screenshot({ path: `${out}/${tag}-scene-${set.name[0]}.png` });
    await page.close();
  }
  console.log('\npageerrors', errs.length, errs.join(' ; '));
  await browser.close();
})();
