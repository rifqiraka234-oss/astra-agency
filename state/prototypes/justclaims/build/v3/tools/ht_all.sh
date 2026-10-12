#!/bin/sh
# Prints every halftone still for v3 with the site's own shader, then packs each PNG down to a small palette.
# Run from state/prototypes/justclaims. Sources are the stock files in assets/stock (see assets/PROVENANCE.md)
# and the client's portraits as verified on v1 (site/assets/img/people, byte identical to the client's own files).
set -e
R="node build/v3/tools/ht_render.js"; O=site-v3/assets/img/ht; T=$(mktemp -d)
$R site-v3/assets/film/03-wall-clock-mixkit28886-poster.jpg $T/hero.png 560 616 '{"pitch":4.2,"lo":0.22,"hi":0.95,"gam":1.15,"fx":0.5,"fy":0.42}' 1.5
$R assets/stock/photos/09-runway-edge-lights-dusk-pexels3768652.jpg $T/runway.png 1600 460 '{"pitch":4.5,"ink2":"#FFC629","a2":15,"lo":0.25,"hi":1,"gam":1.2,"ylo":0.08,"yhi":0.4,"fy":0.72}' 1.25
$R assets/stock/photos/05-apron-markings-dusk-pexels13343113.jpg $T/apron.png 720 480 '{"pitch":4.5,"ink2":"#FFC629","a2":15,"lo":0.5,"hi":1.0,"gam":1.15,"ylo":0.1,"yhi":0.28}' 1.5
$R site/assets/img/people/ulrich-steppler.jpg $T/steppler.png 320 320 '{"pitch":2.6,"lo":0.05,"hi":0.92,"gam":1.25,"fx":0.5,"fy":0.35}' 2
$R site/assets/img/people/katja-brecke.jpg $T/brecke.png 320 320 '{"pitch":2.6,"lo":0.05,"hi":0.92,"gam":1.25,"fx":0.5,"fy":0.3,"zoom":1.45}' 2
$R assets/stock/photos/03-winglet-dusk-sky-pexels33337082.jpg $T/winglet.png 640 520 '{"pitch":4,"ink2":"#FFC629","a2":15,"lo":0.5,"hi":1.0,"gam":1.25,"ylo":0.06,"yhi":0.3,"fx":0.8,"fy":0.4}' 1.5
$R assets/stock/photos/02-cabin-window-sunrise-pexels4657595.jpg $T/window.png 640 520 '{"pitch":4,"ink2":"#FFC629","a2":15,"lo":0.42,"hi":1.0,"gam":1.2,"ylo":0.12,"yhi":0.45,"fx":0.62,"fy":0.5}' 1.5
$R assets/stock/photos/01-wing-engine-clouds-dusk-pexels2387803.jpg $T/wing.png 640 520 '{"pitch":4,"ink2":"#FFC629","a2":15,"lo":0.12,"hi":0.92,"gam":1.2,"ylo":0.1,"yhi":0.3,"fx":0.55,"fy":0.6}' 1.5
$R assets/stock/photos/06-rain-glass-night-lights-pexels20768044.jpg $T/rain.png 640 520 '{"pitch":4,"lo":0.55,"hi":1.0,"gam":1.1,"fx":0.5,"fy":0.35}' 1.5
$R assets/stock/photos/04-runway-light-trails-night-pexels732142.jpg $T/trails.png 640 520 '{"pitch":4,"lo":0.6,"hi":1.0,"gam":1.1,"fx":0.45,"fy":0.5}' 1.5
$R assets/stock/photos/07-rain-glass-fogged-pexels8628343.jpg $T/fog.png 640 520 '{"pitch":4,"ink2":"#FFC629","a2":15,"lo":0.5,"hi":1.0,"gam":1.2,"ylo":0.05,"yhi":0.25,"fx":0.5,"fy":0.5}' 1.5
$R assets/stock/photos/05-apron-markings-dusk-pexels13343113.jpg $T/apron2.png 640 520 '{"pitch":4,"ink2":"#FFC629","a2":15,"lo":0.5,"hi":1.0,"gam":1.15,"ylo":0.1,"yhi":0.28,"fx":0.3,"fy":0.75}' 1.5
python3 - "$T" "$O" <<'EOF'
# Quantise to the inks actually printed, paper, black, yellow and their overprints at a few dot edge levels,
# so a small spot of yellow is never averaged away the way a median cut palette does.
import sys, os
from PIL import Image
T, O = sys.argv[1], sys.argv[2]; os.makedirs(O, exist_ok=True)
hx = lambda h: tuple(int(h[i:i+2], 16) / 255 for i in (1, 3, 5))
P, K, Y = hx('#EAEBE6'), hx('#121514'), hx('#FFC629')
lv = [0, .2, .4, .6, .8, 1]
cols = []
for k1 in lv:
    for k2 in lv:
        cols.append(tuple(round(255 * P[c] * (1 - k1 + k1 * K[c]) * (1 - k2 + k2 * Y[c])) for c in range(3)))
pal = Image.new('P', (1, 1)); flat = [v for c in cols for v in c]; pal.putpalette(flat + flat[:3] * (256 - len(cols)))
for f in sorted(os.listdir(T)):
    im = Image.open(os.path.join(T, f)).convert('RGB')
    q = im.quantize(palette=pal, dither=Image.Dither.NONE)
    q.save(os.path.join(O, f), optimize=True)
    print(f, im.size, os.path.getsize(os.path.join(O, f)))
EOF
rm -rf "$T"
