(function () {
  'use strict';
  // Draws a rough sketch of every idea Owen adds from the catalogue into his site, in his colours and fonts.
  var CAT = window.CATALOGUE || { items: [], sketch: {}, cats: [] };
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }
  function img(src, cls) { return '<img class="' + (cls || '') + '" src="' + esc(src) + '" alt="" loading="lazy">'; }
  function bars(n) { var h = ''; for (var i = 0; i < n; i++) h += '<i class="sk-line" style="--w:' + (90 - i * 17) + '%"></i>'; return h; }
  var T = {
    page: function (s) {
      return '<div class="sk-page"><div class="sk-page-pic">' + img(s.img) + '</div><div class="sk-page-t"><h3 class="sk-h">' + esc(s.h) + '</h3><ul class="sk-ticks">' +
        s.pts.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul><div class="sk-mini"><span>About</span><b>£££ a month</b><i></i></div><span class="btn btn-solid">' + esc(s.cta) + '</span></div></div>';
    },
    form: function (s) {
      return '<div class="sk-card sk-narrow"><h3 class="sk-h">' + esc(s.h) + '</h3>' + s.fields.map(function (f) { return '<label class="sk-field"><span>' + esc(f) + '</span><i></i></label>'; }).join('') +
        (s.out ? '<p class="sk-out">' + esc(s.out) + '</p>' : '') + '<span class="btn btn-solid">' + esc(s.btn) + '</span></div>';
    },
    doc: function (s) {
      return '<div class="sk-doc"><div class="sk-doc-top"><b>Breakout Box</b><span>by OneFortyNine Games</span></div><h3 class="sk-h">' + esc(s.h) + '</h3>' +
        s.rows.map(function (r) { return '<div class="sk-doc-row"><span>' + esc(r) + '</span>' + bars(2) + '</div>'; }).join('') + '<span class="btn btn-solid">' + esc(s.btn) + '</span></div>';
    },
    table: function (s) {
      return '<div class="sk-card"><h3 class="sk-h">' + esc(s.h) + '</h3><table class="sk-table"><thead><tr>' + s.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        s.rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return i ? '<td>' + esc(c) + '</td>' : '<th>' + esc(c) + '</th>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
    },
    cal: function (s) {
      var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], h = '';
      days.forEach(function (d, i) { h += '<div class="sk-day"><b>' + d + '</b>' + ['10.00', '13.30', '16.00'].map(function (t, k) { return '<span class="sk-slot' + ((i + k) % 3 === 1 ? ' on' : '') + '">' + t + '</span>'; }).join('') + '</div>'; });
      return '<div class="sk-card"><h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-cal">' + h + '</div></div>';
    },
    mail: function (s) {
      return '<div class="sk-card sk-narrow sk-mail"><p class="sk-mail-top"><b>' + esc(s.subj) + '</b><span>From Breakout Box</span></p><h3 class="sk-h">' + esc(s.h) + '</h3>' +
        s.lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') + '</div>';
    },
    chat: function (s) {
      return '<div class="sk-card sk-narrow"><h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-chat">' + s.msgs.map(function (m) { return '<p class="sk-msg ' + m[0] + '">' + esc(m[1]) + '</p>'; }).join('') +
        '</div><label class="sk-field"><span>Ask a question</span><i></i></label></div>';
    },
    quotes: function (s) {
      var q = '<figure class="sk-quote"><span class="sk-qmark">“</span>' + bars(3) + '<figcaption>Venue name, town</figcaption></figure>';
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-row3">' + q + q + q + '</div><p class="sk-note">' + esc(s.note) + '</p>';
    },
    stats: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-stats">' + s.items.map(function (i) { return '<div class="sk-stat"><b>Soon</b><span>' + esc(i) + '</span></div>'; }).join('') + '</div>' + (s.note ? '<p class="sk-note">' + esc(s.note) + '</p>' : '');
    },
    film: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-film">' + img(s.img) + '<span class="sk-play" aria-hidden="true"></span></div><p class="sk-note">Your own film of a table cracking it goes here.</p>';
    },
    gallery: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-gallery">' + s.imgs.map(function (i) { return '<div class="sk-ph">' + img(i) + '</div>'; }).join('') + '</div>';
    },
    about: function (s) {
      return '<div class="sk-about"><div class="sk-portrait" aria-hidden="true"><span>Photo</span></div><div><h3 class="sk-h">' + esc(s.h) + '</h3><p>' + esc(s.line) + '</p>' + bars(3) + '</div></div>';
    },
    list: function (s) {
      return '<div class="sk-card sk-narrow"><h3 class="sk-h">' + esc(s.h) + '</h3><ul class="sk-list">' + s.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' + (s.note ? '<p class="sk-note">' + esc(s.note) + '</p>' : '') + '</div>';
    },
    cards: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-row3">' + s.items.map(function (i, k) { return '<div class="sk-tile' + (k ? '' : ' first') + '"><b>' + esc(i[0]) + '</b><span>' + esc(i[1]) + '</span></div>'; }).join('') + '</div>';
    },
    spin: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-spin"><div class="sk-spin-o">' + img(s.img) + '</div><p class="sk-note">Drag to turn your box, from a turntable film of the real thing.</p></div>';
    },
    phone: function (s) {
      return '<div class="sk-phone-w"><div class="sk-phone"><p class="sk-phone-h">' + esc(s.h) + '</p>' + s.lines.map(function (l, i) { return '<p class="' + (i === 1 ? 'big' : '') + '">' + esc(l) + '</p>'; }).join('') + '<span class="btn btn-solid">Share</span></div></div>';
    },
    stars: function (s) {
      return '<div class="sk-card sk-narrow"><h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-stars" aria-hidden="true"><i></i><i></i><i></i><i></i><i class="off"></i></div><label class="sk-field"><span>Anything to add</span><i></i></label><span class="btn btn-solid">Send</span></div>';
    },
    kit: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-row3">' + s.items.map(function (i, k) { return '<div class="sk-print k' + k + '"><b>Breakout Box</b>' + bars(2) + '<span>' + esc(i) + '</span></div>'; }).join('') + '</div>';
    },
    dash: function (s) {
      return '<div class="sk-dash"><div class="sk-dash-side"><b>Breakout Box</b>' + s.rows.map(function (r) { return '<span>' + esc(r) + '</span>'; }).join('') + '</div><div class="sk-dash-main"><h3 class="sk-h">' + esc(s.h) + '</h3>' +
        '<div class="sk-stats"><div class="sk-stat"><b>2</b><span>Boxes</span></div><div class="sk-stat"><b>Soon</b><span>Next delivery</span></div></div><span class="btn btn-solid">Reorder</span></div></div>';
    },
    checkout: function (s) {
      return '<div class="sk-card sk-narrow"><h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-line-item"><span>' + esc(s.rows[0]) + '</span><b>' + esc(s.rows[1]) + '</b></div><label class="sk-field"><span>Card details</span><i></i></label><span class="btn btn-solid">Pay</span></div>';
    },
    board: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-board">' + s.cols.map(function (c, k) { var n = ''; for (var i = 0; i < 3 - (k > 1 ? 1 : 0); i++) n += '<div class="sk-lead">' + bars(2) + '</div>'; return '<div class="sk-col"><b>' + esc(c) + '</b>' + n + '</div>'; }).join('') + '</div>';
    },
    serp: function (s) {
      return '<div class="sk-card sk-narrow"><h3 class="sk-h">' + esc(s.h) + '</h3><p class="sk-q">' + esc(s.q) + '</p><div class="sk-res"><span>' + esc(s.url) + '</span><b>' + esc(s.title) + '</b>' + bars(2) + '</div></div>';
    },
    band: function (s) {
      return '<div class="sk-band"><h3 class="sk-h">' + esc(s.h) + '</h3><p>' + esc(s.line) + '</p><span class="btn btn-solid">' + esc(s.btn) + '</span></div>';
    },
    brand: function (s) {
      var cs = getComputedStyle(document.documentElement), f = getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0].replace(/"/g, ''), b = getComputedStyle(document.body).fontFamily.split(',')[0].replace(/"/g, '');
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-brand"><div class="sk-sw"><i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i></div><div><p class="sk-font-h">' + esc(f) + '</p><p>' + esc(b) + ' for text</p><p class="sk-note">Built from what you pick in this studio.</p></div></div>';
    },
    logo: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-row3"><div class="sk-logo"><span>1</span><span>4</span><span>9</span></div><div class="sk-logo dark"><span>1</span><span>4</span><span>9</span></div><div class="sk-logo small"><span>1</span><span>4</span><span>9</span><b>Breakout Box</b></div></div>';
    },
    deck: function (s) {
      return '<h3 class="sk-h">' + esc(s.h) + '</h3><div class="sk-deck">' + s.slides.map(function (t, k) { return '<div class="sk-slide' + (k ? '' : ' first') + '"><b>' + esc(t) + '</b>' + bars(2) + '</div>'; }).join('') + '</div>';
    }
  };

  function block(item) {
    var s = CAT.sketch[item.id]; if (!s || !T[s.t]) return '';
    return '<div class="sk-block" id="x-' + item.id + '"><p class="sk-tag">Sketch, from your plan. ' + esc(item.n) + '</p>' + T[s.t](s) + '</div>';
  }
  function ensure(id, cls, html) {
    var el = document.getElementById(id);
    if (!el) { el = document.createElement('section'); el.id = id; el.className = cls; el.innerHTML = html; document.querySelector('main').appendChild(el); }
    return el;
  }
  window.renderAdded = function (ids) {
    ids = Array.isArray(ids) ? ids : [];
    var order = {}; (CAT.cats || []).forEach(function (c, i) { order[c.id] = i; });
    var items = ids.map(function (id) { return CAT.items.filter(function (i) { return i.id === id; })[0]; }).filter(function (i) { return i && CAT.sketch[i.id]; })
      .sort(function (a, b) { return order[a.c] - order[b.c]; });
    var site = items.filter(function (i) { return CAT.sketch[i.id].where === 'site'; }), office = items.filter(function (i) { return CAT.sketch[i.id].where === 'office'; });
    var a = ensure('added', 'added', '<div class="added-head"><h2>Added from your plan.</h2><p>Rough sketches of what you picked, in your colours and fonts. We design each one properly when we build it.</p></div><div class="added-list"></div>');
    var o = ensure('office', 'office', '<div class="added-head"><h2>Behind the scenes.</h2><p>Only you see these. Tools and work that run your side of Breakout Box.</p></div><div class="added-list"></div>');
    a.style.order = 98; o.style.order = 100;
    a.hidden = !site.length; o.hidden = !office.length;
    a.querySelector('.added-list').innerHTML = site.map(block).join('');
    o.querySelector('.added-list').innerHTML = office.map(block).join('');
    // pages he adds get a place in the menu
    var nav = document.querySelector('.nav'); if (!nav) return;
    Array.prototype.slice.call(nav.querySelectorAll('[data-added]')).forEach(function (n) { n.remove(); });
    var links = site.filter(function (i) { return CAT.sketch[i.id].nav; });
    var shown = links.slice(0, 2), more = links.slice(2);
    shown.forEach(function (i) { var l = document.createElement('a'); l.href = '#x-' + i.id; l.textContent = CAT.sketch[i.id].nav; l.dataset.added = '1'; l.className = 'nav-new'; nav.appendChild(l); });
    if (more.length) {
      var d = document.createElement('details'); d.className = 'nav-more'; d.dataset.added = '1';
      d.innerHTML = '<summary>More</summary><div>' + more.map(function (i) { return '<a href="#x-' + i.id + '">' + esc(CAT.sketch[i.id].nav) + '</a>'; }).join('') + '</div>';
      nav.appendChild(d);
    }
  };
})();
