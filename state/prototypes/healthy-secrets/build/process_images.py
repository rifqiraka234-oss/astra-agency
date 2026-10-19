#!/usr/bin/env python3
"""Resizes the chosen client images into site/assets/img and writes the provenance table.

Sources are the research pass downloads (scratchpad hs/img), every one the client's own
(their website, their Instagram, or the four Gastro.News photos credited "© Healthy Secrets").
"""
import os
import sys
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/hs/img'
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'site', 'assets', 'img')
os.makedirs(OUT, exist_ok=True)

# name, source, width, kind, where it came from, what is in the frame (observed)
PICKS = [
    ('siblings', 'press/gastronews_healthy-secrets-geschwister.jpg', 1600, 'photo', 'gastro.news 14 Oct 2026, credited © Healthy Secrets', 'The three siblings and a dog at a bistro table outside the café under the red and white awning'),
    ('interior', 'press/gastronews_healthy-secrets-interior.jpg', 1100, 'photo', 'gastro.news 14 Oct 2026, credited © Healthy Secrets', 'Inside the café, armchair, red stool, letter board menu, ladder stair, shelves'),
    ('table', 'press/gastronews_healthy-secrets-muesli.jpg', 1100, 'photo', 'gastro.news 14 Oct 2026, credited © Healthy Secrets', 'Frozen yoghurt with granola in a dotted cup, latte, espresso on a checker plate table'),
    ('drinks', 'press/gastronews_healthy-secrets-drinks.jpg', 1000, 'photo', 'gastro.news 14 Oct 2026, credited © Healthy Secrets', 'Three hands holding bottled drinks out of the café door'),
    ('ladder', 'instagram/ig09_DePUdZECghV_thumb.jpg', 760, 'photo', 'Instagram @healthysecrets_at, post DePUdZECghV', 'Café interior, checker plate table with frozen yoghurt and coffee, ladder stair'),
    ('rosi', 'instagram/ig10_DeMvsl7CjYF_thumb.jpg', 760, 'photo', 'Instagram @healthysecrets_at, post DeMvsl7CjYF, caption names the dog Chefin Rosi', 'A spaniel licking frozen yoghurt from a dotted cup'),
    ('opening', 'instagram/ig00_DepEBKBjvMO_c01.jpg', 900, 'photo', 'Instagram @healthysecrets_at, post DepEBKBjvMO (opening day, 18 Oct)', 'Guests outside the café on opening day holding up drinks, blue flag on the facade'),
    ('bottle', 'instagram/ig00_DepEBKBjvMO_c03.jpg', 900, 'photo', 'Instagram @healthysecrets_at, post DepEBKBjvMO (opening day)', 'Hands opening a bottled drink at a checker plate table'),
    ('matcha', 'instagram/ig29_DdUF8Jmj5Vs_thumb.jpg', 760, 'photo', 'Instagram @healthysecrets_at, post DdUF8Jmj5Vs', 'A man drinking a green matcha drink under the striped awning'),
    ('doorway', 'instagram/ig24_DdmJjybjh-D_c01.jpg', 900, 'photo', 'Instagram @healthysecrets_at, post DdmJjybjh-D', 'A man leaning in the café doorway beside the display window and awning'),
    ('moonmilk', 'instagram/ig24_DdmJjybjh-D_c02.jpg', 900, 'photo', 'Instagram @healthysecrets_at, post DdmJjybjh-D', 'A smiling woman holding a Moon Milk Fibre Flow pouch'),
    ('wheel', 'instagram/ig00_DepEBKBjvMO_c06.jpg', 900, 'photo', 'Instagram @healthysecrets_at, post DepEBKBjvMO (opening day); post DejRW75jlY3 announced the Glücksrad', 'A hand turning a hand lettered prize wheel outside the café'),
    ('outside', 'instagram/ig05_DeexWnDADJw_thumb.jpg', 760, 'photo', 'Instagram @healthysecrets_at, post DeexWnDADJw', 'Three bottled drinks held out of the café door, a bistro table and folding chairs on the pavement'),
    ('kitchen1', 'site/aadec6_4f44174a88154768b46290505830d7c3_mv2.jpg', 1000, 'photo', 'healthysecrets.at home page shop tile', 'Black and white, two people in hairnets at a steel bench in a commercial kitchen'),
    ('kitchen2', 'site/aadec6_547dbb06a8cb4c7585dbd2b0ffcc84f2_mv2.jpg', 1100, 'photo', 'healthysecrets.at home page shop tile', 'Black and white, a person at a combi oven in a tiled commercial kitchen'),
    ('granola', 'site/aadec6_ee8f729bb6d840af8fdb6fb1686d645c_mv2.jpg', 1100, 'photo', 'healthysecrets.at granola page', 'Close up of the Red Berry Mix granola'),
    ('p-chai', 'site/aadec6_ff79bf44953045a6ab89d8a0d1a0125a_mv2.png', 900, 'photo', 'healthysecrets.at product page chai-latte-fibre-flow', 'Chai Latte Fibre Flow pouch on a sky background'),
    ('p-moon', 'site/aadec6_34fa2757f7d4486d9b32eb68ded155b3_mv2.png', 900, 'photo', 'healthysecrets.at product page moon-milk-fibre-flow', 'Moon Milk Fibre Flow pouch on a sky background'),
    ('p-matcha', 'site/aadec6_fa4cd3adb0ba44cd94a84629a4025c14_mv2.png', 900, 'photo', 'healthysecrets.at product page shaping-secret', 'Matcha Latte Fibre Flow pouch on a sky background'),
    ('p-muesli', 'site/aadec6_dcc5c15556f24e7bab83058e50256b83_mv2.png', 900, 'photo', 'healthysecrets.at product page omega-3-müsli-red-berry-mix-300g', 'Omega-3 Müsli Red Berry Mix pouch on a sky background'),
    ('p-brot', 'site/aadec6_736864eb6ea14908becc25fe13f75707_mv2.png', 900, 'photo', 'healthysecrets.at product page haferbrot-backmischung-500g', 'Haferbrot Backmischung pouch on a sky background'),
    ('p-lullaby', 'site/aadec6_49fee10b7cb047c886064ec2764a73d4_mv2.png', 900, 'photo', 'healthysecrets.at product page calming-secret-tea', 'Lullaby Leaves jar on a sky background'),
    ('p-slim', 'site/aadec6_03229674429f45c6ab36f7dde8352108_mv2.png', 900, 'photo', 'healthysecrets.at product page slimming-secret-tea', 'Slimming Sips jar on a sky background'),
    ('m-bear', 'site/aadec6_bfdd7aa0b205455d8991c40f8c571143_mv2.png', 520, 'cutout', 'healthysecrets.at mascot, also their favicon', 'Beige bear holding a cup, speech bubble "I ♥ Darmgesundheit"'),
    ('m-antler', 'site/aadec6_0574ed84ce214c5086d852393d35287d_mv2.png', 520, 'cutout', 'healthysecrets.at mascot', 'Orange antlered creature drinking from a teacup'),
    ('m-matcha', 'site/aadec6_9a28af0ade554071ba6d3ca8636eece8_mv2.png', 520, 'cutout', 'healthysecrets.at mascot', 'Cream fox like creature sipping a matcha drink'),
    ('m-heart', 'site/aadec6_b97e7be7022c4d9c993dc4400858b550_mv2.png', 520, 'cutout', 'healthysecrets.at mascot', 'Golden creature hugging a heart'),
    ('m-sitz', 'site/aadec6_bdc59f3e0d32461c855678c1efc7b3bf_mv2.png', 640, 'cutout', 'healthysecrets.at mascot', 'Fox in an armchair with matcha, antlered creature beside it'),
    ('m-bunny', 'site/aadec6_8e321b061db4446583f1707875096690_mv2.png', 520, 'cutout', 'healthysecrets.at mascot, also on the Chai Latte label', 'Grey bunny holding a bowl of cereal'),
    ('logo-gold', 'logo/logo_gold.png', 600, 'cutout', 'healthysecrets.at "Logo Gold"', 'Circular wordmark with two crossed keys, gold'),
    ('logo-line', 'logo/logo_schwarz_line.png', 600, 'cutout', 'healthysecrets.at "Logo Schwarz"', 'Circular wordmark with two crossed keys, black line'),
]

CLEAN = {'m-sitz'}
KEEP_PNG = {'logo-gold'}


def run():
    rows = []
    for name, rel, width, kind, origin, what in PICKS:
        im = Image.open(os.path.join(SRC, rel))
        if kind == 'cutout':
            im = im.convert('RGBA')
            if name in CLEAN:  # faint semi transparent box behind the drawing in the source file
                a = im.getchannel('A').point(lambda v: 0 if v < 100 else v)
                w, h = a.size  # plus a one pixel frame line around the canvas
                for box in ((0, 0, w, 4), (0, h - 4, w, h), (0, 0, 4, h), (w - 4, 0, w, h)):
                    a.paste(0, box)
                im.putalpha(a)
            bbox = im.getbbox()
            if bbox:
                im = im.crop(bbox)
        else:
            im = im.convert('RGB')
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        if kind == 'cutout':
            if name in KEEP_PNG:  # the site only serves webp, the gold logo png stays as the master
                im.save(os.path.join(OUT, f'{name}.png'), optimize=True)
            fn2 = f'{name}.webp'
            im.save(os.path.join(OUT, fn2), 'WEBP', quality=86, method=6)
        else:
            fn2 = f'{name}.webp'
            im.save(os.path.join(OUT, fn2), 'WEBP', quality=78, method=6)
        rows.append((fn2, im.size, os.path.getsize(os.path.join(OUT, fn2)), origin, what, rel))
    fav = Image.open(os.path.join(SRC, 'logo/logo_gold.png')).convert('RGBA')
    fav = fav.crop(fav.getbbox()).resize((64, 64), Image.LANCZOS)
    fav.save(os.path.join(OUT, 'favicon.png'), optimize=True)
    with open(os.path.join(HERE, '..', 'research', 'asset-provenance.md'), 'w') as f:
        f.write('# Asset provenance\n\nEvery image on the site is the client\'s own. Built by build/process_images.py.\n\n')
        f.write('| File | Size | Bytes | Where it came from | What is in the frame | Research file |\n|---|---|---|---|---|---|\n')
        for fn, sz, b, o, w, rel in rows:
            f.write(f'| {fn} | {sz[0]}x{sz[1]} | {b} | {o} | {w} | {rel} |\n')
    print(len(rows), 'images,', sum(r[2] for r in rows) // 1024, 'KB total')


if __name__ == '__main__':
    run()
