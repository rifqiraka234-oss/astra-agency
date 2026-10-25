const { chromium } = require('playwright');
const out = 'v2b/';
const mid = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight * .45); }, sel);
(async () => {
  require('fs').mkdirSync('v2b', { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  for (const [tag, vp] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const p = await (await b.newContext(vp)).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('http://127.0.0.1:8704/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
    await p.click('.ch[data-ch="princess"]'); await p.waitForTimeout(300);
    await mid(p, '#solo .step'); await p.waitForTimeout(400);
    await p.click('#solo [data-q="1"]'); await p.click('#solo [data-q="1"]'); await p.waitForTimeout(900);
    await p.evaluate(() => { const e = document.querySelector('#solo'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 40); }); await p.waitForTimeout(900);
    await p.screenshot({ path: out + tag + '-1solo.jpg', type: 'jpeg', quality: 72 });
    await p.evaluate(() => { const e = document.querySelector('#tickets'); scrollTo(0, e.getBoundingClientRect().top + scrollY + 60); }); await p.waitForTimeout(900);
    await p.screenshot({ path: out + tag + '-2tiers.jpg', type: 'jpeg', quality: 72 });
    await mid(p, '#spread .sw'); await p.waitForTimeout(300); await p.click('#spread [data-plan="full"]'); await p.waitForTimeout(300);
    await p.evaluate(() => { const e = document.querySelector('#spread'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 40); }); await p.waitForTimeout(1200);
    await p.screenshot({ path: out + tag + '-3full.jpg', type: 'jpeg', quality: 72 });
    await mid(p, '#spread .sw'); await p.click('#spread [data-plan="three"]');
    await p.fill('input[name="name"]', 'Morgana Vale'); await p.fill('input[name="email"]', 'morgana@example.com');
    await mid(p, '.pay'); await p.click('.pay'); await p.waitForTimeout(150);
    await p.evaluate(() => { const t = document.querySelector('.tk'); scrollTo(0, t.getBoundingClientRect().top + scrollY - (innerWidth > 760 ? 120 : 70)); }); await p.waitForTimeout(450);
    await p.screenshot({ path: out + tag + '-4paying.jpg', type: 'jpeg', quality: 72 });
    await p.waitForTimeout(1600);
    await p.screenshot({ path: out + tag + '-5paid.jpg', type: 'jpeg', quality: 72 });
    await p.goto('http://127.0.0.1:8704/valkyrie-retreat/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1800);
    await p.screenshot({ path: out + tag + '-6rt0.jpg', type: 'jpeg', quality: 72 });
    await p.evaluate(() => { const e = document.querySelector('.rt-incl'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 20); }); await p.waitForTimeout(1200);
    await p.screenshot({ path: out + tag + '-7rt1.jpg', type: 'jpeg', quality: 72 });
    await p.evaluate(() => { const e = document.querySelector('#reserve'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 20); }); await p.waitForTimeout(1200);
    await p.screenshot({ path: out + tag + '-8rt2.jpg', type: 'jpeg', quality: 72 });
    console.log(tag, 'errors', errs.length, errs.join(' | '));
  }
  await b.close();
})();
