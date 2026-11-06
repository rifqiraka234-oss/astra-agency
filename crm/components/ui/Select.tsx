/**
 * <Select name="industry" options={INDUSTRIES} placeholder="Pick an industry" defaultValue="Retail" />
 * options are { value, label }. Class: select.
 */
import type { SelectHTMLAttributes } from 'react';

export type SelectOption = { value: string; label: string; disabled?: boolean };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly SelectOption[];
  placeholder?: string;
  invalid?: boolean;
};

export function Select({ options, placeholder, invalid, className, ...rest }: SelectProps) {
  return (
    <select className={['select', className].filter(Boolean).join(' ')} aria-invalid={invalid || undefined} {...rest}>
      {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
      {options.map((o) => (
        <option key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
