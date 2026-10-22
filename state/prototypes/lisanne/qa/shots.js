const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = process.argv[2] || 'qa/shots'; require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  for (const [vw, vh, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'm' ? 2 : 1 });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    const B = 'http://127.0.0.1:8765/site-app/';
    const shot = async (n, full) => { await p.waitForTimeout(700); await p.screenshot({ path: `${OUT}/${tag}-${n}.png`, fullPage: !!full }); };
    await p.goto(B + '#/', { waitUntil: 'load' }); await p.waitForTimeout(2600); await shot('01-start', true);
    await p.goto(B + '#/wegwijzer'); await shot('02-ww1');
    const d0 = new Date(); d0.setDate(d0.getDate() - 62); const iso = d0.toISOString().slice(0, 10);
    await p.fill('#d0', iso); await p.click('[data-act=ww-1]'); await shot('03-ww2');
    for (const f of ['conflict', 'pva', 'loon']) await p.check(`[data-flag=${f}]`);
    await p.click('[data-act=ww-2]'); await shot('04-ww3', true);
    await p.fill('#wn', 'Sanne Voorbeeld'); await p.fill('#we', 'sanne@voorbeeld.nl'); await p.fill('#wm', 'Mijn leidinggevende belt me elke week of ik al terugkom.'); await p.check('#wc');
    await p.click('[data-act=ww-send]'); await shot('05-ww-sent');
    await p.click('text=Bekijk hoe het bij Lisanne binnenkomt'); await shot('06-desk-ww', true);
    for (const id of ['s1', 's2', 's3', 's4']) { await p.goto(B + '#/bureau/' + id); await shot('07-card-' + id, true); }
    await p.goto(B + '#/bureau/s4'); await p.click('[data-act=approve]'); await shot('08-approved');
    await p.goto(B + '#/bureau'); await p.click('[data-act=paste]'); await p.click('[data-m=ex]'); await shot('09-paste');
    await p.click('[data-m=go]'); await shot('10-pasted', true);
    await p.goto(B + '#/termijnen'); await shot('11-termijnen', true);
    await p.goto(B + '#/resultaten'); await shot('12-resultaten', true);
    await p.goto(B + '#/instellingen'); await shot('13-instellingen', true);
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(tag, 'errors', JSON.stringify(errs), 'overflow', ov);
    await p.evaluate(() => localStorage.clear());
    await ctx.close();
  }
  await b.close();
})();
