# -*- coding: utf-8 -*-
import json, html

A = json.load(open('assets_b64.json'))
FONTS = open('fonts_inline.css').read()

def img(k): return f"data:image/jpeg;base64,{A[k]}" if k in A and not k.startswith('LOGO') else f"data:image/png;base64,{A['LOGO']}"

# ---- REAL product data (from zynox.nl products.json, verbatim specs) ----
# cat: draaien (turning), frezen (milling), rondtafels (rotary), rand (accessories)
P = [
 dict(h='c-series-c46', name='C46', series='C Series', cat='draaien',
   blurb='Compacte productiedraaibank met 30 graden schuine bedframe voor stafwerk en losse delen.',
   key=[('Spilvermogen','5.5 / 7.5 kW'),('Spiltoerental','4.000 rpm'),('Staf tot','Ø45 mm')],
   specs=[('Draaidiameter over bed','Ø400 mm'),('Draaidiameter over slede','Ø100 mm'),('Max. werkstuklengte','250 mm'),
     ('Staf / los werkstuk','Ø45 / Ø380 mm'),('Bedtype','30 graden schuin bed'),('Spilneus','A2-5'),
     ('Spiltoerental','4.000 rpm'),('Spilvermogen','5.5 / 7.5 kW'),('Spilboring','Ø56 mm'),
     ('Z-as slag','250 mm'),('X-as slag','800 mm'),('Geleiding','THK/NSK kogelomloop, THK/INA lineair'),('Ijlgang Z/X','tot 25 m/min')]),
 dict(h='q-series-q52l', name='Q52L', series='Q Series', cat='draaien',
   blurb='Zwaardere draaibank met 45 graden bed en grote spilboring voor forse series.',
   key=[('Spilvermogen','11 / 18 kW'),('Draai over bed','Ø580 mm'),('Staf tot','Ø71 mm')],
   specs=[('Draaidiameter over bed','Ø580 mm'),('Draaidiameter over slede','Ø100 mm'),('Max. werkstuklengte','350 mm'),
     ('Staf / los werkstuk','Ø71 / Ø480 mm'),('Bedtype','45 graden schuin bed'),('Spilneus','A2-8'),
     ('Spiltoerental','3.500 rpm'),('Spilvermogen','11 / 18 kW'),('Spilboring','Ø86 mm'),
     ('Z-as slag','350 mm'),('X-as slag','1.200 mm'),('Geleiding','THK/NSK kogelomloop, THK/INA lineair')]),
 dict(h='l-series-l52w', name='L52W', series='L Series', cat='draaien',
   blurb='Draai-freescentrum met Y-as voor complete bewerking in een opspanning.',
   key=[('Spilvermogen','11 / 15 kW'),('Y-as','plus/min 45 mm'),('Draai over bed','700 mm')],
   specs=[('Draaidiameter over bed','700 mm'),('Max. werkstuklengte','550 mm'),('Staf / los werkstuk','Ø51 / Ø350 mm'),
     ('Bedtype','30 graden schuin bed'),('Spilneus','A2-6'),('Spiltoerental','3.500 rpm'),('Spilvermogen','11 / 15 kW'),
     ('Spilboring','Ø62 mm'),('Z-as slag','550 mm'),('X-as slag','200 mm'),('Y-as slag','plus/min 45 mm'),('Ijlgang Z/X','tot 20 m/min')]),
 dict(h='r-series-r72h', name='R72H', series='R Series', cat='draaien',
   blurb='Draaibank met grote spilboring voor pijp- en stafwerk met forse doorlaat.',
   key=[('Spilboring','Ø85 mm'),('Staf tot','Ø95 mm'),('Spilvermogen','11 / 15 kW')],
   specs=[('Draaidiameter over bed','Ø500 mm'),('Max. werkstuklengte','500 mm'),('Staf / los werkstuk','Ø95 / Ø90 mm'),
     ('Bedtype','30 graden schuin bed'),('Spilneus','A2-8'),('Spiltoerental','3.000 rpm'),('Spilvermogen','11 / 15 kW'),
     ('Spilboring','Ø85 mm'),('Z-as slag','500 mm'),('X-as slag','220 mm'),('Geleiding','THK/NSK kogelomloop, THK/INA lineair')]),
 dict(h='vertical-machining-center-vmc-h13', name='VMC-H13', series='Vertical Machining Center', cat='frezen',
   blurb='Verticaal bewerkingscentrum met rollengeleiding en spil tot 20.000 rpm.',
   key=[('Slag X/Y/Z','1300 / 800 / 700 mm'),('Spiltoerental','tot 20.000 rpm'),('Tafel','1500 x 800 mm')],
   specs=[('Slag X/Y/Z','1300 / 800 / 700 mm'),('Geleiding','high-precision rollengeleiding'),('Tafelafmeting','1500 x 800 mm'),
     ('Ijlgang X/Y/Z','30 / 30 / 30 m/min'),('Aanzet','1 tot 20.000 mm/min'),('Spiltoerental','12.000 / 15.000 / 20.000 rpm'),
     ('Machinegewicht','9.000 kg'),('Machineafmeting','3.500 x 3.100 x 3.200 mm')]),
 dict(h='horizontal-machining-center-series-hmc80', name='HMC80', series='Horizontal Machining Center', cat='frezen',
   blurb='Horizontaal bewerkingscentrum met BT50-spil voor zwaar verspanen in serie.',
   key=[('Slag X/Y/Z','1400 / 1000 / 1050 mm'),('Spil','BT50'),('Gewicht','21.000 kg')],
   specs=[('Slag X/Y/Z','1.400 / 1.000 / 1.050 mm'),('Tafelafmeting','800 x 800 mm'),('Spilopname','BT50'),
     ('Spiltoerental','6.000 rpm'),('Aanzet','1 tot 12.000 mm/min'),('Machinegewicht','21.000 kg'),('Machineafmeting','4.200 x 4.200 x 3.600 mm')]),
 dict(h='heavy-duty-double-column-machining-center-series-hd4028', name='HD4028', series='Heavy Duty Double Column', cat='frezen',
   blurb='Portaalbewerkingscentrum voor de allergrootste werkstukken, 42 ton machinegewicht.',
   key=[('Slag X/Y/Z','4000 / 3200 / 1000 mm'),('Tafel','4200 x 2400 mm'),('Gewicht','42.000 kg')],
   specs=[('Slag X/Y/Z','4.000 / 3.200 / 1.000 mm'),('Geleiding','X/Y rollengeleiding, Z boxway'),('Tafelafmeting','4.200 x 2.400 mm'),
     ('Spilopname','BT50'),('Spiltoerental','6.000 rpm'),('Aandrijving','riem / direct / tandwiel'),
     ('Aanzet','1 tot 10.000 mm/min'),('Ijlgang X/Y/Z','8 / 8 / 8 m/min'),('Machinegewicht','42.000 kg'),('Machineafmeting','11.500 x 6.000 x 5.000 mm')]),
 dict(h='high-precision-series-hp16', name='HP16', series='High Precision Series', cat='frezen',
   blurb='High precision freescentrum met 30 kW spil en 5 ton tafelbelasting.',
   key=[('Slag X/Y/Z','1600 / 1400 / 800 mm'),('Spilmotor','30 kW'),('Tafelbelasting','5.000 kg')],
   specs=[('Slag X/Y/Z','1.600 / 1.400 / 800 mm'),('Geleiding','rollengeleiding'),('Tafelafmeting','1.400 x 1.600 mm'),
     ('Max. belasting','5.000 kg'),('Ijlgang X/Y/Z','24 / 30 / 30 m/min'),('Aanzet','1 tot 12.000 mm/min'),
     ('Spiltoerental','15.000 / 18.000 rpm'),('Spilmotor','30 kW'),('Machinegewicht','20.000 kg')]),
 dict(h='high-speed-tapping-center-st10i', name='ST10i', series='High Speed Tapping Center', cat='frezen',
   blurb='Snel tapcentrum met ijlgang tot 48 m/min voor korte cyclustijden.',
   key=[('Ijlgang X/Y/Z','48 / 48 / 48 m/min'),('Spiltoerental','12.000 rpm'),('Spil','BBT40')],
   specs=[('Slag X/Y/Z','1.000 / 500 / 500 mm'),('Geleiding','high-precision kogelgeleiding'),('Tafelafmeting','1.100 x 500 mm'),
     ('Ijlgang X/Y/Z','48 / 48 / 48 m/min'),('Aanzet','1 tot 20.000 mm/min'),('Spiltoerental','12.000 rpm'),
     ('Spilopname','BBT40'),('Machinegewicht','4.600 kg')]),
 dict(h='5zp-series-5zp1200', name='5ZP1200', series='5ZP Series', cat='frezen',
   blurb='Vijfassig portaalcentrum voor complexe geometrie in een opspanning.',
   key=[('Assen','5-assig portaal'),('Serie','5ZP')],
   specs=[('Type','5-assig portaal bewerkingscentrum'),('Serie','5ZP1200'),('Toepassing','complexe 5-assige geometrie'),
     ('Conformiteit','CE'),('Besturing','op aanvraag: Heidenhain / Siemens / Fanuc')]),
 dict(h='5zb-series-5zb700', name='5ZB700', series='5ZB Series', cat='frezen',
   blurb='Vijfassig bewerkingscentrum uit de 5ZB-serie voor hoogwaardige matrijs- en precisiedelen.',
   key=[('Assen','5-assig'),('Serie','5ZB')],
   specs=[('Type','5-assig bewerkingscentrum'),('Serie','5ZB700'),('Toepassing','matrijzen, lucht- en ruimtevaart, medisch'),
     ('Conformiteit','CE'),('Besturing','op aanvraag: Heidenhain / Siemens / Fanuc')]),
 dict(h='5th-axis-rotary-table-zrt-250', name='ZRT 250', series='5th Axis Rotary Table', cat='rondtafels',
   blurb='Vijfde-as wiegtafel voor volledige 5-assige bewerking op uw bestaande freescentrum.',
   key=[('Tafeldiameter','Ø120 mm'),('Centerhoogte','110 mm'),('Gewicht','35 kg')],
   specs=[('Tafeldiameter','Ø120 mm'),('Centergat','Ø30 H7 mm'),('Centerhoogte (verticaal)','110 mm'),
     ('T-sleuf breedte','12 H7 mm'),('Geleiblokbreedte','14 h7 mm'),('Nettogewicht (excl. servomotor)','35 kg')]),
 dict(h='5th-axis-rotary-table-zt200', name='ZT200', series='5th Axis Rotary Table', cat='rondtafels',
   blurb='Compacte vijfde-as tafel voor kleinere freescentra en fijn precisiewerk.',
   key=[('Type','5e-as wiegtafel'),('Serie','ZT')],
   specs=[('Type','5e-as wiegtafel'),('Serie','ZT200'),('Toepassing','5-assige bewerking op 3-assig centrum'),
     ('Aandrijving','servo'),('Klemming','hydraulisch op aanvraag')]),
 dict(h='4th-axis-rotary-table-z200', name='Z200', series='4th Axis Rotary Table', cat='rondtafels',
   blurb='Vierde-as rondtafel voor indexeren en continu draaien tijdens het frezen.',
   key=[('Tafeldiameter','Ø200 mm'),('Centerhoogte','160 mm'),('Gewicht','85 kg')],
   specs=[('Tafeldiameter','Ø200 mm'),('Centergat','Ø75 H7 mm'),('Centerhoogte (verticaal)','160 mm'),
     ('T-sleuf breedte','12 H7 mm'),('Geleiblokbreedte','18 h7 mm'),('Nettogewicht (excl. servomotor)','85 kg')]),
 dict(h='horizontal-rotary-table-z-h500', name='Z-H500', series='Horizontal Rotary Table', cat='rondtafels',
   blurb='Horizontale rondtafel met roller-gear-cam aandrijving en indexering tot op de boogseconde.',
   key=[('Indexeernauwkeurigheid','plus/min 15 boogsec.'),('Herhaalbaarheid','plus/min 4 boogsec.'),('Belasting','600 kg')],
   specs=[('Tafeldiameter','500 mm'),('Toelaatbare belasting','600 kg'),('Plaathoogte','305 mm'),('Min. increment','0,001 graden'),
     ('T-sleuf breedte','18 H7 mm'),('Indexeernauwkeurigheid','plus/min 15 boogseconden'),('Herhaalbaarheid','plus/min 4 boogseconden'),
     ('Reductieverhouding','1/90'),('Nom./max. toerental','22,2 rpm'),('Centergat','Ø100 H7 mm'),
     ('Nettogewicht (excl. servomotor)','430 kg'),('Klemkoppel','2650 N.m')]),
 dict(h='barfeeder', name='Barfeeder', series='Randapparatuur', cat='rand',
   blurb='Automatische staaftoevoer voor onbemand draaien: minder handling, constante kwaliteit, hogere spilbezetting.',
   key=[('Functie','automatische staaftoevoer'),('Productie','onbemand')],
   specs=[('Functie','automatische staaftoevoer voor CNC-draaimachines'),('Voordeel','onbemande serieproductie'),
     ('Effect','minder handling, constante kwaliteit'),('Koppeling','afgestemd op uw draaimachine')]),
 dict(h='zs-1000', name='ZS-1000', series='Randapparatuur', cat='rand',
   blurb='Spaanafvoer / slag remover die de bewerkingszone continu vrijhoudt tijdens lange runs.',
   key=[('Functie','spaanafvoer'),('Serie','ZS')],
   specs=[('Functie','spaanafvoer / slag remover'),('Serie','ZS-1000'),('Effect','continue vrije bewerkingszone'),
     ('Toepassing','lange onbemande series')]),
 dict(h='z-1-1mc', name='Z-1.1MC', series='Randapparatuur', cat='rand',
   blurb='Olienevelafscheider die de werkplaatslucht schoonhoudt bij nat verspanen.',
   key=[('Vermogen','1,1 kW'),('Luchtdebiet','1450 m3/h'),('Geluid','max. 68 dB(A)')],
   specs=[('Vermogen','1,1 kW'),('Spanning / freq.','AC380V/AC220V 3-fase 50Hz'),('Toerental','2.800 rpm'),
     ('Luchtdebiet','1.450 m3/h'),('Max. statische druk','1,1 kPa'),('Geluidsniveau','max. 68 dB(A)'),
     ('Aanzuigdiameter','Ø150 mm'),('Gewicht','38 kg')]),
]

CATS = [('alle','Alle machines'),('draaien','Draaien'),('frezen','Frezen'),('rondtafels','Rondtafels'),('rand','Randapparatuur')]

def esc(s): return html.escape(str(s), quote=True)

def spec_rows(specs):
    return ''.join(
      f'<div class="sp"><dt>{esc(l)}</dt><dd>{esc(v)}</dd></div>' for l,v in specs)

def card(p, i):
    keys = ''.join(f'<div class="k"><span class="kl">{esc(l)}</span><span class="kv">{esc(v)}</span></div>' for l,v in p['key'])
    full = spec_rows(p['specs'])
    coord = f"{i+1:02d}"
    return f'''<article class="mc" data-cat="{p['cat']}" data-h="{p['h']}" id="m-{p['h']}">
  <div class="mc-plate">
    <span class="mc-coord">MDL_{coord}</span>
    <img class="mc-img" src="{img(p['h'])}" alt="Zynox {esc(p['name'])}, {esc(p['series'].lower())}" loading="lazy" decoding="async">
    <span class="mc-tick" aria-hidden="true"></span>
  </div>
  <div class="mc-body">
    <p class="mc-series">{esc(p['series'])}</p>
    <h3 class="mc-name">{esc(p['name'])}</h3>
    <p class="mc-blurb">{esc(p['blurb'])}</p>
    <div class="mc-keys">{keys}</div>
    <div class="mc-price"><span class="pa">Prijs op aanvraag</span></div>
    <div class="mc-act">
      <button class="btn btn-red js-detail" data-h="{p['h']}" type="button">Bekijk machine</button>
      <a class="btn btn-ghost js-quote" href="#offerte" data-machine="{esc(p['name'])} ({esc(p['series'])})">Offerte</a>
    </div>
    <details class="mc-more">
      <summary>Volledige specificaties</summary>
      <dl class="mc-specs">{full}</dl>
    </details>
  </div>
</article>'''

cards = '\n'.join(card(p,i) for i,p in enumerate(P))
filters = ''.join(
  f'<button class="fl{" is-on" if c=="alle" else ""}" data-f="{c}" type="button" role="tab" aria-selected="{"true" if c=="alle" else "false"}">{esc(lab)}</button>'
  for c,lab in CATS)

# machine options for the quote form
machine_opts = ''.join(f'<option value="{esc(p["name"])} ({esc(p["series"])})">{esc(p["name"])} — {esc(p["series"])}</option>' for p in P)

# JSON for JS detail view
PJSON = json.dumps({p['h']:{'name':p['name'],'series':p['series'],'blurb':p['blurb'],
   'img':img(p['h']),'specs':p['specs'],'cat':p['cat']} for p in P}, ensure_ascii=False)

LOGO = img('LOGO')
HERO_MACRO = img('HERO_macro'); HERO_HALL = img('HERO_hall'); HERO_MILL = img('HERO_mill')

CSS = '''
:root{
 --navy:#0a1230; --navy2:#0d1b4b; --ink:#070d24; --steel:#0f1a3d;
 --red:#e31d25; --red2:#ff3d45; --paper:#f4f6fb; --paper2:#e9edf6;
 --line:#22305f; --line-lt:#d3dae8; --mut:#8b93ad; --mut-d:#5c6party;
 --tick:#3a4a80; --white:#ffffff;
 --gutter:clamp(16px,4vw,54px); --maxw:1320px;
 --mono:'IBM Plex Mono',ui-monospace,Menlo,Consolas,monospace;
 --disp:'Archivo',system-ui,'Segoe UI',sans-serif;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;overflow-x:clip}
body{margin:0;background:var(--navy);color:#e7ebf6;font-family:var(--disp);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:clip}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4{margin:0;font-weight:800;line-height:1.02;letter-spacing:-.01em}
p{margin:0}
.wrap{max-width:var(--maxw);margin:0 auto;padding-inline:var(--gutter)}
.mono{font-family:var(--mono)}
/* coordinate label furniture */
.coord{font-family:var(--mono);font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--red2);font-weight:500}
.coord .n{color:var(--mut)}
.sec-head{display:flex;flex-wrap:wrap;align-items:flex-end;gap:14px 28px;justify-content:space-between;margin-bottom:34px}
.sec-head h2{font-size:clamp(28px,4.4vw,52px);text-transform:uppercase;letter-spacing:.005em}
.sec-head .lede{color:var(--mut);max-width:46ch;font-size:15.5px}
.rule{height:1px;background:repeating-linear-gradient(90deg,var(--tick) 0 1px,transparent 1px 9px);opacity:.6}
/* buttons */
.btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:12.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;padding:13px 20px;border:1px solid transparent;cursor:pointer;transition:.16s;border-radius:0;white-space:nowrap}
.btn svg{width:13px;height:13px}
.btn-red{background:var(--red);color:#fff;border-color:var(--red)}
.btn-red:hover{background:var(--red2);border-color:var(--red2)}
.btn-ghost{background:transparent;color:#dfe5f5;border-color:var(--line)}
.btn-ghost:hover{border-color:var(--red2);color:#fff}
.btn-lg{padding:16px 26px;font-size:13px}
/* ============ NAV ============ */
.nav{position:sticky;top:0;z-index:60;background:rgba(8,12,32,.86);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;gap:22px;height:66px}
.brand{display:flex;align-items:center;gap:11px;font-weight:900;letter-spacing:.14em;font-size:18px;text-transform:uppercase}
.brand img{width:26px;height:26px}
.nav-links{display:flex;gap:26px;margin-left:8px}
.nav-links a{font-family:var(--mono);font-size:12.5px;letter-spacing:.08em;color:#c3cbe0;text-transform:uppercase;padding:6px 0;border-bottom:1px solid transparent}
.nav-links a:hover{color:#fff;border-color:var(--red)}
.nav-readout{margin-left:auto;display:flex;align-items:center;gap:16px}
.dro{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--mut);display:flex;gap:12px}
.dro b{color:#9fe6b4;font-weight:600}
.nav-cta{}
.burger{display:none;background:none;border:1px solid var(--line);color:#fff;width:42px;height:38px;cursor:pointer;font-size:18px}
/* ============ HERO ============ */
.hero{position:relative;min-height:92vh;display:flex;align-items:flex-end;overflow:hidden;border-bottom:1px solid var(--line)}
.hero-bg{position:absolute;inset:0;z-index:0}
.hero-bg img{width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(1.05) contrast(1.05)}
.hero-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,11,32,.55) 0%,rgba(7,11,32,.35) 40%,rgba(7,11,32,.94) 100%),linear-gradient(90deg,rgba(7,11,32,.7),transparent 55%)}
.grid-ov{position:absolute;inset:0;z-index:1;background-image:linear-gradient(var(--tick) 1px,transparent 1px),linear-gradient(90deg,var(--tick) 1px,transparent 1px);background-size:64px 64px;opacity:.10;mask-image:radial-gradient(120% 90% at 20% 90%,#000 30%,transparent 78%)}
.hero-in{position:relative;z-index:2;padding-block:44px 54px;width:100%}
.hero-tag{display:flex;align-items:center;gap:14px;margin-bottom:26px}
.hero-tag .ln{height:1px;width:52px;background:var(--red)}
.hero h1{font-size:clamp(44px,8.5vw,116px);text-transform:uppercase;letter-spacing:-.02em;line-height:.9;max-width:15ch}
.hero h1 em{font-style:normal;color:var(--red2)}
.hero-sub{margin-top:26px;max-width:52ch;font-size:clamp(15px,1.7vw,19px);color:#cdd4e8}
.hero-cta{margin-top:34px;display:flex;gap:14px;flex-wrap:wrap}
.hero-dro{margin-top:40px;display:flex;flex-wrap:wrap;gap:0;border:1px solid var(--line);background:rgba(8,13,34,.5)}
.hero-dro .cell{padding:15px 22px;border-right:1px solid var(--line);min-width:150px}
.hero-dro .cell:last-child{border-right:0}
.hero-dro .v{font-family:var(--mono);font-size:23px;font-weight:600;color:#fff}
.hero-dro .v small{color:var(--red2);font-size:14px}
.hero-dro .l{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);margin-top:4px}
.datum{position:absolute;left:var(--gutter);top:96px;z-index:2;font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;color:var(--mut);display:flex;align-items:center;gap:8px}
.datum .cross{width:14px;height:14px;position:relative}
.datum .cross::before,.datum .cross::after{content:"";position:absolute;background:var(--red)}
.datum .cross::before{left:6px;top:0;width:2px;height:14px}
.datum .cross::after{top:6px;left:0;height:2px;width:14px}
/* ============ CAPABILITY BAND ============ */
.band{background:var(--ink);border-bottom:1px solid var(--line)}
.band-in{display:grid;grid-template-columns:repeat(5,1fr)}
.band .cell{padding:26px var(--gutter);border-right:1px solid var(--line)}
.band .cell:last-child{border-right:0}
.band .v{font-family:var(--mono);font-size:clamp(22px,2.4vw,30px);font-weight:600;color:#fff;letter-spacing:-.01em}
.band .v em{font-style:normal;color:var(--red2)}
.band .l{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin-top:6px}
/* ============ generic section ============ */
section{padding-block:clamp(64px,9vw,120px)}
.sec-num{font-family:var(--mono);font-size:12px;color:var(--mut);letter-spacing:.2em}
/* FLOOR (dark image) */
.floor{position:relative;background:var(--ink);overflow:hidden}
.floor-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,5vw,72px);align-items:center}
.floor-fig{position:relative;border:1px solid var(--line)}
.floor-fig img{width:100%;height:100%;object-fit:cover;aspect-ratio:4/3.1}
.floor-fig figcaption{position:absolute;left:0;bottom:0;font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:#cdd4e8;background:rgba(7,11,32,.82);padding:9px 14px;border-top:1px solid var(--line);border-right:1px solid var(--line)}
.floor h2{font-size:clamp(28px,4vw,50px);text-transform:uppercase;margin:18px 0 20px}
.floor p{color:#c3cbe0;margin-bottom:18px;max-width:52ch}
.floor .subs{margin-top:30px;display:grid;gap:0;border-top:1px solid var(--line)}
.floor .subs .row{display:grid;grid-template-columns:auto 1fr;gap:18px;padding:17px 0;border-bottom:1px solid var(--line)}
.floor .subs .row .rn{font-family:var(--mono);color:var(--red2);font-size:12px;letter-spacing:.15em}
.floor .subs h3{font-size:16px;text-transform:uppercase;letter-spacing:.02em;margin-bottom:5px}
.floor .subs .row p{margin:0;font-size:14.5px;color:var(--mut)}
/* ============ CATALOG (bright lab) ============ */
.lab{background:var(--paper);color:#0d1330}
.lab .sec-head h2{color:#0d1330}
.lab .sec-head .lede{color:#54607e}
.lab .sec-num{color:#8792ab}
.lab .rule{background:repeating-linear-gradient(90deg,#c3ccdd 0 1px,transparent 1px 9px)}
.filters{display:flex;flex-wrap:wrap;gap:8px;margin:26px 0 30px}
.fl{font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding:10px 16px;border:1px solid var(--line-lt);background:#fff;color:#3c465f;cursor:pointer;transition:.15s}
.fl:hover{border-color:#9aa6c2}
.fl.is-on{background:#0d1330;color:#fff;border-color:#0d1330}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.mc{background:#fff;border:1px solid var(--line-lt);display:flex;flex-direction:column;transition:.18s;position:relative}
.mc:hover{border-color:#9aa6c2;box-shadow:0 18px 40px -26px rgba(13,19,48,.5)}
.mc-plate{position:relative;background:linear-gradient(160deg,#fdfdff,#eef1f8);border-bottom:1px solid var(--line-lt);aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;overflow:hidden}
.mc-img{width:88%;height:88%;object-fit:contain;mix-blend-mode:multiply}
.mc-coord{position:absolute;left:12px;top:11px;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;color:#9aa6c2}
.mc-tick{position:absolute;right:0;top:0;bottom:0;width:16px;background:repeating-linear-gradient(180deg,#d3dae8 0 1px,transparent 1px 11px)}
.mc-body{padding:20px 20px 22px;display:flex;flex-direction:column;flex:1}
.mc-series{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--red);margin-bottom:6px}
.mc-name{font-size:27px;font-weight:800;color:#0d1330;letter-spacing:-.01em}
.mc-blurb{margin-top:9px;font-size:14px;color:#54607e;line-height:1.5}
.mc-keys{margin-top:16px;border-top:1px solid var(--line-lt)}
.mc-keys .k{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #eef1f8}
.mc-keys .kl{font-size:12.5px;color:#6b7590}
.mc-keys .kv{font-family:var(--mono);font-size:12.5px;color:#0d1330;font-weight:500;text-align:right}
.mc-price{margin-top:16px}
.mc-price .pa{font-family:var(--mono);font-size:13px;letter-spacing:.08em;color:#0d1330;font-weight:600;display:inline-flex;align-items:center;gap:8px}
.mc-price .pa::before{content:"";width:7px;height:7px;background:var(--red);border-radius:50%}
.mc-act{margin-top:15px;display:flex;gap:9px}
.mc-act .btn{flex:0 1 auto;padding:11px 15px;font-size:11.5px}
.mc-act .btn-red{color:#fff}
.mc-act .btn-ghost{color:#3c465f;border-color:var(--line-lt)}
.mc-act .btn-ghost:hover{color:#0d1330;border-color:var(--red)}
.mc-more{margin-top:16px;border-top:1px solid var(--line-lt);padding-top:12px}
.mc-more summary{font-family:var(--mono);font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:#54607e;cursor:pointer;list-style:none;display:flex;align-items:center;gap:8px}
.mc-more summary::-webkit-details-marker{display:none}
.mc-more summary::before{content:"+";color:var(--red);font-weight:700}
.mc-more[open] summary::before{content:"–"}
.mc-specs{margin:12px 0 2px;display:grid;gap:0}
.mc-specs .sp{display:grid;grid-template-columns:1fr auto;gap:14px;padding:7px 0;border-bottom:1px solid #eef1f8}
.mc-specs dt{font-size:12.5px;color:#6b7590;margin:0}
.mc-specs dd{font-family:var(--mono);font-size:12px;color:#0d1330;margin:0;text-align:right}
.lab-foot{margin-top:34px;display:flex;flex-wrap:wrap;gap:14px 26px;align-items:center;justify-content:space-between;border-top:1px solid var(--line-lt);padding-top:22px}
.lab-foot p{font-size:13.5px;color:#54607e;max-width:60ch}
/* ============ TOLERANCE panel ============ */
.tol{background:var(--navy2);position:relative;overflow:hidden}
.tol .grid-ov{opacity:.08}
.tol-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:clamp(30px,5vw,70px);align-items:center;position:relative;z-index:2}
.tol h2{font-size:clamp(28px,4.2vw,50px);text-transform:uppercase;margin-bottom:20px}
.tol p{color:#c3cbe0;max-width:48ch;margin-bottom:16px}
.tol-fig{border:1px solid var(--line);background:rgba(7,11,32,.5);padding:26px}
.tol-read{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);margin-top:20px}
.tol-read .c{background:var(--ink);padding:18px}
.tol-read .v{font-family:var(--mono);font-size:26px;font-weight:600;color:#9fe6b4}
.tol-read .v em{font-style:normal;color:var(--red2)}
.tol-read .l{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin-top:6px}
/* ============ SERVICE ============ */
.svc{background:var(--ink)}
.svc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);border:1px solid var(--line);margin-top:8px}
.svc-card{background:var(--navy);padding:32px clamp(22px,3vw,38px);position:relative}
.svc-card .sn{font-family:var(--mono);font-size:12px;letter-spacing:.2em;color:var(--red2)}
.svc-card h3{font-size:22px;text-transform:uppercase;margin:14px 0 12px}
.svc-card p{color:#b7c0d8;font-size:14.5px;margin-bottom:14px}
.svc-card .tags{display:flex;flex-wrap:wrap;gap:8px}
.svc-card .tag{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:#cdd4e8;border:1px solid var(--line);padding:5px 10px}
.svc-note{margin-top:26px;font-family:var(--mono);font-size:13px;color:var(--mut);letter-spacing:.04em}
.svc-note b{color:#fff;font-weight:600}
/* ============ SECTORS ============ */
.sectors{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.sectors .s{font-family:var(--mono);font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line);padding:11px 16px;color:#cdd4e8}
.vals{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:36px}
.vals .val{border-top:2px solid var(--red);padding-top:18px}
.vals .val h3{font-size:19px;text-transform:uppercase;margin-bottom:8px}
.vals .val p{color:var(--mut);font-size:14.5px}
/* ============ QUOTE ============ */
.quote{background:var(--paper);color:#0d1330}
.quote .sec-head h2{color:#0d1330}
.quote .sec-head .lede{color:#54607e}
.quote .sec-num{color:#8792ab}
.q-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(28px,5vw,64px)}
.q-left h3{font-size:22px;color:#0d1330;text-transform:uppercase;margin-bottom:14px}
.q-left ul{list-style:none;padding:0;margin:0 0 22px}
.q-left li{display:grid;grid-template-columns:auto 1fr;gap:12px;padding:12px 0;border-bottom:1px solid var(--line-lt);font-size:14.5px;color:#3c465f}
.q-left li .qn{font-family:var(--mono);color:var(--red);font-size:12px}
.q-contact{font-family:var(--mono);font-size:13.5px;color:#0d1330;line-height:2}
.q-contact a{border-bottom:1px solid var(--red)}
.form{background:#fff;border:1px solid var(--line-lt);padding:clamp(22px,3vw,34px)}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.field{margin-bottom:16px}
.field label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#54607e;margin-bottom:7px}
.field label .req{color:var(--red)}
.field input,.field select,.field textarea{width:100%;padding:12px 13px;border:1px solid var(--line-lt);background:#fbfcfe;font-family:var(--disp);font-size:15px;color:#0d1330;border-radius:0}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(227,29,37,.12)}
.field textarea{resize:vertical;min-height:96px}
.field.err input,.field.err select,.field.err textarea{border-color:var(--red);background:#fff5f5}
.field .msg{display:none;font-family:var(--mono);font-size:11px;color:var(--red);margin-top:6px}
.field.err .msg{display:block}
.form-foot{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:6px}
.priv{font-size:12px;color:#6b7590;font-family:var(--mono);letter-spacing:.02em}
.form-ok{display:none;border:1px solid #1f8f4d;background:#f0fbf4;padding:20px;font-size:15px;color:#0d1330}
.form-ok.on{display:block}
.form-ok b{color:#12873f}
.form.done .frow,.form.done .field,.form.done .form-foot{display:none}
/* ============ MACHINE DETAIL VIEW ============ */
.detail{position:fixed;inset:0;z-index:90;background:var(--ink);overflow-y:auto;display:none}
.detail.on{display:block}
html.js body.locked{overflow:hidden}
.detail-bar{position:sticky;top:0;background:rgba(8,12,32,.9);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:16px var(--gutter);z-index:2}
.detail-bar .bk{font-family:var(--mono);font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:#cdd4e8;background:none;border:1px solid var(--line);padding:10px 16px;cursor:pointer}
.detail-bar .bk:hover{border-color:var(--red);color:#fff}
.detail-in{max-width:var(--maxw);margin:0 auto;padding:clamp(28px,5vw,60px) var(--gutter)}
.detail-top{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,4vw,56px);align-items:start}
.detail-fig{background:linear-gradient(160deg,#fdfdff,#e9edf6);border:1px solid var(--line);position:relative;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center}
.detail-fig img{width:86%;height:86%;object-fit:contain;mix-blend-mode:multiply}
.detail-dim{position:absolute;left:14px;bottom:14px;font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;color:#54607e}
.detail-series{font-family:var(--mono);color:var(--red2);letter-spacing:.14em;text-transform:uppercase;font-size:13px}
.detail h2{font-size:clamp(36px,6vw,72px);text-transform:uppercase;margin:10px 0 16px;letter-spacing:-.02em}
.detail-blurb{color:#c3cbe0;font-size:16.5px;max-width:46ch;margin-bottom:24px}
.detail .btn{margin-right:10px}
.detail-specs{margin-top:clamp(34px,5vw,60px)}
.detail-specs h3{font-family:var(--mono);font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin-bottom:16px}
.dl-specs{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line)}
.dl-specs .sp{background:var(--navy);display:grid;grid-template-columns:1fr auto;gap:16px;padding:14px 20px}
.dl-specs dt{color:var(--mut);font-size:13.5px;margin:0}
.dl-specs dd{font-family:var(--mono);color:#fff;font-size:13.5px;margin:0;text-align:right}
/* ============ FOOTER ============ */
.foot{background:#05091d;border-top:1px solid var(--line);padding-block:56px 30px}
.foot-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:34px}
.foot .brand{margin-bottom:16px}
.foot-blurb{color:var(--mut);font-size:14px;max-width:34ch}
.foot col,.foot-col{}
.foot-col h4{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#cdd4e8;margin-bottom:14px}
.foot-col a,.foot-col p{display:block;color:var(--mut);font-size:14px;padding:5px 0}
.foot-col a:hover{color:#fff}
.foot-bot{display:flex;flex-wrap:wrap;gap:12px 24px;justify-content:space-between;margin-top:40px;padding-top:22px;border-top:1px solid var(--line);font-family:var(--mono);font-size:11.5px;color:#5a6party;letter-spacing:.04em;color:var(--mut)}
.foot-bot .note{max-width:60ch}
/* reveal */
.rv{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease}
.rv.in{opacity:1;transform:none}
html:not(.js) .rv{opacity:1;transform:none}
/* no-js: keep detail hidden, everything else visible */
html:not(.js) .detail{display:none}
/* ============ responsive ============ */
@media(max-width:1080px){
 .grid{grid-template-columns:repeat(2,1fr)}
 .band-in{grid-template-columns:repeat(3,1fr)}
 .band .cell:nth-child(3){border-right:0}
 .floor-grid,.tol-grid,.q-grid,.detail-top,.svc-grid{grid-template-columns:1fr}
 .svc-grid{grid-template-columns:1fr}
 .dl-specs{grid-template-columns:1fr}
 .foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:720px){
 .nav-readout{display:none}
 .burger{display:block}
 .nav-links{display:none}
 .nav.open .nav-links{display:flex;position:absolute;top:66px;left:0;right:0;flex-direction:column;background:var(--ink);padding:16px var(--gutter);border-bottom:1px solid var(--line);gap:4px}
 .nav.open .nav-links a{padding:12px 0;border-bottom:1px solid var(--line)}
 .grid{grid-template-columns:1fr}
 .band-in{grid-template-columns:1fr 1fr}
 .band .cell{border-right:1px solid var(--line)!important}
 .band .cell:nth-child(2n){border-right:0!important}
 .vals{grid-template-columns:1fr}
 .frow{grid-template-columns:1fr}
 .hero-dro{width:100%}
 .hero-dro .cell{flex:1 1 45%;border-bottom:1px solid var(--line)}
 .foot-grid{grid-template-columns:1fr}
 .mc-act{flex-wrap:wrap}
}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}.rv{transition:none}}
'''

# fix accidental tokens in CSS (typos guard)
CSS = CSS.replace('--mut-d:#5c6party;','--mut-d:#5c6a8f;').replace('#5a6party','#5a6a8f')

ARROW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'

HTML = f'''<!doctype html>
<html lang="nl" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Zynox — CNC draai- en freesmachines, tot op de micron</title>
<meta name="description" content="Zynox levert en onderhoudt CNC-draaimachines, freesmachines, bewerkingscentra en rondtafels. Meer dan 35 jaar verspaningsexpertise, CE-conform, met eigen serviceteam.">
<style>{FONTS}</style>
<style>{CSS}</style>
</head>
<body>
<script>document.documentElement.className='js';</script>

<!-- NAV -->
<header class="nav" id="nav">
 <div class="wrap nav-in">
   <a class="brand" href="#top"><img src="{LOGO}" alt="Zynox logo"> Zynox</a>
   <nav class="nav-links" aria-label="Hoofdmenu">
     <a href="#machinepark">Machines</a>
     <a href="#tolerantie">Precisie</a>
     <a href="#service">Service</a>
     <a href="#over">Over ons</a>
     <a href="#offerte">Offerte</a>
   </nav>
   <div class="nav-readout" aria-hidden="true">
     <span class="dro"><span>X&nbsp;<b>0.000</b></span><span>Y&nbsp;<b>0.000</b></span><span>Z&nbsp;<b>0.000</b></span></span>
     <a class="btn btn-red nav-cta" href="#offerte">Offerte aanvragen {ARROW}</a>
   </div>
   <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">≡</button>
 </div>
</header>

<main id="top">

<!-- HERO -->
<section class="hero" aria-label="Introductie">
 <div class="hero-bg"><img src="{HERO_MACRO}" alt="Close-up van een draaibewerking op een Zynox machine"></div>
 <div class="grid-ov"></div>
 <span class="datum"><span class="cross"></span> DATUM&nbsp;X0&nbsp;Y0&nbsp;Z0</span>
 <div class="wrap hero-in">
   <div class="hero-tag"><span class="ln"></span><span class="coord">00&nbsp;/&nbsp;NULPUNT</span></div>
   <h1>Tot op de <em>micron</em>. Elke keer.</h1>
   <p class="hero-sub">Zynox bouwt, levert en onderhoudt CNC-draaimachines, freesmachines en bewerkingscentra voor de moderne maakindustrie. Meer dan 35 jaar verspaningsexpertise, in elke as vastgelegd.</p>
   <div class="hero-cta">
     <a class="btn btn-red btn-lg" href="#machinepark">Bekijk het machinepark {ARROW}</a>
     <a class="btn btn-ghost btn-lg" href="#offerte">Offerte aanvragen</a>
   </div>
   <div class="hero-dro">
     <div class="cell"><div class="v">35<small>+</small></div><div class="l">Jaar expertise</div></div>
     <div class="cell"><div class="v">0.001<small>&deg;</small></div><div class="l">Min. increment</div></div>
     <div class="cell"><div class="v">&plusmn;4<small>&Prime;</small></div><div class="l">Herhaalbaarheid</div></div>
     <div class="cell"><div class="v">96</div><div class="l">Configuraties</div></div>
     <div class="cell"><div class="v">CE</div><div class="l">Conform</div></div>
   </div>
 </div>
</section>

<!-- CAPABILITY BAND -->
<div class="band"><div class="band-in">
  <div class="cell"><div class="v">Draaien</div><div class="l">C / L / Q / R series</div></div>
  <div class="cell"><div class="v">Frezen</div><div class="l">VMC / HMC / 5-assig</div></div>
  <div class="cell"><div class="v">Rondtafels</div><div class="l">4e &amp; 5e as</div></div>
  <div class="cell"><div class="v">Randapparatuur</div><div class="l">barfeeder / afzuiging</div></div>
  <div class="cell"><div class="v"><em>Service</em></div><div class="l">eigen team, alle merken</div></div>
</div></div>

<!-- THE FLOOR -->
<section class="floor" id="werkvloer">
 <div class="grid-ov"></div>
 <div class="wrap floor-grid">
   <figure class="floor-fig rv">
     <img src="{HERO_HALL}" alt="Rij CNC-machines opgesteld in de Zynox werkplaats">
     <figcaption>De werkvloer, na sluitingstijd</figcaption>
   </figure>
   <div class="rv">
     <div class="hero-tag"><span class="coord">01&nbsp;/&nbsp;DE&nbsp;WERKVLOER</span></div>
     <h2>Gebouwd om te blijven draaien</h2>
     <p>Elke Zynox-machine wordt zorgvuldig geselecteerd en samen met internationale partners geoptimaliseerd. Krachtige prestaties, gebruiksvriendelijke besturing en volledige Europese CE-conformiteit. Wij geloven in eenvoud, snelheid en precisie, van programmeren tot en met bewerken.</p>
     <div class="subs">
       <div class="row"><span class="rn">A1</span><div><h3>Robuust frame</h3><p>Premium materialen en een stabiel frame houden de prestaties constant en de stilstand minimaal.</p></div></div>
       <div class="row"><span class="rn">A2</span><div><h3>Micron-nauwkeurigheid</h3><p>Geavanceerde draai- en freesmachines die nauwkeurigheid op micron-niveau bereiken.</p></div></div>
       <div class="row"><span class="rn">A3</span><div><h3>Intuïtieve besturing</h3><p>Gebruiksvriendelijke CNC-interfaces verkorten de insteltijd en verhogen de productiviteit.</p></div></div>
     </div>
   </div>
 </div>
</section>

<!-- CATALOG -->
<section class="lab" id="machinepark">
 <div class="wrap">
   <div class="sec-head">
     <div>
       <div class="sec-num">02&nbsp;/&nbsp;HET&nbsp;MACHINEPARK</div>
       <h2>Elke machine, met echte cijfers</h2>
     </div>
     <p class="lede">Draaien, frezen, rondtafels en randapparatuur. Elke opstelling wordt op maat gekoppeld aan uw werk, daarom noemen we een reële prijs op aanvraag in plaats van een standaardbedrag.</p>
   </div>
   <div class="rule"></div>
   <div class="filters" role="tablist" aria-label="Filter machines">{filters}</div>
   <div class="grid" id="grid">
   {cards}
   </div>
   <div class="lab-foot">
     <p>Specificaties per uitvoering kunnen variëren met besturing (Heidenhain, Siemens, Fanuc, Mitsubishi), opspanning en opties. Vraag de exacte configuratie en prijs aan voor uw toepassing.</p>
     <a class="btn btn-red" href="#offerte">Stel uw machine samen {ARROW}</a>
   </div>
 </div>
</section>

<!-- TOLERANCE -->
<section class="tol" id="tolerantie">
 <div class="grid-ov"></div>
 <div class="wrap tol-grid">
   <div class="rv">
     <div class="hero-tag"><span class="coord">03&nbsp;/&nbsp;TOLERANTIES</span></div>
     <h2>Precisie is een getal, geen belofte</h2>
     <p>Een rondtafel die tot op de boogseconde indexeert, laat zich meten, niet navertellen. Neem de horizontale rondtafel Z-H500: elke waarde hieronder komt rechtstreeks uit het typeplaatje.</p>
     <p>Dat is de standaard achter elke Zynox-opstelling. Waar anderen "hoge precisie" zeggen, zetten wij de tolerantie erbij.</p>
     <a class="btn btn-red" href="#m-horizontal-rotary-table-z-h500" data-h="horizontal-rotary-table-z-h500">Bekijk de Z-H500 {ARROW}</a>
   </div>
   <div class="tol-fig rv">
     <div class="coord" style="color:var(--mut)">TYPEPLAATJE&nbsp;/&nbsp;Z-H500</div>
     <div class="tol-read">
       <div class="c"><div class="v">0.001<em>&deg;</em></div><div class="l">Min. increment</div></div>
       <div class="c"><div class="v"><em>&plusmn;</em>15<em>&Prime;</em></div><div class="l">Indexeernauwkeurigheid</div></div>
       <div class="c"><div class="v"><em>&plusmn;</em>4<em>&Prime;</em></div><div class="l">Herhaalbaarheid</div></div>
       <div class="c"><div class="v">2650<em> N&middot;m</em></div><div class="l">Klemkoppel</div></div>
     </div>
     <p style="font-family:var(--mono);font-size:11px;color:var(--mut);margin-top:14px;letter-spacing:.06em">Tafel &Oslash;500 mm &middot; belasting 600 kg &middot; reductie 1/90 &middot; 22,2 rpm</p>
   </div>
 </div>
</section>

<!-- SERVICE -->
<section class="svc" id="service">
 <div class="wrap">
   <div class="sec-head">
     <div>
       <div class="sec-num" style="color:var(--mut)">04&nbsp;/&nbsp;SERVICE</div>
       <h2>Het stopt niet bij de verkoop</h2>
     </div>
     <p class="lede">We zorgen dat uw productie blijft draaien, bij onze eigen machines én bij andere merken waar we kennis van hebben. Alles in eigen beheer, geen externe partijen, geen wachttijden.</p>
   </div>
   <div class="svc-grid">
     <div class="svc-card"><div class="sn">S01</div><h3>Onderhoud &amp; storingen</h3><p>Preventief onderhoud volgens schema, en paraat als er een storing is. Zo hoeft u niet voor elk probleem een andere partij te bellen.</p><div class="tags"><span class="tag">Gecertificeerde experts</span><span class="tag">Snelle respons</span></div></div>
     <div class="svc-card"><div class="sn">S02</div><h3>Mechanische reparaties</h3><p>Van het rechtzetten van machines die een klapper hebben gemaakt tot het vervangen van geleidingen, kogelomloopspindels en lagers. We doen het allemaal zelf.</p><div class="tags"><span class="tag">Geleidingen</span><span class="tag">Kogelomloopspindels</span><span class="tag">Lagers</span></div></div>
     <div class="svc-card"><div class="sn">S03</div><h3>Elektrische storingen</h3><p>Wekelijks lossen we elektrische storingen op, van eenvoudige sensorvervangingen tot complexe problemen in besturingen en aandrijvingen.</p><div class="tags"><span class="tag">Heidenhain</span><span class="tag">Siemens</span><span class="tag">Fanuc</span><span class="tag">Mitsubishi</span></div></div>
     <div class="svc-card"><div class="sn">S04</div><h3>Industriële verhuizingen</h3><p>Een CNC-machine van enkele tonnen verplaatsen is geen klus voor de verhuizer om de hoek. Met eigen movers en transportsets verplaatsen we hem veilig.</p><div class="tags"><span class="tag">Eigen movers</span><span class="tag">Transportsets</span></div></div>
   </div>
   <p class="svc-note">"Bij Zynox stopt het niet bij de verkoop van een machine. We zorgen ervoor dat uw productie blijft draaien." <b>&mdash; Zynox service</b></p>
 </div>
</section>

<!-- OVER / SECTORS -->
<section id="over">
 <div class="wrap">
   <div class="sec-head">
     <div><div class="sec-num">05&nbsp;/&nbsp;WAAROM&nbsp;ZYNOX</div><h2>Ervaring die je terugziet in het werkstuk</h2></div>
     <p class="lede">Met meer dan 35 jaar industrie-expertise begrijpen we de veranderende behoeften van moderne verspaning. Geschikt voor een breed scala aan materialen en sectoren.</p>
   </div>
   <div class="rule"></div>
   <div class="sectors" style="margin-top:26px">
     <span class="s">Luchtvaart</span><span class="s">Automotive</span><span class="s">Medisch</span><span class="s">Matrijzenbouw</span><span class="s">Algemene industrie</span>
   </div>
   <div class="vals">
     <div class="val"><h3>Precisie</h3><p>We verwerken micron-nauwkeurigheid in elke machine, van programmeren tot bewerken.</p></div>
     <div class="val"><h3>Innovatie</h3><p>Continue ontwikkeling met internationale partners drijft ons technologisch leiderschap.</p></div>
     <div class="val"><h3>Partnerschap</h3><p>Uw succes is onze prestatienorm. We blijven betrokken, ook na de levering.</p></div>
   </div>
 </div>
</section>

<!-- QUOTE -->
<section class="quote" id="offerte">
 <div class="wrap">
   <div class="sec-head">
     <div><div class="sec-num">06&nbsp;/&nbsp;OFFERTE</div><h2>Vraag een reële prijs aan</h2></div>
     <p class="lede">Vertel ons welke machine of bewerking u voor ogen heeft. We komen terug met een configuratie en een prijs die klopt, geen standaardbedrag.</p>
   </div>
   <div class="rule"></div>
   <div class="q-grid" style="margin-top:34px">
     <div class="q-left">
       <h3>Zo werkt het</h3>
       <ul>
         <li><span class="qn">01</span><span>U geeft uw toepassing en gewenste machine door.</span></li>
         <li><span class="qn">02</span><span>Een expert stemt besturing, opspanning en opties af.</span></li>
         <li><span class="qn">03</span><span>U ontvangt een onderbouwde offerte, doorgaans binnen 1 werkdag.</span></li>
       </ul>
       <div class="q-contact">
         Liever direct?<br>
         <a href="mailto:info@zynox.nl">info@zynox.nl</a><br>
         <a href="tel:+31611870057">+31 6 11 87 00 57</a>
       </div>
     </div>
     <form class="form" id="qform" novalidate>
       <div class="form-ok" id="qok"><b>Bedankt, uw aanvraag staat genoteerd.</b><br>Een Zynox-expert neemt doorgaans binnen 1 werkdag contact met u op over de configuratie en prijs.</div>
       <div class="frow">
         <div class="field"><label for="f-name">Naam <span class="req">*</span></label><input id="f-name" name="name" required><div class="msg">Vul uw naam in.</div></div>
         <div class="field"><label for="f-comp">Bedrijf <span class="req">*</span></label><input id="f-comp" name="company" required><div class="msg">Vul uw bedrijf in.</div></div>
       </div>
       <div class="frow">
         <div class="field"><label for="f-mail">E-mail <span class="req">*</span></label><input id="f-mail" name="email" type="email" required><div class="msg">Vul een geldig e-mailadres in.</div></div>
         <div class="field"><label for="f-tel">Telefoon</label><input id="f-tel" name="phone" type="tel"><div class="msg"></div></div>
       </div>
       <div class="field"><label for="f-machine">Machine of bewerking</label>
         <select id="f-machine" name="machine"><option value="">Nog niet zeker / advies gewenst</option>{machine_opts}</select><div class="msg"></div></div>
       <div class="field"><label for="f-msg">Toelichting</label><textarea id="f-msg" name="message" placeholder="Materiaal, seriegrootte, besturing, gewenste levertijd..."></textarea><div class="msg"></div></div>
       <div class="form-foot">
         <button class="btn btn-red btn-lg" type="submit">Offerte aanvragen {ARROW}</button>
         <span class="priv">Uw gegevens gebruiken we alleen om uw aanvraag te beantwoorden.</span>
       </div>
     </form>
   </div>
 </div>
</section>

</main>

<!-- FOOTER -->
<footer class="foot">
 <div class="wrap">
   <div class="foot-grid">
     <div>
       <a class="brand" href="#top"><img src="{LOGO}" alt=""> Zynox</a>
       <p class="foot-blurb">Innovatieve CNC-draaimachines en freesmachines voor de moderne maakindustrie. Meer dan 35 jaar verspaningsexpertise, CE-conform.</p>
     </div>
     <div class="foot-col"><h4>Machines</h4><a href="#machinepark">Draaien</a><a href="#machinepark">Frezen</a><a href="#machinepark">Rondtafels</a><a href="#machinepark">Randapparatuur</a></div>
     <div class="foot-col"><h4>Bedrijf</h4><a href="#over">Over Zynox</a><a href="#service">Service</a><a href="#tolerantie">Precisie</a><a href="#offerte">Offerte</a></div>
     <div class="foot-col"><h4>Contact</h4><a href="mailto:info@zynox.nl">info@zynox.nl</a><a href="tel:+31611870057">+31 6 11 87 00 57</a><a href="tel:+31641304997">+31 6 41 30 49 97</a></div>
   </div>
   <div class="foot-bot">
     <span>&copy; Zynox &middot; CNC-draai- en freesmachines &middot; CE-conform</span>
     <span class="note">Machinevisualisaties en specificaties op deze site tonen voorbeeldconfiguraties; de exacte uitvoering volgt uit uw offerte.</span>
   </div>
 </div>
</footer>

<!-- DETAIL VIEW -->
<div class="detail" id="detail" role="dialog" aria-modal="true" aria-label="Machinedetail">
 <div class="detail-bar">
   <button class="bk" id="detailBack">&larr; Terug naar machinepark</button>
   <a class="btn btn-red" href="#offerte" id="detailQuote">Offerte voor deze machine {ARROW}</a>
 </div>
 <div class="detail-in" id="detailBody"></div>
</div>

<script>
window.ZX={PJSON};
(function(){{
 var d=document, root=d.documentElement;
 // burger
 var nav=d.getElementById('nav'), b=d.getElementById('burger');
 if(b) b.addEventListener('click',function(){{var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o)}});
 d.querySelectorAll('.nav-links a').forEach(function(a){{a.addEventListener('click',function(){{nav.classList.remove('open');b&&b.setAttribute('aria-expanded',false)}})}});
 // reveal on scroll
 if('IntersectionObserver' in window){{
   var io=new IntersectionObserver(function(es){{es.forEach(function(e){{if(e.isIntersecting){{e.target.classList.add('in');io.unobserve(e.target)}}}})}},{{threshold:.14}});
   d.querySelectorAll('.rv').forEach(function(el){{io.observe(el)}});
 }} else d.querySelectorAll('.rv').forEach(function(el){{el.classList.add('in')}});
 // filters
 var fls=d.querySelectorAll('.fl'), cards=d.querySelectorAll('.mc');
 fls.forEach(function(f){{f.addEventListener('click',function(){{
   fls.forEach(function(x){{x.classList.remove('is-on');x.setAttribute('aria-selected','false')}});
   f.classList.add('is-on');f.setAttribute('aria-selected','true');
   var v=f.dataset.f;
   cards.forEach(function(c){{c.style.display=(v==='alle'||c.dataset.cat===v)?'':'none'}});
 }})}});
 // quote prefill
 function prefill(m){{var s=d.getElementById('f-machine'); if(!s||!m) return; for(var i=0;i<s.options.length;i++){{if(s.options[i].value===m){{s.selectedIndex=i;return}}}}}}
 d.querySelectorAll('.js-quote').forEach(function(a){{a.addEventListener('click',function(){{prefill(a.dataset.machine)}})}});
 // detail view
 var detail=d.getElementById('detail'), body=d.getElementById('detailBody');
 function esc(s){{return String(s).replace(/[&<>\"]/g,function(c){{return {{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}}[c]}})}}
 function openDetail(h){{
   var p=window.ZX[h]; if(!p) return;
   var rows=p.specs.map(function(s){{return '<div class=\"sp\"><dt>'+esc(s[0])+'</dt><dd>'+esc(s[1])+'</dd></div>'}}).join('');
   body.innerHTML='<div class=\"detail-top\">'
     +'<div class=\"detail-fig\"><img src=\"'+p.img+'\" alt=\"Zynox '+esc(p.name)+'\"><span class=\"detail-dim\">MDL / '+esc(p.name)+'</span></div>'
     +'<div><div class=\"detail-series\">'+esc(p.series)+'</div><h2>'+esc(p.name)+'</h2>'
     +'<p class=\"detail-blurb\">'+esc(p.blurb)+'</p>'
     +'<div class=\"mc-price\" style=\"margin-bottom:22px\"><span class=\"pa\" style=\"color:#fff\">Prijs op aanvraag</span></div>'
     +'<a class=\"btn btn-red btn-lg js-godetail-quote\" href=\"#offerte\" data-machine=\"'+esc(p.name)+' ('+esc(p.series)+')\">Offerte voor deze machine</a></div></div>'
     +'<div class=\"detail-specs\"><h3>Volledige specificaties</h3><dl class=\"dl-specs\">'+rows+'</dl></div>';
   d.getElementById('detailQuote').setAttribute('data-machine',p.name+' ('+p.series+')');
   detail.classList.add('on'); d.body.classList.add('locked'); detail.scrollTop=0;
   body.querySelectorAll('.js-godetail-quote').forEach(function(a){{a.addEventListener('click',function(){{closeDetail();prefill(a.dataset.machine)}})}});
 }}
 function closeDetail(){{detail.classList.remove('on');d.body.classList.remove('locked')}}
 d.querySelectorAll('.js-detail').forEach(function(btn){{btn.addEventListener('click',function(){{openDetail(btn.dataset.h)}})}});
 d.querySelectorAll('[data-h].btn').forEach(function(a){{a.addEventListener('click',function(ev){{ if(a.classList.contains('js-detail')) return; var h=a.dataset.h; if(window.ZX[h]){{ev.preventDefault();openDetail(h)}} }})}});
 d.getElementById('detailBack').addEventListener('click',closeDetail);
 d.getElementById('detailQuote').addEventListener('click',function(){{var m=this.getAttribute('data-machine');closeDetail();prefill(m)}});
 d.addEventListener('keydown',function(e){{if(e.key==='Escape')closeDetail()}});
 // form
 var f=d.getElementById('qform');
 f.addEventListener('submit',function(e){{
   e.preventDefault(); var ok=true;
   [['f-name'],['f-comp'],['f-mail']].forEach(function(x){{
     var el=d.getElementById(x[0]), fld=el.closest('.field'), v=el.value.trim();
     var bad=!v || (el.type==='email' && !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(v));
     fld.classList.toggle('err',bad); if(bad) ok=false;
   }});
   if(!ok){{f.querySelector('.err input').focus();return}}
   d.getElementById('qok').classList.add('on'); f.classList.add('done');
   d.getElementById('qok').scrollIntoView({{behavior:'smooth',block:'center'}});
 }});
 f.querySelectorAll('input').forEach(function(el){{el.addEventListener('input',function(){{el.closest('.field').classList.remove('err')}})}});
}})();
</script>
</body>
</html>'''

open('index.html','w',encoding='utf-8').write(HTML)
print('wrote index.html', len(HTML.encode('utf-8'))//1024,'KB')
