# People Database searches and their campaigns, one per angle (built 2026-10-04)

Each search is the exact filter set run in lemlist's People Database (Prospecting > People Database).
Every segment is owners only, so all of them use the v0.1 connect note ("I'm a business owner too").
Every campaign is a server side duplicate of `Small Business Owners v0.1 - Outreach Only`
(cam_PryZp5LuvQv8NznHh), same sender, sequence checked step by step against the source on 2026-10-04,
and every one is a DRAFT. Starting them is Raka's call.

The machine readable filter JSON for every segment, byte for byte what the loaders used, is in
`state/people_db_segments.json`. The lists below are the same filters in words.

Country set "EU/UK" = Netherlands, Belgium, Germany, France, United Kingdom, Ireland, Austria, Switzerland, Luxembourg.

## Final state, loaded and audited 2026-10-04 (all DRAFT, 0 launched, 0 sent)

| Campaign | id | Leads in lemlist |
|---|---|---|
| W1a new B2C owners | cam_hq7Dd3EyRZh7SshZq | 2,073 |
| W1b new B2C on a DIY builder | cam_7gnHSf6GvvGy8gH3n | 386 |
| W1c established B2C on a DIY builder, growing | cam_xFYYBzvfSHk83epvw | 398 |
| W2 new B2B service firms NL BE DE UK | cam_mRqYLaLuZfrTXeBqR | 4,127 |
| W3 growing 11-50 ops heavy firms, apps and tools | cam_Knj6kXngF2PbWfm5Z | 738 |
| W4 growing 11-50 agencies and tech firms, Build Squad | cam_TfLEo8mTNS46NoSEc | 2,413 |
| W5 1-50 clinics, law and accounting, GDPR | cam_ncBrkhdhyrSTek7mh | 4,333 |
| Total | | 14,468 |

**Schedule (Raka, 2026-10-05).** All seven: every day, 07:00 to 21:00 Europe/Amsterdam, 30 minutes between
actions (each campaign has its own schedule id, v0.1's skd_TCWAhkDXveyyi3oTR was not touched). Plan is about
18 invites a day, 126 a week, split roughly 60% website (W1b, W1c first, then W1a, W2), 25% W3, 15% W4/W5 as
50 lead tests. v0.1 stops when these start. The LinkedIn daily invite limit (25 on 2026-10-05) is an account
setting the API can't change, Raka sets it to 18 in lemlist Settings.

**Launch log (2026-10-05).** LinkedIn daily invite limit confirmed at 18 (visits 20, messages 20). v0.1
cam_PryZp5LuvQv8NznHh paused. W1b launched (386 leads) and W1c launched (398), auto review off. Test campaigns
built from 50 random clean leads each (owner rule passed, located in the nine countries, no fixed or flagged
names), moved out of W4 and W5 so nobody is in two: W4 TEST 50 cam_iDMXXfaWWg8RkgHpi and W5 TEST 50
cam_BRBXAzzDKMfC4fSCS, both draft, same sequence and 07:00 to 21:00 schedule. W4 now 2,363, W5 4,283.
Waves after this: W1a and W3 when W1b/W1c run low, then W2.

**Raka's rule (2026-10-04): only CEO, owner, founder or co-founder**, because the connect note says "I'm a business
owner too". Enforced on every lead by `tools/owner_title_rule.py` (`is_strict` on the title at the company of the
segment's size, `tagline_ok` against retired, deceased, "Late Co-Founder", "met pensioen", "pensionada" etc.,
50 self tests). Managing Director, Directeur, Geschäftsführer, Gérant, Zaakvoerder, Partner and plain
"Entrepreneur" are NOT accepted on their own. Owner words in other languages that are accepted include Eigenaar,
Oprichter, Gründer, Inhaber, Besitzer(in), Gesellschafter, Fondateur/Fondatrice, Propriétaire, Associé gérant,
Chef d'entreprise, Zakenbezitter, Founding Director.

How it was checked, three different ways.
1. Per load, every add call's added + skipped + failed equalled what was sent, then each campaign was read back.
2. lemlist's own campaign stats totals matched the loaders' sums for every campaign.
3. An independent read only audit pulled every lead from all seven campaigns plus v0.1 and v0.2 and found:
   0 leads failing the owner rule, 0 duplicate LinkedIn URLs within or across W1a..W5, 0 shared with v0.1/v0.2.
   It flagged first names: 17 titles in the firstName slot ("Med", "Drs", "Ir", "Ing", "Oec", "Rer", "Vhb",
   "DrFarid") were corrected to the real first name, and 9 company profiles (Apex Accountancy, Courage Horizon,
   Miracourt, Mentraal, Jenton Group, Boom Living, Direct Ô Foncier, Gala's Kitchen, Fritz Agricole) were removed.

W1a was cleaned to the same rule: 39 non owners removed, 112 builder site owners moved to W1b (Raka's call),
58 wrong job or company fields corrected. Also removed or never loaded: two "Late Co-Founder" profiles, retired
owners (Kees van der Westen, Fred Overkleeft, Jonathan Craig, Steve Pipe, Rob Mulder), ex founder Jeremy Benson,
and two "Business Owner" product roles (Claudia Berrevoets-Keizer, Laura Steinmetz).

## The owner block (search side; the strict rule above is then applied to every row)
- Seniority: Ownership / Firm Leadership
- Person's own country: the segment's country set (drops owners living in the US, India, Morocco etc.)
- LinkedIn connections: 251-500, 500+
- Current title contains one of: Founder, Co-Founder, Owner, Co-Owner, Eigenaar, Mede-eigenaar, Oprichter,
  Gründer, Geschäftsführer, Inhaber, Fondateur, Gérant, Zaakvoerder, Managing Director, CEO, Directeur, Président
  (W1b/W1c add Fondatrice, Unternehmensinhaber, W5 adds Praxisinhaber, Praktijkhouder)

Why the title filter. Seniority alone lets in investors, board members, advisers and staff at the company.
Tested on W3: the 745 people the title filter removes were sampled (25), and most were investors, estate agent
"partners", employees and non executives. The 858 it keeps were 25 of 25 real owners. On W1b it removed exactly
the advisers and board members (8 of 56) and kept the owners. The cost is a few real owners with unusual titles
("Founding Director", "Partner"), accepted.

## W1a Website, new B2C owners. 2,633 people. Campaign cam_hq7Dd3EyRZh7SshZq
"W1a Owners of new 1-10 consumer businesses EU/UK". Built before the owner block existed, so it has seniority
and connections but not the title or person country filters.
- Seniority: Ownership / Firm Leadership
- Company headcount 1-10, company country EU/UK, founded 2024 to 2026
- Sub-industry: Hospitality, Food and Beverage Services, Events Services, Online and Mail Order Retail,
  Retail Apparel and Fashion, Personal and Laundry Services, Food and Beverage Manufacturing
- Company market: B2C, B2B/B2C
- LinkedIn connections: 251-500, 500+

## W1b Website, new B2C on a DIY site builder. 1,146 companies, then owners. Campaign cam_7gnHSf6GvvGy8gH3n
"W1b Owners of new 1-10 consumer businesses on DIY site builders". Two steps, because the Technologies filter
only works in company search.
1. Companies: headcount 1-10, company country EU/UK, founded 2024 to 2026, the same seven sub-industries as W1a,
   Technologies Wix, Squarespace, Jimdo, Webnode, Strikingly, Weebly, GoDaddy Website Builder,
   market B2C, B2B/B2C. (1,837 before the market filter.)
2. People at those companies (company IDs), with the owner block.
Check: 100 of 100 companies on page one really carry a builder in their tech list. Weakness: the tech list can
pick up a builder from an embedded widget (Luminate Festival shows Strikingly next to a full React stack), so
the per lead research still has to confirm the site itself is on the builder.
Overlap: every W1b person also fits W1a's filters, and W1a was loaded first, so dedupe keeps those people in
W1a. W1b ends up holding the builder owners W1a missed. Moving the overlap across needs deleting leads from
W1a, which waits for Raka's word.

## W1c Website, established B2C still on a DIY builder and growing. 1,428 companies, then owners. Campaign cam_xFYYBzvfSHk83epvw
"W1c Owners of established consumer businesses on DIY site builders".
1. Companies: headcount 1-10 and 11-50, company country EU/UK, founded 2005 to 2021, the seven W1a
   sub-industries plus Recreational Facilities, Retail Furniture and Home Furnishings, Retail Luxury Goods and
   Jewelry, the same builder list, headcount growth 5% to 200%, market B2C, B2B/B2C.
2. People at those companies with the owner block.
Why: the D&Z pattern, a real business that has outgrown the site it built itself. The growth filter took this
from 15,502 to 2,105 companies, the market filter to 1,428. Page one: 100 of 100 carry a builder, all B2C or
B2B/B2C, all growth 5% or more.

## W2 Website, new B2B service owners NL BE DE UK. 4,237 people. Campaign cam_mRqYLaLuZfrTXeBqR
"W2 Owners of new 1-10 B2B service firms NL BE DE UK".
- Company headcount 1-10, company country and person country NL, BE, DE, UK, founded 2024 to 2026
- Sub-industry: Business Consulting and Services, Professional Training and Coaching, Design Services,
  Architecture and Planning, Engineering Services, Legal Services, Accounting
- Company type: Privately Held, plus the owner block
Was 5,799 before the owner block. Two samples of 25 (different seeds and pages): 50 of 50 owners of a firm
founded 2024 to 2026.

## W3 Apps and internal tools, growing ops heavy firms. 827 people. Campaign cam_Knj6kXngF2PbWfm5Z
"W3 Owners of growing 11-50 ops heavy businesses, apps and tools".
- Company headcount 11-50, company country EU/UK, founded 1950 to 2022, headcount growth 5% to 200%
- Sub-industry: Machinery Manufacturing, Fabricated Metal Products, Printing Services, Plastics and Rubber
  Product Manufacturing, Furniture and Home Furnishings Manufacturing, Events Services, Real Estate, Medical
  Practices, Freight and Package Transportation, Warehousing and Storage, Truck Transportation, Specialty Trade
  Contractors, Repair and Maintenance, Facilities Services
- Company type: Privately Held, plus the owner block
Why: 11 to 50 people is where quoting, scheduling and order handling start breaking on spreadsheets, growth means
it's getting worse. 7,109 with seniority only (top result an executive coach with past roles only), 1,573 with
growth, 858 with the title filter, 827 with person country. Two samples of 25: 50 of 50 owners (machining shops,
packaging, logistics, facilities, estate agencies, events).

## W4 Build Squad, growing agencies and tech firms. 2,497 people. Campaign cam_TfLEo8mTNS46NoSEc
"W4 Owners of growing 11-50 agencies and tech firms, Build Squad".
- Company headcount 11-50, company country EU/UK, founded 2010 to 2024, headcount growth 5% to 200%
- Sub-industry: Advertising Services, Design Services, IT Services and IT Consulting, Technology, Information and Internet
- Company type: Privately Held, plus the owner block
Two samples of 25: 50 of 50 founders or owners. The mix is agencies (creative, WordPress, performance
marketing) and funded software start ups, both are Build Squad buyers. Reply history on this angle is 0 of 12.

## W5 GDPR, clinics, law and accounting firms. 4,879 people. Campaign cam_ncBrkhdhyrSTek7mh
"W5 Owners of 1-50 clinics, law and accounting firms, GDPR".
- Company headcount 1-10 and 11-50, company country EU/UK
- Sub-industry: Medical Practices, Legal Services, Accounting, Veterinary Services
- Company type: Privately Held, plus the owner block
Why: they hold sensitive personal data, so a tracker firing before consent costs them more than anyone. Two
samples of 25: 50 of 50 owners, about 4 in the second sample are software start ups the index files under
these industries. Reply history on this angle is 0 of 14, so it loads last.

## Load order and overlaps
lemlist dedupe (`deduplicate: true`) skips anyone already in another campaign, so the first campaign loaded
keeps a person. Order: W1a, then W2, W4, W5 (W2 before W5 because Legal and Accounting overlap), then W1b,
W1c, W3 (W1c before W3 because Events Services overlaps). Anyone we have ever contacted in v0.1 or v0.2 is
skipped the same way.

## Tested and dropped
- Last funding round under 6 months, owners at 1 to 50 people, EU/UK: 2 people. Funding data is almost empty for
  small firms, so funding is not a usable filter at our size.
- W1 without the industry and market filters: 32,080 people, top results board advisers and solo healers.
- Sub-industry "Wellness and Fitness Services" is not a valid value and silently matches nothing. Every
  sub-industry above was checked against the valid list.
