# NO-AI-SLOP.md

> **Zero mistake policy. Read `CLAUDE.md` "TRIPLE CHECK EVERYTHING" before acting on
> this file (Raka, 2026-09-21).** Every claim gets three different checks, not three
> readings. Reopen the source, actively try to prove the claim false, then confirm it a
> second way that does not share a failure mode with the first. Every absence claim ships
> with a positive control showing the method finds the thing when it is there. My own
> notes, state files and memory are a candidate list, never proof.
>
> **Being lazy is prohibited.** If a tool, an API call or a fetch can settle a question,
> it settles it. Never reason from a timestamp, a preview, a filename, a pattern or a
> plausible guess to save a call. An inference that turns out right is still a process
> failure. For this file that means the section 8 grep is actually run over the shipped text,
> never eyeballed, and the banned list is reread rather than recalled.

Style rules for all generated copy: websites, landing pages, cold email, LinkedIn messages, chat replies, proposals, UI microcopy.

**How to install:** paste into `CLAUDE.md` at your project root, or save as `.claude/rules/no-ai-slop.md` and reference it from `CLAUDE.md` with `See @.claude/rules/no-ai-slop.md`. For one-off use, paste the "Compressed prompt block" at the bottom into any prompt.

**The core rule:** if a sentence could appear on any of 10,000 other companies' websites without changing a word, delete it and write the specific version.

---

## 1. Banned words

Never use these. If a banned word is the only accurate one (rare), use it once and only once per document.

### Verbs
delve, dive into, deep dive, leverage, utilize, harness, unlock, unleash, empower, elevate, streamline, optimize, revolutionize, transform, supercharge, turbocharge, amplify, foster, cultivate, facilitate, enable (as filler), embark, navigate (metaphorical), underscore, illuminate, spearhead, redefine, reimagine, curate, craft (as in "crafted with care"), bolster, resonate, encompass, elucidate, ascertain, commence, endeavor, ensure (as filler), unravel, unveil, showcase, drive (as in "drive results"), align (as in "align with your goals")

### Adjectives
seamless, robust, cutting-edge, state-of-the-art, best-in-class, world-class, bespoke, tailored, holistic, innovative, groundbreaking, transformative, game-changing, revolutionary, unparalleled, unprecedented, comprehensive, meticulous, curated, dynamic, vibrant, stunning, breathtaking, sleek, immersive, intuitive (unsupported), powerful (unsupported), pivotal, crucial, vital, paramount, profound, remarkable, exceptional, impactful, scalable, future-proof, end-to-end, next-level, top-notch, one-stop, turnkey, data-driven (as decoration), results-driven, customer-centric, forward-thinking, proactive, strategic (as filler)

### Nouns
landscape, ecosystem (metaphorical), realm, sphere, tapestry, journey, adventure, testament, beacon, pillar, cornerstone, backbone, powerhouse, synergy, paradigm, framework (as vague noun), solution / solutions, offering, expertise, excellence, mastery, potential, possibilities, opportunity (vague), touchpoint, pain point, value proposition, game-changer, secret sauce, blueprint, roadmap (metaphorical), toolkit, arsenal, nexus, trajectory, zeitgeist, plethora, myriad, essence, DNA (as in "in our DNA")

### Transitions and connectors
furthermore, moreover, additionally, consequently, notably, importantly, significantly, ultimately, essentially, fundamentally, indeed, thus, hence, whilst, albeit, that said, with that in mind, in essence, at its core, needless to say, rest assured, look no further

### Hedges (the Claude signature — see §3b)
it's worth noting, worth noting, it's important to note, generally, typically, in many cases, in most cases, often, tends to, can be, may be, arguably, relatively, somewhat, fairly, largely, to some extent, I would suggest, one could argue, while X, it's also true that Y

### Chat-assistant voice
Certainly, Absolutely, Great question, Excellent question, That's a great point, You're absolutely right, I'd be happy to, Let me break that down, Let's dive in, Here's a breakdown, In summary, To summarize, I hope this helps, Feel free to, Don't hesitate to, Let me know if you need anything else, Happy to clarify

---

## 2. Banned phrases

### Website / landing page
- "Transform your business"
- "Take your [X] to the next level"
- "Elevate your brand"
- "Your vision, our expertise"
- "Where [X] meets [Y]"
- "We don't just build websites, we build [experiences / relationships / brands]"
- "More than just a [agency / website]"
- "Bringing your ideas to life"
- "Let's create something amazing together"
- "Ready to get started?"
- "Let's talk / Let's chat / Get in touch today"
- "In today's digital landscape / fast-paced world / competitive market"
- "Stand out from the crowd"
- "Built for the modern web"
- "Designed with you in mind"
- "Crafted with passion"
- "Your success is our success"
- "We pride ourselves on"
- "With years of experience"
- "Trusted by businesses worldwide"
- "Tailored solutions for your unique needs"
- "Unlock the full potential of"
- "The future of [X] is here"
- "Say goodbye to [X]"
- "Look no further"
- "It's that simple"

### Banned website section headings
"Why Choose Us", "What Sets Us Apart", "Our Process", "Our Journey", "Our Story", "The [Company] Difference", "How It Works" (unless it genuinely explains mechanics), "Ready to Transform Your Business?", "Let's Build Something Great"

### Cold email / DM
- "I hope this email finds you well"
- "I hope you're doing well"
- "My name is [X] and I'm the [role] at [company]"
- "I came across your website / profile / company"
- "I stumbled upon"
- "I was impressed by your innovative approach"
- "I noticed you're doing great things in the [X] space"
- "I wanted to reach out to see if"
- "I wanted to touch base"
- "Just following up" / "Just circling back" / "Bumping this to the top of your inbox"
- "Quick question" (as a subject line or opener)
- "Does that resonate?"
- "Would love to pick your brain"
- "Let me know if this is a priority for you right now"
- "I'd love to hop on a quick 15-minute call"
- "No pressure either way!"
- "Looking forward to hearing from you"
- "Best regards" (use a plain sign-off or none)
- "P.S. If this isn't a priority right now, no worries at all"

### Universal filler
- "It's important to note that"
- "It's worth noting"
- "At the end of the day"
- "When it comes to"
- "The truth is"
- "Here's the thing:"
- "Let's be honest"
- "But here's what most people miss"
- "This is where [X] comes in"
- "Think of it like [analogy]" (only if the analogy earns its place)
- "Whether you're a [X] or a [Y], [Z]"
- "Not only ... but also"
- "In conclusion"

---

## 3. Banned sentence structures

These are the real tells. The words above can be swapped; these patterns give the model away even with clean vocabulary.

1. **The not-just pivot.** "It's not just a website — it's a growth engine." / "This isn't X. It's Y." / "Not just faster. Smarter." Ban all variants, including the negation-then-reveal.
2. **The em-dash reveal.** Sentence, em dash, dramatic restatement. Ban em dashes entirely in generated copy. Use a period or a comma.
3. **The rule of three.** "Fast, clean, and built to convert." Three-item lists of adjectives or noun phrases, especially with rhythm. Use two, or four, or one.
4. **Sentence fragments for punch.** "Every time." / "No exceptions." / "Simple as that." / "Period."
5. **Rhetorical question opener.** "Ever wondered why your site isn't converting?" / "What if your website actually worked?"
6. **The colon reveal.** "There's one problem: nobody can find you."
7. **Parallel anaphora.** Three sentences starting the same way for effect. "You deserve... You deserve... You deserve..."
8. **Correction-of-a-premise.** "Most people think X. They're wrong."
9. **Statistic-as-hook with no source.** "73% of visitors leave within 5 seconds."
10. **The escalating pair.** "Not just better. Fundamentally different."
11. **Second-person flattery.** "You've built something real." / "You clearly care about your craft."
12. **Meta-commentary about the writing.** "Let's break this down." / "Here's what that means in practice."
13. **Closing summary paragraph** that restates what was already said.
14. **Balanced both-sides hedging** where a direct claim belongs.

---

## 3b. Claude-specific tells

Claude and ChatGPT have different fingerprints. Most published ban-lists are ChatGPT-only, so a Claude draft can pass them and still be obvious. Claude uses "delve" and "in today's world" much less; it gives itself away structurally instead.

1. **Distributed hedging.** ChatGPT states a claim then adds a caveat paragraph. Claude threads qualifiers through every sentence: "generally," "in many cases," "tends to," "worth noting." Make claims flat and unqualified, or don't make them.
2. **Balanced framing before a conclusion.** Presenting the counterargument fairly, then answering it. Fine for an essay. Fatal in a headline or a cold email. State the position and stop.
3. **The three-part default.** Three examples, three bullets, three adjectives, three sections — even when the true answer is two or five. Count your lists and break the pattern deliberately.
4. **Colon overuse.** Colons introducing almost any follow-on idea, not just lists. Use a period.
5. **"And" / "But" sentence openers for rhythm.** Reads punchy once. Becomes metronomic by the fourth time.
6. **Metered sentence length.** Human prose is uneven. Claude's paragraphs settle into a consistent medium-length beat even when the vocabulary is clean. This is the single hardest tell to remove and the one that matters most.
7. **Paired adjectives.** "Simple yet powerful," "clean and modern," "fast but flexible." The yet/but hinge is a giveaway.
8. **Uncontracted verbs.** "It is," "do not," "you will" in copy where a person would write "it's," "don't," "you'll."
9. **Neat scaffolding.** Numbered steps, headers, and a tidy summary applied to material that didn't need structure.
10. **Long, internally cohesive paragraphs** that unpack one idea over 4-5 sentences. Good essay habit, wrong for landing pages and email.

---

## 4. Banned formatting habits

- Em dashes (—) and en dashes used as em dashes. Rewrite the sentence.
- Emoji in headings, bullets, buttons, or email. None. Not the sparkle, rocket, bulb, check, fire, or point-down ones.
- Bold-lead bullets everywhere: "**Speed:** we make it fast." Use plain bullets or plain sentences.
- Bullet lists where prose is natural. Prose is the default; bullets only for genuinely enumerable things.
- Headings every two paragraphs.
- Title Case Headings On Everything. Use sentence case.
- Arrows and checkmarks as decorative punctuation.
- "TL;DR" and "Key takeaway:" blocks.
- Exclamation marks. Maximum one per document, and usually zero.
- Curly-quote and typographic flourish for its own sake.
- Bold used more than twice per screen of text.

---

## 5. Swap table

| Banned | Write instead |
| --- | --- |
| utilize | use |
| leverage | use |
| facilitate | help, run, host |
| delve into | look at, dig into |
| optimize | speed up, cut, fix (say which) |
| streamline | simplify, cut steps |
| elevate / transform | (delete, then state the concrete result) |
| seamless | works without setup, no login needed |
| robust | (say the actual property: fast, tested, handles 10k users) |
| bespoke / tailored | built for you, custom-coded |
| cutting-edge | (delete, or name the technology) |
| comprehensive | full, complete, or name what's included |
| solutions | (name the thing: sites, redesigns, landing pages) |
| in today's fast-paced world | (delete entire clause) |
| I hope this email finds you well | (delete; open with the specific reason you're writing) |
| I came across your website | I saw [specific page / specific thing] |
| would love to hop on a quick call | worth a reply? / want the mockup? |
| drive results | (name the number or the outcome) |
| best-in-class | (delete or prove it) |
| empower your team | your team can [specific action] |

---

## 6. What to write instead

- **Be specific or say nothing.** "Your booking page takes 6 seconds to load on mobile" beats any adjective.
- **Concrete nouns over abstract ones.** "The contact form", not "the conversion funnel".
- **Short verbs.** Use, build, cut, fix, ship, rewrite, test.
- **Vary sentence length on purpose.** AI rhythm is uniformly medium. Mix 4-word and 25-word sentences.
- **One idea per sentence.** No stacked clauses.
- **Say the awkward thing plainly.** Price, timeline, what's not included.
- **Cut the first sentence of every paragraph** and check if it still works. It usually does.
- **Read it aloud.** If it sounds like a press release, it's slop.

---

## 7. Self-check before delivering

Run this over any generated copy:

- [ ] Zero em dashes
- [ ] Zero emoji
- [ ] Zero words from the banned list, or one deliberate exception
- [ ] No "not just X, it's Y" anywhere
- [ ] No three-adjective lists
- [ ] Every claim has a number, a name, or a specific noun behind it
- [ ] Would this sentence be false if pasted on a competitor's site? If not, rewrite it
- [ ] Sentence lengths vary by at least 3x between shortest and longest
- [ ] At most one exclamation mark, ideally zero
- [ ] Zero hedges: no "generally", "tends to", "in many cases", "worth noting"
- [ ] No list has exactly three items unless three is genuinely the count
- [ ] No paired adjectives joined by "yet" or "but"
- [ ] Contractions used throughout: it's, don't, you'll, we're
- [ ] Colons used only for lists, not to introduce ideas

---

## 8. Grep check

Save as `check-slop.sh` and run against generated files.

```bash
#!/usr/bin/env bash
# usage: ./check-slop.sh path/to/file.html
FILE="$1"

WORDS='delve|dive into|deep dive|leverage|utilize|harness|unlock|unleash|empower|elevate|streamline|revolutioniz|transform|supercharge|amplify|foster|facilitate|embark|underscore|spearhead|reimagine|bolster|resonate|seamless|robust|cutting-edge|state-of-the-art|best-in-class|world-class|bespoke|holistic|innovative|groundbreaking|game-chang|unparalleled|unprecedented|comprehensive|meticulous|curated|immersive|pivotal|crucial|paramount|impactful|scalable|future-proof|end-to-end|turnkey|customer-centric|landscape|ecosystem|realm|tapestry|testament|beacon|cornerstone|synergy|paradigm|plethora|myriad|furthermore|moreover|additionally|consequently|ultimately|essentially|rest assured|look no further|solutions'

PHRASES="I hope this email finds you well|I came across|take your .* to the next level|in today's (fast-paced|digital|competitive)|let's create something|ready to get started|stand out from the crowd|we pride ourselves|it's important to note|at the end of the day|here's the thing|when it comes to|not just .*(but|it's)|whether you're a"

echo "== banned words =="
grep -nEio "$WORDS" "$FILE" | sort -t: -k3 | uniq -c -f0 || echo "none"

echo "== banned phrases =="
grep -nEio "$PHRASES" "$FILE" || echo "none"

HEDGES="it's worth noting|worth noting|it is important to note|in many cases|in most cases|tends to|generally speaking|one could argue|arguably|to some extent|that said|at its core"
PAIRED='(simple|clean|fast|powerful|modern|elegant|light|small) (yet|but) (powerful|complex|flexible|capable|bold|strong|mighty)'

echo "== hedges (Claude tell) =="
grep -nEio "$HEDGES" "$FILE" || echo "none"

echo "== paired adjectives =="
grep -nEio "$PAIRED" "$FILE" || echo "none"

echo "== uncontracted verbs =="
grep -nEo "\b(it is|do not|does not|you will|we are|cannot|will not|that is)\b" "$FILE" || echo "none"

echo "== sentence length variance (want stdev > 6) =="
tr '.!?' '\n' < "$FILE" | awk 'NF{n++; c=NF; s+=c; q+=c*c} END{if(n>1){m=s/n; print "sentences:", n, "mean:", int(m), "stdev:", int(sqrt(q/n - m*m))}}'

echo "== em dashes =="
grep -n "—" "$FILE" || echo "none"

echo "== emoji =="
grep -nP "[\x{1F300}-\x{1FAFF}\x{2700}-\x{27BF}\x{2600}-\x{26FF}]" "$FILE" || echo "none"

echo "== exclamation marks =="
grep -c "!" "$FILE"
```

---

## 9. Compressed prompt block

For pasting into a single prompt or a lemlist / campaign brief.

```
Writing rules. Never use: delve, leverage, utilize, harness, unlock, unleash,
empower, elevate, streamline, revolutionize, transform, supercharge, amplify,
foster, facilitate, embark, seamless, robust, cutting-edge, bespoke, holistic,
innovative, groundbreaking, game-changing, unparalleled, comprehensive, curated,
immersive, impactful, scalable, end-to-end, landscape, ecosystem, realm,
tapestry, journey, testament, synergy, solutions, furthermore, moreover,
additionally, ultimately, essentially.

Never write: "I hope this email finds you well", "I came across your website",
"take it to the next level", "in today's fast-paced world", "let's create
something amazing", "ready to get started", "we don't just X, we Y", "it's not
just X, it's Y", "here's the thing", "at the end of the day", "when it comes to",
"whether you're X or Y".

No em dashes. No emoji. No exclamation marks. No three-adjective lists. No
rhetorical questions as openers. No sentence fragments for emphasis. No closing
summary paragraph. Sentence case headings only.

No hedging: cut "generally", "typically", "tends to", "in many cases", "it's
worth noting", "that said", "at its core". Make the claim flat or cut it. Don't
present a counterargument before concluding. Don't default to three of anything;
use two or five. Colons only for lists. Don't start sentences with "And" or
"But" more than once. Use contractions. Vary sentence length hard: put a 4-word
sentence next to a 25-word one.

Instead: name specific things, use numbers, use short verbs, vary sentence
length, one idea per sentence. If a sentence would be true on any competitor's
site, delete it and write the specific version.
```
