/* Toppings. Each topping on Charlie's menu drawn in one glossy candy style, dropped from above with simple
   physics: it falls, bounces once or twice and settles on the dessert. Sprinkles scatter, marshmallows tumble,
   gum balls roll. Classic script: exposes window.CharlieToppings. */
(function () {
  'use strict';

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[(Math.random() * a.length) | 0]; }

  // a sprite canvas of size s (css px) at device ratio r, drawn by fn(ctx, s)
  function sprite(s, r, fn) {
    var c = document.createElement('canvas'); c.width = c.height = Math.ceil(s * r);
    var x = c.getContext('2d'); x.scale(r, r); fn(x, s); return c;
  }
  // glossy ball: base colour, dark rim, soft highlight
  function ball(x, s, col, rimCol) {
    var r = Math.max(0.5, s / 2 - 0.5), g = x.createRadialGradient(s * 0.38, s * 0.34, r * 0.1, s / 2, s / 2, r);
    g.addColorStop(0, lighten(col, 0.35)); g.addColorStop(0.55, col); g.addColorStop(1, rimCol || darken(col, 0.35));
    x.fillStyle = g; x.beginPath(); x.arc(s / 2, s / 2, r, 0, 7); x.fill();
    gloss(x, s * 0.36, s * 0.3, r * 0.42, r * 0.26);
  }
  function gloss(x, cx, cy, rx, ry, a) {
    var g = x.createRadialGradient(cx, cy, 0, cx, cy, rx);
    g.addColorStop(0, 'rgba(255,255,255,' + (a || 0.85) + ')'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.save(); x.fillStyle = g; x.translate(cx, cy); x.scale(1, ry / rx); x.beginPath(); x.arc(0, 0, rx, 0, 7); x.fill(); x.restore();
  }
  function hex(c) { var n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function mixc(c, t, w) { var a = hex(c); return 'rgb(' + a.map(function (v) { return Math.round(v + (t - v) * w); }).join(',') + ')'; }
  function lighten(c, w) { return mixc(c, 255, w); }
  function darken(c, w) { return mixc(c, 0, w); }
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }

  var CANDY = ['#ff5fa2', '#ffd23f', '#3ec1d3', '#8f6bd8', '#ff8a3d', '#7ed957', '#ffffff'];

  // kind: name -> { n: pieces per tap, size: css px, rest: bounce, roll: rolls along the surface, draw(ctx, s) }
  var KINDS = {
    'Sprinkles': { n: 46, size: 9, rest: 0.45, spin: 1, draw: function (x, s) { var c = pick(CANDY); x.translate(s / 2, s / 2); x.rotate(rnd(0, 3.14));
      var g = x.createLinearGradient(0, -s * 0.15, 0, s * 0.15); g.addColorStop(0, lighten(c, 0.3)); g.addColorStop(1, darken(c, 0.2));
      x.fillStyle = g; rr(x, -s * 0.45, -s * 0.13, s * 0.9, s * 0.26, s * 0.13); x.fill(); x.fillStyle = 'rgba(255,255,255,.7)'; rr(x, -s * 0.3, -s * 0.1, s * 0.45, s * 0.07, s * 0.04); x.fill(); } },
    'Marshmallows': { n: 9, size: 20, rest: 0.35, spin: 1, draw: function (x, s) { var c = pick(['#ffd1e3', '#fff6ee', '#cdebff', '#fff1a8', '#e2d4ff']);
      x.translate(s / 2, s / 2); x.rotate(rnd(-0.6, 0.6)); var g = x.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
      g.addColorStop(0, lighten(c, 0.5)); g.addColorStop(1, darken(c, 0.12)); x.fillStyle = g; rr(x, -s * 0.42, -s * 0.3, s * 0.84, s * 0.6, s * 0.22); x.fill();
      x.fillStyle = 'rgba(255,255,255,.55)'; rr(x, -s * 0.3, -s * 0.22, s * 0.4, s * 0.12, s * 0.06); x.fill(); } },
    'Gum Balls': { n: 6, size: 22, rest: 0.55, roll: true, draw: function (x, s) { ball(x, s, pick(['#ff4f8b', '#ffcf33', '#2fb8e0', '#7c5cff', '#ff7a2f', '#43d17a'])); } },
    'Gobstopper': { n: 1, size: 38, rest: 0.5, roll: true, draw: function (x, s) { var r = s / 2 - 0.5, cols = ['#ff5f9b', '#ffd23f', '#5f3f90', '#32b3c3', '#ffffff'];
      for (var i = 0; i < 5; i++) { x.fillStyle = cols[i]; x.beginPath(); x.arc(s / 2, s / 2, r * (1 - i * 0.18), 0, 7); x.fill(); }
      var g = x.createRadialGradient(s * 0.4, s * 0.35, 1, s / 2, s / 2, r); g.addColorStop(0, 'rgba(255,255,255,.25)'); g.addColorStop(0.7, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.35)');
      x.fillStyle = g; x.beginPath(); x.arc(s / 2, s / 2, r, 0, 7); x.fill(); gloss(x, s * 0.36, s * 0.3, r * 0.4, r * 0.24); } },
    'Chocolate Chips': { n: 16, size: 12, rest: 0.3, spin: 0.6, draw: function (x, s) { x.translate(s / 2, s * 0.58); x.rotate(rnd(-0.5, 0.5));
      var g = x.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2); g.addColorStop(0, '#6b3b1f'); g.addColorStop(1, '#2a140a'); x.fillStyle = g;
      x.beginPath(); x.moveTo(0, -s * 0.5); x.quadraticCurveTo(s * 0.12, -s * 0.12, s * 0.42, s * 0.22); x.quadraticCurveTo(0, s * 0.42, -s * 0.42, s * 0.22); x.quadraticCurveTo(-s * 0.12, -s * 0.12, 0, -s * 0.5); x.fill();
      gloss(x, -s * 0.1, -s * 0.05, s * 0.16, s * 0.08, 0.6); } },
    'Chocolate Stars': { n: 9, size: 17, rest: 0.3, spin: 1, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(0, 1.2)); star(x, s * 0.47, s * 0.21);
      var g = x.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2); g.addColorStop(0, '#7a4424'); g.addColorStop(1, '#2b150b'); x.fillStyle = g; x.fill();
      x.strokeStyle = 'rgba(255,220,190,.35)'; x.lineWidth = 0.8; x.stroke(); } },
    'Chocolate Curls': { n: 8, size: 22, rest: 0.25, spin: 0.8, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(0, 3));
      for (var i = 0; i < 2; i++) { x.strokeStyle = i ? 'rgba(255,230,200,.45)' : '#4a2614'; x.lineWidth = i ? 1.2 : s * 0.22; x.lineCap = 'round';
        x.beginPath(); for (var t = 0; t < 6.5; t += 0.2) { var R = s * 0.08 + t * s * 0.045; x.lineTo(Math.cos(t) * R * 1.4 - s * 0.05, Math.sin(t) * R * 0.55); } x.stroke(); } } },
    'Strawberries': { n: 5, size: 26, rest: 0.25, spin: 0.7, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(-0.8, 0.8));
      x.beginPath(); x.moveTo(0, s * 0.45); x.bezierCurveTo(-s * 0.55, s * 0.05, -s * 0.38, -s * 0.45, 0, -s * 0.34); x.bezierCurveTo(s * 0.38, -s * 0.45, s * 0.55, s * 0.05, 0, s * 0.45);
      var g = x.createRadialGradient(0, 0, 1, 0, 0, s * 0.5); g.addColorStop(0, '#ffc7c9'); g.addColorStop(0.45, '#f2475a'); g.addColorStop(1, '#b3122a'); x.fillStyle = g; x.fill();
      x.fillStyle = '#ffe6a8'; for (var i = 0; i < 9; i++) { x.beginPath(); x.ellipse(rnd(-s * 0.22, s * 0.22), rnd(-s * 0.2, s * 0.28), 0.9, 1.4, 0, 0, 7); x.fill(); }
      gloss(x, -s * 0.12, -s * 0.15, s * 0.16, s * 0.1, 0.55); } },
    'Raspberries': { n: 6, size: 18, rest: 0.25, spin: 0.5, draw: function (x, s) { for (var i = 0; i < 11; i++) { var a = i * 2.39, R = s * 0.26 * Math.sqrt(i / 11);
      var bx = s / 2 + Math.cos(a) * R, by = s / 2 + Math.sin(a) * R; x.save(); x.translate(bx - s * 0.16, by - s * 0.16); ball(x, s * 0.32, '#d81b55', '#7d0a2c'); x.restore(); } } },
    'Mango': { n: 7, size: 15, rest: 0.25, spin: 0.7, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(0, 1.5));
      var g = x.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2); g.addColorStop(0, '#ffd34d'); g.addColorStop(1, '#f39200'); x.fillStyle = g; rr(x, -s * 0.4, -s * 0.4, s * 0.8, s * 0.8, s * 0.16); x.fill();
      gloss(x, -s * 0.12, -s * 0.14, s * 0.22, s * 0.12, 0.7); } },
    'Banana': { n: 6, size: 20, rest: 0.25, spin: 0.6, draw: function (x, s) { var g = x.createRadialGradient(s / 2, s / 2, 1, s / 2, s / 2, s * 0.46);
      g.addColorStop(0, '#fff7cf'); g.addColorStop(0.8, '#f7e7a1'); g.addColorStop(1, '#d9c070'); x.fillStyle = g; x.beginPath(); x.arc(s / 2, s / 2, s * 0.45, 0, 7); x.fill();
      x.fillStyle = 'rgba(120,90,40,.45)'; for (var i = 0; i < 6; i++) { var a = i * 1.047; x.beginPath(); x.arc(s / 2 + Math.cos(a) * s * 0.13, s / 2 + Math.sin(a) * s * 0.13, 0.9, 0, 7); x.fill(); }
      gloss(x, s * 0.38, s * 0.32, s * 0.16, s * 0.09, 0.5); } },
    'Hazelnuts': { n: 8, size: 14, rest: 0.35, roll: true, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(0, 3));
      var g = x.createRadialGradient(-s * 0.1, -s * 0.1, 1, 0, 0, s * 0.5); g.addColorStop(0, '#c9874a'); g.addColorStop(1, '#6e3b17'); x.fillStyle = g;
      x.beginPath(); x.ellipse(0, 0, s * 0.42, s * 0.36, 0, 0, 7); x.fill(); x.fillStyle = '#e9c79a'; x.beginPath(); x.ellipse(s * 0.28, 0, s * 0.12, s * 0.2, 0, 0, 7); x.fill();
      gloss(x, -s * 0.12, -s * 0.12, s * 0.14, s * 0.08, 0.45); } },
    'Fudge Pieces': { n: 8, size: 15, rest: 0.2, spin: 0.6, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(0, 1.5));
      var g = x.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2); g.addColorStop(0, '#e7b77a'); g.addColorStop(1, '#a8692f'); x.fillStyle = g; rr(x, -s * 0.4, -s * 0.36, s * 0.8, s * 0.72, s * 0.14); x.fill();
      x.fillStyle = 'rgba(255,245,225,.5)'; rr(x, -s * 0.3, -s * 0.28, s * 0.4, s * 0.1, s * 0.05); x.fill(); } },
    'Oreo Bits': { n: 14, size: 13, rest: 0.25, spin: 0.8, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(0, 6)); crumb(x, s, '#2b2421', '#120d0b');
      x.fillStyle = 'rgba(250,246,238,.9)'; x.beginPath(); x.ellipse(rnd(-2, 2), rnd(-2, 2), s * 0.14, s * 0.08, rnd(0, 3), 0, 7); x.fill(); } },
    'Biscoff Bits': { n: 14, size: 12, rest: 0.25, spin: 0.8, draw: function (x, s) { x.translate(s / 2, s / 2); x.rotate(rnd(0, 6)); crumb(x, s, '#c77b36', '#8a4b1b'); } },
    'Peanut Butter': { n: 5, size: 22, rest: 0.1, spin: 0.2, draw: function (x, s) { x.translate(s / 2, s / 2);
      for (var i = 3; i >= 0; i--) { var g = x.createRadialGradient(-s * 0.1, -s * 0.1 - i * s * 0.09, 0, 0, -i * s * 0.09, Math.max(1, s * (0.4 - i * 0.07))); g.addColorStop(0, '#f0c57d'); g.addColorStop(1, '#b97a2e');
        x.fillStyle = g; x.beginPath(); x.ellipse(0, s * 0.1 - i * s * 0.1, s * 0.42 - i * s * 0.08, s * 0.16, 0, 0, 7); x.fill(); }
      gloss(x, -s * 0.08, -s * 0.18, s * 0.12, s * 0.06, 0.6); } },
    'Sherbet': { n: 70, size: 4, rest: 0.1, spin: 0, draw: function (x, s) { x.fillStyle = pick(['#ffe8f3', '#ffffff', '#fff3b0', '#d8f6ff', '#ffd0e4']); x.beginPath(); x.arc(s / 2, s / 2, s * 0.42, 0, 7); x.fill(); } },
    'Popping Candy': { n: 40, size: 6, rest: 0.6, spin: 1, draw: function (x, s) { var c = pick(['#ff4f8b', '#ffd23f', '#3ec1d3', '#8f6bd8']); x.translate(s / 2, s / 2); x.rotate(rnd(0, 6));
      x.fillStyle = c; x.beginPath(); x.moveTo(-s * 0.45, -s * 0.1); x.lineTo(s * 0.1, -s * 0.42); x.lineTo(s * 0.45, s * 0.2); x.lineTo(-s * 0.1, s * 0.4); x.closePath(); x.fill();
      x.fillStyle = 'rgba(255,255,255,.8)'; x.fillRect(-s * 0.1, -s * 0.2, s * 0.18, s * 0.1); } },
    'Pick & Mix Cup': { n: 8, size: 24, rest: 0.3, spin: 0.8, draw: function (x, s) { var t = (Math.random() * 3) | 0; x.translate(s / 2, s / 2); x.rotate(rnd(-1, 1));
      if (t === 0) { // a sugared jelly ring
        x.lineWidth = s * 0.2; x.strokeStyle = pick(['#ff5f9b', '#7ed957', '#ffd23f']); x.beginPath(); x.arc(0, 0, s * 0.3, 0, 7); x.stroke();
        x.fillStyle = 'rgba(255,255,255,.7)'; for (var i = 0; i < 14; i++) { var a = rnd(0, 6.28); x.fillRect(Math.cos(a) * s * 0.3 + rnd(-2, 2), Math.sin(a) * s * 0.3 + rnd(-2, 2), 1.2, 1.2); }
      } else if (t === 1) { // a fizzy two tone slice, like the sweets in their own photo
        x.beginPath(); x.moveTo(-s * 0.42, s * 0.2); x.quadraticCurveTo(0, -s * 0.55, s * 0.42, s * 0.2); x.closePath();
        var g = x.createLinearGradient(0, -s * 0.3, 0, s * 0.2); g.addColorStop(0, '#ff6f7d'); g.addColorStop(0.55, '#ff6f7d'); g.addColorStop(0.56, '#fff'); g.addColorStop(0.7, '#7ed957'); x.fillStyle = g; x.fill();
        x.fillStyle = 'rgba(255,255,255,.75)'; for (var j = 0; j < 16; j++) x.fillRect(rnd(-s * 0.35, s * 0.35), rnd(-s * 0.2, s * 0.15), 1.2, 1.2);
      } else { // a glossy jelly bean
        var c = pick(['#8f6bd8', '#ff8a3d', '#3ec1d3', '#ff5fa2']); x.fillStyle = c; x.beginPath(); x.ellipse(0, 0, s * 0.42, s * 0.26, 0, 0, 7); x.fill(); gloss(x, -s * 0.12, -s * 0.1, s * 0.2, s * 0.08, 0.8);
      } } }
  };
  function star(x, R, r) { x.beginPath(); for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r : R; x.lineTo(Math.cos(a) * q, Math.sin(a) * q); } x.closePath(); }
  function crumb(x, s, c1, c2) { x.beginPath(); var k = 7; for (var i = 0; i < k; i++) { var a = i / k * 6.28, q = s * rnd(0.28, 0.46); x.lineTo(Math.cos(a) * q, Math.sin(a) * q); } x.closePath();
    var g = x.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2); g.addColorStop(0, c1); g.addColorStop(1, c2); x.fillStyle = g; x.fill(); }

  function Toppings(canvas, opts) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.bodies = []; this.opts = opts || {};
    this.surfaceAt = this.opts.surfaceAt; this.rectFn = this.opts.rectFn; this.depth = this.opts.depth || 0;
    this.reduced = !!this.opts.reducedMotion; this.onLand = this.opts.onLand || null; this.raf = 0; this._frame = this._frame.bind(this);
  }
  Toppings.prototype.resize = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 2); this.dpr = dpr; this.thumbs = this.thumbs || {};
    this.w = this.canvas.clientWidth; this.h = this.canvas.clientHeight;
    this.canvas.width = Math.round(this.w * dpr); this.canvas.height = Math.round(this.h * dpr); this.draw();
  };
  Toppings.prototype.add = function (name, opt) {
    var k = KINDS[name]; if (!k) return; var r = this.rectFn(), sc = (opt && opt.scale) || 1, group = { name: name, landed: false };
    var src = this.opts.source ? this.opts.source() : { x: r.x + r.w / 2, y: -30 };
    for (var i = 0; i < k.n; i++) {
      var s = k.size * sc * rnd(0.85, 1.15), tx = r.x + r.w * (0.5 + (Math.random() - 0.5) * 0.8 * rnd(0.5, 1));
      var surf = this.surfaceAt(tx); if (!isFinite(surf)) continue;
      var ty = surf + s * 0.15 + this.depth * Math.random() * r.h * 0.55;
      var b = { k: k, s: s, img: sprite(s, this.dpr || 2, k.draw), x: src.x + rnd(-14, 14), y: src.y - rnd(0, 120), vx: (tx - src.x) * rnd(0.9, 1.3), vy: rnd(-40, 60),
        ty: ty, tx: tx, a: rnd(0, 6.28), va: (k.spin || 0) * rnd(-9, 9), bounces: 0, rest: false, group: group, t: -i * 0.012 * (k.n > 20 ? 0.6 : 2.5) };
      if (this.reduced || (opt && opt.instant)) { b.x = tx; b.y = ty - s / 2; b.rest = true; b.va = 0; b.t = 0; }
      this.bodies.push(b);
    }
    if (this.reduced || (opt && opt.instant)) { group.landed = true; this.draw(); if (this.onLand && !(opt && opt.silent)) this.onLand(group); return; }
    this.kick();
  };
  Toppings.prototype.remove = function (name) { this.bodies = this.bodies.filter(function (b) { return b.group.name !== name; }); this.draw(); };
  Toppings.prototype.clear = function () { this.bodies = []; this.draw(); };
  Toppings.prototype.setDepth = function (d) { this.depth = d || 0; };
  Toppings.prototype.kick = function () { if (!this.raf) { this.last = performance.now(); this.raf = requestAnimationFrame(this._frame); } };
  Toppings.prototype._frame = function (now) {
    this.raf = 0; var dt = Math.min(0.033, (now - this.last) / 1000); this.last = now; var G = Math.max(1600, this.h * 3), moving = false;
    for (var i = 0; i < this.bodies.length; i++) {
      var b = this.bodies[i]; if (b.rest) continue; moving = true;
      if (b.t < 0) { b.t += dt; continue; }
      // steer gently toward the landing column while falling, so a tap lands on the dessert, not beside it
      b.vx += ((b.tx - b.x) * 6 - b.vx) * Math.min(1, dt * 3);
      b.vy += G * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt;
      var floor = b.ty - b.s / 2;
      if (b.y > floor) {
        b.y = floor;
        if (!b.group.landed) { b.group.landed = true; if (this.onLand) this.onLand(b.group); }
        if (b.bounces < 2 && Math.abs(b.vy) > 120) { b.vy = -b.vy * b.k.rest * rnd(0.7, 1); b.vx *= 0.5; b.va *= 0.6; b.bounces++; }
        else if (b.k.roll && this.depth === 0) { // roll down the slope of the dessert's top surface
          var sl = (this.surfaceAt(b.x + 3) - this.surfaceAt(b.x - 3)) / 6; if (!isFinite(sl)) sl = 0;
          b.vx += sl * 900 * dt; b.vx *= 0.96; b.vy = 0; b.va = b.vx / (b.s / 2); b.tx = b.x + b.vx * 0.2;
          b.ty = this.surfaceAt(b.x) + b.s * 0.15; if (Math.abs(b.vx) < 6 || Math.abs(sl) < 0.05) b.rest = true;
        } else { b.rest = true; b.va = 0; }
      }
    }
    this.draw();
    if (moving) this.raf = requestAnimationFrame(this._frame);
  };
  Toppings.prototype.draw = function () {
    var x = this.ctx, d = this.dpr || 1; x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, this.w, this.h);
    for (var i = 0; i < this.bodies.length; i++) { var b = this.bodies[i]; if (b.t < 0) continue;
      x.save(); x.translate(b.x, b.y); x.rotate(b.a);
      if (b.rest) { x.shadowColor = 'rgba(40,10,60,.35)'; x.shadowBlur = 3; x.shadowOffsetY = 1.5; }
      x.drawImage(b.img, -b.s / 2, -b.s / 2, b.s, b.s); x.restore(); }
  };

  function heap(canvas, name, w, h) {
    var k = KINDS[name], r = Math.min(window.devicePixelRatio || 1, 2), x = canvas.getContext('2d'); canvas.width = w * r; canvas.height = h * r; x.scale(r, r);
    var n = Math.min(k.n, k.n > 20 ? 26 : 7), sc = Math.min(1, (h * 0.62) / k.size), seed = 0;
    for (var i = 0; i < n; i++) { var s = k.size * sc * rnd(0.85, 1.1), a = (i / n) * 6.28 + rnd(-0.3, 0.3), R = rnd(0, 1) * (w * 0.32);
      var px = w / 2 + Math.cos(a) * R, py = h * 0.62 + Math.sin(a) * R * 0.35 - (n < 3 ? 0 : rnd(0, h * 0.12));
      x.save(); x.translate(px, py); x.rotate(rnd(-1, 1)); x.drawImage(sprite(s, r, k.draw), -s / 2, -s / 2, s, s); x.restore(); seed++; }
  }
  window.CharlieToppings = { Toppings: Toppings, KINDS: KINDS, heap: heap };
})();
