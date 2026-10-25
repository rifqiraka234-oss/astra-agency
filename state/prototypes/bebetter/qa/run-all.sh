#!/usr/bin/env bash
# The whole QA chain on the current build, with the build hash checked before and after. Servers on 8811 and 8812, or LIVE=1.
cd "$(dirname "$0")"
H0=$(md5sum ../site/index.html ../site/gyms/index.html ../site/assets/site.css ../site-plan/index.html | md5sum)
out=/tmp/claude-0/bb/final; mkdir -p $out
node axe.js > $out/axe.txt 2>&1 &
MOTION=1 node axe.js > $out/axe-motion.txt 2>&1 &
node clip.js > $out/clip.txt 2>&1 &
node overflow.js > $out/overflow.txt 2>&1
wait
echo "overflow    $(tail -1 $out/overflow.txt)"
echo "axe         $(tail -1 $out/axe.txt)"
echo "axe motion  $(tail -1 $out/axe-motion.txt)"
echo "clip        $(tail -1 $out/clip.txt)"
echo "kitfit      $(node kitfit.js | tail -1), fault run lines $(FAULT=1 node kitfit.js | grep -c want)"
echo "form        $(node form.js | head -1), fault run $(FAULT=1 node form.js | head -1)"
echo "stage       $(node stage.js | tail -1), fault run $(FAULT=1 node stage.js | head -1)"
echo "rendertext  $(node rendertext.js | tail -1), control $(CONTROL=1 node rendertext.js | tail -1)"
echo "copy        site $(python3 copy_audit.py ../site | tail -1), plan $(python3 copy_audit.py ../site-plan | tail -1), control $(python3 copy_audit.py ../site control | grep TOTAL)"
node nojs.js | sed 's/^/nojs        /'
H1=$(md5sum ../site/index.html ../site/gyms/index.html ../site/assets/site.css ../site-plan/index.html | md5sum)
[ "$H0" = "$H1" ] && echo "build unchanged during the chain" || echo "BUILD CHANGED DURING THE CHAIN, results void"
