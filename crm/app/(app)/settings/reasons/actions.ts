'use server';
/** Server actions for /settings/reasons. Admin only through settingsAction. */
import { settingsAction } from '@/lib/settings/action';
import { addReason, moveReason, renameReason, setReasonArchived, REASON_TYPES } from '@/lib/settings/reasons';
import type { ReasonType } from '@/lib/reasons';
import { fail, str, type ActionState } from '@/lib/forms';

const PATHS = ['/settings/reasons', '/settings/pipelines', '/pipelines', '/leads', '/deals'];

export async function addReasonAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const type = str(fd, 'object_type') as ReasonType | null;
  if (!type || !REASON_TYPES.includes(type)) return fail('Pick a list');
  return settingsAction((t) => addReason(t, type, str(fd, 'label') ?? ''), { paths: PATHS, message: 'Reason added' });
}

export async function renameReasonAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a reason');
  return settingsAction((t) => renameReason(t, id, str(fd, 'label') ?? ''), { paths: PATHS, message: 'Reason renamed' });
}

export async function moveReasonAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  const dir = str(fd, 'dir');
  if (!id || (dir !== 'up' && dir !== 'down')) return fail('Pick a reason');
  return settingsAction((t) => moveReason(t, id, dir), { paths: PATHS });
}

export async function archiveReasonAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a reason');
  const archived = str(fd, 'archived') === 'true';
  return settingsAction((t) => setReasonArchived(t, id, archived), { paths: PATHS, message: archived ? 'Reason archived' : 'Reason restored' });
}
