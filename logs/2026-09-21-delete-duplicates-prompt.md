# Prompt for Claude in Chrome, delete 11 duplicate LinkedIn messages

Copy everything between the lines into Claude in Chrome, with LinkedIn messaging open and
signed in as Raka.

---

You are working in my LinkedIn messaging inbox at https://www.linkedin.com/messaging/.

I sent 11 people a message by mistake this morning. Each of them had already received a
different message from me weeks earlier. I want **only today's message deleted** in each
thread. The earlier message must stay.

**Rules, follow all of them.**

1. Work through the list below one person at a time, in order.
2. Open that person's conversation thread.
3. Find the message **I sent today** whose first words match the quoted opening exactly.
4. Delete **only that one message**. Hover it, open the "..." menu on the message bubble,
   choose Delete, and confirm.
5. **Do not delete anything else in the thread.** Several of these threads contain an
   older message from me from August or early September. That one stays.
6. **Do not send any new message, do not reply, do not react, do not archive.**
7. If a thread has no message matching the quoted opening, skip it and tell me. Do not
   guess or delete the nearest thing.
8. After each one, tell me the person's name and whether it was deleted or skipped.
9. If LinkedIn does not offer a delete option on a message, stop and tell me rather than
   trying anything else.

**The 11 messages to delete.** Times are this morning, in my local time, newest first.

| # | Person | Sent today | Delete the message starting with |
|---|---|---|---|
| 1 | Olivier Oomen | 12:01 | "Hi Olivier, read the thesis, the argument that EUV turned patterning into a step change" |
| 2 | Naila Kouidri | 12:00 | "Hi Naila, saw you came into marketing from neurology and human behaviour" |
| 3 | Daniel Turner | 11:50 | "Hi Daniel, saw the line, we put the right people in the room" |
| 4 | Fredrick Adimmadu | 10:00 | "Hi Fredrick, saw that you're building edge AI for engineers working where there's no signal" |
| 5 | Edouard Chretien | 10:00 | "Hi Edouard, saw the YouTube channel runs a numbered series, E2 through E9" |
| 6 | Dominique Collard | 09:33 | "Hi Dominique, saw that step one is watching how the person stands and where they push" |
| 7 | Adrian Mann | 09:32 | "Hi Adrian, saw the boat make list on your quote form" |
| 8 | Denis Neubauer | 09:32 | "Hi Denis, saw that you do the consulting, the planning and then actually build the Betriebsmittel" |
| 9 | Etienne Richet | 09:19 | "Hi Etienne, saw the line on your agence page ending with hashtag RP equals ROI" |
| 10 | Sascha Brockhoff | 09:19 | "Hi Sascha, saw that Kavantor stays free for the Mittelstand side" |
| 11 | Philipp Zeunert | 09:19 | "Hi Philipp, read Insight No. 1, the argument that decisions look independent" |

When all 11 are done, give me a short list of which were deleted and which were skipped.

---

## Why these 11 and nobody else

34 messages went out on 2026-09-21. Every thread was then pulled individually with
`get_inbox_conversation`. 23 were clean, either the connect note only or a legitimate
ongoing conversation. These 11 had a real researched message already sitting unanswered.

**Do not delete these**, they are correct and were checked:
Guy Casters, Krijn Roosjen, Frank Wallrapp, Antoine Levi, Aykut A., Cédric Vande Kerkhove,
Jochen Matzer, Katie Vlaardingerbroek, Farha Mohammad, Julia Wilckens, Cecilia
Drevon-Barbecot, Joshua M Patton, Mario De Groodt, Kate Phipps-Wiltshire, Sebastien Goenen,
Benedikt Weber, Yero Sow, Marcel van Milt, Mudabbir Khawaja, Floris Otterman, Michael
Barthel, Alex Temprell, Niklas Hanf.

**Denis Neubauer is the worst of the 11** and worth knowing about. He replied on 1
September saying he already had demand and a finished proof of concept, and we answered
"no push at all, just keep us in mind". Today's message broke that. Deleting it is right,
and he may need a short apology afterwards, Raka's call.
