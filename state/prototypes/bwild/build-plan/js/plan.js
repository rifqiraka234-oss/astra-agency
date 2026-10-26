/* The BWILD plan. The route switches between today and the new site, the dark year is worked out live from the same
   NOAA equations as the prototype, and the built chapter follows the caption on screen. No script keeps every default. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var hm = function (m) { return pad(Math.floor(m / 60)) + '.' + pad(m % 60); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ------------------------------------------------ the route */
  var rt = $('[data-route]');
  if (rt) {
    var RD = JSON.parse($('[data-routes]', rt).textContent), rail = $('[data-rail]', rt), sum = $('[data-sum]', rt);
    $$('[data-rt]', rt).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-rt'), r = RD.routes[k];
        $$('[data-rt]', rt).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        rail.innerHTML = r.stops.map(function (s, i) {
          var tag = s.k ? '<span class="rs-k">' + esc(RD.labels[s.k]) + '</span>' : '';
          return '<li class="rs ' + (s.k || '') + '" style="--i:' + i + '"><span class="rs-o" aria-hidden="true"></span><div class="rs-x"><b>' + esc(s.t) + '</b><span>' + esc(s.p) + '</span>' + tag + '</div></li>';
        }).join('');
        sum.textContent = r.sum;
      });
    });
  }

  /* ------------------------------------------------ the dark year, NOAA's solar position equations */
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
  var localMin = function (ms, tz) { var p = parts(ms, tz); return p.hour * 60 + p.minute + p.second / 60; };
  var years = {};
  var yearOf = function (c) {
    if (years[c.id]) return years[c.id];
    var now = parts(Date.now(), c.tz), out = [];
    for (var i = 0; i < 365; i++) {
      var dt = new Date(Date.UTC(now.year, now.month - 1, now.day + i));
      var r = event(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate(), c.lat, c.lon, true), s = event(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate(), c.lat, c.lon, false);
      out.push({ rise: r === null ? null : localMin(r, c.tz), set: s === null ? null : localMin(s, c.tz) });
    }
    return (years[c.id] = out);
  };
  var dk = $('[data-dark]');
  if (dk) {
    var cities = JSON.parse($('[data-cities]', dk).textContent).cities, sel = $('[data-c]', dk), rng = $('[data-t]', dk), cells = $$('[data-strip] i', dk);
    var draw = function () {
      var c = cities.filter(function (x) { return x.id === sel.value; })[0], t = +rng.value, yr = yearOf(c), n = 0;
      yr.forEach(function (x, i) { var on = x.rise !== null && x.set !== null && (t < x.rise || t > x.set); if (on) n++; cells[i].className = on ? 'on' : ''; });
      $('[data-o="n"]', dk).textContent = n; $('[data-o="t"]', dk).textContent = hm(t); rng.setAttribute('aria-valuetext', hm(t));
    };
    sel.addEventListener('change', draw); rng.addEventListener('input', draw); draw();
    window.__plan = { yearOf: yearOf, cities: cities };
  }

  /* ------------------------------------------------ built, the frame follows the caption on screen */
  var bf = $('[data-bf]');
  if (bf && 'IntersectionObserver' in window) {
    var lis = $$('.bc li', bf), frames = $$('.bf-i', bf);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = +e.target.getAttribute('data-i');
        lis.forEach(function (l, j) { l.classList.toggle('on', j === i); });
        frames.forEach(function (f, j) { f.classList.toggle('on', j === i); });
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    lis.forEach(function (l) { io.observe(l); });
    lis[0].classList.add('on');
  }
})();
