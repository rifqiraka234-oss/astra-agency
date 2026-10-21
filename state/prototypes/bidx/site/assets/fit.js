/* The fit check. Answers fill the eight dots and match the calls open now, using each call's own rules. */
(function () {
  var d = document, f = d.getElementById('fit');
  if (!f) return;
  var data = JSON.parse(d.getElementById('fit-data').textContent);
  var steps = [].slice.call(f.querySelectorAll('.q'));
  var back = d.getElementById('fit-back'), next = d.getElementById('fit-next'), err = d.getElementById('fit-err');
  var prog = f.querySelector('.prog i');
  var glyph = d.querySelector('.fitcard .glyph'), dots = [].slice.call(glyph.querySelectorAll('i'));
  var keys = d.getElementById('fit-keys'), H = d.getElementById('fit-h'), P = d.getElementById('fit-p');
  var res = d.getElementById('fit-res'), list = d.getElementById('res-list'), none = d.getElementById('res-none'), rh = d.getElementById('res-h');
  var cur = 0;
  var NAMES = ['UK company', 'Small enough', 'In scope', 'Something new', 'Team to deliver', 'Can fund its share', 'Time to apply', 'Partner in place'];
  var val = function (n) { var x = f.querySelector('input[name="' + n + '"]:checked'); return x ? x.value : null; };
  var show = function (i) {
    cur = i;
    steps.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    back.disabled = i === 0;
    next.innerHTML = i === steps.length - 1 ? 'See my fit' : 'Next <svg class="ar" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    prog.style.width = ((i) / steps.length * 100) + '%';
    err.hidden = true;
  };
  var days = function (iso) { return Math.ceil((new Date(iso) - new Date()) / 86400000); };
  var fmt = function (iso) { var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; var x = new Date(iso); return x.getDate() + ' ' + m[x.getMonth()]; };
  var match = function (a) {
    var out = [];
    data.forEach(function (c) {
      if (days(c.closes) < 0) return;
      if (a.uk === 'abroad') return;
      if (c.lead === 'sme' && a.size === 'large') return;
      var f = c.field.indexOf('*') > -1 || c.field.indexOf(a.field) > -1;
      if (!f) return;
      if (c.partner === 'overseas' && a.partner !== 'overseas') return;
      var why = [], amber = [];
      if (a.uk === 'notyet') amber.push('register the company first');
      if (c.stage && +a.stage < c.stage) { if (c.stage - a.stage >= 2) return; amber.push(c.stage === 3 ? 'needs a working product' : 'needs at least a prototype'); }
      if (c.partner === 'deployer' && a.partner !== 'deployer') amber.push('needs a larger company to deploy it');
      if (c.partner === 'consortium' && a.partner === 'none') amber.push('needs partners in a consortium');
      if (c.money === 'investor' && a.money !== 'investor') amber.push('needs an investor partner');
      if (!c.money && a.money === 'none') amber.push('you’ll need to fund your share');
      if (c.partner === 'overseas') why.push('your overseas partner fits');
      out.push({ c: c, amber: amber, why: why });
    });
    out.sort(function (x, y) { return (x.amber.length > 0) - (y.amber.length > 0) || new Date(x.c.closes) - new Date(y.c.closes); });
    return out;
  };
  var paint = function () {
    var a = { uk: val('uk'), size: val('size'), field: val('field'), stage: val('stage'), team: val('team'), money: val('money'), partner: val('partner') };
    var s = [
      a.uk ? (a.uk === 'uk' ? 'g' : a.uk === 'notyet' ? 'a' : 'r') : '',
      a.size ? (a.size === 'large' ? 'a' : 'g') : '',
      a.field ? (a.field === 'other' ? 'a' : 'g') : '',
      a.stage ? (a.stage === '1' ? 'a' : 'g') : '',
      a.team ? (a.team === 'yes' ? 'g' : 'a') : '',
      a.money ? (a.money === 'none' ? 'a' : 'g') : '', '', ''];
    var m = null;
    if (a.partner) {
      m = match(a);
      var best = m[0];
      s[6] = best ? (days(best.c.closes) >= 15 ? 'g' : 'a') : 'r';
      s[7] = best ? (best.amber.some(function (x) { return /deploy|consortium|investor/.test(x); }) ? 'a' : 'g') : 'a';
    }
    dots.forEach(function (dt, k) { dt.className = s[k]; });
    keys.innerHTML = s.map(function (v, k) { return v ? '<li class="' + v + '">' + NAMES[k] + '</li>' : ''; }).join('');
    var g = s.filter(function (x) { return x === 'g'; }).length;
    glyph.setAttribute('aria-label', 'Your fit, ' + g + ' of 8 green');
    return { a: a, m: m, g: g, s: s };
  };
  f.addEventListener('change', function () { paint(); err.hidden = true; });
  back.addEventListener('click', function () { if (cur > 0) show(cur - 1); });
  next.addEventListener('click', function () {
    var name = steps[cur].querySelector('input').name;
    if (!val(name)) { err.textContent = 'Pick an answer to carry on.'; err.hidden = false; return; }
    if (cur < steps.length - 1) { show(cur + 1); steps[cur].querySelector('input').focus(); return; }
    var r = paint(); prog.style.width = '100%';
    var fits = r.m.filter(function (x) { return !x.amber.length; }).length;
    H.textContent = r.s.indexOf('r') > -1 ? 'One rule stops you for now' : (fits ? fits + (fits === 1 ? ' call fits you now' : ' calls fit you now') : 'Worth a conversation');
    P.textContent = r.g + ' of 8 dots are green. ' + (r.m.length ? 'The calls are below, closest deadline first.' : 'Nothing open today fits, but new calls open most weeks.');
    list.innerHTML = r.m.map(function (x) {
      var dd = days(x.c.closes);
      var note = x.amber.length ? 'Worth a call, ' + x.amber.join(', ') : 'Fits on your answers';
      return '<li><a href="' + x.c.url + '" class="' + (dd <= 7 ? 'now' : dd <= 21 ? 'soon' : '') + '"><span><b>' + x.c.name + '</b><small>' + x.c.size + ' · closes ' + fmt(x.c.closes) + '</small><small class="sig ' + (x.amber.length ? 'a' : 'g') + '" style="margin-top:8px">' + note + '</small></span><span><span class="dotf">' + String(dd).padStart(2, '0') + '</span><span class="u">days left</span></span></a></li>';
    }).join('');
    none.hidden = r.m.length > 0; rh.hidden = r.m.length === 0;
    res.hidden = false; res.scrollIntoView({ behavior: 'auto', block: 'start' });
  });
  show(0); paint();

  var sf = d.getElementById('send');
  if (sf) sf.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = sf.querySelector('#s-name'), em = sf.querySelector('#s-email'), ok = sf.querySelector('#s-ok'), er = sf.querySelector('#s-err');
    var good = n.value.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim()) && ok.checked;
    [n, em].forEach(function (x) { x.setAttribute('aria-invalid', x.value.trim() ? 'false' : 'true'); });
    er.classList.toggle('on', !good);
    if (!good) return;
    var m = d.getElementById('s-ok-msg');
    m.textContent = 'Thanks, ' + n.value.trim() + '. Your matches are on their way to ' + em.value.trim() + '.';
    m.hidden = false; sf.querySelector('button[type=submit]').disabled = true;
  });
})();
