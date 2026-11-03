# Framed returns calculator, sourced benchmarks

Every figure below was read on a page opened on 2026-11-03. Quotes are verbatim in the page's own language. "Page date" is the date the page itself carries (datePublished, dateModified or a printed date), not the day it was read.

---

## (a) B2B cold outreach reply rates

### Email

| Source | Page date | Figure | Definition, as the source states it | Sample |
|---|---|---|---|---|
| Instantly, Cold Email Benchmark Report 2026. https://instantly.ai/cold-email-benchmark-report-2026 | "Updated January 12, 2026" | **3.43% average reply rate**. Top quartile 5.5%+, top 10% 10.7%+. 58% of replies come on step 1, 42% from follow-ups | "Percentage of all replies received (including follow-up responses) divided by total emails sent." | "billions of cold email interactions across thousands of active workspaces" |
| Belkins, B2B cold email response rates (2026 study). https://belkins.io/blog/cold-email-response-rates | dateModified 2026-06-26 | **0.45% average reply rate** across 2025. Monthly low 0.35% (December), high 0.54% (February). Companies with 11 to 50 staff 0.49%, 0 to 10 staff 0.72% | "Reply rate = unique replies ÷ emails sent, excluding auto-replies and bounce notifications" | "Total emails analyzed: 7,530,489", "Total replies tracked: 34,393", Jan to Dec 2025 |

Quotes:
- Instantly: "The overall average reply rate is 3.43% with top-performers of users exceeding 10% reply rates (2-4x higher)"
- Belkins: "average reply rate across all 2025 campaigns was 0.45%"

Why they differ by 7.6x: lemlist (https://lemlist.com/blog/cold-email-benchmarks/, datePublished 2026-08-17, dateModified 2026-11-02) puts them side by side: "Instantly’s 2026 Cold Email Benchmark Report puts the average reply rate at 3.43%, with top performers clearing 10%. Belkins, measuring the same thing with auto-replies stripped out, reports 0.45%. Both numbers are real. They just count different things." lemlist also gives "Meeting-booked rates run 0.5% to 2.5%".

Not independent, do not count as a third source: lemlist and Woodpecker (https://woodpecker.co/blog/cold-email-statistics/, dateModified 2026-06-23) both re-quote Instantly's 3.43%. Woodpecker's own claim: "campaigns under 50 recipients average 5.8% reply rate vs. 2.1% for 1,000+" (its dataset is "well over 20 million sales emails").

### LinkedIn

| Source | Page date | Figure | Definition | Sample |
|---|---|---|---|---|
| Expandi, LinkedIn Outreach Benchmarks 2026. https://expandi.io/blog/linkedin-outreach-benchmarks/ | "Published on May 19, 2026" | **28.5% connection acceptance, 3.0% connection-note reply, 10.4% message reply.** Note reply fell 3.5% to 2.2% over the year, message reply held at 10 to 11% | Platform averages per request / per message | "13,218,869 connection requests, 6,730,447 outbound messages, and 3,766,161 accepted connections sent through 13,302 active LinkedIn accounts between May 2025 and April 2026" |
| Belkins, LinkedIn outreach study (2026). https://belkins.io/blog/linkedin-outreach-study | dateModified 2026-06-29 | **7.2% overall reply rate, 26% connection rate. Netherlands 10.5%.** Founders and owners 6.4%, HR and Talent 10.9%. Own campaigns funnel 18.7% accept, 17.6% of connected replied, 1.3% of connected booked a meeting | "Reply rate in this study is calculated as replies divided by messages sent (for reply rate) and connections divided by invites sent (for connection rate)." | 15M+ contacts (the page attributes this set to Expandi), plus Belkins' own 14,077 records from 34 client projects, Jan to Dec 2025 |

Quotes:
- Expandi: "28.5% connection acceptance, 3.0% connection-note reply, 10.4% message reply."
- Belkins: "Overall reply rate across 15M+ contacts is 7.2%" and "trailing the Netherlands (10.5%), UK (6.1%), Canada (7.1%), and Australia (6.4%)."
- Belkins on HR: "HR and Talent professionals reply at the highest rate of any seniority group (10.9%)". Relevant because Framed's buyer is often HR or the office manager.

### Calculator defaults I would use

| Input | Default | Range to allow | Source |
|---|---|---|---|
| Email reply rate | 3.4% | 0.45% (Belkins, humans only) to 10.7% (Instantly top 10%) | Instantly 2026, Belkins 2026 |
| LinkedIn connection acceptance | 28% | 19% to 30% | Expandi 28.5%, Belkins 26% overall and 18.7% own campaigns |
| LinkedIn message reply (after connecting) | 10% | 6% to 12% | Expandi 10.4%, Belkins NL 10.5%, Belkins owners 6.4% |
| Reply to meeting / booking | user input, no default | 0.5% to 2.5% of emails sent booked a meeting (lemlist) | none of the sources measure photobooth bookings |

The reply to booking step is Framed's own number to fill in. Nothing found measures how often a reply turns into a €299 event booking, so the calculator should ask for it rather than invent it.

---

## (b) How far ahead Dutch companies book a December party, and how many events fall in December

**No survey data found.** No Dutch study was found that measures booking lead time or the share of company events held in December. What exists is advice from event suppliers, which is useful as a range, not a measurement. Searches run: Dutch web search for kerstborrel booking lead time surveys, a search for employer kerstborrel percentages, a search for Respons / VVEM / eventbranche monthly data. The VVEM/Respons figures that surfaced (via search snippets, not opened) cover event counts and economic value, not months.

Supplier advice, all opened 2026-11-03:

| Source | Page date | Advice, verbatim |
|---|---|---|
| Stapfoods (caterer). https://www.stapfoods.nl/2026/08/17/hoe-ver-van-tevoren-boek-je-catering-voor-een-bedrijfsfeest/ | 2026-08-17 | "Voor grotere evenementen of feesten in drukke periodes zoals december is twaalf weken of meer aan te raden." Also busiest months: "november en december, gevolgd door de maanden mei en juni" and "Wie in die periodes een feest plant, boekt het best drie tot vier maanden van tevoren." |
| Timeless Events (agency, Zoetermeer). https://timelessevents.nl/bedrijfsfeest-kerst/ | modified 2026-10-09 | "3 tot 6 maanden van tevoren" ... "December is een drukke periode en populaire data en leveranciers zijn snel volgeboekt." |
| Uniq Event (agency, Haarlem). https://uniqevent.nl/kerstborrel-organiseren-alles-wat-je-moet-weten-voor-een-geslaagde-zakelijke-kerstborrel/ | 2026-07-08 | "Voor populaire locaties adviseren we om zes tot negen maanden vooraf te reserveren." and "De meeste bedrijven plannen hun kerstborrel in de eerste drie weken van december." |
| Wink Event & Entertainment (agency, Bladel). https://www.wink-events.nl/kerstborrel-organiseren-voor-personeel-waar-moet-je-rekening-mee-houden/ | no date on page | Checklist starts at "3 tot 4 maanden van tevoren", then 2 months, 1 month, 1 to 2 weeks. |
| De Kuip (venue). https://www.dekuip.com/nl/news/vier-kerst-in-de-kuip-met-jouw-organisatie | 2026-08-25 | Opens its Christmas sales in late August: "De zomer loopt langzaam op zijn einde en dat betekent dat het perfecte moment aanbreekt om alvast vooruit te kijken naar de feestdagen." |

Only hard number on December, and it is old: HR Praktijk, 23 December 2014, https://www.hrpraktijk.nl/juridisch/arbeidsovereenkomst/21-procent-van-de-werkgevers-doet-niet-aan-kerst-op-de-werkvloer/ citing a NationaleVacaturebank poll of 1,000 Dutch workers: "Bij 41 procent van de bedrijven wordt wel versiering opgehangen en een borrel gegeven. Eén op de vijf werkgevers pakt echt uit met een diner en een groot feest." Twelve years old, so use it as background only, not as a calculator default.

Suggested calculator use: a "book by" slider defaulting to **12 weeks before the event** (Stapfoods), with 6 to 9 months shown as the venue end of the range. For an outreach campaign that means messages for a mid December party land best in September and October, and November messages are already late for the venue but still fine for a €299 add-on that Framed can confirm within 12 hours.

---

## (c) What Dutch photobooth hire costs

All prices as stated on the page, opened 2026-11-03.

| Supplier | URL | Page date | Package and price, verbatim or near verbatim | VAT | Attendant | Prints |
|---|---|---|---|---|---|---|
| **Framed** | https://get-framed.com/photobooth-bedrijfsfeest/ | live | "€299 per event, incl. btw" ("€247,11 exclusief btw"), travel across NL included | incl. | optional, same price, "voor events tot 6 uur" | "Onbeperkt prints" |
| PhotoBooth Experience | https://photoboothexperience.nl/ | modified 2026-10-18 | Fotopaal "€ 329 Inclusief btw 5 uur", "Gratis transport tot 20 km", "Onbeperkt printen", "Elk extra uur € 39,-". Fotospiegel "€ 479 Inclusief btw 4 uur" | incl. | not stated for fotopaal; "Alle prijzen zijn inclusief begeleiding door een host" is under the 360 booth only | unlimited |
| Djunes | https://www.djunes.nl/en/photo-booth-south-holland | "Last updated 6 May 2026" | "Pickup near South Holland in Noordwijkerhout: from €300 per day", "Delivered in South Holland, weekdays (Sun–Thu): €325 per day", "Delivered in South Holland, weekend (Fri/Sat): €385 per day" | "All prices include VAT" | not included | "Includes unlimited printing" |
| Rotterdam based listing on photobooths-huren.nl | https://photobooths-huren.nl/fotobooth/zuid-holland-photobooth/ | modified 2026-05-24 | "3 uur (€340)", "4 uur (€390)", "5 uur (€440)"; "Exclusief props (kan worden bijgeboekt voor €20)"; "Eerste 50 km gratis vanuit Rotterdam (Zuid-Hollland), daarna €0,50 per km" | "Prijzen inclusief BTW" | "Zonder begeleider tijdens het feest" | "Onbeperkt printen" |
| photobooth-rotterdam.nl | https://www.photobooth-rotterdam.nl/ | modified 2026-08-29 | Light "€149 per dag" (digital only, QR), Basic "€229 per dag" ("Met printer"), Premium "€279 per dag" ("Highspeed printer"); "Opzetten doe je in vijf minuten" (self set-up) | not stated | none, self set-up | Basic and Premium print |
| Visualize Events | https://visualize-events.nl/photobooth-huren-zuid-holland/ | modified 2025-05-25 (oldest) | Spiegel Photobooth "€ 299 / 3 uur", "€ 499 / 5 uur", "€ 799 / 8 uur"; "Begeleiding door ons team (100 EUR)", "Luxe props op tafel (25 EUR)" | not stated | +€100 | "Onbeperkt printen" |

Market guide from the biggest Dutch marketplace (photobooths-huren.nl homepage, modified 2026-03-18, https://www.photobooths-huren.nl/): "Een goedkope fotobooth, inclusief prints, huur je al voor iets minder dan €300." and "Vanaf €395 kan je al een (opbaasbaar) fotohokje huren, hoewel je waarschijnlijk eerder rond de €450 tot €600 kwijt bent voor een klassiek photohokje." Magic mirror "vanaf €450". Framed's own booking form lists photobooths-huren.nl as a "Hoe heb je ons gevonden?" option, so he is likely listed there himself.

Like for like, an evening with set-up, unlimited prints and someone at the booth, near Rotterdam:
- Framed €299 incl. VAT, attendant included up to 6 hours, travel anywhere in NL included.
- Visualize €299 + €100 attendant = €399 for 3 hours (VAT not stated, page from 2025).
- photobooths-huren.nl Rotterdam listing €340 for 3 hours with no attendant at the party.
- Djunes €325 weekday / €385 Friday or Saturday delivered, no attendant.
- PhotoBooth Experience €329 for 5 hours, attendant not stated, transport free only to 20 km.

Suggested calculator default for "typical market price": **€340** (the Rotterdam based 3 hour listing, incl. VAT, delivered, no attendant), with the range €299 to €480 shown. Self set-up day hire (€149 to €279) is a different product and should be labelled that way if shown.

Extra found, not used: Urban Booth (https://urbanbooth.nl/photobooth-huren-zuid-holland/) shows "€325,00,- incl. BTW" for 3 hours, but the page is dated 2023-12-28 and its own title calls it a "digitale photobooth", so it was left out of the table.

---

## Framed's own offer, re-read from get-framed.com on 2026-11-03

| Item | Verbatim | URL |
|---|---|---|
| Price | "€299 per event, incl. btw" | https://get-framed.com/ |
| Ex VAT | "€299 per event, inclusief btw (€247,11 exclusief btw), met of zonder begeleiding." | https://get-framed.com/photobooth-bedrijfsfeest/ |
| Included | "Reiskosten, door heel Nederland", "Opbouw en afbouw", "Onbeperkt prints", "Fotostrip in jou stijl", "Alle foto's digitaal op aanvraag" | https://get-framed.com/ |
| With attendant | "Ondersteuning door een Framed-medewerker tijdens het event", "Voor events tot 6 uur" | https://get-framed.com/ |
| Without attendant | "Wij leveren, bouwen op en leggen alles uit", "De booth werkt zelfstandig, ook bij langere events" | https://get-framed.com/ |
| Same price | "Beide opties kosten hetzelfde." | https://get-framed.com/ |
| Damage excess | "Eigen risico max. €200" (with attendant), "Eigen risico max. €1.500" (without) | https://get-framed.com/boeken/ |
| Extra, red carpet | "Rode loper met palen + €49" | https://get-framed.com/boeken/ |
| Extra, props | "Props + €15" | https://get-framed.com/boeken/ |
| Deposit | "Je datum staat vast zodra de aanbetaling van €100 binnen is." | https://get-framed.com/veelgestelde-vragen/ |
| Pay per strip option | "Op markten en evenementen kan het ook zonder vast bedrag. Bezoekers betalen dan zelf per strip, tussen €4 en €10." | https://get-framed.com/photobooth-bedrijfsfeest/ |
| House style strip | "We maken de strip en het startscherm in jullie huisstijl, zonder extra kosten." | https://get-framed.com/photobooth-bedrijfsfeest/ |
| Custom design | "Onze designers maken kosteloos een strip naar jouw wensen." Formats "Strip 5 × 15 cm", "Vel 10 × 15 cm" | https://get-framed.com/strip-ontwerpen/ |
| Response time | "Je ontvangt binnen 12 uur een reactie van ons." | https://get-framed.com/contact/ |
| Set-up | "In ongeveer 30 minuten. Je hebt alleen een stopcontact nodig." | https://get-framed.com/photobooth-bedrijfsfeest/ |
| December tip | "Tip: vraag je datum op tijd aan, zeker voor events in december." | https://get-framed.com/photobooth-bedrijfsfeest/ |
| Reviews | "5,0", "7 reviews op Google, allemaal 5 sterren" | https://get-framed.com/ |
| Event types on form | Bruiloft, Verjaardag of feest, Gala, Bedrijfsfeest of personeelsevent, Beurs of congres, School of studentenfeest, Anders | https://get-framed.com/boeken/ |

Logos under "Eerder ingezet bij" on the homepage, read from the image alt text (10, the brief named 7): PINK NOIR, Erasmus Universiteit, Open32, Modefabriek, Universiteit Utrecht, Kula, Qurc Amsterdam, Emmauscollege, Het Paleis, SS Rotterdam. The Rotterdam page adds: "We stonden onder meer al op de SS Rotterdam en bij de Erasmus Universiteit."
