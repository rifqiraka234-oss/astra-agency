/* The order, carried down the Entreprises page. One state (headcount, format, appetite, deal, drink, recipes) written by
   every control and read by every display, the hero number, the line of empanadas, the table, the ticket, the per head
   rows, the bar at the bottom and the quote form. Prices are their card prices and the ticket says so.
   On the home page it only carries a headcount over to Entreprises. */
(function () {
  var d = document, root = d.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function en() { return root.lang === 'en'; }
  /* the display fonts carry no narrow space, so French thousands get a plain no break space */
  function eur(v, dec) { var f = dec === 0 ? 0 : 2; return v.toLocaleString(en() ? 'en-GB' : 'fr-FR', { minimumFractionDigits: f, maximumFractionDigits: f }).replace(/\u202f/g, '\u00a0') + '\u00a0€'; }
  function clampN(n) { return Math.max(1, Math.min(400, Math.round(+n || 20))); }
  var q = new URLSearchParams(location.search), start = null;
  if (/^\d{1,3}$/.test(q.get('personnes') || '')) start = clampN(q.get('personnes'));
  try { if (start === null && sessionStorage.getItem('sv-n')) start = clampN(sessionStorage.getItem('sv-n')); } catch (e) {}

  var mini = $('[data-mini]');
  if (mini) {
    var mn = start || 20, out = $('[data-mini-out]', mini), go = $('[data-mini-go]', mini);
    var draw0 = function () {
      out.textContent = mn; go.href = '/entreprises/?personnes=' + mn + '#table';
      if (mr) { mr.value = Math.max(4, Math.min(120, mn)); mr.setAttribute('aria-valuetext', mn + (en() ? ' people' : ' personnes')); }
      try { sessionStorage.setItem('sv-n', mn); } catch (e) {}
    };
    var mr = $('[data-mini-range]', mini);
    $$('[data-mini-step]', mini).forEach(function (b) { b.addEventListener('click', function () { mn = Math.max(1, Math.min(400, mn + (+b.getAttribute('data-mini-step')))); draw0(); }); });
    if (mr) mr.addEventListener('input', function () { mn = +mr.value; draw0(); });
    draw0();
  }
  var dataEl = $('#sv-order-data');
  if (!dataEl) return;

  var D = JSON.parse(dataEl.textContent);
  var ALL = D.recipes.map(function (r) { return r.id; }), VEG = D.recipes.filter(function (r) { return r.veg; }).map(function (r) { return r.id; });
  var S = { n: start || 20, format: D.formats[q.get('format')] ? q.get('format') : 'bureau', k: 3, deal: 'classic', drink: 'quilmes', picked: ALL.slice() };

  /* ------------------------------------------------------------ the sums */
  function boxes(e) { var b12 = Math.floor(e / 12), r = e - b12 * 12, b6 = 0; if (r > 6) b12++; else if (r > 0) b6 = 1; return { b12: b12, b6: b6, total: b12 * 12 + b6 * 6 }; }
  function boxPrice(b) { return b.b12 * D.price12 + b.b6 * D.price6; }
  function plan() {
    var p = { lines: [], box: null };
    if (S.format === 'dejeuner') {
      var deal = D.deals[S.deal];
      p.empanadas = S.n * 3;
      p.lines.push([S.n + ' × ' + deal.name, S.n * deal.price]);
      p.total = S.n * deal.price;
    } else {
      var b = boxes(S.n * S.k); p.box = b; p.empanadas = b.total;
      if (b.b12) p.lines.push([b.b12 + ' × ' + (en() ? 'Box of 12' : 'Box de 12'), b.b12 * D.price12]);
      if (b.b6) p.lines.push(['1 × ' + (en() ? 'Box of 6' : 'Box de 6'), D.price6]);
      p.total = boxPrice(b);
      if (S.format === 'afterwork' && D.drinks[S.drink]) {
        var dr = D.drinks[S.drink];
        p.lines.push([S.n + ' × ' + dr[en() ? 'en' : 'fr'], S.n * dr.price]); p.total += S.n * dr.price;
      }
    }
    /* the recipes picked, shared out evenly in menu order */
    var picked = D.recipes.filter(function (r) { return S.picked.indexOf(r.id) > -1; });
    var base = Math.floor(p.empanadas / picked.length), rest = p.empanadas - base * picked.length;
    p.mix = picked.map(function (r, i) { return { r: r, c: base + (i < rest ? 1 : 0) }; }).filter(function (m) { return m.c > 0; });
    p.veg = p.mix.reduce(function (a, m) { return a + (m.r.veg ? m.c : 0); }, 0);
    p.perHead = p.total / S.n;
    return p;
  }
  function fmtName() { return D.formats[S.format][en() ? 1 : 0]; }
  function people(n) { return n + (en() ? (n > 1 ? ' people' : ' person') : (n > 1 ? ' personnes' : ' personne')); }
  function boxWords(b) {
    var a = [];
    if (b.b12) a.push(en() ? b.b12 + (b.b12 > 1 ? ' boxes of 12' : ' box of 12') : b.b12 + ' box de 12');
    if (b.b6) a.push(en() ? '1 box of 6' : '1 box de 6');
    return a.join(' + ');
  }

  /* ------------------------------------------------------------ displays */
  var nOut = $$('[data-o="n"]'), range = $('[data-o-range]'), big = $('[data-o-big]'), line = $('[data-o-line]');
  var count = $('[data-o-count]'), boxesOut = $('[data-o-boxes]'), stack = $('[data-o-stack]'), live = $('[data-o-live]');
  var ticket = $('[data-o-ticket]'), bar = $('[data-o-bar]'), sun = $('.ho-sun');
  var lastTable = '', spin = 0, fromForm = false, liveT, printT;

  function drawLine(p) {
    if (!line) return;
    var size = line.firstElementChild ? line.firstElementChild.offsetWidth : 20, perRow = Math.max(8, Math.floor((line.clientWidth - 40) / (size + 4)));
    var cap = perRow * 6, want = Math.min(p.empanadas, cap), have = line.children.length, kinds = [];
    p.mix.forEach(function (m) { for (var i = 0; i < m.c && kinds.length < want; i++) kinds.push(m.r.veg ? 'veg' : 'carne'); });
    if (want > have) {
      var f = d.createDocumentFragment();
      for (var i = have; i < want; i++) { var s = d.createElement('i'); s.className = 'new'; s.style.setProperty('--d', Math.min(i - have, 40) * 14 + 'ms'); f.appendChild(s); }
      line.appendChild(f);
    } else while (line.children.length > want) line.removeChild(line.lastChild);
    for (var j = 0; j < want; j++) line.children[j].classList.toggle('veg', kinds[j] === 'veg');
    line.setAttribute('data-more', p.empanadas > cap ? '+' + (p.empanadas - cap) : '');
    if (count) count.textContent = p.empanadas;
    if (boxesOut) boxesOut.textContent = p.box ? boxWords(p.box) : (en() ? '3 each' : '3 chacun');
  }
  function drawTable(p) {
    if (!stack) return;
    var sizes = [];
    if (p.box) { for (var i = 0; i < p.box.b12; i++) sizes.push(12); if (p.box.b6) sizes.push(6); }
    else for (var t = 0; t < S.n; t++) sizes.push(3);
    var key = S.format + sizes.length + '|' + sizes[sizes.length - 1] + '|' + p.mix.map(function (m) { return m.r.id + m.c; }).join(',') + '|' + stack.parentNode.clientWidth;
    if (key === lastTable) return;
    var slots = [];
    p.mix.forEach(function (m) { for (var i = 0; i < m.c; i++) slots.push(m.r); });
    var cells = sizes.length <= 40, html = '', s = 0;
    sizes.forEach(function (size, k) {
      var c = '';
      if (cells) for (var j = 0; j < size; j++) { var r = slots[s++] || D.recipes[0]; c += '<i class="' + (r.veg ? 'veg' : 'carne') + '" style="--j:' + j + '" title="' + r.name + '"><svg viewBox="0 0 64 40" aria-hidden="true" focusable="false"><use href="#emp"/></svg></i>'; }
      html += '<div class="bx bx' + size + (cells ? '' : ' shut') + '" style="--k:' + Math.min(k, 60) + '"><span class="bx-lid" aria-hidden="true"></span><div class="bx-g">' + c + '</div></div>';
    });
    stack.innerHTML = html;
    fit(sizes);
    stack.classList.remove('pop'); void stack.offsetWidth; if (!reduce) stack.classList.add('pop');
    lastTable = key;
  }
  /* the largest empanada that still fits every box on the table, as on the first build */
  function fit(sizes) {
    var stage = stack.parentNode, W = stage.clientWidth || 600, H = parseFloat(getComputedStyle(stage).minHeight) || 420, nb = sizes.length, e, many;
    var colsIn = sizes[0] === 3 ? 3 : 4, rowsIn = sizes[0] === 3 ? 1 : 3;
    for (e = 46; e > 8; e--) {
      many = e < 22;
      var bw = colsIn * e + 9 + (many ? 12 : 20), bh = rowsIn * e * 0.65 + 6 + (many ? 14 : 30), gap = many ? 8 : 14;
      var cols = Math.max(1, Math.floor((W - 52 + gap) / (bw + gap))), rows = Math.ceil(nb / cols);
      if (rows * bh + (rows - 1) * gap + 52 <= H && cols * (bw + gap) - gap <= W - 52) break;
    }
    var tall = e <= 8; if (tall) { e = 9; many = true; }
    stack.classList.toggle('bb-tall', tall); stack.classList.toggle('bb-many', many);
    stack.style.setProperty('--e', e + 'px');
  }
  function drawTicket(p) {
    if (!ticket) return;
    $('[data-t-fmt]', ticket).textContent = fmtName();
    $('[data-t-lines]', ticket).innerHTML = p.lines.map(function (l) { return '<li><span>' + l[0] + '</span><b>' + eur(l[1]) + '</b></li>'; }).join('');
    $('[data-t-mix]', ticket).innerHTML = p.mix.map(function (m) { return '<li class="' + (m.r.veg ? 'veg' : 'carne') + '"><b>' + m.c + '</b> ' + m.r.name + '</li>'; }).join('');
    $('[data-t-total]', ticket).textContent = eur(p.total);
    $('[data-t-head]', ticket).textContent = (en() ? 'about ' : 'environ ') + eur(p.perHead) + (en() ? ' a head' : ' par personne');
    $('[data-t-veg]', ticket).textContent = p.veg === p.empanadas ? (en() ? 'all without meat' : 'toutes sans viande') : p.veg ? (en() ? p.veg + ' without meat' : 'dont ' + p.veg + ' sans viande') : (en() ? 'all with meat' : 'toutes avec viande');
    /* it prints again once the order settles, not on every step of a drag */
    if (!reduce) { clearTimeout(printT); printT = setTimeout(function () { ticket.classList.remove('printing'); void ticket.offsetWidth; ticket.classList.add('printing'); }, 260); }
  }
  function drawChart() {
    var rows = $$('[data-ph]'); if (!rows.length) return;
    var boxHead = boxPrice(boxes(S.n * S.k)) / S.n;
    var vals = { bureau: boxHead, classic: D.deals.classic.price, miamor: D.deals.miamor.price, afterwork: boxHead + D.drinks.quilmes.price };
    var mx = Math.max(vals.bureau, vals.classic, vals.miamor, vals.afterwork) * 1.08;
    var cur = S.format === 'dejeuner' ? S.deal : S.format;
    rows.forEach(function (r) {
      var k = r.getAttribute('data-ph');
      r.style.setProperty('--v', (vals[k] / mx).toFixed(3));
      $('[data-ph-v]', r).textContent = eur(vals[k]);
      r.classList.toggle('cur', k === cur); r.setAttribute('aria-pressed', k === cur ? 'true' : 'false');
    });
    $$('[data-ph-k]').forEach(function (s) { s.textContent = S.k; });
  }
  function syncControls() {
    nOut.forEach(function (o) { o.textContent = S.n; });
    if (range) { range.value = Math.max(4, Math.min(120, S.n)); range.setAttribute('aria-valuetext', people(S.n)); }
    if (big) { big.setAttribute('aria-valuenow', S.n); big.setAttribute('aria-valuetext', people(S.n)); big.classList.toggle('wide', S.n > 99); }
    $$('input[name="o-format"]').forEach(function (i) { i.checked = i.value === S.format; });
    $$('[data-when]').forEach(function (el) { el.hidden = el.getAttribute('data-when').split(' ').indexOf(S.format) < 0; });
    $$('input[name="o-k"]').forEach(function (i) { i.checked = +i.value === S.k; });
    $$('input[name="o-deal"]').forEach(function (i) { i.checked = i.value === S.deal; });
    $$('input[name="o-drink"]').forEach(function (i) { i.checked = i.value === S.drink; });
    $$('input[name="o-recipe"]').forEach(function (i) { i.checked = S.picked.indexOf(i.value) > -1; });
    var all = $('[data-o-all]'), veg = $('[data-o-veg]');
    if (all) all.setAttribute('aria-pressed', S.picked.length === ALL.length ? 'true' : 'false');
    if (veg) veg.setAttribute('aria-pressed', S.picked.join() === VEG.join() ? 'true' : 'false');
  }
  function summary(p) { return people(S.n) + ' · ' + fmtName() + ' · ' + p.empanadas + ' empanadas · ≈ ' + eur(p.total); }
  function toForm(p) {
    if (!fromForm) d.dispatchEvent(new CustomEvent('sv-pers', { detail: { n: S.n, format: S.format } }));
    var txt = p.lines.map(function (l) { return l[0] + ', ' + eur(l[1]); });
    txt.push((en() ? 'Recipes, ' : 'Recettes, ') + p.mix.map(function (m) { return m.c + ' ' + m.r.name; }).join(', '));
    txt.push((en() ? 'Estimate at card prices, ' : 'Estimation au prix de la carte, ') + eur(p.total));
    $$('input[name="commande"]').forEach(function (i) { i.value = txt.join(' | '); });
    var bon = $('[data-bon-txt]'); if (bon) bon.textContent = summary(p);
    if (bar) $('[data-bar-txt]', bar).innerHTML = people(S.n) + ' · <span class="obar-f">' + fmtName() + ' · </span>≈ ' + eur(p.total, 0);
  }
  var raf = 0;
  function render() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      var p = plan();
      syncControls(); drawLine(p); drawTable(p); drawTicket(p); drawChart(); toForm(p);
      fromForm = false;
      clearTimeout(liveT); liveT = setTimeout(function () { if (live) live.textContent = summary(p); }, 700);
      try { sessionStorage.setItem('sv-n', S.n); } catch (e) {}
    });
  }
  function set(patch) {
    var oldN = S.n;
    Object.keys(patch).forEach(function (k) { S[k] = patch[k]; });
    S.n = clampN(S.n);
    /* the sun turns with the headcount */
    if (sun && S.n !== oldN && !reduce) { spin += (S.n - oldN) * 6; sun.style.setProperty('--spin', spin + 'deg'); }
    render();
  }

  /* ------------------------------------------------------------ controls */
  $$('[data-n-step]').forEach(function (b) { b.addEventListener('click', function () { set({ n: S.n + (+b.getAttribute('data-n-step')) }); }); });
  if (range) range.addEventListener('input', function () { set({ n: +range.value }); });
  /* drag the big number itself, sideways on a phone so the page still scrolls, any way with a mouse */
  if (big) {
    var p0 = null, n0 = 0;
    big.addEventListener('pointerdown', function (e) { p0 = { x: e.clientX, y: e.clientY, mouse: e.pointerType === 'mouse' }; n0 = S.n; big.classList.add('drag'); try { big.setPointerCapture(e.pointerId); } catch (x) {} });
    big.addEventListener('pointermove', function (e) {
      if (!p0) return;
      var dx = e.clientX - p0.x, dy = p0.mouse ? p0.y - e.clientY : 0;
      set({ n: n0 + Math.round((dx + dy) / 12) });
    });
    var up = function () { p0 = null; big.classList.remove('drag'); };
    big.addEventListener('pointerup', up); big.addEventListener('pointercancel', up);
    big.addEventListener('keydown', function (e) {
      var k = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 }[e.key];
      if (e.key === 'Home') k = 1 - S.n; if (e.key === 'End') k = 400 - S.n;
      if (k) { e.preventDefault(); set({ n: S.n + k }); }
    });
  }
  $$('input[name="o-format"]').forEach(function (i) { i.addEventListener('change', function () { set({ format: i.value }); }); });
  $$('input[name="o-k"]').forEach(function (i) { i.addEventListener('change', function () { set({ k: +i.value }); }); });
  $$('input[name="o-deal"]').forEach(function (i) { i.addEventListener('change', function () { set({ deal: i.value }); }); });
  $$('input[name="o-drink"]').forEach(function (i) { i.addEventListener('change', function () { set({ drink: i.value }); }); });
  $$('input[name="o-recipe"]').forEach(function (i) {
    i.addEventListener('change', function () {
      var picked = $$('input[name="o-recipe"]').filter(function (x) { return x.checked; }).map(function (x) { return x.value; });
      if (!picked.length) { i.checked = true; return; }
      set({ picked: picked });
    });
  });
  var allB = $('[data-o-all]'), vegB = $('[data-o-veg]');
  if (allB) allB.addEventListener('click', function () { set({ picked: ALL.slice() }); });
  if (vegB) vegB.addEventListener('click', function () { set({ picked: VEG.slice() }); });
  $$('[data-ph]').forEach(function (r) {
    r.addEventListener('click', function () {
      var k = r.getAttribute('data-ph');
      if (k === 'classic' || k === 'miamor') set({ format: 'dejeuner', deal: k });
      else if (k === 'afterwork') set({ format: 'afterwork', drink: 'quilmes' });
      else set({ format: 'bureau' });
    });
  });

  /* the form talks back, a headcount or a format chosen there updates the order, and is never overwritten */
  $$('[data-form] [data-pers]').forEach(function (inp) { inp.addEventListener('change', function () { if (+inp.value) { fromForm = true; set({ n: +inp.value }); } }); });
  $$('[data-form] [data-step]').forEach(function (b) { b.addEventListener('click', function () { var inp = b.parentNode.querySelector('[data-pers]'); if (inp && +inp.value) { fromForm = true; set({ n: +inp.value }); } }); });
  $$('[data-form] input[name="format"]').forEach(function (r) { r.addEventListener('change', function () { if (D.formats[r.value]) { fromForm = true; set({ format: r.value }); } }); });

  /* buttons that jump, some also pick a format on the way */
  $$('[data-o-go]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = (a.getAttribute('href') || '').split('#')[1], t = id && d.getElementById(id);
      if (a.hasAttribute('data-o-set')) set({ format: a.getAttribute('data-o-set') });
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      /* once the scroll has settled, land exactly on the section and put the cursor in the date */
      var f = id === 'devis' && t.querySelector('input[name="date"]'), done = false;
      var land = function () {
        if (done) return; done = true;
        if (Math.abs(t.getBoundingClientRect().top) > 40) t.scrollIntoView({ block: 'start' });
        if (f) f.focus({ preventScroll: true });
      };
      if (reduce) land();
      else { addEventListener('scrollend', land, { once: true }); setTimeout(land, 1200); }
    });
  });

  /* the bar at the bottom, shown once the headcount is behind you and gone before the form */
  if (bar) {
    var hero = $('#combien'), form = $('#devis'), shown = null;
    var upd = function () {
      var on = !!(hero && form && hero.getBoundingClientRect().bottom < 0 && form.getBoundingClientRect().top > innerHeight * .85);
      if (on === shown) return; shown = on;
      bar.classList.toggle('on', on); bar.setAttribute('aria-hidden', on ? 'false' : 'true'); bar.inert = !on;
    };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  d.addEventListener('sv-lang', render);
  var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { lastTable = ''; render(); }, 150); });
  render();
})();
