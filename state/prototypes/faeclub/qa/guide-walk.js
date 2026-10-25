// Walks the home page as a ticket buyer and measures the route to the action.
const { chromium } = require('playwright');
const URL = process.argv[2] || 'https://astra-faeclub-prototype.netlify.app/';
const OUT = process.argv[3] || 'guide';
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desk']]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto(URL, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1200);
    const m = await p.evaluate(() => {
      const vh = innerHeight, y = id => { const e = document.querySelector(id); return e ? +((e.getBoundingClientRect().top + scrollY) / vh).toFixed(1) : null; };
      const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && r.top < vh && r.bottom > 0 && s.visibility !== 'hidden' && +s.opacity > 0.05; };
      const firstScreen = [...document.querySelectorAll('main a, main button, main p, main h1')].filter(vis).map(e => e.tagName + ':' + e.textContent.trim().slice(0, 60));
      const hdrBtns = [...document.querySelectorAll('.hdr a')].filter(vis).map(e => e.textContent.trim());
      const pounds = [...document.querySelectorAll('main *')].filter(e => e.children.length === 0 && /£/.test(e.textContent) && vis(e)).map(e => e.textContent.trim().slice(0, 40));
      return { pageVh: +(document.documentElement.scrollHeight / vh).toFixed(1), taleEnd: +((document.querySelector('.tale').offsetTop + document.querySelector('.tale').offsetHeight) / vh).toFixed(1),
        solo: y('#solo'), tickets: y('#tickets'), spread: y('#spread'), checkout: y('#checkout'), venue: y('#venue'), dress: y('#dress'), faqs: y('#faqs'), club: y('#night-club'), foot: y('.ftr'), firstScreen, hdrBtns, pounds };
    });
    console.log(tag, JSON.stringify(m, null, 1));
    await p.screenshot({ path: `${OUT}/${tag}-0-hero.png` });
    // sticky bar and what's actionable at each step through the tale
    const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const rows = [];
    for (let vh = 0; vh <= m.foot + 1; vh += 0.5) {
      await p.evaluate(v => scrollTo(0, v * innerHeight), vh);
      await p.waitForTimeout(140);
      const r = await p.evaluate(() => {
        const vh = innerHeight;
        const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && r.top < vh - 10 && r.bottom > 10 && s.visibility !== 'hidden' && +s.opacity > 0.05 && !e.closest('[inert]'); };
        const acts = [...document.querySelectorAll('main a[href*="#tickets"], main a[href*="#checkout"], main [data-pick], main .pay, main [data-plan], main [data-q]')].filter(vis).length;
        return { sbar: document.querySelector('[data-sbar]').classList.contains('on'), acts, hdr: !!document.querySelector('.hdr .btn') && vis(document.querySelector('.hdr .btn')) };
      });
      rows.push(vh + ':' + (r.sbar ? 'S' : '-') + r.acts + (r.hdr ? 'h' : ''));
    }
    console.log(tag, 'route', rows.join(' '));
    for (const f of [0.25, 0.5, 0.75, 0.96]) {
      await p.evaluate(fr => { const t = document.querySelector('.tale'); scrollTo(0, t.offsetTop + (t.offsetHeight - innerHeight) * fr); }, f);
      await p.waitForTimeout(500);
      await p.screenshot({ path: `${OUT}/${tag}-tale-${Math.round(f * 100)}.png` });
    }
    await p.evaluate(() => { const t = document.querySelector('.tale'); scrollTo(0, t.offsetTop + t.offsetHeight - innerHeight * .4); });
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}/${tag}-after-tale.png` });
    await p.close();
  }
  await b.close();
})();
