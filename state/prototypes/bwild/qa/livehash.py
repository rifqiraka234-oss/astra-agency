"""Fetch every file of a deployed site and compare sha256 with the local copy. usage: python3 livehash.py <dir> <base url>"""
import hashlib, os, sys, subprocess
root, base = sys.argv[1], sys.argv[2].rstrip('/')
ok = bad = 0; title = None
for d, _, fs in os.walk(root):
    for f in fs:
        p = os.path.join(d, f); rel = os.path.relpath(p, root)
        url = base + '/' + ('' if rel == 'index.html' else rel)
        r = subprocess.run(['curl', '-s', '-m', '60', '-o', '-', '-w', '%{http_code}', url], capture_output=True)
        body, code = r.stdout[:-3], r.stdout[-3:].decode()
        loc = open(p, 'rb').read()
        same = hashlib.sha256(body).hexdigest() == hashlib.sha256(loc).hexdigest()
        if rel == 'index.html':
            import re; title = re.search(rb'<title>(.*?)</title>', body); title = title.group(1).decode() if title else None
        if code == '200' and same: ok += 1
        else: bad += 1; print('DIFF', code, rel, len(body), len(loc))
print(base, 'files', ok + bad, 'match', ok, 'differ', bad, 'title', title)
