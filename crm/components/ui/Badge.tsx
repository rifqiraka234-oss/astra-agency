/**
 * <Badge tone="green">Customer</Badge>   tones: grey, blue, amber, green, red (the five status pairs)
 * <Badge tone="amber" size="lg">Sample data</Badge>
 * Classes: badge badge-<tone> (badge-lg for the record header style).
 */
import type { ReactNode } from 'react';
import type { Tone } from '@/lib/options';

export type { Tone };

export function Badge({ tone = 'grey', size = 'md', children, className, title }: { tone?: Tone; size?: 'md' | 'lg'; children: ReactNode; className?: string; title?: string }) {
  return (
    <span className={['badge', `badge-${tone}`, size === 'lg' ? 'badge-lg' : '', className].filter(Boolean).join(' ')} title={title}>
      {children}
    </span>
  );
}
