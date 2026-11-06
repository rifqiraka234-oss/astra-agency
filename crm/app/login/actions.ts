'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '@/lib/auth';
import { fail, str, zodFieldErrors, type ActionState } from '@/lib/forms';

const schema = z.object({
  email: z.string({ message: 'Enter your email' }).email('Enter your email'),
  password: z.string({ message: 'Enter your password' }).min(1, 'Enter your password'),
});

export async function loginAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = schema.safeParse({ email: str(fd, 'email') ?? undefined, password: (fd.get('password') as string) || undefined });
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const res = await signIn(parsed.data.email, parsed.data.password);
  if (!res.ok) return fail(res.error);
  const next = str(fd, 'next');
  redirect(next && next.startsWith('/') && !next.startsWith('//') ? next : '/');
}
