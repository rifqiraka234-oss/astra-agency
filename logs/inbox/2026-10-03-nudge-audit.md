# Inbox refresh and nudge audit. 2026-10-03

Raka's instruction. "Refresh inbox to see if people replied + if we needa nudge them. If we nudged
them 2x already just close it and beyond 3 dont do it. Make no mistakes check all threads."

## The rule as applied

Follow ups are counted from the last time they spoke, ours only, connect note excluded, and sends
under six hours apart count as one. None or one, a nudge is allowed once our last message is a week
old. Two, close. Three or more, nothing. Anyone told in writing that a message was the last gets
nothing, whatever the count. And any verdict an earlier session wrote down with a reason stands
unless a thread read today gives a reason to change it, which is said where it happens.

## Replies

Nothing new since 1 Oct. `get_inbox_conversations` over myConversations from 30 Sep returned six
threads, every one already known, Jim (1 Oct 05 36) and Vladislav (1 Oct 09 20) still with unsent
drafts in `state/drafted_2026-10-01-two-closes.md`. sentOnly from 1 Oct 14 00 returned 118 threads
over three pages, and every send in them after the activity dump ends is an automated connect note,
so the dump that the counts rest on is complete for real messages.

## How the 340 were checked

Every send and reply since July from the activities API, rebuilt into one timeline per contact,
340 contacts. Every candidate for a close and every warm contact then pulled per contact today, all
pages, 40 page pulls across 36 contacts, plus 7 `search_contacts` record reads (Alice and Lucas read from the accepted pool export). Every last message read by hand for a
sign off, then scanned again in Dutch, French and German after Danny's Dutch close turned up.

## Counts

| Verdict | Count |
|---|---|
| CLOSE | 9 |
| CLOSE_INSTEAD | 2 |
| NUDGE_WARM_NOW | 7 |
| NUDGE_WARM_HOLD_9OCT | 5 |
| NUDGE_COLD_f0 | 90 |
| NUDGE_COLD_f1 | 36 |
| CHECK_PITCH | 8 |
| NUDGE_COLD_RECHECK | 1 |
| DRAFT_WAITING | 4 |
| RAKA_TO_DECIDE | 5 |
| OWED_NOW | 1 |
| TOO_EARLY | 61 |
| NOTHING_3PLUS | 2 |
| PROMISED_LAST | 12 |
| ALREADY_CLOSED | 2 |
| HELD_EARLIER | 9 |
| NO_PITCH | 13 |
| LEAVE | 11 |
| NUDGE_WARM_OPTIONAL | 2 |
| DONE | 35 |
| RAKA_DECIDED | 25 |
| total | 340 |

## Close, two follow ups, drafted. 9

- Paul Hanson, `ctc_Sfs4z7sXcofYGjL6B`, our last 2026-08-11, 52 days, queue before today no row
- Dennis Bollien, `ctc_NLT572WpHSbpp9NFA`, our last 2026-08-11, 52 days, queue before today no row
- Daniel Shodamola, `ctc_GFk4ANtaqEetSd5dW`, our last 2026-08-16, 47 days, queue before today no row
- Andy Olson, `ctc_ymgMEZCY4G2ni8FfY`, our last 2026-08-26, 38 days, queue before today no row
- Joanna Huang, `ctc_JtZ4SfgRGC5jQmARa`, our last 2026-09-02, 31 days, queue before today no row
- Maria Machado, `ctc_KrAFP3esh4PjKjomW`, our last 2026-09-02, 30 days, queue before today no row
- Amina Abukar, `ctc_rXjjRxEfNNkCQFcEy`, our last 2026-09-02, 30 days, queue before today no row
- Happy Tidjani, `ctc_df3ZKhrBxMbzT87Q9`, our last 2026-09-02, 30 days, queue before today no row
- Arindam Sengupta, `ctc_xTFQ2QiYLWoZ9nrhM`, our last 2026-09-02, 30 days, queue before today no row

## Close in place of a nudge, drafted. 2

- Amir Matallaoui, `ctc_tnGL6B5XZdtWc6JP4`, our last 2026-07-23, 71 days, queue before today no row
- Maarten Ectors, `ctc_b5SM2pR7aSdRRzM69`, our last 2026-08-26, 38 days, queue before today no row

## Warm nudge, drafted. 7

- (name not in feed), `ctc_KMjZQEr5qdudxGgYP`, our last 2026-08-28, 36 days, queue before today SENT
- Alexander Resner, `ctc_iiGkmAQeJCTg7TF3h`, our last 2026-08-31, 32 days, queue before today no row
- Shrey Pandey, `ctc_cZYMm3ZKtPYqwjCoo`, our last 2026-09-02, 31 days, queue before today SENT
- Hein Bilterijst, `ctc_iaZXHL7R4ucKaGcFP`, our last 2026-09-02, 31 days, queue before today SENT
- Sammy Kuit, `ctc_tuogu2M6Ef24MFmYX`, our last 2026-09-04, 28 days, queue before today SENT
- Sebastian Holz, `ctc_rsr2RnC2hLdcfh88E`, our last 2026-09-13, 19 days, queue before today SENT
- Niklas Hanf, `ctc_Hi8GaR2cuEE6SA6xy`, our last 2026-09-25, 8 days, queue before today NUDGED

## Warm, nudged 25 Sep, due 9 Oct. 5

- Bo P., `ctc_9wKKt5K6ShKMfmW69`, our last 2026-09-25, 8 days, queue before today NUDGED
- Terry Bordeleau, `ctc_x6MbKQXwaYSrJvepd`, our last 2026-09-25, 8 days, queue before today NUDGED
- (name not in feed), `ctc_Puf9L7o8nDTyDNn2Q`, our last 2026-09-25, 8 days, queue before today NUDGED
- Karim Narowski, `ctc_w3ejEE5BjsbCTnYyA`, our last 2026-09-25, 8 days, queue before today NUDGED
- Erisan Olasheni, `ctc_8gvdTcTEsfk2MHbcF`, our last 2026-09-25, 8 days, queue before today NUDGED

## Three or more follow ups, nothing. 2

- Mike Timmers, `ctc_vkYcfxaem8Wpb43Ti`, our last 2026-08-26, 38 days, queue before today no row
- Michael Poon, `ctc_i3AxTPi65YoLmnM2v`, our last 2026-09-02, 30 days, queue before today no row

## Promised last in writing, nothing. 12

- David Jonker, `ctc_gYojjp3yXSMEoyiQs`, our last 2026-08-11, 52 days, queue before today no row
- Tim Spittle, `ctc_AsYBpzfea9FcNJSDc`, our last 2026-08-16, 47 days, queue before today no row
- Hugo Ph.D., `ctc_u65DEeDroGY2TpXrZ`, our last 2026-08-18, 46 days, queue before today no row
- Vasanta S., `ctc_d9cmps8bTXsvaRxjw`, our last 2026-08-26, 38 days, queue before today no row
- Michele Legoratto, `ctc_qiJ2ccpxRci3ajkLG`, our last 2026-08-26, 38 days, queue before today no row
- Jack Coulthard, `ctc_CLtuaZ8AQp3aYpfx5`, our last 2026-08-26, 38 days, queue before today no row
- Jori Cphr, `ctc_wi8FEjzHKH9dhNFZ9`, our last 2026-08-26, 38 days, queue before today no row
- Antanas Juodiskis, `ctc_piBZeydFpN4KiBeky`, our last 2026-08-26, 37 days, queue before today no row
- Rosalie Voortman, `ctc_JYWKs8LSRDxAreesA`, our last 2026-09-02, 30 days, queue before today no row
- Dr. Ph.D., `ctc_7ta5sCZ7yXwrAy3ZP`, our last 2026-09-14, 19 days, queue before today SENT
- Danny Velt, `ctc_Wfbo48xvpB5QxMGuw`, our last 2026-09-13, 19 days, queue before today SENT
- Julien Chiaroni, `ctc_HuQTYiyC54xwhswbM`, our last 2026-09-25, 8 days, queue before today NUDGED

## Got the closing nudge 15 Sep, nothing. 2

- Suania Fiol, `ctc_hT784JThxqmEyTPZf`, our last 2026-09-15, 18 days, queue before today SENT
- Barbora Juhaszova, `ctc_ZYSuTMB2YScHH9Apw`, our last 2026-09-15, 18 days, queue before today no row

## Held by an earlier session. 9

- Salim Saleem, `ctc_RDogafhkpGPbrnp7H`, our last 2026-07-21, 73 days, queue before today NO_STRONG_ANGLE
- Umer Adnan, `ctc_xozMFobDpEC8sdukg`, our last 2026-07-21, 73 days, queue before today NO_STRONG_ANGLE
- Rakia Ph.D, `ctc_W3kjdZFnbzXH85zTM`, our last 2026-07-21, 73 days, queue before today NO_STRONG_ANGLE
- Nikita-Tarass H., `ctc_hgJ48N6PQ4Thn7wFB`, our last 2026-07-21, 73 days, queue before today NO_STRONG_ANGLE
- Etienne Lefebvre, `ctc_nYnQgsLWCc384BqPm`, our last 2026-07-21, 73 days, queue before today NO_STRONG_ANGLE
- Dori Adams, `ctc_4YWJ9gcS2AbcHq6SL`, our last 2026-07-26, 69 days, queue before today BLOCKED_NEEDS_INFO
- Febin Rahman, `ctc_dCyZdQTH58obb9oCe`, our last 2026-08-02, 61 days, queue before today BLOCKED_NEEDS_INFO
- Dr. Mahmut Nedim Özdemir, `ctc_BQCJGehZeB2t6S7k9`, our last 2026-08-30, 33 days, queue before today SENT
- Laurent Gourier ✮ Mabin, `ctc_54viZ4CmynX3hSM8P`, our last 2026-09-02, 30 days, queue before today SENT

## Raka to decide. 5

- Dr. Ragueneau, `ctc_mtAHtNJCe4eghc4fv`, our last 2026-07-26, 69 days, queue before today no row
- Joel Fuente, `ctc_NhEiQEPhE82cjHubv`, our last 2026-08-11, 52 days, queue before today no row
- Lynn Chadwick, `ctc_yctJfvDtTFQvMzRK4`, our last 2026-08-16, 48 days, queue before today no row
- Lucas Scherdel, `ctc_YhyuAwqYsq9TQTmEQ`, our last 2026-08-26, 38 days, queue before today no row
- Tijs Overeijnder, `ctc_oevcdGGWqTNzAY2br`, our last 2026-09-02, 31 days, queue before today SENT

## Owed now. 1

- Peter Hurd-Watler, `ctc_Px9CGphf6heWCy7To`, our last 2026-08-25, 38 days, queue before today no row

## Drafted 1 Oct, waiting on Raka. 4

- Mark O'sullivan, `ctc_WqWnHna9o6anxvAzp`, our last 2026-07-21, 73 days, queue before today DRAFTED_NUDGE
- Richard Pheifer, `ctc_nSviiCD4yMkFDaefo`, our last 2026-07-21, 73 days, queue before today DRAFTED_NUDGE
- Maryn Gerrits, `ctc_Ras7iMYqpCkjAc9Nz`, our last 2026-07-21, 73 days, queue before today DRAFTED_NUDGE
- Volker Hollmichel, `ctc_tndKY7x5nEmEPdDCg`, our last 2026-07-21, 73 days, queue before today DRAFTED_NUDGE

## Cold, needs the claim reopened. 1

- Alexandria Cameron, `ctc_X7hCEQ94f9iz5B9y8`, our last 2026-08-26, 38 days, queue before today SENT

## Cold, no offer wording found, read first. 8

- Cristian Andriesei, `ctc_t8TKRJXP6cemMLBBg`, our last 2026-08-26, 37 days, queue before today SENT
- (name not in feed), `ctc_mfxrvjytS6KDKniGw`, our last 2026-08-29, 35 days, queue before today SENT
- Stephanie Wright, `ctc_StZTeBnDJxptFhzf4`, our last 2026-09-02, 30 days, queue before today SENT
- Richard-Gabriel Cuzic, `ctc_pAPukszq8MBpRfYrT`, our last 2026-09-05, 28 days, queue before today SENT
- Mykyta Kharchenko, `ctc_2gRN4DKWsstCjknF6`, our last 2026-09-05, 28 days, queue before today SENT
- Bharat Suchith, `ctc_5DAXs4jAEQB4C2Wpy`, our last 2026-09-05, 27 days, queue before today SENT
- Louise Kean-Wood, `ctc_cvtYxcP6hYR9d8jQx`, our last 2026-09-05, 27 days, queue before today SENT
- Ayub Shoaib, `ctc_zQLRTuTdMXcf29TF8`, our last 2026-09-05, 27 days, queue before today SENT

## Cold, one follow up, nudge allowed after a claim recheck. 36

- Florian Legris, `ctc_spjv9MYphb6rvWRws`, our last 2026-08-18, 46 days, queue before today no row
- Dr Smith, `ctc_xH6d56jWSsfPazmhS`, our last 2026-08-18, 46 days, queue before today no row
- Joost Zwan, `ctc_pzSLzmNiDjKmDimX4`, our last 2026-08-18, 46 days, queue before today no row
- Jason Frm, `ctc_SEeEgPK3irExCxBpc`, our last 2026-08-18, 46 days, queue before today no row
- Hidde Hermans, `ctc_pq23X9G5KY9NwkDCn`, our last 2026-08-18, 46 days, queue before today no row
- Dennis Coolen, `ctc_sTn4F9QnwEGp5awfg`, our last 2026-08-18, 46 days, queue before today no row
- Anver Jalaldeen, `ctc_qW8ZiYbxdWtmz7iAH`, our last 2026-08-18, 46 days, queue before today no row
- Noa-Ruth Passchier, `ctc_HeWiGtEWDobsd7azx`, our last 2026-08-18, 46 days, queue before today no row
- Olivier Trancart, `ctc_Dr4JnQbD9oK23WYEf`, our last 2026-08-18, 46 days, queue before today no row
- Sinclair Simons, `ctc_6vZuyoNEdQuzugkAj`, our last 2026-08-18, 46 days, queue before today no row
- Thomas Foeken, `ctc_HBDGvLq5kEwF8GEa9`, our last 2026-08-18, 46 days, queue before today no row
- Aaron Khan, `ctc_4imqWJFLh33A3Qrw7`, our last 2026-08-18, 46 days, queue before today no row
- Jamie H., `ctc_D5F2nC69pjMjAuvk2`, our last 2026-08-18, 46 days, queue before today no row
- Amir G'nia, `ctc_y3gpN63BLefNtaCpR`, our last 2026-09-14, 19 days, queue before today SENT
- Mark-Paul Burgersdijk, `ctc_pBFM654gSKnMpiHiT`, our last 2026-09-14, 19 days, queue before today SENT
- Malcolm Amonoo, `ctc_dNnyGwo6ybh9niKbR`, our last 2026-09-14, 19 days, queue before today SENT
- Clara Champion, `ctc_ahKmJxZKMJz9ue3NP`, our last 2026-09-14, 19 days, queue before today SENT
- (name not in feed), `ctc_bE79WdHCo5BmCzWp8`, our last 2026-09-14, 19 days, queue before today SENT
- Mark Preston, `ctc_3eQBuQWxxCoZrFNxB`, our last 2026-09-14, 19 days, queue before today SENT
- Flurin Lutz, `ctc_eZ6muBxHZ6eAYYE6v`, our last 2026-09-17, 16 days, queue before today NUDGED
- (name not in feed), `ctc_8j6Phufo4Fa8QK8Tb`, our last 2026-09-17, 16 days, queue before today NUDGED
- (name not in feed), `ctc_7KRGb5Fto77hpw2Wp`, our last 2026-09-17, 16 days, queue before today NUDGED
- (name not in feed), `ctc_omrnsX6T8WbfqbA7G`, our last 2026-09-17, 16 days, queue before today NUDGED
- (name not in feed), `ctc_FoezJqha3nh59Cmew`, our last 2026-09-17, 16 days, queue before today NUDGED
- Olivier Oomen, `ctc_YxzGAWb8tPPKSpfPo`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- Naila K., `ctc_cEx67ydg7DMYiHTSG`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- (name not in feed), `ctc_8WHfNcsptXW2SFs5Q`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- (name not in feed), `ctc_2hMDtaX6ztmeQq6To`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- (name not in feed), `ctc_iR5HN4BJc8ZaQyuxj`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- (name not in feed), `ctc_3JX4pgf5sx8skNbh7`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- (name not in feed), `ctc_R6wymP5QzaKCuRwLP`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- Etienne Richet, `ctc_9ZD7Lv3sHRbmiZBAT`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- Sascha Brockhoff, `ctc_vTWa3ghNbN6qHcjbp`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- Philipp Zeunert, `ctc_XwTQXEnpQWNDibeMK`, our last 2026-09-21, 12 days, queue before today SENT_DOUBLE_PITCHED
- (name not in feed), `ctc_BNpEmdmTDaBJGZGLe`, our last 2026-09-25, 8 days, queue before today SENT
- (name not in feed), `ctc_NiKYm5rp2kXcAAyw3`, our last 2026-09-25, 8 days, queue before today SENT

## Cold, pitched once, nudge allowed after a claim recheck. 90

- Josh Fairbairn, `ctc_pNPsWdEMRCb4ccQev`, our last 2026-08-02, 61 days, queue before today SENT
- Cameron Syme, `ctc_k3p23YQzo9t7pbK3F`, our last 2026-08-02, 61 days, queue before today SENT
- Axel Fleury, `ctc_bQXb7vJQNyQ4psRCc`, our last 2026-08-17, 47 days, queue before today SENT
- Mezabine Hatim, `ctc_Na96y74W5uT3GkSam`, our last 2026-08-18, 46 days, queue before today no row
- Amna Abdulla, `ctc_tEAMfkRou5jGBv8YT`, our last 2026-08-18, 46 days, queue before today SENT
- Evie Barker, `ctc_5LYgS8GTT5QrzxPQh`, our last 2026-08-17, 46 days, queue before today SENT
- Murad Kibria, `ctc_CSEmgnWEjmfFEqXQd`, our last 2026-08-27, 37 days, queue before today SENT
- Alessio Monterosso, `ctc_pwJnZCGoTQiXhGfvj`, our last 2026-08-26, 37 days, queue before today SENT
- Ken Sanghera, `ctc_LcYiWjzfjJFgssnBf`, our last 2026-08-26, 37 days, queue before today SENT
- John Nabuurs, `ctc_WfX2BkgSvtGrF6o6B`, our last 2026-08-26, 37 days, queue before today SENT
- Steven Prins, `ctc_3S6EA258AheDuBKi5`, our last 2026-08-26, 37 days, queue before today SENT
- Martijn Dijk, `ctc_Z3J4EAKarueohCqxj`, our last 2026-08-26, 37 days, queue before today SENT
- Abraham Akrouche, `ctc_RBjzAkhMRziM9wYj8`, our last 2026-08-26, 37 days, queue before today SENT
- Maharshi Trivedi, `ctc_q7gk5zRxrBkwfrdfA`, our last 2026-08-26, 37 days, queue before today SENT
- Mats Barselaar, `ctc_a6CziXnHPCMCfn5Ma`, our last 2026-08-26, 37 days, queue before today SENT
- Olivier Clybouw, `ctc_JKSruaBKANQQHD48b`, our last 2026-08-26, 37 days, queue before today SENT
- Twan Bierens, `ctc_z446qTApfbr6R8RuT`, our last 2026-08-26, 37 days, queue before today SENT
- (name not in feed), `ctc_XQDooFehywMZe9K3G`, our last 2026-08-31, 32 days, queue before today no row
- (name not in feed), `ctc_rBP5uWNEwkGqLPTvH`, our last 2026-08-31, 32 days, queue before today SENT
- (name not in feed), `ctc_S9Gmwh5eMsJtphcio`, our last 2026-08-31, 32 days, queue before today SENT
- (name not in feed), `ctc_Jc3SXti4Km3dnBMeF`, our last 2026-08-31, 32 days, queue before today SENT
- (name not in feed), `ctc_9pQYAGoi9z3z8LvQt`, our last 2026-08-31, 32 days, queue before today SENT
- (name not in feed), `ctc_YR7cc276Goo7Fdi2F`, our last 2026-08-31, 32 days, queue before today SENT
- Jenna Goodwin, `ctc_w8M9KjdfGEQHb7REN`, our last 2026-09-03, 30 days, queue before today SENT
- Niels Alten, `ctc_aZswHFKfve2uo8iTr`, our last 2026-09-03, 30 days, queue before today SENT
- (name not in feed), `ctc_q8DfbH4BYw89sLjnh`, our last 2026-09-03, 30 days, queue before today SENT
- Wilco Drijver, `ctc_Qhj4RS4RXnmBeyrxL`, our last 2026-09-03, 30 days, queue before today SENT
- Chris Ryalls, `ctc_k2GNq2p5WKD64TYvx`, our last 2026-09-03, 30 days, queue before today SENT
- Hélène Gallais, `ctc_wnze5ZA9e9GozQ2Ls`, our last 2026-09-02, 30 days, queue before today SENT
- Maria Marshall-Clarke - Née Martinez Serrano, `ctc_gwPTszWN8NAhc4fQN`, our last 2026-09-02, 30 days, queue before today SENT
- Semjon Mamontov, `ctc_nkQXNnHKZH4jz2ehF`, our last 2026-09-02, 30 days, queue before today SENT
- Simon Chuinard, `ctc_QdhtaeDvqahLSQcSM`, our last 2026-09-02, 30 days, queue before today SENT
- Vincent Soulier, `ctc_X3smgNvaZLzrstcgq`, our last 2026-09-02, 30 days, queue before today SENT
- Henrik Schöpfer, `ctc_pkmMjd96KrXMmDS6K`, our last 2026-09-02, 30 days, queue before today SENT
- Laura Bscher, `ctc_czpdBfKjdtsHLrYtb`, our last 2026-09-02, 30 days, queue before today SENT
- Larissa Mora Morcillo, `ctc_kqKNB7SGPafWSK8hW`, our last 2026-09-02, 30 days, queue before today SENT
- Angela Barlow, `ctc_4NgbWujpWmFTW6Jb4`, our last 2026-09-02, 30 days, queue before today SENT
- Claire Bartley, `ctc_9ma29fTdvPjhMqPoB`, our last 2026-09-02, 30 days, queue before today SENT
- Roy Hoven, `ctc_gye9ypfozqp4QQ8cs`, our last 2026-09-03, 29 days, queue before today SENT
- Rory Natkiel, `ctc_fToFAxkxJynw5nKhk`, our last 2026-09-03, 29 days, queue before today SENT
- Tyler Butler, `ctc_CwNQoXS434JF4pFX2`, our last 2026-09-05, 28 days, queue before today SENT
- Joyce Rans, `ctc_5JZq2Z56giuypc5qd`, our last 2026-09-05, 28 days, queue before today SENT
- Laurent Devriese, `ctc_EYkaQDJ7NC7ifm6Wc`, our last 2026-09-04, 28 days, queue before today SENT
- (name not in feed), `ctc_EQEgHwLdmREfD2g6J`, our last 2026-09-14, 19 days, queue before today SENT
- Katrin Kempe, `ctc_K8PwwxqA3xE42PxbR`, our last 2026-09-14, 19 days, queue before today SENT
- Daniel Förster, `ctc_8tTpay4QwR9iHTmiK`, our last 2026-09-14, 19 days, queue before today SENT
- (name not in feed), `ctc_gd9G4Nssf6Qqa9pkr`, our last 2026-09-14, 19 days, queue before today SENT
- (name not in feed), `ctc_9sL42u8eTWQSjB2tM`, our last 2026-09-14, 19 days, queue before today SENT
- Balaram Gajra, `ctc_LNNLeREacezwJQ3cp`, our last 2026-09-17, 16 days, queue before today SENT
- (name not in feed), `ctc_LX8SwdtGKPPxqzFd2`, our last 2026-09-18, 14 days, queue before today SENT
- Frederik Decruy, `ctc_59ajvkH36kmFTthpN`, our last 2026-09-19, 13 days, queue before today SENT
- (name not in feed), `ctc_4HQm9YJCn6un4Mdip`, our last 2026-09-19, 13 days, queue before today SENT
- (name not in feed), `ctc_ii4DqtpBgQ6fwfwto`, our last 2026-09-19, 13 days, queue before today SENT
- Guy Casters, `ctc_H4iEtDP9Yq8SB7WBe`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_WknX8u7geuafsLSMw`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_Snrpa85vhRhNiSzaw`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_vMWXWscT2JGxik3N5`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_sNWhXwPeSWYLPFqrJ`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_k9fKjr4at8JpdNaGW`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_k5wbLRKyPJYio6aj8`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_WiZMbK74FKmcAWqNs`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_uYAHmsknNRHP7gRbZ`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_Xn4u3Nce3KfCLngEi`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_8FHv4ma3Ly2TCqYfK`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_PchCw6xqb8YTfA9Cz`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_CwJ2yps7NY2ieaF7o`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_fnRmMWgxgv7mF2W76`, our last 2026-09-21, 12 days, queue before today SENT
- Mudabbir 孟達柏, `ctc_wzyEGEbnExHikwSxX`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_2J8oom4KjBoqds6Cm`, our last 2026-09-21, 12 days, queue before today SENT
- (name not in feed), `ctc_icT5oEajhtmH6dcAd`, our last 2026-09-22, 11 days, queue before today SENT
- (name not in feed), `ctc_R3SL6BjDXSjfXM5dz`, our last 2026-09-22, 11 days, queue before today SENT
- (name not in feed), `ctc_FqsfJfJh8oDGt2hbo`, our last 2026-09-21, 11 days, queue before today SENT
- (name not in feed), `ctc_3v3cm8AGXbSXrCLbi`, our last 2026-09-21, 11 days, queue before today SENT
- (name not in feed), `ctc_Tih7FPjKfKkfBiNuM`, our last 2026-09-21, 11 days, queue before today SENT
- (name not in feed), `ctc_8fz9FBzEvnyoTPnEC`, our last 2026-09-21, 11 days, queue before today SENT
- (name not in feed), `ctc_9KQJNwc4mq3WnGufS`, our last 2026-09-21, 11 days, queue before today SENT
- (name not in feed), `ctc_q7ZBCr8RKPTx9JHZJ`, our last 2026-09-21, 11 days, queue before today SENT
- Neeraj Sharma, `ctc_gA84JX5MgS5c8Qfo6`, our last 2026-09-23, 10 days, queue before today SENT
- Muhammad Akbar, `ctc_9yfzLTQP9ehdYKdY6`, our last 2026-09-23, 10 days, queue before today SENT
- (name not in feed), `ctc_b3rkFAWDjoeDRrshF`, our last 2026-09-23, 10 days, queue before today SENT
- (name not in feed), `ctc_NwqJExzhsL5SYoEME`, our last 2026-09-22, 10 days, queue before today SENT
- Ferry Haas, `ctc_inRn6RX8BGQ9w3PiK`, our last 2026-09-24, 9 days, queue before today SENT
- Simon Wilmes, `ctc_eb8ySnZEpFiroQaXH`, our last 2026-09-25, 8 days, queue before today SENT
- Romy Abbrederis, `ctc_taxTbnHp5GC3hQndm`, our last 2026-09-25, 8 days, queue before today SENT
- (name not in feed), `ctc_PZhtBMpYkmp5jnScq`, our last 2026-09-25, 8 days, queue before today SENT
- (name not in feed), `ctc_MvF898tMbDmzHBXhB`, our last 2026-09-25, 8 days, queue before today SENT
- Harold Engelen, `ctc_HC5zk2s2kFaw9LxCJ`, our last 2026-09-25, 8 days, queue before today SENT
- Marjan Verhoeven, `ctc_G7wn7qLMJebwJn7Qt`, our last 2026-09-25, 8 days, queue before today SENT
- Jon Cockley, `ctc_nHPaYSqrv7u32oPTY`, our last 2026-09-25, 8 days, queue before today SENT
- (name not in feed), `ctc_gTJfNNvz2jLYgAJNd`, our last 2026-09-24, 8 days, queue before today SENT

## Our last is under a week old. 61

- Dan Lowe, `ctc_XAGgwnXjEjeS7royq`, our last 2026-09-28, 5 days, queue before today CORRECTION_SENT
- (name not in feed), `ctc_8HL4vo9cA55Yugaav`, our last 2026-09-28, 5 days, queue before today CORRECTION_SENT
- Dr. Vikram Athalye, `ctc_JvgAreqPd8QFx4oPM`, our last 2026-09-28, 5 days, queue before today NUDGED
- Jennifer K., `ctc_iz4NuH89hLfSS9795`, our last 2026-09-28, 5 days, queue before today NUDGED
- Oscar Van Der Maas, `ctc_2FdPBcud5TGRTPkZ4`, our last 2026-09-28, 5 days, queue before today NUDGED
- Keivan Said, `ctc_9qxzK4dxa2xQjTdfo`, our last 2026-09-28, 5 days, queue before today NUDGED
- Leon Marzoll, `ctc_ZzLzx9ZvXGw6n3ZhB`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_v4Kie5QRq97eaoHPR`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_ojbk7CE5wCwwhPrJo`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_iL43m4QAgbFop26d4`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_4558xsj8YPprDPCDi`, our last 2026-09-28, 5 days, queue before today NUDGED
- Tracey Stewart, `ctc_PSY4YT5G55xrtTRZ2`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_bJjDXZyP9jtQn8KGx`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_Yaf69nqYfJPwxxspq`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_GeZjYLHZZtsoLej5u`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_vsQq5j4wnfGgdffp2`, our last 2026-09-28, 5 days, queue before today NUDGED
- Nives Rombini, `ctc_5CacAA3M84ChXeJyN`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_Bi4TqichhqadXAoCN`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_cHaWqfG74a3tQenef`, our last 2026-09-28, 5 days, queue before today NUDGED
- Manuela Eilers, `ctc_hmBRggspuWjQi2mkE`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_yhAiLZCELHdLhGXwG`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_pMTuCCHvsuoaGQSfD`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_FHyyBwHpRManaTDC3`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_urWosocAvuKznR9ux`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_7t4sjmWpsECwFc4Z9`, our last 2026-09-28, 5 days, queue before today NUDGED
- Lars Vagevuur, `ctc_YpijTFXfDCEb5mboD`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_vprJ9wmXfFGzQ6csE`, our last 2026-09-28, 5 days, queue before today NUDGED
- Jose Barbosa, `ctc_cRhuCBWWwXsGvEWTf`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_5SyckWYt9uMKL5CMt`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_SmypArZJqYCc2Cjpg`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_h9McQeY5zaJR9pbmm`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_THtBhA3u5JqnsdL3Q`, our last 2026-09-28, 5 days, queue before today NUDGED
- Abdullatif Al-Zaeem, `ctc_2XHwaefanCzHRkuWe`, our last 2026-09-28, 5 days, queue before today NUDGED
- (name not in feed), `ctc_3Bu58Rji68L6jgFwH`, our last 2026-09-28, 5 days, queue before today CORRECTION_SENT
- Paul Prescott, `ctc_HQWRGkBGkYT69xsb9`, our last 2026-09-28, 5 days, queue before today SENT
- (name not in feed), `ctc_wsqBdgSdjP6P6Yxvw`, our last 2026-09-28, 5 days, queue before today SENT
- Nick Vlaeyen, `ctc_SumZAfq5GtFt9xjEF`, our last 2026-09-28, 5 days, queue before today SENT
- Connor Bosco, `ctc_83MwQqhh6XPF8RzQJ`, our last 2026-09-28, 5 days, queue before today SENT
- Stefan Van Der Heijden, `ctc_sCoFYXP34MiTGkvGq`, our last 2026-09-28, 5 days, queue before today SENT
- Peter Van Gulick Msc Mba, `ctc_ExuGxPLfni8pCkz4h`, our last 2026-09-28, 5 days, queue before today SENT
- Yagiz Abik, `ctc_WGtZ2trpDRmytwuoE`, our last 2026-09-28, 5 days, queue before today NUDGED
- Marlon Aird, `ctc_CF2ifxkLkH4Nv4RuR`, our last 2026-09-28, 5 days, queue before today NUDGED
- Jean Madaule, `ctc_FEAEw2Ppc4n5Hn2YL`, our last 2026-09-28, 5 days, queue before today NUDGED
- Saeid Khalafvand, `ctc_3F8ptpRnaWSQapFhH`, our last 2026-09-28, 5 days, queue before today SENT
- Georgia Storey, `ctc_4uSRtEPLmq73GHBvq`, our last 2026-09-28, 5 days, queue before today SENT
- (name not in feed), `ctc_XknfFnBmAo83YYeqh`, our last 2026-09-28, 5 days, queue before today SENT
- (name not in feed), `ctc_kPpKRKfLL9LsHFywM`, our last 2026-09-28, 5 days, queue before today SENT
- Yasin Tipiler, `ctc_rHvwocWb8FubKWECm`, our last 2026-09-28, 5 days, queue before today SENT
- (name not in feed), `ctc_CmqhrPXcHCyuCjmPw`, our last 2026-09-28, 5 days, queue before today SENT
- Rohith Devanathan, `ctc_Wn6WBQz6D6pzv6bQq`, our last 2026-09-28, 5 days, queue before today SENT
- (name not in feed), `ctc_rCGMND9Cgx4sw6FBY`, our last 2026-09-28, 5 days, queue before today SENT
- (name not in feed), `ctc_sPysigrTQgntPu9c6`, our last 2026-09-29, 4 days, queue before today PROTOTYPE_SENT
- (name not in feed), `ctc_L7RyYpwyxfCcuR4WL`, our last 2026-09-30, 3 days, queue before today SENT
- (name not in feed), `ctc_su8BQMQwP7cnLdLFp`, our last 2026-09-30, 3 days, queue before today SENT
- Pierre-Lou Pichon, `ctc_sXX38tjHJTdW82Frh`, our last 2026-09-30, 3 days, queue before today REPLIED_WARM_AWAITING_ANSWER
- Kyson Charles, `ctc_CDeGfHHs3eCrYJR32`, our last 2026-09-29, 3 days, queue before today NUDGED
- Jacqueline Stockwell Arim, Ba Hons, Msc, `ctc_hYkMQaD4Qw5QrHACN`, our last 2026-09-29, 3 days, queue before today SENT
- Ciara Neal, `ctc_RpqPcqXbBRf2Zz57L`, our last 2026-09-29, 3 days, queue before today PROTOTYPE_SENT
- (name not in feed), `ctc_hfHQfM3u3veSXZgS2`, our last 2026-10-01, 2 days, queue before today SENT
- Nikolas Wagner, `ctc_mF4YgtZWWek4sDrb9`, our last 2026-10-01, 2 days, queue before today REPLIED_REOPENED_ANSWERED
- (name not in feed), `ctc_MDdiddoYGMJGaDFHn`, our last 2026-10-01, 1 days, queue before today SENT

## Corrections to my own earlier lists, found today

- **Danny Velt** was in the warm nudge list. We closed him in Dutch on 13 Sep. The close search
  was English only. Now scanned in Dutch, French and German too.
- **Suania and Barbora** were in the first close list. Both got the 15 Sep closing nudge, which the
  playbook calls genuinely last.
- **Rosalie, Jori, Maarten, Laurent, Mahmut** were in the warm nudge list. Each has an earlier
  written verdict, 21 Sep or 28 Sep, that holds.
- **Gerard Ouattara** was in the warm nudge list. He declined on 28 Jul and we signed off on 30 Jul.
- **Daniel Shodamola, Jason, Olivier, Anver, Aaron** had been moved to promised last on the wording
  "one more nudge" or "one more check in". At source none of those says it's the last. Daniel is at
  two follow ups and gets a close. The other four go back to the cold pile at one follow up, flagged
  so that their next message is a close rather than another chase.

## Still waiting on Raka from earlier days

Jim close and Vladislav reply (1 Oct), Alan correction, Tijs build decision, Peter Hurd-Watler
owed in October, Joel and Lynn closes (Raka said "always close" on 21 Sep, never sent), Sholi
(closed with no further contact on 22 Sep, yet a close message was drafted on 25 Sep), and the four
July nudges in `state/drafted_2026-10-01-july-stalled.md`.

**Corrected the same day.** This line first said Steven and Cedric were waiting too. They weren't.
Steven got his UK site on 29 Sep (act_h37nkDaqxedJxZEfn) and Cedric's reply went the same day
(act_7zeK7jCu6Mx2h9aMY). Both came from a summary, not the threads.

## Never contact again. Raka, 2026-10-03, after reviewing the draft list

His words, "close never contact again", for Hein Bilterijst, Alan Ragueneau, Tijs Overeijnder,
Joel Fuente, Lynn Chadwick and Sholi Loewenthal. Read as no closing message either, since a
close is a contact. Each has a DO_NOT_CONTACT queue row. Hein's nudge is withdrawn from
`state/drafted_2026-10-03-warm-nudges.md` and his prototype row carries `doNotContact`. The 21 Sep,
24 Sep and 25 Sep draft files that held the others' drafts are archived.

**Made mechanical, not just noted.** `tools/check-drafts.py` now looks up every draft's contact in
the queue and fails the batch if the latest row is DO_NOT_CONTACT, CLOSED_PROMISED_LAST,
CLOSED_NO_FURTHER_CONTACT, CLOSED_FINAL_MESSAGE, CLOSED_DO_NOT_CONTACT or CLOSED. Positive control,
it failed Hein in today's nudge file, all four in the 25 Sep file and Joel and Lynn in the 21 Sep
file. Negative control, the eleven closes still pass.
