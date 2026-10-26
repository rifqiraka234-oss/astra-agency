/* The plan's art layer. Her HH monogram in moving satin made of her three colours, a satin ground under the red
   chapter, a ribbon that draws itself down the dated timeline, and the small HH in the header that fills with red as the
   plan is read. The plan is a reading page, so the moving satin starts on the first scroll, touch, key or pointer move,
   pauses off screen and in a hidden tab, and never runs under reduced motion. Every entry point checks one ready flag. */
(function () {
  'use strict';
  var doc = document.documentElement, reduce = doc.classList.contains('rm');
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ------------------------------------------------ the header monogram fills as the plan is read */
  var hh = $('.hb-hh'), rtick = false;
  var readNow = function () {
    rtick = false;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight), p = Math.min(1, Math.max(0, window.scrollY / max));
    if (hh) hh.style.setProperty('--read', p.toFixed(4));
  };

  /* ------------------------------------------------ the ribbon down the timeline */
  var tl = $('[data-tline]');
  var ribbonNow = function () {
    if (!tl || reduce) return;
    var r = tl.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / Math.max(1, r.height)));
    tl.style.setProperty('--rib', p.toFixed(4));
  };
  if (tl && !reduce) tl.style.setProperty('--rib', '0');

  window.addEventListener('scroll', function () { if (!rtick) { rtick = true; requestAnimationFrame(function () { readNow(); ribbonNow(); }); } }, { passive: true });
  window.addEventListener('resize', function () { readNow(); ribbonNow(); });
  readNow(); ribbonNow();

  /* ------------------------------------------------ reveals */
  var rvs = $$('.rv');
  if (rvs.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rvs.forEach(function (el) { io.observe(el); });
  } else rvs.forEach(function (el) { el.classList.add('in'); });

  /* ------------------------------------------------ satin, started on the first gesture */
  if (reduce) return;
  var ready = false, started = false;
  var layers = [];
  /* Silk, not blobs. A ramp of her colours laid along a slowly turning line, its value made of a few sine waves that
     drift at different speeds, so the folds move like satin. A second, crossing layer darkens the troughs. */
  var lerp = function (a, b, k) { return a + (b - a) * k; };
  var rgb = function (h) { var n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  var ramp = function (stops) { return stops.map(function (s) { return [s[0], rgb(s[1])]; }); };
  var at = function (R, v) {
    for (var i = 1; i < R.length; i++) if (v <= R[i][0]) {
      var k = (v - R[i - 1][0]) / Math.max(1e-6, R[i][0] - R[i - 1][0]), a = R[i - 1][1], b = R[i][1];
      return 'rgb(' + Math.round(lerp(a[0], b[0], k)) + ',' + Math.round(lerp(a[1], b[1], k)) + ',' + Math.round(lerp(a[2], b[2], k)) + ')';
    }
    var l = R[R.length - 1][1]; return 'rgb(' + l[0] + ',' + l[1] + ',' + l[2] + ')';
  };
  /* off white, blue and red, her palette, with a deeper and a lighter red to give the fabric its depth */
  var LIGHT = ramp([[0, '#4E0D0F'], [0.34, '#7A1A1C'], [0.55, '#962122'], [0.74, '#C2605A'], [0.88, '#F2DCD7'], [0.95, '#F9F7F6'], [1, '#D3E9EE']]);
  /* under text on the red chapter only dark reds, so the words keep their contrast */
  var DEEP = ramp([[0, '#6A1416'], [0.5, '#8A1E20'], [0.8, '#962122'], [1, '#A12A29']]);

  function Satin(canvas, R, folds, scale) {
    this.c = canvas; this.x = canvas.getContext('2d'); this.R = R; this.f = folds;
    this.scale = scale; this.vis = false; this.seed = Math.random() * 10;
  }
  Satin.prototype.size = function () {
    var r = this.c.getBoundingClientRect(), w = Math.max(2, Math.round(r.width * this.scale)), h = Math.max(2, Math.round(r.height * this.scale));
    if (w !== this.c.width || h !== this.c.height) { this.c.width = w; this.c.height = h; }
  };
  Satin.prototype.draw = function (t) {
    var x = this.x, w = this.c.width, h = this.c.height, s = this.seed, f = this.f, N = 40;
    var ang = 0.62 + 0.16 * Math.sin(t * 0.00005 + s), cx = w / 2, cy = h / 2, L = Math.hypot(w, h) / 2;
    var dx = Math.cos(ang) * L, dy = Math.sin(ang) * L;
    var g = x.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    for (var i = 0; i <= N; i++) {
      var u = i / N;
      var v = 0.52 + 0.30 * Math.sin(u * f[0] + t * 0.00042 + s) + 0.14 * Math.sin(u * f[1] - t * 0.00061 + s * 1.7) + 0.06 * Math.sin(u * f[2] + t * 0.0011);
      g.addColorStop(u, at(this.R, Math.min(1, Math.max(0, v))));
    }
    x.globalCompositeOperation = 'source-over'; x.fillStyle = g; x.fillRect(0, 0, w, h);
    /* the crossing fold, darkening where the cloth turns away */
    var a2 = ang + 1.35, ex = Math.cos(a2) * L, ey = Math.sin(a2) * L;
    var g2 = x.createLinearGradient(cx - ex, cy - ey, cx + ex, cy + ey);
    for (var j = 0; j <= 16; j++) {
      var q = j / 16, d = 0.5 + 0.5 * Math.sin(q * 9.4 + t * 0.00033 + s * 0.6);
      g2.addColorStop(q, 'rgba(40,6,8,' + (0.32 * d * d).toFixed(3) + ')');
    }
    x.fillStyle = g2; x.fillRect(0, 0, w, h);
  };

  var hero = $('#satin'), bg = $('#satin2');
  if (hero && hero.getContext) layers.push(new Satin(hero, LIGHT, [13.5, 29, 61], 0.5));
  if (bg && bg.getContext) layers.push(new Satin(bg, DEEP, [7.5, 17, 35], 0.22));
  if (!layers.length) return;
  ready = true;

  var last = 0, slow = 0, step = 33, raf = 0;
  var loop = function (t) {
    raf = 0;
    if (document.hidden) return;
    var any = false;
    if (t - last >= step) {
      var t0 = performance.now();
      layers.forEach(function (L) { if (L.vis) { L.draw(t); any = true; } });
      var cost = performance.now() - t0;
      if (cost > 12) { slow++; if (slow > 20 && step < 66) { step = 66; layers.forEach(function (L) { L.scale *= 0.75; L.size(); }); } } else slow = 0;
      last = t;
    } else any = layers.some(function (L) { return L.vis; });
    if (any) raf = requestAnimationFrame(loop);
  };
  var kick = function () { if (ready && started && !raf) raf = requestAnimationFrame(loop); };
  var vio = new IntersectionObserver(function (es) {
    es.forEach(function (e) { layers.forEach(function (L) { if (L.c === e.target) L.vis = e.isIntersecting; }); });
    kick();
  });
  var start = function () {
    if (!ready || started) return;
    started = true;
    layers.forEach(function (L) { L.size(); L.draw(performance.now()); vio.observe(L.c); });
    doc.classList.add('art-on');
    kick();
    ['scroll', 'touchstart', 'keydown', 'wheel'].forEach(function (ev) { window.removeEventListener(ev, start); });
  };
  ['scroll', 'touchstart', 'keydown', 'wheel'].forEach(function (ev) { window.addEventListener(ev, start, { passive: true }); });
  window.addEventListener('resize', function () { if (started) layers.forEach(function (L) { L.size(); }); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });
})();
