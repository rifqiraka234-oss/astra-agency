#!/usr/bin/env python3
import base64, pathlib, re, json
A = pathlib.Path("/home/user/astra-agency/state/prototypes/revios/assets")
OUT = pathlib.Path("/home/user/astra-agency/state/prototypes/revios/index.html")
def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def font(f): return "data:font/woff2;base64," + b64(A/"fonts"/f)
def img(n):
    ext = "png" if n.endswith("png") else "jpeg"
    return f"data:image/{ext};base64," + b64(A/n)

FONTS = "".join(f"@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:swap;src:url({font(f)}) format('woff2')}}"
  for fam,w,f in [("Jakarta",600,"pj600.woff2"),("Jakarta",700,"pj700.woff2"),("Jakarta",800,"pj800.woff2"),
                  ("Inter",400,"in400.woff2"),("Inter",500,"in500.woff2"),("Inter",600,"in600.woff2")])
LOGO = img("logo.png")

# real trending reviews (title, username, category, product image or None, product name)
REVIEWS = [
 ("Ceramide gel honest review","damicoco","Skincare","p_ceramide.jpg","Facefacts Ceramide Gel Cream"),
 ("Sonic electric toothbrush from TEMU","jedidiah","Tech","p_toothbrush.jpg","Sonic Electric Toothbrush"),
 ("Pears baby oil review","jacy-mic123","Baby","p_pears.jpg","Pears Mild and Gentle Baby Oil"),
 ("Estelin rosehip niacinamide serum isn't for me","hazelkim22","Skincare",None,"Estelin Rosehip Serum"),
 ("Redmi A5, great phone for the price","woungliem","Tech",None,"Redmi A5"),
 ("DJI Osmo Mobile 7P gimbal review","gloria","Tech",None,"DJI Osmo Mobile 7P"),
 ("My honest review on Secret Armor body mist","rich_love234","Beauty",None,"Secret Armor Body Mist"),
 ("Sivoderm cream review for acne prone skin","hazelkim22","Skincare",None,"Sivoderm Cream"),
]
CATCOL = {"Skincare":"#66A5AD","Tech":"#5B8DEF","Baby":"#E29578","Beauty":"#C084C7"}
def review_json():
    out=[]
    for t,u,c,im,pn in REVIEWS:
        out.append({"title":t,"user":u,"cat":c,"img":(img(im) if im else None),
                    "pn":pn,"col":CATCOL.get(c,"#66A5AD"),"mono":u[0].upper()})
    return json.dumps(out)
REVIEWS_JSON = review_json()

def cards_html():
    out=[]
    for t,u,c,im,pn in REVIEWS:
        col=CATCOL.get(c,"#66A5AD"); mono=u[0].upper()
        if im:
            thumb=f'<div class="thumb"><img src="{img(im)}" alt="{pn}" loading="lazy"><span class="catt">{c}</span><span class="pl"></span></div>'
        else:
            thumb=f'<div class="thumb gen" style="--gc:{col}"><span>{pn}</span><span class="catt">{c}</span><span class="pl"></span></div>'
        out.append(f'<article class="card" data-cat="{c}">{thumb}<div class="meta"><h4>{t}</h4><div class="who"><i style="background:{col}">{mono}</i><span>@{u}</span></div></div></article>')
    return "".join(out)
CARDS_HTML = cards_html()

CATS = ["All","Skincare","Tech","Beauty","Baby"]
CHIPS = "".join(f'<button class="chip{" on" if c=="All" else ""}" data-cat="{c}" type="button">{c}</button>' for c in CATS)

CSS = f"""
{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{
 --bg:#EEF5F6;--paper:#FFFFFF;--ink:#141C1D;--sub:#43585B;--mut:#7C8B8D;
 --teal:#66A5AD;--teal-d:#3C7C84;--teal-ink:#245259;--teal-wash:#E3EFF0;
 --line:#DCE7E9;--line2:#CBDADD;--gold:#F5A623;--rose:#E4715E;
 --sans:'Inter',system-ui,sans-serif;--disp:'Jakarta','Inter',system-ui,sans-serif;
 --shadow:0 20px 50px -26px rgba(20,50,55,.5);
}}
html{{-webkit-text-size-adjust:100%}}
body{{font-family:var(--sans);background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;overflow-x:hidden}}
h1,h2,h3,.disp{{font-family:var(--disp);font-weight:800;line-height:1.05;letter-spacing:-.02em}}
.wrap{{max-width:1120px;margin:0 auto;padding:0 22px}}
.reveal{{opacity:0;transform:translateY(20px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}}
.reveal.in{{opacity:1;transform:none}}
html:not(.js) .reveal{{opacity:1;transform:none}}

/* bar */
.bar{{position:sticky;top:0;z-index:50;background:rgba(238,245,246,.85);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}}
.bar-in{{display:flex;align-items:center;gap:12px;height:66px}}
.brand{{display:flex;align-items:center;gap:9px}}
.brand img{{width:30px;height:30px}}
.brand b{{font-family:var(--disp);font-weight:800;font-size:20px;color:var(--teal-ink);letter-spacing:-.03em}}
.bnav{{margin-left:22px;display:flex;gap:20px}}
.bnav a{{font-size:14px;font-weight:500;color:var(--sub);text-decoration:none}}
.bnav a:hover{{color:var(--teal-ink)}}
@media(max-width:720px){{.bnav{{display:none}}}}
.bcta{{margin-left:auto;font-family:var(--disp);font-weight:700;font-size:14px;color:#fff;background:var(--teal-d);padding:10px 17px;border-radius:11px;text-decoration:none}}
.bcta:hover{{background:var(--teal-ink)}}

/* hero */
.hero{{padding:56px 0 30px;position:relative}}
.hero-grid{{display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center}}
@media(max-width:900px){{.hero-grid{{grid-template-columns:1fr;gap:28px}}}}
.kick{{display:inline-flex;align-items:center;gap:8px;font-family:var(--disp);font-weight:700;font-size:12.5px;color:var(--teal-d);text-transform:uppercase;letter-spacing:.12em;margin-bottom:16px}}
.kick i{{width:7px;height:7px;border-radius:50%;background:var(--teal);box-shadow:0 0 0 4px var(--teal-wash)}}
.hero h1{{font-size:clamp(34px,5.6vw,56px);max-width:14ch}}
.hero h1 .u{{color:var(--teal-d);position:relative;white-space:nowrap}}
.hero h1 .u:after{{content:"";position:absolute;left:0;right:0;bottom:.06em;height:.14em;background:var(--teal);opacity:.35;border-radius:3px}}
.hero .sub{{font-size:clamp(16px,2vw,19px);color:var(--sub);max-width:46ch;margin-top:18px}}
.hero-cta{{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}}
.btn{{font-family:var(--disp);font-weight:700;font-size:15px;border:none;border-radius:13px;padding:13px 22px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:9px;transition:transform .12s,background .2s}}
.btn-p{{color:#fff;background:var(--teal-d);box-shadow:0 14px 26px -12px rgba(60,124,132,.8)}}
.btn-p:hover{{transform:translateY(-1px);background:var(--teal-ink)}}
.btn-g{{color:var(--teal-ink);background:var(--paper);border:1px solid var(--line2)}}
.btn-g:hover{{transform:translateY(-1px);border-color:var(--teal)}}
.trust-row{{display:flex;align-items:center;gap:16px;margin-top:26px;flex-wrap:wrap;color:var(--mut);font-size:13px}}
.stack{{display:flex}}
.stack span{{width:30px;height:30px;border-radius:50%;border:2px solid var(--bg);margin-left:-8px;font-family:var(--disp);font-weight:800;font-size:12px;color:#fff;display:flex;align-items:center;justify-content:center}}
.stack span:first-child{{margin-left:0}}

/* proof flip card */
.flip{{position:relative}}
.flip-lab{{font-size:12.5px;color:var(--mut);text-align:center;margin-top:14px}}
.flip-lab b{{color:var(--teal-ink)}}
.rc{{background:var(--paper);border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadow);overflow:hidden}}
.rc-head{{display:flex;align-items:center;gap:11px;padding:14px 16px;border-bottom:1px solid var(--line)}}
.rc-av{{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;color:#fff;font-size:15px;flex:0 0 auto}}
.rc-who b{{font-family:var(--disp);font-size:14.5px;display:block;line-height:1.2}}
.rc-who span{{font-size:12px;color:var(--mut)}}
.rc-tag{{margin-left:auto;font-size:11px;font-weight:700;border-radius:999px;padding:4px 10px}}
.rc-body{{padding:16px}}
/* fake text side */
.fake .rc-av{{background:#B9C2C4}}
.fake .rc-tag{{color:#9A6a00;background:#FCEFCE}}
.stars{{color:var(--gold);letter-spacing:1px;font-size:15px}}
.fake p{{margin-top:8px;font-size:15px;color:var(--sub)}}
.fake .flag{{margin-top:12px;font-size:12px;color:var(--rose);display:flex;align-items:center;gap:7px}}
/* real side */
.real .rc-av{{background:var(--teal)}}
.real .rc-tag{{color:#fff;background:var(--teal-d)}}
.player{{position:relative;border-radius:14px;overflow:hidden;background:linear-gradient(160deg,#1c2b2d,#0f1a1b);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center}}
.player .pface{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:44px;color:rgba(255,255,255,.16)}}
.play-btn{{position:relative;width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px -6px rgba(0,0,0,.5)}}
.play-btn:before{{content:"";border-left:18px solid var(--teal-d);border-top:11px solid transparent;border-bottom:11px solid transparent;margin-left:5px}}
.wave{{position:absolute;left:0;right:0;bottom:0;height:42px;display:flex;align-items:flex-end;gap:3px;padding:0 12px 10px}}
.wave i{{flex:1;background:var(--teal);border-radius:2px;height:20%;opacity:.85}}
.playing .wave i{{animation:wv .9s ease-in-out infinite}}
.playing .play-btn:before{{border:none;width:16px;height:16px;border-left:5px solid var(--teal-d);border-right:5px solid var(--teal-d);margin:0}}
@keyframes wv{{0%,100%{{height:22%}}50%{{height:90%}}}}
.real .verdict{{margin-top:13px;font-size:14.5px;color:var(--ink)}}
.real .verdict b{{color:var(--teal-ink)}}
.flip-toggle{{position:absolute;top:-14px;right:16px;z-index:3;display:inline-flex;background:var(--paper);border:1px solid var(--line2);border-radius:999px;padding:4px;box-shadow:0 8px 20px -10px rgba(0,0,0,.3)}}
.flip-toggle button{{font-family:var(--disp);font-weight:700;font-size:12px;border:none;background:none;color:var(--mut);padding:7px 13px;border-radius:999px;cursor:pointer}}
.flip-toggle button.on{{background:var(--teal-d);color:#fff}}

/* sections */
.sec{{padding:58px 0 8px}}
.sec-h2{{font-size:clamp(25px,3.4vw,34px);text-align:center;max-width:22ch;margin:0 auto}}
.sec-sub{{text-align:center;color:var(--sub);max-width:52ch;margin:12px auto 0}}
.pillars{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}}
@media(max-width:780px){{.pillars{{grid-template-columns:1fr}}}}
.pill{{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:24px}}
.pill .pic{{width:46px;height:46px;border-radius:13px;background:var(--teal-wash);display:flex;align-items:center;justify-content:center;margin-bottom:14px}}
.pill h3{{font-size:17.5px;margin-bottom:7px}}
.pill p{{font-size:14px;color:var(--sub)}}

/* trending */
.tr-head{{display:flex;align-items:end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:10px}}
.chips{{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 20px}}
.chip{{font-family:var(--disp);font-weight:700;font-size:13px;color:var(--sub);background:var(--paper);border:1px solid var(--line2);border-radius:999px;padding:8px 15px;cursor:pointer;transition:all .15s}}
.chip:hover{{border-color:var(--teal)}}
.chip.on{{background:var(--teal-d);border-color:var(--teal-d);color:#fff}}
.grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}}
@media(max-width:960px){{.grid{{grid-template-columns:repeat(2,1fr)}}}}
@media(max-width:520px){{.grid{{grid-template-columns:1fr}}}}
.card{{background:var(--paper);border:1px solid var(--line);border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .16s,box-shadow .16s,border-color .16s}}
.card:hover{{transform:translateY(-3px);box-shadow:var(--shadow);border-color:var(--line2)}}
.card .thumb{{position:relative;aspect-ratio:1/1;background:#0f1a1b;display:flex;align-items:center;justify-content:center;overflow:hidden}}
.card .thumb img{{width:100%;height:100%;object-fit:cover}}
.card .thumb.gen{{background:linear-gradient(160deg,var(--gc,#66A5AD),#1b2b2d)}}
.card .thumb.gen span{{font-family:var(--disp);font-weight:800;color:rgba(255,255,255,.9);font-size:15px;padding:14px;text-align:center;line-height:1.2}}
.card .pl{{position:absolute;left:10px;bottom:10px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center}}
.card .pl:before{{content:"";border-left:11px solid var(--teal-d);border-top:7px solid transparent;border-bottom:7px solid transparent;margin-left:3px}}
.card .catt{{position:absolute;top:10px;left:10px;font-size:10.5px;font-weight:700;color:#fff;background:rgba(20,28,29,.55);backdrop-filter:blur(4px);border-radius:999px;padding:3px 9px}}
.card .meta{{padding:12px 13px 14px}}
.card .meta h4{{font-family:var(--disp);font-weight:700;font-size:14px;line-height:1.25;min-height:2.5em}}
.card .who{{display:flex;align-items:center;gap:7px;margin-top:9px}}
.card .who i{{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:10px;color:#fff}}
.card .who span{{font-size:12px;color:var(--mut)}}
.card[hidden]{{display:none}}

/* add-review steps */
.steps{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:30px}}
@media(max-width:780px){{.steps{{grid-template-columns:1fr}}}}
.step{{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:22px;position:relative}}
.step .n{{font-family:var(--disp);font-weight:800;font-size:13px;color:#fff;background:var(--teal-d);width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:13px}}
.step h3{{font-size:16px;margin-bottom:6px}}
.step p{{font-size:13.5px;color:var(--sub)}}
.rotw{{margin-top:20px;background:linear-gradient(110deg,var(--teal-ink),var(--teal-d));border-radius:20px;padding:26px 28px;color:#fff;display:flex;align-items:center;gap:20px;flex-wrap:wrap}}
.rotw .rt{{flex:0 0 auto;width:54px;height:54px;border-radius:15px;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;font-size:26px}}
.rotw b{{font-family:var(--disp);font-size:19px;display:block}}
.rotw p{{opacity:.9;font-size:14px;margin-top:3px;max-width:56ch}}

/* app cta */
.appcta{{margin:52px 0;background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:44px 30px;text-align:center;box-shadow:var(--shadow)}}
.appcta h2{{font-size:clamp(24px,3.4vw,34px)}}
.appcta p{{color:var(--sub);max-width:44ch;margin:12px auto 0}}
.stores{{display:flex;gap:12px;justify-content:center;margin-top:22px;flex-wrap:wrap}}
.store{{display:inline-flex;align-items:center;gap:10px;background:var(--ink);color:#fff;border-radius:13px;padding:11px 18px;font-family:var(--disp);text-decoration:none}}
.store small{{display:block;font-size:10px;opacity:.7;font-weight:600;font-family:var(--sans)}}
.store b{{font-size:15px;line-height:1.1}}

.foot{{padding:26px 0 48px;border-top:1px solid var(--line);text-align:center;color:var(--mut);font-size:12.5px}}
.foot .brand{{justify-content:center;margin-bottom:12px}}
.foot p{{max-width:64ch;margin:0 auto}}
@media(max-width:560px){{.flip-toggle{{position:static;margin:0 auto 12px;width:max-content}}}}
@media (prefers-reduced-motion: reduce){{.reveal{{transition:none}}.wave i{{animation:none!important}}.btn:hover,.card:hover{{transform:none}}}}
[hidden]{{display:none!important}}
"""

BODY = f"""
<div class="bar"><div class="wrap bar-in">
  <span class="brand"><img src="{LOGO}" alt="Revios logo"><b>Revios</b></span>
  <nav class="bnav"><a href="#why">Why Revios</a><a href="#trending">Trending</a><a href="#add">Add a review</a></nav>
  <a class="bcta" href="#app">Get the app</a>
</div></div>

<header class="hero"><div class="wrap hero-grid">
  <div>
    <span class="kick reveal"><i></i>Real video and audio reviews</span>
    <h1 class="reveal">Reviews you can <span class="u">watch</span>. Reviews that can't lie.</h1>
    <p class="sub reveal">Before you buy, see the face and hear the voice of a real, verified person who actually used it. No paid stars, no bots, no wall of text you cannot trust.</p>
    <div class="hero-cta reveal">
      <a class="btn btn-p" href="#trending">Watch trending reviews</a>
      <a class="btn btn-g" href="#add">Add your review</a>
    </div>
    <div class="trust-row reveal">
      <span class="stack" aria-hidden="true"><span style="background:#66A5AD">D</span><span style="background:#5B8DEF">J</span><span style="background:#C084C7">H</span><span style="background:#E29578">G</span></span>
      Verified people reviewing real products every day
    </div>
  </div>
  <div class="flip reveal">
    <div class="flip-toggle" role="tablist">
      <button id="tgFake" class="on" type="button">A text review</button>
      <button id="tgReal" type="button">A Revios review</button>
    </div>
    <div id="cardFake" class="rc fake">
      <div class="rc-head"><span class="rc-av">A</span><div class="rc-who"><b>Anon_buyer_92</b><span>Text review</span></div><span class="rc-tag">Verified Purchase</span></div>
      <div class="rc-body"><div class="stars">★★★★★</div><p>Amazing product!!! Best I have ever used, 100 percent recommend to everyone. Five stars.</p><div class="flag"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="#E4715E" stroke-width="1.6" stroke-linejoin="round"/></svg>No face, no voice, no proof. Could be written by anyone in ten seconds.</div></div>
    </div>
    <div id="cardReal" class="rc real" hidden>
      <div class="rc-head"><span class="rc-av">D</span><div class="rc-who"><b>@damicoco</b><span>Revios review</span></div><span class="rc-tag">Verified user</span></div>
      <div class="rc-body">
        <div class="player" id="heroPlayer"><span class="pface">D</span><span class="play-btn" id="heroPlay" role="button" aria-label="Play review"></span><span class="wave">{''.join('<i></i>' for _ in range(22))}</span></div>
        <div class="verdict">Ceramide gel honest review. <b>Good hydration but a bit greasy</b> for oily skin, here is exactly how it wore through the day.</div>
      </div>
    </div>
    <p class="flip-lab">One of these can be faked in ten seconds. <b>The other one is a real person on camera.</b></p>
  </div>
</div></header>

<section class="sec" id="why"><div class="wrap">
  <h2 class="sec-h2 reveal">Why a Revios review is one you can actually trust</h2>
  <p class="sec-sub reveal">The problem was never that people do not read reviews. It is that they no longer believe them.</p>
  <div class="pillars">
    <div class="pill reveal"><div class="pic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12.5 11 15l4.5-5.5" stroke="#3C7C84" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3 5 6v5.5C5 16 8 19 12 21c4-2 7-5 7-9.5V6l-7-3Z" stroke="#3C7C84" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Verified people</h3><p>Every reviewer is a real, verified user with a profile and a history, not a throwaway account or a bot farm.</p></div>
    <div class="pill reveal"><div class="pic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="13" height="12" rx="2.5" stroke="#3C7C84" stroke-width="1.6"/><path d="m16 10 5-3v10l-5-3v-4Z" stroke="#3C7C84" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Video and audio</h3><p>You see their face and hear their voice using the product. That is a level of proof a paragraph of text simply cannot fake.</p></div>
    <div class="pill reveal"><div class="pic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 8l7-5 7 5M4 21h16" stroke="#3C7C84" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h3>The whole truth</h3><p>Good and bad, not just five star noise. Real people say what they liked and what let them down, so you buy with your eyes open.</p></div>
  </div>
</div></section>

<section class="sec" id="trending"><div class="wrap">
  <div class="tr-head"><h2 class="sec-h2 reveal" style="text-align:left;margin:0">Trending on Revios right now</h2></div>
  <p class="sec-sub reveal" style="text-align:left;margin:8px 0 0">Real reviews from the community. Pick a category and press play.</p>
  <div class="chips reveal">{CHIPS}</div>
  <div class="grid" id="grid">{CARDS_HTML}</div>
</div></section>

<section class="sec" id="add"><div class="wrap">
  <h2 class="sec-h2 reveal">Got an opinion worth trusting? Adding it takes a minute</h2>
  <p class="sec-sub reveal">No studio, no editing. Point your phone at the product and say what you honestly think.</p>
  <div class="steps">
    <div class="step reveal"><div class="n">1</div><h3>Pick the product</h3><p>Search for what you used, or add it in a tap if it is not there yet.</p></div>
    <div class="step reveal"><div class="n">2</div><h3>Record a quick take</h3><p>A short video or a voice note. Just talk, the way you would tell a friend.</p></div>
    <div class="step reveal"><div class="n">3</div><h3>Post it</h3><p>It goes live to a community that actually wants the honest version.</p></div>
  </div>
  <div class="rotw reveal"><span class="rt">🏆</span><div><b>Reviewer of the Week</b><p>Every week Revios picks the two most helpful reviews and rewards the people behind them. Honesty gets you seen.</p></div></div>
</div></section>

<section class="wrap" id="app"><div class="appcta reveal">
  <h2>Stop reading reviews you cannot trust</h2>
  <p>Watch real people, hear real verdicts, and add your own. Revios is where product reviews cannot lie.</p>
  <div class="stores">
    <a class="store" href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M16.5 12.5c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2.1 2.4 2 1-.03 1.3-.6 2.5-.6s1.5.6 2.6.6c1 0 1.7-1 2.3-2 .7-1.1 1-2.2 1-2.3-.02-.01-2.1-.8-2.1-3Zm-2-5.6c.5-.6.8-1.5.7-2.4-.7.03-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.3.8.05 1.6-.4 2.2-1Z"/></svg><span><small>Download on the</small><b>App Store</b></span></a>
    <a class="store" href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M4 3.5 14 12 4 20.5c-.3-.2-.5-.6-.5-1V4.5c0-.4.2-.8.5-1Zm11.5 7 2.7-1.6 2.4 1.3c.6.4.6 1.2 0 1.6l-2.4 1.3-2.7-1.6 2-1ZM5.5 3l9 5.4-1.9 1.9L5.5 3Zm6.6 9.7 1.9 1.9-9 5.4 7.1-7.3Z"/></svg><span><small>Get it on</small><b>Google Play</b></span></a>
  </div>
</div></section>

<footer class="foot"><div class="wrap">
  <span class="brand"><img src="{LOGO}" alt="Revios logo" style="width:24px;height:24px"><b>Revios</b></span>
  <p>Sample homepage concept built by ASTRA to show a first visit that earns trust. Trending review titles, usernames and product images are Revios's own real content from revios.net. The text-review example is illustrative. Not affiliated, no endorsement implied. Built for Erisan at Revios.</p>
</div></footer>
"""

# ------- JS as raw string (single braces), data injected via replace -------
SCRIPT = r"""<script>
document.documentElement.classList.add('js');
(function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  setTimeout(function(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){el.classList.add('in');});},1900);

  // hero flip
  var tgF=document.getElementById('tgFake'),tgR=document.getElementById('tgReal'),
      cF=document.getElementById('cardFake'),cR=document.getElementById('cardReal');
  function flip(real){cF.hidden=real;cR.hidden=!real;tgF.classList.toggle('on',!real);tgR.classList.toggle('on',real);}
  tgF.addEventListener('click',function(){flip(false);});
  tgR.addEventListener('click',function(){flip(true);});
  var hp=document.getElementById('heroPlayer'),hb=document.getElementById('heroPlay');
  function toggleHero(){hp.classList.toggle('playing');}
  hb.addEventListener('click',toggleHero);
  // auto-demo: reveal real side once in view, start waveform
  var seen=false;
  var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!seen){seen=true;setTimeout(function(){flip(true);hp.classList.add('playing');},1400);}});},{threshold:.4});
  io2.observe(document.querySelector('.flip'));

  // trending grid (cards are pre-rendered in HTML for no-JS; JS just enhances)
  var grid=document.getElementById('grid');
  grid.addEventListener('click',function(e){var c=e.target.closest('.card');if(!c)return;var pl=c.querySelector('.pl');if(pl)pl.style.transform=(pl.style.transform?'':'scale(.9)');});
  // category filter
  document.querySelectorAll('.chip').forEach(function(ch){
    ch.addEventListener('click',function(){
      document.querySelectorAll('.chip').forEach(function(x){x.classList.remove('on');});
      ch.classList.add('on');
      var cat=ch.getAttribute('data-cat');
      document.querySelectorAll('.card').forEach(function(card){
        card.hidden = !(cat==='All' || card.getAttribute('data-cat')===cat);
      });
    });
  });
})();
</script>"""
SCRIPT = SCRIPT.replace("__REVIEWS__", REVIEWS_JSON)

HTML = "<title>Revios, reviews you can watch. Reviews that can't lie.</title>\n" \
       '<meta name="description" content="Revios is real video and audio product reviews from verified people. See the face, hear the voice, know it is honest before you buy.">\n' \
       "<style>" + CSS + "</style>\n" + BODY + "\n" + SCRIPT
OUT.write_text(HTML)
print("WROTE", OUT, len(HTML.encode()), "bytes")
