import { z } from 'zod';
import { RUNTIME_MODES, type RuntimeMode } from '../domain/enums.js';

/**
 * Environment parsing. Two rules drive every default in this file:
 *
 *  1. Absence of a value never enables an external write. Every live-action
 *     flag defaults to false and the kill switch defaults to ON.
 *  2. A malformed value is a startup failure, not a fallback. Silently
 *     coercing "yes" or "1" into a boolean is how a kill switch gets lost.
 */

const boolFromEnv = (defaultValue: boolean) =>
  z
    .string()
    .optional()
    .transform((raw, ctx) => {
      if (raw === undefined || raw.trim() === '') return defaultValue;
      const normalized = raw.trim().toLowerCase();
      if (normalized === 'true') return true;
      if (normalized === 'false') return false;
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `expected exactly "true" or "false", received ${JSON.stringify(raw)}`,
      });
      return z.NEVER;
    });

const intFromEnv = (defaultValue: number, min: number, max: number) =>
  z
    .string()
    .optional()
    .transform((raw, ctx) => {
      if (raw === undefined || raw.trim() === '') return defaultValue;
      const parsed = Number(raw);
      if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `expected an integer between ${min} and ${max}, received ${JSON.stringify(raw)}`,
        });
        return z.NEVER;
      }
      return parsed;
    });

const floatFromEnv = (defaultValue: number, min: number, max: number) =>
  z
    .string()
    .optional()
    .transform((raw, ctx) => {
      if (raw === undefined || raw.trim() === '') return defaultValue;
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `expected a number between ${min} and ${max}, received ${JSON.stringify(raw)}`,
        });
        return z.NEVER;
      }
      return parsed;
    });

const csvList = z
  .string()
  .optional()
  .transform((raw) =>
    (raw ?? '')
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part.length > 0),
  );

const timeOfDay = z
  .string()
  .regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'expected HH:MM in 24 hour form');

const base64Key = (bytes: number) =>
  z
    .string()
    .min(1)
    .refine((value) => {
      try {
        return Buffer.from(value, 'base64').length >= bytes;
      } catch {
        return false;
      }
    }, `expected at least ${bytes} bytes of base64 encoded key material`);

export const envSchema = z.object({
  APP_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  APP_BASE_URL: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1),
  ENCRYPTION_KEY: base64Key(32),

  RUNTIME_MODE: z.enum(RUNTIME_MODES).default('TEST'),
  GLOBAL_KILL_SWITCH: boolFromEnv(true),
  ALLOW_LIVE_LEMLIST_SEND: boolFromEnv(false),
  ALLOW_LIVE_CALENDAR_WRITE: boolFromEnv(false),
  ALLOW_LIVE_NETLIFY_DEPLOY: boolFromEnv(false),
  ALLOW_LIVE_WEBHOOK_REGISTRATION: boolFromEnv(false),
  /**
   * Importing enrichment leads into a campaign. Separate from the send flag:
   * importing into a draft campaign queues leads without sending anything, so
   * it is a different risk with a different gate.
   */
  ALLOW_LIVE_CAMPAIGN_IMPORT: boolFromEnv(false),

  ADMIN_EMAIL: z.string().email(),
  ENABLED_CAMPAIGN_IDS: csvList,
  EXPECTED_LEMLIST_TEAM_ID: z.string().min(1),

  LEMLIST_API_KEY: z.string().optional().default(''),
  LEMLIST_WEBHOOK_SECRET: z.string().min(1),
  LEMLIST_DRAFT_OWNER: z.string().optional().default(''),
  LEMLIST_SEND_USER_ID: z.string().optional().default(''),
  LEMLIST_API_BASE_URL: z.string().url().default('https://api.lemlist.com'),

  ANTHROPIC_API_KEY: z.string().optional().default(''),
  ANTHROPIC_ANALYSIS_MODEL: z.string().default('claude-sonnet-4-5-20250929'),
  ANTHROPIC_DRAFT_MODEL: z.string().default('claude-sonnet-4-5-20250929'),
  ANTHROPIC_PROTOTYPE_MODEL: z.string().default('claude-sonnet-4-5-20250929'),

  NETLIFY_ACCESS_TOKEN: z.string().optional().default(''),
  NETLIFY_TEAM_SLUG: z.string().optional().default(''),
  NETLIFY_SITE_NAME_SUFFIX: z.string().default('prototype-by-astra'),

  EMAIL_PROVIDER: z.enum(['resend', 'console']).default('console'),
  RESEND_API_KEY: z.string().optional().default(''),
  NOTIFICATION_FROM_EMAIL: z.string().optional().default(''),

  CALENDAR_PROVIDER: z.enum(['microsoft', 'google', 'none']).default('none'),
  CALENDAR_ACCOUNT_EMAIL: z.string().optional().default(''),
  MICROSOFT_CLIENT_ID: z.string().optional().default(''),
  MICROSOFT_CLIENT_SECRET: z.string().optional().default(''),
  MICROSOFT_TENANT_ID: z.string().optional().default(''),
  GOOGLE_CLIENT_ID: z.string().optional().default(''),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(''),

  OPERATOR_TIMEZONE: z.string().default('Europe/Amsterdam'),
  WORKDAY_START: timeOfDay.default('09:00'),
  WORKDAY_END: timeOfDay.default('18:00'),
  MEETING_DURATION_MINUTES: intFromEnv(20, 5, 240),
  MEETING_BUFFER_MINUTES: intFromEnv(10, 0, 120),
  MEETING_MIN_NOTICE_HOURS: intFromEnv(4, 0, 168),
  MEETING_SEARCH_BUSINESS_DAYS: intFromEnv(5, 1, 30),
  MEETING_SEARCH_BUSINESS_DAYS_MAX: intFromEnv(10, 1, 60),
  SLOT_RESERVATION_HOURS: intFromEnv(24, 1, 336),
  SCHEDULING_CONFIG_PATH: z.string().default('config/scheduling.json'),
  CALENDAR_FRESHNESS_SECONDS: intFromEnv(60, 5, 3600),

  INBOUND_DEBOUNCE_SECONDS: intFromEnv(90, 0, 3600),
  AUTO_SEND_MIN_CONFIDENCE: floatFromEnv(0.94, 0, 1),
  ACCEPTANCE_SEND_MIN_CONFIDENCE: floatFromEnv(0.96, 0, 1),
  MAX_AUTOMATED_OUTBOUND_PER_CONVERSATION: intFromEnv(3, 0, 20),
  MAX_MEANINGFUL_TURNS_BEFORE_HANDOFF: intFromEnv(8, 1, 100),
  APPROVAL_EXPIRY_HOURS: intFromEnv(72, 1, 720),

  // Retention. Decisions, predicates and hashes are kept indefinitely; the
  // prospect's personal content ages out on these schedules.
  RETENTION_RAW_WEBHOOK_DAYS: intFromEnv(90, 1, 3650),
  RETENTION_CONVERSATION_CONTENT_DAYS: intFromEnv(365, 1, 3650),
  RETENTION_SUPPRESSED_CONTENT_DAYS: intFromEnv(30, 1, 3650),

  SESSION_SECRET: base64Key(32),
  SESSION_MAX_AGE_HOURS: intFromEnv(12, 1, 168),

  WORKER_PORT: intFromEnv(3001, 1, 65535),
  WEBHOOK_MAX_BODY_BYTES: intFromEnv(1_048_576, 1024, 20_971_520),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

export interface AppConfig extends Env {
  /**
   * Convenience predicates. These are computed once so no call site can
   * accidentally check the mode without also checking the kill switch.
   */
  readonly enabledCampaignIds: ReadonlySet<string>;
  readonly isKillSwitchOn: boolean;
  readonly canWriteExternally: boolean;
  readonly canCreateDrafts: boolean;
  readonly canAutoSend: boolean;
  readonly canWriteCalendar: boolean;
  readonly canDeployPrototype: boolean;
  readonly canRegisterWebhooks: boolean;
  readonly canImportToCampaign: boolean;
}

/** Modes in which any outbound external write is conceivable at all. */
const MODES_ALLOWING_EXTERNAL_WRITE: ReadonlySet<RuntimeMode> = new Set<RuntimeMode>([
  'DRAFT_ONLY',
  'LOW_RISK_AUTO',
]);

export function buildConfig(env: Env): AppConfig {
  const killSwitch = env.GLOBAL_KILL_SWITCH;
  const modeAllowsWrite = MODES_ALLOWING_EXTERNAL_WRITE.has(env.RUNTIME_MODE);
  const canWriteExternally = !killSwitch && modeAllowsWrite;

  return {
    ...env,
    enabledCampaignIds: new Set(env.ENABLED_CAMPAIGN_IDS),
    isKillSwitchOn: killSwitch,
    canWriteExternally,
    // Drafts are a write, but a safe one: they land in Lemlist's inbox for a
    // human, they do not reach the prospect.
    canCreateDrafts: canWriteExternally,
    // An automatic send additionally requires LOW_RISK_AUTO and the explicit
    // Lemlist send flag. Both, never either.
    canAutoSend: !killSwitch && env.RUNTIME_MODE === 'LOW_RISK_AUTO' && env.ALLOW_LIVE_LEMLIST_SEND,
    canWriteCalendar: canWriteExternally && env.ALLOW_LIVE_CALENDAR_WRITE,
    canDeployPrototype: canWriteExternally && env.ALLOW_LIVE_NETLIFY_DEPLOY,
    canRegisterWebhooks: !killSwitch && env.ALLOW_LIVE_WEBHOOK_REGISTRATION,
    canImportToCampaign: canWriteExternally && env.ALLOW_LIVE_CAMPAIGN_IMPORT,
  };
}

export function loadConfig(source: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${details}`);
  }
  return buildConfig(parsed.data);
}

let cached: AppConfig | undefined;

/** Process-wide config, parsed once. Tests use `loadConfig` directly instead. */
export function config(): AppConfig {
  cached ??= loadConfig();
  return cached;
}

export function resetConfigCacheForTests(): void {
  cached = undefined;
}
