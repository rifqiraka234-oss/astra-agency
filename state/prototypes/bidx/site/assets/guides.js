/* BidX guides. The film plays only while it's on screen, the strand tabs, and the two cost calculators. */
(function () {
  var d = document;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9.5-5.5z" fill="currentColor"/></svg>';

  // Film. Muted and looping, plays in view and stops out of it. Reduced motion keeps the still unless the visitor presses play.
  [].forEach.call(d.querySelectorAll('video[data-auto]'), function (v) {
    var b = v.parentNode.querySelector('.pz');
    var pauseIcon = b ? b.innerHTML : '';
    var held = still;
    var show = function () {
      if (!b) return;
      var playing = !v.paused;
      b.innerHTML = playing ? pauseIcon : PLAY;
      b.setAttribute('aria-label', playing ? 'Pause the film' : 'Play the film');
    };
    v.addEventListener('play', show); v.addEventListener('pause', show);
    if (b) b.addEventListener('click', function () {
      if (v.paused) { held = false; v.play().catch(function () {}); } else { held = true; v.pause(); }
    });
    show();
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !held) { v.preload = 'auto'; v.play().catch(function () {}); }
        else if (!e.isIntersecting && !v.paused) v.pause();
      });
    }, { threshold: 0.25 }).observe(v);
  });

  // Strand tabs on the BridgeAI guide.
  [].forEach.call(d.querySelectorAll('.strands'), function (box) {
    var btns = [].slice.call(box.querySelectorAll('button[data-strand]'));
    var panes = [].slice.call(box.querySelectorAll('.strand[data-strand]'));
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-strand');
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        panes.forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-strand') === k); });
      });
    });
  });

  var gbp = function (n) { return '£' + Math.round(n).toLocaleString('en-GB'); };
  var num = function (id) { var el = d.getElementById(id); var n = parseFloat(el && el.value); return isFinite(n) && n > 0 ? n : 0; };
  var put = function (id, t) { var el = d.getElementById(id); if (el) el.textContent = t; };
  var warn = function (id, on) { var el = d.getElementById(id); if (el) el.classList.toggle('on', on); };

  // BridgeAI. The lead's share of costs at its rate, the deployer's at its rate, and the total request the brief limits.
  var cb = d.getElementById('calc-bridge');
  if (cb) {
    var bridge = function () {
      var total = num('cb-total'), share = Math.min(num('cb-lead'), 100);
      var lead = total * share / 100, dep = total - lead;
      var g1 = lead * num('cb-size') / 100, g2 = dep * num('cb-dep') / 100;
      put('cb-g1', gbp(g1)); put('cb-own', gbp(lead - g1)); put('cb-gt', gbp(g1 + g2));
      warn('cb-w1', share < 40 || share > 70);
      warn('cb-w2', total > 0 && (g1 + g2 < 100000 || g1 + g2 > 200000));
    };
    cb.addEventListener('input', bridge); cb.addEventListener('change', bridge); bridge();
  }

  // Engineering biology. Grant at the brief's maximum rate, and the investment it needs, at least twice the grant.
  var ci = d.getElementById('calc-ip');
  if (ci) {
    var match = function () {
      var total = num('ci-total'), g = total * num('ci-size') / 100;
      put('ci-g', gbp(g)); put('ci-inv', gbp(g * 2)); put('ci-own', gbp(total - g));
      warn('ci-w', total > 0 && (g < 250000 || g > 2000000));
    };
    ci.addEventListener('input', match); ci.addEventListener('change', match); match();
  }
})();
