/* For gyms, the stage. The hero tee and the studio garment lean toward the pointer, 200 tees fill the wall when the
   Hungarian order comes into view, the kits turn as they pass the middle of the rail, the studio garment turns when it
   flips. Nothing here runs under reduced motion. The screen frame and the stamp are kit.js classes and CSS. */
(function () {
  var d = document, root = d.documentElement;
  if (!root.classList.contains('motion')) return;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function lean(area, target) {
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    function go() { if (!raf) raf = requestAnimationFrame(step); }
    function step() {
      raf = 0; x += (tx - x) * .1; y += (ty - y) * .1;
      target.style.setProperty('--tx', x.toFixed(4)); target.style.setProperty('--ty', y.toFixed(4));
      if (Math.abs(tx - x) > .001 || Math.abs(ty - y) > .001) go();
    }
    area.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = area.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5; go(); });
    area.addEventListener('pointerleave', function () { tx = 0; ty = 0; go(); });
  }
  var gh = $('.gh'), ghg = $('.gh-g'), st = $('[data-k-stage]');
  if (gh && ghg) lean(gh, ghg);
  if (st) lean(st, st);

  var wf = $('.wf');
  if (wf) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { wf.classList.add('in'); io.disconnect(); } }, { threshold: .2 });
      io.observe(wf);
    } else wf.classList.add('in');
  }

  $$('[data-kr]').forEach(function (kr) {
    var items = $$('.kr-i', kr), raf = 0;
    function look() {
      raf = 0;
      var r = kr.getBoundingClientRect(), c = r.left + r.width / 2, h = r.width / 2;
      items.forEach(function (it) {
        var b = it.getBoundingClientRect(), k = clamp((b.left + b.width / 2 - c) / h, -1.3, 1.3);
        it.style.setProperty('--ry', (-k * 16).toFixed(2) + 'deg'); it.style.setProperty('--sc', (1 - Math.min(1, Math.abs(k)) * .07).toFixed(3));
      });
    }
    kr.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(look); }, { passive: true });
    addEventListener('resize', look); look();
  });

  var flip = $('[data-k-flip]');
  if (flip && st) flip.addEventListener('click', function () { st.classList.remove('spin'); void st.offsetWidth; st.classList.add('spin'); });
})();
