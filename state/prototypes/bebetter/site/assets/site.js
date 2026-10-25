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
