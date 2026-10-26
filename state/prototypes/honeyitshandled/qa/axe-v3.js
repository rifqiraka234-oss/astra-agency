// axe on v3 at 1440 and 390, motion on (scrolled through so every scene has run) and reduced, both pages, plus the states a
// visitor can open, partial planning with lights handed over, day coordination, no date yet, the phone menu, the reply
// with its errors and sealed, the events enquiry with its errors and sealed.
// usage: AXE=/path/axe.min.js NODE_PATH=... node qa/axe-v3.js <base url> [plant]
const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync(process.env.AXE, 'utf8');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const U = base + '/?today=2026-10-26';
const EXE = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
  let runs = 0, bad = 0;
  const run = async (p, tag) => {
    if (plant) await p.evaluate(() => { if (document.getElementById('plant-x')) return; const t = document.createElement('p'); t.id = 'plant-x'; t.textContent = 'low contrast'; t.style.color = '#e6e1d9'; t.style.background = '#F6F0E6'; document.body.appendChild(t); });
    await p.addScriptTag({ content: AXE });
    const r = await p.evaluate(async T => (await axe.run(document, { runOnly: T })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 4).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })), TAGS);
    runs++; if (r.length) bad++;
    console.log(tag.padEnd(46), r.length ? r.length + ' violations' : 'clean');
    r.forEach(v => console.log('    ', v.impact, v.id, v.n, JSON.stringify(v.ex).slice(0, 700)));
  };
  const scroll = async (p, rm) => { const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 420) { await p.evaluate(y => scrollTo(0, y), y); await p.mouse.wheel(0, 1); await p.waitForTimeout(rm ? 20 : 110); } await p.waitForTimeout(1500); };
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const rm of [false, true]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm ? 'reduce' : 'no-preference', isMobile: w < 600, hasTouch: w < 600 });
    c.setDefaultTimeout(8000);
    const p = await c.newPage();
    const tg = `${w} ${rm ? 'reduced' : 'motion'}`;
    await p.goto(U, { waitUntil: 'load' }); await p.waitForTimeout(700);
    await scroll(p, rm); await run(p, `${tg} wedding, scrolled to the foot`);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(900); await run(p, `${tg} wedding, back at the top`);
    if (!rm) {
      await p.evaluate(() => { HIH.set({ help: 'partial', lights: [2, 9, 13] }); document.getElementById('blue').scrollIntoView(); }); await p.waitForTimeout(500); await run(p, `${tg} partial planning, lights handed over`);
      await p.evaluate(() => HIH.set({ help: 'day' })); await p.waitForTimeout(300); await run(p, `${tg} day coordination`);
      await p.evaluate(() => HIH.set({ help: 'full', noDate: true, year: 2029 })); await p.evaluate(() => document.querySelector('.when').scrollIntoView()); await p.waitForTimeout(300); await run(p, `${tg} no date yet, 2029`);
      await p.evaluate(() => HIH.set({ noDate: false, date: new Date(2027, 5, 12) }));
      if (w < 600) { await p.evaluate(() => scrollTo(0, 0)); await p.click('.mbtn'); await p.waitForTimeout(400); await run(p, `${tg} menu open`); await p.keyboard.press('Escape'); }
      await p.evaluate(() => document.querySelector('form[data-reply="wedding"] .send').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
      await p.click('form[data-reply="wedding"] .send'); await p.waitForTimeout(300); await run(p, `${tg} reply with errors`);
      await p.evaluate(() => document.querySelector('form[data-reply="wedding"] details').setAttribute('open', '')); await p.waitForTimeout(200); await run(p, `${tg} reply, change the day open`);
      await p.fill('input[data-k="n1"]', 'Lotte'); await p.fill('form[data-reply="wedding"] input[type="email"]', 'lotte@example.com'); await p.click('form[data-reply="wedding"] .send'); await p.waitForTimeout(1800);
      await run(p, `${tg} reply sealed`);
    }
    // the events page
    await p.evaluate(() => { location.hash = '#events'; }); await p.waitForTimeout(700);
    await run(p, `${tg} events, at the top`);
    await scroll(p, rm); await run(p, `${tg} events, scrolled to the foot`);
    if (!rm) {
      await p.evaluate(() => HIH.ev.set({ type: 'company', team: true })); await p.waitForTimeout(200);
      await p.evaluate(() => document.querySelector('form[data-reply="event"] .send').scrollIntoView({ block: 'center' })); await p.click('form[data-reply="event"] .send'); await p.waitForTimeout(300); await run(p, `${tg} events enquiry with errors`);
      await p.fill('input[data-e="name"]', 'An'); await p.fill('form[data-reply="event"] input[type="email"]', 'an@example.com'); await p.click('form[data-reply="event"] .send'); await p.waitForTimeout(1800); await run(p, `${tg} events enquiry sealed`);
    }
    await c.close();
  }
  await b.close();
  console.log(runs + ' runs, ' + (runs - bad) + ' clean' + (plant ? ' (plant mode, every run should report)' : ''));
})();
