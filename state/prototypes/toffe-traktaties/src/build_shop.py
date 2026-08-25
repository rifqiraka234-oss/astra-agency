#!/usr/bin/env python3
"""Toffe Traktaties, build 2: a webshop homepage, not a marketing page.

Hein Bilterijst, 2026-08-19: "wil ik dat niet als vervanging van onze webshop,
maar meer als versterking van onze webshop ... de gebruikersbehoefte eerst de
producten in plaats van eerst een merkverhaal."

So: real products, real prices, real stock, on screen immediately. The design
story survives as a reason to pick these treats, printed on the product card
and proved further down, instead of as a preamble that delays the shop.
"""
import json, os, math, random

IMGS = json.load(open('imgs.json'))
FONTCSS = open('fonts/inline.css').read()
CSS = open('shop.css').read()
OLD = json.load(open('../toffe/enc/assets.json'))
LOGO = OLD['logo']['uri'] if isinstance(OLD['logo'], dict) else OLD['logo']
STICKER = OLD['personal']['uri'] if isinstance(OLD['personal'], dict) else OLD['personal']

from shopdata import P, CATS

SHOP = "https://toffetraktaties.nl"
CONF = ["#7FBFFF", "#BF2F53", "#BF008F", "#BFA75F", "#1F7F7F", "#2F53BF", "#12AEE0", "#4AA485"]


def confetti(seed, n=34):
    r = random.Random(seed)
    out = []
    for _ in range(n):
        c = r.choice(CONF)
        x, y = r.uniform(0, 100), r.uniform(0, 100)
        w = r.uniform(5, 12)
        h = w * r.uniform(.32, .5)
        rot = r.uniform(0, 180)
        out.append(f'<i style="left:{x:.1f}%;top:{y:.1f}%;width:{w:.0f}px;height:{h:.0f}px;'
                   f'background:{c};transform:rotate({rot:.0f}deg)"></i>')
    return f'<div class="confetti" aria-hidden="true">{"".join(out)}</div>'


def card(p, eager=False):
    src = IMGS[p['f']]
    loading = '' if eager else ' loading="lazy"'
    sold = ('<div class="soldout"><span>Tijdelijk uitverkocht</span></div>'
            if not p['stock'] else '')
    return f"""<a class="card" href="{SHOP}/product/{p['s']}/">
  <div class="card-img"><img src="{src}" alt="{p['n']}" width="560" height="560"{loading}>{sold}</div>
  <div class="card-body">
    <h3>{p['n']}</h3>
    <div class="badges">
      <span class="bdg design">Zelf ontworpen label</span>
      <span class="bdg name">Naam &amp; leeftijd</span>
    </div>
    <div class="card-foot">
      <span class="price">&euro;&nbsp;{p['p']} <span>per stuk</span></span>
      <span class="btn sm">Bekijk</span>
    </div>
  </div>
</a>"""


def cat_counts():
    d = {}
    for p in P:
        d[p['cat']] = d.get(p['cat'], 0) + 1
    return d


CC = cat_counts()

peek = "".join(card(p, eager=True) for p in P[:4])
grid = "".join(card(p) for p in P[4:])
occ = "".join(
    f'<a href="{SHOP}/product-category/{slug}/"><b>{label}</b>'
    f'<span class="small muted">{desc}</span>'
    f'<span class="n">{CC.get(slug, 0)} traktaties</span></a>'
    for slug, label, desc in CATS)

navcats = "".join(
    f'<a href="{SHOP}/product-category/{s}/">{l}</a>' for s, l, _ in CATS[:6])

SCRIPT = """
(function(){
  function d2(n){return (n<10?'0':'')+n;}
  function fmt(d){
    var m=['januari','februari','maart','april','mei','juni','juli','augustus',
           'september','oktober','november','december'];
    return d.getDate()+' '+m[d.getMonth()];
  }
  function addWork(d,n){
    var x=new Date(d.getTime()),c=0;
    while(c<n){x.setDate(x.getDate()+1);var w=x.getDay();if(w!==0&&w!==6)c++;}
    return x;
  }
  // ---- treat date check, using the shop's own stated rules ----
  var dateIn=document.getElementById('tdate'),
      occIn=document.getElementById('tocc'),
      out=document.getElementById('verdict'),
      form=document.getElementById('finder');
  var today=new Date(); today.setHours(0,0,0,0);
  var min=new Date(today.getTime()); min.setDate(min.getDate()+1);
  if(dateIn){
    dateIn.min=min.getFullYear()+'-'+d2(min.getMonth()+1)+'-'+d2(min.getDate());
  }
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!dateIn.value){
        out.className='verdict tight on';
        out.innerHTML='Vul eerst de traktatiedatum in, dan rekenen we het voor je uit.';
        return;
      }
      var t=new Date(dateIn.value+'T00:00:00');
      var days=Math.round((t-today)/86400000);
      var ship=addWork(today,3);
      var cat=occIn.value;
      var link=cat?' <a href="https://toffetraktaties.nl/product-category/'+cat+'/" style="text-decoration:underline">Bekijk die traktaties</a>.':'';
      if(days>=12){
        out.className='verdict ok on';
        out.innerHTML='<b>Ruim op tijd.</b> We versturen je pakket rond '+fmt(addWork(t,-7))+
          ', ongeveer een week voor '+fmt(t)+'. Je kunt rustig kiezen.'+link;
      } else if(days>=6){
        out.className='verdict ok on';
        out.innerHTML='<b>Dat lukt.</b> Bestel je vandaag, dan gaat je pakket uiterlijk '+
          fmt(ship)+' op de post en is het ruim voor '+fmt(t)+' bij je.'+link;
      } else if(days>=3){
        out.className='verdict tight on';
        out.innerHTML='<b>Krap, maar vaak haalbaar.</b> We versturen binnen 3 werkdagen, dus '+
          'bestel vandaag nog. Twijfel je? App ons even op 06 21 25 66 61, dan kijken we mee.'+link;
      } else {
        out.className='verdict late on';
        out.innerHTML='<b>Dit is spoed.</b> Neem eerst even contact op via '+
          '<a href="https://wa.me/31621256661" style="text-decoration:underline">WhatsApp</a> of '+
          '<a href="mailto:info@toffetraktaties.nl" style="text-decoration:underline">mail</a>, '+
          'dan kijken we wat er nog kan.';
      }
    });
  }
  // ---- class size calculator ----
  var qty=document.getElementById('qty'), pick=document.getElementById('pick'),
      tot=document.getElementById('total'), bar=document.getElementById('bar'),
      note=document.getElementById('shipnote');
  function calc(){
    if(!qty||!pick) return;
    var n=Math.max(1,Math.min(200,parseInt(qty.value||'0',10)||0));
    var unit=parseFloat(pick.value);
    var t=n*unit;
    tot.textContent='\\u20ac\\u00a0'+t.toFixed(2).replace('.',',');
    var pct=Math.min(100,t/70*100);
    bar.style.width=pct+'%';
    if(t>=70){
      note.innerHTML='<b>Gratis verzending.</b> Je zit boven de \\u20ac\\u00a070, wij betalen de verzendkosten.';
    } else {
      var left=(70-t);
      note.innerHTML='Nog <b>\\u20ac\\u00a0'+left.toFixed(2).replace('.',',')+
        '</b> tot gratis verzending. Daaronder is verzenden \\u20ac\\u00a06,45 binnen Nederland.';
    }
  }
  if(qty){qty.addEventListener('input',calc);pick.addEventListener('change',calc);calc();}
})();
"""

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
    <span>Verzonden met <b>PostNL</b>, met Track &amp; Trace</span>
  </div>
</div>

<header class="hdr">
  <div class="hdr-in">
    <a class="brand" href="{SHOP}"><img src="{LOGO}" alt="Toffe Traktaties" width="300" height="94"></a>
    <nav class="hnav" aria-label="Categorieën">
      {navcats}
      <a href="{SHOP}/shop/">Alle traktaties</a>
    </nav>
    <a class="cart" href="{SHOP}/winkelwagen/">Winkelwagen</a>
  </div>
</header>

<main>

<!-- ============ SHOP ENTRY: a tool, not a story ============ -->
<section class="entry">
  {confetti(7)}
  <div class="wrap entry-in">
    <div>
      <h1>Kant-en-klare traktaties, met de naam erop.</h1>
      <p class="small muted" style="margin-top:10px;max-width:44ch">Kies een gelegenheid, of check eerst
        of het op tijd bij je is. Alles wordt hier ingepakt en verstuurd met PostNL.</p>

      <form class="finder" id="finder">
        <div class="finder-row">
          <div class="fld">
            <label for="tdate">Wanneer is de traktatie?</label>
            <input type="date" id="tdate" name="tdate">
          </div>
          <div class="fld">
            <label for="tocc">Voor welke gelegenheid?</label>
            <select id="tocc" name="tocc">
              <option value="">Maakt niet uit</option>
              {"".join(f'<option value="{s}">{l}</option>' for s, l, _ in CATS)}
            </select>
          </div>
          <button class="btn" type="submit">Check</button>
        </div>
        <div class="verdict" id="verdict" role="status" aria-live="polite"></div>
        <p class="xs muted" style="margin-top:12px">We versturen binnen 3 werkdagen als alles op
          voorraad is, en bij een traktatiedatum sturen we het pakket ongeveer een week van tevoren.</p>
      </form>
    </div>

    <div class="peek">
      {peek}
    </div>
  </div>
</section>

<!-- ============ OCCASIONS: the real mental model ============ -->
<section class="sec" style="padding-bottom:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2>Waar is het voor?</h2>
        <p class="small muted" style="margin-top:6px">De meeste mensen zoeken op gelegenheid, niet op product.</p>
      </div>
      <a class="btn ghost sm" href="{SHOP}/shop/">Alle 66 traktaties</a>
    </div>
    <div class="occ">{occ}</div>
  </div>
</section>

<!-- ============ THE SHOP ITSELF ============ -->
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2>Populaire traktaties</h2>
        <p class="small muted" style="margin-top:6px">Elk label is hier zelf getekend, dus je komt ze
          bij geen enkele andere traktatieshop tegen.</p>
      </div>
      <a class="btn ghost sm" href="{SHOP}/shop/">Bekijk het hele assortiment</a>
    </div>
    <div class="grid">{grid}</div>
    <div style="text-align:center;margin-top:clamp(22px,2.6vw,36px)">
      <a class="btn navy" href="{SHOP}/shop/">Bekijk alle 66 traktaties</a>
    </div>
  </div>
</section>

<!-- ============ CLASS SIZE CALCULATOR ============ -->
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="calc">
      <div>
        <h2>Even uitrekenen voor de hele klas.</h2>
        <p class="small" style="margin-top:12px;color:#AEB5D6;max-width:44ch">Een traktatie kost hier
          tussen de &euro;&nbsp;1,30 en &euro;&nbsp;3,50 per stuk. Vul in hoeveel kinderen er in de klas
          zitten, dan zie je meteen waar je uitkomt en of de verzending gratis is.</p>
        <p class="small" style="margin-top:14px;color:#AEB5D6">Boven de <b style="color:#fff">&euro;&nbsp;70</b>
          betalen wij de verzendkosten. Daaronder is het &euro;&nbsp;6,45 binnen Nederland,
          en &euro;&nbsp;9,95 naar België.</p>
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
            <span class="small" style="color:#AEB5D6">Totaal voor de klas</span>
            <span class="big tnum" id="total">&euro;&nbsp;49,00</span>
          </div>
          <div class="ship-bar"><i id="bar" style="width:70%"></i></div>
          <p class="ship-note" id="shipnote">Nog <b>&euro;&nbsp;21,00</b> tot gratis verzending.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ DELIVERY CERTAINTY ============ -->
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2>Op tijd, dat is het belangrijkste.</h2>
        <p class="small muted" style="margin-top:6px">Een verjaardag verzet je niet, dus zo werkt de planning hier.</p>
      </div>
    </div>
    <div class="deliv">
      <div>
        <div class="step">STAP 1</div>
        <h4>Geef de traktatiedatum door</h4>
        <p class="small muted">Vul bij het bestellen in het opmerkingenveld de datum in waarop getrakteerd
          wordt. Dan plannen we daarop.</p>
      </div>
      <div>
        <div class="step">STAP 2</div>
        <h4>Wij pakken het in</h4>
        <p class="small muted">Alles wordt hier met de hand ingepakt en voorzien van de naam en leeftijd.
          We versturen binnen 3 werkdagen als de artikelen op voorraad zijn.</p>
      </div>
      <div>
        <div class="step">STAP 3</div>
        <h4>Een week van tevoren op de post</h4>
        <p class="small muted">Bij een doorgegeven traktatiedatum sturen we het pakket ongeveer een week
          eerder, met PostNL en een Track &amp; Trace code. Woon je bij Enschede in de buurt, dan kun je
          het ook ophalen.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ THE DESIGN STORY, as reason-to-choose ============ -->
<section class="sec story">
  {confetti(21, 24)}
  <div class="wrap story-in">
    <div>
      <h2>Waarom deze traktaties er anders uitzien.</h2>
      <p style="margin-top:14px;color:var(--ink-2)">Hein is grafisch vormgever. Elk label, elke sticker en
        elke illustratie die je hierboven ziet is door hem getekend, en daarna door Lindsay met de hand
        in elkaar gezet. Dat is de reden dat je deze ontwerpen nergens anders tegenkomt.</p>
      <ul>
        <li><span class="tick">&check;</span><span><b>Elk ontwerp is van onszelf.</b> Geen ingekochte
          standaardlabels die tien andere shops ook verkopen.</span></li>
        <li><span class="tick">&check;</span><span><b>Naam en leeftijd horen erbij.</b> Op elk label,
          zonder meerprijs, niet als extra optie in de winkelwagen.</span></li>
        <li><span class="tick">&check;</span><span><b>Met de hand ingepakt.</b> Wij zijn Hein en Lindsay,
          ouders van Fien en Cas. Er zit geen magazijn tussen.</span></li>
      </ul>
      <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn" href="{SHOP}/shop/">Bekijk het assortiment</a>
        <a class="btn ghost" href="{SHOP}/over-ons/">Over Hein en Lindsay</a>
      </div>
    </div>
    <div class="sticker"><img src="{STICKER}" alt="Traktatie met een label waarop een naam en leeftijd staat" width="560" height="560" loading="lazy"></div>
  </div>
</section>

<!-- ============ REVIEW ============ -->
<section class="sec">
  <div class="wrap">
    <div class="review">
      <div class="stars" aria-label="5 van de 5 sterren">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p style="margin-top:12px;font-size:clamp(17px,1.7vw,21px);font-family:'Quicksand',sans-serif;font-weight:600">
        &ldquo;Super leuke traktaties, goede service! Hele fijne communicatie, echt top!&rdquo;</p>
      <p class="small muted" style="margin-top:10px">Marley van Hezik, via Google</p>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" style="justify-content:center;text-align:center">
      <h2 style="width:100%">Voordat je bestelt</h2>
    </div>
    <div class="faq">
      <details open><summary>Hoe snel wordt mijn bestelling verstuurd?</summary>
        <div class="a">We streven ernaar elke bestelling binnen 3 werkdagen te versturen, mits de
          artikelen op voorraad zijn. Zitten er handgemaakte artikelen bij, dan kan het langer duren.
          Geef je een traktatiedatum door, dan proberen we het pakket ongeveer een week voor die datum
          te versturen.</div></details>
      <details><summary>Wat kost de verzending?</summary>
        <div class="a">Binnen Nederland &euro;&nbsp;6,45. Bij bestellingen boven de &euro;&nbsp;70 betalen
          wij de verzendkosten. Naar België is het &euro;&nbsp;9,95, dat wordt automatisch aangepast
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

os.makedirs('build', exist_ok=True)
open('build/index.html', 'w', encoding='utf-8').write(HTML)
n = len(HTML.encode('utf-8'))
print('built', n, 'bytes =', round(n / 1048576, 2), 'MB')
