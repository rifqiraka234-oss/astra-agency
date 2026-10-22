#!/usr/bin/env python3
"""lemlist reads straight from the API, so a thread costs a few lines of context, not pages of JSON.

    python3 tools/lemlist.py thread ctc_A ctc_B          # every message, oldest first, both directions
    python3 tools/lemlist.py thread --summary ctc_A ...  # one line per thread, for an audit pass only
    python3 tools/lemlist.py accepts cam_X [--since 2026-10-01]   # who accepted, with their queue status
    python3 tools/lemlist.py inbox [--your-turn]          # the conversation list, a candidate list only
    python3 tools/lemlist.py get "/api/team"              # any GET, raw saved, shape printed

Reads only. Sends stay on the MCP send_message, on Raka's word, never from here.

The key is the LEMLIST network secret on the Astra Agency environment (Basic auth, added
22 Oct 2026). The proxy injects it, so the key is never in this container or this file.

Every raw response is saved under --raw (default /tmp/lemlist-raw) so a claim can be reopened.

What was proven before this file was trusted (22 Oct 2026). Noah Hertling's thread (6 items)
and Niklas Hanf's (15 items, two pages) pulled both ways, API and MCP get_inbox_conversation.
21 of 21 items matched on id, order and length.

The traps it handles, each found in that test.
- The text is in `message` for what we sent through lemlist and in `text` for what LinkedIn
  synced, which includes THEIR REPLIES and the connect note. Reading one field shows a yes as blank.
- An item can be empty in lemlist itself (Niklas, 21 Sep 08.40). It's printed as EMPTY, not hidden.
- lemlist counts length in UTF-16, so an emoji is 2. Python's len says 1. Lengths are UTF-16 here.
- Threads page at 10, newest first. Every page is pulled and the count must equal totalItems.

Every `thread` run pulls the control thread first. If it doesn't come back full, the run stops,
because an empty thread only means "never messaged" when the method is shown to work.
"""

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.parse
from datetime import datetime

API = "https://api.lemlist.com"
USER = "usr_27bdxG7jzTn2rucGB"
CONTROL = "ctc_ch3vFcKAkjQdMKDCg"   # Noah Hertling, 6 items on 22 Oct 2026, only ever grows
CONTROL_MIN = 6
QUEUE = os.path.join(os.path.dirname(__file__), "..", "state", "silent_accepted_queue.jsonl")


def get(path, raw_dir, tag):
    for attempt in range(4):
        r = subprocess.run(["curl", "-sS", "--max-time", "40", "-w", "\n%{http_code}", API + path],
                           capture_output=True, text=True)
        body, _, code = r.stdout.rpartition("\n")
        if code == "200":
            break
        if code in ("429", "500", "502", "503", "504", "000"):
            time.sleep(2 ** (attempt + 1))
            continue
        sys.exit(f"FAILED {code} on {path}\n{body[:300]}{r.stderr[:300]}")
    else:
        sys.exit(f"FAILED {code} on {path} after 4 tries")
    os.makedirs(raw_dir, exist_ok=True)
    with open(os.path.join(raw_dir, f"{time.strftime('%Y%m%dT%H%M%S')}-{tag}.json"), "w") as f:
        f.write(body)
    try:
        return json.loads(body)
    except ValueError:
        sys.exit(f"NOT JSON on {path}, the route probably doesn't exist\n{body[:200]}")


def u16(s):
    return len(s.encode("utf-16-le")) // 2


def pull_thread(cid, raw):
    items, page = [], 1
    while True:
        d = get(f"/api/inbox/{cid}?page={page}", raw, f"thread-{cid}-p{page}")
        items += d["data"]
        p = d["pagination"]
        if not p["nextPage"]:
            break
        page = p["nextPage"]
    if len(items) != p["totalItems"]:
        sys.exit(f"COUNT MISMATCH {cid}, pulled {len(items)}, lemlist says {p['totalItems']}")
    if len({a["_id"] for a in items}) != len(items):
        sys.exit(f"DUPLICATE ITEMS {cid}, a page shifted while paging, run it again")
    return sorted(items, key=lambda a: a["createdAt"])


def who(a):
    return {"linkedinSent": "US  ", "linkedinReplied": "THEM"}.get(a["type"], a["type"])


def body(a):
    return a.get("message") or a.get("text") or ""


def cmd_thread(args):
    ctl = pull_thread(CONTROL, args.raw)
    if len(ctl) < CONTROL_MIN:
        sys.exit(f"CONTROL FAILED, {CONTROL} returned {len(ctl)} items, expected {CONTROL_MIN}+. "
                 "Every result in this run is void.")
    print(f"control {CONTROL} {len(ctl)} items, ok")
    now = time.time()
    for cid in args.contacts:
        items = pull_thread(cid, args.raw)
        empty = [a["_id"] for a in items if not body(a)]
        if args.summary:
            if not items:
                print(f"{cid}  0 items")
                continue
            last = items[-1]
            us = [a for a in items if a["type"] == "linkedinSent"]
            them = [a for a in items if a["type"] == "linkedinReplied"]
            age = ""
            if us:
                t = datetime.fromisoformat(us[-1]["createdAt"].replace("Z", "+00:00")).timestamp()
                age = f" ourlast {(now - t) / 86400:.1f}d"
            print(f"{cid}  {len(items)} items, us {len(us)}, them {len(them)},{age}"
                  f" last {who(last).strip()} {last['createdAt'][:16]}  "
                  f"{body(last)[:90].replace(chr(10), ' ')}"
                  + (f"  EMPTY {len(empty)}" if empty else ""))
            continue
        print(f"\n== {cid}  {len(items)} items, all pages, oldest first")
        for a in items:
            t = body(a)
            print(f"-- {a['createdAt'][:16].replace('T', ' ')}  {who(a)}  {a['_id']}  len {u16(t)}")
            print(t if t else "EMPTY, no text in lemlist either")
        if empty:
            print(f"!! {len(empty)} empty item(s), {', '.join(empty)}")


def queue_index():
    idx = {}
    with open(QUEUE, encoding="utf8") as f:
        for line in f:
            if line.strip():
                r = json.loads(line)
                for k in (r.get("contactId"), r.get("leadId")):
                    if k:
                        idx[k] = r
    return idx


def cmd_accepts(args):
    q = {"version": "v2", "type": "linkedinInviteAccepted", "campaignId": args.campaign, "limit": 100}
    if args.since:
        q["minDate"] = args.since
    rows, offset = [], 0
    while True:
        q["offset"] = offset
        d = get("/api/activities?" + urllib.parse.urlencode(q), args.raw, f"accepts-{args.campaign}-{offset}")
        data = d["data"] if isinstance(d, dict) else d
        rows += data
        if len(data) < 100:
            break
        offset += 100
    if len({a["_id"] for a in rows}) != len(rows):
        sys.exit("DUPLICATE EVENTS, paging shifted, run it again")
    idx = queue_index()
    counts = {}
    for a in sorted(rows, key=lambda a: a["createdAt"]):
        r = idx.get(a.get("contactId")) or idx.get(a.get("leadId"))
        st = r.get("status", "NO STATUS") if r else "NOT IN QUEUE"
        counts[st] = counts.get(st, 0) + 1
        print(f"{a['createdAt'][:16]}  {a.get('contactId')}  {a.get('leadFirstName')} {a.get('leadLastName')}"
              f"  |  {a.get('leadCompanyName')}  |  {st}")
    print(f"\n{len(rows)} accept events. Reconcile against get_campaigns_stats linkedinInvitationAccepted.")
    print("  " + ", ".join(f"{k} {v}" for k, v in sorted(counts.items(), key=lambda kv: -kv[1])))


def cmd_inbox(args):
    rows, page = [], 1
    while True:
        d = get(f"/api/inbox?userId={USER}&limit=100&page={page}", args.raw, f"inbox-p{page}")
        rows += d["data"]
        if not d["pagination"]["nextPage"]:
            break
        page = d["pagination"]["nextPage"]
    if len(rows) != d["pagination"]["totalItems"]:
        sys.exit(f"COUNT MISMATCH, pulled {len(rows)}, lemlist says {d['pagination']['totalItems']}")
    rows.sort(key=lambda r: r.get("lastActivityAt") or "", reverse=True)
    shown = [r for r in rows if r.get("isYourTurn")] if args.your_turn else rows
    for r in shown:
        print(f"{(r.get('lastActivityAt') or '')[:16]}  {r['contactId']}  {r['contact'].get('fullName')}"
              f"  turn {'US' if r.get('isYourTurn') else 'them'}"
              f"  sent {(r.get('lastSentAt') or '-')[:10]}  replied {(r.get('lastRepliedAt') or '-')[:10]}"
              f"  |  {(r.get('lastRepliedMessagePreview') or '')[:60].replace(chr(10), ' ')}")
    print(f"\n{len(shown)} shown of {len(rows)}. Previews lie, pull the thread before believing any row.")


def cmd_get(args):
    d = get(args.path, args.raw, "get")
    if isinstance(d, dict):
        print("keys", sorted(d.keys()))
        for k, v in d.items():
            if isinstance(v, list):
                print(f"{k}, {len(v)} items" + (f", item keys {sorted(v[0].keys())}" if v and isinstance(v[0], dict) else ""))
            elif isinstance(v, dict) and k == "pagination":
                print("pagination", v)
    else:
        print(f"list, {len(d)} items" + (f", item keys {sorted(d[0].keys())}" if d and isinstance(d[0], dict) else ""))
    print("raw saved under", args.raw)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--raw", default="/tmp/lemlist-raw", help="where raw responses are saved")
    sub = ap.add_subparsers(dest="cmd", required=True)
    t = sub.add_parser("thread")
    t.add_argument("contacts", nargs="+")
    t.add_argument("--summary", action="store_true", help="one line per thread, never enough to draft from")
    a = sub.add_parser("accepts")
    a.add_argument("campaign")
    a.add_argument("--since", help="ISO date, passed as minDate")
    i = sub.add_parser("inbox")
    i.add_argument("--your-turn", action="store_true")
    g = sub.add_parser("get")
    g.add_argument("path")
    args = ap.parse_args()
    {"thread": cmd_thread, "accepts": cmd_accepts, "inbox": cmd_inbox, "get": cmd_get}[args.cmd](args)


if __name__ == "__main__":
    main()
