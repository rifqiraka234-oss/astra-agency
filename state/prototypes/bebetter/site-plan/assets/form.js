/* The kit request. Checks the fields in place, sends to Netlify Forms with the logo attached, and never leaves anyone
   stuck. If sending fails the whole kit is offered as a ready written mail. The kit itself arrives from kit.js. */
(function () {
  var d = document, form = d.querySelector('[data-form]');
  if (!form) return;
  var ok = d.querySelector('[data-form-ok]'), fail = form.querySelector('[data-form-fail]'), go = form.querySelector('.fm-go');
  var MAIL = 'BeBettergrowth@gmail.com';
  function nl() { return d.documentElement.lang === 'nl'; }
  function F(n) { return (form.elements[n] && form.elements[n].value || '').trim(); }

  var t = new Date(Date.now() + 86400000);
  form.elements.needed_by.min = t.toISOString().slice(0, 10);

  var rules = {
    gym: function () { return F('gym').length > 1; },
    name: function () { return F('name').length > 1; },
    email: function () { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(F('email')); }
  };
  function check(k, show) {
    var good = rules[k](), el = form.elements[k];
    if (show || good) {
      el.setAttribute('aria-invalid', good ? 'false' : 'true');
      var e = form.querySelector('[data-err="' + k + '"]'); if (e) e.classList.toggle('on', !good);
    }
    return good;
  }
  Object.keys(rules).forEach(function (k) {
    var el = form.elements[k];
    el.addEventListener('blur', function () { if (el.value.trim()) check(k, true); });
    el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(k, true); });
  });

  function mailto() {
    var kit = window.bbKit ? window.bbKit.summary() : F('kit');
    var lines = [kit, '', F('name'), F('email')];
    if (F('phone')) lines.push(F('phone'));
    if (F('needed_by')) lines.push((nl() ? 'Nodig voor ' : 'Needed by ') + F('needed_by'));
    if (F('link')) lines.push(F('link'));
    if (F('message')) lines.push('', F('message'));
    if (form.elements.logo.files && form.elements.logo.files.length) lines.push('', nl() ? 'Ons logo sturen we als bijlage.' : "We'll attach our logo to this mail.");
    var subj = (nl() ? 'Kit aanvraag, ' : 'Kit request, ') + F('gym');
    return 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function done() {
    form.hidden = true;
    var stub = d.querySelector('[data-stub]'); if (stub) stub.hidden = true;
    d.dispatchEvent(new CustomEvent('bb-sent'));
    if (!ok) return;
    var g = ok.querySelector('[data-ok-gym]'); if (g) g.textContent = F('gym').toUpperCase();
    var n = ok.querySelector('[data-ok-name]'); if (n) n.textContent = (nl() ? 'Bedankt, ' : 'Thanks, ') + F('name').split(' ')[0] + '.';
    ok.hidden = false; ok.scrollIntoView({ block: 'center' }); ok.focus({ preventScroll: true });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fail.hidden = true;
    var bad = Object.keys(rules).filter(function (k) { return !check(k, true); });
    if (bad.length) { form.elements[bad[0]].focus(); return; }
    if (F('website')) { done(); return; }
    form.querySelector('[data-form-lang]').value = nl() ? 'nl' : 'en';
    if (window.bbKit) form.querySelector('[data-form-kit]').value = window.bbKit.summary();
    go.disabled = true; go.setAttribute('aria-busy', 'true');
    var keep = go.innerHTML;
    go.textContent = nl() ? 'Versturen' : 'Sending';
    fetch('/', { method: 'POST', body: new FormData(form) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
      .catch(function () {
        [].forEach.call(fail.querySelectorAll('[data-form-mailto]'), function (a) { a.href = mailto(); });
        fail.hidden = false;
        fail.scrollIntoView({ block: 'nearest' });
      })
      .then(function () { go.disabled = false; go.removeAttribute('aria-busy'); go.innerHTML = keep; });
  });
})();
