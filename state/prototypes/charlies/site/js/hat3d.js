// Their top hat, built in three.js from the logo's proportions: a felt crown that flares to the top, a gold
// grosgrain band, and a brim that curls up at the sides with a rolled edge. window.CharlieHat.build(THREE, opts)
(function () {
  'use strict';

  // A matcap: the look of a lit sphere painted once into a small texture, so a material shades like it's lit by
  // the shop's lights without an environment map or a heavy shader. kind 'diffuse' (felt, sugar, chocolate) or
  // 'metal' (the gold band), all lit by the same warm key from top left and a cool rim from the right.
  const MC = {};
  function matcap(T, o) {
    const key = JSON.stringify(o); if (MC[key]) return MC[key];
    const N = o.size || 128, c = document.createElement('canvas'); c.width = c.height = N;
    const g = c.getContext('2d'), img = g.createImageData(N, N), d = img.data;
    const lin = h => { const n = parseInt(h.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map(v => Math.pow(v, 2.2)); };
    const base = lin(o.base || '#ffffff'), rimC = lin(o.rim || '#d8c2ff'), sky = lin(o.sky || '#fff3d6'), ground = lin(o.ground || '#3a1d05');
    const L1 = norm([-0.55, 0.62, 0.56]), L2 = norm([0.78, -0.12, 0.42]);
    function norm(v) { const l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const nx = (x + 0.5) / N * 2 - 1, ny = -((y + 0.5) / N * 2 - 1), r2 = nx * nx + ny * ny;
      const nz = Math.sqrt(Math.max(0, 1 - Math.min(1, r2))), n = [nx, ny, nz], i = (y * N + x) * 4;
      const d1 = Math.max(0, dot(n, L1)), d2 = Math.max(0, dot(n, L2));
      const r1 = [2 * dot(n, L1) * n[0] - L1[0], 2 * dot(n, L1) * n[1] - L1[1], 2 * dot(n, L1) * n[2] - L1[2]];
      const s1 = Math.pow(Math.max(0, r1[2]), o.shin || 40) * (o.spec || 0);
      const rr = [2 * dot(n, L2) * n[0] - L2[0], 2 * dot(n, L2) * n[1] - L2[1], 2 * dot(n, L2) * n[2] - L2[2]];
      const s2 = Math.pow(Math.max(0, rr[2]), (o.shin || 40) * 0.6) * (o.spec || 0) * 0.35;
      const rim = Math.pow(1 - nz, o.rimPow || 3) * (o.rimK || 0);
      let col;
      if (o.kind === 'metal') {
        // the reflection of a warm room: bright above a soft horizon, dark below, with the lights as hot spots
        const ry = 2 * nz * ny; const hz = 1 / (1 + Math.exp(-(ry + 0.08) * 9));
        col = [0, 1, 2].map(k => base[k] * (ground[k] * (1 - hz) * 1.4 + sky[k] * hz * 0.95 + 0.06) + (s1 + s2) * 1.1 + rim * rimC[k]);
      } else {
        const lamb = (o.amb == null ? 0.32 : o.amb) + d1 * (o.diff == null ? 0.78 : o.diff) + d2 * 0.22;
        col = [0, 1, 2].map(k => base[k] * lamb + s1 + s2 + rim * rimC[k]);
      }
      for (let k = 0; k < 3; k++) d[i + k] = Math.max(0, Math.min(255, Math.round(Math.pow(Math.max(0, col[k]), 1 / 2.2) * 255)));
      d[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; MC[key] = t; return t;
  }

  // horizontal ribs, the grosgrain of a hat band
  function ribTexture(T) {
    const c = document.createElement('canvas'); c.width = 8; c.height = 256;
    const g = c.getContext('2d');
    for (let y = 0; y < 256; y++) {
      const v = 128 + 90 * Math.sin(y / 256 * Math.PI * 2 * 90);
      g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(0, y, 8, 1);
    }
    const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.LinearSRGBColorSpace;
    return t;
  }

  // the crown's outline, radius by height, base at y 0 (its radius is 1)
  const CROWN_H = 2.05;
  const crownR = y => 1 + 0.105 * Math.pow(y / CROWN_H, 1.35) - 0.018 * Math.sin(Math.PI * y / CROWN_H);

  function crownProfile(T, inset) {
    const pts = [];
    const N = 40;
    for (let i = 0; i <= N; i++) { const y = CROWN_H * i / N; pts.push(new T.Vector2(crownR(y) - inset, y)); }
    // the rounded top edge and the flat top
    const rTop = crownR(CROWN_H) - inset;
    for (let i = 1; i <= 8; i++) {
      const a = (i / 8) * Math.PI / 2;
      pts.push(new T.Vector2(rTop - 0.07 + Math.cos(a) * 0.07, CROWN_H + Math.sin(a) * 0.055));
    }
    return pts;
  }

  // the brim surface, y as a function of angle and distance out: curls up at the sides, dips a touch front and back
  const BRIM_IN = 0.985, BRIM_OUT = 1.62;
  const brimY = (th, t) => {
    const s = Math.cos(th), f = Math.sin(th);
    return t * t * (0.62 * Math.pow(Math.abs(s), 2.2)) - t * t * 0.06 * f * f;
  };

  function brimGeometry(T) {
    const NT = 160, NR = 18, TH = 0.045;
    const pos = [], nor = [], uv = [], idx = [];
    // top surface then bottom surface
    for (let side = 0; side < 2; side++) {
      const base = pos.length / 3;
      for (let j = 0; j <= NR; j++) {
        const t = j / NR, r = BRIM_IN + (BRIM_OUT - BRIM_IN) * t;
        for (let i = 0; i <= NT; i++) {
          const th = i / NT * Math.PI * 2;
          const y = brimY(th, t) - (side ? TH : 0);
          pos.push(Math.cos(th) * r, y, Math.sin(th) * r);
          nor.push(0, side ? -1 : 1, 0); uv.push(i / NT * 6, t);
        }
      }
      for (let j = 0; j < NR; j++) for (let i = 0; i < NT; i++) {
        const a = base + j * (NT + 1) + i, b = a + NT + 1;
        if (side) idx.push(a, a + 1, b, b, a + 1, b + 1); else idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
    g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return g;
  }

  function brimEdge(T) {
    const pts = [];
    for (let i = 0; i < 200; i++) {
      const th = i / 200 * Math.PI * 2, r = BRIM_OUT + 0.012;
      pts.push(new T.Vector3(Math.cos(th) * r, brimY(th, 1) - 0.012, Math.sin(th) * r));
    }
    return new T.TubeGeometry(new T.CatmullRomCurve3(pts, true, 'centripetal'), 400, 0.05, 14, true);
  }

  function build(T, opts) {
    opts = opts || {};
    const rib = ribTexture(T); rib.repeat.set(1, 1);

    // felt: lit by the scene's lights (a cheap diffuse shader), with the lilac sheen felt has at grazing angles
    const feltMat = new T.MeshLambertMaterial({ color: new T.Color(opts.color || '#5F3F90') });
    feltMat.onBeforeCompile = function (sh) {
      sh.fragmentShader = sh.fragmentShader.replace('#include <dithering_fragment>',
        'float fr = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);\n' +
        'gl_FragColor.rgb += vec3(0.62, 0.48, 0.86) * fr * 0.34;\n#include <dithering_fragment>');
    };
    const liningMat = new T.MeshMatcapMaterial({ matcap: matcap(T, { base: '#2a0f45', amb: 0.4, diff: 0.4, rimK: 0.05 }), side: T.DoubleSide });
    const goldMat = new T.MeshMatcapMaterial({ matcap: matcap(T, { kind: 'metal', base: '#F0B962', sky: '#fff1cf', ground: '#4a2507', spec: 1.3, shin: 70, rim: '#ffe3a6', rimK: 0.25 }), bumpMap: rib, bumpScale: 0.4 });

    const hat = new T.Group(); hat.name = 'hat';

    const crown = new T.Mesh(new T.LatheGeometry(crownProfile(T, 0), 128), feltMat);
    // the flat top as its own disc, so its normals are clean (a lathe's pole shades as a starburst)
    const topR = crownR(CROWN_H) - 0.07;
    const capGeo = new T.CylinderGeometry(topR + 0.002, topR + 0.002, 0.002, 128, 1, false);
    const cap = new T.Mesh(capGeo, feltMat); cap.position.y = CROWN_H + 0.054; cap.castShadow = true; hat.add(cap);
    crown.castShadow = true; crown.receiveShadow = true; hat.add(crown);

    // the lining, seen when the hat is upside down with its opening to the sky
    const liningPts = crownProfile(T, 0.035).reverse();
    const lining = new T.Mesh(new T.LatheGeometry(liningPts, 96), liningMat); hat.add(lining);
    // the far end of the lining, deep inside the crown
    const liningCap = new T.Mesh(new T.CylinderGeometry(crownR(CROWN_H) - 0.04, crownR(CROWN_H) - 0.04, 0.004, 96), new T.MeshBasicMaterial({ color: '#12031f' }));
    liningCap.position.y = CROWN_H - 0.01; hat.add(liningCap);

    // the band, a ribbon a hair proud of the crown with soft edges
    const bandPts = [];
    const B0 = 0.05, B1 = 0.46;
    for (let i = 0; i <= 24; i++) {
      const y = B0 + (B1 - B0) * i / 24;
      const edge = Math.min(1, Math.min(i, 24 - i) / 3);
      bandPts.push(new T.Vector2(crownR(y) + 0.006 + 0.016 * Math.sqrt(edge), y));
    }
    const band = new T.Mesh(new T.LatheGeometry(bandPts, 128), goldMat);
    band.castShadow = true; hat.add(band);
    // the bow where the band ties, on the left as the logo sits
    const bowGeo = new T.SphereGeometry(0.16, 24, 16); bowGeo.scale(0.55, 1.0, 0.45);
    const bow = new T.Mesh(bowGeo, goldMat);
    bow.position.set(-crownR(0.26) - 0.02, 0.26, 0.12); hat.add(bow);

    const brim = new T.Mesh(brimGeometry(T), feltMat); brim.castShadow = true; brim.receiveShadow = true; hat.add(brim);
    const edge = new T.Mesh(brimEdge(T), feltMat); edge.castShadow = true; hat.add(edge);

    hat.userData = { crown, band, brim, lining, feltMat, goldMat, liningMat, height: CROWN_H + 0.07, crownR, brimOut: BRIM_OUT };
    return hat;
  }

  window.CharlieHat = { build, CROWN_H, crownR, matcap };
})();
