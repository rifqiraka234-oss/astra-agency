(function () {
  'use strict';
  var d = document, w = window, body = d.body;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || d).querySelectorAll(s)); }

  /* dates are arithmetic only, calendar days from the visitor's own date */
  var APPLIES = body.getAttribute('data-applies') || '2027-10-23';
  function utc(s) { var p = s.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  function todayUTC() { var n = new Date(); return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()); }
  function daysTo(s) { return Math.round((utc(s) - todayUTC()) / 864e5); }
  w.JC = { utc: utc, daysTo: daysTo, todayUTC: todayUTC, reduce: reduce, $: $, $$: $$ };
  var left = Math.max(0, daysTo(APPLIES));
  $$('[data-days-n]').forEach(function (e) { e.textContent = left; });

  /* nav */
  var nav = $('[data-nav]'), mb = $('.menu'), mn = $('#mnav');
  function hs() { if (nav) nav.classList.toggle('scrolled', w.scrollY > 10); }
  hs(); w.addEventListener('scroll', hs, { passive: true });
  if (mb && mn) {
    mb.addEventListener('click', function () { var o = mn.classList.toggle('open'); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); body.style.overflow = o ? 'hidden' : ''; });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mn.classList.contains('open')) { mn.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); body.style.overflow = ''; mb.focus(); } });
  }

  /* reveal, from a bounding rect check */
  var rv = $$('.rv,.split');
  function check() { var h = w.innerHeight; rv = rv.filter(function (el) { if (el.getBoundingClientRect().top < h - 30) { el.classList.add('in'); return false; } return true; }); }
  check(); w.addEventListener('scroll', check, { passive: true }); w.addEventListener('resize', check);

  /* the sky, dusk at the top of the page, night through the middle, first light at the end */
  var sky = $('.sky');
  var STOPS = [
    [0.00, [240, 138, 108, .30], [255, 181, 71, .14], [18, 14, 25], 78, 6, 18, 96],
    [0.18, [127, 216, 240, .16], [102, 203, 176, .16], [8, 18, 26], 70, 10, 24, 92],
    [0.45, [102, 203, 176, .09], [40, 80, 130, .16], [5, 9, 12], 30, 20, 80, 80],
    [0.75, [102, 203, 176, .13], [127, 216, 240, .09], [6, 15, 17], 80, 30, 15, 85],
    [1.00, [255, 205, 150, .26], [143, 240, 210, .20], [12, 24, 26], 50, 104, 50, 0]
  ];
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mixc(a, b, t, alpha) { var r = Math.round(lerp(a[0], b[0], t)), g = Math.round(lerp(a[1], b[1], t)), bl = Math.round(lerp(a[2], b[2], t)); return alpha ? 'rgba(' + r + ',' + g + ',' + bl + ',' + lerp(a[3], b[3], t).toFixed(3) + ')' : 'rgb(' + r + ',' + g + ',' + bl + ')'; }
  var skyQ = false;
  function skyUpdate() {
    skyQ = false; if (!sky) return;
    var H = Math.max(1, d.documentElement.scrollHeight - w.innerHeight), p = Math.min(1, Math.max(0, w.scrollY / H)), i = 0;
    while (i < STOPS.length - 2 && p > STOPS[i + 1][0]) i++;
    var a = STOPS[i], b = STOPS[i + 1], t = (p - a[0]) / (b[0] - a[0]); t = t * t * (3 - 2 * t);
    var st = sky.style;
    st.setProperty('--c1', mixc(a[1], b[1], t, 1)); st.setProperty('--c2', mixc(a[2], b[2], t, 1)); st.setProperty('--c3', mixc(a[3], b[3], t));
    st.setProperty('--x1', lerp(a[4], b[4], t).toFixed(1) + '%'); st.setProperty('--y1', lerp(a[5], b[5], t).toFixed(1) + '%');
    st.setProperty('--x2', lerp(a[6], b[6], t).toFixed(1) + '%'); st.setProperty('--y2', lerp(a[7], b[7], t).toFixed(1) + '%');
  }
  skyUpdate(); w.addEventListener('scroll', function () { if (!skyQ) { skyQ = true; requestAnimationFrame(skyUpdate); } }, { passive: true }); w.addEventListener('resize', skyUpdate);

  /* film loops are decorative. They load only on a wide enough screen without reduced motion or data saver, and play only in view */
  var saveData = navigator.connection && navigator.connection.saveData;
  if (!reduce && !saveData) {
    $$('video[data-src]').forEach(function (v) {
      var min = +(v.getAttribute('data-min') || 0); if (min && w.innerWidth < min) return;
      var loaded = false;
      v.addEventListener('playing', function () { v.classList.add('on'); });
      function seen() { var r = v.getBoundingClientRect(); return r.bottom > 0 && r.top < w.innerHeight; }
      function tick() {
        if (seen()) {
          if (!loaded) { v.src = (v.getAttribute('data-webm') && v.canPlayType('video/webm; codecs="vp9"')) ? v.getAttribute('data-webm') : v.getAttribute('data-src'); loaded = true; }
          if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
        } else if (loaded && !v.paused) v.pause();
      }
      tick(); w.addEventListener('scroll', tick, { passive: true }); w.addEventListener('resize', tick);
    });
  }

  /* the readiness ring, a decorative sweep, not a result */
  var rt = $('[data-rt]');
  if (rt && !reduce) {
    var segs = $$('.wd', rt), step = 0;
    (function tick() {
      var r = rt.getBoundingClientRect();
      if (r.bottom > 0 && r.top < w.innerHeight) { step = (step + 1) % (segs.length + 6); segs.forEach(function (s, i) { s.setAttribute('class', 'wd' + (i < step ? ' y' : '')); }); }
      setTimeout(tick, step === 0 ? 900 : 240);
    })();
  }
})();
