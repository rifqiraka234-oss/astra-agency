#!/usr/bin/env python3
"""lemlist reads straight from the API, so a thread costs a few lines of context, not pages of JSON.

    python3 tools/lemlist.py thread ctc_A ctc_B          # every message, oldest first, both directions
    python3 tools/lemlist.py thread --summary ctc_A ...  # one line per thread, for an audit pass only
    python3 tools/lemlist.py accepts cam_X [--since 2026-10-01]   # who accepted, with their queue status
    python3 tools/lemlist.py inbox [--your-turn]          # the conversation list, a candidate list only
    python3 tools/lemlist.py get "/api/team"              # any GET, raw saved, shape printed
    python3 tools/lemlist.py audit                        # everyone accepted, every thread, sorted by the rules

The audit is a candidate list. Before drafting for anyone in it, read their whole thread with `thread`.

Sends go through `send`, on Raka's word only. A dry run of the exact text first, then --go with his words in
--approval. It refuses a changed thread or a duplicate, and confirms one identical copy after.

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
import re
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


def pull_accepts(campaign, raw, since=None):
    q = {"version": "v2", "type": "linkedinInviteAccepted", "campaignId": campaign, "limit": 100}
    if since:
        q["minDate"] = since
    rows, offset = [], 0
    while True:
        q["offset"] = offset
        d = get("/api/activities?" + urllib.parse.urlencode(q), raw, f"accepts-{campaign}-{offset}")
        data = d["data"] if isinstance(d, dict) else d
        rows += data
        if len(data) < 100:
            break
        offset += 100
    if len({a["_id"] for a in rows}) != len(rows):
        sys.exit(f"DUPLICATE EVENTS in {campaign}, paging shifted, run it again")
    return rows


def cmd_accepts(args):
    rows = pull_accepts(args.campaign, args.raw, args.since)
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


CLOSED = ("CLOSED", "DO_NOT_CONTACT", "DECLINED_CLOSED", "NOT_A_LEAD", "ALREADY_MESSAGED_VIA_COFOUNDER")
DEALS = ("SAID_YES_PENDING", "PROTOTYPE_SENT", "DELIVERED", "MEETING_BOOKED")


def ts(a):
    return datetime.fromisoformat(a["createdAt"].replace("Z", "+00:00")).timestamp()


def pitches(us):
    """Our messages within 30 minutes of each other are one pitch, a message split in two."""
    groups = []
    for a in us:
        if groups and ts(a) - groups[-1] < 1800:
            groups[-1] = ts(a)
        else:
            groups.append(ts(a))
    return len(groups)


def classify(items, accepted_at):
    """The follow up rules in RULES.md section 1, applied to one whole thread."""
    us = [a for a in items if a["type"].endswith("Sent")]
    them = [a for a in items if a["type"].endswith("Replied")]
    # The connect note is our first item when it predates the acceptance. Everything else is real.
    if us and (accepted_at is None and items[0] is us[0] or accepted_at and ts(us[0]) < accepted_at):
        us = us[1:]
    # v0.1 sometimes logged the connect note after the acceptance, so its wording settles it too.
    us = [a for a in us if "saw your business and thought it was cool" not in body(a)]
    last = items[-1] if items else None
    out = {"items": len(items), "us": len(us), "them": len(them),
           "lastUs": us[-1]["createdAt"] if us else None, "lastThem": them[-1]["createdAt"] if them else None,
           "lastText": body(last)[:70].replace("\n", " ") if last else "",
           "lastThemText": body(them[-1])[:90].replace("\n", " ") if them else "",
           "lastUsText": body(us[-1])[:90].replace("\n", " ") if us else ""}
    if last and last["type"].endswith("Replied"):
        out["kind"] = "THEM_LAST"
    elif not us:
        out["kind"] = "NEVER"
    else:
        since = [a for a in us if not them or ts(a) > ts(them[-1])]
        out["pitches"] = pitches(since)
        out["ageDays"] = round((time.time() - ts(us[-1])) / 86400, 1)
        out["kind"] = "ONE_PITCH" if out["pitches"] == 1 else "TWO_PLUS"
    return out


def cmd_audit(args):
    camps = get("/api/campaigns?version=v2&limit=100", args.raw, "campaigns")["campaigns"]
    who_ = {}
    print("accept events per campaign, Raka's sender only")
    for c in camps:
        allrows = pull_accepts(c["_id"], args.raw)
        rows = [a for a in allrows if a.get("sendUserId") == USER]
        if len(rows) != len(allrows):
            print(f"  skipped {len(allrows) - len(rows)} from another sender in {c['name']}")
        if rows:
            print(f"  {len(rows):4}  {c['status']:8} {c['name']}")
        for a in rows:
            cid = a.get("contactId")
            if cid and (cid not in who_ or ts(a) < who_[cid]["acceptedAt"]):
                who_[cid] = {"acceptedAt": ts(a), "name": f"{a.get('leadFirstName')} {a.get('leadLastName')}",
                             "company": a.get("leadCompanyName"), "leadId": a.get("leadId"),
                             "campaign": c["name"][:22], "source": "accept"}
    print(f"  {len(who_)} unique contacts accepted")
    # Anyone with a reply, or open in the queue, who has no accept event still gets checked.
    extra = 0
    page = 1
    while True:
        d = get(f"/api/inbox?userId={USER}&limit=100&page={page}", args.raw, f"audit-inbox-p{page}")
        for r in d["data"]:
            if r["contactId"] not in who_:
                who_[r["contactId"]] = {"acceptedAt": None, "name": r["contact"].get("fullName"), "company": None,
                                        "leadId": None, "campaign": "", "source": "inbox"}
                extra += 1
        if not d["pagination"]["nextPage"]:
            break
        page = d["pagination"]["nextPage"]
    idx = queue_index()
    seen = set()
    for r in idx.values():
        cid = r.get("contactId")
        if cid and re.fullmatch(r"ctc_[A-Za-z0-9]+", cid) and cid not in who_ and cid not in seen \
                and not str(r.get("status", "")).startswith(CLOSED):
            seen.add(cid)
            who_[cid] = {"acceptedAt": None, "name": r.get("name"), "company": r.get("companyName"),
                         "leadId": r.get("leadId"), "campaign": "", "source": "queue"}
            extra += 1
    print(f"  {extra} more with no accept event, from the reply list and open queue rows")

    ctl = pull_thread(CONTROL, args.raw)
    if len(ctl) < CONTROL_MIN:
        sys.exit(f"CONTROL FAILED, {CONTROL} returned {len(ctl)} items. Every result in this run is void.")
    print(f"control {CONTROL} {len(ctl)} items, ok\n")

    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(4) as ex:
        threads = dict(zip(who_, ex.map(lambda c: pull_thread(c, args.raw), who_)))
    res = []
    for cid, w in who_.items():
        r = idx.get(cid) or idx.get(w["leadId"])
        st = r.get("status", "NO STATUS") if r else "NOT IN QUEUE"
        c = classify(threads[cid], w["acceptedAt"])
        c.update(w, contactId=cid, status=st, closed=st.startswith(CLOSED), deal=st in DEALS,
                 empty=sum(1 for a in threads[cid] if not body(a)))
        k = c["kind"]
        ruled = r.get("date", "") if r else ""
        parked = st.startswith(("HOLD", "LEFT_ALONE", "PARKED", "RESEARCH", "CLOSER"))
        if k == "THEM_LAST" and parked and c["lastThem"][:10] < ruled:
            k = "RULED"   # their last word came before our ruling on the row, so the ruling stands
        if k == "THEM_LAST":
            c["bucket"] = "THEY WROTE LAST, row closed" if c["closed"] else "REPLY WAITING ON US"
        elif k == "NEVER":
            c["bucket"] = "ACCEPTED, NOTHING SENT" if w["acceptedAt"] else "NO ACCEPT EVENT, NOTHING SENT"
        elif c["closed"]:
            c["bucket"] = "CLOSED, QUIET"
        elif st.startswith("HOLD"):
            c["bucket"] = "HELD FOR RAKA'S CALL"
        elif st.startswith("RESEARCH"):
            c["bucket"] = "QUEUED FOR RESEARCH"
        elif st.startswith("CLOSER"):
            c["bucket"] = "LAST POLITE BUMP DRAFTED"
        elif st.startswith("LEFT_ALONE"):
            c["bucket"] = "LEFT ALONE"
        elif st.startswith("PARKED"):
            c["bucket"] = "PARKED, CHECK BACK LATER"
        elif st in ("SEND_FAILED", "BLOCKED_NOT_CONNECTED", "NOT_CONNECTED"):
            c["bucket"] = "LAST SEND FAILED, NOT CONNECTED"
        elif c["deal"]:
            c["bucket"] = "DEALS, RAKA FOLLOWS UP"
        elif k == "ONE_PITCH":
            c["bucket"] = "BUMP DUE NOW" if c["ageDays"] > 3 else "BUMP COMING"
        else:
            c["bucket"] = "HAD ITS FOLLOW UP, CLOSE SILENTLY" if c["ageDays"] > 3 else "HAD ITS FOLLOW UP, WAITING"
        res.append(c)
    out = os.path.join(args.raw, f"audit-{time.strftime('%Y%m%dT%H%M%S')}.json")
    with open(out, "w") as f:
        json.dump(res, f, ensure_ascii=False, indent=1)

    order = ["REPLY WAITING ON US", "DEALS, RAKA FOLLOWS UP", "BUMP DUE NOW", "BUMP COMING",
             "HELD FOR RAKA'S CALL", "QUEUED FOR RESEARCH", "LAST POLITE BUMP DRAFTED", "PARKED, CHECK BACK LATER", "LAST SEND FAILED, NOT CONNECTED", "LEFT ALONE",
             "HAD ITS FOLLOW UP, CLOSE SILENTLY", "HAD ITS FOLLOW UP, WAITING", "ACCEPTED, NOTHING SENT",
             "NO ACCEPT EVENT, NOTHING SENT",
             "THEY WROTE LAST, row closed", "CLOSED, QUIET"]
    for b in order:
        rows = sorted([c for c in res if c["bucket"] == b], key=lambda c: c["lastUs"] or c["lastThem"] or "")
        print(f"== {b}  {len(rows)}")
        if b in ("ACCEPTED, NOTHING SENT", "NO ACCEPT EVENT, NOTHING SENT"):
            by = {}
            for c in rows:
                by.setdefault(c["status"], []).append(c)
            for st, cs in sorted(by.items(), key=lambda kv: -len(kv[1])):
                names = ", ".join(f"{c['name']} {c['contactId']}" for c in cs) if not st.startswith(CLOSED) \
                    and st not in ("NO_STRONG_ANGLE", "BLOCKED_NEEDS_INFO", "NOT_CONNECTED") else ""
                print(f"   {len(cs):3}  {st}  {names}")
            continue
        if b == "CLOSED, QUIET":
            continue
        for c in rows:
            due = ""
            if c["lastUs"] and b in ("BUMP COMING", "HAD ITS FOLLOW UP, WAITING"):
                due = " due " + datetime.utcfromtimestamp(ts({"createdAt": c["lastUs"]}) + 3 * 86400).strftime("%d %b %H.%M")
            print(f"   {c['name']} | {c['company']} | {c['contactId']} | {c['status']} | "
                  f"us {(c['lastUs'] or '-')[:10]} them {(c['lastThem'] or '-')[:10]}"
                  f"{' pitches ' + str(c['pitches']) if 'pitches' in c else ''}"
                  f"{' age ' + str(c['ageDays']) + 'd' if 'ageDays' in c else ''}{due}"
                  f"{' src ' + c['source'] if c['source'] != 'accept' else ''} | {c['lastText'][:60]}")
            if b == "BUMP DUE NOW":
                print(f"        THEM {c['lastThemText'] or '-'}\n        US   {c['lastUsText']}")
    print(f"\n{len(res)} contacts, {sum(len(t) for t in threads.values())} thread items, all pages. Saved {out}")


PLAN = "/tmp/lemlist-raw/send-plan.json"
# The same never again list as tools/check-drafts.py.
NEVER_AGAIN = {"DO_NOT_CONTACT", "CLOSED_DO_NOT_CONTACT", "CLOSED_NO_FURTHER_CONTACT",
               "CLOSED_PROMISED_LAST", "CLOSED_FINAL_MESSAGE", "CLOSED"}


def draft_text(path, cid, label):
    """The message for one contact, copied byte for byte out of a drafts file.

    A section starts at a `### ` heading carrying the contactId. A message is a fenced block whose
    opening fence is a bare ``` (a ```gate block is never a message), labelled by the line above it.
    """
    text = open(path, encoding="utf8").read()
    secs = [s for s in re.split(r"(?m)^(?=### )", text) if s.startswith("### ") and cid in s.split("\n", 1)[0]]
    if len(secs) != 1:
        sys.exit(f"REFUSED {cid}, {len(secs)} sections in {path} name it, need exactly 1")
    # Pair the fences in order. A regex over ``` lines took a gate block's closing fence for a message's opening one.
    blocks, lines, i = [], secs[0].split("\n"), 0
    while i < len(lines):
        if lines[i].startswith("```"):
            info, j = lines[i][3:].strip(), i + 1
            while j < len(lines) and lines[j].strip() != "```":
                j += 1
            if not info:
                above = [l for l in lines[:i] if l.strip()]
                blocks.append((above[-1] if above else "", "\n".join(lines[i + 1:j])))
            i = j + 1
        else:
            i += 1
    if label:
        blocks = [b for b in blocks if b[0].strip() == label]
    if len(blocks) != 1:
        sys.exit(f"REFUSED {cid}, {len(blocks)} message blocks{' labelled ' + label if label else ''}, need exactly 1."
                 " Pass --label to pick one.")
    msg = blocks[0][1]
    for bad, why in (("—", "an em dash"), ("–", "an en dash"), ("[", "a template bracket"), ("]", "a template bracket")):
        if bad in msg:
            sys.exit(f"REFUSED {cid}, the message has {why}")
    if not msg.strip():
        sys.exit(f"REFUSED {cid}, empty message. The API tries to send even with no message.")
    return blocks[0][0].strip(), msg


def cmd_send(args):
    import hashlib
    plan = {}
    if os.path.exists(PLAN):
        plan = json.load(open(PLAN))
    ctl = pull_thread(CONTROL, args.raw)
    if len(ctl) < CONTROL_MIN:
        sys.exit(f"CONTROL FAILED, {CONTROL} returned {len(ctl)} items. Nothing sent.")
    print(f"control {CONTROL} {len(ctl)} items, ok")
    for cid in args.contacts:
        label, msg = draft_text(args.file, cid, args.label)
        sha = hashlib.sha256(msg.encode()).hexdigest()[:16]
        items = pull_thread(cid, args.raw)
        latest = items[-1]["_id"] if items else None
        dup = sum(1 for a in items if body(a).strip() == msg.strip())
        print(f"\n== {cid}  {label}, {u16(msg)} chars, sha256 {sha}, thread {len(items)} items")
        for a in items[-2:]:
            print(f"   last  {a['createdAt'][:16]}  {who(a)}  {body(a)[:100].replace(chr(10), ' ')}")
        print("   ---- message ----\n" + msg + "\n   -----------------")
        if dup:
            print(f"   REFUSED, this exact text is already in the thread {dup} time(s)")
            continue
        row = queue_index().get(cid, {})
        if row.get("status") in NEVER_AGAIN:
            print(f"   REFUSED, the queue says {row['status']}, never contact again")
            continue
        if not args.go:
            plan[cid] = {"sha": sha, "latest": latest, "items": len(items), "at": time.time(), "file": args.file}
            print("   DRY RUN, nothing sent. Planned, the real send must follow within 30 minutes.")
            continue
        p = plan.get(cid)
        if not p or p["sha"] != sha or time.time() - p["at"] > 1800:
            print("   REFUSED, no dry run of this exact text in the last 30 minutes. Run it without --go first.")
            continue
        if p["latest"] != latest or p["items"] != len(items):
            print(f"   REFUSED, the thread changed since the dry run ({p['items']} items then, {len(items)} now). "
                  "Read it again, nothing sent.")
            continue
        r = subprocess.run(["curl", "-sS", "--max-time", "60", "-X", "POST", "-H", "Content-Type: application/json",
                            "-d", json.dumps({"sendUserId": USER, "contactId": cid, "message": msg}),
                            "-w", "\n%{http_code}", API + "/api/inbox/linkedin"], capture_output=True, text=True)
        resp, _, code = r.stdout.rpartition("\n")
        sent_at = time.strftime("%Y-%m-%d %H.%M.%S UTC", time.gmtime())
        print(f"   POST {code} {resp[:200]}")
        if code != "200":
            print("   NOT SENT per the API. Pull the thread before any retry, a failed answer can still land.")
            continue
        plan.pop(cid, None)
        act, copies = None, 0
        for _ in range(8):
            time.sleep(5)
            after = pull_thread(cid, args.raw)
            same = [a for a in after if body(a) == msg]
            copies = sum(1 for a in after if body(a).strip() == msg.strip())
            if same:
                act = same[-1]["_id"]
                break
        if not act or copies != 1:
            print(f"   CHECK FAILED, {copies} copies found after sending, exact match {'yes' if act else 'no'}. "
                  "Pull the thread by hand now.")
            continue
        print(f"   SENT {act}, one copy, identical text, thread {len(after)} items")
        line = (f"{sent_at}  {act}  {cid}, {label}, {u16(msg)} chars, on Raka's \"{args.approval}\". Sent through the "
                f"API by tools/lemlist.py. Thread {len(items)} items before, unchanged since the dry run, control "
                f"{len(ctl)} items. Text copied from {args.file} (sha256 {sha}), one copy after, identical.\n")
        with open(f"state/send_log_{time.strftime('%Y-%m-%d', time.gmtime())}.txt", "a", encoding="utf8") as f:
            f.write(line)
        time.sleep(args.gap)
    with open(PLAN, "w") as f:
        json.dump(plan, f)


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
    sub.add_parser("audit", help="every accepted contact in every campaign, thread pulled and sorted by the rules")
    s = sub.add_parser("send", help="dry run by default. --go sends, only on Raka's word, quoted in --approval")
    s.add_argument("--file", required=True, help="the drafts file the text is copied from")
    s.add_argument("--label", help="the label line above the block, when a section has more than one")
    s.add_argument("--go", action="store_true", help="actually send. Needs a dry run of the same text first")
    s.add_argument("--approval", help="Raka's exact words approving this send, written to the send log")
    s.add_argument("--gap", type=int, default=10, help="seconds between sends")
    s.add_argument("contacts", nargs="+")
    args = ap.parse_args()
    if args.cmd == "send" and args.go and not args.approval:
        sys.exit("REFUSED, --go needs --approval with Raka's exact words")
    {"thread": cmd_thread, "accepts": cmd_accepts, "inbox": cmd_inbox, "get": cmd_get,
     "audit": cmd_audit, "send": cmd_send}[args.cmd](args)


if __name__ == "__main__":
    main()
