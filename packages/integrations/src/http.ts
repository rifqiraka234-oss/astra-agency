import { redact, redactString } from '@astra/core';

/**
 * Shared HTTP behaviour for every outbound integration call.
 *
 * Provides bounded retries with jittered backoff, a per-integration rate
 * limiter, and a circuit breaker. The breaker matters most: when Lemlist is
 * having a bad afternoon, hammering it turns a provider outage into our
 * outage, and the retry storm is what gets an API key throttled.
 *
 * Nothing here logs a header, a body containing a token, or a raw email HTML
 * payload: everything passes through the central redactor first.
 */

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly statusText: string,
    readonly bodyExcerpt: string,
    readonly url: string,
  ) {
    super(`HTTP ${status} ${statusText} for ${redactString(url)}`);
    this.name = 'HttpError';
  }

  /** 5xx and 429 are worth retrying; a 4xx means we asked for the wrong thing. */
  get retryable(): boolean {
    return this.status >= 500 || this.status === 429 || this.status === 408;
  }
}

export class CircuitOpenError extends Error {
  constructor(integration: string, readonly retryAfter: Date) {
    super(`Circuit breaker open for ${integration} until ${retryAfter.toISOString()}`);
    this.name = 'CircuitOpenError';
  }
}

export interface RetryPolicy {
  readonly maxAttempts: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
}

export const DEFAULT_RETRY: RetryPolicy = { maxAttempts: 4, baseDelayMs: 400, maxDelayMs: 8_000 };

/** No retries. Used for any call that could cause a duplicate side effect. */
export const NO_RETRY: RetryPolicy = { maxAttempts: 1, baseDelayMs: 0, maxDelayMs: 0 };

interface BreakerState {
  failures: number;
  openUntil: number;
}

const breakers = new Map<string, BreakerState>();

const BREAKER_THRESHOLD = 5;
const BREAKER_COOLDOWN_MS = 60_000;

export function resetCircuitBreakers(): void {
  breakers.clear();
}

export function circuitState(integration: string): { open: boolean; failures: number } {
  const state = breakers.get(integration);
  if (!state) return { open: false, failures: 0 };
  return { open: state.openUntil > Date.now(), failures: state.failures };
}

class RateLimiter {
  private queue: Promise<void> = Promise.resolve();
  private lastCall = 0;

  constructor(private readonly minIntervalMs: number) {}

  run<T>(work: () => Promise<T>): Promise<T> {
    const scheduled = this.queue.then(async () => {
      const wait = this.minIntervalMs - (Date.now() - this.lastCall);
      if (wait > 0) await sleep(wait);
      this.lastCall = Date.now();
    });
    this.queue = scheduled.catch(() => undefined);
    return scheduled.then(work);
  }
}

const limiters = new Map<string, RateLimiter>();

function limiterFor(integration: string, minIntervalMs: number): RateLimiter {
  let limiter = limiters.get(integration);
  if (!limiter) {
    limiter = new RateLimiter(minIntervalMs);
    limiters.set(integration, limiter);
  }
  return limiter;
}

export interface RequestOptions {
  readonly integration: string;
  readonly method?: string;
  readonly headers?: Record<string, string>;
  readonly body?: unknown;
  readonly retry?: RetryPolicy;
  readonly timeoutMs?: number;
  readonly minIntervalMs?: number;
  /** Called with a redacted description of every attempt. */
  readonly onAttempt?: (info: { attempt: number; url: string; status?: number }) => void;
}

export async function requestJson<T>(url: string, options: RequestOptions): Promise<T> {
  const {
    integration,
    method = 'GET',
    headers = {},
    body,
    retry = DEFAULT_RETRY,
    timeoutMs = 30_000,
    minIntervalMs = 100,
  } = options;

  const breaker = breakers.get(integration);
  if (breaker && breaker.openUntil > Date.now()) {
    throw new CircuitOpenError(integration, new Date(breaker.openUntil));
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= retry.maxAttempts; attempt += 1) {
    try {
      const response = await limiterFor(integration, minIntervalMs).run(async () => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
          return await fetch(url, {
            method,
            headers: {
              accept: 'application/json',
              ...(body === undefined ? {} : { 'content-type': 'application/json' }),
              ...headers,
            },
            body: body === undefined ? undefined : JSON.stringify(body),
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timer);
        }
      });

      options.onAttempt?.({ attempt, url: redactString(url), status: response.status });

      if (!response.ok) {
        const text = await safeText(response);
        const error = new HttpError(
          response.status,
          response.statusText,
          redactString(text.slice(0, 500)),
          url,
        );
        if (!error.retryable || attempt === retry.maxAttempts) {
          recordFailure(integration, error.retryable);
          throw error;
        }
        lastError = error;
        await sleep(backoffDelay(attempt, retry, response.headers.get('retry-after')));
        continue;
      }

      recordSuccess(integration);
      if (response.status === 204) return undefined as T;
      const text = await safeText(response);
      return (text.length === 0 ? undefined : JSON.parse(text)) as T;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      if (error instanceof CircuitOpenError) throw error;

      lastError = error;
      options.onAttempt?.({ attempt, url: redactString(url) });
      if (attempt === retry.maxAttempts) {
        recordFailure(integration, true);
        throw wrapNetworkError(error, url);
      }
      await sleep(backoffDelay(attempt, retry, null));
    }
  }

  throw wrapNetworkError(lastError, url);
}

function recordSuccess(integration: string): void {
  breakers.delete(integration);
}

function recordFailure(integration: string, countsTowardBreaker: boolean): void {
  if (!countsTowardBreaker) return;
  const state = breakers.get(integration) ?? { failures: 0, openUntil: 0 };
  state.failures += 1;
  if (state.failures >= BREAKER_THRESHOLD) {
    state.openUntil = Date.now() + BREAKER_COOLDOWN_MS;
    state.failures = 0;
  }
  breakers.set(integration, state);
}

/** Exponential backoff with full jitter, honouring Retry-After when present. */
export function backoffDelay(
  attempt: number,
  policy: RetryPolicy,
  retryAfterHeader: string | null,
): number {
  if (retryAfterHeader) {
    const seconds = Number(retryAfterHeader);
    if (Number.isFinite(seconds) && seconds >= 0) {
      return Math.min(seconds * 1000, policy.maxDelayMs);
    }
  }
  const ceiling = Math.min(policy.baseDelayMs * 2 ** (attempt - 1), policy.maxDelayMs);
  return Math.floor(Math.random() * ceiling);
}

function wrapNetworkError(error: unknown, url: string): Error {
  const redacted = redact(error);
  const detail =
    typeof redacted === 'object' && redacted !== null && 'message' in redacted
      ? String((redacted as { message: unknown }).message)
      : String(redacted);
  const wrapped = new Error(`Network failure calling ${redactString(url)}: ${detail}`);
  wrapped.name = 'IntegrationNetworkError';
  return wrapped;
}

async function safeText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return '';
  }
}

/**
 * Form-encoded POST, used only by OAuth token endpoints. Kept as a separate
 * function rather than a flag on `requestJson` so the JSON path has exactly
 * one body-encoding behaviour.
 */
export async function requestForm<T>(
  url: string,
  options: { integration: string; form: URLSearchParams; retry?: RetryPolicy; timeoutMs?: number },
): Promise<T> {
  const retry = options.retry ?? DEFAULT_RETRY;
  let lastError: unknown;

  for (let attempt = 1; attempt <= retry.maxAttempts; attempt += 1) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 20_000);
      let response: Response;
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
          body: options.form.toString(),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timer);
      }

      if (!response.ok) {
        const error = new HttpError(
          response.status,
          response.statusText,
          redactString((await safeText(response)).slice(0, 300)),
          url,
        );
        if (!error.retryable || attempt === retry.maxAttempts) {
          recordFailure(options.integration, error.retryable);
          throw error;
        }
        lastError = error;
        await sleep(backoffDelay(attempt, retry, response.headers.get('retry-after')));
        continue;
      }

      recordSuccess(options.integration);
      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      lastError = error;
      if (attempt === retry.maxAttempts) {
        recordFailure(options.integration, true);
        throw wrapNetworkError(error, url);
      }
      await sleep(backoffDelay(attempt, retry, null));
    }
  }

  throw wrapNetworkError(lastError, url);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
