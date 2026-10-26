/* Petals in her red, her powder blue and ivory, falling over the Red chapter and parting round the pointer or a finger.
   A 2D canvas that stays on the screen while the chapter passes, drawn only while the chapter is on screen, at 40 frames
   a second at most. None under reduced motion. */
(function () {
  'use strict';
  var H = document.documentElement;
  if (H.classList.contains('rm')) return;
  var cv = document.querySelector('[data-petals]'), sec = document.getElementById('red');
  if (!cv || !sec || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var COL = ['#962122', '#962122', '#a92a2a', '#7e1a1c', '#b8403e', '#d3e9ee', '#c3dee5', '#fbf7f0', '#f3e7d6', '#962122'];
  var P = [], W = 0, Hh = 0, dpr = 1, on = false, raf = 0, last = 0, frames = 0, px = -9999, py = -9999, pt = 0;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; Hh = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(Hh * dpr);
  }
  function make(i, top) {
    var z = .55 + Math.random() * .75;
    return { x: Math.random() * W, y: top ? -40 - Math.random() * Hh * 1.2 : Math.random() * Hh, z: z, s: (7 + Math.random() * 9) * z,
      r: Math.random() * 6.28, vr: (Math.random() - .5) * 1.2, f: Math.random() * 6.28, vf: .8 + Math.random() * 1.6,
      sw: 18 + Math.random() * 34, ph: Math.random() * 6.28, vy: (26 + Math.random() * 30) * z, ox: 0, oy: 0, c: COL[i % COL.length] };
  }
  function seed() { var n = W < 760 ? 26 : 46; P = []; for (var i = 0; i < n; i++) P.push(make(i, true)); }
  function petal(p) {
    var s = p.s;
    ctx.save(); ctx.translate(p.x + p.ox, p.y + p.oy); ctx.rotate(p.r); ctx.scale(1, Math.max(.18, Math.abs(Math.cos(p.f))));
    ctx.beginPath(); ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * .95, -s * .55, s * .72, s * .78, 0, s);
    ctx.bezierCurveTo(-s * .72, s * .78, -s * .95, -s * .55, 0, -s);
    ctx.fillStyle = p.c; ctx.globalAlpha = .55 + .4 * p.z; ctx.fill();
    ctx.globalAlpha = .18; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(-s * .22, -s * .25, s * .18, s * .5, -.3, 0, 6.28); ctx.fill();
    ctx.restore();
  }
  function step(now) {
    raf = 0; if (!on) return;
    var dt = Math.min(.05, (now - (last || now)) / 1000);
    if (now - last < 24) { raf = requestAnimationFrame(step); return; }
    last = now; var t = now / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, Hh);
    var R = W < 760 ? 110 : 150, act = Math.max(0, 1 - (now - pt) / 1600);
    for (var i = 0; i < P.length; i++) {
      var p = P[i];
      p.y += p.vy * dt; p.x += Math.sin(t * .7 + p.ph) * p.sw * dt; p.r += p.vr * dt; p.f += p.vf * dt;
      // parting round the hand, eased back when it leaves
      var dx = p.x + p.ox - px, dy = p.y + p.oy - py, d = Math.sqrt(dx * dx + dy * dy);
      if (act > 0 && d < R && d > .1) { var k = (1 - d / R) * 260 * act * dt; p.ox += dx / d * k; p.oy += dy / d * k; }
      p.ox *= .985; p.oy *= .985;
      if (p.y - p.s > Hh + 20) { var q = make(i, false); q.y = -30 - Math.random() * 60; P[i] = q; continue; }
      if (p.x < -40) p.x += W + 80; if (p.x > W + 40) p.x -= W + 80;
      petal(p);
    }
    frames++;
    raf = requestAnimationFrame(step);
  }
  function start() { if (!raf && on) { last = 0; raf = requestAnimationFrame(step); } }
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var was = on; on = e.isIntersecting;
      if (on && !was) { size(); if (!P.length) seed(); start(); }
      if (!on) ctx.clearRect(0, 0, cv.width, cv.height);
    });
  }, { rootMargin: '0px' }).observe(sec);
  function hand(e) { px = e.clientX; py = e.clientY; pt = performance.now(); }
  sec.addEventListener('pointermove', hand, { passive: true });
  sec.addEventListener('pointerdown', hand, { passive: true });
  window.addEventListener('resize', function () { if (on) { var oW = W; size(); if (Math.abs(W - oW) > 60) seed(); } });
  window.HIH_PETALS = { get frames() { return frames; }, get count() { return P.length; }, get on() { return on; }, pos: function () { return P.map(function (p) { return [p.x + p.ox, p.y + p.oy]; }); } };
})();
