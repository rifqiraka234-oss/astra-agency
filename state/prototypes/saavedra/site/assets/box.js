/* The box builder. Headcount and appetite in, boxes of 12 and 6 out, filled with empanadas.
   Their card sells boxes of 6 and 12. The per person counts are a suggestion, labelled on the page, theirs to set. */
(function () {
  var d = document, box = d.querySelector('[data-box]');
  if (!box) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var range = box.querySelector('[data-box-n]'), out = box.querySelector('[data-box-out]'), stack = box.querySelector('[data-box-stack]');
  var sum = box.querySelector('[data-box-sum]'), go = box.querySelector('[data-box-go]'), nOut = box.querySelector('[data-box-nout]');
  var P = JSON.parse(box.querySelector('script[type="application/json"]').textContent);
  function en() { return d.documentElement.lang === 'en'; }
  function per() { var c = box.querySelector('input[name="faim"]:checked'); return c ? +c.value : 3; }

  function plan(n, k) {
    var e = n * k, b12 = Math.floor(e / 12), r = e - b12 * 12, b6 = 0;
    if (r > 6) b12 += 1; else if (r > 0) b6 = 1;
    return { e: e, b12: b12, b6: b6, total: b12 * 12 + b6 * 6 };
  }
  function boxHTML(size, i) {
    var cells = '';
    for (var j = 0; j < size; j++) cells += '<i style="--j:' + j + '"><svg viewBox="0 0 64 40" aria-hidden="true" focusable="false"><use href="#emp"/></svg></i>';
    return '<div class="bx bx' + size + '" style="--k:' + i + '"><span class="bx-lid">' + size + '</span><div class="bx-g">' + cells + '</div></div>';
  }
  var last = '';
  function draw() {
    var n = +range.value, k = per(), p = plan(n, k);
    nOut.textContent = n;
    range.setAttribute('aria-valuetext', n + (en() ? ' people' : ' personnes'));
    var key = p.b12 + '-' + p.b6;
    if (key !== last) {
      var html = '';
      for (var i = 0; i < p.b12; i++) html += boxHTML(12, i);
      if (p.b6) html += boxHTML(6, p.b12);
      stack.innerHTML = html;
      /* the empanadas shrink as the order grows, so every box stays on the board */
      /* the largest empanada that still fits every box on the board */
      var nb = p.b12 + p.b6, stage = stack.parentNode, W = stage.clientWidth || 600, H = parseFloat(getComputedStyle(stage).minHeight) || 400, e, many;
      for (e = 52; e > 8; e--) {
        many = e < 22;
        var bw = 4 * e + 9 + (many ? 12 : 20), bh = 3 * e * 0.65 + 6 + (many ? 14 : 36), gap = many ? 8 : 14;
        var cols = Math.max(1, Math.floor((W - 52 + gap) / (bw + gap))), rows = Math.ceil(nb / cols);
        if (rows * bh + (rows - 1) * gap + 52 <= H && cols * (bw + gap) - gap <= W - 52) break;
      }
      /* on a narrow phone the biggest orders can't fit at any size, so the board grows instead */
      var tall = e <= 8; if (tall) { e = 9; many = true; }
      stack.classList.toggle('bb-tall', tall);
      stack.style.setProperty('--e', e + 'px');
      stack.classList.toggle('bb-many', many);
      stack.classList.remove('pop'); void stack.offsetWidth; if (!reduce) stack.classList.add('pop');
      last = key;
    }
    var fr = (p.b12 ? p.b12 + ' box de 12' : '') + (p.b12 && p.b6 ? ' + ' : '') + (p.b6 ? '1 box de 6' : '');
    var eng = (p.b12 ? p.b12 + (p.b12 > 1 ? ' boxes of 12' : ' box of 12') : '') + (p.b12 && p.b6 ? ' + ' : '') + (p.b6 ? '1 box of 6' : '');
    out.textContent = en() ? eng + ', ' + p.total + ' empanadas' : fr + ', ' + p.total + ' empanadas';
    if (P.price12 && P.price6) {
      var price = p.b12 * P.price12 + p.b6 * P.price6;
      var eur = price.toLocaleString(en() ? 'en-GB' : 'fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
      sum.textContent = en() ? 'At our card prices, ' + eur : 'Au prix de la carte, ' + eur;
      sum.hidden = false;
    }
    go.setAttribute('data-n', n);
    var lab = go.querySelector('[data-box-golab]');
    if (lab) lab.textContent = en() ? 'Ask for a quote for ' + n : 'Demander un devis pour ' + n;
  }
  range.addEventListener('input', draw);
  [].forEach.call(box.querySelectorAll('input[name="faim"]'), function (r) { r.addEventListener('change', draw); });
  d.addEventListener('sv-lang', draw);
  var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { last = ''; draw(); }, 150); });
  go.addEventListener('click', function (e) {
    var target = d.getElementById('devis');
    d.dispatchEvent(new CustomEvent('sv-pers', { detail: { n: +range.value, format: 'bureau' } }));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); var f = target.querySelector('input[name="date"]'); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, reduce ? 0 : 700); }
  });
  draw();
})();
