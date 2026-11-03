# Framed prototype research, 3 Nov 2026

Data for the "find Dutch companies planning a December or staff event" demo for Framed Photobooths (get-framed.com, KVK 91322820). Everything was opened on 2026-11-03.

## Files

| File | What | Count |
|---|---|---|
| `leads.json` | Organisations with a dated public signal | 15 |
| `partners.json` | Rotterdam area venues and agencies that run many company events | 5 |
| `benchmarks.md` | Reply rates, December booking advice, competitor prices, Framed's own price list and logos | 6 competitor pages, 4 reply rate sources |

Leads by signal type: jubilee 4 (Sluyter 100, airport 70, Hell's Kitchen 25, Saltwater 20), new office or HQ 4 (Robin Radar, Nieman, Blömer, plus Barrio as a new venue), vacancy with event duties 2 (Helloprint, Quintor), hiring wave 1 (Payter), funding 1 (Ore Energy), student association 2 (Christiaan Huygens lustrum, UNFC kerstgala), public kerstborrel 1 (VAO). Cities: Rotterdam 6, Delft 3, Den Haag 2, Utrecht 1, Dordrecht 1, Berkel en Rodenrijs 1, Hendrik-Ido-Ambacht 1.

## How it was checked

1. Every lead and partner has a `sourceUrl` that was fetched today and a `sourceQuote` copied from it. A script then checked each quote against the saved copy **and** against a second fetch of the same URL made afterwards. 20 of 20 matched both times. A made-up sentence run through the same check came back not found, so the check can fail.
2. Every size figure (`sizeBand.basis`) and every quote inside `notes` was checked the same way against its saved page. 13 of 13 found.
3. Every `website` was opened. Wrong domains were caught and not used: `sluyter.com` is "Sluyter Company Ltd.", a different firm, and `barrio.nl` is a café in Oss. The right ones are `sluyter-logistics.nl` and `barriorotterdam.nl`.
4. Google News links were turned into the publisher's URL and that page was opened. No item rests on a headline or a search snippet.
5. Vacancy dates come from the employer's own data: Recruitee `published_at` for Helloprint and Payter, `datePosted` on the page for Quintor.
6. Every quoted string in `benchmarks.md` was checked against the saved pages. Two with links inside them were checked again against the text as it shows on the page.

No personal names are in any `contactRole`. The Helloprint vacancy names its CEO and VP of People by first name. That's left out.

## What was dropped, and why

| Candidate | Reason |
|---|---|
| Neste, new office in EDGE Coolsingel Rotterdam (Vastgoeddata, 2026-09-30) | Moves in "in de zomer van 2027", too far out for a party in the next 3 months |
| Van der Valk hotel at the Boompjes, Rotterdam (Rijnmond, 2026-10-07) | Opens early 2028 |
| Holland Casino 50 jaar (CasinoNieuws, 2026-10-01) | National chain, very likely above the 1,000 staff cap. Headcount not checked, so dropped rather than guessed |
| SpectaCell, €6M (InnovationQuarter, 2026-10-08) | Based in Gent, Belgium |
| Learned, €3M (MenA, 2026-10-15) | Article gives no city and learned.io renders nothing without scripts, so the location couldn't be confirmed |
| Grand Café Do, Groot Handelsgebouw (OPEN Rotterdam, 2026-10-22) | A single new café with no group or events angle found |
| Nieuwenburg Sfeer & Events, 125 years, Hofleverancier (Sleutelstad, 2026-09-08) | A good partner type (events and decoration) but based in Zoeterwoude near Leiden, outside the Rotterdam brief. Kept here as a reserve partner |
| Raad & Daad, Eivissa Events, Advance Events (Rotterdam agencies) | No page date within the window (none, 2025-11-11, 2026-03-11) |
| FAECTOR Interfaculty Gala page | The page is the 2023 edition |
| EFR Master Career Week (16 Nov to 4 Dec) | A career fair, not a party |
| "Office, Facility & Event Manager" at Payter | Named in a search snippet but not in Payter's live Recruitee feed. Payter is kept for its hiring wave instead |
| Urban Booth price (€325 for 3 hours) | Page dated 2023-12-28 and it's a digital booth. Mentioned in benchmarks but not in the comparison table |

## Things that looked off, or that Raka should know

1. **The brief lists 7 client logos. The homepage shows 10.** Also there: Open32, Emmauscollege and Het Paleis (read from the image alt text).
2. **No Dutch survey measures how far ahead companies book their December party.** The benchmarks give supplier advice only (12 weeks from a caterer, 3 to 6 months and 6 to 9 months from agencies). The only percentage found is a 2014 poll. Treat the lead-time slider as advice, not data.
3. **The email reply benchmarks differ by 7.6x because they define "reply" differently.** Instantly gets 3.43% (all replies over sends), Belkins gets 0.45% (human replies only). lemlist and Woodpecker both re-quote Instantly, so they don't count as separate sources.
4. **Quintor is the weakest item.** It was posted 2026-06-26, a little over 4 months ago, and may already be filled. It was still listed today.
5. **Saltwater's founding year doesn't match.** The Dordrecht.net article says 2006 and 20 years "deze maand". A third-party profile in a search snippet says 2007. The article was used.
6. **Several signal dates are event dates, not post dates.** CH lustrum week 2026-11-16, UNFC gala 2026-12-17 and VAO kerstborrel 2026-12-08 use the date the page shows for the event. The UNFC page itself was published 2026-09-03.
7. **The De Kuip quote is the page's meta description**, because the article body loads by script. The date 2026-08-25 comes from the page's own data.
8. **The homepage has a typo**, "Fotostrip in jou stijl" (should be "jouw"). The business and Rotterdam pages spell it correctly.
9. **Framed's booking form lists "photobooths-huren.nl" and "ThePerfectWedding" as referral options.** He is probably listed on that marketplace, which also publishes the market price guide used in benchmarks.
10. **Some pages couldn't be fetched through our proxy.** That's our failure, not theirs, and nothing was said about these sites: vannellefabriek.com, rotterdamahoy.nl, star-rsm.nl, vsv.tudelft.nl, etv.tudelft.nl, flitskoning.nl, fotosnap.nl (Cloudflare wall), ad.nl (privacy gate), emerce.nl (empty body).
11. **The Instantly page's HTML has a comment "Published: Mon Nov 02 2026".** That looks like a build timestamp. The visible "Updated January 12, 2026" was used as the page date.
