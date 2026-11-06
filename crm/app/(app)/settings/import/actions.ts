'use server';
/** Server actions for /settings/import. The CSV text comes from the browser, it is parsed again here. */
import { settingsAction } from '@/lib/settings/action';
import { SettingsError } from '@/lib/settings/errors';
import { parseCsv, previewImport, revertImport, runImport, type ImportResult } from '@/lib/data/import';
import { IMPORT_OBJECTS, type ImportObject } from '@/lib/data/import-fields';
import { fail, str, type ActionState } from '@/lib/forms';

const PATHS = ['/settings/import', '/organizations', '/contacts', '/deals', '/pipelines'];

function readInput(fd: FormData) {
  const objectType = str(fd, 'object') as ImportObject | null;
  if (!objectType || !IMPORT_OBJECTS.some((o) => o.value === objectType)) throw new SettingsError('Pick what the file holds');
  let mapping: Record<string, string>;
  try {
    mapping = JSON.parse(String(fd.get('mapping') ?? '{}'));
  } catch {
    throw new SettingsError('The column mapping could not be read, reload the page');
  }
  const text = String(fd.get('csv') ?? '');
  if (!text.trim()) throw new SettingsError('The file is empty');
  const parsed = parseCsv(text);
  if (!parsed.rows.length) throw new SettingsError('The file has a header row but no data');
  return { objectType, mapping, rows: parsed.rows, fileName: str(fd, 'file_name') ?? 'import.csv' };
}

/** Keep what the page needs: skipped lines with reasons, and lines with warnings. */
function slim(r: ImportResult) {
  return {
    counts: r.counts,
    outcomes: r.outcomes.filter((o) => o.status === 'skipped' || o.warnings?.length).slice(0, 1000),
  };
}

export async function previewImportAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  let input: ReturnType<typeof readInput>;
  try {
    input = readInput(fd);
  } catch (e) {
    return fail((e as Error).message);
  }
  return settingsAction(async (t, user) => slim(await previewImport(t, { ...input, userId: user.id })), { source: 'import' });
}

export async function runImportAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  let input: ReturnType<typeof readInput>;
  try {
    input = readInput(fd);
  } catch (e) {
    return fail((e as Error).message);
  }
  return settingsAction(
    async (t, user) => {
      const r = await runImport(t, { ...input, userId: user.id });
      return { ...slim(r), jobId: r.jobId };
    },
    {
      source: 'import',
      paths: PATHS,
      message: (r) => `Imported. ${r.counts.created} created, ${r.counts.updated} updated, ${r.counts.skipped} skipped. You can revert it from the history.`,
    },
  );
}

export async function revertImportAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick an import');
  return settingsAction((t, user) => revertImport(t, id, user.id), {
    source: 'import',
    paths: PATHS,
    message: (r) =>
      `Reverted. ${r.deleted} created ${r.deleted === 1 ? 'record' : 'records'} removed, ${r.restored} ${r.restored === 1 ? 'value' : 'values'} put back${r.kept ? `, ${r.kept} kept because they changed after the import` : ''}.`,
  });
}
