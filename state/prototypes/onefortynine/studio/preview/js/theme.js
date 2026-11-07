(function () {
  'use strict';
  // The studio sends its choices here, the preview applies them without a reload.
  var HEADLINES = {
    money: null,
    product: 'An escape room in a cool box.',
    sales: 'Stock Breakout Box. Unlock new sales.',
    unboxing: 'Think escape room meets unboxing.'
  };
  var root = document.documentElement, original = null;
  function apply(s) {
    if (!s) return;
    root.dataset.palette = s.palette || 'daylight';
    root.classList.toggle('dark', s.palette === 'baize' || s.palette === 'ember');
    root.dataset.type = s.type || 'clean';
    root.dataset.hero = s.hero || 'split';
    var a = document.querySelector('.h1-a'), b = document.querySelector('.h1-b');
    if (a && original === null) original = a.innerHTML;
    if (a) {
      var h = HEADLINES[s.headline];
      a.innerHTML = h ? h : original;
      if (b) b.hidden = !!h;
    }
    var main = document.querySelector('main');
    if (main && Array.isArray(s.sections)) {
      main.style.display = 'flex'; main.style.flexDirection = 'column';
      var hero = document.querySelector('.hero'), get = document.getElementById('get');
      if (hero) hero.style.order = 0;
      s.sections.forEach(function (sec, i) {
        var el = document.getElementById(sec.id);
        if (el) { el.style.order = i + 1; el.hidden = !sec.on; }
      });
      if (get) get.style.order = 99;
    }
  }
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin) return;
    if (e.data && e.data.type === 'studio') apply(e.data.state);
  });
  try { var q = new URLSearchParams(location.search).get('s'); if (q) apply(JSON.parse(atob(q))); } catch (e) {}
  if (window.parent !== window) window.parent.postMessage({ type: 'preview-ready' }, location.origin);
})();
