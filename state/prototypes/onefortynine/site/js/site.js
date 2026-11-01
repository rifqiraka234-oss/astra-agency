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
      else { big = Math.ceil(BUY / month) + ' months'; unit = 'to pay off a £350 box,<br>then about ' + money(month) + ' a month'; }
    }
    $('[data-o="big"]').textContent = big;
    $('[data-o="unit"]').innerHTML = unit;
    $('[data-o="why"]').textContent = t.why;
    var cta = $('[data-hero-cta]');
    cta.textContent = t.team ? 'Book a 15 minute call' : 'Order a box';
    cta.setAttribute('href', t.team ? '#call' : '#order');
  }
  var drumIn = $('[data-drum-in]');
  function placeDrum() {
    var radios = $$('input', drumIn), i = radios.findIndex(function (r) { return r.checked; });
    var lab = $('label', drumIn), h = lab ? lab.getBoundingClientRect().height : 34;
    drumIn.style.transform = 'translateY(' + (-(i * h) - h / 2) + 'px)';
    $$('label', drumIn).forEach(function (l, k) { var d = Math.abs(k - i); l.style.opacity = d === 0 ? 1 : d === 1 ? .6 : .28; });
  }
  drumIn.addEventListener('change', function (e) { state.run = e.target.value; placeDrum(); render(); });
  placeDrum(); render();

  /* ---------- pointer, eased ---------- */
  var ptr = { x: .5, y: .5, tx: .5, ty: .5, on: false };
  window.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; ptr.tx = e.clientX / innerWidth; ptr.ty = e.clientY / innerHeight; ptr.on = true; }, { passive: true });

  /* ---------- the light, a studio sweep in copper over teal ---------- */
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
    g.addColorStop(0, '#04100f'); g.addColorStop(.55, '#0a2226'); g.addColorStop(1, '#0d2a2b');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // the copper pool, a lamp behind the pieces that leans toward the pointer and breathes
    var px = W * (PH() ? .55 : .7) + (ptr.x - .5) * W * .12, py = H * (PH() ? .55 : .62) + (ptr.y - .5) * H * .1;
    var br = Math.max(W, H) * (.58 + .03 * Math.sin(t * .0007));
    var c = ctx.createRadialGradient(px, py, 0, px, py, br);
    c.addColorStop(0, 'rgba(246,168,98,' + (.9 * lightI) + ')');
    c.addColorStop(.18, 'rgba(214,120,62,' + (.72 * lightI) + ')');
    c.addColorStop(.42, 'rgba(140,60,32,' + (.42 * lightI) + ')');
    c.addColorStop(.7, 'rgba(60,26,20,' + (.2 * lightI) + ')');
    c.addColorStop(1, 'rgba(20,12,10,0)');
    ctx.fillStyle = c; ctx.fillRect(0, 0, W, H);
    // a cold rim from the top left, the teal of the night outside
    var rim = ctx.createRadialGradient(W * .08, -H * .1, 0, W * .08, -H * .1, Math.max(W, H) * .75);
    rim.addColorStop(0, 'rgba(64,158,150,' + (.42 * lightI) + ')'); rim.addColorStop(1, 'rgba(47,116,113,0)');
    ctx.fillStyle = rim; ctx.fillRect(0, 0, W, H);
    // a floor line under the pieces, where the light lands
    var fl = ctx.createRadialGradient(px, H * .98, 0, px, H * .98, W * .55);
    fl.addColorStop(0, 'rgba(255,196,138,' + (.16 * lightI) + ')'); fl.addColorStop(1, 'rgba(255,196,138,0)');
    ctx.fillStyle = fl; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (var k = 0; k < motes.length; k++) {
      var d = motes[k];
      if (!RM) { d.x += d.vx; d.y += d.vy; if (d.y < -4) { d.y = H + 4; d.x = Math.random() * W; } if (d.x < -4) d.x = W + 4; if (d.x > W + 4) d.x = -4; }
      var near = Math.max(0, 1 - Math.hypot(d.x - px, d.y - py) / (br * .8));
      var a = (.05 + .05 * Math.sin(t * .002 + d.tw) + near * .5) * lightI;
      ctx.fillStyle = 'rgba(255,205,160,' + a + ')';
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---------- the still life, their pieces arrive and float ---------- */
  var hero = $('[data-hero]'), objs = $$('[data-obj]'), title = $('[data-title]'), band = $('[data-band]');
  var born = 0;
  objs.forEach(function (o, i) { o._d = +o.getAttribute('data-d'); o._r = +o.getAttribute('data-r'); o._ph = i * 1.9; });
  function arrive() {
    born = performance.now();
    if (RM) return;
    $$('.t-big .w', title).forEach(function (w, i) {
      w.animate([{ transform: 'translateY(.7em)', opacity: 0, filter: 'blur(10px)' }, { transform: 'none', opacity: 1, filter: 'blur(0)' }],
        { duration: 1100, delay: 180 + i * 140, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
    $('.t-small', title).animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 80, fill: 'backwards' });
    band.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: 700, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
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
      title.style.opacity = 1 - seg(p, .35, .8);
      band.style.opacity = 1 - seg(p, .15, .5);
    }
  }

  /* ---------- the torch, their own photos found in the dark ---------- */
  var torch = $('[data-torch]'), tstage = $('.t-stage', torch), scenes = $$('[data-scene]', torch), caps = $$('[data-cap]', torch);
  var countEl = $('[data-o="count"]'), bar = $('[data-bar]'), hdr = $('[data-hdr]');
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
    bar.classList.toggle('on', -hr.top > hr.height * .35);
    hdr.classList.toggle('solid', -hr.top > 10);
  }

  /* ---------- start ---------- */
  function onResize() { resize(); placeDrum(); }
  window.addEventListener('resize', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeDrum);
  onResize();
  arrive();
  function frame(t) {
    ptr.x = lerp(ptr.x, ptr.tx, .06); ptr.y = lerp(ptr.y, ptr.ty, .06);
    draw(t); placeObjs(t); placeTorch();
    if (!RM) requestAnimationFrame(frame);
  }
  if (RM) { frame(0); window.addEventListener('scroll', function () { frame(0); }, { passive: true }); }
  else requestAnimationFrame(frame);
  window.__ofn = { state: state, render: render };
})();
