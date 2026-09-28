// Hero. Agenda pages drift in 3D, gather into one pack as you scroll, then press into a tablet
// that shows Qualigraf's own meeting screen. Pages are drawn here, sample council paperwork.
import * as THREE from '../vendor/three.module.min.js';

const cv = document.querySelector('.hero-gl');
const hero = document.querySelector('.s-hero');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOK() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }

if (cv && hero && webglOK()) start();
else if (cv) cv.style.display = 'none';

async function start() {
  try { await document.fonts.ready; } catch (e) {}
  const mobile = innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xF3EEE3, 16, 42);
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  cam.position.set(0, 0, 17);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xefe7d6, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, .9); key.position.set(3, 6, 10); scene.add(key);

  // page textures, six kinds of council paper
  const KINDS = [
    { t: 'Agenda', k: 'Full Council', items: ['1. Apologies', '2. Declarations of interest', '3. Minutes of the last meeting', '4.1 City centre development plan', '4.2 Parking on Main Street', '5. Motions', '6. Questions from the public'], acc: '#FE764A' },
    { t: 'Report to Cabinet', k: 'Item 4.1', items: ['Purpose of the report', 'Recommendations', 'Background', 'Financial implications', 'Legal implications'], acc: '#37BAC5' },
    { t: 'Appendix A', k: 'Item 4.1', items: ['Consultation responses', 'Summary table'], acc: '#F4B63F', table: true },
    { t: 'Minutes', k: 'Planning Committee', items: ['Present', 'Apologies', 'Resolved', 'Vote'], acc: '#7A5D7B' },
    { t: 'Motion', k: 'Full Council', items: ['Proposed by', 'Seconded by', 'This council notes', 'This council resolves'], acc: '#FE764A' },
    { t: 'Forward plan', k: 'Key decisions', items: ['Decision', 'Decision maker', 'Date', 'Documents'], acc: '#37BAC5', table: true },
  ];
  function pageTex(K) {
    const W = 512, H = 724, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    x.fillStyle = '#FCFAF4'; x.fillRect(0, 0, W, H);
    x.fillStyle = K.acc; x.fillRect(0, 0, W, 10);
    x.fillStyle = '#6B6F7A'; x.font = '500 17px Mono, monospace'; x.fillText((K.k + '  ·  Sample council').toUpperCase(), 40, 58);
    x.fillStyle = '#12141B'; x.font = '600 46px Serif, Georgia, serif'; x.fillText(K.t, 40, 118);
    x.fillStyle = 'rgba(18,20,27,.2)'; x.fillRect(40, 140, W - 80, 2);
    let y = 186;
    K.items.forEach((it, i) => {
      x.fillStyle = '#12141B'; x.font = '600 20px Sans, Arial, sans-serif'; x.fillText(it, 40, y); y += 20;
      const n = K.table ? 1 : 2 + (i % 2);
      for (let k = 0; k < n; k++) { x.fillStyle = 'rgba(18,20,27,.12)'; x.fillRect(40, y + 6, (W - 80) * (0.62 + ((i * 7 + k * 13) % 30) / 100), 9); y += 20; }
      if (K.table) { for (let r = 0; r < 3; r++) { x.strokeStyle = 'rgba(18,20,27,.18)'; x.strokeRect(40, y + 6, W - 80, 26); x.fillStyle = 'rgba(18,20,27,.1)'; x.fillRect(52, y + 16, 120, 7); x.fillRect(220, y + 16, 90, 7); y += 26; } }
      y += 22;
    });
    x.fillStyle = K.acc; x.globalAlpha = .35; x.fillRect(40, H - 150, 150, 14); x.globalAlpha = 1;
    x.fillStyle = '#6B6F7A'; x.font = '500 16px Mono, monospace'; x.fillText('PAGE ' + (3 + (K.t.length % 9)), W - 120, H - 36);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4; return tex;
  }

  const N = mobile ? 300 : 620, per = Math.ceil(N / KINDS.length);
  const geo = new THREE.PlaneGeometry(2.1, 2.97);
  const meshes = [], P = [];
  const dummy = new THREE.Object3D();
  KINDS.forEach((K, ki) => {
    const mat = new THREE.MeshStandardMaterial({ map: pageTex(K), side: THREE.DoubleSide, roughness: .92, metalness: 0, transparent: true });
    const m = new THREE.InstancedMesh(geo, mat, per); m.frustumCulled = false; scene.add(m); meshes.push(m);
    for (let i = 0; i < per; i++) {
      const g = ki * per + i, r = (a) => (Math.random() - .5) * a;
      P.push({ m: ki, i, g,
        ax: r(34), ay: r(19), az: -4 - Math.random() * 22,
        rx: r(6.3), ry: r(6.3), rz: r(6.3), sx: r(.6), sy: r(.6), sz: r(.6),
        stackZ: (g / N) * 1.1 - .55, jit: r(.05), jx: r(.06), jy: r(.06),
        delay: (g % 97) / 97 * .35 });
    }
  });

  // the tablet, Qualigraf's own meeting screen
  const tab = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(4.6, 3.3, .16), new THREE.MeshStandardMaterial({ color: 0x15171F, roughness: .35, metalness: .3 }));
  tab.add(body);
  const scrTex = await new Promise(res => new THREE.TextureLoader().load('assets/img/meeting-screen.webp', t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; res(t); }, undefined, () => res(null)));
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(4.36, 3.06), new THREE.MeshBasicMaterial({ map: scrTex, color: scrTex ? 0xffffff : 0xFCFAF4, transparent: true }));
  screen.position.z = .085; tab.add(screen);
  tab.visible = false; scene.add(tab);

  function resize() { const r = cv.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); cam.aspect = r.width / Math.max(1, r.height); cam.fov = cam.aspect < .8 ? 44 : 32; cam.updateProjectionMatrix(); }
  resize(); addEventListener('resize', resize);

  let mx = 0, my = 0; addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const sm = (x, a, b) => { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
  let p = 0, t0 = performance.now();
  const stackX = mobile ? 0 : 2.4, stackY = mobile ? 1.8 : .6;

  function frame(now) {
    const target = RM ? 0 : (window.__heroP || 0);
    p += (target - p) * .12;
    const t = (now - t0) / 1000;
    const gather = p, press = sm(p, .62, .82), turn = sm(p, .8, 1);
    meshes.forEach(m => m.material.opacity = 1 - sm(p, .76, .84));
    for (const q of P) {
      const e = ease(sm(gather, .1 + q.delay * .5, .4 + q.delay * .5));
      const fl = RM ? 0 : Math.sin(t * .6 + q.g) * .25;
      const cx = q.ax + Math.sin(t * .15 + q.g) * .6, cy = q.ay + Math.cos(t * .12 + q.g * .7) * .5 + fl, cz = q.az;
      const sx = stackX + q.jx * (1 - press), sy = stackY + q.jy * (1 - press), sz = q.stackZ * (1 - press * .9);
      dummy.position.set(cx + (sx - cx) * e, cy + (sy - cy) * e, cz + (sz - cz) * e);
      const spin = RM ? 0 : t;
      dummy.rotation.set((q.rx + q.sx * spin) * (1 - e) + (-.18 + my * .1) * e, (q.ry + q.sy * spin) * (1 - e) + (-.35 - mx * .2) * e, (q.rz + q.sz * spin) * (1 - e) + (q.jit - press * Math.PI / 2) * e);
      const s = 1.25 - press * .2;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix(); meshes[q.m].setMatrixAt(q.i, dummy.matrix);
    }
    meshes.forEach(m => m.instanceMatrix.needsUpdate = true);
    tab.visible = press > .55;
    const ts = (mobile ? .72 : 1) * (.85 + .2 * sm(p, .74, .88) + turn * .95);
    tab.scale.set(ts, ts, ts);
    tab.position.set(stackX * (1 - turn), stackY * (1 - turn) + turn * (mobile ? 1.4 : .9), .2 + turn * 1.8);
    tab.rotation.set((-.18 + my * .1) * (1 - turn * .7), (-.35 - mx * .2) * (1 - turn * .8), 0);
    screen.material.opacity = sm(p, .74, .86); body.material.opacity = 1;
    cam.position.x += ((mx * .8) - cam.position.x) * .05; cam.position.y += ((-my * .5) - cam.position.y) * .05; cam.lookAt(0, 0, 0);
    renderer.render(scene, cam);
  }
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { rootMargin: '100px' }).observe(hero);
  function loop(now) { if (visible) frame(now); requestAnimationFrame(loop); }
  if (RM) { frame(performance.now()); addEventListener('resize', () => frame(performance.now())); }
  else requestAnimationFrame(loop);
  cv.dataset.ready = '1';
}
