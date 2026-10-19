"""Make labelled contact sheets from a list of image files.

usage: python3 -I sheet.py <out_prefix> <cols> <thumb_px> file1 file2 ...
"""
import os
import sys

from PIL import Image, ImageDraw

out, cols, px = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
files = sys.argv[4:]
per = cols * 3
for s in range(0, len(files), per):
    chunk = files[s:s + per]
    rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * px, rows * (px + 30)), "white")
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(chunk):
        try:
            im = Image.open(f)
            size = im.size
            im = im.convert("RGB")
            im.thumbnail((px, px))
        except Exception as e:
            im, size = Image.new("RGB", (px, px), "grey"), ("ERR", str(e)[:20])
        x, y = (i % cols) * px, (i // cols) * (px + 30)
        sheet.paste(im, (x, y + 30))
        d.text((x + 3, y + 2), os.path.basename(f)[:34], fill="black")
        d.text((x + 3, y + 15), f"{size[0]}x{size[1]}", fill="red")
    p = f"{out}_{s // per:02d}.jpg"
    sheet.save(p, quality=85)
    print(p)
