/* Selbsttest. One question at a time, scored in the browser, nothing stored or sent.
   Each answer is 2 (known and written down), 1 (roughly) or 0 (no, or unknown). Black box share = points missing / points possible. */
(function () {
  var form = document.querySelector('[data-check]');
  if (!form) return;
  var d = document;
  var qs = [].slice.call(form.querySelectorAll('.q'));
  var area = form.querySelector('[data-chk-area]'), count = form.querySelector('[data-chk-count]'), bar = form.querySelector('[data-chk-bar]');
  var back = form.querySelector('[data-chk-back]'), next = form.querySelector('[data-chk-next]');
  var res = d.querySelector('[data-result]');
  var NAMES = { net: ['Netzwerk', 'Network'], sup: ['Support', 'Support'], cld: ['Cloud', 'Cloud'], sec: ['Sicherheit', 'Security'] };
  var ORDER = ['net', 'sup', 'cld', 'sec'];
  var at = 0, viaPointer = false, timer;
  function en() { return d.documentElement.lang === 'en'; }
  function val(q) { var c = q.querySelector('input:checked'); return c ? +c.value : null; }
  function show(i, focus) {
    at = i;
    qs.forEach(function (q, k) { q.hidden = k !== i; });
    var a = qs[i].getAttribute('data-area'), inArea = qs.filter(function (q) { return q.getAttribute('data-area') === a; });
    area.textContent = NAMES[a][en() ? 1 : 0] + ' ' + (inArea.indexOf(qs[i]) + 1) + '/' + inArea.length;
    count.textContent = en() ? 'Question ' + (i + 1) + ' of ' + qs.length : 'Frage ' + (i + 1) + ' von ' + qs.length;
    bar.style.transform = 'scaleX(' + (i / qs.length) + ')';
    back.hidden = i === 0;
    next.disabled = val(qs[i]) === null;
    next.textContent = i === qs.length - 1 ? (en() ? 'See the result' : 'Ergebnis zeigen') : (en() ? 'Next' : 'Weiter');
    qs[i].classList.remove('in'); void qs[i].offsetWidth; qs[i].classList.add('in');
    if (focus) { var f = qs[i].querySelector('input:checked') || qs[i].querySelector('input'); f.focus({ preventScroll: true }); }
  }
  function result() {
    var pts = {}, max = {}, sum = 0, all = 0;
    qs.forEach(function (q) {
      var a = q.getAttribute('data-area');
      pts[a] = (pts[a] || 0) + val(q); max[a] = (max[a] || 0) + 2;
      sum += val(q); all += 2;
    });
    var pct = Math.round((all - sum) / all * 100);
    res.querySelector('[data-rs-pct]').textContent = pct + (en() ? '%' : ' %');
    res.querySelector('[data-rs-h]').setAttribute('data-show', pct <= 15 ? '0' : pct <= 50 ? '1' : '2');
    var weak = [];
    ORDER.forEach(function (a) {
      var r = pts[a] / max[a], st = r >= 0.85 ? 'ok' : r >= 0.4 ? 'mid' : 'bad';
      var row = res.querySelector('[data-row="' + a + '"]');
      row.style.setProperty('--v', r.toFixed(3));
      row.setAttribute('data-st', st);
      res.querySelector('[data-rec="' + a + '"]').hidden = st === 'ok';
      if (st !== 'ok') weak.push([a, r]);
    });
    weak.sort(function (x, y) { return x[1] - y[1]; });
    res.querySelector('[data-rec-none]').hidden = weak.length > 0;
    var ol = res.querySelector('.recs');
    weak.forEach(function (w) { ol.appendChild(res.querySelector('[data-rec="' + w[0] + '"]')); });
    res.querySelector('[data-rs-mail]').href = '/kontakt/?ergebnis=' + pct + (weak.length ? '&schwach=' + weak.map(function (w) { return w[0]; }).join(',') : '');
    form.hidden = true;
    res.hidden = false;
    res.classList.remove('in');
    requestAnimationFrame(function () { requestAnimationFrame(function () { res.classList.add('in'); }); });
    res.scrollIntoView({ block: 'start' });
    res.focus({ preventScroll: true });
  }
  function go() {
    clearTimeout(timer);
    if (val(qs[at]) === null) return;
    if (at < qs.length - 1) show(at + 1, true); else result();
  }
  qs.forEach(function (q) {
    q.addEventListener('pointerdown', function () { viaPointer = true; });
    q.addEventListener('keydown', function (e) { viaPointer = false; if (e.key === 'Enter') { e.preventDefault(); go(); } });
    q.addEventListener('change', function () {
      next.disabled = false;
      if (viaPointer) { clearTimeout(timer); timer = setTimeout(go, 320); }
      viaPointer = false;
    });
  });
  next.addEventListener('click', go);
  back.addEventListener('click', function () { clearTimeout(timer); if (at > 0) show(at - 1, true); });
  form.addEventListener('submit', function (e) { e.preventDefault(); go(); });
  d.querySelector('[data-chk-again]').addEventListener('click', function () {
    form.reset(); res.hidden = true; form.hidden = false; show(0, true);
    form.scrollIntoView({ block: 'center' });
  });
  d.addEventListener('sh-lang', function () {
    if (!form.hidden) show(at, false);
    else { var p = res.querySelector('[data-rs-pct]'); p.textContent = p.textContent.replace(/ ?%/, en() ? '%' : ' %'); }
  });
  form.classList.add('on');
  show(0, false);
})();
