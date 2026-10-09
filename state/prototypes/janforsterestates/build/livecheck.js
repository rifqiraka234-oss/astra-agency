const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const spki = require('/home/user/astra-agency/tools/proxy-ca-spki.js')();
const URL = 'https://astra-janforsterestates-prototype.netlify.app/';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--ignore-certificate-errors-spki-list=' + spki] });
  for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = [], bad = [];
    p.on('pageerror', e => errs.push(String(e)));
    p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
    p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    p.on('requestfailed', r => bad.push('FAIL ' + r.url() + ' ' + (r.failure() || {}).errorText));
    const resp = await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await p.waitForTimeout(2000);
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } });
    await p.waitForTimeout(2000);
    const info = await p.evaluate(() => ({
      title: document.title, url: location.href,
      reveal: [...document.querySelectorAll('.rv,h1,h2')].filter(e => e.classList.contains('in')).length + '/' + document.querySelectorAll('.rv,h1,h2').length,
      imgs: [...document.images].map(i => i.getAttribute('src') + ' ' + (i.complete && i.naturalWidth > 0 ? 'ok' : 'BROKEN')),
      fonts: [...document.fonts].filter(f => f.status !== 'loaded').map(f => f.family + ' ' + f.status),
      scrollW: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth,
      dots: document.querySelectorAll('#heroSwarm circle').length, range: document.getElementById('rh').innerText.replace(/\s+/g, ' ')
    }));
    await p.fill('#pc', 'NE12 6GD'); await p.click('.types [data-type="T"]'); await p.click('.beds [data-bed="3"]'); await p.click('#tool .go'); await p.waitForTimeout(400);
    const after = await p.evaluate(() => document.getElementById('rh').innerText.replace(/\s+/g, ' ') + ' | ' + document.getElementById('rPos').innerText);
    console.log(tag, 'status', resp.status(), JSON.stringify(info));
    console.log(tag, 'tool NE12 6GD terraced 3 good ->', after);
    console.log(tag, 'PAGEERRORS', JSON.stringify(errs), 'BAD', JSON.stringify(bad));
    await p.screenshot({ path: `shots/live_${tag}.png` });
    await p.close();
  }
  await b.close();
})();
