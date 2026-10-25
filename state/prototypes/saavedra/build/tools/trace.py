#!/usr/bin/env python3
"""Trace one of their marks (a PNG on their own site) into an SVG, one <path> per connected shape, filled currentColor.

    python3 tools/trace.py in.png out.svg [--split] [--threshold 0.5] [--pad 4]

--split groups the shapes left to right into separate paths (data-i on each), so letters can move one by one."""
import sys, argparse
import numpy as np
from PIL import Image
import potrace
from skimage import measure

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--split', action='store_true')
ap.add_argument('--threshold', type=float, default=0.5)
ap.add_argument('--pad', type=int, default=4)
ap.add_argument('--min', type=int, default=40, help='drop specks smaller than this many pixels')
a = ap.parse_args()

im = Image.open(a.src).convert('RGBA')
arr = np.asarray(im).astype(float) / 255
rgb, alpha = arr[..., :3], arr[..., 3]
lum = rgb @ np.array([0.299, 0.587, 0.114])
ink = (alpha > a.threshold) & (lum < 0.8)
ys, xs = np.nonzero(ink)
y0, y1, x0, x1 = ys.min() - a.pad, ys.max() + a.pad + 1, xs.min() - a.pad, xs.max() + a.pad + 1
ink = ink[max(0, y0):y1, max(0, x0):x1]
H, W = ink.shape


def trace(mask):
    bm = potrace.Bitmap(~mask)  # potracer traces the False pixels
    p = bm.trace(turdsize=6, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.2)
    d = []
    for c in p:
        sp = c.start_point
        d.append(f'M{sp.x:.1f} {sp.y:.1f}')
        for s in c.segments:
            if s.is_corner:
                d.append(f'L{s.c.x:.1f} {s.c.y:.1f}L{s.end_point.x:.1f} {s.end_point.y:.1f}')
            else:
                d.append(f'C{s.c1.x:.1f} {s.c1.y:.1f} {s.c2.x:.1f} {s.c2.y:.1f} {s.end_point.x:.1f} {s.end_point.y:.1f}')
        d.append('Z')
    return ''.join(d)


paths = []
if a.split:
    lab = measure.label(ink, connectivity=2)
    regs = [r for r in measure.regionprops(lab) if r.area >= a.min]
    tall = max(r.bbox[2] - r.bbox[0] for r in regs)
    big = sorted([r for r in regs if (r.bbox[2] - r.bbox[0]) > tall * 0.45], key=lambda r: r.bbox[1])
    small = [r for r in regs if r not in big]
    for i, r in enumerate(big):
        paths.append(f'<path class="lt" data-i="{i}" d="{trace(lab == r.label)}"/>')
    if small:
        m = np.isin(lab, [r.label for r in small])
        paths.append(f'<path class="sub" d="{trace(m)}"/>')
else:
    paths.append(f'<path d="{trace(ink)}"/>')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="currentColor" fill-rule="evenodd">{"".join(paths)}</svg>'
open(a.out, 'w').write(svg)
print(a.out, W, H, len(paths), 'paths', len(svg), 'bytes')
