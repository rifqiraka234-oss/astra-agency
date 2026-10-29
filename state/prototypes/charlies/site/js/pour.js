/* The pour. Tap a sauce and a curtain of it runs down from the top of the stage in the drip silhouette traced from
   Charlie's own menu (media/drip-sdf.png). A stream falls from it onto the dessert. On a plated dessert seen from
   above (a waffle, a crepe, cookie dough) the stream drizzles across it in glossy ribbons, the way it's done at the
   counter. On a glass or a cup (a shake, a sundae) it coats the top and runs down the sides in the menu's drips.
   One WebGL pass draws the dessert photo and every layer, lit from its thickness, with gloss, translucency and a
   contact shadow. Classic script: exposes window.CharliePour. */
(function () {
  'use strict';

  var MAX_LAYERS = 6, PATH_TEX = 3; // two drizzle layers per path texture; unit 7 holds the menu's lobed drips

  // Real sauce looks, by the names on Charlie's menu. core = opacity where thick, edge = opacity at the rim,
  // spec = highlight strength, shin = highlight tightness.
  var SAUCES = {
    'Milk choc':      { hex: '#4b2714', core: 0.98, edge: 0.82, spec: 1.3, shin: 80 },
    'White choc':     { hex: '#f6eedd', core: 0.98, edge: 0.88, spec: 0.75, shin: 54 },
    'Bueno':          { hex: '#b58457', core: 0.97, edge: 0.80, spec: 1.0, shin: 62 },
    'Biscoff':        { hex: '#a35b22', core: 0.95, edge: 0.72, spec: 1.5, shin: 105 },
    'Caramel':        { hex: '#c9741a', core: 0.82, edge: 0.42, spec: 1.6, shin: 123 },
    'Strawberry':     { hex: '#d0213d', core: 0.86, edge: 0.44, spec: 1.5, shin: 114 },
    'Raspberry':      { hex: '#a8103f', core: 0.88, edge: 0.46, spec: 1.5, shin: 114 },
    'Blue Raspberry': { hex: '#1767e6', core: 0.80, edge: 0.36, spec: 1.7, shin: 132 },
    'Bubblegum':      { hex: '#ff6fb3', core: 0.93, edge: 0.62, spec: 1.2, shin: 88 },
    'Pistachio':      { hex: '#97b45c', core: 0.97, edge: 0.82, spec: 0.8, shin: 54 },
    'Mint Chocolate': { hex: '#4fae83', core: 0.95, edge: 0.72, spec: 1.15, shin: 80 },
    'Orange':         { hex: '#ef861b', core: 0.88, edge: 0.48, spec: 1.55, shin: 114 }
  };
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }

  var VS = 'attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }';

  var FS = [
    '#extension GL_OES_standard_derivatives : enable',
    'precision highp float;',
    'uniform vec2 uRes; uniform float uDpr; uniform float uGrav; uniform float uStreamR;',
    'uniform sampler2D uDessert; uniform vec4 uRect; uniform sampler2D uContour; uniform sampler2D uDrip; uniform sampler2D uHull;',
    'uniform sampler2D uPath0; uniform sampler2D uPath1; uniform sampler2D uPath2; uniform sampler2D uLobes;',
    'uniform int uCount; uniform vec4 uL0[' + MAX_LAYERS + ']; uniform vec4 uL1[' + MAX_LAYERS + ']; uniform vec4 uL2[' + MAX_LAYERS + '];',
    'uniform vec4 uL3[' + MAX_LAYERS + ']; uniform vec4 uL4[' + MAX_LAYERS + '];',
    'uniform vec3 uLight; uniform float uStretch; uniform float uCap; uniform vec4 uCurt; uniform vec3 uBaseCol;',
    'float hash(float n){ return fract(sin(n) * 43758.5453123); }',
    'float noise1(float x){ float i = floor(x); float f = fract(x); f = f*f*(3.0-2.0*f); return mix(hash(i), hash(i+1.0), f); }',
    'float smax(float a, float b, float k){ float h = clamp(0.5 + 0.5*(a-b)/k, 0.0, 1.0); return mix(b, a, h) + k*h*(1.0-h); }',
    'float contourY(float x){',
    '  float u = (x - uRect.x) / uRect.z;',
    '  if (u < 0.0 || u > 1.0) return 1e5;',
    '  vec4 c = texture2D(uContour, vec2(u, 0.5));',
    '  return uRect.y + (c.r * 255.0 * 256.0 + c.g * 255.0) / 65535.0 * uRect.w;',
    '}',
    // the menu drip, as a signed distance in css px for a band that hangs len px from y0, tiles tileW wide
    'float dripSd(vec2 p, float y0, float len, float tileW, float phase){',
    '  float yl = p.y - y0; if (yl < -1.0) return 50.0;',
    '  float v = yl / max(len, 1.0); float u = fract(p.x / tileW + phase);',
    '  float sd = (texture2D(uDrip, vec2(u, clamp(v, 0.0, 1.0))).r * 255.0 - 128.0) * 0.5 * (tileW / 1024.0);',
    '  if (v > 1.0) sd = -2.0;',
    '  return sd;',
    '}',
    'float lobeSd(vec2 p, float len){',
    '  float yl = p.y + 2.0; if (yl < -1.0) return 50.0; float tileW = uCurt.x;',
    '  float v = yl / max(len, 1.0); float u = fract(p.x / tileW + uCurt.w);',
    '  float sd = (texture2D(uLobes, vec2(u, clamp(v, 0.0, 1.0))).r * 255.0 - 128.0) * 0.5 * (tileW / 1024.0) * (len / (tileW * 0.5363));',
    '  if (v > 1.0) sd = -2.0; return sd;',
    '}',
    'vec4 pathTex(float slot, vec2 uv){',
    '  if (slot < 0.5) return texture2D(uPath0, uv); if (slot < 1.5) return texture2D(uPath1, uv);',
    '  return texture2D(uPath2, uv);',
    '}',
    // one layer: returns (coat distance or drizzle height, stream distance, curtain distance, kind)
    'vec3 layerSdf(vec2 p, vec4 L0, vec4 L2, vec4 L3, vec4 L4, out float hDrizzle){',
    '  float t = L0.x; float phase = L0.y; float xi = L0.z; float tileW = L0.w; float mode = L3.x;',
    '  hDrizzle = 0.0;',
    // the curtain grows down from the top edge over 0.35 s
    '  float cg = 1.0 - pow(1.0 - clamp(t / 0.38, 0.0, 1.0), 3.0);',
    '  float dCur = lobeSd(p, uCurt.y * L3.z * cg);',
    // the stream, from under the curtain down to where it meets the dessert (the nozzle, L4.xy)
    '  float sy = L4.w; float nx = L4.x; float ny = L4.y;',
    '  float fall = max(ny - sy, 1.0); float t0 = 0.2;',
    '  float tf = max(t - t0, 0.0); float yFront = sy + 0.5 * uGrav * tf * tf;',
    '  float tt = max(t - t0 - L3.w, 0.0); float yTail = sy + uGrav * 1.4 * tt * tt;',
    '  float dS = -1e4; float y0 = yTail; float y1 = min(yFront, ny + 5.0);',
    '  if (y1 > y0 && t > t0) {',
    '    float k = clamp((p.y - sy) / fall, 0.0, 1.0);',
    '    float r = uStreamR * (1.0 - 0.38 * k) * (1.0 - 0.3 * smoothstep(L3.w - 0.2, L3.w + 0.25, t - t0));',
    '    float wob = sin(p.y * 0.045 - t * 13.0) * 1.4 * k;',
    // the bottom of the stream trails the nozzle a little as it moves
    '    float lag = (L4.z) * k * k;',
    '    dS = r - length(vec2(p.x - (nx + wob - lag), p.y - clamp(p.y, y0, y1)));',
    '  }',
    '  float ti = t0 + sqrt(2.0 * fall / uGrav);',
    '  float dC = -1e4; float tc = mode > 0.5 ? t - xi : t - ti;',
    '  if (mode > 0.5) {',
    // drizzle: the ribbon laid along the path up to the nozzle's progress, read from its texture
    '    vec2 uvD = (p - uRect.xy) / uRect.zw;',
    '    if (tc > 0.0 && uvD.x > 0.0 && uvD.x < 1.0 && uvD.y > 0.0 && uvD.y < 1.0) {',
    '      vec4 pt = pathTex(floor(L3.y), uvD); bool hi = fract(L3.y) > 0.25;',
    '      float hh = hi ? pt.b : pt.r; float gg = hi ? pt.a : pt.g;',
    '      float prog = clamp(tc / max(L2.z, 0.1), 0.0, 1.0);',
    '      float shown = smoothstep(gg - 0.004, gg + 0.002, prog);',
    '      float settle = 1.0 - exp(-tc / 1.4);',
    '      hDrizzle = hh * shown;',
    '      dC = (hh - (0.46 - 0.07 * settle)) * 40.0;',
    '      dC = mix(-50.0, dC, shown);',
    '    }',
    '  } else if (tc > 0.0) {',
    // coat: a spread from where it lands, then the menu drips run down from the top of the dessert
    '    float cy = contourY(p.x); float yl = p.y - cy; float spreadK = L2.z;',
    '    float spread = uRect.z * spreadK * (1.0 - exp(-tc / 0.30));',
    '    float dSpread = spread - length(vec2(p.x - xi, (p.y - contourY(xi)) * 0.55));',
    '    float reach = abs(p.x - xi) / (uRect.z * 1.4);',
    '    float dur = 1.7 + 1.6 * noise1((p.x - uRect.x) / tileW * 5.0 + phase * 17.0);',
    '    float s = clamp((tc - reach) / dur, 0.0, 1.0);',
    '    float g = 1.0 - pow(1.0 - s, 2.6);',
    '    if (yl > -2.0 && g > 0.002) {',
    '      float tileH = tileW * 0.5363 * uStretch;',
    '      float sd = dripSd(vec2(p.x - uRect.x, yl), 0.0, tileH * g, tileW, phase) * mix(1.0, g, 0.5);',
    '      float cap = uCap * uRect.w * g * (0.45 + 0.9 * noise1((p.x - uRect.x) / tileW * 7.0 + phase * 31.0)) * (0.55 + 0.45 * spreadK);',
    '      sd = max(sd, min(cap - yl, 6.0 * g));',
    '      sd = min(sd, yl + 1.0);',
    '      dC = min(sd, dSpread);',
    '    }',
    '  }',
    '  return vec3(dC, dS, dCur);',
    '}',
    'float lum(vec4 c){ return dot(c.rgb, vec3(0.299, 0.587, 0.114)); }',
    'void main(){',
    '  vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;',
    '  vec2 uvD = (p - uRect.xy) / uRect.zw;',
    '  float inRect = step(0.0, uvD.x) * step(uvD.x, 1.0) * step(0.0, uvD.y) * step(uvD.y, 1.0);',
    '  vec2 uc = clamp(uvD, 0.0, 1.0);',
    '  vec4 col = texture2D(uDessert, uc) * inRect;',
    '  float hull = texture2D(uHull, uc).a * inRect;',
    '  vec2 e = 3.2 / uRect.zw;',
    '  float lx = lum(texture2D(uDessert, uc + vec2(e.x, 0.0))) - lum(texture2D(uDessert, uc - vec2(e.x, 0.0)));',
    '  float ly = lum(texture2D(uDessert, uc + vec2(0.0, e.y))) - lum(texture2D(uDessert, uc - vec2(0.0, e.y)));',
    '  vec3 Ld = normalize(uLight); vec3 Hh = normalize(Ld + vec3(0.0, 0.0, 1.0));',
    '  vec3 H2 = normalize(normalize(vec3(0.8, 0.1, 0.6)) + vec3(0.0, 0.0, 1.0));',
    '  if (uCurt.z > 0.5) {',
    '    float sdB = lobeSd(p, uCurt.y); float covB = smoothstep(-0.7, 0.7, sdB);',
    '    float thB = clamp(sdB / 11.0, 0.0, 1.0); float hB = 11.0 * sqrt(max(0.0, 1.0 - (1.0 - thB) * (1.0 - thB)));',
    '    vec3 nB = normalize(vec3(-dFdx(hB) * uDpr, -dFdy(hB) * uDpr, 1.0));',
    '    vec3 bodyB = uBaseCol * (0.86 + 0.18 * (dot(nB, Ld) * 0.5 + 0.5));',
    '    float specB = pow(max(dot(nB, Hh), 0.0), 70.0) * 0.32 + pow(1.0 - nB.z, 2.5) * 0.08;',
    '    col = col * (1.0 - covB) + vec4((bodyB + specB) * covB, covB);',
    '  }',
    '  for (int i = 0; i < ' + MAX_LAYERS + '; i++) {',
    '    if (i >= uCount) break;',
    '    vec4 L0 = uL0[i]; vec4 L1 = uL1[i]; vec4 L2 = uL2[i]; vec4 L3 = uL3[i]; vec4 L4 = uL4[i];',
    '    float hD; vec3 dd = layerSdf(p, L0, L2, L3, L4, hD);',
    '    float clipC = smoothstep(0.3, 0.7, hull);',
    '    float covC = smoothstep(-0.7, 0.7, dd.x) * clipC;',
    '    float covS = smoothstep(-0.7, 0.7, dd.y);',
    '    float covK = smoothstep(-0.7, 0.7, dd.z);',
    '    float cov = max(max(covC, covS), covK);',
    '    float d = smax(smax(mix(-50.0, dd.x, step(0.5, clipC)), dd.y, 4.0), dd.z, 3.0);',
    '    float R = clamp(L0.w * 0.0165, 3.0, 16.0);',
    '    float th = clamp(d / R, 0.0, 1.0);',
    '    float h = R * sqrt(max(0.0, 1.0 - (1.0 - th) * (1.0 - th)));',
    // a drizzle ribbon takes its height from its own blurred profile, so it reads as a round bead of sauce
    '    if (L3.x > 0.5 && covC > covS && covC > covK) { h = hD * R * 1.6; th = clamp((hD - 0.4) / 0.5, 0.0, 1.0); }',
    '    float sx = dFdx(h) * uDpr; float sy = dFdy(h) * uDpr;',
    '    vec3 n = normalize(vec3(-sx, -sy, 1.0));',
    '    float conform = covC * (1.0 - covS) * 0.55 * smoothstep(0.0, 0.8, th) * (1.0 - L3.x * 0.6);',
    '    n = normalize(n + vec3(-lx, ly, 0.0) * conform);',
    // soft contact shadow, down and right of the sauce
    '    float hS; vec3 ds = layerSdf(p + vec2(-2.5, -4.5), L0, L2, L3, L4, hS);',
    '    float sh = max(smoothstep(-4.0, 3.0, ds.x) * clipC, smoothstep(-4.0, 3.0, ds.y) * step(0.01, col.a));',
    '    col.rgb *= 1.0 - 0.36 * sh * (1.0 - cov);',
    '    vec3 base = L1.rgb;',
    '    float a = cov * mix(L2.w, L1.a, smoothstep(0.0, 0.55, th));',
    '    float lamb = dot(n, Ld) * 0.5 + 0.5;',
    '    vec3 body = base * (0.38 + 0.74 * lamb) * (0.62 + 0.38 * sqrt(th));',
    '    body *= mix(1.0, 0.74, th * (1.0 - L1.a) * 1.6);',
    '    col.rgb = mix(col.rgb, col.rgb * min(base * 1.6, vec3(1.0)), cov * (1.0 - L1.a));',
    '    col = col * (1.0 - a) + vec4(body * a, a);',
    '    float nh = max(dot(n, Hh), 0.0);',
    '    float spec = pow(nh, L2.y) * L2.x + pow(nh, 14.0) * 0.03 * L2.x + pow(max(dot(n, H2), 0.0), L2.y * 0.5) * 0.24 * L2.x;',
    '    float rim = pow(1.0 - n.z, 2.5) * 0.24 * L2.x;',
    '    col.rgb += vec3(spec + rim) * cov;',
    '    col.a = max(col.a, cov);',
    '  }',
    '  gl_FragColor = vec4(min(col.rgb, vec3(col.a)), col.a);',
    '}'
  ].join('\n');

  function compile(gl, type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  // Top contour of a cut-out, ignoring thin parts like a straw or a lollipop stick (1D opening on the height).
  function contourFromImage(img, cols, openFrac) {
    var c = document.createElement('canvas'), H = Math.round(cols * img.naturalHeight / img.naturalWidth);
    c.width = cols; c.height = H;
    var x2 = c.getContext('2d', { willReadFrequently: true }); x2.drawImage(img, 0, 0, cols, H);
    var a = x2.getImageData(0, 0, cols, H).data, top = new Float32Array(cols);
    for (var x = 0; x < cols; x++) { var y = 0; while (y < H && a[(y * cols + x) * 4 + 3] < 128) y++; top[x] = y / H; }
    var w = Math.max(1, Math.round(cols * (openFrac || 0.06))), er = new Float32Array(cols), op = new Float32Array(cols), i, k;
    for (i = 0; i < cols; i++) { var m = 0; for (k = -w; k <= w; k++) m = Math.max(m, top[Math.min(cols - 1, Math.max(0, i + k))]); er[i] = m; }
    for (i = 0; i < cols; i++) { var n = 1; for (k = -w; k <= w; k++) n = Math.min(n, er[Math.min(cols - 1, Math.max(0, i + k))]); op[i] = n; }
    var out = new Float32Array(cols);
    for (var pass = 0; pass < 2; pass++) { for (i = 0; i < cols; i++) { var s = 0, q = 0; for (k = -6; k <= 6; k++) { var j = i + k; if (j >= 0 && j < cols) { s += op[j]; q++; } } out[i] = s / q; } op = out.slice(); }
    return out;
  }

  // The dessert's silhouette with small gaps closed (between sweets, round a straw), so a coat isn't cut ragged.
  // Returns the canvas and the mask itself, for planning a drizzle inside it.
  function hullFromImage(img, cols, closeFrac) {
    var H = Math.round(cols * img.naturalHeight / img.naturalWidth), c = document.createElement('canvas'); c.width = cols; c.height = H;
    var x2 = c.getContext('2d', { willReadFrequently: true }); x2.drawImage(img, 0, 0, cols, H);
    var d = x2.getImageData(0, 0, cols, H), a = d.data, m = new Uint8Array(cols * H), r = Math.max(1, Math.round(cols * closeFrac)), i, x, y, k;
    for (i = 0; i < cols * H; i++) m[i] = a[i * 4 + 3] > 110 ? 1 : 0;
    function pass(src, dil, horiz) { var o = new Uint8Array(cols * H);
      for (y = 0; y < H; y++) for (x = 0; x < cols; x++) { var v = dil ? 0 : 1;
        for (k = -r; k <= r; k++) { var X = horiz ? x + k : x, Y = horiz ? y : y + k; var s = (X < 0 || Y < 0 || X >= cols || Y >= H) ? 0 : src[Y * cols + X]; if (dil) { if (s) { v = 1; break; } } else if (!s) { v = 0; break; } }
        o[y * cols + x] = v; } return o; }
    m = pass(pass(m, true, true), true, false); m = pass(pass(m, false, true), false, false);
    for (i = 0; i < cols * H; i++) { a[i * 4] = a[i * 4 + 1] = a[i * 4 + 2] = 255; a[i * 4 + 3] = m[i] ? 255 : 0; }
    x2.putImageData(d, 0, 0); var c2 = document.createElement('canvas'); c2.width = cols; c2.height = H;
    var y2 = c2.getContext('2d'); y2.filter = 'blur(2.5px)'; y2.drawImage(c, 0, 0);
    return { canvas: c2, mask: m, w: cols, h: H };
  }

  // A drizzle path across the dessert: passes back and forth inside its silhouette, each a little diagonal, with
  // round turns. Points are in 0..1 of the dessert's box. kind alternates the angle so a second sauce crosses the first.
  function planDrizzle(hull, seed, kind, band) {
    var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(Math.floor(seed * 1e6) + 7);
    var W = hull.w, H = hull.h, m = hull.mask;
    var y0 = band ? band[0] : 0.18, y1 = band ? band[1] : 0.86;
    var passes = 5 + Math.floor(rnd() * 2), pts = [];
    var slant = (kind % 2 ? -1 : 1) * (0.05 + rnd() * 0.05);
    function span(v) { // the inside of the silhouette on row v, shrunk a little
      var y = Math.min(H - 1, Math.max(0, Math.round(v * H))), a = -1, b = -1;
      for (var x = 0; x < W; x++) if (m[y * W + x]) { if (a < 0) a = x; b = x; }
      if (a < 0) return null; var pad = (b - a) * 0.08; return [(a + pad) / W, (b - pad) / W];
    }
    for (var i = 0; i < passes; i++) {
      var v = y0 + (y1 - y0) * (i + 0.5 + (rnd() - 0.5) * 0.5) / passes;
      var sA = span(Math.max(0, v - slant)), sB = span(Math.min(1, v + slant)); if (!sA || !sB) continue;
      var L = [sA[0] + rnd() * 0.05, v - slant], R = [sB[1] - rnd() * 0.05, v + slant];
      // a loose hand: the middle of each pass bows a little
      var M = [(L[0] + R[0]) / 2 + (rnd() - 0.5) * 0.08, v + (rnd() - 0.5) * 0.07];
      if (i % 2) pts.push(R, M, L); else pts.push(L, M, R);
    }
    // a smooth curve through them (Catmull-Rom), sampled finely
    var out = [];
    for (var j = 0; j < pts.length - 1; j++) {
      var p0 = pts[Math.max(0, j - 1)], p1 = pts[j], p2 = pts[j + 1], p3 = pts[Math.min(pts.length - 1, j + 2)];
      for (var q = 0; q < 24; q++) {
        var t = q / 24, t2 = t * t, t3 = t2 * t;
        out.push([0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                  0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  // Rasterises a path to height (blurred bead profile) and progress (0..1 along its length), for the shader
  function rasterPath(path, aspect, widthFrac) {
    var TW = 512, TH = Math.max(64, Math.round(TW / aspect));
    var len = [0]; for (var i = 1; i < path.length; i++) { var dx = (path[i][0] - path[i - 1][0]) * TW, dy = (path[i][1] - path[i - 1][1]) * TH; len.push(len[i - 1] + Math.sqrt(dx * dx + dy * dy)); }
    var total = len[len.length - 1] || 1, lw = Math.max(4, widthFrac * TW);
    var hc = document.createElement('canvas'); hc.width = TW; hc.height = TH; var h = hc.getContext('2d');
    h.fillStyle = '#000'; h.fillRect(0, 0, TW, TH);
    h.lineCap = 'round'; h.lineJoin = 'round'; h.globalCompositeOperation = 'lighten';
    // a bead: a wide faint stroke, a middle one and a bright core, so blur gives a rounded profile
    [[1.0, 0.45], [0.7, 0.75], [0.42, 1.0]].forEach(function (s) {
      h.strokeStyle = 'rgba(255,255,255,' + s[1] + ')'; h.lineWidth = lw * s[0];
      h.beginPath(); h.moveTo(path[0][0] * TW, path[0][1] * TH); for (var k = 1; k < path.length; k++) h.lineTo(path[k][0] * TW, path[k][1] * TH); h.stroke();
    });
    // a pool where it first lands
    h.fillStyle = '#fff'; h.beginPath(); h.arc(path[0][0] * TW, path[0][1] * TH, lw * 0.62, 0, Math.PI * 2); h.fill();
    var hb = document.createElement('canvas'); hb.width = TW; hb.height = TH; var b = hb.getContext('2d');
    b.filter = 'blur(' + Math.max(1.5, lw * 0.22).toFixed(1) + 'px)'; b.drawImage(hc, 0, 0);
    // progress, drawn last to first so where the ribbon crosses itself the earlier pass wins
    var pc = document.createElement('canvas'); pc.width = TW; pc.height = TH; var g = pc.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, TW, TH); g.lineCap = 'round'; g.lineWidth = lw * 1.25;
    for (var s2 = path.length - 1; s2 > 0; s2--) {
      var v = Math.round(len[s2 - 1] / total * 254); g.strokeStyle = 'rgb(' + v + ',' + v + ',' + v + ')';
      g.beginPath(); g.moveTo(path[s2 - 1][0] * TW, path[s2 - 1][1] * TH); g.lineTo(path[s2][0] * TW, path[s2][1] * TH); g.stroke();
    }
    g.fillStyle = '#000'; g.beginPath(); g.arc(path[0][0] * TW, path[0][1] * TH, lw * 0.7, 0, Math.PI * 2); g.fill();
    return { w: TW, h: TH, height: b.getImageData(0, 0, TW, TH).data, prog: g.getImageData(0, 0, TW, TH).data, len: len, total: total };
  }

  function Pour(canvas, opts) {
    opts = opts || {};
    this.canvas = canvas;
    this.layers = [];
    this.light = [-0.55, 0.2, 0.8];
    this.source = null;
    this.reduced = !!opts.reducedMotion;
    this.dprCap = opts.dprCap || 1.75;
    this.onLand = opts.onLand || null;
    this.mode = 'coat';
    var gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false, preserveDrawingBuffer: !!opts.preserve });
    this.ok = !!gl && !!(gl && gl.getExtension('OES_standard_derivatives')) && gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS) >= 8;
    if (!this.ok) return;
    this.gl = gl;
    var pr = gl.createProgram();
    gl.attachShader(pr, compile(gl, gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, compile(gl, gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
    this.pr = pr; gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'aPos'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.u = {};
    ['uRes', 'uDpr', 'uGrav', 'uStreamR', 'uStretch', 'uCap', 'uCurt', 'uBaseCol', 'uDessert', 'uRect', 'uContour', 'uDrip', 'uHull', 'uCount', 'uL0', 'uL1', 'uL2', 'uL3', 'uL4', 'uLight',
      'uPath0', 'uPath1', 'uPath2', 'uLobes']
      .forEach(function (n) { this.u[n] = gl.getUniformLocation(pr, n); }, this);
    this.tex = { dessert: gl.createTexture(), contour: gl.createTexture(), drip: gl.createTexture(), hull: gl.createTexture(), path: [] };
    gl.uniform1i(this.u.uDessert, 0); gl.uniform1i(this.u.uContour, 1); gl.uniform1i(this.u.uDrip, 2); gl.uniform1i(this.u.uHull, 3);
    for (var i = 0; i < PATH_TEX; i++) { this.tex.path.push(gl.createTexture()); gl.uniform1i(this.u['uPath' + i], 4 + i); this._blankPath(i); }
    this.tex.lobes = gl.createTexture(); gl.uniform1i(this.u.uLobes, 7);
    this.curtainOn = opts.curtain !== false; this.baseCol = rgb(opts.baseColor || '#DED2E8');
    this.pathData = []; // per texture, two slots
    this._frame = this._frame.bind(this);
    this.raf = 0;
  }

  Pour.prototype._texImage = function (unit, tex, src, repeat, premult) {
    var gl = this.gl; gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !!premult);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };
  Pour.prototype._blankPath = function (i) {
    var gl = this.gl; gl.activeTexture(gl.TEXTURE4 + i); gl.bindTexture(gl.TEXTURE_2D, this.tex.path[i]);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 255, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  };
  // writes one drizzle into a slot (texture i, half 0 = RG, 1 = BA), keeping the other half
  Pour.prototype._putPath = function (slot, ras) {
    var gl = this.gl, ti = slot >> 1, half = slot & 1, cur = this.pathData[ti];
    if (!cur || cur.w !== ras.w || cur.h !== ras.h) { cur = this.pathData[ti] = { w: ras.w, h: ras.h, px: new Uint8Array(ras.w * ras.h * 4) }; for (var z = 0; z < cur.px.length; z += 4) { cur.px[z + 1] = 255; cur.px[z + 3] = 255; } }
    var px = cur.px, o = half * 2;
    for (var i = 0, n = ras.w * ras.h; i < n; i++) { px[i * 4 + o] = ras.height[i * 4]; px[i * 4 + o + 1] = ras.prog[i * 4]; }
    gl.activeTexture(gl.TEXTURE4 + ti); gl.bindTexture(gl.TEXTURE_2D, this.tex.path[ti]);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, ras.w, ras.h, 0, gl.RGBA, gl.UNSIGNED_BYTE, px);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };

  Pour.prototype.setDrip = function (img) { if (this.ok) { this._texImage(2, this.tex.drip, img, true, false); } };
  // their menu's lobed drips, which hang across the top of the stage and which each sauce floods over
  Pour.prototype.setLobes = function (img) { if (this.ok) { this._texImage(7, this.tex.lobes, img, true, false); this.hasLobes = true; this.kick(); } };

  // img: the cut-out; rect(): {x,y,w,h} in css px inside the canvas.
  // opts.mode 'drizzle' or 'coat', opts.open for ignoring thin parts, opts.band the rows a drizzle covers
  Pour.prototype.setDessert = function (img, rectFn, opts) {
    opts = opts || {};
    this.rectFn = rectFn; this.dessertImg = img; this.tile = opts.tile || null; this.stretch = opts.stretch || 1; this.cap = opts.cap != null ? opts.cap : 0.05;
    this.mode = opts.mode || 'coat'; this.band = opts.band || null; this.ribbon = opts.ribbon || 0.03;
    if (!this.ok) return;
    this._texImage(0, this.tex.dessert, img, false, true);
    var cont = contourFromImage(img, 256, opts.open), px = new Uint8Array(256 * 4);
    for (var i = 0; i < 256; i++) { var v = Math.round(Math.min(1, Math.max(0, cont[i])) * 65535); px[i * 4] = v >> 8; px[i * 4 + 1] = v & 255; px[i * 4 + 3] = 255; }
    this.contour = cont;
    this.hull = hullFromImage(img, 192, 0.05);
    this._texImage(3, this.tex.hull, this.hull.canvas, false, false);
    var gl = this.gl; gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.tex.contour);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, px);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.kick();
  };

  // y of the dessert's top surface (css px) at canvas x, for toppings to land on
  Pour.prototype.surfaceAt = function (x) {
    var r = this.rectFn(), c = this.contour; if (!c) return r.y;
    var u = (x - r.x) / r.w; if (u < 0 || u > 1) return Infinity;
    var f = u * 255, i = Math.floor(f), t = f - i; return r.y + (c[i] * (1 - t) + c[Math.min(255, i + 1)] * t) * r.h;
  };

  Pour.prototype._freeSlot = function () {
    var used = {}; this.layers.forEach(function (l) { if (l.slot != null) used[l.slot] = 1; });
    for (var s = 0; s < PATH_TEX * 2; s++) if (!used[s]) return s;
    return 0;
  };

  Pour.prototype.addSauce = function (name, opt) {
    var s = SAUCES[name]; if (!s || !this.rectFn) return;
    opt = opt || {};
    var r = this.rectFn(), src = this.sourcePoint(), k = this.layers.length;
    var off = k ? (Math.random() < 0.5 ? -1 : 1) * r.w * (0.08 + Math.random() * 0.12) : 0;
    var instant = this.reduced || opt.instant;
    var layer = { name: name, s: s, rgb: rgb(s.hex), t0: performance.now() - (instant ? 60000 : 0), phase: Math.random(),
      xi: (opt.xi != null ? opt.xi : src.x) + off, spreadK: Math.max(0.42, 0.85 * Math.pow(0.8, k)), tileW: r.w * (opt.tile || this.tile || 2.4), landed: !!instant,
      curtain: 1 - Math.min(0.45, k * 0.12), drizzle: this.mode === 'drizzle' && this.ok, slot: null, path: null };
    if (layer.drizzle) {
      layer.slot = this._freeSlot();
      layer.path = planDrizzle(this.hull, layer.phase, k, this.band);
      var ras = rasterPath(layer.path, r.w / r.h, this.ribbon);
      layer.len = ras.len; layer.total = ras.total; layer.dur = 1.5 + Math.min(1.2, ras.total / 900);
      this._putPath(layer.slot, ras);
      layer.xi = r.x + layer.path[0][0] * r.w;
    }
    this.layers.push(layer);
    if (this.layers.length > MAX_LAYERS) this.layers.shift();
    if (instant && this.onLand) this.onLand(layer);
    this.kick();
    return layer;
  };
  Pour.prototype.removeSauce = function (name) {
    for (var i = this.layers.length - 1; i >= 0; i--) if (this.layers[i].name === name) { this.layers.splice(i, 1); break; }
    this.kick();
  };
  Pour.prototype.clear = function () { this.layers = []; this.kick(); };
  Pour.prototype.has = function (name) { return this.layers.some(function (l) { return l.name === name; }); };
  Pour.prototype.animateFor = function (ms) { this.busyUntil = Math.max(this.busyUntil || 0, performance.now() + ms); this.kick(); };
  Pour.prototype.sourcePoint = function () {
    var r = this.rectFn();
    if (this.source) return this.source();
    return { x: r.x + r.w * 0.5, y: -10 };
  };
  Pour.prototype.setLight = function (nx, ny) { // nx, ny in -1..1 from pointer or tilt
    this.light = [-0.55 + nx * 0.3, 0.2 - ny * 0.2, 0.8]; this.kick();
  };

  Pour.prototype.resize = function () {
    if (!this.ok) return;
    var dpr = Math.min(window.devicePixelRatio || 1, this.dprCap), w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    this.dpr = dpr; this.w = w; this.h = h;
    var W = Math.max(1, Math.round(w * dpr)), H = Math.max(1, Math.round(h * dpr));
    if (this.canvas.width !== W || this.canvas.height !== H) { this.canvas.width = W; this.canvas.height = H; }
    this.kick();
  };

  // draws right now, so the canvas can be copied in the same task (for the golden ticket)
  Pour.prototype.drawNow = function () { if (!this.ok) return; if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; } this._frame(performance.now()); };
  Pour.prototype.kick = function () { if (this.ok && !this.raf && !this.paused) this.raf = requestAnimationFrame(this._frame); };
  Pour.prototype.pause = function (p) { this.paused = p; if (!p) this.kick(); };

  // the curtain's tile width and length in css px, for the stage's size
  Pour.prototype.curtain = function () {
    var tw = Math.max(240, Math.min(620, this.w * 0.44)), len = Math.min(tw * 0.5363, Math.max(70, this.h * 0.2));
    return { tw: tw, len: len };
  };

  Pour.prototype._frame = function (now) {
    this.raf = 0;
    if (!this.rectFn) return;
    var gl = this.gl, r = this.rectFn(), src = this.sourcePoint(), busy = false, g = Math.max(1800, this.h * 3.2);
    var C = this.curtain(), cur = C.len;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(this.u.uRes, this.w, this.h); gl.uniform1f(this.u.uDpr, this.dpr); gl.uniform1f(this.u.uGrav, g);
    gl.uniform1f(this.u.uStreamR, Math.max(5, r.w * 0.022));
    gl.uniform1f(this.u.uStretch, this.stretch || 1); gl.uniform1f(this.u.uCap, this.cap == null ? 0.05 : this.cap);
    gl.uniform4f(this.u.uCurt, C.tw, C.len, this.curtainOn && this.hasLobes ? 1 : 0, 0.18);
    gl.uniform3f(this.u.uBaseCol, this.baseCol[0], this.baseCol[1], this.baseCol[2]);
    gl.uniform4f(this.u.uRect, r.x, r.y, r.w, r.h);
    gl.uniform3f(this.u.uLight, this.light[0], this.light[1], this.light[2]);
    var L0 = new Float32Array(MAX_LAYERS * 4), L1 = new Float32Array(MAX_LAYERS * 4), L2 = new Float32Array(MAX_LAYERS * 4), L3 = new Float32Array(MAX_LAYERS * 4), L4 = new Float32Array(MAX_LAYERS * 4);
    for (var i = 0; i < this.layers.length; i++) {
      var l = this.layers[i], t = (now - l.t0) / 1000;
      var sy = cur * 0.06, nx, ny, lagPx = 0, dur, ti0 = 0;
      if (l.drizzle) {
        // the nozzle travels the path once the stream has landed; the stream follows it
        var yStart = r.y + l.path[0][1] * r.h; ti0 = 0.2 + Math.sqrt(2 * Math.max(1, yStart - sy) / g);
        var prog = Math.max(0, Math.min(1, (t - ti0) / l.dur)), target = prog * l.total, j = 1;
        while (j < l.len.length - 1 && l.len[j] < target) j++;
        var a = l.len[j - 1], b = l.len[j], f = b > a ? (target - a) / (b - a) : 0, P0 = l.path[j - 1], P1 = l.path[j];
        nx = r.x + (P0[0] + (P1[0] - P0[0]) * f) * r.w; ny = r.y + (P0[1] + (P1[1] - P0[1]) * f) * r.h;
        lagPx = (P1[0] - P0[0]) * r.w * 0.06 * (prog < 1 ? 1 : 0);
        dur = ti0 - 0.2 + l.dur;
        if (t < ti0 + l.dur + 3) busy = true;
        if (!l.landed && t >= ti0) { l.landed = true; if (this.onLand) this.onLand(l); }
      } else {
        nx = l.xi; ny = this.surfaceAt(l.xi);
        var ti = 0.2 + Math.sqrt(2 * Math.max(1, ny - sy) / g);
        dur = ti - 0.2 + 0.7;
        if (t < 6.5) busy = true;
        if (!l.landed && t >= ti) { l.landed = true; if (this.onLand) this.onLand(l); }
      }
      L0.set([t, l.phase, l.drizzle ? ti0 : l.xi, l.tileW], i * 4);
      L1.set([l.rgb[0], l.rgb[1], l.rgb[2], l.s.core], i * 4);
      L2.set([l.s.spec, l.s.shin, l.drizzle ? l.dur : l.spreadK, l.s.edge], i * 4);
      L3.set([l.drizzle ? 1 : 0, l.drizzle ? (l.slot >> 1) + (l.slot & 1) * 0.5 : 0, l.curtain, dur], i * 4);
      L4.set([nx, ny, lagPx, sy], i * 4);
    }
    gl.uniform1i(this.u.uCount, this.layers.length);
    gl.uniform4fv(this.u.uL0, L0); gl.uniform4fv(this.u.uL1, L1); gl.uniform4fv(this.u.uL2, L2); gl.uniform4fv(this.u.uL3, L3); gl.uniform4fv(this.u.uL4, L4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (busy || now < (this.busyUntil || 0)) this.raf = requestAnimationFrame(this._frame);
  };

  window.CharliePour = { Pour: Pour, SAUCES: SAUCES };
})();
