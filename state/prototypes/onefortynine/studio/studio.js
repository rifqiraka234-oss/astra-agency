(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- the choices, with Astra's pick and the reason for it ---------- */
  var PRESETS = {
    daylight: { bg: '#ffffff', ink: '#1d1d1f', accent: '#1d1d1f', g1: '#ffa646', g2: '#d81b72' },
    brand: { bg: '#ffffff', ink: '#09004a', accent: '#09004a', g1: '#ff914d', g2: '#ff0000' },
    baize: { bg: '#0b2a1f', ink: '#f4ecdd', accent: '#d8b46a', g1: '#f1dba6', g2: '#b8893e' },
    ember: { bg: '#0e0e10', ink: '#f5f5f7', accent: '#ff6a1a', g1: '#ffb347', g2: '#ff3d00' }
  };
  var GROUPS = {
    palette: [
      { v: 'daylight', name: 'Daylight', desc: 'White, near black and one warm gradient. Bright and open.',
        pick: 'Our pick. Of 65 big brand homepages we checked, 60 are white, and the colour comes from the film and the product.' },
      { v: 'brand', name: 'Your colours', desc: 'Your navy, red and orange, as on your site today.' },
      { v: 'baize', name: 'Games table', desc: 'Green baize, brass and cream, like a card room in a members’ club.' },
      { v: 'ember', name: 'Ink and ember', desc: 'Near black with a hot orange. Bold and late night.' }
    ],
    hero: [
      { v: 'split', name: 'Film beside the headline', desc: 'Words on the left, the film as a big tile on the right.', sk: 'split',
        pick: 'Our pick. The film and the pitch share the first screen, like Apple’s product pages.' },
      { v: 'centred', name: 'Headline in the middle', desc: 'A big centred headline, the film as a wide tile below it.', sk: 'centred' },
      { v: 'band', name: 'Film across the top', desc: 'The film runs edge to edge, the words sit under it.', sk: 'band' }
    ],
    headline: [
      { v: 'money', name: 'There’s money on the table.', desc: 'With your venue changing under it, pub, café, park, training day.',
        pick: 'Our pick. It starts with what your buyers want, more people in, staying longer, spending more.' },
      { v: 'product', name: 'An escape room in a cool box.', desc: 'Your product line, from your Breakout Box page.' },
      { v: 'sales', name: 'Stock Breakout Box. Unlock new sales.', desc: 'Your words, from your contact page.' },
      { v: 'unboxing', name: 'Think escape room meets unboxing.', desc: 'Your words, from your home page.' }
    ]
  };
  var MIX = [
    { k: 'bg', name: 'Background' }, { k: 'ink', name: 'Text' }, { k: 'accent', name: 'Buttons' },
    { k: 'g1', name: 'Highlight, start' }, { k: 'g2', name: 'Highlight, end' }
  ];
  var FONTS = {
    h: [
      { v: 'mona', name: 'Mona Sans', css: '"Mona Sans"', w: 720, note: 'Clean and modern.', pick: 'Our pick, sharp on every screen.' },
      { v: 'fraunces', name: 'Fraunces Soft', css: '"Fraunces"', w: 820, vs: '"SOFT" 100, "opsz" 144', note: 'The closest to the Cooper Black on your site today.' },
      { v: 'young', name: 'Young Serif', css: '"Young Serif"', w: 400, note: 'Warm and old style, friendly.' },
      { v: 'bricolage', name: 'Bricolage', css: '"Bricolage Grotesque"', w: 760, note: 'Full of character, still modern.' },
      { v: 'instrument', name: 'Instrument Serif', css: '"Instrument Serif"', w: 400, note: 'Slim and elegant, a fashion feel.' },
      { v: 'unbounded', name: 'Unbounded', css: '"Unbounded"', w: 700, note: 'Wide and playful, very loud.' },
      { v: 'schibsted', name: 'Schibsted', css: '"Schibsted Grotesk"', w: 780, note: 'A sharp, newsy grotesk.' }
    ],
    b: [
      { v: 'mona', name: 'Mona Sans', css: '"Mona Sans"', w: 400, note: 'Our pick, easy to read.', pick: true },
      { v: 'instrument', name: 'Instrument Sans', css: '"Instrument Sans"', w: 400, note: 'Soft and open.' },
      { v: 'schibsted', name: 'Schibsted', css: '"Schibsted Grotesk"', w: 400, note: 'Compact and crisp.' },
      { v: 'bricolage', name: 'Bricolage', css: '"Bricolage Grotesque"', w: 400, note: 'Friendly, with a bit of quirk.' }
    ]
  };
  var SECTIONS = [
    { id: 'crack', name: 'Crack the box' }, { id: 'how', name: 'How it works' }, { id: 'numbers', name: 'Your numbers' },
    { id: 'proposal', name: 'Your proposal' }, { id: 'catch', name: 'What’s the catch' }, { id: 'games', name: 'Games' },
    { id: 'who', name: 'Who we are' }
  ];
  var PAGES = [
    { id: 'parks', name: 'A page for holiday parks', why: 'Their own story, numbers and questions.', when: 'Our pick for now' },
    { id: 'pubs', name: 'A page for pubs and bars', why: 'Quiet nights, quiz nights, longer stays.', when: 'Our pick for now' },
    { id: 'cafes', name: 'A page for cafés', why: 'Quiet mornings, the gap after lunch, coffee mornings.', when: 'Next' },
    { id: 'training', name: 'A page for training and team days', why: 'Watch who leads, who listens and who falls apart.', when: 'Next' },
    { id: 'lets', name: 'A page for holiday lets and lodges', why: 'A premium extra on the stay.', when: 'Next' },
    { id: 'games', name: 'A games page that grows', why: 'Every new game and seasonal edition gets its own spot.', when: 'When the next game is ready' },
    { id: 'stories', name: 'Customer stories', why: 'Your first venues, in their words, so the next ones can see it works.', when: 'When the first trial ends' },
    { id: 'reorder', name: 'Log in to reorder', why: 'Venues reorder boxes and supplies without an email.', when: 'Later' }
  ];
  var DEFAULT = { palette: 'daylight', custom: Object.assign({}, PRESETS.daylight), fonts: { h: 'mona', b: 'mona' }, hero: 'split', headline: 'money',
    sections: SECTIONS.map(function (s) { return { id: s.id, on: true }; }), pages: ['parks', 'pubs'] };
  var S = JSON.parse(JSON.stringify(DEFAULT));
  try {
    var q = new URLSearchParams(location.search).get('s');
    if (q) {
      var o = JSON.parse(decodeURIComponent(escape(atob(q))));
      ['palette', 'hero', 'headline'].forEach(function (k) { if (typeof o[k] === 'string') S[k] = o[k]; });
      if (o.custom) MIX.forEach(function (m) { if (/^#[0-9a-f]{6}$/i.test(o.custom[m.k] || '')) S.custom[m.k] = o.custom[m.k]; });
      if (o.fonts) { if (o.fonts.h) S.fonts.h = o.fonts.h; if (o.fonts.b) S.fonts.b = o.fonts.b; }
      if (Array.isArray(o.sections)) S.sections = o.sections; if (Array.isArray(o.pages)) S.pages = o.pages;
    }
  } catch (e) {}

  /* ---------- colour maths for the readability line ---------- */
  function rgb(h) { h = h.replace('#', ''); var n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function lum(h) { return rgb(h).map(function (c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }).reduce(function (a, c, i) { return a + c * [0.2126, 0.7152, 0.0722][i]; }, 0); }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

  /* ---------- draw the options ---------- */
  function sketch(k) {
    if (k === 'split') return '<span class="sk" aria-hidden="true"><b class="k1"></b><b class="k2"></b><i class="k3"></i><i class="k4"></i></span>';
    if (k === 'centred') return '<span class="sk sk-c" aria-hidden="true"><b class="k1"></b><i class="k3"></i><i class="k4"></i></span>';
    return '<span class="sk sk-b" aria-hidden="true"><i class="k4"></i><b class="k1"></b><i class="k3"></i></span>';
  }
  function swatch(p) { var c = PRESETS[p]; return '<span class="sw" aria-hidden="true">' + [c.bg, c.ink, c.g1, c.g2].map(function (x) { return '<i data-c="' + x + '"></i>'; }).join('') + '</span>'; }
  Object.keys(GROUPS).forEach(function (g) {
    var box = $('[data-opts="' + g + '"]');
    GROUPS[g].forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt' + (g === 'headline' ? ' opt-solo' : ''); b.setAttribute('role', 'radio'); b.dataset.g = g; b.dataset.v = o.v;
      var lead = g === 'palette' ? swatch(o.v) : g === 'hero' ? sketch(o.sk) : '';
      b.innerHTML = lead + '<span><span class="opt-name' + (g === 'headline' ? ' hl' : '') + '">' + o.name + '</span><span class="opt-desc">' + o.desc + '</span>' + (o.pick ? '<span class="opt-pick">' + o.pick + '</span>' : '') + '</span>';
      b.addEventListener('click', function () {
        S[g] = o.v;
        if (g === 'palette') S.custom = Object.assign({}, PRESETS[o.v]);
        update();
      });
      box.appendChild(b);
    });
  });
  $$('.sw i').forEach(function (i) { i.style.background = i.dataset.c; });

  // make it yours, a colour picker and a hex field for each colour
  var rows = $('[data-mix-rows]');
  MIX.forEach(function (m) {
    var id = 'mix-' + m.k, row = document.createElement('div');
    row.className = 'mix-row';
    row.innerHTML = '<label for="' + id + '">' + m.name + '</label><input type="color" id="' + id + '" data-mix-c="' + m.k + '"><input type="text" class="hex" inputmode="text" maxlength="7" aria-label="' + m.name + ' hex code" data-mix-h="' + m.k + '">';
    rows.appendChild(row);
    function set(v) { S.custom[m.k] = v.toLowerCase(); S.palette = 'custom'; update(); }
    row.querySelector('[data-mix-c]').addEventListener('input', function (e) { set(e.target.value); });
    row.querySelector('[data-mix-h]').addEventListener('change', function (e) {
      var v = e.target.value.trim(); if (v[0] !== '#') v = '#' + v;
      if (/^#[0-9a-f]{6}$/i.test(v)) set(v); else e.target.value = S.custom[m.k];
    });
  });

  // fonts, each shown in its own face
  ['h', 'b'].forEach(function (k) {
    var box = $('[data-fonts="' + k + '"]');
    FONTS[k].forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'font'; b.setAttribute('role', 'radio'); b.dataset.k = k; b.dataset.v = f.v;
      b.innerHTML = '<span class="font-s" data-face="' + f.v + '">' + (k === 'h' ? 'Crack it' : 'Teams of up to six') + '</span><span class="font-n">' + f.name + '</span><span class="font-d">' + f.note + '</span>' + (f.pick && k === 'h' ? '<span class="opt-pick">' + f.pick + '</span>' : '');
      var s = b.querySelector('.font-s'); s.style.fontFamily = f.css + ', "Mona Sans", serif'; s.style.fontWeight = f.w; if (f.vs) s.style.fontVariationSettings = f.vs;
      b.addEventListener('click', function () { S.fonts[k] = f.v; update(); });
      box.appendChild(b);
    });
  });

  var secList = $('[data-secs]');
  function drawSecs() {
    secList.innerHTML = '';
    S.sections.forEach(function (s, i) {
      var meta = SECTIONS.filter(function (x) { return x.id === s.id; })[0]; if (!meta) return;
      var li = document.createElement('li'); li.className = 'sec' + (s.on ? '' : ' off');
      li.innerHTML = '<label><input type="checkbox"' + (s.on ? ' checked' : '') + '> ' + meta.name + '</label><span></span>' +
        '<button type="button" class="mv up" aria-label="Move ' + meta.name + ' up"' + (i === 0 ? ' disabled' : '') + '></button>' +
        '<button type="button" class="mv dn" aria-label="Move ' + meta.name + ' down"' + (i === S.sections.length - 1 ? ' disabled' : '') + '></button>';
      li.querySelector('input').addEventListener('change', function (e) { s.on = e.target.checked; update(); });
      li.querySelector('.up').addEventListener('click', function () { move(i, -1, '.up'); });
      li.querySelector('.dn').addEventListener('click', function () { move(i, 1, '.dn'); });
      secList.appendChild(li);
    });
  }
  function move(i, d, cls) {
    var j = i + d; if (j < 0 || j >= S.sections.length) return;
    var t = S.sections[i]; S.sections[i] = S.sections[j]; S.sections[j] = t; update();
    var btn = secList.children[j] && secList.children[j].querySelector(cls); if (btn && !btn.disabled) btn.focus(); else if (secList.children[j]) secList.children[j].querySelector('input').focus();
  }
  var pageList = $('[data-pages]');
  PAGES.forEach(function (pg) {
    var li = document.createElement('li');
    li.innerHTML = '<label><input type="checkbox" value="' + pg.id + '"' + (S.pages.indexOf(pg.id) > -1 ? ' checked' : '') + '><span><span class="pg-name">' + pg.name + '</span><span class="pg-why">' + pg.why + '</span><span class="pg-when">' + pg.when + '</span></span></label>';
    li.querySelector('input').addEventListener('change', function (e) {
      var k = S.pages.indexOf(pg.id); if (e.target.checked && k < 0) S.pages.push(pg.id); if (!e.target.checked && k > -1) S.pages.splice(k, 1); update();
    });
    pageList.appendChild(li);
  });

  /* ---------- keep the preview, the summary and the form in step ---------- */
  var frame = $('[data-preview]');
  function send() { try { frame.contentWindow.postMessage({ type: 'studio', state: S }, location.origin); } catch (e) {} }
  window.addEventListener('message', function (e) { if (e.origin === location.origin && e.data && e.data.type === 'preview-ready') send(); });
  frame.addEventListener('load', send);
  function nameOf(g, v) { var o = GROUPS[g].filter(function (x) { return x.v === v; })[0]; return o ? o.name : v; }
  function fontName(k, v) { var f = FONTS[k].filter(function (x) { return x.v === v; })[0]; return f ? f.name : v; }
  function summary() {
    var on = S.sections.filter(function (s) { return s.on; }).map(function (s) { return SECTIONS.filter(function (x) { return x.id === s.id; })[0].name; });
    var pages = PAGES.filter(function (p) { return S.pages.indexOf(p.id) > -1; }).map(function (p) { return p.name.replace(/^A page for /, ''); });
    var colours = S.palette === 'custom' ? 'Colours, my own, background ' + S.custom.bg + ', text ' + S.custom.ink + ', buttons ' + S.custom.accent + ', highlight ' + S.custom.g1 + ' to ' + S.custom.g2 : 'Colours, ' + nameOf('palette', S.palette);
    return colours + '. Fonts, ' + fontName('h', S.fonts.h) + ' for headlines, ' + fontName('b', S.fonts.b) + ' for text. First screen, ' + nameOf('hero', S.hero) + '. Headline, ' + nameOf('headline', S.headline) +
      '\nSections, in order, ' + (on.length ? on.join(', ') : 'none') + '.\nPages to add, ' + (pages.length ? pages.join(', ') : 'none') + '.';
  }
  function readability() {
    var c = S.custom, t = contrast(c.ink, c.bg), b = contrast(c.accent, '#ffffff') >= contrast(c.accent, '#111111') ? contrast(c.accent, '#ffffff') : contrast(c.accent, '#111111');
    var ok = t >= 4.5, okb = b >= 4.5;
    var el = $('[data-read]');
    el.className = 'read' + (ok && okb ? '' : ' warn');
    el.textContent = (ok ? 'Text is easy to read, ' : 'Text is hard to read on this background, ') + t.toFixed(1) + ' to 1' + (ok ? '.' : ', aim for 4.5 or more.') +
      ' Button labels ' + b.toFixed(1) + ' to 1' + (okb ? '.' : ', pick a deeper or lighter button colour.');
  }
  function update() {
    $$('.opt').forEach(function (b) { b.setAttribute('aria-checked', String(S[b.dataset.g] === b.dataset.v)); });
    $$('.font').forEach(function (b) { b.setAttribute('aria-checked', String(S.fonts[b.dataset.k] === b.dataset.v)); });
    $$('[data-mix-c]').forEach(function (i) { i.value = S.custom[i.dataset.mixC]; });
    $$('[data-mix-h]').forEach(function (i) { if (document.activeElement !== i) i.value = S.custom[i.dataset.mixH]; });
    $('[data-mix]').classList.toggle('on', S.palette === 'custom');
    readability();
    drawSecs();
    $('[data-summary]').textContent = summary();
    $('[data-choices]').value = summary();
    send();
  }

  /* ---------- desktop or phone ---------- */
  $$('[data-device]').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('[data-device]').forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
      $('[data-frame]').classList.toggle('phone', b.dataset.device === 'phone');
    });
  });

  /* ---------- a link to these choices, and sending them ---------- */
  function link() { return location.href.split('?')[0].split('#')[0] + '?s=' + btoa(unescape(encodeURIComponent(JSON.stringify(S)))); }
  var note = $('[data-send-note]');
  $('[data-copy-link]').addEventListener('click', function () {
    var u = link();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(function () { note.textContent = 'Link copied. Whoever opens it sees your site with these choices.'; }, function () { note.textContent = u; });
    else note.textContent = u;
  });
  $('[data-form]').addEventListener('submit', function (e) {
    e.preventDefault();
    $('[data-choices]').value = summary() + '\nLink, ' + link();
    var f = e.target, data = new URLSearchParams(new FormData(f)).toString();
    note.textContent = 'Sending...';
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
      .then(function (r) { if (!r.ok) throw new Error(r.status); note.textContent = 'Sent. Raka has your choices, and we’ll go through them together on Wednesday.'; })
      .catch(function () { note.textContent = 'That didn’t send from here. Copy the link above and reply to Raka’s email with it, and he’ll see exactly what you picked.'; });
  });
  $$('[data-send-jump]').forEach(function (j) { j.addEventListener('click', function (e) { e.preventDefault(); $('#send').scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });

  update();
})();
