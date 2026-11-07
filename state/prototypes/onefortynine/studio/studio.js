(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- the choices, with Astra's pick and the reason for it ---------- */
  var GROUPS = {
    palette: [
      { v: 'daylight', name: 'Daylight', desc: 'White, near black and one warm gradient. Bright and open.', sw: ['#ffffff', '#1d1d1f', '#ff6a3d', '#d81b72'],
        pick: 'Our pick. Of 65 big brand homepages we checked, 60 are white, and the colour comes from the film and the product.' },
      { v: 'brand', name: 'Your colours', desc: 'Your navy, red and orange, as on your site today.', sw: ['#ffffff', '#09004a', '#ff0000', '#ff914d'] },
      { v: 'baize', name: 'Games table', desc: 'Green baize, brass and cream, like a card room in a members’ club.', sw: ['#0b2a1f', '#2b6d51', '#d8b46a', '#f4ecdd'] },
      { v: 'ember', name: 'Ink and ember', desc: 'Near black with a hot orange. Bold and late night.', sw: ['#0e0e10', '#1c1c20', '#ff6a1a', '#f5f5f7'] }
    ],
    type: [
      { v: 'clean', name: 'Clean and modern', desc: 'One crisp sans serif for everything.', ty: 'clean',
        pick: 'Our pick. It reads like Apple and Airbnb, and stays sharp on a phone.' },
      { v: 'soft', name: 'Chunky and friendly', desc: 'A soft heavy serif for the headlines, the closest to the Cooper Black on your site today.', ty: 'soft' }
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
  var DEFAULT = { palette: 'daylight', type: 'clean', hero: 'split', headline: 'money', sections: SECTIONS.map(function (s) { return { id: s.id, on: true }; }), pages: ['parks', 'pubs'] };
  var S = JSON.parse(JSON.stringify(DEFAULT));
  try { var q = new URLSearchParams(location.search).get('s'); if (q) { var o = JSON.parse(decodeURIComponent(escape(atob(q)))); ['palette', 'type', 'hero', 'headline'].forEach(function (k) { if (o[k]) S[k] = o[k]; }); if (Array.isArray(o.sections)) S.sections = o.sections; if (Array.isArray(o.pages)) S.pages = o.pages; } } catch (e) {}

  /* ---------- draw the options ---------- */
  function sketch(k) {
    if (k === 'split') return '<span class="sk" aria-hidden="true"><b style="left:6px;top:10px;width:22px;height:5px"></b><b style="left:6px;top:18px;width:16px;height:5px"></b><i style="left:6px;top:28px;width:20px;height:3px"></i><i style="right:6px;top:6px;width:26px;height:32px"></i></span>';
    if (k === 'centred') return '<span class="sk" aria-hidden="true"><b style="left:16px;top:6px;width:32px;height:5px"></b><i style="left:22px;top:14px;width:20px;height:3px"></i><i style="left:6px;top:21px;width:52px;height:18px"></i></span>';
    return '<span class="sk" aria-hidden="true"><i style="left:0;top:0;width:64px;height:24px"></i><b style="left:6px;top:28px;width:24px;height:5px"></b><i style="right:6px;top:29px;width:20px;height:3px"></i></span>';
  }
  function lead(g, o) {
    if (g === 'palette') return '<span class="sw" aria-hidden="true">' + o.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>';
    if (g === 'type') return '<span class="ty' + (o.ty === 'soft' ? ' ty-soft' : '') + '" aria-hidden="true">Aa</span>';
    if (g === 'hero') return sketch(o.sk);
    return '<span class="hl" aria-hidden="true"></span>';
  }
  Object.keys(GROUPS).forEach(function (g) {
    var box = $('[data-opts="' + g + '"]');
    GROUPS[g].forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt'; b.setAttribute('role', 'radio'); b.dataset.g = g; b.dataset.v = o.v;
      b.innerHTML = lead(g, o) + '<span><span class="opt-name' + (g === 'headline' ? ' hl' : '') + '">' + o.name + '</span><span class="opt-desc">' + o.desc + '</span>' + (o.pick ? '<span class="opt-pick">' + o.pick + '</span>' : '') + '</span>';
      if (g === 'headline') b.classList.add('opt-solo');
      if (g === 'headline') b.querySelector('.hl[aria-hidden]').remove();
      b.addEventListener('click', function () { S[g] = o.v; update(); });
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
  function summary() {
    var on = S.sections.filter(function (s) { return s.on; }).map(function (s) { return SECTIONS.filter(function (x) { return x.id === s.id; })[0].name; });
    var pages = PAGES.filter(function (p) { return S.pages.indexOf(p.id) > -1; }).map(function (p) { return p.name.replace(/^A page for /, ''); });
    return 'Colours, ' + nameOf('palette', S.palette) + '. Type, ' + nameOf('type', S.type) + '. First screen, ' + nameOf('hero', S.hero) + '. Headline, ' + nameOf('headline', S.headline) +
      '\nSections, in order, ' + (on.length ? on.join(', ') : 'none') + '.\nPages to add, ' + (pages.length ? pages.join(', ') : 'none') + '.';
  }
  function update() {
    $$('.opt').forEach(function (b) { b.setAttribute('aria-checked', String(S[b.dataset.g] === b.dataset.v)); });
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
    var f = e.target, data = new URLSearchParams(new FormData(f)).toString();
    note.textContent = 'Sending...';
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        note.textContent = 'Sent. Raka has your choices, and we’ll go through them together on Wednesday.';
      })
      .catch(function () {
        note.textContent = 'That didn’t send from here. Copy the link above and reply to Raka’s email with it, and he’ll see exactly what you picked.';
      });
  });
  $$('[data-send-jump]').forEach(function (j) { j.addEventListener('click', function (e) { e.preventDefault(); $('#send').scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });

  update();
})();
