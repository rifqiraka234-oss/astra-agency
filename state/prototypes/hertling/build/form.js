/* The booking form. Checks the fields in place, sends to Netlify Forms, and never leaves anyone stuck.
   If sending fails, the request is offered as a ready written mail instead. A self check result arrives as ?ergebnis=&schwach=, a Baustein from the services page as ?baustein= */
(function () {
  var form = document.querySelector('[data-form]');
  if (!form) return;
  var d = document;
  var ok = d.querySelector('[data-form-ok]'), fail = form.querySelector('[data-form-fail]');
  var go = form.querySelector('.fm-go');
  var AREAS = { net: ['Netzwerk', 'network'], sup: ['Support', 'support'], cld: ['Cloud', 'cloud'], sec: ['Sicherheit', 'security'] };
  function en() { return d.documentElement.lang === 'en'; }
  function F(n) { return form.elements[n].value.trim(); }
  function list(a, and) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + and + ' ' + a[a.length - 1]; }

  /* a result handed over from the self check */
  var q = new URLSearchParams(location.search), pct = q.get('ergebnis');
  if (pct && /^\d{1,3}$/.test(pct) && +pct <= 100) {
    var weak = (q.get('schwach') || '').split(',').filter(function (k) { return AREAS[k]; });
    var msg = form.elements.anliegen;
    var de = 'Mein Selbsttest ergab ' + pct + ' % Blackbox' + (weak.length ? ', am schwächsten bei ' + list(weak.slice(0, 2).map(function (k) { return AREAS[k][0]; }), 'und') : '') + '.';
    var eng = 'My self check came out at ' + pct + '% black box' + (weak.length ? ', weakest on ' + list(weak.slice(0, 2).map(function (k) { return AREAS[k][1]; }), 'and') : '') + '.';
    msg.value = en() ? eng : de;
    msg.setAttribute('data-auto', '1');
    d.addEventListener('sh-lang', function () { if (msg.getAttribute('data-auto') === '1') msg.value = en() ? eng : de; });
    msg.addEventListener('input', function () { msg.removeAttribute('data-auto'); });
  }

  /* a Baustein handed over from the services page as ?baustein= */
  var BS = { net: ['Netzwerk und WLAN', 'the network and wireless'], sup: ['Support und Wartung', 'support and maintenance'], cld: ['Cloud', 'the cloud'], sec: ['Sicherheit', 'security'] };
  var bs = q.get('baustein');
  if (!pct && BS[bs]) {
    var m2 = form.elements.anliegen, de2 = 'Es geht um ' + BS[bs][0] + '.', en2 = "It's about " + BS[bs][1] + '.';
    m2.value = en() ? en2 : de2;
    m2.setAttribute('data-auto', '1');
    d.addEventListener('sh-lang', function () { if (m2.getAttribute('data-auto') === '1') m2.value = en() ? en2 : de2; });
    m2.addEventListener('input', function () { m2.removeAttribute('data-auto'); });
  }

  var rules = {
    name: function () { return F('name').length > 1; },
    kontakt: function () { var v = F('kontakt'); return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.replace(/[^\d]/g, '').length >= 6; }
  };
  var fields = { name: form.querySelector('#f-name'), kontakt: form.querySelector('#f-kontakt') };
  function check(k, show) {
    var good = rules[k]();
    if (show || good) {
      fields[k].setAttribute('aria-invalid', good ? 'false' : 'true');
      form.querySelector('[data-err="' + k + '"]').classList.toggle('on', !good);
    }
    return good;
  }
  Object.keys(fields).forEach(function (k) {
    fields[k].addEventListener('blur', function () { if (fields[k].value.trim()) check(k, true); });
    fields[k].addEventListener('input', function () { if (fields[k].getAttribute('aria-invalid') === 'true') check(k, true); });
  });

  function mailto() {
    var zeit = (form.querySelector('input[name="zeit"]:checked') || { value: '' }).value;
    var body = (F('anliegen') ? F('anliegen') + '\n\n' : '') + F('name') + (F('firma') ? ', ' + F('firma') : '') + '\n' + F('kontakt') + (zeit ? '\n' + (en() ? 'Best time, ' : 'Rückruf am besten, ') + zeit : '');
    var subj = en() ? 'First conversation, request via the website' : 'Kennenlerngespräch, Anfrage über die Website';
    return 'mailto:info@systemhaus-hertling.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
  }
  function done() {
    form.hidden = true; ok.hidden = false;
    ok.scrollIntoView({ block: 'center' }); ok.focus({ preventScroll: true });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fail.hidden = true;
    var bad = Object.keys(fields).filter(function (k) { return !check(k, true); });
    if (bad.length) { fields[bad[0]].focus(); return; }
    if (F('website')) { done(); return; }
    form.querySelector('[data-form-lang]').value = en() ? 'en' : 'de';
    go.disabled = true; go.setAttribute('aria-busy', 'true');
    var keep = go.innerHTML;
    go.textContent = en() ? 'Sending' : 'Wird gesendet';
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
      .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
      .catch(function () {
        [].forEach.call(fail.querySelectorAll('[data-form-mailto]'), function (a) { a.href = mailto(); });
        fail.hidden = false;
        fail.scrollIntoView({ block: 'nearest' });
      })
      .then(function () { go.disabled = false; go.removeAttribute('aria-busy'); go.innerHTML = keep; });
  });
})();
