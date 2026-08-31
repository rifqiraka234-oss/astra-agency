#!/usr/bin/env python3
# Build the Di Lieto Patisserie prototype -> single self-contained index.html
import base64, os, pathlib
A = pathlib.Path("/home/user/astra-agency/state/prototypes/di-lieto/assets")
OUT = pathlib.Path("/home/user/astra-agency/state/prototypes/di-lieto/index.html")

def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()

def font(name, weight, style="normal"):
    data = b64(A/"fonts"/f"{name}.woff2")
    return (f"@font-face{{font-family:'{FAM[name]}';font-style:{style};font-weight:{weight};"
            f"font-display:swap;src:url(data:font/woff2;base64,{data}) format('woff2')}}")

FAM = {
 "cormorant600":"Cormorant Garamond","cormorantItalic500":"Cormorant Garamond",
 "hanken400":"Hanken Grotesk","hanken500":"Hanken Grotesk","hanken600":"Hanken Grotesk",
 "plexmono500":"IBM Plex Mono",
}
fonts_css = "".join([
 font("cormorant600","600"),
 font("cormorantItalic500","500","italic"),
 font("hanken400","400"),
 font("hanken500","500"),
 font("hanken600","600"),
 font("plexmono500","500"),
])

def img(name):
    return "data:image/jpeg;base64,"+b64(A/f"web_{name}.jpg")

IMG = {n:img(n) for n in ["choc","mango","pineapple","cherry","volauvent","redtart",
        "petitfours","trio","buffet","afternoon","teastand","mauro","bakeoff","maritozzo","table"]}

# ---- menu data (real photos; descriptive of the pictured work, no invented specs) ----
MENU = [
 ("plated","choc","Dark chocolate & hazelnut","Chocolate crémeux, toasted hazelnut, a hand pulled gold tuile, quenelle of ice cream.", "portrait"),
 ("plated","redtart","Red berry & pistachio tart","Fanned glazed berries over a pistachio cream, on the pass in seconds.", "portrait"),
 ("plated","pineapple","Roast pineapple & coconut","Warm spiced pineapple, coconut, a light crumble, coconut sorbet.", "square"),
 ("plated","mango","Mango & vanilla dome","Mirror glazed mango dome, vanilla, gold rim service.", "square"),
 ("plated","cherry","Cherry & pistachio","Poached cherries, pistachio ice cream, dark chocolate plaque.", "square"),
 ("plated","volauvent","Mango mille feuille","Caramelised puff, mango, salted caramel thread.", "square"),
 ("petit","petitfours","Petit four selection","A run of glazed one bite pastries, finished to order.", "wide"),
 ("petit","trio","Signature trio","Rose dome, mango dome, choux, plated as a set.", "square"),
 ("buffet","buffet","Buffet & canapé display","Tiered verrines and miniatures built for volume service.", "wide"),
 ("afternoon","afternoon","Afternoon tea board","Pastel petit fours and tartlets, laid for a full tea service.", "wide"),
 ("afternoon","teastand","Afternoon tea stand","Macarons, choux and tartlets across a tiered stand.", "portrait"),
 ("plated","maritozzo","Raspberry maritozzo","Cream filled bun, fresh raspberry, a festive service piece.", "square"),
]
RANGES = {"petit":"Petit four","buffet":"Buffet selection","afternoon":"Afternoon tea","plated":"Plated dessert"}

def card(i, item):
    rng,imgk,title,desc,crop = item
    return f'''<article class="dish" data-range="{rng}" tabindex="0" role="button" aria-label="Open {title}" data-i="{i}">
      <div class="dish-img {crop}"><img src="{IMG[imgk]}" alt="{desc}" loading="lazy" decoding="async"></div>
      <div class="dish-body">
        <span class="rangetag">{RANGES[rng]}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span class="dish-open">View plate<i></i></span>
      </div>
    </article>'''

cards = "\n".join(card(i,it) for i,it in enumerate(MENU))

# detail dialog content (data island for JS)
import json
detail = [{"t":t,"d":d,"r":RANGES[rng],"img":IMG[imgk]} for rng,imgk,t,d,_ in MENU]
DETAIL_JSON = json.dumps(detail)

HTML = f'''<title>Di Lieto Patisserie — plate ready patisserie for professional kitchens</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Award winning, plate ready patisserie crafted in Surrey by Bake Off: The Professionals winner Mauro Di Lieto. Delivered frozen, plated in minutes.">
<style>
{fonts_css}
:root{{
 --porcelain:#FBFAF7; --cloud:#F3EFE8; --ink:#241820; --ink-soft:#5A4A52;
 --gold:#A17C3A; --gold-soft:#C6A661; --berry:#8E2C3B; --line:#E4DCD1;
 --shadow:0 22px 60px -30px rgba(36,24,32,.45);
 --serif:'Cormorant Garamond',Georgia,'Times New Roman',serif;
 --sans:'Hanken Grotesk',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
 --mono:'IBM Plex Mono',ui-monospace,Menlo,Consolas,monospace;
}}
*{{box-sizing:border-box}}
html{{overflow-x:clip;scroll-behavior:smooth}}
body{{margin:0;background:var(--porcelain);color:var(--ink);font-family:var(--sans);
 font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:clip}}
h1,h2,h3{{font-family:var(--serif);font-weight:600;line-height:1.02;letter-spacing:.005em;margin:0}}
p{{margin:0}}
a{{color:inherit}}
img{{display:block;max-width:100%}}
.wrap{{width:min(1200px,92vw);margin-inline:auto}}
.eyebrow{{font-family:var(--sans);font-weight:600;font-size:.72rem;letter-spacing:.24em;
 text-transform:uppercase;color:var(--gold)}}
.docket{{font-family:var(--mono);font-size:.68rem;letter-spacing:.02em;text-transform:uppercase}}

/* ---- nav ---- */
header.nav{{position:sticky;top:0;z-index:40;background:rgba(251,250,247,.86);
 backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}}
.nav-in{{display:flex;align-items:center;justify-content:space-between;gap:1rem;
 padding:.85rem 0}}
.brand{{font-family:var(--serif);font-size:1.5rem;font-weight:600;letter-spacing:.01em;
 line-height:1;display:flex;flex-direction:column}}
.brand small{{font-family:var(--mono);font-size:.52rem;letter-spacing:.34em;text-transform:uppercase;
 color:var(--ink-soft);margin-top:4px;font-weight:500}}
.nav-links{{display:flex;gap:2rem;align-items:center;font-size:.82rem;font-weight:500;letter-spacing:.02em}}
.nav-links a{{text-decoration:none;color:var(--ink-soft);transition:color .2s}}
.nav-links a:hover{{color:var(--ink)}}
.btn{{font-family:var(--sans);font-weight:600;font-size:.82rem;letter-spacing:.02em;
 border:none;cursor:pointer;border-radius:2px;padding:.72rem 1.25rem;text-decoration:none;
 display:inline-flex;align-items:center;gap:.5rem;transition:transform .25s ease,background .25s,color .25s}}
.btn-gold{{background:var(--ink);color:#F6EFDF}}
.btn-gold:hover{{background:var(--berry);transform:translateY(-2px)}}
.btn-ghost{{background:transparent;color:var(--ink);border:1px solid var(--ink)}}
.btn-ghost:hover{{background:var(--ink);color:var(--porcelain)}}
.nav .btn{{padding:.6rem 1rem}}
.burger{{display:none}}

/* ---- hero ---- */
.hero{{position:relative;padding:clamp(3rem,7vw,6rem) 0 clamp(2.5rem,5vw,4rem)}}
.hero-grid{{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(1.5rem,4vw,4rem);align-items:center}}
.hero h1{{font-size:clamp(3rem,7.2vw,6.2rem);letter-spacing:-.01em}}
.hero h1 em{{font-style:italic;font-weight:500;color:var(--berry)}}
.hero-lede{{font-size:1.2rem;color:var(--ink-soft);max-width:34ch;margin:1.5rem 0 2rem}}
.hero-cta{{display:flex;gap:.8rem;flex-wrap:wrap;align-items:center}}
.award{{display:inline-flex;align-items:center;gap:.6rem;margin-top:2.2rem;
 font-size:.8rem;color:var(--ink-soft)}}
.award b{{color:var(--ink);font-weight:600}}
.seal{{width:44px;height:44px;flex:none}}
.hero-plates{{position:relative;aspect-ratio:1/1}}
.hero-plates .p{{position:absolute;border-radius:50%;overflow:hidden;box-shadow:var(--shadow)}}
.hero-plates .p img{{width:100%;height:100%;object-fit:cover}}
.hero-plates .p1{{inset:0 14% 22% 0;z-index:2}}
.hero-plates .p2{{width:46%;aspect-ratio:1;right:0;bottom:0;z-index:3;border:6px solid var(--porcelain)}}
.hero-plates .ring{{position:absolute;inset:-4% 10% 16% -4%;border:1px solid var(--gold-soft);
 border-radius:50%;opacity:.5}}

/* ---- proof band ---- */
.proof{{border-top:1px solid var(--line);border-bottom:1px solid var(--line);
 background:var(--cloud)}}
.proof-in{{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line)}}
.stat{{background:var(--cloud);padding:1.6rem 1.2rem;text-align:center}}
.stat .n{{font-family:var(--serif);font-size:2.6rem;line-height:1;color:var(--ink)}}
.stat .l{{font-size:.74rem;color:var(--ink-soft);margin-top:.4rem;letter-spacing:.02em}}

/* ---- section frame ---- */
section{{padding:clamp(3.5rem,7vw,6rem) 0}}
.sec-head{{max-width:52ch;margin-bottom:2.6rem}}
.sec-head h2{{font-size:clamp(2.1rem,4.4vw,3.4rem);margin-top:.7rem}}
.sec-head p{{color:var(--ink-soft);margin-top:1rem;font-size:1.08rem}}

/* ---- menu ---- */
.menu-bar{{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem;align-items:center}}
.filter{{font-family:var(--sans);font-weight:500;font-size:.82rem;letter-spacing:.02em;
 background:transparent;border:1px solid var(--line);color:var(--ink-soft);
 padding:.55rem 1.05rem;border-radius:100px;cursor:pointer;transition:.2s}}
.filter:hover{{border-color:var(--ink);color:var(--ink)}}
.filter[aria-pressed="true"]{{background:var(--ink);color:var(--porcelain);border-color:var(--ink)}}
.dietary{{margin-left:auto;font-size:.78rem;color:var(--ink-soft);display:flex;align-items:center;gap:.5rem}}
.dietary b{{color:var(--ink);font-weight:600}}
.grid{{display:grid;grid-template-columns:repeat(12,1fr);gap:1.4rem}}
.dish{{grid-column:span 4;background:#fff;border:1px solid var(--line);border-radius:4px;
 overflow:hidden;cursor:pointer;display:flex;flex-direction:column;
 transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s;outline:none}}
.dish:hover,.dish:focus-visible{{transform:translateY(-5px);box-shadow:var(--shadow)}}
.dish:focus-visible{{box-shadow:0 0 0 2px var(--gold),var(--shadow)}}
.dish.wide{{grid-column:span 8}}
.dish-img{{overflow:hidden;background:var(--cloud)}}
.dish-img img{{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}}
.dish:hover .dish-img img{{transform:scale(1.04)}}
.dish-img.square{{aspect-ratio:1/1}}
.dish-img.portrait{{aspect-ratio:4/5}}
.dish-img.wide{{aspect-ratio:16/10}}
.dish-body{{padding:1.15rem 1.25rem 1.35rem;display:flex;flex-direction:column;gap:.35rem;flex:1}}
.rangetag{{font-family:var(--mono);font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}}
.dish-body h3{{font-size:1.5rem}}
.dish-body p{{font-size:.92rem;color:var(--ink-soft);flex:1}}
.dish-open{{font-size:.74rem;font-weight:600;letter-spacing:.02em;color:var(--ink);
 display:inline-flex;align-items:center;gap:.4rem;margin-top:.3rem}}
.dish-open i{{width:14px;height:1px;background:var(--ink);position:relative;transition:width .25s}}
.dish-open i:after{{content:"";position:absolute;right:0;top:-3px;width:6px;height:6px;
 border-top:1px solid var(--ink);border-right:1px solid var(--ink);transform:rotate(45deg)}}
.dish:hover .dish-open i{{width:26px}}
.menu-note{{margin-top:1.8rem;font-size:.86rem;color:var(--ink-soft);
 border-left:2px solid var(--gold-soft);padding-left:1rem;max-width:64ch}}

/* ---- how it works ---- */
.how{{background:var(--ink);color:#EFE7DA}}
.how .eyebrow{{color:var(--gold-soft)}}
.how h2{{color:#fff}}
.how .sec-head p{{color:#C9BCAE}}
.steps{{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.12);
 border:1px solid rgba(255,255,255,.12);border-radius:4px;overflow:hidden}}
.step{{background:var(--ink);padding:1.8rem 1.4rem}}
.step .num{{font-family:var(--mono);font-size:.7rem;color:var(--gold-soft);letter-spacing:.1em}}
.step h3{{color:#fff;font-size:1.7rem;margin:.7rem 0 .5rem}}
.step p{{color:#C9BCAE;font-size:.92rem}}

/* ---- founder ---- */
.founder{{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(1.5rem,4vw,3.5rem);align-items:center}}
.founder-media{{position:relative}}
.founder-media .main{{border-radius:4px;overflow:hidden;box-shadow:var(--shadow);aspect-ratio:4/5}}
.founder-media .main img{{width:100%;height:100%;object-fit:cover;object-position:50% 30%}}
.founder-media .win{{position:absolute;width:52%;right:-6%;bottom:-9%;border:6px solid var(--porcelain);
 border-radius:4px;overflow:hidden;box-shadow:var(--shadow)}}
.founder-media .win img{{width:100%;display:block}}
.founder-media figcaption{{font-family:var(--mono);font-size:.6rem;color:var(--ink-soft);
 text-transform:uppercase;letter-spacing:.08em;margin-top:.6rem}}
.founder h2{{font-size:clamp(2rem,4vw,3rem)}}
.founder blockquote{{font-family:var(--serif);font-style:italic;font-size:1.55rem;line-height:1.3;
 margin:1.4rem 0;color:var(--ink)}}
.founder .cred{{display:flex;gap:1.6rem;flex-wrap:wrap;margin-top:1.4rem;
 border-top:1px solid var(--line);padding-top:1.3rem}}
.cred .c b{{display:block;font-family:var(--serif);font-size:1.5rem}}
.cred .c span{{font-size:.78rem;color:var(--ink-soft)}}

/* ---- margins / value ---- */
.value-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem}}
.vcard{{background:#fff;border:1px solid var(--line);border-radius:4px;padding:1.8rem 1.6rem}}
.vcard .vi{{width:34px;height:34px;color:var(--gold);margin-bottom:1rem}}
.vcard h3{{font-size:1.55rem;margin-bottom:.5rem}}
.vcard p{{font-size:.94rem;color:var(--ink-soft)}}

/* ---- taster / contact ---- */
.taster{{background:var(--cloud)}}
.taster-grid{{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,4rem);align-items:center}}
.taster h2{{font-size:clamp(2.2rem,4.6vw,3.6rem)}}
.taster .lead{{color:var(--ink-soft);margin:1.1rem 0 1.6rem;font-size:1.1rem;max-width:40ch}}
.offer{{display:inline-flex;align-items:center;gap:.6rem;background:var(--berry);color:#fff;
 font-size:.74rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
 padding:.5rem .9rem;border-radius:100px;font-family:var(--sans)}}
form{{background:#fff;border:1px solid var(--line);border-radius:6px;padding:1.8rem}}
.field{{margin-bottom:1.05rem}}
label{{display:block;font-size:.74rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;
 color:var(--ink-soft);margin-bottom:.4rem}}
input,select,textarea{{width:100%;font-family:var(--sans);font-size:.95rem;color:var(--ink);
 background:var(--porcelain);border:1px solid var(--line);border-radius:3px;padding:.7rem .8rem}}
input:focus,select:focus,textarea:focus{{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(161,124,58,.15)}}
.field.err input,.field.err select{{border-color:var(--berry)}}
.err-msg{{display:none;color:var(--berry);font-size:.74rem;margin-top:.35rem}}
.field.err .err-msg{{display:block}}
.two{{display:grid;grid-template-columns:1fr 1fr;gap:1rem}}
.form-note{{font-size:.72rem;color:var(--ink-soft);margin-top:.4rem}}
.form-ok{{display:none;text-align:center;padding:1rem}}
.form-ok.on{{display:block}}
.form-ok .tick{{width:54px;height:54px;margin:0 auto 1rem;border-radius:50%;background:var(--gold);
 color:#fff;display:grid;place-items:center}}
form.done .form-body{{display:none}}

/* ---- footer ---- */
footer{{background:var(--ink);color:#C9BCAE;padding:3.5rem 0 2.5rem}}
.foot-grid{{display:grid;grid-template-columns:2fr 1fr 1fr;gap:2rem}}
footer .brand{{color:#fff}}
footer h4{{font-family:var(--mono);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;
 color:var(--gold-soft);margin:0 0 1rem;font-weight:500}}
footer a{{color:#C9BCAE;text-decoration:none;display:block;margin-bottom:.5rem;font-size:.9rem}}
footer a:hover{{color:#fff}}
.foot-bar{{border-top:1px solid rgba(255,255,255,.12);margin-top:2.5rem;padding-top:1.5rem;
 display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.76rem;color:#8C8078}}

/* ---- dialog ---- */
dialog#plate{{border:none;border-radius:6px;padding:0;max-width:min(920px,94vw);width:100%;
 background:var(--porcelain);box-shadow:0 40px 120px -40px rgba(0,0,0,.6);color:var(--ink)}}
dialog#plate::backdrop{{background:rgba(36,24,32,.55);backdrop-filter:blur(3px)}}
.pl-grid{{display:grid;grid-template-columns:1fr 1fr}}
.pl-img{{aspect-ratio:1/1;background:var(--cloud)}}
.pl-img img{{width:100%;height:100%;object-fit:cover}}
.pl-body{{padding:2rem 2rem 2.2rem;position:relative}}
.pl-close{{position:absolute;top:1rem;right:1rem;width:34px;height:34px;border-radius:50%;
 border:1px solid var(--line);background:#fff;cursor:pointer;font-size:1.1rem;line-height:1;color:var(--ink)}}
.pl-body .rangetag{{color:var(--gold)}}
.pl-body h3{{font-size:2.1rem;margin:.4rem 0 .8rem}}
.pl-body p.desc{{color:var(--ink-soft)}}
.spec{{margin-top:1.4rem;border:1px solid var(--line);border-radius:4px;overflow:hidden;
 font-family:var(--mono);font-size:.72rem}}
.spec div{{display:flex;justify-content:space-between;gap:1rem;padding:.6rem .9rem;
 border-bottom:1px solid var(--line);text-transform:uppercase;letter-spacing:.03em}}
.spec div:last-child{{border-bottom:none}}
.spec span:first-child{{color:var(--ink-soft)}}
.spec span:last-child{{color:var(--ink);text-align:right}}
.pl-body .btn{{margin-top:1.4rem;width:100%;justify-content:center}}

/* ---- reveal ---- */
.reveal{{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}}
.reveal.in{{opacity:1;transform:none}}

/* ---- responsive ---- */
@media(max-width:900px){{
 .hero-grid{{grid-template-columns:1fr;gap:2.5rem}}
 .hero-plates{{max-width:440px}}
 .founder{{grid-template-columns:1fr;gap:3.5rem}}
 .founder-media .win{{width:44%;right:0}}
 .taster-grid{{grid-template-columns:1fr}}
 .value-grid{{grid-template-columns:1fr}}
 .steps{{grid-template-columns:1fr 1fr}}
 .proof-in{{grid-template-columns:1fr 1fr}}
 .foot-grid{{grid-template-columns:1fr 1fr}}
 .pl-grid{{grid-template-columns:1fr}}
 .dish.wide{{grid-column:span 12}}
 .dish{{grid-column:span 6}}
}}
@media(max-width:640px){{
 body{{font-size:16px}}
 .nav-links{{display:none}}
 .nav-in>a.btn-gold{{display:none}}
 .burger{{display:inline-flex}}
 .dish{{grid-column:span 12}}
 .steps{{grid-template-columns:1fr}}
 .foot-grid{{grid-template-columns:1fr}}
 .two{{grid-template-columns:1fr}}
 .dietary{{display:none}}
 .hero-cta .btn{{flex:1;justify-content:center}}
}}
@media(prefers-reduced-motion:reduce){{
 *{{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
 .reveal{{opacity:1;transform:none}}
}}
/* no-JS: everything visible */
html:not(.js) .reveal{{opacity:1;transform:none}}
html:not(.js) .dish{{grid-column:span 6}}
@media(max-width:640px){{html:not(.js) .dish{{grid-column:span 12}}}}
</style>

<header class="nav">
 <div class="wrap nav-in">
   <a href="#top" class="brand" style="text-decoration:none">Di Lieto<small>Patisserie · Surrey</small></a>
   <nav class="nav-links" aria-label="Primary">
     <a href="#menu">The menu</a>
     <a href="#how">How it works</a>
     <a href="#studio">The studio</a>
     <a href="#taster">Taster box</a>
   </nav>
   <a href="#taster" class="btn btn-gold">Request a taster box</a>
   <button class="btn btn-ghost burger" aria-label="Jump to taster box" onclick="document.getElementById('taster').scrollIntoView()">Taster box</button>
 </div>
</header>

<main id="top">

<section class="hero">
 <div class="wrap hero-grid">
  <div class="reveal">
    <span class="eyebrow">Wholesale patisserie · crafted in Surrey</span>
    <h1>The pastry section you don't have to <em>staff</em>.</h1>
    <p class="hero-lede">Award winning, plate ready desserts from a Bake Off Professionals winner. Delivered frozen, plated in minutes, held to a Michelin standard.</p>
    <div class="hero-cta">
      <a href="#taster" class="btn btn-gold">Request your free taster box</a>
      <a href="#menu" class="btn btn-ghost">See the menu</a>
    </div>
    <div class="award">
      <svg class="seal" viewBox="0 0 44 44" fill="none" aria-hidden="true"><circle cx="22" cy="19" r="12" stroke="#A17C3A" stroke-width="1.4"/><path d="M22 12l1.9 3.9 4.3.6-3.1 3 .7 4.2L22 25.7l-3.8 2 .7-4.2-3.1-3 4.3-.6z" fill="#A17C3A"/><path d="M16 30l-2 10 8-4 8 4-2-10" stroke="#A17C3A" stroke-width="1.4" fill="none"/></svg>
      <span><b>Winner, Bake Off: The Professionals 2023.</b><br>Fifteen years across 5 star hotels and Michelin starred kitchens.</span>
    </div>
  </div>
  <div class="hero-plates reveal" aria-hidden="false">
    <span class="ring"></span>
    <figure class="p p1"><img src="{IMG['choc']}" alt="Dark chocolate crémeux with a hand pulled gold tuile and a quenelle of ice cream"></figure>
    <figure class="p p2"><img src="{IMG['mango']}" alt="Mirror glazed mango and vanilla dome on a gold rimmed plate"></figure>
  </div>
 </div>
</section>

<div class="proof">
 <div class="wrap"><div class="proof-in">
   <div class="stat"><div class="n">4</div><div class="l">Seasonal ranges, one supplier</div></div>
   <div class="stat"><div class="n">15<span style="font-family:var(--serif);font-size:1.4rem">yrs</span></div><div class="l">5 star &amp; Michelin trained</div></div>
   <div class="stat"><div class="n">0</div><div class="l">Pastry chefs to hire</div></div>
   <div class="stat"><div class="n">PB·GF·NF</div><div class="l">Options across every range</div></div>
 </div></div>
</div>

<section id="menu">
 <div class="wrap">
  <div class="sec-head reveal">
    <span class="eyebrow">What we offer</span>
    <h2>A menu you can actually read, and order from.</h2>
    <p>A curated range of premium patisserie, updated each season and delivered frozen, plate ready. Choose a range, open any plate to see how it serves.</p>
  </div>
  <div class="menu-bar reveal" role="group" aria-label="Filter by range">
    <button class="filter" data-f="all" aria-pressed="true">All ranges</button>
    <button class="filter" data-f="plated" aria-pressed="false">Plated dessert</button>
    <button class="filter" data-f="petit" aria-pressed="false">Petit four</button>
    <button class="filter" data-f="afternoon" aria-pressed="false">Afternoon tea</button>
    <button class="filter" data-f="buffet" aria-pressed="false">Buffet selection</button>
    <span class="dietary">Plant based, gluten free &amp; nut free <b>available across every range</b></span>
  </div>
  <div class="grid" id="dishgrid">
   {cards}
  </div>
  <p class="menu-note">The plates shown are recent work across the four ranges. Your taster box comes with the current season's full menu, allergen sheet and pricing set to your covers and margins, we build the list around your service, not the other way round.</p>
 </div>
</section>

<section id="how" class="how">
 <div class="wrap">
  <div class="sec-head reveal">
    <span class="eyebrow">Simple to order</span>
    <h2>From our studio to your pass, in four steps.</h2>
    <p>No pastry section, no early starts, no waste. Just a dessert menu that lands ready.</p>
  </div>
  <div class="steps reveal">
    <div class="step"><div class="num">STEP 01</div><h3>Taster box</h3><p>Tell us your kind of venue. We send a free box of the range that fits, with the season's menu.</p></div>
    <div class="step"><div class="num">STEP 02</div><h3>Set your list</h3><p>We shape the selection and pricing around your covers, your style and your margins.</p></div>
    <div class="step"><div class="num">STEP 03</div><h3>Delivered frozen</h3><p>Plate ready patisserie arrives on your schedule, stored until service, zero prep loss.</p></div>
    <div class="step"><div class="num">STEP 04</div><h3>Plate in minutes</h3><p>Finish and serve to a Michelin standard, no pastry chef on the rota.</p></div>
  </div>
 </div>
</section>

<section id="studio">
 <div class="wrap founder">
  <figure class="founder-media reveal" style="margin:0">
    <div class="main"><img src="{IMG['mauro']}" alt="Mauro Di Lieto, founder and executive pastry chef, in chef whites"></div>
    <div class="win"><img src="{IMG['bakeoff']}" alt="Mauro Di Lieto and team lifting the Bake Off: The Professionals trophy"></div>
    <figcaption>Mauro Di Lieto · founder &amp; executive pastry chef</figcaption>
  </figure>
  <div class="reveal">
    <span class="eyebrow">Who we are</span>
    <h2>Founded by a chef who has plated for the best rooms in the country.</h2>
    <blockquote>"Fifteen years across 5 star hotels and Michelin starred restaurants taught me what exceptional looks like. Di Lieto puts it within reach of any kitchen."</blockquote>
    <p style="color:var(--ink-soft)">Mauro Di Lieto is an award winning executive pastry chef, trained under some of the greatest names in European pastry. Every plate that leaves the studio carries that pass.</p>
    <div class="cred">
      <div class="c"><b>2023</b><span>Bake Off: The Professionals, Winner</span></div>
      <div class="c"><b>15 yrs</b><span>5 star &amp; Michelin kitchens, Italy &amp; UK</span></div>
      <div class="c"><b>Surrey</b><span>Crafted here, delivered to your kitchen</span></div>
    </div>
  </div>
 </div>
</section>

<section id="value" style="background:var(--cloud)">
 <div class="wrap">
  <div class="sec-head reveal">
   <span class="eyebrow">Why kitchens work with us</span>
   <h2>Exceptional desserts on every menu, without the complexity or the cost.</h2>
  </div>
  <div class="value-grid">
   <div class="vcard reveal"><svg class="vi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg><h3>No in house pastry team</h3><p>Skip the hire, the section and the early prep. Access a Michelin standard dessert offer as a supplier line, not a payroll line.</p></div>
   <div class="vcard reveal"><svg class="vi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M5 5l14 14M19 5L5 19"/><circle cx="12" cy="12" r="9"/></svg><h3>Protected margins</h3><p>Frozen and plate ready means no waste, no over prep and a predictable cost per cover. Pricing is set to your menu, not a fixed list.</p></div>
   <div class="vcard reveal"><svg class="vi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="19" cy="17" r="2"/></svg><h3>Genuinely invested</h3><p>We are simple to order from and invested in the success of every kitchen we work with, from a two line bistro to a full afternoon tea service.</p></div>
  </div>
 </div>
</section>

<section id="taster" class="taster">
 <div class="wrap taster-grid">
  <div class="reveal">
   <span class="offer">New client offer · free taster box</span>
   <h2 style="margin-top:1.2rem">Get a taste of luxury patisserie.</h2>
   <p class="lead">Tell us about your kitchen and we will send a free taster box of the range that fits, with this season's full menu, allergens and pricing.</p>
   <p style="color:var(--ink-soft);font-size:.92rem">Not sure where to start? Drop us a message and we are happy to talk through what works for your menu and your margins.</p>
   <figure style="margin:1.8rem 0 0;border-radius:4px;overflow:hidden;box-shadow:var(--shadow)"><img src="{IMG['afternoon']}" alt="Afternoon tea board of pastel petit fours with a tea and champagne service"></figure>
  </div>
  <form id="tasterForm" novalidate>
   <div class="form-body">
    <div class="two">
      <div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name"><div class="err-msg">Please add your name</div></div>
      <div class="field"><label for="venue">Venue / business</label><input id="venue" name="venue"><div class="err-msg">Please add your venue</div></div>
    </div>
    <div class="two">
      <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email"><div class="err-msg">Add a valid email</div></div>
      <div class="field"><label for="type">Kind of venue</label>
        <select id="type" name="type"><option value="">Select…</option><option>Restaurant</option><option>Hotel / afternoon tea</option><option>Gastropub / bistro</option><option>Events &amp; catering</option><option>Café / deli</option><option>Other</option></select>
        <div class="err-msg">Pick one</div></div>
    </div>
    <div class="field"><label for="range">Range you are most curious about</label>
      <select id="range" name="range"><option value="">No preference, surprise me</option><option>Plated dessert</option><option>Petit four</option><option>Afternoon tea</option><option>Buffet selection</option></select></div>
    <div class="field"><label for="msg">Anything about your menu or margins? (optional)</label><textarea id="msg" name="msg" rows="2"></textarea></div>
    <button type="submit" class="btn btn-gold" style="width:100%;justify-content:center">Send my taster box request</button>
    <p class="form-note">Prototype form, no data is sent. Dietary requirements (plant based, gluten free, nut free) can be noted on your season sheet.</p>
   </div>
   <div class="form-ok" role="status" aria-live="polite">
     <div class="tick"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 13l4 4L19 7"/></svg></div>
     <h3 style="font-family:var(--serif);font-size:1.7rem">Request received</h3>
     <p style="color:var(--ink-soft);margin-top:.5rem">We will be in touch within one working day to arrange your free taster box and this season's menu.</p>
   </div>
  </form>
 </div>
</section>
</main>

<footer>
 <div class="wrap">
  <div class="foot-grid">
   <div>
     <div class="brand">Di Lieto<small style="color:var(--gold-soft)">Patisserie · Surrey</small></div>
     <p style="margin-top:1rem;max-width:38ch;font-size:.9rem">Award winning, plate ready patisserie crafted in Surrey and delivered to professional kitchens across the region.</p>
   </div>
   <div>
     <h4>The menu</h4>
     <a href="#menu">Plated dessert</a><a href="#menu">Petit four</a><a href="#menu">Afternoon tea</a><a href="#menu">Buffet selection</a>
   </div>
   <div>
     <h4>Studio</h4>
     <a href="#how">How it works</a><a href="#studio">Who we are</a><a href="#taster">Free taster box</a>
   </div>
  </div>
  <div class="foot-bar">
   <span>© Di Lieto Patisserie · Woking, Surrey, United Kingdom</span>
   <span class="docket">Plate ready · frozen · seasonal · PB / GF / NF available</span>
  </div>
 </div>
</footer>

<dialog id="plate">
 <div class="pl-grid">
   <div class="pl-img"><img id="pl-img" src="" alt=""></div>
   <div class="pl-body">
     <button class="pl-close" aria-label="Close" onclick="document.getElementById('plate').close()">✕</button>
     <span class="rangetag" id="pl-range"></span>
     <h3 id="pl-title"></h3>
     <p class="desc" id="pl-desc"></p>
     <div class="spec">
       <div><span>Service</span><span>Frozen, plate ready · finish in minutes</span></div>
       <div><span>Season</span><span>Menu refreshed each season</span></div>
       <div><span>Dietary</span><span>PB / GF / NF versions on request</span></div>
       <div><span>Pricing</span><span>Set to your covers &amp; margins</span></div>
       <div><span>Lead time &amp; allergens</span><span>On your taster box sheet</span></div>
     </div>
     <a href="#taster" class="btn btn-gold" onclick="document.getElementById('plate').close()">Add to my taster box</a>
   </div>
 </div>
</dialog>

<script>
document.documentElement.classList.add('js');
var DETAIL={DETAIL_JSON};

// menu filter
var filters=document.querySelectorAll('.filter');
var dishes=document.querySelectorAll('.dish');
filters.forEach(function(b){{
  b.addEventListener('click',function(){{
    filters.forEach(function(x){{x.setAttribute('aria-pressed','false')}});
    b.setAttribute('aria-pressed','true');
    var f=b.dataset.f;
    dishes.forEach(function(d){{
      var show=(f==='all'||d.dataset.range===f);
      d.style.display=show?'':'none';
    }});
  }});
}});

// plate dialog
var dlg=document.getElementById('plate');
function openPlate(i){{
  var d=DETAIL[i];
  document.getElementById('pl-img').src=d.img;
  document.getElementById('pl-img').alt=d.d;
  document.getElementById('pl-range').textContent=d.r;
  document.getElementById('pl-title').textContent=d.t;
  document.getElementById('pl-desc').textContent=d.d;
  if(typeof dlg.showModal==='function') dlg.showModal(); else dlg.setAttribute('open','');
}}
dishes.forEach(function(d){{
  d.addEventListener('click',function(){{openPlate(+d.dataset.i)}});
  d.addEventListener('keydown',function(e){{if(e.key==='Enter'||e.key===' '){{e.preventDefault();openPlate(+d.dataset.i)}}}});
}});
dlg&&dlg.addEventListener('click',function(e){{ // click backdrop closes
  var r=dlg.querySelector('.pl-grid').getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dlg.close();
}});

// form
var form=document.getElementById('tasterForm');
form.addEventListener('submit',function(e){{
  e.preventDefault();
  var ok=true;
  [['name',function(v){{return v.trim().length>0}}],
   ['venue',function(v){{return v.trim().length>0}}],
   ['email',function(v){{return /.+@.+\\..+/.test(v)}}],
   ['type',function(v){{return v!==''}}]].forEach(function(p){{
     var el=document.getElementById(p[0]); var f=el.closest('.field');
     if(!p[1](el.value)){{f.classList.add('err');ok=false}} else f.classList.remove('err');
   }});
  if(!ok) return;
  form.classList.add('done');
  form.querySelector('.form-ok').classList.add('on');
  form.querySelector('.form-ok').scrollIntoView({{behavior:'smooth',block:'center'}});
}});
form.querySelectorAll('input,select').forEach(function(el){{
  el.addEventListener('input',function(){{el.closest('.field')&&el.closest('.field').classList.remove('err')}});
}});

// reveal on scroll
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){{
  var io=new IntersectionObserver(function(es){{
    es.forEach(function(en){{if(en.isIntersecting){{en.target.classList.add('in');io.unobserve(en.target)}}}});
  }},{{threshold:.12}});
  document.querySelectorAll('.reveal').forEach(function(el){{io.observe(el)}});
}} else {{ document.querySelectorAll('.reveal').forEach(function(el){{el.classList.add('in')}}); }}
// safety net: never leave content hidden even if the observer never fires
setTimeout(function(){{document.querySelectorAll('.reveal:not(.in)').forEach(function(el){{el.classList.add('in')}})}},1800);
</script>'''

OUT.write_text(HTML, encoding="utf-8")
print("WROTE", OUT, OUT.stat().st_size, "bytes")
