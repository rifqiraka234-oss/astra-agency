/**
 * lib/delivery/lookups.ts, option lists for agent F's selects (organizations,
 * contacts, deals, projects, users, products). Server only, small lists.
 *
 *   const { orgs, users } = await lookups(['orgs', 'users']);
 *   <Select options={orgs} />
 */
import { sql } from '../db';
import type { Option } from '../options';

type Kind = 'orgs' | 'contacts' | 'deals' | 'projects' | 'users' | 'products';

export type Lookups = Record<Kind, Option[]> & {
  productRows: { id: string; name: string; unit_price: string; tax_rate: string; currency: string }[];
};

export async function lookups(kinds: Kind[]): Promise<Lookups> {
  const want = new Set(kinds);
  const empty = Promise.resolve([] as Option[]);
  const [orgs, contacts, deals, projects, users, productRows] = await Promise.all([
    want.has('orgs') ? sql<Option[]>`select id::text as value, name as label from organizations where deleted_at is null order by name limit 1000` : empty,
    want.has('contacts')
      ? sql<Option[]>`
          select c.id::text as value, c.full_name || coalesce(', ' || o.name, '') as label
            from contacts c left join organizations o on o.id = c.primary_org_id
           where c.deleted_at is null order by c.full_name limit 1000`
      : empty,
    want.has('deals')
      ? sql<Option[]>`
          select d.id::text as value, d.name || coalesce(', ' || o.name, '') as label
            from deals d left join organizations o on o.id = d.organization_id
           where d.deleted_at is null order by o.name nulls last, d.name limit 1000`
      : empty,
    want.has('projects')
      ? sql<Option[]>`
          select p.id::text as value, p.name || coalesce(', ' || o.name, '') as label
            from projects p left join organizations o on o.id = p.organization_id
           where p.deleted_at is null order by o.name nulls last, p.name limit 1000`
      : empty,
    want.has('users') ? sql<Option[]>`select id::text as value, name as label from users where is_active order by name` : empty,
    want.has('products')
      ? sql<Lookups['productRows']>`select id, name, unit_price, tax_rate, currency from products where is_active order by name`
      : Promise.resolve([] as Lookups['productRows']),
  ]);
  const products = productRows.map((p) => ({ value: p.id, label: p.name }));
  return { orgs, contacts, deals, projects, users, products, productRows };
}
