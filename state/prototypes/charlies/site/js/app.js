/* Wires every control to the one order, and every display to it: the bases in the hero and the builder, the
   favourites and the menu, sauces, toppings, extras, sizes and how many, the stage, the ticket, the bar, the
   golden ticket and the booking. */
(function () {
  'use strict';
  var O = window.CharlieOrder, B = window.CharlieBuilder, H = window.CharlieHeroPage;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---------- displays, all read from the order ----------
  function render(o) {
    $('#bar-name').textContent = O.barName(o);
    $('#step-total').textContent = O.money(o.total);
    $('#qty').textContent = o.qty;
    $$('.base, .minibase').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.base === o.base)); });
    $$('.sauce').forEach(function (b) { b.setAttribute('aria-pressed', String(o.creation && o.sauces.indexOf(b.dataset.sauce) >= 0)); });
    var incl = !!O.BASES[o.base].toppingsIncluded;
    $$('.topping').forEach(function (b) { b.setAttribute('aria-pressed', String(o.creation && o.toppings.indexOf(b.dataset.topping) >= 0)); var pr = $('.topping__price', b); pr.textContent = incl ? 'Included' : pr.dataset.price; });
    $('#top-sub').textContent = incl ? 'Unlimited standard toppings come with frozen yoghurt. Charlie’s says which count as standard.' : 'All nineteen toppings on our menu, from £1.00. They rain down and land where they land.';
    var b = O.BASES[o.base];
    $('#extras-wrap').hidden = !b.extras; $('#sizes-wrap').hidden = !b.sizes; $('#extras-none').hidden = !!(b.extras || b.sizes);
    $$('[data-extra]').forEach(function (e) { e.setAttribute('aria-pressed', String(o.extras.indexOf(e.dataset.extra) >= 0)); });
    $$('[data-size]').forEach(function (e) { e.setAttribute('aria-pressed', String(e.dataset.size === o.size)); });
    B.renderTicket();
  }

  // a base from anywhere: the hero's hat swaps, the builder's stage swaps
  function chooseBase(patch) {
    var o = O.get(), same = patch.base === o.base && !o.preset && o.creation;
    if (same && !patch.size) { H.setBase(patch.base); return; }
    // what's on it so far stays on, at list price, on the new base
    O.set(Object.assign({ creation: true }, patch), { base: true });
    H.setBase(patch.base); B.setBase(patch.base);
  }

  // ---------- controls, each writes the order ----------
  function wire() {
    $$('.base, .minibase').forEach(function (btn) { btn.addEventListener('click', function () { chooseBase({ base: btn.dataset.base }); }); });
    $$('.sauce').forEach(function (btn) {
      btn.addEventListener('click', function () { var name = btn.dataset.sauce; if (O.toggle('sauces', name)) B.addSauce(name); else B.removeSauce(name); });
    });
    $$('.topping').forEach(function (btn) {
      btn.addEventListener('click', function () { var name = btn.dataset.topping; if (O.toggle('toppings', name)) B.addTopping(name); else B.removeTopping(name); });
    });
    $$('[data-extra]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var e = btn.dataset.extra, on = O.get().extras.indexOf(e) < 0;
        // the menu offers a scoop of vanilla or whippy, so choosing one swaps the other out
        O.set({ extras: on ? [e] : [], creation: true });
        ['vanilla', 'whippy'].forEach(function (x) { B.setExtra(x, on && x === e); });
      });
    });
    $$('[data-size]').forEach(function (btn) { btn.addEventListener('click', function () { O.set({ size: btn.dataset.size }); }); });
    $('#qty-minus').addEventListener('click', function () { O.set({ qty: O.get().qty - 1 }); });
    $('#qty-plus').addEventListener('click', function () { O.set({ qty: O.get().qty + 1 }); });
    window.CharlieMenu.wire(
      function () { H.setBase(O.get().base); B.applyOrder(true); },
      function (patch) { chooseBase(patch); },
      function (name) { if (O.get().toppings.indexOf(name) < 0 && O.toggle('toppings', name)) B.addTopping(name); }
    );
  }

  // the bar steps aside only while another Order button or the order form is on screen
  function barAside() {
    var bar = $('#orderbar'), seen = new Map();
    if (!('IntersectionObserver' in window)) return;
    var cb = function (es) {
      es.forEach(function (e) { seen.set(e.target, e.isIntersecting && e.intersectionRatio > 0.6); });
      var any = false; seen.forEach(function (v) { any = any || v; }); bar.classList.toggle('is-aside', any);
    };
    // on a phone the builder's own Order button only counts once it's below the sticky stage, where it can be tapped
    var stageTop = window.matchMedia('(max-width: 1023.98px)').matches ? '-52% 0px 0px 0px' : '0px';
    new IntersectionObserver(cb, { threshold: [0, 0.6, 1], rootMargin: stageTop }).observe($('#order-final'));
    new IntersectionObserver(cb, { threshold: [0, 0.6, 1] }).observe($('#place-order'));
  }

  // each topping button shows a small heap of the real thing, in the same candy style as the ones that fall
  function heaps() {
    var list = $$('.topping').map(function (b) { return { name: b.dataset.topping, canvas: $('canvas', b) }; });
    list.forEach(function (it) { window.CharlieToppings.heap(it.canvas, it.name, 72, 56); });
    // then the same heaps in 3D, once three.js is in
    H.loadThree().then(function () { if (window.CharlieToppings3D) window.CharlieToppings3D.heaps(list); }).catch(function () {});
  }

  // the page reads and prices are right without any of this, so it all waits for the first paint
  function boot() {
  O.subscribe(function (o) { render(o); });
  // the bar's price is the ticket's: it ticks when something lands on the dessert
  B.init({ onTicket: function (pence, fresh) {
    var el = $('#bar-price'); el.textContent = O.money(pence);
    if (fresh) { el.classList.remove('is-tick'); void el.offsetWidth; el.classList.add('is-tick'); }
  } });
  wire(); render(O.get()); barAside();
  window.CharlieCheckout.init(); window.CharlieParty.init();
  H.init(); window.CharlieMotion.init();
  // the builder's WebGL starts a screen before it's needed, so the first screen stays light
  var go = function () {
    window.CharlieMenu.pickmix();
    var started = false, startB = function () { if (started) return; started = true; heaps(); B.start(); };
    if (!('IntersectionObserver' in window)) return startB();
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); startB(); } }, { rootMargin: '50% 0px 50% 0px' });
    io.observe(document.getElementById('make'));
  };
  if (document.readyState === 'complete') setTimeout(go, 0); else window.addEventListener('load', function () { setTimeout(go, 0); });
  }
  requestAnimationFrame(function () { setTimeout(boot, 0); });
})();
