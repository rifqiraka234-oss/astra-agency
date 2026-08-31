#!/usr/bin/env python3
# Build Zenara prototype -> single self-contained index.html
import base64, json, pathlib
A=pathlib.Path("/home/user/astra-agency/state/prototypes/zenara/assets")
OUT=pathlib.Path("/home/user/astra-agency/state/prototypes/zenara/index.html")
def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
FAM={"news500":"Newsreader","fig400":"Figtree","fig500":"Figtree","fig600":"Figtree"}
def face(n,w,s="normal"):
    return (f"@font-face{{font-family:'{FAM[n]}';font-style:{s};font-weight:{w};font-display:swap;"
            f"src:url(data:font/woff2;base64,{b64(A/'fonts'/(n+'.woff2'))}) format('woff2')}}")
fonts="".join([face("news500","500"),face("fig400","400"),face("fig500","500"),face("fig600","600")])
def img(n): return "data:image/jpeg;base64,"+b64(A/f"web_{n}.jpg")
IMG={n:img(n) for n in ["uji","uji2","kagoshima","hojicha","nespresso","set","cups","whisk","bowl","ewhisk","oritsu","banner2","banner1"]}

# real catalogue (prices verified from zenaratea.com/products.json)
P=[
 dict(id="uji",cat="matcha",name="Ceremonial Matcha, Uji",origin="Uji, Japan",price=33.0,unit="30 g tin",img="uji",img2="uji2",sub=True,
      desc="Our house ceremonial grade, stone milled in Uji. Smooth, sweet, no bitterness, whisked or in a latte."),
 dict(id="kago",cat="matcha",name="Ceremonial Matcha, Kagoshima",origin="Kagoshima, Japan",price=36.0,unit="30 g tin",img="kagoshima",img2="kagoshima",sub=True,
      desc="Deeper and more full bodied than Uji, grown in the volcanic soils of Kagoshima."),
 dict(id="hojicha",cat="matcha",name="Hojicha Powder, Shizuoka",origin="Shizuoka, Japan",price=22.0,unit="40 g tin",img="hojicha",img2="hojicha",sub=True,
      desc="Roasted green tea, warm and toasty, naturally low in caffeine. The evening cup."),
 dict(id="oritsu",cat="everyday",name="Oritsu Matcha Sticks",origin="Ceremonial grade",price=11.5,unit="10 sticks",img="oritsu",img2="oritsu",sub=True,
      desc="Pre measured single serve sticks. The ritual, for the desk, the gym bag, the train."),
 dict(id="nespresso",cat="everyday",name="Matcha Nespresso Capsules",origin="Nespresso compatible",price=15.0,unit="10 capsules",img="nespresso",img2="nespresso",sub=True,
      desc="Ceremonial matcha in a capsule for your Nespresso machine. Zero whisking."),
 dict(id="set",cat="tools",name="Complete Matcha Set",origin="Everything to begin",price=55.0,unit="gift boxed",img="set",img2="set",sub=False,
      desc="Bowl, whisk, scoop and rest, boxed. The whole ritual in one gift."),
 dict(id="cups",cat="tools",name="Ceramic Matcha Cups",origin="Set of 2",price=48.0,unit="handmade",img="cups",img2="cups",sub=False,
      desc="Wood wrapped ceramic cups that hold the heat and sit beautifully on the table."),
 dict(id="bowl",cat="tools",name="Glass Matcha Bowl",origin="Chawan",price=28.0,unit="hammered glass",img="bowl",img2="bowl",sub=False,
      desc="A hammered glass chawan wide enough to whisk properly and watch the froth build."),
 dict(id="whisk",cat="tools",name="Bamboo Whisk",origin="Chasen",price=16.0,unit="100 prong",img="whisk",img2="whisk",sub=False,
      desc="A traditional hand cut bamboo chasen for a fine, even froth."),
 dict(id="ewhisk",cat="tools",name="Electric Matcha Whisk",origin="For the mornings you rush",price=16.0,unit="rechargeable",img="ewhisk",img2="ewhisk",sub=False,
      desc="When there is no time for the chasen, a smooth bowl in ten seconds."),
]
CATS={"matcha":"Ceremonial matcha","everyday":"Everyday","tools":"Tools & sets"}
def money(x): return ("€%.2f"%x).replace(".00","")
def card(i,p):
    badge='<span class="sub-badge">Subscribe &amp; save</span>' if p["sub"] else ''
    return f'''<article class="prod" data-cat="{p['cat']}" data-i="{i}">
      <button class="prod-media" aria-label="Quick view {p['name']}"><img src="{IMG[p['img']]}" alt="{p['name']}, {p['unit']}" loading="lazy" decoding="async">{badge}</button>
      <div class="prod-info">
        <span class="prod-origin">{p['origin']}</span>
        <h3>{p['name']}</h3>
        <div class="prod-row"><span class="price">{money(p['price'])}</span><span class="unit">{p['unit']}</span></div>
        <button class="add" data-i="{i}">Add to cart</button>
      </div>
    </article>'''
cards="\n".join(card(i,p) for i,p in enumerate(P))
PJSON=json.dumps([{**{k:p[k] for k in ("id","name","origin","price","unit","desc","cat","sub")},
                   "img":IMG[p["img"]],"img2":IMG[p["img2"]]} for p in P])

HTML=f'''<title>Zenara — premium ceremonial matcha, on a schedule</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Premium ceremonial matcha from Uji and Kagoshima, Japan. Subscribe and never run out of your ritual. Ships across the EU.">
<style>
{fonts}
:root{{
 --cream:#F4F1E6; --paper:#FBFAF3; --ink:#2A3022; --ink-soft:#5D6350; --mut:#8A8B77;
 --matcha:#6E8B4E; --matcha-d:#546C3C; --bright:#93B76C; --clay:#B4855A; --line:#E4DFCE;
 --serif:'Newsreader',Georgia,'Times New Roman',serif;
 --sans:'Figtree',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
 --sh:0 24px 60px -34px rgba(42,48,34,.5);
}}
*{{box-sizing:border-box}}
html{{overflow-x:clip;scroll-behavior:smooth}}
body{{margin:0;background:var(--cream);color:var(--ink);font-family:var(--sans);
 font-size:17px;line-height:1.62;-webkit-font-smoothing:antialiased;overflow-x:clip}}
h1,h2,h3{{font-family:var(--serif);font-weight:500;line-height:1.04;margin:0;letter-spacing:-.01em}}
p{{margin:0}} a{{color:inherit}} img{{display:block;max-width:100%}}
button{{font-family:inherit}}
.wrap{{width:min(1200px,92vw);margin-inline:auto}}
.kicker{{font-family:var(--sans);font-weight:600;font-size:.7rem;letter-spacing:.22em;
 text-transform:uppercase;color:var(--matcha-d)}}
.btn{{font-family:var(--sans);font-weight:600;font-size:.86rem;letter-spacing:.01em;border:none;
 cursor:pointer;border-radius:100px;padding:.82rem 1.4rem;display:inline-flex;align-items:center;
 gap:.5rem;text-decoration:none;transition:transform .25s,background .25s,color .25s}}
.btn-fill{{background:var(--ink);color:#F1EEDF}}
.btn-fill:hover{{background:var(--matcha-d);transform:translateY(-2px)}}
.btn-out{{background:transparent;color:var(--ink);border:1px solid var(--ink)}}
.btn-out:hover{{background:var(--ink);color:var(--cream)}}

/* nav */
header.nav{{position:sticky;top:0;z-index:50;background:rgba(244,241,230,.9);
 backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}}
.nav-in{{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.9rem 0}}
.logo{{display:flex;align-items:center;gap:.55rem;text-decoration:none;color:var(--ink)}}
.logo svg{{width:26px;height:26px}}
.logo span{{font-family:var(--serif);font-size:1.55rem;letter-spacing:.02em}}
.nav-links{{display:flex;gap:1.9rem;font-size:.85rem;font-weight:500}}
.nav-links a{{text-decoration:none;color:var(--ink-soft)}} .nav-links a:hover{{color:var(--ink)}}
.nav-right{{display:flex;align-items:center;gap:.8rem}}
.cartbtn{{position:relative;background:none;border:1px solid var(--line);border-radius:100px;
 padding:.55rem .9rem;cursor:pointer;font-size:.82rem;font-weight:600;display:flex;align-items:center;gap:.45rem}}
.cartbtn:hover{{border-color:var(--ink)}}
.cartbtn .count{{background:var(--matcha-d);color:#fff;border-radius:100px;min-width:20px;height:20px;
 display:grid;place-items:center;font-size:.68rem;padding:0 5px}}

/* hero */
.hero{{padding:clamp(2.5rem,6vw,5rem) 0 clamp(2rem,4vw,3.5rem)}}
.hero-grid{{display:grid;grid-template-columns:1.02fr .98fr;gap:clamp(1.5rem,4vw,3.5rem);align-items:center}}
.hero h1{{font-size:clamp(2.9rem,6.6vw,5.6rem);line-height:1;letter-spacing:-.02em}}
.hero h1 em{{font-style:italic;color:var(--matcha-d)}}
.hero p.sub{{font-size:1.16rem;color:var(--ink-soft);max-width:36ch;margin:1.4rem 0 1.9rem}}
.hero-cta{{display:flex;gap:.7rem;flex-wrap:wrap}}
.hero-trust{{display:flex;gap:1.4rem;flex-wrap:wrap;margin-top:2rem;font-size:.8rem;color:var(--ink-soft)}}
.hero-trust b{{color:var(--ink);font-weight:600;display:block;font-family:var(--serif);font-size:1.05rem}}
.hero-media{{position:relative;aspect-ratio:1/1;background:radial-gradient(circle at 50% 45%,#EDE8D5,#F4F1E6 70%);
 border-radius:14px;display:grid;place-items:center;overflow:hidden}}
.hero-media img{{width:82%;filter:drop-shadow(0 30px 40px rgba(42,48,34,.22))}}
.hero-media .float{{position:absolute;top:6%;right:6%;background:var(--paper);border:1px solid var(--line);
 border-radius:12px;padding:.7rem .9rem;box-shadow:var(--sh);font-size:.74rem;max-width:180px}}
.hero-media .float b{{display:block;font-family:var(--serif);font-size:1rem;color:var(--matcha-d)}}

/* subscribe module */
.subs{{background:var(--ink);color:#EDEBDD;border-radius:20px;overflow:hidden;
 display:grid;grid-template-columns:1fr 1fr;margin:clamp(1.5rem,3vw,2rem) 0}}
.subs-media{{background:linear-gradient(150deg,#3A4230,#2A3022);display:grid;place-items:center;padding:2rem;position:relative}}
.subs-media img{{width:74%;filter:drop-shadow(0 26px 34px rgba(0,0,0,.4))}}
.subs-media .ripple{{position:absolute;width:70%;aspect-ratio:1;border:1px solid rgba(147,183,108,.35);border-radius:50%}}
.subs-body{{padding:clamp(1.8rem,3.4vw,3rem)}}
.subs-body .kicker{{color:var(--bright)}}
.subs-body h2{{color:#fff;font-size:clamp(1.9rem,3.6vw,2.9rem);margin:.6rem 0 .4rem}}
.subs-body p.intro{{color:#C7CBB6;font-size:1rem;margin-bottom:1.4rem}}
.opt{{margin-bottom:1.1rem}}
.opt label{{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:#A9AE96;font-weight:600;display:block;margin-bottom:.5rem}}
.seg{{display:flex;gap:.4rem;flex-wrap:wrap}}
.seg button{{background:transparent;border:1px solid rgba(255,255,255,.22);color:#EDEBDD;
 padding:.5rem .85rem;border-radius:100px;font-size:.82rem;font-weight:500;cursor:pointer;transition:.2s}}
.seg button[aria-pressed="true"]{{background:var(--bright);color:#233018;border-color:var(--bright);font-weight:600}}
.subs-out{{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;
 padding:1.1rem 1.2rem;margin:1.3rem 0;display:flex;justify-content:space-between;align-items:center;gap:1rem}}
.subs-price .now{{font-family:var(--serif);font-size:2rem;color:#fff}}
.subs-price .was{{color:#9BA088;text-decoration:line-through;font-size:1rem;margin-left:.5rem}}
.subs-price .per{{font-size:.78rem;color:#A9AE96}}
.subs-lasts{{text-align:right;font-size:.78rem;color:#C7CBB6}}
.subs-lasts b{{display:block;font-family:var(--serif);font-size:1.3rem;color:var(--bright)}}
.subs-body .btn-fill{{background:var(--bright);color:#233018;width:100%;justify-content:center}}
.subs-body .btn-fill:hover{{background:#fff}}
.subs-fine{{font-size:.72rem;color:#8E927C;margin-top:.8rem;text-align:center}}

/* section frame */
section{{padding:clamp(3rem,6vw,5.5rem) 0}}
.sec-head{{max-width:54ch;margin-bottom:2.4rem}}
.sec-head h2{{font-size:clamp(2rem,4.2vw,3.2rem);margin-top:.6rem}}
.sec-head p{{color:var(--ink-soft);margin-top:.9rem;font-size:1.05rem}}

/* collection */
.filters{{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}}
.filters button{{background:transparent;border:1px solid var(--line);border-radius:100px;
 padding:.5rem 1.05rem;font-size:.82rem;font-weight:500;color:var(--ink-soft);cursor:pointer;transition:.2s}}
.filters button:hover{{border-color:var(--ink);color:var(--ink)}}
.filters button[aria-pressed="true"]{{background:var(--ink);color:var(--cream);border-color:var(--ink)}}
.pgrid{{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem}}
.prod{{background:var(--paper);border:1px solid var(--line);border-radius:14px;overflow:hidden;
 display:flex;flex-direction:column;transition:transform .3s,box-shadow .3s}}
.prod:hover{{transform:translateY(-5px);box-shadow:var(--sh)}}
.prod-media{{border:none;background:#fff;padding:0;cursor:pointer;position:relative;aspect-ratio:1/1;overflow:hidden}}
.prod-media img{{width:100%;height:100%;object-fit:cover;transition:transform .6s}}
.prod:hover .prod-media img{{transform:scale(1.05)}}
.sub-badge{{position:absolute;top:.7rem;left:.7rem;background:var(--matcha-d);color:#fff;
 font-size:.6rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:.28rem .55rem;border-radius:100px}}
.prod-info{{padding:1rem 1.1rem 1.2rem;display:flex;flex-direction:column;gap:.3rem;flex:1}}
.prod-origin{{font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--matcha-d);font-weight:600}}
.prod-info h3{{font-size:1.25rem;flex:0}}
.prod-row{{display:flex;align-items:baseline;gap:.5rem;margin-top:.15rem;flex:1}}
.price{{font-family:var(--serif);font-size:1.35rem}} .unit{{font-size:.76rem;color:var(--mut)}}
.add{{margin-top:.6rem;background:transparent;border:1px solid var(--ink);color:var(--ink);
 border-radius:100px;padding:.6rem;font-size:.82rem;font-weight:600;cursor:pointer;transition:.2s}}
.add:hover{{background:var(--ink);color:var(--cream)}}
.add.added{{background:var(--matcha-d);border-color:var(--matcha-d);color:#fff}}

/* ritual */
.ritual{{background:var(--paper)}}
.ritual-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:1.6rem;counter-reset:step}}
.rstep{{position:relative}}
.rstep .rn{{font-family:var(--serif);font-size:2.4rem;color:var(--bright);line-height:1}}
.rstep h3{{font-size:1.4rem;margin:.5rem 0 .3rem}}
.rstep p{{font-size:.92rem;color:var(--ink-soft)}}

/* origins */
.origins-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem}}
.origin{{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:1.8rem 1.6rem}}
.origin .dot{{width:12px;height:12px;border-radius:50%;background:var(--matcha);margin-bottom:1rem}}
.origin h3{{font-size:1.7rem}}
.origin .reg{{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--matcha-d);font-weight:600;margin-bottom:.6rem}}
.origin p{{font-size:.92rem;color:var(--ink-soft);margin-top:.6rem}}

/* pause / lifestyle */
.pause{{position:relative;border-radius:20px;overflow:hidden;min-height:420px;display:grid;align-items:center}}
.pause img{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}}
.pause .veil{{position:absolute;inset:0;background:linear-gradient(90deg,rgba(28,33,22,.82),rgba(28,33,22,.25))}}
.pause .pc{{position:relative;padding:clamp(2rem,5vw,4rem);max-width:36ch;color:#F1EEDF}}
.pause h2{{color:#fff;font-size:clamp(2rem,4vw,3rem)}}
.pause p{{margin:1rem 0 1.6rem;color:#D8DAC8}}
.pause .btn-fill{{background:var(--bright);color:#233018}}

/* footer */
footer{{background:var(--ink);color:#B9BDA6;padding:3.4rem 0 2.2rem}}
.foot-grid{{display:grid;grid-template-columns:2fr 1fr 1fr 1.4fr;gap:2rem}}
footer .logo span{{color:#fff}} footer .logo svg *{{stroke:#93B76C}}
footer h4{{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--bright);margin:0 0 1rem;font-weight:600}}
footer a{{display:block;color:#B9BDA6;text-decoration:none;margin-bottom:.5rem;font-size:.9rem}}
footer a:hover{{color:#fff}}
.foot-news{{display:flex;gap:.5rem;margin-top:.6rem}}
.foot-news input{{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);
 border-radius:100px;padding:.6rem .9rem;color:#fff;font-family:var(--sans);font-size:.85rem}}
.foot-news button{{background:var(--bright);color:#233018;border:none;border-radius:100px;padding:.6rem 1rem;font-weight:600;cursor:pointer}}
.foot-bar{{border-top:1px solid rgba(255,255,255,.12);margin-top:2.4rem;padding-top:1.4rem;
 display:flex;justify-content:space-between;flex-wrap:wrap;gap:.8rem;font-size:.76rem;color:#7E826D}}

/* cart drawer */
.scrim{{position:fixed;inset:0;background:rgba(28,33,22,.5);opacity:0;visibility:hidden;transition:.3s;z-index:60}}
.scrim.on{{opacity:1;visibility:visible}}
aside.cart{{position:fixed;top:0;right:0;height:100%;width:min(400px,90vw);background:var(--cream);
 z-index:70;transform:translateX(100%);transition:transform .35s cubic-bezier(.3,.7,.2,1);
 display:flex;flex-direction:column;box-shadow:-20px 0 60px -20px rgba(0,0,0,.4)}}
aside.cart.on{{transform:none}}
.cart-head{{display:flex;justify-content:space-between;align-items:center;padding:1.3rem 1.4rem;border-bottom:1px solid var(--line)}}
.cart-head h3{{font-size:1.5rem}}
.cart-head button{{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--ink)}}
.cart-items{{flex:1;overflow:auto;padding:1rem 1.4rem}}
.citem{{display:flex;gap:.9rem;padding:.8rem 0;border-bottom:1px solid var(--line);align-items:center}}
.citem img{{width:58px;height:58px;object-fit:cover;border-radius:8px;background:#fff;border:1px solid var(--line)}}
.citem .ci-b{{flex:1}} .citem h4{{font-family:var(--serif);font-size:1.05rem;font-weight:500}}
.citem .ci-meta{{font-size:.74rem;color:var(--ink-soft)}}
.citem .qty{{display:flex;align-items:center;gap:.4rem;margin-top:.3rem}}
.citem .qty button{{width:22px;height:22px;border:1px solid var(--line);background:var(--paper);border-radius:6px;cursor:pointer;line-height:1}}
.citem .ci-price{{font-family:var(--serif);font-size:1.05rem}}
.cart-empty{{color:var(--ink-soft);text-align:center;padding:3rem 1rem;font-size:.95rem}}
.cart-foot{{padding:1.3rem 1.4rem;border-top:1px solid var(--line)}}
.cart-sub{{display:flex;justify-content:space-between;font-family:var(--serif);font-size:1.3rem;margin-bottom:.4rem}}
.cart-foot .btn-fill{{width:100%;justify-content:center;margin-top:.7rem}}
.cart-note{{font-size:.72rem;color:var(--mut);text-align:center;margin-top:.7rem}}

/* quick view */
dialog#qv{{border:none;border-radius:16px;padding:0;max-width:min(880px,94vw);width:100%;background:var(--paper);color:var(--ink)}}
dialog#qv::backdrop{{background:rgba(28,33,22,.5)}}
.qv-grid{{display:grid;grid-template-columns:1fr 1fr}}
.qv-img{{aspect-ratio:1/1;background:#fff}} .qv-img img{{width:100%;height:100%;object-fit:cover}}
.qv-body{{padding:2rem;position:relative}}
.qv-close{{position:absolute;top:1rem;right:1rem;width:34px;height:34px;border-radius:50%;border:1px solid var(--line);background:var(--cream);cursor:pointer;font-size:1.1rem;color:var(--ink)}}
.qv-body .prod-origin{{margin-bottom:.3rem}}
.qv-body h3{{font-size:2rem}}
.qv-body .qv-price{{font-family:var(--serif);font-size:1.7rem;margin:.6rem 0}}
.qv-body p.qd{{color:var(--ink-soft);font-size:.95rem}}
.qv-sub{{display:flex;gap:.5rem;margin:1.2rem 0}}
.qv-sub button{{flex:1;border:1px solid var(--line);background:var(--cream);border-radius:10px;padding:.7rem;cursor:pointer;font-size:.82rem;text-align:left}}
.qv-sub button[aria-pressed="true"]{{border-color:var(--matcha-d);background:#EEF1E4}}
.qv-sub b{{display:block;font-weight:600}} .qv-sub span{{font-size:.72rem;color:var(--ink-soft)}}
.qv-body .btn-fill{{width:100%;justify-content:center}}

/* reveal */
.reveal{{opacity:0;transform:translateY(20px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}}
.reveal.in{{opacity:1;transform:none}}

@media(max-width:960px){{
 .hero-grid{{grid-template-columns:1fr;gap:2.4rem}} .hero-media{{max-width:420px}}
 .subs{{grid-template-columns:1fr}} .subs-media{{min-height:280px}}
 .pgrid{{grid-template-columns:repeat(2,1fr)}}
 .ritual-grid{{grid-template-columns:1fr 1fr}} .origins-grid{{grid-template-columns:1fr}}
 .foot-grid{{grid-template-columns:1fr 1fr}} .qv-grid{{grid-template-columns:1fr}}
}}
@media(max-width:600px){{
 body{{font-size:16px}} .nav-links{{display:none}}
 .pgrid{{grid-template-columns:1fr 1fr;gap:.9rem}} .ritual-grid{{grid-template-columns:1fr}}
 .foot-grid{{grid-template-columns:1fr}} .hero-cta .btn{{flex:1;justify-content:center}}
 .subs-out{{flex-direction:column;align-items:flex-start}} .subs-lasts{{text-align:left}}
}}
@media(prefers-reduced-motion:reduce){{*{{animation:none!important;transition:none!important;scroll-behavior:auto!important}} .reveal{{opacity:1;transform:none}}}}
html:not(.js) .reveal{{opacity:1;transform:none}}
</style>

<header class="nav">
 <div class="wrap nav-in">
   <a href="#top" class="logo"><svg viewBox="0 0 32 32" fill="none" stroke="#546C3C" stroke-width="1.6"><path d="M6 12c4 3 16 3 20 0M8 12c0 6 3.6 10 8 10s8-4 8-10"/><path d="M16 22v4"/></svg><span>zenara</span></a>
   <nav class="nav-links" aria-label="Primary"><a href="#subscribe">Subscribe</a><a href="#shop">Shop</a><a href="#ritual">The ritual</a><a href="#origins">Origins</a></nav>
   <div class="nav-right">
     <a href="#subscribe" class="btn btn-fill" style="padding:.6rem 1.1rem">Start your ritual</a>
     <button class="cartbtn" id="cartToggle" aria-label="Open cart">Cart <span class="count" id="cc">0</span></button>
   </div>
 </div>
</header>

<main id="top">
<section class="hero">
 <div class="wrap hero-grid">
  <div class="reveal">
   <span class="kicker">Premium ceremonial matcha · Uji &amp; Kagoshima</span>
   <h1 style="margin-top:1rem">Never run out of your <em>ritual</em>.</h1>
   <p class="sub">Stone milled ceremonial matcha from Japan, delivered on your schedule. The bowl you look forward to, always in the cupboard.</p>
   <div class="hero-cta">
     <a href="#subscribe" class="btn btn-fill">Start your ritual</a>
     <a href="#shop" class="btn btn-out">Shop the collection</a>
   </div>
   <div class="hero-trust">
     <div><b>Ceremonial</b>grade, first harvest</div>
     <div><b>Uji · Kagoshima</b>single origin Japan</div>
     <div><b>EU wide</b>shipping, carbon neutral</div>
   </div>
  </div>
  <div class="hero-media reveal">
    <img src="{IMG['uji2']}" alt="An open tin of Zenara ceremonial matcha with bright green powder, beside the lid">
    <div class="float"><b>Subscribe &amp; save 10%</b>Delivered before you run out. Pause anytime.</div>
  </div>
 </div>
</section>

<div class="wrap"><section id="subscribe" style="padding-top:0">
 <div class="subs reveal">
  <div class="subs-media"><span class="ripple"></span><img src="{IMG['uji']}" alt="Zenara ceremonial matcha tin" id="subImg"></div>
  <div class="subs-body">
    <span class="kicker">Your daily bowl, handled</span>
    <h2>Set your ritual once. We keep the tin full.</h2>
    <p class="intro">Matcha runs out about once a month. Tell us your blend and how often you whisk, and a fresh tin arrives before the last one is empty.</p>
    <div class="opt"><label>Choose your matcha</label><div class="seg" id="segBlend">
      <button data-blend="uji" aria-pressed="true">Uji · smooth</button>
      <button data-blend="kago" aria-pressed="false">Kagoshima · bold</button>
      <button data-blend="hojicha" aria-pressed="false">Hojicha · roasted</button>
    </div></div>
    <div class="opt"><label>Size</label><div class="seg" id="segSize">
      <button data-size="30" aria-pressed="true">30 g tin</button>
      <button data-size="50" aria-pressed="false">50 g bag</button>
    </div></div>
    <div class="opt"><label>Deliver every</label><div class="seg" id="segFreq">
      <button data-freq="4" aria-pressed="true">4 weeks</button>
      <button data-freq="6" aria-pressed="false">6 weeks</button>
      <button data-freq="8" aria-pressed="false">8 weeks</button>
    </div></div>
    <div class="subs-out">
      <div class="subs-price"><span class="now" id="subNow">€29.70</span><span class="was" id="subWas">€33</span><div class="per" id="subPer">per tin · every 4 weeks</div></div>
      <div class="subs-lasts"><b id="subBowls">~15 bowls</b>about 2 weeks of daily matcha</div>
    </div>
    <button class="btn btn-fill" id="subAdd">Start my ritual · save 10%</button>
    <p class="subs-fine">Skip, pause or cancel anytime. First tin ships within 2 working days.</p>
  </div>
 </div>
</section></div>

<section id="shop">
 <div class="wrap">
  <div class="sec-head reveal"><span class="kicker">The collection</span><h2>Everything for the bowl.</h2><p>Single origin matcha and hojicha, plus the tools that make the ritual. Real prices, ships across the EU.</p></div>
  <div class="filters reveal" role="group" aria-label="Filter products">
    <button data-f="all" aria-pressed="true">All</button>
    <button data-f="matcha" aria-pressed="false">Ceremonial matcha</button>
    <button data-f="everyday" aria-pressed="false">Everyday</button>
    <button data-f="tools" aria-pressed="false">Tools &amp; sets</button>
  </div>
  <div class="pgrid" id="pgrid">{cards}</div>
 </div>
</section>

<section id="ritual" class="ritual">
 <div class="wrap">
  <div class="sec-head reveal"><span class="kicker">The ritual</span><h2>Four quiet minutes.</h2><p>Ceremonial matcha asks almost nothing of you, and gives back a proper pause. Here is the whole thing.</p></div>
  <div class="ritual-grid reveal">
    <div class="rstep"><div class="rn">01</div><h3>Sift &amp; scoop</h3><p>Two scoops of matcha through a fine sieve into a warm bowl, no clumps.</p></div>
    <div class="rstep"><div class="rn">02</div><h3>Pour</h3><p>A little water just off the boil, about 70 to 80 degrees, never fully boiling.</p></div>
    <div class="rstep"><div class="rn">03</div><h3>Whisk</h3><p>Quick W strokes with the chasen until a fine, even froth builds on top.</p></div>
    <div class="rstep"><div class="rn">04</div><h3>Pause</h3><p>Top with water or oat milk, and take the four minutes that are yours.</p></div>
  </div>
 </div>
</section>

<section id="origins">
 <div class="wrap">
  <div class="sec-head reveal"><span class="kicker">Single origin</span><h2>From three of Japan's great tea regions.</h2></div>
  <div class="origins-grid reveal">
    <div class="origin"><div class="dot"></div><div class="reg">Uji, Kyoto</div><h3>The smooth one</h3><p>The historic heart of Japanese matcha. Shaded leaves stone milled into a sweet, mellow ceremonial grade with no bitterness.</p></div>
    <div class="origin"><div class="dot" style="background:var(--matcha-d)"></div><div class="reg">Kagoshima</div><h3>The bold one</h3><p>Grown in southern volcanic soil for a deeper, fuller bodied cup with more umami and colour.</p></div>
    <div class="origin"><div class="dot" style="background:var(--clay)"></div><div class="reg">Shizuoka</div><h3>The roasted one</h3><p>Our hojicha. Green tea roasted until warm and toasty, naturally low in caffeine, made for the evening.</p></div>
  </div>
 </div>
</section>

<div class="wrap"><section style="padding-top:0">
 <div class="pause reveal">
  <img src="{IMG['banner2']}" alt="Two people laughing over bowls of Zenara matcha in a kitchen">
  <div class="veil"></div>
  <div class="pc">
   <span class="kicker" style="color:var(--bright)">More than a beverage</span>
   <h2 style="margin-top:.6rem">A mindful pause, in a world that never stops.</h2>
   <p>Our teas are a moment to nourish your well being. Set the ritual on a schedule and it is always there when you need it.</p>
   <a href="#subscribe" class="btn btn-fill">Start your ritual</a>
  </div>
 </div>
</section></div>

</main>

<footer>
 <div class="wrap">
  <div class="foot-grid">
   <div>
     <a href="#top" class="logo"><svg viewBox="0 0 32 32" fill="none" stroke="#93B76C" stroke-width="1.6"><path d="M6 12c4 3 16 3 20 0M8 12c0 6 3.6 10 8 10s8-4 8-10"/><path d="M16 22v4"/></svg><span>zenara</span></a>
     <p style="margin-top:1rem;max-width:34ch;font-size:.9rem">Premium ceremonial matcha and tea from Japan. A mindful pause, delivered across the EU.</p>
   </div>
   <div><h4>Shop</h4><a href="#shop">Ceremonial matcha</a><a href="#shop">Hojicha</a><a href="#shop">Everyday</a><a href="#shop">Tools &amp; sets</a></div>
   <div><h4>Ritual</h4><a href="#subscribe">Subscribe</a><a href="#ritual">How to make matcha</a><a href="#origins">Origins</a></div>
   <div><h4>Never run out</h4><p style="font-size:.86rem">Join the ritual for a fresh tin on your schedule and 10% off every delivery.</p>
     <form class="foot-news" id="news"><input type="email" placeholder="your@email.com" aria-label="Email"><button type="submit">Join</button></form>
     <p id="newsOk" style="display:none;color:var(--bright);font-size:.8rem;margin-top:.5rem">Welcome to the ritual.</p>
   </div>
  </div>
  <div class="foot-bar"><span>© Zenara · Ceremonial matcha &amp; tea · The Netherlands</span><span>Ships across the EU · Subscribe, skip or cancel anytime</span></div>
 </div>
</footer>

<div class="scrim" id="scrim"></div>
<aside class="cart" id="cart" aria-label="Shopping cart" aria-hidden="true">
 <div class="cart-head"><h3>Your ritual</h3><button id="cartClose" aria-label="Close cart">✕</button></div>
 <div class="cart-items" id="cartItems"></div>
 <div class="cart-foot">
   <div class="cart-sub"><span>Subtotal</span><span id="cartSub">€0</span></div>
   <p class="cart-note" id="freeShip">Free EU shipping from €40</p>
   <button class="btn btn-fill">Checkout</button>
   <p class="cart-note">Prototype cart, no payment is taken.</p>
 </div>
</aside>

<dialog id="qv">
 <div class="qv-grid">
   <div class="qv-img"><img id="qvImg" src="" alt=""></div>
   <div class="qv-body">
     <button class="qv-close" aria-label="Close" onclick="document.getElementById('qv').close()">✕</button>
     <span class="prod-origin" id="qvOrigin"></span>
     <h3 id="qvName"></h3>
     <div class="qv-price" id="qvPrice"></div>
     <p class="qd" id="qvDesc"></p>
     <div class="qv-sub" id="qvSub">
       <button data-mode="once" aria-pressed="true"><b>One time</b><span id="qvOnce"></span></button>
       <button data-mode="sub" aria-pressed="false"><b>Subscribe &amp; save 10%</b><span id="qvSubP"></span></button>
     </div>
     <button class="btn btn-fill" id="qvAdd">Add to cart</button>
   </div>
 </div>
</dialog>

<script>
document.documentElement.classList.add('js');
var P={PJSON};
var fmt=function(x){{var s=(Math.round(x*100)/100).toFixed(2);return '€'+s.replace(/\\.00$/,'')}};

/* ---------- cart ---------- */
var cart=[]; // {{id,name,img,price,unit,qty,mode}}
var cartEl=document.getElementById('cart'),scrim=document.getElementById('scrim');
function openCart(){{cartEl.classList.add('on');scrim.classList.add('on');cartEl.setAttribute('aria-hidden','false')}}
function closeCart(){{cartEl.classList.remove('on');scrim.classList.remove('on');cartEl.setAttribute('aria-hidden','true')}}
document.getElementById('cartToggle').onclick=openCart;
document.getElementById('cartClose').onclick=closeCart;
scrim.onclick=closeCart;
function addToCart(o){{
  var k=o.id+'|'+o.mode;
  var ex=cart.find(function(c){{return c.key===k}});
  if(ex) ex.qty++; else cart.push({{key:k,id:o.id,name:o.name,img:o.img,price:o.price,unit:o.unit,qty:1,mode:o.mode}});
  renderCart(); openCart();
}}
function renderCart(){{
  var n=cart.reduce(function(a,c){{return a+c.qty}},0);
  document.getElementById('cc').textContent=n;
  var sub=cart.reduce(function(a,c){{return a+c.price*c.qty}},0);
  document.getElementById('cartSub').textContent=fmt(sub);
  var fs=document.getElementById('freeShip');
  fs.textContent = sub>=40? 'You have unlocked free EU shipping.' : 'Free EU shipping from €40 · '+fmt(40-sub)+' to go';
  var box=document.getElementById('cartItems');
  if(!cart.length){{box.innerHTML='<div class="cart-empty">Your ritual is empty.<br>Add a tin to begin.</div>';return}}
  box.innerHTML=cart.map(function(c,i){{
    return '<div class="citem"><img src="'+c.img+'" alt=""><div class="ci-b"><h4>'+c.name+'</h4>'+
     '<div class="ci-meta">'+(c.mode==='sub'?'Subscription · ':'')+c.unit+'</div>'+
     '<div class="qty"><button aria-label="less" data-d="-1" data-k="'+c.key+'">−</button><span>'+c.qty+'</span>'+
     '<button aria-label="more" data-d="1" data-k="'+c.key+'">+</button></div></div>'+
     '<div class="ci-price">'+fmt(c.price*c.qty)+'</div></div>';
  }}).join('');
  box.querySelectorAll('button[data-k]').forEach(function(b){{
    b.onclick=function(){{var c=cart.find(function(x){{return x.key===b.dataset.k}});if(!c)return;
      c.qty+=(+b.dataset.d); if(c.qty<1) cart=cart.filter(function(x){{return x!==c}}); renderCart();}};
  }});
}}
renderCart();

/* add buttons on grid */
document.querySelectorAll('.add').forEach(function(b){{
  b.onclick=function(e){{e.stopPropagation();var p=P[+b.dataset.i];
    addToCart({{id:p.id,name:p.name,img:p.img,price:p.price,unit:p.unit,mode:'once'}});
    b.classList.add('added');b.textContent='Added ✓';setTimeout(function(){{b.classList.remove('added');b.textContent='Add to cart'}},1400);}};
}});

/* ---------- collection filter ---------- */
var fb=document.querySelectorAll('.filters button');
fb.forEach(function(b){{b.onclick=function(){{
  fb.forEach(function(x){{x.setAttribute('aria-pressed','false')}});b.setAttribute('aria-pressed','true');
  var f=b.dataset.f;
  document.querySelectorAll('.prod').forEach(function(p){{p.style.display=(f==='all'||p.dataset.cat===f)?'':'none'}});
}};}});

/* ---------- quick view ---------- */
var qv=document.getElementById('qv'),qvMode='once',qvP=null;
function paintQv(){{
  var once=qvP.price, sub=qvP.price*0.9;
  document.getElementById('qvOnce').textContent=fmt(once);
  document.getElementById('qvSubP').textContent=fmt(sub)+' / delivery';
  document.getElementById('qvPrice').textContent = qvMode==='sub'? fmt(sub)+' · subscription' : fmt(once);
  document.querySelectorAll('#qvSub button').forEach(function(x){{x.setAttribute('aria-pressed', x.dataset.mode===qvMode?'true':'false')}});
  var sb=document.querySelector('#qvSub button[data-mode="sub"]'); sb.style.display=qvP.sub?'':'none';
}}
function openQv(i){{
  qvP=P[i];qvMode='once';
  document.getElementById('qvImg').src=qvP.img2||qvP.img;document.getElementById('qvImg').alt=qvP.name;
  document.getElementById('qvOrigin').textContent=qvP.origin;
  document.getElementById('qvName').textContent=qvP.name;
  document.getElementById('qvDesc').textContent=qvP.desc;
  paintQv();
  if(qv.showModal) qv.showModal(); else qv.setAttribute('open','');
}}
document.querySelectorAll('.prod-media').forEach(function(m){{
  m.onclick=function(){{openQv(+m.closest('.prod').dataset.i)}};
}});
document.querySelectorAll('#qvSub button').forEach(function(b){{b.onclick=function(){{qvMode=b.dataset.mode;paintQv()}}}});
document.getElementById('qvAdd').onclick=function(){{
  addToCart({{id:qvP.id,name:qvP.name,img:qvP.img,price:qvMode==='sub'?qvP.price*0.9:qvP.price,unit:qvP.unit,mode:qvMode}});
  qv.close();
}};
qv.addEventListener('click',function(e){{var r=qv.querySelector('.qv-grid').getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) qv.close();}});

/* ---------- subscribe module ---------- */
var blend='uji',size='30',freq='4';
var BASE={{uji:{{'30':33,'50':40}},kago:{{'30':36,'50':44}},hojicha:{{'30':22,'50':22}}}};
var IMGS={{uji:'{IMG['uji']}',kago:'{IMG['kagoshima']}',hojicha:'{IMG['hojicha']}'}};
var NAME={{uji:'Ceremonial Matcha, Uji',kago:'Ceremonial Matcha, Kagoshima',hojicha:'Hojicha Powder, Shizuoka'}};
function seg(id,attr,cb){{document.querySelectorAll('#'+id+' button').forEach(function(b){{
  b.onclick=function(){{document.querySelectorAll('#'+id+' button').forEach(function(x){{x.setAttribute('aria-pressed','false')}});
    b.setAttribute('aria-pressed','true');cb(b.dataset[attr]);paintSub();}};}});}}
function paintSub(){{
  if(blend==='hojicha'){{ // hojicha only 40g tin -> force 30 label handled generically
  }}
  var base=(BASE[blend]&&BASE[blend][size])||BASE[blend]['30'];
  var now=base*0.9;
  document.getElementById('subNow').textContent=fmt(now);
  document.getElementById('subWas').textContent=fmt(base);
  document.getElementById('subPer').textContent='per '+(size==='50'?'50 g':'30 g')+' · every '+freq+' weeks';
  // bowls: ceremonial serving ~2g
  var grams=(size==='50'?50:(blend==='hojicha'?40:30));
  var bowls=Math.round(grams/2);
  document.getElementById('subBowls').textContent='~'+bowls+' bowls';
  document.getElementById('subImg').src=IMGS[blend];
  document.querySelector('.subs-lasts').lastChild.textContent='about '+Math.round(bowls/7)+' weeks of daily matcha';
}}
seg('segBlend','blend',function(v){{blend=v}});
seg('segSize','size',function(v){{size=v}});
seg('segFreq','freq',function(v){{freq=v}});
paintSub();
document.getElementById('subAdd').onclick=function(){{
  var base=(BASE[blend]&&BASE[blend][size])||BASE[blend]['30'];
  addToCart({{id:'sub-'+blend+'-'+size,name:NAME[blend]+' · subscription',img:IMGS[blend],price:base*0.9,unit:(size==='50'?'50 g':'30 g')+' every '+freq+'w',mode:'sub'}});
}};

/* newsletter */
document.getElementById('news').addEventListener('submit',function(e){{e.preventDefault();
  document.getElementById('news').style.display='none';document.getElementById('newsOk').style.display='block';}});

/* reveal */
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){{
  var io=new IntersectionObserver(function(es){{es.forEach(function(en){{if(en.isIntersecting){{en.target.classList.add('in');io.unobserve(en.target)}}}})}},{{threshold:.1}});
  document.querySelectorAll('.reveal').forEach(function(el){{io.observe(el)}});
}} else document.querySelectorAll('.reveal').forEach(function(el){{el.classList.add('in')}});
setTimeout(function(){{document.querySelectorAll('.reveal:not(.in)').forEach(function(el){{el.classList.add('in')}})}},1800);
</script>'''
OUT.write_text(HTML,encoding="utf-8")
print("WROTE",OUT,OUT.stat().st_size,"bytes")
