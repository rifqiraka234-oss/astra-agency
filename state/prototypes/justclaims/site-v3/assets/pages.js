/* inner pages. The reform board gets a row for today from the visitor's own calendar, and each row's status follows today too. */
(function () {
  'use strict';
  var d = document, J = window.JC || {}, F = window.FLAP;
  var tl = d.querySelector('[data-tl]'); if (!tl || !J.todayUTC) return;
  var today = J.todayUTC(), rows = [].slice.call(tl.querySelectorAll('.tl-r')), done = false;
  var MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], n = new Date();
  var p2 = function (x) { return (x < 10 ? '0' : '') + x; };
  function cells(t) { return t.split('').map(function (c) { var h = c === ' ' ? '&nbsp;' : c; return '<span class="fl"><span class="u"><b>' + h + '</b></span><span class="d"><b>' + h + '</b></span></span>'; }).join(''); }
  rows.forEach(function (r) {
    var t = J.utc(r.getAttribute('data-date')), st = r.querySelector('.tl-s .flaps');
    if (st && !r.classList.contains('key')) {
      var s = ((t <= today ? 'DONE' : 'DUE') + '        ').slice(0, 8);
      st.setAttribute('data-flap', s);
      if (J.reduce && F) [].forEach.call(st.querySelectorAll('.fl'), function (c, i) { F.show(c, s.charAt(i) || ' '); });
      var srs = r.querySelector('.tl-s .sr'); if (srs) srs.textContent = t <= today ? 'Done' : 'Due';
    }
    if (!done && t > today) {
      done = true;
      var dt = p2(n.getDate()) + ' ' + MON[n.getMonth()] + ' ' + String(n.getFullYear()).slice(2);
      var row = d.createElement('tr'); row.className = 'tl-r now';
      row.innerHTML = '<th scope="row"><span class="flaps dt" data-flap="' + dt + '" data-drum="a" aria-hidden="true">' + cells(dt) + '</span><span class="sr">Today</span></th>' +
        '<td class="tl-e"><b>Today.</b><span>' + Math.max(0, J.daysTo(d.body.getAttribute('data-force'))) + ' days to entry into force, ' + Math.max(0, J.daysTo(d.body.getAttribute('data-applies'))) + ' days to application.</span></td>' +
        '<td class="tl-s"><span class="flaps st" data-flap="TODAY   " data-drum="a" aria-hidden="true">' + cells('TODAY   ') + '</span><span class="sr">Today</span></td>';
      r.parentNode.insertBefore(row, r);
      if (F && !J.reduce) [].forEach.call(row.querySelectorAll('.flaps'), F.prime);
      else [].forEach.call(row.querySelectorAll('.flaps'), function (g) { g.classList.add('on'); });
    }
  });
})();
