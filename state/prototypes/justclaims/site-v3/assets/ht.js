/* Halftone. Prints an image or a playing film as a screen of dots in one or two inks, the way a newspaper would.
   WebGL, one draw per frame. Each cell samples the picture at its own centre and grows a dot to match.
   Ink one is the black screen at 45 degrees. Ink two, when set, is a second screen at its own angle,
   driven by how yellow the picture is at that spot, and overprints the first like real ink does. */
(function (w) {
  'use strict';
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision highp float;',
    'uniform sampler2D t;uniform vec2 res;uniform vec4 crop;uniform float pitch;uniform float dpr;',
    'uniform vec3 paper;uniform vec3 ink1;uniform vec3 ink2;uniform float a1;uniform float a2;uniform float use2;',
    'uniform vec2 lv;uniform float gam;uniform vec2 lv2;',
    'vec3 S(vec2 px){vec2 q=px/res;q.y=1.-q.y;return texture2D(t,crop.xy+q*crop.zw).rgb;}',
    'float dark(vec3 c){float l=dot(c,vec3(.2126,.7152,.0722));return pow(clamp((1.-l-lv.x)/(lv.y-lv.x),0.,1.),gam);}',
    'float yel(vec3 c){float y=min(c.r,c.g)-c.b;return clamp((y-lv2.x)/(lv2.y-lv2.x),0.,1.);}',
    'float screen(vec2 px,float ang,float which){',
    '  float c=cos(ang),s=sin(ang);mat2 R=mat2(c,s,-s,c);mat2 Ri=mat2(c,-s,s,c);',
    '  float P=pitch*dpr;vec2 r=R*px/P;vec2 b=floor(r-.5);float cov=0.;',
    '  for(int i=0;i<2;i++)for(int j=0;j<2;j++){',
    '    vec2 cell=b+vec2(float(i),float(j))+.5;vec2 cpx=Ri*cell*P;',
    '    vec3 col=S(clamp(cpx,vec2(0.),res));',
    '    float v=which<.5?dark(col):yel(col);',
    '    float rad=.7071*sqrt(v);float d=length(r-cell);float aa=.8/P;',
    '    cov=max(cov,1.-smoothstep(rad-aa,rad+aa,d));',
    '  }return cov;}',
    'void main(){vec2 px=gl_FragCoord.xy;px.y=res.y-px.y;',
    '  float k1=screen(px,a1,0.);vec3 o=paper*mix(vec3(1.),ink1,k1);',
    '  if(use2>.5){float k2=screen(px+vec2(.37,.11)*pitch*dpr,a2,1.);o*=mix(vec3(1.),ink2,k2);}',
    '  gl_FragColor=vec4(o,1.);}'
  ].join('\n');

  function hex(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]; }
  function sh(gl, type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }

  function mount(canvas, src, o) {
    var gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: !!o.keep });
    if (!gl) return null;
    var pr = gl.createProgram(); gl.attachShader(pr, sh(gl, gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl, gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    var U = {}; ['res', 'crop', 'pitch', 'dpr', 'paper', 'ink1', 'ink2', 'a1', 'a2', 'use2', 'lv', 'gam', 'lv2'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
    var dpr = o.dpr || Math.min(2, w.devicePixelRatio || 1);
    function size() {
      var r = canvas.getBoundingClientRect(), W = Math.max(2, Math.round((o.w || r.width) * dpr)), H = Math.max(2, Math.round((o.h || r.height) * dpr));
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      gl.viewport(0, 0, W, H); return [W, H];
    }
    function draw() {
      var sw = src.videoWidth || src.naturalWidth || src.width, shh = src.videoHeight || src.naturalHeight || src.height;
      if (!sw || !shh) return false;
      var wh = size(), W = wh[0], H = wh[1];
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src); } catch (e) { return false; }
      /* cover fit, with a focal point. With UNPACK_FLIP_Y the texture's v runs bottom to top, the shader flips back */
      var ca = W / H, ia = sw / shh, cw = 1, ch = 1;
      if (ia > ca) cw = ca / ia; else ch = ia / ca;
      if (o.zoom) { cw /= o.zoom; ch /= o.zoom; }
      var fx = o.fx == null ? .5 : o.fx, fy = o.fy == null ? .5 : o.fy;
      var x0 = (1 - cw) * fx, y0 = (1 - ch) * (1 - fy);
      gl.uniform2f(U.res, W, H); gl.uniform4f(U.crop, x0, y0, cw, ch);
      gl.uniform1f(U.pitch, o.pitch || 6); gl.uniform1f(U.dpr, dpr);
      gl.uniform3fv(U.paper, hex(o.paper || '#EAEBE6')); gl.uniform3fv(U.ink1, hex(o.ink1 || '#121514')); gl.uniform3fv(U.ink2, hex(o.ink2 || '#FFC629'));
      gl.uniform1f(U.a1, (o.a1 == null ? 45 : o.a1) * Math.PI / 180); gl.uniform1f(U.a2, (o.a2 == null ? 15 : o.a2) * Math.PI / 180);
      gl.uniform1f(U.use2, o.ink2 ? 1 : 0); gl.uniform2f(U.lv, o.lo || 0, o.hi || 1); gl.uniform1f(U.gam, o.gam || 1); gl.uniform2f(U.lv2, o.ylo == null ? .05 : o.ylo, o.yhi == null ? .45 : o.yhi);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); return true;
    }
    return { draw: draw, gl: gl };
  }
  w.HT = { mount: mount };
})(window);
