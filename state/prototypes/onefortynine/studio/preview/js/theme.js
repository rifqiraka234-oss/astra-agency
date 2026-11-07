(function () {
  'use strict';
  // The studio sends its choices here, the preview applies them without a reload.
  var HEADLINES = {
    money: null,
    product: 'An escape room in a cool box.',
    sales: 'Stock Breakout Box. Unlock new sales.',
    unboxing: 'Think escape room meets unboxing.'
  };
  var FONTS_H = {
    mona: { f: '"Mona Sans"', w: 720, v: 'normal', ls: '-0.045em' },
    fraunces: { f: '"Fraunces"', w: 820, v: '"SOFT" 100, "WONK" 0, "opsz" 144', ls: '-0.025em' },
    young: { f: '"Young Serif"', w: 400, v: 'normal', ls: '-0.02em' },
    bricolage: { f: '"Bricolage Grotesque"', w: 760, v: 'normal', ls: '-0.04em' },
    instrument: { f: '"Instrument Serif"', w: 400, v: 'normal', ls: '-0.015em' },
    unbounded: { f: '"Unbounded"', w: 700, v: 'normal', ls: '-0.04em' },
    schibsted: { f: '"Schibsted Grotesk"', w: 780, v: 'normal', ls: '-0.045em' }
  };
  var FONTS_B = { mona: '"Mona Sans"', instrument: '"Instrument Sans"', schibsted: '"Schibsted Grotesk"', bricolage: '"Bricolage Grotesque"' };
  var CUSTOM_VARS = ['--bg', '--ink', '--ink-2', '--muted', '--line', '--soft', '--grad', '--hot', '--accent', '--accent-hi', '--on-accent', '--card', '--card-hi', '--deep', '--hdr-bg', '--crack', '--band', '--on-band'];
  var root = document.documentElement, original = null;

  function rgb(h) { h = String(h || '').replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); var n = parseInt(h, 16); return isNaN(n) ? [0, 0, 0] : [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function lum(h) { return rgb(h).map(function (c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }).reduce(function (a, c, i) { return a + c * [0.2126, 0.7152, 0.0722][i]; }, 0); }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function mix(a, b, p) { return 'color-mix(in srgb, ' + a + ' ' + p + '%, ' + b + ')'; }

  function customPalette(c) {
    var dark = lum(c.bg) < 0.2;
    var onAccent = contrast(c.accent, '#ffffff') >= contrast(c.accent, '#111111') ? '#ffffff' : '#111111';
    var bandMid = c.g2;
    var onBand = contrast(bandMid, '#ffffff') >= contrast(bandMid, '#111111') ? '#ffffff' : '#111111';
    var v = {
      '--bg': c.bg, '--ink': c.ink, '--ink-2': mix(c.ink, c.bg, 84), '--muted': mix(c.ink, c.bg, 62), '--line': mix(c.ink, c.bg, 16),
      '--soft': mix(c.ink, c.bg, dark ? 6 : 4), '--grad': 'linear-gradient(100deg, ' + c.g1 + ' 0%, ' + c.g2 + ' 100%)', '--hot': c.accent,
      '--accent': c.accent, '--accent-hi': mix(c.accent, '#ffffff', 85), '--on-accent': onAccent,
      '--card': dark ? mix(c.ink, c.bg, 9) : '#ffffff', '--card-hi': mix(c.ink, c.bg, dark ? 16 : 8), '--deep': mix(c.bg, '#000000', 80),
      '--hdr-bg': mix(c.bg, 'transparent', 88), '--crack': 'radial-gradient(60% 60% at 50% 45%, ' + mix(c.g1, c.bg, dark ? 22 : 10) + ' 0%, ' + c.bg + ' 100%)',
      '--band': 'linear-gradient(110deg, ' + mix(c.g2, '#000000', 80) + ' 0%, ' + c.g2 + ' 55%, ' + c.g1 + ' 100%)', '--on-band': onBand
    };
    return { vars: v, dark: dark };
  }

  function apply(s) {
    if (!s) return;
    // colours
    CUSTOM_VARS.forEach(function (k) { root.style.removeProperty(k); });
    var dark = s.palette === 'baize' || s.palette === 'ember';
    if (s.palette === 'custom' && s.custom) {
      var cp = customPalette(s.custom);
      Object.keys(cp.vars).forEach(function (k) { root.style.setProperty(k, cp.vars[k]); });
      dark = cp.dark;
    }
    root.dataset.palette = s.palette || 'daylight';
    root.classList.toggle('dark', dark);
    // fonts
    var fh = FONTS_H[(s.fonts && s.fonts.h) || 'mona'] || FONTS_H.mona, fb = FONTS_B[(s.fonts && s.fonts.b) || 'mona'] || FONTS_B.mona;
    root.dataset.fonts = 'set'; root.dataset.fh = (s.fonts && s.fonts.h) || 'mona';
    root.style.setProperty('--font-h', fh.f + ', "Mona Sans", Georgia, serif'); root.style.setProperty('--font-h-w', fh.w);
    root.style.setProperty('--font-h-var', fh.v); root.style.setProperty('--font-h-ls', fh.ls);
    root.style.setProperty('--font-b', fb + ', "Mona Sans", "Helvetica Neue", Arial, sans-serif');
    // first screen
    root.dataset.hero = s.hero || 'split';
    var a = document.querySelector('.h1-a'), b = document.querySelector('.h1-b');
    if (a && original === null) original = a.innerHTML;
    if (a) { var h = HEADLINES[s.headline]; a.innerHTML = h ? h : original; if (b) b.hidden = !!h; }
    // what he added from the catalogue
    if (window.renderAdded) window.renderAdded(s.cat || []);
    // sections
    var main = document.querySelector('main');
    if (main && Array.isArray(s.sections)) {
      main.style.display = 'flex'; main.style.flexDirection = 'column';
      var hero = document.querySelector('.hero'), get = document.getElementById('get');
      if (hero) hero.style.order = 0;
      s.sections.forEach(function (sec, i) { var el = document.getElementById(sec.id); if (el) { el.style.order = i + 1; el.hidden = !sec.on; } });
      if (get) get.style.order = 99;
    }
  }
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin) return;
    if (e.data && e.data.type === 'studio') apply(e.data.state);
    if (e.data && e.data.type === 'scrollTo') { var el = document.getElementById(e.data.id); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (el.classList.contains('sk-block')) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } } }
  });
  try { var q = new URLSearchParams(location.search).get('s'); if (q) apply(JSON.parse(decodeURIComponent(escape(atob(q))))); } catch (e) {}
  if (window.parent !== window) window.parent.postMessage({ type: 'preview-ready' }, location.origin);
})();
