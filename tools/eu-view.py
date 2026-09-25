#!/usr/bin/env python3
"""What a visitor INSIDE the EU gets, cookies and trackers, before any click. RULES.md 4A rule 13.

    python3 tools/eu-view.py https://example.com
    python3 tools/eu-view.py https://example.com --shopify
    python3 tools/eu-view.py https://example.com --ads example.com

Why it exists (2026-09-25). This container leaves from Columbus, Ohio. Consent tools switch
on by region, so from here a banner is hidden and trackers run, and every "trackers before
consent" finding made from here describes a US visitor. Four GDPR messages went out on
2026-09-21 on that basis and two of them were wrong.

The EU vantage is Webbkoll, run by the 5th of July Foundation in Sweden. It loads the page
in a real browser from Stockholm, clicks nothing, and lists every cookie and third party
request. Proof it is in the EU, both seen on 2026-09-25. Cloudflare answered it with a
cf-ray ending ARN (Stockholm Arlanda), and Google served it www.google.se.

Limits, say them in the gate.
- It is SWEDEN. A consent tool configured country by country (Shopify's banner is) can
  treat Sweden and Germany differently. --shopify reads the banner's own country list, so
  you know whether the lead's country is treated like Sweden or not.
- It does not screenshot, so it cannot say whether a banner is VISIBLE. It says what fired.
- Cloudflare challenges block it (burtonclinic.co.uk did). That is BLOCKED, never clean.

--shopify  asks the store's own Storefront API for its privacy banner settings, including
           regionVisibility, the countries the banner is shown in. Control 2026-09-25,
           allbirds.eu lists every EEA country and from Sweden sets only essential cookies,
           snorly.de lists only AT and from Sweden sets Meta, Taboola, Bing and Clarity.
--ads      asks Google's Ads Transparency Center which ads run on that domain, who the
           advertiser is and the first and last date each was shown.
"""

import argparse
import datetime
import html
import json
import re
import subprocess
import sys
import time
import urllib.parse

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0 Safari/537.36"
WK = "https://webbkoll.5july.net"


def curl(args, data=None):
    cmd = ["curl", "-sS", "-m", "60", "-A", UA] + args
    r = subprocess.run(cmd, capture_output=True, text=True, errors="replace")
    return r.stdout


def txt(x):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", x))).strip()


def webbkoll(url, jar):
    home = curl(["-c", jar, "-b", jar, WK + "/en/"])
    tok = re.search(r'name="_csrf_token" type="hidden" hidden value="([^"]+)"', home)
    if not tok:
        sys.exit("Webbkoll did not return its form, try again later")
    loc = curl(["-c", jar, "-b", jar, "-o", "/dev/null", "-w", "%{redirect_url}", "-X", "POST",
                "--data-urlencode", f"_csrf_token={tok.group(1)}", "--data-urlencode",
                f"url={url}", WK + "/en/check"])
    res = None
    for _ in range(40):
        time.sleep(5)
        r = curl(["-c", jar, "-b", jar, "-o", "/dev/null", "-w", "%{redirect_url}", loc])
        if "results" in r:
            res = r
            break
    if not res:
        sys.exit("Webbkoll never finished, UNKNOWN, not clean")
    return res, curl(["-c", jar, "-b", jar, res])


def report(page):
    err = re.search(r"Error: ([^<]+)", page)
    if err:
        print(f"  BLOCKED  {txt(err.group(1))}")
        print("  This is our reader failing, never evidence about their site.")
        return
    for pat in [r"Cookies:.*?</(?:li|div|p)>", r"Third-party requests:.*?unique hosts",
                r"Final URL:.*?</a>"]:
        m = re.search(pat, page, re.S)
        if m:
            print("  " + txt(m.group(0)))
    for t in re.findall(r'<table class="cookies data".*?</table>', page, re.S):
        for r in re.findall(r"<tr.*?</tr>", t, re.S)[1:]:
            c = [txt(x) for x in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", r, re.S)]
            print("    cookie   " + " | ".join(x[:40] for x in c[:2]))
    t = re.search(r'<table class="requests data".*?</table>', page, re.S)
    if t:
        hosts = []
        for r in re.findall(r"<tr.*?</tr>", t.group(0), re.S)[1:]:
            c = [txt(x) for x in re.findall(r"<td[^>]*>(.*?)</td>", r, re.S)]
            if c and c[0]:
                hosts.append(c[0].split()[0])
        print("    3rd party hosts  " + ", ".join(sorted(set(hosts))))


def shopify(url):
    page = curl(["-L", url])
    tok = re.search(r'id="shopify-features"[^>]*>[^<]*"accessToken":"([a-f0-9]+)"', page)
    if not tok:
        print("  no Shopify storefront token in the HTML, not Shopify or not exposed")
        return
    host = urllib.parse.urlparse(curl(["-L", "-o", "/dev/null", "-w", "%{url_effective}", url])).netloc
    q = {"query": "query($isPreviewMode: Boolean = true){ consentManagement { banner { enabled "
                  "regionVisibility @include(if: $isPreviewMode) } } }",
         "variables": {"isPreviewMode": True}}
    out = curl(["-X", "POST", f"https://{host}/api/unstable/graphql.json", "-H",
                "content-type: application/json", "-H",
                f"x-shopify-storefront-access-token: {tok.group(1)}", "-d", json.dumps(q)])
    print("  Shopify banner  " + out.strip()[:400])
    print("  regionVisibility is the list of countries the banner is shown in. A country")
    print("  missing from it gets NO banner and Shopify treats tracking as allowed.")


def ads(domain):
    req = {"2": 40, "3": {"12": {"1": domain, "2": True}}, "7": {"1": 1}}
    out = curl(["https://adstransparency.google.com/anji/_/rpc/SearchService/SearchCreatives?authuser=0",
                "-H", "content-type: application/x-www-form-urlencoded", "--data-urlencode",
                "f.req=" + json.dumps(req)])
    try:
        d = json.loads(out)
    except Exception:
        print("  Transparency Center did not answer JSON, UNKNOWN: " + out[:200])
        return
    rows = d.get("1", [])
    print(f"  Google ads on {domain}  {len(rows)}{' or more' if d.get('2') else ''}")
    day = lambda s: datetime.datetime.fromtimestamp(int(s), datetime.timezone.utc).date()
    for r in rows[:20]:
        print(f"    {r.get('12')}  first shown {day(r['6']['1'])}  last shown {day(r['7']['1'])}  {r.get('2')}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--shopify", action="store_true")
    ap.add_argument("--ads", metavar="DOMAIN")
    a = ap.parse_args()
    jar = f"/tmp/eu-view-{abs(hash(a.url))}.jar"
    print(f"== EU VIEW from Webbkoll, Stockholm, nothing clicked  {a.url}")
    res, page = webbkoll(a.url, jar)
    print(f"  results  {res}")
    report(page)
    if a.shopify:
        print("== SHOPIFY BANNER SETTINGS")
        shopify(a.url)
    if a.ads:
        print("== GOOGLE ADS TRANSPARENCY CENTER")
        ads(a.ads)
    print("\nNo screenshot here. Visible banner or not is still a render question.")


if __name__ == "__main__":
    main()
