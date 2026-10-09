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
