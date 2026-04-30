import dotenv from 'dotenv';

dotenv.config();

const toBool = (v: string | undefined, def: boolean): boolean => {
  if (v === undefined) return def;
  return ['1', 'true', 'yes', 'y'].includes(v.toLowerCase());
};

const toNum = (v: string | undefined, def: number): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};

export const CONFIG = {
  rpcUrl: process.env.RPC_URL ?? '',
  startBlock: toNum(process.env.START_BLOCK, 19_000_000),
  logChunk: toNum(process.env.LOG_CHUNK, 5000),
  pollMs: toNum(process.env.POLL_MS, 15_000),
  onlyWlfi: toBool(process.env.ONLY_WLFI, true),
  topN: toNum(process.env.TOP_N, 30),
  stateFile: process.env.STATE_FILE ?? './data/state.json',
  candidatesFile: process.env.CANDIDATES_FILE ?? './data/candidates.json',
  network: process.env.NETWORK ?? 'ethereum'
};

export function validateConfig(): void {
  if (!CONFIG.rpcUrl) throw new Error('RPC_URL is required');
}
