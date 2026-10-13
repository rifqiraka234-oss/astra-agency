/* the request form. A readiness check result in the address (?ready=ypn...) is carried into the message. */
(function () {
  'use strict';
  var d = document, msg = d.getElementById('d-msg'); if (!msg) return;
  var m = /[?&]ready=([ypnu\-]{10})/.exec(location.search); if (!m) return;
  var T = ['The 96 hour notice', 'Durable medium, date and time', 'Proof of the notice', 'No account or app', 'Acknowledging a request', 'Pay or justify in 30 days', 'Extraordinary circumstances', 'Form of payment', 'Third party mandates', 'Complaints'];
  var L = { y: 'Yes', p: 'Partly', n: 'No', u: 'Not sure' }, a = m[1].split(''), gaps = [], yes = 0;
  a.forEach(function (c, i) { if (c === 'y') yes++; else if (L[c]) gaps.push(T[i] + ' (' + L[c] + ')'); });
  msg.value = 'From the readiness check, ' + yes + ' of 10 answered Yes. ' + (gaps.length ? 'To go through ' + gaps.join(', ') + '.' : 'I’d like to check the answers with you.') + '\n\n';
  d.getElementById('d-int').value = 'The new rules and my claims process';
})();
