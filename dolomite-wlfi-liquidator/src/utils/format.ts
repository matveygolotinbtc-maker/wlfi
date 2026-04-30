import { formatUnits } from 'ethers';

export const shortAddress = (a: string) => `${a.slice(0, 6)}...${a.slice(-4)}`;

export const fmt = (n: number, d = 6) => Number.isFinite(n) ? n.toFixed(d) : '0';

export const fmtUnits = (v: bigint, decimals = 18, d = 6) => fmt(Number(formatUnits(v, decimals)), d);
