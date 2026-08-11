import type { AppConfig } from '@astra/core';
import { redactString } from '@astra/core';
import { requestJson, DEFAULT_RETRY } from '../http.js';

/**
 * Operator notification email.
 *
 * Deliberately behind an interface with a console implementation as the
 * default, so a fresh checkout notifies into the log rather than into
 * somebody's inbox.
 *
 * What is never in a notification: credentials, approval tokens that could
 * act on their own, full research dumps, or more of the prospect's
 * conversation than the operator needs to decide whether to open the
 * dashboard. The email is a pointer, not a copy of the record.
 */

export interface NotificationMessage {
  readonly to: string;
  readonly subject: string;
  /** Short, plain text. The dashboard is where detail lives. */
  readonly body: string;
  readonly severity: 'INFO' | 'WARN' | 'CRITICAL';
  /** Authenticated deep link. Following it still requires signing in. */
  readonly dashboardUrl: string;
}

export interface EmailNotifier {
  readonly name: string;
  send(message: NotificationMessage): Promise<{ ok: boolean; detail: string }>;
}

export class ConsoleEmailNotifier implements EmailNotifier {
  readonly name = 'console';
  readonly sent: NotificationMessage[] = [];

  async send(message: NotificationMessage): Promise<{ ok: boolean; detail: string }> {
    this.sent.push(message);
    console.log(
      JSON.stringify({
        level: 'info',
        msg: 'notification (console notifier, nothing was emailed)',
        severity: message.severity,
        to: message.to,
        subject: redactString(message.subject),
        dashboardUrl: message.dashboardUrl,
      }),
    );
    return { ok: true, detail: 'written to the log' };
  }
}

export class ResendEmailNotifier implements EmailNotifier {
  readonly name = 'resend';

  constructor(private readonly config: AppConfig) {}

  async send(message: NotificationMessage): Promise<{ ok: boolean; detail: string }> {
    if (!this.config.RESEND_API_KEY || !this.config.NOTIFICATION_FROM_EMAIL) {
      return { ok: false, detail: 'Resend is selected but not configured' };
    }
    try {
      await requestJson('https://api.resend.com/emails', {
        integration: 'resend',
        method: 'POST',
        headers: { authorization: `Bearer ${this.config.RESEND_API_KEY}` },
        retry: DEFAULT_RETRY,
        body: {
          from: this.config.NOTIFICATION_FROM_EMAIL,
          to: [message.to],
          subject: message.subject,
          text: `${message.body}\n\nOpen the dashboard: ${message.dashboardUrl}\n\nYou need to sign in to act on this. This email cannot approve anything on its own.`,
        },
      });
      return { ok: true, detail: 'sent' };
    } catch (error) {
      return { ok: false, detail: error instanceof Error ? error.message : String(error) };
    }
  }
}

export function buildNotifier(config: AppConfig): EmailNotifier {
  return config.EMAIL_PROVIDER === 'resend'
    ? new ResendEmailNotifier(config)
    : new ConsoleEmailNotifier();
}

export type NotificationKind =
  | 'PROTOTYPE_APPROVAL_READY'
  | 'MESSAGE_APPROVAL_READY'
  | 'HUMAN_HANDOFF'
  | 'MEETING_BOOKED'
  | 'CALENDAR_DISCONNECTED'
  | 'INTEGRATION_FAILURE'
  | 'KILL_SWITCH_ACTIVATED';

export const NOTIFICATION_SEVERITY: Record<NotificationKind, NotificationMessage['severity']> = {
  PROTOTYPE_APPROVAL_READY: 'INFO',
  MESSAGE_APPROVAL_READY: 'INFO',
  HUMAN_HANDOFF: 'WARN',
  MEETING_BOOKED: 'INFO',
  CALENDAR_DISCONNECTED: 'CRITICAL',
  INTEGRATION_FAILURE: 'CRITICAL',
  KILL_SWITCH_ACTIVATED: 'CRITICAL',
};
