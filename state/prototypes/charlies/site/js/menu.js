/* The favourites and the menu. A favourite or anything with a hat beside it opens in the builder, dressed, at its
   menu price. Everything else goes straight on the order. The pick and mix wall is their own macro of fizzy sweets,
   and it parts round your finger or the cursor. Exposes window.CharlieMenu. */
(function () {
  'use strict';
  var O = window.CharlieOrder;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function toBuilder() {
    var t = document.getElementById('make');
    if (window.CharlieMotion) window.CharlieMotion.scrollTo(t); else t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }

  function flash(btn, text) {
    var a = $('.mi__act', btn); if (!a) return;
    var was = a.dataset.was || a.textContent; a.dataset.was = was;
    btn.classList.add('is-added'); a.textContent = text;
    clearTimeout(btn._t); btn._t = setTimeout(function () { btn.classList.remove('is-added'); a.textContent = was; }, 1600);
  }

  function wire(onPreset, onBase, onTopping) {
    // favourites and hat items: the favourite lands dressed in the builder
    $$('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () { O.usePreset(b.dataset.preset); onPreset(b.dataset.preset); toBuilder(); });
    });
    // create your own lines open that base, and a frozen yoghurt in its size
    $$('[data-base-open]').forEach(function (b) {
      b.addEventListener('click', function () {
        var patch = { base: b.dataset.baseOpen, preset: null, creation: true };
        if (b.dataset.sizeOpen) patch.size = b.dataset.sizeOpen;
        onBase(patch); toBuilder();
      });
    });
    // everything else is added beside the creation
    $$('[data-item]').forEach(function (b) {
      b.addEventListener('click', function () { O.addItem(b.dataset.item, b.dataset.name, +b.dataset.pence); flash(b, 'Added'); });
    });
    $$('[data-topping-open]').forEach(function (b) {
      b.addEventListener('click', function () { onTopping(b.dataset.toppingOpen); toBuilder(); });
    });
  }

  // ---------- the pick and mix wall ----------
  var VS = 'attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }';
  var FS = [
    'precision mediump float; varying vec2 vUv; uniform sampler2D uImg; uniform vec2 uRes; uniform vec2 uImgRes; uniform vec3 uP; uniform float uT;',
    'void main(){',
    // cover fit
    '  vec2 s = uRes / uImgRes; float k = max(s.x, s.y); vec2 sz = uImgRes * k; vec2 off = (uRes - sz) * 0.5;',
    '  vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uRes;',
    // push the sweets out of a ring round the pointer, like parting a heap with a hand
    '  vec2 d = px - uP.xy; float r = length(d); float R = uP.z;',
    '  float push = R * 0.55 * exp(-r * r / (R * R * 0.6)) * step(1.0, R);',
    '  vec2 q = px - normalize(d + 0.0001) * push;',
    '  vec2 uv = (q - off) / sz;',
    '  vec3 c = texture2D(uImg, uv).rgb;',
    // a little shade in the hollow
    '  c *= 1.0 - 0.28 * exp(-r * r / (R * R * 0.18)) * step(1.0, R);',
    '  gl_FragColor = vec4(c, 1.0);',
    '}'
  ].join('\n');
  // the wall's WebGL is only made when it comes near the screen
  function pickmix() {
    var host = $('#pickmix'); if (!host || reduced || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); wall(host); } }, { rootMargin: '60% 0px' });
    io.observe(host);
  }
  function wall(host) {
    var cv = $('#pickmix-gl'), img = $('.pickmix__img', host);
    var gl = cv.getContext('webgl', { antialias: false, alpha: false }); if (!gl) return;
    function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; }
    var pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return; gl.useProgram(pr);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'aPos'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var u = {}; ['uImg', 'uRes', 'uImgRes', 'uP', 'uT'].forEach(function (n) { u[n] = gl.getUniformLocation(pr, n); });
    var tex = gl.createTexture(), ready = false, W = 0, H = 0, dpr = 1;
    var P = { x: -999, y: -999, r: 0, tr: 0, tx: -999, ty: -999 }, raf = 0, visible = false;
    function upload() {
      gl.bindTexture(gl.TEXTURE_2D, tex); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ready = true; host.classList.add('has-mix-gl'); size(); draw();
    }
    function size() { dpr = Math.min(1.5, window.devicePixelRatio || 1); W = host.clientWidth; H = host.clientHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    function draw() {
      raf = 0; if (!ready) return;
      P.x += (P.tx - P.x) * 0.18; P.y += (P.ty - P.y) * 0.18; P.r += (P.tr - P.r) * 0.12;
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(u.uRes, W, H); gl.uniform2f(u.uImgRes, img.naturalWidth, img.naturalHeight); gl.uniform3f(u.uP, P.x, P.y, P.r); gl.uniform1i(u.uImg, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (visible && (Math.abs(P.tx - P.x) > 0.3 || Math.abs(P.ty - P.y) > 0.3 || Math.abs(P.tr - P.r) > 0.3)) raf = requestAnimationFrame(draw);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(draw); }
    function move(e) {
      var r = host.getBoundingClientRect(); P.tx = e.clientX - r.left; P.ty = e.clientY - r.top; P.tr = Math.min(W, H) * 0.2;
      if (P.x < -900) { P.x = P.tx; P.y = P.ty; } kick();
    }
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerdown', move, { passive: true });
    host.addEventListener('pointerleave', function () { P.tr = 0; kick(); });
    new IntersectionObserver(function (es) { es.forEach(function (e) { visible = e.isIntersecting; if (visible) { if (!ready) { if (img.complete && img.naturalWidth) upload(); else img.addEventListener('load', upload, { once: true }); } kick(); } }); }, { rootMargin: '200px' }).observe(host);
    window.addEventListener('resize', function () { if (ready) { size(); kick(); } });
  }

  window.CharlieMenu = { wire: wire, pickmix: pickmix };
})();
