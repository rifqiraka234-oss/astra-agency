#!/usr/bin/env python3
"""Copy audit over the built site. Visible text, alt, aria-label, title and meta description.
Legal quotes (q.law) and URLs are exempt from the dash and colon bans. Usage: copy_audit.py <site dir>"""
import sys, re, glob, os
from html.parser import HTMLParser

WORDS = r"delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz|transform|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting-edge|state-of-the-art|best-in-class|world-class|bespoke|holistic|innovative|groundbreaking|game-chang|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future-proof|end-to-end|turnkey|customer-centric|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|rest assured|look no further|solutions|journey"
PHRASES = r"I hope this email finds you well|I came across|to the next level|in today's (fast-paced|digital|competitive)|let's create something|ready to get started|stand out from the crowd|we pride ourselves|it's important to note|at the end of the day|here's the thing|when it comes to|not just .*(but|it's)|whether you're a"
HEDGES = r"it's worth noting|worth noting|it is important to note|in many cases|in most cases|tends to|generally speaking|one could argue|arguably|to some extent|that said|at its core"
UNCONTR = r"\b(it is|do not|does not|you will|we are|cannot|will not|that is|is not|are not|does not|did not|would not|could not|should not|I am|you are|they are|there is|what is|who is|has not|have not|had not)\b"

class P(HTMLParser):
    def __init__(s): super().__init__(); s.out = []; s.skip = 0; s.law = 0; s.stack = []; s.attrs = []
    def handle_starttag(s, t, a):
        a = dict(a); s.stack.append((t, a))
        if t in ('script', 'style'): s.skip += 1
        if t == 'q' and 'law' in (a.get('class') or ''): s.law += 1
        for k in ('alt', 'aria-label', 'title'):
            if a.get(k) and not s.law: s.attrs.append((k, a[k]))
        if t == 'meta' and a.get('name') == 'description': s.attrs.append(('desc', a.get('content', '')))
        if t == 'a' and a.get('href') is not None and False: pass
    def handle_endtag(s, t):
        if s.stack:
            tt, a = s.stack.pop()
            if tt in ('script', 'style'): s.skip -= 1
            if tt == 'q' and 'law' in (a.get('class') or ''): s.law -= 1
    def handle_data(s, d):
        if s.skip: return
        if s.law: return
        s.out.append(d)

def clean(t):
    t = t.replace('Claims Handling Solutions', 'Claims Handling Firm').replace('disembark', 'leave')
    t = re.sub(r'\bjourneys?\b', 'trip', t)  # defined term in Art. 2(v) and the client's own wording
    t = re.sub(r'https?://\S+', ' ', t)
    t = re.sub(r'\b[\w.\-]+\.(eu|de|com|org|net)\b(/\S*)?', ' ', t)
    return t

def main(d):
    bad = 0
    for f in sorted(glob.glob(os.path.join(d, '*.html'))):
        p = P(); p.feed(open(f, encoding='utf-8').read())
        text = clean(' '.join(p.out)); text = re.sub(r'\s+', ' ', text)
        attrs = ' | '.join(clean(v) for _, v in p.attrs)
        allt = text + ' | ' + attrs
        issues = []
        for name, rx, flags in (('word', WORDS, re.I), ('phrase', PHRASES, re.I), ('hedge', HEDGES, re.I), ('uncontracted', UNCONTR, 0)):
            for m in re.finditer(rx, allt, flags): issues.append((name, allt[max(0, m.start() - 40):m.end() + 40]))
        for m in re.finditer(r'[—–]', allt): issues.append(('dash', allt[max(0, m.start() - 40):m.end() + 40]))
        for m in re.finditer(r'(?<=\w)-(?=\w)', allt): issues.append(('hyphen', allt[max(0, m.start() - 30):m.end() + 30]))
        for m in re.finditer(r':', allt): issues.append(('colon', allt[max(0, m.start() - 40):m.end() + 40]))
        for m in re.finditer(r'!', allt): issues.append(('exclaim', allt[max(0, m.start() - 40):m.end() + 40]))
        for m in re.finditer(r'[\U0001F300-\U0001FAFF☀-➿]', allt): issues.append(('emoji', allt[max(0, m.start() - 20):m.end() + 20]))
        print(f'== {os.path.basename(f)}  words={len(text.split())}  issues={len(issues)}')
        for k, c in issues: print(f'   [{k}] ...{c}...')
        bad += len(issues)
    print('TOTAL', bad)
    return bad

if __name__ == '__main__': sys.exit(1 if main(sys.argv[1]) else 0)
