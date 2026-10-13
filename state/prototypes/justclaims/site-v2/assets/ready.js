/* readiness check. Ten answers to a ring of ten segments and a short list of what to look at again. Nothing leaves the page. */
(function () {
  'use strict';
  var d = document, root = d.querySelector('[data-ready]'); if (!root) return;
  var qs = [].slice.call(root.querySelectorAll('.rq')), big = root.querySelector('[data-big]'), sum = root.querySelector('[data-sum]');
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function update() {
    var ans = qs.map(function (q) { var c = q.querySelector('input:checked'); return c ? c.value : ''; });
    ans.forEach(function (a, i) { var w = root.querySelector('.wd[data-i="' + (i + 1) + '"]'); w.setAttribute('class', 'wd' + (a ? ' ' + a : '')); });
    var yes = ans.filter(function (a) { return a === 'y'; }).length, done = ans.filter(Boolean).length;
    big.textContent = yes + ' of 10';
    if (!done) { sum.innerHTML = '<p class="co-why">Answer the questions to fill the ring.</p>'; return; }
    var gaps = [], code = '';
    ans.forEach(function (a, i) { code += a || '-'; if (a && a !== 'y') gaps.push(i); });
    var h = '<p class="co-why">' + done + ' of 10 answered. ' + (gaps.length ? 'Look again at these.' : 'Everything answered so far is a Yes.') + '</p>';
    gaps.forEach(function (i) {
      var q = qs[i], lab = { p: 'Partly', n: 'No', u: 'Not sure' }[ans[i]];
      h += '<div class="rgap ' + ans[i] + '"><b>' + esc(q.getAttribute('data-topic')) + '</b><span>' + lab + '. ' + esc(q.getAttribute('data-art')) + '</span><a href="' + esc(q.getAttribute('data-href')) + '">Read what the rule says</a></div>';
    });
    if (done === 10) h += '<p><a class="b pri sm" href="request-a-demo.html?ready=' + encodeURIComponent(code) + '">' + (gaps.length ? 'Go through the gaps with the team' : 'Check the answers with the team') + '</a></p>';
    sum.innerHTML = h;
  }
  qs.forEach(function (q) { q.addEventListener('change', update); });
  update();
})();
