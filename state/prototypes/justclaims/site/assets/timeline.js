/* the reform timeline. Marks the entries already past and inserts a "today" row from the visitor's own calendar. */
(function () {
  'use strict';
  var d = document, J = window.JC || {}, tl = d.querySelector('[data-tl]'); if (!tl || !J.todayUTC) return;
  var today = J.todayUTC(), items = [].slice.call(tl.children), inserted = false;
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], n = new Date();
  items.forEach(function (li) {
    var t = J.utc(li.getAttribute('data-date'));
    if (t <= today) li.classList.add('past');
    if (!inserted && t > today) {
      var row = d.createElement('li'); row.className = 'now';
      row.innerHTML = '<span class="mono tl-d">' + n.getDate() + ' ' + MON[n.getMonth()] + ' ' + n.getFullYear() + '</span><span class="tl-t"><b>Today.</b>' + J.daysTo(d.body.getAttribute('data-force')) + ' days to entry into force, ' + J.daysTo(d.body.getAttribute('data-applies')) + ' days to application.</span>';
      tl.insertBefore(row, li); inserted = true;
    }
  });
})();
