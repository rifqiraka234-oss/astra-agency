/* home page only. The product window flattens as it scrolls in, its notes light the field they describe, and the mini claim clock. */
(function () {
  'use strict';
  var d = document, w = window, J = w.JC || {};
  var reduce = J.reduce;

  /* the window tilts back and flattens as it comes into view */
  var stage = d.querySelector('[data-tilt]'), win = stage && stage.querySelector('.appwin');
  if (win && !reduce) {
    var q = false;
    var tilt = function () {
      q = false; var r = stage.getBoundingClientRect(), vh = w.innerHeight;
      var t = Math.min(1, Math.max(0, (r.top - vh * .18) / (vh * .7)));
      win.style.setProperty('--tilt', t.toFixed(3));
    };
    tilt(); w.addEventListener('scroll', function () { if (!q) { q = true; requestAnimationFrame(tilt); } }, { passive: true });
  }

  /* notes and fields light each other, on hover and in turn while in view */
  if (stage) {
    var notes = [].slice.call(stage.querySelectorAll('.note')), hots = [].slice.call(stage.querySelectorAll('.hot')), cur = 0, hold = false;
    var light = function (n) { notes.forEach(function (x) { x.classList.toggle('lit', x.getAttribute('data-n') === n); }); hots.forEach(function (x) { x.classList.toggle('lit', x.getAttribute('data-n') === n); }); };
    notes.forEach(function (x) {
      x.setAttribute('tabindex', '0');
      x.addEventListener('mouseenter', function () { hold = true; light(x.getAttribute('data-n')); });
      x.addEventListener('focus', function () { hold = true; light(x.getAttribute('data-n')); });
      x.addEventListener('mouseleave', function () { hold = false; });
      x.addEventListener('blur', function () { hold = false; });
    });
    light('1');
    if (!reduce) (function cycle() {
      var r = stage.getBoundingClientRect();
      if (!hold && r.bottom > 0 && r.top < w.innerHeight) { cur = cur % 4 + 1; light(String(cur)); }
      setTimeout(cycle, 2600);
    })();
  }

  /* the mini claim clock. A sample flight, the visitor's delay and distance, plain date arithmetic */
  var m = d.querySelector('[data-mini]');
  if (m) {
    var rng = m.querySelector('#mini-d'), out = m.querySelector('#mini-o'), btns = [].slice.call(m.querySelectorAll('[data-b]'));
    var amt = m.querySelector('[data-amt]'), why = m.querySelector('[data-why]'), n96 = m.querySelector('[data-n96]'), n9 = m.querySelector('[data-n9]');
    var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var fmt = function (t, time) { return DOW[t.getDay()] + ' ' + t.getDate() + ' ' + MON[t.getMonth()] + ' ' + t.getFullYear() + (time ? ', ' + pad(t.getHours()) + '.' + pad(t.getMinutes()) : ''); };
    var band = '400x';
    var run = function () {
      var mins = +rng.value, h = Math.floor(mins / 60), mm = mins % 60;
      out.textContent = h + ' h ' + pad(mm) + ' min';
      rng.style.setProperty('--p', (mins / 720 * 100).toFixed(1) + '%');
      var arr = new Date(2027, 10, 5, 16, 20), end = new Date(arr.getTime() + mins * 6e4);
      var eur = band === '250' ? 250 : band === '600' ? 600 : 400, right = mins > 180;
      amt.textContent = right ? 'EUR ' + eur : 'None'; amt.classList.toggle('no', !right);
      why.textContent = right ? 'More than three hours late at the final destination.' + (band === '600' && mins <= 240 ? ' Art. 7(2) lets the airline halve this band in some cases.' : '') : 'Not more than three hours late, so no right to compensation and no claim notice.';
      n96.textContent = right ? fmt(new Date(end.getTime() + 96 * 36e5), true) : 'Not triggered';
      n9.textContent = fmt(new Date(2028, 7, 5), false);
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { band = b.getAttribute('data-b'); btns.forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); run(); }); });
    rng.addEventListener('input', run); run();
  }
})();
