import { Candidate } from '../types.js';

export type LiquidationPlan = {
  owner: string;
  accountNumber: string;
  heldMarket: number;
  owedMarket: number;
  status: 'READY_STATICCALL' | 'NEEDS_ROUTE_DECODING';
  notes: string;
};

export function simulateLiquidationPlan(candidate: Candidate): LiquidationPlan | null {
  if (Number(candidate.healthApprox) >= 1.02) return null;
  const owedMarket = Number(candidate.usd1DebtRaw) > 0 ? 1 : 2;
  return {
    owner: candidate.owner,
    accountNumber: candidate.accountNumber,
    heldMarket: 13,
    owedMarket,
    status: 'NEEDS_ROUTE_DECODING',
    notes: 'Dry-run only. No tx sending. Requires staticCall route decoding before execution.'
  };
}
