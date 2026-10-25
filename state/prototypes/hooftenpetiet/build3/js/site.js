/* Hooft & Petiet and ReShare, v2. Small and quiet. Classes and attributes only. */
(function () {
  var html = document.documentElement;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = html.lang || 'nl';

  /* The header gets a hairline once the page moves */
  var hdr = document.querySelector('.hdr');
  function hdrState() { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', hdrState, { passive: true });
  hdrState();

  /* Phone menu */
  var mbtn = document.querySelector('.menu-btn'), mnav = document.querySelector('.mnav');
  if (mbtn && mnav) {
    var close = mnav.querySelector('.close');
    var setMenu = function (open) {
      mnav.classList.toggle('open', open);
      mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { mnav.removeAttribute('inert'); mnav.removeAttribute('aria-hidden'); requestAnimationFrame(function () { close.focus(); }); }
      else { mnav.setAttribute('inert', ''); mnav.setAttribute('aria-hidden', 'true'); mbtn.focus(); }
      document.body.style.overflow = open ? 'hidden' : '';
    };
    mnav.setAttribute('inert', '');
    mbtn.addEventListener('click', function () { setMenu(true); });
    close.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mnav.classList.contains('open')) setMenu(false); });
    mnav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { if (a.getAttribute('href').indexOf('#') > -1) setMenu(false); }); });
  }

  /* Photographs settle in once, as they arrive */
  var rvs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !rm) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    rvs.forEach(function (el) { io.observe(el); });
  } else rvs.forEach(function (el) { el.classList.add('in'); });

  var euro = function (n) {
    return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);
  };

  /* Verkoopstyling, their own published prices */
  var calc = document.querySelector('.calc');
  if (calc) {
    var sizes = calc.querySelectorAll('.size'), wk = 0, base = null, label = '';
    var out = calc.querySelector('[data-amt]'), brk = calc.querySelector('[data-brk]'), wout = calc.querySelector('output');
    var txt = JSON.parse(calc.getAttribute('data-txt')), weekPrice = 99.99;
    var link = calc.querySelector('[data-req]');
    var render = function () {
      wout.textContent = wk;
      if (base === 0) { out.textContent = txt.ask; brk.textContent = txt.askNote; }
      else {
        out.textContent = euro(base + wk * weekPrice);
        brk.textContent = txt.pack.replace('{size}', label).replace('{base}', euro(base)) + (wk ? txt.plus.replace('{n}', wk).replace('{w}', euro(weekPrice)) : '');
      }
      if (link) link.href = link.getAttribute('data-base') + '&oppervlak=' + encodeURIComponent(label.replace(/[^0-9]/g, '')) + (wk ? '&weken=' + wk : '');
    };
    sizes.forEach(function (b) {
      b.addEventListener('click', function () {
        sizes.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        base = +b.getAttribute('data-price'); label = b.getAttribute('data-label'); render();
      });
    });
    calc.querySelector('[data-dec]').addEventListener('click', function () { wk = Math.max(0, wk - 1); render(); });
    calc.querySelector('[data-inc]').addEventListener('click', function () { wk = Math.min(26, wk + 1); render(); });
    sizes[1].click();
  }

  /* Offerte, three steps and a review. The prototype sends nothing. */
  var q = document.querySelector('.qform');
  if (q) {
    var steps = q.querySelectorAll('.qstep'), count = q.querySelector('[data-count]'), cur = 0;
    var counts = JSON.parse(count.getAttribute('data-txt'));
    var p = new URLSearchParams(location.search);
    var setVal = function (name, v) {
      if (!v) return;
      var radio = q.querySelector('input[type="radio"][name="' + name + '"][value="' + CSS.escape(v) + '"]');
      if (radio) { radio.checked = true; return; }
      var f = q.querySelector('[name="' + name + '"]');
      if (!f) return;
      if (f.tagName === 'SELECT') { if ([].some.call(f.options, function (o) { return o.value === v; })) f.value = v; }
      else f.value = v;
    };
    setVal('type', p.get('type')); setVal('woningen', p.get('woningen')); setVal('duur', p.get('duur'));
    setVal('oppervlak', p.get('oppervlak'));
    if (p.get('vanaf') && /^\d{4}-\d{2}$/.test(p.get('vanaf'))) setVal('datum', p.get('vanaf') + '-01');
    if (p.get('weken')) setVal('wensen', counts.weeks.replace('{n}', p.get('weken')));
    var show = function (i, init) {
      cur = i;
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      count.textContent = counts.steps[i];
      if (init) return;
      var h = steps[i].querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      var top = q.getBoundingClientRect().top + window.scrollY - 110;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: rm ? 'auto' : 'smooth' });
    };
    var valid = function (i) {
      var s = steps[i], err = s.querySelector('.qerr'), ok = true;
      s.querySelectorAll('[required]').forEach(function (f) {
        if (f.type === 'radio') { if (!s.querySelector('input[name="' + f.name + '"]:checked')) ok = false; }
        else if (!f.value.trim() || (f.checkValidity && !f.checkValidity())) ok = false;
      });
      if (err) err.textContent = ok ? '' : err.getAttribute('data-msg');
      return ok;
    };
    var labelOf = function (el) {
      if (el.tagName === 'SELECT') return el.selectedOptions[0] ? el.selectedOptions[0].textContent : '';
      if (el.type === 'radio' || el.type === 'checkbox') { var b = el.parentNode.querySelector('b') || el.parentNode.querySelector('span'); return b ? b.textContent : el.value; }
      return el.value;
    };
    var summary = function () {
      var dl = q.querySelector('.sum'), L = JSON.parse(q.getAttribute('data-labels'));
      dl.innerHTML = '';
      Object.keys(L).forEach(function (k) {
        var els = [].filter.call(q.querySelectorAll('[name="' + k + '"]'), function (el) { return (el.type !== 'radio' && el.type !== 'checkbox') || el.checked; });
        var v = els.map(labelOf).map(function (s) { return s.trim(); }).filter(Boolean).join(', ');
        if (!v) return;
        var row = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
        dt.textContent = L[k]; dd.textContent = v; row.appendChild(dt); row.appendChild(dd); dl.appendChild(row);
      });
    };
    q.querySelectorAll('[data-next]').forEach(function (b) { b.addEventListener('click', function () { if (valid(cur)) { if (cur === steps.length - 2) summary(); show(cur + 1); } }); });
    q.querySelectorAll('[data-back]').forEach(function (b) { b.addEventListener('click', function () { show(Math.max(0, cur - 1)); }); });
    q.addEventListener('submit', function (e) {
      e.preventDefault();
      if (cur !== steps.length - 1) return;
      q.querySelector('.qdone').hidden = false;
      q.querySelector('[data-send]').disabled = true;
    });
    show(0, true);
  }
})();
