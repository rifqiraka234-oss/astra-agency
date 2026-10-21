/* The hero is his logo at the size of the screen. Two blue pillars on the edges and the grey band laid between them,
   routed around the two headline blocks, so the words always sit in the H's two open corners. */
(function () {
  var art = document.querySelector('[data-hero-art]');
  if (!art) return;
  var stage = art.parentNode, ha = stage.querySelector('.h-a'), hb = stage.querySelector('.h-b');
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function rects(node, o) {
    var r = document.createRange(); r.selectNodeContents(node);
    return [].slice.call(r.getClientRects()).filter(function (c) { return c.width > 2; })
      .map(function (c) { return { l: c.left - o.left, t: c.top - o.top, r: c.right - o.left, b: c.bottom - o.top }; });
  }
  function curve(x1, x2, k, yTop, yBot, W) {
    var pts = [], n = 90, i;
    for (i = 0; i <= 12; i++) pts.push([W - (W - x1) * i / 12, yTop]);
    for (i = 0; i <= n; i++) {
      var t = i / n, u = 1 - t;
      var cx1 = x1 - (x1 - x2) * k, cx2 = x2 + (x1 - x2) * k;
      pts.push([u * u * u * x1 + 3 * u * u * t * cx1 + 3 * u * t * t * cx2 + t * t * t * x2, u * u * u * yTop + 3 * u * u * t * yTop + 3 * u * t * t * yBot + t * t * t * yBot]);
    }
    for (i = 0; i <= 12; i++) pts.push([x2 - x2 * i / 12, yBot]);
    return pts;
  }
  function clearance(pts, boxes) {
    var m = 1e9;
    boxes.forEach(function (b) {
      pts.forEach(function (p) {
        var dx = Math.max(b.l - p[0], 0, p[0] - b.r), dy = Math.max(b.t - p[1], 0, p[1] - b.b);
        m = Math.min(m, Math.sqrt(dx * dx + dy * dy));
      });
    });
    return m;
  }
  function draw(first) {
    var o = stage.getBoundingClientRect(), W = Math.round(o.width), H = Math.round(o.height);
    if (!W || !H) return;
    var narrow = W < 700;
    var P = narrow ? Math.max(24, W * 0.065) : Math.max(56, Math.min(W * 0.095, 150));
    var B = narrow ? Math.max(50, Math.min(H * 0.075, 66)) : Math.max(86, Math.min(H * 0.16, 160));
    stage.style.setProperty('--pill', P + 'px');
    stage.style.setProperty('--band', B + 'px');
    var gap = Math.max(5, B * 0.06), need = B / 2 + gap + (narrow ? 7 : 22);
    var yTop = B / 2, yBot = H - B / 2;
    hb.style.fontSize = '';
    var best = null;
    for (var shrink = 0; shrink < 8 && !best; shrink++) {
      if (shrink) hb.style.fontSize = (parseFloat(getComputedStyle(hb).fontSize) * 0.93) + 'px';
      var boxes = rects(ha, o).concat(rects(hb, o));
      var lo = narrow ? 0.06 : 0.1, hi = narrow ? 0.94 : 0.861;
      for (var x1f = 0.4; x1f <= hi; x1f += 0.02) {
        for (var x2f = lo; x2f <= x1f - 0.02; x2f += 0.02) {
          for (var k = 0.3; k <= 0.86; k += 0.1) {
            var c = clearance(curve(W * x1f, W * x2f, k, yTop, yBot, W), boxes);
            if (c < need) continue;
            // prefer a centred, generous S, like the mark
            var score = c - Math.abs((x1f + x2f) / 2 - 0.5) * W * 0.6 - Math.abs(k - 0.55) * 40 - Math.abs((x1f - x2f) - (narrow ? 0.6 : 0.22)) * W * 0.5;
            if (!best || score > best.score) best = { x1: W * x1f, x2: W * x2f, k: k, score: score };
          }
        }
      }
    }
    stage.setAttribute('data-fit', best ? Math.round(best.x1) + ',' + Math.round(best.x2) + ',' + best.k.toFixed(2) + ',' + (hb.style.fontSize || 'css') : 'none');
    if (!best) best = { x1: W * 0.6, x2: W * 0.4, k: 0.55 };
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true', focusable: 'false', preserveAspectRatio: 'none' });
    var defs = el('defs', {});
    var gb = el('linearGradient', { id: 'hb', x1: '0', y1: '0', x2: '1', y2: '1' });
    gb.appendChild(el('stop', { offset: '0', 'stop-color': '#074a7c' })); gb.appendChild(el('stop', { offset: '1', 'stop-color': '#0b6aa6' }));
    var gg = el('linearGradient', { id: 'hg', gradientUnits: 'userSpaceOnUse', x1: W, y1: 0, x2: 0, y2: H });
    gg.appendChild(el('stop', { offset: '0', 'stop-color': '#767d83' })); gg.appendChild(el('stop', { offset: '1', 'stop-color': '#adb3b8' }));
    defs.appendChild(gb); defs.appendChild(gg); svg.appendChild(defs);
    var rad = Math.min(22, P * 0.2), slant = P * 0.34, top = narrow ? H * 0.08 : H * 0.1;
    var lp = el('path', { class: 'hp hp-l', fill: 'url(#hb)', d: 'M0 ' + (top + slant + rad) + ' Q0 ' + (top + slant) + ' ' + rad + ' ' + (top + slant - rad * 0.34) + ' L' + P + ' ' + top + ' L' + P + ' ' + yBot + ' L0 ' + yBot + 'Z' });
    var rp = el('path', { class: 'hp hp-r', fill: 'url(#hb)', d: 'M' + (W - P) + ' ' + yTop + ' L' + W + ' ' + yTop + ' L' + W + ' ' + (H + 2) + ' L' + (W - P) + ' ' + (H + 2) + 'Z' });
    var x1 = best.x1, x2 = best.x2, k = best.k;
    var d = 'M' + (W + 4) + ' ' + yTop + ' L' + x1 + ' ' + yTop + ' C' + (x1 - (x1 - x2) * k) + ' ' + yTop + ' ' + (x2 + (x1 - x2) * k) + ' ' + yBot + ' ' + x2 + ' ' + yBot + ' L-4 ' + yBot;
    var halo = el('path', { class: 'hb-halo', d: d, fill: 'none', stroke: '#f3f5f7', 'stroke-width': B + gap * 2 });
    var band = el('path', { class: 'hb-band', d: d, fill: 'none', stroke: 'url(#hg)', 'stroke-width': B });
    svg.appendChild(lp); svg.appendChild(rp); svg.appendChild(halo); svg.appendChild(band);
    art.innerHTML = ''; art.appendChild(svg);
    stage.classList.add('drawn');
    if (first && !reduce) {
      var len = band.getTotalLength();
      [band, halo].forEach(function (p) { p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        svg.classList.add('in');
        [band, halo].forEach(function (p) { p.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.6,0,.2,1) .35s'; p.style.strokeDashoffset = 0; });
      }); });
    } else svg.classList.add('in');
  }
  function go() { draw(true); var t; addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { draw(false); }, 120); }); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  document.addEventListener('sh-lang', function () { draw(false); });
})();

/* The black box. Scroll opens it, draws the cabling, tags every device and brings in the change log. */
(function () {
  var bx = document.querySelector('[data-bx]');
  if (!bx) return;
  var box = bx.querySelector('.bx-box'), tags = [].slice.call(bx.querySelectorAll('.np-tag')), log = bx.querySelector('.bx-log');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function tick() {
    var r = bx.getBoundingClientRect(), span = r.height - innerHeight;
    var p = clamp(-r.top / (span || 1));
    var open = clamp((p - 0.22) / 0.26), edges = clamp((p - 0.36) / 0.2), lg = clamp((p - 0.7) / 0.12);
    if (reduce) { open = p < 0.3 ? 0 : 1; edges = open; lg = p < 0.66 ? 0 : 1; }
    box.style.setProperty('--o', (1 - open).toFixed(3));
    box.style.setProperty('--e', edges.toFixed(3));
    tags.forEach(function (t, i) { t.style.setProperty('--tg', clamp((p - 0.48 - i * 0.025) / 0.08).toFixed(3)); });
    log.style.setProperty('--l', lg.toFixed(3));
    bx.setAttribute('data-s', p < 0.3 ? '0' : p < 0.66 ? '1' : '2');
  }
  if (reduce) { box.style.setProperty('--o', 0); }
  addEventListener('scroll', function () { requestAnimationFrame(tick); }, { passive: true });
  addEventListener('resize', tick);
  tick();
})();
