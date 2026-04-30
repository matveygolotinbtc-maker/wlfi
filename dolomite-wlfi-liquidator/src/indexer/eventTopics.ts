import { Interface } from 'ethers';
import { DOLOMITE_MARGIN_ABI } from '../abis/dolomiteMargin.js';

const i = new Interface(DOLOMITE_MARGIN_ABI);
export const EVENT_TOPICS = [
  'LogDeposit','LogWithdraw','LogTransfer','LogBuy','LogSell','LogTrade','LogCall','LogLiquidate','LogVaporize'
].map((e) => i.getEvent(e)?.topicHash as string);

export const DOLOMITE_IFACE = i;
