/* BWILD. One run carried down the page {city, t, email, cart}. The sky is the sun's real position at your run, the
   year chart is worked out for each day from the same equations (NOAA's solar calculator), the headlights come up the
   road with the scroll. Reduced motion and no script keep the whole page. */
(function () {
  var html = document.documentElement, rm = html.classList.contains('rm');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var setO = function (k, v) { $$('[data-o="' + k + '"]').forEach(function (e) { e.textContent = v; }); };
  var D = JSON.parse($('script[data-d]').textContent);
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var hm = function (m) { m = Math.round(m); return pad(Math.floor(m / 60)) + '.' + pad(m % 60); };
  var dur = function (m) {
    m = Math.round(m); var h = Math.floor(m / 60), mm = m % 60;
    if (h && mm) return h + (h === 1 ? ' hour ' : ' hours ') + mm + (mm === 1 ? ' minute' : ' minutes');
    if (h) return h + (h === 1 ? ' hour' : ' hours');
    return mm + (mm === 1 ? ' minute' : ' minutes');
  };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  /* ------------------------------------------------ the sun, NOAA's general solar position equations */
  var R = Math.PI / 180;
  var solar = function (ms) {
    var T = (ms / 86400000 + 2440587.5 - 2451545) / 36525;
    var L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360;
    var M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    var e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
    var C = Math.sin(M * R) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(2 * M * R) * (0.019993 - 0.000101 * T) + Math.sin(3 * M * R) * 0.000289;
    var om = 125.04 - 1934.136 * T, lam = L0 + C - 0.00569 - 0.00478 * Math.sin(om * R);
    var eps = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60 + 0.00256 * Math.cos(om * R);
    var decl = Math.asin(Math.sin(eps * R) * Math.sin(lam * R));
    var y = Math.pow(Math.tan(eps * R / 2), 2);
    var eq = 4 / R * (y * Math.sin(2 * L0 * R) - 2 * e * Math.sin(M * R) + 4 * e * y * Math.sin(M * R) * Math.cos(2 * L0 * R) - 0.5 * y * y * Math.sin(4 * L0 * R) - 1.25 * e * e * Math.sin(2 * M * R));
    return { decl: decl, eq: eq };
  };
  var altitude = function (ms, lat, lon) {
    var s = solar(ms), utc = ((ms % 86400000) + 86400000) % 86400000 / 60000;
    var ha = (utc + s.eq + 4 * lon) / 4 - 180;
    var cz = Math.sin(lat * R) * Math.sin(s.decl) + Math.cos(lat * R) * Math.cos(s.decl) * Math.cos(ha * R);
    return 90 - Math.acos(clamp(cz, -1, 1)) / R;
  };
  /* sunrise or sunset for a civil date, in UTC minutes after that date's 00.00 UTC, solved twice */
  var event = function (y, mo, d, lat, lon, rise) {
    var day0 = Date.UTC(y, mo - 1, d), t = 720 - 4 * lon;
    for (var i = 0; i < 3; i++) {
      var s = solar(day0 + t * 60000);
      var c = Math.cos(90.833 * R) / (Math.cos(lat * R) * Math.cos(s.decl)) - Math.tan(lat * R) * Math.tan(s.decl);
      if (c > 1 || c < -1) return null;
      var H = Math.acos(c) / R * (rise ? 1 : -1);
      t = 720 - 4 * (lon + H) - s.eq;
    }
    return day0 + t * 60000;
  };

  /* ------------------------------------------------ local time in the city's own time zone */
  var fmts = {};
  var parts = function (ms, tz) {
    var f = fmts[tz] || (fmts[tz] = new Intl.DateTimeFormat('en-GB', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }));
    var o = {}; f.formatToParts(new Date(ms)).forEach(function (p) { if (p.type !== 'literal') o[p.type] = +p.value; });
    return o;
  };
  var localMin = function (ms, tz) { var p = parts(ms, tz); return p.hour * 60 + p.minute + p.second / 60; };
  var offsetMin = function (ms, tz) { var p = parts(ms, tz); return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ms / 1000) * 1000) / 60000); };
  var cityById = function (id) { return D.cities.filter(function (c) { return c.id === id; })[0]; };

  /* a year of daylight for a city, from its local today, cached */
  var years = {};
  var yearOf = function (c) {
    if (years[c.id]) return years[c.id];
    var now = parts(Date.now(), c.tz), out = [];
    for (var i = 0; i < 365; i++) {
      var dt = new Date(Date.UTC(now.year, now.month - 1, now.day + i));
      var y = dt.getUTCFullYear(), mo = dt.getUTCMonth() + 1, d = dt.getUTCDate();
      var r = event(y, mo, d, c.lat, c.lon, true), s = event(y, mo, d, c.lat, c.lon, false);
      out.push({ y: y, mo: mo, d: d, rise: r === null ? null : localMin(r, c.tz), set: s === null ? null : localMin(s, c.tz) });
    }
    return (years[c.id] = out);
  };
  var isDark = function (x, t) { if (x.rise === null || x.set === null) return false; return t < x.rise || t > x.set; };
  var dayName = function (x) { return x.d + ' ' + MONTHS[x.mo - 1]; };

  /* ------------------------------------------------ the one state */
  var S = { city: 'geneva', t: D.picks.sunrise, email: '', cart: 0, paid: false };

  /* ------------------------------------------------ the sky, every stop from the sun's altitude at your run */
  var mix = function (a, b, k) { return a.map(function (v, i) { return Math.round(v + (b[i] - v) * k); }); };
  var rgb = function (c) { return 'rgb(' + c.join(',') + ')'; };
  var SKY = [ /* altitude, top, middle, bottom */
    [-18, [4, 5, 9], [7, 9, 14], [11, 13, 20]],
    [-9, [8, 11, 22], [16, 20, 36], [34, 30, 48]],
    [-4, [20, 26, 46], [62, 50, 70], [148, 82, 58]],
    [-0.6, [33, 42, 66], [104, 76, 86], [214, 112, 58]],
    [-0.5, [150, 168, 196], [214, 186, 170], [240, 176, 112]],
    [4, [158, 182, 210], [222, 206, 184], [244, 204, 150]],
    [12, [170, 196, 220], [208, 222, 232], [236, 238, 233]],
    [90, [160, 192, 222], [204, 220, 232], [237, 239, 234]]
  ];
  var skyAt = function (a) {
    for (var i = 0; i < SKY.length - 1; i++) {
      var p = SKY[i], q = SKY[i + 1];
      if (a <= q[0]) { var k = clamp((a - p[0]) / (q[0] - p[0]), 0, 1); return [mix(p[1], q[1], k), mix(p[2], q[2], k), mix(p[3], q[3], k)]; }
    }
    var z = SKY[SKY.length - 1]; return [z[1], z[2], z[3]];
  };

  var hero = $('#run'), heroArt = hero && $('.hero-art', hero);
  var runMs = function (c, t) {
    var now = parts(Date.now(), c.tz), guess = Date.UTC(now.year, now.month - 1, now.day, 0, 0) + t * 60000;
    return guess - offsetMin(guess, c.tz) * 60000;
  };
  var paintSky = function () {
    var c = cityById(S.city), a = altitude(runMs(c, S.t), c.lat, c.lon), s = skyAt(a);
    html.style.setProperty('--sky-t', rgb(s[0])); html.style.setProperty('--sky-m', rgb(s[1])); html.style.setProperty('--sky-b', rgb(s[2]));
    var light = a >= -0.5;
    html.style.setProperty('--tx', light ? '#08090B' : '#FFFFFF'); html.style.setProperty('--tx-inv', light ? '#FFFFFF' : '#08090B');
    html.setAttribute('data-tx', light ? 'ink' : 'white');
    hero.style.setProperty('--st', clamp((-a - 4) / 8, 0, 1).toFixed(3));
    hero.style.setProperty('--gnd', light ? .06 : .35);
    /* their low sun photo climbs with the sun, and once it's down their moon photo comes up */
    hero.style.setProperty('--so', clamp((a + 5) / 5, 0, 1).toFixed(3));
    hero.style.setProperty('--sy', (60 - clamp(a, -5, 30) * 1.1).toFixed(1) + '%');
    hero.style.setProperty('--mo', clamp((-a - .5) / 5, 0, 1).toFixed(3));
    hero.style.setProperty('--dy', (60 - clamp(-a, 0, 25) * 1.1).toFixed(1) + '%');
    return a;
  };

  /* ------------------------------------------------ render, every display reads the state */
  var pickOf = function (t) { return t < 720 ? 'sunrise' : 'night'; };
  var line = function () {
    var c = cityById(S.city), yr = yearOf(c), x = yr[0];
    if (x.rise !== null && S.t < x.rise) return 'Today in ' + c.name + ' the sun rises at ' + hm(x.rise) + ', so you’d start ' + dur(x.rise - S.t) + ' before it, in the dark.';
    if (x.set !== null && S.t > x.set) return 'Today in ' + c.name + ' the sun sets at ' + hm(x.set) + ', so you’d start ' + dur(S.t - x.set) + ' after it, in the dark.';
    var nxt = yr.filter(function (z) { return isDark(z, S.t); })[0];
    return 'Today in ' + c.name + ' that’s daylight.' + (nxt ? ' From ' + dayName(nxt) + ' it won’t be.' : ' It stays light at this time all year.');
  };
  var counts = function () {
    var c = cityById(S.city), yr = yearOf(c), n = 0, best = 0, bs = -1, cur = 0, cs = 0;
    yr.forEach(function (x, i) { if (isDark(x, S.t)) { n++; if (!cur) cs = i; cur++; if (cur > best) { best = cur; bs = cs; } } else cur = 0; });
    return { n: n, best: best, bs: bs, yr: yr, c: c };
  };
  var render = function () {
    var c = cityById(S.city), k = counts(), pick = pickOf(S.t), label = (pick === 'sunrise' ? 'Sunrise' : 'Night');
    setO('time', hm(S.t)); setO('time2', hm(S.t));
    var tm = $('[data-time]'); tm.setAttribute('aria-valuenow', S.t); tm.setAttribute('aria-valuetext', hm(S.t));
    $$('[data-pick]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-pick') === pick ? 'true' : 'false'); });
    setO('skyline', line());
    setO('darkn', k.n); setO('cityname', c.name);
    setO('streak', k.best ? 'The longest stretch runs from ' + dayName(k.yr[k.bs]) + ' to ' + dayName(k.yr[k.bs + k.best - 1]) + ', ' + k.best + (k.best === 1 ? ' run.' : ' runs in a row.') : 'At this time it stays light all year.');
    setO('chartsum', 'Daylight for the next 365 days in ' + c.name + ', with a run at ' + hm(S.t) + ' marked. ' + k.n + ' of the 365 runs start in the dark.');
    var run = label + ' · ' + hm(S.t) + ' · ' + c.name;
    setO('runline', run); if (!S.paid) setO('bibrun', run);
    setO('sbar', '€1 today · 30% off at launch · ' + label + ' ' + hm(S.t) + ' ' + c.name);
    var ln = $('[data-yrline]'); if (ln) ln.style.setProperty('--y', ((S.t - 240) / 1140).toFixed(4));
    paintSky(); drawYear(k);
  };

  /* ------------------------------------------------ the hero controls */
  var setT = function (t) { S.t = clamp(Math.round(t / 5) * 5, 240, 1380); render(); };
  $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function () { setT(D.picks[b.getAttribute('data-pick')]); }); });
  $$('[data-dt]').forEach(function (b) { b.addEventListener('click', function () { setT(S.t + +b.getAttribute('data-dt')); }); });
  var tm = $('[data-time]');
  tm.addEventListener('keydown', function (e) {
    var st = e.shiftKey ? 30 : 5, k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowUp') setT(S.t + st); else if (k === 'ArrowLeft' || k === 'ArrowDown') setT(S.t - st);
    else if (k === 'PageUp') setT(S.t + 60); else if (k === 'PageDown') setT(S.t - 60);
    else if (k === 'Home') setT(240); else if (k === 'End') setT(1380); else return;
    e.preventDefault();
  });
  var drag = null;
  tm.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, t: S.t }; tm.setPointerCapture(e.pointerId); });
  tm.addEventListener('pointermove', function (e) { if (drag) setT(drag.t + (e.clientX - drag.x) * 1.5); });
  ['pointerup', 'pointercancel'].forEach(function (ev) { tm.addEventListener(ev, function () { drag = null; }); });
  $('[data-city]').addEventListener('change', function (e) { S.city = e.target.value; render(); });

  /* ------------------------------------------------ stars, drawn once */
  var stars = $('[data-stars]');
  var drawStars = function () {
    if (!stars) return; var w = stars.clientWidth, h = stars.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
    stars.width = w * dpr; stars.height = h * dpr; var x = stars.getContext('2d'); x.scale(dpr, dpr);
    var seed = 7; var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var i = 0; i < 140; i++) { var r = rnd() * 1.1 + .2; x.globalAlpha = .25 + rnd() * .65; x.fillStyle = '#fff'; x.beginPath(); x.arc(rnd() * w, rnd() * h * .7, r, 0, 7); x.fill(); }
  };

  /* ------------------------------------------------ a year of daylight, and the run line that moves it */
  var yc = $('[data-yr]'), plot = yc && yc.parentNode;
  var drawYear = function (k) {
    if (!yc) return; var w = yc.clientWidth, h = yc.clientHeight; if (!w || !h) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1); yc.width = Math.round(w * dpr); yc.height = Math.round(h * dpr);
    var x = yc.getContext('2d'); x.scale(dpr, dpr); x.clearRect(0, 0, w, h);
    var yOf = function (m) { return (m - 240) / 1140 * h; }, cw = w / 365;
    x.fillStyle = 'rgba(255,255,255,.035)'; x.fillRect(0, 0, w, h);
    /* daylight as one band, sunrise along the top and sunset along the bottom */
    x.beginPath();
    k.yr.forEach(function (d, i) { var px = (i + .5) * cw; if (i === 0) x.moveTo(0, yOf(d.rise)); x.lineTo(px, yOf(d.rise)); });
    x.lineTo(w, yOf(k.yr[364].rise)); x.lineTo(w, yOf(k.yr[364].set));
    for (var j = 364; j >= 0; j--) x.lineTo((j + .5) * cw, yOf(k.yr[j].set));
    x.lineTo(0, yOf(k.yr[0].set)); x.closePath();
    var g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(239,237,231,.30)'); g.addColorStop(.5, 'rgba(239,237,231,.20)'); g.addColorStop(1, 'rgba(239,237,231,.30)');
    x.fillStyle = g; x.fill();
    var ty = yOf(S.t);
    x.shadowColor = 'rgba(255,255,255,.9)'; x.shadowBlur = 6; x.fillStyle = '#fff';
    k.yr.forEach(function (d, i) { if (isDark(d, S.t)) x.fillRect(i * cw, ty - 7, Math.max(1, cw - .6), 14); });
    x.shadowBlur = 0;
  };
  if (plot) {
    var pdrag = false;
    var fromY = function (e) { var r = plot.getBoundingClientRect(); setT(240 + clamp((e.clientY - r.top) / r.height, 0, 1) * 1140); };
    plot.addEventListener('pointerdown', function (e) { pdrag = true; plot.setPointerCapture(e.pointerId); fromY(e); });
    plot.addEventListener('pointermove', function (e) { if (pdrag) fromY(e); });
    ['pointerup', 'pointercancel'].forEach(function (ev) { plot.addEventListener(ev, function () { pdrag = false; }); });
  }

  /* ------------------------------------------------ headlights up the road with the scroll */
  var hl = $('[data-hl]'), V = D.visibility;
  var hlLive = hl && hl.classList.contains('live');
  var caps = hl ? $$('.caps li', hl) : [];
  var hlUpdate = function () {
    if (!hlLive) return;
    var r = hl.getBoundingClientRect(), span = hl.offsetHeight - window.innerHeight;
    var p = clamp(-r.top / Math.max(1, span), 0, 1);
    var d = Math.round(V.start - p * (V.start - V.end));
    var near = clamp(V.end / d, 0, 1); /* apparent size, 20 m over the distance */
    var flare = d <= V.bfu ? clamp(.7 + (V.bfu - d) / 80, 0, 1) : clamp((V.bfu + 14 - d) / 14, 0, 1) * .15;
    hl.style.setProperty('--s', Math.max(.06, near).toFixed(4)); hl.style.setProperty('--lit', (.12 + .55 * Math.sqrt(near)).toFixed(3));
    hl.style.setProperty('--flare', flare.toFixed(3));
    hl.style.setProperty('--lane', (p * 2400).toFixed(0)); hl.style.setProperty('--rp', ((V.start - d) / V.start).toFixed(4));
    setO('dist', d);
    var on = null; caps.forEach(function (li) { if (d <= +li.getAttribute('data-at')) on = li; });
    caps.forEach(function (li) { var a = li === on; li.classList.toggle('on', a); li.inert = !a; });
    hl.setAttribute('data-d', d);
  };
  if (hl && window.matchMedia('(pointer: fine)').matches && hlLive) {
    hl.addEventListener('pointermove', function (e) { var r = hl.querySelector('.hl-stick').getBoundingClientRect(); hl.style.setProperty('--tx2', (e.clientX - r.left) + 'px'); hl.style.setProperty('--ty2', (e.clientY - r.top) + 'px'); hl.style.setProperty('--torch', 1); });
    hl.addEventListener('pointerleave', function () { hl.style.setProperty('--torch', 0); });
  }

  /* ------------------------------------------------ films, theirs, only on screen */
  var saver = navigator.connection && navigator.connection.saveData;
  var wakeFilm = function (v, play) {
    if (rm || saver || (!play && !v._w)) return;
    if (!v._w) { v._w = 1; $$('source[data-src]', v).forEach(function (s) { s.src = s.getAttribute('data-src'); }); v.load(); }
    if (play) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause();
  };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { wakeFilm(e.target, e.isIntersecting); }); }, { rootMargin: '120px 0px' });
    $$('video[data-film]').forEach(function (v) { io.observe(v); });
  }

  /* ------------------------------------------------ the countdown, to an example date */
  var cd = $('[data-cd]');
  var tick = function () {
    if (!cd) return; var ms = Math.max(0, new Date(cd.getAttribute('data-at')).getTime() - Date.now());
    var s = Math.floor(ms / 1000);
    setO('cdd', pad(Math.floor(s / 86400))); setO('cdh', pad(Math.floor(s % 86400 / 3600))); setO('cdm', pad(Math.floor(s % 3600 / 60))); setO('cds', pad(s % 60));
  };
  tick(); setInterval(tick, 1000);

  /* ------------------------------------------------ reserving, and the bib */
  var rs = $('[data-rs]'), bib = $('[data-bib]'), done = $('.bib-w [data-done]');
  if (rs) rs.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('[data-err]', rs), em = rs.email.value.trim();
    var bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? 'Please check your email address.' : '';
    err.hidden = !bad; err.textContent = bad;
    if (bad) { rs.email.focus(); return; }
    S.email = em; S.paid = true;
    var h = 0; for (var i = 0; i < em.length; i++) h = (h * 31 + em.charCodeAt(i)) >>> 0;
    setO('bibn', String(1000 + h % 9000));
    bib.classList.add('paid');
    var c = cityById(S.city);
    done.hidden = false;
    done.textContent = 'Reserved. €1 paid and 30% off locked for launch day. Early access goes to ' + em + '. Your number is an example, and in this prototype nothing is charged or sent.';
    render();
  });

  /* ------------------------------------------------ the Adventure Vest cart */
  var cart = $('[data-cart]'), cartBody = $('[data-cartbody]'), lastFocus = null;
  var openCart = function () { lastFocus = document.activeElement; cart.hidden = false; $('[data-cart-close]').focus(); };
  var closeCart = function () { cart.hidden = true; if (lastFocus) lastFocus.focus(); };
  var drawCart = function () {
    setO('cartn', S.cart);
    cartBody.innerHTML = S.cart ? '<div class="row"><img src="/media/vest-540.webp" width="72" height="72" alt=""><div><p><b>BWILD Adventure Vest</b></p><p>Two flasks included. Qty ' + S.cart + '</p></div><p><b>€' + (98 * S.cart) + '</b></p></div><p>Free shipping for the launch.</p>' : '<p>Nothing in it yet.</p>';
  };
  $$('[data-add]').forEach(function (b) { b.addEventListener('click', function () { S.cart++; drawCart(); openCart(); }); });
  $$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', function () { drawCart(); openCart(); }); });
  $('[data-cart-close]').addEventListener('click', closeCart);
  cart.addEventListener('click', function (e) { if (e.target === cart) closeCart(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !cart.hidden) closeCart(); });

  /* ------------------------------------------------ the menu on phones */
  var mb = $('.mbtn'), nl = $('#mnav');
  if (mb && nl) {
    var setM = function (o) { nl.classList.toggle('open', o); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    mb.addEventListener('click', function () { setM(mb.getAttribute('aria-expanded') !== 'true'); });
    $$('a', nl).forEach(function (a) { a.addEventListener('click', function () { setM(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mb.getAttribute('aria-expanded') === 'true') { setM(false); mb.focus(); } });
  }

  /* ------------------------------------------------ the header's tone, and the bar that carries the run */
  var tones = $$('[data-hdr-tone]'), hh = function () { return $('.hdr').offsetHeight; };
  var heroCta = $('[data-hero-cta]'), sbar = $('[data-sbar]');
  var others = $$('main a[href="#reserve"], [data-rs]');
  var inView = function (el) { if (!el) return false; var r = el.getBoundingClientRect(); return r.width > 0 && r.top < window.innerHeight && r.bottom > 0; };
  var visible = function (el) { if (!el || !inView(el)) return false; var li = el.closest('li'); return !li || !hlLive || li.classList.contains('on'); };
  var chrome = function () {
    var y = hh() + 2, tone = 'night';
    for (var i = 0; i < tones.length; i++) { var r = tones[i].getBoundingClientRect(); if (r.top <= y && r.bottom > y) { tone = tones[i].getAttribute('data-hdr-tone'); break; } }
    html.setAttribute('data-hdr', tone);
    var on = heroCta.getBoundingClientRect().bottom < 0 && !others.some(visible);
    sbar.classList.toggle('on', on); sbar.setAttribute('aria-hidden', on ? 'false' : 'true'); $('a', sbar).tabIndex = on ? 0 : -1;
  };

  var ticking = false;
  var update = function () { ticking = false; hlUpdate(); chrome(); };
  var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', function () { drawStars(); render(); req(); });
  drawStars(); render(); update();
  window.__bwild = { S: S, altitude: altitude, event: event, yearOf: yearOf, cityById: cityById, isDark: isDark, runMs: runMs };
})();
