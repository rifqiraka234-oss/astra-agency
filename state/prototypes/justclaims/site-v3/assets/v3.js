/* v3 core. The day count, the menu, the split flap engine, the live halftone film, charts that ink in. */
(function () {
  'use strict';
  var d = document, w = window, body = d.body;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || d).querySelectorAll(s)); }
  function seen(el, m) { var r = el.getBoundingClientRect(); return r.bottom > -(m || 0) && r.top < w.innerHeight + (m || 0); }

  /* dates are plain arithmetic, calendar days from the visitor's own date */
  var APPLIES = body.getAttribute('data-applies') || '2027-10-23';
  function utc(s) { var p = s.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  function todayUTC() { var n = new Date(); return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()); }
  function daysTo(s) { return Math.round((utc(s) - todayUTC()) / 864e5); }
  var left = Math.max(0, daysTo(APPLIES)), pad3 = ('00' + Math.min(999, left)).slice(-3);
  $$('[data-days-n]').forEach(function (e) { e.textContent = left; });

  /* menu */
  var mb = $('.menu'), mn = $('#mnav');
  function shut() { mn.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); body.style.overflow = ''; }
  if (mb && mn) {
    mb.addEventListener('click', function () { var o = mn.classList.toggle('open'); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); body.style.overflow = o ? 'hidden' : ''; });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mn.classList.contains('open')) { shut(); mb.focus(); } });
    w.addEventListener('resize', function () { if (w.innerWidth > 1180 && mn.classList.contains('open')) shut(); });
  }

  /* ---- split flaps. Each cell has a fixed top and bottom half, and two leaves that fall over them.
     A cell steps through its drum the way a real one does, so a far letter takes longer to arrive. */
  var DRUM = { a: ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789().*a', n: '0123456789' };
  var NB = ' ';
  function put(el, c) { el.textContent = c === ' ' ? NB : c; }
  function parts(el) {
    if (el._p) return el._p;
    var a = d.createElement('span'), b = d.createElement('span');
    a.className = 'a'; b.className = 'b'; a.innerHTML = '<b></b>'; b.innerHTML = '<b></b>';
    el.appendChild(a); el.appendChild(b);
    return (el._p = { u: $('.u b', el), d: $('.d b', el), a: a, b: b, ab: a.firstChild, bb: b.firstChild });
  }
  function show(el, c) { var p = parts(el); put(p.u, c); put(p.d, c); el._c = c; }
  function flip(el, to, dur) {
    return new Promise(function (res) {
      var p = parts(el), from = el._c == null ? ' ' : el._c;
      put(p.u, to); put(p.d, from); put(p.ab, from); put(p.bb, to); el.classList.add('go');
      var A = p.a.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-90deg)' }], { duration: dur * .5, easing: 'cubic-bezier(.55,0,1,.6)', fill: 'forwards' });
      var B = p.b.animate([{ transform: 'rotateX(90deg)' }, { transform: 'rotateX(-8deg)', offset: .78 }, { transform: 'rotateX(0deg)' }], { duration: dur * .5, delay: dur * .5, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'forwards' });
      B.onfinish = function () { put(p.d, to); el._c = to; el.classList.remove('go'); A.cancel(); B.cancel(); res(); };
    });
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  /* from whatever the cell shows now, forward through the drum to the target */
  function spinCell(el, target, drum, delay) {
    var D = DRUM[drum] || DRUM.a, s = D.indexOf(el._c == null ? ' ' : el._c); if (s < 0) s = 0;
    if (D.indexOf(target) < 0) target = ' ';
    return wait(delay).then(function step() {
      if (D[s] === target) return;
      s = (s + 1) % D.length;
      return flip(el, D[s], 62).then(step);
    });
  }
  /* prime a flap group at its starting letters, then spin it to its text */
  function prime(g) {
    var text = g.getAttribute('data-flap'), drum = g.getAttribute('data-drum') || 'a', cells = $$('.fl', g);
    cells.forEach(function (c, i) {
      var D = DRUM[drum], ch = text.charAt(i) || ' ', k = drum === 'n' ? 3 + Math.floor(Math.random() * 7) : (ch === ' ' ? Math.floor(Math.random() * 3) : 4 + Math.floor(Math.random() * 9));
      var ti = Math.max(0, D.indexOf(ch)), s = (ti - k + D.length * 4) % D.length; show(c, D[s]);
    });
    g.classList.add('on');
  }
  function spin(g, base) {
    var text = g.getAttribute('data-flap'), drum = g.getAttribute('data-drum') || 'a', cells = $$('.fl', g);
    return Promise.all(cells.map(function (c, i) { return spinCell(c, text.charAt(i) || ' ', drum, (base || 0) + i * 34 + Math.random() * 90); }));
  }
  function setText(g, t) { g.setAttribute('data-flap', t); }
  /* a module flap, the whole line on one leaf, flips through other lines before it settles */
  function modFlip(m, base) {
    var target = m.getAttribute('data-mod'), alts = (m.getAttribute('data-alts') || '').split('|').filter(Boolean), seq = alts.concat([target]);
    var p = parts(m); put(p.u, ''); put(p.d, ''); m._c = ''; m.classList.add('on');
    return wait(base || 0).then(function next() { if (!seq.length) return; return flip(m, seq.shift(), 150).then(function () { return wait(40); }).then(next); });
  }
  w.FLAP = { prime: prime, spin: spin, setText: setText, flip: flip, show: show, modFlip: modFlip };

  var groups = $$('.flaps'), mods = $$('.mod');
  groups.forEach(function (g) { if (g.getAttribute('data-drum') === 'n' && g.getAttribute('data-flap').length === 3) setText(g, pad3); });
  if (reduce || !Element.prototype.animate) {
    groups.forEach(function (g) { var t = g.getAttribute('data-flap'); $$('.fl', g).forEach(function (c, i) { show(c, t.charAt(i) || ' '); }); g.classList.add('on'); });
    mods.forEach(function (m) { m.classList.add('on'); });
  } else {
    groups.forEach(prime);
    mods.forEach(function (m) { var p = parts(m); put(p.u, ''); put(p.d, ''); m.classList.add('on'); });
    /* each board spins when it comes into view, rows from the top down */
    var pend = $$('[data-board],.bar,.cta-board').map(function (b) { return { el: b, done: false }; });
    var go = function () {
      pend.forEach(function (o) {
        if (o.done || !seen(o.el, -40)) return; o.done = true;
        var rows = $$('tr', o.el), gs = $$('.flaps', o.el).filter(function (g) { return !g.closest('.lang'); });
        gs.forEach(function (g) { var tr = g.closest('tr'), ri = tr ? rows.indexOf(tr) : 0; spin(g, 180 + ri * 110); });
        $$('.lang .flaps', o.el).forEach(function (g) { var ri = rows.indexOf(g.closest('tr')); spin(g, 180 + ri * 110); });
        $$('.mod', o.el).forEach(function (m) { var ri = rows.indexOf(m.closest('tr')); modFlip(m, 260 + ri * 120); });
      });
    };
    go(); w.addEventListener('scroll', go, { passive: true }); w.addEventListener('resize', go);
    /* the passenger rows change language now and then, the way the boards in Frankfurt do */
    var langs = $$('.lang'), de = false;
    if (langs.length) setInterval(function () {
      var b = langs[0].closest('[data-board]'); if (!b || !seen(b) || d.hidden) return;
      de = !de; langs.forEach(function (l, i) { var g = $('.flaps', l), en = l._en || (l._en = g.getAttribute('data-flap')); setText(g, de ? l.getAttribute('data-alt') : en); setTimeout(function () { spin(g, 0); }, i * 160); });
    }, 9000);
  }

  /* ---- the live halftone. The stock film is printed as a dot screen each frame. Without WebGL, with reduced motion
     or on a data saver, the still halftone stays in place. */
  var saveData = navigator.connection && navigator.connection.saveData;
  $$('[data-htv]').forEach(function (box) {
    if (reduce || saveData || !w.HT) return;
    var v = $('video', box), cv = d.createElement('canvas'); cv.setAttribute('aria-hidden', 'true'); box.appendChild(cv);
    var o = { pitch: +box.getAttribute('data-pitch') || 5, lo: +box.getAttribute('data-lo') || 0, hi: +box.getAttribute('data-hi') || 1, gam: +box.getAttribute('data-gam') || 1, fx: +(box.getAttribute('data-fx') || .5), fy: +(box.getAttribute('data-fy') || .5), dpr: Math.min(1.5, w.devicePixelRatio || 1), paper: '#EAEBE6' };
    var m; try { m = HT.mount(cv, v, o); } catch (e) { m = null; }
    if (!m) { cv.remove(); return; }
    var loaded = false, last = 0, live = false;
    v.addEventListener('playing', function () { live = true; });
    function frame(t) {
      requestAnimationFrame(frame);
      if (!seen(box)) { if (loaded && !v.paused) v.pause(); return; }
      if (!loaded) { v.src = (v.getAttribute('data-webm') && v.canPlayType('video/webm; codecs="vp9"')) ? v.getAttribute('data-webm') : v.getAttribute('data-src'); loaded = true; }
      if (v.paused) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      if (!live || t - last < 70 || v.readyState < 2) return;
      last = t; if (m.draw()) box.classList.add('live');
    }
    requestAnimationFrame(frame);
  });

  /* charts ink in once, when they arrive */
  var charts = $$('.ch');
  function inkCharts() { charts = charts.filter(function (c) { if (seen(c, -60)) { c.classList.add('in'); return false; } return true; }); }
  inkCharts(); w.addEventListener('scroll', inkCharts, { passive: true });

  /* forms, as v1. An empty or malformed required field is marked, a sent form says so */
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
        if (!res.ok) throw 0; fm.style.display = 'none'; var s = $('.sent'); if (s) { s.classList.add('on'); s.focus(); }
      }).catch(function () { if (btn) btn.disabled = false; var er = $('.formerr', fm); if (er) er.style.display = 'block'; });
    });
  });

  w.JC = { $: $, $$: $$, seen: seen, reduce: reduce, daysTo: daysTo, utc: utc, todayUTC: todayUTC };
})();
