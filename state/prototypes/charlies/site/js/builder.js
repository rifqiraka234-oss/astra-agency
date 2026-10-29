/* The builder's stage. The dessert stands big in their lilac menu world under the menu's own drips. Tap a sauce and
   it floods the drips and drizzles over the dessert (or coats a glass and runs down it). Toppings rain down and land.
   The ticket prints a line each time something lands and the bar's price ticks with it.
   Reads and writes only through window.CharlieOrder. Exposes window.CharlieBuilder. */
(function () {
  'use strict';
  var O = window.CharlieOrder;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desk = window.matchMedia('(min-width: 1024px)');

  // how each base stands on the stage and how sauce goes on it
  var STAGING = {
    waffle:       { ar: 1100 / 1320, box: [0.86, 0.52], mode: 'drizzle', band: [0.12, 0.88], ribbon: 0.042, depth: 1, open: 0.03, tile: 1.5 },
    crepe:        { ar: 560 / 360, box: [0.94, 0.72], mode: 'drizzle', band: [0.2, 0.75], ribbon: 0.034, depth: 0.45, open: 0.03, tile: 1.2 },
    shake:        { ar: 376 / 974, box: [0.6, 0.4], mode: 'coat', depth: 0, open: 0.09, stretch: 1.6, cap: 0.06, tile: 2.4 },
    cookie_dough: { ar: 1420 / 950, box: [0.98, 0.74], mode: 'drizzle', band: [0.16, 0.8], ribbon: 0.03, depth: 0.5, open: 0.02, tile: 0.9 },
    sundae:       { ar: 400 / 640, box: [0.62, 0.42], mode: 'coat', depth: 0, open: 0.05, stretch: 1.3, cap: 0.05, tile: 2.0 },
    froyo:        { ar: 400 / 600, box: [0.66, 0.46], mode: 'coat', depth: 0, open: 0.05, stretch: 1.25, cap: 0.05, tile: 2.0 }
  };

  var el = {}, pour = null, tops = null, imgs = {}, drip = null, lobes = null, current = null, geo = null;
  var landed = {}, audio = null, userTapped = false;

  // where the dessert goes for this stage size and base: under the drips, standing on the counter
  function layout(base) {
    var W = el.stage.clientWidth, H = el.stage.clientHeight, D = desk.matches ? 1 : 0;
    var curtain = pour ? pour.curtain().len : Math.min(W * 0.44 * 0.5363, Math.max(70, H * 0.2));
    var counter = H * (D ? 0.11 : 0.09), floor = H - counter + (D ? 10 : 6);
    var s = STAGING[base], top = curtain * 0.72 + (D ? 30 : 14), maxH = floor - top;
    var w = W * s.box[D], h = w / s.ar;
    if (h > maxH) { h = maxH; w = h * s.ar; }
    var cx = W * (D ? 0.41 : 0.5);
    var rect = { x: cx - w / 2, y: floor - h, w: w, h: h };
    return { W: W, H: H, D: D, rect: rect, floor: floor, src: { x: rect.x + rect.w * 0.42, y: 0 } };
  }

  function placeImg(rect) { var im = el.img; im.style.left = rect.x + 'px'; im.style.top = rect.y + 'px'; im.style.width = rect.w + 'px'; im.style.height = rect.h + 'px'; }
  function rectNow() { return geo.rect; }
  function topScale() { return Math.max(1, Math.min(1.6, geo.rect.w / 420)); }

  function load(src) {
    return new Promise(function (res) { var i = new Image(); i.decoding = 'async'; i.onload = function () { res(i); }; i.onerror = function () { res(null); }; i.src = src; });
  }

  // a tiny receipt printer tick, made on the fly (no file), only ever after a tap
  function tick() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var t = audio.currentTime, n = Math.floor(audio.sampleRate * 0.035), b = audio.createBuffer(1, n, audio.sampleRate), d = b.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3) * (i % 90 < 45 ? 1 : 0.35);
      var src = audio.createBufferSource(), f = audio.createBiquadFilter(), g = audio.createGain();
      src.buffer = b; f.type = 'bandpass'; f.frequency.value = 3200; f.Q.value = 0.9; g.gain.value = 0.07;
      src.connect(f); f.connect(g); g.connect(audio.destination); src.start(t);
    } catch (e) { /* sound is a nicety */ }
  }

  // the ticket shows what has landed; the total ticks when something new lands
  function renderTicket(o, fresh) {
    var lines = O.creationLines(o).filter(function (l) { return landed[l.key]; }), html = '';
    lines.forEach(function (l) {
      var price = l.included ? 'incl' : l.comes ? 'with it' : O.money(l.pence);
      html += '<li' + (fresh === l.key ? ' class="is-new"' : '') + '><span>' + l.label + '</span><span>' + price + '</span></li>';
    });
    if (o.qty > 1) html += '<li><span>Times ' + o.qty + '</span><span></span></li>';
    o.items.forEach(function (it) { html += '<li><span>' + it.name + (it.qty > 1 ? ' x' + it.qty : '') + '</span><span>' + O.money(it.pence * it.qty) + '</span></li>'; });
    el.ticketLines.innerHTML = html;
    var shown = (o.creation ? lines.reduce(function (a, l) { return a + l.pence; }, 0) * o.qty : 0) + O.itemsPence(o);
    el.ticketTotal.innerHTML = '<span>Total</span><b>' + O.money(shown) + '</b>';
    el.ticket.dataset.total = shown;
    if (fresh) { el.ticket.classList.remove('is-tick'); void el.ticket.offsetWidth; el.ticket.classList.add('is-tick'); }
    if (el.onTicket) el.onTicket(shown, !!fresh);
  }
  function land(key) {
    if (landed[key]) return; landed[key] = true; renderTicket(O.get(), key);
    if (userTapped) tick();
  }

  // the giant word behind the dessert: the base, tinted by the last sauce
  function word(o) {
    var b = O.BASES[o.base].name, pr = O.presetOf(o);
    // the giant word behind the dessert: each letter drops in like a topping landing when it changes
    var text = pr ? pr.name.replace(/'/g, '’') : b, span = el.word.firstChild;
    if (span.dataset.text !== text) { span.dataset.text = text; span.innerHTML = text.split('').map(function (ch, i) { return ch === ' ' ? ' ' : '<i style="--i:' + i + '">' + ch.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</i>'; }).join(''); }
    var last = o.sauces[o.sauces.length - 1], hex = last && window.CharliePour && window.CharliePour.SAUCES[last] ? window.CharliePour.SAUCES[last].hex : null;
    document.documentElement.style.setProperty('--cd-sauce', hex || '#5F3F90');
    el.stage.style.setProperty('--cd-word', hex ? mixHex(hex, '#FBF3FD', 0.8) : '#ece2f4');
  }
  function mixHex(a, b, t) {
    var A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), out = '#';
    [16, 8, 0].forEach(function (s) { var v = Math.round(((A >> s) & 255) * (1 - t) + ((B >> s) & 255) * t); out += ('0' + v.toString(16)).slice(-2); });
    return out;
  }

  // puts a base on the stage with everything the order already has on it
  function put(base, animate) {
    var st = STAGING[base], o = O.get();
    current = base; geo = layout(base); placeImg(geo.rect);
    el.img.src = O.BASES[base].img; el.img.alt = O.BASES[base].alt;
    landed = {}; landed.base = true;
    if (pour && tops) {
      pour.clear(); tops.clear(); tops.setDepth(st.depth);
      pour.setDessert(imgs[base] || el.img, rectNow, { mode: st.mode, band: st.band, ribbon: st.ribbon, open: st.open, stretch: st.stretch, cap: st.cap, tile: st.tile });
      if (animate && !reduced) {
        // a favourite lands dressed: its sauces pour and its toppings rain, one after another
        o.sauces.forEach(function (s, i) { setTimeout(function () { if (O.get().sauces.indexOf(s) >= 0 && !pour.has(s)) pour.addSauce(s); }, 250 + i * 900); });
        o.toppings.forEach(function (t, i) { setTimeout(function () { if (O.get().toppings.indexOf(t) >= 0) tops.add(t, { scale: topScale() }); }, 300 + o.sauces.length * 900 + i * 350); });
      } else {
        o.sauces.forEach(function (s) { pour.addSauce(s, { instant: true }); });
        o.toppings.forEach(function (t) { tops.add(t, { instant: true, silent: true, scale: topScale() }); });
      }
    }
    if (!pour || !tops || !animate || reduced) {
      o.sauces.forEach(function (s) { landed['sauce:' + s] = true; });
      o.toppings.forEach(function (t) { landed['top:' + t] = true; });
    }
    o.extras.forEach(function (e) { landed['extra:' + e] = true; });
    word(o); renderTicket(o, 'base');
  }
  function setBase(base, opts) { userTapped = true; put(base, opts && opts.animate); if (userTapped && !(opts && opts.silent)) tick(); }
  // a favourite: the whole creation is replaced, and it plays in
  function applyOrder(animate) { userTapped = true; put(O.get().base, animate); }

  function addSauce(name) {
    userTapped = true; word(O.get());
    if (!pour || !tops) { land('sauce:' + name); return; }
    pour.addSauce(name);
  }
  function removeSauce(name) { if (pour) pour.removeSauce(name); delete landed['sauce:' + name]; word(O.get()); renderTicket(O.get()); }
  function addTopping(name) {
    userTapped = true;
    if (!pour || !tops) { land('top:' + name); return; }
    tops.add(name, { scale: topScale() });
  }
  function removeTopping(name) { if (tops) tops.remove(name); delete landed['top:' + name]; renderTicket(O.get()); }
  function setExtra(name, on) { if (on) { userTapped = true; land('extra:' + name); } else if (landed['extra:' + name]) { delete landed['extra:' + name]; renderTicket(O.get()); } }

  function resize() {
    if (!current) return;
    geo = layout(current); placeImg(geo.rect);
    if (pour && tops) { pour.resize(); tops.resize(); tops.clear(); O.get().toppings.forEach(function (t) { tops.add(t, { instant: true, silent: true, scale: topScale() }); }); }
  }

  // draws the creation as it stands, small, for the golden ticket
  function snapshot(canvas) {
    var c = canvas.getContext('2d'), W = canvas.width, H = canvas.height; c.clearRect(0, 0, W, H);
    if (!geo) return;
    var r = geo.rect, pad = 0.08, s = Math.min(W * (1 - pad * 2) / r.w, H * (1 - pad * 2) / r.h), ox = (W - r.w * s) / 2 - r.x * s, oy = (H - r.h * s) / 2 - r.y * s;
    c.save(); c.translate(ox, oy); c.scale(s, s);
    if (pour && tops) { pour.drawNow(); c.drawImage(el.gl, 0, 0, el.gl.width, el.gl.height, 0, 0, geo.W, geo.H); c.drawImage(el.tp, 0, 0, el.tp.width, el.tp.height, 0, 0, geo.W, geo.H); }
    else if (el.img.complete) c.drawImage(el.img, r.x, r.y, r.w, r.h);
    c.restore();
  }

  function init(opts) {
    el.stage = document.getElementById('stage'); el.img = document.getElementById('stage-img'); el.word = document.getElementById('stage-word');
    el.gl = document.getElementById('gl'); el.tp = document.getElementById('tp');
    el.ticket = document.getElementById('ticket'); el.ticketLines = document.getElementById('ticket-lines'); el.ticketTotal = document.getElementById('ticket-total');
    el.onTicket = opts && opts.onTicket;
    current = O.get().base; geo = layout(current); placeImg(geo.rect);
    el.img.src = O.BASES[current].img; el.img.alt = O.BASES[current].alt;
    landed.base = true; word(O.get()); renderTicket(O.get());
    window.addEventListener('resize', function () { clearTimeout(resize.t); resize.t = setTimeout(resize, 120); });
    desk.addEventListener('change', resize);
  }

  // the toppings in 3D when three.js is there (the hero loads it), else the same physics drawn in 2D
  function threeOr2D() {
    var H = window.CharlieHeroPage;
    if (!H || !H.loadThree) return Promise.resolve(window.CharlieToppings);
    return Promise.race([H.loadThree().then(function () { return window.CharlieToppings3D || window.CharlieToppings; }), new Promise(function (r) { setTimeout(function () { r(window.CharlieToppings); }, 6000); })])
      .catch(function () { return window.CharlieToppings; });
  }

  // the heavy part starts after the page has loaded, and rests while the stage is off screen
  function start() {
    var bases = O.BASE_ORDER;
    return Promise.all(bases.map(function (b) { return load(O.BASES[b].img).then(function (i) { imgs[b] = i; }); })
      .concat([load('media/drip-sdf.png').then(function (i) { drip = i; }), load('media/drip-lobes.png').then(function (i) { lobes = i; })]))
      .then(function () {
        var p = null;
        try { p = new window.CharliePour.Pour(el.gl, { reducedMotion: reduced, onLand: function (l) { land('sauce:' + l.name); } }); } catch (e) { p = null; }
        if (!p || !p.ok || !drip || !lobes || !imgs[current]) return false;
        pour = p; pour.source = function () { return geo.src; }; pour.setDrip(drip); pour.setLobes(lobes);
        pour.resize();
        geo = layout(current); placeImg(geo.rect);
        return threeOr2D();
      }).then(function (Tops) {
        if (!pour) return false;
        tops = new Tops.Toppings(el.tp, { rectFn: rectNow, surfaceAt: function (x) { return pour.surfaceAt(x); }, reducedMotion: reduced,
          source: function () { return { x: geo.rect.x + geo.rect.w / 2, y: -40 }; }, onLand: function (g) { land('top:' + g.name); } });
        tops.resize();
        var st = STAGING[current], o = O.get();
        pour.setDessert(imgs[current], rectNow, { mode: st.mode, band: st.band, ribbon: st.ribbon, open: st.open, stretch: st.stretch, cap: st.cap, tile: st.tile }); tops.setDepth(st.depth);
        o.sauces.forEach(function (s) { pour.addSauce(s, { instant: true }); });
        o.toppings.forEach(function (t) { tops.add(t, { instant: true, silent: true, scale: topScale() }); });
        document.documentElement.classList.add('has-gl');
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { pour.pause(!e.isIntersecting); }); });
        io.observe(document.getElementById('make'));
        window.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; pour.setLight(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1); }, { passive: true });
        return true;
      });
  }

  window.CharlieBuilder = { init: init, start: start, setBase: setBase, applyOrder: applyOrder, addSauce: addSauce, removeSauce: removeSauce, addTopping: addTopping, removeTopping: removeTopping,
    setExtra: setExtra, renderTicket: function () { renderTicket(O.get()); }, ticketTotal: function () { return +el.ticket.dataset.total; }, snapshot: snapshot,
    isSettled: function () { var o = O.get(); return O.creationLines(o).every(function (l) { return landed[l.key]; }); },
    hasGL: function () { return !!(pour && tops); }, geo: function () { return geo; }, STAGING: STAGING };
})();
