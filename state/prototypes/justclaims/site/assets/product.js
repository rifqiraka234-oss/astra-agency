/* the platform screens. Tabs swap the screenshot, pins and notes highlight each other. */
(function () {
  'use strict';
  var d = document, root = d.querySelector('[data-prod]'); if (!root) return;
  var tabs = [].slice.call(root.querySelectorAll('[data-t]')), panels = [].slice.call(root.querySelectorAll('[data-p]'));
  function pick(i) {
    tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-t') == i ? 'true' : 'false'); });
    panels.forEach(function (p) { p.hidden = p.getAttribute('data-p') != i; });
    var p = panels[i]; focus(p, '1');
  }
  function focus(p, n) {
    [].forEach.call(p.querySelectorAll('.pin'), function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-n') === n ? 'true' : 'false'); });
    [].forEach.call(p.querySelectorAll('.notes li'), function (x) { x.classList.toggle('on', x.getAttribute('data-n') === n); });
    var pin = p.querySelector('.pin[data-n="' + n + '"]'), box = p.querySelector('.hl'), img = p.querySelector('.shot-img');
    if (pin && box && img && pin.getAttribute('data-rect')) {
      var r = pin.getAttribute('data-rect').split(' ').map(Number), W = +img.getAttribute('data-w'), H = +img.getAttribute('data-h');
      box.style.left = (r[0] / W * 100) + '%'; box.style.top = (r[1] / H * 100) + '%'; box.style.width = (r[2] / W * 100) + '%'; box.style.height = (r[3] / H * 100) + '%'; box.classList.add('on');
    }
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { pick(t.getAttribute('data-t')); }); });
  panels.forEach(function (p) {
    [].forEach.call(p.querySelectorAll('.pin'), function (x) { x.addEventListener('click', function () { focus(p, x.getAttribute('data-n')); }); });
    [].forEach.call(p.querySelectorAll('.notes li'), function (x) { x.addEventListener('click', function () { focus(p, x.getAttribute('data-n')); }); });
  });
  pick(0);
})();
