/* The hero. The shop opens: the awning rolls up like a shutter, the festoon bulbs come on one by one, their top hat
   drops onto the counter, flips over like a magician's hat and the dessert you pick rises out of it with a cloud of
   sweets. Scroll and the hat tips its opening toward you, you fall in, and their lilac drips flood down into the
   builder. The 3D loads after the page has; until then, and without WebGL, a still of the same scene shows.
   Exposes window.CharlieHero3D. */
(function () {
  'use strict';
  var O = window.CharlieOrder;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hero = $('#open'), pin = $('.hero__pin'), wipe = $('#dive-wipe'), copy = $('.hero__copy'), canvas = $('#hero-gl');
  var awning = $('.awning'), festoonEl = $('#festoon'), lifts = [$('.sticker'), $('.hero__logo-top')].filter(Boolean);
  var scene = null, sceneReady = false, opened = false, wantIntro = !reduced, bulbsList = [];

  // ---------- festoon bulbs, strung in sagging spans under the awning ----------
  function festoon() {
    var W = window.innerWidth, D = W >= 1024, span = D ? 360 : 190, sag = D ? 20 : 12, gap = D ? 54 : 40;
    var n = Math.ceil(W / span), path = 'M0 6', parts = [];
    for (var i = 0; i < n; i++) { var x0 = i * span, x1 = x0 + span; path += ' Q' + (x0 + span / 2) + ' ' + (6 + sag * 2) + ' ' + x1 + ' 6'; }
    parts.push('<svg viewBox="0 0 ' + W + ' 70" preserveAspectRatio="none"><defs><radialGradient id="halo"><stop offset="0" stop-color="#ffe2a3" stop-opacity=".85"/><stop offset=".4" stop-color="#ffc874" stop-opacity=".35"/><stop offset="1" stop-color="#ffc874" stop-opacity="0"/></radialGradient></defs>');
    parts.push('<path d="' + path + '" fill="none" stroke="#12031f" stroke-width="1.6"/>');
    for (var x = gap / 2; x < W; x += gap) {
      var seg = Math.floor(x / span), u = (x - seg * span) / span, y = 6 + sag * 2 * 2 * u * (1 - u);
      parts.push('<g class="b" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"><circle class="halo" cx="0" cy="13" r="' + (D ? 22 : 16) + '"/><rect x="-2.5" y="0" width="5" height="5" fill="#12031f"/><ellipse class="bulb" cx="0" cy="12" rx="5" ry="7"/><ellipse cx="-1.6" cy="9.5" rx="1.5" ry="2.4" fill="#fff" opacity=".75"/></g>');
    }
    parts.push('</svg>'); festoonEl.innerHTML = parts.join('');
    bulbsList = $$('.b', festoonEl);
    return bulbsList;
  }
  function lightBulbs(list, instant) {
    if (instant || reduced) { list.forEach(function (b) { b.classList.add('is-lit'); }); $('.hero__bokeh').classList.add('is-on'); return; }
    list.forEach(function (b, i) { setTimeout(function () { b.classList.add('is-lit'); }, 35 * i); });
    setTimeout(function () { $('.hero__bokeh').classList.add('is-on'); }, 200);
  }

  // ---------- the shop opens ----------
  // The shutter is down with their sign on it while the 3D loads, then it rolls up and the hat drops in. If the 3D
  // isn't ready in 2.6 s the shutter rolls anyway and the still of the same scene shows.
  var resolve3D, ready3D = new Promise(function (r) { resolve3D = r; });
  function openShop() {
    var list = festoon();
    if (!root.classList.contains('is-shut')) { lightBulbs(list, true); opened = true; return; }
    Promise.race([ready3D, new Promise(function (r) { setTimeout(r, 2600); })]).then(function () { requestAnimationFrame(function () {
      root.classList.add('is-opening'); root.classList.remove('is-shut');
      if (sceneReady && wantIntro) { wantIntro = false; setTimeout(function () { scene.playIntro(); }, 220); }
      else { wantIntro = false; root.classList.add('hero-still'); }
      setTimeout(function () { root.classList.remove('is-opening'); lightBulbs(list); opened = true; }, 1150);
    }); });
  }

  // ---------- the 3D, loaded after the page has ----------
  function script(src) { return new Promise(function (res, rej) { var s = document.createElement('script'), inl = window.__SCRIPTS && window.__SCRIPTS[src]; if (inl) { s.text = inl; document.head.appendChild(s); return res(); } s.src = src; s.async = false; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  // three.js and the 3D modules, loaded once and shared with the builder's toppings
  var threeReady = null;
  function loadThree() {
    if (!threeReady) threeReady = window.WebGLRenderingContext ? script('js/vendor/three.min.js').then(function () { return script('js/hat3d.js'); }).then(function () { return script('js/hero3d.js'); }).then(function () { return script('js/toppings3d.js'); }) : Promise.reject(new Error('no webgl'));
    return threeReady;
  }
  // The hero's 3D runs in a worker on an OffscreenCanvas where the browser has them, so three.js never blocks the
  // page. Elsewhere it runs on the page, the same code. Either way the page talks to it through the same few calls.
  function viaWorker(opts) {
    return new Promise(function (res, rej) {
      var off = canvas.transferControlToOffscreen(), wk = new Worker(window.__WORKER_SRC ? URL.createObjectURL(new Blob([window.__WORKER_SRC], { type: 'text/javascript' })) : 'js/hero-worker.js');
      var send = function (m) { wk.postMessage(m); }, to = setTimeout(function () { rej(new Error('worker slow')); }, 12000);
      var api = { worker: true, playIntro: function () { send({ type: 'intro' }); }, finish: function () { send({ type: 'finish' }); }, setDessert: function (b) { send({ type: 'base', base: b }); },
        setDive: function (p) { send({ type: 'dive', p: p }); }, pointer: function (x, y) { send({ type: 'pointer', x: x, y: y }); }, resize: function (w, h) { send({ type: 'resize', w: w, h: h }); },
        setVisible: function (v) { send({ type: 'visible', v: v }); }, renderOnce: function () { send({ type: 'still' }); }, showSweets: function (v) { send({ type: 'sweets', v: v }); } };
      wk.onmessage = function (e) { if (e.data && e.data.type === 'ready') { clearTimeout(to); res(api); } };
      wk.onerror = function (e) { clearTimeout(to); rej(e); };
      wk.postMessage({ type: 'init', canvas: off, opts: opts, intro: wantIntro }, [off]);
    });
  }
  function onPage(opts) {
    return loadThree().then(function () {
      var sc = window.CharlieHero.create(canvas, opts);
      sc.resize(opts.w, opts.h);
      return sc.warm().then(function () { sc.setDessert(opts.base, true); if (wantIntro) sc.hideForIntro(); else sc.renderOnce(); return sc; });
    });
  }
  function load3D() {
    var opts = { reducedMotion: reduced, base: O.get().base, w: canvas.clientWidth, h: canvas.clientHeight, vw: window.innerWidth, vh: window.innerHeight,
      dpr: window.devicePixelRatio || 1, mediaBase: new URL('media/', document.baseURI).href };
    var go = canvas.transferControlToOffscreen && window.Worker && window.OffscreenCanvas ? viaWorker(opts).catch(function () { var c2 = canvas.cloneNode(false); canvas.parentNode.replaceChild(c2, canvas); canvas = c2; return onPage(opts); }) : onPage(opts);
    go.then(function (api) {
      if (!api) return;
      scene = api; sceneReady = true;
      // still behind the shutter: the intro plays as it rolls up. Already open: the scene shows finished
      if (wantIntro) resolve3D(); else scene.finish();
      requestAnimationFrame(function () { root.classList.add('has-hero-gl'); });
      window.CharlieHero3D = scene;
      new IntersectionObserver(function (es) { es.forEach(function (e) { scene.setVisible(e.isIntersecting); }); }).observe(pin);
      window.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') scene.pointer(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1); }, { passive: true });
      window.addEventListener('resize', function () { clearTimeout(load3D.t); load3D.t = setTimeout(function () { scene.resize(canvas.clientWidth, canvas.clientHeight); }, 120); });
      onScroll();
    }).catch(function () { /* the still stays */ });
  }

  // a base picked in the hero: the hat swaps desserts
  function setBase(base) { if (scene) scene.setDessert(base); }

  // ---------- the dive, read from the scroll ----------
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var inOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var ticking = false;
  function onScroll() {
    if (reduced || ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var top = hero.offsetTop, range = hero.offsetHeight - window.innerHeight, p = range > 0 ? clamp((window.scrollY - top) / range, 0, 1) : 0;
      if (scene) scene.setDive(clamp(p / 0.8, 0, 1));
      // the copy and the awning lift away first, then the drips flood down
      var c = clamp(p / 0.28, 0, 1);
      copy.style.transform = 'translate3d(0,' + (-60 * c).toFixed(1) + 'px,0)'; copy.style.opacity = (1 - c).toFixed(3);
      lifts.forEach(function (el) { el.style.opacity = (1 - c).toFixed(3); });
      // the copy can't be tapped once it has lifted away, but it stays readable to a screen reader
      copy.style.pointerEvents = c >= 1 ? 'none' : '';
      var a = clamp(p / 0.45, 0, 1), ay = -(awning.offsetHeight + 80) * inOut(a);
      awning.style.transform = festoonEl.style.transform = 'translate3d(0,' + ay.toFixed(1) + 'px,0)';
      var w = inOut(clamp((p - 0.62) / 0.34, 0, 1)), H = pin.offsetHeight;
      wipe.style.transform = 'translate3d(0,' + (-(H + 210) * (1 - w)).toFixed(1) + 'px,0)';
      // Astra, 29 Oct. As the lilac lands the hero fades, and the builder waiting underneath is there at once
      var f = clamp((p - 0.86) / 0.14, 0, 1); hero.style.opacity = (1 - f).toFixed(3); hero.style.pointerEvents = f > 0 ? 'none' : '';
    });
  }

  function init() {
    openShop();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { clearTimeout(init.t); init.t = setTimeout(function () { lightBulbs(festoon(), true); onScroll(); }, 150); });
    var go = function () { (window.requestIdleCallback || function (f) { return setTimeout(f, 1); })(load3D, { timeout: 400 }); };
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
    onScroll();
  }

  window.CharlieHeroPage = { init: init, setBase: setBase, scene: function () { return scene; }, loadThree: loadThree };
})();
