/* WLAN-Ausleuchtung. Drag the access point across an office plan and the signal map redraws.
   Signal model, 20 dBm out, 46 dB loss at 1 m (5 GHz), exponent 3 indoors, plus each wall crossed. */
(function () {
  var root = document.querySelector('[data-wlan]');
  if (!root) return;
  var plan = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
  var W = plan.w, H = plan.h, walls = plan.walls;
  var cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
  var stage = root.querySelector('.wl-stage');
  var aps = [].slice.call(root.querySelectorAll('.wl-ap'));
  var out = root.querySelector('[data-wl-good]'), outRoom = root.querySelector('[data-wl-rooms]');
  var add = root.querySelector('[data-wl-add]');
  var STEP = 0.25, nx = Math.round(W / STEP), ny = Math.round(H / STEP);
  var pos = plan.aps.map(function (a) { return { x: a[0], y: a[1] }; });
  var active = [true, false];
  cv.width = nx; cv.height = ny;

  function cross(ax, ay, bx, by, cx, cy, dx, dy) {
    var d = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
    if (!d) return false;
    var t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / d;
    var u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / d;
    return t > 0 && t < 1 && u > 0 && u < 1;
  }
  function rssi(px, py, ap) {
    var dx = px - ap.x, dy = py - ap.y, d = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
    var loss = 46 + 30 * Math.log(d) / Math.LN10;
    for (var i = 0; i < walls.length; i++) {
      var w = walls[i];
      if (cross(ap.x, ap.y, px, py, w[0], w[1], w[2], w[3])) loss += w[4];
    }
    return 20 - loss;
  }
  // blue for strong, steel for weak, a pale wash where a video call drops
  var STOPS = [[-45, [8, 85, 138, 0.86]], [-60, [52, 128, 178, 0.66]], [-67, [126, 168, 196, 0.5]], [-75, [150, 157, 163, 0.34]], [-85, [214, 120, 92, 0.42]]];
  function colour(v) {
    if (v >= STOPS[0][0]) return STOPS[0][1];
    for (var i = 1; i < STOPS.length; i++) {
      if (v >= STOPS[i][0]) {
        var a = STOPS[i - 1], b = STOPS[i], t = (v - b[0]) / (a[0] - b[0]);
        return [0, 1, 2, 3].map(function (k) { return b[1][k] + (a[1][k] - b[1][k]) * t; });
      }
    }
    return STOPS[STOPS.length - 1][1];
  }
  function inside(x, y, r) { return x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3]; }
  function draw() {
    var img = ctx.createImageData(nx, ny), good = 0, total = 0;
    var roomGood = plan.rooms.map(function () { return [0, 0]; });
    for (var j = 0; j < ny; j++) {
      for (var i = 0; i < nx; i++) {
        var x = (i + 0.5) * STEP, y = (j + 0.5) * STEP, best = -200;
        for (var k = 0; k < pos.length; k++) if (active[k]) best = Math.max(best, rssi(x, y, pos[k]));
        var c = colour(best), o = (j * nx + i) * 4;
        img.data[o] = c[0]; img.data[o + 1] = c[1]; img.data[o + 2] = c[2]; img.data[o + 3] = Math.round(c[3] * 255);
        total++; if (best >= -67) good++;
        for (var r = 0; r < plan.rooms.length; r++) if (inside(x, y, plan.rooms[r].r)) { roomGood[r][1]++; if (best >= -67) roomGood[r][0]++; }
      }
    }
    ctx.putImageData(img, 0, 0);
    var pct = Math.round(good / total * 100);
    out.textContent = pct + ' %';
    if (outRoom) {
      var weak = plan.rooms.filter(function (rm, r) { return roomGood[r][0] / roomGood[r][1] < 0.8; }).map(function (rm) { return rm; });
      var de = weak.map(function (r) { return r.de; }), en = weak.map(function (r) { return r.en; });
      var list = function (a, and) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + and + ' ' + a[a.length - 1]; };
      outRoom.innerHTML = weak.length
        ? '<span class="l-de">Schwach in ' + list(de, 'und') + '</span><span class="l-en" lang="en">Weak in ' + list(en, 'and') + '</span>'
        : '<span class="l-de">Jeder Raum gut versorgt</span><span class="l-en" lang="en">Every room well covered</span>';
    }
  }
  function place(k) {
    aps[k].style.left = (pos[k].x / W * 100) + '%';
    aps[k].style.top = (pos[k].y / H * 100) + '%';
    aps[k].hidden = !active[k];
  }
  var queued = false;
  function redraw() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; draw(); }); }
  aps.forEach(function (el, k) {
    place(k);
    var drag = false;
    el.addEventListener('pointerdown', function (e) { drag = true; el.setPointerCapture(e.pointerId); el.classList.add('on'); e.preventDefault(); });
    el.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var r = stage.getBoundingClientRect();
      pos[k].x = Math.min(W - 0.3, Math.max(0.3, (e.clientX - r.left) / r.width * W));
      pos[k].y = Math.min(H - 0.3, Math.max(0.3, (e.clientY - r.top) / r.height * H));
      place(k); redraw();
    });
    el.addEventListener('pointerup', function () { drag = false; el.classList.remove('on'); });
    el.addEventListener('keydown', function (e) {
      var s = e.shiftKey ? 2 : 0.5, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
      if (!m) return;
      e.preventDefault();
      pos[k].x = Math.min(W - 0.3, Math.max(0.3, pos[k].x + m[0]));
      pos[k].y = Math.min(H - 0.3, Math.max(0.3, pos[k].y + m[1]));
      place(k); redraw();
    });
  });
  if (add) add.addEventListener('click', function () {
    active[1] = !active[1];
    add.setAttribute('aria-pressed', active[1] ? 'true' : 'false');
    place(1); redraw();
  });
  root.classList.add('wl-on');
  draw();
})();
