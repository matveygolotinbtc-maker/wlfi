import { Provider, Log } from 'ethers';
import { ADDRESSES } from '../addresses.js';
import { withRetry } from '../utils/retry.js';
import { makeRanges } from '../utils/blockRanges.js';
import { logger } from '../utils/logger.js';
import { AccountStore } from './accountStore.js';
import { DOLOMITE_IFACE, EVENT_TOPICS } from './eventTopics.js';

function safeAdd(store: AccountStore, owner?: string, num?: bigint) {
  if (owner && num !== undefined) store.add(owner, num);
}

function parseLog(log: Log, store: AccountStore) {
  try {
    const parsed = DOLOMITE_IFACE.parseLog(log);
    if (!parsed) return;
    const a = parsed.args as any;
    switch (parsed.name) {
      case 'LogTransfer':
      case 'LogTrade':
      case 'LogLiquidate':
      case 'LogVaporize':
        safeAdd(store, a[0], a[1]); safeAdd(store, a[2], a[3]); break;
      default:
        safeAdd(store, a[0], a[1]);
    }
  } catch (e) { logger.warn('Unparsed log', log.transactionHash, e); }
}

export async function indexLogs(provider: Provider, store: AccountStore, fromBlock: number, toBlock: number, chunk: number) {
  for (const [from, to] of makeRanges(fromBlock, toBlock, chunk)) {
    const logs = await withRetry(() => provider.getLogs({ address: ADDRESSES.DOL_MARGIN, fromBlock: from, toBlock: to, topics: [EVENT_TOPICS] }));
    logs.forEach((l) => parseLog(l, store));
    store.setLastScannedBlock(to);
    store.save();
    logger.info(`Indexed ${from}-${to}, logs=${logs.length}, accounts=${store.getAccounts().length}`);
  }
}
