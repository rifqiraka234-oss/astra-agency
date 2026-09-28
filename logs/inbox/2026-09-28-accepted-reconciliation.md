# Accepted leads reconciliation, v0.1, 2026-09-28 (after the GaMa and Real Olive sends)

Source of truth: `GET /api/activities?version=v2&type=linkedinInviteAccepted&campaignId=cam_PryZp5LuvQv8NznHh`,
four pages (offset 0, 100, 200, 300, the 400 page empty) = **344 accepted**, which is the 343 of 27 Sep
plus Claudia Dünow. Nobody accepted after 2026-09-28 06:43 (a minDate pull returned empty).

Matched against the latest queue row per contactId (name as fallback):
- 155 SENT, 26 NO_STRONG_ANGLE, 18 THREAD_VERIFIED_CLEAN (sent, verified 21 Sep), 14 NUDGED,
  11 SENT_DOUBLE_PITCHED, 2 BLOCKED, 3 STALLED_NEEDS_REWRITE, closed and replied states for the rest.
- **96 accepted with no queue row at all.** Every one of the 96 threads was pulled today with
  `get_inbox_conversation` (one call each, newest message plus totalItems, two middle messages opened
  in full to confirm the July "have you seen this?" threads carry a real researched opener).
  - 83 carry a real researched message, a nudge, a delivered artefact or a closed conversation.
  - **13 got only friendly chat after accepting, never a pitch**, and our question was the last
    message in every one. Saeid Khalafvand (FlowVolta), Aashir Qureshi (Oranjelo), Timur Teregulov
    (LeBretons Group), Fabien Llobell (SensElevation), Georgia Storey (EVCP Installations, now
    PyroSecure), Ciara Neal (Hire Quality Talent), Nick Vlaeyen (WINGMEN, at Smurfit), Peter Van
    Gulick (Cleverise), Yoeri Sanstra (Sanstra SCA), Jacqueline Stockwell (JakiSpeaks), Ramar Nadar
    (RentyFIND), Sarim S. (Flochitect), and Stefan Van Der Heijden (ASK Wear) had a one line portal
    idea inside chat, borderline.
- The 21 queue rows still marked DRAFTED or UNRESEARCHED (other than William M., who was sent on
  22 Sep) are NOT in the acceptance record. Their threads are empty. They never accepted, nothing to send.
- 3 STALLED_NEEDS_REWRITE, Yagiz Abik, Jean Madaule, Marlon Aird. Real openers in August, no reply,
  a rewritten nudge is owed.

Calls made. 4 acceptance pages plus 1 minDate check, 22 threads for the DRAFTED rows, 96 threads for
the no-row set, 4 page-2 reads, 3 inbox name searches. Positive control, Snorly's thread came back full
earlier today, and Andrew's and Yasin's threads showed today's sends within a minute of sending.
