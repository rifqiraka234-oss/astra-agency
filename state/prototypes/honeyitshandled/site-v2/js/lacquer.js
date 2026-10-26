/* Her HH in living lacquer. The traced monogram (window.HIH_HH, from her own file) is drawn into a height field in the
   browser, poured in from the top on arrival, and lit as glossy red lacquer with her powder blue in the highlights. The
   pointer (or a touch) presses a slow ripple into it, like honey. The light follows the path the visitor picks.
   Without WebGL, under reduced motion before the first frame, or without script, the gradient SVG beside it shows. */
(() => {
  'use strict';
  const cv = document.getElementById('lacquer');
  if (!cv || !window.HIH_HH) return;
  const H = document.documentElement, RM = H.classList.contains('rm');
  let gl;
  try { gl = cv.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: false }); } catch (e) {}
  if (!gl) return;
  const VW = 1000, VH = 889, TS = 1024;

  // ---------------------------------------------------------------- the height field from her traced path
  function field() {
    const c = document.createElement('canvas'); c.width = c.height = TS;
    const x = c.getContext('2d');
    const s = TS * 0.84 / VW, ox = (TS - VW * s) / 2, oy = (TS - VH * s) / 2;
    const P = new Path2D(window.HIH_HH);
    const draw = (blur) => {
      const t = document.createElement('canvas'); t.width = t.height = TS; const g = t.getContext('2d');
      g.fillStyle = '#000'; g.fillRect(0, 0, TS, TS);
      if (blur) g.filter = `blur(${blur}px)`;
      g.setTransform(s, 0, 0, s, ox, oy); g.fillStyle = '#fff'; g.fill(P, 'evenodd');
      if (blur && g.filter === 'none') { // no canvas filter (Safari), blur by down and up sampling
        const k = Math.max(2, Math.round(blur / 2)), sm = document.createElement('canvas'); sm.width = sm.height = Math.round(TS / k);
        const sg = sm.getContext('2d'); sg.imageSmoothingEnabled = true; sg.drawImage(t, 0, 0, sm.width, sm.height);
        g.setTransform(1, 0, 0, 1, 0, 0); g.filter = 'none'; g.imageSmoothingEnabled = true; g.drawImage(sm, 0, 0, TS, TS);
      }
      return g.getImageData(0, 0, TS, TS).data;
    };
    const sharp = draw(0), bev = draw(9), soft = draw(30);
    const img = x.createImageData(TS, TS);
    for (let i = 0; i < img.data.length; i += 4) { img.data[i] = sharp[i]; img.data[i + 1] = bev[i]; img.data[i + 2] = soft[i]; img.data[i + 3] = 255; }
    x.putImageData(img, 0, 0);
    return c;
  }

  const VS = 'attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}';
  const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v;
uniform sampler2D T;uniform vec2 R;uniform vec4 BOX;uniform float TM,POUR;uniform vec3 M;uniform vec3 TINT;
float h1(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h1(i),h1(i+vec2(1,0)),f.x),mix(h1(i+vec2(0,1)),h1(i+vec2(1,1)),f.x),f.y);}
float drip(float x){return .05*n2(vec2(x*9.,1.7))+.035*n2(vec2(x*23.,4.1));}
float fillAt(vec2 t){return smoothstep(0.,.025,POUR*1.3-t.y-drip(t.x)+.02);}
float H(vec2 t){
  vec4 s=texture2D(T,t);
  float m=s.r*fillAt(t);
  float h=pow(s.g,.75)*m;
  float fl=n2(t*5.+vec2(TM*.05,TM*.11))*.6+n2(t*11.-vec2(TM*.09,0.))*.4;
  h+=(fl-.5)*.06*m;
  vec2 d=t-M.xy;float r=length(d);
  h+=M.z*(-.16*exp(-r*r*260.)+.035*sin(r*95.-TM*4.2)*exp(-r*9.))*m;
  return h;
}
void main(){
  vec2 t=(v-BOX.xy)/BOX.zw;
  vec3 paper=vec3(.976,.969,.965);
  vec3 col=paper;
  float ins=step(0.,t.x)*step(t.x,1.)*step(0.,t.y)*step(t.y,1.);
  if(ins>0.){
    vec4 s=texture2D(T,t);
    float sh=texture2D(T,t-vec2(.018,.03)).b*fillAt(t);
    col*=1.-.13*sh;
    float m=s.r*fillAt(t);
    if(m>.002){
      float e=1./1024.;
      float h=H(t),hx=H(t+vec2(e*1.5,0.)),hy=H(t+vec2(0.,e*1.5));
      vec3 N=normalize(vec3((h-hx)*95.,(hy-h)*95.,1.));
      vec3 V=vec3(0.,0.,1.);
      vec3 L1=normalize(vec3(-.55,.62,.75));
      vec3 L2=normalize(vec3(.7,-.2,.6));
      vec3 base=vec3(.588,.129,.133),deep=vec3(.30,.04,.055);
      float df=clamp(dot(N,L1),0.,1.);
      vec3 Rf=reflect(-V,N);
      float up=Rf.y*.5+.5;
      vec3 env=mix(vec3(.18,.02,.03),mix(paper,TINT,.55),smoothstep(.35,.9,up));
      float sp=pow(clamp(dot(Rf,L1),0.,1.),70.);
      float sp2=pow(clamp(dot(Rf,L2),0.,1.),24.);
      float fr=pow(1.-clamp(N.z,0.,1.),2.5);
      vec3 lac=mix(deep,base,.35+.65*df);
      lac+=env*(.10+.55*fr);
      lac+=sp*vec3(1.,.985,.97)*1.15+sp2*TINT*.28;
      float edge=smoothstep(0.,.6,m);
      col=mix(col,lac,edge);
    }
  }
  float g=h1(gl_FragCoord.xy+TM)*.018-.009;
  gl_FragColor=vec4(col+g,1.);
}`;
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  let prog;
  try { prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link'); }
  catch (e) { return; }
  gl.useProgram(prog);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const ap = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(prog, n);
  const uR = U('R'), uBOX = U('BOX'), uTM = U('TM'), uPOUR = U('POUR'), uM = U('M'), uTINT = U('TINT');
  const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, field());
  gl.uniform1i(U('T'), 0);

  // ---------------------------------------------------------------- size, the box the mark sits in, the light per path
  let W = 0, Hh = 0, dpr = Math.min(1.5, devicePixelRatio || 1), box = [0, 0, 1, 1];
  function size() {
    const r = cv.getBoundingClientRect();
    W = Math.max(2, Math.round(r.width * dpr)); Hh = Math.max(2, Math.round(r.height * dpr));
    if (cv.width !== W || cv.height !== Hh) { cv.width = W; cv.height = Hh; gl.viewport(0, 0, W, Hh); }
    // the texture square holds the mark at 84% width, fit the square to 96% of the shorter side, centred a touch high
    const side = Math.min(r.width * 1.0, r.height * 1.06);
    const bw = side / r.width, bh = side / r.height;
    box = [(1 - bw) / 2, (1 - bh) / 2 - 0.02, bw, bh];
    gl.uniform2f(uR, W, Hh); gl.uniform4f(uBOX, box[0], box[1], box[2], box[3]);
  }
  const TINTS = { wedding: [0.83, 0.914, 0.933], private: [0.98, 0.86, 0.62], company: [0.94, 0.95, 0.97] };
  let tint = (TINTS[H.dataset.path] || TINTS.wedding).slice();
  const mouse = { x: -1, y: -1, s: 0, tx: -1, ty: -1 };
  function texPos(e) { const r = cv.getBoundingClientRect(); const u = (e.clientX - r.left) / r.width, v = (e.clientY - r.top) / r.height; return [(u - box[0]) / box[2], (v - box[1]) / box[3]]; }
  if (!RM) {
    cv.addEventListener('pointermove', e => { const [x, y] = texPos(e); mouse.tx = x; mouse.ty = y; mouse.s = Math.min(1, mouse.s + 0.25); wake(); });
    cv.addEventListener('pointerdown', e => { const [x, y] = texPos(e); mouse.tx = mouse.x = x; mouse.ty = mouse.y = y; mouse.s = 1; wake(); });
  }
  let t0 = performance.now(), pourT0 = null, running = false, visible = true, slowFrames = 0, last = 0;
  function frame(now) {
    if (!running) return;
    const tm = (now - t0) / 1000;
    if (pourT0 === null) pourT0 = now;
    const pt = Math.min(1, (now - pourT0) / 2100), pour = RM ? 1 : 1 - Math.pow(1 - pt, 3);
    const want = TINTS[H.dataset.path] || TINTS.wedding;
    for (let i = 0; i < 3; i++) tint[i] += (want[i] - tint[i]) * 0.06;
    mouse.x += (mouse.tx - mouse.x) * 0.12; mouse.y += (mouse.ty - mouse.y) * 0.12; mouse.s *= 0.985;
    gl.uniform1f(uTM, RM ? 3.0 : tm); gl.uniform1f(uPOUR, pour); gl.uniform3f(uM, mouse.x, mouse.y, mouse.s); gl.uniform3f(uTINT, tint[0], tint[1], tint[2]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!H.classList.contains('gl-on')) H.classList.add('gl-on');
    // low power, halve the resolution if frames run slow
    if (last && now - last > 34) { if (++slowFrames > 40 && dpr > 0.75) { dpr = 0.75; size(); slowFrames = 0; } } else slowFrames = Math.max(0, slowFrames - 1);
    last = now;
    if (RM || !visible) { running = false; return; }
    requestAnimationFrame(frame);
  }
  function wake() { if (!running && visible) { running = true; last = 0; requestAnimationFrame(frame); } }
  window.HIH_LACQUER = { ready: true, wake };
  size();
  new IntersectionObserver(es => es.forEach(en => { visible = en.isIntersecting; if (visible) wake(); }), { threshold: 0 }).observe(cv);
  addEventListener('resize', () => { size(); wake(); }, { passive: true });
  document.addEventListener('change', e => { if (e.target.name === 'path') wake(); });
  wake();
})();
