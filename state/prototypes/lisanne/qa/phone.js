// Every app screen on a real phone emulation, scrolled top to bottom, viewport shots in a contact sheet.
const { chromium, devices } = require('/opt/node22/lib/node_modules/playwright');
const W = +(process.argv[2] || 390), H = +(process.argv[3] || 844), TAG = process.argv[4] || 'ip';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: devices['iPhone 13'].userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e)));
  const B = 'http://127.0.0.1:8765/site-app/';
  await p.goto(B); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(500);
  const shots = []; let n = 0;
  const sweep = async (name, max = 8) => {
    // the element that scrolls on this screen
    const sc = await p.evaluate(() => { const c = [...document.querySelectorAll('.card,.list,.page,.main,.panes')].find(e => e.scrollHeight > e.clientHeight + 4 && getComputedStyle(e).overflowY !== 'visible' && e.offsetParent); if (c) { c.setAttribute('data-sc', '1'); return 'el'; } return 'doc'; });
    for (let i = 0; i < max; i++) {
      const f = `qa/phone/${TAG}-${String(n++).padStart(2, '0')}-${name}-${i}.png`; await p.screenshot({ path: f }); shots.push(f);
      const more = await p.evaluate(([sc, H]) => { const el = sc === 'el' ? document.querySelector('[data-sc]') : document.scrollingElement; const before = el.scrollTop; el.scrollTop = before + H * 0.85; return el.scrollTop > before + 2; }, [sc, H]);
      await p.waitForTimeout(250); if (!more) break;
    }
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (over > 0) console.log('OVERFLOW', name, over);
  };
  await p.goto(B + '#/'); await p.waitForTimeout(1600); await sweep('start');
  await p.goto(B + '#/wegwijzer'); await p.waitForTimeout(500); await sweep('ww1', 3);
  const dd = new Date(); dd.setDate(dd.getDate() - 62); await p.fill('#d0', dd.toISOString().slice(0, 10)); await p.tap('[data-act=ww-1]'); await p.waitForTimeout(400); await sweep('ww2', 4);
  for (const f of ['conflict', 'pva', 'loon']) await p.tap(`[data-flag=${f}]`);
  await p.tap('[data-act=ww-2]'); await p.waitForTimeout(500); await sweep('ww3', 10);
  await p.fill('#wn', 'Mila Janssen'); await p.fill('#we', 'mila@example.nl'); await p.tap('#wc'); await p.tap('[data-act=ww-send]'); await p.waitForTimeout(500); await sweep('wwsent', 2);
  await p.goto(B + '#/bureau'); await p.waitForTimeout(500); await sweep('list', 6);
  for (const id of ['s4', 's3']) { await p.goto(B + '#/bureau/' + id); await p.waitForTimeout(500); await sweep('card-' + id, 14); }
  // tap an enquiry from far down the list, the card has to open at its top
  await p.goto(B + '#/bureau'); await p.waitForTimeout(400); await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(300); await p.tap('[data-open="s4"]'); await p.waitForTimeout(500);
  const top = await p.evaluate(() => ({ y: Math.round(window.scrollY), h2: Math.round(document.querySelector('.card h2').getBoundingClientRect().top) }));
  console.log('TAP FROM LIST', JSON.stringify(top), top.y === 0 && top.h2 > 0 && top.h2 < 200 ? 'OK' : 'PROBLEM');
  await p.goto(B + '#/termijnen'); await p.waitForTimeout(400); await sweep('termijnen', 4);
  await p.goto(B + '#/resultaten'); await p.waitForTimeout(400); await sweep('resultaten', 4);
  await p.goto(B + '#/instellingen'); await p.waitForTimeout(400); await sweep('instellingen', 3);
  await p.goto(B + '#/bureau'); await p.waitForTimeout(300); await p.tap('[data-act=paste]'); await p.tap('[data-m=ex]'); await p.waitForTimeout(300); await p.screenshot({ path: `qa/phone/${TAG}-${String(n++).padStart(2, '0')}-paste.png` }); shots.push(`qa/phone/${TAG}-${String(n - 1).padStart(2, '0')}-paste.png`);
  console.log(TAG, 'shots', shots.length, 'errors', JSON.stringify(errs));
  require('fs').writeFileSync(`qa/phone/${TAG}-list.json`, JSON.stringify(shots));
  await b.close();
})();
