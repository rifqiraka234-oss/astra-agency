"""BWILD media, cut once from their own files into build/media. Sources are in the session scratchpad (bwild/media),
every one taken from bwildoutdoors.com or presale.bwildoutdoors.com on 26 Oct 2026. Run it again only to recut."""
import json, os, subprocess, sys
from PIL import Image
import numpy as np
from scipy import ndimage

SRC = '/tmp/claude-0/-home-user-astra-agency/535b0528-0e36-5b6e-a11b-9344c62d2e80/scratchpad/bwild/media'
B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, 'media')
os.makedirs(OUT, exist_ok=True)
MAN = {}

def img(path): return Image.open(os.path.join(SRC, 'img', path))

def save(key, im, widths, alpha=False):
    """Writes key-W.webp plus key-W.jpg (or .png when alpha) for each width no wider than the source."""
    sizes = []
    for w in widths:
        if w > im.width: continue
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        if alpha:
            r.save(os.path.join(OUT, f'{key}-{w}.webp'), 'WEBP', quality=82, method=6)
            r.save(os.path.join(OUT, f'{key}-{w}.png'), 'PNG', optimize=True)
        else:
            r = r.convert('RGB')
            r.save(os.path.join(OUT, f'{key}-{w}.webp'), 'WEBP', quality=78, method=6)
            r.save(os.path.join(OUT, f'{key}-{w}.jpg'), 'JPEG', quality=80, optimize=True, progressive=True)
        sizes.append([w, h])
    MAN[key] = {'sizes': sizes, 'alpha': alpha}

def photos():
    # the moon disc, their "BWILD Moon vest" photo, cut square on the moon (centre 558,758, radius about 374)
    m = img('349a675b-BWILD_Moon_vest.jpeg'); cx, cy, r = 558, 758, 380
    save('moon', m.crop((cx - r, cy - r, cx + r, cy + r)), [320, 640, 760])
    # the sun disc, their photo of a runner in a BWILD vest facing the low sun (a frame from their brand film)
    sn = img('707de05e-Screenshot_2025-05-29_at_01.29.33.png').convert('RGB'); cx, cy, r = 1300, 690, 690
    save('sundisc', sn.crop((cx - r, cy - r, cx + r, cy + r)), [320, 640, 760])
    # the Luminous Vest render, whole and the back alone
    v = img('ps-THEVEST.png').convert('RGB')
    save('lum', v, [800, 1500])
    # the back alone, cut out of the render (rembg isnet-general-use, its inside made solid, vestback-cut.png in the
    # scratchpad, same frame as the render crop 806,100 to 1260,850), trimmed to the vest
    BB = (0, 38, 419, 545)
    frame = v.crop((806, 100, 1260, 850)).crop(BB)
    cut = img('vestback-cut.png').convert('RGBA').crop(BB)
    save('lumback', cut, [419], alpha=True)
    # what lights up in headlights, cut from the render's own pixels so the flare sits exactly on it.
    # The slashes, and the grey lower panel their night films show burning white (their "360° reflective")
    a = np.array(frame.convert('L')).astype(float); inside = np.array(cut)[..., 3] > 128
    def mask(key, m, sigma=0.8):
        soft = ndimage.gaussian_filter((m & inside).astype(float), sigma)
        rgba = np.zeros((a.shape[0], a.shape[1], 4), dtype=np.uint8); rgba[..., :3] = 255
        rgba[..., 3] = (np.clip(soft, 0, 1) * 255).astype(np.uint8)
        save(key, Image.fromarray(rgba, 'RGBA'), [419], alpha=True)
        MAN[key]['bbox'] = [int(x) for x in [np.where(m.any(0))[0][0], np.where(m.any(1))[0][0], np.where(m.any(0))[0][-1], np.where(m.any(1))[0][-1]]]
    reg = np.zeros_like(a, dtype=bool); reg[30:140, 120:215] = True
    mask('lumslash', ndimage.binary_dilation((a > 150) & reg, iterations=1))
    pan = np.zeros_like(a, dtype=bool); pan[240:507, :] = True
    m3 = (a > 95) & pan
    lab, n = ndimage.label(m3); sizes = ndimage.sum(m3, lab, range(1, n + 1))
    keep = np.isin(lab, [i + 1 for i, z in enumerate(sizes) if z > 4000])
    keep = ndimage.binary_fill_holes(ndimage.binary_closing(keep, iterations=8))
    # the gathered hem drops under the threshold in teeth, so the bottom edge follows a smoothed contour instead
    cols = np.where(keep.any(0))[0]; bot = np.array([np.where(keep[:, x])[0][-1] for x in cols])
    bot = ndimage.median_filter(bot, size=31, mode='nearest')
    for x, yb in zip(cols, bot):
        yt = np.where(keep[:, x])[0][0]; keep[:, x] = False; keep[yt:yb + 1, x] = True
    mask('lumpanel', ndimage.binary_erosion(keep, iterations=2), sigma=1.6)
    # places, from their home, community and about pages
    save('dune', img('e9f5341a-DSCF0669.JPG'), [800, 1400, 2000])
    save('dunetall', img('80549ace-DSCF0688.JPG'), [600, 1000])
    save('alps', img('ccba395f-286856.webp'), [800, 1400, 1920])
    save('alpsrun', img('8462a948-15.png').convert('RGB'), [540, 1080])
    save('snow', img('ae8e961e-16.png').convert('RGB'), [540, 1080])
    save('sunset', img('707de05e-Screenshot_2025-05-29_at_01.29.33.png').convert('RGB'), [800, 1400, 2000])
    save('ridge', img('72a35d87-Screenshot_2025-05-29_at_01.28.39.png').convert('RGB'), [800, 1400, 2000])
    # the Adventure Vest, their studio shots, kept on transparent ground
    for key, f in [('vest', '223d9a10-1._Vest.png'), ('vestflasks', 'e6ce606e-1._Vest_&_Bottles.png'), ('back', 'bec3c950-8.png'),
                   ('drink', 'cb6e1f22-10.png'), ('straps', '8bfbcda1-11.png'), ('detail', '42fe2343-14.png'), ('flasks', '507e9903-3._Flasks.png'),
                   ('label', 'f3ae5582-12.png'), ('redtee', '7302ff49-4._Lupo_with_Vest.png')]:
        save(key, img(f).convert('RGBA'), [540, 1080], alpha=True)
    save('print', img('d27f0d31-250617LG_BWILD_0144.png').convert('RGB'), [800, 1600])
    # their logo, white, and an ink version for light grounds, mapped by alpha, never by flattening
    lg = img('ps-Logo_Horizontal-White.png').convert('RGBA')
    bb = lg.getbbox(); lg = lg.crop(bb)
    save('logo', lg, [400], alpha=True)
    arr = np.array(lg); ink = arr.copy(); ink[..., :3] = [8, 9, 11]
    save('logoink', Image.fromarray(ink, 'RGBA'), [400], alpha=True)

def ff(args): subprocess.run(['ffmpeg', '-loglevel', 'error', '-y'] + args, check=True)

def films():
    V = os.path.join(SRC, 'video')
    jobs = [  # key, source, start, duration, scale, poster at
        ('swisspeaks', 'hi-home.mp4', 0, 20, '1280:720', 3.2),
        ('brand', 'hi-about.mp4', 0, 12.5, '1280:720', 2.6),
        ('product', 'hi-productv.mp4', 0, 34.5, '540:960', 3.0),
        ('f-visible', 'ps-Gif8.360.mp4', 0, 12.6, '540:540', 6.0),
        ('f-breathe', 'ps-Gif2.mp4', 0, 2.12, '540:540', 1.0),
        ('f-fit', 'ps-Gif5-1.mp4', 0, 5.96, '540:540', 4.6),
        ('f-hydrate', 'ps-Gif1.mp4', 0, 2.8, '540:540', 2.4),
        ('f-grab', 'ps-Gif3.mp4', 0, 2.52, '540:540', 1.2),
        ('f-zip', 'ps-Gif4.mp4', 0, 2.24, '540:540', 1.2),
        ('f-urban', 'ps-GifsRun6.mp4', 0, 1.0, '540:540', .5),
        ('nightrun', 'ps-GifsRun8.mp4', 0, 1.6, '540:540', .6),
    ]
    for key, src, ss, t, sc, pt in jobs:
        s = os.path.join(V, src)
        base = ['-ss', str(ss), '-t', str(t), '-i', s, '-an', '-vf', f'scale={sc}:force_original_aspect_ratio=increase,crop={sc}']
        ff(base + ['-c:v', 'libx264', '-profile:v', 'high', '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', os.path.join(OUT, key + '.mp4')])
        ff(base + ['-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4', os.path.join(OUT, key + '.webm')])
        ff(['-ss', str(ss + pt), '-i', s, '-frames:v', '1', '-vf', f'scale={sc}:force_original_aspect_ratio=increase,crop={sc}', '-q:v', '4', os.path.join(OUT, key + '-poster.jpg')])
        w, h = sc.split(':')
        MAN['film-' + key] = {'w': int(w), 'h': int(h), 'dur': t, 'src': src}

if __name__ == '__main__':
    photos()
    if '--no-film' not in sys.argv: films()
    old = {}
    p = os.path.join(B, 'data', 'media.json')
    if os.path.exists(p) and '--no-film' in sys.argv: old = json.load(open(p))
    old.update(MAN)
    os.makedirs(os.path.join(B, 'data'), exist_ok=True)
    json.dump(old, open(p, 'w'), indent=1)
    print(len(MAN), 'items')
