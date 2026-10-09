import json,sys
src,data,rents,out=sys.argv[1:5]
s=open(src,encoding='utf-8').read()
d=open(data).read().strip(); r=open(rents).read().strip()
assert s.count('__DATA__')==1 and s.count('__RENTS__')==1
s=s.replace('__DATA__',d).replace('__RENTS__',r)
open(out,'w',encoding='utf-8').write(s)
print(out,len(s.encode()))
