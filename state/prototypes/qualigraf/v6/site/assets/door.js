// The front door. Suggest the visitor's country first, from the country they chose last time or their browser's language.
// Nothing redirects, so a clerk on a shared laptop can always pick another country.
const list = document.querySelector('.countries');
let pick = null;
try { pick = localStorage.getItem('qg-country'); } catch (e) {}
if (!pick) {
  const langs = (navigator.languages || [navigator.language || '']).map(l => l.toLowerCase());
  for (const l of langs) {
    if (l.startsWith('fr')) { pick = 'fr'; break; }
    if (l.startsWith('nl')) { pick = 'nl'; break; }
    if (l === 'en-ca') { pick = 'ca'; break; }
    if (l === 'en-gb' || l === 'cy') { pick = 'uk'; break; }
  }
}
const li = pick && list && list.querySelector(`[data-country="${pick}"]`);
if (li) { li.classList.add('first'); list.prepend(li); }
