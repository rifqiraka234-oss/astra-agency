/* the home page story. The sample claim runs through its four stages, the how it works steps swap the screen beside them,
   the pill at the foot shows which of the six steps the visitor is on, and the walkthrough form sends from the page. */
(function () {
  'use strict';
  var d = document, w = window, J = w.JC || {}, reduce = J.reduce;
  var $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function seen(el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < w.innerHeight; }

  /* ---- the sample claim. Stage by stage, the checks tick one at a time, then a pause and round again */
  var flow = $('[data-flow]');
  if (flow && !reduce) {
    var st = $$('.fs', flow), checks = $$('.ck li', flow), seq = [], t = 0;
    seq.push(function () { st.forEach(function (s) { s.classList.remove('on', 'done'); }); checks.forEach(function (c) { c.classList.remove('ok'); }); st[0].classList.add('on'); });
    seq.push(function () { st[0].classList.replace('on', 'done'); st[1].classList.add('on'); });
    checks.forEach(function (c) { seq.push(function () { c.classList.add('ok'); }); });
    seq.push(function () { st[1].classList.replace('on', 'done'); st[2].classList.add('on'); });
    seq.push(function () {});
    seq.push(function () { st[2].classList.replace('on', 'done'); st[3].classList.add('on'); });
    seq.push(function () {}); seq.push(function () {}); seq.push(function () {});
    flow.classList.add('run');
    (function tick() {
      if (seen(flow) && !d.hidden) { seq[t % seq.length](); t++; }
      setTimeout(tick, t % seq.length === 1 ? 1400 : 700);
    })();
  }

  /* ---- how it works. The step nearest the middle of the screen is lit, and its screen shows beside it */
  var how = $('[data-how]');
  if (how) {
    var hs = $$('.hs', how), vis = $$('.vis', how), hot = $$('.hot', how), cur = '';
    how.classList.add('how-on');
    var pick = function () {
      var mid = w.innerHeight * .5, best = hs[0], bd = 1e9;
      hs.forEach(function (h) { var r = h.getBoundingClientRect(), c = r.top + r.height / 2, dd = Math.abs(c - mid); if (dd < bd) { bd = dd; best = h; } });
      var v = best.getAttribute('data-v'); if (v === cur) return; cur = v;
      hs.forEach(function (h) { h.classList.toggle('on', h === best); });
      var panel = v === '2b' ? '2' : v;
      vis.forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-vis') === panel); });
      hot.forEach(function (x) { x.classList.toggle('lit', x.getAttribute('data-h') === v); });
    };
    pick(); w.addEventListener('scroll', pick, { passive: true }); w.addEventListener('resize', pick);
  }

  /* ---- the six steps, a pill at the foot of the screen once the visitor has scrolled past the first one */
  var jp = $('[data-jp]'), steps = $$('[data-step]');
  if (jp && steps.length) {
    var links = $$('a', jp);
    var jpu = function () {
      var y = w.innerHeight * .45, at = 0;
      steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < y) at = i; });
      links.forEach(function (a, i) { a.classList.toggle('on', i === at); a.classList.toggle('done', i < at); if (i === at) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
      jp.classList.toggle('show', w.scrollY > w.innerHeight * .55 && steps[steps.length - 1].getBoundingClientRect().top > w.innerHeight * .25);
    };
    jpu(); w.addEventListener('scroll', jpu, { passive: true }); w.addEventListener('resize', jpu);
  }

  /* ---- the walkthrough form. An empty or malformed required field is marked, a sent form says so */
  $$('form[data-form]').forEach(function (fm) {
    fm.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      $$('[required]', fm).forEach(function (i) {
        var wrap = i.closest('.f2'), bad = !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));
        if (wrap) wrap.classList.toggle('bad', bad); if (bad && ok) { i.focus(); ok = false; }
      });
      if (!ok) return;
      var data = new URLSearchParams(new FormData(fm)).toString(), btn = $('button[type=submit]', fm); if (btn) btn.disabled = true;
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data }).then(function (res) {
        if (!res.ok) throw 0; fm.style.display = 'none'; var s = $('.sent', fm.parentNode); if (s) { s.classList.add('on'); s.focus(); }
      }).catch(function () { if (btn) btn.disabled = false; var er = $('.formerr', fm); if (er) er.style.display = 'block'; });
    });
  });
})();
