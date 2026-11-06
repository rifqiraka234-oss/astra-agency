# List check, 2026-11-06. 30 random leads each from W2, W3 and W5

Raka, 6 Nov, "yeah pull 30 leads from W2, W3 and W5", after asking which campaigns should run because he's worried
they don't bring the right meetings.

How. `GET /api/v2/campaigns/<id>/export/leads?state=all&format=json` (state=all returns every lead on a never launched
campaign, state=scanned and notLaunched return the same count, positive control 738 on W3). Full lists W2 4,127,
W3 738, W5 4,283. 30 drawn with `random.seed(20261106)`, so the same 30 come back on a rerun. Samples saved in the session
scratch, icp/W2_sample.json and so on.

Judged from the lemlist fields only (job title, company, industry, size, location, description), not from their sites.
Good fit means an owner or founder of a business that sells to other businesses or to high value clients, big enough to
pay €2,500+, in NL, BE, DE, FR, CH or the UK, and not selling what we sell.

## W3, owners of 11 to 50 person ops heavy businesses (738). 19 good, 9 maybe, 2 poor

Good. DearEmployee (employee wellbeing for employers, DE), Better Minds (mental health for employers, NL), Home Hunts
(luxury property finders, FR), British Homesellers (estate agency), Risto Regeltechniek (control systems, NL), LVF
Packaging (packaging maker, Leeds), BAS E-Lifters (lifting equipment maker, NL), HEKKER interieur (interior builder, NL),
UKREiiF (real estate investment forum, sells sponsorship), Hubr (workspace, BE), Doig Furniture (furniture maker),
EventTouch (event tech, NL), Honders / Alting Makelaars (estate agent, NL), Cuthings (manufacturing, BE), Expo Flora
Harmelen (flower trade, NL), PROCEPT (engineering, BE), De Bruin Process Equipment (process tanks, NL, the closest thing
to Schumacher in any list), OPEN (property development, NL), Clever-CPL (manufacturing, NL).
Maybe. Richter Groupe Immobilier (title says team inside the group), Het Koelhuis, conmoto, Swoon (consumer furniture),
Azure Dental, JIJ! Advies & Coaching, Luceo Dental, Club BASIS, Switch Air.
Poor. Akabo Media and People, both agencies that sell what we sell.

## W5, owners of 1 to 50 person clinics, law and accounting firms (4,283). 11 good, 15 maybe, 4 poor

Good. accountup, Aequalaw (law firm, Brussels), COMP. Lawyers (competition law, NL), Eppings & Marcusse (accountants,
NL), LKA Chartered Accountants, Service Notaris Dutch Caribbean, We are Pi Accountants, Sevestre & Associés (law firm,
Paris), Plan Accountancy, Robert James Solicitors, TAXWELL (tax advice, NL).
Maybe. Veterinary Tissue Bank, Instaclause and Klea (legal software, so Build Squad rather than workflows), The Home Team
(home care), wilhow, The Expert Witness Site, Instituut van der Stam, Motive Ton Salarié, Fysio Box, BENZAKEN, Urologikum
Uelzen, SlimVerwijzen, HealthyMentis, Salvivo, TaxAssist East Finchley (a franchise, the central brand owns the site).
Poor. Praktijk Niya (one therapist), Noodz (entertainment, wrong list), De Glimlach van Morgen, Zebra (no site, no detail).
The campaign's name and angle are GDPR, which RULES 0E bans as a pitch. The list itself is good for AI workflows.

## W2, owners of new 1 to 10 person B2B service firms (4,127). 4 good, 6 maybe, 20 poor

Good. Club Safety & EXsupplies (safety supplies to venues, NL), Severn Marine Geoconsulting (marine engineering), TecSurion
(project control for energy and infrastructure, NL), A-Maximus (robotics, Berlin, the contact is the CTO co-founder).
Maybe. MADD XP, Siren XYZ, Assured Consultancy Services, Optcl.io, RemedyStudios, Autonomyware.
Poor, 10 sell what we sell. Leapfrog A.I., Equaliser, Locorum Media, PractAIce, Women of AI Agency, Nexuro Digital,
GRWTH, Inpact B2B, The Story Labs, Studio Wake.
Poor, 7 are one person coaches or consultants. You Perform Better, +pascal, Omni Task Global, Doelgerichte Gesprekken,
Commonplace Collective, Gremia, Motion Consultancy.
Poor, 2 outside our region. AutoPillar (New York), Beyond Lab (Lima). Haa-Aya Businesses has no site and no detail.

## What it means

W3 is the list we've been missing. It holds manufacturers, estate agents and B2B service firms with 11 to 50 staff, the
same shape as Schumacher and Qualigraf. W5 is good for the workflow angle with law and accounting, the De Jong shape, but
not under the GDPR name. W2 as built is mostly agencies and solo consultants, so it needs a refilter before it sends.

## Recheck, same day, on Raka's "make sure everything again"

Three more sources, and they change the picture.

1. **The 25 Oct review and the 28 Oct plan already decided this** (`docs/reviews/2026-10-25-gtm-outreach-review.md`,
   `docs/gtm-plan.md`). B2B 15 of 80 yes against consumer 2 of 53 where both labelling methods agree. Tech and
   manufacturing 13 of 80 (16%), the best group. Agencies, coaches and recruiters 1 yes from 32. English speaking
   professional services 0 of 31. France 0 of 40 since September. Raka's call on 28 Oct was W3, W4, W5 and W1b/W1c at
   about a quarter of the 18 daily invites each, consumer kept for 500 euro builds. **In lemlist today W3, W4 and W5 are
   still draft and W1c is paused, so it never went live.** Only W1b sends.
2. **W1b is nearly empty.** Lead states 6 Nov, 226 invited and waiting, 83 accepted, 15 replied, 50 at the like post
   step and 7 not started. About 57 invites left, three days at 18 a day, then nothing goes out at all.
3. **Every sampled company's homepage fetched** (108 domains, curl, title and meta description). Corrections to the
   desk read above.
   - W3. Better Minds is an expat psychology practice, British Homesellers and Home Hunts sell homes to consumers, not B2B.
     Richter, Home Hunts and Switch Air are France or Geneva, outside the region rule. Club BASIS is a nightclub. Akabo
     Media is B2B intelligence for logistics, not an agency, and Het Koelhuis is a venue selling staff parties and
     congresses, both upgraded. Recount 14 confirmed good, 2 good by label but the site didn't load (Expo Flora behind
     Cloudflare, Risto no answer), 8 maybe, 6 out.
   - W5. Sevestre, Aequalaw, wilhow, Motive Ton Salarié and BENZAKEN are France or Brussels, out by the region rule. Noodz
     is a parked domain for sale, a dead business. Recount 5 law or accounting firms confirmed in region (COMP. Lawyers,
     LKA, accountup, Eppings & Marcusse, Robert James), 3 more whose sites didn't load (Service Notaris, Pi Accountants,
     TAXWELL), 5 B2B platforms that fit outreach better than workflows (Instaclause, Klea, SlimVerwijzen, Expert Witness
     Site, Veterinary Tissue Bank), about 8 consumer clinics, 5 out of region, 1 dead.
   - W2 confirmed as read. 13 of 30 sell marketing, content, AI adoption or go to market (GRWTH is a B2B GTM agency, a
     direct competitor), 3 coaches, 2 dead sites outside Europe.
   - **W4 added (30, same seed).** 10 B2B software or lab firms in region that sell to businesses and would buy an outreach
     flow (AdvisoryAI, flair, Caya, Tap Electric, Pharmlogic, Briink, Satorus, Life Moments, Ingenium, Tooker), 5 agencies
     or dev shops (AffilyAds, Fingerspitz, wolk, Hittra, BlueNest), 6 France, the rest unclear or with a wrong location
     (Explosion is Berlin, lemlist says Lima).
4. **Overlap.** Every lead in W2, W3, W4, W5 and W1a checked by LinkedIn URL against v0.1, W1b, W1c, both tests and the
   founders campaign. 0 already contacted, 0 duplicates inside a list.
5. **Region and agency pass on the whole lists** (location text, plus a keyword pass on name, tagline, title and industry
   for agency, marketing, studio, coach, consultant, recruit, growth, AI). W3 548 of 738 left, W4 1,205 of 2,363, W5
   2,835 of 4,283, W2 2,038 of 4,127. A first cut only, lemlist's location is wrong sometimes.
