# -*- coding: utf-8 -*-
import html
FONTS = open('fonts_inline.css').read()

TEAM = [
 ('Georgia Ware','CEO & Co-founder'),
 ('Andrew Anderson','CTO'),
 ('Sera Evcimen','VP, Technical Operations'),
 ('Ben Vellacott','Senior Heat Pump Engineer'),
 ('Charles Clark','Head of IP'),
 ('Anders Nyander','Manufacturing Advisor'),
 ('Corey Blackman','Technology Advisor'),
]
def mono(name):
    parts=[p for p in name.split() if p]
    return (parts[0][0]+parts[-1][0]).upper()

SECT_NOW = ['Pasteurisation','Brewing','Distillation','Drying','Sterilisation']
SECT_NEXT = ['Pharmaceuticals','Chemicals','Pulp & paper','Textiles']

CSS = r'''
:root{
 --bg:#080a0e; --bg2:#0c0f15; --panel:#10141c; --panel2:#141924;
 --line:#1e2634; --line2:#2a3446; --ink:#eef2f8; --mut:#93a0b5; --mut2:#5f6c82;
 --cold:#38bdf8; --cold2:#2a6cf0; --mid:#f5c451; --warm:#fb923c; --hot:#ef4444;
 --grad:linear-gradient(90deg,#2a6cf0,#38bdf8 26%,#f5c451 62%,#fb923c 82%,#ef4444);
 --gutter:clamp(18px,4vw,60px); --maxw:1300px;
 --disp:'Space Grotesk',system-ui,'Segoe UI',sans-serif;
 --mono:'Space Mono',ui-monospace,Menlo,monospace;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;overflow-x:clip}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--disp);font-size:16.5px;line-height:1.62;-webkit-font-smoothing:antialiased;overflow-x:clip}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4{margin:0;font-weight:600;letter-spacing:-.02em;line-height:1.02}
p{margin:0}
.wrap{max-width:var(--maxw);margin:0 auto;padding-inline:var(--gutter)}
.mono{font-family:var(--mono)}
.grad-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.ey{font-family:var(--mono);font-size:11.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--mut);display:inline-flex;align-items:center;gap:12px}
.ey::before{content:"";width:26px;height:1px;background:var(--grad)}
.btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:14px 22px;border:1px solid transparent;cursor:pointer;transition:.2s;border-radius:100px}
.btn svg{width:14px;height:14px;transition:transform .2s}
.btn:hover svg{transform:translateX(3px)}
.btn-hot{background:linear-gradient(90deg,#fb923c,#ef4444);color:#fff;box-shadow:0 8px 30px -10px rgba(239,68,68,.5)}
.btn-hot:hover{filter:brightness(1.08);box-shadow:0 12px 40px -10px rgba(239,68,68,.65)}
.btn-ghost{background:rgba(255,255,255,.02);color:var(--ink);border-color:var(--line2)}
.btn-ghost:hover{border-color:var(--cold);color:#fff}
.btn-lg{padding:16px 28px;font-size:13px}
section{position:relative;padding-block:clamp(72px,10vw,140px)}
.sec-head{max-width:64ch}
.sec-head .n{font-family:var(--mono);font-size:12px;color:var(--mut2);letter-spacing:.2em;margin-bottom:16px}
.sec-head h2{font-size:clamp(30px,5vw,60px);letter-spacing:-.03em;line-height:1.02}
.sec-head .lede{color:var(--mut);font-size:clamp(16px,1.9vw,20px);margin-top:20px;max-width:52ch;line-height:1.55}
/* thermal scale spine */
.spine{position:fixed;right:14px;top:0;bottom:0;width:34px;z-index:40;display:flex;flex-direction:column;align-items:center;pointer-events:none}
.spine .track{position:absolute;top:14vh;bottom:14vh;width:2px;background:linear-gradient(180deg,#2a6cf0,#38bdf8 22%,#f5c451 60%,#fb923c 82%,#ef4444);opacity:.5;border-radius:2px}
.spine .mk{position:absolute;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px var(--bg),0 0 14px 2px var(--warm);top:14vh}
.spine .lab{position:absolute;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:9px;letter-spacing:.1em;color:var(--mut2)}
.spine .lab.t{top:calc(14vh - 20px)} .spine .lab.b{bottom:calc(14vh - 20px)}
@media(max-width:1180px){.spine{display:none}}
/* NAV */
.nav{position:sticky;top:0;z-index:60;backdrop-filter:blur(14px);background:rgba(8,10,14,.72);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;gap:24px;height:70px}
.brand{display:flex;align-items:center;gap:11px;font-weight:700;font-size:19px;letter-spacing:-.02em}
.brand .mk{width:26px;height:26px;flex:none}
.nav-links{display:flex;gap:28px;margin-left:10px}
.nav-links a{font-size:14.5px;color:var(--mut);transition:.15s}
.nav-links a:hover{color:#fff}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:18px}
.nav-temp{font-family:var(--mono);font-size:12px;color:var(--mut);display:flex;align-items:center;gap:8px}
.nav-temp b{color:var(--warm);font-weight:700}
.nav-temp .dot{width:7px;height:7px;border-radius:50%;background:var(--warm);box-shadow:0 0 8px var(--warm)}
.burger{display:none;background:none;border:1px solid var(--line2);color:#fff;width:44px;height:40px;border-radius:8px;cursor:pointer;font-size:18px}
/* HERO */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;border-bottom:1px solid var(--line)}
#heroCanvas{position:absolute;inset:0;width:100%;height:100%;z-index:0}
.hero-fallback{position:absolute;inset:0;z-index:0;background:radial-gradient(120% 90% at 12% 40%,rgba(42,108,240,.28),transparent 46%),radial-gradient(120% 100% at 92% 68%,rgba(239,68,68,.30),transparent 50%),radial-gradient(80% 70% at 60% 50%,rgba(245,196,81,.14),transparent 60%)}
.hero::after{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,10,14,.86),rgba(8,10,14,.45) 52%,rgba(8,10,14,.2));pointer-events:none}
.hero-in{position:relative;z-index:2;width:100%;padding-block:110px 60px}
.hero h1{font-size:clamp(44px,7.6vw,104px);letter-spacing:-.035em;line-height:.96;max-width:16ch}
.hero h1 .l2{display:block}
.hero-sub{margin-top:28px;max-width:46ch;font-size:clamp(16px,2vw,21px);color:#c4cddd;line-height:1.5}
.hero-cta{margin-top:38px;display:flex;gap:14px;flex-wrap:wrap}
.hero-read{margin-top:56px;display:flex;flex-wrap:wrap;gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:rgba(12,15,21,.55);backdrop-filter:blur(6px);max-width:760px}
.hero-read .c{flex:1 1 0;min-width:130px;padding:18px 22px;border-right:1px solid var(--line)}
.hero-read .c:last-child{border-right:0}
.hero-read .v{font-family:var(--mono);font-size:clamp(22px,2.7vw,30px);font-weight:700;letter-spacing:-.02em}
.hero-read .l{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut2);margin-top:6px}
.hero-temp-badge{position:absolute;z-index:2;right:var(--gutter);top:120px;font-family:var(--mono);text-align:right}
.hero-temp-badge .big{font-size:clamp(30px,5vw,58px);font-weight:700;line-height:1}
.hero-temp-badge .sm{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut2);margin-top:8px}
@media(max-width:820px){.hero-temp-badge{display:none}}
/* TRACTION */
.trac{background:var(--bg2);border-bottom:1px solid var(--line)}
.trac-in{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:16px;overflow:hidden}
.trac .c{background:var(--bg2);padding:30px clamp(20px,2.4vw,34px)}
.trac .v{font-family:var(--mono);font-size:clamp(26px,3vw,38px);font-weight:700;letter-spacing:-.02em}
.trac .l{color:var(--mut);font-size:13.5px;margin-top:8px;line-height:1.4}
.trac-note{text-align:center;font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut2);margin-bottom:26px}
/* PROBLEM */
.prob-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(30px,5vw,80px);align-items:center}
.prob-stat{border:1px solid var(--line);border-radius:18px;padding:clamp(26px,3vw,44px);background:radial-gradient(120% 120% at 100% 0%,rgba(239,68,68,.12),transparent 55%)}
.prob-stat .big{font-family:var(--mono);font-size:clamp(58px,10vw,120px);font-weight:700;line-height:.9;letter-spacing:-.04em}
.prob-stat .cap{color:var(--mut);margin-top:14px;font-size:16px}
.prob-list{margin-top:30px;border-top:1px solid var(--line)}
.prob-list .r{display:grid;grid-template-columns:auto 1fr;gap:18px;padding:20px 0;border-bottom:1px solid var(--line)}
.prob-list .rn{font-family:var(--mono);font-size:12px;color:var(--warm);letter-spacing:.1em}
.prob-list h3{font-size:18px;margin-bottom:6px}
.prob-list p{color:var(--mut);font-size:14.5px}
/* HOW / CYCLE */
.how{background:linear-gradient(180deg,var(--bg),#0a0d13)}
.cycle-wrap{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,70px);align-items:center;margin-top:20px}
.cycle-fig{border:1px solid var(--line);border-radius:20px;background:var(--panel);padding:clamp(18px,2.4vw,30px);position:relative;overflow:hidden}
.cycle-fig svg{width:100%;height:auto;display:block}
.step-list{counter-reset:s}
.step{display:grid;grid-template-columns:auto 1fr;gap:20px;padding:22px 0;border-bottom:1px solid var(--line)}
.step .sn{font-family:var(--mono);font-size:13px;font-weight:700;width:40px;height:40px;border:1px solid var(--line2);border-radius:50%;display:flex;align-items:center;justify-content:center}
.step h3{font-size:19px;margin-bottom:7px}
.step p{color:var(--mut);font-size:15px}
.step .t{font-family:var(--mono);font-size:12.5px;font-weight:700;margin-top:8px;display:inline-block}
/* ISOTHERMAL chart */
.iso{background:#0a0d13}
.iso-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(30px,5vw,70px);align-items:center}
.chart-card{border:1px solid var(--line);border-radius:20px;background:var(--panel);padding:clamp(22px,3vw,38px)}
.chart-card svg{width:100%;height:auto}
.cop-badges{display:flex;gap:14px;margin-top:26px;flex-wrap:wrap}
.cop{border:1px solid var(--line2);border-radius:14px;padding:16px 22px;flex:1 1 0;min-width:140px}
.cop .v{font-family:var(--mono);font-size:34px;font-weight:700}
.cop .l{color:var(--mut);font-size:13px;margin-top:4px}
.cop.on{border-color:transparent;background:linear-gradient(120deg,rgba(251,146,60,.16),rgba(239,68,68,.14));box-shadow:inset 0 0 0 1px rgba(251,146,60,.5)}
/* AUDIENCES */
.aud-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:12px}
.aud{border:1px solid var(--line);border-radius:20px;padding:clamp(26px,2.6vw,38px);background:var(--panel);position:relative;overflow:hidden;transition:.2s;display:flex;flex-direction:column}
.aud::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:var(--grad);opacity:.5;transition:.2s}
.aud:hover{border-color:var(--line2);transform:translateY(-4px)}
.aud:hover::before{opacity:1}
.aud .ai{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut2)}
.aud h3{font-size:25px;margin:12px 0 12px}
.aud p{color:var(--mut);font-size:15px;flex:1}
.aud ul{list-style:none;padding:0;margin:18px 0 22px}
.aud li{font-size:14px;color:#c2ccdb;padding:8px 0;border-top:1px solid var(--line);display:flex;gap:10px}
.aud li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--warm);margin-top:8px;flex:none}
.aud .go{font-family:var(--mono);font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;display:inline-flex;align-items:center;gap:9px;color:#fff}
.aud .go svg{width:14px;height:14px}
/* SECTORS */
.sec-tags{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px}
.sec-tag{border:1px solid var(--line2);border-radius:100px;padding:12px 20px;font-size:15px;display:flex;align-items:center;gap:10px}
.sec-tag .d{width:8px;height:8px;border-radius:50%}
.sec-cols{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:40px}
.sec-cols .col h3{font-family:var(--mono);font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin-bottom:18px}
/* TEAM */
.team{background:var(--bg2)}
.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:14px}
.tm{border:1px solid var(--line);border-radius:16px;padding:24px;background:var(--panel);transition:.2s}
.tm:hover{border-color:var(--line2)}
.tm .mono-badge{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:700;font-size:19px;color:#0a0d13;background:var(--grad);margin-bottom:18px}
.tm h3{font-size:18px}
.tm p{font-family:var(--mono);font-size:12px;color:var(--mut);margin-top:6px;letter-spacing:.02em}
.team-note{margin-top:26px;color:var(--mut2);font-family:var(--mono);font-size:12px;letter-spacing:.04em}
/* CONTACT */
.cta{background:linear-gradient(180deg,#0a0d13,#0d0906);position:relative;overflow:hidden}
.cta::before{content:"";position:absolute;left:50%;bottom:-40%;transform:translateX(-50%);width:120%;height:80%;background:radial-gradient(closest-side,rgba(239,68,68,.22),transparent);pointer-events:none}
.cta-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(30px,5vw,64px);position:relative;z-index:2}
.cta h2{font-size:clamp(32px,5vw,62px);letter-spacing:-.03em}
.cta .lede{color:var(--mut);font-size:18px;margin-top:18px;max-width:40ch}
.cta-contact{margin-top:26px;font-family:var(--mono);font-size:14px;color:#c2ccdb;line-height:2}
.form{border:1px solid var(--line2);border-radius:20px;background:rgba(16,20,28,.7);backdrop-filter:blur(6px);padding:clamp(24px,3vw,38px)}
.seg{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
.seg button{flex:1 1 0;min-width:110px;font-family:var(--mono);font-size:12px;letter-spacing:.04em;text-transform:uppercase;padding:12px;border:1px solid var(--line2);background:transparent;color:var(--mut);border-radius:10px;cursor:pointer;transition:.15s}
.seg button[aria-pressed=true]{background:var(--grad);color:#0a0d13;border-color:transparent;font-weight:700}
.field{margin-bottom:16px}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.field label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);margin-bottom:8px}
.field label .req{color:var(--warm)}
.field input,.field textarea{width:100%;padding:13px 14px;background:rgba(8,10,14,.6);border:1px solid var(--line2);border-radius:10px;color:var(--ink);font-family:var(--disp);font-size:15px}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--warm);box-shadow:0 0 0 3px rgba(251,146,60,.16)}
.field textarea{min-height:96px;resize:vertical}
.field.err input,.field.err textarea{border-color:var(--hot);background:rgba(239,68,68,.06)}
.field .msg{display:none;font-family:var(--mono);font-size:11px;color:var(--hot);margin-top:6px}
.field.err .msg{display:block}
.form-foot{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:6px}
.priv{font-family:var(--mono);font-size:11.5px;color:var(--mut2)}
.form-ok{display:none;border:1px solid var(--warm);border-radius:12px;padding:22px;background:rgba(251,146,60,.08)}
.form-ok.on{display:block}
.form-ok b{color:var(--warm)}
.form.done .seg,.form.done .frow,.form.done .field,.form.done .form-foot{display:none}
/* FOOTER */
.foot{background:#070a0e;border-top:1px solid var(--line);padding-block:56px 30px}
.foot-grid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1fr;gap:32px}
.foot-blurb{color:var(--mut);font-size:14px;max-width:34ch;margin-top:16px}
.foot-col h4{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin-bottom:14px}
.foot-col a,.foot-col p{display:block;color:var(--mut2);font-size:14px;padding:5px 0}
.foot-col a:hover{color:#fff}
.foot-bot{display:flex;flex-wrap:wrap;gap:12px 24px;justify-content:space-between;margin-top:44px;padding-top:22px;border-top:1px solid var(--line);font-family:var(--mono);font-size:11.5px;color:var(--mut2)}
/* thermal warm-up down the page */
#audiences{background:radial-gradient(70% 55% at 88% 4%,rgba(251,146,60,.07),transparent 58%)}
#sectors{background:radial-gradient(70% 55% at 12% 20%,rgba(251,146,60,.06),transparent 55%)}
#faq{background:radial-gradient(80% 60% at 90% 30%,rgba(239,68,68,.06),transparent 60%)}
.team{background:linear-gradient(180deg,var(--bg2),#0e0a07)}
/* FAQ */
.faq-list{margin-top:20px;border-top:1px solid var(--line)}
.faq{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;padding:24px 0;display:flex;gap:20px;align-items:flex-start}
.faq summary::-webkit-details-marker{display:none}
.faq summary .q{font-size:clamp(18px,2.2vw,23px);font-weight:500;letter-spacing:-.01em;flex:1}
.faq summary .pm{font-family:var(--mono);color:var(--warm);font-size:22px;line-height:1;transition:.2s}
.faq[open] summary .pm{transform:rotate(45deg)}
.faq .a{color:var(--mut);font-size:16px;line-height:1.6;padding:0 0 26px 0;max-width:72ch}
.faq .a b{color:#c2ccdb;font-weight:600}
/* reveal + counters */
.rv{opacity:0;transform:translateY(22px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
.rv.in{opacity:1;transform:none}
.rv-s>*{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s ease}
.rv-s.in>*{opacity:1;transform:none}
.rv-s.in>*:nth-child(2){transition-delay:.06s}.rv-s.in>*:nth-child(3){transition-delay:.12s}
.rv-s.in>*:nth-child(4){transition-delay:.18s}.rv-s.in>*:nth-child(5){transition-delay:.24s}
.rv-s.in>*:nth-child(6){transition-delay:.30s}.rv-s.in>*:nth-child(7){transition-delay:.36s}
html:not(.js) .rv,html:not(.js) .rv-s>*{opacity:1;transform:none}
.draw{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.6s ease}
.draw.in{stroke-dashoffset:0}
@media(max-width:1080px){
 .prob-grid,.cycle-wrap,.iso-grid,.cta-grid{grid-template-columns:1fr}
 .aud-grid{grid-template-columns:1fr}
 .team-grid{grid-template-columns:repeat(2,1fr)}
 .trac-in{grid-template-columns:1fr 1fr}
 .foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:760px){
 .nav-links,.nav-temp{display:none}
 .burger{display:block}
 .nav.open .nav-links{display:flex;position:absolute;top:70px;left:0;right:0;flex-direction:column;background:var(--bg2);padding:16px var(--gutter);gap:2px;border-bottom:1px solid var(--line)}
 .nav.open .nav-links a{padding:12px 0;border-bottom:1px solid var(--line)}
 .sec-cols{grid-template-columns:1fr}
 .frow{grid-template-columns:1fr}
 .hero-read .c{flex:1 1 44%;border-bottom:1px solid var(--line)}
 .team-grid{grid-template-columns:1fr 1fr}
 .foot-grid{grid-template-columns:1fr}
}
@media(prefers-reduced-motion:reduce){
 *{scroll-behavior:auto!important}
 .rv,.rv-s>*,.draw{transition:none!important;opacity:1!important;transform:none!important;stroke-dashoffset:0!important}
}
'''

ARROW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
def mark(sz=26):
    # bespoke thermal mark: rising bars from cold to hot inside a rounded square
    return (f'<svg class="mk" viewBox="0 0 32 32" width="{sz}" height="{sz}" aria-hidden="true">'
      '<defs><linearGradient id="mg" x1="0" y1="1" x2="1" y2="0">'
      '<stop offset="0" stop-color="#2a6cf0"/><stop offset=".5" stop-color="#f5c451"/><stop offset="1" stop-color="#ef4444"/></linearGradient></defs>'
      '<rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="none" stroke="url(#mg)" stroke-width="2"/>'
      '<rect x="8" y="18" width="3.4" height="7" rx="1.7" fill="#2a6cf0"/>'
      '<rect x="14.3" y="12" width="3.4" height="13" rx="1.7" fill="#f5c451"/>'
      '<rect x="20.6" y="7" width="3.4" height="18" rx="1.7" fill="#ef4444"/></svg>')

def esc(s): return html.escape(str(s),quote=True)

# ---- bespoke SVG: heat-pump cycle diagram ----
CYCLE_SVG = '''<svg viewBox="0 0 520 420" role="img" aria-label="Heat pump cycle: 10 degree air lifted to 120 degree steam">
<defs>
 <linearGradient id="loop" x1="0" y1="0" x2="1" y2="1">
   <stop offset="0" stop-color="#2a6cf0"/><stop offset=".5" stop-color="#f5c451"/><stop offset="1" stop-color="#ef4444"/></linearGradient>
 <radialGradient id="hot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#7f1d1d"/></radialGradient>
 <radialGradient id="cool" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#1e3a8a"/></radialGradient>
</defs>
<rect x="1" y="1" width="518" height="418" rx="18" fill="none" stroke="#1e2634"/>
<path id="cyc" class="draw" d="M140 120 H380 a40 40 0 0 1 40 40 V260 a40 40 0 0 1 -40 40 H140 a40 40 0 0 1 -40 -40 V160 a40 40 0 0 1 40 -40 Z"
 fill="none" stroke="url(#loop)" stroke-width="2.5"/>
<circle id="fluid" r="7" fill="#fff"><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#cyc"/></animateMotion></circle>
<!-- nodes -->
<g font-family="'Space Mono',monospace">
 <circle cx="100" cy="210" r="30" fill="url(#cool)"/><text x="100" y="206" text-anchor="middle" font-size="11" fill="#fff">EVAP</text><text x="100" y="220" text-anchor="middle" font-size="9" fill="#cfe8ff">10&#176;C</text>
 <circle cx="260" cy="120" r="30" fill="#141924" stroke="#f5c451" stroke-width="2"/><text x="260" y="116" text-anchor="middle" font-size="9" fill="#f5c451">ISO</text><text x="260" y="128" text-anchor="middle" font-size="9" fill="#f5c451">COMP</text>
 <circle cx="420" cy="210" r="30" fill="url(#hot)"/><text x="420" y="206" text-anchor="middle" font-size="10" fill="#fff">COND</text><text x="420" y="220" text-anchor="middle" font-size="9" fill="#ffd9d9">120&#176;C</text>
 <circle cx="260" cy="300" r="26" fill="#141924" stroke="#2a6cf0" stroke-width="2"/><text x="260" y="304" text-anchor="middle" font-size="9" fill="#8fbcff">EXPAND</text>
</g>
<!-- air in / steam out -->
<g font-family="'Space Mono',monospace" font-size="10" fill="#93a0b5">
 <path d="M30 210 H66" stroke="#38bdf8" stroke-width="2" marker-end="url(#a1)"/>
 <text x="30" y="196" fill="#38bdf8">AIR IN</text>
 <path d="M454 210 H494" stroke="#ef4444" stroke-width="2" marker-end="url(#a2)"/>
 <text x="470" y="196" fill="#ef4444">STEAM</text>
</g>
<defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="#38bdf8"/></marker>
<marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="#ef4444"/></marker></defs>
</svg>'''

# ---- bespoke SVG: isothermal vs adiabatic ----
CHART_SVG = '''<svg viewBox="0 0 520 360" role="img" aria-label="Isothermal compression stays cooler than adiabatic, raising COP from 2.0 to 2.8">
<g font-family="'Space Mono',monospace" font-size="10" fill="#5f6c82">
 <line x1="60" y1="30" x2="60" y2="310" stroke="#2a3446"/>
 <line x1="60" y1="310" x2="500" y2="310" stroke="#2a3446"/>
 <text x="60" y="26" text-anchor="middle" fill="#93a0b5">TEMP</text>
 <text x="500" y="330" text-anchor="end" fill="#93a0b5">COMPRESSION &#8594;</text>
 <line x1="60" y1="120" x2="500" y2="120" stroke="#151b26" stroke-dasharray="3 5"/>
 <line x1="60" y1="210" x2="500" y2="210" stroke="#151b26" stroke-dasharray="3 5"/>
</g>
<!-- adiabatic: spikes hot, waste heat shaded -->
<path class="draw" d="M60 300 C 200 300 300 150 480 50" fill="none" stroke="#ef4444" stroke-width="3"/>
<path d="M60 300 C 200 300 300 150 480 50 L480 120 C 320 190 220 300 60 300 Z" fill="rgba(239,68,68,.10)"/>
<!-- isothermal: stays controlled -->
<path class="draw" d="M60 300 C 220 292 360 280 480 262" fill="none" stroke="#f5c451" stroke-width="3"/>
<g font-family="'Space Mono',monospace" font-size="11">
 <circle cx="480" cy="50" r="5" fill="#ef4444"/><text x="470" y="46" text-anchor="end" fill="#ef4444">Adiabatic</text>
 <circle cx="480" cy="262" r="5" fill="#f5c451"/><text x="470" y="258" text-anchor="end" fill="#f5c451">Isothermal</text>
 <text x="250" y="150" fill="#ef4444" font-size="10">waste heat</text>
</g>
</svg>'''

def team_cards():
    return ''.join(
      f'<div class="tm"><div class="mono-badge">{esc(mono(n))}</div><h3>{esc(n)}</h3><p>{esc(r)}</p></div>'
      for n,r in TEAM)

def aud_card(ai,title,desc,items,verb):
    lis=''.join(f'<li>{esc(x)}</li>' for x in items)
    return (f'<div class="aud"><div class="ai">{esc(ai)}</div><h3>{esc(title)}</h3>'
      f'<p>{esc(desc)}</p><ul>{lis}</ul>'
      f'<a class="go js-seg" data-seg="{esc(ai)}" href="#contact">{esc(verb)} {ARROW}</a></div>')

HTML = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>HotGreen — ultra-efficient low carbon steam for industry</title>
<meta name="description" content="HotGreen builds industrial high-temperature heat pumps that lift 10C ambient air to 120C steam using isothermal compression. Backed by Empirical Ventures with Coca-Cola Europacific Partners.">
<style>{FONTS}</style>
<style>{CSS}</style>
</head>
<body>
<script>document.documentElement.className='js';</script>

<div class="spine" aria-hidden="true"><div class="track"></div><span class="lab t">10&#176;C</span><span class="mk" id="spineMk"></span><span class="lab b">120&#176;C</span></div>

<header class="nav" id="nav">
 <div class="wrap nav-in">
   <a class="brand" href="#top">{mark(26)} HotGreen</a>
   <nav class="nav-links" aria-label="Primary">
     <a href="#technology">Technology</a><a href="#traction">Traction</a><a href="#sectors">Sectors</a><a href="#team">Team</a><a href="#contact">Contact</a>
   </nav>
   <div class="nav-right">
     <span class="nav-temp"><span class="dot"></span> STEAM <b id="navTemp">120&#176;C</b></span>
     <a class="btn btn-hot" href="#contact">Talk to us {ARROW}</a>
   </div>
   <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">≡</button>
 </div>
</header>

<main id="top">

<!-- HERO -->
<section class="hero" aria-label="HotGreen">
 <div class="hero-fallback"></div>
 <canvas id="heroCanvas"></canvas>
 <div class="hero-temp-badge"><div class="big grad-text" id="bigTemp">120&#176;C</div><div class="sm">steam, from 10&#176;C air</div></div>
 <div class="wrap hero-in">
   <span class="ey">Industrial high temperature heat pumps</span>
   <h1 style="margin-top:26px">Turn cold air<span class="l2">into <span class="grad-text">industrial steam</span>.</span></h1>
   <p class="hero-sub">HotGreen lifts ambient air straight to 120&#176;C steam in a single stage, with isothermal compression that keeps the efficiency where boilers never could. Ultra-efficient, low carbon process heat, from electricity.</p>
   <div class="hero-cta">
     <a class="btn btn-hot btn-lg" href="#technology">See how the lift works {ARROW}</a>
     <a class="btn btn-ghost btn-lg" href="#contact">Book a pilot conversation</a>
   </div>
   <div class="hero-read rv-s">
     <div class="c"><div class="v grad-text" data-count="120" data-suffix="&#176;C">120&#176;C</div><div class="l">Steam temperature</div></div>
     <div class="c"><div class="v" data-count="2.8" data-dec="1" data-prefix="COP ">COP 2.8</div><div class="l">vs 2.0 conventional</div></div>
     <div class="c"><div class="v">&pound;1.2M</div><div class="l">Pre-seed, led by Empirical Ventures</div></div>
     <div class="c"><div class="v">19<span style="font-size:.6em">%</span></div><div class="l">of global emissions is industrial heat</div></div>
   </div>
 </div>
</section>

<!-- TRACTION -->
<section class="trac" id="traction">
 <div class="wrap">
   <p class="trac-note rv">Backed &amp; trialled by teams decarbonising real production</p>
   <div class="trac-in rv-s">
     <div class="c"><div class="v grad-text">&pound;1.2M</div><div class="l">Pre-seed round, led by Empirical Ventures</div></div>
     <div class="c"><div class="v">CCEP</div><div class="l">Coca-Cola Europacific Partners, strategic participation &amp; trial</div></div>
     <div class="c"><div class="v">120<span style="font-size:.55em">&#176;C</span></div><div class="l">Low carbon steam, single-stage from air</div></div>
     <div class="c"><div class="v">Patent<span style="font-size:.5em">-pending</span></div><div class="l">Isothermal compression technology</div></div>
   </div>
 </div>
</section>

<!-- PROBLEM -->
<section id="problem">
 <div class="wrap">
   <div class="prob-grid">
     <div class="rv">
       <div class="sec-head"><div class="n">01 / THE PROBLEM</div>
       <h2>Industry runs on heat. Heat runs on carbon.</h2>
       <p class="lede">Process heat is the hard half of decarbonisation. Electrifying it has been possible for over a century, and almost nobody has done it, because the numbers never worked.</p></div>
       <div class="prob-list">
         <div class="r"><span class="rn">A</span><div><h3>The economics never closed</h3><p>Conventional high-temperature heat pumps waste too much energy in compression to compete with a gas boiler on cost.</p></div></div>
         <div class="r"><span class="rn">B</span><div><h3>Waste heat projects are slow</h3><p>Most low carbon heat needs a lengthy project to capture a waste stream first. Most sites do not have one to spare.</p></div></div>
         <div class="r"><span class="rn">C</span><div><h3>150 years of stalled adoption</h3><p>The technology has existed since the 1800s. What was missing was a compressor that could lift high and stay efficient.</p></div></div>
       </div>
     </div>
     <div class="prob-stat rv">
       <div class="big grad-text">19%</div>
       <div class="cap">of global emissions come from industrial heat. Decarbonising it profitably is the gap HotGreen was built to close.</div>
     </div>
   </div>
 </div>
</section>

<!-- HOW / CYCLE -->
<section class="how" id="technology">
 <div class="wrap">
   <div class="sec-head rv"><div class="n">02 / THE LIFT</div>
   <h2>One stage. 10&#176;C air to 120&#176;C steam.</h2>
   <p class="lede">A heat pump moves heat instead of burning fuel. HotGreen's isothermal compressor keeps the working gas near-constant in temperature as it compresses, so far less energy is lost as waste heat, and the lift reaches steam in a single step from air.</p></div>
   <div class="cycle-wrap">
     <div class="cycle-fig rv">{CYCLE_SVG}</div>
     <div class="step-list rv-s">
       <div class="step"><div class="sn">01</div><div><h3>Draw from ambient air</h3><p>The evaporator pulls low-grade heat straight from the air around the plant. No waste-heat capture project required.</p><span class="t grad-text">10&#176;C source</span></div></div>
       <div class="step"><div class="sn">02</div><div><h3>Compress, isothermally</h3><p>The core innovation. Near-constant gas temperature through compression means the energy goes into lift, not into heat the process throws away.</p><span class="t" style="color:var(--mid)">near-constant temperature</span></div></div>
       <div class="step"><div class="sn">03</div><div><h3>Deliver steam</h3><p>The condenser releases the heat as clean, usable steam at up to 120&#176;C, ready for the process line.</p><span class="t" style="color:var(--hot)">120&#176;C steam out</span></div></div>
       <div class="step"><div class="sn">04</div><div><h3>Run on electricity</h3><p>Every kilowatt is electric, so the process gets cleaner automatically as the grid does. No combustion on site.</p><span class="t" style="color:var(--cold)">fully electric</span></div></div>
     </div>
   </div>
 </div>
</section>

<!-- ISOTHERMAL -->
<section class="iso" id="efficiency">
 <div class="wrap">
   <div class="iso-grid">
     <div class="rv">
       <div class="sec-head"><div class="n">03 / WHY IT WORKS</div>
       <h2>Isothermal beats adiabatic where it counts.</h2>
       <p class="lede">Conventional heat pumps compress adiabatically: the gas spikes hot and dumps that energy as waste. HotGreen holds the gas near-constant, so more of the input becomes useful heat.</p></div>
       <div class="cop-badges">
         <div class="cop"><div class="v">2.0</div><div class="l">COP, conventional adiabatic</div></div>
         <div class="cop on"><div class="v grad-text">2.8</div><div class="l">COP, HotGreen isothermal</div></div>
       </div>
       <p style="color:var(--mut);font-size:14.5px;margin-top:20px">A higher coefficient of performance means more steam per kilowatt, and a running cost that finally undercuts the boiler it replaces.</p>
     </div>
     <div class="chart-card rv">{CHART_SVG}</div>
   </div>
 </div>
</section>

<!-- AUDIENCES -->
<section id="audiences">
 <div class="wrap">
   <div class="sec-head rv"><div class="n">04 / WHERE YOU FIT</div>
   <h2>Three ways to move this forward.</h2>
   <p class="lede">Whether you fund deep tech, run a production site, or make the heat, there is a concrete next step here for you.</p></div>
   <div class="aud-grid rv-s">
     {aud_card('Investors','Back the lift','A pre-seed round led by Empirical Ventures, with Coca-Cola Europacific Partners alongside. Patent-pending core technology and an industrial trial with a global bottler.',['Pre-seed led by Empirical Ventures','Strategic participation from CCEP','Patent-pending isothermal compressor'],'For investors')}
     {aud_card('Pilot partners','Trial it on a real line','We are bringing the unit to real production heat. If you run pasteurisation, brewing, distillation or drying, a pilot puts low carbon steam on your floor.',['A trial underway with CCEP','Single-stage steam to 120&#176;C','A path to your net zero targets'],'Host a pilot')}
     {aud_card('Manufacturers','Cut heat cost and carbon','Replace the gas boiler with electric steam that finally pays back. Cleaner heat now, and cleaner still as the grid decarbonises.',['Lower running cost per kW of heat','No on-site combustion','Ready for food &amp; beverage today'],'Talk supply')}
   </div>
 </div>
</section>

<!-- SECTORS -->
<section id="sectors">
 <div class="wrap">
   <div class="sec-head rv"><div class="n">05 / SECTORS</div>
   <h2>Starting where the heat is hardest to green.</h2>
   <p class="lede">Food and beverage first, where steam is everywhere and the pressure to decarbonise is already here. The same lift extends across process industry from there.</p></div>
   <div class="sec-cols">
     <div class="col rv"><h3>In production now</h3>
       <div class="sec-tags">{''.join(f'<span class="sec-tag"><span class="d" style="background:var(--warm)"></span>{esc(s)}</span>' for s in SECT_NOW)}</div>
     </div>
     <div class="col rv"><h3>Next horizons</h3>
       <div class="sec-tags">{''.join(f'<span class="sec-tag"><span class="d" style="background:var(--cold)"></span>{esc(s)}</span>' for s in SECT_NEXT)}</div>
     </div>
   </div>
 </div>
</section>

<!-- TEAM -->
<section class="team" id="team">
 <div class="wrap">
   <div class="sec-head rv"><div class="n">06 / TEAM</div>
   <h2>Built by people who know the machine.</h2>
   <p class="lede">HotGreen was founded out of frustration at the lack of affordable ways for industry to decarbonise profitably. The team pairs heat-pump engineering with real manufacturing and IP depth.</p></div>
   <div class="team-grid rv-s">{team_cards()}</div>
   <p class="team-note">Datchet, United Kingdom &middot; from the Net Zero Technology Centre and Deep Science Ventures communities</p>
 </div>
</section>

<!-- FAQ -->
<section id="faq">
 <div class="wrap">
   <div class="sec-head rv"><div class="n">07 / QUESTIONS</div>
   <h2>The questions we get first.</h2></div>
   <div class="faq-list rv-s">
     <details class="faq"><summary><span class="q">How is this different from a normal heat pump?</span><span class="pm">+</span></summary>
       <div class="a">Conventional units compress the gas adiabatically, so it spikes hot and throws that energy away as waste heat, which caps their coefficient of performance around <b>2.0</b>. HotGreen compresses <b>isothermally</b>, holding the gas near-constant in temperature, so more of the electricity becomes useful heat and the COP reaches up to <b>2.8</b>, all in a single-stage lift to 120&#176;C.</div></details>
     <details class="faq"><summary><span class="q">Do we need a waste-heat source to use it?</span><span class="pm">+</span></summary>
       <div class="a">No. The evaporator draws low-grade heat straight from <b>ambient air</b>, which averages around 10&#176;C in Europe. That removes the lengthy waste-heat-capture project most low carbon heat schemes depend on, and it means almost any site can host a unit.</div></details>
     <details class="faq"><summary><span class="q">What can it run today?</span><span class="pm">+</span></summary>
       <div class="a">Food and beverage process heat first, where steam is everywhere: <b>pasteurisation, brewing, distillation, drying and sterilisation</b>. The same lift extends to pharmaceuticals, chemicals, pulp and paper, and textiles as the platform scales.</div></details>
     <details class="faq"><summary><span class="q">What stage is HotGreen at?</span><span class="pm">+</span></summary>
       <div class="a">A <b>&pound;1.2M pre-seed</b> round has closed, led by <b>Empirical Ventures</b> with strategic participation from <b>Coca-Cola Europacific Partners</b>, who are also trialling the unit. The core isothermal compressor is <b>patent-pending</b>. HotGreen is Datchet based, from the Net Zero Technology Centre and Deep Science Ventures communities.</div></details>
     <details class="faq"><summary><span class="q">How soon could we pilot on our line?</span><span class="pm">+</span></summary>
       <div class="a">It depends on your process and heat load, so the honest answer is a short scoping conversation. Tell us the line and the steam you need and we will come back with what a pilot would look like for you.</div></details>
   </div>
 </div>
</section>

<!-- CONTACT -->
<section class="cta" id="contact">
 <div class="wrap">
   <div class="cta-grid">
     <div class="rv">
       <h2>Let's put low carbon steam<br>on a real line.</h2>
       <p class="lede">Tell us where you fit and we will come back with the right next step, an investor pack, a pilot scope, or a supply conversation.</p>
       <div class="cta-contact">
         Datchet, United Kingdom<br>
         <a href="https://www.hotgreensolutions.com" style="border-bottom:1px solid var(--warm)">hotgreensolutions.com</a>
       </div>
     </div>
     <form class="form" id="hgform" novalidate>
       <div class="form-ok" id="hgok"><b>Thank you, your message is in.</b><br>We will come back to you with the right next step, usually within two working days.</div>
       <label class="mono" style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);display:block;margin-bottom:10px">I am reaching out as</label>
       <div class="seg" id="seg" role="group" aria-label="I am">
         <button type="button" data-v="Investor" aria-pressed="true">Investor</button>
         <button type="button" data-v="Pilot partner" aria-pressed="false">Pilot partner</button>
         <button type="button" data-v="Manufacturer" aria-pressed="false">Manufacturer</button>
       </div>
       <input type="hidden" name="role" id="f-role" value="Investor">
       <div class="frow">
         <div class="field"><label for="f-name">Name <span class="req">*</span></label><input id="f-name" required><div class="msg">Please add your name.</div></div>
         <div class="field"><label for="f-org">Organisation <span class="req">*</span></label><input id="f-org" required><div class="msg">Please add your organisation.</div></div>
       </div>
       <div class="field"><label for="f-mail">Work email <span class="req">*</span></label><input id="f-mail" type="email" required><div class="msg">Please add a valid email.</div></div>
       <div class="field"><label for="f-msg">What would you like to explore?</label><textarea id="f-msg" placeholder="Your process, site, cheque size, or the heat you are trying to green..."></textarea><div class="msg"></div></div>
       <div class="form-foot">
         <button class="btn btn-hot btn-lg" type="submit">Send message {ARROW}</button>
         <span class="priv">We only use your details to reply.</span>
       </div>
     </form>
   </div>
 </div>
</section>

</main>

<footer class="foot">
 <div class="wrap">
   <div class="foot-grid">
     <div>
       <a class="brand" href="#top">{mark(26)} HotGreen</a>
       <p class="foot-blurb">Industrial high temperature heat pumps. Ultra-efficient, low carbon steam for industry, from electricity.</p>
     </div>
     <div class="foot-col"><h4>Explore</h4><a href="#technology">Technology</a><a href="#efficiency">Efficiency</a><a href="#sectors">Sectors</a><a href="#team">Team</a></div>
     <div class="foot-col"><h4>Move forward</h4><a href="#contact">Investors</a><a href="#contact">Pilot partners</a><a href="#contact">Manufacturers</a></div>
     <div class="foot-col"><h4>Company</h4><p>Datchet, United Kingdom</p><a href="https://www.hotgreensolutions.com">hotgreensolutions.com</a></div>
   </div>
   <div class="foot-bot">
     <span>&copy; HotGreen Solutions &middot; Ultra-efficient low carbon steam for industry</span>
     <span>Performance figures reflect target and reported values from company and public sources.</span>
   </div>
 </div>
</footer>

<script>
(function(){{
 var d=document,root=d.documentElement;
 var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
 // nav burger
 var nav=d.getElementById('nav'),bg=d.getElementById('burger');
 if(bg)bg.addEventListener('click',function(){{var o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)}});
 d.querySelectorAll('.nav-links a').forEach(function(a){{a.addEventListener('click',function(){{nav.classList.remove('open')}})}});
 // reveal
 var io=new IntersectionObserver(function(es){{es.forEach(function(e){{if(e.isIntersecting){{e.target.classList.add('in');
   e.target.querySelectorAll&&e.target.querySelectorAll('.draw').forEach(function(p){{var L=p.getTotalLength?p.getTotalLength():1;p.style.strokeDasharray=L;p.style.strokeDashoffset=L;requestAnimationFrame(function(){{p.classList.add('in');p.style.strokeDashoffset=0}})}});
   if(e.target.dataset&&e.target.dataset.count!==undefined)countUp(e.target);
   e.target.querySelectorAll&&e.target.querySelectorAll('[data-count]').forEach(countUp);
   io.unobserve(e.target)}}}})}},{{threshold:.16}});
 d.querySelectorAll('.rv,.rv-s,.draw,[data-count]').forEach(function(el){{io.observe(el)}});
 // counters
 function countUp(el){{
   if(el._done)return;el._done=1;
   var t=parseFloat(el.dataset.count),dec=parseInt(el.dataset.dec||'0'),pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
   if(reduce){{el.innerHTML=pre+t.toFixed(dec)+suf;return}}
   var s=null,dur=1300;
   function step(ts){{if(!s)s=ts;var p=Math.min((ts-s)/dur,1);var v=(1-Math.pow(1-p,3))*t;
     el.innerHTML=pre+v.toFixed(dec)+suf;if(p<1)requestAnimationFrame(step)}}
   requestAnimationFrame(step);
 }}
 // spine marker + warm shift with scroll
 var mk=d.getElementById('spineMk'),navTemp=d.getElementById('navTemp'),bigTemp=d.getElementById('bigTemp');
 function onScroll(){{
   var h=d.documentElement.scrollHeight-window.innerHeight;var p=h>0?Math.min(window.scrollY/h,1):0;
   if(mk)mk.style.top='calc(14vh + '+(p*72)+'vh)';
 }}
 window.addEventListener('scroll',onScroll,{{passive:true}});onScroll();
 // segmented control -> form role + prefill from audience links
 var seg=d.getElementById('seg'),role=d.getElementById('f-role');
 if(seg)seg.querySelectorAll('button').forEach(function(b){{b.addEventListener('click',function(){{
   seg.querySelectorAll('button').forEach(function(x){{x.setAttribute('aria-pressed','false')}});
   b.setAttribute('aria-pressed','true');role.value=b.dataset.v;}})}});
 function setSeg(v){{if(!seg)return;seg.querySelectorAll('button').forEach(function(b){{var on=b.dataset.v.toLowerCase()===v.toLowerCase();b.setAttribute('aria-pressed',on);if(on)role.value=b.dataset.v}})}}
 d.querySelectorAll('.js-seg').forEach(function(a){{a.addEventListener('click',function(){{
   var m={{'investors':'Investor','pilot partners':'Pilot partner','manufacturers':'Manufacturer'}};
   setSeg(m[(a.dataset.seg||'').toLowerCase()]||'Investor');}})}});
 // form validate
 var f=d.getElementById('hgform');
 f.addEventListener('submit',function(e){{e.preventDefault();var ok=true;
   [['f-name'],['f-org'],['f-mail']].forEach(function(x){{var el=d.getElementById(x[0]),fl=el.closest('.field'),v=el.value.trim();
     var bad=!v||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));fl.classList.toggle('err',bad);if(bad)ok=false}});
   if(!ok){{f.querySelector('.err input').focus();return}}
   d.getElementById('hgok').classList.add('on');f.classList.add('done');
   d.getElementById('hgok').scrollIntoView({{behavior:'smooth',block:'center'}});}});
 f.querySelectorAll('input').forEach(function(el){{el.addEventListener('input',function(){{el.closest('.field').classList.remove('err')}})}});

 // ===== HERO THERMAL CANVAS =====
 var cv=d.getElementById('heroCanvas');
 if(cv && cv.getContext){{
   var ctx=cv.getContext('2d'),W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2),parts=[],raf=0,running=false;
   function ramp(t){{ // 0 cold -> 1 hot
     t=Math.max(0,Math.min(1,t));
     var stops=[[42,108,240],[56,189,248],[245,196,81],[251,146,60],[239,68,68]];
     var x=t*(stops.length-1),i=Math.floor(x),fr=x-i;i=Math.min(i,stops.length-2);
     var a=stops[i],b=stops[i+1];
     return 'rgb('+Math.round(a[0]+(b[0]-a[0])*fr)+','+Math.round(a[1]+(b[1]-a[1])*fr)+','+Math.round(a[2]+(b[2]-a[2])*fr)+')';
   }}
   function resize(){{
     W=cv.clientWidth;H=cv.clientHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
     var target=Math.round((W*H)/12000);target=Math.max(60,Math.min(target,reduce?110:250));
     parts=[];for(var i=0;i<target;i++)parts.push(mk());
   }}
   function mk(){{return {{x:Math.random()*W*0.35,y:Math.random()*H,vx:0.3+Math.random()*0.7,r:1+Math.random()*2.6,ph:Math.random()*6.28,sp:0.4+Math.random()*0.8}};}}
   function reset(p){{p.x=-10-Math.random()*40;p.y=Math.random()*H;p.vx=0.3+Math.random()*0.7;p.r=1+Math.random()*2.6;}}
   function frame(){{
     ctx.clearRect(0,0,W,H);
     ctx.globalCompositeOperation='lighter';
     for(var i=0;i<parts.length;i++){{var p=parts[i];
       var t=Math.max(0,Math.min(1,(p.x/W-0.12)/0.72)); // temperature by x
       // rise as it heats (steam)
       p.x+=p.vx*(0.6+t*1.9);
       p.y+= -t*t*1.7 + Math.sin(p.ph+p.x*0.012)*0.5*p.sp;
       p.ph+=0.02;
       if(p.x>W+20||p.y<-20)reset(p);
       var col=ramp(t),a=0.10+t*0.55;
       var rr=p.r*(1+t*1.3);
       var g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,rr*4);
       g.addColorStop(0,col.replace('rgb','rgba').replace(')',','+a+')'));
       g.addColorStop(1,col.replace('rgb','rgba').replace(')',',0)'));
       ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,rr*4,0,6.283);ctx.fill();
       ctx.fillStyle=col.replace('rgb','rgba').replace(')',','+Math.min(a+0.25,0.9)+')');
       ctx.beginPath();ctx.arc(p.x,p.y,rr,0,6.283);ctx.fill();
     }}
     ctx.globalCompositeOperation='source-over';
     raf=requestAnimationFrame(frame);
   }}
   function start(){{if(running||reduce)return;running=true;frame();}}
   function stop(){{running=false;cancelAnimationFrame(raf);}}
   resize();
   if(reduce){{ // one static frame
     for(var k=0;k<parts.length;k++){{var p=parts[k];p.x=Math.random()*W;}}
     frame();stop();
   }} else start();
   window.addEventListener('resize',function(){{resize();}});
   var hero=d.querySelector('.hero');
   new IntersectionObserver(function(es){{es.forEach(function(e){{e.isIntersecting?start():stop();}})}},{{threshold:.02}}).observe(hero);
   d.addEventListener('visibilitychange',function(){{d.hidden?stop():start();}});
 }}
}})();
</script>
</body>
</html>'''

open('index.html','w',encoding='utf-8').write(HTML)
print('wrote index.html',len(HTML.encode('utf-8'))//1024,'KB')
