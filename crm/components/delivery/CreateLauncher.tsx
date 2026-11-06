'use client';
/**
 * A "New ..." button that opens CreateDialog, and opens it straight away when the
 * page was reached with ?new=1 (the header New menu). Closing removes ?new=1.
 *
 *   <CreateLauncher label="New project" title="New project" fields={fields} action={createProjectAction} initialOpen={sp.new === '1'} />
 */
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CreateDialog, type CreateField } from '@/components/records/CreateDialog';
import { Button, type ButtonVariant } from '@/components/ui/Button';
import type { ActionState } from '@/lib/forms';

export function CreateLauncher({
  label,
  title,
  fields,
  action,
  initialOpen = false,
  submitLabel,
  hidden,
  variant = 'primary',
  intro,
}: {
  label: string;
  title: string;
  fields: CreateField[];
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
  initialOpen?: boolean;
  submitLabel?: string;
  hidden?: Record<string, string>;
  variant?: ButtonVariant;
  intro?: React.ReactNode;
}) {
  const [open, setOpen] = useState(initialOpen);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const close = useCallback(() => {
    setOpen(false);
    if (params.get('new')) {
      const q = new URLSearchParams(params.toString());
      q.delete('new');
      const qs = q.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  }, [params, pathname, router]);

  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <CreateDialog open={open} onClose={close} title={title} fields={fields} action={action} submitLabel={submitLabel ?? label} hidden={hidden} intro={intro} />
    </>
  );
}
