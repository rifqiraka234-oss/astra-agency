#!/usr/bin/env python3
"""Counts the opener A/B test (docs/experiments/2026-10-26-opener-ab.md) from lemlist, not from our notes.

    python3 tools/ab-count.py                 # every test draft, its thread, and the totals per arm
    python3 tools/ab-count.py --since 2026-11-02

What it does.
1. Reads every fenced first message in state/drafted_*.md dated 2026-10-26 or later whose gate carries
   a `variant:` line. Shape, gate and contactId come from tools/check-drafts.py, so both tools read a
   draft file the same way.
2. Pulls the control thread, then each lead's whole thread with tools/lemlist.py's pull_thread.
3. Counts a draft as SENT only when a message in the thread matches its text. A draft that never went
   out is left out of both arms, and listed so it can be checked.
4. Prints every reply that came within 7 days of the opener, so a person labels it. A reply is never
   counted as a yes by a regex. Labels go in state/ab_2026-10-26_labels.jsonl, one row per contact,
   {"contactId": "ctc_...", "label": "yes|no|neutral", "correction": false, "hostile": false, "note": "..."}.
   Unlabelled replies are printed as UNLABELLED and the totals say how many are open.

Reads only. It never sends.
"""

import argparse
import importlib.util
import json
import os
import re
import sys
import tempfile
import time
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
START = "2026-10-26"
LABELS = os.path.join(ROOT, "state", "ab_2026-10-26_labels.jsonl")
WINDOW = 7 * 86400


def load(name, file):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, file))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def flat(s):
    return " ".join(s.split())


def epoch(iso):
    return datetime.fromisoformat(iso.replace("Z", "+00:00")).timestamp()


def test_drafts(cd, since):
    out = []
    d = os.path.join(ROOT, "state")
    for name in sorted(os.listdir(d)):
        m = re.match(r"drafted_(\d{4}-\d{2}-\d{2}).*\.md$", name)
        if not m or m.group(1) < since:
            continue
        # A sent file carries GATE ARCHIVED, and check-drafts skips archived files, so the reading
        # is done on a copy with the markers taken out. Same parser, so both tools agree.
        src = open(os.path.join(d, name), encoding="utf-8").read()
        with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8") as tf:
            tf.write(src.replace("GATE ARCHIVED", "gate archived").replace("NO DRAFTS", "no drafts"))
        try:
            pairs, cids = cd.blocks_of(tf.name), cd.addressees_of(tf.name)
        finally:
            os.unlink(tf.name)
        for i, (msg, shape, gate, _) in enumerate(pairs):
            v = re.search(r"^variant:\s*([AB])\b", gate or "", re.M)
            if shape in ("SKETCH", "SKETCHB") and v:
                out.append({"file": name, "cid": cids[i] if i < len(cids) else None,
                            "variant": v.group(1), "shape": shape, "text": msg})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", default=START)
    ap.add_argument("--raw", default="/tmp/lemlist-raw")
    args = ap.parse_args()

    cd = load("check_drafts", "check-drafts.py")
    ll = load("lemlist_tool", "lemlist.py")
    drafts = test_drafts(cd, args.since)
    if not drafts:
        print(f"No test drafts dated {args.since} or later with a 'variant:' gate line yet.")
        return 0

    ctl = ll.pull_thread(ll.CONTROL, args.raw)
    if len(ctl) < ll.CONTROL_MIN:
        sys.exit(f"CONTROL FAILED, {ll.CONTROL} returned {len(ctl)} items. Every result is void.")
    print(f"control {ll.CONTROL} {len(ctl)} items, ok\n")

    labels = {}
    if os.path.exists(LABELS):
        for line in open(LABELS, encoding="utf-8"):
            if line.strip():
                row = json.loads(line)
                labels[row["contactId"]] = row

    now = time.time()
    seen, arms, unsent = set(), {"A": [], "B": []}, []
    for d in drafts:
        if d["cid"] in seen or not d["cid"]:
            continue
        items = ll.pull_thread(d["cid"], args.raw)
        sent = [a for a in items if a["type"] == "linkedinSent" and flat(ll.body(a)) == flat(d["text"])]
        if not sent:
            unsent.append(d)
            continue
        seen.add(d["cid"])
        t0 = epoch(sent[0]["createdAt"])
        replies = [a for a in items if a["type"] == "linkedinReplied" and t0 < epoch(a["createdAt"]) <= t0 + WINDOW]
        later_us = [a for a in items if a["type"] == "linkedinSent" and epoch(a["createdAt"]) > t0]
        arms[d["variant"]].append({**d, "sentAt": sent[0]["createdAt"], "open": now - t0 < WINDOW,
                                   "replies": replies, "bumped": any("👀" in ll.body(a) for a in later_us),
                                   "label": labels.get(d["cid"])})

    for v in ("A", "B"):
        rows = arms[v]
        print(f"== Variant {v}, {'SKETCH' if v == 'A' else 'SKETCHB'}, {len(rows)} sent")
        for r in rows:
            lab = r["label"]["label"] if r["label"] else ("UNLABELLED" if r["replies"] else "no reply")
            print(f"  {r['cid']}  sent {r['sentAt'][:16]}  {'window open' if r['open'] else 'window closed'}"
                  f"{', bumped' if r['bumped'] else ''}  {lab}  ({r['file']})")
            for a in r["replies"]:
                print(f"      THEM {a['createdAt'][:16]}  {flat(ll.body(a))[:160]}")
        closed = [r for r in rows if not r["open"]]
        lab = [r["label"] for r in closed if r["label"]]
        print(f"  window closed {len(closed)}, replied {sum(1 for r in closed if r['replies'])}, "
              f"yes {sum(1 for x in lab if x['label'] == 'yes')}, "
              f"corrected us {sum(1 for x in lab if x.get('correction'))}, "
              f"hostile {sum(1 for x in lab if x.get('hostile'))}, "
              f"unlabelled replies {sum(1 for r in closed if r['replies'] and not r['label'])}\n")

    if unsent:
        print("Drafted for the test but no matching message in the thread, so in neither arm:")
        for d in unsent:
            print(f"  {d['cid']}  variant {d['variant']}  ({d['file']})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
