import {
  DEFAULT_SCHEDULING_CONFIG,
  loadConfig,
  parseSchedulingConfig,
  registerSecret,
  type AppConfig,
  type SchedulingConfig,
} from '@astra/core';
import {
  DisconnectedCalendarProvider,
  ExternalWriteGuard,
  FakeAnthropicClient,
  FakeCalendarProvider,
  FakeLemlistClient,
  FakeNetlifyClient,
  FakeResearchAdapter,
  GoogleCalendarProvider,
  HttpResearchAdapter,
  LiveAnthropicClient,
  LiveLemlistClient,
  LiveNetlifyClient,
  MicrosoftCalendarProvider,
  buildNotifier,
  type AnthropicClient,
  type CalendarProvider,
  type EmailNotifier,
  type LemlistClient,
  type NetlifyClient,
  type ResearchAdapter,
} from '@astra/integrations';
import { readFileSync } from 'node:fs';
import { createLogger, type Logger } from './logger.js';

/**
 * The dependency container.
 *
 * TEST mode wires the in-memory twins for every integration. That is not a
 * convenience: it is the mechanism that makes "TEST mode cannot touch
 * anything real" structurally true rather than a promise the code makes to
 * itself.
 */

export interface AppContext {
  readonly config: AppConfig;
  readonly scheduling: SchedulingConfig;
  readonly guard: ExternalWriteGuard;
  readonly logger: Logger;
  readonly lemlist: LemlistClient;
  readonly anthropic: AnthropicClient;
  readonly netlify: NetlifyClient;
  readonly calendar: CalendarProvider;
  readonly research: ResearchAdapter;
  readonly notifier: EmailNotifier;
}

export interface BuildContextOverrides {
  readonly config?: AppConfig;
  readonly scheduling?: SchedulingConfig;
  readonly lemlist?: LemlistClient;
  readonly anthropic?: AnthropicClient;
  readonly netlify?: NetlifyClient;
  readonly calendar?: CalendarProvider;
  readonly research?: ResearchAdapter;
  readonly notifier?: EmailNotifier;
  readonly logger?: Logger;
}

export function buildContext(overrides: BuildContextOverrides = {}): AppContext {
  const config = overrides.config ?? loadConfig();

  // Register every literal secret with the redactor before anything can log.
  registerSecret(config.LEMLIST_WEBHOOK_SECRET);
  registerSecret(config.LEMLIST_API_KEY);
  registerSecret(config.ANTHROPIC_API_KEY);
  registerSecret(config.NETLIFY_ACCESS_TOKEN);
  registerSecret(config.RESEND_API_KEY);
  registerSecret(config.MICROSOFT_CLIENT_SECRET);
  registerSecret(config.GOOGLE_CLIENT_SECRET);
  registerSecret(config.SESSION_SECRET);
  registerSecret(config.ENCRYPTION_KEY);

  const guard = new ExternalWriteGuard(config);
  const logger = overrides.logger ?? createLogger(config.LOG_LEVEL, { mode: config.RUNTIME_MODE });
  const isTestMode = config.RUNTIME_MODE === 'TEST';
  const scheduling = overrides.scheduling ?? loadSchedulingConfig(config, logger);

  return {
    config,
    scheduling,
    guard,
    logger,
    lemlist: overrides.lemlist ?? (isTestMode ? new FakeLemlistClient() : new LiveLemlistClient(config, guard)),
    anthropic: overrides.anthropic ?? (isTestMode ? new FakeAnthropicClient() : new LiveAnthropicClient(config)),
    netlify: overrides.netlify ?? (isTestMode ? new FakeNetlifyClient() : new LiveNetlifyClient(config, guard)),
    calendar: overrides.calendar ?? buildCalendarProvider(config, guard, isTestMode),
    research: overrides.research ?? (isTestMode ? new FakeResearchAdapter() : new HttpResearchAdapter()),
    notifier: overrides.notifier ?? buildNotifier(config),
  };
}

function buildCalendarProvider(
  config: AppConfig,
  guard: ExternalWriteGuard,
  isTestMode: boolean,
): CalendarProvider {
  if (isTestMode) return new FakeCalendarProvider();

  switch (config.CALENDAR_PROVIDER) {
    case 'google':
      // The refresh token lives encrypted in integration_connections and is
      // injected by the calendar job, which is why this constructor takes an
      // empty token: an unconnected provider must fail its queries, and a
      // failed query becomes a handoff rather than an empty busy list.
      return new GoogleCalendarProvider(
        {
          clientId: config.GOOGLE_CLIENT_ID,
          clientSecret: config.GOOGLE_CLIENT_SECRET,
          refreshToken: '',
        },
        guard,
      );
    case 'microsoft':
      return new MicrosoftCalendarProvider(
        {
          clientId: config.MICROSOFT_CLIENT_ID,
          clientSecret: config.MICROSOFT_CLIENT_SECRET,
          tenantId: config.MICROSOFT_TENANT_ID,
          refreshToken: '',
        },
        guard,
      );
    default:
      return new DisconnectedCalendarProvider();
  }
}

function loadSchedulingConfig(config: AppConfig, logger: Logger): SchedulingConfig {
  try {
    const raw = JSON.parse(readFileSync(config.SCHEDULING_CONFIG_PATH, 'utf8'));
    return parseSchedulingConfig(raw);
  } catch (error) {
    // A missing file falls back to the documented defaults, which include the
    // two recurring exclusions. A *malformed* file does not: silently
    // dropping an exclusion would book over it.
    if (isNotFound(error)) {
      logger.warn('scheduling config not found, using defaults', {
        path: config.SCHEDULING_CONFIG_PATH,
      });
      return DEFAULT_SCHEDULING_CONFIG;
    }
    throw error;
  }
}

function isNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'ENOENT';
}
