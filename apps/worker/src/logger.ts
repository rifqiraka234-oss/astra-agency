import { randomUUID } from 'node:crypto';
import { redact } from '@astra/core';

/**
 * Structured logging.
 *
 * Every line is JSON, carries a correlation id, and passes through the shared
 * redactor. There is no "log the raw response" escape hatch: if a field is
 * worth logging it is worth naming, and an unnamed blob is how a token ends
 * up in a log aggregator.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export interface Logger {
  readonly correlationId: string;
  debug(msg: string, fields?: Record<string, unknown>): void;
  info(msg: string, fields?: Record<string, unknown>): void;
  warn(msg: string, fields?: Record<string, unknown>): void;
  error(msg: string, fields?: Record<string, unknown>): void;
  child(fields: Record<string, unknown>): Logger;
}

export function newCorrelationId(): string {
  return `cor_${randomUUID()}`;
}

export function createLogger(
  minLevel: LogLevel = 'info',
  base: Record<string, unknown> = {},
  correlationId = newCorrelationId(),
): Logger {
  const write = (level: LogLevel, msg: string, fields?: Record<string, unknown>): void => {
    if (LEVEL_ORDER[level] < LEVEL_ORDER[minLevel]) return;
    const line = {
      ts: new Date().toISOString(),
      level,
      msg,
      correlationId,
      ...base,
      ...(fields ?? {}),
    };
    const output = JSON.stringify(redact(line));
    if (level === 'error' || level === 'warn') console.error(output);
    else console.log(output);
  };

  return {
    correlationId,
    debug: (msg, fields) => write('debug', msg, fields),
    info: (msg, fields) => write('info', msg, fields),
    warn: (msg, fields) => write('warn', msg, fields),
    error: (msg, fields) => write('error', msg, fields),
    child: (fields) => createLogger(minLevel, { ...base, ...fields }, correlationId),
  };
}
