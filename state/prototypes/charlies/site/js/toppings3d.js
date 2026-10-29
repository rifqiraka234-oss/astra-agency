/* Toppings in 3D. Every topping on Charlie's menu modelled in the same glossy candy language as the sweets in the
   hero, lit and shadowed, dropped from above with the same simple physics as before: it falls, bounces once or
   twice and settles on the dessert. Sprinkles scatter, marshmallows tumble, gum balls roll. An orthographic camera
   lines the 3D up with the stage's CSS pixels. Brand names stay as text, nothing here draws a brand.
   Classic script, needs window.THREE: exposes window.CharlieToppings3D. */
(function () {
  'use strict';
  var T = window.THREE;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[(Math.random() * a.length) | 0]; }
  var CANDY = ['#ff5fa2', '#ffd23f', '#3ec1d3', '#8f6bd8', '#ff8a3d', '#7ed957', '#ffffff'];

  // ---------- shapes, about one unit across ----------
  function lathe(pts, seg) { return new T.LatheGeometry(pts.map(function (p) { return new T.Vector2(p[0], p[1]); }), seg || 24); }
  function star(R, r, depth) {
    var s = new T.Shape();
    for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r : R; i ? s.lineTo(Math.cos(a) * q, Math.sin(a) * q) : s.moveTo(Math.cos(a) * q, Math.sin(a) * q); }
    var g = new T.ExtrudeGeometry(s, { depth: depth, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 2 }); g.center(); return g;
  }
  function crumb(seed) {
    var g = new T.DodecahedronGeometry(0.5, 0), p = g.attributes.position;
    for (var i = 0; i < p.count; i++) { var k = 0.75 + 0.45 * Math.abs(Math.sin(i * 12.9898 + seed * 78.233)); p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * 0.6, p.getZ(i) * k); }
    g.computeVertexNormals(); return g;
  }
  function raspberry() {
    var parts = [];
    for (var i = 0; i < 14; i++) { var a = i * 2.39996, h = i / 14, r = 0.36 * Math.sqrt(1 - h * h * 0.6), s = new T.SphereGeometry(0.17, 10, 8);
      s.translate(Math.cos(a) * r, -0.25 + h * 0.6, Math.sin(a) * r); parts.push(s); }
    return T.mergeGeometries(parts, false);
  }
  function curl() {
    var pts = []; for (var t = 0; t < 7; t += 0.25) { var R = 0.08 + t * 0.06; pts.push(new T.Vector3(Math.cos(t) * R, Math.sin(t) * R * 0.5, t * 0.03 - 0.1)); }
    return new T.TubeGeometry(new T.CatmullRomCurve3(pts), 48, 0.075, 8, false);
  }
  function stripes(cols) {
    var c = document.createElement('canvas'); c.width = 16; c.height = 128; var x = c.getContext('2d'), h = 128 / cols.length;
    cols.forEach(function (col, i) { x.fillStyle = col; x.fillRect(0, i * h, 16, h + 1); });
    var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }
  function seeds() {
    var c = document.createElement('canvas'); c.width = c.height = 128; var x = c.getContext('2d');
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, 128, 128);
    for (var i = 0; i < 70; i++) { x.fillStyle = 'rgba(255,214,120,.95)'; x.beginPath(); x.ellipse(Math.random() * 128, Math.random() * 128, 1.4, 2.2, Math.random() * 3, 0, 7); x.fill(); }
    var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; return t;
  }
  function slice() {
    var c = document.createElement('canvas'); c.width = c.height = 128; var x = c.getContext('2d');
    var g = x.createRadialGradient(64, 64, 4, 64, 64, 64); g.addColorStop(0, '#fff9dd'); g.addColorStop(0.8, '#f7e7a1'); g.addColorStop(1, '#d9c070'); x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    x.fillStyle = 'rgba(120,90,40,.5)'; for (var i = 0; i < 6; i++) { var a = i * 1.047; x.beginPath(); x.arc(64 + Math.cos(a) * 16, 64 + Math.sin(a) * 16, 2.6, 0, 7); x.fill(); }
    var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }

  // kind: name -> { n pieces per tap, size css px, rest bounce, roll, spin, parts: [{ geo, mat, cols, share }] }
  function kinds() {
    // each look is a matcap lit like the hero's sweets, tinted per piece by its colour
    var glossy = { spec: 1.25, shin: 90, amb: 0.36, diff: 0.75, rimK: 0.18, rim: '#ffffff' };
    var choc = { spec: 0.6, shin: 36, amb: 0.34, diff: 0.78, rimK: 0.12, rim: '#ffd9c0' };
    var matte = { spec: 0.06, shin: 8, amb: 0.5, diff: 0.62, rimK: 0.3, rim: '#ffffff', rimPow: 2 };
    var crumbL = { spec: 0.12, shin: 12, amb: 0.4, diff: 0.75, rimK: 0.1 };
    var juicy = { spec: 1.0, shin: 70, amb: 0.38, diff: 0.72, rimK: 0.15, rim: '#ffffff' };
    var K = {
      'Sprinkles': { n: 46, size: 10, rest: 0.45, spin: 1, parts: [{ geo: new T.CapsuleGeometry(0.13, 0.62, 3, 8).rotateZ(Math.PI / 2), mat: glossy, cols: CANDY }] },
      'Marshmallows': { n: 9, size: 20, rest: 0.35, spin: 1, parts: [{ geo: lathe([[0, -0.28], [0.36, -0.28], [0.44, -0.2], [0.46, 0], [0.44, 0.2], [0.36, 0.28], [0, 0.28]]), mat: matte, cols: ['#ffd1e3', '#fff6ee', '#cdebff', '#fff1a8', '#e2d4ff'] }] },
      'Gum Balls': { n: 6, size: 22, rest: 0.55, roll: true, parts: [{ geo: new T.SphereGeometry(0.5, 28, 18), mat: glossy, cols: ['#ff4f8b', '#ffcf33', '#2fb8e0', '#7c5cff', '#ff7a2f', '#43d17a'] }] },
      'Gobstopper': { n: 1, size: 40, rest: 0.5, roll: true, parts: [{ geo: new T.SphereGeometry(0.5, 40, 28), mat: glossy, map: stripes(['#ff5f9b', '#ffd23f', '#5f3f90', '#32b3c3', '#ffffff', '#ff5f9b', '#ffd23f']), cols: ['#ffffff'] }] },
      'Chocolate Chips': { n: 16, size: 12, rest: 0.3, spin: 0.6, parts: [{ geo: lathe([[0, 0.5], [0.12, 0.2], [0.42, -0.2], [0.46, -0.32], [0.3, -0.38], [0, -0.4]], 16), mat: choc, cols: ['#3b1f10', '#4a2614', '#2e170b'] }] },
      'Chocolate Stars': { n: 9, size: 18, rest: 0.3, spin: 1, parts: [{ geo: star(0.5, 0.22, 0.16), mat: choc, cols: ['#4a2614', '#5b2f17', '#3b1f10'] }] },
      'Chocolate Curls': { n: 8, size: 24, rest: 0.25, spin: 0.8, parts: [{ geo: curl(), mat: choc, cols: ['#4a2614', '#3b1f10', '#f0e2c8'] }] },
      'Strawberries': { n: 5, size: 26, rest: 0.25, spin: 0.7, parts: [{ geo: lathe([[0, -0.5], [0.16, -0.42], [0.34, -0.2], [0.44, 0.06], [0.42, 0.26], [0.3, 0.4], [0, 0.44]], 22), mat: juicy, map: seeds(), cols: ['#e02a40', '#d41f36', '#ea3b4f'] }] },
      'Raspberries': { n: 6, size: 18, rest: 0.25, spin: 0.5, parts: [{ geo: raspberry(), mat: juicy, cols: ['#d81b55', '#c4124a', '#e2275f'] }] },
      'Mango': { n: 7, size: 15, rest: 0.25, spin: 0.7, parts: [{ geo: new T.RoundedBoxGeometry(0.8, 0.8, 0.8, 3, 0.16), mat: juicy, cols: ['#ffbf2e', '#ffa91f', '#ffcd46'] }] },
      'Banana': { n: 6, size: 20, rest: 0.25, spin: 0.6, parts: [{ geo: new T.CylinderGeometry(0.48, 0.48, 0.2, 28), mat: { spec: 0.3, shin: 20, amb: 0.45, diff: 0.65 }, map: slice(), cols: ['#ffffff'] }] },
      'Hazelnuts': { n: 8, size: 14, rest: 0.35, roll: true, parts: [{ geo: new T.SphereGeometry(0.5, 20, 14).scale(1, 0.86, 0.86), mat: choc, cols: ['#9a5a26', '#a8652d', '#8a4e1f'] }] },
      'Fudge Pieces': { n: 8, size: 15, rest: 0.2, spin: 0.6, parts: [{ geo: new T.RoundedBoxGeometry(0.86, 0.66, 0.74, 2, 0.14), mat: choc, cols: ['#d39a5b', '#c4874a', '#e0ab6c'] }] },
      'Oreo Bits': { n: 14, size: 13, rest: 0.25, spin: 0.8, parts: [{ geo: crumb(1), mat: crumbL, cols: ['#2a201c', '#1d1613', '#2a201c', '#f4efe6'] }] },
      'Biscoff Bits': { n: 14, size: 12, rest: 0.25, spin: 0.8, parts: [{ geo: crumb(2), mat: crumbL, cols: ['#c77b36', '#b56b2b', '#d38a44'] }] },
      'Peanut Butter': { n: 5, size: 22, rest: 0.1, spin: 0.2, parts: [{ geo: new T.SphereGeometry(0.5, 22, 14).scale(1.1, 0.42, 0.9), mat: juicy, cols: ['#d39a4c', '#c98a3c', '#dca65a'] }] },
      'Sherbet': { n: 70, size: 4.5, rest: 0.1, spin: 0, parts: [{ geo: new T.IcosahedronGeometry(0.5, 0), mat: matte, cols: ['#ffe8f3', '#ffffff', '#fff3b0', '#d8f6ff', '#ffd0e4'] }] },
      'Popping Candy': { n: 40, size: 6.5, rest: 0.6, spin: 1, parts: [{ geo: new T.OctahedronGeometry(0.5, 0), mat: { spec: 1.5, shin: 130, amb: 0.36, diff: 0.75, rimK: 0.25, rim: '#ffffff' }, cols: ['#ff4f8b', '#ffd23f', '#3ec1d3', '#8f6bd8'] }] },
      'Pick & Mix Cup': { n: 9, size: 24, rest: 0.3, spin: 0.8, parts: [
        { geo: new T.TorusGeometry(0.34, 0.15, 12, 26), mat: matte, cols: ['#ff5f9b', '#7ed957', '#ffd23f'], share: 0.34 },
        { geo: new T.CylinderGeometry(0.5, 0.5, 0.3, 24, 1, false, 0, Math.PI).rotateX(Math.PI / 2), mat: matte, cols: ['#ff6f7d', '#7ed957'], share: 0.33 },
        { geo: new T.CapsuleGeometry(0.26, 0.36, 4, 12).rotateZ(Math.PI / 2), mat: glossy, cols: ['#8f6bd8', '#ff8a3d', '#3ec1d3', '#ff5fa2'], share: 0.33 }] },
    };
    return K;
  }

  function shadowTexture() {
    var c = document.createElement('canvas'); c.width = c.height = 64; var x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 2, 32, 32, 32);
    g.addColorStop(0, 'rgba(43,11,71,0.55)'); g.addColorStop(1, 'rgba(43,11,71,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  }


  function makeScene(renderer, cap) {
    var scene = new T.Scene();
    var K = kinds(), meshes = {};
    Object.keys(K).forEach(function (name) {
      var k = K[name]; k.meshes = k.parts.map(function (p) {
        var mat = new T.MeshMatcapMaterial({ color: '#ffffff', matcap: window.CharlieHat.matcap(T, Object.assign({ base: '#ffffff' }, p.mat)), map: p.map || null });
        var n = Math.ceil(k.n * (p.share || 1)) * (cap || 1), m = new T.InstancedMesh(p.geo, mat, n); m.count = 0; m.frustumCulled = false;
        m.instanceMatrix.setUsage(35048); // dynamic draw
        scene.add(m); return { mesh: m, part: p, used: 0 };
      });
      meshes[name] = k;
    });
    var shTex = shadowTexture(), shMat = new T.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false });
    var shadows = new T.InstancedMesh(new T.PlaneGeometry(1, 1), shMat, 900); shadows.count = 0; shadows.renderOrder = -1; shadows.frustumCulled = false; scene.add(shadows);
    return { scene: scene, K: meshes, shadows: shadows };
  }

  function Toppings(canvas, opts) {
    this.canvas = canvas; this.opts = opts || {}; this.bodies = [];
    this.surfaceAt = this.opts.surfaceAt; this.rectFn = this.opts.rectFn; this.depth = this.opts.depth || 0;
    this.reduced = !!this.opts.reducedMotion; this.onLand = this.opts.onLand || null; this.raf = 0; this._frame = this._frame.bind(this);
    this.renderer = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, premultipliedAlpha: true });
    this.renderer.debug.checkShaderErrors = false;
    this.renderer.outputColorSpace = T.SRGBColorSpace;
    var s = makeScene(this.renderer); this.scene = s.scene; this.K = s.K; this.shadows = s.shadows;
    this.camera = new T.OrthographicCamera(0, 1, 0, -1, -2000, 2000);
    this.dummy = new T.Object3D(); this.q = new T.Quaternion(); this.c = new T.Color();
  }
  Toppings.prototype.resize = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 2); this.w = this.canvas.clientWidth; this.h = this.canvas.clientHeight;
    this.renderer.setPixelRatio(dpr); this.renderer.setSize(this.w, this.h, false);
    this.camera.left = 0; this.camera.right = this.w; this.camera.top = 0; this.camera.bottom = -this.h; this.camera.updateProjectionMatrix();
    this.draw();
  };
  Toppings.prototype.add = function (name, opt) {
    var k = this.K[name]; if (!k) return; var r = this.rectFn(), sc = (opt && opt.scale) || 1, group = { name: name, landed: false };
    var src = this.opts.source ? this.opts.source() : { x: r.x + r.w / 2, y: -30 };
    for (var i = 0; i < k.n; i++) {
      var s = k.size * sc * rnd(0.85, 1.15), tx = r.x + r.w * (0.5 + (Math.random() - 0.5) * 0.8 * rnd(0.5, 1));
      var surf = this.surfaceAt(tx); if (!isFinite(surf)) continue;
      var ty = surf + s * 0.15 + this.depth * Math.random() * r.h * 0.55;
      // which part (for pick and mix) and its colour
      var u = Math.random(), acc = 0, part = k.meshes[0];
      for (var j = 0; j < k.meshes.length; j++) { acc += k.meshes[j].part.share || 1; if (u <= acc) { part = k.meshes[j]; break; } }
      var axis = new T.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize();
      var b = { k: k, part: part, col: pick(part.part.cols), s: s, x: src.x + rnd(-14, 14), y: src.y - rnd(0, 120), vx: (tx - src.x) * rnd(0.9, 1.3), vy: rnd(-40, 60),
        ty: ty, tx: tx, quat: new T.Quaternion().setFromEuler(new T.Euler(rnd(0, 6), rnd(0, 6), rnd(0, 6))), axis: axis, va: (k.spin || 0.4) * rnd(4, 11), bounces: 0, rest: false, group: group,
        t: -i * 0.012 * (k.n > 20 ? 0.6 : 2.5), z: rnd(0, 1) };
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
    this.raf = 0; var dt = Math.min(0.033, (now - this.last) / 1000); this.last = now; var G = Math.max(1600, this.h * 3), moving = false, dq = new T.Quaternion();
    for (var i = 0; i < this.bodies.length; i++) {
      var b = this.bodies[i]; if (b.rest) continue; moving = true;
      if (b.t < 0) { b.t += dt; continue; }
      b.vx += ((b.tx - b.x) * 6 - b.vx) * Math.min(1, dt * 3);
      b.vy += G * dt; b.x += b.vx * dt; b.y += b.vy * dt;
      dq.setFromAxisAngle(b.axis, b.va * dt); b.quat.premultiply(dq);
      var floor = b.ty - b.s / 2;
      if (b.y > floor) {
        b.y = floor;
        if (!b.group.landed) { b.group.landed = true; if (this.onLand) this.onLand(b.group); }
        if (b.bounces < 2 && Math.abs(b.vy) > 120) { b.vy = -b.vy * b.k.rest * rnd(0.7, 1); b.vx *= 0.5; b.va *= 0.6; b.bounces++; }
        else if (b.k.roll && this.depth === 0) {
          var sl = (this.surfaceAt(b.x + 3) - this.surfaceAt(b.x - 3)) / 6; if (!isFinite(sl)) sl = 0;
          b.vx += sl * 900 * dt; b.vx *= 0.96; b.vy = 0; b.axis.set(0, 0, -1); b.va = b.vx / (b.s / 2); b.tx = b.x + b.vx * 0.2;
          b.ty = this.surfaceAt(b.x) + b.s * 0.15; if (Math.abs(b.vx) < 6 || Math.abs(sl) < 0.05) b.rest = true;
        } else { b.rest = true; b.va = 0; }
      }
    }
    this.draw();
    if (moving) this.raf = requestAnimationFrame(this._frame);
  };
  Toppings.prototype.draw = function () {
    var self = this, d = this.dummy, sh = 0;
    Object.keys(this.K).forEach(function (n) { self.K[n].meshes.forEach(function (m) { m.used = 0; }); });
    for (var i = 0; i < this.bodies.length; i++) {
      var b = this.bodies[i]; if (b.t < 0) continue; var m = b.part;
      if (m.used >= m.mesh.instanceMatrix.count) continue;
      // lower on the screen draws in front; a piece sits a little proud of the photo
      d.position.set(b.x, -b.y, b.y * 0.5 + b.z * 4); d.quaternion.copy(b.quat); d.scale.setScalar(b.s);
      d.updateMatrix(); m.mesh.setMatrixAt(m.used, d.matrix); m.mesh.setColorAt(m.used, this.c.set(b.col)); m.used++;
      if (b.rest && sh < this.shadows.instanceMatrix.count) {
        d.position.set(b.x + b.s * 0.12, -b.y - b.s * 0.32, -1000); d.quaternion.identity(); d.scale.set(b.s * 1.3, b.s * 0.7, 1); d.updateMatrix();
        this.shadows.setMatrixAt(sh++, d.matrix);
      }
    }
    Object.keys(this.K).forEach(function (n) { self.K[n].meshes.forEach(function (m) { m.mesh.count = m.used; m.mesh.instanceMatrix.needsUpdate = true; if (m.mesh.instanceColor) m.mesh.instanceColor.needsUpdate = true; }); });
    this.shadows.count = sh; this.shadows.instanceMatrix.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  };

  // a small heap of each topping for its button, drawn by one shared renderer and copied into the button's canvas
  function heaps(list) {
    var c = document.createElement('canvas'), W = 72, H = 56, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = new T.WebGLRenderer({ canvas: c, alpha: true, antialias: true, preserveDrawingBuffer: true }); r.setPixelRatio(dpr); r.setSize(W, H, false);
    r.outputColorSpace = T.SRGBColorSpace; r.debug.checkShaderErrors = false;
    var s = makeScene(r, 1), cam = new T.OrthographicCamera(0, W, 0, -H, -2000, 2000), d = new T.Object3D(), col = new T.Color();
    list.forEach(function (it) {
      var k = s.K[it.name]; if (!k) return;
      Object.keys(s.K).forEach(function (n) { s.K[n].meshes.forEach(function (m) { m.mesh.count = 0; }); });
      var n = Math.min(k.n, k.n > 20 ? 26 : 7), sc = Math.min(1, (H * 0.62) / k.size), used = k.meshes.map(function () { return 0; });
      for (var i = 0; i < n; i++) {
        var s2 = k.size * sc * rnd(0.85, 1.1), a = (i / n) * 6.28 + rnd(-0.3, 0.3), R = rnd(0, 1) * (W * 0.32), j = i % k.meshes.length, m = k.meshes[j];
        if (used[j] >= m.mesh.instanceMatrix.count) continue;
        d.position.set(W / 2 + Math.cos(a) * R, -(H * 0.62 + Math.sin(a) * R * 0.35 - (n < 3 ? 0 : rnd(0, H * 0.12))), i);
        d.rotation.set(rnd(0, 6), rnd(0, 6), rnd(0, 6)); d.scale.setScalar(s2); d.updateMatrix();
        m.mesh.setMatrixAt(used[j], d.matrix); m.mesh.setColorAt(used[j], col.set(pick(m.part.cols))); used[j]++;
      }
      k.meshes.forEach(function (m, j) { m.mesh.count = used[j]; m.mesh.instanceMatrix.needsUpdate = true; if (m.mesh.instanceColor) m.mesh.instanceColor.needsUpdate = true; });
      r.render(s.scene, cam);
      var x = it.canvas.getContext('2d'); it.canvas.width = W * dpr; it.canvas.height = H * dpr; x.drawImage(c, 0, 0);
    });
    r.dispose();
  }

  window.CharlieToppings3D = { Toppings: Toppings, heaps: heaps };
})();
