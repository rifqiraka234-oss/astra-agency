// axe on the page at 1440 and 390, with motion on (scrolled through so every reveal and the bloom have run) and
// reduced, plus the states a visitor can open, the phone menu, no date yet, the letter sent.
// usage: AXE=/path/axe.min.js node qa/axe.js <base url> [plant]
const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync(process.env.AXE, 'utf8');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  let runs = 0, bad = 0;
  const run = async (p, tag) => {
    await p.addScriptTag({ content: AXE });
    const r = await p.evaluate(async T => (await axe.run(document, { runOnly: T })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 4).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })), TAGS);
    runs++; if (r.length) bad++;
    console.log(tag.padEnd(34), r.length ? r.length + ' violations' : 'clean');
    r.forEach(v => console.log('    ', v.impact, v.id, v.n, JSON.stringify(v.ex).slice(0, 700)));
  };
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const rm of [false, true]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm ? 'reduce' : 'no-preference' });
    const p = await c.newPage();
    await p.goto(U, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    if (plant) await p.evaluate(() => { const i = document.createElement('img'); i.src = '/media/fibre.png'; document.querySelector('main').appendChild(i); const t = document.createElement('p'); t.textContent = 'low contrast'; t.style.color = '#ddd'; document.querySelector('.hero .wrap').appendChild(t); });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(rm ? 20 : 90); }
    await p.waitForTimeout(1600);
    await run(p, `${w} ${rm ? 'reduced' : 'motion'} scrolled`);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(900);
    await run(p, `${w} ${rm ? 'reduced' : 'motion'} back at the top`);
    if (!rm) {
      await p.evaluate(() => window.HIH.set({ noDate: true, year: 2029 })); await p.waitForTimeout(300);
      await run(p, `${w} no date yet, 2029`);
      await p.evaluate(() => window.HIH.set({ noDate: false, date: new Date(2027, 5, 12) }));
      if (w < 600) { await p.click('.mbtn'); await p.waitForTimeout(300); await run(p, `${w} menu open`); await p.keyboard.press('Escape'); }
      await p.evaluate(() => document.getElementById('letter').scrollIntoView()); await p.waitForTimeout(500);
      await p.click('.send'); await p.waitForTimeout(300); await run(p, `${w} letter with an error`);
      await p.fill('input[name="first"]', 'Lotte'); await p.fill('input[name="last"]', 'Peeters'); await p.fill('input[name="email"]', 'lotte@example.com'); await p.click('.send'); await p.waitForTimeout(2800);
      await run(p, `${w} letter sealed`);
    }
    await c.close();
  }
  await b.close();
  console.log(runs + ' runs, ' + (runs - bad) + ' clean' + (plant ? ' (plant mode, every run should report)' : ''));
})();
