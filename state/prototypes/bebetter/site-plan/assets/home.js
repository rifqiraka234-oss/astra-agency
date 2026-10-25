/* Home. The drop, in days on Amsterdam's calendar. No hour anywhere, they only gave the date. On the day the button
   becomes the shop. The tee with the gym's name is kit.js, everything that moves is stage.js. */
(function () {
  var d = document, root = d.documentElement;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  function nl() { return root.lang === 'nl'; }
  var dr = $('#drop'), tag = $('[data-tag]');
  if (!dr || !tag) return;
  function today() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date()); }
  function drop() {
    var day = tag.getAttribute('data-date'), now = today();
    var n = Math.round((Date.parse(day + 'T00:00:00Z') - Date.parse(now + 'T00:00:00Z')) / 86400000);
    var when = $('[data-drop-when]', tag), live = n <= 0;
    if (n > 1) when.textContent = nl() ? 'Live over ' + n + ' dagen' : 'Live in ' + n + ' days';
    else if (n === 1) when.textContent = nl() ? 'Morgen live' : 'Live tomorrow';
    else if (n === 0) when.textContent = nl() ? 'Vandaag live' : 'Live today';
    else when.textContent = nl() ? 'Nu live' : 'Live now';
    $('[data-drop-how]', dr).hidden = live;
    $('[data-drop-go]', dr).hidden = live;
    $('[data-drop-shop]', dr).hidden = !live;
    dr.classList.toggle('live', live);
  }
  drop(); d.addEventListener('bb-lang', drop);
})();
