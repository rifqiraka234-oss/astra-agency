#!/usr/bin/env python3
"""Her own marks, traced, never redrawn. Sources are the PNGs on honeyitshandled.com, downloaded 26 Oct 2026.
src-hh-red.png      42a973_022fb238cbec4413a75b05c3945d9413~mv2.png, 7410 x 6599, the HH monogram in her red
src-wordmark.png    42a973_14a72e09344a46daa57411bf47f7fb17~mv2.png, 9000 x 3555, HONEY IT'S HANDLED in her blue
src-agency.png      42a973_c71e802dcd97444c90bce6e6adb47b93~mv2.png, 9000 x 4511, the full lockup, the wordmark over WEDDING & EVENT AGENCY
Each alpha mask is downscaled, traced with potrace into one path and written as <name>.path plus a preview svg."""
from PIL import Image
import numpy as np
import potrace, os, json
B = os.path.dirname(os.path.abspath(__file__))

def trace(src, name, width):
    im = Image.open(os.path.join(B, src)).convert('RGBA')
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a > 20)
    a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h = round(a.shape[0] * width / a.shape[1])
    small = np.array(Image.fromarray(a).resize((width, h), Image.LANCZOS))
    # potracer traces pixels below its black level, so the mark goes in as False, with a margin so nothing touches the edge
    pad = np.pad(small <= 127, 4, constant_values=True)
    path = potrace.Bitmap(pad).trace(turdsize=4, alphamax=1.0, opticurve=True, opttolerance=0.2)
    d = []
    for curve in path:
        s = curve.start_point; d.append('M%.1f %.1f' % (s.x - 4, s.y - 4))
        for seg in curve.segments:
            if seg.is_corner: d.append('L%.1f %.1f L%.1f %.1f' % (seg.c.x - 4, seg.c.y - 4, seg.end_point.x - 4, seg.end_point.y - 4))
            else: d.append('C%.1f %.1f %.1f %.1f %.1f %.1f' % (seg.c1.x - 4, seg.c1.y - 4, seg.c2.x - 4, seg.c2.y - 4, seg.end_point.x - 4, seg.end_point.y - 4))
        d.append('Z')
    D = ''.join(d).replace('.0 ', ' ').replace('.0C', 'C').replace('.0L', 'L').replace('.0Z', 'Z')
    open(os.path.join(B, name + '.path'), 'w').write(D)
    open(os.path.join(B, name + '.svg'), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {h}"><path fill="#962122" fill-rule="evenodd" d="{D}"/></svg>')
    return {'w': width, 'h': h, 'bytes': len(D)}

if __name__ == '__main__':
    out = {'hh': trace('src-hh-red.png', 'hh', 1000),
           'word': trace('src-wordmark.png', 'word', 1400),
           'lockup': trace('src-agency.png', 'lockup', 1400)}
    json.dump(out, open(os.path.join(B, 'marks.json'), 'w'))
    print(out)
