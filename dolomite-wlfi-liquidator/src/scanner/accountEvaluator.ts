import { Contract, formatUnits } from 'ethers';
import { MARKET_IDS, KNOWN_MARKET_TOKEN } from '../addresses.js';
import { Candidate } from '../types.js';
import { calcHealthApprox, getRiskBand } from './riskEngine.js';

export async function evaluateAccount(dm: Contract, account: { owner: string; accountNumber: string }, onlyWlfi: boolean): Promise<Candidate | null> {
  const info = { owner: account.owner, number: BigInt(account.accountNumber) };
  const debtCount = Number(await dm.getAccountNumberOfMarketsWithDebt(info));
  if (debtCount === 0) return null;

  const markets: bigint[] = await dm.getAccountMarketsWithBalances(info);
  if (onlyWlfi && !markets.map(Number).includes(MARKET_IDS.WLFI)) return null;

  const adjusted = await dm.getAdjustedAccountValues(info);
  const margin = await dm.getMarginRatioForAccount(info);
  const balances = await dm.getAccountBalances(info);

  let wlfiRaw = 0n; let usd1Raw = 0n; let usdcRaw = 0n;
  const debtMarkets: Candidate['debtMarkets'] = []; const collateralMarkets: Candidate['collateralMarkets'] = [];
  for (let i = 0; i < balances.markets.length; i += 1) {
    const marketId = Number(balances.markets[i]);
    const weiObj = balances.tokenWei[i];
    const raw = BigInt(weiObj.value.toString());
    const signed = weiObj.sign ? raw : -raw;
    const amountFmt = formatUnits(signed < 0n ? -signed : signed, 18);
    if (marketId === MARKET_IDS.WLFI && signed > 0n) wlfiRaw = signed;
    if (marketId === MARKET_IDS.USD1 && signed < 0n) usd1Raw = -signed;
    if (marketId === MARKET_IDS.USDC && signed < 0n) usdcRaw = -signed;
    const entry = { marketId, token: KNOWN_MARKET_TOKEN[marketId] ?? `MKT_${marketId}`, amountFormatted: amountFmt };
    if (signed < 0n) debtMarkets.push(entry); else if (signed > 0n) collateralMarkets.push(entry);
  }

  const supplied = Number(formatUnits(adjusted[0].value, 36));
  const borrowed = Number(formatUnits(adjusted[1].value, 36));
  const marginRatio = Number(formatUnits(margin.value, 18));
  const health = calcHealthApprox(supplied, borrowed, marginRatio);
  const required = borrowed * (1 + marginRatio);
  return {
    owner: account.owner,
    accountNumber: account.accountNumber,
    healthApprox: health.toFixed(6),
    isLiquidatableApprox: health < 1,
    riskBand: getRiskBand(health),
    suppliedAdjustedUsd: supplied.toFixed(6),
    borrowedAdjustedUsd: borrowed.toFixed(6),
    requiredAdjustedUsd: required.toFixed(6),
    wlfiCollateralRaw: wlfiRaw.toString(),
    wlfiCollateralFormatted: formatUnits(wlfiRaw, 18),
    usd1DebtRaw: usd1Raw.toString(),
    usd1DebtFormatted: formatUnits(usd1Raw, 18),
    usdcDebtRaw: usdcRaw.toString(),
    usdcDebtFormatted: formatUnits(usdcRaw, 6),
    debtMarkets,
    collateralMarkets,
    blockNumber: await dm.runner!.provider!.getBlockNumber(),
    updatedAt: new Date().toISOString()
  };
}
