#!/usr/bin/env python3
"""Builds two sites from one design system.
   ../site-hp   Hooft & Petiet   NL at /, EN at /en/
   ../site-rs   ReShare Living Group   NL at /, EN at /en/
Copy lives here, every fact traced in ../research/research.md. No dependencies beyond Python 3."""
import os, json, shutil, html as H

B = os.path.dirname(os.path.abspath(__file__))
OUT = {'hp': os.path.join(B, '..', 'site-hp'), 'rs': os.path.join(B, '..', 'site-rs')}
URL = {'hp': 'https://astra-hooftenpetiet-prototype.netlify.app', 'rs': 'https://astra-reshare-prototype.netlify.app'}
MAN = json.load(open(os.path.join(B, 'media', 'manifest.json')))
LANG = 'nl'

def t(nl, en): return nl if LANG == 'nl' else en
def esc(s): return H.escape(s, quote=True)
def root(): return '/' if LANG == 'nl' else '/en/'

def pic(key, alt, sizes='100vw', cls='', eager=False, extra=''):
    m = MAN[key]
    files = sorted(zip(m['files'], m['sizes']), key=lambda x: x[1][0])
    srcset = ', '.join('/%s %dw' % (f, s[0]) for f, s in files)
    big = files[-1]
    w, h = big[1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    return ('<img src="/%s" srcset="%s" sizes="%s" width="%d" height="%d" alt="%s" loading="%s" decoding="async"%s%s>'
            % (files[0][0] if len(files) > 1 else big[0], srcset, sizes, w, h, esc(alt), load,
               (' class="%s"' % cls) if cls else '', extra))

HOUSE = ('<svg viewBox="0 0 160 182" aria-hidden="true" focusable="false"><polygon points="0,60 80,0 160,60" fill="#C8D020"/>'
         '<rect x="27" y="74" width="106" height="106" fill="#C8D020"/>'
         '<text x="80" y="155" text-anchor="middle" font-family="Instrument Sans,Arial,sans-serif" font-weight="700" font-size="88" fill="#1B1546">&amp;</text></svg>')
FAV_HP = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 182'%3E%3Cpolygon points='0,60 80,0 160,60' fill='%23C8D020'/%3E"
          "%3Crect x='27' y='74' width='106' height='106' fill='%23C8D020'/%3E%3Ctext x='80' y='155' text-anchor='middle' font-family='Arial' font-weight='700' font-size='88' fill='%231B1546'%3E%26amp;%3C/text%3E%3C/svg%3E")
FAV_RS = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='38' fill='none' stroke='%232FA597' stroke-width='12'/%3E"
          "%3Ccircle cx='50' cy='12' r='11' fill='%231B1546'/%3E%3C/svg%3E")

def head(site, title, desc, path):
    other = {'nl': 'en', 'en': 'nl'}[LANG]
    fav = FAV_HP if site == 'hp' else FAV_RS
    css = '/css/hp.css' if site == 'hp' else '/css/rs.css'
    return f'''<!doctype html>
<html lang="{LANG}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#120E33">
<link rel="icon" href="{fav}">
<link rel="alternate" hreflang="{other}" href="{URL[site]}{path[other]}">
<link rel="preload" href="/fonts/fraunces-latin-full-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/instrument-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="{css}">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body>
<a class="skip" href="#main">{t('Naar de inhoud', 'Skip to content')}</a>
'''

def langsw(path):
    return ('<div class="lang" role="group" aria-label="%s">' % t('Taal', 'Language') +
            ''.join('<a href="%s" lang="%s" hreflang="%s"%s><span>%s</span></a>' % (path[l], l, l, ' aria-current="true"' if l == LANG else '', l.upper()) for l in ('nl', 'en')) + '</div>')

# ---------------------------------------------------------------- Hooft & Petiet

def hp_header(path, light=False):
    r = root()
    q = r + t('offerte/', 'quote/')
    vs = r + t('verkoopstyling/', 'sales-styling/')
    links = [(r + '#diensten', t('Diensten', 'Services'), 'hide-s'), (r + '#beheer', t('Beheer', 'Management'), 'hide-m'),
             (r + '#projecten', t('Projecten', 'Projects'), 'hide-m'), (vs, t('Verkoopstyling', 'Sales styling'), 'hide-s')]
    nav = ''.join('<a class="%s" href="%s">%s</a>' % (c, h, l) for h, l, c in links)
    mnav = ''.join('<a href="%s">%s</a>' % (h, l) for h, l, c in links) + '<a href="%s">ReShare Living Group</a><a href="%s">%s</a>' % (URL['rs'] + ('/' if LANG == 'nl' else '/en/'), q, t('Offerte aanvragen', 'Request a quote'))
    return f'''<header class="hdr{' light-start' if light else ''}"><div class="wrap hdr-in">
<a class="logo" href="{r}" aria-label="Hooft &amp; Petiet, {t('home', 'home')}"><img class="on-dark" src="/media/logo-hp-white.png" width="700" height="187" alt="Hooft &amp; Petiet"><img class="on-light" src="/media/logo-hp.png" width="700" height="208" alt="Hooft &amp; Petiet"></a>
<nav class="nav" aria-label="{t('Hoofdmenu', 'Main menu')}">{nav}<span class="hide-s">{langsw(path)}</span><a class="btn btn-accent hide-s" href="{q}">{t('Offerte aanvragen', 'Request a quote')}</a><button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav">{t('Menu', 'Menu')}</button></nav>
</div></header>
<div class="mnav" id="mnav" aria-hidden="true"><button class="close" type="button">{t('Sluiten', 'Close')}</button>{mnav}{langsw(path)}</div>
'''

def hp_footer(path):
    r = root()
    return f'''<footer class="ftr"><div class="wrap">
<div class="ftr-grid">
<div><img src="/media/logo-hp-white.png" width="700" height="187" alt="Hooft &amp; Petiet" style="height:40px;width:auto"><p style="max-width:34ch;margin-top:22px">{t('Projectinrichting en meubelverhuur sinds 2010. Onderdeel van ReShare Living Group.', 'Project furnishing and furniture rental since 2010. Part of ReShare Living Group.')}</p></div>
<div><h3>{t('Diensten', 'Services')}</h3><ul>
<li><a href="{r}#tijdelijk">{t('Logeerwoningen en rustwoningen', 'Guest homes and rest homes')}</a></li>
<li><a href="{r}#diensten">{t('Wisselwoningen', 'Swap homes')}</a></li>
<li><a href="{r}#diensten">{t('Calamiteitenwoningen', 'Emergency homes')}</a></li>
<li><a href="{r}#diensten">{t('Expatwoningen', 'Expat homes')}</a></li>
<li><a href="{r}{t('verkoopstyling/', 'sales-styling/')}">{t('Verkoopstyling', 'Sales styling')}</a></li>
<li><a href="{r}#beheer">{t('Beheer', 'Management')}</a></li></ul></div>
<div><h3>{t('Groep', 'Group')}</h3><ul>
<li><a href="{URL['rs']}{'/' if LANG == 'nl' else '/en/'}">ReShare Living Group</a></li>
<li><a href="https://www.keypro.nl/" rel="noopener">KeyPro</a></li>
<li><a href="{r}#projecten">{t('Projecten', 'Projects')}</a></li>
<li><a href="{r}#mvo">{t('Duurzaam ondernemen', 'Sustainability')}</a></li></ul></div>
<div><h3>Contact</h3><ul>
<li><a href="tel:+31852734872">085 2734 872</a></li>
<li><a href="mailto:info@hooftenpetiet.nl">info@hooftenpetiet.nl</a></li>
<li>Reactorweg 291 B<br>3542 AD Utrecht</li></ul></div>
</div>
<p class="big" aria-hidden="true">{t('elke woning', 'every home')} <em style="font-style:italic;color:var(--lime)">{t('een thuis', 'a home')}</em></p>
<div class="meta"><span>© H &amp; P Interieur B.V. 2026</span><span>{t('Prototype door Astra agency, oktober 2026. Dit is niet de live site, aanvragen worden niet verzonden.', 'Prototype by Astra agency, October 2026. This isn’t the live site and requests aren’t sent.')}</span>{langsw(path)}</div>
</div>
<p class="proto"><b>{t('Prototype', 'Prototype')}</b> Astra agency</p></footer>
<script src="/js/site.js" defer></script><script src="/js/hp.js" defer></script>
</body></html>'''

def floorplan():
    lbl = lambda x, y, nl, en: '<text x="%d" y="%d" text-anchor="middle" class="rl">%s</text>' % (x, y, t(nl, en))
    s = []
    s.append('<svg viewBox="0 0 720 540" role="img" aria-labelledby="plan-t plan-d"><title id="plan-t">%s</title><desc id="plan-d">%s</desc>' % (
        t('Plattegrond van een tijdelijke woning', 'Floor plan of a temporary home'),
        t('Een lege woning die stap voor stap wordt ingericht, gestoffeerd, voorzien van apparatuur en een welkomstpakket, tot er alleen nog een koffer bij de voordeur staat.',
          'An empty home furnished step by step, then floors and curtains, then appliances and a welcome pack, until only a suitcase stands at the front door.')))
    s.append('<defs><pattern id="planks" width="36" height="12" patternUnits="userSpaceOnUse"><rect width="36" height="12" fill="#E8DCC4"/><path d="M0 11.5H36M18 0V12" stroke="#D6C6A6" stroke-width="1"/></pattern>'
             '<radialGradient id="lamp"><stop offset="0" stop-color="#F7F3B0" stop-opacity=".95"/><stop offset="1" stop-color="#F7F3B0" stop-opacity="0"/></radialGradient></defs>')
    # floors, step 2
    s.append('<g class="lay l2"><rect x="24" y="24" width="672" height="452" fill="url(#planks)"/><rect x="524" y="284" width="172" height="192" fill="#E4E7EC"/>'
             '<path d="M524 284H696V476H524Z" fill="url(#tiles)" opacity="0"/></g>')
    # base, walls and fixed fittings
    s.append('<g class="base" fill="none" stroke="#1B1546" stroke-linecap="square">'
             '<rect x="20" y="20" width="680" height="460" stroke-width="9"/>'
             '<path d="M380 20V150M520 20V480M20 300H330M380 300H520M200 300V480M520 280H700" stroke-width="7"/>'
             '<path d="M330 300A50 50 0 0 1 380 300" stroke-width="1.5" stroke-dasharray="4 4"/>'
             '<path d="M200 360H170M520 200V240" stroke="#FBF8F2" stroke-width="9"/>'
             '<path d="M380 480H440" stroke="#FBF8F2" stroke-width="11"/><path d="M380 480A60 60 0 0 1 440 420" stroke-width="1.5" stroke-dasharray="4 4"/>'
             '<path d="M70 20H300M410 20H500M560 20H670M20 70H20M20 80V230M20 330V440M700 70V210" stroke="#9FB6D8" stroke-width="5"/>'
             '</g>'
             '<g class="base" fill="#FBF8F2" stroke="#1B1546" stroke-width="2"><rect x="392" y="28" width="122" height="34" rx="3"/><rect x="530" y="290" width="60" height="120" rx="8"/><circle cx="660" cy="440" r="15"/><rect x="636" y="292" width="54" height="30" rx="4"/></g>')
    labels = ('<g class="rlbl">' + lbl(190, 140, 'Woonkamer', 'Living room') + lbl(450, 120, 'Keuken', 'Kitchen') + lbl(600, 223, 'Slaapkamer', 'Bedroom') +
             lbl(586, 470, 'Badkamer', 'Bathroom') + lbl(110, 470, 'Werkkamer', 'Study') + lbl(360, 345, 'Hal', 'Hall') + '</g>')
    # step 2 extras, rug, curtains, lamps
    s.append('<g class="lay l2"><ellipse cx="160" cy="185" rx="120" ry="58" fill="#EEF2B8"/>'
             '<path d="M72 30q12 8 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0M562 30q12 8 24 0t24 0t24 0t24 0M30 82q8 12 0 24t0 24t0 24t0 24t0 24t0 24" fill="none" stroke="#6E7400" stroke-width="3"/>'
             '<g class="glow"><circle cx="292" cy="250" r="54" fill="url(#lamp)"/><circle cx="672" cy="56" r="44" fill="url(#lamp)"/><circle cx="160" cy="330" r="40" fill="url(#lamp)"/></g>'
             '<circle cx="292" cy="250" r="9" fill="#FBF8F2" stroke="#1B1546" stroke-width="2"/><circle cx="672" cy="56" r="8" fill="#FBF8F2" stroke="#1B1546" stroke-width="2"/></g>')
    # step 1 furniture
    s.append('<g class="lay l1" fill="#FBF8F2" stroke="#1B1546" stroke-width="2.5" stroke-linejoin="round">'
             '<rect x="58" y="226" width="200" height="58" rx="12"/><rect x="58" y="268" width="200" height="16" rx="6" fill="#382888"/>'
             '<path d="M126 230V270M190 230V270" stroke-width="1.5"/>'
             '<rect x="110" y="160" width="102" height="48" rx="10"/>'
             '<rect x="408" y="188" width="96" height="64" rx="6"/><rect x="418" y="172" width="22" height="14" rx="3"/><rect x="472" y="172" width="22" height="14" rx="3"/><rect x="418" y="254" width="22" height="14" rx="3"/><rect x="472" y="254" width="22" height="14" rx="3"/>'
             '<rect x="562" y="48" width="104" height="150" rx="8"/><rect x="572" y="56" width="38" height="24" rx="5"/><rect x="618" y="56" width="38" height="24" rx="5"/><path d="M562 96H666" stroke-width="1.5"/>'
             '<rect x="530" y="232" width="110" height="38" rx="3"/>'
             '<rect x="40" y="318" width="124" height="40" rx="4"/><circle cx="102" cy="384" r="16"/>'
             '</g>')
    # step 3 appliances
    s.append('<g class="lay l3"><rect x="484" y="68" width="28" height="36" rx="3" fill="#1B1546"/><circle cx="420" cy="45" r="7" fill="none" stroke="#1B1546" stroke-width="2"/><circle cx="442" cy="45" r="7" fill="none" stroke="#1B1546" stroke-width="2"/>'
             '<rect x="70" y="30" width="130" height="9" rx="2" fill="#1B1546"/><rect x="92" y="40" width="86" height="12" rx="3" fill="#FBF8F2" stroke="#1B1546" stroke-width="2"/>'
             '<rect x="640" y="330" width="44" height="44" rx="5" fill="#FBF8F2" stroke="#1B1546" stroke-width="2.5"/><circle cx="662" cy="352" r="12" fill="none" stroke="#1B1546" stroke-width="2.5"/>'
             '<g fill="none" stroke="#382888" stroke-width="3" stroke-linecap="round"><path d="M268 372a26 26 0 0 1 36 0"/><path d="M258 362a40 40 0 0 1 56 0"/><circle cx="286" cy="384" r="3" fill="#382888"/></g></g>')
    # step 4 welcome
    s.append('<g class="lay l4"><rect x="440" y="208" width="30" height="30" rx="3" fill="#C8D020" stroke="#1B1546" stroke-width="2"/><path d="M455 208V238M440 223H470" stroke="#1B1546" stroke-width="2"/>'
             '<circle cx="140" cy="184" r="8" fill="#FBF8F2" stroke="#1B1546" stroke-width="2"/><circle cx="180" cy="184" r="8" fill="#FBF8F2" stroke="#1B1546" stroke-width="2"/>'
             '<circle cx="290" cy="58" r="20" fill="#7FA36A"/><circle cx="290" cy="58" r="9" fill="#5C8250"/>'
             '<rect x="584" y="150" width="60" height="16" rx="3" fill="#C8D020"/><rect x="590" y="166" width="60" height="12" rx="3" fill="#EEF2B8"/>'
             '<g transform="translate(392 432)"><circle cx="10" cy="10" r="9" fill="none" stroke="#5F6500" stroke-width="4"/><path d="M19 10H44M36 10V18M42 10V16" stroke="#5F6500" stroke-width="4" stroke-linecap="round"/></g></g>')
    # step 5 the suitcase at the door
    s.append('<g class="lay l5"><path d="M380 480A60 60 0 0 1 440 420" fill="none" stroke="#C8D020" stroke-width="5"/>'
             '<g transform="translate(318 414)"><rect x="0" y="6" width="46" height="36" rx="6" fill="#C8D020" stroke="#1B1546" stroke-width="2.5"/><path d="M15 6V0H31V6" fill="none" stroke="#1B1546" stroke-width="2.5"/><path d="M10 16V32M36 16V32" stroke="#1B1546" stroke-width="2"/></g></g>')
    s.append(labels + '</svg>')
    return ''.join(s)

def hp_index():
    path = {'nl': '/', 'en': '/en/'}
    r = root(); q = r + t('offerte/', 'quote/'); vs = r + t('verkoopstyling/', 'sales-styling/')
    types = [('Logeerwoning', 'Guest home'), ('Wisselwoning', 'Swap home'), ('Rustwoning', 'Rest home'), ('Calamiteitenwoning', 'Emergency home'),
             ('Verkoopstyling', 'Sales styling'), ('Expat huisvesting', 'Expat housing'), ('Opvanglocatie', 'Reception location'),
             ('Model/projectwoning', 'Model or project home'), ('Recreatiewoning', 'Holiday home'), ('Anders', 'Other')]
    opts = ''.join('<option value="%s">%s</option>' % (esc(nl), esc(t(nl, en))) for nl, en in types)
    partners = sorted(os.listdir(os.path.join(B, 'media', 'clients')))
    logos = ''.join('<img src="/media/clients/%s" alt="%s" loading="lazy" height="46">' % (f, esc(f[:-4].replace('-', ' ').title())) for f in partners)
    logos_dup = ''.join('<img src="/media/clients/%s" alt="" loading="lazy" height="46">' % f for f in partners)
    bands = [
        ('logeer', t('Een logeerwoning met bed en kast', 'A guest home with a bed and wardrobe'), t('Tijdens renovatie', 'During renovation'),
         t('Logeerwoningen, rustwoningen <em>en wisselwoningen.</em>', 'Guest homes, rest homes <em>and swap homes.</em>'),
         t('Tijdelijke huisvesting voor bewoners als hun eigen huis wordt aangepakt. Wij richten in, stofferen en verzorgen desgewenst het beheer, afgestemd op de planning van de aannemer.',
           'Temporary homes for residents while their own home is worked on. We furnish, fit floors and curtains and, if you like, run the day to day, matched to the contractor’s schedule.'),
         [t('Woningcorporaties', 'Housing associations'), t('Renovatieaannemers', 'Renovation contractors')], 'Logeerwoning'),
        ('calamiteit', t('Een ingerichte woonkamer in een calamiteitenwoning', 'A furnished living room in an emergency home'), t('Onverwacht', 'At short notice'),
         t('Calamiteitenwoningen, <em>schoon en compleet.</em>', 'Emergency homes, <em>clean and complete.</em>'),
         t('Na brand of wateroverlast moeten mensen soms plotseling weg. Wij zorgen voor een schone, compleet ingerichte woning met bedden en linnengoed, één aanspreekpunt en een medewerker die de sleutels overdraagt.',
           'After a fire or a flood people sometimes have to leave home suddenly. We provide a clean, fully furnished home with beds and linen, one point of contact and a colleague who hands over the keys.'),
         [t('Bedden en linnengoed', 'Beds and linen'), t('Sleuteloverdracht', 'Key handover')], 'Calamiteitenwoning'),
        ('expat-living', t('Een woonkamer in een expatwoning', 'A living room in an expat home'), 'Home away from home',
         t('Expatwoningen, <em>van bank tot schemerlamp.</em>', 'Expat homes, <em>from sofa to table lamp.</em>'),
         t('Voor wie tijdelijk in Nederland werkt, of de werkgever die het regelt. Stoffering, een complete inrichting en inventaris van stofzuiger tot theelepel, met stylisten die meedenken.',
           'For people working in the Netherlands for a while, or the employer arranging it. Floors and curtains, a complete interior and everything from the vacuum cleaner to the teaspoon, with stylists to advise.'),
         [t('Linnengoed', 'Linen'), t('Snelle levering', 'Fast delivery'), t('Heel Nederland', 'Across the Netherlands')], 'Expat huisvesting'),
        ('model', t('Een gestylede woonkamer in een modelwoning', 'A styled living room in a model home'), t('Nieuwbouw en renovatie', 'New build and renovation'),
         t('Modelwoningen <em>en projectwoningen.</em>', 'Model homes <em>and project homes.</em>'),
         t('Laat zien hoe het eindresultaat eruit gaat zien, met de opties erbij. En vlak bij het werk een projectwoning als kantoor, vaak ook de plek voor sleutels en voorraad.',
           'Show what the finished home will look like, options included. And next to the site, a project home as an office, often where the keys and stock are kept too.'),
         [t('Ontwikkelaars', 'Developers'), t('Bouwbedrijven', 'Builders')], 'Model/projectwoning'),
        ('room-living', t('Een lichte woonkamer na verkoopstyling', 'A bright living room after sales styling'), t('Verkoop', 'For sale'),
         t('Verkoopstyling <em>met een vaste prijs.</em>', 'Sales styling <em>at a fixed price.</em>'),
         t('Een pakket voor twee maanden, inclusief styling, meubels, levering en ophalen. Reken uw prijs direct uit.',
           'A two month package including styling, furniture, delivery and collection. Work out your price straight away.'),
         [t('Vanaf € 2.150', 'From €2,150'), t('Makelaars', 'Estate agents')], None),
        ('recreatie', t('Een sfeervol ingerichte recreatiewoning', 'A warmly furnished holiday home'), t('Vakantie', 'Holidays'),
         t('Recreatiewoningen, <em>van baksteen of tentdoek.</em>', 'Holiday homes, <em>brick or canvas.</em>'),
         t('Voor een heel vakantiepark of een paar recreatiewoningen. We houden rekening met uw wensen, de gebruikers en de omgeving.',
           'For a whole holiday park or a few holiday homes. We plan around your wishes, the people staying and the setting.'),
         [t('Vakantieparken', 'Holiday parks'), t('Campings', 'Campsites')], 'Recreatiewoning'),
        ('warehouse', t('Meubels op voorraad in een magazijn', 'Furniture in stock in a warehouse'), t('Meubelverhuur', 'Furniture rental'),
         t('Van theelepel tot bank, <em>van bed tot tuinset.</em>', 'From teaspoon to sofa, <em>bed to garden set.</em>'),
         t('Complete circulaire interieurs en inventaris voor alle type woningen, van basic tot luxe en design. Losse meubels of een volledig gebruiksklare woning, geleverd en gemonteerd.',
           'Complete circular interiors and household goods for every kind of home, from basic to luxury and design. Single pieces or a home that’s ready to use, delivered and assembled.'),
         [t('Losse meubels', 'Single pieces'), t('Complete inrichting', 'Full interiors')], 'Anders'),
    ]
    bhtml = ''
    for key, alt, kick, h, p, tags, typ in bands:
        link = (vs, t('Bereken uw prijs', 'Work out your price')) if typ is None else (q + '?type=' + esc(typ), t('Offerte aanvragen', 'Request a quote'))
        bhtml += f'''<article class="band"><div class="band-ph">{pic(key, alt, '(max-width:860px) 100vw, 58vw')}</div>
<div class="band-tx"><p class="kicker">{kick}</p><h3 class="h2">{h}</h3><p>{p}</p><div class="tags">{''.join('<span>%s</span>' % x for x in tags)}</div><a class="lnk" href="{link[0]}">{link[1]} <span class="arr" aria-hidden="true">→</span></a></div></article>'''

    return head('hp', t('Hooft & Petiet, wij maken van elke woning een thuis', 'Hooft & Petiet, we make every home a home'),
                t('Tijdelijke woningen voor huurders tijdens renovatie, compleet ingericht tot en met het welkomstpakket. Logeerwoningen, rustwoningen, wisselwoningen, beheer en verkoopstyling sinds 2010.',
                  'Temporary homes for tenants during renovation, furnished down to the welcome pack. Guest homes, rest homes, swap homes, management and sales styling since 2010.'), path) + hp_header(path) + f'''
<main id="main">
<section class="hero" data-first aria-label="{t('Introductie', 'Introduction')}">
<div class="hero-stick">
<div class="hero-room">{pic('room-light', t('Een lichte, ingerichte woonkamer met eettafel', 'A bright furnished living room with a dining table'), '100vw', eager=True)}</div>
<div class="hero-fill" aria-hidden="true"></div>
<div class="hero-roof" aria-hidden="true"></div>
<div class="hero-amp" aria-hidden="true">&amp;</div>
<div class="hero-slot" aria-hidden="true"></div>
<div class="hero-copy"><div class="wrap">
<p class="kicker">{t('Projectinrichting sinds 2010', 'Project furnishing since 2010')}</p>
<h1 class="display">{t('Wij maken van elke woning <em>een thuis.</em>', 'We make every home <em>feel like home.</em>')}</h1>
<p class="lede">{t('Tijdelijke woningen voor huurders tijdens een renovatie, compleet ingericht tot en met het welkomstpakket. Voor woningcorporaties en bouwbedrijven, door heel Nederland.', 'Temporary homes for tenants during a renovation, furnished down to the welcome pack. For housing associations and builders across the Netherlands.')}</p>
<div class="btn-row"><a class="btn btn-accent" href="{q}">{t('Offerte aanvragen', 'Request a quote')} <span class="arr" aria-hidden="true">→</span></a><a class="tel" href="tel:+31852734872"><span class="dot" aria-hidden="true"></span>085 2734 872</a></div>
</div></div>
<div class="hero-end"><div class="wrap"><p class="kicker">{t('Instapklaar', 'Ready to move in')}</p><p class="h1">{t('Direct bewoonbaar, <em>zodra de sleutel omgaat.</em>', 'Ready to live in <em>the moment the key turns.</em>')}</p></div></div>
<div class="scroll-hint" aria-hidden="true">{t('Scroll', 'Scroll')}<i></i></div>
</div>
</section>

<section class="chapter on-night" id="tijdelijk">
<div class="wrap">
<div class="grid-2 top">
<div class="rv"><p class="kicker">{t('Waarom tijdelijk wonen nu telt', 'Why temporary homes matter now')}</p>
<h2 class="h2">{t('Een renovatie begint <em>met een verhuizing.</em>', 'A renovation starts <em>with a move.</em>')}</h2>
<div class="body" style="margin-top:28px;color:#E6E2FA"><p>{t('Corporaties moeten alle huurwoningen met energielabel E, F of G uiterlijk in 2028 hebben aangepakt. Bij zware renovaties kunnen bewoners een aantal weken niet thuis wonen. Bij werk in bewoonde staat willen ze overdag een rustige plek.', 'Housing associations have to deal with every rented home on an E, F or G energy label by 2028 at the latest. In heavy renovations residents can’t live at home for a few weeks. When work goes on around them, they want somewhere quiet during the day.')}</p>
<p>{t('Voor beide richten wij woningen in. U levert de woning, wij de inrichting.', 'We furnish homes for both. You provide the home, we furnish it.')}</p></div></div>
<div class="rv d2"><p class="num reno-num"><span data-count="180000">180.000</span></p>
<p class="reno-cap">{t('corporatiewoningen hadden eind 2022 nog label E, F of G, na een daling van ongeveer een kwart vanaf 247.000. Uiterlijk in 2028 moeten ze allemaal zijn aangepakt.', 'housing association homes still had an E, F or G label at the end of 2022, down by about a quarter from 247,000. All of them have to be dealt with by 2028.')}</p>
<p class="src">{t('Bron', 'Source')} <a href="https://www.volkshuisvestingnederland.nl/onderwerpen/verduurzaming-door-woningcorporaties" rel="noopener">Volkshuisvesting Nederland</a>, {t('op basis van de Aedes benchmark 2023', 'based on the Aedes benchmark 2023')}</p></div>
</div>
<div class="dn rv">
<div class="dn-tabs" role="tablist" aria-label="{t('Soorten tijdelijke woningen', 'Kinds of temporary home')}">
<button class="dn-tab" role="tab" id="tab-l" aria-controls="dn-l" data-l="0%" data-w="100%" data-label="{t('Dag en nacht, een aantal weken', 'Day and night, for a few weeks')}">{t('Logeerwoning', 'Guest home')}</button>
<button class="dn-tab" role="tab" id="tab-r" aria-controls="dn-r" data-l="33.3%" data-w="41.7%" data-label="{t('Overdag', 'Daytime')}">{t('Rustwoning', 'Rest home')}</button>
<button class="dn-tab" role="tab" id="tab-w" aria-controls="dn-w" data-l="0%" data-w="100%" data-label="{t('Dag en nacht, met eigen interieur', 'Day and night, with their own furniture')}">{t('Wisselwoning', 'Swap home')}</button>
</div>
<div class="dn-bar" aria-hidden="true"><div class="dn-occ"></div></div>
<div class="dn-scale" aria-hidden="true"><span>00.00</span><span>06.00</span><span>12.00</span><span>18.00</span><span>24.00</span></div>
<div class="dn-panel" role="tabpanel" id="dn-l" aria-labelledby="tab-l"><div><h3 class="h3">{t('Een logeerwoning', 'A guest home')}</h3><p>{t('Een volledig ingerichte woning voor de weken dat bewoners niet thuis kunnen wonen. Ze nemen kleding, toiletartikelen en eigen beddengoed en handdoeken mee, de rest staat klaar.', 'A fully furnished home for the weeks residents can’t live at home. They bring clothes, toiletries and their own bedding and towels, everything else is ready.')}</p></div>
<ul><li>{t('Volledig ingericht, van bed tot servies', 'Fully furnished, from beds to crockery')}</li><li>{t('Tv en wifi geregeld', 'TV and wifi sorted')}</li><li>{t('Een presentje bij ontvangst', 'A small gift on arrival')}</li><li>{t('Schoon en fris bij iedere nieuwe logeerpartij', 'Clean and fresh for every new stay')}</li></ul></div>
<div class="dn-panel" role="tabpanel" id="dn-r" aria-labelledby="tab-r" hidden><div><h3 class="h3">{t('Een rustwoning', 'A rest home')}</h3><p>{t('Voor renovaties in bewoonde staat. Overdag kunnen bewoners er rustig werken, of slapen na een nachtdienst.', 'For renovations done while people stay at home. During the day residents can work there in peace, or sleep after a night shift.')}</p></div>
<ul><li>{t('Een knusse woonkamer', 'A cosy living room')}</li><li>{t('Werkplekken', 'Places to work')}</li><li>{t('Verschillende zitjes', 'Several seating corners')}</li><li>{t('Een kookvoorziening', 'Somewhere to cook')}</li></ul></div>
<div class="dn-panel" role="tabpanel" id="dn-w" aria-labelledby="tab-w" hidden><div><h3 class="h3">{t('Een wisselwoning', 'A swap home')}</h3><p>{t('Voor renovaties die langer duren. Wij stofferen de woning vooraf, de bewoner neemt het eigen interieur mee naar de nieuwe plek.', 'For renovations that take longer. We fit the floors and curtains in advance, and residents bring their own furniture with them.')}</p></div>
<ul><li>{t('Vloeren en raambekleding', 'Floors and window coverings')}</li><li>{t('Schilderwerk en verlichting', 'Painting and lighting')}</li><li>{t('Op de planning van de aannemer', 'On the contractor’s schedule')}</li></ul></div>
</div>
</div>
</section>

<section class="plan-scene" aria-labelledby="plan-h">
<div class="plan-stick">
<div class="plan-copy"><p class="kicker">{t('Van lege woning naar tijdelijk thuis', 'From empty home to temporary home')}</p>
<h2 class="h2" id="plan-h">{t('Vier stappen, <em>en dan de koffer.</em>', 'Four steps, <em>then the suitcase.</em>')}</h2>
<p class="lede" style="font-size:18px">{t('U kiest zelf wat u bij ons onderbrengt. Wij zorgen dat alles op elkaar aansluit.', 'You choose what to hand to us. We make sure it all fits together.')}</p>
<ol class="steps">
<li class="step" data-n="1"><b>{t('Meubels en inventaris', 'Furniture and household goods')}</b><span>{t('Zitmeubels en bedden, tafels en stoelen, keukeninventaris en linnengoed.', 'Seating and beds, tables and chairs, kitchenware and linen.')}</span></li>
<li class="step" data-n="2"><b>{t('Stoffering en afwerking', 'Floors and finishing')}</b><span>{t('Vloeren, schilderwerk, wandafwerking, raambekleding en verlichting.', 'Floors, painting, wall finishes, window coverings and lighting.')}</span></li>
<li class="step" data-n="3"><b>{t('Apparatuur en voorzieningen', 'Appliances and connections')}</b><span>{t('Van witgoed tot televisie en internet.', 'From white goods to television and internet.')}</span></li>
<li class="step" data-n="4"><b>{t('Welkomstpakket en beheer', 'Welcome pack and management')}</b><span>{t('Een welkomstpakket bij ontvangst, en als u wilt ook sleutelbeheer, schoonmaak en het contact met bewoners.', 'A welcome pack on arrival and, if you like, the keys, the cleaning and contact with residents too.')}</span></li>
</ol>
<div class="plan-bar" aria-hidden="true"><i></i></div>
</div>
<div class="plan-fig"><div class="plan">{floorplan()}</div><p class="plan-done">{t('Alleen de koffer nog uitpakken.', 'Just the suitcase left to unpack.')}</p></div>
</div>
</section>

<section class="chapter on-paper welcome" aria-labelledby="wel-h">
<div class="wrap"><div class="grid-2">
<div class="ph rv" style="border-radius:22px">{pic('cushion', t('Een kussen wordt op een bank gelegd', 'A cushion being placed on a sofa'), '(max-width:860px) 100vw, 46vw')}</div>
<div class="rv d2"><p class="kicker" id="wel-h">{t('De ontvangst', 'The welcome')}</p>
<blockquote class="quote">{t('Elke nieuwe logeerpartij begint met een schoon en fris huis en een gezellig presentje bij ontvangst.', 'Every new guest stay starts with a clean, fresh home and a little gift on arrival.')}</blockquote>
<p class="cite"><b>Brenda de Wilde</b>, {t('projectmanager bij Hooft &amp; Petiet', 'project manager at Hooft &amp; Petiet')}{t('', ', translated from Dutch')}</p>
<div class="koffer"><svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="18" width="52" height="40" rx="8" fill="#C8D020" stroke="#1B1546" stroke-width="3"/><path d="M22 18V9H42V18" fill="none" stroke="#1B1546" stroke-width="3"/><path d="M18 30V46M46 30V46" stroke="#1B1546" stroke-width="3"/></svg>
<p style="margin:0">{t('Bewoners nemen kleding, toiletartikelen en eigen beddengoed mee. Tv en wifi zijn geregeld, en bij de check in staat de koffie klaar.', 'Residents bring clothes, toiletries and their own bedding. TV and wifi are sorted, and the coffee’s ready at check in.')}</p></div>
</div></div></div>
</section>

<div class="strip" data-sy aria-label="{t('Van magazijn tot woning', 'From warehouse to home')}" role="group">
<div class="ph">{pic('warehouse', t('Meubels op voorraad in een magazijn', 'Furniture in stock in a warehouse'), '(max-width:860px) 50vw, 32vw')}</div>
<div class="ph">{pic('van', t('Een busje wordt geladen met meubels', 'A van being loaded with furniture'), '(max-width:860px) 50vw, 20vw')}</div>
<div class="ph">{pic('plant', t('Een plant wordt in een kast gezet', 'A plant being placed on a shelf'), '(max-width:860px) 50vw, 26vw')}</div>
<div class="ph">{pic('sofa-cushion', t('Een bank met een roze kussen en bloemen', 'A sofa with a pink cushion and flowers'), '(max-width:860px) 50vw, 24vw')}</div>
</div>

<section class="chapter on-linen" id="beheer">
<div class="wrap">
<div class="grid-2 top"><div class="rv"><p class="kicker">{t('Beheer', 'Management')}</p><h2 class="h2">{t('Eén aanspreekpunt, <em>van sleutel tot uitcheck.</em>', 'One point of contact, <em>from key to check out.</em>')}</h2></div>
<p class="lede rv d2" style="margin-top:0">{t('Kiest u voor beheer, dan nemen wij de wisselschoonmaak, de bewonersbegeleiding en het dagelijkse beheer over. Bewoners hebben één vast gezicht, u krijgt een overzicht per bewonerswissel.', 'Choose management and we take over the cleaning between stays, the resident support and the day to day. Residents have one familiar face, and you get a report for every change of resident.')}</p></div>
<div class="pillars">
<div class="pillar rv"><h3 class="h3">{t('Wisselschoonmaak', 'Cleaning between stays')}</h3><ul><li>{t('Complete schoonmaak na iedere bewonerswissel', 'A full clean after every change of resident')}</li><li>{t('Keuken, sanitair, ramen en vloeren', 'Kitchen, bathroom, windows and floors')}</li><li>{t('Gecontroleerd en direct gebruiksklaar', 'Checked and ready to use')}</li><li>{t('Schade tijdig gesignaleerd', 'Damage spotted early')}</li></ul></div>
<div class="pillar rv d2"><h3 class="h3">{t('Bewonersbegeleiding', 'Resident support')}</h3><ul><li>{t('Persoonlijke ontvangst en duidelijke uitleg', 'A personal welcome and clear explanation')}</li><li>{t('Van sleuteloverdracht tot uitcheck', 'From key handover to check out')}</li><li>{t('Vragen en meldingen direct opgepakt', 'Questions and reports picked up straight away')}</li><li>{t('Inventariscontrole bij in en uitcheck', 'Inventory checks at check in and check out')}</li></ul></div>
<div class="pillar rv d3"><h3 class="h3">{t('Dagelijks beheer', 'Day to day')}</h3><ul><li>{t('Sleutelbeheer en toegang', 'Keys and access')}</li><li>{t('Storingen en kleine reparaties', 'Faults and small repairs')}</li><li>{t('Internet en televisie geregeld', 'Internet and television sorted')}</li><li>{t('Heldere overzichten per wissel', 'Clear reports per change of resident')}</li></ul></div>
</div>
</div>
</section>

<section class="chapter on-ink" id="projecten">
<div class="wrap">
<div class="rv"><p class="kicker">{t('Projecten', 'Projects')}</p><h2 class="h2" style="max-width:16ch">{t('Van Utrecht <em>tot Amsterdam West.</em>', 'From Utrecht <em>to Amsterdam West.</em>')}</h2></div>
<div class="log">
<div class="log-row rv"><div><div class="city">Overvecht, Utrecht</div><div class="who">Portaal</div></div>
<div class="num n"><span data-count="570">570</span><small>{t('woningen gerenoveerd in vijf flats van tien hoog', 'homes renovated in five ten storey blocks')}</small></div>
<div><blockquote>{t('Dit gaf ons de ruimte om ons te focussen op de renovatie zelf.', 'It gave us room to focus on the renovation itself.')}</blockquote><p>Danny Mooren, {t('sociaal projectleider bij Portaal, over de logeerwoningen, de contracten en de schoonmaak die wij verzorgden.', 'social project lead at Portaal, on the guest homes, contracts and cleaning we took care of. Translated from Dutch.')}</p></div></div>
<div class="log-row rv"><div><div class="city">Liskwartier, Rotterdam</div><div class="who">HEF Wonen</div></div>
<div class="num n">12<small>{t('logeerwoningen bij de verduurzaming van 45 woningen', 'guest homes for the upgrade of 45 homes')}</small></div>
<div><blockquote>{t('Dat er zelfs servies, schoonmaakmiddelen en gratis internet aanwezig was, dat maakte het verschil!', 'That there was even crockery, cleaning products and free internet, that made the difference!')}</blockquote><p>Thierry Farla, {t('bewonersbegeleider bij HEF Wonen tijdens het project', 'resident support officer at HEF Wonen during the project. Translated from Dutch.')}</p></div></div>
<div class="log-row rv"><div><div class="city">West en Oud-West, Amsterdam</div><div class="who">Stadgenoot</div></div>
<div class="num n">4<small>{t('soorten tijdelijke woningen, de komende jaren', 'kinds of temporary home, over the coming years')}</small></div>
<div><p>{t('Logeerwoningen, wisselwoningen, rustwoningen en calamiteitenwoningen. Smalle trappenhuizen en oude panden zonder lift vragen om verhuisliften en meubels die passen in kleine ruimtes.', 'Guest, swap, rest and emergency homes. Narrow stairwells and old buildings without lifts call for furniture hoists and pieces that fit small rooms.')}</p></div></div>
<div class="log-row rv"><div><div class="city">IJsselstein</div><div class="who">Cazas Wonen</div></div>
<div class="num n" style="font-size:clamp(30px,3vw,46px)">{t('Al jaren partner', 'A partner for years')}</div>
<div><p>{t('Logeerwoningen voor de schakelflats aan de Lanceerplaats en de Televisiebaan, terwijl bewoners een aantal weken niet thuis kunnen wonen.', 'Guest homes for the flats on the Lanceerplaats and the Televisiebaan, while residents can’t live at home for a few weeks.')}</p></div></div>
</div>
</div>
</section>

<section class="on-paper" id="diensten">
<div class="chapter tight"><div class="wrap rv"><p class="kicker">{t('Diensten', 'Services')}</p><h2 class="h2" style="max-width:15ch">{t('Elke woning, <em>van 1 tot 100.</em>', 'Every home, <em>from 1 to 100.</em>')}</h2>
<p class="lede">{t('Of het nu om 1 of 100 woningen gaat, wij regelen dat uw project goed tot zijn recht komt.', 'Whether it’s 1 home or 100, we make sure your project comes out right.')}</p></div></div>
{bhtml}
</section>

<section class="on-paper" aria-labelledby="pt-h">
<div class="chapter tight" style="padding-bottom:40px"><div class="wrap"><p class="kicker" id="pt-h">{t('Onze partners', 'Our partners')}</p><h2 class="h3" style="max-width:30ch">{t('Corporaties en bouwbedrijven door heel Nederland.', 'Housing associations and builders across the Netherlands.')}</h2></div></div>
<div class="partners"><div class="marq">{logos}<span aria-hidden="true" style="display:contents">{logos_dup}</span></div></div>
</section>

<section class="chapter family" id="reshare" data-sy>
<div class="circle" aria-hidden="true"></div>
<div class="wrap"><div style="max-width:720px" class="rv">
<p class="kicker" style="color:#7FD8CC">ReShare Living Group</p>
<h2 class="h2">{t('Meubels die terugkomen, <em>gaan het volgende huis in.</em>', 'Furniture that comes back <em>goes into the next home.</em>')}</h2>
<p class="lede" style="color:#D9D5F2">{t('Sinds 1 september 2025 bundelen Hooft &amp; Petiet en KeyPro hun krachten in ReShare Living Group. Wat na een verblijf terugkomt, wordt met stoom gereinigd, gecontroleerd en opnieuw ingezet.', 'Since 1 September 2025 Hooft &amp; Petiet and KeyPro have joined forces in ReShare Living Group. What comes back after a stay is steam cleaned, checked and used again.')}</p>
<div class="logos"><img src="/media/logo-reshare-white.png" width="900" height="264" alt="ReShare Living Group"><img class="kp" src="/media/logo-keypro.png" width="500" height="275" alt="KeyPro"></div>
<div class="btn-row"><a class="btn btn-ghost" style="color:#fff" href="{URL['rs']}{'/' if LANG == 'nl' else '/en/'}">{t('Bekijk ReShare Living Group', 'See ReShare Living Group')} <span class="arr" aria-hidden="true">→</span></a></div>
</div></div>
</section>

<section class="chapter on-linen" id="mvo">
<div class="wrap">
<div class="grid-2 top"><div class="rv"><p class="kicker">{t('Duurzaam en sociaal', 'Sustainable and social')}</p><h2 class="h2">{t('Geen wegwerpmeubels, <em>maar grondstoffen.</em>', 'Not throwaway furniture, <em>but raw materials.</em>')}</h2></div>
<p class="lede rv d2" style="margin-top:0">{t('Na een huurperiode controleren we elk meubel zorgvuldig en geven we het een tweede leven, bij ons of via partners zoals kringloopwinkels.', 'After a rental period we check every piece carefully and give it a second life, with us or through partners such as charity shops.')}</p></div>
<div class="facts">
<div class="fact rv"><b>{t('Energielabel A', 'Energy label A')}</b><span>{t('Ons pand in Utrecht, met zonnepanelen en laadpunten.', 'Our building in Utrecht, with solar panels and charging points.')}</span></div>
<div class="fact rv d2"><b>{t('Stoomreiniging', 'Steam cleaning')}</b><span>{t('Meubels gereinigd met milieuvriendelijke stoomapparatuur.', 'Furniture cleaned with environmentally friendly steam equipment.')}</span></div>
<div class="fact rv d3"><b>FSC</b><span>{t('Bij houten meubelen en vloeren.', 'For wooden furniture and floors.')}</span></div>
<div class="fact rv d4"><b>SROI 5%</b><span>{t('En Nederlandse taallessen voor collega’s die de taal nog leren.', 'And Dutch lessons for colleagues still learning the language.')}</span></div>
</div>
</div>
</section>

<section class="chapter cta" aria-labelledby="cta-h">
<div class="house" aria-hidden="true">{HOUSE}</div>
<div class="wrap">
<p class="kicker" style="color:var(--ink)">{t('Offerte', 'Quote')}</p>
<h2 class="h1" id="cta-h" style="max-width:13ch">{t('Hoeveel woningen <em>heeft uw project?</em>', 'How many homes <em>is your project?</em>')}</h2>
<form class="starter" action="{q}" method="get">
<div class="starter-row">
<div class="field"><label for="s-type">{t('Soort woning', 'Kind of home')}</label><select id="s-type" name="type">{opts}</select></div>
<div class="field"><label for="s-n">{t('Aantal woningen', 'Number of homes')}</label><input id="s-n" name="woningen" type="number" min="1" max="999" value="1" inputmode="numeric"></div>
</div>
<button class="btn btn-ink" type="submit">{t('Verder', 'Next')} <span class="arr" aria-hidden="true">→</span></button>
</form>
<div class="contact-line"><a href="tel:+31852734872">085 2734 872</a><a href="mailto:info@hooftenpetiet.nl">info@hooftenpetiet.nl</a><span>Reactorweg 291 B, Utrecht</span></div>
</div>
</section>
</main>
''' + hp_footer(path)

def hp_vs():
    path = {'nl': '/verkoopstyling/', 'en': '/en/sales-styling/'}
    r = root(); q = r + t('offerte/', 'quote/')
    sizes = [(50, 2150), (75, 2549), (100, 3150), (125, 3550), (250, 0)]
    btns = ''.join('<button class="size" type="button" aria-pressed="false" data-price="%d" data-label="%s"><b>%d</b><small>m²</small></button>' % (
        p, esc(t('tot %d m²' % m, 'up to %d m²' % m)), m) for m, p in sizes)
    txt = json.dumps({
        'from': t('vanaf', 'from'),
        'ask': t('<small>prijs</small>op aanvraag', '<small>price</small>on request'),
        'askNote': t('Voor woningen tot 250 m² maken we een prijs op maat.', 'For homes up to 250 m² we price to measure.'),
        'pack': t('Pakket {size}, {base} voor twee maanden', '{size} package, {base} for two months'),
        'plus': t(', plus {n} weken verlengen à {w} is {sum}', ', plus {n} extra weeks at {w}, that’s {sum}'),
    }, ensure_ascii=False)
    gal = [('room-sofa', t('Een woonkamer met hoekbank en vloerkleed', 'A living room with a corner sofa and rug')),
           ('room-chaise', t('Een woonkamer met een ligstoel', 'A living room with a lounge chair')),
           ('room-corner', t('Een hoekbank met kunst aan de muur', 'A corner sofa with art on the wall')),
           ('room-bed', t('Een gestylede slaapkamer', 'A styled bedroom')),
           ('vk-08', t('Een woonkamer met eettafel en hanglamp', 'A living room with a dining table and pendant lamp')),
           ('room-styled', t('Een lichte woonkamer na verkoopstyling', 'A bright living room after sales styling'))]
    galh = ''.join('<div class="ph">%s</div>' % pic(k, a, '(max-width:860px) 50vw, 33vw') for k, a in gal)
    return head('hp', t('Verkoopstyling met een vaste prijs, Hooft & Petiet', 'Sales styling at a fixed price, Hooft & Petiet'),
                t('Verkoopstyling voor twee maanden, inclusief styling, meubels, levering en ophalen. Reken uw prijs direct uit.', 'Two months of sales styling including styling, furniture, delivery and collection. Work out your price straight away.'), path) + hp_header(path) + f'''
<main id="main">
<section class="pagehero" data-first data-sy>{pic('room-living', t('Een lichte woonkamer met vloerkleed en bank', 'A bright living room with a rug and sofa'), '100vw', eager=True)}
<div class="wrap"><p class="kicker">{t('Verkoopstyling', 'Sales styling')}</p><h1 class="display" style="max-width:11ch">{t('Een sterke <em>eerste indruk.</em>', 'A strong <em>first impression.</em>')}</h1>
<p class="lede" style="color:#E6E2FA">{t('Een woning verkoopt beter wanneer kopers zich er direct iets bij kunnen voorstellen. Niet overdadig en niet afstandelijk, maar afgestemd op de woning en de doelgroep.', 'A home sells better when buyers can picture themselves in it straight away. Not overdone and not cold, but matched to the home and the buyers you want.')}</p></div>
</section>

<section class="chapter on-paper" aria-labelledby="cfg-h">
<div class="wrap">
<div class="grid-2 top"><div class="rv"><p class="kicker">{t('Pakket voor twee maanden', 'Two month package')}</p><h2 class="h2" id="cfg-h">{t('Weet vooraf <em>waar u aan toe bent.</em>', 'Know your price <em>before you start.</em>')}</h2></div>
<p class="lede rv d2" style="margin-top:0">{t('Woonkamer, keuken, hal en badkamer zitten er standaard in. De prijs hangt af van het woonoppervlak en het aantal slaapkamers of werkkamers.', 'Living room, kitchen, hall and bathroom are always included. The price depends on the floor area and the number of bedrooms or studies.')}</p></div>
<div class="cfg" data-txt='{esc(txt)}'>
<div class="cfg-opts">
<span class="legend" id="sz-l">{t('Woonoppervlak, tot', 'Floor area, up to')}</span>
<div class="sizes" role="group" aria-labelledby="sz-l">{btns}</div>
<span class="legend" id="wk-l" style="margin-top:30px">{t('Langer nodig? Verlengen per week', 'Need longer? Extend by the week')}</span>
<div class="weeks" role="group" aria-labelledby="wk-l"><button type="button" data-dec aria-label="{t('Een week minder', 'One week less')}">−</button><output aria-live="polite">0</output><span>{t('weken extra', 'extra weeks')}</span><button type="button" data-inc aria-label="{t('Een week meer', 'One week more')}">+</button></div>
<ul class="incl"><li>{t('Styling door onze stylisten', 'Styling by our stylists')}</li><li>{t('Meubels en accessoires uit onze eigen collectie', 'Furniture and accessories from our own collection')}</li><li>{t('Levering en ophalen', 'Delivery and collection')}</li><li>{t('Klaar voor fotografie en bezichtigingen', 'Ready for photography and viewings')}</li></ul>
</div>
<div class="price" aria-live="polite"><div><span class="lbl">{t('Uw prijs', 'Your price')}</span><p class="num amt" data-amt>{t('vanaf', 'from')} € 2.549</p><p class="brk" data-brk></p></div>
<div><a class="btn btn-accent" href="{q}?type=Verkoopstyling">{t('Pakket aanvragen', 'Request this package')} <span class="arr" aria-hidden="true">→</span></a><p class="note">{t('Vanaf prijzen, inclusief btw en afhankelijk van de regio. Verlengen kan vanaf € 99,99 per week.', 'Prices from, including VAT and depending on the region. Extending costs from €99.99 a week.')}</p></div></div>
</div>
</div>
</section>

<section class="gal" aria-label="{t('Voorbeelden van verkoopstyling', 'Examples of sales styling')}">{galh}</section>

<section class="chapter on-linen"><div class="wrap">
<div class="rv"><p class="kicker">{t('Waarom Hooft &amp; Petiet', 'Why Hooft &amp; Petiet')}</p><h2 class="h2" style="max-width:15ch">{t('Meer dan <em>meubels en accessoires.</em>', 'More than <em>furniture and accessories.</em>')}</h2></div>
<div class="why">
<div class="rv"><b>{t('Persoonlijke aanpak', 'A personal approach')}</b><p>{t('Geen standaard styling, maar een presentatie die past bij de woning, de omgeving en de doelgroep.', 'No standard styling, but a presentation that suits the home, the area and the buyers.')}</p></div>
<div class="rv d2"><b>{t('Sterkere foto’s', 'Stronger photos')}</b><p>{t('Rust, sfeer en samenhang, zodat ruimtes beter tot hun recht komen, online en tijdens bezichtigingen.', 'Calm, warmth and coherence, so rooms show at their best online and at viewings.')}</p></div>
<div class="rv d3"><b>{t('Eigen collectie', 'Our own collection')}</b><p>{t('Met bestaand meubilair of een aanvulling uit onze eigen collectie maken we de woning verkoopklaar voor fotografie en bezichtigingen.', 'With the furniture already there, or pieces from our own collection, we get the home ready for photos and viewings.')}</p></div>
</div></div></section>

<section class="chapter cta"><div class="house" aria-hidden="true">{HOUSE}</div><div class="wrap"><h2 class="h1" style="max-width:12ch">{t('Klaar voor <em>de bezichtiging?</em>', 'Ready for <em>the viewing?</em>')}</h2>
<div class="btn-row"><a class="btn btn-ink" href="{q}?type=Verkoopstyling">{t('Pakket aanvragen', 'Request this package')} <span class="arr" aria-hidden="true">→</span></a><a class="tel" href="tel:+31852734872"><span class="dot" aria-hidden="true"></span>085 2734 872</a></div></div></section>
</main>
''' + hp_footer(path)

def hp_quote():
    path = {'nl': '/offerte/', 'en': '/en/quote/'}
    types = [('Logeerwoning', 'Guest home', t('Tijdens renovatie', 'During renovation')), ('Wisselwoning', 'Swap home', t('Langere renovatie', 'Longer renovation')),
             ('Rustwoning', 'Rest home', t('Overdag', 'Daytime')), ('Calamiteitenwoning', 'Emergency home', t('Na brand of water', 'After fire or flood')),
             ('Verkoopstyling', 'Sales styling', t('Woning in de verkoop', 'Home for sale')), ('Expat huisvesting', 'Expat housing', t('Internationale werknemers', 'International staff')),
             ('Opvanglocatie', 'Reception location', t('Gemeenten en opvang', 'Councils and reception')), ('Model/projectwoning', 'Model or project home', t('Nieuwbouw en renovatie', 'New build and renovation')),
             ('Recreatiewoning', 'Holiday home', t('Parken en campings', 'Parks and campsites')), ('Anders', 'Other', t('Vertel het ons', 'Tell us'))]
    th = ''.join('<label class="type"><input type="radio" name="type" value="%s" required><span><b>%s</b><small>%s</small></span></label>' % (esc(nl), esc(t(nl, en)), sub) for nl, en, sub in types)
    styles = [('Landelijk & Romantisch', 'Country and romantic'), ('Stoer & Trendy', 'Bold and on trend'), ('Strak & Design', 'Clean and design'), ('Anders', 'Other')]
    sh = ''.join('<label class="chip"><input type="radio" name="stijl" value="%s"><span>%s</span></label>' % (esc(nl), esc(t(nl.replace(' & ', ' en '), en))) for nl, en in styles)
    packs = [('Keukenpakket', 'Kitchen pack'), ('Linnenpakket', 'Linen pack'), ('Huishoudpakket', 'Household pack'), ('Tuinpakket', 'Garden pack'),
             ('Apparaten', 'Appliances'), ('Kinderpakket', 'Children’s pack'), ('Seniorenpakket', 'Seniors’ pack'), ('Beheer', 'Management')]
    ph = ''.join('<label class="chip"><input type="checkbox" name="pakketten" value="%s"><span>%s</span></label>' % (esc(t(nl, en)), esc(t(nl, en))) for nl, en in packs)
    labels = json.dumps({'type': t('Soort woning', 'Kind of home'), 'woningen': t('Aantal woningen', 'Homes'), 'personen': t('Personen per woning', 'People per home'),
                         'oppervlak': t('Oppervlak', 'Floor area'), 'ruimten': t('Ruimten', 'Rooms'), 'datum': t('Gewenste levering', 'Delivery date'), 'stijl': t('Stijl', 'Style'),
                         'pakketten': t('Extra', 'Extras'), 'naam': t('Naam', 'Name'), 'bedrijf': t('Organisatie', 'Organisation'), 'mail': t('Mail', 'Email'), 'telefoon': t('Telefoon', 'Phone')}, ensure_ascii=False)
    return head('hp', t('Offerte aanvragen, Hooft & Petiet', 'Request a quote, Hooft & Petiet'),
                t('Vraag een offerte aan voor de inrichting van logeerwoningen, wisselwoningen, rustwoningen en meer.', 'Request a quote for furnishing guest homes, swap homes, rest homes and more.'), path) + hp_header(path, light=True) + f'''
<main id="main" class="on-linen">
<section class="chapter" style="padding-top:150px" data-first>
<div class="wrap qwrap">
<div class="qside"><p class="kicker">{t('Offerte aanvragen', 'Request a quote')}</p><h1 class="h1" style="max-width:10ch">{t('Vertel ons <em>over uw project.</em>', 'Tell us <em>about your project.</em>')}</h1>
<p class="lede">{t('Drie korte stappen. U krijgt een offerte voor ons standaard meubelpakket, aangevuld met de extra pakketten die u kiest.', 'Three short steps. You get a quote for our standard furniture package, plus any extra packs you choose.')}</p>
<div class="contact-line" style="margin-top:26px"><a href="tel:+31852734872">085 2734 872</a><a href="mailto:info@hooftenpetiet.nl">info@hooftenpetiet.nl</a></div>
<p class="src" style="margin-top:30px">{t('Dit is een prototype. Het formulier verstuurt niets.', 'This is a prototype. The form doesn’t send anything.')}</p></div>
<form class="qcard qform" action="" method="get" novalidate data-labels='{esc(labels)}'>
<div class="qprog" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<fieldset class="qstep" style="border:0;padding:0;margin:0"><h2>{t('Wat voor woning <em>richten we in?</em>', 'What kind of home <em>are we furnishing?</em>')}</h2><legend class="sr">{t('Soort woning', 'Kind of home')}</legend>
<div class="types">{th}</div><p class="qerr" role="alert" data-msg="{t('Kies een soort woning.', 'Choose a kind of home.')}"></p>
<div class="qnav"><span></span><button class="btn btn-ink" type="button" data-next>{t('Volgende', 'Next')} <span class="arr" aria-hidden="true">→</span></button></div></fieldset>
<fieldset class="qstep" style="border:0;padding:0;margin:0" hidden><h2>{t('Hoeveel, <em>en wanneer?</em>', 'How many, <em>and when?</em>')}</h2><legend class="sr">{t('Omvang en planning', 'Size and timing')}</legend>
<div class="two"><div class="field"><label for="q-n">{t('Aantal woningen', 'Number of homes')}</label><input id="q-n" name="woningen" type="number" min="1" max="999" value="1" required inputmode="numeric"></div>
<div class="field"><label for="q-p">{t('Personen per woning', 'People per home')}</label><input id="q-p" name="personen" type="number" min="1" max="20" required inputmode="numeric"></div>
<div class="field"><label for="q-o">{t('Oppervlak in m²', 'Floor area in m²')}</label><input id="q-o" name="oppervlak" type="number" min="10" max="2000" required inputmode="numeric"></div>
<div class="field"><label for="q-d">{t('Gewenste leverdatum', 'Delivery date')}</label><input id="q-d" name="datum" type="date" required></div></div>
<div class="field"><label for="q-r">{t('In te richten ruimten, soort en aantal', 'Rooms to furnish, kind and number')}</label><input id="q-r" name="ruimten" placeholder="{t('Bijvoorbeeld woonkamer, 2 slaapkamers', 'For example living room, 2 bedrooms')}"></div>
<span class="legend" id="st-l">{t('Welke stijl past bij de bewoners?', 'Which style suits the residents?')}</span><div class="chips" role="group" aria-labelledby="st-l" style="margin:10px 0 18px">{sh}</div>
<span class="legend" id="pk-l">{t('Extra pakketten en diensten', 'Extra packs and services')}</span><div class="chips" role="group" aria-labelledby="pk-l" style="margin-top:10px">{ph}</div>
<p class="qerr" role="alert" data-msg="{t('Vul het aantal woningen, personen, het oppervlak en de datum in.', 'Fill in the number of homes, people, floor area and date.')}"></p>
<div class="qnav"><button class="btn btn-ghost" type="button" data-back>← {t('Terug', 'Back')}</button><button class="btn btn-ink" type="button" data-next>{t('Volgende', 'Next')} <span class="arr" aria-hidden="true">→</span></button></div></fieldset>
<fieldset class="qstep" style="border:0;padding:0;margin:0" hidden><h2>{t('Hoe bereiken <em>we u?</em>', 'How do we <em>reach you?</em>')}</h2><legend class="sr">{t('Contactgegevens', 'Contact details')}</legend>
<div class="two"><div class="field"><label for="q-naam">{t('Naam', 'Name')}</label><input id="q-naam" name="naam" autocomplete="name" required></div>
<div class="field"><label for="q-b">{t('Organisatie', 'Organisation')}</label><input id="q-b" name="bedrijf" autocomplete="organization"></div>
<div class="field"><label for="q-m">{t('Mailadres', 'Email address')}</label><input id="q-m" name="mail" type="email" autocomplete="email" required></div>
<div class="field"><label for="q-t">{t('Telefoon', 'Phone')}</label><input id="q-t" name="telefoon" type="tel" autocomplete="tel"></div></div>
<div class="field"><label for="q-w">{t('Wensen of bijzonderheden', 'Wishes or details')}</label><textarea id="q-w" name="wensen" rows="3"></textarea></div>
<p class="qerr" role="alert" data-msg="{t('Vul uw naam en een geldig mailadres in.', 'Fill in your name and a valid email address.')}"></p>
<div class="qnav"><button class="btn btn-ghost" type="button" data-back>← {t('Terug', 'Back')}</button><button class="btn btn-ink" type="button" data-next>{t('Controleren', 'Review')} <span class="arr" aria-hidden="true">→</span></button></div></fieldset>
<fieldset class="qstep" style="border:0;padding:0;margin:0" hidden><h2>{t('Klopt <em>dit zo?</em>', 'Is this <em>right?</em>')}</h2><legend class="sr">{t('Overzicht', 'Summary')}</legend>
<ul class="sum"></ul>
<div class="qnav"><button class="btn btn-ghost" type="button" data-back>← {t('Aanpassen', 'Edit')}</button><button class="btn btn-accent" type="submit" data-send>{t('Aanvraag versturen', 'Send request')} <span class="arr" aria-hidden="true">→</span></button></div>
<div class="qdone" role="status" hidden>{t('In de echte site gaat uw aanvraag nu naar het planningsteam. In dit prototype is niets verzonden.', 'On the real site your request now goes to the planning team. In this prototype nothing was sent.')}</div></fieldset>
</form>
</div></section>
</main>
''' + hp_footer(path)

# ---------------------------------------------------------------- ReShare

def rs_header(path):
    r = root()
    links = [(r + '#idee', t('Het idee', 'The idea'), 'hide-s'), (r + '#werkwijze', t('Zo werkt het', 'How it works'), 'hide-m'),
             (r + '#bedrijven', t('KeyPro en Hooft &amp; Petiet', 'KeyPro and Hooft &amp; Petiet'), 'hide-m'), (r + '#missie', t('Missie', 'Mission'), 'hide-s')]
    nav = ''.join('<a class="%s" href="%s">%s</a>' % (c, h, l) for h, l, c in links)
    mnav = ''.join('<a href="%s">%s</a>' % (h, l) for h, l, c in links)
    return f'''<header class="hdr light-start"><div class="wrap hdr-in">
<a class="logo" href="{r}" aria-label="ReShare Living Group, home"><img class="on-light" src="/media/logo-reshare-ink.png" width="900" height="264" alt="ReShare Living Group"><img class="on-dark" src="/media/logo-reshare-white.png" width="900" height="264" alt="ReShare Living Group"></a>
<nav class="nav" aria-label="{t('Hoofdmenu', 'Main menu')}">{nav}<span class="hide-s">{langsw(path)}</span><a class="btn btn-ink hide-s" href="mailto:contact@reshareliving.com">Contact</a><button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav">Menu</button></nav>
</div></header>
<div class="mnav" id="mnav" aria-hidden="true"><button class="close" type="button">{t('Sluiten', 'Close')}</button>{mnav}<a href="mailto:contact@reshareliving.com">Contact</a>{langsw(path)}</div>
'''

def rs_index():
    path = {'nl': '/', 'en': '/en/'}
    hp = URL['hp'] + ('/' if LANG == 'nl' else '/en/')
    stations = [
        (0, 'warehouse', t('In het magazijn', 'In the warehouse'), 'KeyPro &amp; Hooft &amp; Petiet',
         t('Een bank staat klaar in het magazijn. Een grote eigen voorraad en een efficiënte logistiek maken snel leveren mogelijk.', 'A sofa waits in the warehouse. A large stock of our own and efficient logistics make fast delivery possible.')),
        (1, 'logeer', t('Leven één, een logeerwoning', 'Life one, a guest home'), 'Hooft &amp; Petiet',
         t('Huurders logeren er een aantal weken terwijl hun eigen huis wordt gerenoveerd. Daarna komt de bank terug, wordt hij met stoom gereinigd en gecontroleerd.', 'Tenants stay a few weeks while their own home is renovated. Then the sofa comes back and is steam cleaned and checked.')),
        (2, 'expat-living', t('Leven twee, een expatwoning', 'Life two, an expat home'), 'KeyPro &amp; Hooft &amp; Petiet',
         t('Voor een bedrijf dat woonruimte regelt voor internationale werknemers. Weer terug, weer opgefrist.', 'For a company arranging homes for international staff. Back again, refreshed again.')),
        (3, 'room-living', t('Leven drie, verkoopstyling', 'Life three, sales styling'), 'Hooft &amp; Petiet',
         t('Een woning in de verkoop, ingericht zodat kopers zien wat er kan.', 'A home for sale, furnished so buyers can see what’s possible.')),
        (3, 'trolley', t('En weer verder', 'And on again'), 'ReShare Living Group',
         t('Meubels worden opgefrist, opnieuw ingezet en alleen vervangen als dat echt nodig is. Zo blijft waarde behouden en wordt verspilling voorkomen.', 'Furniture is refreshed, used again and only replaced when it really has to be. Value stays, waste doesn’t happen.')),
    ]
    lives = ['1', '1', '2', '3', '4']
    st = ''.join('<li class="station" data-stop="%d"><span class="who">%s</span><h3 class="h3">%s</h3><p>%s</p></li>' % (s, w, h, p) for s, k, h, w, p in stations)
    wins = ''.join(pic(k, '', '(max-width:860px) 160px, 300px', extra=' aria-hidden="true"') for s, k, h, w, p in stations)
    stops = [(0, t('Magazijn', 'Warehouse')), (90, t('Logeerwoning', 'Guest home')), (180, t('Expatwoning', 'Expat home')), (270, t('Verkoopstyling', 'Sales styling'))]
    import math
    sv = ''
    for a, l in stops:
        x = 300 + 230 * math.sin(math.radians(a)); y = 300 - 230 * math.cos(math.radians(a))
        tx = 300 + 290 * math.sin(math.radians(a)); ty = 300 - 290 * math.cos(math.radians(a)) + 5
        anchor = 'middle' if a in (0, 180) else ('start' if a == 90 else 'end')
        if a == 90: tx -= 34
        if a == 270: tx += 34
        if a == 0: ty -= 8
        if a == 180: ty += 14
        sv += '<g class="stop"><circle cx="%.1f" cy="%.1f" r="11"/><text x="%.1f" y="%.1f" text-anchor="%s">%s</text></g>' % (x, y, tx, ty, anchor, l)
    sofa = '<g class="cup"><rect x="276" y="56" width="48" height="26" rx="7" fill="#2FA597" stroke="#fff" stroke-width="2.5"/><rect x="272" y="62" width="10" height="22" rx="4" fill="#2FA597" stroke="#fff" stroke-width="2.5"/><rect x="318" y="62" width="10" height="22" rx="4" fill="#2FA597" stroke="#fff" stroke-width="2.5"/></g>'
    loop_svg = ('<svg viewBox="0 0 600 600" aria-hidden="true" style="--len:1445"><circle class="track" cx="300" cy="300" r="230"/>'
                '<circle class="done" cx="300" cy="300" r="230" transform="rotate(-90 300 300)"/>' + sv + '<g class="rider">' + sofa + '</g></svg>')
    return head('rs', t('ReShare Living Group, meubels meerdere levens geven', 'ReShare Living Group, giving furniture more than one life'),
                t('ReShare Living Group brengt KeyPro en Hooft & Petiet samen. Circulair inrichten van tijdelijke en vaste woonoplossingen, eenvoudig en schaalbaar.', 'ReShare Living Group brings KeyPro and Hooft & Petiet together. Circular furnishing for temporary and permanent homes, easy to use and built to grow.'), path) + rs_header(path) + f'''
<main id="main">
<section class="rs-hero" id="idee" data-first>
<div class="rs-ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="#2FA597" stroke-width=".5"/><circle cx="50" cy="50" r="34" fill="none" stroke="#D9CFBD" stroke-width=".25" stroke-dasharray=".8 1.6"/><g class="orb"><circle cx="50" cy="4" r="2.4" fill="#2FA597"/></g></svg></div>
<div class="wrap" style="position:relative">
<p class="kicker">ReShare Living Group</p>
<h1 class="rs-name"><span class="w">Re<small>{t('staat voor hergebruik', 'stands for reuse')}</small></span><span class="w"><i>Share</i><small>{t('staat voor delen', 'stands for sharing')}</small></span><span class="w">Living<small>{t('voor de tijdelijke en vaste woonoplossingen die we mogelijk maken', 'for the temporary and permanent homes we make possible')}</small></span></h1>
<p class="h2">{t('Meubels <em>meerdere levens</em> geven.', 'Giving furniture <em>more than one life.</em>')}</p>
<p class="lede">{t('Organisaties hoeven niet langer afhankelijk te zijn van het bezitten van meubilair. Door te kiezen voor gebruik in plaats van bezit worden meubels slimmer ingezet en verminderen we verspilling.', 'Organisations no longer have to depend on owning furniture. Choosing use over ownership puts furniture to better work and cuts waste.')}</p>
<div class="btn-row"><a class="btn btn-ink" href="#werkwijze">{t('Zo werkt het', 'How it works')} <span class="arr" aria-hidden="true">→</span></a><a class="btn btn-ghost" href="mailto:contact@reshareliving.com">contact@reshareliving.com</a></div>
</div>
</section>

<section class="loop-scene" data-lives='{json.dumps(lives)}' aria-labelledby="loop-h">
<div class="loop-stick">
<div class="loop-copy"><p class="kicker">{t('Eén bank, meerdere levens', 'One sofa, many lives')}</p>
<h2 class="h2" id="loop-h">{t('Hergebruik als <em>standaard.</em>', 'Reuse as <em>the standard.</em>')}</h2>
<p class="lede" style="font-size:18px">{t('Een voorbeeld. Volg één bank door de soorten woningen die KeyPro en Hooft &amp; Petiet inrichten.', 'An example. Follow one sofa through the kinds of home KeyPro and Hooft &amp; Petiet furnish.')}</p>
<p class="life">{t('Leven', 'Life')} <b data-life>1</b></p>
<ol class="stations">{st}</ol></div>
<div class="loop-fig">{loop_svg}<div class="loop-win">{wins}</div><p class="loop-end">{t('Alleen vervangen als het echt nodig is.', 'Only replaced when it really has to be.')}</p></div>
</div>
</section>

<section class="chapter on-night" aria-labelledby="why-h">
<div class="wrap">
<div class="rv"><p class="kicker">{t('Waarom nu', 'Why now')}</p><h2 class="h2" id="why-h" style="max-width:14ch">{t('Van weggooien <em>naar circulair.</em>', 'From throwing away <em>to circular.</em>')}</h2></div>
<div class="stats">
<div class="stat rv"><p class="num"><span data-count="10">10</span><small>{t('miljoen ton', 'million tonnes')}</small></p><p>{t('meubels worden in de EU elk jaar weggegooid, het meeste verbrand of gestort.', 'of furniture are thrown away in the EU every year, most of it burned or landfilled.')}</p><p class="src">{t('Bron', 'Source')} <a href="https://eeb.org/library/circular-economy-opportunities-in-the-furniture-sector/" rel="noopener">European Environmental Bureau</a>, 2017</p></div>
<div class="stat rv d2"><p class="num">50<small>%</small></p><p>{t('circulair inkopen in 2030, het landelijke doel voor overheden, corporaties en instellingen.', 'circular procurement by 2030, the national aim for government, housing associations and institutions.')}</p><p class="src">{t('Bron', 'Source')} <a href="https://www.keypro.nl/in-de-media/keypro-en-hooft-petiet-bundelen-krachten-binnen-reshare-living-group/" rel="noopener">KeyPro</a>, {t('16 oktober 2025', '16 October 2025')}</p></div>
<div class="stat rv d3"><p class="num">2028</p><p>{t('Dan moeten corporaties al hun huurwoningen met label E, F of G hebben aangepakt. Elke zware renovatie vraagt tijdelijke woningen.', 'The year housing associations must have dealt with every rented home on an E, F or G label. Every heavy renovation needs temporary homes.')}</p><p class="src">{t('Bron', 'Source')} <a href="https://www.volkshuisvestingnederland.nl/onderwerpen/verduurzaming-door-woningcorporaties" rel="noopener">Volkshuisvesting Nederland</a></p></div>
</div>
<p class="pull rv">{t('“We bouwen al jaren aan een alternatief voor kopen en weggooien, om die enorme afvalberg kleiner te maken.”', '“For years we’ve been building an alternative to buying and throwing away, to make that huge mountain of waste smaller.”')}</p>
<p class="cite rv">Willem Straat, {t('oprichter en een van de eigenaren van KeyPro, bij de start van ReShare Living Group', 'KeyPro’s founder and one of its owners, at the launch of ReShare Living Group. Translated from Dutch.')}</p>
</div>
</section>

<section id="bedrijven" aria-labelledby="duo-h"><h2 class="sr" id="duo-h">KeyPro {t('en', 'and')} Hooft &amp; Petiet</h2>
<div class="duo">
<div class="duo-half duo-kp"><div class="shape" aria-hidden="true"></div>
<img class="logo" src="/media/logo-keypro.png" width="500" height="275" alt="KeyPro">
<div><p class="since"><small>{t('Sinds', 'Since')}</small>2011</p><p>{t('Een circulaire totaaloplossing voor tijdelijke inrichting. Van meubelverhuur en projectinrichting tot styling, gebaseerd op gebruik in plaats van bezit.', 'A complete circular service for temporary furnishing. From furniture rental and project furnishing to styling, built on use rather than ownership.')}</p>
<ul><li>{t('Vestigingen in Groningen en Amsterdam', 'Bases in Groningen and Amsterdam')}</li><li>{t('Nederland, België, Duitsland en Denemarken', 'The Netherlands, Belgium, Germany and Denmark')}</li><li>{t('Corporaties, gemeenten, vastgoedbeleggers en bedrijven', 'Housing associations, councils, property investors and companies')}</li></ul></div>
<a class="btn btn-ink" href="https://www.keypro.nl/" rel="noopener">{t('Bezoek KeyPro', 'Visit KeyPro')} <span class="arr" aria-hidden="true">→</span></a></div>
<div class="duo-half duo-hp"><div class="shape" aria-hidden="true">{HOUSE}</div>
<img class="logo" src="/media/logo-hp.png" width="700" height="208" alt="Hooft &amp; Petiet">
<div><p class="since"><small>{t('Sinds', 'Since')}</small>2010</p><p>{t('Servicepartner voor instapklare woningen. Meubels, stoffering, accessoires en services, zodat een woning direct bewoonbaar is zodra de sleutel wordt overgedragen.', 'The service partner for move in ready homes. Furniture, floors and curtains, accessories and services, so a home is ready to live in the moment the key is handed over.')}</p>
<ul><li>{t('Logeerwoningen, wisselwoningen en rustwoningen', 'Guest, swap and rest homes')}</li><li>{t('Expatwoningen en modelwoningen', 'Expat homes and model homes')}</li><li>{t('Verkoopstyling en beheer', 'Sales styling and management')}</li></ul></div>
<a class="btn btn-ink" href="{hp}">{t('Bezoek Hooft &amp; Petiet', 'Visit Hooft &amp; Petiet')} <span class="arr" aria-hidden="true">→</span></a></div>
</div>
<div class="on-paper"><div class="wrap"><div class="figures">
<div class="fig rv"><p class="num"><span data-count="45">45</span></p><span>{t('medewerkers in de groep', 'people across the group')}</span></div>
<div class="fig rv d2"><p class="num">3</p><span>{t('steden, KeyPro in Groningen en Amsterdam, Hooft &amp; Petiet in Utrecht', 'cities, KeyPro in Groningen and Amsterdam, Hooft &amp; Petiet in Utrecht')}</span></div>
<div class="fig rv d3"><p class="num">4</p><span>{t('landen waar KeyPro actief is', 'countries KeyPro works in')}</span></div>
<div class="fig rv d4"><p class="num">15</p><span>{t('jaar KeyPro in meubelverhuur', 'years of KeyPro in furniture rental')}</span></div>
</div><p class="src" style="padding-bottom:28px">{t('Bron', 'Source')} <a href="https://www.keypro.nl/in-de-media/hij-werd-uitgelachen-nu-verhuurt-willem-straat-meubels-door-heel-nederland/" rel="noopener">RTV Noord {t('via KeyPro', 'via KeyPro')}</a>, {t('25 november 2025', '25 November 2025')}, <a href="https://www.keypro.nl/in-de-media/keypro-en-hooft-petiet-bundelen-krachten-binnen-reshare-living-group/" rel="noopener">KeyPro</a>, {t('16 oktober 2025', '16 October 2025')}, {t('en', 'and')} <a href="https://www.keypro.nl/in-de-media/meubelverhuurder-wil-circulair-europa-veroveren/" rel="noopener">KeyPro</a>, {t('19 mei 2025', '19 May 2025')}</p></div></div>
</section>

<section class="chapter on-paper" id="werkwijze" aria-labelledby="flow-h">
<div class="wrap">
<div class="grid-2 top"><div class="rv"><p class="kicker">{t('Eén werkwijze', 'One way of working')}</p><h2 class="h2" id="flow-h">{t('Circulair inrichten, <em>zonder gedoe.</em>', 'Circular furnishing, <em>without the hassle.</em>')}</h2></div>
<p class="lede rv d2" style="margin-top:0">{t('Voorraad, kennis van hergebruik, een betrouwbare logistieke keten en partners die meedenken. ReShare brengt die losse schakels samen in één helder model.', 'Stock, know how on reuse, a reliable supply chain and partners who think along. ReShare brings those loose links together in one clear model.')}</p></div>
<ol class="flow">
<li class="rv"><b>{t('Kennismaking', 'Getting to know you')}</b><p>{t('Hoeveel woningen, wanneer, en wie gaan er wonen?', 'How many homes, when, and who will live there?')}</p></li>
<li class="rv d2"><b>{t('Voorstel', 'Proposal')}</b><p>{t('Inrichting, afwerking en diensten, afgestemd op het project.', 'Furnishing, finishing and services, fitted to the project.')}</p></li>
<li class="rv d3"><b>{t('Inrichten', 'Furnishing')}</b><p>{t('Levering, montage en een woning die klaarstaat.', 'Delivery, assembly and a home that’s ready.')}</p></li>
<li class="rv d4"><b>{t('Beheer', 'Management')}</b><p>{t('Sleutels, schoonmaak en één aanspreekpunt.', 'Keys, cleaning and one point of contact.')}</p></li>
<li class="rv"><b>{t('Terug en opnieuw', 'Back and again')}</b><p>{t('Ophalen, reinigen, controleren en weer inzetten.', 'Collect, clean, check and use again.')}</p></li>
</ol>
</div>
</section>

<section class="chapter on-ink" id="missie" aria-labelledby="mis-h">
<div class="wrap">
<div class="rv"><p class="kicker">{t('Onze missie', 'Our mission')}</p><h2 class="h2" id="mis-h">{t('Vijf dingen <em>waar we voor staan.</em>', 'Five things <em>we stand for.</em>')}</h2></div>
<ol class="mission">
<li class="rv"><span>{t('Meubels meerdere levens geven door hergebruik standaard te maken.', 'Give furniture more than one life by making reuse the standard.')}</span></li>
<li class="rv"><span>{t('Organisaties helpen schakelen zonder grote investeringen, door gebruik boven bezit te zetten.', 'Help organisations switch without big investments, by putting use above ownership.')}</span></li>
<li class="rv"><span>{t('Circulair inrichten versimpelen, zodat het voor iedereen toepasbaar is.', 'Make circular furnishing simple, so anyone can use it.')}</span></li>
<li class="rv"><span>{t('Impact meetbaar maken, zodat organisaties precies weten wat het oplevert.', 'Make the impact measurable, so organisations know exactly what it delivers.')}</span></li>
<li class="rv"><span>{t('Klaarstaan voor <em>100% circulair inkopen in 2030</em>, met een helder, schaalbaar model.', 'Be ready for <em>100% circular procurement in 2030</em>, with a clear model that scales.')}</span></li>
</ol>
</div>
</section>

<section class="chapter rs-cta" aria-labelledby="rc-h">
<div class="ring" aria-hidden="true"></div>
<div class="wrap"><p class="kicker">Contact</p><h2 class="h1" id="rc-h" style="max-width:13ch">{t('Samen circulair <em>inrichten?</em>', 'Furnish circular, <em>together?</em>')}</h2>
<div class="btn-row"><a class="btn btn-ink" href="mailto:contact@reshareliving.com">contact@reshareliving.com <span class="arr" aria-hidden="true">→</span></a><a class="btn btn-ghost" href="https://www.keypro.nl/" rel="noopener">KeyPro</a><a class="btn btn-ghost" href="{hp}">Hooft &amp; Petiet</a></div></div>
</section>
</main>
<footer class="ftr"><div class="wrap">
<div class="ftr-grid">
<div><img src="/media/logo-reshare-white.png" width="900" height="264" alt="ReShare Living Group" style="height:42px;width:auto"><p style="max-width:34ch;margin-top:22px">{t('KeyPro en Hooft &amp; Petiet, samen sinds 1 september 2025.', 'KeyPro and Hooft &amp; Petiet, together since 1 September 2025.')}</p></div>
<div><h3>{t('Bedrijven', 'Companies')}</h3><ul><li><a href="https://www.keypro.nl/" rel="noopener">KeyPro</a></li><li><a href="{hp}">Hooft &amp; Petiet</a></li></ul></div>
<div><h3>{t('Op deze site', 'On this site')}</h3><ul><li><a href="#idee">{t('Het idee', 'The idea')}</a></li><li><a href="#werkwijze">{t('Zo werkt het', 'How it works')}</a></li><li><a href="#missie">{t('Missie', 'Mission')}</a></li></ul></div>
<div><h3>Contact</h3><ul><li><a href="mailto:contact@reshareliving.com">contact@reshareliving.com</a></li></ul></div>
</div>
<p class="big" aria-hidden="true">Re<em style="font-style:italic;color:var(--teal)">Share</em> Living</p>
<div class="meta"><span>© 2026 ReShare Living Group</span><span>{t('Prototype door Astra agency, oktober 2026. Dit is niet de live site.', 'Prototype by Astra agency, October 2026. This isn’t the live site.')}</span>{langsw(path)}</div>
</div>
<p class="proto"><b>Prototype</b> Astra agency</p></footer>
<script src="/js/site.js" defer></script><script src="/js/rs.js" defer></script>
</body></html>'''

# ---------------------------------------------------------------- write

def write(site, rel, html):
    p = os.path.join(OUT[site], rel.lstrip('/'), 'index.html')
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(html)

def copy_static(site):
    o = OUT[site]
    if os.path.exists(o): shutil.rmtree(o)
    os.makedirs(o)
    shutil.copytree(os.path.join(B, 'fonts'), os.path.join(o, 'fonts'), ignore=shutil.ignore_patterns('*.txt'))
    for f in os.listdir(os.path.join(B, 'fonts')):
        if f.endswith('.txt'): shutil.copy(os.path.join(B, 'fonts', f), os.path.join(o, 'fonts', f))
    os.makedirs(os.path.join(o, 'css')); os.makedirs(os.path.join(o, 'js')); os.makedirs(os.path.join(o, 'media'))
    shutil.copy(os.path.join(B, 'css', 'base.css'), os.path.join(o, 'css'))
    shutil.copy(os.path.join(B, 'css', site + '.css'), os.path.join(o, 'css'))
    shutil.copy(os.path.join(B, 'js', 'site.js'), os.path.join(o, 'js'))
    shutil.copy(os.path.join(B, 'js', site + '.js'), os.path.join(o, 'js'))
    open(os.path.join(o, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    open(os.path.join(o, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')

def used_media(site):
    out = set()
    for dp, dn, fn in os.walk(OUT[site]):
        for f in fn:
            if f.endswith('.html') or f.endswith('.css'):
                s = open(os.path.join(dp, f)).read()
                import re
                out |= set(re.findall(r'/media/([\w./-]+?\.(?:jpg|png))', s))
    for m in out:
        src = os.path.join(B, 'media', m); dst = os.path.join(OUT[site], 'media', m)
        os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy(src, dst)
    return out

if __name__ == '__main__':
    for site, pages in (('hp', [('/', hp_index, '/en/'), ('/verkoopstyling/', hp_vs, '/en/sales-styling/'), ('/offerte/', hp_quote, '/en/quote/')]),
                        ('rs', [('/', rs_index, '/en/')])):
        copy_static(site)
        for nl_path, fn, en_path in pages:
            for L, p in (('nl', nl_path), ('en', en_path)):
                LANG = L
                write(site, p, fn())
        m = used_media(site)
        print(site, 'pages', len(pages) * 2, 'media', len(m))
