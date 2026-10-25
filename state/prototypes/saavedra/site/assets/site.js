/* Saavedra. Language, live hours, header, menu, reveals, words, counters. */
(function () {
  var d = document, root = d.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- language */
  var frTitle = d.title;
  function setLang(l, save) {
    root.lang = l;
    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false'); });
    var t = $('title'); d.title = l === 'en' ? (t.getAttribute('data-en') || frTitle) : frTitle;
    $$('*').forEach(function (e) {
      for (var i = 0; i < e.attributes.length; i++) {
        var a = e.attributes[i];
        if (a.name.indexOf('data-en-') !== 0) continue;
        var name = a.name.slice(8), keep = 'data-fr-' + name;
        if (!e.hasAttribute(keep)) e.setAttribute(keep, e.getAttribute(name) || '');
        e.setAttribute(name, l === 'en' ? a.value : e.getAttribute(keep));
      }
    });
    $$('option[data-en]').forEach(function (o) {
      if (!o.hasAttribute('data-fr')) o.setAttribute('data-fr', o.textContent);
      o.textContent = l === 'en' ? o.getAttribute('data-en') : o.getAttribute('data-fr');
    });
    if (save) { try { localStorage.setItem('sv-lang', l); } catch (e) {} }
    d.dispatchEvent(new CustomEvent('sv-lang', { detail: l }));
    hours();
  }
  $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); }); });

  /* ---------------------------------------------------------------- open now, from the hours they publish, Paris time */
  var H = null;
  try { var hs = $('#sv-hours'); if (hs) H = JSON.parse(hs.textContent); } catch (e) {}
  function paris() {
    var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    return { day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(o.weekday), min: (+o.hour % 24) * 60 + (+o.minute) };
  }
  function hm(s) { var a = s.split(':'); return +a[0] * 60 + (+a[1]); }
  function fmtT(m, en) { var h = Math.floor(m / 60), mm = m % 60; return en ? (h % 12 || 12) + (mm ? '.' + ('0' + mm).slice(-2) : '') + (h < 12 ? 'am' : 'pm') : h + 'h' + (mm ? ('0' + mm).slice(-2) : ''); }
  function hours() {
    var live = $$('[data-live]'); if (!live.length || !H) return;
    var now = paris(), en = root.lang === 'en', open = null, next = null;
    (H[now.day] || []).forEach(function (s) { var a = hm(s[0]), b = hm(s[1]); if (now.min >= a && now.min < b) open = b; else if (now.min < a && next === null) next = [0, a]; });
    for (var k = 1; next === null && k < 8; k++) { var dd = (now.day + k) % 7; if ((H[dd] || []).length) next = [k, hm(H[dd][0][0]), dd]; }
    var days = en ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    var txt;
    if (open !== null) txt = en ? 'Open now, until ' + fmtT(open, en) : 'Ouvert, jusqu’à ' + fmtT(open, en);
    else if (next && next[0] === 0) txt = en ? 'Opens today at ' + fmtT(next[1], en) : 'Ouvre aujourd’hui à ' + fmtT(next[1], en);
    else if (next && next[0] === 1) txt = en ? 'Opens tomorrow at ' + fmtT(next[1], en) : 'Ouvre demain à ' + fmtT(next[1], en);
    else if (next) txt = en ? 'Opens ' + days[next[2]] + ' at ' + fmtT(next[1], en) : 'Ouvre ' + days[next[2]] + ' à ' + fmtT(next[1], en);
    live.forEach(function (e) { e.classList.toggle('on', open !== null); var t = $('[data-live-t]', e); if (t && txt) t.textContent = txt; });
  }
  setLang(root.lang === 'en' ? 'en' : 'fr', false);
  setInterval(hours, 60000);

  /* ---------------------------------------------------------------- header and menu */
  var top = $('[data-top]');
  function sc() { if (top) top.classList.toggle('scrolled', scrollY > 8); }
  addEventListener('scroll', sc, { passive: true }); sc();
  var mb = $('.menu-b'), menu = $('#menu');
  if (mb && menu) {
    mb.addEventListener('click', function () { var o = menu.hidden; menu.hidden = !o; mb.setAttribute('aria-expanded', o ? 'true' : 'false'); root.classList.toggle('menu-open', o); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { menu.hidden = true; mb.setAttribute('aria-expanded', 'false'); root.classList.remove('menu-open'); mb.focus(); } });
  }

  /* ---------------------------------------------------------------- film plays only on screen, never under reduced motion or data saver */
  $$('[data-film]').forEach(function (v) {
    var still = reduce || (navigator.connection && navigator.connection.saveData);
    if (still || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
    }, { threshold: 0.15 }).observe(v);
  });

  /* ---------------------------------------------------------------- headlines arrive word by word, each language on its own */
  var heads = $$('[data-words]');
  if (!reduce) heads.forEach(function (h) {
    var parts = $$('.l-fr, .l-en', h);
    (parts.length ? parts : [h]).forEach(function (part) {
      var n = 0, walk = d.createTreeWalker(part, NodeFilter.SHOW_TEXT), nodes = [];
      while (walk.nextNode()) nodes.push(walk.currentNode);
      nodes.forEach(function (t) {
        var bits = t.nodeValue.split(/([ \t\n\r]+)/), f = d.createDocumentFragment();
        bits.forEach(function (b) {
          if (!b) return;
          if (/^[ \t\n\r]+$/.test(b)) { f.appendChild(d.createTextNode(b)); return; }
          var w = d.createElement('span'); w.className = 'w'; w.style.setProperty('--i', n++); w.textContent = b; f.appendChild(w);
        });
        t.parentNode.replaceChild(f, t);
      });
    });
  });

  /* ---------------------------------------------------------------- numbers count up once, in the reader's own format */
  var counts = $$('[data-count]');
  function fmt(el, v) {
    var dec = +el.getAttribute('data-dec') || 0, en = root.lang === 'en', suf = el.getAttribute('data-suf') || '';
    var s = v.toFixed(dec); if (!en) s = s.replace('.', ',');
    el.textContent = s + suf;
  }
  function run(el) {
    var to = +el.getAttribute('data-count');
    el.setAttribute('data-ran', '1');
    if (reduce) { fmt(el, to); return; }
    var t0 = performance.now();
    (function step(now) { var k = Math.min(1, (now - t0) / 1600); fmt(el, to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  d.addEventListener('sv-lang', function () { counts.forEach(function (el) { if (el.getAttribute('data-ran')) fmt(el, +el.getAttribute('data-count')); }); });

  /* ---------------------------------------------------------------- reveals and the header's tone, by position */
  var rv = $$('.rv'), all = counts.slice();
  function look() {
    var h = innerHeight;
    rv = rv.filter(function (e) { var r = e.getBoundingClientRect(); if (r.top < h * 0.9 && r.bottom > 0) { e.classList.add('in'); return false; } return true; });
    heads = heads.filter(function (e) { var r = e.getBoundingClientRect(); if (r.top < h * 0.9 && r.bottom > 0) { e.classList.add('words-in'); return false; } return true; });
    counts = counts.filter(function (e) { var r = e.getBoundingClientRect(); if (r.top < h * 0.86 && r.bottom > 0) { run(e); return false; } return true; });
    if (top) {
      var tone = 'light', tones = $$('[data-tone]');
      for (var i = 0; i < tones.length; i++) { var r = tones[i].getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) { tone = tones[i].getAttribute('data-tone'); break; } }
      top.classList.toggle('on-dark', tone === 'dark');
    }
  }
  if (reduce) { rv.forEach(function (e) { e.classList.add('in'); }); heads.forEach(function (e) { e.classList.add('words-in'); }); }
  addEventListener('scroll', look, { passive: true });
  addEventListener('resize', look);
  look();
  if (reduce) all.forEach(function (e) { if (!e.getAttribute('data-ran')) run(e); });
})();
