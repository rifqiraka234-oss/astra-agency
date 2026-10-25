/* Fae Club, the art layer. A WebGL night sky whose colours follow the section in view (the colour script in
   research/art-direction-v2.md), gold dust at three depths behind the page, the fairy's stardust and the bursts on top,
   a fairy light at the cursor, foil invitations that tilt. Everything decorative, nothing the order depends on.
   Reduced motion draws the sky once and keeps the dust still. Without WebGL the CSS sky in site.css stays. */
(function () {
  'use strict';
  var html = document.documentElement, rm = html.classList.contains('rm');
  var fine = window.matchMedia && matchMedia('(pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var hex = function (h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]; };
  var mix = function (a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; };
  var css = function (c, a) { return 'rgba(' + Math.round(c[0] * 255) + ',' + Math.round(c[1] * 255) + ',' + Math.round(c[2] * 255) + ',' + a + ')'; };

  /* base and top of the night, the aurora, the glow */
  var PAL = {
    dusk: ['#021A0E', '#0B2E2A', '#1F6B5C', '#C98A5A'], night: ['#050B1E', '#1A0F3A', '#4B2C7A', '#C8B376'],
    hall: ['#1A1006', '#3A2410', '#8A5A2A', '#F2C879'], dance: ['#021309', '#0A2A1A', '#2D6B4A', '#C8B376'],
    toast: ['#0B0716', '#24113A', '#6A2E6E', '#E8B66A'], moon: ['#08131A', '#102A33', '#2E6E78', '#D9A4B8'],
    late: ['#02060F', '#0A1230', '#233A7A', '#C8B376'], aurora: ['#070C24', '#101945', '#2C8C7A', '#B9C6E0'],
    frost: ['#060A1E', '#121C4A', '#5B3FA0', '#C8B376']
  };
  var CH = { knight: ['#7F9CC4', '#D3DCEA'], prince: ['#4C6FD6', '#E3C46A'], princess: ['#D47A9E', '#F4C3D3'], outlaw: ['#2E9B60', '#D08A4A'], fae: ['#9A6AD6', '#5FD0CC'] };
  Object.keys(PAL).forEach(function (k) { PAL[k] = PAL[k].map(hex); });
  Object.keys(CH).forEach(function (k) { CH[k] = CH[k].map(hex); });
  var GOLD = hex('#F3DE9E'), CHAMP = hex('#FFF6D6');

  var sceneName = document.body.getAttribute('data-sky') || 'dusk';
  var pal = PAL[sceneName].slice(), palT = PAL[sceneName];
  var tint = CH.knight.slice(), tintT = CH.knight;
  var mouse = [0.5, 0.5], mouseT = [0.5, 0.5], pointer = null;

  var scene = function () {
    var mid = innerHeight * 0.5, name = document.body.getAttribute('data-sky');
    $$('[data-sky]').forEach(function (el) { if (el === document.body) return; var r = el.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) name = el.getAttribute('data-sky'); });
    if (PAL[name] && name !== sceneName) { sceneName = name; palT = PAL[name]; html.setAttribute('data-scene', name); if (SPR.gold) SPR.glow = sprite(palT[3]); }
  };

  /* ------------------------------------------------ the sky */
  var sky = $('#sky'), gl = null, prog, U = {}, skyScale = 0.42;
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision mediump float;',
    'uniform vec2 uR;uniform float uT;uniform vec3 uA,uB,uC,uD,uK;uniform vec2 uM;',
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/uR;float ar=uR.x/uR.y;vec2 p=vec2(uv.x*ar,uv.y);float t=uT*.025;',
    ' vec2 q=vec2(fbm(p*1.2+vec2(t,0.)),fbm(p*1.2+vec2(5.2,-t)));',
    ' float f=fbm(p*1.7+q*1.8+vec2(t*.7,-t*.4));',
    ' vec3 col=mix(uA,uB,smoothstep(0.,1.,uv.y*.85+(f-.5)*.4));',
    ' float rib=smoothstep(.5,.95,f)*smoothstep(.05,.75,uv.y);',
    ' col=mix(col,mix(uC,uK,.35),rib*.6);',
    ' float g=smoothstep(.58,1.,fbm(p*.8-q*1.3+vec2(-t*.5,t*.3)));',
    ' col+=mix(uD,uK,.3)*g*.28;',
    ' vec2 m=vec2(uM.x*ar,uM.y);float d=distance(p,m);col+=mix(uD,uK,.4)*.10*exp(-d*d*7.);',
    ' col*=1.-.38*pow(distance(uv,vec2(.5,.55)),1.7);',
    ' gl_FragColor=vec4(col,1.);',
    '}'].join('\n');
  var initSky = function () {
    try { gl = sky.getContext('webgl', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power', preserveDrawingBuffer: false }); } catch (e) { gl = null; }
    if (!gl) return false;
    var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    var v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS);
    if (!v || !f) { gl = null; return false; }
    prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl = null; return false; }
    gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ['uR', 'uT', 'uA', 'uB', 'uC', 'uD', 'uK', 'uM'].forEach(function (k) { U[k] = gl.getUniformLocation(prog, k); });
    sizeSky();
    return true;
  };
  var sizeSky = function () {
    if (!gl) return;
    var w = Math.max(2, Math.round(innerWidth * skyScale)), h = Math.max(2, Math.round(innerHeight * skyScale));
    if (sky.width !== w || sky.height !== h) { sky.width = w; sky.height = h; gl.viewport(0, 0, w, h); }
  };
  var drawSky = function (time) {
    if (!gl) return;
    gl.uniform2f(U.uR, sky.width, sky.height); gl.uniform1f(U.uT, time);
    gl.uniform3fv(U.uA, pal[0]); gl.uniform3fv(U.uB, pal[1]); gl.uniform3fv(U.uC, pal[2]); gl.uniform3fv(U.uD, pal[3]);
    gl.uniform3fv(U.uK, tint[0]); gl.uniform2f(U.uM, mouse[0], 1 - mouse[1]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  /* ------------------------------------------------ sprites, a glow and a four point sparkle, one per colour */
  var sprite = function (c, star) {
    var s = 64, cv = document.createElement('canvas'); cv.width = cv.height = s; var x = cv.getContext('2d');
    var g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, css(mix(c, [1, 1, 1], .6), 1)); g.addColorStop(.18, css(c, .75)); g.addColorStop(.5, css(c, .16)); g.addColorStop(1, css(c, 0));
    x.fillStyle = g; x.fillRect(0, 0, s, s);
    if (star) {
      x.fillStyle = css(mix(c, [1, 1, 1], .7), .95); x.beginPath();
      x.moveTo(32, 2); x.quadraticCurveTo(34, 30, 62, 32); x.quadraticCurveTo(34, 34, 32, 62); x.quadraticCurveTo(30, 34, 2, 32); x.quadraticCurveTo(30, 30, 32, 2); x.fill();
    }
    return cv;
  };
  var SPR = {};
  var makeSprites = function () {
    SPR.gold = sprite(GOLD); SPR.goldS = sprite(GOLD, true); SPR.champ = sprite(CHAMP, true);
    SPR.t1 = sprite(tintT[0]); SPR.t1S = sprite(tintT[0], true); SPR.t2 = sprite(tintT[1], true);
    SPR.glow = sprite(pal[3]);
  };

  /* ------------------------------------------------ the dust behind the page, and the stars */
  var motes = $('#motes'), mctx = motes && motes.getContext('2d'), M = [], STARS = [];
  var sizeMotes = function () {
    if (!motes) return;
    motes.width = innerWidth; motes.height = innerHeight;
    var n = Math.round(Math.min(110, Math.max(24, innerWidth * innerHeight / 16000))) * (low ? .5 : 1);
    M = []; for (var i = 0; i < n; i++) M.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight * 3, z: .25 + Math.random() * .75, r: 2 + Math.random() * 7, v: .05 + Math.random() * .2, ph: Math.random() * 6.28, k: Math.random() });
    STARS = []; var ns = Math.round(innerWidth * innerHeight / 9000);
    for (var j = 0; j < ns; j++) STARS.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight * 2, s: Math.random() < .12 ? 1.6 : .9, ph: Math.random() * 6.28, sp: .5 + Math.random() * 1.5 });
  };
  var drawMotes = function (time) {
    if (!mctx) return;
    var W = motes.width, H = motes.height, sy = window.scrollY || 0;
    mctx.clearRect(0, 0, W, H);
    mctx.globalCompositeOperation = 'source-over';
    for (var j = 0; j < STARS.length; j++) {
      var s = STARS[j], y = ((s.y - sy * .04) % (H * 2) + H * 2) % (H * 2); if (y > H) continue;
      var a = rm ? .55 : .3 + .7 * Math.abs(Math.sin(time * s.sp + s.ph));
      mctx.fillStyle = 'rgba(255,246,214,' + (a * .7).toFixed(3) + ')'; mctx.fillRect(s.x, y, s.s, s.s);
    }
    mctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < M.length; i++) {
      var m = M[i];
      if (!rm) { m.y -= m.v * m.z; m.x += Math.sin(time * .3 + m.ph) * .12 * m.z; }
      var yy = ((m.y - sy * m.z * .35) % (H * 1.2) + H * 1.2) % (H * 1.2) - H * .1;
      var tw = rm ? .7 : .55 + .45 * Math.sin(time * 1.3 + m.ph);
      var spr = m.k < .62 ? SPR.gold : m.k < .82 ? SPR.glow : SPR.t1;
      var size = m.r * 5 * m.z;
      mctx.globalAlpha = Math.max(0, tw * (.28 + .5 * m.z));
      mctx.drawImage(spr, m.x - size / 2, yy - size / 2, size, size);
    }
    mctx.globalAlpha = 1; mctx.globalCompositeOperation = 'source-over';
  };

  /* ------------------------------------------------ the top layer, stardust, bursts and the fairy light */
  var fx = $('#fx'), fctx = fx && fx.getContext('2d'), P = [], fdpr = Math.min(1.5, window.devicePixelRatio || 1);
  var sizeFx = function () { if (!fx) return; fx.width = Math.round(innerWidth * fdpr); fx.height = Math.round(innerHeight * fdpr); fctx.setTransform(fdpr, 0, 0, fdpr, 0, 0); };
  var emit = function (o) { if (P.length < 900) P.push(o); };
  var hand = $('.moon-hand'), conj = $('.conj'), moon = $('.moon');
  var rectC = function (el) { var r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2, r]; };
  var geo = { n: 0, on: 0, h: null, c: null };
  var measure = function () { /* layout is read once every few frames, never inside the particle loop */
    geo.n = 0; geo.on = 0; if (!hand || !moon) return;
    var o = window.__faeMo != null ? window.__faeMo : 1, r = moon.getBoundingClientRect();
    geo.on = r.bottom > 0 && r.top < innerHeight && o > .04 ? o : 0;
    if (geo.on) { geo.h = rectC(hand); geo.c = conj ? rectC(conj) : null; }
  };
  var streamOn = function () { if (geo.n++ % 4 === 0) measure(); return geo.on; };
  var stream = function (dt) {
    var o = streamOn(); if (!o || !geo.h) return;
    var h = geo.h, c = geo.c || [h[0] + 100, h[1] - 200, { width: 120, height: 160 }], k = (low ? 1 : 2) + Math.round((low ? 1 : 3) * o);
    for (var i = 0; i < k; i++) {
      var tx = c[0] + (Math.random() - .5) * c[2].width * .9, ty = c[1] + (Math.random() - .5) * c[2].height * .9;
      var falls = Math.random() < .28;
      emit({ x: h[0] + (Math.random() - .5) * 6, y: h[1] + (Math.random() - .5) * 6, vx: falls ? (Math.random() * .6 + .2) : (tx - h[0]) / 90, vy: falls ? (-Math.random() * .4) : (ty - h[1]) / 90, life: 0, max: falls ? 2.6 + Math.random() : 1.4 + Math.random() * .6, s: 3 + Math.random() * 7 * o, spr: Math.random() < .5 ? 'goldS' : (Math.random() < .5 ? 't1S' : 'champ'), curl: (Math.random() - .5) * 1.6, g: falls ? .012 : 0, a: o });
    }
  };
  var burst = function (x, y, n, opt) {
    opt = opt || {};
    for (var i = 0; i < n; i++) {
      var a = Math.random() * 6.283, sp = (opt.speed || 4) * (.3 + Math.random());
      emit({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (opt.lift || 0), life: 0, max: (opt.life || 1.2) * (.6 + Math.random() * .6), s: (opt.size || 10) * (.4 + Math.random()), spr: opt.sprs ? opt.sprs[i % opt.sprs.length] : 'goldS', g: opt.g || .05, drag: .96, target: opt.target || null, delay: opt.homing || 0, leaf: opt.leaf && Math.random() < .5, rot: Math.random() * 6, vr: (Math.random() - .5) * .3, a: 1 });
    }
    wakeFx();
  };
  var drawFx = function (dt, time) {
    if (!fctx) return false;
    fctx.clearRect(0, 0, innerWidth, innerHeight);
    if (!rm) stream(dt);
    fctx.globalCompositeOperation = 'lighter';
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i]; p.life += dt;
      if (p.life >= p.max) { P.splice(i, 1); continue; }
      if (p.target && p.life > p.delay) { var tr = p.target.getBoundingClientRect(), tx = tr.left + tr.width / 2, ty = tr.top + tr.height / 2; p.vx += (tx - p.x) * .012; p.vy += (ty - p.y) * .012; p.vx *= .9; p.vy *= .9; }
      if (p.curl) { var a = Math.atan2(p.vy, p.vx) + p.curl * .015; var sp = Math.hypot(p.vx, p.vy); p.vx = Math.cos(a) * sp; p.vy = Math.sin(a) * sp; }
      if (p.drag) { p.vx *= p.drag; p.vy *= p.drag; }
      p.vy += p.g || 0; p.x += p.vx * dt * 60; p.y += p.vy * dt * 60;
      var lf = p.life / p.max, al = (lf < .15 ? lf / .15 : 1 - (lf - .15) / .85) * (p.a || 1);
      if (p.leaf) {
        p.rot += p.vr; fctx.globalCompositeOperation = 'source-over'; fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.rot); fctx.scale(1, Math.abs(Math.sin(p.rot * 2)) * .8 + .2);
        fctx.fillStyle = 'rgba(232,200,120,' + (al * .9).toFixed(3) + ')'; fctx.fillRect(-p.s * .35, -p.s * .25, p.s * .7, p.s * .5); fctx.restore(); fctx.globalCompositeOperation = 'lighter';
      } else {
        var spr = SPR[p.spr] || SPR.goldS; fctx.globalAlpha = Math.max(0, al); fctx.drawImage(spr, p.x - p.s / 2, p.y - p.s / 2, p.s, p.s);
      }
    }
    fctx.globalAlpha = 1;
    if (pointer && fine && !rm) {
      var g = fctx.createRadialGradient(pointer[0], pointer[1], 0, pointer[0], pointer[1], 70);
      g.addColorStop(0, css(mix(GOLD, tint[0], .35), .22)); g.addColorStop(1, css(GOLD, 0));
      fctx.fillStyle = g; fctx.fillRect(pointer[0] - 70, pointer[1] - 70, 140, 140);
    }
    fctx.globalCompositeOperation = 'source-over';
    return P.length > 0 || geo.on > 0 || !!pointer;
  };

  /* ------------------------------------------------ one loop for the three layers */
  var last = 0, running = false, fxAwake = true, skyEvery = 0, low = false, frames = 0, slow = 0, odd = 0, ready = false;
  var wakeFx = function () { fxAwake = true; start(); };
  var frame = function (now) {
    if (!running) return;
    var t = now / 1000, dt = Math.min(.05, last ? t - last : .016); last = t;
    for (var i = 0; i < 4; i++) pal[i] = mix(pal[i], palT[i], .035);
    tint[0] = mix(tint[0], tintT[0], .05); tint[1] = mix(tint[1], tintT[1], .05);
    mouse[0] += (mouseT[0] - mouse[0]) * .05; mouse[1] += (mouseT[1] - mouse[1]) * .05;
    if (!low && frames < 120) { frames++; if (dt > 1 / 32) slow++; if (frames === 120 && slow > 50) { low = true; M = M.slice(0, Math.ceil(M.length / 2)); } }
    if ((skyEvery = (skyEvery + 1) % (low ? 4 : 2)) === 0) drawSky(t);
    if (!low || (odd = 1 - odd)) drawMotes(t);
    if (fxAwake) fxAwake = drawFx(dt, t);
    if (document.hidden) { running = false; return; }
    requestAnimationFrame(frame);
  };
  var start = function () { if (rm || !ready) return; if (!running) { running = true; last = 0; requestAnimationFrame(frame); } };
  var still = function () { /* reduced motion, one quiet frame whenever the scene changes */ if (!ready) return; for (var i = 0; i < 4; i++) pal[i] = palT[i].slice(); tint = tintT.slice(); drawSky(3); drawMotes(0); };
  document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });

  /* ------------------------------------------------ what the page tells the art */
  var FAE = window.FAE = {
    setChar: function (id) {
      if (!CH[id]) return; tintT = CH[id]; html.setAttribute('data-ch', id);
      if (!ready) return;
      SPR.t1 = sprite(tintT[0]); SPR.t1S = sprite(tintT[0], true); SPR.t2 = sprite(tintT[1], true);
      if (rm) still();
    },
    cast: function (from) {
      if (rm || !ready || !from) return;
      var r = from.getBoundingClientRect(), target = conj && streamOn() ? conj : $('.cov-oval');
      burst(r.left + r.width / 2, r.top + r.height / 2, 46, { speed: 3, life: 1.6, size: 12, sprs: ['goldS', 't1S', 'champ', 't2'], g: 0, target: target, homing: .18 });
      if (conj) { conj.classList.remove('pop'); void conj.offsetWidth; conj.classList.add('pop'); }
    },
    paid: function (el) {
      if (rm || !ready || !el) return;
      setTimeout(function () {
        var sl = el.querySelector('.tk-seal'), r = el.getBoundingClientRect(), sr = sl ? sl.getBoundingClientRect() : null, x = sr ? sr.left + sr.width / 2 : r.right - 22, y = sr ? sr.top + sr.height / 2 : r.bottom - 22;
        burst(x, y, 70, { speed: 6, life: 1.6, size: 13, sprs: ['goldS', 'champ', 't1S'], g: .06, leaf: true });
        burst(r.left + r.width / 2, r.top + r.height * .55, 50, { speed: 3.5, life: 2, size: 9, sprs: ['champ', 'goldS'], g: .02, lift: 1 });
      }, 420);
    },
    scene: scene
  };

  /* the invitations tilt toward the pointer and their foil follows it */
  if (fine && !rm) $$('.tier.inv').forEach(function (c) {
    var sh = $('.sheen', c);
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--ry', ((px - .5) * 7).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - py) * 6).toFixed(2) + 'deg');
      if (sh) { sh.style.setProperty('--mx', (px * 100).toFixed(1) + '%'); sh.style.setProperty('--my', (py * 100).toFixed(1) + '%'); }
    });
    c.addEventListener('pointerleave', function () { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
  });

  /* the ornaments draw themselves when they come into view */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px' });
    $$('.orn').forEach(function (o) { io.observe(o); });
  } else $$('.orn').forEach(function (o) { o.classList.add('in'); });

  window.addEventListener('pointermove', function (e) {
    mouseT = [e.clientX / innerWidth, e.clientY / innerHeight];
    if (ready && fine && !rm && e.pointerType === 'mouse') {
      pointer = [e.clientX, e.clientY];
      if (Math.random() < .5) emit({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * .8, vy: Math.random() * .5 + .1, life: 0, max: .7 + Math.random() * .5, s: 4 + Math.random() * 6, spr: Math.random() < .6 ? 'goldS' : 't1S', g: .01, a: .9 });
      wakeFx();
    }
  }, { passive: true });
  document.addEventListener('pointerleave', function () { pointer = null; });
  window.addEventListener('scroll', function () { scene(); if (rm) still(); else if (streamOn()) wakeFx(); }, { passive: true });
  window.addEventListener('resize', function () { sizeSky(); sizeMotes(); sizeFx(); if (rm) still(); });

  var boot = function () {
    scene(); pal = palT.map(function (c) { return c.slice(); });
    if (sky && initSky()) drawSky(0);
    makeSprites(); sizeMotes(); sizeFx(); ready = true;
    if (rm) { still(); return; }
    start();
  };
  var idle = function (f) { if ('requestIdleCallback' in window) requestIdleCallback(f, { timeout: 1200 }); else setTimeout(f, 300); };
  /* a page that reads like a document (the plan) wakes its sky on the first scroll or touch, not during loading */
  var late = document.body.hasAttribute('data-art-late'), booted = false;
  var go = function () { if (booted) return; booted = true; ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(function (e) { window.removeEventListener(e, go); }); idle(boot); };
  if (late) ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(function (e) { window.addEventListener(e, go, { passive: true }); });
  else if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
})();
