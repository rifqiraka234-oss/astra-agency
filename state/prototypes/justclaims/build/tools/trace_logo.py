#!/usr/bin/env python3
"""Traces the client's own logo PNG (assets/client/logo-justclaims.png) into vector paths with potrace. No redrawing.
Outputs build/assets-src/logo-paths.json with the winglet (mint + charcoal strip), the word 'just' (mint), 'claims.eu' (charcoal) and the tagline (charcoal)."""
import numpy as np, json, os, sys
from PIL import Image
import potrace
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '../../assets/client/logo-justclaims.png')
OUT = os.path.join(HERE, '../assets-src'); os.makedirs(OUT, exist_ok=True)
im = Image.open(SRC).convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im)
a = np.asarray(bg.convert('RGB')).astype(float)
MINT = np.array([0x66, 0xCB, 0xB0], float); CHAR = np.array([0x4F, 0x4C, 0x4C], float); W = np.array([255, 255, 255], float)
def cover(col):
    # share of the way from white to the colour, along that line
    d = col - W; t = ((a - W) @ d) / (d @ d); return np.clip(t, 0, 1)
tm, tc = cover(MINT), cover(CHAR)
# which colour a pixel belongs to: the one whose line it sits closer to
def dist_to_line(col):
    d = col - W; t = np.clip(((a - W) @ d) / (d @ d), 0, 1)[..., None]; return np.linalg.norm(a - (W + t * d), axis=2)
dm, dc = dist_to_line(MINT), dist_to_line(CHAR)
ink = (np.linalg.norm(a - W, axis=2) > 40)
is_mint = ink & (dm < dc); is_char = ink & (dc <= dm)
H, Wd = is_mint.shape

def trace(mask, box):
    x0, y0, x1, y1 = box
    sub = mask[y0:y1, x0:x1]
    bm = potrace.Bitmap(~sub)
    pl = bm.trace(turdsize=6, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.05, opticurve=True, opttolerance=0.25)
    d = []
    for curve in pl:
        sp = curve.start_point; d.append('M%.1f %.1f' % (sp.x + x0, sp.y + y0))
        for seg in curve.segments:
            if seg.is_corner: d.append('L%.1f %.1f L%.1f %.1f' % (seg.c.x + x0, seg.c.y + y0, seg.end_point.x + x0, seg.end_point.y + y0))
            else: d.append('C%.1f %.1f %.1f %.1f %.1f %.1f' % (seg.c1.x + x0, seg.c1.y + y0, seg.c2.x + x0, seg.c2.y + y0, seg.end_point.x + x0, seg.end_point.y + y0))
        d.append('Z')
    return ''.join(d)

def bbox(mask, box):
    x0, y0, x1, y1 = box; ys, xs = np.nonzero(mask[y0:y1, x0:x1]); return (int(xs.min() + x0), int(ys.min() + y0), int(xs.max() + x0 + 1), int(ys.max() + y0 + 1))

# regions in the 1500 x 912 source
R_WING = (600, 100, 920, 440); R_WORD = (100, 470, 1400, 720); R_TAG = (440, 700, 1080, 800)
out = {}
out['wing_mint'] = trace(is_mint, R_WING); out['wing_char'] = trace(is_char, R_WING)
out['just'] = trace(is_mint, R_WORD); out['claims'] = trace(is_char, R_WORD)
out['tag'] = trace(is_char, R_TAG)
bw = bbox(is_mint | is_char, R_WING); bwd = bbox(is_mint | is_char, R_WORD); bt = bbox(is_char, R_TAG)
out['box'] = {'wing': bw, 'word': bwd, 'tag': bt}
json.dump(out, open(os.path.join(OUT, 'logo-paths.json'), 'w'))
print('boxes', {k: tuple(int(x) for x in v) for k, v in out['box'].items()}, 'path bytes', {k: len(v) for k, v in out.items() if k != 'box'})
# a check render of the traced vector against the PNG
def svg(vb, parts):
    x0, y0, x1, y1 = vb
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%d %d %d %d" width="%d" height="%d">' % (x0, y0, x1 - x0, y1 - y0, (x1 - x0), (y1 - y0)) + ''.join(parts) + '</svg>'
full = (100, 100, 1400, 800)
s = svg(full, ['<rect x="100" y="100" width="1300" height="700" fill="#fff"/>', '<path fill="#66CBB0" d="%s"/>' % out['wing_mint'], '<path fill="#4F4C4C" d="%s"/>' % out['wing_char'],
               '<path fill="#66CBB0" d="%s"/>' % out['just'], '<path fill="#4F4C4C" d="%s"/>' % out['claims'], '<path fill="#4F4C4C" d="%s"/>' % out['tag']])
open(os.path.join(OUT, 'logo-trace-check.svg'), 'w').write(s)
