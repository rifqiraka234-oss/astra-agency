# Prompt and policy versioning

Three things carry versions, and every decision records all three so an old
decision can always be explained by the rules that actually produced it.

| Thing | Where | Example |
| --- | --- | --- |
| Prompt version | front matter in `packages/prompts/prompts/*.md` | `conversation-analysis@1.0.0` |
| Policy version | `POLICY_VERSION` in `packages/core/src/policy/types.ts` | `2026-08-11.1` |
| Decision schema version | `DECISION_SCHEMA_VERSION` in `packages/core/src/schemas/decision.ts` | `1.0` |

## Prompts

Each prompt file starts with front matter:

```yaml
---
name: conversation-analysis
version: 1.0.0
schema: claude-decision@1.0
---
```

The loader refuses a prompt whose `name` does not match its filename or that
has no version, so a prompt cannot be silently unversioned.

Bump the version when you change wording that could change behaviour, which in
practice is any change other than a typo:

- **patch** — clarification that should not change outputs
- **minor** — new guidance, new categories, changed emphasis
- **major** — a different task, or an incompatible output shape

`versionTag` (`name@version`) is written to `model_runs.prompt_version` and to
every approval. An approval is bound to the prompt version that produced it,
so editing a prompt does not silently re-authorize a message drafted under the
old one.

Shared fragments in `prompts/shared/` are inlined at load time via
`{{SHARED:name}}`. They have no version of their own: changing one changes
every prompt that includes it, so bump the including prompts.

## Policy

`POLICY_VERSION` is a date plus a counter. Bump it whenever you change:

- the allowlisted cases or their word caps,
- any global predicate,
- a confidence threshold or a cap,
- the content checks.

The version is stored on every `decisions` row and every `approvals` row. An
approval created under one policy version is not usable under another, because
the version is part of the binding key.

Do not reuse a retired reason code for a different meaning. Reason codes are
rendered in the dashboard and exported in the audit log, so they are a public
contract; add a new one instead.

## Decision schema

Bumping `DECISION_SCHEMA_VERSION` is a breaking change: the model must emit the
new `schema_version` literal or parsing fails, which is the intended
behaviour. Ship the prompt change and the schema change together, and expect
in-flight approvals created under the old schema to be superseded rather than
migrated.

## Changing any of this safely

1. Change the prompt or policy and bump its version.
2. Add or update the test that pins the behaviour you changed.
3. Run in `SHADOW` and compare decisions against the previous version before
   letting the new one send anything.
4. Record the change in the dashboard's rollout note so the audit trail
   explains why decisions before and after a date differ.
