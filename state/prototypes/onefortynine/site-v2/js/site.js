(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header goes solid once the film is behind us ---------- */
  var hdr = $('[data-hdr]');
  function onScroll() { hdr.classList.toggle('solid', window.scrollY > window.innerHeight * 0.6); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- the hero film, four tables, the line changes with each cut ---------- */
  var film = $('[data-film]'), where = $('[data-where]'), toggle = $('[data-film-toggle]');
  var places = ['In your pub.', 'In your café.', 'At your park.', 'On your training day.'];
  var shown = 0, userPaused = false;
  function setWhere(i) {
    if (i === shown) return; shown = i;
    where.classList.add('swap');
    setTimeout(function () { where.textContent = places[i]; where.classList.remove('swap'); }, 220);
  }
  if (RM) {
    where.textContent = 'In your pub, café, park or training room.';
    toggle.hidden = true;
  } else {
    film.addEventListener('timeupdate', function () { setWhere(Math.min(3, Math.floor(film.currentTime / 3))); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !userPaused) { var p = film.play(); if (p && p.catch) p.catch(function () {}); }
        else film.pause();
      });
    }, { threshold: 0.15 });
    io.observe(film);
    toggle.addEventListener('click', function () {
      userPaused = !film.paused;
      if (film.paused) { film.play(); toggle.textContent = 'Pause film'; toggle.setAttribute('aria-pressed', 'false'); }
      else { film.pause(); toggle.textContent = 'Play film'; toggle.setAttribute('aria-pressed', 'true'); }
    });
  }

  /* ---------- the venues, in Owen's words from the call and his own pages ---------- */
  // money: an example only, games a week at a price a team, against the £60 a month rent or the £350 to own
  var VENUES = [
    { id: 'park', name: 'A holiday park', gpw: 3, price: 20, per: 'a team', items: [
      ['How it plays here', 'Guests book it at reception and play on site, in the clubhouse or the bar. One box, more than one game a day.'],
      ['What you charge', 'You set the price and keep all of it. Our example is £20 a team.'],
      ['What sells around it', 'A drinks or snack package with every game, and the round after.'],
      ['Who plays', 'Families and groups of up to six, for 60 to 90 minutes, whatever the weather.'] ] },
    { id: 'pub', name: 'A pub or bar', gpw: 2, price: 20, per: 'a team', items: [
      ['How it plays here', 'Teams play at a table on your quiet nights, or as a quiz night with a twist.'],
      ['What you charge', 'A game fee per team, and you keep every penny. Our example is £20.'],
      ['What sells around it', 'A game runs 60 to 90 minutes. That\'s time at the table, and time at the bar.'],
      ['Who plays', 'Regulars, birthdays, leaving drinks, anyone who wants more than another pint.'] ] },
    { id: 'cafe', name: 'A café', gpw: 2, price: 25, per: 'a table', items: [
      ['How it plays here', 'Fill the quiet mornings and the gap after lunch, or run it as a coffee morning.'],
      ['What you charge', 'Sell it as a game and cake deal for the table. Our example is £25.'],
      ['What sells around it', 'Coffee, cake and lunch for a table of up to six, staying well past one cup.'],
      ['Who plays', 'Parents after drop off, friends, clubs, anyone with an hour to fill.'] ] },
    { id: 'training', name: 'Training and team days', gpw: 1.4, price: 30, per: 'a team', items: [
      ['How it plays here', 'Six puzzles in any order, so you can watch who leads, who listens and who falls apart.'],
      ['What you charge', 'Build it into the course price. Our example is £30 a team.'],
      ['What sells around it', 'A session delegates talk about long after the slides are forgotten.'],
      ['Who plays', 'Teams of up to six, one at a time or team against team.'] ] },
    { id: 'lets', name: 'Holiday lets and lodges', gpw: 0.46, price: 25, per: 'a game', own: true, items: [
      ['How it plays here', 'Leave it ready for a rainy evening, or lend it out from your office.'],
      ['What you charge', 'Hire it to guests, or offer it as a premium extra on the stay.'],
      ['What sells around it', 'Fill the boxes with local treats, wine or chocolate, and price the stay up.'],
      ['Who plays', 'Families and friends staying with you, no screens needed.'] ] }
  ];
  var RENT = 60, OWN = 350;

  /* ---------- the lock, three wheels, the code is 1 4 9 ---------- */
  var CODE = [1, 4, 9];
  var stage = $('[data-stage]'), lock = $('[data-lock]'), wheels = $$('[data-wheel]');
  var vals = [0, 0, 0], opened = false, halo = $('[data-halo]'), haloA = 0;
  function feel(w, dir) {
    w.classList.remove('tick'); void w.offsetWidth; w.classList.add('tick');
    haloA += 36 * (dir || 1); halo.style.setProperty('--a', haloA + 'deg');
    if (navigator.vibrate && !RM) { try { navigator.vibrate(6); } catch (e) {} }
  }
  wheels.forEach(function (w, i) {
    var strip = $('[data-strip]', w), html = '';
    for (var n = 0; n < 10; n++) html += '<span>' + n + '</span>';
    strip.innerHTML = html;
    function stepH() { var s = $('span', strip); return s ? s.getBoundingClientRect().height : 74; }
    function draw() { strip.style.transform = 'translateY(' + (-vals[i] * stepH()) + 'px)'; w.setAttribute('aria-valuenow', vals[i]); }
    w._set = function (v) { var dir = v > vals[i] ? 1 : -1; vals[i] = (v + 10) % 10; draw(); feel(w, dir); check(); };
    w._draw = draw;
    $$('.w-btn', w).forEach(function (b) { b.addEventListener('click', function () { w._set(vals[i] + (+b.getAttribute('data-step'))); w.focus({ preventScroll: true }); }); });
    w.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); w._set(vals[i] + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); w._set(vals[i] - 1); }
      else if (/^[0-9]$/.test(e.key)) { w._set(+e.key); if (wheels[i + 1]) wheels[i + 1].focus(); }
    });
    var acc = 0;
    w.addEventListener('wheel', function (e) { e.preventDefault(); acc += e.deltaY; if (Math.abs(acc) > 40) { w._set(vals[i] + (acc > 0 ? 1 : -1)); acc = 0; } }, { passive: false });
    var startY = null, startV = 0;
    w.addEventListener('pointerdown', function (e) { if (e.target.closest('.w-btn')) return; startY = e.clientY; startV = vals[i]; w.setPointerCapture(e.pointerId); });
    w.addEventListener('pointermove', function (e) { if (startY === null) return; var d = Math.round((e.clientY - startY) / 26); if (((startV + d) % 10 + 10) % 10 !== vals[i]) { vals[i] = ((startV + d) % 10 + 10) % 10; draw(); feel(w, 1); } });
    w.addEventListener('pointerup', function () { if (startY === null) return; startY = null; check(); });
    draw();
  });
  window.addEventListener('resize', function () { wheels.forEach(function (w) { w._draw(); }); });

  function check() {
    if (opened) return;
    if (vals[0] === CODE[0] && vals[1] === CODE[1] && vals[2] === CODE[2]) open();
  }
  function open() {
    opened = true;
    lock.classList.add('unlocked');
    $('[data-crack-sub]').textContent = 'Cracked. That click is the moment your guests pay for. So what\'s inside for you?';
    setTimeout(function () {
      stage.classList.add('is-open');
      $('[data-closed]').hidden = true;
      var po = $('[data-open]'); po.hidden = false;
    }, RM ? 0 : 520);
  }
  $('[data-just-open]').addEventListener('click', function () {
    var t = 0;
    wheels.forEach(function (w, i) { setTimeout(function () { vals[i] = CODE[i]; w._draw(); feel(w, 1); if (i === 2) check(); }, RM ? 0 : (t += 260)); });
  });

  /* ---------- who is opening it, and what is inside for them ---------- */
  var vbox = $('[data-venues]'), items = $('[data-items]'), money = $('[data-money]'), scene = $('[data-scene]'), result = $('[data-result]');
  VENUES.forEach(function (v, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'venue'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
    b.innerHTML = '<picture><source srcset="media/venues/' + v.id + '-t.webp" type="image/webp"><img src="media/venues/' + v.id + '-t.jpg" width="640" height="360" alt="" loading="lazy"></picture><span>' + v.name + '</span>';
    b.dataset.v = i;
    b.addEventListener('click', function () { choose(i); });
    vbox.appendChild(b);
    var im = document.createElement('img');
    im.src = 'media/venues/' + v.id + '.webp'; im.alt = ''; im.loading = 'lazy'; im.dataset.v = i;
    scene.appendChild(im);
  });
  // the box tilts with the pointer until it is open
  if (!RM && window.matchMedia('(pointer: fine)').matches) {
    var box = $('[data-box]');
    stage.addEventListener('pointermove', function (e) {
      if (opened) return;
      var r = box.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      box.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg'); box.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
    });
    stage.addEventListener('pointerleave', function () { box.style.setProperty('--ry', '0deg'); box.style.setProperty('--rx', '0deg'); });
  }
  // the thread draws itself as the box comes into view
  var thread = $('[data-thread]'), crackEl = $('#crack');
  function drawThread() {
    var r = crackEl.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.55)));
    thread.style.setProperty('--p', RM ? 1 : p.toFixed(3));
  }
  window.addEventListener('scroll', drawThread, { passive: true }); drawThread();
  function fmt(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }
  function choose(i) {
    var v = VENUES[i];
    $$('.venue', vbox).forEach(function (b) { b.setAttribute('aria-checked', String(+b.dataset.v === i)); });
    items.innerHTML = v.items.map(function (it, k) {
      return '<li class="item" data-item="' + k + '"><span class="item-n">' + (k + 1) + '</span><div><p class="item-t">' + it[0] + '</p><p class="item-d">' + it[1] + '</p></div></li>';
    }).join('');
    var month = v.gpw * 52 / 12 * v.price;
    var line, small;
    if (v.own) {
      var months = Math.ceil(OWN / month);
      line = 'About <b>' + fmt(month) + ' a month</b>. Own the box and it pays for itself in about ' + months + ' months.';
      small = 'Example, 4 stays a month, half of them play, ' + fmt(v.price) + ' ' + v.per + '. Before what goes in the box. Set your own below.';
    } else {
      line = 'About <b>' + fmt(month) + ' a month</b>, ' + (month / RENT).toFixed(1).replace('.0', '') + ' times the £60 rent.';
      small = 'Example, ' + (v.gpw === 1.4 ? '6 games a month' : v.gpw + ' games a week') + ' at ' + fmt(v.price) + ' ' + v.per + '. Before what goes in the box. Set your own below.';
    }
    $('[data-money-line]').innerHTML = line;
    $('[data-money-small]').textContent = small;
    $('[data-money-big]').textContent = v.own ? Math.ceil(OWN / month) + ' months' : (month / RENT).toFixed(1).replace('.0', '') + '×';
    $('[data-money-big]').setAttribute('aria-label', v.own ? 'Pays back in about ' + Math.ceil(OWN / month) + ' months' : (month / RENT).toFixed(1) + ' times the rent');
    var max = Math.max(month, RENT) * 1.06;
    var fr = $('[data-bar-rent]'), ft = $('[data-bar-take]');
    fr.style.width = '0'; ft.style.width = '0'; void ft.offsetWidth;
    requestAnimationFrame(function () { fr.style.width = (RENT / max * 100).toFixed(1) + '%'; ft.style.width = (month / max * 100).toFixed(1) + '%'; });
    $('[data-bar-take-v]').textContent = fmt(month);
    $$('img', scene).forEach(function (im) { im.classList.toggle('on', +im.dataset.v === i); });
    stage.classList.add('has-scene');
    result.hidden = false;
    money.hidden = false;
    money.style.animation = 'none'; void money.offsetWidth; money.style.animation = '';
    $$('.item', items).forEach(function (li) {
      var k = +li.dataset.item;
      li.addEventListener('mouseenter', function () { light(k); });
      li.addEventListener('mouseleave', function () { light(-1); });
    });
  }
  function light(k) {
    $$('.spot').forEach(function (s) { s.classList.toggle('on', +s.dataset.spot === k); });
    $$('.item', items).forEach(function (li) { li.classList.toggle('on', +li.dataset.item === k); });
  }
  $$('.spot').forEach(function (s) {
    s.addEventListener('click', function () {
      var k = +s.dataset.spot;
      if (!$('.item', items)) choose(0);
      light(k);
      var li = $('[data-item="' + k + '"]', items); if (li && window.innerWidth < 980) li.scrollIntoView({ block: 'center', behavior: RM ? 'auto' : 'smooth' });
    });
  });
})();
