const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('http://127.0.0.1:8765/site-app/#/bureau', { waitUntil: 'load' });
  await p.waitForTimeout(800);
  const out = await p.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('gericht-verder-v1'));
    return st.items.map(it => { const a = window.GV.analyze(it.text, it.source); return { id: it.id, src: it.source, sender: a.sender, client: a.client, orgs: a.orgs, lane: a.lane, second: a.second, facts: a.facts.map(f => f.kind + ' ' + f.date.toDateString() + ' | ' + f.hit), fatal: a.fatal.map(d => d.label + ' ' + d.date.toDateString() + ' | ' + d.basis), flags: a.flags, conflict: a.conflict.hits }; });
  });
  console.log(JSON.stringify(out, null, 1));
  const ex = await p.evaluate(() => { const t = "Goedemiddag,\n\nIk ben op 13 oktober op staande voet ontslagen door Geleenbeek Techniek BV. Ik heb een brief gekregen.\n\nMet vriendelijke groet,\nRoy Kurvers"; const a = window.GV.analyze(t); return { sender: a.sender, facts: a.facts.map(f => f.kind + ' ' + f.date.toDateString()), fatal: a.fatal.map(d => d.label + ' ' + d.date.toDateString()), conflict: a.conflict.hits, lane: a.lane }; });
  console.log('PASTE EXAMPLE', JSON.stringify(ex));
  const d2 = await p.evaluate(() => window.GV.findFacts("Getekend op 03.10.2026. Uitspraak 5-9-26. Ziek sinds 1 jan. Laatste werkdag 31 december 2026.").map(f => f.kind + ' ' + f.date.toDateString()));
  console.log('FORMATS', JSON.stringify(d2));
  console.log('ERRORS', JSON.stringify(errs));
  await b.close();
})();
