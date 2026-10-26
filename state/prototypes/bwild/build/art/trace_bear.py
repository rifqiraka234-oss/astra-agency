"""Their bear and wordmark, traced from the last frame of their own brand film (hi-about, 41.5 s), where the mark sits
dark on a pale dawn sky. Upsampled 4x and blurred a little before the threshold so the curves come out smooth.
This potrace build fills False pixels, so the mask is inverted before tracing. Writes bear.path and wordmark.path."""
import os, numpy as np, potrace
from PIL import Image, ImageFilter
B = os.path.dirname(os.path.abspath(__file__))
im = Image.open(os.path.join(B, 'bear-frame.png')).convert('L')
L = np.asarray(im).astype(float)

def trace(box, name):
    x0, y0, x1, y1 = box
    c = im.crop((x0 - 6, y0 - 6, x1 + 6, y1 + 6)); c = c.resize((c.width * 4, c.height * 4), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
    ink = np.asarray(c).astype(float) < 128
    curves = potrace.Bitmap(~ink).trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.3)
    d = []
    for cv in curves:
        s = cv.start_point; d.append(f'M{s.x:.1f} {s.y:.1f}')
        for g in cv.segments:
            if g.is_corner: d.append(f'L{g.c.x:.1f} {g.c.y:.1f}L{g.end_point.x:.1f} {g.end_point.y:.1f}')
            else: d.append(f'C{g.c1.x:.1f} {g.c1.y:.1f} {g.c2.x:.1f} {g.c2.y:.1f} {g.end_point.x:.1f} {g.end_point.y:.1f}')
        d.append('Z')
    open(os.path.join(B, name + '.path'), 'w').write(f'{c.width} {c.height}\n' + ''.join(d))
    print(name, c.width, c.height, len(curves), 'curves')

rows = (L[100:420, 700:1220] < 130).sum(1)
split = next(i + 100 for i in range(1, len(rows)) if rows[i] == 0 and rows[i - 1] > 0)
for (r0, r1), name in [((100, split), 'bear'), ((split, 420), 'wordmark')]:
    ys, xs = np.where(L[r0:r1, 700:1220] < 130)
    trace((xs.min() + 700, ys.min() + r0, xs.max() + 700, ys.max() + r0), name)
