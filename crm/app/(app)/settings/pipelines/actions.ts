'use server';
/** Server actions for /settings/pipelines. Admin only through settingsAction. */
import { settingsAction } from '@/lib/settings/action';
import { addRequiredField, addStage, archiveStage, moveStageOrder, removeRequiredField, restoreStage, updateStage, type StageInput } from '@/lib/settings/pipelines';
import { bool, fail, str, type ActionState } from '@/lib/forms';

const PATHS = ['/settings/pipelines', '/pipelines', '/leads', '/deals', '/projects', '/tickets'];

function stageInput(fd: FormData): StageInput {
  const num = (k: string) => {
    const v = str(fd, k);
    if (v === null) return null;
    const n = Number(v.replace(/[%\s]/g, ''));
    return Number.isFinite(n) ? n : NaN;
  };
  return {
    name: str(fd, 'name') ?? '',
    probability: num('probability'),
    state: (str(fd, 'state') ?? 'open') as StageInput['state'],
    rot_days: num('rot_days'),
    pauses_sla: bool(fd, 'pauses_sla'),
  };
}

export async function updateStageAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a stage');
  return settingsAction((t) => updateStage(t, id, stageInput(fd)), { paths: PATHS, message: 'Stage saved' });
}

export async function addStageAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const pipelineId = str(fd, 'pipeline_id');
  if (!pipelineId) return fail('Pick a pipeline');
  return settingsAction((t) => addStage(t, pipelineId, stageInput(fd)), { paths: PATHS, message: 'Stage added' });
}

export async function moveStageAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  const dir = str(fd, 'dir');
  if (!id || (dir !== 'up' && dir !== 'down')) return fail('Pick a stage');
  return settingsAction((t) => moveStageOrder(t, id, dir), { paths: PATHS });
}

export async function archiveStageAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a stage');
  const moveTo = str(fd, 'move_to');
  return settingsAction((t, user) => archiveStage(t, id, { moveToStageId: moveTo, actorId: user.id }), {
    paths: PATHS,
    message: (r) => (r.moved ? `Moved ${r.moved} ${r.moved === 1 ? 'record' : 'records'} and archived the stage` : 'Stage archived'),
  });
}

export async function restoreStageAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a stage');
  return settingsAction((t) => restoreStage(t, id), { paths: PATHS, message: 'Stage restored' });
}

export async function addRequiredAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'stage_id');
  const key = str(fd, 'field_key');
  if (!id || !key) return fail('Pick a field');
  return settingsAction((t) => addRequiredField(t, id, key), { paths: PATHS, message: 'Required field added' });
}

export async function removeRequiredAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a field');
  return settingsAction((t) => removeRequiredField(t, id), { paths: PATHS });
}
