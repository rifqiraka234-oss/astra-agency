/* Honey It's Handled prototype. One wedding carried down the page. Every control writes the state, every display
   reads it, the card, the count, the drawing, the hall, the bar, the letter and the fallback mail. Nothing is sent. */
(function () {
  'use strict';
  var doc = document, html = doc.documentElement;
  var D = JSON.parse(doc.getElementById('hih-data').textContent);
  var RM = html.classList.contains('rm');
  var WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // today, the visitor's own, or ?today=YYYY-MM-DD so a test can fix it
  function parseISO(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  var q = new URLSearchParams(location.search);
  var now = new Date(); var TODAY = parseISO(q.get('today')) || new Date(now.getFullYear(), now.getMonth(), now.getDate());
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function daysBetween(a, b) { return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 864e5); }
  var MIN = addDays(TODAY, 7), MAX = parseISO(D.maxDate);
  function clampDate(d) { return d < MIN ? MIN : d > MAX ? MAX : d; }

  var S = {
    date: clampDate(parseISO(D.defaultDate)), noDate: false, year: parseISO(D.defaultDate).getFullYear(),
    place: 'local', guests: D.guests['default'], help: 'full', first: true, celebrating: 'Wedding', celTouched: false, msgDirty: false
  };
  var subs = [];
  function on(fn) { subs.push(fn); }
  function set(patch) { for (var k in patch) S[k] = patch[k]; render(); subs.forEach(function (f) { f(S); }); }

  // ------------------------------------------------------------ words
  function longDate(d) { return WD[d.getDay()] + ' ' + d.getDate() + ' ' + MO[d.getMonth()] + ' ' + d.getFullYear(); }
  function shortDate(d) { return WD[d.getDay()].slice(0, 3) + ' ' + d.getDate() + ' ' + MO[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear(); }
  function cardDate(d) { return d.getDate() + ' ' + MO[d.getMonth()] + ' ' + d.getFullYear(); }
  function target() { return S.noDate ? new Date(S.year, 6, 1) : S.date; }   // with no date, counted to 1 July of that year
  function days() { return Math.max(1, daysBetween(TODAY, target())); }
  function svc(id) { for (var i = 0; i < D.services.length; i++) if (D.services[i].id === id) return D.services[i]; }
  function stepIn(n, id) { var s = svc(id); return s.stepInDays != null ? Math.max(0, n - s.stepInDays) : Math.round(n * s.stepIn); }
  function offerYear() { var y = S.noDate ? S.year : S.date.getFullYear(); return D.offerYears.indexOf(y) >= 0; }
  function firstOn() { return S.first && offerYear(); }
  function message() {
    var where = S.place === 'local' ? 'here in Belgium' : 'somewhere abroad';
    var when = S.noDate ? 'in ' + S.year : 'on ' + longDate(S.date);
    var help = { full: 'We’d love full planning', partial: 'We’d love help with part of the planning', day: 'We’d love you to coordinate the day itself' }[S.help];
    return 'Hi Elise, we’re getting married ' + when + ', ' + where + ', with about ' + S.guests + ' guests. ' + (S.noDate ? 'We haven’t picked the date yet. ' : '') + help + (firstOn() ? ', and we’d like to be one of your first couples.' : '.');
  }
  function compare(g) {
    var cc = D.nights.cinco.guests, pr = D.nights.pro.guests, prt = D.nights.pro.guestsText;
    if (g < cc - 10) return g + ' guests. A little smaller than Cinco Cero’s ' + cc + '.';
    if (g <= cc + 10) return g + ' guests. About the size of Cinco Cero, ' + cc + '.';
    if (g < pr) return g + ' guests. More than Cinco Cero’s ' + cc + ', fewer than the ' + prt + ' at the Pro League Awards.';
    return g + ' guests. The size of the Pro League Awards, ' + prt + '.';
  }
  function barText() {
    var d = S.noDate ? 'No date yet, ' + S.year : shortDate(S.date);
    return d + ' · ' + S.guests + ' guests · ' + svc(S.help).name;
  }

  // ------------------------------------------------------------ render, every display reads the state
  var O = {};
  doc.querySelectorAll('[data-o]').forEach(function (e) { (O[e.getAttribute('data-o')] = O[e.getAttribute('data-o')] || []).push(e); });
  function put(k, v) { (O[k] || []).forEach(function (e) { if (e.textContent !== v) e.textContent = v; }); }
  var lastCard = '';
  function ink(k) { (O[k] || []).forEach(function (e) { if (RM) return; e.classList.remove('is-ink'); void e.offsetWidth; e.classList.add('is-ink'); }); }
  var seats = [].slice.call(doc.querySelectorAll('[data-seats] .st'));
  var marks = [].slice.call(doc.querySelectorAll('.hall-svg .mk'));
  var dateIn = doc.querySelector('[data-f="date"]'), guestsIn = doc.querySelector('[data-f="guests"]');
  var msgIn = doc.querySelector('[data-f="message"]'), celIn = doc.querySelector('[data-f="celebrating"]'), firstIn = doc.querySelector('[data-f="first"]');
  var rewrite = doc.querySelector('[data-rewrite]');

  function render() {
    var n = days();
    put('weekday', S.noDate ? 'No date yet' : WD[S.date.getDay()]);
    var big = S.noDate ? 'Sometime in ' + S.year : cardDate(S.date);
    put('dateBig', big);
    put('dateSub', S.noDate ? 'About ' + n + ' days to the middle of ' + S.year : n + ' days from today');
    var card = S.noDate ? 'Sometime in ' + S.year : cardDate(S.date);
    if (card !== lastCard) { put('cardDate', card); put('cardDate2', card); if (lastCard) { ink('cardDate'); ink('dateBig'); } lastCard = card; }
    put('days', String(n));
    put('dateShort', S.noDate ? '1 July ' + S.year + ', until you pick your date' : longDate(S.date));
    put('dateLong', S.noDate ? 'Sometime in ' + S.year : longDate(S.date));
    put('helpLine', svc(S.help).line);
    put('guests', String(S.guests));
    put('hallRead', compare(S.guests));
    put('barDate', S.noDate ? 'No date yet, ' + S.year : shortDate(S.date));
    put('barRest', S.guests + ' guests · ' + svc(S.help).name);
    put('offerLine', offerYear() ? 'Saying I do in 2027 or 2028? Be one of the first couples, with an exclusive launch offer.' : 'The launch offer is for weddings in 2027 or 2028. Tell me about yours anyway.');
    (O.offerNote || []).forEach(function (e) { e.hidden = offerYear(); });
    if (firstIn) { firstIn.disabled = !offerYear(); firstIn.checked = firstOn(); }
    if (dateIn && !S.noDate && dateIn.value !== iso(S.date)) dateIn.value = iso(S.date);
    if (guestsIn) { if (+guestsIn.value !== S.guests) guestsIn.value = S.guests; guestsIn.setAttribute('aria-valuetext', S.guests + ' guests'); guestsIn.style.setProperty('--p', ((S.guests - D.guests.min) / (D.guests.max - D.guests.min) * 100).toFixed(1) + '%'); }
    for (var i = 0; i < seats.length; i++) { var o = i < S.guests; if (seats[i].classList.contains('is-on') !== o) seats[i].classList.toggle('is-on', o); }
    marks[0] && marks[0].classList.toggle('is-on', S.guests >= D.nights.cinco.guests);
    marks[1] && marks[1].classList.toggle('is-on', S.guests >= D.nights.pro.guests);
    doc.querySelectorAll('[data-help]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-help') === S.help)); });
    doc.querySelectorAll('[data-place]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-place') === S.place)); });
    var nd = doc.querySelector('[data-nodate]'); if (nd) nd.setAttribute('aria-pressed', String(S.noDate));
    doc.querySelectorAll('[data-step]').forEach(function (b) { var dir = +b.getAttribute('data-step'); b.setAttribute('aria-label', S.noDate ? (dir < 0 ? 'A year earlier' : 'A year later') : (dir < 0 ? 'A week earlier' : 'A week later')); });
    if (celIn && !S.celTouched) { var c = S.place === 'local' ? 'Wedding' : 'Destination Wedding'; if (S.celebrating === 'Wedding' || S.celebrating === 'Destination Wedding') S.celebrating = c; }
    if (celIn && celIn.value !== S.celebrating) celIn.value = S.celebrating;
    if (msgIn && !S.msgDirty) { var m = message(); if (msgIn.value !== m) msgIn.value = m; }
    if (rewrite) rewrite.hidden = !S.msgDirty || msgIn.value === message();
  }

  // ------------------------------------------------------------ controls
  function stepDate(dir) {
    if (S.noDate) { var y = Math.min(MAX.getFullYear(), Math.max(MIN.getFullYear(), S.year + dir)); set({ year: y }); return; }
    set({ date: clampDate(addDays(S.date, 7 * dir)) });
  }
  doc.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { stepDate(+b.getAttribute('data-step')); }); });
  if (dateIn) {
    dateIn.min = iso(MIN);
    dateIn.addEventListener('change', function () { var d = parseISO(dateIn.value); if (d) set({ date: clampDate(d), noDate: false }); });
  }
  var nd = doc.querySelector('[data-nodate]');
  if (nd) nd.addEventListener('click', function () { set(S.noDate ? { noDate: false } : { noDate: true, year: S.date.getFullYear() }); });
  // drag the big date sideways, a week for every 44 px, and the big guest number, 5 guests for every 14 px
  function dragger(el, px, fn) {
    if (!el) return; var x0 = null, acc = 0;
    el.addEventListener('pointerdown', function (e) { x0 = e.clientX; acc = 0; el.setPointerCapture && el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', function (e) { if (x0 === null) return; var dx = e.clientX - x0; var k = Math.trunc(dx / px); if (k !== acc) { fn(k - acc); acc = k; } });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { el.addEventListener(t, function () { x0 = null; }); });
  }
  dragger(doc.querySelector('[data-drag]'), 44, function (k) { stepDate(k > 0 ? 1 : -1); });
  dragger(doc.querySelector('[data-gdrag]'), 14, function (k) { set({ guests: Math.min(D.guests.max, Math.max(D.guests.min, S.guests + 5 * k)) }); });
  doc.querySelectorAll('[data-help]').forEach(function (b) { b.addEventListener('click', function () { set({ help: b.getAttribute('data-help') }); }); });
  doc.querySelectorAll('[data-place]').forEach(function (b) { b.addEventListener('click', function () { set({ place: b.getAttribute('data-place') }); }); });
  if (guestsIn) guestsIn.addEventListener('input', function () { set({ guests: +guestsIn.value }); });
  if (firstIn) firstIn.addEventListener('change', function () { set({ first: firstIn.checked }); });
  if (celIn) celIn.addEventListener('change', function () { set({ celebrating: celIn.value, celTouched: true }); });
  doc.querySelectorAll('[data-celebrate]').forEach(function (a) { a.addEventListener('click', function () { set({ celebrating: a.getAttribute('data-celebrate'), celTouched: true }); }); });
  if (msgIn) msgIn.addEventListener('input', function () { S.msgDirty = msgIn.value !== message(); render(); });
  if (rewrite) rewrite.addEventListener('click', function () { set({ msgDirty: false }); msgIn.focus(); });

  // land on in page links with the header's height taken off, then focus the target for keyboard users
  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute('href').slice(1), t = id && doc.getElementById(id); if (!t) return;
    e.preventDefault(); closeMenu();
    var y = t.getBoundingClientRect().top + scrollY - (id === 'top' ? 0 : parseFloat(getComputedStyle(html).getPropertyValue('--hdr')) || 0);
    scrollTo({ top: Math.max(0, y), behavior: RM ? 'auto' : 'smooth' });
    var land = function () { var f = id === 'letter' ? doc.querySelector('[data-letter] input[name="first"]') : t; if (f) { if (!f.hasAttribute('tabindex') && !/^(INPUT|SELECT|TEXTAREA|BUTTON|A)$/.test(f.tagName)) f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); } };
    if (RM || !('onscrollend' in window)) setTimeout(land, RM ? 0 : 700); else { var done = false; var fin = function () { if (done) return; done = true; land(); }; addEventListener('scrollend', fin, { once: true }); setTimeout(fin, 1400); }
    history.replaceState(null, '', '#' + id);
  });

  // ------------------------------------------------------------ menu
  var mbtn = doc.querySelector('.mbtn'), nl = doc.getElementById('mnav');
  function closeMenu() { if (nl && nl.classList.contains('is-open')) { nl.classList.remove('is-open'); mbtn.setAttribute('aria-expanded', 'false'); } }
  if (mbtn) {
    mbtn.addEventListener('click', function () { var o = !nl.classList.contains('is-open'); nl.classList.toggle('is-open', o); mbtn.setAttribute('aria-expanded', String(o)); if (o) { var a0 = nl.querySelector('a'); a0.focus(); if (doc.activeElement !== a0) requestAnimationFrame(function () { a0.focus(); }); } });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nl.classList.contains('is-open')) { closeMenu(); mbtn.focus(); } });
    addEventListener('resize', closeMenu);
  }

  // ------------------------------------------------------------ header tone, and the bar that carries the wedding
  var hdr = doc.querySelector('[data-hdr]'), bar = doc.querySelector('[data-sbar]');
  var form = doc.querySelector('[data-letter]'), post = doc.querySelector('[data-post]');
  var acts = [].slice.call(doc.querySelectorAll('[data-act]'));
  var ctas = [].slice.call(doc.querySelectorAll('main [data-cta]'));
  var heroCta = doc.querySelector('[data-hero-cta]'), letterEl = doc.getElementById('letter');
  // a call counts as on screen only where the bar wouldn't cover it and the header wouldn't hide it
  function vis(e) { var r = e.getBoundingClientRect(), hb = hdr.getBoundingClientRect().bottom; return r.width > 0 && r.bottom > hb + 12 && r.top < innerHeight - 84; }
  function tick() {
    var hh = hdr.offsetHeight + 2, tone = 'paper';
    for (var i = 0; i < acts.length; i++) { var r = acts[i].getBoundingClientRect(); if (r.top <= hh && r.bottom > hh) { var a = acts[i].getAttribute('data-act'); tone = a === '2' ? 'red' : a === '1' ? 'blue' : 'paper'; } }
    if (hdr.getAttribute('data-tone') !== tone) hdr.setAttribute('data-tone', tone);
    var heroGone = heroCta.getBoundingClientRect().bottom < hh;
    var other = ctas.some(function (c) { return c !== heroCta && vis(c); });
    var fEl = form && !form.hidden ? form : post, atLetter = !!(fEl && vis(fEl));   // steps aside for the letter itself, not its section
    var onb = heroGone && !other && !atLetter;
    if (bar.classList.contains('is-on') !== onb) { bar.classList.toggle('is-on', onb); bar.setAttribute('aria-hidden', String(!onb)); bar.querySelector('a').tabIndex = onb ? 0 : -1; }
  }
  var raf = 0; function req() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; tick(); }); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req);

  // ------------------------------------------------------------ reveals
  var rvs = [].slice.call(doc.querySelectorAll('.rv'));
  if (!RM && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rvs.forEach(function (e) { io.observe(e); });
  } else rvs.forEach(function (e) { e.classList.add('is-in'); });

  // ------------------------------------------------------------ the letter
  var err = doc.querySelector('[data-err]');
  function mailto(fd) {
    var body = fd.get('message') + '\n\n' + fd.get('first') + ' ' + fd.get('last') + '\n' + fd.get('email') + (fd.get('phone') ? '\n' + fd.get('phone') : '') + '\nWhat we’re celebrating, ' + fd.get('celebrating') + (fd.get('found') ? '\nFound you through ' + fd.get('found') : '');
    return 'mailto:' + D.email + '?subject=' + encodeURIComponent((fd.get('celebrating') || 'Wedding') + ', ' + (S.noDate ? S.year : longDate(S.date))) + '&body=' + encodeURIComponent(body);
  }
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = [];
    ['first', 'last', 'email', 'message'].forEach(function (n) { var f = form.elements[n]; var ok = f.value.trim() && (n !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim())); f.setAttribute('aria-invalid', String(!ok)); if (!ok) bad.push(f); });
    if (bad.length) {
      var names = { first: 'your first name', last: 'your last name', email: 'an email address Elise can answer', message: 'a few words about the day' };
      err.textContent = 'Almost. Add ' + bad.map(function (f) { return names[f.name]; }).join(' and ') + '.';
      err.hidden = false; bad[0].focus(); return;
    }
    err.hidden = true;
    var fd = new FormData(form);
    doc.querySelector('[data-mail]').href = mailto(fd);
    put('postLine', 'Your letter for ' + (S.noDate ? S.year : longDate(S.date)) + ' is sealed, ' + fd.get('first').trim() + '. Elise will be in touch.');
    window.HIH.lastLetter = { first: fd.get('first'), last: fd.get('last'), email: fd.get('email'), celebrating: fd.get('celebrating'), message: fd.get('message'), mailto: doc.querySelector('[data-mail]').href };
    form.hidden = true; post.hidden = false;
    var t = doc.querySelector('[data-post-t]');
    if (window.HIH.seal) window.HIH.seal(function () { t.classList.add('is-in'); t.focus({ preventScroll: true }); });
    else { t.classList.add('is-in'); t.focus({ preventScroll: true }); }
    req();
  });

  window.HIH = { S: S, set: set, on: on, days: days, stepIn: stepIn, target: target, today: TODAY, message: message, compare: compare, barText: barText, D: D, RM: RM };
  render(); tick();
})();
