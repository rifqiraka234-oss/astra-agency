/* Honey It's Handled prototype, the art layer. Her envelope opening on arrival, the days drawn as her HH, her own
   Cinco Cero film inside her HH, her red spreading like ink through paper, the letter sealed with her sticker, and one
   shader of pigment in paper behind it all. Everything has a still state, under reduced motion it's drawn complete. */
(function () {
  'use strict';
  var doc = document, html = doc.documentElement, H = window.HIH;
  if (!H) return;
  H.timing = {};
  var RM = H.RM, D = H.D;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var ready = false;

  // ------------------------------------------------------------ a small seeded random, so the ink is the same every load
  function rnd(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // ------------------------------------------------------------ 1. her envelope opens on arrival
  var env = doc.querySelector('[data-env]');
  function openEnv() { if (env) env.classList.add('is-open'); }
  // on a desktop pointer the envelope leans toward the hand, a few degrees, like paper on a table
  if (env && !RM && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var hero = doc.querySelector('.hero'), tx = 0, ty = 0, rafT = 0;
    hero.addEventListener('pointermove', function (e) { var r = env.getBoundingClientRect(); tx = ((e.clientX - (r.left + r.width / 2)) / innerWidth); ty = ((e.clientY - (r.top + r.height / 2)) / innerHeight); if (!rafT) rafT = requestAnimationFrame(function () { rafT = 0; env.style.transform = 'rotate(-5deg) rotateY(' + (tx * 7).toFixed(2) + 'deg) rotateX(' + (-ty * 6).toFixed(2) + 'deg)'; }); });
    hero.addEventListener('pointerleave', function () { env.style.transform = ''; });
  }
  if (RM) openEnv(); else { var openSoon = function () { setTimeout(openEnv, 380); }; if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(openSoon, openSoon); else openSoon(); }

  // ------------------------------------------------------------ 2. your days, drawn as her HH
  var box = doc.querySelector('.days-box'), cv = doc.querySelector('[data-days]');
  var yearSec = doc.getElementById('year'), run = doc.querySelector('.year-run');
  var notes = [].slice.call(doc.querySelectorAll('[data-note]'));
  var steps = [].slice.call(doc.querySelectorAll('[data-stepi]'));
  var hh = new Path2D(D.hh), HW = D.hhW, HHh = D.hhH;
  // her HH rasterised once, so every inside test is a lookup, not a path test
  var mask = (function () { var c = doc.createElement('canvas'); c.width = HW; c.height = HHh; var x = c.getContext('2d'); x.fillStyle = '#000'; x.fill(hh, 'evenodd'); var d = x.getImageData(0, 0, HW, HHh).data, m = new Uint8Array(HW * HHh); for (var i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 127 ? 1 : 0; return m; })();
  var SLOPE = 0.2853;  // the HH's stems lean 0.2853 units right per unit up, measured on her 7379 px PNG (art/trace.py source)
  var lay = null, lastK = -1;
  function inside(x, y) { if (x < 0 || y < 0) return false; var ix = Math.round(x), iy = Math.round(y); return ix < HW && iy < HHh && mask[iy * HW + ix] === 1; }
  function slantRun(x, y) {
    // how far the slanted line through (x, y) stays inside, up and down, so thin flat parts can be told from stems
    var up = 0, dn = 0, k;
    for (k = 1; k < 200; k++) { if (!inside(x + SLOPE * k, y - k)) break; up = k; }
    for (k = 1; k < 200; k++) { if (!inside(x - SLOPE * k, y + k)) break; dn = k; }
    return up + dn;
  }
  function layout(N) {
    var tL = performance.now();
    // hatch lines parallel to her stems, cut to the inside of the traced HH, and flat strokes for her crossbars and
    // serifs, then exactly N strokes along them, one for each day, ordered left to right
    var area = 0, stepA = 6;
    for (var y = 0; y < HHh; y += stepA) for (var x = 0; x < HW; x += stepA) if (inside(x, y)) area += stepA * stepA;
    var sp = Math.max(6, Math.min(40, Math.sqrt(0.3 * area / N)));
    var sx = sp / Math.cos(Math.atan(SLOPE)), thin = 2.6 * sp, segs = [];
    for (var c = -SLOPE * HHh - sx; c < HW + sx; c += sx) {
      var on = false, ys = 0;
      for (var yy = HHh; yy >= -3; yy -= 1.5) {
        var xx = c + SLOPE * (HHh - yy), isIn = inside(xx, yy);
        if (isIn && !on) { on = true; ys = yy; }
        if (!isIn && on) {
          on = false; var y1 = yy + 1.5, len = (ys - y1) * Math.sqrt(1 + SLOPE * SLOPE);
          if (len >= thin) segs.push({ k: 's', x0: c + SLOPE * (HHh - ys), y0: ys, x1: c + SLOPE * (HHh - y1), y1: y1, len: len });
        }
      }
    }
    var sy = Math.max(5, sp * 0.62);
    for (var hy = sy / 2; hy < HHh; hy += sy) {
      var onh = false, xs = 0;
      for (var hx = -2; hx <= HW + 2; hx += 1.5) {
        var inH = inside(hx, hy) && slantRun(hx, hy) < thin;
        if (inH && !onh) { onh = true; xs = hx; }
        if (!inH && onh) { onh = false; var l = hx - 1.5 - xs; if (l > sp * .9) segs.push({ k: 'h', x0: xs, y0: hy, x1: hx - 1.5, y1: hy, len: l }); }
      }
    }
    segs.sort(function (a, b) { return (a.x0 + a.x1) - (b.x0 + b.x1) || b.y0 - a.y0; });
    var L = 0; segs.forEach(function (s) { s.at = L; L += s.len; });
    var per = L / N, dash = per * 0.68, r = rnd(29), strokes = [], si = 0;
    for (var i = 0; i < N; i++) {
      var a = i * per; while (si < segs.length - 1 && segs[si].at + segs[si].len <= a) si++;
      var s = segs[si], f0 = (a - s.at) / s.len, f1 = Math.min(1, (a - s.at + dash) / s.len);
      var j = (r() - .5) * sp * .1;
      var x0 = s.x0 + (s.x1 - s.x0) * f0, y0 = s.y0 + (s.y1 - s.y0) * f0, x1 = s.x0 + (s.x1 - s.x0) * f1, y1 = s.y0 + (s.y1 - s.y0) * f1;
      if (s.k === 's') { x0 += j; x1 += j + (r() - .5) * sp * .06; } else { y0 += j * .5; y1 += j * .5; }
      strokes.push({ x0: x0, y0: y0, x1: x1, y1: y1, w: (s.k === 'h' ? Math.min(sp * .42, sy * .7) : sp * (0.4 + r() * 0.08)) });
    }
    H.timing.layout = Math.round(performance.now() - tL); H.timing.segs = segs.length; H.timing.sp = sp; H.timing.L = Math.round(L);
    return { N: N, sp: sp, strokes: strokes };
  }
  var dpr = Math.min(2, window.devicePixelRatio || 1), cx = cv ? cv.getContext('2d') : null, cw = 0, ch = 0;
  function sizeCanvas() { if (!cv) return; var w = box.clientWidth, h = box.clientHeight; if (!w || !h) return; if (w * dpr !== cw || h * dpr !== ch) { cw = cv.width = Math.round(w * dpr); ch = cv.height = Math.round(h * dpr); lastK = -1; } }
  function noteSpots() {
    if (!lay) return;
    var fr = [0.05, 0.17, 0.29, 0.43, 0.57, 0.71, 0.85];
    notes.forEach(function (li, i) {
      var at = Math.min(lay.N - 1, Math.floor(fr[i] * lay.N)), st = lay.strokes[at];
      li._st = st; li._at = at; li._left = st.x1 < HW * 0.5; li._y = Math.max(.04, Math.min(.96, st.y1 / HHh));
    });
    [true, false].forEach(function (side) {
      var g = notes.filter(function (li) { return li._left === side; }).sort(function (a, b) { return a._y - b._y; });
      var bh = box.clientHeight || 1, hs = g.map(function (li) { return (li.offsetHeight + 6) / bh; });
      for (var k = 1; k < g.length; k++) { var gap = (hs[k - 1] + hs[k]) / 2; if (g[k]._y - g[k - 1]._y < gap) g[k]._y = g[k - 1]._y + gap; }
      var last = g.length - 1, over = g.length ? g[last]._y + hs[last] / 2 - 1 : 0;
      if (over > 0) g.forEach(function (li) { li._y -= over; });
      if (g.length && g[0]._y - hs[0] / 2 < 0) { var up = hs[0] / 2 - g[0]._y; g.forEach(function (li) { li._y += up; }); }
    });
    notes.forEach(function (li) {
      li.style.setProperty('--x', (li._left ? 0 : 100) + '%');
      li.style.setProperty('--y', (li._y * 100).toFixed(2) + '%');
      li.style.setProperty('--tx', li._left ? '0%' : '-100%');
      li.classList.toggle('is-right', !li._left);
    });
  }
  function draw(k) {
    if (!cx || !lay || !cw) return;
    var s = cw / HW, n = lay.N, cut = H.stepIn(n, H.S.help);
    H.drawn = { N: n, k: Math.min(k, n), cut: cut, strokes: lay.strokes.length };
    cx.setTransform(1, 0, 0, 1, 0, 0); cx.clearRect(0, 0, cw, ch); cx.setTransform(s, 0, 0, s, 0, 0);
    cx.lineCap = 'round';
    // the underdrawing, so the HH reads before it's inked
    cx.globalAlpha = 1; cx.lineWidth = 1.2 / s * dpr; cx.strokeStyle = 'rgba(150,33,34,.3)'; cx.stroke(hh);
    cx.strokeStyle = 'rgba(150,33,34,.09)';
    for (var i = k; i < n; i++) { var t = lay.strokes[i]; cx.lineWidth = t.w * .5; cx.beginPath(); cx.moveTo(t.x0, t.y0); cx.lineTo(t.x1, t.y1); cx.stroke(); }
    for (i = 0; i < k && i < n; i++) {
      t = lay.strokes[i]; var hers = i >= cut;
      cx.strokeStyle = hers ? '#962122' : '#8FB6C0'; cx.lineWidth = t.w;
      cx.beginPath(); cx.moveTo(t.x0, t.y0); cx.lineTo(t.x1, t.y1); cx.stroke();
      cx.fillStyle = hers ? '#6E1214' : '#6F9AA6'; cx.beginPath(); cx.arc(t.x1, t.y1, t.w * .56, 0, 6.2832); cx.fill();
    }
    // hairlines from each note to its day
    notes.forEach(function (li) {
      if (!li._st || li._at >= k) return;
      var x = li._left ? 4 : HW - 4, ly = li._y * HHh;
      cx.strokeStyle = 'rgba(46,41,41,.55)'; cx.lineWidth = 1 / s * dpr; cx.beginPath(); cx.moveTo(li._st.x1, li._st.y1); cx.lineTo(li._st.x1 + (li._left ? -14 : 14), ly); cx.lineTo(x, ly); cx.stroke();
      cx.fillStyle = '#2E2929'; cx.beginPath(); cx.arc(li._st.x1, li._st.y1, 2.6 / s * dpr, 0, 6.2832); cx.fill();
    });
  }
  var WDs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], MOs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var inkDay = doc.querySelector('[data-o="inkDay"]');
  function dayLabel(k, n) {
    if (k <= 0) return 'Today';
    if (k >= n) return H.S.noDate ? 'Your wedding day' : 'Your wedding day, ' + WDs[H.target().getDay()] + ' ' + H.target().getDate() + ' ' + MOs[H.target().getMonth()];
    var d = new Date(H.today.getFullYear(), H.today.getMonth(), H.today.getDate() + k);
    return 'Day ' + k + ', ' + WDs[d.getDay()] + ' ' + d.getDate() + ' ' + MOs[d.getMonth()] + ' ' + d.getFullYear();
  }
  var live = !!(yearSec && yearSec.classList.contains('is-live'));
  function progress() {
    if (!live) return 1;
    var r = run.getBoundingClientRect(), total = r.height - innerHeight;
    var p = total > 0 ? -r.top / total : 1;
    return Math.max(0, Math.min(1, (p - 0.04) / 0.86));
  }
  function updateYear(force) {
    if (!lay) return;
    var p = progress(), n = lay.N, k = Math.round(p * n);
    if (k === lastK && !force) return;
    lastK = k; draw(k);
    if (inkDay) inkDay.textContent = live ? dayLabel(k, n) : 'One stroke for each of the ' + n + ' days';
    var f = n ? k / n : 1, act = f < .25 ? 0 : f < .6 ? 1 : f < .985 ? 2 : 3;
    steps.forEach(function (li, i) { li.classList.toggle('is-on', i === act); li.classList.toggle('is-later', i > act); });
    notes.forEach(function (li) { li.classList.toggle('is-on', li._at < k); });
  }
  function relayout() { if (!cv) return; var n = H.days(); lay = layout(n); sizeCanvas(); noteSpots(); updateYear(true); }
  var lastN = 0, cache = {}, rt = 0;
  function relayoutSoon() { clearTimeout(rt); rt = setTimeout(function () { lay = cache[lastN] || (cache[lastN] = layout(lastN)); sizeCanvas(); noteSpots(); lastK = -1; updateYear(true); }, 90); }
  H.on(function () { var n = H.days(); if (n !== lastN) { lastN = n; relayoutSoon(); } else { lastK = -1; updateYear(true); } });

  // ------------------------------------------------------------ 3. her own night inside her HH
  var film = doc.querySelector('[data-film]'), vid = film && film.querySelector('video');
  if (film && vid && !RM && !saveData && 'IntersectionObserver' in window) {
    vid.addEventListener('playing', function () { film.classList.add('is-playing'); });
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { if (vid.preload !== 'auto') { vid.preload = 'auto'; } var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {}); }
        else { vid.pause(); film.classList.remove('is-playing'); }
      });
    }, { threshold: 0.25 }).observe(film);
  }

  // ------------------------------------------------------------ 4. red, like ink through paper
  var day = doc.getElementById('day'), bl = null, bctx = null, field = null, BW = 0, BH = 0, bloomed = false;
  if (day) {
    if (RM) day.classList.add('is-bloomed');
    else {
      bl = doc.createElement('canvas'); bl.className = 'bloom'; bl.setAttribute('aria-hidden', 'true'); day.insertBefore(bl, day.firstChild); bctx = bl.getContext('2d');
      var drop = doc.querySelector('[data-drop]'); if (drop) drop.style.display = 'block';
    }
  }
  function bloomField() {
    BW = innerWidth < 700 ? 240 : 420; BH = Math.max(120, Math.round(BW * innerHeight / Math.max(320, innerWidth)));
    bl.width = BW; bl.height = BH; field = new Float32Array(BW * BH);
    var r = rnd(7), g = [], G = 24;
    for (var i = 0; i < (G + 1) * (G + 1); i++) g.push(r());
    function vn(x, y) { var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi; xi = ((xi % G) + G) % G; yi = ((yi % G) + G) % G; var x1 = (xi + 1) % G, y1 = (yi + 1) % G; var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf); var a = g[yi * (G + 1) + xi], b = g[yi * (G + 1) + x1], c = g[y1 * (G + 1) + xi], d = g[y1 * (G + 1) + x1]; return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; }
    for (var y = 0; y < BH; y++) for (var x = 0; x < BW; x++) {
      var wx = x + 22 * vn(x / 31 + 5, y / 31), wy = y + 22 * vn(x / 29, y / 29 + 9);           // warped, so the ink finds its way
      var n = vn(wx / 40, wy / 40) * .58 + vn(wx / 13, wy / 13) * .28 + vn(wx / 3.4, wy / 10) * .14;   // the last term is stretched, the paper's fibres
      field[y * BW + x] = n;
    }
  }
  var lastP = -1;
  function updateBloom() {
    if (!bl) return;
    var r = day.getBoundingClientRect();
    if (r.top > innerHeight * 1.05 || r.top < -innerHeight) return;            // only near the red, never every frame
    var p = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * 0.95)));
    if (Math.abs(p - lastP) < 0.002 && field) return;
    lastP = p;
    if (!field) bloomField();
    if (p >= .9 && !bloomed) { bloomed = true; day.classList.add('is-bloomed'); }
    var drop = doc.querySelector('[data-drop]');
    if (drop) drop.style.opacity = p > .5 ? '0' : '1';
    var img = bctx.createImageData(BW, BH), d = img.data;
    var gut = parseFloat(getComputedStyle(html).getPropertyValue('--gut')) || 24;
    var ox = (gut + 7) / innerWidth * BW, oy = (innerHeight * .12 - 27) / innerHeight * BH;
    var maxd = Math.hypot(BW, BH), T = p * 1.25 - 0.08;
    for (var y = 0; y < BH; y++) for (var x = 0; x < BW; x++) {
      var i = y * BW + x, dist = Math.hypot(x - ox, (y - oy) * 1.05) / maxd, v = dist - (field[i] - .5) * .34;
      var o = i * 4;
      var e = v - T;                                  // below zero is inked, the band just under zero is the wet edge
      if (e < -.03) { d[o + 3] = 0; }
      else if (e < 0) { var k2 = (e + .03) / .03; d[o] = 110; d[o + 1] = 18; d[o + 2] = 20; d[o + 3] = Math.round(255 * k2 * k2); }
      else { var w = Math.max(0, 1 - e / .06); d[o] = 231 - 70 * w * w; d[o + 1] = 242 - 190 * w * w; d[o + 2] = 244 - 190 * w * w; d[o + 3] = 255; }
    }
    bctx.putImageData(img, 0, 0);
  }

  // ------------------------------------------------------------ 5. the letter, sealed with her sticker
  H.seal = function (done) {
    var e2 = doc.querySelector('[data-env2]'); if (!e2) { done && done(); return; }
    var kids = e2.querySelectorAll('*'); kids.forEach(function (k) { k.style.transition = 'none'; });
    e2.classList.add('is-open'); void e2.offsetWidth;
    kids.forEach(function (k) { k.style.transition = ''; });
    if (RM) { e2.classList.add('is-closing'); done && done(); return; }
    requestAnimationFrame(function () { e2.classList.add('is-closing'); setTimeout(function () { done && done(); }, 2100); });
  };

  // ------------------------------------------------------------ 6. pigment in paper, one shader behind the page
  var pc = doc.getElementById('paper'), gl = null, prog = null, uni = {}, act = 0, actT = 0, t0 = performance.now(), slow = 0;
  try { gl = pc.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, powerPreference: 'low-power' }); } catch (e) { gl = null; }
  var FS = [
    'precision highp float;',
    'uniform vec2 r; uniform float t, sc, a;',
    'float h(vec2 p){p=fract(p*vec2(.1031,.1030));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
    'float fb(vec2 p){float s=0.,m=.5;for(int k=0;k<5;k++){s+=m*n(p);p=p*2.03+vec2(1.7,9.2);m*=.5;}return s;}',
    'void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.);p.y+=sc*.00028;',
    ' float q=fb(p*1.5+vec2(t*.012,-t*.007));float w=fb(p*2.6+q*1.5+vec2(-t*.006,t*.01));',
    ' float pool=smoothstep(.44,.7,w);float tide=smoothstep(.022,0.,abs(w-.6));',
    ' vec3 c0=mix(vec3(1.),vec3(.95,.975,.985),pool*.8);',
    ' vec3 c1=mix(vec3(1.),vec3(.83,.915,.935),pool)*(1.-tide*.07);',
    ' vec3 c2=mix(vec3(1.),vec3(.8,.72,.72),pool)*(1.-tide*.1);',
    ' vec3 c=a<1.?mix(c0,c1,a):mix(c1,c2,a-1.);',
    ' gl_FragColor=vec4(c,1.);}'
  ].join('\n');
  function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  if (gl) {
    try {
      var FS2 = FS; if (!gl.getShaderPrecisionFormat || gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision === 0) FS2 = FS.replace('highp', 'mediump');
      prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}')); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS2)); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
      gl.useProgram(prog); var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      ['r', 't', 'sc', 'a'].forEach(function (k) { uni[k] = gl.getUniformLocation(prog, k); });
      html.classList.add('gl');
    } catch (e) { gl = null; }
  }
  var acts = [].slice.call(doc.querySelectorAll('section[data-act], footer[data-act]'));
  function actNow() { var mid = innerHeight * .5, v = 0; for (var i = 0; i < acts.length; i++) { var r = acts[i].getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) v = +acts[i].getAttribute('data-act'); } return v; }
  function sizeGL() { if (!gl) return; var k = 0.34; pc.width = Math.max(2, Math.round(innerWidth * k)); pc.height = Math.max(2, Math.round(innerHeight * k)); gl.viewport(0, 0, pc.width, pc.height); }
  function drawGL(time) {
    if (!gl) return;
    actT = actNow(); act += (actT - act) * (RM ? 1 : 0.06);
    gl.uniform2f(uni.r, pc.width, pc.height); gl.uniform1f(uni.t, RM ? 3 : (time - t0) / 1000); gl.uniform1f(uni.sc, scrollY * 0.34); gl.uniform1f(uni.a, act);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  // ------------------------------------------------------------ one loop, paused when the tab is hidden
  var lastT = 0, running = true;
  function frame(time) {
    if (!running) return;
    if (time - lastT > (slow > 6 ? 66 : 33)) {
      var t1 = performance.now();
      drawGL(time); ensureLayout(); updateYear(false); if (bl) updateBloom();
      if (performance.now() - t1 > 14) slow++; else if (slow > 0) slow -= .25;
      lastT = time;
    }
    requestAnimationFrame(frame);
  }
  var laid = false;
  function ensureLayout() { if (laid || !yearSec) return; if (yearSec.getBoundingClientRect().top < innerHeight * 2.5) { laid = true; lastN = H.days(); relayout(); } }
  // decoration starts on the first scroll, touch, key or pointer move, so nothing heavy runs while the page loads
  var going = false, GO = ['scroll', 'wheel', 'pointermove', 'touchstart', 'keydown'];
  H.artStarted = function () { return going; };
  function startArt() { if (going) return; going = true; GO.forEach(function (t) { removeEventListener(t, startArt); }); addEventListener('scroll', ensureLayout, { passive: true }); ensureLayout(); requestAnimationFrame(frame); }
  function start() {
    ready = true;
    sizeGL();
    if (RM) { drawGL(0); if (!laid) { laid = true; lastN = H.days(); relayout(); } return; }
    drawGL(0);
    GO.forEach(function (t) { addEventListener(t, startArt, { passive: true }); });
    if (scrollY > 0 || location.hash) startArt();
  }
  doc.addEventListener('visibilitychange', function () { if (RM || !going) return; running = !doc.hidden; if (running) requestAnimationFrame(frame); });
  addEventListener('resize', function () { if (!ready) return; sizeGL(); sizeCanvas(); noteSpots(); lastK = -1; field = null; lastP = -1; if (RM) { drawGL(0); updateYear(true); } });
  if (doc.readyState === 'complete') start(); else addEventListener('load', start);
})();
