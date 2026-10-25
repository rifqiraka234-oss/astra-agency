/* The growth plan's calculator. Headcount, appetite and orders a month in, boxes and value at card prices out.
   A scenario to size the opportunity, said so on the page. Boxes of 12 at 40.90 and of 6 at 20.90, as printed on the card. */
(function () {
  var c = document.querySelector('[data-calc]');
  if (!c) return;
  var P = JSON.parse(c.querySelector('script[type="application/json"]').textContent);
  var n = c.querySelector('[name="n"]'), k = c.querySelector('[name="k"]'), m = c.querySelector('[name="m"]');
  function o(name) { return c.querySelector('[data-o="' + name + '"]'); }
  function eur(v) { return v.toLocaleString('en-GB', { maximumFractionDigits: 0 }) + ' €'; }
  function draw() {
    var heads = +n.value, per = +k.value, months = +m.value, e = heads * per, b12 = Math.floor(e / 12), r = e - b12 * 12, b6 = 0;
    if (r > 6) b12 += 1; else if (r > 0) b6 = 1;
    var value = b12 * P.price12 + b6 * P.price6;
    o('n').textContent = heads; o('k').textContent = per; o('m').textContent = months;
    o('e').textContent = (b12 * 12 + b6 * 6) + ' empanadas';
    o('b').textContent = b12 + (b12 === 1 ? ' box of 12' : ' boxes of 12') + (b6 ? ' + 1 box of 6' : '');
    o('v').textContent = eur(value);
    o('mo').textContent = eur(value * months);
    o('yr').textContent = eur(value * months * 12);
    var under = e < P.clasico_min;
    o('cl').textContent = under ? 'Below Clasico’s ' + P.clasico_min + ' empanada minimum. Clasico sends orders this size to its click and collect.' : 'At or above Clasico’s ' + P.clasico_min + ' empanada minimum, so Clasico Catering competes for it.';
    n.setAttribute('aria-valuetext', heads + ' people'); m.setAttribute('aria-valuetext', months + ' orders a month');
  }
  [n, k, m].forEach(function (x) { x.addEventListener('input', draw); });
  draw();
})();

/* Clasico's minimum as a wall of 120 empanadas, ten boxes of twelve. A team at three a head lights its share of it. */
(function () {
  var w = document.querySelector('[data-wall]');
  if (!w) return;
  var r = w.querySelector('input'), out = w.querySelector('[data-w-out]'), nOut = w.querySelector('[data-w-n]'), dots = [].slice.call(w.querySelectorAll('.wall-dots i'));
  function draw() {
    var n = +r.value, e = n * 3, lit = Math.min(e, 120);
    dots.forEach(function (d, i) { d.classList.toggle('on', i < lit); });
    nOut.textContent = n;
    r.setAttribute('aria-valuetext', n + ' people');
    out.textContent = e < 120
      ? n + ' people at three a head order ' + e + ' empanadas, ' + (120 - e) + ' short of Clasico’s minimum. Clasico sends that order to its click and collect.'
      : n + ' people at three a head order ' + e + ' empanadas. From 40 people up, Clasico’s catering competes for the order.';
    w.classList.toggle('full', e >= 120);
  }
  r.addEventListener('input', draw);
  draw();
})();

/* the coworking map, the rings open from the shop, then each place arrives in walking order */
(function () {
  var m = document.querySelector('.pmap-wrap');
  if (!m) return;
  [].forEach.call(m.querySelectorAll('.pm-dot'), function (g) { g.style.setProperty('--i', g.getAttribute('data-i')); });
  [].forEach.call(m.querySelectorAll('.pm-lab'), function (l, i) { l.style.setProperty('--i', i); });
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { m.classList.add('go'); return; }
  m.classList.add('wait');
  new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { m.classList.add('go'); o.disconnect(); } }); }, { threshold: 0.3 }).observe(m);
})();
