"""Map every wixstatic media id to the pages, alt text, titles and component ids it appears with.

usage: python3 -I img_map.py <hs_dir>
"""
import collections
import glob
import html
import json
import os
import re
import sys

HS = sys.argv[1]
MID = re.compile(r"([0-9a-f]{6}_[0-9a-f]{32}(?:~mv2|%7Emv2)?\.(?:png|jpe?g|gif|webp|svg))")
out = collections.defaultdict(lambda: {"pages": set(), "alts": set(), "titles": set(), "img_tag_sizes": set(),
                                       "components": set(), "json_names": set(), "orig_wh": set()})
videos = collections.defaultdict(set)
for f in sorted(glob.glob(os.path.join(HS, "raw/*.html"))):
    page = os.path.basename(f)[:-5]
    b = open(f, errors="replace").read()
    for m in MID.finditer(b):
        out[m.group(1).replace("%7E", "~")]["pages"].add(page)
    # img tags
    for m in re.finditer(r"<img\b[^>]*>", b):
        tag = m.group(0)
        mm = MID.search(tag)
        if not mm:
            continue
        k = mm.group(1).replace("%7E", "~")
        a = re.search(r'\balt="([^"]*)"', tag)
        if a:
            out[k]["alts"].add(html.unescape(a.group(1)))
        w = re.search(r'\bwidth="(\d+)"', tag)
        h = re.search(r'\bheight="(\d+)"', tag)
        if w and h:
            out[k]["img_tag_sizes"].add(f"{w.group(1)}x{h.group(1)}")
        # the wrapping element id/title, look back 600 chars
        back = b[max(0, m.start() - 700):m.start()]
        ids = re.findall(r'id="(comp-[^"]+)"', back)
        if ids:
            out[k]["components"].add(page + ":" + ids[-1])
        t = re.findall(r'title="([^"]*)"', back)
        if t:
            out[k]["titles"].add(html.unescape(t[-1]))
    # JSON references with name/width/height
    for m in re.finditer(r'\{[^{}]*"uri":"([0-9a-f]{6}_[0-9a-f]{32}(?:~mv2)?\.[a-z]+)"[^{}]*\}', b):
        k = m.group(1)
        blob = m.group(0)
        nm = re.search(r'"name":"([^"]*)"', blob)
        if nm:
            out[k]["json_names"].add(nm.group(1))
        w = re.search(r'"width":(\d+)', blob)
        h = re.search(r'"height":(\d+)', blob)
        if w and h:
            out[k]["orig_wh"].add(f"{w.group(1)}x{h.group(1)}")
        al = re.search(r'"alt":"([^"]*)"', blob)
        if al and al.group(1):
            out[k]["alts"].add(al.group(1))
    for m in re.finditer(r"(video\.wixstatic\.com/video/[^\"'\s/]+/[^\"'\s]+|[0-9a-f]{6}_[0-9a-f]{32}(?=/(?:1080p|720p|480p|360p)))", b):
        videos[m.group(1)].add(page)
    for m in re.finditer(r'"videoId":"([^"]+)"', b):
        videos["videoId:" + m.group(1)].add(page)

res = {k: {kk: sorted(vv) for kk, vv in v.items()} for k, v in out.items()}
json.dump(res, open(os.path.join(HS, "img_map_raw.json"), "w"), ensure_ascii=False, indent=1)
for k, v in sorted(res.items(), key=lambda kv: -len(kv[1]["pages"])):
    print(k, "| pages", len(v["pages"]), v["pages"][:6], "| alt", v["alts"][:3], "| title", v["titles"][:2],
          "| json", v["json_names"][:2], v["orig_wh"][:2])
print("\nVIDEOS")
for k, v in videos.items():
    print(k, sorted(v))
