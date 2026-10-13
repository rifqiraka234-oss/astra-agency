"""Classify every message in the audit threads by shape, and every reply by what it said.

Reads raw_*.jsonl from the audit dir given as argv[1], writes msgs.jsonl (one row per OUT
message sent in the window, with whether and how it was answered) and prints summaries.
"""
import collections
import glob
import json
import re
import sys

AUD = sys.argv[1]
WIN_FROM = "2026-10-05"
WIN_TO = "2026-10-14"

rows = {}
for f in sorted(glob.glob(AUD + "/raw_*.jsonl")):
    for line in open(f):
        r = json.loads(line)
        prev = rows.get(r["contactId"])
        # keep the fuller copy if a contact shows up in two slices
        if prev is None or len(r.get("msgs", [])) > len(prev.get("msgs", [])):
            r["_src"] = f.rsplit("/", 1)[1]
            rows[r["contactId"]] = r

URL = re.compile(r"https?://\S+")


def shape(text, prev_dir, prev_out_count, had_in_before):
    t = text.strip()
    if "saw your business and thought it was cool" in t:
        return "connect_note"
    if t.startswith("Something I've been thinking about"):
        return "warm_sketch"
    if re.match(r"^Hi [^,]+, .+ looks cool!", t):
        return "sketch"
    if re.fullmatch(r"👀 [^,]+, have you seen this\?", t):
        return "plain_bump"
    if prev_dir == "IN":
        if URL.search(t) and ("netlify" in t or "astraagency" in t):
            return "delivery_in_reply"
        return "reply"
    if URL.search(t) and ("netlify" in t or "astraagency" in t):
        return "delivery"
    if t.startswith("👀"):
        return "researched_nudge"
    if re.match(r"^Hi [^,]+, saw .+, looks interesting", t):
        return "template_opener"
    if prev_out_count <= 1 and not had_in_before:
        return "other_first_pitch"
    return "other_followup"


out_rows = []
for cid, r in rows.items():
    msgs = sorted(r.get("msgs", []), key=lambda m: m["at"])
    prev_dir = None
    outs = 0
    had_in = False
    for i, m in enumerate(msgs):
        if m["dir"] == "OUT":
            outs += 1
            s = shape(m["text"], prev_dir, outs - 1, had_in)
            # what came back before our next OUT
            answer = None
            for n in msgs[i + 1:]:
                if n["dir"] == "OUT":
                    break
                answer = n
                break
            out_rows.append({
                "contactId": cid, "name": r["name"], "campaignIds": r.get("campaignIds", []),
                "at": m["at"], "shape": s, "text": m["text"],
                "answered": answer is not None,
                "answerAt": answer["at"] if answer else None,
                "answerText": answer["text"] if answer else None,
                "inWindow": WIN_FROM <= m["at"][:10] < WIN_TO,
            })
        else:
            had_in = True
        prev_dir = m["dir"]

json.dump(out_rows, open(AUD + "/../audit_an/msgs.json", "w"), ensure_ascii=False, indent=1)

print("contacts", len(rows), "out msgs", len(out_rows))
c = collections.defaultdict(lambda: [0, 0])
for o in out_rows:
    if o["inWindow"]:
        c[o["shape"]][0] += 1
        c[o["shape"]][1] += o["answered"]
for k, (n, a) in sorted(c.items(), key=lambda x: -x[1][0]):
    print(f"{k:22s} sent {n:4d} answered {a:3d}")
