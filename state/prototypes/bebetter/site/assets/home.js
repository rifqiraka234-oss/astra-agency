/* Home. The drop, the road and the curve. The tee with the gym's name is kit.js. */
(function () {
  var d = document, root = d.documentElement;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function nl() { return root.lang === 'nl'; }

  /* ---------------------------------------------------------------- the drop, in days, Amsterdam's calendar. No hour, they only gave the date */
  var dr = $('[data-drop]');
  function today() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date()); }
  function drop() {
    if (!dr) return;
    var day = dr.getAttribute('data-date'), now = today();
    var n = Math.round((Date.parse(day + 'T00:00:00Z') - Date.parse(now + 'T00:00:00Z')) / 86400000);
    var when = $('[data-drop-when]', dr), live = n <= 0;
    if (n > 1) when.textContent = nl() ? 'Nieuwe collectie, live over ' + n + ' dagen' : 'New collection, live in ' + n + ' days';
    else if (n === 1) when.textContent = nl() ? 'Nieuwe collectie, morgen live' : 'New collection, live tomorrow';
    else if (n === 0) when.textContent = nl() ? 'Nieuwe collectie, vandaag live' : 'New collection, live today';
    else when.textContent = nl() ? 'De nieuwe collectie is live' : 'The new collection is live';
    $('[data-drop-how]', dr).hidden = live;
    $('[data-drop-go]', dr).hidden = live;
    $('[data-drop-shop]', dr).hidden = !live;
    dr.classList.toggle('live', live);
  }
  drop(); d.addEventListener('bb-lang', drop);

  /* ---------------------------------------------------------------- the road, a stop shows its photo and their line */
  var stops = $$('[data-stop]');
  stops.forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-stop');
      stops.forEach(function (o) { var on = o === b; o.classList.toggle('cur', on); o.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      $$('[data-pane]').forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== k; });
    });
  });

  /* ---------------------------------------------------------------- 1% better every day, the curve you drag */
  var cv = $('[data-cv]');
  if (cv) {
    var svg = $('.cv-svg', cv), dot = $('[data-cv-dot]', cv), drp = $('[data-cv-drop]', cv), done = $('[data-cv-done]', cv), inp = $('[data-cv-in]', cv);
    var W = 640, H = 360, P = 30, top = Math.pow(1.01, 365);
    var X = function (day) { return P + day / 365 * (W - 2 * P); };
    var Y = function (day) { return H - P - (Math.pow(1.01, day) - 1) / (top - 1) * (H - 2 * P); };
    var set = function (day) {
      day = Math.max(1, Math.min(365, Math.round(day)));
      dot.setAttribute('cx', X(day).toFixed(1)); dot.setAttribute('cy', Y(day).toFixed(1));
      drp.setAttribute('x1', X(day).toFixed(1)); drp.setAttribute('x2', X(day).toFixed(1)); drp.setAttribute('y1', Y(day).toFixed(1));
      var pts = []; for (var i = 0; i <= day; i += 3) pts.push(X(i).toFixed(1) + ',' + Y(i).toFixed(1)); pts.push(X(day).toFixed(1) + ',' + Y(day).toFixed(1));
      done.setAttribute('points', pts.join(' '));
      $('[data-cv-day]', cv).textContent = day;
      var x = Math.pow(1.01, day);
      $('[data-cv-x]', cv).textContent = (x < 10 ? x.toFixed(2) : x.toFixed(1)).replace('.', nl() ? ',' : '.');
      if (inp && +inp.value !== day) inp.value = day;
      cv.setAttribute('data-day', day);
    };
    var fromX = function (cx) { var r = svg.getBoundingClientRect(); set((((cx - r.left) / r.width * W) - P) / (W - 2 * P) * 365); };
    svg.addEventListener('pointerdown', function (e) { svg.setPointerCapture(e.pointerId); fromX(e.clientX); });
    svg.addEventListener('pointermove', function (e) { if (svg.hasPointerCapture(e.pointerId)) fromX(e.clientX); });
    if (inp) inp.addEventListener('input', function () { set(+inp.value); });
    d.addEventListener('bb-lang', function () { set(+cv.getAttribute('data-day') || 180); });
    set(180);
  }
})();
