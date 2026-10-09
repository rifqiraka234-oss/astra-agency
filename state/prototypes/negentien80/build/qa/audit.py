import re,sys
t=open(sys.argv[1],encoding='utf-8').read()
url=re.compile(r'(https?://\S+|[\w.-]+\.(?:nl|com|org)/\S*|[\w.-]+@[\w.-]+|\b[\w-]+\.(?:nl|com)\b)')
ALLOW=['Molendijk-Zuid',"'s-Hertogenbosch",'’s-Hertogenbosch','Net Iets-Anders','Overtoom 135-137','Noord-Brabant','NOORD-BRABANT']
def audit(lines):
    col=[];dash=[]
    for l in lines:
        x=url.sub('',l)
        for a in ALLOW: x=x.replace(a,'')
        if ':' in x: col.append(l)
        if re.search('[-‐-―−]',x): dash.append(l)
    return col,dash
lines=sorted(set(l.strip() for l in t.split('\n') if l.strip()))
c,d=audit(lines); print('visible lines',len(lines),'| colon lines',len(c),c,'| dash lines',len(d),d)
c2,d2=audit(['Prijs: 10','Rail – roede','Een full-service dealer','Totaal — incl','Maat − 5','Molendijk-Zuid 18','https://negentien80.nl/full-service-dealers/'])
print('control, colon caught',len(c2),'of 1, dash caught',len(d2),'of 4, allowed passed', 'Molendijk-Zuid 18' not in d2 and not any('https' in x for x in d2))
en=t[t.find('IN ENGLISH, FOR RAMONA'):]; en=en[:en.find('NEGENTIEN80\nMolendijk')]
cons=re.findall(r"\b(?:it's|that's|doesn't|nothing's|one's|what's|isn't|don't|can't|won't|they're|we're|you're|it'll|there's|here's)\b",en,flags=re.I)
print('English contractions',len(cons),cons)
