#!/usr/bin/env python3
"""
verify_portraits.py — prove that every named person on a prototype is shown
with a photograph that is actually them.

Why this exists
---------------
Raka, 2026-08-18: "I just dont want to put someone's picture and the picture is
actually not them. The picture and the person mentioned should be the same, as
a rule."

Putting a real person's face beside the wrong name is one of the few mistakes
on a prototype that is both instantly noticeable to the client and genuinely
disrespectful to the person pictured. It cannot be caught by looking, because
a plausible face beside a plausible name looks correct to someone who has
never met either of them.

The two failure modes this catches
----------------------------------
1. **Off-by-one adjacency.** Scraping a team page as a flat token stream and
   pairing "the name that follows this image" silently shifts the whole grid
   by one if any card carries an extra element. Containment (name and image
   inside the SAME card element) cannot shift.
2. **Right person, wrong file at build time.** The pairing is researched
   correctly and then the wrong asset key is wired into the template. Only a
   byte comparison between what is embedded in the built page and what the
   client actually publishes catches that.

Usage
-----
    python3 tools/verify_portraits.py \
        --page   state/prototypes/<company>/index.html \
        --source /path/to/scraped/about.html \
        --assets /path/to/downloaded/images/

Exits non-zero on any mismatch, so it can gate a build.

It reports UNPAIRED for any person on the page it could not tie back to the
client's own source. Unpaired is a failure, not a pass: an unverifiable
portrait must be removed or replaced with a designed treatment, never shipped
on the assumption that it is probably right.
"""

import argparse
import base64
import hashlib
import html as htmllib
import io
import os
import re
import sys

try:
    from PIL import Image
except ImportError:
    Image = None


# Zero-width and formatting characters routinely appear inside names on CMS
# built pages (Framer, Webflow, Squarespace all emit them). They are invisible
# to a human reading the page and they silently break a literal string match,
# which would make a correctly paired portrait fail verification. Strip them
# from both sides before comparing.
INVISIBLE = re.compile(r"[\u200b-\u200f\u2028\u2029\u202a-\u202e\u2060-\u2064\ufeff\u00ad]")


def strip_invisible(x):
    return INVISIBLE.sub("", x)


def clean(x):
    return re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", " ", strip_invisible(x)))).strip()


def enclosing_card(doc, idx, img_pattern):
    """Walk outward from a name to the nearest enclosing element that holds an
    image. Returns (card_html, [image_urls]) or (None, [])."""
    j = idx
    while j > 0:
        j = doc.rfind("<div", 0, j)
        if j == -1:
            return None, []
        seg = doc[j:idx]
        if len(re.findall(r"<div\b", seg)) <= len(re.findall(r"</div>", seg)):
            continue
        # found a container that opens before the name and has not closed
        k, depth = idx, 1
        while depth > 0 and k < len(doc):
            nxt_o, nxt_c = doc.find("<div", k), doc.find("</div>", k)
            if nxt_c == -1:
                break
            if nxt_o != -1 and nxt_o < nxt_c:
                depth += 1
                k = nxt_o + 4
            else:
                depth -= 1
                k = nxt_c + 6
        card = doc[j:k]
        imgs = [u for u in re.findall(r'<img[^>]+src="([^"]+)"', card)
                if re.search(img_pattern, u)]
        if imgs:
            return card, imgs
    return None, []


def reencode_fingerprint(path, width, quality):
    """Re-encode a source image the way the build pipeline does, then hash it."""
    im = Image.open(path)
    if im.mode in ("P", "RGBA", "LA"):
        im = im.convert("RGBA")
    bg = Image.new("RGB", im.size, (255, 255, 255))
    if im.mode == "RGBA":
        bg.paste(im, mask=im.split()[3])
    else:
        bg.paste(im.convert("RGB"))
    im = bg
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    return hashlib.sha256(buf.getvalue()).hexdigest()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--page", required=True, help="built prototype HTML")
    ap.add_argument("--source", required=True, help="client's own team/about page HTML")
    ap.add_argument("--assets", required=True, help="directory of images downloaded from the client")
    ap.add_argument("--figure-class", default="person")
    ap.add_argument("--img-pattern", default=r"framerusercontent|/images?/|\.(png|jpe?g|webp)")
    ap.add_argument("--width", type=int, default=520, help="width the build resized portraits to")
    ap.add_argument("--quality", type=int, default=86)
    args = ap.parse_args()

    if Image is None:
        sys.exit("Pillow is required: pip install pillow")

    page = open(args.page, encoding="utf-8", errors="ignore").read()
    src = strip_invisible(open(args.source, encoding="utf-8", errors="ignore").read())

    figs = re.findall(
        r'<figure class="%s">(.*?)</figure>' % re.escape(args.figure_class), page, re.S)
    if not figs:
        sys.exit(f'No <figure class="{args.figure_class}"> blocks found in {args.page}')

    print(f"Verifying {len(figs)} named portraits in {os.path.basename(args.page)}\n")

    failures = []
    for f in figs:
        nm = re.search(r"<h3>([^<]+)</h3>", f)
        b64 = re.search(r"data:image/(?:jpeg|png);base64,([A-Za-z0-9+/=]+)", f)
        alt = re.search(r'alt="([^"]*)"', f)
        if not (nm and b64):
            failures.append("a person figure is missing a name or an embedded image")
            continue

        name = clean(nm.group(1))
        page_hash = hashlib.sha256(base64.b64decode(b64.group(1))).hexdigest()

        # Match on the surname, which survives titles, honorifics and suffixes.
        surname = re.sub(r"[^A-Za-zÀ-ÿ\-]", "", strip_invisible(name).split(",")[0].split()[-1])
        hits = [m.start() for m in re.finditer(re.escape(surname), src)]
        if not hits:
            failures.append(f"{name}: surname '{surname}' not found on the client's own page (UNPAIRED)")
            print(f"FAIL  {name}\n      surname not present in client source\n")
            continue

        card, imgs = enclosing_card(src, hits[0], args.img_pattern)
        if not imgs:
            failures.append(f"{name}: no image found inside their card on the client's page (UNPAIRED)")
            print(f"FAIL  {name}\n      no image inside enclosing card\n")
            continue
        if len(imgs) > 1:
            failures.append(f"{name}: {len(imgs)} images inside one card, pairing is ambiguous")
            print(f"FAIL  {name}\n      ambiguous: {len(imgs)} images in card\n")
            continue

        fn = os.path.basename(imgs[0].split("?")[0])
        local = os.path.join(args.assets, fn)
        if not os.path.exists(local):
            failures.append(f"{name}: client asset {fn} not found in {args.assets}")
            print(f"FAIL  {name}\n      missing local asset {fn}\n")
            continue

        expect = reencode_fingerprint(local, args.width, args.quality)
        ok = expect == page_hash
        if not ok:
            failures.append(f"{name}: embedded image does not match the client's own photo of them")
        print(f"{'PASS' if ok else 'FAIL'}  {name}")
        print(f"      alt        : {alt.group(1) if alt else '(none)'}")
        print(f"      client file: {fn}")
        print(f"      bytes      : page {page_hash[:16]} vs client {expect[:16]}\n")

    print("=" * 64)
    if failures:
        print("PORTRAIT VERIFICATION FAILED")
        for x in failures:
            print("  x " + x)
        sys.exit(1)
    print("ALL PORTRAITS CORRECTLY PAIRED")


if __name__ == "__main__":
    main()
