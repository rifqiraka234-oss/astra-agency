'use server';
/** Server actions for /settings/duplicates. Admin only through settingsAction. */
import { sql } from '@/lib/db';
import { settingsAction } from '@/lib/settings/action';
import { settingsUser, NO_SETTINGS_ACCESS } from '@/lib/settings/guard';
import { mergeFields, mergeRecords, undoMerge, type MergeType } from '@/lib/data/merge';
import { rejectPair } from '@/lib/data/dupes-scan';
import { SettingsError } from '@/lib/settings/errors';
import { fail, str, type ActionState } from '@/lib/forms';

const PATHS = ['/settings/duplicates', '/organizations', '/contacts'];
const UUID = /^[0-9a-f-]{36}$/i;

function pairFrom(fd: FormData): { type: MergeType; a: string; b: string } {
  const type = str(fd, 'type');
  const a = str(fd, 'a') ?? '';
  const b = str(fd, 'b') ?? '';
  if ((type !== 'organization' && type !== 'contact') || !UUID.test(a) || !UUID.test(b)) throw new SettingsError('Pick two records');
  return { type, a, b };
}

/** The side by side values for the merge dialog, a is the record that stays. */
export async function loadMergeAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const user = await settingsUser();
  if (!user) return fail(NO_SETTINGS_ACCESS);
  try {
    const { type, a, b } = pairFrom(fd);
    const res = await mergeFields(sql, type, a, b);
    return { ok: true, data: { rows: res.rows } };
  } catch (e) {
    return fail(e instanceof SettingsError ? e.message : 'Could not load the two records');
  }
}

export async function mergeAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  let pair: ReturnType<typeof pairFrom>;
  let choices: Record<string, 'primary' | 'other'> = {};
  try {
    pair = pairFrom(fd);
    choices = JSON.parse(String(fd.get('choices') ?? '{}'));
  } catch (e) {
    return fail(e instanceof SettingsError ? e.message : 'The form could not be read');
  }
  return settingsAction((t, user) => mergeRecords(t, { type: pair.type, winnerId: pair.a, loserId: pair.b, choices, userId: user.id }), {
    paths: PATHS,
    message: 'Merged, activities and links moved, can be undone',
  });
}

export async function rejectPairAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  let pair: ReturnType<typeof pairFrom>;
  try {
    pair = pairFrom(fd);
  } catch (e) {
    return fail((e as Error).message);
  }
  return settingsAction((t, user) => rejectPair(t, pair.type, pair.a, pair.b, user.id), { paths: PATHS, message: 'Marked as different' });
}

export async function undoMergeAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a merge');
  return settingsAction((t, user) => undoMerge(t, id, user.id), {
    paths: PATHS,
    message: (r) => `Merge undone, ${r.moved} ${r.moved === 1 ? 'link' : 'links'} moved back${r.keptFields ? `, ${r.keptFields} edited ${r.keptFields === 1 ? 'value' : 'values'} kept` : ''}`,
  });
}
