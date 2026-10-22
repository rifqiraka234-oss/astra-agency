/* The hero. His logo drawn as a network of nodes in the dark, and the visitor's pointer is a torch that lights it up.
   Device labels only appear where the light falls. They name the example office used across the site. On touch screens
   and when the pointer rests, the torch drifts on its own. Under reduced motion it stands still over the logo. */
(function () {
  var box = document.querySelector('[data-torch]');
  if (!box) return;
  var cv = box.querySelector('canvas'), cx = cv.getContext('2d');
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, R = 200, logo = [], amb = [], tags = [], born = 0, visible = true, raf = 0;
  var torch = { x: 0, y: 0, tx: 0, ty: 0 }, centre = { x: 0, y: 0, w: 0 }, lastMove = -1e9;
  var LAB = {
    de: ['Switch · 24 Ports', 'Firewall · geprüft 14.10.', 'Backup · 22.00 ✓', 'Access Point · Großraum', 'NAS · Technikraum', 'Drucker · Empfang', 'Arbeitsplatz 7', 'Cloud · Rechte je Team'],
    en: ['Switch · 24 ports', 'Firewall · checked 14 Oct', 'Backup · 22.00 ✓', 'Access point · open office', 'NAS · tech room', 'Printer · reception', 'Workstation 7', 'Cloud · access per team']
  };
  var img = new Image();
  img.onload = build;
  img.src = '/assets/mark.svg';

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function build() {
    var r = box.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    cv.width = W * DPR; cv.height = H * DPR;
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var narrow = W < 860;
    // place the logo in the space the words leave free, measured, so it never sits under the text in either language
    var lang = root.lang === 'en' ? '.l-en' : '.l-de', rects = [];
    [].forEach.call(document.querySelectorAll('.hero-t .lbl, .hero-t h1, .hero-t .lede, .hero-ctas'), function (el) {
      var parts = el.querySelectorAll(lang);
      [].forEach.call(parts.length ? parts : [el], function (x) { var c = x.getBoundingClientRect(); if (c.width) rects.push(c); });
    });
    var top0 = r.top, textRight = 0, textTop = H;
    rects.forEach(function (c) { textRight = Math.max(textRight, c.right - r.left); textTop = Math.min(textTop, c.top - top0); });
    var lw, lh;
    if (!narrow) {
      var free = W - textRight - Math.max(48, W * 0.045) - 56;
      lw = Math.min(free, H * 0.6 * 1.11, 540);
      if (lw >= 220) {
        lh = lw * 160 / 178;
        centre = { x: textRight + 56 + free / 2 + 0, y: Math.max(lh / 2 + 96, Math.min(H * 0.48, H - lh / 2 - 60)), w: lw };
      } else narrow = true;
    }
    if (narrow) {
      var room = textTop - 24 - 84;
      lw = Math.max(120, Math.min(W * 0.5, 240, room * 178 / 160));
      lh = lw * 160 / 178;
      centre = { x: W - Math.max(24, W * 0.06) - lw / 2, y: 84 + Math.min(room, lh) / 2, w: lw };
      if (W < 600) centre.x = W / 2;
    }
    R = narrow ? W * 0.42 : Math.min(W, H) * 0.3;

    // sample the mark into nodes, blue where the pillars are, steel where the band is
    var step = narrow ? 6 : Math.max(6, Math.round(lw / 62));
    var off = document.createElement('canvas'); off.width = Math.round(lw); off.height = Math.round(lh);
    var o = off.getContext('2d'); o.drawImage(img, 0, 0, off.width, off.height);
    var data = o.getImageData(0, 0, off.width, off.height).data;
    logo = [];
    for (var y = 0; y < off.height; y += step) {
      for (var x = 0; x < off.width; x += step) {
        var i = (y * off.width + x) * 4;
        if (data[i + 3] < 140) continue;
        var blue = data[i + 2] - data[i] > 35;
        var hx = centre.x - lw / 2 + x, hy = centre.y - lh / 2 + y;
        logo.push({ hx: hx, hy: hy, x: reduce ? hx : rnd(0, W), y: reduce ? hy : rnd(H * 0.2, H * 1.1), blue: blue, d: rnd(0, 0.5), ph: rnd(0, 6.28), s: rnd(0.9, 1.6) });
      }
    }
    // the rest of the network, scattered and drifting slowly
    var n = narrow ? 46 : 96;
    amb = [];
    for (var k = 0; k < n; k++) amb.push({ x: rnd(0, W), y: rnd(0, H), vx: rnd(-0.12, 0.12), vy: rnd(-0.1, 0.1), s: rnd(1, 2.2) });
    // eight labelled devices on a ring around the logo
    tags = [];
    var angs = narrow ? [-2.6, -0.5, 0.3, 2.5, -1.6, 1.4, 3.6, -3.4] : [-2.5, -1.2, -0.3, 0.55, 1.4, 2.25, 3.05, -1.85];
    for (var t = 0; t < 8; t++) {
      var rad = lw * (narrow ? 0.66 : 0.86) * (t % 2 ? 1.1 : 0.95);
      var tx = centre.x + Math.cos(angs[t]) * rad, ty = centre.y + Math.sin(angs[t]) * rad * 0.82;
      tx = Math.max(24, Math.min(W - 24, tx)); ty = Math.max(narrow ? 84 : 110, Math.min(H - 40, ty));
      tags.push({ x: tx, y: ty, i: t });
      amb.push({ x: tx, y: ty, vx: 0, vy: 0, s: 2.4, tag: t });
    }
    torch.x = torch.tx = centre.x - lw * 0.15; torch.y = torch.ty = centre.y - lh * 0.1;
    box.setAttribute('data-logo', [Math.round(centre.x - lw / 2), Math.round(centre.y - lh / 2), Math.round(lw), Math.round(lh)].join(','));
    born = performance.now();
    if (reduce) frame(born); else if (!raf) raf = requestAnimationFrame(frame);
  }

  function light(x, y) {
    var dx = x - torch.x, dy = y - torch.y, d = Math.sqrt(dx * dx + dy * dy);
    var l = Math.max(0, 1 - d / R);
    return l * l * (3 - 2 * l);
  }

  function frame(now) {
    raf = 0;
    var t = (now - born) / 1000;
    // the torch drifts by itself on touch, before the first move and after a rest
    if (!reduce && (!fine || now - lastMove > 2600)) {
      torch.tx = centre.x + Math.sin(t * 0.33) * centre.w * 0.55;
      torch.ty = centre.y + Math.sin(t * 0.51 + 1.2) * centre.w * 0.42;
    }
    torch.x += (torch.tx - torch.x) * (reduce ? 1 : 0.09);
    torch.y += (torch.ty - torch.y) * (reduce ? 1 : 0.09);

    cx.clearRect(0, 0, W, H);
    // the light itself
    var g = cx.createRadialGradient(torch.x, torch.y, 0, torch.x, torch.y, R * 1.35);
    g.addColorStop(0, 'rgba(143,211,255,0.10)'); g.addColorStop(0.45, 'rgba(26,143,224,0.07)'); g.addColorStop(1, 'rgba(26,143,224,0)');
    cx.fillStyle = g; cx.fillRect(0, 0, W, H);

    // the scattered network and its links
    var i, j, a, b;
    for (i = 0; i < amb.length; i++) {
      a = amb[i];
      if (!reduce && a.tag === undefined) { a.x += a.vx; a.y += a.vy; if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20; if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20; }
      a.l = light(a.x, a.y);
    }
    cx.lineWidth = 1;
    for (i = 0; i < amb.length; i++) {
      a = amb[i];
      for (j = i + 1; j < amb.length; j++) {
        b = amb[j];
        var dx = a.x - b.x, dy = a.y - b.y, dd = dx * dx + dy * dy;
        if (dd > 150 * 150) continue;
        var k = 1 - Math.sqrt(dd) / 150, lit = Math.max(a.l, b.l);
        var al = k * (0.05 + lit * 0.5);
        if (al < 0.012) continue;
        cx.strokeStyle = 'rgba(143,211,255,' + al.toFixed(3) + ')';
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      }
    }
    for (i = 0; i < amb.length; i++) {
      a = amb[i];
      cx.fillStyle = 'rgba(182,196,211,' + (0.16 + a.l * 0.8).toFixed(3) + ')';
      cx.beginPath(); cx.arc(a.x, a.y, a.s * (1 + a.l * 0.6), 0, 6.283); cx.fill();
    }

    // his mark, node by node
    var settle = reduce ? 1 : Math.min(1, t / 2.2);
    for (i = 0; i < logo.length; i++) {
      var p = logo[i];
      if (!reduce) {
        var e = Math.min(1, Math.max(0, (t - p.d) / 1.5)); e = 1 - Math.pow(1 - e, 3);
        var wob = settle >= 1 ? Math.sin(t * 1.1 + p.ph) * 0.8 : 0;
        p.x += (p.hx + wob - p.x) * (0.06 + e * 0.2);
        p.y += (p.hy + Math.cos(t * 0.9 + p.ph) * (settle >= 1 ? 0.8 : 0) - p.y) * (0.06 + e * 0.2);
      }
      var l = light(p.x, p.y);
      var base = 0.32 + 0.1 * settle;
      var alpha = Math.min(1, base + l * 0.85);
      cx.fillStyle = p.blue ? 'rgba(' + Math.round(26 + l * 80) + ',' + Math.round(110 + l * 90) + ',' + Math.round(190 + l * 65) + ',' + alpha.toFixed(3) + ')'
                            : 'rgba(' + Math.round(150 + l * 80) + ',' + Math.round(158 + l * 75) + ',' + Math.round(166 + l * 70) + ',' + alpha.toFixed(3) + ')';
      cx.beginPath(); cx.arc(p.x, p.y, p.s * (1 + l * 0.7), 0, 6.283); cx.fill();
    }

    // labels where the light falls
    var lang = root.lang === 'en' ? 'en' : 'de';
    cx.font = '500 11.5px "Geist Mono", ui-monospace, monospace';
    cx.textBaseline = 'middle';
    for (i = 0; i < tags.length; i++) {
      var tg = tags[i], tl = light(tg.x, tg.y);
      if (tl < 0.04) continue;
      var txt = LAB[lang][tg.i].toUpperCase(), w = cx.measureText(txt).width;
      var bx = tg.x + 10 + w + 18 > W - 8 ? tg.x - 10 - w - 18 : tg.x + 10;
      cx.fillStyle = 'rgba(6,12,24,' + (0.9 * tl).toFixed(3) + ')';
      roundRect(bx, tg.y - 12, w + 18, 24, 7); cx.fill();
      cx.strokeStyle = 'rgba(143,211,255,' + (0.35 * tl).toFixed(3) + ')'; cx.stroke();
      cx.fillStyle = 'rgba(223,235,246,' + tl.toFixed(3) + ')';
      cx.fillText(txt, bx + 9, tg.y + 0.5);
      cx.fillStyle = 'rgba(61,220,151,' + tl.toFixed(3) + ')';
      cx.beginPath(); cx.arc(tg.x, tg.y, 3.2, 0, 6.283); cx.fill();
    }
    if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
  }

  function roundRect(x, y, w, h, r) {
    cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r);
    cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath();
  }

  addEventListener('pointermove', function (e) {
    if (!visible || e.pointerType !== 'mouse') return;
    var r = cv.getBoundingClientRect();
    torch.tx = e.clientX - r.left; torch.ty = e.clientY - r.top;
    lastMove = performance.now();
    if (reduce) { torch.x = torch.tx; torch.y = torch.ty; frame(performance.now()); }
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !reduce && !raf && W) raf = requestAnimationFrame(frame);
    }).observe(box);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden && visible && !reduce && !raf && W) raf = requestAnimationFrame(frame); });
  document.addEventListener('sh-lang', function () { if (img.complete && W) build(); });
  var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { var r = box.getBoundingClientRect(); if (img.complete && (Math.round(r.width) !== W || Math.abs(Math.round(r.height) - H) > 140)) build(); }, 160); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (img.complete && W) build(); });
})();
