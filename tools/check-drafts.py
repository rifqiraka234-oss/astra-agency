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
    # Clues drive the inference, they never appear in the message. opener-template.md 3A.
    (r"\byou'?re (currently )?hiring\b|\bjob (opening|post|ad|listing)s?\b|\bvacanc|"
     r"\bvacature|\bstellenangebot|\bcongrat", "quoted clue, state the consequence instead"),
    (r"\bi (saw|noticed|read|see) (that )?(you|your) (posted|post|newsletter|announce|"
     r"recently|just)", "quoted clue, state the consequence instead"),
]


SHAPES = ("OPENER", "REPLY", "NUDGE", "CLOSER", "CLOSE", "BOOKING", "DELIVERY",
          "CORRECTION")
# Shapes whose length, block count and exclamation rules are NOT the cold opener's.
# The opener template is five blocks (since 2026-09-24) with exactly one exclamation. Nothing else is.
RELAXED = {"REPLY", "NUDGE", "CLOSER", "CLOSE", "BOOKING", "DELIVERY", "CORRECTION"}
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
    """Return (message, shape, gate) per message block. The shape is read from the nearest
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
        for line in reversed(head[-12:]):
            if not line.strip():
                continue
            hit = [sh for sh in SHAPES if re.search(rf"\b{sh}\b", line)]
            if hit:
                shape = hit[0]
                break
            if line.lstrip().startswith("#") or line.strip().startswith("**"):
                break
        out.append((body, shape, gate))
        gate = None
    return out


# THE RESEARCH GATE. Raka, 2026-09-24, every item "mandatory". RULES.md section 4B.
GATE_KEYS = ["lead", "site pass 1", "site pass 2", "deep analysis", "owner linkedin",
             "contact linkedin", "google news", "regional news", "industry news", "sources",
             "pains", "chosen", "recheck"]


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
    n1 = re.search(r"\d+", kv.get("site pass 1", ""))
    n2 = re.search(r"\d+", kv.get("site pass 2", ""))
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
    if not re.search(r"confidence\s+(HIGH|MEDIUM)\b", kv.get("recheck", "")):
        probs.append("recheck must end in 'confidence HIGH' or 'confidence MEDIUM'. LOW does not send")
    return probs


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
    msgs = [m for m, _, _ in pairs]
    shapes = [sh for _, sh, _ in pairs]
    gates = [g for _, _, g in pairs]
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
        if not relaxed:
            for gp in gate_problems(gates[i]):
                bad(i, f"RESEARCH GATE, {gp}")
        if relaxed:
            pass
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
        # Dashes, with the proper-noun exemption (Mercedes-Benz, Witt-Dörring).
        for d in re.findall(r"[—–]", prose):
            bad(i, "contains an em or en dash")
        for h in re.findall(r"\w+-\w+", prose):
            if not h[0].isupper():
                bad(i, f"hyphen in prose, '{h}', rewrite around it")
        # Zero contractions is the single clearest machine tell.
        if len(re.findall(r"\w'(s|t|re|ve|ll|d|m)\b", m)) < 1:
            bad(i, "no contractions at all")
        # Five blocks, per the opener template. Replies have their own shape.
        # Raka added block three on 2026-09-24, "Especially, when you are [current goal,
        # actions, company direction], the [the problem growing bigger in the long run]".
        raw = m.split("\n\n")
        if not relaxed and len(raw) != 5:
            bad(i, f"{len(raw)} blocks, the template is 5, with block three "
                   "'Especially, when you are [current goal], the [problem growing]'")
        # THE OPENER TEMPLATE, fixed wording. Raka, 2026-09-22, "follow the fucking
        # template i gave you". Only the brackets change. See docs/opener-template.md.
        if not relaxed and len(raw) == 5:
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
             "and send it over?", "i couldn't find your website, and that")
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
