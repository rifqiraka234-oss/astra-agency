/* BidX public pages. Header state, mobile menu, reveals, live countdowns, filters and the fit check. */
(function () {
  var d = document;
  var top = d.getElementById('top');
  if (top) {
    var onScroll = function () { top.classList.toggle('stuck', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  var mb = d.querySelector('.menu-b'), mn = d.getElementById('mnav');
  if (mb && mn) {
    mb.addEventListener('click', function () {
      var open = mb.getAttribute('aria-expanded') !== 'true';
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      mn.classList.toggle('open', open);
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mn.classList.contains('open')) { mn.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.focus(); } });
  }

  // Reveals. Checked against the viewport on scroll, so an element clipped to nothing still reveals.
  var rv = [].slice.call(d.querySelectorAll('.rv, .rv-dots, .rv-bars'));
  var check = function () {
    var h = window.innerHeight;
    rv = rv.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.92 && r.bottom > 0) { el.classList.add('in'); return false; }
      return true;
    });
  };
  var tick = false;
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; check(); }); } }, { passive: true });
  window.addEventListener('resize', check); check(); setTimeout(check, 300);

  // Countdowns. Every [data-close] holds an ISO date and time in UK time. Days left is worked out on the visitor's clock.
  var now = new Date();
  [].forEach.call(d.querySelectorAll('[data-close]'), function (el) {
    var c = new Date(el.getAttribute('data-close'));
    var days = Math.ceil((c - now) / 86400000);
    var out = el.querySelector('.dl-n'), unit = el.querySelector('.dl-u');
    if (!out) return;
    if (c <= now) {
      out.textContent = 'SHUT'; if (unit) unit.textContent = 'closed'; el.classList.add('past');
      // A closed call leaves every list. On its own page it stays, marked closed.
      var row = el.closest('[data-tags], tr, li, .brow');
      if (row) { row.classList.add('closed'); row.hidden = true; }
      return;
    }
    out.textContent = String(days).padStart(2, '0');
    if (unit) unit.textContent = days === 1 ? 'day left' : 'days left';
    el.classList.toggle('now', days <= 7); el.classList.toggle('soon', days > 7 && days <= 21);
  });

  /* EIC short proposals are batched every first Tuesday of the month at 5pm Brussels time (eic.ec.europa.eu). */
  var nextBatch = function (now) {
    for (var k = 0; k < 3; k++) {
      var y = now.getUTCFullYear(), m = now.getUTCMonth() + k; y += Math.floor(m / 12); m %= 12;
      var day = 1 + (2 - new Date(Date.UTC(y, m, 1)).getUTCDay() + 7) % 7;
      var t = new Date(Date.UTC(y, m, day, m >= 3 && m <= 9 ? 15 : 16));
      if (t > now) return t;
    }
  };
  [].forEach.call(d.querySelectorAll('[data-eic-next]'), function (el) {
    var t = nextBatch(now), mn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    el.textContent = t.getUTCDate() + ' ' + mn[t.getUTCMonth()];
  });
  [].forEach.call(d.querySelectorAll('[data-live-count]'), function (el) {
    el.textContent = el.getAttribute('data-live-count').split(',').filter(function (x) { return new Date(x) > now; }).length;
  });

  // Filters on the guides and calls lists.
  [].forEach.call(d.querySelectorAll('[data-filter]'), function (box) {
    var list = d.getElementById(box.getAttribute('data-filter'));
    if (!list) return;
    var items = [].slice.call(list.querySelectorAll('[data-tags]'));
    var q = box.querySelector('input[type=search]');
    var btns = [].slice.call(box.querySelectorAll('button[data-tag]'));
    var empty = d.getElementById(box.getAttribute('data-empty'));
    var state = { tag: 'all', q: '' };
    var apply = function () {
      var n = 0;
      items.forEach(function (it) {
        var okTag = state.tag === 'all' || (' ' + it.getAttribute('data-tags') + ' ').indexOf(' ' + state.tag + ' ') > -1;
        var okQ = !state.q || it.textContent.toLowerCase().indexOf(state.q) > -1;
        var show = okTag && okQ && !it.classList.contains('closed'); it.hidden = !show; if (show) n++;
      });
      if (empty) empty.hidden = n > 0;
      var c = box.querySelector('.count'); if (c) c.textContent = n + (n === 1 ? ' result' : ' results');
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        state.tag = b.getAttribute('data-tag'); apply();
      });
    });
    if (q) q.addEventListener('input', function () { state.q = q.value.trim().toLowerCase(); apply(); });
    apply();
  });
})();
