/** Stage types as the Pipelines settings show them. Pure, safe in client code. */
export const STAGE_STATES = [
  { value: 'open', label: 'Open' },
  { value: 'won', label: 'Closed won' },
  { value: 'lost', label: 'Closed lost' },
  { value: 'closed', label: 'Closed' },
];

export function stateLabel(state: string): string {
  return STAGE_STATES.find((s) => s.value === state)?.label ?? state;
}
