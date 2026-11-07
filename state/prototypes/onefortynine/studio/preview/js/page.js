(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BB = window.BB || {}, VENUES = BB.VENUES || [], RENT = BB.RENT || 60, OWN = BB.OWN || 350;
  function fmt(n) { var neg = n < 0; return (neg ? 'minus ' : '') + '£' + Math.round(Math.abs(n)).toLocaleString('en-GB'); }

  /* ---------- the one state, the numbers, carried into the proposal and the form ---------- */
  var S = { v: 1, gpw: 2, price: 20, extra: 0, plan: 'rent', boxes: 1 };
  function preset(i) { var v = VENUES[i]; S.v = i; S.gpw = v.gpw; S.price = v.price; S.extra = 0; }
  preset(1);

  var sel = $('[data-c="venue"]');
  VENUES.forEach(function (v, i) { var o = document.createElement('option'); o.value = i; o.textContent = v.name; sel.appendChild(o); });
  var inputs = { gpw: $('[data-c="gpw"]'), price: $('[data-c="price"]'), extra: $('[data-c="extra"]'), boxes: $('[data-c="boxes"]') };

  function calc() {
    var takings = S.boxes * S.gpw * 52 / 12 * (S.price + S.extra);
    var rent = RENT * S.boxes, own = OWN * S.boxes;
    var net = S.plan === 'rent' ? takings - rent : takings;
    var year = S.plan === 'rent' ? 12 * (takings - rent) : 12 * takings - own;
    var payback = takings > 0 ? Math.ceil(own / takings) : null;
    var series = [];
    for (var m = 1; m <= 12; m++) series.push(S.plan === 'rent' ? m * (takings - rent) : m * takings - own);
    return { takings: takings, rent: rent, own: own, net: net, year: year, payback: payback, series: series, multiple: takings / rent };
  }
  function gpwText(g) {
    if (g >= 1) return (g % 1 ? g.toFixed(2).replace(/0$/, '') : g) + (g === 1 ? ' game' : ' games');
    return '1 every ' + Math.round(1 / g) + ' weeks';
  }

  /* ---------- the chart, twelve months of profit after the box, and dragging it changes the games ---------- */
  var svg = $('[data-chart]'), NS = 'http://www.w3.org/2000/svg';
  function el(n, a, t) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; }
  var W = 640, H = 300, L = 60, R = 16, T = 34, B = 34;
  svg.innerHTML = '<defs><linearGradient id="g-bar" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff2f4e"/><stop offset="1" stop-color="#ffa646"/></linearGradient></defs>';
  var gBars = el('g', {}), gAxis = el('g', {}), bars = [];
  svg.appendChild(gAxis); svg.appendChild(gBars);
  for (var i = 0; i < 12; i++) { var r = el('rect', { rx: 5, x: 0, y: 0, width: 0, height: 0 }); gBars.appendChild(r); bars.push(r); }
  function drawChart(c) {
    var lo = Math.min(0, Math.min.apply(null, c.series)), hi = Math.max(0, Math.max.apply(null, c.series));
    if (hi - lo < 100) hi = lo + 100;
    var span = hi - lo, plotH = H - T - B, bw = (W - L - R) / 12, gap = bw * 0.26;
    var y = function (v) { return T + (hi - v) / span * plotH; };
    gAxis.innerHTML = '';
    gAxis.appendChild(el('line', { class: 'zero', x1: L, x2: W - R, y1: y(0), y2: y(0) }));
    gAxis.appendChild(el('text', { x: L - 8, y: y(0) + 4, 'text-anchor': 'end' }, '£0'));
    gAxis.appendChild(el('text', { x: L - 8, y: T + 4, 'text-anchor': 'end' }, fmt(hi).replace('minus ', '-')));
    if (lo < 0) gAxis.appendChild(el('text', { x: L - 8, y: H - B + 4, 'text-anchor': 'end' }, '-' + fmt(-lo)));
    c.series.forEach(function (v, k) {
      var x = L + k * bw + gap / 2, top = y(Math.max(v, 0)), h = Math.max(2, Math.abs(y(v) - y(0)));
      bars[k].setAttribute('x', x.toFixed(1)); bars[k].setAttribute('width', (bw - gap).toFixed(1));
      bars[k].setAttribute('y', (v >= 0 ? top : y(0)).toFixed(1)); bars[k].setAttribute('height', h.toFixed(1));
      bars[k].setAttribute('class', v >= 0 ? 'bar-p' : 'bar-n');
      if ([0, 2, 5, 8, 11].indexOf(k) > -1) gAxis.appendChild(el('text', { x: x + (bw - gap) / 2, y: H - 10, 'text-anchor': 'middle' }, 'm' + (k + 1)));
    });
    if (S.plan === 'own' && c.payback && c.payback <= 12) {
      var k = c.payback - 1, x = L + k * bw + bw / 2;
      gAxis.appendChild(el('text', { class: 'pay', x: Math.min(Math.max(x, L + 60), W - R - 60), y: 20, 'text-anchor': 'middle' }, 'Paid off in month ' + c.payback));
    }
  }
  var dragY = null, dragG = 0;
  svg.addEventListener('pointerdown', function (e) { dragY = e.clientY; dragG = S.gpw; svg.setPointerCapture(e.pointerId); });
  svg.addEventListener('pointermove', function (e) {
    if (dragY === null) return;
    var g = Math.round((dragG + (dragY - e.clientY) / 14 * 0.25) * 4) / 4;
    g = Math.max(0.25, Math.min(14, g));
    if (g !== S.gpw) { S.gpw = g; render(); }
  });
  svg.addEventListener('pointerup', function () { dragY = null; });
  svg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); S.gpw = Math.max(0.25, Math.min(14, S.gpw + (e.key === 'ArrowUp' ? 0.25 : -0.25))); render(); }
  });
  svg.setAttribute('tabindex', '0');

  /* ---------- render everything that reads the state ---------- */
  function fill(inp) { var p = (inp.value - inp.min) / (inp.max - inp.min) * 100; inp.style.setProperty('--f', p + '%'); }
  function render() {
    var c = calc(), v = VENUES[S.v];
    sel.value = S.v;
    inputs.gpw.value = S.gpw; inputs.price.value = S.price; inputs.extra.value = S.extra; inputs.boxes.value = S.boxes;
    Object.keys(inputs).forEach(function (k) { fill(inputs[k]); });
    $('[data-o="gpw"]').textContent = gpwText(S.gpw);
    $('[data-o="price"]').textContent = fmt(S.price);
    $('[data-o="extra"]').textContent = fmt(S.extra);
    $('[data-o="boxes"]').textContent = S.boxes;
    $$('[data-plan-v]').forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.planV === S.plan)); });
    $('[data-o="month"]').textContent = fmt(c.takings);
    var lead;
    if (S.plan === 'rent') lead = c.net > 0 ? 'That\'s ' + fmt(c.net) + ' a month after the rent, ' + c.multiple.toFixed(1).replace('.0', '') + ' times what the rent costs.' : 'That\'s below the rent at these numbers. Run more games, or own it and it pays for itself in month ' + c.payback + '.';
    else lead = c.payback ? 'Own ' + (S.boxes > 1 ? 'them' : 'it') + ' and ' + (S.boxes > 1 ? 'they pay' : 'it pays') + ' for ' + (S.boxes > 1 ? 'themselves' : 'itself') + ' in month ' + c.payback + '. After that, every game is yours.' : 'Set some games to see when it pays for itself.';
    $('[data-o="lead"]').textContent = lead;
    drawChart(c);
    // the proposal
    $('[data-p="venue"]').textContent = v.name.replace(/^A /, 'a ');
    $('[data-p="date"]').textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    $('[data-p="headline"]').innerHTML = 'About <b>' + fmt(c.takings) + ' a month</b> from ' + S.boxes + (S.boxes > 1 ? ' boxes' : ' box') + ', and ' + fmt(c.year) + ' in the first year after the box.';
    $('[data-p="plan"]').textContent = S.plan === 'rent' ? 'Rent, £60 a box a month' : 'Own, £350 a box once';
    $('[data-p="games"]').textContent = gpwText(S.gpw) + ' a week a box, ' + fmt(S.price) + ' a game' + (S.extra ? ' plus ' + fmt(S.extra) + ' extra' : '');
    $('[data-p="month"]').textContent = fmt(c.takings);
    $('[data-p="cost"]').textContent = S.plan === 'rent' ? fmt(c.rent) + ' a month' : fmt(c.own) + ' once';
    $('[data-p="year"]').textContent = fmt(c.year);
    $('[data-p="payback"]').textContent = S.plan === 'rent' ? (c.net > 0 ? 'From month one, nothing upfront' : 'Not at these numbers') : (c.payback ? 'Month ' + c.payback : 'Not at these numbers');
    $('[data-p="how"]').innerHTML = v.items.map(function (it) { return '<li><b>' + it[0] + '.</b> ' + it[1] + '</li>'; }).join('');
    // the form, filled in already
    var sum = 'Your numbers. <b>' + v.name + '</b>, ' + S.boxes + (S.boxes > 1 ? ' boxes' : ' box') + ' to ' + S.plan + ', ' + gpwText(S.gpw) + ' a week at ' + fmt(S.price) + ', about <b>' + fmt(c.takings) + ' a month</b>.';
    $$('[data-sum]').forEach(function (p) { p.innerHTML = sum; });
    $$('[data-fill="venue"]').forEach(function (i) { i.value = v.name; });
    $$('[data-fill="plan"]').forEach(function (i) { i.value = S.boxes + (S.boxes > 1 ? ' boxes, ' : ' box, ') + (S.plan === 'rent' ? 'rent' : 'own'); });
  }
  sel.addEventListener('change', function () { preset(+sel.value); render(); });
  ['gpw', 'price', 'extra', 'boxes'].forEach(function (k) { inputs[k].addEventListener('input', function () { S[k] = +inputs[k].value; render(); }); });
  $$('[data-plan-v]').forEach(function (b) { b.addEventListener('click', function () { S.plan = b.dataset.planV; render(); }); });
  window.addEventListener('bb:venue', function (e) { preset(e.detail); render(); });

  /* ---------- share, print ---------- */
  function encode() { return btoa(JSON.stringify(S)).replace(/=+$/, ''); }
  $('[data-share]').addEventListener('click', function () {
    var url = location.href.split('#')[0] + '#p=' + encode(), note = $('[data-share-note]');
    function done() { note.textContent = 'Link copied. Whoever opens it sees this proposal with your numbers.'; }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { note.textContent = url; });
    else note.textContent = url;
  });
  $('[data-print]').addEventListener('click', function () { window.print(); });
  if (location.hash.indexOf('#p=') === 0) {
    try { var o = JSON.parse(atob(location.hash.slice(3))); ['v', 'gpw', 'price', 'extra', 'boxes'].forEach(function (k) { if (typeof o[k] === 'number') S[k] = o[k]; }); if (o.plan === 'own' || o.plan === 'rent') S.plan = o.plan; } catch (e) {}
    setTimeout(function () { $('#proposal').scrollIntoView(); }, 50);
  }

  /* ---------- the form, two speeds ---------- */
  $$('[data-tab]').forEach(function (t) {
    t.addEventListener('click', function () {
      $$('[data-tab]').forEach(function (x) { x.setAttribute('aria-selected', String(x === t)); });
      $$('[data-form]').forEach(function (f) { f.hidden = f.dataset.form !== t.dataset.tab; });
    });
  });
  $$('[data-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', f).forEach(function (i) {
        var bad = !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));
        i.setAttribute('aria-invalid', String(bad)); if (bad && ok) { i.focus(); ok = false; }
      });
      if (!ok) return;
      $$('[data-form]').forEach(function (x) { x.hidden = true; });
      $('.tabs').hidden = true;
      var s = $('[data-sent]'); s.hidden = false; s.focus();
    });
  });

  /* ---------- reveals, and the tile films only play in view ---------- */
  var rv = $$('.tile, .controls, .chart-card, .doc, .qa, .game, .who-in, .get-in');
  rv.forEach(function (e) { e.classList.add('reveal'); });
  if (RM || !('IntersectionObserver' in window)) rv.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: 0.12 });
    rv.forEach(function (e) { io.observe(e); });
  }
  var loops = $$('[data-loop]');
  if (!RM && 'IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { var p = x.target.play(); if (p && p.catch) p.catch(function () {}); } else x.target.pause(); }); }, { threshold: 0.3 });
    loops.forEach(function (v) { vo.observe(v); });
  }

  render();
})();
