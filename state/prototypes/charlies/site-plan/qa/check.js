/* Checks for the plan site. The sums test works out every figure on the page from plan.json on its own (not with the
   page's code) at many slider positions and compares, to the pound. Then the look, the copy, overflow, errors, axe and
   no JavaScript. Each check runs clean, then with a planted fault it must catch.
     QA_MODULES=<folder with playwright-core and axe-core> node check.js        (serves ../ itself) */
'use strict';
const fs = require('fs'), path = require('path'), http = require('http');
const MOD = process.env.QA_MODULES || path.resolve(__dirname, '../../_tools/node_modules');
const { chromium } = require(path.join(MOD, 'playwright-core'));
const AXE = fs.readFileSync(path.join(MOD, 'axe-core/axe.min.js'), 'utf8');
const ROOT = path.resolve(__dirname, '..'), PLAN = JSON.parse(fs.readFileSync(path.join(ROOT, 'plan.json'), 'utf8'));
const out = []; const log = (s) => { console.log(s); out.push(s); };
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain' };
function serve() { return new Promise(res => { const s = http.createServer((q, r) => { let u = decodeURIComponent(q.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html'; const f = path.join(ROOT, u);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(0, () => res(s)); }); }
let browser, URL0;
async function page(w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760, javaScriptEnabled: opts.js !== false, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage(); p.errs = [];
  p.on('console', m => { if (m.type() === 'error') p.errs.push('console: ' + m.text()); }); p.on('pageerror', e => p.errs.push('pageerror: ' + e.message));
  p.on('requestfailed', r => { if (!/^mailto:/.test(r.url())) p.errs.push('failed: ' + r.url()); }); p.on('response', r => { if (r.status() >= 400) p.errs.push(r.status() + ': ' + r.url()); });
  if (opts.route) await p.route(opts.route.match, opts.route.handler);
  await p.goto(URL0, { waitUntil: 'load' }); await p.waitForTimeout(opts.wait || 800);
  if (opts.plant) await p.evaluate(opts.plant);
  return p;
}
const close = (p) => p.context().close();

// ---------- the sums, worked out here from plan.json ----------
const gbp = (n) => '£' + Math.round(n).toLocaleString('en-GB'), eur = (n) => '€' + Math.round(n).toLocaleString('en-GB');
function want(o, a, s) {
  const f = PLAN.uber_fees, y = o * a * PLAN.calculator.weeks_a_year, dv = y * s, cv = y - dv;
  return { year: gbp(dv * f.delivery + cv * f.pickup), dval: gbp(dv), cval: gbp(cv), dfee: gbp(dv * f.delivery), cfee: gbp(cv * f.pickup), dpct: Math.round(f.delivery * 100) + '%', cpct: Math.round(f.pickup * 100) + '%' };
}
async function sums(opts = {}) {
  const p = await page(1440, 900, { route: opts.route }), rows = [], bad = [];
  const d = PLAN.calculator.defaults, cases = [[d.orders_a_week, d.average_order_gbp, d.delivery_share]];
  let seed = 7; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 24; i++) cases.push([5 * (1 + Math.floor(r() * 40)), 6 + Math.floor(r() * 35), Math.round(r() * 20) / 20]);
  cases.push([200, 40, 1], [5, 6, 0]);
  for (const [o, a, s] of cases) {
    const got = await p.evaluate(([o, a, s]) => { const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); };
      set('in-orders', o); set('in-aov', a); set('in-share', s); const t = (id) => document.getElementById(id).textContent.trim();
      return { year: t('fee-year'), dval: t('r-dval'), cval: t('r-cval'), dfee: t('r-dfee'), cfee: t('r-cfee'), dpct: t('r-dpct'), cpct: t('r-cpct') }; }, [o, a, s]);
    const w = want(o, a, s), wrong = Object.keys(w).filter(k => w[k] !== got[k]);
    rows.push(`${o}/wk £${a} ${Math.round(s * 100)}% delivered: ${w.year}` + (wrong.length ? ' GOT ' + wrong.map(k => k + '=' + got[k]).join(',') : ' ok'));
    if (wrong.length) bad.push(o + '/' + a + '/' + s);
  }
  // the price and its two halves
  const pr = PLAN.price, cost = await p.evaluate(() => ['cost-eur', 'cost-1', 'cost-2'].map(id => document.getElementById(id).textContent.trim()));
  const wantCost = [eur(pr.eur), eur(pr.eur * pr.first_payment_share), eur(pr.eur * pr.second_payment_share)];
  if (pr.first_payment_share + pr.second_payment_share !== 1) bad.push('the two payments don’t add up to the price');
  if (cost.join() !== wantCost.join()) bad.push('cost ' + cost.join(' ') + ' want ' + wantCost.join(' '));
  rows.push('price ' + cost.join(', ') + (cost.join() === wantCost.join() ? ' ok' : ' WRONG'));
  // the dragged bar sets the share, and the sum follows it
  const drag = await p.evaluate(async () => { const b = document.getElementById('fee-bar').getBoundingClientRect(); b && 0; return document.getElementById('in-share').value; });
  if (p.errs.length) bad.push('errors ' + p.errs.join(' | '));
  await close(p);
  return { ok: bad.length === 0, detail: cases.length + ' slider positions and the price checked to the pound. ' + rows.slice(0, 4).join('; ') + (bad.length ? '. BAD ' + bad.slice(0, 4).join('; ') : ''), drag };
}

// ---------- the look and the copy ----------
async function look(p) {
  return p.evaluate(() => {
    const banned = ['inter', 'space grotesk', 'montserrat', 'poppins', 'archivo', 'nunito', 'nunito sans', 'roboto', 'open sans', 'lato', 'raleway', 'dm sans', 'plus jakarta sans', 'manrope', 'anton', 'bebas neue', 'oswald', 'libre caslon', 'playfair display', 'dm serif display'];
    const allowed = ['mona sans', 'fragment mono'], probs = [];
    document.querySelectorAll('body *').forEach(el => { const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); if (!own || !el.getClientRects().length || ['SCRIPT', 'STYLE'].includes(el.tagName)) return;
      const fam = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase(); if (!allowed.includes(fam)) probs.push((banned.includes(fam) ? 'banned font ' : 'font ') + fam); });
    document.querySelectorAll('h1,h2,h3').forEach(h => [h, ...h.querySelectorAll('*')].forEach(e => { if (getComputedStyle(e).fontStyle === 'italic') probs.push('italic heading'); }));
    let kickers = 0; document.querySelectorAll('h1,h2').forEach(h => { const pr = h.previousElementSibling; if (pr && pr.textContent.trim().length < 40 && getComputedStyle(pr).textTransform === 'uppercase' && parseFloat(getComputedStyle(pr).fontSize) < 15) kickers++; });
    if (kickers > 2) probs.push(kickers + ' kickers');
    document.querySelectorAll('button, a').forEach(b => { if (!b.getClientRects().length) return; const r = b.getBoundingClientRect(), cs = getComputedStyle(b), rad = parseFloat(cs.borderTopLeftRadius) || 0;
      if (r.height && rad >= r.height / 2 - 1 && r.width > r.height * 1.3) probs.push('pill "' + b.textContent.trim().slice(0, 20) + '"'); if (/[←-⇿➡-➿➔➜⟶›»▶►⮕]/.test(b.textContent)) probs.push('arrow glyph'); });
    document.querySelectorAll('body *').forEach(el => { const cs = getComputedStyle(el); if (cs.boxShadow === 'none') return; const rad = parseFloat(cs.borderTopLeftRadius) || 0, blur = (cs.boxShadow.match(/(-?[\d.]+)px/g) || []).map(parseFloat)[2] || 0; if (rad >= 6 && blur > 4) probs.push('soft shadow card'); });
    const chapters = document.querySelectorAll('main > section').length; if (chapters > 9) probs.push(chapters + ' chapters');
    const lum = (c) => { const m = (c.match(/[\d.]+/g) || [0, 0, 0]).map(Number); return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255; };
    const bright = [...document.querySelectorAll('main > section')].filter(s => lum(getComputedStyle(s).backgroundColor) > 0.5).length; if (bright !== 1) probs.push(bright + ' bright chapters, the plan has one');
    return { ok: !probs.length, detail: probs.length ? [...new Set(probs)].join('; ') : 'fonts mona sans + fragment mono, no italics, ' + kickers + ' kickers, no pills, no arrows, no soft shadow cards, ' + chapters + ' chapters, ' + bright + ' bright chapter' };
  });
}
async function copy(p) {
  const text = await p.evaluate(() => document.body.innerText + ' ' + document.title + ' ' + [...document.querySelectorAll('[alt]')].map(e => e.alt).join(' '));
  let t = text.replace(/https?:\/\/\S+/g, ' ').replace(/[\w.-]+\.com[\w/.-]*/g, ' ').replace(/RAKA_EMAIL/g, ' ');
  const probs = [];
  const dash = t.match(/[^\s]*[-‐-―][^\s]*/g); if (dash) probs.push('dashes: ' + [...new Set(dash)].slice(0, 6).join(' '));
  const colon = t.match(/[^\s]*:[^\s]*/g); if (colon) probs.push('colons: ' + [...new Set(colon)].slice(0, 6).join(' '));
  if (/\p{Extended_Pictographic}/u.test(t)) probs.push('emoji');
  const bang = (t.match(/!/g) || []).length; if (bang > 1) probs.push(bang + ' exclamation marks');
  const words = ['delve', 'leverage', 'utilize', 'harness', 'unlock', 'unleash', 'empower', 'elevate', 'streamline', 'transform', 'supercharge', 'amplify', 'foster', 'facilitate', 'embark', 'seamless', 'robust', 'cutting edge', 'bespoke', 'tailored', 'holistic', 'innovative', 'groundbreaking', 'game changing', 'unparalleled', 'comprehensive', 'curated', 'immersive', 'impactful', 'scalable', 'landscape', 'ecosystem', 'realm', 'tapestry', 'journey', 'testament', 'synergy', 'solutions', 'furthermore', 'moreover', 'additionally', 'ultimately', 'essentially', 'indulge', 'delectable', 'mouthwatering'];
  const found = words.filter(w => new RegExp('\\b' + w + '\\w*\\b', 'i').test(t)); if (found.length) probs.push('banned words: ' + found.join(', '));
  const unc = t.match(/\b(it is|do not|you will|we are|that is)\b/gi); if (unc) probs.push('uncontracted: ' + unc.join(', '));
  if (/\b(old|outdated|broken)\b/i.test(t)) probs.push('calls her site old, outdated or broken');
  if (/you pay/i.test(t)) probs.push('says you pay');
  if (/foodhub/i.test(t)) probs.push('names Foodhub');
  if (/wonka/i.test(t)) probs.push('the W word');
  const must = ['Prepared by Astra for Danielle Best, October 2026.', '€10,000 for the whole site.', 'One price for everything in this plan, half to start and half when it’s live.', 'Not in the price, the payment provider’s and courier’s own fees, and your ad spend.',
    'Built by Amwisesa, Astra’s development partner, often through the brand’s own agency.', 'The team has built for Unilever, Pertamina, the World Bank, Nestlé, IKEA, Panasonic, AXA, AIA, Bank Mandiri and Telkom.', 'Next, a call.', 'Twenty minutes to walk through the site and the plan and settle where to start', 'Your own agreement with Uber may differ.'];
  const flat = text.replace(/\s+/g, ' '); must.forEach(m => { if (!flat.includes(m)) probs.push('missing "' + m.slice(0, 40) + '"'); });
  return { ok: !probs.length, detail: probs.length ? probs.join('; ') : 'no dashes, no colons, no emoji, ' + bang + ' exclamation marks, no banned words, nothing uncontracted, never old or broken, no "you pay", no Foodhub, the brief’s fixed lines all present' };
}
async function overflow(plant) {
  const rows = []; let ok = true;
  for (const w of [320, 360, 390, 430, 768, 1024, 1440, 1920]) { const p = await page(w, w < 1024 ? 844 : 900, { plant });
    const r = await p.evaluate(async () => { scrollTo(200, 400); await new Promise(r => setTimeout(r, 80));
      // no word cut in two across lines, unless the browser hyphenates it properly
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), split = [];
      for (let n; (n = tw.nextNode());) { const el = n.parentElement; if (!el || el.closest('svg, script, style') || !el.getClientRects().length || getComputedStyle(el).hyphens === 'auto') continue;
        const re = /[^\s\-\/]{4,}/g; let m; while ((m = re.exec(n.data))) { const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
          const rs = [...rg.getClientRects()].filter(x => x.width > 0); if (rs.length > 1 && Math.abs(rs[0].top - rs[rs.length - 1].top) > 2) split.push(m[0]); } }
      return { sx: scrollX, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, split: [...new Set(split)].slice(0, 6) }; });
    const bad = r.sx !== 0 || r.sw > r.cw || r.split.length; if (bad) ok = false; rows.push(w + (bad ? ' FAIL ' + r.sw + '/' + r.cw + (r.split.length ? ' words cut in two ' + r.split.join(' ') : '') : ' ok')); await close(p); }
  return { ok, detail: rows.join(', ') };
}
async function errors(plant) {
  const rows = []; let ok = true;
  for (const w of [390, 1440]) { const p = await page(w, w < 1024 ? 844 : 900, { plant, wait: 1200 });
    const n = await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += innerHeight / 2) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
      const all = [...document.images]; all.forEach(i => { i.loading = 'eager'; }); await Promise.all(all.map(i => i.decode().catch(() => {}))); return { n: all.length, bad: all.filter(i => !i.naturalWidth).map(i => i.getAttribute('src')) }; });
    await p.waitForTimeout(300); const bad = p.errs.length || n.bad.length; if (bad) ok = false;
    rows.push(w + ': ' + n.n + ' images' + (n.bad.length ? ' NOT ' + n.bad.join(' ') : '') + (p.errs.length ? ', ' + p.errs.join(' | ') : ', 0 errors')); await close(p); }
  return { ok, detail: rows.join('; ') };
}
async function axe(plant) {
  const rows = []; let ok = true;
  for (const w of [390, 1440]) for (const reduced of [false, true]) { const p = await page(w, w < 1024 ? 844 : 900, { plant, reduced }); await p.addScriptTag({ content: AXE });
    for (const where of ['top', 'middle', 'end']) { const v = await p.evaluate(async (where) => { document.querySelectorAll('.rv').forEach(e => e.classList.add('is-in')); const H = document.documentElement.scrollHeight; scrollTo(0, where === 'top' ? 0 : where === 'middle' ? H / 2 : H); await new Promise(r => setTimeout(r, 900));
      const r = await window.axe.run(document, { resultTypes: ['violations'] }); return r.violations.map(x => x.id + '(' + x.nodes.length + ')'); }, where);
      if (v.length) ok = false; rows.push(w + (reduced ? ' reduced' : '') + ' ' + where + ': ' + (v.join(' ') || 'clean')); }
    await close(p); }
  return { ok, detail: rows.join('; ') };
}
async function still(plant) {
  const p = await page(390, 844, { js: false, plant });
  const r = await p.evaluate(() => ({ year: document.getElementById('fee-year').textContent, cost: document.getElementById('cost-eur').textContent, found: document.querySelectorAll('.found__i').length, rail: document.querySelectorAll('.rt').length, weeks: document.querySelectorAll('.wk').length, shots: [...document.images].filter(i => i.getClientRects().length).length }));
  await close(p);
  const ok = r.year === want(PLAN.calculator.defaults.orders_a_week, PLAN.calculator.defaults.average_order_gbp, PLAN.calculator.defaults.delivery_share).year && r.cost === eur(PLAN.price.eur) && r.found === 4 && r.rail === 9 && r.weeks === 6 && r.shots >= 12;
  return { ok, detail: 'no JS: ' + r.year + ' a year at the defaults, ' + r.cost + ', ' + r.found + ' findings, ' + r.rail + ' tickets, ' + r.weeks + ' weeks, ' + r.shots + ' pictures' };
}

const PLANTS = {
  sums: { match: '**/', handler: async (route) => { if (!/\/$|index\.html$/.test(route.request().url())) return route.continue(); const r = await route.fetch(); route.fulfill({ response: r, body: (await r.text()).replace('"delivery":0.3,', '"delivery":0.31,').replace('"eur":10000', '"eur":10500') }); } },
  look: () => { const d = document.createElement('div'); d.innerHTML = '<button style="border-radius:99px;padding:10px 40px;font-family:Poppins">Book now →</button>'; document.getElementById('cover').appendChild(d); },
  copy: () => { const d = document.createElement('p'); d.textContent = 'Your old site is broken: you pay a seamless fee — sadly!! Furthermore it is slow.'; document.getElementById('cover').appendChild(d); },
  overflow: () => { const d = document.createElement('div'); d.style.cssText = 'width:2600px;height:6px;background:red'; document.getElementById('team').appendChild(d); },
  errors: () => { const i = new Image(); i.src = 'shots/missing.webp'; i.alt = 'plant'; document.getElementById('cover').appendChild(i); },
  axe: () => { const d = document.createElement('div'); d.innerHTML = '<img src="media/logo.webp"><button></button>'; document.getElementById('cover').appendChild(d); },
  still: () => { document.getElementById('fee-year').textContent = '£0'; },
};
async function run(name, clean, planted) { const a = await clean(), b = await planted(), caught = !b.ok;
  log(`${a.ok && caught ? 'PASS' : 'FAIL'}  ${name}`); log('    clean:   ' + a.detail); log('    planted: ' + (caught ? 'caught. ' : 'NOT CAUGHT. ') + String(b.detail).slice(0, 300)); results.push(a.ok && caught); }
const results = [];
(async () => {
  const srv = await serve(); URL0 = 'http://localhost:' + srv.address().port + '/';
  browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--enable-gpu'] });
  log('Charlie’s plan, checks, ' + new Date().toISOString());
  await run('sums', () => sums(), () => sums({ route: PLANTS.sums }));
  for (const w of [390, 1440]) {
    await run('look ' + w, async () => { const p = await page(w, w < 1024 ? 844 : 900); const r = await look(p); await close(p); return r; }, async () => { const p = await page(w, w < 1024 ? 844 : 900, { plant: PLANTS.look }); const r = await look(p); await close(p); return r; });
  }
  await run('copy', async () => { const p = await page(1440, 900); const r = await copy(p); await close(p); return r; }, async () => { const p = await page(1440, 900, { plant: PLANTS.copy }); const r = await copy(p); await close(p); return r; });
  await run('overflow', () => overflow(null), () => overflow(PLANTS.overflow));
  await run('errors', () => errors(null), () => errors(PLANTS.errors));
  await run('axe', () => axe(null), () => axe(PLANTS.axe));
  await run('no JavaScript', () => still(null), () => still(PLANTS.still));
  log((results.every(Boolean) ? 'ALL PASS' : 'SOME FAIL') + ', ' + results.filter(Boolean).length + ' of ' + results.length);
  fs.writeFileSync(path.join(__dirname, 'last-run.txt'), out.join('\n') + '\n');
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
