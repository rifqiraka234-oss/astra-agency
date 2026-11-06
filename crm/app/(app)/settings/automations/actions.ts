'use server';
/** Server actions for /settings/automations (agent E). Admin only. */
import { revalidatePath } from 'next/cache';
import { settingsAction } from '@/lib/settings/action';
import { settingsUser, NO_SETTINGS_ACCESS } from '@/lib/settings/guard';
import { SettingsError } from '@/lib/settings/errors';
import { runRuleNow } from '@/lib/automations/engine';
import { fail, str, type ActionState } from '@/lib/forms';

const UUID = /^[0-9a-f-]{36}$/i;

export async function setRuleEnabledAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id') ?? '';
  const enabled = str(fd, 'enabled') === 'true';
  if (!UUID.test(id)) return fail('Pick an automation');
  return settingsAction(
    async (t) => {
      const rows = await t`update automation_rules set is_enabled = ${enabled} where id = ${id} returning id`;
      if (!rows.length) throw new SettingsError('That automation no longer exists');
      return id;
    },
    { paths: ['/settings/automations'], message: enabled ? 'Turned on' : 'Turned off' },
  );
}

/** Runs a scheduled rule now, whatever the time. Its own checks stop it making anything twice. */
export async function runRuleNowAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const user = await settingsUser();
  if (!user) return fail(NO_SETTINGS_ACCESS);
  const key = str(fd, 'key') ?? '';
  try {
    const res = await runRuleNow(key, user.id);
    revalidatePath('/settings/automations');
    if (res.status === 'failed') return fail(`The run failed, ${res.error ?? 'see the history'}`);
    return { ok: true, message: res.status === 'skipped' ? `Nothing to do. ${res.note ?? ''}`.trim() : `Done, ${res.created} ${res.created === 1 ? 'change' : 'changes'}` };
  } catch (err) {
    return fail(err instanceof Error ? err.message : 'The run failed');
  }
}
