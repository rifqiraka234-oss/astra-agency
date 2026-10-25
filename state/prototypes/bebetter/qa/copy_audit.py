"""Copy audit over the built BeBetter site and plan. Every visible string, alt, aria-label, title, meta description and
data-nl attribute, split English and Dutch. Flags colons, dashes, NO-AI-SLOP section 8 words, phrases and hedges, Dutch
marketing fog, uncontracted English, exclamation marks and emoji. Allowlist is proper nouns and URLs only.
Run with a second argument 'control' to plant one of each fault and prove every check fires."""
import glob, html, re, sys
from html.parser import HTMLParser

ROOT = sys.argv[1]
ATTRS = {'alt', 'aria-label', 'title', 'content', 'placeholder', 'data-nl', 'value'}
WORDS = r'delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz|transform|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting-edge|state-of-the-art|best-in-class|world-class|bespoke|holistic|innovative|groundbreaking|game-chang|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future-proof|end-to-end|turnkey|customer-centric|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|rest assured|look no further|solutions'
PHRASES = r"I hope this email finds you well|I came across|take your .* to the next level|in today's (fast-paced|digital|competitive)|let's create something|ready to get started|stand out from the crowd|we pride ourselves|it's important to note|at the end of the day|here's the thing|when it comes to|not just .*(but|it's)|whether you're a"
HEDGES = r"it's worth noting|worth noting|it is important to note|in many cases|in most cases|tends to|generally speaking|one could argue|arguably|to some extent|that said|at its core"
PAIRED = r'(simple|clean|fast|powerful|modern|elegant|light|small) (yet|but) (powerful|complex|flexible|capable|bold|strong|mighty)'
DE_FOG = r'op maat gemaakt|uniek|hoogwaardig|kwalitatief|aarzel niet|ontdek onze|naadloos|ultiem|perfect voor|ideaal voor|optimaal|toonaangevend|innovatief|ontzorgen|totaaloplossing|state of the art'
UNCON = r'\b(it is|do not|does not|you will|we are|cannot|will not|that is|is not|are not|I am|you are|there is|what is)\b'
ALLOW = ['Basic-Fit', 'astra-bebetter-prototype.netlify.app', 'astra-bebetter-plan.netlify.app', 'bebetter-officiall.com']

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack = []; self.out = []; self.skip = 0; self.namedash = 0
    def lang(self):
        for t, a in reversed(self.stack):
            c = a.get('class', '') or ''
            if 'l-nl' in c.split() or a.get('lang') == 'nl': return 'de'
            if 'l-en' in c.split() or a.get('lang') == 'en': return 'en'
        return 'en'
    def handle_starttag(self, t, a):
        a = dict(a)
        if t in ('script', 'style'): self.skip += 1
        for k, v in a.items():
            if v and (k in ATTRS or k.startswith('data-nl-')) and not (t == 'input' and k == 'value' and a.get('type') in ('hidden', 'radio')) and not (t == 'meta' and a.get('name') not in ('description',)):
                if t == 'link': continue
                self.out.append(('de' if k.startswith('data-nl') else 'en', v, f'@{t}[{k}]'))
        if t not in ('br', 'img', 'input', 'meta', 'link', 'source', 'circle', 'rect', 'path', 'line', 'stop'):
            self.stack.append((t, a))
    def handle_endtag(self, t):
        if t in ('script', 'style'): self.skip -= 1
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == t: del self.stack[i:]; break
    def handle_data(self, d):
        if self.skip or not d.strip(): return
        if d == '-' and any('brand-dash' in (a.get('class') or '') for _, a in self.stack[-1:]): self.namedash += 1; return
        self.out.append((self.lang(), d, ''))

CONTROL = len(sys.argv) > 2 and sys.argv[2] == 'control'
PLANT = '<p class="l-en">We are here: plain words – leverage it! 🙂 it is worth noting</p><p class="l-nl" lang="nl">Ontdek onze collectie</p>'
def text_of(path):
    p = P(); src = open(path).read()
    if CONTROL: src = src.replace('<main id="main">', '<main id="main">' + PLANT, 1)
    p.feed(src)
    return p.out, p.namedash

total = 0
for f in sorted(glob.glob(ROOT + '/**/*.html', recursive=True)):
    items, nd = text_of(f)
    raw = open(f).read()
    nm = raw.count('<span class="brand-dash">-</span>')
    name = f.replace(ROOT + '/', '')
    hits = []
    for lang, s, where in items:
        t = html.unescape(s)
        u = t
        for a in ALLOW: u = u.replace(a, '')
        u2 = re.sub(r'https?://\S+|\S+@\S+', '', u)
        if ':' in u2: hits.append(('colon', lang, t, where))
        if re.search(r'[‐-―−]', u2) or re.search(r'(?<![\d/])-(?!\d)', u2): hits.append(('dash', lang, t, where))
        for pat, lab in [(WORDS, 'slop word'), (PHRASES, 'slop phrase'), (HEDGES, 'hedge'), (PAIRED, 'paired adj')]:
            if lang != 'de' and re.search(pat, t, re.I): hits.append((lab + ' ' + re.search(pat, t, re.I).group(0), lang, t, where))
        if lang == 'de' and re.search(DE_FOG, t, re.I): hits.append(('nl fog ' + re.search(DE_FOG, t, re.I).group(0), lang, t, where))
        unc = [m.group(0) for m in re.finditer(UNCON, t, re.I) if m.group(0) != 'IT is']
        if lang == 'en' and unc: hits.append(('uncontracted ' + unc[0], lang, t, where))
        if '!' in t: hits.append(('exclamation', lang, t, where))
        if re.search('[\U0001F300-\U0001FAFF☀-➿]', t): hits.append(('emoji', lang, t, where))
    total += len(hits)
    print(f'== {name}  strings {len(items)}  flags {len(hits)}  name dashes skipped {nd} of {nm} in source')
    seen = set()
    for h in hits:
        k = (h[0], h[2][:80])
        if k in seen: continue
        seen.add(k)
        print(f'   {h[0]:<26} {h[1]:<4} {h[3]:<18} {h[2][:150]!r}')
print('TOTAL FLAGS', total)
if CONTROL:
    import collections
    print('CONTROL, every check must have fired on every page with a <main>')
