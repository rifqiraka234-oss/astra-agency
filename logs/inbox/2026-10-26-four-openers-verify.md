# Four openers on Raka's angles, main session recheck, 26 Oct 2026

Drafted by research agents, every claim rechecked here by the main session on 26 Oct. Nothing sent.

Threads, `python3 tools/lemlist.py thread --summary`, ~10:20 UTC. Control ctc_ch3vFcKAkjQdMKDCg came back with 6 items.
All four leads came back with 0 items.

| Lead | cid | Draft |
|---|---|---|
| Scott Buckley, Unreal Events | ctc_MgyMbx3uk9mhg89jX | state/drafted_2026-10-26-angle-unreal.md |
| Elise Laeven, Honey It's Handled | ctc_z9AByAoDiQAssohkn | state/drafted_2026-10-26-angle-honey.md |
| Antonio Pirozzi, Vulcano Smaak | ctc_dbdS2Hgi9Ad4npHJe | state/drafted_2026-10-26-angle-vulcano.md |
| Erik Schmidt-Lange, Taste Frankfurt | ctc_nmWYD59STFBerEswh | state/drafted_2026-10-26-angle-tastefrankfurt.md |

check-drafts.py passes all four.

## Unreal Events and Honey It's Handled

Rechecked earlier the same day, see the pipeline log and the commit history for 26 Oct.

## Vulcano Smaak

- **Phone shows the desktop page shrunk.**
  - vulcanosmaak.nl is a 470 byte HTML 4.01 frameset with no viewport meta, framing https://antoniojp.wixstudio.com/my-site-2.
  - On an iPhone 13 profile the page lays out at 980 px. wikipedia.org, the control, lays out at 390 px in the same run.
  - The screenshot shows "Built on WIX STUDIO" across the top.
- **Catering has no prices or request form.**
  - The rendered Wix page has 0 forms and 0 inputs.
  - Its catering block reads "Corporate events, team lunches, celebrations, meetings." and is followed only by a phone number and an email.
  - The menu PDF (5 pages, pdftotext) lists "Catering for corporate and private events" under services, then "Ask us for more information or a personalised proposal". There are no prices after that line. The control, tagliatelle and focaccia, is found in the same file.
- **The business lunch menus are on Instagram but not the site.**
  - Read through the public embed of post DaTVR10Mqza: "fixed-price business lunch menus, tailored to your budget ... Office delivery available ... Send us a message for a personalized quote".
  - Neither the site text nor the PDF says "business lunch".

## Taste Frankfurt

Rendered at 390 by 844 (mobile) with 0 failed requests.

- **Porsche and Städel sit about four screens down, in a moving strip.**
  - The client photos start at 3.82 screens, the logos at 4.11, and the names "Porsche Sommerfest" and "Städel Night" at 4.21.
  - All of them sit inside the CSS animation `tfkunden-scroll`, 61.9 s per loop. The research note says 600 s, so the loop length differs, but "slowly moving" holds either way.
  - No client name appears earlier on the page.
- **The reasons to book read as quoted.** Under "Warum Taste Frankfurt" (5.59 screens), "Maximale Flexibilität" (5.74), "Mit Herz" (6.03) and "Qualität & Zufriedenheit" (6.32). The draft stores a real "&", with 0 `&amp;`.
- **The Christmas menus and prices exist.**
  - /weihnachtsfeier/ names the three menu lines American, French and Fusion, and the minimum of 1.800 € netto.
  - The page says "Alle Preise findest du transparent auf unserer S...", so the prices sit on a separate page.
  - The Weihnachtsfeier link already sits at 0.35 screens on the homepage, so that half of the offer is a small step. The core of the offer is the client proof up front.
