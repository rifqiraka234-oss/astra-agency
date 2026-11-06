/**
 * lib/sales/csv.ts, CSV for the lead and deal lists (papaparse). The export
 * routes pass the same filters as the list page, so the file matches the screen.
 */
import Papa from 'papaparse';
import type { DealListRow, LeadListRow } from './queries';

const iso = (d: Date | string | null) => (d ? new Date(d).toISOString() : '');

export function leadsCsv(rows: LeadListRow[]): string {
  return Papa.unparse(
    rows.map((r) => ({
      id: r.id,
      lead: r.title,
      job_title: r.job_title ?? '',
      organization: r.org_name ?? '',
      stage: r.stage_name,
      research_status: r.research_status,
      disqualify_reason: r.disqualify_reason ?? '',
      owner: r.owner_name ?? '',
      source: r.source ?? '',
      campaign: r.campaign ?? '',
      angle: r.angle ?? '',
      worth_eur: r.angle_worth_eur ?? '',
      linkedin_accepted_at: iso(r.linkedin_accepted_at),
      days_in_stage: r.days_in_stage,
      converted_deal_id: r.converted_deal_id ?? '',
      created_at: iso(r.created_at),
    })),
  );
}

export function dealsCsv(rows: DealListRow[]): string {
  return Papa.unparse(
    rows.map((r) => ({
      id: r.id,
      deal: r.name,
      organization: r.org_name ?? '',
      pipeline: r.pipeline_name,
      stage: r.stage_name,
      status: r.stage_state,
      amount: r.amount ?? '',
      currency: r.currency,
      probability: r.probability,
      weighted_amount: r.weighted_amount,
      close_date: r.close_date ?? '',
      owner: r.owner_name ?? '',
      next_step: r.next_step ?? '',
      days_in_stage: r.days_in_stage,
      lost_reason: r.lost_reason ?? '',
      created_at: iso(r.created_at),
    })),
  );
}

/** A CSV download response. Excel needs the BOM to read UTF-8. */
export function csvResponse(csv: string, name: string): Response {
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${csv}`, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${name}-${stamp}.csv"`,
      'cache-control': 'no-store',
    },
  });
}
