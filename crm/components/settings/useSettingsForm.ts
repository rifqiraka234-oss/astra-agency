'use client';
/**
 * Submit a form to a server action without React resetting it, so typed values
 * survive a validation error (see README gotchas).
 *   const { state, onSubmit, pending } = useSettingsForm(addStageAction, { onOk: () => setOpen(false) });
 *   <form onSubmit={onSubmit}>...</form>
 */
import { useState, useTransition, type FormEvent } from 'react';
import { initialActionState, type ActionState } from '@/lib/forms';

export function useSettingsForm(
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>,
  opts: { onOk?: (state: ActionState, form: HTMLFormElement) => void } = {},
) {
  const [state, setState] = useState<ActionState>(initialActionState);
  const [pending, start] = useTransition();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    start(async () => {
      const res = await action(state, fd);
      setState(res);
      if (res.ok) opts.onOk?.(res, form);
    });
  }
  return { state, setState, onSubmit, pending };
}
