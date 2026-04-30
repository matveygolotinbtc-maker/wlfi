import { BigNumberish } from 'ethers';

export type AccountInfo = { owner: string; number: bigint };

export type RiskBand = 'LIQUIDATABLE' | 'CRITICAL' | 'HIGH' | 'WATCH' | 'SAFE';

export interface StateFile {
  lastScannedBlock: number;
  accounts: Array<{ owner: string; accountNumber: string }>;
}

export interface Candidate {
  owner: string;
  accountNumber: string;
  healthApprox: string;
  isLiquidatableApprox: boolean;
  riskBand: RiskBand;
  suppliedAdjustedUsd: string;
  borrowedAdjustedUsd: string;
  requiredAdjustedUsd: string;
  wlfiCollateralRaw: string;
  wlfiCollateralFormatted: string;
  usd1DebtRaw: string;
  usd1DebtFormatted: string;
  usdcDebtRaw: string;
  usdcDebtFormatted: string;
  debtMarkets: Array<{ marketId: number; token: string; amountFormatted: string }>;
  collateralMarkets: Array<{ marketId: number; token: string; amountFormatted: string }>;
  blockNumber: number;
  updatedAt: string;
}

export interface MarketBalance {
  marketId: BigNumberish;
  par: { sign: boolean; value: bigint };
  wei: { sign: boolean; value: bigint };
}
