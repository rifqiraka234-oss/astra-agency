"""The BidX outreach desk at /desk/. One page, seven views, everything rendered here so it reads without JavaScript."""
import json
import os
from html import escape as esc

from .common import SIZE, live_count

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CHECKS = [
    ('UK company', 'Registered and active at Companies House'),
    ('Small enough', 'An SME, so the call is open to it'),
    ('In scope', 'What it builds sits inside the call'),
    ('Something new', 'Real development work, not resale'),
    ('Team to deliver', 'Technical people to run the project'),
    ('Can fund its share', 'A sign it can cover the match'),
    ('Time to apply', 'Enough working days before the deadline'),
    ('Free to contact', 'Not a client, not contacted in 90 days'),
]


def load(name):
    with open(os.path.join(HERE, 'data', name), encoding='utf-8') as f:
        data = json.load(f)
    if name == 'calls.json':
        from .common import clean_call
        data = [clean_call(c) for c in data]
    return data


def days_left(close_iso, today='2026-10-21'):
    import datetime as dt
    c = dt.date.fromisoformat(close_iso[:10])
    t = dt.date.fromisoformat(today)
    return (c - t).days


def side(B, counts):
    items = [
        ('v-today', 'Today', B.glyph('raarragg', ''), str(counts['today']), ''),
        ('v-founders', 'Founders', '<span class="sig n" aria-hidden="true"></span>', f"{counts['fit']:,}", ''),
        ('v-calls', 'Calls', '<span class="sig i" aria-hidden="true"></span>', str(counts['calls']), ''),
        ('v-inbox', 'Inbox', '<span class="sig g" aria-hidden="true"></span>', str(counts['inbox']), ' hot'),
        ('v-guides', 'Guides', '<span class="sig a" aria-hidden="true"></span>', str(counts['guides']), ''),
        ('v-results', 'Results', '<span class="sig n" aria-hidden="true"></span>', '', ''),
        ('v-setup', 'Setup', '<span class="sig n" aria-hidden="true"></span>', '', ''),
    ]
    nav = ''.join(
        f'<button type="button" data-view="{v}" aria-current="false"><span class="ic">{ic}</span>{t}'
        f'{f"<span class=\"ct{hot}\">{c}</span>" if c else ""}</button>' for v, t, ic, c, hot in items)
    return f'''<aside class="side" aria-label="Desk">
  <a class="logo" href="/" aria-label="BidX">{B.LOGO_SVG}</a>
  <p class="tag">Outreach</p>
  <nav class="vnav">{nav}</nav>
  <div class="side-f">
    <div class="health">
      <span class="sig g">LinkedIn, sending as Simon</span>
      <span class="sig g">Email, sending as Simon</span>
    </div>
    <div class="who"><span class="av">AM</span><div><b>Aaron Mason</b><span>Product &amp; AI</span></div></div>
  </div>
</aside>'''


def fmt_close(iso):
    import datetime as dt
    d = dt.date.fromisoformat(iso[:10])
    return f'{d.day} {d.strftime("%B")}'


EIC = dict(id='eic', slug=None, name='EIC Accelerator, short proposal batch', closes='2026-11-03T17:00:00+01:00',
           size=['Grant component below EUR 2.5 million'], odds=None, url='https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en',
           lead='sme', theme='any', type='Grant', startup=True)

# One line per call for the drafted messages. Every figure is the funder's own, see data/calls.json and research.md.
CALL_LINE = {
    2599: ('BridgeAI, operational systems', "BridgeAI Deployment Catalyst has a strand for AI in operational systems. It funds an AI SME and a medium or large company putting a working system to use, with a grant of £100K to £200K, and it closes on 8 December."),
    2598: ('BridgeAI, decision critical', "BridgeAI Deployment Catalyst has a strand for AI that supports consequential decisions. It funds an AI SME and a medium or large organisation putting a working system to use, with a grant of £100K to £200K, and it closes on 8 December."),
    2597: ('BridgeAI, assurance', "BridgeAI Deployment Catalyst has a strand for AI that checks compliance with rules and standards. It funds an AI SME and a medium or large organisation putting a working system to use, with a grant of £100K to £200K, and it closes on 8 December."),
    2584: ('Frontier AI', "Frontier AI SME Champions funds feasibility studies costing £150K to £250K and closes on 11 November. Innovate UK puts the odds at 2%, so it needs a very sharp application."),
    2582: ('Efficient AI systems', "Innovate UK's call for efficient, structured and controllable AI systems funds projects of £50K to £150K and closes on 18 November. It's written for research led AI startups and spinouts."),
    2595: ('Battery Investor Partnerships', "Innovate UK's battery Investor Partnerships call pairs a grant with investment from an approved investor partner and closes on 25 November. The investor has to invite you in, so that conversation is the first step."),
    2571: ('Battery feasibility', "Battery Innovation Feasibility Studies funds a grant of £70K to £500K for a consortium with at least one SME, and closes on 2 December. Innovate UK puts the odds at 25%."),
    2580: ('Engineering Biology Investor Partnerships', "Engineering Biology Investor Partnerships funds a grant of £250K to £2M alongside an investor partner, who puts in at least twice the grant. It closes on 2 December."),
    2542: ('Engineering Biology CR&D', "Engineering Biology Collaborative R&D closes on 3 November, for projects costing £750K to £2.5M with partners."),
    2600: ('FOAK Builder', "FOAK Builder is open for climate tech first of a kind projects, with support worth up to £315K at this stage, and it closes on 5 November."),
    2583: ('UK Germany R&D', "The UK Germany bilateral R&D call funds UK SMEs £100K to £350K alongside a German SME partner, and closes on 1 December."),
    2526: ('UK Singapore R&D', "The UK Singapore R&D call funds UK partners £100K to £900K alongside a Singapore business, and closes on 16 December."),
    2586: ('Globalstars Japan', "Eureka Globalstars Japan funds UK partners up to £600K alongside a Japanese SME, and closes on 20 January."),
    2602: ('Low carbon concrete cohort', "Innovate UK's low carbon concrete cohort is open, a £50K grant for six months plus sector support, and it closes on 2 December."),
    2560: ('Sustainable medicines', "Sustainable Medicines Manufacturing Innovation funds collaborations asking for £500K to £1M, and closes on 2 December."),
    2527: ('Cancer diagnosis', ''),
    2569: ('Materials CR&D', ''),
    'eic': ('EIC Accelerator', "The EIC Accelerator takes short proposals any time and batches them on the first Tuesday of each month, next on 3 November. UK companies can apply for the grant, up to \u20ac2.5M."),
}

OFFERS = [
    "If it's on your list, I'd be glad to show you how assessors score it and where applications like yours tend to lose points, on a free funding call.",
    "Happy to walk you through how it's scored on a free funding call, if that's useful.",
    "If you're weighing it up, a free funding call would tell you quickly whether it's worth the effort.",
    "Worth a free funding call to see if it's a fit?",
]


def message(fd, i):
    hook = fd['hook'][0].lower() + fd['hook'][1:]
    line = CALL_LINE[fd['call']][1]
    return f"Hi {fd['first']}, {hook}.\n\n{line}\n\n{OFFERS[i % len(OFFERS)]}\n\nSimon"


def connect_note(fd):
    return (f"Hi {fd['first']}, I'm Simon from BidX. We help founders win grant funding, and {fd['company']} looks like a "
            f"strong fit for a call that's open now. Would be good to connect.")


def bump(fd):
    short = CALL_LINE[fd['call']][0]
    if fd['call'] == 'eic':
        return f"{fd['first']}, did this reach you? The next EIC Accelerator batch is on {fmt_close(fd['_call']['closes'])}, so there's still time."
    return f"{fd['first']}, did this reach you? The {short} call closes on {fmt_close(fd['_call']['closes'])}, so there's still time."


def dl(close_iso, cls=''):
    n = days_left(close_iso)
    return (f'<span class="dl {cls}" data-close="{close_iso}"><span class="dl-n">{n:02d}</span>'
            f'<small class="dl-u">{"day" if n == 1 else "days"}</small></span>')


def founders_data():
    import importlib.util
    spec = importlib.util.spec_from_file_location('founders', os.path.join(HERE, 'data', 'founders.py'))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.F


def lrow(B, fd, i):
    c = fd['_call']
    right = dl(c['closes']) if c else '<span class="dl">&middot;</span>'
    st = {'ready': ('Ready', ''), 'held': ('Held', ' sk')}[fd['state']]
    return (f'<li role="none"><button type="button" class="lrow" role="option" aria-selected="false" data-id="{fd["id"]}" '
            f'data-first="{esc(fd["first"])}" data-state="{fd["state"]}">'
            f'{B.glyph(fd["checks"], "", "Fit, " + fit_label(fd["checks"]))}'
            f'<span><span class="nm">{esc(fd["first"])} {esc(fd["last"])}, {esc(fd["company"])}</span>'
            f'<span class="wt">{esc(fd["what"])}</span></span>'
            f'<span class="rt">{right}<span class="st{st[1]}">{st[0]}</span></span></button></li>')


def fit_label(checks):
    g, a, r = checks.count('g'), checks.count('a'), checks.count('r')
    parts = [f'{g} of 8 clear']
    if a:
        parts.append(f'{a} likely')
    if r:
        parts.append(f'{r} failing')
    return ', '.join(parts)


def detail(B, fd, i):
    c = fd['_call']
    checks = ''.join(f'<li class="{s}"><span><b>{esc(CHECKS[k][0])}</b><span>{esc(fd["reasons"][k])}</span></span></li>'
                     for k, s in enumerate(fd['checks']))
    sig = ''.join(f'<span class="sig i">{esc(x)}</span>' for x in fd['signals'])
    href = f'/calls/{c["slug"]}/' if c.get('slug') else c['url']
    size = esc(SIZE.get(c['id']) or (c['size'][0].lstrip('- ') if c.get('size') else ''))
    msg = message(fd, i)
    cn = connect_note(fd)
    return f'''<article class="det" data-id="{fd["id"]}" aria-label="{esc(fd["first"])}, {esc(fd["company"])}">
  <div class="det-h">{B.glyph(fd["checks"], "big", "Fit, " + fit_label(fd["checks"]))}
    <div><h3>{esc(fd["first"])} {esc(fd["last"])}, {esc(fd["company"])}</h3><p>{esc(fd["what"])}</p>
    <div class="facts"><span>Founder</span><span>{esc(fd["city"])}</span><span>Since {esc(fd["founded"])}</span><span>{esc(fd["team"])}</span><span>{B.ICON["li"] if fd["channel"] == "LinkedIn" else B.ICON["mail"]} {esc(fd["channel"])}</span></div></div>
  </div>
  <div class="blk"><h4>Why they fit</h4><ol class="checks">{checks}</ol></div>
  <div class="blk"><h4>The call</h4>
    <div class="callcard"><div><b><a href="{href}">{esc(c["name"])}</a></b><span>{size}</span></div>
    <div><span class="dotf" data-close="{c["closes"]}"><span class="dl-n">{days_left(c["closes"]):02d}</span></span><span class="u">days left</span></div></div>
  </div>
  <div class="blk"><h4>Signals</h4><div class="facts" style="margin-top:0">{sig}</div></div>
  <div class="blk"><h4>First message</h4>
    <div class="msg"><div class="msg-h">{B.ICON["li"]} LinkedIn, from Simon Dutta<span class="sp"></span>Written for {esc(fd["first"])} and this call</div>
    <label class="sr" for="m-{fd["id"]}">Message to {esc(fd["first"])}</label>
    <textarea id="m-{fd["id"]}" rows="9">{esc(msg)}</textarea>
    <div class="msg-f"><span class="chars">{len(msg)} characters</span><span>Edit before you approve</span></div></div>
  </div>
  <div class="blk"><h4>Then</h4><ol class="seq">
    <li><span class="d">Day 0</span><span class="k"></span><span>Connection request. &ldquo;{esc(cn)}&rdquo;</span></li>
    <li><span class="d">Accepted</span><span class="k"></span><span>The message above goes the next working morning.</span></li>
    <li><span class="d">3 days on</span><span class="k"></span><span>If there&rsquo;s no reply, one bump. &ldquo;{esc(bump(fd))}&rdquo;</span></li>
    <li><span class="d">After</span><span class="k"></span><span>Nothing more. Two messages, then {esc(fd["first"])} goes quiet on the list for 90 days.</span></li>
  </ol></div>
  <div class="acts">
    <button type="button" class="btn pri do-ok">Approve and queue <span class="kbd">A</span></button>
    <button type="button" class="btn sec do-skip">Skip <span class="kbd">S</span></button>
  </div>
  <div class="skipset" aria-label="Why skip"><button type="button">Not a fit</button><button type="button">Already a client</button><button type="button">Wrong person</button><button type="button">Bad timing</button></div>
</article>'''


INBOX = [
    dict(id='i1', first='Olivia', last='T.', company='Pinewick Analytics', intent='call', label='Wants a call', when='Yesterday, 4.12pm',
         call='Frontier AI SME Champions', sent="Hi Olivia, saw Pinewick's model beat the benchmark you posted last month.\n\nFrontier AI SME Champions funds feasibility studies costing £150K to £250K and closes on 11 November. Innovate UK puts the odds at 2%, so it needs a very sharp application.\n\nHappy to walk you through how it's scored on a free funding call, if that's useful.\n\nSimon",
         reply="We've had our eye on this one but 2% is scary. Could do a call Thursday or Friday?",
         read="Wants a call and named the days. Offer Thursday or Friday."),
    dict(id='i2', first='Will', last='A.', company='Kittiwake Robotics', intent='call', label='Wants a call', when='Yesterday, 11.03am',
         call='BridgeAI, operational systems', sent="Hi Will, saw the warehouse picking pilot you announced.\n\nBridgeAI Deployment Catalyst has a strand for AI in operational systems. It funds an AI SME and a medium or large company putting a working system to use, with a grant of £100K to £200K, and it closes on 8 December.\n\nWorth a free funding call to see if it fits?\n\nSimon",
         reply="Timely. We applied to Smart last year and missed by a few points. Yes let's talk, the warehouse partner is up for it.",
         read="Missed Smart narrowly and has a deployer ready. A strong call."),
    dict(id='i3', first='Hamid', last='S.', company='Silverholm Sensors', intent='question', label='Question', when='Monday, 3.40pm',
         call='BridgeAI, operational systems', sent="Hi Hamid, saw the flood sensors going in along the Calder.\n\nBridgeAI Deployment Catalyst has a strand for AI in operational systems. It funds an AI SME and a medium or large company putting a working system to use, with a grant of £100K to £200K, and it closes on 8 December.\n\nIf you're weighing it up, a free funding call would tell you quickly whether it's worth the effort.\n\nSimon",
         reply="What do you charge for this?",
         read="Asked about price. Answer with the terms on bidx.ai and offer the call.",
         suggest="Good question, Hamid. There's a professional fee up front, and if we can't find a suitable route at the first review we refund it. If no grant cash comes in, there's no success fee. The free funding call is where we'd see if there's a route at all. Does Thursday work?\n\nSimon"),
    dict(id='i4', first='Freya', last='M.', company='Ambergate Biotech', intent='question', label='Question', when='Monday, 9.15am',
         call='Engineering Biology Investor Partnerships', sent="Hi Freya, saw Ambergate's seed round close in the summer.\n\nEngineering Biology Investor Partnerships funds a grant of £250K to £2M alongside an investor partner, who puts in at least twice the grant. It closes on 2 December.\n\nHappy to walk you through how it's scored on a free funding call, if that's useful.\n\nSimon",
         reply="Our lead investor isn't on the partner list I think. Does that rule us out?",
         read="Asked about the investor partner rule. Answer it straight, it's in the brief.",
         suggest="It matters, Freya. The aligned investment has to be led by one of Innovate UK's selected investor partners and be at least twice the grant, so if your lead isn't one of them it's worth asking whether one of the partners would lead or join the round. Happy to go through the options on a free funding call.\n\nSimon"),
    dict(id='i5', first='Callum', last='D.', company='Calderbrook Motion', intent='later', label='Later', when='Friday, 2.02pm',
         call='UK Germany R&D', sent='', reply="Not right now, we're closing our seed round. Try us in January?",
         read="Not now. Snoozed to Monday 11 January, with a note about the seed round."),
    dict(id='i6', first='Ruth', last='B.', company='Larchmont Fluidics', intent='no', label='Not for us', when='Thursday, 10.48am',
         call='Battery feasibility', sent='', reply="Thanks but we don't do grants.",
         read="A clear no. Closed, and Larchmont won't be picked again."),
    dict(id='i7', first='Josh', last='K.', company='Wrenfield Diagnostics', intent='call', label='Wants a call', when='Thursday, 8.30am',
         call='EIC Accelerator', sent='', reply="Yes, we're looking at the EIC. When are you free?",
         read="Wants a call. Offer two slots."),
]

SLOTS = ['Thu 10am', 'Thu 2pm', 'Fri 11am', 'Fri 3.30pm']


def inbox_view(B):
    rows, threads = [], []
    for k, t in enumerate(INBOX):
        cls = {'call': 'g', 'question': 'a', 'later': 'n', 'no': 'r'}[t['intent']]
        rows.append(f'<li role="none"><button type="button" class="lrow" role="option" data-id="{t["id"]}" data-intent="{t["intent"]}" aria-selected="false">'
                    f'<span class="sig {cls}" aria-hidden="true"></span><span><span class="nm">{esc(t["first"])} {esc(t["last"])}, {esc(t["company"])}</span>'
                    f'<span class="wt">{esc(t["reply"])}</span></span><span class="rt"><span class="mono" style="color:var(--ink3)">{esc(t["when"].split(",")[0])}</span>'
                    f'<span class="st{" q" if t["intent"] == "question" else ""}">{esc(t["label"])}</span></span></button></li>')
        sent = f'<div class="bub us">{esc(t["sent"])}<small>Simon, LinkedIn</small></div>' if t['sent'] else ''
        if t['intent'] == 'call':
            act = (f'<div class="blk"><h4>Book the funding call</h4><div class="slots">'
                   + ''.join(f'<button type="button" aria-pressed="false">{s}</button>' for s in SLOTS)
                   + f'</div><div class="acts" style="border:0;padding-top:4px;margin-top:12px"><button type="button" class="btn pri do-book" disabled>Book it and send the invite</button></div>'
                     f'<div class="booked" role="status"></div></div>')
        elif t['intent'] == 'question':
            act = (f'<div class="blk"><h4>Suggested answer</h4><div class="msg"><label class="sr" for="r-{t["id"]}">Reply to {esc(t["first"])}</label>'
                   f'<textarea id="r-{t["id"]}" rows="6">{esc(t["suggest"])}</textarea></div>'
                   f'<div class="acts" style="border:0;padding-top:4px;margin-top:12px"><button type="button" class="btn pri do-send">Send reply</button></div></div>')
        else:
            act = ''
        threads.append(f'''<article class="thread" data-id="{t["id"]}" data-first="{esc(t["first"])}">
  <div class="det-h"><span class="av s">{t["first"][0]}{t["last"][0]}</span><div><h3 style="font-size:19px">{esc(t["first"])} {esc(t["last"])}, {esc(t["company"])}</h3><p>{esc(t["call"])}</p></div></div>
  {sent}<div class="bub them">{esc(t["reply"])}<small>{esc(t["first"])}, {esc(t["when"])}</small></div>
  <div class="reading"><span class="sig {cls}" aria-hidden="true"></span><span>{esc(t["read"])}</span></div>
  {act}
</article>''')
    tabs = ''.join(f'<button type="button" data-f="{f}" aria-pressed="{"true" if f == "all" else "false"}">{l}</button>'
                   for f, l in [('all', 'All'), ('call', 'Wants a call'), ('question', 'Question'), ('later', 'Later'), ('no', 'Not for us')])
    return f'''<section class="view" id="v-inbox" data-title="Inbox" aria-label="Inbox">
  <div class="inbox">
    <div class="pane"><div class="pane-h"><h2>Replies</h2><span class="sp"></span><div class="tabs" id="inbox-tabs">{tabs}</div></div>
      <ul class="list" id="inbox-list" role="listbox" aria-label="Replies" style="min-height:0">{"".join(rows)}</ul></div>
    <div class="pane" id="inbox-det">{"".join(threads)}</div>
  </div>
</section>'''


GUIDES_PLAN = {
    'Live': [
        ('Smart grants are closed. Here’s what to apply for instead', 'innovate uk smart grant', '/guides/smart-grants-closed/', 'Published 14 Oct'),
        ('BridgeAI Deployment Catalyst, the three strands', 'bridgeai deployment catalyst', '/guides/bridgeai-deployment-catalyst/', 'Published 16 Oct'),
        ('Investor Partnerships, a grant with an investor alongside', 'innovate uk investor partnerships', '/guides/investor-partnerships/', 'Published 19 Oct'),
        ('Every open Innovate UK call, one page each', 'innovate uk competitions open', '/calls/', 'LIVECOUNT pages, updated daily'),
    ],
    'Grant writer check': [
        ('Frontier AI SME Champions, writing for a 2% call', 'frontier ai sme champions', None, 'With Aaron'),
    ],
    'Writing': [
        ('Battery Innovation feasibility studies, round 3', 'battery innovation feasibility studies', None, 'Due 27 Oct'),
        ('Finding a German partner for the UK Germany call', 'uk germany bilateral innovate uk', None, 'Due 29 Oct'),
    ],
    'Planned': [
        ('Innovation Loans when they reopen in January', 'innovate uk innovation loans', None, 'January'),
        ('EIC Accelerator for UK companies, grant only', 'eic accelerator uk', None, 'Before 3 Nov'),
        ('The low carbon concrete cohort, start to finish', 'low carbon concrete innovate uk', None, 'November'),
    ],
}


def guides_view(calls=()):
    cols = []
    lc = live_count([c['closes'] for c in calls])
    for col, items in GUIDES_PLAN.items():
        dot = {'Live': 'g', 'Grant writer check': 'a', 'Writing': 'i', 'Planned': 'n'}[col]
        cards = ''
        for t, q, href, m in items:
            inner = f'<b>{esc(t)}</b><span class="q">Search, &ldquo;{esc(q)}&rdquo;</span><span class="m"><span>{esc(m).replace('LIVECOUNT', lc)}</span>{"<span>Open &rarr;</span>" if href else ""}</span>'
            cards += f'<a class="gcard" href="{href}">{inner}</a>' if href else f'<div class="gcard">{inner}</div>'
        cols.append(f'<div class="col"><h3><span class="sig {dot}" aria-hidden="true"></span>{esc(col)}<span class="ct">{len(items)}</span></h3>{cards}</div>')
    return f'''<section class="view" id="v-guides" data-title="Guides" aria-label="Guides">
  <div class="run" style="margin-bottom:16px"><div class="run-h"><h2>One guide for each call founders search for</h2>
  <p>A new call goes up on the Innovation Funding Service, its page goes up on bidx.ai the same morning, and the longer guide follows once a grant writer has checked it. Readers who don&rsquo;t book yet come back to the desk as a signal.</p></div></div>
  <div class="kan">{"".join(cols)}</div>
</section>'''


def calls_view(B, calls, matched):
    rows = []
    for c in calls:
        n = matched.get(c['id'], 0)
        href = f'/calls/{c["slug"]}/' if c.get('slug') else c['url']
        size = esc(SIZE.get(c['id']) or (c['size'][0].lstrip('- ') if c.get('size') else ''))
        lead = {'sme': 'An SME', 'business': 'A business', 'academic': 'A university or RTO', 'farm': 'A farm in England',
                'network': 'An energy network', 'public': 'A public research body', 'any': 'Any organisation'}[c['lead']]
        odds = ''
        if c.get('odds'):
            import re
            m = re.search(r'(\d+)%', c['odds'])
            odds = f'{m.group(1)}%' if m else ''
        bars = ''.join(f'<i style="height:{6 + 3 * k}px"></i>' for k in range(min(n, 5)))
        rows.append(f'''<tr><td><b><a href="{href}">{esc(c["name"])}</a></b><small>{size}</small></td>
<td class="hide-s">{lead}</td><td class="hide-s">{odds or "Not stated"}</td>
<td><span class="dotf" data-close="{c["closes"]}"><span class="dl-n">{days_left(c["closes"]):02d}</span></span><small>{fmt_close(c["closes"])}</small></td>
<td>{f'<span class="bars" aria-hidden="true">{bars}</span> <b>{n}</b>' if n else '<span class="small">None today</span>'}</td></tr>''')
    return f'''<section class="view" id="v-calls" data-title="Calls" aria-label="Calls">
  <div class="pane"><div class="pane-h"><h2>Every call that&rsquo;s open, nearest deadline first</h2><span class="sp"></span><span class="small">From the Innovation Funding Service and the EIC, checked each morning</span></div>
  <div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Call</th><th class="hide-s">Who can lead</th><th class="hide-s">Innovate UK&rsquo;s odds</th><th>Days left</th><th>Founders picked today</th></tr></thead>
  <tbody>{"".join(rows)}</tbody></table></div></div>
</section>'''


def founders_view(B, fds):
    rows = []
    for fd in fds:
        c = fd['_call']
        cname = esc(c['name']) if c else 'No open call fits'
        if fd['picked']:
            st = '<span class="st ok">Picked today</span>'
        else:
            k = fd['checks'].index('r')
            st = f'<span class="st sk">Held</span> <small>{esc(CHECKS[k][0])}. {esc(fd["reasons"][k])}.</small>'
        rows.append(f'<tr><td>{B.glyph(fd["checks"], "", "Fit, " + fit_label(fd["checks"]))}</td><td><b>{esc(fd["company"])}</b><small>{esc(fd["what"])}</small></td>'
                    f'<td class="hide-s">{cname}</td><td>{st}</td></tr>')
    return f'''<section class="view" id="v-founders" data-title="Founders" aria-label="Founders">
  <div class="run" style="margin-bottom:16px"><div class="run-h"><h2>186 fit a call today. 40 made the list.</h2>
  <p>The best fits with the nearest deadlines go first, and the rest wait their turn. One red dot holds a founder back, whatever the others say.</p></div>
  <div class="capline">{B.glyph("gggggggg", "", "All eight clear")} Clear {B.glyph("ggggggag", "", "Seven clear, one likely")} Likely, worth checking on the call {B.glyph("gggggggr", "", "One failing")} Held</div></div>
  <div class="pane"><div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Fit</th><th>Company</th><th class="hide-s">Matched call</th><th>Status</th></tr></thead><tbody>{"".join(rows)}</tbody></table></div>
  <p class="small" style="padding:14px 20px 18px">The 40 picked today, then {sum(1 for f in fds if not f["picked"])} held back and why. The other 146 that fit a call wait for a later day, nearest deadline first.</p></div>
</section>'''


def results_view():
    fun = [('Messages sent', 412), ('Replies', 61), ('Funding calls booked', 19), ('Proposals sent', 9), ('Clients signed', 4)]
    top = fun[0][1]
    rows = ''.join(f'<div class="frow"><span>{l}</span><span class="tr"><i style="width:{max(2, round(v / top * 100))}%"></i></span><b>{v}</b></div>' for l, v in fun)
    return f'''<section class="view" id="v-results" data-title="Results" aria-label="Results">
  <div class="grid2">
    <div class="pane"><div class="pane-h"><h2>October so far</h2><span class="sp"></span><span class="small">Since the desk went live</span></div><div class="funnel">{rows}</div>
      <p class="small" style="padding:0 20px 18px">Replies by call, top three. Frontier AI 22, Investor Partnerships 14, Battery feasibility 9.</p></div>
    <form class="pane" id="planner" onsubmit="return false" aria-label="Planner">
      <div class="pane-h"><h2>Plan a month</h2><span class="sp"></span><span class="small">Your numbers, simple arithmetic</span></div>
      <div class="plan">
        <label for="pl-perday"><span class="rowv">Founders reached a day <output for="pl-perday">40</output></span><input type="range" id="pl-perday" name="perday" min="30" max="50" step="1" value="40" data-fmt="#"></label>
        <label for="pl-days"><span class="rowv">Working days <output for="pl-days">20</output></span><input type="range" id="pl-days" name="days" min="10" max="23" step="1" value="20" data-fmt="#"></label>
        <label for="pl-reply"><span class="rowv">Reply rate you expect <output for="pl-reply">10%</output></span><input type="range" id="pl-reply" name="reply" min="2" max="30" step="1" value="10" data-fmt="#%"></label>
        <label for="pl-call"><span class="rowv">Replies that book a call <output for="pl-call">30%</output></span><input type="range" id="pl-call" name="call" min="5" max="60" step="1" value="30" data-fmt="#%"></label>
        <div class="res"><div><span class="dotf" id="p-calls">24</span><span>funding calls a month</span></div><div><span class="dotf" id="p-week">6</span><span>a week, on average</span></div></div>
        <p class="small">From <b id="p-msgs">800</b> founders reached and <b id="p-replies">80</b> replies. Set the rates from your own results once a month has run.</p>
      </div>
    </form>
  </div>
</section>'''


def setup_view(B):
    src = [
        ('Companies House', 'New companies, SIC codes, officers and accounts size, for every UK company', True),
        ('Innovate UK funded projects', 'Who has won before, by company number, from UKRI&rsquo;s published list', True),
        ('Innovation Funding Service', 'Every open call, its rules, size and deadline', True),
        ('EIC Accelerator', 'Batch dates and the grant only route for UK companies', True),
        ('LinkedIn company pages', 'Team size, new technical hires and posts', True),
        ('bidx.ai guide readers', 'Companies that read a guide and didn&rsquo;t book yet', True),
        ('Contracts Finder', 'Innovation contracts already won from government', False),
    ]
    srcs = ''.join(f'<li><span><b>{t}</b><span>{d}</span></span><button type="button" class="switch" role="switch" aria-checked="{"true" if on else "false"}" aria-label="{t}"></button></li>' for t, d, on in src)
    rules = ''.join(f'<li>{r}</li>' for r in [
        'Already a BidX client, or in a live proposal', 'Contacted in the last 90 days, by anyone at BidX', 'Asked us not to get in touch',
        'Registered outside the UK, or dissolved', 'A call that closes in under ten working days', 'No technical people on the team'])
    return f'''<section class="view" id="v-setup" data-title="Setup" aria-label="Setup">
  <div class="setg">
    <div class="pane"><h2>Where founders come from</h2><ul class="src">{srcs}</ul></div>
    <div class="pane"><h2>Who&rsquo;s never picked</h2><ul class="rules">{rules}</ul>
      <h2 style="margin-top:22px">The eight dots</h2>
      <ol class="checks" style="grid-template-columns:minmax(0,1fr)">{"".join(f'<li class="g"><span><b>{esc(a)}</b><span>{esc(b)}</span></span></li>' for a, b in CHECKS)}</ol></div>
    <div class="pane"><h2>Voice and sender</h2>
      <div class="field"><label for="s-sender">Messages go out as</label><select id="s-sender"><option>Simon Dutta, Co Founder, Growth &amp; GTM</option><option>Aaron Mason, Co Founder, Product &amp; AI</option></select></div>
      <div class="field"><label for="s-sign">Sign off</label><input id="s-sign" value="Simon"></div>
      <div class="field"><label for="s-voice">House rules for every draft</label><textarea id="s-voice" rows="4">Name what they build in one plain line. Quote the call&rsquo;s own figures. Offer the free funding call. Under 120 words.</textarea></div>
    </div>
    <div class="pane"><h2>Sending</h2>
      <div class="field"><label for="s-hours">Sending hours</label><select id="s-hours"><option>Weekdays, 9.40am to 4.30pm UK</option><option>Weekdays, 8am to 6pm UK</option></select></div>
      <div class="field"><label for="s-follow">Follow up</label><select id="s-follow"><option>One bump after 3 days, then stop</option><option>One bump after 5 days, then stop</option></select></div>
      <div class="field"><label for="s-approve">Approval</label><select id="s-approve"><option>Every message approved by a person</option><option>Approve the first 20, then send what scores all green</option></select></div>
    </div>
  </div>
</section>'''


def build(B):
    calls = load('calls.json')
    byid = {c['id']: c for c in calls}
    byid['eic'] = EIC
    fds = founders_data()
    for fd in fds:
        fd['_call'] = byid.get(fd['call'])
    picked = [fd for fd in fds if fd['picked']]
    picked.sort(key=lambda fd: (fd['_call']['closes'], -fd['checks'].count('g')))
    held = [fd for fd in fds if not fd['picked']]
    matched = {}
    for fd in picked:
        matched[fd['call']] = matched.get(fd['call'], 0) + 1
    shown_calls = [c for c in calls] + [EIC]
    shown_calls.sort(key=lambda c: c['closes'])
    counts = dict(today=len(picked), fit=186, calls=live_count([c['closes'] for c in shown_calls]), inbox=sum(1 for t in INBOX if t['intent'] in ('call', 'question')), guides=4)

    list_html = ''.join(lrow(B, fd, i) for i, fd in enumerate(picked))
    det_html = ''.join(detail(B, fd, i) for i, fd in enumerate(picked))
    tabs = ''.join(f'<button type="button" data-f="{f}" aria-pressed="{"true" if f == "all" else "false"}">{l}</button>'
                   for f, l in [('all', 'All'), ('ready', 'Ready'), ('ok', 'Approved'), ('skip', 'Skipped')])
    stages = [
        ('1,284', 'Fresh signals', 'New companies, hires, raises and guide readers', ''),
        ('186', 'Fit a call', 'Checked against every open Innovate UK call and the EIC', ''),
        (f'<span data-cap>{len(picked)}</span>', 'Picked for today', 'The best fits, nearest deadlines first', ' hl'),
        (str(len(picked)), 'Drafted', 'A first message each, in Simon&rsquo;s voice', ''),
        ('0', 'Approved', 'Goes out between 9.40am and 4.30pm', ''),
    ]
    st_html = ''.join(f'<div class="stage{c}"{" id=\"stage-sent\"" if k == 4 else ""}><span class="n">{n}</span><span class="l">{l}</span><span class="s">{s}</span></div>'
                      for k, (n, l, s, c) in enumerate(stages))
    today = f'''<section class="view" id="v-today" data-title="Today" aria-label="Today">
  <div class="run">
    <div class="run-h"><h2><span class="today-date">Tuesday 20 October</span>. {len(picked)} founders to reach.</h2><p>Every one fits a call that&rsquo;s open now, and every message is written for them. Read, edit, approve.</p></div>
    <div class="stages">{st_html}</div>
    <div class="capline">
      <label class="cap" for="cap">Daily number from tomorrow <input type="range" id="cap" min="30" max="50" step="1" value="{len(picked)}"> <output id="cap-o" for="cap">{len(picked)} a day</output></label>
      <span>Ready <b data-count="ready">{len(picked)}</b></span><span>Approved <b data-count="ok">0</b></span><span>Skipped <b data-count="skip">0</b></span>
      <span class="sp" style="flex:1"></span>
      <button type="button" class="btn pri sm" id="approve-all">Approve all ready</button>
    </div>
  </div>
  <div class="work">
    <div class="pane"><div class="pane-h"><h2>Today&rsquo;s founders</h2><span class="sp"></span><div class="tabs" id="today-tabs">{tabs}</div></div>
      <div style="padding:10px 12px 0"><label class="find" for="today-q">{B.ICON["search"]}<span class="sr">Search today&rsquo;s founders</span><input id="today-q" type="search" placeholder="Search founders, companies, calls"></label></div>
      <ul class="list" id="today-list" role="listbox" aria-label="Today&rsquo;s founders">{list_html}</ul></div>
    <div class="pane" id="today-det">{det_html}</div>
  </div>
</section>'''

    body = (today + founders_view(B, picked + held) + calls_view(B, shown_calls, matched) + inbox_view(B) + guides_view(calls)
            + results_view() + setup_view(B))
    css_v, dcss_v, js_v = B.ver('assets/site.css'), B.ver('assets/desk.css'), B.ver('assets/desk.js')
    html = f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Outreach desk | BidX</title>
<meta name="description" content="Founders who fit a grant call that's open now, a message written for each, and every reply routed to a free funding call.">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/hostgrotesk-normal-300-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/doto-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v={css_v}">
<link rel="stylesheet" href="/assets/desk.css?v={dcss_v}">
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="desk">
<a class="skip" href="#desk-main">Skip to the desk</a>
<div class="app">
{side(B, counts)}
<main class="main" id="desk-main">
  <header class="bar"><h1>Today</h1><span class="date mono"><span class="today-date">Tuesday 20 October</span></span><span class="sp"></span>
    <a class="btn sec sm" href="/">View bidx.ai</a></header>
  {body}
  <p class="foot-note">Founders, companies, replies and results on this desk are sample data. Calls, rules, amounts and deadlines are the funders&rsquo; own, taken from the Innovation Funding Service and the EIC on 20 October 2026.</p>
</main>
</div>
<div class="toast" role="status" aria-live="polite"></div>
<script src="/assets/desk.js?v={js_v}" defer></script>
</body>
</html>
'''
    return [('desk/index.html', html)]
