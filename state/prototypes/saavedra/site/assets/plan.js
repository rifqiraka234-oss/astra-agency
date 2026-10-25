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
