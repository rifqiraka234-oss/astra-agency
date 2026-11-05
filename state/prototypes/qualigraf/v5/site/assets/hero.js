// Hero. Council papers drift in 3D, gather into one pack as you scroll, and a Qualigraf navy file closes over them,
// labelled with the visitor's own meeting. The papers are drawn here, sample paperwork, never a real council's.
// Built from our own v4 hero (28 Sep), recoloured to Qualigraf's palette, the tablet replaced by the file.
import * as THREE from './vendor/three.module.min.js';
import { subscribe, timeline, longDate } from './state.js';

const cv = document.querySelector('.hero-gl');
const hero = document.querySelector('.hero');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOK() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
if (cv && hero && webglOK()) start(); else if (cv) { cv.style.display = 'none'; document.documentElement.classList.add('no-gl'); }

const INK = '#1B2740', MUTED = '#5A6478', PAPER = '#FFFDF6', CREAM = '#FEFAEB';
const STATION = ['#37BAC5', '#37BAC5', '#FE764A', '#FE764A', '#F4B63F', '#F4B63F', '#7A5D7B', '#2A3C5E'];

async function start() {
  try { await document.fonts.ready; } catch (e) {}
  const mobile = innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xFEFAEB, 16, 42);
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  cam.position.set(0, 0, 17);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xf3e9d2, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, .9); key.position.set(3, 6, 10); scene.add(key);

  // six kinds of council paper, UK sample business
  const KINDS = [
    { t: 'Agenda', k: 'Cabinet', items: ['1. Apologies', '2. Declarations of interest', '3. Minutes of the last meeting', '6. Local Plan update', '7. Parking on the High Street', '8. Questions from the public'], acc: '#FE764A' },
    { t: 'Report to Cabinet', k: 'Item 6', items: ['Purpose of the report', 'Recommendations', 'Background', 'Financial implications', 'Legal implications'], acc: '#37BAC5' },
    { t: 'Appendix A', k: 'Item 6', items: ['Consultation responses', 'Summary table'], acc: '#F4B63F', table: true },
    { t: 'Minutes', k: 'Planning Committee', items: ['Present', 'Apologies', 'Resolved', 'Vote'], acc: '#7A5D7B' },
    { t: 'Motion', k: 'Full Council', items: ['Proposed by', 'Seconded by', 'This council notes', 'This council resolves'], acc: '#FE764A' },
    { t: 'Forward plan', k: 'Key decisions', items: ['Decision', 'Decision maker', 'Date', 'Documents'], acc: '#37BAC5', table: true },
  ];
  function pageTex(K) {
    const W = 512, H = 724, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    x.fillStyle = PAPER; x.fillRect(0, 0, W, H);
    x.fillStyle = K.acc; x.fillRect(0, 0, W, 10);
    x.fillStyle = MUTED; x.font = '500 17px QMono, monospace'; x.fillText((K.k + '  ·  Sample council').toUpperCase(), 40, 58);
    x.fillStyle = INK; x.font = '600 46px QSerif, Georgia, serif'; x.fillText(K.t, 40, 118);
    x.fillStyle = 'rgba(27,39,64,.2)'; x.fillRect(40, 140, W - 80, 2);
    let y = 186;
    K.items.forEach((it, i) => {
      x.fillStyle = INK; x.font = '600 20px QSans, Arial, sans-serif'; x.fillText(it, 40, y); y += 20;
      const n = K.table ? 1 : 2 + (i % 2);
      for (let k = 0; k < n; k++) { x.fillStyle = 'rgba(27,39,64,.12)'; x.fillRect(40, y + 6, (W - 80) * (0.62 + ((i * 7 + k * 13) % 30) / 100), 9); y += 20; }
      if (K.table) { for (let r = 0; r < 3; r++) { x.strokeStyle = 'rgba(27,39,64,.18)'; x.strokeRect(40, y + 6, W - 80, 26); x.fillStyle = 'rgba(27,39,64,.1)'; x.fillRect(52, y + 16, 120, 7); x.fillRect(220, y + 16, 90, 7); y += 26; } }
      y += 22;
    });
    x.fillStyle = K.acc; x.globalAlpha = .35; x.fillRect(40, H - 150, 150, 14); x.globalAlpha = 1;
    x.fillStyle = MUTED; x.font = '500 16px QMono, monospace'; x.fillText('PAGE ' + (3 + (K.t.length % 9)), W - 120, H - 36);
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
      P.push({ m: ki, i, g, ax: r(34), ay: r(19), az: -4 - Math.random() * 22,
        rx: r(6.3), ry: r(6.3), rz: r(6.3), sx: r(.6), sy: r(.6), sz: r(.6),
        stackZ: (g / N) * 1.1 - .55, jit: r(.05), jx: r(.06), jy: r(.06), delay: (g % 97) / 97 * .35 });
    }
  });

  // the file, in the colours of their logo. A back board, the pack, and a cover that closes on a hinge.
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
  function drawLabel(s) {
    const tl = timeline(s), x = lc.getContext('2d'), W = lc.width, H = lc.height;
    x.clearRect(0, 0, W, H);
    x.fillStyle = CREAM; x.fillRect(0, 0, W, H);
    x.fillStyle = '#FE764A'; x.fillRect(0, 0, W, 14);
    x.fillStyle = MUTED; x.font = '500 30px QMono, monospace'; x.fillText('DECISION FILE  ·  SAMPLE COUNCIL', 64, 108);
    x.fillStyle = INK; x.font = '600 104px QSerif, Georgia, serif'; x.fillText(tl.committee.label, 64, 260);
    x.font = '600 52px QSerif, Georgia, serif';
    const d = longDate(tl.meeting).split(' '); x.fillText(d[0], 64, 360); x.fillText(d.slice(1).join(' '), 64, 430);
    x.fillStyle = 'rgba(27,39,64,.25)'; x.fillRect(64, 488, W - 128, 3);
    x.fillStyle = INK; x.font = '600 40px QSans, Arial, sans-serif'; x.fillText(tl.committee.item, 64, 566);
    x.fillStyle = MUTED; x.font = '400 34px QSans, Arial, sans-serif';
    x.fillText('Forward plan to archive, kept in one file', 64, 624);
    // the eight stations, a quiet strip in the station colours
    const y0 = H - 210, gap = (W - 128) / 7;
    x.fillStyle = 'rgba(27,39,64,.18)'; x.fillRect(64, y0 - 2, W - 128, 4);
    STATION.forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.arc(64 + i * gap, y0, 15, 0, Math.PI * 2); x.fill(); });
    x.fillStyle = MUTED; x.font = '500 26px QMono, monospace'; x.fillText('PLAN', 40, y0 + 64); x.fillText('ARCHIVE', W - 180, y0 + 64);
    labelTex.needsUpdate = true;
  }
  subscribe(drawLabel);
  fileG.visible = false; scene.add(fileG);

  function resize() { const r = cv.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); cam.aspect = r.width / Math.max(1, r.height); cam.fov = cam.aspect < .8 ? 44 : 32; cam.updateProjectionMatrix(); }
  resize(); addEventListener('resize', resize);

  let mx = 0, my = 0; addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const sm = (x, a, b) => { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
  let p = 0, last = performance.now(); const t0 = last;
  const stackX = mobile ? 0 : 3.2, stackY = mobile ? 2.0 : .45;

  function frame(now) {
    const target = RM ? 1 : (window.__heroP || 0);
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    p += (target - p) * (1 - Math.exp(-dt * 7));
    const t = (now - t0) / 1000;
    const press = sm(p, .55, .7), arrive = sm(p, .5, .62), close = sm(p, .68, .9);
    const pageOp = 1 - sm(p, .86, .9);
    meshes.forEach(m => { m.material.opacity = pageOp; m.visible = pageOp > .005; });
    if (pageOp > .005) for (const q of P) {
      const e = ease(sm(p, .08 + q.delay * .5, .38 + q.delay * .5));
      const fl = RM ? 0 : Math.sin(t * .6 + q.g) * .25;
      const cx = q.ax + Math.sin(t * .15 + q.g) * .6, cy = q.ay + Math.cos(t * .12 + q.g * .7) * .5 + fl, cz = q.az;
      const sx = stackX + q.jx * (1 - press), sy = stackY + q.jy * (1 - press), sz = q.stackZ * (1 - press * .85);
      dummy.position.set(cx + (sx - cx) * e, cy + (sy - cy) * e, cz + (sz - cz) * e);
      const spin = RM ? 0 : t;
      dummy.rotation.set((q.rx + q.sx * spin) * (1 - e) + (-.12 + my * .1) * e, (q.ry + q.sy * spin) * (1 - e) + (-.28 - mx * .2) * e, (q.rz + q.sz * spin) * (1 - e) + q.jit * (1 - press) * e);
      const s = 1.2 - press * .06;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix(); meshes[q.m].setMatrixAt(q.i, dummy.matrix);
    }
    meshes.forEach(m => m.instanceMatrix.needsUpdate = true);
    fileG.visible = arrive > 0.01;
    [navy, tab.material, label.material].forEach(mt => mt.opacity = arrive);
    hinge.rotation.y = -1.3 * (1 - close);
    const fs = (mobile ? .78 : 1) * (.94 + close * .1);
    fileG.scale.set(fs, fs, fs);
    fileG.position.set(stackX, stackY, close * .6);
    fileG.rotation.set(-.12 + my * .1, -.28 - mx * .2 + close * .16, 0);
    cam.position.x += ((mx * .8) - cam.position.x) * .05; cam.position.y += ((-my * .5) - cam.position.y) * .05; cam.lookAt(0, 0, 0);
    renderer.render(scene, cam);
  }
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { rootMargin: '100px' }).observe(hero);
  function loop(now) { if (visible) frame(now); requestAnimationFrame(loop); }
  if (RM) { p = 1; frame(performance.now()); addEventListener('resize', () => frame(performance.now())); subscribe(() => frame(performance.now())); }
  else requestAnimationFrame(loop);
  cv.dataset.ready = '1';
}
