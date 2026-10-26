/* The final dance. A mirror ball whose facets are cut from her own photos (media/facets.jpg, 64 squares from 30 of her
   pictures), turning above the letter and throwing light across her red. Sending the letter spins it up. Runs only while
   the section is on screen, one still frame under reduced motion, the still image without WebGL or script. */
(() => {
  'use strict';
  const cv = document.getElementById('ball'), sp = document.getElementById('spots');
  if (!cv) return;
  const H = document.documentElement, RM = H.classList.contains('rm'), sec = document.getElementById('letter');
  let gl;
  try { gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true }); } catch (e) {}
  if (!gl) return;
  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D A;uniform vec2 R;uniform float ROT,TM,FL;
float h1(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+19.19);return fract(p.x*p.y);}
vec3 ry(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}
vec3 rx(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(v.x,c*v.y-s*v.z,s*v.y+c*v.z);}
void main(){
  vec2 q=(gl_FragCoord.xy-.5*R)/(.5*min(R.x,R.y)*.96);
  float r2=dot(q,q);
  if(r2>1.){gl_FragColor=vec4(0.);return;}
  float z=sqrt(1.-r2);
  vec3 n=vec3(q,z);
  vec3 w=ry(rx(n,-.32),ROT);
  float PI=3.14159265;
  float lat=asin(clamp(w.y,-1.,1.)),lon=atan(w.z,w.x);
  float rows=24.;
  float fy=(lat/PI+.5)*rows,ri=floor(fy);
  float latC=((ri+.5)/rows-.5)*PI;
  float cols=max(6.,floor(rows*2.*cos(latC)+.5));
  float fx=(lon/(2.*PI)+.5)*cols,ci=floor(fx);
  vec2 cell=vec2(fract(fx),fract(fy));
  float lonC=((ci+.5)/cols-.5)*2.*PI;
  vec3 fw=vec3(cos(latC)*cos(lonC),sin(latC),cos(latC)*sin(lonC));
  vec3 fn=rx(ry(fw,-ROT),.32);
  float jit=h1(vec2(ri,ci));
  fn=normalize(fn+vec3(jit-.5,h1(vec2(ci,ri))-.5,0.)*.05);
  float idx=mod(ri*13.+ci*7.,64.);
  vec2 tuv=(vec2(mod(idx,8.),floor(idx/8.))+.08+cell*.84)/8.;
  vec3 ph=texture2D(A,tuv).rgb;
  vec3 V=vec3(0.,0.,1.);
  vec3 Rf=reflect(-V,fn);
  vec3 L=normalize(vec3(-.35,.55,.76));
  float spec=pow(max(dot(Rf,L),0.),90.);
  float tw=step(.985,h1(vec2(ri,ci)+floor(TM*6.)))*FL;
  vec3 silver=vec3(.83,.91,.93);
  vec3 col=mix(ph*1.18,silver*(.35+.65*Rf.y*.5+.32),.2)*(.55+.45*fn.z);
  col=mix(col,vec3(.59,.13,.13),.12*(1.-Rf.y));
  col+=vec3(1.,.97,.94)*(spec*1.5+tw*.9);
  float gx=smoothstep(0.,.07,cell.x)*smoothstep(1.,.93,cell.x),gy=smoothstep(0.,.09,cell.y)*smoothstep(1.,.91,cell.y);
  col*=mix(.18,1.,gx*gy);
  col*=.45+.55*z;
  float a=smoothstep(1.,.985,r2);
  gl_FragColor=vec4(col*a,a);
}`;
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  let prog;
  try { prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link'); }
  catch (e) { return; }
  gl.useProgram(prog);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const ap = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(prog, n), uR = U('R'), uROT = U('ROT'), uTM = U('TM'), uFL = U('FL');
  gl.uniform1i(U('A'), 0);
  let ready = false, running = false, visible = false, spin = 0.18, rot = 0.6, lastT = 0, sent = false;
  const img = new Image();
  img.decoding = 'async';
  function load() {
    if (img.src) return;
    img.onload = () => {
      const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      ready = true; wake();
    };
    img.src = 'media/facets.jpg';
  }
  function size() {
    const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
    const w = Math.max(2, Math.round(r.width * d)), h = Math.max(2, Math.round(r.height * d));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
    gl.uniform2f(uR, w, h);
    if (sp) { const s = sp.getBoundingClientRect(); sp.width = Math.round(s.width); sp.height = Math.round(s.height); }
  }
  // the light it throws, soft spots that travel with the turn
  const ctx = sp && sp.getContext('2d');
  const SPOTS = Array.from({ length: 90 }, (_, i) => ({ a: (i * 2.399) % (Math.PI * 2), y: ((i * 0.6180339) % 1), r: 1.6 + ((i * 7) % 5) * 0.7, c: i % 4 === 0 ? '211,233,238' : '255,246,236' }));
  function spots(t) {
    if (!ctx) return;
    const W = sp.width, Hh = sp.height; ctx.clearRect(0, 0, W, Hh);
    for (const s of SPOTS) {
      const a = s.a + rot * 1.0, x = ((Math.cos(a) * 0.5 + 0.5) * 1.3 - 0.15) * W, y = (0.05 + s.y * 0.95) * Hh;
      const vis = Math.max(0, Math.sin(a)); if (vis < 0.05) continue;
      const rr = s.r * (1 + (sent ? 0.6 : 0)) * (W / 900 + 0.6);
      const g = ctx.createRadialGradient(x, y, 0, x, y, rr * 2.2);
      g.addColorStop(0, `rgba(${s.c},${0.95 * vis})`); g.addColorStop(0.45, `rgba(${s.c},${0.6 * vis})`); g.addColorStop(1, `rgba(${s.c},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, rr * 2.2, rr * 1.6, 0.4, 0, Math.PI * 2); ctx.fill();
    }
  }
  function frame(now) {
    if (!running) return;
    const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016; lastT = now;
    spin += ((sent ? 1.6 : 0.18) - spin) * 0.03;
    rot += dt * spin;
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uROT, rot); gl.uniform1f(uTM, now / 1000); gl.uniform1f(uFL, sent ? 1 : 0.35);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    spots(now);
    if (!H.classList.contains('ball-on')) H.classList.add('ball-on');
    if (RM || !visible) { running = false; return; }
    requestAnimationFrame(frame);
  }
  function wake() { if (ready && !running && (visible || RM)) { running = true; lastT = 0; size(); requestAnimationFrame(frame); } }
  new IntersectionObserver(es => es.forEach(en => { visible = en.isIntersecting; if (visible) { load(); wake(); } }), { rootMargin: '200px 0px' }).observe(sec);
  addEventListener('resize', () => { if (ready) { size(); wake(); } }, { passive: true });
  addEventListener('hih-sent', () => { sent = true; wake(); });
  window.HIH_BALL = { get ready() { return ready; }, wake };
})();
