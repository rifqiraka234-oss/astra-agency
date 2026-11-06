/**
 * Form controls. Wrap any control in <Field> for the label, hint and error.
 *   <Field label="Email" htmlFor="email" error={errors.email} required>
 *     <Input id="email" name="email" type="email" invalid={!!errors.email} />
 *   </Field>
 * Classes: field, field-label, field-hint, field-error, input.
 */
import type { InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; ref?: React.Ref<HTMLInputElement> };

export function Input({ className, invalid, ...rest }: InputProps) {
  return <input className={['input', className].filter(Boolean).join(' ')} aria-invalid={invalid || undefined} {...rest} />;
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: {
  label: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      <label htmlFor={htmlFor} className={['field-label', required ? 'field-required' : ''].filter(Boolean).join(' ')}>
        {label}
      </label>
      {children}
      {error ? <span className="field-error" role="alert">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </div>
  );
}

export function Checkbox({ label, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }) {
  return (
    <label className="checkbox">
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
}
