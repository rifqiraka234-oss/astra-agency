/* Birthdays and celebrations. Drag the giant number and a chair appears round the table for each of you, pick the
   shop, the day, a time in UK time and the occasion, and the booking ends on a golden table ticket stamped confirmed.
   Nothing is sent anywhere. The booking is kept from page to page like the order. Home shows the table as a teaser.
   Exposes window.CharlieParty. */
(function () {
  'use strict';
  var O = window.CharlieOrder;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var CHAIR = ['#5F3F90', '#3A8A96', '#F0B962', '#F75F9B', '#DED2E8'];
  var shown = 0, R = window.CD_ROOT || '';
  var HAT = R + 'media/hat.svg'; // on its own, so the one file build can carry the picture

  // the table from above, a chair for each guest, popping in as the number grows
  function table(n, svg, from) {
    svg = svg || $('#table-svg'); var html = '', TR = 96, was = from == null ? shown : from;
    if (!svg.firstChild) {
      html += '<defs><radialGradient id="tabletop" cx=".4" cy=".35"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#efe2f6"/></radialGradient></defs>';
      html += '<g class="chairs"></g><circle r="' + TR + '" fill="url(#tabletop)" stroke="#F0B962" stroke-width="5"/>';
      // their stripes round the table's edge
      for (var i = 0; i < 24; i++) { var a0 = i / 24 * Math.PI * 2, a1 = (i + 1) / 24 * Math.PI * 2, r0 = TR - 12, r1 = TR - 3;
        html += '<path d="M' + (Math.cos(a0) * r0).toFixed(1) + ' ' + (Math.sin(a0) * r0).toFixed(1) + 'L' + (Math.cos(a0) * r1).toFixed(1) + ' ' + (Math.sin(a0) * r1).toFixed(1) + 'A' + r1 + ' ' + r1 + ' 0 0 1 ' + (Math.cos(a1) * r1).toFixed(1) + ' ' + (Math.sin(a1) * r1).toFixed(1) + 'L' + (Math.cos(a1) * r0).toFixed(1) + ' ' + (Math.sin(a1) * r0).toFixed(1) + 'A' + r0 + ' ' + r0 + ' 0 0 0 ' + (Math.cos(a0) * r0).toFixed(1) + ' ' + (Math.sin(a0) * r0).toFixed(1) + 'Z" fill="' + CHAIR[i % 4] + '"/>'; }
      html += '<image href="' + HAT + '" x="-46" y="-42" width="92" height="82"/>';
      svg.innerHTML = html;
    }
    var g = $('.chairs', svg), out = '';
    for (var k = 0; k < n; k++) {
      var a = -Math.PI / 2 + k / n * Math.PI * 2, x = Math.cos(a) * (TR + 46), y = Math.sin(a) * (TR + 46), rot = a * 180 / Math.PI + 90;
      // the place sits on the outer group, so the pop in (a CSS transform on the inner one) never moves it
      out += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(1) + ')"><g class="chair' + (k >= was && !reduced ? ' is-in' : '') + '" style="animation-delay:' + ((k - was) * 50) + 'ms">' +
        '<rect x="-24" y="-20" width="48" height="40" rx="12" fill="' + CHAIR[k % CHAIR.length] + '"/><rect x="-26" y="14" width="52" height="12" rx="6" fill="#12031f" opacity=".35"/></g></g>';
    }
    g.innerHTML = out; if (from == null) shown = n;
  }
  // the teaser on Home: the same table, its six chairs popping in as it comes on screen
  function tease() {
    var svg = $('#tease-svg'); if (!svg) return;
    if (reduced || !('IntersectionObserver' in window)) return table(6, svg, 6);
    table(0, svg, 0);
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); table(6, svg, 0); } }, { threshold: 0.4 });
    io.observe(svg);
  }

  function label(mins) { return window.CharlieCheckout.label(mins); }
  function days() {
    var host = $('#days'), out = '', now = new Date(), fmtD = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short' }), fmtN = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', day: 'numeric' }), fmtL = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'long' });
    for (var i = 0; i < 14; i++) {
      var d = new Date(now.getTime() + i * 86400000), v = fmtL.format(d);
      out += '<button type="button" class="day" role="radio" aria-checked="' + (O.booking().date === v) + '" data-date="' + v + '"><span>' + (i === 0 ? 'Today' : fmtD.format(d)) + '</span><b>' + fmtN.format(d) + '</b></button>';
    }
    host.innerHTML = out;
  }
  function times() {
    var b = O.booking(), host = $('#pslots'), out = '', isToday = b.date && b.date === new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
    var start = 12 * 60, now = window.CharlieCheckout.ukNow();
    if (isToday) start = Math.max(start, Math.ceil((now + 60) / 30) * 30);
    for (var t = start; t <= 20 * 60 + 30; t += 30) { var v = label(t); out += '<button type="button" class="slot" role="radio" aria-checked="' + (b.time === v) + '" data-time="' + v + '">' + v + '</button>'; }
    host.innerHTML = out || '<p class="ofs__note">No more tables today, pick another day.</p>';
    $('#ptime-note').textContent = b.shop === 'huddersfield' ? 'Example times, as Huddersfield’s opening hours are still to confirm with the shop' : 'Example times, inside opening hours';
  }

  function setSize(n) {
    n = Math.max(1, Math.min(10, n | 0)); O.setBooking({ partySize: n });
    var big = $('#party-big'), r = $('#party-size');
    big.textContent = n; if (n === 10) big.setAttribute('data-plus', ''); else big.removeAttribute('data-plus');
    r.value = n; r.setAttribute('aria-valuetext', n === 10 ? '10 or more people' : n + (n === 1 ? ' person' : ' people'));
    if (!reduced && big.animate) big.animate([{ transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'cubic-bezier(.3,1.45,.5,1)' });
    table(n);
  }

  function pickShop(shop) { O.setBooking({ shop: shop }); $$('input[name="party-shop"]').forEach(function (i) { i.checked = i.value === shop; }); times(); }
  function ticket(animate) {
    var b = O.booking(), shop = window.CharlieCheckout.SHOPS[b.shop].name, n = b.partySize === 10 ? '10 or more' : b.partySize;
    $('#tt-big').textContent = 'Table for ' + n;
    $('#tt-line').innerHTML = b.occasion + ' at Charlie’s ' + shop + '<br>' + b.date + ', ' + b.time + '<br>Booked for ' + b.name.replace(/</g, '&lt;');
    var t = $('#tticket'); t.hidden = false; t.classList.remove('is-printing'); void t.offsetWidth; if (animate && !reduced) t.classList.add('is-printing');
    var st = $('.gticket__stamp', t); st.classList.remove('is-on'); setTimeout(function () { st.classList.add('is-on'); }, animate && !reduced ? 1000 : 0);
  }
  function book(e) {
    e.preventDefault();
    var b = O.booking(), miss = [];
    if (!b.shop) miss.push('the shop'); if (!b.occasion) miss.push('the occasion'); if (!b.date) miss.push('a day'); if (!b.time) miss.push('a time');
    if (!b.name.trim()) miss.push('a name'); if (!/\d{6,}/.test(b.phone.replace(/\D/g, ''))) miss.push('a phone number');
    var err = $('#bform-err');
    if (miss.length) { err.textContent = 'Nearly there, just add ' + miss.join(', ').replace(/, ([^,]*)$/, ' and $1') + '.'; return; }
    err.textContent = '';
    var shop = window.CharlieCheckout.SHOPS[b.shop].name;
    ticket(true);
    O.setBooking({ placed: { at: Date.now() } });
    if (window.CharlieFilm) window.CharlieFilm.cue('booked');
    $('#booking-done').textContent = 'It’s confirmed. On the live site the shop’s diary is checked first and you get an email, and this prototype hasn’t booked anything.';
  }

  function init() {
    var r = $('#party-size');
    r.addEventListener('input', function () { setSize(+r.value); });
    $('#party-minus').addEventListener('click', function () { setSize(O.booking().partySize - 1); });
    $('#party-plus').addEventListener('click', function () { setSize(O.booking().partySize + 1); });
    $$('input[name="party-shop"]').forEach(function (i) { i.addEventListener('change', function () { O.setBooking({ shop: i.value }); times(); }); });
    $$('input[name="party-occasion"]').forEach(function (i) { i.addEventListener('change', function () { O.setBooking({ occasion: i.value }); }); });
    $('#days').addEventListener('click', function (e) { var b = e.target.closest('.day'); if (!b) return; O.setBooking({ date: b.dataset.date, time: null }); days(); times(); });
    $('#pslots').addEventListener('click', function (e) { var b = e.target.closest('.slot'); if (!b) return; O.setBooking({ time: b.dataset.time }); times(); });
    $('#party-name').addEventListener('input', function (e) { O.setBooking({ name: e.target.value }); });
    $('#party-phone').addEventListener('input', function (e) { O.setBooking({ phone: e.target.value }); });
    $('#bform').addEventListener('submit', book);
    // a booking kept from another page comes back filled in, and a confirmed one shows its table ticket
    var b = O.booking();
    $$('input[name="party-shop"]').forEach(function (i) { i.checked = i.value === b.shop; });
    $$('input[name="party-occasion"]').forEach(function (i) { i.checked = i.value === b.occasion; });
    $('#party-name').value = b.name; $('#party-phone').value = b.phone;
    shown = reduced ? 10 : 0; days(); times(); setSize(b.partySize);
    if (b.placed && b.shop && b.occasion && b.date && b.time && b.name) { ticket(false); $('#booking-done').textContent = 'It’s confirmed. On the live site the shop’s diary is checked first and you get an email, and this prototype hasn’t booked anything.'; }
  }

  window.CharlieParty = { init: init, tease: tease, pickShop: pickShop, table: table };
})();
