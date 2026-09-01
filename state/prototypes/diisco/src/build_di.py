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
    # scope internal class names to avoid collisions
    ids = set(re.findall(r'\.(cls-\d+)', s))
    for c in ids:
        s = s.replace(c, f"{cls}-{c}")
    s = re.sub(r'<svg ', f'<svg class="{cls}" ', s, count=1)
    return s

FONTS = "".join(f"""@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:swap;src:url({font(f)}) format('woff2')}}"""
  for fam,w,f in [
    ("Schibsted Grotesk",600,"sg600.woff2"),("Schibsted Grotesk",700,"sg700.woff2"),("Schibsted Grotesk",800,"sg800.woff2"),
    ("Kumbh Sans",400,"ks400.woff2"),("Kumbh Sans",600,"ks600.woff2"),("Kumbh Sans",700,"ks700.woff2"),
  ])

LOGO = svg_inline("logo.svg","dl")
MEDIA1 = png("media_leadstoday.png")
MEDIA2 = png("media_businessdesk.png")

# demo applicant pool (SAMPLE data, clearly labelled)
WORKERS = [
  ("AR","Amara R.","Chef de partie",4.9,132,"1.2 mi","£16 p/h",98,"#5D50CE"),
  ("TN","Tomas N.","Bartender",4.8,87,"0.6 mi","£13 p/h",95,"#1863DC"),
  ("PJ","Priya J.","Waiting staff",4.9,164,"2.1 mi","£12 p/h",99,"#A414D9"),
  ("LO","Leon O.","Event staff",4.7,54,"3.0 mi","£12 p/h",90,"#D85822"),
  ("MC","Mei C.","Sous chef",5.0,71,"1.8 mi","£18 p/h",97,"#3CC89E"),
  ("DK","Danny K.","Bar back",4.6,39,"0.9 mi","£11 p/h",88,"#5D50CE"),
]
def wcard(w, i):
    ini,name,role,rating,shifts,dist,rate,score,col = w
    stars = "★"*int(round(rating))
    return f"""<li class="ap" data-score="{score}" style="--d:{i*280}ms;--col:{col}">
      <div class="ap-av" style="background:{col}">{ini}</div>
      <div class="ap-main">
        <div class="ap-top"><span class="ap-name">{name}</span><span class="ap-badge">Ranked {score}</span></div>
        <div class="ap-role">{role}</div>
        <div class="ap-meta"><span class="ap-stars">{stars}</span> <b>{rating}</b> <span class="ap-dot">&middot;</span> {shifts} shifts <span class="ap-dot">&middot;</span> {dist} <span class="ap-dot">&middot;</span> {rate}</div>
      </div>
      <button class="ap-btn" data-name="{name.split()[0]}" data-rate="{rate}">Confirm</button>
    </li>"""
CARDS = "".join(wcard(w,i) for i,(w) in enumerate(sorted(WORKERS,key=lambda x:-x[7])))

TESTI = [
  ("The Marlowe Inn","Boutique Hotel, Edinburgh","We used to struggle with last minute staff shortages. Now we post a shift and have qualified, rated workers applying within hours. The ranking system makes hiring decisions easy.","#5D50CE"),
  ("Salt &amp; Thyme","Restaurant, Bristol","The flat fee per shift makes budgeting so simple. No hidden costs, no surprises. We have built a list of favourite workers who we rehire regularly.","#1863DC"),
  ("Marco B.","Chef, Birmingham","As a freelance chef, Diisco has been a game changer. I can see venue ratings before accepting shifts, so I know I am going somewhere professional.","#A414D9"),
]
def tcard(t):
    who,where,quote,col=t
    return f"""<figure class="tc"><blockquote>{quote}</blockquote><figcaption><span class="tc-dot" style="background:{col}"></span><b>{who}</b><span class="tc-where">{where}</span></figcaption></figure>"""
TESTIS="".join(tcard(t) for t in TESTI)

HTML = f"""<title>Diisco for Venues, post a shift and watch it fill</title>
<meta name="description" content="A sample venue console for Diisco. Post a shift and watch ranked, rated hospitality workers apply in real time, then confirm in one tap.">
<style>
{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{
 --plum:#2A0E4F;--primary:#31125D;--purple:#5D50CE;--bright:#A414D9;--blue:#1863DC;
 --mint:#159E76;--mint-b:#3CC89E;--orange:#D85822;--lilac:#E4D1FF;--lilac-2:#F3ECFC;
 --cream:#FFFDF7;--paper:#FFFFFF;--ink:#241634;--muted:#6B5E7E;--line:#ECE6F4;
 --shadow:0 18px 50px -22px rgba(42,14,79,.45);
 --sans:'Kumbh Sans',system-ui,sans-serif;--disp:'Schibsted Grotesk','Kumbh Sans',system-ui,sans-serif;
}}
html{{-webkit-text-size-adjust:100%}}
body{{font-family:var(--sans);background:var(--cream);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased}}
h1,h2,h3,.disp{{font-family:var(--disp);font-weight:800;line-height:1.05;letter-spacing:-.02em}}
.wrap{{max-width:1120px;margin:0 auto;padding:0 22px}}
.reveal{{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}}
.reveal.in{{opacity:1;transform:none}}
html:not(.js) .reveal{{opacity:1;transform:none}}

/* top bar */
.bar{{position:sticky;top:0;z-index:40;background:rgba(255,253,247,.86);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}}
.bar-in{{display:flex;align-items:center;gap:14px;height:66px}}
.dl{{height:30px;width:auto;display:block}}
.tag-sample{{margin-left:auto;font-size:12px;font-weight:700;color:var(--purple);background:var(--lilac-2);border:1px solid var(--lilac);padding:5px 11px;border-radius:999px;letter-spacing:.01em}}
.bar-cta{{font-family:var(--disp);font-weight:700;font-size:14px;color:#fff;background:var(--bright);padding:9px 16px;border-radius:11px;text-decoration:none}}

/* hero */
.hero{{padding:54px 0 20px;position:relative;overflow:hidden}}
.hero:before{{content:"";position:absolute;inset:-40% -20% auto auto;width:60%;height:520px;background:radial-gradient(closest-side,rgba(164,20,217,.14),transparent);pointer-events:none}}
.kick{{display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:13px;color:var(--purple);text-transform:uppercase;letter-spacing:.12em;margin-bottom:16px}}
.kick i{{width:8px;height:8px;border-radius:50%;background:var(--mint-b);box-shadow:0 0 0 4px rgba(60,200,158,.2)}}
.hero h1{{font-size:clamp(34px,6.2vw,60px);max-width:15ch}}
.hero h1 .g{{background:linear-gradient(96deg,var(--bright),var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent}}
.hero p.sub{{font-size:clamp(16px,2.1vw,20px);color:var(--muted);max-width:52ch;margin-top:18px}}
.hero-note{{margin-top:16px;font-size:13px;color:var(--muted);display:flex;align-items:center;gap:8px}}
.hero-note b{{color:var(--ink)}}

/* console */
.console{{margin:30px 0 8px;background:var(--paper);border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow);overflow:hidden}}
.con-head{{display:flex;align-items:center;gap:12px;padding:16px 22px;background:linear-gradient(100deg,var(--primary),var(--bright));color:#fff}}
.con-head .dot{{width:11px;height:11px;border-radius:50%;background:var(--mint-b);box-shadow:0 0 0 4px rgba(60,200,158,.28)}}
.con-head b{{font-family:var(--disp);font-weight:700;letter-spacing:-.01em}}
.con-head .live{{margin-left:auto;font-size:12px;font-weight:700;opacity:.9;text-transform:uppercase;letter-spacing:.1em}}
.con-body{{display:grid;grid-template-columns:1fr 1.15fr;gap:0}}
@media(max-width:820px){{.con-body{{grid-template-columns:1fr}}}}

/* left: post-shift form */
.post{{padding:26px 24px;border-right:1px solid var(--line)}}
@media(max-width:820px){{.post{{border-right:none;border-bottom:1px solid var(--line)}}}}
.post h2{{font-size:20px;margin-bottom:4px}}
.post .lede{{font-size:14px;color:var(--muted);margin-bottom:18px}}
.fld{{margin-bottom:14px}}
.fld label{{display:block;font-size:12.5px;font-weight:700;color:var(--ink);margin-bottom:6px;letter-spacing:.01em}}
.fld input,.fld select{{width:100%;font-family:var(--sans);font-size:15px;color:var(--ink);background:var(--cream);border:1.5px solid var(--line);border-radius:12px;padding:11px 13px;transition:border-color .15s,box-shadow .15s}}
.fld input:focus,.fld select:focus{{outline:none;border-color:var(--bright);box-shadow:0 0 0 4px rgba(164,20,217,.12)}}
.row2{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
.post-btn{{width:100%;margin-top:6px;font-family:var(--disp);font-weight:800;font-size:16px;color:#fff;background:var(--bright);border:none;border-radius:13px;padding:14px;cursor:pointer;transition:transform .12s,background .2s,box-shadow .2s;box-shadow:0 12px 24px -12px rgba(164,20,217,.7)}}
.post-btn:hover{{transform:translateY(-1px);background:#9111c2}}
.post-btn:active{{transform:translateY(0)}}
.post-btn[disabled]{{background:var(--mint);box-shadow:none;cursor:default}}
.post-fee{{margin-top:14px;font-size:12.5px;color:var(--muted);display:flex;gap:8px;align-items:flex-start}}
.post-fee svg{{flex:0 0 auto;margin-top:1px}}

/* right: applicants */
.apps{{padding:22px 22px 24px;background:linear-gradient(180deg,var(--lilac-2),var(--paper) 120px);position:relative;min-height:340px}}
.apps-head{{display:flex;align-items:center;gap:10px;margin-bottom:6px}}
.apps-head b{{font-family:var(--disp);font-size:16px}}
.apps-count{{font-size:12px;font-weight:700;color:#fff;background:var(--blue);border-radius:999px;padding:2px 9px;min-width:22px;text-align:center}}
.apps-sub{{font-size:12.5px;color:var(--muted);margin-bottom:14px}}
.empty{{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:var(--muted);padding:46px 20px;gap:12px}}
.empty svg{{opacity:.5}}
.empty p{{font-size:14px;max-width:26ch}}
.aplist{{list-style:none;display:flex;flex-direction:column;gap:11px}}
.ap{{display:flex;align-items:center;gap:13px;background:var(--paper);border:1px solid var(--line);border-radius:15px;padding:12px 13px;opacity:0;transform:translateY(10px) scale(.98);animation:pop .5s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--d)}}
@keyframes pop{{to{{opacity:1;transform:none}}}}
html:not(.js) .ap{{opacity:1;transform:none;animation:none}}
.ap-av{{flex:0 0 auto;width:46px;height:46px;border-radius:13px;color:#fff;font-family:var(--disp);font-weight:800;font-size:16px;display:flex;align-items:center;justify-content:center}}
.ap-main{{flex:1;min-width:0}}
.ap-top{{display:flex;align-items:center;gap:9px}}
.ap-name{{font-family:var(--disp);font-weight:700;font-size:15.5px}}
.ap-badge{{font-size:10.5px;font-weight:700;color:var(--mint);background:rgba(60,200,158,.14);border-radius:999px;padding:2px 8px;letter-spacing:.02em}}
.ap-role{{font-size:13px;color:var(--purple);font-weight:600}}
.ap-meta{{font-size:12px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
.ap-stars{{color:#F4B400;letter-spacing:-1px}}
.ap-dot{{opacity:.5}}
.ap-btn{{flex:0 0 auto;font-family:var(--disp);font-weight:700;font-size:13.5px;color:#fff;background:var(--primary);border:none;border-radius:11px;padding:10px 15px;cursor:pointer;transition:background .18s,transform .12s}}
.ap-btn:hover{{background:var(--bright);transform:translateY(-1px)}}
.ap.booked{{border-color:var(--mint-b);background:linear-gradient(0deg,rgba(60,200,158,.08),rgba(60,200,158,.08)),var(--paper)}}
.ap.booked .ap-btn{{background:var(--mint);pointer-events:none}}
.ap.dim{{opacity:.5;filter:saturate(.7)}}
@media(max-width:480px){{.ap{{flex-wrap:wrap}}.ap-main{{flex:1 1 calc(100% - 60px)}}.ap-btn{{flex:1 1 100%;margin-top:10px;padding:11px}}}}

/* booked banner */
.booked-bar{{margin-top:16px;border:1.5px solid var(--mint-b);background:rgba(60,200,158,.09);border-radius:15px;padding:14px 16px;display:none;gap:12px;align-items:center}}
.booked-bar.on{{display:flex}}
.booked-bar .bb-ic{{flex:0 0 auto;width:38px;height:38px;border-radius:11px;background:var(--mint);display:flex;align-items:center;justify-content:center}}
.booked-bar b{{font-family:var(--disp)}}
.booked-bar .bb-sub{{font-size:12.5px;color:var(--muted)}}

/* strip */
.strip{{padding:52px 0 8px}}
.strip h2{{font-size:clamp(24px,3.4vw,34px);text-align:center;max-width:20ch;margin:0 auto 8px}}
.strip .s-sub{{text-align:center;color:var(--muted);max-width:48ch;margin:0 auto 30px}}
.vals{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}}
@media(max-width:760px){{.vals{{grid-template-columns:1fr}}}}
.val{{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:22px}}
.val .v-ic{{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}}
.val h3{{font-size:17px;margin-bottom:6px}}
.val p{{font-size:14px;color:var(--muted)}}

/* testimonials */
.testi{{padding:50px 0 10px}}
.testi h2{{font-size:clamp(24px,3.4vw,34px);text-align:center;margin-bottom:28px}}
.tgrid{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}}
@media(max-width:820px){{.tgrid{{grid-template-columns:1fr}}}}
.tc{{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:22px}}
.tc blockquote{{font-size:15px;line-height:1.6}}
.tc figcaption{{display:flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;flex-wrap:wrap}}
.tc-dot{{width:9px;height:9px;border-radius:50%}}
.tc-where{{color:var(--muted)}}

/* media */
.media{{padding:34px 0 18px;text-align:center}}
.media span{{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}}
.media-row{{display:flex;align-items:center;justify-content:center;gap:34px;flex-wrap:wrap;margin-top:16px}}
.media-row img{{height:30px;width:auto;opacity:.8}}

/* cta */
.cta{{margin:44px 0;background:linear-gradient(100deg,var(--primary),var(--bright));border-radius:24px;padding:44px 30px;text-align:center;color:#fff;position:relative;overflow:hidden}}
.cta:before{{content:"";position:absolute;inset:auto auto -40% -10%;width:50%;height:360px;background:radial-gradient(closest-side,rgba(60,200,158,.4),transparent)}}
.cta h2{{font-size:clamp(24px,3.6vw,36px);position:relative}}
.cta p{{position:relative;max-width:44ch;margin:12px auto 0;opacity:.92}}
.cta a{{position:relative;display:inline-block;margin-top:22px;font-family:var(--disp);font-weight:800;font-size:16px;color:var(--primary);background:#fff;padding:14px 26px;border-radius:13px;text-decoration:none}}

/* footer */
.foot{{padding:26px 0 46px;color:var(--muted);font-size:13px;text-align:center;border-top:1px solid var(--line)}}
.foot .fnote{{max-width:60ch;margin:0 auto 8px}}
.dl-foot{{height:22px;opacity:.8;margin-bottom:12px}}
@media (prefers-reduced-motion: reduce){{
 .reveal{{transition:none}} .ap{{animation:none;opacity:1;transform:none}}
 .post-btn:hover,.ap-btn:hover{{transform:none}}
}}
[hidden]{{display:none!important}}
</style>

<div class="bar"><div class="wrap bar-in">
  {LOGO}
  <span class="tag-sample">Sample venue console by ASTRA</span>
</div></div>

<header class="hero"><div class="wrap">
  <span class="kick reveal"><i></i>The side that pays, built out</span>
  <h1 class="reveal">Post a shift. <span class="g">Watch it fill.</span></h1>
  <p class="sub reveal">Your worker side already sings. This is the venue side finally given the same care, one screen where a manager posts a shift and ranked, rated staff apply in real time. Try it below.</p>
  <p class="hero-note reveal"><b>Live demo.</b> Post a shift and the applicants roll in, exactly as a venue would see it.</p>

  <section class="console reveal" aria-label="Venue console demo">
    <div class="con-head"><span class="dot"></span><b>Diisco venue console</b><span class="live">Demo</span></div>
    <div class="con-body">
      <form class="post" id="shiftForm" novalidate>
        <h2>Post a shift</h2>
        <p class="lede">Role, date, pay rate. Two taps and it is live to your ranked pool.</p>
        <div class="fld">
          <label for="role">Role</label>
          <select id="role" name="role">
            <option>Chef de partie</option><option>Sous chef</option><option>Bartender</option>
            <option>Waiting staff</option><option>Event staff</option><option>Bar back</option>
          </select>
        </div>
        <div class="row2">
          <div class="fld"><label for="date">Date</label><input id="date" name="date" type="text" value="Fri 4 Sep" autocomplete="off"></div>
          <div class="fld"><label for="hours">Hours</label><input id="hours" name="hours" type="text" value="6" inputmode="numeric" autocomplete="off"></div>
        </div>
        <div class="row2">
          <div class="fld"><label for="time">Start time</label><input id="time" name="time" type="text" value="17:00" autocomplete="off"></div>
          <div class="fld"><label for="rate">Pay rate</label><input id="rate" name="rate" type="text" value="£15 p/h" autocomplete="off"></div>
        </div>
        <button class="post-btn" id="postBtn" type="submit">Post shift</button>
        <p class="post-fee"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" stroke="#6B5E7E" stroke-width="1.6" stroke-linejoin="round"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke="#6B5E7E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>One simple flat fee per shift instead of an hourly agency markup. You only pay when a worker checks in.</span></p>
      </form>

      <div class="apps">
        <div class="apps-head"><b>Applicants</b><span class="apps-count" id="apCount">0</span></div>
        <p class="apps-sub" id="apSub">Ranked by performance score. Sample data for the demo.</p>
        <div class="empty" id="empty">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#A414D9" stroke-width="1.5"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" stroke="#A414D9" stroke-width="1.5" stroke-linecap="round"/></svg>
          <p>Post the shift and watch qualified, rated workers apply within seconds.</p>
        </div>
        <ul class="aplist" id="apList" hidden>{CARDS}</ul>
        <div class="booked-bar" id="bookedBar" role="status" aria-live="polite">
          <span class="bb-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <div><b id="bbName">Shift filled</b><div class="bb-sub" id="bbSub"></div></div>
        </div>
      </div>
    </div>
  </section>
</div></header>

<section class="strip"><div class="wrap">
  <h2 class="reveal">Everything the paying side actually needs</h2>
  <p class="s-sub reveal">Straight from how Diisco already works, brought forward so a venue sees it in the first ten seconds.</p>
  <div class="vals">
    <div class="val reveal"><div class="v-ic" style="background:var(--lilac-2)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M7 8h7a3 3 0 0 1 0 6H8" stroke="#5D50CE" stroke-width="1.7" stroke-linecap="round"/></svg></div><h3>One flat fee per shift</h3><p>No hourly rates, no long contracts, no hidden agency markup. Costs you can actually budget.</p></div>
    <div class="val reveal"><div class="v-ic" style="background:rgba(24,99,220,.1)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="m12 3 2.5 5 5.5.8-4 3.9 1 5.5L12 21l-5-2.9 1-5.5-4-3.9 5.5-.8L12 3Z" stroke="#1863DC" stroke-width="1.5" stroke-linejoin="round"/></svg></div><h3>Ranked worker access</h3><p>Browse staff by performance score and read past ratings before you book. Hire with confidence every time.</p></div>
    <div class="val reveal"><div class="v-ic" style="background:rgba(60,200,158,.14)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="#159E76" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Build your venue rep</h3><p>Earn ratings from trusted workers, become a go to venue, and attract higher ranked staff over time.</p></div>
  </div>
</div></section>

<section class="testi"><div class="wrap">
  <h2 class="reveal">Venues and workers already saying it</h2>
  <div class="tgrid reveal">{TESTIS}</div>
</div></section>

<section class="media"><div class="wrap">
  <span>As seen on</span>
  <div class="media-row"><img src="{MEDIA1}" alt="Leeds Today"><img src="{MEDIA2}" alt="The Business Desk"></div>
</div></section>

<section class="wrap"><div class="cta reveal">
  <h2>This is the venue side, live and clickable</h2>
  <p>Same energy as your worker app, built for the manager who actually pays. Happy to walk you through how it could sit on top of what you already have.</p>
  <a href="#top">Take another run at the console</a>
</div></section>

<footer class="foot"><div class="wrap">
  {svg_inline("logo.svg","dlf").replace('class="dlf"','class="dlf dl-foot"',1)}
  <p class="fnote">Sample venue console built by ASTRA to show the Diisco venue experience. Applicant profiles and shift details are demonstration data, not a live Diisco product. Venue and worker quotes are from Diisco's own site.</p>
  <p>Not affiliated endorsement implied. Built for Alex at Diisco.</p>
</div></footer>

<script>
document.documentElement.classList.add('js');
(function(){{
  // reveal
  var io=new IntersectionObserver(function(es){{es.forEach(function(e){{if(e.isIntersecting){{e.target.classList.add('in');io.unobserve(e.target);}}}});}},{{threshold:.12}});
  document.querySelectorAll('.reveal').forEach(function(el){{io.observe(el);}});
  setTimeout(function(){{document.querySelectorAll('.reveal:not(.in)').forEach(function(el){{el.classList.add('in');}});}},1900);

  var form=document.getElementById('shiftForm'), list=document.getElementById('apList'),
      empty=document.getElementById('empty'), count=document.getElementById('apCount'),
      sub=document.getElementById('apSub'), postBtn=document.getElementById('postBtn'),
      bar=document.getElementById('bookedBar'), bbName=document.getElementById('bbName'), bbSub=document.getElementById('bbSub');
  var cards=[].slice.call(list.querySelectorAll('.ap')), posted=false;

  function reset(){{
    posted=false; bar.classList.remove('on'); list.hidden=true; empty.hidden=false; count.textContent='0';
    postBtn.textContent='Post shift'; postBtn.disabled=false;
    cards.forEach(function(c){{c.classList.remove('booked','dim'); var b=c.querySelector('.ap-btn'); if(b) b.textContent='Confirm';}});
  }}
  form.addEventListener('submit',function(ev){{
    ev.preventDefault();
    if(posted){{ reset(); return; }}
    posted=true;
    var role=document.getElementById('role').value, date=document.getElementById('date').value, time=document.getElementById('time').value;
    sub.textContent='Ranked by performance score for '+role+', '+date+' at '+time+'. Sample data.';
    empty.hidden=true; list.hidden=false; bar.classList.remove('on');
    postBtn.textContent='Shift is live, posting again resets'; postBtn.disabled=false;
    // re-trigger stagger + count up
    var n=0;
    cards.forEach(function(c,i){{
      c.style.animation='none'; void c.offsetWidth; c.style.animation='';
      setTimeout(function(){{ n++; count.textContent=n; }}, i*280+240);
    }});
  }});
  list.addEventListener('click',function(ev){{
    var btn=ev.target.closest('.ap-btn'); if(!btn) return;
    var card=btn.closest('.ap'); if(card.classList.contains('booked')) return;
    cards.forEach(function(c){{ if(c!==card) c.classList.add('dim'); }});
    card.classList.add('booked'); btn.textContent='Booked';
    var name=btn.getAttribute('data-name'),
        role=document.getElementById('role').value, date=document.getElementById('date').value,
        hours=document.getElementById('hours').value, time=document.getElementById('time').value,
        prate=document.getElementById('rate').value;
    bbName.textContent=name+' confirmed for your '+role.toLowerCase()+' shift';
    bbSub.textContent=date+' at '+time+', '+hours+' hrs at '+prate+'. One flat Diisco fee, secure payment released when they check in.';
    bar.classList.add('on');
    bar.scrollIntoView({{behavior:'smooth',block:'nearest'}});
  }});
}})();
</script>
"""
OUT.write_text(HTML)
print("WROTE", OUT, len(HTML.encode()), "bytes")
