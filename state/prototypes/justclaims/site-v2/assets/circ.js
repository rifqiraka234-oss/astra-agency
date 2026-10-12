/* extraordinary circumstances. Each Annex item opens to show the conditions in its own words, pulled from its text, and the five things an airline has to show. */
(function () {
  'use strict';
  var d = document, root = d.querySelector('[data-circ]'), dataEl = d.getElementById('clocks-data');
  if (!root || !dataEl) return;
  var Q = JSON.parse(dataEl.textContent).quotes;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var STEPS = [
    ['Name the item.', 'The airline specifies which circumstance in the Annex it invokes. If the event isn’t listed, it says which event it invokes and why it should count.', 'Art. 7(9)'],
    ['Show the causal link.', 'There has to be a direct causal link between the event and the disruption to this flight.', 'Art. 6c(2)'],
    ['Show all reasonable measures.', 'The disruption couldn’t have been avoided even if the airline had taken all reasonable measures.', 'Art. 6c(2)'],
    ['Explain it to the passenger.', 'A clear and substantiated explanation, with a concise account of the causal link and the reasonable measures.', 'Art. 7(9)'],
    ['Hold the proof.', 'The burden of proof for the causal link and the reasonable measures rests with the operating air carrier.', 'Art. 6c(2)']
  ];
  var COND = [/incompatible with the (?:scheduled and )?safe operation of the flight/, /(?:that|which) do(?:es)? not originate from [^,;]+/, /\bprovided (?:that )?[^;]*/, /\bunless [^;]*/, /beyond the actual control[^;,]*/, /not intrinsically linked[^;,]*/, /revealed by [^,;]+/, /for whom the air carrier is not responsible/];
  function conditions(txt) {
    var t = txt.replace(/\(\*\d+\)/g, '').replace(/[;.]\s*$/, ''), out = [];
    COND.forEach(function (rx) { var m = rx.exec(t); if (m && out.indexOf(m[0]) < 0) out.push(m[0]); });
    return out.filter(function (x) { return !out.some(function (y) { return y !== x && y.indexOf(x) > -1; }); });
  }
  root.querySelectorAll('.ax-item').forEach(function (b) {
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', function () {
      var li = b.parentNode, open = b.getAttribute('aria-expanded') === 'true', ex = li.querySelector('.ax-more');
      root.querySelectorAll('.ax-item[aria-expanded=true]').forEach(function (o) { o.setAttribute('aria-expanded', 'false'); var m = o.parentNode.querySelector('.ax-more'); if (m) m.remove(); });
      if (open) return;
      b.setAttribute('aria-expanded', 'true');
      var txt = b.querySelector('q').textContent, conds = conditions(txt), id = b.getAttribute('data-ax');
      var h = '<div class="ax-more">';
      if (conds.length) h += '<div class="ax-cond"><h4>Qualifying wording in Annex ' + esc(id) + '</h4><p class="small">The clauses that carry a condition. Read the whole item above, this isn’t a complete list.</p>' + conds.map(function (c) { return '<q class="law">' + esc(c) + '</q>'; }).join('') + '</div>';
      h += '<div><h4>The steps an airline takes to invoke it</h4><ol class="ax-list">' + STEPS.map(function (s) { return '<li><b>' + esc(s[0]) + '</b> ' + esc(s[1]) + ' <span class="art mono">' + esc(s[2]) + '</span></li>'; }).join('') + '</ol></div>';
      h += '<q class="law">' + esc(Q['burden-extraordinary']) + '</q></div>';
      li.insertAdjacentHTML('beforeend', h);
    });
  });
})();
