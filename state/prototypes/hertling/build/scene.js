/* Home page scenes. Each reads its own scroll position and writes CSS variables, nothing else.
   Under reduced motion every scene jumps between its states instead of moving. */
(function () {
  var d = document, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || d).querySelectorAll(s)); }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  var jobs = [];
  function tick() { jobs.forEach(function (f) { f(); }); }
  var queued = false;
  function onScroll() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; tick(); }); }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* 2. the black box turns to glass, the network draws itself, the devices get their tags, the log arrives */
  var gb = $('[data-gb]');
  if (gb) {
    var cube = $('.cube', gb), net = $('.cube-net', gb), tags = $$('.np-tag', gb);
    jobs.push(function () {
      var r = gb.getBoundingClientRect(), span = r.height - innerHeight;
      var p = clamp(-r.top / (span || 1));
      var o = 1 - clamp((p - 0.16) / 0.3), e = clamp((p - 0.3) / 0.25), lg = clamp((p - 0.72) / 0.12);
      if (reduce) { o = p < 0.3 ? 1 : 0; e = o ? 0 : 1; lg = p < 0.66 ? 0 : 1; }
      cube.style.setProperty('--o', o.toFixed(3));
      net.style.setProperty('--e', e.toFixed(3));
      tags.forEach(function (t, i) { t.style.setProperty('--tg', reduce ? (p < 0.5 ? 0 : 1) : clamp((p - 0.48 - i * 0.03) / 0.08).toFixed(3)); });
      gb.style.setProperty('--l', lg.toFixed(3));
      gb.style.setProperty('--p', p.toFixed(3));
      gb.setAttribute('data-s', p < 0.3 ? '0' : p < 0.66 ? '1' : '2');
    });
  }

  /* 3. four Bausteine, the item nearest the middle of the screen chooses the picture */
  var bs = $('[data-bs]');
  if (bs) {
    var items = $$('.bs-it', bs), media = $$('.bs-m', bs), cap = $('[data-bs-cap]', bs), cur = -1;
    var wide = matchMedia('(min-width: 861px)');
    function show(n) {
      if (n === cur) return; cur = n;
      items.forEach(function (it, i) { it.classList.toggle('on', i === n); });
      media.forEach(function (m, i) {
        m.classList.toggle('on', i === n);
        var v = $('video', m);
        if (!v) return;
        if (i === n && wide.matches && !reduce && !(navigator.connection && navigator.connection.saveData)) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause();
      });
      if (cap) cap.textContent = '0' + (n + 1) + ' / 04';
    }
    jobs.push(function () {
      var r = bs.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) { media.forEach(function (m) { var v = $('video', m); if (v) v.pause(); }); cur = -2; return; }
      var mid = innerHeight / 2, best = 0, bd = 1e9;
      items.forEach(function (it, i) { var b = it.getBoundingClientRect(), c = Math.abs((b.top + b.bottom) / 2 - mid); if (c < bd) { bd = c; best = i; } });
      show(best);
    });
  }

  /* 4. the documentation window arrives at an angle and lies flat, the chips float at their own speed */
  var dc = $('[data-dc]');
  if (dc) {
    var win = $('.dc-win', dc), stage = $('.dc-stage', dc), chips = $$('[data-par]', dc);
    jobs.push(function () {
      var r = stage.getBoundingClientRect();
      var a = reduce ? 1 : clamp((innerHeight - r.top) / (innerHeight * 0.85));
      win.style.setProperty('--a', a.toFixed(3));
      var c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      chips.forEach(function (ch) { ch.style.setProperty('--py', reduce ? 0 : (c * +ch.getAttribute('data-par')).toFixed(1)); });
    });
  }

  /* 5. Hamburg moves slower than the page */
  var hh = $('[data-hh]');
  if (hh) jobs.push(function () {
    var r = hh.getBoundingClientRect();
    hh.style.setProperty('--p', reduce ? 0.5 : clamp((innerHeight - r.top) / (innerHeight + r.height)).toFixed(3));
  });

  /* 6. the band from his logo draws itself under the three steps */
  var st = $('[data-st]');
  if (st) {
    var band = $('.st-band', st);
    jobs.push(function () {
      var r = band.getBoundingClientRect();
      band.style.setProperty('--d', reduce ? 1 : clamp((innerHeight * 0.9 - r.top) / (innerHeight * 0.55)).toFixed(3));
    });
  }

  /* 7. the dial fills to the example result once it's on screen */
  var sc = $('[data-sc]');
  if (sc) {
    var dial = $('[data-dial]', sc), done = false;
    jobs.push(function () {
      if (done) return;
      var r = dial.getBoundingClientRect();
      if (r.top < innerHeight * 0.85 && r.bottom > 0) { done = true; dial.style.setProperty('--v', dial.getAttribute('data-dial')); sc.classList.add('in'); }
    });
  }
  tick();
})();

/* The quick contact bar on phones. It stays out of the way while the hero buttons or the booking form are on screen. */
(function () {
  var bar = document.querySelector('.mbar');
  if (!bar || !('IntersectionObserver' in window)) return;
  var seen = new Set();
  bar.classList.add('off');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); });
    bar.classList.toggle('off', seen.size > 0);
  });
  ['.hero-ctas', '#termin'].forEach(function (s) { var el = document.querySelector(s); if (el) io.observe(el); });
})();
