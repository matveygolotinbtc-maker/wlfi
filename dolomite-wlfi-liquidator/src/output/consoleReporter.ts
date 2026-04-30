import { Candidate } from '../types.js';
import { shortAddress } from '../utils/format.js';

export function printCandidates(candidates: Candidate[], topN: number) {
  const rows = candidates.slice(0, topN).map((c) => ({
    owner: shortAddress(c.owner),
    accountNumber: c.accountNumber,
    healthApprox: c.healthApprox,
    wlfiCollateral: c.wlfiCollateralFormatted,
    usd1Debt: c.usd1DebtFormatted,
    usdcDebt: c.usdcDebtFormatted,
    borrowedAdjustedUsd: c.borrowedAdjustedUsd,
    suppliedAdjustedUsd: c.suppliedAdjustedUsd,
    riskBand: c.riskBand
  }));
  console.table(rows);
}
