// Hero. Council papers drift in 3D, gather into one pack as you scroll, and a Qualigraf navy file closes over them,
// labelled with the visitor's own meeting. Papers are drawn here in the page's language, sample paperwork only.
// From our own v4 and v5 heroes. On the entry page the papers only drift.
import * as THREE from './vendor/three.module.min.js';
import { subscribe, tokens, fill } from './state.js';

const P = window.PAGE || {};
const cv = document.querySelector('.hero-gl'), hero = document.querySelector('.hero');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ENTRY = P.mode === 'entry';
function webglOK() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
if (cv && hero && webglOK()) start(); else { if (cv) cv.style.display = 'none'; document.documentElement.classList.add('no-gl'); }

const INK = '#1B2740', MUTED = '#5A6478', PAPER = '#FFFFFF';

async function start() {
  try { await document.fonts.ready; } catch (e) {}
  const mobile = innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xFFFFFF, 18, 40);
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  cam.position.set(0, 0, 17);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe9ecf2, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, .9); key.position.set(3, 6, 10); scene.add(key);

  const KINDS = P.papers || [];
  const sample = P.sample || 'Sample council';
  function pageTex(K) {
    const W = 512, H = 724, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    x.fillStyle = PAPER; x.fillRect(0, 0, W, H);
    x.fillStyle = K.acc; x.fillRect(0, 0, W, 12);
    x.fillStyle = MUTED; x.font = '500 18px QSans, Arial, sans-serif'; x.fillText(`${K.k}, ${sample}`, 40, 60);
    x.fillStyle = INK; x.font = '700 44px QHead, Arial, sans-serif'; x.fillText(K.t, 40, 120);
    let y = 182;
    K.items.forEach((it, i) => {
      x.fillStyle = INK; x.font = '600 20px QSans, Arial, sans-serif'; x.fillText(it, 40, y); y += 20;
      const n = K.table ? 1 : 2 + (i % 2);
      for (let k = 0; k < n; k++) { x.fillStyle = '#DCE1EA'; x.fillRect(40, y + 6, (W - 80) * (0.62 + ((i * 7 + k * 13) % 30) / 100), 9); y += 20; }
      if (K.table) { for (let r = 0; r < 3; r++) { x.fillStyle = '#E8ECF2'; x.fillRect(40, y + 6, W - 80, 24); x.fillStyle = '#C9D0DC'; x.fillRect(52, y + 15, 120, 7); x.fillRect(220, y + 15, 90, 7); y += 28; } }
      y += 22;
    });
    x.fillStyle = K.acc; x.fillRect(40, H - 150, 150, 14);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4; return tex;
  }

  const N = ENTRY ? (mobile ? 60 : 130) : (mobile ? 90 : 190), per = Math.ceil(N / Math.max(1, KINDS.length));
  const geo = new THREE.PlaneGeometry(2.1, 2.97);
  const meshes = [], PS = [];
  const dummy = new THREE.Object3D();
  KINDS.forEach((K, ki) => {
    const mat = new THREE.MeshStandardMaterial({ map: pageTex(K), side: THREE.DoubleSide, roughness: .92, metalness: 0, transparent: true });
    const m = new THREE.InstancedMesh(geo, mat, per); m.frustumCulled = false; scene.add(m); meshes.push(m);
    for (let i = 0; i < per; i++) {
      const g = ki * per + i, r = (a) => (Math.random() - .5) * a;
      // calm behind the words. Papers on the copy side sit further back, so they read small and pale
      let ax = r(34), ay = r(19), az = -6 - Math.random() * 20;
      if (!mobile && ax < 3) az -= 10 + Math.random() * 8;
      if (mobile) az -= 6;
      PS.push({ m: ki, i, g, ax, ay, az, rx: r(6.3), ry: r(6.3), rz: r(6.3), sx: r(.6), sy: r(.6), sz: r(.6),
        stackZ: (g / N) * 1.1 - .55, jit: r(.05), jx: r(.06), jy: r(.06), delay: (g % 97) / 97 * .35 });
    }
  });

  // the file, in the colours of their logo
  const FW = 2.95, FH = 4.0;
  const fileG = new THREE.Group();
  const navy = new THREE.MeshStandardMaterial({ color: 0x2A3C5E, roughness: .62, metalness: .05, transparent: true });
  const backBoard = new THREE.Mesh(new THREE.BoxGeometry(FW, FH, .05), navy); backBoard.position.z = -.75; fileG.add(backBoard);
  const tab = new THREE.Mesh(new THREE.BoxGeometry(.95, .34, .05), new THREE.MeshStandardMaterial({ color: 0xFE764A, roughness: .6, transparent: true }));
  tab.position.set(-FW / 2 + .72, FH / 2 + .14, -.75); fileG.add(tab);
  const hinge = new THREE.Group(); hinge.position.set(-FW / 2, 0, .1); fileG.add(hinge);
  const cover = new THREE.Mesh(new THREE.BoxGeometry(FW, FH, .05), navy); cover.position.set(FW / 2, 0, 0); hinge.add(cover);
  const lc = document.createElement('canvas'); lc.width = 900; lc.height = 1160;
  const labelTex = new THREE.CanvasTexture(lc); labelTex.colorSpace = THREE.SRGBColorSpace; labelTex.anisotropy = 8;
  const label = new THREE.Mesh(new THREE.PlaneGeometry(FW * .78, FW * .78 * 1160 / 900), new THREE.MeshBasicMaterial({ map: labelTex, transparent: true }));
  label.position.set(FW / 2, .1, .03); hinge.add(label);
  function wrap(x, text, maxW) { const words = text.split(' '), lines = []; let l = ''; words.forEach(w => { const t = l ? l + ' ' + w : w; if (x.measureText(t).width > maxW && l) { lines.push(l); l = w; } else l = t; }); if (l) lines.push(l); return lines; }
  function drawLabel(s) {
    const t = tokens(s), x = lc.getContext('2d'), W = lc.width, H = lc.height;
    x.clearRect(0, 0, W, H); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#FE764A'; x.fillRect(0, 0, W, 16);
    x.fillStyle = MUTED; x.font = '500 34px QSans, Arial, sans-serif'; x.fillText(sample, 64, 110);
    x.fillStyle = INK; x.font = '700 92px QHead, Arial, sans-serif';
    let y = 230; wrap(x, fill('{committee}', t), W - 128).forEach(l => { x.fillText(l, 64, y); y += 96; });
    x.font = '600 50px QHead, Arial, sans-serif'; wrap(x, t.meeting, W - 128).forEach(l => { x.fillText(l, 64, y + 10); y += 62; });
    x.fillStyle = INK; x.font = '600 38px QSans, Arial, sans-serif'; y += 70;
    wrap(x, t.item || '', W - 128).forEach(l => { x.fillText(l, 64, y); y += 48; });
    x.fillStyle = MUTED; x.font = '400 32px QSans, Arial, sans-serif';
    wrap(x, P.fileFoot || '', W - 128).forEach(l => { x.fillText(l, 64, H - 120); });
    labelTex.needsUpdate = true;
  }
  if (!ENTRY) subscribe(drawLabel);
  fileG.visible = false; if (!ENTRY) scene.add(fileG);

  function resize() { const r = cv.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); cam.aspect = r.width / Math.max(1, r.height); cam.fov = cam.aspect < .8 ? 44 : 32; cam.updateProjectionMatrix(); }
  resize(); addEventListener('resize', resize);
  let mx = 0, my = 0; addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const sm = (x, a, b) => { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
  let p = 0, last = performance.now(); const t0 = last;
  const stackX = mobile ? 0 : 3.2, stackY = mobile ? 2.0 : .45;

  function frame(now) {
    const target = ENTRY ? 0 : (RM ? 1 : (window.__heroP || 0));
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    p += (target - p) * (1 - Math.exp(-dt * 7));
    const t = (now - t0) / 1000;
    const press = sm(p, .55, .7), arrive = sm(p, .5, .62), close = sm(p, .68, .9);
    const pageOp = 1 - sm(p, .86, .9);
    meshes.forEach(m => { m.material.opacity = pageOp; m.visible = pageOp > .005; });
    if (pageOp > .005) for (const q of PS) {
      const e = ease(sm(p, .08 + q.delay * .5, .38 + q.delay * .5));
      const fl = RM ? 0 : Math.sin(t * .6 + q.g) * .25;
      const cx = q.ax + Math.sin(t * .15 + q.g) * .6, cy = q.ay + Math.cos(t * .12 + q.g * .7) * .5 + fl, cz = q.az;
      const sx = stackX + q.jx * (1 - press), sy = stackY + q.jy * (1 - press), sz = q.stackZ * (1 - press * .85);
      dummy.position.set(cx + (sx - cx) * e, cy + (sy - cy) * e, cz + (sz - cz) * e);
      const spin = RM ? 0 : t;
      dummy.rotation.set((q.rx + q.sx * spin) * (1 - e) + (-.12 + my * .1) * e, (q.ry + q.sy * spin) * (1 - e) + (-.28 - mx * .2) * e, (q.rz + q.sz * spin) * (1 - e) + q.jit * (1 - press) * e);
      const s = 1.2 - press * .06; dummy.scale.set(s, s, s);
      dummy.updateMatrix(); meshes[q.m].setMatrixAt(q.i, dummy.matrix);
    }
    meshes.forEach(m => m.instanceMatrix.needsUpdate = true);
    if (!ENTRY) {
      fileG.visible = arrive > 0.01;
      [navy, tab.material, label.material].forEach(mt => mt.opacity = arrive);
      hinge.rotation.y = -1.3 * (1 - close);
      const fs = (mobile ? .78 : 1) * (.94 + close * .1); fileG.scale.set(fs, fs, fs);
      fileG.position.set(stackX, stackY, close * .6);
      fileG.rotation.set(-.12 + my * .1, -.28 - mx * .2 + close * .16, 0);
    }
    cam.position.x += ((mx * .8) - cam.position.x) * .05; cam.position.y += ((-my * .5) - cam.position.y) * .05; cam.lookAt(0, 0, 0);
    renderer.render(scene, cam);
  }
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { rootMargin: '100px' }).observe(hero);
  function loop(now) { if (visible) frame(now); requestAnimationFrame(loop); }
  if (RM) { p = ENTRY ? 0 : 1; frame(performance.now()); addEventListener('resize', () => frame(performance.now())); if (!ENTRY) subscribe(() => frame(performance.now())); }
  else requestAnimationFrame(loop);
  cv.dataset.ready = '1';
}
