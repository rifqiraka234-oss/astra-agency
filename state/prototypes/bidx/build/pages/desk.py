"""The BidX outreach desk at /desk/. One page, seven views, everything rendered here so it reads without JavaScript."""
import json
import os
from html import escape as esc

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
        return json.load(f)


def days_left(close_iso, today='2026-10-20'):
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
