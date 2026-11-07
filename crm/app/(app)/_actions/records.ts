'use server';
/**
 * Create actions behind the header "New" menu. Agent A owns organizations and
 * contacts and may extend these (same file, additive) or call them from its pages.
 *
 *   createOrganization(prev, fd)  name, website, industry, city, country
 *   createContact(prev, fd)       first_name, last_name, email, linkedin, job_title
 * Both return ActionState with href on success, or { duplicate } when a unique
 * rule matched (lib/dupes.ts first, the unique index as the backstop).
 */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { tx, isUniqueViolation } from '@/lib/db';
import { emit } from '@/lib/events';
import { logActivity } from '@/lib/activities';
import { emailDomain, isFreeMail, normDomain, normEmail, normLinkedin } from '@/lib/normalize';
import { blocksSave, candidateToDupeMatch, findContactByEmail, findContactByLinkedin, findContactCandidates, findOrgByDomain, type ContactCandidate } from '@/lib/dupes';
import { fail, str, zodFieldErrors, type ActionState } from '@/lib/forms';

const orgSchema = z.object({
  name: z.string({ message: 'Give the organization a name' }).trim().min(1, 'Give the organization a name').max(200),
  website: z.string().trim().max(500).nullable(),
  industry: z.string().trim().max(100).nullable(),
  city: z.string().trim().max(100).nullable(),
  country: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, 'Use a two letter country code like NL')
    .nullable(),
});

export async function createOrganization(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'organization')) return fail("You can't create organizations");
  const parsed = orgSchema.safeParse({
    name: str(fd, 'name') ?? '',
    website: str(fd, 'website'),
    industry: str(fd, 'industry'),
    city: str(fd, 'city'),
    country: str(fd, 'country'),
  });
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const input = parsed.data;

  let domain: string | null = null;
  if (input.website) {
    domain = normDomain(input.website);
    if (!domain) return fail('Check the highlighted fields', { website: 'Enter a website or domain like dekade.nl' });
    if (isFreeMail(domain)) return fail('Check the highlighted fields', { website: `${domain} is a free mail domain, leave it out` });
    const dupe = await findOrgByDomain(domain);
    if (dupe) return fail(dupe.title, { website: dupe.title }, { duplicate: dupe });
  }

  try {
    const id = await tx(
      async (t) => {
        const [org] = await t<{ id: string }[]>`
          insert into organizations (name, industry, city, country, owner_user_id, source)
          values (${input.name}, ${input.industry}, ${input.city}, ${input.country}, ${user.id}, 'manual')
          returning id`;
        if (domain) {
          await t`insert into organization_domains (organization_id, domain_normalised, is_primary) values (${org.id}, ${domain}, true)`;
        }
        await logActivity(
          { kind: 'system', title: `Organization created by ${user.name}`, actorUserId: user.id, source: 'system', links: [{ organizationId: org.id }] },
          t,
        );
        await emit(t, 'record.created', { type: 'organization', id: org.id }, { aggregateType: 'organization', aggregateId: org.id, actorUserId: user.id });
        return org.id;
      },
      { userId: user.id },
    );
    revalidatePath('/organizations');
    return { ok: true, id, href: `/organizations/${id}` };
  } catch (err) {
    if (isUniqueViolation(err)) {
      const dupe = await findOrgByDomain(domain);
      return fail(dupe?.title ?? 'That domain already belongs to an organization', { website: dupe?.title ?? 'Already in use' }, { duplicate: dupe });
    }
    throw err;
  }
}

const contactSchema = z.object({
  first_name: z.string({ message: 'Enter a first name' }).trim().min(1, 'Enter a first name').max(100),
  last_name: z.string().trim().max(100).nullable(),
  email: z.string().nullable(),
  linkedin: z.string().nullable(),
  job_title: z.string().trim().max(200).nullable(),
});

function dupeField(c: ContactCandidate, email: string | null, linkedin: string | null): string {
  if (linkedin && c.linkedin === linkedin) return 'linkedin';
  if (email && c.emails.some((e) => e.trim().toLowerCase() === email)) return 'email';
  return 'first_name';
}

export async function createContact(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'contact')) return fail("You can't create contacts");
  const parsed = contactSchema.safeParse({
    first_name: str(fd, 'first_name') ?? '',
    last_name: str(fd, 'last_name'),
    email: str(fd, 'email'),
    linkedin: str(fd, 'linkedin'),
    job_title: str(fd, 'job_title'),
  });
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const input = parsed.data;

  const errors: Record<string, string> = {};
  const email = input.email ? normEmail(input.email) : null;
  if (input.email && !email) errors.email = 'Enter an email address';
  const linkedin = input.linkedin ? normLinkedin(input.linkedin) : null;
  if (input.linkedin && !linkedin) errors.linkedin = 'Paste a profile link like linkedin.com/in/name';
  if (Object.keys(errors).length) return fail('Check the highlighted fields', errors);

  // Raka's rule (lib/dedupe.ts): name first, then LinkedIn, then email. Only a confirmed
  // duplicate, or an email or LinkedIn profile another contact holds, stops the save. A name
  // match with nothing to confirm it was shown in the form and is the person's call.
  const name = [input.first_name, input.last_name].filter(Boolean).join(' ');
  const candidates = await findContactCandidates({ name, linkedin, emails: [email] });
  const blocking = candidates.find(blocksSave);
  if (blocking) {
    const dupe = candidateToDupeMatch(blocking);
    return fail(dupe.title, { [dupeField(blocking, email, linkedin)]: dupe.title }, { duplicate: dupe });
  }

  // Link to the organization that owns the email domain, never on free mail.
  const domain = email && !isFreeMail(email) ? emailDomain(email) : null;
  const org = domain ? await findOrgByDomain(domain) : null;

  try {
    const id = await tx(
      async (t) => {
        const [c] = await t<{ id: string }[]>`
          insert into contacts (first_name, last_name, job_title, linkedin_url, linkedin_url_normalised, primary_org_id, owner_user_id, source)
          values (${input.first_name}, ${input.last_name}, ${input.job_title}, ${input.linkedin ? input.linkedin.trim() : null},
                  ${linkedin}, ${org?.id ?? null}, ${user.id}, 'manual')
          returning id`;
        if (email) await t`insert into contact_emails (contact_id, email, is_primary) values (${c.id}, ${email}, true)`;
        if (org) {
          await t`
            insert into contact_org_roles (contact_id, organization_id, relationship, title, is_primary, is_current, start_date)
            values (${c.id}, ${org.id}, 'employee', ${input.job_title}, true, true, current_date)`;
        }
        await logActivity(
          { kind: 'system', title: `Contact created by ${user.name}`, actorUserId: user.id, source: 'system', links: [{ contactId: c.id }], autoLink: false },
          t,
        );
        await emit(t, 'record.created', { type: 'contact', id: c.id, organizationId: org?.id ?? null }, { aggregateType: 'contact', aggregateId: c.id, actorUserId: user.id });
        return c.id;
      },
      { userId: user.id },
    );
    revalidatePath('/contacts');
    if (org) revalidatePath(`/organizations/${org.id}`);
    return { ok: true, id, href: `/contacts/${id}`, message: org ? `Linked to ${org.name}` : undefined };
  } catch (err) {
    if (isUniqueViolation(err)) {
      const again = (email ? await findContactByEmail(email) : null) ?? (linkedin ? await findContactByLinkedin(linkedin) : null);
      return fail(again?.title ?? 'That contact already exists', undefined, { duplicate: again });
    }
    throw err;
  }
}
