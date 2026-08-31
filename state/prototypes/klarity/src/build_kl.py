#!/usr/bin/env python3
import base64, json, pathlib
A=pathlib.Path("/home/user/astra-agency/state/prototypes/klarity/assets")
OUT=pathlib.Path("/home/user/astra-agency/state/prototypes/klarity/index.html")
def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
FAM={"ps400":"Plex Sans","ps500":"Plex Sans","ps600":"Plex Sans","ps700":"Plex Sans","pm500":"Plex Mono"}
def face(n,w):
    return (f"@font-face{{font-family:'{FAM[n]}';font-style:normal;font-weight:{w};font-display:swap;"
            f"src:url(data:font/woff2;base64,{b64(A/'fonts'/(n+'.woff2'))}) format('woff2')}}")
fonts="".join([face("ps400","400"),face("ps500","500"),face("ps600","600"),face("ps700","700"),face("pm500","500")])
def jpg(n): return "data:image/jpeg;base64,"+b64(A/f"web_{n}.jpg")
def png(n): return "data:image/png;base64,"+b64(A/f"{n}.png")
IMG={n:jpg(n) for n in ["products","contract","build","operate","cases","julien","loic","fabien"]}
LOGO={n:png("m_"+n) for n in ["cea","systemx","etaia","ovh"]}

STAGES=[
 dict(id="contract",tag="01 · Decide",name="Klarity Contract",
   line="Agree what the AI must do, and whether it is worth building, before a line of code.",
   get=["Formalise the AI function, its risks and its expected return on investment","A shared spec business, dev and compliance teams all sign off on","A clear go or no go on starting development"],
   who="Business experts, product owners and the AI team leader",img="contract"),
 dict(id="build",tag="02 · Prove",name="Klarity Build",
   line="Develop, evaluate and validate the model before it ever reaches production.",
   get=["Test robustness, explainability, fairness and data quality","Characterise the component against the contract it was given","Catch the problems on the bench, not in front of a customer"],
   who="AI and data teams, with the product owner",img="build"),
 dict(id="operate",tag="03 · Watch",name="Klarity Operate",
   line="Monitor the AI in real production and catch it the moment it drifts from intent.",
   get=["Real time monitoring of the component in operation","Alerts when behaviour drifts, with the source identified","Compliance and AI behaviour reports, and ROI kept in view"],
   who="Operators and product owners, for the teams who run it daily",img="operate"),
]
def tabbtn(i,s):
    return f'<button class="lc-tab" data-i="{i}" role="tab" aria-selected="{"true" if i==0 else "false"}" aria-controls="pan-{s["id"]}" id="tab-{s["id"]}">{s["name"]}</button>'
def panel(i,s):
    gets="".join(f'<li>{g}</li>' for g in s["get"])
    hid="" if i==0 else " hidden"
    return f'''<div class="lc-panel" id="pan-{s['id']}" role="tabpanel" aria-labelledby="tab-{s['id']}" data-i="{i}"{hid}>
      <div class="lc-copy">
        <span class="mono tag">{s['tag']}</span>
        <h3>{s['name']}</h3>
        <p class="lc-line">{s['line']}</p>
        <p class="lc-lab mono">What you get</p>
        <ul class="lc-get">{gets}</ul>
        <p class="lc-who"><span class="mono">Who</span> {s['who']}</p>
      </div>
      <figure class="lc-screen"><img src="{IMG[s['img']]}" alt="{s['name']} workflow diagram: inputs, the {s['name']} step and its outputs" loading="lazy"><figcaption class="mono">{s['name']} · from Safenai</figcaption></figure>
    </div>'''
tabs="".join(tabbtn(i,s) for i,s in enumerate(STAGES))
panels="".join(panel(i,s) for i,s in enumerate(STAGES))

HTML=f'''<title>Klarity by Safenai — operate your AI in production with control</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Klarity is the platform to specify, validate and monitor your AI across its whole lifecycle. Leave proof of concept behind and run AI reliably, compliantly, in production.">
<style>
{fonts}
:root{{
 --void:#0A0E17; --panel:#111A28; --panel2:#0C1220; --screen:#05080F; --line:#1E2A3E;
 --ink:#EAF1FA; --dim:#96A6BE; --dimmer:#61728C;
 --cyan:#5FCCFF; --cyan-d:#2E9AD6; --ok:#5FE3AA; --warn:#FFC061;
 --sans:'Plex Sans',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
 --mono:'Plex Mono',ui-monospace,Menlo,Consolas,monospace;
}}
*{{box-sizing:border-box}}
html{{overflow-x:clip;scroll-behavior:smooth}}
body{{margin:0;background:var(--void);color:var(--ink);font-family:var(--sans);font-size:17px;
 line-height:1.62;-webkit-font-smoothing:antialiased;overflow-x:clip;
 background-image:radial-gradient(1200px 600px at 78% -8%,rgba(95,204,255,.10),transparent 60%)}}
h1,h2,h3{{margin:0;font-weight:600;line-height:1.08;letter-spacing:-.015em}}
p{{margin:0}} a{{color:inherit}} img{{display:block;max-width:100%}} button{{font-family:inherit}}
.mono{{font-family:var(--mono);font-weight:500}}
.wrap{{width:min(1180px,92vw);margin-inline:auto}}
.kick{{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--cyan)}}
.btn{{font-family:var(--sans);font-weight:600;font-size:.88rem;border:none;cursor:pointer;border-radius:8px;
 padding:.8rem 1.35rem;display:inline-flex;align-items:center;gap:.5rem;text-decoration:none;transition:.22s}}
.btn-cy{{background:var(--cyan);color:#04121C}} .btn-cy:hover{{background:#8CDBFF;transform:translateY(-2px)}}
.btn-gh{{background:transparent;color:var(--ink);border:1px solid var(--line)}} .btn-gh:hover{{border-color:var(--cyan);color:var(--cyan)}}

/* nav */
header.nav{{position:sticky;top:0;z-index:50;background:rgba(10,14,23,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}}
.nav-in{{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.85rem 0}}
.brand{{display:flex;align-items:center;gap:.6rem;text-decoration:none;color:var(--ink);font-weight:700;letter-spacing:-.02em;font-size:1.2rem}}
.brand .m{{width:26px;height:26px;border-radius:7px;background:linear-gradient(150deg,var(--cyan),var(--cyan-d));display:grid;place-items:center;color:#04121C;font-weight:700}}
.brand small{{color:var(--dim);font-weight:500;font-size:.72rem;font-family:var(--mono)}}
.nav-links{{display:flex;gap:1.8rem;font-size:.86rem;color:var(--dim)}}
.nav-links a{{text-decoration:none}} .nav-links a:hover{{color:var(--ink)}}

/* hero */
.hero{{padding:clamp(2.6rem,6vw,5rem) 0 clamp(2rem,4vw,3.5rem)}}
.hero-grid{{display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(1.6rem,4vw,3.4rem);align-items:center}}
.hero h1{{font-size:clamp(2.5rem,5.6vw,4.4rem);letter-spacing:-.03em}}
.hero h1 .cy{{color:var(--cyan)}}
.hero .sub{{font-size:1.18rem;color:var(--dim);max-width:42ch;margin:1.4rem 0 2rem}}
.hero-cta{{display:flex;gap:.7rem;flex-wrap:wrap}}
.hero-meta{{display:flex;gap:1.6rem;flex-wrap:wrap;margin-top:2.1rem;font-size:.8rem;color:var(--dim)}}
.hero-meta b{{color:var(--ink);font-weight:600;display:block;font-family:var(--mono);font-size:.95rem}}
/* monitor card */
.mon{{background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 30px 70px -40px rgba(0,0,0,.8)}}
.mon-top{{display:flex;align-items:center;justify-content:space-between;padding:.8rem 1rem;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:.72rem;color:var(--dim)}}
.mon-top .dot{{width:8px;height:8px;border-radius:50%;background:var(--ok);box-shadow:0 0 10px var(--ok);display:inline-block;margin-right:.4rem}}
.mon-body{{padding:1rem 1.1rem 1.2rem}}
.mon-chart{{width:100%;height:150px;display:block}}
.mon-legend{{display:flex;justify-content:space-between;font-family:var(--mono);font-size:.66rem;color:var(--dimmer);margin-top:.5rem}}
.mon-alert{{margin-top:.9rem;display:flex;gap:.6rem;align-items:flex-start;background:rgba(255,192,97,.08);
 border:1px solid rgba(255,192,97,.32);border-radius:9px;padding:.7rem .85rem;font-size:.82rem;opacity:0;transform:translateY(6px);transition:.4s}}
.mon-alert.on{{opacity:1;transform:none}}
.mon-alert .ai{{color:var(--warn);flex:none;font-family:var(--mono);font-size:.7rem;border:1px solid var(--warn);border-radius:5px;padding:.1rem .35rem;margin-top:.1rem}}
.mon-cap{{font-family:var(--mono);font-size:.62rem;color:var(--dimmer);text-align:center;margin-top:.7rem}}

/* outcomes */
section{{padding:clamp(3rem,6vw,5rem) 0}}
.sec-head{{max-width:56ch;margin-bottom:2.4rem}}
.sec-head h2{{font-size:clamp(1.9rem,4vw,3rem);margin-top:.7rem}}
.sec-head p{{color:var(--dim);margin-top:.9rem;font-size:1.05rem}}
.out-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:1.3rem}}
.out{{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:1.6rem 1.5rem}}
.out .oi{{width:36px;height:36px;color:var(--cyan);margin-bottom:1rem}}
.out h3{{font-size:1.35rem;margin-bottom:.5rem}}
.out p{{color:var(--dim);font-size:.94rem}}
.out .mono{{color:var(--dimmer);font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;display:block;margin-bottom:.7rem}}

/* lifecycle */
.lc{{background:linear-gradient(180deg,var(--panel2),var(--void));border-top:1px solid var(--line);border-bottom:1px solid var(--line)}}
.lc-map{{background:var(--screen);border:1px solid var(--line);border-radius:14px;padding:1rem;margin-bottom:2rem;overflow:hidden}}
.lc-map img{{width:100%;border-radius:8px}}
.lc-map figcaption{{font-family:var(--mono);font-size:.66rem;color:var(--dimmer);margin-top:.6rem;text-align:center}}
.lc-tabs{{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.4rem}}
.lc-tab{{font-family:var(--sans);font-weight:600;font-size:.9rem;background:transparent;border:1px solid var(--line);
 color:var(--dim);padding:.7rem 1.2rem;border-radius:9px;cursor:pointer;transition:.2s;position:relative}}
.lc-tab:hover{{color:var(--ink);border-color:var(--cyan-d)}}
.lc-tab[aria-selected="true"]{{background:var(--cyan);color:#04121C;border-color:var(--cyan)}}
.lc-panel{{display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(1.4rem,3.5vw,3rem);align-items:center;
 background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:clamp(1.4rem,3vw,2.4rem)}}
.lc-copy .tag{{color:var(--cyan);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase}}
.lc-copy h3{{font-size:clamp(1.7rem,3.2vw,2.5rem);margin:.5rem 0 .6rem}}
.lc-line{{color:var(--ink);font-size:1.12rem}}
.lc-lab{{color:var(--dimmer);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;margin:1.4rem 0 .6rem}}
.lc-get{{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.6rem}}
.lc-get li{{position:relative;padding-left:1.5rem;color:var(--dim);font-size:.96rem}}
.lc-get li:before{{content:"";position:absolute;left:0;top:.55em;width:9px;height:9px;border:1.5px solid var(--cyan);border-radius:2px;transform:rotate(45deg)}}
.lc-who{{margin-top:1.4rem;padding-top:1.1rem;border-top:1px solid var(--line);color:var(--dim);font-size:.9rem}}
.lc-who .mono{{color:var(--cyan);letter-spacing:.06em;text-transform:uppercase;font-size:.66rem;margin-right:.5rem}}
.lc-screen{{margin:0;background:var(--screen);border:1px solid var(--line);border-radius:12px;padding:.9rem;overflow:hidden}}
.lc-screen img{{width:100%;border-radius:6px}}
.lc-screen figcaption{{font-size:.62rem;color:var(--dimmer);margin-top:.55rem;text-align:center}}
html.js .lc-panel[hidden]{{display:none}}

/* cases */
.cases-grid{{display:grid;grid-template-columns:repeat(5,1fr);gap:.9rem}}
.case{{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:1.2rem 1rem;text-align:center;transition:.2s}}
.case:hover{{border-color:var(--cyan-d);transform:translateY(-3px)}}
.case svg{{width:30px;height:30px;color:var(--cyan);margin:0 auto .7rem}}
.case h4{{font-size:.98rem;font-weight:600}}
.case.you{{background:linear-gradient(150deg,rgba(95,204,255,.14),transparent);border-style:dashed;border-color:var(--cyan-d)}}

/* who / roles */
.roles-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:1.3rem}}
.role{{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:1.6rem 1.5rem}}
.role .rk{{font-family:var(--mono);font-size:.68rem;color:var(--cyan);letter-spacing:.08em;text-transform:uppercase}}
.role h3{{font-size:1.3rem;margin:.5rem 0 .5rem}}
.role p{{color:var(--dim);font-size:.92rem}}
.role .rmap{{margin-top:1rem;font-family:var(--mono);font-size:.7rem;color:var(--dimmer)}}
.role .rmap b{{color:var(--cyan)}}

/* founder */
.founder{{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(1.6rem,4vw,3.2rem);align-items:center}}
.founder-media{{position:relative}}
.founder-media .main{{border-radius:14px;overflow:hidden;border:1px solid var(--line)}}
.founder-media .main img{{width:100%;aspect-ratio:1;object-fit:cover;filter:grayscale(.15)}}
.team-strip{{display:flex;gap:.6rem;margin-top:.8rem}}
.team-strip figure{{margin:0;flex:1;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--panel)}}
.team-strip img{{width:100%;aspect-ratio:1;object-fit:cover;filter:grayscale(.2)}}
.team-strip figcaption{{font-family:var(--mono);font-size:.62rem;color:var(--dim);text-align:center;padding:.4rem}}
.founder blockquote{{font-size:1.5rem;line-height:1.32;margin:1.2rem 0;color:var(--ink);font-weight:500;letter-spacing:-.01em}}
.founder .who{{color:var(--dim)}}
.founder .cred{{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1.3rem}}
.founder .cred span{{font-family:var(--mono);font-size:.72rem;color:var(--dim);border:1px solid var(--line);border-radius:100px;padding:.4rem .8rem}}

/* backers */
.backers{{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--panel2)}}
.backers-in{{display:flex;align-items:center;gap:2.4rem;flex-wrap:wrap;justify-content:center;padding:2rem 0}}
.backers .lab{{font-family:var(--mono);font-size:.68rem;color:var(--dimmer);letter-spacing:.1em;text-transform:uppercase;width:100%;text-align:center;margin-bottom:.4rem}}
.backers img{{height:34px;opacity:.85;transition:.2s}} .backers img:hover{{opacity:1}}

/* CTA / contact */
.cta{{background:linear-gradient(150deg,#0E1B2C,#0A0E17)}}
.cta-grid{{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,4rem);align-items:center}}
.cta h2{{font-size:clamp(2rem,4.2vw,3.2rem)}}
.cta .lead{{color:var(--dim);margin:1.1rem 0 0;font-size:1.1rem;max-width:38ch}}
form{{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:1.7rem}}
.field{{margin-bottom:1rem}}
label{{display:block;font-family:var(--mono);font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--dim);margin-bottom:.4rem}}
input,select,textarea{{width:100%;font-family:var(--sans);font-size:.95rem;color:var(--ink);background:var(--screen);
 border:1px solid var(--line);border-radius:8px;padding:.72rem .85rem}}
input:focus,select:focus,textarea:focus{{outline:none;border-color:var(--cyan);box-shadow:0 0 0 3px rgba(95,204,255,.16)}}
.field.err input,.field.err select{{border-color:var(--warn)}}
.err-msg{{display:none;color:var(--warn);font-size:.74rem;margin-top:.35rem}}
.field.err .err-msg{{display:block}}
.two{{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}}
.form-note{{font-family:var(--mono);font-size:.66rem;color:var(--dimmer);margin-top:.4rem}}
.form-ok{{display:none;text-align:center;padding:1rem}} .form-ok.on{{display:block}}
.form-ok .tick{{width:52px;height:52px;margin:0 auto 1rem;border-radius:50%;background:var(--cyan);color:#04121C;display:grid;place-items:center}}
form.done .form-body{{display:none}}

footer{{padding:3rem 0 2.2rem;border-top:1px solid var(--line)}}
.foot-grid{{display:grid;grid-template-columns:2fr 1fr 1fr;gap:2rem}}
footer h4{{font-family:var(--mono);font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--cyan);margin:0 0 1rem}}
footer a{{display:block;color:var(--dim);text-decoration:none;margin-bottom:.5rem;font-size:.9rem}} footer a:hover{{color:var(--ink)}}
.foot-bar{{border-top:1px solid var(--line);margin-top:2.2rem;padding-top:1.4rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.8rem;font-family:var(--mono);font-size:.7rem;color:var(--dimmer)}}

.reveal{{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}}
.reveal.in{{opacity:1;transform:none}}

@media(max-width:940px){{
 .hero-grid{{grid-template-columns:1fr;gap:2.4rem}}
 .out-grid,.roles-grid{{grid-template-columns:1fr}}
 .lc-panel{{grid-template-columns:1fr;gap:1.6rem}}
 .cases-grid{{grid-template-columns:repeat(2,1fr)}}
 .founder{{grid-template-columns:1fr;gap:2.4rem}}
 .cta-grid{{grid-template-columns:1fr}} .foot-grid{{grid-template-columns:1fr 1fr}}
}}
@media(max-width:600px){{ body{{font-size:16px}} .nav-links{{display:none}} .cases-grid{{grid-template-columns:1fr 1fr}} .two{{grid-template-columns:1fr}} .foot-grid{{grid-template-columns:1fr}} .hero-cta .btn{{flex:1;justify-content:center}} }}
@media(prefers-reduced-motion:reduce){{*{{animation:none!important;transition:none!important;scroll-behavior:auto!important}} .reveal{{opacity:1;transform:none}}}}
html:not(.js) .reveal{{opacity:1;transform:none}}
html:not(.js) .lc-panel[hidden]{{display:grid}}
html:not(.js) .lc-tabs{{display:none}}
</style>

<header class="nav"><div class="wrap nav-in">
  <a href="#top" class="brand"><span class="m">K</span>Safenai <small>· Klarity</small></a>
  <nav class="nav-links" aria-label="Primary"><a href="#lifecycle">Platform</a><a href="#cases">Business cases</a><a href="#who">Who it is for</a><a href="#team">Team</a></nav>
  <a href="#talk" class="btn btn-cy" style="padding:.62rem 1.1rem">Talk to the team</a>
</div></header>

<main id="top">
<section class="hero">
 <div class="wrap hero-grid">
  <div class="reveal">
    <span class="kick">Industrial AI · Governance &amp; observability</span>
    <h1 style="margin-top:1rem">Leave the proof of concept <span class="cy">behind.</span></h1>
    <p class="sub">Klarity is the platform to specify, validate and monitor your AI across its whole life, so it actually works in production, stays compliant, and earns its keep.</p>
    <div class="hero-cta">
      <a href="#lifecycle" class="btn btn-cy">See how Klarity works</a>
      <a href="#talk" class="btn btn-gh">Talk to the team</a>
    </div>
    <div class="hero-meta">
      <div><b>Specify → Prove → Operate</b>one platform, the whole lifecycle</div>
      <div><b>EU AI Act</b>compliance built into the flow</div>
      <div><b>From CEA research</b>France's trustworthy AI programme</div>
    </div>
  </div>
  <div class="mon reveal" aria-label="Illustration of AI drift monitoring">
    <div class="mon-top"><span><span class="dot"></span>KLARITY OPERATE · live monitor</span><span id="monState">nominal</span></div>
    <div class="mon-body">
      <svg class="mon-chart" id="monChart" viewBox="0 0 480 150" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="bandg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FCCFF" stop-opacity=".12"/><stop offset="1" stop-color="#5FCCFF" stop-opacity="0"/></linearGradient></defs>
        <rect x="0" y="48" width="480" height="54" fill="url(#bandg)"/>
        <line x1="0" y1="48" x2="480" y2="48" stroke="#2E9AD6" stroke-dasharray="4 5" stroke-width="1" opacity=".6"/>
        <line x1="0" y1="102" x2="480" y2="102" stroke="#2E9AD6" stroke-dasharray="4 5" stroke-width="1" opacity=".6"/>
        <path id="monLine" fill="none" stroke="#5FCCFF" stroke-width="2" stroke-linejoin="round"/>
        <circle id="monHead" r="3.5" fill="#EAF1FA"/>
      </svg>
      <div class="mon-legend"><span>expected behaviour band</span><span class="mono">drift score</span></div>
      <div class="mon-alert" id="monAlert"><span class="ai">ALERT</span><span>Drift detected on input distribution. Source flagged, Operate suggests revalidating with Klarity Build.</span></div>
      <p class="mon-cap">Illustrative, showing how Operate flags drift. Not live customer data.</p>
    </div>
  </div>
 </div>
</section>

<section id="what">
 <div class="wrap">
  <div class="sec-head reveal"><span class="kick">Why it matters</span><h2>An AI model is not the finish line. Running it is.</h2><p>Most AI never leaves the pilot. Klarity turns a promising model into an asset you can trust in production, prove to a regulator, and measure on the balance sheet.</p></div>
  <div class="out-grid">
   <div class="out reveal"><svg class="oi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 4v5c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg><span class="mono">Reliable</span><h3>Works in the real world</h3><p>Watch the model in operation and catch it the moment it drifts from what it was designed to do, before it costs you.</p></div>
   <div class="out reveal"><svg class="oi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h9l3 3v15H6z"/><path d="M9 12h6M9 16h6M9 8h3"/></svg><span class="mono">Compliant</span><h3>Provable, not promised</h3><p>Specifications, risks and behaviour reports are captured as you go, so EU AI Act evidence is a by product, not a scramble.</p></div>
   <div class="out reveal"><svg class="oi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 19V5M4 19h16M8 15l4-5 3 3 4-6"/></svg><span class="mono">Measurable</span><h3>Tied to ROI</h3><p>Every stage keeps the expected return in view, so the business can see whether the AI is actually paying back.</p></div>
  </div>
 </div>
</section>

<section id="lifecycle" class="lc">
 <div class="wrap">
  <div class="sec-head reveal"><span class="kick">The platform</span><h2>Three products. One grip on the whole lifecycle.</h2><p>Klarity runs from the decision to build, through validation, into live operation. Pick the stage you are in.</p></div>
  <figure class="lc-map reveal"><img src="{IMG['products']}" alt="The Klarity lifecycle: Contract to Build to Operate, continuous AI development and global compliance"><figcaption>Continuous AI development and global compliance · the Klarity platform</figcaption></figure>
  <div class="lc-tabs reveal" role="tablist" aria-label="Klarity products">{tabs}</div>
  <div class="reveal">{panels}</div>
 </div>
</section>

<section id="cases">
 <div class="wrap">
  <div class="sec-head reveal"><span class="kick">Business cases</span><h2>Start from a blueprint, not a blank page.</h2><p>A library of ready patterns for the most common industrial AI problems, each fully customisable, or built bespoke for you.</p></div>
  <div class="cases-grid reveal">
   <div class="case"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></svg><h4>Visual inspection</h4></div>
   <div class="case"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></svg><h4>Infrastructure monitoring</h4></div>
   <div class="case"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="4"/></svg><h4>Maintenance optimisation</h4></div>
   <div class="case"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg><h4>Object detection &amp; tracking</h4></div>
   <div class="case you"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg><h4>Your business case</h4></div>
  </div>
 </div>
</section>

<section id="who" style="background:var(--panel2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
 <div class="wrap">
  <div class="sec-head reveal"><span class="kick">Who it is for</span><h2>One platform, three people who finally speak the same language.</h2></div>
  <div class="roles-grid">
   <div class="role reveal"><span class="rk">Business &amp; product</span><h3>See the return, own the risk</h3><p>Decide whether an AI case is worth it, and keep ROI and compliance in view once it is live.</p><div class="rmap">lives in <b>Contract</b> → <b>Operate</b></div></div>
   <div class="role reveal"><span class="rk">AI &amp; data teams</span><h3>Prove it before it ships</h3><p>Evaluate robustness, fairness, explainability and data quality against an agreed spec, not a hunch.</p><div class="rmap">lives in <b>Build</b></div></div>
   <div class="role reveal"><span class="rk">Operations &amp; compliance</span><h3>Run it, and prove it stays in line</h3><p>Monitor behaviour in production, get alerted on drift, and generate the compliance and behaviour reports.</p><div class="rmap">lives in <b>Operate</b></div></div>
  </div>
 </div>
</section>

<section id="team">
 <div class="wrap founder">
  <div class="founder-media reveal">
    <div class="main"><img src="{IMG['julien']}" alt="Julien Chiaroni, co-founder and CEO of Safenai"></div>
    <div class="team-strip">
      <figure><img src="{IMG['julien']}" alt="Julien"><figcaption>Julien</figcaption></figure>
      <figure><img src="{IMG['loic']}" alt="Loïc"><figcaption>Loïc</figcaption></figure>
      <figure><img src="{IMG['fabien']}" alt="Fabien"><figcaption>Fabien</figcaption></figure>
    </div>
  </div>
  <div class="reveal">
    <span class="kick">The team</span>
    <blockquote>"The future of AI belongs to the organisations that can not only innovate, but prove their systems are safe, transparent and trustworthy."</blockquote>
    <p class="who"><b style="color:var(--ink)">Julien Chiaroni</b>, co-founder &amp; CEO. Former Director of France's Grand Défi for securing, making reliable and certifying AI systems, at the General Secretariat for Investment. Previously in research and programme leadership at CEA Leti and CEA List.</p>
    <div class="cred"><span>ex Director · Grand Défi trustworthy AI</span><span>CEA Leti &amp; CEA List</span><span>Product company, not a consultancy</span></div>
  </div>
 </div>
</section>

<div class="backers"><div class="wrap backers-in reveal">
  <span class="lab">Built with France's trustworthy AI ecosystem</span>
  <img src="{LOGO['cea']}" alt="CEA">
  <img src="{LOGO['systemx']}" alt="IRT SystemX">
  <img src="{LOGO['etaia']}" alt="European Trustworthy AI Association">
  <img src="{LOGO['ovh']}" alt="OVHcloud Startup Member">
</div></div>

<section id="talk" class="cta">
 <div class="wrap cta-grid">
  <div class="reveal">
   <span class="kick">Talk to the team</span>
   <h2 style="margin-top:.8rem">Bring one AI use case. We will show you the whole lifecycle.</h2>
   <p class="lead">Tell us what you are trying to operate, and we will walk you through how Contract, Build and Operate would handle it.</p>
  </div>
  <form id="f" novalidate class="reveal">
   <div class="form-body">
     <div class="two">
       <div class="field"><label for="n">Name</label><input id="n" name="n"><div class="err-msg">Add your name</div></div>
       <div class="field"><label for="c">Company</label><input id="c" name="c"><div class="err-msg">Add your company</div></div>
     </div>
     <div class="two">
       <div class="field"><label for="e">Work email</label><input id="e" name="e" type="email"><div class="err-msg">Add a valid email</div></div>
       <div class="field"><label for="r">Your role</label><select id="r" name="r"><option value="">Select…</option><option>Business / product</option><option>AI / data team</option><option>Operations / compliance</option><option>Founder / exec</option></select><div class="err-msg">Pick one</div></div>
     </div>
     <div class="field"><label for="u">The AI use case you want to operate</label><textarea id="u" name="u" rows="2" placeholder="e.g. visual quality control on the line, anomaly detection, forecasting…"></textarea></div>
     <button type="submit" class="btn btn-cy" style="width:100%;justify-content:center">Request a walkthrough</button>
     <p class="form-note">Prototype form · no data is sent.</p>
   </div>
   <div class="form-ok" role="status" aria-live="polite">
     <div class="tick"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 13l4 4L19 7"/></svg></div>
     <h3 style="font-size:1.5rem">Thanks, message received</h3>
     <p style="color:var(--dim);margin-top:.5rem">A member of the Safenai team will be in touch to set up your walkthrough.</p>
   </div>
  </form>
 </div>
</section>
</main>

<footer>
 <div class="wrap">
  <div class="foot-grid">
   <div>
     <a href="#top" class="brand"><span class="m">K</span>Safenai <small>· Klarity</small></a>
     <p style="margin-top:1rem;max-width:40ch;color:var(--dim);font-size:.9rem">The platform to specify, validate and monitor AI across its lifecycle. Operate your AI with control, confidence and measurable value.</p>
   </div>
   <div><h4>Platform</h4><a href="#lifecycle">Klarity Contract</a><a href="#lifecycle">Klarity Build</a><a href="#lifecycle">Klarity Operate</a><a href="#cases">Business cases</a></div>
   <div><h4>Company</h4><a href="#team">Team</a><a href="#who">Who it is for</a><a href="#talk">Talk to the team</a></div>
  </div>
  <div class="foot-bar"><span>© Safenai · Klarity · France</span><span>Industrial AI · Observability · EU AI Act</span></div>
 </div>
</footer>

<script>
document.documentElement.classList.add('js');

/* lifecycle tabs */
var tabs=[].slice.call(document.querySelectorAll('.lc-tab'));
var panels=[].slice.call(document.querySelectorAll('.lc-panel'));
function selTab(i){{
  tabs.forEach(function(t,j){{t.setAttribute('aria-selected', j===i?'true':'false')}});
  panels.forEach(function(p,j){{ if(j===i) p.removeAttribute('hidden'); else p.setAttribute('hidden','') }});
}}
tabs.forEach(function(t,i){{
  t.addEventListener('click',function(){{selTab(i)}});
  t.addEventListener('keydown',function(e){{
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){{e.preventDefault();
      var n=(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;tabs[n].focus();selTab(n);}}
  }});
}});

/* drift monitor animation */
(function(){{
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var line=document.getElementById('monLine'),head=document.getElementById('monHead');
  var alert=document.getElementById('monAlert'),state=document.getElementById('monState');
  var W=480,N=64,t=0,pts=[],drift=0;
  function base(x){{ return 75 + Math.sin(x*0.5)*7 + Math.sin(x*1.7)*4; }}
  function frame(){{
    t+=0.14;
    // occasionally build drift then recover
    var phase=(t%22);
    drift = phase>14 && phase<18 ? (phase-14)*10 : Math.max(0,drift-1.4);
    pts=[];
    for(var i=0;i<N;i++){{
      var x=i/(N-1)*W;
      var y=base(t - (N-i)*0.16) + (Math.random()-0.5)*3 + (i>N-8? drift*(i-(N-8))/8 : 0);
      pts.push([x,y]);
    }}
    var d='M'+pts.map(function(p){{return p[0].toFixed(1)+' '+p[1].toFixed(1)}}).join(' L');
    line.setAttribute('d',d);
    var last=pts[N-1];head.setAttribute('cx',last[0]);head.setAttribute('cy',last[1]);
    var breach=last[1]>102||last[1]<48;
    line.setAttribute('stroke',breach?'#FFC061':'#5FCCFF');
    head.setAttribute('fill',breach?'#FFC061':'#EAF1FA');
    alert.classList.toggle('on',breach);
    state.textContent=breach?'drift detected':'nominal';
    state.style.color=breach?'#FFC061':'#96A6BE';
    document.querySelector('.mon-top .dot').style.background=breach?'#FFC061':'#5FE3AA';
    document.querySelector('.mon-top .dot').style.boxShadow='0 0 10px '+(breach?'#FFC061':'#5FE3AA');
    if(!reduce && !document.hidden) requestAnimationFrame(frame);
  }}
  if(reduce){{ // static: draw one healthy line
    pts=[];for(var i=0;i<N;i++)pts.push([i/(N-1)*W, base(i*0.2)]);
    line.setAttribute('d','M'+pts.map(function(p){{return p[0].toFixed(1)+' '+p[1].toFixed(1)}}).join(' L'));
    var l=pts[N-1];head.setAttribute('cx',l[0]);head.setAttribute('cy',l[1]);
  }} else {{
    var io=new IntersectionObserver(function(es){{es.forEach(function(en){{if(en.isIntersecting){{requestAnimationFrame(frame);io.disconnect();}}}})}});
    io.observe(document.getElementById('monChart'));
  }}
}})();

/* form */
var f=document.getElementById('f');
f.addEventListener('submit',function(e){{e.preventDefault();var ok=true;
  [['n',function(v){{return v.trim()}}],['c',function(v){{return v.trim()}}],['e',function(v){{return /.+@.+\\..+/.test(v)}}],['r',function(v){{return v!==''}}]].forEach(function(p){{
    var el=document.getElementById(p[0]),fl=el.closest('.field');
    if(!p[1](el.value)){{fl.classList.add('err');ok=false}} else fl.classList.remove('err');
  }});
  if(!ok)return; f.classList.add('done'); f.querySelector('.form-ok').classList.add('on');
  f.querySelector('.form-ok').scrollIntoView({{behavior:'smooth',block:'center'}});
}});
f.querySelectorAll('input,select').forEach(function(el){{el.addEventListener('input',function(){{el.closest('.field').classList.remove('err')}})}});

/* reveal */
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){{
  var r=new IntersectionObserver(function(es){{es.forEach(function(en){{if(en.isIntersecting){{en.target.classList.add('in');r.unobserve(en.target)}}}})}},{{threshold:.1}});
  document.querySelectorAll('.reveal').forEach(function(el){{r.observe(el)}});
}} else document.querySelectorAll('.reveal').forEach(function(el){{el.classList.add('in')}});
setTimeout(function(){{document.querySelectorAll('.reveal:not(.in)').forEach(function(el){{el.classList.add('in')}})}},1800);
</script>'''
OUT.write_text(HTML,encoding="utf-8")
print("WROTE",OUT,OUT.stat().st_size,"bytes")
