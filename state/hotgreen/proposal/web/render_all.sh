#!/usr/bin/env bash
# Renders every example screen to assets/img/ex/<id>.webp. Needs a server on 8793 serving this folder.
set -e
cd "$(dirname "$0")"
python3 mocks.py && node render_mocks.js
python3 - <<'PY'
from PIL import Image
import glob,os
for f in sorted(glob.glob('assets/img/ex/*.png')):
    im=Image.open(f).convert('RGB'); w,h=im.size; im=im.resize((1500,round(h*1500/w)),Image.LANCZOS)
    im.save(f[:-4]+'.webp',quality=84,method=6); os.remove(f)
PY
python3 mocks.py --late && node render_mocks.js late
python3 - <<'PY'
from PIL import Image
import glob,os
for f in sorted(glob.glob('assets/img/ex/*.png')):
    im=Image.open(f).convert('RGB'); w,h=im.size; im=im.resize((1500,round(h*1500/w)),Image.LANCZOS)
    im.save(f[:-4]+'.webp',quality=84,method=6); os.remove(f)
for f in sorted(glob.glob('assets/img/ex/*.webp')): print(os.path.basename(f), Image.open(f).size, os.path.getsize(f)//1024,'KB')
PY
