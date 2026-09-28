#!/usr/bin/env python3
"""Fetch a page that walls curl and our Chromium, by presenting a real browser's TLS fingerprint.

    python3 tools/fetch-walled.py https://dialogue.earth/ [out.html]

Why (2026-09-28). Cloudflare's "Just a moment" and similar checks look at the TLS handshake,
and plain curl and headless Chromium through our proxy both fail it. curl_cffi impersonates
Chrome's handshake. First run, dialogue.earth, walled for weeks, came back 200 with its full
newsroom, and therealolivecompany.co.uk too. diggecard.com still answered 403, so it's not a
key to everything. A 403 here is still our failure, never evidence about their site.

It reads HTML only, it doesn't run scripts, so it can't see cookies or trackers. For those use
tools/eu-view.py. Installs curl_cffi on first use (the container is fresh each session).
"""
import re
import subprocess
import sys

try:
    from curl_cffi import requests
except ImportError:
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "curl_cffi"], check=False)
    from curl_cffi import requests

CA = "/root/.ccr/ca-bundle.crt"


def fetch(url):
    last = None
    for imp in ("chrome", "safari", "firefox"):
        try:
            r = requests.get(url, impersonate=imp, timeout=40, verify=CA)
            last = (imp, r.status_code, r.text)
            walled = re.search(r"Just a moment|One moment|Checking your browser|cf-chl", r.text[:5000])
            if r.status_code < 400 and not walled:
                return last
        except Exception as e:
            last = (imp, "ERR " + str(e)[:80], "")
    return last


if __name__ == "__main__":
    imp, code, body = fetch(sys.argv[1])
    t = re.search(r"<title[^>]*>(.*?)</title>", body or "", re.S)
    print(f"{code}  as {imp}  {len(body or '')} bytes  title {t.group(1).strip()[:80] if t else None}")
    if len(sys.argv) > 2 and body:
        open(sys.argv[2], "w").write(body)
        print("wrote", sys.argv[2])
