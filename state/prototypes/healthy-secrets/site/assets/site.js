(function () {
  'use strict';
  var d = document, root = d.documentElement;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function t(de, en) { return '<span class="l-de">' + de + '</span><span class="l-en" lang="en">' + en + '</span>'; }
  function eur(v) { return v.toFixed(2).replace('.', ',') + ' €'; }
  function en() { return root.lang === 'en'; }

  /* ---------- language */
  var metaDe = { title: d.title, desc: ($('meta[name="description"]') || {}).content };
  function setLang(l, save) {
    root.lang = l;
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    $$('*').forEach(function (el) {
      for (var i = 0; i < el.attributes.length; i++) {
        var a = el.attributes[i];
        if (a.name.indexOf('data-i18n-') === 0 && a.name.slice(-3) !== '-de') {
          var name = a.name.slice(10), keep = 'data-i18n-' + name + '-de';
          if (!el.hasAttribute(keep)) el.setAttribute(keep, el.getAttribute(name) || '');
          el.setAttribute(name, l === 'en' ? a.value : el.getAttribute(keep));
        }
      }
    });
    $$('option[data-en]').forEach(function (o) {
      if (!o.dataset.de) o.dataset.de = o.textContent;
      o.textContent = l === 'en' ? o.dataset.en : o.dataset.de;
    });
    var te = $('meta[name="title-en"]'), de = $('meta[name="description-en"]'), md = $('meta[name="description"]');
    d.title = l === 'en' && te ? te.content : metaDe.title;
    if (md) md.content = l === 'en' && de ? de.content : metaDe.desc;
    if (save) store('hs-lang', l);
    tickDial(true);
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang, true); }); });

  /* ---------- mobile menu */
  var mb = $('.menu-btn'), mn = $('#mnav');
  function menu(open) {
    if (!mb) return;
    mb.setAttribute('aria-expanded', String(open)); mn.classList.toggle('open', open);
    d.body.style.overflow = open ? 'hidden' : '';
  }
  if (mb) mb.addEventListener('click', function () { menu(mb.getAttribute('aria-expanded') !== 'true'); });
  $$('#mnav a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });

  /* ---------- reveal, by position, never forced */
  var rvs = [];
  function collect() { rvs = $$('.rv:not(.in), h1:not(.in), h2:not(.in), .chart:not(.in)'); }
  function reveal() {
    var h = window.innerHeight;
    rvs = rvs.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.92 && r.bottom > 0) { el.classList.add('in'); return false; }
      return true;
    });
  }

  /* ---------- the day dial */
  var day = $('.day'), hours = [], ticks = [], sun, timeEl, nameEl, lastKey = '';
  if (day) {
    hours = $$('.hour', day);
    ticks = $$('.dial-ticks a', day);
    sun = $('.dial-sun', day); timeEl = $('.dial-time', day); nameEl = $('.dial-name', day);
  }
  function fmt(H) {
    var h = Math.floor(H), m = Math.round((H - h) * 4) * 15;
    if (m === 60) { h += 1; m = 0; }
    h = h % 24;
    var mm = m < 10 ? '0' + m : '' + m;
    if (en()) { var h12 = h % 12 || 12; return h12 + '.' + mm + (h < 12 ? ' am' : ' pm'); }
    return h + '.' + mm + ' Uhr';
  }
  function tickDial(force) {
    if (!day || !hours.length) return;
    var dr = day.getBoundingClientRect(), vh = window.innerHeight;
    day.classList.toggle('on', dr.top < vh * 0.55 && dr.bottom > vh * 0.6);
    var mid = window.scrollY + window.innerHeight * 0.45, H, f = 0, idx = 0;
    var tops = hours.map(function (s) { return s.getBoundingClientRect().top + window.scrollY; });
    var last = hours[hours.length - 1], lastEnd = tops[tops.length - 1] + last.offsetHeight;
    var hs = hours.map(function (s) { return parseFloat(s.dataset.h); });
    if (mid <= tops[0]) { H = hs[0]; f = 0; idx = 0; }
    else {
      for (var i = 0; i < hours.length; i++) {
        var a = tops[i], b = i < hours.length - 1 ? tops[i + 1] : lastEnd;
        if (mid >= a && (mid < b || i === hours.length - 1)) {
          var p = Math.min(1, Math.max(0, (mid - a) / (b - a)));
          var nh = i < hours.length - 1 ? hs[i + 1] : hs[i] + 1;
          H = hs[i] + p * (nh - hs[i]);
          f = i < hours.length - 1 ? i + p : i; idx = i; break;
        }
      }
    }
    var tt = f / (hours.length - 1), y = (40 - 120 * tt * (1 - tt)) / 80;
    sun.style.setProperty('--t', tt.toFixed(4)); sun.style.setProperty('--y', y.toFixed(4));
    sun.classList.toggle('moon', H >= 20);
    timeEl.textContent = fmt(H);
    var s = hours[idx], key = s.dataset.tone + (en() ? 'en' : 'de');
    if (key !== lastKey || force) {
      lastKey = key;
      nameEl.textContent = en() ? s.dataset.nameEn : s.dataset.nameDe;
      day.dataset.now = s.dataset.tone;
      ticks.forEach(function (a, i) { a.setAttribute('aria-current', String(i === idx)); });
    }
  }

  var raf = 0;
  function onScroll() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; reveal(); tickDial(); }); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- cart */
  var P = {};
  try { P = JSON.parse(($('#pdata') || {}).textContent || '{}'); } catch (e) { P = {}; }
  var ORDER = ['morgen', 'nachmittag', 'abend', 'nacht'];
  var SLOTN = { morgen: ['Morgens', 'Morning'], nachmittag: ['Nachmittags', 'Afternoon'], abend: ['Nach dem Essen', 'After dinner'], nacht: ['Vor dem Schlafen', 'Before bed'] };
  function cart() { try { var c = JSON.parse(store('hs-cart') || '{}'); return c && typeof c === 'object' ? c : {}; } catch (e) { return {}; } }
  function save(c) { store('hs-cart', JSON.stringify(c)); paint(); }
  function count(c) { var n = 0; for (var k in c) if (P[k]) n += c[k]; return n; }
  function total(c) { var s = 0; for (var k in c) if (P[k]) s += c[k] * P[k].price; return s; }
  function add(id, n) { var c = cart(); c[id] = (c[id] || 0) + (n || 1); save(c); bump(); }
  function setQ(id, q) { var c = cart(); if (q <= 0) delete c[id]; else c[id] = q; save(c); }
  function bump() { var b = $('.cart-n'); if (!b) return; b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); setTimeout(function () { b.classList.remove('bump'); }, 260); }
  var toastT;
  function toast(html) {
    var el = $('#toast'); if (!el) return;
    el.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + html + '</span>';
    el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  var IC = {
    plus: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    minus: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    clock: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    x: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };
  function items(c) {
    return ORDER.map(function (slot) {
      var ids = Object.keys(c).filter(function (k) { return P[k] && P[k].slot === slot; });
      return { slot: slot, ids: ids };
    }).filter(function (g) { return g.ids.length; });
  }
  function itemsHtml(c, editable) {
    return items(c).map(function (g) {
      var p0 = P[g.ids[0]];
      return '<div class="cgroup"><p class="cg-t">' + IC.clock + t(p0.time[0] + ', ' + SLOTN[g.slot][0], p0.time[1] + ', ' + SLOTN[g.slot][1]) + '</p>' +
        g.ids.map(function (id) {
          var p = P[id], q = c[id];
          return '<div class="citem"><img src="assets/img/' + p.img + '.webp" alt="" width="64" height="64"><div><b>' + esc(p.name) + '</b><small>' + t(p.size[0], p.size[1]) + '</small>' +
            (editable ? '<div class="qty"><button type="button" data-q="' + id + '" data-d="-1">' + IC.minus + '<span class="vh">' + t('Weniger', 'Fewer') + '</span></button><output aria-live="polite">' + q + '</output><button type="button" data-q="' + id + '" data-d="1">' + IC.plus + '<span class="vh">' + t('Mehr', 'More') + '</span></button></div>' : '<small> × ' + q + '</small>') +
            '</div><div class="cprice">' + eur(p.price * q) + '</div></div>';
        }).join('') + '</div>';
    }).join('');
  }
  function paint() {
    var c = cart(), n = count(c), badge = $('.cart-n');
    if (badge) { badge.textContent = n; badge.dataset.n = n; }
    var body = $('#cartBody'), ft = $('#cartFt');
    if (body) {
      if (!n) {
        body.innerHTML = '<div class="empty"><img src="assets/img/m-bear.webp" alt="" width="120" height="179"><p>' + t('Dein Tag ist noch leer. Fang doch mit dem Frühstück an.', "Your day's still empty. Why not start with breakfast?") + '</p><a class="btn sm" href="shop.html">' + t('Zum Shop', 'Go to the shop') + '</a></div>';
        ft.hidden = true;
      } else { body.innerHTML = itemsHtml(c, true); ft.hidden = false; $('#cartSub').textContent = eur(total(c)); }
    }
    paintCheckout();
  }
  d.addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]');
    if (q) { var c = cart(); setQ(q.dataset.q, (c[q.dataset.q] || 0) + parseInt(q.dataset.d, 10)); return; }
    var a = e.target.closest('[data-add]');
    if (a && P[a.dataset.add]) {
      var n = parseInt(a.dataset.n || '1', 10);
      add(a.dataset.add, n);
      toast(t(esc(P[a.dataset.add].name) + ' liegt jetzt in deinem Tag.', esc(P[a.dataset.add].name) + ' is in your day now.'));
      a.classList.add('done'); setTimeout(function () { a.classList.remove('done'); }, 1400);
    }
  });

  var drawer = $('#cart'), scrim = $('.scrim'), cbtn = $('.cart-btn'), lastFocus;
  function openCart() {
    if (!drawer) return; lastFocus = d.activeElement;
    drawer.hidden = false; scrim.hidden = false; cbtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function () { drawer.classList.add('open'); });
    var f = $('button, a', drawer); if (f) f.focus();
  }
  function closeCart() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('open'); cbtn.setAttribute('aria-expanded', 'false'); scrim.hidden = true;
    setTimeout(function () { drawer.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus();
  }
  if (cbtn) cbtn.addEventListener('click', openCart);
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeCart); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCart(); menu(false); }
    if (e.key === 'Tab' && drawer && !drawer.hidden) {
      var f = $$('button:not([disabled]), a[href], input', drawer); if (!f.length) return;
      if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- product detail dialog */
  var dlg = $('#pdlg'), dlgIn = $('#pdlgIn');
  d.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (!o || !dlg || !dlg.showModal) return;
    var card = o.closest('.pcard'), id = o.dataset.open, p = P[id]; if (!card || !p) return;
    var img = $('.pc-img img', card), pd = $('.pd dl', card).cloneNode(true);
    var pp = $('.pc-pp', card);
    dlgIn.innerHTML = '<div class="pdlg-img"><img src="' + img.getAttribute('src') + '" alt="' + esc(img.getAttribute('alt')) + '" width="900" height="1125"></div>' +
      '<div class="pdlg-b"><button type="button" class="icon-btn" data-dlg-close>' + IC.x + '<span class="vh">' + t('Schließen', 'Close') + '</span></button>' +
      '<p class="pc-cat">' + $('.pc-cat', card).innerHTML + '</p><h2 id="pdlgT">' + esc(p.name) + '</h2><p class="pc-size">' + $('.pc-size', card).innerHTML + '</p>' +
      '<p>' + $('.pc-lead', card).innerHTML + '</p>' +
      '<p class="pc-price"><strong>' + eur(p.price) + '</strong><span>' + t('inkl. Versand', 'shipping included') + (pp ? ', ' + pp.innerHTML : '') + '</span></p>' +
      '<div class="pdlg-buy"><div class="qty"><button type="button" data-dq="-1">' + IC.minus + '<span class="vh">' + t('Weniger', 'Fewer') + '</span></button><output id="dq">1</output><button type="button" data-dq="1">' + IC.plus + '<span class="vh">' + t('Mehr', 'More') + '</span></button></div>' +
      '<button type="button" class="btn add" data-add="' + id + '" data-n="1">' + IC.plus + '<span>' + t('In meinen Tag', 'Add to my day') + '</span></button></div>' +
      '<div class="pd"><dl></dl></div></div>';
    $('.pdlg-b .pd', dlgIn).replaceChild(pd, $('.pdlg-b .pd dl', dlgIn));
    dlg.showModal();
  });
  if (dlg) {
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-dlg-close]')) dlg.close();
      var b = e.target.closest('[data-dq]');
      if (b) {
        var o = $('#dq'), v = Math.max(1, Math.min(20, parseInt(o.textContent, 10) + parseInt(b.dataset.dq, 10)));
        o.textContent = v; $('.pdlg-buy [data-add]').dataset.n = v;
      }
    });
  }

  /* ---------- shop filter */
  var fb = $$('.filters button');
  function filter(slot) {
    fb.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === slot)); });
    var g = $('.pgrid'); if (!g) return;
    $$('.pcard', g).forEach(function (c) { c.classList.toggle('off', slot !== 'all' && c.dataset.slot !== slot); });
    $$('.slot-head', g).forEach(function (h) { h.classList.toggle('off', slot !== 'all' && h.id !== slot); });
    $$('.pcard', g).forEach(function (c) { if (!c.classList.contains('off')) c.classList.add('in'); });
  }
  fb.forEach(function (b) { b.addEventListener('click', function () { filter(b.dataset.filter); }); });
  $$('[data-filter-go]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!fb.length) return;
      e.preventDefault(); filter(a.dataset.filterGo);
      var f0 = $('.filters'); if (f0) f0.scrollIntoView();
    });
  });
  if (fb.length) {
    var hs = (location.hash || '').slice(1);
    if (SLOTN[hs]) { filter(hs); var f0 = $('.filters'); if (f0) setTimeout(function () { f0.scrollIntoView(); }, 30); }
  }

  /* ---------- day planner */
  var pl = $('#planer');
  if (pl) {
    var qs = $$('.q', pl), res = $('.res', pl), prog = $$('.pl-prog i', pl), cur = 0, ans = {};
    function show(i) {
      cur = i;
      qs.forEach(function (q, k) { q.classList.toggle('cur', k === i); });
      res.classList.toggle('cur', i === qs.length);
      prog.forEach(function (p, k) { p.classList.toggle('on', k <= i); });
      $('[data-pl="back"]', pl).hidden = i === 0 || i === qs.length;
      var nx = $('[data-pl="next"]', pl);
      nx.hidden = i === qs.length;
      nx.disabled = i < qs.length && !answered(i);
    }
    function answered(i) { var k = qs[i].dataset.key; return qs[i].dataset.multi ? true : !!ans[k]; }
    $$('.opt', pl).forEach(function (o) {
      o.addEventListener('click', function () {
        var q = o.closest('.q'), k = q.dataset.key;
        if (q.dataset.multi) {
          var on = o.getAttribute('aria-pressed') !== 'true';
          if (o.dataset.v === 'none' && on) $$('.opt', q).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          else if (on) { var nn = $('.opt[data-v="none"]', q); if (nn) nn.setAttribute('aria-pressed', 'false'); }
          o.setAttribute('aria-pressed', String(on));
          ans[k] = $$('.opt[aria-pressed="true"]', q).map(function (x) { return x.dataset.v; });
        } else {
          $$('.opt', q).forEach(function (x) { x.setAttribute('aria-pressed', String(x === o)); });
          ans[k] = o.dataset.v;
          setTimeout(function () { show(cur + 1); if (cur === qs.length) result(); }, 220);
        }
        $('[data-pl="next"]', pl).disabled = !answered(cur);
      });
    });
    $('[data-pl="next"]', pl).addEventListener('click', function () { show(cur + 1); if (cur === qs.length) result(); });
    $('[data-pl="back"]', pl).addEventListener('click', function () { show(Math.max(0, cur - 1)); });
    $('[data-pl="again"]', pl).addEventListener('click', function () { ans = {}; $$('.opt', pl).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); show(0); });
    var picked = [];
    function result() {
      var flags = ans.flags || [], notes = [];
      var pick = [ans.morgen, ans.nachmittag, ans.abend].filter(function (v) { return v && P[v]; });
      if (flags.indexOf('med') > -1 && pick.indexOf('lullaby') > -1) {
        pick[pick.indexOf('lullaby')] = 'moon';
        notes.push(t('Lullaby Leaves enthält Johanniskraut, und das kann mit bestimmten Arzneimitteln wechselwirken. Wir haben dir stattdessen Moon Milk eingeplant. Frag im Zweifel deine Ärztin, deinen Arzt oder die Apotheke.', "Lullaby Leaves contains St John's wort, which can interact with certain medicines, so we've put Moon Milk in your evening instead. If you're unsure, ask your doctor or pharmacist."));
      }
      if (flags.indexOf('preg') > -1 && pick.indexOf('slim') > -1) {
        pick.splice(pick.indexOf('slim'), 1);
        notes.push(t('Slimming Sips enthält Koffein und ist in der Schwangerschaft und Stillzeit nicht empfohlen. Darum ist er nicht in deinem Tag.', "Slimming Sips contains caffeine and isn't recommended while pregnant or breastfeeding, so we've left it out."));
      }
      pick = pick.filter(function (v, i) { return pick.indexOf(v) === i; });
      picked = pick;
      var cups = 0, cost = 0, sum = 0;
      pick.forEach(function (id) { var p = P[id]; sum += p.price; if (p.portions) { cups += 1; cost += p.price / p.portions; } });
      $('.res-day', pl).innerHTML = pick.length ? pick.map(function (id) {
        var p = P[id];
        return '<li><span class="t">' + t(p.time[0].replace(' Uhr', ''), p.time[1]) + '</span><img src="assets/img/' + p.img + '.webp" alt="" width="56" height="56"><span><b>' + esc(p.name) + '</b><small>' + t(p.size[0], p.size[1]) + '</small></span><span class="cprice">' + eur(p.price) + '</span></li>';
      }).join('') : '<li><span></span><span></span><span>' + t('Dein Tag läuft schon gut. Komm trotzdem auf einen Cold Brew in den Club.', "Your day already works. Come by the club for a cold brew anyway.") + '</span></li>';
      var stats = '';
      if (cups) stats += '<div><b>' + eur(cost) + '</b><span>' + t('kosten deine Fibre Flow Drinks pro Tag', 'a day for your Fibre Flow drinks') + '</span></div><div><b>' + t('14 Tage', '14 days') + '</b><span>' + t('reicht ein Beutel bei einer Tasse am Tag', 'is how long a pouch lasts at a cup a day') + '</span></div>';
      $('.res-sum', pl).innerHTML = stats; $('.res-sum', pl).hidden = !stats;
      $('.res-notes', pl).innerHTML = notes.map(function (n) { return '<p class="note light">' + IC.clock.replace('class="ic"', 'class="ic"') + '<span>' + n + '</span></p>'; }).join('');
      $('.res-total', pl).innerHTML = pick.length ? t('Zusammen ' + eur(sum) + ', Versand inklusive.', 'Together ' + eur(sum) + ', shipping included.') : '';
      $('[data-pl="all"]', pl).hidden = !pick.length;
    }
    $('[data-pl="all"]', pl).addEventListener('click', function () {
      picked.forEach(function (id) { add(id, 1); });
      toast(t('Dein Tag ist eingepackt.', 'Your day is packed.')); openCart();
    });
    show(0);
  }

  /* ---------- tabs */
  $$('[role="tablist"]').forEach(function (tl) {
    var tabs = $$('[role="tab"]', tl);
    function sel(tab) {
      tabs.forEach(function (t2) {
        var on = t2 === tab, p = d.getElementById(t2.getAttribute('aria-controls'));
        t2.setAttribute('aria-selected', String(on)); t2.tabIndex = on ? 0 : -1;
        if (p) { p.hidden = !on; if (on) $$('.chart', p).forEach(function (c) { c.classList.remove('in'); void c.offsetWidth; c.classList.add('in'); }); }
      });
    }
    tabs.forEach(function (t2, i) {
      t2.addEventListener('click', function () { sel(t2); });
      t2.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (k) { e.preventDefault(); var n = tabs[(i + k + tabs.length) % tabs.length]; sel(n); n.focus(); }
      });
    });
    sel(tabs.filter(function (t2) { return t2.getAttribute('aria-selected') === 'true'; })[0] || tabs[0]);
  });

  /* ---------- forms and steppers */
  var mailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validate(scope) {
    var bad = [];
    $$('[required]', scope).forEach(function (el) {
      if (el.closest('[hidden]') && !scope.contains(el)) return;
      var f = el.closest('.field, .consent') || el.parentNode, ok;
      if (el.type === 'checkbox') ok = el.checked;
      else if (el.type === 'radio') ok = !!$('input[name="' + el.name + '"]:checked', scope);
      else if (el.type === 'email') ok = mailRe.test(el.value.trim());
      else ok = el.value.trim() !== '';
      f.classList.toggle('bad', !ok);
      if (!ok) bad.push(el);
    });
    $$('[data-group-req]', scope).forEach(function (fs) {
      var ok = !!$('input:checked', fs);
      fs.classList.toggle('bad', !ok); if (!ok) bad.push($('input', fs));
    });
    if (bad.length) bad[0].focus();
    return !bad.length;
  }
  d.addEventListener('input', function (e) { var f = e.target.closest('.bad'); if (f) f.classList.remove('bad'); });
  d.addEventListener('change', function (e) { var f = e.target.closest('.bad'); if (f) f.classList.remove('bad'); });

  $$('[data-steps]').forEach(function (w) {
    var steps = $$('.stp', w), bar = $$('.stepper li', w), i = 0;
    function go(n) {
      i = n;
      steps.forEach(function (s, k) { s.classList.toggle('cur', k === i); });
      bar.forEach(function (b, k) { if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); b.classList.toggle('done', k < i); });
      if (w.dataset.review) review(w);
      var h = $('h2, h3, legend', steps[i]); if (h && n) { h.setAttribute('tabindex', '-1'); h.focus(); }
    }
    $$('[data-next]', w).forEach(function (b) { b.addEventListener('click', function () { if (validate(steps[i])) go(i + 1); }); });
    $$('[data-prev]', w).forEach(function (b) { b.addEventListener('click', function () { go(i - 1); }); });
    go(0);
  });

  function review(w) {
    var out = $('[data-review-out]', w); if (!out) return;
    var f = $('form', w), rows = [];
    $$('[data-rv]', f).forEach(function (el) {
      var v;
      if (el.type === 'radio') { if (!el.checked) return; v = el.closest('label').querySelector('b').innerHTML; }
      else if (el.tagName === 'SELECT') v = el.value && el.options[el.selectedIndex] ? esc(el.options[el.selectedIndex].text) : '';
      else v = esc(el.value.trim());
      if (!v) return;
      rows.push('<div><dt>' + el.dataset.rv + '</dt><dd>' + v + '</dd></div>');
    });
    var days = $$('input[name="tage"]:checked', f).map(function (x) { return x.nextElementSibling.innerHTML; });
    if (days.length) rows.push('<div><dt>' + t('Wunschtage', 'Preferred days') + '</dt><dd>' + days.join(', ') + '</dd></div>');
    out.innerHTML = rows.join('');
  }

  $$('form[data-form]').forEach(function (f) {
    f.setAttribute('novalidate', '');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(f)) return;
      var wrap = f.closest('[data-sent-wrap]') || f.parentNode, nm = $('[name="vorname"], [name="name"]', f);
      f.classList.add('busy');
      setTimeout(function () {
        $$('[data-fill="name"]', wrap).forEach(function (s) { s.textContent = nm ? nm.value.trim().split(' ')[0] : ''; });
        $$('[data-fill="mail"]', wrap).forEach(function (s) { var m = $('[type="email"]', f); s.textContent = m ? m.value.trim() : ''; });
        $$('[data-fill="order"]', wrap).forEach(function (s) { s.textContent = 'HS ' + String(Date.now()).slice(-6); });
        wrap.classList.add('sent'); f.classList.remove('busy');
        if (f.dataset.form === 'order') { store('hs-cart', '{}'); paint(); var cs = $('#coSum'); if (cs) cs.hidden = true; }
        var ok = $('.ok h3, .ok h2', wrap); if (ok) { ok.setAttribute('tabindex', '-1'); ok.focus(); }
      }, 700);
    });
  });

  /* ---------- checkout page */
  function paintCheckout() {
    var box = $('#coSum'); if (!box) return;
    var c = cart(), n = count(c), wrap = $('#coWrap'), emptyEl = $('#coEmpty');
    if (wrap && wrap.classList.contains('sent')) return;
    if (emptyEl) emptyEl.hidden = !!n;
    if (wrap) wrap.hidden = !n;
    $('#coItems').innerHTML = itemsHtml(c, true);
    $('#coTotal').textContent = eur(total(c));
  }

  /* ---------- init */
  setLang(root.lang === 'en' ? 'en' : 'de', false);
  paint();
  collect(); reveal(); tickDial(true);
  window.addEventListener('load', function () { collect(); reveal(); tickDial(true); });
})();
