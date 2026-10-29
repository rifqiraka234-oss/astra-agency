/* The plan's controls. One order travels its route, the listed fees move with the sliders and with the bar itself,
   the rail's tickets open, the hat walks the six weeks, and the cost ticket's foil catches the light. Every figure
   is worked out from plan.json (copied into the page) by js/fees.js. */
(function () {
  'use strict';
  var P = JSON.parse(document.getElementById('plan-data').textContent), F = window.CharlieFees;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---------- where one order goes ----------
  var which = 'today', sending = 0;
  function showRoute(k) {
    which = k; $$('.seg[data-route]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.route === k)); });
    $$('.path').forEach(function (p) { p.hidden = p.dataset.path !== k; });
    $$('.node').forEach(function (n) { n.classList.remove('is-lit'); });
  }
  function send() {
    var nodes = $$('.path[data-path="' + which + '"] .node'), t = $('#route-ticket'), map = $('#route-map'), id = ++sending;
    nodes.forEach(function (n) { n.classList.remove('is-lit'); });
    var step = function (i) {
      if (id !== sending || i >= nodes.length) return;
      var r = nodes[i].querySelector('.node__n').getBoundingClientRect(), m = map.getBoundingClientRect();
      t.style.opacity = 1; t.style.transform = 'translate(' + (r.left - m.left + r.width / 2 - 7).toFixed(0) + 'px,' + (r.top - m.top - 30).toFixed(0) + 'px) rotate(' + (i % 2 ? 6 : -6) + 'deg)';
      nodes[i].classList.add('is-lit');
      setTimeout(function () { step(i + 1); }, reduced ? 0 : 620);
    };
    t.style.transition = reduced ? 'none' : 'transform .55s cubic-bezier(.3,1.45,.5,1), opacity .3s';
    step(0);
  }

  // ---------- the listed fees ----------
  var inO = $('#in-orders'), inA = $('#in-aov'), inS = $('#in-share');
  function fees() {
    var o = +inO.value, a = +inA.value, s = +inS.value, r = F.fees(P, o, a, s);
    $('#v-orders').textContent = o; $('#v-aov').textContent = '£' + a; $('#v-share').textContent = Math.round(s * 100) + '%';
    $('#fee-year').textContent = F.gbp(r.total);
    $('#r-dval').textContent = F.gbp(r.dval); $('#r-cval').textContent = F.gbp(r.cval); $('#r-dfee').textContent = F.gbp(r.dfee); $('#r-cfee').textContent = F.gbp(r.cfee);
    // the bar: the whole width is the year's fees, split where the delivered share of them ends
    var dShare = r.total > 0 ? r.dfee / r.total : 0;
    $('#bar-d').style.flexBasis = (dShare * 100).toFixed(2) + '%'; $('#bar-c').style.flexBasis = ((1 - dShare) * 100).toFixed(2) + '%';
    $('#bar-handle').style.left = (dShare * 100).toFixed(2) + '%';
    var fy = $('#fee-year'); fy.dataset.pence = Math.round(r.total * 100);
  }
  // dragging the bar's handle sets the delivered share of the orders, so the graph is a control too
  function dragBar() {
    var bar = $('#fee-bar'), drag = false;
    var at = function (x) {
      var b = bar.getBoundingClientRect(), u = Math.max(0, Math.min(1, (x - b.left) / b.width)), f = P.uber_fees;
      // u is the delivered share of the fees; turn it back into the delivered share of the orders
      var s = u >= 1 ? 1 : (u * f.pickup) / (f.delivery - u * (f.delivery - f.pickup));
      inS.value = Math.round(s / 0.05) * 0.05; fees();
    };
    bar.addEventListener('pointerdown', function (e) { drag = true; bar.setPointerCapture(e.pointerId); at(e.clientX); });
    bar.addEventListener('pointermove', function (e) { if (drag) at(e.clientX); });
    bar.addEventListener('pointerup', function () { drag = false; });
  }

  // ---------- the rail ----------
  function rail() { $$('.rt').forEach(function (t) { t.addEventListener('click', function () { var on = t.getAttribute('aria-expanded') !== 'true'; t.setAttribute('aria-expanded', String(on)); }); }); }

  // ---------- six weeks ----------
  function weeks() {
    var wks = $$('.wk'), hat = $('#tl-hat'), track = $('#tl-track'), read = $('#tl-read');
    var go = function (w) {
      w = Math.max(1, Math.min(6, w)); var el = wks[w - 1];
      wks.forEach(function (x) { x.classList.toggle('is-on', x === el); });
      var r = el.getBoundingClientRect(), t = track.getBoundingClientRect();
      hat.style.left = (r.left - t.left + r.width / 2) + 'px';
      read.textContent = 'Week ' + w + '. ' + el.dataset.what;
    };
    wks.forEach(function (b) { b.addEventListener('click', function () { go(+b.dataset.week); }); });
    var drag = false;
    hat.addEventListener('pointerdown', function (e) { drag = true; hat.setPointerCapture(e.pointerId); });
    hat.addEventListener('pointermove', function (e) { if (!drag) return; var t = track.getBoundingClientRect(); go(Math.ceil((e.clientX - t.left) / t.width * 6)); });
    hat.addEventListener('pointerup', function () { drag = false; });
    window.addEventListener('resize', function () { var on = wks.findIndex(function (x) { return x.classList.contains('is-on'); }); go(on + 1 || 1); });
    go(1);
  }

  // ---------- the cost ticket's foil ----------
  function foil() {
    if (reduced) return; var t = $('.cost__ticket');
    t.addEventListener('pointermove', function (e) { var r = t.getBoundingClientRect(); t.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); t.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%'); });
  }

  // ---------- reveals, as each part comes on screen ----------
  function reveals() {
    if (reduced || !('IntersectionObserver' in window)) return;
    var els = $$('.ch__h, .ch__sub, .shot, .frame, .found__i, .node, .person, .team__us, .cost__ticket, .next');
    els.forEach(function (e) { e.classList.add('rv'); });
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  $$('.seg[data-route]').forEach(function (b) { b.addEventListener('click', function () { showRoute(b.dataset.route); send(); }); });
  $('#route-send').addEventListener('click', send);
  [inO, inA, inS].forEach(function (i) { i.addEventListener('input', fees); });
  fees(); dragBar(); rail(); weeks(); foil(); reveals();
  window.CharliePlan = { fees: fees, plan: P };
})();
