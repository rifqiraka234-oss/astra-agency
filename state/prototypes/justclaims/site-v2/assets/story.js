/* the claim file. Pinned on wide screens, driven by scroll position, five dials each at the scale of its own clock. */
(function () {
  'use strict';
  var d = document, w = window, J = w.JC || {};
  var sec = d.querySelector('[data-story]'); if (!sec) return;
  var stages = [].slice.call(sec.querySelectorAll('.stage')), dials = stages.map(function (s) { return s.querySelector('.sd'); });
  var ph = [].slice.call(sec.querySelectorAll('.playhead li'));
  var track = sec.querySelector('.story-track');
  var wide = w.matchMedia('(min-width:900px)');
  var reduce = J.reduce;
  var pinned = false, cur = -1;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dhm(min) { min = Math.round(min); var dd = Math.floor(min / 1440), hh = Math.floor((min % 1440) / 60), mm = min % 60; return pad(dd) + 'd ' + pad(hh) + 'h ' + pad(mm) + 'min'; }
  var READ = [
    function (u) { return [dhm(192 * u), 'late at the final destination']; },
    function (u) { return [dhm(96 * 60 * u), 'since the journey ended']; },
    function (u) { return ['Day ' + Math.round(41 * u), 'of nine months, drawn as 273 days']; },
    function (u) { return ['Day ' + Math.round(30 * u), 'of 30 calendar days']; },
    function (u) { var cd = Math.round(30 * u), wd = Math.min(7, Math.round(7 * Math.min(1, u / .32))); return ['Day ' + cd, wd + ' of 7 working days, day ' + cd + ' of the month']; }
  ];
  var END = [288, 360, 54, 360, 360];            // hand angle at the end of each sweep
  function setDial(i, u) {
    var dl = dials[i], n = +dl.getAttribute('data-n'), reach = +dl.getAttribute('data-reach');
    var ticks = dl.querySelectorAll('.ticks .t'), lit = Math.round(reach * u);
    for (var k = 0; k < ticks.length; k++) ticks[k].classList.toggle('dim', k >= lit);
    var inn = dl.querySelectorAll('.in2'), li = Math.round(inn.length * Math.min(1, u / .32));
    for (var q = 0; q < inn.length; q++) inn[q].classList.toggle('dim', q >= li);
    var ang = END[i] * u;
    dl.style.setProperty('--h', ang.toFixed(2) + 'deg');
    var r = READ[i](u), v = dl.querySelector('[data-v]'), uu = dl.querySelector('[data-u]');
    if (v) v.textContent = r[0]; if (uu) uu.textContent = r[1];
  }
  function final() { dials.forEach(function (dl, i) { setDial(i, 1); dl.style.setProperty('--h', END[i] + 'deg'); dl.querySelectorAll('.dim').forEach(function (e) { e.classList.remove('dim'); }); }); }
  function mode() {
    var want = wide.matches && !reduce;
    if (want === pinned) return;
    pinned = want; sec.classList.toggle('pinned', pinned);
    if (!pinned) { stages.forEach(function (s) { s.classList.remove('on'); }); final(); }
    else { cur = -1; update(); }
  }
  function update() {
    if (!pinned) return;
    var r = track.getBoundingClientRect(), vh = w.innerHeight, total = r.height - vh;
    var P = Math.min(1, Math.max(0, -r.top / total)), x = P * 5, i = Math.min(4, Math.floor(x + 1e-6)), q = x - i;
    if (P >= 1) { i = 4; q = 1; }
    var u = Math.min(1, Math.max(0, (q - .12) / .68));
    if (i !== cur) { stages.forEach(function (s, k) { s.classList.toggle('on', k === i); }); cur = i; ph.forEach(function (p, k) { p.classList.toggle('on', k === i); }); }
    // dials before the current one are complete, those after are empty, the current one follows the scroll
    dials.forEach(function (dl, k) { if (k === i) setDial(k, u); else if (k < i) setDial(k, 1); else setDial(k, 0); });
    ph.forEach(function (p, k) { p.style.setProperty('--p', k < i ? 1 : k === i ? u : 0); });
  }
  w.addEventListener('scroll', update, { passive: true }); w.addEventListener('resize', mode);
  if (wide.addEventListener) wide.addEventListener('change', mode);
  final(); mode();
})();
