#!/usr/bin/env python3
"""Media for Honey It's Handled v3. Writes ../media/ and ../media/manifest.json.

Sources were fetched singly into the session scratchpad on 26 Oct 2026, which the build doesn't keep. Set HIH3_SRC to that
folder to rerun (honey-v3/media-src there, with hd/<mixkit id>.mp4, us-orig/<unsplash id>.jpg), and HIH_ORIG to v2's
folder of her own originals. Each licence was read on the item's own page the same evening (research/art-direction-v3.md).

- Films, Mixkit Stock Video Free License, the 1080p files from each item's page. Cut, graded soft and warm, loops made
  seamless (the hero ends on the frame it starts from, the chapter films play forward then back), no sound. VP9 webm and
  H.264 mp4 of each, a phone cut of the hero, posters as webp.
- Stills, the Unsplash License, the photo's own file on images.unsplash.com (the og:image of its page).
- Elise, her own studio photos from honeyitshandled.com, no edit.
- Events, her own photos and her Cinco Cero aftermovie cut, copied from v2's prepared media (build-v2/media/manifest.json).

Needs ffmpeg with libvpx-vp9 and libx264, Pillow. Each ffmpeg step asserts its exit code.
"""
import os, json, hashlib, shutil, subprocess
from PIL import Image

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, '..', 'media')
V2 = os.path.join(B, '..', '..', 'build-v2', 'media')
SRC = os.environ.get('HIH3_SRC', '/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/honey-v3/media-src')
ORIG = os.environ.get('HIH_ORIG', '/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/honeyproto/media/orig')
os.makedirs(OUT, exist_ok=True)
TMP = os.path.join(SRC, 'tmp-prep'); os.makedirs(TMP, exist_ok=True)
MAN = {}

def sha(p): return hashlib.sha256(open(p, 'rb').read()).hexdigest()
def run(args):
    r = subprocess.run(args, capture_output=True, text=True)
    assert r.returncode == 0, (args, r.stderr[-800:])
def hd(i): return os.path.join(SRC, 'hd', f'{i}.mp4')

GRADE = 'eq=contrast=0.93:brightness=0.02:saturation=0.86:gamma=1.04,colorbalance=rs=0.015:bs=-0.025:rm=0.02:bm=-0.015:rh=0.02:bh=-0.02'
GRADE_BLUE = 'eq=contrast=0.92:brightness=0.03:saturation=0.62:gamma=1.05,colorbalance=rs=-0.07:gs=0.01:bs=0.03:rm=-0.07:gm=0.02:bm=0.02:rh=-0.04:bh=0.0'
GRADE_OFF = 'eq=contrast=0.9:brightness=0.06:saturation=0.8:gamma=1.12,colorbalance=rs=0.02:bs=-0.02:rm=0.025:bm=-0.02:rh=0.02:bh=-0.01'
GRADE_RED = 'eq=contrast=0.95:brightness=0.0:saturation=0.95:gamma=1.0,colorbalance=rs=0.03:bs=-0.03:rm=0.03:bm=-0.02'

MIX = {
    5184: ('Bride at her wedding holding bouquet', 'https://mixkit.co/free-stock-video/bride-at-her-wedding-holding-bouquet-5184/'),
    5183: ('Bridesmaid helping to put on a wedding dress', 'https://mixkit.co/free-stock-video/bridesmaid-helping-to-put-on-a-wedding-dress-5183/'),
    5206: ('A bride\'s hand on the groom\'s shoulder at their wedding', 'https://mixkit.co/free-stock-video/a-brides-hand-on-the-grooms-shoulder-at-their-wedding-5206/'),
    5224: ('Sequence of a decorated wedding table', 'https://mixkit.co/free-stock-video/sequence-of-a-decorated-wedding-table-5224/'),
    5190: ('Beautiful wedding dress hanging in a white room', 'https://mixkit.co/free-stock-video/beautiful-wedding-dress-hanging-in-a-white-room-5190/'),
    5213: ('Decorations on the ceiling of a wedding party', 'https://mixkit.co/free-stock-video/decorations-on-the-ceiling-of-a-wedding-party-5213/'),
    51655: ('A romantic dinner table adorned with lit candles, rose petals', 'https://mixkit.co/free-stock-video/a-romantic-dinner-table-adorned-with-lit-candles-rose-petals-51655/'),
    101211: ('Couple silhouette at colorful sunset', 'https://mixkit.co/free-stock-video/couple-silhouette-at-colorful-sunset-101211/'),
}
LIC_MIX = 'Mixkit Stock Video Free License, item page copyrightNotice "Free", read 26 Oct 2026 19.57 UTC'

def encode(src, base, w, h, vp9_crf, x264_crf):
    """One graded master (lossless intermediate) becomes webm VP9 and mp4 H.264."""
    run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', str(vp9_crf), '-row-mt', '1',
         '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', '-vf', f'scale={w}:{h}:flags=lanczos', os.path.join(OUT, base + '.webm')])
    run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-an', '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0', '-crf', str(x264_crf),
         '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-vf', f'scale={w}:{h}:flags=lanczos', os.path.join(OUT, base + '.mp4')])

def poster(src, t, base, sizes):
    png = os.path.join(TMP, base + '.png')
    run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', src, '-frames:v', '1', png])
    im = Image.open(png).convert('RGB'); out = []
    for w in sizes:
        r = im.resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS)
        r.save(os.path.join(OUT, f'{base}-{w}.webp'), quality=74, method=6); out.append([w, r.size[1]])
    return out

# ------------------------------------------------------------------ the hero, four cuts from one wedding, a seamless loop
# (clip, start, length, phone crop centre as a fraction of the width)
CUTS = [(5184, 2.8, 3.2, 0.42), (5183, 3.0, 4.0, 0.42), (5206, 1.0, 4.0, 0.30), (5224, 0.5, 4.0, 0.55), (5184, 2.0, 0.8, 0.42)]
XF = 0.8
def hero(kind):
    ins, fil = [], []
    for i, (c, s, d, cx) in enumerate(CUTS):
        ins += ['-ss', str(s), '-t', str(d), '-i', hd(c)]
        if kind == 'wide':
            g = 'scale=1600:900:flags=lanczos'
        else:  # 9:16 crop around the subject, 608 of 1920 wide
            x = max(0, min(1920 - 608, round(cx * 1920 - 304)))
            g = f'crop=608:1080:{x}:0,scale=720:1280:flags=lanczos'
        fil.append(f'[{i}:v]settb=AVTB,fps=24,{g},{GRADE},format=yuv420p[v{i}]')
    off, cur, length = 0, 'v0', CUTS[0][2]
    for i in range(1, len(CUTS)):
        off = length - XF
        fil.append(f'[{cur}][v{i}]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{i}]')
        cur = f'x{i}'; length = length + CUTS[i][2] - XF
    master = os.path.join(TMP, f'hero-{kind}.mkv')
    run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fil), '-map', f'[{cur}]', '-c:v', 'ffv1', master])
    return master, round(length, 2)

m_wide, L = hero('wide'); m_tall, _ = hero('tall')
encode(m_wide, 'hero', 1600, 900, 34, 25)
encode(m_tall, 'hero-tall', 540, 960, 35, 26)
MAN['hero'] = {'what': 'the hero film, four cuts from one Mixkit wedding shoot, crossfaded, ends on the frame it starts from',
               'length': L, 'cuts': [{'mixkit': c, 'title': MIX[c][0], 'page': MIX[c][1], 'from': s, 'seconds': d, 'sha256_1080p': sha(hd(c))} for c, s, d, _ in CUTS],
               'licence': LIC_MIX, 'grade': GRADE, 'files': ['hero.webm', 'hero.mp4', 'hero-tall.webm', 'hero-tall.mp4'],
               'poster': poster(m_wide, 0.0, 'hero-poster', (1600, 800)), 'posterTall': poster(m_tall, 0.0, 'hero-poster-tall', (540,))}

# ------------------------------------------------------------------ chapter films, forward then back so the loop never jumps
CHAPTERS = [('off', 5190, 6.5, 6.0, GRADE_OFF), ('blue', 5213, 8.4, 6.0, GRADE_BLUE), ('red', 51655, 2.0, 6.5, GRADE_RED), ('dance', 101211, 0.3, 8.2, GRADE)]
for key, c, s, d, g in CHAPTERS:
    master = os.path.join(TMP, f'{key}.mkv')
    fil = f'[0:v]settb=AVTB,fps=24,scale=1280:720:flags=lanczos,{g},format=yuv420p,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[o]'
    run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s), '-t', str(d), '-i', hd(c), '-filter_complex', fil, '-map', '[o]', '-c:v', 'ffv1', master])
    encode(master, key, 1280, 720, 37, 27)
    MAN[key] = {'what': f'chapter film, Mixkit {c}, {s} s for {d} s, played forward then back', 'mixkit': c, 'title': MIX[c][0], 'page': MIX[c][1],
                'licence': LIC_MIX, 'grade': g, 'sha256_1080p': sha(hd(c)), 'files': [f'{key}.webm', f'{key}.mp4'],
                'poster': poster(master, 0.0, f'{key}-poster', (1280, 640))}

# ------------------------------------------------------------------ Unsplash stills
STILLS = [('lace', 'DTLT9ESXM9s', 'https://unsplash.com/photos/grayscale-photo-of-beaded-lace-gown-DTLT9ESXM9s', 'Wedding Photography', 'Published on April 24, 2018'),
          ('veil', 'HqatjVNJ31A', 'https://unsplash.com/photos/a-white-dress-with-lace-HqatjVNJ31A', 'Meg Jenson', 'Published on August 12, 2022')]
for key, uid, page, by, pub in STILLS:
    p = os.path.join(SRC, 'us-orig', f'{uid}.jpg'); im = Image.open(p).convert('RGB'); sizes = []
    for w in (900, 560):
        r = im.resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS)
        r.save(os.path.join(OUT, f'{key}-{w}.webp'), quality=72, method=6); sizes.append([w, r.size[1]])
    MAN[key] = {'what': 'stand in still, Unsplash', 'unsplash': uid, 'page': page, 'by': by, 'published': pub,
                'licence': 'Unsplash License, the photo page reads "Free to use under the Unsplash License", read 26 Oct 2026 20.03 UTC',
                'fetched': 'images.unsplash.com, the og:image of its page, 2400 px wide', 'sha256': sha(p), 'sizes': sizes}

# ------------------------------------------------------------------ Elise, her own studio photos, no edit
ELISE = [('elise-bw', '8887369fb01c435db839dff61ac0ef8c', '/weddings', "Honey it's Handled_Elise Laeven", (1100, 640)),
         ('elise-sit', '6059565d1b3b4a6a9c4e0cbe5201d610', '/', "Honey it's Handled_Elise Laeven", (900, 520))]
for key, wid, page, alt, ws in ELISE:
    f = [x for x in os.listdir(ORIG) if x.startswith('42a973_' + wid)]; assert len(f) == 1, wid
    p = os.path.join(ORIG, f[0]); im = Image.open(p).convert('RGB'); sizes = []
    for w in ws:
        r = im.resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS)
        r.save(os.path.join(OUT, f'{key}-{w}.webp'), quality=76, method=6); sizes.append([w, r.size[1]])
    MAN[key] = {'what': 'her own studio photo', 'id': f[0], 'url': 'https://static.wixstatic.com/media/' + f[0], 'page': page,
                'altThere': alt, 'sha256': sha(p), 'edit': None, 'checked': 'zoomed at full size 26 Oct, no marks', 'sizes': sizes}

# ------------------------------------------------------------------ Events, her own photos and film, from v2's prepared media
v2 = json.load(open(os.path.join(V2, 'manifest.json')))
for key, ws in [('hall', (1067, 700)), ('tables', (1067, 700)), ('sign', (1100, 600)), ('lamp', (1000, 600)), ('tent', (1600, 900))]:
    sizes = []
    for w in ws:
        shutil.copy(os.path.join(V2, f'{key}-{w}.webp'), os.path.join(OUT, f'{key}-{w}.webp'))
        sizes.append([w, Image.open(os.path.join(OUT, f'{key}-{w}.webp')).size[1]])
    MAN[key] = dict(v2[key], sizes=sizes, via='build-v2/media, prepared from her original by art/prep_v2.py')
for f in ('night.webm', 'night.mp4'): shutil.copy(os.path.join(V2, f), os.path.join(OUT, f))
Image.open(os.path.join(V2, 'night-poster.jpg')).convert('RGB').save(os.path.join(OUT, 'night-poster.webp'), quality=74, method=6)
MAN['night'] = dict(v2['night'], files=['night.webm', 'night.mp4', 'night-poster.webp'], via='build-v2/media')
shutil.copy(os.path.join(V2, 'grain.png'), os.path.join(OUT, 'grain.png'))

json.dump(MAN, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
tot = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print('media', len(os.listdir(OUT)), 'files', round(tot / 1e6, 2), 'MB, hero', L, 's')
for f in sorted(os.listdir(OUT)):
    if f.endswith(('.webm', '.mp4')): print(' ', f, round(os.path.getsize(os.path.join(OUT, f)) / 1e6, 2), 'MB')
