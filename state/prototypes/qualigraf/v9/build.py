#!/usr/bin/env python3
"""Qualigraf v7. The same words as v6 (content.py), in a 2030 SaaS grammar.

    python3 state/prototypes/qualigraf/v7/build.py

What changed from v6, after Raka's "no pictures no nothing ... a proper SaaS website from 2030". Live art (paper ribbons that
braid into one strand, assets/ribbons.js) on a deep navy hero, their real product floating over it, the frontrunners straight
under it, the decision track with their real screens swapping, a full bleed chamber photo, a bento of film and screens, and the
art again behind the booking form. Photos are CC0 from Wikimedia Commons, films are Mixkit Free, screens are Qualigraf's own.
"""
import html, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import content as C

E = html.escape
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site')
FINE = C.FINE

# ------------------------------------------------------------------ what v7 adds per country
SCR = {'meeting': ('meeting-screen.webp', 1575, 1107), 'planner': ('planner-screen.webp', 1282, 900), 'publish': ('publish-screen.webp', 1282, 900),
       'dossier': ('dossier-screen.webp', 1282, 900), 'worklist': ('worklist-screen.webp', 0, 0), 'aimin': ('aimin-screen.webp', 0, 0)}

X = {
    'uk': dict(
        photo=('uk-chamber', 'A Victorian council chamber with curved wooden benches under a glass roof'),
        statement='A decision outlives the meeting. Qualigraf keeps every paper, vote and reason in one file, findable years later.',
        screens=['planner', 'dossier', 'worklist', 'worklist', 'meeting', 'meeting', 'publish', 'dossier'],
        hero_card=('Agenda pack open to the public by', 'agenda', 'Five clear days, section 100B'),
        bento=dict(h2='One platform for the whole decision', intro='Meetings, workflow, council information, the long term planner and publishing, all reading the same file.',
            tiles=[('film', 'member', 'Members read, note and vote in one app', 'On iOS, Windows and Android, in the chamber or remote.'),
                   ('screen', 'publish', 'Publish and stream', 'Webcasts with speaker names, live voting results and searchable transcripts.'),
                   ('film', 'sign', 'Approval routes for every document', 'Strict or light, with an audit trail behind every step.'),
                   ('screen', 'planner', 'The whole year in view', 'The Long term planner tracks milestones and deadlines by topic.'),
                   ('film', 'paperless', 'One file, not five systems', 'Agendas, reports and minutes come from the same file, so nothing is copied twice.')]),
        logos_h2='Over 400 clients across Europe already decide this way', screens_note='Sample screens from Qualigraf’s demo council'),
    'ca': dict(
        photo=('ca-cityhall', 'A modern city hall behind trees'),
        statement='A decision outlives the meeting. Qualigraf keeps every report, vote and reason in one file, findable years later.',
        screens=['planner', 'dossier', 'worklist', 'meeting', 'meeting', 'meeting', 'publish', 'dossier'],
        hero_card=('Your meeting', 'meeting', 'Agenda, documents, votes and stream in one place'),
        bento=dict(h2='One platform for the whole decision', intro='Meetings, workflow, council information, the long term planner and publishing, all reading the same file.',
            tiles=[('film', 'member', 'Council members read, note and vote in one app', 'In the chamber or remote.'),
                   ('screen', 'publish', 'Publish and stream', 'Automatic speaker identification, live voting results and searchable transcripts.'),
                   ('film', 'sign', 'Approvals for every report', 'Strict or light, with an audit trail behind every step.'),
                   ('screen', 'planner', 'The whole year in view', 'Every topic on one timeline, from drafting to council.'),
                   ('screen', 'dossier', 'Policy dossiers', 'Reports and decisions gather around their topic, so a long running issue is easy to follow.')]),
        logos_h2='Over 400 clients across Europe already decide this way', screens_note='Sample screens from Qualigraf’s demo municipality, Clearwater Ridge'),
    'fr': dict(
        photo=('fr-salle', 'Une salle du conseil municipal lumineuse, tables en ovale'),
        statement='Une délibération vit bien après la séance. Qualigraf garde chaque rapport, chaque vote et chaque acte dans un seul dossier.',
        screens=['dossier', 'worklist', 'meeting', 'meeting', 'aimin', 'publish'],
        hero_card=('Convocation envoyée au plus tard le', 'convocation', '{days} jours francs, article {art} du CGCT'),
        bento=dict(h2='Un bouquet de services, un seul dossier', intro='Délibération, KBox, Vote, PV et Publicité travaillent sur le même dossier, de la préparation à la publication.',
            tiles=[('film', 'paperless', 'Délibération, 100 % cloud', 'Instruction des rapports, circuit des visas, gestion des séances et télétransmission.'),
                   ('film', 'member', 'KBox, le cartable numérique de l’élu', 'Convocation à valeur probante et annotation des documents.'),
                   ('screen', 'meeting', 'Vote', 'États de présence, pouvoirs, déports et votes, avec l’application sur mobile.'),
                   ('screen', 'publish', 'Publicité', 'Publication certifiée et disponibilité immédiate de vos actes en ligne.'),
                   ('film', 'sign', 'PV', 'Le procès-verbal généré automatiquement, intégral ou synthétique.')]),
        logos_h2='Près de 200 collectivités déjà connectées', screens_note='Écrans d’exemple, données fictives'),
    'nl': dict(
        photo=('eu-chamber', 'Een moderne raadzaal met lange tafels en microfoons'),
        statement='Een besluit leeft langer dan de vergadering. Qualigraf houdt elk stuk, elke stemming en elke afspraak vindbaar in één dossier.',
        screens=['planner', 'dossier', 'worklist', 'meeting', 'meeting', 'aimin', 'publish', 'dossier'],
        hero_card=('Jullie vergadering', 'meeting', 'Agenda, stukken, stemmingen en stream op één plek'),
        bento=dict(h2='Eén platform voor het hele besluit', intro='Vergaderen, Workflow, Raadsinformatie, de Langetermijnagenda en Publiceren werken allemaal in hetzelfde dossier.',
            tiles=[('film', 'member', 'Vergaderen', 'Stukken raadplegen, aantekeningen maken en delen en documenten paraferen in één applicatie.'),
                   ('screen', 'publish', 'Publiceren en streamen', 'Sprekersinformatie, live stemmingsuitslagen en doorzoekbare transcripten.'),
                   ('film', 'sign', 'Workflow', 'Werkdossiers gekoppeld aan beleids en themadossiers.'),
                   ('screen', 'planner', 'Langetermijnagenda', 'Speciaal ontworpen voor Nederlandse gemeentes.'),
                   ('screen', 'aimin', 'AI Notulen', 'In korte tijd een vergaderverslag, ook als losse oplossing.')]),
        logos_h2='Dit zijn de koplopers waarvan je kunt leren', screens_note='Voorbeeldschermen met fictieve gegevens'),
}

PATCH_POS = [(12, 18, -9, '#37BAC5'), (34, 8, 6, '#37BAC5'), (66, 12, -5, '#FE764A'), (88, 22, 8, '#FE764A'),
             (8, 70, 7, '#F4B63F'), (30, 88, -7, '#F4B63F'), (70, 86, 5, '#7A5D7B'), (92, 72, -8, '#8FA3C8')]
PATCH = {
    'uk': dict(h2='From a patchwork of tools to one file', p='A decision usually moves through separate tools, one for each step. In Qualigraf every paper of it lands in the same file, and stays there.', file='One file',
               labels=['Forward plan', 'Report', 'Sign offs', 'Agenda pack', 'Meeting', 'Decision record', 'Webcast', 'Archive']),
    'ca': dict(h2='From a patchwork of tools to one file', p='Council work usually moves through separate tools, one for each step. In Qualigraf every paper of it lands in the same file, and stays there.', file='One file',
               labels=['Long term plan', 'Staff report', 'Approvals', 'Agenda', 'Meeting', 'Minutes', 'Webcast', 'Archive']),
    'fr': dict(h2='Toutes les étapes de la délibération, un seul dossier', p='Rapport, visas, convocation, séance, votes, procès-verbal et publicité arrivent dans le même dossier, et y restent.', file='Un seul dossier',
               labels=['Rapport', 'Circuit des visas', 'Convocation', 'Séance', 'Votes', 'Procès-verbal', 'Publicité', 'Archives']),
    'nl': dict(h2='Van een lappendeken aan tools naar één dossier', p='Elk stuk van een besluit komt in hetzelfde dossier terecht, van het eerste idee tot het e-depot, en blijft daar.', file='Eén dossier',
               labels=['Langetermijnagenda', 'Raadsvoorstel', 'Paraaf', 'Agenda', 'Vergadering', 'Stemmingen', 'Notulen', 'E-depot']),
}

DOOR = [
    ('uk', 'uk/', 'United Kingdom', 'en-GB', 'Committee management for UK councils', 'uk-chamber-s', 'A Victorian council chamber with wooden benches'),
    ('fr', 'fr/', 'France', 'fr', 'La dématérialisation des délibérations', 'fr-salle-s', 'Une salle du conseil municipal lumineuse'),
    ('nl', 'nl/', 'Nederland', 'nl', 'Het platform voor integrale besluitvorming', 'eu-chamber-s', 'Een moderne raadzaal'),
    ('ca', 'ca/', 'Canada', 'en-CA', 'Council management for Canadian municipalities', 'ca-cityhall-s', 'A modern city hall behind trees'),
]


def head(c, rel, js):
    return f'''<!doctype html>
<html lang="{c['lang']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(c['title'])}</title>
<meta name="description" content="{E(c['desc'])}">
<meta name="theme-color" content="#070C18">
<link rel="icon" href="{rel}assets/img/brand/Logo-Qualigraf.svg" type="image/svg+xml">
<link rel="preload" href="{rel}assets/fonts/mona-sans-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{rel}assets/fonts/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{rel}assets/site.css">
{js}</head>'''


def film(name, rel, label=''):
    return (f'<video class="film" autoplay muted loop playsinline preload="metadata" aria-hidden="true">'
            f'<source src="{rel}assets/film/{name}.webm" type="video/webm"><source src="{rel}assets/film/{name}.mp4" type="video/mp4"></video>')


def screen(key, rel, alt, cls='shot', lazy=True):
    f, w, h = SCR[key]
    wh = f' width="{w}" height="{h}"' if w else ''
    return f'<img class="{cls}" src="{rel}assets/img/{f}"{wh}{" loading=\"lazy\"" if lazy else ""} alt="{E(alt)}">'


def country_page(c):
    x = X[c['slug']]
    rel = '../'
    L = c['lang'][:2]
    first = c['committees'][0]['label']
    stations = [dict(s, img=SCR[k][0]) for s, k in zip(c['stations'], x['screens'])]
    page = {k: c.get(k) for k in ('lang', 'rules', 'committees', 'sizes', 'summary', 'form')}
    page.update(country=c['slug'], defaultDate='2027-03-11', stations=stations)
    js = f'<script>window.PAGE = {json.dumps(page, ensure_ascii=False)};</script>\n'
    nav = ''.join(f'<a href="{h}">{E(t)}</a>' for h, t in c['nav'])
    skip = {'en': 'Skip to the content', 'fr': 'Aller au contenu', 'nl': 'Ga naar de inhoud'}[L]
    navlab = {'en': 'Main', 'fr': 'Principal', 'nl': 'Hoofdmenu'}[L]
    sample_alt = {'en': 'Sample meeting screen in Qualigraf', 'fr': 'Écran de séance d’exemple dans Qualigraf', 'nl': 'Voorbeeldscherm van een vergadering in Qualigraf'}[L]
    s = [head(c, rel, js), '<body>', '<div class="aurora" aria-hidden="true"><i></i><i></i><i></i><i></i></div>', f'<a class="skip" href="#main">{skip}</a>',
         f'''<header class="top dark">
  <a class="brand" href="#top" aria-label="{E(c['name'])}"><img class="logo-dark" src="{rel}assets/img/brand/{c['logo']}.svg" alt="" width="140" height="44"><img class="logo-light" src="{rel}assets/img/brand/{c['logo']}-contrast.svg" alt="" width="140" height="44"></a>
  <nav class="nav" aria-label="{navlab}">{nav}</nav>
  <a class="where" href="{rel}">{E(c['where'])} <span>{E(c['change'])}</span></a>
  <a class="btn btn-top act" href="#book">{E(c['act'])}</a>
</header>''', '<main id="main">']

    # 1 hero. Their own Q, cut from their logo, is a window onto a council chamber. It opens as the visitor scrolls
    ph, alt = x['photo']
    k_lab, k_tok, k_law = x['hero_card']
    s.append(f'''<section class="hero qhero" id="top" aria-labelledby="h-hero">
  <div class="qpin">
    <div class="qwin" aria-hidden="true"><picture><source media="(max-width: 760px)" srcset="{rel}assets/photo/{ph}-s.webp"><img src="{rel}assets/photo/{ph}.webp" alt=""></picture></div>
    <div class="hero-copy">
      <h1 id="h-hero">{E(c['h1'])}</h1>
      <p class="lede">{E(c['lede'])}</p>
      <form class="sentence" onsubmit="return false">
        {C.picks(c)}
      </form>
      <div class="hero-acts"><a class="btn act" href="#book">{E(c['act'])}</a><a class="quiet" href="{c['quiet'][0]}">{E(c['quiet'][1])}</a></div>
    </div>
    <p class="qbeat" aria-hidden="true">{E(c['beat'])}</p>
  </div>
</section>
<section class="product" aria-label="{E(sample_alt)}">
  <canvas class="art" aria-hidden="true"></canvas>
  <div class="stage">
    <figure class="window">{screen('meeting', rel, sample_alt, 'win-img', False)}</figure>
    <div class="live" aria-live="polite"><span class="live-k">{E(k_lab)}</span><b data-bind="{k_tok}"></b><span class="live-l" data-fill="{E(k_law)}"></span></div>
    <div class="file-chip"><b data-bind="committee">{E(first)}</b><span data-bind="meetingShort"></span></div>
  </div>
  <p class="product-act"><a class="btn act" href="#book">{E(c['act'])}</a></p>
</section>''')

    # 2 the patchwork, the papers of one decision fly into one file
    pt = PATCH[c['slug']]
    cards = ''.join(f'<span class="pc" style="--x:{x_}%;--y:{y_}%;--r:{r_}deg;--c:{col}"><i></i>{E(lab)}</span>' for lab, (x_, y_, r_, col) in zip(pt['labels'], PATCH_POS))
    s.append(f'''<section class="patch" id="patch" aria-labelledby="h-patch">
  <div class="patch-pin">
    <div class="patch-copy"><h2 id="h-patch">{E(pt['h2'])}</h2><p class="intro">{E(pt['p'])}</p></div>
    <div class="patch-field" aria-hidden="true">
      <svg class="patch-lines" viewBox="0 0 100 100" preserveAspectRatio="none">{''.join(f'<line x1="{x_}" y1="{y_}" x2="50" y2="52"/>' for (x_, y_, r_, col) in PATCH_POS)}</svg>
      {cards}
      <div class="pfile"><b data-bind="committee">{E(first)}</b><span data-bind="meetingShort"></span><em>{E(pt['file'])}</em></div>
    </div>
  </div>
</section>''')

    # 3 the track, their own screens swap as the meeting moves
    a, tok, b = c['track_h2']
    h2 = E(a) + (C.bind(tok, first) if tok else '') + E(b)
    note, ask = c['rule_note']
    shots = ''.join(f'<img src="{rel}assets/img/{st["img"]}" alt="" loading="lazy" data-i="{i}">' for i, st in enumerate(stations))
    s.append(f'''<section class="track" id="track" aria-labelledby="h-track" style="--n:{len(stations)}">
  <div class="track-pin">
    <div class="track-text">
      <h2 id="h-track">{h2}</h2>
      <p class="sub">{E(c['track_sub'])}</p>
      <div class="rail" aria-hidden="true"><div class="rail-segs"></div></div>
      <ol class="stations"></ol>
      <div class="track-act"><a class="btn act" href="#book">{E(c['track_act'])}</a></div>
    </div>
    <div class="track-screen">
      <div class="screens" aria-hidden="true">{shots}</div>
      <div class="screen-chip" aria-hidden="true"><b data-bind="committee">{E(first)}</b><span data-bind="meetingShort"></span></div>
      <p class="screens-note">{E(x['screens_note'])}</p>
      <p class="rule-note">{E(note)}<a class="quiet act" href="#book">{E(ask)}</a>.</p>
    </div>
  </div>
  <p class="rule-note rule-phone">{E(note)}<a class="quiet act" href="#book">{E(ask)}</a>.</p>
</section>''')

    # 4 time. The library film, and for the UK the years the record stays open, worked out for their meeting
    years = ''
    if c['rules'] == 'uk':
        years = '''<div class="years" aria-label="How long the record of this meeting stays open to the public">
      <div class="yticks" data-years></div>
      <div class="ybar y6"><span class="yfill"></span><p><b>Minutes, agenda and reports</b>Open to the public until <span data-bind="until6"></span>. Section 100C</p></div>
      <div class="ybar y4"><span class="yfill"></span><p><b>Background papers</b>Open until <span data-bind="until4"></span>. Section 100D</p></div>
    </div>'''
    s.append(f'''<section class="room film-room" aria-label="{E(x['statement'][:60])}">
  <video class="film room-film" autoplay muted loop playsinline preload="none" aria-hidden="true"><source src="{rel}assets/film/library.webm" type="video/webm"><source src="{rel}assets/film/library.mp4" type="video/mp4"></video>
  <div class="room-in">
    <p class="room-line">{E(x['statement'])}</p>
    {years}
    <p class="room-act"><a class="btn act" href="#book">{E(c['act'])}</a></p>
  </div>
</section>''')

    # 5 the world. Built in Dordrecht, run by local teams, and the frontrunners
    p = c['proof']
    logos = ''.join(f'<li><img src="{rel}assets/img/clients/{f}" alt="{E(n)}" loading="lazy"></li>' for f, n, w in p['logos'])
    facts = ''.join(f'<p><b>{E(h)}</b>{t}</p>' for h, t in p.get('facts', []))
    voices = ''.join(f'<blockquote><p>« {E(q)} »</p><cite>{E(w)}</cite></blockquote>' for q, w in p.get('voices', []))
    s.append(f'''<section class="world" id="proof" aria-labelledby="h-proof">
  <div class="world-in">
    <div class="world-copy">
      <h2 id="h-proof">{E(x['logos_h2'])}</h2>
      <p class="intro">{E(p['intro'])}</p>
      {f'<div class="facts">{facts}</div>' if facts else ''}
      <p class="world-act"><a class="quiet act" href="#book">{E(c['act'])}</a></p>
    </div>
    <div class="globe-wrap"><canvas data-globe aria-hidden="true"></canvas></div>
  </div>
  <ul class="logos">{logos}</ul>
  {f'<div class="voices">{voices}</div>' if voices else ''}
  {f'<p class="src">{p["src"]}</p>' if p.get('src') else ''}
</section>''')

    # 6 the platform, a film strip that slides sideways as the visitor scrolls
    bt = x['bento']
    panels = ''
    for i, (kind, key, h, t) in enumerate(bt['tiles']):
        media = film(key, rel) if kind == 'film' else screen(key, rel, h)
        panels += f'<figure class="panel p{i + 1} {kind}"><div class="media">{media}</div><figcaption><b>{E(h)}</b>{E(t)}</figcaption></figure>'
    s.append(f'''<section class="strip" id="roles" aria-labelledby="h-platform" style="--k:{len(bt['tiles'])}">
  <div class="strip-pin">
    <div class="strip-head"><h2 id="h-platform">{E(bt['h2'])}</h2><p class="intro">{E(bt['intro'])}</p></div>
    <div class="strip-track">{panels}</div>
    <p class="strip-act"><a class="btn act" href="#book">{E(c['act'])}</a></p>
  </div>
</section>''')

    # 7 trust and the people, one chapter
    t = c['trust']
    marks = ''.join(f'<span class="mark"><img src="{rel}assets/img/{f}" alt="{E(al)}" loading="lazy"></span>' for f, al in t['marks'])
    items = ''.join(f'<li><b>{E(h)}</b><span>{E(v)}</span></li>' for h, v in t['items'])
    ppl = ''
    if c.get('team'):
        tm = c['team']
        ppl = ''.join(f'''<figure class="person"><span class="ring"><img src="{rel}assets/img/{img}" width="220" height="220" loading="lazy" alt="{E(al)}"></span>
      <figcaption><b>{E(n)}</b><span class="role">{E(role)}</span><p>{E(tx)} <a href="{href}">{E(link)}</a></p></figcaption></figure>''' for img, al, n, role, tx, href, link in tm['people'])
        ppl = f'''<div class="team" id="team"><h2 id="h-team">{E(tm['h2'])}</h2><p class="intro">{E(tm['intro'])}</p><div class="people">{ppl}</div></div>'''
    s.append(f'''<section class="trust" id="trust" aria-labelledby="h-trust">
  <div class="trust-in">
    <div><h2 id="h-trust">{E(t['h2'])}</h2><p class="intro">{E(t['intro'])}</p>{f'<div class="marks">{marks}</div>' if marks else ''}</div>
    <ul>{items}</ul>
  </div>
  {ppl}
</section>''')

    # 8 the invitation, the art again, the strand now braided
    v = c['invite']
    a1, t1, a2, t2, a3 = v['p']
    fields = ''.join(f'<div class="field"><label for="f-{k}">{E(lab)}</label><input id="f-{k}" name="{k}" type="{typ}" autocomplete="{ac}" required></div>' for k, lab, typ, ac in v['fields'])
    s.append(f'''<section class="invite" id="book" aria-labelledby="h-invite">
  <canvas class="art art-2" aria-hidden="true"></canvas>
  <div class="invite-copy">
    <h2 id="h-invite">{E(v['h2'])}</h2>
    <p>{E(a1)}{C.bind(t1, first)}{E(a2)}{C.bind(t2)}{E(a3)}</p>
    <p class="call">{E(v['call'][0])}<a class="act" href="{v['call'][1]}">{E(v['call'][2])}</a></p>
  </div>
  <form class="book" novalidate aria-labelledby="h-invite">
    <div class="field meet"><span class="lab">{E(v['meetLabel'])}</span><output id="f-meeting" data-bind="summary"></output><a class="quiet" href="#top">{E(v['change'])}</a></div>
    {fields}
    <input type="hidden" name="meeting" id="f-meeting-hidden" value="">
    <button class="btn act" type="submit">{E(v['button'])}</button>
    <p class="form-msg" role="status" aria-live="polite"></p>
  </form>
</section>''')
    s.append('</main>')
    links = ''.join(f'<a href="{h}">{E(tt)}</a>, ' for h, tt in c['footLinks'])
    foot = ''.join(f'<p>{fx}</p>' for fx in c['foot'])
    credit = {'en': 'Photo CC0, Wikimedia Commons. Film, Mixkit. Product screens show sample data.', 'fr': 'Photo CC0, Wikimedia Commons. Films, Mixkit. Les écrans montrent des données fictives.', 'nl': 'Foto CC0, Wikimedia Commons. Film, Mixkit. Schermen tonen fictieve gegevens.'}[L]
    s.append(f'''<footer class="foot">
  <div class="foot-in">
    <img src="{rel}assets/img/brand/{c['logo']}-contrast.svg" alt="{E(c['name'])}" width="140" height="44">
    {foot}
    <p>{links}<a href="{rel}">{E({'en': 'Qualigraf in other countries', 'fr': 'Qualigraf dans les autres pays', 'nl': 'Qualigraf in andere landen'}[L])}</a></p>
    <p class="fine">{E(credit)} {E(FINE[c['fine']])}</p>
  </div>
</footer>
<nav class="phonebar" aria-label="{E(c['act'])}"><a class="btn act" href="#book">{E(c['act'])}</a></nav>
<script type="module" src="{rel}assets/page.js"></script>
</body>
</html>
''')
    return '\n'.join(s)


def door():
    c = dict(lang='en', title='Qualigraf, council decisions from idea to archive',
             desc='One platform for council decisions, with local teams in the United Kingdom, France, the Netherlands and Canada.')
    tiles = ''.join(f'''<li data-country="{k}"><a class="act" href="{h}" hreflang="{lg}"><img src="assets/photo/{ph}.webp" alt="{E(al)}"><b>{E(n)}</b><span lang="{lg}">{E(line)}</span></a></li>'''
                    for k, h, n, lg, line, ph, al in DOOR)
    offices = [
        ('Stoke-on-Trent', '53 Chapel Street, Mow Cop, Stoke-on-Trent ST7 4NS', 'tel:+447741080343', '07741 080343', 'uk/', 'Qualigraf UK', 'en-GB'),
        ('Paris', '32 rue Brancion, 75015 Paris', 'tel:+33155763838', '01 55 76 38 38', 'fr/', 'Qualigraf France', 'fr'),
        ('Dordrecht', 'Draai 9, 3311 JJ Dordrecht', 'tel:+31883747137', '088 374 71 37', 'nl/', 'Qualigraf Nederland', 'nl'),
        ('Oshawa', '2 Simcoe St S, Suite 300, Oshawa ON L1H 8C1', 'tel:+14167386366', '+1 416 738 6366', 'ca/', 'Qualigraf Canada', 'en-CA'),
    ]
    offs = ''.join(f'<div><h3>{E(city)}</h3><p>{E(addr)}<br><a href="{tel}">{E(tn)}</a></p><a class="quiet act" href="{h}" hreflang="{lg}">{E(go)}</a></div>' for city, addr, tel, tn, h, go, lg in offices)
    return f'''{head(c, '', '')}
<body class="door">
<div class="aurora" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<a class="skip" href="#main">Skip to the content</a>
<header class="top dark">
  <a class="brand" href="./" aria-label="Qualigraf"><img class="logo-light" src="assets/img/brand/Logo-Qualigraf_General-contrast.svg" alt="" width="140" height="44"></a>
</header>
<main id="main">
<section class="hero door-hero" aria-labelledby="h-hero">
  <div class="dq" aria-hidden="true">{''.join(f'<img src="assets/photo/{ph}.webp" alt="" data-country="{k}">' for k, h, n, lg, line, ph, al in DOOR)}</div>
  <div class="hero-copy">
    <h1 id="h-hero">Every decision, from idea to archive</h1>
    <p class="lede">One platform for council decisions, developed in the Netherlands and run by local teams in four countries, because every country runs its councils by its own rules.</p>
    <p class="ask" id="ask">Where is your council?</p>
  </div>
  <ul class="countries" aria-labelledby="ask">{tiles}</ul>
</section>
<section class="offices-band" aria-labelledby="h-group">
  <h2 id="h-group">One group, four local teams</h2>
  <p class="intro">Each country has its own team for sales, implementation and support, close to the councils it serves and the laws they follow.</p>
  <div class="offices">{offs}</div>
</section>
</main>
<footer class="foot">
  <div class="foot-in">
    <p>Qualigraf Groupe, Dordrecht, with teams in the United Kingdom, France, the Netherlands and Canada.</p>
    <p class="fine">Photos CC0, Wikimedia Commons. {E(FINE['en'])}</p>
  </div>
</footer>
<script type="module" src="assets/door.js"></script>
</body>
</html>
'''


if __name__ == '__main__':
    with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(door())
    for c in C.COUNTRIES:
        os.makedirs(os.path.join(ROOT, c['slug']), exist_ok=True)
        with open(os.path.join(ROOT, c['slug'], 'index.html'), 'w', encoding='utf-8') as f:
            f.write(C.nobreak(country_page(c)))
    print('wrote', 1 + len(C.COUNTRIES), 'pages')
