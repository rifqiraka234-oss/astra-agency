#!/usr/bin/env python3
"""Her own photos and film, resized for the build. Originals were downloaded from honeyitshandled.com on 26 Oct 2026
(static.wixstatic.com/media/<id>, the files her pages serve) into the session scratchpad, which the build doesn't keep.
Writes ../media/<key>-<w>.jpg and .webp and ../media/manifest.json with each file's source id, the page it sits on, its
alt text there, the sha256 of the original, and any crop. Run once, the build reads the manifest."""
import os, json, hashlib, shutil
from PIL import Image
B = os.path.dirname(os.path.abspath(__file__))
SRC = os.environ.get('HIH_ORIG', '/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/honeyproto/media/orig')
FILM = os.environ.get('HIH_FILM', '/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/honeyproto/media/film')
OUT = os.path.join(B, '..', 'media')

# key, wix id, page it's on, alt text on that page (read 26 Oct, 11.58 UTC render), widths, crop (l, t, r, b) as fractions
PICKS = [
    ('elise-play', '42a973_b81dcffa835148faa694db932822a92f~mv2.jpg', '/about', "Honey it's Handled - Elise Laeven", (520, 900, 1400), None),
    ('elise-sit', '42a973_6059565d1b3b4a6a9c4e0cbe5201d610~mv2.jpg', '/ (Meet Elise)', "Honey it's Handled_Elise Laeven", (520, 900), None),
    ('elise-laptop', '42a973_ae0d2b8efaf7447a84e8195730b7f4f4~mv2.jpg', '/about', "Honey it's Handled - Elise Laeven", (520, 900), None),
    ('elise-phone', '42a973_05bb1bcabb13435d9f57c052465e628f~mv2.jpg', '/contact', "Honey it's Handled_Elise Laeven", (520, 900), None),
    ('elise-walk', '42a973_bcd60d05f5474a8f9560b88f7530b55a~mv2.jpg', '/about', "Honey it's Handled - Elise Laeven", (520, 900), None),
    ('env-tiles', '42a973_68e0f87cfc4b49038f8572369a98e84f~mv2.jpg', '/weddings', 'HIH-ENVELOPPE-1', (600, 1100), None),
    ('env-wall', '42a973_a0f125befb07444dafb821e7f7db4aa4~mv2.jpg', '/contact', "Honey it's Handled - enveloppe", (600, 1100), None),
    ('cc-sign', '42a973_427f62a1f26148caaf6c412ba7c974b6~mv2.jpg', '/ (glimpse)', "Honey it's Handled_Cinco Cero_9", (520, 900), None),
    ('cc-disco', '42a973_2dc29647937646469164f7f8fa16dbf0~mv2.jpg', '/ (glimpse) and Cinco Cero gallery', "Honey it's Handled_Cinco Cero_8", (520, 900), None),
    ('cc-tent', '42a973_3eba9b82e35c44a085882fdc52efea3d~mv2.jpg', '/kopie-van-foto-s-pla-26 (Cinco Cero photos page)', '', (700, 1200), None),
    ('cc-lamp', '42a973_aaf7225387334fcf8e88c6fb217f24e4~mv2.jpg', '/cincocero (was /kopie-van-events-1)', "Honey it's Handled - Cinco Cero", (520, 900), None),
    ('pl-above', '42a973_f107cefb41c441579cfb9880226dd3a9~mv2.jpg', '/proleagueawards (was /kopie-van-events)', 'Pro League Awards - 035 - by Kaat DM.jpg', (520, 900), (0.0, 0.0, 1.0, 0.475)),   # cropped above the nearest table card
    ('pl-tables', '42a973_9e35ce1e33aa4252b89e45bd143d51cb~mv2.jpg', '/ (glimpse) and Pro League photos', 'Pro League Awards - 027 - by Kaat DM.jpg', (520, 900), None),
    ('pl-hall', '42a973_f181779ca0d8460eb26ea5d57717a6ca~mv2.jpg', '/proleagueawards (was /kopie-van-events)', 'Pro League Awards - 011 - by Kaat DM.jpg', (700, 1200), (0.0, 0.0, 1.0, 0.655)),   # cropped above the sponsor wall in the ground floor arcade
    ('pl-beurs', '42a973_7624387b3435405fb8a11ec168872998~mv2.jpg', '/private-events and / (glimpse)', 'Pro League Awards - 001 - by Kaat DM.jpg', (520, 900), None),
]

def sha(p):
    return hashlib.sha256(open(p, 'rb').read()).hexdigest()

def main():
    os.makedirs(OUT, exist_ok=True)
    man = {}
    for key, wid, page, alt, widths, crop in PICKS:
        src = os.path.join(SRC, wid)
        im = Image.open(src).convert('RGB')
        if crop:
            W, H = im.size
            im = im.crop((round(crop[0] * W), round(crop[1] * H), round(crop[2] * W), round(crop[3] * H)))
        sizes = []
        for w in widths:
            w = min(w, im.size[0])
            h = round(im.size[1] * w / im.size[0])
            r = im.resize((w, h), Image.LANCZOS)
            r.save(os.path.join(OUT, f'{key}-{w}.jpg'), quality=80, optimize=True, progressive=True)
            r.save(os.path.join(OUT, f'{key}-{w}.webp'), quality=76, method=6)
            sizes.append([w, h])
        man[key] = {'id': wid, 'url': 'https://static.wixstatic.com/media/' + wid, 'page': 'https://www.honeyitshandled.com' + page.split(' ')[0],
                    'onPage': page, 'altThere': alt, 'sha256': sha(src), 'crop': crop, 'sizes': sizes}
    for f in ('night.webm', 'night.mp4', 'night-poster.jpg'):
        shutil.copy(os.path.join(FILM, f), os.path.join(OUT, f))
    man['night'] = {'id': '42a973_5f3af2a4edee4ae89f88decc764ab82c', 'url': 'https://video.wixstatic.com/video/42a973_5f3af2a4edee4ae89f88decc764ab82c/1080p/mp4/file.mp4',
                    'page': 'https://www.honeyitshandled.com/cincocero', 'onPage': 'Cinco Cero aftermovie, 76.35 s',
                    'cut': '44.0 to 46.6 s and 56.1 to 57.7 s, 960 x 540, no sound', 'sha256': sha(os.path.join(FILM, 'cincocero.mp4'))}
    json.dump(man, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
    print(len(man), 'entries')

if __name__ == '__main__':
    main()
