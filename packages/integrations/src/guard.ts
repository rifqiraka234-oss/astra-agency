import type { AppConfig } from '@astra/core';
import { REASON_CODES, type ReasonCode } from '@astra/core';

/**
 * The last line of defence between a typed adapter and a real external write.
 *
 * Every adapter method that changes something outside this process calls
 * `assertAllowed` first. That means a bug in the controller, a mis-wired job,
 * or a future contributor calling a client directly still cannot send a
 * message while the kill switch is on. The guard is deliberately dumb and
 * total: it knows nothing about conversations, only about flags.
 */

export type ExternalWrite =
  | 'LEMLIST_SEND'
  | 'LEMLIST_DRAFT'
  | 'LEMLIST_PAUSE_LEAD'
  | 'LEMLIST_WEBHOOK_REGISTER'
  | 'LEMLIST_CAMPAIGN_IMPORT'
  | 'CALENDAR_WRITE'
  | 'NETLIFY_DEPLOY'
  | 'EMAIL_NOTIFICATION';

export class ExternalWriteBlockedError extends Error {
  constructor(
    readonly write: ExternalWrite,
    readonly reasonCode: ReasonCode,
    detail: string,
  ) {
    super(`External write ${write} blocked: ${detail}`);
    this.name = 'ExternalWriteBlockedError';
  }
}

export interface GuardVerdict {
  readonly allowed: boolean;
  readonly reasonCode: ReasonCode | null;
  readonly detail: string;
}

export class ExternalWriteGuard {
  constructor(private readonly config: AppConfig) {}

  evaluate(write: ExternalWrite): GuardVerdict {
    const config = this.config;

    if (config.isKillSwitchOn) {
      return {
        allowed: false,
        reasonCode: REASON_CODES.KILL_SWITCH_ON,
        detail: 'GLOBAL_KILL_SWITCH is on.',
      };
    }

    // TEST and SHADOW never write. HUMAN_ONLY may still notify the operator,
    // because a notification is how a human finds out there is work to do.
    const mode = config.RUNTIME_MODE;
    if (mode === 'TEST' || mode === 'SHADOW') {
      if (write === 'EMAIL_NOTIFICATION' && mode === 'SHADOW') {
        return { allowed: true, reasonCode: null, detail: 'Operator notification in SHADOW mode.' };
      }
      return {
        allowed: false,
        reasonCode: REASON_CODES.MODE_DISALLOWS_SEND,
        detail: `Runtime mode ${mode} blocks all external writes.`,
      };
    }

    switch (write) {
      case 'LEMLIST_SEND':
        if (mode !== 'LOW_RISK_AUTO' && mode !== 'DRAFT_ONLY') {
          return {
            allowed: false,
            reasonCode: REASON_CODES.MODE_DISALLOWS_SEND,
            detail: `Runtime mode ${mode} does not permit sending.`,
          };
        }
        if (!config.ALLOW_LIVE_LEMLIST_SEND) {
          return {
            allowed: false,
            reasonCode: REASON_CODES.LIVE_SEND_FLAG_OFF,
            detail: 'ALLOW_LIVE_LEMLIST_SEND is false.',
          };
        }
        return { allowed: true, reasonCode: null, detail: 'Sending is enabled.' };

      case 'LEMLIST_DRAFT':
      case 'LEMLIST_PAUSE_LEAD':
        // Drafts and pauses are safe writes: neither reaches the prospect, and
        // pausing is how the system avoids a duplicate send.
        return config.canCreateDrafts
          ? { allowed: true, reasonCode: null, detail: 'Non-prospect-facing write is permitted.' }
          : {
              allowed: false,
              reasonCode: REASON_CODES.MODE_DISALLOWS_SEND,
              detail: `Runtime mode ${mode} does not permit writes.`,
            };

      case 'LEMLIST_CAMPAIGN_IMPORT':
        // An import does not send: the destination campaign may be in draft,
        // in which case leads queue and nothing reaches a prospect. It is
        // still a write into a live account, so it has its own flag.
        return config.canImportToCampaign
          ? { allowed: true, reasonCode: null, detail: 'Campaign import is enabled.' }
          : {
              allowed: false,
              reasonCode: REASON_CODES.LIVE_SEND_FLAG_OFF,
              detail: 'ALLOW_LIVE_CAMPAIGN_IMPORT is false.',
            };

      case 'LEMLIST_WEBHOOK_REGISTER':
        return config.canRegisterWebhooks
          ? { allowed: true, reasonCode: null, detail: 'Webhook registration is enabled.' }
          : {
              allowed: false,
              reasonCode: REASON_CODES.LIVE_WEBHOOK_FLAG_OFF,
              detail: 'ALLOW_LIVE_WEBHOOK_REGISTRATION is false.',
            };

      case 'CALENDAR_WRITE':
        return config.canWriteCalendar
          ? { allowed: true, reasonCode: null, detail: 'Calendar writes are enabled.' }
          : {
              allowed: false,
              reasonCode: REASON_CODES.LIVE_CALENDAR_FLAG_OFF,
              detail: 'ALLOW_LIVE_CALENDAR_WRITE is false or the mode blocks writes.',
            };

      case 'NETLIFY_DEPLOY':
        return config.canDeployPrototype
          ? { allowed: true, reasonCode: null, detail: 'Prototype deploys are enabled.' }
          : {
              allowed: false,
              reasonCode: REASON_CODES.LIVE_DEPLOY_FLAG_OFF,
              detail: 'ALLOW_LIVE_NETLIFY_DEPLOY is false or the mode blocks writes.',
            };

      case 'EMAIL_NOTIFICATION':
        // Notifying the operator is never gated behind a live-action flag:
        // suppressing the alert would make the safe modes less safe.
        return { allowed: true, reasonCode: null, detail: 'Operator notification.' };

      default: {
        const exhaustive: never = write;
        return {
          allowed: false,
          reasonCode: REASON_CODES.MODE_DISALLOWS_SEND,
          detail: `Unknown external write ${String(exhaustive)}; refusing by default.`,
        };
      }
    }
  }

  assertAllowed(write: ExternalWrite): void {
    const verdict = this.evaluate(write);
    if (!verdict.allowed) {
      throw new ExternalWriteBlockedError(
        write,
        verdict.reasonCode ?? REASON_CODES.MODE_DISALLOWS_SEND,
        verdict.detail,
      );
    }
  }
}
