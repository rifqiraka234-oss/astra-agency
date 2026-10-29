/* The order. It arrives filled in with the whole creation from the one order object. Pick the shop, collect or
   delivery, a time inside opening hours in UK time, a name and a phone, and the golden ticket prints with the
   creation drawn small on it, then stamps. Nothing is sent anywhere. Exposes window.CharlieCheckout. */
(function () {
  'use strict';
  var O = window.CharlieOrder;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SHOPS = { brighouse: { name: 'Brighouse', addr: '3 Bridge Road', open: 12, close: 22, known: true }, huddersfield: { name: 'Huddersfield', addr: '51 King St', open: 12, close: 22, known: false } };

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

  // ---------- the golden ticket ----------
  var ticketNo = 427;
  function renderTicket() {
    var o = O.get(), html = '';
    if (o.creation) {
      O.creationLines(o).forEach(function (l) { html += '<li><span>' + l.label + '</span><span>' + (l.included ? 'incl' : l.comes ? 'with it' : O.money(l.pence)) + '</span></li>'; });
      if (o.qty > 1) html += '<li><span>Times ' + o.qty + '</span><span></span></li>';
    }
    o.items.forEach(function (it) { html += '<li><span>' + it.name + (it.qty > 1 ? ' x' + it.qty : '') + '</span><span>' + O.money(it.pence * it.qty) + '</span></li>'; });
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
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function drawArt() { if (window.CharlieBuilder) window.CharlieBuilder.snapshot($('#gt-art')); }

  // real foil: the light moves across it as the phone tilts or the cursor moves
  function foil() {
    var t = $('#gticket'), col = $('.order__ticket-col');
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
  function place(e) {
    e.preventDefault();
    var miss = validate(), err = $('#oform-err');
    if (miss.length) { err.textContent = 'Nearly there, just add ' + miss.join(', ').replace(/, ([^,]*)$/, ' and $1') + '.'; return; }
    err.textContent = '';
    ticketNo += 1; renderTicket(); drawArt();
    var t = $('#gticket'), st = $('#gt-stamp');
    st.classList.remove('is-on'); t.classList.remove('is-printing'); void t.offsetWidth;
    t.classList.add('is-printing'); t.dataset.state = 'placed';
    setTimeout(function () { st.classList.add('is-on'); }, reduced ? 0 : 1050);
    var o = O.get();
    O.set({ placed: { no: ticketNo, total: o.total, at: Date.now() } });
    $('#order-done').textContent = 'It’s stamped. On the live site this goes straight to Charlie’s ' + SHOPS[o.shop].name + ', and this prototype hasn’t sent it anywhere.';
  }

  function goTo(id) { var t = document.getElementById(id); if (window.CharlieMotion) window.CharlieMotion.scrollTo(t); else t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }

  function init() {
    $$('[data-action="order"]').forEach(function (b) {
      b.addEventListener('click', function () { if (b.dataset.shop) { O.set({ shop: b.dataset.shop }); radios('order-shop', b.dataset.shop); } goTo('order'); });
    });
    $$('input[name="order-shop"]').forEach(function (i) { i.addEventListener('change', function () { O.set({ shop: i.value }); renderSlots(); }); });
    $$('input[name="order-mode"]').forEach(function (i) {
      i.addEventListener('change', function () { O.set({ mode: i.value }); var d = i.value === 'delivery'; $('#delivery-note').hidden = !d; $('#addr-field').hidden = !d; renderSlots(); });
    });
    $('#slots').addEventListener('click', function (e) { var b = e.target.closest('.slot'); if (!b) return; O.set({ time: b.dataset.time }); renderSlots(); });
    $('#order-name').addEventListener('input', function (e) { O.set({ name: e.target.value }); });
    $('#order-phone').addEventListener('input', function (e) { O.set({ phone: e.target.value }); });
    $('#order-address').addEventListener('input', function (e) { O.set({ address: e.target.value }); });
    $('#oform').addEventListener('submit', place);
    O.subscribe(function () { renderTicket(); });
    renderSlots(); renderTicket(); foil();
    // the creation is drawn on the ticket whenever the order comes into view
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) drawArt(); }); }, { threshold: 0.05 }).observe($('#order'));
  }

  window.CharlieCheckout = { init: init, slotsFor: slotsFor, goTo: goTo, SHOPS: SHOPS, label: label, ukNow: ukNow };
})();
