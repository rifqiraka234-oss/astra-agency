/* ReShare loop. One sofa travels the circle, the counter says which life it's on. Writes CSS variables and classes only. */
(function () {
  var rm = window.__site ? window.__site.rm.matches : false;
  var scene = document.querySelector('.loop-scene');
  if (!scene) return;
  var fig = scene.querySelector('.loop-fig'), stops = scene.querySelectorAll('.stop'), stations = scene.querySelectorAll('.station');
  var imgs = scene.querySelectorAll('.loop-win img'), life = scene.querySelector('[data-life]');
  var lives = JSON.parse(scene.getAttribute('data-lives'));
  var n = stations.length;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function set(i, p) {
    stations.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    imgs.forEach(function (im, k) { im.classList.toggle('on', k === i); });
    var at = +stations[i].getAttribute('data-stop');
    stops.forEach(function (s, k) { s.classList.toggle('on', k <= at || p > 0.97); });
    life.textContent = lives[i];
  }
  function update() {
    if (rm) { set(n - 1, 1); fig.style.setProperty('--lp', 1); return; }
    var r = scene.getBoundingClientRect(), total = scene.offsetHeight - window.innerHeight;
    var p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    var i = Math.min(n - 1, Math.floor(p * n));
    /* the rider goes round once and a bit, the last station is the second pass of the refresh */
    var ang = p * 432;
    fig.style.setProperty('--ang', ang.toFixed(1));
    fig.style.setProperty('--lp', Math.min(1, p * 1.2).toFixed(3));
    scene.style.setProperty('--endo', clamp((p - 0.86) / 0.1, 0, 1).toFixed(3));
    set(i, p);
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
