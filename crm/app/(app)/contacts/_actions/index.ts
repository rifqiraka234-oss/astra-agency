'use server';
/**
 * Server actions for the contact record: properties (with LinkedIn and do not
 * contact), emails, phones and the note composer. Roles, tasks, logged
 * activity and email drafts use the shared actions in
 * app/(app)/organizations/_actions.
 */
import { revalidatePath } from 'next/cache';
import { requireUser, type CurrentUser } from '@/lib/auth';
import { sql, tx } from '@/lib/db';
import { can } from '@/lib/permissions';
import { bool, fail, str, zodFieldErrors, type ActionState } from '@/lib/forms';
import { getFieldDefinitions, parseCustomForm, validateCustom } from '@/lib/fields';
import { logActivity } from '@/lib/activities';
import { attempt, CONTACT_PATCH_KEYS, contactPatchSchema, presentValues } from '@/lib/orgs/action-util';
import {
  EMAIL_TYPES,
  InputError,
  PHONE_TYPES,
  addContactEmail,
  addContactPhone,
  addNote,
  removeContactEmail,
  removeContactPhone,
  setContactDoNotContact,
  setContactLinkedin,
  setPrimaryEmail,
  setPrimaryPhone,
  updateContact,
} from '@/lib/orgs/mutations';
import { isUuid } from '@/lib/orgs/queries';

type ContactPerm = { id: string; full_name: string; owner_user_id: string | null; primary_org_id: string | null; do_not_contact: boolean };

async function loadContact(id: string | null): Promise<ContactPerm> {
  if (!isUuid(id)) throw new InputError('Contact not found');
  const [c] = await sql<ContactPerm[]>`
    select id, full_name, owner_user_id, primary_org_id, do_not_contact from contacts where id = ${id} and deleted_at is null`;
  if (!c) throw new InputError('Contact not found');
  return c;
}

async function editableContact(user: CurrentUser, id: string | null): Promise<ContactPerm> {
  const c = await loadContact(id);
  if (!can(user, 'edit', 'contact', c)) throw new InputError("You can't edit this contact");
  return c;
}

function contactPaths(c: ContactPerm) {
  revalidatePath(`/contacts/${c.id}`);
  revalidatePath('/contacts');
  if (c.primary_org_id) revalidatePath(`/organizations/${c.primary_org_id}`);
}

/** PropertiesPanel action for the contact record. */
export async function updateContactProperties(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const c = await editableContact(user, str(fd, 'id'));
    const parsed = contactPatchSchema.safeParse(presentValues(fd, CONTACT_PATCH_KEYS));
    const errors: Record<string, string> = parsed.success ? {} : zodFieldErrors(parsed.error);
    const defs = await getFieldDefinitions('contact');
    const custom = validateCustom(defs, parseCustomForm(defs, fd), { partial: true });
    if (!custom.ok) for (const [k, v] of Object.entries(custom.errors)) errors[`custom.${k}`] = v;
    if (!parsed.success || Object.keys(errors).length) return fail('Check the highlighted fields', errors);

    const dncPresent = fd.has('do_not_contact.present') || fd.has('do_not_contact');
    await tx(
      async (t) => {
        await updateContact(t, c.id, parsed.data, custom.value);
        if (fd.has('linkedin_url')) await setContactLinkedin(t, c.id, str(fd, 'linkedin_url'));
        if (dncPresent) {
          const dnc = bool(fd, 'do_not_contact');
          if (dnc !== c.do_not_contact) {
            await setContactDoNotContact(t, c.id, dnc, user);
            await logActivity(
              {
                kind: 'system',
                title: dnc ? `Marked do not contact by ${user.name}` : `Do not contact cleared by ${user.name}`,
                body: dnc ? 'Added to the suppression list with every email and the LinkedIn profile.' : 'Removed from the suppression list.',
                actorUserId: user.id,
                source: 'system',
                links: [{ contactId: c.id }],
                autoLink: false,
              },
              t,
            );
          }
        }
      },
      { userId: user.id },
    );
    contactPaths(c);
    return { ok: true, message: 'Saved' };
  });
}

export async function addContactNote(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'activity')) return fail("You can't add notes");
  return attempt(async () => {
    const c = await loadContact(str(fd, 'contactId'));
    const body = str(fd, 'body') ?? '';
    if (body.length > 10000) return fail('Keep notes under 10,000 characters');
    await tx(
      (t) => addNote(t, { body, actor: user, links: [{ contactId: c.id }], recordType: 'contact', recordId: c.id, recordName: c.full_name, url: `/contacts/${c.id}` }),
      { userId: user.id },
    );
    contactPaths(c);
    return { ok: true };
  });
}

// ---------------------------------------------------------------- emails

export async function addEmailAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const c = await editableContact(user, str(fd, 'contactId'));
    const raw = str(fd, 'email');
    if (!raw) return fail('Enter an email address', { email: 'Enter an email address' });
    const typeRaw = str(fd, 'type') ?? 'work';
    const type = (EMAIL_TYPES as readonly string[]).includes(typeRaw) ? (typeRaw as (typeof EMAIL_TYPES)[number]) : 'work';
    const email = await tx((t) => addContactEmail(t, c.id, raw, { type, makePrimary: bool(fd, 'primary') }), { userId: user.id });
    contactPaths(c);
    return { ok: true, message: `Added ${email}` };
  });
}

export async function removeEmailAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const c = await editableContact(user, str(fd, 'contactId'));
    const id = str(fd, 'emailId');
    if (!isUuid(id)) return fail('Email not found');
    await tx((t) => removeContactEmail(t, c.id, id), { userId: user.id });
    contactPaths(c);
    return { ok: true };
  });
}

export async function setPrimaryEmailAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const c = await editableContact(user, str(fd, 'contactId'));
    const id = str(fd, 'emailId');
    if (!isUuid(id)) return fail('Email not found');
    await tx((t) => setPrimaryEmail(t, c.id, id), { userId: user.id });
    contactPaths(c);
    return { ok: true };
  });
}

// ---------------------------------------------------------------- phones

export async function addPhoneAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const c = await editableContact(user, str(fd, 'contactId'));
    const raw = str(fd, 'phone');
    if (!raw) return fail('Enter a phone number', { phone: 'Enter a phone number' });
    const typeRaw = str(fd, 'type') ?? 'mobile';
    const type = (PHONE_TYPES as readonly string[]).includes(typeRaw) ? (typeRaw as (typeof PHONE_TYPES)[number]) : 'mobile';
    await tx((t) => addContactPhone(t, c.id, raw, { type, makePrimary: bool(fd, 'primary') }), { userId: user.id });
    contactPaths(c);
    return { ok: true, message: 'Phone added' };
  });
}

export async function removePhoneAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const c = await editableContact(user, str(fd, 'contactId'));
    const id = str(fd, 'phoneId');
    if (!isUuid(id)) return fail('Phone not found');
    await tx((t) => removeContactPhone(t, c.id, id), { userId: user.id });
    contactPaths(c);
    return { ok: true };
  });
}

export async function setPrimaryPhoneAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const c = await editableContact(user, str(fd, 'contactId'));
    const id = str(fd, 'phoneId');
    if (!isUuid(id)) return fail('Phone not found');
    await tx((t) => setPrimaryPhone(t, c.id, id), { userId: user.id });
    contactPaths(c);
    return { ok: true };
  });
}
