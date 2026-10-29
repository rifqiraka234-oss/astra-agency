/* A trail of sprinkles off the cursor, on a mouse only. Each one falls, turns and fades in under a second, and the
   canvas rests the moment the last one has gone. Not under reduced motion. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
  var COLS = ['#F75F9B', '#32B3C3', '#F8C559', '#ffffff', '#8f6bd6', '#ff8a3d', '#7bd389'];
  var cv = document.createElement('canvas'); cv.className = 'trail'; cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cv);
  var x = cv.getContext('2d'), dpr = 1, W = 0, H = 0, parts = [], raf = 0, last = 0, lx = -1, ly = -1, acc = 0;
  function size() { dpr = Math.min(2, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; }
  size(); window.addEventListener('resize', size);
  function frame(now) {
    raf = 0; var dt = Math.min(0.033, (now - (last || now)) / 1000); last = now;
    x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, W, H);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i]; p.t += dt; if (p.t > p.life) { parts.splice(i, 1); continue; }
      p.vy += 1500 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.va * dt;
      var k = 1 - p.t / p.life; x.globalAlpha = Math.min(1, k * 1.6);
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c;
      x.beginPath(); x.moveTo(-p.l / 2 + p.w / 2, -p.w / 2); x.lineTo(p.l / 2 - p.w / 2, -p.w / 2); x.arc(p.l / 2 - p.w / 2, 0, p.w / 2, -Math.PI / 2, Math.PI / 2);
      x.lineTo(-p.l / 2 + p.w / 2, p.w / 2); x.arc(-p.l / 2 + p.w / 2, 0, p.w / 2, Math.PI / 2, Math.PI * 1.5); x.fill();
      x.fillStyle = 'rgba(255,255,255,.55)'; x.fillRect(-p.l * 0.3, -p.w * 0.35, p.l * 0.4, p.w * 0.22); x.restore();
    }
    x.globalAlpha = 1;
    if (parts.length) raf = requestAnimationFrame(frame); else last = 0;
  }
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    if (lx < 0) { lx = e.clientX; ly = e.clientY; return; }
    var dx = e.clientX - lx, dy = e.clientY - ly, d = Math.sqrt(dx * dx + dy * dy); acc += d; lx = e.clientX; ly = e.clientY;
    while (acc > 14 && parts.length < 70) {
      acc -= 14;
      parts.push({ x: e.clientX + (Math.random() - 0.5) * 6, y: e.clientY + (Math.random() - 0.5) * 6, vx: dx * 4 + (Math.random() - 0.5) * 120, vy: dy * 4 - 80 - Math.random() * 120,
        a: Math.random() * 6.3, va: (Math.random() - 0.5) * 16, l: 9 + Math.random() * 4, w: 3.2, c: COLS[(Math.random() * COLS.length) | 0], t: 0, life: 0.7 + Math.random() * 0.4 });
    }
    if (!raf && parts.length) raf = requestAnimationFrame(frame);
  }, { passive: true });
})();
