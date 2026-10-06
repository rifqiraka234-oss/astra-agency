<!-- NO DRAFTS -->
# nsa08, AI default angle rescreen, 2026-10-06

None of the eight passed the owner screen, so there are no drafts. All eight were NO_STRONG_ANGLE / NOT_ICP before (queue, 2026-09-30) and every one of those verdicts still holds when rechecked against today's registers.

**Checks run this session, 2026-10-06**
- `get_inbox_conversation` on all 8 contactIds. Every one came back `totalItems 0`, `nextPage null`, LinkedIn sync `recent` at 2026-10-06T06:14:43Z. Positive control in the same minutes was Dr Shirah Mansaray (ctc_SYhzxxMTBCWtodyt6), which came back full with 2 messages: the connect note on 2026-10-05T12:11Z and the opener on 2026-10-05T20:01Z. The method works, so for all eight, empty means no message was recorded. The connect note isn't always logged as an activity.
- `search_campaign_leads` by leadId on all 8. All sit in v0.1 (cam_PryZp5LuvQv8NznHh), which now reads **paused**.
- Grepped state/silent_accepted_queue.jsonl and state/drafted_*.md by contactId. Each lead has one row, status NO_STRONG_ANGLE. There are no openers, sends or nudges on any of them. The sources are drafted_2026-09-30-new-accepts.md (Stark) and drafted_2026-09-30-evening-accepts.md (the other seven).
- Statutory registers opened today. Companies House officers and PSC pages for 04454504, 06817945, 10094703, 10094327, 05185023, 13910319 and 04555006, plus the parents and side companies 14110856, 03224862, 12128850 and 17082571. All 22 fetches returned 200. recherche-entreprises for SIREN 402010904. northdata KvK 66359953 through tools/fetch-walled.py. Positive control for the surname check: MAHER does show up on the 13910319 officers page and PRICE on the 04555006 page, so the grep finds a name when the name is there.

## Mathieu Stark, Duplo France, ctc_mZdZ2YvCWQPin4jJ4

- Thread is empty (0 items, control full). No reply and nothing sent beyond the connect note. Queue row is NO_STRONG_ANGLE, a 2026-09-30 sweep, with no message sent.
- lemlist says jobTitle "Directeur Général", tagline "Directeur Général chez Duplo France". His own jobDescription says he runs it "en cohérence avec la vision du groupe international". companyDescription starts "Filiale de Duplo International".
- Register: recherche-entreprises SIREN 402010904, DUPLO FRANCE, created 1995-07-11, active. The only dirigeant listed is Gérant BRUNO PICQUET; Stark is not on it. http://duplofrance.fr returns 200 after redirecting to https://www.duplointernational.com/ (opened 2026-10-06). The https version gave a certificate name mismatch through our proxy, and I'm not treating that as evidence about their site.

**Verdict: CLOSED_NOT_ICP.** He's a salaried DG at a subsidiary of a foreign group, he isn't the legal gérant, and the website belongs to the parent. There's nothing here he owns to buy for.

## Scott Bentley, ASM Ltd (Asbestos Survey & Management Limited 04454504), ctc_XTtknHb2Pe827d2AR

- Thread is empty (0 items, control full). Queue row is NO_STRONG_ANGLE, NOT_ICP checked 2026-09-30, with no message sent.
- lemlist says jobTitle "Director", tagline "Highly experienced Senior Director within the Asbestos and Compliance industry". His summary says "Board Director/Section Head", which describes a role he holds, not a business he owns.
- Companies House 04454504 (opened 2026-10-06): 11 officers, 10 resignations. The only active officer is HANCOCK, Dean, director since 31 Aug 2022. The PSC is Brufern Holdings Ltd (14110856, 75% or more). Brufern's own officers are Dean Hancock (director) and Samantha Hancock (secretary), and its PSC is Mr Dean Hancock. BENTLEY doesn't appear on any of these pages.

**Verdict: CLOSED_NOT_ICP.** He's a senior employee and Dean Hancock owns the company.

## Mandy Taylor, CCA Recruitment Limited 06817945, ctc_odYXYzWf3ZBxEiNfe

- Thread is empty (0 items, control full). Queue row is NO_STRONG_ANGLE, NOT_ICP checked 2026-09-30, with no message sent.
- lemlist says jobTitle "Associate Director", tagline "Senior TA Leader | AI Enabled Hiring Strategy | ... | Open to Permanent & Interim Roles". She's job hunting, and her tagline already claims AI hiring as her own skill.
- Companies House 06817945 (opened 2026-10-06): 2 officers, QUIGLEY Samuel Charles (director) and QUIGLEY Sharron (secretary). The PSCs are Samuel Charles Quigley (more than 50% but less than 75%) and Sharron Quigley (more than 25% but not more than 50%). TAYLOR isn't on either page.

**Verdict: CLOSED_NOT_ICP.** She's an employee and the Quigleys own the firm. I didn't claim any recruitment workflow pain, because she isn't the buyer.

## Peter Lannister, Staffright Group, ctc_7GZWG4bkwpkxBp3vg

- Thread is empty (0 items, control full). Queue row is NO_STRONG_ANGLE, NOT_ICP checked 2026-09-30, with no message sent.
- lemlist says jobTitle "Construction Director", tagline "Construction Director Staffright Group (SOUTHEND) LIMITED ... + Staffright Group (IPSWICH) LIMITED". His summary describes managing "a team of consultants" and his background as a recruitment consultant.
- Companies House 10094703 Staffright (Southend) Ltd: active officers are Jaffrey (secretary), Siedlarska and Wingrave (directors). PSCs are Jark Ventures Ltd (75% or more), Jamie Wingrave and Daria Siedlarska. Companies House 10094327 Staffright Group Ltd: active officers are Jaffrey and Wingrave, PSCs are Jark Ventures Ltd and Jamie Wingrave. Jark Ventures 03224862 is owned by The Recruit Venture Group Ltd, with directors Mizen and Rogers. LANNISTER doesn't appear on any of these pages (all opened 2026-10-06).

**Verdict: CLOSED_NOT_ICP.** He's a divisional director in a group owned by Jark Ventures and The Recruit Venture Group. I didn't claim any workflow pain.

## Bas Ten Hove, Glasdiscount (Martin Glas Group), ctc_zWjikRrwJbxqpdEZJ

- Thread is empty (0 items, control full). Queue row is NO_STRONG_ANGLE, NOT_ICP checked 2026-09-30, with no message sent.
- lemlist says jobTitle "Managing Director – Glasdiscount.nl (part of Martin Glas Group)". His summary says "For the last 20 years I've helped companies sell more", which reads like a hired operator, not a founder.
- Register: northdata, KvK 66359953 Glasdiscount B.V., Hoofdweg 60 Loenen (fetched with fetch-walled.py, 200, 2026-10-06). Its trade names include Martinglas.Shop, which places it inside the Martin Glas group. Dutch filings don't publish shareholders, and nothing on the page ties ownership to Ten Hove. glasdiscount.nl is behind Cloudflare ("Just a moment", 403 through both curl and fetch-walled), but that page wasn't needed for the owner screen.

**Verdict: CLOSED_NOT_ICP.** By his own title he's the MD of a group subsidiary.

## Keir Welch, Direct Access Consultancy Limited 05185023, ctc_GE5RbBQJL4AmNMjpQ

- Thread is empty (0 items, control full). Queue row is NO_STRONG_ANGLE, NOT_ICP checked 2026-09-30, with no message sent.
- lemlist says jobTitle "Production Director". His tagline says "Founder – Nantwich Town PAN Disability Football", which is a football club, not this business.
- Companies House 05185023 (opened 2026-10-06): active directors are Judith Catherine Mifsud and Steven Alexander Mifsud, who are also the two active PSCs. WELCH doesn't appear.

**Verdict: CLOSED_NOT_ICP.** He's a production director and the Mifsuds own the company.

## Nisha Maher, EMR Recruitment Limited 13910319, ctc_FcibDBKWvByN8buL5

- Thread is empty (0 items, control full). Queue row is NO_STRONG_ANGLE, NOT_ICP checked 2026-09-30, "Flagged to Raka, not pitched". No message sent.
- lemlist says jobTitle "Director", tagline "COO - Operating Partner".
- Companies House 13910319 (opened 2026-10-06): MAHER Nisha has been an active director since 1 Aug 2025. The active PSC is Cbsbutler Holdings Limited, and Ipe Group (Holdings) ceased on 21 Aug 2025. So she's an officer but not an owner. Her own companies: TRU HR Consultancy 12128850 (incorporated 30 Jul 2019, sole director and PSC Nisha Maher, SIC holding company / management consultancy / HR) and Epic Moves Group 17082571 (incorporated 10 Mar 2026, SIC 68310 real estate agencies, directors and PSCs Nisha Maher and Hassan Ali Mahey). A web search for Epic Moves with either name turned up nothing, and I found no website. I probed four candidate domains as a lead only, and none resolved (control bbc.co.uk 200). That's not evidence, and the domains are not to be used.

**Verdict: CLOSED_NOT_ICP for EMR.** CBSbutler controls EMR, and she's COO there. Epic Moves Group is hers, but I found no website, no listings and no material of any kind, so there's no visible job to automate and no evidence of where it's heading. I didn't draft for it. It stays flagged for Raka exactly as on 2026-09-30.

## Mitchell Price, Harwood Textiles Limited 04555006, ctc_FvojB9oSk8LijxqKM

- Thread is empty (0 items, control full). Queue row is NO_STRONG_ANGLE, NOT_ICP checked 2026-09-30, with no message sent.
- lemlist jobTitle now reads "Operations Director", but his tagline says "Operations Manager at Harwood Textiles" and his summary says "Currently working in a wholesale textiles company". The record contradicts itself on rank, but both versions describe an employee.
- Companies House 04555006 (opened 2026-10-06): 3 officer entries, all appointed 7 Oct 2002. They're Claire Pandora Price (director and secretary) and Stewart William Price (director), who are also the two active PSCs, Stewart at more than 50% but less than 75%. Mitchell is not an officer or a PSC. The shared surname suggests family, but that's inference only.

**Verdict: CLOSED_NOT_ICP.** Claire and Stewart Price own the company. If Raka wants this account, the owners are the ones to approach, not Mitchell.
