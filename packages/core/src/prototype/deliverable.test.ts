import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DELIVERABLE_MODE,
  checkCompletenessLanguage,
  checkPreDesignGate,
  requiredArtifactsFor,
  selectDeliverableMode,
  summarizeCoverage,
} from './deliverable.js';

describe('deliverable mode selection', () => {
  it('defaults to a full prototype for the normal prospect workflow', () => {
    const selection = selectDeliverableMode({ campaignPolicyMode: null, operatorMode: null });

    expect(selection.mode).toBe(DEFAULT_DELIVERABLE_MODE);
    expect(selection.mode).toBe('FULL_PROTOTYPE');
    expect(selection.selectedBy).toBe('DEFAULT');
  });

  it('lets the operator override campaign policy', () => {
    const selection = selectDeliverableMode({
      campaignPolicyMode: 'FULL_PROTOTYPE',
      operatorMode: 'CONCEPT_SLICE',
    });

    expect(selection.mode).toBe('CONCEPT_SLICE');
    expect(selection.selectedBy).toBe('OPERATOR');
  });

  it('only reaches CONCEPT_SLICE through an explicit choice', () => {
    const selection = selectDeliverableMode({ campaignPolicyMode: null, operatorMode: null });
    expect(selection.mode).not.toBe('CONCEPT_SLICE');
  });
});

describe('completeness vocabulary', () => {
  it('refuses to call a concept slice finished or complete', () => {
    const result = checkCompletenessLanguage(
      'Here is the finished site, complete with every page.',
      'CONCEPT_SLICE',
    );

    expect(result.ok).toBe(false);
    expect(result.offending).toContain('finished');
    expect(result.offending).toContain('complete');
  });

  it('accepts honest framing for a concept slice', () => {
    const result = checkCompletenessLanguage(
      'This is one slice of the idea, not the whole site.',
      'CONCEPT_SLICE',
    );

    expect(result.ok).toBe(true);
  });

  it('still blocks "production ready" on a full prototype', () => {
    expect(checkCompletenessLanguage('It is production ready.', 'FULL_PROTOTYPE').ok).toBe(false);
  });
});

describe('pre-design artifact gate', () => {
  it('blocks visual implementation until the required artifacts exist', () => {
    const gate = checkPreDesignGate('FULL_PROTOTYPE', ['EVIDENCE_REGISTER']);

    expect(gate.mayBeginVisualImplementation).toBe(false);
    expect(gate.missing).toContain('GOVERNING_CONCEPT');
    expect(gate.missing).toContain('COVERAGE_LEDGER');
  });

  it('requires the full set for a production candidate', () => {
    expect(requiredArtifactsFor('PRODUCTION_CANDIDATE')).toHaveLength(12);
  });

  it('still requires evidence and a governing concept even for a concept slice', () => {
    const required = requiredArtifactsFor('CONCEPT_SLICE');

    expect(required).toContain('EVIDENCE_REGISTER');
    expect(required).toContain('GOVERNING_CONCEPT');
    expect(required).toContain('COVERAGE_LEDGER');
  });

  it('opens the gate once everything is present', () => {
    const gate = checkPreDesignGate('CONCEPT_SLICE', requiredArtifactsFor('CONCEPT_SLICE'));

    expect(gate.mayBeginVisualImplementation).toBe(true);
    expect(gate.missing).toEqual([]);
  });
});

describe('coverage ledger', () => {
  it('is incomplete while anything is still merely planned', () => {
    const summary = summarizeCoverage([
      { item: 'case study depth', status: 'VERIFIED', note: null },
      { item: 'pricing page', status: 'PLANNED', note: null },
    ]);

    expect(summary.complete).toBe(false);
    expect(summary.planned).toBe(1);
  });

  it('fails a silent drop', () => {
    const summary = summarizeCoverage([
      { item: 'team page', status: 'DROPPED', note: '  ' },
    ]);

    expect(summary.complete).toBe(false);
    expect(summary.undocumentedDrops).toEqual(['team page']);
  });

  it('accepts a drop with a stated reason', () => {
    const summary = summarizeCoverage([
      { item: 'team page', status: 'VERIFIED', note: null },
      { item: 'careers page', status: 'DROPPED', note: 'No hiring evidence found.' },
    ]);

    expect(summary.complete).toBe(true);
  });
});
