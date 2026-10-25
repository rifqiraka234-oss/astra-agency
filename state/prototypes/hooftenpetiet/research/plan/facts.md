# Hooft & Petiet and ReShare, growth plan facts. Every line read on 25 Oct 2026 unless dated otherwise

Raka, 25 Oct, on my honest review of v3, "Do itt". The plan is the second half of the Hertling v3 recipe. Every figure
in plan.json comes from a row below, and every row names the page it was read on.

## Their sites today

| Fact | Source, how checked |
|---|---|
| hooftenpetiet.nl runs WordPress 7.0.2 with Elementor, 339 words of visible text on the homepage, 0 form fields, 50 images | tools/site-audit.js 25 Oct (research/plan/audit-hp.txt), Playwright innerText read 25 Oct |
| The homepage opens on six lime service buttons over a photo, and its headline types itself ("Hooft & Petiet verk…" mid animation in the shot) | Screenshot /tmp/claude-0/hp-plan-2510-desktop.png, looked at |
| The sitemap lists 26 posts and 29 pages (55 content URLs), plus 2 category and 2 author URLs | sitemap_index.xml and its child sitemaps fetched 25 Oct, list in research/plan/sitemap-2510.txt |
| Both category pages return HTTP 500 (/category/hp-artikel/, /category/hp-vacature/) | curl 25 Oct, both 500 |
| 12 of the 26 posts share one page title, "Onze logeerwoningen stemmen tijdelijke bewoners vrolijk", among them the Cazas, Stadgenoot, HEF Wonen, Portaal and verkoopstyling stories | Each fetched 25 Oct, all 200 and distinct (different URLs, different H1s), the other 14 titles are unique, which is the control |
| The homepage shows no review, score or price, and no client quote in its text. It shows client logos (Havensteder, Portaal, Stadgenoot, Heijmans and more) | Rendered text and image alts read 25 Oct |
| The site loads HubSpot (js.hs-scripts.com/147700340.js) | Homepage HTML, 25 Oct |
| Residents rated the guest homes 8 to 8,5 through an independent bureau, published 30 Jan 2020 | /onze-logeerwoningen-stemmen-de-tijdelijke-bewoners-vrolijk/ (research.md v2 row) |
| reshareliving.com opens with "Deze site is in ontwikkeling", 2 images, no privacy link, fonts loaded from Google | tools/site-audit.js 25 Oct (audit-rs.txt), screenshot looked at |

## The market

| Fact | Source |
|---|---|
| "Momenteel pakt de sector ieder jaar bijna 90.000 woningen aan." | Aedes, "Herijking NPA, van toekomstklaar isoleren naar warmtevraagreductie", 27 Mar 2025, https://aedes.nl/verduurzaming/herijking-npa-van-toekomstklaar-isoleren-naar-warmtevraagreductie |
| Average heat demand of corporation homes 108 kWh/m² in 2024, must be under 94 by 2030 and under 87 by the end of 2034 | same page |
| "Corporaties gaan al hun woningen met een E-, F-, of G-label tot en met 2028 versneld verduurzamen." | Aedes, "Wat omvatten de Nationale Prestatieafspraken op hoofdlijnen?", 30 Jun 2022, https://aedes.nl/nationale-prestatieafspraken/wat-omvatten-de-nationale-prestatieafspraken-op-hoofdlijnen |
| "Corporaties investeren daarom tot en met 2030 jaarlijks € 200 miljoen extra in woningverbetering" | same page |
| Aedes has 255 member corporations, "We zijn er voor de 4 miljoen mensen die een huis bij ons huren" | https://aedes.nl/over-aedes, read 25 Oct 2026, the page carries no date for these figures |
| The Dutch aim, a fully circular economy by 2050, with the interim goal of 50% less primary abiotic raw materials in 2030. PBL, "heel erg onwaarschijnlijk" that the 2030 halving is met, on current trends about 25%, half the goal | PBL, "Toelichting haalbaarheid halveringsdoelstelling 2030", 20 Feb 2025, https://pbl.nl/downloads/pbl-2025-toelichting-haalbaarheid-halveringsdoelstelling-2030-5847pdf (pdftotext read) |
| "in 2030 50% circulair in te kopen", as KeyPro words the national aim | KeyPro press page, 16 Oct 2025 (research.md) |

## The moving allowance and the ruling

| Fact | Source |
|---|---|
| Statutory minimum moving and refurnishing allowance for a self contained home, €7,926 for moves from 28 Feb 2026, €7,673 from 28 Feb 2025 to 27 Feb 2026, indexed every year before 1 March | Rijksoverheid, "Wanneer heb ik recht op verhuiskostenvergoeding?", read 25 Oct 2026 |
| Hoge Raad 1 Apr 2022, ECLI:NL:HR:2022:493. A tenant staying in a fully furnished and fitted wisselwoning offered by the landlord "geen aanspraak kan maken op de minimumbijdrage", also when the tenant turned down a reasonable offer. "In beginsel". Whether the home is a reasonable provision depends on location and quality, length of stay, whether belongings must move and the tenant's circumstances. Costs that remain (transport, storage, refurnishing) are still the landlord's | Dirkzwager, Robert Rijpstra and Lotte Blum, 7 Apr 2022, https://www.dirkzwager.nl/kennis/artikelen/in-geval-van-een-ingerichte-en-gestoffeerde-wisselwoning-geen-recht-op-verhuiskostenvergoeding |

How it's used. As the stake per household and as a page H&P can own, never as a saving we promise. The page says to
check with their own lawyer.

## Rivals, homepage only, rendered in Chromium 25 Oct

Found through a search for logeerwoningen inrichten for corporations. KeyPro is left out, it's the sister company.
Rentaro returned a Cloudflare challenge to Chromium and to tools/fetch-walled.py, so it isn't scored.

| Firm | Reviews or a score | A price | Client words | Named clients |
|---|---|---|---|---|
| Moving-In | "9.4/10 Feedback Company" in the header | none in the text | "Fijne communicatie met het team van Moving-In", "Bewoners geven de logeerwoning hoge cijfers!" | Logos incl. Portaal and Havensteder (image alts) |
| Furniture Lease | "Onze opdrachtgevers aan het woord", named and dated reviews, "Bekijk alle reviews" | "Kant & Klaar pakket Al vanaf € 149,50" | yes, the reviews | none in text or alts |
| Ross Tucker | none | none | "We hebben goede ervaringen met Ross Tucker…" | none in text or alts |
| Full House Meubelverhuur | none | none (a Tarieven link) | none | none, says woningcorporaties use it |
| Hooft & Petiet today | none | none | none | yes, 25 logos |

Controls. The € detector found Furniture Lease's price, the score search found Moving-In's 9.4, so a "none" means none in
the rendered text. A first automatic form count reported 0 fields for every rival, and a read of the forms then found an
8 field contact form at the bottom of Furniture Lease's homepage, so no claim about forms is made.

## For the plan's offer

- The group's marketing team runs both brands (H&P marketing internship page, research.md).
- H&P quote form fields and the verkoopstyling prices (research.md).
- Astra team block and partner disclosure copied word for word from the Hertling plan Raka signed off.
