/* BWILD v2, the sky behind the page. One WebGL quad, four colour stops, a sun or moon glow, drifting haze and stars.
   site.js tells it which sky the chapter in view wants (window.__sky.to), and it eases there. Without WebGL the canvas
   keeps its CSS gradient and each chapter paints its own (html:not(.webgl) in site.css). */
/* it starts once the page has loaded, the canvas's own CSS gradient is the same dawn until then */
(function () {
  var go = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 1); })(init, { timeout: 900 }); };
  if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
  function init() {
  var cv = document.getElementById('sky'); if (!cv) return;
  var html = document.documentElement, rm = html.classList.contains('rm');
  var gl = null;
  try { gl = cv.getContext('webgl', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' }); } catch (e) { gl = null; }
  if (!gl) return;

  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision mediump float;',
    'uniform vec2 r;uniform float t;uniform vec3 c0,c1,c2,c3,sun,sc;uniform float st,hz;',
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+1.),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/r;float y=1.-uv.y;',
    ' vec3 col=y<.45?mix(c0,c1,smoothstep(0.,.45,y)):(y<.78?mix(c1,c2,smoothstep(.45,.78,y)):mix(c2,c3,smoothstep(.78,1.,y)));',
    ' float hzv=fbm(vec2(uv.x*1.8+t*.010,y*6.5-t*.004));col+=(hzv-.5)*.10*hz*mix(vec3(1.),sc,.6);',
    ' vec2 asp=vec2(r.x/r.y,1.);float dl=length((vec2(uv.x,y)-sun.xy)*asp);',
    ' col+=sc*sun.z*(.42*exp(-dl*2.6)+.55*exp(-dl*11.)+.85*smoothstep(.05,.038,dl));',
    ' vec2 g=gl_FragCoord.xy/2.4;vec2 id=floor(g);float s=h(id);',
    ' if(s>.9962){float tw=.55+.45*sin(t*1.6+s*80.);float pt=1.-smoothstep(.0,.42,length(fract(g)-.5));col+=vec3(st*tw*pt)*(1.-smoothstep(.62,.9,y));}',
    ' col+=(h(gl_FragCoord.xy+fract(t))-.5)*.018;',
    ' gl_FragColor=vec4(col,1.);',
    '}'].join('\n');
  var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {}; ['r', 't', 'c0', 'c1', 'c2', 'c3', 'sun', 'sc', 'st', 'hz'].forEach(function (k) { U[k] = gl.getUniformLocation(pr, k); });

  var hex = function (h) { return [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255]; };
  var S = function (c0, c1, c2, c3, sun, sc, st, hz) { return { c0: hex(c0), c1: hex(c1), c2: hex(c2), c3: hex(c3), sun: sun, sc: hex(sc), st: st, hz: hz }; };
  /* every stop taken from their own frames, the dawn ridge, the golden hour, the pink dunes, the blue night street */
  var SK = {
    dawn: S('#120E1F', '#3A2347', '#A24B4A', '#F09A5E', [.74, .9, .9], '#FFC98A', .18, .6),
    night: S('#030409', '#080B19', '#111733', '#262C4D', [.78, .26, 0], '#D8E2FF', 1, .35),
    nightmoon: S('#030409', '#080B19', '#111733', '#262C4D', [.78, .26, .32], '#D8E2FF', 1, .35),
    gold: S('#4C6290', '#C98A62', '#F2B35E', '#FFE0A3', [.66, .62, 1], '#FFD48A', 0, .7),
    ember: S('#241C47', '#7E3349', '#E2622A', '#F5A04B', [.66, .79, .95], '#FF8A3D', .05, .6),
    violet: S('#0C0E25', '#2B1E46', '#64294A', '#B34E3B', [.66, .95, .5], '#FF6A3A', .45, .45),
    dark: S('#03040A', '#070A18', '#0E1328', '#1B2040', [.66, 1.2, 0], '#000000', 1, .3),
    dawn2: S('#E9C7BA', '#F2D3C2', '#F6DDCB', '#FBE9D9', [.18, .86, .55], '#FFE7C9', 0, .55),
    orange: S('#2A0E05', '#7A2508', '#E8560F', '#F08A3A', [.3, .3, .4], '#FF8A3D', 0, .4),
    dunes: S('#D9C3CF', '#EDCDBD', '#F5D9C5', '#FBE6D2', [.62, .92, .5], '#FFE2C2', 0, .5)
  };
  /* on a phone the words sit low, so the sun and the moon rise behind the claws instead */
  var PH = { dawn: S('#120E1F', '#3A2347', '#A24B4A', '#F09A5E', [.8, .3, .8], '#FFC98A', .18, .6),
    nightmoon: S('#030409', '#080B19', '#111733', '#262C4D', [.8, .3, .32], '#D8E2FF', 1, .35) };
  var phone = function () { return window.innerWidth < 760 && window.innerHeight > window.innerWidth; };
  var mix = function (a, b, k) { return a.map(function (v, i) { return v + (b[i] - v) * k; }); };
  var blend = function (a, b, k) { return { c0: mix(a.c0, b.c0, k), c1: mix(a.c1, b.c1, k), c2: mix(a.c2, b.c2, k), c3: mix(a.c3, b.c3, k), sun: mix(a.sun, b.sun, k), sc: mix(a.sc, b.sc, k), st: a.st + (b.st - a.st) * k, hz: a.hz + (b.hz - a.hz) * k }; };
  /* the sunset is a path through four skies as the chapter scrolls */
  var sundown = function (p) {
    var k = [SK.gold, SK.ember, SK.violet, SK.dark], at = [0, .32, .6, .9];
    if (p <= at[0]) return k[0];
    for (var i = 0; i < 3; i++) if (p <= at[i + 1]) return blend(k[i], k[i + 1], (p - at[i]) / (at[i + 1] - at[i]));
    return k[3];
  };
  var cur = SK.dawn, tgt = SK.dawn, dirty = true, t0 = performance.now(), slow = 0, last = 0, resting = false, running = false;
  var size = function () {
    var sc = window.innerWidth < 760 ? .5 : .62;
    cv.width = Math.max(2, Math.round(window.innerWidth * sc)); cv.height = Math.max(2, Math.round(window.innerHeight * sc));
    gl.viewport(0, 0, cv.width, cv.height); dirty = true;
  };
  var draw = function (now) {
    var e = 1 - Math.pow(.88, Math.min(4, (now - last) / 16.7 || 1)); last = now;
    cur = blend(cur, tgt, rm ? 1 : e);
    gl.uniform2f(U.r, cv.width, cv.height); gl.uniform1f(U.t, rm ? 0 : (now - t0) / 1000);
    ['c0', 'c1', 'c2', 'c3', 'sun', 'sc'].forEach(function (k) { gl.uniform3fv(U[k], cur[k]); });
    gl.uniform1f(U.st, cur.st); gl.uniform1f(U.hz, cur.hz);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  /* thirty frames a second is plenty for haze and stars, and nothing is drawn while the sky is covered */
  var loop = function (now) {
    if (resting) { running = false; return; }
    if (!document.hidden && now - last >= 32) {
      var d = now - last;
      if (d > 70) slow++; else if (slow > 0) slow--;
      if (!(slow > 30 && (now | 0) % 2)) draw(now); else last = now;  /* frames running slow, draw every other one */
    }
    requestAnimationFrame(loop);
  };
  var start = function () { if (!running && !rm && !resting) { running = true; requestAnimationFrame(loop); } };
  window.__sky = {
    rest: function (b) { if (b === resting) return; resting = b; if (!b) start(); },
    state: function () { return { resting: resting, running: running }; },
    to: function (name, p) { var n = name === 'sundown' ? sundown(p || 0) : (phone() && PH[name]) || SK[name]; if (n && n !== tgt) { tgt = n; dirty = true; if (rm) draw(performance.now()); } },
    scenes: SK
  };
  window.addEventListener('resize', function () { size(); if (rm) draw(performance.now()); });
  size(); html.classList.add('webgl');
  if (rm) draw(performance.now()); else { draw(performance.now()); start(); }
  window.dispatchEvent(new Event('skyready'));
  }
})();
