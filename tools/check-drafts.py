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


def blocks_of(path):
    return re.findall(r"```\n(.*?)\n```", open(path, encoding="utf-8").read(), re.S)


def check(path):
    msgs = blocks_of(path)
    if not msgs:
        print(f"FAIL  no fenced message blocks found in {path}")
        return 1
    fails = []

    def bad(i, why):
        fails.append(f"  draft {i+1}: {why}")

    closings, credentials = [], []
    for i, m in enumerate(msgs):
        flat = " ".join(m.split())
        words = len(m.split())

        # 100 to 145 words is the template. 150 is the roast register ceiling.
        if not 95 <= words <= 150:
            bad(i, f"{words} words, outside 95 to 150")
        # Exactly one exclamation mark and it lives on the first line.
        if m.count("!") != 1:
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
        # Four blocks, per the opener template.
        if len(m.split("\n\n")) != 4:
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
        print("\nFix and run again. Then still do passes 1, 2 and 3 by reading them aloud.")
        return 1
    print("PASS  every mechanical gate clear.")
    print("Passes 1, 2 and 3 are still yours. Read each aloud, check the credential is")
    print("the reason we can do the offer, and check block four names a thing you could draw.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(max(check(p) for p in sys.argv[1:]))
