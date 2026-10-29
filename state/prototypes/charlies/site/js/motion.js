/* Motion for the whole page, only when motion is on. Smooth scroll (Lenis) driving GSAP ScrollTrigger, headings that
   rise word by word out of a mask, the favourites carried sideways on a pin on desktop, their photos drifting
   against the scroll inside their frames, and the menu's drips running down as it arrives.
   Exposes window.CharlieMotion. */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lenis = null;

  function scrollTo(el) {
    if (!el) return;
    document.documentElement.classList.add('cv-all');
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.3, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }

  // each word of a heading in its own mask, so it can rise into place
  function splitWords(h) {
    if (h.dataset.split) return; h.dataset.split = '1';
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            var o = document.createElement('span'); o.className = 'rv-line'; var i = document.createElement('span'); i.textContent = w; o.appendChild(i); frag.appendChild(o);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(h);
  }

  // GSAP, ScrollTrigger and Lenis load after the first paint, they're only for motion
  function script(src) { return new Promise(function (res, rej) { var s = document.createElement('script'), inl = window.__SCRIPTS && window.__SCRIPTS[src]; if (inl) { s.text = inl; document.head.appendChild(s); return res(); } s.src = src; s.async = false; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  // the roll call: the scroll picks the frame, and frames cut hard, no tweens between them
  function roll() {
    var sec = $('#roll'); if (!sec) return;
    var frames = $$('.roll__f', sec), cur = -1, tick = false;
    var on = function () {
      tick = false; var r = sec.getBoundingClientRect(), range = sec.offsetHeight - window.innerHeight;
      var p = range > 0 ? Math.max(0, Math.min(0.9999, -r.top / range)) : 0, i = Math.floor(p * frames.length);
      if (i !== cur) { if (frames[cur]) frames[cur].classList.remove('is-on'); frames[i].classList.add('is-on'); cur = i; }
    };
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(on); } }, { passive: true });
    on();
  }
  function init() {
    if (reduced) return;
    roll();
    // after the page has loaded and gone quiet, so it never competes with the first screen
    var go = function () { Promise.all([script('js/vendor/gsap.min.js'), script('js/vendor/ScrollTrigger.min.js'), script('js/vendor/lenis.min.js')]).then(setup).catch(function () {}); };
    var idle = function () { (window.requestIdleCallback || function (f) { return setTimeout(f, 200); })(go, { timeout: 1500 }); };
    if (document.readyState === 'complete') idle(); else window.addEventListener('load', idle);
  }
  function setup() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    if (window.Lenis) {
      lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    // headings rise word by word as they come on screen
    $$('.step__h, .favs__h, .menu__h, .order__h, .party__h, .shops__h, .fav__name, .mg__h').forEach(function (h) {
      splitWords(h);
      gsap.from($$('.rv-line > span', h), { yPercent: 115, rotate: 4, duration: 0.95, ease: 'expo.out', stagger: 0.05,
        scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
    });

    // the favourites travel sideways while the section is pinned, on a wide screen
    var mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', function () {
      var track = $('#favs-track'), pinEl = $('.favs__pin');
      var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 48); };
      gsap.to(track, { x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: { trigger: '#favourites', pin: pinEl, start: 'top top', end: function () { return '+=' + dist(); }, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 } });
      // each photo leans in as it crosses the middle
      $$('.fav', track).forEach(function (f) {
        gsap.fromTo($('.fav__pic', f), { rotate: -2.5, scale: 0.94 }, { rotate: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: '#favourites', start: 'top top', end: function () { return '+=' + dist(); }, scrub: true } });
      });
    });

    // their photos drift against the scroll inside their frames
    $$('.mg__pic img').forEach(function (img) {
      gsap.fromTo(img, { yPercent: -7, scale: 1.14 }, { yPercent: 7, scale: 1.14, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('.fav__pic img').forEach(function (img) { img.style.setProperty('--py', '0%'); });

    // the menu's drips run down as the menu arrives
    gsap.fromTo('.menu__drips', { scaleY: 0.12 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#menu', start: 'top bottom', end: 'top 20%', scrub: true } });
    // the menu's rows come in like the printed menu being laid down
    $$('.mg').forEach(function (g) {
      gsap.from($$('.mi', g), { y: 18, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.025, scrollTrigger: { trigger: g, start: 'top 90%', once: true } });
    });
    // the pick and mix wall opens out of a hat shaped window
    gsap.fromTo('#pickmix', { clipPath: 'inset(18% 30% 18% 30% round 46% 46% 6% 6%)' }, { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: '#pickmix', start: 'top bottom', end: 'top 15%', scrub: true } });
    // the shopfronts swing their awnings down
    $$('.shopfront__awning').forEach(function (a) {
      gsap.from(a, { scaleY: 0, transformOrigin: '50% 0', duration: 1.1, ease: 'elastic.out(1, 0.55)', scrollTrigger: { trigger: a, start: 'top 85%', once: true } });
    });
    if (document.readyState === 'complete') ST.refresh(); else window.addEventListener('load', function () { ST.refresh(); });
    // a chapter that skipped layout changes height when it first renders, so the triggers below it are re-measured
    var rt = 0; document.addEventListener('contentvisibilityautostatechange', function () { clearTimeout(rt); rt = setTimeout(function () { ST.refresh(); }, 150); }, true);
  }

  window.CharlieMotion = { init: init, scrollTo: scrollTo, lenis: function () { return lenis; } };
})();
