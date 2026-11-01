(function () {
  'use strict';
  var doc = document.documentElement;
  var RM = doc.classList.contains('rm');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var seg = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ---------- the one state, and what it earns ---------- */
  // Every default is in research/calculator.md with its source. All of it is an estimate and the page says so.
  var RENT = 60, BUY = 350;
  var TYPES = {
    cottage: { units: 1, stays: 2.5, share: .2, price: 40, why: 'One cottage at about 2.5 stays a month, one group in five playing at £40. Renting pays where one box is shared.' },
    cottages: { units: 3, stays: 2.5, share: .2, price: 40, why: 'Three cottages sharing one box, about 2.5 stays each a month, one group in five playing at £40.' },
    lodges: { units: 10, stays: 2.5, share: .2, price: 40, why: 'Ten lodges sharing one box, about 2.5 stays each a month, one group in five playing at £40.' },
    pods: { units: 4, stays: 6.7, share: .1, price: 40, why: 'Four pods sharing one box, about 6.7 short stays each a month, one group in ten playing at £40.' },
    teams: { team: true, why: 'No screens, no staff needed to run it. Pit team against team, then book a 15 minute call to plan the day.' }
  };
  var state = { run: 'lodges' };
  var money = function (n) { return '£' + Math.round(n).toLocaleString('en-GB'); };
  function render() {
    var t = TYPES[state.run], big, unit;
    if (t.team) { big = '6'; unit = 'players a team,<br>60 to 90 minutes'; }
    else {
      var month = t.units * t.stays * t.share * t.price, net = month - RENT;
      if (net > 0.5) { big = money(net); unit = 'a month to you,<br>after the £60 rent'; }
      else { var m = Math.ceil(BUY / month); big = m + ' months'; unit = 'to pay off a £350 box,<br>then about ' + money(month) + ' a month'; }
    }
    $('[data-o="big"]').textContent = big;
    $('[data-o="unit"]').innerHTML = unit;
    $('[data-o="why"]').textContent = t.why;
    var cta = $('[data-hero-cta]');
    if (cta) { cta.textContent = t.team ? 'Book a 15 minute call' : 'Order a box'; cta.setAttribute('href', t.team ? '#call' : '#order'); }
  }

  /* ---------- what do you run, the drum ---------- */
  var drumIn = $('[data-drum-in]');
  function placeDrum() {
    var radios = $$('input', drumIn), i = radios.findIndex(function (r) { return r.checked; });
    var lab = $('label', drumIn), h = lab ? lab.getBoundingClientRect().height : 44;
    drumIn.style.transform = 'translateY(' + (-(i * h) - h / 2) + 'px)';
    $$('label', drumIn).forEach(function (l, k) { var d = Math.abs(k - i); l.style.opacity = d === 0 ? 1 : d === 1 ? .62 : .3; });
  }
  drumIn.addEventListener('change', function (e) { state.run = e.target.value; placeDrum(); render(); });
  placeDrum(); render();

  /* ---------- the lock wheels, rolling to 1 4 9 ---------- */
  var strips = $$('[data-strip]');
  var wheelH = 100;
  strips.forEach(function (s) { var h = ''; for (var k = 0; k < 30; k++) h += '<span>' + (k % 10) + '</span>'; s.innerHTML = h; });
  function sizeWheels() {
    var w = $('.wheel'); if (!w) return;
    wheelH = w.getBoundingClientRect().height;
    strips.forEach(function (s) { s.style.setProperty('--wh', wheelH + 'px'); s.style.transform = 'translateY(' + (-(s._pos || 0) * wheelH) + 'px)'; });
  }
  function setPos(s, pos) { s._pos = pos; s.style.transform = 'translateY(' + (-pos * wheelH) + 'px)'; }
  var mark = $('[data-mark]');
  var unlockedAt = 0;
  function spin() {
    var t0 = performance.now();
    var plan = strips.map(function (s, i) {
      var target = 20 + (+s.getAttribute('data-strip'));
      return { s: s, from: 3 + Math.floor(Math.random() * 7), to: target, dur: 1250 + i * 420, delay: 250 + i * 120 };
    });
    (function frame(now) {
      var done = 0;
      plan.forEach(function (q) {
        var t = clamp((now - t0 - q.delay) / q.dur, 0, 1);
        // a heavy wheel, fast then settling with one small kick past the number and back
        var e = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
        var kick = t > .82 && t < 1 ? Math.sin((t - .82) / .18 * Math.PI) * .09 : 0;
        setPos(q.s, lerp(q.from, q.to, e) + kick);
        if (t >= 1) done++;
      });
      if (done < plan.length) requestAnimationFrame(frame);
      else { mark.classList.add('open'); unlockedAt = performance.now(); }
    })(t0);
  }

  /* ---------- light, red lasers in the dark and warm light from the box ---------- */
  var cv = $('#lasers'), ctx = cv.getContext('2d');
  var W = 0, H = 0, DPR = 1, beams = [], dust = [], warm = { x: 0, y: 0, i: 0, r: 300 }, laserI = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = W < 760 ? 5 : 7;
    beams = [];
    for (var i = 0; i < n; i++) {
      var left = i % 2 === 0;
      beams.push({
        x: left ? -20 : W + 20,
        y: H * (.18 + .7 * ((i * .37) % 1)),
        a: (left ? 0 : Math.PI) + (left ? 1 : -1) * (-.42 + .84 * ((i * .61) % 1)),
        amp: .05 + .07 * ((i * .29) % 1),
        sp: .00009 + .00006 * ((i * .43) % 1),
        ph: i * 1.7,
        off: .08 + i * (.16 / n)
      });
    }
    dust = [];
    var m = Math.round(W * H / 9000);
    for (var k = 0; k < m; k++) dust.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .07, vy: -.02 - Math.random() * .06, r: .5 + Math.random() * 1.3, tw: Math.random() * 6.28 });
    sizeWheels();
  }
  function beamLine(b, t) {
    var a = b.a + Math.sin(t * b.sp + b.ph) * b.amp;
    return { x: b.x, y: b.y, dx: Math.cos(a), dy: Math.sin(a) };
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    // the room, a navy night that is darker at the edges and lit low where the beams cross
    var g = ctx.createRadialGradient(W * .5, H * .78, 0, W * .5, H * .78, Math.max(W, H) * .8);
    g.addColorStop(0, 'rgba(15,4,66,1)'); g.addColorStop(.5, 'rgba(8,1,44,1)'); g.addColorStop(1, 'rgba(3,0,22,1)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // the warm light out of the box, painted as amber over the dark, never added onto the navy (that reads mauve)
    if (warm.i > .01) {
      var wg = ctx.createRadialGradient(warm.x, warm.y, 0, warm.x, warm.y, warm.r);
      wg.addColorStop(0, 'rgba(196,108,48,' + (.5 * warm.i) + ')'); wg.addColorStop(.4, 'rgba(120,52,22,' + (.3 * warm.i) + ')'); wg.addColorStop(1, 'rgba(60,20,10,0)');
      ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
    }
    ctx.globalCompositeOperation = 'lighter';
    var lines = [];
    if (laserI > .02) {
      var L = Math.hypot(W, H) * 1.2;
      lines = [];
      beams.forEach(function (b, i) {
        var l = beamLine(b, t);
        var x2 = l.x + l.dx * L, y2 = l.y + l.dy * L;
        var k = 1 - seg(prog, b.off, b.off + .018);
        if (k <= 0) return;
        if (k < 1) k *= Math.random() > .45 ? 1 : .15;
        var flick = (.85 + .15 * Math.sin(t * .011 + i * 2.1)) * k;
        lines.push(l);
        [[16, .022], [6, .06], [2.2, .2], [.9, .85]].forEach(function (p) {
          ctx.strokeStyle = 'rgba(255,' + (p[0] < 2 ? 70 : 32) + ',' + (p[0] < 2 ? 60 : 40) + ',' + (p[1] * laserI * flick) + ')';
          ctx.lineWidth = p[0]; ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(x2, y2); ctx.stroke();
        });
      });
    }
    // dust in the air, it catches the red where it crosses a beam and the amber near the box
    for (var k = 0; k < dust.length; k++) {
      var d = dust[k];
      if (!RM) { d.x += d.vx; d.y += d.vy; if (d.y < -4) { d.y = H + 4; d.x = Math.random() * W; } if (d.x < -4) d.x = W + 4; if (d.x > W + 4) d.x = -4; }
      var red = 0;
      for (var j = 0; j < lines.length; j++) {
        var l2 = lines[j], px = d.x - l2.x, py = d.y - l2.y, dist = Math.abs(px * l2.dy - py * l2.dx);
        if (dist < 18) red = Math.max(red, 1 - dist / 18);
      }
      var wd = warm.i > .01 ? Math.max(0, 1 - Math.hypot(d.x - warm.x, d.y - warm.y) / (warm.r * .9)) * warm.i : 0;
      var base = .1 + .06 * Math.sin(t * .002 + d.tw);
      if (red > 0) { ctx.fillStyle = 'rgba(255,90,80,' + (base + red * .8 * laserI) + ')'; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * (1 + red), 0, 6.283); ctx.fill(); }
      if (wd > 0) { ctx.fillStyle = 'rgba(255,205,150,' + (wd * .8) + ')'; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 1.3, 0, 6.283); ctx.fill(); }
      if (red === 0 && wd === 0) { ctx.fillStyle = 'rgba(200,195,235,' + base + ')'; ctx.fillRect(d.x, d.y, d.r, d.r); }
    }
    // the moment the third wheel lands, light leaks out of the lock
    if (unlockedAt) {
      var age = (performance.now() - unlockedAt) / 1000;
      if (age < 2.6) {
        var o = $('[data-ring]').getBoundingClientRect(), cx = o.left + o.width / 2, cy = o.top + o.height / 2;
        var pulse = Math.sin(clamp(age / 2.6, 0, 1) * Math.PI) * (1 - seg(prog, 0, .1));
        var pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.width * 1.1);
        pg.addColorStop(0, 'rgba(196,108,48,' + (.55 * pulse) + ')'); pg.addColorStop(.5, 'rgba(110,46,20,' + (.25 * pulse) + ')'); pg.addColorStop(1, 'rgba(60,20,10,0)');
        ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = pg; ctx.fillRect(0, 0, W, H);
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---------- the scroll, the lock opens into their own box ---------- */
  var scene = $('[data-scene]'), stage = $('.stage', scene), copy = $('[data-copy]');
  var mb = $('[data-mb]'), mx = $('[data-mx]'), ring = $('[data-ring]'), top = $('[data-top]'), bot = $('[data-bot]'), wheels = $('[data-wheels]');
  var box = $('[data-box]'), lid = $('[data-lid]'), spill = $('[data-spill]');
  var lineEls = $$('[data-line]'), bar = $('[data-bar]'), hdr = $('[data-hdr]');
  var prog = 0;
  function target() {
    var vw = innerWidth, vh = innerHeight, ph = vw < 760;
    var tw = ph ? vw * .86 : Math.min(vw * .5, vh * .6 * 1.364);
    return { w: tw, h: tw / 1.364, cx: ph ? vw / 2 : vw * .63, cy: ph ? vh * .34 : vh * .53 };
  }
  function layoutScene() {
    var r = scene.getBoundingClientRect(), span = scene.offsetHeight - innerHeight;
    prog = clamp(-r.top / span, 0, 1);
    var p = prog, T = target();
    // the copy leaves first
    var pc = ease(seg(p, .015, .13));
    copy.style.opacity = 1 - pc; copy.style.transform = 'translateY(' + (-70 * pc) + 'px)';
    copy.style.visibility = pc > .99 ? 'hidden' : '';
    // B and X walk off, the O comes to the middle and grows into the lid
    var pm = ease(seg(p, .03, .27));
    mb.style.transform = 'translateX(' + (-620 * pm) + 'px)'; mb.style.opacity = 1 - seg(p, .04, .2);
    mx.style.transform = 'translateX(' + (620 * pm) + 'px)'; mx.style.opacity = 1 - seg(p, .04, .2);
    var po = ease(seg(p, .06, .2));
    top.style.transform = 'translateY(' + (-46 * po) + 'px)'; bot.style.transform = 'translateY(' + (46 * po) + 'px)';
    top.style.opacity = bot.style.opacity = 1 - seg(p, .14, .24);
    var rw = lerp(335, 489.7, pm); ring.setAttribute('width', rw); ring.setAttribute('x', 592 - rw / 2);
    var mr = mark.getBoundingClientRect(), base = mr.width / (mark._s || 1);
    var ppu = base / 1142, s = lerp(1, T.w / ((489.7 + 23) * ppu), pm);
    // where the O's centre sits before any transform
    var ox = (mark._l0 + (592 - 44) * ppu), oy = (mark._t0 + (710 - 509) * ppu);
    var dx = lerp(0, T.cx - ox, pm), dy = lerp(0, T.cy - oy, pm);
    mark._s = s;
    mark.style.transform = 'translateX(-50%) translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
    mark.style.transformOrigin = ((592 - 44) / 1142 * 100) + '% ' + ((710 - 509) / 402 * 100) + '%';
    wheels.style.opacity = 1 - seg(p, .2, .27);
    ring.style.opacity = 1 - seg(p, .25, .31);
    // the real box takes the O's place, then the lid swings up and the light comes out
    box.style.left = (T.cx - T.w / 2) + 'px'; box.style.top = (T.cy - T.h / 2) + 'px';
    box.style.width = T.w + 'px'; box.style.height = T.h + 'px';
    var pb = seg(p, .22, .3);
    var pl = ease(seg(p, .36, .58));
    var pz = ease(seg(p, .58, .84));
    box.style.opacity = pb;
    box.style.transform = 'scale(' + lerp(1, innerWidth < 760 ? 1.06 : 1.16, pz) + ')';
    lid.style.transform = 'rotateX(' + (82 * pl) + 'deg) translateZ(' + (40 * pl) + 'px)';
    lid.style.opacity = 1 - seg(p, .5, .6);
    spill.style.opacity = Math.min(1, seg(p, .38, .5)) * (1 - .4 * pz);
    // the words that go with each beat
    var l0 = seg(p, .19, .24) * (1 - seg(p, .33, .38)), l1 = seg(p, .52, .6);
    lineEls[0].style.opacity = l0; lineEls[0].style.transform = (innerWidth < 760 ? '' : 'translateY(-50%) ') + 'translateY(' + (24 * (1 - seg(p, .19, .24)) - 24 * seg(p, .33, .38)) + 'px)';
    lineEls[1].style.opacity = l1; lineEls[1].style.transform = (innerWidth < 760 ? '' : 'translateY(-50%) ') + 'translateY(' + (24 * (1 - l1)) + 'px)';
    // light, the lasers go down as the box opens and the warm light comes up
    laserI = 1 - .7 * seg(p, .1, .32);
    warm.x = T.cx; warm.y = T.cy - T.h * .1; warm.r = T.w * .95; warm.i = seg(p, .38, .52) * (1 - .3 * pz);
    bar.classList.toggle('on', p > .1);
    hdr.classList.toggle('solid', p > .985 || r.bottom < innerHeight);
  }
  function measureMark() {
    mark.style.transform = 'translateX(-50%)';
    var r = mark.getBoundingClientRect(); mark._l0 = r.left; mark._t0 = r.top; mark._s = 1;
  }

  /* ---------- start ---------- */
  function onResize() { resize(); measureMark(); placeDrum(); layoutScene(); }
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', layoutScene, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placeDrum(); sizeWheels(); });
  onResize();
  if (RM) { strips.forEach(function (s) { setPos(s, 20 + (+s.getAttribute('data-strip'))); }); mark.classList.add('open'); draw(0); }
  else {
    strips.forEach(function (s) { setPos(s, 3); });
    spin();
    (function loop(t) { draw(t); requestAnimationFrame(loop); })(0);
  }
  window.__ofn = { state: state, render: render, prog: function () { return prog; } };
})();
