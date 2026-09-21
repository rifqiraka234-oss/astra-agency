#!/usr/bin/env python3
"""Build the invitation accepted pool for any campaign.

The two lemlist calls that feed this are made through call_api in the session,
because there is no API token in the container. Both responses are oversized, so
the harness writes them to files under tool-results/ and prints the path. Pass
those paths here.

  1. GET /api/v2/campaigns/<campaignId>/export/leads?state=linkedinInviteAccepted&format=json
  2. GET /api/activities?version=v2&type=linkedinInviteAccepted&campaignId=<campaignId>&limit=100&offset=<n>
     paged until short

Usage
  python3 tools/accepted_pool.py --export EXPORT.json --activities A0.json A1.json \
      --out state/accepted_pool_<campaign>.jsonl [--queue state/silent_accepted_queue.jsonl]

Everything already carrying a row in the queue is reported separately and left out
of the output, so the file holds only contacts nobody has worked yet.
"""

import argparse
import json
import sys
from collections import Counter


def load(path):
    with open(path) as fh:
        blob = json.load(fh)
    return blob["data"] if isinstance(blob, dict) and "data" in blob else blob


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--export", required=True)
    ap.add_argument("--activities", required=True, nargs="+")
    ap.add_argument("--out", required=True)
    ap.add_argument("--queue", default="state/silent_accepted_queue.jsonl")
    args = ap.parse_args()

    leads = {r["_id"]: r for r in load(args.export)}

    accepts = {}
    for path in args.activities:
        for a in load(path):
            prev = accepts.get(a["leadId"])
            if prev is None or a["createdAt"] > prev["createdAt"]:
                accepts[a["leadId"]] = a

    worked = {}
    try:
        with open(args.queue) as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                row = json.loads(line)
                if row.get("contactId"):
                    worked[row["contactId"]] = row.get("status")
    except FileNotFoundError:
        pass

    seen = Counter()
    fresh = []
    orphans = 0
    for lead_id, lead in leads.items():
        act = accepts.get(lead_id)
        if act is None:
            orphans += 1
            continue
        contact_id = act["contactId"]
        status = worked.get(contact_id)
        seen[status or "NOT_IN_QUEUE"] += 1
        if status is not None:
            continue
        fresh.append(
            {
                "contactId": contact_id,
                "leadId": lead_id,
                "name": " ".join(
                    p for p in (lead.get("firstName"), lead.get("lastName")) if p
                ),
                "linkedinUrl": lead.get("linkedinUrl") or lead.get("leadLinkedinUrl"),
                "jobTitle": lead.get("jobTitle"),
                "companyName": lead.get("companyName"),
                "companyUrl": lead.get("companyDomain")
                or lead.get("companyWebsiteUrl")
                or lead.get("companyWebsite"),
                "companyLinkedinUrl": lead.get("companyLinkedinUrl"),
                "acceptedAt": act["createdAt"],
                "status": "UNRESEARCHED",
            }
        )

    fresh.sort(key=lambda r: r["acceptedAt"], reverse=True)
    with open(args.out, "w") as fh:
        for row in fresh:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")

    print("leads parked at acceptance", len(leads))
    for status, count in seen.most_common():
        print("  {:<24} {}".format(status, count))
    if orphans:
        print("  no acceptance activity found  {}".format(orphans), file=sys.stderr)
    print("wrote {} untouched contacts to {}".format(len(fresh), args.out))


if __name__ == "__main__":
    main()
