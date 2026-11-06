#!/usr/bin/env python3
"""Rebalance multiple choice answer letters in the academy course files.

Drafting left most correct answers on B. This moves the correct option to a
balanced, seeded target letter, keeps the option texts word for word, and
rewrites the **Answer.** letter to match. Then it re-reads the file and checks
every answer still points at the same option text it pointed at before.

Usage. python3 tools/shuffle-quiz-answers.py docs/academy/level-1-operator.md [...]
It also rebuilds every "Answer key at a glance" line from the exam above it.
Add --check to only report the letter spread without writing.
"""
import random
import re
import sys
import textwrap

ANS = re.compile(r"^(\s*)\*\*Answer\.\*\* ([A-D])\.")
MARK = re.compile(r"(?:(?<=^)|(?<=\s))([A-D])([.)]) ")
WIDTH = 120


def parse_options(lines):
    """Return (style, sep, indent, [texts]) or None."""
    text = " ".join(l.strip() for l in lines)
    hits = [m for m in MARK.finditer(text)]
    # keep only a strictly sequential A, B, C, D run starting at A
    seq, want = [], "A"
    for m in hits:
        if m.group(1) == want:
            seq.append(m)
            want = chr(ord(want) + 1)
    if len(seq) < 2 or seq[0].start() != 0:
        return None
    sep = seq[0].group(2)
    opts = []
    for i, m in enumerate(seq):
        end = seq[i + 1].start() if i + 1 < len(seq) else len(text)
        opts.append(text[m.end():end].strip())
    per_line = len(lines) == len(seq) and all(
        re.match(r"\s*[A-D][.)] ", l) for l in lines)
    indent = re.match(r"\s*", lines[0]).group(0)
    return ("line" if per_line else "inline", sep, indent, opts)


def render(style, sep, indent, opts):
    if style == "line":
        return [indent + f"{chr(65 + i)}{sep} {t}" for i, t in enumerate(opts)]
    # a non breaking space keeps each letter on the same line as its option
    parts = [f"{chr(65 + i)}{sep}\u00a0{t}" for i, t in enumerate(opts)]
    return [l.replace("\u00a0", " ") for l in textwrap.wrap(" ".join(parts), WIDTH, initial_indent=indent,
                         subsequent_indent=indent, break_long_words=False,
                         break_on_hyphens=False)]


def numeric(opts):
    return all(re.match(r"^[€$]?\d", o) for o in opts)


def process(path, write=True):
    src = open(path, encoding="utf-8").read().split("\n")
    rng = random.Random(path)
    out, i = [], 0
    blocks = []  # (out_index_of_options_start, n_option_lines, answer_line_index)
    # first pass: locate questions
    for idx, line in enumerate(src):
        m = ANS.match(line)
        if not m:
            continue
        # walk up to the first option line (starts with A. or A) after optional indent)
        j = idx - 1
        while j >= 0 and not re.match(r"\s*A[.)] ", src[j]) and idx - j <= 6:
            j -= 1
        if j < 0 or not re.match(r"\s*A[.)] ", src[j]):
            raise SystemExit(f"{path}:{idx + 1} cannot find options above answer")
        blocks.append((j, idx))
    n = len(blocks)
    pool = (["A", "B", "C", "D"] * (n // 4 + 1))[:n]
    rng.shuffle(pool)
    replace = {}
    expected = []
    for (start, ans), target in zip(blocks, pool):
        parsed = parse_options(src[start:ans])
        if not parsed:
            raise SystemExit(f"{path}:{start + 1} cannot parse options")
        style, sep, indent, opts = parsed
        cur = ord(ANS.match(src[ans]).group(2)) - 65
        if cur >= len(opts):
            raise SystemExit(f"{path}:{ans + 1} answer letter beyond options")
        correct = opts[cur]
        if numeric(opts):
            new, newidx = opts, cur
        else:
            others = [o for k, o in enumerate(opts) if k != cur]
            rng.shuffle(others)
            t = (ord(target) - 65) % len(opts)
            new = others[:t] + [correct] + others[t:]
            newidx = t
        expected.append((correct, newidx))
        ansline = ANS.sub(lambda m: f"{m.group(1)}**Answer.** {chr(65 + newidx)}.", src[ans], count=1)
        replace[start] = (ans, render(style, sep, indent, new) + [ansline])
    k = 0
    while k < len(src):
        if k in replace:
            end, newlines = replace[k]
            out.extend(newlines)
            k = end + 1
        else:
            out.append(src[k])
            k += 1
    # verify
    check, pos = [], 0
    for idx, line in enumerate(out):
        m = ANS.match(line)
        if not m:
            continue
        j = idx - 1
        while not re.match(r"\s*A[.)] ", out[j]):
            j -= 1
        _, _, _, opts = parse_options(out[j:idx])
        got = opts[ord(m.group(2)) - 65]
        if got != expected[pos][0]:
            raise SystemExit(f"{path}:{idx + 1} verification failed")
        check.append(m.group(2))
        pos += 1
    assert pos == n
    spread = {c: check.count(c) for c in "ABCD"}
    print(f"{path}: {n} questions, spread {spread}")
    out = rebuild_key(out)
    if write:
        open(path, "w", encoding="utf-8").write("\n".join(out))


def rebuild_key(lines):
    """Rewrite the "Answer key at a glance" line under each final exam."""
    out, k = [], 0
    while k < len(lines):
        if not lines[k].startswith("**Answer key at a glance.**"):
            out.append(lines[k])
            k += 1
            continue
        h = len(out) - 1
        while not (out[h].startswith("#") and re.search("exam", out[h], re.I)):
            h -= 1
        ans = [re.match(r"\s*\*\*Answer\.\*\* ([^.]+)\.", l).group(1)
               for l in out[h:] if re.match(r"\s*\*\*Answer\.\*\*", l)]
        key = "**Answer key at a glance.** " + ", ".join(
            f"{i + 1} {a}" for i, a in enumerate(ans)) + "."
        out.extend(textwrap.wrap(key, WIDTH, break_on_hyphens=False))
        k += 1
        while k < len(lines) and lines[k].strip():
            k += 1
    return out


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    for p in args:
        process(p, write="--check" not in sys.argv)
