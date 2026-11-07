/**
 * lib/sales/csv.ts, CSV for the lead and deal lists (papaparse). The export
 * routes pass the same filters as the list page, so the file matches the screen.
 * Each file ends with "Days in current stage" and an "Entered <stage>" and
 * "Exited <stage>" column per stage (lib/sales/stage-times.ts, stageColumns and
 * stageDatesFor): first time the record entered the stage, last time it left.
 */
import Papa from 'papaparse';
import type { DealListRow, LeadListRow } from './queries';
import type { StageColumn, StageDates } from './stage-times';

const iso = (d: Date | string | null | undefined) => (d ? new Date(d).toISOString() : '');

function stageCells(cols: StageColumn[], dates: StageDates | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const c of cols) {
    const d = dates?.get(c.id);
    out[`Entered ${c.label}`] = iso(d?.entered);
    out[`Exited ${c.label}`] = iso(d?.exited);
  }
  return out;
}

export function leadsCsv(rows: LeadListRow[], cols: StageColumn[] = [], dates: Map<string, StageDates> = new Map()): string {
  return Papa.unparse(
    rows.map((r) => ({
      id: r.id,
      lead: r.title,
      job_title: r.job_title ?? '',
      organization: r.org_name ?? '',
      stage: r.stage_name,
      research_status: r.research_status,
      disqualify_reason: r.stage_state === 'lost' ? r.disqualify_reason_label ?? r.disqualify_reason ?? '' : '',
      disqualify_reason_key: r.stage_state === 'lost' ? r.disqualify_reason ?? '' : '',
      disqualify_note: r.stage_state === 'lost' ? r.disqualify_note ?? '' : '',
      owner: r.owner_name ?? '',
      source: r.source ?? '',
      campaign: r.campaign ?? '',
      angle: r.angle ?? '',
      worth_eur: r.angle_worth_eur ?? '',
      linkedin_accepted_at: iso(r.linkedin_accepted_at),
      converted_deal_id: r.converted_deal_id ?? '',
      created_at: iso(r.created_at),
      'Days in current stage': r.days_in_stage,
      ...stageCells(cols, dates.get(r.id)),
    })),
  );
}

export function dealsCsv(rows: DealListRow[], cols: StageColumn[] = [], dates: Map<string, StageDates> = new Map()): string {
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
      lost_reason: r.stage_state === 'lost' ? r.lost_reason_label ?? r.lost_reason ?? '' : '',
      lost_reason_key: r.stage_state === 'lost' ? r.lost_reason ?? '' : '',
      lost_note: r.stage_state === 'lost' ? r.lost_note ?? '' : '',
      created_at: iso(r.created_at),
      'Days in current stage': r.days_in_stage,
      ...stageCells(cols, dates.get(r.id)),
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
