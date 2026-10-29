"""Search every saved page for café terms, in visible text and in raw HTML, separating
hits that sit inside the Instagram feed widget data. Prints a positive control per page.

usage: python3 -I cafe_check.py <hs_dir>
"""
import glob
import json
import os
import re
import sys

HS = sys.argv[1]
TERMS = ["Gut Health Club", "Wildpretmarkt", "Café", "Cafe", "Eröffnung", "Öffnungszeiten"]
CONTROL = ["Healthy Secrets", "Impressum"]
rows = []
for f in sorted(glob.glob(os.path.join(HS, "raw/*.html"))):
    slug = os.path.basename(f)[:-5]
    if slug in ("sitemap", "pages-sitemap", "store-products-sitemap"):
        continue
    raw = open(f, errors="replace").read()
    txt = open(os.path.join(HS, "pages", slug + ".txt"), errors="replace").read()
    # cut the Instagram widget data out of the raw HTML: the warmup JSON ssrPropsUpdates items,
    # plus the rendered feed markup (cdninstagram images with caption alts)
    m = re.search(r'<script type="application/json" id="wix-warmup-data">(.*?)</script>', raw, re.S)
    ig_caps = []
    if m:
        try:
            d = json.loads(m.group(1))
            for u in d.get("platform", {}).get("ssrPropsUpdates", []):
                for v in u.values():
                    if isinstance(v, dict) and "wixSDKItems" in v:
                        ig_caps += [it.get("description") or "" for it in v["wixSDKItems"]]
        except Exception:
            pass
    raw_wo = raw
    if m:
        raw_wo = raw.replace(m.group(1), "")
    for c in set(ig_caps):
        if c:
            # captions also appear as alt text in the rendered feed
            raw_wo = raw_wo.replace(c, "")
            for esc in (c.replace("&", "&amp;").replace('"', "&quot;").replace("\n", "&#10;"),
                        c.replace("&", "&amp;").replace('"', "&quot;"), json.dumps(c)[1:-1]):
                raw_wo = raw_wo.replace(esc, "")
    r = {"page": slug, "ig_captions_on_page": len(ig_caps)}
    for t in TERMS:
        r["vis:" + t] = len(re.findall(re.escape(t), txt, re.I if t in ("Cafe",) else 0))
        r["raw_non_ig:" + t] = len(re.findall(re.escape(t), raw_wo))
        r["ig:" + t] = sum(len(re.findall(re.escape(t), c)) for c in ig_caps)
    for c in CONTROL:
        r["control_vis:" + c] = txt.count(c)
    rows.append(r)

json.dump(rows, open(os.path.join(HS, "cafe_check_ssr.json"), "w"), ensure_ascii=False, indent=1)
print(f"{'page':40s} " + " ".join(f"{t[:10]:>10s}" for t in TERMS) + "  | ctl HS/Imp | ig caps")
for r in rows:
    vis = " ".join(f"{r['vis:'+t]:>4d}/{r['raw_non_ig:'+t]:<5d}" for t in TERMS)
    print(f"{r['page']:40s} {vis}  | {r['control_vis:Healthy Secrets']}/{r['control_vis:Impressum']} | {r['ig_captions_on_page']}")
print("\ncells are visible_text_hits/raw_html_hits_outside_instagram_data")
tot_ig = {t: sum(r["ig:" + t] for r in rows) for t in TERMS}
print("hits inside Instagram feed captions (all pages):", tot_ig)
