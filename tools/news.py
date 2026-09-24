#!/usr/bin/env python3
"""Google News for a lead, the three mandatory searches in one run. RULES.md section 4B.

    python3 tools/news.py --company "SBZ Leiderdorp" --person "Wessel van Noort" \
        --region "Leiderdorp OR Zuid-Holland" --industry "koelcellen OR sandwichpanelen" --lang nl

It prints every result with its date and link, newest first, for four searches, the
company, the person, the region's news for their industry, and the industry itself. Paste
the lines you used into the drafts file's research gate.

A control query runs first in the same language. An empty result only counts as "no news"
when the control came back full in the same minute, otherwise our fetch failed.
"""

import argparse
import html
import re
import subprocess
import sys
import urllib.parse
from email.utils import parsedate_to_datetime

EDITIONS = {"nl": ("nl", "NL", "NL:nl"), "de": ("de", "DE", "DE:de"),
            "en": ("en-GB", "GB", "GB:en"), "fr": ("fr", "FR", "FR:fr"),
            "it": ("it", "IT", "IT:it"), "es": ("es", "ES", "ES:es")}
CONTROL = {"nl": "Heineken", "de": "Volkswagen", "en": "Tesco", "fr": "Carrefour",
           "it": "Fiat", "es": "Telefonica"}


def search(q, lang):
    hl, gl, ceid = EDITIONS[lang]
    url = ("https://news.google.com/rss/search?q=" + urllib.parse.quote(q)
           + f"&hl={hl}&gl={gl}&ceid={ceid}")
    r = subprocess.run(["curl", "-s", "--compressed", "-L", "-w", "\n%{http_code}", url],
                       capture_output=True, text=True, timeout=40)
    body, code = r.stdout.rsplit("\n", 1)
    items = []
    for it in re.findall(r"<item>(.*?)</item>", body, re.S):
        t = re.search(r"<title>(.*?)</title>", it, re.S)
        d = re.search(r"<pubDate>(.*?)</pubDate>", it)
        l = re.search(r"<link>(.*?)</link>", it)
        try:
            when = parsedate_to_datetime(d.group(1)) if d else None
        except Exception:
            when = None
        items.append((when, html.unescape(t.group(1)) if t else "", l.group(1) if l else ""))
    items.sort(key=lambda x: (x[0] is None, -(x[0].timestamp() if x[0] else 0)))
    return code, items


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--company", required=True)
    ap.add_argument("--person", required=True)
    ap.add_argument("--region", required=True)
    ap.add_argument("--industry", required=True)
    ap.add_argument("--lang", default="en", choices=sorted(EDITIONS))
    ap.add_argument("--limit", type=int, default=12)
    a = ap.parse_args()

    code, ctrl = search(CONTROL[a.lang], a.lang)
    print(f"CONTROL  '{CONTROL[a.lang]}'  HTTP {code}, {len(ctrl)} results")
    if not ctrl:
        print("!!  The control came back empty. Every empty result below is OUR failure, not")
        print("!!  an absence of news. Retry, and do not write 'no news' off this run.")
    queries = [("GOOGLE NEWS, company", f'"{a.company}"' if " " in a.company and '"' not in a.company and " OR " not in a.company else a.company),
               ("GOOGLE NEWS, person", f'"{a.person}"'),
               ("REGIONAL NEWS, their industry in their region", f"({a.region}) ({a.industry})"),
               ("INDUSTRY NEWS", a.industry)]
    for label, q in queries:
        code, items = search(q, a.lang)
        print(f"\n== {label}  q={q}  HTTP {code}, {len(items)} results")
        for when, title, link in items[:a.limit]:
            print(f"  {when.date() if when else '????-??-??'}  {title}\n      {link}")
    return 0 if ctrl else 1


if __name__ == "__main__":
    sys.exit(main())
