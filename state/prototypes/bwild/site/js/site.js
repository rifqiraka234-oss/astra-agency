/* BWILD v2. One run carried down the page {city, t, email, cart}. The sky follows the chapter in view (js/sky.js),
   their claw opens onto their film, the stars are the runner's own dark runs worked out from the sun (NOAA's
   equations), headlights come up behind the vest, the orange chapter plays their render's shot for each spec, and their
   bear opens onto the Swiss Peaks. Reduced motion and no script keep the whole page. */
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
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var prog = function (el) { var r = el.getBoundingClientRect(), span = el.offsetHeight - window.innerHeight; return clamp(-r.top / Math.max(1, span), 0, 1); };
  var ease = function (x) { return x * x * (3 - 2 * x); };

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
  var fmts = {};
  var parts = function (ms, tz) {
    var f = fmts[tz] || (fmts[tz] = new Intl.DateTimeFormat('en-GB', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }));
    var o = {}; f.formatToParts(new Date(ms)).forEach(function (p) { if (p.type !== 'literal') o[p.type] = +p.value; });
    return o;
  };
  var offsetMin = function (ms, tz) { var p = parts(ms, tz); return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ms / 1000) * 1000) / 60000); };
  var cityById = function (id) { return D.cities.filter(function (c) { return c.id === id; })[0]; };
  var years = {};
  /* a year of sunrises, the zone's offset looked up once a week at noon, and day by day only across a clock change */
  var yearOf = function (c) {
    if (years[c.id]) return years[c.id];
    var now = parts(Date.now(), c.tz), out = [], noon = Date.UTC(now.year, now.month - 1, now.day, 12), off = [];
    var offAt = function (i) { return off[i] !== undefined ? off[i] : (off[i] = offsetMin(noon + i * 864e5, c.tz)); };
    for (var a = 0; a < 364; a += 7) {
      var z = Math.min(a + 7, 364), same = offAt(a) === offAt(z);
      for (var k = a + 1; k < z; k++) { if (same) off[k] = off[a]; else offAt(k); }
    }
    var loc = function (ms, i) { return ms === null ? null : (((ms / 60000 + off[i]) % 1440) + 1440) % 1440; };
    for (var i = 0; i < 365; i++) {
      var dt = new Date(Date.UTC(now.year, now.month - 1, now.day + i));
      var y = dt.getUTCFullYear(), mo = dt.getUTCMonth() + 1, d = dt.getUTCDate();
      out.push({ y: y, mo: mo, d: d, wd: dt.getUTCDay(), rise: loc(event(y, mo, d, c.lat, c.lon, true), i), set: loc(event(y, mo, d, c.lat, c.lon, false), i) });
    }
    return (years[c.id] = out);
  };
  var isDark = function (x, t) { if (x.rise === null || x.set === null) return false; return t < x.rise || t > x.set; };
  var darkMin = function (x, t) { return !isDark(x, t) ? 0 : t < x.rise ? x.rise - t : t - x.set; };
  var dayName = function (x) { return x.d + ' ' + MONTHS[x.mo - 1]; };
  var runMs = function (c, t) {
    var now = parts(Date.now(), c.tz), guess = Date.UTC(now.year, now.month - 1, now.day, 0, 0) + t * 60000;
    return guess - offsetMin(guess, c.tz) * 60000;
  };
  /* the same hash as build.py, so a star keeps its place */
  var hsh = function (i, k) { var v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };

  /* ------------------------------------------------ the one state */
  var S = { city: 'geneva', t: D.picks.sunrise, email: '', cart: 0, paid: false };
  var pickOf = function (t) { return t < 720 ? 'sunrise' : 'night'; };
  var line = function () {
    var c = cityById(S.city), yr = yearOf(c), x = yr[0];
    if (x.rise !== null && S.t < x.rise) return 'Today in ' + c.name + ' the sun rises at ' + hm(x.rise) + ', so a ' + hm(S.t) + ' run starts ' + dur(x.rise - S.t) + ' before it, in the dark.';
    if (x.set !== null && S.t > x.set) return 'Today in ' + c.name + ' the sun sets at ' + hm(x.set) + ', so a ' + hm(S.t) + ' run starts ' + dur(S.t - x.set) + ' after it, in the dark.';
    var nxt = yr.filter(function (z) { return isDark(z, S.t); })[0];
    return 'Today in ' + c.name + ' a ' + hm(S.t) + ' run is in daylight.' + (nxt ? ' From ' + dayName(nxt) + ' it won’t be.' : '');
  };
  var counts = function () {
    var c = cityById(S.city), yr = yearOf(c), n = 0, best = 0, bs = -1, cur = 0, cs = 0;
    yr.forEach(function (x, i) { if (isDark(x, S.t)) { n++; if (!cur) cs = i; cur++; if (cur > best) { best = cur; bs = cs; } } else cur = 0; });
    return { n: n, best: best, bs: bs, yr: yr, c: c };
  };

  /* ------------------------------------------------ the stars, one per run that starts in the dark */
  var stars = $$('[data-stars] circle'), starSky = $('[data-starsky]'), months = $$('[data-months] text');
  /* the stars' own patch of sky, right of the words on a wide screen, a band above them on a phone */
  var skyBox = function () {
    var w = starSky ? starSky.clientWidth : 1440, h = starSky ? starSky.clientHeight : 900, ph = w < 760;
    return ph ? { w: w, h: h, x0: .07 * w, x1: .93 * w, y0: .15 * h, y1: .43 * h, ph: true } : { w: w, h: h, x0: .46 * w, x1: .96 * w, y0: .17 * h, y1: .6 * h, ph: false };
  };
  var layStars = function (k) {
    var b = skyBox();
    if (starSky && b.w > 0) starSky.setAttribute('viewBox', '0 0 ' + b.w + ' ' + b.h);
    k.yr.forEach(function (x, i) {
      var c = stars[i]; if (!c) return;
      var m = darkMin(x, S.t), on = m > 0;
      var cx = b.x0 + i / 364 * (b.x1 - b.x0) + (hsh(i, 1) - .5) * 4;
      var cy = b.y1 - Math.min(m, 150) / 150 * (b.y1 - b.y0) + (hsh(i, 2) - .5) * 18;
      c.setAttribute('cx', cx.toFixed(1)); c.setAttribute('cy', cy.toFixed(1)); c.setAttribute('r', ((1.1 + Math.min(m, 90) / 90 * 2.1) * (b.ph ? .85 : 1)).toFixed(2));
      c.classList.toggle('on', on); c._i = i;
    });
    months.forEach(function (t, j) {
      t.setAttribute('x', (b.x0 + +t.getAttribute('data-i') / 364 * (b.x1 - b.x0)).toFixed(0)); t.setAttribute('y', (b.y0 - (b.ph ? 20 : 26)).toFixed(0));
      t.style.display = b.ph && j % 2 ? 'none' : '';
    });
  };
  var tip = $('[data-tip]'), stick = $('.dk-stick');
  var showTip = function (c) {
    if (!c || !c.classList.contains('on')) { tip.classList.remove('on'); return; }
    stars.forEach(function (s) { s.classList.toggle('hit', s === c); });
    var k = counts(), x = k.yr[c._i], m = darkMin(x, S.t);
    tip.textContent = DAYS[x.wd] + ' ' + dayName(x) + ', ' + hm(S.t) + '. ' + (S.t < x.rise ? 'Sunrise ' + hm(x.rise) + ', ' + dur(m) + ' later.' : 'Sunset ' + hm(x.set) + ', ' + dur(m) + ' before.');
    var r = c.getBoundingClientRect(), b = stick.getBoundingClientRect();
    tip.style.left = clamp(r.left + r.width / 2 - b.left, 120, b.width - 120) + 'px'; tip.style.top = (r.top - b.top) + 'px';
    tip.classList.add('on');
  };
  var sg = $('[data-stars]');
  if (sg) {
    sg.addEventListener('pointerover', function (e) { if (e.target.tagName === 'circle') showTip(e.target); });
    sg.addEventListener('pointerout', function (e) { if (e.target.tagName === 'circle') { tip.classList.remove('on'); e.target.classList.remove('hit'); } });
    sg.addEventListener('click', function (e) { if (e.target.tagName === 'circle') showTip(e.target); });
  }

  /* ------------------------------------------------ render, every display reads the state */
  var render = function () {
    var c = cityById(S.city), k = counts(), pick = pickOf(S.t), label = (pick === 'sunrise' ? 'Sunrise' : 'Night');
    setO('time', hm(S.t));
    var tm = $('[data-time]'); if (tm) { tm.setAttribute('aria-valuenow', S.t); tm.setAttribute('aria-valuetext', hm(S.t)); }
    $$('[data-pick]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-pick') === pick ? 'true' : 'false'); });
    setO('skyline', line());
    setO('darkn', k.n); setO('cityname', c.name);
    setO('streak', k.best ? 'The longest stretch runs from ' + dayName(k.yr[k.bs]) + ' to ' + dayName(k.yr[k.bs + k.best - 1]) + ', ' + k.best + (k.best === 1 ? ' run.' : ' runs in a row.') : 'At this time it stays light all year.');
    setO('chartsum', k.n + ' of the next 365 runs at ' + hm(S.t) + ' in ' + c.name + ' start before sunrise or after sunset.');
    var run = label + ' · ' + hm(S.t) + ' · ' + c.name;
    setO('runline', run); if (!S.paid) setO('bibrun', run);
    setO('sbar', '€1 today · 30% off at launch · ' + label + ' ' + hm(S.t) + ' ' + c.name);
    layStars(k); req();
  };
  var setT = function (t) { S.t = clamp(Math.round(t / 5) * 5, 240, 1380); render(); };
  $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function () { setT(D.picks[b.getAttribute('data-pick')]); }); });
  $$('[data-dt]').forEach(function (b) { b.addEventListener('click', function () { setT(S.t + +b.getAttribute('data-dt')); }); });
  var tm = $('[data-time]');
  if (tm) {
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
  }
  var cs = $('[data-city]'); if (cs) cs.addEventListener('change', function (e) { S.city = e.target.value; render(); });

  /* ------------------------------------------------ 1. the claw opens onto their film */
  var hero = $('#run'), claw = $('[data-claw]'), heroLive = hero && hero.classList.contains('live');
  var CLAW = { u: .494, v: .5 }; /* the widest point of the middle slash, measured from their logo */
  var heroUpdate = function () {
    if (!heroLive) return;
    var p = prog(hero), w = claw.clientWidth, h = claw.clientHeight, phone = w < 760;
    var H0 = (phone ? .38 : .86) * window.innerHeight, W0 = H0 * 268 / 340;
    var l0 = (w - W0) * (phone ? .5 : .8), t0 = (h - H0) * (phone ? .03 : .58);
    var X = l0 + CLAW.u * W0, Y = t0 + CLAW.v * H0;
    var k = ease(clamp(p / .62, 0, 1)), z = 1 + Math.pow(k, 2.1) * 46;
    var Hs = H0 * z, Ws = W0 * z, cx = X + (w / 2 - X) * k, cy = Y + (h / 2 - Y) * k;
    claw.style.setProperty('--vs', (1.3 - .3 * k).toFixed(4));
    claw.style.setProperty('--vx', ((l0 + W0 / 2 - w / 2) * (1 - k)).toFixed(1) + 'px');
    claw.style.setProperty('--vy', ((phone ? -.22 * h : 0) * (1 - k)).toFixed(1) + 'px');
    claw.style.setProperty('--mh', Hs.toFixed(1) + 'px');
    claw.style.setProperty('--mx', (cx - CLAW.u * Ws).toFixed(1) + 'px');
    claw.style.setProperty('--my', (cy - CLAW.v * Hs).toFixed(1) + 'px');
    hero.style.setProperty('--ho', clamp(1 - p * 3.2, 0, 1).toFixed(3));
    hero.style.setProperty('--hw', clamp((p - .5) / .22, 0, 1).toFixed(3));
    hero.style.setProperty('--hs', clamp((p - .42) / .3, 0, 1).toFixed(3));
    /* the faded copy's controls leave the tab order, its heading stays for screen readers */
    $$('.when, .buy, .alt', $('[data-hero-copy]')).forEach(function (e) { e.inert = p > .3; });
  };

  /* ------------------------------------------------ 2. the sun sets behind their ridge, and the stars come out */
  var dk = $('#dark'), dkLive = dk && dk.classList.contains('live'), ridge = $('[data-ridge]'), lamp = $('[data-lamp]');
  var dkq = $('[data-dkq]'), dkn = $('[data-dkn]'), rlen = ridge ? ridge.getTotalLength() : 0;
  var dkP = 1;
  var dkUpdate = function () {
    if (!dkLive) return;
    var p = prog(dk); dkP = p;
    dk.style.setProperty('--p', ease(clamp((p - .05) / .7, 0, 1)).toFixed(3));
    dk.style.setProperty('--so', clamp((p - .42) / .18, 0, 1).toFixed(3));
    dk.style.setProperty('--qo', (1 - clamp((p - .3) / .1, 0, 1)).toFixed(3));
    var no = clamp((p - .46) / .12, 0, 1); dk.style.setProperty('--no', no.toFixed(3));
    dkq.inert = p > .4; dkn.inert = no < .5;
    dk.style.setProperty('--lo', clamp((p - .3) / .2, 0, 1).toFixed(3));
    if (ridge && lamp) {
      /* the headlamp climbs their ridge, along the front path from the saddle to near the peak */
      var a = rlen * (.18 + .55 * clamp(p, 0, 1)), pt = ridge.getPointAtLength(a);
      lamp.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + (pt.y - 6).toFixed(1) + ')');
    }
  };

  /* ------------------------------------------------ 3. headlights come up behind the vest */
  var hl = $('[data-hl]'), V = D.visibility, hlLive = hl && hl.classList.contains('live');
  var caps = hl ? $$('.caps li', hl) : [], hlStick = hl && $('.fl-stick', hl), spark = $('[data-spark]'), sparkOn = 0;
  var hlUpdate = function () {
    if (!hlLive) return;
    var p = prog(hl);
    var d = Math.round(V.start - p * (V.start - V.end));
    var near = clamp(V.end / d, 0, 1);
    var flare = d <= V.bfu ? clamp(.7 + (V.bfu - d) / 80, 0, 1) : clamp((V.bfu + 14 - d) / 14, 0, 1) * .15;
    hlStick.style.setProperty('--s', Math.max(.12, Math.pow(near, .72)).toFixed(4));
    hlStick.style.setProperty('--lit', (.14 + .6 * Math.sqrt(near)).toFixed(3));
    hlStick.style.setProperty('--flare', flare.toFixed(3));
    sparkOn = flare;
    setO('dist', d);
    var on = null; caps.forEach(function (li) { if (d <= +li.getAttribute('data-at')) on = li; });
    caps.forEach(function (li) { var a = li === on; li.classList.toggle('on', a); li.inert = !a; });
    hl.setAttribute('data-d', d);
  };
  /* glints on the reflective panel and slashes while it's lit */
  var sparkLoop = function () {
    if (spark && sparkOn > .3 && !rm && spark.getBoundingClientRect().bottom > 0 && spark.getBoundingClientRect().top < window.innerHeight) {
      var w = spark.clientWidth, h = spark.clientHeight;
      if (spark.width !== w) { spark.width = w; spark.height = h; }
      var x = spark.getContext('2d'); x.clearRect(0, 0, w, h);
      for (var i = 0; i < 26; i++) {
        var zone = Math.random() < .3, px = zone ? w * (.33 + Math.random() * .2) : w * (.08 + Math.random() * .84), py = zone ? h * (.07 + Math.random() * .2) : h * (.6 + Math.random() * .32);
        var r = (Math.random() * 1.6 + .4) * (w / 300), g = x.createRadialGradient(px, py, 0, px, py, r * 4);
        g.addColorStop(0, 'rgba(255,255,255,' + (.9 * sparkOn) + ')'); g.addColorStop(1, 'rgba(200,225,255,0)');
        x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 4, 0, 7); x.fill();
      }
    } else if (spark && spark.width) { spark.getContext('2d').clearRect(0, 0, spark.width, spark.height); }
    setTimeout(function () { requestAnimationFrame(sparkLoop); }, 70);
  };

  /* ------------------------------------------------ films, theirs, only on screen */
  var saver = navigator.connection && navigator.connection.saveData;
  var wakeFilm = function (v, play) {
    if (rm || saver || (!play && !v._w)) return;
    if (!v._w) { v._w = 1; $$('source[data-src]', v).forEach(function (s) { s.src = s.getAttribute('data-src'); }); v.load(); }
    if (v.hasAttribute('data-seek')) return; /* the orange chapter plays its own shots */
    if (play) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause();
  };
  /* the claw's film starts once the page has loaded, so the words, the fonts and the still frame come first */
  var heroFilm = $('[data-hero-film]'), heroGo = false;
  var inViewFilm = function () { var r = heroFilm.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; };
  var heroPlay = function () { if (!heroGo || rm || saver || !heroFilm) return; var p = heroFilm.play(); if (p && p.catch) p.catch(function () {}); };
  var heroStart = function () { heroGo = true; if (heroFilm && !rm && !saver) { heroFilm.preload = 'auto'; if (inViewFilm()) heroPlay(); } };
  if (document.readyState === 'complete') setTimeout(heroStart, 60); else window.addEventListener('load', function () { setTimeout(heroStart, 60); });
  /* every still frame waits until its film is a screen or so away, in every mode */
  var posters = $$('video[data-poster]'), givePoster = function (v) { if (!v.poster) v.poster = v.getAttribute('data-poster'); };
  if ('IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { givePoster(e.target); pio.unobserve(e.target); } }); }, { rootMargin: '100% 0px' });
    posters.forEach(function (v) { pio.observe(v); });
  } else posters.forEach(givePoster);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { wakeFilm(e.target, e.isIntersecting); }); }, { rootMargin: '160px 0px' });
    $$('video[data-film]').forEach(function (v) { io.observe(v); });
    if (heroFilm) new IntersectionObserver(function (es) { es.forEach(function (e) { if (rm || saver) return; if (e.isIntersecting) heroPlay(); else heroFilm.pause(); }); }).observe(heroFilm);
  }

  /* ------------------------------------------------ 5. the Adventure Vest, their render plays the shot for each spec */
  var seek = $('[data-seek]'), seg = null, specs = $$('[data-seg]');
  var playSeg = function (li) {
    specs.forEach(function (s) { s.classList.toggle('on', s === li); });
    if (!seek || rm || saver) return;
    var ab = li.getAttribute('data-seg').split(':'); seg = [+ab[0], +ab[1]];
    wakeFilm(seek, true);
    var go = function () { try { seek.currentTime = seg[0]; } catch (e) {} var p = seek.play(); if (p && p.catch) p.catch(function () {}); };
    if (seek.readyState >= 1) go(); else seek.addEventListener('loadedmetadata', go, { once: true });
  };
  if (seek) seek.addEventListener('timeupdate', function () { if (seg && seek.currentTime >= seg[1]) seek.currentTime = seg[0]; });
  if (specs.length && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) playSeg(e.target); }); }, { rootMargin: window.innerWidth < 980 ? '-66% 0px -24% 0px' : '-45% 0px -45% 0px' });
    specs.forEach(function (li) { sio.observe(li); });
  }

  /* ------------------------------------------------ 6. their bear opens onto the Swiss Peaks */
  var st = $('#story'), pin = st && $('.st-pin', st), bw = $('[data-bearwin]'), stLive = st && st.classList.contains('live');
  var BEAR = { u: .312, v: .387 }; /* the deepest point of their bear, measured from the trace */
  var stUpdate = function () {
    if (!stLive || !pin) return;
    var p = prog(pin), w = bw.clientWidth, h = bw.clientHeight, phone = w < 760;
    var W0 = phone ? .92 * w : Math.min(.44 * w, 660), H0 = W0 * 636 / 1040;
    var l0 = (w - W0) * (phone ? .5 : .96), t0 = (h - H0) * (phone ? .74 : .62);
    var X = l0 + BEAR.u * W0, Y = t0 + BEAR.v * H0, k = ease(clamp((p - .12) / .6, 0, 1));
    var z = 1 + Math.pow(k, 2) * 12, Ws = W0 * z, Hs = H0 * z, cx = X + (w / 2 - X) * k, cy = Y + (h / 2 - Y) * k;
    bw.style.setProperty('--bw', Ws.toFixed(1) + 'px');
    bw.style.setProperty('--bx', (cx - BEAR.u * Ws).toFixed(1) + 'px');
    bw.style.setProperty('--by', (cy - BEAR.v * Hs).toFixed(1) + 'px');
    st.style.setProperty('--to', clamp(1 - (p - .1) * 3.4, 0, 1).toFixed(3));
    st.style.setProperty('--oo', clamp((p - .62) / .2, 0, 1).toFixed(3));
  };
  var phs = $$('.ph');
  var phUpdate = function () {
    if (rm || window.innerWidth < 980) return;
    phs.forEach(function (el, i) { var r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > window.innerHeight + 200) return; el.style.setProperty('--py', ((r.top + r.height / 2 - window.innerHeight / 2) * ((i % 3) - 1) * -.08).toFixed(1)); });
  };

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

  /* ------------------------------------------------ the sky, the header, and the bar that offers the chapter's next step */
  var hdr = $('.hdr'), secs = $$('main > section, .ftr'), heroCta = $('[data-hero-cta]'), sbar = $('[data-sbar]');
  var acts = { reserve: $$('main a[href="#reserve"], [data-rs]'), buy: $$('main [data-add]') };
  var inView = function (el) { if (!el) return false; var r = el.getBoundingClientRect(); return r.width > 0 && r.top < window.innerHeight && r.bottom > 0; };
  var visible = function (el) { if (!inView(el)) return false; var li = el.closest('li'); if (li && hlLive && li.closest('.caps')) return li.classList.contains('on'); var q = el.closest('[inert]'); return !q; };
  var goalNow = 'reserve';
  var chrome = function () {
    var mid = window.innerHeight / 2, sec = null;
    for (var i = 0; i < secs.length; i++) { var r = secs[i].getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) { sec = secs[i]; break; } }
    if (sec && window.__sky) {
      var sky = sec.getAttribute('data-sky');
      if (sky === 'dawn' && pickOf(S.t) === 'night') sky = 'nightmoon';
      window.__sky.to(sky, sky === 'sundown' ? dkP : 0);
      /* the sky rests while only chapters that paint their own ground are on screen */
      window.__sky.rest(!secs.some(function (x) { return !x.hasAttribute('data-own') && inView(x); }));
    }
    hdr.classList.toggle('solid', window.scrollY > 40);
    var goal = (sec && sec.getAttribute('data-goal')) || 'reserve';
    if (goal !== goalNow) { goalNow = goal; $$('[data-sbg]', sbar).forEach(function (g) { g.hidden = g.getAttribute('data-sbg') !== goal; }); }
    var on = heroCta.getBoundingClientRect().bottom < 0 && !(acts[goal] || []).some(visible) && !(heroLive && prog(hero) < .95);
    sbar.classList.toggle('on', on); sbar.setAttribute('aria-hidden', on ? 'false' : 'true');
    $$('a, button', sbar).forEach(function (b) { b.tabIndex = on && !b.closest('[hidden]') ? 0 : -1; });
  };

  var ticking = false;
  var update = function () { ticking = false; heroUpdate(); dkUpdate(); hlUpdate(); stUpdate(); phUpdate(); chrome(); };
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', function () { rlen = ridge ? ridge.getTotalLength() : 0; render(); req(); });
  render(); update(); if (spark && !rm) sparkLoop();
  window.addEventListener('skyready', req);
  window.__bwild = { S: S, altitude: altitude, event: event, yearOf: yearOf, cityById: cityById, isDark: isDark, runMs: runMs, hsh: hsh };
})();
