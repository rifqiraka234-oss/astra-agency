// The art. Long paper ribbons in Qualigraf's colours drift through deep navy. As the visitor scrolls, they braid into
// one strand, the many papers of a decision becoming one file. Drawn live in WebGL, no image files, no licence questions.
import * as THREE from './vendor/three.module.min.js';

const VS = `
uniform float uT, uMerge, uPh, uAmp, uFreq, uOY, uOZ, uIdx, uN, uTw;
varying float vShade, vSheen, vEdge, vX;
void main() {
  float x = position.x, s = position.y * (1.0 - 0.6 * uMerge);
  float ph = uPh * (1.0 - uMerge);
  float cy = uOY * (1.0 - uMerge) + uAmp * sin(x * uFreq + uT * 0.35 + ph);
  float cz = uOZ * (1.0 - uMerge) + uAmp * 0.7 * cos(x * uFreq * 0.8 + uT * 0.27 + ph * 1.3);
  float ang = 6.2831 * uIdx / uN + x * 1.6 + uT * 0.6;
  cy += uMerge * 0.42 * cos(ang);
  cz += uMerge * 0.42 * sin(ang);
  float a = x * uTw + uT * 0.22 + ph;
  vec3 p = vec3(x, cy + s * cos(a), cz + s * sin(a));
  vec3 n = normalize(vec3(0.0, -sin(a), cos(a)));
  vec3 L = normalize(vec3(0.35, 0.55, 1.0));
  float d = abs(dot(n, L));
  vShade = 0.55 + 0.55 * d;
  vSheen = pow(d, 28.0);
  vEdge = abs(uv.y - 0.5) * 2.0;
  vX = x;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;
const FS = `
uniform vec3 uCol; uniform float uFade;
varying float vShade, vSheen, vEdge, vX;
void main() {
  vec3 c = uCol * vShade + vec3(1.0) * vSheen * 0.55;
  c = mix(c, c * 0.8, smoothstep(0.85, 1.0, vEdge));
  float endFade = smoothstep(9.5, 7.0, abs(vX));
  gl_FragColor = vec4(c, endFade * uFade);
}`;

const hex = h => new THREE.Vector3(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const PALETTE = ['#FE764A', '#37BAC5', '#F4B63F', '#F2EEE6', '#7A5D7B', '#FE764A', '#8FA3C8', '#F2EEE6', '#37BAC5'];

export function mount(canvas, opt = {}) {
  if (!canvas) return null;
  try { const c = document.createElement('canvas'); if (!(c.getContext('webgl2') || c.getContext('webgl'))) throw 0; } catch (e) { canvas.style.display = 'none'; return null; }
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, .1, 100); cam.position.set(0, 0, 14);
  const group = new THREE.Group(); scene.add(group);
  const cols = opt.colors || PALETTE, N = opt.count || cols.length;
  const geo = new THREE.PlaneGeometry(20, opt.width || .62, 420, 1);
  const mats = [];
  for (let i = 0; i < N; i++) {
    const r = (k) => Math.sin(i * 12.9898 + k * 78.233) * .5 + .5;
    const m = new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: FS, transparent: true, side: THREE.DoubleSide, depthWrite: true,
      uniforms: { uT: { value: 0 }, uMerge: { value: 0 }, uPh: { value: r(1) * 6.28 }, uAmp: { value: .9 + r(2) * 1.1 }, uFreq: { value: .32 + r(3) * .22 },
        uOY: { value: (i / (N - 1) - .5) * (opt.spread || 5.2) }, uOZ: { value: (r(4) - .5) * 4 }, uIdx: { value: i }, uN: { value: N }, uTw: { value: .18 + r(5) * .25 },
        uCol: { value: hex(cols[i % cols.length]) }, uFade: { value: 1 } } });
    const mesh = new THREE.Mesh(geo, m); mesh.frustumCulled = false; group.add(mesh); mats.push(m);
  }
  group.rotation.set(opt.rx ?? -.18, opt.ry ?? -.42, opt.rz ?? .22);
  function resize() {
    const r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false);
    cam.aspect = r.width / Math.max(1, r.height); cam.fov = cam.aspect < .8 ? 52 : 30; cam.updateProjectionMatrix();
    const mobile = r.width < 760;
    group.position.set(mobile ? (opt.mx ?? 0) : (opt.x ?? 2.6), mobile ? (opt.my ?? 2.2) : (opt.y ?? .2), 0);
  }
  resize(); addEventListener('resize', resize);
  let mx = 0, my = 0; addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  let merge = 0, visible = true, t0 = performance.now(), last = t0;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { rootMargin: '120px' }).observe(canvas);
  function frame(now) {
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    const target = opt.merge ? opt.merge() : 0;
    merge += (target - merge) * (1 - Math.exp(-dt * 5));
    const t = RM ? 4 : (now - t0) / 1000;
    mats.forEach(m => { m.uniforms.uT.value = t; m.uniforms.uMerge.value = merge; });
    group.rotation.y = (opt.ry ?? -.42) + mx * .12; group.rotation.x = (opt.rx ?? -.18) + my * .08;
    renderer.render(scene, cam);
  }
  function loop(now) { if (visible) frame(now); requestAnimationFrame(loop); }
  if (RM) { frame(performance.now()); addEventListener('scroll', () => frame(performance.now()), { passive: true }); } else requestAnimationFrame(loop);
  canvas.dataset.ready = '1';
  return { frame };
}
