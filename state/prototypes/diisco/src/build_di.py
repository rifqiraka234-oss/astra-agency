#!/usr/bin/env python3
import base64, pathlib, re
A = pathlib.Path("/home/user/astra-agency/state/prototypes/diisco/assets")
OUT = pathlib.Path("/home/user/astra-agency/state/prototypes/diisco/index.html")

def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def font(f): return "data:font/woff2;base64," + b64(A/"fonts"/f)
def png(n): return "data:image/png;base64," + b64(A/n)

def svg_inline(name, cls):
    s = pathlib.Path(A/name).read_text()
    s = s[s.index("<svg"):]
    for c in set(re.findall(r'\.(cls-\d+)', s)):
        s = s.replace(c, f"{cls}-{c}")
    s = re.sub(r'<svg ', f'<svg class="{cls}" ', s, count=1)
    return s

FONTS = "".join(f"""@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:swap;src:url({font(f)}) format('woff2')}}"""
  for fam,w,f in [
    ("Schibsted Grotesk",600,"sg600.woff2"),("Schibsted Grotesk",700,"sg700.woff2"),("Schibsted Grotesk",800,"sg800.woff2"),
    ("Kumbh Sans",400,"ks400.woff2"),("Kumbh Sans",600,"ks600.woff2"),("Kumbh Sans",700,"ks700.woff2"),
  ])

LOGO = svg_inline("logo_light.svg","dl")
LOGO_F = svg_inline("logo_light.svg","dlf")
MEDIA1 = png("media_leadstoday.png"); MEDIA2 = png("media_businessdesk.png")

WORKERS = [
  ("AR","Amara R.","Chef de partie",4.9,132,"1.2 mi","£16 p/h",98,"#A414D9"),
  ("TN","Tomas N.","Bartender",4.8,87,"0.6 mi","£13 p/h",95,"#3B82F6"),
  ("PJ","Priya J.","Waiting staff",4.9,164,"2.1 mi","£12 p/h",99,"#3CC89E"),
  ("LO","Leon O.","Event staff",4.7,54,"3.0 mi","£12 p/h",90,"#F97316"),
  ("MC","Mei C.","Sous chef",5.0,71,"1.8 mi","£18 p/h",97,"#7B3FE4"),
  ("DK","Danny K.","Bar back",4.6,39,"0.9 mi","£11 p/h",88,"#EC4899"),
]
def wcard(w, i):
    ini,name,role,rating,shifts,dist,rate,score,col = w
    stars="★"*int(round(rating))
    return f"""<li class="ap" data-i="{i}" style="--d:{i*230}ms;--col:{col}">
      <div class="ap-av"><span>{ini}</span></div>
      <div class="ap-main">
        <div class="ap-top"><span class="ap-name">{name}</span><span class="ap-score">{score}</span></div>
        <div class="ap-role">{role}</div>
        <div class="ap-meta"><span class="ap-stars">{stars}</span> <b>{rating}</b> <span class="d">&middot;</span> {shifts} shifts <span class="d">&middot;</span> {dist} <span class="d">&middot;</span> {rate}</div>
      </div>
      <button class="ap-btn" data-name="{name.split()[0]}">Confirm</button>
    </li>"""
CARDS="".join(wcard(w,i) for i,w in enumerate(sorted(WORKERS,key=lambda x:-x[7])))

TESTI=[
 ("The Marlowe Inn","Boutique Hotel, Edinburgh","We used to struggle with last minute staff shortages. Now we post a shift and have qualified, rated workers applying within hours. The ranking system makes hiring decisions easy.","#A414D9"),
 ("Salt &amp; Thyme","Restaurant, Bristol","The flat fee per shift makes budgeting so simple. No hidden costs, no surprises. We have built a list of favourite workers who we rehire regularly.","#3B82F6"),
 ("Marco B.","Chef, Birmingham","As a freelance chef, Diisco has been a game changer. I can see venue ratings before accepting shifts, so I know I am going somewhere professional.","#3CC89E"),
]
def tcard(t):
    who,where,q,col=t
    return f"""<figure class="tc"><div class="tc-q">&ldquo;</div><blockquote>{q}</blockquote><figcaption><span class="tc-dot" style="background:{col};box-shadow:0 0 10px {col}"></span><b>{who}</b><span class="tc-w">{where}</span></figcaption></figure>"""
TESTIS="".join(tcard(t) for t in TESTI)

HTML=f"""<title>Diisco for Venues, post a shift and watch the room fill</title>
<meta name="description" content="A live sample venue console for Diisco. Post a shift and watch ranked, rated hospitality staff apply in real time, then confirm in one tap.">
<style>
{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{
 --void:#100617;--void2:#180A2B;--panel:#1E0F3A;--panel2:#26134A;--raise:#2C1856;
 --line:#3A2363;--line2:#4A2E7A;--ink:#F5EFFF;--dim:#B7A6DA;--dim2:#8B7AB0;
 --purple:#A414D9;--purple2:#7B3FE4;--blue:#3B82F6;--mint:#3CC89E;--mint2:#6BF0C0;
 --gold:#F4B400;--pink:#EC4899;--orange:#F97316;
 --sans:'Kumbh Sans',system-ui,sans-serif;--disp:'Schibsted Grotesk','Kumbh Sans',system-ui,sans-serif;
}}
html{{-webkit-text-size-adjust:100%}}
body{{font-family:var(--sans);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;
 background:
  radial-gradient(900px 500px at 82% -6%,rgba(164,20,217,.30),transparent 60%),
  radial-gradient(760px 480px at 8% 8%,rgba(59,130,246,.20),transparent 60%),
  radial-gradient(900px 700px at 60% 108%,rgba(60,200,158,.16),transparent 60%),
  var(--void);
 background-attachment:fixed;overflow-x:hidden}}
h1,h2,h3,.disp{{font-family:var(--disp);font-weight:800;line-height:1.04;letter-spacing:-.02em}}
.wrap{{max-width:1140px;margin:0 auto;padding:0 22px}}
.reveal{{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}}
.reveal.in{{opacity:1;transform:none}}
html:not(.js) .reveal{{opacity:1;transform:none}}
.mono{{font-variant-numeric:tabular-nums;font-family:var(--disp);letter-spacing:.02em}}

/* bar */
.bar{{position:sticky;top:0;z-index:50;background:rgba(16,6,23,.72);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}}
.bar-in{{display:flex;align-items:center;gap:14px;height:68px}}
.dl{{height:26px;width:auto;display:block}}
.bar-tag{{margin-left:auto;display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:var(--mint2);background:rgba(60,200,158,.10);border:1px solid rgba(60,200,158,.34);padding:6px 12px;border-radius:999px}}
.pulse{{width:8px;height:8px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(60,200,158,.6);animation:pz 2s infinite}}
@keyframes pz{{0%{{box-shadow:0 0 0 0 rgba(60,200,158,.55)}}70%{{box-shadow:0 0 0 8px rgba(60,200,158,0)}}100%{{box-shadow:0 0 0 0 rgba(60,200,158,0)}}}}

/* hero */
.hero{{padding:58px 0 14px;position:relative}}
.kick{{display:inline-flex;align-items:center;gap:10px;font-family:var(--disp);font-weight:700;font-size:13px;color:var(--mint2);text-transform:uppercase;letter-spacing:.16em;margin-bottom:18px}}
.kick i{{width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 12px var(--mint)}}
.hero h1{{font-size:clamp(38px,7vw,72px);max-width:14ch}}
.hero h1 .g{{background:linear-gradient(96deg,var(--mint2),var(--purple) 55%,var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 60px rgba(164,20,217,.25)}}
.hero .sub{{font-size:clamp(16px,2.1vw,20px);color:var(--dim);max-width:54ch;margin-top:20px}}
.hero .note{{margin-top:16px;font-size:13.5px;color:var(--dim2);display:flex;align-items:center;gap:9px}}
.hero .note b{{color:var(--ink)}}

/* console */
.console{{margin:30px 0 6px;background:linear-gradient(180deg,var(--panel),var(--void2));border:1px solid var(--line2);border-radius:26px;
 box-shadow:0 40px 90px -40px rgba(0,0,0,.8),0 0 0 1px rgba(164,20,217,.08),0 0 80px -30px rgba(164,20,217,.4);overflow:hidden;position:relative}}
.console:before{{content:"";position:absolute;inset:0;border-radius:26px;padding:1px;background:linear-gradient(120deg,rgba(164,20,217,.5),transparent 40%,transparent 60%,rgba(60,200,158,.4));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;opacity:.6}}
.con-head{{display:flex;align-items:center;gap:12px;padding:15px 22px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.02)}}
.con-head .lg{{width:9px;height:9px;border-radius:50%;background:var(--mint);box-shadow:0 0 12px var(--mint)}}
.con-head b{{font-family:var(--disp);font-weight:700;font-size:15px}}
.con-head .clock{{margin-left:auto;font-family:var(--disp);font-size:13px;color:var(--dim);letter-spacing:.06em}}
.con-head .demo{{font-size:11px;font-weight:700;color:var(--dim2);border:1px solid var(--line2);padding:4px 9px;border-radius:999px;letter-spacing:.12em}}
.con-body{{display:grid;grid-template-columns:.92fr 1.08fr}}
@media(max-width:840px){{.con-body{{grid-template-columns:1fr}}}}

/* left: ticket */
.ticket{{padding:26px 24px;border-right:1px solid var(--line);position:relative}}
@media(max-width:840px){{.ticket{{border-right:none;border-bottom:1px solid var(--line)}}}}
.ticket h2{{font-size:21px;margin-bottom:3px}}
.ticket .lede{{font-size:13.5px;color:var(--dim2);margin-bottom:20px}}
.fld{{margin-bottom:14px}}
.fld label{{display:block;font-family:var(--disp);font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:7px}}
.fld input,.fld select{{width:100%;font-family:var(--disp);font-weight:600;font-size:15px;color:var(--ink);background:rgba(255,255,255,.04);border:1px solid var(--line2);border-radius:12px;padding:12px 13px;transition:border-color .16s,box-shadow .16s}}
.fld select{{appearance:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none'><path d='m6 9 6 6 6-6' stroke='%23B7A6DA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>");background-repeat:no-repeat;background-position:right 13px center}}
.fld input:focus,.fld select:focus{{outline:none;border-color:var(--purple);box-shadow:0 0 0 3px rgba(164,20,217,.22),0 0 22px -6px rgba(164,20,217,.6)}}
.row2{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
.post-btn{{width:100%;margin-top:8px;font-family:var(--disp);font-weight:800;font-size:16px;color:#fff;border:none;border-radius:13px;padding:15px;cursor:pointer;
 background:linear-gradient(100deg,var(--purple),var(--purple2));box-shadow:0 14px 30px -12px rgba(164,20,217,.8),0 0 0 1px rgba(255,255,255,.06) inset;transition:transform .12s,filter .2s}}
.post-btn:hover{{transform:translateY(-1px);filter:brightness(1.08)}}
.post-btn:active{{transform:translateY(0)}}
.post-btn.live{{background:linear-gradient(100deg,#1d5f4a,#155e46);box-shadow:none}}
.post-fee{{margin-top:15px;font-size:12.5px;color:var(--dim2);display:flex;gap:9px;align-items:flex-start;line-height:1.5}}
.post-fee svg{{flex:0 0 auto;margin-top:1px}}

/* right: feed */
.feed{{padding:20px 22px 24px;position:relative;background:
 radial-gradient(360px 220px at 80% 0%,rgba(164,20,217,.10),transparent 70%)}}
.feed-head{{display:flex;align-items:center;gap:14px;margin-bottom:16px}}
/* fill ring */
.ring{{position:relative;width:52px;height:52px;flex:0 0 auto}}
.ring svg{{transform:rotate(-90deg)}}
.ring .bg{{stroke:var(--line2)}}
.ring .fg{{stroke:var(--mint);stroke-linecap:round;stroke-dasharray:138;stroke-dashoffset:138;transition:stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 0 5px rgba(60,200,158,.8))}}
.ring .rt{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:14px}}
.feed-head .fh-t{{font-family:var(--disp);font-weight:800;font-size:16px;line-height:1.15}}
.feed-head .fh-s{{font-size:12.5px;color:var(--dim2)}}
.feed-head .cnt{{margin-left:auto;font-family:var(--disp);font-weight:800;font-size:12px;color:var(--void);background:var(--mint2);border-radius:999px;padding:4px 11px}}

/* scanning / empty */
.scan{{min-height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px;padding:20px}}
.radar{{position:relative;width:120px;height:120px;border-radius:50%;border:1px solid var(--line2);
 background:radial-gradient(circle,rgba(164,20,217,.10),transparent 70%)}}
.radar:before,.radar:after{{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid var(--line)}}
.radar:before{{inset:22px}} .radar:after{{inset:44px}}
.radar .sweep{{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(60,200,158,.55),transparent 32%);opacity:0}}
.radar .core{{position:absolute;top:50%;left:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:var(--mint);box-shadow:0 0 16px var(--mint)}}
.scanning .radar .sweep{{opacity:1;animation:spin 1.05s linear infinite}}
@keyframes spin{{to{{transform:rotate(360deg)}}}}
.scan .st{{font-family:var(--disp);font-weight:700;font-size:15px}}
.scan .ss{{font-size:13px;color:var(--dim2);max-width:26ch}}
.blip{{position:absolute;width:7px;height:7px;border-radius:50%;background:var(--mint2);box-shadow:0 0 10px var(--mint2);opacity:0}}
.scanning .blip{{animation:blip 1.05s ease-out infinite}}
.blip.b1{{top:26%;left:64%;animation-delay:.15s}} .blip.b2{{top:60%;left:30%;animation-delay:.5s}} .blip.b3{{top:70%;left:70%;animation-delay:.8s}}
@keyframes blip{{0%{{opacity:0;transform:scale(.4)}}40%{{opacity:1}}100%{{opacity:0;transform:scale(1.6)}}}}

/* applicant list */
.aplist{{list-style:none;display:flex;flex-direction:column;gap:11px}}
.ap{{display:flex;align-items:center;gap:13px;background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.02));border:1px solid var(--line);border-radius:16px;padding:12px 13px;
 opacity:0;transform:translateY(14px) scale(.97);animation:pop .55s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--d);position:relative}}
@keyframes pop{{to{{opacity:1;transform:none}}}}
html:not(.js) .ap{{opacity:1;transform:none;animation:none}}
.ap-av{{flex:0 0 auto;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;position:relative;
 background:conic-gradient(from 140deg,var(--col),transparent 70%);box-shadow:0 0 18px -4px var(--col)}}
.ap-av span{{position:absolute;inset:2px;border-radius:12px;background:var(--panel2);display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:16px;color:var(--ink)}}
.ap-main{{flex:1;min-width:0}}
.ap-top{{display:flex;align-items:center;gap:9px}}
.ap-name{{font-family:var(--disp);font-weight:700;font-size:15.5px}}
.ap-score{{font-family:var(--disp);font-weight:800;font-size:11px;color:var(--mint2);background:rgba(60,200,158,.12);border:1px solid rgba(60,200,158,.3);border-radius:999px;padding:2px 8px}}
.ap-role{{font-size:13px;color:var(--dim);font-weight:600;margin-top:1px}}
.ap-meta{{font-size:12px;color:var(--dim2);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
.ap-stars{{color:var(--gold);letter-spacing:-1px}}
.ap-meta .d{{opacity:.5}}
.ap-btn{{flex:0 0 auto;font-family:var(--disp);font-weight:700;font-size:13.5px;color:#fff;background:rgba(164,20,217,.16);border:1px solid var(--purple);border-radius:11px;padding:10px 16px;cursor:pointer;transition:background .18s,transform .12s,box-shadow .2s}}
.ap-btn:hover{{background:var(--purple);box-shadow:0 0 18px -4px var(--purple);transform:translateY(-1px)}}
.ap.booked{{border-color:var(--mint);box-shadow:0 0 26px -8px rgba(60,200,158,.7)}}
.ap.booked .ap-av{{background:conic-gradient(from 140deg,var(--mint),transparent 70%);box-shadow:0 0 20px -3px var(--mint)}}
.ap.booked .ap-btn{{background:var(--mint);border-color:var(--mint);color:#08160f;pointer-events:none}}
.ap.dim{{opacity:.4;filter:saturate(.55)}}

.booked-bar{{margin-top:16px;border:1px solid var(--mint);background:linear-gradient(100deg,rgba(60,200,158,.14),rgba(60,200,158,.05));border-radius:15px;padding:14px 16px;display:none;gap:13px;align-items:center;box-shadow:0 0 30px -12px rgba(60,200,158,.6)}}
.booked-bar.on{{display:flex;animation:pop .5s cubic-bezier(.2,.8,.2,1)}}
.bb-ic{{flex:0 0 auto;width:40px;height:40px;border-radius:12px;background:var(--mint);display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px -4px var(--mint)}}
.booked-bar b{{font-family:var(--disp);font-size:15px}}
.bb-sub{{font-size:12.5px;color:var(--dim);margin-top:2px}}

/* sections */
.sec{{padding:56px 0 6px}}
.sec h2{{font-size:clamp(26px,3.7vw,38px);text-align:center;max-width:20ch;margin:0 auto}}
.sec .s-sub{{text-align:center;color:var(--dim2);max-width:50ch;margin:10px auto 30px}}
.vals{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}}
@media(max-width:780px){{.vals{{grid-template-columns:1fr}}}}
.val{{background:linear-gradient(180deg,var(--panel),var(--void2));border:1px solid var(--line);border-radius:18px;padding:24px}}
.val .v-ic{{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;margin-bottom:15px;border:1px solid var(--line2)}}
.val h3{{font-size:17.5px;margin-bottom:7px}}
.val p{{font-size:14px;color:var(--dim)}}

.tgrid{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}}
@media(max-width:840px){{.tgrid{{grid-template-columns:1fr}}}}
.tc{{background:linear-gradient(180deg,var(--panel),var(--void2));border:1px solid var(--line);border-radius:18px;padding:22px;position:relative}}
.tc-q{{font-family:var(--disp);font-size:52px;line-height:.6;color:var(--purple);opacity:.5;height:26px}}
.tc blockquote{{font-size:15px;line-height:1.62;color:var(--ink)}}
.tc figcaption{{display:flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;flex-wrap:wrap}}
.tc-dot{{width:9px;height:9px;border-radius:50%}}
.tc-w{{color:var(--dim2)}}

.media{{padding:38px 0 8px;text-align:center}}
.media span{{font-family:var(--disp);font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--dim2)}}
.media-row{{display:inline-flex;align-items:center;justify-content:center;gap:22px;flex-wrap:wrap;margin-top:16px;background:rgba(255,255,255,.92);border-radius:14px;padding:14px 24px}}
.media-row img{{height:26px;width:auto}}

.cta{{margin:48px 0;border-radius:26px;padding:48px 30px;text-align:center;position:relative;overflow:hidden;border:1px solid var(--line2);
 background:radial-gradient(600px 300px at 20% -20%,rgba(164,20,217,.5),transparent 60%),radial-gradient(600px 400px at 100% 120%,rgba(60,200,158,.34),transparent 60%),var(--panel)}}
.cta h2{{font-size:clamp(26px,3.8vw,40px);position:relative}}
.cta p{{position:relative;max-width:46ch;margin:14px auto 0;color:var(--dim)}}
.cta a{{position:relative;display:inline-block;margin-top:24px;font-family:var(--disp);font-weight:800;font-size:16px;color:var(--void);background:linear-gradient(100deg,var(--mint2),#fff);padding:15px 28px;border-radius:13px;text-decoration:none;box-shadow:0 0 40px -10px rgba(107,240,192,.7)}}

.foot{{padding:30px 0 50px;color:var(--dim2);font-size:13px;text-align:center;border-top:1px solid var(--line)}}
.dl-foot{{height:20px;opacity:.9;margin-bottom:14px}}
.foot .fnote{{max-width:62ch;margin:0 auto 8px;color:var(--dim2)}}

/* mobile */
@media(max-width:560px){{
 .ticket{{padding:22px 18px}} .feed{{padding:18px 16px 22px}}
 .con-head{{flex-wrap:wrap;row-gap:4px}} .con-head .clock{{margin-left:auto}}
 .post-btn{{font-size:15px;padding:14px 10px}}
 .ap{{flex-wrap:wrap;column-gap:12px;row-gap:0}}
 .ap-av{{order:1}} .ap-main{{order:2;flex:1 1 calc(100% - 60px)}}
 .ap-btn{{order:3;flex:1 1 100%;margin-top:11px;padding:11px}}
 .feed-head{{flex-wrap:wrap}} .feed-head .cnt{{order:3}}
}}
/* no-JS + reduced motion */
html:not(.js) .scan{{display:none}}
html:not(.js) #apList{{display:flex!important}}
@media (prefers-reduced-motion: reduce){{
 .reveal{{transition:none}} .ap{{animation:none;opacity:1;transform:none}}
 .radar .sweep,.blip,.pulse{{animation:none!important}} .ring .fg{{transition:none}}
 .post-btn:hover,.ap-btn:hover{{transform:none}}
}}
[hidden]{{display:none!important}}
</style>

<div class="bar"><div class="wrap bar-in">
  {LOGO}
  <span class="bar-tag"><span class="pulse"></span>Live sample by ASTRA</span>
</div></div>

<header class="hero" id="top"><div class="wrap">
  <span class="kick reveal"><i></i>Friday, 18:04 &middot; service in two hours</span>
  <h1 class="reveal">Post a shift.<br><span class="g">Watch the room fill.</span></h1>
  <p class="sub reveal">Your worker app already sings. This is the side that pays given the same energy, one screen where a manager drops a shift and ranked, rated staff light up in real time. Post one below and watch it happen.</p>
  <p class="note reveal"><b>Live demo.</b> Hit post and the floor fills, exactly as a venue would see it.</p>

  <section class="console reveal" aria-label="Diisco venue console demo">
    <div class="con-head"><span class="lg"></span><b>Diisco venue console</b><span class="clock mono" id="clock">18:04</span><span class="demo">DEMO</span></div>
    <div class="con-body">
      <form class="ticket" id="shiftForm" novalidate>
        <h2>Drop a shift</h2>
        <p class="lede">Role, date, pay rate. Two taps and it is live to your ranked pool.</p>
        <div class="fld"><label for="role">Role</label>
          <select id="role" name="role"><option>Chef de partie</option><option>Sous chef</option><option>Bartender</option><option>Waiting staff</option><option>Event staff</option><option>Bar back</option></select></div>
        <div class="row2">
          <div class="fld"><label for="date">Date</label><input id="date" value="Fri 4 Sep" autocomplete="off"></div>
          <div class="fld"><label for="hours">Hours</label><input id="hours" value="6" inputmode="numeric" autocomplete="off"></div>
        </div>
        <div class="row2">
          <div class="fld"><label for="time">Start</label><input id="time" value="17:00" autocomplete="off"></div>
          <div class="fld"><label for="rate">Pay rate</label><input id="rate" value="£15 p/h" autocomplete="off"></div>
        </div>
        <button class="post-btn" id="postBtn" type="submit">Post shift to your pool</button>
        <p class="post-fee"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" stroke="#8B7AB0" stroke-width="1.6" stroke-linejoin="round"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke="#8B7AB0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>One simple flat fee per shift instead of an hourly agency markup. You only pay when a worker checks in.</span></p>
      </form>

      <div class="feed">
        <div class="feed-head">
          <div class="ring" aria-hidden="true"><svg width="52" height="52" viewBox="0 0 52 52"><circle class="bg" cx="26" cy="26" r="22" fill="none" stroke-width="4"/><circle class="fg" id="ringFg" cx="26" cy="26" r="22" fill="none" stroke-width="4"/></svg><span class="rt mono" id="ringTxt">0/1</span></div>
          <div><div class="fh-t">Filling your shift</div><div class="fh-s" id="feedSub">Ranked by score. Sample data.</div></div>
          <span class="cnt" id="apCount" hidden>0</span>
        </div>

        <div class="scan" id="scan">
          <div class="radar"><span class="sweep"></span><span class="core"></span><span class="blip b1"></span><span class="blip b2"></span><span class="blip b3"></span></div>
          <div class="st" id="scanT">Ready when you are</div>
          <div class="ss" id="scanS">Drop a shift and watch qualified, rated staff apply within seconds.</div>
        </div>

        <ul class="aplist" id="apList" hidden>{CARDS}</ul>

        <div class="booked-bar" id="bookedBar" role="status" aria-live="polite">
          <span class="bb-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7" stroke="#08160f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <div><b id="bbName">Shift filled</b><div class="bb-sub" id="bbSub"></div></div>
        </div>
      </div>
    </div>
  </section>
</div></header>

<section class="sec"><div class="wrap">
  <h2 class="reveal">Everything the paying side actually needs</h2>
  <p class="s-sub reveal">Straight from how Diisco already works, pulled forward so a venue feels it in the first ten seconds.</p>
  <div class="vals">
    <div class="val reveal"><div class="v-ic" style="background:rgba(164,20,217,.12)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M7 8h7a3 3 0 0 1 0 6H8" stroke="#C77DF0" stroke-width="1.7" stroke-linecap="round"/></svg></div><h3>One flat fee per shift</h3><p>No hourly rates, no long contracts, no hidden agency markup. Staffing costs you can actually budget.</p></div>
    <div class="val reveal"><div class="v-ic" style="background:rgba(59,130,246,.14)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="m12 3 2.5 5 5.5.8-4 3.9 1 5.5L12 21l-5-2.9 1-5.5-4-3.9 5.5-.8L12 3Z" stroke="#7FB0FF" stroke-width="1.5" stroke-linejoin="round"/></svg></div><h3>Ranked worker access</h3><p>Browse staff by performance score and read past ratings before you book. Hire with confidence every time.</p></div>
    <div class="val reveal"><div class="v-ic" style="background:rgba(60,200,158,.14)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="#6BF0C0" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Build your venue rep</h3><p>Earn ratings from trusted workers, become a go to venue, and pull higher ranked staff over time.</p></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <h2 class="reveal">Venues and staff already saying it</h2>
  <div class="tgrid reveal" style="margin-top:28px">{TESTIS}</div>
</div></section>

<section class="media"><div class="wrap">
  <span>As seen on</span>
  <div class="media-row"><img src="{MEDIA1}" alt="Leeds Today"><img src="{MEDIA2}" alt="The Business Desk"></div>
</div></section>

<section class="wrap"><div class="cta reveal">
  <h2>The venue side, live and clickable</h2>
  <p>Same energy as your worker app, built for the manager who actually pays. Happy to walk you through how it could sit on top of what you have already.</p>
  <a href="#top">Run the console again</a>
</div></section>

<footer class="foot"><div class="wrap">
  {LOGO_F.replace('class="dlf"','class="dlf dl-foot"',1)}
  <p class="fnote">Sample venue console built by ASTRA to show the Diisco venue experience. Applicant profiles and the shift shown are demonstration data, not a live Diisco product. Venue and staff quotes are from Diisco's own site.</p>
  <p>No affiliation or endorsement implied. Built for Alex at Diisco.</p>
</div></footer>

<script>
document.documentElement.classList.add('js');
(function(){{
  var io=new IntersectionObserver(function(es){{es.forEach(function(e){{if(e.isIntersecting){{e.target.classList.add('in');io.unobserve(e.target);}}}});}},{{threshold:.12}});
  document.querySelectorAll('.reveal').forEach(function(el){{io.observe(el);}});
  setTimeout(function(){{document.querySelectorAll('.reveal:not(.in)').forEach(function(el){{el.classList.add('in');}});}},2000);

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var form=document.getElementById('shiftForm'),list=document.getElementById('apList'),scan=document.getElementById('scan'),
      feedSub=document.getElementById('feedSub'),postBtn=document.getElementById('postBtn'),cnt=document.getElementById('apCount'),
      bar=document.getElementById('bookedBar'),bbName=document.getElementById('bbName'),bbSub=document.getElementById('bbSub'),
      scanT=document.getElementById('scanT'),scanS=document.getElementById('scanS'),
      ringFg=document.getElementById('ringFg'),ringTxt=document.getElementById('ringTxt');
  var feed=list.parentNode, cards=[].slice.call(list.querySelectorAll('.ap')), posted=false, busy=false;

  function setRing(v){{ ringFg.style.strokeDashoffset=(138-138*v).toFixed(1); }}
  function reset(){{
    posted=false; bar.classList.remove('on'); list.hidden=true; cnt.hidden=true; cnt.textContent='0';
    scan.style.display=''; scan.classList.remove('scanning'); scanT.textContent='Ready when you are';
    scanS.textContent='Drop a shift and watch qualified, rated staff apply within seconds.';
    feedSub.textContent='Ranked by score. Sample data.'; setRing(0); ringTxt.textContent='0/1';
    postBtn.textContent='Post shift to your pool'; postBtn.classList.remove('live');
    cards.forEach(function(c){{c.classList.remove('booked','dim');var b=c.querySelector('.ap-btn');if(b)b.textContent='Confirm';}});
  }}
  function fill(){{
    var role=document.getElementById('role').value,date=document.getElementById('date').value,time=document.getElementById('time').value;
    scan.style.display='none'; list.hidden=false; cnt.hidden=false;
    feedSub.textContent=role+' &middot; '+date+' at '+time+' &middot; sample data';
    feedSub.innerHTML=role+' &middot; '+date+' at '+time+' &middot; sample data';
    var n=0, step=reduce?0:230;
    cards.forEach(function(c,i){{
      c.style.animation='none'; void c.offsetWidth; c.style.animation='';
      setTimeout(function(){{n++;cnt.textContent=n;}}, i*step+ (reduce?0:200));
    }});
    postBtn.textContent='Shift is live, post again to reset'; postBtn.classList.add('live'); busy=false;
  }}
  form.addEventListener('submit',function(ev){{
    ev.preventDefault();
    if(busy) return;
    if(posted){{ reset(); return; }}
    posted=true; busy=true; bar.classList.remove('on');
    postBtn.textContent='Posting…';
    scan.style.display=''; scanT.textContent='Scanning your ranked pool';
    scanS.textContent='Matching staff by score, rating and distance…';
    if(reduce){{ fill(); return; }}
    scan.classList.add('scanning');
    setTimeout(function(){{ scan.classList.remove('scanning'); fill(); }}, 1050);
  }});
  list.addEventListener('click',function(ev){{
    var btn=ev.target.closest('.ap-btn'); if(!btn) return;
    var card=btn.closest('.ap'); if(card.classList.contains('booked')) return;
    cards.forEach(function(c){{ if(c!==card) c.classList.add('dim'); }});
    card.classList.add('booked'); btn.textContent='Booked';
    setRing(1); ringTxt.textContent='1/1';
    var name=btn.getAttribute('data-name'),role=document.getElementById('role').value,date=document.getElementById('date').value,
        hours=document.getElementById('hours').value,time=document.getElementById('time').value,prate=document.getElementById('rate').value;
    bbName.textContent=name+' locked in for your '+role.toLowerCase()+' shift';
    bbSub.textContent=date+' at '+time+', '+hours+' hrs at '+prate+'. One flat Diisco fee, secure payment released when they check in.';
    bar.classList.add('on');
    bar.scrollIntoView({{behavior:'smooth',block:'nearest'}});
  }});
  // ambient clock drift for life
  var mins=244;
  setInterval(function(){{ mins=(mins+1)%1440; var h=(''+Math.floor(mins/60)).padStart(2,'0'),m=(''+(mins%60)).padStart(2,'0'); document.getElementById('clock').textContent=h+':'+m; }}, 8000);
}})();
</script>
"""
OUT.write_text(HTML)
print("WROTE", OUT, len(HTML.encode()), "bytes")
