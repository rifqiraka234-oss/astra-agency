/* The Fae Club plan. The route, the price switch, the hours and the built frames. Every sum is worked out here from
   the numbers the build wrote into the page, which all come from data/plan.json. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = document.documentElement.classList.contains('rm');
  var gbp = function (p) { return '£' + (p / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var split3 = function (t) { var b = Math.floor(t / 3); return [t - 2 * b, b, b]; };
  var press = function (btns, on) { btns.forEach(function (b) { b.setAttribute('aria-pressed', b === on ? 'true' : 'false'); }); };

  /* ------------------------------------------------ the route */
  var rt = $('[data-route]');
  if (rt) {
    var R = JSON.parse($('script[type="application/json"]', rt).textContent);
    var rail = $('[data-rail]', rt), sum = $('[data-sum]', rt);
    var payB = $$('[data-pay]', rt), whenB = $$('[data-when]', rt), st = { pay: '3', when: 't' };
    var draw = function () {
      var key = (st.when === 't' ? 't' : 'n') + (st.pay === '3' ? '3' : 'f'), r = R.routes[key];
      rail.innerHTML = '';
      rail.style.setProperty('--n', r.stops.length);
      r.stops.forEach(function (s, i) {
        var li = document.createElement('li'); li.className = 'rs' + (s.k ? ' ' + s.k : ''); li.style.setProperty('--i', i);
        var o = document.createElement('span'); o.className = 'rs-o'; o.innerHTML = R.icons[s.k] || '';
        var x = document.createElement('div'); x.className = 'rs-x';
        var b = document.createElement('b'); b.textContent = s.t;
        var p = document.createElement('span'); p.textContent = s.p;
        x.appendChild(b); x.appendChild(p);
        if (s.k) { var k = document.createElement('span'); k.className = 'rs-k'; k.textContent = R.labels[s.k]; x.appendChild(k); }
        li.appendChild(o); li.appendChild(x); rail.appendChild(li);
      });
      sum.textContent = r.sum;
      rt.setAttribute('data-key', key);
      if (!reduce) { rail.classList.add('swap'); void rail.offsetWidth; requestAnimationFrame(function () { rail.classList.remove('swap'); }); }
    };
    payB.forEach(function (b) { b.addEventListener('click', function () { st.pay = b.getAttribute('data-pay'); press(payB, b); draw(); }); });
    whenB.forEach(function (b) { b.addEventListener('click', function () { st.when = b.getAttribute('data-when'); press(whenB, b); draw(); }); });
  }

  /* ------------------------------------------------ the price switch */
  var pr = $('[data-price]');
  if (pr) {
    var us = $('.pr-r.us', pr), out = $('[data-out]', pr), showB = $$('[data-show]', pr), MAXP = 30000;
    var full = +us.getAttribute('data-full');
    var showPrice = function (mode) {
      var v = mode === 'today' ? split3(full)[0] : full, x = (v / MAXP).toFixed(4);
      $('.pr-l', us).style.setProperty('--x', x); $('.pr-d', us).style.setProperty('--x', x);
      var s = split3(full);
      $('[data-v]', us).innerHTML = gbp(v) + (mode === 'today' ? ' <small>today, then ' + gbp(s[1]) + ' twice</small>' : '');
      out.textContent = mode === 'today'
        ? 'The Fairytale Ball, ' + gbp(s[0]) + ' today, then ' + gbp(s[1]) + ' and ' + gbp(s[2]) + '.'
        : 'The Fairytale Ball, ' + gbp(full) + ' in full.';
      pr.setAttribute('data-mode', mode);
    };
    showB.forEach(function (b) { b.addEventListener('click', function () { press(showB, b); showPrice(b.getAttribute('data-show')); }); });
  }

  /* ------------------------------------------------ the hours, her own estimate */
  var hr = $('[data-hours]');
  if (hr) {
    var io = $('#hr-o'), im = $('#hr-m'), marks = $$('.hr-wall i', hr);
    var fmt = function (x) { var s = (Math.round(x * 10) / 10).toFixed(1); return s.replace(/\.0$/, ''); };
    var set = function (k, v) { var e = $('[data-o="' + k + '"]', hr); if (e) e.textContent = v; };
    var fill = function (el) { el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1) + '%'); };
    var calc = function () {
      var o = +io.value, m = +im.value, h = o * m / 60;
      set('o', o); set('m', m); set('h', fmt(h)); set('hu', fmt(h) === '1' ? 'hour' : 'hours'); set('g', o);
      io.setAttribute('aria-valuetext', o + ' orders'); im.setAttribute('aria-valuetext', m + (m === 1 ? ' minute' : ' minutes'));
      marks.forEach(function (i, n) { i.classList.toggle('on', n < Math.round(o / 10)); });
      fill(io); fill(im);
      hr.setAttribute('data-hours-val', h.toFixed(4));
    };
    io.addEventListener('input', calc); im.addEventListener('input', calc); calc();
  }

  /* ------------------------------------------------ the built frames follow the captions */
  var bf = $('[data-bf]');
  if (bf) {
    var caps = $$('.bc li', bf), frames = $$('.bf-i', bf), cur = -1, btick = false;
    var show = function (i) {
      if (i === cur) return; cur = i;
      caps.forEach(function (c, n) { c.classList.toggle('on', n === i); });
      frames.forEach(function (f, n) { f.classList.toggle('on', n === i); });
    };
    /* the caption whose top has passed 60% of the screen is the one being read */
    var pick = function () {
      btick = false; var line = window.innerHeight * 0.6, i = 0;
      caps.forEach(function (c, n) { if (c.getBoundingClientRect().top < line) i = n; });
      show(i);
    };
    window.addEventListener('scroll', function () { if (!btick) { btick = true; requestAnimationFrame(pick); } }, { passive: true });
    window.addEventListener('resize', pick);
    pick();
  }

  /* ------------------------------------------------ the cover arch settles as it leaves */
  var cv = $('.cv');
  if (cv && !reduce) {
    var tick = false;
    var upd = function () { tick = false; var r = cv.getBoundingClientRect(); cv.style.setProperty('--cvp', Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))).toFixed(3)); };
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }
})();
