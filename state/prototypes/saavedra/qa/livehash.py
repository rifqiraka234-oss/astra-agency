import hashlib, os, subprocess, sys
root, base = sys.argv[1], sys.argv[2]
same = diff = bad = 0
for dp, dn, fn in os.walk(root):
    for f in sorted(fn):
        p = os.path.join(dp, f); rel = os.path.relpath(p, root)
        if rel == 'netlify.toml': continue
        url = base + '/' + (rel[:-10] if rel.endswith('index.html') else rel)
        r = subprocess.run(['curl', '-sS', '-L', '--retry', '3', '-o', '/tmp/claude-0/saav/qa/_live', '-w', '%{http_code}', url], capture_output=True, text=True)
        code = r.stdout.strip()
        if code != '200': bad += 1; print('HTTP', code, url); continue
        a = hashlib.sha256(open(p, 'rb').read()).hexdigest(); b = hashlib.sha256(open('/tmp/claude-0/saav/qa/_live', 'rb').read()).hexdigest()
        if a == b: same += 1
        else: diff += 1; print('DIFF', rel, os.path.getsize(p), os.path.getsize('/tmp/claude-0/saav/qa/_live'))
print(base, 'identical', same, 'different', diff, 'not 200', bad)
