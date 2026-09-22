#!/usr/bin/env python3
"""Flag AI-sounding phrasing in a draft. Usage: python3 slopcheck.py <file>"""
import re, sys
TELLS = {
 "balanced contrast":      r'\brather than\b|\binstead of\b|\bnot just \w+ but\b',
 "signposting":            r'\bOne (small )?thing\b|\bAlongside that\b|\bThat said\b|\bFirst things first\b|\bIn addition\b|\bFurthermore\b|\bMoreover\b',
 "borrowed warmth":        r"\bwe'd love to\b|\bhappy to\b|\breach out\b|\bdelighted\b|\bexcited to\b",
 "corporate cushioning":   r'\bWould you be open\b|\bI hope this finds\b|\bjust wanted to\b|\bat your earliest\b',
 "writerly flourish":      r'where it hurts most|that stayed with me|worth telling|speaks volumes|game.?chang',
 "cute hedging":           r'\ba little \w+|\ba bit \w+ly\b|\bsomewhat\b',
 "too-symmetrical pair":   r'\bWe \w+ them, you \w+ them\b|\bnot only\b.{0,40}\bbut also\b',
 "servile":                r'exactly as you (asked|requested)|precisely as|as per your',
 "consultant nouns":       r'\bleverage\b|\bseamless\b|\brobust\b|\bsynergy\b|\becosystem\b|\bjourney\b|\bsolution[s]?\b|\bdeliverables\b',
}
def check(path):
    t = open(path, encoding='utf-8').read()
    body = t.split('## Draft',1)[1].split('## ',1)[0] if '## Draft' in t else t
    hits = 0
    for name, pat in TELLS.items():
        found = [m.group(0) for m in re.finditer(pat, body, re.I)]
        if found:
            hits += len(found); print(f"  HIT  {name}: {found}")
    paras = [p for p in body.strip().split('\n\n') if p.strip()]
    lens = [len(p.split()) for p in paras]
    sents = [len(s.split()) for s in re.split(r'(?<=[.!?])\s+', body) if s.strip()]
    print(f"\n  total flags: {hits}")
    print(f"  paragraphs: {lens}")
    print(f"  sentence range: {min(sents)}-{max(sents)} words (want a wide spread)")
    if hits == 0: print("\n  clean")
if __name__ == '__main__':
    check(sys.argv[1] if len(sys.argv) > 1 else 'tomatoworld/outreach/03-email-sending-v2-offer.md')
