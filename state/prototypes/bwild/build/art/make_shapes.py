"""Shapes for v2, made once and saved.
ridge.json, the ridge line traced from the opening of their brand film (hi-about 2.2 s, a backlit mountain on the right
of the frame), as y per x on a 0 to 1 scale. The page puts it on the right as the front layer, like the film.
contours.svg, topographic contour lines from smooth noise, for the ground of the light chapters."""
import json, os, numpy as np
from PIL import Image
from scipy import ndimage
from skimage import measure
B = os.path.dirname(os.path.abspath(__file__))

L = np.asarray(Image.open(os.path.join(B, 'ridge-frame.png')).convert('L')).astype(float)
L = ndimage.gaussian_filter(L, 2)
H, W = L.shape
x0 = 1080  # well right of the runner's arm, where only the mountain meets the sky
ys = []
for x in range(x0, W):
    col = L[:, x]; dark = np.where(col < 120)[0]
    ys.append(dark[0] if len(dark) else H)
ys = ndimage.median_filter(np.array(ys, float), 9)
ys = ndimage.gaussian_filter1d(ys, 3)
seg = (ys - ys.min()) / (ys.max() - ys.min())          # 0 at the peak, 1 at the lowest point
line = seg                                               # their mountain, rising to its peak on the right
idx = np.linspace(0, len(line) - 1, 160)
pts = np.interp(idx, np.arange(len(line)), line)
json.dump({'src': 'their brand film, hi-about at 2.2 s, x from 1080 to 1919', 'y': [round(float(v), 4) for v in pts]}, open(os.path.join(B, 'ridge.json'), 'w'))
print('ridge', len(pts), 'points, peak to low span px', int(ys.max() - ys.min()))

rng = np.random.default_rng(7)
g = ndimage.gaussian_filter(rng.standard_normal((90, 160)), 9)
g = ndimage.zoom(g, 4, order=3)
paths = []
for lv in np.linspace(g.min(), g.max(), 26)[1:-1]:
    for c in measure.find_contours(g, lv):
        if len(c) < 40: continue
        c = c[::3]
        paths.append('M' + 'L'.join(f'{p[1]:.0f} {p[0]:.0f}' for p in c))
h, w = g.shape
open(os.path.join(B, 'contours.svg'), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor" stroke-width="1.1" vector-effect="non-scaling-stroke">' + ''.join(f'<path d="{d}"/>' for d in paths) + '</g></svg>')
print('contours', len(paths), 'paths', os.path.getsize(os.path.join(B, 'contours.svg')), 'bytes')
