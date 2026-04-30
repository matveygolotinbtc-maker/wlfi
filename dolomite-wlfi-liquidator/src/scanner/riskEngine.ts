import { RiskBand } from '../types.js';

export const calcHealthApprox = (supplied: number, borrowed: number, marginRatio: number): number => {
  if (borrowed <= 0) return Number.POSITIVE_INFINITY;
  const required = borrowed * (1 + marginRatio);
  return supplied / required;
};

export const getRiskBand = (h: number): RiskBand => {
  if (h < 1) return 'LIQUIDATABLE';
  if (h < 1.01) return 'CRITICAL';
  if (h < 1.03) return 'HIGH';
  if (h < 1.1) return 'WATCH';
  return 'SAFE';
};
