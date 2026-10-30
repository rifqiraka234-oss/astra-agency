/* The one order, written by every control and read by every display. Prices come only from Charlie's menu
   (window.CHARLIE_MENU, generated from menu.json). Money is kept in pence so no total drifts by a penny.
   order   = the creation (base, size, preset, sauces, toppings, extras, qty) plus menu items added beside it,
             then where it goes (shop, mode, time, name, phone)
   booking = a party table (shop, partySize, date, time, occasion, name, phone)
   Both are kept in sessionStorage, so the order and the booking follow the visitor from page to page. If storage is
   blocked the page still works, it just starts fresh on the next page. */
(function () {
  'use strict';
  var M = window.CHARLIE_MENU, ITEMS = window.CHARLIE_ITEMS || {};
  var R = window.CD_ROOT || ''; // the page's way back to the site's root, for the pictures
  var p = function (pounds) { return Math.round(pounds * 100); };

  // The six create your own bases. A base is plain at its menu price, everything added goes on top at list price.
  var BASES = {
    waffle:       { name: 'Waffle', pence: p(M.bases.crepe_or_waffle.create_your_own_from), from: true, extras: true, img: R + 'media/waffle.webp', rail: R + 'media/waffle-rail.webp', alt: 'Two of Charlie’s waffles with whippy swirls, foam sweets and blue drizzle', photo: true },
    crepe:        { name: 'Crepe', pence: p(M.bases.crepe_or_waffle.create_your_own_from), from: true, extras: true, img: R + 'media/crepe.svg', rail: R + 'media/crepe.svg', alt: 'A crepe folded in four on a lilac plate, drawn for this prototype', photo: false },
    shake:        { name: 'Shake', pence: p(M.bases.shake.create_your_own_from), from: true, extras: false, img: R + 'media/shake.webp', rail: R + 'media/shake-rail.webp', alt: 'A blue raspberry shake from Charlie’s, piled with foam sweets, with a rainbow lollipop', photo: true },
    cookie_dough: { name: 'Cookie dough', pence: p(M.bases.cookie_dough.price), from: false, extras: true, img: R + 'media/cookie-dough.webp', rail: R + 'media/cookie-dough-rail.webp', alt: 'Charlie’s cookie dough with white chocolate drizzle, raspberry pieces and a star biscuit', photo: true },
    sundae:       { name: 'Whippy sundae', pence: p(M.bases.whippy_sundae.price), from: false, extras: false, img: R + 'media/sundae.svg', rail: R + 'media/sundae.svg', alt: 'A plain whippy sundae, drawn for this prototype', photo: false },
    froyo:        { name: 'Frozen yoghurt', sizes: { small: p(M.bases.frozen_yoghurt.small), medium: p(M.bases.frozen_yoghurt.medium), large: p(M.bases.frozen_yoghurt.large) },
                    from: true, extras: false, toppingsIncluded: true, img: R + 'media/frozen-yoghurt.svg', rail: R + 'media/frozen-yoghurt.svg', alt: 'A frozen yoghurt in a striped cup, drawn for this prototype', photo: false }
  };
  BASES.froyo.pence = BASES.froyo.sizes.small;
  var BASE_ORDER = ['waffle', 'crepe', 'shake', 'cookie_dough', 'sundae', 'froyo'];
  var SIZE_NAMES = { small: 'Small', medium: 'Medium', large: 'Large' };

  var SAUCE_PENCE = p(M.rules.sauce_each);
  var SAUCES = M.sauces.slice();
  var TOPPINGS = M.toppings.map(function (t) { return { name: t[0], pence: p(t[1]) }; });
  var TOPPING_PENCE = {}; TOPPINGS.forEach(function (t) { TOPPING_PENCE[t.name] = t.pence; });
  var EXTRAS = {
    vanilla: { name: 'Vanilla scoop', pence: p(M.rules.scoop_on_crepe_waffle_or_cookie_dough.vanilla_scoop) },
    whippy:  { name: 'Whippy', pence: p(M.rules.scoop_on_crepe_waffle_or_cookie_dough.whippy) }
  };

  // Named favourites from the menu, each a base dressed with what the menu says is on it. It keeps its menu price.
  // What it comes with is free and taking something off never lowers the price. Anything added goes on top.
  function named(group, name) { var g = M.named_items[group] || []; for (var i = 0; i < g.length; i++) if (g[i].name === name) return g[i]; return null; }
  var PRESETS = {};
  function preset(id, group, name, base, sauces, toppings, extras, label) {
    var it = named(group, name); if (!it || it.price == null) return;
    PRESETS[id] = { id: id, group: group, name: name, label: label || name + ' ' + BASES[base].name.toLowerCase(), base: base, pence: p(it.price), desc: it.desc || '',
      sauces: sauces || [], toppings: toppings || [], extras: extras || [] };
  }
  // what goes on each, read from the menu's own description (sauces and toppings that exist on the builder)
  preset('creation_waffle', 'Crepe or Waffle', "Charlie's Creation", 'waffle', ['Bubblegum'], ['Marshmallows', 'Pick & Mix Cup'], ['whippy'], 'Charlie’s Creation waffle');
  preset('biscoff_waffle', 'Crepe or Waffle', 'Biscoff', 'waffle', ['Biscoff'], ['Biscoff Bits'], [], 'Biscoff waffle');
  preset('white_stars', 'Crepe or Waffle', 'White Stars', 'waffle', ['White choc'], ['Chocolate Stars'], [], 'White Stars waffle');
  preset('bueno_waffle', 'Crepe or Waffle', 'Bueno', 'waffle', ['Bueno'], [], [], 'Bueno waffle');
  preset('oreo_waffle', 'Crepe or Waffle', 'Oreo / Cookies n Cream', 'waffle', ['Milk choc', 'White choc'], ['Oreo Bits'], [], 'Oreo waffle');
  preset('nutella_waffle', 'Crepe or Waffle', 'Nutella & Nuts', 'waffle', [], ['Hazelnuts'], [], 'Nutella & Nuts waffle');
  preset('grimace', 'Shakes', 'Grimace', 'shake', [], ['Sprinkles'], [], 'Grimace shake');
  preset('creation_shake', 'Shakes', "Charlie's Creation", 'shake', [], [], [], 'Charlie’s Creation shake');
  preset('bubblegum_shake', 'Shakes', 'Bubblegum', 'shake', ['Bubblegum'], ['Sherbet', 'Gum Balls'], [], 'Bubblegum shake');
  preset('biscoff_shake', 'Shakes', 'Biscoff', 'shake', ['Biscoff'], ['Biscoff Bits'], [], 'Biscoff shake');
  preset('bueno_shake', 'Shakes', 'Bueno', 'shake', ['Bueno'], [], [], 'Bueno shake');
  preset('oreo_shake', 'Shakes', 'Oreo', 'shake', [], ['Oreo Bits'], [], 'Oreo shake');
  preset('mint_shake', 'Shakes', 'Mint Choc Aero', 'shake', ['Mint Chocolate'], [], [], 'Mint Choc Aero shake');
  preset('choc_shake', 'Shakes', 'Chocolate', 'shake', ['Milk choc'], [], [], 'Chocolate shake');
  preset('strawberry_shake', 'Shakes', 'Strawberry', 'shake', ['Strawberry'], [], [], 'Strawberry shake');
  preset('vanilla_shake', 'Shakes', 'Vanilla', 'shake', [], [], [], 'Vanilla shake');
  preset('choc_orange_shake', 'Shakes', 'Chocolate Orange', 'shake', [], ['Sherbet'], [], 'Chocolate Orange shake');
  preset('cd_chip', 'Cookie Dough', "Charlie's Chocolate Chip", 'cookie_dough', ['Milk choc'], [], [], 'Charlie’s Chocolate Chip cookie dough');
  preset('cd_pb', 'Cookie Dough', 'Peanut Butter', 'cookie_dough', ['Milk choc'], ['Peanut Butter'], [], 'Peanut Butter cookie dough');
  preset('cd_white_rasp', 'Cookie Dough', 'White Choc & Raspberry', 'cookie_dough', ['White choc'], ['Chocolate Curls', 'Raspberries'], [], 'White Choc & Raspberry cookie dough');
  preset('cd_biscoff', 'Cookie Dough', 'Biscoff', 'cookie_dough', ['Biscoff'], ['Biscoff Bits'], [], 'Biscoff cookie dough');
  preset('cd_bueno', 'Cookie Dough', 'Bueno', 'cookie_dough', ['Bueno'], [], [], 'Bueno cookie dough');
  preset('cd_oreo', 'Cookie Dough', 'Oreo', 'cookie_dough', ['Milk choc', 'White choc'], ['Oreo Bits'], [], 'Oreo cookie dough');
  preset('sundae_fruit', 'Whippy Ice Cream', 'Sherbet Fruit Sundae', 'sundae', ['Strawberry'], ['Mango', 'Strawberries', 'Sherbet'], [], 'Sherbet Fruit Sundae');
  preset('sundae_pnm', 'Whippy Ice Cream', "Sherbet Pick 'n' Mix Sundae", 'sundae', [], ['Sherbet', 'Pick & Mix Cup'], [], 'Sherbet Pick ’n’ Mix Sundae');
  preset('sundae_bubble', 'Whippy Ice Cream', 'Bubblegum Sundae', 'sundae', ['Bubblegum'], ['Gobstopper', 'Gum Balls'], [], 'Bubblegum Sundae');
  preset('sundae_fudge', 'Whippy Ice Cream', 'Fudgemallow Delight', 'sundae', [], ['Fudge Pieces', 'Marshmallows'], [], 'Fudgemallow Delight');

  var order = { shop: null, mode: null, base: 'waffle', size: 'small', preset: null, sauces: [], toppings: [], extras: [], qty: 1,
    creation: true, items: [], time: null, address: '', name: '', phone: '', total: 0, placed: null };
  var booking = { shop: null, partySize: 6, date: null, time: null, occasion: null, name: '', phone: '', placed: null };
  var subs = [], bsubs = [];

  function basePence(o) { var b = BASES[o.base]; return b.sizes ? b.sizes[o.size] : b.pence; }
  function toppingPence(o, name) { return BASES[o.base].toppingsIncluded ? 0 : TOPPING_PENCE[name]; }
  function presetOf(o) { var pr = o.preset && PRESETS[o.preset]; return pr && pr.base === o.base ? pr : null; }

  // the creation's lines, in the order they were added. A favourite is one line at its menu price, and only what
  // goes beyond what it comes with is added on top
  function creationLines(o) {
    var b = BASES[o.base], out = [], pr = presetOf(o);
    if (pr) out.push({ key: 'base', label: pr.label, pence: pr.pence, preset: true });
    else out.push({ key: 'base', label: b.sizes ? SIZE_NAMES[o.size] + ' ' + b.name.toLowerCase() : b.name, pence: basePence(o) });
    o.sauces.forEach(function (s) { var inc = pr && pr.sauces.indexOf(s) >= 0; out.push({ key: 'sauce:' + s, label: s, pence: inc ? 0 : SAUCE_PENCE, comes: !!inc }); });
    o.toppings.forEach(function (t) { var inc = pr && pr.toppings.indexOf(t) >= 0; out.push({ key: 'top:' + t, label: t, pence: inc ? 0 : toppingPence(o, t), included: !!b.toppingsIncluded, comes: !!inc }); });
    o.extras.forEach(function (e) { var inc = pr && pr.extras.indexOf(e) >= 0; out.push({ key: 'extra:' + e, label: EXTRAS[e].name, pence: inc ? 0 : EXTRAS[e].pence, comes: !!inc }); });
    return out;
  }
  var lines = creationLines;
  function eachPence(o) { return creationLines(o).reduce(function (a, l) { return a + l.pence; }, 0); }
  function itemsPence(o) { return o.items.reduce(function (a, it) { return a + it.pence * it.qty; }, 0); }
  function totalPence(o) { return (o.creation ? eachPence(o) * o.qty : 0) + itemsPence(o); }

  function nameOf(o) {
    var pr = presetOf(o);
    if (!o.creation) return o.items.length ? (o.items.length === 1 && o.items[0].qty === 1 ? o.items[0].name : o.items.reduce(function (a, i) { return a + i.qty; }, 0) + ' things from the menu') : 'Nothing yet';
    if (pr) return pr.label;
    var b = BASES[o.base].name, low = b.toLowerCase();
    if (o.sauces.length === 1) return o.sauces[0] + ' ' + low;
    if (o.sauces.length > 1) return o.sauces[0] + ' and ' + o.sauces[1] + ' ' + low;
    if (o.toppings.length) return low.replace(/^./, function (c) { return c.toUpperCase(); }) + ' with ' + o.toppings[0].toLowerCase();
    return 'Your ' + low;
  }
  // the bar's line: the creation plus how many other things are on the order
  function barName(o) {
    var n = o.items.reduce(function (a, i) { return a + i.qty; }, 0), main = nameOf(o);
    if (o.creation && n) return main + ' and ' + n + ' more';
    return main;
  }

  function money(pence) { return '£' + (pence / 100).toFixed(2); }

  // ---------- kept from page to page ----------
  var KEY = 'charlies-order-1', BKEY = 'charlies-booking-1';
  function save() {
    try {
      var o = {}; ['shop', 'mode', 'base', 'size', 'preset', 'sauces', 'toppings', 'extras', 'qty', 'creation', 'items', 'time', 'address', 'name', 'phone'].forEach(function (k) { o[k] = order[k]; });
      sessionStorage.setItem(KEY, JSON.stringify(o)); sessionStorage.setItem(BKEY, JSON.stringify(booking));
    } catch (e) { /* storage blocked, the page carries on */ }
  }
  var str = function (v, n) { return typeof v === 'string' ? v.slice(0, n || 120) : ''; };
  var list = function (v, ok) { var out = []; (Array.isArray(v) ? v : []).forEach(function (x) { if (ok(x) && out.indexOf(x) < 0) out.push(x); }); return out; };
  // anything read back is checked against the menu, so a stored order can only ever hold the menu's own prices
  function restore() {
    var o = null, b = null;
    try { o = JSON.parse(sessionStorage.getItem(KEY) || 'null'); b = JSON.parse(sessionStorage.getItem(BKEY) || 'null'); } catch (e) { return; }
    if (o && typeof o === 'object') {
      if (BASES[o.base]) order.base = o.base;
      if (SIZE_NAMES[o.size]) order.size = o.size;
      order.sauces = list(o.sauces, function (x) { return SAUCES.indexOf(x) >= 0; });
      order.toppings = list(o.toppings, function (x) { return TOPPING_PENCE[x] != null; });
      order.extras = BASES[order.base].extras ? list(o.extras, function (x) { return !!EXTRAS[x]; }).slice(0, 1) : [];
      order.preset = o.preset && PRESETS[o.preset] && PRESETS[o.preset].base === order.base ? o.preset : null;
      order.qty = Math.max(1, Math.min(20, o.qty | 0 || 1));
      order.items = (Array.isArray(o.items) ? o.items : []).filter(function (i) { return i && ITEMS[i.key]; })
        .map(function (i) { return { key: i.key, name: ITEMS[i.key].name, pence: ITEMS[i.key].pence, qty: Math.max(1, Math.min(20, i.qty | 0 || 1)) }; });
      order.creation = o.creation !== false || !order.items.length;
      order.shop = o.shop === 'brighouse' || o.shop === 'huddersfield' ? o.shop : null;
      order.mode = o.mode === 'collect' || o.mode === 'delivery' ? o.mode : null;
      order.time = str(o.time, 40) || null; order.address = str(o.address); order.name = str(o.name); order.phone = str(o.phone, 40);
    }
    if (b && typeof b === 'object') {
      booking.shop = b.shop === 'brighouse' || b.shop === 'huddersfield' ? b.shop : null;
      booking.partySize = Math.max(1, Math.min(10, b.partySize | 0 || 6));
      booking.date = str(b.date, 60) || null; booking.time = str(b.time, 20) || null;
      booking.occasion = ['Birthday', 'Celebration', 'Date night'].indexOf(b.occasion) >= 0 ? b.occasion : null;
      booking.name = str(b.name); booking.phone = str(b.phone, 40);
      booking.placed = b.placed && typeof b.placed === 'object' ? { at: +b.placed.at || 0 } : null;
    }
  }

  function set(patch, why) {
    for (var k in patch) order[k] = patch[k];
    if (!BASES[order.base].extras) order.extras = order.extras.filter(function () { return false; });
    if (order.preset && !presetOf(order)) order.preset = null;
    order.qty = Math.max(1, Math.min(20, order.qty | 0));
    if (!order.creation && !order.items.length) order.creation = true;
    order.total = totalPence(order);
    save();
    subs.forEach(function (fn) { fn(order, why || {}); });
  }
  function toggle(listName, value) {
    var list = order[listName].slice(), i = list.indexOf(value);
    if (i >= 0) list.splice(i, 1); else list.push(value);
    var patch = { creation: true }; patch[listName] = list;
    set(patch, { list: listName, value: value, added: i < 0 });
    return i < 0;
  }
  // a favourite lands dressed: its base, what it comes with, and the menu price
  function usePreset(id) {
    var pr = PRESETS[id]; if (!pr) return;
    set({ base: pr.base, preset: id, sauces: pr.sauces.slice(), toppings: pr.toppings.slice(), extras: pr.extras.slice(), creation: true, size: 'small' }, { preset: id });
  }
  // menu items that aren't built, added beside the creation, always at the menu's own price for that item
  function addItem(key, name, pence) {
    if (ITEMS[key]) { name = ITEMS[key].name; pence = ITEMS[key].pence; }
    var items = order.items.map(function (i) { return Object.assign({}, i); }), f = null;
    items.forEach(function (i) { if (i.key === key) f = i; });
    if (f) f.qty = Math.min(20, f.qty + 1); else items.push({ key: key, name: name, pence: pence, qty: 1 });
    set({ items: items }, { item: key });
  }
  function changeItem(key, d) {
    var items = order.items.map(function (i) { return Object.assign({}, i); }).filter(function (i) { if (i.key === key) i.qty += d; return i.qty > 0; });
    set({ items: items }, { item: key });
  }

  function setBooking(patch) {
    for (var k in patch) booking[k] = patch[k];
    booking.partySize = Math.max(1, Math.min(10, booking.partySize | 0));
    save();
    bsubs.forEach(function (fn) { fn(booking); });
  }

  restore();
  order.total = totalPence(order);
  window.CharlieOrder = {
    BASES: BASES, BASE_ORDER: BASE_ORDER, SAUCES: SAUCES, SAUCE_PENCE: SAUCE_PENCE, TOPPINGS: TOPPINGS, TOPPING_PENCE: TOPPING_PENCE, EXTRAS: EXTRAS, SIZE_NAMES: SIZE_NAMES, PRESETS: PRESETS,
    get: function () { return order; }, ITEMS: ITEMS,
    set: set, toggle: toggle, usePreset: usePreset, addItem: addItem, changeItem: changeItem, presetOf: presetOf,
    lines: lines, creationLines: creationLines, total: totalPence, each: eachPence, itemsPence: itemsPence, nameOf: nameOf, barName: barName, money: money, basePence: basePence,
    subscribe: function (fn) { subs.push(fn); },
    booking: function () { return booking; }, setBooking: setBooking, subscribeBooking: function (fn) { bsubs.push(fn); },
    ESTIMATE: 'Estimated from Charlie’s menu, final price at the counter'
  };
})();
