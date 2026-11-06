/**
 * lib/forms.ts, the shape every server action returns, and form helpers. Pure.
 *
 *   'use server';
 *   export async function saveThing(_prev: ActionState, fd: FormData): Promise<ActionState> {
 *     const user = await requireUser();
 *     const parsed = schema.safeParse({ name: str(fd, 'name') });
 *     if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
 *     ...
 *     revalidatePath('/things');
 *     return { ok: true, id, href: `/things/${id}` };
 *   }
 *   // client: const [state, action, pending] = useActionState(saveThing, initialActionState);
 */
import type { ZodError } from 'zod';

export type DupeMatch = {
  type: 'organization' | 'contact';
  id: string;
  name: string;
  href: string;
  /** "dekade.nl is already Brouwerij De Kade" */
  title: string;
  /** Why it matched and what the record holds. */
  body: string;
};

export type ActionState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  id?: string;
  href?: string;
  message?: string;
  duplicate?: DupeMatch | null;
  data?: unknown;
};

export const initialActionState: ActionState = { ok: false };

export function fail(error: string, fieldErrors?: Record<string, string>, extra: Partial<ActionState> = {}): ActionState {
  return { ok: false, error, fieldErrors, ...extra };
}

/** Trimmed string or null for empty. */
export function str(fd: FormData, key: string): string | null {
  const v = fd.get(key);
  if (v === null || typeof v !== 'string') return null;
  const t = v.trim();
  return t === '' ? null : t;
}

/** All values for a repeated input. */
export function strs(fd: FormData, key: string): string[] {
  return fd.getAll(key).map((v) => String(v).trim()).filter(Boolean);
}

/** Checkbox value. */
export function bool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  return v === 'on' || v === 'true' || v === '1';
}

/** First message per field from a zod error. */
export function zodFieldErrors(err: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join('.') || '_';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
