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
  var PH = function () { return innerWidth < 760; };

  /* ---------- pointer, eased ---------- */
  var ptr = { x: .5, y: .5, tx: .5, ty: .5, on: false };
  window.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; ptr.tx = e.clientX / innerWidth; ptr.ty = e.clientY / innerHeight; ptr.on = true; }, { passive: true });

  /* ---------- the light, their orange behind their pieces, over their navy ---------- */
  var cv = $('#light'), ctx = cv.getContext('2d');
  var W = 0, H = 0, DPR = 1, motes = [], lightI = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    motes = [];
    var m = Math.round(W * H / 11000);
    for (var k = 0; k < m; k++) motes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .08, vy: -.03 - Math.random() * .07, r: .6 + Math.random() * 1.4, tw: Math.random() * 6.28 });
  }
  function draw(t) {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#03001a'); g.addColorStop(.55, '#09004a'); g.addColorStop(1, '#120a5a');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // the copper pool, a lamp behind the pieces that leans toward the pointer and breathes
    var px = W * (PH() ? .55 : .72) + (ptr.x - .5) * W * .12, py = H * (PH() ? .5 : .66) + (ptr.y - .5) * H * .1;
    var br = Math.max(W, H) * (.58 + .03 * Math.sin(t * .0007));
    var c = ctx.createRadialGradient(px, py, 0, px, py, br);
    c.addColorStop(0, 'rgba(255,160,96,' + (.95 * lightI) + ')');
    c.addColorStop(.16, 'rgba(255,145,77,' + (.82 * lightI) + ')');
    c.addColorStop(.34, 'rgba(216,98,46,' + (.5 * lightI) + ')');
    c.addColorStop(.52, 'rgba(120,40,40,' + (.2 * lightI) + ')');
    c.addColorStop(.7, 'rgba(9,0,74,0)');
    ctx.fillStyle = c; ctx.fillRect(0, 0, W, H);
    // a cold rim from the top left
    var rim = ctx.createRadialGradient(W * .08, -H * .1, 0, W * .08, -H * .1, Math.max(W, H) * .75);
    rim.addColorStop(0, 'rgba(255,255,255,' + (.07 * lightI) + ')'); rim.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rim; ctx.fillRect(0, 0, W, H);
    // a floor line under the pieces, where the light lands
    var fl = ctx.createRadialGradient(px, H * .98, 0, px, H * .98, W * .55);
    fl.addColorStop(0, 'rgba(255,170,110,' + (.18 * lightI) + ')'); fl.addColorStop(1, 'rgba(255,170,110,0)');
    ctx.fillStyle = fl; ctx.fillRect(0, 0, W, H);
    if (unlockedAt) {
      var age = (performance.now() - unlockedAt) / 1000, lidEl = $('.o-lid');
      if (age < 3.2 && lidEl) {
        var lr = lidEl.getBoundingClientRect(), fx = lr.left + lr.width / 2, fy = lr.top + lr.height * .62;
        var pulse = Math.sin(clamp(age / 3.2, 0, 1) * Math.PI) * lightI;
        var fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, lr.width * 1.1);
        fg.addColorStop(0, 'rgba(255,190,120,' + (.55 * pulse) + ')'); fg.addColorStop(.45, 'rgba(255,145,77,' + (.25 * pulse) + ')'); fg.addColorStop(1, 'rgba(255,145,77,0)');
        ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
      }
    }
    ctx.globalCompositeOperation = 'lighter';
    for (var k = 0; k < motes.length; k++) {
      var d = motes[k];
      if (!RM) { d.x += d.vx; d.y += d.vy; if (d.y < -4) { d.y = H + 4; d.x = Math.random() * W; } if (d.x < -4) d.x = W + 4; if (d.x > W + 4) d.x = -4; }
      var near = Math.max(0, 1 - Math.hypot(d.x - px, d.y - py) / (br * .8));
      var a = (.05 + .05 * Math.sin(t * .002 + d.tw) + near * .5) * lightI;
      ctx.fillStyle = 'rgba(255,200,160,' + a + ')';
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---------- the still life, their pieces arrive and float ---------- */
  var hero = $('[data-hero]'), objs = $$('[data-obj]'), title = $('[data-title]');
  var born = 0;
  objs.forEach(function (o, i) { o._d = +o.getAttribute('data-d'); o._r = +o.getAttribute('data-r'); o._ph = i * 1.9; });
  function arrive() {
    born = performance.now();
    if (RM) return;
    $$('.title .w', title).forEach(function (w, i) {
      w.animate([{ transform: 'translateY(.6em)', opacity: 0, filter: 'blur(12px)' }, { transform: 'none', opacity: 1, filter: 'blur(0)' }],
        { duration: 1300, delay: 160 + i * 180, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
    $$('.lede, .acts, .price', title).forEach(function (el, i) {
      el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: 760 + i * 120, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
  }
  function placeObjs(t) {
    var r = hero.getBoundingClientRect(), p = clamp(-r.top / Math.max(1, r.height), 0, 1);
    var age = RM ? 9 : (performance.now() - born) / 1000;
    objs.forEach(function (o, i) {
      var inT = RM ? 1 : ease(clamp((age - .15 - i * .18) / 1.3, 0, 1));
      var bob = RM ? 0 : Math.sin(t * .0009 + o._ph) * 9 * o._d;
      var sway = RM ? 0 : Math.sin(t * .0006 + o._ph) * 1.3;
      var mx = (ptr.x - .5) * -34 * o._d, my = (ptr.y - .5) * -24 * o._d;
      var out = ease(p);
      var dir = i === 1 ? -1 : 1;
      var tx = mx + dir * out * 140 * o._d;
      var ty = my + bob + (1 - inT) * 90 * o._d - out * 260 * o._d;
      var rot = o._r + sway + (1 - inT) * o._r * 1.6 + out * o._r * 2.2;
      var sc = lerp(1.18, 1, inT) + out * .12 * o._d;
      o.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) rotate(' + rot.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
      o.style.opacity = inT * (1 - seg(p, .55, .9));
      o.style.filter = inT < 1 ? 'blur(' + ((1 - inT) * 12).toFixed(1) + 'px)' : '';
    });
    if (!PH()) {
      title.style.transform = 'translateY(' + (-p * 120) + 'px)';
      title.style.opacity = 1 - seg(p, .3, .75);
    }
  }

  /* ---------- the torch, their own photos found in the dark ---------- */
  var torch = $('[data-torch]'), tstage = $('.t-stage', torch), scenes = $$('[data-scene]', torch), caps = $$('[data-cap]', torch);
  var countEl = $('[data-o="count"]'), bar = $('[data-bar]'), hdr = $('[data-hdr]');
  var barWant = false;
  // where the torch looks in each picture, in screen fractions, from the pieces in each photo
  var PATHS = [
    [[.16, .78], [.36, .52], [.56, .36], [.6, .4]],
    [[.56, .44], [.64, .58], [.74, .5], [.58, .22]],
    [[.24, .3], [.36, .62], [.58, .74], [.74, .56]],
    [[.18, .42], [.42, .44], [.7, .46], [.6, .5]]
  ];
  var PATHS_PH = [
    [[.2, .62], [.5, .42], [.55, .32], [.5, .36]],
    [[.3, .48], [.5, .52], [.6, .44], [.5, .3]],
    [[.32, .26], [.45, .5], [.55, .6], [.5, .48]],
    [[.3, .36], [.6, .4], [.55, .42], [.5, .45]]
  ];
  function along(path, q) {
    var n = path.length - 1, f = clamp(q, 0, 1) * n, i = Math.min(n - 1, Math.floor(f)), u = ease(f - i);
    return [lerp(path[i][0], path[i + 1][0], u), lerp(path[i][1], path[i + 1][1], u)];
  }
  function placeTorch() {
    var hr0 = hero.getBoundingClientRect(), heroOut = seg(-hr0.top / hr0.height, .45, .95);
    tstage.style.setProperty('--on', heroOut.toFixed(3));
    var r = torch.getBoundingClientRect(), span = torch.offsetHeight - innerHeight;
    var p = clamp(-r.top / span, 0, 1), n = scenes.length;
    var f = p * n, idx = Math.min(n - 1, Math.floor(f)), q = f - idx;
    var last = idx === n - 1;
    var R0 = PH() ? innerWidth * .46 : Math.min(innerWidth, innerHeight) * .34;
    var on = seg(q, .02, .14), off = last ? 0 : seg(q, .84, .98);
    var flick = (on > 0 && on < 1 && !RM) ? (Math.random() > .3 ? 1 : .35) : 1;
    var rad = R0 * ease(on) * (1 - ease(off)) * flick;
    if (last) rad = lerp(rad, Math.hypot(innerWidth, innerHeight) * 1.1, ease(seg(q, .55, .9)));
    var path = (PH() ? PATHS_PH : PATHS)[idx], pos = along(path, seg(q, .1, .86));
    var nx = ptr.on && !PH() ? (ptr.x - .5) * .12 : 0, ny = ptr.on && !PH() ? (ptr.y - .5) * .1 : 0;
    tstage.style.setProperty('--tx', ((pos[0] + nx) * 100).toFixed(2) + '%');
    tstage.style.setProperty('--ty', ((pos[1] + ny) * 100).toFixed(2) + '%');
    tstage.style.setProperty('--tr', rad.toFixed(1) + 'px');
    scenes.forEach(function (s, i) {
      var o = 0;
      if (i === idx) o = seg(q, 0, .06) * (last ? 1 : 1 - seg(q, .94, 1));
      if (i === 0 && idx === 0) o = Math.max(o, heroOut);
      s.style.opacity = o;
    });
    caps.forEach(function (c, i) {
      var o = i === idx ? seg(q, .1, .2) * (last ? 1 : 1 - seg(q, .8, .9)) : 0;
      c.style.opacity = o;
      c.style.transform = 'translateY(' + ((1 - o) * 26) + 'px)';
      c.style.visibility = o < .02 ? 'hidden' : '';
    });
    countEl.textContent = '0' + (idx + 1);
    // the studio light goes down as the torch comes on
    var hr = hero.getBoundingClientRect();
    lightI = 1 - .85 * clamp(-hr.top / hr.height, 0, 1);
    barWant = -hr.top > hr.height * .35;
    hdr.classList.toggle('solid', -hr.top > 10);
  }

  /* ---------- the lock in the headline, rolls to 1 4 9, and the click opens the box ---------- */
  var strips = $$('[data-strip]'), wheelH = 20, unlockedAt = 0;
  strips.forEach(function (s) { var h = ''; for (var k = 0; k < 30; k++) h += '<span>' + (k % 10) + '</span>'; s.innerHTML = h; });
  function setPos(s, pos) { s._pos = pos; s.style.transform = 'translateY(' + (-pos * wheelH).toFixed(2) + 'px)'; }
  function sizeWheels() {
    var w = $('.lk-w'); if (!w) return;
    wheelH = w.getBoundingClientRect().height;
    strips.forEach(function (s) { s.style.setProperty('--wh', wheelH + 'px'); setPos(s, s._pos || 0); });
  }
  function unlock() {
    hero.classList.add('opened'); unlockedAt = performance.now();
  }
  function spin() {
    var t0 = performance.now();
    var plan = strips.map(function (s, i) {
      return { s: s, from: 2 + Math.floor(Math.random() * 6), to: 20 + (+s.getAttribute('data-strip')), dur: 1500 + i * 450, delay: 900 + i * 150 };
    });
    (function frame(now) {
      var done = 0;
      plan.forEach(function (q) {
        var t = clamp((now - t0 - q.delay) / q.dur, 0, 1);
        var e = 1 - Math.pow(1 - t, 3);
        var kick = t > .84 && t < 1 ? Math.sin((t - .84) / .16 * Math.PI) * .08 : 0;
        setPos(q.s, lerp(q.from, q.to, e) + kick);
        if (t >= 1) done++;
      });
      if (done < plan.length) requestAnimationFrame(frame); else setTimeout(unlock, 160);
    })(t0);
  }

  /* ---------- how a stay plays, their photos open through the lock one by one ---------- */
  var stay = $('[data-stay]'), steps = $$('[data-step]'), sps = $$('[data-sp]'), stayIdx = -1;
  function placeStay() {
    if (!stay) return;
    var mid = innerHeight * (PH() ? .62 : .55), idx = 0;
    steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < mid) idx = i; });
    if (idx === stayIdx) return;
    stayIdx = idx;
    steps.forEach(function (s, i) { s.classList.toggle('on', i === idx); });
    sps.forEach(function (s, i) { s.classList.toggle('on', i <= idx); });
  }

  /* ---------- what it earns. One state, read by the estimate, the plans and the order ---------- */
  var PRESET = {
    cottage: { name: 'A holiday cottage', units: 1, stays: 2.5, share: 20, price: 40 },
    cottages: { name: 'A few cottages', units: 3, stays: 2.5, share: 20, price: 40 },
    lodges: { name: 'Holiday park lodges', units: 10, stays: 2.5, share: 20, price: 40 },
    pods: { name: 'Glamping pods', units: 4, stays: 6.7, share: 10, price: 40 }
  };
  var RENT = 60, BUY = 350;
  var S = { run: 'lodges', units: 10, stays: 2.5, share: 20, price: 40, plan: 'rent', boxes: 1, business: '', postcode: '' };
  var O = function (k) { return $$('[data-o="' + k + '"]'); };
  var setO = function (k, v) { O(k).forEach(function (e) { if ('value' in e && e.tagName === 'INPUT') e.value = v; else e.textContent = v; }); };
  var money = function (v) { return '£' + Math.round(v).toLocaleString('en-GB'); };
  var dec = function (v) { return (Math.round(v * 10) / 10).toString(); };
  function calc() {
    var plays = S.units * S.stays * S.share / 100, month = plays * S.price;
    var pb = month > 0 ? Math.ceil(BUY / month) : Infinity;
    return { plays: plays, month: month, rentNet: month - RENT, pb: pb };
  }
  function playsText(p) { return p <= 0 ? '0' : p < 1 ? '1' : dec(p); }
  function playsUnit(p) { return p > 0 && p < 1 ? 'game every ' + Math.round(1 / p) + ' months' : dec(p) === '1' ? 'game a month' : 'games a month'; }
  function siteText() { return PRESET[S.run].name + ', ' + S.units + (S.units === 1 ? ' unit' : ' units'); }
  function ownText(pb) { return pb <= 1 ? 'pays for itself in the first month' : pb <= 36 ? 'pays for itself in month ' + pb : 'takes more than three years to pay for itself'; }
  function rentText(n) { return n >= .5 ? 'About ' + money(n) + ' a month to you, after the rent.' : n > -.5 ? 'About covers its rent at your numbers.' : 'Costs you about ' + money(-n) + ' a month at your numbers.'; }

  var earnFlash = 0;
  function render(fromInput) {
    var c = calc();
    setO('month', money(c.month));
    setO('plays', playsText(c.plays));
    var pu = $('[data-o="plays"]'); if (pu && pu.nextElementSibling) pu.nextElementSibling.textContent = playsUnit(c.plays);
    var v;
    if (c.month <= 0) v = "At these numbers it doesn't earn yet.";
    else v = 'Own it and it ' + ownText(c.pb) + '. ' + (c.rentNet >= .5 ? 'Rent it and you keep about ' + money(c.rentNet) + ' a month after the rent.' : c.rentNet > -.5 ? 'Rent it and it about covers the rent.' : 'Renting costs more than it earns at these numbers.');
    setO('verdict', v);
    setO('rentline', rentText(c.rentNet));
    setO('buyline', c.month > 0 ? ownText(c.pb).charAt(0).toUpperCase() + ownText(c.pb).slice(1) + ', at your numbers.' : "Doesn't earn yet at your numbers.");
    setO('stays', dec(S.stays)); setO('share', S.share + '%'); setO('price', '£' + S.price);
    // the order, filled in from all of it
    var site = siteText();
    setO('sitefield', site); setO('sitefield2', site);
    var boxes = S.boxes, plan = S.plan === 'buy' ? 'Buy, ' + boxes + (boxes > 1 ? ' boxes, ' : ' box, ') + money(BUY * boxes) : 'Rent, ' + boxes + (boxes > 1 ? ' boxes, ' : ' box, ') + money(RENT * boxes) + ' a month';
    setO('sumplan', plan);
    setO('sumsite', site);
    setO('sumest', c.month > 0 ? 'About ' + money(c.month) + ' a month from the box, an estimate' : 'No estimate yet');
    setO('estfield', money(c.month) + ' a month, ' + playsText(c.plays) + ' ' + playsUnit(c.plays) + ', ' + dec(S.stays) + ' stays a unit, ' + S.share + '% play, £' + S.price + ' a game');
    chartTo(c);
    if (fromInput && !RM) { O('month').forEach(function (e) { e.classList.add('hot'); }); clearTimeout(earnFlash); earnFlash = setTimeout(function () { O('month').forEach(function (e) { e.classList.remove('hot'); }); }, 90); }
  }

  // the drum
  var drumIn = $('[data-drum-in]'), runs = $$('input[name="run"]');
  function placeDrum() {
    if (!drumIn) return;
    var i = 0; runs.forEach(function (r, k) { if (r.checked) i = k; });
    var rh = parseFloat(getComputedStyle($('[data-drum]')).getPropertyValue('--rh')) || 52;
    drumIn.style.transform = 'translateY(' + ((1 - i) * rh) + 'px)';
  }
  runs.forEach(function (r) {
    r.addEventListener('change', function () {
      if (!r.checked) return;
      S.run = r.value; var p = PRESET[r.value];
      S.stays = p.stays; S.share = p.share; S.price = p.price;
      setUnits(p.units);
      syncRanges(); placeDrum(); render(true);
    });
  });

  // the units, their own lock wheels
  var uw = $$('[data-uw]'), ulock = $('[data-ulock]'), uH = 68;
  uw.forEach(function (s) { var h = ''; for (var k = 0; k < 30; k++) h += '<span>' + (k % 10) + '</span>'; s.innerHTML = h; s._pos = 10; });
  function uSet(s, pos) { s._pos = pos; s.style.transform = 'translateY(' + (-pos * uH).toFixed(2) + 'px)'; }
  function sizeU() { var w = $('.ulock .lk-w'); if (!w) return; uH = w.getBoundingClientRect().height || 68; uw.forEach(function (s) { s.style.setProperty('--wh', uH + 'px'); uSet(s, s._pos); }); }
  function rollTo(s, digit) {
    var from = s._pos, cur = ((Math.round(from) % 10) + 10) % 10;
    var to = 10 + digit; if (digit === cur) { uSet(s, to); return; }
    if (RM) { uSet(s, to); return; }
    from = 10 + cur; var t0 = performance.now(), dur = 520;
    (function f(now) {
      var t = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - t, 3);
      var kick = t > .8 && t < 1 ? Math.sin((t - .8) / .2 * Math.PI) * .06 * Math.sign(to - from) : 0;
      uSet(s, lerp(from, to, e) + kick);
      if (t < 1) requestAnimationFrame(f);
    })(t0);
  }
  function setUnits(n) {
    S.units = clamp(Math.round(n), 1, 20);
    rollTo(uw[0], Math.floor(S.units / 10)); rollTo(uw[1], S.units % 10);
    if (ulock) { ulock.setAttribute('aria-valuenow', S.units); ulock.setAttribute('aria-valuetext', S.units + (S.units === 1 ? ' unit' : ' units')); }
  }
  $$('[data-units]').forEach(function (b) { b.addEventListener('click', function () { setUnits(S.units + (+b.getAttribute('data-units'))); render(true); }); });
  if (ulock) ulock.addEventListener('keydown', function (e) {
    var d = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 5, PageDown: -5 }[e.key];
    if (e.key === 'Home') { e.preventDefault(); setUnits(1); render(true); return; }
    if (e.key === 'End') { e.preventDefault(); setUnits(20); render(true); return; }
    if (d) { e.preventDefault(); setUnits(S.units + d); render(true); }
  });

  // the sliders
  var ranges = $$('input[type=range][data-in]');
  function fill(r) { r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100).toFixed(2) + '%'); }
  function syncRanges() { ranges.forEach(function (r) { r.value = S[r.getAttribute('data-in')]; fill(r); }); }
  ranges.forEach(function (r) { r.addEventListener('input', function () { S[r.getAttribute('data-in')] = +r.value; fill(r); render(true); }); });

  // the chart, the first year owning against renting, and the month it pays off
  var chart = $('[data-chart]'), cur = null, tgt = null, tw0 = 0;
  function series(c) { var own = [], rent = []; for (var m = 0; m <= 12; m++) { own.push(c.month * m - BUY); rent.push(c.rentNet * m); } return { own: own, rent: rent, month: c.month, pb: c.pb }; }
  function nice(v) { var p = Math.pow(10, Math.floor(Math.log10(v))), f = v / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; }
  function drawChart(s) {
    if (!chart) return;
    var w = Math.max(280, Math.round(chart.getBoundingClientRect().width || 600)), h = PH() ? 230 : 290;
    chart.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var L = 8, R = 12, T = 18, B = 30;
    var lo = Math.min(-BUY, Math.min.apply(null, s.rent)), hi = Math.max(100, Math.max.apply(null, s.own), Math.max.apply(null, s.rent));
    var step = nice((hi - lo) / 4); lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step;
    var X = function (m) { return L + (w - L - R) * m / 12; }, Y = function (v) { return T + (h - T - B) * (hi - v) / (hi - lo); };
    var g = '';
    for (var v = lo; v <= hi + .1; v += step) {
      var y = Y(v).toFixed(1);
      g += '<line x1="' + L + '" x2="' + (w - R) + '" y1="' + y + '" y2="' + y + '"' + (Math.abs(v) < .1 ? ' class="zero"' : '') + '/>';
      if (v > .1) g += '<text x="' + L + '" y="' + (Y(v) - 7).toFixed(1) + '">' + money(v) + '</text>';
    }
    g += '<text x="' + L + '" y="' + (Y(0) - 7).toFixed(1) + '">Even</text>';
    [0, 3, 6, 9, 12].forEach(function (m) { g += '<text x="' + X(m).toFixed(1) + '" y="' + (h - 8) + '" text-anchor="' + (m === 0 ? 'start' : m === 12 ? 'end' : 'middle') + '">' + (m === 12 ? '12 months' : m) + '</text>'; });
    $('[data-grid]', chart).innerHTML = g;
    var path = function (arr) { return arr.map(function (v, m) { return (m ? 'L' : 'M') + X(m).toFixed(1) + ' ' + Y(v).toFixed(1); }).join(''); };
    $('[data-own]', chart).setAttribute('d', path(s.own));
    $('[data-rent]', chart).setAttribute('d', path(s.rent));
    var k = '';
    k += '<text x="' + (X(0) + 10).toFixed(1) + '" y="' + (Y(-BUY) + 18).toFixed(1) + '">You pay £350</text>';
    if (s.month > 0 && BUY / s.month <= 12) {
      var px = X(BUY / s.month), py = Y(0), lbl = 'Paid off in month ' + Math.ceil(BUY / s.month), right = px > w * .6;
      k += '<circle class="ring" cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="6"/><circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="5"/>';
      k += '<text class="k" x="' + (px + (right ? -12 : 12)).toFixed(1) + '" y="' + (py + 22).toFixed(1) + '" text-anchor="' + (right ? 'end' : 'start') + '">' + lbl + '</text>';
    } else {
      k += '<text class="k" x="' + (w - R) + '" y="' + (Y(s.own[12]) - 10).toFixed(1) + '" text-anchor="end">Not paid off in year one</text>';
    }
    $('[data-key]', chart).innerHTML = k;
  }
  function chartTo(c) {
    tgt = series(c);
    if (!cur || RM) { cur = tgt; drawChart(cur); return; }
    var from = cur; tw0 = performance.now();
    (function f(now) {
      var t = ease(clamp((now - tw0) / 650, 0, 1));
      var mix = function (a, b) { return a.map(function (v, i) { return lerp(v, b[i], t); }); };
      cur = { own: mix(from.own, tgt.own), rent: mix(from.rent, tgt.rent), month: lerp(from.month, tgt.month, t), pb: tgt.pb };
      drawChart(cur);
      if (t < 1) requestAnimationFrame(f); else cur = tgt;
    })(tw0);
  }

  /* ---------- rent or own, and the pieces drifting by ---------- */
  var cost = $('[data-cost]'), cps = $$('.cp'), teamsPic = $('.teams-pic'), teams = $('#teams');
  function placeDrift() {
    if (cost && !RM) {
      var r = cost.getBoundingClientRect(), p = (innerHeight - r.top) / (innerHeight + r.height);
      if (p > -.1 && p < 1.1) cps.forEach(function (c, i) { c.style.transform = 'translate3d(0,' + ((.5 - p) * (i ? 220 : 120)).toFixed(1) + 'px,0) rotate(' + ((.5 - p) * (i ? 16 : -10)).toFixed(2) + 'deg)'; });
    }
    if (teams && teamsPic && !RM) {
      var r2 = teams.getBoundingClientRect(), p2 = (innerHeight - r2.top) / (innerHeight + r2.height);
      if (p2 > -.1 && p2 < 1.1) teamsPic.style.transform = 'translate3d(0,' + ((.5 - p2) * 80).toFixed(1) + 'px,0) scale(1.04)';
    }
  }

  /* ---------- the order, arriving filled in ---------- */
  var orderBox = $('[data-orderbox]'), form = $('[data-form]'), done = $('[data-done]'), mode = 'order';
  function setMode(m) {
    mode = m;
    $$('[data-mode]').forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-mode') === m ? 'true' : 'false'); });
    $$('[data-only]', form).forEach(function (e) { e.hidden = e.getAttribute('data-only') !== m; });
    $('[data-submit]').textContent = m === 'call' ? 'Ask for the call' : 'Send the order';
    $('#order-h').textContent = m === 'call' ? 'A 15 minute call, when it suits you.' : 'Your box, ready to go.';
    $('[data-sum]').hidden = false;
  }
  $$('[data-mode]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); }); });
  $$('[data-mode]').forEach(function (b, i, all) { b.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = all[(i + 1) % 2]; n.focus(); setMode(n.getAttribute('data-mode')); } }); });
  $$('a[href="#call"]').forEach(function (a) { a.addEventListener('click', function () { setMode('call'); }); });
  $$('a[href="#order"]').forEach(function (a) { a.addEventListener('click', function () { setMode('order'); var c = a.getAttribute('data-choose'); if (c) { S.plan = c; var r = $('#p-' + c); if (r) r.checked = true; render(); } }); });
  $$('input[name="plan"]').forEach(function (r) { r.addEventListener('change', function () { if (r.checked) { S.plan = r.value; render(); } }); });
  var boxesSel = $('select[data-in="boxes"]'); if (boxesSel) boxesSel.addEventListener('change', function () { S.boxes = +boxesSel.value; render(); });
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var need = [['name', 'Add your name'], ['business', 'Add your business'], ['email', 'Add an email we can reply to']], first = null;
    need.forEach(function (n) {
      var el = form.elements[n[0]], f = el.closest('.f'), old = $('.err', f); if (old) old.remove();
      var bad = !el.value.trim() || (n[0] === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()));
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) { var m = document.createElement('span'); m.className = 'err'; m.id = 'err-' + n[0]; m.textContent = n[1]; f.appendChild(m); el.setAttribute('aria-describedby', m.id); if (!first) first = el; }
      else el.removeAttribute('aria-describedby');
    });
    if (first) { first.focus(); return; }
    var biz = form.elements.business.value.trim(), pc = form.elements.postcode ? form.elements.postcode.value.trim() : '';
    setO('tagto', 'To ' + biz);
    if (mode === 'call') {
      setO('tagline', 'A 15 minute call, ' + form.elements.when.value.toLowerCase());
      setO('tagpc', siteText());
      setO('donehead', 'Call booked in.');
      setO('donetext', "We'll be in touch to fix a time. This is a prototype, so nothing was sent.");
    } else {
      setO('tagline', S.boxes + (S.boxes > 1 ? ' boxes, ' : ' box, ') + (S.plan === 'buy' ? 'bought' : 'rented'));
      setO('tagpc', pc ? 'Delivery to ' + pc.toUpperCase() : siteText());
      setO('donehead', 'Locked in.');
      setO('donetext', "We'll be in touch to confirm the details and the delivery. This is a prototype, so nothing was sent or charged.");
    }
    form.hidden = true; done.hidden = false; $('.modes').hidden = true;
    requestAnimationFrame(function () { done.classList.add('in'); done.focus({ preventScroll: true }); done.scrollIntoView({ block: 'center', behavior: RM ? 'auto' : 'smooth' }); });
  });

  function placeRest() {
    placeStay(); placeDrift();
    // the lights come back up where the numbers are
    var lit = function (el, a) { if (!el) return 0; var r = el.getBoundingClientRect(); return a * clamp(Math.min(innerHeight - r.top, r.bottom) / innerHeight, 0, 1); };
    lightI = Math.max(lightI, .15 + lit($('[data-earn]'), .6), .15 + lit(cost, .4), .15 + lit(orderBox, .45));
    if (orderBox) { var o = orderBox.getBoundingClientRect(); if (o.top < innerHeight * .7 && o.bottom > innerHeight * .3) barWant = false; }
    if (bar.classList.contains('on') !== barWant) bar.classList.toggle('on', barWant);
  }

  /* ---------- start ---------- */
  function onResize() { resize(); sizeWheels(); sizeU(); placeDrum(); if (cur) drawChart(cur); }
  window.addEventListener('resize', onResize);
  onResize();
  arrive();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { sizeWheels(); sizeU(); });
  syncRanges(); setUnits(S.units); placeDrum(); render();
  if (RM) { strips.forEach(function (s) { setPos(s, 20 + (+s.getAttribute('data-strip'))); }); unlock(); }
  else { strips.forEach(function (s) { setPos(s, 2); }); spin(); }
  function frame(t) {
    ptr.x = lerp(ptr.x, ptr.tx, .06); ptr.y = lerp(ptr.y, ptr.ty, .06);
    placeTorch(); placeRest(); draw(t); placeObjs(t);
    if (!RM) requestAnimationFrame(frame);
  }
  if (RM) { frame(0); window.addEventListener('scroll', function () { frame(0); }, { passive: true }); }
  else requestAnimationFrame(frame);
  window.__ofn = {};
})();
