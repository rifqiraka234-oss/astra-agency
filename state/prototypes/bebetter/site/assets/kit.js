/* The kit. One state for the whole page. Every control writes it, every display reads it: the print on the four garment
   symbols (so the hero, the studio, the work order and the home page tee all follow), the size run, the rail, the work
   order, the bar at the bottom, the stub above the form and the hidden form field. Nothing is typed twice. */
(function () {
  var d = document, root = d.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var dataEl = $('#bb-kit-data');
  if (!dataEl) return;
  var D = JSON.parse(dataEl.textContent);
  var SZ = D.sizes;
  function nl() { return root.lang === 'nl'; }
  function word(pair) { return pair[nl() ? 1 : 0]; }

  var S = {
    name: '', city: '', year: '', motto: '', garment: 'black', ink: 'sand', style: 'college', emblem: 'crest',
    logo: '', logoName: '', pieces: { tee: true, hood: false }, run: { tee: D.run.tee.slice(), hood: D.run.hood.slice() },
    view: 'tee', side: 'back'
  };
  var q = new URLSearchParams(location.search);
  if (q.get('gym')) S.name = q.get('gym').slice(0, 22);

  /* ---------------------------------------------------------------- what goes on the garment */
  function printName() { return (S.name.trim() || (nl() ? 'Jouw gym' : 'Your gym')).toUpperCase(); }
  function initials() {
    var w = printName().replace(/[^A-Z0-9À-Ý ]/g, ' ').split(/\s+/).filter(Boolean);
    if (!w.length) return 'BB';
    return (w.length > 1 ? w[0][0] + w[1][0] : w[0].slice(0, 2)).toUpperCase();
  }
  var defs = $('.bb-defs');
  var meas = d.createElementNS('http://www.w3.org/2000/svg', 'svg');
  meas.setAttribute('aria-hidden', 'true');
  meas.style.cssText = 'position:absolute;left:-9999px;top:0;width:10px;height:10px;visibility:hidden';
  var mt = d.createElementNS('http://www.w3.org/2000/svg', 'text');
  meas.appendChild(mt); d.body.appendChild(meas);
  function measure(txt, fam, ls, weight) {
    mt.textContent = txt || ' ';
    mt.setAttribute('font-family', fam); mt.setAttribute('font-size', '100');
    mt.style.letterSpacing = ls ? ls + 'em' : '0'; mt.style.fontWeight = weight || 400;
    return mt.getComputedTextLength() || 1;
  }
  function quadLen(a) { var l = 0, px = a[0], py = a[1]; for (var i = 1; i <= 60; i++) { var t = i / 60, u = 1 - t, x = u * u * a[0] + 2 * u * t * a[2] + t * t * a[4], y = u * u * a[1] + 2 * u * t * a[3] + t * t * a[5]; l += Math.hypot(x - px, y - py); px = x; py = y; } return l; }
  var ARC = { 'tee-back': quadLen([262, 360, 500, 214, 738, 360]), 'hood-back': quadLen([286, 470, 500, 352, 714, 470]) };
  var MAX = { 'tee-back': { a: 104, b: 170 }, 'hood-back': { a: 84, b: 140 }, 'tee-front': { c: 44 }, 'hood-front': { c: 38 } };

  function fam() { return D.styles[S.style][2]; }
  function setAll(sel, fn) { if (!defs) return; $$(sel, defs).forEach(fn); }

  function paint() {
    var g = D.garments[S.garment][2], ink = D.inks[S.ink][2], name = printName(), f = fam();
    var st = root.style;
    st.setProperty('--g', g); st.setProperty('--print', ink); st.setProperty('--pf', "'" + f + "'");
    var bone = S.garment === 'bone';
    st.setProperty('--wash-mode', bone ? 'multiply' : 'screen'); st.setProperty('--wash-op', bone ? '.12' : '.3');
    st.setProperty('--v-arc', S.style === 'block' ? 'none' : 'inline'); st.setProperty('--v-block', S.style === 'block' ? 'inline' : 'none');
    var em = S.emblem, hasLogo = !!S.logo;
    st.setProperty('--v-mono', em === 'crest' ? 'inline' : 'none');
    st.setProperty('--v-tdk', em === 'teddy' && !bone ? 'inline' : 'none');
    st.setProperty('--v-tlt', em === 'teddy' && bone ? 'inline' : 'none');
    st.setProperty('--v-logo', em === 'logo' && hasLogo ? 'inline' : 'none');
    st.setProperty('--v-ph', em === 'logo' && !hasLogo ? 'inline' : 'none');
    if (!defs) return;
    ['tee', 'hood'].forEach(function (k) {
      var back = $('#bb-' + k + '-back', defs), front = $('#bb-' + k + '-front', defs), v = k + '-back';
      if (back) {
        var arcT = $('.p-arc', back), blk = $('.p-block', back), w = +blk.getAttribute('data-w');
        $$('[data-p="name"]', back).forEach(function (n) { n.textContent = name; });
        arcT.setAttribute('font-size', Math.max(30, Math.min(MAX[v].a, 100 * ARC[v] * 0.9 / measure(name, f, 0.02))).toFixed(1));
        blk.setAttribute('font-size', Math.max(40, Math.min(MAX[v].b, 100 * w / measure(name, 'Anton', 0))).toFixed(1));
        var ini = $('[data-p="ini"]', back); ini.textContent = initials();
        ini.setAttribute('font-size', Math.min(110, 100 * 150 / measure(initials(), f, 0)).toFixed(1));
        var motto = S.motto.trim().toUpperCase(), mo = $('[data-p="motto"]', back);
        mo.textContent = motto; mo.setAttribute('font-size', Math.min(38, 100 * 540 / measure(motto, 'Archivo', 0.22, 700)).toFixed(1));
        var est = $('[data-p="est"]', back), city = $('[data-p="city"]', back), cityT = S.city.trim().toUpperCase(), estT = S.year ? 'EST ' + S.year : '';
        if (em === 'none') {
          est.textContent = [estT, cityT].filter(Boolean).join('  ·  ');
          est.setAttribute('x', 500); est.setAttribute('text-anchor', 'middle'); city.textContent = '';
        } else {
          est.textContent = estT; city.textContent = cityT;
          est.setAttribute('x', est.getAttribute('data-x') || est.getAttribute('x')); est.setAttribute('text-anchor', 'end');
        }
        [est, city].forEach(function (n) { n.setAttribute('font-size', Math.min(28, 100 * (em === 'none' ? 520 : 150) / measure(n.textContent, 'IBM Plex Mono', 0.14, 500)).toFixed(1)); });
        $$('[data-p="logo"]', back).forEach(function (im) { if (hasLogo) im.setAttribute('href', S.logo); else im.removeAttribute('href'); });
      }
      if (front) {
        var c = $('[data-p="name"]', front), vf = k + '-front';
        c.textContent = name;
        c.setAttribute('font-size', Math.min(MAX[vf].c, 100 * +c.getAttribute('data-w') / measure(name, f, 0.06)).toFixed(1));
      }
    });
    $$('[data-k-word]').forEach(function (w) { w.textContent = name; });
  }
  if (defs) $$('[data-p="est"]', defs).forEach(function (n) { n.setAttribute('data-x', n.getAttribute('x')); });

  /* the print is pulled across the shoulders, a squeegee sweep, on every change of colour or style */
  var pulling = 0;
  function pull() {
    if (!defs) return;
    var rects = $$('.pull', defs);
    $$('[data-sq]').forEach(function (s) { s.classList.remove('go'); void s.offsetWidth; if (!reduce) s.classList.add('go'); });
    if (reduce) { rects.forEach(function (r) { r.setAttribute('width', 1000); }); return; }
    var t0 = performance.now(), id = ++pulling;
    (function step(now) {
      if (id !== pulling) return;
      var k = Math.min(1, (now - t0) / 760), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      rects.forEach(function (r) { r.setAttribute('width', (120 + e * 760 + (k === 1 ? 200 : 0)).toFixed(0)); });
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------------------------------------------------------------- the studio */
  var stageUse = $('[data-k-stage] use'), heroUse = $('[data-k-hero] use'), tabs = $('[data-k-tabs]'), flip = $('[data-k-flip]');
  function pieceList() { return Object.keys(D.pieces).filter(function (k) { return S.pieces[k]; }); }
  function views() {
    if (stageUse) stageUse.setAttribute('href', '#bb-' + S.view + '-' + S.side);
    if (heroUse) heroUse.setAttribute('href', '#bb-' + S.view + '-back');
    if (flip) {
      flip.setAttribute('aria-pressed', S.side === 'front' ? 'true' : 'false');
      $('[data-k-side]', flip).textContent = S.side === 'back' ? (nl() ? 'Bekijk de voorkant' : 'Show the front') : (nl() ? 'Bekijk de achterkant' : 'Show the back');
    }
    if (tabs) {
      tabs.innerHTML = '';
      pieceList().forEach(function (k) {
        var b = d.createElement('button'); b.type = 'button'; b.textContent = word(D.pieces[k]);
        b.setAttribute('aria-pressed', k === S.view ? 'true' : 'false');
        b.addEventListener('click', function () { S.view = k; views(); });
        tabs.appendChild(b);
      });
    }
  }
  if (flip) flip.addEventListener('click', function () { S.side = S.side === 'back' ? 'front' : 'back'; views(); });

  $$('[data-k]').forEach(function (inp) {
    var key = inp.getAttribute('data-k');
    if (key === 'name' && S.name) inp.value = S.name;
    inp.addEventListener('input', function () {
      var v = inp.value;
      if (key === 'year') { v = v.replace(/\D/g, '').slice(0, 4); if (inp.value !== v) inp.value = v; }
      S[key] = v;
      if (key === 'name') $$('[data-k="name"], [data-form-gym]').forEach(function (o) { if (o !== inp) o.value = v; });
      update();
    });
    inp.addEventListener('change', function () { if (key === 'name') pull(); });
    if (key === 'name') inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); pull(); } });
  });
  function radios(name, key) {
    $$('input[name="' + name + '"]').forEach(function (r) {
      r.addEventListener('change', function () { if (!r.checked) return; S[key] = r.value; update(); pull(); if (key === 'emblem') upBox(); });
    });
  }
  radios('k-garment', 'garment'); radios('k-ink', 'ink'); radios('k-style', 'style'); radios('k-emblem', 'emblem');
  $$('input[name="k-piece"]').forEach(function (c) {
    c.addEventListener('change', function () {
      if (!c.checked && pieceList().length === 1) { c.checked = true; return; }
      S.pieces[c.value] = c.checked;
      if (c.checked) S.view = c.value; else if (S.view === c.value) S.view = pieceList()[0];
      $$('[data-sr]').forEach(function (g) { g.hidden = !S.pieces[g.getAttribute('data-sr')]; });
      views(); update(); pull();
    });
  });

  /* their logo, in the middle of the print and attached to the form */
  var up = $('[data-k-up]'), logoIn = $('[data-k-logo]'), logoName = $('[data-k-logo-name]'), formLogo = $('[data-form-logo]');
  function upBox() { if (up) up.hidden = S.emblem !== 'logo'; }
  function takeLogo(file, from) {
    if (!file) return;
    if (!/^image\//.test(file.type) || file.size > 5 * 1024 * 1024) { if (logoName) logoName.textContent = nl() ? 'Dat bestand werkt niet, kies een afbeelding tot 5 MB.' : "That file won't work, choose an image up to 5 MB."; return; }
    var r = new FileReader();
    r.onload = function () {
      S.logo = r.result; S.logoName = file.name; S.emblem = 'logo';
      var radio = $('input[name="k-emblem"][value="logo"]'); if (radio) radio.checked = true;
      upBox();
      if (logoName) logoName.textContent = file.name;
      if (from !== 'form' && formLogo) { try { var dt = new DataTransfer(); dt.items.add(file); formLogo.files = dt.files; } catch (e) {} }
      if (from === 'form' && logoIn) { try { var dt2 = new DataTransfer(); dt2.items.add(file); logoIn.files = dt2.files; } catch (e) {} }
      update(); pull();
    };
    r.readAsDataURL(file);
  }
  if (logoIn) logoIn.addEventListener('change', function () { takeLogo(logoIn.files[0], 'studio'); });
  if (formLogo) formLogo.addEventListener('change', function () { takeLogo(formLogo.files[0], 'form'); });

  /* ---------------------------------------------------------------- the size run, bars you drag */
  var SCALE = 40; /* a bar is full at 40 of one size, more goes on with the buttons or the keys */
  function total(k) { return S.pieces[k] ? S.run[k].reduce(function (a, b) { return a + b; }, 0) : 0; }
  function grand() { return pieceList().reduce(function (a, k) { return a + total(k); }, 0); }
  $$('[data-sr]').forEach(function (g) {
    var k = g.getAttribute('data-sr');
    $$('.sb', g).forEach(function (sb, i) {
      var t = $('[data-sb]', sb);
      function set(v) { v = Math.max(0, Math.min(300, Math.round(v))); if (v === S.run[k][i]) return; S.run[k][i] = v; update(); }
      function fromY(y) { var r = t.getBoundingClientRect(); set(Math.min(SCALE, (r.bottom - y) / r.height * SCALE)); }
      t.addEventListener('pointerdown', function (e) { t.setPointerCapture(e.pointerId); fromY(e.clientY); e.preventDefault(); });
      t.addEventListener('pointermove', function (e) { if (t.hasPointerCapture(e.pointerId)) fromY(e.clientY); });
      t.addEventListener('keydown', function (e) {
        var v = S.run[k][i], m = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 };
        if (e.key in m) { set(v + m[e.key]); e.preventDefault(); } else if (e.key === 'Home') { set(0); e.preventDefault(); } else if (e.key === 'End') { set(SCALE); e.preventDefault(); }
      });
      $$('[data-sb-step]', sb).forEach(function (b) { b.addEventListener('click', function () { set(S.run[k][i] + +b.getAttribute('data-sb-step')); }); });
    });
  });
  function bars() {
    $$('[data-sr]').forEach(function (g) {
      var k = g.getAttribute('data-sr');
      $$('.sb', g).forEach(function (sb, i) {
        var v = S.run[k][i], t = $('[data-sb]', sb);
        $('[data-sb-n]', sb).textContent = v; t.style.setProperty('--v', Math.min(1, v / SCALE).toFixed(3)); t.setAttribute('aria-valuenow', v); t.classList.toggle('over', v > SCALE);
      });
      $('[data-sr-tot]', g).textContent = S.run[k].reduce(function (a, b) { return a + b; }, 0);
    });
  }

  /* the rail fills, one hanger per piece, a size divider before each size */
  var rackIn = $('[data-rack-in]'), prev = {}, rackKey = '';
  function rack(force) {
    if (!rackIn) return;
    var key = pieceList().join() + S.garment + JSON.stringify(S.run) + rackIn.clientWidth;
    if (key === rackKey && !force) return;
    rackKey = key;
    var out = '', items = 0, divs = 0, seen = {};
    pieceList().forEach(function (k) {
      SZ.forEach(function (s, i) {
        var n = S.run[k][i]; if (!n) return;
        out += '<span class="rk-div">' + s + '</span>'; divs++;
        var was = prev[k + s] || 0;
        for (var j = 0; j < n; j++) out += '<span class="rk' + (j >= was ? ' new' : '') + '" style="--d:' + ((j - was) * 25) + 'ms"><svg class="hg" viewBox="0 0 60 26"><use href="#mini-hanger"/></svg><svg class="tt" viewBox="0 0 60 64"><use href="#mini-' + k + '"/></svg></span>';
        items += n; seen[k + s] = n;
      });
    });
    prev = seen;
    rackIn.innerHTML = out;
    /* one rail when it fits with each hanger at least a third showing, otherwise the rail wraps into rows */
    var narrow = rackIn.clientWidth < 640, iw = narrow ? 30 : 38, dw = narrow ? 30 : 44;
    var W = rackIn.clientWidth - 20 - divs * dw, ov = items > 1 ? Math.min(0, (W - iw) / (items - 1) - iw) : 0;
    var wrap = ov < -iw * 0.66;
    if (wrap) ov = -iw * 0.5;
    rackIn.classList.toggle('wrap', wrap);
    rackIn.style.setProperty('--iw', iw + 'px'); rackIn.style.setProperty('--ov', ov.toFixed(2) + 'px');
    rackIn.style.setProperty('--rk-g', D.garments[S.garment][2]);
    if (reduce) $$('.rk.new', rackIn).forEach(function (e) { e.classList.remove('new'); });
  }
  addEventListener('resize', function () { prev = {}; for (var k in S.pieces) SZ.forEach(function (s, i) { prev[k + s] = S.run[k][i]; }); rack(true); });

  /* ---------------------------------------------------------------- the work order, the stub, the bar, the form field */
  function piecesText() { return pieceList().map(function (k) { return word(D.pieces[k]); }).join(' + '); }
  function emblemText() { var t = word(D.emblems[S.emblem]); return S.emblem === 'logo' && S.logoName ? t + ', ' + S.logoName : t; }
  function summary() {
    var L = nl() ? ['Gym', 'Stad', 'Sinds', 'Stukken', 'Stof', 'Letters', 'Kleur print', 'Midden', 'Motto', 'Totaal', 'maten'] : ['Gym', 'City', 'Since', 'Pieces', 'Garment', 'Lettering', 'Print colour', 'Middle', 'Motto', 'Total', 'sizes'];
    var lines = [L[0] + ': ' + printName(), L[1] + ': ' + (S.city.trim() || '·'), L[2] + ': ' + (S.year || '·'), L[3] + ': ' + piecesText(),
      L[4] + ': ' + word(D.garments[S.garment]), L[5] + ': ' + word(D.styles[S.style]), L[6] + ': ' + word(D.inks[S.ink]), L[7] + ': ' + emblemText(),
      L[8] + ': ' + (S.motto.trim() || '·')];
    pieceList().forEach(function (k) { lines.push(word(D.pieces[k]) + ' ' + L[10] + ': ' + SZ.map(function (s, i) { return s + ' ' + S.run[k][i]; }).join(', ') + ' (' + total(k) + ')'); });
    lines.push(L[9] + ': ' + grand());
    return lines.join('\n');
  }
  var woFlats = $('[data-wo-flats]'), lastFlats = '';
  function order() {
    var set = function (k, v) { var e = $('[data-wo="' + k + '"]'); if (e) e.textContent = v; };
    set('gym', printName()); set('city', S.city.trim().toUpperCase() || '·'); set('year', S.year || '·'); set('pieces', piecesText());
    set('garment', word(D.garments[S.garment])); set('style', word(D.styles[S.style])); set('ink', word(D.inks[S.ink]));
    set('emblem', word(D.emblems[S.emblem])); set('motto', S.motto.trim().toUpperCase() || '·');
    Object.keys(D.pieces).forEach(function (k) {
      var row = $('[data-wo-row="' + k + '"]'); if (!row) return;
      row.hidden = !S.pieces[k];
      SZ.forEach(function (s, i) { var c = $('[data-wo-n="' + k + '-' + s + '"]'); if (c) c.textContent = S.run[k][i]; });
      var t = $('[data-wo-t="' + k + '"]'); if (t) t.textContent = S.run[k].reduce(function (a, b) { return a + b; }, 0);
    });
    var gt = $('[data-wo-total]'); if (gt) gt.textContent = grand();
    var lg = $('[data-wo-logo]'); if (lg) { lg.hidden = !S.logo; $('[data-wo-logo-name]').textContent = S.logoName; }
    if (woFlats) {
      var key = pieceList().join(',') + (nl() ? 'nl' : 'en');
      if (key !== lastFlats) {
        lastFlats = key;
        woFlats.innerHTML = pieceList().map(function (k) {
          return ['back', 'front'].map(function (side) {
            return '<figure><svg class="garment wo-g" viewBox="0 0 1000 1080" aria-hidden="true" focusable="false"><use href="#bb-' + k + '-' + side + '"/></svg><figcaption>' + word(D.pieces[k]) + ', ' + (side === 'back' ? (nl() ? 'achter' : 'back') : (nl() ? 'voor' : 'front')) + '</figcaption></figure>';
          }).join('');
        }).join('');
      }
    }
    var dt = $('[data-wo-date]'); if (dt) dt.textContent = new Intl.DateTimeFormat(nl() ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
    var stub = $('[data-stub-t]'); if (stub) stub.textContent = printName() + ' · ' + piecesText() + ' · ' + grand();
    var kb = $('[data-kbar-gym]'); if (kb) kb.textContent = printName();
    var kn = $('[data-kbar-n]'); if (kn) kn.textContent = piecesText() + ' · ' + grand();
    var tot = $('[data-k-total]'); if (tot) tot.textContent = grand();
    var kit = $('[data-form-kit]'); if (kit) kit.value = summary();
    var fg = $('[data-form-gym]'); if (fg && !fg.value && S.name) fg.value = S.name;
    $$('[data-mini-go]').forEach(function (a) { a.href = '/gyms/' + (S.name.trim() ? '?gym=' + encodeURIComponent(S.name.trim()) : ''); });
  }
  var fg0 = $('[data-form-gym]');
  if (fg0) fg0.addEventListener('input', function () { S.name = fg0.value.slice(0, 22); $$('[data-k="name"]').forEach(function (o) { o.value = S.name; }); update(); });

  function update() { paint(); bars(); rack(); order(); }
  window.bbKit = { state: S, summary: summary, grand: grand, total: total };

  /* the bar at the bottom, after the first screen and gone before the form */
  var bar = $('[data-kbar]'), hero = $('.gh'), send = $('#send');
  function barLook() {
    if (!bar || !hero || !send) return;
    var on = hero.getBoundingClientRect().bottom < 0 && send.getBoundingClientRect().top > innerHeight * 0.85;
    bar.classList.toggle('on', on); bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    if (on) bar.removeAttribute('inert'); else bar.setAttribute('inert', '');
  }
  addEventListener('scroll', barLook, { passive: true }); addEventListener('resize', barLook);

  /* ---------------------------------------------------------------- the rail that empties in four hours */
  var ck = $('[data-ck]');
  if (ck) {
    var tees = $$('.ck-tees i', ck), order4 = tees.map(function (_, i) { return i; });
    var seed = 7; order4.sort(function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 - 0.5; });
    var thr = []; order4.forEach(function (ti, n) { thr[ti] = 0.06 + n / tees.length * 0.82; });
    var hand = $('[data-ck-hand]', ck), min = $('[data-ck-min]', ck), sweep = $('[data-ck-sweep]', ck), tt = $('[data-ck-t]', ck);
    var l1 = $('.ck-1', ck), l2 = $('.ck-2', ck), l3 = $('.ck-3', ck);
    var draw = function (p) {
      var a = p * 120, r = 96, rad = (a - 90) * Math.PI / 180;
      hand.setAttribute('transform', 'rotate(' + a.toFixed(1) + ')'); min.setAttribute('transform', 'rotate(' + (p * 1440).toFixed(1) + ')');
      sweep.setAttribute('d', 'M0 0L0 -96A96 96 0 0 1 ' + (r * Math.cos(rad)).toFixed(2) + ' ' + (r * Math.sin(rad)).toFixed(2) + 'Z');
      tt.textContent = (p >= 1 ? 4 : Math.floor(p * 4)) + 'h';
      tees.forEach(function (t, i) { t.classList.toggle('gone', p > thr[i]); });
      l1.classList.add('on'); l2.classList.toggle('on', p > 0.3); l3.classList.toggle('on', p > 0.9);
    };
    if (reduce) draw(1);
    else {
      var ckLook = function () { var r = ck.getBoundingClientRect(), span = r.height - innerHeight; draw(Math.max(0, Math.min(1, span > 0 ? -r.top / span : 1))); };
      addEventListener('scroll', ckLook, { passive: true }); addEventListener('resize', ckLook); ckLook();
    }
  }

  /* ---------------------------------------------------------------- the kits, a rail you drag */
  $$('[data-kr]').forEach(function (kr) {
    var down = false, x0 = 0, s0 = 0, moved = 0;
    kr.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = 0; x0 = e.clientX; s0 = kr.scrollLeft; kr.classList.add('drag'); kr.setPointerCapture(e.pointerId); });
    kr.addEventListener('pointermove', function (e) { if (!down) return; moved = Math.abs(e.clientX - x0); kr.scrollLeft = s0 - (e.clientX - x0); });
    var end = function () { down = false; kr.classList.remove('drag'); };
    kr.addEventListener('pointerup', end); kr.addEventListener('pointercancel', end);
    kr.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { kr.scrollBy({ left: 320 }); e.preventDefault(); } if (e.key === 'ArrowLeft') { kr.scrollBy({ left: -320 }); e.preventDefault(); } });
  });

  d.addEventListener('bb-lang', function () { lastFlats = ''; views(); update(); });
  d.addEventListener('bb-sent', function () { var wo = $('[data-wo-sheet]'); if (wo) wo.classList.add('stamped'); });

  upBox(); views(); update(); barLook();
  var go = function () { paint(); pull(); };
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { setTimeout(go, 250); }); else go();
})();
