/* Shared behaviour for both sites. Writes classes and CSS variables only. */
(function () {
  var html = document.documentElement;
  html.classList.add('js');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm.matches) html.classList.add('rm');

  /* Header turns solid once the first screen has gone */
  var hdr = document.querySelector('.hdr');
  var firstScreen = document.querySelector('[data-first]');
  function hdrState() {
    if (!hdr) return;
    var limit = hdr.classList.contains('light-start') || !firstScreen ? 10 : firstScreen.offsetTop + firstScreen.offsetHeight - 90;
    hdr.classList.toggle('solid', window.scrollY > limit);
  }

  /* Phone menu */
  var mbtn = document.querySelector('.menu-btn');
  var mnav = document.querySelector('.mnav');
  if (mbtn && mnav) {
    var closeBtn = mnav.querySelector('.close');
    function setMenu(open) {
      mnav.classList.toggle('open', open);
      mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mnav.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) { mnav.removeAttribute('inert'); (mnav.querySelector('a') || closeBtn).focus(); }
      else { mnav.setAttribute('inert', ''); mbtn.focus(); }
      document.body.style.overflow = open ? 'hidden' : '';
    }
    mnav.setAttribute('inert', '');
    mbtn.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); });
    mnav.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    mnav.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }

  /* Reveal once, in view */
  var rvs = document.querySelectorAll('.rv, .band');
  if ('IntersectionObserver' in window && !rm.matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rvs.forEach(function (el) { io.observe(el); });
  } else {
    rvs.forEach(function (el) { el.classList.add('shown'); });
  }

  /* Counters count once, in view */
  var counts = document.querySelectorAll('[data-count]');
  function fmt(n, loc) { return n.toLocaleString(loc || html.lang || 'nl'); }
  if ('IntersectionObserver' in window && !rm.matches) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        var el = e.target, to = +el.getAttribute('data-count'), t0 = null, dur = 1600;
        function step(t) {
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
          el.textContent = fmt(v);
          if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counts.forEach(function (el) { el.textContent = fmt(0); co.observe(el); });
  }

  /* Scroll position of an element through the viewport, -1 to 1, written as --sy */
  var sy = document.querySelectorAll('[data-sy]');
  function syState() {
    if (rm.matches) return;
    var vh = window.innerHeight;
    sy.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > 2 * vh) return;
      var c = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.setProperty('--sy', Math.max(-1, Math.min(1, c)).toFixed(3));
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { hdrState(); syState(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  hdrState(); syState();

  window.__site = { rm: rm };
})();
