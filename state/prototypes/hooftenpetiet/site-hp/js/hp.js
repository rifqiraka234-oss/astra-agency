/* Hooft & Petiet scenes. Each one writes CSS variables or classes only, and has a static state. */
(function () {
  var rm = window.__site ? window.__site.rm.matches : false;
  var lang = document.documentElement.lang || 'nl';
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function progress(el) {
    var r = el.getBoundingClientRect(), total = el.offsetHeight - window.innerHeight;
    return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
  }
  var euro = function (n) {
    return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);
  };

  /* 1. The house mark opens into a room */
  var hero = document.querySelector('.hero');
  var stick = hero && hero.querySelector('.hero-stick');
  var slot = hero && hero.querySelector('.hero-slot');
  function heroUpdate() {
    if (!hero || rm) return;
    var p = progress(hero), vw = window.innerWidth, vh = stick.clientHeight;
    var s = slot.getBoundingClientRect(), sr = stick.getBoundingClientRect();
    var W = s.width, S = W * 0.64;
    var sqL = s.left - sr.left + (W - S) / 2, sqT = s.top - sr.top + (s.height - S), sqR = sqL + S, sqB = sqT + S;
    var fill = 1 - smooth(0.05, 0.26, p), e = smooth(0.2, 0.84, p);
    var ct = sqT * (1 - e), cl = sqL * (1 - e), cr = (vw - sqR) * (1 - e), cb = (vh - sqB) * (1 - e);
    var cw = vw - cl - cr, ch = vh - ct - cb;
    var roofW = cw / 0.64, roofH = roofW * 0.44, gap = cw * 0.1;
    var st = stick.style;
    st.setProperty('--ct', ct.toFixed(1) + 'px'); st.setProperty('--cl', cl.toFixed(1) + 'px');
    st.setProperty('--cr', cr.toFixed(1) + 'px'); st.setProperty('--cb', cb.toFixed(1) + 'px');
    st.setProperty('--fill', fill.toFixed(3)); st.setProperty('--e', e.toFixed(3));
    st.setProperty('--rx', (cl + cw / 2 - roofW / 2).toFixed(1) + 'px');
    st.setProperty('--ry', (ct - gap - roofH).toFixed(1) + 'px');
    st.setProperty('--rw', roofW.toFixed(1) + 'px'); st.setProperty('--rh', roofH.toFixed(1) + 'px');
    st.setProperty('--roof', (1 - smooth(0.1, 0.3, p)).toFixed(3));
    st.setProperty('--ax', (cl + cw / 2).toFixed(1) + 'px'); st.setProperty('--ay', (ct + ch / 2).toFixed(1) + 'px');
    st.setProperty('--as', (Math.min(cw, ch) * 0.62).toFixed(1) + 'px');
    st.setProperty('--out', smooth(0.14, 0.4, p).toFixed(3));
    st.setProperty('--endo', smooth(0.8, 0.95, p).toFixed(3));
  }

  /* 2. The empty home furnished in their four steps, then the suitcase */
  var scene = document.querySelector('.plan-scene');
  var plan = scene && scene.querySelector('.plan');
  var steps = scene ? scene.querySelectorAll('.step') : [];
  var marks = [0.08, 0.27, 0.46, 0.65, 0.84];
  function planUpdate() {
    if (!scene) return;
    if (rm) { plan.classList.add('s1', 's2', 's3', 's4', 's5'); return; }
    var p = progress(scene), k = 0;
    marks.forEach(function (m, i) { var on = p >= m; plan.classList.toggle('s' + (i + 1), on); if (on) k = i + 1; });
    steps.forEach(function (li, i) { li.classList.toggle('on', i === Math.min(k, 4) - 1 || (k === 0 && i === 0)); li.classList.toggle('done', i < k - 1 || k === 5); });
    scene.style.setProperty('--pp', p.toFixed(3));
  }

  /* 3. Day and night, logeer rust wissel */
  document.querySelectorAll('.dn').forEach(function (dn) {
    var tabs = dn.querySelectorAll('[role="tab"]'), occ = dn.querySelector('.dn-occ');
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      occ.style.setProperty('--l', t.getAttribute('data-l')); occ.style.setProperty('--w', t.getAttribute('data-w'));
      occ.textContent = t.getAttribute('data-label');
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (n === null) return;
        e.preventDefault(); select(tabs[(n + tabs.length) % tabs.length], true);
      });
    });
    select(tabs[0]);
  });

  /* 4. Verkoopstyling price, their own prices */
  var cfg = document.querySelector('.cfg');
  if (cfg) {
    var sizes = cfg.querySelectorAll('.size'), wk = 0, base = null, label = '';
    var out = cfg.querySelector('[data-amt]'), brk = cfg.querySelector('[data-brk]'), wout = cfg.querySelector('output');
    var weekPrice = 99.99, txt = JSON.parse(cfg.getAttribute('data-txt'));
    function render() {
      wout.textContent = wk;
      if (base === 0) { out.innerHTML = txt.ask; brk.textContent = txt.askNote; return; }
      var total = base + wk * weekPrice;
      out.innerHTML = '<small>' + txt.from + '</small>' + euro(total);
      brk.textContent = txt.pack.replace('{size}', label).replace('{base}', euro(base)) + (wk ? txt.plus.replace('{n}', wk).replace('{w}', euro(weekPrice)).replace('{sum}', euro(wk * weekPrice)) : '');
    }
    sizes.forEach(function (b) {
      b.addEventListener('click', function () {
        sizes.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        base = +b.getAttribute('data-price'); label = b.getAttribute('data-label'); render();
      });
    });
    cfg.querySelector('[data-dec]').addEventListener('click', function () { wk = Math.max(0, wk - 1); render(); });
    cfg.querySelector('[data-inc]').addEventListener('click', function () { wk = Math.min(26, wk + 1); render(); });
    sizes[1].click();
  }

  /* 5. Quote request, three steps and a summary. The prototype sends nothing. */
  var q = document.querySelector('.qform');
  if (q) {
    var qsteps = q.querySelectorAll('.qstep'), bars = document.querySelectorAll('.qprog i'), cur = 0;
    var params = new URLSearchParams(location.search);
    if (params.get('type')) { var r0 = q.querySelector('input[name="type"][value="' + params.get('type') + '"]'); if (r0) r0.checked = true; }
    if (params.get('woningen')) { var n0 = q.querySelector('[name="woningen"]'); if (n0) n0.value = params.get('woningen'); }
    function show(i, init) {
      cur = i;
      qsteps.forEach(function (s, k) { s.hidden = k !== i; });
      bars.forEach(function (b, k) { b.classList.toggle('on', k <= i); });
      if (init) return;
      var h = qsteps[i].querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      var top = q.getBoundingClientRect().top + window.scrollY - 110;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: rm ? 'auto' : 'smooth' });
    }
    function valid(i) {
      var s = qsteps[i], err = s.querySelector('.qerr'), ok = true;
      s.querySelectorAll('[required]').forEach(function (f) {
        if (f.type === 'radio') { if (!s.querySelector('input[name="' + f.name + '"]:checked')) ok = false; }
        else if (!f.value.trim() || (f.checkValidity && !f.checkValidity())) ok = false;
      });
      if (err) err.textContent = ok ? '' : err.getAttribute('data-msg');
      return ok;
    }
    q.querySelectorAll('[data-next]').forEach(function (b) { b.addEventListener('click', function () { if (valid(cur)) { if (cur === qsteps.length - 2) summary(); show(cur + 1); } }); });
    q.querySelectorAll('[data-back]').forEach(function (b) { b.addEventListener('click', function () { show(Math.max(0, cur - 1)); }); });
    function summary() {
      var fd = new FormData(q), ul = q.querySelector('.sum'), L = JSON.parse(q.getAttribute('data-labels'));
      ul.innerHTML = '';
      Object.keys(L).forEach(function (k) {
        var v = fd.getAll(k).filter(Boolean).join(', ');
        if (!v) return;
        var li = document.createElement('li'), a = document.createElement('span'), b = document.createElement('span');
        a.textContent = L[k]; b.textContent = v; li.appendChild(a); li.appendChild(b); ul.appendChild(li);
      });
    }
    q.addEventListener('submit', function (e) {
      e.preventDefault();
      q.querySelector('.qdone').hidden = false;
      q.querySelector('[data-send]').disabled = true;
    });
    show(0, true);
  }

  var ticking = false;
  function frame() { heroUpdate(); planUpdate(); ticking = false; }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onScroll);
  frame();
})();
