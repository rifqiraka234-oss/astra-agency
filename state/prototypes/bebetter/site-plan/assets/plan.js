/* Astra's plan. The steps tracker, the dot wall, the fair and the sums. Every number comes from the page or data/plan.json. */
(function () {
  var d = document;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var fmt = function (n) { return Math.round(n).toLocaleString('en-GB'); };

  /* ---------------------------------------------------------------- which step you're on */
  var prog = $('[data-prog]'), links = prog ? $$('a', prog) : [];
  function step() {
    var cur = -1;
    links.forEach(function (a, i) { var s = $(a.getAttribute('href')); if (s && s.getBoundingClientRect().top < innerHeight * 0.45) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('done', i < cur); a.classList.toggle('cur', i === cur); if (i === cur) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
    if (prog) prog.classList.toggle('stuck', cur >= 0);
  }
  addEventListener('scroll', step, { passive: true }); addEventListener('resize', step); step();

  /* ---------------------------------------------------------------- the dot wall, the gyms you add light up */
  var dw = $('[data-dw]');
  if (dw) {
    var D = JSON.parse($('[data-dw-data]', dw).textContent), circles = $$('circle', dw), inp = $('[data-dw-in]', dw);
    var paint = function () {
      var n = +inp.value;
      D.free.forEach(function (i, k) { circles[i].classList.toggle('b', k < n); });
      $('[data-dw-n]', dw).textContent = n;
      var pct = n / D.n * 100;
      $('[data-dw-r]', dw).textContent = n === 0 ? 'Slide to add gyms.' : n + (n === 1 ? ' gym is ' : ' gyms is ') + (pct < 1 ? pct.toFixed(1) : pct.toFixed(0)) + '% of the gyms in the Netherlands.';
    };
    inp.addEventListener('input', paint); paint();
  }

  /* ---------------------------------------------------------------- yes at the fair, the kit arrives so many weeks later */
  var lt = $('[data-lt]');
  if (lt) {
    var day = 86400000, yes = Date.parse(lt.getAttribute('data-yes') + 'T12:00:00Z'), jan = Date.parse(lt.getAttribute('data-jan') + 'T12:00:00Z');
    var a0 = Date.parse('2026-11-01T12:00:00Z'), a1 = Date.parse('2027-01-31T12:00:00Z');
    var X = function (t) { return Math.max(0, Math.min(1, (t - a0) / (a1 - a0))); };
    var wi = $('[data-lt-in]', lt);
    var draw = function () {
      var w = +wi.value, at = yes + w * 7 * day, ok = at <= jan;
      var date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(at));
      $('[data-lt-w]', lt).textContent = w;
      var bar = $('[data-lt-bar]', lt); bar.style.setProperty('--a', X(yes).toFixed(3)); bar.style.setProperty('--b', X(at).toFixed(3));
      $('[data-lt-dot]', lt).style.setProperty('--x', X(at).toFixed(3));
      lt.classList.toggle('late', !ok);
      $('[data-lt-r]', lt).textContent = 'A gym that says yes at the fair has its kit on ' + date + (ok ? ', in time for January.' : ', after the January rush has started.');
    };
    wi.addEventListener('input', draw); draw();
  }

  /* ---------------------------------------------------------------- what more gyms add up to */
  var cc = $('[data-cc]');
  if (cc) {
    var g = $('[data-cc-g]', cc), p = $('[data-cc-p]', cc), e = $('[data-cc-e]', cc);
    var sum = function () {
      var n = +g.value * +p.value;
      $('[data-cc-gv]', cc).textContent = g.value; $('[data-cc-pv]', cc).textContent = p.value;
      $('[data-cc-n]', cc).textContent = fmt(n);
      var price = parseFloat((e.value || '').replace(',', '.'));
      $('[data-cc-rev]', cc).textContent = price > 0 ? ', or €' + fmt(n * price) + ' at €' + (Math.round(price * 100) / 100).toString() + ' a piece' : '';
    };
    [g, p, e].forEach(function (i) { i.addEventListener('input', sum); }); sum();
  }
})();
