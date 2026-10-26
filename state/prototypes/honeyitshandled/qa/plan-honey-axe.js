// axe on the Honey It's Handled plan, desktop and phone, reduced and full motion, controls in their default and their
// switched states, every table opened. usage: node plan-honey-axe.js <base> <axe.min.js> [plant]
// With "plant", a low contrast line is added and axe must report it.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const base = (process.argv[2] || 'http://127.0.0.1:8731').replace(/\/$/, ''), AXE = fs.readFileSync(process.argv[3], 'utf8'), plant = process.argv[4] === 'plant';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  let total = 0, runs = 0;
  for (const rm of ['reduce', 'no-preference']) for (const [w, h] of [[1280, 860], [390, 844]]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm, ...(w < 600 ? { isMobile: true, hasTouch: true } : {}) });
    const p = await c.newPage();
    await p.goto(base + '/', { waitUntil: 'networkidle' });
    for (const state of ['default', 'switched']) {
      if (state === 'switched') {
        await p.click('[data-scope="city"]'); await p.click('[data-year="2028"]'); await p.click('[data-view="ig"]');
        await p.evaluate(() => { const r = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }; r('fld-k', 3); r('cal-l', 18); r('mo-b', 90000); document.querySelectorAll('details').forEach(d => d.open = true); });
      }
      if (plant) await p.evaluate(() => { const q = document.createElement('p'); q.textContent = 'Planted low contrast line'; q.style.color = '#D3E9EE'; document.querySelector('#today .wrap').appendChild(q); });
      for (let y = 0; y < 45; y++) { await p.mouse.wheel(0, h * 0.8); await p.waitForTimeout(50); }
      await p.waitForTimeout(1200);
      await p.addScriptTag({ content: AXE });
      const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })));
      total += r.length; runs++;
      console.log(rm.padEnd(13), w, state.padEnd(8), r.length ? r.length + ' violations' : 'clean');
      r.forEach(v => console.log('   ', v.impact, v.id, v.n, JSON.stringify(v.ex).slice(0, 600)));
      await p.evaluate(() => scrollTo(0, 0));
    }
    await c.close();
  }
  await b.close(); console.log('runs', runs, 'violations', total);
  process.exit(plant ? (total >= runs ? 0 : 1) : (total ? 1 : 0));
})();
