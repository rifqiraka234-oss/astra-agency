'use client';
/**
 * The CSV import on /settings/import: pick the object, pick a file, map
 * columns (guessed from the headers), preview the real outcome, import.
 * The preview runs the import on the server and rolls it back, so its counts
 * are what the import will do. Skipped lines download as a CSV with reasons.
 */
import { useMemo, useState, useTransition } from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Input';
import { guessMapping, importTargets, IMPORT_OBJECTS, MATCH_WORDING, type CustomTargetDef, type ImportObject } from '@/lib/data/import-fields';
import type { ActionState } from '@/lib/forms';
import { previewImportAction, runImportAction } from '@/app/(app)/settings/import/actions';
import s from './settings.module.css';

/** Server actions take 1 MB by default. Leave room for the mapping. */
const MAX_BYTES = 900 * 1024;

type Outcome = { line: number; status: string; reason?: string; warnings?: string[] };
type Result = { counts: { rows: number; created: number; updated: number; unchanged: number; skipped: number; orgsCreated: number }; outcomes: Outcome[] };

const NOUN: Record<ImportObject, [string, string]> = {
  contacts: ['contact', 'contacts'],
  organizations: ['organization', 'organizations'],
  deals: ['deal', 'deals'],
};

function plural(n: number, [one, many]: [string, string]) {
  return `${n} ${n === 1 ? one : many}`;
}

export function ImportWizard({ customDefs }: { customDefs: Record<ImportObject, CustomTargetDef[]> }) {
  const [object, setObject] = useState<ImportObject>('contacts');
  const [fileName, setFileName] = useState('');
  const [text, setText] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [preview, setPreview] = useState<Result | null>(null);
  const [state, setState] = useState<ActionState>({ ok: false });
  const [done, setDone] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [inputKey, setInputKey] = useState(0);

  const targets = useMemo(() => importTargets(object, customDefs[object] ?? []), [object, customDefs]);
  const groups = useMemo(() => [...new Set(targets.map((t) => t.group))], [targets]);

  function changeObject(o: ImportObject) {
    setObject(o);
    setPreview(null);
    setState({ ok: false });
    if (headers.length) setMapping(guessMapping(headers, importTargets(o, customDefs[o] ?? [])));
  }

  function onFile(file: File | undefined) {
    setPreview(null);
    setState({ ok: false });
    setDone(null);
    setFileError(null);
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setFileError(`${file.name} is ${Math.round(file.size / 1024)} KB. Import up to 900 KB at a time, split the file into parts.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const t = String(reader.result ?? '');
      const res = Papa.parse<Record<string, string>>(t.replace(/^﻿/, ''), { header: true, skipEmptyLines: 'greedy', transformHeader: (h) => h.trim() });
      const hs = (res.meta.fields ?? []).filter(Boolean);
      if (!hs.length || !res.data.length) {
        setFileError('No rows found. The first line must hold the column names.');
        return;
      }
      setFileName(file.name);
      setText(t);
      setHeaders(hs);
      setRows(res.data);
      setMapping(guessMapping(hs, targets));
    };
    reader.onerror = () => setFileError('The file could not be read');
    reader.readAsText(file);
  }

  function formData(): FormData {
    const fd = new FormData();
    fd.set('object', object);
    fd.set('mapping', JSON.stringify(mapping));
    fd.set('csv', text);
    fd.set('file_name', fileName);
    return fd;
  }

  function runPreview() {
    setDone(null);
    start(async () => {
      const res = await previewImportAction({ ok: false }, formData());
      setState(res);
      setPreview(res.ok ? (res.data as Result) : null);
    });
  }

  function runImport() {
    start(async () => {
      const res = await runImportAction({ ok: false }, formData());
      setState(res);
      if (res.ok) {
        setDone(res.message ?? 'Imported');
        setPreview(null);
        setText('');
        setHeaders([]);
        setRows([]);
        setMapping({});
        setFileName('');
        setInputKey((k) => k + 1);
      }
    });
  }

  function downloadSkipped() {
    if (!preview) return;
    const byLine = new Map(rows.map((r, i) => [i + 2, r]));
    const skipped = preview.outcomes.filter((o) => o.status === 'skipped');
    const csv = Papa.unparse({
      fields: ['Line', 'Reason', ...headers],
      data: skipped.map((o) => [String(o.line), o.reason ?? '', ...headers.map((h) => byLine.get(o.line)?.[h] ?? '')]),
    });
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace(/\.csv$/i, '') || 'import'}-skipped.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const sample = (h: string) => rows.find((r) => (r[h] ?? '').trim() !== '')?.[h] ?? '';
  const mappedCount = Object.values(mapping).filter(Boolean).length;
  const usedTargets = Object.values(mapping).filter(Boolean);
  const c = preview?.counts;
  const warnings = preview?.outcomes.filter((o) => o.warnings?.length) ?? [];

  return (
    <div className="card card-pad stack">
      <h3 className="card-title" style={{ fontSize: 15 }}>
        {fileName ? `Map columns, ${fileName}` : 'Import a file'}
      </h3>

      <div role="group" aria-label="What the file holds" className={s.objects}>
        {IMPORT_OBJECTS.map((o) => (
          <button key={o.value} type="button" className="pill" aria-pressed={o.value === object} onClick={() => changeObject(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        {IMPORT_OBJECTS.find((o) => o.value === object)?.hint}
      </p>

      <Field label="CSV file" htmlFor="import-file" error={fileError} hint="UTF-8 with a header row. Export from a spreadsheet as CSV.">
        <input key={inputKey} id="import-file" type="file" accept=".csv,text/csv" className="input" style={{ paddingTop: 10 }} onChange={(e) => onFile(e.target.files?.[0])} />
      </Field>

      {headers.length ? (
        <div className="stack-sm">
          <div className="small muted">
            {rows.length} {rows.length === 1 ? 'row' : 'rows'}, {mappedCount} of {headers.length} columns mapped. Leave a column on Skip to ignore it.
          </div>
          {headers.map((h) => (
            <div key={h} className={s.mapRow}>
              <span className={s.mapCol} title={h}>
                {h}
              </span>
              <span aria-hidden="true" className={s.mapTo}>
                to
              </span>
              <select
                aria-label={`Field for column ${h}`}
                className={`select ${s.mapField}`}
                value={mapping[h] ?? ''}
                onChange={(e) => {
                  setMapping({ ...mapping, [h]: e.target.value });
                  setPreview(null);
                }}
              >
                <option value="">Skip this column</option>
                {groups.map((g) => (
                  <optgroup key={g} label={g}>
                    {targets
                      .filter((t) => t.group === g)
                      .map((t) => (
                        <option key={t.key} value={t.key} disabled={usedTargets.includes(t.key) && mapping[h] !== t.key}>
                          {g}, {t.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              {sample(h) ? <span className={s.mapSample}>For example {sample(h)}</span> : null}
            </div>
          ))}
        </div>
      ) : null}

      {state.error ? (
        <div className="form-error" role="alert">
          {state.error}
        </div>
      ) : null}
      {done ? (
        <div className="form-note" role="status" style={{ background: 'var(--tone-green-bg)', color: 'var(--tone-green-fg)' }}>
          {done}
        </div>
      ) : null}

      {c ? (
        <div className="form-note" role="status">
          Preview. {plural(c.rows, ['row', 'rows'])}, {plural(c.created, ['new ' + NOUN[object][0], 'new ' + NOUN[object][1]])}, {c.updated} update existing {MATCH_WORDING[object]}
          {c.unchanged ? `, ${c.unchanged} already up to date` : ''}
          {object !== 'organizations' && c.orgsCreated ? `, ${plural(c.orgsCreated, ['new organization', 'new organizations'])}` : ''}, {c.skipped} skipped
          {c.skipped ? ' with errors you can download' : ''}. Blank cells never wipe a value.
          {c.skipped ? (
            <div style={{ marginTop: 8 }}>
              <Button size="xs" onClick={downloadSkipped}>
                Download skipped rows
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
      {preview && (preview.outcomes.some((o) => o.status === 'skipped') || warnings.length) ? (
        <details>
          <summary className="small" style={{ cursor: 'pointer' }}>
            Show reasons
          </summary>
          <ul className="small" style={{ margin: '8px 0 0', paddingLeft: 18, maxHeight: 220, overflow: 'auto' }}>
            {preview.outcomes.slice(0, 200).map((o) => (
              <li key={o.line}>
                Line {o.line}, {o.status === 'skipped' ? o.reason : o.warnings?.join('. ')}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {headers.length ? (
        <div className="form-actions">
          <Button onClick={runPreview} pending={pending && !preview} pendingText="Checking" disabled={pending || !mappedCount}>
            Preview
          </Button>
          <Button variant="primary" onClick={runImport} disabled={pending || !preview || preview.counts.created + preview.counts.updated === 0} pending={pending && !!preview} pendingText="Importing">
            Import
          </Button>
        </div>
      ) : null}
    </div>
  );
}
