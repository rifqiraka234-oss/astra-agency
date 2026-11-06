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

// their Q, a window onto the four countries' chambers. It turns every few seconds and follows the visitor's pointer
const qs = [...document.querySelectorAll('.dq img')];
let at = Math.max(0, qs.findIndex(im => im.dataset.country === (li && li.dataset.country))), held = false;
const show = k => qs.forEach((im, i) => im.classList.toggle('on', i === k));
show(at);
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => { if (!held) { at = (at + 1) % qs.length; show(at); } }, 3200);
document.querySelectorAll('.countries li').forEach(el => {
  const k = qs.findIndex(im => im.dataset.country === el.dataset.country);
  const on = () => { held = true; at = k; show(k); }, off = () => { held = false; };
  el.addEventListener('pointerenter', on); el.addEventListener('focusin', on); el.addEventListener('pointerleave', off); el.addEventListener('focusout', off);
});
