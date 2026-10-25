/* v3 art layer. H&P is one day in a new home, ReShare is a piece of furniture on its next life.
   Everything that moves writes transforms, opacity, clip paths or CSS variables. Reduced motion gets the static page. */
(function () {
  var html = document.documentElement;
  var rm = html.classList.contains('rm');
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var ease = function (x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var vh = window.innerHeight, vw = window.innerWidth;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var fine = window.matchMedia('(pointer: fine)').matches;

  /* ------------------------------------------------------------ the light behind the page */
  var TONES = {
    dawn: ['#F6F0E6', '#DCE48C', '#F2C6A2', '#CFC5EA'],
    day: ['#F8F6EF', '#E4EAAE', '#F4DAC0', '#D9D3EE'],
    gold: ['#F7EEE2', '#F0CD9C', '#E6AA82', '#D4C7EA'],
    dusk: ['#2A2540', '#4A3E7A', '#B8683C', '#1C1830'],
    rdawn: ['#F2F1EA', '#A9DCD3', '#EAD9BE', '#DCE48C'],
    rsand: ['#F4EFE6', '#EBD2AE', '#B5DFD4', '#E2E6A6'],
    forest: ['#15302A', '#1F5A50', '#2E8C80', '#0F231F']
  };
  var hex = function (h) { return [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255]; };
  var toneName = null, cur = null, tgt = null;
  var setTone = function (name) {
    if (!TONES[name] || name === toneName) return;
    toneName = name;
    var p = TONES[name];
    for (var i = 0; i < 4; i++) html.style.setProperty('--c' + i, p[i]);
    tgt = p.map(hex);
    if (!cur) cur = tgt.map(function (c) { return c.slice(); });
  };
  var tones = $$('[data-tone]');
  if (tones.length) setTone(tones[0].getAttribute('data-tone'));

  var bg = $('.fx-bg'), gl = null, U = {}, cvs = null, scrollF = 0;
  var FS = '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec2 r;uniform float t,s;uniform vec3 c0,c1,c2,c3;' +
    'vec3 pm(vec3 x){return mod(((x*34.)+1.)*x,289.);}' +
    'float sn(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);' +
    'vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);' +
    'vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);vec3 p=pm(pm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));' +
    'vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;' +
    'vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;' +
    'm*=1.79284291400159-.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}' +
    'void main(){vec2 uv=gl_FragCoord.xy/r;float k=t*.045;vec2 q=uv*vec2(1.5,1.)+vec2(0.,s*.6);' +
    'vec2 w=uv+.24*vec2(sn(q+vec2(k,-k*.7)),sn(q*1.3+vec2(-k*.8,k)+4.2));' +
    'float a=1.-smoothstep(0.,.78,distance(w,vec2(.16+.1*sin(k*1.7),.9+.06*cos(k*1.3))));' +
    'float b=1.-smoothstep(0.,.8,distance(w,vec2(.92+.07*cos(k*1.1),.5+.12*sin(k*.9))));' +
    'float c=1.-smoothstep(0.,.86,distance(w,vec2(.4+.14*sin(k*.8),-.06)));' +
    'vec3 col=mix(c0,c1,a*.95);col=mix(col,c2,b*.9);col=mix(col,c3,c*.9);' +
    'float n=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));col+=(n-.5)*.03;gl_FragColor=vec4(clamp(col,0.,1.),1.);}';
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var sizeBg = function () {
    if (!cvs) return;
    var sc = vw < 760 ? .5 : .45;
    cvs.width = Math.max(2, Math.round(vw * sc)); cvs.height = Math.max(2, Math.round(vh * sc));
    if (gl) { gl.viewport(0, 0, cvs.width, cvs.height); gl.uniform2f(U.r, cvs.width, cvs.height); }
  };
  if (bg && !rm) {
    try {
      cvs = document.createElement('canvas');
      gl = cvs.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'low-power' });
      if (gl) {
        var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
        var pr = gl.createProgram();
        gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
        if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error('link');
        gl.useProgram(pr);
        var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        ['r', 't', 's', 'c0', 'c1', 'c2', 'c3'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
        bg.appendChild(cvs); sizeBg();
        var t0 = performance.now(), last = 0, first = true;
        var frame = function (ts) {
          requestAnimationFrame(frame);
          if (document.hidden || ts - last < 33) return;
          last = ts;
          for (var i = 0; i < 4; i++) for (var j = 0; j < 3; j++) cur[i][j] += (tgt[i][j] - cur[i][j]) * .05;
          gl.uniform1f(U.t, (ts - t0) / 1000); gl.uniform1f(U.s, scrollF);
          gl.uniform3fv(U.c0, cur[0]); gl.uniform3fv(U.c1, cur[1]); gl.uniform3fv(U.c2, cur[2]); gl.uniform3fv(U.c3, cur[3]);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          if (first) { first = false; cvs.classList.add('on'); }
        };
        requestAnimationFrame(frame);
      }
    } catch (err) { if (cvs && cvs.parentNode) cvs.parentNode.removeChild(cvs); gl = null; cvs = null; }
  }

  /* ------------------------------------------------------------ the header turns with the light */
  var hdr = $('.hdr');

  /* ------------------------------------------------------------ H&P, the window that becomes the room */
  var hx = $('.hx'), hxStick, hxRoom, hxHole, r0 = null;
  if (hx && !rm) {
    hxStick = $('.hx-stick', hx); hxRoom = $('.hx-room', hx); hxHole = $('.hx-win.grow', hx);
  }
  var measureHero = function () {
    if (!hxHole) return;
    hx.style.setProperty('--e', 0);
    var s = hxStick.getBoundingClientRect(), h = hxHole.getBoundingClientRect();
    r0 = { x: h.left - s.left, y: h.top - s.top, w: h.width, h: h.height, W: s.width, H: s.height };
  };
  var heroUpdate = function () {
    if (!r0) return;
    var total = hx.offsetHeight - vh;
    var p = clamp(-hx.getBoundingClientRect().top / Math.max(1, total), 0, 1);
    var e = ease(clamp(p / .5, 0, 1));
    var g = ease(clamp((p - .03) / .55, 0, 1));
    var x = r0.x * (1 - g), y = r0.y * (1 - g), w = r0.w + (r0.W - r0.w) * g, h = r0.h + (r0.H - r0.h) * g;
    var rr = (r0.w / 2) * (1 - g);
    hxRoom.style.clipPath = 'inset(' + y.toFixed(1) + 'px ' + (r0.W - x - w).toFixed(1) + 'px ' + (r0.H - y - h).toFixed(1) + 'px ' + x.toFixed(1) + 'px round ' + rr.toFixed(1) + 'px ' + rr.toFixed(1) + 'px 0 0)';
    var light = clamp((p - .28) / .3, 0, 1), sw = clamp((p - .26) / .5, 0, 1);
    var st = hx.style;
    st.setProperty('--e', e.toFixed(4));
    st.setProperty('--g', g.toFixed(4));
    st.setProperty('--fade', clamp((p - .06) / .26, 0, 1).toFixed(3));
    st.setProperty('--out', clamp(p / .12, 0, 1).toFixed(3));
    st.setProperty('--light', light.toFixed(3));
    st.setProperty('--sun', (Math.sin(sw * Math.PI) * .95).toFixed(3));
    st.setProperty('--sx', (6 + sw * 80).toFixed(1) + '%');
    st.setProperty('--endo', clamp((p - .58) / .2, 0, 1).toFixed(3));
    st.setProperty('--pe', p > .06 ? 'none' : 'auto');
  };
  if (hxStick && fine) {
    hxStick.addEventListener('pointermove', function (ev) {
      var s = hxStick.getBoundingClientRect();
      hx.style.setProperty('--lx', (ev.clientX - s.left) + 'px'); hx.style.setProperty('--ly', (ev.clientY - s.top) + 'px'); hx.style.setProperty('--lo', 1);
    }, { passive: true });
    hxStick.addEventListener('pointerleave', function () { hx.style.setProperty('--lo', 0); });
  }

  /* ------------------------------------------------------------ words that fill in as they're read */
  var fills = rm ? [] : $$('.fill');
  fills.forEach(function (el) {
    var walk = function (node) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (s) {
            if (!s) return;
            if (/^\s+$/.test(s)) frag.appendChild(document.createTextNode(s));
            else { var sp = document.createElement('span'); sp.className = 'wd'; sp.textContent = s; frag.appendChild(sp); }
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el); el._w = el.querySelectorAll('.wd'); el._n = -1;
  });
  var fillUpdate = function () {
    fills.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var p = clamp((vh * .82 - r.top) / (r.height + vh * .3), 0, 1);
      var n = Math.round(p * el._w.length * 1.2);
      if (n === el._n) return;
      el._n = n;
      for (var i = 0; i < el._w.length; i++) el._w[i].classList.toggle('on', i < n);
    });
  };

  /* ------------------------------------------------------------ what you hand over, a photo per row */
  var hand = $('.hand'), hItems = [], hImgs = [], hIdx = -1, hN, hT;
  if (hand) { hItems = $$('.hand-list li', hand); hImgs = $$('.hand-frame img', hand); hN = $('[data-hn]', hand); hT = $('[data-ht]', hand); }
  var handUpdate = function () {
    if (!hItems.length) return;
    var best = 0, bd = 1e9;
    hItems.forEach(function (li, k) { var r = li.getBoundingClientRect(); var d = Math.abs(r.top + r.height / 2 - vh * .55); if (d < bd) { bd = d; best = k; } });
    if (best === hIdx) return;
    hIdx = best;
    hItems.forEach(function (li, k) { li.classList.toggle('on', k === best); });
    hImgs.forEach(function (im, k) { im.classList.toggle('on', k <= best); });
    if (hN) hN.textContent = ('0' + (best + 1)).slice(-2);
    if (hT) hT.textContent = hItems[best].querySelector('b').textContent;
  };

  /* ------------------------------------------------------------ the kinetic line */
  var kin = rm ? null : $('.kin'), kTrack = kin && $('.kin-track', kin);
  var kinUpdate = function () {
    if (!kTrack) return;
    var r = kin.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
    kTrack.style.setProperty('--kx', (-p * Math.max(0, kTrack.scrollWidth - vw)).toFixed(1) + 'px');
  };

  /* ------------------------------------------------------------ each home type shows itself under the cursor */
  var peek = (rm || !fine) ? null : $('.peek');
  if (peek) {
    var pImgs = $$('img', peek), lastX = 0;
    $$('[data-peek]').forEach(function (row) {
      var k = +row.getAttribute('data-peek');
      row.addEventListener('pointerenter', function () { pImgs.forEach(function (im, i) { im.classList.toggle('on', i === k); }); peek.classList.add('on'); });
      row.addEventListener('pointerleave', function () { peek.classList.remove('on'); });
      row.addEventListener('pointermove', function (ev) {
        peek.style.setProperty('--px', ev.clientX + 'px'); peek.style.setProperty('--py', ev.clientY + 'px');
        peek.style.setProperty('--pr', clamp((ev.clientX - lastX) * .6, -8, 8).toFixed(1) + 'deg'); lastX = ev.clientX;
      }, { passive: true });
    });
  }

  /* ------------------------------------------------------------ every home, a curved panorama */
  var pano = rm ? null : $('.pano'), pRing, pFigs = [], pStep = 10;
  if (pano) { pRing = $('.pano-ring', pano); pFigs = $$('figure', pRing); }
  var panoUpdate = function () {
    if (!pRing) return;
    var r = pano.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    pStep = parseFloat(getComputedStyle(pano).getPropertyValue('--step')) || 10;
    var p = clamp((vh - r.top) / (vh + r.height), 0, 1), n = pFigs.length;
    var k = 1.5 + p * (n - 4);
    var rot = k * pStep;
    pRing.style.setProperty('--rot', rot.toFixed(2) + 'deg');
    pFigs.forEach(function (f, i) { f.classList.toggle('off', Math.abs(rot - i * pStep) > 34); });
  };

  /* ------------------------------------------------------------ verkoopstyling, photos at different depths */
  var gal = rm ? [] : $$('.gal3 figure');
  var galUpdate = function () {
    gal.forEach(function (f) {
      var r = f.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var c = (r.top + r.height / 2 - vh / 2) / vh;
      f.style.setProperty('--py', (c * -(parseFloat(f.getAttribute('data-speed')) || 0) * 100).toFixed(1) + 'px');
    });
  };

  /* ------------------------------------------------------------ ReShare, the ring and the cycle */
  var ring = rm ? null : $('.ring3'), rIn = ring && $('.ring3-in', ring), rWords = ring ? $$('[data-w]', ring) : [], rIdx = -1;
  var ringUpdate = function () {
    if (!rIn) return;
    var r = ring.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
    rIn.style.setProperty('--rot', (40 - p * 260).toFixed(2) + 'deg');
    var i = Math.min(rWords.length - 1, Math.floor(clamp((p - .12) / .76, 0, .9999) * rWords.length));
    if (i !== rIdx) { rIdx = i; rWords.forEach(function (w, k) { w.classList.toggle('on', k === i); }); }
  };
  var cyc = $('.cyc'), cArc, cDot, cNodes = [], cItems = [], cNum, cName, cIdx = -1, cLen = 0;
  if (cyc) {
    cArc = $('.arc', cyc); cDot = $('.dot', cyc); cNodes = $$('.node', cyc); cItems = $$('.cyc-list li', cyc); cNum = $('[data-cn]', cyc); cName = $('[data-ct]', cyc);
    cLen = 2 * Math.PI * 150;
    if (cArc) { cArc.style.strokeDasharray = cLen; cArc.style.strokeDashoffset = rm ? 0 : cLen; }
  }
  var cycUpdate = function () {
    if (!cyc || rm) return;
    var r = cyc.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    var p = clamp((vh * .78 - r.top) / (r.height * .9), 0, 1);
    cArc.style.strokeDashoffset = (cLen * (1 - p)).toFixed(1);
    var a = (-90 + p * 360) * Math.PI / 180;
    cDot.setAttribute('cx', (200 + 150 * Math.cos(a)).toFixed(1)); cDot.setAttribute('cy', (200 + 150 * Math.sin(a)).toFixed(1));
    var i = Math.min(3, Math.floor(p * 4));
    if (i === cIdx) return;
    cIdx = i;
    cNodes.forEach(function (n, k) { n.classList.toggle('on', k <= i); });
    cItems.forEach(function (li, k) { li.classList.toggle('on', k === i); });
    if (cNum) cNum.textContent = '0' + (i + 1);
    if (cName) cName.textContent = cItems[i].querySelector('b').textContent;
  };

  /* ------------------------------------------------------------ one loop for everything tied to scroll */
  var ticking = false;
  var update = function () {
    ticking = false;
    var y = window.scrollY;
    scrollF = y / Math.max(1, document.documentElement.scrollHeight - vh);
    if (hdr) hdr.classList.toggle('scrolled', y > 8);
    var mid = vh * .5, tone = null, under = null;
    for (var i = 0; i < tones.length; i++) {
      var r = tones[i].getBoundingClientRect();
      if (r.top <= mid) tone = tones[i].getAttribute('data-tone');
      if (r.top <= 40 && r.bottom > 40) under = tones[i].getAttribute('data-tone');
    }
    if (tone) setTone(tone);
    if (hdr) hdr.classList.toggle('dusk', under === 'dusk' || under === 'forest');
    heroUpdate(); fillUpdate(); handUpdate(); kinUpdate(); panoUpdate(); galUpdate(); ringUpdate(); cycUpdate();
  };
  var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', function () {
    vh = window.innerHeight; vw = window.innerWidth; sizeBg(); measureHero(); morphSize(); req();
  });
  measureHero(); update();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measureHero(); update(); });
  window.addEventListener('load', function () { measureHero(); update(); });

  /* ------------------------------------------------------------ mission lines arrive one by one */
  var mis = $$('.mission li');
  if (mis.length && !rm && 'IntersectionObserver' in window) {
    var mio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); mio.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    mis.forEach(function (li, i) { li.style.transitionDelay = (i % 5) * 90 + 'ms'; mio.observe(li); });
  } else mis.forEach(function (li) { li.classList.add('in'); });

  /* ------------------------------------------------------------ ReShare, one piece of furniture, many lives */
  var mWrap = $('.morph'), mc = mWrap && $('canvas', mWrap), morphSize = function () {};
  if (mc && !rm) {
    var ctx = mc.getContext('2d'), S = 200, N = vw < 760 ? 1100 : 1900;
    var dpr = Math.min(2, window.devicePixelRatio || 1), CW = 0, scale = 1, offX = 0, offY = 0;
    var draw = [
      function (x) { x.beginPath(); x.moveTo(58, 26); x.lineTo(73, 26); x.lineTo(82, 102); x.lineTo(148, 102); x.lineTo(148, 117); x.lineTo(68, 117); x.closePath(); x.fill();
        x.lineWidth = 9; x.beginPath(); x.moveTo(73, 117); x.lineTo(64, 178); x.moveTo(140, 117); x.lineTo(147, 178); x.stroke(); },
      function (x) { var rr = function (a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.fill(); };
        rr(34, 58, 132, 54, 16); rr(28, 106, 144, 34, 10); rr(14, 80, 28, 66, 12); rr(158, 80, 28, 66, 12); x.fillRect(32, 146, 9, 20); x.fillRect(159, 146, 9, 20); },
      function (x) { x.beginPath(); x.moveTo(72, 30); x.lineTo(128, 30); x.lineTo(146, 84); x.lineTo(54, 84); x.closePath(); x.fill();
        x.fillRect(96, 84, 8, 84); x.beginPath(); x.ellipse(100, 172, 34, 8, 0, 0, Math.PI * 2); x.fill(); },
      function (x) { x.fillRect(20, 100, 160, 12); x.lineWidth = 9; x.beginPath(); x.moveTo(38, 112); x.lineTo(32, 178); x.moveTo(162, 112); x.lineTo(168, 178); x.stroke();
        x.beginPath(); x.ellipse(100, 80, 13, 20, 0, 0, Math.PI * 2); x.fill(); x.lineWidth = 3; x.beginPath(); x.moveTo(100, 62); x.lineTo(86, 32); x.moveTo(100, 62); x.lineTo(104, 26); x.moveTo(100, 62); x.lineTo(118, 36); x.stroke();
        [[86, 30], [104, 24], [119, 34]].forEach(function (f) { x.beginPath(); x.arc(f[0], f[1], 7, 0, Math.PI * 2); x.fill(); }); }
    ];
    var shapes = draw.map(function (fn) {
      var c = document.createElement('canvas'); c.width = c.height = S;
      var x = c.getContext('2d'); x.fillStyle = x.strokeStyle = '#000'; x.lineCap = x.lineJoin = 'round'; fn(x);
      var d = x.getImageData(0, 0, S, S).data, pts = [];
      for (var y = 0; y < S; y += 2) for (var X = 0; X < S; X += 2) if (d[(y * S + X) * 4 + 3] > 120) pts.push(X, y);
      var m = pts.length / 2, out = new Float32Array(N * 2), idx = [];
      for (var i = 0; i < m; i++) idx.push(i);
      for (i = m - 1; i > 0; i--) { var j = (Math.random() * (i + 1)) | 0, tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp; }
      for (i = 0; i < N; i++) { var q = idx[i % m]; out[i * 2] = pts[q * 2] + Math.random() * 2 - 1; out[i * 2 + 1] = pts[q * 2 + 1] + Math.random() * 2 - 1; }
      return out;
    });
    var px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), col = new Uint8Array(N), sz = new Float32Array(N);
    var COLS = ['#1F5A50', '#2FA597', '#C9A47A', '#9DAA2E'];
    for (var i = 0; i < N; i++) {
      var a = Math.random() * Math.PI * 2, rr = 70 + Math.random() * 40;
      px[i] = 100 + Math.cos(a) * rr; py[i] = 100 + Math.sin(a) * rr;
      var u = Math.random(); col[i] = u < .38 ? 0 : u < .72 ? 1 : u < .9 ? 2 : 3; sz[i] = .9 + Math.random() * .9;
    }
    var shape = 0, life = 1, lifeEl = $('[data-life]', mWrap), changed = performance.now(), mx = -999, my = -999, onScreen = true;
    morphSize = function () {
      var r = mc.getBoundingClientRect();
      CW = r.width; mc.width = Math.round(r.width * dpr); mc.height = Math.round(r.height * dpr);
      scale = (r.width * .8) / S; offX = r.width * .1; offY = r.height * .08;
    };
    morphSize();
    mc.addEventListener('pointermove', function (ev) { var r = mc.getBoundingClientRect(); mx = (ev.clientX - r.left - offX) / scale; my = (ev.clientY - r.top - offY) / scale; }, { passive: true });
    mc.addEventListener('pointerleave', function () { mx = my = -999; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; }).observe(mc);
    var tick = function (ts) {
      requestAnimationFrame(tick);
      if (!onScreen || document.hidden) return;
      if (ts - changed > 3400) {
        changed = ts; shape = (shape + 1) % shapes.length; life = life % 4 + 1;
        if (lifeEl) lifeEl.textContent = life;
        for (var k = 0; k < N; k++) { vx[k] += (Math.random() - .5) * 7; vy[k] += (Math.random() - .5) * 7 - 1.2; }
      }
      var T = shapes[shape];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, CW, CW);
      for (var c = 0; c < 4; c++) {
        ctx.fillStyle = COLS[c];
        for (var k = 0; k < N; k++) {
          if (col[k] !== c) continue;
          var dx = T[k * 2] - px[k], dy = T[k * 2 + 1] - py[k];
          vx[k] += dx * .016; vy[k] += dy * .016;
          var ex = px[k] - mx, ey = py[k] - my, d2 = ex * ex + ey * ey;
          if (d2 < 900) { var d = Math.sqrt(d2) || 1, f = (1 - d2 / 900) * 1.6; vx[k] += ex / d * f; vy[k] += ey / d * f; }
          vx[k] *= .85; vy[k] *= .85; px[k] += vx[k]; py[k] += vy[k];
          var s = sz[k] * 1.6;
          ctx.fillRect(offX + px[k] * scale - s / 2, offY + py[k] * scale - s / 2, s, s);
        }
      }
    };
    requestAnimationFrame(tick);
  }
})();
