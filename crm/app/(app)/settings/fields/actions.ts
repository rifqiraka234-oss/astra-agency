'use server';
/** Server actions for /settings/fields. Admin only through settingsAction. */
import { settingsAction } from '@/lib/settings/action';
import { moveField, saveField, setFieldArchived, type FieldInput } from '@/lib/settings/fields';
import { SettingsError } from '@/lib/settings/errors';
import { fail, str, type ActionState } from '@/lib/forms';

const PATHS = ['/settings/fields', '/settings/pipelines'];

/** fd.payload is the FieldInput as JSON (the editor keeps options and config in state). */
export async function saveFieldAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  let input: FieldInput;
  try {
    input = JSON.parse(String(fd.get('payload') ?? '{}'));
  } catch {
    return fail('The form could not be read, reload the page');
  }
  return settingsAction(
    async (t, user) => {
      const id = await saveField(t, input, user.id);
      return id;
    },
    { paths: PATHS, message: input.id ? 'Field saved' : 'Field added' },
  );
}

export async function archiveFieldAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  const archived = str(fd, 'archived') === 'true';
  if (!id) return fail('Pick a field');
  return settingsAction((t) => setFieldArchived(t, id, archived), { paths: PATHS, message: archived ? 'Field archived, its values are kept' : 'Field restored' });
}

export async function moveFieldAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  const dir = str(fd, 'dir');
  if (!id || (dir !== 'up' && dir !== 'down')) return fail('Pick a field');
  return settingsAction(async (t) => {
    if (!id) throw new SettingsError('Pick a field');
    await moveField(t, id, dir);
  }, { paths: PATHS });
}
