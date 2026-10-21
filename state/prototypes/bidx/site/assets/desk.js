/* BidX outreach desk. Every view is already in the HTML. This script switches views, selects founders,
   approves and skips, books calls from the inbox, filters, and runs the planner. */
(function () {
  var d = document;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var toastEl = $('.toast'), toastT;
  var toast = function (m) { if (!toastEl) return; toastEl.textContent = m; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2200); };

  /* ---------------------------------------------------------------- today's date and live countdowns */
  var now = new Date();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $$('.today-date').forEach(function (e) { e.textContent = days[now.getDay()] + ' ' + now.getDate() + ' ' + months[now.getMonth()]; });
  $$('[data-close]').forEach(function (el) {
    var c = new Date(el.getAttribute('data-close'));
    var n = c <= now ? -1 : Math.ceil((c - now) / 86400000);
    var out = $('.dl-n', el), u = $('.dl-u', el);
    if (!out) return;
    out.textContent = n < 0 ? 'SHUT' : String(n).padStart(2, '0');
    if (u) u.textContent = n === 1 ? 'day' : 'days';
    if (n < 0) { var tr = el.closest('#v-calls tr'); if (tr) tr.hidden = true; }
  });
  $$('[data-live-count]').forEach(function (e) {
    e.textContent = e.getAttribute('data-live-count').split(',').filter(function (x) { return new Date(x) > now; }).length;
  });

  /* ---------------------------------------------------------------- views */
  var navs = $$('.vnav button');
  var show = function (id, push) {
    $$('.view').forEach(function (v) { v.classList.toggle('on', v.id === id); });
    navs.forEach(function (b) { b.setAttribute('aria-current', b.getAttribute('data-view') === id ? 'true' : 'false'); });
    var t = $('#' + id); if (t) { var h = t.getAttribute('data-title'); if (h) $('.bar h1').textContent = h; }
    if (push !== false) history.replaceState(null, '', '#' + id.replace('v-', ''));
    window.scrollTo(0, 0);
  };
  navs.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-view')); }); });
  $$('[data-go]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); show(a.getAttribute('data-go')); }); });
  var start = (location.hash || '').replace('#', '');
  show(start && $('#v-' + start) ? 'v-' + start : 'v-today', false);
  window.addEventListener('hashchange', function () {
    var h = (location.hash || '').replace('#', '');
    if (h && $('#v-' + h)) show('v-' + h, false);
  });

  /* ---------------------------------------------------------------- today, list and detail */
  var rows = $$('#today-list .lrow');
  var dets = $$('#today-det .det');
  var cur = 0;
  var select = function (i, focus) {
    if (!rows.length) return;
    cur = Math.max(0, Math.min(rows.length - 1, i));
    rows.forEach(function (r, k) { r.setAttribute('aria-selected', k === cur ? 'true' : 'false'); r.tabIndex = k === cur ? 0 : -1; });
    dets.forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-id') === rows[cur].getAttribute('data-id')); });
    if (focus) rows[cur].focus();
    var det = $('#today-det');
    if (det && window.innerWidth < 980 && focus !== false) det.scrollIntoView({ block: 'start' });
  };
  rows.forEach(function (r, k) {
    r.addEventListener('click', function () { select(k, false); });
    r.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); select(cur + 1, true); }
      if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); select(cur - 1, true); }
    });
  });
  if (rows.length) select(0, false);

  var sent = 0, total = rows.length;
  var count = function () {
    var ready = rows.filter(function (r) { return r.getAttribute('data-state') === 'ready'; }).length;
    var ok = rows.filter(function (r) { return r.getAttribute('data-state') === 'ok'; }).length;
    var sk = rows.filter(function (r) { return r.getAttribute('data-state') === 'skip'; }).length;
    $$('[data-count=ready]').forEach(function (e) { e.textContent = ready; });
    $$('[data-count=ok]').forEach(function (e) { e.textContent = ok; });
    $$('[data-count=skip]').forEach(function (e) { e.textContent = sk; });
    var st = $('#stage-sent .n'); if (st) st.textContent = ok;
    var stg = $('#stage-sent'); if (stg) stg.classList.toggle('done', ok > 0 && ready === 0);
    var all = $('#approve-all'); if (all) all.disabled = ready === 0;
  };
  var setState = function (row, state, label) {
    row.setAttribute('data-state', state);
    var s = $('.st', row); if (s) { s.textContent = label; s.className = 'st' + (state === 'ok' ? ' ok' : state === 'skip' ? ' sk' : ''); }
    row.classList.toggle('gone', state === 'skip');
    var det = $('#today-det .det[data-id="' + row.getAttribute('data-id') + '"]');
    if (det) {
      var a = $('.do-ok', det), sk = $('.do-skip', det);
      if (a) { a.disabled = state !== 'ready'; a.innerHTML = state === 'ok' ? 'Approved, request goes at 9.40' : 'Approve and queue <span class="kbd">A</span>'; }
      if (sk) sk.disabled = state !== 'ready';
    }
    count();
  };
  var next = function () {
    for (var k = 1; k <= rows.length; k++) { var j = (cur + k) % rows.length; if (rows[j].getAttribute('data-state') === 'ready') { select(j, false); return; } }
  };
  $$('#today-det .det').forEach(function (det) {
    var id = det.getAttribute('data-id');
    var row = $('#today-list .lrow[data-id="' + id + '"]');
    var ok = $('.do-ok', det), sk = $('.do-skip', det), set = $('.skipset', det);
    if (ok) ok.addEventListener('click', function () { setState(row, 'ok', 'Approved'); toast('Approved. ' + row.getAttribute('data-first') + '’s connection request goes at 9.40'); next(); });
    if (sk) sk.addEventListener('click', function () { if (set) set.classList.toggle('on'); });
    $$('.skipset button', det).forEach(function (b) {
      b.addEventListener('click', function () { set.classList.remove('on'); setState(row, 'skip', 'Skipped'); toast('Skipped, ' + b.textContent.toLowerCase()); next(); });
    });
    var ta = $('textarea', det), cc = $('.chars', det);
    if (ta && cc) { var upd = function () { cc.textContent = ta.value.length + ' characters'; }; ta.addEventListener('input', upd); upd(); }
  });
  var all = $('#approve-all');
  if (all) all.addEventListener('click', function () {
    var n = 0; rows.forEach(function (r) { if (r.getAttribute('data-state') === 'ready') { setState(r, 'ok', 'Approved'); n++; } });
    toast(n + ' approved. The connection requests go out between 9.40 and 4.30, a few minutes apart');
  });
  d.addEventListener('keydown', function (e) {
    var v = $('#v-today'); if (!v || !v.classList.contains('on')) return;
    if (/input|textarea|select/i.test(e.target.tagName)) return;
    var row = rows[cur]; if (!row) return;
    if (e.key === 'a' || e.key === 'A') { var det = $('#today-det .det.on'); var b = det && $('.do-ok', det); if (b && !b.disabled) b.click(); }
    if (e.key === 's' || e.key === 'S') { var det2 = $('#today-det .det.on'); var b2 = det2 && $('.do-skip', det2); if (b2 && !b2.disabled) b2.click(); }
  });
  var tabs = $$('#today-tabs button');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
      var f = t.getAttribute('data-f');
      rows.forEach(function (r) { var s = r.getAttribute('data-state'); r.parentNode.hidden = !(f === 'all' || s === f); });
    });
  });
  var q = $('#today-q');
  if (q) q.addEventListener('input', function () {
    var v = q.value.trim().toLowerCase();
    rows.forEach(function (r) { r.parentNode.hidden = v && r.textContent.toLowerCase().indexOf(v) < 0; });
  });
  var cap = $('#cap'), capo = $('#cap-o');
  if (cap) cap.addEventListener('input', function () {
    var n = +cap.value; capo.textContent = n + ' a day';
    $$('[data-cap]').forEach(function (e) { e.textContent = n; });
  });
  count();

  /* ---------------------------------------------------------------- inbox */
  var ir = $$('#inbox-list .lrow'), it = $$('#inbox-det .thread');
  var isel = function (i) {
    ir.forEach(function (r, k) { r.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    it.forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-id') === ir[i].getAttribute('data-id')); });
  };
  ir.forEach(function (r, k) { r.addEventListener('click', function () { isel(k); if (window.innerWidth < 980) $('#inbox-det').scrollIntoView({ block: 'start' }); }); });
  if (ir.length) isel(0);
  var itabs = $$('#inbox-tabs button');
  itabs.forEach(function (t) {
    t.addEventListener('click', function () {
      itabs.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
      var f = t.getAttribute('data-f');
      ir.forEach(function (r) { r.parentNode.hidden = !(f === 'all' || r.getAttribute('data-intent') === f); });
    });
  });
  it.forEach(function (th) {
    var slots = $$('.slots button', th), book = $('.do-book', th), done = $('.booked', th), send = $('.do-send', th);
    slots.forEach(function (s) { s.addEventListener('click', function () { slots.forEach(function (x) { x.setAttribute('aria-pressed', x === s ? 'true' : 'false'); }); if (book) book.disabled = false; }); });
    if (book) book.addEventListener('click', function () {
      var p = slots.filter(function (x) { return x.getAttribute('aria-pressed') === 'true'; })[0]; if (!p) return;
      done.textContent = 'Booked for ' + p.textContent + '. The invite went to ' + th.getAttribute('data-first') + ' with the call link, and the call is on Simon’s calendar.';
      done.classList.add('on'); book.disabled = true; slots.forEach(function (x) { x.disabled = true; });
      var row = $('#inbox-list .lrow[data-id="' + th.getAttribute('data-id') + '"] .st'); if (row) { row.textContent = 'Booked'; row.className = 'st ok'; }
      var b = $('#stage-calls .n'); if (b) b.textContent = (+b.textContent + 1);
      toast('Funding call booked');
    });
    if (send) send.addEventListener('click', function () {
      send.disabled = true; send.textContent = 'Sent';
      var row = $('#inbox-list .lrow[data-id="' + th.getAttribute('data-id') + '"] .st'); if (row) { row.textContent = 'Answered'; row.className = 'st ok'; }
      toast('Reply sent');
    });
  });

  /* ---------------------------------------------------------------- setup switches */
  $$('.switch').forEach(function (s) {
    s.addEventListener('click', function () { var on = s.getAttribute('aria-checked') !== 'true'; s.setAttribute('aria-checked', on ? 'true' : 'false'); toast((on ? 'On, ' : 'Off, ') + s.getAttribute('aria-label')); });
  });

  /* ---------------------------------------------------------------- planner, plain arithmetic on the visitor's own numbers */
  var pf = $('#planner');
  if (pf) {
    var ins = $$('input[type=range]', pf);
    var calc = function () {
      var v = {}; ins.forEach(function (i) { v[i.name] = +i.value; var o = $('output[for="' + i.id + '"]'); if (o) o.textContent = i.getAttribute('data-fmt').replace('#', i.value); });
      var msgs = v.perday * v.days;
      var replies = Math.round(msgs * v.reply / 100);
      var calls = Math.round(replies * v.call / 100);
      $('#p-msgs').textContent = msgs.toLocaleString('en-GB');
      $('#p-replies').textContent = replies.toLocaleString('en-GB');
      $('#p-calls').textContent = calls.toLocaleString('en-GB');
      $('#p-week').textContent = (Math.round(calls / (v.days / 5) * 10) / 10).toLocaleString('en-GB');
    };
    ins.forEach(function (i) { i.addEventListener('input', calc); }); calc();
  }
})();
