#!/usr/bin/env python3
"""Stock photographs to the site's own duotone (night to mint), and the two film loops to site/assets/film.
Sources are in assets/stock (see assets/PROVENANCE.md). Run from the justclaims folder."""
import os, shutil, subprocess
import numpy as np
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.join(ROOT, 'assets', 'stock'); OUT = os.path.join(ROOT, 'site', 'assets')
STOPS = [(0.0, (8, 16, 15)), (0.35, (14, 52, 48)), (0.7, (59, 142, 131)), (1.0, (190, 236, 224))]

def duotone(im, gamma=1.2):
    a = np.asarray(ImageOps.autocontrast(im.convert('L'), cutoff=1)).astype('float32') / 255.0
    a = a ** gamma
    out = np.zeros(a.shape + (3,), dtype='float32')
    for (t0, c0), (t1, c1) in zip(STOPS, STOPS[1:]):
        m = (a >= t0) & (a <= t1); f = ((a - t0) / (t1 - t0))[m]
        for k in range(3): out[..., k][m] = c0[k] + (c1[k] - c0[k]) * f
    return Image.fromarray(out.clip(0, 255).astype('uint8'))

PHOTOS = {
    'ph-notice': ('04-runway-light-trails-night-pexels732142.jpg', 1.0),
    'ph-thirty': ('02-cabin-window-sunrise-pexels4657595.jpg', 1.1),
    'ph-circ': ('06-rain-glass-night-lights-pexels20768044.jpg', 1.0),
    'ph-new': ('09-runway-edge-lights-dusk-pexels3768652.jpg', 1.15),
    'ph-ready': ('05-apron-markings-dusk-pexels13343113.jpg', 1.1),
    'ph-res': ('01-wing-engine-clouds-dusk-pexels2387803.jpg', 1.2),
    'ph-lost': ('03-winglet-dusk-sky-pexels33337082.jpg', 0.8),
}
os.makedirs(os.path.join(OUT, 'img', 'ph'), exist_ok=True); os.makedirs(os.path.join(OUT, 'film'), exist_ok=True)
for name, (f, g) in PHOTOS.items():
    im = Image.open(os.path.join(SRC, 'photos', f))
    if name == 'ph-ready': im = im.crop((0, 0, int(im.width * .76), im.height))  # the stand sign at the right edge reads mirrored, so it is cropped out
    im.thumbnail((1200, 1200), Image.LANCZOS)
    d = duotone(im, g); p = os.path.join(OUT, 'img', 'ph', name + '.jpg')
    d.save(p, quality=76, optimize=True, progressive=True); print(name, d.size, os.path.getsize(p) // 1024, 'KB')
for f in ('01-wing-pink-dusk-mixkit4204', '03-wall-clock-mixkit28886'):
    for ext in ('.mp4', '-poster.jpg'):
        shutil.copy(os.path.join(SRC, 'film', f + ext), os.path.join(OUT, 'film', f + ext))
print('film copied', os.listdir(os.path.join(OUT, 'film')))
