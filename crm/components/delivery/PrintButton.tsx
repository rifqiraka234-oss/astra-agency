'use client';
/** Opens the browser print dialog. The invoice page carries a print only layout (f-print-doc). */
import { Button } from '@/components/ui/Button';

export function PrintButton({ label = 'Print' }: { label?: string }) {
  return (
    <Button onClick={() => window.print()} variant="secondary">
      {label}
    </Button>
  );
}
