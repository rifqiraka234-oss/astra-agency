/* What every page shares. The header (over the first screen, solid once scrolled, its Order carrying the live total),
   the full screen panel a phone opens from Menu, the bar along the bottom, and the one order drawer that every Order on
   every page slides up. Also the Book links that carry a shop to the birthdays page. Exposes window.CharlieChrome. */
(function () {
  'use strict';
  var O = window.CharlieOrder, root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var page = window.CD_PAGE || 'home';

  // ---------- the live total, in the header and the bar ----------
  // On Home the builder sets the shown total as each thing lands on the dessert, so the header and the bar tick with
  // the ticket. Everywhere else it's the order's own total.
  var shownFromBuilder = false;
  function showTotal(pence, fresh) {
    $$('[data-live="total"], #bar-price').forEach(function (el) {
      el.textContent = O.money(pence);
      if (fresh && !reduced) { el.classList.remove('is-tick'); void el.offsetWidth; el.classList.add('is-tick'); }
    });
  }
  function render(o) {
    var n = $('#bar-name'); if (n) n.textContent = O.barName(o);
    if (!shownFromBuilder) showTotal(o.total, false);
  }

  // ---------- locking the page under a panel or the drawer ----------
  var locks = 0;
  function lock(on) {
    locks = Math.max(0, locks + (on ? 1 : -1));
    root.classList.toggle('is-locked', locks > 0);
    var l = window.CharlieMotion && window.CharlieMotion.lenis(); if (l) { if (locks) l.stop(); else l.start(); }
  }
  // Tab stays inside the open panel or drawer (and the header's Menu button, which closes the panel)
  function trap(boxes, e) {
    if (e.key !== 'Tab') return;
    var f = []; [].concat(boxes).forEach(function (box) { f = f.concat($$('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', box)); });
    f = f.filter(function (el) { return el.getClientRects().length; });
    if (!f.length) return; var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  // ---------- the header ----------
  function header() {
    var hd = $('#hd'); if (!hd) return;
    var solid = function () { hd.classList.toggle('is-solid', window.scrollY > 8 || root.classList.contains('is-locked')); };
    solid(); window.addEventListener('scroll', solid, { passive: true });
    // a phone's Menu opens the pages full screen, on a solid ground
    var btn = $('#hd-menu'), panel = $('#panel'), back = null;
    var set = function (open) {
      if (open === !panel.hidden) return;
      btn.setAttribute('aria-expanded', String(open)); hd.classList.toggle('is-open', open);
      if (open) { back = document.activeElement; panel.hidden = false; lock(true); requestAnimationFrame(function () { panel.classList.add('is-open'); var a = $('.panel__link', panel); if (a) a.focus(); }); }
      else { panel.classList.remove('is-open'); panel.hidden = true; lock(false); if (back && back.focus) back.focus(); }
      solid();
    };
    btn.addEventListener('click', function () { set(panel.hidden); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (!panel.hidden) { if (e.key === 'Escape') set(false); else trap([btn, panel], e); } });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) set(false); });
    // on Home, Make your own scrolls to the builder rather than reloading the page
    $$('a[href="#make"]').forEach(function (a) { a.addEventListener('click', function (e) { var t = document.getElementById('make'); if (!t) return; e.preventDefault(); set(false); go(t); }); });
  }
  function go(t) { if (window.CharlieMotion) window.CharlieMotion.scrollTo(t); else t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }

  // ---------- the drawer ----------
  var drawer, sheet, back = null;
  function openDrawer(opts) {
    if (!drawer || !drawer.hidden) return;
    back = document.activeElement;
    if (opts && opts.shop) O.set({ shop: opts.shop });
    if (window.CharlieCheckout) window.CharlieCheckout.opening();
    drawer.hidden = false; lock(true); bar(); root.classList.add('drawer-open');
    requestAnimationFrame(function () { requestAnimationFrame(function () { drawer.classList.add('is-open'); }); });
    setTimeout(function () { sheet.focus({ preventScroll: true }); }, reduced ? 0 : 60);
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open'); root.classList.remove('drawer-open');
    var done = function () { drawer.hidden = true; lock(false); bar(); if (window.CharlieCheckout) window.CharlieCheckout.closed(); if (back && back.focus) back.focus({ preventScroll: true }); };
    if (reduced) done(); else setTimeout(done, 380);
  }
  function drawerInit() {
    drawer = $('#drawer'); if (!drawer) return; sheet = $('.drawer__sheet', drawer);
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-action="order"]'); if (b && !b.closest('#drawer')) { e.preventDefault(); openDrawer({ shop: b.dataset.shop }); return; }
      if (e.target.closest('[data-close-drawer]')) closeDrawer();
    });
    document.addEventListener('keydown', function (e) { if (drawer.hidden) return; if (e.key === 'Escape') closeDrawer(); else trap(sheet, e); });
    // a drag down on the sheet's top closes it, on a phone
    var top = $('.drawer__top', drawer), y0 = null;
    top.addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; }, { passive: true });
    top.addEventListener('touchmove', function (e) { if (y0 == null) return; var d = Math.max(0, e.touches[0].clientY - y0); sheet.style.transform = d ? 'translateY(' + d + 'px)' : ''; }, { passive: true });
    top.addEventListener('touchend', function (e) { if (y0 == null) return; var d = e.changedTouches[0].clientY - y0; y0 = null; sheet.style.transform = ''; if (d > 90) closeDrawer(); });
  }

  // ---------- the bar ----------
  // It steps aside while the drawer is open, and while another Order with its own total is on screen
  var seen = new Map();
  function bar() {
    var el = $('#orderbar'); if (!el) return;
    var any = false; seen.forEach(function (v) { any = any || v; });
    el.classList.toggle('is-aside', any || (drawer && !drawer.hidden));
    // the header's Order steps aside too, so the builder's own total is the only one on that screen
    var hd = $('#hd'); if (hd) hd.classList.toggle('is-quiet', any);
  }
  function barInit() {
    var asides = $$('[data-bar-aside]'); if (!asides.length || !('IntersectionObserver' in window)) return;
    // what sits under the header can't be tapped, so it doesn't count
    var hdH = $('#hd') ? $('#hd').offsetHeight : 0;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { seen.set(e.target, e.isIntersecting && e.intersectionRatio > 0.6); }); bar(); }, { threshold: [0, 0.6, 1], rootMargin: '-' + hdH + 'px 0px 0px 0px' });
    asides.forEach(function (a) { io.observe(a); });
  }

  // ---------- Book, from any page ----------
  // a Book link with a shop on it carries the shop to the birthdays page; on that page Book goes to the form
  function book() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-book-shop]'); if (a) O.setBooking({ shop: a.dataset.bookShop });
      var b = e.target.closest('[data-action="book"]'); if (!b) return;
      var t = document.getElementById('book'); if (!t) return;
      e.preventDefault(); if (b.dataset.shop && window.CharlieParty) window.CharlieParty.pickShop(b.dataset.shop); go(t);
    });
  }

  function boot() {
    O.subscribe(render); render(O.get());
    header(); drawerInit(); barInit(); book();
    if (window.CharlieCheckout) window.CharlieCheckout.init();
    if (window.CharlieParty && document.getElementById('bform')) window.CharlieParty.init();
    if (window.CharlieParty && document.getElementById('tease-svg')) window.CharlieParty.tease();
    if (page !== 'home' && window.CharlieMenu) { window.CharlieMenu.wire(); window.CharlieMenu.pickmix(); }
    if (window.CharlieMotion) window.CharlieMotion.init();
  }
  // the page reads and prices are right without any of this. It starts once every script of the page is in
  if (window.CD_READY) boot(); else document.addEventListener('cd:ready', boot, { once: true });

  window.CharlieChrome = { openDrawer: openDrawer, closeDrawer: closeDrawer, showTotal: function (p, fresh) { shownFromBuilder = true; showTotal(p, fresh); }, bar: bar, go: go };
})();
