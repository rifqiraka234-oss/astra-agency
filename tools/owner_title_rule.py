# Raka 2026-10-04: only CEO, owner, founder or co-founder. The connect note says "I'm a business owner too".
import re
YES=re.compile(r"(founder|co-?founder|cofounder|\bowner\b|co-?owner|\bceo\b|chief executive officer|eigena(a)?r|eigenares|oprichter|oprichtster|gr[üu]nder|inhaber|fondat(eur|rice)|propri[ée]taire|proprietor|praktijkhouder|\bpdg\b|pr[ée]sident[- ]directeur g[ée]n[ée]ral|founding (director|partner)|chef(fe)?\s*(d['’ ]?\s*)?entreprise|besitzer(in)?\b|g[ée]rante? associ[ée]e?|associ[ée]e?[- ]g[ée]rante?|dirigeante? associ[ée]e?|associ[ée]e? fondat|gesellschafter|co-?cr[ée]at(eur|rice)|cr[ée]at(eur|rice)\s*(&|et|/)\s*g[ée]rante?|zaakvoerder\s*[/&-]\s*vennoot|vennoot\s*[/&-]\s*zaakvoerder|zakenbezitter|propri[ée]taire)",re.I)
NO=re.compile(r"(product owner|process owner|owner relations|assistant|to the ceo|to ceo|office of the|founder'?s associate|founders associate|founding (engineer|member|team|designer|developer)|chief of staff|business owner\s+(it|ict|ing[ée]nierie|digital|platform|product|wizzer)\b|intern\b|stagiair|aspiring|future founder|ex-?founder|former|\bex\b|\blate\b|deceased|in memoriam|retired|previously)",re.I)
def is_strict(title):
    t=title or ''
    return bool(YES.search(t)) and not NO.search(t)
if __name__=='__main__':
    tests={"Co-Founder & CEO":1,"Mede-eigenaar":1,"Oprichter & directeur":1,"Gründer":1,"Fondatrice":1,"Président fondateur":1,"Product Owner":0,"Managing Director":0,"Directeur":0,"Geschäftsführer":0,"Executive Assistant to the CEO":0,"Founding Engineer":0,"Owner":1,"Co Owner":1,"Inhaber":1,"Gérant":0,"Zaakvoerder":0,"Partner":0,"CEO":1,"Ex-founder":0,"Bedrijfseigenaar":1,"Founder's Associate":0,"Unternehmensinhaber":1,"Praxisinhaber":1,"Chef d’entreprise":1,"Cheffe d'entreprise":1,"Associé gérant":1,"Dirigeant associé":1,"Gesellschafterin":1,"Founding Director":1,"E-commerce Zakenbezitter":1,"Entrepreneur":0,"Innkeeper":0,"Associée - Consultante Workplace":0,"Founding Engineer":0,"Directeur général - associé":0,"Co-créatrice / Gérante":1,"Créatrice & gérante Fanfreluche":1,"Zaakvoerder/vennoot":1,"Créatrice de contenu":0,"Mede-zaakvoerder":0,"Ladenbesitzerin":1,"Late Co-Founder":1-1,"Retired owner":0,"Chef Entreprise":1,"Geschäftsbesitzer":1,"Aktionärin":0,"Fondatrice Allme lagree studio":1,"Business Owner IT et Ingénierie":0,"Business Owner Wizzer":0,"Business owner Miss Overijssel":1}
    bad=[k for k,v in tests.items() if is_strict(k)!=bool(v)]
    print('FAIL',bad) if bad else print('all',len(tests),'tests pass')

TAG_NO=re.compile(r"(\bretired\b|pensionad[oa]|former owner|in memoriam|deceased|\blate (co-?)?founder|met pensioen|gepensioneerd|im ruhestand|pensioniert|\bretraitée?\b|à la retraite)",re.I)
def tagline_ok(t): return not TAG_NO.search(t or '')
