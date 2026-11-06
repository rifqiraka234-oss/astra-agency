import { sql } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { formatAgo } from '@/lib/format';
import { PERMISSION_TABLE, ROLE_LABELS } from '@/lib/permissions';
import { listTeams, listUsers } from '@/lib/settings/users';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ActionButton } from '@/components/settings/ActionButton';
import { InviteUserButton, ResetPasswordButton, UserRowForm } from '@/components/settings/UserControls';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { setActiveAction } from './actions';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Users and roles, Settings' };

export default async function UsersPage() {
  const me = await requireUser();
  const [users, teams] = await Promise.all([listUsers(sql), listTeams(sql)]);

  return (
    <>
      <PanelHeader
        title="Users and roles"
        sub="Each permission is set to all records, team records, own records or none, and every server action checks it."
        actions={<InviteUserButton teams={teams} />}
      />

      <div className="card table-wrap">
        <table className={`table ${s.wide}`}>
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Role and team</th>
              <th scope="col">Gmail</th>
              <th scope="col">Last sign in</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className={u.is_active ? undefined : 'is-muted'}>
                <td>
                  <div className="row" style={{ flexWrap: 'nowrap' }}>
                    <Avatar name={u.name} initials={u.initials ?? undefined} bg={u.avatar_bg ?? undefined} fg={u.avatar_fg ?? undefined} size="sm" />
                    <div style={{ minWidth: 0 }}>
                      <div className="strong">
                        {u.name}
                        {u.id === me.id ? <span className="muted" style={{ fontWeight: 400 }}> (you)</span> : null}
                      </div>
                      <div className="small muted" style={{ overflowWrap: 'anywhere' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {u.is_active ? (
                    <UserRowForm user={{ id: u.id, name: u.name, role: u.role, team_id: u.team_id }} teams={teams} isSelf={u.id === me.id} />
                  ) : (
                    <span>
                      {ROLE_LABELS[u.role]}
                      {u.team_name ? `, ${u.team_name}` : ''} <Badge tone="grey">Deactivated</Badge>
                    </span>
                  )}
                </td>
                <td className="small muted">Not connected</td>
                <td className="small muted nowrap">{u.last_login_at ? formatAgo(u.last_login_at) : 'Never'}</td>
                <td>
                  <div className="row" style={{ flexWrap: 'nowrap', gap: 4 }}>
                    {u.is_active ? <ResetPasswordButton user={{ id: u.id, name: u.name, email: u.email }} /> : null}
                    {u.id !== me.id ? (
                      u.is_active ? (
                        <ActionButton action={setActiveAction} fields={{ id: u.id, active: 'false' }} size="xs" variant="danger" confirm={`Deactivate ${u.name}? They are signed out on their next click. Their records keep them as owner.`} showMessage={false}>
                          Deactivate
                        </ActionButton>
                      ) : (
                        <ActionButton action={setActiveAction} fields={{ id: u.id, active: 'true' }} size="xs" showMessage={false}>
                          Reactivate
                        </ActionButton>
                      )
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card table-wrap">
        <table className={`table ${s.medium}`}>
          <caption style={{ textAlign: 'left', padding: '14px 16px 6px', fontSize: 15, fontWeight: 600 }}>What each role can do</caption>
          <thead>
            <tr>
              <th scope="col">Permission</th>
              <th scope="col">Admin</th>
              <th scope="col">Sales</th>
              <th scope="col">Account manager</th>
              <th scope="col">Client in portal</th>
            </tr>
          </thead>
          <tbody>
            {PERMISSION_TABLE.map((p) => (
              <tr key={p.permission}>
                <th scope="row" style={{ textAlign: 'left', fontWeight: 500, padding: '11px 16px', borderBottom: '1px solid var(--divider-soft)', fontSize: 14, background: 'transparent', color: 'var(--ink)', whiteSpace: 'normal' }}>
                  {p.permission}
                </th>
                <td>{p.admin}</td>
                <td>{p.sales}</td>
                <td>{p.account_manager}</td>
                <td>{p.client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small muted" style={{ margin: 0 }}>The client portal comes in V2. Gmail connects in V2, until then nothing is sent from the CRM.</p>
    </>
  );
}
