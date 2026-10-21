"""The guides. A hub and three long guides, every fact from the funder's own page and linked at the end."""
from html import escape as esc

from .common import load_calls, days_left, sdate, odds, SIZE, LEAD, THEME, short_name, STARTUP, live_count
from .home import GUIDES

IFS = 'https://apply-for-innovation-funding.service.gov.uk'
UKRI_SMART = 'https://www.ukri.org/councils/innovate-uk/guidance-for-applicants/guidance-for-specific-funds/'
SMART_MAIN = 'https://www.ukri.org/wp-content/uploads/2026/07/IUK-140726-SmartGrantImpactEvaluationReport.pdf'
SMART_ANNEX = 'https://www.ukri.org/wp-content/uploads/2026/07/IUK-140726-SmartGrantImpactEvaluationReport-TechnicalAnnex.pdf'
GC_PAGE = 'https://www.ukri.org/what-we-do/browse-our-areas-of-investment-and-support/investor-partnerships-industrial-strategy/'
GC_BRIEF = IFS + '/competition/2360/overview/37d8f6e1-5600-4e9e-bbfc-11bc320f8808'
GC_SLIDES = IFS + '/competition/2360/download/26405'
BC_GC = 'https://iuk-business-connect.org.uk/opportunities/innovate-uk-growth-catalyst-december-2025/'
LOANS = IFS + '/competition/2505/overview/8ef63f10-ea07-4ffd-9812-e944542751b6'
EIC = 'https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en'
FAI_GUIDE = IFS + '/competition/2584/download/30742'

PAUSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor"/></svg>'


def film(name):
    return (f'<div class="film"><video muted loop playsinline preload="none" poster="/assets/media/{name}.jpg" data-auto>'
            f'<source src="/assets/media/{name}.webm" type="video/webm"><source src="/assets/media/{name}.mp4" type="video/mp4"></video>'
            f'<button class="pz" type="button" aria-label="Pause the film">{PAUSE}</button></div>')


def facts(items):
    return '<div class="facts-b">' + ''.join(f'<div><b>{a}</b><span>{b}</span></div>' for a, b in items) + '</div>'


def toc(items):
    return '<nav class="toc" aria-label="In this guide"><b>In this guide</b>' + ''.join(f'<a href="#{i}">{t}</a>' for i, t in items) + '</nav>'


def endcta(B, what):
    return f'''<div class="endcta"><h2>Not sure it&rsquo;s your call?</h2><p>{what}</p>
<div class="ctas" style="margin-top:20px"><a class="btn pri" href="{B.BOOK}">Book FREE funding call</a><a class="btn sec" href="/fit/">Check your fit</a></div></div>'''


def call_li(c):
    d = days_left(c['closes'])
    cls = 'now' if d <= 7 else ('soon' if d <= 21 else '')
    o = odds(c)
    return (f'<li><a href="/calls/{c["slug"]}/" class="{cls}" data-close="{c["closes"]}"><span><b>{esc(short_name(c))}</b>'
            f'<small>{esc(SIZE[c["id"]])}{" &middot; " + str(o) + "% odds" if o else ""} &middot; closes {sdate(c["closes"])}</small></span>'
            f'<span><span class="dotf dl-n">{d:02d}</span><span class="u dl-u">days left</span></span></a></li>')


def head_block(B, crumb, title, dek, meta, video):
    m = ''.join(f'<span>{x}</span>' for x in meta)
    return f'''<section class="ghero"><div class="wrap">
  <div class="crumbs"><a href="/guides/">Guides</a><span aria-hidden="true">/</span><span>{crumb}</span></div>
  <h1 class="h-l">{title}</h1>
  <p class="lede">{dek}</p>
  <div class="gmeta">{m}</div>
  {film(video)}
</div></section>'''


# ------------------------------------------------------------------ guide 1, Smart grants are closed
def smart(B, calls):
    by = {c['id']: c for c in calls}
    groups = [
        ('AI', [2584, 2582, 2599, 2598, 2597]),
        ('Batteries', [2595, 2571, 2572]),
        ('Engineering biology', [2580, 2542]),
        ('Climate tech and materials', [2600, 2602]),
        ('With an overseas partner', [2583, 2526, 2586]),
        ('Medicines', [2560]),
    ]
    lists = ''
    for g, ids in groups:
        live = [by[i] for i in ids if days_left(by[i]['closes']) >= 0]
        live.sort(key=lambda c: c['closes'])
        lists += f'<h3>{esc(g)}</h3><ul class="clist">' + ''.join(call_li(c) for c in live) + '</ul>'
    odd = [c for c in calls if odds(c) and c['id'] in STARTUP and days_left(c['closes']) >= 0]
    odd.sort(key=lambda c: odds(c))
    orows = ''.join(f'<div class="r {"low" if odds(c) <= 5 else ("hi" if odds(c) >= 20 else "")}"><a href="/calls/{c["slug"]}/">{esc(short_name(c))}</a>'
                    f'<span class="t" aria-hidden="true"><i style="width:{odds(c) / 30 * 100:.0f}%"></i></span><b>{odds(c)}%</b></div>' for c in odd)
    body = head_block(B, 'Smart grants', 'Smart grants are closed. Here&rsquo;s what to apply for instead',
                      'Innovate UK has stopped taking Smart applications. The calls open now are narrower, most close before Christmas, and some put the odds at 2%.',
                      ['Updated 20 October 2026', '8 minute read', 'From Innovate UK&rsquo;s own pages'], 'team')
    n = live_count([c['closes'] for c in calls])
    body += f'''<div class="wrap">{facts([('Closed', 'Smart grants, for new applications'), (n, 'Innovate UK calls on the funding service today'), ('2%', 'the lowest odds Innovate UK states on a call open today'), ('11am', 'every call closes at 11am UK time')])}</div>
<div class="wrap art">
{toc([('what-happened', 'What happened'), ('how-smart-went', 'How Smart went'), ('open-now', 'What&rsquo;s open now'), ('odds', 'The odds'), ('not-listed', 'If none of them fit')])}
<article class="prose">
<h2 id="what-happened">What happened</h2>
<p>Smart grants have closed for new applications, and UKRI&rsquo;s guidance page says why in one line.</p>
<blockquote>&ldquo;Smart grants are now closed for new applications as funding is being aligned to Innovate UK&rsquo;s new strategic direction.&rdquo;<cite><a href="{UKRI_SMART}">UKRI, guidance for specific funds</a></cite></blockquote>
<p>So the question changes. It used to be &ldquo;is my idea good enough for Smart?&rdquo; Now it&rsquo;s &ldquo;which of the calls that are open is written for what I&rsquo;m building?&rdquo;</p>

<h2 id="how-smart-went">How Smart went</h2>
<p>Innovate UK&rsquo;s own evaluation of Smart, published in July 2026, counted 1,688 projects awarded &pound;531m of public funding between 2019 to 2020 and 2024 to 2025. The businesses it funded raised &pound;3.6bn of equity after their award, by the end of 2024.</p>
<p>It also shows how hard it was. Of 21,782 applications matched in the evaluation, 1,295 were funded. 6,427 scored above 70, which is typically a passing score on other Innovate UK programmes, and weren&rsquo;t funded. 1,439 of those scored 80 or more.</p>
<span class="src-l">Sources, <a href="{SMART_MAIN}">Smart grants impact evaluation, final report</a> and <a href="{SMART_ANNEX}">technical annex</a>, Ipsos for Innovate UK, July 2026.</span>
<div class="callout">{B.glyph("ggaaaaaa", "big")}<div><b>What that means for the calls open now</b><p>A strong application isn&rsquo;t the bar. The bar is the marks, question by question, from three assessors who only know what&rsquo;s written down.</p></div></div>

<h2 id="open-now">What&rsquo;s open now, for a startup or SME</h2>
<p>These are the calls on the Innovation Funding Service today that a UK SME can lead or join as the SME a consortium has to include. Each links to its own page with the rules as Innovate UK wrote them.</p>
{lists}
<p><a href="/calls/">See all {n} calls</a>, including the ones led by universities, farms and energy networks.</p>

<h2 id="odds">The odds, in Innovate UK&rsquo;s words</h2>
<p>Every competition page now says what chance an application has, based on similar competitions. Here&rsquo;s each one above that states it.</p>
<div class="odds">{orows}</div>
<span class="src-l">Each figure is the sentence &ldquo;Our experience from similar competitions suggests that you could have a X% chance of success&rdquo; on that call&rsquo;s page.</span>

<h2 id="not-listed">If none of them fit</h2>
<h3>Growth Catalyst</h3>
<p>The investor partnership programme for seed to Series A startups has no round open. UKRI&rsquo;s page lists two competitions in 2025 to 2026 and says &ldquo;Further competitions subject to confirmation.&rdquo; The investor partnership calls that are open are in our <a href="/guides/investor-partnerships/">Investor Partnerships guide</a>.</p>
<h3>Innovation Loans</h3>
<p>Loans of &pound;100,000 to &pound;5 million are paused. The latest brief says &ldquo;Applications for Innovation Loans will pause from 11am 9th October 2026 until January 2027.&rdquo;</p>
<h3>EIC Accelerator</h3>
<p>UK companies can apply for the grant only, up to &euro;2.5 million. Short proposals can go in at any time and are batched on the first Tuesday of each month, so the next is 3 November.</p>
<h3>Knowledge Transfer Partnerships</h3>
<p>Round 4 closes on 27 January 2027 and is led by a university, research organisation or Catapult, with a business as the partner.</p>
{endcta(B, "On a free funding call you&rsquo;ll find out which call fits your roadmap, where founders usually lose points, and whether it&rsquo;s worth applying this round.")}
<div class="srcs"><b>Sources</b><ol><li><a href="{UKRI_SMART}">UKRI guidance for specific funds</a></li><li><a href="{SMART_MAIN}">Smart grants impact evaluation, final report</a></li><li><a href="{SMART_ANNEX}">Smart grants impact evaluation, technical annex</a></li><li><a href="{IFS}/competition/search">Innovation Funding Service, all competitions</a>, read 20 October 2026</li><li><a href="{GC_PAGE}">UKRI, investor partnerships</a></li><li><a href="{LOANS}">Innovation Loans brief</a></li><li><a href="{EIC}">EIC Accelerator</a></li></ol></div>
</article></div>'''
    return body


# ------------------------------------------------------------------ guide 2, BridgeAI
def bridgeai(B, calls):
    by = {c['id']: c for c in calls}
    strands = [
        ('ops', 'Operational systems', by[2599], 'solutions that perform, control or coordinate operational activity',
         'For example scheduling, routing, robotics on a line or a farm, energy and network control.'),
        ('dec', 'Decision critical systems', by[2598], 'solutions that support consequential judgements, recommendations or decisions',
         'For example clinical triage, credit and risk calls, safety decisions, planning in health or transport.'),
        ('assur', 'Assurance and compliance', by[2597], 'solutions that monitor, test, verify or evidence compliance with requirements, standards or controls',
         'For example checking documents against rules, testing other AI systems, evidencing controls for regulators.'),
    ]
    tabs = ''.join(f'<button type="button" aria-pressed="{"true" if k == 0 else "false"}" data-strand="{s[0]}">{s[1]}</button>' for k, s in enumerate(strands))
    panes = ''.join(f'<div class="strand{" on" if k == 0 else ""}" data-strand="{s[0]}"><h3>{s[1]}</h3><q>&ldquo;UK registered SMEs can apply for a share of up to &pound;5 million to deploy Artificial Intelligence and Machine Learning {s[3]}.&rdquo;</q>'
                    f'<p>{s[4]}</p><small><a href="{s[2]["url"]}" style="color:#fff">The {s[1].lower()} brief on the Innovation Funding Service</a></small></div>' for k, s in enumerate(strands))
    body = head_block(B, 'BridgeAI Deployment Catalyst', 'BridgeAI Deployment Catalyst, the three strands',
                      'A grant of &pound;100K to &pound;200K for an AI SME with a working product and a larger organisation that will put it to use. Open from 21 October, closing 8 December at 11am.',
                      ['Updated 20 October 2026', '7 minute read', 'Three calls, one set of rules'], 'board')
    body += f'''<div class="wrap">{facts([('&pound;200K', 'the most a project can ask for, and &pound;100K the least'), ('3 to 5', 'months, the project length'), ('TRL 5 or 6', 'an existing AI or ML solution, with a working MVP'), ('8 Dec', 'closes at 11am UK time')])}</div>
<div class="wrap art">
{toc([('who', 'Who can apply'), ('strands', 'Which strand is yours'), ('deployer', 'The deployer'), ('money', 'The money'), ('scoring', 'How it&rsquo;s scored'), ('checks', 'Five checks to run first')])}
<article class="prose">
<h2 id="who">Who can apply</h2>
<p>BridgeAI Deployment Catalyst is for AI that already works and is ready to be put to use by a larger organisation. The rules are the same across all three strands.</p>
<ul><li>The lead is a UK registered AI SME with an existing AI or ML solution at technology readiness level 5 or 6, with a functioning minimum viable product.</li>
<li>Each application includes one deployer, a UK registered medium or large business or a UK based public sector organisation.</li>
<li>You may add one more partner, so the consortium is two or three organisations.</li>
<li>The lead accounts for between 40% and 70% of the project&rsquo;s total eligible costs.</li></ul>

<h2 id="strands">Which strand is yours</h2>
<p>Pick the strand by what your system does once it&rsquo;s deployed. Each has up to &pound;5 million and the same dates.</p>
<div class="strands"><div class="tabs" role="group" aria-label="Strands">{tabs}</div>{panes}</div>

<h2 id="deployer">The deployer carries half the story</h2>
<p>In our reading, the question behind every scored answer is whether this AI will really run inside a larger organisation within three to five months. The deployer is how you answer it. A named medium or large organisation, the part of its operation the system goes into, and what it will measure.</p>
<div class="callout">{B.glyph("ggggggag", "big")}<div><b>Our advice</b><p>Get the deployer&rsquo;s commitment in writing first. Without one, the application can&rsquo;t go in at all.</p></div></div>

<h2 id="money">The money, worked through</h2>
<p>Grant rates are up to 70% for a micro or small organisation, 60% for medium and 50% for large. Put in your own numbers to see your company&rsquo;s share.</p>
<form class="calc" id="calc-bridge" onsubmit="return false" aria-label="BridgeAI cost split">
<h3>Your share of a BridgeAI project</h3>
<div class="row"><label for="cb-total">Total eligible project costs (&pound;)<input id="cb-total" type="number" inputmode="numeric" min="0" step="1000" value="300000"></label>
<label for="cb-lead">Your share of the costs (%)<input id="cb-lead" type="number" min="0" max="100" step="1" value="60"></label></div>
<div class="row"><label for="cb-size">Your size<select id="cb-size"><option value="70">Micro or small, up to 70%</option><option value="60">Medium, up to 60%</option></select></label>
<label for="cb-dep">The deployer&rsquo;s size<select id="cb-dep"><option value="60">Medium, up to 60%</option><option value="50">Large, up to 50%</option></select></label></div>
<div class="out"><div><b id="cb-g1">&pound;126,000</b><span>your grant</span></div><div><b id="cb-own">&pound;54,000</b><span>your company pays</span></div><div><b id="cb-gt">&pound;198,000</b><span>total grant request</span></div></div>
<p class="warn" id="cb-w1">Your share has to be between 40% and 70% of the costs.</p>
<p class="warn" id="cb-w2">The total grant request has to be between &pound;100,000 and &pound;200,000.</p>
<p class="note">Assumes the deployer is the only other partner. Rates are the maximums in the brief.</p>
</form>

<h2 id="scoring">How it&rsquo;s scored</h2>
<p>The application has 19 questions. The first nine aren&rsquo;t scored, and the other ten are, each one by three independent assessors with expertise relevant to the project. In Innovate UK&rsquo;s assessor guidance for Frontier AI SME Champions, another AI call open now, each scored question is marked from 1 to 10.</p>
<p>The brief doesn&rsquo;t state the odds for BridgeAI. Across the AI calls that do, Frontier AI SME Champions says 2% and Efficient, Structured and Controllable AI Systems says 4%.</p>

<h2 id="checks">Five checks to run first</h2>
<ol><li>Your product is at TRL 5 or 6, with a working MVP you can show.</li><li>A medium or large UK business, or a UK public sector body, will deploy it and will say so in writing.</li><li>You know which strand describes what the system does.</li><li>Your share of the costs sits between 40% and 70%.</li><li>You can fund your company&rsquo;s share, at least 30% for a micro or small company.</li></ol>
{endcta(B, "Tell us what your system does and who&rsquo;d deploy it. On a free funding call we&rsquo;ll say which strand fits and where an application like yours usually loses points.")}
<div class="srcs"><b>Sources</b><ol><li><a href="{by[2599]["url"]}">AI for Operational Systems</a></li><li><a href="{by[2598]["url"]}">AI for Decision Critical Systems</a></li><li><a href="{by[2597]["url"]}">AI for Assurance and Compliance</a></li><li><a href="{FAI_GUIDE}">Frontier AI assessor guidance</a></li><li>All read on the Innovation Funding Service, 20 October 2026</li></ol></div>
</article></div>'''
    return body


# ------------------------------------------------------------------ guide 3, Investor Partnerships
def investor(B, calls):
    by = {c['id']: c for c in calls}
    open_ = [by[2595], by[2580]]
    body = head_block(B, 'Investor Partnerships', 'Investor Partnerships, a grant with an investor alongside',
                      'Two investor partnership calls are open, batteries and engineering biology. The grant only comes with private investment, so the investor is the first conversation, not the last.',
                      ['Updated 20 October 2026', '7 minute read', 'Battery and engineering biology calls'], 'lab')
    body += f'''<div class="wrap">{facts([('25 Nov', 'Battery Innovation Programme closes, 11am'), ('2 Dec', 'Engineering Biology round 1 closes, 11am'), ('2&times;', 'engineering biology investment against the grant'), ('20%', 'Innovate UK&rsquo;s odds for engineering biology')])}</div>
<div class="wrap art">
{toc([('how', 'How it works'), ('open', 'Open now'), ('match', 'The match, worked through'), ('decides', 'What decides it'), ('growth', 'And Growth Catalyst?')])}
<article class="prose">
<h2 id="how">How it works</h2>
<p>An investor partnership pairs an Innovate UK grant with equity from one of Innovate UK&rsquo;s selected investor partners. The grant pays for the R&amp;D, the investment backs the company, and the grant depends on the investment.</p>
<p>Across its investor partnership programmes from 2017 to November 2025, Innovate UK says it awarded &pound;168 million to 417 SMEs, 105 investor partners made or led &pound;448 million of aligned equity, and those SMEs raised &pound;1.36 billion more afterwards.</p>
<span class="src-l">Source, <a href="{GC_PAGE}">UKRI, investor partnerships</a>, updated 22 September 2026.</span>

<h2 id="open">Open now</h2>
<ul class="clist">{''.join(call_li(c) for c in open_)}</ul>
<h3>Battery Innovation Programme</h3>
<p>A single UK SME, invited to apply by an investor from Innovate UK&rsquo;s pool of selected investor partners. Project costs depend on the kind of research, &pound;50,000 to &pound;300,000 for a feasibility study, &pound;100,000 to &pound;1 million for industrial research and &pound;250,000 to &pound;2 million for experimental development. Grant rates are up to 70% for a micro or small company on feasibility and industrial research, and up to 45% on experimental development.</p>
<h3>Engineering Biology, round 1</h3>
<p>A single UK SME developing engineering biology products or services, seeking private financing of at least twice the grant it asks for. The grant request is &pound;250,000 to &pound;2 million, the project runs 24 months, and the aligned investment led by the investor partner must always be at least twice the grant.</p>

<h2 id="match">The match, worked through</h2>
<p>For the engineering biology call, put in your project&rsquo;s costs to see the grant and the investment it needs alongside.</p>
<form class="calc" id="calc-ip" onsubmit="return false" aria-label="Engineering biology match">
<h3>Engineering Biology Investor Partnerships</h3>
<div class="row"><label for="ci-total">Total eligible project costs (&pound;)<input id="ci-total" type="number" inputmode="numeric" min="0" step="10000" value="1500000"></label>
<label for="ci-size">Your size<select id="ci-size"><option value="45">Micro or small, up to 45%</option><option value="35">Medium, up to 35%</option></select></label></div>
<div class="out"><div><b id="ci-g">&pound;675,000</b><span>grant at the maximum rate</span></div><div><b id="ci-inv">&pound;1,350,000</b><span>investment needed, at least</span></div><div><b id="ci-own">&pound;825,000</b><span>costs the grant doesn&rsquo;t cover</span></div></div>
<p class="warn" id="ci-w">The grant request has to be between &pound;250,000 and &pound;2 million.</p>
<p class="note">The rates for this call are the ones in its brief, up to 45% for micro or small and 35% for medium sized companies.</p>
</form>

<h2 id="decides">What decides it</h2>
<p>In the last Growth Catalyst round, which runs on the same investor partnership model, the brief named three things a decision rests on. Innovation, assessed by independent assessors from your application. Additionality, how much the grant speeds up your innovation and draws in the investment. Traction, how likely the investment is to complete in reasonable time.</p>
<div class="callout">{B.glyph("ggaggggg", "big")}<div><b>Our advice</b><p>Start with the investor. On the battery call you can&rsquo;t apply without their invitation, and on engineering biology the investment has to be led by one of the selected partners.</p></div></div>

<h2 id="growth">And Growth Catalyst?</h2>
<p>Growth Catalyst is the same model for seed to Series A startups. Its last round, for later stage startups, closed on 3 February 2026, and UKRI says further competitions are subject to confirmation.</p>
<p>Innovate UK&rsquo;s own worked example for that round shows the scale. A &pound;2 million experimental development project, a &pound;900,000 grant at 45%, and &pound;1.8 million of equity into the business before the project starts.</p>
<span class="src-l">Sources, <a href="{GC_BRIEF}">Growth Catalyst round 2 brief</a>, <a href="{GC_SLIDES}">applicant briefing slides</a> and <a href="{BC_GC}">Innovate UK Business Connect</a>.</span>
{endcta(B, "If you&rsquo;re raising, or talking to investors, a free funding call will tell you whether an investor partnership round is worth timing your raise around.")}
<div class="srcs"><b>Sources</b><ol><li><a href="{by[2595]["url"]}">Investor Partnerships, Battery Innovation Programme</a></li><li><a href="{by[2580]["url"]}">Engineering Biology Investor Partnerships round 1</a></li><li><a href="{GC_PAGE}">UKRI, investor partnerships</a></li><li><a href="{GC_BRIEF}">Growth Catalyst round 2 brief</a></li><li><a href="{GC_SLIDES}">Growth Catalyst applicant briefing slides</a></li></ol></div>
</article></div>'''
    return body


def hub(B, calls):
    cards = ''
    for g in GUIDES:
        meta = ''.join(f'<span>{esc(m)}</span>' for m in g['meta'])
        cards += (f'<a class="gc" href="/guides/{g["slug"]}/" data-tags="guide"><span class="ph"><img src="/assets/media/{g["img"]}.jpg" alt="" loading="lazy" width="1600" height="900"></span>'
                  f'<span class="tx"><h3>{esc(g["title"])}</h3><p>{esc(g["dek"])}</p><span class="meta">{meta}</span></span></a>')
    live = [c for c in calls if days_left(c['closes']) >= 0]
    live.sort(key=lambda c: c['closes'])
    notes = ''.join(f'<li data-tags="call {c["theme"]} {c["lead"]}">{call_li(c)[4:-5]}</li>' for c in live)
    body = f'''<section class="ghero"><div class="wrap">
  <h1 class="h-l">Guides to the grant calls open now.</h1>
  <p class="lede">What each call funds, who can lead, how it&rsquo;s scored and where applications lose points. Written by grant writers, from the funder&rsquo;s own pages.</p>
</div></section>
<section class="sec tight"><div class="wrap">
  <h2 class="sr">The guides</h2>
  <div class="gcards" style="grid-template-columns:repeat(3,minmax(0,1fr))">{cards}</div>
</div></section>
<section class="sec mist"><div class="wrap">
  <div class="sh"><div><h2 class="h-m">A page for every call on the Innovation Funding Service</h2></div><p class="lede">The rules as Innovate UK wrote them, the closing time and the odds where they&rsquo;re stated. Updated each morning.</p></div>
  <div class="filters" data-filter="notes" data-empty="notes-empty">
    <div class="tabs" role="group" aria-label="Filter calls"><button type="button" data-tag="all" aria-pressed="true">All</button><button type="button" data-tag="sme" aria-pressed="false">SME can lead</button><button type="button" data-tag="ai" aria-pressed="false">AI</button><button type="button" data-tag="battery" aria-pressed="false">Batteries</button><button type="button" data-tag="bio" aria-pressed="false">Engineering biology</button><button type="button" data-tag="health" aria-pressed="false">Health</button></div>
    <label class="sr" for="notes-q">Search calls</label><input id="notes-q" type="search" placeholder="Search the calls">
    <span class="count"></span>
  </div>
  <ul class="clist" id="notes">{notes}</ul>
  <p id="notes-empty" hidden>No call matches that. Try All, or <a href="/fit/">check your fit</a> instead.</p>
</div></section>'''
    return body


def build(B):
    calls = load_calls()
    out = [('guides/index.html', B.page('Grant guides | BidX', 'Guides to the Innovate UK calls open now, what they fund, who can lead, how they are scored.', '/guides/', hub(B, calls), cur='/guides/'))]
    out.append(('guides/smart-grants-closed/index.html', B.page('Smart grants are closed. What to apply for instead | BidX',
                'Innovate UK Smart grants are closed for new applications. The calls open now for UK startups and SMEs, their odds and deadlines.',
                '/guides/smart-grants-closed/', smart(B, calls), cur='/guides/', scripts=('site.js', 'guides.js'))))
    out.append(('guides/bridgeai-deployment-catalyst/index.html', B.page('BridgeAI Deployment Catalyst, the three strands | BidX',
                'BridgeAI Deployment Catalyst explained. Who can apply, the three strands, the deployer, the money and how it is scored.',
                '/guides/bridgeai-deployment-catalyst/', bridgeai(B, calls), cur='/guides/', scripts=('site.js', 'guides.js'))))
    out.append(('guides/investor-partnerships/index.html', B.page('Investor Partnerships, grant funding with an investor | BidX',
                'Innovate UK investor partnership calls open now for batteries and engineering biology, how the match works and what decides it.',
                '/guides/investor-partnerships/', investor(B, calls), cur='/guides/', scripts=('site.js', 'guides.js'))))
    return out
