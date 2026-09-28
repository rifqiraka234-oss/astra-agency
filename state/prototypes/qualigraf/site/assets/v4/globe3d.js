// A real globe. Land as dots (Natural Earth, world atlas 110m), arcs from Dordrecht to where the
// platform runs. Drag to turn it.
import * as THREE from '../vendor/three.module.min.js';

const cv = document.querySelector('[data-globe]');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
function webglOK() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
if (cv && webglOK()) {
  let started = false;
  const io = new IntersectionObserver(es => { if (es[0].isIntersecting && !started) { started = true; start(); } }, { rootMargin: '600px' });
  io.observe(cv);
}

function ll(lon, lat, r) { const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th)); }

async function start() {
  const dots = await fetch('assets/globe-dots.json').then(r => r.json()).catch(() => []);
  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, .1, 100); cam.position.set(0, 0, 14.5);
  const world = new THREE.Group(); scene.add(world);
  const R = 3;
  world.add(new THREE.Mesh(new THREE.SphereGeometry(R * .995, 64, 48), new THREE.MeshBasicMaterial({ color: 0x151823 })));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.08, 64, 48), new THREE.ShaderMaterial({ transparent: true, side: THREE.BackSide, depthWrite: false,
    vertexShader: 'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'varying vec3 vN;void main(){float a=pow(.72-dot(vN,vec3(0,0,1.)),3.);gl_FragColor=vec4(.996,.463,.29,a*.45);}' }));
  scene.add(halo);
  const n = dots.length / 2, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const v = ll(dots[i * 2], dots[i * 2 + 1], R); pos.set([v.x, v.y, v.z], i * 3); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  world.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xE9E2D2, size: .075, sizeAttenuation: true, transparent: true, opacity: 1 })));

  const HOME = [4.67, 51.81];
  const PL = [{ n: 'Dordrecht', p: HOME, c: 0xFE764A }, { n: 'France', p: [2.35, 46.6], c: 0x37BAC5 }, { n: 'Canada', p: [-75.7, 45.42], c: 0x37BAC5 }, { n: 'United Kingdom', p: [-2.18, 53.0], c: 0x37BAC5 }];
  const labels = [];
  PL.forEach(pl => {
    const v = ll(pl.p[0], pl.p[1], R * 1.005);
    const m = new THREE.Mesh(new THREE.SphereGeometry(.07, 16, 12), new THREE.MeshBasicMaterial({ color: pl.c })); m.position.copy(v); world.add(m);
    const ring = new THREE.Mesh(new THREE.RingGeometry(.1, .14, 32), new THREE.MeshBasicMaterial({ color: pl.c, transparent: true, side: THREE.DoubleSide })); ring.position.copy(v); ring.lookAt(v.clone().multiplyScalar(2)); world.add(ring); pl.ring = ring;
    const el = document.createElement('span'); el.className = 'g-lab mono'; el.textContent = pl.n; cv.parentNode.appendChild(el); labels.push({ el, v, pl });
  });
  const arcs = [];
  PL.slice(1).forEach(pl => {
    const a = ll(HOME[0], HOME[1], R), b = ll(pl.p[0], pl.p[1], R);
    const mid = a.clone().add(b).multiplyScalar(.5), dist = a.distanceTo(b); mid.setLength(R + dist * .45);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const g = new THREE.TubeGeometry(curve, 64, .018, 8, false);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0xFE764A })); world.add(m); arcs.push({ g, total: g.index.count });
  });

  world.rotation.set(.55, -.8, 0);
  let rotY = world.rotation.y, rotX = world.rotation.x, vy = RM ? 0 : .0012, drag = null;
  cv.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, ry: rotY, rx: rotX }; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drag) return; rotY = drag.ry + (e.clientX - drag.x) * .008; rotX = Math.max(-.2, Math.min(1.2, drag.rx + (e.clientY - drag.y) * .006)); });
  cv.addEventListener('pointerup', () => drag = null); cv.addEventListener('pointercancel', () => drag = null);

  function resize() { const r = cv.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); cam.aspect = r.width / Math.max(1, r.height); cam.updateProjectionMatrix(); }
  resize(); addEventListener('resize', resize);
  let visible = true; new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(cv);
  const t0 = performance.now(), tmp = new THREE.Vector3();
  function frame(now) {
    const t = (now - t0) / 1000;
    if (!drag) rotY += vy;
    world.rotation.y += (rotY - world.rotation.y) * .12; world.rotation.x += (rotX - world.rotation.x) * .12;
    const k = RM ? 1 : Math.min(1, t / 2.4);
    arcs.forEach(a => a.g.setDrawRange(0, Math.floor(a.total * k / 3) * 3));
    PL.forEach((pl, i) => { const s = 1 + (RM ? 0 : .35 * Math.sin(t * 2.2 + i)); pl.ring.scale.set(s, s, s); pl.ring.material.opacity = RM ? .6 : .6 - .3 * Math.sin(t * 2.2 + i); });
    world.updateMatrixWorld();
    const r = cv.getBoundingClientRect();
    labels.forEach(L => { tmp.copy(L.v).applyMatrix4(world.matrixWorld); const facing = tmp.clone().normalize().dot(cam.position.clone().normalize()) > .15; tmp.project(cam);
      const dy = L.pl.n === 'Dordrecht' ? 14 : L.pl.n === 'France' ? 26 : -26; L.el.style.transform = 'translate(' + ((tmp.x * .5 + .5) * r.width + 10).toFixed(1) + 'px,' + ((-tmp.y * .5 + .5) * r.height + dy).toFixed(1) + 'px)'; L.el.style.opacity = facing ? 1 : 0; });
    renderer.render(scene, cam);
  }
  function loop(now) { if (visible) frame(now); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
  cv.dataset.ready = '1';
}
