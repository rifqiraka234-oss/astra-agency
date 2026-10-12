/* the inner pages. Things that start once they're on screen, numbers that count up, a timeline that draws as you read,
   screens that walk through their own pins, the 30 day calendar, the chapter pill at the foot of the screen and the forms.
   Without script, or with reduced motion, everything shows in its finished state. */
(function () {
  'use strict';
  var d = document, w = window, J = w.JC || {}, reduce = J.reduce;
  var $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function seen(el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < w.innerHeight; }
  var fns = [], queued = false;
  function run() { queued = false; fns.forEach(function (f) { f(); }); }
  w.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(run); } }, { passive: true });
  w.addEventListener('resize', run);

  /* ---- bars, branches, the Annex stack, the twelve weeks and the steps start when they come into view */
  var once = $$('[data-in]');
  fns.push(function () { once = once.filter(function (el) { if (el.getBoundingClientRect().top < w.innerHeight * .8) { el.classList.add('in'); return false; } return true; }); });

  /* ---- numbers that count up, written in their final form in the page so nothing is lost without script */
  $$('[data-count]').forEach(function (el) {
    var to = parseFloat(el.getAttribute('data-count')), dec = (el.getAttribute('data-count').split('.')[1] || '').length, done = false;
    function fmt(v) { var s = v.toFixed(dec), p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return p.join('.'); }
    if (reduce) return;
    el.textContent = fmt(0);
    fns.push(function () {
      if (done || el.getBoundingClientRect().top > w.innerHeight * .85) return; done = true;
      var t0 = null, dur = 1600;
      (function step(ts) { if (t0 === null) t0 = ts; var e = Math.min(1, (ts - t0) / dur), x = 1 - Math.pow(1 - e, 3); el.textContent = fmt(to * x); if (e < 1) requestAnimationFrame(step); })(performance.now());
    });
  });

  /* ---- timelines. The line runs down to a point just below the middle of the screen and the rows it passes light up.
     A timeline marked data-today gets a row for the visitor's own date, in its place among the others */
  $$('[data-tl]').forEach(function (tl) {
    if (tl.hasAttribute('data-today') && J.todayUTC) {
      var now = J.todayUTC(), M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], nd = new Date(now);
      var next = $$('li[data-date]', tl).filter(function (li) { return J.utc(li.getAttribute('data-date')) > now; })[0];
      if (next) {
        var left = J.daysTo(d.body.getAttribute('data-applies') || '2027-10-23'), li = d.createElement('li');
        li.className = 'now';
        li.innerHTML = '<span class="d">' + nd.getUTCDate() + ' ' + M[nd.getUTCMonth()] + ' ' + nd.getUTCFullYear() + '</span><span class="t"><b>Today.</b>' + (left > 0 ? left + ' days until the rules apply.' : 'The rules apply.') + '</span>';
        next.parentNode.insertBefore(li, next);
      }
    }
    if (reduce) return;
    var rows = $$('li', tl); tl.classList.add('tl-on');
    fns.push(function () {
      var r = tl.getBoundingClientRect(), mid = w.innerHeight * .62, p = Math.min(1, Math.max(0, (mid - r.top - 26) / Math.max(1, r.height - 52)));
      tl.style.setProperty('--p', p.toFixed(4));
      rows.forEach(function (li) { li.classList.toggle('lit', li.getBoundingClientRect().top + 24 < mid); });
    });
  });

  /* ---- a real screen and its pins. It steps through the pins on its own while it's on screen, until the visitor picks one */
  $$('[data-pins]').forEach(function (root) {
    var pins = $$('.pin2', root), notes = $$('.notes3 li', root), box = $('.hl2', root), img = $('.shot2-in', root), auto = !reduce, cur = 1;
    var W = +img.getAttribute('data-w'), H = +img.getAttribute('data-h');
    function focus(n) {
      cur = +n;
      pins.forEach(function (p) { p.setAttribute('aria-pressed', p.getAttribute('data-n') === String(n) ? 'true' : 'false'); });
      notes.forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-n') === String(n)); });
      var pin = pins.filter(function (p) { return p.getAttribute('data-n') === String(n); })[0];
      if (pin && box) {
        var rc = pin.getAttribute('data-rect').split(' ').map(Number);
        box.style.left = (rc[0] / W * 100) + '%'; box.style.top = (rc[1] / H * 100) + '%'; box.style.width = (rc[2] / W * 100) + '%'; box.style.height = (rc[3] / H * 100) + '%'; box.classList.add('on');
      }
    }
    pins.forEach(function (p) { p.addEventListener('click', function () { auto = false; focus(p.getAttribute('data-n')); }); });
    focus(1);
    if (auto) (function loop() { setTimeout(function () { if (!auto) return; if (seen(root) && !d.hidden) focus(cur % pins.length + 1); loop(); }, 3600); })();
  });

  /* ---- 30 calendar days. Day 0 is the day the request arrives, the sweep runs to day 30 and holds */
  $$('[data-cal]').forEach(function (c) {
    var cells = $$('.cal-g i', c), v = $('[data-calv]', c), u = $('[data-calu]', c);
    function paint(n) {
      cells.forEach(function (x, i) { x.classList.toggle('off', i > n); });
      v.textContent = 'Day ' + n; c.classList.toggle('due', n >= 30);
      u.textContent = n === 0 ? 'the request arrives, acknowledge it at once' : n >= 30 ? 'pay or justify by the end of today' : 'of 30 calendar days';
    }
    if (reduce) { paint(30); return; }
    var n = 0; paint(0);
    (function tick() { if (seen(c) && !d.hidden) { n = n >= 30 ? 0 : n + 1; paint(n); } setTimeout(tick, n === 0 ? 1800 : n >= 30 ? 3200 : 170); })();
  });

  /* ---- the chapters of the page, a pill at the foot of the screen once the visitor is past the opening */
  var jp = $('[data-jp]'), steps = $$('[data-step]');
  if (jp && steps.length) {
    var links = $$('a', jp);
    fns.push(function () {
      var y = w.innerHeight * .45, at = 0;
      steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < y) at = i; });
      links.forEach(function (a, i) { a.classList.toggle('on', i === at); a.classList.toggle('done', i < at); if (i === at) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
      jp.classList.toggle('show', w.scrollY > w.innerHeight * .6 && steps[steps.length - 1].getBoundingClientRect().top > w.innerHeight * .3);
    });
  }

  /* ---- range sliders fill up to the thumb */
  $$('input[type=range]').forEach(function (r) {
    function u() { r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100).toFixed(2) + '%'); }
    r.addEventListener('input', u); u();
  });

  /* ---- forms. An empty or malformed required field is marked, a sent form says so */
  $$('form[data-form]').forEach(function (fm) {
    fm.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      $$('[required]', fm).forEach(function (i) {
        var wrap = i.closest('.f2'), bad = !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));
        if (wrap) wrap.classList.toggle('bad', bad); if (bad && ok) { i.focus(); ok = false; }
      });
      if (!ok) return;
      var data = new URLSearchParams(new FormData(fm)).toString(), btn = $('button[type=submit]', fm); if (btn) btn.disabled = true;
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data }).then(function (res) {
        if (!res.ok) throw 0; fm.style.display = 'none'; var s = $('.sent', fm.parentNode); if (s) { s.classList.add('on'); s.focus(); }
      }).catch(function () { if (btn) btn.disabled = false; var er = $('.formerr', fm); if (er) er.style.display = 'block'; });
    });
  });

  /* ---- a link to one time limit, such as #c-notice-96h, opens the ruler with that limit picked */
  if (/^#c-[a-z0-9\-]+$/.test(location.hash) && !d.getElementById(location.hash.slice(1))) { var ru = d.getElementById('ruler'); if (ru) setTimeout(function () { ru.scrollIntoView(); }, 60); }

  run();
})();
