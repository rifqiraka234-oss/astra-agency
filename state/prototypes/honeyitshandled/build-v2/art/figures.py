#!/usr/bin/env python3
"""The big figures as outlines, so her film and her photos can play inside them (a CSS mask needs a path, a data URI
image can't load a web font). Mona Sans (OFL, ../fonts) instanced at width 75, weight 760, proportional figures.
Writes figures.json, {text: {d, w, h}} in font units with the baseline at h minus the descender."""
import os, json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

B = os.path.dirname(os.path.abspath(__file__))
f = TTFont(os.path.join(B, '..', 'fonts', 'mona-sans-latin-standard-normal.woff2'))
inst = instantiateVariableFont(f, {'wdth': 75, 'wght': 760})
gs = inst.getGlyphSet(); cmap = inst.getBestCmap(); hmtx = inst['hmtx']
TRACK = -0.02  # a little tighter than set, in ems

def outline(text):
    upm = inst['head'].unitsPerEm
    x = 0; parts = []; bp = BoundsPen(gs)
    for ch in text:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
        parts.append(pen.getCommands())
        gs[g].draw(TransformPen(bp, (1, 0, 0, -1, x, 0)))
        x += hmtx[g][0] + TRACK * upm
    xmin, ymin, xmax, ymax = bp.bounds
    pad = 8
    d = ' '.join(parts)
    # shift so the box starts at 0,0
    from fontTools.pens.svgPathPen import SVGPathPen as P
    pen = P(gs); x = 0
    for ch in text:
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x - xmin + pad, -ymin + pad)))
        x += hmtx[g][0] + TRACK * upm
    return {'d': pen.getCommands(), 'w': round(xmax - xmin + 2 * pad), 'h': round(ymax - ymin + 2 * pad)}

out = {t: outline(t) for t in ('125', '570+', '17')}
json.dump(out, open(os.path.join(B, 'figures.json'), 'w'))
print({k: (v['w'], v['h'], len(v['d'])) for k, v in out.items()})
