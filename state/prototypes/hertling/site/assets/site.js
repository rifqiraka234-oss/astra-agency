/* Systemhaus-Hertling. Language, live hours, header, menu, reveals. */
(function () {
  var d = document, root = d.documentElement;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- language */
  var deTitle = d.title;
  function setLang(l, save) {
    root.lang = l;
    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false'); });
    var t = $('title'); d.title = l === 'en' ? (t.getAttribute('data-en') || deTitle) : deTitle;
    $$('*').forEach(function (e) {
      for (var i = 0; i < e.attributes.length; i++) {
        var a = e.attributes[i];
        if (a.name.indexOf('data-en-') !== 0) continue;
        var name = a.name.slice(8), keep = 'data-de-' + name;
        if (!e.hasAttribute(keep)) e.setAttribute(keep, e.getAttribute(name) || '');
        e.setAttribute(name, l === 'en' ? a.value : e.getAttribute(keep));
      }
    });
    $$('option[data-en]').forEach(function (o) {
      if (!o.hasAttribute('data-de')) o.setAttribute('data-de', o.textContent);
      o.textContent = l === 'en' ? o.getAttribute('data-en') : o.getAttribute('data-de');
    });
    if (save) { try { localStorage.setItem('sh-lang', l); } catch (e) {} }
    d.dispatchEvent(new CustomEvent('sh-lang', { detail: l }));
    hours();
  }
  $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); }); });

  /* ---------------------------------------------------------------- live hours, Monday to Friday 8 to 18, Berlin time */
  function berlin() {
    var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    return { day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(o.weekday), min: (+o.hour % 24) * 60 + (+o.minute) };
  }
  function hours() {
    var b = berlin(), en = root.lang === 'en';
    var open = b.day < 5 && b.min >= 480 && b.min < 1080;
    var next;
    if (open) next = en ? 'Available now, until 6pm' : 'Jetzt erreichbar, bis 18 Uhr';
    else if (b.day < 5 && b.min < 480) next = en ? 'Available from 8am today' : 'Heute ab 8 Uhr erreichbar';
    else if (b.day < 4) next = en ? 'Available again tomorrow from 8am' : 'Morgen ab 8 Uhr wieder erreichbar';
    else next = en ? 'Available again Monday from 8am' : 'Montag ab 8 Uhr wieder erreichbar';
    $$('[data-live]').forEach(function (e) {
      e.classList.toggle('on', open);
      var t = $('[data-live-t]', e); if (t) t.textContent = next;
    });
    root.classList.toggle('is-open', open);
  }
  setLang(root.lang === 'en' ? 'en' : 'de', false);
  setInterval(hours, 60000);

  /* ---------------------------------------------------------------- header and menu */
  var top = $('[data-top]');
  function sc() { if (top) top.classList.toggle('scrolled', scrollY > 8); }
  addEventListener('scroll', sc, { passive: true }); sc();
  var mb = $('.menu-b'), menu = $('#menu');
  if (mb && menu) {
    mb.addEventListener('click', function () { var o = menu.hidden; menu.hidden = !o; mb.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { menu.hidden = true; mb.setAttribute('aria-expanded', 'false'); mb.focus(); } });
  }

  /* ---------------------------------------------------------------- tabs, arrow keys move between them */
  $$('[data-tabs]').forEach(function (box) {
    var tabs = $$('[role="tab"]', box);
    function show(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t, p = d.getElementById(x.getAttribute('aria-controls'));
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        p.hidden = !on;
        p.classList.toggle('in', on);
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t); });
      t.addEventListener('keydown', function (e) {
        var j = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (j === undefined) return;
        e.preventDefault();
        show(tabs[(j + tabs.length) % tabs.length], true);
      });
    });
    show(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0]);
    $$('.doc-p', box).forEach(function (p) { p.classList.remove('in'); });
  });

  /* ---------------------------------------------------------------- switch ports, one tab stop, arrows step through */
  $$('[data-sw]').forEach(function (sw) {
    var ports = $$('button.sw-p', sw).sort(function (a, b) { return a.getAttribute('data-port') - b.getAttribute('data-port'); });
    var read = $('[data-sw-read]', sw);
    function pick(p, focus) {
      ports.forEach(function (x) { x.classList.toggle('on', x === p); x.tabIndex = x === p ? 0 : -1; });
      read.textContent = p.getAttribute('aria-label');
      if (focus) p.focus();
    }
    ports.forEach(function (p, i) {
      p.addEventListener('click', function () { pick(p); });
      p.addEventListener('mouseenter', function () { pick(p); });
      p.addEventListener('keydown', function (e) {
        var j = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: ports.length - 1 }[e.key];
        if (j === undefined) return;
        e.preventDefault();
        pick(ports[Math.max(0, Math.min(ports.length - 1, j))], true);
      });
    });
    var first = ports.filter(function (p) { return p.tabIndex === 0; })[0] || ports[0];
    pick(first);
    d.addEventListener('sh-lang', function () { var on = ports.filter(function (p) { return p.classList.contains('on'); })[0]; if (on) read.textContent = on.getAttribute('aria-label'); });
  });

  /* ---------------------------------------------------------------- services sub nav follows the section in view */
  var sv = $$('.sv'), svl = $$('.sv-nav a');
  if (sv.length && svl.length) {
    var mark = function () {
      var cur = null;
      sv.forEach(function (s) { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id; });
      svl.forEach(function (a) { var on = a.getAttribute('href') === '#' + cur; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    };
    addEventListener('scroll', mark, { passive: true }); mark();
  }

  /* ---------------------------------------------------------------- film plays only while it's on screen, never under reduced motion or data saver */
  $$('[data-film]').forEach(function (v) {
    var still = matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.connection && navigator.connection.saveData);
    if (still || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
    }, { threshold: 0.15 }).observe(v);
  });

  /* ---------------------------------------------------------------- reveals, by position so clipped elements still fire */
  var rv = $$('.rv');
  function reveal() {
    var h = innerHeight;
    rv = rv.filter(function (e) { var r = e.getBoundingClientRect(); if (r.top < h * 0.9 && r.bottom > 0) { e.classList.add('in'); return false; } return true; });
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) rv.forEach(function (e) { e.classList.add('in'); });
  else { addEventListener('scroll', reveal, { passive: true }); addEventListener('resize', reveal); reveal(); }
})();
