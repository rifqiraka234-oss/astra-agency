/* the claim clock. Date arithmetic on the visitor's own inputs, from Art. 6(4), 7(1), 7(2), 7(4) and 7(9) of Regulation (EC) 261/2004 as amended. Nothing is sent anywhere. */
(function () {
  'use strict';
  var d = document;
  var root = d.querySelector('[data-calc]'); if (!root) return;
  var $ = function (s) { return root.querySelector(s); };
  var dep = $('#cc-dep'), arr = $('#cc-arr'), delay = $('#cc-delay'), dout = $('#cc-delay-o'), file = $('#cc-file'), out = $('[data-out]');
  var fileTouched = false;
  var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function parseDate(s) { var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return p ? new Date(+p[1], +p[2] - 1, +p[3]) : null; }
  function parseDT(s) { var p = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(s || ''); return p ? new Date(+p[1], +p[2] - 1, +p[3], +p[4], +p[5]) : null; }
  function fmtD(dt) { return DOW[dt.getDay()].slice(0, 3) + ' ' + dt.getDate() + ' ' + MON[dt.getMonth()] + ' ' + dt.getFullYear(); }
  function fmtT(dt) { return pad(dt.getHours()) + '.' + pad(dt.getMinutes()); }
  function addDays(dt, n) { var x = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n); return x; }
  function addMonths(dt, n) { var y = dt.getFullYear(), m = dt.getMonth() + n, dd = dt.getDate(); var last = new Date(y, m + 1, 0).getDate(); return new Date(y, m, Math.min(dd, last)); }
  function dhm(ms) { var min = Math.round(ms / 60000), dd = Math.floor(min / 1440), hh = Math.floor((min % 1440) / 60), mm = min % 60; return pad(dd) + 'd ' + pad(hh) + 'h ' + pad(mm) + 'min'; }
  function hm(min) { return Math.floor(min / 60) + ' h ' + pad(min % 60) + ' min'; }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  function run() {
    var D = parseDate(dep.value), A = parseDT(arr.value), mins = +delay.value;
    dout.textContent = hm(mins);
    if (!D || !A) { out.innerHTML = '<p class="co-note">Enter the date of departure and the scheduled arrival.</p>'; return; }
    var end = new Date(A.getTime() + mins * 60000);
    if (end < D) { out.innerHTML = '<p class="co-note">The journey cannot end before the day it departs.</p>'; return; }
    var band = (root.querySelector('input[name=cc-dist]:checked') || {}).value || '400';
    var amt = band === '250' ? 250 : band === '600' ? 600 : 400;
    var right = mins > 180;
    var F = parseDate(file.value);
    if (!fileTouched) { F = addDays(new Date(end.getFullYear(), end.getMonth(), end.getDate()), 12); file.value = F.getFullYear() + '-' + pad(F.getMonth() + 1) + '-' + pad(F.getDate()); }
    var html = '';
    html += '<div class="co-head"><span class="mono lab">Right to compensation on request, Art. 6(4)</span>';
    if (right) {
      html += '<span class="co-amt">EUR ' + amt + '</span><p class="co-why">A delay at arrival of ' + hm(mins) + ' is more than three hours.' + (band === '600' && mins <= 240 ? ' Art. 7(2) lets the airline reduce this band by 50 percent when arrival is no more than four hours late and rerouting at a later time was offered, or the journey arrived late.' : '') + '</p>';
    } else {
      html += '<span class="co-amt no">None</span><p class="co-why">A delay at arrival of ' + hm(mins) + ' doesn’t exceed three hours, so Art. 6(4) gives no right to compensation and Art. 7(4) triggers no 96 hour notice. The dates below are shown for reference.</p>';
    }
    html += '</div>';
    var t0 = end.getTime(), n96 = new Date(t0 + 96 * 3600e3), close9 = addMonths(D, 9), reply = F ? addDays(F, 30) : null;
    var inWin = F && F <= close9 && F >= D;
    var cls = right ? '' : ' off-grey';
    function row(off, what, sub, when, dl) { return '<div class="cr' + (dl ? ' dl' : '') + cls + '"><span class="off">' + esc(off) + '</span><span class="what"><b>' + what + '</b><span>' + sub + '</span></span><span class="when">' + when + '</span></div>'; }
    html += '<div class="co-rows">';
    html += row('00d 00h 00min', 'The journey ends', 'Taken as the scheduled arrival plus the delay. Time of arrival is on block time, Art. 2(x).', fmtD(end) + ', ' + fmtT(end), false);
    html += row(dhm(n96 - end), 'The 96 hour notice is due', 'The right to compensation and clear instructions, electronically, on a durable medium, with date and time. Art. 7(4) and Art. 14(7).', fmtD(n96) + ', ' + fmtT(n96), true);
    if (F) {
      var off1 = new Date(F.getFullYear(), F.getMonth(), F.getDate(), 0, 0) - new Date(end.getFullYear(), end.getMonth(), end.getDate());
      html += row('+' + Math.round(Math.max(0, off1) / 864e5) + ' days', 'The passenger files', inWin ? 'Inside the nine month window. The airline acknowledges at once, on a durable medium. Art. 7(9).' : (F < D ? 'This date is before the flight.' : 'After the nine month window, Art. 7(9) closes on ' + fmtD(close9) + '.'), fmtD(F), false);
      html += row('+30 calendar days', 'Pay or justify by the end of', 'Either the compensation or a justification. If an extraordinary circumstance is invoked, name the Annex item and explain it. Art. 7(9), Art. 6c.', fmtD(reply), true);
    }
    html += row('+' + Math.round((close9 - new Date(end.getFullYear(), end.getMonth(), end.getDate())) / 864e5) + ' days', 'The window to file closes', 'Nine months from the date of departure. The regulation doesn’t say how to count months, so this tool uses calendar months. Art. 7(9).', fmtD(close9), true);
    var cw = F ? new Date(Math.max(addMonths(D, 12).getTime(), addMonths(F, 3).getTime())) : addMonths(D, 12);
    html += row('', 'The complaint window closes', '12 months from the flight, or three months after the request, whichever is later. Art. 15a(2).', fmtD(cw), false);
    html += '</div>';
    // a linear bar from the end of the journey to the complaint window
    var span = Math.max(1, cw.getTime() - t0), pts = [['End', t0, false], ['96 h', n96.getTime(), true]];
    if (F) { pts.push(['Files', F.getTime(), false]); pts.push(['+30 d', reply.getTime(), true]); }
    pts.push(['9 mo', close9.getTime(), true]);
    var bar = '<div class="co-bar" aria-hidden="true"><i class="ln"></i>';
    pts.forEach(function (p, i) { var x = Math.min(98, Math.max(2, Math.pow(Math.max(0, p[1] - t0) / span, .42) * 100)); bar += '<i class="pt' + (p[2] ? ' dl' : '') + '" style="left:' + x + '%"></i><span class="pl' + (i % 2 ? ' low' : '') + '" style="left:' + x + '%">' + p[0] + '</span>'; });
    bar += '</div>';
    html += bar + '<p class="hint mono">The bar compresses time so the early dates stay readable.</p>';
    html += '<div class="co-note"><p><b>Counting.</b> The regulation doesn’t say whether the day a request arrives counts. This tool counts it as day 0, so the 30th day is the date of receipt plus 30 calendar days, to the end of that day. It counts months as calendar months too. Check the counting with counsel before relying on it.</p>' +
      '<p><b>Scope.</b> A worked example of the rules for a delay at arrival, not legal advice. Rescheduled flights and missed connections are measured differently, Art. 2(o) and Art. 6b(3). The rules apply from 23 October 2027.</p></div>';
    out.innerHTML = html;
  }
  [dep, arr, delay].forEach(function (e) { e.addEventListener('input', run); });
  file.addEventListener('input', function () { fileTouched = true; run(); });
  root.querySelectorAll('input[name=cc-dist]').forEach(function (e) { e.addEventListener('change', run); });
  run();
})();
