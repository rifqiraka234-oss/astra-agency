# Webhook fixtures

Anonymized payloads matching the shapes documented in
[`../api-notes.md`](../api-notes.md). The `secret` and `teamId` values match
the defaults in `vitest.setup.ts` and the `.env.example` guidance, so they
verify against a local worker in `TEST` mode without editing anything.

```bash
curl -X POST http://localhost:3001/webhooks/lemlist \
  -H 'content-type: application/json' \
  --data @docs/reply-agent/fixtures/linkedin-invite-accepted.json
```

| Fixture | Exercises |
| --- | --- |
| `linkedin-invite-accepted.json` | the sequence-collision path |
| `linkedin-replied.json` | the reply path, including "yes, send the sketch" with no prior offer |
| `email-replied-third-party.json` | a third-party reply with no lead or campaign id: must go to a human |
| `email-unsubscribed.json` | immediate suppression with no model call |

Change `secret` to something wrong to watch the endpoint reject it with a 401
and an audited reason, without the payload being stored.
