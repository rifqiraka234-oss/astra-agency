/* BeBetter. Language, header, menu, reveals, film. */
(function () {
  var d = document, root = d.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- language, English is the default and the no script state */
  var enTitle = d.title;
  function setLang(l, save) {
    root.lang = l;
    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false'); });
    var t = $('title'); d.title = l === 'nl' ? (t.getAttribute('data-nl') || enTitle) : enTitle;
    $$('*').forEach(function (e) {
      for (var i = 0; i < e.attributes.length; i++) {
        var a = e.attributes[i];
        if (a.name.indexOf('data-nl-') !== 0) continue;
        var name = a.name.slice(8), keep = 'data-en-' + name;
        if (!e.hasAttribute(keep)) e.setAttribute(keep, e.getAttribute(name) || '');
        e.setAttribute(name, l === 'nl' ? a.value : e.getAttribute(keep));
      }
    });
    $$('option[data-nl]').forEach(function (o) {
      if (!o.hasAttribute('data-en')) o.setAttribute('data-en', o.textContent);
      o.textContent = l === 'nl' ? o.getAttribute('data-nl') : o.getAttribute('data-en');
    });
    if (save) { try { localStorage.setItem('bb-lang', l); } catch (e) {} }
    d.dispatchEvent(new CustomEvent('bb-lang', { detail: l }));
  }
  $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); }); });
  setLang(root.lang === 'nl' ? 'nl' : 'en', false);

  /* ---------------------------------------------------------------- header and menu */
  var top = $('[data-top]');
  function sc() { if (top) top.classList.toggle('scrolled', scrollY > 8); }
  addEventListener('scroll', sc, { passive: true }); sc();
  var mb = $('.menu-b'), menu = $('#menu');
  function close() { menu.hidden = true; mb.setAttribute('aria-expanded', 'false'); root.classList.remove('menu-open'); }
  if (mb && menu) {
    mb.addEventListener('click', function () { var o = menu.hidden; menu.hidden = !o; mb.setAttribute('aria-expanded', o ? 'true' : 'false'); root.classList.toggle('menu-open', o); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { close(); mb.focus(); } });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', close); });
  }

  /* ---------------------------------------------------------------- film plays only on screen, never under reduced motion or data saver */
  $$('[data-film]').forEach(function (v) {
    var still = reduce || (navigator.connection && navigator.connection.saveData);
    if (still || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
    }, { threshold: 0.15 }).observe(v);
  });

  /* ---------------------------------------------------------------- dust drifting in the stage lights, only while they're on screen */
  $$('.beams').forEach(function (beams) {
    if (reduce || !('IntersectionObserver' in window)) return;
    var cv = d.createElement('canvas'), cx = cv.getContext('2d'), motes = [], on = false, last = 0;
    cv.className = 'pr-dust'; cv.setAttribute('aria-hidden', 'true'); beams.appendChild(cv);
    for (var m = 0; m < 70; m++) motes.push({ x: Math.random(), y: Math.random(), s: .5 + Math.random() * 1.6, v: .004 + Math.random() * .012, ph: Math.random() * 6.3, a: .12 + Math.random() * .4 });
    function size() { var r = devicePixelRatio || 1; cv.width = beams.clientWidth * r; cv.height = beams.clientHeight * r; cx.setTransform(r, 0, 0, r, 0, 0); }
    function draw(t) {
      if (!on) return;
      var dt = last ? Math.min(.034, (t - last) / 1000) : .016, w = beams.clientWidth, h = beams.clientHeight; last = t;
      cx.clearRect(0, 0, w, h); cx.fillStyle = '#ffe9c8';
      motes.forEach(function (p) {
        p.y -= p.v * dt; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        cx.globalAlpha = p.a * (0.5 + 0.5 * Math.sin(t / 900 + p.ph));
        cx.beginPath(); cx.arc((p.x + Math.sin(t / 2400 + p.ph) * .012) * w, p.y * h, p.s, 0, 6.283); cx.fill();
      });
      requestAnimationFrame(draw);
    }
    size(); addEventListener('resize', size);
    new IntersectionObserver(function (es) { var was = on; on = es[0].isIntersecting; if (on && !was) { last = 0; requestAnimationFrame(draw); } }).observe(beams);
  });

  /* ---------------------------------------------------------------- reveals, by position */
  var rv = $$('.rv');
  function look() {
    var h = innerHeight;
    rv = rv.filter(function (e) { var r = e.getBoundingClientRect(); if (r.top < h * 0.92 && r.bottom > 0) { e.classList.add('in'); return false; } return true; });
  }
  if (reduce) rv.forEach(function (e) { e.classList.add('in'); });
  addEventListener('scroll', look, { passive: true });
  addEventListener('resize', look);
  look();
})();
