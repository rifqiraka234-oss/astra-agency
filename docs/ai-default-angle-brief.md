# AI default angle brief, Astra Agency, 2026-10-06

Raka, 2026-10-06, about every lead we closed NO_STRONG_ANGLE: "we can just always go this angle default because
everyone's all about AI angles, like who doesnt want to have ai workflows for themselves OR AI apps for their
business. Or better website due to growth expansion". The standing rule is now in
/home/user/astra-agency/docs/RULES.md section 4A, "THE DEFAULT ANGLE". Read it, plus sections 1A, 3, 4B, and
/home/user/astra-agency/docs/opener-template.md, and the passing format in
/home/user/astra-agency/state/drafted_2026-10-03-batch1-redo.md.

Read only everywhere except your own output folder. Never send, never call lemlist write tools, never touch git.

You get a list of leads. For EACH lead, in order:

1. SCREEN (all mandatory, write what came back):
   - lemlist get_inbox_conversation(contactId), page until nextPage is null. Quote every message with date and
     direction. If they ever replied, or we sent anything beyond the connect note, say so in capitals.
     If they asked not to be contacted, or we promised a last message, STOP: DO_NOT_CONTACT / CLOSED.
   - grep /home/user/astra-agency/state/silent_accepted_queue.jsonl and state/drafted_*.md for the contactId and
     name. Summarise every prior verdict and every message we sent (candidate claims only).
   - The lemlist record: search_campaign_leads by leadId (from the thread or the queue) for jobTitle, tagline,
     summary, companyDomain. OWNER RULE: only owner, founder, co-founder or CEO of the business we'd write about.
     Employees, managers, directors at someone else's company, academics, bank staff, ex founders: STOP,
     verdict CLOSED_NOT_ICP. Confirm with the statutory register (Companies House, recherche-entreprises /
     pappers, KvK via northdata with tools/fetch-walled.py, KBO, Impressum) when there's any doubt.
2. RESEARCH the two default angles (only for owners who passed the screen):
   - A, an AI workflow or AI app that would make them more efficient. Find the specific job in their business that
     eats hours, visible in their own material: how customers book / order / enrol / request a quote, intake forms
     and document collection, quotes and proposals, reporting, scheduling, follow ups, repetitive support
     questions, job ads describing manual work, volume claims against team size. Open the pages (crawl with
     python3 /home/user/astra-agency/tools/crawl.py <url> <dir> --max 80, read the text), click the booking and
     contact flows, count the form fields, read their careers page and job ads, read their LinkedIn company page
     via node /home/user/astra-agency/tools/social-audit.js --urls <url from their HTML>. Disprove: do they
     already have it (an AI product company, an automation agency, a named tool such as n8n, Zapier, HubSpot
     workflows, a client portal)? A lead that SELLS AI automation is not an A lead.
   - B, a better website because of growth or expansion: funding (registers, press), new market or language, new
     service or product, new company, hiring, a site that doesn't serve where they are heading (Wayback CDX
     https://web.archive.org/cdx/search/cdx?url=<domain>&output=json for last redesign).
   - Every fact with its URL and the date you opened it. A search snippet is only how you find a page.
3. DRAFT, if A or B holds (pick the costliest one, ONE THREAD):
   - If the thread holds only our connect note: an OPENER, five blocks, the exact template, gate block above it.
   - If we already sent a real message: a NUDGE that refers to what we said, 40 to 80 words, gate block above it,
     tag the shape NUDGE. Never repeat a claim we got wrong.
   - Block five: "Shall I send you over what the [bigger outcome] looks like?", the whole better thing named by
     what it achieves (e.g. "the AI quoting workflow for Smith & Co", "the enrolment app that fills your
     courses"), never the tiny fix. 16 words max.
   - Credential from /home/user/astra-agency/docs/astra-master-context.md section 2A word for word in meaning,
     matched to the offer (Betty Blocks for automation, revenue workflows and SaaS; Heineken for data and
     operations; Eten Maar for owners who built a brand). Never invent one.
   - No colons, no dashes or hyphens of any kind, contractions, English, no money figures, no exclamation beyond
     block one's, no emoji in openers.
4. Run python3 /home/user/astra-agency/tools/check-drafts.py <your file> and fix until it passes.

OUTPUT: one file /tmp/claude-0/agents/nsa/<your batch tag>.md with, per lead: a heading "## <Name>, <Company>,
<contactId>", a 3 line screen summary, verdict (DRAFT_A, DRAFT_B, CLOSED_NOT_ICP, DO_NOT_CONTACT, or
NO_SIGNAL with the evidence why), and for drafts the gate block and the tagged draft. If the file ends up with no
drafts, put <!-- NO DRAFTS --> at the top. Reply with a table: name, verdict, the one line signal with URL, confidence.
