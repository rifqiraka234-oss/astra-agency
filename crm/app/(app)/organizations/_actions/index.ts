'use server';
/**
 * Server actions for organizations and the record actions both record pages
 * share (notes, logged activity, tasks, email drafts, dated roles). Every
 * action returns ActionState (lib/forms.ts). The writes live in
 * lib/orgs/mutations.ts so tests can run them inside a rolled back transaction.
 */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser, type CurrentUser } from '@/lib/auth';
import { sql, tx } from '@/lib/db';
import { can } from '@/lib/permissions';
import { fail, str, strs, bool, zodFieldErrors, type ActionState } from '@/lib/forms';
import { getFieldDefinitions, parseCustomForm, validateCustom } from '@/lib/fields';
import { logActivity } from '@/lib/activities';
import { emit } from '@/lib/events';
import { createTask, type TaskType } from '@/lib/tasks';
import { amsterdamTime, fromDatetimeLocal, todayKey } from '@/lib/format';
import { labelOf, LIFECYCLE_STAGES } from '@/lib/options';
import { attempt, ORG_PATCH_KEYS, orgPatchSchema, presentValues } from '@/lib/orgs/action-util';
import {
  InputError,
  LOGGABLE_KINDS,
  RELATIONSHIPS,
  addContactRole,
  addNote,
  addOrgDomain,
  createContactAt,
  draftEmail,
  endContactRole,
  logManualActivity,
  removeOrgDomain,
  setOrgDoNotContact,
  setPrimaryDomain,
  updateOrganization,
} from '@/lib/orgs/mutations';
import { isUuid } from '@/lib/orgs/queries';

type OrgPerm = { id: string; name: string; owner_user_id: string | null; account_manager_user_id: string | null };

async function loadOrg(id: string | null): Promise<OrgPerm> {
  if (!isUuid(id)) throw new InputError('Organization not found');
  const [org] = await sql<OrgPerm[]>`
    select id, name, owner_user_id, account_manager_user_id from organizations where id = ${id} and deleted_at is null`;
  if (!org) throw new InputError('Organization not found');
  return org;
}

async function editableOrg(user: CurrentUser, id: string | null): Promise<OrgPerm> {
  const org = await loadOrg(id);
  if (!can(user, 'edit', 'organization', org)) throw new InputError("You can't edit this organization");
  return org;
}

async function editableContact(user: CurrentUser, id: string | null) {
  if (!isUuid(id)) throw new InputError('Contact not found');
  const [c] = await sql<{ id: string; full_name: string; owner_user_id: string | null; primary_org_id: string | null }[]>`
    select id, full_name, owner_user_id, primary_org_id from contacts where id = ${id} and deleted_at is null`;
  if (!c) throw new InputError('Contact not found');
  if (!can(user, 'edit', 'contact', c)) throw new InputError("You can't edit this contact");
  return c;
}

function orgPaths(id: string) {
  revalidatePath(`/organizations/${id}`);
  revalidatePath('/organizations');
}

// ---------------------------------------------------------------- properties

/** PropertiesPanel action for the organization record. Posts only the edited group's fields. */
export async function updateOrganizationProperties(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const org = await editableOrg(user, str(fd, 'id'));
    const raw = presentValues(fd, ORG_PATCH_KEYS);
    const parsed = orgPatchSchema.safeParse(raw);
    const errors: Record<string, string> = parsed.success ? {} : zodFieldErrors(parsed.error);

    const defs = await getFieldDefinitions('organization');
    const custom = validateCustom(defs, parseCustomForm(defs, fd), { partial: true });
    if (!custom.ok) for (const [k, v] of Object.entries(custom.errors)) errors[`custom.${k}`] = v;
    const dncPresent = fd.has('do_not_contact.present') || fd.has('do_not_contact');
    if (!parsed.success || Object.keys(errors).length) return fail('Check the highlighted fields', errors);

    const patch = parsed.data;
    const [before] = await sql<{ account_manager_user_id: string | null; lifecycle_stage: string; do_not_contact: boolean }[]>`
      select account_manager_user_id, lifecycle_stage, do_not_contact from organizations where id = ${org.id}`;
    await tx(
      async (t) => {
        await updateOrganization(t, org.id, patch, custom.value);
        if (dncPresent) {
          const dnc = bool(fd, 'do_not_contact');
          if (dnc !== before.do_not_contact) {
            await setOrgDoNotContact(t, org.id, dnc, user);
            await logActivity(
              { kind: 'system', title: dnc ? `Marked do not contact by ${user.name}` : `Do not contact cleared by ${user.name}`, actorUserId: user.id, source: 'system', links: [{ organizationId: org.id }] },
              t,
            );
          }
        }
        if ('account_manager_user_id' in patch && patch.account_manager_user_id !== before.account_manager_user_id) {
          const [am] = patch.account_manager_user_id
            ? await t<{ name: string }[]>`select name from users where id = ${patch.account_manager_user_id}`
            : [];
          await logActivity(
            { kind: 'system', title: am ? `Account manager set to ${am.name}` : 'Account manager removed', actorUserId: user.id, source: 'system', meta: { tags: [user.name] }, links: [{ organizationId: org.id }] },
            t,
          );
        }
        if (patch.lifecycle_stage && patch.lifecycle_stage !== before.lifecycle_stage) {
          await logActivity(
            {
              kind: 'system',
              title: `Lifecycle changed from ${labelOf(LIFECYCLE_STAGES, before.lifecycle_stage)} to ${labelOf(LIFECYCLE_STAGES, patch.lifecycle_stage)}`,
              actorUserId: user.id,
              source: 'system',
              meta: { tags: [user.name] },
              links: [{ organizationId: org.id }],
            },
            t,
          );
        }
      },
      { userId: user.id },
    );
    orgPaths(org.id);
    return { ok: true, message: 'Saved' };
  });
}

// ---------------------------------------------------------------- domains

export async function addDomainAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const org = await editableOrg(user, str(fd, 'organizationId'));
    const raw = str(fd, 'domain');
    if (!raw) return fail('Enter a domain', { domain: 'Enter a domain like dekade.nl' });
    const domain = await tx((t) => addOrgDomain(t, org.id, raw, { makePrimary: bool(fd, 'primary') }), { userId: user.id });
    orgPaths(org.id);
    return { ok: true, message: `Added ${domain}` };
  });
}

export async function removeDomainAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const org = await editableOrg(user, str(fd, 'organizationId'));
    const domainId = str(fd, 'domainId');
    if (!isUuid(domainId)) return fail('Domain not found');
    await tx((t) => removeOrgDomain(t, org.id, domainId), { userId: user.id });
    orgPaths(org.id);
    return { ok: true };
  });
}

export async function setPrimaryDomainAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const org = await editableOrg(user, str(fd, 'organizationId'));
    const domainId = str(fd, 'domainId');
    if (!isUuid(domainId)) return fail('Domain not found');
    await tx((t) => setPrimaryDomain(t, org.id, domainId), { userId: user.id });
    orgPaths(org.id);
    return { ok: true };
  });
}

// ---------------------------------------------------------------- timeline

/** The note composer on the organization timeline. */
export async function addOrganizationNote(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'activity')) return fail("You can't add notes");
  return attempt(async () => {
    const org = await loadOrg(str(fd, 'organizationId'));
    const body = str(fd, 'body') ?? '';
    if (body.length > 10000) return fail('Keep notes under 10,000 characters');
    await tx(
      (t) => addNote(t, { body, actor: user, links: [{ organizationId: org.id }], recordType: 'organization', recordId: org.id, recordName: org.name, url: `/organizations/${org.id}` }),
      { userId: user.id },
    );
    orgPaths(org.id);
    return { ok: true };
  });
}

const logSchema = z.object({
  kind: z.enum(LOGGABLE_KINDS, { message: 'Pick what happened' }),
  direction: z.enum(['outbound', 'inbound', 'internal']).default('outbound'),
  occurred_at: z.date({ message: 'Pick when it happened' }),
  title: z.string().trim().max(300).nullable(),
  body: z.string().trim().max(10000).nullable(),
});

/** "Log activity" on either record page. Links to the organization and/or contact passed. */
export async function logActivityAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'activity')) return fail("You can't log activity");
  return attempt(async () => {
    const parsed = logSchema.safeParse({
      kind: str(fd, 'kind'),
      direction: str(fd, 'direction') ?? undefined,
      occurred_at: fromDatetimeLocal(str(fd, 'occurred_at')) ?? new Date(),
      title: str(fd, 'title'),
      body: str(fd, 'body'),
    });
    if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
    const orgId = str(fd, 'organizationId');
    const contactId = str(fd, 'contactId');
    const org = isUuid(orgId) ? await loadOrg(orgId) : null;
    const contact = isUuid(contactId) ? (await sql<{ id: string }[]>`select id from contacts where id = ${contactId} and deleted_at is null`)[0] : null;
    if (!org && !contact) return fail('Nothing to log this on');
    await tx(
      (t) =>
        logManualActivity(t, {
          ...parsed.data,
          occurredAt: parsed.data.occurred_at,
          actor: user,
          links: [...(contact ? [{ contactId: contact.id }] : []), ...(org ? [{ organizationId: org.id }] : [])],
        }),
      { userId: user.id },
    );
    if (org) orgPaths(org.id);
    if (contact) revalidatePath(`/contacts/${contact.id}`);
    return { ok: true, message: 'Logged' };
  });
}

const TASK_TYPE_VALUES = ['todo', 'call', 'email', 'linkedin', 'meeting', 'meeting_prep', 'checkin', 'research', 'invoice', 'renewal'] as const;
const taskSchema = z.object({
  title: z.string({ message: 'Give the task a title' }).trim().min(1, 'Give the task a title').max(300),
  type: z.enum(TASK_TYPE_VALUES).default('todo'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  owner: z.string().uuid().nullable(),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Pick a date').nullable(),
  due_time: z.string().regex(/^\d{2}:\d{2}$/, 'Pick a time').nullable(),
  body: z.string().trim().max(5000).nullable(),
});

/** "New task" on either record page, linked to the organization and/or contact. */
export async function createRecordTask(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'task')) return fail("You can't create tasks");
  return attempt(async () => {
    const parsed = taskSchema.safeParse({
      title: str(fd, 'title') ?? '',
      type: str(fd, 'type') ?? undefined,
      priority: str(fd, 'priority') ?? undefined,
      owner: str(fd, 'owner'),
      due_date: str(fd, 'due_date'),
      due_time: str(fd, 'due_time'),
      body: str(fd, 'body'),
    });
    if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
    const p = parsed.data;
    const orgId = str(fd, 'organizationId');
    const contactId = str(fd, 'contactId');
    const links = [
      ...(isUuid(orgId) ? [{ organizationId: (await loadOrg(orgId)).id }] : []),
      ...(isUuid(contactId) ? [{ contactId }] : []),
    ];
    if (!links.length) return fail('Nothing to link the task to');
    const dueAt = p.due_date ? amsterdamTime(p.due_date, p.due_time ?? '09:00') : null;
    await createTask(
      {
        title: p.title,
        body: p.body,
        type: p.type as TaskType,
        priority: p.priority,
        dueAt,
        allDay: Boolean(p.due_date && !p.due_time),
        ownerUserId: p.owner,
        createdBy: user.id,
        links,
      },
      undefined,
    );
    if (isUuid(orgId)) orgPaths(orgId);
    if (isUuid(contactId)) revalidatePath(`/contacts/${contactId}`);
    revalidatePath('/tasks');
    return { ok: true, message: 'Task created' };
  });
}

/** "Write email": a draft in the approval queue. Nothing sends from V1. */
export async function draftEmailAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'outbound_message')) return fail("You can't draft messages");
  return attempt(async () => {
    const contactId = str(fd, 'contactId');
    if (!isUuid(contactId)) return fail('Pick who it goes to', { contactId: 'Pick who it goes to' });
    const subject = str(fd, 'subject');
    const body = str(fd, 'body');
    const errors: Record<string, string> = {};
    if (!subject) errors.subject = 'Add a subject';
    if (!body) errors.body = 'Write the email';
    if (Object.keys(errors).length) return fail('Check the highlighted fields', errors);
    const orgId = str(fd, 'organizationId');
    await tx(
      (t) => draftEmail(t, { contactId, organizationId: isUuid(orgId) ? orgId : null, subject: subject!, body: body!.slice(0, 20000), actor: user }),
      { userId: user.id },
    );
    revalidatePath('/approvals');
    if (isUuid(orgId)) revalidatePath(`/organizations/${orgId}`);
    revalidatePath(`/contacts/${contactId}`);
    return { ok: true, message: 'Saved to the approval queue. Nothing is sent until someone approves it.' };
  });
}

// ---------------------------------------------------------------- roles

const roleSchema = z.object({
  relationship: z.enum(RELATIONSHIPS).default('employee'),
  title: z.string().trim().max(200).nullable(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Pick a date').nullable(),
});

/**
 * Link a contact to an organization with a role and a start date. From the
 * organization page: mode "existing" (contactId) or "new" (first_name, last_name,
 * email). From the contact page: organizationId is picked, contactId is fixed.
 */
export async function addRoleAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const parsed = roleSchema.safeParse({
      relationship: str(fd, 'relationship') ?? undefined,
      title: str(fd, 'title'),
      start_date: str(fd, 'start_date'),
    });
    if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
    const organizationId = str(fd, 'organizationId');
    if (!isUuid(organizationId)) return fail('Pick an organization', { organizationId: 'Pick an organization' });
    const org = await editableOrg(user, organizationId);
    const base = {
      organizationId: org.id,
      relationship: parsed.data.relationship,
      buyingRoles: strs(fd, 'buying_roles'),
      title: parsed.data.title,
      startDate: parsed.data.start_date,
      isPrimary: bool(fd, 'is_primary'),
    };
    let contactId: string;
    if (str(fd, 'mode') === 'new') {
      if (!can(user, 'create', 'contact')) return fail("You can't create contacts");
      const first = str(fd, 'first_name');
      if (!first) return fail('Check the highlighted fields', { first_name: 'Enter a first name' });
      contactId = await tx(
        async (t) => {
          const id = await createContactAt(t, { ...base, firstName: first, lastName: str(fd, 'last_name'), email: str(fd, 'email'), linkedin: null, ownerUserId: user.id });
          await logActivity({ kind: 'system', title: `Contact created by ${user.name}`, actorUserId: user.id, source: 'system', links: [{ contactId: id }, { organizationId: org.id }], autoLink: false }, t);
          await emit(t, 'record.created', { type: 'contact', id, organizationId: org.id }, { aggregateType: 'contact', aggregateId: id, actorUserId: user.id });
          return id;
        },
        { userId: user.id },
      );
    } else {
      const picked = str(fd, 'contactId');
      if (!isUuid(picked)) return fail('Pick a contact', { contactId: 'Pick a contact' });
      const c = await editableContact(user, picked);
      contactId = c.id;
      await tx((t) => addContactRole(t, { ...base, contactId }), { userId: user.id });
    }
    orgPaths(org.id);
    revalidatePath(`/contacts/${contactId}`);
    revalidatePath('/contacts');
    return { ok: true, id: contactId, message: 'Role added' };
  });
}

/** End a role with an end date. History stays, the contact moves on. */
export async function endRoleAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  return attempt(async () => {
    const roleId = str(fd, 'roleId');
    if (!isUuid(roleId)) return fail('Role not found');
    const [role] = await sql<{ organization_id: string; contact_id: string }[]>`
      select organization_id, contact_id from contact_org_roles where id = ${roleId}`;
    if (!role) return fail('Role not found');
    await editableOrg(user, role.organization_id);
    const endDate = str(fd, 'end_date') ?? todayKey();
    await tx(
      async (t) => {
        await endContactRole(t, roleId, endDate);
        const [x] = await t<{ full_name: string; org_name: string }[]>`
          select c.full_name, o.name as org_name from contacts c, organizations o where c.id = ${role.contact_id} and o.id = ${role.organization_id}`;
        await logActivity(
          { kind: 'system', title: `${x.full_name} left ${x.org_name}`, body: `Role ended on ${endDate}.`, actorUserId: user.id, source: 'system', meta: { tags: [user.name] }, links: [{ contactId: role.contact_id }, { organizationId: role.organization_id }], autoLink: false },
          t,
        );
      },
      { userId: user.id },
    );
    orgPaths(role.organization_id);
    revalidatePath(`/contacts/${role.contact_id}`);
    return { ok: true, message: 'Role ended' };
  });
}
