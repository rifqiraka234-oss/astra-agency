/* The plan's moving parts. Today's site turns into the new one, the charts answer a pointer, the controls redraw.
   Reduced motion and no script get the whole page, still. */
(function () {
  var html = document.documentElement, rm = html.classList.contains('rm');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var ease = function (x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var eur = function (v) { return '€' + v.toLocaleString('en-GB'); };

  /* things that settle in once, as they arrive */
  var once = $$('.hc, .gt-r');
  if ('IntersectionObserver' in window && !rm) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.35 });
    once.forEach(function (el) { io.observe(el); });
  } else once.forEach(function (el) { el.classList.add('in'); });

  /* ------------------------------------------------ the new site rises through today's, in their arch */
  var bx = $('[data-bx]'), bxB = bx && $('.bx-b', bx), bxW = bx && $('.bx-win', bx);
  var bxUpdate = function () {
    if (!bx || rm) return;
    var r = bx.getBoundingClientRect(), vh = window.innerHeight, w = bxW.offsetWidth;
    var p = clamp((vh * .35 - r.top) / Math.max(1, r.height - vh * .9), 0, 1), e = ease(p);
    var rr = (w / 2) * (1 - e);
    bxB.style.clipPath = 'inset(' + ((1 - e) * 100).toFixed(2) + '% 0 0 0 round ' + rr.toFixed(1) + 'px ' + rr.toFixed(1) + 'px 0 0)';
    bx.classList.toggle('past', e > .5);
  };

  /* ------------------------------------------------ the dates line draws as it's read */
  var dl = $('[data-dl]');
  var dlUpdate = function () {
    if (!dl || rm) return;
    var r = dl.getBoundingClientRect(), vh = window.innerHeight;
    dl.style.setProperty('--dp', clamp((vh * .7 - r.top) / Math.max(1, r.height), 0, 1).toFixed(3));
  };

  /* ------------------------------------------------ built, the frame follows the caption in the middle */
  var bf = $('[data-bf]'), bcs = bf ? $$('.bc li', bf) : [], bfi = bf ? $$('.bf-i', bf) : [], bIdx = -1;
  var bfUpdate = function () {
    if (!bf || !bcs.length) return;
    var mid = window.innerHeight / 2, best = 0, bd = 1e9;
    bcs.forEach(function (li, i) { var r = li.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = i; } });
    if (best === bIdx) return;
    bIdx = best;
    bcs.forEach(function (li, i) { li.classList.toggle('on', i === best); });
    bfi.forEach(function (f, i) { f.classList.toggle('on', i === best); });
  };

  var ticking = false;
  var update = function () { ticking = false; bxUpdate(); dlUpdate(); bfUpdate(); };
  var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', function () { $$('.tip.on').forEach(function (t) { t.classList.remove('on'); }); req(); });
  update();

  /* ------------------------------------------------ chart tooltips, pointer and keyboard */
  $$('[data-tipbox]').forEach(function (fig) {
    var plot = $('.ch-plot', fig), tip = $('.tip', fig);
    var show = function (g) {
      var m = $('.hc-m', g).getBoundingClientRect(), p = plot.getBoundingClientRect();
      tip.textContent = g.getAttribute('data-tip');
      var x = clamp(m.left + m.width / 2 - p.left, 120, p.width - 120);
      tip.style.left = x + 'px'; tip.style.top = (m.top - p.top) + 'px';
      tip.classList.add('on');
    };
    var hide = function () { tip.classList.remove('on'); };
    $$('.hc-pt', fig).forEach(function (g) {
      g.addEventListener('pointerenter', function () { show(g); });
      g.addEventListener('pointerleave', hide);
      g.addEventListener('focus', function () { show(g); });
      g.addEventListener('blur', hide);
      g.addEventListener('click', function () { show(g); });
    });
  });

  /* ------------------------------------------------ the allowance, households times the statutory minimum */
  var al = $('[data-al]');
  if (al) {
    var A = JSON.parse($('script[type="application/json"]', al).textContent);
    var rng = $('input[type=range]', al), hs = $$('.al-wall i', al), lit = +rng.value;
    var o = function (k) { return $('[data-o="' + k + '"]', al); };
    var draw = function () {
      var n = +rng.value;
      o('n').textContent = n;
      o('t').textContent = eur(n * A.amount);
      o('x').textContent = n + ' times ' + eur(A.amount);
      rng.setAttribute('aria-valuetext', n + (n === 1 ? ' household' : ' households') + ', ' + eur(n * A.amount));
      hs.forEach(function (h, i) {
        var on = i < n;
        if (on !== h.classList.contains('on')) {
          h.classList.toggle('on', on);
          if (on && !rm) { h.classList.add('pop'); setTimeout(function () { h.classList.remove('pop'); }, 260); }
        }
      });
      lit = n;
    };
    rng.addEventListener('input', draw);
    draw();
  }

  /* ------------------------------------------------ rivals, Hooft & Petiet today or with the new site */
  var riv = $('[data-riv]');
  if (riv) {
    var RD = JSON.parse($('script[type="application/json"]', riv).textContent);
    var row = $('[data-us]', riv), cells = $$('.mk', row), out = $('[data-out]', riv), btns = $$('.riv-sw button', riv);
    var set = function (v) {
      var d = RD[v];
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === v ? 'true' : 'false'); });
      $('[data-name]', row).textContent = d.name;
      $('[data-note]', row).textContent = d.note;
      cells.forEach(function (c, i) {
        var y = !!d.v[i], was = c.classList.contains('y');
        c.classList.toggle('y', y); c.classList.toggle('n', !y);
        $('.sr', c).textContent = RD.cols[i] + ', ' + (y ? 'yes' : 'no');
        if (y !== was && !rm) { c.classList.add('flip'); setTimeout(function () { c.classList.remove('flip'); }, 450); }
      });
      var k = d.v.reduce(function (a, b) { return a + b; }, 0);
      out.textContent = (v === 'new' ? 'With the new site, Hooft & Petiet shows ' : 'Hooft & Petiet today shows ') + k + ' of the 4.';
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-v')); }); });
  }

  /* ------------------------------------------------ the 26 articles, read the title Google shows */
  var gd = $('.gd-grid'), read = $('[data-read]');
  if (gd && read) {
    var tiles = $$('.dt', gd);
    var say = function (t) {
      tiles.forEach(function (x) { x.classList.toggle('on', x === t); });
      read.textContent = '';
      var a = document.createElement('span'); a.textContent = '“' + t.getAttribute('data-tip') + '”';
      var b = document.createElement('code'); b.textContent = ' on ' + t.getAttribute('data-slug');
      read.appendChild(a); read.appendChild(b);
    };
    tiles.forEach(function (t) {
      t.addEventListener('pointerenter', function () { say(t); });
      t.addEventListener('focus', function () { say(t); });
      t.addEventListener('click', function () { say(t); });
    });
  }
})();
