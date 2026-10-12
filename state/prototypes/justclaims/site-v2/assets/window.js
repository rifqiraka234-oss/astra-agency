/* the window chapter. The 96 hours played at speed, one cell for each hour. Static when motion is reduced. */
(function () {
  'use strict';
  var d = document, w = window, sec = d.querySelector('[data-win]'); if (!sec) return;
  var cells = [].slice.call(sec.querySelectorAll('.hgr i')), v = sec.querySelector('[data-hgv]'), u = sec.querySelector('[data-hgu]');
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var last = -1;
  function paint(e) {
    var left = Math.max(0, Math.round(96 * 3600 * (1 - e))), h = Math.floor(left / 3600), m = Math.floor(left % 3600 / 60), s = left % 60;
    v.textContent = pad(h) + 'h ' + pad(m) + 'min ' + pad(s) + 's';
    var gone = Math.floor(96 * e + 1e-9);
    if (gone !== last) { for (var k = 0; k < cells.length; k++) cells[k].classList.toggle('off', k < gone); last = gone; }
    var due = e >= 1; sec.classList.toggle('due', due); u.textContent = due ? 'The notice is due' : 'left of the 96 hours';
  }
  paint(0);
  if (reduce) return;
  var SWEEP = 16000, HOLD = 2800, t0 = null;
  function seen() { var r = sec.getBoundingClientRect(); return r.bottom > 0 && r.top < w.innerHeight; }
  function loop(ts) {
    if (seen()) {
      if (t0 === null) t0 = ts;
      var t = (ts - t0) % (SWEEP + HOLD), e = Math.min(1, t / SWEEP), x = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2;
      paint(Math.min(1, e < 1 ? e * .98 + x * .02 : 1));
    } else t0 = null;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
