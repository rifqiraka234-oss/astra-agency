// node rendertext.js   the text the scripts write at runtime, read off the rendered page after the controls have been used,
// both languages. Colons and dashes are banned in visible copy. CONTROL=1 writes a line with both and it must be caught.
const { chromium } = require('playwright');
const { pages } = require('./pages');
(async () => {
  const b = await chromium.launch();
  let flags = 0;
  for (const lang of ['en', 'nl']) for (const [host, path] of pages) {
    const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto(host + path + (lang === 'nl' ? '?lang=nl' : ''), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let t = 0; t < document.body.scrollHeight; t += 500) { scrollTo(0, t); await new Promise(r => setTimeout(r, 20)); } });
    if (path === '/gyms/' && host.includes('8811') || path === '/gyms/' && host.includes('prototype')) {
      await p.fill('#k-name', 'Test Gym'); await p.fill('#k-city', 'Breda'); await p.fill('#k-year', '2019'); await p.fill('#k-motto', 'Train hard');
      await p.click('label.pc:has(input[value="hood"])');
    }
    if (process.env.CONTROL) await p.evaluate(() => document.querySelector('main').insertAdjacentHTML('afterbegin', '<p>Control: one – two</p>'));
    const txt = await p.evaluate(() => document.body.innerText);
    const lines = txt.split('\n').map(s => s.trim()).filter(Boolean).filter(s => !/^https?:|@/.test(s));
    const bad = lines.filter(s => /:/.test(s.replace(/https?:\/\/\S+/g, '')) || /[‐-―−]/.test(s) || /(?<![\d/])-(?!\d)/.test(s.replace(/Basic-Fit|e-mail/g, '')));
    flags += bad.length;
    if (bad.length) console.log(lang, host.slice(-4), path, JSON.stringify(bad.slice(0, 6)));
    await p.close();
  }
  console.log('flagged lines', flags);
  await b.close();
})();
