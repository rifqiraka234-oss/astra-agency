// The hero stage in three.js. Their top hat stands on a striped counter in a spotlight, flips over like a magician's
// hat, and the dessert the visitor picks rises out of it with a cloud of glossy sweets. Scroll and the hat tips
// toward you and you fall into it. window.CharlieHero.create(canvas, opts)
(function () {
  'use strict';
  const T = window.THREE;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = {
    outBack: t => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    inOut: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    out: t => 1 - Math.pow(1 - t, 3),
    in: t => t * t * t,
    outBounce: t => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375; return n * (t -= 2.625 / d) * t + 0.984375; },
  };

  // the photo for each base, and its size on the stage (height in world units)
  const DESSERTS = {
    waffle: { src: 'media/waffle.webp', h: 4.5 },
    crepe: { src: 'media/crepe-hero.webp', h: 2.8 },
    shake: { src: 'media/shake.webp', h: 5.0 },
    cookie_dough: { src: 'media/cookie-dough.webp', h: 3.2 },
    sundae: { src: 'media/sundae-hero.webp', h: 4.0 },
    froyo: { src: 'media/froyo-hero.webp', h: 3.9 },
  };

  function stripeTexture() {
    const cols = ['#5F3F90', '#3A8A96', '#DED2E8', '#AC880F', '#5F3F90', '#DED2E8', '#3A8A96', '#F0B962'];
    const c = document.createElement('canvas'); c.width = 512; c.height = 64;
    const g = c.getContext('2d'); const w = c.width / cols.length;
    cols.forEach((col, i) => { g.fillStyle = col; g.fillRect(i * w, 0, w + 1, 64); });
    // a soft sheen line along the top edge of the counter front
    const gr = g.createLinearGradient(0, 0, 0, 64); gr.addColorStop(0, 'rgba(255,255,255,0.25)'); gr.addColorStop(0.08, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.25)');
    g.fillStyle = gr; g.fillRect(0, 0, 512, 64);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = T.RepeatWrapping; t.anisotropy = 4;
    return t;
  }

  // the sweets that fly out of the hat, as instanced glossy shapes in the stripe colours
  function sweetKinds() {
    const star = new T.Shape();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 0.07 : 0.16; i ? star.lineTo(Math.cos(a) * r, Math.sin(a) * r) : star.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
    const starGeo = new T.ExtrudeGeometry(star, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.02, bevelSegments: 3 }); starGeo.center();
    const mallowPts = []; for (let i = 0; i <= 10; i++) { const a = i / 10 * Math.PI; mallowPts.push(new T.Vector2(0.1 + 0.03 * Math.sin(a), -0.1 + 0.2 * i / 10)); }
    mallowPts.unshift(new T.Vector2(0, -0.1)); mallowPts.push(new T.Vector2(0, 0.1));
    const mallowGeo = new T.LatheGeometry(mallowPts, 24);
    return [
      { name: 'gum', geo: new T.SphereGeometry(0.15, 28, 20), n: 13, mat: { spec: 1.25, shin: 90, amb: 0.36, diff: 0.75, rimK: 0.18, rim: '#ffffff' }, cols: ['#F75F9B', '#32B3C3', '#F8C559', '#ff8a3d', '#8f6bd6', '#e83a5f'] },
      { name: 'mallow', geo: mallowGeo, n: 8, mat: { spec: 0.08, shin: 8, amb: 0.5, diff: 0.62, rimK: 0.35, rim: '#ffffff', rimPow: 2 }, cols: ['#ffd1e3', '#fff4fb', '#cdeef4', '#fff2c4'] },
      { name: 'sprinkle', geo: new T.CapsuleGeometry(0.028, 0.15, 4, 8), n: 30, mat: { spec: 0.9, shin: 60, amb: 0.4, diff: 0.7, rimK: 0.15, rim: '#ffffff' }, cols: ['#F75F9B', '#32B3C3', '#F8C559', '#ffffff', '#8f6bd6', '#ff8a3d', '#7bd389'] },
      { name: 'star', geo: starGeo, n: 6, mat: { spec: 0.55, shin: 36, amb: 0.36, diff: 0.75, rimK: 0.12, rim: '#ffd9c0' }, cols: ['#5a2f1b', '#f3e6d2', '#3b1d12'] },
    ];
  }

  function create(canvas, opts) {
    opts = opts || {};
    const reduced = !!opts.reducedMotion;
    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.debug.checkShaderErrors = false;
    renderer.outputColorSpace = T.SRGBColorSpace;
    // it runs on the page or in a worker (the page passes its size and pixel ratio when it's a worker)
    const vw = opts.vw || self.innerWidth, vh = opts.vh || self.innerHeight;
    const phoneish = Math.min(vw, vh) < 600;
    renderer.setPixelRatio(Math.min(phoneish ? 1.75 : 2, opts.dpr || self.devicePixelRatio || 1));
    const raf = self.requestAnimationFrame ? self.requestAnimationFrame.bind(self) : function (f) { return setTimeout(function () { f(performance.now()); }, 16); };

    const scene = new T.Scene();

    const camera = new T.PerspectiveCamera(24, 1, 0.1, 120);

    // the felt is lit by a warm key from the festoon side, a cool rim and a lilac fill; everything else is a matcap
    // painted with the same light, so the scene needs no environment map and no shadow maps
    const MCP = window.CharlieHat.matcap;
    const key = new T.DirectionalLight('#ffe2bf', 2.7); key.position.set(-4, 8, 6); scene.add(key);
    const rimA = new T.DirectionalLight('#9fe3f0', 1.1); rimA.position.set(6, 2.5, -5); scene.add(rimA);
    scene.add(new T.HemisphereLight('#c6aaf2', '#1d0833', 0.85));

    // the counter, its striped front and a pale top the hat stands on
    const world = new T.Group(); scene.add(world);
    const counterTop = new T.Mesh(new T.BoxGeometry(60, 0.12, 3.4), new T.MeshMatcapMaterial({ matcap: MCP(T, { base: '#b9a2d4', amb: 0.36, diff: 0.62, spec: 0.3, shin: 30, rimK: 0.08 }) }));
    counterTop.position.set(0, -0.06, 0.3); world.add(counterTop);
    // the hat's soft shadow on the counter, a blurred disc that tightens as the hat lands
    const shC = document.createElement('canvas'); shC.width = shC.height = 128; const shX = shC.getContext('2d'), shG = shX.createRadialGradient(64, 64, 4, 64, 64, 64);
    shG.addColorStop(0, 'rgba(26,6,48,.62)'); shG.addColorStop(0.55, 'rgba(26,6,48,.28)'); shG.addColorStop(1, 'rgba(26,6,48,0)'); shX.fillStyle = shG; shX.fillRect(0, 0, 128, 128);
    const hatShadow = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: new T.CanvasTexture(shC), transparent: true, depthWrite: false }));
    hatShadow.rotation.x = -Math.PI / 2; hatShadow.position.set(0.25, 0.006, 0.25); world.add(hatShadow);
    // the warm pool of light the hat stands in
    const plC = document.createElement('canvas'); plC.width = plC.height = 128; const plX = plC.getContext('2d'), plG = plX.createRadialGradient(64, 64, 2, 64, 64, 64);
    plG.addColorStop(0, 'rgba(255,190,110,.32)'); plG.addColorStop(0.5, 'rgba(255,170,90,.12)'); plG.addColorStop(1, 'rgba(255,214,150,0)'); plX.fillStyle = plG; plX.fillRect(0, 0, 128, 128);
    const pool = new T.Mesh(new T.PlaneGeometry(9, 4.6), new T.MeshBasicMaterial({ map: new T.CanvasTexture(plC), transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(-0.3, 0.004, 0.4); world.add(pool);
    const st = stripeTexture(); st.repeat.set(16, 1);
    const front = new T.Mesh(new T.PlaneGeometry(60, 6), new T.MeshBasicMaterial({ map: st }));
    front.position.set(0, -3.12, 2.0); world.add(front);
    const lip = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 60, 12), new T.MeshMatcapMaterial({ matcap: MCP(T, { kind: 'metal', base: '#F0B962', spec: 1.2, shin: 60 }) }));
    lip.rotation.z = Math.PI / 2; lip.position.set(0, -0.1, 2.02); world.add(lip);

    // the hat
    const hat = window.CharlieHat.build(T); const hatPivot = new T.Group(); hatPivot.add(hat); world.add(hatPivot);
    const H = hat.userData.height; // crown height incl. top

    // the dessert, a cut out photo on a plane that rises out of the hat
    const loader = typeof Image !== 'undefined' ? new T.TextureLoader() : null, media = opts.mediaBase || '';
    // drawn over the sweets so none ever sits on the photo, and cut off below the hat's opening as it sinks in
    const clip = new T.Plane(new T.Vector3(0, 1, 0), 0);
    const dessertMat = new T.MeshBasicMaterial({ transparent: true, alphaTest: 0.02, depthTest: false, depthWrite: false, toneMapped: false, side: T.DoubleSide, clippingPlanes: [clip] });
    renderer.localClippingEnabled = true;
    const dessert = new T.Mesh(new T.PlaneGeometry(1, 1), dessertMat); dessert.visible = false; dessert.renderOrder = 10;
    world.add(dessert);
    const textures = {};
    function texFor(key) {
      if (textures[key]) return textures[key];
      textures[key] = new Promise(res => {
        const d = DESSERTS[key];
        if (!loader) {
          // in a worker: fetch and decode off the main thread
          fetch(/^data:/.test(d.src) ? d.src : media + d.src.replace(/^media\//, '')).then(r => r.blob()).then(b => createImageBitmap(b, { imageOrientation: 'flipY', premultiplyAlpha: 'none' })).then(bm => {
            const t = new T.Texture(bm); t.flipY = false; t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; t.needsUpdate = true; t.userData = { aspect: bm.width / bm.height }; res(t);
          });
        } else if (/\.svg$/.test(d.src)) {
          // draw the svg into a canvas at a good size so it isn't blurry as a texture
          const img = new Image(); img.onload = () => {
            const s = 1400 / Math.max(img.naturalWidth || 1, img.naturalHeight || 1);
            const c = document.createElement('canvas'); c.width = Math.round((img.naturalWidth || 700) * s); c.height = Math.round((img.naturalHeight || 700) * s);
            c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
            const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; t.userData = { aspect: c.width / c.height }; res(t);
          }; img.src = d.src;
        } else loader.load(d.src, t => { t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; t.userData = { aspect: t.image.width / t.image.height }; res(t); });
      });
      return textures[key];
    }

    // sweets
    const kinds = sweetKinds(), sweets = [];
    const dummy = new T.Object3D(), tmpC = new T.Color(), tgt = new T.Vector3();
    for (const k of kinds) {
      const mat = new T.MeshMatcapMaterial({ color: '#ffffff', matcap: window.CharlieHat.matcap(T, Object.assign({ base: '#ffffff' }, k.mat)) });
      const mesh = new T.InstancedMesh(k.geo, mat, k.n); mesh.frustumCulled = false;
      for (let i = 0; i < k.n; i++) {
        mesh.setColorAt(i, tmpC.set(k.cols[i % k.cols.length]));
        sweets.push({ mesh, i, kind: k.name, p: new T.Vector3(), v: new T.Vector3(), rot: new T.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6), spin: new T.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6), home: new T.Vector3(), t0: 0, live: false, s: 0 });
      }
      mesh.instanceColor.needsUpdate = true; world.add(mesh); k.mesh = mesh;
    }

    // layout. The hat stands at the world's origin. The camera is placed so the hat is a set width in pixels, the
    // counter top sits on a set line, and a view offset slides the picture sideways without skewing it
    let W = 1, Hh = 1, layout = {};
    const BRIM_W = 2 * hat.userData.brimOut, TAN = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
    function frame() {
      const phone = W < 760;
      const L = opts.layout ? opts.layout(W, Hh) : null;
      layout = L || (phone ? { x: 0.5, counter: 0.88, hatPx: Math.min(W * 0.66, Hh * 0.5) }
        : { x: W < 1100 ? 0.66 : 0.68, counter: 0.91, hatPx: clamp(Hh * 0.5, 280, 600) });
      const vh = BRIM_W * Hh / layout.hatPx, D = vh / (2 * TAN);
      // the counter line, in world y relative to the camera's eye height
      const eye = (layout.counter - 0.5) * vh;
      const tilt = T.MathUtils.degToRad(3);
      camera.position.set(0, eye + Math.sin(tilt) * D, Math.cos(tilt) * D);
      camera.lookAt(0, eye, 0);
      layout.vh = vh; layout.D = D; offsetTo(layout.x);
    }
    let offX = -1;
    function offsetTo(x) {
      if (Math.abs(x - offX) < 1e-4) return; offX = x;
      const shift = (x - 0.5) * W, fullW = W + 2 * Math.abs(shift);
      camera.aspect = fullW / Hh;
      camera.setViewOffset(fullW, Hh, shift > 0 ? 0 : 2 * Math.abs(shift), 0, W, Hh);
      camera.updateProjectionMatrix();
    }

    function resize(w, h) {
      W = Math.max(1, w | 0); Hh = Math.max(1, h | 0); offX = -1;
      renderer.setSize(W, Hh, false); frame(); dirty = true;
    }

    // ---- motion state ----
    const S = {
      t: 0, intro: reduced ? 1 : 0, // 0 to 1 across the intro
      flip: reduced ? 1 : 0, // 0 upright, 1 upside down with its opening to the sky
      rise: 0, riseTarget: 0, // the dessert, 0 inside the hat, 1 floating above it
      dive: 0, // scroll progress into the hat
      px: 0, py: 0, tpx: 0, tpy: 0, // pointer, smoothed
      current: null, pending: null, swapping: false, burstAt: -10,
    };
    let dirty = true, running = false, visible = true, last = 0, rafId = 0;
    const listeners = {};

    function placeDessert(tex, key) {
      const d = DESSERTS[key], a = tex.userData.aspect || 1;
      dessertMat.map = tex; dessertMat.needsUpdate = true;
      dessert.scale.set(d.h * a, d.h, 1); dessert.userData = { h: d.h, ready: true };
      dessert.visible = true;
    }

    // every sweet has a slot on a slow vortex that widens as it rises out of the hat round the dessert
    const GOLD = 2.399963;
    sweets.forEach((s, n) => {
      s.a0 = n * GOLD; s.hf = ((n * 0.618034) % 1); s.jit = Math.random();
      s.s = s.kind === 'sprinkle' ? 1.25 : s.kind === 'gum' ? 0.85 + s.jit * 0.5 : 0.95 + s.jit * 0.35;
    });
    function slot(s, now, out) {
      const top = H + 0.05, dh = (dessert.userData.h || 3) + 0.6;
      const th = s.a0 + (reduced ? 0 : now / 1000 * (Math.PI * 2 / 18) * (0.8 + 0.4 * s.hf));
      const rx = 2.0 + 1.3 * Math.pow(s.hf, 0.8) + 0.3 * s.jit, rz = rx * 0.42;
      out.set(Math.cos(th) * rx, top + 0.25 + s.hf * dh + Math.sin(th * 2 + s.jit * 6) * 0.08, Math.sin(th) * rz + 0.25);
      return out;
    }
    function burst(now) {
      S.burstAt = now;
      sweets.forEach((s, n) => {
        s.live = true; s.t0 = now + (n % 31) * 7;
        s.p.set((Math.random() - 0.5) * 0.9, H + 0.05, (Math.random() - 0.5) * 0.6);
        const a = Math.random() * Math.PI * 2, up = 7 + Math.random() * 5, out = 0.6 + Math.random() * 2.2;
        s.v.set(Math.cos(a) * out, up, Math.sin(a) * out * 0.6);
      });
    }

    function setDessert(key, instant) {
      if (!DESSERTS[key]) return;
      S.pending = key;
      texFor(key).then(tex => {
        if (S.pending !== key) return;
        if (!S.current || instant || reduced) {
          placeDessert(tex, key); S.current = key; S.rise = S.riseTarget = (S.flip >= 1 ? 1 : 0);
          if (reduced || instant) { S.rise = S.riseTarget = 1; settleSweets(); }
          dirty = true; kick(); return;
        }
        // sink the old one into the hat, swap, rise with a burst
        S.swapping = { key, tex, phase: 'sink', t0: performance.now() };
        kick();
      });
    }

    function settleSweets() {
      sweets.forEach(s => { s.live = true; s.t0 = -1e9; slot(s, performance.now(), s.p); s.v.set(0, 0, 0); }); S.burstAt = -1e9;
    }

    // the hat up out of sight and nothing out of it yet, for the first frame behind the shutter
    function hideForIntro() { S.introStart = performance.now() + 1e7; S.flip = 0; S.rise = 0; S.riseTarget = 0; S.dropY = 7; sweets.forEach(s => { s.live = false; }); renderOnce(); }
    function finish() { S.introStart = null; S.flip = 1; S.dropY = 0; S.hop = 0; S.rise = S.riseTarget = 1; settleSweets(); kick(); }
    function playIntro() {
      if (reduced) { S.intro = 1; S.flip = 1; dirty = true; return; }
      S.introStart = performance.now(); S.intro = 0; S.flip = 0; S.rise = 0; S.riseTarget = 0; S.riseT0 = 0; sweets.forEach(s => { s.live = false; }); kick();
    }

    // ---- the per frame update ----
    function update(now, dt) {
      S.t = now;
      // pointer smoothing
      S.px = lerp(S.px, S.tpx, 1 - Math.exp(-dt * 5)); S.py = lerp(S.py, S.tpy, 1 - Math.exp(-dt * 5));
      let busy = Math.abs(S.px - S.tpx) > 0.001 || Math.abs(S.py - S.tpy) > 0.001;

      // the intro. 0 to 700ms the hat drops onto the counter, 700 to 1500 it hops and flips, then the dessert rises
      if (S.introStart != null) {
        const e = now - S.introStart;
        const drop = clamp(e / 760, 0, 1), flipT = clamp((e - 900) / 900, 0, 1);
        S.dropY = (1 - ease.outBounce(drop)) * 7;
        S.flip = ease.inOut(flipT);
        S.hop = Math.sin(Math.PI * flipT) * 1.6;
        if (flipT >= 1 && S.riseTarget === 0) { S.riseTarget = 1; burst(now); }
        if (e > 1900) { S.introStart = null; S.dropY = 0; S.hop = 0; }
        busy = true;
      }

      // a swap of dessert. Sink 360ms, then rise with a burst
      if (S.swapping) {
        const sw = S.swapping, e = now - sw.t0;
        if (sw.phase === 'sink') {
          S.rise = 1 - ease.in(clamp(e / 360, 0, 1)); S.wobble = Math.sin(e / 40) * 0.04 * (1 - clamp(e / 360, 0, 1));
          if (e >= 360) { placeDessert(sw.tex, sw.key); S.current = sw.key; sw.phase = 'rise'; sw.t0 = now; burst(now); S.rise = 0; }
        } else {
          S.rise = ease.outBack(clamp(e / 820, 0, 1)); S.wobble = 0;
          if (e >= 820) { S.swapping = false; S.rise = 1; S.riseTarget = 1; }
        }
        busy = true;
      } else if (S.introStart == null) {
        const r = S.rise; S.rise = lerp(S.rise, S.riseTarget, 1 - Math.exp(-dt * 6));
        if (Math.abs(S.rise - r) > 0.0005) busy = true;
      } else if (S.riseTarget === 1) {
        S.riseT0 = S.riseT0 || now; S.rise = ease.outBack(clamp((now - S.riseT0) / 900, 0, 1));
      }

      // hat pose. Upright to upside down about its own middle, plus the hop and a gentle idle sway
      const flip = S.flip, idle = reduced ? 0 : Math.sin(now / 1400) * 0.03;
      const d = S.dive;
      hat.position.y = -H / 2; // pivot at the hat's middle
      // diving, the opening turns to face you and comes at the camera
      // it ends with the opening square on to the lens, close enough that the lining fills the screen
      const dt1 = ease.inOut(clamp(d * 1.25, 0, 1)), dt2 = ease.in(d);
      const eyeY = camera.position.y - Math.sin(T.MathUtils.degToRad(3)) * (layout.D || 18);
      hatPivot.rotation.set(Math.PI * flip + dt1 * Math.PI / 2 + S.py * 0.05 * (1 - d), (-0.3 + S.px * 0.2 + flip * 0.22) * (1 - dt1), (0.1 * (1 - flip) + idle + (S.wobble || 0)) * (1 - dt1));
      hatPivot.position.set(0, lerp(H / 2 + (S.dropY || 0) + (S.hop || 0), eyeY, dt1), dt2 * ((layout.D || 18) - H / 2 - 2.2));
      offsetTo(lerp(layout.x, 0.5, dt1));
      // its shadow on the counter: wide and soft while it's in the air, tight when it lands, gone as you dive
      const lift = Math.max(0, hatPivot.position.y - H / 2), sw = lerp(3.5, 2.7, flip) * (1 + lift * 0.14);
      hatShadow.scale.set(sw, sw * 0.62, 1); hatShadow.material.opacity = clamp(1 - lift * 0.16, 0.12, 1) * (1 - clamp(d * 2.5, 0, 1));

      // dessert, inside the hat at rise 0, floating above it at 1. It faces the camera and bobs
      if (dessert.userData.ready) {
        const hgt = dessert.userData.h;
        const r = S.rise, bob = reduced ? 0 : Math.sin(now / 900) * 0.07 * clamp(r, 0, 1);
        const s = lerp(0.4, 1, clamp(r, 0, 1.2));
        dessert.scale.y = hgt * s; dessert.scale.x = hgt * s * (dessertMat.map ? dessertMat.map.userData.aspect : 1);
        const topOfHat = H - 0.02 + (S.dropY || 0) + (S.hop || 0);
        // the cut sits at the opening in world space (the world group isn't moved or scaled)
        clip.constant = d > 0.001 ? 1e4 : -(topOfHat - 0.06);
        dessert.position.set(S.px * 0.1, lerp(topOfHat - hgt * s * 0.56, topOfHat + hgt * 0.5 + 0.02, r) + bob, 0.05);
        dessert.rotation.set(-S.py * 0.04, S.px * 0.12, (S.wobble || 0) * 2);
        // as you dive the dessert lifts away above you
        dessert.position.y += ease.in(d) * hgt * 1.6; dessert.position.z += ease.in(d) * 5;
        // during the intro it stays inside the hat until the hat has flipped
        dessert.visible = d < 0.98 && (S.introStart == null || S.riseTarget === 1);
        busy = true;
      }

      // sweets. Ballistic out of the hat, then drawn to their homes, where they hang and turn slowly
      let anyLive = false;
      for (const s of sweets) {
        if (!s.live) { dummy.scale.setScalar(0); dummy.updateMatrix(); s.mesh.setMatrixAt(s.i, dummy.matrix); continue; }
        anyLive = true;
        const age = (now - s.t0) / 1000;
        if (age < 0) { dummy.scale.setScalar(0); }
        else {
          slot(s, now, tgt);
          if (age < 0.55) { s.v.y -= 15 * dt; s.p.addScaledVector(s.v, dt); }
          else { const k = 1 - Math.exp(-dt * (age < 1.6 ? 3.5 : 12)); s.p.lerp(tgt, k); }
          const spinK = age < 0.55 ? 1 : 0.15;
          s.rot.x += s.spin.x * dt * spinK; s.rot.y += s.spin.y * dt * spinK;
          // the vortex parts toward you as you dive into the hat
          const px = s.p.x * (1 + d * 1.6) + S.px * 0.3 * (s.p.z + 1.2);
          dummy.position.set(px, s.p.y + d * 3.5 * s.hf, s.p.z + d * 9 * (0.4 + s.jit));
          dummy.rotation.copy(s.rot); dummy.scale.setScalar(s.s * clamp(age * 5, 0, 1));
        }
        dummy.updateMatrix(); s.mesh.setMatrixAt(s.i, dummy.matrix);
      }
      // upload every frame, so sweets that have just been hidden really disappear
      for (const k of kinds) k.mesh.instanceMatrix.needsUpdate = true;

      return busy || anyLive || !reduced;
    }

    function loop(now) {
      rafId = 0;
      if (!visible) { running = false; return; }
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      // cap at 30 fps on slow devices
      const keep = update(now, dt);
      renderer.render(scene, camera); dirty = false;
      if (keep) rafId = raf(loop); else running = false;
    }
    function kick() { if (!running && visible) { running = true; last = 0; rafId = raf(loop); } }

    function setVisible(v) { visible = !!v; if (visible) kick(); }
    function pointer(nx, ny) { S.tpx = clamp(nx, -1, 1); S.tpy = clamp(ny, -1, 1); kick(); }
    function setDive(p) { S.dive = clamp(p, 0, 1); kick(); }
    function renderOnce() { update(performance.now(), 0); renderer.render(scene, camera); }

    // the screen box of the hat and the dessert, for the page to lay out round it
    const v3 = new T.Vector3();
    function screenOf(obj) {
      const b = new T.Box3().setFromObject(obj); const pts = [];
      for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) { v3.set(x, y, z).project(camera); pts.push(v3.clone()); }
      const xs = pts.map(p => (p.x + 1) / 2 * W), ys = pts.map(p => (1 - p.y) / 2 * Hh);
      return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
    }

    resize(opts.w || canvas.clientWidth || vw, opts.h || canvas.clientHeight || vh);
    // compile every program now, so the intro never stalls on its first frame
    function warm() { return texFor(opts.base || 'waffle').then(() => { if (renderer.compileAsync) return renderer.compileAsync(scene, camera); renderer.compile(scene, camera); }); }
    if (reduced) { S.flip = 1; S.rise = S.riseTarget = 1; }

    return {
      renderer, scene, camera, hat, hatPivot, dessert, state: S,
      resize, setDessert, playIntro, hideForIntro, finish, warm, setVisible, pointer, setDive, renderOnce, kick,
      hatScreen: () => screenOf(hat), dessertScreen: () => dessert.visible ? screenOf(dessert) : null,
      liveCount: () => sweets.filter(x => x.live).length,
      // for the checks: the sweets are ours, not their mark, so the hero share is measured without them
      showSweets: v => { kinds.forEach(k => { k.mesh.visible = !!v; }); kick(); },
      isSettled: () => !S.introStart && !S.swapping && Math.abs(S.rise - S.riseTarget) < 0.01,
      on: (n, f) => { (listeners[n] = listeners[n] || []).push(f); },
    };
  }

  window.CharlieHero = { create, DESSERTS };
})();
