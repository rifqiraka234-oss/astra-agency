# Lemlist to Routine relay

A single function that turns a Lemlist webhook into a Routine fire, so the
reply agent wakes within seconds of a prospect replying instead of waiting for
the next scheduled run.

## Why this exists

Lemlist webhooks can send only a `secret` inside the JSON body. The Routine
fire endpoint requires three HTTP headers:

```
Authorization: Bearer sk-ant-oat01-...
anthropic-beta: experimental-cc-routine-2026-04-01
anthropic-version: 2023-06-01
```

Lemlist cannot set any of them, so nothing can call the endpoint directly.
This relay accepts what Lemlist can send and re-issues what Anthropic requires.

## What it does

1. Rejects anything that is not a POST carrying the correct shared secret.
2. Ignores every activity type except `linkedinReplied`,
   `linkedinInviteAccepted` and `emailsReplied`. Each fire is a full Claude
   Code session that draws down usage and the daily routine cap, so sends,
   opens, visits and follows are dropped.
3. Debounces per contact for 90 seconds. Three messages in a row become one
   session rather than three sessions racing on the same conversation.
4. POSTs to the fire URL with the required headers.

It always answers 200 for anything it understood, including events it chose to
ignore, because a non 2xx makes Lemlist retry.

The forwarded `text` contains identifiers only, never the prospect's message.
The agent reads the real thread from Lemlist, which is authoritative, and the
fire payload is treated as untrusted input by the Routine anyway.

## Deploy

Requires the Netlify CLI and a Netlify account.

```bash
cd relay
npm install
npx netlify sites:create --name astra-reply-relay
npx netlify deploy --prod
```

Then set four environment variables on the site, either in the Netlify UI
under **Site configuration - Environment variables**, or:

```bash
npx netlify env:set LEMLIST_WEBHOOK_SECRET "<a long random string you choose>"
npx netlify env:set ROUTINE_FIRE_URL "https://api.anthropic.com/v1/claude_code/routines/<trig_id>/fire"
npx netlify env:set ROUTINE_FIRE_TOKEN "<the token from Generate token>"
```

`ROUTINE_BETA_HEADER` and `ROUTINE_API_VERSION` are optional and default to the
values documented above. Set them only if Anthropic ships a new beta header.

Never commit any of these. The fire token is shown once and cannot be
retrieved again; if it is lost, regenerate it in the Routine's API trigger
modal and update the variable.

Redeploy after setting variables so the function picks them up.

## Register the Lemlist webhooks

The MCP `create_webhook` tool does not expose the `secret` field, so register
through the REST API to include it. Two webhooks, one per activity type:

```bash
curl -X POST https://api.lemlist.com/api/hooks \
  -u ":$LEMLIST_API_KEY" \
  -H 'content-type: application/json' \
  -d '{
    "targetUrl": "https://astra-reply-relay.netlify.app/lemlist-webhook",
    "type": "linkedinReplied",
    "secret": "<the same string as LEMLIST_WEBHOOK_SECRET>"
  }'
```

Repeat with `"type": "linkedinInviteAccepted"`.

Verify with `get_webhooks`, which should list both.

## Check it works

```bash
# wrong secret must be refused
curl -s -o /dev/null -w '%{http_code}\n' -X POST \
  https://astra-reply-relay.netlify.app/lemlist-webhook \
  -H 'content-type: application/json' \
  -d '{"type":"linkedinReplied","secret":"wrong","contactId":"ctc_test"}'
# expect 401

# an ignored type is accepted and does nothing
curl -s -X POST https://astra-reply-relay.netlify.app/lemlist-webhook \
  -H 'content-type: application/json' \
  -d '{"type":"linkedinSent","secret":"<secret>","contactId":"ctc_test"}'
# expect {"ok":true,"fired":false,"reason":"type_not_firing"}
```

Do not fire a real `linkedinReplied` with a real contact id as a test unless
you want the agent to act on that conversation. Use a contact id that does not
exist; the agent will find nothing new and exit quietly.

## Keep the schedule too

Leave the hourly or twice daily schedule enabled. A webhook can be dropped,
the relay can be down, and Lemlist does not guarantee delivery. The schedule
is the safety net that catches anything the webhook missed, and it costs
almost nothing because a run with no new activity exits immediately.

## Tests

`relay/handler.test.ts` covers the decision logic: secret rejection, type
filtering, debounce behaviour including a broken store, and the guarantee that
the prospect's message body is never forwarded. Run with `npm test` from the
repository root.
