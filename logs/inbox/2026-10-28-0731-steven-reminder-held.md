# Steven Garratt reminder, held, Wed 28 Oct 07.31 UTC

The scheduled task "Send Steven Qualigraf call reminder" (trig_01G141YhBWuqXTdwEiZr9ZG6) fired at 07.30 UTC. Every check it
names passed, and it was still not sent.

**Why it's held.** Raka's last message in this session was "wait stop" at 20.20 UTC on 27 Oct, two minutes after the four
lead instruction (Mark, Sarah, Felix, Lewis). The question back to him, what he wants instead, hasn't been answered. The
playbook says when in doubt show the draft and wait, and the call is a week away, so a few hours costs nothing.

**What was checked, 07.31 to 07.36 UTC.**
- git pull, this morning's send log read, Steven not in it, so nothing went twice.
- Thread pulled whole with tools/lemlist.py, 13 items, control ctc_ch3vFcKAkjQdMKDCg 7 items ok. Last item ours, 6 Oct
  11.30 UTC act_PQahnTWj3fNmEC2iu, "I've moved it to 11am UK time on Wednesday 4 November". Nothing from him since.
- Calendar event gnd0obt1afdi1srfpvnqkqbta0, status confirmed, Wed 4 Nov 12.00 to 12.30 Europe/Amsterdam (11.00 UK), Meet
  phi-oddn-uek, last updated 6 Oct 11.30 UTC, Steven still needsAction.
- Gmail, qualigraf or steven@qualigraf.com since 6 Oct, only our own meeting brief, no email from him.
- Raka's approval reread at source in the session record, 23 Oct 09.21 UTC, "you can put it to the send pipeline for
  these", item 4 being this exact text for 28 Oct.
- Dry run, BOOKING, 63 chars, sha256 19fdd61a2edf08da, thread 13 items. Nothing sent.

**On Raka's word.** Pull the thread and the event again, a fresh dry run, then `--go` with his words, one copy after.
