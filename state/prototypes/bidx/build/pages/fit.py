"""/fit/, the two minute fit check. Seven questions, the founder's own eight dots, the calls that fit and the booking."""
import json
from html import escape as esc

from .common import load_calls, STARTUP, SIZE, short_name, days_left

# What each call asks for, from its brief. need: partner type, funding route, minimum stage.
NEEDS = {
    2599: dict(partner='deployer', stage=3, field=['ai']), 2598: dict(partner='deployer', stage=3, field=['ai']),
    2597: dict(partner='deployer', stage=3, field=['ai']), 2584: dict(stage=2, field=['ai']), 2582: dict(stage=2, field=['ai']),
    2595: dict(money='investor', field=['battery']), 2580: dict(money='investor', field=['bio']),
    2571: dict(partner='consortium', field=['battery']), 2542: dict(partner='consortium', field=['bio']),
    2600: dict(stage=2, field=['climate']), 2602: dict(field=['materials', 'climate']),
    2583: dict(partner='overseas', field=['*']), 2526: dict(partner='overseas', field=['*']), 2586: dict(partner='overseas', field=['*']),
    2560: dict(partner='consortium', field=['health']),
}

Q = [
    ('uk', 'Where is your company registered?', [('uk', 'In the UK'), ('notyet', 'Not registered yet'), ('abroad', 'Outside the UK')]),
    ('size', 'How many people work there?', [('small', 'Under 50'), ('medium', '50 to 249'), ('large', '250 or more')]),
    ('field', 'What are you building?', [('ai', 'AI or software'), ('battery', 'Batteries or energy storage'), ('bio', 'Engineering biology'),
                                         ('climate', 'Climate tech or clean energy'), ('health', 'Health or medicines'), ('materials', 'Materials or manufacturing'), ('other', 'Something else')]),
    ('stage', 'How far along is it?', [('1', 'An idea'), ('2', 'A prototype'), ('3', 'A working product in use'), ('4', 'Selling it already')]),
    ('team', 'Who would do the technical work?', [('yes', 'Our own engineers or scientists'), ('some', 'One technical founder'), ('no', 'We’d hire or outsource it')]),
    ('money', 'How would you fund your share?', [('own', 'From our own revenue or cash'), ('investor', 'We’re raising, or talking to investors'), ('none', 'We haven’t worked that out')]),
    ('partner', 'Who would you work with?', [('none', 'Nobody yet'), ('deployer', 'A larger company that would use it'), ('consortium', 'A university or research centre'),
                                             ('overseas', 'A company in Germany, Singapore or Japan')]),
]


def build(B):
    calls = load_calls()
    data = []
    for c in calls:
        if c['id'] not in NEEDS or days_left(c['closes']) < 0:
            continue
        data.append(dict(id=c['id'], name=short_name(c), url=f'/calls/{c["slug"]}/', closes=c['closes'], size=SIZE[c['id']],
                         lead=c['lead'], **NEEDS[c['id']]))
    data.append(dict(id='eic', name='EIC Accelerator, grant only', url='/guides/smart-grants-closed/#not-listed', closes='2026-11-03T17:00:00+01:00',
                     size='Grant up to €2.5M, short proposals batched monthly', lead='sme', stage=3, field=['*']))
    qs = ''
    for k, (name, label, opts) in enumerate(Q):
        o = ''.join(f'<label class="opt"><input type="radio" name="{name}" value="{v}" required><span>{esc(t)}</span></label>' for v, t in opts)
        qs += f'<fieldset class="q" data-step="{k}"><legend><span class="qn">{k + 1} of {len(Q)}</span>{esc(label)}</legend><div class="opts">{o}</div></fieldset>'
    body = f'''<section class="ghero"><div class="wrap">
  <h1 class="h-l">Check your fit in two minutes.</h1>
  <p class="lede">Seven questions. You&rsquo;ll see your fit as eight dots, the calls open now that suit you, and whether it&rsquo;s worth a funding call.</p>
</div></section>
<section class="sec tight"><div class="wrap fitg">
  <form class="fitform" id="fit" novalidate aria-label="Fit check">
    <div class="prog" aria-hidden="true"><i></i></div>
    {qs}
    <p class="ferr" id="fit-err" role="alert" hidden>Pick an answer for every question to see your fit.</p>
    <div class="fnav"><button type="button" class="btn sec" id="fit-back" disabled>Back</button><button type="button" class="btn pri" id="fit-next">Next {B.ICON["ar"]}</button></div>
  </form>
  <aside class="fitside" aria-live="polite">
    <div class="fitcard">
      {B.glyph("nnnnnnnn", "huge", "Your fit, not checked yet")}
      <h2 class="h-s" id="fit-h">Your fit appears here</h2>
      <p id="fit-p">Each answer fills a dot, green where you fit, amber where it&rsquo;s worth a conversation, red where a rule stops you.</p>
      <ol class="fitkeys" id="fit-keys"></ol>
    </div>
  </aside>
</div></section>
<section class="sec tight" id="fit-res" hidden><div class="wrap">
  <h2 class="h-m" id="res-h">Calls that fit</h2>
  <ul class="clist" id="res-list"></ul>
  <p id="res-none" hidden>None of the calls open today fits on these answers. That doesn&rsquo;t mean nothing will. New calls open most weeks, and a funding call is the quickest way to find the route that does.</p>
  <div class="endcta"><h2>Talk it through, free</h2><p>Bring your answers to a funding strategy call. We&rsquo;ll show you which grants fit your business, where founders usually lose points, and whether your company is realistically fundable.</p>
    <div class="ctas" style="margin-top:20px"><a class="btn pri" href="{B.BOOK}">Book FREE funding call</a></div></div>
  <form class="calc" id="send" novalidate aria-label="Email me my matches" style="margin-top:28px">
    <h3>Or get these matches by email</h3>
    <div class="row"><label for="s-name">First name<input id="s-name" name="name" autocomplete="given-name" required></label>
    <label for="s-email">Work email<input id="s-email" name="email" type="email" autocomplete="email" required></label></div>
    <label class="tick" for="s-ok"><input type="checkbox" id="s-ok" required> <span>Email me my matches and when a new call fits. I can unsubscribe at any time.</span></label>
    <p class="warn" id="s-err" role="alert">Add your first name, a valid email and tick the box to get your matches.</p>
    <div><button class="btn pri" type="submit">Send my matches</button></div>
    <p class="note">We use this only to send your matches. See our <a href="{B.PRIVACY}">privacy policy</a>.</p>
    <p class="okmsg" id="s-ok-msg" role="status" hidden></p>
  </form>
</div></section>
<script id="fit-data" type="application/json">{json.dumps(data)}</script>'''
    return [('fit/index.html', B.page('Check your fit for a grant | BidX', 'Seven questions to see which Innovate UK calls open now fit your company.',
                                      '/fit/', body, cur='/fit/', scripts=('site.js', 'fit.js')))]
