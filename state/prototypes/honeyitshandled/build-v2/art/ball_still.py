#!/usr/bin/env python3
"""The mirror ball's still frame, the same sums as js/ball.js in numpy, for reduced motion before the first frame, no
WebGL and no script. Reads ../media/facets.jpg, writes ../media/ball.png and ball.webp (640 px, transparent round it)."""
import os
import numpy as np
from PIL import Image

B = os.path.dirname(os.path.abspath(__file__))
M = os.path.join(B, '..', 'media')
A = np.asarray(Image.open(os.path.join(M, 'facets.jpg')).convert('RGB')).astype(np.float32) / 255.0
N = 640; ROT = 0.6

def h1(x, y):
    px = np.mod(x * 127.1, 1.0); py = np.mod(y * 311.7, 1.0)
    d = px * (px + 19.19) + py * (py + 19.19)
    px = px + d; py = py + d
    return np.mod(px * py, 1.0)

def ry(v, a):
    c, s = np.cos(a), np.sin(a); x, y, z = v
    return (c * x + s * z, y, -s * x + c * z)

def rx(v, a):
    c, s = np.cos(a), np.sin(a); x, y, z = v
    return (x, c * y - s * z, s * y + c * z)

ys, xs = np.mgrid[0:N, 0:N].astype(np.float32)
qx = (xs + .5 - N / 2) / (N / 2 * .96); qy = -(ys + .5 - N / 2) / (N / 2 * .96)
r2 = qx * qx + qy * qy; inside = r2 <= 1
z = np.sqrt(np.clip(1 - r2, 0, 1))
w = ry(rx((qx, qy, z), -.32), ROT)
lat = np.arcsin(np.clip(w[1], -1, 1)); lon = np.arctan2(w[2], w[0])
rows = 24.0
fy = (lat / np.pi + .5) * rows; ri = np.floor(fy)
latC = ((ri + .5) / rows - .5) * np.pi
cols = np.maximum(6, np.floor(rows * 2 * np.cos(latC) + .5))
fx = (lon / (2 * np.pi) + .5) * cols; ci = np.floor(fx)
cx, cy = fx - ci, fy - ri
lonC = ((ci + .5) / cols - .5) * 2 * np.pi
fw = (np.cos(latC) * np.cos(lonC), np.sin(latC), np.cos(latC) * np.sin(lonC))
fn = rx(ry(fw, -ROT), .32)
jx = h1(ri, ci) - .5; jy = h1(ci, ri) - .5
fn = np.stack([fn[0] + jx * .05, fn[1] + jy * .05, fn[2]])
fn /= np.linalg.norm(fn, axis=0) + 1e-6
idx = np.mod(ri * 13 + ci * 7, 64)
tu = (np.mod(idx, 8) + .08 + cx * .84) / 8; tv = (np.floor(idx / 8) + .08 + cy * .84) / 8
# the shader samples with v up from the bottom of the texture as uploaded (top row first), so flip v here
px = np.clip((tu * 1024).astype(int), 0, 1023); py = np.clip(((tv) * 1024).astype(int), 0, 1023)
ph = A[py, px]
Rf = np.stack([2 * fn[2] * fn[0], 2 * fn[2] * fn[1], 2 * fn[2] * fn[2] - 1])
L = np.array([-.35, .55, .76]); L /= np.linalg.norm(L)
spec = np.maximum((Rf * L[:, None, None]).sum(0), 0) ** 90
silver = np.array([.83, .91, .93])
k = (.35 + .65 * Rf[1] * .5 + .32)[..., None]
col = (ph * (1 - .32) + silver * k * .32) * (.55 + .45 * fn[2])[..., None]
col = col * (1 - (.12 * (1 - Rf[1]))[..., None]) + np.array([.59, .13, .13]) * (.12 * (1 - Rf[1]))[..., None]
col += np.array([1., .97, .94]) * (spec * 1.5)[..., None]
gx = np.clip(cx / .07, 0, 1) * np.clip((1 - cx) / .07, 0, 1); gy = np.clip(cy / .09, 0, 1) * np.clip((1 - cy) / .09, 0, 1)
col *= (.18 + .82 * (gx * gy))[..., None]
col *= (.45 + .55 * z)[..., None]
a = np.clip((1 - r2) / .015, 0, 1) * inside
rgba = np.dstack([np.clip(col, 0, 1) * 255, a * 255]).astype(np.uint8)
im = Image.fromarray(rgba, 'RGBA')
im.save(os.path.join(M, 'ball.png'), optimize=True); im.save(os.path.join(M, 'ball.webp'), quality=82)
print('ball still written')
