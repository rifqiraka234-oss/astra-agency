#!/usr/bin/env python3
import base64, pathlib, re
A = pathlib.Path("/home/user/astra-agency/state/prototypes/diisco/assets")
OUT = pathlib.Path("/home/user/astra-agency/state/prototypes/diisco/index.html")
def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def font(f): return "data:font/woff2;base64," + b64(A/"fonts"/f)
def svg_inline(name, cls):
    s = pathlib.Path(A/name).read_text(); s = s[s.index("<svg"):]
    for c in set(re.findall(r'\.(cls-\d+)', s)): s = s.replace(c, f"{cls}-{c}")
    return re.sub(r'<svg ', f'<svg class="{cls}" ', s, count=1)

FONTS = "".join(f"@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:swap;src:url({font(f)}) format('woff2')}}"
  for fam,w,f in [("Schibsted Grotesk",600,"sg600.woff2"),("Schibsted Grotesk",700,"sg700.woff2"),("Schibsted Grotesk",800,"sg800.woff2"),
                  ("Kumbh Sans",400,"ks400.woff2"),("Kumbh Sans",600,"ks600.woff2"),("Kumbh Sans",700,"ks700.woff2")])
LOGO = svg_inline("logo_light.svg","dl")

# ---- data (all demo / sample) ----
# workers pool: id, ini, name, role, rating, shifts, dist, rate, score, colour
WK = [
 ("w_amara","AR","Amara Reyes","Chef de partie",4.9,132,"1.2 mi","£16 p/h",98,"#A414D9"),
 ("w_priya","PJ","Priya Joshi","Waiting staff",4.9,164,"2.1 mi","£12 p/h",99,"#3CC89E"),
 ("w_mei","MC","Mei Chen","Sous chef",5.0,71,"1.8 mi","£18 p/h",97,"#7B3FE4"),
 ("w_tomas","TN","Tomas Novak","Bartender",4.8,87,"0.6 mi","£13 p/h",95,"#3B82F6"),
 ("w_leon","LO","Leon Osei","Event staff",4.7,54,"3.0 mi","£12 p/h",90,"#F97316"),
 ("w_danny","DK","Danny Kaur","Bar back",4.6,39,"0.9 mi","£11 p/h",88,"#EC4899"),
]
import json
WK_JSON = json.dumps([{"id":i,"ini":ini,"name":n,"role":r,"rating":rt,"shifts":sh,"dist":d,"rate":ra,"score":sc,"col":c} for i,ini,n,r,rt,sh,d,ra,sc,c in WK])
# rota shifts: id, day label, date, role, time, hours, rate, status, workerId
SHIFTS = [
 ("s1","Tonight","Thu 3 Sep","Bartender","18:00","6","£14 p/h","filled","w_tomas"),
 ("s2","Tomorrow","Fri 4 Sep","Chef de partie","17:00","6","£15 p/h","open",None),
 ("s3","Tomorrow","Fri 4 Sep","Waiting staff","18:00","5","£12 p/h","filled","w_priya"),
 ("s4","Saturday","Sat 5 Sep","Sous chef","15:00","8","£18 p/h","filled","w_mei"),
 ("s5","Saturday","Sat 5 Sep","Event staff","16:00","6","£13 p/h","open",None),
]
SHIFTS_JSON = json.dumps([{"id":i,"day":dy,"date":dt,"role":r,"time":tm,"hours":h,"rate":ra,"status":st,"worker":w} for i,dy,dt,r,tm,h,ra,st,w in SHIFTS])

NAV = [("tonight","Tonight",'<path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm8 0h8v-9h-8v9Zm0-16v5h8V4h-8Z" fill="currentColor"/>'),
       ("post","Post a shift",'<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'),
       ("team","My team",'<circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 19c0-3 2.6-4.6 5.5-4.6s5.5 1.6 5.5 4.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16 6.2A3 3 0 0 1 16 12M17.5 19c0-2.2-.9-3.8-2.4-4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>')]
def navitem(v,label,icon,active):
    return f'<button class="navitem{" active" if active else ""}" data-nav="{v}" type="button"><svg viewBox="0 0 24 24" width="22" height="22" fill="none">{icon}</svg><span>{label}</span></button>'
NAVDESK="".join(navitem(v,l,i,v=="tonight") for v,l,i in NAV)
NAVMOB="".join(navitem(v,l,i,v=="tonight") for v,l,i in NAV)

HTML=f"""<title>Diisco for Venues, your staffing in one place</title>
<meta name="description" content="A sample Diisco venue app. See your rota, fill an open shift by matching ranked rated staff in real time, and manage your team.">
<style>
{FONTS}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{
 --void:#0E0518;--void2:#160A28;--panel:#1C0E36;--panel2:#241246;--raise:#2B1656;
 --line:#33205C;--line2:#442B76;--ink:#F5EFFF;--dim:#B7A6DA;--dim2:#8A79AE;
 --purple:#A414D9;--purple2:#7B3FE4;--blue:#3B82F6;--mint:#3CC89E;--mint2:#6BF0C0;
 --gold:#F4B400;--pink:#EC4899;--orange:#F97316;--amber:#F5A623;
 --sans:'Kumbh Sans',system-ui,sans-serif;--disp:'Schibsted Grotesk','Kumbh Sans',system-ui,sans-serif;
}}
html{{-webkit-text-size-adjust:100%}}
body{{font-family:var(--sans);color:var(--ink);line-height:1.5;-webkit-font-smoothing:antialiased;
 background:radial-gradient(900px 500px at 88% -8%,rgba(164,20,217,.22),transparent 60%),radial-gradient(700px 420px at -6% 4%,rgba(59,130,246,.16),transparent 60%),var(--void);min-height:100vh}}
h1,h2,h3,.disp{{font-family:var(--disp);font-weight:800;line-height:1.06;letter-spacing:-.02em}}
.mono{{font-family:var(--disp);font-variant-numeric:tabular-nums;letter-spacing:.02em}}
button{{font-family:inherit}}

/* ---------- app shell ---------- */
.app{{display:grid;grid-template-columns:248px 1fr;min-height:100vh;max-width:1280px;margin:0 auto}}
.side{{border-right:1px solid var(--line);padding:22px 16px;display:flex;flex-direction:column;gap:6px;position:sticky;top:0;height:100vh}}
.side .brand{{display:flex;align-items:center;gap:8px;padding:6px 8px 20px}}
.side .brand .dl{{height:24px;width:auto}}
.nav{{display:flex;flex-direction:column;gap:4px}}
.navitem{{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:none;color:var(--dim);font-size:15px;font-weight:600;padding:11px 12px;border-radius:12px;cursor:pointer;transition:background .15s,color .15s}}
.navitem svg{{flex:0 0 auto;color:var(--dim2)}}
.navitem:hover{{background:rgba(255,255,255,.04);color:var(--ink)}}
.navitem.active{{background:linear-gradient(100deg,rgba(164,20,217,.22),rgba(123,63,228,.12));color:#fff;box-shadow:inset 0 0 0 1px rgba(164,20,217,.4)}}
.navitem.active svg{{color:var(--mint2)}}
.side .venue{{margin-top:auto;display:flex;align-items:center;gap:10px;padding:12px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.02)}}
.side .venue .vlogo{{width:38px;height:38px;border-radius:11px;background:linear-gradient(140deg,var(--purple),var(--blue));display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;color:#fff;font-size:15px;flex:0 0 auto}}
.side .venue b{{font-family:var(--disp);font-size:14px;display:block}}
.side .venue span{{font-size:12px;color:var(--dim2)}}
.side .sample{{margin-top:12px;text-align:center;font-size:11px;color:var(--dim2);line-height:1.4}}

.main{{min-width:0;display:flex;flex-direction:column}}
.topbar{{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:14px;padding:16px 26px;background:rgba(14,5,24,.78);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}}
.topbar .tt{{font-family:var(--disp);font-weight:800;font-size:17px}}
.topbar .td{{font-size:12.5px;color:var(--dim2)}}
.topbar .astra{{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;color:var(--mint2);background:rgba(60,200,158,.10);border:1px solid rgba(60,200,158,.32);padding:6px 12px;border-radius:999px}}
.pulse{{width:8px;height:8px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(60,200,158,.6);animation:pz 2s infinite}}
@keyframes pz{{0%{{box-shadow:0 0 0 0 rgba(60,200,158,.5)}}70%{{box-shadow:0 0 0 8px rgba(60,200,158,0)}}100%{{box-shadow:0 0 0 0 rgba(60,200,158,0)}}}}
.content{{padding:26px;max-width:960px;width:100%}}
.view[hidden]{{display:none!important}}
.view{{animation:vin .4s cubic-bezier(.2,.7,.2,1)}}
@keyframes vin{{from{{opacity:0;transform:translateY(10px)}}to{{opacity:1;transform:none}}}}

/* ---------- tonight / dashboard ---------- */
.hi{{font-size:clamp(24px,3.4vw,32px);margin-bottom:4px}}
.hi-sub{{color:var(--dim);margin-bottom:22px}}
.stats{{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px}}
.stat{{background:linear-gradient(180deg,var(--panel),var(--void2));border:1px solid var(--line);border-radius:16px;padding:16px 18px}}
.stat .n{{font-family:var(--disp);font-weight:800;font-size:28px;line-height:1}}
.stat .l{{font-size:12.5px;color:var(--dim2);margin-top:6px}}
.stat.warn .n{{color:var(--amber)}}
.sec-h{{display:flex;align-items:center;gap:10px;margin:8px 0 12px}}
.sec-h h2{{font-size:17px}} .sec-h .badge{{font-size:11px;font-weight:700;color:var(--void);background:var(--amber);border-radius:999px;padding:3px 9px}}

.gap{{background:linear-gradient(120deg,rgba(245,166,35,.14),rgba(164,20,217,.10));border:1px solid rgba(245,166,35,.45);border-radius:18px;padding:18px 20px;display:flex;align-items:center;gap:16px;margin-bottom:14px;box-shadow:0 0 40px -18px rgba(245,166,35,.5)}}
.gap .gi{{width:46px;height:46px;flex:0 0 auto;border-radius:13px;background:rgba(245,166,35,.16);border:1px solid rgba(245,166,35,.5);display:flex;align-items:center;justify-content:center}}
.gap .gm{{flex:1;min-width:0}}
.gap .gm b{{font-family:var(--disp);font-size:16px}}
.gap .gm p{{font-size:13px;color:var(--dim);margin-top:2px}}
.gap .fill-btn{{flex:0 0 auto}}
.btn{{font-family:var(--disp);font-weight:800;font-size:14.5px;color:#fff;border:none;border-radius:12px;padding:12px 20px;cursor:pointer;background:linear-gradient(100deg,var(--purple),var(--purple2));box-shadow:0 12px 26px -12px rgba(164,20,217,.8);transition:transform .12s,filter .2s}}
.btn:hover{{transform:translateY(-1px);filter:brightness(1.08)}} .btn:active{{transform:none}}
.btn.ghost{{background:rgba(255,255,255,.05);border:1px solid var(--line2);box-shadow:none;color:var(--ink)}}
.btn.sm{{padding:9px 15px;font-size:13px;border-radius:11px}}

.rota{{display:flex;flex-direction:column;gap:10px}}
.rday{{font-family:var(--disp);font-weight:700;font-size:12px;color:var(--dim2);text-transform:uppercase;letter-spacing:.1em;margin:10px 0 2px}}
.shift{{display:flex;align-items:center;gap:14px;background:linear-gradient(180deg,var(--panel),var(--void2));border:1px solid var(--line);border-radius:15px;padding:13px 15px;transition:box-shadow .3s,border-color .3s}}
.shift .stime{{font-family:var(--disp);font-weight:800;font-size:15px;width:52px;flex:0 0 auto}}
.shift .srole{{flex:1;min-width:0}}
.shift .srole b{{font-family:var(--disp);font-weight:700;font-size:15px;display:block}}
.shift .srole span{{font-size:12.5px;color:var(--dim2)}}
.shift .sstat{{flex:0 0 auto;display:flex;align-items:center;gap:9px}}
.who{{display:flex;align-items:center;gap:9px}}
.who .av{{width:34px;height:34px;border-radius:10px;position:relative;display:flex;align-items:center;justify-content:center}}
.who .av span{{position:absolute;inset:2px;border-radius:8px;background:var(--panel2);display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:12px}}
.who .wn{{font-size:13px;font-weight:600}} .who .wn small{{display:block;color:var(--mint2);font-size:11px;font-weight:700}}
.tag-open{{font-size:12px;font-weight:700;color:var(--amber);background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.4);border-radius:999px;padding:5px 11px}}
.shift.justfilled{{border-color:var(--mint);box-shadow:0 0 34px -12px rgba(60,200,158,.7)}}
.proof{{margin-top:24px;font-size:12.5px;color:var(--dim2);display:flex;align-items:center;gap:8px;flex-wrap:wrap}}
.proof b{{color:var(--dim)}}

/* ---------- post / console ---------- */
.console{{background:linear-gradient(180deg,var(--panel),var(--void2));border:1px solid var(--line2);border-radius:22px;overflow:hidden;box-shadow:0 0 70px -34px rgba(164,20,217,.5)}}
.con-head{{display:flex;align-items:center;gap:10px;padding:14px 20px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.02)}}
.con-head .lg{{width:9px;height:9px;border-radius:50%;background:var(--mint);box-shadow:0 0 12px var(--mint)}}
.con-head b{{font-family:var(--disp);font-size:14.5px}} .con-head .for{{font-size:12.5px;color:var(--dim2)}}
.con-head .clk{{margin-left:auto;font-size:12.5px;color:var(--dim);letter-spacing:.05em}}
.con-body{{display:grid;grid-template-columns:.9fr 1.1fr}}
@media(max-width:820px){{.con-body{{grid-template-columns:1fr}}}}
.ticket{{padding:22px 20px;border-right:1px solid var(--line)}}
@media(max-width:820px){{.ticket{{border-right:none;border-bottom:1px solid var(--line)}}}}
.ticket h3{{font-size:18px;margin-bottom:14px}}
.fld{{margin-bottom:13px}}
.fld label{{display:block;font-family:var(--disp);font-size:10.5px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px}}
.fld input,.fld select{{width:100%;font-family:var(--disp);font-weight:600;font-size:15px;color:var(--ink);background:rgba(255,255,255,.04);border:1px solid var(--line2);border-radius:11px;padding:11px 12px}}
.fld select{{appearance:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none'><path d='m6 9 6 6 6-6' stroke='%23B7A6DA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>");background-repeat:no-repeat;background-position:right 12px center}}
.fld input:focus,.fld select:focus{{outline:none;border-color:var(--purple);box-shadow:0 0 0 3px rgba(164,20,217,.2)}}
.row2{{display:grid;grid-template-columns:1fr 1fr;gap:11px}}
.post-btn{{width:100%;margin-top:6px;font-family:var(--disp);font-weight:800;font-size:15.5px;color:#fff;border:none;border-radius:12px;padding:14px 10px;cursor:pointer;background:linear-gradient(100deg,var(--purple),var(--purple2));box-shadow:0 12px 26px -12px rgba(164,20,217,.8);transition:transform .12s,filter .2s}}
.post-btn:hover{{transform:translateY(-1px);filter:brightness(1.08)}}
.post-btn.live{{background:linear-gradient(100deg,#1d5f4a,#155e46);box-shadow:none}}
.post-fee{{margin-top:13px;font-size:12px;color:var(--dim2);display:flex;gap:8px;align-items:flex-start;line-height:1.5}}
.feed{{padding:18px 18px 20px;background:radial-gradient(340px 200px at 82% 0%,rgba(164,20,217,.09),transparent 70%)}}
.feed-head{{display:flex;align-items:center;gap:13px;margin-bottom:14px}}
.ring{{position:relative;width:48px;height:48px;flex:0 0 auto}} .ring svg{{transform:rotate(-90deg)}}
.ring .bg{{stroke:var(--line2)}} .ring .fg{{stroke:var(--mint);stroke-linecap:round;stroke-dasharray:126;stroke-dashoffset:126;transition:stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 0 5px rgba(60,200,158,.8))}}
.ring .rt{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:13px}}
.feed-head .fh-t{{font-family:var(--disp);font-weight:800;font-size:15px}} .feed-head .fh-s{{font-size:12px;color:var(--dim2)}}
.feed-head .cnt{{margin-left:auto;font-family:var(--disp);font-weight:800;font-size:12px;color:var(--void);background:var(--mint2);border-radius:999px;padding:4px 10px}}
.scan{{min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:15px;padding:16px}}
.radar{{position:relative;width:110px;height:110px;border-radius:50%;border:1px solid var(--line2);background:radial-gradient(circle,rgba(164,20,217,.10),transparent 70%)}}
.radar:before,.radar:after{{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid var(--line)}}
.radar:before{{inset:20px}} .radar:after{{inset:40px}}
.radar .sweep{{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(60,200,158,.55),transparent 32%);opacity:0}}
.radar .core{{position:absolute;top:50%;left:50%;width:11px;height:11px;margin:-5.5px;border-radius:50%;background:var(--mint);box-shadow:0 0 16px var(--mint)}}
.scanning .radar .sweep{{opacity:1;animation:spin 1.05s linear infinite}}
@keyframes spin{{to{{transform:rotate(360deg)}}}}
.scan .st{{font-family:var(--disp);font-weight:700;font-size:15px}} .scan .ss{{font-size:12.5px;color:var(--dim2);max-width:26ch}}
.aplist{{list-style:none;display:flex;flex-direction:column;gap:10px}}
.ap{{display:flex;align-items:center;gap:12px;background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.02));border:1px solid var(--line);border-radius:15px;padding:11px 12px;opacity:0;transform:translateY(12px) scale(.97);animation:pop .55s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--d)}}
@keyframes pop{{to{{opacity:1;transform:none}}}}
html:not(.js) .ap{{opacity:1;transform:none;animation:none}}
.ap-av,.who .av{{background:conic-gradient(from 140deg,var(--col),transparent 70%);box-shadow:0 0 16px -4px var(--col)}}
.ap-av{{flex:0 0 auto;width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;position:relative}}
.ap-av span{{position:absolute;inset:2px;border-radius:11px;background:var(--panel2);display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:15px}}
.ap-main{{flex:1;min-width:0}}
.ap-top{{display:flex;align-items:center;gap:8px}} .ap-name{{font-family:var(--disp);font-weight:700;font-size:15px}}
.ap-score{{font-family:var(--disp);font-weight:800;font-size:10.5px;color:var(--mint2);background:rgba(60,200,158,.12);border:1px solid rgba(60,200,158,.3);border-radius:999px;padding:2px 7px}}
.ap-role{{font-size:12.5px;color:var(--dim);font-weight:600}}
.ap-meta{{font-size:11.5px;color:var(--dim2);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
.ap-stars{{color:var(--gold);letter-spacing:-1px}} .ap-meta .d{{opacity:.5}}
.ap-btn{{flex:0 0 auto;font-family:var(--disp);font-weight:700;font-size:13px;color:#fff;background:rgba(164,20,217,.16);border:1px solid var(--purple);border-radius:10px;padding:9px 15px;cursor:pointer;transition:background .18s,transform .12s}}
.ap-btn:hover{{background:var(--purple);transform:translateY(-1px)}}

/* ---------- team ---------- */
.team{{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}}
@media(max-width:680px){{.team{{grid-template-columns:1fr}}}}
.tm{{display:flex;align-items:center;gap:14px;background:linear-gradient(180deg,var(--panel),var(--void2));border:1px solid var(--line);border-radius:16px;padding:16px}}
.tm .tav{{width:52px;height:52px;flex:0 0 auto;border-radius:15px;position:relative;display:flex;align-items:center;justify-content:center}}
.tm .tav span{{position:absolute;inset:2px;border-radius:13px;background:var(--panel2);display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:800;font-size:17px}}
.tm .tinfo{{flex:1;min-width:0}}
.tm .tinfo b{{font-family:var(--disp);font-size:15.5px}} .tm .tinfo .tr{{font-size:12.5px;color:var(--dim);font-weight:600}}
.tm .tinfo .tmeta{{font-size:11.5px;color:var(--dim2);margin-top:3px}}
.tm .tinfo .tmeta .st{{color:var(--gold)}}

/* toast */
.toast{{position:fixed;left:50%;bottom:26px;transform:translate(-50%,140%);z-index:60;display:flex;align-items:center;gap:12px;background:linear-gradient(100deg,rgba(60,200,158,.16),rgba(20,40,32,.9));border:1px solid var(--mint);border-radius:14px;padding:13px 18px;box-shadow:0 20px 50px -20px rgba(0,0,0,.7),0 0 40px -14px rgba(60,200,158,.7);max-width:calc(100vw - 36px);transition:transform .5s cubic-bezier(.2,.8,.2,1)}}
.toast.on{{transform:translate(-50%,0)}}
.toast .ti{{width:34px;height:34px;flex:0 0 auto;border-radius:10px;background:var(--mint);display:flex;align-items:center;justify-content:center}}
.toast b{{font-family:var(--disp);font-size:14px}} .toast .ts{{font-size:12px;color:var(--dim)}}

/* mobile nav */
.mobnav{{display:none}}
.appfoot{{border-top:1px solid var(--line);padding:22px 26px 30px;color:var(--dim2);font-size:12px;text-align:center}}
.appfoot .dlf{{height:18px;opacity:.85;margin-bottom:10px}}
.appfoot p{{max-width:60ch;margin:0 auto}}

@media(max-width:860px){{
 .app{{grid-template-columns:1fr}}
 .side{{display:none}}
 .content{{padding:20px 16px 96px}}
 .topbar{{padding:14px 18px}}
 .mobnav{{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:50;background:rgba(14,5,24,.92);backdrop-filter:blur(16px);border-top:1px solid var(--line);padding:8px 8px calc(8px + env(safe-area-inset-bottom))}}
 .mobnav .navitem{{flex:1;flex-direction:column;gap:4px;font-size:11px;padding:8px 4px;justify-content:center;text-align:center;border-radius:12px}}
 .mobnav .navitem span{{font-size:11px}}
 .stats{{grid-template-columns:repeat(3,1fr);gap:9px}} .stat{{padding:13px 12px}} .stat .n{{font-size:22px}} .stat .l{{font-size:11px}}
 .gap{{flex-wrap:wrap}} .gap .fill-btn{{flex:1 1 100%}} .gap .fill-btn .btn{{width:100%}}
 .ap{{flex-wrap:wrap}} .ap-av{{order:1}} .ap-main{{order:2;flex:1 1 calc(100% - 58px)}} .ap-btn{{order:3;flex:1 1 100%;margin-top:10px;padding:11px}}
 .shift{{flex-wrap:wrap;row-gap:8px}} .shift .srole{{flex:1 1 calc(100% - 66px)}} .shift .sstat{{flex:1 1 100%;justify-content:flex-end}}
}}
html:not(.js) .scan{{display:none}} html:not(.js) #apList{{display:flex!important}}
html:not(.js) [data-view]:not(#v-tonight){{display:none!important}}
@media (prefers-reduced-motion: reduce){{.view,.ap{{animation:none}}.radar .sweep,.pulse{{animation:none!important}}.ring .fg{{transition:none}}}}
[hidden]{{display:none!important}}
</style>

<div class="app">
  <aside class="side">
    <div class="brand">{LOGO}</div>
    <nav class="nav">{NAVDESK}</nav>
    <div class="venue"><span class="vlogo">CS</span><div><b>The Copper Still</b><span>Shoreditch, London</span></div></div>
    <p class="sample">Sample venue app by ASTRA. Demo data.</p>
  </aside>

  <div class="main">
    <div class="topbar">
      <div><div class="tt" id="topTitle">Tonight</div><div class="td" id="topDate">Thursday 3 September</div></div>
      <span class="astra"><span class="pulse"></span>Live sample by ASTRA</span>
    </div>

    <div class="content">
      <!-- TONIGHT -->
      <section class="view" data-view id="v-tonight">
        <h1 class="hi">Evening, Copper Still 👋</h1>
        <p class="hi-sub">Here is your week. One shift still needs a body on it.</p>
        <div class="stats">
          <div class="stat"><div class="n" id="stTotal">5</div><div class="l">Shifts this week</div></div>
          <div class="stat"><div class="n mono" id="stFilled" style="color:var(--mint2)">3</div><div class="l">Filled</div></div>
          <div class="stat warn"><div class="n mono" id="stOpen">2</div><div class="l">Still open</div></div>
        </div>
        <div class="sec-h"><h2>Needs filling</h2><span class="badge" id="gapBadge">2 open</span></div>
        <div id="gapZone"></div>
        <div class="sec-h" style="margin-top:22px"><h2>Your rota</h2></div>
        <div class="rota" id="rota"></div>
        <div class="proof"><b>Trusted by venues like</b> The Marlowe Inn (Edinburgh) and Salt &amp; Thyme (Bristol) &middot; as seen in Leeds Today and The Business Desk</div>
      </section>

      <!-- POST -->
      <section class="view" data-view id="v-post" hidden>
        <h1 class="hi">Fill a shift</h1>
        <p class="hi-sub" id="postSub">Drop a shift and watch your ranked pool light up in real time.</p>
        <div class="console">
          <div class="con-head"><span class="lg"></span><b>Matching</b><span class="for" id="conFor"></span><span class="clk mono">18:04</span></div>
          <div class="con-body">
            <form class="ticket" id="shiftForm" novalidate>
              <h3>Shift details</h3>
              <div class="fld"><label for="role">Role</label><select id="role"><option>Chef de partie</option><option>Sous chef</option><option>Bartender</option><option>Waiting staff</option><option>Event staff</option><option>Bar back</option></select></div>
              <div class="row2"><div class="fld"><label for="date">Date</label><input id="date" value="Fri 4 Sep" autocomplete="off"></div><div class="fld"><label for="hours">Hours</label><input id="hours" value="6" inputmode="numeric" autocomplete="off"></div></div>
              <div class="row2"><div class="fld"><label for="time">Start</label><input id="time" value="17:00" autocomplete="off"></div><div class="fld"><label for="rate">Pay rate</label><input id="rate" value="£15 p/h" autocomplete="off"></div></div>
              <button class="post-btn" id="postBtn" type="submit">Post to your pool</button>
              <p class="post-fee"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" stroke="#8A79AE" stroke-width="1.6" stroke-linejoin="round"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke="#8A79AE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>One flat fee per shift instead of an hourly agency markup. You only pay when a worker checks in.</span></p>
            </form>
            <div class="feed">
              <div class="feed-head">
                <div class="ring" aria-hidden="true"><svg width="48" height="48" viewBox="0 0 48 48"><circle class="bg" cx="24" cy="24" r="20" fill="none" stroke-width="4"/><circle class="fg" id="ringFg" cx="24" cy="24" r="20" fill="none" stroke-width="4"/></svg><span class="rt mono" id="ringTxt">0/1</span></div>
                <div><div class="fh-t">Filling your shift</div><div class="fh-s" id="feedSub">Ranked by score. Sample data.</div></div>
                <span class="cnt" id="apCount" hidden>0</span>
              </div>
              <div class="scan" id="scan"><div class="radar"><span class="sweep"></span><span class="core"></span></div><div class="st" id="scanT">Ready when you are</div><div class="ss" id="scanS">Post the shift and watch qualified, rated staff apply within seconds.</div></div>
              <ul class="aplist" id="apList" hidden></ul>
            </div>
          </div>
        </div>
      </section>

      <!-- TEAM -->
      <section class="view" data-view id="v-team" hidden>
        <h1 class="hi">My team</h1>
        <p class="hi-sub">Rated staff you have worked with and can rebook in a tap.</p>
        <div class="team" id="teamGrid"></div>
      </section>
    </div>

    <footer class="appfoot">
      {svg_inline("logo_light.svg","dlf").replace('class="dlf"','class="dlf"',1)}
      <p>Sample venue app built by ASTRA to show the Diisco venue experience. The venue, rota, workers and shift data are demonstration data, not a live Diisco product. Venue names in the trust line are from Diisco's own site. No affiliation or endorsement implied. Built for Alex at Diisco.</p>
    </footer>
  </div>

  <nav class="mobnav">{NAVMOB}</nav>
</div>

<div class="toast" id="toast" role="status" aria-live="polite"><span class="ti"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7" stroke="#08160f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b id="toastT">Shift filled</b><div class="ts" id="toastS"></div></div></div>
"""

SCRIPT = r'''<script>
document.documentElement.classList.add('js');
(function(){
  var WK=__WKJSON__, SHIFTS=__SHJSON__;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var byId=function(id){return document.getElementById(id);};
  function wk(id){return WK.filter(function(w){return w.id===id;})[0];}
  function stars(r){return '★'.repeat(Math.round(r));}
  var TITLES={tonight:['Tonight','Thursday 3 September'],post:['Fill a shift','Matching staff to your gap'],team:['My team','6 rated regulars']};

  /* ---- nav ---- */
  function go(view){
    document.querySelectorAll('[data-view]').forEach(function(v){v.hidden=(v.id!=='v-'+view);});
    document.querySelectorAll('.navitem').forEach(function(n){n.classList.toggle('active',n.getAttribute('data-nav')===view);});
    byId('topTitle').textContent=TITLES[view][0]; byId('topDate').textContent=TITLES[view][1];
    document.querySelector('.content').scrollTo?0:0; window.scrollTo(0,0);
  }
  document.querySelectorAll('.navitem').forEach(function(n){n.addEventListener('click',function(){ if(n.getAttribute('data-nav')==='post'){prime(firstOpen());} go(n.getAttribute('data-nav')); });});

  /* ---- dashboard render ---- */
  function firstOpen(){return SHIFTS.filter(function(s){return s.status==='open';})[0];}
  function renderStats(){
    byId('stTotal').textContent=SHIFTS.length;
    var f=SHIFTS.filter(function(s){return s.status==='filled';}).length;
    byId('stFilled').textContent=f; byId('stOpen').textContent=SHIFTS.length-f;
    var open=SHIFTS.length-f; byId('gapBadge').textContent=open+' open';
  }
  function gapCard(s){
    return '<div class="gap" data-shift="'+s.id+'"><span class="gi"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 8v5l3 2" stroke="#F5A623" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="#F5A623" stroke-width="1.6"/></svg></span>'
      +'<div class="gm"><b>'+s.role+' still needed</b><p>'+s.day+' &middot; '+s.date+' &middot; '+s.time+' &middot; '+s.hours+' hrs &middot; '+s.rate+'</p></div>'
      +'<div class="fill-btn"><button class="btn fill" data-shift="'+s.id+'" type="button">Fill this shift</button></div></div>';
  }
  function shiftRow(s){
    var right;
    if(s.status==='filled'){var w=wk(s.worker);
      right='<div class="who"><div class="av" style="--col:'+w.col+'"><span>'+w.ini+'</span></div><div class="wn">'+w.name.split(' ')[0]+' '+w.name.split(' ')[1][0]+'.<small>'+stars(w.rating)+' '+w.rating+'</small></div></div>';
    } else { right='<span class="tag-open">Open</span><button class="btn sm fill" data-shift="'+s.id+'" type="button">Fill</button>'; }
    return '<div class="shift" id="row-'+s.id+'"><div class="stime mono">'+s.time+'</div><div class="srole"><b>'+s.role+'</b><span>'+s.date+' &middot; '+s.hours+' hrs &middot; '+s.rate+'</span></div><div class="sstat">'+right+'</div></div>';
  }
  function renderDash(){
    renderStats();
    var opens=SHIFTS.filter(function(s){return s.status==='open';});
    byId('gapZone').innerHTML = opens.length? opens.map(gapCard).join('') :
      '<div class="gap" style="border-color:var(--line2);box-shadow:none;background:rgba(255,255,255,.02)"><span class="gi" style="background:rgba(60,200,158,.12);border-color:rgba(60,200,158,.4)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7" stroke="#6BF0C0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div class="gm"><b>Every shift is covered</b><p>Nice. Your whole week is staffed.</p></div></div>';
    document.querySelector('.sec-h .badge').style.display=opens.length?'':'none';
    // rota grouped by day
    var days=[], seen={}; SHIFTS.forEach(function(s){if(!seen[s.date]){seen[s.date]=1;days.push(s.date);}});
    byId('rota').innerHTML=days.map(function(d){
      var lab=SHIFTS.filter(function(s){return s.date===d;})[0].day;
      return '<div class="rday">'+lab+' &middot; '+d+'</div>'+SHIFTS.filter(function(s){return s.date===d;}).map(shiftRow).join('');
    }).join('');
    bindFill();
  }
  function bindFill(){
    document.querySelectorAll('.fill').forEach(function(b){
      b.addEventListener('click',function(){ var s=SHIFTS.filter(function(x){return x.id===b.getAttribute('data-shift');})[0]; prime(s); go('post'); });
    });
  }

  /* ---- team ---- */
  byId('teamGrid').innerHTML=WK.map(function(w){
    return '<div class="tm"><div class="tav" style="--col:'+w.col+'"><span>'+w.ini+'</span></div><div class="tinfo"><b>'+w.name+'</b><div class="tr">'+w.role+'</div><div class="tmeta"><span class="st">'+stars(w.rating)+'</span> '+w.rating+' &middot; '+w.shifts+' shifts &middot; '+w.dist+'</div></div><button class="btn sm ghost rebook" data-role="'+w.role+'" type="button">Rebook</button></div>';
  }).join('');
  byId('teamGrid').addEventListener('click',function(e){var b=e.target.closest('.rebook'); if(!b)return; var s=firstOpen()||SHIFTS[0]; prime(s); if(b.getAttribute('data-role')) byId('role').value=b.getAttribute('data-role'); go('post');});

  /* ---- post / console ---- */
  var target=null, posted=false, busy=false;
  var form=byId('shiftForm'),list=byId('apList'),scan=byId('scan'),feedSub=byId('feedSub'),postBtn=byId('postBtn'),
      cnt=byId('apCount'),ringFg=byId('ringFg'),ringTxt=byId('ringTxt'),scanT=byId('scanT'),scanS=byId('scanS'),conFor=byId('conFor'),postSub=byId('postSub');
  function setRing(v){ringFg.style.strokeDashoffset=(126-126*v).toFixed(1);}
  function prime(s){
    target=s||firstOpen()||SHIFTS[0];
    byId('role').value=target.role; byId('date').value=target.date; byId('time').value=target.time; byId('hours').value=target.hours; byId('rate').value=target.rate;
    conFor.textContent='· '+target.role+', '+target.date;
    postSub.textContent='Filling your '+target.role.toLowerCase()+' gap on '+target.date+'. Post it and watch the pool light up.';
    resetFeed();
  }
  function resetFeed(){
    posted=false;busy=false; list.hidden=true; list.innerHTML=''; cnt.hidden=true; cnt.textContent='0';
    scan.style.display=''; scan.classList.remove('scanning'); scanT.textContent='Ready when you are';
    scanS.textContent='Post the shift and watch qualified, rated staff apply within seconds.';
    feedSub.textContent='Ranked by score. Sample data.'; setRing(0); ringTxt.textContent='0/1';
    postBtn.textContent='Post to your pool'; postBtn.classList.remove('live');
  }
  function cardHTML(w,i){
    return '<li class="ap" style="--d:'+(i*220)+'ms;--col:'+w.col+'"><div class="ap-av"><span>'+w.ini+'</span></div>'
     +'<div class="ap-main"><div class="ap-top"><span class="ap-name">'+w.name.split(' ')[0]+' '+w.name.split(' ')[1][0]+'.</span><span class="ap-score">'+w.score+'</span></div>'
     +'<div class="ap-role">'+w.role+'</div><div class="ap-meta"><span class="ap-stars">'+stars(w.rating)+'</span> <b>'+w.rating+'</b> <span class="d">&middot;</span> '+w.shifts+' shifts <span class="d">&middot;</span> '+w.dist+' <span class="d">&middot;</span> '+w.rate+'</div></div>'
     +'<button class="ap-btn" data-w="'+w.id+'" type="button">Confirm</button></li>';
  }
  function fill(){
    var ranked=WK.slice().sort(function(a,b){return b.score-a.score;});
    list.innerHTML=ranked.map(cardHTML).join(''); scan.style.display='none'; list.hidden=false; cnt.hidden=false;
    feedSub.textContent=target.role+' · '+target.date+' at '+target.time+' · sample data';
    var n=0, step=reduce?0:220;
    ranked.forEach(function(w,i){ setTimeout(function(){n++;cnt.textContent=n;}, i*step+(reduce?0:180)); });
    postBtn.textContent='Shift is live, tap a name to confirm'; postBtn.classList.add('live'); busy=false;
  }
  form.addEventListener('submit',function(ev){
    ev.preventDefault(); if(busy)return; if(posted){resetFeed();return;}
    posted=true;busy=true; postBtn.textContent='Posting…';
    scan.style.display=''; scanT.textContent='Scanning your ranked pool'; scanS.textContent='Matching staff by score, rating and distance…';
    if(reduce){fill();return;}
    scan.classList.add('scanning'); setTimeout(function(){scan.classList.remove('scanning');fill();},1050);
  });
  list.addEventListener('click',function(ev){
    var b=ev.target.closest('.ap-btn'); if(!b)return; var w=wk(b.getAttribute('data-w'));
    // mark target shift filled
    target.status='filled'; target.worker=w.id;
    setRing(1); ringTxt.textContent='1/1';
    // toast
    byId('toastT').textContent=w.name.split(' ')[0]+' locked in';
    byId('toastS').textContent=target.role+', '+target.date+' at '+target.time+'. Secure pay on check in.';
    var t=byId('toast'); t.classList.add('on'); setTimeout(function(){t.classList.remove('on');},4200);
    renderDash();
    setTimeout(function(){
      go('tonight');
      var row=byId('row-'+target.id); if(row){row.classList.add('justfilled'); row.scrollIntoView({behavior:'smooth',block:'center'}); setTimeout(function(){row.classList.remove('justfilled');},2600);}
    }, 620);
  });

  /* init */
  renderDash(); prime(firstOpen());
  // clock drift
  var mins=1084; setInterval(function(){mins=(mins+1)%1440;var h=(''+Math.floor(mins/60)).padStart(2,'0'),m=(''+(mins%60)).padStart(2,'0');document.querySelectorAll('.clk').forEach(function(c){c.textContent=h+':'+m;});},9000);
})();
</script>
'''
SCRIPT = SCRIPT.replace('__WKJSON__', WK_JSON).replace('__SHJSON__', SHIFTS_JSON)
OUT.write_text(HTML + '\n' + SCRIPT)
print("WROTE", OUT, len((HTML+SCRIPT).encode()), "bytes")
