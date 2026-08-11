import { describe, expect, it } from 'vitest';
import { testConfig } from '@astra/core/testing';
import { ExternalWriteBlockedError, ExternalWriteGuard, type ExternalWrite } from './guard.js';

const ALL_WRITES: ExternalWrite[] = [
  'LEMLIST_SEND',
  'LEMLIST_DRAFT',
  'LEMLIST_PAUSE_LEAD',
  'LEMLIST_WEBHOOK_REGISTER',
  'CALENDAR_WRITE',
  'NETLIFY_DEPLOY',
];

describe('external write guard', () => {
  it('blocks every external write when the kill switch is on', () => {
    const guard = new ExternalWriteGuard(testConfig({ GLOBAL_KILL_SWITCH: 'true' }));
    for (const write of [...ALL_WRITES, 'EMAIL_NOTIFICATION' as const]) {
      expect(guard.evaluate(write).allowed, write).toBe(false);
    }
  });

  it('blocks every external write in TEST mode', () => {
    const guard = new ExternalWriteGuard(testConfig({ RUNTIME_MODE: 'TEST' }));
    for (const write of ALL_WRITES) {
      expect(guard.evaluate(write).allowed, write).toBe(false);
    }
  });

  it('blocks every prospect-affecting write in SHADOW mode but still notifies', () => {
    const guard = new ExternalWriteGuard(testConfig({ RUNTIME_MODE: 'SHADOW' }));
    for (const write of ALL_WRITES) {
      expect(guard.evaluate(write).allowed, write).toBe(false);
    }
    expect(guard.evaluate('EMAIL_NOTIFICATION').allowed).toBe(true);
  });

  it('allows drafts but not sends in DRAFT_ONLY', () => {
    const guard = new ExternalWriteGuard(
      testConfig({ RUNTIME_MODE: 'DRAFT_ONLY', ALLOW_LIVE_LEMLIST_SEND: 'false' }),
    );
    expect(guard.evaluate('LEMLIST_DRAFT').allowed).toBe(true);
    expect(guard.evaluate('LEMLIST_PAUSE_LEAD').allowed).toBe(true);
    expect(guard.evaluate('LEMLIST_SEND').allowed).toBe(false);
  });

  it('requires the live send flag even in LOW_RISK_AUTO', () => {
    const off = new ExternalWriteGuard(testConfig({ ALLOW_LIVE_LEMLIST_SEND: 'false' }));
    expect(off.evaluate('LEMLIST_SEND').allowed).toBe(false);

    const on = new ExternalWriteGuard(testConfig({ ALLOW_LIVE_LEMLIST_SEND: 'true' }));
    expect(on.evaluate('LEMLIST_SEND').allowed).toBe(true);
  });

  it('gates calendar writes, deploys and webhook registration on their own flags', () => {
    const guard = new ExternalWriteGuard(
      testConfig({
        ALLOW_LIVE_CALENDAR_WRITE: 'false',
        ALLOW_LIVE_NETLIFY_DEPLOY: 'false',
        ALLOW_LIVE_WEBHOOK_REGISTRATION: 'false',
      }),
    );
    expect(guard.evaluate('CALENDAR_WRITE').allowed).toBe(false);
    expect(guard.evaluate('NETLIFY_DEPLOY').allowed).toBe(false);
    expect(guard.evaluate('LEMLIST_WEBHOOK_REGISTER').allowed).toBe(false);

    const enabled = new ExternalWriteGuard(
      testConfig({
        ALLOW_LIVE_CALENDAR_WRITE: 'true',
        ALLOW_LIVE_NETLIFY_DEPLOY: 'true',
        ALLOW_LIVE_WEBHOOK_REGISTRATION: 'true',
      }),
    );
    expect(enabled.evaluate('CALENDAR_WRITE').allowed).toBe(true);
    expect(enabled.evaluate('NETLIFY_DEPLOY').allowed).toBe(true);
    expect(enabled.evaluate('LEMLIST_WEBHOOK_REGISTER').allowed).toBe(true);
  });

  it('throws a typed error carrying the reason code', () => {
    const guard = new ExternalWriteGuard(testConfig({ GLOBAL_KILL_SWITCH: 'true' }));
    try {
      guard.assertAllowed('LEMLIST_SEND');
      expect.unreachable('assertAllowed should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ExternalWriteBlockedError);
      expect((error as ExternalWriteBlockedError).reasonCode).toBe('KILL_SWITCH_ON');
    }
  });

  it('never allows a send in HUMAN_ONLY mode', () => {
    const guard = new ExternalWriteGuard(
      testConfig({ RUNTIME_MODE: 'HUMAN_ONLY', ALLOW_LIVE_LEMLIST_SEND: 'true' }),
    );
    expect(guard.evaluate('LEMLIST_SEND').allowed).toBe(false);
  });
});
