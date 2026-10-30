/* Home. Wires every control to the one order, and every display to it: the bases in the hero and the builder, the
   sizes, sauces, scoops and toppings, the favourites and their world, the stage and its ticket. The header, the bar
   and the drawer are js/chrome.js, the same on every page. */
(function () {
  'use strict';
  var O = window.CharlieOrder, B = window.CharlieBuilder, H = window.CharlieHeroPage;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---------- displays, all read from the order ----------
  function render(o) {
    $('#step-total').textContent = O.money(o.total);
    $$('.base, .minibase').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.base === o.base)); });
    $$('.sauce').forEach(function (b) { b.setAttribute('aria-pressed', String(o.creation && o.sauces.indexOf(b.dataset.sauce) >= 0)); });
    var b = O.BASES[o.base], incl = !!b.toppingsIncluded;
    $$('.topping[data-topping]').forEach(function (t) { t.setAttribute('aria-pressed', String(o.creation && o.toppings.indexOf(t.dataset.topping) >= 0)); var pr = $('.topping__price', t); pr.textContent = incl ? 'Included' : pr.dataset.price; });
    $('#top-sub').textContent = incl ? 'Unlimited standard toppings come with frozen yoghurt, and Charlie’s says which count as standard' : 'They rain down and land where they land';
    // a scoop only goes on a waffle, a crepe or cookie dough, and frozen yoghurt comes in three sizes
    $$('[data-extra]').forEach(function (e) { e.hidden = !b.extras; e.setAttribute('aria-pressed', String(o.extras.indexOf(e.dataset.extra) >= 0)); });
    $('#sizes-wrap').hidden = !b.sizes;
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
    $$('.topping[data-topping]').forEach(function (btn) {
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
    window.CharlieMenu.wire({
      preset: function () { H.setBase(O.get().base); B.applyOrder(true); },
      base: function (patch) { chooseBase(patch); },
      topping: function (name) { if (O.get().toppings.indexOf(name) < 0 && O.toggle('toppings', name)) B.addTopping(name); }
    });
    // a wheel over a row that scrolls sideways moves it sideways, on a desktop
    $$('.mrow, .favs__track').forEach(function (row) {
      row.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || row.scrollWidth <= row.clientWidth + 2) return;
        var max = row.scrollWidth - row.clientWidth, to = row.scrollLeft + e.deltaY;
        if ((e.deltaY < 0 && row.scrollLeft <= 0) || (e.deltaY > 0 && row.scrollLeft >= max - 1)) return;
        e.preventDefault(); row.scrollLeft = Math.max(0, Math.min(max, to));
      }, { passive: false });
    });
  }

  // each topping button shows a small heap of the real thing, in the same candy style as the ones that fall
  function heaps() {
    var list = $$('.topping[data-topping]').map(function (b) { return { name: b.dataset.topping, canvas: $('canvas', b) }; });
    list.forEach(function (it) { window.CharlieToppings.heap(it.canvas, it.name, 72, 56); });
    // then the same heaps in 3D, once three.js is in
    H.loadThree().then(function () { if (window.CharlieToppings3D) window.CharlieToppings3D.heaps(list); }).catch(function () {});
  }

  function boot() {
    O.subscribe(function (o) { render(o); });
    // the price in the header and the bar is the ticket's: it ticks when something lands on the dessert
    B.init({ onTicket: function (pence, fresh) { window.CharlieChrome.showTotal(pence, fresh); } });
    wire(); render(O.get());
    H.init();
    // a favourite chosen on the menu page arrives here dressed, and plays in once the stage is ready
    var play = false; try { play = sessionStorage.getItem('charlies-play') === '1'; sessionStorage.removeItem('charlies-play'); } catch (e) { play = false; }
    // the builder's WebGL and the toppings' 3D start once the visitor heads for them (the first scroll, or a jump to the
    // builder), so the first screen stays light. The dive gives them a screen to get ready in
    var go = function () {
      var started = false, idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1); };
      var startB = function () {
        if (started) return; started = true; window.removeEventListener('scroll', onScroll);
        idle(function () { B.start().then(function () { if (play) { play = false; B.applyOrder(true); } idle(heaps, { timeout: 1500 }); }); }, { timeout: 500 });
      };
      var onScroll = function () { if (window.scrollY > 24) startB(); };
      if (location.hash === '#make' || play || !('IntersectionObserver' in window)) return startB();
      window.addEventListener('scroll', onScroll, { passive: true });
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); startB(); } });
      io.observe(document.getElementById('make'));
    };
    if (document.readyState === 'complete') setTimeout(go, 0); else window.addEventListener('load', function () { setTimeout(go, 0); });
  }
  if (window.CD_READY) boot(); else document.addEventListener('cd:ready', boot, { once: true });
})();
