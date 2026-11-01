import json, os
here = os.path.dirname(os.path.abspath(__file__))
paths = json.load(open(os.path.join(here, 'paths.json')))
t = open(os.path.join(here, 'index.tpl.html')).read()
t = t.replace('{{BREAKOUT}}', paths['breakout']).replace('{{B}}', paths['b']).replace('{{X}}', paths['x'])
assert '{{' not in t
open(os.path.join(here, '..', 'site', 'index.html'), 'w').write(t)
print('built', len(t), 'bytes')
