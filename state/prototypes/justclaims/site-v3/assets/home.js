/* home page. The rack filter, the route that inks in as the story is read, the punch card, the exhibit notes, the boarding pass. */
(function () {
  'use strict';
  var d = document, w = window, J = w.JC || {}, $ = J.$, $$ = J.$$, reduce = J.reduce;

  /* ---- the rack. Mark the seven that touch claims handling, and open a strip when the board links to it */
  var rack = $('[data-rack]');
  if (rack) {
    var tb = $$('[data-f]', rack);
    tb.forEach(function (b) { b.addEventListener('click', function () { tb.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); if (b.getAttribute('data-f') === 'claims') rack.setAttribute('data-only', 'claims'); else rack.removeAttribute('data-only'); }); });
    var openHash = function () { var h = location.hash; if (!/^#c-/.test(h)) return; var li = d.getElementById(h.slice(1)); if (!li) return; var det = $('details', li); if (det) det.open = true; };
    openHash(); w.addEventListener('hashchange', openHash);
  }

  /* ---- the route. While step k is read, the leg into fix k inks in, its fix turns yellow, the fixes behind it turn black */
  var story = $('[data-story]'), svg = story && $('.appr', story);
  if (story && svg) {
    var steps = $$('.step', story), fixes = $$('.fix', svg), legs = $$('.leg', svg), flown = $('.flown', svg);
    var stops = (svg.getAttribute('data-stops') || '0').split(',').map(Number);
    var cur = -1, q = false;
    var upd = function () {
      q = false; var vh = w.innerHeight, line = vh * .62, k = 0, t = 0;
      steps.forEach(function (s, i) { var r = s.getBoundingClientRect(); if (r.top < line) { k = i; t = Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height))); } });
      var from = k === 0 ? 0 : stops[k - 1], to = k === steps.length - 1 ? 1 : stops[k];
      var p = k === 0 ? 0 : from + (to - from) * Math.min(1, t * 2.2);
      if (steps[0].getBoundingClientRect().top > line) p = 0;
      flown.style.setProperty('--off', (1 - p).toFixed(4));
      if (k !== cur) {
        cur = k;
        steps.forEach(function (s, i) { s.classList.toggle('on', i === k); });
        fixes.forEach(function (f, i) { f.classList.toggle('on', i === k); f.classList.toggle('done', i < k); });
        legs.forEach(function (l) { var i = +l.getAttribute('data-i'); l.classList.toggle('on', i === k); });
      }
    };
    if (!reduce) { flown.style.setProperty('--off', '1'); upd(); w.addEventListener('scroll', function () { if (!q) { q = true; requestAnimationFrame(upd); } }, { passive: true }); w.addEventListener('resize', upd); }
    else { steps.forEach(function (s, i) { s.addEventListener('focusin', function () {}); }); }
  }

  /* ---- the punch card. 96 positions, one per hour, punched at speed while the card is in view */
  var card = $('[data-card]'), pcv = $('[data-pcv]');
  if (card && pcv && !reduce) {
    var holes = $$('.pc-c i', card), half = 0, hold = 0, pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var show = function () { var mins = 96 * 60 - half * 30; pcv.textContent = Math.floor(mins / 60) + ' h ' + pad(mins % 60) + ' min'; };
    setInterval(function () {
      if (!J.seen(card) || d.hidden) return;
      if (hold) { hold--; if (!hold) { half = 0; holes.forEach(function (h) { h.classList.remove('p'); }); show(); } return; }
      half++; if (half % 2 === 0 && holes[half / 2 - 1]) holes[half / 2 - 1].classList.add('p');
      show();
      if (half >= 192) hold = 30;
    }, 55);
  }

  /* ---- the exhibit. A note and its field light each other on hover and focus, and in turn while in view */
  var ex = $('[data-exhibit]');
  if (ex) {
    var notes = $$('.note', ex), hots = $$('.hot', ex), at = 0, held = false;
    var light = function (n) { notes.forEach(function (x) { x.classList.toggle('lit', x.getAttribute('data-n') === n); }); hots.forEach(function (x) { x.classList.toggle('lit', x.getAttribute('data-n') === n); }); };
    notes.forEach(function (x) {
      x.setAttribute('tabindex', '0');
      ['mouseenter', 'focus'].forEach(function (e) { x.addEventListener(e, function () { held = true; light(x.getAttribute('data-n')); }); });
      ['mouseleave', 'blur'].forEach(function (e) { x.addEventListener(e, function () { held = false; }); });
    });
    light('1');
    if (!reduce) setInterval(function () { if (!held && J.seen(ex) && !d.hidden) { at = at % 4 + 1; light(String(at)); } }, 2800);
  }

  /* ---- the boarding pass. A sample flight, the visitor's delay and distance, plain date arithmetic */
  var m = $('[data-mini]');
  if (m) {
    var rng = $('#mini-d', m), out = $('#mini-o', m), wrap = rng.closest('.ps-delay');
    var amt = $('[data-amt]', m), why = $('[data-why]', m), n96 = $('[data-n96]', m), n9 = $('[data-n9]', m);
    var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var p2 = function (n) { return (n < 10 ? '0' : '') + n; };
    var fmt = function (t, time) { return DOW[t.getDay()] + ' ' + t.getDate() + ' ' + MON[t.getMonth()] + ' ' + t.getFullYear() + (time ? ', ' + p2(t.getHours()) + '.' + p2(t.getMinutes()) : ''); };
    var band = function () { var c = $('input[name="band"]:checked', m); return c ? c.value : '400x'; };
    var run = function () {
      var mins = +rng.value, h = Math.floor(mins / 60), mm = mins % 60, b = band();
      out.textContent = h + ' h ' + p2(mm) + ' min';
      rng.style.setProperty('--p', (mins / 720 * 100).toFixed(2) + '%');
      var arr = new Date(2027, 10, 5, 16, 20), end = new Date(arr.getTime() + mins * 6e4);
      var eur = b === '250' ? 250 : b === '600' ? 600 : 400, right = mins > 180;
      wrap.classList.toggle('no', !right);
      amt.textContent = right ? 'EUR ' + eur : 'None'; amt.classList.toggle('no', !right);
      why.textContent = right ? 'More than three hours late at the final destination.' + (b === '600' && mins <= 240 ? ' Art. 7(2) lets the airline halve this band in some cases.' : '') : 'Not more than three hours late, so no right to compensation and no claim notice.';
      n96.textContent = right ? fmt(new Date(end.getTime() + 96 * 36e5), true) : 'Not triggered';
      n9.textContent = fmt(new Date(2028, 7, 5), false);
    };
    $$('input[name="band"]', m).forEach(function (r) { r.addEventListener('change', run); });
    rng.addEventListener('input', run); run();
  }
})();
