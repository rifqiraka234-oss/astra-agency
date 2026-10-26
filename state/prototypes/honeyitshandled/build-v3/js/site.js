/* Honey It's Handled v3. One state for the couple, one for the events page. Every control writes it, every display
   reads it, and the reply card arrives written. Films load near the screen, play on it, never under reduced motion or
   data saver. window.HIH is the test handle. */
(function () {
  'use strict';
  var H = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var RM = H.classList.contains('rm'), SAVE = H.classList.contains('save');
  var DATA = JSON.parse(($('#hih-data') || { textContent: '{}' }).textContent);
  var WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MIN = new Date(2026, 10, 1), MAX = new Date(2029, 11, 31);
  function longDate(d) { return WD[d.getDay()] + ' ' + d.getDate() + ' ' + MO[d.getMonth()] + ' ' + d.getFullYear(); }
  function shortDate(d) { return WD[d.getDay()].slice(0, 3) + ' ' + d.getDate() + ' ' + MO[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear(); }
  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function parseIso(v) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
  function clampDate(d) { return d < MIN ? new Date(MIN) : d > MAX ? new Date(MAX) : d; }
  function join(xs) { return xs.length < 2 ? (xs[0] || '') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]; }
  function low(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  function hh() { return parseFloat(getComputedStyle(H).getPropertyValue('--hh')) || 64; }

  var LIGHTS = DATA.lights || [], DAY = DATA.dayLights || [], YEARS = DATA.offerYears || [2027, 2028];
  var HELPN = DATA.helpNames || { full: 'Full planning', partial: 'Partial planning', day: 'Wedding day coordination' };
  var EMAIL = DATA.email || 'info@honeyitshandled.com';

  // ------------------------------------------------------------------ the couple's state
  var S = { date: new Date(2027, 5, 12), noDate: false, year: 2027, place: 'local', guests: 100, help: 'full',
    lights: LIGHTS.map(function () { return true; }), partial: LIGHTS.map(function () { return false; }),
    first: true, n1: '', n2: '', email: '', phone: '', found: '', edited: false };
  function offerYear() { var y = S.noDate ? S.year : S.date.getFullYear(); return YEARS.indexOf(y) > -1 ? y : 0; }
  function heldNames() { return LIGHTS.filter(function (n, i) { return S.lights[i]; }); }
  function message() {
    var when = S.noDate ? 'sometime in ' + S.year : 'on ' + longDate(S.date);
    var s = 'Hi Elise, we’re getting married ' + when + ', ' + (S.place === 'local' ? 'here in Belgium' : 'somewhere abroad') + ', with about ' + S.guests + ' guests. ';
    if (S.help === 'full') s += 'We’d love full planning';
    else if (S.help === 'day') s += 'We’d love you to coordinate the day itself';
    else { var h = heldNames(); s += 'We’d love your help with ' + (h.length ? join(h.map(low)) : 'part of the planning'); }
    s += (S.first && offerYear()) ? ', and we’d like to be one of your first couples.' : '.';
    return s;
  }
  function barText() {
    return (S.noDate ? 'Sometime in ' + S.year : shortDate(S.date)) + ' · ' + (S.place === 'local' ? 'Belgium' : 'Abroad') + ' · ' + S.guests + ' guests · ' + HELPN[S.help];
  }
  function barShort() { return [S.noDate ? 'Sometime in ' + S.year : shortDate(S.date), S.guests + ' guests · ' + HELPN[S.help]]; }
  function barTwo(t) { txt('[data-o="barDate"]', t[0]); txt('[data-o="barMore"]', t[1]); }
  function set(o) {
    o = o || {};
    if (o.date) { S.date = clampDate(o.date); S.noDate = false; }
    if ('noDate' in o) S.noDate = !!o.noDate;
    if (o.year) S.year = o.year;
    if (o.place) S.place = o.place;
    if ('guests' in o) S.guests = Math.max(10, Math.min(600, Math.round(o.guests / 10) * 10 || 10));
    if ('first' in o) S.first = !!o.first;
    if (o.help) {
      S.help = o.help;
      if (o.help === 'full') S.lights = LIGHTS.map(function () { return true; });
      else if (o.help === 'day') S.lights = LIGHTS.map(function (n, i) { return DAY.indexOf(i) > -1; });
      else S.lights = S.partial.slice();
    }
    if ('toggle' in o) {
      var i = o.toggle;
      if (S.help !== 'partial') { S.partial = S.lights.slice(); S.help = 'partial'; }
      S.partial[i] = !S.partial[i]; S.lights = S.partial.slice();
    }
    if (o.lights) { S.partial = o.lights.slice(); if (S.help === 'partial') S.lights = S.partial.slice(); }
    ['n1', 'n2', 'email', 'phone', 'found'].forEach(function (k) { if (k in o) S[k] = o[k]; });
    if ('edited' in o) S.edited = !!o.edited;
    render();
  }

  function txt(sel, t) { $$(sel).forEach(function (e) { if (e.textContent !== t) e.textContent = t; }); }
  function render() {
    var oy = offerYear(), dl = S.noDate ? 'sometime in ' + S.year : longDate(S.date);
    var sent = $('[data-o="sentence"]');
    if (sent) {
      $$('[data-o="dateLong"]').forEach(function (b) {
        var pre = b.previousSibling;
        if (pre && pre.nodeType === 3) pre.textContent = S.noDate ? 'We’re saying I do ' : 'We’re saying I do on ';
        b.textContent = dl;
      });
    }
    txt('[data-o="place"]', S.place === 'local' ? 'here in Belgium' : 'somewhere abroad');
    txt('[data-o="guestsN"]', String(S.guests));
    $$('output[data-o="guests"]').forEach(function (e) { e.value = S.guests; e.textContent = S.guests; });
    $$('input[data-k="date"]').forEach(function (e) { if (e.value !== iso(S.date)) e.value = iso(S.date); });
    $$('[data-nodate]').forEach(function (b) { b.setAttribute('aria-pressed', S.noDate ? 'true' : 'false'); b.textContent = S.noDate ? 'Pick a day instead' : 'No date yet'; });
    $$('[data-years]').forEach(function (y) { y.hidden = !S.noDate; });
    $$('.yr').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.year === S.year ? 'true' : 'false'); });
    $$('input[data-k="place"]').forEach(function (r) { r.checked = r.value === S.place; });
    $$('input[data-k="help"]').forEach(function (r) { r.checked = r.value === S.help; });
    H.dataset.help = S.help;
    // the lights
    var n = 0;
    $$('[data-light]').forEach(function (b) { var on = !!S.lights[+b.dataset.light]; if (on) n++; b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    var count = S.help === 'full' ? 'Elise holds ' + n + ' of 17.' : S.help === 'day' ? 'Elise holds the day itself, ' + n + ' of 17.' : 'Elise holds ' + n + ' of 17.';
    txt('[data-o="count"]', count);
    txt('[data-o="menuNote"]', S.help === 'full' ? 'Every light is lit. Tap one to hand it back.' : S.help === 'day' ? 'Six lights for the day itself. Tap any to change them.' :
      (n ? 'You’ve handed her ' + n + '. Tap the lights to change them.' : 'Tap the lights up there you’d like her to hold.'));
    // the launch offer
    txt('[data-o="offerNote"]', oy ? 'A ' + oy + ' date. You could be one of her first couples.' : 'Her launch offer is for weddings in 2027 or 2028. Tell her about yours anyway.');
    $$('[data-first-wrap]').forEach(function (w) { w.hidden = !oy; });
    $$('input[data-k="first"]').forEach(function (c) { c.checked = S.first; });
    // the card
    txt('[data-o="cardDate"]', S.noDate ? 'sometime in ' + S.year : 'on ' + longDate(S.date));
    txt('[data-o="cardPlace"]', (S.place === 'local' ? 'here in Belgium' : 'somewhere abroad') + ', with about ' + S.guests + ' guests');
    var h = heldNames();
    txt('[data-o="cardHelp"]', S.help === 'full' ? 'and would love Elise’s full planning' : S.help === 'day' ? 'and would love Elise to coordinate the day itself' :
      'and would love Elise’s help with ' + (h.length ? join(h.map(low)) : 'part of the planning'));
    $$('[data-o="cardFirst"]').forEach(function (e) { e.hidden = !(oy && S.first); });
    $$('input[data-o="celebrating"]').forEach(function (e) { e.value = S.place === 'local' ? 'Wedding' : 'Destination Wedding'; });
    var ta = $('form[data-reply="wedding"] [data-f="message"]');
    if (ta && !S.edited && ta.value !== message()) ta.value = message();
    $$('form[data-reply="wedding"] [data-rewrite-wrap]').forEach(function (w) { w.hidden = !S.edited; });
    if (H.dataset.view !== 'events') { txt('[data-o="bar"]', barText()); barTwo(barShort()); }
    foil('n1', S.n1); foil('n2', S.n2);
    mail($('form[data-reply="wedding"]'));
  }
  function foil(k, v) { $$('[data-foil="' + k + '"]').forEach(function (f) { if (f.textContent !== v) f.textContent = v; }); }

  // ------------------------------------------------------------------ the events page state
  var KINDS = { private: [], company: [] };
  var kindSel = $('select[data-e="kind"]');
  if (kindSel) { KINDS.private = JSON.parse(kindSel.dataset.kindsPrivate); KINDS.company = JSON.parse(kindSel.dataset.kindsCompany); }
  var EV = { type: 'private', team: false, kind: 0, date: new Date(2027, 2, 20), guests: 60, name: '', company: '', email: '', phone: '', found: '', edited: false };
  function evMessage() {
    var what = EV.type === 'private' ? 'a private event' : 'a company event';
    var s = 'Hi Elise, we’re planning ' + what + ' on ' + longDate(EV.date) + ' for about ' + EV.guests + ' guests';
    return s + (EV.team ? ', and we’d like you in our team as a freelance event manager.' : ', and we’d love you to handle it.');
  }
  function evBar() { return (EV.team ? 'Elise in your team' : EV.type === 'private' ? 'Private event' : 'Company event') + ' · ' + shortDate(EV.date) + ' · ' + EV.guests + ' guests'; }
  function evBarShort() { return [EV.team ? 'Elise in your team' : EV.type === 'private' ? 'Private event' : 'Company event', shortDate(EV.date) + ' · ' + EV.guests + ' guests']; }
  function evSet(o) {
    o = o || {};
    if (o.type && o.type !== EV.type) { EV.type = o.type; EV.kind = o.type === 'company' ? 2 : 0; if (o.type === 'private') EV.team = false; }
    if ('team' in o) { EV.team = !!o.team; if (EV.team) EV.type = 'company'; }
    if ('kind' in o) EV.kind = +o.kind;
    if (o.date) EV.date = clampDate(o.date);
    if ('guests' in o) EV.guests = Math.max(10, Math.min(1000, Math.round(o.guests / 10) * 10 || 10));
    ['name', 'company', 'email', 'phone', 'found'].forEach(function (k) { if (k in o) EV[k] = o[k]; });
    if ('edited' in o) EV.edited = !!o.edited;
    evRender();
  }
  function evRender() {
    var f = $('form[data-reply="event"]'); if (!f) return;
    $$('input[data-e="type"]', f).forEach(function (r) { r.checked = r.value === EV.type; });
    $$('[data-team-wrap]', f).forEach(function (w) { w.hidden = EV.type !== 'company'; });
    $$('input[data-e="team"]', f).forEach(function (c) { c.checked = EV.team; });
    $$('[data-co-wrap]', f).forEach(function (w) { w.hidden = EV.type !== 'company'; });
    if (kindSel) {
      var list = KINDS[EV.type];
      if (kindSel.dataset.for !== EV.type) {
        kindSel.innerHTML = ''; list.forEach(function (k, i) { var op = document.createElement('option'); op.value = i; op.textContent = k; kindSel.appendChild(op); });
        kindSel.dataset.for = EV.type;
      }
      kindSel.value = String(EV.kind);
    }
    $$('input[data-e="date"]', f).forEach(function (e) { if (e.value !== iso(EV.date)) e.value = iso(EV.date); });
    $$('output[data-o="evGuests"]', f).forEach(function (e) { e.value = EV.guests; e.textContent = EV.guests; });
    $$('input[data-o="evCelebrating"]', f).forEach(function (e) { e.value = EV.type === 'private' ? 'Private Event' : 'Corporate Event'; });
    var ta = $('[data-f="message"]', f); if (ta && !EV.edited && ta.value !== evMessage()) ta.value = evMessage();
    $$('[data-rewrite-wrap]', f).forEach(function (w) { w.hidden = !EV.edited; });
    foil('ename', EV.name);
    if (H.dataset.view === 'events') { txt('[data-o="bar"]', evBar()); barTwo(evBarShort()); }
    mail(f);
  }

  // ------------------------------------------------------------------ the fallback mail, the whole request
  function mail(f) {
    if (!f) return; var a = $('[data-mail]', f); if (!a) return;
    var subj, lines = [];
    if (f.dataset.reply === 'wedding') {
      var who = [S.n1, S.n2].filter(Boolean).join(' and ');
      subj = 'Our wedding, ' + (S.noDate ? 'sometime in ' + S.year : longDate(S.date));
      lines.push('From ' + (who || 'us'), 'Email ' + S.email);
      if (S.phone) lines.push('Phone ' + S.phone);
      lines.push('What are we celebrating? ' + (S.place === 'local' ? 'Wedding' : 'Destination Wedding'));
      if (offerYear() && S.first) lines.push('We’d like to be one of the first couples');
      if (S.found) lines.push('How did you find Honey, it’s Handled? ' + S.found);
      lines.push('', $('[data-f="message"]', f).value);
    } else {
      subj = (EV.type === 'private' ? 'A private event, ' : 'A company event, ') + longDate(EV.date);
      lines.push('From ' + (EV.name || 'us') + (EV.company ? ', ' + EV.company : ''), 'Email ' + EV.email);
      if (EV.phone) lines.push('Phone ' + EV.phone);
      lines.push('What are we celebrating? ' + (EV.type === 'private' ? 'Private Event' : 'Corporate Event'), 'The occasion ' + (KINDS[EV.type][EV.kind] || ''));
      if (EV.team) lines.push('Elise in our team, as a freelance event manager');
      if (EV.found) lines.push('How did you find Honey, it’s Handled? ' + EV.found);
      lines.push('', $('[data-f="message"]', f).value);
    }
    a.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  // ------------------------------------------------------------------ controls
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target : e.target.parentNode;
    var b;
    if ((b = t.closest('[data-step]'))) { var d = new Date(S.date); d.setDate(d.getDate() + (+b.dataset.step)); set({ date: d }); return; }
    if ((b = t.closest('[data-nodate]'))) { set({ noDate: !S.noDate, year: S.noDate ? S.year : S.date.getFullYear() }); return; }
    if ((b = t.closest('.yr'))) { set({ noDate: true, year: +b.dataset.year }); return; }
    if ((b = t.closest('[data-g]'))) {
      var k = b.dataset.gk, step = +b.dataset.g;
      if (k === 'evGuests') evSet({ guests: EV.guests + step }); else set({ guests: S.guests + step });
      return;
    }
    if ((b = t.closest('[data-light]'))) {
      set({ toggle: +b.dataset.light });
      b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 1800);
      return;
    }
    if ((b = t.closest('[data-rewrite]'))) {
      var f = b.closest('form');
      if (f.dataset.reply === 'wedding') set({ edited: false }); else evSet({ edited: false });
      return;
    }
    if ((b = t.closest('[data-ev-set]'))) {
      var v = b.dataset.evSet; evSet(v === 'team' ? { team: true } : { type: v, team: false });
      return;
    }
    if ((b = t.closest('[data-unseal]'))) { unseal(b.closest('form')); return; }
  });
  document.addEventListener('change', function (e) {
    var t = e.target, k = t.dataset.k, ek = t.dataset.e;
    if (k === 'date') { var d = parseIso(t.value); if (d) set({ date: d }); }
    else if (k === 'place') set({ place: t.value });
    else if (k === 'help') set({ help: t.value });
    else if (k === 'first') set({ first: t.checked });
    else if (k === 'found') set({ found: t.value });
    else if (ek === 'type') evSet({ type: t.value });
    else if (ek === 'team') evSet({ team: t.checked });
    else if (ek === 'kind') evSet({ kind: t.value });
    else if (ek === 'date') { var d2 = parseIso(t.value); if (d2) evSet({ date: d2 }); }
    else if (ek === 'found') evSet({ found: t.value });
  });
  document.addEventListener('input', function (e) {
    var t = e.target, k = t.dataset.k, ek = t.dataset.e;
    if (k === 'n1' || k === 'n2' || k === 'email' || k === 'phone') { var o = {}; o[k] = t.value; set(o); if (k === 'n1' || k === 'n2') sweep(t); }
    else if (ek === 'name' || ek === 'company' || ek === 'email' || ek === 'phone') { var p = {}; p[ek] = t.value; evSet(p); if (ek === 'name') sweep(t); }
    else if (t.dataset.f === 'message') {
      var f = t.closest('form');
      if (f.dataset.reply === 'wedding') { S.edited = true; render(); } else { EV.edited = true; evRender(); }
    }
  });

  // ------------------------------------------------------------------ foil that catches the light
  function sweep(input) {
    var f = input.parentNode.querySelector('.foil'); if (!f || RM) return;
    var t0 = performance.now();
    (function step(t) { var k = Math.min(1, (t - t0) / 900); f.style.setProperty('--fx', (10 + 80 * k) + '%'); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  $$('.card-wrap').forEach(function (w) {
    w.addEventListener('pointermove', function (e) {
      if (RM) return; var r = w.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      $$('.foil', w).forEach(function (f) { f.style.setProperty('--fx', (8 + 84 * (x * .75 + y * .25)) + '%'); });
    });
  });

  // ------------------------------------------------------------------ the reply, checked, then sealed in wax
  function err(f, k, on) { $$('[data-err="' + k + '"]', f).forEach(function (e) { e.hidden = !on; }); }
  function unseal(f) { f.classList.remove('sealing', 'sealed-on'); $('[data-sealed]', f).hidden = true; var s = $('.send', f); if (s) s.focus(); }
  $$('form[data-reply]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var wed = f.dataset.reply === 'wedding';
      var name = $(wed ? 'input[data-k="n1"]' : 'input[data-e="name"]', f), email = $('input[type="email"]', f), msg = $('[data-f="message"]', f);
      var bad = [];
      var okName = name.value.trim().length > 0, okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), okMsg = msg.value.trim().length > 0;
      err(f, 'first', !okName); err(f, 'email', !okMail); err(f, 'message', !okMsg);
      name.setAttribute('aria-invalid', okName ? 'false' : 'true'); email.setAttribute('aria-invalid', okMail ? 'false' : 'true'); msg.setAttribute('aria-invalid', okMsg ? 'false' : 'true');
      if (!okName) bad.push(name); if (!okMail) bad.push(email); if (!okMsg) bad.push(msg);
      if (bad.length) { bad[0].focus(); return; }
      mail(f);
      var done = function () { f.classList.remove('sealing'); f.classList.add('sealed-on'); var s = $('[data-sealed]', f); s.hidden = false; s.focus({ preventScroll: true }); };
      if (RM) { f.classList.add('sealed-on'); done(); return; }
      f.classList.add('sealing'); setTimeout(done, 1150);
    });
  });

  // ------------------------------------------------------------------ views, the events page is #events
  function viewOf(h) { return /^#(events|ev-)/.test(h || '') ? 'events' : 'home'; }
  function route(first) {
    var v = viewOf(location.hash), changed = H.dataset.view !== v;
    H.dataset.view = v;
    if (changed && !first) {
      $$('[data-film] video').forEach(function (vd) { try { vd.pause(); } catch (e) {} });
      var id = location.hash.slice(1), el = id && document.getElementById(id);
      requestAnimationFrame(function () {
        if (el && id !== 'events') el.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
        var focusEl = v === 'events' ? $('#events') : $('#main');
        if (id === 'events' || !el) { focusEl.setAttribute('tabindex', '-1'); focusEl.focus({ preventScroll: true }); }
        tick();
      });
    }
    $$('[data-nav]').forEach(function (a) { if (a.dataset.nav === 'events' && v === 'events') a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var bc = $('[data-bar-cta]'); if (bc) { bc.href = v === 'events' ? '#ev-reply' : '#reply'; $('.bb-l', bc).textContent = v === 'events' ? 'Tell me about your event' : 'Be one of the first'; $('.bb-s', bc).textContent = v === 'events' ? 'Enquire' : 'Reply'; }
    txt('[data-o="bar"]', v === 'events' ? evBar() : barText()); barTwo(v === 'events' ? evBarShort() : barShort());
  }
  window.addEventListener('hashchange', function () { route(false); });

  // ------------------------------------------------------------------ the phone menu
  var mbtn = $('.mbtn'), mnav = $('#mnav');
  if (mbtn) {
    mbtn.addEventListener('click', function () {
      var open = !mnav.classList.contains('open'); mnav.classList.toggle('open', open); mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mbtn.textContent = open ? 'Close' : 'Menu';
      if (open) requestAnimationFrame(function () { requestAnimationFrame(function () { var a = $('a', mnav); if (a) a.focus(); }); });
    });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) { mnav.classList.remove('open'); mbtn.setAttribute('aria-expanded', 'false'); mbtn.textContent = 'Menu'; } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mnav.classList.contains('open')) { mbtn.click(); mbtn.focus(); } });
  }

  // ------------------------------------------------------------------ films, near the screen load, on the screen play
  var films = $$('[data-film]');
  function wake(f) {
    if (f._woke || RM || SAVE) return; f._woke = true;
    var v = $('video', f); $$('source', v).forEach(function (s) { if (s.dataset.src) s.src = s.dataset.src; });
    v.addEventListener('playing', function () { f.classList.add('playing'); });
    try { v.load(); } catch (e) {}
  }
  function play(f) { var v = $('video', f); if (!f._woke) wake(f); if (f._woke && v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
  function pause(f) { var v = $('video', f); if (v && !v.paused) v.pause(); }
  var loaded = false;
  if ('IntersectionObserver' in window && !RM && !SAVE) {
    var near = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; if (e.target.dataset.film === 'hero' && !loaded) return; wake(e.target); }); }, { rootMargin: '60% 0px' });
    var inview = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var f = e.target; f._in = e.isIntersecting;
        if (!e.isIntersecting) { pause(f); return; }
        if (f.dataset.film === 'hero' && !loaded) return;
        play(f);
      });
    }, { threshold: 0.12 });
    films.forEach(function (f) { near.observe(f); inview.observe(f); });
    window.addEventListener('load', function () { setTimeout(function () { loaded = true; films.forEach(function (f) { if (f._in) play(f); }); }, 350); });
    document.addEventListener('visibilitychange', function () { films.forEach(function (f) { if (document.hidden) pause(f); else if (f._in && loaded) play(f); }); });
  }

  // ------------------------------------------------------------------ header tone and the bar, one idea of on screen
  var hdr = $('[data-hdr]'), bar = $('[data-bar]');
  // one definition of on screen, shared with the guide walk, between the header and the bar, drawn and not see through
  function onScreen(el) {
    if (!el || el.offsetParent === null) return false;
    var r = el.getBoundingClientRect(), s = getComputedStyle(el), top = hh() + 6, bot = innerHeight - ((bar && bar.classList.contains('on')) ? bar.offsetHeight : 0) - 6;
    return r.width > 0 && r.height > 0 && r.bottom > top && r.top < bot && s.visibility !== 'hidden' && +s.opacity > 0.05;
  }
  function actions(v) {
    var scope = v === 'events' ? $('#events') : $('#home'), form = $(v === 'events' ? 'form[data-reply="event"]' : 'form[data-reply="wedding"]');
    return $$('[data-cta]', scope).filter(function (b) { return !b.closest('.nl') && !b.classList.contains('hbtn'); })
      .concat(form ? $$('input:not([type=hidden]), textarea, select, .send', form) : []);
  }
  function tick() {
    var v = H.dataset.view, scope = v === 'events' ? $('#events') : $('#home');
    var hero = $('[data-tone="film"]', scope);
    if (hdr) { var r = hero ? hero.getBoundingClientRect() : null; hdr.classList.toggle('on-film', !!(r && r.bottom > hh() + 2)); }
    if (!bar) return;
    var heroCta = $('[data-hero-cta]', scope);
    var past = heroCta ? heroCta.getBoundingClientRect().bottom < hh() : true;
    var on = past && !actions(v).some(onScreen);
    bar.classList.toggle('on', on);
    var bc = $('[data-bar-cta]', bar); bc.tabIndex = on ? 0 : -1; bar.setAttribute('aria-hidden', on ? 'false' : 'true');
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; tick(); }); } }, { passive: true });
  window.addEventListener('resize', tick);

  // ------------------------------------------------------------------ start
  var today = (/[?&]today=(\d{4}-\d{2}-\d{2})/.exec(location.search) || [])[1];
  route(true); render(); evRender(); tick();
  window.HIH = {
    get state() { return JSON.parse(JSON.stringify(S, function (k, v) { return v; })); }, set: set, message: message, barText: barText,
    ev: { get state() { return JSON.parse(JSON.stringify(EV)); }, set: evSet, message: evMessage, bar: evBar },
    tick: tick, onScreen: onScreen, actions: actions, today: today || null, ready: true
  };
})();
