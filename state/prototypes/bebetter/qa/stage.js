// node stage.js   the scenes that move, checked by what they write, with motion and with reduced motion.
// Home, the teddy printed in six pulls, the year dial at a middle day and at day 365, the road at its end, the tag's days.
// For gyms, the stamp after four hours and the 200 tees. FAULT=1 blocks stage.js and press.js, and the run must fail.
const { chromium } = require('playwright');
const { SITE } = require('./pages');
(async () => {
  const b = await chromium.launch();
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const at = (p, sel, f) => p.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY + Math.max(0, e.offsetHeight - innerHeight) * f); }, [sel, f]);
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date());
  const n = Math.round((Date.parse('2026-10-27T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86400000);
  const when = n > 1 ? 'Live in ' + n + ' days' : n === 1 ? 'Live tomorrow' : n === 0 ? 'Live today' : 'Live now';
  for (const motion of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: motion });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    if (process.env.FAULT) await p.route(/\/assets\/(stage|press)\.js/, r => r.abort());
    await p.goto(SITE + '/', { waitUntil: 'networkidle' });
    const m = motion === 'reduce' ? 'reduced' : 'motion';
    if (motion === 'no-preference') {
      await p.waitForTimeout(6500);
      const pr = await p.evaluate(() => ({ svg: !!document.querySelector('.pr svg.pr-svg'), clips: document.querySelectorAll('.pr svg clipPath').length, full: [...document.querySelectorAll('.pr svg clipPath rect')].filter(r => +r.getAttribute('width') === 1748).length, printed: document.querySelector('[data-print]').classList.contains('printed'), label: document.querySelector('.pr svg.pr-svg') && document.querySelector('.pr svg.pr-svg').getAttribute('aria-label') }));
      ok(pr.svg && pr.clips === 6 && pr.full === 6 && pr.printed, 'print ' + JSON.stringify(pr));
      ok(pr.label && pr.label.length > 20, 'printed teddy lost its label');
      await at(p, '.cp', .4); await p.waitForTimeout(400);
      const mid = await p.evaluate(() => ({ day: +document.querySelector('[data-cp-day]').textContent, on: document.querySelectorAll('.cp-bars line.on').length, now: document.querySelectorAll('.cp-bars line.now').length }));
      ok(mid.day > 100 && mid.day < 300 && mid.on === mid.day && mid.now === 1, 'dial mid ' + JSON.stringify(mid));
      await at(p, '.cp', .81); await p.waitForTimeout(400);
      const end = await p.evaluate(() => ({ day: document.querySelector('[data-cp-day]').textContent, x: document.querySelector('[data-cp-x]').textContent, three: document.querySelector('.cp-3').classList.contains('in'), vis: getComputedStyle(document.querySelector('.cp-3')).visibility }));
      ok(end.day === '365' && end.x === '37.8' && end.three && end.vis === 'visible', 'dial end ' + JSON.stringify(end));
      await at(p, '.rd', 1); await p.waitForTimeout(500);
      const rd = await p.evaluate(() => ({ clock: document.querySelector('[data-road-clock]').textContent, cards: document.querySelectorAll('.rd-card.in').length, hit: document.querySelectorAll('.rd-stop.hit').length }));
      ok(rd.clock === '4 NOV' && rd.cards === 4 && rd.hit === 5, 'road end ' + JSON.stringify(rd));
    } else {
      const st = await p.evaluate(() => ({ img: !!document.querySelector('.pr img.pr-img'), live: document.querySelectorAll('[data-live]').length, cpH: document.querySelector('.cp').offsetHeight, vh: innerHeight, bar: getComputedStyle(document.querySelector('.cp-bars line')).stroke }));
      ok(st.img && st.live === 0 && st.cpH < st.vh * 1.6 && st.bar !== 'rgba(236, 231, 221, 0.13)', 'still state ' + JSON.stringify(st));
    }
    const w = await p.evaluate(() => document.querySelector('[data-drop-when]').textContent);
    ok(w === when, m + ' tag says "' + w + '", expected "' + when + '"');
    await p.goto(SITE + '/gyms/', { waitUntil: 'networkidle' });
    await at(p, '.ck', 1); await p.waitForTimeout(700);
    const ck = await p.evaluate(() => ({ out: document.querySelector('[data-ck]').classList.contains('out'), stamp: getComputedStyle(document.querySelector('.ck-stamp')).visibility }));
    ok(ck.out && ck.stamp === 'visible', m + ' stamp ' + JSON.stringify(ck));
    await p.evaluate(() => document.querySelector('.wf').scrollIntoView({ block: 'center' })); await p.waitForTimeout(2200);
    const wf = await p.evaluate(() => { const t = [...document.querySelectorAll('.wf i')]; return { n: t.length, shown: t.filter(i => i.getBoundingClientRect().width > 6).length }; });
    ok(wf.n === 200 && wf.shown === 200, m + ' waffle ' + JSON.stringify(wf));
    ok(!errs.length, m + ' page errors ' + errs.join(' | '));
    await p.close();
  }
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS');
  await b.close(); process.exit(fails.length ? 1 : 0);
})();
