# Silent accepted check, 2026-09-16

Raka asked to check the Silent accepted backlog starting from the most recent
accepts. Three things got in the way, all of them data problems rather than
research problems. Evidence below, every claim from a thread pull.

## 1. There is no reliable "who accepted" signal

`get_contact_fields_schema` returns no LinkedIn connection status field, standard
or custom. Acceptance is not stored on the contact.

`search_campaign_leads` ordered newest first on `cam_PryZp5LuvQv8NznHh` returns
leads added 2026-09-14 with `activities: ""`, so the newest page is fresh imports
rather than the accepted backlog, exactly as the playbook already warns.

`sentOnly` mixes accepted contacts with invitations that have not been accepted.
Nothing in the row distinguishes them.

## 2. The newest rows in sentOnly are pending invitations, not new accepts

| Contact | `lastSentAt` | Thread pulled |
|---|---|---|
| Özgül Atay | 16 Sep 05:51 | **empty, zero activities** |
| Chris Berry | 15 Sep 11:58 | **empty, zero activities** |

Sixteen names on page 1 are absent from `state/silent_accepted_queue.jsonl`, and
the two checked both have empty threads. The whole top of the list is the invite
step firing, not people accepting.

Caveat, stated because the playbook is explicit about it. An empty
`get_inbox_conversation` is **not** proof of a pending invite, because the connect
note is not always written as an activity. The pattern across the six threads
pulled today is that worked contacts have the note logged and these do not, but
that is an inference, not a verified fact.

## 3. `lastSentMessagePreview` is actively misleading, not merely incomplete

The playbook already says the list endpoint hides a nudge that followed a
delivery. It is worse than that. On three contacts the preview showed the generic
**connect note** while a full researched opener had been sent afterwards.

| Contact | Preview says | Thread actually holds |
|---|---|---|
| Carolien Leeraar | connect note, 14 Sep | connect note 17 Aug, **plus a MicroMovements opener 14 Sep** |
| Andy Tidd | connect note, 14 Sep | connect note 30 Aug, **plus a Juntos Solutions opener 14 Sep** |
| Patrick Killeen | connect note, 14 Sep | connect note 7 Sep, **plus a Head and Heart opener 14 Sep** |

Anyone triaging from the list alone would have re messaged all three as though
they had never been contacted.

## 4. The queue's own status field is stale

236 unique leads. `SENT` 125, `NO_STRONG_ANGLE` 41, `DRAFTED` 37,
`BLOCKED_NEEDS_INFO` 31, `DO_NOT_CONTACT` 2. **Zero `UNRESEARCHED`.**

All 37 `DRAFTED` rows carry `openerText: null` and `openerSentAt: null`, yet a
large share of those people demonstrably received a message. Andy Tidd and Patrick
Killeen both have real openers in their threads from 14 Sep. Marjorie Pigaux, Mark
Preston, Mark-Paul Burgersdijk, Malcolm Amonoo, Clara Champion and Dr Ashish
Rajput all show nudges in the inbox. Luke Dear, Robert Fennis, James Thornton,
Sébastien Alotto, Bastian Thomas and Mia Kovač have all since replied.

Andy Tidd also exposes a keying problem. The queue stores "Andy Tidd", lemlist
returns "Andy Tidd Fbcs", so a name match misses him.

## What this means

There is no fresh Silent accepted pool to work this morning. The list looks full
of untouched people because the preview lies, and the queue looks like it holds 37
ready to go because its status was never written back after the 14 Sep sends.

The real job is reconciliation, not outreach. Until the queue agrees with the
threads, any batch drawn from it risks messaging someone twice, which is the one
outreach mistake with no recovery.

## Proposed next step, not yet done

Pull the thread for all 37 `DRAFTED` rows plus the 31 `BLOCKED_NEEDS_INFO` rows,
write back the true status with a `SUPERSEDES prior <status>` note per the queue
hygiene rule, key on `contactId` rather than name, and only then pick a batch.

---

# Update, same day. Scope set to v0.1, partial reconciliation done

## Campaign scope, confirmed against lemlist

`get_campaigns` with no status filter returns **`cam_PryZp5LuvQv8NznHh` (v0.1
Outreach Only) as the only `running` campaign**. `cam_Co5CJXrpPFf5MRAfD` (v0.2
Auto Enrichment Pipeline) is **paused**. That reverses the 2026-08-11 note in
CLAUDE.md which had both running, and it matches Raka's instruction that
everything now goes out on v0.1. Both places in the playbook are corrected.

## 18 of the 37 DRAFTED rows reconciled to SENT

Evidence held to two standards, both sound.

**Thread pulled directly.** Andy Tidd (Juntos Solutions opener, 14 Sep) and
Patrick Killeen (Head and Heart CIC opener, 14 Sep).

**Preview showed a real message.** Marjorie Pigaux, Mark Preston, Mark-Paul
Burgersdijk, Malcolm Amonoo, Clara Champion and Dr Ashish Rajput all show nudges.
Jose Barbosa, Katrin Kempe and Lars Vagevuur all show openers. Amir Ghorbaninia
shows the note congratulating the Ad-Wise rebuild. This direction is reliable. A
preview showing a real message proves one exists. The unreliability runs the other
way, a preview showing the connect note can hide a later opener.

**Already replied**, so unambiguously worked. Luke Dear, Robert Fennis, James
Thornton, Sébastien Alotto, Bastian Thomas, Mia Kovač.

Each got an appended row with `SUPERSEDES prior DRAFTED` and the specific evidence.

## 19 still unverified, and why they are not cheap to check

Christelle Dupuy, Daniel Forster, Dr Ramedani, Gijs van den Hombergh, Irem Unlu
Demir, Jojanneke van 't Land, Lars Tibben, Lea Janoray, Leen van 't Veen, Luis
Perona, Manon Picot, Mark Langens, Muhammad Ahmed Sarfraz, Nico Wusk, Robert van
Glabbeek, Russell Upton, Samer Al-Waealy, Seydouba Fissa Sylla, Ziad Al-Nuss.

**Only 7 of the 37 DRAFTED rows carry a `contactId` and none carry a `leadId`.**
The rest hold a name only, so each needs a `get_inbox_conversations` search to
resolve the id and then a thread pull. Roughly 38 calls for these 19.

Paginating `search_campaign_leads` with activities is not the shortcut it looks
like. Offsets 0 and 120 on v0.1 both return leads added 2026-09-14 with
`activities: ""`, so the campaign's first several hundred rows are fresh imports
and the worked leads sit much deeper.

## Not sent anything

No batch drawn. Nineteen rows in the queue still claim DRAFTED without proof, and
a batch drawn across them risks messaging someone a second time.
