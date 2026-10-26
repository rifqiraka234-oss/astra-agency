#!/usr/bin/env python3
"""Mechanical gate on a batch of drafts. Run it before anything is shown to Raka.

    python3 tools/check-drafts.py state/drafted_YYYY-MM-DD-*.md

It reads every fenced code block in the file as one message and fails the batch on
anything that can be checked by machine. It exits non zero when the batch fails, so it
can never be "run" and quietly ignored.

What it does NOT do, and cannot. It does not judge whether a claim is true, whether the
credential fits the offer, or whether block one reacts rather than interprets. Those are
passes 1, 2 and 3 of the read back and they stay human. This tool only guarantees that a
batch never fails on something a script could have caught, which is what kept happening.

Two markers turn the gate off for a file, and both belong at the top.
  <!-- GATE ARCHIVED -->  already sent, or superseded and never sent. History, not a batch.
  <!-- NO DRAFTS -->      research that reached a verdict on every lead, nothing to send.

Tag every draft with its shape in the heading above its fenced block, one of OPENER,
REPLY, NUDGE, CLOSER, BOOKING, DELIVERY or CORRECTION. Untagged is treated as OPENER, and
the five block, one exclamation, 95 to 170 word rules are the OPENER'S ALONE. The
--replies flag relaxes the whole file the same way and is the blunt version of tagging.
First messages are SKETCH, or SKETCHB for half of all leads from 2026-10-26, the opener A/B
test. The contactId picks which one, see variant_for() and docs/experiments/2026-10-26-opener-ab.md.
The tag has to sit within twelve lines above the fence and nothing starting with # or **
may sit between the two, so the safest place is the line directly above it.

Every draft's contact is looked up in state/silent_accepted_queue.jsonl, and a draft to
anyone whose latest row is DO_NOT_CONTACT, CLOSED_PROMISED_LAST or another never again
status fails the batch. The contactId is read from the ## or ### heading above the block.

Add LANG NL (or any two letter code) on that same tag line when the thread is in that
language and stays in it. It turns off the English contraction tell and nothing else, so
the dash, colon, banned word and truth rules all still run.

Every rule below exists because a real batch broke it. The comment says which.
"""

import re
import sys
from collections import Counter

# Raka's live corrections, hard bans. See CLAUDE.md.
BANNED_PHRASES = [
    "a proper", "that is a real", "which tells you", "and that says a lot about",
    "which is exactly what a", "naming it after",          # the cringe-interpretation greps
    "just following up", "circle back", "touch base", "reach out",
    "you're absolutely right", "good catch", "honestly,",
    "i hope this finds you", "i wanted to reach", "quick question",
    # Fake-personal reaction phrases, writing-standard-anti-ai.md (Raka 2026-09-04). A red team
    # caught "caught my eye" in a nudge on 2026-10-06 that this gate had passed.
    "caught my eye", "stuck in my head", "stuck with me", "couldn't stop thinking about",
    "been on my mind",
]
# Structures that give AI writing away. docs/writing-standard-anti-ai.md.
BANNED_STRUCTURES = [
    (r"\bnot only\b.{0,40}\bbut also\b", "not only X but also Y"),
    (r"\bit'?s not (just )?about\b.{0,30}\bit'?s about\b", "not X but Y"),
    (r"\bin today'?s\b", "in today's ... world"),
    (r"\bleverage\b|\butilize\b|\bsynerg", "corporate fog"),
    (r"\bdelve\b|\btapestry\b|\bnavigat(e|ing) the\b", "AI tell word"),
    # Clues drive the inference, they never appear in the message. opener-template.md 3A.
    (r"\byou'?re (currently )?hiring\b|\bjob (opening|post|ad|listing)s?\b|\bvacanc|"
     r"\bvacature|\bstellenangebot|\bcongrat", "quoted clue, state the consequence instead"),
    (r"\bi (saw|noticed|read|see) (that )?(you|your) (posted|post|newsletter|announce|"
     r"recently|just)", "quoted clue, state the consequence instead"),
]


SHAPES = ("OPENER", "SKETCH", "SKETCHB", "REPLY", "NUDGE", "CLOSER", "CLOSE", "BOOKING", "DELIVERY",
          "CORRECTION", "CHAT")
# CHAT, Raka 2026-10-14, "non icp so just a light chat of what theyre up to". A short friendly
# first message to someone we won't pitch, asking what they're working on. No gate, no pitch,
# the writing bans still apply.
# SKETCH, Raka's test opener, 2026-10-12, "hi, so this looks cool. However, your website is this.
# I suggest to do this. We make websites for blah blah. Shall I send you a sketch of how it looks
# like?" Five blocks, a full research gate like any opener, its own wording checks below.
# SKETCHB, variant B of the opener A/B test, Raka 2026-10-25, "lets try". The summer opening
# (thanks for connecting, one line that shows we understood the business) in front of SKETCH's
# gap and "I'd suggest", no brand line, a short ask. docs/experiments/2026-10-26-opener-ab.md.
# Which lead gets which is decided by the contactId, never by hand, see variant_for().
# Shapes whose length, block count and exclamation rules are NOT the cold opener's.
# The opener template is five blocks (since 2026-09-24) with exactly one exclamation. Nothing else is.
RELAXED = {"REPLY", "NUDGE", "CLOSER", "CLOSE", "BOOKING", "DELIVERY", "CORRECTION", "CHAT"}
# A correction retracts a claim, so it has to be able to quote the thing it is retracting.
EXEMPT_MONEY = {"CORRECTION"}


def fences(src):
    """Line based fence parser. Yields (info, body, start_offset). A bare ``` fence is a
    message. A ```gate fence is a research gate. A regex over ``` pairs mistook the closing
    fence of one block for the opening of the next, so fences are walked line by line."""
    lines = src.split("\n")
    pos, i = 0, 0
    offs = []
    for ln in lines:
        offs.append(pos)
        pos += len(ln) + 1
    while i < len(lines):
        m = re.match(r"^```(\w*)\s*$", lines[i])
        if m:
            info, j = m.group(1), i + 1
            while j < len(lines) and lines[j].strip() != "```":
                j += 1
            yield info, "\n".join(lines[i + 1:j]), offs[i]
            i = j + 1
        else:
            i += 1


def blocks_of(path):
    """Return (message, shape, gate, lang) per message block. The shape is read from the nearest
    heading or bold line above the block, because a reply forced into opener rules is
    how good drafts got mangled all through 2026-09-22. Untagged means OPENER and the
    caller is told how to tag it. The gate is the nearest ```gate block above the message
    and after the previous message, or None."""
    src = open(path, encoding="utf-8").read()
    if "GATE ARCHIVED" in src or "NO DRAFTS" in src:
        return []
    out, gate = [], None
    for info, body, start in fences(src):
        if info == "gate":
            gate = body
            continue
        if info:
            continue
        head = src[:start].rstrip().split("\n")
        shape = None
        # LANG NL on the tag line means the thread is Dutch and stays Dutch, so the
        # English contraction tell does not apply. Everything else still does.
        lang = "EN"
        window = [l for l in head[-12:] if l.strip()]
        for line in reversed(window):
            m = re.search(r"\bLANG ([A-Z]{2})\b", line)
            if m:
                lang = m.group(1)
                break
            if line.lstrip().startswith("#"):
                break
        for line in reversed(head[-12:]):
            if not line.strip():
                continue
            hit = [sh for sh in SHAPES if re.search(rf"\b{sh}\b", line)]
            if hit:
                shape = hit[0]
                break
            if line.lstrip().startswith("#") or line.strip().startswith("**"):
                break
        out.append((body, shape, gate, lang))
        gate = None
    return out


# Never contact again. Raka, 2026-10-03, six names in one message, "close never contact
# again". A row in the queue is only a note, and notes get lost across a context reset,
# so any draft addressed to a contact whose LATEST queue row carries one of these statuses
# fails the batch. A reply from them later is lifted by appending a newer row, never by
# deleting the old one.
NEVER_AGAIN = {"DO_NOT_CONTACT", "CLOSED_DO_NOT_CONTACT", "CLOSED_NO_FURTHER_CONTACT",
               "CLOSED_PROMISED_LAST", "CLOSED_FINAL_MESSAGE", "CLOSED"}


def variant_for(cid):
    """The opener A/B test arm for a contact, A (SKETCH) or B (SKETCHB). Decided by a hash of the
    contactId so it can't be chosen by hand and any session gets the same answer."""
    import hashlib
    if not cid:
        return None
    return "B" if int(hashlib.sha256(cid.encode()).hexdigest(), 16) % 2 else "A"


def addressees_of(path):
    """The contactId each message block is addressed to, in the same order as blocks_of.
    Read from the nearest ## or ### heading above the block, which is where every draft
    file names its contact. None when the section names nobody."""
    src = open(path, encoding="utf-8").read()
    if "GATE ARCHIVED" in src or "NO DRAFTS" in src:
        return []
    out = []
    for info, body, start in fences(src):
        if info:
            continue
        cid = None
        for line in reversed(src[:start].split("\n")):
            ids = re.findall(r"ctc_[A-Za-z0-9]{17}", line)
            if ids and cid is None:
                cid = ids[0]
            if re.match(r"^#{2,3} ", line):
                break
        out.append(cid)
    return out


def never_again_statuses():
    """Latest queue status per contactId. The queue is append only, last row wins."""
    import json
    import os
    q = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "state",
                     "silent_accepted_queue.jsonl")
    latest = {}
    if not os.path.exists(q):
        return latest
    for line in open(q, encoding="utf-8"):
        try:
            row = json.loads(line)
        except ValueError:
            continue
        if row.get("contactId"):
            latest[row["contactId"]] = (row.get("status"), row.get("name"))
    return latest


# THE RESEARCH GATE. Raka, 2026-09-24, every item "mandatory". RULES.md section 4B.
GATE_KEYS = ["lead", "site pass 1", "site pass 2", "deep analysis", "owner linkedin",
             "contact linkedin", "google news", "regional news", "industry news", "sources",
             "pains", "chosen", "claims", "recheck",
             # THE ANGLE SWEEP. Raka, 2026-09-25, "did we test on all of them? This is
             # mandatory". Every lead is tested on all four families, not only the website.
             "sweep website", "sweep gdpr", "sweep apps", "sweep social", "sweep squad",
             # THE ONE THREAD GATE. Raka, 2026-09-25, on Dan Kavanagh, "how does the website,
             # then suddenly go to the build squad?" Block two named a site flaw, block five
             # offered developers. Problem, cost and offer have to be one thing.
             "thread", "lead read"]
SWEEP_FAMILIES = ["website", "gdpr", "apps", "social", "squad"]
SWEEP_KEYS = ["lead"] + SWEEP_FAMILIES + ["verdict"]
VERDICTS = ["OPENER", "NO_STRONG_ANGLE", "BLOCKED_NEEDS_INFO", "DO_NOT_CONTACT", "ALREADY_MESSAGED"]


def family_thin(text):
    """A family line that says nothing. Twelve words and a source, a URL, a register or a
    control, or it was not tested, it was waved at."""
    return len(text.split()) < 12 or not re.search(
        r"https?://|control|register|screenshot|crawl|HTML|news\.py|thread|site-audit|social-audit|lemlist",
        text, re.I)


# RULES 0E, 2026-10-12. Fixes a freelancer does for 50 euros. Never the angle of an opener.
SMALL_FIX = re.compile(
    r"\b(cookies?|cookie banner|consent|gdpr|dsgvo|rgpd|compliant|compliance|opt ?ins?|"
    r"privacy (policy|notice)|impressum|mentions l[ée]gales|typos?|dropdown|broken link)\b", re.I)

SOCIAL_OPENED = re.compile(r"social-audit|no social (account )?linked|links to no social|nothing to test|no domain", re.I)


def sweep_problems(body, social_rule=False):
    """One ```sweep block, the four family verdict for a lead that gets no opener.
    social_rule, Raka 2026-09-28, "make sure you always check all angles". From that date the
    social line has to show the accounts were OPENED with tools/social-audit.js, not listed."""
    probs, kv, cur = [], {}, None
    for ln in body.split("\n"):
        m = re.match(r"^([a-z][a-z ]+):\s*(.*)$", ln.strip(), re.I)
        if m and m.group(1).lower() in SWEEP_KEYS:
            cur = m.group(1).lower()
            kv[cur] = m.group(2).strip()
        elif cur:
            kv[cur] = (kv[cur] + " " + ln.strip()).strip()
    name = kv.get("lead", "?")[:40]
    for k in SWEEP_KEYS:
        if not kv.get(k):
            probs.append(f"sweep '{name}', field '{k}' missing")
    for f in SWEEP_FAMILIES:
        if kv.get(f) and family_thin(kv[f]):
            probs.append(f"sweep '{name}', {f} is too thin, 12+ words and its evidence")
    if social_rule and kv.get("social") and not SOCIAL_OPENED.search(kv["social"]):
        probs.append(f"sweep '{name}', social must say the accounts were opened with tools/social-audit.js, "
                     "listing links is not checking them (Raka 2026-09-28)")
    if kv.get("verdict") and not any(kv["verdict"].startswith(v) for v in VERDICTS):
        probs.append(f"sweep '{name}', verdict must start with one of {VERDICTS}")
    return probs


def sweep_file_problems(src, path):
    """From 2026-09-25 on, every lead section headed NO_STRONG_ANGLE or BLOCKED carries a
    ```sweep block before the next section. Older files predate the rule."""
    m = re.search(r"(\d{4}-\d{2}-\d{2})", path.rsplit("/", 1)[-1])
    probs = []
    social_rule = bool(m and m.group(1) >= "2026-09-28")
    for info, body, _ in fences(src):
        if info == "sweep":
            probs += sweep_problems(body, social_rule)
    if not m or m.group(1) < "2026-09-25":
        return probs
    secs = re.split(r"\n(?=## )", src)
    for sec in secs:
        head = sec.split("\n", 1)[0]
        if head.startswith("## ") and re.search(r"NO_STRONG_ANGLE|BLOCKED", head) \
                and "```sweep" not in sec:
            probs.append(f"'{head[3:60]}' has no ```sweep block, all four families tested")
    return probs


def gate_problems(g):
    """What is missing or too thin in one research gate. Empty list means it passes."""
    if g is None:
        return ["no research gate. Every OPENER needs a ```gate block above it, "
                "RULES.md 4B lists the fields"]
    probs, kv, cur = [], {}, None
    for ln in g.split("\n"):
        m = re.match(r"^([a-z][a-z0-9 ]+):\s*(.*)$", ln.strip(), re.I)
        if m and m.group(1).lower() in GATE_KEYS:
            cur = m.group(1).lower()
            kv[cur] = m.group(2).strip()
        elif cur:
            kv[cur] = (kv[cur] + "\n" + ln.strip()).strip()
    for k in GATE_KEYS:
        if not kv.get(k):
            probs.append(f"gate field '{k}' missing or empty")
    # The page count opens the line. 2026-10-12, "PIX_PASS1 URLs" passed as a count of 1
    # because the old pattern took the first digit anywhere in the field.
    n1 = re.match(r"\s*(\d+)", kv.get("site pass 1", ""))
    n2 = re.match(r"\s*(\d+)", kv.get("site pass 2", ""))
    for k, n in (("site pass 1", n1), ("site pass 2", n2)):
        if kv.get(k) and not n:
            probs.append(f"{k} must open with the number of pages read, e.g. '33 URLs, tools/crawl.py ...'")
    if n1 and n2 and int(n2.group()) < int(n1.group()):
        probs.append(f"site pass 2 read {n2.group()} pages, pass 1 read {n1.group()}. "
                     "The second pass is the whole site again")
    urls = set(re.findall(r"https?://[^\s)>,]+", kv.get("sources", "")))
    domains = {re.sub(r"^www\.", "", u.split("/")[2].lower()) for u in urls}
    if len(urls) < 10:
        probs.append(f"{len(urls)} source URLs, the minimum is 10")
    if len(domains) < 6:
        probs.append(f"sources span {len(domains)} domains, the minimum is 6")
    if "google" not in kv.get("google news", "").lower() and "news.py" not in kv.get("google news", ""):
        probs.append("google news field must say the Google News search that was run")
    pn = re.search(r"\d+", kv.get("pains", ""))
    if not pn or int(pn.group()) < 3:
        probs.append("pains must say how many were judged, at least 3")
    if not re.search(r"\b(costliest|hottest|biggest)\b", kv.get("chosen", ""), re.I):
        probs.append("chosen must say why it wins, costliest, hottest or biggest")
    # Raka 2026-09-24, "the inference may not be 100% true but as long as the sources are
    # true". Every fact in the message is listed with the URL it rests on.
    cl = [l for l in kv.get("claims", "").split("\n") if l.strip()]
    if not cl or not all(re.search(r"https?://", l) for l in cl):
        probs.append("claims must list every fact in the message, each line with its source URL")
    if not re.search(r"confidence\s+(HIGH|MEDIUM)\b", kv.get("recheck", "")):
        probs.append("recheck must end in 'confidence HIGH' or 'confidence MEDIUM'. LOW does not send")
    return probs


def thread_problems(g, msg, shape=None):
    """The one thread gate. The gate carries
        thread: problem <what block two names> | cost <how block three grows it> |
                offer <what block five delivers> | link <word>, <word>
        lead read: the message read as the lead, block two then block five, in one sentence
    Every link word has to appear in block two AND in the offer, the proof sentence of block
    four or block five, matched on its first five letters. If the offer never touches the
    thing block two names, no honest link word exists and the draft fails."""
    if g is None:
        return []
    kv, cur = {}, None
    for ln in g.split("\n"):
        m = re.match(r"^([a-z][a-z0-9 ]+):\s*(.*)$", ln.strip(), re.I)
        if m and m.group(1).lower() in GATE_KEYS:
            cur = m.group(1).lower()
            kv[cur] = m.group(2).strip()
        elif cur:
            kv[cur] = (kv[cur] + " " + ln.strip()).strip()
    t = kv.get("thread", "")
    probs = []
    parts = {}
    for seg in t.split("|"):
        seg = seg.strip()
        m = re.match(r"^(problem|cost|offer|link)\s+(.*)$", seg, re.I)
        if m:
            parts[m.group(1).lower()] = m.group(2).strip()
    for k in ("problem", "cost", "offer", "link"):
        if len(parts.get(k, "").split()) < (1 if k == "link" else 3):
            probs.append(f"THREAD, '{k}' missing or thin. thread: problem ... | cost ... | offer ... | link word")
    if len(kv.get("lead read", "").split()) < 15:
        probs.append("THREAD, 'lead read' missing, read it as the lead in one sentence of 15+ words")
    B = [b.strip() for b in msg.split("\n\n")]
    if (len(B) >= 5 or (shape == "SKETCHB" and len(B) == 4)) and parts.get("link"):
        block2 = B[1].lower()
        if shape == "SKETCHB":
            proof = B[2].lower() + " " + B[3].lower()
        else:
            proof = (B[2].lower() + " " + B[4].lower()) if shape == "SKETCH" else \
                (B[3].split("Pertamina.")[-1].lower() + " " + B[4].lower())
        for w in [x.strip().lower() for x in parts["link"].split(",") if x.strip()]:
            stem = w[:5]
            if stem not in block2:
                probs.append(f"THREAD, link word '{w}' is not in block two")
            if stem not in proof:
                probs.append(f"THREAD, link word '{w}' is not in the offer, block four's proof or block five. "
                             "The offer has to fix the thing block two names")
    return probs


def check(path, replies=False):
    """replies=True relaxes the shape rules only. A reply to a two word thanks is not a
    four block opener and must not be forced into one, per the reply in context rule.
    Every truth and voice rule still applies, and so does the batch repetition check."""
    pairs = blocks_of(path)
    _src = open(path, encoding="utf-8").read() if __import__("os").path.exists(path) else ""
    if "GATE ARCHIVED" not in _src:
        sp = sweep_file_problems(_src, path)
        if sp:
            print(f"{path}\nFAIL  {len(sp)} angle sweep problem(s)")
            for x in sp:
                print("  " + x)
            return 1
    if not pairs:
        src = open(path, encoding="utf-8").read() if __import__("os").path.exists(path) else ""
        if "GATE ARCHIVED" in src:
            print(f"{path}  ARCHIVED, already sent or superseded, not re gated")
            return 0
        # A research file that reached a verdict on every lead has nothing to send, and
        # failing it every sweep is how a real failure gets lost in the noise.
        if "NO DRAFTS" in src:
            print(f"{path}  NO DRAFTS, verdicts only, nothing to gate")
            return 0
        print(f"FAIL  no fenced message blocks found in {path}")
        print("      If this file is verdicts only with nothing to send, put a")
        print("      <!-- NO DRAFTS --> marker at the top. If it is already sent, use")
        print("      <!-- GATE ARCHIVED -->. Do not leave it failing every sweep.")
        return 1
    msgs = [m for m, _, _, _ in pairs]
    shapes = [sh for _, sh, _, _ in pairs]
    gates = [g for _, _, g, _ in pairs]
    langs = [lg for _, _, _, lg in pairs]
    untagged = [i + 1 for i, sh in enumerate(shapes) if sh is None]
    fails = []

    def bad(i, why):
        fails.append(f"  draft {i+1}: {why}")

    latest = never_again_statuses()
    for i, cid in enumerate(addressees_of(path)):
        status, who = latest.get(cid, (None, None))
        if status in NEVER_AGAIN:
            bad(i, f"NEVER CONTACT AGAIN, {who or cid} is {status} in the queue. "
                   "Do not send. Only a newer queue row, after they write to us, lifts this")

    closings, credentials = [], []
    for i, m in enumerate(msgs):
        flat = " ".join(m.split())
        words = len(m.split())

        # 90 to 145 words is the template, floor lowered 2026-09-22 when block one
        # became the plain shape. 150 is the roast register ceiling.
        relaxed = replies or shapes[i] in RELAXED
        if not relaxed:
            for gp in gate_problems(gates[i]):
                bad(i, f"RESEARCH GATE, {gp}")
            # Raka 2026-09-28, every angle checked for real. The social line in an OPENER's gate
            # has to show the accounts were opened with tools/social-audit.js.
            dm = re.search(r"(\d{4}-\d{2}-\d{2})", path.rsplit("/", 1)[-1])
            sl = re.search(r"^sweep social:(.*)$", gates[i] or "", re.M)
            if dm and dm.group(1) >= "2026-09-28" and sl and not SOCIAL_OPENED.search(sl.group(1)):
                bad(i, "RESEARCH GATE, sweep social must say the accounts were opened with tools/social-audit.js")
            for tp in thread_problems(gates[i], m, shapes[i]):
                bad(i, tp)
            # Raka 2026-10-12, "scrap these like compliant or gdpr fixes. theyre tiny fixes and
            # someone can do it like for 50 bucks. we gotta analyse things that are worth 2500
            # euros at least". RULES.md 0E. From that date every opener names a project worth
            # 2,500 euros or more in its gate, and no message pitches a compliance fix.
            if dm and dm.group(1) >= "2026-10-12":
                wl = re.search(r"^worth:(.*)$", gates[i] or "", re.M)
                amts = [int(re.sub(r"[.,]", "", a)) for a in
                        re.findall(r"(?:€|EUR|euros?)\s?(\d[\d.,]*)", wl.group(1) if wl else "", re.I)]
                if not amts or max(amts) < 2500:
                    bad(i, "RESEARCH GATE, worth must name the project and a figure of €2,500 or more, "
                           "e.g. 'worth: €4,000+, ...'. Under that it's a task, not an angle (RULES 0E)")
                hit = SMALL_FIX.search(flat) or re.search(r"\bAVG\b", flat)
                if hit:
                    bad(i, f"pitches a small fix, '{hit.group(0)}'. Compliance, GDPR and one line fixes "
                           "are never the angle, find the 2,500 euro problem behind it (RULES 0E)")
            # Week one audit, 2026-10-13. Four of the five no's with a reason answered a gap that was
            # deliberate, not theirs, or on a site just paid for (Ramona, Steven Prins, Debby, Josh).
            # RULES.md 0F. From 14 Oct every opener writes the owner's likely no and what rules it out,
            # and the first message is the SKETCH shape (Raka, "lets continue using the id suggest").
            if dm and dm.group(1) >= "2026-10-14" and shapes[i] in ("OPENER", "SKETCH", "SKETCHB"):
                if shapes[i] == "OPENER":
                    bad(i, "the first message is the SKETCH shape from 2026-10-14, 'I'd suggest ...' and "
                           "'Shall I send you a sketch of ...?' (docs/opener-template.md)")
                ol = re.search(r"^owner reply:(.*)$", gates[i] or "", re.M)
                parts = [p.strip() for p in ol.group(1).split("|")] if ol else []
                if len(parts) != 3 or not all(len(p.split()) >= 2 for p in parts):
                    bad(i, "RESEARCH GATE, owner reply must be 'owner reply: <their likely no, in their "
                           "words> | <the trap> | <the evidence that rules it out, with its URL>' (RULES 0F)")
                elif not re.search(r"https?://", parts[2]):
                    bad(i, "RESEARCH GATE, owner reply evidence needs the URL it rests on (RULES 0F)")
                elif re.search(r"can'?t rule|cannot rule|unknown|unclear|not checked", parts[2], re.I):
                    bad(i, "RESEARCH GATE, owner reply, a trap that can't be ruled out means this gap "
                           "isn't the angle. Take the next pain or NO_STRONG_ANGLE (RULES 0F)")
        # The GTM review, 2026-10-25, RULES 0G point 1. Craig had resigned and Clément had left, and
        # Clément's gate rested on lemlist's copy of his profile. The role is confirmed outside lemlist.
        if not relaxed and dm and dm.group(1) >= "2026-10-26" and shapes[i] in ("OPENER", "SKETCH", "SKETCHB"):
            st = re.search(r"^still there:(.*)$", gates[i] or "", re.M)
            urls = re.findall(r"https?://\S+", st.group(1)) if st else []
            if not st or len(st.group(1).split()) < 4:
                bad(i, "RESEARCH GATE, add 'still there: <their role, where it says so, date read> | <URL that "
                       "isn't lemlist>' (RULES 0G point 1)")
            elif not [u for u in urls if "lemlist" not in u]:
                bad(i, "RESEARCH GATE, still there needs a URL outside lemlist, the company's own page, the "
                       "register or a recent post of theirs (RULES 0G point 1)")
        # The GTM plan, 2026-10-25, section 1. Every lost proposal stopped on budget, so a first message names
        # one sign the company can pay (staff, a raise, an agency or paid tools, job ads, company customers).
        if not relaxed and dm and dm.group(1) >= "2026-10-26" and shapes[i] in ("OPENER", "SKETCH", "SKETCHB"):
            bl = re.search(r"^budget:(.*)$", gates[i] or "", re.M)
            if not bl or len(bl.group(1).split()) < 3 or not re.search(r"https?://", bl.group(1)):
                bad(i, "RESEARCH GATE, add 'budget: <one sign they can pay, staff, a raise, an agency or paid tools, "
                       "job ads, company customers> | <URL>' (docs/gtm-plan.md section 1)")
        # Both arms of the opener A/B test are out of the old five block template's reach.
        sketch = shapes[i] in ("SKETCH", "SKETCHB")
        # The opener A/B test from 2026-10-26, dropped 25 Oct and back on 26 Oct (Raka, "I THOUGHT WE'RE
        # GOING TO DO like an ab test"). The contactId decides the variant, so nobody picks the leads that
        # look most likely to say yes for the version they prefer.
        if not relaxed and dm and dm.group(1) >= "2026-10-26" and shapes[i] in ("SKETCH", "SKETCHB"):
            cids = addressees_of(path)
            cid = cids[i] if i < len(cids) else None
            first_block = (m.split("\n\n") or [""])[0]
            in_test = shapes[i] == "SKETCHB" or (
                not first_block.startswith("Something I've been thinking about") and
                "However, did you know that " not in m)
            if in_test:
                want = variant_for(cid)
                got = "B" if shapes[i] == "SKETCHB" else "A"
                vl = re.search(r"^variant:\s*([AB])\b", gates[i] or "", re.M)
                if cid is None:
                    bad(i, "A/B test, no contactId in the heading above this draft, so its variant can't be checked")
                elif want != got:
                    bad(i, f"A/B test, {cid} is assigned to variant {want} by its contactId, this draft is {got}. "
                           f"Write it as {'SKETCHB' if want == 'B' else 'SKETCH'} (docs/experiments/2026-10-26-opener-ab.md)")
                if not vl or vl.group(1) != got:
                    bad(i, f"RESEARCH GATE, add 'variant: {got}' so the result can be counted")
        if relaxed:
            pass
        elif shapes[i] == "SKETCHB":
            if not 45 <= words <= 95:
                bad(i, f"{words} words, SKETCHB shape, outside 45 to 95")
            S = [" ".join(b.split()) for b in m.split("\n\n")]
            if len(S) != 4:
                bad(i, f"{len(S)} blocks, SKETCHB is 4, thanks and understanding, however, I'd suggest, the ask")
            else:
                if not re.match(r"Hi [^,]+, thanks for connecting\. \S", S[0]):
                    bad(i, "SKETCHB block one must be 'Hi [name], thanks for connecting. [one line that shows we "
                           "understood what they do]'")
                elif len(S[0].split(". ", 1)[1].split()) > 30:
                    bad(i, "SKETCHB block one's understanding line is over 30 words, keep it to one sentence")
                if re.search(r"looks (cool|interesting)", S[0], re.I):
                    bad(i, "SKETCHB block one never says 'looks cool' or 'looks interesting', it shows what they do")
                ul = re.search(r"^understood:(.*)$", gates[i] or "", re.M)
                if not ul or not re.search(r"https?://", ul.group(1)):
                    bad(i, "RESEARCH GATE, SKETCHB needs 'understood: <what they do, in their own words> | <URL>' "
                           "behind the line in block one")
                if not S[1].startswith("However"):
                    bad(i, "SKETCHB block two must open 'However ...', the gap and what it likely costs them")
                for k, sent in enumerate(re.split(r"(?<=[.!?]) (?=[A-Z])", S[1])):
                    if len(sent.split()) > 30:
                        bad(i, f"SKETCHB block two sentence {k+1} is {len(sent.split())} words, cap 30")
                if not S[2].startswith("I'd suggest "):
                    bad(i, "SKETCHB block three must open 'I'd suggest ...'")
                if not re.fullmatch(r"Shall I send you a sketch( of .+)?\?", S[3]) or len(S[3].split()) > 14:
                    bad(i, "SKETCHB block four must be 'Shall I send you a sketch?' or '... a sketch of [thing]?', "
                           "14 words max")
                if "Unilever" in m:
                    bad(i, "SKETCHB carries no brand line, that's one of the things the test changes")
        elif shapes[i] == "SKETCH":
            # The test shape is short by design. Raka's spoken version runs about 50 to 70 words.
            if not 45 <= words <= 115:
                bad(i, f"{words} words, SKETCH shape, outside 45 to 115")
            S = [" ".join(b.split()) for b in m.split("\n\n")]
            if len(S) != 5:
                bad(i, f"{len(S)} blocks, SKETCH is 5, hi, however, suggest, we make, sketch")
            else:
                # The warm variant, Raka 2026-10-13, "redo them in the opener format, like
                # 'something i've been thinking [name]'". For a chat where they answered our
                # connect note and went quiet, block one is "Something I've been thinking about,
                # [name]!" and block two opens "Your ..." because there's no praise to turn from.
                warm = bool(re.fullmatch(r"Something I've been thinking about, [^,!]+!", S[0]))
                if not warm and not re.fullmatch(r"Hi [^,]+, .+ looks cool!", S[0]):
                    bad(i, "SKETCH block one must be 'Hi [name], [company] looks cool!' "
                           "or, in a warm chat, 'Something I've been thinking about, [name]!'")
                # The AI workflow variant, Raka 2026-10-22, "for ai workflows suggestion we can use
                # this template ... However, did you know that [her normalised job title] faces
                # [shortcomings]". Block two names a shortcoming of their ROLE, so the fact has to be
                # real and sourced, a 'did you know:' gate line with its URL, and the offer has to
                # be an AI workflow.
                dyk = S[1].startswith("However, did you know that ")
                if dyk:
                    if "AI workflow" not in S[2] + " " + S[3]:
                        bad(i, "the 'However, did you know that' shape is for AI workflow offers, "
                               "block three or four must say AI workflow")
                    dl = re.search(r"^did you know:(.*)$", gates[i] or "", re.M)
                    if not dl or not re.search(r"https?://", dl.group(1)):
                        bad(i, "RESEARCH GATE, a 'did you know' block two needs 'did you know: <the role "
                               "fact> | <source and date> | <URL>' in the gate, the fact must be sourced")
                if warm and not S[1].startswith("Your "):
                    bad(i, "warm SKETCH block two must open 'Your [website or social media] ...'")
                elif not warm and not dyk and not S[1].startswith("However, your "):
                    bad(i, "SKETCH block two must open 'However, your [website or social media] ...' "
                           "or, for an AI workflow, 'However, did you know that ...'")
                for k, sent in enumerate(re.split(r"(?<=[.!?]) (?=[A-Z])", S[1])):
                    if len(sent.split()) > 30:
                        bad(i, f"SKETCH block two sentence {k+1} is {len(sent.split())} words, cap 30")
                if not re.match(r"I'd suggest ", S[2]):
                    bad(i, "SKETCH block three must open 'I'd suggest ...'")
                if "for brands like Unilever, AXA, Pertamina." not in S[3]:
                    bad(i, "SKETCH block four must carry 'for brands like Unilever, AXA, Pertamina.'")
                if not re.fullmatch(r"Shall I send you a sketch of .+\?", S[4]):
                    bad(i, "SKETCH block five must be 'Shall I send you a sketch of [thing]?'")
                elif len(S[4].split()) > 16:
                    bad(i, f"SKETCH block five is {len(S[4].split())} words, cap 16")
        elif (m.split("\n\n")[1:2] or [""])[0].strip().startswith("I couldn't find your website"):
            # The no website variant drops a sentence from block two, so its floor is lower.
            if not 70 <= words <= 150:
                bad(i, f"{words} words, no website variant, outside 70 to 150")
        elif not 95 <= words <= 170:
            # 2026-09-24, Raka added the "Especially, when you are" block and shortened
            # block five to "Shall I send you over what the [thing] looks like?".
            bad(i, f"{words} words, outside 95 to 170")
        # MONEY. Raka scrapped the general numbers rule on 2026-09-22, after we told the
        # CEO of Hounds for Heroes what her own accounts meant and got it wrong. A figure
        # is allowed ONLY when it quantifies what the lead is forgoing, losing or being
        # hurt by. Never as context, never as scene setting, and never off filed accounts.
        money = re.findall(r"[\u00a3\u20ac$]\s?[\d,]+(?:\.\d+)?", m)
        if money and shapes[i] not in EXEMPT_MONEY:
            src = open(path, encoding="utf-8").read()
            if "LOSS FIGURE" not in src:
                bad(i, f"money figure {money} with no LOSS FIGURE block in the file. "
                       "A number may only quantify what they are LOSING. Declare the "
                       "metric and the source of every input, or delete the figure")
            if re.search(r"\b(note \d|the accounts|filed accounts|balance sheet|"
                         r"statement of financial activities)\b", m, re.I):
                bad(i, "money figure read off accounts. Banned since Hounds for Heroes, "
                       "a line in a financial statement is a label over a breakdown")

        # Exactly one exclamation mark and it lives on the first line.
        if relaxed:
            if m.count("!") > 1:
                bad(i, f"{m.count('!')} exclamation marks in a reply, at most 1")
        elif shapes[i] == "SKETCHB":
            if m.count("!") > 1 or ("!" in m and "!" not in m.split("\n\n")[0]):
                bad(i, "SKETCHB has at most one exclamation mark, and only in block one")
        elif m.count("!") != 1:
            bad(i, f"{m.count('!')} exclamation marks, must be exactly 1")
        elif "!" not in m.split("\n\n")[0]:
            bad(i, "the exclamation mark is not in block one")
        # A URL is exempt from the colon and dash bans (CLAUDE.md, the delivery and closing
        # shapes), so strip links before checking the prose around them.
        prose = re.sub(r"https?://\S+|\b[\w-]+(?:\.[\w-]+)*\.(?:app|com|nl|io|ai|co\.uk|org|net)(?:/\S*)?", "", m)
        # Total ban on the colon character. Raka's rule outranks NO-AI-SLOP.
        if ":" in prose:
            bad(i, "contains a colon")
        # Raka, 2026-09-23, docs/astra-company-profile.md. Never name the country in client
        # facing copy. Caught by hand on the Pierre-Lou reply, 2026-09-24, so now a gate.
        for place in re.findall(r"\b(Indonesia\w*|Jakarta|Bali|Southeast Asia\w*)\b", prose, re.I):
            bad(i, f"names '{place}', no country or city of the team in client copy")
        # Dashes, with the proper-noun exemption (Mercedes-Benz, Witt-Dörring).
        for d in re.findall(r"[—–]", prose):
            bad(i, "contains an em or en dash")
        for h in re.findall(r"\w+-\w+", prose):
            if not h[0].isupper():
                bad(i, f"hyphen in prose, '{h}', rewrite around it")
        # Zero contractions is the single clearest machine tell. English only, since the
        # tell is an English one and a Dutch thread stays Dutch.
        # Raka's plain bump, 2026-10-12, "👀 [name], have you seen this?", is fixed wording with
        # no contraction in it by design, so the exact line and nothing longer is exempt.
        is_bump = re.fullmatch(r"👀 [^\W\d_][^\n,]{0,40}, have you seen this\?", m.strip())
        if langs[i] == "EN" and not is_bump and len(re.findall(r"\w'(s|t|re|ve|ll|d|m)\b", m)) < 1:
            bad(i, "no contractions at all")
        # Five blocks, per the opener template. Replies have their own shape.
        # Raka added block three on 2026-09-24, "Especially, when you are [current goal,
        # actions, company direction], the [the problem growing bigger in the long run]".
        raw = m.split("\n\n")
        if not relaxed and not sketch and len(raw) != 5:
            bad(i, f"{len(raw)} blocks, the template is 5, with block three "
                   "'Especially, when you are [current goal], the [problem growing]'")
        # THE OPENER TEMPLATE, fixed wording. Raka, 2026-09-22, "follow the fucking
        # template i gave you". Only the brackets change. See docs/opener-template.md.
        if not relaxed and not sketch and len(raw) == 5:
            B = [" ".join(b.split()) for b in raw]
            esp = B.pop(2)
            if not esp.startswith("Especially, when you are "):
                bad(i, "block three must open 'Especially, when you are [current goal, "
                       "actions, company direction], the [problem growing bigger]'")
            elif ", the " not in esp[len("Especially, when you are "):]:
                bad(i, "block three must carry ', the [problem growing bigger]' after the goal")
            if len(re.split(r"(?<=[.!?]) (?=[A-Z])", esp)) != 1:
                bad(i, "block three must be ONE sentence")
            if len(esp.split()) > 35:
                bad(i, f"block three is {len(esp.split())} words, cap 35")
            if not re.fullmatch(r"Hi [^,]+, saw .+, looks interesting!", B[0]):
                bad(i, "block one must be exactly 'Hi [name], saw [company], looks interesting!'")
            s2 = re.split(r"(?<=[.!?]) (?=[A-Z])", B[1])
            # The no website variant, Raka 2026-09-22. One sentence in his exact words.
            nosite = B[1].startswith("I couldn't find your website, and that ")
            if nosite:
                if len(s2) != 1:
                    bad(i, f"no website variant, block two must be ONE sentence, found {len(s2)}")
                elif len(B[1].split()) > 30:
                    bad(i, f"no website variant is {len(B[1].split())} words, cap 30")
            elif not B[1].startswith("However, your "):
                bad(i, "block two must open 'However, your [site or social media] is ...', "
                       "or for no website 'I couldn't find your website, and that ...'")
            if nosite:
                pass
            elif len(s2) != 2:
                bad(i, f"block two must be exactly two sentences, found {len(s2)}")
            elif not s2[1].startswith("This causes "):
                bad(i, "block two's second sentence must open 'This causes [stakeholder] to'")
            # No clauses bolted on. Raka rejected "... while it sells private events ..."
            # and "... so your events team loses ...", 27 and 36 words. His run 14 to 19.
            for k, sent in enumerate([] if nosite else s2[:2]):
                if len(sent.split()) > 25:
                    bad(i, f"block two sentence {k+1} is {len(sent.split())} words, cap 25, "
                           "a clause has been added to the template")
            if not B[2].startswith("I run Astra agency. We build "):
                bad(i, "block three must open 'I run Astra agency. We build [xyz]'")
            if "for brands like Unilever, AXA, Pertamina." not in B[2]:
                bad(i, "block three must carry the fixed line 'for brands like Unilever, AXA, Pertamina.'")
            if not re.search(r"Pertamina\. I \S", B[2]):
                bad(i, "block three's third sentence must be the proof, opening 'I ...'")
            # Block five, Raka 2026-09-24, "the cta should be shorter".
            if not re.fullmatch(r"Shall I send you over what the .+ looks like\?", B[3]):
                bad(i, "block five must be exactly 'Shall I send you over what the [thing] looks like?'")
            elif len(B[3].split()) > 16:
                bad(i, f"block five is {len(B[3].split())} words, cap 16")

        # Block three must not be one long comma chain. Raka, 2026-09-16.
        _r = m.split("\n\n")
        b3 = (_r[3] if len(_r) == 5 else _r[2] if len(_r) > 2 else "")
        for s in re.split(r"(?<=[.!?]) ", b3):
            if s.count(",") >= 3:
                bad(i, f"block three has a sentence with {s.count(',')} commas, rewrite")
        for p in BANNED_PHRASES:
            if p in flat.lower():
                bad(i, f"banned phrase, '{p}'")
        for rx, label in BANNED_STRUCTURES:
            if re.search(rx, flat, re.I):
                bad(i, f"banned structure, {label}")

        lines = [l for l in m.strip().split("\n") if l.strip()]
        # The plain bump is one fixed line, so two leads who share a first name share it.
        # Each lead only ever sees their own, so it isn't a template tell. Raka, 2026-10-12.
        if not is_bump:
            closings.append(" ".join(lines[-1].split()))
        cm = (re.search(r"Pertamina\.\s*(.*?)(?:\n\n|$)", m, re.S)
              or re.search(r"go on them\.\s*(.*?)(?:\n\n|$)", m, re.S))
        credentials.append(" ".join(cm.group(1).split()) if cm else f"<none {i+1}>")

    # Pass 4. A batch that repeats itself is a template, and it reads as one.
    for label, seq in (("closing line", closings), ("credential", credentials)):
        dupes = [t for t, n in Counter(seq).items() if n > 1]
        for d in dupes:
            fails.append(f"  batch: {label} used {seq.count(d)} times, '{d[:60]}'")

    skip = ("run astra agency", "astra agency we", "agency we build", "we build websites",
            "build websites and", "websites and the", "and the tools", "the tools that",
            "tools that go", "that go on", "go on them", "on them i", "and send it over")
    # The template's fixed wording repeats in every opener by design, so it is stripped
    # before comparing. Only what was filled into the brackets can trip pass 4.
    FIXED = ("looks interesting", "however, your", "this causes", "i run astra agency.",
             "we build", "for brands like unilever, axa, pertamina.", "shall i build the",
             "and send it over?", "i couldn't find your website, and that",
             # The five block wording, 2026-09-24. Missed until batch 10 had three openers.
             "especially, when you are", "shall i send you over what the", "looks like?",
             # Raka's Build Squad offer, his words, 2026-09-25. Kept verbatim, never reworded.
             "in half the time at half the price",
             # The social and branding block four, Raka, 2026-10-07. Fixed on purpose.
             "branding and websites and social media management",
             # The SKETCH test shape's fixed words, Raka, 2026-10-12.
             "looks cool!", "i'd suggest", "shall i send you a sketch of",
             # The SKETCHB shape's fixed words, 2026-10-25.
             "thanks for connecting.", "shall i send you a sketch?")
    c = Counter()
    for m in msgs:
        low = m.lower()
        for f in FIXED:
            low = low.replace(f, " | ")
        w = re.sub(r"[^a-z| ]", " ", low).split()
        for j in range(len(w) - 5):
            gram = w[j:j + 6]
            if "|" in gram:
                continue
            c[" ".join(gram)] += 1
    for phrase, n in c.items():
        if n > 1 and not any(s in phrase for s in skip):
            fails.append(f"  batch: 6 word phrase repeated {n}x, '{phrase}'")

    print(f"{path}  {len(msgs)} drafts")
    if fails:
        print(f"FAIL  {len(fails)} problem(s)")
        print("\n".join(fails))
        if untagged:
            print(f"\n  NOTE  draft(s) {untagged} carry no shape tag, so OPENER rules were")
            print("        applied. If any of them is a reply, nudge, closer, booking,")
            print("        delivery or correction, put that word in the heading above the")
            print("        block and the right rules get used. A reply is NOT a four block")
            print("        opener and must never be mangled into one.")
        print("\nFix and run again. Then still do passes 1, 2 and 3 by reading them aloud.")
        return 1
    print("PASS  every mechanical gate clear.")
    print("Passes 1, 2 and 3 are still yours. Read each aloud, check the credential is")
    print("the reason we can do the offer, and check block five names a thing you could draw.")
    return 0


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    rep = "--replies" in sys.argv
    if not args:
        print(__doc__)
        sys.exit(2)
    sys.exit(max(check(p, rep) for p in args))
