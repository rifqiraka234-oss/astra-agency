/* The checks, for the round 2 site of four pages. Each check runs clean, then with a planted fault it must catch, then
   the fault is gone (a fresh page). Run from this folder:
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
const PAGES = [['home', ''], ['menu', 'menu/'], ['birthdays', 'birthdays/'], ['find-us', 'find-us/']];
const NOTE = 'A prototype by Astra agency for Charlie’s Desserts. Prices from Charlie’s menu. Nothing here places a real order or booking.';

// ---------- a static server for the folder ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain', '.mp4': 'video/mp4' };
function serve() {
  return new Promise(res => { const s = http.createServer((q, r) => { let u = decodeURIComponent(q.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html';
    const f = path.join(ROOT, u); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(0, () => res(s)); });
}

const SIZES = [[390, 844, true], [1440, 900, false]];
let browser, URL0;
// the page is ready once every script is in and the bar shows the order
const ready = async (p, at) => {
  await p.waitForFunction((home) => window.CD_READY && window.CharlieOrder && document.getElementById('bar-name') && document.getElementById('bar-name').textContent.length > 0 && (!home || window.CharlieBuilder), at === '', { timeout: 15000 });
};
async function page(w, h, mob, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mob, hasTouch: mob, reducedMotion: opts.reduced ? 'reduce' : 'no-preference', javaScriptEnabled: opts.js !== false });
  if (opts.init) await ctx.addInitScript(opts.init);
  const p = await ctx.newPage(); p.setDefaultTimeout(20000); p.plant = opts.plant; p.wait = opts.wait != null ? opts.wait : 2600;
  p.errs = []; p.on('console', m => { if (m.type() === 'error') p.errs.push('console: ' + m.text()); }); p.on('pageerror', e => p.errs.push('pageerror: ' + e.message));
  p.on('requestfailed', r => { if (!/\.mp4($|\?)/.test(r.url())) p.errs.push('failed: ' + r.url()); }); p.on('response', r => { if (r.status() >= 400) p.errs.push(r.status() + ': ' + r.url()); });
  if (opts.route) await p.route(opts.route.match, opts.route.handler);
  await go(p, opts.path || '', opts.js === false);
  return p;
}
// to another page in the same tab, so sessionStorage carries the order, with the plant laid again on the new page
async function go(p, at, nojs) {
  await p.goto(URL0 + at, { waitUntil: 'load' });
  if (!nojs) await ready(p, at.replace(/#.*$/, ''));
  await p.waitForTimeout(p.wait);
  if (p.plant) await p.evaluate(p.plant);
}
const close = (p) => p.context().close();
// scroll without the smooth scroll animating it
const JUMP = `(y) => { const l = window.CharlieMotion && window.CharlieMotion.lenis && window.CharlieMotion.lenis(); if (l) l.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y); }`;

// ---------- 1. the walk: an order action in view at every half screen, that isn't the header ----------
// On Birthdays its own action, Book, has to be in reach at every half screen too, and the header carries it there.
async function walk(p, name) {
  return p.evaluate(async ([JUMP, name]) => {
    const jump = eval(JUMP);
    const vis = (el) => { const r = el.getBoundingClientRect(); if (!r.width || !r.height || r.bottom <= 2 || r.top >= innerHeight - 2 || r.right <= 0 || r.left >= innerWidth) return false;
      for (let e = el; e && e !== document; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.1) return false; }
      // is it the top thing at its own middle, so a tap would reach it
      const cx = Math.min(innerWidth - 2, Math.max(2, r.left + r.width / 2)), cy = Math.min(innerHeight - 2, Math.max(2, r.top + r.height / 2)), top = document.elementFromPoint(cx, cy);
      return !!top && (top === el || el.contains(top)); };
    const H = document.documentElement.scrollHeight, step = innerHeight / 2, rows = []; let ok = true;
    for (let y = 0; ; y += step) { const yy = Math.min(y, H - innerHeight); jump(yy); await new Promise(r => setTimeout(r, 220));
      const seen = [...document.querySelectorAll('[data-action="order"], #place-order')].filter(e => !e.closest('.hd')).filter(vis).map(e => e.id || (e.closest('.orderbar') ? 'bar' : e.dataset.shop ? 'shop' : e.className.split(' ')[0]));
      const book = name !== 'birthdays' || [...document.querySelectorAll('[data-action="book"], #place-booking')].some(vis);
      rows.push(Math.round(yy) + ':' + ([...new Set(seen)].join('+') || 'NONE') + (name === 'birthdays' ? (book ? '+book' : '+NO BOOK') : ''));
      if (!seen.length || !book) ok = false; if (yy >= H - innerHeight) break; }
    jump(0); return { ok, detail: rows.length + ' steps. ' + rows.join(' ') };
  }, [JUMP, name]);
}

// ---------- 2. the hero: share of the first screen that is their photo, their hat or their mark ----------
// The 3D is drawn in a worker the page can't read back, so the share is measured from the screen itself: a
// screenshot as it is, and one with their hat, dessert, logo and photos hidden. The pixels that change are theirs.
// On Home the sweets are ours, so they're hidden in both. On Home the dive must land on the builder, never a blank screen.
const THEIRS = { home: '#hero-gl,.hero__poster,.hd__logo img,.hero__logo-top,.awning__sign,.base img', other: '.phero__pic img,.hd__logo img' };
async function hero(p, name) {
  const sel = name === 'home' ? THEIRS.home : THEIRS.other;
  await p.evaluate(async (JUMP) => { eval(JUMP)(0); if (window.CharlieHero3D && window.CharlieHero3D.showSweets) window.CharlieHero3D.showSweets(false); await new Promise(r => setTimeout(r, 500)); }, JUMP);
  const a = await p.screenshot();
  await p.evaluate(async (sel) => { const s = document.createElement('style'); s.id = 'qa-hide'; s.textContent = sel + '{visibility:hidden!important}'; document.head.appendChild(s); await new Promise(r => setTimeout(r, 300)); }, sel);
  const b = await p.screenshot();
  await p.evaluate(() => { document.getElementById('qa-hide').remove(); if (window.CharlieHero3D && window.CharlieHero3D.showSweets) window.CharlieHero3D.showSweets(true); });
  const A = await sharp(a).raw().toBuffer({ resolveWithObject: true }), B = await sharp(b).raw().toBuffer();
  let hit = 0; const n = A.info.width * A.info.height, ch = A.info.channels;
  for (let i = 0; i < n; i++) { const k = i * ch; if (Math.abs(A.data[k] - B[k]) + Math.abs(A.data[k + 1] - B[k + 1]) + Math.abs(A.data[k + 2] - B[k + 2]) > 30) hit++; }
  const share = hit / n, gl = await p.evaluate(() => document.documentElement.classList.contains('has-hero-gl'));
  let dive = { ok: true, text: '' };
  if (name === 'home') dive = await p.evaluate(async (JUMP) => {
    const m = document.getElementById('make'); let y = 0; for (let e = m; e; e = e.offsetParent) y += e.offsetTop;
    eval(JUMP)(y); await new Promise(r => setTimeout(r, 900));
    const hero = document.getElementById('open'), op = +getComputedStyle(hero).opacity, at = document.elementFromPoint(Math.round(innerWidth * 0.3), Math.round(innerHeight * 0.55));
    const onB = !!at && !!at.closest('#make'); eval(JUMP)(0);
    return { ok: onB && op < 0.1, text: ', the dive lands on the builder ' + (onB ? 'yes' : 'NO, ' + (at ? at.className : 'nothing')) + ' with the hero at ' + op.toFixed(2) };
  }, JUMP);
  return { ok: share >= 0.25 && dive.ok, warn: share < 0.35, detail: (share * 100).toFixed(1) + '% of the first screen is their ' + (name === 'home' ? 'hat, dessert, logo and photos (' + (gl ? '3D' : 'still') + '), sweets not counted' : 'photo and logo') + dive.text };
}

// ---------- 3. the look ----------
async function look(p, name) {
  return p.evaluate(async (name) => {
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
    // ten sections at most on any page
    const sections = document.querySelectorAll('main > section, main > footer, main > div').length;
    if (sections > 10) probs.push(sections + ' sections on the ' + name + ' page');
    const lum = (c) => { const m = (c.match(/[\d.]+/g) || [0, 0, 0]).map(Number); return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255; };
    const tones = [...document.querySelectorAll('main > *')].map(e => lum(getComputedStyle(e).backgroundColor) > 0.5 ? 'L' : 'D');
    let flips = 0; for (let i = 1; i < tones.length; i++) if (tones[i] !== tones[i - 1]) flips++;
    if (flips >= 3) probs.push('light and dark chapters taking turns ' + tones.join(''));
    // one button style: every call to action is the ticket stub
    const odd = [...document.querySelectorAll('main button, main a')].filter(b => rendered(b) && !b.closest('.mi, .menu__jump, .base, .minibase, .sauce, .topping, .size, .qty, .day, .slot, .segb, .shop__body p, .strip, .foot, .tease, .pband, .shop__froyo, .bform, #table-svg') && !b.classList.contains('btn-order') && !b.classList.contains('qty__b') && !b.classList.contains('fav__go'))
      .map(b => b.textContent.trim().slice(0, 24));
    if (odd.length) probs.push('buttons outside the one style: ' + odd.slice(0, 4).join(' | '));
    const screens = (document.documentElement.scrollHeight / innerHeight).toFixed(1);
    return { ok: probs.length === 0, detail: probs.length ? [...new Set(probs)].join('; ') : 'fonts ' + allowed.join(' + ') + ', no italics, ' + kickers + ' kickers, no pills, no arrows, no soft shadow cards, no count ups, one button style, ' + sections + ' sections, tones ' + tones.join('') + ' (' + flips + ' turns), ' + screens + ' screens long' };
  }, name);
}

// ---------- 4. the sums: random orders through the UI and the drawer, priced here from menu.json on its own ----------
// Each order is made on Home, carried to /menu/ where the menu items go on, and back to Home. At every stop the header,
// the bar, the drawer's cart and the golden ticket have to show the same total as menu.json gives.
function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }; }
const FAVS = { 'Shakes': 'shakes', 'Crepe or Waffle': 'waffles', 'Cookie Dough': 'dough', 'Whippy Ice Cream': 'whippy' };
const FAV_BASE = { 'Shakes': 'shake', 'Crepe or Waffle': 'waffle', 'Cookie Dough': 'cookie_dough', 'Whippy Ice Cream': 'sundae' };
const favList = Object.keys(FAVS).flatMap(g => MENU.named_items[g].filter(i => i.name && i.price != null && i.name !== MENU.bases.whippy_sundae.name).map(i => ({ g, name: i.name, price: i.price, desc: (i.desc || '').toLowerCase() })));
// a sauce or topping the description might mean, so the test never adds it to that favourite and expects a charge
const STOP = ['sauce', 'bits', 'pieces', 'cup', 'chocolate', 'choc'];
const mentions = (desc, name) => name.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !STOP.includes(w)).some(w => desc.includes(w.slice(0, 4))) || (/choc/.test(name.toLowerCase()) && /chocolate sauce|choc/.test(desc) && /sauce/.test(desc) && MENU.sauces.includes(name));
const ITEM_GROUPS = ['Sharers', 'Charlie in Dubai', 'Hot Drinks', 'Mocktails'];
const itemList = ITEM_GROUPS.flatMap(g => MENU.named_items[g].filter(i => i.name && i.price != null).map(i => ({ g, name: i.name, price: i.price })));
function expected(o, withItems) {
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
  return each * o.qty + (withItems ? o.items.reduce((a, it) => a + pen(it.price), 0) : 0);
}
// everything on the page that shows the total
const readTotals = (p, where) => p.evaluate(async (where) => {
  const pn = (t) => Math.round(parseFloat(String(t).replace(/[^\d.]/g, '')) * 100), $ = (s) => document.querySelector(s);
  const r = { state: window.CharlieOrder.get().total, header: pn($('[data-live="total"]').textContent), bar: pn($('#bar-price').textContent) };
  if ($('#step-total')) { r.step = pn($('#step-total').textContent); r.ticket = +$('#ticket').dataset.total; r.ticketText = pn($('#ticket-total b').textContent); }
  // the drawer, opened from the bar
  $('#orderbar [data-action="order"]').click(); await new Promise(res => setTimeout(res, 120));
  r.cart = pn($('#cart-total').textContent); r.golden = +$('#gticket').dataset.total; r.goldenText = pn($('#gt-total').textContent);
  window.CharlieChrome.closeDrawer(); await new Promise(res => setTimeout(res, 450));
  return Object.fromEntries(Object.entries(r).map(([k, v]) => [where + '.' + k, v]));
}, where);
async function sums(count, opts = {}) {
  const r = rng(opts.seed || 20261029), bases = ['waffle', 'crepe', 'shake', 'cookie_dough', 'sundae', 'froyo'], bad = [], rows = [];
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
    const wait = opts.motion ? 1500 : 400;
    // a favourite starts on the menu page, and its Make it yours goes to Home's builder with it loaded
    const p = await page(w, h, mob, { reduced: !opts.motion, wait, route: opts.route, path: o.fav ? 'menu/' : '' });
    const q = (s) => s.replace(/"/g, '\\"');
    const tap = async (sel) => { await p.evaluate((sel) => { const e = document.querySelector(sel); e.scrollIntoView({ block: 'nearest', inline: 'center' }); }, sel); await p.click(sel); };
    const settle = async () => { await p.waitForFunction(() => !window.CharlieBuilder || window.CharlieBuilder.isSettled(), null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(opts.motion ? 500 : 60); };
    const toMake = async () => { await p.evaluate((JUMP) => { const m = document.getElementById('make'); let y = 0; for (let e = m; e; e = e.offsetParent) y += e.offsetTop; eval(JUMP)(y); }, JUMP); await p.waitForTimeout(opts.motion ? 900 : 120); };
    if (o.fav) {
      await p.evaluate(() => document.documentElement.classList.add('cv-all'));
      const row = p.locator(`#mg-${FAVS[o.fav.g]} .mi__b[data-preset]`).filter({ has: p.locator('.mi__name', { hasText: new RegExp('^' + curly(o.fav.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }) });
      await Promise.all([p.waitForNavigation({ waitUntil: 'load' }), row.first().click()]);
      await ready(p, ''); await p.waitForTimeout(wait); await toMake(); await settle();
      if (o.removeOne) { const on = p.locator('.topping[aria-pressed="true"], .sauce[aria-pressed="true"]'); if (await on.count()) { await tap('.topping[aria-pressed="true"], .sauce[aria-pressed="true"]'); o.removed = true; } }
      for (const s of o.addSauces) { await tap(`.sauce[data-sauce="${q(s)}"]`); if (opts.motion) await p.waitForTimeout(250); }
      for (const t of o.addToppings) { await tap(`.topping[data-topping="${q(t)}"]`); if (opts.motion) await p.waitForTimeout(200); }
    } else {
      await toMake();
      if (o.base !== 'waffle') { await tap(`.minibase[data-base="${o.base}"]`); await p.waitForTimeout(opts.motion ? 700 : 80); }
      if (o.base === 'froyo') await tap(`[data-size="${o.size}"]`);
      for (const s of o.sauces) { await tap(`.sauce[data-sauce="${q(s)}"]`); if (opts.motion) await p.waitForTimeout(250); }
      for (const t of o.toppings) { await tap(`.topping[data-topping="${q(t)}"]`); if (opts.motion) await p.waitForTimeout(200); }
      for (const e of o.extras) await tap(`[data-extra="${e}"]`);
    }
    await settle();
    // how many, in the drawer's cart
    if (o.qty > 1) {
      await p.evaluate(() => document.querySelector('#orderbar [data-action="order"]').click()); await p.waitForTimeout(500);
      for (let k = 1; k < o.qty; k++) await p.click('#cart [data-step="creation"][data-d="1"]');
      await p.click('.drawer__x'); await p.waitForTimeout(500);
    }
    await settle();
    const got = Object.assign({}, await readTotals(p, 'home'));
    const want0 = expected(o, false);
    // on to the menu page, where the menu items go straight on the order
    await go(p, 'menu/');
    for (const it of o.items) { await p.evaluate(() => document.documentElement.classList.add('cv-all')); await p.click(`.mi__b[data-item][data-name="${q(curly(it.name))}"]`); }
    await p.waitForTimeout(150);
    const atMenu = await readTotals(p, 'menu');
    // and back to Home, where the builder has the same creation and the same total
    await go(p, ''); await settle();
    const back = await readTotals(p, 'back');
    const want = expected(o, true);
    const wrong = Object.entries(got).filter(([, v]) => v !== want0).concat(Object.entries(Object.assign({}, atMenu, back)).filter(([, v]) => v !== want)).map(([k, v]) => k + '=' + v);
    const label = o.fav ? 'fav ' + o.fav.name + ' +s' + o.addSauces.length + ' +t' + o.addToppings.length + (o.removed ? ' -1' : '') : o.base + (o.base === 'froyo' ? '/' + o.size : '') + ' s' + o.sauces.length + ' t' + o.toppings.length + ' e' + o.extras.length;
    rows.push(`${i + 1} ${mob ? '390' : '1440'} ${label} x${o.qty} items${o.items.length} want ${want0} then ${want}` + (wrong.length ? ' GOT ' + wrong.join(',') : ' ok at Home, /menu/ and back'));
    if (wrong.length) bad.push(i + 1);
    if (p.errs.length) bad.push((i + 1) + ' errors: ' + p.errs.join(' | '));
    await close(p);
  }
  return { ok: bad.length === 0, detail: rows.join('\n    '), bad };
}

// ---------- 5. the menu: every item in menu.json is on /menu/ as text with its price, and the builder has the rest ----------
async function menu(p, q) {
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
  // every sauce and topping, and the two scoops and three sizes, are on Home's builder as text
  const builder = await q.evaluate(() => ({ sauces: [...document.querySelectorAll('.sauce')].map(s => s.textContent), tops: [...document.querySelectorAll('.topping[data-topping]')].map(s => s.textContent),
    extras: [...document.querySelectorAll('[data-extra]')].map(s => s.textContent), sizes: [...document.querySelectorAll('[data-size]')].map(s => s.textContent) }));
  MENU.sauces.forEach(s => { n++; if (!builder.sauces.some(t => t.includes(s) && t.includes('£' + MENU.rules.sauce_each.toFixed(2)))) miss.push('sauce ' + s); });
  MENU.toppings.forEach(([t, pr]) => { n++; if (!builder.tops.some(x => x.includes(t) && x.includes('£' + pr.toFixed(2)))) miss.push('topping ' + t); });
  const sc = MENU.rules.scoop_on_crepe_waffle_or_cookie_dough;
  [['Vanilla scoop', sc.vanilla_scoop], ['Whippy', sc.whippy]].forEach(([t, pr]) => { n++; if (!builder.extras.some(x => x.includes(t) && x.includes('£' + pr.toFixed(2)))) miss.push('scoop ' + t); });
  ['small', 'medium', 'large'].forEach(s => { n++; if (!builder.sizes.some(x => x.toLowerCase().includes(s) && x.includes('£' + b.frozen_yoghurt[s].toFixed(2)))) miss.push('size ' + s); });
  return { ok: miss.length === 0, detail: n + ' menu lines and prices checked, ' + (n - miss.length) + ' found as text' + (miss.length ? '. MISSING ' + miss.slice(0, 8).join('; ') : '') };
}

// ---------- 6. the copy, on every page and the 404 ----------
async function copy(plant) {
  const files = ['index.html', 'menu/index.html', 'birthdays/index.html', 'find-us/index.html', '404.html'];
  const stat = files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<meta name="description" content="([^"]*)"[^>]*>/g, ' $1 ').replace(/<meta[^>]*>/g, ' ').replace(/<img[^>]*?alt="([^"]*)"[^>]*>/g, ' $1 ').replace(/aria-label="([^"]*)"/g, '> $1 <').replace(/<[^>]+>/g, ' ')).join(' ');
  const lives = {}, probs = [];
  for (const [name, at] of PAGES) {
    const p = await page(1440, 900, false, { path: at, plant: name === 'menu' ? plant : null, wait: 1200 });
    lives[name] = await p.evaluate(async (name) => {
      document.documentElement.classList.add('cv-all');
      const wait = (ms) => new Promise(r => setTimeout(r, ms)), $ = (s) => document.querySelector(s);
      const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); };
      if (name === 'home') { $('.sauce[data-sauce="Milk choc"]').click(); $('.topping[data-topping="Sprinkles"]').click(); }
      if (name === 'menu') { const a = $('.mi__b[data-item]'); if (a) a.click(); }
      // an order that stops short, then goes through, so every message shows once
      $('#orderbar [data-action="order"]').click(); await wait(400);
      const drawerOpen = document.body.innerText;
      $('#oform').requestSubmit(); await wait(30);
      $('input[name="order-shop"]').click(); $('input[name="order-mode"][value="delivery"]').click();
      await wait(60); const sl = $('#slots .slot'); if (sl) sl.click();
      set('order-name', 'Sam'); set('order-phone', '07700 900123'); set('order-address', '1 Test Street');
      const formText = document.body.innerText;
      $('#oform').requestSubmit(); await wait(1400);
      let t = drawerOpen + ' ' + formText + ' ' + document.body.innerText;
      window.CharlieChrome.closeDrawer(); await wait(450);
      if (name === 'birthdays') {
        $('#bform').requestSubmit(); await wait(30); t += ' ' + document.body.innerText;
        $('input[name="party-shop"]').click(); $('input[name="party-occasion"]').click(); $('#days .day').click();
        await wait(60); const ps = $('#pslots .slot'); if (ps) ps.click();
        set('party-name', 'Sam'); set('party-phone', '07700 900123'); $('#bform').requestSubmit(); await wait(1400);
      }
      // the phone panel's words count too
      const panel = document.getElementById('panel'); panel.hidden = false;
      t += ' ' + document.body.innerText + ' ' + document.title + ' ' + [...document.querySelectorAll('[alt],[aria-label]')].map(e => (e.getAttribute('alt') || '') + ' ' + (e.getAttribute('aria-label') || '')).join(' ');
      panel.hidden = true;
      return { t, notesPage: document.body.innerText.split('A prototype by Astra agency for Charlie’s Desserts. Prices from Charlie’s menu. Nothing here places a real order or booking.').length - 1, notesDrawer: drawerOpen.split('A prototype by Astra agency for Charlie’s Desserts. Prices from Charlie’s menu. Nothing here places a real order or booking.').length - 1, bangs: [...new Set(t.split(/\n/).filter(l => l.includes('!')).map(l => l.trim()))] };
    }, name);
    if (p.errs.length) probs.push(name + ' errors ' + p.errs.join(' | '));
    await close(p);
  }
  const live = Object.values(lives).map(l => l.t).join(' ');
  const text = (stat + ' ' + live).replace(/&amp;/g, '&').replace(/&#?\w+;/g, ' ');
  const allowedHyphen = [].concat(...Object.values(MENU.named_items).map(g => g.map(i => i.name).filter(Boolean))).filter(n => /-/.test(n));
  let t2 = text; allowedHyphen.forEach(n => { t2 = t2.split(n).join(' '); });
  // the test inputs and the phone number typed in for it aren't the site's copy
  t2 = t2.replace(/https?:\/\/\S+/g, ' ').replace(/@[\w.]+/g, ' ').replace(/07700 900123/g, ' ');
  const dash = t2.match(/[^\s]*[-‐-―][^\s]*/g); if (dash) probs.push('dashes: ' + [...new Set(dash)].slice(0, 6).join(' '));
  const colon = t2.match(/[^\s]*:[^\s]*/g); if (colon) probs.push('colons: ' + [...new Set(colon)].slice(0, 6).join(' '));
  const emoji = t2.match(/\p{Extended_Pictographic}/gu); if (emoji) probs.push('emoji: ' + emoji.join(''));
  // at most one exclamation mark on the whole site: the one line, the same on every page's drawer
  const bangs = [...new Set(Object.values(lives).flatMap(l => l.bangs))]; if (bangs.length > 1) probs.push(bangs.length + ' different lines with an exclamation mark: ' + bangs.join(' | '));
  const words = ['delve', 'leverage', 'utilize', 'utilise', 'harness', 'unlock', 'unleash', 'empower', 'elevate', 'streamline', 'transform', 'supercharge', 'amplify', 'foster', 'facilitate', 'embark', 'seamless', 'robust', 'cutting edge', 'bespoke', 'tailored', 'holistic', 'innovative', 'groundbreaking', 'game changing', 'unparalleled', 'comprehensive', 'curated', 'immersive', 'impactful', 'scalable', 'landscape', 'ecosystem', 'realm', 'tapestry', 'journey', 'testament', 'synergy', 'solutions', 'furthermore', 'moreover', 'additionally', 'ultimately', 'essentially', 'indulge', 'delectable', 'mouthwatering', 'treat yourself', 'elevate your'];
  const found = words.filter(wd => new RegExp('\\b' + wd + '\\w*\\b', 'i').test(t2)); if (found.length) probs.push('banned words: ' + found.join(', '));
  const unc = t2.match(/\b(it is|do not|you will|we are|that is)\b/gi); if (unc) probs.push('uncontracted: ' + [...new Set(unc)].join(', '));
  if (/wonka/i.test(t2)) probs.push('the W word');
  if (/uber/i.test(t2)) probs.push('Uber is mentioned');
  // the prototype note on every page, at the top and in the foot, in the drawer, and on the booking
  const notes = Object.entries(lives).map(([n, l]) => n + ' ' + l.notesPage + ' + drawer ' + l.notesDrawer);
  Object.entries(lives).forEach(([n, l]) => { if (l.notesPage < 2 || l.notesDrawer < 3) probs.push('the prototype note is short on ' + n + ' (' + l.notesPage + ' on the page, ' + l.notesDrawer + ' with the drawer open)'); });
  if (!/Nothing here places a real order or booking/.test(lives.birthdays.t.split('Your phone').pop())) probs.push('no prototype note by the booking');
  const contractions = (t2.match(/\b\w+[’'](s|re|ll|ve|t|d|m)\b/gi) || []).length;
  return { ok: probs.length === 0, detail: probs.length ? probs.join('; ') : '4 pages and the 404, no dashes, no colons, no emoji, ' + bangs.length + ' exclamation mark, no banned words, nothing uncontracted, no Uber, the prototype note ' + notes.join(', ') + ', ' + contractions + ' contractions' };
}

// ---------- 7. overflow, every page ----------
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
  for (const [name, at] of PAGES) {
    const bad1 = [];
    for (const w of [320, 360, 390, 430, 768, 1024, 1440, 1920]) {
      const h = w < 1024 ? 844 : 900, p = await page(w, h, w < 768, { wait: 700, plant, path: at });
      const r = await probe(p);
      if (r.sx !== 0 || r.sw > r.cw || r.cut.length) { ok = false; bad1.push(w + ' scrollX ' + r.sx + ' ' + r.sw + '/' + r.cw + ' ' + r.cut.join(',')); }
      await close(p);
    }
    const p = await page(1440, 900, false, { wait: 700, plant, path: at }); await p.setViewportSize({ width: 320, height: 700 }); await p.waitForTimeout(500);
    const rr = await probe(p); if (rr.sx !== 0 || rr.sw > rr.cw || rr.cut.length) { ok = false; bad1.push('resize 1440 to 320 ' + rr.cut.join(',')); } await close(p);
    rows.push(name + (bad1.length ? ' FAIL ' + bad1.join('; ') : ' ok at 8 widths and a resize'));
  }
  return { ok, detail: rows.join(', ') };
}

// ---------- 8. errors on a cold load, and every image decoded on the way down, every page ----------
async function errors(plant) {
  const rows = []; let ok = true;
  for (const [name, at] of PAGES) for (const [w, h, mob] of SIZES) {
    const p = await page(w, h, mob, { plant, wait: 2600, path: at });
    const imgs = await p.evaluate(async (JUMP) => { const jump = eval(JUMP); const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += innerHeight / 2) { jump(y); await new Promise(r => setTimeout(r, 160)); }
      document.documentElement.classList.add('cv-all');
      const all = [...document.images]; all.forEach(i => { i.loading = 'eager'; }); await Promise.all(all.map(i => i.decode ? i.decode().catch(() => {}) : 0));
      return { n: all.length, bad: all.filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')), video: document.querySelectorAll('video').length }; }, JUMP);
    await p.waitForTimeout(500);
    const bad = p.errs.length || imgs.bad.length; if (bad) ok = false;
    rows.push(name + ' ' + w + ': ' + imgs.n + ' images' + (imgs.bad.length ? ', NOT ' + imgs.bad.join(' ') : '') + ', ' + imgs.video + ' films' + (p.errs.length ? ', ' + p.errs.join(' | ') : ', 0 errors'));
    await close(p);
  }
  return { ok, detail: rows.join('; ') };
}

// ---------- 9. axe at three scroll points, both motion modes, both sizes, every page, and the drawer and the panel open ----------
async function axe(plant) {
  const rows = []; let ok = true;
  for (const [name, at] of PAGES) for (const [w, h, mob] of SIZES) for (const reduced of [false, true]) {
    const p = await page(w, h, mob, { reduced, plant, wait: reduced ? 1200 : (name === 'home' ? 5200 : 2400), path: at }); await p.addScriptTag({ content: AXE });
    const found = [];
    for (const where of ['top', 'middle', 'end', 'drawer', 'panel']) {
      if (where === 'panel' && !mob) continue;
      const v = await p.evaluate(async ([where, JUMP]) => { const jump = eval(JUMP); const H = document.documentElement.scrollHeight;
        if (where === 'drawer') { jump(0); document.querySelector('#orderbar [data-action="order"]').click(); await new Promise(r => setTimeout(r, 700)); }
        else if (where === 'panel') { window.CharlieChrome.closeDrawer(); await new Promise(r => setTimeout(r, 500)); document.getElementById('hd-menu').click(); await new Promise(r => setTimeout(r, 500)); }
        else { jump(where === 'top' ? 0 : where === 'middle' ? H / 2 - innerHeight / 2 : H); await new Promise(r => setTimeout(r, 1300)); }
        const r = await window.axe.run(document, { resultTypes: ['violations'] });
        return r.violations.map(x => x.id + '(' + x.nodes.length + ')'); }, [where, JUMP]);
      if (v.length) { ok = false; found.push(where + ' ' + v.join(' ')); }
    }
    rows.push(name + ' ' + w + (reduced ? ' reduced' : '') + ': ' + (found.length ? found.join(', ') : 'clean'));
    await close(p);
  }
  return { ok, detail: rows.join('; ') };
}

// ---------- 10. reduced motion and no JavaScript ----------
async function still(plant) {
  const rows = []; let ok = true;
  for (const [name, at] of PAGES) {
    const p = await page(390, 844, true, { js: false, wait: 300, plant: name === 'home' ? plant : null, path: at });
    const r = await p.evaluate(() => { document.documentElement.classList.add('cv-all'); const t = document.body.innerText, vis = (s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden').length;
      const poster = document.querySelector('.hero__poster img, .phero__pic img'); const pr = poster.getBoundingClientRect();
      return { t, prices: (t.match(/£\d+\.\d\d/g) || []).length, bases: vis('.base'), sauces: vis('.sauce'), toppings: vis('.topping[data-topping]'), menu: vis('.mi'), fields: vis('#bform input'),
        poster: pr.width > 100 && getComputedStyle(poster).opacity !== '0' && poster.complete && poster.naturalWidth > 0, note: /Nothing here places a real order or booking/.test(t) }; });
    let good = r.poster && r.note, what = '';
    if (name === 'home') { good = good && /What are\s+you making/.test(r.t) && r.bases === 6 && r.sauces === 12 && r.toppings === 19 && r.prices >= 40; what = r.bases + ' bases, ' + r.sauces + ' sauces, ' + r.toppings + ' toppings'; }
    if (name === 'menu') { good = good && r.menu >= 80 && r.prices >= 90; what = r.menu + ' menu rows'; }
    if (name === 'birthdays') { good = good && r.fields >= 8; what = r.fields + ' booking fields'; }
    if (name === 'find-us') { good = good && /3 Bridge Road/.test(r.t) && /51 King St/.test(r.t) && /Hours to confirm/.test(r.t) && /£4\.99/.test(r.t); what = 'both shops, their hours and the frozen yoghurt prices'; }
    if (!good) ok = false; rows.push('no JS ' + name + ': ' + what + ', ' + r.prices + ' prices as text, the opening picture ' + (r.poster ? 'shown' : 'MISSING') + (good ? '' : ' FAIL'));
    await close(p);
  }
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

// ---------- 11. the order and the booking, end to end as a mock, across the pages ----------
async function flows(plant) {
  const rows = []; let ok = true;
  const fill = `async (shop) => { const wait = (ms) => new Promise(r => setTimeout(r, ms)); const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); };
    if (shop) document.querySelector('input[name="order-shop"][value="' + shop + '"]').click(); document.querySelector('input[name="order-mode"][value="collect"]').click(); await wait(50);
    const slot = document.querySelector('#slots .slot'); if (slot) slot.click(); set('order-name', 'Sam'); set('order-phone', '07700 900123');
    document.getElementById('place-order').click(); await wait(400);
    return { placed: !!window.CharlieOrder.get().placed && document.getElementById('gt-stamp').classList.contains('is-on') && /stamped/i.test(document.getElementById('order-done').textContent) && document.querySelector('.drawer__sheet').dataset.view === 'ticket',
      meta: document.getElementById('gt-meta').textContent.replace(/\\s+/g, ' ').trim() }; }`;
  for (const [w, h, mob] of SIZES) {
    const p = await page(w, h, mob, { plant, reduced: true, wait: 700 });
    // an order on Home, from the bar, ends on the golden ticket in the drawer
    await p.click('#orderbar [data-action="order"]'); await p.waitForTimeout(300);
    const home = await p.evaluate(`(${fill})('brighouse')`);
    // on Find us a shop's own Order opens the drawer with that shop already picked
    await go(p, 'find-us/');
    await p.click('#huddersfield [data-action="order"]'); await p.waitForTimeout(300);
    const shopPicked = await p.evaluate(() => document.querySelector('input[name="order-shop"][value="huddersfield"]').checked);
    const find = await p.evaluate(`(${fill})(null)`);
    // its Book carries the shop to the birthdays page
    await p.evaluate(() => window.CharlieChrome.closeDrawer()); await p.waitForTimeout(400);
    await Promise.all([p.waitForNavigation({ waitUntil: 'load' }), p.click('#brighouse a[data-book-shop]')]); await ready(p, 'birthdays/'); await p.waitForTimeout(600); if (plant) await p.evaluate(plant);
    const carried = await p.evaluate(() => document.querySelector('input[name="party-shop"][value="brighouse"]').checked);
    // a booking on Birthdays ends on the table ticket, and it's still there after another page
    const b = await p.evaluate(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms)), set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); };
      document.getElementById('party-plus').click(); document.querySelector('input[name="party-shop"][value="huddersfield"]').click(); document.querySelector('input[name="party-occasion"][value="Birthday"]').click();
      document.querySelectorAll('#days .day')[2].click(); await wait(50); const ps = document.querySelector('#pslots .slot'); if (ps) ps.click();
      set('party-name', 'Sam'); set('party-phone', '07700 900123'); document.getElementById('place-booking').click(); await wait(400);
      const tt = document.getElementById('tticket');
      return { booked: !tt.hidden && /Table for 7/.test(tt.textContent) && /Huddersfield/.test(tt.textContent) && /confirmed/i.test(document.getElementById('booking-done').textContent), chairs: document.querySelectorAll('#table-svg .chairs .chair').length, ticket: tt.textContent.replace(/\s+/g, ' ').trim().slice(0, 110) };
    });
    await go(p, 'menu/'); await go(p, 'birthdays/');
    const kept = await p.evaluate(() => { const tt = document.getElementById('tticket'); return !tt.hidden && /Table for 7/.test(tt.textContent) && document.getElementById('party-big').textContent === '7'; });
    await close(p);
    // with motion on, every chair has to end up round the table, not under it, on Birthdays and on Home's teaser
    const q = await page(w, h, mob, { plant, wait: 2400, path: 'birthdays/' });
    const seat = await q.evaluate(async () => {
      document.documentElement.classList.add('cv-all');
      document.getElementById('party-plus').click(); await new Promise(r => setTimeout(r, 1400));
      const top = document.querySelector('#table-svg circle').getBoundingClientRect(), cx = top.left + top.width / 2, cy = top.top + top.height / 2, R = top.width / 2;
      const ch = [...document.querySelectorAll('#table-svg .chairs .chair')];
      return { n: ch.length, seated: ch.filter(c => { const b = c.getBoundingClientRect(); return Math.hypot(b.left + b.width / 2 - cx, b.top + b.height / 2 - cy) > R * 1.15; }).length };
    });
    await go(q, '');
    const tease = await q.evaluate(async (JUMP) => { document.documentElement.classList.add('cv-all'); const s = document.getElementById('tease-svg'), y = s.getBoundingClientRect().top + scrollY; // an svg has no offsetTop
      eval(JUMP)(y - innerHeight / 3); await new Promise(r => setTimeout(r, 1500));
      const top = s.querySelector('circle').getBoundingClientRect(), cx = top.left + top.width / 2, cy = top.top + top.height / 2, R = top.width / 2;
      const ch = [...s.querySelectorAll('.chairs .chair')]; return { n: ch.length, seated: ch.filter(c => { const b = c.getBoundingClientRect(); return Math.hypot(b.left + b.width / 2 - cx, b.top + b.height / 2 - cy) > R * 1.15; }).length }; }, JUMP);
    await close(q);
    const good = home.placed && /Brighouse/.test(home.meta) && shopPicked && find.placed && /Huddersfield/.test(find.meta) && carried && b.booked && b.chairs === 7 && kept && seat.n === 7 && seat.seated === 7 && tease.n === 6 && tease.seated === 6;
    if (!good) ok = false;
    rows.push(w + ': Home order ' + (home.placed ? 'stamped' : 'NOT PLACED') + ' (' + home.meta + '), Find us Order ' + (shopPicked ? 'opens on its shop' : 'LOST ITS SHOP') + ' and ' + (find.placed ? 'stamps' : 'NOT PLACED') + ', its Book ' + (carried ? 'carries the shop' : 'LOSES THE SHOP') +
      ', booking ' + (b.booked ? 'confirmed' : 'NOT CONFIRMED') + ' with ' + b.chairs + ' chairs and ' + (kept ? 'kept after another page' : 'LOST after another page') + ', with motion ' + seat.seated + ' of ' + seat.n + ' chairs round the table and the teaser ' + tease.seated + ' of ' + tease.n + ', "' + b.ticket + '"');
  }
  return { ok, detail: rows.join('; ') };
}

// ---------- 12. one order across pages, and a page that still works when storage is blocked or tampered with ----------
async function kept(init) {
  const probs = [], rows = [];
  // made on Home, an item on /menu/, then back on Home: the same creation, the same total, everywhere
  const p = await page(390, 844, true, { reduced: true, wait: 500, init });
  await p.evaluate(() => { document.getElementById('make').scrollIntoView(); document.querySelector('.minibase[data-base="cookie_dough"]').click(); document.querySelector('.sauce[data-sauce="Biscoff"]').click(); document.querySelector('.topping[data-topping="Gum Balls"]').click(); document.querySelector('[data-extra="whippy"]').click(); });
  await p.waitForTimeout(200);
  const want = pen(MENU.bases.cookie_dough.price) + pen(MENU.rules.sauce_each) + pen(MENU.toppings.find(t => t[0] === 'Gum Balls')[1]) + pen(MENU.rules.scoop_on_crepe_waffle_or_cookie_dough.whippy);
  const tea = MENU.named_items['Hot Drinks'].find(i => i.name === 'Tea');
  await go(p, 'menu/');
  const m = await p.evaluate(() => ({ header: document.querySelector('[data-live="total"]').textContent, bar: document.getElementById('bar-name').textContent }));
  await p.evaluate(() => { document.documentElement.classList.add('cv-all'); document.querySelector('.mi__b[data-name="Tea"]').click(); });
  await go(p, '');
  const back = await p.evaluate(() => ({ total: window.CharlieOrder.get().total, base: window.CharlieOrder.get().base, pressed: [...document.querySelectorAll('[aria-pressed="true"]')].map(b => b.dataset.sauce || b.dataset.topping || b.dataset.extra || b.dataset.base).filter(Boolean), step: document.getElementById('step-total').textContent }));
  const keptOk = m.header === '£' + (want / 100).toFixed(2) && /cookie dough/i.test(m.bar) && back.total === want + pen(tea.price) && back.base === 'cookie_dough' && ['Biscoff', 'Gum Balls', 'whippy'].every(x => back.pressed.includes(x));
  if (!keptOk) probs.push('the order was not kept: menu page ' + m.header + ' "' + m.bar + '", back on Home ' + back.step + ' ' + back.base + ' ' + back.pressed.join('+'));
  rows.push('Home to /menu/ and back ' + (keptOk ? 'kept, ' + m.header + ' then ' + back.step + ' with the tea' : 'NOT KEPT'));
  if (p.errs.length) probs.push(p.errs.join(' | '));
  await close(p);
  // a stored order that's been tampered with comes back at the menu's own prices, with anything unknown dropped
  const tamper = () => { try { sessionStorage.setItem('charlies-order-1', JSON.stringify({ base: 'shake', sauces: ['Biscoff', 'Gold leaf'], toppings: ['Sprinkles', 'Diamonds'], extras: ['vanilla'], qty: 999, items: [{ key: 'hot-drinks:tea', name: 'Free tea', pence: 1, qty: 2 }, { key: 'made:up', name: 'Nothing', pence: 1, qty: 1 }], creation: true, preset: 'nope' })); } catch (e) {} };
  const t = await page(1440, 900, false, { reduced: true, wait: 500, init: tamper });
  const tv = await t.evaluate(() => ({ total: window.CharlieOrder.get().total, items: window.CharlieOrder.get().items.map(i => i.name + ' ' + i.pence + 'x' + i.qty).join(', '), qty: window.CharlieOrder.get().qty }));
  const tWant = (pen(MENU.bases.shake.create_your_own_from) + pen(MENU.rules.sauce_each) + pen(MENU.toppings.find(x => x[0] === 'Sprinkles')[1])) * 20 + pen(tea.price) * 2;
  const tOk = tv.total === tWant && tv.qty === 20 && /^Tea 190x2$/.test(tv.items);
  if (!tOk) probs.push('a tampered order came back as ' + tv.total + ' (' + tv.items + ', x' + tv.qty + '), not ' + tWant);
  rows.push('a tampered order ' + (tOk ? 'came back at menu prices, unknown parts dropped, at most 20' : 'WAS TRUSTED'));
  if (t.errs.length) probs.push(t.errs.join(' | '));
  await close(t);
  // with storage blocked, every page still opens and takes an order, it just starts fresh
  const block = () => { Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('blocked'); } }); };
  for (const [name, at] of PAGES) {
    const b = await page(390, 844, true, { reduced: true, wait: 400, init: block, path: at });
    const ok = await b.evaluate(async () => { document.querySelector('#orderbar [data-action="order"]').click(); await new Promise(r => setTimeout(r, 300)); return !document.getElementById('drawer').hidden && /£\d/.test(document.getElementById('cart-total').textContent); });
    if (!ok || b.errs.length) probs.push('with storage blocked ' + name + ' ' + (ok ? '' : 'did not open the drawer ') + b.errs.join(' | '));
    await close(b);
  }
  rows.push('with storage blocked all 4 pages open and take an order');
  return { ok: probs.length === 0, detail: probs.length ? probs.join('; ') : rows.join(', ') };
}

// ---------- the plants ----------
const PLANTS = {
  walk: () => { const s = document.createElement('style'); s.textContent = '.orderbar{display:none!important}main [data-action="order"],#order-final,#place-order{visibility:hidden!important}'; document.head.appendChild(s); },
  hero: () => { const s = document.createElement('style'); s.textContent = '#hero-gl,.hero__poster,.hd__logo img,.hero__logo-top,.awning__sign,.base img,.phero__pic img{opacity:0!important}.hero{opacity:1!important}'; document.head.appendChild(s); },
  look: () => { const d = document.createElement('div'); d.innerHTML = '<p style="text-transform:uppercase;font-size:11px">Our story</p><h2>A kicker</h2><p style="text-transform:uppercase;font-size:11px">Menu</p><h2>Two kickers</h2><p style="text-transform:uppercase;font-size:11px">Visit</p><h2>Plant <em>heading</em></h2><button style="border-radius:999px;padding:12px 32px">Order now →</button><div style="border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.2);width:80px;height:40px;font-family:Poppins">card</div>'; document.querySelector('main > section').appendChild(d); },
  menu: () => { document.querySelectorAll('#mg-hot .mi')[1].remove(); },
  copy: () => { const d = document.createElement('p'); d.textContent = 'Our seamless journey — it is great: indulge! Go!'; document.querySelector('main > section').appendChild(d); },
  overflow: () => { const d = document.createElement('div'); d.style.cssText = 'width:2400px;height:8px;background:red'; document.querySelector('main').appendChild(d); },
  errors: () => { const i = new Image(); i.src = (window.CD_ROOT || '') + 'media/missing-plant.webp'; i.alt = 'plant'; document.querySelector('main > section').appendChild(i); },
  axe: () => { const d = document.createElement('div'); d.innerHTML = '<img src="' + (window.CD_ROOT || '') + 'media/logo.webp"><button></button>'; document.querySelector('main > section').appendChild(d); },
  still: () => { const s = document.createElement('style'); s.textContent = '.sauces{display:none!important}'; document.head.appendChild(s); },
  flows: () => { const st = document.createElement('style'); st.textContent = '.chairs > g { transform: none !important; }'; document.head.appendChild(st); const s = document.getElementById('slots'); new MutationObserver(() => { if (s.children.length) s.innerHTML = ''; }).observe(s, { childList: true }); s.innerHTML = ''; },
  // storage that silently forgets: the order no longer follows the visitor
  kept: () => { try { const S = window.sessionStorage; S.setItem = function () {}; } catch (e) {} }
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
  log('Charlie’s prototype, round 2 checks on 4 pages, ' + new Date().toISOString());
  for (const [name, at] of PAGES) for (const [w, h, mob] of SIZES) {
    await run('walk ' + name + ' ' + w, async () => { const p = await page(w, h, mob, { path: at }); const r = await walk(p, name); await close(p); return r; }, async () => { const p = await page(w, h, mob, { plant: PLANTS.walk, path: at }); const r = await walk(p, name); await close(p); return r; });
    const hw = name === 'home' ? 6500 : 2600;
    await run('hero ' + name + ' ' + w, async () => { const p = await page(w, h, mob, { wait: hw, path: at }); const r = await hero(p, name); await close(p); return r; }, async () => { const p = await page(w, h, mob, { wait: hw, plant: PLANTS.hero, path: at }); const r = await hero(p, name); await close(p); return r; });
    await run('look ' + name + ' ' + w, async () => { const p = await page(w, h, mob, { path: at }); const r = await look(p, name); await close(p); return r; }, async () => { const p = await page(w, h, mob, { plant: PLANTS.look, path: at }); const r = await look(p, name); await close(p); return r; });
  }
  await run('sums', async () => { const a = await sums(24, { mobile: true }); const m = await sums(4, { motion: true, seed: 7 }); return { ok: a.ok && m.ok, detail: '24 orders, instant\n    ' + a.detail + '\n    4 orders with the pour and the falling toppings\n    ' + m.detail }; },
    async () => sums(3, { route: SUMS_PLANT, seed: 99 }));
  await run('menu', async () => { const p = await page(1440, 900, false, { wait: 600, path: 'menu/' }), q = await page(1440, 900, false, { wait: 600 }); const r = await menu(p, q); await close(p); await close(q); return r; },
    async () => { const p = await page(1440, 900, false, { wait: 600, plant: PLANTS.menu, path: 'menu/' }), q = await page(1440, 900, false, { wait: 600 }); const r = await menu(p, q); await close(p); await close(q); return r; });
  await run('copy', () => copy(null), () => copy(PLANTS.copy));
  await run('overflow', () => overflow(null), () => overflow(PLANTS.overflow));
  await run('errors', () => errors(null), () => errors(PLANTS.errors));
  await run('axe', () => axe(null), () => axe(PLANTS.axe));
  await run('reduced motion and no JS', () => still(null), () => still(PLANTS.still));
  await run('order and booking', () => flows(null), () => flows(PLANTS.flows));
  await run('kept across pages', () => kept(null), () => kept(PLANTS.kept));
  log((results.every(r => r.ok) ? 'ALL PASS' : 'SOME FAIL') + ', ' + results.filter(r => r.ok).length + ' of ' + results.length);
  // a partial run (--only) keeps the full run's record intact
  fs.writeFileSync(path.join(__dirname, only.length ? 'last-partial-run.txt' : 'last-run.txt'), out.join('\n') + '\n');
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
