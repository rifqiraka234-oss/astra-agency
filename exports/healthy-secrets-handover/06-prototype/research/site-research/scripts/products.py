"""Parse the wix-warmup-data product object out of each saved product page.

usage: python3 -I products.py <hs_dir>
"""
import glob
import html
import json
import os
import re
import sys

HS = sys.argv[1]


def strip(h):
    if not h:
        return h
    t = re.sub(r"(?i)<br\s*/?>|</p>|</li>", "\n", h)
    t = re.sub(r"(?i)<li[^>]*>", "- ", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(t).replace(" ", " ")
    return "\n".join(l.strip() for l in t.split("\n") if l.strip())


def find_products(o, out):
    if isinstance(o, dict):
        if "urlPart" in o and isinstance(o.get("additionalInfo"), list):
            out.append(o)
        for v in o.values():
            find_products(v, out)
    elif isinstance(o, list):
        for v in o:
            find_products(v, out)


def big(url_part_media):
    # media id like aadec6_xxx~mv2.png -> original file URL (no transform)
    return "https://static.wixstatic.com/media/" + url_part_media


products = []
for f in sorted(glob.glob(os.path.join(HS, "raw/product-*.html"))):
    b = open(f, errors="replace").read()
    m = re.search(r'<script type="application/json" id="wix-warmup-data">(.*?)</script>', b, re.S)
    data = json.loads(m.group(1))
    found = []
    find_products(data, found)
    slug = os.path.basename(f)[len("product-"):-5]
    ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', b, re.S)
    ld = json.loads(ld.group(1)) if ld else {}
    page_url = ld.get("offers", {}).get("url")
    for p in found:
        rec = {
            "source_url": page_url,
            "status": "VERIFIED (parsed from the page's own wix-warmup-data and JSON-LD, fetched 2026-10-19)",
            "name_exact": p.get("name"),
            "urlPart": p.get("urlPart"),
            "price_eur": p.get("price"),
            "formattedPrice": p.get("formattedPrice"),
            "comparePrice": p.get("comparePrice"),
            "discount": p.get("discount"),
            "ribbon": p.get("ribbon"),
            "isInStock": p.get("isInStock"),
            "inventory": p.get("inventory", {}).get("status") if isinstance(p.get("inventory"), dict) else p.get("inventory"),
            "weight": p.get("weight"),
            "sku": p.get("sku"),
            "description_de": strip(p.get("description")),
            "info_sections": [{"title": s.get("title"), "text_de": strip(s.get("description"))}
                              for s in sorted(p.get("additionalInfo") or [], key=lambda s: s.get("index", 0))],
            "options": p.get("options"),
            "media": [{"id": mm.get("url"), "original_url": big(mm.get("url")), "width": mm.get("width"),
                       "height": mm.get("height"), "altText": mm.get("altText"), "title": mm.get("title")}
                      for mm in (p.get("media") or [])],
            "ld_json_image": [i.get("contentUrl") for i in ld.get("image", [])],
        }
        products.append(rec)
    print(slug, len(found))

json.dump(products, open(os.path.join(HS, "products.json"), "w"), ensure_ascii=False, indent=1)
for p in products:
    print("\n==", p["name_exact"], "|", p["formattedPrice"], "| ribbon", p["ribbon"], "| stock", p["isInStock"], p["inventory"])
    print("desc:", p["description_de"])
    for s in p["info_sections"]:
        print("  #", s["title"], "::", s["text_de"].replace("\n", " / "))
    print("  media:", [(m["id"], m["width"], m["height"], m["altText"]) for m in p["media"]])
