import os,sys,hashlib,re,html,urllib.request,ssl,time
ctx=ssl.create_default_context(cafile='/root/.ccr/ca-bundle.crt')
def get(u):
    for k in range(4):
        try:
            r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0','Cache-Control':'no-cache'}),context=ctx,timeout=40)
            return r.status,r.read(),r.headers.get('content-type','')
        except Exception as e:
            err=e; time.sleep(2*(k+1))
    return getattr(err,'code',0),b'',''
def txt(b):
    s=b.decode('utf8','replace'); s=re.sub(r'<script.*?</script>|<style.*?</style>','',s,flags=re.S); return ' '.join(html.unescape(re.sub(r'<[^>]+>',' ',s)).split())
for d,base in [('site','https://astra-faeclub-prototype.netlify.app'),('site-plan','https://astra-faeclub-plan.netlify.app')]:
    root='/home/user/astra-agency/state/prototypes/faeclub/'+d; ok=bad=0; bads=[]
    for dp,dn,fn in os.walk(root):
        for f in fn:
            p=os.path.join(dp,f); rel=os.path.relpath(p,root)
            if rel=='netlify.toml': continue
            u=base+'/'+rel.replace('index.html','') if rel.endswith('index.html') else base+'/'+rel
            st,body,ct=get(u); loc=open(p,'rb').read()
            if f.endswith('.html'): same = st==200 and txt(body)==txt(loc)
            else: same = st==200 and hashlib.sha256(body).hexdigest()==hashlib.sha256(loc).hexdigest()
            if same: ok+=1
            else: bad+=1; bads.append((rel,st,ct,len(body),len(loc)))
    st,body,ct=get(base+'/definitely-not-here/')
    t=re.search(rb'<title>(.*?)</title>',get(base+'/')[1]); 
    print(d, ok,'of',ok+bad,'match', bads[:5], '| 404 control', st, '| title', t.group(1).decode() if t else None)
