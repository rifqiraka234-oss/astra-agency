'use client';
/**
 * Merge two records. Pick the one that stays, then per field whose value it
 * keeps. Each field defaults to the staying record unless that one is empty.
 */
import { useState, useTransition } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { ActionState } from '@/lib/forms';
import type { MergeFieldRow } from '@/lib/data/merge';
import { loadMergeAction, mergeAction } from '@/app/(app)/settings/duplicates/actions';
import s from './settings.module.css';

type Side = { id: string; name: string; sub: string };

export function MergeButton({ type, a, b }: { type: 'organization' | 'contact'; a: Side; b: Side }) {
  const [open, setOpen] = useState(false);
  const [keepFirst, setKeepFirst] = useState(true);
  const [rows, setRows] = useState<MergeFieldRow[] | null>(null);
  const [choices, setChoices] = useState<Record<string, 'primary' | 'other'>>({});
  const [state, setState] = useState<ActionState>({ ok: false });
  const [pending, start] = useTransition();
  const [result, setResult] = useState<string | null>(null);

  const winner = keepFirst ? a : b;
  const loser = keepFirst ? b : a;

  function load(first: boolean) {
    const w = first ? a : b;
    const l = first ? b : a;
    const fd = new FormData();
    fd.set('type', type);
    fd.set('a', w.id);
    fd.set('b', l.id);
    setRows(null);
    start(async () => {
      const res = await loadMergeAction({ ok: false }, fd);
      if (!res.ok) {
        setState(res);
        return;
      }
      const r = (res.data as { rows: MergeFieldRow[] }).rows;
      setRows(r);
      setChoices(Object.fromEntries(r.map((x) => [x.key, x.pick])));
      setState({ ok: false });
    });
  }

  function openDialog() {
    setOpen(true);
    setKeepFirst(true);
    load(true);
  }

  function submit() {
    const fd = new FormData();
    fd.set('type', type);
    fd.set('a', winner.id);
    fd.set('b', loser.id);
    fd.set('choices', JSON.stringify(choices));
    start(async () => {
      const res = await mergeAction({ ok: false }, fd);
      setState(res);
      if (res.ok) {
        setResult(res.message ?? 'Merged');
        setOpen(false);
      }
    });
  }

  if (result) {
    return (
      <span role="status" className="small success">
        {result}
      </span>
    );
  }
  const differing = rows?.filter((r) => !r.same) ?? [];
  return (
    <>
      <Button variant="primary" size="sm" onClick={openDialog}>
        Merge
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        wide
        title={`Merge two ${type === 'organization' ? 'organizations' : 'contacts'}`}
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={submit} pending={pending && !!rows} pendingText="Merging" disabled={!rows || pending}>
              Merge into {winner.name}
            </Button>
          </>
        }
      >
        <div className="stack">
          {state.error ? (
            <div className="form-error" role="alert">
              {state.error}
            </div>
          ) : null}
          <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="field-label" style={{ marginBottom: 6 }}>
              The record that stays
            </legend>
            {[a, b].map((x, i) => (
              <label key={x.id} className={s.mergePick}>
                <input
                  type="radio"
                  name="survivor"
                  checked={keepFirst === (i === 0)}
                  onChange={() => {
                    setKeepFirst(i === 0);
                    load(i === 0);
                  }}
                />
                <span>
                  <span className="strong">{x.name}</span>
                  <span className="small muted" style={{ display: 'block' }}>
                    {x.sub}
                  </span>
                </span>
              </label>
            ))}
          </fieldset>
          {!rows ? (
            <p className="small muted" style={{ margin: 0 }}>
              Loading both records
            </p>
          ) : differing.length === 0 ? (
            <p className="small muted" style={{ margin: 0 }}>
              Every field holds the same value on both.
            </p>
          ) : (
            <div className="stack-sm">
              <div className="field-label">Where they differ, pick the value to keep</div>
              <div className={s.mergeGrid}>
                {differing.map((r) => (
                  <div key={r.key} style={{ display: 'contents' }} role="radiogroup" aria-label={r.label}>
                    <span className={`${s.mergeLabel ?? ''} small strong`}>{r.label}</span>
                    {(['primary', 'other'] as const).map((side) => {
                      const text = side === 'primary' ? r.primaryText : r.otherText;
                      return (
                        <label key={side} className={s.mergePick}>
                          <input type="radio" name={`f-${r.key}`} checked={choices[r.key] === side} onChange={() => setChoices({ ...choices, [r.key]: side })} />
                          <span className={text ? undefined : 'muted'}>{text || 'Empty'}</span>
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="form-note" style={{ margin: 0 }}>
            Emails, phones, domains, roles, activities, tasks, deals and leads of {loser.name} move to {winner.name}. {loser.name} is kept in the merge log, so the merge can be undone.
          </p>
        </div>
      </Modal>
    </>
  );
}
