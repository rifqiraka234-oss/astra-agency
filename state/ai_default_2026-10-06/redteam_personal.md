# Red team, personal AI workflow NUDGES, 2026-10-06. NOTHING SENT, no lemlist writes, no git.

What I ran this pass (about 14:15 to 14:40 UTC).
- `get_inbox_conversation` on ctc_LcYiWjzfjJFgssnBf, ctc_EQEgHwLdmREfD2g6J, ctc_eb8ySnZEpFiroQaXH. Each totalItems 2, nextPage null, linkedinSync recent 14:10:42 UTC. Each came back with two known sends (connect note plus the real message), so each is its own positive control.
- `get_inbox_conversations` listId sentOnly, search "Sanghera", "James Stewart", "Wilmes". One contact each, the same contactIds, isYourTurn false, lastRepliedAt null. No duplicate contact.
- `search_campaign_leads` by id on lea_9W7pbftey4hHvgzAs, lea_5YfGf7JEpkzozpqSK, lea_ckBQX5DhW73xzvYxG, full records read.
- grep of state/ and logs/ for name, contactId and leadId. Latest queue rows for all three are NO_STRONG_ANGLE from the 3 Oct sweep (no nudge on the old angle). No SENT row after the original messages, no promise of a last message, no stop request.
- curl now: solvexgroup.ca plus its bundle /assets/index-CuOpIXBX.js, unitedtraffic.ca and /about (script shell), dailyhive.com/edmonton/suntail-drink-alberta-launch, bamboo-invest.com /about-us/ /media/ /the-founding-ten-offer/ /roots-event/, Companies House officers 17165595, snorly.de, /fuer-praxen, /pages/impressum-von-snorly-de, /blogs/journal/snorly-schnarchschienen-startup, example.com control 200.
- WebFetch: linkedin.com/company/bamboo-invest-limited, online-handelsregister SiWi UG, App Store id6743162754.
- WebSearch: 6 queries (Solvex plus Ken, Solvex owner, Sukh Kainth, Ken MD, Simon About text, Simon plus AI).
- `tools/social-audit.js` was tried on the Bamboo LinkedIn URL and refused it (it takes a site-audit tag, not a URL), so the LinkedIn company page was read by WebFetch instead.

---

## 1. Ken Sanghera, Suntail Drink Co + Solvex Group, ctc_LcYiWjzfjJFgssnBf. Verdict FIX

| Sentence or claim | What I opened | Result | Why |
|---|---|---|---|
| Thread is one real message, no reply | get_inbox_conversation, 2 items, 25 Jul connect note, 26 Aug real message, nextPage null | HOLDS | Nudge is the right shape |
| "I wrote in August about the Suntail website" | Same thread, the 26 Aug text | WEAK | True, but it points him back at a message whose claim was false ("store locator opens with nothing in it", nsa02 counts 296 locations). Naming the website invites him to reopen a wrong claim. Say "I wrote to you in August" and leave it |
| "running ... Solvex Group as Managing Director" | lemlist tagline "Co-Founder & CEO at Suntail Drink Co. \| Managing Director at Solvex Group", experience2 "Managing Director @Solvex Group". Opposite check, web search: Sukh Kainth "formally introduced Solvex Group" and reads as founder and operator (linkedin.com/in/sukh-kainth-64a3911b8, search snippet, tier G). Wiza has Ken as "Managing Director at United Traffic Control", one Solvex division. solvexgroup.ca bundle names nobody | WEAK | The title is his own words and holds. "Running Solvex Group" does not, there's very likely someone above or beside him and he may run one division. Use his title, not our verb |
| "while Suntail grows into Alberta" | dailyhive.com/edmonton/suntail-drink-alberta-launch, curl 200, datePublished 2026-08-25, "Suntail Drink Co. has officially landed", marked Sponsored. lemlist companyDescription "expansion into Alberta and Saskatchewan underway" | HOLDS | Two sources, one is the brand's own paid piece, which is fine for a fact about their own launch |
| "That's two companies to run in the same week" | Inference | WEAK | Leans on "run Solvex". Reword to two jobs |
| Disproof, does he sell AI | solvexgroup.ca bundle, four services businesses (traffic, workforce and safety, security), no AI offer. Suntail is drinks | HOLDS | |
| Creepy | Only his own headline and a public launch | HOLDS | Nothing personal |

Pushback most likely. "I'm not running Solvex, I'm MD of one division" or "I've got an EA". The fix uses only his own title, so the first can't happen.

FIXED NUDGE
```
Hi Ken, I wrote to you in August. Here's a different thought.

You're CEO at Suntail and Managing Director at Solvex Group at the same time, while Suntail grows into Alberta. That's two big jobs in the same week.

Shall I send you over what the AI workflow that gives you a few hours back every week looks like?
```
59 words, 0 colons, 0 dashes, contractions Here's, You're, That's. Claims now: his title (lemlist tagline, his own words) and the Alberta launch (Daily Hive 2026-08-25). Confidence MEDIUM.

---

## 2. James Stewart, Bamboo Invest, ctc_EQEgHwLdmREfD2g6J (lea_5YfGf7JEpkzozpqSK). Verdict FIX

| Sentence or claim | What I opened | Result | Why |
|---|---|---|---|
| Thread is one real message, no reply | get_inbox_conversation, 2 items, 5 Sep connect note, 14 Sep opener on the professional client declaration, nextPage null | HOLDS | Nudge shape. The draft doesn't restate the gate claim, which the 28 Sep row says is gone |
| "There are two of you" | bamboo-invest.com/about-us/ curl, "Founder-led", only Tim Crockford and James Stewart named. Companies House officers 17165595, "2 officers / 0 resignations", Crockford and the August 1980 director, both appointed 17 Apr 2026. LinkedIn company page by WebFetch, "2-10 employees", 2 on LinkedIn | HOLDS | Three independent sources agree on two. Contractors or Thornbridge support may exist, but "two of you" is how their own site presents it |
| "Tim's running the portfolios" | bamboo-invest.com/media/ "Tim Crockford (CIO) and James Stewart (CEO)" on both the FT Adviser and Citywire pieces. James's own lemlist summary says Tim "has had an 18-year career running sustainable equity". about-us, "Eighteen years in fund management" | HOLDS | CIO of an MPS runs the portfolios, and "running" is James's own verb for Tim. Not an overreach |
| "So the founding member conversations, the Roots event and the follow ups after each one all land on your desk" | the-founding-ten-offer, "An evening with the founders and the other nine firms ... Conversations are already under way". roots-event, "A half day conference at the Royal Automobile Club, Pall Mall", no date. media, both founders on all three press pieces | FALSE as worded | Their own page says the dinners are with "the founders", plural, and Tim is on every press piece. "All land on your desk" is contradicted by their own copy. The narrower version, that the follow ups land with James, is an inference from CEO plus his distribution career and is allowed. Drop "all" and drop the conversations themselves from what lands on him |
| Disproof, do they sell AI | 0 AI hits on home, about, media, align per personal3's grep, confirmed no AI wording in today's four page texts | HOLDS | Bamboo.align is a profiler, not an AI product |
| Contractions | Draft has one, "Tim's" | WEAK | Add a second |
| Side note, not in the message | about-us now says "Appointed Representative of Thornbridge Investment Management LLP", lemlist still says Brooklands | n/a | lemlist is stale. Doesn't touch the nudge, never mention the AR |

Pushback most likely. "Everything we send advisers has to be signed off by Thornbridge, we can't hand follow ups to AI." He's an FCA appointed representative, so a compliance answer is ready to hand. Raka should know this before he gets the reply. The message doesn't claim the workflow sends anything, so it survives.

FIXED NUDGE
```
James, a different thought from my note in September.

It's the two of you, and Tim's running the portfolios. So the follow ups after the founding member conversations and the Roots event land with you.

Shall I send you over what the AI workflow that takes those follow ups off your week looks like?
```
54 words, 0 colons, 0 dashes, contractions It's, Tim's. Confidence MEDIUM.

---

## 3. Simon Wilmes, Snorly GmbH, ctc_eb8ySnZEpFiroQaXH. Verdict SHIP

| Sentence or claim | What I opened | Result | Why |
|---|---|---|---|
| Thread is one real message, no reply | get_inbox_conversation, 2 items, 26 Jul connect note, 25 Sep GDPR opener, nextPage null | HOLDS | Nudge shape. "I wrote to you in September" doesn't restate the banner claim, which the 3 Oct eu-view run killed |
| He owns it | snorly.de/pages/impressum-von-snorly-de curl now, "Geschäftsführer: Simon Wilmes ... Amtsgericht Köln, HRB 123439". snorly.de homepage, Dr. Jacob Kölln "hat Snorly gemeinsam mit Simon Wilmes gegründet", Simon "Gründer". lemlist jobTitle "Co-Founder & CEO" | HOLDS | Register and site agree. There's a co-founder, the message doesn't say he's alone in the company, it says his week |
| "building Snorly and your other companies" | lemlist summary (his LinkedIn About), "I spend my time between building my own companies". Opposite check, online-handelsregister SiWi UG HRB 174618 Hamburg, active, GF Simon Wilmes, purpose holding plus "Beratertätigkeiten bei fremden Unternehmen" | HOLDS | His own words. The SiWi address is Lünne, near Osnabrück where he studied, which fits, but the message doesn't name SiWi so it doesn't rest on it |
| "still taking on the odd energy or digital project" | Same About, "sometimes but rarely taking on selected projects in energy and digital", experience2 "Freelancer" | HOLDS | "The odd" matches his "rarely". It is his verb level, not stronger |
| "That's a lot running through one person's week" | Inference | HOLDS as inference | He frames the mix as a choice that keeps him learning, so he may not feel it as load. Allowed, but it's the sentence he'll push back on |
| Second source for the About text | Web search on the exact phrase, 0 hits. LinkedIn walled | WEAK on independence | Only one source, the lemlist record (rung 3, a raw tool response, his own LinkedIn text). Nothing contradicts it. Acceptable for a nudge, flagged |
| Disproof, does he sell or use AI | snorly.de, /fuer-praxen, impressum, journal raw HTML, 0 hits for KI, AI, Künstliche Intelligenz, machine learning, GPT, chatbot, Algorithmus, control "App" 4 and 31. No App Store link in their HTML. The App Store "Snorly" that says AI is "MIKHAIL MANEV YURII, IE", snorly.app, not them | HOLDS | He's a builder ("digital tools" in his About), so he may set this up himself. Not a reason to kill, a reason it may not land |
| Creepy | His own public About, business only | HOLDS | Reads like we read his profile, which is fine, nothing personal |

Pushback most likely. "I build this kind of thing myself" or "it's a choice, I like it".

NUDGE AS DRAFTED, unchanged
```
Simon, I wrote to you in September. Here's something else.

You're building Snorly and your other companies, and still taking on the odd energy or digital project. That's a lot running through one person's week.

Shall I send you over what the AI workflow that gives you a few hours back each week looks like?
```
55 words, 0 colons, 0 dashes, contractions Here's, You're, That's. Confidence MEDIUM.

---

## Summary

| Lead | Verdict | The line that changed or the risk | Confidence |
|---|---|---|---|
| Ken Sanghera | FIX | "running Solvex Group" overreaches, Sukh Kainth looks like the Solvex founder and Ken may be MD of one division. Use his own title. Also drop "about the Suntail website", that message's locator claim was false | MEDIUM |
| James Stewart | FIX | "all land on your desk" is contradicted by their own page ("an evening with the founders"). "Tim's running the portfolios" holds (CIO, and James's own word "running"). Second contraction added | MEDIUM |
| Simon Wilmes | SHIP | All facts are his own About plus the Impressum. The About only has one source, LinkedIn is walled. As a builder he may do it himself | MEDIUM |
