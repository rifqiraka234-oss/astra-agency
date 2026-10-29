#!/usr/bin/env python3
"""Healthy Secrets site. Assembles build/pages/*.html into site/.

Each page source starts with <!--{"title": "[[DE||EN]]", "desc": "[[DE||EN]]", "nav": "key", "body": "class"}-->.
Copy is bilingual inline, [[Deutsch||English]]. Inline text becomes two spans, text holding block tags becomes two
divs, attr="[[..||..]]" becomes attr plus data-i18n-attr for the English, and <option>[[..||..]]</option> carries its
English in data-en. German is the default and the no-JS state; site.js swaps the language.
Product data lives here once and feeds the cards, the detail dialogs and the JSON the cart reads.
"""
import glob
import hashlib
import html
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'site')

MAIL = 'office@healthysecrets.at'
IG = 'https://www.instagram.com/healthysecrets_at/'
AGB = 'https://www.healthysecrets.at/_files/ugd/aadec6_21d69f4689574c8d8bbbda35919084d6.pdf'
DSE = 'https://www.healthysecrets.at/_files/ugd/aadec6_8088b901b25d40f19378549a0a58b8ca.pdf'
MAPS = 'https://www.google.com/maps/search/?api=1&query=Wildpretmarkt+1%2C+1010+Wien'

# ---------------------------------------------------------------- icons
def svg(body, vb='0 0 24 24', cls='ic'):
    return f'<svg class="{cls}" viewBox="{vb}" aria-hidden="true" focusable="false">{body}</svg>'

ICONS = {
    'ar': svg('<path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
    'bag': svg('<path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'),
    'pin': svg('<path d="M12 21s-6.5-6.2-6.5-11.2A6.5 6.5 0 0 1 18.5 9.8C18.5 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="9.8" r="2.3" fill="none" stroke="currentColor" stroke-width="1.7"/>'),
    'clock': svg('<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'),
    'truck': svg('<path d="M3 6.5h11v9H3zM14 10h3.6l3 3v2.5H14z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.8" fill="var(--bg,#fff)" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="17.5" r="1.8" fill="var(--bg,#fff)" stroke="currentColor" stroke-width="1.7"/>'),
    'key': svg('<circle cx="8" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10.6 10.6L20 20M16.5 16.5l2-2M14 14l2-2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'),
    'check': svg('<path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
    'x': svg('<path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
    'plus': svg('<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
    'minus': svg('<path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
    'paw': svg('<ellipse cx="12" cy="15.5" rx="4.2" ry="3.6" fill="currentColor"/><circle cx="6.2" cy="10.5" r="1.9" fill="currentColor"/><circle cx="9.6" cy="6.8" r="1.9" fill="currentColor"/><circle cx="14.4" cy="6.8" r="1.9" fill="currentColor"/><circle cx="17.8" cy="10.5" r="1.9" fill="currentColor"/>'),
    'ig': svg('<rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="16.8" cy="7.2" r="1.1" fill="currentColor"/>'),
    'mail': svg('<rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'),
    'sun': svg('<circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'),
    'moon': svg('<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z" fill="currentColor"/>'),
    'spark': svg('<path d="M12 3l1.8 6.2L20 12l-6.2 1.8L12 21l-1.8-7.2L4 12l6.2-2.8z" fill="currentColor"/>'),
}

AWNING = '<div class="awning" aria-hidden="true"><div class="awning-in"></div></div>'

# ---------------------------------------------------------------- products (from the product pages, 19 Oct 2026)
# Claims left out on purpose, see research.md section B. Ingredients, sizes, preparation and their own warnings only.
SLOTS = {
    'morgen': ('8 Uhr', '8 am', 'Morgens', 'Morning'),
    'nachmittag': ('15 Uhr', '3 pm', 'Nachmittags', 'Afternoon'),
    'abend': ('19 Uhr', '7 pm', 'Nach dem Essen', 'After dinner'),
    'nacht': ('22 Uhr', '10 pm', 'Vor dem Schlafen', 'Before bed'),
}

PRODUCTS = [
    dict(id='muesli', jar=True, slot='morgen', img='p-muesli', price=9.5, ribbon=('Best Seller', 'Best seller'), cat=('Granola', 'Granola'),
         name='Omega 3 Müsli Red Berry Mix', size=('300 g', '300 g'), portions=0,
         lead=('Knusprig wie jedes Knuspermüsli. Nur kommt das Knusprige bei uns aus Rapsöl, ganz ohne Kokosfett oder Palmöl.',
               "As crunchy as any crunchy granola. Ours just gets its crunch from rapeseed oil, with no coconut fat or palm oil."),
         rows=[(('Zutaten', 'Ingredients'), ('bio Haferflocken, bio Dinkelpops, Rapsöl, bio Ahornsirup, bio Kleie, gefriergetrocknete Beeren, Vanille',
                                             'organic oat flakes, organic spelt pops, rapeseed oil, organic maple syrup, organic bran, freeze dried berries, vanilla')),
               (('Allergene', 'Allergens'), ('Gluten', 'Gluten'))]),
    dict(id='brot', jar=False, slot='morgen', img='p-brot', price=9.5, ribbon=None, cat=('Backmischung', 'Baking mix'),
         name='Haferbrot Backmischung', size=('500 g', '500 g'), portions=0,
         lead=('Haferbrot zum Selberbacken. Dazu kommen nur 500 g Magertopfen und 2 Eier.',
               "Oat bread you bake yourself. All you add is 500 g of low fat quark and 2 eggs."),
         rows=[(('Zutaten', 'Ingredients'), ('Haferflocken Großblatt, Haferflocken Kleinblatt, Kümmel, Fenchel, Koriander',
                                             'large oat flakes, small oat flakes, caraway, fennel, coriander')),
               (('Zubereitung', 'How to bake'), ('<ol><li>Backmischung mit 500 g Magertopfen und 2 Eiern zu einem Teig verrühren.</li><li>Kastenform mit Backpapier auslegen, Teig einfüllen und gleichmäßig andrücken.</li><li>Wer mag, streut noch Haferflocken drüber.</li><li>Bei 180 °C auf mittlerer Schiene etwa 50 Minuten backen.</li><li>Aus der Form lösen und abkühlen lassen.</li></ol>',
                                                 '<ol><li>Stir the mix with 500 g of low fat quark and 2 eggs into a dough.</li><li>Line a loaf tin with baking paper, fill it and press the dough down evenly.</li><li>Sprinkle oat flakes on top if you like.</li><li>Bake at 180 °C on the middle shelf for about 50 minutes.</li><li>Take it out of the tin and let it cool.</li></ol>')),
               (('Unser Tipp', 'Our tip'), ('Zwei fein geriebene Karotten oder ein Apfel im Teig machen das Brot noch saftiger.',
                                            "Two finely grated carrots or an apple in the dough make the bread even juicier.")),
               (('Gut zu wissen', 'Good to know'), ('Enthält Gluten. Das fertige Brot enthält Topfen und Eier, also ab in den Kühlschrank. Dort hält es 3 bis 4 Tage.',
                                                    "Contains gluten. The baked loaf has quark and eggs in it, so keep it in the fridge, where it lasts 3 to 4 days."))]),
    dict(id='matcha', jar=False, slot='nachmittag', img='p-matcha', price=44.0, ribbon=None, cat=('Fibre Flow Drinks', 'Fibre Flow drinks'),
         name='Matcha Latte Fibre Flow', size=('215 g, 14 Portionen', '215 g, 14 servings'), portions=14,
         lead=('Japanischer Bio Matcha mit Bourbon Vanille und teilhydrolysiertem Guarkernmehl, einem löslichen Ballaststoff. Warm oder auf Eis.',
               "Organic Japanese matcha with bourbon vanilla and partially hydrolysed guar gum, a soluble fibre. Hot or iced."),
         rows=[(('Zutaten', 'Ingredients'), ('Japanischer Bio Matcha, teilhydrolysiertes Guarkernmehl, Kokosblütenzucker, Bourbon Vanille',
                                             'organic Japanese matcha, partially hydrolysed guar gum, coconut blossom sugar, bourbon vanilla')),
               (('Zubereitung', 'How to make it'), ('1 Messlöffel (liegt bei) auf 250 ml Flüssigkeit. Pflanzendrink, Milch oder was dir sonst schmeckt.',
                                                    "1 scoop (it's in the pack) to 250 ml of liquid. Plant drink, milk or whatever else you like.")),
               (('Allergene', 'Allergens'), ('Glutenfrei, laktosefrei, vegan. Ohne Farbstoffe und Konservierungsmittel.',
                                             'Gluten free, lactose free, vegan. No colourings or preservatives.'))]),
    dict(id='chai', jar=False, slot='nachmittag', img='p-chai', price=25.0, ribbon=('Neu', 'New'), cat=('Fibre Flow Drinks', 'Fibre Flow drinks'),
         name='Chai Latte Fibre Flow', size=('215 g, 14 Portionen', '215 g, 14 servings'), portions=14,
         lead=('Chaigewürze auf cremiger Haferbasis, dazu teilhydrolysiertes Guarkernmehl. Pflanzlich und vegan.',
               "Chai spices on a creamy oat base, with partially hydrolysed guar gum. Plant based and vegan."),
         rows=[(('Zutaten', 'Ingredients'), ('Teilhydrolysiertes Guarkernmehl, Haferpulver, Kokosblütenzucker, Kardamom, Zimt, Ingwer, Muskatnuss, Reishipulver, Nelken, Sternanis, Pfeffer',
                                             'partially hydrolysed guar gum, oat powder, coconut blossom sugar, cardamom, cinnamon, ginger, nutmeg, reishi powder, cloves, star anise, pepper')),
               (('Zubereitung', 'How to make it'), ('1 Messlöffel (liegt bei) auf 250 ml Flüssigkeit. Pflanzendrink, Milch oder was dir sonst schmeckt.',
                                                    "1 scoop (it's in the pack) to 250 ml of liquid. Plant drink, milk or whatever else you like.")),
               (('Allergene', 'Allergens'), ('Kann Spuren von Soja, Laktose, Schalenfrüchten, Sellerie und Senf enthalten.',
                                             'May contain traces of soy, lactose, tree nuts, celery and mustard.'))]),
    dict(id='slim', jar=True, slot='abend', img='p-slim', price=12.0, ribbon=None, cat=('Teemischungen', 'Tea blends'),
         name='Slimming Sips', size=('50 g', '50 g'), portions=0,
         lead=('Unser Tee für nach dem Abendessen. Grüner Kaffee, Mate und weißer Tee mit Ingwer und Zimt, alles bio.',
               "Our tea for after dinner. Green coffee, mate and white tea with ginger and cinnamon, all organic."),
         rows=[(('Zutaten', 'Ingredients'), ('Grüner Kaffee, weißer Tee, Mate, Ingwer, Zimt. Alle Zutaten aus biologischem Anbau.',
                                             'green coffee, white tea, mate, ginger, cinnamon. Every ingredient is organically grown.')),
               (('Gut zu wissen', 'Good to know'), ('Enthält Koffein. Für Kinder, Schwangere und Stillende nicht empfohlen.',
                                                    "Contains caffeine. Not recommended for children or if you're pregnant or breastfeeding."))]),
    dict(id='moon', jar=False, slot='nacht', img='p-moon', price=25.0, ribbon=('Best Seller', 'Best seller'), cat=('Fibre Flow Drinks', 'Fibre Flow drinks'),
         name='Moon Milk Fibre Flow', size=('215 g, 14 Portionen', '215 g, 14 servings'), portions=14,
         lead=('Goldene Moon Milk mit Kurkuma und warmen Gewürzen, auf Basis von teilhydrolysiertem Guarkernmehl.',
               "Golden moon milk with turmeric and warming spices, made on a base of partially hydrolysed guar gum."),
         rows=[(('Zutaten', 'Ingredients'), ('Teilhydrolysiertes Guarkernmehl, Kurkuma, Zimt, Ingwer, Muskatnuss, Kardamom, Pfeffer',
                                             'partially hydrolysed guar gum, turmeric, cinnamon, ginger, nutmeg, cardamom, pepper')),
               (('Zubereitung', 'How to make it'), ('1 Messlöffel (liegt bei) auf 250 ml Flüssigkeit, dazu ein Süßmittel deiner Wahl.',
                                                    "1 scoop (it's in the pack) to 250 ml of liquid, sweetened however you like.")),
               (('Allergene', 'Allergens'), ('Kann Sellerie enthalten.', 'May contain celery.'))]),
    dict(id='lullaby', jar=True, slot='nacht', img='p-lullaby', price=12.0, ribbon=None, cat=('Teemischungen', 'Tea blends'),
         name='Lullaby Leaves', size=('50 g', '50 g'), portions=0,
         lead=('Kräutertee für den Abend, mit Johanniskraut, Zitronenmelisse und Lavendel.',
               "An evening herbal tea with St John's wort, lemon balm and lavender."),
         rows=[(('Zutaten', 'Ingredients'), ('Johanniskraut, Zitronenmelisse, Lavendel', "St John's wort, lemon balm, lavender")),
               (('Gut zu wissen', 'Good to know'), ('Johanniskraut kann Wechselwirkungen mit bestimmten Arzneimitteln verursachen. Frag im Zweifel deine Ärztin, deinen Arzt oder die Apotheke.',
                                                    "St John's wort can interact with certain medicines. If you're unsure, ask your doctor or pharmacist."))]),
]
PBY = {p['id']: p for p in PRODUCTS}


def eur(v):
    return f'{v:.2f}'.replace('.', ',') + ' €'


def L(de, en):
    return f'[[{de}||{en}]]'


def per_portion(p):
    if not p['portions']:
        return ''
    v = p['price'] / p['portions']
    return L(f'{eur(v)} pro Tasse', f'{eur(v)} a cup')


def pcard(pid, size='m'):
    p = PBY[pid]
    s = SLOTS[p['slot']]
    rib = f'<span class="rib">{L(*p["ribbon"])}</span>' if p['ribbon'] else ''
    pp = per_portion(p)
    rows = ''.join(f'<div class="pd-row"><dt>{L(*k)}</dt><dd>{L(*v)}</dd></div>' for k, v in p['rows'])
    return f'''<article class="pcard pc-{size} rv" data-pid="{pid}" data-slot="{p['slot']}">
  <div class="pc-img"><img src="assets/img/{p['img']}.webp" width="900" height="{'900' if pid == 'chai' else '1125'}" loading="lazy" alt="{L(p['name'] + (' im Glas' if p['jar'] else ', Beutel'), p['name'] + (' jar' if p['jar'] else ' pouch'))}">{rib}<span class="pc-slot">{ICONS['clock']}{L(s[0], s[1])}</span></div>
  <div class="pc-body">
    <div class="pc-head"><p class="pc-cat">{L(*p['cat'])}</p>
    <h3 class="pc-name"><button type="button" class="pc-open" data-open="{pid}">{p['name']}</button></h3>
    <p class="pc-size">{L(*p['size'])}</p></div>
    <p class="pc-lead">{L(*p['lead'])}</p>
    <div class="pc-buy"><p class="pc-price"><strong>{eur(p['price'])}</strong><span>{L('inkl. Versand', 'shipping included')}</span>{'<span class="pc-pp">' + pp + '</span>' if pp else ''}</p>
    <button type="button" class="btn add" data-add="{pid}">{ICONS['plus']}<span>{L('In meinen Tag', 'Add to my day')}</span></button></div>
    <details class="pd"><summary>{L('Zutaten und Zubereitung', 'Ingredients and how to use')}</summary><dl>{rows}</dl></details>
  </div>
</article>'''


def pdata():
    d = {p['id']: dict(name=p['name'], price=p['price'], img=p['img'], slot=p['slot'], portions=p['portions'],
                       size=p['size'], time=SLOTS[p['slot']][:2]) for p in PRODUCTS}
    return '<script type="application/json" id="pdata">' + json.dumps(d, ensure_ascii=False) + '</script>'


# ---------------------------------------------------------------- shared furniture
NAV = [('club.html', 'club', ('Gut Health Club', 'Gut Health Club')),
       ('shop.html', 'shop', ('Shop', 'Shop')),
       ('beratung.html', 'beratung', ('Beratung', 'Dietitian')),
       ('wissen.html', 'wissen', ('Wissen', 'Know how')),
       ('ueber-uns.html', 'ueber', ('Über uns', 'About us')),
       ('handel.html', 'handel', ('Handel', 'Wholesale'))]


def header(cur):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{L(*t)}</a>' for h, k, t in NAV)
    mlinks = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{L(*t)}</a>' for h, k, t in NAV)
    return f'''<a class="skip" href="#main">{L('Zum Inhalt', 'Skip to content')}</a>
<header class="hdr"><div class="hdr-in">
  <a class="brand" href="index.html" aria-label="{L('Healthy Secrets, zur Startseite', 'Healthy Secrets, home')}"><img src="assets/img/logo-gold.webp" width="600" height="497" alt=""><span class="bw">Healthy Secrets<small>Gesundheit is(s)t Alltag</small></span></a>
  <nav class="nav" aria-label="{L('Hauptnavigation', 'Main')}">{links}</nav>
  <div class="tools">
    <a class="status" href="club.html#anfahrt">{ICONS['clock']}{L('Ab 10 Uhr, Wildpretmarkt 1', 'From 10 am, Wildpretmarkt 1')}</a>
    <div class="lang" role="group" aria-label="{L('Sprache', 'Language')}"><button type="button" data-lang="de" aria-pressed="true">DE</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>
    <button type="button" class="cart-btn" aria-controls="cart" aria-expanded="false">{ICONS['bag']}<span class="vh">{L('Dein Tag, Warenkorb öffnen', 'Your day, open the basket')}</span><span class="cart-n" aria-hidden="true">0</span></button>
    <button type="button" class="menu-btn" aria-expanded="false" aria-controls="mnav"><span class="vh">{L('Menü', 'Menu')}</span><i></i><i></i></button>
  </div>
</div></header>
<nav class="mnav" id="mnav" aria-label="{L('Menü', 'Menu')}"><a href="index.html">{L('Start', 'Home')}</a>{mlinks}<a href="kasse.html">{L('Dein Tag, zur Kasse', 'Your day, checkout')}</a></nav>'''


CART = f'''<div class="scrim" data-close hidden></div>
<aside class="drawer" id="cart" aria-labelledby="cartT" aria-modal="true" role="dialog" hidden>
  <div class="dr-hd"><div><p class="eyebrow">{L('Warenkorb', 'Basket')}</p><h2 id="cartT" class="d3">{L('Dein Tag', 'Your day')}</h2></div><button type="button" class="icon-btn" data-close>{ICONS['x']}<span class="vh">{L('Schließen', 'Close')}</span></button></div>
  <div class="dr-body" id="cartBody"></div>
  <div class="dr-ft" id="cartFt">
    <dl class="sum"><div><dt>{L('Zwischensumme', 'Subtotal')}</dt><dd id="cartSub">0,00 €</dd></div><div><dt>{L('Versand in Österreich', 'Shipping in Austria')}</dt><dd>{L('inklusive', 'included')}</dd></div></dl>
    <a class="btn wide" href="kasse.html">{L('Zur Kasse', 'Checkout')} {ICONS['ar']}</a>
    <p class="fine">{L('Versand mit der Österreichischen Post. Rückgabe ungeöffnet binnen 14 Tagen.', 'Sent with Austrian Post. Unopened returns within 14 days.')}</p>
  </div>
</aside>
<dialog class="pdlg" id="pdlg" aria-labelledby="pdlgT"><div class="pdlg-in" id="pdlgIn"></div></dialog>
<div class="toast" id="toast" role="status" aria-live="polite"></div>'''

FOOTER = f'''<footer class="ftr"><div class="wrap">
  <div class="ftr-top"><p class="ftr-claim">Gesundheit is<span class="ss">(s)</span>t Alltag.</p><a class="btn ghost" href="{IG}" rel="noopener" target="_blank">{ICONS['ig']}<span>@healthysecrets_at</span></a></div>
  <div class="cols">
    <div class="f-brand"><img src="assets/img/logo-gold.webp" width="600" height="497" alt="Healthy Secrets" loading="lazy"><p>{L('Lebensmittel, ärztlich und ernährungsmedizinisch entwickelt. Von drei Geschwistern selbst gemacht, in Wien.', 'Food developed with medical and dietetic expertise. Made by three siblings themselves, in Vienna.')}</p></div>
    <div><h2>Gut Health Club</h2><ul><li>Wildpretmarkt 1<br>1010 Wien</li><li>{L('Ab 10 Uhr', 'From 10 am')}</li><li><a href="club.html#anfahrt">{L('Anfahrt', 'Getting here')}</a></li><li><a href="club.html#termine">{L('Workshops und Kurse', 'Workshops and classes')}</a></li></ul></div>
    <div><h2>Shop</h2><ul><li><a href="shop.html#morgen">{L('Granola und Brot', 'Granola and bread')}</a></li><li><a href="shop.html#nachmittag">Fibre Flow Drinks</a></li><li><a href="shop.html#abend">{L('Tee', 'Tea')}</a></li><li><a href="shop.html#planer">{L('Tagesplaner', 'Day planner')}</a></li><li><a href="shop.html#versand">{L('Versand und Rückgabe', 'Shipping and returns')}</a></li></ul></div>
    <div><h2>Healthy Secrets</h2><ul><li><a href="ueber-uns.html">{L('Über uns', 'About us')}</a></li><li><a href="beratung.html">{L('Ernährungstherapie', 'Nutrition therapy')}</a></li><li><a href="wissen.html">{L('Wissen', 'Know how')}</a></li><li><a href="handel.html">{L('Für Handel und Apotheken', 'For shops and pharmacies')}</a></li><li><a href="mailto:{MAIL}">{MAIL}</a></li></ul></div>
  </div>
  <div class="bot"><span>© 2026 Healthy Secrets OG, Wien</span><span class="legal"><a href="impressum.html">Impressum</a><a href="{AGB}" rel="noopener" target="_blank">AGB</a><a href="{DSE}" rel="noopener" target="_blank">{L('Datenschutz', 'Privacy')}</a></span></div>
</div></footer>'''


def ver(asset):
    # content hash in the URL, so a browser holding an older copy can't pair it with new markup
    with open(os.path.join(OUT, 'assets', asset), 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:10]


def page(meta, body, name):
    tde, ten = split(meta['title'])
    dde, den = split(meta['desc'])
    full_de = tde if tde.startswith('Healthy Secrets') else f'{tde} | Healthy Secrets'
    full_en = ten if ten.startswith('Healthy Secrets') else f'{ten} | Healthy Secrets'
    return f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{full_de}</title>
<meta name="description" content="{html.escape(dde)}">
<meta name="title-en" content="{html.escape(full_en)}">
<meta name="description-en" content="{html.escape(den)}">
<meta property="og:title" content="{html.escape(full_de)}">
<meta property="og:description" content="{html.escape(dde)}">
<meta property="og:image" content="assets/img/siblings.webp">
<meta name="theme-color" content="#FBDCE2">
<meta name="robots" content="noindex">
<link rel="icon" type="image/png" href="assets/img/favicon.png">
<link rel="preload" href="assets/fonts/jost-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/jost-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css?v={ver('site.css')}">
<script>document.documentElement.classList.add('js');try{{var l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('hs-lang');if(l==='en'||l==='de')document.documentElement.lang=l}}catch(e){{}}</script>
</head>
<body class="{meta.get('body', '')}">
{header(meta.get('nav', ''))}
<main id="main">
{body}
</main>
{FOOTER}
{CART}
{pdata()}
<script src="assets/site.js?v={ver('site.js')}" defer></script>
</body>
</html>
'''


# ---------------------------------------------------------------- bilingual expansion
BLOCK = re.compile(r'<(p|div|h[1-6]|ul|ol|li|figure|section|table|blockquote|form|fieldset|dl|article)\b')
TOK = re.compile(r'\[\[(.*?)\|\|(.*?)\]\]', re.S)


def split(s):
    m = TOK.fullmatch(s.strip())
    return (m.group(1), m.group(2)) if m else (s, s)


def expand(src):
    # attributes first, attr="[[de||en]]"
    def attr(m):
        a, de, en = m.group(1), m.group(2), m.group(3)
        return f'{a}="{de}" data-i18n-{a}="{html.escape(en, quote=True)}"'
    src = re.sub(r'([\w-]+)="\[\[(.*?)\|\|(.*?)\]\]"', attr, src, flags=re.S)

    # <option ...>[[de||en]]</option>
    def opt(m):
        return f'<option{m.group(1)} data-en="{html.escape(m.group(3), quote=True)}">{m.group(2)}</option>'
    src = re.sub(r'<option([^>]*)>\[\[(.*?)\|\|(.*?)\]\]</option>', opt, src, flags=re.S)

    def text(m):
        de, en = m.group(1), m.group(2)
        tag = 'div' if (BLOCK.search(de) or BLOCK.search(en)) else 'span'
        return f'<{tag} class="l-de">{de}</{tag}><{tag} class="l-en" lang="en">{en}</{tag}>'
    prev = None
    while prev != src:  # tokens can wrap tokens that sit inside attributes only, so one pass normally suffices
        prev = src
        src = TOK.sub(text, src)
    return src


def tokens(body):
    body = body.replace('{{AWNING}}', AWNING).replace('{{MAIL}}', MAIL).replace('{{IG}}', IG)
    body = body.replace('{{AGB}}', AGB).replace('{{DSE}}', DSE).replace('{{MAPS}}', MAPS)
    if '{{MAP}}' in body:
        body = body.replace('{{MAP}}', open(os.path.join(HERE, 'map.svg')).read())
    body = re.sub(r'\{\{I:(\w+)\}\}', lambda m: ICONS[m.group(1)], body)
    body = re.sub(r'\{\{PCARD:(\w+)(?::(\w))?\}\}', lambda m: pcard(m.group(1), m.group(2) or 'm'), body)
    body = body.replace('{{PGRID}}', ''.join(pcard(p['id']) for p in PRODUCTS))
    body = re.sub(r'\{\{PRICE:(\w+)\}\}', lambda m: eur(PBY[m.group(1)]['price']), body)
    return body


def main():
    n = 0
    for f in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        src = open(f).read()
        m = re.match(r'\s*<!--(\{.*?\})-->\s*', src, re.S)
        meta = json.loads(m.group(1))
        body = tokens(src[m.end():])
        left = re.findall(r'\{\{[^}]*\}\}', body)
        assert not left, (f, left)
        out = expand(page(meta, body, os.path.basename(f)))
        bad = re.findall(r'\[\[|\]\]', out)
        assert not bad, (f, 'unexpanded token')
        open(os.path.join(OUT, os.path.basename(f)), 'w').write(out)
        n += 1
    print('built', n, 'pages')


if __name__ == '__main__':
    main()
