/* the readiness teaser. A decorative sweep around the ring, not a result. */
(function () {
  'use strict';
  var d = document, w = window, box = d.querySelector('[data-rt]'); if (!box) return;
  var segs = [].slice.call(box.querySelectorAll('.wd'));
  if (w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var step = 0, timer = null;
  function seen() { var r = box.getBoundingClientRect(); return r.bottom > 0 && r.top < w.innerHeight; }
  function tick() {
    if (seen()) {
      step = (step + 1) % (segs.length + 5);
      segs.forEach(function (s, i) { s.setAttribute('class', 'wd' + (i < step ? ' y' : '')); });
    }
    timer = setTimeout(tick, step === 0 ? 900 : 260);
  }
  tick();
})();
