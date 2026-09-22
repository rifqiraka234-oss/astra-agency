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
the four block, one exclamation, 95 to 150 word rules are the OPENER'S ALONE. The
--replies flag relaxes the whole file the same way and is the blunt version of tagging.

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
]
# Structures that give AI writing away. docs/writing-standard-anti-ai.md.
BANNED_STRUCTURES = [
    (r"\bnot only\b.{0,40}\bbut also\b", "not only X but also Y"),
    (r"\bit'?s not (just )?about\b.{0,30}\bit'?s about\b", "not X but Y"),
    (r"\bin today'?s\b", "in today's ... world"),
    (r"\bleverage\b|\butilize\b|\bsynerg", "corporate fog"),
    (r"\bdelve\b|\btapestry\b|\bnavigat(e|ing) the\b", "AI tell word"),
]


SHAPES = ("OPENER", "REPLY", "NUDGE", "CLOSER", "CLOSE", "BOOKING", "DELIVERY",
          "CORRECTION")
# Shapes whose length, block count and exclamation rules are NOT the cold opener's.
# The opener template is four blocks with exactly one exclamation. Nothing else is.
RELAXED = {"REPLY", "NUDGE", "CLOSER", "CLOSE", "BOOKING", "DELIVERY", "CORRECTION"}
# A correction retracts a claim, so it has to be able to quote the thing it is retracting.
EXEMPT_MONEY = {"CORRECTION"}


def blocks_of(path):
    """Return (message, shape) per fenced block. The shape is read from the nearest
    heading or bold line above the block, because a reply forced into opener rules is
    how good drafts got mangled all through 2026-09-22. Untagged means OPENER and the
    caller is told how to tag it."""
    src = open(path, encoding="utf-8").read()
    if "GATE ARCHIVED" in src or "NO DRAFTS" in src:
        return []
    out = []
    for m in re.finditer(r"```\n(.*?)\n```", src, re.S):
        head = src[:m.start()].rstrip().split("\n")
        shape = None
        for line in reversed(head[-12:]):
            if not line.strip():
                continue
            hit = [sh for sh in SHAPES if re.search(rf"\b{sh}\b", line)]
            if hit:
                shape = hit[0]
                break
            if line.lstrip().startswith("#") or line.strip().startswith("**"):
                break
        out.append((m.group(1), shape))
    return out


def check(path, replies=False):
    """replies=True relaxes the shape rules only. A reply to a two word thanks is not a
    four block opener and must not be forced into one, per the reply in context rule.
    Every truth and voice rule still applies, and so does the batch repetition check."""
    pairs = blocks_of(path)
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
    msgs = [m for m, _ in pairs]
    shapes = [sh for _, sh in pairs]
    untagged = [i + 1 for i, sh in enumerate(shapes) if sh is None]
    fails = []

    def bad(i, why):
        fails.append(f"  draft {i+1}: {why}")

    closings, credentials = [], []
    for i, m in enumerate(msgs):
        flat = " ".join(m.split())
        words = len(m.split())

        # 90 to 145 words is the template, floor lowered 2026-09-22 when block one
        # became the plain shape. 150 is the roast register ceiling.
        relaxed = replies or shapes[i] in RELAXED
        if relaxed:
            pass
        elif not 88 <= words <= 150:
            bad(i, f"{words} words, outside 95 to 150")
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
        elif m.count("!") != 1:
            bad(i, f"{m.count('!')} exclamation marks, must be exactly 1")
        elif "!" not in m.split("\n\n")[0]:
            bad(i, "the exclamation mark is not in block one")
        # Total ban on the colon character. Raka's rule outranks NO-AI-SLOP.
        if ":" in m:
            bad(i, "contains a colon")
        # Dashes, with the proper-noun exemption (Mercedes-Benz, Witt-Dörring).
        for d in re.findall(r"[—–]", m):
            bad(i, "contains an em or en dash")
        for h in re.findall(r"\w+-\w+", m):
            if not h[0].isupper():
                bad(i, f"hyphen in prose, '{h}', rewrite around it")
        # Zero contractions is the single clearest machine tell.
        if len(re.findall(r"\w'(s|t|re|ve|ll|d|m)\b", m)) < 1:
            bad(i, "no contractions at all")
        # Four blocks, per the opener template. Replies have their own shape.
        if not relaxed and len(m.split("\n\n")) != 4:
            bad(i, f"{len(m.split(chr(10)+chr(10)))} blocks, the template is 4")
        # Block three must not be one long comma chain. Raka, 2026-09-16.
        b3 = m.split("\n\n")[2] if len(m.split("\n\n")) > 2 else ""
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
        closings.append(" ".join(lines[-1].split()))
        cm = re.search(r"go on them\.\s*(.*?)(?:\n\n|$)", m, re.S)
        credentials.append(" ".join(cm.group(1).split()) if cm else f"<none {i+1}>")

    # Pass 4. A batch that repeats itself is a template, and it reads as one.
    for label, seq in (("closing line", closings), ("credential", credentials)):
        dupes = [t for t, n in Counter(seq).items() if n > 1]
        for d in dupes:
            fails.append(f"  batch: {label} used {seq.count(d)} times, '{d[:60]}'")

    skip = ("run astra agency", "astra agency we", "agency we build", "we build websites",
            "build websites and", "websites and the", "and the tools", "the tools that",
            "tools that go", "that go on", "go on them", "on them i", "and send it over")
    c = Counter()
    for m in msgs:
        w = re.sub(r"[^a-z ]", " ", m.lower()).split()
        for j in range(len(w) - 5):
            c[" ".join(w[j:j + 6])] += 1
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
    print("the reason we can do the offer, and check block four names a thing you could draw.")
    return 0


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    rep = "--replies" in sys.argv
    if not args:
        print(__doc__)
        sys.exit(2)
    sys.exit(max(check(p, rep) for p in args))
