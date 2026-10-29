"""Fetch every URL in the two sitemaps, 4s apart, save raw HTML and visible text.

usage: python3 -I fetch_pages.py <hs_dir>
"""
import html
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse

HS = sys.argv[1]
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


def locs(path):
    return [html.unescape(x) for x in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", open(path).read())]


def slug_of(url):
    p = urllib.parse.urlparse(url).path.strip("/")
    if not p:
        return "home"
    return p.replace("product-page/", "product-").replace("/", "_")


def get(url, out):
    # percent-encode non ascii path parts
    parts = urllib.parse.urlsplit(url)
    path = urllib.parse.quote(parts.path, safe="/%")
    u = urllib.parse.urlunsplit((parts.scheme, parts.netloc, path, parts.query, ""))
    for attempt in range(4):
        r = subprocess.run(["curl", "-sS", "--compressed", "-L", "-m", "40", "-A", UA,
                            "-H", "Accept-Language: de-AT,de;q=0.9,en;q=0.8",
                            "-o", out, "-w", "%{http_code}|%{url_effective}|%{size_download}", u],
                           capture_output=True, text=True)
        code = r.stdout.split("|")[0]
        if code == "429" or code == "000" or code.startswith("5"):
            time.sleep(10 * (attempt + 1))
            continue
        return r.stdout
    return r.stdout


def visible_text(body):
    t = re.sub(r"(?is)<script.*?</script>|<style.*?</style>|<noscript.*?</noscript>|<svg.*?</svg>", " ", body)
    t = re.sub(r"(?i)<br\s*/?>|</p>|</h[1-6]>|</li>|</div>|</span>", "\n", t)
    t = re.sub(r"<[^>]+>", " ", t)
    t = html.unescape(t)
    lines = [re.sub(r"[ \t ]+", " ", l).strip() for l in t.split("\n")]
    out, prev = [], None
    for l in lines:
        if l and l != prev:
            out.append(l)
        prev = l
    return "\n".join(out)


def main():
    urls = locs(os.path.join(HS, "raw/pages-sitemap.xml")) + locs(os.path.join(HS, "raw/store-products-sitemap.xml"))
    results = {}
    for u in urls:
        s = slug_of(u)
        out = os.path.join(HS, "raw", s + ".html")
        meta = get(u, out)
        body = open(out, errors="replace").read() if os.path.exists(out) else ""
        title = re.search(r"<title[^>]*>(.*?)</title>", body, re.S)
        txt = visible_text(body)
        open(os.path.join(HS, "pages", s + ".txt"), "w").write(txt)
        results[u] = {"slug": s, "meta": meta, "title": html.unescape(title.group(1)).strip() if title else None,
                      "bytes": len(body), "text_chars": len(txt)}
        print(s, meta, results[u]["title"], len(txt), flush=True)
        time.sleep(4)
    json.dump(results, open(os.path.join(HS, "pages_index.json"), "w"), ensure_ascii=False, indent=1)


main()
