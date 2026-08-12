import { NextResponse } from 'next/server';
import { getPool } from '@astra/db';
import { redact } from '@astra/core';
import { currentSession } from '@/lib/auth';

/**
 * Full audit export as newline-delimited JSON. Authenticated, and every
 * payload passes through the redactor again on the way out: defence in depth
 * against a value that reached the table before a redaction rule existed.
 */
export async function GET(): Promise<NextResponse> {
  if (!(await currentSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const rows = await getPool().query(
    `SELECT occurred_at, actor, action, reason_code, conversation_id, correlation_id, payload
     FROM audit_events ORDER BY occurred_at`,
  );

  const body = rows.rows.map((row) => JSON.stringify(redact(row))).join('\n');

  return new NextResponse(body, {
    headers: {
      'content-type': 'application/x-ndjson',
      'content-disposition': `attachment; filename="astra-audit-${new Date().toISOString().slice(0, 10)}.jsonl"`,
      'cache-control': 'no-store',
    },
  });
}
