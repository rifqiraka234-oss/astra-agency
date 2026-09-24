#!/usr/bin/env python3
"""Crawl a lead's whole site, for the research gate's two passes. RULES.md section 4B item 1.

    python3 tools/crawl.py https://example.com /tmp/claude-0/<slug>/pass1
    python3 tools/crawl.py https://example.com /tmp/claude-0/<slug>/pass2

It takes every URL from the sitemaps (skipping attachment, author and tag sitemaps, which
are image and archive pages, not content) and then follows links on the same host until
nothing new turns up, capped at --max. It writes crawl.json with the status, word count,
image count, forms, language, PDFs and full text of every page, and prints the count to
put in the gate. Run it twice, a pass 2 that reads fewer pages than pass 1 fails the gate.

It reads text. It does not look. Screenshots of every page type are still yours, with
tools/site-audit.js or tools/render-via-curl.js.
"""

import collections
import html
import json
import os
import re
import subprocess
import sys
import urllib.parse

SKIP_SITEMAP = re.compile(r"attachment|author|tag|coupon", re.I)
SKIP_URL = re.compile(r"\.(jpe?g|png|gif|webp|svg|ico|css|js|pdf|zip|mp4|webmanifest|xml)(\?|$)"
                      r"|/wp-json/|/feed/?$|/cart/?$|/checkout/?$|/my-account|add-to-cart=|"
                      r"\?(s|orderby|filter_|min_price|max_price|replytocom)=", re.I)


def get(url):
    r = subprocess.run(["curl", "-s", "--compressed", "-L", "-m", "30", "-A",
                        "Mozilla/5.0 (X11; Linux x86_64) Chrome/124 Safari/537.36",
                        "-w", "\n%{http_code}", url], capture_output=True, text=True,
                       errors="replace")
    body, _, code = r.stdout.rpartition("\n")
    return code, body


def sitemap_urls(root):
    seen, out, queue = set(), [], [root + "/sitemap.xml", root + "/sitemap_index.xml"]
    while queue:
        sm = queue.pop(0)
        if sm in seen or SKIP_SITEMAP.search(sm.rsplit("/", 1)[-1]):
            continue
        seen.add(sm)
        code, body = get(sm)
        if code != "200" or "<loc>" not in body:
            continue
        for loc in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body):
            loc = html.unescape(loc)
            (queue if loc.endswith(".xml") else out).append(loc)
    return list(dict.fromkeys(out))


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    start, outdir = sys.argv[1].rstrip("/"), sys.argv[2]
    cap = int(sys.argv[sys.argv.index("--max") + 1]) if "--max" in sys.argv else 400
    os.makedirs(outdir, exist_ok=True)
    host = urllib.parse.urlparse(start).netloc.replace("www.", "")
    queue = sitemap_urls(start) or []
    from_sitemap = len(queue)
    queue = [start + "/"] + queue
    seen, pages = set(), {}
    while queue and len(pages) < cap:
        u = queue.pop(0).split("#")[0]
        if u in seen or SKIP_URL.search(u):
            continue
        seen.add(u)
        code, body = get(u)
        m = re.search(r"<main.*?</main>", body, re.S)
        main_html = m.group(0) if m else body
        text = re.sub(r"<script.*?</script>|<style.*?</style>|<noscript.*?</noscript>", "",
                      body, flags=re.S)
        text = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", text))).strip()
        pages[u] = {
            "code": code,
            "title": html.unescape((re.search(r"<title[^>]*>(.*?)</title>", body, re.S) or
                                    re.search(r"()", "")).group(1)).strip(),
            "lang": (re.search(r'<html[^>]*\blang="([^"]+)"', body) or re.search(r"()", "")).group(1),
            "words": len(text.split()),
            "imgs_main": len(re.findall(r"<img\b", main_html)),
            "forms": len(re.findall(r"<form\b", body)),
            "pdfs": sorted(set(re.findall(r'href="([^"]+\.pdf)"', body))),
            "text": text,
        }
        for h in re.findall(r'href="([^"]+)"', body):
            h = urllib.parse.urljoin(u, html.unescape(h)).split("#")[0]
            if urllib.parse.urlparse(h).netloc.replace("www.", "") == host and h not in seen:
                queue.append(h)
    json.dump(pages, open(os.path.join(outdir, "crawl.json"), "w"), ensure_ascii=False)
    codes = collections.Counter(p["code"] for p in pages.values())
    print(f"{start}  {len(pages)} pages read, {from_sitemap} from sitemaps, statuses {dict(codes)}")
    print(f"languages {dict(collections.Counter(p['lang'] for p in pages.values()))}")
    if queue:
        print(f"!!  stopped at the cap of {cap} with {len(queue)} links still queued. Raise --max.")
    print(f"wrote {os.path.join(outdir, 'crawl.json')}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
