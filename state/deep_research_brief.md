# Deep research brief, Astra Agency, 2026-10-11

Raka's instruction, verbatim: "Check all the recently accepted connections and then, research 100+ sources (all
sources) what the company or person is facing or experiencing right now. And then find an angle".

You research the leads you are given, find what they are going through RIGHT NOW, pick the single most expensive
problem Astra can solve, and draft the first message. Repo /home/user/astra-agency. Read only in the repo (never edit
or commit), never send, never call any lemlist write tool (send_message, update_lead*, create_*, delete_*,
campaign changes). Write only inside your own folder under /tmp/claude-0/agents/.

## Read first
- docs/RULES.md in full (it outranks everything except Raka's live word). Pay most attention to 1A (one thread),
  1B (quote their verb, never a stronger one), 3 (research), 4A (biggest pain, angles A to D, the four angle rule,
  "Clues and inference", "Write it simple"), 4B (the research gate).
- docs/opener-template.md (fixed wording, five blocks, block five "Shall I send you over what the [thing] looks
  like?" naming the bigger outcome, 16 words max).
- The "ICP lesson, Tomatoworld" paragraph in docs/astra-master-context.md (budget for foundations, an incumbent
  partner takes our findings, the decision maker) and section 2A (Raka's real credentials, the only ones usable).
- The approved register: state/drafted_2026-10-06-simple.md, state/drafted_2026-10-07-directed.md,
  state/drafted_2026-10-07-directed-b.md, state/drafted_2026-10-06-accepts.md (social version).

## The evidence ladder
1. The live page or thread, opened now. 2. A statutory register. 3. A raw tool response read in full.
4. Repo state files and old notes, a CANDIDATE list only. 5. Memory, never.
A search snippet is how you FIND a page, never the evidence. Open the page. Every absence claim needs a positive
control (the same method finding the thing where it exists). Our reader failing is never evidence about their site.

## Per lead, in this order

1. **Thread.** lemlist get_inbox_conversation(contactId), page until nextPage is null. Run a positive control in the
   same minute (ctc_ch3vFcKAkjQdMKDCg holds 2 known messages). If they replied, or we sent more than the connect
   note, say so at the TOP in capitals and set the shape (REPLY in context, or NUDGE), never a cold opener on top.
2. **Record.** search_campaign_leads by leadId: jobTitle, tagline, summary, jobDescription, experience, company
   fields. Reconcile tagline vs company vs job held. "Former" or "ex" is a stop sign. Owner, founder, co-founder or
   CEO only. If they hold the title but someone else owns it, say so.
3. **Ownership, statutory.** UK Companies House (curl find-and-update.company-information.service.gov.uk search,
   /officers, /persons-with-significant-control). France recherche-entreprises.api.gouv.fr. Germany, Austria,
   Netherlands, Belgium, Ireland via `python3 tools/fetch-walled.py <url> <outfile>` on North Data, KvK, the
   Impressum, CRO (Ireland, core.cro.ie). Not an owner and not CEO means CLOSED_NOT_ICP with the evidence, stop.
4. **Prior notes.** grep state/silent_accepted_queue.jsonl and state/*.md for name and contactId.
5. **DEEP RESEARCH, 100+ sources per lead, all kinds.** Count distinct URLs you actually opened and list them. At
   least 100, of which at least 40 are outside their own domain. Cover every category below and write what each
   says about what they are facing now:
   - Their site, the WHOLE site: `python3 tools/crawl.py <url> /tmp/claude-0/agents/<folder>/<tag>_pass1 --max 150`,
     then pass2, read every page. `AUDIT_OUT=/tmp/claude-0/agents/<folder> node tools/site-audit.js <url> <tag>` and
     OPEN both screenshots with the Read tool. RENDER NOT TRUSTED means `node tools/render-via-curl.js`. Shop, booking,
     pricing, careers, blog, press pages read in full. Sitemaps.
   - Every social account linked from their own HTML: `node tools/social-audit.js <url> <tag>`, the Instagram
     embed endpoint https://www.instagram.com/<handle>/embed/ for dated posts (positive control on a busy account in
     the same minute), TikTok, Facebook, YouTube, LinkedIn company page, Google Business profile (name, category,
     reviews, rating), review sites (Google, Trustpilot, TripAdvisor, Yelp, Treatwell, Untappd, as fits).
   - The owner: LinkedIn (six routes, all written down), their posts, podcasts, interviews, talks, articles, other
     companies they run or hold (registers), side jobs.
   - News: `python3 tools/news.py` on the company, the owner, the region and the industry, with a control query. Open
     each relevant hit at source.
   - Registers and filings: accounts, staff numbers, share allotments, funding rounds, new subsidiaries, insolvency
     notices, address changes.
   - Jobs: careers page and job boards, read each ad in full.
   - Industry and region: what's happening to businesses like theirs now (prices, regulation, trends, seasonality,
     competitors). Open 4 to 8 comparable businesses at source as a benchmark.
   - Privacy from the EU: `python3 tools/eu-view.py <url>`.
6. **What they are facing right now.** Write 5 to 10 plain sentences, each tied to sources: their stage (how new,
   growing or not), what they are pushing on now, what is changing around them, what is likely eating their time or
   costing them money. Clues and inference are allowed (RULES 4A "Clues and inference"), but every fact about them is
   verified and every inference is marked INFERENCE with the clue it rests on.
7. **Judge.** One table of every candidate angle: website for sales or growth (B), personal AI assistant workflow for
   the owner (C), AI app or workflow for the company (A), social media, Instagram and branding (D), Build Squad
   (developers who extend their team, Raka's verbatim line "in half the time at half the price"). For each: proof,
   what it costs them, would they name it, would an incumbent (agency, partner, in house team, a tool they already
   run) take it, do they sell it themselves. Pick the single most expensive one. NO_STRONG_ANGLE only if every one is
   empty, said honestly.
8. **Draft** the winner in the approved simple style with the full gate block, exactly as check-drafts.py expects
   (copy a gate from state/drafted_2026-10-07-directed-b.md and fill every line). Plain words, no tool names, no
   colons, no dashes, contractions present, no money figures. Block four "We build [xyz] for brands like Unilever,
   AXA, Pertamina." with xyz matched to the offer ("AI workflows", "websites and AI workflows", "branding and websites
   and social media management", "websites and apps"). The proof sentence starts with "I" and uses only Raka's real
   credentials from docs/astra-master-context.md 2A (Eten Maar stroopwafel brand built with his family, Betty Blocks
   GTM and scoring and follow up workflows, efficy sales and channel operations, Heineken global e business data
   across 23 markets, freelance social media and branding consultant Dec 2020 to Feb 2023, Pandan Social influencer
   campaigns). Never claim client work Astra didn't deliver. Don't reuse an identical credential sentence across leads
   in your file. Write to /tmp/claude-0/agents/<folder>/drafts.md and run
   `python3 tools/check-drafts.py /tmp/claude-0/agents/<folder>/drafts.md` until it exits 0.
9. **Red team your own draft** as a separate pass: reopen every source a sentence rests on, try to prove each claim
   false, check the verb is theirs, fix or kill. Put the red team table under the draft.

## Output
/tmp/claude-0/agents/<folder>/<firstname_lastname>.md per lead: the thread and record, ownership, the numbered
source list (100+), "what they're facing now", the judge table, the verdict and the red team. Plus drafts.md.
Return per lead: shape, what the business does in one line, what they're facing now in two lines, the winning
angle and why it's the most expensive, confidence, flags for Raka, and the final message text.
