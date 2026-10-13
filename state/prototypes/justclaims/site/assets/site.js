(function () {
  'use strict';
  var d = document, w = window;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || d).querySelectorAll(s)); }
  var body = d.body;

  /* dates are arithmetic only. Calendar days from the visitor's own local date to the application date. */
  var APPLIES = body.getAttribute('data-applies') || '2027-10-23', FORCE = body.getAttribute('data-force') || '2026-10-22';
  function utc(s) { var p = s.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  function todayUTC() { var n = new Date(); return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()); }
  function daysTo(s) { return Math.round((utc(s) - todayUTC()) / 864e5); }
  w.JC = { utc: utc, daysTo: daysTo, todayUTC: todayUTC, reduce: reduce, $: $, $$: $$ };
  var left = Math.max(0, daysTo(APPLIES));
  $$('[data-days-n]').forEach(function (e) { e.textContent = left; e.setAttribute('data-final', left); });
  $$('[data-force-n]').forEach(function (e) { e.textContent = Math.max(0, daysTo(FORCE)); });

  /* mobile menu, kept outside the header so position fixed isn't trapped */
  var mb = $('.menu-btn'), mn = $('#mnav');
  if (mb && mn) {
    mb.addEventListener('click', function () { var o = mn.classList.toggle('open'); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); body.style.overflow = o ? 'hidden' : ''; });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mn.classList.contains('open')) { mn.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); body.style.overflow = ''; mb.focus(); } });
  }
  var hdr = $('.hdr');
  function hs() { if (hdr) hdr.classList.toggle('scrolled', w.scrollY > 8); }
  hs(); w.addEventListener('scroll', hs, { passive: true });

  /* reveal on scroll, from a bounding rect check so nothing depends on IntersectionObserver quirks */
  var rv = $$('.rv');
  function check() { var h = w.innerHeight; rv = rv.filter(function (el) { if (el.getBoundingClientRect().top < h - 40) { el.classList.add('in'); return false; } return true; }); }
  check(); w.addEventListener('scroll', check, { passive: true }); w.addEventListener('resize', check);


  /* film loops are decorative. They load only when the screen is wide enough and the visitor has not asked for less motion or less data, and they play only while in view. */
  var saveData = navigator.connection && navigator.connection.saveData;
  var vids = $$('video[data-src]');
  if (vids.length && !reduce && !saveData) {
    vids.forEach(function (v) {
      var min = +(v.getAttribute('data-min') || 0); if (min && w.innerWidth < min) return;
      var loaded = false, wn = v.closest('.win');
      if (wn) { v.addEventListener('playing', function () { wn.classList.add('vid'); }); v.addEventListener('error', function () { wn.classList.remove('vid'); }); }
      function seen() { var r = v.getBoundingClientRect(); return r.bottom > 0 && r.top < w.innerHeight; }
      function tick() {
        if (seen()) { if (!loaded) { v.src = (v.getAttribute('data-webm') && v.canPlayType('video/webm; codecs="vp9"')) ? v.getAttribute('data-webm') : v.getAttribute('data-src'); loaded = true; } if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } v.classList.add('on'); }
        else if (loaded && !v.paused) v.pause();
      }
      tick(); w.addEventListener('scroll', tick, { passive: true }); w.addEventListener('resize', tick);
    });
  }

  /* year dial */
  var yd = $('#yeardial');
  if (yd) {
    var N = +yd.getAttribute('data-n'), start = yd.getAttribute('data-start');
    var idx = Math.max(0, Math.round((todayUTC() - utc(start)) / 864e5));
    var s0 = idx / N * 360, end = Math.max(0, (N - idx) / N * 360);
    yd.style.setProperty('--s', s0.toFixed(2) + 'deg');
    var num = $('[data-days-n]', yd), target = left;
    function setA(a) { yd.style.setProperty('--a', a.toFixed(2) + 'deg'); }
    if (reduce) { setA(end); }
    else {
      setA(0); if (num) num.textContent = '0';
      var t0 = null, dur = 2600;
      var ease = function (t) { return 1 - Math.pow(1 - t, 3.2); };
      var run = function (ts) {
        if (t0 === null) t0 = ts; var p = Math.min(1, (ts - t0) / dur), e = ease(p);
        setA(end * e); if (num) num.textContent = Math.round(target * e);
        if (p < 1) requestAnimationFrame(run); else { setA(end); if (num) num.textContent = target; }
      };
      setTimeout(function () { requestAnimationFrame(run); }, 350);
    }
    /* hover or touch the ring to read any day */
    var hit = $('[data-hit]', yd), tip = $('[data-tip]', yd);
    var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    function show(ev) {
      var r = yd.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var px = (ev.clientX || (ev.touches && ev.touches[0].clientX)), py = (ev.clientY || (ev.touches && ev.touches[0].clientY));
      var dx = px - cx, dy = py - cy, rad = Math.sqrt(dx * dx + dy * dy) / (r.width / 2);
      if (rad < .52 || rad > 1.02) { tip.classList.remove('on'); return; }
      var deg = (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360, i = Math.min(N - 1, Math.floor(deg / 360 * N));
      var dt = new Date(utc(start) + i * 864e5), toApply = N - i;
      tip.textContent = DOW[dt.getUTCDay()] + ' ' + dt.getUTCDate() + ' ' + MON[dt.getUTCMonth()] + ' ' + dt.getUTCFullYear() + ', ' + toApply + ' days before it applies';
      var a = (i + .5) / N * 2 * Math.PI, rr = .93 * r.width / 2;
      tip.style.left = (r.width / 2 + Math.sin(a) * rr) + 'px'; tip.style.top = (r.height / 2 - Math.cos(a) * rr) + 'px'; tip.classList.add('on');
    }
    if (hit) { hit.addEventListener('pointermove', show); hit.addEventListener('pointerdown', show); hit.addEventListener('pointerleave', function () { tip.classList.remove('on'); }); }
  }

  /* forms, a failed or empty field is shown, a sent form says so */
  $$('form[data-form]').forEach(function (fm) {
    fm.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      $$('[required]', fm).forEach(function (i) {
        var wrap = i.closest('.f'), bad = !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));
        if (wrap) wrap.classList.toggle('bad', bad); if (bad && ok) { i.focus(); ok = false; }
      });
      if (!ok) return;
      var data = new URLSearchParams(new FormData(fm)).toString(), btn = $('button[type=submit]', fm); if (btn) btn.disabled = true;
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data }).then(function (res) {
        if (!res.ok) throw 0; fm.style.display = 'none'; var s = $('.sent'); if (s) s.classList.add('on');
      }).catch(function () { if (btn) btn.disabled = false; var er = $('.formerr', fm); if (er) er.style.display = 'block'; });
    });
  });
})();
