# Replies waiting on us, 2026-09-21

Question asked: who has replied in our inbox that we have not sent anything back to,
sorted by the date they replied.

## Method, so this is re-testable

Not derived from `get_inbox_conversations`, whose `lastSentMessagePreview` hides
follow ups (the 2026-09-15 audit failure). Built instead from the activity log.

1. `GET /api/activities?version=v2&type=linkedinReplied` paged to exhaustion.
   407 reply activities, 177 distinct contacts, oldest 2026-02-12, newest 2026-09-19.
2. `GET /api/activities?version=v2&type=linkedinSent` paged to exhaustion.
   1,040 send activities, 392 distinct contacts, covering the same window.
   This type carries both campaign sends and manual inbox sends.
3. Per contact, compared the newest reply against the newest send. A contact is
   unanswered when no send exists after their last reply.
4. `emailsReplied`, `whatsappReplied`, `smsReplied` all return zero, so LinkedIn is
   the only inbound channel and nothing is missed by channel.
5. Every one of the 11 live rows was then re-verified with `get_inbox_conversation`
   per contact. All 11 matched the activity derivation exactly.

Result: 177 contacts have replied at some point. 47 of them have no send after their
last reply. 11 of those are in the current v0.1 era, 36 are from Luna's archived
campaign in February to April.

Separately checked, and it came back clean: zero contacts replied and received only
the generic connect note. Everyone who ever replied has had at least one real message.

## The live list, newest reply first

| Reply date | Who | Company | Their last message | Our last send | State |
|---|---|---|---|---|---|
| 2026-09-19 | Michael Barthel | No Leadershit | Long answer on why he built No Leadershit, ends on a German communication culture aside | 2026-09-17 | **Open, he answered our question and is still talking** |
| 2026-09-18 | Niklas Hanf | Solvio-Workshop | "Currently I do it alongside. Let's see how it's going. what's about your business?" | 2026-09-18 | **Open, direct question to us, unanswered** |
| 2026-09-17 | Binanti Cuzner | Liquid Insights | "Thanks Raka" | 2026-09-17 | Closed, she declined on 7 Sep, we acknowledged, this is her sign off |
| 2026-09-14 | Sebastien Alotto | MYSA Energy | "Thanks" | 2026-09-14 | Closed, redesign already underway with their webmaster |
| 2026-09-09 | Fleur Rossdale | Fleur Rossdale Foundation | "Thanks Raka" | 2026-09-03 | **Open, we asked "want me to send it over" and she never said yes or no** |
| 2026-09-05 | Floris Otterman | The Protein Express | Declined, says credibility is earned in conversations not on a website | 2026-09-05 | **Decline never acknowledged** |
| 2026-09-05 | Alex | Diisco | "We were curious where you were going with this but we wont be pursuing this further" | 2026-09-05 | **Decline never acknowledged, prototype was built and sent** |
| 2026-09-03 | Anouk Van Der Haak | Soul of Abbey | "Thanks" | 2026-09-03 | Closed, rapport thread, no angle raised yet |
| 2026-09-02 | Anastassia Masneva | Chilessency Explore | thumbs up | 2026-09-02 | Closed, she fixed the webshop notice, we signed off |
| 2026-09-02 | Romain | Swapios | "Je te remercie. Bonne continuation" | 2026-09-02 | Closed, already mid redesign with other suppliers |
| 2026-08-27 | Cas | Zynox | "Dankjewel enorm attent van je" | 2026-08-27 | Closed, prototype declined on look, he is going Shopify |

Contact ids, in the same order: ctc_6Ptry8JFBTntqfYd3, ctc_Hi8GaR2cuEE6SA6xy,
ctc_o8A44WWfu5mvyKmyf, ctc_4tyWoXbzNSNhNgDR2, ctc_3ehgTL5RX8esp68ro,
ctc_8sEGGrwa7PDTfbuXg, ctc_SZnfaHSkw5p2CbqWs, ctc_kLa2iCyWcHm2M2GDg,
ctc_dgMA8uCvKx82nuLwX, ctc_8uvpfn6JqFEvP8fXK, ctc_mf9cNTPBT92Ybqg9r.

## The Luna backlog, 36 threads, February to April 2026

These sit in the same team inbox but belong to `cam_3ooqeEXZq4A53K3PP`, Luna's
archived campaign, and were sent under her name rather than Raka's. They are five to
seven months cold, so they are not the same kind of asset as the list above.

Ones that carry a real unanswered question rather than a pleasantry:

- 2026-04-12 Aysenaz Sahin, Women's Corporate Network, "What about you?"
- 2026-04-05 Michelle Heerden, Misteli creative agency, "Definitely open to chat"
- 2026-04-01 Sharmin Vries, Sharing PR, "What are you currently working on?"
- 2026-03-31 Ivana Stella, freelance, "Are you looking for a graphic designer?"
- 2026-03-29 Beyza Gokkaya, Smart Servant, "I am available in the third week of April to meet"
- 2026-03-25 Simon Schindeler, SIM-on Software, asks for the MMA brand account
- 2026-03-24 Stefan Haan, SnappCar, "How is that going so far?"
- 2026-03-24 Cynthia Wolf, Tibo Energy, "what about you and what are you looking for?"
- 2026-03-23 Lucie Hamon, looking for freelance projects
- 2026-03-21 Rohan Mehra, HIGH 5, "Yes sure happy to exchange ideas"
- 2026-03-20 Wissam Hema, "Which work did you see?"
- 2026-03-16 Kevin Flury, Studio Wesseling, "whats in it for me"
- 2026-03-16 Danae Giannarou, DGD Graphic Design, offers to help
- 2026-03-16 Gino Ferruzo, ICCA, moving to Paris, open to meeting

The remaining 22 are thank yous, polite declines and out of office style answers.

## Nothing was sent

This is a read only audit. No message was drafted or sent.
