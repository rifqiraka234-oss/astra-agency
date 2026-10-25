import sys, glob
from PIL import Image
pre, cols = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 3
fs = sorted(f for f in glob.glob(f'/tmp/claude-0/saav/shots/{pre}-*.jpg') if 'sheet' not in f and 'full' not in f)
ims = [Image.open(f) for f in fs]
w = int(sys.argv[3]) if len(sys.argv) > 3 else 720
h = int(ims[0].height * w / ims[0].width)
rows = (len(ims) + cols - 1) // cols
s = Image.new('RGB', (cols * w + (cols - 1) * 8, rows * h + (rows - 1) * 8), 'black')
for i, im in enumerate(ims):
    s.paste(im.resize((w, h)), ((i % cols) * (w + 8), (i // cols) * (h + 8)))
s.save(f'/tmp/claude-0/saav/shots/{pre}-sheet.jpg', quality=72)
print(len(ims), s.size)
