#!/usr/bin/env python3
"""The words of the Qualigraf concept, one dict per country. v7 renders them with build.py. One front door and four country flows.

    python3 state/prototypes/qualigraf/v6/build.py

Every claim about Qualigraf comes from their own pages, read again on 6 Nov 2026 (saved in research/sources), or from the
ADSO sponsor page. The law behind each date is cited in assets/state.js. Sample items are labelled as samples.
Copy rules, no dashes or colons in prose, contractions where English allows, sentence case headings without full stops.
Hyphens survive only inside names, references and addresses (L2121-12, Stoke-on-Trent, Alsace-Moselle, e-depot).
"""
import html, json, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site')
E = html.escape

TEAL, CORAL, MUSTARD, PLUM, NAVY = '#37BAC5', '#FE764A', '#F4B63F', '#7A5D7B', '#2A3C5E'
FINE = {
    'en': 'Examples on this page show sample data. A concept by Astra Agency for Qualigraf, not Qualigraf’s live site.',
    'fr': 'Les exemples de cette page sont fictifs. Une proposition d’Astra Agency pour Qualigraf, pas le site officiel de Qualigraf.',
    'nl': 'Voorbeelden op deze pagina zijn fictief. Een concept van Astra Agency voor Qualigraf, niet de live site van Qualigraf.',
}

# ---------------------------------------------------------------- United Kingdom
UK = dict(
    slug='uk', lang='en-GB', rules='uk', logo='Logo-Qualigraf_UK', name='Qualigraf UK', where='United Kingdom', change='change country',
    title='Qualigraf UK, committee management from idea to archive',
    desc='Committee management for UK councils. The report, sign offs, agenda pack, meeting, minutes and public record in one file.',
    nav=[('#track', 'Your meeting'), ('#roles', 'Who it’s for'), ('#proof', 'Customers'), ('#trust', 'Security'), ('#team', 'The UK team')],
    act='Book a walkthrough',
    h1='Every decision, from idea to archive',
    lede='Committee management for UK councils. The report, the sign offs, the agenda pack, the meeting, the minutes and the public record stay together in one file.',
    sentence=[('t', 'My next'), ('committee', None), ('t', 'meeting is on'), ('date', None)],
    quiet=('#track', 'See your deadlines for this meeting'),
    beat='Qualigraf keeps all of it in one file',
    sample='Sample Borough Council', fileFoot='Sample council and sample items',
    committees=[
        dict(v='cabinet', label='Cabinet', key=True, item='Item 6, Local Plan update'),
        dict(v='council', label='Full Council', key=False, item='Item 7, Motion on the High Street'),
        dict(v='planning', label='Planning Committee', key=False, item='Item 4, Land at Mill Lane'),
    ],
    summary='{committee}, {meeting}',
    papers=[
        dict(k='Forward plan', t='Key decisions', acc=TEAL, items=['Local Plan update', 'Leisure centre contract', 'Budget 2027 to 2028']),
        dict(k='Report', t='Cabinet report', acc=CORAL, items=['Purpose of the report', 'Recommendations', 'Financial implications', 'Legal implications']),
        dict(k='Agenda', t='Agenda pack', acc=CORAL, items=['Apologies', 'Declarations of interest', 'Minutes of the last meeting', 'Local Plan update'], table=True),
        dict(k='Minutes', t='Minutes', acc=MUSTARD, items=['Present', 'Decisions', 'Reasons for the decision', 'Actions']),
        dict(k='Decision notice', t='Record of decision', acc=PLUM, items=['Decision', 'Reasons', 'Alternatives considered', 'Call in deadline']),
    ],
    track_h2=('Follow your ', 'committee', ' meeting from the forward plan to the archive'),
    track_sub='A decision usually moves through a patchwork of separate tools. Here it stays in one file, and every date below is worked out from the law for your meeting.',
    track_meet=True, track_act='Book a walkthrough for this meeting',
    stations=[
        dict(n='Forward plan', c=TEAL, date='Notice open to the public by {keyNotice}', law='28 clear days before a key decision. Regulation 9, SI 2012/2089',
             dateNoKey='On the forward plan and the meeting calendar', lawNoKey='The 28 clear days notice applies to key executive decisions',
             what='The Long term planner tracks milestones and deadlines by topic, so the whole year is in view.'),
        dict(n='Report', c=TEAL, date='Your own report deadline', law='Set by your constitution and your timetable',
             what='Drafted in the built in editor, with colleagues sharing updates in real time. The content is reused as the decision moves on.'),
        dict(n='Sign off', c=CORAL, date='Legal, finance, then the portfolio holder', law='Your approval route, strict or light',
             what='Approval paths for each document type, strict or flexible, with an audit trail behind every step.'),
        dict(n='Agenda pack', c=CORAL, date='Open to the public by {agenda}', law='Five clear days. Section 100B, Local Government Act 1972',
             what='The agenda and its documents come together for the meeting. Publish them for public access, or keep them confidential when required.'),
        dict(n='Meeting', c=MUSTARD, date='{meeting}', law='In the chamber or remote',
             what='Members read the agenda, take and share notes and vote in the Paperless app on iOS, Windows and Android.'),
        dict(n='Decision', c=MUSTARD, date='{meeting}', law='A written record of the decision and its reasons. Regulation 12, SI 2012/2089',
             lawNoKey='Recorded in the minutes of the meeting',
             what='Minutes, decisions and action items are recorded and linked, so the important details don’t get lost.'),
        dict(n='Publication', c=PLUM, date='Published once, everywhere it needs to be', law='Agenda, decisions, minutes and webcast',
             what='Set your publishing preferences once. Webcasts carry speaker names, live voting results and searchable transcripts.'),
        dict(n='Archive', c=NAVY, date='Open to the public until {until6}', law='Six years, section 100C. Background papers until {until4}, section 100D',
             what='Papers, decisions and actions stay linked to their topic, and search finds them when you need them. The knowledge stays when people move on.'),
    ],
    rule_note=('We count clear days the cautious way. Only weekdays that aren’t bank holidays in England and Wales count, and never the day of publication or the meeting day (R v Swansea City Council, ex p Elitestone, 1993). Your constitution may count differently. ',
               'Ask us how your council counts them'),
    roles=dict(h2='Built for everyone who carries a decision', intro='One platform for the officer drafting the report, the Member voting on it and the resident reading the minutes years later.',
        items=[
            ('Democratic Services', 'Agendas, reports and minutes come from the same file, so nothing is copied twice. Approval routes are set per document type, with an audit trail behind every step.'),
            ('Members', 'Councillors read the papers, take and share notes, sign off and vote in one app, on iOS, Windows and Android, in the chamber or remote.'),
            ('IT and information governance', 'Fully web based, one platform in place of several applications, certified to ISO 27001 and ISO 9001. Records stay linked to their topic, so the knowledge stays when people move on.'),
        ]),
    proof=dict(h2='Over 400 clients across Europe already decide this way',
        intro='Councils in the Netherlands and France run their decisions on Qualigraf today. These are frontrunners you can learn from.',
        logos=[('logo_leiden.png', 'Gemeente Leiden', 'Netherlands'), ('logo_apeldoorn.svg', 'Gemeente Apeldoorn', 'Netherlands'), ('logo_maastricht.png', 'Gemeente Maastricht', 'Netherlands'),
               ('ville-de-marseille-logo.png', 'Ville de Marseille', 'France'), ('Departement-Moselle.png', 'Département de la Moselle', 'France')],
        facts=[
            ('Made for each country’s rules', 'The platform is tailored to the democratic demands of every country it serves, so UK councils get the UK cycle.'),
            ('Open to UK early adopters', 'Qualigraf is working with its first UK councils now, and is looking for a few more to help shape it.'),
            ('ADSO silver sponsor', 'Qualigraf supports the <a href="https://www.adso.co.uk/qualigraf/">Association of Democratic Services Officers</a> as a silver sponsor.'),
        ]),
    trust=dict(h2='Certified, audited and accounted for', intro='Every step of a decision is logged, who changed what and when, and the platform is independently certified.',
        marks=[('iso27001.webp', 'ISO 27001 certified'), ('iso9001.webp', 'ISO 9001 certified'), ('cyber.webp', 'Cyber Essentials')],
        items=[('ISO 27001', 'Information security, independently certified'), ('ISO 9001', 'Quality management, independently certified'),
               ('Cyber Essentials', 'The UK government backed baseline for cyber security'), ('A built in audit trail', 'Every change and every approval on the record')]),
    team=dict(h2='A UK team that knows Democratic Services', intro='Qualigraf UK is run from Stoke-on-Trent, with sister teams in France, the Netherlands and Canada.',
        people=[
            ('steven.png', 'Illustrated portrait of Steven Garratt', 'Steven Garratt', 'Group CEO', 'Led Civica Modern.Gov in the UK for many years before joining Qualigraf, and became Group CEO in 2026.', 'mailto:steven@qualigraf.com', 'steven@qualigraf.com'),
            ('stuart.png', 'Illustrated portrait of Stuart Benson', 'Stuart Benson', 'Director of Sales and Customer Success', 'Around 40 years in Democratic Services. Your first call goes to Stuart.', 'tel:+447741080343', '07741 080343'),
        ]),
    invite=dict(h2='Bring your hardest meeting. We’ll run it on Qualigraf',
        p=('A walkthrough built around your own ', 'committee', ' meeting on ', 'meeting', ', with your deadlines, your approval routes and your Members.'),
        call=('Or call Stuart on ', 'tel:+447741080343', '07741 080343'),
        meetLabel='Your meeting', change='Change it',
        fields=[('name', 'Your name', 'text', 'name'), ('council', 'Your council', 'text', 'organization'), ('email', 'Work email', 'email', 'email')],
        button='Book a walkthrough'),
    form=dict(missing='Please add your name, your council and a work email.', thanks='Thanks. This preview doesn’t send anything yet. On the live site the UK team gets your request for {summary}.'),
    foot=['Qualigraf UK, 53 Chapel Street, Mow Cop, Stoke-on-Trent ST7 4NS',
          '<a href="mailto:info@qualigraf.com">info@qualigraf.com</a>, <a href="tel:+447741080343">07741 080343</a>',
          'Part of Qualigraf Groupe, with teams in the UK, France, the Netherlands and Canada.'],
    footLinks=[('https://qualigraf.com/uk/your-rights-and-privacy-uk/', 'Your rights and privacy'), ('https://qualigraf.com/uk/complaints-procedure-uk/', 'Complaints procedure')],
    fine='en',
)

# ---------------------------------------------------------------- Canada
CA = dict(
    slug='ca', lang='en-CA', rules='ca', logo='Logo-Qualigraf_Canada', name='Qualigraf Canada', where='Canada', change='change country',
    title='Qualigraf Canada, council and committee management from idea to archive',
    desc='Council and committee management for Canadian municipalities. Reports, approvals, agendas, meetings, minutes and webcasts in one file.',
    nav=[('#track', 'Your meeting'), ('#tour', 'The platform'), ('#proof', 'Customers'), ('#trust', 'Security'), ('#team', 'The team')],
    act='Book a demo',
    h1='Every council decision, from idea to archive',
    lede='Council and committee management for Canadian municipalities. Reports, approvals, agendas, meetings, minutes and webcasts stay together in one file.',
    sentence=[('t', 'Our next'), ('committee', None), ('t', 'meeting is on'), ('date', None)],
    quiet=('#track', 'Follow your meeting through Qualigraf'),
    beat='Qualigraf keeps all of it in one file',
    sample='Sample municipality', fileFoot='Sample municipality and sample items',
    committees=[
        dict(v='council', label='Council', item='Item 7.1, Transit master plan'),
        dict(v='cow', label='Committee of the Whole', item='Item 4.2, Recreation facilities review'),
        dict(v='planning', label='Planning and Development Committee', item='Item 5.1, Official plan amendment'),
    ],
    summary='{committee}, {meeting}',
    papers=[
        dict(k='Long term plan', t='Council priorities', acc=TEAL, items=['Transit master plan', 'Recreation facilities review', 'Budget 2027']),
        dict(k='Staff report', t='Staff report', acc=CORAL, items=['Recommendation', 'Background', 'Financial implications', 'Attachments']),
        dict(k='Agenda', t='Council agenda', acc=CORAL, items=['Call to order', 'Disclosure of interest', 'Adoption of minutes', 'Staff reports'], table=True),
        dict(k='Minutes', t='Minutes', acc=MUSTARD, items=['Present', 'Motions', 'Recorded vote', 'Adjournment']),
        dict(k='Bylaw', t='Bylaw', acc=PLUM, items=['Whereas', 'Now therefore', 'Read a first and second time', 'Read a third time']),
    ],
    track_h2=('Follow your ', 'committee', ' meeting from the first idea to the archive'),
    track_sub='Council work usually moves through a patchwork of separate tools. Here every step of the decision stays in one file.',
    track_meet=True, track_act='Book a demo for this meeting',
    stations=[
        dict(n='Plan', c=TEAL, date='On the long term planner', law='Topics, milestones and deadlines across the year',
             what='The long term planner gives the whole year at a glance, so future actions are easy to plan and track.'),
        dict(n='Staff report', c=TEAL, date='Your report deadline', law='Set by your clerk’s timetable',
             what='Drafted in the built in editor, with colleagues sharing updates in real time. The content is reused as the decision moves on.'),
        dict(n='Approvals', c=CORAL, date='Your approval route', law='Set per document type, strict or light',
             what='Every report follows its own approval path, with an audit trail behind every step.'),
        dict(n='Agenda', c=CORAL, date='Published ahead of {meetingShort}', law='Notice as your procedure bylaw sets it',
             what='Unlimited meeting types and agendas, with full support for every council action.'),
        dict(n='Meeting', c=MUSTARD, date='{meeting}', law='In the chamber or remote',
             what='Members manage their meeting calendar, review documents, take notes and sign off on files in one app.'),
        dict(n='Minutes', c=MUSTARD, date='Recorded as the meeting runs', law='Motions, decisions and actions linked',
             what='Minutes, decisions and action items are recorded and linked, so the important details don’t get lost.'),
        dict(n='Publish', c=PLUM, date='Live, on demand or on your website', law='Agendas, minutes and webcasts',
             what='Automatic speaker identification, live voting results, speech to text and searchable transcripts.'),
        dict(n='Archive', c=NAVY, date='Kept with its topic', law='As long as your retention schedule requires',
             what='Every file stays linked to its topic and its strategic goals, so the knowledge stays when people move on.'),
    ],
    rule_note=('Sample municipality and sample items. Notice periods and retention are set by your province and your own bylaws, and Qualigraf follows them. ', 'Ask how it fits your procedure bylaw'),
    tour=dict(h2='See the platform the way your clerks will', intro='Screens from Qualigraf’s own demo municipality, Clearwater Ridge. Sample data throughout.',
        shots=[
            ('meeting-screen.webp', 1575, 1107, 'Sample council meeting screen with the agenda and an agenda item open', 'Meetings', 'The agenda, the documents, the participants, the transcript and the stream for every meeting, in one place.'),
            ('planner-screen.webp', 1282, 900, 'Sample long term planner showing topics across the year', 'Long term planner', 'Every topic on one timeline, from drafting to council, so nothing arrives as a surprise.'),
            ('publish-screen.webp', 1282, 900, 'Sample public meeting page with a webcast and the speakers', 'Publish and stream', 'A public meeting page with the webcast, the agenda and the speakers, published straight from the file.'),
            ('dossier-screen.webp', 1282, 900, 'Sample policy dossiers organised by topic', 'Policy dossiers', 'Reports and decisions gather around their topic, so a council member can follow a long running issue from the start.'),
        ]),
    proof=dict(h2='Over 400 clients across Europe already decide this way',
        intro='Municipalities in the Netherlands and France run their decisions on Qualigraf today. These are frontrunners you can learn from.',
        logos=[('logo_leiden.png', 'Gemeente Leiden', 'Netherlands'), ('logo_apeldoorn.svg', 'Gemeente Apeldoorn', 'Netherlands'), ('logo_maastricht.png', 'Gemeente Maastricht', 'Netherlands'),
               ('ville-de-marseille-logo.png', 'Ville de Marseille', 'France'), ('Departement-Moselle.png', 'Département de la Moselle', 'France')],
        facts=[
            ('Made for each country’s rules', 'The platform is tailored to the democratic demands of every country it serves.'),
            ('A Canadian team', 'Sales, implementation and support for Canada are run from Oshawa, Ontario.'),
            ('One platform', 'Meetings, workflow, council information, the long term planner and publishing together. Council information is also available on its own.'),
        ]),
    trust=dict(h2='Certified, audited and accounted for', intro='Every step of a decision is logged, who changed what and when, and the platform is independently certified.',
        marks=[('iso27001.webp', 'ISO 27001 certified'), ('iso9001.webp', 'ISO 9001 certified')],
        items=[('ISO 27001', 'Information security, independently certified'), ('ISO 9001', 'Quality management, independently certified'),
               ('A built in audit trail', 'Every change and every approval on the record')]),
    team=dict(h2='Talk to the team in Oshawa', intro='Qualigraf Canada is part of a group with local teams in the UK, France and the Netherlands.', pcols=1,
        people=[('blair.png', 'Portrait of Blair MacDonald', 'Blair MacDonald', 'Managing Director, Qualigraf Canada', 'Let’s explore together how Qualigraf can modernize, simplify and bring more transparency to your council’s decisions.', 'tel:+14167386366', '416 738 6366')]),
    invite=dict(h2='Bring your busiest meeting. We’ll run it on Qualigraf',
        p=('A demo built around your own ', 'committee', ' meeting on ', 'meeting', ', with your agenda, your approvals and your council.'),
        call=('Or call Blair on ', 'tel:+14167386366', '416 738 6366'),
        meetLabel='Your meeting', change='Change it',
        fields=[('name', 'Your name', 'text', 'name'), ('council', 'Your municipality', 'text', 'organization'), ('email', 'Work email', 'email', 'email')],
        button='Book a demo'),
    form=dict(missing='Please add your name, your municipality and a work email.', thanks='Thanks. This preview doesn’t send anything yet. On the live site the Canadian team gets your request for {summary}.'),
    foot=['Qualigraf Canada, 2 Simcoe St S, Suite 300, Oshawa ON L1H 8C1',
          '<a href="mailto:info@qualigraf.com">info@qualigraf.com</a>, <a href="tel:+14167386366">+1 416 738 6366</a>',
          'Part of Qualigraf Groupe, with teams in Canada, the UK, France and the Netherlands.'],
    footLinks=[],
    fine='en',
)

# ---------------------------------------------------------------- France
FR = dict(
    slug='fr', lang='fr-FR', rules='fr', logo='Logo-Qualigraf_General', name='Qualigraf France', where='France', change='changer de pays',
    title='Qualigraf, la dématérialisation des délibérations pour les collectivités',
    desc='Du rapport au procès-verbal, le cycle de vie des délibérations dans un seul outil, hébergé en France.',
    nav=[('#track', 'Votre séance'), ('#roles', 'Métiers'), ('#proof', 'Références'), ('#trust', 'Hébergement')],
    act='Demander une démonstration',
    h1='Dématérialisez le cycle de vie des délibérations',
    lede='Un bouquet de services pour simplifier la prise de décision dans les collectivités territoriales, du rapport au procès-verbal.',
    sentence=[('t', 'Notre prochain conseil municipal a lieu le'), ('date', None), ('t', 'dans une commune de'), ('size', None)],
    quiet=('#track', 'Voir votre calendrier de séance'),
    beat='Du rapport au procès-verbal, un seul dossier',
    sample='Commune exemple', fileFoot='Commune et points fictifs',
    committees=[dict(v='cm', label='conseil municipal', item='Point 4, Budget primitif')],
    sizes=[
        dict(v='big', label='3 500 habitants et plus', days=5, tokens=dict(art='L2121-12', pub='Publication sous forme électronique, la règle depuis le 1er juillet 2022. Article L2131-1 du CGCT')),
        dict(v='small', label='moins de 3 500 habitants', days=3, tokens=dict(art='L2121-11', pub='Affichage, publication papier ou électronique, selon le choix de la commune. Article L2131-1 du CGCT')),
    ],
    summary='{committee}, {meeting}',
    papers=[
        dict(k='Rapport', t='Rapport de séance', acc=TEAL, items=['Objet', 'Exposé des motifs', 'Incidence financière', 'Proposition']),
        dict(k='Convocation', t='Convocation', acc=CORAL, items=['Date et lieu de la séance', 'Ordre du jour', 'Note de synthèse']),
        dict(k='Ordre du jour', t='Ordre du jour', acc=CORAL, items=['Appel et quorum', 'Approbation du procès-verbal', 'Budget primitif', 'Questions diverses'], table=True),
        dict(k='Vote', t='Registre des votes', acc=MUSTARD, items=['Présents', 'Pouvoirs', 'Pour, contre, abstentions']),
        dict(k='Procès-verbal', t='Procès-verbal', acc=PLUM, items=['Ouverture de la séance', 'Délibérations adoptées', 'Clôture']),
    ],
    track_h2=('Suivez votre ', 'committee', ' du rapport à la publication'),
    track_sub='Chaque étape de la délibération dans un seul outil, et la date limite de convocation calculée pour votre séance.',
    track_meet=True, track_act='Demander une démonstration pour cette séance',
    stations=[
        dict(n='Rapport', c=TEAL, date='Selon le rétroplanning de votre séance', law='Votre calendrier interne',
             what='Les rapports sont instruits dans Délibération, avec une aide rédactionnelle intelligente pour les rapports de séance.'),
        dict(n='Circuit des visas', c=TEAL, date='Avant l’envoi de la convocation', law='Votre circuit de validation',
             what='Chaque rapport suit son circuit des visas, et chaque action reste tracée.'),
        dict(n='Convocation', c=CORAL, date='Envoyée au plus tard le {convocation}', law='{days} jours francs avant la séance. Article {art} du CGCT',
             what='KBox envoie la convocation électronique à valeur probante, avec le cartable numérique de l’élu et l’annotation des documents.'),
        dict(n='Séance', c=MUSTARD, date='{meeting}', law='Présences, pouvoirs et votes',
             what='États de présence et enregistrement des votes, gestion des pouvoirs et des déports, avec l’application de vote sur mobile.'),
        dict(n='Procès-verbal', c=MUSTARD, date='Disponible dès la fin de la séance', law='Compte rendu intégral ou synthétique',
             what='Le procès-verbal est généré automatiquement à partir de la séance.'),
        dict(n='Publicité', c=PLUM, date='Vos actes en ligne dès leur adoption', law='{pub}',
             what='Publication certifiée et disponibilité immédiate de vos actes en ligne, et télétransmission au contrôle de légalité.'),
    ],
    rule_note=('Jours francs. Le jour de l’envoi et le jour de la séance ne comptent pas, et un week-end ou un jour férié ne prolonge pas le délai (réponse ministérielle à la question écrite n° 29767). En cas d’urgence, le maire peut abréger le délai, sans descendre sous un jour franc. En Alsace-Moselle, le droit local peut s’appliquer. ',
               'Posez-nous la question pour votre collectivité'),
    roles=dict(h2='Un outil pour chaque métier de la délibération', intro='Élus, DGS, secrétariat général ou DSI, chacun collabore, décide, agit et communique dans le même outil.', cols=4,
        items=[
            ('Secrétariat général', 'Instruction des rapports, circuit des visas, gestion des séances et télétransmission dans le même outil.'),
            ('Élus', 'Convocation à valeur probante, cartable numérique, annotation des documents et vote sur mobile.'),
            ('DGS', 'L’IA décrypte les ordres du jour et les décisions, et repère les dossiers sensibles avec des éléments de réponse pour l’élu.'),
            ('DSI', 'Un service 100 % cloud, hébergé en France dans un cloud souverain qualifié SecNumCloud.'),
        ]),
    proof=dict(h2='Près de 200 collectivités déjà connectées',
        intro='Communes, départements et services d’incendie utilisent déjà les services Qualigraf.',
        logos=[('ville-de-marseille-logo.png', 'Ville de Marseille', ''), ('Departement-Moselle.png', 'Département de la Moselle', ''),
               ('Sapeurs-pompier-de-la-Moselle-logo.png', 'Sapeurs-pompiers de la Moselle', ''), ('CALVI-logo.png', 'Ville de Calvi', '')], cols=4,
        voices=[
            ('Nous avons réduit de 40 % le temps de préparation des séances grâce à Qualigraf. L’interface est claire et les envois électroniques sont instantanés.', 'DGS d’une communauté d’agglomération du Sud-Ouest'),
            ('Les élus apprécient la simplicité d’accès sur tablette et la traçabilité des documents. La mise en place s’est faite en moins de deux semaines.', 'Secrétaire de mairie, commune de 5 000 habitants'),
        ],
        src='Témoignages publiés par Qualigraf sur <a href="https://qualigraf.com/fr/temoignages-clients-collectivites/">qualigraf.com</a>.'),
    trust=dict(h2='Hébergé en France, dans un cloud souverain', intro='Depuis le 1er janvier 2026, vos données sont protégées par Outscale dans un cloud qualifié SecNumCloud 3.2, la qualification la plus exigeante de l’ANSSI.',
        marks=[],
        items=[('SecNumCloud 3.2', 'La qualification de l’ANSSI exigée pour les données sensibles de l’État et des collectivités'),
               ('Hébergé en France', 'Protégé contre les lois extraterritoriales'),
               ('Conforme aux recommandations de la CNIL', 'Pour la souveraineté et la pérennité de vos usages numériques'),
               ('Traçabilité', 'Chaque action et chaque vote restent tracés')]),
    team=None,
    invite=dict(h2='Une information ou une démonstration ?',
        p=('Une démonstration autour de votre propre ', 'committee', ' du ', 'meeting', ', avec vos rapports, votre circuit des visas et vos élus.'),
        call=('Ou appelez l’équipe à Paris au ', 'tel:+33155763838', '01 55 76 38 38'),
        meetLabel='Votre séance', change='La modifier',
        fields=[('name', 'Nom et prénom', 'text', 'name'), ('council', 'Collectivité', 'text', 'organization'), ('email', 'Email', 'email', 'email')],
        button='Demander une démonstration'),
    form=dict(missing='Merci d’indiquer votre nom, votre collectivité et votre email.', thanks='Merci. Cette maquette n’envoie rien. Sur le site, l’équipe française recevra votre demande pour {summary}.'),
    foot=['Qualigraf, 32 rue Brancion, 75015 Paris',
          '<a href="mailto:info@qualigraf.fr">info@qualigraf.fr</a>, <a href="tel:+33155763838">01 55 76 38 38</a>',
          'Membre de Qualigraf Groupe, avec des équipes en France, aux Pays-Bas, au Royaume-Uni et au Canada.'],
    footLinks=[],
    fine='fr',
)

# ---------------------------------------------------------------- Nederland
NL = dict(
    slug='nl', lang='nl-NL', rules='nl', logo='Logo-Qualigraf_Nederland', name='Qualigraf Nederland', where='Nederland', change='ander land',
    title='Qualigraf, het platform voor integrale besluitvorming',
    desc='Van eerste idee tot e-depot. Het platform voor integrale besluitvorming voor gemeenten.',
    nav=[('#track', 'Het besluit'), ('#roles', 'Voor wie'), ('#proof', 'Koplopers'), ('#trust', 'Kwaliteit'), ('#team', 'Contact')],
    act='Plan een kennismakingsgesprek',
    h1='Het platform voor integrale besluitvorming',
    lede='Maatschappelijke opgaves oplossen, dat is het doel van publieke besluitvorming. Wij helpen overheden om beter te besluiten.',
    sentence=[('t', 'Onze volgende vergadering van de'), ('committee', None), ('t', 'is op'), ('date', None)],
    quiet=('#track', 'Volg het besluit van idee tot e-depot'),
    beat='Alles in één dossier, van eerste idee tot e-depot',
    sample='Voorbeeldgemeente', fileFoot='Voorbeeldgemeente en fictieve agendapunten',
    committees=[
        dict(v='raad', label='gemeenteraad', item='Agendapunt 5, Omgevingsvisie'),
        dict(v='commissie', label='commissie Ruimte', item='Agendapunt 3, Mobiliteitsplan'),
        dict(v='bestuur', label='commissie Bestuur', item='Agendapunt 2, Begroting 2027'),
    ],
    summary='{committee}, {meeting}',
    papers=[
        dict(k='Langetermijnagenda', t='Langetermijnagenda', acc=TEAL, items=['Omgevingsvisie', 'Mobiliteitsplan', 'Begroting 2027']),
        dict(k='Raadsvoorstel', t='Raadsvoorstel', acc=CORAL, items=['Beslispunten', 'Aanleiding', 'Financiële gevolgen', 'Bijlagen']),
        dict(k='Agenda', t='Agenda', acc=CORAL, items=['Opening', 'Vaststellen agenda', 'Spreekrecht inwoners', 'Omgevingsvisie'], table=True),
        dict(k='Motie', t='Motie', acc=MUSTARD, items=['De raad, in vergadering bijeen', 'Constaterende dat', 'Verzoekt het college']),
        dict(k='Besluitenlijst', t='Besluitenlijst', acc=PLUM, items=['Aanwezig', 'Besluiten', 'Stemmingen', 'Toezeggingen']),
    ],
    track_h2=('Volg één besluit van eerste idee tot e-depot', None, ''),
    track_sub='Ondersteuning van besluitvorming is nu vaak een lappendeken aan tools. Bij Qualigraf staat het onderwerp centraal en blijft het hele besluit in één dossier.',
    track_meet=True, track_act='Plan een kennismakingsgesprek',
    stations=[
        dict(n='Langetermijnagenda', c=TEAL, date='Op de langetermijnagenda', law='Speciaal ontworpen voor Nederlandse gemeentes',
             what='Overzicht en een sterke planning, precies daar waar het nodig is, zodat toekomstige acties eenvoudig te plannen zijn.'),
        dict(n='Werkdossier', c=TEAL, date='Het onderwerp centraal', law='Gekoppeld aan beleids en themadossiers',
             what='Workflow ondersteunt elk besluitvormingsproces en koppelt werkdossiers aan beleids en themadossiers.'),
        dict(n='Voorstel', c=CORAL, date='Volgens jullie paraafroute', law='Paraferen in dezelfde applicatie',
             what='Moties, amendementen, vragen en voorstellen worden eenvoudig uitgewisseld, en elke stap blijft vastgelegd.'),
        dict(n='Agenda', c=CORAL, date='Verstuurd volgens jullie reglement van orde', law='Gemeentewet artikel 19 en jullie eigen reglement',
             what='Onbeperkt agenda’s en commissies, met ondersteuning voor alle raadsinstrumenten.'),
        dict(n='Vergadering', c=MUSTARD, date='{meeting}', law='In de raadszaal of online',
             what='Raadsleden beheren hun vergaderingen, raadplegen stukken, maken en delen aantekeningen en paraferen documenten.'),
        dict(n='Verslag', c=MUSTARD, date='Besluiten en notulen', law='AI Notulen stelt in korte tijd een verslag op',
             what='Besluiten, toezeggingen en stemmingen blijven gekoppeld aan het onderwerp.'),
        dict(n='Publicatie', c=PLUM, date='Automatisch op jullie website', law='Live en on demand',
             what='Automatische sprekersinformatie, live stemmingsuitslagen, speech to tekst en doorzoekbare transcripten.'),
        dict(n='Archief', c=NAVY, date='Archivering in een e-depot', law='Het dossier blijft bij het onderwerp',
             what='Automatisch opgebouwde dossiers en tijdlijnen, zodat iedereen ook later snel vindt wat er besloten is.'),
    ],
    rule_note=('Voorbeeldgemeente en fictieve agendapunten. De Gemeentewet noemt geen vast aantal dagen voor de oproep, dat regelt jullie reglement van orde. ', 'Vraag hoe het bij jullie werkt'),
    roles=dict(h2='Voor iedereen die aan een besluit werkt', intro='Raads en collegeleden, inwoners en ambtenaren werken in hetzelfde dossier.',
        items=[
            ('Griffie', 'Meer grip op afspraken, beter inzicht in onderwerpen, en zelfstandig én in verbinding werken.'),
            ('Raadsleden', 'Snel vinden wat je nodig hebt en complexe, langlopende onderwerpen eenvoudig begrijpen, dankzij automatisch opgebouwde dossiers en tijdlijnen.'),
            ('Informatiemanagers', 'Een eind aan de lappendeken van applicaties. Aantoonbaar compliant en sturen op echte procesinformatie.'),
        ]),
    proof=dict(h2='Dit zijn de koplopers waarvan je kunt leren',
        intro='Gemeenten in Nederland besluiten al met Qualigraf, en het platform telt meer dan 400 klanten in Europa.',
        logos=[('logo_leiden.png', 'Gemeente Leiden', ''), ('logo_apeldoorn.svg', 'Gemeente Apeldoorn', ''), ('logo_maastricht.png', 'Gemeente Maastricht', ''),
               ('logo-oegstgeest-1.png', 'Gemeente Oegstgeest', ''), ('logo_bodegravenreeuwijk.png', 'Gemeente Bodegraven-Reeuwijk', '')],
        facts=[
            ('Ontwikkeld in Nederland', 'Het platform wordt in Nederland gebouwd en ondersteunt teams in vier landen.'),
            ('Van idee tot e-depot', 'Van het eerste idee tot de automatische publicatie op de website en archivering in een e-depot.'),
            ('Ook los beschikbaar', 'Raadsinformatie en AI Notulen zijn ook als losse oplossing beschikbaar.'),
        ]),
    trust=dict(h2='Aantoonbaar compliant en veilig', intro='Qualigraf is onafhankelijk gecertificeerd en verwerkt gegevens volgens de AVG.',
        marks=[('iso27001.webp', 'ISO 27001 gecertificeerd'), ('iso9001.webp', 'ISO 9001 gecertificeerd')],
        items=[('ISO 27001', 'Informatiebeveiliging, onafhankelijk gecertificeerd'), ('ISO 9001', 'Kwaliteitsmanagement, onafhankelijk gecertificeerd'),
               ('AVG', 'Persoonsgegevens verwerkt volgens de AVG'), ('Volledige audit trail', 'Elke stap in het besluit vastgelegd')]),
    team=dict(h2='Jullie aanspreekpunt in Dordrecht', intro='Qualigraf Nederland zit in Dordrecht, waar ook het platform wordt gebouwd.', pcols=1,
        people=[('rob-bosveld.png', 'Portret van Rob Bosveld', 'Rob Bosveld', 'Business Developer', 'Laten we samen ontdekken hoe Qualigraf jullie besluitvorming moderniseert, vereenvoudigt én transparanter maakt.', 'mailto:rob@qualigraf.nl', 'rob@qualigraf.nl')]),
    invite=dict(h2='Betere besluitvorming begint met contact opnemen',
        p=('Een gesprek rond jullie eigen vergadering van de ', 'committee', ' op ', 'meeting', ', met jullie agenda, jullie paraafroute en jullie raad.'),
        call=('Of bel Rob op ', 'tel:+31653945536', '06 53 94 55 36'),
        meetLabel='Jullie vergadering', change='Wijzigen',
        fields=[('name', 'Naam', 'text', 'name'), ('council', 'Gemeente', 'text', 'organization'), ('email', 'Zakelijk mailadres', 'email', 'email')],
        button='Plan een kennismakingsgesprek'),
    form=dict(missing='Vul je naam, je gemeente en je mailadres in.', thanks='Dank je. Dit voorbeeld verstuurt nog niets. Op de live site krijgt het Nederlandse team je aanvraag voor {summary}.'),
    foot=['Qualigraf, Draai 9, 3311 JJ Dordrecht',
          '<a href="mailto:info@qualigraf.nl">info@qualigraf.nl</a>, <a href="tel:+31883747137">088 374 71 37</a>',
          'Onderdeel van Qualigraf Groupe, met teams in Nederland, Frankrijk, het Verenigd Koninkrijk en Canada.'],
    footLinks=[],
    fine='nl',
)

COUNTRIES = [UK, FR, NL, CA]


def bind(token, default=''):
    return f'<span data-bind="{token}">{E(default)}</span>'


def head(c, rel, extra_js):
    return f'''<!doctype html>
<html lang="{c['lang']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(c['title'])}</title>
<meta name="description" content="{E(c['desc'])}">
<link rel="icon" href="{rel}assets/img/brand/Logo-Qualigraf.svg" type="image/svg+xml">
<link rel="preload" href="{rel}assets/fonts/mona-sans-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{rel}assets/fonts/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{rel}assets/site.css">
{extra_js}</head>'''


def picks(c):
    out = []
    for kind, text in c['sentence']:
        if kind == 't':
            out.append(f'<span>{E(text)}</span>')
        elif kind == 'committee':
            if len(c['committees']) == 1:
                out.append(f'<span>{bind("committee", c["committees"][0]["label"])}</span>')
                continue
            opts = ''.join(f'<option value="{x["v"]}">{E(x["label"])}</option>' for x in c['committees'])
            lab = {'en': 'Committee', 'fr': 'Instance', 'nl': 'Vergadering'}[c['lang'][:2]]
            out.append(f'<span class="pick"><span class="face" data-bind="committee" aria-hidden="true">{E(c["committees"][0]["label"])}</span>'
                       f'<label class="vh" for="committee">{lab}</label><select id="committee" name="committee">{opts}</select></span>')
        elif kind == 'size':
            opts = ''.join(f'<option value="{x["v"]}">{E(x["label"])}</option>' for x in c['sizes'])
            out.append(f'<span class="pick"><span class="face" data-bind="size" aria-hidden="true">{E(c["sizes"][0]["label"])}</span>'
                       f'<label class="vh" for="size">Taille de la commune</label><select id="size" name="size">{opts}</select></span>')
        elif kind == 'date':
            lab = {'en': 'Meeting date', 'fr': 'Date de la séance', 'nl': 'Datum van de vergadering'}[c['lang'][:2]]
            out.append(f'<span class="pick pick-date"><span class="face" data-bind="meeting" aria-hidden="true">&nbsp;</span>'
                       f'<label class="vh" for="mdate">{lab}</label><input id="mdate" name="mdate" type="date" value="2027-03-11" required></span>')
    return '\n        '.join(out)


def country_page(c):
    rel = '../'
    L = c['lang'][:2]
    page = {k: c.get(k) for k in ('lang', 'rules', 'committees', 'sizes', 'summary', 'papers', 'sample', 'fileFoot', 'stations', 'form')}
    page.update(country=c['slug'], defaultDate='2027-03-11')
    js = f'<script>window.PAGE = {json.dumps(page, ensure_ascii=False)};</script>\n'
    nav = ''.join(f'<a href="{h}">{E(t)}</a>' for h, t in c['nav'])
    skip = {'en': 'Skip to the content', 'fr': 'Aller au contenu', 'nl': 'Ga naar de inhoud'}[L]
    navlab = {'en': 'Main', 'fr': 'Principal', 'nl': 'Hoofdmenu'}[L]
    s = [head(c, rel, js), '<body>', f'<a class="skip" href="#main">{skip}</a>',
         f'''<header class="top">
  <a class="brand" href="#top"><img src="{rel}assets/img/brand/{c['logo']}.svg" alt="{E(c['name'])}" width="140" height="44"></a>
  <nav class="nav" aria-label="{navlab}">{nav}</nav>
  <a class="where" href="{rel}" hreflang="en">{E(c['where'])} <span>{E(c['change'])}</span></a>
  <a class="btn btn-top act" href="#book">{E(c['act'])}</a>
</header>''', '<main id="main">']

    # hero
    s.append(f'''<section class="hero" id="top" aria-labelledby="h-hero">
  <div class="hero-pin">
    <canvas class="hero-gl" aria-hidden="true"></canvas>
    <div class="hero-copy">
      <h1 id="h-hero">{E(c['h1'])}</h1>
      <p class="lede">{E(c['lede'])}</p>
      <form class="sentence" onsubmit="return false">
        {picks(c)}
      </form>
      <div class="hero-acts">
        <a class="btn act" href="#book">{E(c['act'])}</a>
        <a class="quiet" href="{c['quiet'][0]}">{E(c['quiet'][1])}</a>
      </div>
    </div>
    <p class="beat" aria-hidden="true">{E(c['beat'])}</p>
  </div>
</section>''')

    # track
    a, tok, b = c['track_h2']
    h2 = E(a) + (bind(tok, c['committees'][0]['label']) if tok else '') + E(b)
    meet = f'<p class="track-meet">{bind("committee", c["committees"][0]["label"])}, {bind("meetingShort")}</p>' if c['track_meet'] else ''
    note, ask = c['rule_note']
    s.append(f'''<section class="track" id="track" aria-labelledby="h-track" style="--n:{len(c['stations'])}">
  <div class="track-pin">
    <div class="track-head">
      <div>
        <h2 id="h-track">{h2}</h2>
        <p class="sub">{E(c['track_sub'])}</p>
      </div>
      <div class="track-act">{meet}<a class="btn act" href="#book">{E(c['track_act'])}</a></div>
    </div>
    <div class="rail" aria-hidden="true">
      <div class="rail-segs"></div>
      <ol class="stops"></ol>
      <div class="file"><b data-bind="committee">{E(c['committees'][0]['label'])}</b><i data-bind="meetingShort"></i></div>
    </div>
    <ol class="stations"></ol>
    <p class="rule-note">{E(note)}<a class="quiet act" href="#book">{E(ask)}</a>.</p>
  </div>
</section>''')

    # roles
    if c.get('roles'):
        r = c['roles']
        items = ''.join(f'<div><h3>{E(h)}</h3><p>{E(p)}</p></div>' for h, p in r['items'])
        cols = f' style="grid-template-columns:repeat({r["cols"]},minmax(0,1fr))"' if r.get('cols') else ''
        s.append(f'''<section class="band mist" id="roles" aria-labelledby="h-roles">
  <h2 id="h-roles">{E(r['h2'])}</h2>
  <p class="intro">{E(r['intro'])}</p>
  <div class="roles roles-{len(r['items'])}">{items}</div>
</section>''')

    # tour, Canada
    if c.get('tour'):
        t = c['tour']
        figs = ''.join(f'<figure><img src="{rel}assets/img/{f}" width="{w}" height="{h}" loading="lazy" alt="{E(alt)}"><figcaption><b>{E(cap)}</b>{E(txt)}</figcaption></figure>'
                       for f, w, h, alt, cap, txt in t['shots'])
        s.append(f'''<section class="band mist" id="tour" aria-labelledby="h-tour">
  <h2 id="h-tour">{E(t['h2'])}</h2>
  <p class="intro">{E(t['intro'])}</p>
  <div class="tour">{figs}</div>
</section>''')

    # proof
    p = c['proof']
    logos = ''.join(f'<li><img src="{rel}assets/img/clients/{f}" alt="{E(n)}" loading="lazy">' + (f'<span>{E(where)}</span>' if where else '') + '</li>' for f, n, where in p['logos'])
    facts = ''.join(f'<p><b>{E(h)}</b>{txt}</p>' for h, txt in p.get('facts', []))
    voices = ''.join(f'<blockquote><p>« {E(q)} »</p><cite>{E(w)}</cite></blockquote>' for q, w in p.get('voices', []))
    s.append(f'''<section class="band" id="proof" aria-labelledby="h-proof">
  <h2 id="h-proof">{E(p['h2'])}</h2>
  <p class="intro">{E(p['intro'])}</p>
  <ul class="logos" style="--cols:{p.get('cols', 5)}">{logos}</ul>
  {f'<div class="facts">{facts}</div>' if facts else ''}{f'<div class="voices">{voices}</div>' if voices else ''}
  {f'<p class="src">{p["src"]}</p>' if p.get('src') else ''}
</section>''')

    # trust
    t = c['trust']
    marks = ''.join(f'<img src="{rel}assets/img/{f}" alt="{E(alt)}" loading="lazy">' for f, alt in t['marks'])
    items = ''.join(f'<li><b>{E(h)}</b><span>{E(x)}</span></li>' for h, x in t['items'])
    s.append(f'''<section class="band mist" id="trust" aria-labelledby="h-trust">
  <div class="trust">
    <div><h2 id="h-trust">{E(t['h2'])}</h2><p class="intro">{E(t['intro'])}</p>{f'<div class="marks">{marks}</div>' if marks else ''}</div>
    <ul>{items}</ul>
  </div>
</section>''')

    # team
    if c.get('team'):
        t = c['team']
        ppl = ''.join(f'''<figure class="person"><img src="{rel}assets/img/{img}" width="168" height="168" loading="lazy" alt="{E(alt)}">
      <figcaption><b>{E(n)}</b><span class="role">{E(role)}</span><p>{E(txt)} <a href="{href}">{E(link)}</a></p></figcaption></figure>'''
                      for img, alt, n, role, txt, href, link in t['people'])
        s.append(f'''<section class="band" id="team" aria-labelledby="h-team">
  <h2 id="h-team">{E(t['h2'])}</h2>
  <p class="intro">{E(t['intro'])}</p>
  <div class="people" style="--pcols:{t.get('pcols', 2)}">{ppl}</div>
</section>''')

    # invitation
    v = c['invite']
    a1, t1, a2, t2, a3 = v['p']
    first = c['committees'][0]['label']
    fields = ''.join(f'<div class="field"><label for="f-{k}">{E(lab)}</label><input id="f-{k}" name="{k}" type="{typ}" autocomplete="{ac}" required></div>' for k, lab, typ, ac in v['fields'])
    s.append(f'''<section class="invite" id="book" aria-labelledby="h-invite">
  <div class="invite-copy">
    <h2 id="h-invite">{E(v['h2'])}</h2>
    <p>{E(a1)}{bind(t1, first)}{E(a2)}{bind(t2)}{E(a3)}</p>
    <p class="call">{E(v['call'][0])}<a class="act" href="{v['call'][1]}">{E(v['call'][2])}</a></p>
  </div>
  <form class="book" novalidate aria-labelledby="h-invite">
    <div class="field meet"><span class="lab">{E(v['meetLabel'])}</span><output id="f-meeting" data-bind="summary"></output><a class="quiet" href="#top">{E(v['change'])}</a></div>
    {fields}
    <input type="hidden" name="meeting" id="f-meeting-hidden" value="">
    <button class="btn act" type="submit">{E(v['button'])}</button>
    <p class="form-msg" role="status" aria-live="polite"></p>
  </form>
</section>''')
    s.append('</main>')

    links = ''.join(f'<a href="{h}">{E(t)}</a>, ' for h, t in c['footLinks'])
    foot = ''.join(f'<p>{x}</p>' for x in c['foot'])
    s.append(f'''<footer class="foot">
  <div class="foot-in">
    <img src="{rel}assets/img/brand/{c['logo']}-contrast.svg" alt="{E(c['name'])}" width="140" height="44">
    {foot}
    <p>{links}<a href="{rel}">{E({'en': 'Qualigraf in other countries', 'fr': 'Qualigraf dans les autres pays', 'nl': 'Qualigraf in andere landen'}[L])}</a></p>
    <p class="fine">{E(FINE[c['fine']])}</p>
  </div>
</footer>
<nav class="phonebar" aria-label="{E(c['act'])}"><a class="btn act" href="#book">{E(c['act'])}</a></nav>
<script type="module" src="{rel}assets/page.js"></script>
<script type="module" src="{rel}assets/hero.js"></script>
</body>
</html>
''')
    return '\n'.join(s)


DOOR_PAPERS = [UK['papers'][1], FR['papers'][1], NL['papers'][3], CA['papers'][4], UK['papers'][2], FR['papers'][4]]


def door():
    page = dict(mode='entry', lang='en-GB', papers=DOOR_PAPERS, sample='Sample council')
    js = f'<script>window.PAGE = {json.dumps(page, ensure_ascii=False)};</script>\n'
    c = dict(lang='en', title='Qualigraf, council decisions from idea to archive',
             desc='One platform for council decisions, with local teams in the United Kingdom, France, the Netherlands and Canada.')
    rows = [
        ('uk', 'uk/', 'Logo-Qualigraf_UK', 'Qualigraf UK', 'United Kingdom', 'en-GB', 'Committee management for UK councils'),
        ('fr', 'fr/', 'Logo-Qualigraf_General', 'Qualigraf France', 'France', 'fr', 'La dématérialisation des délibérations pour les collectivités'),
        ('nl', 'nl/', 'Logo-Qualigraf_Nederland', 'Qualigraf Nederland', 'Nederland', 'nl', 'Het platform voor integrale besluitvorming'),
        ('ca', 'ca/', 'Logo-Qualigraf_Canada', 'Qualigraf Canada', 'Canada', 'en-CA', 'Council and committee management for Canadian municipalities'),
    ]
    lis = ''.join(f'''<li data-country="{k}"><a class="act" href="{h}" hreflang="{lg}"><b>{E(name)}</b><span lang="{lg}">{E(line)}</span></a></li>''' for k, h, logo, alt, name, lg, line in rows)
    offices = [
        ('Stoke-on-Trent', '53 Chapel Street, Mow Cop, Stoke-on-Trent ST7 4NS', 'tel:+447741080343', '07741 080343', 'uk/', 'Qualigraf UK', 'en-GB'),
        ('Paris', '32 rue Brancion, 75015 Paris', 'tel:+33155763838', '01 55 76 38 38', 'fr/', 'Qualigraf France', 'fr'),
        ('Dordrecht', 'Draai 9, 3311 JJ Dordrecht', 'tel:+31883747137', '088 374 71 37', 'nl/', 'Qualigraf Nederland', 'nl'),
        ('Oshawa', '2 Simcoe St S, Suite 300, Oshawa ON L1H 8C1', 'tel:+14167386366', '+1 416 738 6366', 'ca/', 'Qualigraf Canada', 'en-CA'),
    ]
    offs = ''.join(f'<div><h3>{E(city)}</h3><p>{E(addr)}<br><a href="{tel}">{E(tn)}</a></p><a class="quiet act" href="{h}" hreflang="{lg}">{E(go)}</a></div>' for city, addr, tel, tn, h, go, lg in offices)
    return f'''{head(c, '', js)}
<body class="door">
<a class="skip" href="#main">Skip to the content</a>
<header class="top">
  <a class="brand" href="./"><img src="assets/img/brand/Logo-Qualigraf.svg" alt="Qualigraf" width="140" height="44"></a>
</header>
<main id="main">
<section class="hero" aria-labelledby="h-hero">
  <div class="hero-pin">
    <canvas class="hero-gl" aria-hidden="true"></canvas>
    <div class="hero-copy">
      <h1 id="h-hero">Every decision, from idea to archive</h1>
      <p class="lede">One platform for council decisions, developed in the Netherlands and run by local teams in four countries, because every country runs its councils by its own rules.</p>
      <p class="ask" id="ask">Where is your council?</p>
    </div>
    <ul class="countries" aria-labelledby="ask">{lis}</ul>
  </div>
</section>
<section class="band" aria-labelledby="h-group">
  <h2 id="h-group">One group, four local teams</h2>
  <p class="intro">Each country has its own team for sales, implementation and support, close to the councils it serves and the laws they follow.</p>
  <div class="offices">{offs}</div>
</section>
</main>
<footer class="foot">
  <div class="foot-in">
    <img src="assets/img/brand/Logo-Qualigraf_General-contrast.svg" alt="Qualigraf" width="140" height="44">
    <p>Qualigraf Groupe, Dordrecht, with teams in the United Kingdom, France, the Netherlands and Canada.</p>
    <p class="fine">{E(FINE['en'])}</p>
  </div>
</footer>
<script type="module" src="assets/door.js"></script>
<script type="module" src="assets/hero.js"></script>
</body>
</html>
'''


def nobreak(t):
    return t.replace('e-depot', 'e\u2011depot')


if __name__ == '__main__':
    with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(door())
    for c in COUNTRIES:
        os.makedirs(os.path.join(ROOT, c['slug']), exist_ok=True)
        with open(os.path.join(ROOT, c['slug'], 'index.html'), 'w', encoding='utf-8') as f:
            f.write(nobreak(country_page(c)))
    print('wrote', 1 + len(COUNTRIES), 'pages')
