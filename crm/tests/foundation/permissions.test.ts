import { describe, expect, it } from 'vitest';
import { assertCan, can, ForbiddenError, scopeFor, type PermUser } from '../../lib/permissions';

const raka: PermUser = { id: 'raka', role: 'admin', teamMemberIds: ['raka'] };
const sam: PermUser = { id: 'sam', role: 'sales', teamMemberIds: ['sam', 'sid'] };
const luna: PermUser = { id: 'luna', role: 'account_manager', teamMemberIds: ['luna', 'lars'] };

describe('role grid from the Settings design', () => {
  it('everyone views organizations and contacts', () => {
    for (const u of [raka, sam, luna]) {
      expect(can(u, 'view', 'organization')).toBe(true);
      expect(can(u, 'view', 'contact')).toBe(true);
    }
  });

  it('edit deals is all for admin, own for sales, team for account managers', () => {
    expect(scopeFor(raka, 'edit', 'deal')).toBe('all');
    expect(scopeFor(sam, 'edit', 'deal')).toBe('own');
    expect(scopeFor(luna, 'edit', 'deal')).toBe('team');
    expect(can(raka, 'edit', 'deal', { owner_user_id: 'someone' })).toBe(true);
    expect(can(sam, 'edit', 'deal', { owner_user_id: 'sam' })).toBe(true);
    expect(can(sam, 'edit', 'deal', { owner_user_id: 'sid' })).toBe(false);
    expect(can(luna, 'edit', 'deal', { owner_user_id: 'lars' })).toBe(true);
    expect(can(luna, 'edit', 'deal', { owner_user_id: 'sam' })).toBe(false);
  });

  it('unassigned records count as own', () => {
    expect(can(sam, 'edit', 'deal', { owner_user_id: null })).toBe(true);
  });

  it('only admins delete, export and change settings', () => {
    expect(can(raka, 'delete', 'organization')).toBe(true);
    expect(can(sam, 'delete', 'organization')).toBe(false);
    expect(can(luna, 'delete', 'deal')).toBe(false);
    expect(can(raka, 'export', 'contact')).toBe(true);
    expect(can(sam, 'export', 'contact')).toBe(false);
    expect(can(luna, 'manage', 'settings')).toBe(false);
    expect(can(raka, 'manage', 'settings')).toBe(true);
  });

  it('approve messages is own for sales and account managers', () => {
    expect(can(sam, 'approve', 'outbound_message', { owner_user_id: 'sam' })).toBe(true);
    expect(can(sam, 'approve', 'outbound_message', { owner_user_id: 'raka' })).toBe(false);
    expect(can(luna, 'approve', 'outbound_message', { owner_user_id: 'luna' })).toBe(true);
    expect(can(raka, 'approve', 'outbound_message', { owner_user_id: 'luna' })).toBe(true);
  });

  it('invoices, sales view only, account managers edit drafts', () => {
    expect(can(sam, 'view', 'invoice')).toBe(true);
    expect(can(sam, 'edit', 'invoice', { state: 'draft' })).toBe(false);
    expect(can(luna, 'edit', 'invoice', { state: 'draft' })).toBe(true);
    expect(can(luna, 'edit', 'invoice', { state: 'open' })).toBe(false);
    expect(can(raka, 'edit', 'invoice', { state: 'paid' })).toBe(true);
  });

  it('no user, no access', () => {
    expect(can(null, 'view', 'organization')).toBe(false);
    expect(() => assertCan(sam, 'delete', 'deal')).toThrow(ForbiddenError);
  });
});
