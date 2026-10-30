/* The order, inside the drawer every page shares. It arrives filled in with the whole order from the one order object:
   the creation and anything from the menu, each with how many. Pick the shop, collect or delivery, a time inside opening
   hours in UK time, a name and a phone, and the golden ticket prints with the creation drawn small on it, then stamps.
   Nothing is sent anywhere. Exposes window.CharlieCheckout. */
(function () {
  'use strict';
  var O = window.CharlieOrder, R = window.CD_ROOT || '';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SHOPS = { brighouse: { name: 'Brighouse', addr: '3 Bridge Road', open: 12, close: 22, known: true }, huddersfield: { name: 'Huddersfield', addr: '51 King St', open: 12, close: 22, known: false } };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

  // ---------- times, in UK time, inside opening hours ----------
  var UKF = null;
  function ukNow() {
    UKF = UKF || new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
    var f = UKF.formatToParts(new Date()), h = 0, m = 0;
    f.forEach(function (p) { if (p.type === 'hour') h = +p.value; if (p.type === 'minute') m = +p.value; });
    return h * 60 + m;
  }
  function label(mins) {
    var h = Math.floor(mins / 60), m = mins % 60, ap = h >= 12 ? 'pm' : 'am', hh = h % 12 || 12;
    return hh + (m ? '.' + (m < 10 ? '0' : '') + m : '') + ap;
  }
  // example slots every quarter hour from a little after now, up to a quarter before closing
  function slotsFor(shopKey, mode) {
    var s = SHOPS[shopKey || 'brighouse'], now = ukNow(), lead = mode === 'delivery' ? 45 : 20, first = Math.ceil((now + lead) / 15) * 15;
    var start = Math.max(s.open * 60, first), end = s.close * 60 - 15, out = [], day = 'Today';
    if (start > end) { start = s.open * 60; day = 'Tomorrow'; }
    for (var t = start; t <= end && out.length < 12; t += 15) out.push({ v: day + ' ' + label(t), day: day, t: label(t) });
    return out;
  }

  function radios(name, value) { $$('input[name="' + name + '"]').forEach(function (i) { i.checked = i.value === value; }); }

  function renderSlots() {
    var o = O.get(), host = $('#slots'), list = slotsFor(o.shop, o.mode), html = '';
    if (o.time && !list.some(function (s) { return s.v === o.time; })) O.set({ time: null });
    list.forEach(function (s) { html += '<button type="button" class="slot" role="radio" aria-checked="' + (s.v === O.get().time) + '" data-time="' + s.v + '">' + s.t + '</button>'; });
    host.innerHTML = html;
    var when = list.length && list[0].day === 'Tomorrow' ? 'tomorrow' : 'today';
    var note = o.shop === 'huddersfield' ? 'Example times for ' + when + ', as Huddersfield’s opening hours are still to confirm with the shop' : (o.mode === 'delivery' ? 'Example delivery times for ' : 'Example collection times for ') + when + ', inside opening hours';
    $('#slot-note').textContent = note;
  }
  // the form shows what the order already knows, so a visitor coming back from another page finds it filled in
  function fillForm() {
    var o = O.get();
    radios('order-shop', o.shop); radios('order-mode', o.mode);
    var d = o.mode === 'delivery'; $('#delivery-note').hidden = !d; $('#addr-field').hidden = !d;
    if ($('#order-name').value !== o.name) $('#order-name').value = o.name;
    if ($('#order-phone').value !== o.phone) $('#order-phone').value = o.phone;
    if ($('#order-address').value !== o.address) $('#order-address').value = o.address;
    renderSlots();
  }

  // ---------- the cart, each line with how many ----------
  var minus = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var plus = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M7 2v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function stepper(key, n, name) {
    return '<span class="qty qty--s" role="group" aria-label="How many ' + esc(name) + '"><button type="button" class="qty__b" data-step="' + esc(key) + '" data-d="-1" aria-label="One fewer ' + esc(name) + '">' + minus + '</button>' +
      '<output class="qty__n">' + n + '</output><button type="button" class="qty__b" data-step="' + esc(key) + '" data-d="1" aria-label="One more ' + esc(name) + '">' + plus + '</button></span>';
  }
  function renderCart() {
    var o = O.get(), html = '';
    if (o.creation) {
      var parts = O.creationLines(o).slice(1).map(function (l) { return l.label; }), name = O.nameOf(o);
      html += '<li class="cart__i cart__i--make"><span class="cart__name">' + esc(name) + '</span>' + (parts.length ? '<span class="cart__parts">' + esc(parts.join(', ')) + '</span>' : '') +
        '<span class="cart__price price">' + O.money(O.each(o) * o.qty) + '</span>' + stepper('creation', o.qty, name) + '</li>';
    }
    o.items.forEach(function (it) {
      html += '<li class="cart__i"><span class="cart__name">' + esc(it.name) + '</span><span class="cart__price price">' + O.money(it.pence * it.qty) + '</span>' + stepper(it.key, it.qty, it.name) + '</li>';
    });
    $('#cart').innerHTML = html;
    $('#cart-total').textContent = O.money(o.total);
  }
  function step(key, d) {
    var o = O.get();
    if (key !== 'creation') { O.changeItem(key, d); return; }
    // one fewer of the creation at one takes it off, as long as something from the menu is still on the order
    if (d < 0 && o.qty === 1) { if (o.items.length) O.set({ creation: false }); return; }
    O.set({ qty: o.qty + d });
  }

  // ---------- the golden ticket ----------
  var ticketNo = 427;
  function renderTicket() {
    var o = O.get(), html = '';
    if (o.creation) {
      O.creationLines(o).forEach(function (l) { html += '<li><span>' + esc(l.label) + '</span><span>' + (l.included ? 'incl' : l.comes ? 'with it' : O.money(l.pence)) + '</span></li>'; });
      if (o.qty > 1) html += '<li><span>Times ' + o.qty + '</span><span></span></li>';
    }
    o.items.forEach(function (it) { html += '<li><span>' + esc(it.name) + (it.qty > 1 ? ' x' + it.qty : '') + '</span><span>' + O.money(it.pence * it.qty) + '</span></li>'; });
    $('#gt-lines').innerHTML = html;
    var meta = [];
    meta.push(o.shop ? 'Charlie’s ' + SHOPS[o.shop].name : 'Shop not picked yet');
    meta.push(o.mode ? (o.mode === 'collect' ? 'Collect' : 'Delivery') + (o.time ? ', ' + o.time : '') : 'Collect or delivery to pick');
    if (o.name) meta.push('For ' + o.name);
    $('#gt-meta').innerHTML = meta.map(function (m) { return '<div>' + esc(m) + '</div>'; }).join('');
    $('#gt-total').textContent = O.money(o.total);
    $('#gticket').dataset.total = o.total;
    $('#gt-no').textContent = 'No. ' + ('000' + ticketNo).slice(-4);
  }

  // The creation drawn small on the ticket. On Home it's drawn from the builder's own stage, and that drawing is kept
  // for the other pages. Elsewhere, if the creation has changed since, the base is drawn with its sauces over it.
  var ART = 'charlies-art-1';
  // the sauces' own colours, the same as js/pour.js
  var HEX = { 'Milk choc': '#4b2714', 'White choc': '#f6eedd', 'Bueno': '#b58457', 'Biscoff': '#a35b22', 'Caramel': '#c9741a', 'Strawberry': '#d0213d',
    'Raspberry': '#a8103f', 'Blue Raspberry': '#1767e6', 'Bubblegum': '#ff6fb3', 'Pistachio': '#97b45c', 'Mint Chocolate': '#4fae83', 'Orange': '#ef861b' };
  function sig(o) { return [o.base, o.size, o.preset, o.sauces.join('+'), o.toppings.join('+'), o.extras.join('+')].join('|'); }
  function keepArt() {
    var B = window.CharlieBuilder; if (!B || !B.geo || !B.geo()) return;
    try { var c = document.createElement('canvas'); c.width = 320; c.height = 220; B.snapshot(c); sessionStorage.setItem(ART, JSON.stringify({ sig: sig(O.get()), url: c.toDataURL('image/png') })); } catch (e) { /* the art is a nicety */ }
  }
  function drawArt() {
    var cv = $('#gt-art'), o = O.get(), B = window.CharlieBuilder;
    if (B && B.geo && B.geo()) { B.snapshot(cv); keepArt(); return; }
    var kept = null; try { kept = JSON.parse(sessionStorage.getItem(ART) || 'null'); } catch (e) { kept = null; }
    var g = cv.getContext('2d'), W = cv.width, H = cv.height, img = new Image();
    if (kept && kept.sig === sig(o)) { img.onload = function () { g.clearRect(0, 0, W, H); g.drawImage(img, 0, 0, W, H); }; img.src = kept.url; return; }
    img.onload = function () {
      g.clearRect(0, 0, W, H);
      var k = Math.min(W * 0.84 / img.naturalWidth, H * 0.84 / img.naturalHeight), w = img.naturalWidth * k, h = img.naturalHeight * k, x = (W - w) / 2, y = (H - h) / 2;
      g.drawImage(img, x, y, w, h);
      // each sauce as a ribbon across the top of the dessert, in its own colour
      o.sauces.forEach(function (s, i) {
        var hex = HEX[s] || '#5F3F90'; g.strokeStyle = hex; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
        for (var t = 0; t <= 1.0001; t += 0.05) { var px = x + w * (0.1 + 0.8 * t), py = y + h * (0.22 + i * 0.07) + Math.sin(t * Math.PI * 4 + i) * h * 0.04; if (t === 0) g.moveTo(px, py); else g.lineTo(px, py); }
        g.stroke();
      });
    };
    img.src = O.BASES[o.base].img;
  }

  // real foil: the light moves across it as the phone tilts or the cursor moves
  function foil() {
    var t = $('#gticket'), col = $('#drawer-ticket');
    function set(nx, ny) { t.style.setProperty('--ry', (nx * 14).toFixed(2) + 'deg'); t.style.setProperty('--rx', (-ny * 10).toFixed(2) + 'deg'); t.style.setProperty('--gx', (50 + nx * 45).toFixed(1) + '%'); t.style.setProperty('--gy', (40 + ny * 40).toFixed(1) + '%'); }
    if (reduced) return;
    col.addEventListener('pointermove', function (e) { var r = t.getBoundingClientRect(); set(Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1)), Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1))); });
    col.addEventListener('pointerleave', function () { set(0, 0); });
    window.addEventListener('deviceorientation', function (e) { if (e.gamma == null) return; set(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 40) / 30))); });
  }

  function validate() {
    var o = O.get(), miss = [];
    if (!o.shop) miss.push('the shop');
    if (!o.mode) miss.push('collect or delivery');
    if (o.mode === 'delivery' && !o.address.trim()) miss.push('the delivery address');
    if (!o.time) miss.push('a time');
    if (!o.name.trim()) miss.push('your name');
    if (!/\d{6,}/.test(o.phone.replace(/\D/g, ''))) miss.push('a phone number');
    return miss;
  }
  function view(v) { $('.drawer__sheet').dataset.view = v; }
  function place(e) {
    e.preventDefault();
    var miss = validate(), err = $('#oform-err');
    if (miss.length) { err.textContent = 'Nearly there, just add ' + miss.join(', ').replace(/, ([^,]*)$/, ' and $1') + '.'; return; }
    err.textContent = '';
    ticketNo += 1; renderTicket(); drawArt();
    // the drawer ends on the golden ticket: it prints, then stamps
    view('ticket'); var sheet = $('.drawer__sheet'); sheet.scrollTop = 0;
    var t = $('#gticket'), st = $('#gt-stamp');
    st.classList.remove('is-on'); t.classList.remove('is-printing'); void t.offsetWidth;
    t.classList.add('is-printing'); t.dataset.state = 'placed';
    setTimeout(function () { st.classList.add('is-on'); }, reduced ? 0 : 1050);
    var o = O.get();
    O.set({ placed: { no: ticketNo, total: o.total, at: Date.now() } });
    var done = $('#order-done');
    done.textContent = 'It’s stamped. On the live site this goes straight to Charlie’s ' + SHOPS[o.shop].name + ', and this prototype hasn’t sent it anywhere.';
    setTimeout(function () { done.focus({ preventScroll: true }); }, reduced ? 0 : 1200);
  }

  // the drawer is opening: everything in it is read from the order as it stands now
  function opening() { view('form'); fillForm(); renderCart(); renderTicket(); var t = $('#gticket'); t.classList.remove('is-printing'); t.dataset.state = 'draft'; $('#gt-stamp').classList.remove('is-on'); $('#order-done').textContent = ''; $('#oform-err').textContent = ''; drawArt(); }
  function closed() { }

  function init() {
    if (!$('#oform')) return;
    $$('input[name="order-shop"]').forEach(function (i) { i.addEventListener('change', function () { O.set({ shop: i.value }); renderSlots(); }); });
    $$('input[name="order-mode"]').forEach(function (i) {
      i.addEventListener('change', function () { O.set({ mode: i.value }); var d = i.value === 'delivery'; $('#delivery-note').hidden = !d; $('#addr-field').hidden = !d; renderSlots(); });
    });
    $('#slots').addEventListener('click', function (e) { var b = e.target.closest('.slot'); if (!b) return; O.set({ time: b.dataset.time }); renderSlots(); });
    $('#order-name').addEventListener('input', function (e) { O.set({ name: e.target.value }); });
    $('#order-phone').addEventListener('input', function (e) { O.set({ phone: e.target.value }); });
    $('#order-address').addEventListener('input', function (e) { O.set({ address: e.target.value }); });
    $('#cart').addEventListener('click', function (e) { var b = e.target.closest('[data-step]'); if (b) step(b.dataset.step, +b.dataset.d); });
    // Change what's on it: on Home the drawer closes onto the builder
    $('#cart-change').addEventListener('click', function (e) { var t = document.getElementById('make'); if (!t) return; e.preventDefault(); window.CharlieChrome.closeDrawer(); setTimeout(function () { window.CharlieChrome.go(t); }, 200); });
    $('#oform').addEventListener('submit', place);
    O.subscribe(function () { if (!$('#drawer').hidden) { renderCart(); renderTicket(); } });
    fillForm(); renderCart(); renderTicket(); foil();
    // leaving Home, the creation's drawing goes with the visitor
    if (window.CharlieBuilder) window.addEventListener('pagehide', keepArt);
  }

  window.CharlieCheckout = { init: init, opening: opening, closed: closed, slotsFor: slotsFor, SHOPS: SHOPS, label: label, ukNow: ukNow, keepArt: keepArt };
})();
