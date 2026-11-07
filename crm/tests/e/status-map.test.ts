import { describe, expect, it } from 'vitest';
import { mapQueueStatus, researchStatusFor } from '../../lib/integrations/status-map';
import { latestPerPerson, latestBy, parseLooseDate, parseWorth } from '../../lib/integrations/jsonl-import';
import { classifyItem } from '../../lib/integrations/lemlist-sync';
import { request } from '../../lib/lemlist';

describe('queue status mapping', () => {
  const cases: [string, string, string, string | null, string | null][] = [
    // status, stage, research status, disqualify reason, close reason
    ['UNRESEARCHED', 'new', 'unresearched', null, null],
    ['THREAD_VERIFIED_CLEAN', 'new', 'unresearched', null, null],
    ['RESEARCH_QUEUED', 'researching', 'researching', null, null],
    ['DRAFTED', 'researching', 'drafted', null, null],
    ['SEND_FAILED', 'researching', 'drafted', null, null],
    ['SENT', 'attempting', 'sent', null, null],
    ['NUDGED', 'attempting', 'sent', null, null],
    ['NUDGE_DUE_2026-10-09', 'attempting', 'sent', null, null],
    ['DRAFTED_CLOSE', 'attempting', 'sent', null, null],
    ['CLOSER_DRAFTED', 'attempting', 'sent', null, null],
    ['FINAL_CLOSE_DRAFTED', 'attempting', 'sent', null, null],
    ['STALLED_NEEDS_REWRITE', 'attempting', 'sent', null, null],
    ['REPLIED', 'connected', 'sent', null, null],
    ['DRAFTED_REPLY', 'connected', 'sent', null, null],
    ['SAID_YES_PENDING', 'connected', 'sent', null, null],
    ['DELIVERED', 'connected', 'sent', null, null],
    ['DECLINED_ANSWER_DRAFTED', 'connected', 'sent', null, null],
    ['CLOSED_RAKA_HANDLING_OFFLINE', 'connected', 'sent', null, null],
    ['MEETING_BOOKED', 'qualified', 'sent', null, null],
    ['PROPOSAL_DECLINED_ON_PRICE', 'qualified', 'sent', null, null],
    ['LIVE_DEAL_DO_NOT_CLOSE', 'qualified', 'sent', null, null],
    ['NO_STRONG_ANGLE', 'disqualified', 'researching', 'no_strong_angle', null],
    ['BLOCKED_NEEDS_INFO', 'disqualified', 'researching', 'blocked_needs_info', null],
    ['NOT_CONNECTED', 'disqualified', 'researching', 'blocked_needs_info', null],
    ['DO_NOT_CONTACT', 'disqualified', 'sent', 'do_not_contact', null],
    ['CLOSED_DO_NOT_CONTACT', 'disqualified', 'sent', 'do_not_contact', null],
    ['CLOSED_NOT_ICP', 'disqualified', 'researching', 'not_icp', null],
    ['NOT_A_LEAD_WRONG_JOBTITLE', 'disqualified', 'researching', 'not_icp', null],
    ['WRONG_COMPANY_PITCHED', 'disqualified', 'sent', 'wrong_company', null],
    ['CLOSED', 'disqualified', 'sent', 'no_reply', 'no_response'],
    ['CLOSED_FINAL_MESSAGE', 'disqualified', 'sent', 'no_reply', 'no_response'],
    ['LEFT_ALONE', 'disqualified', 'sent', 'no_reply', 'no_response'],
    ['CLOSED_NOT_INTERESTED', 'disqualified', 'sent', 'declined', 'declined'],
    ['CLOSED_SOFT_DECLINE', 'disqualified', 'sent', 'declined', 'declined'],
    ['CLOSED_SOFT_DECLINE_WARM', 'disqualified', 'sent', 'went_quiet', 'closed_warm'],
    ['CLOSED_NOT_NOW', 'disqualified', 'sent', 'not_now', 'not_now'],
  ];
  it.each(cases)('%s', (status, stage, research, reason, close) => {
    const m = mapQueueStatus(status);
    expect({ stage: m.stage, research: m.researchStatus, reason: m.disqualifyReason, close: m.closeReason }).toEqual({ stage, research, reason, close });
  });

  it('leaves unknown and empty statuses in New, labelled', () => {
    expect(mapQueueStatus('SOMETHING_NEW').stage).toBe('new');
    expect(mapQueueStatus('SOMETHING_NEW').rule).toMatch(/unmapped/);
    expect(mapQueueStatus(null).rule).toMatch(/no status/);
  });

  it('never claims less research than the row proves', () => {
    expect(researchStatusFor({ openerSentAt: '2026-10-01' }, mapQueueStatus('NO_STRONG_ANGLE'))).toBe('sent');
    expect(researchStatusFor({ openerText: 'Hi' }, mapQueueStatus('RESEARCH_QUEUED'))).toBe('drafted');
    expect(researchStatusFor({}, mapQueueStatus('RESEARCH_QUEUED'))).toBe('researching');
  });
});

describe('queue rows', () => {
  it('keeps the latest row per contactId, resolves leadId only rows, reports rows with neither', () => {
    const rows = [
      { contactId: 'ctc_A', leadId: 'lea_A', status: 'DRAFTED', name: 'A Person' },
      { leadId: 'lea_A', status: 'SENT' },
      { contactId: 'ctc_B', status: 'SENT' },
      { name: 'No ids', status: 'SENT' },
      { leadId: 'lea_C', status: 'NO_STRONG_ANGLE' },
      { contactId: 'ctc_B', status: 'CLOSED' },
    ];
    const { latest, withoutId } = latestPerPerson(rows);
    expect(withoutId).toEqual([4]);
    expect([...latest.keys()].sort()).toEqual(['ctc_A', 'ctc_B', 'lea_C']);
    expect(latest.get('ctc_A')).toMatchObject({ status: 'SENT', name: 'A Person' });
    expect(latest.get('ctc_B')?.status).toBe('CLOSED');
  });

  it('resolves a leadId only row to the one contactId with the same name and company', () => {
    const rows = [
      { leadId: 'lea_M', status: 'SENT', name: 'Mark Preston', companyName: 'Hypergility' },
      { contactId: 'ctc_M', status: 'DRAFTED', name: 'Mark Preston', companyName: 'Hypergility BV' },
      { contactId: 'ctc_M', status: 'CLOSED', name: 'Mark Preston', companyName: null },
      // Two different contactIds share this name and company, so it stays separate.
      { leadId: 'lea_X', status: 'SENT', name: 'Sam Lee', companyName: 'Acme' },
      { contactId: 'ctc_X1', status: 'SENT', name: 'Sam Lee', companyName: 'Acme' },
      { contactId: 'ctc_X2', status: 'SENT', name: 'Sam Lee', companyName: 'Acme' },
    ];
    const { latest } = latestPerPerson(rows);
    expect([...latest.keys()].sort()).toEqual(['ctc_M', 'ctc_X1', 'ctc_X2', 'lea_X']);
    expect(latest.get('ctc_M')).toMatchObject({ status: 'CLOSED', companyName: 'Hypergility BV' });
  });

  it('treats a placeholder id like ctc_N/A as no id, so it never joins different people', () => {
    const rows = [
      { contactId: 'ctc_N/A', leadId: 'lea_P', status: 'SENT', name: 'P One', companyName: 'Pco' },
      { contactId: 'ctc_N/A', leadId: 'lea_Q', status: 'SENT', name: 'Q Two', companyName: 'Qco' },
    ];
    const { latest } = latestPerPerson(rows);
    expect([...latest.keys()].sort()).toEqual(['lea_P', 'lea_Q']);
  });

  it('merges repeated prototype rows, latest wins', () => {
    const merged = latestBy(
      [
        { contactId: 'c', date: 'd', outcome: 'pending', netlifyUrl: 'u' },
        { contactId: 'c', date: 'd', outcome: 'liked', netlifyUrl: 'u' },
      ],
      (r) => `${r.contactId}:${r.date}`,
    );
    expect(merged).toHaveLength(1);
    expect(merged[0].outcome).toBe('liked');
  });

  it('reads the hand written dates and worth', () => {
    expect(parseLooseDate('2026-11-05 ~07.00 UTC')?.toISOString()).toBe('2026-11-05T07:00:00.000Z');
    expect(parseLooseDate('2026-10-27 14.55')?.toISOString()).toBe('2026-10-27T14:55:00.000Z');
    expect(parseLooseDate('2026-08-03T19:46:06.000Z')?.toISOString()).toBe('2026-08-03T19:46:06.000Z');
    expect(parseLooseDate('2026-11-05')?.toISOString()).toBe('2026-11-05T12:00:00.000Z');
    expect(parseLooseDate('soon')).toBeNull();
    expect(parseWorth('EUR 6,000+')).toBe('6000.00');
  });
});

describe('lemlist', () => {
  it('refuses every method but GET before anything is sent', async () => {
    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
      await expect(request('/inbox/linkedin', { method })).rejects.toThrow(/read only/);
    }
  });

  it('tells the connect note from a real message and a reply', () => {
    const accepted = '2026-10-02T00:00:00Z';
    expect(classifyItem({ _id: 'a', type: 'linkedinSent', createdAt: '2026-10-01T00:00:00Z', text: 'Hi, saw your business' }, accepted, 0).kind).toBe('linkedin_invite');
    expect(classifyItem({ _id: 'b', type: 'linkedinSent', createdAt: '2026-10-03T00:00:00Z', message: 'A real opener' }, accepted, 1)).toMatchObject({ kind: 'linkedin_message', direction: 'outbound', isRealOutbound: true });
    expect(classifyItem({ _id: 'c', type: 'linkedinReplied', createdAt: '2026-10-04T00:00:00Z', text: 'Yes please' }, accepted, 2)).toMatchObject({ kind: 'linkedin_message', direction: 'inbound' });
    expect(classifyItem({ _id: 'd', type: 'linkedinSent', createdAt: '2026-10-01T00:00:00Z', emailTemplateName: 'linkedinInvite' }, null, 3).kind).toBe('linkedin_invite');
  });
});
