import { z } from 'zod';
import { WEEKDAYS } from '../domain/enums.js';

/**
 * Recurring availability rules live in a validated JSON document rather than
 * comma separated prose, so a typo is a load-time failure instead of a
 * silently ignored exclusion that books over the operator's standup.
 */

const timeOfDay = z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'expected HH:MM');

const windowRefinement = <T extends { start: string; end: string }>(value: T, ctx: z.RefinementCtx) => {
  if (value.start >= value.end) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `start (${value.start}) must be strictly before end (${value.end})`,
    });
  }
};

export const recurringExclusionSchema = z
  .object({
    label: z.string().min(1),
    weekday: z.enum(WEEKDAYS),
    start: timeOfDay,
    end: timeOfDay,
  })
  .strict()
  .superRefine(windowRefinement);

export const blackoutDateSchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD'),
    label: z.string().min(1),
    /** Omit both times to black out the entire day. */
    start: timeOfDay.optional(),
    end: timeOfDay.optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if ((value.start === undefined) !== (value.end === undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'start and end must be provided together, or both omitted for a full day',
      });
      return;
    }
    if (value.start !== undefined && value.end !== undefined && value.start >= value.end) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'start must be before end' });
    }
  });

export const schedulingConfigSchema = z
  .object({
    $schema: z.string().optional(),
    version: z.literal(1),
    timezone: z.string().min(1),
    workingDays: z.array(z.enum(WEEKDAYS)).min(1),
    workday: z
      .object({ start: timeOfDay, end: timeOfDay })
      .strict()
      .superRefine(windowRefinement),
    recurringExclusions: z.array(recurringExclusionSchema),
    blackoutDates: z.array(blackoutDateSchema),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!isValidTimeZone(value.timezone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timezone'],
        message: `unknown IANA time zone: ${value.timezone}`,
      });
    }
  });

export type SchedulingConfig = z.infer<typeof schedulingConfigSchema>;
export type RecurringExclusion = z.infer<typeof recurringExclusionSchema>;
export type BlackoutDate = z.infer<typeof blackoutDateSchema>;

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return true;
  } catch {
    return false;
  }
}

export function parseSchedulingConfig(raw: unknown): SchedulingConfig {
  const parsed = schedulingConfigSchema.safeParse(raw);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid scheduling configuration:\n${details}`);
  }
  return parsed.data;
}

export const DEFAULT_SCHEDULING_CONFIG: SchedulingConfig = {
  version: 1,
  timezone: 'Europe/Amsterdam',
  workingDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
  workday: { start: '09:00', end: '18:00' },
  recurringExclusions: [
    { label: 'Monday internal sync', weekday: 'MONDAY', start: '10:30', end: '11:15' },
    { label: 'Tuesday team standup', weekday: 'TUESDAY', start: '09:30', end: '10:30' },
  ],
  blackoutDates: [],
};
