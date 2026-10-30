/* The films, stock footage from Pexels and Mixkit under their free licences (HANDOVER.md lists each). Each one only
   loads when it's about to come on screen, plays muted and pauses off screen. Under reduced motion or data saver only
   its still shows. One source each, so a browser never fetches two: a wide screen takes the wide cut where a film has
   one. Paths are from the site's root, and the page's way back to the root goes in front. */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var save = navigator.connection && navigator.connection.saveData;
  var films = Array.prototype.slice.call(document.querySelectorAll('video.film'));
  var R = window.CD_ROOT || '', wide = window.matchMedia('(min-width: 760px)').matches;
  var at = function (p) { return /^(data:|blob:|https?:|\/)/.test(p) ? p : R + p; };
  var pick = function (v, k) { var w = v.dataset[k + 'Wide']; return at(wide && w ? w : v.dataset[k]); };
  // the still of each film arrives as it nears the screen, with motion or without
  var still = function (v) { if (v.dataset.poster && !v.poster) v.poster = pick(v, 'poster'); };
  if (!('IntersectionObserver' in window)) { films.forEach(still); return; }
  if (reduced || save) {
    var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { still(e.target); so.unobserve(e.target); } }); }, { rootMargin: '50% 0px' });
    films.forEach(function (v) { if (!v.dataset.after && !v.dataset.on) so.observe(v); });
    return;
  }
  function load(v) {
    if (v.dataset.loaded || !v.dataset.src) return; v.dataset.loaded = '1';
    var s = document.createElement('source'); s.src = pick(v, 'src'); s.type = v.dataset.type || 'video/mp4'; v.appendChild(s);
    v.load(); if (v.dataset.rate) v.playbackRate = +v.dataset.rate;
    v.addEventListener('playing', function () { v.classList.add('is-playing'); });
  }
  function play(v) { if (v.dataset.rate) v.playbackRate = +v.dataset.rate; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target; if (v.dataset.on && !v.classList.contains('is-on')) return;
      if (e.isIntersecting) { still(v); load(v); play(v); } else if (!v.paused) v.pause();
    });
  }, { rootMargin: '25% 0px' });
  films.forEach(function (v) {
    // the hero's waits until the shop is open and the visitor first moves, a mouse, a finger, a scroll or a key, so it
    // never holds up the first paint and the shop's own lights are on first
    if (v.dataset.after === 'open') {
      var started = false, evs = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'];
      var go = function () {
        if (started) return; if (document.documentElement.classList.contains('is-shut') || document.documentElement.classList.contains('is-opening')) return;
        started = true; evs.forEach(function (n) { window.removeEventListener(n, go); }); io.observe(v);
      };
      evs.forEach(function (n) { window.addEventListener(n, go, { passive: true }); });
    } else io.observe(v);
  });
  // a film that waits for a moment, like the confetti for a confirmed table
  // (off screen it waits, and the observer plays it when it comes into view, so a phone doesn't fetch it unseen)
  window.CharlieFilm = { cue: function (name) { films.forEach(function (v) { if (v.dataset.on !== name) return; v.classList.add('is-on');
    var r = v.getBoundingClientRect(); if (r.bottom > -innerHeight * 0.25 && r.top < innerHeight * 1.25) { load(v); v.currentTime = 0; play(v); } }); } };
})();
