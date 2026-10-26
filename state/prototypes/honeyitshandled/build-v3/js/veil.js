/* The veil. A sheer tulle veil over the Off White film, drawn in one WebGL fragment shader: a fine diamond net, soft
   folds moving in a slow wind and round the pointer, and a scalloped lace hem. The scroll lifts it from the hem, the centre
   first, and the dress comes clear. No WebGL or reduced motion, no veil, and the film shows plain. It draws only while its
   stage is near the screen, at 30 frames a second at most, and rests once lifted. */
(function () {
  'use strict';
  var H = document.documentElement;
  if (H.classList.contains('rm')) return;
  var cv = document.querySelector('[data-veil]'), pin = document.querySelector('[data-pin="off"]'), txt = document.querySelector('[data-veil-t]');
  if (!cv || !pin) return;
  var gl = null;
  try { gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false }); } catch (e) {}
  if (!gl) return;
  var VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
  var FS = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif',
    'uniform vec2 R;uniform float T;uniform float L;uniform vec3 P;uniform float D;varying vec2 v;',
    'float h(vec2 q){q=fract(q*vec2(.1031,.1030));q+=dot(q,q.yx+33.33);return fract((q.x+q.y)*q.x);}',
    'float n(vec2 q){vec2 i=floor(q),f=fract(q);vec2 u=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}',
    'void main(){',
    ' float y=1.-v.y; float ax=R.x/R.y; float cx=v.x-.5;',
    ' vec2 pd=vec2((v.x-P.x)*ax,(v.y-P.y)); float pw=P.z*exp(-dot(pd,pd)/.035);',
    // the hem, lifted from the centre first, with scallops of lace
    ' float base=mix(1.12,-.34,L); float arch=.40*sin(3.14159*min(L*1.12,1.))*exp(-cx*cx/.08);',
    ' float wav=.010*sin(v.x*ax*8.+T*.6)+.006*sin(v.x*ax*21.-T*1.)+pw*.025*sin(T*3.);',
    ' float hem=base-arch+wav; float sc=.013*abs(sin(v.x*ax*34.)); float above=hem+sc-y;',
    ' if(above<0.){gl_FragColor=vec4(0.);return;}',
    // folds fall from a crown above the top centre, uneven, moving in a slow wind and round the hand
    ' vec2 q=vec2(v.x*ax-.5*ax,y+.55); float ang=atan(q.x,q.y);',
    ' float wd=.35*n(vec2(ang*4.,y*1.2-T*.10))+.25*n(vec2(ang*9.+T*.04,y*3.))+pw*1.2*sin(T*2.+y*5.);',
    ' float fu=ang*(34.+L*22.)+wd*2.6;',
    ' float sh=.5+.5*sin(fu); sh=mix(sh,.5+.5*sin(fu*2.3+1.7),.3);',
    // a fine diamond net
    ' vec2 px=gl_FragCoord.xy/(3.6*D); float a1=abs(fract(px.x+px.y*.58)-.5),a2=abs(fract(px.x-px.y*.58)-.5);',
    ' float net=smoothstep(.09,.0,min(a1,a2));',
    // lace flowers along the hem
    ' float band=smoothstep(.11,.0,above); vec2 lp=vec2(v.x*ax*26.,above*26.); float dd=length(fract(lp)-.5);',
    ' float fl=smoothstep(.34,.26,dd)-smoothstep(.20,.13,dd)+smoothstep(.07,.0,dd);',
    ' float a=(.24+.10*sh+.20*net*(.5+.5*sh)+.07*pow(sh,6.))*(1.-.15*L);',
    ' a+=band*(.16+.34*fl*(1.-smoothstep(.06,.11,above)))+.32*smoothstep(.006,.0,abs(above-.004));',
    ' a=clamp(a,0.,.9)*smoothstep(.0,.003,above);',
    ' vec3 c=mix(vec3(.90,.885,.87),vec3(1.,.995,.985),sh); c=mix(c,vec3(1.),net*.3+band*.2);',
    ' gl_FragColor=vec4(c*a,a);',
    '}'].join('\n');
  function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; }
  var pr;
  try { pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error('link'); }
  catch (e) { return; }
  gl.useProgram(pr);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T'), uL = gl.getUniformLocation(pr, 'L'), uP = gl.getUniformLocation(pr, 'P'), uD = gl.getUniformLocation(pr, 'D');
  gl.clearColor(0, 0, 0, 0);
  H.classList.add('gl-veil');

  var dpr = 1, lift = 0, frames = 0, last = 0, t0 = performance.now(), near = false, ptr = [0.5, 0.5, 0], ptrT = 0, raf = 0;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = Math.max(1, Math.round(cv.clientWidth * dpr)), h = Math.max(1, Math.round(cv.clientHeight * dpr));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
  }
  function hh() { return parseFloat(getComputedStyle(H).getPropertyValue('--hh')) || 64; }
  function sstep(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  function progress() {
    var r = pin.getBoundingClientRect(), stageH = innerHeight - hh(), total = Math.max(1, r.height - stageH);
    return Math.max(0, Math.min(1, (hh() - r.top) / total));
  }
  function draw(now) {
    raf = 0;
    if (!near) return;
    var p = progress();
    lift = sstep(.06, .66, p);
    if (txt) txt.style.setProperty('--vt', sstep(.46, .78, p).toFixed(3));
    ptr[2] = Math.max(0, ptr[2] - (now - ptrT) / 2600); ptrT = now;
    if (now - last >= 32) {
      last = now; size();
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (lift < 0.999) {
        gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, (now - t0) / 1000); gl.uniform1f(uL, lift);
        gl.uniform3f(uP, ptr[0], ptr[1], ptr[2]); gl.uniform1f(uD, dpr);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      frames++;
    }
    if (lift < 0.999 || ptr[2] > 0) raf = requestAnimationFrame(draw);
  }
  function wake() { if (!raf && near) raf = requestAnimationFrame(draw); }
  new IntersectionObserver(function (es) { es.forEach(function (e) { near = e.isIntersecting; if (near) wake(); }); }, { rootMargin: '30% 0px' }).observe(pin);
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', function () { size(); wake(); });
  var stage = cv.parentNode;
  stage.addEventListener('pointermove', function (e) {
    var r = cv.getBoundingClientRect(); ptr[0] = (e.clientX - r.left) / r.width; ptr[1] = 1 - (e.clientY - r.top) / r.height; ptr[2] = Math.min(1, ptr[2] + .12); ptrT = performance.now(); wake();
  });
  // the test handle draws one frame now and reads its alpha back in the same task, before the frame is shown
  function sample() {
    size(); var L = sstep(.06, .66, progress()), now = performance.now();
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (L < 0.999) {
      gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, (now - t0) / 1000); gl.uniform1f(uL, L);
      gl.uniform3f(uP, ptr[0], ptr[1], ptr[2]); gl.uniform1f(uD, dpr); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    var px = new Uint8Array(4), out = [];
    [[.5, .5], [.25, .3], [.75, .7], [.5, .12], [.5, .9]].forEach(function (q) { gl.readPixels(Math.floor(q[0] * cv.width), Math.floor(q[1] * cv.height), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); out.push(px[3]); });
    return { lift: L, alpha: out };
  }
  window.HIH_VEIL = { get lift() { return lift; }, get frames() { return frames; }, get progress() { return progress(); }, sample: sample };
})();
