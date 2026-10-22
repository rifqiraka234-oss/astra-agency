// Pitch v2 tracker, hidden on the hero, right chapter marked in every section, no clipped labels, details open
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const want = { c1: 1, c2: 2, c3: 3, try: 3, c4: 4, c5: 5, c6: 6, next: 6 };
  let bad = 0, checks = 0;
  for (const w of [1440, 1024, 981, 980, 768, 390, 320]) {
    const p = await b.newPage({ viewport: { width: w, height: 860 } }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto('http://127.0.0.1:8765/site-plan/'); await p.waitForTimeout(600);
    const top = await p.evaluate(() => getComputedStyle(document.getElementById('trk')).visibility); checks++;
    if (top !== 'hidden') { bad++; console.log(w, 'tracker visible on hero', top); }
    for (const [id, n] of Object.entries(want)) {
      await p.evaluate(i => document.getElementById(i).scrollIntoView(), id); await p.waitForTimeout(450);
      const r = await p.evaluate(() => { const t = document.getElementById('trk'); const a = t.querySelector('a[aria-current]'); const clip = [...t.querySelectorAll('a')].filter(x => getComputedStyle(x).fontSize !== '0px' && x.scrollWidth > x.clientWidth + 1).map(x => x.textContent); return { vis: getComputedStyle(t).visibility, cur: a ? [...t.querySelectorAll('a')].indexOf(a) + 1 : 0, label: document.getElementById('trk-cur').textContent, done: t.querySelectorAll('a.done').length, clip, over: document.documentElement.scrollWidth - innerWidth }; });
      checks++;
      const ok = r.vis === 'visible' && (r.cur === n || (id === 'next' && r.cur === 6)) && r.clip.length === 0 && r.over === 0;
      if (!ok) { bad++; console.log(w, id, 'want', n, JSON.stringify(r)); }
      if (w === 390 && id === 'c2') await p.screenshot({ path: 'qa/plan/trk-390.png', clip: { x: 0, y: 0, width: 390, height: 120 } });
      if (w === 1440 && id === 'c4') await p.screenshot({ path: 'qa/plan/trk-1440.png', clip: { x: 0, y: 0, width: 1440, height: 120 } });
      if (w === 981 && id === 'c3') await p.screenshot({ path: 'qa/plan/trk-981.png', clip: { x: 0, y: 0, width: 981, height: 80 } });
    }
    // the chapter links move the page to the chapter, under the tracker
    await p.click('#trk a[href="#c5"]'); await p.waitForTimeout(400);
    const land = await p.evaluate(() => Math.round(document.getElementById('c5').getBoundingClientRect().top)); checks++;
    if (land < 40 || land > 70) { bad++; console.log(w, 'c5 link lands at', land); }
    // the two details open and close
    await p.evaluate(() => document.getElementById('c4').scrollIntoView()); await p.waitForTimeout(300);
    for (const k of [0, 1]) { const s = p.locator('.more summary').nth(k); await s.scrollIntoViewIfNeeded(); await s.click(); await p.waitForTimeout(150); const open = await p.evaluate(i => document.querySelectorAll('.more details')[i].open, k); checks++; if (!open) { bad++; console.log(w, 'details', k, 'did not open'); } }
    const over2 = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); checks++; if (over2) { bad++; console.log(w, 'overflow with details open', over2); }
    if (w === 390) await p.screenshot({ path: 'qa/plan/details-390.png', fullPage: false });
    if (errs.length) { bad++; console.log(w, 'errors', errs); }
    await p.close();
  }
  console.log('checks', checks, 'problems', bad);
  await b.close();
})();
