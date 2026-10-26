/* The Honey It's Handled plan. The field of weddings, the wedding year, the rivals switch, the money scale and the built
   frames. Every sum is worked out here from the numbers the build wrote into the page, which all come from
   data/plan.json. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = document.documentElement.classList.contains('rm');
  var num = function (n) { return Math.round(n).toLocaleString('en-GB'); };
  var eur = function (v) { return '€' + num(v); };
  var press = function (btns, on) { btns.forEach(function (b) { b.setAttribute('aria-pressed', b === on ? 'true' : 'false'); }); };
  var fill = function (el) { el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100).toFixed(2) + '%'); };
  var json = function (root) { return JSON.parse($('script[type="application/json"]', root).textContent); };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* ------------------------------------------------ II, the field of weddings */
  var fld = $('[data-field]');
  if (fld) {
    var F = json(fld), cv = $('#field'), ctx = cv.getContext && cv.getContext('2d');
    var scB = $$('[data-scope]', fld), kIn = $('#fld-k');
    var st = { scope: F.def, k: +kIn.value, born: {} };
    var scope = function () { return F.scopes.filter(function (s) { return s.key === st.scope; })[0]; };
    /* the same layout and the same picks as plan.py */
    var layout = function (n, w, h) { var cols = Math.max(1, Math.ceil(Math.sqrt(n * w / h))), rows = Math.ceil(n / cols); return { cols: cols, rows: rows, p: Math.min(w / cols, h / rows) }; };
    var picks = function (n, k) { var out = [], s = 7, seen = {}; while (out.length < Math.min(k, n)) { s = (s * 48271) % 2147483647; var i = s % n; if (!seen[i]) { seen[i] = 1; out.push(i); } } return out; };
    var W = 0, H = 0, raf = 0;
    var draw = function (now) {
      raf = 0;
      if (!ctx) return;
      var r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (Math.round(r.width * dpr) !== cv.width || Math.round(r.height * dpr) !== cv.height) { cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); }
      W = r.width; H = r.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      var n = scope().n, L = layout(n, W, H), ox = (W - L.cols * L.p) / 2, oy = (H - L.rows * L.p) / 2;
      var dr = Math.max(0.9, L.p * 0.32), mine = picks(n, st.k), set = {};
      mine.forEach(function (i) { set[i] = 1; });
      ctx.fillStyle = 'rgba(36,20,20,.58)';
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        if (set[i]) continue;
        var x = ox + (i % L.cols + 0.5) * L.p, y = oy + (Math.floor(i / L.cols) + 0.5) * L.p;
        ctx.moveTo(x + dr, y); ctx.arc(x, y, dr, 0, 6.2832);
      }
      ctx.fill();
      var t = now || performance.now(), busy = false;
      mine.forEach(function (i) {
        var x = ox + (i % L.cols + 0.5) * L.p, y = oy + (Math.floor(i / L.cols) + 0.5) * L.p;
        var R = Math.max(4.5, L.p * 0.9), a = 1;
        if (!reduce && st.born[i]) { a = Math.max(0, Math.min(1, (t - st.born[i]) / 420)); if (a < 1) busy = true; }
        var e = 1 - Math.pow(1 - a, 3);
        ctx.strokeStyle = 'rgba(150,33,34,' + (0.9 * e) + ')'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(x, y, R * (1.2 + e), 0, 6.2832); ctx.stroke();
        ctx.fillStyle = '#962122'; ctx.beginPath(); ctx.arc(x, y, R * e, 0, 6.2832); ctx.fill();
      });
      if (busy) raf = requestAnimationFrame(draw);
    };
    var redraw = function () { if (!raf) raf = requestAnimationFrame(draw); };
    var say = function () {
      var s = scope(), one = Math.round(s.n / st.k);
      $('[data-o="k"]', fld).textContent = st.k; $('[data-o="k2"]', fld).textContent = st.k;
      $('[data-o="one"]', fld).textContent = num(one); $('[data-o="where"]', fld).textContent = s['in'];
      $('[data-o="n"]', fld).textContent = num(s.n);
      kIn.setAttribute('aria-valuetext', st.k + (st.k === 1 ? ' couple' : ' couples'));
      fld.setAttribute('data-one', one); fld.setAttribute('data-n', s.n); fld.setAttribute('data-k', st.k);
      fill(kIn);
    };
    var mark = function (old, k) {
      var now = performance.now(), before = {}, s = scope();
      picks(s.n, old).forEach(function (i) { before[i] = 1; });
      st.born = {}; picks(s.n, k).forEach(function (i) { if (!before[i]) st.born[i] = now; });
    };
    kIn.addEventListener('input', function () { var old = st.k; st.k = +kIn.value; mark(old, st.k); say(); redraw(); });
    scB.forEach(function (b) { b.addEventListener('click', function () { st.scope = b.getAttribute('data-scope'); press(scB, b); st.born = {}; say(); redraw(); }); });
    window.addEventListener('resize', redraw);
    say(); redraw();
  }

  /* ------------------------------------------------ III, the wedding year */
  var cal = $('[data-cal]');
  if (cal) {
    var C = json(cal), yB = $$('[data-year]', cal), lIn = $('#cal-l');
    var cs = { y: +$('[data-year][aria-pressed="true"]', cal).getAttribute('data-year'), l: +lIn.value };
    var nowIx = C.now.y * 12 + (C.now.m - 1), tot = C.months.reduce(function (a, b) { return a + b; }, 0);
    var bookIx = function (y, m, l) { return y * 12 + (m - 1) - l; };
    var lab = function (ix) { return MON[ix % 12] + ' ' + String(Math.floor(ix / 12)).slice(2); };
    var calc = function () {
      var got = 0;
      $$('.cb', cal).forEach(function (g) {
        var i = +g.getAttribute('data-i'), ix = bookIx(cs.y, i + 1, cs.l), on = ix <= nowIx;
        if (on) got += C.months[i];
        g.classList.toggle('on', on);
        $('.ck', g).textContent = lab(ix);
        var tr = $('[data-t="' + i + '"]', cal), rr = $('[data-r="' + i + '"]', cal);
        if (tr) tr.textContent = lab(ix);
        if (rr) rr.textContent = on ? 'Reached' : 'Not yet';
        var th = tr && tr.parentNode.firstChild; if (th) th.textContent = MON[i] + ' ' + cs.y;
      });
      var out;
      if (got === 0) { var f = bookIx(cs.y, 1, cs.l); out = 'Booked ' + cs.l + ' months ahead, no ' + cs.y + ' wedding has reached that point yet. The first does in ' + MON[f % 12] + ' ' + Math.floor(f / 12) + '.'; }
      else if (got === tot) out = 'Booked ' + cs.l + ' months ahead, every ' + cs.y + ' wedding has reached that point, all ' + num(tot) + ' in a year like 2024.';
      else out = 'Booked ' + cs.l + ' months ahead, ' + num(got) + ' of ' + num(tot) + ' weddings in a year like 2024, ' + Math.round(got / tot * 100) + '%, have reached that point for ' + cs.y + '.';
      $('[data-o="out"]', cal).textContent = out;
      $('[data-o="l"]', cal).textContent = cs.l;
      lIn.setAttribute('aria-valuetext', cs.l + ' months');
      cal.setAttribute('data-got', got);
      fill(lIn);
    };
    lIn.addEventListener('input', function () { cs.l = +lIn.value; calc(); });
    yB.forEach(function (b) { b.addEventListener('click', function () { cs.y = +b.getAttribute('data-year'); press(yB, b); calc(); }); });
    calc();
  }

  /* ------------------------------------------------ IV, who else they see */
  var rv = $('[data-rivals]');
  if (rv) {
    var R = json(rv), vB = $$('[data-view]', rv), bars = $('[data-o="bars"]', rv);
    var show = function (key, label) {
      $$('.rb', bars).forEach(function (li, n) {
        var row = R.rows[n], v = row[key];
        li.classList.toggle('nr', v === null);
        li.setAttribute('data-v', v === null ? '' : v);
        $('.rb-t i', li).style.setProperty('--x', v === null ? 0 : (v / R.max[key]).toFixed(4));
        $('.rb-v', li).textContent = v === null ? 'Not read' : num(v);
      });
      $('[data-o="cap"]', rv).textContent = label;
      rv.setAttribute('data-view-on', key);
    };
    vB.forEach(function (b) { b.addEventListener('click', function () { press(vB, b); show(b.getAttribute('data-view'), b.textContent); }); });
  }

  /* ------------------------------------------------ V, the money */
  var mo = $('[data-money]');
  if (mo) {
    var share = +mo.getAttribute('data-share'), ax = +mo.getAttribute('data-max'), bIn = $('#mo-b'), me = $('[data-o="me"]', mo);
    var upd = function () {
      var b = +bIn.value, fee = b * share, x = Math.min(fee, ax) / ax;
      me.style.setProperty('--x', x.toFixed(4));
      me.classList.toggle('flip', x > 0.72);
      $('[data-o="fee"]', mo).textContent = eur(fee);
      $('[data-o="b"]', mo).textContent = eur(b);
      $('[data-o="out"]', mo).innerHTML = 'Wedding Dreamworx\'s 15% of ' + eur(b) + ' is <b>' + eur(fee) + '</b>.';
      bIn.setAttribute('aria-valuetext', eur(b));
      mo.setAttribute('data-fee', Math.round(fee));
      fill(bIn);
    };
    bIn.addEventListener('input', upd); upd();
  }

  /* ------------------------------------------------ VII, the built frames follow the captions */
  var bf = $('[data-bf]');
  if (bf) {
    var caps = $$('.bc li', bf), frames = $$('.bf-i', bf), cur = -1, btick = false;
    var pick = function () {
      btick = false; var line = window.innerHeight * 0.6, i = 0;
      caps.forEach(function (c, n) { if (c.getBoundingClientRect().top < line) i = n; });
      if (i === cur) return; cur = i;
      caps.forEach(function (c, n) { c.classList.toggle('on', n === i); });
      frames.forEach(function (f, n) { f.classList.toggle('on', n === i); });
    };
    window.addEventListener('scroll', function () { if (!btick) { btick = true; requestAnimationFrame(pick); } }, { passive: true });
    window.addEventListener('resize', pick);
    pick();
  }
})();
