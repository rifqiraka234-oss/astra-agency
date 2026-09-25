#!/usr/bin/env python3
"""Session preflight. Run this FIRST, every session, before anything else.

    python3 tools/preflight.py

It prints what is actually open right now and the rules that apply to it, so the
operative content is reachable in one screen instead of buried at line 2,400 of a
3,000 line file. It reads state from disk, never from memory, which is the whole point.
"""

import json
import os
import subprocess
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
os.chdir(ROOT)


def head(t):
    print("\n" + "=" * 78 + f"\n{t}\n" + "=" * 78)


def sh(c):
    try:
        return subprocess.run(c, shell=True, capture_output=True, text=True, timeout=25).stdout.strip()
    except Exception as e:
        return f"(failed: {e})"


head("1. READ docs/RULES.md IN FULL BEFORE ANY WORK")
print("""  It outranks every other doc except a live instruction from Raka.
  The three that get broken most, in the order they get broken.

    Nothing outward is sent without Raka's explicit word, every time.
      An edit instruction is an edit, not authorisation. A batch approval
      covers that batch only.

    get_inbox_conversation per contact, immediately before every send.
      Not the preview, not a bulk pull, not a state file. If a real message
      already exists, it is a Stalled lead and gets a nudge, not an opener.

    Three checks, three different ACTIONS. Reopen the source. Try to prove it
      FALSE. Confirm a second way that cannot fail the same way.
      Every absence claim ships with a positive control.

    LOAD THE WHOLE CHAT before any next message to anyone. All of it, both
      directions, from the first message. get_inbox_conversation is capped at
      TEN PER PAGE, newest first, and limit above 10 is refused, so page until
      nextPage is null. A thread over ten messages hides its own beginning,
      and the beginning is where the promises live.

    THE UNLOADED SCREEN. Our reader failing is never evidence about their site.
      site-audit.js re-fetches every failed same origin asset a second way and
      prints RENDER NOT TRUSTED when the failure is OURS. When it fires, every
      visual, asset and emptiness finding is void AND THE SCREENSHOTS ARE
      UNUSABLE for that site. A blocked page is never a weak page.

    THE OPENER TEMPLATE IS FIXED WORDING. Raka's, 2026-09-22. Only the brackets
      change. Full spec, the eleven inputs and every rule, in docs/opener-template.md.
      Read it before drafting any first message. check-drafts.py enforces the wording.
      FIVE BLOCKS since 2026-09-24. Block three is 'Especially, when you are [current goal],
      the [same problem growing bigger]'.
      Block five is short, 'Shall I send you over what the [thing] looks like?'

    CLUES TO INFERENCE. The [impact] aims at their CURRENT goal, and that goal is
      inferred from linked clues across EIGHT sources, all opened, every lead. Their
      own lemlist jobDescription and summary FIRST, then site and newsletter, company
      LinkedIn posts, the owner's pages, job openings READ IN FULL, news on the company,
      news on the owner. Two agreeing clues or it is WEAK. The clue never appears in
      the message. Then check the site WHERE THE GOAL LIVES, not the whole site.
      Sections 3A and 3B of docs/opener-template.md.

    NEW LEADS COME FROM THE ACCEPTANCE COUNT, not an old untouched list.
      get_campaigns_stats now, minus the last audit, then linkedinInviteAccepted
      activities since that date. The arithmetic closes before anyone is researched.

    THE BIGGEST PAIN WINS. Four levels, him, his company, his region, his industry.
      Past the website too, costs, rules, capacity, and we build apps as well as sites.
      Every pain in one table, pick the biggest PROVEN one. RULES.md section 4A.
      AND THE COSTLIEST. Add what it costs him a year and the pay test, would he pay
      5k to 50k to fix it. A tiny fix is never the angle, only a symptom of a costly pain.
      EVERY PAGE, EIGHT PLUS SOURCES. Crawl the whole site and say the count, judge it as a
      whole, and name at least eight outside sources. RULES.md 4A rule 10.
      GROWTH GOAL? ASK IF THE INSIDE CAN CARRY IT. Quoting, planning, prep, crews,
      compliance, and who the bottleneck is. Internal tools are an angle. Rule 11.
      THE OWNER'S LINKEDIN IS YOURS TO READ. Six routes, all written down, before Raka is
      ever asked. Never hand research back to him. Rule 12.

    THE RESEARCH GATE, SEVEN MANDATORY ITEMS, RULES.md 4B. check-drafts FAILS without it.
      Whole site read TWICE plus a deep analysis. Owner AND contact LinkedIn. Google News on
      the company, python3 tools/news.py. Regional AND industry news. 10+ sources over 6+
      domains. Every pain judged, the costliest, hottest or biggest chosen. Sources and
      thesis rechecked, confidence HIGH or MEDIUM, LOW never shown. A ```gate block above
      every OPENER.

    THE ANGLE SWEEP, FIVE FAMILIES, EVERY LEAD. RULES.md 4A rule 13, Raka 2026-09-25.
      Website holding back growth. GDPR. Apps and internal tools. Social media. BUILD SQUAD,
      a competitor or agency is a Build Squad lead, not a dead end. Each tested
      with evidence before any verdict. A strong site is one family, not NO_STRONG_ANGLE.
      check-drafts fails a ```sweep or gate without all four.

    ONE THREAD. RULES.md 1A, Raka 2026-09-25. Block two names ONE problem, block three grows
      THAT problem, blocks four and five fix THAT problem. A true flaw from another family stays
      out. The gate carries thread and lead read, check-drafts fails a link word missing from
      the offer. Then read block two, skip to block five, ask "does this fix what it named?".
      Raka's offer is verbatim, "in half the time at half the price". Never reword his claims.

    BEFORE ANY SEND, TWO MORE, RULES.md section 1, A and B.
      A. Never messaged before, four ways. The thread, a name and company search for a
         duplicate contact, every campaign they're in, and a grep of every state file.
      B. Every FACT in the message reopened at its source and still exactly true. The
         inference may be wrong, the facts it stands on may not.

    REPORT IN PLAIN WORDS. Each lead starts with the angle in one or two everyday
      sentences. No jargon to Raka. If he can't follow it, neither will the lead.

    RENDER NOT TRUSTED has a next step. node tools/render-via-curl.js <url> <tag>.
      0 curl errors means read every part it writes. Anything else means blocked.

    PRESUMPTION. A lemlist field is a claim, not a fact. Before fetching
      anything, read the tagline against companyName, separate the business
      they OWN from the job they HOLD, confirm the domain is actually theirs,
      and check the statutory record on any owner claim. Two of the first five
      accepted leads were stale this way, one had sold his company.""")

head("2. GIT")
print(f"  branch   {sh('git rev-parse --abbrev-ref HEAD')}")
print("  head     " + sh("git log -1 --pretty=format:'%h %s'"))
dirty = sh("git status --porcelain")
print(f"  tree     {'CLEAN' if not dirty else 'UNCOMMITTED: ' + dirty[:200]}")
behind = sh("git rev-list --count HEAD..@{u} 2>/dev/null")
print(f"  behind   {behind or '0'} commit(s) behind origin, pull before working")

head("3. WHAT IS OPEN RIGHT NOW")
q = ROOT / "state/silent_accepted_queue.jsonl"
if q.exists():
    latest = {}
    for line in q.open(encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        try:
            r = json.loads(line)
        except Exception:
            continue
        if r.get("contactId"):
            latest[r["contactId"]] = r
    c = Counter(r.get("status", "?") for r in latest.values())
    print(f"  queue, latest row per contact, {len(latest)} contacts")
    for k, v in c.most_common():
        print(f"    {v:>4}  {k}")

p = ROOT / "state/prototypes.jsonl"
if p.exists():
    pend = [json.loads(l) for l in p.open(encoding="utf-8") if l.strip()]
    op = [r for r in pend if r.get("outcome") == "pending"]
    print(f"\n  prototypes with outcome pending, these are OWED: {len(op)}")
    for r in op[-8:]:
        print(f"    {r.get('date','?')}  {r.get('companyName','?')}")

head("4. THE LAST TWO SESSION LOGS, read them before deciding anything")
logs = sorted((ROOT / "logs/inbox").glob("*.md")) if (ROOT / "logs/inbox").exists() else []
for f in logs[-2:]:
    print(f"  {f}")
extra = sorted((ROOT / "state").glob("drafted_*.md"))[-2:]
for f in extra:
    print(f"  {f}")

head("5. CAMPAIGN STATE IS NOT IN THIS REPO. GO AND READ IT.")
print("""  get_campaigns                      which are actually running, it changes
  get_campaigns_stats                channelMetrics.linkedinInvitationAccepted
  export/leads?state=...             the accepted pool, state is REQUIRED
  get_inbox_conversation per contact the only reliable read of a thread

  Never infer acceptance from a timestamp. Never trust lastSentMessagePreview.""")

head("6. BEFORE ANYTHING IS SHOWN OR SENT")
print("""  node tools/site-audit.js <url> <tag>     then OPEN BOTH SCREENSHOTS
  python3 tools/check-drafts.py <file>     exits non zero, cannot be ignored

  Neither tool judges truth. They only guarantee you never fail on something a
  script could have caught. Passes 1, 2 and 3 of the read back are still yours.""")
print()
