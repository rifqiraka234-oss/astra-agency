#!/usr/bin/env python3
"""Their own mark, traced. The crescent C, the fairy and her five stars from fa3club.com's logo (media/logo-fae.png,
2048 px), cut out by connected shape so the letters stay behind, upsampled 4x and traced to one SVG path."""
from PIL import Image
import numpy as np
from scipy import ndimage
import potrace, os
B = os.path.dirname(os.path.abspath(__file__))
im = Image.open(os.path.join(B, '..', 'media', 'logo-fae.png')).convert('RGBA'); a = np.array(im)[:, :, 3]
lab, n = ndimage.label(a > 30)
KEEP = [4, 12, 13, 9, 10, 11, 8]          # the moon and fairy, then her stars; 5 is the L, 1 2 3 6 7 are F A E U B
x0, y0, x1, y1 = 628, 944, 1028, 1362
sub = a[y0:y1, x0:x1].astype(float) / 255.0 * np.isin(lab[y0:y1, x0:x1], KEEP)
big = Image.fromarray((sub * 255).astype('uint8')).resize(((x1 - x0) * 4, (y1 - y0) * 4), Image.LANCZOS)
path = potrace.Bitmap(np.array(big) > 127).trace(turdsize=6, alphamax=1.0, opticurve=True, opttolerance=0.2)
W, H = (x1 - x0) * 4, (y1 - y0) * 4
d = []
for curve in list(path)[1:]:                # the first curve is the image frame
    s = curve.start_point; d.append('M%.0f %.0f' % (s.x, s.y))
    for seg in curve.segments:
        if seg.is_corner: d.append('L%.0f %.0f L%.0f %.0f' % (seg.c.x, seg.c.y, seg.end_point.x, seg.end_point.y))
        else: d.append('C%.0f %.0f %.0f %.0f %.0f %.0f' % (seg.c1.x, seg.c1.y, seg.c2.x, seg.c2.y, seg.end_point.x, seg.end_point.y))
    d.append('Z')
D = ''.join(d)
open(os.path.join(B, 'moon-fairy.path'), 'w').write(D)
open(os.path.join(B, 'moon-fairy.svg'), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}"><path fill="#D8BE74" fill-rule="evenodd" d="{D}"/></svg>')
# the hand, where her stars leave from, in viewBox units, for the stardust stream
print(W, H, len(D))
