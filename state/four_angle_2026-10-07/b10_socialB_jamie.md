# Jamie Hardy, Revive Auto Repairs Ltd, ctc_D5F2nC69pjMjAuvk2. Social and branding re pass, b10_socialB, 2026-10-07

Read only. Nothing sent, no lemlist writes, no commit. Everything opened 2026-10-07 between 06:00 and 06:25 UTC.

## STOP FLAGS

- **STOP, FOLLOW UP LIMIT. WE HAVE ALREADY SENT AN OPENER AND A FOLLOW UP, AND HE NEVER REPLIED.** Per FOUR_ANGLE_BRIEF step 1 ("If we already sent an opener AND a follow up with no reply, STOP"), nothing more goes to him. No draft.
- Thread, `get_inbox_conversation(ctc_D5F2nC69pjMjAuvk2)` at 06:0x UTC, LinkedIn sync "recent" at 05:57:59Z. 3 items, totalItems 3, nextPage null. Oldest first:
  - 2026-08-11 21:24 UTC, ours, connect note: "Hey Jamie, congrats on launching Revive Auto Repairs recently, exciting times! I'm a business owner too, would love to connect and share ideas :)"
  - 2026-08-13 07:00 UTC, ours, **real opener**: "Hey Jamie, thanks for connecting. I had a look at Revive Auto Repairs, and I like the dealership standard cosmetic repair work with a personal touch in North Ferriby. However, the site still shows an opening soon banner next to real finished job reviews, so visitors can't tell if you're open. Our agency sketched an open now booking page. Want me to send it over?"
  - 2026-08-18 07:02 UTC, ours, **follow up**: "👀 Jamie, have you seen this?"
  - No reply from him at any point. No message ever promised to be the last one.
- `get_inbox_conversations` search "Jamie Hardy" in myConversations returned 0. His lead sits in cam_Co5CJXrpPFf5MRAfD (v0.2, paused per CLAUDE.md).
- Prior queue row 2026-10-06: HOLD_WEAK, a nudge on the old Wix /home page priced in US dollars, red teamed as a self fix (state/ai_default_2026-10-06/redteam_jamiehardy.md). That nudge would be a second follow up and is also out under this rule.
- Owner, candidate from prior research (not re opened today because the lead is stopped): sole director and 75%+ PSC of REVIVE AUTO REPAIRS LTD 16543454.

## Social facts gathered before the stop rule was applied (kept so nobody re pulls them)

| Account | Source of URL | Read how | Facts |
|---|---|---|---|
| Instagram @reviveautorepairs | their homepage HTML, https://www.reviveautorepairs.co.uk/ (curl 200, 1,519,213 bytes) | og:description over curl at 06:10, then i.instagram.com web_profile_info 200 at 06:23:31 UTC | 52 followers, 28 following, 35 posts, not private, bio "Auto Repairs & Bodyshop / Cars, Vans & Commercial Fleet / Free same-day estimates / Based in North Ferriby". **Newest post 2026-06-19**, so 110 days without a post. The 12 newest posts run from 19 May to 19 Jun 2026, mostly short videos, with 2 to 6 likes and 0 comments each. The /embed/ route returned the same page a made up handle gets, so the API was the working route. Control for the API, the same call on other handles returned 404 or 401, not data. |
| Facebook /reviveautorepairs | their homepage HTML | social-audit.js, Page Plugin curl, Chromium | Login wall on every route. The plugin returned no follower count. UNKNOWN, not empty. |
| Google Business Profile | Maps search payload, curl, 06:1x UTC | "car body shop North Ferriby" | "Revive Auto Repairs", **5.0 from 17 reviews**, category Car Body Shop, Unit 3 Evolve Business Park, site reviveautorepairs.co.uk. Ranked **first** of 2 for that search. |
| TikTok, LinkedIn page | none linked in their HTML | not opened | not found, not claimed |

Benchmark, Hull body shops from the same Maps payload ("car body shop Hull"): Scratches Ltd 4.9 (188), Top Paintwork Centre 5.0 (152), Steer Prestige 4.5 (139), Paintwork Express 4.7 (117), The Car Painter 4.8 (98), Ideal Bodyworx 4.8 (83), Elite Bodyworx 4.9 (75). Revive has fewer reviews than most of them but is about 15 months old and ranks first in its own village.

Branding read. One name everywhere (Revive Auto Repairs), the same fleet focused bio on Instagram and the site title. The only inconsistency is the stray Wix /home page in US dollars, already logged in the 6 Oct red team.

## Verdict

**STOP, follow up limit.** If Raka ever wants to override the limit, the social fact is a quiet Instagram since 19 June. The Google profile (5.0 from 17, ranked first locally) undercuts any "invisible locally" story, though. Confidence in the stop is HIGH.
