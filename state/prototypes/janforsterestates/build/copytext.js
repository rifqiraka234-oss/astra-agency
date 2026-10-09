// dump visible text, alt/aria/title text and SVG text in several states
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.env.BASE || 'http://127.0.0.1:8791/index.html', { waitUntil: 'networkidle' });
  const grab = () => p.evaluate(() => {
    const out = [document.body.innerText, document.title];
    document.querySelectorAll('[aria-label],[alt],[title],[placeholder]').forEach(e => ['aria-label', 'alt', 'title', 'placeholder'].forEach(a => { const v = e.getAttribute(a); if (v) out.push(v); }));
    document.querySelectorAll('svg text, svg title').forEach(t => out.push(t.textContent));
    out.push(document.querySelector('meta[name=description]').content);
    return out.join('\n');
  });
  let all = await grab();
  await p.fill('#pc', 'NE30 4BA'); await p.click('.types [data-type="T"]'); await p.click('.conds [data-cond="-1"]'); await p.click('#tool .go'); await p.waitForTimeout(300); all += '\n' + await grab();
  await p.fill('#pc', 'NE26 2AB'); await p.click('.types [data-type="D"]'); await p.click('.beds [data-bed="4"]'); await p.click('#tool .go'); await p.waitForTimeout(300); all += '\n' + await grab();
  await p.click('.seg [data-mode="let"]'); await p.fill('#pc', 'NE6 5HY'); await p.click('.chips [data-extra="garden"]'); await p.click('#tool .go'); await p.waitForTimeout(300); all += '\n' + await grab();
  await p.fill('#pc', 'SW1A 1AA'); await p.click('#tool .go'); all += '\n' + await grab();
  await p.click('#bookForm .go'); all += '\n' + await grab();
  await p.fill('#fn', 'Ann'); await p.fill('#ln', 'Lee'); await p.fill('#addr', '1 A Street'); await p.fill('#bpc', 'NE3 1AA'); await p.fill('#ph', '0191'); await p.fill('#em', 'bad'); await p.click('#bookForm .go'); all += '\n' + await grab();
  await p.fill('#em', 'a@b.co'); await p.click('#bookForm .go'); all += '\n' + await grab();
  await p.check('#ok'); await p.click('#bookForm .go'); all += '\n' + await grab();
  fs.writeFileSync(process.argv[2], all);
  await b.close();
})();
