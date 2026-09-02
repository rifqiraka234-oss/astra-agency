#!/usr/bin/env python3
import base64, pathlib, re, json
A = pathlib.Path("/home/user/astra-agency/state/prototypes/revios/assets")
OUT = pathlib.Path("/home/user/astra-agency/state/prototypes/revios/index.html")
def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def font(f): return "data:font/woff2;base64," + b64(A/"fonts"/f)
def img(n):
    ext="png" if n.endswith("png") else "jpeg"
    return f"data:image/{ext};base64," + b64(A/n)
FONTS = "".join(f"@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:swap;src:url({font(f)}) format('woff2')}}"
  for fam,w,f in [("Jakarta",600,"pj600.woff2"),("Jakarta",700,"pj700.woff2"),("Jakarta",800,"pj800.woff2"),
                  ("Inter",400,"in400.woff2"),("Inter",500,"in500.woff2"),("Inter",600,"in600.woff2")])
LOGO=img("logo.png")

REVIEWS=[
 ("Ceramide gel honest review","damicoco","Skincare","p_ceramide.jpg","Facefacts Ceramide Gel Cream"),
 ("Sonic electric toothbrush from TEMU","jedidiah","Tech","p_toothbrush.jpg","Sonic Electric Toothbrush"),
 ("Pears baby oil review","jacy-mic123","Baby","p_pears.jpg","Pears Mild and Gentle Baby Oil"),
 ("Estelin rosehip niacinamide serum isn't for me","hazelkim22","Skincare",None,"Estelin Rosehip Serum"),
 ("Redmi A5, great phone for the price","woungliem","Tech",None,"Redmi A5"),
 ("DJI Osmo Mobile 7P gimbal review","gloria","Tech",None,"DJI Osmo Mobile 7P"),
 ("My honest review on Secret Armor body mist","rich_love234","Beauty",None,"Secret Armor Body Mist"),
 ("Sivoderm cream review for acne prone skin","hazelkim22","Skincare",None,"Sivoderm Cream"),
]
CATCOL={"Skincare":"#66A5AD","Tech":"#5B8DEF","Baby":"#E29578","Beauty":"#C084C7"}
def cards_html():
    o=[]
    for t,u,c,im,pn in REVIEWS:
        col=CATCOL.get(c,"#66A5AD"); mono=u[0].upper()
        thumb=(f'<div class="thumb"><img src="{img(im)}" alt="{pn}" loading="lazy"><span class="catt">{c}</span><span class="pl"></span></div>'
               if im else f'<div class="thumb gen" style="--gc:{col}"><span>{pn}</span><span class="catt">{c}</span><span class="pl"></span></div>')
        o.append(f'<article class="card reveal" data-cat="{c}">{thumb}<div class="meta"><h4>{t}</h4><div class="who"><i style="background:{col}">{mono}</i><span>@{u}</span></div></div></article>')
    return "".join(o)
CARDS_HTML=cards_html()
CATS=["All","Skincare","Tech","Beauty","Baby"]
CHIPS="".join(f'<button class="chip{" on" if c=="All" else ""}" data-cat="{c}" type="button">{c}</button>' for c in CATS)

# fake-review villain wall (illustrative)
FAKE=[("Amazing!!! Best product ever, five stars!!!","AmazonFan_88","BOT"),
      ("Absolutely perfect, it changed my life.","user_9931","AI WRITTEN"),
      ("10 out of 10, would buy again, incredible.","shopper_x22","PAID"),
      ("Best purchase of 2026, completely flawless.","anon_4471","FAKE"),
      ("Life changing, everyone needs to buy this now.","reviewpro_1","BOT"),
      ("Five stars, no complaints at all, love it!!!","buyer_2026","AI WRITTEN"),
      ("Perfect in every single way, so so happy.","gadgetgirl","PAID"),
      ("Wow just wow, unbelievable quality, 5 stars.","topdeals_uk","FAKE")]
def fake_html():
    o=[]
    for i,(txt,u,stamp) in enumerate(FAKE):
        o.append(f'<div class="fk" style="--fd:{i*70}ms"><div class="fk-top"><span class="fk-av">{u[0].upper()}</span><span class="fk-u">{u}</span><span class="fk-stars">★★★★★</span></div><p>{txt}</p><span class="stamp">{stamp}</span></div>')
    return "".join(o)
FAKE_HTML=fake_html()

CSS=f"""
{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{
 --bg:#EEF5F6;--paper:#FFFFFF;--ink:#101819;--sub:#3E5457;--mut:#7C8B8D;
 --teal:#66A5AD;--teal-d:#3C7C84;--teal-ink:#204a51;--teal-wash:#E3EFF0;--teal-bright:#4FC3CE;
 --void:#0B1213;--void2:#0F1A1B;--vline:#22383A;--vink:#EAF3F3;--vsub:#8FA6A8;
 --warn:#E4715E;--warn2:#F0A28F;--gold:#F5A623;--line:#DCE7E9;--line2:#CBDADD;
 --sans:'Inter',system-ui,sans-serif;--disp:'Jakarta','Inter',system-ui,sans-serif;
 --shadow:0 24px 60px -30px rgba(16,45,50,.55);
}}
html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth}}
body{{font-family:var(--sans);background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;overflow-x:hidden}}
h1,h2,h3,.disp{{font-family:var(--disp);font-weight:800;line-height:1.04;letter-spacing:-.025em}}
.wrap{{max-width:1140px;margin:0 auto;padding:0 22px}}
.reveal{{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}}
.reveal.in{{opacity:1;transform:none}}
.reveal.d1{{transition-delay:.08s}}.reveal.d2{{transition-delay:.16s}}.reveal.d3{{transition-delay:.24s}}
html:not(.js) .reveal{{opacity:1;transform:none}}
.mono{{font-family:var(--disp);font-variant-numeric:tabular-nums}}

/* cursor glow (desktop) */
#glow{{position:fixed;width:520px;height:520px;border-radius:50%;left:0;top:0;transform:translate(-50%,-50%);pointer-events:none;z-index:0;
 background:radial-gradient(closest-side,rgba(102,165,173,.20),transparent 70%);opacity:0;transition:opacity .4s;mix-blend-mode:multiply}}
@media(hover:hover) and (pointer:fine){{#glow.on{{opacity:1}}}}

/* nav */
.nav{{position:fixed;top:0;left:0;right:0;z-index:60;transition:background .3s,border-color .3s,backdrop-filter .3s;border-bottom:1px solid transparent}}
.nav.solid{{background:rgba(238,245,246,.82);backdrop-filter:blur(14px);border-color:var(--line)}}
.nav-in{{display:flex;align-items:center;gap:12px;height:64px}}
.brand{{display:flex;align-items:center;gap:9px}}
.brand img{{width:30px;height:30px}}
.brand b{{font-family:var(--disp);font-weight:800;font-size:20px;color:var(--teal-ink);letter-spacing:-.03em}}
.nav-cta{{margin-left:auto;font-family:var(--disp);font-weight:700;font-size:14px;color:#fff;background:var(--teal-d);padding:10px 17px;border-radius:11px;text-decoration:none;transition:transform .12s,background .2s}}
.nav-cta:hover{{transform:translateY(-1px);background:var(--teal-ink)}}

.btn{{font-family:var(--disp);font-weight:700;font-size:15px;border:none;border-radius:14px;padding:14px 24px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:9px;transition:transform .18s cubic-bezier(.2,.8,.2,1),background .2s,box-shadow .2s;will-change:transform}}
.btn-p{{color:#fff;background:var(--teal-d);box-shadow:0 16px 30px -12px rgba(60,124,132,.85)}}
.btn-p:hover{{background:var(--teal-ink)}}
.btn-g{{color:var(--teal-ink);background:var(--paper);border:1px solid var(--line2)}}
.btn-g:hover{{border-color:var(--teal)}}
.btn-w{{color:var(--teal-ink);background:#fff}}

/* ===== HERO (relief / hope) ===== */
.hero{{position:relative;padding:120px 0 60px;overflow:hidden}}
.hero-grid{{display:grid;grid-template-columns:1.05fr .95fr;gap:44px;align-items:center;position:relative;z-index:2}}
@media(max-width:920px){{.hero-grid{{grid-template-columns:1fr;gap:30px}}}}
.kick{{display:inline-flex;align-items:center;gap:9px;font-family:var(--disp);font-weight:700;font-size:12.5px;color:var(--teal-d);text-transform:uppercase;letter-spacing:.13em;margin-bottom:20px}}
.kick i{{width:7px;height:7px;border-radius:50%;background:var(--teal);box-shadow:0 0 0 4px var(--teal-wash)}}
.hero h1{{font-size:clamp(38px,6.4vw,68px);max-width:13ch}}
.hero h1 .ln{{display:block;overflow:hidden}}
.hero h1 .ln>span{{display:inline-block;transform:translateY(105%);transition:transform .9s cubic-bezier(.2,.75,.2,1)}}
.js .hero.armed h1 .ln:nth-child(1)>span{{transform:none}}
.js .hero.armed h1 .ln:nth-child(2)>span{{transform:none;transition-delay:.11s}}
.js .hero.armed h1 .ln:nth-child(3)>span{{transform:none;transition-delay:.22s}}
html:not(.js) .hero h1 .ln>span{{transform:none}}
.hero h1 .u{{color:var(--teal-d)}}
.hero .sub{{font-size:clamp(16px,2vw,19px);color:var(--sub);max-width:44ch;margin-top:20px}}
.hero-cta{{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}}
.hero-mini{{display:flex;align-items:center;gap:11px;margin-top:26px;color:var(--mut);font-size:13px}}
.stack{{display:flex}}.stack span{{width:30px;height:30px;border-radius:50%;border:2px solid var(--bg);margin-left:-8px;font-family:var(--disp);font-weight:800;font-size:12px;color:#fff;display:flex;align-items:center;justify-content:center}}
.stack span:first-child{{margin-left:0}}
.scrollcue{{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);z-index:3;font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.2em;display:flex;flex-direction:column;align-items:center;gap:7px}}
.scrollcue i{{width:1px;height:26px;background:linear-gradient(var(--teal),transparent);animation:cue 1.8s ease-in-out infinite}}
@keyframes cue{{0%,100%{{opacity:.3;transform:scaleY(.6)}}50%{{opacity:1;transform:scaleY(1)}}}}

/* raw human review card */
.rev-card{{background:var(--paper);border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadow);overflow:hidden;position:relative}}
.rev-card .rc-head{{display:flex;align-items:center;gap:11px;padding:14px 16px;border-bottom:1px solid var(--line)}}
.rc-av{{width:42px;height:42px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;color:#fff;font-size:16px;flex:0 0 auto}}
.rc-who b{{font-family:var(--disp);font-size:14.5px;display:block;line-height:1.2}}.rc-who span{{font-size:12px;color:var(--mut)}}
.rc-tag{{margin-left:auto;font-size:11px;font-weight:700;border-radius:999px;padding:4px 11px;color:#fff;background:var(--teal-d);display:inline-flex;align-items:center;gap:5px}}
.rc-tag i{{width:6px;height:6px;border-radius:50%;background:#fff;animation:pz 1.6s infinite}}
@keyframes pz{{0%{{box-shadow:0 0 0 0 rgba(255,255,255,.7)}}70%{{box-shadow:0 0 0 6px rgba(255,255,255,0)}}100%{{box-shadow:0 0 0 0 rgba(255,255,255,0)}}}}
.player{{position:relative;background:linear-gradient(160deg,#1b2b2d,#0d1617);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center}}
.player .pface{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:52px;color:rgba(255,255,255,.14)}}
.play-btn{{position:relative;z-index:2;width:62px;height:62px;border-radius:50%;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 26px -6px rgba(0,0,0,.55);transition:transform .15s}}
.play-btn:hover{{transform:scale(1.06)}}
.play-btn:before{{content:"";border-left:19px solid var(--teal-d);border-top:12px solid transparent;border-bottom:12px solid transparent;margin-left:5px}}
.playing .play-btn:before{{border:none;width:16px;height:17px;border-left:5px solid var(--teal-d);border-right:5px solid var(--teal-d);margin:0}}
.cap{{position:absolute;left:14px;right:14px;bottom:52px;z-index:2;text-align:center;color:#fff;font-weight:600;font-size:14px;text-shadow:0 2px 10px rgba(0,0,0,.6);opacity:0;transition:opacity .4s}}
.playing .cap{{opacity:1}}
.wave{{position:absolute;left:0;right:0;bottom:0;height:40px;display:flex;align-items:flex-end;gap:3px;padding:0 12px 10px;z-index:2}}
.wave i{{flex:1;background:var(--teal-bright);border-radius:2px;height:18%}}
.playing .wave i{{animation:wv .9s ease-in-out infinite}}
@keyframes wv{{0%,100%{{height:20%}}50%{{height:88%}}}}
.rev-card .verdict{{padding:14px 16px;font-size:14.5px;color:var(--ink)}}
.rev-card .verdict b{{color:var(--teal-ink)}}
.rev-card .verdict .hon{{display:inline-block;margin-top:9px;font-size:12px;color:var(--warn);background:rgba(228,113,94,.1);border-radius:999px;padding:3px 10px;font-weight:600}}

/* ===== CRISIS (dark / dread) ===== */
.crisis{{position:relative;background:var(--void);color:var(--vink);padding:96px 0 90px;margin-top:40px}}
.crisis:before,.crisis:after{{content:"";position:absolute;left:0;right:0;height:70px}}
.crisis:before{{top:-70px;background:linear-gradient(var(--bg),var(--void))}}
.crisis h2{{font-size:clamp(28px,4.4vw,46px);text-align:center;max-width:20ch;margin:0 auto;color:#fff}}
.crisis .lead{{text-align:center;color:var(--vsub);max-width:50ch;margin:16px auto 0;font-size:clamp(15px,1.9vw,18px)}}
.statrow{{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:40px 0 12px}}
@media(max-width:720px){{.statrow{{grid-template-columns:1fr;gap:12px}}}}
.stat{{background:rgba(255,255,255,.03);border:1px solid var(--vline);border-radius:18px;padding:26px 22px;text-align:center}}
.stat .num{{font-family:var(--disp);font-weight:800;font-size:clamp(40px,6vw,58px);line-height:1;color:var(--warn2);letter-spacing:-.03em}}
.stat .lab{{font-size:14px;color:var(--vsub);margin-top:10px}}
.src{{text-align:center;font-size:11.5px;color:#5f7476;margin-top:20px}}
/* fake wall */
.wall{{position:relative;margin-top:46px}}
.wall-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}}
@media(max-width:900px){{.wall-grid{{grid-template-columns:repeat(2,1fr)}}}}
@media(max-width:520px){{.wall-grid{{grid-template-columns:1fr}}}}
.fk{{position:relative;background:rgba(255,255,255,.04);border:1px solid var(--vline);border-radius:14px;padding:14px;overflow:hidden;transition:filter .5s,opacity .5s}}
.fk-top{{display:flex;align-items:center;gap:8px}}
.fk-av{{width:26px;height:26px;border-radius:50%;background:#33474a;color:#9fb3b5;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:11px}}
.fk-u{{font-size:12px;color:#7f9597}}.fk-stars{{margin-left:auto;color:#6b7f81;font-size:12px;letter-spacing:1px}}
.fk p{{font-size:13px;color:#b9c9cb;margin-top:9px}}
.fk .stamp{{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-11deg) scale(1.3);font-family:var(--disp);font-weight:800;font-size:19px;letter-spacing:.06em;color:var(--warn);border:3px solid var(--warn);border-radius:8px;padding:3px 10px;opacity:0;transition:opacity .4s,transform .4s;white-space:nowrap;text-transform:uppercase}}
.wall.stamped .fk{{filter:grayscale(.4) blur(.4px);opacity:.72}}
.wall.stamped .fk .stamp{{opacity:.92;transform:translate(-50%,-50%) rotate(-11deg) scale(1)}}
.wall-cap{{text-align:center;margin-top:26px;font-family:var(--disp);font-weight:800;font-size:clamp(20px,2.8vw,30px);color:#fff}}
.wall-cap .hl{{color:var(--warn2)}}

/* ===== TURN (relief / proof) ===== */
.turn{{position:relative;background:var(--void);color:var(--vink);padding:20px 0 100px}}
.turn:after{{content:"";position:absolute;left:0;right:0;bottom:-70px;height:70px;background:linear-gradient(var(--void),var(--bg))}}
.turn-in{{display:grid;grid-template-columns:.9fr 1.1fr;gap:44px;align-items:center}}
@media(max-width:900px){{.turn-in{{grid-template-columns:1fr;gap:28px}}}}
.turn h2{{font-size:clamp(28px,4.2vw,44px);color:#fff;max-width:15ch}}
.turn h2 .g{{background:linear-gradient(96deg,var(--teal-bright),#9be7ee);-webkit-background-clip:text;background-clip:text;color:transparent}}
.turn p{{color:var(--vsub);font-size:clamp(15px,1.9vw,18px);margin-top:16px;max-width:46ch}}
.turn-stats{{display:flex;gap:26px;margin-top:26px;flex-wrap:wrap}}
.ts .n{{font-family:var(--disp);font-weight:800;font-size:30px;color:var(--teal-bright)}}
.ts .l{{font-size:12.5px;color:var(--vsub);max-width:16ch}}
.turn .src{{text-align:left;margin-top:22px}}

/* ===== PILLARS ===== */
.sec{{padding:66px 0 8px;position:relative;z-index:2}}
.sec-h2{{font-size:clamp(26px,3.6vw,38px);text-align:center;max-width:22ch;margin:0 auto}}
.sec-sub{{text-align:center;color:var(--sub);max-width:52ch;margin:12px auto 0}}
.pillars{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:34px}}
@media(max-width:780px){{.pillars{{grid-template-columns:1fr}}}}
.pill{{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:24px;transition:transform .18s,box-shadow .18s}}
.pill:hover{{transform:translateY(-3px);box-shadow:var(--shadow)}}
.pill .pic{{width:46px;height:46px;border-radius:13px;background:var(--teal-wash);display:flex;align-items:center;justify-content:center;margin-bottom:14px}}
.pill h3{{font-size:17.5px;margin-bottom:7px}}.pill p{{font-size:14px;color:var(--sub)}}
.pill .proofmini{{margin-top:14px;border-top:1px dashed var(--line2);padding-top:12px;display:flex;align-items:center;gap:9px}}
.pill .proofmini i{{width:26px;height:26px;border-radius:50%;background:var(--teal);color:#fff;font-family:var(--disp);font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center;flex:0 0 auto}}
.pill .proofmini span{{font-size:12px;color:var(--mut)}}.pill .proofmini b{{color:var(--warn);font-weight:600}}

/* trending */
.chips{{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0 22px}}
.chip{{font-family:var(--disp);font-weight:700;font-size:13px;color:var(--sub);background:var(--paper);border:1px solid var(--line2);border-radius:999px;padding:8px 15px;cursor:pointer;transition:all .15s}}
.chip:hover{{border-color:var(--teal)}}.chip.on{{background:var(--teal-d);border-color:var(--teal-d);color:#fff}}
.grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}}
@media(max-width:960px){{.grid{{grid-template-columns:repeat(2,1fr)}}}}
@media(max-width:520px){{.grid{{grid-template-columns:1fr}}}}
.card{{background:var(--paper);border:1px solid var(--line);border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .16s,box-shadow .16s,border-color .16s}}
.card:hover{{transform:translateY(-4px);box-shadow:var(--shadow);border-color:var(--line2)}}
.card .thumb{{position:relative;aspect-ratio:1/1;background:#0f1a1b;display:flex;align-items:center;justify-content:center;overflow:hidden}}
.card .thumb img{{width:100%;height:100%;object-fit:cover;transition:transform .4s}}
.card:hover .thumb img{{transform:scale(1.05)}}
.card .thumb.gen{{background:linear-gradient(160deg,var(--gc,#66A5AD),#1b2b2d)}}
.card .thumb.gen span{{font-family:var(--disp);font-weight:800;color:rgba(255,255,255,.92);font-size:15px;padding:14px;text-align:center;line-height:1.2}}
.card .pl{{position:absolute;left:10px;bottom:10px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;transition:transform .15s}}
.card:hover .pl{{transform:scale(1.12)}}
.card .pl:before{{content:"";border-left:12px solid var(--teal-d);border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:3px}}
.card .catt{{position:absolute;top:10px;left:10px;font-size:10.5px;font-weight:700;color:#fff;background:rgba(16,24,25,.55);backdrop-filter:blur(4px);border-radius:999px;padding:3px 9px}}
.card .meta{{padding:12px 13px 14px}}
.card .meta h4{{font-family:var(--disp);font-weight:700;font-size:14px;line-height:1.25;min-height:2.5em}}
.card .who{{display:flex;align-items:center;gap:7px;margin-top:9px}}
.card .who i{{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:10px;color:#fff}}
.card .who span{{font-size:12px;color:var(--mut)}}
.card[hidden]{{display:none}}

/* your voice */
.voice{{margin-top:20px;display:grid;grid-template-columns:1.1fr .9fr;gap:24px;align-items:center}}
@media(max-width:840px){{.voice{{grid-template-columns:1fr}}}}
.steps{{display:flex;flex-direction:column;gap:12px}}
.vstep{{display:flex;gap:14px;align-items:flex-start;background:var(--paper);border:1px solid var(--line);border-radius:15px;padding:16px 18px}}
.vstep .n{{font-family:var(--disp);font-weight:800;font-size:13px;color:#fff;background:var(--teal-d);width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex:0 0 auto}}
.vstep h3{{font-size:15.5px;margin-bottom:3px}}.vstep p{{font-size:13.5px;color:var(--sub)}}
.rotw2{{background:linear-gradient(150deg,var(--teal-ink),var(--teal-d));border-radius:22px;padding:28px;color:#fff;text-align:center}}
.ring{{position:relative;width:120px;height:120px;margin:0 auto 14px}}
.ring svg{{transform:rotate(-90deg)}}
.ring .bg{{stroke:rgba(255,255,255,.18)}}
.ring .fg{{stroke:#fff;stroke-linecap:round;stroke-dasharray:326;stroke-dashoffset:326;transition:stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)}}
.ring.go .fg{{stroke-dashoffset:75}}
.ring .rc{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}}
.ring .rc b{{font-family:var(--disp);font-weight:800;font-size:26px}}.ring .rc span{{font-size:10px;opacity:.85;text-transform:uppercase;letter-spacing:.1em}}
.rotw2 h3{{font-family:var(--disp);font-size:19px}}.rotw2 p{{opacity:.92;font-size:13.5px;margin-top:6px}}

/* peak-end CTA */
.finale{{margin:70px 0 0;position:relative;background:linear-gradient(150deg,var(--teal-ink),var(--teal-d));color:#fff;overflow:hidden}}
.finale-in{{padding:80px 24px;text-align:center;position:relative;z-index:2}}
.finale h2{{font-size:clamp(30px,5vw,52px);max-width:16ch;margin:0 auto}}
.finale p{{opacity:.92;max-width:44ch;margin:16px auto 0;font-size:17px}}
.finale .stores{{display:flex;gap:12px;justify-content:center;margin-top:28px;flex-wrap:wrap}}
.store{{display:inline-flex;align-items:center;gap:10px;background:#fff;color:var(--teal-ink);border-radius:13px;padding:12px 20px;font-family:var(--disp);text-decoration:none;transition:transform .14s}}
.store:hover{{transform:translateY(-2px)}}
.store small{{display:block;font-size:10px;opacity:.6;font-weight:600;font-family:var(--sans)}}.store b{{font-size:15px;line-height:1.1}}
.finale .orb{{position:absolute;border-radius:50%;filter:blur(10px);opacity:.5}}
.finale .o1{{width:340px;height:340px;background:rgba(79,195,206,.5);top:-120px;left:-60px}}
.finale .o2{{width:300px;height:300px;background:rgba(255,255,255,.2);bottom:-140px;right:-40px}}

.foot{{padding:30px 0 50px;border-top:1px solid var(--line);text-align:center;color:var(--mut);font-size:12.5px;background:var(--bg)}}
.foot .brand{{justify-content:center;margin-bottom:12px}}.foot p{{max-width:66ch;margin:0 auto 6px}}
@media (prefers-reduced-motion: reduce){{
 .reveal{{transition:none}} .wave i{{animation:none!important}} .scrollcue i{{animation:none}}
 .hero h1 .ln>span{{transform:none!important}} .btn:hover,.card:hover,.pill:hover{{transform:none}}
 .ring .fg{{transition:none}} .rc-tag i{{animation:none}}
}}
[hidden]{{display:none!important}}
"""

BODY=f"""
<div id="glow"></div>
<header class="nav" id="nav"><div class="wrap nav-in">
  <span class="brand"><img src="{LOGO}" alt="Revios logo"><b>Revios</b></span>
  <a class="nav-cta" href="#get">Get the app</a>
</div></header>

<section class="hero" id="hero"><div class="wrap hero-grid">
  <div>
    <span class="kick reveal"><i></i>Real video and audio reviews</span>
    <h1><span class="ln"><span>Finally, reviews</span></span><span class="ln"><span>you can <span class="u">believe</span>.</span></span></h1>
    <p class="sub reveal d1">See the face and hear the voice of a real, verified person who actually used it. Before you spend a penny, know the honest truth, flaws and all.</p>
    <div class="hero-cta reveal d2">
      <a class="btn btn-p" href="#trending" data-mag>Watch real reviews</a>
      <a class="btn btn-g" href="#voice" data-mag>Add your own</a>
    </div>
    <div class="hero-mini reveal d3"><span class="stack"><span style="background:#66A5AD">D</span><span style="background:#5B8DEF">J</span><span style="background:#C084C7">H</span><span style="background:#E29578">G</span></span>Real people, reviewing real products, every day</div>
  </div>
  <div class="reveal d1">
    <div class="rev-card">
      <div class="rc-head"><span class="rc-av">D</span><div class="rc-who"><b>@damicoco</b><span>Verified user</span></div><span class="rc-tag"><i></i>Live</span></div>
      <div class="player" id="heroPlayer"><span class="pface">D</span><span class="play-btn" id="heroPlay" role="button" aria-label="Play review"></span><span class="cap">"honestly the gel is good but a bit greasy..."</span><span class="wave">{''.join('<i></i>' for _ in range(24))}</span></div>
      <div class="verdict">Ceramide gel honest review. <b>Good hydration, but greasy on oily skin.</b><span class="hon">Says the bad, not just the good</span></div>
    </div>
  </div>
</div>
<div class="scrollcue">scroll<i></i></div>
</section>

<section class="crisis" id="crisis"><div class="wrap">
  <h2 class="reveal">The problem was never that you stopped reading reviews.</h2>
  <p class="lead reveal d1">It is that you stopped believing them. And in 2026, you were right to.</p>
  <div class="statrow">
    <div class="stat reveal"><div class="num" data-count="82" data-suf="%">0%</div><div class="lab">of shoppers hit a fake review in the last year</div></div>
    <div class="stat reveal d1"><div class="num" data-count="90" data-suf="%">0%</div><div class="lab">say fake reviews are a real concern</div></div>
    <div class="stat reveal d2"><div class="num" data-count="67" data-suf="%">0%</div><div class="lab">trust online reviews less than five years ago</div></div>
  </div>
  <p class="src reveal">Sources: BrightLocal and industry consumer-trust research, 2026</p>

  <div class="wall reveal" id="wall">
    <div class="wall-grid">{FAKE_HTML}</div>
    <p class="wall-cap">Five stars means nothing when <span class="hl">anyone, or any bot, can write it in ten seconds.</span></p>
  </div>
</div></section>

<section class="turn" id="turn"><div class="wrap turn-in">
  <div class="reveal">
    <div class="rev-card">
      <div class="rc-head"><span class="rc-av" style="background:#C084C7">H</span><div class="rc-who"><b>@hazelkim22</b><span>Verified user</span></div><span class="rc-tag"><i></i>Real</span></div>
      <div class="player"><span class="pface">H</span><span class="play-btn"></span><span class="wave">{''.join('<i></i>' for _ in range(24))}</span></div>
      <div class="verdict">Estelin rosehip serum, honest take. <b>It just was not for me,</b> here is exactly why.<span class="hon">A real person can tell you no</span></div>
    </div>
  </div>
  <div>
    <h2 class="reveal">You cannot fake <span class="g">a face and a voice.</span></h2>
    <p class="reveal d1">That is the whole idea. A verified person, on camera, saying what they actually think. It is the one thing a bot cannot do, and it is exactly where trust is already moving.</p>
    <div class="turn-stats reveal d2">
      <div class="ts"><div class="n">No.1</div><div class="l">most trusted way to decide, peer video</div></div>
      <div class="ts"><div class="n" data-count="80" data-suf="%">0%</div><div class="l">of Gen Z buy based on real user video</div></div>
      <div class="ts"><div class="n" data-count="92" data-suf="%">0%</div><div class="l">trust real people over any advert</div></div>
    </div>
    <p class="src reveal d3">Source: Edelman Trust Barometer, 2026</p>
  </div>
</div></section>

<section class="sec" id="why"><div class="wrap">
  <h2 class="sec-h2 reveal">Why a Revios review is one you can trust</h2>
  <p class="sec-sub reveal d1">Not a nicer looking star rating. A different kind of proof.</p>
  <div class="pillars">
    <div class="pill reveal"><div class="pic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12.5 11 15l4.5-5.5" stroke="#3C7C84" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3 5 6v5.5C5 16 8 19 12 21c4-2 7-5 7-9.5V6l-7-3Z" stroke="#3C7C84" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Verified people</h3><p>Every reviewer is a real, verified user with a face and a history, not a throwaway account.</p><div class="proofmini"><i>!</i><span><b>82%</b> hit a fake review last year. Verified means it did not come from a bot.</span></div></div>
    <div class="pill reveal d1"><div class="pic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="13" height="12" rx="2.5" stroke="#3C7C84" stroke-width="1.6"/><path d="m16 10 5-3v10l-5-3v-4Z" stroke="#3C7C84" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Video and audio</h3><p>You see and hear them use it. Raw and unedited, because imperfection is what makes it real.</p><div class="proofmini"><i>1</i><span>Peer video is now the <b>most trusted</b> format there is.</span></div></div>
    <div class="pill reveal d2"><div class="pic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 8l7-5 7 5M4 21h16" stroke="#3C7C84" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h3>The whole truth</h3><p>Good and bad. Real people say what let them down, which is exactly why you believe the rest.</p><div class="proofmini"><i>+</i><span>Honest cons build <b>more trust</b> than a wall of five stars.</span></div></div>
  </div>
</div></section>

<section class="sec" id="trending"><div class="wrap">
  <h2 class="sec-h2 reveal" style="text-align:left">Trending on Revios right now</h2>
  <p class="sec-sub reveal d1" style="text-align:left;margin-left:0">Real reviews from the community. Pick a category and press play.</p>
  <div class="chips reveal">{CHIPS}</div>
  <div class="grid" id="grid">{CARDS_HTML}</div>
</div></section>

<section class="sec" id="voice"><div class="wrap">
  <h2 class="sec-h2 reveal">Your honest take is worth more than you think</h2>
  <p class="sec-sub reveal d1">No studio, no editing. Point your phone, say what you really think, help someone buy smarter.</p>
  <div class="voice">
    <div class="steps">
      <div class="vstep reveal"><span class="n">1</span><div><h3>Pick the product</h3><p>Search for what you used, or add it in a tap if it is not there yet.</p></div></div>
      <div class="vstep reveal d1"><span class="n">2</span><div><h3>Record a quick take</h3><p>A short video or a voice note, the way you would tell a friend. Raw is better than polished.</p></div></div>
      <div class="vstep reveal d2"><span class="n">3</span><div><h3>Post it</h3><p>It goes live to people who actually want the honest version, and your voice starts building.</p></div></div>
    </div>
    <div class="rotw2 reveal d1">
      <div class="ring" id="rotwRing"><svg width="120" height="120" viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52" fill="none" stroke-width="8"/><circle class="fg" cx="60" cy="60" r="52" fill="none" stroke-width="8"/></svg><span class="rc"><b>#2</b><span>this week</span></span></div>
      <h3>Reviewer of the Week</h3>
      <p>Every week Revios rewards the two most helpful reviews. Honesty gets you seen. Your first one could be next.</p>
    </div>
  </div>
</div></section>

<section class="finale" id="get"><span class="orb o1"></span><span class="orb o2"></span><div class="wrap finale-in">
  <h2 class="reveal">Never get fooled by five stars again.</h2>
  <p class="reveal d1">Watch real people. Hear real verdicts. Add your own. Revios is where reviews cannot lie.</p>
  <div class="stores reveal d2">
    <a class="store" href="#" data-mag><svg width="20" height="20" viewBox="0 0 24 24" fill="#204a51"><path d="M16.5 12.5c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2.1 2.4 2 1-.03 1.3-.6 2.5-.6s1.5.6 2.6.6c1 0 1.7-1 2.3-2 .7-1.1 1-2.2 1-2.3-.02-.01-2.1-.8-2.1-3Zm-2-5.6c.5-.6.8-1.5.7-2.4-.7.03-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.3.8.05 1.6-.4 2.2-1Z"/></svg><span><small>Download on the</small><b>App Store</b></span></a>
    <a class="store" href="#" data-mag><svg width="20" height="20" viewBox="0 0 24 24" fill="#204a51"><path d="M4 3.5 14 12 4 20.5c-.3-.2-.5-.6-.5-1V4.5c0-.4.2-.8.5-1Zm11.5 7 2.7-1.6 2.4 1.3c.6.4.6 1.2 0 1.6l-2.4 1.3-2.7-1.6 2-1ZM5.5 3l9 5.4-1.9 1.9L5.5 3Zm6.6 9.7 1.9 1.9-9 5.4 7.1-7.3Z"/></svg><span><small>Get it on</small><b>Google Play</b></span></a>
  </div>
</div></section>

<footer class="foot"><div class="wrap">
  <span class="brand"><img src="{LOGO}" alt="Revios logo" style="width:24px;height:24px"><b>Revios</b></span>
  <p>Sample homepage concept built by ASTRA to show a first visit that earns trust. Trending review titles, usernames and product images are Revios's own real content from revios.net. Statistics are real, cited industry research (BrightLocal and Edelman, 2026). The fake-review examples and the illustrative counters are for demonstration. Not affiliated, no endorsement implied. Built for Erisan at Revios.</p>
</div></footer>
"""

SCRIPT = r"""<script>
document.documentElement.classList.add('js');
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // hero kinetic reveal
  requestAnimationFrame(function(){document.getElementById('hero').classList.add('armed');});
  // reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  setTimeout(function(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){el.classList.add('in');});},2400);

  // nav solidify
  var nav=document.getElementById('nav');
  addEventListener('scroll',function(){nav.classList.toggle('solid',scrollY>40);},{passive:true});

  // count-up
  function countUp(el){
    var target=+el.getAttribute('data-count'),suf=el.getAttribute('data-suf')||'';
    if(reduce){el.textContent=target+suf;return;}
    var start=null,dur=1300;
    function step(t){if(!start)start=t;var p=Math.min((t-start)/dur,1);var e=1-Math.pow(1-p,3);el.textContent=Math.round(e*target)+suf;if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  }
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){countUp(e.target);cio.unobserve(e.target);}});},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});

  // fake wall stamp
  var wall=document.getElementById('wall');
  var wio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){wall.classList.add('stamped');},500);wio.unobserve(e.target);}});},{threshold:.4});
  if(wall)wio.observe(wall);

  // reviewer ring
  var ring=document.getElementById('rotwRing');
  var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){ring.classList.add('go');rio.unobserve(e.target);}});},{threshold:.5});
  if(ring)rio.observe(ring);

  // hero player
  var hp=document.getElementById('heroPlayer'),hb=document.getElementById('heroPlay');
  function toggleHero(){hp.classList.toggle('playing');}
  if(hb)hb.addEventListener('click',toggleHero);
  var seen=false;
  var pio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!seen&&!reduce){seen=true;setTimeout(function(){hp.classList.add('playing');},900);}});},{threshold:.5});
  if(hp)pio.observe(hp);

  // trending filter + play
  var grid=document.getElementById('grid');
  grid.addEventListener('click',function(e){var c=e.target.closest('.card');if(!c)return;var pl=c.querySelector('.pl');if(pl)pl.style.transform=(pl.style.transform?'':'scale(.9)');});
  document.querySelectorAll('.chip').forEach(function(ch){ch.addEventListener('click',function(){
    document.querySelectorAll('.chip').forEach(function(x){x.classList.remove('on');});ch.classList.add('on');
    var cat=ch.getAttribute('data-cat');
    document.querySelectorAll('#grid .card').forEach(function(card){card.hidden=!(cat==='All'||card.getAttribute('data-cat')===cat);});
  });});

  if(!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches){
    // cursor glow
    var glow=document.getElementById('glow');
    addEventListener('mousemove',function(e){glow.classList.add('on');glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});
    // magnetic buttons
    document.querySelectorAll('[data-mag]').forEach(function(b){
      b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();var x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform='translate('+(x*.28)+'px,'+(y*.4)+'px)';});
      b.addEventListener('mouseleave',function(){b.style.transform='';});
    });
  }
})();
</script>"""

HTML = "<title>Revios, reviews you can believe. Real video and audio reviews.</title>\n" \
       '<meta name="description" content="82% of shoppers hit a fake review last year. Revios is real video and audio reviews from verified people. See the face, hear the voice, know the honest truth before you buy.">\n' \
       "<style>"+CSS+"</style>\n"+BODY+"\n"+SCRIPT
OUT.write_text(HTML)
print("WROTE",OUT,len(HTML.encode()),"bytes")
