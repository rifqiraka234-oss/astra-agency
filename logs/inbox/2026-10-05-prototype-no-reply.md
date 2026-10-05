# Prototype sent, no reply since. 2026-10-05

Raka, "check all our inboxes and also your notes to find if theres anyone that we have sent a prototype but they havent replied to us yet".

## Method
- Two lemlist inboxes, Raka (usr_27bdxG7jzTn2rucGB) and Luna (usr_MKy94ogmHZB9hQm3K). The myConversations and sentOnly lists were enumerated in full: 137 + 1,179 + 58 + 142 = 1,516 unique contacts, each count matching the API's totalItems. Neither archived list has anything in it.
- All 1,516 threads were pulled in full (every page) and checked for any message from us carrying a netlify.app, astraagency.nl, vercel.app, drive.google.com, docs.google.com, figma.com, loom.com, framer or webflow.io link, with or without https.
- 1,516 of 1,516 pulled completely, no errors.
- 1,071 threads came back empty. All of them are on the sentOnly lists (969 Raka, 102 Luna), so most likely unaccepted invites.
- **Positive control:** in the same runs, threads with known messages came back full (Karim Narowski, Chris Flood, Clive Boulton, Bert Christiaens, Michael Barthel).
- **Cross-check against `state/prototypes.jsonl`:** the scan found 28 of the 29 ledger contacts that have a send or a URL. The one miss is ExpoCall, which was built today and never sent. The scan found nobody missing from the ledger.
- **Gmail:** searched sent mail for prototype and proposal links. That turned up Tomatoworld and HotGreen.
- **Live pulls:** the ten threads that are not do-not-contact, plus ExpoCall, were pulled again live at 18 13 UTC today.

## Waiting on US
- Chris Ryalls, ExpoCall, ctc_k2GNq2p5WKD64TYvx. He replied on 4 Oct, "I'd be curious to see how your page for hotels would look". A ledger row from 5 Oct shows astra-expocall-prototype.netlify.app built, with sentAt null. Not sent.

## Prototype sent, no reply, one follow up so far (one more allowed)
- Steven Garratt, Qualigraf. UK site sent 29 Sep, nudged 3 Oct.
- Ciara Neal, Hire Quality Talent. Site sent 29 Sep, nudged 3 Oct.
- Ank van der Meulen, Tomatoworld (email). Proposal emailed 22 Sep, chased 28 Sep, and Raka tried calling. Her last email was 17 Sep.

## Prototype sent, no reply, already at the close rule (two or more follow ups, or a written last)
- Sergey Shalunov, SotoCat. Deck and site sent 23 Sep, nudged 25 Sep and 3 Oct.
- Julien Chiaroni, Klarity. Sent 31 Aug, nudged 5 Sep and 25 Sep.
- Barbora Juhaszova, Di Lieto. Sent 31 Aug, nudged 5 Sep and 15 Sep. Queue CLOSED.
- Suania Fiol, Zenara. Sent 31 Aug, nudged 5 Sep and 15 Sep. Queue CLOSED.
- Jack Coulthard, On a Plod. Drive prototype sent 21 Jul, three follow ups including "one more nudge and then I will leave it be".
- Michele Legoratto, AIKE. Sent 7 Aug, nudged 16 Aug, then 26 Aug "last time I will bring this up".
- Lisa Bouamra, Point Audit. Said upfront she wasn't looking for outside help. Walkthrough sent 12 Aug, checked once on 16 Aug.

## Prototype sent, no reply, DO_NOT_CONTACT
Hein Bilterijst (Toffe Traktaties), Bo Poldervaart (Curalis), Maarten Ectors (Greentic), Andy Olson (Indigenous Fishers First).

## Replied after the prototype (not on the list)
Mike Timmers, Aart Bos (Tomatoworld on LinkedIn), Gerard Ouattara, Antanas Juodiskis, Rosalie Voortman, Lynn Chadwick, Lucas Scherdel, Jori, Georgia Ware (HotGreen, plus Sanya by email on 2 Oct), Cas Maasakkers, Alex Temprell, Erisan Olasheni, Kyson Charles, Karim Narowski, Chris Flood.
