"""Shared data and pieces for the public bidx.ai pages."""
import datetime as dt
import json
import os
import re
from html import escape as esc

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TODAY = dt.date(2026, 10, 21)


def clean(t):
    """House style on the funder's own text, punctuation only. No colons or dashes on the page, words unchanged."""
    if not isinstance(t, str):
        return t
    t = re.sub(r'(\d{4}) - (\d{4})', r'\1 to \2', t)
    t = re.sub(r'\b(\d{1,2}):00\s?(am|pm)', r'\1\2', t)
    t = re.sub(r'\b(\d{1,2}):(\d{2})\s?(am|pm)', r'\1.\2\3', t)
    t = t.replace(' \u2013 ', ', ').replace(' \u2014 ', ', ').replace('\u2013', ' to ').replace('\u2014', ', ')
    t = re.sub(r'(?<=\w)-(?=\w)', ' ', t)
    t = re.sub(r':\s*$', '', t, flags=re.M)
    t = re.sub(r'^(\w+): ', r'\1. ', t, flags=re.M)
    t = re.sub(r'(?<![\d]):(?!\d)', ',', t)
    return t


def clean_call(c):
    out = dict(c)
    for k in ('summary', 'who', 'odds', 'closes_text', 'opens_text', 'type'):
        out[k] = clean(c[k])
    out['name'] = clean(c['name'].replace(': ', ', '))
    for k in ('size', 'pot', 'duration', 'rates', 'assess'):
        out[k] = [clean(x) for x in c[k]]
    return out


def load_calls():
    with open(os.path.join(HERE, 'data', 'calls.json'), encoding='utf-8') as f:
        return [clean_call(c) for c in json.load(f)]


def days_left(iso):
    return (dt.date.fromisoformat(iso[:10]) - TODAY).days


def fdate(iso, year=False):
    d = dt.date.fromisoformat(iso[:10])
    return f'{d.strftime("%A")} {d.day} {d.strftime("%B")}' + (f' {d.year}' if year else '')


def sdate(iso):
    d = dt.date.fromisoformat(iso[:10])
    return f'{d.day} {d.strftime("%B")}'


def odds(c):
    if c.get('odds'):
        m = re.search(r'(\d+)%', c['odds'])
        return int(m.group(1)) if m else None
    return None


# Plain one line sizes, each from the call's own brief (data/calls.json, field size).
SIZE = {
    2599: 'Grant £100K to £200K, with a larger organisation deploying it',
    2598: 'Grant £100K to £200K, with a larger organisation deploying it',
    2597: 'Grant £100K to £200K, with a larger organisation deploying it',
    2584: 'Project costs £150K to £250K, one to three months',
    2582: 'Project costs £50K to £150K, one to three months',
    2595: 'Project costs £50K to £2M, with an investor partner',
    2580: 'Grant £250K to £2M, with an investor partner',
    2571: 'Grant £70K to £500K, a consortium with an SME',
    2572: 'Grant £500K to £4M, a consortium with an SME',
    2542: 'Project costs £750K to £2.5M, a consortium',
    2546: 'Project costs £200K to £750K',
    2600: 'Support worth up to £315K, climate tech',
    2583: 'Grant £100K to £350K, with a German SME',
    2526: 'Grant £100K to £900K, with a Singapore business',
    2586: 'Grant up to £600K, with a Japanese SME',
    2602: 'Grant £50K for six months, plus support',
    2560: 'Grant £500K to £1M, a consortium',
    2527: 'Project costs £1.5M to £4M, a consortium',
    2569: 'Grant £500K to £1M, a consortium',
    2541: 'Grant £2.5M to £20M',
    2499: 'Grant £100K to £3M, a fellowship',
    2605: 'Led by a university, RTO or Catapult',
    2596: 'Project costs £50K to £200K, farms in England',
    2591: 'A £2,500 grant, farms in England',
    2588: 'Grant £3.8M to £4M, one hub',
    2579: 'Grant £50K to £250K, public research bodies',
    2550: 'Up to £200K, energy networks only',
    2552: 'Up to £200K, energy networks only',
    2570: 'Contracts £40K to £80K',
    2587: 'Contracts £20K to £50K',
    2573: 'Contracts £200K to £500K',
}

LEAD = {'sme': 'SMEs', 'business': 'Businesses', 'academic': 'Universities and RTOs', 'farm': 'Farms in England',
        'network': 'Energy networks', 'public': 'Public research bodies', 'any': 'Any organisation'}

THEME = {'ai': 'AI', 'battery': 'Batteries', 'bio': 'Engineering biology', 'health': 'Health', 'climate': 'Climate tech',
         'materials': 'Materials', 'agri': 'Farming', 'energy': 'Energy networks', 'defence': 'Defence and security',
         'transport': 'Automotive', 'any': 'Any sector'}

# Calls a startup or SME can lead, the board's default.
STARTUP = {2599, 2598, 2597, 2584, 2582, 2595, 2580, 2571, 2600, 2583, 2602, 2526, 2586, 2542, 2560}


def live_count(dates):
    """A count of calls still open. Built with today's number, and site.js recounts on the visitor's clock so a call that closes drops out."""
    n = sum(1 for d in dates if days_left(d) >= 0)
    return f'<span data-live-count="{",".join(dates)}">{n}</span>'


def short_name(c):
    n = c['name']
    n = n.replace('BridgeAI Deployment Catalyst, ', 'BridgeAI, ')
    n = n.replace('Collaborative R&D', 'R&D').replace('Programme Entry Expression of Interest', 'expression of interest')
    return n


def board(calls, n=6, title='Open now for startups'):
    live = [c for c in calls if c['id'] in STARTUP and days_left(c['closes']) >= 0]
    live.sort(key=lambda c: c['closes'])
    rows = ''
    for c in live[:n]:
        d = days_left(c['closes'])
        o = odds(c)
        meta = f'{LEAD[c["lead"]]} · {esc(SIZE[c["id"]])}' + (f' · {o}% odds' if o else '')
        cls = ' now' if d <= 7 else (' soon' if d <= 21 else '')
        rows += (f'<a class="brow{cls}" href="/calls/{c["slug"]}/" data-close="{c["closes"]}"><span><span class="t">{esc(short_name(c))}</span>'
                 f'<span class="m">{meta}</span></span><span class="d"><span class="dotf dl-n">{d:02d}</span>'
                 f'<span class="u dl-u">days left</span></span></a>')
    return f'''<div class="board" aria-label="{esc(title)}">
  <div class="board-h"><span class="live">{esc(title)}</span><span>Innovation Funding Service</span></div>
  {rows}
  <div class="board-f"><span>{live_count([c["closes"] for c in calls])} Innovate UK calls open today</span><a href="/calls/">See every call</a></div>
</div>'''
