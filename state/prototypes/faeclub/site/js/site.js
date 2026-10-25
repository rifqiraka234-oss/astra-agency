/* Fae Club. One ticket order, written by every control and read by every display. The book turns with the scroll,
   the QR ticket forms the moment it's paid. Reduced motion and no script keep the whole page. */
(function () {
  var html = document.documentElement, rm = html.classList.contains('rm');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var ease = function (x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var gbp = function (p) { return '£' + (p / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var addMonths = function (d, n) { var y = d.getFullYear(), m = d.getMonth() + n, last = new Date(y, m + 1, 0).getDate(); return new Date(y, m, Math.min(d.getDate(), last)); };
  var today = new Date(); today.setHours(0, 0, 0, 0);

  /* Pay in 3 to the penny, the first payment carries the odd pence. Pay in n for the retreat the same way. */
  var split = function (total, n) { var base = Math.floor(total / n), out = [total - base * (n - 1)]; for (var i = 1; i < n; i++) out.push(base); return out; };

  /* pictures that wait, woken when they're about to be seen */
  var wake = function (el) {
    if (!el || el._w) return; el._w = 1;
    $$('[data-srcset]', el).forEach(function (n) { n.srcset = n.getAttribute('data-srcset'); n.removeAttribute('data-srcset'); });
    $$('img[data-src]', el).forEach(function (n) { n.src = n.getAttribute('data-src'); n.removeAttribute('data-src'); });
  };

  /* ------------------------------------------------ the menu on phones */
  var mb = $('.mbtn'), nl = $('#mnav');
  if (mb && nl) {
    var setM = function (o) { nl.classList.toggle('open', o); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    mb.addEventListener('click', function () { setM(mb.getAttribute('aria-expanded') !== 'true'); });
    $$('a', nl).forEach(function (a) { a.addEventListener('click', function () { setM(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mb.getAttribute('aria-expanded') === 'true') { setM(false); mb.focus(); } });
  }

  /* ------------------------------------------------ the order */
  var co = $('[data-co]');
  var D = co ? JSON.parse($('script[data-d]', co).textContent) : null;
  var S = { event: 'ftb', tier: 'enchanted', qty: 1, plan: 'three', ch: 'knight', name: '' };
  var MAXQ = 8;
  var setO = function (k, v) { $$('[data-o="' + k + '"]').forEach(function (el) { el.textContent = v; }); };

  /* events whose date has passed leave the site */
  if (D) Object.keys(D.events).forEach(function (k) {
    var d = new Date(D.events[k].date + 'T23:59:59');
    if (d < today) {
      delete D.events[k];
      var opt = $('select[data-f="event"] option[value="' + k + '"]'); if (opt) opt.remove();
      var card = $('[data-ev="' + k + '"]'); if (card) card.hidden = true;
    }
  });

  var tierOf = function () { var ev = D.events[S.event]; return ev.tiers.filter(function (t) { return t.id === S.tier; })[0] || ev.tiers[0]; };
  var sums = function () {
    var t = tierOf(), one = t.price + t.vat + t.fee, total = one * S.qty;
    var pays = S.plan === 'three' ? split(total, 3) : [total];
    return { t: t, one: one, total: total, pays: pays, sub: t.price * S.qty, fee: t.fee * S.qty, vat: t.vat * S.qty };
  };
  var charWord = function () { var c = D.characters.filter(function (x) { return x.id === S.ch; })[0]; return c ? c.word : ''; };

  var tiersBox = $('[data-tiers]');
  var drawTierRadios = function () {
    if (!tiersBox) return;
    var ev = D.events[S.event];
    if (!ev.tiers.some(function (t) { return t.id === S.tier && !t.soldOut; })) S.tier = ev.tiers.filter(function (t) { return !t.soldOut; })[0].id;
    tiersBox.innerHTML = '';
    ev.tiers.forEach(function (t) {
      var l = document.createElement('label'); if (t.soldOut) l.className = 'out';
      var i = document.createElement('input'); i.type = 'radio'; i.name = 'tier'; i.value = t.id; i.checked = t.id === S.tier; i.disabled = t.soldOut;
      i.addEventListener('change', function () { S.tier = t.id; render(); });
      var s = document.createElement('span'); s.textContent = t.name;
      var e = document.createElement('em'); e.textContent = t.soldOut ? 'Sold out' : gbp(t.price + t.vat + t.fee);
      l.appendChild(i); l.appendChild(s); l.appendChild(e); tiersBox.appendChild(l);
    });
  };

  var render = function () {
    if (!D) return;
    var x = sums(), ev = D.events[S.event];
    setO('qty', S.qty);
    setO('qtyline', S.qty === 1 ? 'Just you. You won’t be the only one.' : S.qty === 2 ? 'You and a friend.' : 'You and ' + (S.qty - 1) + ' friends.');
    $$('.g-o').forEach(function (o, i) { o.classList.toggle('on', i < S.qty); });
    $$('.cov-o,.cj-o').forEach(function (o) { o.classList.toggle('on', o.getAttribute('data-ch') === S.ch); });
    if (window.FAE) FAE.setChar(S.ch); else html.setAttribute('data-ch', S.ch);
    $$('.ch').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ch') === S.ch ? 'true' : 'false'); });
    $$('[data-plan]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-plan') === S.plan ? 'true' : 'false'); });
    $$('[data-pick]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-pick') === S.tier && S.event === 'ftb' ? 'true' : 'false'); });
    var sel = $('select[data-f="event"]'); if (sel) sel.value = S.event;
    $$('input[name="tier"]').forEach(function (i) { i.checked = i.value === S.tier; });
    /* the payment bars */
    var pb = $('[data-pb]');
    if (pb) {
      var lis = $$('li', pb);
      lis.forEach(function (li, i) { /* each arch fills with that payment's share of the whole ticket */
        var on = i < x.pays.length;
        li.classList.toggle('off', !on);
        li.style.setProperty('--h', on ? (x.pays[i] / x.total).toFixed(4) : 0);
        if (on) { setO('p' + i, gbp(x.pays[i])); setO('d' + i, i === 0 ? 'Today' : (function (d) { return d.getDate() + ' ' + MON[d.getMonth()]; })(addMonths(today, i))); }
      });
      pb.style.setProperty('--n', 3);
    }
    setO('planline', S.plan === 'three' ? 'Three payments, ' + gbp(x.pays[0]) + ' today' : 'One payment today');
    setO('total', gbp(x.total));
    /* the summary */
    setO('line', S.qty + ' × ' + x.t.name);
    setO('sub', gbp(x.sub)); setO('fee', gbp(x.fee)); setO('vat', gbp(x.vat)); setO('now', gbp(x.pays[0]));
    var vrow = $('.sum .vat'); if (vrow) vrow.hidden = x.vat === 0;
    setO('paybtn', 'Pay ' + gbp(x.pays[0]) + ' now');
    /* the ticket as it's being made */
    setO('tkev', ev.name); setO('tkqty', S.qty); setO('tktier', x.t.name);
    var dt = $('[data-o="tkdt"]'); if (dt) { dt.innerHTML = ''; dt.appendChild(document.createTextNode(ev.dateText + ', ' + ev.time)); dt.appendChild(document.createElement('br')); dt.appendChild(document.createTextNode(ev.venue)); }
    setO('tkname', S.name || 'Your name');
    setO('tkas', 'arriving as ' + charWord());
    setO('tkref', ev.code);
    /* the price leads, so a narrow bar never cuts it off */
    setO('sbar', (S.plan === 'three' ? gbp(x.pays[0]) + ' today, pay in 3' : gbp(x.total) + ' in full') + ' · ' + S.qty + ' ' + x.t.name.replace(' Tier', '').replace(' Entry', '') + (S.qty === 1 ? ' ticket' : ' tickets'));
  };

  $$('.ch').forEach(function (b) {
    var ovals = function () { return $$('[data-ch="' + b.getAttribute('data-ch') + '"]').filter(function (o) { return o !== b; }); };
    ['pointerenter', 'focus'].forEach(function (ev) { b.addEventListener(ev, function () { ovals().forEach(wake); }); });
    b.addEventListener('click', function () { ovals().forEach(wake); var was = S.ch; S.ch = b.getAttribute('data-ch'); render(); if (window.FAE && was !== S.ch) FAE.cast(b); });
  });
  /* once the page has settled, the other portraits load quietly */
  var idle = function (f) { if ('requestIdleCallback' in window) requestIdleCallback(f, { timeout: 4000 }); else setTimeout(f, 2500); };
  window.addEventListener('load', function () { idle(function () { $$('.cov-o,.cj-o').forEach(wake); }); });
  $$('[data-q]').forEach(function (b) { b.addEventListener('click', function () { S.qty = clamp(S.qty + +b.getAttribute('data-q'), 1, MAXQ); render(); }); });
  $$('[data-plan]').forEach(function (b) { b.addEventListener('click', function () { S.plan = b.getAttribute('data-plan'); render(); }); });
  $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function () {
    S.event = 'ftb'; S.tier = b.getAttribute('data-pick'); drawTierRadios(); render();
    var next = $('#spread'); if (next) next.scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'start' });
  }); });
  var pbFig = $('[data-plan-fig]'); if (pbFig) pbFig.addEventListener('click', function () { S.plan = S.plan === 'three' ? 'full' : 'three'; render(); });
  var evSel = $('select[data-f="event"]');
  if (evSel) evSel.addEventListener('change', function () { S.event = evSel.value; drawTierRadios(); render(); });
  $$('[data-set-event]').forEach(function (a) { a.addEventListener('click', function () { S.event = a.getAttribute('data-set-event'); drawTierRadios(); render(); }); });
  if (co) $('input[name="name"]', co).addEventListener('input', function (e) { S.name = e.target.value.trim(); render(); });
  if (D) { drawTierRadios(); render(); }

  /* ------------------------------------------------ paying, and the QR forming from gold dust */
  var tk = $('[data-tk]'), cvs = tk && $('canvas', tk), done = $('[data-done]');
  var drawQR = function (text) {
    var q = qrcode(0, 'M'); q.addData(text); q.make();
    var n = q.getModuleCount(), ctx = cvs.getContext('2d'), W = cvs.width, pad = 10, cell = (W - pad * 2) / n;
    var mods = []; for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) mods.push([pad + c * cell, pad + r * cell]);
    var start = mods.map(function () { return [Math.random() * W, Math.random() * W]; });
    var t0 = performance.now(), dur = rm ? 0 : 1300;
    var frame = function (now) {
      var p = dur ? clamp((now - t0) / dur, 0, 1) : 1, e = ease(p);
      ctx.fillStyle = '#FFFDF6'; ctx.fillRect(0, 0, W, W);
      for (var i = 0; i < mods.length; i++) {
        var x = start[i][0] + (mods[i][0] - start[i][0]) * e, y = start[i][1] + (mods[i][1] - start[i][1]) * e;
        ctx.fillStyle = p < 1 ? 'rgba(168,140,62,' + (0.35 + 0.65 * e) + ')' : '#1B170E';
        var s = p < 1 ? cell * (0.4 + 0.6 * e) : cell + 0.4;
        ctx.fillRect(x, y, s, s);
      }
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    cvs.setAttribute('data-modules', mods.length); cvs.setAttribute('data-text', text);
  };
  if (co) co.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('[data-err]', co), name = co.name.value.trim(), email = co.email.value.trim();
    var bad = !name ? 'Please add the name for the guest list.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please check the email address, your ticket goes there.' : '';
    err.hidden = !bad; err.textContent = bad;
    if (bad) { (!name ? co.name : co.email).focus(); return; }
    var x = sums(), ev = D.events[S.event], ref = ev.code + '-' + x.t.id.slice(0, 3).toUpperCase() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    tk.classList.remove('paid'); void tk.offsetWidth; tk.classList.add('paid');
    drawQR('FAECLUB|' + ref + '|' + name + '|' + S.qty);
    if (window.FAE) FAE.paid(tk);
    var now = new Date(), hh = String(now.getHours()).padStart(2, '0') + '.' + String(now.getMinutes()).padStart(2, '0');
    setO('tkpaid', S.plan === 'three' ? gbp(x.pays[0]) + ' of ' + gbp(x.total) : gbp(x.total));
    setO('tkref', ref);
    done.hidden = false;
    done.textContent = 'Paid at ' + hh + '. Your QR ticket is on its way to ' + email + (S.plan === 'three' ? ', and your next payments are ' + gbp(x.pays[1]) + ' on ' + addMonths(today, 1).getDate() + ' ' + MON[addMonths(today, 1).getMonth()] + ' and ' + gbp(x.pays[2]) + ' on ' + addMonths(today, 2).getDate() + ' ' + MON[addMonths(today, 2).getMonth()] + '.' : '.') + ' In this prototype nothing is charged or sent.';
  });

  /* ------------------------------------------------ the book turns with the scroll */
  var tale = $('[data-tale]');
  var leaves = tale ? $$('.leaf', tale) : [], book = tale && $('.book', tale), hall = tale && $('.tale-hall', tale), baseR = tale && $('.book-base.r', tale);
  var TURNS = leaves.length - 1; /* the last leaf stays on the right */
  var live = tale && !rm && window.CSS && CSS.supports('transform-style', 'preserve-3d');
  if (live) tale.classList.add('live');
  var copyEl = tale && $('.tale-copy', tale), stickEl = tale && $('.tale-stick', tale);
  var measureCopy = function () {
    if (!live || !copyEl) return;
    var cb = window.innerWidth <= 760 ? Math.round(copyEl.offsetTop + copyEl.offsetHeight + 16) : 0;
    tale.style.setProperty('--cb', cb + 'px');
  };
  /* the portrait in her stardust flies onto the cover as the book rises */
  var conjEl = tale && $('.conj', tale), covOval = tale && $('.cov-oval', tale), conjHome = null;
  var homeConj = function () { if (!conjEl) return; conjEl.style.setProperty('--cx', '0px'); conjEl.style.setProperty('--cy', '0px'); conjEl.style.setProperty('--cs', 1); conjHome = conjEl.getBoundingClientRect(); };
  var flyConj = function (e) {
    if (!conjEl || !covOval) return;
    if (e <= 0.001 || !conjHome) { homeConj(); conjEl.style.setProperty('--cjo', 1); return; }
    var to = covOval.getBoundingClientRect(), k = clamp((e - .15) / .75, 0, 1), kk = ease(k);
    var sx = to.width / conjHome.width;
    conjEl.style.setProperty('--cx', ((to.left - conjHome.left) * kk).toFixed(1) + 'px');
    conjEl.style.setProperty('--cy', ((to.top - conjHome.top) * kk).toFixed(1) + 'px');
    conjEl.style.setProperty('--cs', (1 + (sx - 1) * kk).toFixed(4));
    conjEl.style.setProperty('--cjo', (1 - clamp((e - .82) / .16, 0, 1)).toFixed(3));
  };
  var coNow = 1, hoNow = 0;
  var taleUpdate = function () {
    if (!live) return;
    var r = tale.getBoundingClientRect(), span = tale.offsetHeight - window.innerHeight;
    var p = clamp(-r.top / Math.max(1, span), 0, 1);
    var steps = TURNS + 2.4, t0 = p * steps, t = t0 - 1; /* the moon gives way to the book, TURNS page turns, then the dive */
    var phone = window.innerWidth <= 760;
    var intro = ease(clamp(t0, 0, 1));
    var mo = 1 - clamp(intro * 1.8, 0, 1); window.__faeMo = mo;
    tale.style.setProperty('--mo', mo.toFixed(3)); /* the moon sinks first */
    tale.style.setProperty('--mv', intro > .6 ? 'hidden' : 'visible');
    tale.style.setProperty('--bi', clamp((intro - .35) / .65, 0, 1).toFixed(3)); /* then the book rises under the portrait */
    flyConj(intro);
    tale.setAttribute('data-sky', t0 < .6 ? 'dusk' : t < TURNS - .2 ? 'night' : 'hall');
    leaves.forEach(function (lf, i) {
      if (i === 0 || t > i - 0.9) wake(lf);
      var k = i < TURNS ? ease(clamp(t - i, 0, 1)) : 0;
      lf.style.setProperty('--r', k.toFixed(4));
      lf.style.setProperty('--z', k > .5 ? 100 + i : 60 - i);
      lf.classList.toggle('gone', phone && k > .5);
    });
    var c0 = clamp(t, 0, 1);
    if (t < 0) c0 = 0;
    coNow = 1 - clamp(c0 * 2.2, 0, 1);
    tale.style.setProperty('--co', coNow.toFixed(3));
    var chsEl = tale.querySelector('.chs'); if (chsEl) { var gone = c0 > .48; if (chsEl.inert !== gone) chsEl.inert = gone; }
    tale.querySelector('.tale-copy').style.pointerEvents = c0 > .48 ? 'none' : '';
    tale.style.setProperty('--bl', clamp((ease(c0) - .5) * 4, 0, 1).toFixed(3));
    if (phone) { /* the copy has gone, so the book rises into the middle */
      var cb = parseFloat(tale.style.getPropertyValue('--cb')) || 0, mid = Math.max(12, (stickEl.clientHeight - book.offsetHeight) / 2);
      tale.style.setProperty('--bt', (cb + (Math.min(mid, cb) - cb) * ease(clamp((c0 - .2) / .6, 0, 1))).toFixed(1) + 'px');
    }
    /* the dive, the right page grows into the hall */
    if (t > TURNS - 1.5) wake(hall);
    var d = clamp((t - TURNS) / 1.2, 0, 1), de = ease(d);
    if (d > 0) {
      var s = tale.querySelector('.tale-stick').getBoundingClientRect(), b = baseR.getBoundingClientRect();
      var top = (b.top - s.top) * (1 - de), left = (b.left - s.left) * (1 - de), right = (s.right - b.right) * (1 - de), bot = (s.bottom - b.bottom) * (1 - de);
      tale.style.setProperty('--clip', 'inset(' + top.toFixed(1) + 'px ' + right.toFixed(1) + 'px ' + bot.toFixed(1) + 'px ' + left.toFixed(1) + 'px)');
      tale.style.setProperty('--hv', 'visible');
    } else { tale.style.setProperty('--hv', 'hidden'); }
    hoNow = clamp((d - .55) / .35, 0, 1);
    tale.style.setProperty('--ho', hoNow.toFixed(3));
    tale.style.setProperty('--hcv', hoNow > .3 ? 'visible' : 'hidden'); /* the hall's call can't be reached before it's seen */
    tale.style.setProperty('--bo', (1 - clamp((d - .7) / .3, 0, 1)).toFixed(3));
  };

  /* ------------------------------------------------ the sticky bar */
  var sbar = $('[data-sbar]'), coSec = $('#checkout'), heroBuy = tale && $('.buy', tale), hallCta = $(live ? '[data-hall-cta]' : '.hall-flat-cta a');
  var barUpdate = function () {
    if (!sbar || !tale) return;
    var vh = window.innerHeight;
    var past = live ? coNow < .35 : heroBuy ? heroBuy.getBoundingClientRect().bottom < 0 : tale.getBoundingClientRect().bottom < vh * .5;
    var hallOn = false;
    if (hallCta && (!live || hoNow > .3)) { var hr = hallCta.getBoundingClientRect(); hallOn = hr.top < vh && hr.bottom > 0; }
    var at = coSec ? coSec.getBoundingClientRect().top < vh * .9 && coSec.getBoundingClientRect().bottom > 0 : false;
    var on = past && !at && !hallOn;
    sbar.classList.toggle('on', on);
    sbar.setAttribute('aria-hidden', on ? 'false' : 'true');
    $('a', sbar).tabIndex = on ? 0 : -1;
  };

  var ticking = false;
  var update = function () { ticking = false; taleUpdate(); barUpdate(); };
  var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', function () { measureCopy(); conjHome = null; req(); });
  measureCopy(); update();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measureCopy(); req(); });

  /* ------------------------------------------------ the retreat plan */
  var rp = $('[data-rp]');
  if (rp) {
    var RD = JSON.parse($('script[data-d]', rp).textContent);
    var rng = $('[data-r="months"]', rp), fr = $('[data-r="friend"]', rp), rb = $('[data-rb]'), friendF = $('.friend', rp), rdone = $('[data-done]');
    var archTpl = $('[data-rb] .arch-o'); archTpl = archTpl ? archTpl.cloneNode(true) : null;
    var rdraw = function () {
      var n = +rng.value, total = RD.price - (fr.checked ? RD.friendOff : 0), pays = split(total, n);
      setO('m', n); rng.setAttribute('aria-valuetext', n + (n === 1 ? ' payment' : ' payments') + ' of about ' + gbp(pays[n - 1]));
      rb.innerHTML = ''; rb.style.setProperty('--n', n);
      pays.forEach(function (v, i) {
        var li = document.createElement('li'); li.style.setProperty('--h', (v / total).toFixed(4));
        var bar = document.createElement('span'); bar.className = 'bar'; bar.appendChild(document.createElement('i'));
        if (archTpl) bar.appendChild(archTpl.cloneNode(true));
        var b = document.createElement('b'); b.textContent = gbp(v);
        var sm = document.createElement('small'); var d = addMonths(today, i); sm.textContent = i === 0 ? 'Today' : MON[d.getMonth()] + ' ' + d.getFullYear();
        li.appendChild(bar); li.appendChild(b); li.appendChild(sm); rb.appendChild(li);
      });
      setO('rline', n === 1 ? 'One payment' : n + ' monthly payments');
      setO('rtotal', gbp(total));
      setO('rpbtn', 'Reserve, first payment ' + gbp(pays[0]));
      friendF.hidden = !fr.checked;
    };
    rng.addEventListener('input', rdraw); fr.addEventListener('change', rdraw); rdraw();
    rp.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = $('[data-err]', rp), name = rp.name.value.trim(), email = rp.email.value.trim();
      var bad = !name ? 'Please add your name.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please check your email address.' : '';
      err.hidden = !bad; err.textContent = bad;
      if (bad) { (!name ? rp.name : rp.email).focus(); return; }
      rdone.hidden = false;
      rdone.textContent = 'Your place is requested, ' + name + '. Elle confirms your plan of ' + rng.value + (+rng.value === 1 ? ' payment' : ' payments') + ' by email. In this prototype nothing is sent.';
    });
  }
})();
