/* the deadline ruler. One logarithmic scale of time, from one hour to twelve months, drawn from data inlined by the build (verified against the Official Journal). */
(function () {
  'use strict';
  var d = document, w = window;
  var root = d.querySelector('[data-ruler]'), dataEl = d.getElementById('clocks-data');
  if (!root || !dataEl) return;
  var DATA = JSON.parse(dataEl.textContent), C = DATA.clocks.slice().sort(function (a, b) { return a.hours - b.hours; });
  var stage = root.querySelector('[data-stage]'), card = root.querySelector('[data-card]');
  var HMAX = 8760, filter = 'claims', sel = 'notice-96h', btns = [];
  var AY = 215, TICKS = [[1, '1 h'], [3, '3 h'], [24, '1 d'], [96, '4 d'], [168, '7 d'], [720, '30 d'], [2184, '3 mo'], [6552, ''], [8760, '']];
  var ZW = .08, END = .975;
  function xf(h) { return h < 1 ? ZW * .45 : ZW + (END - ZW) * Math.log(h) / Math.log(HMAX); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function who(c) { return c.who === 'airline' ? 'Airline duty' : 'Passenger right'; }
  function el(tag, cls, css) { var e = d.createElement(tag); if (cls) e.className = cls; if (css) e.style.cssText = css; return e; }
  function build() {
    stage.innerHTML = ''; btns = [];
    var W = stage.clientWidth;
    stage.appendChild(el('div', 'rs-axis'));
    var z = el('span', 'rs-zero'); z.textContent = 'at once'; stage.appendChild(z);
    TICKS.forEach(function (t, i) {
      var x = xf(t[0]) * W; stage.appendChild(el('i', 'rs-tick', 'left:' + x + 'px'));
      var l = el('span', 'rs-tl' + (i === TICKS.length - 1 ? ' end' : ''), 'left:' + x + 'px'); l.textContent = t[1];
      if (t[1]) stage.appendChild(l);
    });
    ['a', 'p'].forEach(function (lane) {
      var shown = C.filter(function (c) { return (lane === 'a') === (c.who === 'airline') && (filter === 'all' || c.claims); });
      var groups = [];
      shown.forEach(function (c) { var x = xf(c.hours) * W, g = groups.filter(function (q) { return Math.abs(q.x - x) < 16; })[0]; if (g) g.items.push(c); else groups.push({ x: x, items: [c] }); });
      var last = [-999, -999, -999, -999, -999];
      groups.sort(function (a, b) { return a.x - b.x; }).forEach(function (g) {
        var lv = 0; while (lv < 4 && g.x - last[lv] < 74) lv++; if (lv > 4) lv = 4; last[lv] = g.x;
        var len = 58 + lv * 46, rk = el('div', 'rk ' + lane, 'left:' + g.x + 'px');
        var stem = el('i', 'rk-s', lane === 'a' ? 'top:' + (AY - 12 - len) + 'px;height:' + len + 'px' : 'top:' + (AY + 12) + 'px;height:' + (len - 14) + 'px'); rk.appendChild(stem);
        var b = el('button', 'rk-b', lane === 'a' ? 'top:' + (AY - 12 - len - 32) + 'px;height:44px;justify-content:flex-end' : 'top:' + (AY + 12 + len - 24) + 'px;height:44px;justify-content:flex-start');
        b.type = 'button'; b.setAttribute('data-ids', g.items.map(function (c) { return c.id; }).join(' '));
        var tiny = g.items[0].tiny + (g.items.length > 1 ? ' ×' + g.items.length : '');
        b.innerHTML = '<span class="d"></span><span class="t">' + esc(tiny) + '</span>';
        b.setAttribute('aria-label', tiny + ', ' + g.items.map(function (c) { return c.label + ', ' + c.short; }).join(' and ') + ', ' + who(g.items[0]));
        b.addEventListener('click', function () {
          var ids = g.items.map(function (c) { return c.id; }), i = ids.indexOf(sel);
          sel = i > -1 ? ids[(i + 1) % ids.length] : ids[0]; show();
        });
        rk.appendChild(b); stage.appendChild(rk); btns.push(b);
      });
    });
    mark();
  }
  function mark() { btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ids').split(' ').indexOf(sel) > -1 ? 'true' : 'false'); }); }
  function show() {
    var c = C.filter(function (x) { return x.id === sel; })[0]; if (!c) return; mark();
    var same = C.filter(function (x) { return x.hours === c.hours || (Math.abs(x.hours - c.hours) / c.hours < .1 && x.who === c.who); });
    card.innerHTML = '<div class="rc-t"><span class="rc-d mono">' + esc(c.label) + '</span><span class="rc-s">' + esc(c.short) + '</span><span class="art">' + esc(c.art) + ' of Regulation (EC) No 261/2004, as amended</span></div>' +
      '<div class="rc-b"><p>' + esc(c.duty) + '</p><q class="law">' + esc(c.quote) + '</q><p class="rc-m"><span><b>Starts when</b> ' + esc(c.starts) + '</span><span><b>Who</b> ' + esc(who(c)) + '</span><a class="art" href="' + (d.body.getAttribute('data-oj') || '#') + '" rel="noopener" target="_blank">Read it in the Official Journal</a></p></div>';
  }
  root.querySelectorAll('[data-f]').forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.getAttribute('data-f'); root.querySelectorAll('[data-f]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      if (filter === 'claims' && !C.filter(function (c) { return c.id === sel && c.claims; })[0]) sel = 'notice-96h';
      build(); show();
    });
  });
  var t; w.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { if (stage.clientWidth) build(); }, 120); });
  var m = /^#c-([a-z0-9\-]+)/.exec(location.hash);
  if (m && C.filter(function (c) { return c.id === m[1]; })[0]) { filter = 'all'; sel = m[1]; root.querySelectorAll('[data-f]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-f') === 'all' ? 'true' : 'false'); }); }
  build(); show();
})();
