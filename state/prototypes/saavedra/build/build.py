#!/usr/bin/env python3
"""Saavedra site, the shop with its catering and events side. Assembles build/pages/*.html into ../site/.

Each page source starts with <!--{"title": "[[FR||EN]]", "desc": "[[FR||EN]]", "nav": "key", "path": "out/path.html"}-->.
Copy is bilingual inline, [[Français||English]]. Inline text becomes two spans, text holding block tags becomes two
divs, attr="[[..||..]]" becomes the French attribute plus data-en-attr for the English, and
<option>[[..||..]]</option> carries its English in data-en. French is the default and the no-JS state, site.js swaps.
Pages with "bare": true go to ../site-plan/, Astra's growth plan, so Astra's voice never sits inside their site.
"""
import glob
import hashlib
import html
import json
import os
import re
import shutil

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'site')
OUT2 = os.path.join(HERE, '..', 'site-plan')
FACTS = json.load(open(os.path.join(HERE, 'data', 'facts.json')))

MAIL = FACTS['mail']
ADDR = FACTS['addr']
MAPS = FACTS['maps']
ZELTY = FACTS['zelty']
DELIVEROO = FACTS['deliveroo']
INSTA = FACTS['instagram']

TOK = re.compile(r'\[\[(.*?)\|\|(.*?)\]\]', re.S)
BLOCK = re.compile(r'<(p|div|ul|ol|li|h[1-6]|section|figure|table|br)\b')
AR = '<svg class="ar" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'

NAV = [('accueil', '/', 'Accueil', 'Home'),
       ('menu', '/menu/', 'Menu', 'Menu'),
       ('entreprises', '/entreprises/', 'Entreprises', 'Companies'),
       ('privatisation', '/privatisation/', 'Privatisation', 'Private hire'),
       ('equipe', '/equipe/', "L'équipe", 'The team')]


def L(fr, en):
    return f'[[{fr}||{en}]]'


def svg(name, cls='', title=None):
    """One of their marks from assets/, each copy with its own ids."""
    s = open(os.path.join(HERE, 'assets', name)).read()
    lab = f' role="img" aria-label="{title}"' if title else ' aria-hidden="true"'
    svg.n = getattr(svg, 'n', 0) + 1
    for gid in re.findall(r'id="([^"]+)"', s):
        s = s.replace(f'id="{gid}"', f'id="{gid}-{svg.n}"').replace(f'url(#{gid})', f'url(#{gid}-{svg.n})')
    return s.replace('<svg ', f'<svg class="{cls}"{lab} focusable="false" ', 1)


def devis(page, compact=False, default="bureau"):
    """The one step quote request. Everything a caterer needs to answer with a price, nothing more."""
    opt = f' <span class="fm-opt">{L("facultatif", "optional")}</span>'
    mail = f'<a href="mailto:{MAIL}" data-form-mailto>{MAIL}</a>'
    formats = [('bureau', 'Boxes au bureau', 'Boxes at the office'),
               ('dejeuner', "Déjeuner d'équipe", 'Team lunch'),
               ('afterwork', 'Afterwork', 'Afterwork'),
               ('privatisation', 'Privatisation', 'Private hire')]
    chips = ''.join(f'<label><input type="radio" name="format" value="{v}"{" checked" if v == default else ""}><span>{L(fr, en)}</span></label>' for v, fr, en in formats)
    return f"""<form class="fm" name="devis" method="POST" action="/devis/merci/" data-netlify="true" netlify-honeypot="website" data-form novalidate>
  <input type="hidden" name="form-name" value="devis">
  <input type="hidden" name="langue" value="fr" data-form-lang>
  <input type="hidden" name="page" value="{page}">
  <input type="hidden" name="commande" value="">
  <fieldset class="fm-g">
    <legend>{L("Pour quoi&#8239;?", "What for?")}</legend>
    <div class="fm-chips">{chips}</div>
  </fieldset>
  <div class="fm-row">
    <div class="fm-f fm-n">
      <label for="f-pers-{page}">{L("Combien de personnes&#8239;?", "How many people?")}</label>
      <div class="fm-step"><button type="button" data-step="-1" aria-label="{L('Une personne de moins', 'One person less')}"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button><input id="f-pers-{page}" name="personnes" type="number" inputmode="numeric" min="1" max="400" value="20" required data-pers><button type="button" data-step="1" aria-label="{L('Une personne de plus', 'One person more')}"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10M8 3v10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button></div>
    </div>
    <div class="fm-f">
      <label for="f-date-{page}">{L("Pour quand&#8239;?", "When?")}</label>
      <input id="f-date-{page}" name="date" type="date" required aria-describedby="e-date-{page}">
      <p class="fm-e" id="e-date-{page}" data-err="date">{L("Indiquez une date, même approximative.", "Add a date, even a rough one.")}</p>
    </div>
  </div>
  <div class="fm-row">
    <div class="fm-f"><label for="f-nom-{page}">{L("Votre nom", "Your name")}</label><input id="f-nom-{page}" name="nom" type="text" autocomplete="name" required aria-describedby="e-nom-{page}"><p class="fm-e" id="e-nom-{page}" data-err="nom">{L("Indiquez votre nom.", "Add your name.")}</p></div>
    <div class="fm-f"><label for="f-ent-{page}">{L("Entreprise", "Company")}{opt}</label><input id="f-ent-{page}" name="entreprise" type="text" autocomplete="organization"></div>
  </div>
  <div class="fm-f"><label for="f-contact-{page}">{L("Mail ou téléphone", "Email or phone")}</label><input id="f-contact-{page}" name="contact" type="text" autocomplete="email" required aria-describedby="e-contact-{page}"><p class="fm-e" id="e-contact-{page}" data-err="contact">{L("Un mail ou un numéro, pour vous envoyer le devis.", "An email or a number, so we can send you the quote.")}</p></div>
  {'' if compact else f'<div class="fm-f"><label for="f-msg-{page}">{L("Un mot sur l&#39;occasion", "A word on the occasion")}{opt}</label><textarea id="f-msg-{page}" name="message" rows="2"></textarea></div>'}
  <p class="fm-hp" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></p>
  <button class="btn pri btn-lg fm-go" type="submit">{L("Recevoir mon devis", "Get my quote")}{AR}</button>
  <p class="fm-note">{L("Julien et Grégoire vous répondent avec un devis. Vos informations servent uniquement à ça, voir la <a href=\"/confidentialite/\">politique de confidentialité</a>.", "Julien and Grégoire reply with a quote. Your details are only used for that, see the <a href=\"/confidentialite/\">privacy policy</a>.")}</p>
  <p class="fm-fail" data-form-fail hidden>{L(f"Ça n'est pas passé. Écrivez directement à {mail}.", f"That didn't go through. Write to us directly at {mail}.")}</p>
</form>
<div class="fm-ok" data-form-ok hidden tabindex="-1">
  <div class="rail" aria-hidden="true"><span class="rail-t"><b>SAAVEDRA</b><span data-ok-t></span><em>{L("Reçu", "Received")}</em></span></div>
  <h3>{L("Merci, c'est noté.", "Thanks, that's in.")}</h3>
  <p>{L("Julien et Grégoire reviennent vers vous avec un devis.", "Julien and Grégoire will come back to you with a quote.")}</p>
</div>"""


EMP_DEFS = """<svg class="defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>
<radialGradient id="empg" cx="45%" cy="30%" r="80%"><stop offset="0" stop-color="#ffd58f"/><stop offset=".55" stop-color="#f0b45f"/><stop offset="1" stop-color="#cf8537"/></radialGradient>
<symbol id="emp" viewBox="0 0 64 40"><path d="M3 35C3 15 17 4 32 4s29 11 29 31c0 2-1 3-3 3H6c-2 0-3-1-3-3z" fill="url(#empg)"/>
<path d="M6 34C6 17 18 7.5 32 7.5S58 17 58 34" fill="none" stroke="#b8692a" stroke-width="4.2" stroke-linecap="round" stroke-dasharray="2.6 2.4" opacity=".9"/>
<ellipse cx="25" cy="20" rx="3.4" ry="2" fill="#6b3311" opacity=".55"/><ellipse cx="39" cy="16" rx="2.2" ry="1.4" fill="#6b3311" opacity=".5"/><ellipse cx="44" cy="26" rx="3" ry="1.7" fill="#6b3311" opacity=".45"/><ellipse cx="18" cy="29" rx="2" ry="1.2" fill="#6b3311" opacity=".45"/>
</symbol></defs></svg>"""


# ---------------------------------------------------------------- the order, carried down the Entreprises page
FORMATS = {'bureau': ['Boxes au bureau', 'Boxes at the office'], 'dejeuner': ["Déjeuner d'équipe", 'Team lunch'], 'afterwork': ['Afterwork', 'Afterwork']}
DEALS = {'classic': {'name': 'Saavedra Classic', 'price': 13.9}, 'miamor': {'name': 'Saavedra Mi Amor', 'price': 15.9}}
DRINKS = {'quilmes': {'fr': 'Quilmes 33 cl', 'en': 'Quilmes 33 cl', 'price': 6.5}, 'limonade': {'fr': 'Limonade bio', 'en': 'Organic lemonade', 'price': 4.5}}
PLUS = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10M8 3v10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
MINUS = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'


def recipes():
    M = json.load(open(os.path.join(HERE, 'data', 'menu.json')))
    slug = lambda n: re.sub(r'[^a-z]+', '', n.lower().replace('ó', 'o').split(' y salsa')[0])
    return [{'id': slug(r[0]), 'name': r[0], 'veg': veg} for veg, rows in ((False, M['carne']), (True, M['verduras'])) for r in rows]


def cents(v):
    # rounds the way the browser's number format does on the page, from the shortest decimal, half up
    from decimal import Decimal, ROUND_HALF_UP
    return Decimal(repr(v)).quantize(Decimal('0.01'), ROUND_HALF_UP)


def eur(v):
    return f'{cents(v):,.2f}'.replace(',', '\u00a0').replace('.', ',') + '\u00a0€'


def eur0(v):
    from decimal import Decimal, ROUND_HALF_UP
    return f'{Decimal(repr(v)).quantize(Decimal("1"), ROUND_HALF_UP):,}'.replace(',', '\u00a0') + '\u00a0€'


def eur_en(v):
    return f'{cents(v):,.2f}' + '\u00a0€'


def order_plan(n=20, k=3):
    """The same sums as js/order.js, so the page reads right before and without the script."""
    e = n * k
    b12, r = divmod(e, 12)
    b6 = 0
    if r > 6:
        b12 += 1
    elif r:
        b6 = 1
    total_e = b12 * 12 + b6 * 6
    R = recipes()
    base, rest = divmod(total_e, len(R))
    mix = [(x, base + (1 if i < rest else 0)) for i, x in enumerate(R)]
    price = b12 * FACTS['price12'] + b6 * FACTS['price6']
    return {'b12': b12, 'b6': b6, 'e': total_e, 'mix': mix, 'veg': sum(c for x, c in mix if x['veg']), 'total': price, 'head': price / n, 'n': n}


def order_data():
    d = {'price12': FACTS['price12'], 'price6': FACTS['price6'], 'formats': FORMATS, 'deals': DEALS, 'drinks': DRINKS, 'recipes': recipes()}
    return f'<script type="application/json" id="sv-order-data">{re.sub(r"([\[\]])(?=[\[\]])", r"\1 ", json.dumps(d, ensure_ascii=False))}</script>'


def headcount():
    """The hero of the Entreprises page, the headcount. Its line of empanadas is headline(), below it."""
    return f"""<div class="ho-ctl">
      <div class="ho-num">
        <button type="button" class="ho-step js-only" data-n-step="-1" aria-label="{L('Une personne de moins', 'One person less')}">{MINUS}</button>
        <div class="ho-big" role="spinbutton" tabindex="0" aria-valuemin="1" aria-valuemax="400" aria-valuenow="20" aria-label="{L('Nombre de personnes', 'Number of people')}" data-o-big><b data-o="n">20</b></div>
        <button type="button" class="ho-step js-only" data-n-step="1" aria-label="{L('Une personne de plus', 'One person more')}">{PLUS}</button>
      </div>
      <p class="ho-unit">{L('personnes', 'people')}</p>
      <input class="ho-range js-only" type="range" min="4" max="120" step="1" value="20" data-o-range aria-label="{L('Nombre de personnes', 'Number of people')}">
    </div>"""


def headline():
    p = order_plan()
    line = ''.join(f'<i class="{"veg" if x["veg"] else "carne"}"></i>' for x, c in p['mix'] for _ in range(c))
    return f"""<div class="ho-line" data-o-line aria-hidden="true">{line}</div>
  <p class="ho-count ch-in"><b data-o-count>{p['e']}</b> empanadas <span data-o-boxes>{L(f"{p['b12']} box de 12", f"{p['b12']} boxes of 12")}</span></p>"""


def table():
    """Format, appetite, recipes on the left. The wooden table and the ticket on the right."""
    p = order_plan()
    R = recipes()
    fmt_rows = [('bureau', 'Boxes au bureau', 'Boxes at the office', 'Des box de 6 et de 12 à partager', 'Boxes of 6 and 12 to share'),
                ('dejeuner', "Déjeuner d'équipe", 'Team lunch', 'Une formule du midi par personne', 'One lunch deal each'),
                ('afterwork', 'Afterwork', 'Afterwork', 'Des box et de quoi trinquer', 'Boxes and something to drink')]
    fmts = ''.join(f'<label><input type="radio" name="o-format" value="{v}"{" checked" if v == "bureau" else ""}><span><b>{L(a, b)}</b><small>{L(c, e)}</small></span></label>' for v, a, b, c, e in fmt_rows)
    faim = ''.join(f'<label><input type="radio" name="o-k" value="{v}"{" checked" if v == 3 else ""}><span><b>{L(a, b)}</b><small>{L(c, e)}</small></span></label>' for v, a, b, c, e in
                   [(2, 'Petite faim', 'Light', '2 par personne', '2 each'), (3, 'Déjeuner', 'Lunch', '3 par personne', '3 each'), (4, 'Grosse faim', 'Hungry', '4 par personne', '4 each')])
    deals = ''.join(f'<label><input type="radio" name="o-deal" value="{k}"{" checked" if k == "classic" else ""}><span><b>{v["name"].replace("Saavedra ", "")}</b><small>{eur(v["price"])}</small></span></label>' for k, v in DEALS.items())
    drinks = ''.join(f'<label><input type="radio" name="o-drink" value="{k}"{" checked" if k == "quilmes" else ""}><span><b>{L(v["fr"].replace(" 33 cl", ""), v["en"].replace(" 33 cl", ""))}</b><small>{eur(v["price"])}</small></span></label>' for k, v in DRINKS.items())
    drinks += f'<label><input type="radio" name="o-drink" value="none"><span><b>{L("Rien", "None")}</b><small>{L("pas de boisson", "no drinks")}</small></span></label>'
    recs = ''
    for veg, title in ((False, 'Carne'), (True, 'Verduras')):
        recs += f'<p class="oc-sub">{title}</p>' + ''.join(f'<label class="{"veg" if x["veg"] else "carne"}"><input type="checkbox" name="o-recipe" value="{x["id"]}" checked><span>{x["name"]}</span></label>' for x in R if x['veg'] == veg)
    # five boxes of twelve, filled in menu order, the same as the script draws them
    flat = [x for x, c in p['mix'] for _ in range(c)]
    boxes = ''
    for i in range(p['b12']):
        cells = ''.join(f'<i class="{"veg" if x["veg"] else "carne"}" style="--j:{j}" title="{x["name"]}"><svg viewBox="0 0 64 40" aria-hidden="true" focusable="false"><use href="#emp"/></svg></i>' for j, x in enumerate(flat[i * 12:(i + 1) * 12]))
        boxes += f'<div class="bx bx12" style="--k:{i}"><span class="bx-lid" aria-hidden="true"></span><div class="bx-g">{cells}</div></div>'
    mix_li = ''.join(f'<li class="{"veg" if x["veg"] else "carne"}"><b>{c}</b> {x["name"]}</li>' for x, c in p['mix'])
    return f"""{EMP_DEFS}
{order_data()}
<div class="ob">
  <div class="oc js-only">
    <fieldset class="oc-g"><legend>{L("Pour quoi&#8239;?", "What for?")}</legend><div class="oc-rows">{fmts}</div></fieldset>
    <fieldset class="oc-g" data-when="bureau afterwork"><legend>{L("Quel appétit&#8239;?", "How hungry?")}</legend><div class="oc-chips">{faim}</div></fieldset>
    <fieldset class="oc-g" data-when="dejeuner" hidden><legend>{L("Quelle formule&#8239;?", "Which deal?")}</legend><div class="oc-chips oc-2">{deals}</div></fieldset>
    <fieldset class="oc-g" data-when="afterwork" hidden><legend>{L("Et à boire&#8239;?", "And to drink?")}</legend><div class="oc-chips">{drinks}</div></fieldset>
    <fieldset class="oc-g oc-rec"><legend>{L("Quelles recettes&#8239;?", "Which recipes?")}</legend>
      <div class="oc-quick"><button type="button" data-o-all aria-pressed="true">{L("Un peu de tout", "A bit of everything")}</button><button type="button" data-o-veg aria-pressed="false">{L("Que sans viande", "Meat free only")}</button></div>
      <div class="oc-list">{recs}</div>
    </fieldset>
  </div>
  <div class="tb">
    <div class="tb-boxes"><div class="bb-stack" data-o-stack aria-hidden="true" style="--e:30px">{boxes}</div></div>
    <div class="tk" data-o-ticket>
      <div class="tk-p">
        <p class="tk-h">SAAVEDRA<small>48 rue Condorcet, 75009 Paris</small></p>
        <p class="tk-who"><b data-o="n">20</b> {L("personnes", "people")} <span data-t-fmt>{L("Boxes au bureau", "Boxes at the office")}</span></p>
        <ul class="tk-l" data-t-lines><li><span>{L(f"{p['b12']} × Box de 12", f"{p['b12']} × Box of 12")}</span><b>{L(eur(p['total']), eur_en(p['total']))}</b></li></ul>
        <ul class="tk-mix" data-t-mix>{mix_li}</ul>
        <p class="tk-veg" data-t-veg>{L(f"dont {p['veg']} sans viande", f"{p['veg']} without meat")}</p>
        <p class="tk-tot"><span>{L("Total au prix de la carte", "Total at card prices")}</span><b data-t-total>{L(eur(p['total']), eur_en(p['total']))}</b></p>
        <p class="tk-head" data-t-head>{L(f"environ {eur(p['head'])} par personne", f"about {eur_en(p['head'])} a head")}</p>
        <a class="btn pri tk-go" href="#devis" data-o-go>{L("Recevoir mon devis", "Get my quote")}</a>
      </div>
    </div>
  </div>
</div>
<p class="sr" aria-live="polite" data-o-live></p>"""


def perhead():
    """Per head, at card prices, for the headcount picked. A row is also a button that switches the order to it."""
    p = order_plan()
    vals = {'bureau': p['head'], 'classic': 13.9, 'miamor': 15.9, 'afterwork': p['head'] + 6.5}
    mx = max(vals.values()) * 1.08
    rows = [('bureau', 'Boxes au bureau', 'Boxes at the office', '<span data-ph-k>3</span> empanadas par personne', '<span data-ph-k>3</span> empanadas each'),
            ('classic', 'Saavedra Classic', 'Saavedra Classic', '3 empanadas et 1 soft', '3 empanadas and 1 soft drink'),
            ('miamor', 'Saavedra Mi Amor', 'Saavedra Mi Amor', '3 empanadas, 1 soft et 1 alfajor', '3 empanadas, 1 soft drink and 1 alfajor'),
            ('afterwork', 'Afterwork', 'Afterwork', 'les box et une Quilmes chacun', 'the boxes and a Quilmes each')]
    out = ''.join(f'<button type="button" class="ph-r{" cur" if k == "bureau" else ""}" data-ph="{k}" aria-pressed="{"true" if k == "bureau" else "false"}" style="--v:{vals[k] / mx:.3f}"><span class="ph-l"><b>{L(a, b)}</b><small>{L(c, e)}</small></span><span class="ph-bar" aria-hidden="true"><i></i></span><span class="ph-v" data-ph-v>{L(eur(vals[k]), eur_en(vals[k]))}</span></button>' for k, a, b, c, e in rows)
    return f"""<div class="ph rv">
  <div class="ph-head">
    <h3 class="d3" id="ph-h">{L("Par personne", "Per head")}</h3>
    <p>{L('Au prix de la carte, pour <b data-o="n">20</b> personnes.', 'At card prices, for <b data-o="n">20</b> people.')} <span class="js-only">{L('Touchez une ligne pour passer la commande dessus.', 'Tap a row to switch the order to it.')}</span></p>
  </div>
  <div class="ph-rows" role="group" aria-labelledby="ph-h">{out}</div>
</div>"""


def mini():
    """The home page only asks the headcount, then opens the order on Entreprises with it."""
    return f"""<div class="mini rv" data-mini>
      <p class="mini-q">{L("Vous êtes combien&#8239;?", "How many of you?")}</p>
      <div class="mini-n">
        <button type="button" class="ho-step js-only" data-mini-step="-1" aria-label="{L('Une personne de moins', 'One person less')}">{MINUS}</button>
        <output data-mini-out aria-live="polite">20</output>
        <button type="button" class="ho-step js-only" data-mini-step="1" aria-label="{L('Une personne de plus', 'One person more')}">{PLUS}</button>
      </div>
      <p class="mini-u">{L("personnes", "people")}</p>
      <input class="ho-range js-only" type="range" min="4" max="120" step="1" value="20" data-mini-range aria-label="{L('Nombre de personnes', 'Number of people')}">
      <a class="btn pri btn-lg mini-go" href="/entreprises/?personnes=20#table" data-mini-go>{L("Composer la commande", "Build the order")}</a>
      <a class="mini-alt" href="/devis/">{L("Ou demander un devis tout de suite", "Or ask for a quote right away")}</a>
    </div>"""


def orderbar():
    p = order_plan()
    return f"""<div class="obar" data-o-bar aria-hidden="true" inert>
  <p class="obar-t" data-bar-txt>{L(f'20 personnes · <span class="obar-f">Boxes au bureau · </span>≈ {eur0(p["total"])}', f'20 people · <span class="obar-f">Boxes at the office · </span>≈ {eur0(p["total"]).replace("\u00a0", ",", 1) if p["total"] >= 1000 else eur0(p["total"])}')}</p>
  <a class="btn obar-go" href="#devis" data-o-go>{L("Recevoir mon devis", "Get my quote")}</a>
</div>"""


def bon():
    p = order_plan()
    return f"""<div class="bon" data-bon>
  <p class="bon-h">{L("Votre commande", "Your order")}</p>
  <p class="bon-t" data-bon-txt>{L(f"20 personnes · Boxes au bureau · {p['e']} empanadas · ≈ {eur(p['total'])}", f"20 people · Boxes at the office · {p['e']} empanadas · ≈ {eur_en(p['total'])}")}</p>
  <a class="bon-x" href="#table" data-o-go>{L("Modifier", "Change it")}</a>
</div>"""


# what each photo shows, said plainly. Never who the people are, never "our customers", "our staff" or "our shop".
ALT = {
    'p-breaking': ("Une empanada ouverte à la main, la farce fumante", "An empanada broken open by hand, the filling steaming"),
    'p-window': ("Une empanada tenue à deux mains, dorée et marquée par le feu", "An empanada held in two hands, golden and marked by the fire"),
    'p-tray': ("Trois empanadas sur un plateau avec une sauce", "Three empanadas on a tray with a sauce"),
    'p-shopfront': ("Un homme au téléphone, une empanada à la main", "A man on the phone, an empanada in hand"),
    'p-pile': ("Une pile d'empanadas ouvertes", "A pile of empanadas, broken open"),
    'p-street': ("Un homme croque une empanada dans la rue", "A man biting into an empanada in the street"),
    'p-ledge': ("Trois empanadas posées sur un muret en terre cuite", "Three empanadas on a terracotta ledge"),
    'p-pulling': ("Deux mains séparent une empanada", "Two hands pulling an empanada apart"),
    'p-tee': ("Un tee shirt Saavedra, Menos palabras y más empanadas", "A Saavedra tee, Menos palabras y más empanadas"),
    'p-serving': ("Un bras tatoué pose un plateau d'empanadas et de sauce", "A tattooed arm setting down a tray of empanadas and sauce"),
    'p-socios': ("L'affiche Para los socios del Saavedra Club", "The Para los socios del Saavedra Club poster"),
    'p-poster': ("L'affiche Menos palabras, más empanadas", "The Menos palabras, más empanadas poster"),
    'p-bag': ("Un sac en papel Saavedra et une empanada", "A Saavedra paper bag and an empanada"),
}
PH = {p['web']: p for p in json.load(open(os.path.join(HERE, 'data', 'photos.json')))}


def img(name, cls='', sizes='(max-width: 900px) 100vw, 50vw', lazy=True):
    fr, en = ALT[name]
    w, h = PH[name]['w1600']
    small = f'/media/{name}-800.jpg 800w, ' if w > 800 else ''
    return (f'<img class="{cls}" src="/media/{name}-800.jpg" srcset="{small}/media/{name}.jpg {w}w" sizes="{sizes}" width="{w}" height="{h}" '
            f'alt="{L(fr, en)}"{" loading=\"lazy\"" if lazy else ""} decoding="async">')


def prt(name, cls='', ar='4 / 5', dup=False):
    extra = ' data-dup aria-hidden="true"' if dup else ''
    return f'<figure class="print {cls}" style="--ar:{ar}"{extra}>{img(name, sizes="320px")}</figure>'


FILMS = {'fire-sun': (560, 560), 'fire-oven': (480, 640), 'fire-embers': (432, 768)}


def film(name):
    """A wood fire loop, Mixkit Free licence, no people. Never captioned, never presented as their oven. It plays only on
    screen and never under reduced motion or data saver (site.js), the still is its own first frame."""
    w, h = FILMS[name]
    return (f'<video class="film" data-film muted loop playsinline preload="none" poster="/media/film/{name}.jpg" width="{w}" height="{h}" aria-hidden="true" tabindex="-1">'
            f'<source src="/media/film/{name}.webm" type="video/webm"><source src="/media/film/{name}.mp4" type="video/mp4"></video>')


def walk():
    """The 9e from OpenStreetMap, with the walking routes from the oven, shortest first. Minutes at 5 km/h, said so."""
    r = json.load(open(os.path.join(HERE, 'data', 'routes.json')))
    routes = sorted(r['routes'], key=lambda x: x['m'])
    btns = ''.join(f'<button type="button" data-route-btn="{x["key"]}" aria-pressed="false"><b>{x["fr"]}</b><span>{x["m"]} m, {max(1, round(x["m"] / (5000 / 60)))} min</span></button>' for x in routes)
    data = json.dumps({'w': r['w'], 'h': r['h'], 'routes': [{'key': x['key'], 'm': x['m']} for x in routes]})
    mp = open(os.path.join(HERE, 'assets', 'map-9e.svg')).read().replace('<svg ', '<svg aria-hidden="true" focusable="false" ', 1)
    return f"""<script type="application/json">{data}</script>
<div class="walk-list" role="group" aria-label="{L('Itinéraires à pied depuis le restaurant', 'Walking routes from the restaurant')}">{btns}</div>""", f"""<div class="walk-map">{mp}<span class="walk-shop">48 rue Condorcet</span><div class="walk-runner" aria-hidden="true">{svg('runner.svg')}</div><span class="walk-pin" hidden aria-hidden="true">{L('Arrivé', 'There')}</span></div>"""


def menu_html():
    """Their printed card, typeset. Prices as printed, names in their spelling."""
    M = json.load(open(os.path.join(HERE, 'data', 'menu.json')))
    eur = lambda v: v.replace(' / ', ' € <span aria-hidden="true">·</span> ') + ' €'
    new = f' <span class="new">{L("nouveau", "new")}</span>'

    def items(rows, desc=True):
        out = ''
        for r in rows:
            name, fr, en, price = r[0], r[1], r[2], r[3]
            isnew = len(r) > 4 and r[4] is True
            out += f'<div class="card-item"><h3>{name}{new if isnew else ""}</h3><p class="pr">{eur(price)}</p><p>{L(fr, en)}</p></div>'
        return out
    boxes = ''.join(f'<div><b>{L(fr, en)}</b><span>{eur(pr)}</span></div>' for fr, en, pr in M['boxes']['items'])
    sec = []
    sec.append(f'''<section class="card-sec" id="carne" aria-labelledby="m-carne"><div class="ch-in"><p class="lbl"><i>Empanadas</i></p><h2 id="m-carne" style="margin-top:14px">Carne</h2><p class="note">{L(M["intro"][0], M["intro"][1])}.</p><div class="card-grid">{items(M["carne"])}</div></div></section>''')
    sec.append(f'''<section class="card-sec alt" id="verduras" aria-labelledby="m-verd"><div class="ch-in"><p class="lbl"><i>Empanadas</i></p><h2 id="m-verd" style="margin-top:14px">Verduras</h2><div class="card-grid">{items(M["verduras"])}</div><p class="note" style="margin-top:30px">{L(M["boxes"]["fr"], M["boxes"]["en"])}</p><div class="card-boxes">{boxes}</div></div></section>''')
    sec.append(f'''<section class="card-sec dark" id="formules" aria-labelledby="m-form" data-tone="dark"><div class="ch-in"><p class="lbl" style="color:var(--crema)"><i>{L("Midi", "Lunch")}</i></p><h2 id="m-form" style="margin-top:14px">{L(M["formules"]["fr"], M["formules"]["en"])}</h2><div class="card-grid">{items(M["formules"]["items"])}</div><p class="note">{L(M["formules"]["note"][0], M["formules"]["note"][1])}.</p></div></section>''')
    sec.append(f'''<section class="card-sec" id="dulces" aria-labelledby="m-dul"><div class="ch-in"><p class="lbl"><i>{L("Faits maison", "Made in house")}</i></p><h2 id="m-dul" style="margin-top:14px">Dulces y más</h2><p class="note">{L(M["dulces_intro"][0], M["dulces_intro"][1])}.</p><div class="card-grid">{items(M["dulces"])}</div><h3 class="d3" style="margin-top:50px">{L("Sauces", "Sauces")}</h3><div class="card-grid">{items(M["sauces"])}</div></div></section>''')
    sec.append(f'''<section class="card-sec alt" id="bebidas" aria-labelledby="m-beb"><div class="ch-in"><p class="lbl"><i>{L("À boire", "To drink")}</i></p><h2 id="m-beb" style="margin-top:14px">Bebidas</h2><h3 class="d3" style="margin-top:40px">Softs</h3><div class="card-grid">{items(M["softs"])}</div><h3 class="d3" style="margin-top:50px">{L("Bières et cidre", "Beers and cider")}</h3><div class="card-grid">{items(M["bieres"])}</div><h3 class="d3" style="margin-top:50px">{L("Vins, le verre et la bouteille", "Wines, by the glass and the bottle")}</h3><div class="card-grid">{items(M["vins"])}</div></div></section>''')
    return '\n'.join(sec)


def cowork():
    """The coworking map for the plan, labels placed in percent of the map so they need no script."""
    c = json.load(open(os.path.join(HERE, 'data', 'coworkings.json')))
    mp = open(os.path.join(HERE, 'assets', 'plan-cowork.svg')).read().replace('<svg ', '<svg aria-hidden="true" focusable="false" ', 1)
    W, H = c['w'], c['h']
    labs = ''
    for p in c['places']:
        if p['walk_min'] <= 9:
            x, y = p['xy']
            labs += f'<span class="pm-lab{" near" if p["walk_min"] <= 2 else ""}" style="left:{x / W * 100:.2f}%;top:{y / H * 100:.2f}%" aria-hidden="true">{html.escape(p["name"])}, {p["walk_min"]} min</span>'
    sx, sy = c['shop']
    labs += f'<span class="pm-lab near" style="left:{sx / W * 100:.2f}%;top:{sy / H * 100 + 7:.2f}%" aria-hidden="true">Saavedra</span>'
    for m in (500, 1000):
        labs += f'<span class="pm-ring-l" style="left:{(sx + m / c["radius_m"] * W / 2) / W * 100 + .6:.2f}%;top:{sy / H * 100:.2f}%" aria-hidden="true">{m if m < 1000 else "1 km"}{" m" if m < 1000 else ""}</span>'
    rows = ''.join(f'<li><b>{html.escape(p["name"])}</b><span>{p["walk_m"]} m, {p["walk_min"]} min</span></li>' for p in c['places'])
    return f'<div class="cw-wrap"><div class="pmap-wrap">{mp}{labs}</div><ul class="cw">{rows}</ul></div>'


def i18n(src):
    # one language pair never sits inside another, that once broke a form's markup
    for m in re.finditer(r'\[\[', src):
        sep, nxt = src.find('||', m.end()), src.find('[[', m.end())
        if nxt != -1 and (sep == -1 or nxt < sep):
            raise SystemExit('nested [[ ]] near: ' + src[max(0, m.start() - 60):m.start() + 120])
    def attr(m):
        fr, en = m.group(2), m.group(3)
        return f'{m.group(1)}="{fr}" data-en-{m.group(1)}="{html.escape(en, quote=True)}"'
    src = re.sub(r'([\w-]+)="\[\[(.*?)\|\|(.*?)\]\]"', attr, src, flags=re.S)

    def opt(m):
        return f'<option{m.group(1)} data-en="{html.escape(m.group(3), quote=True)}">{m.group(2)}</option>'
    src = re.sub(r'<option([^>]*)>\[\[(.*?)\|\|(.*?)\]\]</option>', opt, src, flags=re.S)

    def text(m):
        fr, en = m.group(1), m.group(2)
        tag = 'div' if (BLOCK.search(fr) or BLOCK.search(en)) else 'span'
        return f'<{tag} class="l-fr">{fr}</{tag}><{tag} class="l-en" lang="en">{en}</{tag}>'
    prev = None
    while prev != src:
        prev = src
        src = TOK.sub(text, src)
    return src


def split(s):
    m = TOK.fullmatch(s.strip())
    return (m.group(1), m.group(2)) if m else (s, s)


def header(nav):
    links = ''.join(f'<a href="{href}"{" aria-current=\"page\"" if key == nav else ""}>{L(fr, en)}</a>' for key, href, fr, en in NAV)
    lang = f'<div class="lang" role="group" aria-label="{L("Langue", "Language")}"><button type="button" data-lang="fr" aria-pressed="true">FR</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>'
    return f'''<a class="skip" href="#main">{L('Aller au contenu', 'Skip to content')}</a>
<header class="top" data-top>
  <a class="brand" href="/" aria-label="{L('Saavedra, accueil', 'Saavedra, home')}">{svg('logo.svg', 'brand-mark')}</a>
  <nav class="nav" aria-label="{L('Navigation principale', 'Main')}">{links}</nav>
  <div class="top-r">
    <a class="btn ghost top-order" href="/commander/">{L('Commander', 'Order')}</a>
    <a class="btn pri top-cta" href="/devis/">{L('Devis entreprise', 'Company quote')}</a>
    {lang}
    <button class="menu-b" type="button" aria-expanded="false" aria-controls="menu">{L('Menu', 'Menu')}</button>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="{L('Menu', 'Menu')}">{links}<a href="/commander/">{L('Commander', 'Order')}</a><a href="/devis/">{L('Devis entreprise', 'Company quote')}</a></nav>
  {lang.replace('class="lang"', 'class="lang menu-lang"')}
  <a class="menu-mail" href="mailto:{MAIL}">{MAIL}</a>
</div>'''


def bar():
    """The header of Astra's growth plan, so it never reads as one of their pages."""
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="top pl-top" data-top lang="en">
  <a class="brand" href="{FACTS['site_url']}">{svg('logo.svg', 'brand-mark')}<span class="pl-name">Growth plan <em>for Saavedra</em></span></a>
  <div class="top-r">
    <span class="pl-by">by Astra</span>
    <a class="btn pri top-cta" href="{FACTS['site_url']}">Open the new site</a>
  </div>
</header>'''


def hours_html():
    return '<br>'.join(f'{L(h["fr"], h["en"])}' for h in FACTS['hours']) if FACTS.get('hours') else L('Horaires sur Google Maps', 'Hours on Google Maps')


def live():
    """Open now, worked out in the browser from the hours they publish. Nothing at all until those hours are confirmed."""
    if not FACTS.get('hours_week'):
        return ''
    return f'<span class="live" data-live><span data-live-t>{L("Horaires", "Hours")}</span></span><script type="application/json" id="sv-hours">{re.sub(r"([\[\]])(?=[\[\]])", r"\1 ", json.dumps(FACTS["hours_week"]))}</script>'


def rating():
    r = FACTS['rating']
    return L(f"{r['google']} sur Google, {r['google_n']} avis", f"{r['google'].replace(',', '.')} on Google, {r['google_n']} reviews")


def footer():
    return f'''<footer class="foot" data-tone="dark">
  <div class="foot-in">
    <div class="foot-brand">{svg('logo.svg', 'foot-mark')}<p>{L("Fabrique d'empanadas cuites au feu de bois", 'Wood fired empanada kitchen')}<br>{ADDR}</p></div>
    <div><h2 class="fh">{L('Nous écrire', 'Write to us')}</h2><p><a href="mailto:{MAIL}">{MAIL}</a><br><a href="{MAPS}" rel="noopener">{L('Itinéraire', 'Directions')}</a></p></div>
    <div><h2 class="fh">{L('Horaires', 'Hours')}</h2><p>{hours_html()}</p></div>
    <div><h2 class="fh">{L('Entreprises', 'Companies')}</h2><p><a href="/entreprises/">{L('Boxes et déjeuners', 'Boxes and lunches')}</a><br><a href="/entreprises/#afterwork">Afterwork</a><br><a href="/privatisation/">{L('Privatisation', 'Private hire')}</a><br><a href="/devis/">{L('Demander un devis', 'Ask for a quote')}</a></p></div>
    <div><h2 class="fh">{L('Ailleurs', 'Elsewhere')}</h2><p><a href="{INSTA}" rel="noopener">Instagram</a><br><a href="{FACTS['tiktok']}" rel="noopener">TikTok</a><br><a href="{FACTS['linkedin']}" rel="noopener">LinkedIn</a></p></div>
  </div>
  <div class="foot-word" aria-hidden="true">Saavedra</div>
  <div class="foot-b"><span>© 2026 SAAVEDRA</span><span><a href="/mentions-legales/">{L('Mentions légales', 'Legal notice')}</a> &nbsp; <a href="/confidentialite/">{L('Confidentialité', 'Privacy')}</a></span></div>
</footer>'''


def page(meta, body, assets):
    t_fr, t_en = split(meta['title'])
    d_fr, d_en = split(meta['desc'])
    js = ''.join(f'<script src="/assets/{j}?v={assets[j]}" defer></script>' for j in ['site.js'] + meta.get('js', []))
    doc = f'''<!doctype html>
<html lang="{'en' if meta.get('bare') else 'fr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-en="{html.escape(t_en, quote=True)}">{t_fr}</title>
<meta name="description" content="{html.escape(d_fr, quote=True)}" data-en-content="{html.escape(d_en, quote=True)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#bde3fa">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/big-shoulders-display-normal-500-900-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v={assets['site.css']}">
<script>document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion');{'' if meta.get('bare') else "try{var l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('sv-lang');if(l==='en'||l==='fr')document.documentElement.lang=l}catch(e){}"}</script>
{js}
</head>
<body class="{meta.get('body', '')}">
{bar() if meta.get('bare') else header(meta.get('nav'))}
<main id="main">
{body}
</main>
{'' if meta.get('bare') else footer()}
</body>
</html>
'''
    return i18n(doc)


def tokens(body):
    for inc in re.findall(r'\{\{INC ([\w./-]+)\}\}', body):
        f = os.path.join(HERE, inc)
        body = body.replace('{{INC ' + inc + '}}', open(f).read() if os.path.exists(f) else f'<!-- TODO {inc} -->')
    for k, v in {'{{MAIL}}': MAIL, '{{ADDR}}': ADDR, '{{MAPS}}': MAPS, '{{ZELTY}}': ZELTY, '{{DELIVEROO}}': DELIVEROO,
                 '{{INSTA}}': INSTA, '{{AR}}': AR, '{{HOURS}}': hours_html(), '{{LIVE}}': live(), '{{UBER}}': FACTS['ubereats'],
                 '{{SIREN}}': FACTS['siren'], '{{SIRET}}': FACTS['siret'], '{{RATING}}': rating()}.items():
        body = body.replace(k, v)
    body = re.sub(r'\{\{SVG ([\w.-]+)(?: ([\w -]+))?\}\}', lambda mm: svg(mm.group(1), mm.group(2) or ''), body)
    body = re.sub(r'\{\{DEVIS (\w+)( compact)?(?: (\w+))?\}\}', lambda mm: devis(mm.group(1), bool(mm.group(2)), mm.group(3) or 'bureau'), body)
    body = re.sub(r'\{\{IMG ([\w-]+)(?: ([\w -]+))?\}\}', lambda mm: img(mm.group(1), mm.group(2) or ''), body)
    body = re.sub(r'\{\{IMG0 ([\w-]+)(?: ([\w -]+))?\}\}', lambda mm: img(mm.group(1), mm.group(2) or '', lazy=False), body)
    body = re.sub(r'\{\{PRINT ([\w-]+)(?: ([\w -]+))?\}\}', lambda mm: prt(mm.group(1), mm.group(2) or ''), body)
    body = re.sub(r'\{\{FILM ([\w-]+)\}\}', lambda mm: film(mm.group(1)), body)
    def strip(mm):
        names = mm.group(1).split(',')
        one = ''.join(prt(n) for n in names)
        two = ''.join(prt(n, dup=True) for n in names)
        return f'<div class="strip-wrap"><div class="strip">{one}{two}</div></div>'
    body = re.sub(r'\{\{STRIP ([\w,-]+)\}\}', strip, body)
    if '{{WALK' in body:
        wl, wm = walk()
        body = body.replace('{{WALKLIST}}', wl).replace('{{WALKMAP}}', wm)
    if '{{COWORK}}' in body:
        body = body.replace('{{COWORK}}', cowork())
    if '{{MENU}}' in body:
        body = body.replace('{{MENU}}', menu_html())
    for tok, fn in (('{{MINI}}', mini), ('{{HEADCOUNT}}', headcount), ('{{HEADLINE}}', headline), ('{{TABLE}}', table), ('{{PERHEAD}}', perhead), ('{{OBAR}}', orderbar), ('{{BON}}', bon)):
        if tok in body:
            body = body.replace(tok, fn())
    body = body.replace('{{MAP}}', open(os.path.join(HERE, 'assets', 'map-9e.svg')).read().replace('<svg ', '<svg aria-hidden="true" focusable="false" ', 1))
    return body


def build():
    for d in (OUT, OUT2):
        if os.path.isdir(d):
            shutil.rmtree(d)
    os.makedirs(os.path.join(OUT, 'assets'))
    shutil.copytree(os.path.join(HERE, 'fonts'), os.path.join(OUT, 'fonts'), ignore=shutil.ignore_patterns('OFL-*'))
    assets = {}
    for f in sorted(glob.glob(os.path.join(HERE, 'assets', '*'))):
        if os.path.isdir(f):
            continue
        name = os.path.basename(f)
        shutil.copy(f, os.path.join(OUT, 'assets', name))
        assets[name] = hashlib.sha1(open(f, 'rb').read()).hexdigest()[:8]
    css = ''.join(open(p).read() for p in sorted(glob.glob(os.path.join(HERE, 'css', '*.css'))))
    css = open(os.path.join(HERE, 'fonts', 'fonts.css')).read() + css
    open(os.path.join(OUT, 'assets', 'site.css'), 'w').write(css)
    assets['site.css'] = hashlib.sha1(css.encode()).hexdigest()[:8]
    for p in sorted(glob.glob(os.path.join(HERE, 'js', '*.js'))):
        name = os.path.basename(p)
        shutil.copy(p, os.path.join(OUT, 'assets', name))
        assets[name] = hashlib.sha1(open(p, 'rb').read()).hexdigest()[:8]
    media = os.path.join(HERE, 'media')
    if os.path.isdir(media):
        shutil.copytree(media, os.path.join(OUT, 'media'), ignore=shutil.ignore_patterns('plan'))
    for src in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        raw = open(src).read()
        m = re.match(r'<!--(.*?)-->\s*', raw, re.S)
        meta = json.loads(m.group(1))
        body = tokens(raw[m.end():])
        out = os.path.join(OUT2 if meta.get('bare') else OUT, meta['path'])
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, 'w').write(page(meta, body, assets))
        print('wrote', ('plan/' if meta.get('bare') else '') + meta['path'], os.path.getsize(out))
    if os.path.exists(os.path.join(OUT2, 'index.html')):
        shutil.copytree(os.path.join(OUT, 'assets'), os.path.join(OUT2, 'assets'))
        shutil.copytree(os.path.join(OUT, 'fonts'), os.path.join(OUT2, 'fonts'))
        if os.path.isdir(os.path.join(media, 'plan')):
            shutil.copytree(os.path.join(media, 'plan'), os.path.join(OUT2, 'media', 'plan'))
        # the photos the plan's draft posts use, nothing else of the site's media
        plan_src = open(os.path.join(OUT2, 'index.html')).read()
        for name in sorted(set(re.findall(r'/media/(p-[\w-]+\.jpg)', plan_src))):
            shutil.copy(os.path.join(media, name), os.path.join(OUT2, 'media', name))
    for d in (OUT, OUT2):
        if os.path.isdir(d):
            open(os.path.join(d, 'netlify.toml'), 'w').write(
                '[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')


if __name__ == '__main__':
    build()
