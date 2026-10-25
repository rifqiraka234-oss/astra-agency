/* Saavedra, the scenes. The sky follows the clock, embers at night, the runner across the 9e, the sun and runner drifting.
   Every scene writes CSS variables or classes only, and each has a still state without JavaScript and under reduced motion. */
(function () {
  var d = document, root = d.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function mix(a, b, t) { var x = hex(a), y = hex(b); return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(x[i] + (y[i] - x[i]) * t); }).join(',') + ')'; }

  /* ---------------------------------------------------------------- the day, one sky per hour, the sun crossing it */
  function mixDark(f, keys) { var i = Math.round(f); return keys[i] === 'noche'; }
  var SKY = { midi: ['#bde3fa', '#034a91'], crema: ['#fde2ce', '#034a91'], tarde: ['#f29cb6', '#021b38'], noche: ['#021b38', '#fde2ce'] };
  $$('[data-day]').forEach(function (day) {
    if (reduce) return;
    var steps = $$('.day-step', day), stage = $('.day-stage', day), sun = $('.sky-sun', day), n = steps.length;
    var dots = $$('.sky-dots button', day), cur = -1;
    day.style.setProperty('--steps', n);
    var keys = steps.map(function (s) { return s.getAttribute('data-sky'); });
    function frame() {
      var r = day.getBoundingClientRect(), span = r.height - innerHeight;
      var p = span > 0 ? clamp(-r.top / span, 0, 1) : 0;
      /* each hour holds its own sky for most of its stretch and hands over quickly at the edge */
      var f = clamp(p * n - 0.5, 0, n - 1), i = Math.floor(f), t = f - i, j = Math.min(n - 1, i + 1);
      t = t < 0.3 ? 0 : t > 0.7 ? 1 : (function (x) { return x * x * (3 - 2 * x); })((t - 0.3) / 0.4);
      var a = SKY[keys[i]], b = SKY[keys[j]];
      var sky = mix(a[0], b[0], t);
      stage.style.setProperty('--sky', sky);
      /* the header takes the colour of the hour while the day is under it */
      if (r.top <= 0 && r.bottom > 80) root.style.setProperty('--top-bg', sky.replace('rgb(', 'rgba(').replace(')', ',.86)'));
      else root.style.removeProperty('--top-bg');
      stage.style.setProperty('--fg', mix(a[1], b[1], t));
      var idx = Math.min(n - 1, Math.floor(p * n + 0.0001));
      if (idx !== cur) {
        steps.forEach(function (s, k) { s.classList.toggle('cur', k === idx); s.setAttribute('aria-hidden', k === idx ? 'false' : 'true'); s.inert = k !== idx; });
        dots.forEach(function (b, k) { b.setAttribute('aria-current', k === idx ? 'true' : 'false'); });
        cur = idx;
      }
      day.classList.toggle('dark', keys[idx] === 'noche');
      stage.setAttribute('data-tone', mixDark(f, keys) ? 'dark' : 'light');
      /* sun, high at midday, low and warm by 18h30, gone at night */
      var night = keys.indexOf('noche'), dayEnd = night > 0 ? (night - 0.1) / n : 1;
      var s = clamp(p / dayEnd, 0, 1);
      if (sun) {
        /* the sun sets behind the clock on wide screens, and crosses the empty top half on phones, never over the words */
        var wide = innerWidth > 800;
        sun.style.setProperty('--sx', (wide ? 34 - 24 * s : 25 + 55 * s).toFixed(2));
        sun.style.setProperty('--sy', ((wide ? 22 + 53 * Math.pow(s, 1.6) : 16 + 22 * s) + (p > dayEnd ? (p - dayEnd) * 260 : 0)).toFixed(2));
        sun.style.setProperty('--so', p > dayEnd ? clamp(1 - (p - dayEnd) * 10, 0, 1).toFixed(3) : 1);
        sun.style.color = mix('#f6b40e', '#ff8a3d', clamp((s - 0.4) / 0.6, 0, 1));
      }
      stage.style.setProperty('--eo', night > 0 ? clamp((f - (night - 0.5)) * 2, 0, 1).toFixed(3) : 0);
    }
    dots.forEach(function (b, k) {
      b.addEventListener('click', function () {
        var r = day.getBoundingClientRect(), top = scrollY + r.top, span = r.height - innerHeight;
        scrollTo({ top: top + span * ((k + 0.5) / n), behavior: 'smooth' });
      });
    });
    addEventListener('scroll', frame, { passive: true });
    addEventListener('resize', frame);
    frame();
  });

  /* ---------------------------------------------------------------- embers, drawn only while on screen */
  $$('canvas.embers').forEach(function (cv) {
    var ctx = cv.getContext('2d'), parts = [], w = 0, h = 0, dpr = Math.min(2, devicePixelRatio || 1), on = false, raf = 0;
    function size() { var r = cv.getBoundingClientRect(); w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function spawn(any) { return { x: Math.random() * w, y: any ? Math.random() * h : h + 10, r: 0.8 + Math.random() * 2.4, v: 0.25 + Math.random() * 0.9, ph: Math.random() * 6.28, life: 0.5 + Math.random() * 0.5 }; }
    function draw(still) {
      ctx.clearRect(0, 0, w, h);
      parts.forEach(function (p) {
        if (!still) { p.y -= p.v; p.ph += 0.02; p.x += Math.sin(p.ph) * 0.35; if (p.y < -10) { var q = spawn(false); p.x = q.x; p.y = q.y; p.v = q.v; } }
        var k = clamp(p.y / h, 0, 1), a = p.life * (0.25 + 0.75 * k) * (0.7 + 0.3 * Math.sin(p.ph * 3));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = 'rgba(' + (k > 0.5 ? '255,140,60,' : '246,180,14,') + a.toFixed(3) + ')';
        ctx.shadowColor = 'rgba(255,106,43,.8)'; ctx.shadowBlur = 8; ctx.fill();
      });
    }
    function loop() { draw(false); if (on) raf = requestAnimationFrame(loop); }
    function init() { size(); var count = Math.round(clamp(w * h / 9000, 30, 140)); parts = []; for (var i = 0; i < count; i++) parts.push(spawn(true)); draw(true); }
    init();
    addEventListener('resize', function () { init(); });
    if (reduce || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { on = e.isIntersecting; cancelAnimationFrame(raf); if (on) loop(); });
    }).observe(cv);
  });

  /* ---------------------------------------------------------------- the 9e, the runner carries the tray along a real walking route */
  $$('[data-walk]').forEach(function (sec) {
    var map = $('.walk-map', sec), svg = $('svg', map), runner = $('.walk-runner', sec), pin = $('.walk-pin', sec);
    var btns = $$('[data-route-btn]', sec), anim = 0, started = false;
    var R = JSON.parse($('script[type="application/json"]', sec).textContent);
    function scale() { var r = svg.getBoundingClientRect(); return [r.width / R.w, r.height / R.h]; }
    function place(el, x, y, vx, vy) { var k = scale(); el.style.setProperty(vx, (x * k[0]).toFixed(1) + 'px'); el.style.setProperty(vy, (y * k[1]).toFixed(1) + 'px'); }
    function go(key, instant) {
      cancelAnimationFrame(anim);
      var path = $('.mp-r[data-route="' + key + '"]', svg), info = R.routes.filter(function (x) { return x.key === key; })[0];
      if (!path || !info) return;
      $$('.mp-r', svg).forEach(function (p) { p.classList.toggle('cur', p === path); });
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-route-btn') === key ? 'true' : 'false'); });
      var len = path.getTotalLength(); path.style.setProperty('--len', len.toFixed(1));
      pin.hidden = true;
      var dur = clamp(info.m * 4.2, 1400, 3600), t0 = performance.now(), last = path.getPointAtLength(0);
      function step(now) {
        var k = instant ? 1 : clamp((now - t0) / dur, 0, 1), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        var pt = path.getPointAtLength(len * e);
        path.style.setProperty('--rd', e.toFixed(4));
        place(runner, pt.x, pt.y, '--rx', '--ry');
        if (Math.abs(pt.x - last.x) > 0.6) runner.style.setProperty('--rf', pt.x < last.x ? -1 : 1);
        last = pt;
        if (k < 1) anim = requestAnimationFrame(step);
        else {
          var bt = btns.filter(function (x) { return x.getAttribute('data-route-btn') === key; })[0];
          if (bt) pin.textContent = $('b', bt).textContent + ', ' + $('span', bt).textContent;
          place(pin, pt.x, pt.y, '--px', '--py'); pin.hidden = false;
        }
      }
      anim = requestAnimationFrame(step);
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { go(b.getAttribute('data-route-btn'), reduce); }); });
    var first = btns.length ? btns[0].getAttribute('data-route-btn') : null;
    function kick() { if (!started && first) { started = true; go(first, reduce); } }
    if (reduce || !('IntersectionObserver' in window)) kick();
    else new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { kick(); o.disconnect(); } }); }, { threshold: 0.35 }).observe(map);
    addEventListener('resize', function () { var cur = btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0]; if (cur) go(cur.getAttribute('data-route-btn'), true); });
  });

  /* ---------------------------------------------------------------- what's inside each recipe, on hover or keyboard focus */
  var ingOut = $('[data-ing-out]');
  if (ingOut) {
    var ingDef = ingOut.innerHTML, ingT;
    $$('[data-ing]').forEach(function (a) {
      function show() {
        clearTimeout(ingT);
        var b = d.createElement('b'); b.textContent = a.textContent;
        ingOut.textContent = ''; ingOut.appendChild(b);
        ingOut.appendChild(d.createTextNode(' ' + a.getAttribute(root.lang === 'en' ? 'data-ing-en' : 'data-ing')));
        ingOut.parentNode.classList.add('on');
      }
      function hide() { ingT = setTimeout(function () { ingOut.innerHTML = ingDef; ingOut.parentNode.classList.remove('on'); }, 300); }
      a.addEventListener('mouseenter', show); a.addEventListener('focus', show);
      a.addEventListener('mouseleave', hide); a.addEventListener('blur', hide);
    });
  }

  /* ---------------------------------------------------------------- their photos drift faster while the page moves */
  var strip = $('.strip');
  if (strip && !reduce && strip.getAnimations && 'IntersectionObserver' in window) {
    var lastY = scrollY, vel = 0, sraf = 0, sOn = false;
    var sloop = function () {
      var y = scrollY; vel = vel * 0.9 + Math.abs(y - lastY) * 0.1; lastY = y;
      var a = strip.getAnimations()[0]; if (a) a.playbackRate = 1 + Math.min(vel / 3, 9);
      if (sOn) sraf = requestAnimationFrame(sloop);
    };
    new IntersectionObserver(function (es) { sOn = es[0].isIntersecting; cancelAnimationFrame(sraf); if (sOn) { lastY = scrollY; sloop(); } }).observe(strip);
  }

  /* ---------------------------------------------------------------- drift, the hero sun and the order runner move a little with the page */
  var hs = $('.hero-sun'), ord = $('.order');
  function drift() {
    if (hs) hs.style.setProperty('--sunY', clamp(scrollY / 12, 0, 60).toFixed(2));
    if (ord) { var r = ord.getBoundingClientRect(); ord.style.setProperty('--rp', clamp(1 - (r.top + r.height) / (innerHeight + r.height), 0, 1).toFixed(3)); }
  }
  if (!reduce) { addEventListener('scroll', drift, { passive: true }); drift(); }
})();
