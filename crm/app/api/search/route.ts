/**
 * GET /api/search?q=dekade -> { results: [{ type, id, title, subtitle, href }] }
 * Organizations by name or domain, contacts by name or email, deals by name.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { normDomain } from '@/lib/normalize';
import { formatMoney } from '@/lib/format';

export type SearchResult = { type: 'organization' | 'contact' | 'deal'; id: string; title: string; subtitle: string; href: string };

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  const q = (req.nextUrl.searchParams.get('q') ?? '').trim().slice(0, 100);
  if (q.length < 2) return NextResponse.json({ results: [] });
  const like = `%${q.replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
  const domain = normDomain(q);

  const [orgs, contacts, deals] = await Promise.all([
    sql<{ id: string; name: string; domain: string | null; city: string | null }[]>`
      select o.id, o.name,
             (select d.domain_normalised from organization_domains d where d.organization_id = o.id order by d.is_primary desc limit 1) as domain,
             o.city
        from organizations o
       where o.deleted_at is null
         and (o.name ilike ${like}
              or exists (select 1 from organization_domains d where d.organization_id = o.id
                          and (d.domain_normalised ilike ${like} or d.domain_normalised = ${domain ?? ''})))
       order by (o.name ilike ${q + '%'}) desc, o.name
       limit 6`,
    sql<{ id: string; full_name: string; email: string | null; org: string | null; job_title: string | null }[]>`
      select c.id, c.full_name,
             (select e.email from contact_emails e where e.contact_id = c.id order by e.is_primary desc limit 1) as email,
             o.name as org, c.job_title
        from contacts c left join organizations o on o.id = c.primary_org_id
       where c.deleted_at is null
         and (c.full_name ilike ${like}
              or exists (select 1 from contact_emails e where e.contact_id = c.id and e.email ilike ${like}))
       order by (c.full_name ilike ${q + '%'}) desc, c.full_name
       limit 6`,
    sql<{ id: string; name: string; org: string | null; amount: string | null; currency: string; stage: string }[]>`
      select d.id, d.name, o.name as org, d.amount, d.currency, s.name as stage
        from deals d join pipeline_stages s on s.id = d.stage_id
        left join organizations o on o.id = d.organization_id
       where d.deleted_at is null and (d.name ilike ${like} or o.name ilike ${like})
       order by (s.state = 'open') desc, d.updated_at desc
       limit 6`,
  ]);

  const results: SearchResult[] = [
    ...orgs.map((o) => ({
      type: 'organization' as const,
      id: o.id,
      title: o.name,
      subtitle: [o.domain, o.city].filter(Boolean).join(', ') || 'Organization',
      href: `/organizations/${o.id}`,
    })),
    ...contacts.map((c) => ({
      type: 'contact' as const,
      id: c.id,
      title: c.full_name,
      subtitle: [c.job_title && c.org ? `${c.job_title} at ${c.org}` : c.org ?? c.job_title, c.email].filter(Boolean).join(', ') || 'Contact',
      href: `/contacts/${c.id}`,
    })),
    ...deals.map((d) => ({
      type: 'deal' as const,
      id: d.id,
      title: d.name,
      subtitle: [d.org, d.stage, d.amount ? formatMoney(d.amount, d.currency) : null].filter(Boolean).join(', '),
      href: `/deals/${d.id}`,
    })),
  ];
  return NextResponse.json({ results });
}
