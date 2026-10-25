import numpy as np, potrace, json, sys
from PIL import Image, ImageFilter
src='/home/user/astra-agency/state/prototypes/bebetter/research/assets/own/BeBetter-2_67e6acc4-9405-40ca-bc1d-bbe4bd3d0d18.png'
im=Image.open(src).convert('RGB'); W,H=im.size
im=im.crop((0,0,W,int(H*0.80)))
S=4
big=im.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.6))
a=np.asarray(big).astype(float)/255
lum=a@np.array([.299,.587,.114])
def trace(mask, turd=10):
    bm=potrace.Bitmap(~mask)
    p=bm.trace(turdsize=turd,turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,alphamax=1.1,opticurve=True,opttolerance=0.35)
    d=[]
    for c in p:
        sp=c.start_point; d.append(f'M{sp.x/S:.1f} {sp.y/S:.1f}')
        for s in c.segments:
            if s.is_corner: d.append(f'L{s.c.x/S:.1f} {s.c.y/S:.1f}L{s.end_point.x/S:.1f} {s.end_point.y/S:.1f}')
            else: d.append(f'C{s.c1.x/S:.1f} {s.c1.y/S:.1f} {s.c2.x/S:.1f} {s.c2.y/S:.1f} {s.end_point.x/S:.1f} {s.end_point.y/S:.1f}')
        d.append('Z')
    return ''.join(d)
# silhouette, everything not background, closed and holes filled
from scipy import ndimage
sil=lum>0.06
sil=ndimage.binary_closing(sil,iterations=10)
sil=ndimage.binary_fill_holes(sil)
lab,n=ndimage.label(sil); sizes=ndimage.sum(sil,lab,range(1,n+1)); sil=lab==(np.argmax(sizes)+1)
blue=((a[...,2]-a[...,0])>0.10)&(lum>0.12)&sil
layers=[('sil',sil,0),('t1',(lum>0.16)&sil&~blue,1),('t2',(lum>0.34)&sil&~blue,2),('t3',(lum>0.56)&sil,3),('t4',(lum>0.78)&sil,4),('blue',blue,5)]
out=[]
for name,m,i in layers:
    d=trace(m, 14 if name!='t4' else 8)
    out.append((name,d))
    print(name,int(m.sum()),len(d))
w,h=im.size
json.dump({'w':w,'h':h,'layers':out},open('/tmp/claude-0/bb/ted/teddy-vec.json','w'))
cols={'sil':'#0e0a08','t1':'#5a3a26','t2':'#a8703f','t3':'#d9a26a','t4':'#f6dcb0','blue':'#3b3fae'}
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill-rule="evenodd">'+''.join(f'<path fill="{cols[n]}" d="{d}"/>' for n,d in out)+'</svg>'
open('/tmp/claude-0/bb/ted/teddy.svg','w').write(svg); print('svg bytes',len(svg))
