/* The checks from section 18 of the brief, for the final look. Each check runs clean, then with a planted fault it
   must catch, then the fault is gone (a fresh page). Run from this folder:
     QA_MODULES=<folder holding playwright-core, axe-core and sharp> node check.js [--only=walk,sums,...]
   It serves ../ itself and drives the installed Chrome with its GPU. Output goes to stdout and qa/last-run.txt.
   Lighthouse runs separately (the lighthouse CLI, performance only, mobile and desktop), its numbers go in the handover. */
'use strict';
const fs = require('fs'), path = require('path'), http = require('http');
const MOD = process.env.QA_MODULES || path.resolve(__dirname, '../../_tools/node_modules');
const { chromium } = require(path.join(MOD, 'playwright-core'));
const sharp = require(path.join(MOD, 'sharp'));
const AXE = fs.readFileSync(path.join(MOD, 'axe-core/axe.min.js'), 'utf8');
const ROOT = path.resolve(__dirname, '..');
const MENU = JSON.parse(fs.readFileSync(path.join(ROOT, 'menu.json'), 'utf8'));
const only = (process.argv.find(a => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const out = []; const log = (s) => { console.log(s); out.push(s); };
const curly = (s) => String(s).replace(/'/g, '’');
const pen = (x) => Math.round(x * 100);

// ---------- a static server for the folder ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain' };
function serve() {
  return new Promise(res => { const s = http.createServer((q, r) => { let u = decodeURIComponent(q.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html';
    const f = path.join(ROOT, u); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(0, () => res(s)); });
}

const SIZES = [[390, 844, true], [1440, 900, false]];
let browser, URL0;
async function page(w, h, mob, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mob, hasTouch: mob, reducedMotion: opts.reduced ? 'reduce' : 'no-preference', javaScriptEnabled: opts.js !== false });
  const p = await ctx.newPage(); p.setDefaultTimeout(20000);
  p.errs = []; p.on('console', m => { if (m.type() === 'error') p.errs.push('console: ' + m.text()); }); p.on('pageerror', e => p.errs.push('pageerror: ' + e.message));
  p.on('requestfailed', r => p.errs.push('failed: ' + r.url())); p.on('response', r => { if (r.status() >= 400) p.errs.push(r.status() + ': ' + r.url()); });
  if (opts.route) await p.route(opts.route.match, opts.route.handler);
  await p.goto(URL0, { waitUntil: 'load' });
  if (opts.js !== false) await p.waitForFunction(() => window.CharlieOrder && window.CharlieBuilder && document.getElementById('bar-name').textContent.length > 0, null, { timeout: 15000 });
  await p.waitForTimeout(opts.wait != null ? opts.wait : 2600);
  if (opts.plant) await p.evaluate(opts.plant);
  return p;
}
const close = (p) => p.context().close();
// scroll without the smooth scroll animating it
const JUMP = `(y) => { const l = window.CharlieMotion && window.CharlieMotion.lenis && window.CharlieMotion.lenis(); if (l) l.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y); }`;

// ---------- 1. the walk: an order action in view at every half screen, that isn't the header ----------
async function walk(p) {
  return p.evaluate(async (JUMP) => {
    const jump = eval(JUMP);
    const vis = (el) => { const r = el.getBoundingClientRect(); if (!r.width || !r.height || r.bottom <= 2 || r.top >= innerHeight - 2 || r.right <= 0 || r.left >= innerWidth) return false;
      for (let e = el; e && e !== document; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.1) return false; }
      // is it the top thing at its own middle, so a tap would reach it
      const cx = Math.min(innerWidth - 2, Math.max(2, r.left + r.width / 2)), cy = Math.min(innerHeight - 2, Math.max(2, r.top + r.height / 2)), top = document.elementFromPoint(cx, cy);
      return !!top && (top === el || el.contains(top)); };
    const H = document.documentElement.scrollHeight, step = innerHeight / 2, rows = []; let ok = true;
    for (let y = 0; ; y += step) { const yy = Math.min(y, H - innerHeight); jump(yy); await new Promise(r => setTimeout(r, 220));
      const seen = [...document.querySelectorAll('[data-action="order"], #place-order')].filter(vis).map(e => e.id || (e.closest('.orderbar') ? 'bar' : e.dataset.shop ? 'shop' : e.className.split(' ')[0]));
      rows.push(Math.round(yy) + ':' + ([...new Set(seen)].join('+') || 'NONE')); if (!seen.length) ok = false; if (yy >= H - innerHeight) break; }
    jump(0); return { ok, detail: rows.length + ' steps. ' + rows.join(' ') };
  }, JUMP);
}

// ---------- 2. the hero: share of the first screen that is their photo or their mark ----------
// The 3D is drawn in a worker the page can't read back, so the share is measured from the screen itself: a
// screenshot as it is, and one with their hat, dessert, logo and photos hidden. The pixels that change are theirs.
// The sweets are ours, so they're hidden in both.
async function hero(p) {
  await p.evaluate(async (JUMP) => { eval(JUMP)(0); if (window.CharlieHero3D && window.CharlieHero3D.showSweets) window.CharlieHero3D.showSweets(false); await new Promise(r => setTimeout(r, 500)); }, JUMP);
  const a = await p.screenshot();
  await p.evaluate(async () => { const s = document.createElement('style'); s.id = 'qa-hide'; s.textContent = '#hero-gl,.hero__poster,.hero__logo,.hero__logo-top,.awning__sign,.base img{visibility:hidden!important}'; document.head.appendChild(s); await new Promise(r => setTimeout(r, 300)); });
  const b = await p.screenshot();
  await p.evaluate(() => { document.getElementById('qa-hide').remove(); if (window.CharlieHero3D && window.CharlieHero3D.showSweets) window.CharlieHero3D.showSweets(true); });
  const A = await sharp(a).raw().toBuffer({ resolveWithObject: true }), B = await sharp(b).raw().toBuffer();
  let hit = 0; const n = A.info.width * A.info.height, ch = A.info.channels;
  for (let i = 0; i < n; i++) { const k = i * ch; if (Math.abs(A.data[k] - B[k]) + Math.abs(A.data[k + 1] - B[k + 1]) + Math.abs(A.data[k + 2] - B[k + 2]) > 30) hit++; }
  const share = hit / n, gl = await p.evaluate(() => document.documentElement.classList.contains('has-hero-gl'));
  return { ok: share >= 0.25, warn: share < 0.35, detail: (share * 100).toFixed(1) + '% of the first screen is their hat, dessert, logo and photos (' + (gl ? '3D' : 'still') + '), sweets not counted' };
}

// ---------- 3. the look ----------
async function look(p) {
  return p.evaluate(async () => {
    document.documentElement.classList.add('cv-all'); await new Promise(r => setTimeout(r, 100));
    const banned = ['inter', 'space grotesk', 'montserrat', 'poppins', 'archivo', 'nunito', 'nunito sans', 'roboto', 'open sans', 'lato', 'raleway', 'dm sans', 'plus jakarta sans', 'manrope', 'anton', 'bebas neue', 'oswald', 'libre caslon', 'playfair display', 'dm serif display'];
    const allowed = ['mona sans', 'fragment mono'], probs = [];
    const rendered = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
    document.querySelectorAll('body *').forEach(el => {
      if (['SCRIPT', 'STYLE', 'svg', 'path', 'g', 'defs', 'stop', 'linearGradient', 'radialGradient', 'NOSCRIPT', 'circle', 'rect', 'ellipse', 'image'].includes(el.tagName)) return;
      const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      if (own && rendered(el)) { const fam = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
        if (banned.includes(fam)) probs.push('banned font ' + fam + ' on <' + el.tagName.toLowerCase() + '>'); else if (!allowed.includes(fam)) probs.push('font ' + fam + ' on <' + el.tagName.toLowerCase() + '>'); }
    });
    document.querySelectorAll('h1,h2,h3').forEach(h => { [h, ...h.querySelectorAll('*')].forEach(e => { const cs = getComputedStyle(e);
      if (cs.fontStyle === 'italic') probs.push('italic in heading "' + h.textContent.trim().slice(0, 30) + '"');
      const f = cs.fontFamily.toLowerCase(); if (/serif/.test(f) && !/sans/.test(f)) probs.push('serif heading'); }); });
    let kickers = 0; document.querySelectorAll('h1,h2').forEach(h => { const pr = h.previousElementSibling; if (!pr) return; const cs = getComputedStyle(pr);
      if (pr.textContent.trim().length < 40 && cs.textTransform === 'uppercase' && parseFloat(cs.fontSize) < 15) kickers++; });
    if (kickers > 2) probs.push(kickers + ' small uppercase kickers above headings');
    document.querySelectorAll('button, a, [role="button"], label.segb').forEach(b => { if (!rendered(b)) return; const r = b.getBoundingClientRect(), cs = getComputedStyle(b);
      const rad = Math.min(...['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'].map(k => parseFloat(cs[k]) || 0));
      if (r.height > 0 && rad >= r.height / 2 - 1 && r.width > r.height * 1.3) probs.push('pill button "' + b.textContent.trim().slice(0, 20) + '"');
      if (/[←-⇿➡-➿➔➜⟶›»▶►⮕]/.test(b.textContent)) probs.push('arrow glyph in "' + b.textContent.trim().slice(0, 20) + '"'); });
    document.querySelectorAll('body *').forEach(el => { const cs = getComputedStyle(el); if (cs.boxShadow === 'none' || !rendered(el)) return;
      const rad = parseFloat(cs.borderTopLeftRadius) || 0, blur = (cs.boxShadow.match(/(-?[\d.]+)px/g) || []).map(parseFloat)[2] || 0;
      if (rad >= 6 && blur > 4) probs.push('soft shadow rounded box <' + el.tagName.toLowerCase() + ' class="' + el.className + '">'); });
    // count up numbers: a number that changes on its own while nothing is touched
    const nums = [...document.querySelectorAll('.price, output, .partysize__big')].map(e => [e, e.textContent]);
    await new Promise(r => setTimeout(r, 900));
    const counting = nums.filter(([e, t]) => e.textContent !== t).length; if (counting) probs.push(counting + ' numbers counting by themselves');
    const sections = document.querySelectorAll('main > section, main > footer, main > div').length;
    if (sections > 10) probs.push(sections + ' sections on the home page');
    const lum = (c) => { const m = (c.match(/[\d.]+/g) || [0, 0, 0]).map(Number); return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255; };
    const tones = [...document.querySelectorAll('main > *')].map(e => lum(getComputedStyle(e).backgroundColor) > 0.5 ? 'L' : 'D');
    let flips = 0; for (let i = 1; i < tones.length; i++) if (tones[i] !== tones[i - 1]) flips++;
    if (flips >= 3) probs.push('light and dark chapters taking turns ' + tones.join(''));
    return { ok: probs.length === 0, detail: probs.length ? [...new Set(probs)].join('; ') : 'fonts ' + allowed.join(' + ') + ', no italics, ' + kickers + ' kickers, no pills, no arrows, no soft shadow cards, no count ups, ' + sections + ' top level parts, tones ' + tones.join('') + ' (' + flips + ' turns)' };
  });
}

// ---------- 4. the sums: 30 random orders through the UI, priced here from menu.json on its own ----------
function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }; }
const named = (g, n) => MENU.named_items[g].find(i => i.name === n);
// the favourites the menu offers to make your own, by their group on the page
const FAVS = { 'Shakes': 'shakes', 'Crepe or Waffle': 'waffles', 'Cookie Dough': 'dough', 'Whippy Ice Cream': 'whippy' };
const FAV_BASE = { 'Shakes': 'shake', 'Crepe or Waffle': 'waffle', 'Cookie Dough': 'cookie_dough', 'Whippy Ice Cream': 'sundae' };
const favList = Object.keys(FAVS).flatMap(g => MENU.named_items[g].filter(i => i.name && i.price != null && i.name !== MENU.bases.whippy_sundae.name).map(i => ({ g, name: i.name, price: i.price, desc: (i.desc || '').toLowerCase() })));
// a sauce or topping the description might mean, so the test never adds it to that favourite and expects a charge
const STOP = ['sauce', 'bits', 'pieces', 'cup', 'chocolate', 'choc'];
const mentions = (desc, name) => name.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !STOP.includes(w)).some(w => desc.includes(w.slice(0, 4))) || (/choc/.test(name.toLowerCase()) && /chocolate sauce|choc/.test(desc) && /sauce/.test(desc) && MENU.sauces.includes(name));
const ITEM_GROUPS = ['Sharers', 'Charlie in Dubai', 'Hot Drinks', 'Mocktails'];
const itemList = ITEM_GROUPS.flatMap(g => MENU.named_items[g].filter(i => i.name && i.price != null).map(i => ({ g, name: i.name, price: i.price })));
function expected(o) {
  const b = MENU.bases, sauce = pen(MENU.rules.sauce_each), topP = (t) => pen(MENU.toppings.find(x => x[0] === t)[1]);
  let each;
  if (o.fav) each = pen(o.fav.price) + o.addSauces.length * sauce + o.addToppings.reduce((a, t) => a + topP(t), 0);
  else {
    const base = { waffle: pen(b.crepe_or_waffle.create_your_own_from), crepe: pen(b.crepe_or_waffle.create_your_own_from), shake: pen(b.shake.create_your_own_from),
      cookie_dough: pen(b.cookie_dough.price), sundae: pen(b.whippy_sundae.price), froyo: pen(b.frozen_yoghurt[o.size]) }[o.base];
    const tops = o.base === 'froyo' ? 0 : o.toppings.reduce((a, t) => a + topP(t), 0);
    const ex = o.extras.reduce((a, e) => a + pen(MENU.rules.scoop_on_crepe_waffle_or_cookie_dough[e === 'vanilla' ? 'vanilla_scoop' : 'whippy']), 0);
    each = base + o.sauces.length * sauce + tops + ex;
  }
  return each * o.qty + o.items.reduce((a, it) => a + pen(it.price), 0);
}
async function sums(count, opts = {}) {
  const r = rng(opts.seed || 20261028), bases = ['waffle', 'crepe', 'shake', 'cookie_dough', 'sundae', 'froyo'], bad = [], rows = [];
  const pick = (arr, k) => { const a = arr.slice(), o = []; while (o.length < k && a.length) o.push(a.splice(Math.floor(r() * a.length), 1)[0]); return o; };
  for (let i = 0; i < count; i++) {
    const mob = opts.mobile ? i % 2 === 0 : false, [w, h] = mob ? [390, 844] : [1440, 900];
    const o = { qty: 1 + Math.floor(r() * 3), items: pick(itemList, Math.floor(r() * 3)) };
    if (r() < 0.35) {
      o.fav = favList[Math.floor(r() * favList.length)]; o.base = FAV_BASE[o.fav.g];
      o.addSauces = pick(MENU.sauces.filter(s => !mentions(o.fav.desc, s)), Math.floor(r() * 3));
      o.addToppings = pick(MENU.toppings.map(t => t[0]).filter(t => !mentions(o.fav.desc, t)), Math.floor(r() * 3));
      o.removeOne = r() < 0.5;
    } else {
      o.base = bases[Math.floor(r() * 6)]; o.size = ['small', 'medium', 'large'][Math.floor(r() * 3)];
      o.sauces = pick(MENU.sauces, Math.floor(r() * 4)); o.toppings = pick(MENU.toppings.map(t => t[0]), Math.floor(r() * 5)); o.extras = [];
      if (['waffle', 'crepe', 'cookie_dough'].includes(o.base) && r() < 0.6) o.extras = [r() < 0.5 ? 'vanilla' : 'whippy'];
    }
    const p = await page(w, h, mob, { reduced: !opts.motion, wait: opts.motion ? 1500 : 500, route: opts.route });
    const q = (s) => s.replace(/"/g, '\\"');
    const tap = async (sel) => { await p.evaluate((sel) => { const e = document.querySelector(sel); e.scrollIntoView({ block: 'end' }); const bar = document.getElementById('orderbar').getBoundingClientRect(), r = e.getBoundingClientRect(); if (r.bottom > bar.top - 8) window.scrollBy(0, r.bottom - bar.top + 16); }, sel); await p.click(sel); };
    const settle = async () => { await p.waitForFunction(() => window.CharlieBuilder.isSettled(), null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(opts.motion ? 500 : 60); };
    if (o.fav) {
      // the favourite's own row in the menu
      await p.evaluate(() => document.documentElement.classList.add('cv-all'));
      const row = p.locator(`#mg-${FAVS[o.fav.g]} .mi__b[data-preset]`).filter({ has: p.locator('.mi__name', { hasText: new RegExp('^' + curly(o.fav.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }) });
      await row.first().click(); await p.waitForTimeout(opts.motion ? 1800 : 150);
      if (o.removeOne) { const on = p.locator('.topping[aria-pressed="true"], .sauce[aria-pressed="true"]'); if (await on.count()) { await tap('.topping[aria-pressed="true"], .sauce[aria-pressed="true"]'); o.removed = true; } }
      for (const s of o.addSauces) { await tap(`.sauce[data-sauce="${q(s)}"]`); if (opts.motion) await p.waitForTimeout(250); }
      for (const t of o.addToppings) { await tap(`.topping[data-topping="${q(t)}"]`); if (opts.motion) await p.waitForTimeout(200); }
    } else {
      if (o.base !== 'waffle') { await tap(`.minibase[data-base="${o.base}"]`); await p.waitForTimeout(opts.motion ? 700 : 80); }
      if (o.base === 'froyo') await tap(`[data-size="${o.size}"]`);
      for (const s of o.sauces) { await tap(`.sauce[data-sauce="${q(s)}"]`); if (opts.motion) await p.waitForTimeout(250); }
      for (const t of o.toppings) { await tap(`.topping[data-topping="${q(t)}"]`); if (opts.motion) await p.waitForTimeout(200); }
      for (const e of o.extras) await tap(`[data-extra="${e}"]`);
    }
    for (let k = 1; k < o.qty; k++) await tap('#qty-plus');
    await settle();
    for (const it of o.items) { await p.evaluate(() => document.documentElement.classList.add('cv-all')); await p.click(`.mi__b[data-item][data-name="${q(curly(it.name))}"]`); }
    await settle();
    const got = await p.evaluate(() => {
      const pn = (t) => Math.round(parseFloat(String(t).replace(/[^\d.]/g, '')) * 100);
      return { state: window.CharlieOrder.get().total, step: pn(document.getElementById('step-total').textContent), bar: pn(document.getElementById('bar-price').textContent),
        ticket: +document.getElementById('ticket').dataset.total, ticketText: pn(document.querySelector('#ticket-total b').textContent),
        golden: +document.getElementById('gticket').dataset.total, goldenText: pn(document.getElementById('gt-total').textContent) };
    });
    // the step total shows the creation and the items together, the same as the order
    const want = expected(o), wrong = Object.entries(got).filter(([, v]) => v !== want).map(([k, v]) => k + '=' + v);
    const label = o.fav ? 'fav ' + o.fav.name + ' +s' + o.addSauces.length + ' +t' + o.addToppings.length + (o.removed ? ' -1' : '') : o.base + (o.base === 'froyo' ? '/' + o.size : '') + ' s' + o.sauces.length + ' t' + o.toppings.length + ' e' + o.extras.length;
    rows.push(`${i + 1} ${mob ? '390' : '1440'} ${label} x${o.qty} items${o.items.length} want ${want}` + (wrong.length ? ' GOT ' + wrong.join(',') : ' ok'));
    if (wrong.length) bad.push(i + 1);
    if (p.errs.length) bad.push((i + 1) + ' errors: ' + p.errs.join(' | '));
    await close(p);
  }
  return { ok: bad.length === 0, detail: rows.join('\n    '), bad };
}

// ---------- 5. the menu: every item in menu.json is on the page as text with its price ----------
async function menu(p) {
  const rows = await p.evaluate(() => { document.documentElement.classList.add('cv-all');
    return [...document.querySelectorAll('.mi__b')].map(b => [b.querySelector('.mi__name').textContent.trim(), b.querySelector('.mi__price').textContent.trim()]); });
  const has = (name, price) => rows.some(([n, pr]) => n.startsWith(curly(name)) && pr.replace(/^\+|^from /, '') === '£' + price.toFixed(2));
  const miss = [], b = MENU.bases; let n = 0;
  const want = (name, price) => { n++; if (!has(name, price)) miss.push(name + ' ' + price); };
  want('Crepe or waffle', b.crepe_or_waffle.create_your_own_from); want('Shake', b.shake.create_your_own_from); want('Cookie dough', b.cookie_dough.price);
  want(b.whippy_sundae.name, b.whippy_sundae.price); ['small', 'medium', 'large'].forEach(s => want('Frozen yoghurt, ' + s, b.frozen_yoghurt[s]));
  ['1', '2', '3'].forEach(k => want(['One scoop', 'Two scoops', 'Three scoops'][+k - 1], b.scoops[k])); Object.values(b.scoops.cones).filter(v => v > 0).forEach(v => want('In a cone at £' + v.toFixed(2), v));
  b.strawberry_cup.named.forEach(c => { want(c + ', regular', b.strawberry_cup.reg); want(c + ', large', b.strawberry_cup.large); });
  want('Your own chocolate bar on a cup', b.strawberry_cup.add_own_chocolate_bar); want('Marshmallows on a cup', b.strawberry_cup.add_marshmallows);
  MENU.named_items['Mini Dutch Pancakes'].filter(i => i.name).forEach(i => { want(i.name + ', ten', b.mini_dutch_pancakes.x10); want(i.name + ', twenty', b.mini_dutch_pancakes.x20); });
  for (const [g, list] of Object.entries(MENU.named_items)) { if (g === 'Mini Dutch Pancakes') continue; list.forEach(i => { if (i.name && i.price != null) want(i.name, i.price); }); }
  // the frozen yoghurt prices and every sauce and topping are on the builder, as text
  const builder = await p.evaluate(() => ({ sauces: [...document.querySelectorAll('.sauce')].map(s => s.textContent), tops: [...document.querySelectorAll('.topping')].map(s => s.textContent) }));
  MENU.sauces.forEach(s => { n++; if (!builder.sauces.some(t => t.includes(s) && t.includes('£' + MENU.rules.sauce_each.toFixed(2)))) miss.push('sauce ' + s); });
  MENU.toppings.forEach(([t, pr]) => { n++; if (!builder.tops.some(x => x.includes(t) && x.includes('£' + pr.toFixed(2)))) miss.push('topping ' + t); });
  return { ok: miss.length === 0, detail: n + ' menu lines and prices checked, ' + (n - miss.length) + ' found as text' + (miss.length ? '. MISSING ' + miss.slice(0, 8).join('; ') : '') };
}

// ---------- 6. the copy ----------
async function copy(p) {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const stat = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<meta name="description" content="([^"]*)"[^>]*>/g, ' $1 ').replace(/<meta[^>]*>/g, ' ').replace(/<img[^>]*?alt="([^"]*)"[^>]*>/g, ' $1 ').replace(/aria-label="([^"]*)"/g, '> $1 <').replace(/<[^>]+>/g, ' ');
  const live = await p.evaluate(async () => {
    document.documentElement.classList.add('cv-all');
    document.querySelector('.sauce[data-sauce="Milk choc"]').click(); document.querySelector('.topping[data-topping="Sprinkles"]').click();
    // an order and a booking that stop short, then go through, so every message shows once
    document.getElementById('oform').requestSubmit(); document.getElementById('bform').requestSubmit();
    const s = document.querySelector('input[name="order-shop"]'); s.click(); document.querySelector('input[name="order-mode"][value="delivery"]').click();
    await new Promise(r => setTimeout(r, 60)); const sl = document.querySelector('#slots .slot'); if (sl) sl.click();
    const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); };
    set('order-name', 'Sam'); set('order-phone', '07700 900123'); set('order-address', '1 Test Street');
    document.getElementById('oform').requestSubmit();
    document.querySelector('input[name="party-shop"]').click(); document.querySelector('input[name="party-occasion"]').click(); document.querySelector('#days .day').click();
    await new Promise(r => setTimeout(r, 60)); const ps = document.querySelector('#pslots .slot'); if (ps) ps.click();
    set('party-name', 'Sam'); set('party-phone', '07700 900123'); document.getElementById('bform').requestSubmit();
    await new Promise(r => setTimeout(r, 1400));
    return document.body.innerText + ' ' + document.title + ' ' + [...document.querySelectorAll('[alt],[aria-label]')].map(e => (e.getAttribute('alt') || '') + ' ' + (e.getAttribute('aria-label') || '')).join(' '); });
  const text = (stat + ' ' + live).replace(/&amp;/g, '&').replace(/&#?\w+;/g, ' ');
  const allowedHyphen = [].concat(...Object.values(MENU.named_items).map(g => g.map(i => i.name).filter(Boolean))).filter(n => /-/.test(n));
  let t2 = text; allowedHyphen.forEach(n => { t2 = t2.split(n).join(' '); });
  // the test inputs and the phone number typed in for it aren't the site's copy
  t2 = t2.replace(/https?:\/\/\S+/g, ' ').replace(/@[\w.]+/g, ' ').replace(/07700 900123/g, ' ');
  const probs = [];
  const dash = t2.match(/[^\s]*[-‐-―][^\s]*/g); if (dash) probs.push('dashes: ' + [...new Set(dash)].slice(0, 6).join(' '));
  const colon = t2.match(/[^\s]*:[^\s]*/g); if (colon) probs.push('colons: ' + [...new Set(colon)].slice(0, 6).join(' '));
  const emoji = t2.match(/\p{Extended_Pictographic}/gu); if (emoji) probs.push('emoji: ' + emoji.join(''));
  const bang = (live.match(/!/g) || []).length; if (bang > 1) probs.push(bang + ' exclamation marks');
  const words = ['delve', 'leverage', 'utilize', 'utilise', 'harness', 'unlock', 'unleash', 'empower', 'elevate', 'streamline', 'transform', 'supercharge', 'amplify', 'foster', 'facilitate', 'embark', 'seamless', 'robust', 'cutting edge', 'bespoke', 'tailored', 'holistic', 'innovative', 'groundbreaking', 'game changing', 'unparalleled', 'comprehensive', 'curated', 'immersive', 'impactful', 'scalable', 'landscape', 'ecosystem', 'realm', 'tapestry', 'journey', 'testament', 'synergy', 'solutions', 'furthermore', 'moreover', 'additionally', 'ultimately', 'essentially', 'indulge', 'delectable', 'mouthwatering', 'treat yourself', 'elevate your'];
  const found = words.filter(wd => new RegExp('\\b' + wd + '\\w*\\b', 'i').test(t2)); if (found.length) probs.push('banned words: ' + found.join(', '));
  const unc = t2.match(/\b(it is|do not|you will|we are|that is)\b/gi); if (unc) probs.push('uncontracted: ' + [...new Set(unc)].join(', '));
  if (/wonka/i.test(t2)) probs.push('the W word');
  if (/uber/i.test(t2)) probs.push('Uber is mentioned');
  const note = 'A prototype by Astra agency for Charlie’s Desserts. Prices from Charlie’s menu. Nothing here places a real order or booking.';
  const notes = live.split(note).length - 1; if (notes < 4) probs.push('the prototype note shows ' + notes + ' times, it belongs at the top, on the order, on the booking and in the foot');
  const contractions = (t2.match(/\b\w+[’'](s|re|ll|ve|t|d|m)\b/gi) || []).length;
  return { ok: probs.length === 0, detail: probs.length ? probs.join('; ') : 'no dashes, no colons, no emoji, ' + bang + ' exclamation mark, no banned words, nothing uncontracted, no Uber, the prototype note ' + notes + ' times, ' + contractions + ' contractions' };
}

// ---------- 7. overflow ----------
async function overflow(plant) {
  const rows = []; let ok = true;
  const probe = async (p) => p.evaluate(async () => { document.documentElement.classList.add('cv-all'); window.scrollTo(200, 400); await new Promise(r => setTimeout(r, 120)); const sx = window.scrollX;
    const clipped = (el) => { for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (/hidden|clip|auto|scroll/.test(cs.overflowX)) return true; } return false; };
    const cut = [...document.querySelectorAll('body *')].filter(el => { if (el.closest('svg') || clipped(el)) return false; const rr = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      if (!rr.width || cs.position === 'fixed') return false; return rr.right > innerWidth + 1 || rr.left < -1; }).map(el => el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]).slice(0, 3);
    // every shown copy of the price label has to read in full, never cut short
    [...document.querySelectorAll('body *')].filter(el => /final price at the counter/.test(el.textContent) && ![...el.children].some(c => /final price at the counter/.test(c.textContent)))
      .filter(el => el.getClientRects().length && el.scrollWidth > el.clientWidth + 1).forEach(el => cut.push('label cut in ' + el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]));
    // and no word is cut in two across lines, unless the browser hyphenates it properly
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), split = [];
    for (let n; (n = tw.nextNode());) { const el = n.parentElement; if (!el || el.closest('svg, script, style') || !el.getClientRects().length || getComputedStyle(el).hyphens === 'auto') continue;
      const re = /[^\s\-\/]{4,}/g; let m; while ((m = re.exec(n.data))) { const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
        const rs = [...rg.getClientRects()].filter(x => x.width > 0); if (rs.length > 1 && Math.abs(rs[0].top - rs[rs.length - 1].top) > 2) split.push(m[0]); } }
    if (split.length) cut.push('words cut in two ' + [...new Set(split)].slice(0, 6).join(' '));
    return { sx, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, cut }; });
  for (const w of [320, 360, 390, 430, 768, 1024, 1440, 1920]) {
    const h = w < 1024 ? 844 : 900, p = await page(w, h, w < 768, { wait: 900, plant });
    const r = await probe(p);
    const bad = r.sx !== 0 || r.sw > r.cw || r.cut.length; if (bad) ok = false;
    rows.push(w + (bad ? ' FAIL scrollX ' + r.sx + ' ' + r.sw + '/' + r.cw + ' ' + r.cut.join(',') : ' ok')); await close(p);
  }
  const p = await page(1440, 900, false, { wait: 900, plant }); await p.setViewportSize({ width: 320, height: 700 }); await p.waitForTimeout(500);
  const rr = await probe(p);
  const bad = rr.sx !== 0 || rr.sw > rr.cw || rr.cut.length; if (bad) ok = false; rows.push('resize 1440 to 320 ' + (bad ? 'FAIL ' + rr.cut.join(',') : 'ok')); await close(p);
  return { ok, detail: rows.join(', ') };
}

// ---------- 8. errors on a cold load, and every image decoded on the way down ----------
async function errors(plant) {
  const rows = []; let ok = true;
  for (const [w, h, mob] of SIZES) {
    const p = await page(w, h, mob, { plant, wait: 3000 });
    const imgs = await p.evaluate(async (JUMP) => { const jump = eval(JUMP); const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += innerHeight / 2) { jump(y); await new Promise(r => setTimeout(r, 160)); }
      document.documentElement.classList.add('cv-all');
      const all = [...document.images]; all.forEach(i => { i.loading = 'eager'; }); await Promise.all(all.map(i => i.decode ? i.decode().catch(() => {}) : 0));
      return { n: all.length, bad: all.filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')), video: document.querySelectorAll('video').length }; }, JUMP);
    await p.waitForTimeout(500);
    const bad = p.errs.length || imgs.bad.length; if (bad) ok = false;
    rows.push(w + ': ' + imgs.n + ' images decoded' + (imgs.bad.length ? ', NOT ' + imgs.bad.join(' ') : '') + ', ' + imgs.video + ' films' + (p.errs.length ? ', ' + p.errs.join(' | ') : ', 0 console errors, 0 failed requests'));
    await close(p);
  }
  return { ok, detail: rows.join('; ') };
}

// ---------- 9. axe at three scroll points, both motion modes, both sizes ----------
async function axe(plant) {
  const rows = []; let ok = true;
  for (const [w, h, mob] of SIZES) for (const reduced of [false, true]) {
    const p = await page(w, h, mob, { reduced, plant, wait: reduced ? 1500 : 5200 }); await p.addScriptTag({ content: AXE });
    for (const where of ['top', 'middle', 'end']) {
      const v = await p.evaluate(async ([where, JUMP]) => { const jump = eval(JUMP); const H = document.documentElement.scrollHeight; jump(where === 'top' ? 0 : where === 'middle' ? H / 2 - innerHeight / 2 : H);
        await new Promise(r => setTimeout(r, 1400)); const r = await window.axe.run(document, { resultTypes: ['violations'] });
        return r.violations.map(x => x.id + '(' + x.nodes.length + ')'); }, [where, JUMP]);
      if (v.length) ok = false; rows.push(w + (reduced ? ' reduced' : '') + ' ' + where + ': ' + (v.length ? v.join(' ') : 'clean'));
    }
    await close(p);
  }
  return { ok, detail: rows.join('; ') };
}

// ---------- 10. reduced motion and no JavaScript ----------
async function still(plant) {
  const rows = []; let ok = true;
  const p = await page(390, 844, true, { js: false, wait: 300, plant });
  const r = await p.evaluate(() => { document.documentElement.classList.add('cv-all'); const t = document.body.innerText, vis = (s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden').length;
    const poster = document.querySelector('.hero__poster img'); const pr = poster.getBoundingClientRect();
    return { h1: /What are\s+you making/.test(t), prices: (t.match(/£\d+\.\d\d/g) || []).length, bases: vis('.base'), sauces: vis('.sauce'), toppings: vis('.topping'), menu: vis('.mi'), poster: pr.width > 100 && getComputedStyle(poster).opacity !== '0' && poster.complete && poster.naturalWidth > 0 }; });
  const okNoJs = r.h1 && r.bases === 6 && r.sauces === 12 && r.toppings === 19 && r.menu >= 80 && r.prices >= 120 && r.poster;
  if (!okNoJs) ok = false; rows.push('no JS: headline ' + r.h1 + ', ' + r.bases + ' bases, ' + r.sauces + ' sauces, ' + r.toppings + ' toppings, ' + r.menu + ' menu rows, ' + r.prices + ' prices as text, the hero still ' + (r.poster ? 'shown' : 'MISSING'));
  await close(p);
  const q = await page(1440, 900, false, { reduced: true, wait: 1500, plant });
  const s = await q.evaluate(async () => { const shut = document.documentElement.classList.contains('is-shut') || document.documentElement.classList.contains('motion');
    document.getElementById('make').scrollIntoView(); await new Promise(r => setTimeout(r, 1500));
    document.querySelector('.sauce[data-sauce="Biscoff"]').click(); document.querySelector('.topping[data-topping="Gum Balls"]').click(); document.querySelector('.minibase[data-base="shake"]').click(); await new Promise(r => setTimeout(r, 80));
    const hs = window.CharlieHero3D && window.CharlieHero3D.state; return { shut, settled: window.CharlieBuilder.isSettled(), base: window.CharlieOrder.get().base, intro: hs ? hs.introStart != null : false }; });
  const okRm = !s.shut && s.settled && s.base === 'shake' && !s.intro;
  if (!okRm) ok = false; rows.push('reduced motion: shutter ' + (s.shut ? 'SHUT' : 'open') + ', no intro ' + !s.intro + ', a pour, a topping and a base swap ' + (s.settled ? 'finished at once' : 'STILL MOVING'));
  await close(q);
  return { ok, detail: rows.join('; ') };
}

// ---------- the order and the booking, end to end as a mock ----------
async function flows(plant) {
  const rows = []; let ok = true;
  for (const [w, h, mob] of SIZES) {
    const p = await page(w, h, mob, { plant, reduced: true, wait: 800 });
    const r = await p.evaluate(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); };
      document.querySelector('.orderbar [data-action="order"]').click(); await wait(300);
      document.querySelector('input[name="order-shop"][value="brighouse"]').click(); document.querySelector('input[name="order-mode"][value="collect"]').click(); await wait(50);
      const slot = document.querySelector('#slots .slot'); if (slot) slot.click();
      set('order-name', 'Sam'); set('order-phone', '07700 900123');
      document.getElementById('place-order').click(); await wait(400);
      const o = window.CharlieOrder.get(), ordered = !!o.placed && document.getElementById('gt-stamp').classList.contains('is-on') && /stamped/i.test(document.getElementById('order-done').textContent);
      const meta = document.getElementById('gt-meta').textContent;
      document.querySelector('[data-action="book"]').click(); await wait(300);
      document.getElementById('party-plus').click(); document.querySelector('input[name="party-shop"][value="huddersfield"]').click(); document.querySelector('input[name="party-occasion"][value="Birthday"]').click();
      document.querySelectorAll('#days .day')[2].click(); await wait(50); const ps = document.querySelector('#pslots .slot'); if (ps) ps.click();
      set('party-name', 'Sam'); set('party-phone', '07700 900123'); document.getElementById('place-booking').click(); await wait(400);
      const tt = document.getElementById('tticket'), booked = !tt.hidden && /Table for 7/.test(tt.textContent) && /Huddersfield/.test(tt.textContent) && /confirmed/i.test(document.getElementById('booking-done').textContent);
      return { ordered, meta, slot: slot ? slot.textContent : null, booked, chairs: document.querySelectorAll('#chairs .chair').length, ticket: tt.textContent.replace(/\s+/g, ' ').trim().slice(0, 120) };
    });
    await close(p);
    // with motion on, every chair has to end up round the table, not under it
    const q = await page(w, h, mob, { plant, wait: 2600 });
    const seat = await q.evaluate(async () => {
      document.documentElement.classList.add('cv-all');
      document.getElementById('party-plus').click(); await new Promise(r => setTimeout(r, 1400));
      const top = document.querySelector('#table-svg circle').getBoundingClientRect(), cx = top.left + top.width / 2, cy = top.top + top.height / 2, R = top.width / 2;
      const ch = [...document.querySelectorAll('#chairs .chair')];
      return { n: ch.length, seated: ch.filter(c => { const b = c.getBoundingClientRect(); return Math.hypot(b.left + b.width / 2 - cx, b.top + b.height / 2 - cy) > R * 1.15; }).length };
    });
    await close(q);
    const good = r.ordered && r.booked && r.chairs === 7 && seat.n === 7 && seat.seated === 7; if (!good) ok = false;
    rows.push(w + ': order ' + (r.ordered ? 'placed and stamped' : 'NOT PLACED') + ' (' + r.meta.replace(/\s+/g, ' ').trim() + '), booking ' + (r.booked ? 'confirmed' : 'NOT CONFIRMED') + ', ' + r.chairs + ' chairs, with motion ' + seat.seated + ' of ' + seat.n + ' chairs round the table, "' + r.ticket + '"');
  }
  return { ok, detail: rows.join('; ') };
}

// ---------- the plants ----------
const PLANTS = {
  walk: () => { const s = document.createElement('style'); s.textContent = '.orderbar{display:none!important}#order-final,#place-order,[data-action="order"]{visibility:hidden!important}'; document.head.appendChild(s); },
  hero: () => { const s = document.createElement('style'); s.textContent = '#hero-gl,.hero__poster,.hero__logo,.hero__logo-top,.awning__sign,.base img{opacity:0!important}'; document.head.appendChild(s); },
  look: () => { const d = document.createElement('div'); d.innerHTML = '<p style="text-transform:uppercase;font-size:11px">Our story</p><h2>A kicker</h2><p style="text-transform:uppercase;font-size:11px">Menu</p><h2>Two kickers</h2><p style="text-transform:uppercase;font-size:11px">Visit</p><h2>Plant <em>heading</em></h2><button style="border-radius:999px;padding:12px 32px">Order now →</button><div style="border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.2);width:80px;height:40px;font-family:Poppins">card</div>'; document.getElementById('step-base').appendChild(d); },
  menu: () => { document.querySelectorAll('#mg-hot .mi')[1].remove(); },
  copy: () => { const d = document.createElement('p'); d.textContent = 'Our seamless journey — it is great: indulge! Go!'; document.getElementById('step-base').appendChild(d); },
  overflow: () => { const d = document.createElement('div'); d.style.cssText = 'width:2400px;height:8px;background:red'; document.querySelector('.make__steps').appendChild(d); },
  errors: () => { const i = new Image(); i.src = 'media/missing-plant.webp'; i.alt = 'plant'; document.getElementById('step-base').appendChild(i); },
  axe: () => { const d = document.createElement('div'); d.innerHTML = '<img src="media/logo.webp"><button></button>'; document.getElementById('step-base').appendChild(d); },
  still: () => { const s = document.createElement('style'); s.textContent = '.sauces{display:none!important}'; document.head.appendChild(s); },
  flows: () => { const st = document.createElement('style'); st.textContent = '#chairs > g { transform: none !important; }'; document.head.appendChild(st); const s = document.getElementById('slots'); new MutationObserver(() => { if (s.children.length) s.innerHTML = ''; }).observe(s, { childList: true }); s.innerHTML = ''; }
};
const SUMS_PLANT = { match: '**/js/menu-data.js', handler: async (route) => { const r = await route.fetch(); const b = (await r.text()).replace('"sauce_each":1', '"sauce_each":1.1').split('"create_your_own_from":5.5').join('"create_your_own_from":5.6').replace('"price":6.5,"note"', '"price":6.6,"note"').replace('"small":4.99', '"small":5.09').replace('"price":5,"name"', '"price":5.1,"name"').replace('"price":30,', '"price":31,'); route.fulfill({ response: r, body: b }); } };

async function run(name, clean, planted) {
  if (only.length && !only.some(o => name.startsWith(o))) return;
  const a = await clean(), b = await planted();
  const caught = !b.ok;
  log(`${a.ok && caught ? 'PASS' : 'FAIL'}  ${name}${a.warn ? ' (under 35%, reason in the card)' : ''}`);
  log('    clean:   ' + a.detail);
  log('    planted: ' + (caught ? 'caught. ' : 'NOT CAUGHT. ') + b.detail.split('\n')[0].slice(0, 400));
  results.push({ name, ok: a.ok && caught });
}
const results = [];
(async () => {
  const srv = await serve(); URL0 = 'http://localhost:' + srv.address().port + '/';
  browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu'] });
  log('Charlie’s prototype, final look checks, ' + new Date().toISOString());
  for (const [w, h, mob] of SIZES) {
    await run('walk ' + w, async () => { const p = await page(w, h, mob); const r = await walk(p); await close(p); return r; }, async () => { const p = await page(w, h, mob, { plant: PLANTS.walk }); const r = await walk(p); await close(p); return r; });
    await run('hero ' + w, async () => { const p = await page(w, h, mob, { wait: 6500 }); const r = await hero(p); await close(p); return r; }, async () => { const p = await page(w, h, mob, { wait: 6500, plant: PLANTS.hero }); const r = await hero(p); await close(p); return r; });
    await run('look ' + w, async () => { const p = await page(w, h, mob); const r = await look(p); await close(p); return r; }, async () => { const p = await page(w, h, mob, { plant: PLANTS.look }); const r = await look(p); await close(p); return r; });
  }
  await run('sums', async () => { const a = await sums(30, { mobile: true }); const m = await sums(4, { motion: true, seed: 7 }); return { ok: a.ok && m.ok, detail: '30 orders, instant\n    ' + a.detail + '\n    4 orders with the pour and the falling toppings\n    ' + m.detail }; },
    async () => sums(3, { route: SUMS_PLANT, seed: 99 }));
  await run('menu', async () => { const p = await page(1440, 900, false, { wait: 600 }); const r = await menu(p); await close(p); return r; }, async () => { const p = await page(1440, 900, false, { wait: 600, plant: PLANTS.menu }); const r = await menu(p); await close(p); return r; });
  await run('copy', async () => { const p = await page(1440, 900, false); const r = await copy(p); await close(p); return r; }, async () => { const p = await page(1440, 900, false, { plant: PLANTS.copy }); const r = await copy(p); await close(p); return r; });
  await run('overflow', () => overflow(null), () => overflow(PLANTS.overflow));
  await run('errors', () => errors(null), () => errors(PLANTS.errors));
  await run('axe', () => axe(null), () => axe(PLANTS.axe));
  await run('reduced motion and no JS', () => still(null), () => still(PLANTS.still));
  await run('order and booking', () => flows(null), () => flows(PLANTS.flows));
  log((results.every(r => r.ok) ? 'ALL PASS' : 'SOME FAIL') + ', ' + results.filter(r => r.ok).length + ' of ' + results.length);
  // a partial run (--only) keeps the full run's record intact
  fs.writeFileSync(path.join(__dirname, only.length ? 'last-partial-run.txt' : 'last-run.txt'), out.join('\n') + '\n');
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
