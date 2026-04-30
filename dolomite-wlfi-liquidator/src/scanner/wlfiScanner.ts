import fs from 'node:fs';
import path from 'node:path';
import { Contract, JsonRpcProvider } from 'ethers';
import { CONFIG } from '../config.js';
import { DOLOMITE_MARGIN_ABI } from '../abis/dolomiteMargin.js';
import { ADDRESSES } from '../addresses.js';
import { AccountStore } from '../indexer/accountStore.js';
import { indexLogs } from '../indexer/logIndexer.js';
import { withRetry } from '../utils/retry.js';
import { evaluateAccount } from './accountEvaluator.js';

export async function runScanner() {
  const provider = new JsonRpcProvider(CONFIG.rpcUrl);
  const dm = new Contract(ADDRESSES.DOL_MARGIN, DOLOMITE_MARGIN_ABI, provider);
  const store = new AccountStore(CONFIG.stateFile);
  const latest = await provider.getBlockNumber();
  const fromBlock = Math.max(CONFIG.startBlock, store.getLastScannedBlock() + 1);
  if (fromBlock <= latest) await indexLogs(provider, store, fromBlock, latest, CONFIG.logChunk);

  const evals = await Promise.allSettled(store.getAccounts().map((a) => withRetry(() => evaluateAccount(dm, a, CONFIG.onlyWlfi))));
  const candidates = evals.flatMap((r) => r.status === 'fulfilled' && r.value ? [r.value] : []);
  candidates.sort((a, b) => Number(a.healthApprox) - Number(b.healthApprox));
  const dir = path.dirname(CONFIG.candidatesFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONFIG.candidatesFile, JSON.stringify(candidates, null, 2));
  fs.writeFileSync('./data/full_accounts.json', JSON.stringify(store.getAccounts(), null, 2));
  return candidates;
}
