/* The growth plan. The gauges fill once they're on screen, and the calculator only multiplies what the reader sets. */
(function () {
  var d = document;
  function $$(s, r) { return [].slice.call((r || d).querySelectorAll(s)); }
  var rings = $$('.ring');
  function look() { rings = rings.filter(function (r) { var b = r.getBoundingClientRect(); if (b.top < innerHeight * 0.85 && b.bottom > 0) { r.classList.add('in'); return false; } return true; }); }
  addEventListener('scroll', look, { passive: true }); look();

  var calc = d.querySelector('[data-calc]');
  if (!calc) return;
  function eur(v) { return Math.round(v).toLocaleString('en-GB') + ' €'; }
  function run() {
    var c = +calc.querySelector('[data-i="c"]').value, w = +calc.querySelector('[data-i="w"]').value, p = +calc.querySelector('[data-i="p"]').value;
    calc.querySelector('[data-o="c"]').textContent = c;
    calc.querySelector('[data-o="w"]').textContent = w;
    calc.querySelector('[data-o="p"]').textContent = p + ' €';
    calc.querySelector('[data-o="m"]').textContent = eur(c * w * p);
    calc.querySelector('[data-o="y"]').textContent = eur(c * w * p * 12);
  }
  $$('input', calc).forEach(function (i) { i.addEventListener('input', run); });
  run();
})();
