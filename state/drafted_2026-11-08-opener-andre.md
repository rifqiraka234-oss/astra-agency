# NOT SENT. Approved by Raka 7 Nov, 'Send all at 07.28', scheduled Sun 8 Nov 07.28 Amsterdam.

Approved text from state/drafted_2026-11-07-openers-review.md, Andre section. One mechanical change for the SKETCHB tag, "looks cool!" to "looks cool.". Nothing else touched.

Thread pulled 2026-11-07 07.19 UTC with tools/lemlist.py, control ctc_ch3vFcKAkjQdMKDCg 9 items ok, ctc_HFNJBh2uN63Zsnqp6 0 items. Inbox listing (197 conversations) has no second contact for Tan or Panda Panda. State files grep on name, company, contactId, lea_eNjFpjrYDJkqXFXDq, the LinkedIn slug and the domain, no SENT row, only logs/inbox/2026-11-07-unsent-accepts.md and the 7 Nov review file.

### Andre Tan, Panda Panda Group, ctc_HFNJBh2uN63Zsnqp6

> Flags. (1) Ownership settled on the register, two reads that don't share a source. recherche-entreprises.api.gouv.fr, PANDA FRERES HOLDING (MAMAHUHU) SIREN 881 982 532, président LUCAS SAUQUET HOLDING, directeur général TAN HOLDING (SIREN 843 914 409), and TAN HOLDING's gérant is TAN Andre Phuong Y-Kaing, born 1984. societe.com, "André TAN ... Gérant depuis le 27 octobre 2022" of TAN HOLDING, and "TAN HOLDING est promue directeur général de PANDA FRERES HOLDING" on 28 Sep 2022. So Andre runs the group through his holding beside Lucas Sauquet, matching his tagline "Co-fondateur at PANDA PANDA GROUP". Pappers and Newtable both walled (Cloudflare, 403). (2) A two founder group, so Lucas may read it too. (3) The group is growing, a new Baobar Faubourg (Presse Agence 24 Sep 2026, Zepros 11 Oct 2026 headlines) makes six Paris addresses.

```gate
lead: Andre Tan, lemlist jobTitle Co-fondateur, tagline "Co-fondateur at PANDA PANDA GROUP", Paris, contact record read 2026-11-07 07.21 UTC. Site owner per https://www.pandapandagroup.com/mentions-legales "PANDA FRERES HOLDING – SIREN 881 982 532", directeur de la publication Lucas Sauquet. Register, PANDA FRERES HOLDING directeur général TAN HOLDING, whose gérant is André TAN (recherche-entreprises.api.gouv.fr and societe.com, read 2026-11-07). ctc_HFNJBh2uN63Zsnqp6, lea_eNjFpjrYDJkqXFXDq, cam_xFYYBzvfSHk83epvw. Thread 0 items, control 9
site pass 1: 47 URLs, tools/crawl.py on https://www.pandapandagroup.com (pandapandaparis.com redirects there), 45 at 200 and 2 at 404 (/fr/fr/reservation and /en/reservation), every page read (home FR and EN, nos adresses, the six restaurant pages, group, presse, click and collect, Uber Eats, événementiel, privatisation, réservation, contact, shop and products, CGV, CGU, mentions légales)
site pass 2: 47 URLs, tools/crawl.py again, same counts, plus site-audit.js on /fr/evenementiel desktop and phone screenshots opened, a black and white Squarespace page, the ÉVÈNEMENTIEL heading, the B2B offer paragraph, one "NOUS CONTACTER" link, then the case studies with photos
deep analysis: a Paris group of six Chinese restaurants (Panda Panda and Tiger Tiger in the 10e, Baobar Marais, Baobar Faubourg, Suzie Wong, Mr Chow), plus click and collect, Uber Eats and a shop. The events page sells "une large offre B2B : stand street food, cocktail dînatoire, dîner ou déjeuner privé, buffet, masterclass, lunchbox" with case studies, Solidays 2024 "plus de 9000 personnes servis sur 3 jours", Musée Guimet "finger food pour 250 personnes le 4 juin 2024 et le 10 juin 2024", Cocktail Street Festival 2022, a Printemps Haussmann masterclass, Omnivore, a hôtel particulier dinner for about thirty, and the Palais de Tokyo during the 2024 Olympics "plus de 10 000 personnes servis sur 2 semaines". Its only action is "nous contacter", which goes to /fr/contact, restaurant phone numbers and "Pour les demandes de réservations, ça se passe ici", no form and no email (site-audit.js, forms 0, inputs 0, mailto 0 on the events page). The privatisation page has a questionnaire for groups of 10 or more in the restaurants. INFERENCE, the catering and events line is the high ticket side and it's sold by waiting for the phone
owner linkedin: Route 1 https://www.linkedin.com/in/tanandre curl 999. Route 2 web search "Andre Tan" "Panda Panda" co-fondateur, no match, and the Panda Panda search returned Newtable "Lucas & André", former investment bankers (walled 403 on curl and WebFetch, tier G). Route 3 the register, gérant of TAN HOLDING, DG of the group holding. Route 4 Google News "Andre Tan", Le Monde 10 Mar 2022 "André Tan : Dans notre culture, la table ...", Bpifrance 16 Jul 2026, Tendances restauration 18 Nov 2025 "Panda Panda : Dépoussiérer le restaurant chinois", headlines tier G. Route 5 the lemlist record. Route 6 Instagram https://www.instagram.com/pandapandagroup_/ through social-audit.js
contact linkedin: same person as the owner, the lemlist record, its tagline and the register agree
google news: tools/news.py fr 2026-11-07, company 16 hits (Zepros "Nouveau Baobar pour Panda Panda Group" 11 Oct 2026, Presse Agence Baobar Faubourg 24 Sep 2026, ELLE 23 Sep 2026, Sortir à Paris 4 Nov 2026), person "Andre Tan" 10 hits, 4 about him, control Carrefour 100
regional news: tools/news.py (traiteur événementiel Paris entreprises) x (traiteur entreprise cocktail séminaire 2026), 6 hits, Spotlag company party venues Paris (Paris ZigZag 30 Sep 2025), Comet Meetings at the château de Levallois (Déplacements Pros 4 Jun 2025), background on the Paris corporate events market
industry news: tools/news.py traiteur entreprise cocktail séminaire 2026, 9 hits, evenement.com top 5 traiteurs événementiels (25 Jun 2025), regional caterers, plus the trade press by name (Zepros Restauration, Tendances restauration), background only
sources:
1. https://www.pandapandagroup.com/fr/evenementiel
2. https://www.pandapandagroup.com/en/events
3. https://www.pandapandagroup.com/mentions-legales
4. https://www.pandapandagroup.com/fr/contact
5. https://www.pandapandagroup.com/fr/privatisation
6. https://www.pandapandagroup.com/fr/nos-adresses
7. https://www.pandapandagroup.com/fr/panda-panda-group
8. https://recherche-entreprises.api.gouv.fr/search?q=881982532
9. https://recherche-entreprises.api.gouv.fr/search?q=843914409
10. https://www.societe.com/societe/tan-holding-843914409.html
11. https://www.instagram.com/pandapandagroup_/
12. https://www.facebook.com/profile.php?id=100063616871188
13. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.pandapandagroup.com
14. https://news.google.com/rss (tools/news.py)
15. https://www.pappers.fr/entreprise/panda-freres-holding-881982532 (walled, Cloudflare 403, not read)
pains: 4 judged. (1) a proven B2B events line (Guimet, Solidays, Palais de Tokyo) that waits for companies to call, CHOSEN. (2) website, the six restaurant pages and bookings work, a reservations link 404s from two paths, small, a task. (3) social, Instagram 25,363 followers, 821 posts, latest 5 Nov, strong, not a pain. (4) GDPR, no banner, 5 first party cookies including _ga from Stockholm, never the angle
chosen: (1), biggest, one cocktail for 250 or a festival stand outweighs weeks of covers in one restaurant, and it's the outreach angle Raka picked
owner reply: "On a déjà des demandes d'entreprises" | good, the flow adds the office managers and agencies who've never heard of the events offer | https://www.pandapandagroup.com/fr/evenementiel the only route is "nous contacter" to a page of restaurant phone numbers
worth: €4,000+, an AI powered outreach flow, a list of Paris office managers and event agencies, personal outreach with the Guimet and Solidays cases, and booked cocktails, lunches and lunchbox orders
still there: TAN HOLDING, gérant André TAN, is directeur général of PANDA FRERES HOLDING, read 2026-11-07 | https://www.societe.com/societe/tan-holding-843914409.html
budget: six Paris restaurants and a new Baobar Faubourg opening this autumn, plus Uber Eats and a shop | https://www.pandapandagroup.com/fr/nos-adresses
variant: B, matches the contactId, and the draft names the AI powered outreach flow so it sits outside the A/B test by the 4 Nov rule
sweep website: crawled twice, 47 URLs each, screenshots of the events page desktop and phone opened, bold modern Squarespace, two reservation links 404, not chosen
sweep gdpr: site-audit.js no banner and no consent code against its control, tools/eu-view.py from Stockholm 5 first party cookies including _ga and _ga_7SW2YM4ZM1, checked, never the angle (RULES 0E)
sweep apps: click and collect, Uber Eats and a booking tool already run, events quotes start by phone, the outreach flow is the chosen build, read on https://www.pandapandagroup.com/fr/contact
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/pandapandagroup_/ 25,363 followers 821 posts latest 5 Nov 2026, Facebook 1,548 followers with post dates behind the login, strong, not chosen
sweep squad: a restaurant group with no tech roles on the site (crawl of 47 URLs), nothing to staff, not chosen
thread: problem the events page shows serious work for companies and waits for companies to find the contact button | cost Paris office managers and event agencies are likely booking someone else | offer an AI powered outreach flow that finds those companies and agencies and gets the bao cocktails and lunchboxes in front of them | link companies
lead read: Andre reads that his own events page proves the work with Guimet and Solidays but only waits for companies to call, then gets offered an AI powered outreach flow that finds those companies and agencies, one thread
claims:
your events page shows serious work for companies, https://www.pandapandagroup.com/fr/evenementiel "proposons actuellement une large offre B2B"
250 guests at Musée Guimet, https://www.pandapandagroup.com/fr/evenementiel "Cocktail dînatoire au Musée Guimet" and "finger food pour 250 personnes"
9,000 at Solidays, https://www.pandapandagroup.com/fr/evenementiel "SOLIDAYS 2024" and "plus de 9000 personnes servis sur 3 jours"
it waits for companies to find the contact button, https://www.pandapandagroup.com/fr/evenementiel the one action "nous contacter" linking https://www.pandapandagroup.com/fr/contact, no form or email on either page
bao cocktails and lunchboxes, https://www.pandapandagroup.com/fr/evenementiel "cocktail dînatoire ... lunchbox" and Bao on the Guimet and Solidays menus
INFERENCE, Paris office managers and event agencies planning team lunches and cocktails are likely booking someone else right now, rests on the B2B offer on https://www.pandapandagroup.com/fr/evenementiel and the season, worded likely
recheck: every claim reopened 2026-11-07 07.32 UTC with a live fetch of /fr/evenementiel. Disproof tried, searched both events pages, the contact page and the privatisation page for a form, an email, a quote request or a corporate sales contact and found only "nous contacter" and the restaurant group questionnaire, and a web search at 07.40 UTC for "Panda Panda" traiteur entreprise Paris bao cocktail livraison bureau found no catering or office delivery listing of theirs (a "Chez Panda - Traiteur" in the 8e is a different business). Musée Guimet was a vernissage cocktail, so "work for companies" is read as B2B per their own words, not as an office client. Facts hold, confidence MEDIUM
```

SKETCHB
```
Hi Andre, Panda Panda looks cool.

However, your events page shows serious work for companies, 250 guests at Musée Guimet and 9,000 at Solidays, yet it waits for companies to find the contact button. Paris office managers and event agencies planning team lunches and cocktails are likely booking someone else right now.

I'd suggest an AI powered outreach flow that finds those companies and agencies and gets your bao cocktails and lunchboxes in front of them.

Shall I send you a sketch of the flow for Panda Panda?
```
