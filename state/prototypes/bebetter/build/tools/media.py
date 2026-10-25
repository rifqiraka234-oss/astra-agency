#!/usr/bin/env python3
"""Their own photos, from their LinkedIn posts, resized for the site. Crops remove third party marks, said per photo.
Writes build/media/<name>.jpg (1600 wide at most) and <name>-800.jpg, and build/data/photos.json with the sizes."""
import glob
import json
import os
from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(HERE, '..', 'research', 'assets', 'own')
OUT = os.path.join(HERE, 'media')

# name: (source number, crop box as fractions or None, why)
PHOTOS = {
    'p-arena': ('05', None, 'teddy in the empty EVLS hall, Prague, post of 9 Oct 2026'),
    'p-pose': ('06', None, 'teddy posing in the EVLS hall, post of 9 Oct 2026'),
    'p-crowd': ('01', None, 'people at the stand rails, EVLS Prague, post of 21 Oct 2026'),
    'p-bag': ('03', (0, .13, 1, 1), 'a BeBetter bag handed over at the stand. Top 13 percent cropped, a BOSS logo on a shirt'),
    'p-builder': ('04', (0, 0, .76, 1), 'a Teddy Builder back print, worn at the stand. Right side cropped, Monster and AmpLife crates'),
    'p-fibo': ('17', None, 'the FIBO stand with the Teddy Builder tee and boxes, post of 23 Apr 2026'),
    'p-wall': ('26', None, 'the teddy wall at the FIBO stand, post of 15 Apr 2026'),
    'p-fibo2': ('27', None, 'the FIBO stand with the roll up banner, post of 15 Apr 2026'),
    'p-siggis': ('22', None, 'the SIGGI\'S stand in Breda with the roll up banner, post of 1 May 2026'),
    'k-siem': ('08', None, 'Team Siem kit, front and back, post of 29 Jun 2026'),
    'k-human': ('10', None, 'Human Sports kit, back, post of 29 Jun 2026'),
    'k-ag': ('11', None, 'American Gym Antwerp kit, front and back, post of 29 Jun 2026'),
    'k-summer': ('12', None, 'BeBetter Summer Club embroidery, post of 29 Jun 2026'),
}


def main():
    os.makedirs(OUT, exist_ok=True)
    meta = []
    for name, (n, crop, why) in PHOTOS.items():
        src = glob.glob(os.path.join(SRC, n + '-*.jpg'))[0]
        im = Image.open(src).convert('RGB')
        if crop:
            W, H = im.size
            im = im.crop((round(crop[0] * W), round(crop[1] * H), round(crop[2] * W), round(crop[3] * H)))
        big = im.copy()
        if big.width > 1600:
            big = big.resize((1600, round(big.height * 1600 / big.width)), Image.LANCZOS)
        big.save(os.path.join(OUT, name + '.jpg'), quality=80, optimize=True, progressive=True)
        small = im.resize((800, round(im.height * 800 / im.width)), Image.LANCZOS) if im.width > 800 else im
        small.save(os.path.join(OUT, name + '-800.jpg'), quality=70, optimize=True, progressive=True)
        meta.append({'name': name, 'src': os.path.basename(src), 'why': why, 'w': big.width, 'h': big.height})
        print(name, big.size, os.path.getsize(os.path.join(OUT, name + '.jpg')), os.path.getsize(os.path.join(OUT, name + '-800.jpg')))
    json.dump(meta, open(os.path.join(HERE, 'data', 'photos.json'), 'w'), indent=1)


if __name__ == '__main__':
    main()
