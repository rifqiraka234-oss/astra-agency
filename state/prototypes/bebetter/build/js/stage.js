/* Home, the stage. The teddy printed one colour per pull, the year as 365 bars, the tag and the hangers on pendulums,
   the van on the road. Each scene writes classes or CSS variables only. Without .motion nothing here moves and the
   markup is already the finished picture, except the day counter, which is text and follows the scroll either way. */
(function () {
  var d = document, root = d.documentElement, motion = root.classList.contains('motion');
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var NS = 'http://www.w3.org/2000/svg';
  function nl() { return root.lang === 'nl'; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function prog(el) { var r = el.getBoundingClientRect(), span = el.offsetHeight - innerHeight; return span > 0 ? clamp(-r.top / span, 0, 1) : 0; }
  function fmtX(x) { return (x < 10 ? x.toFixed(2) : x.toFixed(1)).replace('.', nl() ? ',' : '.'); }

  /* ---------------------------------------------------------------- the day counter in the header, the page is one year */
  var dayc = $('[data-dayc] b');
  function dayCount() {
    if (!dayc) return;
    var span = d.documentElement.scrollHeight - innerHeight, p = span > 0 ? clamp(scrollY / span, 0, 1) : 0;
    var n = String(1 + Math.round(p * 364)); dayc.textContent = ('00' + n).slice(-3);
  }
  addEventListener('scroll', dayCount, { passive: true }); addEventListener('resize', dayCount); dayCount();
  if (!motion) return;

  /* ---------------------------------------------------------------- pendulums, one model for the tag, the hangers and the door */
  var pend = [];
  function Pendulum(el, k, c, max) { this.el = el; this.a = 0; this.w = 0; this.k = k; this.c = c; this.max = max; this.hold = false; this.shown = 1; pend.push(this); }
  Pendulum.prototype.kick = function (v) { this.w += v; };
  Pendulum.prototype.step = function (dt) {
    if (!this.hold) {
      this.w += (-this.k * this.a - this.c * this.w) * dt;
      this.a = clamp(this.a + this.w * dt, -this.max, this.max);
    }
    if (Math.abs(this.a - this.shown) > 0.01) { this.shown = this.a; this.el.style.setProperty('--a', this.a.toFixed(2) + 'deg'); if (this.onmove) this.onmove(this.a); }
  };

  /* ---------------------------------------------------------------- 1. the print */
  var pr = $('[data-print]'), hero = $('.pr');
  var mx = .62, my = .42, tx = .62, ty = .42;
  if (hero) {
    hero.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height; });
    hero.addEventListener('pointerleave', function () { tx = .62; ty = .42; });
  }
  var layers = [], printing = false;
  function pull() {
    if (!layers.length || printing) return;
    printing = true; pr.classList.add('printing'); pr.classList.remove('printed', 'shine');
    var sq = $('.pr-sq', pr), label = $('b', sq), PULL = 620, GAP = 170, t0 = null, W = 1748;
    layers.forEach(function (l) { l.r.setAttribute('width', 0); });
    function frame(t) {
      if (t0 === null) t0 = t;
      var e = t - t0, i = Math.floor(e / (PULL + GAP));
      if (i >= layers.length) {
        sq.classList.remove('on'); pr.classList.remove('printing'); pr.classList.add('printed'); void pr.offsetWidth; pr.classList.add('shine'); printing = false; return;
      }
      for (var j = 0; j < i; j++) { layers[j].r.setAttribute('x', 0); layers[j].r.setAttribute('width', W); }
      var l = layers[i], local = e - i * (PULL + GAP), on = local <= PULL, q = ease(clamp(local / PULL, 0, 1)), rev = i % 2 === 1;
      var edge = -0.03 + q * 1.06;
      if (rev) { l.r.setAttribute('x', Math.max(0, (1 - edge) * W)); l.r.setAttribute('width', clamp(edge, 0, 1) * W); }
      else { l.r.setAttribute('x', 0); l.r.setAttribute('width', clamp(edge, 0, 1) * W); }
      sq.classList.toggle('on', on); sq.classList.toggle('rev', rev);
      sq.style.setProperty('--sx', ((rev ? 1 - edge : edge) * 100).toFixed(2) + '%');
      sq.style.setProperty('--inkc', l.fill);
      label.textContent = (nl() ? 'DRUK ' : 'PULL ') + (i + 1) + '/' + layers.length + ' · ' + l.fill.toUpperCase();
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (pr && window.fetch && window.DOMParser) {
    var im = $('.pr-img', pr);
    fetch(im.currentSrc || im.src).then(function (r) { return r.ok ? r.text() : Promise.reject(); }).then(function (txt) {
      var doc = new DOMParser().parseFromString(txt, 'image/svg+xml'), src = doc.documentElement;
      if (!src || src.nodeName.toLowerCase() !== 'svg') return;
      var svg = d.importNode(src, true), defs = d.createElementNS(NS, 'defs');
      svg.setAttribute('class', 'pr-svg'); svg.setAttribute('role', 'img'); svg.setAttribute('focusable', 'false');
      svg.setAttribute('aria-label', im.alt);
      if (im.hasAttribute('data-nl-alt')) { svg.setAttribute('data-nl-aria-label', im.getAttribute('data-nl-alt')); svg.setAttribute('data-en-aria-label', im.getAttribute('data-en-alt') || im.alt); }
      ['sil', 't1', 't2', 't3', 't4', 'blue'].forEach(function (c, i) {
        var p = svg.querySelector('.' + c); if (!p) return;
        var cp = d.createElementNS(NS, 'clipPath'), r = d.createElementNS(NS, 'rect');
        cp.setAttribute('id', 'bb-pull-' + i); r.setAttribute('y', -20); r.setAttribute('height', 1440); r.setAttribute('x', 0); r.setAttribute('width', 0);
        cp.appendChild(r); defs.appendChild(cp); p.setAttribute('clip-path', 'url(#bb-pull-' + i + ')');
        layers.push({ r: r, fill: p.getAttribute('fill') || '#c08a52' });
      });
      svg.insertBefore(defs, svg.firstChild);
      im.parentNode.replaceChild(svg, im);
      setTimeout(pull, 380);
      pr.addEventListener('click', pull);
    }).catch(function () {});
  }

  /* ---------------------------------------------------------------- 2. the compound */
  var cp = $('[data-cp]'), cpLines = [], cpStage, cpRot = [], cpTed, cpDay, cpX, cpFlood, last = 0;
  if (cp) {
    cp.setAttribute('data-live', '');
    cpLines = $$('[data-cp-bars] line', cp); cpStage = $('.cp-stage', cp); cpRot = $$('.cp-bars, .cp-marks', cp); cpTed = $('.cp-ted', cp);
    cpDay = $('[data-cp-day]', cp); cpX = $('[data-cp-x]', cp); cpFlood = $('.cp-flood', cp);
  }
  var TOP = Math.pow(1.01, 365);
  function compound() {
    var p = prog(cp), day = 1 + Math.round(clamp((p - .03) / .75, 0, 1) * 364);
    if (day !== last) {
      var lo = Math.min(day, last), hi = Math.max(day, last);
      for (var i = Math.max(0, lo - 1); i < hi; i++) cpLines[i].classList.toggle('on', i < day);
      if (last) cpLines[last - 1].classList.remove('now');
      cpLines[day - 1].classList.add('now');
      last = day;
      var rot = 'rotate(' + (-(day - .5) / 365 * 360).toFixed(2) + ')'; cpRot.forEach(function (g) { g.setAttribute('transform', rot); });
      cpTed.style.setProperty('--ts', (0.4 + 0.6 * (Math.pow(1.01, day) - 1) / (TOP - 1)).toFixed(3));
      cpDay.textContent = day; cpX.textContent = fmtX(Math.pow(1.01, day));
    }
    $('.cp-2', cp).classList.toggle('in', day >= 30);
    $('.cp-3', cp).classList.toggle('in', day >= 365);
    var z = clamp((p - .84) / .16, 0, 1);
    cp.classList.toggle('zoom', z > .02);
    cpStage.style.setProperty('--zs', (1 + z * z * z * 26).toFixed(3));
    cpFlood.style.setProperty('--fl', clamp((p - .9) / .08, 0, 1).toFixed(3));
  }
  if (cp) d.addEventListener('bb-lang', function () { last = 0; compound(); });

  /* ---------------------------------------------------------------- 3. the tag you can swing */
  var tagEl = $('[data-tag]'), tag = null;
  if (tagEl) {
    tag = new Pendulum(tagEl, 15, 1.1, 70);
    tag.onmove = function (a) { tagEl.style.setProperty('--glint', (50 - a * 2.4).toFixed(1) + '%'); };
    var pv = null, lastA = 0, lastT = 0;
    tagEl.addEventListener('pointerdown', function (e) {
      tagEl.setPointerCapture(e.pointerId); tag.hold = true;
      var saved = tagEl.style.getPropertyValue('--a'); tagEl.style.setProperty('--a', '0deg');
      var r = tagEl.getBoundingClientRect(); pv = { x: r.left + r.width / 2, y: r.top }; tagEl.style.setProperty('--a', saved);
      lastA = tag.a; lastT = e.timeStamp;
    });
    tagEl.addEventListener('pointermove', function (e) {
      if (!tag.hold || !pv) return;
      var a = clamp(-Math.atan2(e.clientX - pv.x, Math.max(30, e.clientY - pv.y)) * 57.3, -70, 70), dt = Math.max(8, e.timeStamp - lastT) / 1000;
      tag.w = (a - lastA) / dt; tag.a = a; lastA = a; lastT = e.timeStamp;
    });
    function letGo() { tag.hold = false; tag.w = clamp(tag.w, -400, 400); pv = null; }
    tagEl.addEventListener('pointerup', letGo); tagEl.addEventListener('pointercancel', letGo);
    tagEl.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && !tag.hold) tag.kick((e.movementX || 4) * -3); });
  }

  /* ---------------------------------------------------------------- 4. the rail of hangers */
  var rail = $('[data-rail]'), hangers = [];
  if (rail) {
    hangers = $$('[data-swing]', rail).map(function (el) { return new Pendulum(el, 22, 1.5, 24); });
    var lastL = rail.scrollLeft, dragX = null, startL = 0;
    rail.addEventListener('scroll', function () {
      var dv = rail.scrollLeft - lastL; lastL = rail.scrollLeft;
      hangers.forEach(function (h, i) { h.kick(-dv * (1.6 + (i % 3) * .3)); });
    }, { passive: true });
    rail.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; dragX = e.clientX; startL = rail.scrollLeft; rail.classList.add('drag'); rail.setPointerCapture(e.pointerId); });
    rail.addEventListener('pointermove', function (e) { if (dragX !== null) rail.scrollLeft = startL - (e.clientX - dragX); });
    function stopDrag() { dragX = null; rail.classList.remove('drag'); }
    rail.addEventListener('pointerup', stopDrag); rail.addEventListener('pointercancel', stopDrag);
    hangers.forEach(function (h) { h.el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && dragX === null) h.kick((e.movementX || 3) * -2.2); }); });
  }

  /* ---------------------------------------------------------------- 5. the road */
  var rd = $('[data-road]') && $('.rd'), path, van, PL = 0, marks = [], cards = {}, clock, legs = [];
  if (rd) {
    rd.setAttribute('data-live', '');
    path = $('[data-road-path]', rd); van = $('[data-van]', rd); clock = $('[data-road-clock]', rd);
    PL = path.getTotalLength();
    rd.style.setProperty('--pl', PL.toFixed(1)); rd.style.setProperty('--po', PL.toFixed(1));
    $$('.rd-stop', rd).forEach(function (g) {
      var c = $('circle', g), x = +c.getAttribute('cx'), y = +c.getAttribute('cy'), best = 0, bd = 1e9;
      for (var s = 0; s <= 600; s++) { var pt = path.getPointAtLength(PL * s / 600), dd = (pt.x - x) * (pt.x - x) + (pt.y - y) * (pt.y - y); if (dd < bd) { bd = dd; best = PL * s / 600; } }
      marks.push({ g: g, k: g.getAttribute('data-stop-at'), at: best });
    });
    marks.sort(function (a, b) { return a.at - b.at; });
    $$('[data-card]').forEach(function (c) { cards[c.getAttribute('data-card')] = c; });
  }
  function road() {
    var p = clamp((prog(rd) - .04) / .86, 0, 1), n = marks.length - 1, unit = 1.65, u = p * n * unit, k = Math.min(n - 1, Math.floor(u / unit));
    var t = clamp((u - k * unit) / 1, 0, 1), len = marks[k].at + (marks[k + 1].at - marks[k].at) * ease(t);
    if (p >= 1) len = PL;
    rd.style.setProperty('--po', (PL - len).toFixed(1));
    var a = path.getPointAtLength(Math.max(0, len - 1)), b = path.getPointAtLength(Math.min(PL, len + 1)), pt = path.getPointAtLength(len);
    var ang = Math.atan2(b.y - a.y, b.x - a.x) * 57.3, flip = Math.abs(ang) > 90;
    van.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + (pt.y - 4).toFixed(1) + ') rotate(' + (flip ? ang + 180 : ang).toFixed(1) + ')' + (flip ? ' scale(-1.5 1.5)' : ' scale(1.5)'));
    var cur = null;
    marks.forEach(function (m) { var hit = len >= m.at - 2; m.g.classList.toggle('hit', hit); if (hit) cur = m; });
    marks.forEach(function (m) { m.g.classList.toggle('cur', m === cur); if (cards[m.k]) cards[m.k].classList.toggle('in', len >= m.at - 2); });
    var c = cur && cards[cur.k], txt = c ? $('.rd-m b', c).textContent : '2026';
    if (clock.textContent !== txt) clock.textContent = txt;
  }

  /* ---------------------------------------------------------------- 6. the door, kicked by every letter typed */
  var doorEl = $('[data-swing-door]'), door = doorEl ? new Pendulum(doorEl, 12, 1.4, 10) : null;
  var gymIn = $('#m-gym');
  if (door && gymIn) gymIn.addEventListener('input', function () { door.kick((Math.random() < .5 ? -1 : 1) * (20 + Math.random() * 16)); });

  /* footer wordmark rises in */
  var foot = $('.foot-bigwm');
  function footRise() { if (!foot) return; var r = foot.parentNode.getBoundingClientRect(), p = clamp((innerHeight - r.top) / (r.height + 120), 0, 1); foot.style.setProperty('--fy', ((1 - ease(p)) * 60).toFixed(1) + '%'); }

  /* ---------------------------------------------------------------- one loop */
  var vis = new Map(), io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { vis.set(e.target, e.isIntersecting); }); }, { rootMargin: '100px' }) : null;
  [hero, cp, rd, tagEl, rail, doorEl, foot && foot.parentNode].forEach(function (el) { if (el) { vis.set(el, true); if (io) io.observe(el); } });
  var lastY = scrollY, lastF = 0, dirty = true;
  addEventListener('scroll', function () { dirty = true; }, { passive: true });
  addEventListener('resize', function () { dirty = true; if (rd) { PL = path.getTotalLength(); } });
  function loop(t) {
    var dt = lastF ? Math.min(.034, (t - lastF) / 1000) : .016; lastF = t;
    var vy = scrollY - lastY; lastY = scrollY;
    if (hero && vis.get(hero)) {
      mx += (tx - mx) * .07; my += (ty - my) * .07;
      hero.style.setProperty('--mx', mx.toFixed(4)); hero.style.setProperty('--my', my.toFixed(4));
      if (pr && pr.classList.contains('printed')) pr.style.setProperty('--gx', clamp(mx, 0, 1).toFixed(3));
    }
    if (dirty) {
      dirty = false;
      if (cp) compound();
      if (rd) road();
      footRise();
    }
    if (vy) {
      if (tag && vis.get(tagEl)) tag.kick(clamp(vy, -60, 60) * -.9);
      if (door && vis.get(doorEl)) door.kick(clamp(vy, -60, 60) * .25);
      hangers.forEach(function (h, i) { h.kick(clamp(vy, -60, 60) * (i % 2 ? .45 : -.45)); });
    }
    pend.forEach(function (p) { if (vis.get(p.el) !== false || p.el.closest('[data-rail]')) p.step(dt); });
    requestAnimationFrame(loop);
  }
  if (cp) compound();
  if (rd) road();
  requestAnimationFrame(loop);
})();
