#!/usr/bin/env python3
"""v3 of both sites. v2's flow (audience first, one action) with the art layer Raka asked for on 25 Oct.
   ../site-hp   Hooft & Petiet          NL at /, EN at /en/
   ../site-rs   ReShare Living Group    NL at /, EN at /en/
Every fact is traced in ../research/research.md, the plan is ../research/v3/brief.md."""
import os, json, shutil, re, html as H
from urllib.parse import quote

B = os.path.dirname(os.path.abspath(__file__))
OUT = {'hp': os.path.join(B, '..', 'site-hp'), 'rs': os.path.join(B, '..', 'site-rs')}
URL = {'hp': 'https://astra-hooftenpetiet-prototype.netlify.app', 'rs': 'https://astra-reshare-prototype.netlify.app'}
MAN = json.load(open(os.path.join(B, 'media', 'manifest.json')))
LANG = 'nl'

def t(nl, en): return nl if LANG == 'nl' else en
def esc(s): return H.escape(s, quote=True)
def root(): return '/' if LANG == 'nl' else '/en/'
def other(site): return URL[site] + ('/' if LANG == 'nl' else '/en/')

def pic(key, alt, sizes='100vw', eager=False):
    m = MAN[key]
    files = sorted(zip(m['files'], m['sizes']), key=lambda x: x[1][0])
    srcset = ', '.join('/%s %dw' % (f, s[0]) for f, s in files)
    w, h = files[-1][1]
    small = files[0][0]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    return '<img src="/%s" srcset="%s" sizes="%s" width="%d" height="%d" alt="%s" loading="%s" decoding="async">' % (small, srcset, sizes, w, h, esc(alt), load)

FAV = {
 'hp': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%232F2B45'/%3E%3Cpath d='M32 12L52 27H12z' fill='%23C8D020'/%3E%3Crect x='19' y='30' width='26' height='22' fill='%23C8D020'/%3E%3C/svg%3E",
 'rs': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2322332E'/%3E%3Ccircle cx='32' cy='32' r='16' fill='none' stroke='%23FBFAF7' stroke-width='3'/%3E%3C/svg%3E",
}

def head(site, title, desc, path):
    alt = {'nl': 'en', 'en': 'nl'}[LANG]
    return f'''<!doctype html>
<html lang="{LANG}" class="site-{site}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#FBFAF7">
<link rel="icon" href="{FAV[site]}">
<link rel="alternate" hreflang="{alt}" href="{URL[site]}{path[alt]}">
<link rel="preload" href="/fonts/{'newsreader-latin-opsz-normal' if site == 'hp' else 'albert-sans-latin-wght-normal'}.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css">
<link rel="stylesheet" href="/css/fx.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body class="{site}">
<div class="fx-bg" aria-hidden="true"></div><div class="fx-grain" aria-hidden="true"></div>
<a class="skip" href="#main">{t('Naar de inhoud', 'Skip to content')}</a>
<aside class="note" aria-label="{t('Over deze site', 'About this site')}">{t('Prototype door Astra agency. Niet de live site.', 'Prototype by Astra agency. Not the live site.')}</aside>
'''

def langsw(path):
    return '<span class="lang">' + ''.join('<a href="%s" lang="%s" hreflang="%s"%s>%s</a>' % (path[l], l, l, ' aria-current="true"' if l == LANG else '', l.upper()) for l in ('nl', 'en')) + '</span>'

def header(site, path, left, right_extra, cta, mfoot):
    logo = ('<img class="lg-l" src="/media/logo-hp.png" width="700" height="208" alt="Hooft &amp; Petiet"><img class="lg-d" src="/media/logo-hp-white.png" width="700" height="187" alt="Hooft &amp; Petiet">' if site == 'hp'
            else '<img class="lg-l" src="/media/logo-reshare-ink.png" width="900" height="264" alt="ReShare Living Group"><img class="lg-d" src="/media/logo-reshare-white.png" width="900" height="264" alt="ReShare Living Group">')
    lnav = ''.join('<a class="d %s" href="%s">%s</a>' % (c, h, l) for h, l, c in left)
    mlinks = ''.join('<li><a href="%s">%s</a></li>' % (h, l) for h, l, c in left) + ''.join('<li><a href="%s">%s</a></li>' % (h, l) for h, l in mfoot)
    return f'''<header class="hdr"><div class="wrap hdr-in">
<nav class="l" aria-label="{t('Hoofdmenu', 'Main menu')}"><button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav">Menu</button>{lnav}</nav>
<a class="logo" href="{root()}">{logo}</a>
<nav class="r" aria-label="{t('Contact en taal', 'Contact and language')}"><span class="d w">{langsw(path)}</span>{right_extra}<a class="btn sm d" href="{cta[0]}">{cta[1]}</a><a class="m-cta cap" href="{cta[0]}">{cta[2]}</a></nav>
</div></header>
<div class="mnav" id="mnav" aria-hidden="true"><button class="close" type="button">{t('Sluiten', 'Close')}</button><ul>{mlinks}</ul>
<div class="foot">{langsw(path)}</div></div>
'''

# ------------------------------------------------------------------ Hooft & Petiet

TYPES = [('Logeerwoning', 'Guest home', 'Tijdens renovatie', 'During renovation'),
         ('Rustwoning', 'Rest home', 'Overdag', 'Daytime'),
         ('Wisselwoning', 'Swap home', 'Langere renovatie', 'Longer renovation'),
         ('Calamiteitenwoning', 'Emergency home', 'Na brand of water', 'After fire or flood'),
         ('Verkoopstyling', 'Sales styling', 'Woning in de verkoop', 'Home for sale'),
         ('Expat huisvesting', 'Expat housing', 'Internationale werknemers', 'International staff'),
         ('Opvanglocatie', 'Reception location', 'Gemeenten en opvang', 'Councils and reception'),
         ('Model/projectwoning', 'Model or project home', 'Nieuwbouw en renovatie', 'New build and renovation'),
         ('Recreatiewoning', 'Holiday home', 'Parken en campings', 'Parks and campsites'),
         ('Anders', 'Other', 'Vertel het ons', 'Tell us')]
MONTHS_NL = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
DUUR = [('Een paar weken', 'A few weeks'), ('Een tot drie maanden', 'One to three months'), ('Langer dan drie maanden', 'Longer than three months'), ('Nog niet bekend', 'Not known yet')]

def months():
    out, y, m = [], 2026, 11
    for _ in range(14):
        out.append(('%d-%02d' % (y, m), (MONTHS_NL if LANG == 'nl' else MONTHS_EN)[m - 1] + ' %d' % y))
        m += 1
        if m == 13: y, m = y + 1, 1
    return out

def hp_header(path):
    r = root(); q = r + t('offerte/', 'quote/')
    left = [(r + '#werkwijze', t('Werkwijze', 'How it works'), ''), (r + '#projecten', t('Projecten', 'Projects'), ''),
            (r + t('verkoopstyling/', 'sales-styling/'), t('Verkoopstyling', 'Sales styling'), 'w')]
    extra = '<a class="d w" href="tel:+31852734872">085 2734 872</a>'
    mfoot = [(q, t('Offerte aanvragen', 'Request a quote')), ('tel:+31852734872', t('Bel 085 2734 872', 'Call 085 2734 872')), (URL['rs'] + ('/' if LANG == 'nl' else '/en/'), 'ReShare Living Group')]
    return header('hp', path, left, extra, (q, t('Offerte aanvragen', 'Request a quote'), t('Offerte', 'Quote')), mfoot)

def hp_footer(path):
    r = root(); q = r + t('offerte/', 'quote/')
    return f'''<footer class="ftr dusk-sec" data-tone="dusk"><div class="wrap">
<div class="ftr-g">
<div><img class="flogo" src="/media/logo-hp-white.png" width="700" height="187" alt="Hooft &amp; Petiet"><p class="about">{t('Projectinrichting en meubelverhuur sinds 2010. Onderdeel van <a class="u" href="' + other('rs') + '">ReShare Living Group</a>.', 'Project furnishing and furniture rental since 2010. Part of <a class="u" href="' + other('rs') + '">ReShare Living Group</a>.')}</p></div>
<div><h2>{t('Woningen', 'Homes')}</h2><ul>
<li><a href="{q}?type=Logeerwoning">{t('Logeerwoningen', 'Guest homes')}</a></li><li><a href="{q}?type=Rustwoning">{t('Rustwoningen', 'Rest homes')}</a></li>
<li><a href="{q}?type=Wisselwoning">{t('Wisselwoningen', 'Swap homes')}</a></li><li><a href="{q}?type=Calamiteitenwoning">{t('Calamiteitenwoningen', 'Emergency homes')}</a></li>
<li><a href="{q}?type={quote('Expat huisvesting', safe='')}">{t('Expatwoningen', 'Expat homes')}</a></li><li><a href="{r}{t('verkoopstyling/', 'sales-styling/')}">{t('Verkoopstyling', 'Sales styling')}</a></li></ul></div>
<div><h2>Contact</h2><ul><li><a href="tel:+31852734872">085 2734 872</a></li><li><a href="mailto:info@hooftenpetiet.nl">info@hooftenpetiet.nl</a></li><li>Reactorweg 291 B<br>3542 AD Utrecht</li></ul></div>
<div><h2>{t('Groep', 'Group')}</h2><ul><li><a href="{other('rs')}">ReShare Living Group</a></li><li><a href="https://www.keypro.nl/" rel="noopener">KeyPro</a></li></ul></div>
</div>
<div class="base"><span>© H &amp; P Interieur B.V. 2026</span><span>{t('Prototype door Astra agency, oktober 2026. Aanvragen worden niet verzonden.', 'Prototype by Astra agency, October 2026. Requests aren’t sent.')}</span>{langsw(path)}</div>
</div></footer>
<script src="/js/site.js" defer></script>
<script src="/js/fx.js" defer></script>
</body></html>'''

def close_hp(title, text, bar=True, cta=None):
    q = root() + t('offerte/', 'quote/')
    if bar:
        topts = ''.join('<option value="%s">%s</option>' % (esc(nl), esc(t(nl, en))) for nl, en, _, _ in TYPES[:4])
        act = f'''<div class="pbar"><form action="{q}" method="get">
<div class="pf"><label for="c-type">{t('Soort woning', 'Kind of home')}</label><select id="c-type" name="type">{topts}</select></div>
<div class="pf"><label for="c-n">{t('Aantal woningen', 'Number of homes')}</label><input id="c-n" name="woningen" type="number" min="1" max="999" inputmode="numeric" placeholder="{t('Bijvoorbeeld 24', 'For example 24')}"></div>
<button type="submit">{t('Beschikbaarheid aanvragen', 'Check availability')}</button>
</form></div>'''
    else:
        act = f'<div class="acts"><a class="btn solid" href="{cta[0]}">{cta[1]}</a><a class="btn" href="tel:+31852734872">{t("Bel 085 2734 872", "Call 085 2734 872")}</a></div>'
    return f'''<div class="horizon" aria-hidden="true"></div>
<section class="sec close3 dusk-sec dark" data-tone="dusk" aria-labelledby="close-h"><div class="wrap close3-g">
<div class="window" aria-hidden="true"><i></i></div>
<div>
<h2 class="t1" id="close-h">{title}</h2>
<p class="lead" style="margin-top:22px">{text}</p>
{act}
<p class="meta"><a href="tel:+31852734872">085 2734 872</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="mailto:info@hooftenpetiet.nl">info@hooftenpetiet.nl</a>&nbsp;&nbsp;·&nbsp;&nbsp;Reactorweg 291 B, Utrecht</p>
</div>
</div></section>'''

def win(key, shape, alt=''):
    m = MAN[key]
    small = sorted(zip(m['files'], m['sizes']), key=lambda x: x[1][0])[0][0]
    return '<span class="hx-win %s"><img src="/%s" alt="%s" loading="eager" decoding="async"></span>' % (shape, small, esc(alt))

def win_img(key):
    m = MAN[key]
    return '<img src="/%s" alt="" loading="lazy" decoding="async">' % sorted(zip(m['files'], m['sizes']), key=lambda x: x[1][0])[-1][0]

def hp_index():
    path = {'nl': '/', 'en': '/en/'}
    r = root(); q = r + t('offerte/', 'quote/')
    topts = ''.join('<option value="%s">%s</option>' % (esc(nl), esc(t(nl, en))) for nl, en, _, _ in TYPES[:4])
    mopts = '<option value="">%s</option>' % t('Nog niet bekend', 'Not known yet') + ''.join('<option value="%s">%s</option>' % (v, l) for v, l in months())
    dopts = ''.join('<option value="%s">%s</option>' % (esc(t(nl, en)), esc(t(nl, en))) for nl, en in DUUR)
    logos = ['portaal', 'stadgenoot', 'de-alliantie', 'havensteder', 'hef-wonen', 'cazas-wonen', 'heijmans', 'bam-wonen']
    names = {'portaal': 'Portaal', 'stadgenoot': 'Stadgenoot', 'de-alliantie': 'de Alliantie', 'havensteder': 'Havensteder', 'hef-wonen': 'HEF Wonen', 'cazas-wonen': 'Cazas Wonen', 'heijmans': 'Heijmans', 'bam-wonen': 'BAM Wonen'}
    lg = ''.join('<li><img src="/media/clients/%s.png" alt="%s" loading="lazy" height="30"></li>' % (l, names[l]) for l in logos)
    rows = [
        (t('Inrichting', 'Furnishing'), t('Zitmeubels en bedden, tafels en stoelen, keukeninventaris en linnengoed.', 'Seating and beds, tables and chairs, kitchenware and linen.'), 'sofa-cushion', t('Een ingerichte woonkamer met bank en salontafel', 'A furnished living room with a sofa and coffee table')),
        (t('Stoffering en afwerking', 'Floors and finishing'), t('Vloeren, schilderwerk, raambekleding en verlichting.', 'Floors, painting, window coverings and lighting.'), 'vloer', t('Een vloerlegger legt een nieuwe vloer', 'A floor fitter laying a new floor')),
        (t('Apparatuur', 'Appliances'), t('Van witgoed tot televisie en internet.', 'From white goods to television and internet.'), 'tv-room', t('Iemand zet een televisie klaar', 'Someone setting up a television')),
        (t('Ontvangst', 'Welcome'), t('Een schoon en fris huis, een presentje en koffie of thee bij de check in.', 'A clean, fresh home, a small gift and coffee or tea at check in.'), 'welcome', t('Een welkomstkaart, een map en een pot snoep worden klaargezet', 'A welcome card, a folder and a jar of sweets being set out')),
        (t('Beheer', 'Management'), t('Sleutels, contracten, in en uitcheck met inventariscontrole.', 'Keys, contracts, check in and out with an inventory check.'), 'hp-bus', t('Twee mensen in Hooft & Petiet jassen laden een stoel in een bus', 'Two people in Hooft & Petiet jackets loading a chair into a van')),
        (t('Wisselschoonmaak', 'Cleaning between stays'), t('Na iedere bewonerswissel, gecontroleerd en direct klaar.', 'After every change of resident, checked and ready.'), 'cushion', t('Iemand legt een kussen op een bank', 'Someone placing a cushion on a sofa')),
        (t('Eén aanspreekpunt', 'One point of contact'), t('Voor bewoners tijdens hun verblijf, en voor u een overzicht per wissel.', 'For residents during their stay, and a report for you on every change.'), 'team-phone', t('Iemand aan de telefoon op kantoor', 'Someone on the phone in an office')),
    ]
    hl = ''.join('<li><span class="n">%02d</span><b>%s</b><span class="d">%s</span></li>' % (i + 1, a, b) for i, (a, b, _, _) in enumerate(rows))
    himgs = ''.join(pic(k, alt, '(max-width:900px) 100vw, 40vw') for _, _, k, alt in rows)
    homes = [
        ('Logeerwoning', t('Logeerwoning', 'Guest home'), t('Bewoners kunnen een aantal weken niet thuis wonen.', 'Residents can’t live at home for a few weeks.'), t('Kleding, toiletartikelen en eigen beddengoed. De rest staat klaar.', 'Clothes, toiletries and their own bedding. Everything else is ready.')),
        ('Rustwoning', t('Rustwoning', 'Rest home'), t('Renovatie in bewoonde staat. Overdag rustig werken, of slapen na een nachtdienst.', 'Renovation while people stay at home. A quiet place to work in the day, or to sleep after a night shift.'), t('Niets. Een ingerichte woonkamer met werkplekken en een kookvoorziening.', 'Nothing. A furnished living room with places to work and somewhere to cook.')),
        ('Wisselwoning', t('Wisselwoning', 'Swap home'), t('Een renovatie die langer duurt.', 'A renovation that takes longer.'), t('Hun eigen interieur. Wij stofferen de woning vooraf.', 'Their own furniture. We fit the floors and curtains in advance.')),
    ]
    peek = '<div class="peek" aria-hidden="true">' + ''.join(win_img(k) for k in ('logeer', 'rust', 'wissel')) + '</div>'
    hrows = ''.join(f'<div class="tbl-r" data-peek="{i}"><h3 class="t3">{name}</h3><p>{when}</p><p>{bring}</p><a class="go" href="{q}?type={esc(v)}" aria-label="{t("Aanvragen", "Request")}, {name}">{t("Aanvragen", "Request")}</a></div>' for i, (v, name, when, bring) in enumerate(homes))
    kin_words = [(t('Logeerwoning', 'Guest home'), 'logeer', 'arch'), (t('Rustwoning', 'Rest home'), 'rust', 'disc'), (t('Wisselwoning', 'Swap home'), 'wissel', 'house')]
    kin = ''.join('<span class="kin-item">%s%s</span>' % (w, win(k, s)) for w, k, s in kin_words) * 2
    projects = [
        ('Portaal', 'Overvecht, Utrecht', t('Logeerwoningen, contracten, in en uitcheck en schoonmaak bij de renovatie van vijf flats van tien hoog.', 'Guest homes, contracts, check in and out and cleaning for the renovation of five ten storey blocks.'), t('570 woningen', '570 homes')),
        ('HEF Wonen', 'Liskwartier, Rotterdam', t('Logeerwoningen bij de verduurzaming van 45 woningen.', 'Guest homes for the upgrade of 45 homes.'), t('12 logeerwoningen', '12 guest homes')),
        ('Stadgenoot', t('West en Oud-West, Amsterdam', 'West and Oud-West, Amsterdam'), t('Logeer, wissel, rust en calamiteitenwoningen voor de komende jaren. Smalle trappenhuizen vragen om verhuisliften en meubels die passen.', 'Guest, swap, rest and emergency homes for the coming years. Narrow stairwells call for furniture hoists and pieces that fit.'), t('4 soorten woningen', '4 kinds of home')),
        ('Cazas Wonen', 'IJsselstein', t('Logeerwoningen bij de schakelflats aan de Lanceerplaats en de Televisiebaan.', 'Guest homes for the flats on the Lanceerplaats and the Televisiebaan.'), t('Al een aantal jaren partner', 'A partner for several years')),
    ]
    prows = ''.join(f'<div class="tbl-r"><h3 class="t3">{c}</h3><p>{w}</p><p>{d}</p><p class="num">{n}</p></div>' for c, w, d, n in projects)
    pano_keys = ['room-chaise', 'vk-01', 'room-living', 'room-styled', 'room-dining', 'expat-living', 'room-light', 'room-lounge', 'bedroom', 'vk-08', 'room-sofa', 'model', 'room-corner', 'calamiteit', 'room-bed']
    pano = ''.join('<figure style="--i:%d">%s</figure>' % (i, pic(k, '', '280px')) for i, k in enumerate(pano_keys))
    tiles = [
        ('room-styled', r + t('verkoopstyling/', 'sales-styling/'), t('Verkoopstyling', 'Sales styling'), t('Twee maanden styling, vanaf € 2.150.', 'Two months of styling, from €2,150.'), t('Bereken uw prijs', 'Work out your price'), t('Een lichte woonkamer na verkoopstyling', 'A bright living room after sales styling')),
        ('expat-living', q + '?type=' + quote('Expat huisvesting', safe=''), t('Expatwoningen', 'Expat homes'), t('Van bank tot schemerlamp, van stofzuiger tot theelepel.', 'From sofa to table lamp, vacuum cleaner to teaspoon.'), t('Aanvragen', 'Request'), t('Een ingerichte woonkamer', 'A furnished living room')),
        ('model', q + '?type=' + quote('Model/projectwoning', safe=''), t('Model en projectwoningen', 'Model and project homes'), t('Laat zien hoe het eindresultaat wordt, met de opties erbij.', 'Show what the finished home will look like, options included.'), t('Aanvragen', 'Request'), t('Een gestylede woonkamer', 'A styled living room')),
        ('calamiteit', q + '?type=Calamiteitenwoning', t('Calamiteitenwoningen', 'Emergency homes'), t('Schoon en compleet als bewoners plotseling weg moeten.', 'Clean and complete when residents have to leave suddenly.'), t('Aanvragen', 'Request'), t('Een ingerichte slaapkamer', 'A furnished bedroom')),
    ]
    tl = ''.join(f'<li class="tile"><a href="{h}" tabindex="-1" aria-hidden="true"><div class="ph rv">{pic(k, a, "(max-width:900px) 50vw, 25vw")}</div></a><h3 class="t3">{n}</h3><p>{d}</p><a class="cap" href="{h}">{l}<span class="sr">, {n}</span></a></li>' for k, h, n, d, l, a in tiles)
    badge = t('Projectinrichting · sinds 2010 · Utrecht · ', 'Project furnishing · since 2010 · Utrecht · ')
    room_alt = t('Een lichte eetkamer met houten tafel en openslaande deuren', 'A bright dining room with a wooden table and French doors')

    return head('hp', t('Hooft & Petiet, tijdelijke woningen voor renovaties', 'Hooft & Petiet, temporary homes for renovations'),
                t('Logeer, rust en wisselwoningen voor renovaties van woningcorporaties en bouwbedrijven. Ingericht, beheerd en op tijd klaar, sinds 2010.', 'Guest, rest and swap homes for renovations by housing associations and builders. Furnished, managed and ready on time, since 2010.'), path) + hp_header(path) + f'''
<main id="main">
<section class="hx" data-tone="dawn" aria-labelledby="hero-h"><div class="hx-stick">
<div class="hx-lamp" aria-hidden="true"></div>
<h1 class="hx-title" id="hero-h"><span class="hx-l l1">{t('Uw bewoners', 'Your residents')} {win('room-light', 'arch grow')}</span> <span class="hx-l l2">{t('pakken alleen hun', 'only have to unpack')}</span> <span class="hx-l l3">{t('koffer nog uit.', 'their suitcase.')} {win('welcome', 'house')}</span></h1>
<a class="hx-badge" href="#werkwijze" aria-label="{t('Zo werkt het', 'How it works')}"><svg viewBox="0 0 160 160" aria-hidden="true"><defs><path id="bc" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0"/></defs><g class="ring"><text><textPath href="#bc" textLength="386" lengthAdjust="spacing">{badge}</textPath></text></g><circle cx="80" cy="80" r="40" fill="#2F2B45"/><path d="M80 58L101 74H59z" fill="#C8D020"/><rect x="65" y="77" width="30" height="24" fill="#C8D020"/></svg></a>
<p class="hx-sub">{t('Logeer, rust en wisselwoningen voor renovaties van woningcorporaties en bouwbedrijven. Ingericht, beheerd en op tijd klaar. Sinds 2010.', 'Guest, rest and swap homes for renovations by housing associations and builders. Furnished, managed and ready on time. Since 2010.')}</p>
<div class="hx-room">{pic('room-light', room_alt, '100vw', eager=True)}<div class="hx-dusk"></div><div class="hx-sun"></div><div class="hx-scrim"></div></div>
<p class="hx-end">{t('Direct bewoonbaar, zodra de sleutel wordt overgedragen.', 'Ready to live in, the moment the key is handed over.')}</p>
<section class="pbar" aria-label="{t('Uw project', 'Your project')}">
<form action="{q}" method="get">
<div class="pf"><label for="b-type">{t('Soort woning', 'Kind of home')}</label><select id="b-type" name="type">{topts}</select></div>
<div class="pf"><label for="b-n">{t('Aantal woningen', 'Number of homes')}</label><input id="b-n" name="woningen" type="number" min="1" max="999" inputmode="numeric" placeholder="{t('Bijvoorbeeld 24', 'For example 24')}"></div>
<div class="pf"><label for="b-van">{t('Vanaf', 'From')}</label><select id="b-van" name="vanaf">{mopts}</select></div>
<div class="pf"><label for="b-duur">{t('Hoe lang', 'How long')}</label><select id="b-duur" name="duur">{dopts}</select></div>
<button type="submit">{t('Beschikbaarheid aanvragen', 'Check availability')}</button>
</form>
</section>
</div></section>

<section class="sec verdict" data-tone="dawn" aria-label="{t('Wat bewoners zeggen', 'What residents say')}"><div class="wrap">
<blockquote class="fill">{t('“We hebben er geen woorden voor, helemaal top!”', '“We have no words for it, absolutely brilliant!”')}</blockquote>
<p class="by">{t('Een logee over de logeerwoning. Een onafhankelijk bureau meet voor onze klanten hoe tevreden hun logees zijn. In 2020 gaven zij ons een 8 tot 8,5.', 'A resident on their guest home, translated from Dutch. An independent agency measures for our clients how happy their residents are. In 2020 they gave us 8 to 8.5 out of 10.')}</p>
<div class="logos"><span class="lab">{t('Onze partners', 'Our partners')}</span><ul>{lg}</ul></div>
</div></section>

<section class="sec hand" id="werkwijze" data-tone="day" aria-labelledby="ww-h"><div class="wrap">
<div class="head"><h2 class="t2" id="ww-h">{t('Van sleutel tot uitcheck, in één hand.', 'From keys to check out, in one pair of hands.')}</h2>
<p class="lead">{t('U kiest zelf wat u bij ons onderbrengt. Wij zorgen dat alles op elkaar aansluit, op de planning van de aannemer, en dat bewoners één aanspreekpunt hebben.', 'You choose what to hand to us. We make it all fit together, on the contractor’s schedule, with one point of contact for residents.')}</p></div>
<div class="hand-g">
<div class="hand-ph"><div class="hand-frame">{himgs}</div><div class="hand-cap" aria-hidden="true"><span data-hn>01</span><span data-ht>{rows[0][0]}</span></div></div>
<div><ul class="hand-list">{hl}</ul>
<div class="say"><blockquote>{t('“Dit gaf ons de ruimte om ons te focussen op de renovatie zelf.”', '“It gave us room to focus on the renovation itself.”')}</blockquote>
<p class="by">{t('Danny Mooren, sociaal projectleider bij Portaal, over 570 gerenoveerde woningen in Overvecht', 'Danny Mooren, social project lead at Portaal, on 570 renovated homes in Overvecht. Translated from Dutch.')}</p></div></div>
</div>
</div></section>

<section class="sec" id="woningen" data-tone="day" aria-labelledby="wo-h" style="padding-top:0">
<div class="kin" aria-hidden="true"><div class="kin-track">{kin}</div></div>
<div class="wrap">
<div class="head"><h2 class="t2" id="wo-h">{t('Logeer, rust of wissel.', 'Guest, rest or swap.')}</h2><p class="lead">{t('Hoe ingrijpend de renovatie is, bepaalt welke woning past. Twijfelt u, dan denken we mee.', 'How heavy the renovation is decides which home fits. If you’re not sure, we’ll think it through with you.')}</p></div>
<div class="tbl"><div class="tbl-h"><span class="lab">{t('Woning', 'Home')}</span><span class="lab">{t('Wanneer', 'When')}</span><span class="lab">{t('Bewoners nemen mee', 'Residents bring')}</span><span></span></div>{hrows}</div>
</div>{peek}</section>

<section class="sec" id="projecten" data-tone="gold" aria-labelledby="pr-h"><div class="wrap">
<div class="head"><h2 class="t2" id="pr-h">{t('Voor corporaties door heel Nederland.', 'For housing associations across the Netherlands.')}</h2><p class="lead">{t('Of het nu om 1 of 100 woningen gaat. Een paar projecten, in de woorden van wie erbij was.', 'Whether it’s 1 home or 100. A few projects, in the words of the people involved.')}</p></div>
</div>
<div class="pano" aria-hidden="true"><div class="pano-ring">{pano}</div></div>
<div class="wrap">
<div class="tbl"><div class="tbl-h"><span class="lab">{t('Opdrachtgever', 'Client')}</span><span class="lab">{t('Waar', 'Where')}</span><span class="lab">{t('Wat we deden', 'What we did')}</span><span class="lab" style="justify-self:end">{t('Omvang', 'Scale')}</span></div>{prows}</div>
<div class="say" style="border-top:0;padding-top:0"><blockquote>{t('“Dat er zelfs servies, schoonmaakmiddelen en gratis internet aanwezig was, dat maakte het verschil!”', '“That there was even crockery, cleaning products and free internet, that made the difference!”')}</blockquote>
<p class="by">{t('Thierry Farla, bewonersbegeleider bij HEF Wonen tijdens het project', 'Thierry Farla, resident support officer at HEF Wonen during the project. Translated from Dutch.')}</p></div>
<div class="aside"><span class="lab">{t('Voor uw aanbesteding', 'For your tender')}</span><p>{t('Ons pand in Utrecht heeft energielabel A en zonnepanelen. Meubels worden met stoom gereinigd en na een huurperiode opnieuw ingezet, bij hout letten we op FSC, en we voldoen aan de SROI norm van 5%. Sinds 1 september 2025 zijn we samen met KeyPro onderdeel van ReShare Living Group.', 'Our building in Utrecht has energy label A and solar panels. Furniture is steam cleaned and used again after a rental, we look for FSC on wood, and we meet the 5% SROI standard. Since 1 September 2025 we’ve been part of ReShare Living Group, together with KeyPro.')}</p></div>
</div></section>

<section class="sec" data-tone="gold" aria-labelledby="ook-h"><div class="wrap">
<div class="head"><h2 class="t2" id="ook-h">{t('Ook voor makelaars, werkgevers en ontwikkelaars.', 'Also for estate agents, employers and developers.')}</h2></div>
<ul class="tiles">{tl}</ul>
</div></section>

{close_hp(t('Vertel ons over uw project.', 'Tell us about your project.'), t('U krijgt een voorstel voor de inrichting en de diensten die u bij ons onderbrengt.', 'You’ll get a proposal for the furnishing and the services you hand to us.'))}
</main>
''' + hp_footer(path)

def hp_vs():
    path = {'nl': '/verkoopstyling/', 'en': '/en/sales-styling/'}
    q = root() + t('offerte/', 'quote/')
    sizes = [(50, 2150), (75, 2549), (100, 3150), (125, 3550), (250, 0)]
    btns = ''.join('<button class="size" type="button" aria-pressed="false" data-price="%d" data-label="%s">%d<small>m²</small></button>' % (p, esc(t('tot %d m²' % m, 'up to %d m²' % m)), m) for m, p in sizes)
    txt = json.dumps({'ask': t('Op aanvraag', 'On request'), 'askNote': t('Voor woningen tot 250 m² maken we een prijs op maat.', 'For homes up to 250 m² we price to measure.'),
                      'pack': t('Vanaf, inclusief btw. Pakket {size}, {base} voor twee maanden', 'From, including VAT. The {size} package, {base} for two months'),
                      'plus': t(', plus {n} weken à {w}.', ', plus {n} weeks at {w}.')}, ensure_ascii=False)
    gal = [('g1', 'room-sofa', t('Een lichte woonkamer met hoekbank', 'A bright living room with a corner sofa')),
           ('g2', 'vase', t('Een vaas met bloemen wordt op tafel gezet', 'A vase of flowers being set on a table')),
           ('g3', 'bedroom', t('Een gestylede slaapkamer', 'A styled bedroom')),
           ('g4', 'room-dining', t('Een eethoek bij openslaande deuren', 'A dining area by French doors'))]
    speed = {'g1': .12, 'g2': -.14, 'g3': .3, 'g4': .06}
    galh = ''.join('<figure class="%s rv" data-speed="%s">%s</figure>' % (c, speed[c], pic(k, a, '(max-width:760px) 100vw, 50vw')) for c, k, a in gal)
    rows = [(t('Persoonlijke aanpak', 'A personal approach'), t('Geen standaard styling, maar een presentatie die past bij de woning, de omgeving en de doelgroep.', 'No standard styling, but a presentation that suits the home, the area and the buyers you want.')),
            (t('Sterkere foto’s', 'Stronger photos'), t('Rust, sfeer en samenhang, zodat ruimtes beter tot hun recht komen, online en tijdens bezichtigingen.', 'Calm, warmth and coherence, so rooms show at their best online and at viewings.')),
            (t('Eigen collectie', 'Our own collection'), t('Met bestaand meubilair of een aanvulling uit onze eigen collectie maken we de woning verkoopklaar voor fotografie en bezichtigingen.', 'With the furniture already there, or pieces from our own collection, we get the home ready for photos and viewings.'))]
    dl = ''.join('<div class="row"><dt>%s</dt><dd>%s</dd></div>' % (a, b) for a, b in rows)
    return head('hp', t('Verkoopstyling voor twee maanden, Hooft & Petiet', 'Sales styling for two months, Hooft & Petiet'),
                t('Verkoopstyling voor twee maanden, met styling, meubels, levering en ophalen. Reken uw prijs direct uit.', 'Two months of sales styling with styling, furniture, delivery and collection. Work out your price straight away.'), path) + hp_header(path) + f'''
<main id="main">
<section class="vs-hero" data-tone="day" aria-labelledby="vs-h"><div class="wrap vs-g">
<div>
<h1 class="t1" id="vs-h">{t('Verkoopstyling voor twee maanden.', 'Sales styling for two months.')}</h1>
<p class="lead" style="margin-top:24px">{t('Met meubels en accessoires uit onze eigen collectie. Woonkamer, keuken, hal en badkamer zitten er altijd in, net als levering en ophalen.', 'With furniture and accessories from our own collection. Living room, kitchen, hall and bathroom are always included, and so are delivery and collection.')}</p>
<div class="calc" data-txt='{esc(txt)}'>
<span class="lab" id="sz-l">{t('Woonoppervlak tot', 'Floor area up to')}</span>
<div class="sizes" role="group" aria-labelledby="sz-l">{btns}</div>
<div class="price" aria-live="polite"><span class="amt" data-amt>€ 2.549</span><span class="brk" data-brk></span></div>
<div class="weeks" role="group" aria-label="{t('Verlengen per week', 'Extend by the week')}"><button type="button" data-dec aria-label="{t('Een week minder', 'One week less')}">−</button><output aria-live="polite">0</output><button type="button" data-inc aria-label="{t('Een week meer', 'One week more')}">+</button><span>{t('weken extra, à € 99,99', 'extra weeks, at €99.99')}</span></div>
<div class="acts" style="margin-top:30px"><a class="btn solid" data-req data-base="{q}?type=Verkoopstyling" href="{q}?type=Verkoopstyling">{t('Pakket aanvragen', 'Request this package')}</a></div>
<p class="fine">{t('De prijs hangt ook af van het aantal slaapkamers of werkkamers en van de regio.', 'The price also depends on the number of bedrooms or studies and on the region.')}</p>
</div>
</div>
<div class="vs-ph"><div class="arch">{pic('room-living', t('Een lichte woonkamer met vloerkleed en bank', 'A bright living room with a rug and sofa'), '(max-width:900px) 100vw, 45vw', eager=True)}</div><div class="disc">{pic('vase', t('Een vaas met bloemen wordt op tafel gezet', 'A vase of flowers being set on a table'), '220px')}</div></div>
</div></section>

<section class="sec" data-tone="gold" style="padding-top:0"><div class="wrap gal3">{galh}</div></section>

<section class="sec" data-tone="gold" aria-labelledby="mm-h"><div class="wrap split2 rev">
<div><h2 class="t2" id="mm-h">{t('Meer dan meubels.', 'More than furniture.')}</h2>
<p class="lead">{t('Een woning verkoopt beter wanneer kopers zich er direct iets bij kunnen voorstellen. Niet overdadig en niet afstandelijk, maar afgestemd op de woning en de doelgroep.', 'A home sells better when buyers can picture themselves in it straight away. Not overdone and not cold, but matched to the home and the buyers you want.')}</p>
<dl class="rows">{dl}</dl></div>
<figure class="ph rv arch">{pic('cushion2', t('Een kussen wordt op een bank geschikt', 'A cushion being arranged on a sofa'), '(max-width:900px) 100vw, 40vw')}</figure>
</div></section>

{close_hp(t('Klaar voor de bezichtiging?', 'Ready for the viewing?'), t('Vraag het pakket aan, dan nemen we contact met u op.', 'Request the package and we’ll be in touch.'), bar=False, cta=(q + '?type=Verkoopstyling', t('Pakket aanvragen', 'Request this package')))}
</main>
''' + hp_footer(path)

def hp_quote():
    path = {'nl': '/offerte/', 'en': '/en/quote/'}
    th = ''.join('<label class="type"><input type="radio" name="type" value="%s" required><span><b>%s</b><small>%s</small></span></label>' % (esc(nl), esc(t(nl, en)), esc(t(snl, sen))) for nl, en, snl, sen in TYPES)
    styles = [('Landelijk & Romantisch', 'Country and romantic'), ('Stoer & Trendy', 'Bold and on trend'), ('Strak & Design', 'Clean and design'), ('Anders', 'Other')]
    sh = ''.join('<label class="opt"><input type="radio" name="stijl" value="%s"><span>%s</span></label>' % (esc(nl), esc(t(nl.replace(' & ', ' en '), en))) for nl, en in styles)
    packs = [('Keukenpakket', 'Kitchen pack'), ('Linnenpakket', 'Linen pack'), ('Huishoudpakket', 'Household pack'), ('Tuinpakket', 'Garden pack'), ('Apparaten', 'Appliances'), ('Kinderpakket', 'Children’s pack'), ('Seniorenpakket', 'Seniors’ pack'), ('Beheer', 'Management')]
    ph = ''.join('<label class="opt"><input type="checkbox" name="pakketten" value="%s"><span>%s</span></label>' % (esc(nl), esc(t(nl, en))) for nl, en in packs)
    dopts = '<option value="">%s</option>' % t('Kies', 'Choose') + ''.join('<option value="%s">%s</option>' % (esc(t(nl, en)), esc(t(nl, en))) for nl, en in DUUR)
    labels = json.dumps({'type': t('Soort woning', 'Kind of home'), 'woningen': t('Aantal woningen', 'Homes'), 'personen': t('Personen per woning', 'People per home'),
                         'oppervlak': t('Oppervlak in m²', 'Floor area in m²'), 'datum': t('Gewenste levering', 'Delivery date'), 'duur': t('Hoe lang', 'How long'),
                         'ruimten': t('Ruimten', 'Rooms'), 'stijl': t('Stijl', 'Style'), 'pakketten': t('Extra', 'Extras'), 'naam': t('Naam', 'Name'),
                         'bedrijf': t('Organisatie', 'Organisation'), 'mail': t('Mail', 'Email'), 'telefoon': t('Telefoon', 'Phone'), 'wensen': t('Wensen', 'Wishes')}, ensure_ascii=False)
    counts = json.dumps({'steps': [t('Stap 1 van 3', 'Step 1 of 3'), t('Stap 2 van 3', 'Step 2 of 3'), t('Stap 3 van 3', 'Step 3 of 3'), t('Controleren', 'Review')],
                         'weeks': t('Verkoopstyling met {n} weken verlenging.', 'Sales styling extended by {n} weeks.')}, ensure_ascii=False)
    return head('hp', t('Offerte aanvragen, Hooft & Petiet', 'Request a quote, Hooft & Petiet'),
                t('Vraag een offerte aan voor logeer, rust en wisselwoningen, verkoopstyling en meer.', 'Request a quote for guest, rest and swap homes, sales styling and more.'), path) + hp_header(path) + f'''
<main id="main">
<section class="sec" data-tone="day"><div class="wrap qpage">
<div class="qside"><h1 class="t1">{t('Vertel ons over uw project.', 'Tell us about your project.')}</h1>
<p class="lead">{t('Drie korte stappen. U krijgt een offerte voor ons standaard meubelpakket, aangevuld met de extra pakketten die u kiest.', 'Three short steps. You get a quote for our standard furniture package, plus any extra packs you choose.')}</p>
<div class="contact"><a href="tel:+31852734872">085 2734 872</a><a href="mailto:info@hooftenpetiet.nl">info@hooftenpetiet.nl</a></div>
<p class="fine">{t('Dit is een prototype. Het formulier verstuurt niets.', 'This is a prototype. The form doesn’t send anything.')}</p></div>
<form class="sheet qform" action="" method="get" novalidate data-labels='{esc(labels)}'>
<div class="qtop"><span class="lab" data-count data-txt='{esc(counts)}' aria-live="polite">{t('Stap 1 van 3', 'Step 1 of 3')}</span><span class="lab">Hooft &amp; Petiet</span></div>
<fieldset class="qstep"><legend class="sr">{t('Soort woning', 'Kind of home')}</legend><h2 class="t2">{t('Wat voor woning richten we in?', 'What kind of home are we furnishing?')}</h2>
<div class="types">{th}</div><p class="qerr" role="alert" data-msg="{t('Kies een soort woning.', 'Choose a kind of home.')}"></p>
<div class="qnav"><span></span><button class="btn solid" type="button" data-next>{t('Volgende', 'Next')}</button></div></fieldset>
<fieldset class="qstep" hidden><legend class="sr">{t('Omvang en planning', 'Size and timing')}</legend><h2 class="t2">{t('Hoeveel, en wanneer?', 'How many, and when?')}</h2>
<div class="fields">
<div class="fld"><label for="q-n">{t('Aantal woningen', 'Number of homes')}</label><input id="q-n" name="woningen" type="number" min="1" max="999" value="1" required inputmode="numeric"></div>
<div class="fld"><label for="q-p">{t('Personen per woning', 'People per home')}</label><input id="q-p" name="personen" type="number" min="1" max="20" required inputmode="numeric"></div>
<div class="fld"><label for="q-o">{t('Oppervlak in m²', 'Floor area in m²')}</label><input id="q-o" name="oppervlak" type="number" min="10" max="2000" required inputmode="numeric"></div>
<div class="fld"><label for="q-d">{t('Gewenste leverdatum', 'Delivery date')}</label><input id="q-d" name="datum" type="date" required></div>
<div class="fld"><label for="q-duur">{t('Hoe lang', 'How long')}</label><select id="q-duur" name="duur">{dopts}</select></div>
<div class="fld"><label for="q-r">{t('In te richten ruimten', 'Rooms to furnish')}</label><input id="q-r" name="ruimten" placeholder="{t('Bijvoorbeeld woonkamer, 2 slaapkamers', 'For example living room, 2 bedrooms')}"></div>
</div>
<span class="legend" id="st-l">{t('Welke stijl past bij de bewoners?', 'Which style suits the residents?')}</span><div class="opts" role="group" aria-labelledby="st-l">{sh}</div>
<span class="legend" id="pk-l">{t('Extra pakketten en diensten', 'Extra packs and services')}</span><div class="opts" role="group" aria-labelledby="pk-l">{ph}</div>
<p class="qerr" role="alert" data-msg="{t('Vul het aantal woningen, personen, het oppervlak en de datum in.', 'Fill in the number of homes, people, floor area and date.')}"></p>
<div class="qnav"><button class="btn" type="button" data-back>{t('Terug', 'Back')}</button><button class="btn solid" type="button" data-next>{t('Volgende', 'Next')}</button></div></fieldset>
<fieldset class="qstep" hidden><legend class="sr">{t('Contactgegevens', 'Contact details')}</legend><h2 class="t2">{t('Hoe bereiken we u?', 'How do we reach you?')}</h2>
<div class="fields">
<div class="fld"><label for="q-naam">{t('Naam', 'Name')}</label><input id="q-naam" name="naam" autocomplete="name" required></div>
<div class="fld"><label for="q-b">{t('Organisatie', 'Organisation')}</label><input id="q-b" name="bedrijf" autocomplete="organization"></div>
<div class="fld"><label for="q-m">{t('Mailadres', 'Email address')}</label><input id="q-m" name="mail" type="email" autocomplete="email" required></div>
<div class="fld"><label for="q-t">{t('Telefoon', 'Phone')}</label><input id="q-t" name="telefoon" type="tel" autocomplete="tel"></div>
<div class="fld full"><label for="q-w">{t('Wensen of bijzonderheden', 'Wishes or details')}</label><textarea id="q-w" name="wensen" rows="3"></textarea></div>
</div>
<p class="qerr" role="alert" data-msg="{t('Vul uw naam en een geldig mailadres in.', 'Fill in your name and a valid email address.')}"></p>
<div class="qnav"><button class="btn" type="button" data-back>{t('Terug', 'Back')}</button><button class="btn solid" type="button" data-next>{t('Controleren', 'Review')}</button></div></fieldset>
<fieldset class="qstep" hidden><legend class="sr">{t('Overzicht', 'Summary')}</legend><h2 class="t2">{t('Klopt dit zo?', 'Is this right?')}</h2>
<dl class="sum"></dl>
<div class="qnav"><button class="btn" type="button" data-back>{t('Aanpassen', 'Edit')}</button><button class="btn solid" type="submit" data-send>{t('Aanvraag versturen', 'Send request')}</button></div>
<p class="qdone" role="status" hidden>{t('Op de echte site gaat uw aanvraag nu naar het planningsteam. In dit prototype is niets verzonden.', 'On the real site your request now goes to the planning team. In this prototype nothing was sent.')}</p></fieldset>
</form>
</div></section>
</main>
''' + hp_footer(path)

# ------------------------------------------------------------------ ReShare

def rs_page():
    path = {'nl': '/', 'en': '/en/'}
    r = root()
    left = [(r + '#bedrijven', t('Bedrijven', 'Companies'), ''), (r + '#werkwijze', t('Werkwijze', 'How it works'), ''), (r + '#missie', t('Missie', 'Mission'), 'w')]
    hdr = header('rs', path, left, '', ('#contact', 'Contact', 'Contact'), [('#contact', 'Contact'), ('https://www.keypro.nl/', 'KeyPro'), (other('hp'), 'Hooft &amp; Petiet')])
    mission = [t('Meubels meerdere levens geven door hergebruik standaard te maken.', 'Give furniture more than one life by making reuse the standard.'),
               t('Organisaties helpen schakelen zonder grote investeringen, door gebruik boven bezit te zetten.', 'Help organisations switch without big investments, by putting use above ownership.'),
               t('Circulair inrichten versimpelen, zodat het voor iedereen toepasbaar is.', 'Make circular furnishing simple, so anyone can use it.'),
               t('Impact meetbaar maken, zodat organisaties precies weten wat het oplevert.', 'Make the impact measurable, so organisations know exactly what it delivers.'),
               t('Klaarstaan voor 100% circulair inkopen in 2030, met een helder, schaalbaar model.', 'Be ready for 100% circular procurement in 2030, with a clear model that scales.')]
    ml = ''.join('<li>%s</li>' % m for m in mission)
    steps = [(t('Leveren', 'Deliver'), t('Uit een grote eigen voorraad, snel en flexibel.', 'From a large stock of our own, fast and flexible.')),
             (t('Gebruiken', 'Use'), t('In een logeerwoning, een expatwoning of een woning in de verkoop.', 'In a guest home, an expat home or a home for sale.')),
             (t('Terughalen', 'Collect'), t('Na gebruik halen we de meubels terug.', 'After use we bring the furniture back.')),
             (t('Opnieuw inzetten', 'Use again'), t('Opgefrist en opnieuw ingezet. Alleen vervangen als het echt nodig is.', 'Refreshed and used again. Only replaced when it really has to be.'))]
    sl = ''.join('<li><span class="n">%02d</span><div><b>%s</b><span class="d">%s</span></div></li>' % (i + 1, a, b) for i, (a, b) in enumerate(steps))
    ring_keys = ['warehouse', 'room-sofa', 'van', 'cushion', 'room-corner', 'trolley', 'vk-01', 'sofa-cushion', 'room-lounge', 'desk', 'expat-living', 'plant']
    ring = ''.join('<figure style="--i:%d">%s</figure>' % (i, pic(k, '', '240px')) for i, k in enumerate(ring_keys))
    words = [('Re', t('hergebruik', 'reuse')), ('Share', t('delen', 'sharing')), ('Living', t('tijdelijk en vast wonen', 'temporary and permanent homes'))]
    rw = ''.join('<span data-w="%d"%s><b>%s</b><small>%s</small></span>' % (i, ' class="on"' if i == 0 else '', w, m) for i, (w, m) in enumerate(words))
    nodes = [(200, 50, 200, 26, 'middle'), (350, 200, 374, 204, 'start'), (200, 350, 200, 382, 'middle'), (50, 200, 26, 204, 'end')]
    nd = ''.join('<circle class="node" cx="%d" cy="%d" r="7"/><text class="lbl" x="%d" y="%d" text-anchor="%s">0%d</text>' % (a, b, c, d, e, i + 1) for i, (a, b, c, d, e) in enumerate(nodes))
    return head('rs', t('ReShare Living Group, meubels die meerdere levens krijgen', 'ReShare Living Group, furniture that gets more than one life'),
                t('ReShare Living Group brengt KeyPro en Hooft & Petiet samen, voor circulair inrichten van tijdelijke en vaste woonoplossingen.', 'ReShare Living Group brings KeyPro and Hooft & Petiet together, for circular furnishing of temporary and permanent homes.'), path) + hdr + f'''
<main id="main">
<section class="rs3-hero" data-tone="rdawn" aria-labelledby="rs-h"><div class="wrap rs3-g">
<div><h1 class="t1" id="rs-h">{t('Meubels die meerdere levens krijgen.', 'Furniture that gets more than one life.')}</h1>
<p class="lead" style="margin-top:28px">{t('ReShare Living Group brengt KeyPro en Hooft &amp; Petiet samen. Re staat voor hergebruik, Share voor delen en Living voor de tijdelijke en vaste woonoplossingen die we mogelijk maken.', 'ReShare Living Group brings KeyPro and Hooft &amp; Petiet together. Re stands for reuse, Share for sharing and Living for the temporary and permanent homes we make possible.')}</p>
<div class="acts" style="margin-top:34px"><a class="btn solid" href="#bedrijven">{t('Kies uw partner', 'Choose your partner')}</a></div></div>
<div class="morph"><canvas role="img" aria-label="{t('Punten die samen steeds een ander meubel vormen', 'Points that keep forming a different piece of furniture')}"></canvas><div class="fallback">{pic('room-sofa', t('Een ingerichte woonkamer', 'A furnished living room'), '(max-width:900px) 90vw, 40vw')}</div><p class="morph-cap" aria-hidden="true"><span>{t('Leven', 'Life')}</span><b data-life>1</b></p></div>
</div></section>

<section class="ring3" data-tone="rdawn" aria-hidden="true"><div class="ring3-in">{ring}</div><div class="ring3-word">{rw}</div></section>

<section id="bedrijven" data-tone="rsand" aria-label="{t('De bedrijven', 'The companies')}"><div class="doors3">
<div class="door3 kp dark"><img class="dlogo" src="/media/logo-keypro-white.png" width="500" height="275" alt="KeyPro">
<h2 class="t2">{t('Circulaire meubelverhuur en inrichting.', 'Circular furniture rental and furnishing.')}</h2>
<p>{t('Meubels worden opgefrist, opnieuw ingezet en alleen vervangen als dat echt nodig is. Voor woningcorporaties, gemeenten, vastgoedbeleggers en bedrijven.', 'Furniture is refreshed, used again and only replaced when it really has to be. For housing associations, councils, property investors and companies.')}</p>
<p class="meta">{t('Sinds 2011, Groningen en Amsterdam', 'Since 2011, Groningen and Amsterdam')}</p>
<a class="btn" href="https://www.keypro.nl/" rel="noopener">{t('Naar KeyPro', 'Go to KeyPro')}</a></div>
<div class="door3 hp dark"><img class="dlogo" src="/media/logo-hp-white.png" width="700" height="187" alt="Hooft &amp; Petiet">
<h2 class="t2">{t('Instapklare woningen, met de service eromheen.', 'Homes ready to move into, with the service around them.')}</h2>
<p>{t('Meubels, stoffering, accessoires en services, zodat een woning direct bewoonbaar is zodra de sleutel wordt overgedragen.', 'Furniture, floors and curtains, accessories and services, so a home is ready to live in the moment the key is handed over.')}</p>
<p class="meta">{t('Sinds 2010, Utrecht', 'Since 2010, Utrecht')}</p>
<a class="btn" href="{other('hp')}">{t('Naar Hooft &amp; Petiet', 'Go to Hooft &amp; Petiet')}</a></div>
</div></section>

<section class="sec" data-tone="rsand" aria-labelledby="why-h"><div class="wrap why">
<h2 class="t2 fill" id="why-h">{t('Circulair inrichten is geen toekomst meer. Het is een noodzaak.', 'Circular furnishing isn’t the future any more. It’s a necessity.')}</h2>
<div class="body">
<p class="lead">{t('Steeds meer organisaties willen minder afhankelijk zijn van bezit, slimmer omgaan met middelen en hun duurzaamheidsdoelen waarmaken. In de praktijk is dat ingewikkeld. Er is voorraad nodig, kennis van hergebruik, een betrouwbare logistieke keten en partners die meedenken.', 'More and more organisations want to depend less on ownership, use resources more wisely and meet their sustainability goals. In practice that’s complicated. It takes stock, know how on reuse, a reliable supply chain and partners who think along.')}</p>
<p class="lead">{t('Daarom is ReShare Living Group ontstaan. Om die losse schakels samen te brengen in één helder model, met één werkwijze.', 'That’s why ReShare Living Group exists. To bring those loose links together in one clear model, with one way of working.')}</p>
<p class="src">{t('Overheden, woningcorporaties en instellingen worden gestimuleerd om uiterlijk in 2030 minimaal 50% circulair in te kopen.', 'Government, housing associations and institutions are encouraged to make at least 50% of their purchasing circular by 2030.')} <a class="u" href="https://www.keypro.nl/in-de-media/keypro-en-hooft-petiet-bundelen-krachten-binnen-reshare-living-group/" rel="noopener">KeyPro, {t('16 oktober 2025', '16 October 2025')}</a></p>
</div>
</div></section>

<section class="sec" id="werkwijze" data-tone="rdawn" aria-labelledby="ww-h"><div class="wrap cyc">
<div class="cyc-fig" aria-hidden="true"><svg viewBox="0 0 400 400"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2FA597"/><stop offset="1" stop-color="#C9A47A"/></linearGradient></defs>
<circle class="track" cx="200" cy="200" r="150"/><circle class="arc" cx="200" cy="200" r="150" transform="rotate(-90 200 200)"/>{nd}<circle class="dot" cx="200" cy="50" r="6"/>
<text class="lbl" x="200" y="186" text-anchor="middle" data-cn>01</text><text x="200" y="222" text-anchor="middle" data-ct>{steps[0][0]}</text></svg></div>
<div><h2 class="t2" id="ww-h">{t('Zo blijft een meubel in gebruik.', 'How a piece stays in use.')}</h2>
<p class="lead" style="margin-top:20px">{t('Eén werkwijze voor beide bedrijven, zonder gedoe voor opdrachtgevers.', 'One way of working for both companies, without hassle for clients.')}</p>
<ol class="cyc-list">{sl}</ol></div>
</div></section>

<section class="sec" id="missie" data-tone="rsand" aria-labelledby="mi-h"><div class="wrap">
<h2 class="t2" id="mi-h">{t('Onze missie.', 'Our mission.')}</h2>
<ol class="mission">{ml}</ol>
</div></section>

<div class="forest-h" aria-hidden="true"></div>
<div class="forest-wrap">
<section class="sec voice forest dark" data-tone="forest" aria-label="{t('Willem Straat over ReShare', 'Willem Straat on ReShare')}"><div class="wrap">
<blockquote class="fill">{t('“We bouwen al jaren aan een alternatief voor kopen en weggooien, om die enorme afvalberg kleiner te maken.”', '“For years we’ve been building an alternative to buying and throwing away, to make that huge mountain of waste smaller.”')}</blockquote>
<p class="by">{t('Willem Straat, oprichter en een van de eigenaren van KeyPro, bij de start van ReShare Living Group', 'Willem Straat, KeyPro’s founder and one of its owners, at the launch of ReShare Living Group. Translated from Dutch.')}</p>
</div></section>

<section class="sec forest dark" id="contact" data-tone="forest" aria-labelledby="ct-h" style="padding-top:0"><div class="wrap">
<h2 class="t2" id="ct-h">{t('Samen circulair inrichten?', 'Furnish circular, together?')}</h2>
<a class="mail" href="mailto:contact@reshareliving.com">contact@reshareliving.com</a>
<div class="contact-more"><a class="btn" href="https://www.keypro.nl/" rel="noopener">KeyPro</a><a class="btn" href="{other('hp')}">Hooft &amp; Petiet</a></div>
</div></section>
</div>
</main>
<footer class="ftr forest" data-tone="forest"><div class="wrap">
<div class="ftr-g">
<div><img class="flogo" src="/media/logo-reshare-white.png" width="900" height="264" alt="ReShare Living Group"><p class="about">{t('KeyPro en Hooft &amp; Petiet, samen sinds 1 september 2025.', 'KeyPro and Hooft &amp; Petiet, together since 1 September 2025.')}</p></div>
<div><h2>{t('Bedrijven', 'Companies')}</h2><ul><li><a href="https://www.keypro.nl/" rel="noopener">KeyPro</a></li><li><a href="{other('hp')}">Hooft &amp; Petiet</a></li></ul></div>
<div><h2>{t('Op deze site', 'On this site')}</h2><ul><li><a href="#werkwijze">{t('Werkwijze', 'How it works')}</a></li><li><a href="#missie">{t('Missie', 'Mission')}</a></li></ul></div>
<div><h2>Contact</h2><ul><li><a href="mailto:contact@reshareliving.com">contact@reshareliving.com</a></li></ul></div>
</div>
<div class="base"><span>© 2026 ReShare Living Group</span><span>{t('Prototype door Astra agency, oktober 2026.', 'Prototype by Astra agency, October 2026.')}</span>{langsw(path)}</div>
</div></footer>
<script src="/js/site.js" defer></script>
<script src="/js/fx.js" defer></script>
</body></html>'''


# ------------------------------------------------------------------ write

def write(site, rel, html):
    p = os.path.join(OUT[site], rel.lstrip('/'), 'index.html')
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(html)

def copy_static(site):
    o = OUT[site]
    keep = os.path.join(o, '.netlify')
    saved = None
    if os.path.exists(keep): saved = open(os.path.join(keep, 'state.json')).read()
    if os.path.exists(o): shutil.rmtree(o)
    os.makedirs(o)
    if saved is not None:
        os.makedirs(keep); open(os.path.join(keep, 'state.json'), 'w').write(saved)
    shutil.copytree(os.path.join(B, 'fonts'), os.path.join(o, 'fonts'))
    os.makedirs(os.path.join(o, 'css')); os.makedirs(os.path.join(o, 'js')); os.makedirs(os.path.join(o, 'media'))
    for f in ('site.css', 'fx.css'): shutil.copy(os.path.join(B, 'css', f), os.path.join(o, 'css'))
    for f in ('site.js', 'fx.js'): shutil.copy(os.path.join(B, 'js', f), os.path.join(o, 'js'))
    open(os.path.join(o, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    open(os.path.join(o, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')

def used_media(site):
    out = set()
    for dp, dn, fn in os.walk(OUT[site]):
        for f in fn:
            if f.endswith('.html') or f.endswith('.css'):
                out |= set(re.findall(r'/media/([\w./-]+?\.(?:jpg|png))', open(os.path.join(dp, f)).read()))
    for m in out:
        dst = os.path.join(OUT[site], 'media', m)
        os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy(os.path.join(B, 'media', m), dst)
    return out

if __name__ == '__main__':
    for site, pages in (('hp', [('/', hp_index, '/en/'), ('/verkoopstyling/', hp_vs, '/en/sales-styling/'), ('/offerte/', hp_quote, '/en/quote/')]),
                        ('rs', [('/', rs_page, '/en/')])):
        copy_static(site)
        for nl_path, fn, en_path in pages:
            for L, p in (('nl', nl_path), ('en', en_path)):
                LANG = L
                write(site, p, fn())
        print(site, 'pages', len(pages) * 2, 'media', len(used_media(site)))
