#!/usr/bin/env python3
"""A tileable paper texture, fine tooth and long soft fibres, near white so it can be multiplied onto any of her three
colours. Ours, generated, written to ../media/fibre.png and fibre.jpg (the one the page uses)."""
import numpy as np, os
from PIL import Image
B = os.path.dirname(os.path.abspath(__file__))
rng = np.random.default_rng(17)
N = 320

def blur_wrap(a, s):
    f = np.fft.fft2(a)
    ky = np.fft.fftfreq(a.shape[0])[:, None]; kx = np.fft.fftfreq(a.shape[1])[None, :]
    return np.real(np.fft.ifft2(f * np.exp(-(kx ** 2 + ky ** 2) * (2 * np.pi ** 2) * s * s)))

tooth = blur_wrap(rng.standard_normal((N, N)), 0.7)
tooth = (tooth - tooth.mean()) / tooth.std()
cloud = blur_wrap(rng.standard_normal((N, N)), 14)
cloud = (cloud - cloud.mean()) / cloud.std()
fib = np.zeros((N, N))
for _ in range(260):
    x, y = rng.uniform(0, N, 2); ang = rng.uniform(0, np.pi); L = rng.uniform(18, 70); w = rng.uniform(0.25, 0.8)
    for t in np.linspace(0, 1, int(L * 2)):
        cx = (x + np.cos(ang) * L * t + np.sin(t * 6) * 1.5) % N; cy = (y + np.sin(ang) * L * t) % N
        fib[int(cy) % N, int(cx) % N] += w
fib = blur_wrap(fib, 0.6)
v = 1.0 - (0.016 * tooth.clip(-3, 3) + 0.014 * cloud + 0.045 * fib).clip(-0.02, 0.12) - 0.008
img = (v.clip(0, 1) * 255).astype('uint8')
Image.fromarray(img, 'L').save(os.path.join(B, '..', 'media', 'fibre.jpg'), quality=74, optimize=True, progressive=True)
print('fibre.jpg', img.min(), img.max(), img.mean())
