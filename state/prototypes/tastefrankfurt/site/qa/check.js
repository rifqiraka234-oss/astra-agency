// The brief's section 19 checks for the built pages, each run clean and then against a planted fault it has to catch.
//   node qa/check.js [base url] [page ...]    (serve the folder first, default http://127.0.0.1:5310/)
// walk: every half screen at 390 and 1440 has a way to the enquiry that isn't the header (the bar counts)
// copy: dashes outside their own terms, colons in prose, emoji, exclamation marks, banned words, uncontracted English
// overflow: no sideways scroll at eight widths, after a resize, no word wider than its line, no text past the screen edge
// errors: cold load, nothing forced, zero console errors and failed requests, every image decoded
// axe: three scroll points, both sizes, both languages, both motion modes
// nojs: with scripts off the page still reads, their cases and the place lines are there
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const BASE = (process.argv[2] || 'http://127.0.0.1:5310/').replace(/\/$/, '');
const PAGES = process.argv.slice(3).length ? process.argv.slice(3) : ['/', '/weihnachtsfeier/', '/menues/', '/referenzen/', '/ueber-uns/', '/kontakt/', '/404.html'];
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const out = []; let failed = 0, broken = 0;
const log = (ok, name, detail) => { out.push(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(30)} ${detail}`); if (!ok) failed++; };
const plant = (caught, name, detail) => { out.push(`${caught ? 'plant caught' : 'DETECTOR BROKEN'}  ${name.padEnd(22)} ${detail}`); if (!caught) broken++; };
const timed = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error('timeout')), ms))]);

// their own terms that carry a hyphen, kept as they write them
const TERMS = ['Live-Cooking', 'Rhein-Main', 'Rhein-Main-Gebiet', 'Rhein-Main-Gebiets', 'Cous-Cous', 'Mango-Chutney', 'Lunch-Catering', 'Bau-Catering', 'Premieren-Catering', 'Cocktail-Bar', 'E-Mail', 'Event-Datum', 'Bar-Service', 'Softdrinks-Bar', 'Live-Cooking-Stationen', 'Plancha-Grill', 'Brioche-', 'Service-', 'Bowl-Station', 'Schmidt-Lange', 'Mini-Pfannkuchen', 'Zimt-Zucker', 'Frucht-Variationen', 'Profi-Bar', 'Signature-Mixe', 'Bio-Limonaden', 'Komplett-Paket', 'Premium-Pakete', 'Bar-Module', 'Vorab-Beratung', 'Catering-Konzept', 'Service-Dauer', 'Catering-Industrie', 'Mitarbeiter-Event', 'After-Run-Catering', 'Indoor-Weihnachtsfest', 'Veggie-Option', 'Live-Cooking-Hochzeit', 'Burger-Station', 'Weihnachtsmarkt-Desserts', 'Standard-Catering'];
const BANNED = ['delve', 'leverage', 'utilize', 'harness', 'unlock', 'unleash', 'empower', 'elevate', 'streamline', 'transform', 'supercharge', 'seamless', 'robust', 'cutting edge', 'bespoke', 'tailored', 'holistic', 'innovative', 'unparalleled', 'comprehensive', 'curated', 'immersive', 'landscape', 'journey', 'testament', 'synergy', 'solutions', 'furthermore', 'moreover', 'additionally', 'indulge', 'mouthwatering', 'unvergesslich', 'genuss pur', 'kulinarische reise', 'rundum-sorglos', 'für jeden geschmack', 'mit liebe gemacht', 'das gewisse etwas', 'erlebnis der extraklasse', 'maximale flexibilität', 'mit herz', 'qualität & zufriedenheit', 'nicht nur', 'not just', 'egal ob'];
const UNCONTRACTED = /\b(it is|do not|you will|we are|that is|does not|is not|are not|we will|you are|they are|can not|cannot|i am|we have|you have)\b/i;
function copyCheck(text, lang) {
  const bad = [];
  let t = text; for (const term of [...TERMS].sort((a, b) => b.length - a.length)) t = t.split(term).join(term.replace(/-/g, '·'));
  // prices, times, phone numbers and addresses are not prose
  t = t.replace(/\d+\s?[–-]\s?\d+/g, 'N').replace(/\b\d{1,2}[:.]\d{2}\b/g, 'T').replace(/https?:\S+|\S+@\S+/g, 'U');
  const dash = t.match(/[^\s]*[-–—][^\s]*/g); if (dash) bad.push('dash ' + [...new Set(dash)].slice(0, 6).join(' '));
  const colon = t.match(/[^\s]*:[^\s]*/g); if (colon) bad.push('colon ' + [...new Set(colon)].slice(0, 6).join(' '));
  const emoji = t.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu); if (emoji) bad.push('emoji ' + emoji.join(''));
  const ex = (t.match(/!/g) || []).length; if (ex > 1) bad.push(ex + ' exclamation marks');
  const low = t.toLowerCase(); const bw = BANNED.filter(w => new RegExp('(^|[^a-zäöüß])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-zäöüß])').test(low)); if (bw.length) bad.push('banned ' + bw.join(', '));
  if (lang === 'en') { const u = t.match(UNCONTRACTED); if (u) bad.push('uncontracted "' + u[0] + '"'); }
  return bad;
}

async function page(b, w, h, opt = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 500, hasTouch: w < 500, javaScriptEnabled: opt.js !== false, reducedMotion: opt.reduced ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage(); p.errs = [];
  p.on('pageerror', e => p.errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push('console ' + m.text()); });
  p.on('requestfailed', r => p.errs.push('failed ' + r.url())); p.on('response', r => { if (r.status() >= 400) p.errs.push(r.status() + ' ' + r.url()); });
  if (opt.lang) await ctx.addInitScript(l => { try { sessionStorage.setItem('tf.lang', l); } catch (e) {} }, opt.lang);
  return p;
}

// the walk, half a screen at a time, counting only controls that open the enquiry and are not in the header
const WALK = () => {
  const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 4 && r.height > 4 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.3 && !e.closest('.hd, #menu, dialog, [hidden]'); };
  return [...document.querySelectorAll('[data-anfragen]')].filter(vis).map(e => e.closest('.bar') ? 'bar' : (e.className.split(' ').find(c => /-ask$/.test(c)) || 'inline'));
};

(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist'] });
  for (const pg of PAGES) {
    const url = BASE + pg;
    // ---- walk, clean then planted
    for (const [w, h] of [[390, 844], [1440, 900]]) {
      for (const planted of [false, true]) {
        const p = await page(b, w, h); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(5000);
        if (planted) await p.addStyleTag({ content: '.bar{display:none!important} main [data-anfragen]{visibility:hidden!important}' });
        const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight); const steps = [];
        for (let y = 0; y <= H + 1; y += h / 2) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(650); const a = await p.evaluate(WALK); steps.push(Math.round(y) + ':' + (a.length ? [...new Set(a)].join('+') : 'NONE')); }
        const gaps = steps.filter(s => s.endsWith('NONE')).length;
        if (!planted) log(gaps === 0, `walk ${pg} ${w}`, `${steps.length} steps, ${gaps} without a way to the enquiry. ${steps.join(' ')}`);
        else plant(gaps > 0, `walk ${w}`, `${gaps} of ${steps.length} steps empty with the bar and inline buttons hidden`);
        await p.context().close();
      }
    }
    // ---- copy, both languages, all built text including the drawer and the menu
    for (const lang of ['de', 'en']) {
      const p = await page(b, 1440, 900, { lang }); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(1500);
      const text = await p.evaluate(l => { const own = [...document.querySelectorAll('body *')].filter(e => !e.closest('script,style,svg') && !e.closest(`[data-l]:not([data-l="${l}"])`)).map(e => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ')).join(' ');
        const attrs = [...document.querySelectorAll('[aria-label],[alt],[placeholder],option')].map(e => e.getAttribute('aria-label') || e.getAttribute('alt') || e.getAttribute('placeholder') || e.textContent).join(' ');
        return (own + ' ' + attrs + ' ' + document.title).replace(/\s+/g, ' '); }, lang);
      const bad = copyCheck(text, lang); log(bad.length === 0, `copy ${pg} ${lang}`, bad.length ? bad.join(' | ') : `${text.split(' ').length} words clean`);
      if (lang === 'en') { const pb = copyCheck(text + ' It is a seamless journey — book now! Really!', 'en'); plant(pb.length >= 4, 'copy', 'planted dash, banned words, exclamations, uncontracted: ' + pb.length + ' found'); }
      await p.context().close();
    }
    // ---- overflow at every width, a sideways scroll attempt, words wider than their box, and a resize from 1440 to 320
    const widths = [320, 360, 390, 430, 768, 1024, 1440, 1920]; const ov = [];
    for (const w of widths) {
      const p = await page(b, w, 860); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(1200);
      const r = await p.evaluate(async () => { const res = { sx: [], wide: [] }; const H = document.documentElement.scrollHeight;
        for (let y = 0; y < H; y += innerHeight * 0.8) { scrollTo(200, y); await new Promise(r => setTimeout(r, 60)); if (scrollX > 0) res.sx.push(Math.round(y)); }
        for (const e of document.querySelectorAll('h1, h2, h3, p, button, a, li, label, legend')) { const s = getComputedStyle(e); if (s.display === 'none' || e.closest('[hidden], dialog:not([open])')) continue; const b = e.getBoundingClientRect(); if ((e.scrollWidth > e.clientWidth + 2 && s.overflow !== 'hidden' && e.clientWidth > 0 && !/nowrap/.test(s.whiteSpace)) || (b.width > 2 && b.height > 2 && (b.right > innerWidth + 1 || b.left < -1) && !e.closest('[aria-hidden=true], .ribbon-strip, .place-strip'))) res.wide.push(e.textContent.trim().slice(0, 30)); }
        res.doc = document.documentElement.scrollWidth - innerWidth; return res; });
      if (r.sx.length || r.doc > 0 || r.wide.length) ov.push(`${w}: scrollX at ${r.sx.slice(0, 3).join(',')} doc+${r.doc} wide ${r.wide.slice(0, 3).join(' / ')}`);
      await p.context().close();
    }
    { const p = await page(b, 1440, 900); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(1500); await p.setViewportSize({ width: 320, height: 700 }); await p.waitForTimeout(600);
      const d = await p.evaluate(() => { scrollTo(200, 400); return scrollX + (document.documentElement.scrollWidth - innerWidth); }); if (d > 0) ov.push('after resize 1440 to 320 by ' + d);
      const d2 = await p.evaluate(() => { const e = document.createElement('h2'); e.className = 'big'; e.style.whiteSpace = 'nowrap'; e.textContent = 'Weihnachtsfeier Firmenfeier Mindestauftragswert'; document.querySelector('main').prepend(e); return e.scrollWidth > e.clientWidth + 2 || e.getBoundingClientRect().right > innerWidth + 1; });
      plant(d2, 'overflow', 'a heading forced wider than a 320 phone'); await p.context().close(); }
    log(ov.length === 0, `overflow ${pg}`, ov.length ? ov.join(' | ') : widths.join(', ') + ' and a resize to 320, no sideways scroll, no word past its line');
    // ---- errors on a cold load, every image decoded
    for (const [w, h] of [[390, 844], [1440, 900]]) {
      const p = await page(b, w, h); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(3000);
      await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } });
      await p.waitForTimeout(1500);
      const img = await p.evaluate(() => [...document.images].filter(i => getComputedStyle(i).display !== 'none' && i.closest('picture, a, .hd') && !i.closest('[hidden]')).map(i => ({ s: i.currentSrc.split('/').pop(), ok: i.complete && i.naturalWidth > 0, lazy: i.loading === 'lazy' })));
      const undecoded = img.filter(i => !i.ok).map(i => i.s);
      log(!p.errs.length && !undecoded.length, `errors ${pg} ${w}`, `${p.errs.length} errors${p.errs.length ? ' ' + p.errs.slice(0, 3).join(' | ') : ''}, ${img.length - undecoded.length} of ${img.length} images decoded${undecoded.length ? ', not ' + undecoded.join(' ') : ''}`);
      await p.context().close();
    }
    { const p = await page(b, 390, 844); await p.route('**/media/**', r => r.abort()); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(2500);
      await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } }); await p.waitForTimeout(800);
      plant(p.errs.length > 0, 'errors', 'a blocked case photo shows as ' + (p.errs[0] || 'nothing').slice(0, 60)); await p.context().close(); }
    // ---- axe at the top, middle and end, both sizes, both languages, both motion modes
    const axeRes = [];
    for (const [w, h] of [[390, 844], [1440, 900]]) for (const lang of ['de', 'en']) for (const reduced of [false, true]) {
      const p = await page(b, w, h, { lang, reduced }); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(reduced ? 1200 : 5200);
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (const f of [0, 0.5, 1]) { await p.evaluate(y => scrollTo(0, y), Math.max(0, (H - h) * f)); await p.waitForTimeout(1300);
        await p.evaluate(AXE); const v = await timed(p.evaluate(() => axe.run(document, { resultTypes: ['violations'], rules: { 'color-contrast': { enabled: true } } }).then(r => r.violations.map(x => x.id + '(' + x.nodes.length + ')'))), 30000);
        if (v.length) axeRes.push(`${w} ${lang}${reduced ? ' reduced' : ''} at ${f}: ${v.join(' ')}`); }
      await p.context().close();
    }
    log(axeRes.length === 0, `axe ${pg}`, axeRes.length ? axeRes.slice(0, 6).join(' | ') : '24 runs, top middle and end, 390 and 1440, DE and EN, both motion modes, 0 violations');
    { const p = await page(b, 1440, 900); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(1500); await p.evaluate(() => { const i = document.querySelector('.hd-logo img'); i.removeAttribute('alt'); document.querySelector('h1').style.color = '#e9e0d0'; });
      await p.evaluate(AXE); const v = await p.evaluate(() => axe.run(document, { resultTypes: ['violations'] }).then(r => r.violations.map(x => x.id))); plant(v.length >= 1, 'axe', 'planted missing alt and dark h1, axe found ' + v.join(' ')); await p.context().close(); }
    // ---- no JavaScript, and reduced motion. With scripts off the page still reads, with its pictures, Home still shows
    // their cases, /menues/ every dish, drink and dessert, every guide price its band
    { const p = await page(b, 390, 844, { js: false }); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(800);
      const r = await p.evaluate(() => { const vis = e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; }; return { h1: (document.querySelector('h1') || {}).innerText || '', cases: [...document.querySelectorAll('.case-name')].filter(vis).map(e => e.innerText), built: document.querySelectorAll('.case-name').length, imgs: [...document.images].filter(vis).length, band: [...document.querySelectorAll('.price-band')].map(e => e.innerText.trim()), dishes: document.querySelectorAll('.dishes > li').length }; });
      const ok = !!r.h1 && r.imgs >= 1 && r.cases.length === r.built && r.band.every(x => /€/.test(x)) && (pg !== '/' || r.cases.length >= 5) && (pg !== '/menues/' || r.dishes >= 13);
      log(ok, `nojs ${pg}`, `h1 "${r.h1.replace(/\s+/g, ' ').slice(0, 48)}", ${r.imgs} pictures, ${r.cases.length} of ${r.built} cases readable, guide ${r.band.join(' ') || 'none here'}${pg === '/menues/' ? ', ' + r.dishes + ' dishes, drinks and desserts' : ''}`);
      await p.context().close(); }
    { const p = await page(b, 1440, 900, { reduced: true }); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(700);
      const r = await p.evaluate(() => { const n = [...document.querySelectorAll('.bh-note')], ph = document.querySelector('.ph'), box = document.querySelector('.ph-photo'); return { notes: n.length, shown: n.filter(e => +getComputedStyle(e).opacity > .95).length, ph: !!ph, lit: !ph || ph.classList.contains('is-lit'), open: !box || getComputedStyle(box).clipPath === 'none' }; });
      log(r.shown === r.notes && r.lit && r.open, `reduced motion ${pg}`, `the finished state at once, at 0.7 s${r.notes ? ', ' + r.shown + ' of ' + r.notes + ' burger lines shown' : ''}${r.ph ? ', the page opening ' + (r.open ? 'open' : 'CLOSED') + ' and ' + (r.lit ? 'lit' : 'NOT lit') : ''}`);
      await p.context().close(); }
  }
  await b.close();
  const res = out.join('\n') + `\n${failed ? 'FAIL ' + failed : 'PASS'}${broken ? ', DETECTOR BROKEN ' + broken : ', every plant caught'}\n`;
  console.log(res); fs.writeFileSync(path.join(__dirname, 'last-run.txt'), `qa/check.js ${new Date().toISOString()}\n` + res);
  process.exit(broken ? 2 : failed ? 1 : 0);
})().catch(e => { console.log('ERROR', e.message); process.exit(2); });
