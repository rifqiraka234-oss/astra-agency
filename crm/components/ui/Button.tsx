/**
 * <Button variant="primary|secondary|accent|ghost|danger" size="md|sm|xs" block>Save</Button>
 * <ButtonLink href="/deals/new" variant="secondary">New deal</ButtonLink>
 * Classes: btn btn-<variant> btn-<size>. Primary is the dark button, accent the orange one.
 */
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'sm' | 'xs';

export function buttonClass(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md', block = false, extra = ''): string {
  return ['btn', `btn-${variant}`, size !== 'md' ? `btn-${size}` : '', block ? 'btn-block' : '', extra].filter(Boolean).join(' ');
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  /** Shows this text and disables the button, for pending server actions. */
  pending?: boolean;
  pendingText?: string;
};

export function Button({ variant = 'secondary', size = 'md', block, pending, pendingText, className, children, type = 'button', disabled, ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, size, block, className)} disabled={disabled || pending} aria-busy={pending || undefined} {...rest}>
      {pending && pendingText ? pendingText : children}
    </button>
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  children: ReactNode;
};

export function ButtonLink({ href, variant = 'secondary', size = 'md', block, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, size, block, className)} {...rest}>
      {children}
    </Link>
  );
}
