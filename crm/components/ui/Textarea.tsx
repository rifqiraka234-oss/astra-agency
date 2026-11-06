/** <Textarea name="body" rows={3} placeholder="Add a note" />. Class: textarea. */
import type { TextareaHTMLAttributes } from 'react';

export function Textarea({ className, invalid, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return <textarea className={['textarea', className].filter(Boolean).join(' ')} aria-invalid={invalid || undefined} {...rest} />;
}
