/** The three concerns of the group + a "general/group" bucket. Every ledger
 *  entry, pilgrim and package is tagged with one of these. */
export const BRANCHES = [
  { value: 'inter-gulf-travels', label: 'Inter Gulf Travels Ltd.', short: 'IGT' },
  { value: 'mokbul-hajj-overseas', label: 'Mokbul Hajj Overseas Service', short: 'Mokbul' },
  { value: 'inter-gulf-air-travels', label: 'Inter Gulf Air Travels', short: 'IG Air' },
  { value: 'general', label: 'General / Group', short: 'Group' },
] as const;

export type BranchValue = (typeof BRANCHES)[number]['value'];

export function branchLabel(value?: string | null): string {
  return BRANCHES.find((b) => b.value === value)?.label ?? 'General / Group';
}
export function branchShort(value?: string | null): string {
  return BRANCHES.find((b) => b.value === value)?.short ?? 'Group';
}
