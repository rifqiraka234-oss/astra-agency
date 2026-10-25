/* The one step quote request. Checks the fields in place, sends to Netlify Forms, and never leaves anyone stuck.
   If sending fails, the request is offered as a ready written mail. A headcount and a format can arrive as
   ?personnes=&format= from any button on the site, or live from the box builder on the same page. */
(function () {
  var d = document, forms = [].slice.call(d.querySelectorAll('[data-form]'));
  if (!forms.length) return;
  var FORMATS = { bureau: ['Boxes au bureau', 'Boxes at the office'], dejeuner: ["Déjeuner d'équipe", 'Team lunch'], afterwork: ['Afterwork', 'Afterwork'], privatisation: ['Privatisation', 'Private hire'] };
  var MAIL = 'Contact@saavedraparis.fr';
  function en() { return d.documentElement.lang === 'en'; }
  var q = new URLSearchParams(location.search);

  forms.forEach(function (form) {
    var ok = form.nextElementSibling && form.nextElementSibling.hasAttribute('data-form-ok') ? form.nextElementSibling : null;
    var fail = form.querySelector('[data-form-fail]'), go = form.querySelector('.fm-go');
    var pers = form.querySelector('[data-pers]'), date = form.elements.date;
    function F(n) { return (form.elements[n] && form.elements[n].value || '').trim(); }

    /* the earliest date is tomorrow, Paris time */
    var t = new Date(Date.now() + 86400000), iso = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(t);
    date.min = iso;

    /* what arrives in the address, or from the builder */
    function setPers(n) { n = Math.max(1, Math.min(400, Math.round(+n || 0))); if (n) pers.value = n; }
    function setFormat(f) { var r = form.querySelector('input[name="format"][value="' + f + '"]'); if (r) r.checked = true; }
    if (/^\d{1,3}$/.test(q.get('personnes') || '')) setPers(q.get('personnes'));
    if (FORMATS[q.get('format')]) setFormat(q.get('format'));
    d.addEventListener('sv-pers', function (e) { setPers(e.detail.n); if (e.detail.format) setFormat(e.detail.format); });
    [].forEach.call(form.querySelectorAll('[data-step]'), function (b) {
      b.addEventListener('click', function () { setPers((+pers.value || 0) + (+b.getAttribute('data-step'))); pers.dispatchEvent(new Event('input', { bubbles: true })); });
    });

    var rules = {
      nom: function () { return F('nom').length > 1; },
      contact: function () { var v = F('contact'); return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.replace(/[^\d]/g, '').length >= 8; },
      date: function () { return !!F('date') && F('date') >= date.min; }
    };
    var fields = { nom: form.elements.nom, contact: form.elements.contact, date: date };
    function check(k, show) {
      var good = rules[k]();
      if (show || good) {
        fields[k].setAttribute('aria-invalid', good ? 'false' : 'true');
        var e = form.querySelector('[data-err="' + k + '"]'); if (e) e.classList.toggle('on', !good);
      }
      return good;
    }
    Object.keys(fields).forEach(function (k) {
      fields[k].addEventListener('blur', function () { if (fields[k].value.trim()) check(k, true); });
      fields[k].addEventListener('input', function () { if (fields[k].getAttribute('aria-invalid') === 'true') check(k, true); });
    });

    function mailto() {
      var f = (form.querySelector('input[name="format"]:checked') || { value: 'bureau' }).value;
      var lines = [FORMATS[f][en() ? 1 : 0] + ', ' + F('personnes') + (en() ? ' people, ' : ' personnes, ') + F('date'), F('nom') + (F('entreprise') ? ', ' + F('entreprise') : ''), F('contact')];
      if (F('message')) lines.push('', F('message'));
      if (F('commande')) lines.push('', F('commande').split(' | ').join('\n'));
      var subj = en() ? 'Quote request via the website' : 'Demande de devis via le site';
      return 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(lines.join('\n'));
    }
    function done() {
      form.hidden = true; if (!ok) return;
      /* the ticket goes up on the kitchen rail */
      var f = (form.querySelector('input[name="format"]:checked') || { value: 'bureau' }).value, t = ok.querySelector('[data-ok-t]');
      if (t) t.textContent = FORMATS[f][en() ? 1 : 0] + ', ' + F('personnes') + (en() ? ' people, ' : ' personnes, ') + F('date');
      ok.hidden = false; ok.scrollIntoView({ block: 'center' }); ok.focus({ preventScroll: true });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      fail.hidden = true;
      var bad = ['nom', 'contact', 'date'].filter(function (k) { return !check(k, true); });
      if (bad.length) { fields[bad[0]].focus(); return; }
      if (F('website')) { done(); return; }
      form.querySelector('[data-form-lang]').value = en() ? 'en' : 'fr';
      go.disabled = true; go.setAttribute('aria-busy', 'true');
      var keep = go.innerHTML;
      go.textContent = en() ? 'Sending' : 'Envoi en cours';
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
        .catch(function () {
          [].forEach.call(fail.querySelectorAll('[data-form-mailto]'), function (a) { a.href = mailto(); });
          fail.hidden = false;
          fail.scrollIntoView({ block: 'nearest' });
        })
        .then(function () { go.disabled = false; go.removeAttribute('aria-busy'); go.innerHTML = keep; });
    });
  });
})();
