#!/usr/bin/env python3
"""Every file in ../site fetched from the live URL and compared with the deployed copy, byte for byte by sha256 (HTML by
its visible text, since Netlify may rewrite a tag), plus a 404 control and the live title.
usage: python3 qa/livehash.py [base url]"""
import os, sys, hashlib, re, html, urllib.request, ssl, time
BASE = (sys.argv[1] if len(sys.argv) > 1 else 'https://astra-honeyitshandled-prototype.netlify.app').rstrip('/')
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
ctx = ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
def get(u):
    err = None
    for k in range(4):
        try:
            r = urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache'}), context=ctx, timeout=40)
            return r.status, r.read(), r.headers.get('content-type', '')
        except Exception as e:
            err = e; time.sleep(2 * (k + 1))
    return getattr(err, 'code', 0), b'', ''
def txt(b):
    s = b.decode('utf8', 'replace'); s = re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S)
    return ' '.join(html.unescape(re.sub(r'<[^>]+>', ' ', s)).split())
ok = bad = 0; bads = []; exact_html = []
for dp, dn, fn in os.walk(ROOT):
    for f in sorted(fn):
        p = os.path.join(dp, f); rel = os.path.relpath(p, ROOT)
        if rel == 'netlify.toml': continue
        u = BASE + '/' + (rel[:-len('index.html')] if rel.endswith('index.html') else rel)
        st, body, ct = get(u); loc = open(p, 'rb').read()
        if f.endswith('.html'):
            same = st == 200 and txt(body) == txt(loc)
            exact_html.append((rel, hashlib.sha256(body).hexdigest() == hashlib.sha256(loc).hexdigest(), len(body) - len(loc)))
        else:
            same = st == 200 and hashlib.sha256(body).hexdigest() == hashlib.sha256(loc).hexdigest()
        if same: ok += 1
        else: bad += 1; bads.append((rel, st, ct, len(body), len(loc)))
st404, b404, _ = get(BASE + '/definitely-not-here/')
t = re.search(rb'<title>(.*?)</title>', get(BASE + '/')[1])
print(ok, 'of', ok + bad, 'match', bads[:6])
print('html byte identical', exact_html)
print('404 control', st404, b'This page isn' in b404, '| title', html.unescape(t.group(1).decode()) if t else None)
