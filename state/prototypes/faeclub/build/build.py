#!/usr/bin/env python3
"""Fae Club prototype, v2, writes ../site/. One ticket order carried down the page, pay in full or in 3 at checkout, the
QR ticket issued the moment it's paid. Every price, date and line is in data/site.json with its source, the flow is
../research/flow.md, the art is ../research/art-direction-v2.md. Their own photos only, from fa3club.com and
highfaeretreats.com. The moon and the fairy are their own mark, traced from their logo by art/trace_moon.py."""
import os, json, shutil, html as H, datetime, math

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, '..', 'site')
D = json.load(open(os.path.join(B, 'data', 'site.json')))
MAN = json.load(open(os.path.join(B, 'media', 'manifest.json')))
FT = D['events']['ftb']; NC = D['events']['nc']; RT = D['retreat']
MOON_D = open(os.path.join(B, 'art', 'moon-fairy.path')).read()
SEAL_D = open(os.path.join(B, 'art', 'seal.path')).read()
used = set()

def esc(s): return H.escape(s, quote=True)
def gbp(p): return '£{:,.2f}'.format(p / 100)
def gbp0(p): return '£{:,.0f}'.format(p / 100) if p % 100 == 0 else gbp(p)

def split3(total):
    """Pay in 3, to the penny. Two equal payments, the first carries the odd pence."""
    base = total // 3
    return [total - 2 * base, base, base]

def add_months(d, n):
    m = d.month - 1 + n; y = d.year + m // 12; m = m % 12 + 1
    import calendar
    return datetime.date(y, m, min(d.day, calendar.monthrange(y, m)[1]))

TODAY = datetime.date.fromisoformat(D['today'])

def pic(key, alt, sizes='100vw', cls='', eager=False):
    m = MAN[key]; ss = sorted(m['sizes'], key=lambda s: s[0])
    for w, _ in ss: used.update(['%s-%d.jpg' % (key, w), '%s-%d.webp' % (key, w)])
    js = ', '.join('/media/%s-%d.jpg %dw' % (key, w, w) for w, _ in ss)
    ws = ', '.join('/media/%s-%d.webp %dw' % (key, w, w) for w, _ in ss)
    w, h = ss[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    c = f' class="{cls}"' if cls else ''
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img{c} src="/media/{key}-{ss[0][0]}.jpg" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>'

def pic_later(key, alt, sizes='100vw'):
    """Like pic, but nothing loads until the script wakes it, for the book's pages and the portraits."""
    m = MAN[key]; ss = sorted(m['sizes'], key=lambda s: s[0])
    for w, _ in ss: used.update(['%s-%d.jpg' % (key, w), '%s-%d.webp' % (key, w)])
    js = ', '.join('/media/%s-%d.jpg %dw' % (key, w, w) for w, _ in ss)
    ws = ', '.join('/media/%s-%d.webp %dw' % (key, w, w) for w, _ in ss)
    w, h = ss[-1]
    return f'<picture class="later"><source type="image/webp" data-srcset="{ws}" sizes="{sizes}"><img data-src="/media/{key}-{ss[0][0]}.jpg" data-srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" decoding="async"></picture>'

FAV = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23022B12'/%3E%3Cpath d='M40 12a22 22 0 1 0 0 40a17 17 0 1 1 0-40z' fill='%23C8B376'/%3E%3C/svg%3E"
MARK = '<picture><source type="image/webp" srcset="/media/logo-fae-mark.webp"><img class="mark" src="/media/logo-fae-mark.png" width="240" height="215" alt="Fae Club"></picture>'
used.update(['logo-fae-mark.webp', 'logo-fae-mark.png'])

# ------------------------------------------------------------------ the shared art, one sprite per page

ARCH = 'M0,1 L0,0.4 C0,0.18 0.22,0.05 0.5,0 C0.78,0.05 1,0.18 1,0.4 L1,1 Z'
ARCH100 = 'M0 100 L0 40 C0 18 22 5 50 0 C78 5 100 18 100 40 L100 100'
SPRITE = f'''<svg class="sprite" width="0" height="0" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="foilg" x1="0" y1="0" x2="1" y2=".4" spreadMethod="reflect"><stop offset="0" stop-color="#A8873E"/><stop offset=".28" stop-color="#E7D08E"/><stop offset=".44" stop-color="#FFF3CC"/><stop offset=".58" stop-color="#CDAA5C"/><stop offset=".8" stop-color="#EBD596"/><stop offset="1" stop-color="#9C7B36"/><animateTransform attributeName="gradientTransform" type="translate" values="-.6 0;.6 0;-.6 0" dur="16s" repeatCount="indefinite"/></linearGradient>
<linearGradient id="steelg" x1="0" y1="0" x2="1" y2=".4" spreadMethod="reflect"><stop offset="0" stop-color="#8E9BB8"/><stop offset=".35" stop-color="#E4EAF6"/><stop offset=".5" stop-color="#FFFFFF"/><stop offset=".65" stop-color="#B6C2DA"/><stop offset="1" stop-color="#C8B376"/><animateTransform attributeName="gradientTransform" type="translate" values="-.6 0;.6 0;-.6 0" dur="12s" repeatCount="indefinite"/></linearGradient>
<radialGradient id="waxg" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#B23A4A"/><stop offset=".55" stop-color="#7A1E2C"/><stop offset="1" stop-color="#4A0F1A"/></radialGradient>
<clipPath id="arch" clipPathUnits="objectBoundingBox"><path d="{ARCH}"/></clipPath>
<symbol id="sp" viewBox="0 0 24 24"><path d="M12 0C12.9 7.3 16.7 11.1 24 12C16.7 12.9 12.9 16.7 12 24C11.1 16.7 7.3 12.9 0 12C7.3 11.1 11.1 7.3 12 0Z"/></symbol>
<symbol id="orn" viewBox="0 0 240 24"><g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M4 12H92c6 0 10-6 16-6 5 0 7 4 4 7-2 2-6 1-6-2"/><path d="M236 12H148c-6 0-10-6-16-6-5 0-7 4-4 7 2 2 6 1 6-2"/><path d="M120 3l6 9-6 9-6-9z"/><path d="M60 12c4-5 9-6 12-3M180 12c-4-5-9-6-12-3"/></g><circle cx="120" cy="12" r="1.8" fill="currentColor"/></symbol>
<symbol id="crn" viewBox="0 0 64 64"><g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M3 61V24C3 12 12 3 24 3h37"/><path d="M9 61V27c0-10 8-18 18-18h34"/><path d="M3 30c7 0 11 4 11 10 0 4-3 6-6 5"/><path d="M30 3c0 7 4 11 10 11 4 0 6-3 5-6"/><path d="M15 15c5 2 8 5 9 10"/></g><path d="M17 17l3-7 3 7-3 7z" fill="currentColor"/></symbol>
<symbol id="moonf" viewBox="0 0 1600 1672"><path fill-rule="evenodd" d="{MOON_D}"/></symbol>
<symbol id="seal" viewBox="0 0 100 100"><path d="{SEAL_D}"/></symbol>
</defs></svg>'''

def corners(): return ''.join(f'<svg class="cn cn{i}" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><use href="#crn"/></svg>' for i in range(1, 5))
def orn(cls=''): return f'<div class="orn{(" " + cls) if cls else ""}" aria-hidden="true"><svg viewBox="0 0 240 24" focusable="false"><use href="#orn"/></svg></div>'
def sparkle(cls=''): return f'<svg class="spk{(" " + cls) if cls else ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#sp"/></svg>'
def arch_outline(): return f'<svg class="arch-o" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="{ARCH100}" vector-effect="non-scaling-stroke"/></svg>'

def head(title, desc, path, body='', sky='dusk', cta=('/#checkout', 'Get tickets')):
    return f'''<!doctype html>
<html lang="en-GB" data-ch="knight">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#021A0E">
<link rel="icon" href="{FAV}">
<link rel="preload" href="/fonts/bodoni-moda-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body class="{body}" data-sky="{sky}">
{SPRITE}
<canvas class="sky" id="sky" aria-hidden="true"></canvas><canvas class="motes" id="motes" aria-hidden="true"></canvas><canvas class="fx" id="fx" aria-hidden="true"></canvas><div class="grain" aria-hidden="true"></div>
<a class="skip" href="#main">Skip to content</a>
<aside class="note" aria-label="About this site">Prototype by Astra agency for Fae Club. Not the live site, nothing is charged or sent.</aside>
<header class="hdr"><div class="wrap hdr-in">
<a class="logo" href="/" aria-label="Fae Club, home">{MARK}</a>
<nav aria-label="Main"><button class="mbtn" type="button" aria-expanded="false" aria-controls="mnav">Menu</button><div class="nl" id="mnav"><a class="d" href="/#the-night">The Fairytale Ball</a><a class="d" href="/#night-club">The Night Club</a><a class="d" href="/valkyrie-retreat/">The Valkyrie Retreat</a><a class="d" href="/#faqs">FAQs</a></div><a class="btn" href="{cta[0]}">{cta[1]}</a></nav>
</div></header>
<main id="main">
'''

FOOT = '''</main>
<footer class="ftr" data-sky="late"><div class="wrap">
<div class="ftr-moon" aria-hidden="true"><svg viewBox="0 0 1600 1672" focusable="false"><use href="#moonf" fill="url(#foilg)"/></svg></div>
<p class="ftr-line">See you at the ball.</p>
<div class="ftr-g">
<div>''' + MARK + '''<p>Fantasy balls and nights out for readers, cosplayers and anyone looking for something beyond the ordinary night out.</p></div>
<div><h2>Events</h2><ul><li><a href="/#the-night">The Fairytale Ball</a></li><li><a href="/#night-club">The Night Club</a></li><li><a href="/valkyrie-retreat/">The Valkyrie Retreat</a></li><li><a href="https://www.fa3club.com/past-events">Past events</a></li></ul></div>
<div><h2>Community</h2><ul><li><a href="https://discord.gg/aXc38Uspr9" rel="noopener">Discord</a></li><li><a href="https://www.instagram.com/fa3club/" rel="noopener">Instagram</a></li><li><a href="https://www.tiktok.com/@fa3club" rel="noopener">TikTok</a></li><li><a href="https://www.youtube.com/@faeclub" rel="noopener">YouTube</a></li></ul></div>
<div><h2>Contact</h2><ul><li><a href="mailto:info@fa3club.com">info@fa3club.com</a></li><li><a href="mailto:faeclubinfo@gmail.com">faeclubinfo@gmail.com</a></li></ul></div>
</div>
<p class="base">© 2026 Fae Club Ltd 15480699, 20 to 22 Wenlock Road, London N1 7GU. Prototype by Astra agency, October 2026. Nothing on this site is charged or sent.</p>
</div></footer>
<script src="/js/qrcode.min.js" defer></script>
<script src="/js/art.js" defer></script>
<script src="/js/site.js" defer></script>
</body></html>'''

# ------------------------------------------------------------------ home

SPREADS = [
    ('couple', 'Once upon a time', 'In a land that has long forgotten its magic, a grand enchanted ball is held.', 'A couple in a flower crown and a velvet waistcoat dancing at the Fairytale Ball'),
    ('arrive', 'On arrival', 'You’re greeted with a glass of Prosecco or elderflower fizz, and delicate canapés are served throughout the night.', 'Two guests in fairytale costume at the Fairytale Ball'),
    ('characters', 'The story', 'Encounter captivating characters as their stories unfold around you, with optional side quests to draw you deeper in.', 'Guests in elf costume at the Fairytale Ball'),
    ('dance', 'The dances', 'More guided dancing than ever before, so nobody needs to know a step to join in.', 'Two guests in ball gowns twirling on the stage at the Winter Gardens'),
    ('contest', 'The costume contest', 'Our beloved contest celebrates the guests who crafted their own spellbinding attire.', 'Guests in yellow and red gowns at the Fairytale Ball'),
    ('late', 'Into the night', 'A DJ set carries you into the late hours, with candid photography, photo booths and 360° video all evening.', 'Guests dancing in the hall at the Fairytale Ball'),
]

def dropcap(text): return f'<span class="dc">{text[0]}</span>{text[1:]}'

def txt_page(kick, text, n, cls=''):
    return f'<div class="face back txt{cls}">{corners()}<p class="pg-k">{sparkle()}{kick}{sparkle()}</p><p class="pg-t">{dropcap(text)}</p><p class="pg-n">{n}</p></div>'

def tale():
    e = FT['tiers'][0]; tot = e['price'] + e['fee'] + e['vat']; now = split3(tot)[0]
    chars = ''.join(f'<li><button type="button" class="ch" data-ch="{c["id"]}" aria-pressed="{"true" if i == 0 else "false"}">{c["word"]}</button></li>' for i, c in enumerate(D['characters']))
    ovals = ''.join(f'<span class="cov-o{" on" if i == 0 else ""}" data-ch="{c["id"]}">{(pic(c["img"], "", "(max-width: 760px) 40vw, 220px", eager=True) if i == 0 else pic_later(c["img"], "", "(max-width: 760px) 40vw, 220px"))}</span>' for i, c in enumerate(D['characters']))
    conj = ''.join(f'<span class="cj-o{" on" if i == 0 else ""}" data-ch="{c["id"]}">{(pic(c["img"], "", "(max-width: 760px) 30vw, 200px", eager=True) if i == 0 else pic_later(c["img"], "", "(max-width: 760px) 30vw, 200px"))}</span>' for i, c in enumerate(D['characters']))
    leaves = []
    roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii']
    # leaf 0, the cover, whose back is the first left page
    leaves.append(f'''<div class="leaf" style="--i:0"><div class="face front cover">
  <div class="cov-frame" aria-hidden="true"></div>{corners()}{MARK}
  <div class="cov-oval" aria-hidden="true">{ovals}</div>
  <p class="cov-t">The Fairytale Ball</p><p class="cov-d">17 April 2027<br>Winter Gardens, Blackpool</p>
</div>{txt_page(SPREADS[0][1], SPREADS[0][2], roman[0])}</div>''')
    for k, (img, kick, text, alt) in enumerate(SPREADS):
        nxt = SPREADS[k + 1] if k + 1 < len(SPREADS) else None
        back = txt_page(nxt[1], nxt[2], roman[k + 1]) if nxt else f'<div class="face back txt end">{corners()}<p class="pg-t">Who will you be?</p>{sparkle("big")}</div>'
        leaves.append(f'''<div class="leaf" style="--i:{k + 1}"><div class="face front ph"><div class="ph-a">{pic_later(img, alt, "(max-width: 760px) 86vw, 560px")}{arch_outline()}</div><div class="pg-m"><p class="pg-k">{kick}</p><p class="pg-t">{text}</p></div></div>{back}</div>''')
    flat = ''.join(f'<li><div><p class="pg-k">{kick}</p><p class="pg-t">{text}</p></div><div class="flat-a">{pic(img, alt, "(max-width: 760px) 92vw, 560px")}</div></li>' for img, kick, text, alt in SPREADS)
    rays = ''.join(f'<i style="--x:{x}%;--w:{w}%;--d:{d}s"></i>' for x, w, d in ((18, 9, 0), (34, 6, 1.6), (52, 11, .7), (68, 7, 2.3), (82, 8, 1.1)))
    twinkles = ''.join(f'<i style="--x:{x}%;--y:{y}%;--d:{d}s"></i>' for x, y, d in ((12, 14, 0), (27, 9, .9), (44, 18, 1.8), (61, 7, .4), (73, 16, 1.3), (88, 11, 2.1), (36, 30, 2.6), (79, 28, .2)))
    return f'''<section class="tale" id="the-night" data-tale data-sky="dusk" aria-labelledby="who-h">
  <script>(function(s){{if(!document.documentElement.classList.contains('rm')&&window.CSS&&CSS.supports('transform-style','preserve-3d'))s.classList.add('live')}})(document.currentScript.parentNode)</script>
  <div class="tale-stick">
    <div class="tale-copy">
      <p class="eyebrow">The Fairytale Ball · Saturday 17 April 2027 · Winter Gardens, Blackpool</p>
      <h1 id="who-h" class="who">Who will you be?</h1>
      <p class="who-l" id="who-l">I’ll arrive as</p>
      <ul class="chs" aria-labelledby="who-l">{chars}</ul>
      <div class="buy"><a class="btn solid" href="#checkout">Get your ticket</a><p class="buy-p">Tickets {gbp(tot)}, or {gbp(now)} today with pay in 3</p></div>
      <p class="tale-hint" aria-hidden="true">Or scroll to open the book</p>
    </div>
    <div class="moon" aria-hidden="true">
      <div class="moon-halo"></div>
      <svg class="moon-svg" viewBox="0 0 1600 1672" focusable="false"><use href="#moonf" fill="url(#foilg)"/></svg>
      <span class="moon-hand"></span>
      <div class="conj"><div class="conj-in">{conj}</div></div>
    </div>
    <div class="book" aria-hidden="true"><div class="book-in">{"".join(leaves)}<div class="book-base l"></div><div class="book-base r"></div></div></div>
    <div class="tale-hall">{pic_later("hall", "", "100vw")}<div class="rays" aria-hidden="true">{rays}</div><div class="tw" aria-hidden="true">{twinkles}</div><div class="hall-c"><p class="foil">For one night only, the fairytale is real, and you are part of it.</p><a class="btn solid" href="#checkout" data-hall-cta>Get your ticket</a></div></div>
  </div>
  <ol class="tale-flat">{flat}</ol>
  <figure class="tale-hall-flat">{pic("hall", "The Spanish Hall at the Winter Gardens, Blackpool", "100vw")}<figcaption>For one night only, the fairytale is real, and you are part of it.</figcaption></figure>
  <p class="hall-flat-cta"><a class="btn solid" href="#checkout">Get your ticket</a></p>
</section>'''

def guests():
    keys = ['knight', 'prince', 'princess', 'outlaw', 'fae', 'couple', 'fairy', 'waltz']
    n = len(keys); ovals = ''
    for i, k in enumerate(keys):
        a = math.pi - i * math.pi / (n - 1)
        x = 50 + 43 * math.cos(a); y = 78 - 62 * math.sin(a)
        ovals += f'<li class="g-o{" on" if i == 0 else ""}" style="--x:{x:.2f}%;--y:{y:.2f}%;--i:{i}">{pic(k, "", "120px")}</li>'
    return f'''<section class="sec solo" id="solo" data-sky="dance" aria-labelledby="solo-h">
  <div class="wrap solo-g">
    <div>
      <h2 id="solo-h" class="h2">Coming on your own?</h2>
      <blockquote class="solo-q"><p>Absolutely! Many of our fae attend solo.</p></blockquote>
      <p class="lead">Join our <a href="https://discord.gg/aXc38Uspr9" rel="noopener">Discord</a> to meet others going, plan outfits and travel, and find each other before the big night.</p>
      <figure class="solo-v"><blockquote><p>{QUOTES[1][0]}</p></blockquote><figcaption>{sparkle()}{QUOTES[1][1]}</figcaption></figure>
    </div>
    <div class="count">
      <div class="ring" aria-hidden="true"><svg class="ring-arc" viewBox="0 0 100 50" preserveAspectRatio="none" focusable="false"><path d="M7 39 A43 31 0 0 1 93 39" vector-effect="non-scaling-stroke"/></svg><ul class="g-row">{ovals}</ul></div>
      <p class="count-l" id="count-l">How many of you?</p>
      <div class="step" role="group" aria-labelledby="count-l"><button type="button" data-q="-1" aria-label="One fewer">{MINUS}</button><output data-o="qty" aria-live="polite">1</output><button type="button" data-q="1" aria-label="One more">{PLUS}</button></div>
      <p class="count-s" data-o="qtyline">Just you. You won’t be the only one.</p>
    </div>
  </div>
</section>'''

MINUS = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M2 8h12" stroke="currentColor" stroke-width="1.6"/></svg>'
PLUS = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M2 8h12M8 2v12" stroke="currentColor" stroke-width="1.6"/></svg>'

ENCH = ['Entrance to the Fairytale Ball', 'A glass of Prosecco or elderflower fizz on arrival', 'A variety of canapés', 'Live musical and themed performances', 'Encounters with fairytale characters', 'Guided dances', 'A DJ that will sweep you into the night', 'Costume contest entry for handmade outfits', 'Complimentary access to our photo booth', 'Festival style event bracelet', 'Access to professional candid photos from the evening']
ROYAL = ['Everything in the Enchanted Tier', 'A fairytale themed gift', 'A physical ticket for a keepsake', 'A formal invitation', 'Limited edition event art print', 'Automatic entry to our giveaway at the ball']

def tiers():
    e, r = FT['tiers']
    li = lambda xs: ''.join(f'<li>{sparkle()}{x}</li>' for x in xs)
    return f'''<section class="sec tiers" id="tickets" data-sky="dance" aria-labelledby="t-h">
  <div class="wrap">
    {orn()}
    <h2 id="t-h" class="h2 c">Royal has sold out. Enchanted hasn’t.</h2>
    <div class="tier-g">
      <article class="tier inv" data-tier="enchanted">
        <div class="inv-in">{corners()}
        <div class="tier-art">{pic("tier-enchanted", "Enchanted Tier ticket artwork", "(max-width: 760px) 80vw, 320px")}</div>
        <div class="tier-b"><h3>{e["name"]}</h3><p class="tier-p">{gbp(e["price"])} <span>plus {gbp(e["fee"])} service fee</span></p><ul>{li(ENCH)}</ul>
        <button type="button" class="btn sel" data-pick="enchanted" aria-pressed="true">Choose Enchanted</button></div>
        </div><span class="sheen" aria-hidden="true"></span>
      </article>
      <article class="tier inv out" data-tier="royal">
        <div class="inv-in">{corners()}
        <div class="tier-art">{pic("tier-royal", "Royal Tier ticket artwork", "(max-width: 760px) 80vw, 320px")}</div>
        <div class="tier-b"><h3>{r["name"]}</h3><p class="tier-p">{gbp(r["price"])} <span>plus {gbp(r["fee"])} service fee</span></p><ul>{li(ROYAL)}</ul></div>
        <p class="sold"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#seal" fill="url(#waxg)"/></svg><span>Sold out</span></p>
        </div><span class="sheen" aria-hidden="true"></span>
      </article>
    </div>
  </div>
</section>'''

def plan():
    e = FT['tiers'][0]; tot = e['price'] + e['fee'] + e['vat']; p3 = split3(tot)
    days = [TODAY, add_months(TODAY, 1), add_months(TODAY, 2)]
    bars = ''.join(f'<li style="--h:{(v / tot):.4f}"><span class="bar"><i></i>{arch_outline()}</span><b data-o="p{i}">{gbp(v)}</b><small data-o="d{i}">{"Today" if i == 0 else d.strftime("%-d %b")}</small></li>' for i, (v, d) in enumerate(zip(p3, days)))
    return f'''<section class="sec plan" id="spread" data-sky="toast" aria-labelledby="p-h">
  <div class="wrap plan-g">
    <div>
      <h2 id="p-h" class="h2">Spread the cost.</h2>
      <p class="lead">Pay in full, or in three monthly payments with no interest, right in the checkout. Your ticket comes the moment you pay, either way.</p>
      <div class="sw" role="group" aria-label="How you pay"><button type="button" data-plan="full" aria-pressed="false">Pay in full</button><button type="button" data-plan="three" aria-pressed="true">Pay in 3</button></div>
    </div>
    <figure class="pbars" data-plan-fig>
      <figcaption class="sr">What you pay and when</figcaption>
      <ol class="pb" data-pb>{bars}</ol>
      <p class="pb-t"><span data-o="planline">Three payments of about {gbp(p3[1])}</span> · total <b data-o="total">{gbp(tot)}</b></p>
    </figure>
  </div>
</section>'''

def radios_html():
    out = ''
    for i, t in enumerate(FT['tiers']):
        cls = ' class="out"' if t['soldOut'] else ''
        st = (' checked' if i == 0 else '') + (' disabled' if t['soldOut'] else '')
        em = 'Sold out' if t['soldOut'] else gbp(t['price'] + t['vat'] + t['fee'])
        out += f'<label{cls}><input type="radio" name="tier" value="{t["id"]}"{st}><span>{t["name"]}</span><em>{em}</em></label>'
    return out

def checkout():
    e = FT['tiers'][0]; tot = e['price'] + e['fee']
    evs = ''.join(f'<option value="{k}">{v["name"]}, {v["short"]}</option>' for k, v in D['events'].items())
    data = json.dumps({'events': D['events'], 'characters': D['characters'], 'today': D['today']}, ensure_ascii=False).replace('</', '<\\/')
    return f'''<section class="sec co" id="checkout" data-sky="toast" aria-labelledby="co-h">
  <div class="wrap co-g">
    <form class="co-f" data-co novalidate>
      <h2 id="co-h" class="h2">Your ticket.</h2>
      <label class="fld"><span>Event</span><select name="event" data-f="event">{evs}</select></label>
      <fieldset class="fld"><legend>Ticket</legend><div class="radios" data-tiers>{radios_html()}</div></fieldset>
      <div class="fld two"><div><span class="lab" id="qty-l">Guests</span><div class="step sm" role="group" aria-labelledby="qty-l"><button type="button" data-q="-1" aria-label="One fewer">{MINUS}</button><output data-o="qty">1</output><button type="button" data-q="1" aria-label="One more">{PLUS}</button></div></div>
      <div><span class="lab" id="pl-l">Payment</span><div class="sw sm" role="group" aria-labelledby="pl-l"><button type="button" data-plan="full" aria-pressed="false">In full</button><button type="button" data-plan="three" aria-pressed="true">In 3</button></div></div></div>
      <label class="fld"><span>Name on the ticket</span><input name="name" autocomplete="name" required placeholder="As it’ll be on the guest list"></label>
      <label class="fld"><span>Email for your ticket</span><input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label>
      <label class="fld"><span>Allergies or requirements</span><input name="notes" placeholder="Optional"></label>
      <dl class="sum" data-sum><div><dt data-o="line">1 × Enchanted Tier</dt><dd data-o="sub">{gbp(e["price"])}</dd></div><div><dt>Service fee</dt><dd data-o="fee">{gbp(e["fee"])}</dd></div><div class="vat" hidden><dt>VAT</dt><dd data-o="vat">£0.00</dd></div><div class="tot"><dt>Total</dt><dd data-o="total">{gbp(tot)}</dd></div><div class="now"><dt>Today</dt><dd data-o="now">{gbp(split3(tot)[0])}</dd></div></dl>
      <p class="err" data-err role="alert" hidden></p>
      <button class="btn solid pay" type="submit" data-o="paybtn">Pay {gbp(split3(tot)[0])} now</button>
      <p class="fine">Pay in 3 has no interest. Tickets aren’t refundable, as with all our events. This prototype charges nothing and sends nothing.</p>
      <script type="application/json" data-d>{data}</script>
    </form>
    <div class="tk-wrap" aria-live="polite">
      <article class="tk" data-tk>
        <div class="tk-top">{corners()}{MARK}<p class="tk-ev" data-o="tkev">The Fairytale Ball</p><p class="tk-dt" data-o="tkdt">{FT["dateText"]}, {FT["time"]}<br>{FT["venue"]}</p></div>
        <div class="tk-mid"><div class="tk-seal" aria-hidden="true"><svg viewBox="0 0 100 100" focusable="false"><use href="#seal" fill="url(#waxg)"/></svg><svg class="tk-seal-m" viewBox="0 0 1600 1672" focusable="false"><use href="#moonf"/></svg></div><p class="tk-k">Admit <b data-o="tkqty">1</b></p><p class="tk-name" data-o="tkname">Your name</p><p class="tk-as" data-o="tkas">arriving as a knight</p></div>
        <div class="tk-bot"><div class="qr" data-qr><canvas width="220" height="220" aria-hidden="true"></canvas><p class="qr-wait" data-o="qrwait">Your QR code appears here the moment you pay.</p></div>
        <dl class="tk-meta"><div><dt>Ticket</dt><dd data-o="tktier">Enchanted Tier</dd></div><div><dt>Paid</dt><dd data-o="tkpaid">Not yet</dd></div><div><dt>Ref</dt><dd data-o="tkref">FTB27</dd></div></dl></div>
      </article>
      <p class="tk-done" data-done hidden></p>
    </div>
  </div>
</section>'''

def venue():
    rays = ''.join(f'<i style="--x:{x}%;--w:{w}%;--d:{d}s"></i>' for x, w, d in ((22, 8, .4), (41, 10, 1.9), (63, 7, 1.1), (80, 9, 2.6)))
    return f'''<section class="sec venue" id="venue" data-sky="moon" aria-labelledby="v-h">
  <div class="venue-ph">{pic("spanish", "The Spanish Hall at the Winter Gardens, Blackpool", "100vw")}<div class="rays" aria-hidden="true">{rays}</div></div>
  <div class="wrap venue-g">
    <div><h2 id="v-h" class="h2">The Winter Gardens, Blackpool.</h2>
    <p class="lead">Dance beneath the sky in the grand castle exterior of the Spanish Hall, then wander into the medieval majesty of the Baronial Hall and a regal Renaissance chamber.</p></div>
    <div class="how">
      <p class="how-k">Please enter at 97 Church Street to avoid any stairs. It’s our main entrance.</p>
      <dl>
        <div><dt>By car</dt><dd>Use FY1 1HL. Parking at Houndshill Shopping Centre or the Talbot Road Multi Storey (FY1 3AY). Blue Badge holders, Central Car Park (FY1 6AD).</dd></div>
        <div><dt>By taxi</dt><dd>A rank on Church Street, a short walk from the entrance, and drop offs outside both main entrances.</dd></div>
        <div><dt>By train</dt><dd>Blackpool North is about a 10 minute walk.</dd></div>
      </dl>
    </div>
  </div>
</section>'''

def dress():
    return f'''<section class="sec dress" id="dress" data-sky="moon" aria-labelledby="d-h">
  <div class="wrap dress-g">
    <div class="dress-t">
      <h2 id="d-h" class="h2">Come dressed as the legend you were meant to be.</h2>
      <p class="lead">A knight in shining armour, a dashing prince, a royal gown, or wings that carry you somewhere far away. Every fairytale character is welcome, and handmade outfits can enter the costume contest.</p>
      <ul class="reads"><li><a href="https://www.fa3club.com/post/fantasy-ball-outfits">Fantasy ball outfits</a></li><li><a href="https://www.fa3club.com/post/what-happens-at-a-fantasy-ball">What happens at a fantasy ball?</a></li><li><a href="https://www.fa3club.com/post/our-trinket-trading-guide">Our trinket trading guide</a></li><li><a href="https://www.fa3club.com/post/making-a-weekend-out-of-the-fairytale-ball">Making a weekend of it</a></li></ul>
    </div>
    <div class="dress-ph">
      <figure class="a"><div class="ph-a">{pic("group", "Guests in costume in front of a carved fireplace at the Fairytale Ball", "(max-width: 760px) 60vw, 300px")}{arch_outline()}</div></figure>
      <figure class="b"><div class="ph-a">{pic("fairy", "A guest in a green fairy gown at the Fairytale Ball", "(max-width: 760px) 50vw, 260px")}{arch_outline()}</div></figure>
      <figure class="c"><div class="ph-a">{pic("waltz", "Two guests dancing at a Fae Club ball", "(max-width: 760px) 70vw, 360px")}{arch_outline()}</div></figure>
      {sparkle("f1")}{sparkle("f2")}{sparkle("f3")}
    </div>
  </div>
</section>'''

def faqs():
    items = ''.join(f'<details><summary>{sparkle()}<span>{q}</span></summary><p>{a}</p></details>' for q, a in D['faqs'])
    return f'''<section class="sec faqs" id="faqs" data-sky="late" aria-labelledby="f-h">
  <div class="wrap faq-g"><h2 id="f-h" class="h2">Before the ball.</h2><div class="faq-l">{items}</div></div>
</section>'''

def more():
    nc = NC['tiers'][0]; ntot = nc['price'] + nc['vat'] + nc['fee']
    return f'''<section class="sec more" data-sky="late" aria-labelledby="m-h">
  <div class="wrap">
    {orn()}
    <h2 id="m-h" class="h2 c">Also on the calendar.</h2>
    <div class="more-g">
      <article class="ev club" id="night-club" data-ev="nc" data-date="{NC["date"]}">
        <div class="ev-ph">{pic("nightclub", "Guests at The Night Club under coloured lights", "(max-width: 760px) 92vw, 520px")}</div>
        <div class="ev-b"><p class="ev-d">{NC["dateText"]}, {NC["time"]}</p><h3>The Night Club</h3><p>A fantasy Night Club for readers, with a themed DJ, costumes and a dance floor full of people celebrating the stories they love, on Halloween weekend. {NC["venue"]}.</p>
        <p class="ev-p">{gbp(ntot)} <span>with VAT and fee, VIP sold out</span></p>
        <a class="btn" href="#checkout" data-set-event="nc">Get Night Club tickets</a></div>
      </article>
      <article class="ev valk">
        <div class="ev-ph">{pic("valkyrie", "A Valkyrie in black wings by a lake in the Lake District", "(max-width: 760px) 92vw, 520px")}</div>
        <div class="ev-b"><p class="ev-d">{RT["dates"]}</p><h3>The Valkyrie Retreat</h3><p>Five days on a private island manor on the edge of the Lake District, with sword flow, a mountain climb, two Valkyrie photoshoots and a private chef, by our sister company High Fae Retreats.</p>
        <p class="ev-p">{gbp0(RT["price"])} <span>all included, payment plans available</span></p>
        <a class="btn" href="/valkyrie-retreat/">See the retreat</a></div>
      </article>
    </div>
  </div>
</section>'''

QUOTES = [
    ('I absolutely give Fae Club 10 out of 5 stars! Every event tops the previous ones. I traveled from USA to Manchester for the Mythical Memories Ball, and it was the experience of a lifetime.', 'Shawnee'),
    ('The Starlit Soirée hosted by Fae Club was the first fantasy ball I attended alone. It was very scary but I found a wonderful inviting community in a safe and gorgeous space.', 'Kimelle'),
    ('I saw their events online for so long, really pleased we decided to attend. Me and my friend went to the Fairytale ball and it was so much fun!', 'Anya'),
]
PAST = [('The Fairytale Ball', 'April 2026'), ('Mythical Memories Ball', 'October 2025'), ('The Lions Solstice', 'August 2025'), ('The Twisted Temptations Masquerade Ball', 'May 2025'), ('The Starlit Soirée', 'October 2024'), ('Our Faerie Picnic', 'June 2024')]

def community():
    qs = ''.join(f'<li><span class="qm" aria-hidden="true">“</span><blockquote><p>{q}</p></blockquote><p class="who-q">{sparkle()}{n}</p></li>' for q, n in QUOTES if n != 'Kimelle')
    past = ''.join(f'<li><b>{n}</b><span>{d}</span></li>' for n, d in PAST)
    return f'''<section class="sec comm" data-sky="late" aria-labelledby="c-h">
  <div class="wrap">
    {orn()}
    <h2 id="c-h" class="h2 c">From the fae who came.</h2>
    <ul class="quotes">{qs}</ul>
    <div class="past"><h3>Six balls since June 2024</h3><ol>{past}</ol><p>The Lions Solstice sold out in under 48 hours. Photos by Krios Photography, on <a href="https://www.fa3club.com/past-events">Past Events</a>.</p></div>
  </div>
</section>'''

def bar():
    e = FT['tiers'][0]; now = split3(e['price'] + e['fee'] + e['vat'])[0]
    return f'''<div class="sbar" data-sbar aria-hidden="true"><div class="wrap sbar-in"><p data-o="sbar">{gbp(now)} today, pay in 3 · 1 Enchanted ticket</p><a class="btn solid" href="#checkout" tabindex="-1">Checkout</a></div></div>'''

def home():
    return head('The Fairytale Ball 2027 | Fae Club', 'The Fairytale Ball, Saturday 17 April 2027 at the Winter Gardens, Blackpool. Tickets in full or in 3, with your QR ticket sent the moment you pay.', '/') + \
        tale() + guests() + tiers() + plan() + checkout() + venue() + dress() + faqs() + more() + community() + bar() + FOOT

# ------------------------------------------------------------------ the retreat

INCL = [('Sword flow', 'Begin each morning with a graceful blend of movement, strength and fantasy, blade in hand.'),
        ('Book themed meditations', 'A journey into a magical book world built inside your mind, to set your intentions for the day.'),
        ('Climb the mountain', 'A guided, beginner friendly hike, mantra in hand, rewarded with a commemorative Valkyrie patch.'),
        ('Two Valkyrie photoshoots', 'Against a private island manor, with mountains and water all around.'),
        ('A private chef', 'Breakfast, lunch and dinner every day. All meals included.'),
        ('A silver gift', 'Your own sword from the Knight’s Vault, engraved for you, shipped home if you travel from abroad.'),
        ('Dance of the Valkyries', 'The grand finale, an intimate celebration with dancing and a chance to let loose.')]

def retreat():
    incl = ''.join(f'<li><span class="rn" aria-hidden="true">{["I","II","III","IV","V","VI","VII"][i]}</span><h3>{h}</h3><p>{p}</p></li>' for i, (h, p) in enumerate(INCL))
    price = RT['price']; months = 4
    def sched(total, n):
        base = total // n; first = total - base * (n - 1)
        return [first] + [base] * (n - 1)
    s = sched(price, months)
    bars = ''.join(f'<li style="--h:{v / price:.4f}"><span class="bar"><i></i>{arch_outline()}</span><b>{gbp(v)}</b><small>{"Today" if i == 0 else add_months(TODAY, i).strftime("%b %Y")}</small></li>' for i, v in enumerate(s))
    data = json.dumps({'price': price, 'friendOff': RT['friendOff'], 'max': RT['maxMonths'], 'today': D['today']})
    used.update(['logo-highfae-360.webp', 'logo-highfae-360.jpg'])
    return head('The Valkyrie Retreat, 14 to 18 June 2027 | Fae Club', 'Five days on a private island manor on the edge of the Lake District. All included for £1,795, with payment plans.', '/valkyrie-retreat/', 'rt', 'aurora', ('#reserve', 'Reserve')) + f'''
<section class="rt-hero" data-sky="aurora" aria-labelledby="rt-h">
  <div class="rt-ph">{pic("valkyrie", "A Valkyrie in black wings by a lake in the Lake District", "100vw", eager=True)}</div>
  <div class="wrap rt-in">
    <picture><source type="image/webp" srcset="/media/logo-highfae-360.webp"><img class="hf" src="/media/logo-highfae-360.jpg" width="360" height="360" alt="High Fae Retreats"></picture>
    <h1 id="rt-h" class="who steel">The Valkyrie Retreat</h1>
    <p class="lead">14 to 18 June 2027. A six star manor on its own private island, on the edge of the Lake District. 18 and over, women only.</p>
    <p class="rt-price">All included for {gbp0(price)}, with a personalised payment plan if you’d like one.</p>
    <a class="btn solid" href="#reserve">Reserve your place</a>
  </div>
</section>
<section class="sec rt-incl" data-sky="aurora" aria-labelledby="i-h">
  <div class="wrap rt-g">
    <div><h2 id="i-h" class="h2 steel">Five days, all included.</h2><ul class="incl">{incl}</ul></div>
    <div class="rt-phs">
      <figure><div class="ph-a">{pic("swords", "Five Valkyries raising swords by a lake", "(max-width: 760px) 92vw, 520px")}{arch_outline()}</div></figure>
      <figure><div class="ph-a">{pic("island", "The manor on its private island from the air", "(max-width: 760px) 92vw, 520px")}{arch_outline()}</div></figure>
      <figure><div class="ph-a">{pic("manor", "The manor house", "(max-width: 760px) 92vw, 520px")}{arch_outline()}</div></figure>
    </div>
  </div>
</section>
<section class="sec rt-plan" id="reserve" data-sky="frost" aria-labelledby="rp-h">
  <div class="wrap rt-plan-g">
    <form class="rp" data-rp novalidate>
      <h2 id="rp-h" class="h2 steel">Pay for it your way.</h2>
      <p class="lead">All included for {gbp0(price)}, travel not included. Choose how many monthly payments, and book with a friend for £150 off.</p>
      <label class="fld"><span>Monthly payments, <b data-o="m">{months}</b></span><input type="range" min="1" max="{RT["maxMonths"]}" value="{months}" data-r="months" aria-valuetext="{months} payments"></label>
      <label class="chk"><input type="checkbox" data-r="friend"> <span>I’m booking with a friend</span></label>
      <label class="fld"><span>Your name</span><input name="name" autocomplete="name" required></label>
      <label class="fld"><span>Email</span><input name="email" type="email" autocomplete="email" required></label>
      <label class="fld friend" hidden><span>Your friend’s name</span><input name="friend"></label>
      <p class="err" data-err role="alert" hidden></p>
      <button class="btn solid" type="submit" data-o="rpbtn">Reserve, first payment {gbp(s[0])}</button>
      <p class="fine">An example plan. Elle confirms your plan by email before anything is taken. This prototype sends nothing.</p>
      <script type="application/json" data-d>{data}</script>
    </form>
    <figure class="pbars">
      <figcaption class="sr">Your payments and when</figcaption>
      <ol class="pb" data-rb>{bars}</ol>
      <p class="pb-t"><span data-o="rline">{months} payments</span> · total <b data-o="rtotal">{gbp(price)}</b></p>
      <p class="rp-done" data-done hidden></p>
    </figure>
  </div>
</section>''' + FOOT.replace('data-sky="late"', 'data-sky="frost"')

# ------------------------------------------------------------------ write

def write(rel, html):
    p = os.path.join(OUT, rel.lstrip('/'), 'index.html'); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(html)

def build():
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    write('/', home()); write('/valkyrie-retreat/', retreat())
    for d in ('css', 'js', 'fonts'):
        shutil.copytree(os.path.join(B, d), os.path.join(OUT, d))
    os.makedirs(os.path.join(OUT, 'media'))
    for f in sorted(used): shutil.copy(os.path.join(B, 'media', f), os.path.join(OUT, 'media', f))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    import re
    for dp, dn, fn in os.walk(OUT):
        for f in fn:
            if not f.endswith('.html'): continue
            s = open(os.path.join(dp, f)).read()
            refs = re.findall(r'(?:src|href)="(/[^"#?]+)"', s) + [x.split()[0] for t in re.findall(r'srcset="([^"]+)"', s) for x in t.split(', ')]
            for r in refs:
                if r.endswith('/'): r += 'index.html'
                assert os.path.exists(os.path.join(OUT, r.lstrip('/'))), (f, r)
            for ref in re.findall(r'href="#([\w-]+)"', s):
                assert f'id="{ref}"' in s, (f, ref)
    print('built', OUT, len(used), 'media files')

if __name__ == '__main__':
    build()
