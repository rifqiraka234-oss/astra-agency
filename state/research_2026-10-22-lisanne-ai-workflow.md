# Lisanne De Jong Vanhommerig, what AI workflow to build. Research only, nothing built

Raka, 2026-10-22, after her "Yes, that's interesting, thanks!" (act_RCC8zw3aecnqM3tzB, 10.46.31 UTC), in his words,
"What's the best thing that we can make for her, like in terms of AI workflows? You know, I think we can use N8N, Claude,
yeah, anything, and like things that we can build like on the web app as well ... before you make anything first or like
any prototypes or whatever, like just do your research thoroughly first."

What we offered her (act_xHqoN8dNHbrJ6EWYu, 07.47.49 UTC), "an AI workflow that handles the admin around each case, from
new enquiries to client updates and invoices, set up privately so client files stay with you." Whatever we build has to
deliver that, because that's what she said yes to.

Thread re pulled 11.13 and 11.45 UTC, 2 items both times. Her lemlist record, ctc_E5FwxycX7v2A7Lnne, jobTitle "Founder |
Attorney-at-law (NL) | Lawyer (NL)", companyType Self-Employed. Evidence folders /tmp/claude-0/agents/b40 and b42.

## 1. Her practice, from her own material (all read 2026-10-22)

- **A one lawyer employment practice in Hoensbroek.** KVK 96694750 eenmanszaak, registered 2025-03-01. Bar register lists
  Arbeidsrecht. Her about page lists the registered areas Arbeidsrecht, Internationaal arbeidsrecht, Sociaal
  Zekerheidsrecht, Werknemersverzekering, and the Grotius specialisation in employment law finished in 2024.
  https://dejongvanhommerig.com/over-mij/
- **She's moving the practice to three lanes.** Her homepage (edited 20 Oct) offers "Complexe arbeidszaken & hoger
  beroep", "Kennis & voorbereiding bij re-integratie" for employees, and "Voor verwijzers & professionals", "Voor
  advocaten, rechtsbijstandsverzekeraars en andere professionals die een arbeidsrechtelijke zaak willen verwijzen".
  https://dejongvanhommerig.com/
- **She says she's building tools for employees, and they aren't on the site yet.** "Daarom ontwikkel ik naast mijn
  advocatenpraktijk ook praktische arbeidsrechtelijke kennis en hulpmiddelen ... Mijn eerste inhoudelijke focus daarbij
  ligt op ziekte en re-integratie." The about page also says "op deze website ook praktische kennis en hulpmiddelen die
  daarvoor zijn ontwikkeld", but the re-integration card on the homepage links to
  /vakgebieden/ziekte-re-integratie-arbeidsongeschiktheid-expertise/, a page written for employers ("Voor werkgevers is
  het belangrijk ..."), and the three articles on /kennis-en-updates/ are about pay transparency, side jobs and a sick
  foreign employee. 22 live pages read, no employee tool anywhere.
- **She has a legal tech background.** "ik werkte bij een dochteronderneming van een grote verzekeraar in Keulen, waar ik
  ervaring opdeed met legal tech, data en social media". So she'll judge the build as someone who knows the field.
- **How a case comes in.** Contact form with naam, email, bericht (an Elementor popup, no booking tool behind "Direct
  een afspraak inplannen", rendered 07.30 UTC, only reCAPTCHA iframes), office phone +31 45 208 08 59, WhatsApp on
  +31 6 132 67 931, email lisanne@dejongvanhommerig.com, LinkedIn. https://dejongvanhommerig.com/contact/
- **The admin her own terms and privacy statement create, step by step.** "Een opdracht komt pas tot stand als ik deze
  schriftelijk heb bevestigd" (an engagement letter per case). ID copy, conflict check ("controle op tegenstrijdig
  belang"), for legal aid "inkomensgegevens en bsn" (toevoegingen). Hourly rate, "Voor spoedzaken geldt een toeslag van
  50%", "Facturen moeten binnen 14 dagen worden betaald". No third party money account. A newsletter is described in
  the privacy statement but there's no sign up on the site.
  https://dejongvanhommerig.com/algemene-voorwaarden/ https://dejongvanhommerig.com/privacyverklaring/
- **Her insurance own risk is 2,000 euros a claim.** "€ 500.000,00 per aanspraak ... met een eigen risico van € 2.000,00
  per aanspraak." So one missed fatal deadline costs her at least that before reputation. Same terms page.
- **Her clients are employees.** Google reviews linked on her homepage (Miranda "mijn arbeidsconflict", Rick "tijdig
  geinformeerd over updates", Julissa about her son, Ayoub, Judrick, Marion, Alexandru).
- **Her stack.** Email is Microsoft 365 (MX dejongvanhommerig-com.mail.protection.outlook.com, autodiscover.outlook.com),
  secure mail through Zivver (SPF include:_spf.zivver.com), hosting mijn.host, site WordPress 7.1.3 with Elementor and
  Google Site Kit, built by Pressandpaper and Bring Online. Read through dns.google 2026-10-22, control heineken.com MX
  answered in the same run. Her practice management system is unknown, nothing on her pages names one.
- **Her LinkedIn.** Her site links https://www.linkedin.com/in/lisanne-vanhommerig/ and lemlist holds
  https://www.linkedin.com/in/lisannedejongvanhommerig, both walled (999 and 429). Company page 4 followers, no posts.

## 2. The rules any build has to meet

- **The Dutch bar's AI recommendations** (https://www.advocatenorde.nl/voor-advocaten/digitalisering-ai/aanbevelingen-ai-de-advocatuur,
  read 2026-10-22). Verify output and "Gebruik uitsluitend tools met bronvermelding". "Voer geen vertrouwelijke of
  cliëntgegevens in publieke AI-modellen. Vraag toestemming aan de cliënt voor AI-gebruik in het dossier. Voer een Data
  Protection Impact Assessment uit". "Weet waar data worden opgeslagen en verwerkt (land, onderaannemers, beveiliging)
  ... Zorg dat input en output binnen de kantooromgeving blijven." "Stel een kantoorbreed AI-beleid op. Informeer cliënten
  over het AI-beleid." So the build ships with source quotes on every extracted fact, her approval before anything
  leaves, a DPIA, an AI policy, a client information line and a consent clause for her engagement letter.
- **Where Claude can run inside the EU.** Anthropic's own API offers `inference_geo` of only "us" or "global", and
  workspace geo only "us" (https://platform.claude.com/docs/en/manage-claude/data-residency, read 2026-10-22). Amazon
  Bedrock serves Claude Haiku 5.5, Sonnet 5.5 and Opus 5.5 through the `eu.` geographic profile from Frankfurt, Paris,
  Stockholm, Ireland and other EU regions (https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html).
  On Bedrock the cloud provider is the processor (https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).
  So the private version is Claude on Bedrock with the `eu.` profile, never the global route.
- **n8n has every node this needs**, confirmed on docs.n8n.io 2026-10-22, AWS Bedrock Chat Model, Microsoft Outlook,
  Microsoft Outlook Trigger, Microsoft OneDrive, WhatsApp Business Cloud (a made up node path returned 404 as control).
  Self hosting in the EU keeps the workflow itself on her side.
- **AI Act article 50.** Third party summaries say the duty to tell people they're talking to an AI applies from
  2 August 2026. Any public tool on her site says so on its first screen. Not read in the official text yet.

## 3. Employment law facts the build can lean on (read at the source)

- **Fatal court deadlines.** Art. 7:686a lid 4 BW, "De bevoegdheid om een verzoekschrift bij de kantonrechter in te
  dienen vervalt: a. twee maanden na de dag waarop de arbeidsovereenkomst is geëindigd ... b. drie maanden ... indien het
  een verzoek op grond van de artikelen 673, 673b en 673c betreft" (transitievergoeding), plus two months after a refused
  UWV permit (d). https://wetten.overheid.nl/BWBR0005290/2026-07-01
- **The exit deal cooling off period.** Art. 7:670b BW, the employee can dissolve a settlement "binnen veertien dagen",
  three weeks if the employer didn't state it. Same source.
- **The re-integration timeline** (week 6 problem analysis, week 8 plan of approach, week 42 UWV notice, week 52 first
  year review, WIA application around week 88 to 93). Secondary sources only so far, salarisvanmorgen.nl, dezaak.nl,
  rendement.nl. Must be read at UWV before it goes in any tool.

## 4. What she could already buy

- **Pascal-AI**, Rotterdam (https://pascal-ai.nl/, opened 2026-10-22). An employment law assistant "voor HR- &
  salarisprofessionals, verzuimspecialisten en ondernemers", employer side, answers with sources, 160+ model documents,
  EU servers. It doesn't run a law practice's intake and it isn't for employees.
- **Harvey and Legora** sell to large firms, Legora on 10 seat minimums per third party estimates (sacra.com,
  techsy.io). Not for a solo.
- **Kleos** (Wolters Kluwer) is practice software for files, hours and invoices with AI features
  (https://www.wolterskluwer.com/nl-nl/solutions/kleos/explore-kleos-features, search snippet only). If she runs it,
  the build feeds it rather than replacing it. Ask her.
- **Microsoft Copilot** sits inside the Microsoft 365 she already has. Not researched yet, it's the obvious "why not
  just that" question, answered in section 6 as an argument, not a tested fact.

## 5. The candidates, judged

| # | Candidate | Fits her direction | Delivers what we offered | Worth | Risk | Verdict |
|---|---|---|---|---|---|---|
| A | **Intake desk.** Every enquiry (form, email, referrer mail, later WhatsApp) read by Claude, turned into a one page intake card with lane, key dates quoted from the message, fatal deadlines computed in code (2 and 3 months, 14 day cooling off), conflict check against her client and opponent list, a document list for that case type, a draft reply and a draft engagement letter with her terms, all waiting in her Outlook for approval | Yes, all three lanes come in through it | Yes, "new enquiries" | €3,000 to €5,000 | Intake messages are confidential, so Bedrock EU and her approval on every send | **Core, build this** |
| B | **Re-integration check for employees** on her site. The employee enters the date they fell ill and where they are, gets their timeline, what's expected of them, the questions to ask and the red flags, written by her and fixed in code, with Claude only summarising their situation. One button sends it to her as a ready intake card | Yes, it's the tool her about page says she's building | Feeds A | €3,000 to €6,000 on its own | Public tool, so the AI Act notice and content she signs off | **The front door, sketch it with A** |
| C | **Case file first read.** Upload a dossier, get a chronology and evidence map with page references, the open questions | Yes, "Mijn kracht ligt in het doorgronden van dossiers" | No, it's not admin | €4,000+ | Highest, whole files, and it's the work she's proud of doing herself | Hold, offer later if she asks |
| D | **Exit deal quick check** for employees, upload the VSO, get a checklist and the 14 day clock | Weak, she positions away from standard work | Partly | €2,500+ | Public, legal advice risk | No |
| E | **Referrer desk** for insurers and lawyers, referral form to intake card, acceptance reply, cost estimate and progress report drafts | Yes, lane three | Partly | Part of A | Same as A | Fold into A as a second door |
| F | **Updates and invoices.** Milestone triggered client update drafts in plain Dutch, draft time entries from her sent mail and calendar, a monthly invoice draft | Yes, her reviews praise her updates | Yes, "client updates and invoices" | €2,000 to €3,000 on top of A | Low | Phase two of A |

## 6. The recommendation

Build A with B as its front door, and show F as the next step. One story in the sketch, which also carries her own
promise, "Ingewikkelde juridische situaties helder krijgen". An employee who's been ill for nine weeks and is in conflict
with her employer uses the re-integration check at night, sees where she stands and what to ask, and taps the button.
The next morning Lisanne finds an intake card in Outlook with the dates quoted from the message, the deadlines that
apply, the conflict check done, and a draft reply and engagement letter waiting for her to approve. Nothing leaves
without her.

Why this one.
1. It's exactly what we offered and she said yes to.
2. It carries her own plan, the employee tools on re-integration she says she's building and hasn't shipped.
3. The deadline guard is worth something she can count, a missed fatal term costs her at least her 2,000 euro own risk.
4. It's low risk on confidentiality next to C, and it meets every NOvA recommendation by design.
5. It's quick to build with n8n, Claude on Bedrock EU and her own Microsoft 365, and easy to show as a sketch.

The objections she's likely to raise, and the answers.
- **"Cliëntgegevens gaan niet zomaar in AI."** Claude through Bedrock's EU profile, n8n hosted in the EU, no training on
  her data, a DPIA, an AI policy and a consent line for her engagement letter, as the NOvA asks.
- **"Ik gebruik al Kleos" or another system.** Then A writes into it or into her OneDrive, it doesn't replace it.
- **"Copilot kan dat ook."** Copilot summarises mail. It doesn't know her lanes, her terms, her conflict list or the
  2 and 3 month terms, and it won't draft her engagement letter. Untested argument, check before using it with her.
- **"Ik krijg niet zoveel aanvragen."** We don't know her volume. B is how volume grows, and the deadline guard pays off
  on the first case it catches.

## 7. Unknowns to ask her before building

1. Where most new cases reach her now, the form, email, WhatsApp, phone or referrers, and roughly how many a week.
2. Which practice system she uses for files, hours and invoices, if any.
3. Whether her re-integration tool has content written already, and in what form.
4. Whether WhatsApp is her business number on the WhatsApp Business app, since connecting it needs the Cloud API.

## 8. Sources

https://dejongvanhommerig.com/ , /over-mij/ , /contact/ , /algemene-voorwaarden/ , /privacyverklaring/ ,
/kennis-en-updates/ , /vakgebieden/ziekte-re-integratie-arbeidsongeschiktheid-expertise/ (22 pages fetched 07.34 UTC),
https://dns.google/resolve?name=dejongvanhommerig.com&type=MX ,
https://www.advocatenorde.nl/voor-advocaten/digitalisering-ai/aanbevelingen-ai-de-advocatuur ,
https://platform.claude.com/docs/en/manage-claude/data-residency ,
https://platform.claude.com/docs/en/manage-claude/api-and-data-retention ,
https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html ,
https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock/ and the Outlook,
Outlook Trigger, OneDrive and WhatsApp node pages, https://wetten.overheid.nl/BWBR0005290/2026-07-01 (art. 7:670b,
7:686a), https://pascal-ai.nl/ , https://www.lawnext.com/2023/04/the-good-and-the-bad-of-solo-practice-per-clios-latest-legal-trends-report-for-solos.html ,
https://canadianlawyermag.com/resources/practice-management/solo-lawyers-bill-less-but-work-more-according-to-clio-law-firm-report/375467
