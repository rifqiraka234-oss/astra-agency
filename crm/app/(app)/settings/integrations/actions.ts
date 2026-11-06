'use server';
/** Server actions for /settings/integrations (agent E). Admin only. */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { settingsAction } from '@/lib/settings/action';
import { settingsUser, NO_SETTINGS_ACCESS } from '@/lib/settings/guard';
import { SettingsError } from '@/lib/settings/errors';
import { createApiKey, revokeApiKey } from '@/lib/integrations/api-keys';
import { syncLemlist } from '@/lib/integrations/lemlist-sync';
import { fail, str, strs, zodFieldErrors, type ActionState } from '@/lib/forms';

const PATH = '/settings/integrations';
const RUN_NOW_LIMIT = 25;

/** A limited read only pull of 25 contacts. Nothing is written to lemlist. */
export async function runLemlistSyncAction(_p: ActionState, _fd: FormData): Promise<ActionState> {
  const user = await settingsUser();
  if (!user) return fail(NO_SETTINGS_ACCESS);
  try {
    const r = await syncLemlist({ limit: RUN_NOW_LIMIT });
    revalidatePath(PATH);
    if (r.errors.length && !r.contactsSynced) return fail(`The sync failed, ${r.errors[0].error}`);
    const parts = [
      `${r.contactsSynced} contacts synced`,
      `${r.activitiesCreated} new activities`,
      r.mismatches.length ? `${r.mismatches.length} threads did not add up` : 'every thread added up',
    ];
    if (r.errors.length) parts.push(`${r.errors.length} failed`);
    return { ok: true, message: parts.join(', ') };
  } catch (err) {
    return fail(err instanceof Error ? `The sync failed, ${err.message}` : 'The sync failed');
  }
}

const keySchema = z.object({
  name: z.string().trim().min(2, 'Give the key a name, at least 2 characters').max(60, 'Keep the name under 60 characters'),
  scopes: z.array(z.string()).min(1, 'Pick at least one scope'),
});

export async function createApiKeyAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = keySchema.safeParse({ name: str(fd, 'name') ?? '', scopes: strs(fd, 'scopes') });
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  return settingsAction((t, user) => createApiKey(t, parsed.data, user.id), {
    paths: [PATH],
    message: 'Key created. Copy it now, it is not shown again.',
  });
}

export async function revokeApiKeyAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id') ?? '';
  if (!/^[0-9a-f-]{36}$/i.test(id)) return fail('Pick a key');
  return settingsAction(
    async (t) => {
      if (!(await revokeApiKey(t, id))) throw new SettingsError('That key was already revoked');
      return id;
    },
    { paths: [PATH], message: 'Key revoked' },
  );
}
