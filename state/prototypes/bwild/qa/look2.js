// v2, every scene at its key scroll points, desktop and phone, WebGL on. usage: node look2.js <base> <outdir> [desk|phone]
const { chromium } = require('playwright');
const base = (process.argv[2] || 'http://localhost:8710').replace(/\/$/, ''), out = process.argv[3], only = process.argv[4];
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const [w, h, tag] of [[1440, 900, 'desk'], [390, 844, 'phone']]) {
    if (only && only !== tag) continue;
    const p = await b.newPage({ viewport: { width: w, height: h } }); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(2200);
    const at = async (sel, f, name, wait = 900) => {
      await p.evaluate(([s, f]) => { const e = document.querySelector(s); const span = Math.max(0, e.offsetHeight - innerHeight); scrollTo(0, e.getBoundingClientRect().top + scrollY + span * f); }, [sel, f]);
      await p.waitForTimeout(wait); await p.screenshot({ path: `${out}/${tag}-${name}.png` });
    };
    await p.screenshot({ path: `${out}/${tag}-00-hero.png` });
    await at('#run', .3, '01-claw30'); await at('#run', .62, '02-claw62'); await at('#run', .85, '03-words');
    for (const f of [.08, .3, .55, .85]) await at('#dark', f, '1-dark' + Math.round(f * 100), 1300);
    for (const f of [.1, .55, .8, .98]) await at('#seen', f, '2-flare' + Math.round(f * 100), 900);
    await at('#vest', 0, '3-feat', 1500);
    await at('#reserve', 0, '4-reserve');
    await p.fill('[data-rs] input[name=email]', 'you@example.com'); await p.click('[data-rs] button[type=submit]'); await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelector('[data-bib]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(600); await p.screenshot({ path: `${out}/${tag}-4-paid.png` });
    await at('#adventure', 0, '5-ad', 1200);
    /* the spec that plays sits mid screen on a wide screen and just under the film on a phone */
    const specAt = async (i, name) => { await p.evaluate(([i, ph]) => { const e = document.querySelectorAll('[data-seg]')[i]; scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight * (ph ? .7 : .5) + 10); }, [i, w < 980]); await p.waitForTimeout(2500); await p.screenshot({ path: `${out}/${tag}-${name}.png` }); };
    await specAt(1, '5-spec2'); await specAt(6, '5-spec7');
    await p.evaluate(() => document.querySelector('.ad-buy').scrollIntoView({ block: 'center' })); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/${tag}-5-buy.png` });
    for (const f of [0, .45, .9]) await at('.st-pin', f, '6-bear' + Math.round(f * 100), 1400);
    await p.evaluate(() => document.querySelector('.st-q').scrollIntoView({ block: 'start' })); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/${tag}-6-q.png` });
    await p.evaluate(() => document.querySelector('.phs').scrollIntoView({ block: 'start' })); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/${tag}-6-phs.png` });
    await p.evaluate(() => document.querySelector('.join').scrollIntoView({ block: 'center' })); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/${tag}-6-join.png` });
    await at('#faq', 0, '7-faq'); await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/${tag}-8-foot.png` });
    console.log(tag, 'errors', errs.slice(0, 5), 'scrollW', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth), 'webgl', await p.evaluate(() => document.documentElement.classList.contains('webgl')), 'H', await p.evaluate(() => (document.documentElement.scrollHeight / innerHeight).toFixed(1)));
    await p.close();
  }
  await b.close();
})();
