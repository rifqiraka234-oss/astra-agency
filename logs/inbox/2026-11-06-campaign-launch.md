# Campaign launch, 6 Nov 2026 (Raka, "GO! DO ANYTHING YOU NEEDA TO FOR US TO EARN 10K DEALS THIS MONTH")

For the other session. **Do not pause W3, W4 or W5.** This supersedes the 5 Nov "W1b only" test, which showed invites
flowing again (18 on 5 Nov). Raka chose this mix on 28 Oct (`docs/gtm-plan.md`, end) and said GO today.

What changed in lemlist, all through the API, every call logged.
1. **Leads removed from the three draft campaigns before launch.** France, Wallonia, Brussels, Luxembourg and French
   speaking Switzerland, anyone outside NL, BE, DE, AT, CH, UK, IE, and agencies, studios, coaches and recruiters (company
   name, title or industry, never the tagline). W3 738 to 587, W4 2,363 to 1,667, W5 4,283 to 3,233, 1,896 removed plus one
   test, DELETE /api/campaigns/<id>/leads/<leadId>?action=remove, all 200. Recounted from the export after, exact, 0 French
   left. Full lists before removal in `state/lemlist-backups/`, so any lead can be added back.
2. **First batch launched lead by lead** with POST /api/leads/review/<leadId> (docs "Launch Lead"), so the shared 18 a day
   splits by what's launched. W3 90 (De Bruin Process Equipment first, then 89 manufacturing and logistics, Dutch and UK),
   W4 80 (tech firms only), W5 40 (law and accounting firms only, no clinics). W1b keeps its last ~57 invites.
3. Connect note checked in all three sequences, the same as W1b. Today's invite limit was already used, so the first new
   invites go out 7 Nov.

What the accepts get. B2B sellers (W3, W4), the AI powered outreach flow opener, no credential line (RULES section 1).
Law and accounting (W5), the AI workflow "did you know" shape. Research gate as always, Raka's word on every send.

Next. 8 Nov, check invites by campaign and rebalance. Around 18 Nov, the next batch. The plan for the month is
`state/november-10k-plan.md`.
