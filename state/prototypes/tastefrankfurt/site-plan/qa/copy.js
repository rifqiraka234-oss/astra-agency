// copy: the plan's words under the same rules as the prototype's, taken from qa/check.js so the two never drift. No dashes
// outside their own terms, no colons in prose, at most one exclamation mark, no banned words, English with contractions.
// The worth line is read at three slider positions. The plant adds a dash, a banned word and an uncontracted phrase.
// node qa/copy.js [base url]
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright-core');
const BASE = (process.argv[2] || 'http://127.0.0.1:5340').replace(/\/$/, '');
const src = fs.readFileSync(path.join(__dirname, '../../tastefrankfurt-prototype/qa/check.js'), 'utf8');
const a = src.indexOf('const TERMS'), f = src.indexOf('function copyCheck', a), b = src.indexOf('\n}', f) + 2;
const copyCheck = new Function(src.slice(a, b) + '\nreturn copyCheck;')();
(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  const p = await br.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const texts = [await p.evaluate(() => document.body.innerText)];
  for (const v of [[30, 45], [120, 55], [300, 65]]) {
    await p.evaluate(([g, pp]) => { const r = [...document.querySelectorAll('#worth input[type=range], input[type=range]')]; if (r[0]) { r[0].value = g; r[0].dispatchEvent(new Event('input', { bubbles: true })); } if (r[1]) { r[1].value = pp; r[1].dispatchEvent(new Event('input', { bubbles: true })); } }, v);
    await p.waitForTimeout(300);
    texts.push(await p.evaluate(() => (document.querySelector('[data-out=site]') || {}).textContent || ''));
  }
  await br.close();
  // the sources it cites are links written without https, links and not prose
  const all = texts.join('\n').replace(/\b(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|de|app|org|net)\/?\S*/gi, 'U'), bad = copyCheck(all, 'en'), plant = copyCheck(all + ' It is a seamless journey — book now! Really!', 'en');
  console.log(bad.length ? 'FAIL  plan copy  ' + bad.join(' ; ') : `PASS  plan copy  ${all.split(/\s+/).length} words clean, the worth line at three positions`);
  console.log(plant.length >= 3 ? 'plant caught  plan copy  ' + plant.length + ' planted faults found' : 'DETECTOR BROKEN  plan copy');
  console.log('worth lines', texts.slice(1).join(' | '));
  process.exit(bad.length || plant.length < 3 ? 1 : 0);
})();
