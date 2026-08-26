#!/usr/bin/env python3
"""Toffe Traktaties build 3 — same products-first IA as build 2, elevated art.

Raka: build 2 still looked cheap (so does the client's own site). Take the art
side further, "wild factor", premium not just a reskin. Reference studied:
Tony's Chocolonely (Dutch, same market) — premium reads as confident RESTRAINT,
not more decoration: cream-dominant, few rich colours, bold characterful type,
generous space, and colour used strategically BEHIND products.

The single biggest lever against amateur product photography on messy wood/
confetti backgrounds: colour-block each photo onto a solid candy field with
generous padding, so the noise is contained and the grid reads as a designed,
rhythmic system. Plus Fraunces (soft/wonky) display type, a category colour
system, one scallop motif, and no scattered confetti sprinkles.
"""
import json, os

IMGS = json.load(open('imgs.json'))
FONTCSS = open('fonts/inline2.css').read()
CSS = open('shop2.css').read()
OLD = json.load(open('../toffe/enc/assets.json'))
LOGO = OLD['logo']['uri'] if isinstance(OLD['logo'], dict) else OLD['logo']
STICKER = OLD['personal']['uri'] if isinstance(OLD['personal'], dict) else OLD['personal']

from shopdata import P, CATS
SHOP = "https://toffetraktaties.nl"

# category -> candy field colour (the design system, I5 nomenclature)
CAT_COLOR = {
    "verjaardag":              "#E9557B",  # raspberry
    "juf-en-meester":          "#63C29A",  # mint
    "afscheid":                "#5FBEE6",  # sky
    "geboorte":                "#F5B841",  # sun
    "kinderfeestjes":          "#8E6FD6",  # grape
    "sanrio-kawaii-traktatie": "#F27E62",  # coral
    "valentijn":               "#E9557B",  # raspberry
    "kerst":                   "#5FBEE6",  # sky
}
DEFAULT_FIELD = "#F5B841"

# rotate through the palette so consecutive tiles never share a colour
ROTATION = ["#E9557B", "#F5B841", "#5FBEE6", "#63C29A", "#8E6FD6", "#F27E62"]


def scallop(color, flip=False):
    # a soft scalloped edge, one motif echoing the round personalised sticker
    t = 'transform="scale(1,-1) translate(0,-22)"' if flip else ''
    return (f'<svg class="scallop" viewBox="0 0 1200 22" preserveAspectRatio="none" aria-hidden="true">'
            f'<g {t}><path fill="{color}" d="M0 22 V11 '
            + "".join(f"Q{15+i*30} -8 {30+i*30} 11 " for i in range(40))
            + 'V22 Z"/></g></svg>')


def card(p, i, eager=False):
    field = ROTATION[i % len(ROTATION)]
    src = IMGS[p['f']]
    loading = '' if eager else ' loading="lazy"'
    sold = ('<div class="soldout"><span>Even uitverkocht</span></div>' if not p['stock'] else '')
    return f"""<a class="card" href="{SHOP}/product/{p['s']}/">
  <div class="card-img" style="background:{field}">
    <div class="ph"><img src="{src}" alt="{p['n']}" width="560" height="560"{loading}></div>
    {sold}
  </div>
  <div class="card-body">
    <h3>{p['n']}</h3>
    <div class="badges">
      <span class="bdg design">Zelf ontworpen</span>
      <span class="bdg name">Naam &amp; leeftijd</span>
    </div>
    <div class="card-foot">
      <span class="price tnum">&euro;&nbsp;{p['p']} <span>p/st</span></span>
      <span class="btn sm">Bekijk</span>
    </div>
  </div>
</a>"""


CC = {}
for p in P:
    CC[p['cat']] = CC.get(p['cat'], 0) + 1

hero_products = P[:1]
peek = "".join(card(p, i + 1) for i, p in enumerate(P[1:4]))
grid = "".join(card(p, i) for i, p in enumerate(P[4:]))
occ = "".join(
    f'<a href="{SHOP}/product-category/{slug}/" style="background:{CAT_COLOR.get(slug, DEFAULT_FIELD)}">'
    f'<span class="dot"></span><b>{label}</b><span class="sub">{desc}</span>'
    f'<span class="n">{CC.get(slug, 0)} {"traktatie" if CC.get(slug,0)==1 else "traktaties"}</span></a>'
    for slug, label, desc in CATS)
navcats = "".join(f'<a href="{SHOP}/product-category/{s}/">{l}</a>' for s, l, _ in CATS[:6])

hero = P[0]
hero_field = CAT_COLOR.get(hero['cat'], DEFAULT_FIELD)

# a rotating sticker badge, drawn (echoes their real round personalised sticker)
def sticker_badge():
    return '''<svg class="show-badge" viewBox="0 0 120 120" aria-hidden="true">
  <circle cx="60" cy="60" r="54" fill="#191B4E"/>
  <circle cx="60" cy="60" r="47" fill="none" stroke="#F5B841" stroke-width="1.5" stroke-dasharray="1.5 5"/>
  <text x="60" y="52" text-anchor="middle" fill="#fff" font-family="Fraunces,serif" font-weight="900" font-size="30">100%</text>
  <text x="60" y="72" text-anchor="middle" fill="#F5B841" font-family="DM Sans,sans-serif" font-weight="700" font-size="10.5" letter-spacing="1.5">ZELF</text>
  <text x="60" y="85" text-anchor="middle" fill="#F5B841" font-family="DM Sans,sans-serif" font-weight="700" font-size="10.5" letter-spacing="1">GETEKEND</text>
</svg>'''

SCRIPT = open('shop_script.js').read() if os.path.exists('shop_script.js') else ""

HTML = f"""<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toffe Traktaties — Kant-en-klare traktaties met naam en leeftijd</title>
<meta name="description" content="Originele kant-en-klare traktaties voor verjaardag, juf en meester, afscheid en geboorte. Elk label zelf ontworpen, naam en leeftijd erop, verzonden met PostNL.">
<meta name="robots" content="noindex, nofollow">
<style>
{FONTCSS}
{CSS}
</style>
</head>
<body>

<div class="util">
  <div class="util-in">
    <span>Gratis verzending vanaf <b>&euro;&nbsp;70</b></span>
    <span>Naam en leeftijd op elk label, <b>zonder meerprijs</b></span>
    <span>Verzonden met <b>PostNL</b></span>
  </div>
</div>

<header class="hdr">
  <div class="hdr-in">
    <a class="brand" href="{SHOP}"><img src="{LOGO}" alt="Toffe Traktaties" width="300" height="94"></a>
    <nav class="hnav" aria-label="Categorieen">
      {navcats}
      <a href="{SHOP}/shop/">Alle traktaties</a>
    </nav>
    <a class="cart" href="{SHOP}/winkelwagen/">Winkelwagen</a>
  </div>
</header>

<main>

<!-- ============ HERO ============ -->
<section class="hero">
  <div class="wrap hero-in">
    <div>
      <span class="hero-kick">Zelf getekend in Enschede</span>
      <h1 class="display">Traktaties met <span class="accent serif-it">de naam</span> erop.</h1>
      <p class="lede hero-sub">Kant-en-klare uitdeeltraktaties waarvan wij elk label zelf ontwerpen.
        Kies een gelegenheid, of check eerst even of het op tijd bij je is.</p>
      <div class="hero-actions">
        <a class="btn rasp" href="#assortiment">Bekijk de traktaties</a>
        <a class="btn ghost" href="{SHOP}/shop/">Alle 66 op een rij</a>
      </div>

      <form class="finder" id="finder">
        <h4>Op tijd voor de grote dag?</h4>
        <div class="finder-row">
          <div class="fld">
            <label for="tdate">Wanneer is de traktatie?</label>
            <input type="date" id="tdate" name="tdate">
          </div>
          <div class="fld">
            <label for="tocc">Gelegenheid</label>
            <select id="tocc" name="tocc">
              <option value="">Maakt niet uit</option>
              {"".join(f'<option value="{s}">{l}</option>' for s, l, _ in CATS)}
            </select>
          </div>
          <button class="btn" type="submit">Check</button>
        </div>
        <div class="verdict" id="verdict" role="status" aria-live="polite"></div>
      </form>
    </div>

    <div class="showcase">
      <div class="showpanel" style="background:{hero_field}">
        <div class="field" style="background:{hero_field}"></div>
        <img src="{IMGS[hero['f']]}" alt="{hero['n']}" width="560" height="560">
        {sticker_badge()}
        <div class="show-tag"><b>{hero['n']}</b><span>&euro;&nbsp;{hero['p']} per stuk &middot; naam &amp; leeftijd erop</span></div>
      </div>
      <div class="peekrow">{peek}</div>
    </div>
  </div>
</section>

<!-- ============ OCCASIONS ============ -->
<section class="sec" style="padding-top:clamp(20px,2.5vw,44px)">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Zoek op gelegenheid</span>
        <h2>Waar is het feestje voor?</h2>
      </div>
      <a class="btn ghost sm" href="{SHOP}/shop/">Alle traktaties</a>
    </div>
    <div class="occ">{occ}</div>
  </div>
</section>

<!-- ============ THE SHOP ============ -->
<section class="sec" id="assortiment" style="padding-top:clamp(24px,3vw,48px)">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Vers uit de werkplaats</span>
        <h2>Populaire traktaties</h2>
        <p class="small muted" style="margin-top:8px">Elk label hieronder is door ons zelf getekend,
          dus je komt ze bij geen enkele andere shop tegen.</p>
      </div>
      <a class="btn ghost sm" href="{SHOP}/shop/">Bekijk het hele assortiment</a>
    </div>
    <div class="grid">{grid}</div>
    <div style="text-align:center;margin-top:clamp(26px,3vw,42px)">
      <a class="btn" href="{SHOP}/shop/">Bekijk alle 66 traktaties</a>
    </div>
  </div>
</section>

<!-- ============ CALCULATOR ============ -->
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="calc">
      <div>
        <h2>Even rekenen <span class="serif-it">voor de klas.</span></h2>
        <p class="small" style="margin-top:14px;color:#B7AFD6;max-width:42ch">Een traktatie kost hier
          tussen de &euro;&nbsp;1,30 en &euro;&nbsp;3,50 per stuk. Vul in hoeveel kinderen er in de klas
          zitten, dan zie je meteen waar je uitkomt en of de verzending gratis is.</p>
        <p class="small" style="margin-top:14px;color:#B7AFD6">Boven de <b style="color:#fff">&euro;&nbsp;70</b>
          betalen wij de verzendkosten. Daaronder is het &euro;&nbsp;6,45 binnen Nederland.</p>
      </div>
      <div class="calc-panel">
        <div class="calc-row">
          <div>
            <label for="qty">Aantal kinderen</label>
            <input type="number" id="qty" value="28" min="1" max="200" inputmode="numeric">
          </div>
          <div>
            <label for="pick">Welke traktatie</label>
            <select id="pick">
              {"".join(f'<option value="{p["p"].replace(",", ".")}">{p["n"]} &euro; {p["p"]}</option>' for p in P if p['stock'])}
            </select>
          </div>
        </div>
        <div class="calc-out">
          <div class="calc-total">
            <span class="small" style="color:#B7AFD6">Totaal voor de klas</span>
            <span class="big tnum" id="total">&euro;&nbsp;49,00</span>
          </div>
          <div class="ship-bar"><i id="bar" style="width:70%"></i></div>
          <p class="ship-note" id="shipnote">Nog <b>&euro;&nbsp;21,00</b> tot gratis verzending.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ DELIVERY ============ -->
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Zo werkt het</span>
        <h2>Op tijd, dat is het belangrijkste.</h2>
      </div>
    </div>
    <div class="deliv">
      <div>
        <div class="num">1</div>
        <h4>Geef de traktatiedatum door</h4>
        <p class="small muted">Vul bij het bestellen in het opmerkingenveld de datum in waarop
          getrakteerd wordt. Daar plannen we op.</p>
      </div>
      <div>
        <div class="num">2</div>
        <h4>Wij tekenen, pakken en personaliseren</h4>
        <p class="small muted">Alles wordt hier met de hand ingepakt en voorzien van de naam en leeftijd.
          Versturen doen we binnen 3 werkdagen als alles op voorraad is.</p>
      </div>
      <div>
        <div class="num">3</div>
        <h4>Een week van tevoren op de post</h4>
        <p class="small muted">Bij een doorgegeven datum sturen we het pakket ongeveer een week eerder,
          met PostNL en Track &amp; Trace. Woon je bij Enschede, dan kun je ook ophalen.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ DESIGN STORY (demoted, reason-to-choose) ============ -->
{scallop('#F4E9D6')}
<section class="sec story">
  <div class="wrap story-in">
    <div>
      <span class="eyebrow">Waarom ze er anders uitzien</span>
      <h2>Geen ingekochte labels. <span class="serif-it">Alles van onszelf.</span></h2>
      <p style="margin-top:14px;color:var(--ink-2)">Hein is grafisch vormgever. Elk label, elke sticker
        en elke illustratie die je hierboven ziet is door hem getekend, en daarna door Lindsay met de
        hand in elkaar gezet. Dat is precies de reden dat je deze ontwerpen nergens anders vindt.</p>
      <ul>
        <li><span class="tick">&check;</span><span><b>Elk ontwerp is van onszelf.</b> Geen
          standaardlabels die tien andere shops ook verkopen.</span></li>
        <li><span class="tick">&check;</span><span><b>Naam en leeftijd horen erbij.</b> Op elk label,
          zonder meerprijs, niet als dure extra optie.</span></li>
        <li><span class="tick">&check;</span><span><b>Met de hand ingepakt.</b> Wij zijn Hein en Lindsay,
          ouders van Fien en Cas. Er zit geen magazijn tussen.</span></li>
      </ul>
      <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn rasp" href="#assortiment">Bekijk de traktaties</a>
        <a class="btn ghost" href="{SHOP}/over-ons/">Over Hein en Lindsay</a>
      </div>
    </div>
    <div class="sticker-wrap">
      <div class="sticker"><img src="{STICKER}" alt="Traktatie met een label waarop een naam en leeftijd staat" width="560" height="560" loading="lazy"></div>
    </div>
  </div>
</section>
{scallop('#F4E9D6', flip=True)}

<!-- ============ REVIEW ============ -->
<section class="sec">
  <div class="wrap">
    <div class="review">
      <div class="stars" aria-label="5 van de 5 sterren">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p class="q">&ldquo;Super leuke traktaties, goede service. Hele fijne communicatie, echt top.&rdquo;</p>
      <p class="small muted" style="margin-top:14px">Marley van Hezik, via Google</p>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" style="justify-content:center;text-align:center">
      <div style="width:100%">
        <span class="eyebrow" style="justify-content:center;width:100%">Nog even dit</span>
        <h2>Voordat je bestelt</h2>
      </div>
    </div>
    <div class="faq">
      <details open><summary>Hoe snel wordt mijn bestelling verstuurd?</summary>
        <div class="a">We streven ernaar elke bestelling binnen 3 werkdagen te versturen, mits de
          artikelen op voorraad zijn. Zitten er handgemaakte artikelen bij, dan kan het langer duren.
          Geef je een traktatiedatum door, dan proberen we het pakket ongeveer een week voor die datum
          te versturen.</div></details>
      <details><summary>Wat kost de verzending?</summary>
        <div class="a">Binnen Nederland &euro;&nbsp;6,45. Bij bestellingen boven de &euro;&nbsp;70 betalen
          wij de verzendkosten. Naar Belgie is het &euro;&nbsp;9,95, dat wordt automatisch aangepast
          zodra je een Belgisch adres invult.</div></details>
      <details><summary>Ik heb het met spoed nodig, kan dat?</summary>
        <div class="a">Neem dan eerst even contact op, via het contactformulier, een mail naar
          info@toffetraktaties.nl of een berichtje via WhatsApp. We kijken dan wat er nog mogelijk is en
          nemen snel contact met je op.</div></details>
      <details><summary>Kan ik de bestelling ophalen?</summary>
        <div class="a">Woon je in de buurt van Enschede, dan kan dat. Kies in het bestelproces voor
          afhalen en betaal je bestelling.</div></details>
      <details><summary>Komt de naam en leeftijd er standaard op?</summary>
        <div class="a">Ja. Bij elke traktatie hoort een label met de naam en leeftijd, zonder meerprijs.
          Je geeft ze door tijdens het bestellen.</div></details>
      <details><summary>Hoe kan ik betalen?</summary>
        <div class="a">Met iDEAL, Wero of via Mollie, en een bankoverschrijving kan ook.</div></details>
    </div>
  </div>
</section>

</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <img src="{LOGO}" alt="Toffe Traktaties" width="300" height="94">
        <p class="small">De tofste kant en klare traktaties, zelf ontworpen en met de hand ingepakt in
          Enschede.</p>
      </div>
      <div>
        <h4>Traktaties</h4>
        <ul>
          {"".join(f'<li><a href="{SHOP}/product-category/{s}/">{l}</a></li>' for s, l, _ in CATS[:5])}
          <li><a href="{SHOP}/shop/">Alle traktaties</a></li>
        </ul>
      </div>
      <div>
        <h4>Klantenservice</h4>
        <ul>
          <li><a href="{SHOP}/verzending-en-levering/">Verzending en levering</a></li>
          <li><a href="{SHOP}/retourneren/">Retourneren</a></li>
          <li><a href="{SHOP}/veelgestelde-vragen/">Veelgestelde vragen</a></li>
          <li><a href="{SHOP}/algemene-voorwaarden/">Algemene voorwaarden</a></li>
          <li><a href="{SHOP}/privacyverklaring/">Privacyverklaring</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:info@toffetraktaties.nl">info@toffetraktaties.nl</a></li>
          <li><a href="{SHOP}/contact/">Contactformulier</a></li>
          <li><a href="{SHOP}/over-ons/">Over ons</a></li>
          <li>Enschede, Nederland</li>
        </ul>
      </div>
    </div>
    <div class="foot-bot">
      <span>&copy; 2026 Toffe Traktaties</span>
      <span>Verzending met PostNL &middot; Betalen met iDEAL en Wero</span>
    </div>
  </div>
</footer>

<script>{SCRIPT}</script>
</body>
</html>
"""

os.makedirs('build2', exist_ok=True)
open('build2/index.html', 'w', encoding='utf-8').write(HTML)
n = len(HTML.encode('utf-8'))
print('built', n, 'bytes =', round(n / 1048576, 2), 'MB')
