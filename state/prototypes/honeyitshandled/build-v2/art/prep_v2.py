#!/usr/bin/env python3
"""Her own photos, cut outs, cyanotypes, the mirror ball's facets and the big figures, prepared for v2.

Originals were downloaded from honeyitshandled.com on 26 Oct 2026 (static.wixstatic.com/media/<id>, the files her pages
serve) into the session scratchpad, which the build doesn't keep. Set HIH_ORIG to that folder to rerun. Writes
../media/<key>-<w>.jpg and .webp (photos), <key>-<h>.webp and .png (cut outs, with alpha), and ../media/manifest.json with
each file's source id, the page it sits on today (her pages reread 15.34 UTC), its alt text there, the sha256 of the
original and every crop or edit. The figures are outlined from Mona Sans (OFL) at width 75, weight 760.

Needs Pillow, numpy, rembg (birefnet-general) and opencv for the one paint out. /usr/local/bin/python3 has them."""
import os, json, hashlib, shutil, io
import numpy as np
from PIL import Image, ImageFilter

B = os.path.dirname(os.path.abspath(__file__))
SRC = os.environ.get('HIH_ORIG', '/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/honeyproto/media/orig')
V1 = os.path.join(B, '..', '..', 'build', 'media')
OUT = os.path.join(B, '..', 'media')
FONT = os.path.join(B, '..', 'fonts', 'mona-sans-latin-standard-normal.woff2')

def src(i):
    f = [x for x in os.listdir(SRC) if x.startswith('42a973_' + i)]
    assert len(f) == 1, i
    return os.path.join(SRC, f[0]), f[0]

def sha(p): return hashlib.sha256(open(p, 'rb').read()).hexdigest()

# key, id prefix, page today, alt there today, widths, crop (l, t, r, b) as fractions, note
PHOTOS = [
    ('tent', '3eba9b82', '/gallerycincocero', '(no alt)', (900, 1600), None, 'Cinco Cero, the tent set before the evening, no people'),
    ('hall', 'f181779c', '/pro-league-awards', 'Pro League Awards 2026 in de Handelsbeurs Antwerpen', (700, 1067), (0.0, 0.0, 1.0, 0.655),
     'cropped to the top 65.5 percent, the ground floor arcade carries a Pro League and sponsor wall (as v1)'),
    ('disco', '2dc29647', '/ and /cincocero', 'Discobal tijdens avond feest', (600, 1100), None, 'Cinco Cero, the mirror ball in the tent'),
    ('sign', '427f62a1', '/ and /cincocero', 'Welkomstbord in het donker tijdens privé feest', (600, 1100), None, 'Cinco Cero, the welcome sign at night'),
    ('lamp', 'aaf72253', '/cincocero', 'Buffettafel private Event Antwerpen', (600, 1000), None, 'Cinco Cero, a heat lamp over the buffet'),
    ('tables', '9e35ce1e', '/ (glimpse)', 'Elegante tafelopstelling tijdens de Pro League Awards', (700, 1067), (0.0, 0.0, 1.0, 0.5),
     'top half only, the lower half has menu cards with a printed mark on the napkins'),
]

def save_photo(key, im, widths, man_extra):
    sizes = []
    for w in widths:
        w = min(w, im.size[0]); h = round(im.size[1] * w / im.size[0])
        r = im.resize((w, h), Image.LANCZOS)
        r.save(os.path.join(OUT, f'{key}-{w}.jpg'), quality=80, optimize=True, progressive=True)
        r.save(os.path.join(OUT, f'{key}-{w}.webp'), quality=76, method=6)
        sizes.append([w, h])
    man_extra['sizes'] = sizes

def cyanotype(im):
    """Her blue ink on her blue paper. Luminance mapped from ink rgb(22,52,64) to paper rgb(222,238,242), a little
    contrast, so the room reads as a plan drawn in her colour."""
    g = np.asarray(im.convert('L')).astype(np.float32) / 255.0
    g = np.clip((g - 0.08) / 0.84, 0, 1) ** 0.9
    ink = np.array([22, 52, 64], np.float32); paper = np.array([222, 238, 242], np.float32)
    rgb = ink[None, None, :] * (1 - g[..., None]) + paper[None, None, :] * g[..., None]
    rng = np.random.default_rng(7); rgb += rng.normal(0, 3.0, rgb.shape[:2])[..., None]
    return Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))

def paint_out_mark(arr):
    """The Apple mark on the laptop lid in 42a973_b81dcffa (pixels 2280 to 2323 by 1098 to 1196 in the original),
    filled from the lid around it with OpenCV's Telea inpaint. Recorded in the manifest."""
    import cv2
    bgr = cv2.cvtColor(arr, cv2.COLOR_RGB2BGR)
    mask = np.zeros(arr.shape[:2], np.uint8)
    reg = cv2.cvtColor(bgr[1080:1215, 2265:2340], cv2.COLOR_BGR2GRAY)
    m = (reg < 120).astype(np.uint8) * 255
    m = cv2.dilate(m, np.ones((9, 9), np.uint8))
    mask[1080:1215, 2265:2340] = m
    out = cv2.inpaint(bgr, mask, 9, cv2.INPAINT_TELEA)
    return cv2.cvtColor(out, cv2.COLOR_BGR2RGB), int(mask.sum() / 255)

CUTS = [
    ('elise-book', 'b81dcffa', '/about', "Honey it's Handled - Elise Laeven", True),
    ('elise-phone', '05bb1bca', '/contact', "Honey it's Handled_Elise Laeven", False),
    ('elise-sit', '6059565d', '/', "Honey it's Handled_Elise Laeven", False),
    ('elise-walk', 'bcd60d05', '/about', "Honey it's Handled - Elise Laeven", False),
]

def sticker(rgba, edge):
    """Her die cut sticker grammar, a white border round the cut out (her stickers on Instagram, 5 Aug 2026)."""
    a = rgba.split()[-1]
    a = a.point(lambda v: 255 if v > 110 else 0)
    big = a.filter(ImageFilter.MaxFilter(edge * 2 + 1)).filter(ImageFilter.GaussianBlur(1.2)).point(lambda v: 255 if v > 128 else 0)
    big = big.filter(ImageFilter.GaussianBlur(0.8))
    W, H = rgba.size
    base = Image.new('RGBA', (W, H), (255, 255, 255, 0))
    white = Image.new('RGBA', (W, H), (252, 251, 249, 255))
    base.paste(white, (0, 0), big)
    base.alpha_composite(rgba)
    return base

def main():
    os.makedirs(OUT, exist_ok=True)
    man = {}
    for key, i, page, alt, widths, crop, note in PHOTOS:
        p, fname = src(i)
        im = Image.open(p).convert('RGB')
        if crop:
            W, H = im.size; im = im.crop((round(crop[0] * W), round(crop[1] * H), round(crop[2] * W), round(crop[3] * H)))
        e = {'id': fname, 'url': 'https://static.wixstatic.com/media/' + fname, 'page': page, 'altThere': alt,
             'sha256': sha(p), 'crop': crop, 'note': note}
        save_photo(key, im, widths, e)
        man[key] = e
        if key in ('tent', 'hall'):
            c = cyanotype(im); e2 = dict(e, note=e['note'] + ', our cyanotype of her photo in her blue (the details layer)')
            save_photo(key + '-cy', c, widths, e2); man[key + '-cy'] = e2

    # cut outs with her sticker edge
    from rembg import remove, new_session
    sess = new_session('birefnet-general')
    for key, i, page, alt, paint in CUTS:
        p, fname = src(i)
        arr = np.asarray(Image.open(p).convert('RGB')).copy()
        edit = None
        if paint:
            arr, n = paint_out_mark(arr); edit = f'Apple mark on the laptop lid painted out ({n} pixels, OpenCV Telea inpaint from the lid round it)'
        im = Image.fromarray(arr); im.thumbnail((1500, 1500), Image.LANCZOS)
        cut = remove(im, session=sess)
        bb = cut.split()[-1].point(lambda v: 255 if v > 40 else 0).getbbox()
        pad = 40
        cut = cut.crop((max(0, bb[0] - pad), max(0, bb[1] - pad), min(cut.size[0], bb[2] + pad), min(cut.size[1], bb[3] + pad)))
        st = sticker(cut, 13)
        sizes = []
        for h in (560, 1000):
            w = round(st.size[0] * h / st.size[1]); r = st.resize((w, h), Image.LANCZOS)
            r.save(os.path.join(OUT, f'{key}-{h}.webp'), quality=82, method=6)
            r.save(os.path.join(OUT, f'{key}-{h}.png'), optimize=True)
            sizes.append([w, h])
        man[key] = {'id': fname, 'url': 'https://static.wixstatic.com/media/' + fname, 'page': page, 'altThere': alt,
                    'sha256': sha(p), 'crop': 'cut out with rembg birefnet-general, white sticker edge 13 px', 'edit': edit, 'sizes': sizes}

    # her envelope stickers (PNG artwork on /weddings, / and /contact)
    for key, i, page, alt in [('env-card', '3f8b9038', '/ and /weddings', 'HIH-ENVELOPPE-2'), ('env-open', '79da123c', '/about and /contact', "Honey it's Handled_Enveloppe")]:
        p, fname = src(i)
        im = Image.open(p).convert('RGBA'); bb = im.split()[-1].getbbox(); im = im.crop(bb)
        sizes = []
        for w in (520, 900):
            r = im.resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS)
            r.save(os.path.join(OUT, f'{key}-{w}.webp'), quality=84, method=6); r.save(os.path.join(OUT, f'{key}-{w}.png'), optimize=True)
            sizes.append(list(r.size))
        man[key] = {'id': fname, 'url': 'https://static.wixstatic.com/media/' + fname, 'page': page, 'altThere': alt, 'sha256': sha(p), 'crop': 'trimmed to the artwork', 'sizes': sizes}

    # the mirror ball's facets, an 8 by 8 atlas of 128 px squares from her photos, none with a third party mark
    TILE = ['2dc29647', '427f62a1', 'aaf72253', '3eba9b82', 'e2ab84ce', 'f1ed3030', '5429ce83', '17bbcdbc', 'f6708bed',
            '8e6b7c2f', '96ead788', 'f4380fd9', '61c835ce', 'e65c1746', '03fbc821', 'f5f9367f',
            'f181779c', '9e35ce1e', 'f107cefb', '4765d2d4', '81c39f33', 'fbccf33b', 'e62c395f', '7624387b',
            '68e0f87c', 'a0f125be', '6059565d', '05bb1bca', 'bcd60d05']
    atlas = Image.new('RGB', (1024, 1024)); used = []
    rng = np.random.default_rng(11); k = 0
    for n in range(64):
        i = TILE[n % len(TILE)]
        p, fname = src(i); im = Image.open(p).convert('RGB')
        W, H = im.size; s = min(W, H) * (0.42 if n >= len(TILE) else 0.7)
        if i == 'f181779c': H = H * 0.6   # keep to the roof, clear of the sponsor wall
        if i == '9e35ce1e': H = H * 0.45
        cx = rng.uniform(s / 2, W - s / 2); cy = rng.uniform(s / 2, max(s / 2 + 1, H - s / 2))
        t = im.crop((int(cx - s / 2), int(cy - s / 2), int(cx + s / 2), int(cy + s / 2))).resize((128, 128), Image.LANCZOS)
        atlas.paste(t, ((n % 8) * 128, (n // 8) * 128)); used.append(fname)
    atlas.save(os.path.join(OUT, 'facets.jpg'), quality=82)
    man['facets'] = {'note': 'mirror ball facets, 64 squares cut from 30 of her photos, list in ids', 'ids': sorted(set(used))}

    # film, her own Cinco Cero aftermovie, the cut v1 made (disco ball and dance floor)
    for f in ('night.webm', 'night.mp4', 'night-poster.jpg'):
        shutil.copy(os.path.join(V1, f), os.path.join(OUT, f))
    v1 = json.load(open(os.path.join(V1, 'manifest.json')))
    man['night'] = v1['night']

    # grain, ours, a 160 px tile of fine noise
    g = (np.random.default_rng(3).normal(128, 34, (160, 160))).clip(0, 255).astype(np.uint8)
    Image.fromarray(g, 'L').save(os.path.join(OUT, 'grain.png'), optimize=True)

    json.dump(man, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
    print(len(man), 'entries')

if __name__ == '__main__':
    main()
